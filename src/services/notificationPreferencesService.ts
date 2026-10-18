import { AdvancedNotificationPreferences, AppNotification } from "../types";

export interface SacredVratDefinition {
  id: string;
  name: string;
  hindiName: string;
  deity: string;
  category: "weekly" | "ekadashi" | "pradosh" | "purnima" | "amavasya" | "chaturthi" | "festival";
  recurrence: string;
  prepWindow: string;
  morningWindow: string;
  eveningWindow: string;
  description: string;
  remedy: string;
  fastingGuidelines: string;
  defaultNextDate: string;
}

export const SACRED_VRATS_LIST: SacredVratDefinition[] = [
  {
    id: "weekly-mangalvar",
    name: "Mangalvar (Tuesday) Hanuman Vrat",
    hindiName: "मंगलवार हनुमान व्रत",
    deity: "Lord Hanuman & Mangal Dev",
    category: "weekly",
    recurrence: "Every Tuesday",
    prepWindow: "Monday Evening (6:00 PM – 10:00 PM)",
    morningWindow: "Tuesday Sunrise to 12:00 PM (Noon)",
    eveningWindow: "Tuesday Twilight (6:00 PM – 8:30 PM)",
    description: "Removes Manglik dosha, grants courage, physical stamina, and delivers victory over obstacles.",
    remedy: "Chant Hanuman Chalisa 7x, offer Sindoor and Jasmine oil lamp.",
    fastingGuidelines: "Ekasana (single fruit/sattvic meal); strictly avoid salt if observing rigorous vow.",
    defaultNextDate: "Upcoming Tuesday"
  },
  {
    id: "ekadashi-indira",
    name: "Indira & Papmochani Ekadashi Vrat",
    hindiName: "इन्दिरा / पापमोचिनी एकादशी व्रत",
    deity: "Lord Vishnu (Shri Hari)",
    category: "ekadashi",
    recurrence: "Fortnightly (11th Tithi)",
    prepWindow: "Dashami Evening (6:00 PM – 9:30 PM)",
    morningWindow: "Ekadashi Dawn to 12:00 PM (Noon)",
    eveningWindow: "Ekadashi Sandhya Aarti (6:15 PM – 7:45 PM)",
    description: "Supreme among fasts. Eradicates multi-lifetime karmic debt and blesses ancestors with liberation.",
    remedy: "Offer Tulsi leaves to Shaligram/Vishnu, chant 'Om Namo Bhagavate Vasudevaya' 108x.",
    fastingGuidelines: "Nirjala or Phalahar (fruits, milk); strictly abstain from rice, grains, and beans.",
    defaultNextDate: "Upcoming 11th Tithi"
  },
  {
    id: "pradosh-shani",
    name: "Shani Pradosh & Bhauma Pradosh Vrat",
    hindiName: "शनि / भौम प्रदोष व्रत",
    deity: "Lord Shiva & Goddess Parvati",
    category: "pradosh",
    recurrence: "Fortnightly (13th Tithi)",
    prepWindow: "Dwadashi Evening (6:00 PM – 9:00 PM)",
    morningWindow: "Trayodashi Dawn to 12:00 PM (Noon)",
    eveningWindow: "Pradosh Kaal (6:18 PM – 8:45 PM)",
    description: "Twilight fast to dissolve planetary curses, health ailments, and acute Saturn/Rahu afflictions.",
    remedy: "Perform milk, honey, and Bilva Patra Abhishekam on Shivalinga during Pradosh Kaal.",
    fastingGuidelines: "Water, milk, or fruits during day; worship Shiva in twilight window before parana.",
    defaultNextDate: "Upcoming 13th Tithi"
  },
  {
    id: "weekly-somvar",
    name: "Somvar (Monday) Shiva Vrat",
    hindiName: "सोमवार शिव व्रत",
    deity: "Lord Shiva & Chandra Dev",
    category: "weekly",
    recurrence: "Every Monday",
    prepWindow: "Sunday Evening (7:00 PM – 10:00 PM)",
    morningWindow: "Monday Sunrise to 12:00 PM (Noon)",
    eveningWindow: "Monday Twilight (6:00 PM – 8:00 PM)",
    description: "Calms emotional restlessness, balances Moon (Chandra), and blesses marriage and family harmony.",
    remedy: "Offer sacred raw milk, white flowers, and Ganga jal on Shivalinga.",
    fastingGuidelines: "Single sattvic meal post sunset without common salt (rock salt permitted).",
    defaultNextDate: "Upcoming Monday"
  },
  {
    id: "weekly-shanivar",
    name: "Shanivar (Saturday) Shani Dev Vrat",
    hindiName: "शनिवार शनि देव व्रत",
    deity: "Lord Shani Dev & Hanuman",
    category: "weekly",
    recurrence: "Every Saturday",
    prepWindow: "Friday Evening (6:30 PM – 9:30 PM)",
    morningWindow: "Saturday Sunrise to 12:00 PM (Noon)",
    eveningWindow: "Saturday Sunset (6:30 PM – 8:30 PM)",
    description: "Neutralizes Saturn Sade Sati, Dhaiya, and Kantaka Shani; confers discipline and enduring wealth.",
    remedy: "Light a mustard/sesame oil deepak under a Peepal tree and chant Shani Gayatri.",
    fastingGuidelines: "Khichdi or black sesame preparation post twilight worship; no non-veg or alcohol.",
    defaultNextDate: "Upcoming Saturday"
  },
  {
    id: "weekly-guruvar",
    name: "Guruvar (Thursday) Brihaspati Vrat",
    hindiName: "गुरुवार बृहस्पति व्रत",
    deity: "Lord Brihaspati & Vishnu",
    category: "weekly",
    recurrence: "Every Thursday",
    prepWindow: "Wednesday Evening (7:00 PM – 10:00 PM)",
    morningWindow: "Thursday Sunrise to 12:00 PM (Noon)",
    eveningWindow: "Thursday Twilight (6:00 PM – 7:30 PM)",
    description: "Strengthens Jupiter in the natal chart, expanding wisdom, scholastic success, and marital joy.",
    remedy: "Offer yellow chana dal, jaggery, and turmeric to Banana tree; wear yellow garments.",
    fastingGuidelines: "Single yellow sattvic meal; strictly avoid washing clothes/hair or consuming salt.",
    defaultNextDate: "Upcoming Thursday"
  },
  {
    id: "weekly-shukravar",
    name: "Shukravar Vaibhav Lakshmi Vrat",
    hindiName: "शुक्रवार वैभव लक्ष्मी व्रत",
    deity: "Goddess Mahalakshmi & Shukra Dev",
    category: "weekly",
    recurrence: "Every Friday",
    prepWindow: "Thursday Evening (6:00 PM – 9:00 PM)",
    morningWindow: "Friday Sunrise to 12:00 PM (Noon)",
    eveningWindow: "Friday Evening (6:30 PM – 8:30 PM)",
    description: "Brings abundant prosperity, luxury, artistic success, and removes Venus afflictions.",
    remedy: "Recite Shri Suktam and offer lotus flowers and white kheer to Goddess Lakshmi.",
    fastingGuidelines: "Phalahar during daytime; strictly avoid all sour items (lemon, curd, pickles) for entire day.",
    defaultNextDate: "Upcoming Friday"
  },
  {
    id: "weekly-budhwar",
    name: "Budhwar (Wednesday) Ganesha Vrat",
    hindiName: "बुधवार गणेश / बुध व्रत",
    deity: "Lord Ganesha & Budha Dev",
    category: "weekly",
    recurrence: "Every Wednesday",
    prepWindow: "Tuesday Evening (7:00 PM – 9:30 PM)",
    morningWindow: "Wednesday Sunrise to 12:00 PM (Noon)",
    eveningWindow: "Wednesday Twilight (6:00 PM – 7:45 PM)",
    description: "Enhances intellect, sharp memory, speech eloquence, business acumen, and removes hurdles.",
    remedy: "Offer 21 blades of fresh Durva grass and Modaks to Lord Ganesha.",
    fastingGuidelines: "Green moong or single sattvic meal without salt; feed green fodder to cows.",
    defaultNextDate: "Upcoming Wednesday"
  },
  {
    id: "purnima-satyanarayan",
    name: "Satyanarayan Purnima Vrat",
    hindiName: "श्री सत्यनारायण पूर्णिमा व्रत",
    deity: "Lord Satyanarayan & Chandra Dev",
    category: "purnima",
    recurrence: "Monthly (Full Moon Tithi)",
    prepWindow: "Chaturdashi Evening (6:00 PM – 9:30 PM)",
    morningWindow: "Purnima Dawn to 12:00 PM (Noon)",
    eveningWindow: "Purnima Moonrise (6:45 PM – 9:00 PM)",
    description: "Universal peace, family unity, Lakshmi blessings, and psychological harmony under Full Moon.",
    remedy: "Perform Satyanarayan Katha in evening and offer Arghya to the rising Full Moon.",
    fastingGuidelines: "Fruit and milk diet; partake in Panchamrit and Panjiri prasad after twilight katha.",
    defaultNextDate: "Upcoming Full Moon"
  },
  {
    id: "amavasya-pitru",
    name: "Amavasya Pitru Tarpan & Darsha Vrat",
    hindiName: "अमावस्या पितृ तर्पण व्रत",
    deity: "Ancestors (Pitrus) & Lord Shiva",
    category: "amavasya",
    recurrence: "Monthly (New Moon Tithi)",
    prepWindow: "Chaturdashi Night (7:00 PM – 10:00 PM)",
    morningWindow: "Amavasya Dawn to 12:00 PM (Noon)",
    eveningWindow: "Amavasya Twilight (6:00 PM – 7:30 PM)",
    description: "Pacifies Pitru Dosha, brings ancestral blessings, and clears unseen karmic blocks.",
    remedy: "Perform black sesame (Til) and water Tarpan, donate food and clothes to the needy.",
    fastingGuidelines: "Strict sattvic observance; avoid starting new commercial contracts on Amavasya day.",
    defaultNextDate: "Upcoming New Moon"
  },
  {
    id: "sankashti-chaturthi",
    name: "Sankashti Ganesh Chaturthi Vrat",
    hindiName: "संकष्टी गणेश चतुर्थी व्रत",
    deity: "Lord Ganesha (Vighnaharta)",
    category: "chaturthi",
    recurrence: "Monthly (Krishna Chaturthi)",
    prepWindow: "Tritiya Evening (6:00 PM – 9:00 PM)",
    morningWindow: "Chaturthi Dawn to 12:00 PM (Noon)",
    eveningWindow: "Moonrise Window (~09:15 PM – 10:30 PM)",
    description: "Dissolves insurmountable life barriers, debt traps, court cases, and career anxieties.",
    remedy: "Chant 'Om Gan Ganapataye Namah' and offer Arghya to the Moon upon moonrise sighting.",
    fastingGuidelines: "Strict water/fruit fast until Moonrise sighting; break fast after Ganesha archana.",
    defaultNextDate: "Upcoming 4th Tithi"
  },
  {
    id: "festival-shivratri",
    name: "Maha Shivratri & Masik Shivratri",
    hindiName: "महाशिवरात्रि / मासिक शिवरात्रि व्रत",
    deity: "Lord Shiva (Mahadev)",
    category: "festival",
    recurrence: "Monthly (Krishna Chaturdashi)",
    prepWindow: "Trayodashi Evening (5:30 PM – 9:00 PM)",
    morningWindow: "Dawn Sankalp to 12:00 PM (Noon)",
    eveningWindow: "Nishita Kaal Midnight Vigil (11:45 PM – 01:00 AM)",
    description: "The supreme cosmic night for transcendence of karma, conquering fear, and divine grace.",
    remedy: "Four Prahara Abhishekam with milk, curd, honey, and Bhasma with Mahamrityunjaya Japa.",
    fastingGuidelines: "Nirjala or fruit diet; continuous mental repetition of 'Om Namah Shivaya'.",
    defaultNextDate: "Upcoming 14th Tithi"
  },
  {
    id: "festival-navratri",
    name: "Navratri 9-Day Sacred Devi Vrat",
    hindiName: "नवरात्रि ९-दिवसीय शक्ति व्रत",
    deity: "Maa Durga & 9 Navadurgas",
    category: "festival",
    recurrence: "Biannual (Chaitra & Sharad)",
    prepWindow: "Amavasya Evening Prior (6:00 PM – 9:30 PM)",
    morningWindow: "Ghatasthapana Dawn to 12:00 PM (Noon)",
    eveningWindow: "Sandhya Aarti & Garba (6:30 PM – 9:30 PM)",
    description: "Invokes supreme Shakti for protection against negativity, purification, and spiritual rebirth.",
    remedy: "Light Akhand Jyoti, recite Durga Saptashati, and perform Kanya Pujan on Ashtami/Navami.",
    fastingGuidelines: "Kuttu flour, singhara, fruits, and rock salt; maintain complete celibacy and peace.",
    defaultNextDate: "Upcoming Navratri"
  },
  {
    id: "festival-karwa-chauth",
    name: "Karwa Chauth Saubhagya Vrat",
    hindiName: "करवा चौथ सौभाग्य व्रत",
    deity: "Maa Gauri, Shiva & Chandra Dev",
    category: "festival",
    recurrence: "Annual (Kartika Krishna Chaturthi)",
    prepWindow: "Sargahi Dawn (~04:00 AM – 05:00 AM)",
    morningWindow: "Bapo Puja to 12:00 PM (Noon)",
    eveningWindow: "Moonrise Sighting (~08:15 PM – 09:30 PM)",
    description: "Sacred fast for the longevity, health, and marital bond of one's spouse.",
    remedy: "Worship Karwa Mata, recite Karwa Chauth Katha, and offer Arghya to Moon through sieve.",
    fastingGuidelines: "Strict Nirjala (no water, no food) until Moonrise sighting and husband's water offering.",
    defaultNextDate: "Upcoming Karwa Chauth"
  }
];

