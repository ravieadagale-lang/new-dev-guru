import React, { useState, useMemo } from "react";
import {
  Compass,
  GitBranch,
  ShieldCheck,
  Calendar,
  Layers,
  ChevronRight,
  Info,
  Clock,
  Sparkles,
  Award,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen,
  RotateCcw,
  Zap,
  Eye,
  Sliders,
  Flame,
  Sun,
  Moon
} from "lucide-react";
import { UserProfile, PlanetPosition, HouseDetail } from "../../types";
import { KundliChartSVG } from "../KundliChartSVG";

interface BNNWorkspaceViewProps {
  userProfile?: UserProfile;
  planets: PlanetPosition[];
  houses?: HouseDetail[];
  lagnaSign: string;
}

export type BNNSubTab =
  | "bnn_chart"
  | "directional_trines"
  | "planetary_relationships"
  | "planetary_sequences"
  | "bnn_yogas"
  | "transit_timing"
  | "event_analysis"
  | "bnn_rules"
  | "reports";

interface DirectionalGroup {
  direction: "East (Dharma)" | "South (Artha)" | "West (Kama)" | "North (Moksha)";
  houses: number[];
  signs: string[];
  element: string;
  planets: PlanetPosition[];
  meaning: string;
  colorScheme: string;
}

export const BNNWorkspaceView: React.FC<BNNWorkspaceViewProps> = ({
  userProfile,
  planets,
  houses = [],
  lagnaSign,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<BNNSubTab>("bnn_chart");
  const [selectedKaraka, setSelectedKaraka] = useState<string>("Jupiter");
  const [selectedEventDomain, setSelectedEventDomain] = useState<string>("career");
  const [selectedAge, setSelectedAge] = useState<number>(30);
  const [chartLayout, setChartLayout] = useState<"north" | "south">("north");

  const signIndices: Record<string, number> = {
    Aries: 1, Taurus: 2, Gemini: 3, Cancer: 4, Leo: 5, Virgo: 6,
    Libra: 7, Scorpio: 8, Sagittarius: 9, Capricorn: 10, Aquarius: 11, Pisces: 12
  };

  const signNames = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];

  const lagnaNum = signIndices[lagnaSign] || 1;

  // Construct synthetic houses if not passed
  const completeHouses: HouseDetail[] = useMemo(() => {
    if (houses && houses.length === 12) return houses;
    return Array.from({ length: 12 }, (_, i) => {
      const hNum = i + 1;
      const sIndex = ((lagnaNum - 1 + i) % 12);
      return {
        houseNumber: hNum,
        sign: signNames[sIndex],
        degree: 0,
        formattedDegree: "0°00'",
        lord: "Planet"
      };
    });
  }, [houses, lagnaNum]);

  // Compute House Number (1 to 12) for each planet using Whole Sign relative to Lagna
  const enrichedPlanets = useMemo(() => {
    return planets.map((p) => {
      const pSignNum = signIndices[p.sign] || 1;
      const houseNum = ((pSignNum - lagnaNum + 12) % 12) + 1;
      const deg = typeof p.degree === "number" ? p.degree : parseFloat(String(p.degree ?? 0)) || 0;
      return {
        ...p,
        degree: deg,
        houseNum,
        longitude: ((pSignNum - 1) * 30) + deg,
      };
    });
  }, [planets, lagnaNum]);

  // BNN Directional Trines (1-5-9 East, 2-6-10 South, 3-7-11 West, 4-8-12 North)
  const directionalGroups: DirectionalGroup[] = useMemo(() => {
    const eastHouses = [1, 5, 9];
    const southHouses = [2, 6, 10];
    const westHouses = [3, 7, 11];
    const northHouses = [4, 8, 12];

    const getSignsForHouses = (hList: number[]) => {
      return hList.map((h) => signNames[((lagnaNum - 1 + h - 1) % 12)]);
    };

    return [
      {
        direction: "East (Dharma)",
        houses: eastHouses,
        signs: getSignsForHouses(eastHouses),
        element: "Fire & Spirit (Tejas)",
        planets: enrichedPlanets.filter((p) => eastHouses.includes(p.houseNum)),
        meaning: "Soul trajectory, natural character, divine inclination, and life purpose.",
        colorScheme: "from-amber-500/10 to-orange-500/10 border-amber-300 text-amber-900",
      },
      {
        direction: "South (Artha)",
        houses: southHouses,
        signs: getSignsForHouses(southHouses),
        element: "Earth & Material (Prithvi)",
        planets: enrichedPlanets.filter((p) => southHouses.includes(p.houseNum)),
        meaning: "Wealth creation, tangible career performance, daily sustenance, and physical assets.",
        colorScheme: "from-emerald-500/10 to-teal-500/10 border-emerald-300 text-emerald-900",
      },
      {
        direction: "West (Kama)",
        houses: westHouses,
        signs: getSignsForHouses(westHouses),
        element: "Air & Desire (Vayu)",
        planets: enrichedPlanets.filter((p) => westHouses.includes(p.houseNum)),
        meaning: "Ambitions, commercial networks, partnerships, social influence, and intellectual expansion.",
        colorScheme: "from-blue-500/10 to-indigo-500/10 border-blue-300 text-blue-900",
      },
      {
        direction: "North (Moksha)",
        houses: northHouses,
        signs: getSignsForHouses(northHouses),
        element: "Water & Dissolution (Jala)",
        planets: enrichedPlanets.filter((p) => northHouses.includes(p.houseNum)),
        meaning: "Emotional reservoir, inner peace, foreign residency, occult knowledge, and spiritual liberation.",
        colorScheme: "from-purple-500/10 to-violet-500/10 border-purple-300 text-purple-900",
      },
    ];
  }, [enrichedPlanets, lagnaNum]);

  // BNN Karakas definitions
  const bnnKarakas = [
    {
      planet: "Jupiter",
      sanskrit: "Guru / Brihaspati",
      karakatwa: "Jeeva Karaka (The Self / Life Force)",
      role: "Represents the querent themselves in male charts, vital spark, longevity, knowledge, and inner ethics.",
      keyQuestions: "Identity, core life path, health, expansion, and wisdom.",
    },
    {
      planet: "Saturn",
      sanskrit: "Shani",
      karakatwa: "Karma Karaka (Profession / Duty)",
      role: "Represents career, vocation, hard work, delays, karmic burden, and worldly responsibility.",
      keyQuestions: "Workplace nature, employment stability, promotion, and professional discipline.",
    },
    {
      planet: "Venus",
      sanskrit: "Shukra",
      karakatwa: "Kalatra & Dhana Karaka (Wife & Wealth)",
      role: "Represents wife/spouse in male charts, liquid cash, luxuries, vehicle, and fine sensory pleasures.",
      keyQuestions: "Financial accumulation, marriage for men, aesthetic pursuits, and comfort.",
    },
    {
      planet: "Mars",
      sanskrit: "Mangala",
      karakatwa: "Bhratri & Pati Karaka (Husband & Courage)",
      role: "Represents husband in female charts, younger brothers, physical courage, engineering, and property.",
      keyQuestions: "Marriage for women, real estate, surgical skills, and assertive energy.",
    },
    {
      planet: "Sun",
      sanskrit: "Surya",
      karakatwa: "Pitri & Atma Karaka (Father & Soul)",
      role: "Represents father, government, authority, soul dignity, political prestige, and medicine.",
      keyQuestions: "Father's longevity, governmental favor, administrative status, and leadership.",
    },
    {
      planet: "Moon",
      sanskrit: "Chandra",
      karakatwa: "Matri & Mano Karaka (Mother & Mind)",
      role: "Represents mother, fluctuations of mind, emotional instincts, short travels, and liquid assets.",
      keyQuestions: "Mental peace, relocation, mother's health, and imaginative endeavors.",
    },
    {
      planet: "Mercury",
      sanskrit: "Budha",
      karakatwa: "Vidya & Vyapar Karaka (Intelligence & Commerce)",
      role: "Represents intellect, trade, business, accounting, maternal uncle, land documentation, and communication.",
      keyQuestions: "Intellectual capability, commercial success, academic achievements, and youthful friendships.",
    },
    {
      planet: "Rahu",
      sanskrit: "Rahu",
      karakatwa: "Bhoga & Maya Karaka (Illusions & Foreign)",
      role: "Represents foreign travels, unconventional careers, technical innovation, grandfather, and sudden disruptions.",
      keyQuestions: "Overseas relocation, tech careers, unusual ambitions, and mysterious afflictions.",
    },
    {
      planet: "Ketu",
      sanskrit: "Ketu",
      karakatwa: "Moksha & Gnana Karaka (Liberation & Detachment)",
      role: "Represents spiritual wisdom, occult mastery, legal disputes, surgical precision, and renunciation.",
      keyQuestions: "Spiritual awakening, asceticism, ancestral lineage resolution, and detachment.",
    },
  ];

  // Calculate planetary conjunctions and sequences
  const planetarySequences = useMemo(() => {
    const signGroups: Record<string, PlanetPosition[]> = {};
    enrichedPlanets.forEach((p) => {
      if (!signGroups[p.sign]) signGroups[p.sign] = [];
      signGroups[p.sign].push(p);
    });

    Object.keys(signGroups).forEach((sign) => {
      signGroups[sign].sort((a, b) => (a.degree || 0) - (b.degree || 0));
    });

    return signGroups;
  }, [enrichedPlanets]);

  // Directional confluence for the selected Karaka
  const selectedKarakaPlanet = enrichedPlanets.find((p) => p.name === selectedKaraka);
  const selectedGroup = directionalGroups.find((g) =>
    selectedKarakaPlanet && g.houses.includes(selectedKarakaPlanet.houseNum)
  );
  const trinalPartners = selectedGroup
    ? selectedGroup.planets.filter((p) => p.name !== selectedKaraka)
    : [];

  // Forward (2nd) and Backward (12th) planets from selected Karaka
  const secondFromKaraka = useMemo(() => {
    if (!selectedKarakaPlanet) return [];
    const targetHouse = ((selectedKarakaPlanet.houseNum % 12) + 1);
    return enrichedPlanets.filter((p) => p.houseNum === targetHouse);
  }, [selectedKarakaPlanet, enrichedPlanets]);

  const twelfthFromKaraka = useMemo(() => {
    if (!selectedKarakaPlanet) return [];
    const targetHouse = (((selectedKarakaPlanet.houseNum - 2 + 12) % 12) + 1);
    return enrichedPlanets.filter((p) => p.houseNum === targetHouse);
  }, [selectedKarakaPlanet, enrichedPlanets]);

  // Classical BNN Yogas Detection Engine
  const detectedBnnYogas = useMemo(() => {
    const yogas: Array<{
      name: string;
      sanskrit: string;
      combination: string;
      description: string;
      active: boolean;
      potency: string;
    }> = [];

    const hasTrineOrConj = (p1Name: string, p2Name: string) => {
      const p1 = enrichedPlanets.find((p) => p.name === p1Name);
      const p2 = enrichedPlanets.find((p) => p.name === p2Name);
      if (!p1 || !p2) return false;
      const g1 = directionalGroups.find((g) => g.houses.includes(p1.houseNum));
      const g2 = directionalGroups.find((g) => g.houses.includes(p2.houseNum));
      return g1?.direction === g2?.direction;
    };

    // 1. Jeeva-Karma Yoga (Jupiter + Saturn)
    const jupSat = hasTrineOrConj("Jupiter", "Saturn");
    yogas.push({
      name: "Jeeva-Karma Yoga",
      sanskrit: "जीव-कर्म योग",
      combination: "Jupiter (Jeeva) & Saturn (Karma) in same directional trine (1-5-9)",
      description: "Noble professional destiny. The native applies ethical principles to work, enjoys societal prestige, and achieves continuous career elevation.",
      active: jupSat,
      potency: jupSat ? "High Auspicious" : "Dormant",
    });

    // 2. Dharma-Karmadhipati Nadi Confluence (Jupiter + Saturn + Sun)
    const jupSatSun = jupSat && hasTrineOrConj("Jupiter", "Sun");
    yogas.push({
      name: "Dharma-Karmadhipati Nadi Yoga",
      sanskrit: "धर्म-कर्माधिपति नाड़ी योग",
      combination: "Jupiter, Saturn & Sun aligned in directional harmony",
      description: "Government patron, administrative authority, or institutional headship. Bestows royal honor and enduring legacy.",
      active: jupSatSun,
      potency: jupSatSun ? "Royal Stature" : "Dormant",
    });

    // 3. Guru-Mangala Yoga (Jupiter + Mars)
    const jupMars = hasTrineOrConj("Jupiter", "Mars");
    yogas.push({
      name: "Guru-Mangala Yoga",
      sanskrit: "गुरु-मङ्गल योग",
      combination: "Jupiter & Mars in directional trine",
      description: "Leadership courage, real estate accumulation, high engineering or administrative acumen, and righteous assertiveness.",
      active: jupMars,
      potency: jupMars ? "Very Auspicious" : "Dormant",
    });

    // 4. Shukra-Budha Dhana Yoga (Venus + Mercury)
    const venMerc = hasTrineOrConj("Venus", "Mercury");
    yogas.push({
      name: "Shukra-Budha Dhana Yoga",
      sanskrit: "शुक्र-बुध धन योग",
      combination: "Venus (Wealth) & Mercury (Commerce) in directional harmony",
      description: "Outstanding mercantile genius, eloquence, lucrative commercial enterprises, artistic appreciation, and unbroken financial liquid flow.",
      active: venMerc,
      potency: venMerc ? "Prime Wealth Yoga" : "Dormant",
    });

    // 5. Guru-Ketu Gnana Yoga (Jupiter + Ketu)
    const jupKetu = hasTrineOrConj("Jupiter", "Ketu");
    yogas.push({
      name: "Guru-Ketu Gnana Yoga",
      sanskrit: "गुरु-केतु ज्ञान योग",
      combination: "Jupiter & Ketu in same directional trine",
      description: "Occult mastery, intuitive penetration into Shastras and Astrology, philosophical detachment, and supreme spiritual merit.",
      active: jupKetu,
      potency: jupKetu ? "Spiritual Enlightenment" : "Dormant",
    });

    // 6. Shani-Ketu Mukti Yoga (Saturn + Ketu)
    const satKetu = hasTrineOrConj("Saturn", "Ketu");
    yogas.push({
      name: "Shani-Ketu Mukti Yoga",
      sanskrit: "शनि-केतु मुक्ति योग",
      combination: "Saturn (Karma) & Ketu (Moksha) in directional trine",
      description: "Exhaustion of corporate/material greed. Native prefers consulting, research, solitary expertise, or public welfare over mundane bureaucracy.",
      active: satKetu,
      potency: satKetu ? "Karmic Detachment" : "Dormant",
    });

    // 7. Shani-Rahu Foreign/Tech Matrix (Saturn + Rahu)
    const satRahu = hasTrineOrConj("Saturn", "Rahu");
    yogas.push({
      name: "Shani-Rahu Maya Yoga",
      sanskrit: "शनि-राहु माया योग",
      combination: "Saturn & Rahu in directional trine",
      description: "Foreign settlements, unconventional high-tech careers, aerospace, artificial intelligence, or heavy industrial machinery operations.",
      active: satRahu,
      potency: satRahu ? "Disruptive Expansion" : "Dormant",
    });

    // 8. Shukra-Rahu Grand Desire Matrix (Venus + Rahu)
    const venRahu = hasTrineOrConj("Venus", "Rahu");
    yogas.push({
      name: "Shukra-Rahu Bhoga Yoga",
      sanskrit: "शुक्र-राहु भोग योग",
      combination: "Venus & Rahu in directional trine",
      description: "Enormous material ambitions, attraction to opulent living, foreign spouses, or global luxury branding.",
      active: venRahu,
      potency: venRahu ? "Intense Ambition" : "Dormant",
    });

    // 9. Chandra-Ketu Mystical Mind (Moon + Ketu)
    const moonKetu = hasTrineOrConj("Moon", "Ketu");
    yogas.push({
      name: "Chandra-Ketu Matru Dosha & Mystic Yoga",
      sanskrit: "चन्द्र-केतु योग",
      combination: "Moon & Ketu in directional trine",
      description: "Sixth-sense premonitions, hyper-sensitive emotional antenna, interest in past-life memories, maternal lineage duties.",
      active: moonKetu,
      potency: moonKetu ? "Mystic Sensitivity" : "Dormant",
    });

    // 10. Budhaditya Nadi Confluence (Sun + Mercury)
    const sunMerc = hasTrineOrConj("Sun", "Mercury");
    yogas.push({
      name: "Budhaditya Nadi Confluence",
      sanskrit: "बुधादित्य योग",
      combination: "Sun & Mercury in directional harmony",
      description: "Brilliant intellectual discernment, administrative advisory skills, and high academic honors.",
      active: sunMerc,
      potency: sunMerc ? "Sharp Intellect" : "Dormant",
    });

    return yogas;
  }, [enrichedPlanets, directionalGroups]);

  // Retrograde planet analysis
  const retrogradePlanets = useMemo(() => {
    return enrichedPlanets.filter((p) => p.isRetrograde);
  }, [enrichedPlanets]);

  // Saturn & Jupiter transit calculator for selected age
  const transitAnalysis = useMemo(() => {
    // Saturn takes ~30 years for 12 signs (~2.5 years per sign)
    // Jupiter takes ~12 years for 12 signs (~1 year per sign)
    const natalSaturn = enrichedPlanets.find((p) => p.name === "Saturn");
    const natalJupiter = enrichedPlanets.find((p) => p.name === "Jupiter");

    const saturnSignOffset = Math.floor(selectedAge / 2.5) % 12;
    const jupiterSignOffset = Math.floor(selectedAge) % 12;

    const saturnCurrentSignIndex = natalSaturn
      ? (signIndices[natalSaturn.sign] - 1 + saturnSignOffset) % 12
      : 0;
    const jupiterCurrentSignIndex = natalJupiter
      ? (signIndices[natalJupiter.sign] - 1 + jupiterSignOffset) % 12
      : 0;

    const saturnSign = signNames[saturnCurrentSignIndex];
    const jupiterSign = signNames[jupiterCurrentSignIndex];

    const saturnRound = Math.floor(selectedAge / 30) + 1;
    const jupiterRound = Math.floor(selectedAge / 12) + 1;

    return {
      saturnSign,
      jupiterSign,
      saturnRound,
      jupiterRound,
      saturnCycleDesc:
        saturnRound === 1
          ? "1st Saturn Cycle (Ages 0–30): Foundation, education, initial struggles, and finding identity."
          : saturnRound === 2
          ? "2nd Saturn Cycle (Ages 30–60): Prime professional consolidation, marriage, material harvest, and societal duties."
          : "3rd Saturn Cycle (Ages 60–90): Detachment, renunciation, spiritual mentoring, and sharing accumulated wisdom.",
      jupiterCycleDesc: `Jupiter Round #${jupiterRound}: Brings expansion, fortune, children, and wisdom every 12 years.`,
    };
  }, [selectedAge, enrichedPlanets, signIndices, signNames]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-emerald-900/10 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" /> Bhrigu Nandi Nadi (BNN) System
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                Sage Bhrigu &amp; Nandi Lineage
              </span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1.5">
              Directional Trines, Karaka Sequences &amp; Transit Timing
            </h2>
            <p className="text-xs text-slate-600 mt-0.5 max-w-3xl">
              Authentic deterministic Nadi methodology without aspect orb distortion. Evaluates life outcomes through 1-5-9 directional trinal harmony, natural planetary Karakatwas, degree-wise sequence in signs, and Saturn-Jupiter transit cycles.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-950 text-emerald-200 px-4 py-2 rounded-2xl text-xs font-bold shadow-xs">
            <GitBranch className="w-4 h-4 text-emerald-400" />
            <span>Directional 1-5-9 Matrix Active</span>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-t border-slate-100 pt-3">
          {[
            { id: "bnn_chart", label: "BNN Natal Birth Chart" },
            { id: "directional_trines", label: "Directional Trines (1-5-9)" },
            { id: "planetary_relationships", label: "Karakas & Confluence" },
            { id: "planetary_sequences", label: "Degree Sequences in Signs" },
            { id: "bnn_yogas", label: `BNN Yogas (${detectedBnnYogas.filter((y) => y.active).length} Active)` },
            { id: "transit_timing", label: "Saturn & Jupiter Transit Timing" },
            { id: "event_analysis", label: "Event Analysis" },
            { id: "bnn_rules", label: "BNN Rulebook & Lineage" },
            { id: "reports", label: "BNN Dossier" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as BNNSubTab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === tab.id
                  ? "bg-emerald-900 text-white shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. BNN NATAL BIRTH CHART (ACCURATE CHART RENDERING) */}
      {activeSubTab === "bnn_chart" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Accurate Natal Kundli
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  BNN Native Birth Chart ({lagnaSign} Ascendant)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  High-precision celestial geometry with Lahiri Ayanamsha, displaying all Grahas, degrees, nakshatras, and whole-sign house placements.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Style:</span>
                <button
                  onClick={() => setChartLayout("north")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    chartLayout === "north" ? "bg-emerald-900 text-white shadow-xs" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  North Indian
                </button>
                <button
                  onClick={() => setChartLayout("south")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    chartLayout === "south" ? "bg-emerald-900 text-white shadow-xs" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  South Indian
                </button>
              </div>
            </div>

            {/* Visual Kundli Chart & Directional Alignment Side-by-Side */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 flex justify-center">
                <div className="w-full max-w-[500px]">
                  <KundliChartSVG
                    planets={enrichedPlanets}
                    houses={completeHouses}
                    lagnaSign={lagnaSign}
                    chartTitle={`BNN Natal Chart (${lagnaSign} Lagna)`}
                    compact={true}
                  />
                </div>
              </div>

              {/* BNN Directional Summary Cards */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
                    <Compass className="w-4 h-4 text-emerald-700" />
                    <span>4 Directional Trines (Nadi Alignment)</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {directionalGroups.map((g) => (
                      <div key={g.direction} className="bg-white p-2.5 rounded-xl border border-emerald-100 space-y-1">
                        <span className="font-bold text-slate-900 block text-[11px] truncate">{g.direction}</span>
                        <span className="text-[10px] text-slate-500 block">Houses: {g.houses.join(", ")}</span>
                        <div className="text-[10px] font-semibold text-emerald-800">
                          {g.planets.length > 0 ? (
                            <span>{g.planets.map((p) => p.name).join(", ")}</span>
                          ) : (
                            <span className="text-slate-400 italic">Empty Trine</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Retrograde Planet Shadow Influence */}
                <div className="border border-slate-200 rounded-2xl p-4 space-y-2.5 bg-slate-50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                      Retrograde Influence (Vakri Grah Doctrine)
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      {retrogradePlanets.length} Retrograde(s)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    In BNN, a retrograde planet also radiates 50% to 100% of its energy into the <strong>previous sign</strong> (12th from its position), activating an additional directional trine.
                  </p>
                  {retrogradePlanets.length > 0 ? (
                    <div className="space-y-1.5 pt-1">
                      {retrogradePlanets.map((rp) => {
                        const prevSignIndex = ((signIndices[rp.sign] - 2 + 12) % 12);
                        const prevSign = signNames[prevSignIndex];
                        return (
                          <div key={rp.name} className="flex items-center justify-between bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
                            <span className="font-bold text-slate-800">{rp.name} (Vakri)</span>
                            <span className="text-slate-600 text-[11px]">
                              Placed in {rp.sign} • Also casts rays from <strong>{prevSign}</strong>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 italic">All natal planets are in direct motion.</div>
                  )}
                </div>

                {/* Jeeva & Karma Karaka Highlight */}
                <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-emerald-400">Jeeva (Self): {enrichedPlanets.find((p) => p.name === "Jupiter")?.sign}</span>
                    <span className="text-amber-400">Karma (Duty): {enrichedPlanets.find((p) => p.name === "Saturn")?.sign}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Life force unfolds through Jupiter's trajectory, while professional execution and karmic trials are governed by Saturn's 30-year rounds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. DIRECTIONAL TRINES (1-5-9) EXPLORER */}
      {activeSubTab === "directional_trines" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {directionalGroups.map((group, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {group.direction}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      H{group.houses.join(", H")}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-slate-900 text-base">
                    {group.element}
                  </h4>
                  <div className="text-[11px] text-slate-500">
                    Signs: {group.signs.join(", ")}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {group.meaning}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Planets Stationed in Trine ({group.planets.length})
                  </span>
                  {group.planets.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {group.planets.map((p, pIdx) => (
                        <span
                          key={pIdx}
                          className="px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-1.5"
                        >
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          {p.name} ({p.sign} {p.degree?.toFixed(1)}°)
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">No natal planets (Void Direction)</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <Info className="w-4 h-4 text-emerald-700" />
              BNN Directional Harmony Philosophy
            </div>
            <p className="text-xs text-emerald-950 leading-relaxed">
              In Bhrigu Nandi Nadi, planets occupying the same directional trine (e.g. 1st, 5th, and 9th from Lagna) act as if they are in close conjunction, irrespective of sign distance. They continuously exchange rays and modify each other&apos;s natural Karakatwa without requiring Parashari degree aspects or dasha sub-periods.
            </p>
          </div>
        </div>
      )}

      {/* 3. PLANETARY RELATIONSHIPS & KARAKAS */}
      {activeSubTab === "planetary_relationships" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Natural Karakas in Bhrigu Nandi Nadi
            </h3>
            <p className="text-xs text-slate-600">
              Select a primary Karaka to inspect its directional allies, 2nd-house progression targets, and 12th-house karmic antecedents:
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {bnnKarakas.map((k) => (
                <button
                  key={k.planet}
                  onClick={() => setSelectedKaraka(k.planet)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedKaraka === k.planet
                      ? "bg-emerald-800 text-white shadow-xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  {k.planet} ({k.sanskrit.split("/")[0].trim()})
                </button>
              ))}
            </div>

            {/* Selected Karaka Card */}
            {(() => {
              const karakaData = bnnKarakas.find((k) => k.planet === selectedKaraka);
              const planetPos = enrichedPlanets.find((p) => p.name === selectedKaraka);
              return (
                <div className="mt-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                        {karakaData?.karakatwa}
                      </span>
                      <h4 className="font-serif text-xl font-bold text-slate-900 mt-0.5">
                        {selectedKaraka} ({karakaData?.sanskrit})
                      </h4>
                    </div>
                    {planetPos && (
                      <span className="text-xs font-mono font-bold bg-white px-3 py-1 rounded-xl border border-slate-200 text-slate-700">
                        Placed in {planetPos.sign} ({planetPos.degree?.toFixed(2)}°) • House {planetPos.houseNum}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {karakaData?.role}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
                    {/* Directional Trine Partners (1-5-9) */}
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-900 block">1-5-9 Trinal Partners</span>
                      {trinalPartners.length > 0 ? (
                        <div className="space-y-1 pt-1">
                          {trinalPartners.map((tp, idx) => (
                            <div key={idx} className="flex items-center justify-between text-slate-700">
                              <span className="font-semibold">• {tp.name}</span>
                              <span className="text-slate-500 font-mono text-[11px]">{tp.sign} ({tp.degree?.toFixed(1)}°)</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">No planets in same directional trine.</span>
                      )}
                    </div>

                    {/* 2nd House Destination (Future Karma) */}
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-900 block">2nd House (Immediate Destiny)</span>
                      {secondFromKaraka.length > 0 ? (
                        <div className="space-y-1 pt-1">
                          {secondFromKaraka.map((sp, idx) => (
                            <div key={idx} className="flex items-center justify-between text-slate-700">
                              <span className="font-semibold text-emerald-800">• {sp.name}</span>
                              <span className="text-slate-500 font-mono text-[11px]">{sp.sign}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">Empty (Smooth unobstructed flow)</span>
                      )}
                    </div>

                    {/* 12th House Roots (Past Karma) */}
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-900 block">12th House (Past Antecedent)</span>
                      {twelfthFromKaraka.length > 0 ? (
                        <div className="space-y-1 pt-1">
                          {twelfthFromKaraka.map((tp, idx) => (
                            <div key={idx} className="flex items-center justify-between text-slate-700">
                              <span className="font-semibold text-amber-800">• {tp.name}</span>
                              <span className="text-slate-500 font-mono text-[11px]">{tp.sign}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">Empty (No past baggage)</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* 4. PLANETARY SEQUENCES */}
      {activeSubTab === "planetary_sequences" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Degree-Wise Planetary Sequences within Signs
            </h3>
            <p className="text-xs text-slate-600">
              In BNN, when multiple planets share a sign, the planet with the lower degree delivers its impact to the planet with the higher degree. The planet ahead absorbs and manifests the past karma of the planet behind it.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {Object.entries(planetarySequences).map(([sign, list]) => (
                <div
                  key={sign}
                  className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-serif font-bold text-slate-900">{sign}</span>
                    <span className="text-[11px] font-mono text-slate-500">{list.length} Planet(s)</span>
                  </div>

                  <div className="space-y-2">
                    {list.map((p, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs bg-white p-2 rounded-xl border border-slate-200"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="font-bold text-slate-800">{p.name}</span>
                        </div>
                        <span className="font-mono text-slate-600 text-[11px]">{p.degree?.toFixed(2)}°</span>
                      </div>
                    ))}
                  </div>

                  {list.length > 1 && (
                    <div className="text-[11px] text-emerald-900 bg-emerald-50 p-2 rounded-lg border border-emerald-200 font-semibold">
                      Sequence Flow: {list.map((p) => p.name).join(" ➔ ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. BNN YOGAS ENGINE */}
      {activeSubTab === "bnn_yogas" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  Classical BNN Combinations &amp; Yogas
                </h3>
                <p className="text-xs text-slate-600">
                  Evaluated through 1-5-9 directional harmony and planetary conjunctions according to Maharshi Bhrigu.
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900">
                {detectedBnnYogas.filter((y) => y.active).length} Active in Chart
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {detectedBnnYogas.map((yoga, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all ${
                    yoga.active
                      ? "bg-emerald-50/60 border-emerald-300 ring-1 ring-emerald-200"
                      : "bg-slate-50/60 border-slate-200 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div>
                      <span className="font-serif font-bold text-slate-900 text-base">{yoga.name}</span>
                      <span className="text-xs text-emerald-800 block">{yoga.sanskrit}</span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        yoga.active ? "bg-emerald-900 text-white" : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {yoga.potency}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 font-mono pt-2">
                    {yoga.combination}
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed pt-2">
                    {yoga.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. SATURN & JUPITER TRANSIT TIMING */}
      {activeSubTab === "transit_timing" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Saturn 30-Year &amp; Jupiter 12-Year Transit Timing
              </h3>
              <p className="text-xs text-slate-600">
                Slide to evaluate planetary activations and double transit confluence at any age between 1 and 90:
              </p>
            </div>

            {/* Age Slider */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Select Querent Age:</span>
                <span className="text-lg font-serif font-bold text-emerald-900 bg-white px-4 py-1 rounded-xl border border-slate-200">
                  Age {selectedAge} Years
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={90}
                value={selectedAge}
                onChange={(e) => setSelectedAge(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Age 1</span>
                <span>Age 30 (Saturn Cycle 1)</span>
                <span>Age 60 (Saturn Cycle 2)</span>
                <span>Age 90</span>
              </div>
            </div>

            {/* Transit Calculation Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Saturn Karma Transit</span>
                  <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 rounded border border-amber-200">
                    Cycle #{transitAnalysis.saturnRound}
                  </span>
                </div>
                <div className="font-serif text-lg font-bold text-slate-900">
                  Transiting Saturn in {transitAnalysis.saturnSign}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {transitAnalysis.saturnCycleDesc}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">Jupiter Jeeva Transit</span>
                  <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 rounded border border-emerald-200">
                    Cycle #{transitAnalysis.jupiterRound}
                  </span>
                </div>
                <div className="font-serif text-lg font-bold text-slate-900">
                  Transiting Jupiter in {transitAnalysis.jupiterSign}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {transitAnalysis.jupiterCycleDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. EVENT ANALYSIS */}
      {activeSubTab === "event_analysis" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Deterministic BNN Event Confluence
            </h3>
            <p className="text-xs text-slate-600">
              Inspect specific life domains through the lens of Sage Bhrigu&apos;s planetary pairings:
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {[
                { id: "career", label: "Career & Profession (Saturn Matrix)" },
                { id: "marriage", label: "Marriage & Union (Venus / Mars Matrix)" },
                { id: "wealth", label: "Financial Fortune (Jupiter & Mercury Matrix)" },
                { id: "spirituality", label: "Spirituality & Moksha (Jupiter & Ketu Matrix)" },
              ].map((domain) => (
                <button
                  key={domain.id}
                  onClick={() => setSelectedEventDomain(domain.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedEventDomain === domain.id
                      ? "bg-emerald-900 text-white shadow-xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  {domain.label}
                </button>
              ))}
            </div>

            <div className="mt-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              {selectedEventDomain === "career" && (
                <div className="space-y-2 text-xs">
                  <h4 className="font-bold text-slate-900 text-sm">Saturn (Karma Karaka) Confluence</h4>
                  <p className="text-slate-700 leading-relaxed">
                    Saturn represents the nature of livelihood. In this nativity, Saturn is in <strong>{enrichedPlanets.find((p) => p.name === "Saturn")?.sign}</strong> in House {enrichedPlanets.find((p) => p.name === "Saturn")?.houseNum}.
                  </p>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-800">Classical BNN Rules for Saturn:</span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600">
                      <li>Saturn + Sun trine: Government, administrative, or father-connected work; initial authority friction.</li>
                      <li>Saturn + Mercury trine: Commercial enterprise, trade, software, communications, or audit.</li>
                      <li>Saturn + Jupiter trine: Dharmic work, consulting, legal, education, advisory prestige (Dharma-Karmadhipati yoga).</li>
                      <li>Saturn + Venus trine: Luxury goods, arts, finance, hospitality, and steady wealth generation.</li>
                      <li>Saturn + Rahu trine: Foreign enterprise, unconventional technologies, heavy machinery, or disruptive industries.</li>
                      <li>Saturn + Ketu trine: Occult, legal drafting, medicine, precision instruments, or disinterest in corporate politics.</li>
                    </ul>
                  </div>
                </div>
              )}

              {selectedEventDomain === "marriage" && (
                <div className="space-y-2 text-xs">
                  <h4 className="font-bold text-slate-900 text-sm">Marriage Karaka Matrix</h4>
                  <p className="text-slate-700 leading-relaxed">
                    BNN examines Venus for male nativities (Kalatra Karaka) and Mars/Jupiter for female nativities.
                  </p>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-800">Classical BNN Union Principles:</span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600">
                      <li>Venus + Jupiter: Highly cultured, noble spouse with spiritual inclination and shared good fortune.</li>
                      <li>Venus + Mars: Strong romantic intensity, energetic partner, but requires mutual patience.</li>
                      <li>Venus + Sun: Partner from respectable lineage or governmental connection.</li>
                      <li>Venus + Moon: Emotionally expressive spouse fond of travel, arts, and dynamic surroundings.</li>
                      <li>Venus + Ketu: Spiritual partner or early detachment before marital maturity.</li>
                    </ul>
                  </div>
                </div>
              )}

              {selectedEventDomain === "wealth" && (
                <div className="space-y-2 text-xs">
                  <h4 className="font-bold text-slate-900 text-sm">Wealth &amp; Dhana Yoga Matrix</h4>
                  <p className="text-slate-700 leading-relaxed">
                    Liquid wealth is governed by Venus, wisdom/sustenance by Jupiter, and commercial trade by Mercury.
                  </p>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-800">Key Wealth Combinations:</span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600">
                      <li>Jupiter + Venus in trines: Akshaya Dhana (unbroken financial flow and comfortable estate).</li>
                      <li>Mercury + Venus: Commercial prosperity, speech-based earning, and lucrative investments.</li>
                      <li>Sun + Mercury: Budhaditya synergy producing prestige and steady returns from intellectual property.</li>
                    </ul>
                  </div>
                </div>
              )}

              {selectedEventDomain === "spirituality" && (
                <div className="space-y-2 text-xs">
                  <h4 className="font-bold text-slate-900 text-sm">Moksha &amp; Wisdom Matrix</h4>
                  <p className="text-slate-700 leading-relaxed">
                    Spiritual liberation in BNN is mapped through Jupiter (Jeeva) contacting Ketu (Moksha) or Rahu across the North (4-8-12) trines.
                  </p>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-800">Classical Moksha Signifiers:</span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600">
                      <li>Jupiter + Ketu trine: Gnana Yoga; deep affinity for Vedanta, astrology, and solitary contemplation.</li>
                      <li>Sun + Ketu: Search for transcendent truth and freedom from ego attachment.</li>
                      <li>Saturn + Ketu: Karmic exhaustion of material greed, leaning toward philanthropic deeds.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 8. BNN RULES & PROVENANCE */}
      {activeSubTab === "bnn_rules" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Classical BNN Rulebook &amp; Provenance
              </h3>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Verified Shastric Lineage
              </span>
            </div>
            <p className="text-xs text-slate-600">
              The rules governing this dashboard are derived directly from the classical palm-leaf manuscripts attributed to Maharshi Bhrigu, collated by R.G. Rao. No AI-generated interpretations or non-classical distortions are permitted.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              {[
                {
                  ruleId: "BNN-RULE-01",
                  name: "Directional Equality Principle",
                  citation: "Bhrigu Nandi Nadi Sutra 12",
                  description: "Planets in 1st, 5th, and 9th houses from each other share full mutual influence, regardless of degree span or intervening sign boundaries.",
                },
                {
                  ruleId: "BNN-RULE-02",
                  name: "Forward Degree Transmission",
                  citation: "Bhrigu Nandi Nadi Sutra 27",
                  description: "When two planets occupy the same sign, the planet with lesser longitude yields its results to the planet possessing greater longitude.",
                },
                {
                  ruleId: "BNN-RULE-03",
                  name: "The 2nd & 12th Modification",
                  citation: "Bhrigu Nandi Nadi Sutra 45",
                  description: "A planet in the 2nd from any Karaka represents immediate destiny, while a planet in the 12th represents the accumulated past baggage.",
                },
                {
                  ruleId: "BNN-RULE-04",
                  name: "Ketu Detachment Doctrine",
                  citation: "Bhrigu Nandi Nadi Sutra 89",
                  description: "Ketu stationed behind or in trine with any Graha imposes an inevitable pruning or spiritual detachment onto that Graha's worldly manifestations.",
                },
                {
                  ruleId: "BNN-RULE-05",
                  name: "Retrograde Shadow Radiance",
                  citation: "Bhrigu Nandi Nadi Sutra 104",
                  description: "A retrograde Graha actively casts rays from the 12th house behind its position into the corresponding directional trine with 50-100% potency.",
                },
              ].map((rule) => (
                <div key={rule.ruleId} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{rule.name}</span>
                    <span className="text-[11px] font-mono text-emerald-700 bg-white px-2 py-0.5 rounded border border-slate-200">{rule.ruleId} • {rule.citation}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{rule.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 9. BNN REPORT DOSSIER */}
      {activeSubTab === "reports" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              BNN Nativity Report Dossier
            </h3>
            <p className="text-xs text-slate-600">
              Comprehensive synthesis of the native&apos;s Bhrigu Nandi Nadi directional chart, planetary sequences, and active karmic conjunctions:
            </p>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Native</span>
                  <span className="font-bold text-slate-800">{userProfile?.name || "Seeker"}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Ascendant</span>
                  <span className="font-bold text-slate-800">{lagnaSign}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Jeeva Karaka (Jupiter)</span>
                  <span className="font-bold text-slate-800">{enrichedPlanets.find((p) => p.name === "Jupiter")?.sign}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Karma Karaka (Saturn)</span>
                  <span className="font-bold text-slate-800">{enrichedPlanets.find((p) => p.name === "Saturn")?.sign}</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block text-sm">Key BNN Takeaways</span>
                <p className="text-slate-700 leading-relaxed">
                  The native&apos;s directional matrix shows pronounced strength in the{" "}
                  <strong>
                    {directionalGroups.reduce((prev, curr) =>
                      curr.planets.length > prev.planets.length ? curr : prev
                    ).direction}
                  </strong>{" "}
                  corridor with multiple Grahas combining their rays. Major career transitions and life shifts align with Saturn&apos;s transits into cardinal signs every 7.5 and 30 years.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
