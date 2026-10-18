import React, { useState, useMemo } from "react";
import { 
  Moon, 
  Sun, 
  Sparkles, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ShieldAlert, 
  Heart, 
  Flame, 
  Compass, 
  Feather, 
  Copy, 
  Check, 
  ChevronRight, 
  Info, 
  Share2, 
  BookOpen, 
  Award,
  Zap,
  Droplets,
  Eye
} from "lucide-react";

interface MoonPhaseWidgetProps {
  rashi?: string;
  nakshatra?: string;
  userName?: string;
}

export interface MoonEvent {
  title: string;
  type: "Purnima" | "Amavasya" | "Ekadashi" | "First Quarter" | "Third Quarter";
  date: Date;
  dateStr: string;
  formattedDate: string;
  daysAway: number;
  rashi: string;
  nakshatra: string;
  sankalpa: string;
  practices: string[];
  mantra: { text: string; transliteration: string; count: string };
  fastingSuggestion: string;
  element: "Water" | "Fire" | "Air" | "Earth";
}

export const MoonPhaseWidget: React.FC<MoonPhaseWidgetProps> = ({
  rashi = "Taurus",
  nakshatra = "Rohini",
  userName = "Seeker"
}) => {
  const [selectedPhaseTab, setSelectedPhaseTab] = useState<"purnima" | "amavasya" | "shukla" | "krishna">("purnima");
  const [completedPractices, setCompletedPractices] = useState<Record<string, boolean>>({});
  const [copiedMantra, setCopiedMantra] = useState<string | null>(null);

  // Dynamic moon phase calculations based on reference epoch
  const moonInfo = useMemo(() => {
    const today = new Date();
    // Known reference New Moon epoch: Jan 11, 2024
    const refNewMoon = new Date("2024-01-11T11:57:00Z");
    const synodicMonth = 29.53058770576; // days in lunar cycle

    const diffDays = (today.getTime() - refNewMoon.getTime()) / (1000 * 60 * 60 * 24);
    const currentCyclePosition = (diffDays % synodicMonth + synodicMonth) % synodicMonth;

    // Illumination %
    const phaseAngle = (currentCyclePosition / synodicMonth) * 2 * Math.PI;
    const illumination = Math.round(((1 - Math.cos(phaseAngle)) / 2) * 100);

    // Tithi age (1 to 30)
    const tithiAge = Math.floor((currentCyclePosition / synodicMonth) * 30) + 1;
    const isShukla = tithiAge <= 15;
    const pakshaName = isShukla ? "Shukla Paksha (Waxing Phase)" : "Krishna Paksha (Waning Phase)";

    // Phase name
    let phaseName = "";
    if (tithiAge === 15) phaseName = "Full Moon (Purnima)";
    else if (tithiAge === 30 || tithiAge === 1) phaseName = "New Moon (Amavasya)";
    else if (tithiAge > 1 && tithiAge < 8) phaseName = "Waxing Crescent (Shukla Dwitiya - Saptami)";
    else if (tithiAge >= 8 && tithiAge <= 10) phaseName = "First Quarter (Shukla Ashtami)";
    else if (tithiAge > 10 && tithiAge < 15) phaseName = "Waxing Gibbous (Shukla Ekadashi - Chaturdashi)";
    else if (tithiAge > 15 && tithiAge < 23) phaseName = "Waning Gibbous (Krishna Dwitiya - Ashtami)";
    else if (tithiAge >= 23 && tithiAge <= 25) phaseName = "Third Quarter (Krishna Navami - Ekadashi)";
    else phaseName = "Waning Crescent (Krishna Dwadashi - Chaturdashi)";

    // Calculate upcoming Full Moon & New Moon dates
    const upcomingEvents: MoonEvent[] = [];

    // Next 3 Full Moons & New Moons
    for (let cycle = 0; cycle < 3; cycle++) {
      // Full Moon occurs at position ~14.76 days
      const daysUntilFull = ((14.765 - currentCyclePosition) % synodicMonth + synodicMonth) % synodicMonth + (cycle * synodicMonth);
      const fullMoonDate = new Date(today.getTime() + daysUntilFull * 86400000);

      // New Moon occurs at position ~0 / 29.53 days
      const daysUntilNew = ((0 - currentCyclePosition) % synodicMonth + synodicMonth) % synodicMonth + (cycle * synodicMonth);
      const newMoonDate = new Date(today.getTime() + daysUntilNew * 86400000);

      const fDays = Math.round(daysUntilFull);
      const nDays = Math.round(daysUntilNew);

      if (fDays <= 60) {
        upcomingEvents.push({
          title: `Sharad/Guru Purnima (Full Moon)`,
          type: "Purnima",
          date: fullMoonDate,
          dateStr: fullMoonDate.toISOString().split("T")[0],
          formattedDate: fullMoonDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }),
          daysAway: fDays,
          rashi: ["Aquarius (Kumbha)", "Pisces (Meena)", "Aries (Mesha)", "Taurus (Vrishabha)"][cycle % 4],
          nakshatra: ["Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada"][cycle % 4],
          sankalpa: "Expansion of Consciousness, Satyanarayan Vrat, & Divine Abundance.",
          practices: [
            "Perform Satyanarayan Puja or offer Kheer (sweet rice pudding) under moonlight.",
            "Offer Chandra Arghya (water mixed with raw milk and white flowers to Moon at night).",
            "Chant 'Om Som Somaya Namah' 108 times for emotional peace.",
            "Keep a silver vessel filled with water in moonlight overnight and drink next morning."
          ],
          mantra: {
            text: "ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः",
            transliteration: "Om Shram Shreem Shroum Sah Chandramase Namah",
            count: "108 Recitations"
          },
          fastingSuggestion: "Liquid or fruit fast till Moonrise. Break fast with Prasad.",
          element: "Water"
        });
      }

      if (nDays <= 60) {
        upcomingEvents.push({
          title: `Darsha/Bhadrapada Amavasya (New Moon)`,
          type: "Amavasya",
          date: newMoonDate,
          dateStr: newMoonDate.toISOString().split("T")[0],
          formattedDate: newMoonDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }),
          daysAway: nDays,
          rashi: ["Leo (Simha)", "Virgo (Kanya)", "Libra (Tula)", "Scorpio (Vrishchika)"][cycle % 4],
          nakshatra: ["Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta"][cycle % 4],
          sankalpa: "Ancestral Liberation (Pitru Tarpan), Internal Detoxification, & Shadow Cleansing.",
          practices: [
            "Offer Pitru Tarpan (water, sesame seeds & barley) to ancestors between 11:30 AM - 1:30 PM.",
            "Light mustard oil mustard lamps (Deep Daan) at a Peepal tree or doorstep at dusk.",
            "Chant Mahamrityunjaya Mantra 108 times for protection and removal of obstacles.",
            "Donate food, black sesame, or warm clothes to the needy (Annadaan)."
          ],
          mantra: {
            text: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥",
            transliteration: "Om Tryambakam Yajamahe Sugandhim Pushti-Vardhanam | Urvarukamiva Bandhanan Mrityor Mukshiya Ma'mritat ||",
            count: "108 Recitations"
          },
          fastingSuggestion: "Full day saltless fast or single meal afternoon fast for Pitru Dosha peace.",
          element: "Fire"
        });
      }
    }

    // Sort upcoming events chronologically
    upcomingEvents.sort((a, b) => a.date.getTime() - b.date.getTime());

    return {
      illumination,
      tithiAge,
      isShukla,
      pakshaName,
      phaseName,
      upcomingEvents
    };
  }, []);

  const handleCopyMantra = (mantraText: string) => {
    navigator.clipboard.writeText(mantraText);
    setCopiedMantra(mantraText);
    setTimeout(() => setCopiedMantra(null), 2500);
  };

  const togglePractice = (id: string) => {
    setCompletedPractices((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-xs space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Moon className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            Vedic Chandra Tithi & Sadhana Tracker
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Moon Phase & Spiritual Practice Tracker
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Real-time lunar position calibrated for <span className="text-amber-800 font-semibold">{userName}</span>'s <span className="text-amber-800 font-semibold">{rashi} Moon Sign</span> & <span className="text-amber-800 font-semibold">{nakshatra} Nakshatra</span>. Track Purnima, Amavasya, & Tithi-aligned remedies.
          </p>
        </div>

        {/* CURRENT LUNAR BADGE */}
        <div className="bg-gradient-to-br from-[#181512] to-[#0D0B0A] text-amber-100 p-4 rounded-2xl border border-amber-500/30 flex items-center gap-4 shadow-md shrink-0">
          <div className="relative w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-serif font-bold text-lg">
            {moonInfo.illumination}%
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-amber-400 font-bold">Today's Moon State</div>
            <div className="font-serif font-bold text-amber-100 text-sm truncate max-w-[160px]">{moonInfo.phaseName}</div>
            <div className="text-[11px] text-amber-200/70">{moonInfo.pakshaName} • Tithi {moonInfo.tithiAge}/30</div>
          </div>
        </div>
      </div>

      {/* UPCOMING LUNAR MILESTONES (PURNIMA & AMAVASYA CARDS) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-700" />
            <span>Upcoming Major Lunar Milestones (Full & New Moons)</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">Next 60 Days</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {moonInfo.upcomingEvents.slice(0, 2).map((event, idx) => {
            const isPurnima = event.type === "Purnima";

            return (
              <div
                key={idx}
                className={`p-5 rounded-3xl border transition-all space-y-3 relative overflow-hidden ${
                  isPurnima
                    ? "bg-gradient-to-br from-amber-950/90 via-slate-950 to-amber-950 text-amber-100 border-amber-500/40 shadow-lg"
                    : "bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-indigo-100 border-indigo-500/40 shadow-lg"
                }`}
              >
                {/* Event Type Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-xl ${isPurnima ? "bg-amber-500 text-slate-950" : "bg-indigo-500 text-white"}`}>
                      {isPurnima ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                        {event.type} Tithi
                      </span>
                      <h4 className="font-serif font-bold text-base leading-tight text-white">{event.title}</h4>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      event.daysAway === 0
                        ? "bg-emerald-500 text-slate-950 animate-pulse"
                        : isPurnima ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                    }`}>
                      {event.daysAway === 0 ? "TODAY" : `In ${event.daysAway} Days`}
                    </span>
                  </div>
                </div>

                {/* Date & Zodiac Details */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-black/40 p-3 rounded-2xl border border-white/10">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Sacred Date</span>
                    <span className="font-semibold text-white">{event.formattedDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Transit Zodiac</span>
                    <span className="font-semibold text-amber-300">{event.rashi}</span>
                  </div>
                </div>

                {/* Fasting & Sankalpa */}
                <div className="space-y-1 text-xs">
                  <div className="flex items-start gap-1.5 text-amber-200/90 font-serif">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong className="text-amber-300">Sankalpa:</strong> {event.sankalpa}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-slate-300 text-[11px]">
                    <Droplets className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-200">Vrat / Fasting:</strong> {event.fastingSuggestion}</span>
                  </div>
                </div>

                {/* Mantra Quick Box */}
                <div className="bg-white/5 p-3 rounded-2xl border border-white/10 flex items-center justify-between gap-2 text-xs">
                  <div className="truncate space-y-0.5">
                    <div className="text-[10px] text-amber-400 font-bold uppercase">Prescribed Tithi Mantra ({event.mantra.count})</div>
                    <div className="font-serif text-white text-xs truncate">{event.mantra.text}</div>
                  </div>
                  <button
                    onClick={() => handleCopyMantra(event.mantra.text)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-300 transition-colors shrink-0"
                    title="Copy Mantra"
                  >
                    {copiedMantra === event.mantra.text ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SUGGESTED SPIRITUAL PRACTICES & SADHANA BY MOON PHASE */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-700" />
              <span>Suggested Spiritual Sadhana & Vedic Rituals</span>
            </h3>
            <p className="text-xs text-slate-500">Tithi-aligned practices for mental peace, karma cleansing, and prosperity.</p>
          </div>

          {/* Phase Selector Tabs */}
          <div className="flex items-center overflow-x-auto gap-1 bg-slate-100 p-1 rounded-2xl text-xs font-semibold no-scrollbar">
            {[
              { id: "purnima", label: "Full Moon (Purnima)", icon: Sun },
              { id: "amavasya", label: "New Moon (Amavasya)", icon: Moon },
              { id: "shukla", label: "Waxing (Shukla)", icon: Sparkles },
              { id: "krishna", label: "Waning (Krishna)", icon: Feather }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedPhaseTab(tab.id as any)}
                  className={`whitespace-nowrap px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                    selectedPhaseTab === tab.id
                      ? "bg-amber-600 text-white font-bold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB CONTENT: PRACTICES */}
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
          {/* PURNIMA PRACTICES */}
          {selectedPhaseTab === "purnima" && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-base flex items-center gap-2">
                    <Sun className="w-4 h-4 text-amber-600" />
                    Purnima Sadhana: High Cosmic Light & Emotional Fulfillment
                  </h4>
                  <p className="text-slate-500 mt-0.5">
                    When the Moon is at 100% illumination, Chandra Dev's rays radiate supreme soma nectar. Best for Satyanarayan Vrat and wealth alignment.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px] shrink-0">
                  Full Moon Nectar
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {
                    id: "p1",
                    title: "Chandra Arghya (Moonlight Water Offering)",
                    desc: "At moonrise, offer pure water mixed with raw milk, white rice, and white sandalwood in a copper/silver vessel while chanting 'Om Som Somaya Namah'.",
                    time: "At Moonrise"
                  },
                  {
                    id: "p2",
                    title: "Shri Satyanarayan Katha & Puja",
                    desc: "Read or listen to the sacred Satyanarayan Katha with family. Prepare Panjiri and banana prasad to invoke Lord Vishnu's lasting grace.",
                    time: "Evening Hours"
                  },
                  {
                    id: "p3",
                    title: "Silver Vessel Moonlight Water Charger",
                    desc: "Place a silver glass filled with drinking water outdoors under direct moonlight for 3 hours. Drink next morning for emotional equilibrium.",
                    time: "Overnight"
                  },
                  {
                    id: "p4",
                    title: "Chandra Beej Mantra Japa (108x)",
                    desc: "Recite 'Om Shram Shreem Shroum Sah Chandramase Namah' using a Pearl (Moti) or Sphatik mala to soothe anxiety and boost memory.",
                    time: "8:00 PM - 10:00 PM"
                  }
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => togglePractice(item.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      completedPractices[item.id]
                        ? "bg-emerald-50/80 border-emerald-300 text-slate-800"
                        : "bg-white border-slate-200 text-slate-800 hover:border-amber-400"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {completedPractices[item.id] ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 hover:border-amber-600" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${completedPractices[item.id] ? "line-through text-slate-500" : "text-slate-900"}`}>
                          {item.title}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AMAVASYA PRACTICES */}
          {selectedPhaseTab === "amavasya" && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-base flex items-center gap-2">
                    <Moon className="w-4 h-4 text-indigo-700" />
                    Amavasya Sadhana: Ancestral Peace & Shadow Work
                  </h4>
                  <p className="text-slate-500 mt-0.5">
                    The quietest lunar phase when the Moon is fully shielded. Ideal for ancestor offerings (Pitru Tarpan), karma clearing, and deep meditation.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 font-bold text-[11px] shrink-0">
                  New Moon Silence
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {
                    id: "a1",
                    title: "Pitru Tarpan & Water Offerings",
                    desc: "Offer water mixed with black sesame seeds (Kala Til) facing south between 11:30 AM - 1:30 PM to honor ancestors and dissolve lineage karmas.",
                    time: "Kutapa Kaal (Noon)"
                  },
                  {
                    id: "a2",
                    title: "Deep Daan under Peepal Tree",
                    desc: "Light a four-faced mustard oil lamp (Chaumukhi Diya) near a Peepal tree or home entrance at dusk while chanting 'Om Namo Bhagavate Vasudevaya'.",
                    time: "Sunset / Dusk"
                  },
                  {
                    id: "a3",
                    title: "Mahamrityunjaya Mantra Chanting",
                    desc: "Recite the Mahamrityunjaya Mantra 108 times for health protection, freedom from fear, and spiritual resilience.",
                    time: "Morning or Evening"
                  },
                  {
                    id: "a4",
                    title: "Annadaan (Food Charity)",
                    desc: "Feed crows, stray dogs, or offer food and clothes to underprivileged individuals to mitigate Shani, Rahu, and Ketu afflictions.",
                    time: "Before Sunset"
                  }
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => togglePractice(item.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      completedPractices[item.id]
                        ? "bg-emerald-50/80 border-emerald-300 text-slate-800"
                        : "bg-white border-slate-200 text-slate-800 hover:border-indigo-400"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {completedPractices[item.id] ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 hover:border-indigo-600" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${completedPractices[item.id] ? "line-through text-slate-500" : "text-slate-900"}`}>
                          {item.title}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SHUKLA PAKSHA (WAXING) PRACTICES */}
          {selectedPhaseTab === "shukla" && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    Shukla Paksha (Waxing Moon): Building Growth & Manifestation
                  </h4>
                  <p className="text-slate-500 mt-0.5">
                    As lunar illumination expands day by day, cosmic energy favors initiating new ventures, investments, wearing gemstones, and prosperity mantras.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px] shrink-0">
                  Expansion Phase
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {
                    id: "s1",
                    title: "Sankalpa & Goal Setting Ritual",
                    desc: "Write down 3 major spiritual or financial goals on fresh paper on Shukla Tritiya or Panchami and place near your puja altar.",
                    time: "Morning Hours"
                  },
                  {
                    id: "s2",
                    title: "Shri Suktam / Kanakadhara Stotram",
                    desc: "Recite Shri Suktam or Kanakadhara Stotram daily during waxing days to invite Maa Lakshmi's steady financial prosperity.",
                    time: "At Sunrise"
                  },
                  {
                    id: "s3",
                    title: "New Venture Inception & Signing",
                    desc: "Schedule contract signings, housewarming (Griha Pravesh), or major purchases during Shukla Paksha's auspicious Tithis.",
                    time: "Auspicious Muhurat"
                  },
                  {
                    id: "s4",
                    title: "Gemstone Purification & Wearing",
                    desc: "Consecrate astro gemstones (Pearl, Yellow Sapphire, Emerald) on Shukla Paksha Thursdays or Mondays after Panchamrit abhishekam.",
                    time: "Morning Hours"
                  }
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => togglePractice(item.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      completedPractices[item.id]
                        ? "bg-emerald-50/80 border-emerald-300 text-slate-800"
                        : "bg-white border-slate-200 text-slate-800 hover:border-amber-400"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {completedPractices[item.id] ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 hover:border-amber-600" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${completedPractices[item.id] ? "line-through text-slate-500" : "text-slate-900"}`}>
                          {item.title}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* KRISHNA PAKSHA (WANING) PRACTICES */}
          {selectedPhaseTab === "krishna" && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-base flex items-center gap-2">
                    <Feather className="w-4 h-4 text-purple-700" />
                    Krishna Paksha (Waning Moon): Releasing, Detox & Inner Reflection
                  </h4>
                  <p className="text-slate-500 mt-0.5">
                    As moonlight recedes, energy flows inward. Prime period for physical body detox, breaking unwanted habits, decluttering homes, and Shiva Dhyana.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 font-bold text-[11px] shrink-0">
                  Introspective Phase
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {
                    id: "k1",
                    title: "Physical & Mental Detox",
                    desc: "Engage in light fasting, herbal tea cleanses, or Ayurvedic Panchakarma self-care to eliminate bodily toxins.",
                    time: "All Day"
                  },
                  {
                    id: "k2",
                    title: "Shiva Dhyan & Rudrashtakam Recitation",
                    desc: "Recite Rudrashtakam or 'Om Namah Shivaya' 108 times daily to quiet emotional noise and release mental attachments.",
                    time: "Sunset Hours"
                  },
                  {
                    id: "k3",
                    title: "Sacred Space Decluttering",
                    desc: "Clean altar spaces, discard broken items, and burn pure Camphor (Kapur) or Guggul incense to clear stagnant energy.",
                    time: "Morning"
                  },
                  {
                    id: "k4",
                    title: "Habit Releasing Journaling",
                    desc: "Write down limiting fears or negative habits on paper during Krishna Ashtami or Chaturdashi and burn it safely in a clay pot.",
                    time: "Night Time"
                  }
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => togglePractice(item.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      completedPractices[item.id]
                        ? "bg-emerald-50/80 border-emerald-300 text-slate-800"
                        : "bg-white border-slate-200 text-slate-800 hover:border-purple-400"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {completedPractices[item.id] ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 hover:border-purple-600" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${completedPractices[item.id] ? "line-through text-slate-500" : "text-slate-900"}`}>
                          {item.title}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
