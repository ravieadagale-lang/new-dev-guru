import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Trophy, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Volume2, 
  Flame, 
  Compass, 
  Share2, 
  RotateCcw, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Lock, 
  Zap, 
  Eye, 
  Layers, 
  Check, 
  Clock, 
  X,
  Copy,
  Download
} from "lucide-react";
import { UserProfile } from "../types";
import { playSingingBowlChime, playCardFlipSound, playCardHoverSound } from "../utils/audioEffects";

interface SpiritualMilestonesBadgeWidgetProps {
  userProfile?: UserProfile;
  onNavigateTab?: (tab: string) => void;
}

export interface BadgeItem {
  id: string;
  title: string;
  titleHindi: string;
  description: string;
  iconName: string;
  category: "Learning" | "Mantras & Sadhana" | "Astrology & Charts" | "Habit Streaks";
  requiredCount: number;
  currentCount: number;
  isUnlocked: boolean;
  unlockedAt: string | null;
  karmaXpBonus: number;
  tier: "Bronze" | "Silver" | "Gold" | "Diamond";
  actionText: string;
  actionType: "read_blog" | "do_mantra" | "do_japa_108" | "check_chart" | "check_panchang" | "do_streak";
}

export interface SpiritualArticle {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  author: string;
  summary: string;
  content: string[];
  mantraQuote?: string;
  isRead?: boolean;
}

