// Dev-Guru 24h Advance Vrat Notification & Sync Engine

export interface VratNotificationPreferences {
  enabled: boolean;
  advanceHours: number;
  preferredTime: string;
  soundEnabled: boolean;
  weeklyDays: number[];
  subscribedVratIds: string[];
  categories: {
    major: boolean;
    monthly: boolean;
    weekly: boolean;
    ekadashi: boolean;
    pradosh: boolean;
    sankashti: boolean;
  };
}

export interface UpcomingVratAlert {
  id: string;
  name: string;
  category: string;
  dateStr: string;
  deity: string;
  significance: string;
  fastingRules: string;
  isSubscribed: boolean;
  tithiTime?: string;
  paranaTime?: string;
}

const STORAGE_KEY = "astronext_vrat_notification_prefs_v1";

const DEFAULT_PREFS: VratNotificationPreferences = {
  enabled: true,
  advanceHours: 24,
  preferredTime: "07:00",
  soundEnabled: true,
  weeklyDays: [1, 2, 4, 6],
  subscribedVratIds: ["nirjala-ekadashi", "maha-shivratri", "karwa-chauth", "pradosh-vrat", "sankashti-chaturthi"],
  categories: {
    major: true,
    monthly: true,
    weekly: true,
    ekadashi: true,
    pradosh: true,
    sankashti: true
  }
};

export function loadVratNotificationPrefs(): VratNotificationPreferences {
  if (typeof window === "undefined") return DEFAULT_PREFS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;
    return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
  } catch (e) {
    return DEFAULT_PREFS;
  }
}

export function saveVratNotificationPrefs(prefs: VratNotificationPreferences): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch (e) {
    // Ignore storage errors
  }
}

export function isNotificationSupported(): boolean {
  return typeof window !== "undefined" && "Notification" in window;
}

export function getNotificationPermission(): NotificationPermission {
  if (!isNotificationSupported()) return "denied";
  return Notification.permission;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!isNotificationSupported()) return "denied";
  try {
    return await Notification.requestPermission();
  } catch (e) {
    return "denied";
  }
}

export function sendBrowserVratNotification(title: string, options?: NotificationOptions): boolean {
  if (!isNotificationSupported() || Notification.permission !== "granted") {
    return false;
  }
  try {
    new Notification(title, {
      icon: "/assets/images/budh_dev_deity_1786274002474.jpg",
      badge: "/assets/images/budh_dev_deity_1786274002474.jpg",
      ...options
    });
    return true;
  } catch (e) {
    return false;
  }
}

export function triggerTestVrat24hNotification(): { success: boolean; message: string } {
  const perm = getNotificationPermission();
  if (perm === "granted") {
    sendBrowserVratNotification("🙏 Tomorrow is Nirjala Ekadashi Vrat (24h Alert)", {
      body: "Sacred Vishnu Fast begins tomorrow at sunrise. Cleanse your mind and prepare sacred fruits and offerings."
    });
    return {
      success: true,
      message: "Test 24-hour advance Vrat notification successfully delivered to your desktop/phone!"
    };
  } else {
    return {
      success: false,
      message: "Please grant browser notification permission to receive live desktop and mobile alert chimes."
    };
  }
}

export function generateUpcomingVratAlerts(prefs: VratNotificationPreferences): UpcomingVratAlert[] {
  const today = new Date();
  
  const vrats = [
    {
      id: "shukla-ekadashi",
      name: "Papmochani Ekadashi",
      category: "ekadashi",
      daysAhead: 1,
      deity: "Lord Vishnu",
      significance: "Absolves past karmic debts and confers divine grace and peace of mind.",
      fastingRules: "Fruit and milk diet; abstain from grains and beans.",
      tithiTime: "Tithi begins 04:22 AM, ends next day 02:40 AM",
      paranaTime: "Parana next morning: 06:15 AM - 08:30 AM"
    },
    {
      id: "shani-pradosh",
      name: "Shani Pradosh Vrat",
      category: "pradosh",
      daysAhead: 3,
      deity: "Lord Shiva & Lord Shani",
      significance: "Powerful twilight fast to remove severe planetary afflictions and Shani Sade Sati malefic effects.",
      fastingRules: "Water or light fruits until sunset; perform Shiva Puja in Pradosh Kala.",
      tithiTime: "Pradosh Kala Puja: 06:30 PM - 08:45 PM",
      paranaTime: "Parana after evening puja"
    },
    {
      id: "sankashti-chaturthi",
      name: "Vikat Sankashti Chaturthi",
      category: "sankashti",
      daysAhead: 6,
      deity: "Lord Ganesha",
      significance: "Removes deep-seated obstacles in career, business, and family ventures.",
      fastingRules: "Strict fast until Moonrise sighting and offering Arghya to Chandra Dev.",
      tithiTime: "Moonrise at 09:18 PM",
      paranaTime: "Parana immediately post Moon Arghya"
    },
    {
      id: "somwar-vrat",
      name: "Somwar Vrat (Weekly Sacred Fast)",
      category: "weekly",
      daysAhead: 2,
      deity: "Lord Shiva",
      significance: "Bestows mental calmness, peace, and domestic harmony.",
      fastingRules: "Single evening sattvic meal without salt or grains.",
      tithiTime: "All Day Monday",
      paranaTime: "Evening post Bilva Patra Archana"
    }
  ];

  return vrats.map(v => {
    const d = new Date(today);
    d.setDate(d.getDate() + v.daysAhead);
    return {
      id: v.id,
      name: v.name,
      category: v.category,
      dateStr: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
      deity: v.deity,
      significance: v.significance,
      fastingRules: v.fastingRules,
      isSubscribed: prefs.subscribedVratIds.includes(v.id),
      tithiTime: v.tithiTime,
      paranaTime: v.paranaTime
    };
  });
}

export function exportVratCalendarIcs(alerts: UpcomingVratAlert[]): void {
  if (typeof window === "undefined") return;

  let icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Dev-Guru//Vedic Vrat Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH"
  ];

  alerts.forEach(a => {
    const now = new Date();
    const dtStamp = now.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    icsContent.push(
      "BEGIN:VEVENT",
      `UID:vrat-${a.id}-${Date.now()}@dev-guru.com`,
      `DTSTAMP:${dtStamp}`,
      `SUMMARY:🙏 ${a.name} (${a.deity})`,
      `DESCRIPTION:${a.significance}\\n\\nFasting Rules: ${a.fastingRules}`,
      "STATUS:CONFIRMED",
      "END:VEVENT"
    );
  });

  icsContent.push("END:VCALENDAR");

  const blob = new Blob([icsContent.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "Dev-Guru_Vrat_24h_Advance_Alerts.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
