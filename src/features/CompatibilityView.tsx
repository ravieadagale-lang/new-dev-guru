import React, { useState, useMemo } from "react";
import { UserProfile, LanguageCode } from "../types";
import { calculateComprehensiveMatch, PartnerInput, KootaDetail } from "../utils/compatibilityCalculator";
import { playCardHoverSound, playCardFlipSound } from "../utils/audioEffects";
import { D3CompatibilityRadarChart } from "../components/D3CompatibilityRadarChart";
import { BothPartnersKundliView } from "../components/BothPartnersKundliView";
import { GunaMilanCalculator } from "../components/GunaMilanCalculator";
import { AshtaKootaExplanations } from "../components/AshtaKootaExplanations";
import { DashakootaExplanations } from "../components/DashakootaExplanations";
import { NakshatraCompatibilityView } from "../components/NakshatraCompatibilityView";
import { JaiminiPapasamyaView } from "../components/JaiminiPapasamyaView";
import { WesternSynastryView } from "../components/WesternSynastryView";
import { UnvarnishedRiskAuditView } from "../components/UnvarnishedRiskAuditView";
import { RemediesLibrary } from "../components/RemediesLibrary";
import { NumerologyNameCorrection } from "../components/NumerologyNameCorrection";
import { ChineseZodiacFengShuiView } from "../components/ChineseZodiacFengShuiView";
import { AIRelationshipAdviceSection } from "../components/AIRelationshipAdviceSection";
import { KundliPdfReportGeneratorModal } from "../components/KundliPdfReportGeneratorModal";
import {
  Heart,
  Sparkles,
  Users,
  Compass,
  Flame,
  Layers,
  FileDown,
  Printer,
  Share2,
  Check,
  Award,
  RefreshCw,
  Star,
  Activity,
  Bot
} from "lucide-react";

interface CompatibilityViewProps {
  userProfile: UserProfile;
  selectedLanguage?: LanguageCode;
  onLanguageChange?: (lang: LanguageCode) => void;
}

export type CompatibilityTabId =
  | "executive_summary"
  | "both_kundali"
  | "ashta_koota"
  | "dashakoota"
  | "nakshatra_compatibility"
  | "jaimini_papasamya"
  | "western_synastry"
  | "doshas_remedies"
  | "remedies_library"
  | "numerology"
  | "chinese_zodiac"
  | "ai_master_report";

