import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UserProfile, PlanetPosition, HouseDetail, LanguageCode } from "../types";
import { playCardHoverSound, playCardFlipSound } from "../utils/audioEffects";
import { RASHI_LORDS, HOUSES_SIGNIFICANCE } from "../data/astrologyData";
import { 
  Compass, 
  Sparkles, 
  BookOpen, 
  RefreshCw, 
  ShieldCheck, 
  Award, 
  Zap, 
  Flame, 
  Sun, 
  Moon, 
  CheckCircle2, 
  Star, 
  Layers, 
  ChevronRight,
  Info,
  Download,
  Copy,
  Check
} from "lucide-react";

interface AstrologicalDeepDiveSectionProps {
  userProfile?: UserProfile;
  planets: PlanetPosition[];
  houses: HouseDetail[];
  lagna: string;
  selectedLanguage?: LanguageCode;
}

const HOUSE_CATEGORIES = [
  { id: "all", label: "All 12 Houses (सर्व भाव)", desc: "Complete 360° Life Canvas" },
  { id: "dharma", label: "Dharma Trikona (1, 5, 9)", desc: "Soul Purpose, Intellect & Destiny" },
  { id: "artha", label: "Artha Trikona (2, 6, 10)", desc: "Wealth, Career & Material Gains" },
  { id: "kama", label: "Kama Trikona (3, 7, 11)", desc: "Desires, Relationships & Networks" },
  { id: "moksha", label: "Moksha Trikona (4, 8, 12)", desc: "Inner Peace, Mysticism & Liberation" }
];

const HOUSE_ELEMENTS: Record<number, { element: string; goal: "Dharma" | "Artha" | "Kama" | "Moksha"; color: string }> = {
  1: { element: "Fire", goal: "Dharma", color: "from-amber-500/20 to-orange-500/20 text-amber-700" },
  2: { element: "Earth", goal: "Artha", color: "from-emerald-500/20 to-teal-500/20 text-emerald-700" },
  3: { element: "Air", goal: "Kama", color: "from-blue-500/20 to-indigo-500/20 text-blue-700" },
  4: { element: "Water", goal: "Moksha", color: "from-purple-500/20 to-violet-500/20 text-purple-700" },
  5: { element: "Fire", goal: "Dharma", color: "from-amber-500/20 to-orange-500/20 text-amber-700" },
  6: { element: "Earth", goal: "Artha", color: "from-emerald-500/20 to-teal-500/20 text-emerald-700" },
  7: { element: "Air", goal: "Kama", color: "from-blue-500/20 to-indigo-500/20 text-blue-700" },
  8: { element: "Water", goal: "Moksha", color: "from-purple-500/20 to-violet-500/20 text-purple-700" },
  9: { element: "Fire", goal: "Dharma", color: "from-amber-500/20 to-orange-500/20 text-amber-700" },
  10: { element: "Earth", goal: "Artha", color: "from-emerald-500/20 to-teal-500/20 text-emerald-700" },
  11: { element: "Air", goal: "Kama", color: "from-blue-500/20 to-indigo-500/20 text-blue-700" },
  12: { element: "Water", goal: "Moksha", color: "from-purple-500/20 to-violet-500/20 text-purple-700" }
};

