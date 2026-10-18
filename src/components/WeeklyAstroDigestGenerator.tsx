import React, { useState, useMemo } from "react";
import { 
  Mail, 
  Calendar, 
  Sparkles, 
  Send, 
  Check, 
  Copy, 
  Briefcase, 
  Heart, 
  Moon, 
  Sun, 
  BookOpen, 
  ShoppingBag, 
  ShieldCheck, 
  Flame, 
  Clock, 
  ArrowRight, 
  Share2, 
  CheckCircle2, 
  Download, 
  Eye, 
  Bell,
  RefreshCw,
  Compass
} from "lucide-react";
import { UserProfile } from "../types";

interface WeeklyAstroDigestGeneratorProps {
  userProfile?: UserProfile;
  onNavigateMarketplace?: () => void;
}

export interface DayForecast {
  dayName: string;
  dateStr: string;
  recommendedCategory: "Business" | "Rest" | "Spiritual" | "Travel" | "Investment";
  planetaryAlignment: string;
  moonNakshatra: string;
  favorableHours: string;
  cautionHours: string;
  guidance: string;
  luckyColor: string;
  luckyNumber: number;
}

export interface RecommendedProduct {
  id: string;
  title: string;
  type: "eBook" | "Gemstone" | "Yantra" | "Mala";
  price: number;
  rating: number;
  imageIcon: string;
  reasonForWeek: string;
  description: string;
  badge?: string;
}

