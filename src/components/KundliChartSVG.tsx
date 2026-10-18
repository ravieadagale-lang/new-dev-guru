import React, { useState, useMemo } from "react";
import { PlanetPosition, HouseDetail, DivisionalChartType } from "../types";
import { calculateDivisionalChartData, RASHIS } from "../data/astrologyData";
import { VARGA_CATEGORIES } from "../data/vargaCategoriesData";
import { 
  Compass, 
  Eye, 
  Info, 
  User, 
  Coins, 
  Users, 
  Home, 
  Baby, 
  HeartHandshake, 
  Briefcase, 
  Shield, 
  Car, 
  Sparkles, 
  GraduationCap, 
  Layers, 
  CheckCircle2, 
  Zap,
  ZoomIn,
  RotateCcw,
  Star,
  Activity,
  ArrowRight
} from "lucide-react";
import { playCardHoverSound, playCardFlipSound } from "../utils/audioEffects";

// Detailed Vedic Graha Metadata
export const VEDIC_GRAHA_META: Record<string, {
  sanskrit: string;
  deity: string;
  nature: string;
  gemstone: string;
  day: string;
  color: string;
  karaka: string;
}> = {
  Sun: {
    sanskrit: "सूर्य (Surya)",
    deity: "Shiva / Agni",
    nature: "Kruura (Natural Malefic / Royal)",
    gemstone: "Ruby (Manikya)",
    day: "Sunday (Ravivar)",
    color: "#EA580C",
    karaka: "Atmakaraka (Soul, Father, Vitality, Authority)"
  },
  Moon: {
    sanskrit: "चन्द्र (Chandra)",
    deity: "Parvati / Varuna",
    nature: "Saumya (Benefic when waxing)",
    gemstone: "Pearl (Moti)",
    day: "Monday (Somavar)",
    color: "#0284C7",
    karaka: "Manas (Mind, Mother, Emotions, Memory)"
  },
  Mars: {
    sanskrit: "मङ्गल (Mangala)",
    deity: "Kartikeya / Subramanya",
    nature: "Kruura (Malefic / Warrior)",
    gemstone: "Red Coral (Moonga)",
    day: "Tuesday (Mangalvar)",
    color: "#DC2626",
    karaka: "Bhratru (Courage, Brothers, Energy, Land)"
  },
  Mercury: {
    sanskrit: "बुध (Budha)",
    deity: "Vishnu",
    nature: "Saumya (Benefic / Intellect)",
    gemstone: "Emerald (Panna)",
    day: "Wednesday (Budhavar)",
    color: "#059669",
    karaka: "Buddhi (Intellect, Speech, Commerce, Analysis)"
  },
  Jupiter: {
    sanskrit: "गुरु (Guru / Brihaspati)",
    deity: "Indra / Brahma",
    nature: "Saumya (Greatest Natural Benefic)",
    gemstone: "Yellow Sapphire (Pukhraj)",
    day: "Thursday (Guruvar)",
    color: "#D97706",
    karaka: "Dharma & Santana (Wisdom, Children, Fortune, Guru)"
  },
  Venus: {
    sanskrit: "शुक्र (Shukra)",
    deity: "Lakshmi / Indra",
    nature: "Saumya (Benefic / Preceptor)",
    gemstone: "Diamond (Heera)",
    day: "Friday (Shukravar)",
    color: "#DB2777",
    karaka: "Kalatra (Spouse, Romance, Arts, Luxuries, Vehicles)"
  },
  Saturn: {
    sanskrit: "शनि (Shani)",
    deity: "Yama / Shiva",
    nature: "Kruura (Great Taskmaster / Malefic)",
    gemstone: "Blue Sapphire (Neelam)",
    day: "Saturday (Shanivar)",
    color: "#475569",
    karaka: "Ayush (Longevity, Karma, Hard Work, Service, Discipline)"
  },
  Rahu: {
    sanskrit: "राहु (Rahu / North Node)",
    deity: "Durga / Sarpa",
    nature: "Chhaya Graha (Shadow Planet / Obsessive)",
    gemstone: "Hessonite Garnet (Gomed)",
    day: "Saturday / Twilight",
    color: "#7C3AED",
    karaka: "Maya (Ambition, Worldly Desires, Foreign Journeys, Tech)"
  },
  Ketu: {
    sanskrit: "केतु (Ketu / South Node)",
    deity: "Ganesha / Chitragupta",
    nature: "Chhaya Graha (Shadow Planet / Spiritual)",
    gemstone: "Cat's Eye (Vaidurya)",
    day: "Tuesday / Twilight",
    color: "#78350F",
    karaka: "Moksha (Liberation, Spirituality, Detachment, Intuition)"
  },
  Uranus: {
    sanskrit: "हर्षल (Harshala)",
    deity: "Prajapati",
    nature: "Modern Planet (Sudden Breakthroughs)",
    gemstone: "Zircon",
    day: "N/A",
    color: "#0D9488",
    karaka: "Innovation, Revolution & Freedom"
  },
  Neptune: {
    sanskrit: "वरुण (Varuna)",
    deity: "Varuna",
    nature: "Modern Planet (Dreams & Mystery)",
    gemstone: "Aquamarine",
    day: "N/A",
    color: "#2563EB",
    karaka: "Imagination, Mysticism & Compassion"
  },
  Pluto: {
    sanskrit: "यम (Yama)",
    deity: "Yama",
    nature: "Modern Planet (Deep Rebirth)",
    gemstone: "Obsidian",
    day: "N/A",
    color: "#581C87",
    karaka: "Metamorphosis, Deep Psychology & Power"
  }
};

// Vedic House Significations
export const HOUSE_NAMES_VEDIC: Record<number, { sanskrit: string; english: string; domain: string }> = {
  1: { sanskrit: "तनु भाव (Tanu)", english: "1st House (Lagna / Self)", domain: "Physical Body, Vitality, Temperament, Head" },
  2: { sanskrit: "धन भाव (Dhana)", english: "2nd House (Wealth & Family)", domain: "Accumulated Wealth, Speech, Face, Immediate Family" },
  3: { sanskrit: "सहज भाव (Sahaja)", english: "3rd House (Siblings & Courage)", domain: "Courage, Siblings, Short Journeys, Communication, Hands" },
  4: { sanskrit: "सुख भाव (Sukha)", english: "4th House (Home & Happiness)", domain: "Mother, Vehicles, Fixed Assets, Inner Peace, Chest" },
  5: { sanskrit: "पुत्र भाव (Putra)", english: "5th House (Children & Intelligence)", domain: "Intellect, Past Life Karma (Purva Punya), Children, Mantras" },
  6: { sanskrit: "रिपु भाव (Ripu)", english: "6th House (Enemies & Health)", domain: "Debts, Diseases, Legal Battles, Daily Service, Digestion" },
  7: { sanskrit: "कलत्र भाव (Kalatra)", english: "7th House (Partnership & Marriage)", domain: "Spouse, Business Partners, Foreign Travel, Public Relations" },
  8: { sanskrit: "आयुर्भाव (Ayu)", english: "8th House (Longevity & Mystery)", domain: "Longevity, Sudden Events, Occult, Inheritance, Transformation" },
  9: { sanskrit: "धर्म भाव (Dharma)", english: "9th House (Fortune & Father)", domain: "Guru, Higher Knowledge, Long Pilgrimages, Luck, Thighs" },
  10: { sanskrit: "कर्म भाव (Karma)", english: "10th House (Career & Status)", domain: "Profession, Fame, Authority, Government, Knees" },
  11: { sanskrit: "लाभ भाव (Labha)", english: "11th House (Gains & Aspirations)", domain: "Income, Elder Siblings, Large Networks, Wish Fulfillment" },
  12: { sanskrit: "व्यय भाव (Vyaya)", english: "12th House (Losses & Liberation)", domain: "Spiritual Liberation (Moksha), Foreign Lands, Expenses, Sleep" },
};