export const AstrologicalDeepDiveSection: React.FC<AstrologicalDeepDiveSectionProps> = ({
  userProfile,
  planets,
  houses,
  lagna,
  selectedLanguage = "en"
}) => {
  const [selectedHouseNum, setSelectedHouseNum] = useState<number>(1);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [aiHouseAnalysis, setAiHouseAnalysis] = useState<Record<number, string>>({});
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);
  const [masterSynthesis, setMasterSynthesis] = useState<string>("");
  const [isGeneratingMaster, setIsGeneratingMaster] = useState<boolean>(false);
  const [copiedHouse, setCopiedHouse] = useState<boolean>(false);

  // Map planets to houses
  const housesWithPlanets = useMemo(() => {
    return houses.map((h) => {
      const houseNum = h.houseNumber || (h as any).houseNum || 1;
      const rashiName = h.sign || (h as any).rashiName || "Aries";
      const housePlanets = planets.filter((p) => p.house === houseNum);
      const rashiLord = h.signLord || RASHI_LORDS[rashiName] || "Unknown";
      
      // Find where house lord is placed
      const lordPlanet = planets.find((p) => p.name.toLowerCase() === rashiLord.toLowerCase());
      const lordHouseNum = lordPlanet ? lordPlanet.house : houseNum;

      return {
        ...h,
        houseNum,
        rashiName,
        planets: housePlanets,
        rashiLord,
        lordHouseNum,
        element: HOUSE_ELEMENTS[houseNum]?.element || "Fire",
        goal: HOUSE_ELEMENTS[houseNum]?.goal || "Dharma",
      };
    });
  }, [houses, planets]);

  const selectedHouseDetail = useMemo(() => {
    return housesWithPlanets.find((h) => h.houseNum === selectedHouseNum) || housesWithPlanets[0];
  }, [housesWithPlanets, selectedHouseNum]);

  // Filter houses by Trikona
  const filteredHouses = useMemo(() => {
    if (activeCategory === "all") return housesWithPlanets;
    if (activeCategory === "dharma") return housesWithPlanets.filter((h) => [1, 5, 9].includes(h.houseNum));
    if (activeCategory === "artha") return housesWithPlanets.filter((h) => [2, 6, 10].includes(h.houseNum));
    if (activeCategory === "kama") return housesWithPlanets.filter((h) => [3, 7, 11].includes(h.houseNum));
    if (activeCategory === "moksha") return housesWithPlanets.filter((h) => [4, 8, 12].includes(h.houseNum));
    return housesWithPlanets;
  }, [housesWithPlanets, activeCategory]);

  // Handle single house AI analysis call
  const handleGenerateSingleHouseAI = async (houseNum: number) => {
    setIsGeneratingAi(true);
    try {
      const hData = housesWithPlanets.find((h) => h.houseNum === houseNum);
      const res = await fetch("/api/ai/house-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: {
            name: userProfile?.name || "Aarav Sharma",
            dob: userProfile?.dob || "1995-08-15",
            time: userProfile?.time || "10:30",
            place: userProfile?.place || "New Delhi, India",
            lagna,
            rashi: userProfile?.rashi || "Taurus",
            nakshatra: userProfile?.nakshatra || "Rohini"
          },
          houseNum,
          houseData: {
            title: HOUSES_SIGNIFICANCE[houseNum]?.title,
            rashiName: hData?.rashiName,
            lord: hData?.rashiLord,
            planets: hData?.planets.map((p) => ({
              name: p.name,
              degree: p.degreeFormatted || (typeof p.degree === 'number' ? `${p.degree.toFixed(2)}°` : `${p.degree}°`),
              nakshatra: p.nakshatra,
              dignity: p.dignity,
              isRetrograde: p.isRetrograde
            })),
            lordPlacement: `${hData?.rashiLord} (Lord of House #${houseNum}) is placed in House #${hData?.lordHouseNum}`
          },
          language: selectedLanguage
        })
      });

      const data = await res.json();
      if (data.analysis) {
        setAiHouseAnalysis((prev) => ({ ...prev, [houseNum]: data.analysis }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Handle Master 12-House AI Synthesis
  const handleGenerateMasterSynthesis = async () => {
    setIsGeneratingMaster(true);
    try {
      const res = await fetch("/api/ai/house-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: {
            name: userProfile?.name || "Aarav Sharma",
            dob: userProfile?.dob || "1995-08-15",
            time: userProfile?.time || "10:30",
            place: userProfile?.place || "New Delhi, India",
            lagna,
            rashi: userProfile?.rashi || "Taurus",
            nakshatra: userProfile?.nakshatra || "Rohini"
          },
          houseNum: "all",
          allHouses: housesWithPlanets.map((h) => ({
            houseNum: h.houseNum,
            title: HOUSES_SIGNIFICANCE[h.houseNum]?.title,
            rashiName: h.rashiName,
            lord: h.rashiLord,
            planets: h.planets.map((p) => `${p.name} (${p.dignity})`),
            lordHouseNum: h.lordHouseNum
          })),
          language: selectedLanguage
        })
      });

      const data = await res.json();
      if (data.analysis) {
        setMasterSynthesis(data.analysis);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingMaster(false);
    }
  };

  const handleCopyHouseText = () => {
    const textToCopy = aiHouseAnalysis[selectedHouseNum] || "";
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedHouse(true);
      setTimeout(() => setCopiedHouse(false), 2500);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-amber-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl border border-amber-500/25 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              Vedic Bhavat Bhavam & Parashari Shastra
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100 mt-2">
              Astrological Deep Dive: 12 Houses
            </h1>
            <p className="text-xs sm:text-sm text-amber-200/80 mt-1 max-w-2xl leading-relaxed">
              Explore automated AI-generated interpretations of <strong className="text-amber-300">{userProfile?.name || "Seeker"}</strong>'s exact 12 house placements, planetary occupants, house lord connections, and karmic destinies calculated for <strong className="text-amber-300">{lagna} Ascendant</strong>.
            </p>
          </div>

          <button
            onClick={handleGenerateMasterSynthesis}
            disabled={isGeneratingMaster}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-700 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 flex items-center gap-2.5 transition-all shrink-0 cursor-pointer disabled:opacity-50"
          >
            {isGeneratingMaster ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                <span>Synthesizing All 12 Houses...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4.5 h-4.5 text-slate-950" />
                <span>Master 12-House AI Synthesis</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Master 12-House AI Synthesis Output Box */}
      {masterSynthesis && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-amber-950/90 text-amber-100 p-6 sm:p-8 rounded-3xl border-2 border-amber-500/40 shadow-2xl space-y-4"
        >
          <div className="flex justify-between items-center border-b border-amber-500/30 pb-3">
            <h3 className="font-serif font-bold text-xl text-amber-300 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Master 12-House Astrological Deep Dive Synthesis
            </h3>
            <span className="text-[11px] font-bold px-3 py-1 bg-amber-400/20 text-amber-200 rounded-full border border-amber-400/30">
              Dev-Guru AI Vedic Oracle
            </span>
          </div>

          <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans text-amber-100/90 space-y-3">
            {masterSynthesis}
          </div>
        </motion.div>
      )}

      {/* Life Goal / Trikona Filter Tabs */}
      <div className="flex items-center overflow-x-auto gap-2 pb-2 no-scrollbar text-xs font-semibold">
        {HOUSE_CATEGORIES.map((cat, catIdx) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id || `cat-${catIdx}`}
              onClick={() => {
                playCardHoverSound();
                setActiveCategory(cat.id);
              }}
              className={`px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all border cursor-pointer ${
                isActive
                  ? "bg-slate-900 text-amber-300 border-amber-500 font-bold shadow-sm"
                  : "bg-white text-slate-700 border-amber-900/10 hover:bg-amber-50"
              }`}
            >
              <div>{cat.label}</div>
              <div className="text-[10px] font-normal opacity-75">{cat.desc}</div>
            </button>
          );
        })}
      </div>

      {/* 12 House Selector Cards Carousel / Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredHouses.map((h, hIdx) => {
          const isSelected = h.houseNum === selectedHouseNum;
          const info = HOUSES_SIGNIFICANCE[h.houseNum];

          return (
            <button
              key={h.houseNum ? `house-btn-${h.houseNum}` : `house-btn-idx-${hIdx}`}
              onClick={() => {
                playCardFlipSound();
                setSelectedHouseNum(h.houseNum);
              }}
              className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? "bg-slate-900 text-amber-300 border-amber-400 shadow-lg scale-102 ring-2 ring-amber-500/30"
                  : "bg-white text-slate-800 border-amber-900/10 hover:border-amber-500/40 hover:bg-amber-50/50"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded-lg ${
                  isSelected ? "bg-amber-400/20 text-amber-300" : "bg-amber-100 text-amber-900"
                }`}>
                  House #{h.houseNum}
                </span>

                {h.planets.length > 0 && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isSelected ? "bg-amber-500 text-slate-950" : "bg-slate-900 text-amber-300"
                  }`}>
                    {h.planets.length} {h.planets.length === 1 ? "Planet" : "Planets"}
                  </span>
                )}
              </div>

              <div className="mt-2 font-serif font-bold text-sm truncate">
                {info?.title.split("/")[0] || `House ${h.houseNum}`}
              </div>

              <div className="text-[11px] font-medium mt-0.5 opacity-80 truncate">
                {h.rashiName} ({h.rashiLord})
              </div>

              <div className="text-[10px] opacity-75 mt-1 truncate">
                {h.goal} • {h.element}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected House Deep Dive Analysis Section */}
      {selectedHouseDetail && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/15 shadow-sm space-y-6">
          {/* House Detail Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-amber-900/10 pb-6">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 bg-amber-100 text-amber-900 font-bold text-xs rounded-xl uppercase tracking-wider">
                  House #{selectedHouseDetail.houseNum} Deep Analysis
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl">
                  {selectedHouseDetail.goal} Trikona
                </span>
                <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 font-bold text-xs rounded-xl">
                  {selectedHouseDetail.element} Element
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                {HOUSES_SIGNIFICANCE[selectedHouseDetail.houseNum]?.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                <strong className="text-slate-900">Core Significance:</strong> {HOUSES_SIGNIFICANCE[selectedHouseDetail.houseNum]?.significance}
              </p>
            </div>

            <button
              onClick={() => handleGenerateSingleHouseAI(selectedHouseDetail.houseNum)}
              disabled={isGeneratingAi}
              className="px-5 py-2.5 rounded-2xl bg-slate-900 text-amber-300 border border-amber-500/40 font-bold text-xs hover:bg-slate-800 flex items-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50 shrink-0"
            >
              {isGeneratingAi ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Consulting Dev-Guru AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Generate Dev-Guru AI Deep Analysis</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-900/10 space-y-1">
              <span className="text-[10px] font-bold text-amber-900 uppercase">Occupying Zodiac Sign</span>
              <div className="font-serif font-bold text-base text-slate-900">{selectedHouseDetail.rashiName}</div>
              <div className="text-[11px] text-slate-600">House #{selectedHouseDetail.houseNum} Cusp</div>
            </div>

            <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-900/10 space-y-1">
              <span className="text-[10px] font-bold text-amber-900 uppercase">Rashi Lord (Lord of House)</span>
              <div className="font-serif font-bold text-base text-slate-900">{selectedHouseDetail.rashiLord}</div>
              <div className="text-[11px] text-slate-600">Governs this life domain</div>
            </div>

            <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-900/10 space-y-1">
              <span className="text-[10px] font-bold text-amber-900 uppercase">House Lord Placement</span>
              <div className="font-serif font-bold text-base text-slate-900">Placed in House #{selectedHouseDetail.lordHouseNum}</div>
              <div className="text-[11px] text-slate-600">
                {selectedHouseDetail.lordHouseNum === selectedHouseDetail.houseNum ? "Swakshetra (Own House)" : `Connects House ${selectedHouseDetail.houseNum} to House ${selectedHouseDetail.lordHouseNum}`}
              </div>
            </div>

            <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-900/10 space-y-1">
              <span className="text-[10px] font-bold text-amber-900 uppercase">Planetary Occupants</span>
              <div className="font-serif font-bold text-base text-slate-900">
                {selectedHouseDetail.planets.length > 0
                  ? selectedHouseDetail.planets.map((p) => p.name).join(", ")
                  : "No Occupying Planets"}
              </div>
              <div className="text-[11px] text-slate-600">
                {selectedHouseDetail.planets.length > 0 ? `${selectedHouseDetail.planets.length} active energy centers` : "Influenced primarily by Lord"}
              </div>
            </div>
          </div>

          {/* Occupying Planets Detail List */}
          {selectedHouseDetail.planets.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-700" />
                Occupying Planets in House #{selectedHouseDetail.houseNum}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedHouseDetail.planets.map((p, pIdx) => (
                  <div key={p.name ? `planet-${p.name}-${pIdx}` : `planet-idx-${pIdx}`} className="bg-white p-4 rounded-2xl border border-amber-900/15 shadow-xs space-y-1.5 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-amber-600" />
                        {p.name} {p.isRetrograde && <span className="text-[10px] text-red-600 font-bold">(R)</span>}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        p.dignity === "Exalted" ? "bg-emerald-100 text-emerald-900" :
                        p.dignity === "Debilitated" ? "bg-red-100 text-red-900" :
                        p.dignity === "Own Sign" ? "bg-blue-100 text-blue-900" : "bg-amber-100 text-amber-900"
                      }`}>
                        {p.dignity}
                      </span>
                    </div>

                    <div className="text-slate-600 flex justify-between text-[11px]">
                      <span>Degree: <strong className="text-slate-800">{p.degreeFormatted || (typeof p.degree === 'number' ? `${p.degree.toFixed(2)}°` : `${p.degree}°`)}</strong></span>
                      <span>Nakshatra: <strong className="text-slate-800">{p.nakshatra} ({p.pada ? `Pada ${p.pada}` : "1"})</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI House Analysis Output or Default Parashari Synthesis */}
          <div className="space-y-4 pt-4 border-t border-amber-900/10">
            <div className="flex justify-between items-center">
              <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-800" />
                House #{selectedHouseDetail.houseNum} Automated Synthesis
              </h3>

              {aiHouseAnalysis[selectedHouseNum] && (
                <button
                  onClick={handleCopyHouseText}
                  className="px-3 py-1 bg-amber-100 text-amber-900 font-bold text-xs rounded-xl hover:bg-amber-200 transition-all flex items-center gap-1 cursor-pointer"
                >
                  {copiedHouse ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5 text-amber-800" />}
                  <span>{copiedHouse ? "Copied!" : "Copy Report"}</span>
                </button>
              )}
            </div>

            {aiHouseAnalysis[selectedHouseNum] ? (
              <div className="bg-amber-50/80 p-6 rounded-3xl border border-amber-900/15 text-xs sm:text-sm leading-relaxed text-slate-800 whitespace-pre-wrap font-sans space-y-3">
                {aiHouseAnalysis[selectedHouseNum]}
              </div>
            ) : (
              <div className="bg-amber-50/60 p-6 rounded-3xl border border-amber-900/10 space-y-4 text-xs sm:text-sm">
                <div className="font-serif font-bold text-base text-slate-900">
                  Parashari Classical Assessment for House #{selectedHouseDetail.houseNum} ({selectedHouseDetail.rashiName})
                </div>

                <p className="text-slate-700 leading-relaxed font-medium">
                  House #{selectedHouseDetail.houseNum} ({HOUSES_SIGNIFICANCE[selectedHouseDetail.houseNum]?.title}) represents <strong>{HOUSES_SIGNIFICANCE[selectedHouseDetail.houseNum]?.significance}</strong>.
                  With <strong>{selectedHouseDetail.rashiName}</strong> on the cusp, the natural qualities of {selectedHouseDetail.rashiName} permeate your approach to this domain.
                  The house is governed by <strong>{selectedHouseDetail.rashiLord}</strong>, who is strategically situated in House #{selectedHouseDetail.lordHouseNum}.
                </p>

                {selectedHouseDetail.planets.length > 0 ? (
                  <div className="bg-white p-4 rounded-2xl border border-amber-900/10 space-y-2">
                    <span className="font-bold text-slate-900 block">Occupying Energy Influence:</span>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      The presence of {selectedHouseDetail.planets.map((p) => `${p.name} (${p.dignity})`).join(", ")} activates intense karmic activity in House #{selectedHouseDetail.houseNum}.
                      {selectedHouseDetail.planets.some(p => p.dignity === "Exalted") && " The exalted planet here generates exceptional strength, prosperity, and magnetic authority."}
                      {selectedHouseDetail.planets.some(p => p.dignity === "Debilitated") && " The debilitated placement suggests a domain requiring spiritual remedies, patience, and conscious effort to overcome early friction."}
                    </p>
                  </div>
                ) : (
                  <p className="text-slate-600 italic text-xs">
                    This house is unoccupied by major planets, meaning its results are driven cleanly by the condition and aspects of its ruler, <strong>{selectedHouseDetail.rashiLord}</strong> (placed in House #{selectedHouseDetail.lordHouseNum}).
                  </p>
                )}

                <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200 text-emerald-950 space-y-1">
                  <span className="font-bold flex items-center gap-1 text-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    Recommended Vedic Remedy for House #{selectedHouseDetail.houseNum}:
                  </span>
                  <p className="text-emerald-900 text-xs font-medium">
                    To harmonize House #{selectedHouseDetail.houseNum}, honor {selectedHouseDetail.rashiLord} through chanting their Beej Mantra, maintaining integrity in matters of {HOUSES_SIGNIFICANCE[selectedHouseDetail.houseNum]?.significance.split(",")[0]}, and engaging in weekly acts of selfless service.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
