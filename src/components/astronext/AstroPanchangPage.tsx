import React, { useState } from "react";
import { 
  Sun, 
  Moon, 
  MapPin, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Info
} from "lucide-react";
import { AstroCard, AstroBadge, AstroButton, AstroTabs } from "./AstroDesignSystem";

export interface AstroPanchangPageProps {
  currentLocation: string;
  onOpenLocationModal: () => void;
  onSelectTab: (tabId: string) => void;
}

export const AstroPanchangPage: React.FC<AstroPanchangPageProps> = ({
  currentLocation,
  onOpenLocationModal,
  onSelectTab,
}) => {
  const [activeSubTab, setActiveSubTab] = useState("overview");

  const timelineEvents = [
    { time: "05:18 AM – 06:04 AM", name: "Brahma Muhurta", type: "auspicious", desc: "Meditation, mantra sadhana, mental clarity" },
    { time: "06:04 AM", name: "Sunrise (Surya Udaya)", type: "neutral", desc: "Solar day begins" },
    { time: "08:15 AM – 09:45 AM", name: "Amrita Choghadiya", type: "auspicious", desc: "Excellent for educational & creative milestones" },
    { time: "10:30 AM – 12:00 PM", name: "Shubh Choghadiya", type: "auspicious", desc: "High favorability for commerce & meetings" },
    { time: "12:02 PM – 12:54 PM", name: "Abhijit Muhurta", type: "auspicious", desc: "Most potent midday window; overcomes planetary doshas" },
    { time: "01:45 PM – 03:15 PM", name: "Yamaganda", type: "cautionary", desc: "Avoid commencing new journeys or legal signings" },
    { time: "04:30 PM – 06:00 PM", name: "Rahu Kala", type: "inauspicious", desc: "Inauspicious Rahu period; postpone key agreements" },
    { time: "06:51 PM", name: "Sunset (Surya Asta)", type: "neutral", desc: "Evening sandhya transition" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* 1. Header & Location Bar */}
      <div className="bg-[#FAF8F5] border border-[#E7E2D9] rounded-3xl p-6 shadow-xs flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B89047]">
              Daily Vedic Almanac
            </span>
            <span className="text-[#DDD7CC]">•</span>
            <span className="text-xs text-[#766E65]">Deterministic Solar-Lunar Coordinates</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1B18] mt-0.5">
            Today&apos;s Panchanga
          </h1>
          <div className="flex items-center gap-3 text-xs text-[#554E46] mt-1">
            <span className="font-semibold">Monday, 17 August 2026</span>
            <span>•</span>
            <button
              onClick={onOpenLocationModal}
              className="flex items-center gap-1 font-semibold text-[#8C6D23] hover:text-[#1E1B18] bg-[#F5EFE0] px-2 py-0.5 rounded-md border border-[#E5D6B6]"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{currentLocation}</span>
              <span className="text-[10px] underline ml-0.5">Change</span>
            </button>
          </div>
        </div>

        <AstroButton variant="primary" size="sm" onClick={() => onSelectTab("best_time")}>
          <Clock className="w-3.5 h-3.5" />
          <span>Find Best Time</span>
        </AstroButton>
      </div>

      {/* 2. Five Limbs of Panchanga (Pancha-Anga) Cards */}
      <section className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-[#1E1B18]">The Five Sacred Limbs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* Tithi */}
          <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E7E2D9] shadow-xs space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C847A]">1. Tithi (Lunar Phase)</div>
            <div className="text-sm font-bold text-[#1E1B18]">Shukla Chaturthi</div>
            <div className="text-xs text-[#1E6B37] font-medium">Until 04:22 PM</div>
            <div className="text-[11px] text-[#766E65] pt-1 border-t border-[#F2ECE1]">Rikta Tithi • Lord Ganesha</div>
          </div>

          {/* Vara */}
          <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E7E2D9] shadow-xs space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C847A]">2. Vara (Solar Day)</div>
            <div className="text-sm font-bold text-[#1E1B18]">Somavara (Monday)</div>
            <div className="text-xs text-[#B89047] font-medium">Moon Ruler (Chandra)</div>
            <div className="text-[11px] text-[#766E65] pt-1 border-t border-[#F2ECE1]">Gentle, receptive, emotional</div>
          </div>

          {/* Nakshatra */}
          <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E7E2D9] shadow-xs space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C847A]">3. Nakshatra (Constellation)</div>
            <div className="text-sm font-bold text-[#1E1B18]">Rohini (Pada 2)</div>
            <div className="text-xs text-[#1E6B37] font-medium">Until 08:40 PM</div>
            <div className="text-[11px] text-[#766E65] pt-1 border-t border-[#F2ECE1]">Dhruva (Fixed) • High prosperity</div>
          </div>

          {/* Yoga */}
          <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E7E2D9] shadow-xs space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C847A]">4. Yoga (Sol-Lunar Angle)</div>
            <div className="text-sm font-bold text-[#1E1B18]">Sukarma (Good Deeds)</div>
            <div className="text-xs text-[#1E6B37] font-medium">Benefic Result</div>
            <div className="text-[11px] text-[#766E65] pt-1 border-t border-[#F2ECE1]">Lord: Indra • Steady success</div>
          </div>

          {/* Karana */}
          <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E7E2D9] shadow-xs space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C847A]">5. Karana (Half-Tithi)</div>
            <div className="text-sm font-bold text-[#1E1B18]">Vanija (Commerce)</div>
            <div className="text-xs text-[#554E46] font-medium">Until 04:22 PM</div>
            <div className="text-[11px] text-[#766E65] pt-1 border-t border-[#F2ECE1]">Followed by Vishti (Bhadra)</div>
          </div>
        </div>
      </section>

      {/* 3. Solar Horizon & Auspicious / Inauspicious Timing Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Visual Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1E1B18]">Panchanga Daily Timeline</h2>
              <p className="text-xs text-[#766E65]">Chronological progression from Brahma Muhurta to Sunset</p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#E7E2D9] shadow-xs space-y-3">
            {timelineEvents.map((evt, idx) => {
              const badgeStyle =
                evt.type === "auspicious"
                  ? "bg-[#EAF5ED] text-[#1E6B37] border-[#BCE1C7]"
                  : evt.type === "inauspicious"
                  ? "bg-[#FDECEB] text-[#A62B2B] border-[#F5BEBC]"
                  : evt.type === "cautionary"
                  ? "bg-[#FDF3E7] text-[#9E5D14] border-[#F5D5B0]"
                  : "bg-[#F2EFE9] text-[#554E46] border-[#DDD7CD]";

              return (
                <div
                  key={idx}
                  className="flex items-start justify-between p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DA] hover:border-[#DDD7CD] transition-colors gap-3"
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-[#1E1B18] flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#8C6D23]" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="text-xs font-bold text-[#2A241F] mt-0.5">{evt.name}</div>
                    <div className="text-[11px] text-[#6C645A]">{evt.desc}</div>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badgeStyle} shrink-0`}>
                    {evt.type.toUpperCase()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Key Muhurtas & Avoidances (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1E1B18]">Auspicious & Caution Windows</h2>
              <p className="text-xs text-[#766E65]">Critical thresholds for daily planning</p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Abhijit Card */}
            <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#E5D2A0] space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#1E1B18] flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-[#B89047]" /> Abhijit Muhurta (Midday Peak)
                </span>
                <AstroBadge label="Highly Favorable" variant="green" />
              </div>
              <div className="text-base font-bold text-[#1E1B18]">12:02 PM – 12:54 PM</div>
              <p className="text-xs text-[#4A433B]">
                Neutralizes all major astrological malefic doshas. Ideal for commencing any critical project or contract signing.
              </p>
            </div>

            {/* Rahu Kala Card */}
            <div className="p-4 rounded-2xl bg-[#FDF0F0] border border-[#F5BEBC] space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#A62B2B] flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-[#A62B2B]" /> Rahu Kala (Daily Malefic Window)
                </span>
                <AstroBadge label="Avoid Initiations" variant="red" />
              </div>
              <div className="text-base font-bold text-[#A62B2B]">04:30 PM – 06:00 PM</div>
              <p className="text-xs text-[#6B2A2A]">
                Do not execute financial transactions, sign real estate agreements, or embark on new travels during this window.
              </p>
            </div>

            {/* Choghadiya Summary */}
            <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E7E2D9] space-y-2">
              <div className="text-xs font-bold text-[#1E1B18]">Day Choghadiya Summary</div>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#4A433B] pt-1">
                <div className="p-2 bg-[#FAF8F5] rounded-xl border border-[#EAE5DA]">
                  <div className="font-bold text-[#1E6B37]">Shubh & Amrit</div>
                  <div className="text-[10px] text-[#766E65]">08:15 AM – 12:00 PM</div>
                </div>
                <div className="p-2 bg-[#FAF8F5] rounded-xl border border-[#EAE5DA]">
                  <div className="font-bold text-[#8C6D23]">Labh</div>
                  <div className="text-[10px] text-[#766E65]">03:15 PM – 04:30 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