export const WeeklyAstroDigestGenerator: React.FC<WeeklyAstroDigestGeneratorProps> = ({
  userProfile,
  onNavigateMarketplace,
}) => {
  const [viewMode, setViewMode] = useState<"dashboard" | "email_preview">("dashboard");
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [subscriptionFrequency, setSubscriptionFrequency] = useState<"weekly_monday" | "daily" | "biweekly">("weekly_monday");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(true);

  const userName = userProfile?.name || "Vedic Seeker";
  const userMoonSign = userProfile?.rashi || "Taurus";
  const userLagna = userProfile?.lagna || "Scorpio";
  const userEmail = userProfile?.email || "ravii.adagale20@gmail.com";

  // Generate Upcoming 7-Day Forecast based on current date
  const upcomingWeekForecast: DayForecast[] = useMemo(() => {
    const today = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    const categories: DayForecast["recommendedCategory"][] = [
      "Business", 
      "Spiritual", 
      "Investment", 
      "Rest", 
      "Business", 
      "Travel", 
      "Spiritual"
    ];

    const alignments = [
      "Moon in Exaltation + Jupiter Aspect (11th House)",
      "Ketu Conjunction with Moon — Deep Intuition",
      "Mars Trine Mercury — Bold Financial Moves",
      "Rahu Transit Sensitivity — Mild Mental Restlessness",
      "Abhijit Muhurat + Sun Alignment",
      "Venus Exaltation Aspect in 7th House",
      "Saturn Shani Pradosham Window"
    ];

    const nakshatras = ["Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha"];

    return Array.from({ length: 7 }).map((_, idx) => {
      const d = new Date(today);
      d.setDate(d.getDate() + idx);
      const dayName = days[d.getDay()];
      const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      const cat = categories[idx % categories.length];

      let guidance = "";
      let favorableHours = "";
      let cautionHours = "";
      let luckyColor = "Golden Yellow";
      let luckyNumber = 7;

      if (cat === "Business") {
        guidance = "Prime window for high-value contract signings, launch meetings, and client pitches. Solar clarity boosts executive decision-making.";
        favorableHours = "10:15 AM - 01:30 PM";
        cautionHours = "03:45 PM - 05:00 PM (Rahu Kalam)";
        luckyColor = "Saffron Gold";
        luckyNumber = 1;
      } else if (cat === "Spiritual") {
        guidance = "Mystic planetary window ideal for 108 Japa Mantra recitations, fasts, and inner meditation. Heightened spiritual awareness.";
        favorableHours = "05:00 AM - 07:30 AM (Brahma Muhurat)";
        cautionHours = "12:30 PM - 02:00 PM";
        luckyColor = "Deep Blue";
        luckyNumber = 9;
      } else if (cat === "Investment") {
        guidance = "Favorable for real estate registration, stock portfolio balancing, and gold acquisitions under Pushya Nakshatra grace.";
        favorableHours = "09:00 AM - 12:15 PM";
        cautionHours = "01:30 PM - 03:00 PM";
        luckyColor = "Emerald Green";
        luckyNumber = 5;
      } else if (cat === "Rest") {
        guidance = "Cosmic pause day. Avoid major arguments, heavy legal commitments, or high expenditure. Focus on deep sleep and grounding.";
        favorableHours = "06:00 PM - 09:00 PM";
        cautionHours = "10:30 AM - 12:00 PM (Yamaganda)";
        luckyColor = "Pearl White";
        luckyNumber = 2;
      } else {
        guidance = "Dynamic momentum for short-distance travel, strategic networking, and romantic dinner dates.";
        favorableHours = "11:00 AM - 04:00 PM";
        cautionHours = "07:00 AM - 08:30 AM";
        luckyColor = "Rose Red";
        luckyNumber = 6;
      }

      return {
        dayName: idx === 0 ? "Today" : dayName,
        dateStr,
        recommendedCategory: cat,
        planetaryAlignment: alignments[idx % alignments.length],
        moonNakshatra: nakshatras[idx % nakshatras.length],
        favorableHours,
        cautionHours,
        guidance,
        luckyColor,
        luckyNumber
      };
    });
  }, []);

  // Curated Products & E-Books for the Week
  const curatedProducts: RecommendedProduct[] = [
    {
      id: "p-1",
      title: "Sade Sati & Shani Transit Master Guide (PDF E-Book)",
      type: "eBook",
      price: 499,
      rating: 4.9,
      imageIcon: "📚",
      badge: "Best Seller E-Book",
      reasonForWeek: "Essential reading to navigate Saturn's upcoming 8th house aspect and avoid karmic delays.",
      description: "A comprehensive 120-page digital manual on remedies, mantras, Peepal tree rituals, and Sade Sati phase protection."
    },
    {
      id: "p-2",
      title: "Energized 5-Mukhi Indonesian Rudraksha Mala (108+1)",
      type: "Mala",
      price: 1299,
      rating: 4.8,
      imageIcon: "📿",
      badge: "Vedic Sanctified",
      reasonForWeek: "Enhances concentration and balances Rahu/Moon turbulence during your upcoming Tuesday spiritual window.",
      description: "Hand-strung authentic Rudraksha beads blessed with Mahamrityunjaya mantras in Varanasi."
    },
    {
      id: "p-3",
      title: "Shree Sampoorna Mahalakshmi Yantra (24k Gold Plated)",
      type: "Yantra",
      price: 1899,
      rating: 5.0,
      imageIcon: "🔱",
      badge: "Wealth Magnet",
      reasonForWeek: "Complements your Wednesday Pushya Nakshatra investment window for business prosperity.",
      description: "Heavy brass plate with geometric sacred geometry designed to attract cashflow and business stability."
    },
    {
      id: "p-4",
      title: "Natural Yellow Sapphire (Pukhraj) Astrological Guide",
      type: "eBook",
      price: 299,
      rating: 4.7,
      imageIcon: "📖",
      badge: "Quick Read",
      reasonForWeek: "Learn how Jupiter's exaltation in your 11th house can be amplified with gemstone therapy.",
      description: "Expert guidelines on finger placement, metal selection, and prana-pratishtha rituals for Brihaspati."
    }
  ];

  const handleSendTestEmail = () => {
    setIsEmailSent(true);
    setTimeout(() => {
      setIsEmailSent(false);
    }, 4000);
  };

  const handleCopyDigest = () => {
    const textDigest = `
🔮 ASTRO NEXT — WEEKLY TRANSIT & LIFE DIGEST
Prepared for: ${userName} (${userMoonSign} Moon Sign, ${userLagna} Lagna)
Dispatch Date: ${new Date().toLocaleDateString()}

====================================================
WEEKLY COSMIC HIGHLIGHTS
====================================================
${upcomingWeekForecast.map((d) => `
* ${d.dayName} (${d.dateStr}) — [${d.recommendedCategory.toUpperCase()} DAY]
  • Alignment: ${d.planetaryAlignment}
  • Nakshatra: ${d.moonNakshatra}
  • Favorable Window: ${d.favorableHours}
  • Caution Window: ${d.cautionHours}
  • Guidance: ${d.guidance}
  • Lucky Color & Number: ${d.luckyColor} | #${d.luckyNumber}
`).join("\n")}

====================================================
CURATED REMEDIAL PRODUCTS & E-BOOKS
====================================================
${curatedProducts.map(p => `- ${p.title} (${p.type}) - ₹${p.price}\n  Why this week: ${p.reasonForWeek}`).join("\n\n")}

May the planets guide your path to prosperity and peace.
Dev-Guru Enterprise Engine • https://dev-guru.ai
`;

    navigator.clipboard.writeText(textDigest);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-sm space-y-8 animate-in fade-in">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <Mail className="w-3.5 h-3.5 text-amber-600" />
            Automated Weekly Transit Digest Engine
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Personalized 7-Day Life & Transit Digest
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Automated weekly forecast categorizing optimal days for high-stakes business, deep rest, and spiritual practice, complete with curated remedies and e-books.
          </p>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold flex gap-1">
            <button
              onClick={() => setViewMode("dashboard")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === "dashboard" ? "bg-slate-950 text-amber-300 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              📊 Interactive Dashboard
            </button>
            <button
              onClick={() => setViewMode("email_preview")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === "email_preview" ? "bg-slate-950 text-amber-300 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              ✉️ Email Newsletter Format
            </button>
          </div>

          <button
            onClick={handleCopyDigest}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            title="Copy Digest Text"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-amber-600" />}
            <span>{isCopied ? "Copied!" : "Copy Text"}</span>
          </button>

          <button
            onClick={handleSendTestEmail}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isEmailSent ? "Digest Sent to Email! 📩" : "Send Test Email"}</span>
          </button>
        </div>
      </div>

      {/* AUTOMATED SUBSCRIPTION BAR */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50/50 to-amber-50 p-4 rounded-2xl border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-900 shrink-0">
            <Bell className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <div className="font-serif font-bold text-slate-900 text-sm">
              Automated Email Digest Dispatch to: <span className="text-amber-800 font-mono">{userEmail}</span>
            </div>
            <p className="text-slate-600 text-[11px]">
              Delivered every Monday at 06:00 AM local time with personalized Kundali transit alerts.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <select
            value={subscriptionFrequency}
            onChange={(e) => setSubscriptionFrequency(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl border border-amber-300 text-xs font-bold text-slate-800 bg-white"
          >
            <option value="weekly_monday">Every Monday 6:00 AM</option>
            <option value="daily">Daily Morning Digest</option>
            <option value="biweekly">Bi-Weekly Major Transits</option>
          </select>

          <label className="flex items-center gap-2 font-bold text-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={isSubscribed}
              onChange={(e) => setIsSubscribed(e.target.checked)}
              className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
            />
            <span>Active</span>
          </label>
        </div>
      </div>

      {/* VIEW MODE 1: INTERACTIVE DASHBOARD VIEW */}
      {viewMode === "dashboard" && (
        <div className="space-y-8">
          {/* WEEKLY CATEGORY BREAKDOWN CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/60 p-5 rounded-2xl border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between text-emerald-900 font-bold text-xs">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-emerald-700" />
                  💼 Recommended Business Days
                </span>
                <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-full text-[10px]">
                  {upcomingWeekForecast.filter(f => f.recommendedCategory === "Business").length} Days
                </span>
              </div>
              <div className="font-serif font-bold text-slate-900 text-base">
                High-Value Signing & Deals
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                {upcomingWeekForecast.filter(f => f.recommendedCategory === "Business").map(f => `${f.dayName} (${f.dateStr})`).join(", ")}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-100/60 p-5 rounded-2xl border border-purple-200 space-y-2">
              <div className="flex items-center justify-between text-purple-900 font-bold text-xs">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-purple-700" />
                  📿 Spiritual Practice & Tapasya
                </span>
                <span className="bg-purple-600 text-white px-2 py-0.5 rounded-full text-[10px]">
                  {upcomingWeekForecast.filter(f => f.recommendedCategory === "Spiritual").length} Days
                </span>
              </div>
              <div className="font-serif font-bold text-slate-900 text-base">
                108 Japa & Fasting Windows
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                {upcomingWeekForecast.filter(f => f.recommendedCategory === "Spiritual").map(f => `${f.dayName} (${f.dateStr})`).join(", ")}
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-100/60 p-5 rounded-2xl border border-amber-200 space-y-2">
              <div className="flex items-center justify-between text-amber-900 font-bold text-xs">
                <span className="flex items-center gap-1.5">
                  <Moon className="w-4 h-4 text-amber-700" />
                  🧘 Rest & Rejuvenation
                </span>
                <span className="bg-amber-600 text-white px-2 py-0.5 rounded-full text-[10px]">
                  {upcomingWeekForecast.filter(f => f.recommendedCategory === "Rest").length} Days
                </span>
              </div>
              <div className="font-serif font-bold text-slate-900 text-base">
                Cosmic Pause & Sleep Recovery
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                {upcomingWeekForecast.filter(f => f.recommendedCategory === "Rest").map(f => `${f.dayName} (${f.dateStr})`).join(", ")}
              </p>
            </div>
          </div>

          {/* 7-DAY FORECAST GRID */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              <span>7-Day Detailed Cosmic Timetable</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingWeekForecast.map((forecast, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-amber-400 transition-all space-y-3 shadow-2xs flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-slate-900 text-base">
                        {forecast.dayName} <span className="text-xs text-slate-500 font-normal">({forecast.dateStr})</span>
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        forecast.recommendedCategory === "Business" ? "bg-emerald-100 text-emerald-800" :
                        forecast.recommendedCategory === "Spiritual" ? "bg-purple-100 text-purple-800" :
                        forecast.recommendedCategory === "Investment" ? "bg-blue-100 text-blue-800" :
                        forecast.recommendedCategory === "Rest" ? "bg-amber-100 text-amber-800" :
                        "bg-rose-100 text-rose-800"
                      }`}>
                        {forecast.recommendedCategory} Day
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-amber-800 bg-amber-50/60 p-2 rounded-xl">
                      {forecast.planetaryAlignment}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {forecast.guidance}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-[11px] space-y-1 text-slate-500">
                    <div className="flex items-center justify-between">
                      <span>Favorable Hours: <strong className="text-emerald-700">{forecast.favorableHours}</strong></span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Caution Window: <strong className="text-rose-700">{forecast.cautionHours}</strong></span>
                    </div>
                    <div className="flex items-center justify-between pt-1 font-semibold text-slate-700">
                      <span>Lucky Color: <strong className="text-slate-900">{forecast.luckyColor}</strong></span>
                      <span>Lucky #: <strong className="text-amber-700">#{forecast.luckyNumber}</strong></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CURATED PRODUCTS & E-BOOKS SECTION */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-600" />
                  <span>Curated Remedial Products & E-Books for Your Week</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Tailored to mitigate upcoming transit friction and boost favorable Muhurats.
                </p>
              </div>

              {onNavigateMarketplace && (
                <button
                  onClick={onNavigateMarketplace}
                  className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Marketplace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {curatedProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-amber-400 transition-all flex flex-col justify-between space-y-3 shadow-2xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{prod.imageIcon}</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-800 text-[10px] font-bold">
                        {prod.badge || prod.type}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-slate-900 text-sm leading-snug">
                      {prod.title}
                    </h4>

                    <div className="bg-slate-50 p-2.5 rounded-xl text-[11px] text-slate-600 italic">
                      "<strong className="text-amber-800 font-not-italic">Why this week:</strong> {prod.reasonForWeek}"
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">
                      ₹{prod.price}
                    </span>
                    <button
                      onClick={() => onNavigateMarketplace && onNavigateMarketplace()}
                      className="px-3 py-1.5 rounded-xl bg-slate-950 text-amber-300 hover:bg-slate-800 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{prod.type === "eBook" ? "Get PDF" : "View Remedy"}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: EMAIL NEWSLETTER PREVIEW */}
      {viewMode === "email_preview" && (
        <div className="max-w-2xl mx-auto bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 shadow-inner font-sans">
          {/* EMAIL TOP HEADER */}
          <div className="bg-slate-950 text-amber-100 p-6 rounded-2xl border border-amber-500/30 text-center space-y-2">
            <div className="text-[10px] uppercase font-bold text-amber-400 tracking-widest">
              DEV-GURU AUTOMATED WEEKLY DIGEST
            </div>
            <h2 className="font-serif text-2xl font-bold text-white">
              Your Weekly Planetary Forecast
            </h2>
            <div className="text-xs text-amber-200/80">
              Prepared for {userName} • {userMoonSign} Moon & {userLagna} Lagna
            </div>
          </div>

          {/* EMAIL BODY CONTENT */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 text-xs text-slate-700 leading-relaxed">
            <p>
              Namaste <strong>{userName}</strong>,
            </p>
            <p>
              Here is your personalized 7-day cosmic roadmap calculated using Chitra Paksha Lahiri Ayanamsha for your natal chart ({userMoonSign} Moon Sign). Use these timing windows to maximize success in business and preserve mental peace.
            </p>

            <div className="space-y-3 pt-2">
              <div className="font-serif font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
                🔮 7-Day Planetary Breakdown
              </div>
              {upcomingWeekForecast.map((d, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>{d.dayName} ({d.dateStr})</span>
                    <span className="text-amber-800 uppercase text-[10px]">{d.recommendedCategory} Day</span>
                  </div>
                  <p className="text-[11px] text-slate-600">{d.guidance}</p>
                  <div className="text-[10px] text-slate-500 flex justify-between pt-1 font-mono">
                    <span>Favorable: {d.favorableHours}</span>
                    <span>Caution: {d.cautionHours}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-2">
              <div className="font-serif font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
                📖 Recommended E-Books & Remedies for the Week
              </div>
              {curatedProducts.map((p, i) => (
                <div key={i} className="flex items-start justify-between gap-3 text-[11px] border-b border-slate-100 pb-2">
                  <div>
                    <strong className="text-slate-900">{p.title} ({p.type})</strong>
                    <p className="text-slate-500">{p.reasonForWeek}</p>
                  </div>
                  <span className="font-bold text-amber-800 shrink-0">₹{p.price}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 text-center">
              You are receiving this digest because your automated weekly transit alerts are enabled for {userEmail}.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
