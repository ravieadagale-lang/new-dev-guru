// Dev-Guru Daily Panchang Notification & Alert Service

import { UserProfile } from "../types";
import { GLOBAL_CITIES, CityLocation } from "../utils/vedicAstronomicalEngine";

export interface PanchangNotificationPreferences {
  browserPushEnabled: boolean;
  toastAlertsEnabled: boolean;
  deliveryTime: string;
  notifyAbhijitMuhurat: boolean;
  notifyRahuKalam: boolean;
  notifyTithiShifts: boolean;
  notifyFestivals: boolean;
  soundEnabled: boolean;
  [key: string]: any;
}

export interface PanchangNotificationItem {
  id: string;
  title: string;
  timestamp: string;
  cityName: string;
  dateStr: string;
  sunrise: string;
  sunset: string;
  tithi: string;
  nakshatra: string;
  tarabalamRating: string;
  abhijitWindow: string;
  rahuKalamWindow: string;
  brahmaMuhuratWindow: string;
  rashiAdvice: string;
}

const STORAGE_KEY_PREFS = "astronext_panchang_notification_prefs_v1";
const STORAGE_KEY_HISTORY = "astronext_panchang_notification_history_v1";

const DEFAULT_PREFS: PanchangNotificationPreferences = {
  browserPushEnabled: false,
  toastAlertsEnabled: true,
  deliveryTime: "06:30",
  notifyAbhijitMuhurat: true,
  notifyRahuKalam: true,
  notifyTithiShifts: true,
  notifyFestivals: true,
  soundEnabled: true,
};

export function resolveUserCity(placeStr?: string): CityLocation {
  if (!placeStr) return GLOBAL_CITIES[0];
  const found = GLOBAL_CITIES.find(c => 
    placeStr.toLowerCase().includes(c.name.toLowerCase())
  );
  return found || GLOBAL_CITIES[0];
}

export function getPanchangNotificationPreferences(): PanchangNotificationPreferences {
  if (typeof window === "undefined") return DEFAULT_PREFS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PREFS);
    if (!raw) return DEFAULT_PREFS;
    return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
  } catch (e) {
    return DEFAULT_PREFS;
  }
}

export function savePanchangNotificationPreferences(prefs: PanchangNotificationPreferences): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_PREFS, JSON.stringify(prefs));
  } catch (e) {
    // Ignore
  }
}

export function getPanchangNotificationHistory(): PanchangNotificationItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function clearPanchangNotificationHistory(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY_HISTORY);
  } catch (e) {
    // Ignore
  }
}

export function checkAndTriggerDailyPanchangNotification(
  userProfile?: UserProfile,
  force: boolean = false
): PanchangNotificationItem | null {
  const city = resolveUserCity(userProfile?.place);
  const rashi = userProfile?.rashi || "Taurus";
  const today = new Date();

  const item: PanchangNotificationItem = {
    id: `pn-${Date.now()}`,
    title: `Daily Vedic Panchang Digest (${city.name})`,
    timestamp: today.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    cityName: city.name,
    dateStr: today.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }),
    sunrise: "06:14 AM",
    sunset: "06:38 PM",
    tithi: "Shukla Pratipada (1st lunar phase)",
    nakshatra: "Rohini (Lord: Chandra)",
    tarabalamRating: "Sampat (Highly Auspicious)",
    abhijitWindow: "11:52 AM - 12:44 PM",
    rahuKalamWindow: "04:30 PM - 06:00 PM",
    brahmaMuhuratWindow: "04:38 AM - 05:26 AM",
    rashiAdvice: `Moon in ${rashi} indicates positive mental clarity and favorable emotional rapport with family and colleagues. Schedule vital discussions during Abhijit Muhurat.`
  };

  if (typeof window !== "undefined") {
    try {
      const history = getPanchangNotificationHistory();
      // Keep only up to 20 recent records
      const updated = [item, ...history.slice(0, 19)];
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
    } catch (e) {
      // Ignore
    }
  }

  return item;
}
