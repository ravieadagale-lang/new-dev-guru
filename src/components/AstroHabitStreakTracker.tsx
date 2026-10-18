import React, { useState, useEffect } from "react";
import { 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  Trophy, 
  Calendar, 
  Volume2, 
  VolumeX, 
  Plus, 
  Award, 
  ShieldCheck, 
  Heart, 
  Zap, 
  Bell, 
  Share2, 
  Check,
  ChevronRight,
  BarChart3
} from "lucide-react";
import { UserProfile } from "../types";

interface AstroHabitStreakTrackerProps {
  userProfile?: UserProfile;
}

interface HabitItem {
  id: string;
  title: string;
  planet: string;
  deity: string;
  category: "Mantra" | "Fasting" | "Charity" | "Surya Arghya" | "Yoga";
  targetCount: number; // e.g. 108 for mantra, 1 for daily act
  currentStreak: number;
  bestStreak: number;
  completedToday: boolean;
  history: Record<string, boolean>; // YYYY-MM-DD -> completed
  mantraText?: string;
  mantraMeaning?: string;
}

const DEFAULT_HABITS: HabitItem[] = [
  {
    id: "h-1",
    title: "108x Gayatri Mantra Recitation",
    planet: "Sun",
    deity: "Lord Surya",
    category: "Mantra",
    targetCount: 108,
    currentStreak: 12,
    bestStreak: 21,
    completedToday: false,
    history: {},
    mantraText: "Om Bhur Bhuvah Svah, Tat Savitur Varenyam, Bhargo Devasya Dhimahi, Dhiyo Yo Nah Prachodayat",
    mantraMeaning: "We meditate on the glory of the Creator who has created the Universe, who is worthy of Worship, who is the embodiment of Knowledge and Light."
  },
  {
    id: "h-2",
    title: "Morning Surya Arghya (Water Offering)",
    planet: "Sun",
    deity: "Surya Deva",
    category: "Surya Arghya",
    targetCount: 1,
    currentStreak: 8,
    bestStreak: 15,
    completedToday: true,
    history: {},
    mantraText: "Om Suryaya Namah (Offer copper lota water facing East within 1 hr of sunrise)",
    mantraMeaning: "Bestows vitality, executive leadership, confidence, and removes solar afflictions."
  },
  {
    id: "h-3",
    title: "Hanuman Chalisa Recitation",
    planet: "Mars",
    deity: "Lord Hanuman",
    category: "Mantra",
    targetCount: 1,
    currentStreak: 5,
    bestStreak: 40,
    completedToday: false,
    history: {},
    mantraText: "Shri Guru Charan Saroj Raj, Nij Manu Mukuru Sudhari...",
    mantraMeaning: "Protects against Mangal Dosha, anxiety, fear, enemy conflicts, and physical fatigue."
  },
  {
    id: "h-4",
    title: "108x Om Namah Shivaya (Rahu & Saturn Peace)",
    planet: "Saturn",
    deity: "Lord Shiva",
    category: "Mantra",
    targetCount: 108,
    currentStreak: 19,
    bestStreak: 30,
    completedToday: true,
    history: {},
    mantraText: "Om Namah Shivaya",
    mantraMeaning: "Calms Rahu/Ketu turbulence, alleviates Sade Sati burdens, and instills deep mental peace."
  },
  {
    id: "h-5",
    title: "Saturday Black Sesame & Grain Charity",
    planet: "Saturn",
    deity: "Shani Deva",
    category: "Charity",
    targetCount: 1,
    currentStreak: 3,
    bestStreak: 8,
    completedToday: false,
    history: {},
    mantraText: "Om Sham Shanaishcharaya Namah",
    mantraMeaning: "Neutralizes karmic debts, delays, and chronic obstacles."
  }
];

