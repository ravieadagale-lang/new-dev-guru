import React, { useState, useEffect } from "react";
import { UserProfile } from "../types";
import { 
  getPanchangNotificationPreferences, 
  savePanchangNotificationPreferences, 
  checkAndTriggerDailyPanchangNotification, 
  getPanchangNotificationHistory, 
  clearPanchangNotificationHistory,
  PanchangNotificationPreferences, 
  PanchangNotificationItem, 
  resolveUserCity 
} from "../services/dailyPanchangNotificationService";
import { GLOBAL_CITIES, CityLocation } from "../utils/vedicAstronomicalEngine";
import { 
  Bell, 
  Sparkles, 
  Sun, 
  Moon, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  Send, 
  Trash2, 
  ChevronRight, 
  X,
  Compass,
  Sliders,
  Calendar
} from "lucide-react";

interface DailyPanchangNotificationWidgetProps {
  userProfile: UserProfile;
  onUpdateProfile?: (p: UserProfile) => void;
  onNavigateToPanchang?: () => void;
}

export const DailyPanchangNotificationWidget: React.FC<DailyPanchangNotificationWidgetProps> = ({
  userProfile,
  onUpdateProfile,
  onNavigateToPanchang,
}) => {
  const [prefs, setPrefs] = useState<PanchangNotificationPreferences>(
    getPanchangNotificationPreferences()
  );
  const [history, setHistory] = useState<PanchangNotificationItem[]>([]);
  const [activeTab, setActiveTab] = useState<"digest" | "settings" | "history">("digest");
  const [testPayload, setTestPayload] = useState<PanchangNotificationItem | null>(null);
  const [isTestToastActive, setIsTestToastActive] = useState<boolean>(false);
  const [permissionState, setPermissionState] = useState<string>(
    typeof window !== "undefined" && "Notification" in window ? Notification.permission : "default"
  );

  const city = resolveUserCity(userProfile.place);

  useEffect(() => {
    setHistory(getPanchangNotificationHistory());
    // Generate initial live digest payload for today
    const payload = checkAndTriggerDailyPanchangNotification(userProfile, true);
    if (payload) {
      setTestPayload(payload);
    }
  }, [userProfile]);

  const handleTogglePref = (key: keyof PanchangNotificationPreferences) => {
    const updated = { ...prefs, [key]: !prefs[key] };
    setPrefs(updated);
    savePanchangNotificationPreferences(updated);
  };

  const handleChangeTime = (time: string) => {
    const updated = { ...prefs, deliveryTime: time };
    setPrefs(updated);
    savePanchangNotificationPreferences(updated);
  };

  const handleCityChange = (cityName: string) => {
    const selected = GLOBAL_CITIES.find((c) => c.name === cityName);
    if (selected && onUpdateProfile) {
      onUpdateProfile({
        ...userProfile,
        place: `${selected.name}, ${selected.country}`,
        latitude: selected.lat,
        longitude: selected.lng,
      });
    }
  };

  const handleRequestPushPermission = async () => {
    if (!("Notification" in window)) {
      alert("Browser push notifications are not supported by this browser.");
      return;
    }
    const perm = await Notification.requestPermission();
    setPermissionState(perm);
    if (perm === "granted") {
      const updated = { ...prefs, browserPushEnabled: true };
      setPrefs(updated);
      savePanchangNotificationPreferences(updated);
    }
  };

  const handleTriggerInstantTest = () => {
    const payload = checkAndTriggerDailyPanchangNotification(userProfile, true);
    if (payload) {
      setTestPayload(payload);
      setIsTestToastActive(true);
      setHistory(getPanchangNotificationHistory());
    }
  };

  const handleClearHistory = () => {
    clearPanchangNotificationHistory();
    setHistory([]);
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 via-amber-950/40 to-slate-900 text-amber-100 rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl space-y-6 relative overflow-hidden">
      {/* Decorative Aura */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-500/20 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider border border-amber-500/30">
            <Bell className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            Automated Panchang & Muhurat Alert Engine
          </div>
          <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
            Personalized Daily Cosmic Alerts
          </h3>
          <p className="text-xs text-amber-200/70">
            Syncs localized Sunrise, Tithi, Abhijit Muhurat & Rahu Kaal for <span className="font-bold text-amber-300">📍 {userProfile.place || city.name}</span>
          </p>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-1 bg-black/40 p-1.5 rounded-2xl border border-amber-500/20 text-xs">
          <button
            onClick={() => setActiveTab("digest")}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === "digest"
                ? "bg-amber-500 text-slate-950 shadow-xs"
                : "text-amber-200/70 hover:text-amber-100"
            }`}
          >
            Today's Digest
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === "settings"
                ? "bg-amber-500 text-slate-950 shadow-xs"
                : "text-amber-200/70 hover:text-amber-100"
            }`}
          >
            Preferences
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === "history"
                ? "bg-amber-500 text-slate-950 shadow-xs"
                : "text-amber-200/70 hover:text-amber-100"
            }`}
          >
            Alert Log ({history.length})
          </button>
        </div>
      </div>

      {/* TAB 1: TODAY'S DIGEST */}
      {activeTab === "digest" && testPayload && (
        <div className="space-y-6 animate-in fade-in">
          {/* Main Hero Card for Today's Panchang */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-amber-500/30 space-y-4 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-3">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                  Live Location: {testPayload.locationName}
                </span>
                <h4 className="font-serif font-bold text-xl text-amber-100 mt-0.5">
                  {testPayload.tithi} ({testPayload.paksha}) • {testPayload.vara}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleTriggerInstantTest}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Instant Test Push</span>
                </button>
              </div>
            </div>

            {/* Sun & Moon Times Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-950/80 p-3 rounded-xl border border-amber-500/20 flex items-center gap-2.5">
                <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-amber-400/80 uppercase font-semibold">Sunrise</div>
                  <div className="font-bold text-white">{testPayload.sunrise}</div>
                </div>
              </div>

              <div className="bg-slate-950/80 p-3 rounded-xl border border-amber-500/20 flex items-center gap-2.5">
                <Moon className="w-4 h-4 text-amber-300 shrink-0" />
                <div>
                  <div className="text-[10px] text-amber-400/80 uppercase font-semibold">Sunset</div>
                  <div className="font-bold text-white">{testPayload.sunset}</div>
                </div>
              </div>

              <div className="bg-slate-950/80 p-3 rounded-xl border border-amber-500/20 flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                <div>
                  <div className="text-[10px] text-amber-400/80 uppercase font-semibold">Nakshatra</div>
                  <div className="font-bold text-white">{testPayload.nakshatra}</div>
                </div>
              </div>

              <div className="bg-slate-950/80 p-3 rounded-xl border border-amber-500/20 flex items-center gap-2.5">
                <Compass className="w-4 h-4 text-amber-300 shrink-0" />
                <div>
                  <div className="text-[10px] text-amber-400/80 uppercase font-semibold">Tarabalam</div>
                  <div className="font-bold text-amber-200">{testPayload.tarabalamRating}</div>
                </div>
              </div>
            </div>

            {/* Auspicious Windows vs Inauspicious Periods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Abhijit Muhurat */}
              <div className="bg-emerald-950/50 p-4 rounded-xl border border-emerald-500/40 space-y-1">
                <div className="text-xs font-bold text-emerald-300 flex items-center justify-between">
                  <span>✨ Abhijit Muhurat</span>
                  <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full text-emerald-200">
                    Most Auspicious
                  </span>
                </div>
                <div className="text-sm font-bold text-white font-mono">{testPayload.abhijitWindow}</div>
                <p className="text-[11px] text-emerald-100/80 leading-snug">
                  Optimal for launching projects, travel, financial investments & agreements.
                </p>
              </div>

              {/* Rahu Kalam */}
              <div className="bg-rose-950/50 p-4 rounded-xl border border-rose-500/40 space-y-1">
                <div className="text-xs font-bold text-rose-300 flex items-center justify-between">
                  <span>⚠️ Rahu Kalam</span>
                  <span className="text-[10px] bg-rose-500/20 px-2 py-0.5 rounded-full text-rose-200">
                    Avoid Starts
                  </span>
                </div>
                <div className="text-sm font-bold text-white font-mono">{testPayload.rahuKalamWindow}</div>
                <p className="text-[11px] text-rose-100/80 leading-snug">
                  Avoid signing new agreements, starting journeys, or major purchases.
                </p>
              </div>

              {/* Brahma Muhurat */}
              <div className="bg-amber-950/50 p-4 rounded-xl border border-amber-500/40 space-y-1">
                <div className="text-xs font-bold text-amber-300 flex items-center justify-between">
                  <span>🧘 Brahma Muhurat</span>
                  <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded-full text-amber-200">
                    Sadhana / Prayer
                  </span>
                </div>
                <div className="text-sm font-bold text-white font-mono">{testPayload.brahmaMuhuratWindow}</div>
                <p className="text-[11px] text-amber-100/80 leading-snug">
                  Prime predawn spiritual energy window for mantra japa and meditation.
                </p>
              </div>
            </div>

            {/* Personalized Guidance Banner */}
            <div className="bg-slate-950/90 p-4 rounded-xl border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed font-serif">
              <span className="font-bold text-amber-400 uppercase tracking-wider block mb-1">
                Personalized Moon Sign Guidance ({userProfile.rashi || "Taurus"}):
              </span>
              {testPayload.rashiAdvice}
            </div>

            {onNavigateToPanchang && (
              <div className="flex justify-end pt-1">
                <button
                  onClick={onNavigateToPanchang}
                  className="text-xs text-amber-300 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Open Full Interactive Panchang & Gowri Timeline</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: SETTINGS & PREFERENCES */}
      {activeTab === "settings" && (
        <div className="space-y-6 animate-in fade-in">
          {/* Main Toggle */}
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-amber-500/30 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-bold text-sm text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-400" />
                Automated Daily Panchang Notifications
              </div>
              <p className="text-xs text-amber-200/70">
                Receive daily localized Panchang & Muhurat alerts automatically.
              </p>
            </div>

            <button
              onClick={() => handleTogglePref("enabled")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                prefs.enabled ? "bg-amber-500" : "bg-slate-800"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-slate-950 transition-transform ${
                  prefs.enabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Delivery Schedule & Location Sync */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Preferred Time */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20 space-y-2">
              <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                Preferred Alert Delivery Time
              </label>
              <select
                value={prefs.deliveryTime}
                onChange={(e) => handleChangeTime(e.target.value)}
                className="w-full bg-slate-950 text-amber-100 text-xs font-semibold px-3 py-2 rounded-xl border border-amber-500/30 focus:outline-none"
              >
                <option value="05:30">05:30 AM (Brahma Muhurat Early Rise)</option>
                <option value="06:00">06:00 AM (Sunrise Standard)</option>
                <option value="06:30">06:30 AM (Morning Guidance)</option>
                <option value="07:00">07:00 AM (Breakfast Digest)</option>
                <option value="08:00">08:00 AM (Workday Inception)</option>
              </select>
            </div>

            {/* Saved City Location Sync */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20 space-y-2">
              <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400" />
                Location Sync for Astronomical Calculations
              </label>
              <select
                value={city.name}
                onChange={(e) => handleCityChange(e.target.value)}
                className="w-full bg-slate-950 text-amber-100 text-xs font-semibold px-3 py-2 rounded-xl border border-amber-500/30 focus:outline-none"
              >
                {GLOBAL_CITIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}, {c.country} ({c.tzOffset >= 0 ? `+${c.tzOffset}` : c.tzOffset} GMT)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sub-Category Toggles */}
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-amber-500/20 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Notification Alert Categories
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                { key: "notifyAbhijitMuhurat", label: "Abhijit Muhurat Window", desc: "Auspicious best time alerts" },
                { key: "notifyRahuKalam", label: "Rahu Kalam Warnings", desc: "Inauspicious time warnings" },
                { key: "notifyBrahmaMuhurat", label: "Brahma Muhurat Reminders", desc: "Predawn meditation call" },
                { key: "notifyChoghadiyaShifts", label: "Amrit/Shubh Choghadiya", desc: "Optimal business windows" },
              ].map((item) => (
                <label key={item.key} className="flex items-start gap-3 bg-slate-950 p-3 rounded-xl border border-amber-500/15 cursor-pointer hover:border-amber-500/30">
                  <input
                    type="checkbox"
                    checked={!!prefs[item.key as keyof PanchangNotificationPreferences]}
                    onChange={() => handleTogglePref(item.key as keyof PanchangNotificationPreferences)}
                    className="mt-0.5 rounded text-amber-500 focus:ring-amber-500"
                  />
                  <div>
                    <div className="font-bold text-white">{item.label}</div>
                    <div className="text-[11px] text-amber-200/60">{item.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Browser Push Permission Request */}
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="font-bold text-xs text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Browser Native Push Notifications
              </div>
              <p className="text-[11px] text-amber-200/70">
                Receive popups even when Dev-Guru tab is running in the background. Status:{" "}
                <span className="font-bold text-amber-300 uppercase">{permissionState}</span>
              </p>
            </div>

            <button
              onClick={handleRequestPushPermission}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
            >
              {permissionState === "granted" ? "Push Permission Active ✓" : "Enable Push Permission"}
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: HISTORY LOG */}
      {activeTab === "history" && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex justify-between items-center border-b border-amber-500/20 pb-2">
            <span className="text-xs text-amber-200/70">
              Showing {history.length} recent automated daily Panchang notifications
            </span>
            {history.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="text-xs text-rose-300 hover:text-rose-200 font-bold flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear Log
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="text-center py-8 text-xs text-amber-200/50 bg-slate-900/50 rounded-2xl border border-amber-500/10">
              No previous notification history recorded. Click "Send Instant Test Push" above to record an alert.
            </div>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {history.map((item) => (
                <div key={item.id} className="bg-slate-900 p-4 rounded-xl border border-amber-500/20 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase text-amber-400 bg-amber-500/20 px-2.5 py-0.5 rounded-full">
                      {item.dateISO} • {item.locationName}
                    </span>
                    <span className="text-[10px] text-amber-200/50">{item.timestamp}</span>
                  </div>
                  <h5 className="font-bold text-xs text-white">{item.summaryHeadline}</h5>
                  <p className="text-[11px] text-amber-100/80 leading-relaxed font-serif">{item.formattedAlertMessage}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Interactive Toast Popup Overlay for Test Alerts */}
      {isTestToastActive && testPayload && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-950 text-amber-100 p-5 rounded-3xl border border-amber-500/50 shadow-2xl space-y-3 animate-in slide-in-from-bottom-5 duration-300">
          <button
            onClick={() => setIsTestToastActive(false)}
            className="absolute top-4 right-4 text-amber-400/60 hover:text-amber-200"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase">
              📍 Daily Panchang Alert
            </span>
            <span className="text-[10px] text-amber-200/50">Just now</span>
          </div>

          <div>
            <h4 className="font-serif font-bold text-sm text-white flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-400" />
              {testPayload.summaryHeadline}
            </h4>
            <p className="text-xs text-amber-100/80 leading-snug mt-1.5 font-serif">
              {testPayload.formattedAlertMessage}
            </p>
          </div>

          <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-500/30 text-[11px] text-emerald-200">
            <div className="font-bold">✨ Abhijit Muhurat Today:</div>
            <div>{testPayload.abhijitWindow}</div>
          </div>

          <div className="flex justify-between items-center text-xs pt-1">
            <button
              onClick={() => {
                setIsTestToastActive(false);
                if (onNavigateToPanchang) onNavigateToPanchang();
              }}
              className="text-amber-300 font-bold hover:underline flex items-center gap-1"
            >
              <span>View Panchang Chart</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsTestToastActive(false)}
              className="text-amber-200/60 hover:text-amber-200 text-[11px]"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