export const DEFAULT_SELECTED_VRAT_IDS: string[] = [
  "weekly-mangalvar",
  "ekadashi-indira",
  "pradosh-shani",
  "weekly-somvar",
  "weekly-shanivar",
  "purnima-satyanarayan",
  "sankashti-chaturthi"
];

export const DEFAULT_NOTIFICATION_PREFERENCES: AdvancedNotificationPreferences = {
  soundEnabled: true,
  transit: {
    enabled: true,
    jupiterMajorTransits: true,
    saturnReturnSadeSati: true,
    retrogradeAlerts: true,
    eclipseWarnings: true,
    moonSignChanges: true,
    beneficDrishti: true,
    planets: {
      Sun: true,
      Moon: true,
      Mars: true,
      Mercury: true,
      Jupiter: true,
      Venus: true,
      Saturn: true,
      RahuKetu: true,
    },
    minimumImpactSeverity: "All Transits",
  },
  vratas: {
    enabled: true,
    prepAlert1DayBefore: true,
    dawnSankalpAlert: true,
    ekadashiVrats: true,
    pradoshVrats: true,
    purnimaAmavasya: true,
    weeklyVrats: true,
    festivals: true,
    selectedVratIds: DEFAULT_SELECTED_VRAT_IDS,
  },
  panchang: {
    enabled: true,
    abhijitMuhurat: true,
    rahuKalam: true,
    choghadiyaTimings: true,
    tithiTransitions: true,
    brahmaMuhurat: true,
  },
  purchase: {
    enabled: true,
    orderUpdates: true,
    pdfDossierDelivery: true,
    walletCredits: true,
    consultationReminders: true,
  },
  sadhana: {
    enabled: true,
    dailyJapaReminder: true,
    suryaArghya: true,
    streakProtection: true,
  },
};

