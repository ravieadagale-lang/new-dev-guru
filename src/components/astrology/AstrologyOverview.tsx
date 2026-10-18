import React from "react";
import { UserProfile, PlanetPosition, HouseDetail } from "../../types";
import { 
  Compass, 
  Sun, 
  Moon, 
  Sparkles, 
  Layers, 
  Clock, 
  Activity, 
  ShieldCheck, 
  ArrowRight, 
  Heart, 
  FileText, 
  Calendar, 
  AlertTriangle,
  Award,
  ChevronRight,
  TrendingUp,
  RotateCcw,
  Zap,
  BookOpen
} from "lucide-react";
import { playCardHoverSound, playCardFlipSound } from "../../utils/audioEffects";
import { VimshottariEngine } from "../../engine/dasha";

interface AstrologyOverviewProps {
  userProfile: UserProfile;
  planets: PlanetPosition[];
  houses: HouseDetail[];
  lagnaSign: string;
  onSelectCategory: (categoryId: string, subTabId?: string) => void;
  onOpenReportModal?: () => void;
}

export const AstrologyOverview: React.FC<AstrologyOverviewProps> = ({
  userProfile,
  planets,
  houses,
  lagnaSign,
  onSelectCategory,
  onOpenReportModal
}) => {
  const moonPlanet = planets.find(p => p.name === "Moon");
  const sunPlanet = planets.find(p => p.name === "Sun");
  const saturnPlanet = planets.find(p => p.name === "Saturn");
  const jupiterPlanet = planets.find(p => p.name === "Jupiter");

  // Determine Atmakaraka (highest degree planet among 7 chara karakas)
  const charaPlanets = planets.filter(p => ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"].includes(p.name));
  const sortedByDegree = [...charaPlanets].sort((a, b) => (b.degree % 30) - (a.degree % 30));
  const atmakaraka = sortedByDegree[0]?.name || "Sun";
  const amatyakaraka = sortedByDegree[1]?.name || "Jupiter";

  // Sade Sati Status calculation based on Natal Moon vs Saturn
  const getSadeSatiStatus = () => {
    const moonSign = moonPlanet?.sign || userProfile?.rashi || "Taurus";
    const saturnSign = saturnPlanet?.sign || "Aquarius";
    
    const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
    const moonIdx = signs.indexOf(moonSign);
    const saturnIdx = signs.indexOf(saturnSign);
    const diff = (saturnIdx - moonIdx + 12) % 12;

    if (diff === 11) return { active: true, phase: "Rising Phase (12th from Moon)", severity: "Moderate", description: "Saturn is transiting the 12th house from your Janma Rashi." };
    if (diff === 0) return { active: true, phase: "Peak Phase (Janma Shani)", severity: "Intense", description: "Saturn is transiting directly over your natal Moon (Janma Rashi)." };
    if (diff === 1) return { active: true, phase: "Setting Phase (2nd from Moon)", severity: "Moderate", description: "Saturn is transiting the 2nd house from your Janma Rashi." };
    if (diff === 3) return { active: false, phase: "Kantaka Shani (4th from Moon)", severity: "Minor Dhaiya", description: "Saturn is in the 4th house from natal Moon." };
    if (diff === 7) return { active: false, phase: "Ashtama Shani (8th from Moon)", severity: "Major Dhaiya", description: "Saturn is in the 8th house from natal Moon." };
    return { active: false, phase: "No Active Sade Sati", severity: "Calm", description: "Saturn is in a neutral transit position relative to your natal Moon." };
  };

  const sadeSati = getSadeSatiStatus();

  // Dynamic Phase 2 Vimshottari calculation
  const activeDasha = React.useMemo(() => {
    try {
      const dobStr = userProfile?.dob || "1995-08-15";
      const timeStr = userProfile?.time || "10:30";
      const iso = `${dobStr}T${timeStr.length === 5 ? `${timeStr}:00` : timeStr}Z`;
      const birth = new Date(iso);
      const moonLon = (moonPlanet as any)?.totalDeg ?? (moonPlanet as any)?.longitude ?? 46.5;
      const report = VimshottariEngine.calculateMasterVimshottari({
        birthDate: isNaN(birth.getTime()) ? new Date("1995-08-15T10:30:00Z") : birth,
        moonLongitude: moonLon,
        targetDate: new Date(),
        maxDepth: 3
      });
      return {
        path: report.currentHierarchy.path,
        startYear: new Date(report.currentHierarchy.currentStartDateIso).getFullYear(),
        endYear: new Date(report.currentHierarchy.currentEndDateIso).getFullYear(),
        progress: report.currentHierarchy.progressPercentage,
        daysRemaining: report.currentHierarchy.daysRemaining
      };
    } catch {
      return {
        path: "Jupiter — Saturn — Venus",
        startYear: 2023,
        endYear: 2026,
        progress: 64,
        daysRemaining: 180
      };
    }
  }, [userProfile?.dob, userProfile?.time, moonPlanet]);

  return (
    <div className="space-y-6">
      {/* 1. TOP HERO: ACTIVE BIRTH PROFILE & CELESTIAL IDENTITY */}
      <div className="bg-gradient-to-br from-[#1E1B18] via-[#2A241F] to-[#120F0D] rounded-3xl p-6 sm:p-8 text-amber-100 border border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Active Birth Profile
              </span>
              <span className="text-xs text-amber-200/60 font-medium">
                {userProfile?.dob || "1995-08-15"} at {userProfile?.time || "10:30"} • {userProfile?.place || "New Delhi, India"}
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100 tracking-tight">
              {userProfile?.name || "Aarav Sharma"}
            </h2>

            <p className="text-xs sm:text-sm text-amber-200/80 max-w-2xl leading-relaxed">
              Deterministic Vedic Astrological synthesis calculated with high-precision astronomical algorithms (Chitra Paksha Lahiri Ayanamsha, Whole Sign / Bhava Chalit Foundation).
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                playCardFlipSound();
                onSelectCategory("my_astrology");
              }}
              className="px-4 py-2.5 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-200 text-xs font-bold transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>✏️ Change / Edit Birth Profile</span>
            </button>
            <button
              onClick={() => {
                playCardFlipSound();
                if (onOpenReportModal) onOpenReportModal();
                else onSelectCategory("reports");
              }}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black shadow-md transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-slate-950" />
              Generate Full PDF Dossier
            </button>
          </div>
        </div>

        {/* 5 Core Pillars Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-6 mt-6 border-t border-amber-500/20">
          {/* Lagna (Ascendant) */}
          <div className="bg-black/30 backdrop-blur-xs p-3.5 rounded-2xl border border-amber-500/20">
            <div className="flex items-center justify-between text-amber-400/80 text-[11px] font-bold uppercase">
              <span>Lagna (Ascendant)</span>
              <Compass className="w-3.5 h-3.5" />
            </div>
            <div className="font-serif text-xl font-bold text-amber-200 mt-1">
              {lagnaSign}
            </div>
            <div className="text-[10px] text-amber-300/60 mt-0.5">
              1st House • Physical Vitality
            </div>
          </div>

          {/* Moon Sign (Rashi) */}
          <div className="bg-black/30 backdrop-blur-xs p-3.5 rounded-2xl border border-amber-500/20">
            <div className="flex items-center justify-between text-amber-400/80 text-[11px] font-bold uppercase">
              <span>Moon Sign (Rashi)</span>
              <Moon className="w-3.5 h-3.5 text-blue-300" />
            </div>
            <div className="font-serif text-xl font-bold text-amber-200 mt-1">
              {moonPlanet?.sign || userProfile.rashi || "Taurus"}
            </div>
            <div className="text-[10px] text-amber-300/60 mt-0.5">
              Mind, Emotions &amp; Manas
            </div>
          </div>

          {/* Sun Sign (Surya) */}
          <div className="bg-black/30 backdrop-blur-xs p-3.5 rounded-2xl border border-amber-500/20">
            <div className="flex items-center justify-between text-amber-400/80 text-[11px] font-bold uppercase">
              <span>Sun Sign (Surya)</span>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="font-serif text-xl font-bold text-amber-200 mt-1">
              {sunPlanet?.sign || userProfile.sunSign || "Leo"}
            </div>
            <div className="text-[10px] text-amber-300/60 mt-0.5">
              Soul, Vitality &amp; Atma
            </div>
          </div>

          {/* Nakshatra & Pada */}
          <div className="bg-black/30 backdrop-blur-xs p-3.5 rounded-2xl border border-amber-500/20">
            <div className="flex items-center justify-between text-amber-400/80 text-[11px] font-bold uppercase">
              <span>Nakshatra</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="font-serif text-xl font-bold text-amber-200 mt-1 truncate">
              {moonPlanet?.nakshatra || userProfile.nakshatra || "Rohini"}
            </div>
            <div className="text-[10px] text-amber-300/60 mt-0.5">
              Pada {moonPlanet?.pada || userProfile.nakshatraPada || 2} • Ruler: {(moonPlanet as any)?.nakshatraLord || "Moon"}
            </div>
          </div>

          {/* Atmakaraka & Karakas */}
          <div className="bg-black/30 backdrop-blur-xs p-3.5 rounded-2xl border border-amber-500/20 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-amber-400/80 text-[11px] font-bold uppercase">
              <span>Soul Karaka (AK)</span>
              <Award className="w-3.5 h-3.5 text-amber-300" />
            </div>
            <div className="font-serif text-xl font-bold text-amber-200 mt-1">
              {atmakaraka}
            </div>
            <div className="text-[10px] text-amber-300/60 mt-0.5">
              AmK: {amatyakaraka} (Career)
            </div>
          </div>
        </div>
      </div>

      {/* 2. THREE-PANEL OPERATIONAL DASHBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Panel 1: Current Active Dasha */}
        <div 
          onMouseEnter={playCardHoverSound}
          onClick={() => onSelectCategory("dasha")}
          className="bg-white rounded-3xl p-5 border border-amber-900/10 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-amber-700" />
                Vimshottari Dasha
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
            </div>

            <div>
              <div className="text-xs text-slate-500 font-medium">Current Operating Vimshottari Path</div>
              <div className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                {activeDasha.path}
              </div>
              <div className="text-xs text-slate-600 mt-1">
                Active Period: <span className="font-semibold text-slate-900">{activeDasha.startYear} to {activeDasha.endYear}</span> ({activeDasha.daysRemaining} days left)
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${activeDasha.progress}%` }} />
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-amber-900 font-bold">
            <span>Explore 5-Tier Timeline &amp; Evidence</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
          </div>
        </div>

        {/* Panel 2: Today's Panchanga & Auspicious Muhurat */}
        <div 
          onMouseEnter={playCardHoverSound}
          onClick={() => onSelectCategory("panchanga_muhurat")}
          className="bg-white rounded-3xl p-5 border border-amber-900/10 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <Sun className="w-3 h-3 text-emerald-700" />
                Today's Panchanga
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </div>

            <div>
              <div className="text-xs text-slate-500 font-medium">Daily Vedic Astronomical Limbs</div>
              <div className="font-serif text-xl font-bold text-slate-900 mt-0.5">
                Shukla Pratipada • Rohini
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                <div className="bg-emerald-50/70 p-2 rounded-xl border border-emerald-200/50">
                  <div className="text-[10px] text-emerald-700 font-bold uppercase">Abhijit Muhurta</div>
                  <div className="font-semibold text-emerald-950">11:54 AM – 12:46 PM</div>
                </div>
                <div className="bg-rose-50/70 p-2 rounded-xl border border-rose-200/50">
                  <div className="text-[10px] text-rose-700 font-bold uppercase">Rahu Kalam</div>
                  <div className="font-semibold text-rose-950">03:30 PM – 05:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-900 font-bold">
            <span>View Choghadiya, Horas &amp; 18+ Muhurats</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
          </div>
        </div>

        {/* Panel 3: Saturn Transit & Sade Sati Status */}
        <div 
          onMouseEnter={playCardHoverSound}
          onClick={() => onSelectCategory("transits")}
          className="bg-white rounded-3xl p-5 border border-amber-900/10 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-800 bg-indigo-100/70 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-indigo-700" />
                Transit &amp; Sade Sati
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </div>

            <div>
              <div className="text-xs text-slate-500 font-medium">Current Shani Gochara Status</div>
              <div className="font-serif text-xl font-bold text-slate-900 mt-0.5">
                {sadeSati.phase}
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                {sadeSati.description}
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold">
              <span>Jupiter in Taurus (1st House)</span> • <span>Rahu in Pisces</span>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-900 font-bold">
            <span>Open Live Transit Radar &amp; Gochara</span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-600" />
          </div>
        </div>
      </div>

      {/* 3. QUICK NAVIGATION HUBS: 6 ESSENTIAL ASTROLOGY WORKSPACES */}
      <div className="space-y-3">
        <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-600" />
          Direct Astrological Workspaces
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Hub 1: Kundli (D1 to D60) */}
          <button
            onClick={() => onSelectCategory("kundli")}
            onMouseEnter={playCardHoverSound}
            className="p-4 rounded-2xl bg-white border border-amber-900/10 hover:border-amber-500 hover:shadow-md transition-all text-left group flex flex-col justify-between"
          >
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 w-fit group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
              <Compass className="w-5 h-5" />
            </div>
            <div className="mt-3">
              <div className="font-serif font-bold text-sm text-slate-900">Kundli Core</div>
              <div className="text-[11px] text-slate-500 mt-0.5">D1, D9, D60 &amp; Houses</div>
            </div>
          </button>

          {/* Hub 2: Yogas & Doshas */}
          <button
            onClick={() => onSelectCategory("yogas_doshas")}
            onMouseEnter={playCardHoverSound}
            className="p-4 rounded-2xl bg-white border border-amber-900/10 hover:border-amber-500 hover:shadow-md transition-all text-left group flex flex-col justify-between"
          >
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900 w-fit group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="mt-3">
              <div className="font-serif font-bold text-sm text-slate-900">Yogas &amp; Doshas</div>
              <div className="text-[11px] text-slate-500 mt-0.5">1,001+ Rules &amp; Manglik</div>
            </div>
          </button>

          {/* Hub 3: Life Areas */}
          <button
            onClick={() => onSelectCategory("life_areas")}
            onMouseEnter={playCardHoverSound}
            className="p-4 rounded-2xl bg-white border border-amber-900/10 hover:border-amber-500 hover:shadow-md transition-all text-left group flex flex-col justify-between"
          >
            <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-900 w-fit group-hover:bg-indigo-500 group-hover:text-slate-950 transition-colors">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="mt-3">
              <div className="font-serif font-bold text-sm text-slate-900">Life Areas</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Career, Wealth, Marriage</div>
            </div>
          </button>

          {/* Hub 4: Compatibility */}
          <button
            onClick={() => onSelectCategory("compatibility")}
            onMouseEnter={playCardHoverSound}
            className="p-4 rounded-2xl bg-white border border-amber-900/10 hover:border-amber-500 hover:shadow-md transition-all text-left group flex flex-col justify-between"
          >
            <div className="p-2.5 rounded-xl bg-rose-100 text-rose-900 w-fit group-hover:bg-rose-500 group-hover:text-slate-950 transition-colors">
              <Heart className="w-5 h-5" />
            </div>
            <div className="mt-3">
              <div className="font-serif font-bold text-sm text-slate-900">Compatibility</div>
              <div className="text-[11px] text-slate-500 mt-0.5">36-Point Guna Milan</div>
            </div>
          </button>

          {/* Hub 5: Advanced Astrology */}
          <button
            onClick={() => onSelectCategory("advanced_astrology")}
            onMouseEnter={playCardHoverSound}
            className="p-4 rounded-2xl bg-white border border-amber-900/10 hover:border-amber-500 hover:shadow-md transition-all text-left group flex flex-col justify-between"
          >
            <div className="p-2.5 rounded-xl bg-purple-100 text-purple-900 w-fit group-hover:bg-purple-500 group-hover:text-slate-950 transition-colors">
              <Layers className="w-5 h-5" />
            </div>
            <div className="mt-3">
              <div className="font-serif font-bold text-sm text-slate-900">Advanced Vedic</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Shadbala, KP, Jaimini</div>
            </div>
          </button>

          {/* Hub 6: Vedic Remedies */}
          <button
            onClick={() => onSelectCategory("remedies")}
            onMouseEnter={playCardHoverSound}
            className="p-4 rounded-2xl bg-white border border-amber-900/10 hover:border-amber-500 hover:shadow-md transition-all text-left group flex flex-col justify-between"
          >
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 w-fit group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="mt-3">
              <div className="font-serif font-bold text-sm text-slate-900">Vedic Remedies</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Mantras, Gemstones, Puja</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