export interface PlanetAspect {
  targetHouse: number;
  offset: number;
  label: string;
  sanskrit: string;
  strength: string;
  nature: string;
}

/**
 * Calculates deterministic Vedic aspects (Drishti) for a given planet and placement house.
 */
export function getVedicAspectsForPlanet(planetName: string, fromHouse: number): PlanetAspect[] {
  const normName = planetName.trim().toLowerCase();
  const aspectsList: { offset: number; label: string; sanskrit: string; strength: string; nature: string }[] = [];

  // All Grahas cast full 7th house aspect (Saptama Drishti)
  aspectsList.push({
    offset: 7,
    label: "7th House (Direct Aspect)",
    sanskrit: "सप्तम पूर्ण दृष्टि (100%)",
    strength: "100% Full Aspect",
    nature: "Direct Opposite Reflection & Synergy"
  });

  // Special Parashari Aspects
  if (normName === "mars" || normName.includes("mangal")) {
    aspectsList.push({
      offset: 4,
      label: "4th House (Special Mars Drishti)",
      sanskrit: "चतुर्थ विशेष दृष्टि (100%)",
      strength: "100% Full Aspect",
      nature: "Protective Force, Security & Building Action"
    });
    aspectsList.push({
      offset: 8,
      label: "8th House (Special Mars Drishti)",
      sanskrit: "अष्टम विशेष दृष्टि (100%)",
      strength: "100% Full Aspect",
      nature: "Transformation, Pranic Penetration & Sudden Changes"
    });
  } else if (normName === "jupiter" || normName.includes("guru") || normName.includes("brihaspati")) {
    aspectsList.push({
      offset: 5,
      label: "5th House (Special Guru Drishti)",
      sanskrit: "पञ्चम त्रिकोण दृष्टि (100%)",
      strength: "100% Full Aspect",
      nature: "Auspicious Dharma, Creative Intellect & Higher Wisdom"
    });
    aspectsList.push({
      offset: 9,
      label: "9th House (Special Guru Drishti)",
      sanskrit: "नवम त्रिकोण दृष्टि (100%)",
      strength: "100% Full Aspect",
      nature: "Divine Grace, Bhagya (Fortune) & Spiritual Blessing"
    });
  } else if (normName === "saturn" || normName.includes("shani")) {
    aspectsList.push({
      offset: 3,
      label: "3rd House (Special Shani Drishti)",
      sanskrit: "तृतीय विशेष दृष्टि (100%)",
      strength: "100% Full Aspect",
      nature: "Perseverance, Sustained Effort & Structural Discipline"
    });
    aspectsList.push({
      offset: 10,
      label: "10th House (Special Shani Drishti)",
      sanskrit: "दशम विशेष दृष्टि (100%)",
      strength: "100% Full Aspect",
      nature: "Karmic Duty, Career Responsibility & Endurance"
    });
  } else if (normName === "rahu" || normName.includes("north node")) {
    aspectsList.push({
      offset: 5,
      label: "5th House (Rahu Trine Aspect)",
      sanskrit: "पञ्चम छाया दृष्टि (100%)",
      strength: "100% Shadow Aspect",
      nature: "Obsessive Drive, Intuition & Unconventional Ambition"
    });
    aspectsList.push({
      offset: 9,
      label: "9th House (Rahu Trine Aspect)",
      sanskrit: "नवम छाया दृष्टि (100%)",
      strength: "100% Shadow Aspect",
      nature: "Global Exposure, Expansion & Disruptive Growth"
    });
  } else if (normName === "ketu" || normName.includes("south node")) {
    aspectsList.push({
      offset: 5,
      label: "5th House (Ketu Trine Aspect)",
      sanskrit: "पञ्चम मोक्ष दृष्टि (100%)",
      strength: "100% Shadow Aspect",
      nature: "Spiritual Insight, Subconscious Perception & Detachment"
    });
    aspectsList.push({
      offset: 9,
      label: "9th House (Ketu Trine Aspect)",
      sanskrit: "नवम मोक्ष दृष्टि (100%)",
      strength: "100% Shadow Aspect",
      nature: "Higher Truth, Occult Wisdom & Liberation"
    });
  }

  // Calculate target house number: 1-indexed (1 to 12)
  return aspectsList.map(a => {
    const targetHouse = ((fromHouse - 1 + a.offset - 1) % 12) + 1;
    return {
      targetHouse,
      offset: a.offset,
      label: a.label,
      sanskrit: a.sanskrit,
      strength: a.strength,
      nature: a.nature
    };
  });
}

interface KundliChartSVGProps {
  planets: PlanetPosition[];
  houses: HouseDetail[];
  lagnaSign: string;
  chartTitle?: string;
  onSelectDivisionalChart?: (chart: DivisionalChartType) => void;
  compact?: boolean;
}

