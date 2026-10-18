import React, { useState } from "react";
import { UserProfile, PlanetPosition, HouseDetail } from "../../types";
import { 
  Layers, 
  Sparkles, 
  Activity, 
  Compass, 
  Sliders, 
  RotateCcw, 
  Award, 
  Table, 
  Clock, 
  HelpCircle,
  Eye,
  FileCode2,
  ShieldCheck,
  Sun
} from "lucide-react";
import { playCardHoverSound, playCardFlipSound } from "../../utils/audioEffects";
import { AshtakavargaMatrix } from "../AshtakavargaMatrix";
import { ShadbalaDashaEngine } from "../ShadbalaDashaEngine";
import { BirthTimeRectification } from "../BirthTimeRectification";
import { AyanamshaSwitcherWidget } from "../AyanamshaSwitcherWidget";
import { MasterVedicDossierViewer } from "../MasterVedicDossierViewer";
import { JaiminiWorkspaceView } from "./JaiminiWorkspaceView";
import { KPWorkspaceView } from "./KPWorkspaceView";
import { CrossValidationWorkspaceView } from "./CrossValidationWorkspaceView";
import { TajikaWorkspaceView } from "./TajikaWorkspaceView";
import { PrashnaWorkspaceView } from "./PrashnaWorkspaceView";
import { EventTimingWorkspaceView } from "./EventTimingWorkspaceView";
import { Phase7AuditWorkspaceView } from "./Phase7AuditWorkspaceView";

interface AdvancedAstrologyWorkspaceProps {
  userProfile?: UserProfile;
  planets: PlanetPosition[];
  houses: HouseDetail[];
  lagnaSign: string;
}

export type AdvancedSubTab = 
  | "jaimini_sutras"
  | "kp_system"
  | "varshaphala_tajika"
  | "prashna_horary"
  | "event_timing"
  | "cross_validation"
  | "shadbala_bhavabala"
  | "ashtakavarga_337"
  | "phase7_audit"
  | "btr_rectification"
  | "ayanamsha_comparison"
  | "master_dossier";