const ARTICLES_DATABASE: SpiritualArticle[] = [
  {
    id: "art-108-japa",
    title: "The Sacred Mathematics of 108 Beads in Vedic Japa",
    subtitle: "Why 108 is the fundamental cosmic frequency connecting the Earth, Sun, and Moon.",
    category: "Mantras & Sadhana",
    readTime: "3 min read",
    author: "Vedic Wisdom Academy",
    summary: "Discover why Vedic seers ordained 108 recitations for mantras and how distance calculations reveal profound cosmic geometry.",
    content: [
      "The number 108 has held sacred significance in Vedic cosmology for over 5,000 years. It is not an arbitrary number, but a precise mathematical constant of our solar system.",
      "The average distance from the Sun to the Earth is approximately 108 times the diameter of the Sun. Similarly, the distance from the Earth to the Moon is approximately 108 times the Moon's diameter.",
      "In Ayurveda and Yoga Shastra, there are 108 Marma points (sacred energy junctures) in the human subtle body. Chanting a mantra 108 times purifies each energy channel (Nadi) and aligns your pranic field with cosmic harmony.",
      "When performing daily mantra japa, focus your awareness on the vibration of each syllable rather than speed. Quality of devotion (Bhava) transcends simple numerical repetition."
    ],
    mantraQuote: "ॐ नमः शिवाय (Om Namah Shivaya) — Resonates with the 5 elements of creation."
  },
  {
    id: "art-sade-sati",
    title: "Understanding Sade Sati: Saturn's 7.5 Year Karmic Crucible",
    subtitle: "How Shani Dev transforms ego into spiritual wisdom through patience and discipline.",
    category: "Astrology & Charts",
    readTime: "4 min read",
    author: "Acharya Dev-Guru",
    summary: "Learn why Sade Sati is not a curse, but a period of profound karmic recalibration and spiritual maturity.",
    content: [
      "Sade Sati occurs when transit Saturn (Shani Gochar) passes through the 12th house, 1st house (Moon sign), and 2nd house relative to your natal Moon sign. Each phase lasts approximately 2.5 years, totaling 7.5 years.",
      "The first phase impacts family finances and mental solitude. The second phase (peak Sade Sati) directly tests personal identity and health. The third phase reorganizes career structures and long-term stability.",
      "Vedic remedies during Sade Sati include reciting Hanuman Chalisa on Tuesdays & Saturdays, donating black sesame seeds or iron utensils, and maintaining unyielding ethical integrity.",
      "Embrace Saturn as the ultimate Guru who strips away false attachments to reveal your soul's authentic strength."
    ],
    mantraQuote: "ॐ शं शनैश्चराय नमः (Om Sham Shanaishcharaya Namah)"
  },
  {
    id: "art-surya-arghya",
    title: "Surya Arghya: The Scientific & Spiritual Power of Sunrise Water Offerings",
    subtitle: "How offering water to the morning Sun revitalizes the nervous system and activates Lagna lord strength.",
    category: "Mantras & Sadhana",
    readTime: "3 min read",
    author: "Vedic Health & Astro Science",
    summary: "Explore the solar science behind offering water in a copper vessel during sunrise.",
    content: [
      "In Maharishi Parashari astrology, the Sun (Surya) represents the Atman (Soul), executive authority, eyesight, bone health, and willpower. A weak Sun causes self-doubt, lethargy, and lack of recognition.",
      "Offering water through a copper Lota facing East within 1 hour of sunrise creates a natural prism. As sunlight passes through the falling water stream, spectrum light rays nourish the optic nerves and pineal gland.",
      "Hold the copper vessel above your forehead level, gaze through the water stream without looking directly at the intense solar disk, and chant 'Om Suryaya Namah' 12 times.",
      "Regular practice enhances aura radiance, improves blood circulation, and nullifies solar afflictions in your birth chart."
    ],
    mantraQuote: "ॐ सूर्यदेवताभ्यो नमः (Om Suryadevataabhyo Namah)"
  },
  {
    id: "art-12-bhavas",
    title: "The 12 Bhavas: Unlocking Your Kundli's House Placements",
    subtitle: "A practical guide to understanding how the 12 houses shape career, marriage, wealth, and Moksha.",
    category: "Astrology & Charts",
    readTime: "5 min read",
    author: "Dr. Parashar Astrology Center",
    summary: "Understand the four Purusharthas: Dharma (1,5,9), Artha (2,6,10), Kama (3,7,11), and Moksha (4,8,12).",
    content: [
      "Your Kundli is divided into 12 houses (Bhavas), each representing specific departments of human life. The 1st house (Lagna) is your physical self and destiny baseline.",
      "Dharma Trikona (Houses 1, 5, 9) governs righteousness, past-life merit (Poorva Punya), and higher wisdom. Artha Trikona (Houses 2, 6, 10) dictates livelihood, wealth accumulation, and daily work service.",
      "Kama Trikona (Houses 3, 7, 11) manages desires, marriage partnerships, and financial gains. Moksha Trikona (Houses 4, 8, 12) leads to emotional peace, deep transformation, and ultimate spiritual liberation.",
      "Evaluating house lords alongside planet occupants reveals where your soul energy is destined to focus in this incarnation."
    ],
    mantraQuote: "धर्मेण हीनाः पशुभिः समानाः — Righteousness elevates human consciousness."
  },
  {
    id: "art-rahu-ketu",
    title: "Rahu & Ketu 2026: Navigating Shadow Planet Transits",
    subtitle: "Mastering the karmic node axis to channel ambition while avoiding worldly illusions.",
    category: "Astrology & Charts",
    readTime: "4 min read",
    author: "Vedic Node Specialist",
    summary: "Rahu creates intense material cravings and innovation, while Ketu drives detachment and mystical insight.",
    content: [
      "Rahu and Ketu are mathematical points where the Moon's orbit intersects the ecliptic plane. Despite having no physical body, their gravitational and magnetic impact on human psychology is unmatched.",
      "Rahu signifies futuristic technology, global expansion, and obsessive drives in the house it occupies. Ketu signifies mastery achieved in previous lifetimes, spiritual introspection, and sudden cutoffs.",
      "To balance Rahu energy, practice grounding meditation and avoid speculative gambling. To balance Ketu energy, engage in charitable acts without expecting public praise.",
      "Reciting 'Om Ketave Namah' and keeping clean silver items brings tranquility during shadow transits."
    ],
    mantraQuote: "ॐ रां राहवे नमः (Om Raam Rahave Namah)"
  },
  {
    id: "art-vastu-harmony",
    title: "Vastu Shastra & Sacred Geometry for Modern Living",
    subtitle: "Aligning home energy zones with the 5 Panchabhutas for prosperity and peace.",
    category: "Learning",
    readTime: "3 min read",
    author: "Vastu Shastra Sansthan",
    summary: "Practical tips to balance Ishanya (North-East) for meditation and Agneya (South-East) for vitality.",
    content: [
      "Vastu Shastra is the ancient Vedic science of architecture and spatial geometry. It synchronizes human habitations with elemental forces: Earth, Water, Fire, Air, and Space.",
      "The North-East (Ishanya) corner is governed by Lord Shiva and Water element. Keep this quadrant ultra-clean, clutter-free, and ideal for your altar or daily meditation space.",
      "The South-East (Agneya) corner is ruled by Fire (Agni). Placing electrical appliances, lamps, or kitchens here activates metabolic health and financial vitality.",
      "Placing a brass Meru Yantra or Sri Yantra in the North direction attracts abundant opportunities and clear mental focus."
    ],
    mantraQuote: "ॐ वास्तुपुरुषाय नमः (Om Vastu Purushaya Namah)"
  }
];