export const KundliChartSVG: React.FC<KundliChartSVGProps> = ({
  planets: rawPlanets,
  houses: rawHouses,
  lagnaSign: rawLagnaSign,
  chartTitle = "D1 Rashi Chart",
  onSelectDivisionalChart,
  compact = false
}) => {
  const [selectedChart, setSelectedChart] = useState<DivisionalChartType>("D1");
  const [chartStyle, setChartStyle] = useState<"north" | "south" | "east">("north");
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetPosition | null>(null);
  const [chartZoom, setChartZoom] = useState<"medium" | "large" | "xlarge">("large");
  const [filterType, setFilterType] = useState<"all" | "benefic" | "malefic" | "retrograde">("all");

  // Helper for Category Icons
  const getCategoryIcon = (iconName: string, className = "w-3.5 h-3.5") => {
    switch (iconName) {
      case "User": return <User className={className} />;
      case "Coins": return <Coins className={className} />;
      case "Users": return <Users className={className} />;
      case "Home": return <Home className={className} />;
      case "Baby": return <Baby className={className} />;
      case "HeartHandshake": return <HeartHandshake className={className} />;
      case "Briefcase": return <Briefcase className={className} />;
      case "Shield": return <Shield className={className} />;
      case "Car": return <Car className={className} />;
      case "Sparkles": return <Sparkles className={className} />;
      case "GraduationCap": return <GraduationCap className={className} />;
      case "Compass": default: return <Compass className={className} />;
    }
  };

  // Calculate divisional positions for whichever chart is selected (D1 to D60)
  const activeChartData = useMemo(() => {
    if (!rawPlanets || !rawHouses) {
      return { planets: rawPlanets || [], houses: rawHouses || [], lagna: rawLagnaSign || "Aries" };
    }
    return calculateDivisionalChartData(rawPlanets, rawHouses, rawLagnaSign || "Aries", selectedChart);
  }, [rawPlanets, rawHouses, rawLagnaSign, selectedChart]);

  const planets = activeChartData?.planets || rawPlanets || [];
  const houses = activeChartData?.houses || rawHouses || [];
  const lagnaSign = activeChartData?.lagna || rawLagnaSign || "Aries";

  const handleChartChange = (chart: DivisionalChartType) => {
    playCardFlipSound();
    setSelectedChart(chart);
    if (onSelectDivisionalChart) onSelectDivisionalChart(chart);
  };

  // House geometry for North Indian Diamond Chart (1-12)
  const NORTH_INDIAN_DIAMONDS = useMemo(() => [
    { house: 1, labelX: 100, labelY: 62, planetsX: 100, planetsY: 38, cx: 100, cy: 50, points: "100,2 149,51 100,100 51,51" },     // House 1 (Top Center Diamond)
    { house: 2, labelX: 52, labelY: 30, planetsX: 50, planetsY: 18, cx: 51, cy: 22, points: "2,2 100,2 51,51" },                      // House 2 (Top Left Triangle)
    { house: 3, labelX: 30, labelY: 52, planetsX: 20, planetsY: 40, cx: 20, cy: 51, points: "2,2 51,51 2,100" },                      // House 3 (Far Top Left)
    { house: 4, labelX: 58, labelY: 100, planetsX: 42, planetsY: 88, cx: 51, cy: 100, points: "51,51 100,100 51,149 2,100" },          // House 4 (Center Left Diamond)
    { house: 5, labelX: 30, labelY: 148, planetsX: 20, planetsY: 160, cx: 20, cy: 149, points: "2,100 51,149 2,198" },                 // House 5 (Bottom Left)
    { house: 6, labelX: 52, labelY: 170, planetsX: 50, planetsY: 182, cx: 51, cy: 178, points: "2,198 100,198 51,149" },               // House 6 (Bottom Left Triangle)
    { house: 7, labelX: 100, labelY: 138, planetsX: 100, planetsY: 160, cx: 100, cy: 149, points: "100,100 149,149 100,198 51,149" },   // House 7 (Bottom Center Diamond)
    { house: 8, labelX: 148, labelY: 170, planetsX: 150, planetsY: 182, cx: 149, cy: 178, points: "100,198 198,198 149,149" },         // House 8 (Bottom Right Triangle)
    { house: 9, labelX: 170, labelY: 148, planetsX: 180, planetsY: 160, cx: 180, cy: 149, points: "149,149 198,100 198,198" },         // House 9 (Bottom Right)
    { house: 10, labelX: 142, labelY: 100, planetsX: 158, planetsY: 88, cx: 149, cy: 100, points: "149,51 198,100 149,149 100,100" },   // House 10 (Center Right Diamond)
    { house: 11, labelX: 170, labelY: 52, planetsX: 180, planetsY: 40, cx: 180, cy: 51, points: "149,51 198,2 198,100" },             // House 11 (Top Right)
    { house: 12, labelX: 148, labelY: 30, planetsX: 150, planetsY: 18, cx: 149, cy: 22, points: "100,2 198,2 149,51" }                 // House 12 (Top Right Triangle)
  ], []);

  // South Indian Fixed Zodiac Signs (Aries to Pisces clockwise)
  const SOUTH_INDIAN_BOXES = useMemo(() => [
    { sign: "Pisces", x: 2, y: 2, width: 49, height: 49, labelX: 8, labelY: 12, planetsX: 26, planetsY: 28, cx: 26, cy: 26 },
    { sign: "Aries", x: 51, y: 2, width: 49, height: 49, labelX: 57, labelY: 12, planetsX: 75, planetsY: 28, cx: 75, cy: 26 },
    { sign: "Taurus", x: 100, y: 2, width: 49, height: 49, labelX: 106, labelY: 12, planetsX: 124, planetsY: 28, cx: 124, cy: 26 },
    { sign: "Gemini", x: 149, y: 2, width: 49, height: 49, labelX: 155, labelY: 12, planetsX: 173, planetsY: 28, cx: 173, cy: 26 },

    { sign: "Cancer", x: 149, y: 51, width: 49, height: 49, labelX: 155, labelY: 61, planetsX: 173, planetsY: 77, cx: 173, cy: 75 },
    { sign: "Leo", x: 149, y: 100, width: 49, height: 49, labelX: 155, labelY: 110, planetsX: 173, planetsY: 126, cx: 173, cy: 124 },
    { sign: "Virgo", x: 149, y: 149, width: 49, height: 49, labelX: 155, labelY: 159, planetsX: 173, planetsY: 175, cx: 173, cy: 173 },

    { sign: "Libra", x: 100, y: 149, width: 49, height: 49, labelX: 106, labelY: 159, planetsX: 124, planetsY: 175, cx: 124, cy: 173 },
    { sign: "Scorpio", x: 51, y: 149, width: 49, height: 49, labelX: 57, labelY: 159, planetsX: 75, planetsY: 175, cx: 75, cy: 173 },
    { sign: "Sagittarius", x: 2, y: 149, width: 49, height: 49, labelX: 8, labelY: 159, planetsX: 26, planetsY: 175, cx: 26, cy: 173 },

    { sign: "Capricorn", x: 2, y: 100, width: 49, height: 49, labelX: 8, labelY: 110, planetsX: 26, planetsY: 126, cx: 26, cy: 124 },
    { sign: "Aquarius", x: 2, y: 51, width: 49, height: 49, labelX: 8, labelY: 61, planetsX: 26, planetsY: 77, cx: 26, cy: 75 }
  ], []);

  // East Indian Fixed Zodiac Signs
  const EAST_INDIAN_BOXES = useMemo(() => [
    { sign: "Aries", x: 51, y: 2, width: 49, height: 49, labelX: 57, labelY: 12, planetsX: 75, planetsY: 28, cx: 75, cy: 26 },
    { sign: "Taurus", x: 2, y: 2, width: 49, height: 49, labelX: 8, labelY: 12, planetsX: 26, planetsY: 28, cx: 26, cy: 26 },
    { sign: "Gemini", x: 2, y: 51, width: 49, height: 49, labelX: 8, labelY: 61, planetsX: 26, planetsY: 77, cx: 26, cy: 75 },
    { sign: "Cancer", x: 2, y: 100, width: 49, height: 49, labelX: 8, labelY: 110, planetsX: 26, planetsY: 126, cx: 26, cy: 124 },
    { sign: "Leo", x: 2, y: 149, width: 49, height: 49, labelX: 8, labelY: 159, planetsX: 26, planetsY: 175, cx: 26, cy: 173 },
    { sign: "Virgo", x: 51, y: 149, width: 49, height: 49, labelX: 57, labelY: 159, planetsX: 75, planetsY: 175, cx: 75, cy: 173 },
    { sign: "Libra", x: 100, y: 149, width: 49, height: 49, labelX: 106, labelY: 159, planetsX: 124, planetsY: 175, cx: 124, cy: 173 },
    { sign: "Scorpio", x: 149, y: 149, width: 49, height: 49, labelX: 155, labelY: 159, planetsX: 173, planetsY: 175, cx: 173, cy: 173 },
    { sign: "Sagittarius", x: 149, y: 100, width: 49, height: 49, labelX: 155, labelY: 110, planetsX: 173, planetsY: 126, cx: 173, cy: 124 },
    { sign: "Capricorn", x: 149, y: 51, width: 49, height: 49, labelX: 155, labelY: 61, planetsX: 173, planetsY: 77, cx: 173, cy: 75 },
    { sign: "Aquarius", x: 149, y: 2, width: 49, height: 49, labelX: 155, labelY: 12, planetsX: 173, planetsY: 28, cx: 173, cy: 26 },
    { sign: "Pisces", x: 100, y: 2, width: 49, height: 49, labelX: 106, labelY: 12, planetsX: 124, planetsY: 28, cx: 124, cy: 26 }
  ], []);

  // Lagna index for sign calculations
  const lagnaIdx = useMemo(() => {
    const target = String(lagnaSign || "Aries").toLowerCase();
    const idx = RASHIS.findIndex((r: any) => {
      const name = String(typeof r === "string" ? r : r?.name || r?.englishName || "").toLowerCase();
      const sanskrit = String(typeof r === "string" ? "" : r?.sanskrit || "").toLowerCase();
      return name === target || name.startsWith(target.slice(0, 3)) || (sanskrit && sanskrit === target);
    });
    return idx >= 0 ? idx : 0;
  }, [lagnaSign]);

  // Compute aspects of the currently selected planet
  const selectedPlanetAspects = useMemo(() => {
    if (!selectedPlanet || !selectedPlanet.house) return [];
    return getVedicAspectsForPlanet(selectedPlanet.name, selectedPlanet.house);
  }, [selectedPlanet]);

  const aspectedHouseNumbers = useMemo(() => {
    return new Set(selectedPlanetAspects.map(a => a.targetHouse));
  }, [selectedPlanetAspects]);

  // Map of aspected signs for South and East Indian chart styles
  const aspectedSignMap = useMemo(() => {
    const map = new Map<string, PlanetAspect>();
    selectedPlanetAspects.forEach((asp) => {
      const rItem = RASHIS[(lagnaIdx + (asp.targetHouse - 1)) % 12];
      const signName = typeof rItem === "string" ? rItem : rItem?.name || rItem?.englishName || "";
      if (signName) {
        map.set(String(signName).toLowerCase(), asp);
      }
    });
    return map;
  }, [selectedPlanetAspects, lagnaIdx]);

  // Selected planet coordinates on chart (North Indian diamond)
  const selectedSourceCoord = useMemo(() => {
    if (!selectedPlanet || !selectedPlanet.house) return null;
    const h = NORTH_INDIAN_DIAMONDS.find(d => d.house === selectedPlanet.house);
    return h ? { x: h.cx, y: h.cy } : null;
  }, [selectedPlanet, NORTH_INDIAN_DIAMONDS]);

  // Filtered planets for list
  const filteredPlanets = useMemo(() => {
    return planets.filter(p => {
      if (filterType === "all") return true;
      if (filterType === "retrograde") return p.isRetrograde;
      const isBenefic = ["Jupiter", "Venus", "Moon", "Mercury"].includes(p.name);
      if (filterType === "benefic") return isBenefic;
      if (filterType === "malefic") return !isBenefic;
      return true;
    });
  }, [planets, filterType]);

  // Noticeably enlarged container width based on chartZoom so user can easily read the chart
  const chartContainerClass = useMemo(() => {
    if (compact) return "w-full max-w-[380px]";
    switch (chartZoom) {
      case "medium": return "w-full max-w-[480px]";
      case "xlarge": return "w-full max-w-[700px] xl:max-w-[740px]";
      case "large":
      default:
        return "w-full max-w-[580px] xl:max-w-[620px]";
    }
  }, [compact, chartZoom]);

  return (
    <div className={`bg-[#FAF8F5] dark:bg-slate-900/90 rounded-3xl border border-amber-900/10 dark:border-amber-500/20 shadow-xs space-y-4 ${compact ? "p-4" : "p-6"}`}>
      {/* Top Header & Chart Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-900/10 dark:border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-700 dark:text-amber-400">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>{chartTitle || `Vedic Kundli (${selectedChart})`}</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300/40">
                  {selectedChart}
                </span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Ascendant (Lagna): <strong className="text-amber-700 dark:text-amber-400 font-bold">{lagnaSign}</strong> • System: {chartStyle === "north" ? "North Indian Diamond" : chartStyle === "south" ? "South Indian Square" : "East Indian Grid"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end flex-wrap">
          {/* Chart Size Controls */}
          {!compact && (
            <div className="flex items-center gap-1 bg-amber-100/60 dark:bg-slate-800 p-1 rounded-xl text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              <span className="px-1.5 text-[10px] text-slate-500">Size:</span>
              <button
                onClick={() => setChartZoom("medium")}
                className={`px-2 py-0.5 rounded-lg transition-all ${
                  chartZoom === "medium" ? "bg-white dark:bg-slate-700 text-slate-950 dark:text-amber-300 shadow-xs font-bold" : "hover:text-slate-950"
                }`}
                title="Medium Size"
              >
                Med
              </button>
              <button
                onClick={() => setChartZoom("large")}
                className={`px-2 py-0.5 rounded-lg transition-all ${
                  chartZoom === "large" ? "bg-white dark:bg-slate-700 text-slate-950 dark:text-amber-300 shadow-xs font-bold" : "hover:text-slate-950"
                }`}
                title="Large Size (Default)"
              >
                Large
              </button>
              <button
                onClick={() => setChartZoom("xlarge")}
                className={`px-2 py-0.5 rounded-lg transition-all ${
                  chartZoom === "xlarge" ? "bg-white dark:bg-slate-700 text-slate-950 dark:text-amber-300 shadow-xs font-bold" : "hover:text-slate-950"
                }`}
                title="Extra Large Size"
              >
                XL
              </button>
            </div>
          )}

          {/* Format Toggle (North / South / East) */}
          <div className="flex bg-amber-100/60 dark:bg-slate-800 p-1 rounded-xl text-[11px] font-semibold text-slate-700 dark:text-slate-300">
            <button
              onClick={() => setChartStyle("north")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                chartStyle === "north" ? "bg-slate-900 dark:bg-amber-500 text-amber-300 dark:text-slate-950 shadow-xs font-bold" : "hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              North
            </button>
            <button
              onClick={() => setChartStyle("south")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                chartStyle === "south" ? "bg-slate-900 dark:bg-amber-500 text-amber-300 dark:text-slate-950 shadow-xs font-bold" : "hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              South
            </button>
            <button
              onClick={() => setChartStyle("east")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                chartStyle === "east" ? "bg-slate-900 dark:bg-amber-500 text-amber-300 dark:text-slate-950 shadow-xs font-bold" : "hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              East
            </button>
          </div>
        </div>
      </div>

      {/* 12 Categorized Divisional Chart Cards (D1 - D60) */}
      {!compact && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              Divisional Charts by Life Domain (12 Categories)
            </span>
            <span className="text-[11px] font-semibold text-amber-900 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-300/40">
              Active: <span className="font-bold">{selectedChart}</span> ({VARGA_CATEGORIES.flatMap(c => c.charts).find(c => c.id === selectedChart)?.name || selectedChart})
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {VARGA_CATEGORIES.map((cat) => {
              const isSelected = cat.charts.some((c) => c.id === selectedChart);
              const isAdvancedCategory = cat.id === "advanced";
              const primaryChart = cat.charts[0];

              return (
                <div
                  key={cat.id}
                  onMouseEnter={playCardHoverSound}
                  onClick={() => {
                    if (!isAdvancedCategory) {
                      handleChartChange(primaryChart.id);
                    } else if (!cat.charts.some(c => c.id === selectedChart)) {
                      handleChartChange("D27");
                    }
                  }}
                  className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-1.5 relative overflow-hidden group ${
                    isSelected
                      ? "bg-slate-900 text-white border-amber-500 shadow-md ring-1 ring-amber-400 scale-[1.02]"
                      : "bg-white dark:bg-slate-800/80 hover:bg-amber-50/80 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border-amber-900/10 dark:border-slate-700 hover:border-amber-400"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div
                        className={`p-1 rounded-lg shrink-0 ${
                          isSelected
                            ? "bg-amber-400 text-slate-950 font-bold"
                            : "bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 group-hover:bg-amber-200"
                        }`}
                      >
                        {getCategoryIcon(cat.iconName, "w-3 h-3")}
                      </div>
                      <div className="min-w-0">
                        <div className={`font-serif font-bold text-xs truncate ${isSelected ? "text-amber-200" : "text-slate-900 dark:text-slate-100"}`}>
                          {cat.name}
                        </div>
                        <div className={`text-[9px] truncate ${isSelected ? "text-amber-300/80" : "text-slate-400"}`}>
                          {cat.sanskritName}
                        </div>
                      </div>
                    </div>

                    {!isAdvancedCategory && (
                      <span
                        className={`text-[10px] font-black px-1.5 py-0.5 rounded-md shrink-0 ${
                          isSelected
                            ? "bg-amber-400 text-slate-950"
                            : "bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300"
                        }`}
                      >
                        {primaryChart.code}
                      </span>
                    )}
                  </div>

                  {isAdvancedCategory ? (
                    <div className="space-y-1 pt-0.5">
                      <div className={`text-[9px] font-semibold ${isSelected ? "text-amber-300" : "text-slate-500 dark:text-slate-400"}`}>
                        Select Subtle Varga:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {cat.charts.map((subChart) => {
                          const isSubActive = selectedChart === subChart.id;
                          return (
                            <button
                              key={subChart.id}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleChartChange(subChart.id);
                              }}
                              className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-all ${
                                isSubActive
                                  ? "bg-amber-400 text-slate-950 shadow-xs scale-105"
                                  : isSelected
                                  ? "bg-white/15 text-slate-200 hover:bg-white/30"
                                  : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-amber-200 hover:text-slate-900"
                              }`}
                              title={`${subChart.code} — ${subChart.name}: ${subChart.desc}`}
                            >
                              {subChart.code}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className={`text-[9px] line-clamp-1 leading-tight ${isSelected ? "text-slate-300" : "text-slate-500 dark:text-slate-400"}`}>
                      {primaryChart.desc.split("(")[0].trim()}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive Active Aspect Focus Banner */}
      {selectedPlanet && (
        <div className="bg-amber-500/15 border border-amber-500/40 rounded-2xl p-3 flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-sm shadow-xs">
              👁
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Active Aspect Focus: <span className="text-amber-700 dark:text-amber-400">{selectedPlanet.name}</span> (House {selectedPlanet.house} in {selectedPlanet.sign})
                </span>
                <span className="text-[10px] bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-300 px-2 py-0.5 rounded-full font-bold">
                  {selectedPlanetAspects.length} Aspects Active
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                Aspecting: {selectedPlanetAspects.map(a => `H${a.targetHouse} (${a.offset}th)`).join(" • ")}. Click any planet to change focus.
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedPlanet(null)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-semibold text-xs flex items-center gap-1 transition-all cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear Aspect Lines</span>
          </button>
        </div>
      )}

      {/* Main Grid: Bigger Birth Chart on Left + Detailed Planetary Placements on Right */}
      <div className={compact ? "space-y-6" : "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"}>
        {/* Left Column: Enlarged Birth Chart */}
        <div className={compact ? "flex flex-col items-center" : "lg:col-span-7 flex flex-col items-center space-y-3"}>
          {/* Chart Wrapper Container with Noticeable Enlarged Size */}
          <div className={`relative ${chartContainerClass} aspect-square bg-[#FFFDF8] dark:bg-slate-950 rounded-3xl p-3 sm:p-5 lg:p-6 border-2 border-amber-800/30 dark:border-amber-500/30 shadow-xl transition-all duration-300 overflow-hidden`}>
            {/* SVG Markers for Directional Aspect Rays */}
            <svg viewBox="0 0 200 200" className="w-full h-full font-sans select-none drop-shadow-xs">
              <defs>
                <marker
                  id="aspect-arrow"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#D97706" />
                </marker>
                <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {chartStyle === "north" ? (
                <>
                  {/* Outer Frame */}
                  <rect x="2" y="2" width="196" height="196" fill="#FFFDF8" stroke="#8B5E34" strokeWidth="2" />

                  {/* Render House Background Highlights for Aspects / Selection */}
                  {NORTH_INDIAN_DIAMONDS.map((hConfig) => {
                    const isSourceHouse = selectedPlanet && selectedPlanet.house === hConfig.house;
                    const isTargetAspectHouse = aspectedHouseNumbers.has(hConfig.house);
                    
                    if (isSourceHouse) {
                      return (
                        <polygon
                          key={`bg-${hConfig.house}`}
                          points={hConfig.points}
                          fill="rgba(245, 158, 11, 0.25)"
                          stroke="#D97706"
                          strokeWidth="2"
                          filter="url(#glow-gold)"
                        />
                      );
                    }
                    if (isTargetAspectHouse) {
                      return (
                        <polygon
                          key={`bg-${hConfig.house}`}
                          points={hConfig.points}
                          fill="rgba(16, 185, 129, 0.18)"
                          stroke="#059669"
                          strokeWidth="1.6"
                          strokeDasharray="5,2.5"
                        />
                      );
                    }
                    return null;
                  })}

                  {/* Outer Diagonals & Center Diamond Lines */}
                  <line x1="2" y1="2" x2="198" y2="198" stroke="#8B5E34" strokeWidth="1.2" />
                  <line x1="198" y1="2" x2="2" y2="198" stroke="#8B5E34" strokeWidth="1.2" />
                  
                  {/* Inner Diamond */}
                  <polygon points="100,2 198,100 100,198 2,100" fill="none" stroke="#8B5E34" strokeWidth="1.5" />

                  {/* Dynamic Aspect Rays from Source Planet House to Target Aspected Houses */}
                  {selectedSourceCoord && selectedPlanetAspects.map((asp) => {
                    const targetConfig = NORTH_INDIAN_DIAMONDS.find(d => d.house === asp.targetHouse);
                    if (!targetConfig) return null;
                    return (
                      <g key={`aspect-ray-${asp.targetHouse}`}>
                        <line
                          x1={selectedSourceCoord.x}
                          y1={selectedSourceCoord.y}
                          x2={targetConfig.cx}
                          y2={targetConfig.cy}
                          stroke="#D97706"
                          strokeWidth="1.8"
                          strokeDasharray="4,2.5"
                          markerEnd="url(#aspect-arrow)"
                          opacity="0.9"
                        />
                        {/* Aspect Badge on Target House */}
                        <g transform={`translate(${targetConfig.cx}, ${targetConfig.cy - 12})`}>
                          <rect
                            x="-16"
                            y="-6"
                            width="32"
                            height="12"
                            rx="6"
                            fill="#065F46"
                            stroke="#34D399"
                            strokeWidth="1"
                          />
                          <text
                            x="0"
                            y="2.5"
                            fontSize="5.2"
                            fontWeight="bold"
                            fill="#FFFFFF"
                            textAnchor="middle"
                          >
                            👁 {asp.offset}th
                          </text>
                        </g>
                      </g>
                    );
                  })}

                  {/* Houses Numbers & Clickable Planet Badges */}
                  {NORTH_INDIAN_DIAMONDS.map((hConfig) => {
                    const houseInfo = houses.find((h) => h.houseNumber === hConfig.house);
                    const housePlanets = planets.filter((p) => p.house === hConfig.house);

                    const resolvedLagnaIdx = lagnaIdx >= 0 ? lagnaIdx : 0;
                    const houseSignStr = String(houseInfo?.sign || "").toLowerCase();
                    const houseSignIdx = houseSignStr
                      ? RASHIS.findIndex((r: any) => String(typeof r === "string" ? r : r?.name || r?.englishName || "").toLowerCase() === houseSignStr)
                      : -1;
                    const rashiNumber = houseSignIdx >= 0
                      ? houseSignIdx + 1
                      : ((resolvedLagnaIdx + (hConfig.house - 1)) % 12) + 1;

                    return (
                      <g key={hConfig.house}>
                        {/* House Zodiac Sign Number with Enhanced Readability */}
                        <text
                          x={hConfig.labelX}
                          y={hConfig.labelY}
                          fontSize="7.8"
                          fontWeight="bold"
                          fill="#996515"
                          textAnchor="middle"
                        >
                          {rashiNumber}
                        </text>

                        {/* Interactive Clickable Planet Badges */}
                        {housePlanets.length > 0 && (
                          <g transform={`translate(${hConfig.planetsX}, ${hConfig.planetsY})`}>
                            {housePlanets.map((pl, pIdx) => {
                              const isThisPlanetSelected = selectedPlanet?.name === pl.name;
                              const meta = VEDIC_GRAHA_META[pl.name] || { color: "#1E1B18" };
                              const yOffset = (pIdx - (housePlanets.length - 1) / 2) * 13;

                              return (
                                <g
                                  key={pl.name}
                                  transform={`translate(0, ${yOffset})`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    playCardHoverSound();
                                    setSelectedPlanet(isThisPlanetSelected ? null : pl);
                                  }}
                                  className="cursor-pointer group"
                                >
                                  {/* Clickable Pill Background */}
                                  <rect
                                    x="-14.5"
                                    y="-6"
                                    width="29"
                                    height="12"
                                    rx="4.5"
                                    fill={isThisPlanetSelected ? "#FEF3C7" : "#FFFFFF"}
                                    stroke={isThisPlanetSelected ? "#D97706" : meta.color}
                                    strokeWidth={isThisPlanetSelected ? "1.8" : "1"}
                                    className="transition-all duration-150 group-hover:scale-110 shadow-xs"
                                  />

                                  {/* Planet Label */}
                                  <text
                                    x="0"
                                    y="2"
                                    fontSize="6.6"
                                    fontWeight="bold"
                                    fill={meta.color}
                                    textAnchor="middle"
                                  >
                                    {pl.name.substring(0, 2)}
                                    {pl.isRetrograde ? "ᴿ" : ""}
                                  </text>
                                </g>
                              );
                            })}
                          </g>
                        )}
                      </g>
                    );
                  })}

                  {/* Center Ascendant Badge */}
                  <circle cx="100" cy="100" r="15.5" fill="#1E1B18" stroke="#D4AF37" strokeWidth="1.6" />
                  <text x="100" y="97.5" fill="#D4AF37" fontSize="6.2" fontWeight="bold" textAnchor="middle">
                    Asc
                  </text>
                  <text x="100" y="105.5" fill="#FFFFFF" fontSize="5.2" fontWeight="bold" textAnchor="middle">
                    {lagnaSign.substring(0, 3)}
                  </text>
                </>
              ) : (
                <>
                  {/* South / East Indian Square Grid */}
                  <rect x="2" y="2" width="196" height="196" fill="#FFFDF8" stroke="#8B5E34" strokeWidth="2" />
                  <rect x="51" y="51" width="98" height="98" fill="#FDFBF7" stroke="#8B5E34" strokeWidth="1.5" />
                  
                  {/* Grid Lines */}
                  <line x1="51" y1="2" x2="51" y2="198" stroke="#8B5E34" strokeWidth="1.2" />
                  <line x1="100" y1="2" x2="100" y2="198" stroke="#8B5E34" strokeWidth="1.2" />
                  <line x1="149" y1="2" x2="149" y2="198" stroke="#8B5E34" strokeWidth="1.2" />
                  
                  <line x1="2" y1="51" x2="198" y2="51" stroke="#8B5E34" strokeWidth="1.2" />
                  <line x1="2" y1="100" x2="198" y2="100" stroke="#8B5E34" strokeWidth="1.2" />
                  <line x1="2" y1="149" x2="198" y2="149" stroke="#8B5E34" strokeWidth="1.2" />

                  {/* Boxes */}
                  {(chartStyle === "south" ? SOUTH_INDIAN_BOXES : EAST_INDIAN_BOXES).map((box) => {
                    const boxSignStr = String(box?.sign || "").toLowerCase();
                    const signPlanets = planets.filter((p) => String(p?.sign || "").toLowerCase() === boxSignStr);
                    const isLagnaSign = String(lagnaSign || "").toLowerCase() === boxSignStr;
                    const isSourceBox = selectedPlanet && String(selectedPlanet?.sign || "").toLowerCase() === boxSignStr;
                    const targetAspect = aspectedSignMap.get(boxSignStr);

                    return (
                      <g key={box.sign}>
                        {isSourceBox && (
                          <rect
                            x={box.x}
                            y={box.y}
                            width={box.width}
                            height={box.height}
                            fill="rgba(245, 158, 11, 0.25)"
                            stroke="#D97706"
                            strokeWidth="2"
                            filter="url(#glow-gold)"
                          />
                        )}

                        {targetAspect && (
                          <>
                            <rect
                              x={box.x}
                              y={box.y}
                              width={box.width}
                              height={box.height}
                              fill="rgba(16, 185, 129, 0.16)"
                              stroke="#059669"
                              strokeWidth="1.6"
                              strokeDasharray="4,2"
                            />
                            {/* Target Aspect Badge on Box */}
                            <g transform={`translate(${box.cx}, ${box.cy - 12})`}>
                              <rect
                                x="-15"
                                y="-5.5"
                                width="30"
                                height="11"
                                rx="5"
                                fill="#065F46"
                                stroke="#34D399"
                                strokeWidth="0.8"
                              />
                              <text
                                x="0"
                                y="2"
                                fontSize="4.8"
                                fontWeight="bold"
                                fill="#FFFFFF"
                                textAnchor="middle"
                              >
                                👁 {targetAspect.offset}th
                              </text>
                            </g>
                          </>
                        )}

                        <text
                          x={box.labelX}
                          y={box.labelY}
                          fontSize="6.2"
                          fontWeight="bold"
                          fill={isLagnaSign ? "#B91C1C" : "#8B5E34"}
                        >
                          {box.sign.substring(0, 3)} {isLagnaSign ? "(Asc)" : ""}
                        </text>

                        {/* Interactive Planet Badges in Sign Box */}
                        {signPlanets.length > 0 && (
                          <g transform={`translate(${box.planetsX}, ${box.planetsY})`}>
                            {signPlanets.map((pl, pIdx) => {
                              const isThisPlanetSelected = selectedPlanet?.name === pl.name;
                              const meta = VEDIC_GRAHA_META[pl.name] || { color: "#1E1B18" };
                              const yOffset = (pIdx - (signPlanets.length - 1) / 2) * 11;

                              return (
                                <g
                                  key={pl.name}
                                  transform={`translate(0, ${yOffset})`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    playCardHoverSound();
                                    setSelectedPlanet(isThisPlanetSelected ? null : pl);
                                  }}
                                  className="cursor-pointer group"
                                >
                                  <rect
                                    x="-12"
                                    y="-5"
                                    width="24"
                                    height="10"
                                    rx="3.5"
                                    fill={isThisPlanetSelected ? "#FEF3C7" : "#FFFFFF"}
                                    stroke={isThisPlanetSelected ? "#D97706" : meta.color}
                                    strokeWidth={isThisPlanetSelected ? "1.8" : "0.9"}
                                    className="transition-all duration-150 group-hover:scale-110"
                                  />
                                  <text
                                    x="0"
                                    y="2"
                                    fontSize="6"
                                    fontWeight="bold"
                                    fill={meta.color}
                                    textAnchor="middle"
                                  >
                                    {pl.name.substring(0, 2)}{pl.isRetrograde ? "ᴿ" : ""}
                                  </text>
                                </g>
                              );
                            })}
                          </g>
                        )}
                      </g>
                    );
                  })}

                  {/* South/East Dynamic Aspect Rays from Source Box to Target Aspected Boxes */}
                  {selectedPlanet && (
                    (() => {
                      const currentBoxes = chartStyle === "south" ? SOUTH_INDIAN_BOXES : EAST_INDIAN_BOXES;
                      const sourceSignStr = String(selectedPlanet?.sign || "").toLowerCase();
                      const sourceBox = currentBoxes.find(b => String(b?.sign || "").toLowerCase() === sourceSignStr);
                      if (!sourceBox) return null;
                      return selectedPlanetAspects.map(asp => {
                        const targetRashi = RASHIS[(lagnaIdx + (asp.targetHouse - 1)) % 12];
                        const targetSignName = typeof targetRashi === "string" ? targetRashi : targetRashi?.name || targetRashi?.englishName || "";
                        const targetSignStr = String(targetSignName || "").toLowerCase();
                        const targetBox = targetSignStr ? currentBoxes.find(b => String(b?.sign || "").toLowerCase() === targetSignStr) : null;
                        if (!targetBox) return null;
                        return (
                          <g key={`aspect-ray-se-${asp.targetHouse}`}>
                            <line
                              x1={sourceBox.cx}
                              y1={sourceBox.cy}
                              x2={targetBox.cx}
                              y2={targetBox.cy}
                              stroke="#D97706"
                              strokeWidth="1.6"
                              strokeDasharray="4,2.5"
                              markerEnd="url(#aspect-arrow)"
                              opacity="0.85"
                            />
                          </g>
                        );
                      });
                    })()
                  )}

                  <text x="100" y="96" fill="#8B5E34" fontSize="7" fontWeight="bold" textAnchor="middle">
                    {chartStyle === "south" ? "South Indian" : "East Indian"}
                  </text>
                  <text x="100" y="106" fill="#1E1B18" fontSize="6" textAnchor="middle">
                    Lagna: {lagnaSign}
                  </text>
                </>
              )}
            </svg>
          </div>

          {/* Quick Helper caption below Chart */}
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              Click any planet badge to project full Vedic aspects (Drishti)
            </span>
          </div>
        </div>

        {/* Right Column: DETAILED Planetary Placements & Aspects Section (Beside Birth Chart) */}
        <div className={compact ? "space-y-4" : "lg:col-span-5 space-y-4 w-full"}>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-amber-900/10 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h4 className="font-serif font-bold text-slate-900 dark:text-slate-100 text-sm">
                Detailed Planetary Placements &amp; Aspects
              </h4>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300">
              {planets.length} Grahas (Spashta)
            </span>
          </div>

          {/* Detailed Aspect Focus Card (Shows when a planet is selected) */}
          {selectedPlanet ? (
            <div className="bg-amber-50/90 dark:bg-amber-950/40 p-4 rounded-2xl border-2 border-amber-500/50 shadow-sm space-y-3 animate-in fade-in">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-lg font-bold text-slate-900 dark:text-amber-200">
                      {selectedPlanet.name}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {VEDIC_GRAHA_META[selectedPlanet.name]?.sanskrit || ""}
                    </span>
                    {selectedPlanet.isRetrograde && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-300">
                        VAKRI (R)
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-amber-900/80 dark:text-amber-300/80 mt-0.5 font-medium">
                    {VEDIC_GRAHA_META[selectedPlanet.name]?.karaka || "Karmic Indicator"}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedPlanet(null)}
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
                  title="Close Inspector"
                >
                  ✕
                </button>
              </div>

              {/* Core Placement Details Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-white dark:bg-slate-900 p-3 rounded-xl border border-amber-900/10 dark:border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Sign (Rashi)</span>
                  <strong className="text-slate-900 dark:text-slate-100 font-serif">{selectedPlanet.sign}</strong>
                  <span className="text-[10px] text-slate-500 block">({selectedPlanet.degreeFormatted})</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">House (Bhava)</span>
                  <strong className="text-slate-900 dark:text-slate-100">House #{selectedPlanet.house}</strong>
                  <span className="text-[10px] text-slate-500 block truncate">
                    {HOUSE_NAMES_VEDIC[selectedPlanet.house]?.english || ""}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Nakshatra &amp; Pada</span>
                  <strong className="text-slate-900 dark:text-slate-100">{selectedPlanet.nakshatra}</strong>
                  <span className="text-[10px] text-slate-500 block">Pada {selectedPlanet.pada || 1}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Dignity (Avastha)</span>
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                    selectedPlanet.dignity === "Exalted"
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                      : selectedPlanet.dignity === "Debilitated"
                      ? "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
                      : "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                  }`}>
                    {selectedPlanet.dignity || "Normal"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Deity &amp; Day</span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {VEDIC_GRAHA_META[selectedPlanet.name]?.deity?.split("/")[0] || "Graha Devata"}
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {VEDIC_GRAHA_META[selectedPlanet.name]?.day?.split("(")[0] || ""}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Gemstone (Ratna)</span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {VEDIC_GRAHA_META[selectedPlanet.name]?.gemstone?.split("(")[0] || "Natural"}
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {VEDIC_GRAHA_META[selectedPlanet.name]?.nature?.split("(")[0] || ""}
                  </span>
                </div>
              </div>

              {/* Vedic Aspects (Drishti) Breakdown */}
              <div className="space-y-2 border-t border-amber-900/10 dark:border-slate-800 pt-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  Vedic Planetary Aspects (Drishti) Cast by {selectedPlanet.name}:
                </span>

                <div className="space-y-1.5">
                  {selectedPlanetAspects.map((asp) => {
                    const aspectedHouseInfo = houses.find(h => h.houseNumber === asp.targetHouse);
                    const receivingPlanets = planets.filter(p => p.house === asp.targetHouse);

                    return (
                      <div
                        key={asp.targetHouse}
                        className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-amber-500/20 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between font-semibold">
                          <span className="text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                            <ArrowRight className="w-3 h-3 text-amber-600" />
                            House {asp.targetHouse} ({aspectedHouseInfo?.sign || "Sign"})
                          </span>
                          <span className="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-md font-bold">
                            {asp.label.split("(")[0].trim()}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-600 dark:text-slate-300">
                          {receivingPlanets.length > 0 ? (
                            <span>
                              Aspecting Grahas: <strong className="text-slate-900 dark:text-white">{receivingPlanets.map(p => p.name).join(", ")}</strong>
                            </span>
                          ) : (
                            <span className="italic text-slate-400">Empty House • Casts aspect on house domain ({HOUSE_NAMES_VEDIC[asp.targetHouse]?.domain.split(",")[0]})</span>
                          )}
                        </div>

                        <div className="text-[10px] text-slate-400 dark:text-slate-500">
                          {asp.nature} • {asp.sanskrit}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-slate-800/50 border border-amber-900/10 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Info className="w-4 h-4" />
              </div>
              <p>
                Click any planet on the birth chart or in the list below to inspect its detailed Vedic degree, Nakshatra lord, and project its full planetary aspects (Drishti).
              </p>
            </div>
          )}

          {/* Quick Filter Pill Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setFilterType("all")}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                filterType === "all"
                  ? "bg-slate-900 text-amber-300 shadow-xs"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              }`}
            >
              All ({planets.length})
            </button>
            <button
              onClick={() => setFilterType("benefic")}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                filterType === "benefic"
                  ? "bg-slate-900 text-amber-300 shadow-xs"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              }`}
            >
              Benefics
            </button>
            <button
              onClick={() => setFilterType("malefic")}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                filterType === "malefic"
                  ? "bg-slate-900 text-amber-300 shadow-xs"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              }`}
            >
              Malefics
            </button>
            <button
              onClick={() => setFilterType("retrograde")}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                filterType === "retrograde"
                  ? "bg-slate-900 text-amber-300 shadow-xs"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              }`}
            >
              Retrograde
            </button>
          </div>

          {/* Comprehensive Detailed Planetary Placements List */}
          <div className="space-y-2 max-h-[520px] lg:max-h-[580px] overflow-y-auto pr-1 no-scrollbar">
            {filteredPlanets.map((p) => {
              const isSelected = selectedPlanet?.name === p.name;
              const meta = VEDIC_GRAHA_META[p.name] || { sanskrit: "", color: "#D97706" };
              const aspects = getVedicAspectsForPlanet(p.name, p.house);

              return (
                <div
                  key={p.name}
                  onClick={() => {
                    playCardHoverSound();
                    setSelectedPlanet(isSelected ? null : p);
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                    isSelected
                      ? "bg-amber-50 dark:bg-slate-800 border-amber-500 shadow-md ring-1 ring-amber-400"
                      : "bg-white dark:bg-slate-800/70 hover:bg-amber-50/50 dark:hover:bg-slate-800 border-amber-900/10 dark:border-slate-700 hover:border-amber-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: meta.color }}
                      />
                      <span className="font-serif font-bold text-sm text-slate-900 dark:text-slate-100">
                        {p.name}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {meta.sanskrit.split("(")[0]}
                      </span>
                      {p.isRetrograde && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300">
                          R
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {p.dignity === "Exalted" && (
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-1.5 py-0.5 rounded">
                          Exalted
                        </span>
                      )}
                      {p.dignity === "Debilitated" && (
                        <span className="text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 px-1.5 py-0.5 rounded">
                          Debilitated
                        </span>
                      )}
                      <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                        House {p.house}
                      </span>
                    </div>
                  </div>

                  {/* Placement Coordinates Details */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px] text-slate-600 dark:text-slate-300 pt-1 border-t border-slate-100 dark:border-slate-700/60">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Rashi &amp; Degree</span>
                      <strong>{p.sign}</strong> • {p.degreeFormatted}
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Nakshatra</span>
                      <strong>{p.nakshatra}</strong> (P{p.pada || 1})
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-slate-400 text-[10px] block">Vedic Aspects</span>
                      <span className="font-semibold text-amber-700 dark:text-amber-400">
                        H{aspects.map(a => a.targetHouse).join(", H")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
