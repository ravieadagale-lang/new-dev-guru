import React, { useState, useMemo } from "react";
import { UserProfile, LanguageCode, PlanetPosition, HouseDetail } from "../types";
import { AstrologyBirthInputBar } from "../components/astrology/AstrologyBirthInputBar";
import { KundliPdfReportGeneratorModal } from "../components/KundliPdfReportGeneratorModal";
import { calculateLagna, generatePlanetaryPositions } from "../data/astrologyData";
import { VedicWorkspaceView, VedicSection } from "../components/astrology/VedicWorkspaceView";
import { PrashnaWorkspaceView } from "../components/astrology/PrashnaWorkspaceView";
import { KPWorkspaceView } from "../components/astrology/KPWorkspaceView";
import { JaiminiWorkspaceView } from "../components/astrology/JaiminiWorkspaceView";
import { TajikaWorkspaceView } from "../components/astrology/TajikaWorkspaceView";
import { BNNWorkspaceView } from "../components/astrology/BNNWorkspaceView";
import { LalKitabWorkspaceView } from "../components/astrology/LalKitabWorkspaceView";
import { BirthTimeRectification } from "../components/BirthTimeRectification";
import { isInventedDefaultProfile } from "../engine/btr/btrProfileValidation";
import { ErrorBoundary } from "../components/ErrorBoundary";
import {
  Compass,
  ChevronRight,
  Sun,
  HelpCircle,
  Award,
  Sparkles,
  RotateCw,
  BookOpen,
  CheckCircle2,
  Clock,
  Info
} from "lucide-react";

export type AstrologySystemId =
  | "btr"
  | "vedic"
  | "prashna"
  | "kp"
  | "jaimini"
  | "tajika"
  | "bnn"
  | "lalkitab";

interface AstrologyViewProps {
  userProfile?: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  selectedLanguage?: LanguageCode;
  onLanguageChange?: (lang: LanguageCode) => void;
  initialSystem?: AstrologySystemId;
  initialSubSection?: VedicSection;
}

