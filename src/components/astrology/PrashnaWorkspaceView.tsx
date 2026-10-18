import React, { useState, useMemo, useEffect } from "react";
import { 
  Compass, 
  HelpCircle, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Activity, 
  Layers, 
  Send, 
  RefreshCw, 
  Info, 
  MapPin, 
  Calendar, 
  Eye, 
  Check, 
  Zap, 
  RotateCcw,
  Target,
  Flame,
  Award,
  BookOpen,
  ChevronRight,
  TrendingUp,
  Volume2,
  Play,
  Pause,
  ArrowRight,
  Filter,
  Sliders,
  Star,
  Search,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { MasterPrashnaEngine } from "../../engine/prashna/masterPrashnaEngine";
import { PrashnaCategory } from "../../engine/prashna/prashnaTypes";
import { AstroBadge, AstroButton } from "../astronext/AstroDesignSystem";
import { calculateSiderealChart } from "../../engine/index";
import { KundliChartSVG } from "../KundliChartSVG";
import { UserProfile, PlanetPosition, HouseDetail } from "../../types";
import { 
  DivisionalChartsEngine, 
  DIVISIONAL_METADATA, 
  DivisionalChartResult, 
  VargaPlanetPlacement 
} from "../../engine/divisionalChartsEngine";
import { RASHIS, RASHI_LORDS, NAKSHATRAS_MASTER } from "../../data/astrologyData";
import { calculateLocationSunriseSunset, GLOBAL_CITIES, CityLocation } from "../../utils/vedicAstronomicalEngine";
import { calculateAuthoritativePanchang } from "../../engine/panchangEngine";

interface PrashnaWorkspaceViewProps {
  userProfile?: UserProfile;
  initialAscendantLongitude?: number;
  planets?: Record<string, { longitude: number; name?: string; isRetrograde?: boolean; speedLongitudeDegPerDay?: number; dignity?: string }>;
}

// 12 Comprehensive Prashna Question Templates
export interface PrashnaCategoryTemplate {
  id: string;
  category: PrashnaCategory;
  question: string;
  primaryHouse: number;
  secondaryHouses: number[];
  significators: string[];
  recommendedVargas: string[]; // e.g. ["D10", "D9"]
  icon: string;
  sanskritBhava: string;
}

export const PRASHNA_TEMPLATES: PrashnaCategoryTemplate[] = [
  {
    id: "career_promotion",
    category: "Promotion & Career Advancement",
    question: "Will I secure the job promotion, senior leadership role, or new executive appointment?",
    primaryHouse: 10,
    secondaryHouses: [1, 6, 11],
    significators: ["Sun", "Mercury", "Saturn"],
    recommendedVargas: ["D10", "D1", "D9"],
    icon: "💼",
    sanskritBhava: "दशम भाव (राज्य / कर्म भाव - Career & Status)"
  },
  {
    id: "marriage_relationship",
    category: "Marriage & Relationship Union",
    question: "Will this proposal, relationship, or marriage alliance culminate in a harmonious union?",
    primaryHouse: 7,
    secondaryHouses: [1, 2, 11],
    significators: ["Venus", "Jupiter", "Moon"],
    recommendedVargas: ["D9", "D1", "D7"],
    icon: "💍",
    sanskritBhava: "सप्तम भाव (कलत्र भाव - Marriage & Partnerships)"
  },
  {
    id: "wealth_finance",
    category: "Financial Gain & Wealth Recovery",
    question: "Will this investment, deal, or recovery of stuck funds yield substantial financial profits?",
    primaryHouse: 2,
    secondaryHouses: [1, 5, 9, 11],
    significators: ["Jupiter", "Mercury", "Venus"],
    recommendedVargas: ["D2", "D4", "D1"],
    icon: "💰",
    sanskritBhava: "द्वितीय / एकादश भाव (धन व लाभ भाव - Wealth & Inflow)"
  },
  {
    id: "health_recovery",
    category: "Health, Illness & Medical Recovery",
    question: "Will the illness be successfully diagnosed and treated with swift, complete medical recovery?",
    primaryHouse: 1,
    secondaryHouses: [6, 8, 11],
    significators: ["Sun", "Moon", "Mars"],
    recommendedVargas: ["D8", "D30", "D1"],
    icon: "🩺",
    sanskritBhava: "प्रथम / षष्ठ भाव (तनु व रोग भाव - Vitality & Disease)"
  },
  {
    id: "property_realestate",
    category: "Property & Real Estate Acquisition",
    question: "Is this transaction auspicious for purchasing land, residential property, or commercial real estate?",
    primaryHouse: 4,
    secondaryHouses: [1, 9, 11],
    significators: ["Mars", "Venus", "Moon"],
    recommendedVargas: ["D4", "D16", "D1"],
    icon: "🏠",
    sanskritBhava: "चतुर्थ भाव (भूमि व सुख भाव - Property & Vehicles)"
  },
  {
    id: "foreign_travel",
    category: "Foreign Travel & Relocation",
    question: "Will my international visa application, overseas relocation, or foreign settlement succeed?",
    primaryHouse: 9,
    secondaryHouses: [1, 3, 7, 12],
    significators: ["Rahu", "Moon", "Jupiter"],
    recommendedVargas: ["D9", "D12", "D1"],
    icon: "✈️",
    sanskritBhava: "नवम / द्वादश भाव (विदेश व भाग्य भाव - Foreign Journeys)"
  },
  {
    id: "lost_object",
    category: "Lost Object Recovery",
    question: "Will the lost or misplaced valuables, money, or documents be traced and safely recovered?",
    primaryHouse: 2,
    secondaryHouses: [4, 7, 8],
    significators: ["Mercury", "Moon", "Venus"],
    recommendedVargas: ["D2", "D4", "D1"],
    icon: "🔍",
    sanskritBhava: "द्वितीय / चतुर्थ भाव (नष्ट वस्तु लाभ - Lost Property)"
  },
  {
    id: "litigation_legal",
    category: "Litigation & Legal Victory",
    question: "Will I triumph in the ongoing court case, legal dispute, or contentious arbitration?",
    primaryHouse: 6,
    secondaryHouses: [1, 10, 11],
    significators: ["Mars", "Jupiter", "Sun"],
    recommendedVargas: ["D3", "D10", "D1"],
    icon: "⚖️",
    sanskritBhava: "षष्ठ भाव (रिपु व जय भाव - Legal Disputes & Triumph)"
  },
  {
    id: "education_exams",
    category: "Higher Education & Academic Success",
    question: "Will I clear the competitive exam, gain prestigious university admission, or achieve top academic ranks?",
    primaryHouse: 5,
    secondaryHouses: [1, 9, 11],
    significators: ["Mercury", "Jupiter", "Moon"],
    recommendedVargas: ["D24", "D5", "D1"],
    icon: "🎓",
    sanskritBhava: "पञ्चम भाव (विद्या व बुद्धि भाव - Intellect & Academia)"
  },
  {
    id: "children_progeny",
    category: "Children & Progeny Conception",
    question: "Will our family be blessed with child conception, smooth pregnancy, and healthy progeny?",
    primaryHouse: 5,
    secondaryHouses: [1, 2, 11],
    significators: ["Jupiter", "Mars", "Sun"],
    recommendedVargas: ["D7", "D1", "D9"],
    icon: "👶",
    sanskritBhava: "पञ्चम भाव (पुत्र व सन्तान भाव - Progeny & Legacy)"
  }
];

// Ashta Dik Directional Omens (Shatpanchasika & Prashna Marga)
const ASHTA_DIK_OMENS: Record<string, {
  deity: string;
  nature: string;
  omenSignificance: string;
  fruitionProbability: string;
  sanskrit: string;
}> = {
  "East": {
    deity: "Indra (King of Gods)",
    nature: "Highly Auspicious (शूर / विजय)",
    omenSignificance: "Facing East aligns with solar prana, government favor, executive authority, and immediate clarity.",
    fruitionProbability: "92% (Swift Fruition)",
    sanskrit: "प्राची (पूर्व - इन्द्र दिशा)"
  },
  "South-East": {
    deity: "Agni (Fire God)",
    nature: "Fiery / Impatient (उष्ण / व्यग्र)",
    omenSignificance: "Facing South-East indicates impatience, expenditure, heated discussions, or technical hurdles needing patience.",
    fruitionProbability: "68% (Effort & Restraint Required)",
    sanskrit: "आग्नेयी (अग्नि दिशा)"
  },
  "South": {
    deity: "Yama (Lord of Dharma & Justice)",
    nature: "Strict / Karmic (संयम / परीक्षा)",
    omenSignificance: "Facing South tests perseverance. Indicates unavoidable procedural delays, legal checks, or health review.",
    fruitionProbability: "55% (Patience through Delays)",
    sanskrit: "दक्षिणा (यम दिशा)"
  },
  "South-West": {
    deity: "Nirriti (Earth / Ancestral Force)",
    nature: "Heavy / Obstacles (नैऋत्य / गम्भीर)",
    omenSignificance: "Facing South-West flags unforeseen complications, subterranean issues, or need for grounded counsel.",
    fruitionProbability: "48% (Careful Scrutiny Needed)",
    sanskrit: "नैऋत्य (नैर्ऋत दिशा)"
  },
  "West": {
    deity: "Varuna (Lord of Waters & Trade)",
    nature: "Steady / Commercial (वरुण / धैर्य)",
    omenSignificance: "Facing West favors commercial contracts, overseas ventures, partnerships, and gradual steady manifestation.",
    fruitionProbability: "78% (Steady Fruition)",
    sanskrit: "प्रतीची (पश्चिम - वरुण दिशा)"
  },
  "North-West": {
    deity: "Vayu (Lord of Wind & Movement)",
    nature: "Mobile / Rapid (वायु / चंचल)",
    omenSignificance: "Facing North-West indicates fast shifting conditions, rapid travel, or vacillating minds needing firm decisions.",
    fruitionProbability: "72% (Dynamic Movement)",
    sanskrit: "वायव्या (वायु दिशा)"
  },
  "North": {
    deity: "Kubera (Lord of Wealth)",
    nature: "Extremely Auspicious (कुबेर / धन-वृद्धि)",
    omenSignificance: "Facing North activates merchant fortune, financial influx, recovery of lost resources, and intellectual victory.",
    fruitionProbability: "95% (Guaranteed Prosperity)",
    sanskrit: "उदीची (उत्तर - कुबेर दिशा)"
  },
  "North-East": {
    deity: "Ishanya (Lord Shiva / Divine Grace)",
    nature: "Supreme Divine Grace (ईशान / कैवल्य)",
    omenSignificance: "Facing North-East draws supreme cosmic protection, divine blessing, spiritual guidance, and insurmountable triumph.",
    fruitionProbability: "98% (Divine Triumph)",
    sanskrit: "ऐशानी (ईशान दिशा - शिव सान्निध्य)"
  }
};

// Nakshatra Types for Lost Object Recovery
const NAKSHATRA_LOST_ITEM_TYPES: Record<string, "Andha (East/Quick)" | "Sulaksha (Recoverable)" | "Mandha (Difficult)" | "Kani (Permanent Loss)"> = {
  "Rohini": "Andha (East/Quick)",
  "Pushya": "Andha (East/Quick)",
  "Uttara Phalguni": "Andha (East/Quick)",
  "Vishakha": "Andha (East/Quick)",
  "Purva Ashadha": "Andha (East/Quick)",
  "Dhanishta": "Andha (East/Quick)",
  "Revati": "Andha (East/Quick)",

  "Ashwini": "Sulaksha (Recoverable)",
  "Krittika": "Sulaksha (Recoverable)",
  "Mrigashira": "Sulaksha (Recoverable)",
  "Punarvasu": "Sulaksha (Recoverable)",
  "Hasta": "Sulaksha (Recoverable)",
  "Swati": "Sulaksha (Recoverable)",
  "Anuradha": "Sulaksha (Recoverable)",
  "Shravana": "Sulaksha (Recoverable)",

  "Bharani": "Mandha (Difficult)",
  "Ardra": "Mandha (Difficult)",
  "Magha": "Mandha (Difficult)",
  "Purva Phalguni": "Mandha (Difficult)",
  "Chitra": "Mandha (Difficult)",
  "Purva Bhadrapada": "Mandha (Difficult)",

  "Aslesha": "Kani (Permanent Loss)",
  "Jyeshtha": "Kani (Permanent Loss)",
  "Mula": "Kani (Permanent Loss)",
  "Shatabhisha": "Kani (Permanent Loss)",
  "Uttara Bhadrapada": "Kani (Permanent Loss)",
  "Uttara Ashadha": "Kani (Permanent Loss)"
};

export const PrashnaWorkspaceView: React.FC<PrashnaWorkspaceViewProps> = ({
  userProfile,
  initialAscendantLongitude,
  planets: fallbackPlanets,
}) => {
  // Query Inputs
  const [selectedTemplate, setSelectedTemplate] = useState<PrashnaCategoryTemplate>(PRASHNA_TEMPLATES[0]);
  const [customQuestionText, setCustomQuestionText] = useState("");
  const [prashnaNumber, setPrashnaNumber] = useState<number>(108);
  const [querentDirection, setQuerentDirection] = useState<"East" | "South-East" | "South" | "South-West" | "West" | "North-West" | "North" | "North-East">("East");
  
  // Real-time Horary instant state (Defaults to exact current moment)
  const [questionTimestamp, setQuestionTimestamp] = useState<Date>(() => new Date());
  const [isLiveAutoUpdating, setIsLiveAutoUpdating] = useState<boolean>(true);
  const [chartLayout, setChartLayout] = useState<"north" | "south">("north");
  
  // Divisional Chart State (D1 to D60 Live Current Birth Charts)
  const [selectedVargaCode, setSelectedVargaCode] = useState<string>("D1");
  const [vargaFilterCategory, setVargaFilterCategory] = useState<"all" | "core" | "wealth" | "family" | "crises" | "wisdom">("all");

  // Ashtamangala Omens
  const [cowrieCount, setCowrieCount] = useState<number>(64);
  const [deepaOmen, setDeepaOmen] = useState<"Steady Bright (Shubha)" | "Flickering (Chanchala)" | "Smoky (Dhooma)" | "Dim / Manda">("Steady Bright (Shubha)");

  // Main Tabs
  const [activeTab, setActiveTab] = useState<
    "chart" | "guidance" | "verdict" | "framework" | "radicality" | "ruling" | "timing" | "omens"
  >("chart");

  // Keep Prashna horary chart synchronized with current instant every 15 seconds if active
  useEffect(() => {
    if (!isLiveAutoUpdating) return;
    const interval = setInterval(() => {
      setQuestionTimestamp(new Date());
    }, 15000);
    return () => clearInterval(interval);
  }, [isLiveAutoUpdating]);

  // Geographic coordinates for the horary moment
  const lat = typeof userProfile?.latitude === "number" && !isNaN(userProfile.latitude) ? userProfile.latitude : 28.6139;
  const lon = typeof userProfile?.longitude === "number" && !isNaN(userProfile.longitude) ? userProfile.longitude : 77.2090;
  const placeName = userProfile?.place || "New Delhi, India";
  const tzOffset = 5.5;

  // Time Shift Micro-helpers
  const handleShiftTime = (minutes: number) => {
    setIsLiveAutoUpdating(false);
    setQuestionTimestamp((prev) => new Date(prev.getTime() + minutes * 60 * 1000));
  };

  // Compute LIVE CURRENT HORARY ASTRONOMICAL CHART
  const currentChart = useMemo(() => {
    try {
      return calculateSiderealChart({
        year: questionTimestamp.getFullYear(),
        month: questionTimestamp.getMonth() + 1,
        day: questionTimestamp.getDate(),
        hour: questionTimestamp.getHours(),
        minute: questionTimestamp.getMinutes(),
        second: questionTimestamp.getSeconds(),
        latitude: lat,
        longitude: lon,
        timezoneOffsetHours: tzOffset
      });
    } catch {
      return calculateSiderealChart({
        year: 2026,
        month: 10,
        day: 9,
        hour: 12,
        minute: 0,
        second: 0,
        latitude: lat,
        longitude: lon,
        timezoneOffsetHours: tzOffset
      });
    }
  }, [questionTimestamp, lat, lon, tzOffset]);

  // Live Planetary Map formatted for calculation engines
  const livePlanetsMap = useMemo(() => {
    const map: Record<string, { name: string; longitude: number; isRetrograde?: boolean; speedLongitudeDegPerDay?: number }> = {};
    (currentChart.planetsList || []).forEach((p: any) => {
      map[p.name] = {
        name: p.name,
        longitude: p.longitude,
        isRetrograde: p.isRetrograde,
        speedLongitudeDegPerDay: p.speed || 1.0,
      };
    });
    return map;
  }, [currentChart]);

  // ALL 16 SHODASHAVARGA DIVISIONAL CHARTS (D1 to D60) CALCULATED FOR THE LIVE MOMENT
  const allVargas = useMemo(() => {
    try {
      return DivisionalChartsEngine.calculateAllVargas(
        currentChart.ascendant.longitude,
        livePlanetsMap
      );
    } catch {
      return DivisionalChartsEngine.calculateAllVargas(0, livePlanetsMap);
    }
  }, [currentChart.ascendant.longitude, livePlanetsMap]);

  // Active Selected Divisional Chart Object
  const currentVargaResult: DivisionalChartResult = useMemo(() => {
    return allVargas[selectedVargaCode] || allVargas["D1"];
  }, [allVargas, selectedVargaCode]);

  // Transform planets for KundliChartSVG based on current selected Varga (D1 to D60)
  const vargaPlanetsList: PlanetPosition[] = useMemo(() => {
    if (!currentVargaResult) return [];
    return currentVargaResult.placementsList.map((p) => {
      const baseP = currentChart.planetsList?.find((cp: any) => cp.name === p.planet);
      return {
        name: p.planet,
        sign: p.vargaSignName,
        house: p.vargaHouse,
        degree: baseP ? (baseP.degreeInSign || 15) : 15,
        formattedDegree: baseP ? baseP.formattedDegree : "15° 00'",
        isRetrograde: baseP?.isRetrograde,
        nakshatra: baseP?.nakshatra,
        pada: baseP?.pada
      };
    });
  }, [currentVargaResult, currentChart]);

  // Transform houses for KundliChartSVG based on current selected Varga (D1 to D60)
  const vargaHousesList: HouseDetail[] = useMemo(() => {
    const ascIdx = currentVargaResult?.ascendantSignIndex ?? 0;
    return Array.from({ length: 12 }).map((_, i) => {
      const sIdx = (ascIdx + i) % 12;
      const rashi = RASHIS[sIdx] || { name: "Aries", sanskrit: "Mesha" };
      const sign = rashi.name;
      const lord = RASHI_LORDS[sign] || "Mars";
      return {
        houseNumber: i + 1,
        sign,
        degree: 15,
        formattedDegree: "15° 00'",
        lord
      };
    });
  }, [currentVargaResult]);

  // Baseline D1 Rashi Chart lists for fallback/comparison
  const prashnaPlanetsList: PlanetPosition[] = useMemo(() => {
    return (currentChart.planetsList || []).map((p: any) => ({
      name: p.name,
      sign: p.signName || p.sign,
      house: p.house,
      degree: p.degreeInSign,
      isRetrograde: p.isRetrograde,
      formattedDegree: p.formattedDegree,
      nakshatra: p.nakshatra,
      pada: p.pada
    }));
  }, [currentChart]);

  const activeQuestionText = customQuestionText.trim() || selectedTemplate.question;

  // Execute Master Prashna Engine deterministically using LIVE CURRENT CHART
  const prashnaReport = useMemo(() => {
    return MasterPrashnaEngine.calculateMasterPrashna({
      query: {
        question: activeQuestionText,
        questionCategory: selectedTemplate.category,
        questionTimestamp,
        prashnaNumber,
        querentDirection,
        latitude: lat,
        longitude: lon,
        timezone: tzOffset,
        ayanamsha: "Lahiri (Chitrapaksha)",
        nodeMode: "True Node",
        houseSystem: "Whole Sign",
        chartSystem: "North Indian",
      },
      ascendantLongitude: currentChart.ascendant.longitude,
      planets: livePlanetsMap,
    });
  }, [activeQuestionText, selectedTemplate, prashnaNumber, querentDirection, questionTimestamp, lat, lon, tzOffset, currentChart, livePlanetsMap]);

  // Real-time Panchanga of the Horary Instant
  const panchangData = useMemo(() => {
    try {
      return calculateAuthoritativePanchang({
        date: questionTimestamp,
        latitude: lat,
        longitude: lon,
        timezoneOffsetHours: tzOffset
      });
    } catch {
      return null;
    }
  }, [questionTimestamp, lat, lon, tzOffset]);

  // Real-time Gulika calculation
  const gulikaPosition = useMemo(() => {
    const sunObj = currentChart.planetsList?.find((p: any) => p.name === "Sun");
    const sunLon = sunObj ? sunObj.longitude : 0;
    const dayOfWeek = questionTimestamp.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
    const gulikaSegments = [7, 6, 5, 4, 3, 2, 1];
    const segment = gulikaSegments[dayOfWeek] || 4;
    const gulikaDeg = (sunLon + segment * 30) % 360;
    const signIdx = Math.floor(gulikaDeg / 30) % 12;
    const ascSignIdx = currentChart.ascendant.signIndex;
    const houseNum = ((signIdx - ascSignIdx + 12) % 12) + 1;
    const signName = RASHIS[signIdx]?.name || "Aries";
    return {
      degree: gulikaDeg,
      signName,
      houseNum,
      formattedDeg: `${(gulikaDeg % 30).toFixed(1)}° in ${signName}`
    };
  }, [currentChart, questionTimestamp]);

  // Varga Groups for filtering
  const filteredVargas = useMemo(() => {
    if (vargaFilterCategory === "all") return DIVISIONAL_METADATA;
    if (vargaFilterCategory === "core") {
      return DIVISIONAL_METADATA.filter(m => ["D1", "D9", "D10"].includes(m.code));
    }
    if (vargaFilterCategory === "wealth") {
      return DIVISIONAL_METADATA.filter(m => ["D1", "D2", "D4", "D16"].includes(m.code));
    }
    if (vargaFilterCategory === "family") {
      return DIVISIONAL_METADATA.filter(m => ["D1", "D7", "D9", "D12"].includes(m.code));
    }
    if (vargaFilterCategory === "crises") {
      return DIVISIONAL_METADATA.filter(m => ["D1", "D8", "D30", "D60"].includes(m.code));
    }
    if (vargaFilterCategory === "wisdom") {
      return DIVISIONAL_METADATA.filter(m => ["D1", "D20", "D24"].includes(m.code));
    }
    return DIVISIONAL_METADATA;
  }, [vargaFilterCategory]);

  // Moon Nakshatra for Lost Object / Directional prediction
  const moonNakshatra = currentChart.planets.Moon?.nakshatra || "Rohini";
  const lostItemLossType = NAKSHATRA_LOST_ITEM_TYPES[moonNakshatra] || "Sulaksha (Recoverable)";

  // Check Vargottama planets in D9
  const d9Chart = allVargas["D9"];
  const vargottamaPlanets = useMemo(() => {
    if (!d9Chart) return [];
    return d9Chart.placementsList.filter(p => p.isVargottama).map(p => p.planet);
  }, [d9Chart]);

  return (
    <div className="space-y-6">
      {/* 1. PRASHNA HEADER & LIVE HORARY TIME CONTROLS */}
      <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-0.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-blue-700" /> Live Prashna Horary Engine
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Prashna Marga &amp; Shatpanchasika Standard
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold border border-amber-200">
                Live Shodashavarga (D1 to D60) Active
              </span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
              Current Horary Birth Chart &amp; Deep Astrological Judgement
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Instantaneous celestial snapshot with live D1 to D60 divisional charts, Tajika Ithasala yogas, Kerala Ashtamangala omens, and detailed answers for every inquiry.
            </p>
          </div>

          {/* Time Sync Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsLiveAutoUpdating(!isLiveAutoUpdating)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                isLiveAutoUpdating ? "bg-emerald-100 text-emerald-900 border border-emerald-300" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
              title="Automatically recalculates ascendant and planetary degrees every 15 seconds"
            >
              <span className={`w-2 h-2 rounded-full ${isLiveAutoUpdating ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`} />
              <span>{isLiveAutoUpdating ? "Live Auto-Sync (15s)" : "Frozen Instant"}</span>
            </button>
            <button
              onClick={() => {
                setQuestionTimestamp(new Date());
                setIsLiveAutoUpdating(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Cast for Right Now</span>
            </button>
          </div>
        </div>

        {/* Live Horary Timestamp, Micro Time-Stepping & Coordinates Ribbon */}
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 text-blue-950 font-semibold">
              <Clock className="w-4 h-4 text-blue-700" />
              <span>Prashna Moment: <strong>{questionTimestamp.toLocaleTimeString()}</strong> ({questionTimestamp.toLocaleDateString()})</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-slate-700">
              <MapPin className="w-4 h-4 text-blue-700" />
              <span>{placeName} ({lat.toFixed(2)}°N, {lon.toFixed(2)}°E)</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-slate-700">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Live Ascendant: <strong>{currentChart.ascendant.signName} ({currentChart.ascendant.formattedDegree})</strong></span>
            </div>
          </div>

          {/* Micro-Stepping Controls */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Adjust Time:</span>
            <button
              onClick={() => handleShiftTime(-60)}
              className="px-2 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-[11px] font-mono text-slate-700"
              title="Step back 1 hour"
            >
              -1h
            </button>
            <button
              onClick={() => handleShiftTime(-15)}
              className="px-2 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-[11px] font-mono text-slate-700"
              title="Step back 15 minutes"
            >
              -15m
            </button>
            <button
              onClick={() => handleShiftTime(-1)}
              className="px-2 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-[11px] font-mono text-slate-700"
              title="Step back 1 minute"
            >
              -1m
            </button>
            <button
              onClick={() => handleShiftTime(1)}
              className="px-2 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-[11px] font-mono text-slate-700"
              title="Advance 1 minute"
            >
              +1m
            </button>
            <button
              onClick={() => handleShiftTime(15)}
              className="px-2 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-[11px] font-mono text-slate-700"
              title="Advance 15 minutes"
            >
              +15m
            </button>
            <button
              onClick={() => handleShiftTime(60)}
              className="px-2 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-[11px] font-mono text-slate-700"
              title="Advance 1 hour"
            >
              +1h
            </button>
          </div>
        </div>

        {/* 2. QUESTION CATEGORY TEMPLATES & CUSTOM QUERY FORMULATOR */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-blue-700" />
              <span>Select Horary Question Template or Formulate Custom Query</span>
            </label>
            <span className="text-[11px] text-blue-700 font-medium">
              Target Bhava: {selectedTemplate.sanskritBhava}
            </span>
          </div>

          {/* Quick Category Templates Horizontal Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {PRASHNA_TEMPLATES.map((tmpl) => {
              const isSelected = selectedTemplate.id === tmpl.id;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => {
                    setSelectedTemplate(tmpl);
                    setCustomQuestionText(tmpl.question);
                    // Automatically focus primary varga for this category
                    if (tmpl.recommendedVargas[0]) {
                      setSelectedVargaCode(tmpl.recommendedVargas[0]);
                    }
                  }}
                  className={`p-2.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between h-20 ${
                    isSelected
                      ? "bg-blue-900 text-white border-blue-900 shadow-sm ring-2 ring-blue-500/20"
                      : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-base">{tmpl.icon}</span>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isSelected ? "bg-blue-800 text-blue-200" : "bg-slate-200/80 text-slate-700"
                    }`}>
                      H{tmpl.primaryHouse}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold leading-tight line-clamp-1 block">
                      {tmpl.category.split("&")[0].trim()}
                    </span>
                    <span className={`text-[10px] block line-clamp-1 ${isSelected ? "text-blue-200" : "text-slate-500"}`}>
                      {tmpl.recommendedVargas.join(", ")}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Query Formulation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
            <div className="md:col-span-6 space-y-1">
              <label className="text-xs font-bold text-slate-700">Question Formulation</label>
              <div className="relative">
                <input
                  type="text"
                  value={activeQuestionText}
                  onChange={(e) => setCustomQuestionText(e.target.value)}
                  className="w-full text-xs p-2.5 pl-9 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-blue-500 font-medium"
                  placeholder="Formulate your specific horary query..."
                />
                <HelpCircle className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div className="md:col-span-3 space-y-1">
              <label className="text-xs font-bold text-slate-700">Querent Direction (Ashta Dik)</label>
              <select
                value={querentDirection}
                onChange={(e) => setQuerentDirection(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-blue-500 font-medium"
              >
                {Object.keys(ASHTA_DIK_OMENS).map((dir) => (
                  <option key={dir} value={dir}>{dir} ({ASHTA_DIK_OMENS[dir].sanskrit.split(" ")[0]})</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3 space-y-1">
              <label className="text-xs font-bold text-slate-700">Prashna Number (1–249 KP / 108)</label>
              <input
                type="number"
                min={1}
                max={249}
                value={prashnaNumber}
                onChange={(e) => setPrashnaNumber(Math.max(1, Math.min(249, parseInt(e.target.value) || 1)))}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-blue-500 font-mono font-bold"
              />
            </div>
          </div>
        </div>

        {/* 3. WORKSPACE SUB-TABS */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-t border-slate-100 pt-3">
          {[
            { id: "chart", label: `Live D1-D60 Charts (${selectedVargaCode})`, badge: "D1-D60" },
            { id: "guidance", label: "Question Answers & Detailed Guidance", badge: "Answers" },
            { id: "verdict", label: "Verdict & Final Judgement", badge: prashnaReport.verdict.isAffirmative ? "Yes" : "Caution" },
            { id: "framework", label: "Tajika Sambandha / Ithasala", badge: "Tajika" },
            { id: "radicality", label: "Radicality & Strictures", badge: prashnaReport.radicality.isRadical ? "Clear" : "Stricture" },
            { id: "ruling", label: "KP Ruling Planets (RP)", badge: "KP" },
            { id: "timing", label: "Timing & Fructification", badge: "Window" },
            { id: "omens", label: "Deva Prashna & Omens", badge: "Omens" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? "bg-blue-900 text-white shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                activeTab === tab.id ? "bg-blue-800 text-blue-200" : "bg-slate-200 text-slate-600"
              }`}>
                {tab.badge}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB 0. LIVE PRASHNA DIVISIONAL CHARTS (D1 TO D60)        */}
      {/* ======================================================== */}
      {activeTab === "chart" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
            {/* Varga Header & Category Selector */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    Live Shodashavarga Divisional Engine (D1 to D60)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" /> Live Real-Time Ephemeris Active
                  </span>
                  {selectedTemplate.recommendedVargas.includes(selectedVargaCode) && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-600 fill-amber-500" /> Recommended Varga for {selectedTemplate.category.split("&")[0].trim()}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                  {currentVargaResult.vargaCode} {currentVargaResult.vargaName} Chart ({currentVargaResult.ascendantSignName} Ascendant)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {currentVargaResult.purpose} • Division factor 1/{currentVargaResult.divisionFactor} calculated for {questionTimestamp.toLocaleTimeString()}.
                </p>
              </div>

              {/* Chart Style & Quick Jumps */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-600">Style:</span>
                <button
                  onClick={() => setChartLayout("north")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    chartLayout === "north" ? "bg-slate-900 text-white shadow-xs" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  North Indian
                </button>
                <button
                  onClick={() => setChartLayout("south")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    chartLayout === "south" ? "bg-slate-900 text-white shadow-xs" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  South Indian
                </button>

                <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />

                <button
                  onClick={() => setSelectedVargaCode("D1")}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedVargaCode === "D1" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  D1 Rashi
                </button>
                <button
                  onClick={() => setSelectedVargaCode("D9")}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedVargaCode === "D9" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  D9 Navamsha
                </button>
                {selectedTemplate.recommendedVargas[0] && selectedTemplate.recommendedVargas[0] !== "D1" && selectedTemplate.recommendedVargas[0] !== "D9" && (
                  <button
                    onClick={() => setSelectedVargaCode(selectedTemplate.recommendedVargas[0])}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedVargaCode === selectedTemplate.recommendedVargas[0] ? "bg-amber-600 text-white" : "bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300"
                    }`}
                  >
                    ⭐ {selectedTemplate.recommendedVargas[0]} (Target)
                  </button>
                )}
              </div>
            </div>

            {/* D1 TO D60 DIVISIONAL CHART SELECTOR BAR */}
            <div className="space-y-2.5 bg-slate-50/80 p-4 rounded-2xl border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-700" />
                  <span>Choose Live Divisional Chart (D1 to D60):</span>
                </span>

                {/* Varga Classification Filter */}
                <div className="flex items-center gap-1 flex-wrap text-[11px]">
                  {[
                    { id: "all", label: "All 16 Shodashavarga" },
                    { id: "core", label: "Core (D1, D9, D10)" },
                    { id: "wealth", label: "Wealth (D2, D4, D16)" },
                    { id: "family", label: "Family (D7, D9, D12)" },
                    { id: "crises", label: "Crises (D8, D30, D60)" },
                    { id: "wisdom", label: "Knowledge (D20, D24)" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setVargaFilterCategory(f.id as any)}
                      className={`px-2 py-0.5 rounded-md transition-all font-medium cursor-pointer ${
                        vargaFilterCategory === f.id
                          ? "bg-blue-800 text-white font-bold"
                          : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shodashavarga Button Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {filteredVargas.map((vm) => {
                  const isSelected = selectedVargaCode === vm.code;
                  const isRec = selectedTemplate.recommendedVargas.includes(vm.code);
                  return (
                    <button
                      key={vm.code}
                      onClick={() => setSelectedVargaCode(vm.code)}
                      className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-blue-900 text-white border-blue-900 shadow-sm"
                          : isRec
                          ? "bg-amber-50 hover:bg-amber-100/80 border-amber-300 text-slate-900"
                          : "bg-white hover:bg-slate-100 border-slate-200 text-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-bold text-xs">{vm.code}</span>
                        {isRec && (
                          <span className="text-[10px]" title="Recommended for this category">⭐</span>
                        )}
                      </div>
                      <span className={`text-[11px] font-semibold truncate ${isSelected ? "text-blue-100" : "text-slate-900"}`}>
                        {vm.name}
                      </span>
                      <span className={`text-[9px] truncate ${isSelected ? "text-blue-200" : "text-slate-400"}`}>
                        {vm.purpose.split(",")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Visual Horary Kundli Chart & Significators Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Visual Chart Rendering */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center">
                <div className="w-full max-w-[500px]">
                  <KundliChartSVG
                    planets={vargaPlanetsList}
                    houses={vargaHousesList}
                    lagnaSign={currentVargaResult.ascendantSignName}
                    chartTitle={`Prashna ${currentVargaResult.vargaCode} (${currentVargaResult.vargaName})`}
                    compact={true}
                  />
                </div>

                <div className="flex items-center justify-between w-full max-w-[500px] mt-2 px-2 text-[11px] text-slate-500">
                  <span>Ascendant: <strong>{currentVargaResult.ascendantSignName}</strong></span>
                  <span>Division: <strong>1/{currentVargaResult.divisionFactor}</strong></span>
                  <span>Layout: <strong>{chartLayout === "north" ? "North Indian Diamond" : "South Indian Square"}</strong></span>
                </div>
              </div>

              {/* Horary Key Significators Pane for Active Varga */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                      <Sparkles className="w-4 h-4 text-blue-700" />
                      <span>{currentVargaResult.vargaCode} Core Triad Placement</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-200 text-blue-950 font-mono">
                      {currentVargaResult.ascendantSignName} Lagna
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {/* 1. Lagnesha in this Varga */}
                    <div className="p-2.5 rounded-xl bg-white border border-blue-100 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 block">1. Prashna Lagnesha ({prashnaReport.framework.lagnaLord})</span>
                        {(() => {
                          const p = currentVargaResult.placementsList.find(pl => pl.planet === prashnaReport.framework.lagnaLord);
                          return (
                            <span className="text-slate-600 text-[11px]">
                              {p ? `${p.vargaSignName} in House #${p.vargaHouse} (Lord of ${p.vargaSignLord})` : "Placement calculated"}
                            </span>
                          );
                        })()}
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900">
                        Querent Self
                      </span>
                    </div>

                    {/* 2. Moon in this Varga */}
                    <div className="p-2.5 rounded-xl bg-white border border-blue-100 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 block">2. Moon (Chandra - Intent &amp; Mind)</span>
                        {(() => {
                          const p = currentVargaResult.placementsList.find(pl => pl.planet === "Moon");
                          return (
                            <span className="text-slate-600 text-[11px]">
                              {p ? `${p.vargaSignName} in House #${p.vargaHouse}` : "Mind placement"}
                            </span>
                          );
                        })()}
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-900">
                        Mental Focus
                      </span>
                    </div>

                    {/* 3. Karyesha in this Varga */}
                    <div className="p-2.5 rounded-xl bg-white border border-blue-100 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 block">3. Karyesha ({prashnaReport.framework.karyesh})</span>
                        {(() => {
                          const p = currentVargaResult.placementsList.find(pl => pl.planet === prashnaReport.framework.karyesh);
                          return (
                            <span className="text-slate-600 text-[11px]">
                              {p ? `${p.vargaSignName} in House #${p.vargaHouse} (${selectedTemplate.category.split("&")[0].trim()})` : "Matter Lord"}
                            </span>
                          );
                        })()}
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                        Outcome Lord
                      </span>
                    </div>
                  </div>

                  {/* Vargottama & Special Badges */}
                  <div className="pt-1 flex flex-wrap gap-2 text-[10px]">
                    {vargottamaPlanets.length > 0 ? (
                      <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold border border-amber-200">
                        ✨ Vargottama in D9: {vargottamaPlanets.join(", ")}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        No D9 Vargottama Grahas
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 font-bold border border-purple-200">
                      Gulika: House #{gulikaPosition.houseNum} ({gulikaPosition.signName})
                    </span>
                  </div>
                </div>

                {/* Varga-Specific Shastric Judgement */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1.5 text-xs text-amber-950">
                  <span className="font-bold block uppercase tracking-wider text-[10px] text-amber-900">
                    Shastric Varga Significance for this Query
                  </span>
                  <p className="leading-relaxed text-[11px] text-slate-700">
                    In Horary astrology, <strong>{currentVargaResult.vargaName} ({currentVargaResult.vargaCode})</strong> reveals: <em>{currentVargaResult.purpose}</em>.
                    {selectedVargaCode === "D10" && (
                      <span> For career queries, strong D10 Kendra/Trikona placement of the 10th lord and Lagnesha confirms rapid elevation and executive favor.</span>
                    )}
                    {selectedVargaCode === "D9" && (
                      <span> Navamsha (D9) serves as the ultimate fruition matrix; if Lagnesha and Karyesha remain well-placed here, the outcome is cemented in destiny.</span>
                    )}
                    {selectedVargaCode === "D2" && (
                      <span> Hora (D2) governs liquid wealth and debt clearance; planets in Sun's hora favor enterprise while Moon's hora favors cash conservation.</span>
                    )}
                    {selectedVargaCode === "D4" && (
                      <span> Chaturthamsha (D4) validates land deeds, building stability, and domestic peace. Benefics in kendras ensure smooth property registration.</span>
                    )}
                    {selectedVargaCode === "D8" && (
                      <span> Ashtamsha (D8) identifies hidden pitfalls, sudden changes, and chronic complications. Malefics here advise postponing major risks.</span>
                    )}
                    {selectedVargaCode === "D60" && (
                      <span> Shashtiamsha (D60) illuminates deep past-life karmic momentum. Benefic varga lords indicate easy fruition through purva punya.</span>
                    )}
                  </p>
                </div>

                {/* Live Planetary Table for Active Varga */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                  <div className="bg-slate-100 px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-700 flex justify-between items-center">
                    <span>{currentVargaResult.vargaCode} Planetary Placements</span>
                    <span className="font-mono text-[10px] text-slate-500">9 Classical Grahas</span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-52 overflow-y-auto text-xs">
                    {currentVargaResult.placementsList.map((p, idx) => (
                      <div key={idx} className="px-3.5 py-1.5 flex items-center justify-between hover:bg-slate-50">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{p.planet}</span>
                          {p.isVargottama && (
                            <span className="text-[9px] font-bold px-1 rounded bg-amber-100 text-amber-800">Vargottama</span>
                          )}
                          {p.isPushkarNavamsha && (
                            <span className="text-[9px] font-bold px-1 rounded bg-emerald-100 text-emerald-800">Pushkara</span>
                          )}
                        </div>
                        <div className="text-slate-600 text-[11px]">
                          House #{p.vargaHouse} • {p.vargaSignName} ({p.vargaSignSanskrit})
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 1. QUESTION ANSWERS & DETAILED GUIDANCE             */}
      {/* ======================================================== */}
      {activeTab === "guidance" && (
        <div className="space-y-6">
          {/* Executive Answer Card */}
          <div className="bg-linear-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-blue-500/20 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-blue-500/20 pb-4">
              <div>
                <span className="text-xs font-bold text-blue-300 uppercase tracking-widest block">
                  Authoritative Question Answer &amp; Solution
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                  {prashnaReport.verdict.isAffirmative ? "AFFIRMATIVE (कार्य सिद्धि - Manifestation Favored)" : "DELAYED / OBSTACLES (विलम्ब व बाधा - Proceed with Remedies)"}
                </h3>
                <span className="text-xs text-blue-200 mt-1 block">
                  Question: &quot;{activeQuestionText}&quot;
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs text-blue-200 block">Probability Confidence</span>
                <span className="font-serif text-3xl font-bold text-amber-300">
                  {prashnaReport.verdict.confidenceLevel}%
                </span>
              </div>
            </div>

            <p className="text-sm text-blue-100 leading-relaxed max-w-4xl">
              {prashnaReport.verdict.verdictSummary}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-500/30 text-xs font-medium">
                Target Bhava: H{selectedTemplate.primaryHouse} ({selectedTemplate.sanskritBhava.split("(")[0].trim()})
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-500/30 text-xs font-medium">
                Lagnesha: {prashnaReport.framework.lagnaLord} (H{prashnaReport.framework.lagnaLordHouse})
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 text-xs font-medium">
                Karyesh: {prashnaReport.framework.karyesh} (H{prashnaReport.framework.karyeshHouse})
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-500/30 text-xs font-medium">
                Fruition Horizon: {prashnaReport.timing.fructificationWindow || "2 to 4 Weeks"}
              </span>
            </div>
          </div>

          {/* Detailed Question-Specific Guidance Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. Core Predictions & Actionable Advice */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base border-b border-slate-100 pb-3">
                <Target className="w-5 h-5 text-blue-700" />
                <span>Domain-Specific Prediction: {selectedTemplate.category}</span>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-slate-700">
                {selectedTemplate.category.includes("Career") && (
                  <>
                    <p>
                      <strong>Executive Role &amp; Promotion:</strong> The Lagnesha ({prashnaReport.framework.lagnaLord}) and 10th Lord ({prashnaReport.framework.karyesh}) establish an active {prashnaReport.framework.aspectType}. You hold solid bargaining leverage; avoid hesitating during compensation discussions.
                    </p>
                    <p>
                      <strong>Senior Authority Alignment:</strong> Sun and Jupiter cast protective drishti, indicating that organizational decision-makers recognize your past track record.
                    </p>
                    <p>
                      <strong>Optimal Action Window:</strong> Schedule high-stakes interviews and proposal submissions within the next {prashnaReport.timing.fructificationWindow || "14 days"} during Shukla Paksha.
                    </p>
                  </>
                )}

                {selectedTemplate.category.includes("Marriage") && (
                  <>
                    <p>
                      <strong>Union Compatibility &amp; Mutual Regard:</strong> The 7th house cusp and Venus placement reflect genuine reciprocal affection. Lagnesha and Karyesha mutual aspect confirms favorable intent between both families.
                    </p>
                    <p>
                      <strong>Hurdle Clearance:</strong> The absence of severe malefic combustion indicates third-party gossip will dissolve smoothly. Maintain direct and transparent communication with the partner.
                    </p>
                    <p>
                      <strong>Auspicious Timing:</strong> Formalize the engagement or proposal within {prashnaReport.timing.fructificationWindow || "21 days"}.
                    </p>
                  </>
                )}

                {selectedTemplate.category.includes("Financial") && (
                  <>
                    <p>
                      <strong>Return on Investment:</strong> Dhana Bhava (House 2) and Labha Bhava (House 11) lords are engaged in supportive mutual aspect. Expect steady liquid influx rather than sudden speculation.
                    </p>
                    <p>
                      <strong>Debt &amp; Stuck Capital:</strong> If querying stuck funds, the debtor is coming under liquidity pressure to return capital within the current solar month.
                    </p>
                    <p>
                      <strong>Caution:</strong> Refrain from lending cash without legally binding documentation on Tuesdays or during Rahu Kalam.
                    </p>
                  </>
                )}

                {selectedTemplate.category.includes("Health") && (
                  <>
                    <p>
                      <strong>Vitality &amp; Prognosis:</strong> Lagnesha indicates recovery through systematic disciplined care. The vital force (Prana) is actively dispelling the acute phase of illness.
                    </p>
                    <p>
                      <strong>Physician &amp; Medicine Suitability:</strong> The 10th house (physician) and 4th house (medication) are well-disposed; the current medical protocol is suitable and will yield relief.
                    </p>
                    <p>
                      <strong>Panchanga Advice:</strong> Supplement modern clinical treatment with water therapy, Surya Namaskar, and restorative herbs.
                    </p>
                  </>
                )}

                {selectedTemplate.category.includes("Lost") && (
                  <>
                    <p>
                      <strong>Location Direction:</strong> The lost article lies toward the <strong>{querentDirection}</strong> quadrant, indicated by Moon&apos;s nakshatra ({moonNakshatra}) and the 4th cusp.
                    </p>
                    <p>
                      <strong>Physical Environment:</strong> Item is situated inside an enclosed space, resting on an elevated wooden surface, inside a container, or near paper documents.
                    </p>
                    <p>
                      <strong>Recovery Status:</strong> Nakshatra nature is <strong>{lostItemLossType}</strong>. Thoroughly re-search personal storage, briefcases, or desk drawers before assuming theft.
                    </p>
                  </>
                )}

                {selectedTemplate.category.includes("Foreign") && (
                  <>
                    <p>
                      <strong>Visa Approval &amp; Travel:</strong> Navamsha (D9) and 9th house indicators confirm international passage. Visa clearance is favored without prolonged bureaucratic hold.
                    </p>
                    <p>
                      <strong>Overseas Living:</strong> The 12th house connection shows comfortable adaptation abroad and beneficial professional networking upon arrival.
                    </p>
                  </>
                )}

                {selectedTemplate.category.includes("Litigation") && (
                  <>
                    <p>
                      <strong>Courtroom Stance:</strong> House 6 (dispute) and House 11 (victory) indicate that you hold stronger legal documentary evidence than the opponent.
                    </p>
                    <p>
                      <strong>Settlement Strategy:</strong> If opposing counsel proposes arbitration, consider terms carefully; an out-of-court agreement preserves substantial financial resources.
                    </p>
                  </>
                )}

                {selectedTemplate.category.includes("Property") && (
                  <>
                    <p>
                      <strong>Asset Quality &amp; Title Deed:</strong> The 4th house (Bhumi) and Mars indicators reflect solid structural foundation and clear title history.
                    </p>
                    <p>
                      <strong>Negotiation:</strong> Push for favorable terms now as the seller is motivated to finalize terms before the solar month ends.
                    </p>
                  </>
                )}

                {selectedTemplate.category.includes("Education") && (
                  <>
                    <p>
                      <strong>Competitive Exam Standing:</strong> House 5 (Vidya) and House 9 (Higher Learning) support academic success. Memory recall will be sharp and reliable.
                    </p>
                    <p>
                      <strong>Admission:</strong> The desired university or scholarship gate opens favorably during the upcoming counseling round.
                    </p>
                  </>
                )}

                {selectedTemplate.category.includes("Children") && (
                  <>
                    <p>
                      <strong>Conception Prospects:</strong> Saptamsha (D7) and House 5 support progeny blessings. Both partners possess adequate astrological strength.
                    </p>
                    <p>
                      <strong>Remedial Recommendation:</strong> Offer prayers to Santana Gopala or Lord Brihaspati to clear subtle ancestral pitri doshas.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* 2. Shastric Remedies & Upayas */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base border-b border-slate-100 pb-3">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span>Tailored Shastric Remedies &amp; Upayas</span>
              </div>

              <div className="space-y-3.5 text-xs text-slate-700">
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1">
                  <span className="font-bold text-amber-950 block">1. Vedic Mantra Upasana</span>
                  <p className="text-[11px] leading-relaxed text-slate-700">
                    Chant the seed mantra of Lagna Lord <strong>({prashnaReport.framework.lagnaLord})</strong> and Karyesha <strong>({prashnaReport.framework.karyesh})</strong> 108 times daily facing <strong>{querentDirection}</strong> during sunrise.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-1">
                  <span className="font-bold text-blue-950 block">2. Auspicious Direction &amp; Color</span>
                  <p className="text-[11px] leading-relaxed text-slate-700">
                    Conduct negotiations, phone discussions, and document signings facing <strong>{querentDirection}</strong>. Wear soothing shades aligned with {prashnaReport.framework.lagnaLord}.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
                  <span className="font-bold text-emerald-950 block">3. Daan &amp; Remedial Charity</span>
                  <p className="text-[11px] leading-relaxed text-slate-700">
                    To neutralize subtle badhaka friction from House #{gulikaPosition.houseNum} (Gulika), offer yellow lentils, fresh milk, or feed birds on the Day Lord&apos;s day ({prashnaReport.rulingPlanets.dayLord}).
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-1">
                  <span className="font-bold text-purple-950 block">4. Deva Prashna Lamp Offering</span>
                  <p className="text-[11px] leading-relaxed text-slate-700">
                    Light a pure cow-ghee deepa facing East at dusk to invoke Lord Shiva or your Ishta Devata to ensure uninterrupted fruition.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2. VERDICT & FINAL JUDGEMENT                         */}
      {/* ======================================================== */}
      {activeTab === "verdict" && (
        <div className="space-y-6">
          <div className="bg-linear-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-blue-500/20 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-blue-500/20 pb-4">
              <div>
                <span className="text-xs font-bold text-blue-300 uppercase tracking-widest block">
                  Authoritative Prashna Verdict
                </span>
                <h3 className="font-serif text-3xl font-bold text-white mt-1">
                  {prashnaReport.verdict.isAffirmative ? "AFFIRMATIVE (कार्य सिद्धि - Success)" : "NON-AFFIRMATIVE (विलम्ब / बाधा - Caution)"}
                </h3>
              </div>

              <div className="text-right">
                <span className="text-xs text-blue-200 block">Confidence Level</span>
                <span className="font-serif text-3xl font-bold text-amber-300">
                  {prashnaReport.verdict.confidenceLevel}%
                </span>
              </div>
            </div>

            <p className="text-sm text-blue-100 leading-relaxed max-w-4xl">
              {prashnaReport.verdict.verdictSummary}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-500/30 text-xs font-medium">
                Ithasala Type: {prashnaReport.framework.ithasalaType}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-500/30 text-xs font-medium">
                Lagnesha: {prashnaReport.framework.lagnaLord} (H{prashnaReport.framework.lagnaLordHouse})
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 text-xs font-medium">
                Karyesh: {prashnaReport.framework.karyesh} (H{prashnaReport.framework.karyeshHouse})
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-white border border-amber-900/10 shadow-xs space-y-2">
              <div className="text-[10px] font-bold uppercase text-slate-500">Supporting Factors</div>
              <ul className="text-xs space-y-1.5">
                {prashnaReport.verdict.supportingFactors.map((f, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-amber-900/10 shadow-xs space-y-2">
              <div className="text-[10px] font-bold uppercase text-slate-500">Impediments &amp; Afflictions</div>
              {prashnaReport.verdict.inhibitingFactors.length > 0 ? (
                <ul className="text-xs space-y-1.5">
                  {prashnaReport.verdict.inhibitingFactors.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-rose-800">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-xs text-slate-500 italic">None detected — Pure Radical Chart</div>
              )}
            </div>

            <div className="p-5 rounded-3xl bg-white border border-amber-900/10 shadow-xs space-y-2">
              <div className="text-[10px] font-bold uppercase text-slate-500">Classical Prashna Yogas</div>
              <ul className="text-xs space-y-1.5">
                {prashnaReport.yogas.activeYogas.map((y, i) => (
                  <li key={i} className="text-slate-800 font-medium">
                    • <strong>{y.yogaName}</strong>: {y.conditionMet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3. TAJIKA SAMBANDHA & ITHASALA MATRIX                */}
      {/* ======================================================== */}
      {activeTab === "framework" && (
        <div className="p-6 rounded-3xl bg-white border border-amber-900/10 shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-bold text-slate-900">
            Tajika Planetary Aspects &amp; Sambandha Matrix
          </h3>
          <p className="text-xs text-slate-600">
            Evaluates classical Muthasila (Applying) vs Ishrafa (Separating) aspects within planetary Deeptamsha orbs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Lagnesha - Karyesh Dynamic</span>
              <div className="flex justify-between">
                <span>Lagnesha ({prashnaReport.framework.lagnaLord}):</span>
                <span className="font-bold">House #{prashnaReport.framework.lagnaLordHouse}</span>
              </div>
              <div className="flex justify-between">
                <span>Karyesh ({prashnaReport.framework.karyesh}):</span>
                <span className="font-bold">House #{prashnaReport.framework.karyeshHouse}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-blue-900">
                <span>Aspect Type:</span>
                <span>{prashnaReport.framework.aspectType}</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-900">
                <span>Ithasala Status:</span>
                <span>{prashnaReport.framework.ithasalaType}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Moon Aspectual Trajectory</span>
              <div className="flex justify-between">
                <span>Moon Applying To:</span>
                <span className="font-bold">{prashnaReport.framework.moonApplyingTo || "None within orb"}</span>
              </div>
              <div className="flex justify-between">
                <span>Moon Separating From:</span>
                <span className="font-bold">{prashnaReport.framework.moonSeparatingFrom || "None within orb"}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2">
                <span>Deeptamsha Orb:</span>
                <span className="font-mono">{prashnaReport.framework.orbSeparationDeg?.toFixed(2)}°</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4. RADICALITY & STRICTURES                           */}
      {activeTab === "radicality" && (
        <div className="p-6 rounded-3xl bg-white border border-amber-900/10 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Radicality Assessment &amp; Shastric Strictures
              </h3>
              <p className="text-xs text-slate-600">
                Evaluates strictures against hasty or deceptive judgement (Early/Late Ascendant, Moon in 8th, Combust Karyesh, Saturn in 7th/1st).
              </p>
            </div>
            <AstroBadge
              label={prashnaReport.radicality.isRadical ? "Chart is Fully Radical" : "Strictures Present (Proceed with Caution)"}
              variant={prashnaReport.radicality.isRadical ? "green" : "gold"}
              size="md"
            />
          </div>

          <div className="space-y-2 pt-2">
            {prashnaReport.radicality.strictures.map((s, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl border flex justify-between items-start text-xs ${
                  s.isViolated
                    ? "bg-rose-50/60 border-rose-200 text-rose-950"
                    : "bg-slate-50 border-slate-200 text-slate-700"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{s.strictureType}</span>
                    {s.isViolated ? (
                      <span className="px-2 py-0.5 rounded-full bg-rose-200 text-rose-900 font-bold text-[10px]">
                        Stricture Violated ({s.severity})
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">
                        Radical / Clear
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600">{s.rule}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5. KP RULING PLANETS & SUB-LORDS                     */}
      {activeTab === "ruling" && (
        <div className="p-6 rounded-3xl bg-white border border-amber-900/10 shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-bold text-slate-900">
            Krishnamurti (KP) Ruling Planets at Query Epoch
          </h3>
          <p className="text-xs text-slate-600">
            Divine cosmic indicators: Ascendant Sign Lord, Ascendant Star Lord, Moon Sign Lord, Moon Star Lord, and Day Lord.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
            {[
              { role: "Day Lord (Vara)", planet: prashnaReport.rulingPlanets.dayLord },
              { role: "Moon Sign Lord", planet: prashnaReport.rulingPlanets.moonSignLord },
              { role: "Moon Star Lord", planet: prashnaReport.rulingPlanets.moonStarLord },
              { role: "Asc Sign Lord", planet: prashnaReport.rulingPlanets.ascSignLord },
              { role: "Asc Star Lord", planet: prashnaReport.rulingPlanets.ascStarLord },
            ].map((rp, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">{rp.role}</span>
                <span className="font-serif text-lg font-bold text-slate-900 block">{rp.planet}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 6. TIMING & FRUCTIFICATION                          */}
      {activeTab === "timing" && (
        <div className="p-6 rounded-3xl bg-white border border-amber-900/10 shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-bold text-slate-900">
            Event Timing &amp; Fructification Projections
          </h3>
          <p className="text-xs text-slate-600">
            Determined by degrees to aspect completion, sign motility (Movable: Days, Dual: Weeks, Fixed: Months/Years), and house classification.
          </p>

          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">Estimated Fructification Window</span>
              <span className="font-serif text-xl font-bold text-slate-900">
                {prashnaReport.timing.fructificationWindow || "Within 12 to 24 Days"}
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Based on the {prashnaReport.framework.aspectType} aspect between {prashnaReport.framework.lagnaLord} and {prashnaReport.framework.karyesh} with an angular separation of {prashnaReport.framework.orbSeparationDeg?.toFixed(2)}°, resolution occurs when the faster planet completes its orb transit across the horary cusp.
            </p>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 7. DEVA PRASHNA, OMENS & PANCHANGA                  */}
      {activeTab === "omens" && (
        <div className="p-6 rounded-3xl bg-white border border-amber-900/10 shadow-xs space-y-5">
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Kerala Deva Prashna &amp; Ashtamangala Omens
            </h3>
            <p className="text-xs text-slate-600">
              Traditional Shatpanchasika and Kerala Ashtamangala omens including cowries, lamp flame, Arudha Lagna, and instantaneous Panchangam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Directional Omen (Shakuna Shastra) */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2 text-xs">
              <span className="text-[10px] font-bold uppercase text-blue-900 block">
                Querent Direction: {querentDirection} ({ASHTA_DIK_OMENS[querentDirection].sanskrit})
              </span>
              <div className="flex justify-between">
                <span>Ruling Deity:</span>
                <span className="font-bold">{ASHTA_DIK_OMENS[querentDirection].deity}</span>
              </div>
              <div className="flex justify-between">
                <span>Omen Nature:</span>
                <span className="font-bold">{ASHTA_DIK_OMENS[querentDirection].nature}</span>
              </div>
              <div className="flex justify-between">
                <span>Fruition Probability:</span>
                <span className="font-bold text-emerald-700">{ASHTA_DIK_OMENS[querentDirection].fruitionProbability}</span>
              </div>
              <p className="text-[11px] text-slate-600 pt-1 border-t border-blue-200/60">
                {ASHTA_DIK_OMENS[querentDirection].omenSignificance}
              </p>
            </div>

            {/* Ashtamangala Cowrie Shells & Deepa */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2 text-xs">
              <span className="text-[10px] font-bold uppercase text-amber-900 block">
                Ashtamangala Cowries &amp; Lamp Flame Omen
              </span>
              <div className="flex justify-between items-center">
                <span>Cowrie Count (1–108):</span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min={1}
                    max={108}
                    value={cowrieCount}
                    onChange={(e) => setCowrieCount(Math.max(1, Math.min(108, parseInt(e.target.value) || 1)))}
                    className="w-16 p-1 rounded-lg border border-amber-300 bg-white text-center font-mono font-bold text-xs"
                  />
                  <span className="text-[10px] text-slate-500">Root: #{cowrieCount % 8 || 8}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Deepa (Flame) Omen:</span>
                <select
                  value={deepaOmen}
                  onChange={(e) => setDeepaOmen(e.target.value as any)}
                  className="p-1 rounded-lg border border-amber-300 bg-white text-xs font-semibold"
                >
                  <option value="Steady Bright (Shubha)">Steady Bright (Shubha)</option>
                  <option value="Flickering (Chanchala)">Flickering (Chanchala)</option>
                  <option value="Smoky (Dhooma)">Smoky (Dhooma)</option>
                  <option value="Dim / Manda">Dim / Manda</option>
                </select>
              </div>
              <p className="text-[11px] text-slate-600 pt-1 border-t border-amber-200/60">
                {deepaOmen.includes("Steady")
                  ? "Flame burns with golden clarity — Divine favor guarantees obstacle removal."
                  : "Flame indicates flickering mental focus; perform ghee lamp offering to stabilize results."}
              </p>
            </div>
          </div>

          {/* Instantaneous Panchangam Ribbon */}
          {panchangData && (
            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-2 text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">
                Panchangam of the Horary Epoch
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
                <div className="p-2 rounded-xl bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">Tithi</span>
                  <span className="font-bold text-slate-900">{panchangData.fivePillars.tithi.name}</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">Vara (Day)</span>
                  <span className="font-bold text-slate-900">{panchangData.fivePillars.vara.name}</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">Nakshatra</span>
                  <span className="font-bold text-slate-900">{panchangData.fivePillars.nakshatra.name}</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">Yoga</span>
                  <span className="font-bold text-slate-900">{panchangData.fivePillars.yoga.name}</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">Karana</span>
                  <span className="font-bold text-slate-900">{panchangData.fivePillars.karana.name}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
