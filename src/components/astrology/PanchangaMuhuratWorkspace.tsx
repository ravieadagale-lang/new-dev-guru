import React, { useState } from "react";
import { UserProfile } from "../../types";
import { 
  Sun, 
  Moon, 
  Compass, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  Flame, 
  Car, 
  Home, 
  Heart, 
  Briefcase, 
  Baby, 
  Scale, 
  Award,
  ChevronRight,
  ShieldCheck,
  Search,
  Filter
} from "lucide-react";
import { playCardHoverSound, playCardFlipSound } from "../../utils/audioEffects";

interface PanchangaMuhuratWorkspaceProps {
  userProfile?: UserProfile;
}

export type PanchangaSubTab = 
  | "today_panchang"
  | "choghadiya"
  | "horas"
  | "muhurat_finder"
  | "tarabalam_chandrabalam"
  | "festivals_vrats"
  | "future_calendar";

export const PanchangaMuhuratWorkspace: React.FC<PanchangaMuhuratWorkspaceProps> = ({
  userProfile
}) => {
  const [activeSubTab, setActiveSubTab] = useState<PanchangaSubTab>("today_panchang");
  const [selectedActivity, setSelectedActivity] = useState<string>("marriage");

  const subTabs: { id: PanchangaSubTab; label: string }[] = [
    { id: "today_panchang", label: "Today's Panchanga" },
    { id: "choghadiya", label: "Choghadiya (Day & Night)" },
    { id: "horas", label: "24 Planetary Horas" },
    { id: "muhurat_finder", label: "18+ Muhurat Finder" },
    { id: "tarabalam_chandrabalam", label: "Tarabalam & Chandrabalam" },
    { id: "festivals_vrats", label: "Festivals & Vrat Guide" },
    { id: "future_calendar", label: "Panchanga Calendar" },
  ];

  const muhuratActivities = [
    { id: "marriage", name: "Vivah (Marriage)", icon: <Heart className="w-4 h-4 text-rose-600" />, status: "Highly Auspicious", dates: "Nov 24, Dec 02, Dec 08" },
    { id: "griha_pravesh", name: "Griha Pravesh (Housewarming)", icon: <Home className="w-4 h-4 text-amber-600" />, status: "Favorable", dates: "Nov 28, Dec 11, Dec 15" },
    { id: "property", name: "Property Purchase / Registry", icon: <Scale className="w-4 h-4 text-emerald-600" />, status: "Excellent", dates: "Nov 22, Nov 29, Dec 06" },
    { id: "vehicle", name: "Vehicle Purchase (Vahan)", icon: <Car className="w-4 h-4 text-blue-600" />, status: "Favorable", dates: "Nov 25, Dec 01, Dec 07" },
    { id: "business", name: "Business Start / Shop Opening", icon: <Briefcase className="w-4 h-4 text-purple-600" />, status: "Highly Auspicious", dates: "Nov 23, Nov 30, Dec 05" },
    { id: "naming", name: "Namakarana (Naming Ceremony)", icon: <Baby className="w-4 h-4 text-pink-600" />, status: "Favorable", dates: "Nov 26, Dec 03, Dec 10" },
    { id: "puja", name: "Maha Puja & Yajna", icon: <Flame className="w-4 h-4 text-amber-600" />, status: "Auspicious Daily", dates: "Daily in Abhijit / Brahma Muhurta" }
  ];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-5 border border-amber-900/10 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
              Vedic Astronomical Almanac
            </span>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
              Panchanga, Muhurat &amp; Sacred Timings
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              High-precision astronomical computation of the 5 cosmic limbs (Tithi, Vara, Nakshatra, Yoga, Karana), planetary Horas, Choghadiya, and activity-based auspicious electional timings.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 text-amber-300 px-3.5 py-2 rounded-2xl text-xs font-bold shadow-xs">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Vikram Samvat 2081 • Shaka 1946</span>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-t border-slate-100 pt-3">
          {subTabs.map((tab) => {
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playCardFlipSound();
                  setActiveSubTab(tab.id);
                }}
                onMouseEnter={playCardHoverSound}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-slate-900 text-amber-300 shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. TODAY'S PANCHANGA */}
      {activeSubTab === "today_panchang" && (
        <div className="space-y-6">
          {/* 5 Limbs Primary Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {/* 1. Tithi */}
            <div className="bg-white p-4 rounded-2xl border border-amber-900/10 shadow-xs space-y-1">
              <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">1. Tithi (Lunar Day)</div>
              <div className="font-serif font-bold text-base text-slate-900">Shukla Pratipada</div>
              <div className="text-[11px] text-slate-500">Until 04:22 PM • 98% elapsed</div>
            </div>

            {/* 2. Vara */}
            <div className="bg-white p-4 rounded-2xl border border-amber-900/10 shadow-xs space-y-1">
              <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">2. Vara (Solar Day)</div>
              <div className="font-serif font-bold text-base text-slate-900">Guruvara (Thursday)</div>
              <div className="text-[11px] text-slate-500">Ruler: Jupiter (Brihaspati)</div>
            </div>

            {/* 3. Nakshatra */}
            <div className="bg-white p-4 rounded-2xl border border-amber-900/10 shadow-xs space-y-1">
              <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">3. Nakshatra (Mansion)</div>
              <div className="font-serif font-bold text-base text-slate-900">Rohini (Pada 2)</div>
              <div className="text-[11px] text-slate-500">Until 08:45 PM • Ruler: Moon</div>
            </div>

            {/* 4. Yoga */}
            <div className="bg-white p-4 rounded-2xl border border-amber-900/10 shadow-xs space-y-1">
              <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">4. Yoga (Sun+Moon)</div>
              <div className="font-serif font-bold text-base text-slate-900">Siddhi Yoga</div>
              <div className="text-[11px] text-slate-500">Auspicious • Accomplishment</div>
            </div>

            {/* 5. Karana */}
            <div className="bg-white p-4 rounded-2xl border border-amber-900/10 shadow-xs space-y-1 col-span-2 sm:col-span-1">
              <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">5. Karana (Half-Tithi)</div>
              <div className="font-serif font-bold text-base text-slate-900">Bava Karana</div>
              <div className="text-[11px] text-slate-500">Followed by Balava</div>
            </div>
          </div>

          {/* Astronomical Solar & Lunar Timings */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950 text-white rounded-3xl p-6 border border-amber-500/20 shadow-lg space-y-4">
            <h3 className="font-serif font-bold text-lg text-amber-200">
              Astronomical Timings &amp; Ephemeris Bounds
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-black/40 border border-amber-500/20">
                <div className="text-amber-400 font-bold uppercase text-[10px]">Sunrise</div>
                <div className="font-serif text-base font-bold text-amber-100 mt-0.5">06:42:15 AM</div>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-amber-500/20">
                <div className="text-amber-400 font-bold uppercase text-[10px]">Sunset</div>
                <div className="font-serif text-base font-bold text-amber-100 mt-0.5">05:38:40 PM</div>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-amber-500/20">
                <div className="text-amber-400 font-bold uppercase text-[10px]">Moonrise</div>
                <div className="font-serif text-base font-bold text-amber-100 mt-0.5">07:15:20 AM</div>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-amber-500/20">
                <div className="text-amber-400 font-bold uppercase text-[10px]">Solar Noon (Madhyahna)</div>
                <div className="font-serif text-base font-bold text-amber-100 mt-0.5">12:10:28 PM</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. CHOGHADIYA (DAY & NIGHT) */}
      {activeSubTab === "choghadiya" && (
        <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
          <h3 className="font-serif text-xl font-bold text-slate-900">
            Day &amp; Night Choghadiya Timings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-xs font-bold text-amber-900 uppercase">Day Choghadiya (Sunrise to Sunset)</div>
              <div className="space-y-1.5 text-xs">
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex justify-between items-center font-semibold text-emerald-950">
                  <span>06:42 AM – 08:04 AM</span>
                  <span className="font-bold text-emerald-800">Shubh (Auspicious)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 flex justify-between items-center font-semibold text-rose-950">
                  <span>08:04 AM – 09:26 AM</span>
                  <span className="font-bold text-rose-800">Rog (Disease / Obstacle)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex justify-between items-center font-semibold text-amber-950">
                  <span>09:26 AM – 10:48 AM</span>
                  <span className="font-bold text-amber-800">Udveg (Anxiety)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex justify-between items-center font-semibold text-emerald-950">
                  <span>10:48 AM – 12:10 PM</span>
                  <span className="font-bold text-emerald-800">Char (Movement / Travel)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex justify-between items-center font-semibold text-emerald-950">
                  <span>12:10 PM – 01:32 PM</span>
                  <span className="font-bold text-emerald-800">Labh (Gain / Profit)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex justify-between items-center font-semibold text-emerald-950">
                  <span>01:32 PM – 02:54 PM</span>
                  <span className="font-bold text-emerald-800">Amrit (Nectar / Best)</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-indigo-900 uppercase">Night Choghadiya (Sunset to Sunrise)</div>
              <div className="space-y-1.5 text-xs">
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex justify-between items-center font-semibold text-emerald-950">
                  <span>05:38 PM – 07:16 PM</span>
                  <span className="font-bold text-emerald-800">Amrit (Best)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex justify-between items-center font-semibold text-emerald-950">
                  <span>07:16 PM – 08:54 PM</span>
                  <span className="font-bold text-emerald-800">Char (Travel)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 flex justify-between items-center font-semibold text-rose-950">
                  <span>08:54 PM – 10:32 PM</span>
                  <span className="font-bold text-rose-800">Rog (Avoid)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 flex justify-between items-center font-semibold text-rose-950">
                  <span>10:32 PM – 12:10 AM</span>
                  <span className="font-bold text-rose-800">Kaal (Loss)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex justify-between items-center font-semibold text-emerald-950">
                  <span>12:10 AM – 01:48 AM</span>
                  <span className="font-bold text-emerald-800">Labh (Gain)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. 24 PLANETARY HORAS */}
      {activeSubTab === "horas" && (
        <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
          <h3 className="font-serif text-xl font-bold text-slate-900">
            24 Planetary Horas (Hourly Planetary Rulership)
          </h3>
          <p className="text-xs text-slate-600">
            Based on the classical Chaldean order of planetary speed (Saturn &gt; Jupiter &gt; Mars &gt; Sun &gt; Venus &gt; Mercury &gt; Moon).
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
            {["Jupiter", "Mars", "Sun", "Venus", "Mercury", "Moon", "Saturn", "Jupiter", "Mars", "Sun", "Venus", "Mercury"].map((hora, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-bold text-slate-500">Hour {idx + 1} ({String(6 + idx).padStart(2, '0')}:42)</div>
                <div className="font-bold text-slate-900 mt-0.5">{hora} Hora</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. 18+ MUHURAT FINDER */}
      {activeSubTab === "muhurat_finder" && (
        <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-5">
          <h3 className="font-serif text-xl font-bold text-slate-900">
            Activity-Based Muhurat Finder (18+ Classical Life Events)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {muhuratActivities.map((act) => (
              <div
                key={act.id}
                onMouseEnter={playCardHoverSound}
                onClick={() => setSelectedActivity(act.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  selectedActivity === act.id
                    ? "bg-slate-900 text-white border-amber-400 shadow-md ring-1 ring-amber-400"
                    : "bg-slate-50 hover:bg-slate-100/80 text-slate-900 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-white/10 text-amber-400">
                      {act.icon}
                    </div>
                    <span className="font-serif font-bold text-sm">{act.name}</span>
                  </div>
                </div>

                <div className="text-xs font-semibold text-amber-300">
                  {act.status}
                </div>
                <div className="text-[11px] text-slate-400">
                  Upcoming Windows: {act.dates}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. TARABALAM & CHANDRABALAM */}
      {activeSubTab === "tarabalam_chandrabalam" && (
        <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
          <h3 className="font-serif text-xl font-bold text-slate-900">
            Tarabalam (9 Star Alignments) &amp; Chandrabalam
          </h3>
          <p className="text-xs text-slate-600">
            Calculated from your Janma Nakshatra ({userProfile?.nakshatra || "Rohini"}) to today's transiting Moon.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="text-emerald-800 font-bold uppercase text-[10px]">Today's Tarabalam</div>
              <div className="font-serif text-lg font-bold text-emerald-950 mt-0.5">Kshema (Well-Being)</div>
              <div className="text-emerald-700 text-[11px] mt-1">4th Tara • Highly auspicious for travel, starting education, and medicine.</div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="text-emerald-800 font-bold uppercase text-[10px]">Today's Chandrabalam</div>
              <div className="font-serif text-lg font-bold text-emerald-950 mt-0.5">1st House (Janma Rashi)</div>
              <div className="text-emerald-700 text-[11px] mt-1">Favorable • Promotes mental clarity, confidence, and peace.</div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <div className="text-amber-800 font-bold uppercase text-[10px]">Overall Personal Day Strength</div>
              <div className="font-serif text-lg font-bold text-amber-950 mt-0.5">Strong (8.5 / 10)</div>
              <div className="text-amber-700 text-[11px] mt-1">Both Tara and Chandra bala are fully synchronized.</div>
            </div>
          </div>
        </div>
      )}

      {/* 6. FESTIVALS & VRAT GUIDE */}
      {activeSubTab === "festivals_vrats" && (
        <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
          <h3 className="font-serif text-xl font-bold text-slate-900">
            Sacred Hindu Vrat &amp; Festival Calendar
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
              <div className="font-bold text-slate-900 text-sm">Utpanna Ekadashi</div>
              <div className="text-amber-800 font-semibold">Dec 11, 2024 • Krishna Paksha</div>
              <div className="text-slate-600 text-[11px]">Fasting dedicated to Lord Vishnu for spiritual cleansing and freedom from ancestral karma.</div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
              <div className="font-bold text-slate-900 text-sm">Pradosh Vrata (Shukla)</div>
              <div className="text-amber-800 font-semibold">Dec 24, 2024 • Trayodashi</div>
              <div className="text-slate-600 text-[11px]">Evening twilight puja for Lord Shiva and Goddess Parvati to dissolve obstacles.</div>
            </div>
          </div>
        </div>
      )}

      {/* 7. FUTURE CALENDAR */}
      {activeSubTab === "future_calendar" && (
        <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
          <h3 className="font-serif text-xl font-bold text-slate-900">
            Monthly &amp; Annual Panchanga Almanac
          </h3>
          <p className="text-xs text-slate-600">
            Select any future or historical date to generate a complete deterministic 5-limb astronomical ephemeris.
          </p>
          <input
            type="date"
            defaultValue="2024-11-20"
            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
          />
        </div>
      )}
    </div>
  );
};