const STORAGE_KEY = "astronext_notification_preferences_v3";

export function loadNotificationPreferences(): AdvancedNotificationPreferences {
  if (typeof window === "undefined") return DEFAULT_NOTIFICATION_PREFERENCES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("astronext_notification_preferences_v2");
    if (!raw) return DEFAULT_NOTIFICATION_PREFERENCES;
    const parsed = JSON.parse(raw);
    const loadedVratas = {
      ...DEFAULT_NOTIFICATION_PREFERENCES.vratas,
      ...(parsed?.vratas || {}),
      selectedVratIds: Array.isArray(parsed?.vratas?.selectedVratIds) && parsed.vratas.selectedVratIds.length > 0
        ? parsed.vratas.selectedVratIds
        : DEFAULT_SELECTED_VRAT_IDS
    };

    const loadedTransit = {
      ...DEFAULT_NOTIFICATION_PREFERENCES.transit,
      ...(parsed?.transit || {}),
      planets: {
        ...DEFAULT_NOTIFICATION_PREFERENCES.transit.planets,
        ...(parsed?.transit?.planets || {})
      }
    };

    return {
      ...DEFAULT_NOTIFICATION_PREFERENCES,
      ...parsed,
      transit: loadedTransit,
      vratas: loadedVratas,
      panchang: { ...DEFAULT_NOTIFICATION_PREFERENCES.panchang, ...(parsed?.panchang || {}) },
      purchase: { ...DEFAULT_NOTIFICATION_PREFERENCES.purchase, ...(parsed?.purchase || {}) },
      sadhana: { ...DEFAULT_NOTIFICATION_PREFERENCES.sadhana, ...(parsed?.sadhana || {}) },
    };
  } catch (err) {
    return DEFAULT_NOTIFICATION_PREFERENCES;
  }
}