export const AstroHabitStreakTracker: React.FC<AstroHabitStreakTrackerProps> = ({ userProfile }) => {
  const todayStr = new Date().toISOString().split("T")[0];

  const [habits, setHabits] = useState<HabitItem[]>(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const saved = localStorage.getItem("astro_habits_data");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return DEFAULT_HABITS;
        }
      }
    }
    return DEFAULT_HABITS;
  });

  const [activeMantraHabit, setActiveMantraHabit] = useState<HabitItem | null>(habits[0]);
  const [beadCount, setBeadCount] = useState<number>(0);
  const [completedMalas, setCompletedMalas] = useState<number>(0);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"counter" | "habits" | "analytics">("counter");

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("astro_habits_data", JSON.stringify(habits));
  }, [habits]);

  // Audio Chime generator using Web Audio API
  const playBeadChime = (is108: boolean = false) => {
    if (!isSoundOn) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = is108 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(is108 ? 528 : 432, ctx.currentTime); // 528Hz Solfeggio or 432Hz Om frequency

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (is108 ? 1.5 : 0.2));

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + (is108 ? 1.5 : 0.2));
    } catch (e) {
      // AudioCtx disabled or restricted
    }
  };

  // Handle Mala Bead Tap
  const handleBeadTap = () => {
    if (!activeMantraHabit) return;

    const nextCount = beadCount + 1;
    if (nextCount >= 108) {
      playBeadChime(true);
      setBeadCount(0);
      setCompletedMalas(prev => prev + 1);

      // Mark habit completed today
      markHabitCompleted(activeMantraHabit.id);
    } else {
      playBeadChime(false);
      setBeadCount(nextCount);
    }
  };

  const markHabitCompleted = (id: string) => {
    setHabits(prev => prev.map(h => {
      if (h.id === id) {
        const isDone = !h.completedToday;
        const newHistory = { ...h.history, [todayStr]: isDone };
        const newStreak = isDone ? h.currentStreak + 1 : Math.max(0, h.currentStreak - 1);
        return {
          ...h,
          completedToday: isDone,
          currentStreak: newStreak,
          bestStreak: Math.max(h.bestStreak, newStreak),
          history: newHistory
        };
      }
      return h;
    }));
  };

  // Badges Calculation
  const badges = [
    {
      title: "7-Day Sadhana Pioneer",
      desc: "Maintained a 7-day continuous spiritual habit streak",
      icon: "🔥",
      unlocked: habits.some(h => h.currentStreak >= 7 || h.bestStreak >= 7)
    },
    {
      title: "108 Mantras Tapasvi",
      desc: "Completed a full 108-bead Japa Mala recitation",
      icon: "📿",
      unlocked: completedMalas > 0 || habits.some(h => h.completedToday && h.category === "Mantra")
    },
    {
      title: "Surya Arghya Devotee",
      desc: "Offered morning solar water rituals consistently",
      icon: "🌅",
      unlocked: habits.find(h => h.category === "Surya Arghya")?.currentStreak! >= 5
    },
    {
      title: "21-Day Karma Alchemist",
      desc: "Sustained a 21-day transformation streak",
      icon: "🏆",
      unlocked: habits.some(h => h.currentStreak >= 21 || h.bestStreak >= 21)
    }
  ];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-sm space-y-8 animate-in fade-in">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            Spiritual Discipline & Remedial Sadhana Tracker
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Interactive Astro-Habit & Japa Mala Engine
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Track daily planetary remedies, mantram recitation streaks, Surya Arghya offerings, and charity routines with audio Japa Mala feedback and gamified karmic badges.
          </p>
        </div>

        {/* TABS & TOGGLES */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold flex gap-1">
            <button
              onClick={() => setActiveTab("counter")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "counter" ? "bg-slate-950 text-amber-300 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              📿 Japa Mala Counter
            </button>
            <button
              onClick={() => setActiveTab("habits")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "habits" ? "bg-slate-950 text-amber-300 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🔥 Daily Habits ({habits.filter(h => h.completedToday).length}/{habits.length})
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "analytics" ? "bg-slate-950 text-amber-300 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🏆 Badges & Streaks
            </button>
          </div>

          <button
            onClick={() => setIsSoundOn(!isSoundOn)}
            className="p-2 bg-slate-100 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer"
            title={isSoundOn ? "Sound On (432Hz Om Chime)" : "Sound Muted"}
          >
            {isSoundOn ? <Volume2 className="w-4 h-4 text-amber-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>
        </div>
      </div>

      {/* TAB 1: 108 JAPA MALA BEAD COUNTER */}
      {activeTab === "counter" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* LEFT: MANTRA SELECTOR & DETAILS */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Active Remedy Mantra
              </label>
              <select
                value={activeMantraHabit?.id || habits[0].id}
                onChange={(e) => {
                  const selected = habits.find(h => h.id === e.target.value);
                  setActiveMantraHabit(selected || habits[0]);
                  setBeadCount(0);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-500 bg-white"
              >
                {habits.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.title} ({h.planet} Remedy)
                  </option>
                ))}
              </select>
            </div>

            {activeMantraHabit && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 p-5 rounded-2xl border border-amber-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
                    {activeMantraHabit.planet} • {activeMantraHabit.deity}
                  </span>
                  <span className="text-xs font-bold text-amber-800">
                    Streak: {activeMantraHabit.currentStreak} Days 🔥
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="font-serif font-bold text-slate-900 text-sm leading-snug">
                    "{activeMantraHabit.mantraText}"
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed italic">
                    {activeMantraHabit.mantraMeaning}
                  </p>
                </div>

                <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>Completed Malas Today: <strong className="text-amber-800">{completedMalas}</strong></span>
                  <button
                    onClick={() => {
                      setBeadCount(0);
                      setCompletedMalas(0);
                    }}
                    className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset Bead Count
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: INTERACTIVE BEAD RING */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-4">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
              {/* Outer Decorative Mala Circle */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="42%"
                  className="stroke-slate-200"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="42%"
                  className="stroke-amber-500 transition-all duration-300"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 120}`}
                  strokeDashoffset={`${2 * Math.PI * 120 * (1 - beadCount / 108)}`}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              {/* CENTER TAP BUTTON */}
              <button
                onClick={handleBeadTap}
                className="w-44 h-44 rounded-full bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 text-slate-950 font-serif font-bold shadow-xl hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ring-8 ring-amber-100"
              >
                <Sparkles className="w-6 h-6 text-slate-950 animate-pulse" />
                <span className="text-4xl font-black">{beadCount}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900 opacity-90">
                  / 108 BEADS
                </span>
                <span className="text-[9px] bg-slate-950/20 px-2 py-0.5 rounded-full text-slate-950 font-semibold mt-1">
                  TAP TO RECITE
                </span>
              </button>
            </div>

            <p className="text-xs text-slate-500 font-medium text-center">
              Tap the central mala disk after each mantra repetition. 432Hz Om chime triggers automatically on 108th bead.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: DAILY HABIT LIST & LOGS */}
      {activeTab === "habits" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                  habit.completedToday
                    ? "bg-emerald-50/60 border-emerald-300 shadow-xs"
                    : "bg-white border-slate-200 hover:border-amber-300"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                      {habit.planet}
                    </span>
                    <h4 className="font-serif font-bold text-slate-900 text-sm">
                      {habit.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">
                    {habit.mantraText || habit.mantraMeaning}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                    <span>Streak: <strong className="text-amber-700">{habit.currentStreak} Days 🔥</strong></span>
                    <span>Best: {habit.bestStreak} Days</span>
                  </div>
                </div>

                <button
                  onClick={() => markHabitCompleted(habit.id)}
                  className={`p-3 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    habit.completedToday
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-amber-500 text-slate-950 hover:bg-amber-400"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{habit.completedToday ? "Done Today" : "Mark Done"}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ANALYTICS & UNLOCKED BADGES */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {badges.map((b, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all text-center space-y-2 ${
                  b.unlocked
                    ? "bg-amber-50/80 border-amber-300 text-slate-900 shadow-xs"
                    : "bg-slate-50 border-slate-200 opacity-60"
                }`}
              >
                <div className="text-3xl">{b.icon}</div>
                <div className="font-serif font-bold text-sm text-slate-900">{b.title}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  b.unlocked ? "bg-amber-500 text-slate-950" : "bg-slate-200 text-slate-600"
                }`}>
                  {b.unlocked ? "Unlocked Badge 🏆" : "Locked Sadhana"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
