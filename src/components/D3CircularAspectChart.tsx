import React, { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";
import { PlanetPosition, HouseDetail } from "../types";
import { DrishtiAspectEngine, GrahaDrishtiDetail, WesternAspectDetail } from "../engine/drishtiAspectEngine";
import { Eye, Sparkles, Compass, Zap, Filter, RefreshCw, ZoomIn, ZoomOut, Info, ShieldCheck, Flame, Moon, Sun, AlertTriangle } from "lucide-react";

interface D3CircularAspectChartProps {
  planets: PlanetPosition[];
  houses?: HouseDetail[];
  lagnaSign: string;
  userName?: string;
}

interface ZodiacSignDef {
  name: string;
  sanskrit: string;
  symbol: string;
  startDeg: number;
  endDeg: number;
  color: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  ruler: string;
}

export interface PlanetCoordinate {
  name: string;
  longitude: number;
  sign: string;
  degreeInSign: number;
  house: number;
  nakshatra: string;
  pada: number;
  isRetrograde: boolean;
  isCombust: boolean;
  dignity: string;
  speedLongitudeDegPerDay: number;
}

const ZODIAC_WHEEL_SIGNS: ZodiacSignDef[] = [
  { name: "Aries", sanskrit: "Mesha", symbol: "♈", startDeg: 0, endDeg: 30, color: "#EF4444", element: "Fire", ruler: "Mars" },
  { name: "Taurus", sanskrit: "Vrishabha", symbol: "♉", startDeg: 30, endDeg: 60, color: "#10B981", element: "Earth", ruler: "Venus" },
  { name: "Gemini", sanskrit: "Mithuna", symbol: "♊", startDeg: 60, endDeg: 90, color: "#F59E0B", element: "Air", ruler: "Mercury" },
  { name: "Cancer", sanskrit: "Karka", symbol: "♋", startDeg: 90, endDeg: 120, color: "#60A5FA", element: "Water", ruler: "Moon" },
  { name: "Leo", sanskrit: "Simha", symbol: "♌", startDeg: 120, endDeg: 150, color: "#F97316", element: "Fire", ruler: "Sun" },
  { name: "Virgo", sanskrit: "Kanya", symbol: "♍", startDeg: 150, endDeg: 180, color: "#059669", element: "Earth", ruler: "Mercury" },
  { name: "Libra", sanskrit: "Tula", symbol: "♎", startDeg: 180, endDeg: 210, color: "#EC4899", element: "Air", ruler: "Venus" },
  { name: "Scorpio", sanskrit: "Vrischika", symbol: "♏", startDeg: 210, endDeg: 240, color: "#B91C1C", element: "Water", ruler: "Mars" },
  { name: "Sagittarius", sanskrit: "Dhanu", symbol: "♐", startDeg: 240, endDeg: 270, color: "#8B5CF6", element: "Fire", ruler: "Jupiter" },
  { name: "Capricorn", sanskrit: "Makara", symbol: "♑", startDeg: 270, endDeg: 300, color: "#475569", element: "Earth", ruler: "Saturn" },
  { name: "Aquarius", sanskrit: "Kumbha", symbol: "♒", startDeg: 300, endDeg: 330, color: "#06B6D4", element: "Air", ruler: "Saturn" },
  { name: "Pisces", sanskrit: "Meena", symbol: "♓", startDeg: 330, endDeg: 360, color: "#14B8A6", element: "Water", ruler: "Jupiter" },
];

const PLANET_SYMBOLS: Record<string, { glyph: string; color: string; sanskrit: string }> = {
  Sun: { glyph: "☉", color: "#F59E0B", sanskrit: "Surya" },
  Moon: { glyph: "☽", color: "#E0E7FF", sanskrit: "Chandra" },
  Mars: { glyph: "♂", color: "#EF4444", sanskrit: "Mangala" },
  Mercury: { glyph: "☿", color: "#10B981", sanskrit: "Budha" },
  Jupiter: { glyph: "♃", color: "#FBBF24", sanskrit: "Guru" },
  Venus: { glyph: "♀", color: "#EC4899", sanskrit: "Shukra" },
  Saturn: { glyph: "♄", color: "#6366F1", sanskrit: "Shani" },
  Rahu: { glyph: "☊", color: "#8B5CF6", sanskrit: "Rahu" },
  Ketu: { glyph: "☋", color: "#D97706", sanskrit: "Ketu" },
};

export const D3CircularAspectChart: React.FC<D3CircularAspectChartProps> = ({
  planets,
  houses = [],
  lagnaSign,
  userName = "Native",
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Interaction State
  const [aspectMode, setAspectMode] = useState<"vedic" | "western" | "combined">("combined");
  const [filterNature, setFilterNature] = useState<"all" | "benefic" | "challenging" | "special">("all");
  const [selectedPlanetFilter, setSelectedPlanetFilter] = useState<string>("all");
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [hoveredAspect, setHoveredAspect] = useState<any | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showAspectLabels, setShowAspectLabels] = useState<boolean>(true);

  // 1. Calculate absolute 360-degree longitudes for all planets
  const planetLongitudes = useMemo(() => {
    const rashiNames = [
      "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
      "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
    ];

    const result: Record<string, PlanetCoordinate> = {};

    planets.forEach((p) => {
      const sIdx = rashiNames.indexOf(p.sign);
      const signIdx = sIdx >= 0 ? sIdx : 0;
      const absoluteLong = (signIdx * 30 + (p.degree || 0)) % 360;

      result[p.name] = {
        name: p.name,
        longitude: absoluteLong,
        sign: p.sign,
        degreeInSign: p.degree || 0,
        house: p.house || 1,
        nakshatra: p.nakshatra || "",
        pada: p.pada || 1,
        isRetrograde: p.isRetrograde || false,
        isCombust: p.isCombust || false,
        dignity: p.dignity || "Neutral",
        speedLongitudeDegPerDay: p.name === "Moon" ? 13.2 : p.name === "Sun" ? 1.0 : p.name === "Mercury" ? 1.2 : p.name === "Venus" ? 1.1 : p.name === "Mars" ? 0.6 : p.name === "Jupiter" ? 0.08 : p.name === "Saturn" ? 0.03 : -0.05,
      };
    });

    return result;
  }, [planets]);

  // 2. Compute Lagna (Ascendant) Absolute Longitude
  const ascendantLong = useMemo(() => {
    const rashiNames = [
      "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
      "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
    ];
    const sIdx = rashiNames.indexOf(lagnaSign);
    const signIndex = sIdx >= 0 ? sIdx : 0;
    return signIndex * 30 + 15; // Centered on Lagna cusp
  }, [lagnaSign]);

  // 3. Compute Vedic Parashari Graha Drishti Aspects
  const vedicDrishtis = useMemo(() => {
    const rawDrishtis = DrishtiAspectEngine.calculateGrahaDrishti(planetLongitudes, ascendantLong);

    // Map target houses back to actual planets residing in those target houses
    const planetAspectPairs: {
      fromPlanet: string;
      toPlanet: string;
      aspectType: string;
      drishtiStrengthVirupas: number;
      drishtiPercentage: number;
      isBeneficAspect: boolean;
      effectDescription: string;
      angleDeg: number;
    }[] = [];

    const planetList: PlanetCoordinate[] = Object.values(planetLongitudes);

    rawDrishtis.forEach((d) => {
      const targetHouse = d.targetHouseNumber;
      const targetPlanetsInHouse = planetList.filter((p) => p.house === targetHouse);

      targetPlanetsInHouse.forEach((tPlanet) => {
        if (tPlanet.name !== d.aspectingPlanet) {
          const fromL = planetLongitudes[d.aspectingPlanet]?.longitude || 0;
          const toL = tPlanet.longitude;
          let diff = Math.abs(fromL - toL);
          if (diff > 180) diff = 360 - diff;

          planetAspectPairs.push({
            fromPlanet: d.aspectingPlanet,
            toPlanet: tPlanet.name,
            aspectType: d.aspectType,
            drishtiStrengthVirupas: d.drishtiStrengthVirupas,
            drishtiPercentage: d.drishtiPercentage,
            isBeneficAspect: d.isBeneficAspect,
            effectDescription: d.effectDescription,
            angleDeg: Number(diff.toFixed(1)),
          });
        }
      });
    });

    return planetAspectPairs;
  }, [planetLongitudes, ascendantLong]);

  // 4. Compute Western & Tajika Orbed Aspects
  const westernAspects = useMemo(() => {
    return DrishtiAspectEngine.calculateWesternAspects(planetLongitudes);
  }, [planetLongitudes]);

  // 5. Filter active aspect chords based on UI filters
  const filteredAspects = useMemo(() => {
    const list: any[] = [];

    if (aspectMode === "vedic" || aspectMode === "combined") {
      vedicDrishtis.forEach((v) => {
        let matches = true;
        if (filterNature === "benefic" && !v.isBeneficAspect) matches = false;
        if (filterNature === "challenging" && v.isBeneficAspect) matches = false;
        if (filterNature === "special" && v.aspectType === "Full 7th") matches = false;

        if (selectedPlanetFilter !== "all" && v.fromPlanet !== selectedPlanetFilter && v.toPlanet !== selectedPlanetFilter) {
          matches = false;
        }

        if (matches) {
          list.push({
            id: `vedic-${v.fromPlanet}-${v.toPlanet}-${v.aspectType}`,
            system: "Vedic Drishti",
            fromPlanet: v.fromPlanet,
            toPlanet: v.toPlanet,
            aspectName: v.aspectType,
            angleDeg: v.angleDeg,
            strength: v.drishtiPercentage,
            isHarmonious: v.isBeneficAspect,
            effect: v.effectDescription,
            color: v.isBeneficAspect ? "#10B981" : v.aspectType.includes("Mars") ? "#EF4444" : v.aspectType.includes("Saturn") ? "#6366F1" : "#F59E0B",
          });
        }
      });
    }

    if (aspectMode === "western" || aspectMode === "combined") {
      westernAspects.forEach((w) => {
        let matches = true;
        const isHarmonious = w.nature === "Harmonious";
        if (filterNature === "benefic" && !isHarmonious) matches = false;
        if (filterNature === "challenging" && isHarmonious) matches = false;
        if (filterNature === "special") matches = false; // special is for Vedic Mars/Jup/Sat

        if (selectedPlanetFilter !== "all" && w.planet1 !== selectedPlanetFilter && w.planet2 !== selectedPlanetFilter) {
          matches = false;
        }

        if (matches) {
          const colors: Record<string, string> = {
            Conjunction: "#F59E0B", // Gold
            Sextile: "#10B981",     // Emerald
            Square: "#EF4444",      // Crimson
            Trine: "#3B82F6",       // Sapphire
            Opposition: "#DC2626",  // Deep Red
            Quincunx: "#F97316",    // Orange
            Semisquare: "#EC4899",  // Pink
            Sesquiquadrate: "#8B5CF6", // Purple
          };

          list.push({
            id: `western-${w.planet1}-${w.planet2}-${w.aspectName}`,
            system: "Tajika / Western",
            fromPlanet: w.planet1,
            toPlanet: w.planet2,
            aspectName: `${w.aspectName} (${w.exactAngleDeg}°)`,
            angleDeg: w.currentSeparationDeg,
            orbDeg: w.orbDeg,
            strength: w.aspectStrengthPct,
            isHarmonious,
            effect: `${w.planet1} & ${w.planet2} form ${w.aspectName} (Orb: ${w.orbDeg}° ${w.isApplying ? "Applying" : "Separating"})`,
            color: colors[w.aspectName] || "#64748B",
          });
        }
      });
    }

    return list;
  }, [aspectMode, filterNature, selectedPlanetFilter, vedicDrishtis, westernAspects]);

  // 6. D3 Circular Wheel SVG Rendering
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous drawing

    const size = 520;
    const center = size / 2;
    const outerRadius = 240;
    const innerRadius = 205;
    const tickRadius = 195;
    const planetRingRadius = 160;
    const aspectChordRadius = 135;

    svg.attr("viewBox", `0 0 ${size} ${size}`);

    const g = svg.append("g").attr("transform", `translate(${center}, ${center}) scale(${zoomLevel})`);

    // Definitions & Filters
    const defs = svg.append("defs");

    // Glow Filter
    const glowFilter = defs.append("filter").attr("id", "wheelGlow").attr("x", "-30%").attr("y", "-30%").attr("width", "160%").attr("height", "160%");
    glowFilter.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "blur");
    const feMerge = glowFilter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "blur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Radial Background Gradient
    const radialBg = defs.append("radialGradient").attr("id", "centerCircleBg").attr("cx", "50%").attr("cy", "50%").attr("r", "50%");
    radialBg.append("stop").attr("offset", "0%").attr("stop-color", "#0F172A").attr("stop-opacity", "0.95");
    radialBg.append("stop").attr("offset", "80%").attr("stop-color", "#020617").attr("stop-opacity", "1");
    radialBg.append("stop").attr("offset", "100%").attr("stop-color", "#1E293B").attr("stop-opacity", "1");

    // Background Circle
    g.append("circle")
      .attr("r", outerRadius + 8)
      .attr("fill", "url(#centerCircleBg)")
      .attr("stroke", "#334155")
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.4);

    // Inner core backdrop
    g.append("circle")
      .attr("r", aspectChordRadius)
      .attr("fill", "#020617")
      .attr("stroke", "#1E293B")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "3,3");

    // Helper: Convert degrees (0 to 360) to radians for D3 (0 deg = Top / North)
    const degToRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
    const getCoords = (deg: number, radius: number) => ({
      x: radius * Math.cos(degToRad(deg)),
      y: radius * Math.sin(degToRad(deg)),
    });

    // 1. Draw 12 Zodiac Sign Ring Arcs
    const arcGenerator = d3.arc<ZodiacSignDef>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle((d) => (d.startDeg * Math.PI) / 180)
      .endAngle((d) => (d.endDeg * Math.PI) / 180)
      .padAngle(0.015)
      .cornerRadius(4);

    const signGroup = g.append("g").attr("class", "zodiac-signs");

    const signArcs = signGroup.selectAll("path")
      .data(ZODIAC_WHEEL_SIGNS)
      .enter()
      .append("path")
      .attr("d", (d: any) => arcGenerator(d))
      .attr("fill", (d) => d.color)
      .attr("fill-opacity", 0.18)
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", 1.2)
      .attr("class", "cursor-pointer transition-all duration-200")
      .on("mouseenter", function (event, d) {
        d3.select(this).attr("fill-opacity", 0.45).attr("stroke-width", 2);
      })
      .on("mouseleave", function () {
        d3.select(this).attr("fill-opacity", 0.18).attr("stroke-width", 1.2);
      });

    // Zodiac Sign Symbols and Names
    ZODIAC_WHEEL_SIGNS.forEach((sign) => {
      const midDeg = (sign.startDeg + sign.endDeg) / 2;
      const labelCoords = getCoords(midDeg, (innerRadius + outerRadius) / 2);

      signGroup.append("text")
        .attr("x", labelCoords.x)
        .attr("y", labelCoords.y + 4)
        .attr("text-anchor", "middle")
        .attr("font-size", "13px")
        .attr("font-weight", "bold")
        .attr("fill", sign.color)
        .text(sign.symbol)
        .attr("pointer-events", "none");
    });

    // 2. Draw Degree Tick Marks (Every 5 and 10 degrees)
    const tickGroup = g.append("g").attr("class", "degree-ticks");
    for (let deg = 0; deg < 360; deg += 5) {
      const isMajor = deg % 30 === 0;
      const isMedium = deg % 10 === 0;
      const r1 = tickRadius;
      const r2 = isMajor ? tickRadius - 10 : isMedium ? tickRadius - 6 : tickRadius - 3;
      const c1 = getCoords(deg, r1);
      const c2 = getCoords(deg, r2);

      tickGroup.append("line")
        .attr("x1", c1.x)
        .attr("y1", c1.y)
        .attr("x2", c2.x)
        .attr("y2", c2.y)
        .attr("stroke", isMajor ? "#E2E8F0" : isMedium ? "#64748B" : "#334155")
        .attr("stroke-width", isMajor ? 1.5 : 0.8)
        .attr("stroke-opacity", isMajor ? 0.8 : 0.4);
    }

    // 3. Ascendant (Lagna) Ray
    const ascCoords = getCoords(ascendantLong, outerRadius + 6);
    g.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", ascCoords.x)
      .attr("y2", ascCoords.y)
      .attr("stroke", "#FBBF24")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "4,2")
      .attr("opacity", 0.85);

    g.append("text")
      .attr("x", ascCoords.x * 1.08)
      .attr("y", ascCoords.y * 1.08 + 4)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("font-weight", "bold")
      .attr("fill", "#FBBF24")
      .text("Asc (ल)");

    // 4. Draw Interactive Aspect Chords / Curved Rays
    const chordGroup = g.append("g").attr("class", "aspect-chords");

    filteredAspects.forEach((aspect) => {
      const p1 = planetLongitudes[aspect.fromPlanet];
      const p2 = planetLongitudes[aspect.toPlanet];
      if (!p1 || !p2) return;

      const c1 = getCoords(p1.longitude, aspectChordRadius);
      const c2 = getCoords(p2.longitude, aspectChordRadius);

      const isHovered = hoveredAspect?.id === aspect.id;
      const isRelatedToHoveredPlanet = hoveredPlanet && (aspect.fromPlanet === hoveredPlanet || aspect.toPlanet === hoveredPlanet);
      const isDimmed = (hoveredPlanet && !isRelatedToHoveredPlanet) || (hoveredAspect && !isHovered);

      // Bezier curve through origin with slight gravitational bow
      const pathData = `M ${c1.x} ${c1.y} Q 0 0 ${c2.x} ${c2.y}`;

      const chord = chordGroup.append("path")
        .attr("d", pathData)
        .attr("fill", "none")
        .attr("stroke", aspect.color)
        .attr("stroke-width", isHovered ? 3.5 : isRelatedToHoveredPlanet ? 2.5 : 1.4)
        .attr("stroke-opacity", isDimmed ? 0.12 : isHovered ? 1 : isRelatedToHoveredPlanet ? 0.85 : 0.45)
        .attr("class", "cursor-pointer transition-all duration-150")
        .on("mouseenter", (event) => {
          setHoveredAspect(aspect);
        })
        .on("mouseleave", () => {
          setHoveredAspect(null);
        });

      if (isHovered) {
        chord.attr("filter", "url(#wheelGlow)");
      }
    });

    // 5. Draw Planetary Nodes
    const planetGroup = g.append("g").attr("class", "planets");

    (Object.values(planetLongitudes) as PlanetCoordinate[]).forEach((planet) => {
      const coords = getCoords(planet.longitude, planetRingRadius);
      const pSymbolDef = PLANET_SYMBOLS[planet.name] || { glyph: "✦", color: "#F59E0B", sanskrit: planet.name };
      const isPlanetHovered = hoveredPlanet === planet.name;
      const isTargetOfHoveredAspect = hoveredAspect && (hoveredAspect.fromPlanet === planet.name || hoveredAspect.toPlanet === planet.name);
      const isFocused = selectedPlanetFilter === planet.name;

      const pG = planetGroup.append("g")
        .attr("transform", `translate(${coords.x}, ${coords.y})`)
        .attr("class", "cursor-pointer")
        .on("mouseenter", () => {
          setHoveredPlanet(planet.name);
        })
        .on("mouseleave", () => {
          setHoveredPlanet(null);
        })
        .on("click", () => {
          setSelectedPlanetFilter((prev) => (prev === planet.name ? "all" : planet.name));
        });

      // Outer Pulse Ring when hovered / focused
      if (isPlanetHovered || isTargetOfHoveredAspect || isFocused) {
        pG.append("circle")
          .attr("r", 20)
          .attr("fill", pSymbolDef.color)
          .attr("fill-opacity", 0.25)
          .attr("stroke", pSymbolDef.color)
          .attr("stroke-width", 1.5)
          .attr("filter", "url(#wheelGlow)");
      }

      // Planet Circle Base
      pG.append("circle")
        .attr("r", 14)
        .attr("fill", "#0F172A")
        .attr("stroke", pSymbolDef.color)
        .attr("stroke-width", isPlanetHovered || isFocused ? 2.5 : 1.5);

      // Planet Glyph
      pG.append("text")
        .attr("y", 4)
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("font-weight", "bold")
        .attr("fill", pSymbolDef.color)
        .text(pSymbolDef.glyph);

      // Dignity / Retrograde Badges
      if (planet.isRetrograde) {
        pG.append("text")
          .attr("x", 12)
          .attr("y", -8)
          .attr("font-size", "9px")
          .attr("font-weight", "bold")
          .attr("fill", "#EF4444")
          .text("℞");
      }

      if (planet.isCombust) {
        pG.append("text")
          .attr("x", -14)
          .attr("y", -8)
          .attr("font-size", "8px")
          .attr("font-weight", "bold")
          .attr("fill", "#F97316")
          .text("🔥");
      }

      // Degree label outside node
      const degTextCoords = getCoords(planet.longitude, planetRingRadius + 22);
      planetGroup.append("text")
        .attr("x", degTextCoords.x)
        .attr("y", degTextCoords.y + 3)
        .attr("text-anchor", "middle")
        .attr("font-size", "9px")
        .attr("font-weight", "600")
        .attr("fill", "#94A3B8")
        .text(`${Math.floor(planet.degreeInSign)}°`);
    });

  }, [planetLongitudes, ascendantLong, filteredAspects, hoveredPlanet, hoveredAspect, selectedPlanetFilter, zoomLevel]);

  return (
    <div className="bg-slate-950 text-slate-100 p-6 rounded-3xl border border-amber-500/20 shadow-2xl space-y-6">
      {/* Top Header & Interactive Filter Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            Vedic & Tajika Circular Aspect Wheel
          </div>
          <h2 className="text-2xl font-bold font-serif text-amber-100 mt-1">
            Inter-Planetary Drishti & Geometric Aspect Radar
          </h2>
          <p className="text-xs text-slate-400">
            Interactive visual mapping of Parashari Graha Drishti rays, mutual aspects, and angular orbs for <span className="text-amber-300 font-bold">{userName}</span>
          </p>
        </div>

        {/* View Mode Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-slate-900 p-1 rounded-2xl border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setAspectMode("vedic")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                aspectMode === "vedic"
                  ? "bg-amber-400 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Vedic Drishti
            </button>
            <button
              onClick={() => setAspectMode("western")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                aspectMode === "western"
                  ? "bg-amber-400 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Tajika / Geometric
            </button>
            <button
              onClick={() => setAspectMode("combined")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                aspectMode === "combined"
                  ? "bg-amber-400 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              All Aspects
            </button>
          </div>

          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.3, z + 0.1))}
              className="p-1.5 text-slate-400 hover:text-amber-300 rounded-lg hover:bg-slate-800"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
              className="p-1.5 text-slate-400 hover:text-amber-300 rounded-lg hover:bg-slate-800"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setZoomLevel(1);
                setSelectedPlanetFilter("all");
                setFilterNature("all");
              }}
              className="p-1.5 text-slate-400 hover:text-amber-300 rounded-lg hover:bg-slate-800"
              title="Reset View"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Sub Filter Chips */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-400 font-semibold flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            Filter Nature:
          </span>
          {[
            { id: "all", label: "All Active Aspects" },
            { id: "benefic", label: "Benefic / Harmonious Only" },
            { id: "challenging", label: "Dynamic / Challenging Only" },
            { id: "special", label: "Special Vedic Drishti (Mars/Jup/Sat)" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterNature(f.id as any)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border ${
                filterNature === f.id
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Focus Planet Pill */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-semibold">Focus Planet:</span>
          <select
            value={selectedPlanetFilter}
            onChange={(e) => setSelectedPlanetFilter(e.target.value)}
            className="bg-slate-900 text-amber-300 border border-slate-700 rounded-xl px-2.5 py-1 text-xs font-semibold focus:outline-none focus:border-amber-400"
          >
            <option value="all">✦ All 9 Grahas</option>
            {Object.keys(planetLongitudes).map((pName) => (
              <option key={pName} value={pName}>
                {pName} ({planetLongitudes[pName].sign})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Radar Layout: D3 Circular SVG on Left, Interactive Aspect Intel on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left 7 Columns: D3 SVG Circular Aspect Wheel */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative bg-slate-950/80 rounded-3xl p-4 border border-slate-900 shadow-inner">
          <div className="w-full max-w-[520px] aspect-square relative flex items-center justify-center">
            <svg ref={svgRef} className="w-full h-full drop-shadow-xl" />
          </div>

          {/* Quick Legend at bottom of chart */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-[11px] text-slate-400">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
              <span>Harmonious / Benefic Trine & 5th/9th</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
              <span>Dynamic Square / Mars 4th-8th</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block"></span>
              <span>Saturn 3rd-10th / Opposition</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
              <span>Conjunction & Full 7th</span>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Interactive Intelligence Dossier & Active Aspect Table */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Hover / Selection Card */}
          {hoveredAspect ? (
            <div className="bg-slate-900/90 border border-amber-500/40 p-4 rounded-2xl shadow-xl space-y-2 animate-fade-in">
              <div className="flex items-center justify-between text-xs">
                <span className="text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Aspect Inspection
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold">
                  {hoveredAspect.system}
                </span>
              </div>
              <div className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-300">{hoveredAspect.fromPlanet}</span>
                <span className="text-slate-400">➔</span>
                <span className="text-amber-300">{hoveredAspect.toPlanet}</span>
                <span className="text-xs text-slate-400 font-normal">({hoveredAspect.aspectName})</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {hoveredAspect.effect}
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
                <div className="bg-slate-950 p-2 rounded-xl">
                  <div className="text-[10px] text-slate-400">Separation Angle</div>
                  <div className="font-bold text-amber-200">{hoveredAspect.angleDeg}°</div>
                </div>
                <div className="bg-slate-950 p-2 rounded-xl">
                  <div className="text-[10px] text-slate-400">Potency / Strength</div>
                  <div className="font-bold text-emerald-400">{hoveredAspect.strength}%</div>
                </div>
              </div>
            </div>
          ) : hoveredPlanet ? (
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-xl space-y-2 animate-fade-in">
              <div className="flex items-center justify-between text-xs">
                <span className="text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Graha Profile
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold">
                  House {planetLongitudes[hoveredPlanet]?.house}
                </span>
              </div>
              <div className="text-lg font-bold text-white">
                {hoveredPlanet} ({PLANET_SYMBOLS[hoveredPlanet]?.sanskrit}) in {planetLongitudes[hoveredPlanet]?.sign}
              </div>
              <div className="text-xs text-slate-300">
                Longitude: <span className="text-amber-300 font-semibold">{planetLongitudes[hoveredPlanet]?.degreeInSign.toFixed(2)}°</span> | Nakshatra: <span className="text-amber-300 font-semibold">{planetLongitudes[hoveredPlanet]?.nakshatra} (Pada {planetLongitudes[hoveredPlanet]?.pada})</span>
              </div>
              <div className="text-xs text-slate-400">
                Dignity: <span className="text-emerald-400 font-semibold">{planetLongitudes[hoveredPlanet]?.dignity}</span> {planetLongitudes[hoveredPlanet]?.isRetrograde ? "• (Vakri ℞)" : ""} {planetLongitudes[hoveredPlanet]?.isCombust ? "• (Combust 🔥)" : ""}
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl text-xs text-slate-400 space-y-1.5">
              <div className="font-bold text-slate-200 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-400" />
                Interactive Radar Exploration
              </div>
              <p>
                Hover over any planet node to isolate its aspect rays, or hover directly on any colored aspect line to inspect its angular orb and Vedic impact.
              </p>
            </div>
          )}

          {/* Scannable Table of Active Planetary Relationships */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 pb-2 border-b border-slate-800">
              <span>Active Aspect Network ({filteredAspects.length})</span>
              <span className="text-[10px] text-slate-400">Ranked by Virupas / Strength</span>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1 no-scrollbar text-xs">
              {filteredAspects.map((aspect) => (
                <div
                  key={aspect.id}
                  onMouseEnter={() => setHoveredAspect(aspect)}
                  onMouseLeave={() => setHoveredAspect(null)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    hoveredAspect?.id === aspect.id
                      ? "bg-slate-800 border-amber-400 text-white shadow-md scale-[1.01]"
                      : "bg-slate-950/60 border-slate-850 hover:bg-slate-900/90 text-slate-300"
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="font-bold flex items-center gap-1.5">
                      <span className="text-amber-300">{aspect.fromPlanet}</span>
                      <span className="text-slate-500 text-[10px]">➔</span>
                      <span className="text-amber-200">{aspect.toPlanet}</span>
                      <span className="text-[10px] text-slate-400">({aspect.aspectName})</span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[220px]">
                      {aspect.effect}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-amber-400 text-xs">{aspect.strength}%</div>
                    <div className="text-[9px] text-slate-500">{aspect.angleDeg}°</div>
                  </div>
                </div>
              ))}

              {filteredAspects.length === 0 && (
                <div className="py-6 text-center text-xs text-slate-500">
                  No aspects match current filter criteria.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