export function saveNotificationPreferences(prefs: AdvancedNotificationPreferences): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch (err) {
    console.error("Failed to save notification preferences to localStorage", err);
  }
}

/**
 * Generates dynamic, realistic notifications for all selected Vratas strictly adhering to the user's rule:
 * - 1-Day-Before Evening Preparation Alert
 * - Day-Of Dawn Fast & Sankalp Alert (Active until 12:00 PM Afternoon)
 * - Twilight Puja & Parana Alert (Active in Afternoon & Evening)
 */
export function generateDynamicVratNotifications(
  selectedVratIds: string[],
  simulationState: "realtime" | "day_before" | "day_of_morning" | "day_of_afternoon" = "realtime"
): AppNotification[] {
  const currentHour = simulationState === "day_of_morning" ? 9 : simulationState === "day_of_afternoon" ? 16 : new Date().getHours();
  const activeIds = Array.isArray(selectedVratIds) && selectedVratIds.length > 0 ? selectedVratIds : DEFAULT_SELECTED_VRAT_IDS;
  const notifications: AppNotification[] = [];

  activeIds.forEach((vratId) => {
    const def = SACRED_VRATS_LIST.find((v) => v.id === vratId);
    if (!def) return;

    // 1. RULE: 1-DAY-BEFORE PREPARATION ALERT
    // Shown the day before the vrat date
    if (simulationState === "day_before" || simulationState === "realtime") {
      notifications.push({
        id: `vrat-prep-${def.id}`,
        vratId: def.id,
        category: "vratas",
        vratType: "prepAlert1DayBefore",
        vratTimingRule: "day_before",
        title: `Tomorrow is ${def.name} (Preparation Alert)`,
        badgeLabel: `1-DAY-BEFORE PREP • ${def.deity.toUpperCase()}`,
        timestamp: "Day-Before Evening Prep",
        date: "Tomorrow's Fast Commencement",
        message: `Tomorrow is sacred ${def.name}. Tonight's Prep (${def.prepWindow}): Arrange puja samagri, maintain sattvic dinner, and sleep with mindful intent. Dawn fasting commences at sunrise.`,
        remedy: def.remedy,
        actionLabel: "View Fasting Rules & Vidhi",
        actionTab: "vrat_guide",
        metadata: { vratId: def.id, rule: "day_before" },
        isRead: false,
        priority: "urgent"
      });
    }

    // 2. RULE: SAME DAY ON VRAT TILL 12 AFTERNOON
    // Active from dawn strictly until 12:00 PM (noon)
    if (simulationState === "day_of_morning" || (simulationState === "realtime" && currentHour < 12)) {
      notifications.push({
        id: `vrat-dawn-${def.id}`,
        vratId: def.id,
        category: "vratas",
        vratType: "dawnSankalpAlert",
        vratTimingRule: "day_of_morning",
        validUntil: "12:00 PM",
        title: `Today is ${def.name} (Dawn Fast & Sankalp Window)`,
        badgeLabel: "FASTING DAY • SANKALP TILL 12 PM",
        timestamp: "Active until 12:00 PM Noon",
        date: "Today's Sacred Observance",
        message: `Today is active ${def.name}. Fasting vow is underway! Complete your morning sacred bath, Surya Arghya, and ${def.deity} Sankalp before 12:00 PM noon. ${def.fastingGuidelines}`,
        remedy: def.remedy,
        actionLabel: "Open Sankalp Mantra",
        actionTab: "vrat_guide",
        metadata: { vratId: def.id, rule: "day_of_morning", activeTill: "12:00 PM" },
        isRead: false,
        priority: "urgent"
      });
    }

    // 3. RULE: SAME DAY POST-12 AFTERNOON (TWILIGHT PUJA & PARANA)
    // Visible in the afternoon / evening for twilight rituals and parana
    if (simulationState === "day_of_afternoon" || (simulationState === "realtime" && currentHour >= 12)) {
      notifications.push({
        id: `vrat-evening-${def.id}`,
        vratId: def.id,
        category: "vratas",
        vratType: "festivals",
        vratTimingRule: "day_of_evening",
        title: `Today is ${def.name} (Evening Puja & Parana Timing)`,
        badgeLabel: "TWILIGHT PUJA & PARANA",
        timestamp: "Active Evening Window",
        date: "Evening Sadhana & Parana",
        message: `Morning Sankalp concluded at 12:00 PM. Twilight Window (${def.eveningWindow}): Perform ${def.deity} Aarti and prepare for evening observances and tomorrow's morning Parana.`,
        remedy: def.remedy,
        actionLabel: "View Parana Muhurat",
        actionTab: "vrat_guide",
        metadata: { vratId: def.id, rule: "day_of_evening" },
        isRead: false,
        priority: "normal"
      });
    }
  });

  return notifications;
}

