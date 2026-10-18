import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  X, 
  Sparkles, 
  Sun, 
  Compass, 
  Clock, 
  Layers, 
  ShieldCheck, 
  Heart, 
  FileText, 
  Calendar,
  ArrowRight,
  MapPin,
  Check
} from "lucide-react";

export interface SearchResultItem {
  id: string;
  title: string;
  category: "Planet" | "House" | "Yoga" | "Dasha" | "Nakshatra" | "Panchanga" | "Timing" | "Glossary";
  subtitle: string;
  tabTarget: string;
}

const SEARCH_DATABASE: SearchResultItem[] = [
  // Planets
  { id: "p-sun", title: "Sun (Surya)", category: "Planet", subtitle: "Soul, Vitality, Atmakaraka, 1st Lord", tabTarget: "birth_chart" },
  { id: "p-moon", title: "Moon (Chandra)", category: "Planet", subtitle: "Mind, Emotional Manas, Nakshatra Lord", tabTarget: "birth_chart" },
  { id: "p-mars", title: "Mars (Mangal)", category: "Planet", subtitle: "Energy, Courage, Ruchaka Yoga potential", tabTarget: "birth_chart" },
  { id: "p-mercury", title: "Mercury (Budha)", category: "Planet", subtitle: "Intellect, Communication, Bhadra Yoga", tabTarget: "birth_chart" },
  { id: "p-jupiter", title: "Jupiter (Guru)", category: "Planet", subtitle: "Wisdom, Dharma, Hamsa Yoga, Gaja Kesari", tabTarget: "birth_chart" },
  { id: "p-venus", title: "Venus (Shukra)", category: "Planet", subtitle: "Refinement, Malavya Yoga, D9 Lagnesha", tabTarget: "birth_chart" },
  { id: "p-saturn", title: "Saturn (Shani)", category: "Planet", subtitle: "Karma, Sasa Yoga, Sade Sati & Dhayya", tabTarget: "transits" },
  { id: "p-rahu", title: "Rahu (North Node)", category: "Planet", subtitle: "Material drive, Eclipse axis, Transit shift", tabTarget: "transits" },
  { id: "p-ketu", title: "Ketu (South Node)", category: "Planet", subtitle: "Moksha, Spiritual detachment, D60 indicator", tabTarget: "transits" },

  // Yogas
  { id: "y-gajakesari", title: "Gaja Kesari Yoga", category: "Yoga", subtitle: "Jupiter in Kendra from Moon — Status & Fame", tabTarget: "yogas" },
  { id: "y-rajayoga", title: "Dharma-Karmadhipati Yoga", category: "Yoga", subtitle: "Conjunction/Exchange of 9th & 10th lords", tabTarget: "yogas" },
  { id: "y-panchamahapurusha", title: "Pancha Mahapurusha Yogas", category: "Yoga", subtitle: "Exalted/Moolatrikona planets in Kendra houses", tabTarget: "yogas" },
  { id: "y-budhaditya", title: "Budhaditya Yoga", category: "Yoga", subtitle: "Sun-Mercury conjunction in auspicious houses", tabTarget: "yogas" },
  { id: "y-vipareeta", title: "Vipareeta Raja Yoga (Harsha/Sarala/Vimala)", category: "Yoga", subtitle: "Trik lords placed in trik houses", tabTarget: "yogas" },

  // Dashas
  { id: "d-vimshottari", title: "Vimshottari Dasha (120 Years)", category: "Dasha", subtitle: "Current active Mahadasha and Antardasha cycles", tabTarget: "dashas" },
  { id: "d-yogini", title: "Yogini Dasha (36 Years)", category: "Dasha", subtitle: "Eight-fold Mother goddess directional timing", tabTarget: "dashas" },
  { id: "d-chara", title: "Jaimini Chara Dasha", category: "Dasha", subtitle: "Sign-based progression determined by Atmakaraka", tabTarget: "jaimini" },

  // Timing & Muhurta
  { id: "t-best-time", title: "Find Best Time for Activity", category: "Timing", subtitle: "Filter favorable hours for marriage, business, travel", tabTarget: "best_time" },
  { id: "t-abhijit", title: "Abhijit Muhurta", category: "Panchanga", subtitle: "Midday solar blessing window neutralizing malefic faults", tabTarget: "panchang" },
  { id: "t-rahukala", title: "Rahu Kala Timing", category: "Panchanga", subtitle: "Daily inauspicious 90-minute window to avoid initiation", tabTarget: "panchang" },

  // Nakshatra
  { id: "n-rohini", title: "Rohini Nakshatra", category: "Nakshatra", subtitle: "Taurus 10°00' - 23°20' • Prajapati / Moon", tabTarget: "nakshatra" },
  { id: "n-ashwini", title: "Ashwini Nakshatra", category: "Nakshatra", subtitle: "Aries 0°00' - 13°20' • Ashvins / Ketu", tabTarget: "nakshatra" },
  { id: "n-pushya", title: "Pushya Nakshatra", category: "Nakshatra", subtitle: "Cancer 3°20' - 16°40' • Brihaspati / Saturn", tabTarget: "nakshatra" },

  // Glossary
  { id: "g-shadbala", title: "Shadbala Strength System", category: "Glossary", subtitle: "6-fold planetary potency (Sthana, Dig, Kala, etc.)", tabTarget: "shadbala" },
  { id: "g-ashtakavarga", title: "Ashtakavarga 337 Bindus", category: "Glossary", subtitle: "Benefic point system across 12 signs", tabTarget: "ashtakavarga" },
  { id: "g-kp", title: "KP 249 Sub-Lord System", category: "Glossary", subtitle: "Krishnamurti Paddhati precise event verification", tabTarget: "kp_system" },
];