export const SpiritualMilestonesBadgeWidget: React.FC<SpiritualMilestonesBadgeWidgetProps> = ({
  userProfile,
  onNavigateTab
}) => {
  // Persistence state
  const [karmaXp, setKarmaXp] = useState<number>(() => {
    const saved = localStorage.getItem("milestone_karma_xp");
    return saved ? parseInt(saved, 10) : 150;
  });

  const [blogsReadCount, setBlogsReadCount] = useState<number>(() => {
    const saved = localStorage.getItem("milestone_blogs_read_count");
    return saved ? parseInt(saved, 10) : 1;
  });

  const [readBlogIds, setReadBlogIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("milestone_read_blog_ids");
    return saved ? JSON.parse(saved) : ["art-108-japa"];
  });

  const [dailyMantrasCount, setDailyMantrasCount] = useState<number>(() => {
    const saved = localStorage.getItem("milestone_daily_mantras_count");
    return saved ? parseInt(saved, 10) : 1;
  });

  const [totalJapaBeads, setTotalJapaBeads] = useState<number>(() => {
    const saved = localStorage.getItem("milestone_total_japa_beads");
    return saved ? parseInt(saved, 10) : 27;
  });

  const [birthChartsAnalyzed, setBirthChartsAnalyzed] = useState<number>(() => {
    const saved = localStorage.getItem("milestone_birth_charts_analyzed");
    return saved ? parseInt(saved, 10) : 1;
  });

  const [panchangChecksCount, setPanchangChecksCount] = useState<number>(() => {
    const saved = localStorage.getItem("milestone_panchang_checks");
    return saved ? parseInt(saved, 10) : 1;
  });

  const [habitStreakDays, setHabitStreakDays] = useState<number>(() => {
    const saved = localStorage.getItem("milestone_habit_streak_days");
    return saved ? parseInt(saved, 10) : 4;
  });

  const [unlockedBadgeIds, setUnlockedBadgeIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("milestone_unlocked_badges");
    return saved ? JSON.parse(saved) : ["b-mantra-1", "b-panchang-1"];
  });

  // UI States
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeArticle, setActiveArticle] = useState<SpiritualArticle | null>(null);
  const [celebrationBadge, setCelebrationBadge] = useState<BadgeItem | null>(null);
  const [certificateBadge, setCertificateBadge] = useState<BadgeItem | null>(null);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);
  const [copiedCert, setCopiedCert] = useState<boolean>(false);
  const [floatingXps, setFloatingXps] = useState<{ id: number; amount: number; x: number; y: number }[]>([]);

  const triggerFloatingXp = (amount: number, e?: React.MouseEvent) => {
    const x = e ? e.clientX : window.innerWidth / 2;
    const y = e ? e.clientY : window.innerHeight / 2;
    const id = Date.now() + Math.random();
    setFloatingXps((prev) => [...prev, { id, amount, x, y }]);
    setTimeout(() => {
      setFloatingXps((prev) => prev.filter((item) => item.id !== id));
    }, 1200);
  };

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem("milestone_karma_xp", karmaXp.toString());
    localStorage.setItem("milestone_blogs_read_count", blogsReadCount.toString());
    localStorage.setItem("milestone_read_blog_ids", JSON.stringify(readBlogIds));
    localStorage.setItem("milestone_daily_mantras_count", dailyMantrasCount.toString());
    localStorage.setItem("milestone_total_japa_beads", totalJapaBeads.toString());
    localStorage.setItem("milestone_birth_charts_analyzed", birthChartsAnalyzed.toString());
    localStorage.setItem("milestone_panchang_checks", panchangChecksCount.toString());
    localStorage.setItem("milestone_habit_streak_days", habitStreakDays.toString());
    localStorage.setItem("milestone_unlocked_badges", JSON.stringify(unlockedBadgeIds));
  }, [
    karmaXp, 
    blogsReadCount, 
    readBlogIds, 
    dailyMantrasCount, 
    totalJapaBeads, 
    birthChartsAnalyzed, 
    panchangChecksCount, 
    habitStreakDays, 
    unlockedBadgeIds
  ]);

  // Derive User Level & Title
  const userLevelInfo = useMemo(() => {
    if (karmaXp < 200) return { level: 1, title: "Vedic Novice (प्रारंभिक जिज्ञासु)", nextXp: 200, icon: Star };
    if (karmaXp < 500) return { level: 2, title: "Spiritual Seeker (मार्ग साधक)", nextXp: 500, icon: Sparkles };
    if (karmaXp < 1000) return { level: 3, title: "Karmic Practitioner (कर्म योगी)", nextXp: 1000, icon: Flame };
    if (karmaXp < 2000) return { level: 4, title: "Mantra Sadhak (मंत्र सिद्ध)", nextXp: 2000, icon: ShieldCheck };
    return { level: 5, title: "Vedic Rishi (परम ज्ञानी)", nextXp: 5000, icon: Trophy };
  }, [karmaXp]);

  // Badges Definitions
  const badgesList: BadgeItem[] = useMemo(() => {
    return [
      {
        id: "b-mantra-1",
        title: "Mantra Practitioner",
        titleHindi: "नित्य मंत्र साधक",
        description: "Perform at least 1 daily mantra recitation session.",
        iconName: "Volume2",
        category: "Mantras & Sadhana",
        requiredCount: 1,
        currentCount: dailyMantrasCount,
        isUnlocked: unlockedBadgeIds.includes("b-mantra-1") || dailyMantrasCount >= 1,
        unlockedAt: unlockedBadgeIds.includes("b-mantra-1") ? "Completed Today" : null,
        karmaXpBonus: 100,
        tier: "Bronze",
        actionText: "Perform Daily Mantra",
        actionType: "do_mantra"
      },
      {
        id: "b-blog-5",
        title: "Avid Vedic Scholar",
        titleHindi: "विद्या जिज्ञासु",
        description: "Read 5 Vedic blog posts & spiritual articles in the knowledge hub.",
        iconName: "BookOpen",
        category: "Learning",
        requiredCount: 5,
        currentCount: blogsReadCount,
        isUnlocked: unlockedBadgeIds.includes("b-blog-5") || blogsReadCount >= 5,
        unlockedAt: unlockedBadgeIds.includes("b-blog-5") ? "Completed" : null,
        karmaXpBonus: 250,
        tier: "Silver",
        actionText: "Read Spiritual Articles",
        actionType: "read_blog"
      },
      {
        id: "b-japa-108",
        title: "108 Japa Siddha",
        titleHindi: "108 माला सिद्ध",
        description: "Complete 108 mantra bead counts on the digital mala rosary.",
        iconName: "Sparkles",
        category: "Mantras & Sadhana",
        requiredCount: 108,
        currentCount: totalJapaBeads,
        isUnlocked: unlockedBadgeIds.includes("b-japa-108") || totalJapaBeads >= 108,
        unlockedAt: unlockedBadgeIds.includes("b-japa-108") ? "Completed" : null,
        karmaXpBonus: 300,
        tier: "Gold",
        actionText: "Complete 108 Mala",
        actionType: "do_japa_108"
      },
      {
        id: "b-chart-1",
        title: "Kundli Explorer",
        titleHindi: "कुण्डली अन्वेषक",
        description: "Perform a complete Birth Chart or 12-House AI Deep Dive.",
        iconName: "Compass",
        category: "Astrology & Charts",
        requiredCount: 1,
        currentCount: birthChartsAnalyzed,
        isUnlocked: unlockedBadgeIds.includes("b-chart-1") || birthChartsAnalyzed >= 1,
        unlockedAt: unlockedBadgeIds.includes("b-chart-1") ? "Completed" : null,
        karmaXpBonus: 150,
        tier: "Bronze",
        actionText: "Explore Birth Chart",
        actionType: "check_chart"
      },
      {
        id: "b-panchang-1",
        title: "Tithi & Muhurat Observer",
        titleHindi: "तिथि द्रष्टा",
        description: "Check the daily Panchang, Tithi & auspicious Choghadiya.",
        iconName: "Clock",
        category: "Learning",
        requiredCount: 1,
        currentCount: panchangChecksCount,
        isUnlocked: unlockedBadgeIds.includes("b-panchang-1") || panchangChecksCount >= 1,
        unlockedAt: unlockedBadgeIds.includes("b-panchang-1") ? "Completed" : null,
        karmaXpBonus: 100,
        tier: "Bronze",
        actionText: "Check Daily Panchang",
        actionType: "check_panchang"
      },

      {
        id: "b-streak-7",
        title: "7-Day Karmic Yogi",
        titleHindi: "नित्य कर्मयोगी",
        description: "Maintain a 7-day continuous daily spiritual practice streak.",
        iconName: "Flame",
        category: "Habit Streaks",
        requiredCount: 7,
        currentCount: habitStreakDays,
        isUnlocked: unlockedBadgeIds.includes("b-streak-7") || habitStreakDays >= 7,
        unlockedAt: unlockedBadgeIds.includes("b-streak-7") ? "Completed" : null,
        karmaXpBonus: 500,
        tier: "Diamond",
        actionText: "Daily Check-in",
        actionType: "do_streak"
      },
      {
        id: "b-karma-500",
        title: "Spiritual Master",
        titleHindi: "आध्यात्मिक गुरु",
        description: "Accumulate 500+ total Karma XP points across all practices.",
        iconName: "Trophy",
        category: "Habit Streaks",
        requiredCount: 500,
        currentCount: karmaXp,
        isUnlocked: unlockedBadgeIds.includes("b-karma-500") || karmaXp >= 500,
        unlockedAt: unlockedBadgeIds.includes("b-karma-500") ? "Completed" : null,
        karmaXpBonus: 500,
        tier: "Diamond",
        actionText: "Earn Karma Points",
        actionType: "do_mantra"
      }
    ];
  }, [
    dailyMantrasCount, 
    blogsReadCount, 
    totalJapaBeads, 
    birthChartsAnalyzed, 
    panchangChecksCount, 
    habitStreakDays, 
    karmaXp, 
    unlockedBadgeIds
  ]);

  // Auto-check and trigger badge unlocks
  useEffect(() => {
    badgesList.forEach((b) => {
      if (b.currentCount >= b.requiredCount && !unlockedBadgeIds.includes(b.id)) {
        // Unlock badge!
        setUnlockedBadgeIds((prev) => [...prev, b.id]);
        setKarmaXp((prev) => prev + b.karmaXpBonus);
        playSingingBowlChime();
        setCelebrationBadge(b);
        showToast(`🎉 Spiritual Milestone Unlocked: "${b.title}" (+${b.karmaXpBonus} Karma XP)!`);
      }
    });
  }, [badgesList, unlockedBadgeIds]);

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 4000);
  };

  // Action Handlers
  const handleReadBlogArticle = (article: SpiritualArticle, e?: React.MouseEvent) => {
    playCardFlipSound();
    setActiveArticle(article);

    if (!readBlogIds.includes(article.id)) {
      const updatedRead = [...readBlogIds, article.id];
      setReadBlogIds(updatedRead);
      const newCount = updatedRead.length;
      setBlogsReadCount(newCount);
      setKarmaXp((prev) => prev + 30);
      triggerFloatingXp(30, e);
      showToast(`📖 Article Read! Earned +30 Karma XP (${newCount}/5 for Scholar Badge).`);
    }
  };

  const handlePerformDailyMantra = (e?: React.MouseEvent) => {
    playSingingBowlChime();
    setDailyMantrasCount((prev) => prev + 1);
    setKarmaXp((prev) => prev + 50);
    triggerFloatingXp(50, e);
    showToast(`🕉️ Daily Mantra Completed! (+50 Karma XP)`);
  };

  const handleComplete108Mala = (e?: React.MouseEvent) => {
    playSingingBowlChime();
    setTotalJapaBeads((prev) => prev + 108);
    setKarmaXp((prev) => prev + 108);
    triggerFloatingXp(108, e);
    showToast(`📿 108 Japa Mala Beads Completed! (+108 Karma XP)`);
  };

  const handleCheckDailyPanchang = (e?: React.MouseEvent) => {
    playCardFlipSound();
    setPanchangChecksCount((prev) => prev + 1);
    setKarmaXp((prev) => prev + 25);
    triggerFloatingXp(25, e);
    showToast(`🌅 Panchang Inspected! (+25 Karma XP)`);
    if (onNavigateTab) onNavigateTab("astrology");
  };

  const handleExploreBirthChart = (e?: React.MouseEvent) => {
    playCardFlipSound();
    setBirthChartsAnalyzed((prev) => prev + 1);
    setKarmaXp((prev) => prev + 40);
    triggerFloatingXp(40, e);
    showToast(`✨ Birth Chart Analyzed! (+40 Karma XP)`);
    if (onNavigateTab) onNavigateTab("astrology");
  };

  const handleCheckInStreak = (e?: React.MouseEvent) => {
    playCardFlipSound();
    setHabitStreakDays((prev) => prev + 1);
    setKarmaXp((prev) => prev + 50);
    triggerFloatingXp(50, e);
    showToast(`🔥 Daily Streak Check-in Recorded! (${habitStreakDays + 1} Days)`);
  };

  const filteredBadges = useMemo(() => {
    if (selectedCategory === "All") return badgesList;
    if (selectedCategory === "Unlocked") return badgesList.filter((b) => b.isUnlocked);
    return badgesList.filter((b) => b.category === selectedCategory);
  }, [badgesList, selectedCategory]);

  const unlockedCount = useMemo(() => {
    return badgesList.filter((b) => b.isUnlocked).length;
  }, [badgesList]);

  return (
    <div className="space-y-8 animate-fade-in relative">
      {/* Floating XP Particles */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        <AnimatePresence>
          {floatingXps.map((fxp) => (
            <motion.div
              key={fxp.id}
              initial={{ opacity: 1, scale: 0.6, y: fxp.y - 10, x: fxp.x - 40 }}
              animate={{ opacity: 0, scale: 1.25, y: fxp.y - 90 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, type: "tween", ease: "easeOut" }}
              className="fixed font-serif font-extrabold text-amber-300 text-sm sm:text-base drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] flex items-center gap-1.5 bg-slate-900/95 px-3.5 py-2 rounded-full border border-amber-400/80 shadow-2xl"
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              <span>+{fxp.amount} Karma XP</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Toast Notification Banner */}
      <AnimatePresence>
        {notificationToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-4 z-50 bg-slate-900 text-amber-300 border-2 border-amber-400/80 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-bold max-w-md"
          >
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse shrink-0" />
            <span>{notificationToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header & User Level Progress Card */}
      <div className="bg-gradient-to-r from-slate-950 via-amber-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl border border-amber-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              Spiritual Milestones & Karma Gamification
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100">
              Karmic Achievement Badges
            </h1>
            <p className="text-xs sm:text-sm text-amber-200/80 max-w-2xl leading-relaxed">
              Earn sacred milestone badges and Karma XP by performing daily mantras, reading Vedic articles, analyzing birth charts, and maintaining daily practice streaks.
            </p>
          </div>

          {/* Level Badge Card */}
          <div className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-amber-500/40 text-left min-w-[240px] space-y-2 shadow-inner shrink-0">
            <div className="flex justify-between items-center text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">Current Level</span>
              <span className="font-mono font-bold text-amber-300">{karmaXp} Karma XP</span>
            </div>

            <div className="font-serif font-bold text-lg text-amber-100 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              {userLevelInfo.title}
            </div>

            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-amber-500/20">
              <motion.div 
                className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (karmaXp / userLevelInfo.nextXp) * 100)}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>

            <div className="flex justify-between text-[11px] text-amber-200/70 font-medium">
              <span>Level {userLevelInfo.level}</span>
              <span>Badges: {unlockedCount} / {badgesList.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Triggers Row */}
      <div className="bg-white p-5 rounded-3xl border border-amber-900/10 shadow-xs space-y-3">
        <div className="flex justify-between items-center border-b border-amber-900/10 pb-2.5">
          <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
            <Zap className="w-4.5 h-4.5 text-amber-600" />
            Quick Spiritual Actions & Progress Boosters
          </h3>
          <span className="text-[11px] font-bold text-slate-500">Perform acts to unlock badges instantly</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 text-xs">
          <button
            onClick={(e) => handlePerformDailyMantra(e)}
            className="p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold border border-amber-200 flex flex-col items-center justify-center text-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span>1 Daily Mantra</span>
            <span className="text-[10px] text-amber-700/80 font-normal">+50 XP</span>
          </button>

          <button
            onClick={(e) => handleComplete108Mala(e)}
            className="p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold border border-amber-200 flex flex-col items-center justify-center text-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>108 Mala Beads</span>
            <span className="text-[10px] text-amber-700/80 font-normal">+108 XP</span>
          </button>

          <button
            onClick={(e) => {
              if (ARTICLES_DATABASE[0]) handleReadBlogArticle(ARTICLES_DATABASE[0], e);
            }}
            className="p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold border border-amber-200 flex flex-col items-center justify-center text-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <BookOpen className="w-4 h-4 text-amber-700" />
            <span>Read 1 Article</span>
            <span className="text-[10px] text-amber-700/80 font-normal">({blogsReadCount}/5 Read)</span>
          </button>

          <button
            onClick={(e) => handleCheckDailyPanchang(e)}
            className="p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold border border-amber-200 flex flex-col items-center justify-center text-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Clock className="w-4 h-4 text-amber-700" />
            <span>Check Panchang</span>
            <span className="text-[10px] text-amber-700/80 font-normal">+25 XP</span>
          </button>

          <button
            onClick={(e) => handleExploreBirthChart(e)}
            className="p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold border border-amber-200 flex flex-col items-center justify-center text-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Compass className="w-4 h-4 text-amber-700" />
            <span>Birth Chart AI</span>
            <span className="text-[10px] text-amber-700/80 font-normal">+40 XP</span>
          </button>

          <button
            onClick={(e) => handleCheckInStreak(e)}
            className="p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold border border-amber-200 flex flex-col items-center justify-center text-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Flame className="w-4 h-4 text-amber-700" />
            <span>Streak Check-in</span>
            <span className="text-[10px] text-amber-700/80 font-normal">Day {habitStreakDays}</span>
          </button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold no-scrollbar">
        {["All", "Unlocked", "Learning", "Mantras & Sadhana", "Astrology & Charts", "Habit Streaks"].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              playCardHoverSound();
              setSelectedCategory(cat);
            }}
            className={`px-4 py-2 rounded-2xl whitespace-nowrap transition-all border cursor-pointer ${
              selectedCategory === cat
                ? "bg-slate-900 text-amber-300 border-amber-500 font-bold shadow-sm"
                : "bg-white text-slate-700 border-amber-900/10 hover:bg-amber-50"
            }`}
          >
            {cat} {cat === "Unlocked" && `(${unlockedCount})`}
          </button>
        ))}
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredBadges.map((badge, index) => {
            const pct = Math.min(100, Math.round((badge.currentCount / badge.requiredCount) * 100));

            return (
              <motion.div
                key={badge.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85, y: -20 }}
                transition={{ duration: 0.35, delay: index * 0.05, type: "spring", stiffness: 220, damping: 20 }}
                whileHover={{ scale: 1.03, translateY: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  if (badge.isUnlocked) {
                    playCardFlipSound();
                    setCertificateBadge(badge);
                  }
                }}
                className={`p-5 rounded-3xl border transition-all relative overflow-hidden flex flex-col justify-between space-y-4 ${
                  badge.isUnlocked
                    ? "bg-gradient-to-b from-white via-amber-50/40 to-amber-100/30 border-amber-500/60 shadow-md cursor-pointer ring-1 ring-amber-400/30 hover:shadow-xl"
                    : "bg-slate-50/80 border-slate-200 opacity-80"
                }`}
              >
                {/* Badge Tier Chip */}
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    badge.tier === "Diamond" ? "bg-purple-100 text-purple-900 border border-purple-300" :
                    badge.tier === "Gold" ? "bg-amber-100 text-amber-900 border border-amber-300" :
                    badge.tier === "Silver" ? "bg-slate-200 text-slate-800 border border-slate-300" :
                    "bg-orange-100 text-orange-900 border border-orange-300"
                  }`}>
                    {badge.tier} Badge
                  </span>

                  {badge.isUnlocked ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full shadow-xs">
                      <CheckCircle2 className="w-3 h-3 text-emerald-700" /> Unlocked
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                      <Lock className="w-3 h-3 text-slate-500" /> Locked
                    </span>
                  )}
                </div>

                {/* Badge Icon & Title */}
                <div className="text-center space-y-2 py-2">
                  <motion.div 
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                    className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center shadow-md ${
                      badge.isUnlocked
                        ? "bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-slate-950 ring-4 ring-amber-400/30"
                        : "bg-slate-300 text-slate-500"
                    }`}
                  >
                    {badge.id === "b-blog-5" && <BookOpen className="w-7 h-7" />}
                    {badge.id === "b-mantra-1" && <Volume2 className="w-7 h-7" />}
                    {badge.id === "b-japa-108" && <Sparkles className="w-7 h-7" />}
                    {badge.id === "b-chart-1" && <Compass className="w-7 h-7" />}
                    {badge.id === "b-panchang-1" && <Clock className="w-7 h-7" />}
                    {badge.id === "b-streak-7" && <Flame className="w-7 h-7" />}
                    {badge.id === "b-karma-500" && <Trophy className="w-7 h-7" />}
                  </motion.div>

                  <div>
                    <h4 className="font-serif font-bold text-base text-slate-900">{badge.title}</h4>
                    <div className="text-[11px] text-amber-800 font-semibold">{badge.titleHindi}</div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed min-h-[36px]">
                    {badge.description}
                  </p>
                </div>

                {/* Progress Bar & Actions */}
                <div className="space-y-2.5 pt-2 border-t border-amber-900/10">
                  <div className="flex justify-between items-center text-[11px] font-semibold text-slate-600">
                    <span>Progress</span>
                    <span>{badge.currentCount} / {badge.requiredCount} ({pct}%)</span>
                  </div>

                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${
                        badge.isUnlocked ? "bg-gradient-to-r from-emerald-500 to-teal-400" : "bg-amber-500"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  {!badge.isUnlocked && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (badge.actionType === "read_blog" && ARTICLES_DATABASE[0]) {
                          handleReadBlogArticle(ARTICLES_DATABASE[0], e);
                        } else if (badge.actionType === "do_mantra") {
                          handlePerformDailyMantra(e);
                        } else if (badge.actionType === "do_japa_108") {
                          handleComplete108Mala(e);
                        } else if (badge.actionType === "check_panchang") {
                          handleCheckDailyPanchang(e);
                        } else if (badge.actionType === "check_chart") {
                          handleExploreBirthChart(e);
                        } else if (badge.actionType === "do_streak") {
                          handleCheckInStreak(e);
                        }
                      }}
                      className="w-full py-2 rounded-xl bg-slate-900 text-amber-300 font-bold text-xs hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <span>{badge.actionText}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Vedic Knowledge Hub / Articles Section for Reading Task */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/15 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-amber-900/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-amber-700" />
              Spiritual Knowledge Hub
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">
              Read 5 Articles to Earn "Avid Vedic Scholar" Badge
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Read authentic spiritual guides below. Each article completed adds +30 Karma XP and updates your Scholar badge progress.
            </p>
          </div>

          <div className="px-4 py-2 bg-amber-50 rounded-2xl border border-amber-200 text-xs font-bold text-amber-900 shrink-0">
            Progress: <span className="text-amber-700 text-sm font-serif">{blogsReadCount} / 5</span> Articles Read
          </div>
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ARTICLES_DATABASE.map((art) => {
            const isRead = readBlogIds.includes(art.id);

            return (
              <div
                key={art.id}
                onClick={() => handleReadBlogArticle(art)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 group ${
                  isRead 
                    ? "bg-amber-50/40 border-amber-300/60 shadow-xs" 
                    : "bg-white border-amber-900/10 hover:border-amber-500/50 hover:shadow-md"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">{art.category}</span>
                    <span className="text-slate-500">{art.readTime}</span>
                  </div>

                  <h4 className="font-serif font-bold text-base text-slate-900 group-hover:text-amber-900 transition-colors">
                    {art.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-amber-900/10 flex justify-between items-center text-xs font-bold">
                  {isRead ? (
                    <span className="text-emerald-700 flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Read (+30 XP)
                    </span>
                  ) : (
                    <span className="text-amber-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Article →
                    </span>
                  )}

                  <span className="text-[10px] text-slate-400 font-normal">{art.author}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-3xl border border-amber-500/30 shadow-2xl p-6 sm:p-8 space-y-6 relative"
            >
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                  {activeArticle.category} • {activeArticle.readTime}
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                  {activeArticle.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  {activeArticle.subtitle}
                </p>
              </div>

              {activeArticle.mantraQuote && (
                <div className="bg-amber-950 text-amber-200 p-4 rounded-2xl border border-amber-500/40 font-serif text-sm font-bold text-center">
                  {activeArticle.mantraQuote}
                </div>
              )}

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {activeArticle.content.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className="pt-4 border-t border-amber-900/10 flex flex-col sm:flex-row justify-between items-center gap-3">
                <span className="text-xs text-slate-500 font-medium">
                  Author: {activeArticle.author}
                </span>

                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-6 py-2.5 rounded-2xl bg-slate-900 text-amber-300 font-bold text-xs hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Finished Reading (+30 XP Recorded)</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Unlocked Badge Certificate / Achievement Modal */}
      <AnimatePresence>
        {certificateBadge && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gradient-to-b from-amber-950 via-slate-900 to-amber-950 text-amber-100 max-w-lg w-full rounded-3xl border-2 border-amber-400/80 shadow-2xl p-6 sm:p-8 space-y-6 relative text-center"
            >
              <button
                onClick={() => setCertificateBadge(null)}
                className="absolute top-4 right-4 text-amber-200/60 hover:text-white cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-3">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center shadow-xl ring-8 ring-amber-400/20">
                  <Award className="w-10 h-10" />
                </div>

                <div className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                  Official Spiritual Achievement Certificate
                </div>

                <h3 className="font-serif text-2xl font-bold text-amber-100">
                  {certificateBadge.title}
                </h3>
                <div className="text-sm font-bold text-amber-300">
                  {certificateBadge.titleHindi}
                </div>
              </div>

              <div className="bg-amber-900/40 p-4 rounded-2xl border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed font-sans">
                Awarded to <strong className="text-amber-100">{userProfile?.name || "Seeker"}</strong> for demonstrating sacred dedication in Vedic spiritual practices.
                <div className="mt-2 text-[11px] font-mono text-amber-400">
                  Tier: {certificateBadge.tier} • Karma XP Bonus: +{certificateBadge.karmaXpBonus}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    const text = `🏆 I just unlocked the "${certificateBadge.title}" (${certificateBadge.titleHindi}) Spiritual Milestone Badge on Dev-Guru! Earned +${certificateBadge.karmaXpBonus} Karma XP! ✨`;
                    navigator.clipboard.writeText(text);
                    setCopiedCert(true);
                    setTimeout(() => setCopiedCert(false), 2500);
                  }}
                  className="flex-1 py-3 rounded-2xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {copiedCert ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4 text-slate-950" />}
                  <span>{copiedCert ? "Copied Certificate!" : "Share Achievement"}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Celebration Modal when new milestone / badge unlocked */}
      <AnimatePresence>
        {celebrationBadge && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -30 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="bg-gradient-to-b from-amber-950 via-slate-900 to-amber-950 text-amber-100 max-w-md w-full rounded-3xl border-2 border-amber-400 shadow-[0_0_60px_rgba(251,191,36,0.35)] p-6 sm:p-8 space-y-6 relative text-center overflow-hidden"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-amber-500/20 to-amber-300/10 rounded-full blur-2xl pointer-events-none"
              />

              <div className="relative z-10 space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 350, damping: 14 }}
                  className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 text-slate-950 flex items-center justify-center shadow-2xl ring-8 ring-amber-400/30"
                >
                  <Trophy className="w-12 h-12 text-slate-950" />
                </motion.div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/40">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  Milestone Unlocked!
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
                  {celebrationBadge.title}
                </h3>
                <div className="text-sm font-bold text-amber-300">
                  {celebrationBadge.titleHindi}
                </div>

                <p className="text-xs text-amber-200/90 leading-relaxed font-sans max-w-xs mx-auto">
                  {celebrationBadge.description}
                </p>

                <div className="bg-amber-900/50 p-3.5 rounded-2xl border border-amber-500/40 text-xs text-amber-200 flex justify-around items-center font-semibold">
                  <span>Tier: <strong className="text-amber-100">{celebrationBadge.tier}</strong></span>
                  <span className="text-amber-400 font-bold">+{celebrationBadge.karmaXpBonus} Karma XP</span>
                </div>

                <button
                  onClick={() => {
                    playCardFlipSound();
                    setCelebrationBadge(null);
                  }}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs sm:text-sm hover:from-amber-300 hover:to-amber-400 transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>Claim & Continue Journey</span>
                  <ChevronRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