export function filterNotificationsByPreferences(
  notifications: AppNotification[],
  prefs?: AdvancedNotificationPreferences,
  options?: { currentHourOverride?: number; allowAllVratRules?: boolean }
): AppNotification[] {
  if (!Array.isArray(notifications)) return [];
  const safePrefs = prefs || DEFAULT_NOTIFICATION_PREFERENCES;
  const currentHour = options?.currentHourOverride !== undefined ? options.currentHourOverride : new Date().getHours();
  const selectedVrats = Array.isArray(safePrefs?.vratas?.selectedVratIds)
    ? safePrefs.vratas.selectedVratIds
    : DEFAULT_SELECTED_VRAT_IDS;

  return notifications.filter((notif) => {
    if (!notif) return false;

    // 1. TRANSIT NOTIFICATIONS
    if (notif.category === "transit") {
      if (safePrefs.transit && safePrefs.transit.enabled === false) return false;

      // Granular movement checks
      if (notif.movementType && safePrefs.transit) {
        const mKey = notif.movementType as keyof typeof safePrefs.transit;
        if (typeof safePrefs.transit[mKey] === "boolean" && safePrefs.transit[mKey] === false) {
          return false;
        }
      }

      // Planet checks
      if (notif.planet && safePrefs.transit?.planets) {
        const planetKey = notif.planet as keyof typeof safePrefs.transit.planets;
        if (planetKey in safePrefs.transit.planets && safePrefs.transit.planets[planetKey] === false) {
          return false;
        }
      }

      // Severity threshold
      if (safePrefs.transit?.minimumImpactSeverity === "Favorable Transits Only") {
        if (notif.severity !== "Favorable Transit") return false;
      } else if (safePrefs.transit?.minimumImpactSeverity === "High Impact Only") {
        if (notif.severity !== "High Impact") return false;
      }

      return true;
    }

    // 2. VRAT NOTIFICATIONS
    if (notif.category === "vratas") {
      if (safePrefs.vratas && safePrefs.vratas.enabled === false) return false;

      // Specific Vrat selection match
      const targetVratId = notif.vratId || notif.metadata?.vratId;
      if (targetVratId) {
        if (!selectedVrats.includes(targetVratId)) {
          return false;
        }
      }

      // General category toggle checks (if defined)
      if (notif.vratType && safePrefs.vratas) {
        const vKey = notif.vratType as keyof typeof safePrefs.vratas;
        if (typeof safePrefs.vratas[vKey] === "boolean" && safePrefs.vratas[vKey] === false) {
          return false;
        }
      }

      // Time Rule Check for Day-Of Morning Sankalp ("same day on vrat till 12 afternoon")
      if (!options?.allowAllVratRules) {
        if (notif.vratTimingRule === "day_of_morning") {
          // If current time is past 12:00 PM noon, the morning alert has expired
          if (currentHour >= 12 && !notif.isRead) {
            // Expired for today's morning window
            return false;
          }
        }
      }

      return true;
    }

    // 3. PANCHANG NOTIFICATIONS
    if (notif.category === "panchang") {
      if (safePrefs.panchang && safePrefs.panchang.enabled === false) return false;

      if (notif.panchangType && safePrefs.panchang) {
        const pKey = notif.panchangType as keyof typeof safePrefs.panchang;
        if (typeof safePrefs.panchang[pKey] === "boolean" && safePrefs.panchang[pKey] === false) {
          return false;
        }
      }
      return true;
    }

    // 4. ORDER & PURCHASE NOTIFICATIONS
    if (notif.category === "purchase") {
      if (safePrefs.purchase && safePrefs.purchase.enabled === false) return false;

      if (notif.purchaseType && safePrefs.purchase) {
        const purKey = notif.purchaseType as keyof typeof safePrefs.purchase;
        if (typeof safePrefs.purchase[purKey] === "boolean" && safePrefs.purchase[purKey] === false) {
          return false;
        }
      }
      return true;
    }

    // 5. SADHANA NOTIFICATIONS
    if (notif.category === "sadhana") {
      if (safePrefs.sadhana && safePrefs.sadhana.enabled === false) return false;

      if (notif.sadhanaType && safePrefs.sadhana) {
        const sKey = notif.sadhanaType as keyof typeof safePrefs.sadhana;
        if (typeof safePrefs.sadhana[sKey] === "boolean" && safePrefs.sadhana[sKey] === false) {
          return false;
        }
      }
      return true;
    }

    return true;
  });
}
