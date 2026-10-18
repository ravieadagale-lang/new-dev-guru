// src/components/PersonalizedRemediesView.tsx
import React, { useState } from "react";
import { UserProfile } from "../types";
import { MASTER_PLANET_REMEDIES, PlanetRemedy } from "../data/astrosageRemediesData";
import { 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Flame, 
  Award, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar,
  Layers,
  ChevronRight,
  Clock,
  Coins
} from "lucide-react";

interface PersonalizedRemediesViewProps {
  userProfile?: UserProfile;
}

export const PersonalizedRemediesView: React.FC<PersonalizedRemediesViewProps> = ({
  userProfile
}) => {
  const [selectedPlanetKey, setSelectedPlanetKey] = useState<string>("Sun");
  const [activeCategory, setActiveCategory] = useState<"ALL" | "MANTRA" | "DANA" | "LAL_KITAB" | "VRAT" | "RUDRAKSHA">("ALL");
  const [completedRemedies, setCompletedRemedies] = useState<Record<string, boolean>>({});

  const toggleRemedyDone = (key: string) => {
    setCompletedRemedies(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const planetKeys = Object.keys(MASTER_PLANET_REMEDIES);
  const currentRemedy: PlanetRemedy = MASTER_PLANET_REMEDIES[selectedPlanetKey] || MASTER_PLANET_REMEDIES["Sun"];

  // Determine user's ruling or afflicted planet based on user profile if available
  const userRashi = userProfile?.rashi || "Mesha (Aries)";
  const userNakshatra = userProfile?.nakshatra || "Ashwini";

  return (
    <div className="space-y-6">
      {/* Personalized Header Card */}
      <div className="bg-gradient-to-br from-slate-950 via-amber-950 to-slate-900 text-amber-50 p-6 md:p-8 rounded-3xl shadow-xl border border-amber-500/20 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
              Personalized Vedic Upaya
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-amber-100 text-xs font-medium">
              Vedic &bull; Lal Kitab &bull; Tantrik Alignment
            </span>
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-amber-100">
            Tailored Remedial Protocols for {userProfile?.name || "Seeker"}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-amber-200/90 pt-1">
            <span className="bg-amber-900/40 px-3 py-1 rounded-xl border border-amber-500/30">
              Moon Sign (Rashi): {userRashi}
            </span>
            <span className="bg-amber-900/40 px-3 py-1 rounded-xl border border-amber-500/30">
              Birth Star (Nakshatra): {userNakshatra}
            </span>
          </div>

          <p className="text-xs md:text-sm text-amber-100/80 leading-relaxed max-w-3xl">
            Vedic remedies do not alter cosmic destiny; they fortify the bio-energetic aura to mitigate adverse karmic transits (Doshas) and amplify benefic planetary blessings through sacred resonance (Japa), targeted charity (Daan), and ethical discipline (Niyama).
          </p>
        </div>
      </div>

      {/* Planet Selector Chips */}
      <div className="bg-white p-5 rounded-3xl border border-amber-900/10 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Select Planetary Energy Center (Graha)
          </span>
          <span className="text-xs text-slate-500">
            9 Planetary Archetypes
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {planetKeys.map((p) => {
            const isSelected = selectedPlanetKey === p;
            return (
              <button
                key={p}
                onClick={() => setSelectedPlanetKey(p)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 text-amber-300 shadow-md scale-102 ring-1 ring-amber-500"
                    : "bg-slate-50 text-slate-700 hover:bg-amber-50/50 border border-slate-200"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
        {[
          { id: "ALL", label: "All Upayas" },
          { id: "MANTRA", label: "Beej Mantra & Japa" },
          { id: "DANA", label: "Sacred Charity (Daan)" },
          { id: "LAL_KITAB", label: "Lal Kitab Household Upaya" },
          { id: "VRAT", label: "Fasting & Vrata" },
          { id: "RUDRAKSHA", label: "Rudraksha & Gemstone" }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === cat.id
                ? "bg-amber-900 text-amber-100 shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Detailed Planet Remedy Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Remedial Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. MANTRA & JAPA SECTION */}
          {(activeCategory === "ALL" || activeCategory === "MANTRA") && (
            <div className="bg-white p-6 md:p-7 rounded-3xl border border-amber-900/10 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-slate-900 text-lg">
                      {currentRemedy.sanskritName} — Beej Mantra
                    </h3>
                    <p className="text-xs text-slate-500">Ruling Deity: {currentRemedy.rulingDeity}</p>
                  </div>
                </div>

                <button
                  onClick={() => toggleRemedyDone(`${selectedPlanetKey}_mantra`)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    completedRemedies[`${selectedPlanetKey}_mantra`]
                      ? "bg-emerald-100 text-emerald-900"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{completedRemedies[`${selectedPlanetKey}_mantra`] ? "Chanted Today" : "Mark as Chanted"}</span>
                </button>
              </div>

              <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2 text-center">
                <span className="font-serif font-bold text-slate-900 text-xl block leading-relaxed">
                  {currentRemedy.beejMantra.sanskrit}
                </span>
                <p className="font-mono text-xs text-amber-950 font-semibold tracking-wide">
                  "{currentRemedy.beejMantra.transliteration}"
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 pt-1">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Recommended Count</span>
                  <strong className="text-slate-900">{currentRemedy.beejMantra.count}</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Ideal Timing & Direction</span>
                  <strong className="text-slate-900">{currentRemedy.beejMantra.bestTime}</strong>
                </div>
              </div>
            </div>
          )}

          {/* 2. LAL KITAB HOUSEHOLD REMEDIES */}
          {(activeCategory === "ALL" || activeCategory === "LAL_KITAB") && (
            <div className="bg-white p-6 md:p-7 rounded-3xl border border-amber-900/10 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                <div className="p-2 rounded-xl bg-rose-100 text-rose-800">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-slate-900 text-lg">
                    Lal Kitab Practical Household Upayas
                  </h3>
                  <p className="text-xs text-slate-500">Accessible karmic remedies with no ritual complexity</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                {currentRemedy.lalKitabRemedies.map((tip, idx) => (
                  <div key={idx} className="p-3.5 bg-rose-50/40 border border-rose-200/80 rounded-2xl flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-900 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-slate-800 font-medium">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. SACRED CHARITY (DAAN) */}
          {(activeCategory === "ALL" || activeCategory === "DANA") && (
            <div className="bg-white p-6 md:p-7 rounded-3xl border border-amber-900/10 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-slate-900 text-lg">
                    Sacred Charity & Daan Protocol
                  </h3>
                  <p className="text-xs text-slate-500">Karmic neutralization through generous offering</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200 space-y-1.5">
                  <span className="font-bold text-emerald-950 uppercase text-[10px] block">Items to Donate</span>
                  <ul className="space-y-1 text-slate-700">
                    {currentRemedy.donation.items.map((it, i) => (
                      <li key={i}>&bull; {it}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-slate-700">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Recommended Day</span>
                    <strong className="text-slate-900">{currentRemedy.donation.bestDay}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Cloth Color & Grains</span>
                    <p>{currentRemedy.donation.clothColor} &bull; {currentRemedy.donation.grains}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Ideal Recipient</span>
                    <p>{currentRemedy.donation.recipient}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: Fasting & Gemstone / Rudraksha */}
        <div className="space-y-6">
          {/* Fasting (Vrata) Card */}
          <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-xs space-y-4 text-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              <h4 className="font-serif font-bold text-slate-900 text-sm">
                Fasting (Vrata) Rules
              </h4>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Vrat Day</span>
                <strong className="text-amber-950 text-sm block">{currentRemedy.fastingVrat.day}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Dietary Injunction</span>
                <p className="text-slate-700 leading-relaxed">{currentRemedy.fastingVrat.foodRules}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Deity Devotion</span>
                <p className="text-slate-700 leading-relaxed">{currentRemedy.fastingVrat.deityWorship}</p>
              </div>
            </div>
          </div>

          {/* Rudraksha Association */}
          <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-xs space-y-3 text-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Award className="w-4 h-4 text-purple-600" />
              <h4 className="font-serif font-bold text-slate-900 text-sm">
                Sacred Rudraksha Mukhi
              </h4>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                <span className="font-serif font-bold text-purple-950 text-base block">
                  {currentRemedy.rudraksha.mukhi}
                </span>
                <span className="text-[11px] text-purple-800 block">Deity: {currentRemedy.rudraksha.deity}</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Consecrate and wear on {currentRemedy.rudraksha.wearingDay} after bathing and chanting the ruling mantra.
              </p>
            </div>
          </div>

          {/* Gemstone Advisory & Safety Warning */}
          <div className="bg-amber-50/80 p-6 rounded-3xl border border-amber-300 space-y-3 text-xs">
            <span className="font-bold text-amber-950 flex items-center gap-1.5 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              Gemstone Prescription Safety
            </span>
            <div className="space-y-1.5">
              <p className="font-serif font-bold text-slate-900">
                Primary Ratna: {currentRemedy.gemstone.primary}
              </p>
              <p className="text-slate-700">
                Substitute: {currentRemedy.gemstone.substitute}
              </p>
              <p className="text-slate-700">
                Metal & Finger: {currentRemedy.gemstone.metal} on {currentRemedy.gemstone.finger}
              </p>
            </div>
            <p className="text-[11px] text-amber-900/90 leading-relaxed pt-1 border-t border-amber-200/60">
              <strong>Caution:</strong> Wear gemstones only if {selectedPlanetKey} is a functional benefic (Lord of 1st, 5th, or 9th house in your birth chart). Never wear gemstones for lords of 6th, 8th, or 12th houses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
