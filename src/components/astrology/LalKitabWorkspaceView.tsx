import React, { useState, useMemo } from "react";
import {
  BookOpen,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Clock,
  Sparkles,
  Info,
  Calendar,
  Layers,
  ChevronRight,
  Sun,
  Flame,
  Award,
  RotateCcw,
  Eye,
  Sliders,
  Zap,
  ArrowRight
} from "lucide-react";
import { UserProfile, PlanetPosition, HouseDetail } from "../../types";
import { KundliChartSVG } from "../KundliChartSVG";
import { MASTER_PLANET_REMEDIES } from "../../data/astrosageRemediesData";

interface LalKitabWorkspaceViewProps {
  userProfile?: UserProfile;
  planets: PlanetPosition[];
  houses?: HouseDetail[];
  lagnaSign: string;
}

export type LalKitabSubTab =
  | "lk_chart"
  | "house_analysis"
  | "masnui_planets"
  | "kismat_grah"
  | "varshphal"
  | "rin_debts"
  | "combinations"
  | "remedies"
  | "instructions"
  | "contraindications"
  | "reports"
  | "tradition";

interface LKHouseData {
  houseNumber: number;
  fixedSign: string;
  pakkaLord: string;
  sleepingStatus: "Sleeping (Soya Ghar)" | "Awakened (Jaga Hua)";
  planetsInHouse: PlanetPosition[];
  awakenedBy?: string;
  significance: string;
}