interface AstroGlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (tabTarget: string) => void;
}

export const AstroGlobalSearchModal: React.FC<AstroGlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return SEARCH_DATABASE.slice(0, 6);
    const q = query.toLowerCase();
    return SEARCH_DATABASE.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center p-4 sm:p-6 md:p-20">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#1E1B18]/60 backdrop-blur-xs"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: -10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: -10 }}
        className="relative w-full max-w-2xl bg-[#FFFFFF] border border-[#DDD7CD] rounded-3xl shadow-2xl overflow-hidden z-10"
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#EAE5DA] flex items-center gap-3 bg-[#FAF8F5]">
          <Search className="w-5 h-5 text-[#B89047] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search planets, yogas, dashas, nakshatras, KP, muhurta..."
            autoFocus
            className="w-full bg-transparent text-sm sm:text-base font-semibold text-[#1E1B18] placeholder-[#9E958A] focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="p-1 text-[#766E65] hover:text-[#1E1B18]">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline px-2 py-0.5 bg-[#EFEBE1] text-[#766E65] text-xs font-mono rounded-lg border border-[#DDD7CC]">
            ESC
          </kbd>
        </div>

        {/* Search Results */}
        <div className="p-3 sm:p-4 max-h-96 overflow-y-auto space-y-1">
          {filteredResults.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#766E65]">
              No astrological factors match &quot;{query}&quot;. Try searching for &quot;Saturn&quot;, &quot;Gaja Kesari&quot;, or &quot;Panchanga&quot;.
            </div>
          ) : (
            filteredResults.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectResult(item.tabTarget);
                  onClose();
                }}
                className="w-full p-3 rounded-2xl hover:bg-[#FAF7F0] border border-transparent hover:border-[#E5D2A0] text-left flex items-center justify-between transition-all group"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1E1B18] group-hover:text-[#8C6D23]">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EFEBE1] text-[#554E46]">
                      {item.category}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#766E65]">{item.subtitle}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#DDD7CC] group-hover:text-[#8C6D23] transition-transform group-hover:translate-x-1" />
              </button>
            ))
          )}
        </div>

        {/* Quick Tag Pills */}
        <div className="p-3 sm:p-4 bg-[#F7F5F0] border-t border-[#EAE5DA] flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-bold text-[#766E65]">Popular:</span>
          {["Saturn Transit", "Abhijit Muhurta", "Gaja Kesari Yoga", "D10 Career", "KP Sub Lords", "Sade Sati"].map(
            (tag, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(tag)}
                className="px-2.5 py-1 rounded-lg bg-[#FFFFFF] hover:bg-[#FAF8F5] border border-[#DDD7CD] text-[11px] font-semibold text-[#554E46] transition-colors"
              >
                {tag}
              </button>
            )
          )}
        </div>
      </motion.div>
    </div>
  );
};
