import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Bell, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  X, 
  ChevronRight, 
  Info, 
  Flame, 
  Sun, 
  CalendarCheck,
  Sparkles,
  Utensils,
  BookOpen,
  Volume2
} from "lucide-react";
import { ALL_VRATS_CATALOG, VratItem } from "../data/vratGuideData";
import { playSingingBowlChime } from "../utils/audioEffects";

interface VratNotificationBannerProps {
  onOpenVratDetails: (vratId: string) => void;
  onNavigateToVratTab: () => void;
}

interface VratAlert {
  id: string;
  type: "tomorrow_preview" | "today_active" | "sacred_upcoming";
  vrat: VratItem;
  badgeLabel: string;
  badgeTone: "amber" | "indigo" | "emerald";
  title: string;
  hindiTitle: string;
  formattedDate: string;
  relativeDay: string;
  timingLabel: string;
  actionGuide: string;
  preparationTonight: string;
  foodReminder: string;
  paranaInfo: string;
  mantra: string;
}

export const VratNotificationBanner: React.FC<VratNotificationBannerProps> = ({
  onOpenVratDetails,
  onNavigateToVratTab
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeAlertIndex, setActiveAlertIndex] = useState(0);

  // Compute live real dates and times
  const today = new Date();
  const currentHour = today.getHours();
  const isMorningOrHalfDay = currentHour < 14; // Before 2:00 PM show active today

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const upcomingEkadashiDate = new Date(today);
  upcomingEkadashiDate.setDate(today.getDate() + 3);

  // Formatter helpers
  const formatFullDate = (d: Date) => {
    return d.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const formatHindiDate = (d: Date) => {
    const weekdaysHindi = ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"];
    const monthsHindi = ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];
    return `${weekdaysHindi[d.getDay()]}, ${d.getDate()} ${monthsHindi[d.getMonth()]}`;
  };

  // Day of week index (0=Sun, 1=Mon, ..., 6=Sat)
  const dayIndex = today.getDay();
  const weekdayVratMap: Record<number, { id: string; tomorrowId: string }> = {
    0: { id: "weekly-ravivar", tomorrowId: "weekly-somvar" },
    1: { id: "weekly-somvar", tomorrowId: "weekly-mangalvar" },
    2: { id: "weekly-mangalvar", tomorrowId: "weekly-budhvar" },
    3: { id: "weekly-budhvar", tomorrowId: "weekly-guruvar" },
    4: { id: "weekly-guruvar", tomorrowId: "weekly-shukravar" },
    5: { id: "weekly-shukravar", tomorrowId: "weekly-shanivar" },
    6: { id: "weekly-shanivar", tomorrowId: "weekly-ravivar" }
  };

  const currentWeekday = weekdayVratMap[dayIndex];

  // Dynamic alerts list with dates and attention-grabbing real notification attributes
  const activeAlerts: VratAlert[] = useMemo(() => {
    const alerts: VratAlert[] = [];

    // 1. Tomorrow's Vrat (1-Day-Before Alert with Prep & Sankalp)
    const tomorrowVrat = ALL_VRATS_CATALOG.find((v) => v.id === currentWeekday.tomorrowId) || ALL_VRATS_CATALOG[1];
    alerts.push({
      id: "alert-tomorrow-prep",
      type: "tomorrow_preview",
      vrat: tomorrowVrat,
      badgeLabel: "1-DAY-BEFORE ALERT",
      badgeTone: "amber",
      title: `Tomorrow is ${tomorrowVrat.name}`,
      hindiTitle: `कल ${tomorrowVrat.nameHindi || tomorrowVrat.name} है`,
      formattedDate: formatFullDate(tomorrow),
      relativeDay: "Tomorrow",
      timingLabel: "Sunrise Start · ~06:05 AM",
      actionGuide: `Prepare tonight: Arrange puja samagri, maintain sattvic dinner, and take Sankalp at dawn.`,
      preparationTonight: "Avoid heavy onion/garlic food tonight. Clean your altar, prepare fruits, milk/sweets, and fresh puja attire.",
      foodReminder: `Fasting Method: ${tomorrowVrat.fastingMethod || "Sattvic"} · Allowed: ${tomorrowVrat.permittedFoods?.slice(0, 3)?.join(", ") || "Fruits, milk, nuts"}.`,
      paranaInfo: tomorrowVrat.paranaRules || "Break fast next morning after sunrise following deity prayer and charity.",
      mantra: tomorrowVrat.vidhi?.[0] || "ॐ श्री गणेशाय नमः / ॐ बुं बुधाय नमः"
    });

    // 2. Today's Active Vrat (Active Fast in Progress)
    if (isMorningOrHalfDay) {
      const todayVrat = ALL_VRATS_CATALOG.find((v) => v.id === currentWeekday.id) || ALL_VRATS_CATALOG[0];
      alerts.push({
        id: "alert-today-active",
        type: "today_active",
        vrat: todayVrat,
        badgeLabel: "ACTIVE FAST TODAY",
        badgeTone: "indigo",
        title: `Today is ${todayVrat.name} (${todayVrat.deity})`,
        hindiTitle: `आज ${todayVrat.nameHindi || todayVrat.name} का पावन व्रत है`,
        formattedDate: formatFullDate(today),
        relativeDay: "Today",
        timingLabel: "Active Fasting · Till Sunset",
        actionGuide: `Fasting in progress. Observe ${todayVrat.fastingMethod || "Sattvic"} vow, chant deity mantras, and maintain truthful calm conduct.`,
        preparationTonight: "Maintain spiritual focus. Light ghee lamp in the evening before sunset.",
        foodReminder: `Allowed: ${todayVrat.permittedFoods?.slice(0, 3)?.join(", ") || "Fruits, milk"}. Avoid: ${todayVrat.forbiddenFoods?.slice(0, 2)?.join(", ") || "Grains, onion, garlic"}.`,
        paranaInfo: todayVrat.paranaRules,
        mantra: todayVrat.vidhi?.[0] || "ॐ नमः शिवाय / ॐ हनुमते नमः"
      });
    }

    // 3. Upcoming Ekadashi / Sacred Vow Reminder
    const nextEkadashi = ALL_VRATS_CATALOG.find((v) => v.category === "ekadashi") || ALL_VRATS_CATALOG[7];
    alerts.push({
      id: "alert-ekadashi-upcoming",
      type: "sacred_upcoming",
      vrat: nextEkadashi,
      badgeLabel: "SACRED EKADASHI COMING",
      badgeTone: "emerald",
      title: `Upcoming: ${nextEkadashi.name}`,
      hindiTitle: `आगामी: ${nextEkadashi.nameHindi || nextEkadashi.name}`,
      formattedDate: formatFullDate(upcomingEkadashiDate),
      relativeDay: "Upcoming 11th Tithi",
      timingLabel: "Dawn to Next Day Dwadashi",
      actionGuide: `Strict rice and grain abstinence. Prepare sattvic fruits, singhara flour, and devotion to Lord Vishnu.`,
      preparationTonight: "Dashami evening: Consume light single meal without grains or heavy spices.",
      foodReminder: "Strictly avoid all rice, wheat, grains, pulses. Allowed: Fruits, milk, nuts, kuttu.",
      paranaInfo: nextEkadashi.paranaRules,
      mantra: "ॐ नमो भगवते वासुदेवाय"
    });

    return alerts;
  }, [dayIndex, currentWeekday, isMorningOrHalfDay]);

  const currentAlert = activeAlerts[activeAlertIndex % activeAlerts.length];

  if (isDismissed || !currentAlert) return null;

  return (
    <aside 
      aria-label="Sacred Vedic Vrat Alert Notification"
      className="w-full bg-[#181410] bg-gradient-to-r from-[#241C15] via-[#1A1511] to-[#241C15] text-amber-100 border-b border-amber-500/35 shadow-lg relative z-30 overflow-hidden"
    >
      {/* Radiant Golden Shimmer Ray */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-shimmer-sweep opacity-90 pointer-events-none" 
      />

      <div className="max-w-[1920px] mx-auto px-3 sm:px-6 lg:px-8 py-2.5">
        {/* Main Notification Row: Flex alignment with clear visual rhythm */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2.5 lg:gap-4">
          
          {/* Left Block: Attention Indicator + Detailed Aligned Text */}
          <div className="flex items-center gap-3 flex-1 min-w-0 w-full lg:w-auto">
            
            {/* Attention-Grabbing Live Flash Beacon & Bell Badge */}
            <div 
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase shadow-sm shrink-0 border ${
                currentAlert.badgeTone === "amber"
                  ? "bg-amber-500/20 text-amber-200 border-amber-400/50 shadow-amber-500/20"
                  : currentAlert.badgeTone === "indigo"
                  ? "bg-indigo-900/40 text-indigo-200 border-indigo-400/50 shadow-indigo-500/20"
                  : "bg-emerald-900/40 text-emerald-200 border-emerald-400/50 shadow-emerald-500/20"
              }`}
            >
              {/* Radar Ping Beacon */}
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  currentAlert.badgeTone === "amber" ? "bg-amber-400" : currentAlert.badgeTone === "indigo" ? "bg-indigo-400" : "bg-emerald-400"
                }`} />
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  currentAlert.badgeTone === "amber" ? "bg-amber-400" : currentAlert.badgeTone === "indigo" ? "bg-indigo-400" : "bg-emerald-400"
                }`} />
              </span>

              {/* Ringing Temple Bell */}
              <Bell className="w-3.5 h-3.5 text-amber-300 animate-bell-ring shrink-0" />
              <span className="whitespace-nowrap font-semibold">{currentAlert.badgeLabel}</span>
            </div>

            {/* Structured Notification Text Hierarchy */}
            <div className="min-w-0 flex-1">
              {/* Line 1: Headline + High-Visibility Date Chip + Timing Muhurat */}
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-bold text-amber-100 tracking-tight flex items-center gap-1.5 font-serif">
                  <span>{currentAlert.title}</span>
                </h3>

                {/* EXACT CALENDAR DATE BADGE */}
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-semibold shadow-xs">
                  <Calendar className="w-3 h-3 text-amber-300" />
                  <span>{currentAlert.formattedDate}</span>
                </span>

                {/* TIMING PILL */}
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-amber-200/90 bg-stone-900/80 px-2 py-0.5 rounded-md border border-amber-500/20 font-mono">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{currentAlert.timingLabel}</span>
                </span>
              </div>

              {/* Line 2: Preparation Guide / Real Advice with Clean Alignment */}
              <div className="flex items-center gap-2 mt-0.5 text-xs text-amber-100/80 truncate">
                <span className="text-amber-300/90 font-medium shrink-0">
                  {currentAlert.type === "tomorrow_preview" ? "Tonight's Prep:" : "Guidance:"}
                </span>
                <span className="truncate text-amber-100/75">
                  {currentAlert.actionGuide}
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Bar: Pristine Aligned Buttons */}
          <div className="flex items-center gap-2 shrink-0 self-end lg:self-auto w-full sm:w-auto justify-end pt-1 lg:pt-0 border-t lg:border-t-0 border-amber-500/20">
            
            {/* Primary Action Button (View Vrat Vidhi) */}
            <button
              onClick={() => {
                onOpenVratDetails(currentAlert.vrat.id);
                onNavigateToVratTab();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md hover:shadow-amber-500/25 cursor-pointer active:scale-95"
            >
              <CalendarCheck className="w-3.5 h-3.5 text-stone-950" />
              <span className="whitespace-nowrap">View Vrat Vidhi & Rules</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-950" />
            </button>

            {/* Quick Rules & Samagri Drawer Toggle */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1 border transition-all cursor-pointer ${
                isExpanded 
                  ? "bg-amber-500/20 text-amber-200 border-amber-400/50" 
                  : "bg-stone-900/80 hover:bg-stone-800 text-amber-300/90 border-amber-500/25"
              }`}
              title={isExpanded ? "Collapse Details" : "Expand Fasting Rules & Samagri"}
            >
              <Info className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isExpanded ? "Close Rules" : "Samagri"}</span>
            </button>

            {/* Sound Chime Button */}
            <button
              onClick={() => playSingingBowlChime()}
              className="p-1.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-amber-300/80 hover:text-amber-200 border border-amber-500/25 transition-all cursor-pointer"
              title="Play Sacred Temple Bell Chime"
              aria-label="Play sacred chime"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>

            {/* Cycle next alert if multiple alerts exist */}
            {activeAlerts.length > 1 && (
              <button
                onClick={() => {
                  setActiveAlertIndex((prev) => (prev + 1) % activeAlerts.length);
                  playSingingBowlChime();
                }}
                className="px-2.5 py-1.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-amber-200 border border-amber-500/25 text-xs font-medium flex items-center gap-1 cursor-pointer"
                title="Switch Alert (Tomorrow / Today / Upcoming)"
              >
                <span>{activeAlertIndex + 1}/{activeAlerts.length}</span>
                <ChevronRight className="w-3 h-3 text-amber-400" />
              </button>
            )}

            {/* Dismiss Banner Button */}
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1.5 rounded-xl text-amber-400/60 hover:text-amber-200 hover:bg-stone-800/80 transition-colors cursor-pointer"
              aria-label="Dismiss notification"
              title="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expandable Quick Rules & Fasting Samagri Panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden pt-3 mt-3 border-t border-amber-500/20 text-xs"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pb-1">
                {/* Card 1: Tonight's Preparation & Puja Samagri */}
                <div className="bg-stone-950/70 p-3 rounded-2xl border border-amber-500/25 flex flex-col justify-between">
                  <div>
                    <div className="font-semibold text-amber-300 flex items-center gap-1.5 mb-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Puja Samagri & Preparation</span>
                    </div>
                    <p className="text-amber-100/80 leading-relaxed">
                      {currentAlert.preparationTonight}
                    </p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-amber-500/15 text-[11px] text-amber-300/80 font-mono">
                    Mantra: {currentAlert.mantra}
                  </div>
                </div>

                {/* Card 2: Permitted & Prohibited Foods */}
                <div className="bg-stone-950/70 p-3 rounded-2xl border border-amber-500/25 flex flex-col justify-between">
                  <div>
                    <div className="font-semibold text-emerald-300 flex items-center gap-1.5 mb-1.5">
                      <Utensils className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Fasting Foods (Phalahar / Vrat Diet)</span>
                    </div>
                    <p className="text-amber-100/80 leading-relaxed">
                      {currentAlert.foodReminder}
                    </p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-amber-500/15 text-[11px] text-emerald-300/90 font-medium">
                    Avoid: Garlic, onions, grains, processed oils, table salt.
                  </div>
                </div>

                {/* Card 3: Parana & Fast-Breaking Rules */}
                <div className="bg-stone-950/70 p-3 rounded-2xl border border-amber-500/25 flex flex-col justify-between">
                  <div>
                    <div className="font-semibold text-amber-300 flex items-center gap-1.5 mb-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Parana Timing & Rules (पारण विधि)</span>
                    </div>
                    <p className="text-amber-100/80 leading-relaxed">
                      {currentAlert.paranaInfo}
                    </p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-amber-500/15 flex items-center justify-between">
                    <span className="text-[11px] text-amber-300/80">Date: {currentAlert.formattedDate}</span>
                    <button
                      onClick={() => {
                        onOpenVratDetails(currentAlert.vrat.id);
                        onNavigateToVratTab();
                      }}
                      className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Full Vidhi</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
};