export const AdvancedAstrologyWorkspace: React.FC<AdvancedAstrologyWorkspaceProps> = ({
  userProfile,
  planets,
  houses,
  lagnaSign
}) => {
  const [activeSubTab, setActiveSubTab] = useState<AdvancedSubTab>("varshaphala_tajika");

  const subTabs: { id: AdvancedSubTab; label: string }[] = [
    { id: "varshaphala_tajika", label: "Tajika Varshaphala (Phase 7.1)" },
    { id: "prashna_horary", label: "Prashna Horary Engine (Phase 7.1)" },
    { id: "event_timing", label: "Event Timing Confluence (Phase 7.1)" },
    { id: "jaimini_sutras", label: "Advanced Jaimini Sutras" },
    { id: "kp_system", label: "KP System & 4-Step" },
    { id: "cross_validation", label: "Multi-System Consensus" },
    { id: "shadbala_bhavabala", label: "Shadbala & Bhava Bala" },
    { id: "ashtakavarga_337", label: "Ashtakavarga (BAV/SAV 337)" },
    { id: "phase7_audit", label: "Phase 7.1 Verification Suite" },
    { id: "btr_rectification", label: "Birth Time Rectification" },
    { id: "ayanamsha_comparison", label: "Ayanamsha Comparison" },
    { id: "master_dossier", label: "Master Vedic Dossier" },
  ];

  // Map planets array to planet record for deterministic engines
  const planetsMap: Record<string, { longitude: number; isRetrograde?: boolean; name?: string; dignity?: string }> = {};
  const signIndices: Record<string, number> = {
    Aries: 0, Taurus: 1, Gemini: 2, Cancer: 3, Leo: 4, Virgo: 5,
    Libra: 6, Scorpio: 7, Sagittarius: 8, Capricorn: 9, Aquarius: 10, Pisces: 11,
  };

  planets.forEach((p) => {
    const signOffset = (signIndices[p.sign] ?? 0) * 30;
    const degInSign = p.degree ?? 0;
    planetsMap[p.name] = {
      longitude: signOffset + degInSign,
      isRetrograde: p.isRetrograde,
      name: p.name,
      dignity: p.dignity,
    };
  });

  const ascLongitude = houses[0]?.degreeCusp ?? 0;
  const moonLongitude = planetsMap["Moon"]?.longitude ?? 0;
  const sunLongitude = planetsMap["Sun"]?.longitude ?? 0;
  const cuspsMap: Record<number, number> = {};
  houses.forEach((h) => {
    cuspsMap[h.houseNumber] = h.degreeCusp ?? 0;
  });

  const birthDate = userProfile?.dob ? new Date(userProfile.dob) : new Date("1995-08-15T10:30:00Z");

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-5 border border-amber-900/10 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="px-3 py-0.5 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider">
              Professional Astrologer Suite
            </span>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
              Advanced Vedic Systems &amp; Computational Analytics
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Deep-tier technical computations: Tajika Varshaphala (16 Yogas &amp; 25+ Sahams), Prashna Horary reference framework, Event Timing confluence windows, 6-fold Shadbala potencies, KP Cuspal Sub-Lords, and Jaimini Sutras.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 text-purple-300 px-3.5 py-2 rounded-2xl text-xs font-bold shadow-xs">
            <Layers className="w-4 h-4 text-purple-400" />
            <span>Phase 7.1 Verified Classical Engines</span>
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
                    ? "bg-slate-900 text-purple-300 shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. TAJIKA / VARSHAPHALA (PHASE 7.1) */}
      {activeSubTab === "varshaphala_tajika" && (
        <div className="space-y-6">
          <TajikaWorkspaceView
            birthDate={birthDate}
            natalSunLongitudeDeg={sunLongitude || 148.452}
            natalAscendantLongitudeDeg={ascLongitude || 14.28}
            latitude={userProfile?.latitude || 28.6139}
            longitude={userProfile?.longitude || 77.2090}
            timezoneOffsetHours={5.5}
          />
        </div>
      )}

      {/* 2. PRASHNA HORARY (PHASE 7.1) */}
      {activeSubTab === "prashna_horary" && (
        <div className="space-y-6">
          <PrashnaWorkspaceView
            initialAscendantLongitude={ascLongitude || 45.0}
            planets={planetsMap}
          />
        </div>
      )}

      {/* 3. EVENT TIMING CONFLUENCE (PHASE 7.1) */}
      {activeSubTab === "event_timing" && (
        <div className="space-y-6">
          <EventTimingWorkspaceView
            natalAscendantLongitude={ascLongitude || 45.0}
            planets={planetsMap}
          />
        </div>
      )}

      {/* 4. ADVANCED JAIMINI SUTRAS */}
      {activeSubTab === "jaimini_sutras" && (
        <div className="space-y-6">
          <JaiminiWorkspaceView
            planets={planetsMap}
            ascendantLongitude={ascLongitude}
            moonLongitude={moonLongitude}
            birthDate={birthDate}
          />
        </div>
      )}

      {/* 5. KP SYSTEM */}
      {activeSubTab === "kp_system" && (
        <div className="space-y-6">
          <KPWorkspaceView
            planets={planetsMap}
            ascendantLongitude={ascLongitude}
            moonLongitude={moonLongitude}
            cuspLongitudes={cuspsMap}
            birthDate={birthDate}
          />
        </div>
      )}

      {/* 6. MULTI-SYSTEM CONSENSUS & CROSS-VALIDATION */}
      {activeSubTab === "cross_validation" && (
        <div className="space-y-6">
          <CrossValidationWorkspaceView
            planets={planetsMap}
            ascendantLongitude={ascLongitude}
            moonLongitude={moonLongitude}
            cuspLongitudes={cuspsMap}
            birthDate={birthDate}
          />
        </div>
      )}

      {/* 7. PHASE 7.1 AUDIT SUITE */}
      {activeSubTab === "phase7_audit" && (
        <div className="space-y-6">
          <Phase7AuditWorkspaceView />
        </div>
      )}

      {/* 8. SHADBALA & BHAVA BALA */}
      {activeSubTab === "shadbala_bhavabala" && (
        <div className="space-y-6">
          <ShadbalaDashaEngine
            lagna={lagnaSign}
            rashi={userProfile?.rashi}
            nakshatra={userProfile?.nakshatra}
            dob={userProfile?.dob}
            userName={userProfile?.name}
          />
        </div>
      )}

      {/* 9. ASHTAKAVARGA 337 */}
      {activeSubTab === "ashtakavarga_337" && (
        <div className="space-y-6">
          <AshtakavargaMatrix
            lagna={lagnaSign}
            rashi={userProfile?.rashi}
            userName={userProfile?.name}
          />
        </div>
      )}

      {/* 10. BIRTH TIME RECTIFICATION */}
      {activeSubTab === "btr_rectification" && (
        <div className="space-y-6">
          <BirthTimeRectification />
        </div>
      )}

      {/* 11. AYANAMSHA COMPARISON */}
      {activeSubTab === "ayanamsha_comparison" && (
        <div className="space-y-6">
          <AyanamshaSwitcherWidget />
        </div>
      )}

      {/* 12. MASTER VEDIC DOSSIER */}
      {activeSubTab === "master_dossier" && (
        <div className="space-y-6">
          <MasterVedicDossierViewer
            userProfile={userProfile}
          />
        </div>
      )}
    </div>
  );
};
