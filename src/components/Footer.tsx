import React from "react";
import { Sparkles, Shield, Heart, Compass, Moon, Sun, ArrowUp, Star } from "lucide-react";

export interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 border-t border-amber-500/20 text-slate-400 pt-16 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-serif font-bold text-lg shadow-md shadow-amber-500/20">
                ॐ
              </div>
              <span className="font-serif font-bold text-2xl text-amber-100 tracking-wide">
                Dev-Guru
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Precision Vedic Jyotish & Cosmic Intelligence ecosystem. Deterministic astrological computations, high-precision astronomical ephemeris, and consecrated astrological consultations.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-amber-400">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> Zero AI Hallucination
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5" /> High-Precision Ephemeris
              </span>
            </div>
          </div>

          {/* Jyotish Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Astrological Portals
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onSelectTab("astrology")}
                  className="hover:text-amber-300 transition-colors"
                >
                  Kundli & Charts (D1-D60)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab("panchang")}
                  className="hover:text-amber-300 transition-colors"
                >
                  Panchang & Muhurta
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab("festivals_vrat")}
                  className="hover:text-amber-300 transition-colors"
                >
                  Vrats & Hindu Festivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab("horoscope")}
                  className="hover:text-amber-300 transition-colors"
                >
                  Daily Horoscopes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab("compatibility")}
                  className="hover:text-amber-300 transition-colors"
                >
                  Kundli Milan & Synastry
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab("numerology")}
                  className="hover:text-amber-300 transition-colors"
                >
                  Vedic & Lo Shu Numerology
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab("chinese_astrology")}
                  className="hover:text-amber-300 transition-colors"
                >
                  Chinese Astrology & BaZi
                </button>
              </li>
            </ul>
          </div>

          {/* Divination & Lifestyle */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Divination &amp; Sanctuary
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onSelectTab("consultation")}
                  className="hover:text-amber-300 transition-colors"
                >
                  Consultation Booking
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab("marketplace")}
                  className="hover:text-amber-300 transition-colors"
                >
                  Sacred Marketplace
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab("tarot")}
                  className="hover:text-amber-300 transition-colors"
                >
                  Tarot Arcana Sanctuary
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab("vastu_fengshui")}
                  className="hover:text-amber-300 transition-colors"
                >
                  Vastu Shastra &amp; Feng Shui
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab("baby_names")}
                  className="hover:text-amber-300 transition-colors"
                >
                  Baby Names &amp; Janmakshar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab("face_reading")}
                  className="hover:text-amber-300 transition-colors"
                >
                  Samudrika Face Reader
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab("dreams")}
                  className="hover:text-amber-300 transition-colors"
                >
                  Dream Interpretation
                </button>
              </li>
            </ul>
          </div>

          {/* Sacred Living & Rewards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Sacred Living &amp; Wisdom
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onSelectTab("mantras")}
                  className="hover:text-amber-300 transition-colors"
                >
                  Mantra Music &amp; Sadhana
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab("images")}
                  className="hover:text-amber-300 transition-colors"
                >
                  Sacred Gallery &amp; Yantras
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab("milestones")}
                  className="hover:text-amber-300 transition-colors"
                >
                  Spiritual Milestones &amp; Badges
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab("blog")}
                  className="hover:text-amber-300 transition-colors"
                >
                  Articles &amp; Wisdom Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab("referrals")}
                  className="hover:text-amber-300 transition-colors"
                >
                  Refer &amp; Earn Rewards
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Company & Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onSelectTab("about")}
                  className="hover:text-amber-300 transition-colors"
                >
                  About Dev-Guru
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab("privacy")}
                  className="hover:text-amber-300 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab("terms")}
                  className="hover:text-amber-300 transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab("refund")}
                  className="hover:text-amber-300 transition-colors"
                >
                  Refund Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab("contact")}
                  className="hover:text-amber-300 transition-colors"
                >
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Dev-Guru Jyotish Ecosystem. All sacred rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
          >
            <span>Back to Zenith</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