export const AstrologyView: React.FC<AstrologyViewProps> = ({
  userProfile,
  onUpdateProfile,
  selectedLanguage = "en",
  onLanguageChange,
  initialSystem = "vedic",
  initialSubSection = "birth_chart",
}) => {
  // Safe default user profile fallback to prevent any null/undefined crash
  const safeProfile = useMemo((): UserProfile => {
    if (userProfile && userProfile.name) return userProfile;
    return {
      id: userProfile?.id || "usr-001",
      name: userProfile?.name || "Aarav Sharma",
      email: userProfile?.email || "aarav.sharma@example.com",
      role: userProfile?.role || "customer",
      dob: userProfile?.dob || userProfile?.birthDetails?.dateOfBirth || "1995-08-15",
      time: userProfile?.time || userProfile?.birthDetails?.timeOfBirth || "10:30",
      place: userProfile?.place || userProfile?.birthDetails?.placeOfBirth || "New Delhi, India",
      latitude: userProfile?.latitude ?? userProfile?.birthDetails?.latitude ?? 28.6139,
      longitude: userProfile?.longitude ?? userProfile?.birthDetails?.longitude ?? 77.2090,
      timezone: userProfile?.timezone || userProfile?.birthDetails?.timezone || "Asia/Kolkata",
      gender: userProfile?.gender || "male",
      rashi: userProfile?.rashi || "Aries",
      nakshatra: userProfile?.nakshatra || "Ashwini",
      nakshatraPada: userProfile?.nakshatraPada || 1,
      lagna: userProfile?.lagna || "Aries",
      sunSign: userProfile?.sunSign || "Leo",
      walletBalance: userProfile?.walletBalance ?? 500,
      spiritualPoints: userProfile?.spiritualPoints ?? 120,
      referralCode: userProfile?.referralCode || "AARAV108",
      totalReferralsCount: userProfile?.totalReferralsCount ?? 0,
      totalPointsEarned: userProfile?.totalPointsEarned ?? 0,
      birthDetails: {
        dateOfBirth: userProfile?.dob || userProfile?.birthDetails?.dateOfBirth || "1995-08-15",
        timeOfBirth: userProfile?.time || userProfile?.birthDetails?.timeOfBirth || "10:30",
        placeOfBirth: userProfile?.place || userProfile?.birthDetails?.placeOfBirth || "New Delhi, India",
        latitude: userProfile?.latitude ?? userProfile?.birthDetails?.latitude ?? 28.6139,
        longitude: userProfile?.longitude ?? userProfile?.birthDetails?.longitude ?? 77.2090,
        timezone: userProfile?.timezone || userProfile?.birthDetails?.timezone || "Asia/Kolkata",
      }
    };
  }, [userProfile]);

  // Default directly to Vedic Astrology as the primary workspace (no large card selection landing)
  const [selectedSystem, setSelectedSystem] = useState<AstrologySystemId>(initialSystem);
  const [vedicInitialSection, setVedicInitialSection] = useState<VedicSection>(initialSubSection);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [btrSuccessBanner, setBtrSuccessBanner] = useState<string | null>(null);

  // Compute Lagna and Planetary positions deterministically from safe profile
  const calculatedLagna = useMemo(() => {
    return calculateLagna(
      safeProfile.dob,
      safeProfile.time,
      safeProfile.place
    );
  }, [safeProfile.dob, safeProfile.time, safeProfile.place]);

  const { planets, houses } = useMemo(() => {
    return generatePlanetaryPositions(
      safeProfile.dob,
      safeProfile.time,
      safeProfile.place,
      calculatedLagna
    );
  }, [safeProfile.dob, safeProfile.time, safeProfile.place, calculatedLagna]);

  // Derived mathematical structures for specialized engines (KP, Jaimini, Prashna, Tajika)
  const signIndices: Record<string, number> = {
    Aries: 0, Taurus: 1, Gemini: 2, Cancer: 3, Leo: 4, Virgo: 5,
    Libra: 6, Scorpio: 7, Sagittarius: 8, Capricorn: 9, Aquarius: 10, Pisces: 11,
  };

  const planetsMap = useMemo(() => {
    const map: Record<string, { longitude: number; isRetrograde?: boolean; name?: string; dignity?: string }> = {};
    planets.forEach((p) => {
      const signOffset = (signIndices[p.sign] ?? 0) * 30;
      const degInSign = typeof p.degree === "number" ? p.degree : parseFloat(String(p.degree ?? 0)) || 0;
      map[p.name] = {
        longitude: signOffset + degInSign,
        isRetrograde: p.isRetrograde,
        name: p.name,
        dignity: p.dignity,
      };
    });
    return map;
  }, [planets]);

  const ascLongitude = houses[0]?.degreeCusp ?? 0;
  const moonLongitude = planetsMap["Moon"]?.longitude ?? 0;
  const sunLongitude = planetsMap["Sun"]?.longitude ?? 0;
  const cuspsMap = useMemo(() => {
    const map: Record<number, number> = {};
    houses.forEach((h) => {
      map[h.houseNumber] = h.degreeCusp ?? 0;
    });
    return map;
  }, [houses]);

  const birthDateObj = useMemo(() => {
    const dateStr = userProfile?.dob || userProfile?.birthDetails?.dateOfBirth || "1995-08-15";
    const timeStr = userProfile?.time || userProfile?.birthDetails?.timeOfBirth || "10:30";
    return new Date(`${dateStr}T${timeStr}:00Z`);
  }, [userProfile?.dob, userProfile?.time, userProfile?.birthDetails]);

  // Systems directory metadata
  const systemsMeta: Record<
    AstrologySystemId,
    {
      name: string;
      shortLabel: string;
      tradition: string;
      icon: React.ReactNode;
      isSpecial?: boolean;
      description: string;
    }
  > = {
    btr: {
      name: "Birth Time Rectification (BTR)",
      shortLabel: "BTR",
      tradition: "Deterministic Shastric Event Calibration",
      icon: <Clock className="w-3.5 h-3.5" />,
      isSpecial: true,
      description: "Find the strongest evidence-supported birth-time window from your life history using Parashari, KP, and Jaimini methodologies.",
    },
    vedic: {
      name: "Vedic Astrology / Parashari",
      shortLabel: "Vedic",
      tradition: "Brihat Parashara Hora Shastra Core",
      icon: <Sun className="w-3.5 h-3.5" />,
      description: "Classical D1 Rashi, 16 Shodashavargas (D1–D60), Vimshottari dasha hierarchy, Shadbala, Ashtakavarga SAV 337, and 1,001+ yogas.",
    },
    prashna: {
      name: "Prashna Kundali",
      shortLabel: "Prashna",
      tradition: "Prashna Marga & Shatpanchasika Standard",
      icon: <HelpCircle className="w-3.5 h-3.5" />,
      description: "Horary chart casting, radicality checks, KP ruling planets, question category analysis, and exact event fulfillment windows.",
    },
    kp: {
      name: "KP Astrology",
      shortLabel: "KP",
      tradition: "Krishnamurti Paddhati (249 Sub-Divisions)",
      icon: <Award className="w-3.5 h-3.5" />,
      description: "Placidus cuspal sub-lords, 4-tier ABCD significators, 4-step theory chain verification, and ruling planets timing engine.",
    },
    jaimini: {
      name: "Jaimini Astrology",
      shortLabel: "Jaimini",
      tradition: "Upadesha Sutras of Maharshi Jaimini",
      icon: <Sparkles className="w-3.5 h-3.5" />,
      description: "Chara Karakas (7 vs 8), 12 Arudha Padas, Upapada matrimonial longevity, Karakamsa soul analysis, and K.N. Rao Chara Dasha.",
    },
    tajika: {
      name: "Tajika / Varshaphala",
      shortLabel: "Tajika",
      tradition: "Neelakanthi Shastric Solar Return",
      icon: <RotateCw className="w-3.5 h-3.5" />,
      description: "Exact mathematical solar return instant, Varshapathi year lord, Muntha, 16 Tajika yogas, Mudda dasha, and 20+ Sahams.",
    },
    bnn: {
      name: "Bhrigu Nandi Nadi (BNN)",
      shortLabel: "BNN",
      tradition: "Nadi Karma & Directional Trines",
      icon: <Compass className="w-3.5 h-3.5" />,
      description: "1-5-9 East, 2-6-10 South, 3-7-11 West, 4-8-12 North directional trines, Jivakaraka/Karmakaraka sequences, and double transits.",
    },
    lalkitab: {
      name: "Classical Lal Kitab",
      shortLabel: "Lal Kitab",
      tradition: "Pt. Roop Chand Joshi Shastric 1939-1952",
      icon: <BookOpen className="w-3.5 h-3.5" />,
      description: "12 Permanent Pakka houses, Nek vs Manda effects, 7 ancestral karmic debts (Rin), authentic upayas, and 40-day ritual vidhi.",
    },
  };

  // The 8 Approved Astrology Tabs: BTR ONLY immediately before Vedic!
  const systemTabs: AstrologySystemId[] = [
    "btr",
    "vedic",
    "prashna",
    "kp",
    "jaimini",
    "tajika",
    "bnn",
    "lalkitab",
  ];

  // BTR Application Workflow Handler
  const handleApplyBtrTime = (rectifiedTime: string, metadata?: any) => {
    const origTime = metadata?.originalRecordedTime || safeProfile.time || "10:30";
    const updatedProfile: UserProfile = {
      ...safeProfile,
      time: rectifiedTime,
      btrMetadata: {
        originalRecordedTime: origTime,
        rectifiedTime,
        supportedWindowStart: metadata?.supportedWindowStart,
        supportedWindowEnd: metadata?.supportedWindowEnd,
        evidenceStatus: metadata?.evidenceStatus,
        rectifiedAt: metadata?.rectifiedAt || new Date().toISOString(),
      },
      birthDetails: {
        ...(safeProfile.birthDetails || {}),
        timeOfBirth: rectifiedTime,
        dateOfBirth: safeProfile.dob || "1995-08-15",
        placeOfBirth: safeProfile.place || "New Delhi, India",
        isRectified: true,
        originalRecordedTime: origTime,
      },
    };
    onUpdateProfile(updatedProfile);
    setBtrSuccessBanner(`Birth time rectified to ${rectifiedTime} IST (Previous recorded: ${origTime} IST) and saved in your profile! Click 'GENERATE / RECALCULATE' above to refresh all charts.`);
    setSelectedSystem("vedic");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ErrorBoundary fallbackTitle="Astrology Calculations & System Workspace">
      <div className="space-y-6 pb-16">
        {/* 1. TOP OF ASTROLOGY WORKSPACE: BIRTH DETAILS AREA & GENERATE WORKFLOW */}
        <AstrologyBirthInputBar
          userProfile={safeProfile}
          onUpdateProfile={onUpdateProfile}
          calculatedLagna={calculatedLagna}
        />

        {/* Dismissible BTR Rectification Success Banner */}
        {btrSuccessBanner && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-5 py-3.5 rounded-2xl flex items-center justify-between gap-3 text-xs font-semibold shadow-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{btrSuccessBanner}</span>
            </div>
            <button
              onClick={() => setBtrSuccessBanner(null)}
              className="text-emerald-700 hover:text-emerald-950 font-bold px-2 py-1 rounded-md hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* 2. ASTROLOGY SYSTEM NAVIGATION BAR / TAB MENU */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2.5 px-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                Astrology Systems
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold">
                8 Isolated Methodologies + BTR
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Deterministic Shastric Core Active
            </div>
          </div>

          {/* The Tabs: [ ✦ BTR · RECTIFY ] [ VEDIC ] [ PRASHNA ] [ KP ] [ JAIMINI ] [ TAJIKA ] [ BNN ] [ LAL KITAB ] */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar">
            {systemTabs.map((sysId) => {
              const meta = systemsMeta[sysId];
              const isActive = selectedSystem === sysId;

              // BTR Special Entry with Refined Slow Pulse Attention Treatment
              if (sysId === "btr") {
                return (
                  <button
                    key={sysId}
                    onClick={() => {
                      setSelectedSystem(sysId);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`relative group px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 border ${
                      isActive
                        ? "bg-slate-950 text-amber-300 border-amber-400 ring-2 ring-amber-400/40 shadow-xs"
                        : "bg-amber-50 hover:bg-amber-100 text-amber-950 border-amber-300/90 shadow-xs [animation:pulse_2.2s_cubic-bezier(0.4,0,0.6,1)_infinite]"
                    }`}
                    title="Birth Time Rectification (BTR) — Evidence-Based Rectifier"
                  >
                    <Clock className={`w-3.5 h-3.5 ${isActive ? "text-amber-300" : "text-amber-700"}`} />
                    <span>✦ BTR · RECTIFY</span>
                  </button>
                );
              }

              // Standard System Tabs (Vedic, Prashna, KP, Jaimini, Tajika, BNN, Lal Kitab)
              return (
                <button
                  key={sysId}
                  onClick={() => {
                    setSelectedSystem(sysId);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                    isActive
                      ? "bg-slate-900 text-amber-300 border-slate-900 shadow-xs ring-1 ring-slate-900"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80 hover:border-amber-300"
                  }`}
                >
                  <span className={isActive ? "text-amber-300" : "text-amber-600"}>
                    {meta.icon}
                  </span>
                  <span>{meta.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. ACTIVE SYSTEM STATUS BANNER */}
        <div className="bg-white px-5 py-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl ${
                selectedSystem === "btr"
                  ? "bg-amber-400/20 text-amber-900 ring-1 ring-amber-400"
                  : "bg-slate-900 text-amber-300"
              }`}
            >
              {systemsMeta[selectedSystem].icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  {selectedSystem === "btr" ? "Special Entry" : "Active Astrology System"}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-amber-100 text-amber-900 border border-amber-200">
                  {systemsMeta[selectedSystem].tradition}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                You are currently inside {systemsMeta[selectedSystem].name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                {systemsMeta[selectedSystem].description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
              Calculated Lagna: <strong className="text-slate-900">{calculatedLagna}</strong>
            </span>
          </div>
        </div>

        {/* 4. METHODOLOGY WORKSPACE & SYSTEM-SPECIFIC SECONDARY NAVIGATION */}
        {selectedSystem === "btr" ? (
          /* SPECIAL ENTRY: BIRTH TIME RECTIFICATION (BTR) */
          <div className="space-y-4">
            {(() => {
              const isUserGenuine = Boolean(userProfile && !isInventedDefaultProfile(userProfile));
              const btrProfile = isUserGenuine ? userProfile : undefined;
              return (
                <BirthTimeRectification
                  currentDob={btrProfile?.dob}
                  currentTime={btrProfile?.time}
                  userProfile={btrProfile}
                  onApplyRectifiedTime={handleApplyBtrTime}
                />
              );
            })()}
          </div>
        ) : selectedSystem === "vedic" ? (
          /* 1. VEDIC ASTROLOGY / PARASHARI WORKSPACE */
          <VedicWorkspaceView
            userProfile={safeProfile}
            planets={planets}
            houses={houses}
            lagnaSign={calculatedLagna}
            onOpenPdfModal={() => setIsPdfModalOpen(true)}
            initialSection={vedicInitialSection}
          />
        ) : selectedSystem === "prashna" ? (
          /* 2. PRASHNA KUNDALI WORKSPACE */
          <PrashnaWorkspaceView
            userProfile={safeProfile}
            initialAscendantLongitude={ascLongitude}
            planets={planetsMap}
          />
        ) : selectedSystem === "kp" ? (
          /* 3. KP ASTROLOGY WORKSPACE */
          <KPWorkspaceView
            planets={planetsMap}
            ascendantLongitude={ascLongitude}
            moonLongitude={moonLongitude}
            cuspLongitudes={cuspsMap}
            birthDate={birthDateObj}
          />
        ) : selectedSystem === "jaimini" ? (
          /* 4. JAIMINI ASTROLOGY WORKSPACE */
          <JaiminiWorkspaceView
            planets={planetsMap}
            ascendantLongitude={ascLongitude}
            moonLongitude={moonLongitude}
            birthDate={birthDateObj}
            natalPlanetsList={planets}
            natalHousesList={houses}
            lagnaSign={calculatedLagna}
          />
        ) : selectedSystem === "tajika" ? (
          /* 5. TAJIKA / VARSHAPHALA WORKSPACE */
          <TajikaWorkspaceView
            birthDate={birthDateObj}
            natalSunLongitudeDeg={sunLongitude}
            natalAscendantLongitudeDeg={ascLongitude}
          />
        ) : selectedSystem === "bnn" ? (
          /* 6. BHRIGU NANDI NADI (BNN) WORKSPACE */
          <BNNWorkspaceView
            userProfile={safeProfile}
            planets={planets}
            houses={houses}
            lagnaSign={calculatedLagna}
          />
        ) : selectedSystem === "lalkitab" ? (
          /* 7. CLASSICAL LAL KITAB WORKSPACE */
          <LalKitabWorkspaceView
            userProfile={safeProfile}
            planets={planets}
            houses={houses}
            lagnaSign={calculatedLagna}
          />
        ) : null}

        {/* Kundli PDF Report Generator Modal */}
        {isPdfModalOpen && (
          <KundliPdfReportGeneratorModal
            isOpen={isPdfModalOpen}
            onClose={() => setIsPdfModalOpen(false)}
            userProfile={safeProfile}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default AstrologyView;