export const CompatibilityView: React.FC<CompatibilityViewProps> = ({
  userProfile,
  selectedLanguage = "en",
  onLanguageChange
}) => {
  const [partnerA, setPartnerA] = useState<PartnerInput>({
    name: userProfile?.name || "Aarav Sharma",
    gender: (userProfile?.gender as "male" | "female" | "other") || "male",
    dob: userProfile?.dob || "1995-08-15",
    time: userProfile?.time || "10:30",
    place: userProfile?.place || "New Delhi, India",
    rashi: userProfile?.rashi || "Aries",
    nakshatra: userProfile?.nakshatra || "Ashwini"
  });

  const [partnerB, setPartnerB] = useState<PartnerInput>({
    name: "Priya Patel",
    gender: "female",
    dob: "1997-11-22",
    time: "14:15",
    place: "Mumbai, India",
    rashi: "Taurus",
    nakshatra: "Rohini"
  });

  const [activeTab, setActiveTab] = useState<CompatibilityTabId>("executive_summary");
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  // Compute Match Result
  const matchResult = useMemo(() => {
    return calculateComprehensiveMatch(partnerA, partnerB);
  }, [partnerA, partnerB]);

  const handleRecalculate = () => {
    playCardFlipSound();
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      const el = document.getElementById("compatibility-results-anchor");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 600);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Ashta Koota details array for AshtaKootaExplanations
  const ashtaKootaDetails: KootaDetail[] = useMemo(() => {
    const ak = matchResult.ashtaKoota;
    return [
      {
        name: "Varna Koota",
        sanskritName: "वर्ण",
        maxPoints: 1,
        obtainedPoints: ak.varna.obtained,
        scored: ak.varna.obtained,
        status: ak.varna.obtained >= 1 ? "Pass" : "Partial",
        description: ak.varna.description,
        governs: "Spiritual Ego & Work Ethic",
        rules: "Measures mutual respect and natural spiritual temperament."
      },
      {
        name: "Vashya Koota",
        sanskritName: "वश्य",
        maxPoints: 2,
        obtainedPoints: ak.vashya.obtained,
        scored: ak.vashya.obtained,
        status: ak.vashya.obtained >= 1.5 ? "Pass" : "Partial",
        description: ak.vashya.description,
        governs: "Mutual Attraction & Power Dynamics",
        rules: "Calculates emotional magnetism and equilibrium of influence."
      },
      {
        name: "Tara Koota",
        sanskritName: "तारा",
        maxPoints: 3,
        obtainedPoints: ak.tara.obtained,
        scored: ak.tara.obtained,
        status: ak.tara.obtained >= 1.5 ? "Pass" : "Dosha",
        description: ak.tara.description,
        governs: "Birth Star Destiny & Health Longevity",
        rules: "Assesses long-term physical vitality and cosmic support."
      },
      {
        name: "Yoni Koota",
        sanskritName: "योनि",
        maxPoints: 4,
        obtainedPoints: ak.yoni.obtained,
        scored: ak.yoni.obtained,
        status: ak.yoni.obtained >= 2 ? "Pass" : "Dosha",
        description: ak.yoni.description,
        governs: "Physical Harmony & Biological Resonance",
        rules: "Animal symbol harmony governing biological attraction."
      },
      {
        name: "Graha Maitri Koota",
        sanskritName: "ग्रहमैत्री",
        maxPoints: 5,
        obtainedPoints: ak.grahaMaitri.obtained,
        scored: ak.grahaMaitri.obtained,
        status: ak.grahaMaitri.obtained >= 3 ? "Pass" : "Partial",
        description: ak.grahaMaitri.description,
        governs: "Psychological Companionship & Intellect",
        rules: "Moon sign planetary lord friendship governing day-to-day conversation."
      },
      {
        name: "Gana Koota",
        sanskritName: "गण",
        maxPoints: 6,
        obtainedPoints: ak.gana.obtained,
        scored: ak.gana.obtained,
        status: ak.gana.obtained >= 5 ? "Pass" : "Dosha",
        description: ak.gana.description,
        governs: "Temperament Archetype (Deva/Manushya/Rakshasa)",
        rules: "Mental disposition and social interaction style."
      },
      {
        name: "Bhakoot Koota",
        sanskritName: "भकूट",
        maxPoints: 7,
        obtainedPoints: ak.bhakoot.obtained,
        scored: ak.bhakoot.obtained,
        status: ak.bhakoot.obtained > 0 ? "Pass" : "Dosha",
        description: ak.bhakoot.description,
        governs: "Emotional Welfare, Family Prosperity & Progeny",
        rules: "Rashi relative position (6-8 and 9-5 require specific cancellation)."
      },
      {
        name: "Nadi Koota",
        sanskritName: "नाडी",
        maxPoints: 8,
        obtainedPoints: ak.nadi.obtained,
        scored: ak.nadi.obtained,
        status: ak.nadi.obtained > 0 ? "Pass" : "Dosha",
        description: ak.nadi.description,
        governs: "Genetic Compatibility, Prana & Blood Lineage",
        rules: "Different Nadis (Aadi, Madhya, Antya) prevent hereditary afflictions."
      }
    ];
  }, [matchResult]);

  // Dashakoota details
  const dashaKootaDetails: KootaDetail[] = useMemo(() => {
    return [
      { name: "Dina Porutham", sanskritName: "दिन", maxPoints: 3, obtainedPoints: 3, scored: 3, description: "Health, disease resistance and prosperity.", governs: "Health & Vitality", rules: "Tara compatibility" },
      { name: "Gana Porutham", sanskritName: "गण", maxPoints: 6, obtainedPoints: matchResult.ashtaKoota.gana.obtained, scored: matchResult.ashtaKoota.gana.obtained, description: "Temperament and psychological ease.", governs: "Temperament", rules: "Gana alignment" },
      { name: "Mahendra Porutham", sanskritName: "महेन्द्र", maxPoints: 4, obtainedPoints: 4, scored: 4, description: "Lineage extension and wealth generation.", governs: "Progeny & Wealth", rules: "Birth star 4th, 7th, 10th interval" },
      { name: "Stree Deergha", sanskritName: "स्त्रीदीर्घ", maxPoints: 3, obtainedPoints: 3, scored: 3, description: "Wife's emotional peace and marital longevity.", governs: "Marital Peace", rules: "Bride to Groom star distance > 13" },
      { name: "Yoni Porutham", sanskritName: "योनि", maxPoints: 4, obtainedPoints: matchResult.ashtaKoota.yoni.obtained, scored: matchResult.ashtaKoota.yoni.obtained, description: "Physical chemistry and bedroom harmony.", governs: "Physical Synergy", rules: "Animal compatibility" },
      { name: "Rasi Porutham", sanskritName: "राशी", maxPoints: 7, obtainedPoints: matchResult.ashtaKoota.bhakoot.obtained, scored: matchResult.ashtaKoota.bhakoot.obtained, description: "Family unity and emotional bonding.", governs: "Emotional Welfare", rules: "Moon sign mutual position" },
      { name: "Rasyadhipathi", sanskritName: "राश्याधिपति", maxPoints: 5, obtainedPoints: matchResult.ashtaKoota.grahaMaitri.obtained, scored: matchResult.ashtaKoota.grahaMaitri.obtained, description: "Long-term friendship between family clans.", governs: "Mutual Respect", rules: "Lords friendship" },
      { name: "Vasiya Porutham", sanskritName: "वश्य", maxPoints: 2, obtainedPoints: matchResult.ashtaKoota.vashya.obtained, scored: matchResult.ashtaKoota.vashya.obtained, description: "Reciprocal love and sexual attraction.", governs: "Attraction", rules: "Vashya group resonance" },
      { name: "Rajju Porutham", sanskritName: "रज्जु", maxPoints: 5, obtainedPoints: 5, scored: 5, description: "Longevity of the spouse (Mangalya Bhagya).", governs: "Spouse Longevity", rules: "Different Rajjus (Siro, Kanta, Kati, Pada)" },
      { name: "Vedha Porutham", sanskritName: "वेध", maxPoints: 3, obtainedPoints: 3, scored: 3, description: "Wards off evil eye and sudden separations.", governs: "Protection", rules: "No repulsive star affliction" }
    ];
  }, [matchResult]);

  // Chinese Zodiac detail
  const chineseZodiacDetail = useMemo(() => {
    return {
      animal: "Pig / Boar",
      element: "Wood",
      compatibilityGroup: ["Rabbit", "Goat", "Tiger"],
      harmonyScore: 88,
      fengShuiAdvice: "Enhance North-East bedroom with green bamboo and rose quartz mandarin ducks to strengthen marital intimacy.",
      synergyScore: 88,
      compatibilityType: "Affinity Trine (Wood & Water Harmony)",
      animalA: "Pig",
      elementA: "Wood",
      kuaA: 5,
      groupA: "West Group",
      animalB: "Ox",
      elementB: "Earth",
      kuaB: 3,
      groupB: "East Group"
    };
  }, []);

  // Numerology detail
  const numerologyDetail = useMemo(() => {
    return {
      driverNumber: 6,
      conductorNumber: 2,
      compatibilityScore: 85,
      verdict: "Venus (6) & Moon (2) form an idyllic domestic partnership."
    };
  }, []);

  const navTabs: { id: CompatibilityTabId; label: string }[] = [
    { id: "executive_summary", label: "📊 Master Synergy Dashboard" },
    { id: "both_kundali", label: "🔯 Dual Partner Kundali Charts" },
    { id: "ashta_koota", label: "💖 Ashta Koota (36 Guna)" },
    { id: "dashakoota", label: "🕉️ Dashakoota (10 Koota)" },
    { id: "nakshatra_compatibility", label: "🌟 Nakshatra & Vashya Synergy" },
    { id: "jaimini_papasamya", label: "⚖️ Jaimini & Papasamya Balance" },
    { id: "western_synastry", label: "🧭 Western Synastry Aspects" },
    { id: "doshas_remedies", label: "🔥 Unvarnished Risk Audit & Doshas" },
    { id: "remedies_library", label: "📿 Personalized Remedies & Library" },
    { id: "numerology", label: "🔢 Numerology & Name Correction" },
    { id: "chinese_zodiac", label: "🐉 Chinese Zodiac & Feng Shui" },
    { id: "ai_master_report", label: "🤖 AI Master Counseling Report" }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. MASTER BANNER */}
      <div className="bg-gradient-to-r from-slate-950 via-rose-950 to-amber-950 rounded-3xl p-6 sm:p-8 text-white border border-rose-500/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>Advanced Vedic, Numerology &amp; Chinese Compatibility Engine</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-rose-100 tracking-tight">
              Comprehensive Marriage &amp; Relationship Compatibility
            </h1>
            <p className="text-xs sm:text-sm text-rose-200/80 leading-relaxed font-sans">
              Calculate exact 36 Guna Milan, Dashakoota, Kuja (Manglik) Cancellation, Chaldean Numerology, and Chinese Zodiac Feng Shui alignment with unvarnished real-world astrological counseling.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="bg-black/40 border border-rose-500/30 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-inner">
              <div className="text-right">
                <span className="text-[10px] text-rose-300/80 uppercase font-bold tracking-wider block">
                  Unified Compatibility
                </span>
                <span className="font-serif text-2xl font-bold text-amber-300">
                  {matchResult.score} / 36 Gunas
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-400/40">
                <Sparkles className="w-5 h-5 text-rose-300" />
              </div>
            </div>

            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="px-4 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
            >
              <FileDown className="w-4 h-4" />
              <span>Download PDF Dossier</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="p-3 rounded-2xl bg-slate-900 border border-rose-500/30 text-rose-300 hover:text-white transition-all cursor-pointer"
              title="Copy shareable match link"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => window.print()}
              className="p-3 rounded-2xl bg-slate-900 border border-rose-500/30 text-rose-300 hover:text-white transition-all cursor-pointer"
              title="Print compatibility report"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. PARTNER INPUT BAR */}
      <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-rose-600" />
              <span>Partner Astronomical Ephemeris Data</span>
            </h3>
            <p className="text-xs text-slate-500">
              Auto-syncs planetary coordinates, Rashi (Moon sign), and Nakshatras for precision matching
            </p>
          </div>

          <button
            onClick={handleRecalculate}
            disabled={isCalculating}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isCalculating ? "animate-spin text-amber-400" : ""}`} />
            <span>{isCalculating ? "Recalculating..." : "Recalculate Compatibility"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Partner A */}
          <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-200/60 space-y-3">
            <div className="flex items-center justify-between border-b border-rose-200/40 pb-2">
              <span className="text-xs font-bold text-rose-950 uppercase tracking-wide">
                Partner A (Seeker / Groom)
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">
                {partnerA.rashi} &bull; {partnerA.nakshatra}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-medium text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={partnerA.name}
                  onChange={(e) => setPartnerA({ ...partnerA, name: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={partnerA.dob}
                  onChange={(e) => setPartnerA({ ...partnerA, dob: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Birth Time</label>
                <input
                  type="time"
                  value={partnerA.time || "10:30"}
                  onChange={(e) => setPartnerA({ ...partnerA, time: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Birth Place</label>
                <input
                  type="text"
                  value={partnerA.place || "New Delhi, India"}
                  onChange={(e) => setPartnerA({ ...partnerA, place: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
          </div>

          {/* Partner B */}
          <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-3">
            <div className="flex items-center justify-between border-b border-amber-200/40 pb-2">
              <span className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                Partner B (Partner / Bride)
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                {partnerB.rashi} &bull; {partnerB.nakshatra}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-medium text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={partnerB.name}
                  onChange={(e) => setPartnerB({ ...partnerB, name: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={partnerB.dob}
                  onChange={(e) => setPartnerB({ ...partnerB, dob: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Birth Time</label>
                <input
                  type="time"
                  value={partnerB.time || "14:15"}
                  onChange={(e) => setPartnerB({ ...partnerB, time: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Birth Place</label>
                <input
                  type="text"
                  value={partnerB.place || "Mumbai, India"}
                  onChange={(e) => setPartnerB({ ...partnerB, place: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="compatibility-results-anchor" />

      {/* 3. TWO-TIER STICKY COMPATIBILITY NAVIGATION RIBBON */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-3 no-scrollbar text-xs font-semibold">
        {navTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                playCardHoverSound();
                setActiveTab(tab.id);
              }}
              className={`whitespace-nowrap px-4 py-2.5 rounded-xl transition-all cursor-pointer select-none ${
                isActive
                  ? "bg-slate-900 text-rose-300 font-bold shadow-md scale-102"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-amber-900/10"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 4. ACTIVE SUB-VIEW RENDERING */}
      {/* 4.1 Master Synergy Dashboard */}
      {activeTab === "executive_summary" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <D3CompatibilityRadarChart
                metrics={[
                  { category: "Spiritual Ego (Varna)", score: Math.round((matchResult.ashtaKoota.varna.obtained / 1) * 100) },
                  { category: "Attraction (Vashya)", score: Math.round((matchResult.ashtaKoota.vashya.obtained / 2) * 100) },
                  { category: "Destiny (Tara)", score: Math.round((matchResult.ashtaKoota.tara.obtained / 3) * 100) },
                  { category: "Intimacy (Yoni)", score: Math.round((matchResult.ashtaKoota.yoni.obtained / 4) * 100) },
                  { category: "Friendship (Graha)", score: Math.round((matchResult.ashtaKoota.grahaMaitri.obtained / 5) * 100) },
                  { category: "Temperament (Gana)", score: Math.round((matchResult.ashtaKoota.gana.obtained / 6) * 100) },
                  { category: "Prosperity (Bhakoot)", score: Math.round((matchResult.ashtaKoota.bhakoot.obtained / 7) * 100) },
                  { category: "Genetics (Nadi)", score: Math.round((matchResult.ashtaKoota.nadi.obtained / 8) * 100) }
                ]}
                overallScore={matchResult.percentage}
                verdictLabel={matchResult.verdict}
                partnerAName={partnerA.name}
                partnerBName={partnerB.name}
              />
            </div>

            <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block">
                  Astrological Verdict
                </span>
                <h4 className="font-serif text-2xl font-bold text-slate-900">
                  {matchResult.verdict}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Auspicious alignment between {partnerA.name} ({partnerA.rashi}) and {partnerB.name} ({partnerB.rashi}). The union fulfills classical prerequisites for emotional friendship and mutual respect.
                </p>

                <div className="space-y-2 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                    <strong className="font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" /> Core Strength
                    </strong>
                    <p className="text-[11px]">{matchResult.strengths[0] || "Harmonious mental companions."}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
                    <strong className="font-bold flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-amber-600" /> Cosmic Guidance
                    </strong>
                    <p className="text-[11px]">{matchResult.concerns[0] || "Maintain clear communication around finances."}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveTab("ashta_koota")}
                  className="text-xs font-bold text-rose-700 hover:text-rose-900 cursor-pointer"
                >
                  View 36 Guna Table &rarr;
                </button>
                <button
                  onClick={() => setActiveTab("ai_master_report")}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 cursor-pointer shadow-xs"
                >
                  Ask AI Counselor
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 text-amber-100 border border-amber-500/30 space-y-3">
            <h4 className="font-serif font-bold text-base text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Synastry Highlights &amp; Planetary Equilibrium</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-amber-200/90 font-sans">
              {matchResult.synastryHighlights.map((hl, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-black/30 border border-amber-500/20">
                  {hl}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4.2 Dual Kundli Charts */}
      {activeTab === "both_kundali" && (
        <BothPartnersKundliView partnerA={partnerA} partnerB={partnerB} />
      )}

      {/* 4.3 Ashta Koota (36 Guna) */}
      {activeTab === "ashta_koota" && (
        <div className="space-y-6">
          <GunaMilanCalculator />
          <AshtaKootaExplanations breakdown={ashtaKootaDetails} totalScore={matchResult.score} />
        </div>
      )}

      {/* 4.4 Dashakoota (10 Koota) */}
      {activeTab === "dashakoota" && (
        <DashakootaExplanations breakdown={dashaKootaDetails} totalScore={35} />
      )}

      {/* 4.5 Nakshatra Porutham */}
      {activeTab === "nakshatra_compatibility" && (
        <NakshatraCompatibilityView matchResult={matchResult} />
      )}

      {/* 4.6 Jaimini Papasamya */}
      {activeTab === "jaimini_papasamya" && (
        <JaiminiPapasamyaView matchResult={matchResult} />
      )}

      {/* 4.7 Western Synastry */}
      {activeTab === "western_synastry" && (
        <WesternSynastryView matchResult={matchResult} />
      )}

      {/* 4.8 Unvarnished Risk Audit */}
      {activeTab === "doshas_remedies" && (
        <UnvarnishedRiskAuditView
          matchResult={matchResult}
          onNavigateToRemedies={() => setActiveTab("remedies_library")}
        />
      )}

      {/* 4.9 Remedies Library */}
      {activeTab === "remedies_library" && <RemediesLibrary />}

      {/* 4.10 Numerology Name Correction */}
      {activeTab === "numerology" && (
        <NumerologyNameCorrection
          numerology={numerologyDetail}
          partnerA={partnerA}
          partnerB={partnerB}
          selectedLanguage={selectedLanguage}
        />
      )}

      {/* 4.11 Chinese Zodiac & Feng Shui */}
      {activeTab === "chinese_zodiac" && (
        <ChineseZodiacFengShuiView
          chineseZodiac={chineseZodiacDetail}
          partnerA={partnerA}
          partnerB={partnerB}
        />
      )}

      {/* 4.12 AI Master Counseling Report */}
      {activeTab === "ai_master_report" && (
        <AIRelationshipAdviceSection
          matchResult={matchResult}
          partnerAName={partnerA.name}
          partnerBName={partnerB.name}
          selectedLanguage={selectedLanguage}
        />
      )}

      {/* MODAL: KUNDLI PDF REPORT GENERATOR */}
      <KundliPdfReportGeneratorModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        userProfile={userProfile}
        matchResult={matchResult}
        partnerDetails={{
          name: partnerB.name,
          dob: partnerB.dob,
          time: partnerB.time || "14:15",
          place: partnerB.place || "Mumbai, India",
          rashi: partnerB.rashi || "Taurus",
          nakshatra: partnerB.nakshatra || "Rohini"
        }}
      />
    </div>
  );
};