export const LalKitabWorkspaceView: React.FC<LalKitabWorkspaceViewProps> = ({
  userProfile,
  planets,
  houses = [],
  lagnaSign,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<LalKitabSubTab>("lk_chart");
  const [chartViewMode, setChartViewMode] = useState<"teva" | "janam">("teva");
  const [selectedHouse, setSelectedHouse] = useState<number>(1);
  const [selectedPlanet, setSelectedPlanet] = useState<string>("Sun");
  const [varshphalAge, setVarshphalAge] = useState<number>(30);

  const signIndices: Record<string, number> = {
    Aries: 1, Taurus: 2, Gemini: 3, Cancer: 4, Leo: 5, Virgo: 6,
    Libra: 7, Scorpio: 8, Sagittarius: 9, Capricorn: 10, Aquarius: 11, Pisces: 12
  };

  const signNames = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];

  const lagnaNum = signIndices[lagnaSign] || 1;

  // Construct synthetic houses if not provided
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

  // In Lal Kitab, House 1 is permanently Aries, House 2 is Taurus, etc.
  // The planets occupy houses based on the native's chart (Ascendant = House 1)
  const lkPlanets = useMemo(() => {
    return planets.map((p) => {
      const pSignNum = signIndices[p.sign] || 1;
      const houseNum = ((pSignNum - lagnaNum + 12) % 12) + 1;
      return {
        ...p,
        lkHouseNum: houseNum,
      };
    });
  }, [planets, lagnaNum]);

  // Classical Pakka Ghar (Permanent Houses) according to Pt. Roop Chand Joshi:
  const pakkaHouseLords: Record<number, { lord: string; fixedSign: string; meaning: string }> = {
    1: { lord: "Sun / Mars", fixedSign: "Aries (Mesha)", meaning: "Head, vitality, self-nature, prestige, government" },
    2: { lord: "Jupiter", fixedSign: "Taurus (Vrishabha)", meaning: "Dharmic treasury, family lineage, spoken word, temple" },
    3: { lord: "Mars / Mercury", fixedSign: "Gemini (Mithuna)", meaning: "Arms, courage, younger siblings, travel, documents" },
    4: { lord: "Moon", fixedSign: "Cancer (Karka)", meaning: "Heart, mother, pure water, home, mental serenity" },
    5: { lord: "Jupiter", fixedSign: "Leo (Simha)", meaning: "Intellect, progeny, past-life merit, sacred mantras" },
    6: { lord: "Mercury / Ketu", fixedSign: "Virgo (Kanya)", meaning: "Debts, maternal uncle, maternal home, disputes" },
    7: { lord: "Venus / Mercury", fixedSign: "Libra (Tula)", meaning: "Spouse, partnership, public conduct, marketplace" },
    8: { lord: "Saturn / Mars", fixedSign: "Scorpio (Vrishchika)", meaning: "Death, underground mystery, sudden shocks, crematorium" },
    9: { lord: "Jupiter", fixedSign: "Sagittarius (Dhanu)", meaning: "Guru, destiny (Kismat), religious virtue, elders" },
    10: { lord: "Saturn", fixedSign: "Capricorn (Makara)", meaning: "Karma, employment, government court, social standing" },
    11: { lord: "Jupiter", fixedSign: "Aquarius (Kumbha)", meaning: "Gains, desires, elder siblings, income stream" },
    12: { lord: "Jupiter / Rahu", fixedSign: "Pisces (Meena)", meaning: "Expenses, bed comforts, foreign lands, moksha" },
  };

  // Construct 12 Fixed Houses analysis
  const lkHouses: LKHouseData[] = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const hNum = i + 1;
      const occupants = lkPlanets.filter((p) => p.lkHouseNum === hNum);
      const oppositeHouse = ((hNum + 5) % 12) + 1;
      const oppositeOccupants = lkPlanets.filter((p) => p.lkHouseNum === oppositeHouse);

      let sleepingStatus: "Sleeping (Soya Ghar)" | "Awakened (Jaga Hua)" =
        occupants.length > 0 ? "Awakened (Jaga Hua)" : "Sleeping (Soya Ghar)";
      let awakenedBy: string | undefined = undefined;

      if (occupants.length === 0) {
        if (oppositeOccupants.length > 0) {
          sleepingStatus = "Awakened (Jaga Hua)";
          awakenedBy = `Awakened by opposite 7th-drishyam: ${oppositeOccupants.map((o) => o.name).join(", ")}`;
        }
      }

      return {
        houseNumber: hNum,
        fixedSign: pakkaHouseLords[hNum]?.fixedSign || "Aries",
        pakkaLord: pakkaHouseLords[hNum]?.lord || "Sun",
        sleepingStatus,
        planetsInHouse: occupants,
        awakenedBy,
        significance: pakkaHouseLords[hNum]?.meaning || "",
      };
    });
  }, [lkPlanets]);

  // Masnui Planets (Artificial / Synthetic Planets in Lal Kitab)
  const masnuiPlanets = useMemo(() => {
    const sun = lkPlanets.find((p) => p.name === "Sun");
    const saturn = lkPlanets.find((p) => p.name === "Saturn");
    const jupiter = lkPlanets.find((p) => p.name === "Jupiter");
    const mars = lkPlanets.find((p) => p.name === "Mars");
    const mercury = lkPlanets.find((p) => p.name === "Mercury");
    const venus = lkPlanets.find((p) => p.name === "Venus");

    return [
      {
        resultPlanet: "Synthetic Venus (Shukra Masnui)",
        components: "Sun + Saturn",
        nature: "When Sun and Saturn combine or aspect, they generate a synthetic Venus effect.",
        isConjoined: sun && saturn && sun.lkHouseNum === saturn.lkHouseNum,
        house: sun && saturn && sun.lkHouseNum === saturn.lkHouseNum ? sun.lkHouseNum : undefined,
        impact: "Modifies sexual vitality, luxury flow, and eye vision.",
      },
      {
        resultPlanet: "Synthetic Mars (Mangal Masnui)",
        components: "Sun + Jupiter",
        nature: "Sun and Jupiter combination creates righteous Mars (Mangal Nek).",
        isConjoined: sun && jupiter && sun.lkHouseNum === jupiter.lkHouseNum,
        house: sun && jupiter && sun.lkHouseNum === jupiter.lkHouseNum ? sun.lkHouseNum : undefined,
        impact: "Produces courageous leadership, noble conduct, and administrative protection.",
      },
      {
        resultPlanet: "Synthetic Sun (Surya Masnui)",
        components: "Mars + Mercury",
        nature: "Mars and Mercury create a synthetic Sun energy.",
        isConjoined: mars && mercury && mars.lkHouseNum === mercury.lkHouseNum,
        house: mars && mercury && mars.lkHouseNum === mercury.lkHouseNum ? mars.lkHouseNum : undefined,
        impact: "Generates intellectual sharpness, medical precision, or aggressive speech.",
      },
      {
        resultPlanet: "Synthetic Ketu (Ketu Masnui)",
        components: "Jupiter + Venus",
        nature: "Jupiter and Venus produce Ketu's spiritual detachment.",
        isConjoined: jupiter && venus && jupiter.lkHouseNum === venus.lkHouseNum,
        house: jupiter && venus && jupiter.lkHouseNum === venus.lkHouseNum ? jupiter.lkHouseNum : undefined,
        impact: "Grants deep intuition, renunciation, or maternal spiritual lineage.",
      },
      {
        resultPlanet: "Synthetic Rahu (Rahu Masnui)",
        components: "Saturn + Mercury",
        nature: "Saturn and Mercury combination generates Rahu's cunning and tech acumen.",
        isConjoined: saturn && mercury && saturn.lkHouseNum === mercury.lkHouseNum,
        house: saturn && mercury && saturn.lkHouseNum === mercury.lkHouseNum ? saturn.lkHouseNum : undefined,
        impact: "Unlocks commercial intelligence, cryptography, accounting, or unexpected illusions.",
      },
    ];
  }, [lkPlanets]);

  // Kismat Ka Grah (Planet of Destiny Activation)
  const kismatAnalysis = useMemo(() => {
    // Determine which planet awakens destiny according to classical placement
    const jupiter = lkPlanets.find((p) => p.name === "Jupiter");
    const sun = lkPlanets.find((p) => p.name === "Sun");
    const moon = lkPlanets.find((p) => p.name === "Moon");
    const venus = lkPlanets.find((p) => p.name === "Venus");
    const mars = lkPlanets.find((p) => p.name === "Mars");
    const saturn = lkPlanets.find((p) => p.name === "Saturn");

    let kismatPlanet = "Jupiter";
    let activationAge = 16;
    let rationale = "Jupiter awakens destiny at age 16 through wisdom and spiritual virtue.";

    if (jupiter && [9, 1, 5, 2].includes(jupiter.lkHouseNum)) {
      kismatPlanet = "Jupiter";
      activationAge = 16;
      rationale = "Jupiter stationed in dharmic houses (1, 2, 5, 9) triggers early spiritual and financial luck at 16.";
    } else if (sun && [1, 5, 10].includes(sun.lkHouseNum)) {
      kismatPlanet = "Sun";
      activationAge = 22;
      rationale = "Sun in royal quadrant activates destiny at age 22 via government, father, or authority.";
    } else if (moon && [4, 1, 2].includes(moon.lkHouseNum)) {
      kismatPlanet = "Moon";
      activationAge = 24;
      rationale = "Moon in domestic/lunar houses awakens destiny at age 24 via mother's blessing or foreign travel.";
    } else if (venus && [2, 7, 12].includes(venus.lkHouseNum)) {
      kismatPlanet = "Venus";
      activationAge = 25;
      rationale = "Venus in dhana/kalatra houses awakens fortune at age 25 via marriage or artistic enterprise.";
    } else if (mars && [1, 3, 10].includes(mars.lkHouseNum)) {
      kismatPlanet = "Mars";
      activationAge = 28;
      rationale = "Mars in courageous houses awakens fortune at age 28 via property, engineering, or bold venture.";
    } else if (saturn && [10, 11, 2, 9].includes(saturn.lkHouseNum)) {
      kismatPlanet = "Saturn";
      activationAge = 36;
      rationale = "Saturn in karma houses cements unshakeable fortune and authority at age 36.";
    }

    return { kismatPlanet, activationAge, rationale };
  }, [lkPlanets]);

  // Lal Kitab Varshphal Calculator
  const varshphalData = useMemo(() => {
    // In Lal Kitab, Varshphal rotates planets based on age % 12 and annual table
    const cycle = (varshphalAge % 12);
    const shiftedPlanets = lkPlanets.map((p) => {
      const annualHouse = ((p.lkHouseNum - 1 + cycle) % 12) + 1;
      return {
        ...p,
        annualHouse,
      };
    });

    return {
      age: varshphalAge,
      cycleYear: cycle === 0 ? 12 : cycle,
      shiftedPlanets,
      annualKarmicStatus: cycle % 2 === 0 ? "Nek (Auspicious Annual Flow)" : "Manda (Requires Daytime Caution)",
    };
  }, [varshphalAge, lkPlanets]);

  // Classical 9 Ancestral Debts (Pitra Rin) Evaluation
  const debtsAnalysis = useMemo(() => {
    const debts = [
      {
        id: "pitra_rin",
        name: "Pitra Rin (Forefather's Debt)",
        cause: "Ancestors changed religious customs or disrespected family priest/temple.",
        indicator: "Jupiter afflicted by Venus, Mercury, or Rahu in 2nd, 5th, 9th, or 12th house.",
        remedy: "All family members must contribute equal copper coins/money to feed yellow food to cows or holy priests.",
        severity: lkPlanets.some((p) => p.name === "Jupiter" && [2, 5, 9, 12].includes(p.lkHouseNum)) ? "Active Concern" : "Clear / Dormant",
      },
      {
        id: "matri_rin",
        name: "Matri Rin (Mother's Debt)",
        cause: "Disrespect, cruelty, or abandonment of mother or maternal relatives.",
        indicator: "Ketu placed in the 4th house afflicting the Moon's home.",
        remedy: "All blood relatives contribute equal silver coins and immerse them in flowing natural river waters.",
        severity: lkPlanets.some((p) => p.name === "Ketu" && p.lkHouseNum === 4) ? "Active Concern" : "Clear / Dormant",
      },
      {
        id: "stri_rin",
        name: "Stri Rin (Woman's Debt)",
        cause: "Harming, cheating, or dishonoring a pregnant woman or lawful wife.",
        indicator: "Sun, Rahu, or Ketu positioned in 2nd or 7th house afflicting Venus's domain.",
        remedy: "Gather funds from family members and feed 100 cows with fresh green fodder or grain on a single Friday.",
        severity: lkPlanets.some((p) => (p.name === "Sun" || p.name === "Rahu") && (p.lkHouseNum === 2 || p.lkHouseNum === 7)) ? "Active Concern" : "Clear / Dormant",
      },
      {
        id: "bhai_rin",
        name: "Bhai / Rishtedari Rin (Brother's Debt)",
        cause: "Betraying, robbing, or causing ruin to brother, nephew, or close partner.",
        indicator: "Mercury or Venus placed in the 3rd or 8th house afflicting Mars's strength.",
        remedy: "Offer pure red lentils (Masoor Dal) or assist blood relatives with medical aid without expectation.",
        severity: lkPlanets.some((p) => (p.name === "Mercury" || p.name === "Venus") && (p.lkHouseNum === 3 || p.lkHouseNum === 8)) ? "Active Concern" : "Clear / Dormant",
      },
      {
        id: "swa_rin",
        name: "Swa Rin (Self Debt / Atma Rin)",
        cause: "Atheism, defying ancestral tradition, or betrayal of one's own sworn duty in past life.",
        indicator: "Venus or Saturn occupying the 5th house harming Jupiter's sanctum.",
        remedy: "Sponsor community Surya Yajna or donate unrefined jaggery and wheat to temples on Sundays.",
        severity: lkPlanets.some((p) => (p.name === "Venus" || p.name === "Saturn") && p.lkHouseNum === 5) ? "Active Concern" : "Clear / Dormant",
      },
      {
        id: "kudrati_rin",
        name: "Kudrati Rin (Debt against Nature / God)",
        cause: "Killing dogs, torturing stray animals, or destroying natural water sources.",
        indicator: "Moon or Mars occupying the 6th or 12th house in mutual affliction.",
        remedy: "Feed sweet chapatis (roti with ghee and jaggery) to street dogs daily for 43 consecutive days.",
        severity: lkPlanets.some((p) => (p.name === "Moon" || p.name === "Mars") && (p.lkHouseNum === 6 || p.lkHouseNum === 12)) ? "Active Concern" : "Clear / Dormant",
      },
      {
        id: "zalimana_rin",
        name: "Zalimana Rin (Debt of Oppression)",
        cause: "Ancestors usurped property through violence, fraudulent deeds, or confiscation.",
        indicator: "Sun or Rahu placed in the 10th or 12th house harming Saturn's karma house.",
        remedy: "Feed fish with balls of whole-wheat flour (Atta) and donate unrefined mustard oil on Saturdays.",
        severity: lkPlanets.some((p) => (p.name === "Sun" || p.name === "Rahu") && (p.lkHouseNum === 10 || p.lkHouseNum === 12)) ? "Active Concern" : "Clear / Dormant",
      },
    ];

    return debts;
  }, [lkPlanets]);

  // Teva Classification (Dharmi Teva vs Andha Teva)
  const tevaType = useMemo(() => {
    const saturn = lkPlanets.find((p) => p.name === "Saturn");
    const sun = lkPlanets.find((p) => p.name === "Sun");

    if (saturn && (saturn.lkHouseNum === 11 || saturn.lkHouseNum === 9 || saturn.lkHouseNum === 2)) {
      return {
        type: "Dharmi Teva (Virtuous Kundli)",
        description: "Protected from severe catastrophes by divine grace. Saturn or Jupiter acts as an ancestral shield against malefic strokes.",
        status: "BENEFIC_SHIELD",
      };
    }

    if (sun && saturn && Math.abs(sun.lkHouseNum - saturn.lkHouseNum) === 6) {
      return {
        type: "Andha Teva (Blind Horoscope)",
        description: "Mutual 180° opposition between Sun and Saturn. Remedies require daytime execution and strict abstinence.",
        status: "ALERT_AFFLICTION",
      };
    }

    return {
      type: "Sadharan Teva (Standard Horoscope)",
      description: "Standard karmic flow governed by house placements and classical Lal Kitab farman rules.",
      status: "STANDARD",
    };
  }, [lkPlanets]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-rose-900/10 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-rose-100 text-rose-900 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" /> Classical Lal Kitab System
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                Pt. Roop Chand Joshi Tradition (1939–1952)
              </span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1.5">
              Fixed Bhava Shastra, Soya Ghar &amp; 43-Day Farman Remedies
            </h2>
            <p className="text-xs text-slate-600 mt-0.5 max-w-3xl">
              Authentic Red Book methodology completely segregated from Parashari astrology. House 1 is permanently Aries; evaluates sleeping houses (Soya Ghar), Masnui synthetic planets, Kismat Ka Grah, 9 Ancestral Debts (Pitra Rin), and strict daytime remedial precautions.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-rose-950 text-rose-200 px-4 py-2 rounded-2xl text-xs font-bold shadow-xs">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>{tevaType.type.split("(")[0]}</span>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-t border-slate-100 pt-3">
          {[
            { id: "lk_chart", label: "Lal Kitab Teva & Birth Chart" },
            { id: "house_analysis", label: "12 Fixed Houses & Soya Ghar" },
            { id: "masnui_planets", label: "Masnui (Synthetic) Planets" },
            { id: "kismat_grah", label: "Kismat Ka Grah (Destiny Lord)" },
            { id: "varshphal", label: "Lal Kitab Varshphal (Annual)" },
            { id: "rin_debts", label: "9 Ancestral Debts (Pitra Rin)" },
            { id: "combinations", label: "Teva Types & Afflictions" },
            { id: "remedies", label: "Classical Farman Remedies" },
            { id: "instructions", label: "Execution Rules (43 Days)" },
            { id: "contraindications", label: "Strict Prohibitions" },
            { id: "reports", label: "Lal Kitab Dossier" },
            { id: "tradition", label: "Lineage & Provenance" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as LalKitabSubTab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === tab.id
                  ? "bg-rose-900 text-white shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. LAL KITAB TEVA & NATAL CHART */}
      {activeSubTab === "lk_chart" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                  Classical Red Book Diagram
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  {chartViewMode === "teva" ? "Lal Kitab Teva (Aries Fixed 1st House)" : `Janam Kundli (${lagnaSign} Ascendant)`}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {chartViewMode === "teva"
                    ? "In Lal Kitab, House 1 is permanently Aries (Mesha). Houses are fixed, while planets occupy houses based on the native's Lagna offset."
                    : "Native's Parashari Janam Kundli with dynamic Ascendant and whole-sign divisional house alignment."}
                </p>
              </div>

              {/* Mode Switcher */}
              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
                <button
                  onClick={() => setChartViewMode("teva")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    chartViewMode === "teva" ? "bg-rose-900 text-white shadow-xs" : "text-slate-700"
                  }`}
                >
                  Lal Kitab Teva
                </button>
                <button
                  onClick={() => setChartViewMode("janam")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    chartViewMode === "janam" ? "bg-slate-900 text-white shadow-xs" : "text-slate-700"
                  }`}
                >
                  Janam Kundli
                </button>
              </div>
            </div>

            {/* Visual Chart Rendering */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 flex justify-center">
                <div className="w-full max-w-[500px]">
                  {chartViewMode === "teva" ? (
                    /* Dedicated SVG Rendering for Lal Kitab Fixed Teva */
                    <div className="bg-[#991B1B] text-amber-100 rounded-3xl p-6 shadow-md border-2 border-amber-400/40 relative">
                      <div className="text-center pb-3 border-b border-amber-400/30">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 block">
                          लाल किताब पक्का तेवा
                        </span>
                        <h4 className="font-serif text-lg font-bold text-white">
                          Lal Kitab Fixed Kundli (Mesha Lagna)
                        </h4>
                      </div>

                      {/* 12-House Grid Representation */}
                      <div className="grid grid-cols-3 gap-2.5 pt-4 text-xs">
                        {lkHouses.map((h) => (
                          <div
                            key={h.houseNumber}
                            onClick={() => setSelectedHouse(h.houseNumber)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer ${
                              selectedHouse === h.houseNumber
                                ? "bg-amber-100 text-slate-900 border-amber-400 shadow-md scale-102"
                                : "bg-rose-950/80 text-amber-100 border-rose-800/80 hover:bg-rose-900/90"
                            }`}
                          >
                            <div className="flex justify-between items-center text-[10px] font-bold">
                              <span>H{h.houseNumber} ({h.fixedSign.split(" ")[0]})</span>
                              <span className="text-[9px] text-amber-300">{h.pakkaLord.split("/")[0]}</span>
                            </div>
                            <div className="mt-1.5 min-h-[32px] flex flex-wrap gap-1 items-center">
                              {h.planetsInHouse.length > 0 ? (
                                h.planetsInHouse.map((p) => (
                                  <span
                                    key={p.name}
                                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                      selectedHouse === h.houseNumber
                                        ? "bg-rose-900 text-white"
                                        : "bg-amber-400 text-slate-950"
                                    }`}
                                  >
                                    {p.name.slice(0, 3)}
                                  </span>
                                ))
                              ) : (
                                <span className="text-[10px] opacity-40 italic">Empty (Soya)</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-3 border-t border-amber-400/30 flex justify-between items-center text-[11px] text-amber-200">
                        <span>Pakka Lord (Permanent Ruler)</span>
                        <span className="font-mono font-bold text-amber-300">Pt. Roop Chand Joshi Farman</span>
                      </div>
                    </div>
                  ) : (
                    <KundliChartSVG
                      planets={planets}
                      houses={completeHouses}
                      lagnaSign={lagnaSign}
                      chartTitle={`Janam Kundli (${lagnaSign} Lagna)`}
                      compact={true}
                    />
                  )}
                </div>
              </div>

              {/* Lal Kitab Highlights Pane */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
                  <div className="flex items-center gap-2 text-rose-950 font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-rose-700" />
                    <span>Selected House #{selectedHouse}: {pakkaHouseLords[selectedHouse]?.fixedSign}</span>
                  </div>

                  <div className="text-xs space-y-1.5 text-slate-700">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Permanent Lord (Pakka Malik):</span>
                      <strong className="text-rose-900">{pakkaHouseLords[selectedHouse]?.lord}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Sleeping Status:</span>
                      <strong className="text-slate-900">{lkHouses[selectedHouse - 1]?.sleepingStatus}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Planets Stationed:</span>
                      <strong className="text-slate-900">
                        {lkHouses[selectedHouse - 1]?.planetsInHouse.map((p) => p.name).join(", ") || "None"}
                      </strong>
                    </div>
                    <div className="pt-2 border-t border-rose-100 text-[11px] text-slate-600">
                      <strong>Significance:</strong> {pakkaHouseLords[selectedHouse]?.meaning}
                    </div>
                  </div>
                </div>

                {/* Kismat Grah Snapshot */}
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-950">
                    <span>Kismat Ka Grah (Destiny Planet)</span>
                    <span className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full text-[10px]">
                      Activates at Age {kismatAnalysis.activationAge}
                    </span>
                  </div>
                  <div className="font-serif text-lg font-bold text-slate-900">
                    {kismatAnalysis.kismatPlanet}
                  </div>
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    {kismatAnalysis.rationale}
                  </p>
                </div>

                {/* Dharmi Teva Shield */}
                <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-rose-300 font-bold">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span>{tevaType.type}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {tevaType.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. HOUSE ANALYSIS & SLEEPING HOUSES */}
      {activeSubTab === "house_analysis" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lkHouses.map((h) => (
              <div
                key={h.houseNumber}
                onClick={() => setSelectedHouse(h.houseNumber)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                  selectedHouse === h.houseNumber
                    ? "bg-rose-50/60 border-rose-400 ring-2 ring-rose-400/20"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      House {h.houseNumber}
                    </span>
                    <h4 className="font-serif font-bold text-slate-900 text-base">
                      {h.fixedSign}
                    </h4>
                  </div>
                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      h.sleepingStatus === "Awakened (Jaga Hua)"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-amber-100 text-amber-800 border border-amber-200"
                    }`}
                  >
                    {h.sleepingStatus}
                  </span>
                </div>

                <div className="space-y-2 pt-3 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Pakka Malik:</span>
                    <span className="font-bold text-slate-800">{h.pakkaLord}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Occupants ({h.planetsInHouse.length}):</span>
                    <span className="font-semibold text-rose-800">
                      {h.planetsInHouse.map((p) => p.name).join(", ") || "None (Soya)"}
                    </span>
                  </div>
                  {h.awakenedBy && (
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                      {h.awakenedBy}
                    </div>
                  )}
                  <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    {h.significance}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. MASNUI (SYNTHETIC) PLANETS */}
      {activeSubTab === "masnui_planets" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Masnui (Artificial / Synthetic) Planets
              </h3>
              <p className="text-xs text-slate-600">
                In classical Lal Kitab Shastra, when two specific Grahas combine their energies, they create a synthetic planet (Masnui Grah) that delivers modified karmic outcomes:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {masnuiPlanets.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all ${
                    m.isConjoined
                      ? "bg-rose-50/70 border-rose-300 ring-1 ring-rose-200"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                    <span className="font-serif font-bold text-slate-900 text-base">{m.resultPlanet}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        m.isConjoined ? "bg-rose-900 text-white" : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {m.isConjoined ? `Active in House #${m.house}` : "Theoretical Pair"}
                    </span>
                  </div>

                  <div className="text-xs font-mono font-bold text-rose-800 pt-2">
                    Formula: {m.components}
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed pt-1">
                    {m.nature}
                  </p>

                  <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 mt-2">
                    <strong>Karmic Impact:</strong> {m.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. KISMAT KA GRAH */}
      {activeSubTab === "kismat_grah" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Kismat Jagaane Wala Grah (Planet of Destiny Awakening)
            </h3>
            <p className="text-xs text-slate-600">
              According to Pt. Roop Chand Joshi, every nativity has a designated planet that awakens dormant fortune at a specific age milestone:
            </p>

            <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    Primary Destiny Lord
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-slate-900 mt-0.5">
                    {kismatAnalysis.kismatPlanet} (Activates at Age {kismatAnalysis.activationAge} Years)
                  </h4>
                </div>
                <span className="px-3 py-1 rounded-xl bg-amber-900 text-white font-bold text-xs">
                  Age Milestone #{kismatAnalysis.activationAge}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                {kismatAnalysis.rationale}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center pt-2">
                {[
                  { planet: "Jupiter", age: 16 },
                  { planet: "Sun", age: 22 },
                  { planet: "Moon", age: 24 },
                  { planet: "Venus", age: 25 },
                  { planet: "Mars", age: 28 },
                  { planet: "Saturn", age: 36 },
                ].map((item) => (
                  <div
                    key={item.planet}
                    className={`p-2.5 rounded-xl border text-xs ${
                      item.planet === kismatAnalysis.kismatPlanet
                        ? "bg-amber-900 text-white font-bold border-amber-900"
                        : "bg-white text-slate-700 border-slate-200"
                    }`}
                  >
                    <span className="block text-[11px]">{item.planet}</span>
                    <strong className="text-xs">Age {item.age}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. LAL KITAB VARSHPHAL */}
      {activeSubTab === "varshphal" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Lal Kitab Varshphal (Annual Progressed Chart)
              </h3>
              <p className="text-xs text-slate-600">
                In Lal Kitab, each year of life shifts planets according to the 12-year annual progression cycle. Select your current age to view the progressed chart and annual remedies:
              </p>
            </div>

            {/* Age Slider */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Select Age for Varshphal:</span>
                <span className="text-lg font-serif font-bold text-rose-900 bg-white px-4 py-1 rounded-xl border border-slate-200">
                  Age {varshphalAge} Years (Cycle Year #{varshphalData.cycleYear})
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={90}
                value={varshphalAge}
                onChange={(e) => setVarshphalAge(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
            </div>

            {/* Annual Status Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-900">Annual Flow Status</span>
                <div className="font-serif text-lg font-bold text-slate-900">
                  {varshphalData.annualKarmicStatus}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  During Age {varshphalAge}, planetary energies shift into houses {varshphalData.shiftedPlanets.map((p) => `H${p.annualHouse}`).slice(0, 4).join(", ")}. Execute remedies only between sunrise and sunset.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Progressed House Placements</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {varshphalData.shiftedPlanets.map((p) => (
                    <span key={p.name} className="px-2 py-1 bg-white rounded-lg border border-slate-200 text-xs font-semibold text-slate-800">
                      {p.name}: House {p.annualHouse}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. ANCESTRAL DEBTS (RIN) */}
      {activeSubTab === "rin_debts" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Classical 9 Ancestral Debts (Pitra Rin) Evaluation
            </h3>
            <p className="text-xs text-slate-600">
              Lal Kitab identifies ancestral karmic liabilities carried forward across generations. Unresolved debts require collective blood-relative contributions:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {debtsAnalysis.map((debt) => (
                <div
                  key={debt.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    debt.severity === "Active Concern"
                      ? "bg-rose-50/70 border-rose-300 ring-1 ring-rose-200"
                      : "bg-slate-50/60 border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                    <span className="font-serif font-bold text-slate-900 text-base">{debt.name}</span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        debt.severity === "Active Concern"
                          ? "bg-rose-900 text-white"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {debt.severity}
                    </span>
                  </div>

                  <div className="space-y-2 pt-2 text-xs">
                    <div>
                      <strong className="text-slate-800 block">Karmic Cause:</strong>
                      <span className="text-slate-600">{debt.cause}</span>
                    </div>
                    <div>
                      <strong className="text-slate-800 block">Chart Indicator:</strong>
                      <span className="text-slate-600">{debt.indicator}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-100">
                      <strong className="text-rose-900 block">43-Day Farman Remedy:</strong>
                      <span className="text-slate-700">{debt.remedy}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 7. TEVA COMBINATIONS */}
      {activeSubTab === "combinations" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Teva Classifications (Dharmi, Andha &amp; Ratandh)
            </h3>
            <p className="text-xs text-slate-600">
              Horoscopes in Lal Kitab are categorized by their protective shielding or vulnerability to sudden malefic strokes:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <span className="font-bold text-emerald-900 text-sm block">1. Dharmi Teva (Virtuous Chart)</span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  When Saturn or Jupiter occupies the 9th or 11th house, divine protection shields the native from catastrophic reversals.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <span className="font-bold text-amber-900 text-sm block">2. Andha Teva (Blind Chart)</span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Sun and Saturn directly opposite each other or House 10 empty while House 4 is afflicted. Requires strict daytime execution of remedies.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
                <span className="font-bold text-rose-900 text-sm block">3. Ratandh Teva (Night-Blind)</span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Sun in House 7, or afflicted Rahu in House 1. Strict avoidance of night-time donations or eating food in dark places.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. CLASSICAL REMEDIES */}
      {activeSubTab === "remedies" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Classical Farman Upayas for Placed Grahas
            </h3>
            <p className="text-xs text-slate-600">
              Remedies according to the exact Lal Kitab house placement of each Graha:
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {lkPlanets.map((p) => (
                <button
                  key={p.name}
                  onClick={() => setSelectedPlanet(p.name)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedPlanet === p.name
                      ? "bg-rose-900 text-white shadow-xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  {p.name} (House #{p.lkHouseNum})
                </button>
              ))}
            </div>

            {/* Selected Planet Remedy Box */}
            {(() => {
              const target = lkPlanets.find((p) => p.name === selectedPlanet);
              const houseNum = target?.lkHouseNum || 1;
              return (
                <div className="mt-4 p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-serif text-lg font-bold text-slate-900">
                      {selectedPlanet} in House #{houseNum}
                    </h4>
                    <span className="text-xs font-mono font-bold bg-white px-3 py-1 rounded-xl border border-rose-200 text-rose-900">
                      Fixed Sign: {pakkaHouseLords[houseNum]?.fixedSign}
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-rose-100 space-y-2 text-xs">
                    <strong className="text-slate-900 block">Prescribed Lal Kitab Farman:</strong>
                    <p className="text-slate-700 leading-relaxed">
                      {selectedPlanet === "Sun" && houseNum === 1 && "Do not build a dark room in the southern corner of the house. Offer water to rising Sun daily."}
                      {selectedPlanet === "Moon" && "Keep silver coins in home safe, serve pure milk to mother, never donate milk at night."}
                      {selectedPlanet === "Mars" && "Wear pure copper bracelet or keep red handkerchief in pocket. Assist brothers unconditionally."}
                      {selectedPlanet === "Mercury" && "Pierce nose or wear silver wire, clean teeth with alum daily, avoid green clothes during trials."}
                      {selectedPlanet === "Jupiter" && "Apply saffron (Kesar) or turmeric tilak on forehead, navel, and tongue. Respect family priests."}
                      {selectedPlanet === "Venus" && "Feed cows with green grass, keep silver items in bedroom, respect women and maintain marital fidelity."}
                      {selectedPlanet === "Saturn" && "Feed black dogs or crows with mustard oil rotis on Saturdays. Avoid alcohol, gambling, and meat."}
                      {selectedPlanet === "Rahu" && "Immerse barley (Jau) in running water, maintain clean toilet and bathroom, avoid blue clothing."}
                      {selectedPlanet === "Ketu" && "Feed black and white stray dogs daily with bread. Wear pure gold in ear lobes."}
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* 9. INSTRUCTIONS (43 DAYS) */}
      {activeSubTab === "instructions" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              The 43-Day Sacred Execution Vidhi
            </h3>
            <p className="text-xs text-slate-600">
              Lal Kitab remedies are strict alchemical interventions governed by immutable procedural laws:
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">1. Daylight Execution Law (Surya Prakash Vidhi)</span>
                <p className="text-slate-600 leading-relaxed">
                  All remedies must be performed only between sunrise and sunset. Executing any Lal Kitab upaya after dusk or in darkness activates malefic Rahu-Ketu energies.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">2. 43-Day Unbroken Continuity Rule</span>
                <p className="text-slate-600 leading-relaxed">
                  A remedy must continue for 43 consecutive days without a single day's pause. If interrupted, the counter resets to Day 1.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">3. One Upaya at a Time Rule</span>
                <p className="text-slate-600 leading-relaxed">
                  Never mix multiple Lal Kitab remedies simultaneously. Complete one planet's 43-day cycle before initiating another.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 10. CONTRAINDICATIONS */}
      {activeSubTab === "contraindications" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Strict Shastric Prohibitions (Farman Nishedh)
            </h3>
            <p className="text-xs text-slate-600">
              Certain actions are strictly forbidden based on specific planetary house placements:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                <span className="font-bold text-rose-900 block">Moon in 6th House:</span>
                <p className="text-slate-700">Never donate milk, water, or liquids to schools, temples, or public wells.</p>
              </div>
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                <span className="font-bold text-rose-900 block">Jupiter in 10th House:</span>
                <p className="text-slate-700">Never construct temple idols or religious sanctums inside private residential homes.</p>
              </div>
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                <span className="font-bold text-rose-900 block">Mars in 12th House:</span>
                <p className="text-slate-700">Never gift copper or sweet items to in-laws or maternal relatives.</p>
              </div>
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                <span className="font-bold text-rose-900 block">Saturn in 1st House:</span>
                <p className="text-slate-700">Strictly avoid alcohol, non-vegetarian food, and taking property through deception.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 11. REPORTS */}
      {activeSubTab === "reports" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Lal Kitab Teva Dossier
            </h3>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Querent</span>
                  <span className="font-bold text-slate-800">{userProfile?.name || "Seeker"}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Teva Nature</span>
                  <span className="font-bold text-slate-800">{tevaType.type.split("(")[0]}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Kismat Grah</span>
                  <span className="font-bold text-slate-800">{kismatAnalysis.kismatPlanet}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Destiny Age</span>
                  <span className="font-bold text-slate-800">{kismatAnalysis.activationAge} Yrs</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block text-sm">Farman Guidance</span>
                <p className="text-slate-700 leading-relaxed">
                  Native is governed by {tevaType.type}. Ensure all remedies are executed in bright daylight without breaking the 43-day sequence.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 12. TRADITION */}
      {activeSubTab === "tradition" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Tradition &amp; Shastric Lineage
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Lal Kitab is an extraordinary treatise compiled by Pt. Roop Chand Joshi in five volumes (1939 to 1952) in Urdu/Persian script. It is revered across northern India for its non-destructive, cost-effective, practical upayas that neutralize ancestral karmic blocks.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
