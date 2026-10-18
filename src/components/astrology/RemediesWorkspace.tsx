import React, { useState } from "react";
import { UserProfile, PlanetPosition } from "../../types";
import { 
  ShieldCheck, 
  Flame, 
  Sparkles, 
  Heart, 
  AlertTriangle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Award,
  BookOpen
} from "lucide-react";
import { playCardHoverSound, playCardFlipSound } from "../../utils/audioEffects";
import { PersonalizedRemediesView } from "../PersonalizedRemediesView";
import { RemediesLibrary } from "../RemediesLibrary";
import { SpiritualRemediesMantrasView } from "../SpiritualRemediesMantrasView";
import { ChakraBalancingRemediesView } from "../ChakraBalancingRemediesView";
import { YantrasCrystalsEnergyView } from "../YantrasCrystalsEnergyView";

interface RemediesWorkspaceProps {
  userProfile?: UserProfile;
  planets?: PlanetPosition[];
  lagnaSign?: string;
}

export type RemediesSubTab = 
  | "personalized_remedies"
  | "gemstone_audit"
  | "mantras_japa"
  | "puja_havan"
  | "dana_charity"
  | "vrata_fasting"
  | "rudraksha_yantras"
  | "remedy_evidence";

export const RemediesWorkspace: React.FC<RemediesWorkspaceProps> = ({
  userProfile,
  planets,
  lagnaSign
}) => {
  const [activeSubTab, setActiveSubTab] = useState<RemediesSubTab>("personalized_remedies");

  const subTabs: { id: RemediesSubTab; label: string }[] = [
    { id: "personalized_remedies", label: "Personalized Remedies" },
    { id: "gemstone_audit", label: "Gemstone Safety & Audit" },
    { id: "mantras_japa", label: "Mantras & Japa" },
    { id: "puja_havan", label: "Puja, Homa & Yajna" },
    { id: "dana_charity", label: "Dana (Vedic Charity)" },
    { id: "vrata_fasting", label: "Vrata & Fasting" },
    { id: "rudraksha_yantras", label: "Rudraksha & Yantras" },
    { id: "remedy_evidence", label: "Shastra Proof & WHY" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-5 border border-amber-900/10 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
              Vedic Upay &amp; Harmonization
            </span>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
              Vedic Remedies &amp; Karmic Harmonization
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Deterministic, shastra-grounded remedial protocols (Mantras, Pujas, Dana, Vratas, Rudrakshas, and Gemstones with strict safety contraindications).
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 text-amber-300 px-3.5 py-2 rounded-2xl text-xs font-bold shadow-xs">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Benefic-First Safety Protocol Active</span>
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

      {/* 1. PERSONALIZED REMEDIES */}
      {activeSubTab === "personalized_remedies" && (
        <div className="space-y-6">
          <PersonalizedRemediesView userProfile={userProfile} />
        </div>
      )}

      {/* 2. GEMSTONE SAFETY & AUDIT */}
      {activeSubTab === "gemstone_audit" && (
        <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-5">
          <div className="flex justify-between items-start">
            <div>
              <span className="px-3 py-0.5 rounded-full bg-rose-100 text-rose-900 text-xs font-bold uppercase tracking-wider">
                Strict Vedic Ratna Pariksha
              </span>
              <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">
                Gemstone Recommendation &amp; Contraindication Matrix
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Classical rule: Only natural functional benefics (lords of 1st, 5th, 9th houses) may receive gemstone amplification. Wearing stones for Marakas (2nd/7th) or Dusthana (6th/8th/12th) lords is strictly contraindicated.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="text-xs font-bold text-emerald-900 uppercase">1. Recommended Gemstone</div>
              <div className="font-serif text-lg font-bold text-slate-900">Yellow Sapphire (Pukhraj)</div>
              <div className="text-xs text-slate-700">For Jupiter (Benefic 9th / 11th lord). Strengthens wisdom, fortune, and intellect.</div>
              <div className="text-[11px] font-bold text-emerald-800 bg-white p-2 rounded-xl">Wear: Gold on Index Finger (Thursday Morning)</div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="text-xs font-bold text-emerald-900 uppercase">2. Secondary Gemstone</div>
              <div className="font-serif text-lg font-bold text-slate-900">Diamond / White Zircon</div>
              <div className="text-xs text-slate-700">For Venus (Lagna Lord in friendly sign). Elevates vitality, magnetism, and creative grace.</div>
              <div className="text-[11px] font-bold text-emerald-800 bg-white p-2 rounded-xl">Wear: Silver / Platinum on Ring/Middle Finger (Friday)</div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
              <div className="text-xs font-bold text-rose-900 uppercase">Strict Contraindication</div>
              <div className="font-serif text-lg font-bold text-rose-950">Blue Sapphire (Neelam)</div>
              <div className="text-xs text-slate-700">Saturn lords Dusthana or acts as functional malefic. Never wear without trial.</div>
              <div className="text-[11px] font-bold text-rose-800 bg-white p-2 rounded-xl">Status: Prohibited for this chart</div>
            </div>
          </div>
        </div>
      )}

      {/* 3. MANTRAS & JAPA */}
      {activeSubTab === "mantras_japa" && (
        <div className="space-y-6">
          <SpiritualRemediesMantrasView />
        </div>
      )}

      {/* 4. PUJA & HAVAN */}
      {activeSubTab === "puja_havan" && (
        <div className="space-y-6">
          <RemediesLibrary />
        </div>
      )}

      {/* 5. DANA (CHARITY) */}
      {activeSubTab === "dana_charity" && (
        <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
          <h3 className="font-serif text-xl font-bold text-slate-900">
            Vedic Dana (Charity Protocols according to Parashara)
          </h3>
          <p className="text-xs text-slate-600">
            Dana directly dissipates negative karmic load associated with malefic dasha lords or afflicted nakshatras.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900 text-sm">Saturn / Shani Dana</div>
              <div className="text-slate-600">Donation of black sesame seeds, mustard oil, black blankets, or iron utensils to the needy on Saturdays.</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900 text-sm">Rahu / Ketu Dana</div>
              <div className="text-slate-600">Feeding stray dogs, donating brown grain (urad dal), or supporting leprosy/monastery shelters on Wednesdays.</div>
            </div>
          </div>
        </div>
      )}

      {/* 6. VRATA & FASTING */}
      {activeSubTab === "vrata_fasting" && (
        <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
          <h3 className="font-serif text-xl font-bold text-slate-900">
            Vrata &amp; Fasting Alignments
          </h3>
          <p className="text-xs text-slate-600">
            Observing fasting on days ruled by your functional benefic planets purifies the bodily nadis and intensifies spiritual clarity.
          </p>
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-1">
            <div className="font-bold text-slate-900">Recommended Fast: Guruvar Vrata (Thursdays)</div>
            <div className="text-slate-700">Dedicated to Brihaspati / Lord Vishnu. Take fruit and yellow gram prasada once after sunset.</div>
          </div>
        </div>
      )}

      {/* 7. RUDRAKSHA & YANTRAS */}
      {activeSubTab === "rudraksha_yantras" && (
        <div className="space-y-6">
          <YantrasCrystalsEnergyView />
        </div>
      )}

      {/* 8. REMEDY EVIDENCE & SHASTRA PROOF */}
      {activeSubTab === "remedy_evidence" && (
        <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
          <h3 className="font-serif text-xl font-bold text-slate-900">
            Scriptural Basis of Vedic Remedies
          </h3>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-700">
            <p>
              According to Brihat Parashara Hora Shastra (Shanti Adhyaya), remedies operate through three modalities: Mani (Gemstones / Yantras), Mantra (Sound vibrations), and Aushadha (Herbs / Lifestyle / Fasting).
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
