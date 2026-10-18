import React, { useState, useMemo } from "react";
import { UserProfile } from "../../types";
import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  Activity, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Award,
  Layers
} from "lucide-react";
import { playCardHoverSound, playCardFlipSound } from "../../utils/audioEffects";
import { GunaMilanCalculator } from "../GunaMilanCalculator";
import { NakshatraCompatibilityView } from "../NakshatraCompatibilityView";
import { AshtaKootaExplanations } from "../AshtaKootaExplanations";
import { JaiminiPapasamyaView } from "../JaiminiPapasamyaView";
import { WesternSynastryView } from "../WesternSynastryView";
import { BothPartnersKundliView } from "../BothPartnersKundliView";
import { DashakootaExplanations } from "../DashakootaExplanations";
import { AIRelationshipAdviceSection } from "../AIRelationshipAdviceSection";
import { calculateComprehensiveMatch, PartnerInput } from "../../utils/compatibilityCalculator";

interface CompatibilityWorkspaceProps {
  userProfile?: UserProfile;
}

export type CompatibilitySubTab = 
  | "ashta_koota_36"
  | "both_kundlis"
  | "nakshatra_matching"
  | "dashakoota_matching"
  | "manglik_matching"
  | "jaimini_papasamya"
  | "western_synastry"
  | "koota_explanations"
  | "ai_advice";


export const CompatibilityWorkspace: React.FC<CompatibilityWorkspaceProps> = ({
  userProfile
}) => {
  const [activeSubTab, setActiveSubTab] = useState<CompatibilitySubTab>("ashta_koota_36");

  const partnerA: PartnerInput = useMemo(() => ({
    name: userProfile?.name || "Aarav",
    gender: userProfile?.gender || "male",
    dob: userProfile?.dob || "1995-05-15",
    birthTime: userProfile?.time || "10:30",
    birthPlace: userProfile?.place || "New Delhi, India"
  }), [userProfile]);

  const partnerB: PartnerInput = useMemo(() => ({
    name: "Priya",
    gender: "female",
    dob: "1997-08-20",
    birthTime: "14:15",
    birthPlace: "Mumbai, India"
  }), []);

  const matchResult = useMemo(() => {
    return calculateComprehensiveMatch(partnerA, partnerB);
  }, [partnerA, partnerB]);

  const subTabs: { id: CompatibilitySubTab; label: string }[] = [
    { id: "ashta_koota_36", label: "36-Point Guna Milan" },
    { id: "both_kundlis", label: "Dual Chart Comparison" },
    { id: "nakshatra_matching", label: "Nakshatra Porutham" },
    { id: "dashakoota_matching", label: "South Indian 10 Poruthams" },
    { id: "manglik_matching", label: "Manglik (Kuja) Matching" },
    { id: "jaimini_papasamya", label: "Jaimini Papasamya & Upapada" },
    { id: "western_synastry", label: "Western Synastry / Aspects" },
    { id: "koota_explanations", label: "Classical Koota Rules" },
    { id: "ai_advice", label: "AI Relationship Counseling" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-5 border border-amber-900/10 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="px-3 py-0.5 rounded-full bg-rose-100 text-rose-900 text-xs font-bold uppercase tracking-wider">
              Comprehensive Vedic Synastry &amp; Milan
            </span>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
              Relationship &amp; Marriage Compatibility
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Deterministic 36-point Ashta Koota matching, South Indian Dasha Koota, Manglik balance, D1/D9 cross-aspects, and Jaimini Papasamya equilibrium.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 text-rose-300 px-3.5 py-2 rounded-2xl text-xs font-bold shadow-xs">
            <Heart className="w-4 h-4 text-rose-400" />
            <span>Ashta Koota Score: {matchResult.ashtaKootaScore} / 36 ({matchResult.ashtaKootaScore >= 24 ? "Auspicious" : "Moderate"})</span>
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
                    ? "bg-slate-900 text-rose-300 shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. ASHTA KOOTA 36 */}
      {activeSubTab === "ashta_koota_36" && (
        <div className="space-y-6">
          <GunaMilanCalculator />
        </div>
      )}

      {/* 2. DUAL KUNDLIS */}
      {activeSubTab === "both_kundlis" && (
        <div className="space-y-6">
          <BothPartnersKundliView partnerA={partnerA} partnerB={partnerB} />
        </div>
      )}

      {/* 3. NAKSHATRA MATCHING */}
      {activeSubTab === "nakshatra_matching" && (
        <div className="space-y-6">
          <NakshatraCompatibilityView matchResult={matchResult} />
        </div>
      )}

      {/* 3b. SOUTH INDIAN DASHAKOOTA */}
      {activeSubTab === "dashakoota_matching" && (
        <div className="space-y-6">
          <DashakootaExplanations 
            breakdown={matchResult.dashaKootaBreakdown || []} 
            totalScore={matchResult.dashaKootaScore || 0} 
          />
        </div>
      )}

      {/* 4. MANGLIK MATCHING */}
      {activeSubTab === "manglik_matching" && (
        <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="px-3 py-0.5 rounded-full bg-rose-100 text-rose-900 text-xs font-bold uppercase tracking-wider">
                Kuja Dosha Balance Check
              </span>
              <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">
                Comparative Manglik Evaluation
              </h3>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
              {matchResult.doshas.isManglikCanceled ? "Cancelled / Harmonized" : matchResult.doshas.manglikA || matchResult.doshas.manglikB ? "Partial Kuja Impact" : "Compatible Balance (No Discord)"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-slate-900 text-sm">Partner 1 ({partnerA.name})</div>
              <div className="text-slate-600">
                {matchResult.doshas.manglikA ? "Manglik presence balanced through planetary aspects." : "Non-Manglik with peaceful Venus and Jupiter placements."}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-slate-900 text-sm">Partner 2 ({partnerB.name})</div>
              <div className="text-slate-600">
                {matchResult.doshas.manglikB ? "Manglik placements harmonized with partner chart." : "Non-Manglik with strong benefic Venus placement in 10th house."}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. JAIMINI PAPASAMYA */}
      {activeSubTab === "jaimini_papasamya" && (
        <div className="space-y-6">
          <JaiminiPapasamyaView matchResult={matchResult} />
        </div>
      )}

      {/* 6. WESTERN SYNASTRY */}
      {activeSubTab === "western_synastry" && (
        <div className="space-y-6">
          <WesternSynastryView matchResult={matchResult} />
        </div>
      )}

      {/* 7. KOOTA EXPLANATIONS */}
      {activeSubTab === "koota_explanations" && (
        <div className="space-y-6">
          <AshtaKootaExplanations
            breakdown={matchResult.ashtaKootaBreakdown}
            totalScore={matchResult.ashtaKootaScore}
          />
        </div>
      )}

      {/* 8. AI RELATIONSHIP COUNSELING */}
      {activeSubTab === "ai_advice" && (
        <div className="space-y-6">
          <AIRelationshipAdviceSection
            matchResult={matchResult}
            partnerAName={partnerA.name}
            partnerBName={partnerB.name}
          />
        </div>
      )}
    </div>
  );
};
