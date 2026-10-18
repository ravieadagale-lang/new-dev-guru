import React from "react";
import {
  Sparkles,
  Sun,
  Moon,
  Compass,
  Award,
  Layers,
  Clock,
  Heart,
  ShoppingBag,
  ArrowRight,
  Shield,
  Star,
  Users,
  MessageSquare,
  BookOpen,
  Calendar,
  Flame,
  CheckCircle2
} from "lucide-react";
import { UserProfile, Product } from "../types";
import { DailyHoroscopeSummary } from "../components/DailyHoroscopeSummary";
import { DailyAffirmations } from "../components/DailyAffirmations";
import { playCardClickSound, playCardHoverSound } from "../utils/audioEffects";
import sageHeroImg from "../assets/images/vedic_sage_horoscope_1789639030606.jpg";

export interface PublicHomeProps {
  onSelectTab: (tab: string, subSectionId?: string) => void;
  userProfile: UserProfile;
  onUpdateProfile?: (profile: UserProfile) => void;
  onAddToCart: (product: Product) => void;
  wishlistItems: string[];
  onToggleWishlist: (productId: string) => void;
}

export const PublicHome: React.FC<PublicHomeProps> = ({
  onSelectTab,
  userProfile,
  onUpdateProfile,
  onAddToCart,
  wishlistItems,
  onToggleWishlist
}) => {
  const coreFeatures = [
    {
      id: "astrology",
      subId: "yogas",
      title: "1,001+ Classical Vedic Yogas",
      tagline: "Deterministic Parashari Engine",
      description: "Mathematical evaluation of 1,001+ authentic combinations including Pancha Mahapurusha, Raja Yogas, Surya/Chandra yogas, and Parivartana exchanges.",
      badge: "1,001+ Rules",
      icon: <Award className="w-5 h-5 text-amber-500" />,
      highlight: true
    },
    {
      id: "astrology",
      subId: "birth_chart",
      title: "Kundli & Shodashavarga (D1–D60)",
      tagline: "High-Precision Astronomical Ephemeris",
      description: "Chitrapaksha Lahiri Ayanamsha with exact planetary longitudes, retrograde flags, combustions, Shadbala potencies, and SAV 337 Ashtakavarga.",
      badge: "16 Vargas",
      icon: <Layers className="w-5 h-5 text-indigo-500" />
    },
    {
      id: "panchang",
      title: "Panchang & Auspicious Muhurta",
      tagline: "Five Pillars of Vedic Time",
      description: "Real-time Tithi, Vara, Nakshatra, Yoga, and Karana with Choghadiya, Rahu Kalam, and Shastric auspicious windows.",
      badge: "Real-Time",
      icon: <Calendar className="w-5 h-5 text-rose-500" />
    },
    {
      id: "compatibility",
      title: "Kundli Milan & Compatibility",
      tagline: "Ashta Koota 36-Point Guna Milan",
      description: "Comprehensive 8-Koota and 10-Koota synastry, Papasamya malefic weight balance, Jaimini Upapada Lagna, and Western planetary cross-aspects.",
      badge: "Milan",
      icon: <Heart className="w-5 h-5 text-rose-500" />
    },
    {
      id: "consultation",
      title: "Live Consecrated Consultations",
      tagline: "Verified Vedic Practitioners",
      description: "Real-time 1-on-1 consultations with verified astrologers, detailed Prashna analysis, and personalized remedial guidance.",
      badge: "Live",
      icon: <MessageSquare className="w-5 h-5 text-emerald-500" />
    },
    {
      id: "numerology",
      title: "Advanced Numerology Suite",
      tagline: "Chaldean, Pythagorean & Lo Shu",
      description: "Complete name vibrations, master karmic debt numbers, mobile numerology, and Lo Shu grid arrows.",
      badge: "Multisystem",
      icon: <Compass className="w-5 h-5 text-purple-500" />
    },
    {
      id: "tarot",
      title: "Sacred Tarot Sanctuary",
      tagline: "78 Classical Arcanas",
      description: "Celtic Cross, 3-card temporal spreads, and daily cards rendered with consecrated interpretations and rich symbolism.",
      badge: "78 Cards",
      icon: <Sparkles className="w-5 h-5 text-amber-400" />
    },
    {
      id: "chinese_astrology",
      title: "Chinese Astrology & BaZi Pillars",
      tagline: "Four Pillars of Destiny & Animals",
      description: "Lunar Animal zodiac, Five Elements (Wu Xing), Yin/Yang balances, and Eastern cosmological destiny forecasts.",
      badge: "BaZi",
      icon: <Flame className="w-5 h-5 text-red-500" />
    },
    {
      id: "baby_names",
      title: "Baby Name Suggestion & Janmakshar",
      tagline: "Nakshatra Syllables & Numerology",
      description: "Sacred Nakshatra Pada naming sounds, numerological destiny alignment, Sanskrit meanings, and deity blessings.",
      badge: "Syllables",
      icon: <Star className="w-5 h-5 text-pink-500" />
    },
    {
      id: "vastu_fengshui",
      title: "Vastu Shastra & Feng Shui OS",
      tagline: "Sacred Spatial Energy Architecture",
      description: "Room-by-room directional grid analysis, 16 directional zones, elemental imbalances, and non-demolition remedies.",
      badge: "Spatial",
      icon: <Compass className="w-5 h-5 text-teal-500" />
    },
    {
      id: "face_reading",
      title: "Samudrika Face Reader",
      tagline: "Facial Morphology & Features",
      description: "Classical physiognomy, 12 facial houses, eye, nose, forehead, and chin indications for personality and destiny.",
      badge: "Samudrika",
      icon: <Users className="w-5 h-5 text-amber-600" />
    },
    {
      id: "dreams",
      title: "Dream Interpretation Dictionary",
      tagline: "Swapna Shastra Sacred Symbolism",
      description: "Ancient Vedic dream interpretations categorized by deity, animal, nature, and auspicious timing indications.",
      badge: "Swapna",
      icon: <Moon className="w-5 h-5 text-indigo-400" />
    },
    {
      id: "mantras",
      title: "Mantra Chants & Audio Visualizer",
      tagline: "432 Hz Sacred Sound Vibrations",
      description: "Bija mantras, Vedic suktams, singing bowl chimes, and interactive meditative frequency visualizers.",
      badge: "Audio",
      icon: <Sun className="w-5 h-5 text-orange-500" />
    },
    {
      id: "festivals_vrat",
      title: "Vrat & Festivals Sacred Calendar",
      tagline: "Sankalpa, Fasting & Observances",
      description: "Ekadashi, Pradosh, Shivratri, 28 Nakshatra Vratas, goal-based fasting guides, and festival muhurtas.",
      badge: "Calendar",
      icon: <Calendar className="w-5 h-5 text-orange-600" />
    },
    {
      id: "images",
      title: "Sacred Gallery & Divine Yantras",
      tagline: "Consecrated Deities & Mandalas",
      description: "High-resolution sacred artwork, consecrated Sri Yantras, Navagraha mandalas, and spiritual wallpapers.",
      badge: "Art",
      icon: <Sparkles className="w-5 h-5 text-amber-500" />
    },
    {
      id: "milestones",
      title: "Spiritual Milestones & Badges",
      tagline: "Sadhana Tracking & Karmic Points",
      description: "Earn spiritual merit badges, track daily sadhana streaks, unlock sacred titles, and redeem rewards.",
      badge: "Rewards",
      icon: <Award className="w-5 h-5 text-yellow-500" />
    },
    {
      id: "blog",
      title: "Astrological Wisdom & Articles",
      tagline: "Authentic Vedic Knowledge Blog",
      description: "In-depth research articles on planetary transits, remedies, classical texts, and practical Jyotish guidance.",
      badge: "Articles",
      icon: <BookOpen className="w-5 h-5 text-blue-500" />
    },
    {
      id: "marketplace",
      title: "Sacred Spiritual Marketplace",
      tagline: "Consecrated Gemstones & Puja Items",
      description: "Certified natural gemstones, original Rudraksha beads, copper yantras, energized malas, and puja kits.",
      badge: "Shop",
      icon: <ShoppingBag className="w-5 h-5 text-amber-600" />
    }
  ];

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-16">
      {/* Hero Banner (Matching Screenshot 3) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#140F0A] via-[#1A130C] to-[#0D0906] border border-amber-900/40 p-8 sm:p-12 text-white shadow-2xl space-y-8">
        <div className="max-w-4xl space-y-4">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#E8B653] leading-tight">
            Precision Astrological Insight.
          </h1>

          <p className="text-sm sm:text-base text-[#D4C3AC] leading-relaxed max-w-3xl">
            Immerse in the timeless science of Vedic Rishi astrology. Calculate authentic birth charts (Kundli), D1 through D60 divisional vargas, planetary dashas, and daily celestial movements decoded by authentic scriptural principles.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={() => {
                playCardClickSound();
                onSelectTab("astrology", "birth_chart");
              }}
              className="px-6 py-3 rounded-2xl bg-[#E87309] hover:bg-[#D56605] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-950/40 flex items-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Calculate Free Kundli</span>
            </button>
            <button
              onClick={() => {
                playCardClickSound();
                onSelectTab("consultation");
              }}
              className="px-6 py-3 rounded-2xl bg-[#2D1B0D]/70 hover:bg-[#3D2512] text-[#F3C474] border border-[#7D4D20] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Consultation</span>
            </button>
            <button
              onClick={() => {
                playCardClickSound();
                onSelectTab("astrology", "yogas");
              }}
              className="px-6 py-3 rounded-2xl bg-[#2D1B0D]/70 hover:bg-[#3D2512] text-[#F3C474] border border-[#7D4D20] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Guided Journey</span>
            </button>
          </div>
        </div>

        {/* 3 Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-amber-900/20">
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#F3C474]">
              D1 - D60
            </div>
            <div className="text-xs text-[#A89885] mt-0.5">
              Divisional Vargas
            </div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#F3C474]">
              27
            </div>
            <div className="text-xs text-[#A89885] mt-0.5">
              Nakshatra Matrix
            </div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#F3C474]">
              120 Yrs
            </div>
            <div className="text-xs text-[#A89885] mt-0.5">
              Vimshottari Dasha
            </div>
          </div>
        </div>

        {/* Visual Showcase Card with Image */}
        <div className="relative rounded-2xl overflow-hidden border border-amber-900/40 shadow-2xl max-h-[520px]">
          <img
            src={sageHeroImg}
            alt="Vedic Sage Jyotish Sadhana"
            className="w-full h-full object-cover object-center max-h-[500px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between flex-wrap gap-2">
            <span className="font-serif font-bold text-sm sm:text-base text-amber-100 drop-shadow-md">
              Vedic Sage Jyotish Sadhana
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-200 border border-amber-500/30 backdrop-blur-md">
              Laghu Parashari • Brihat Samhita
            </span>
          </div>
        </div>

        {/* Bottom Ribbon */}
        <div
          onClick={() => {
            playCardClickSound();
            onSelectTab("astrology", "birth_chart");
          }}
          className="rounded-2xl border border-amber-900/30 bg-[#24170E]/80 hover:bg-[#2F1F13] px-6 py-4 flex items-center justify-between cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2.5 text-[#F3C474] font-serif font-bold text-sm sm:text-base">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Instant Birth Chart (Kundli)</span>
          </div>
          <span className="text-xs text-[#A89885] font-mono tracking-wide">
            100% Free &amp; Precise
          </span>
        </div>
      </section>

      {/* Core Systems Highlights Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Shastric Computing Platforms
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-0.5">
              Comprehensive Astrological Suites
            </h2>
          </div>
          <button
            onClick={() => onSelectTab("astrology")}
            className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 transition-colors"
          >
            All Systems <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreFeatures.map((feat, idx) => (
            <div
              key={idx}
              onClick={() => {
                playCardClickSound();
                onSelectTab(feat.id, feat.subId);
              }}
              onMouseEnter={() => playCardHoverSound()}
              className={`bg-white border rounded-3xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group ${
                feat.highlight ? "border-amber-400/80 bg-amber-50/20" : "border-[#E7E2D9] hover:border-amber-400"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-2xl bg-amber-100/60 w-fit group-hover:scale-105 transition-transform">
                    {feat.icon}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {feat.badge}
                  </span>
                </div>

                <div>
                  <div className="text-[10px] font-semibold text-amber-800 uppercase tracking-wider">
                    {feat.tagline}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 mt-0.5 group-hover:text-amber-900 transition-colors">
                    {feat.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-800 group-hover:text-amber-950">
                <span>Access Portal</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Affirmations & Positive Spiritual Contemplation */}
      <DailyAffirmations onExploreMore={() => onSelectTab("mantras")} />

      {/* Daily Horoscope Summary */}
      <section>
        <DailyHoroscopeSummary
          userProfile={userProfile}
          onSelectTab={onSelectTab}
          onUpdateProfile={onUpdateProfile}
        />
      </section>

      {/* Shastric Integrity Quality Guarantees */}
      <section className="bg-white border border-[#E7E2D9] rounded-3xl p-8 sm:p-10 shadow-xs">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Authoritative Astrological Architecture
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Why Vedic Scholars Choose Dev-Guru
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Deterministic mathematics, shastric fidelity, and transparent astronomical formulas replace black-box outputs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/50 space-y-2">
            <Shield className="w-5 h-5 text-amber-600" />
            <h4 className="font-bold text-sm text-slate-900">Zero AI Hallucination</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Planetary degrees, houses, and dashas computed exclusively through validated celestial algorithms.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200/50 space-y-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <h4 className="font-bold text-sm text-slate-900">1,001+ Classical Rules</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete catalog of authentic Parashari, Jaimini, and classical yogas verified against classical texts.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/50 space-y-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            <h4 className="font-bold text-sm text-slate-900">5-Tier Vimshottari</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Maha, Antar, Pratyantar, Sookshma, and Prana dasha timelines calculated with millisecond accuracy.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200/50 space-y-2">
            <CheckCircle2 className="w-5 h-5 text-rose-600" />
            <h4 className="font-bold text-sm text-slate-900">16 Shodashavargas</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete D1 Rashi through D60 Shashtiamsha divisional charts with varga dignity confirmations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
