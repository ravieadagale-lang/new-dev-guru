import React, { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";
import { PlanetPosition, HouseDetail, DivisionalChartType } from "../types";
import { calculateDivisionalChartData, RASHIS } from "../data/astrologyData";
import { VARGA_CATEGORIES } from "../data/vargaCategoriesData";
import { 
  Compass, 
  Sparkles, 
  Layers, 
  Eye, 
  RefreshCw, 
  ZoomIn, 
  ZoomOut, 
  Zap,
  User,
  Coins,
  Users,
  Home,
  Baby,
  HeartHandshake,
  Briefcase,
  Shield,
  Car,
  GraduationCap
} from "lucide-react";
import { playCardHoverSound, playCardFlipSound } from "../utils/audioEffects";

interface D3VedicChartProps {
  planets: PlanetPosition[];
  houses: HouseDetail[];
  lagnaSign: string;
  chartTitle?: string;
  defaultChart?: DivisionalChartType;
  chartEngine?: "d3" | "traditional" | "aspect_wheel";
  onEngineChange?: (engine: "d3" | "traditional" | "aspect_wheel") => void;
  onSelectDivisionalChart?: (chart: DivisionalChartType) => void;
}

export const D3VedicChart: React.FC<D3VedicChartProps> = ({
  planets: rawPlanets = [],
  houses: rawHouses = [],
  lagnaSign: rawLagnaSign = "Aries",
  chartTitle = "D1 Rashi Chart",
  defaultChart = "D1",
  chartEngine = "d3",
  onEngineChange,
  onSelectDivisionalChart,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [selectedChart, setSelectedChart] = useState<DivisionalChartType>(defaultChart || "D1");
  const [chartStyle, setChartStyle] = useState<"north" | "south" | "wheel">("north");
  const [showAspectLines, setShowAspectLines] = useState<boolean>(true);
  const [hoveredPlanet, setHoveredPlanet] = useState<PlanetPosition | null>(null);
  const [hoveredHouse, setHoveredHouse] = useState<HouseDetail | null>(null);
  const [selectedPlanetForAspect, setSelectedPlanetForAspect] = useState<PlanetPosition | null>(null);

  useEffect(() => {
    if (defaultChart && defaultChart !== selectedChart) {
      setSelectedChart(defaultChart);
    }
  }, [defaultChart]);

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
    try {
      if (!rawPlanets || rawPlanets.length === 0 || !rawHouses || rawHouses.length === 0) {
        return {
          planets: rawPlanets || [],
          houses: rawHouses || [],
          lagna: rawLagnaSign || "Aries"
        };
      }
      return calculateDivisionalChartData(rawPlanets, rawHouses, rawLagnaSign || "Aries", selectedChart || "D1");
    } catch (err) {
      console.error("Error calculating divisional chart data in D3VedicChart:", err);
      return {
        planets: rawPlanets || [],
        houses: rawHouses || [],
        lagna: rawLagnaSign || "Aries"
      };
    }
  }, [rawPlanets, rawHouses, rawLagnaSign, selectedChart]);

  const planets = activeChartData?.planets || [];
  const houses = activeChartData?.houses || [];
  const lagnaSign = activeChartData?.lagna || "Aries";

  const handleChartChange = (chart: DivisionalChartType) => {
    playCardFlipSound();
    setSelectedChart(chart);
    if (onSelectDivisionalChart) onSelectDivisionalChart(chart);
  };

  // North Indian House Coordinates (Percentage based on 400x400 viewBox)
  const houseCoordsNorth: Record<number, { x: number; y: number; path: string; labelX: number; labelY: number }> = {
    1: { x: 200, y: 100, labelX: 200, labelY: 130, path: "M 200,0 L 300,100 L 200,200 L 100,100 Z" }, // House 1 Top Center Diamond
    2: { x: 100, y: 50, labelX: 100, labelY: 65, path: "M 0,0 L 200,0 L 100,100 Z" }, // House 2 Top Left Triangle
    3: { x: 50, y: 100, labelX: 50, labelY: 100, path: "M 0,0 L 100,100 L 0,200 Z" }, // House 3 Far Left Triangle
    4: { x: 100, y: 200, labelX: 100, labelY: 200, path: "M 100,100 L 200,200 L 100,300 L 0,200 Z" }, // House 4 Center Left Diamond
    5: { x: 50, y: 300, labelX: 50, labelY: 300, path: "M 0,200 L 100,300 L 0,400 Z" }, // House 5 Bottom Left Triangle
    6: { x: 100, y: 350, labelX: 100, labelY: 335, path: "M 0,400 L 200,400 L 100,300 Z" }, // House 6 Bottom Left Lower Triangle
    7: { x: 200, y: 300, labelX: 200, labelY: 270, path: "M 200,200 L 300,300 L 200,400 L 100,300 Z" }, // House 7 Bottom Center Diamond
    8: { x: 300, y: 350, labelX: 300, labelY: 335, path: "M 200,400 L 400,400 L 300,300 Z" }, // House 8 Bottom Right Lower Triangle
    9: { x: 350, y: 300, labelX: 350, labelY: 300, path: "M 300,300 L 400,400 L 400,200 Z" }, // House 9 Bottom Right Triangle
    10: { x: 300, y: 200, labelX: 300, labelY: 200, path: "M 200,200 L 300,100 L 400,200 L 300,300 Z" }, // House 10 Center Right Diamond
    11: { x: 350, y: 100, labelX: 350, labelY: 100, path: "M 400,0 L 400,200 L 300,100 Z" }, // House 11 Top Right Triangle
    12: { x: 300, y: 50, labelX: 300, labelY: 65, path: "M 200,0 L 400,0 L 300,100 Z" }, // House 12 Top Right Upper Triangle
  };

  // D3 Chart Render Effect
  useEffect(() => {
    if (!svgRef.current) return;

    try {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); // Clear previous drawing

      const width = 400;
      const height = 400;

    // Define gradients and filters
    const defs = svg.append("defs");

    // Glow Filter
    const filter = defs.append("filter").attr("id", "glow").attr("x", "-20%").attr("y", "-20%").attr("width", "140%").attr("height", "140%");
    filter.append("feGaussianBlur").attr("stdDeviation", "3").attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Gold Linear Gradient
    const goldGrad = defs.append("linearGradient").attr("id", "goldGradient").attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "100%");
    goldGrad.append("stop").attr("offset", "0%").attr("stop-color", "#F59E0B");
    goldGrad.append("stop").attr("offset", "100%").attr("stop-color", "#B45309");

    // Navy Background
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("rx", 24)
      .attr("fill", "#090D16")
      .attr("stroke", "#B45309")
      .attr("stroke-width", 2);

    if (chartStyle === "north") {
      // NORTH INDIAN DIAMOND LAYOUT
      const chartGroup = svg.append("g").attr("class", "north-chart");

      const lagnaIdx = RASHIS.findIndex((r) => r.toLowerCase() === (lagnaSign || "Aries").toLowerCase() || r.toLowerCase().startsWith((lagnaSign || "Aries").toLowerCase().slice(0, 3)));
      const resolvedLagnaIdx = lagnaIdx >= 0 ? lagnaIdx : 0;

      // Draw House Polygons
      Object.entries(houseCoordsNorth).forEach(([houseStr, coords]) => {
        const houseNum = parseInt(houseStr);
        const houseInfo = houses.find((h) => h.houseNumber === houseNum);
        const housePlanets = planets.filter((p) => p.house === houseNum);

        // In traditional North Indian Vedic charts, numbers represent the Rashi (Zodiac Sign) number (1 to 12)
        const rashiNumber = houseInfo?.sign && RASHIS.indexOf(houseInfo.sign) >= 0
          ? RASHIS.indexOf(houseInfo.sign) + 1
          : ((resolvedLagnaIdx + (houseNum - 1)) % 12) + 1;

        const isHovered = hoveredHouse?.houseNumber === houseNum;

        // House Cell Path
        chartGroup.append("path")
          .attr("d", coords.path)
          .attr("fill", isHovered ? "rgba(245, 158, 11, 0.15)" : houseNum % 2 === 0 ? "#0F172A" : "#0B132B")
          .attr("stroke", "#D97706")
          .attr("stroke-width", 1.2)
          .attr("stroke-opacity", 0.6)
          .style("cursor", "pointer")
          .style("transition", "all 0.3s ease")
          .on("mouseenter", () => setHoveredHouse(houseInfo || null))
          .on("mouseleave", () => setHoveredHouse(null));

        // Rashi (Zodiac Sign) Number Badge (Classical Vedic standard: 1=Aries ... 12=Pisces)
        chartGroup.append("text")
          .attr("x", coords.labelX)
          .attr("y", coords.labelY)
          .attr("text-anchor", "middle")
          .attr("fill", "#FBBF24")
          .attr("font-size", "11px")
          .attr("font-weight", "bold")
          .attr("font-family", "serif")
          .attr("opacity", 0.9)
          .text(rashiNumber);

        // Render Planets inside House
        const planetGroup = chartGroup.append("g").attr("class", `house-${houseNum}-planets`);

        housePlanets.forEach((p, pIdx) => {
          // Offsets for multiple planets in one house
          const offsetX = coords.x + (pIdx % 2 === 0 ? -16 : 16) * (housePlanets.length > 1 ? 1 : 0);
          const offsetY = coords.y + (Math.floor(pIdx / 2) * 16 - 6);

          const isSelectedAspect = selectedPlanetForAspect?.name === p.name;
          const isPlanetHovered = hoveredPlanet?.name === p.name;

          const pNode = planetGroup.append("g")
            .attr("transform", `translate(${offsetX}, ${offsetY})`)
            .style("cursor", "pointer")
            .on("mouseenter", () => setHoveredPlanet(p))
            .on("mouseleave", () => setHoveredPlanet(null))
            .on("click", (e) => {
              e.stopPropagation();
              setSelectedPlanetForAspect(selectedPlanetForAspect?.name === p.name ? null : p);
            });

          // Planet Badge Circle
          pNode.append("circle")
            .attr("r", isPlanetHovered || isSelectedAspect ? 14 : 11)
            .attr("fill", p.dignity === "Exalted" ? "#065F46" : p.dignity === "Debilitated" ? "#881337" : "#1E293B")
            .attr("stroke", isSelectedAspect ? "#38BDF8" : isPlanetHovered ? "#F59E0B" : "#D97706")
            .attr("stroke-width", isSelectedAspect || isPlanetHovered ? 2.5 : 1)
            .attr("filter", isPlanetHovered ? "url(#glow)" : null);

          // Planet Text Label
          pNode.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "3.5px")
            .attr("fill", "#F8FAFC")
            .attr("font-size", "9px")
            .attr("font-weight", "bold")
            .text(p.name.substring(0, 2) + (p.isRetrograde ? "R" : ""));
        });
      });

      // Central Ascendant (Lagna) Watermark
      const centerG = chartGroup.append("g").attr("transform", "translate(200, 200)");
      centerG.append("circle").attr("r", 22).attr("fill", "#020617").attr("stroke", "#F59E0B").attr("stroke-width", 1.5);
      centerG.append("text").attr("text-anchor", "middle").attr("dy", "-2px").attr("fill", "#FBBF24").attr("font-size", "9px").attr("font-weight", "bold").text("LAGNA");
      centerG.append("text").attr("text-anchor", "middle").attr("dy", "10px").attr("fill", "#94A3B8").attr("font-size", "8px").text(lagnaSign.substring(0, 3).toUpperCase());

    } else if (chartStyle === "south") {
      // SOUTH INDIAN SQUARE CHART LAYOUT (12 Fixed Sign Squares around perimeter)
      const southSignMap: { signNum: number; row: number; col: number; name: string }[] = [
        { signNum: 12, row: 0, col: 0, name: "Pisces" },
        { signNum: 1, row: 0, col: 1, name: "Aries" },
        { signNum: 2, row: 0, col: 2, name: "Taurus" },
        { signNum: 3, row: 0, col: 3, name: "Gemini" },
        { signNum: 11, row: 1, col: 0, name: "Aquarius" },
        { signNum: 4, row: 1, col: 3, name: "Cancer" },
        { signNum: 10, row: 2, col: 0, name: "Capricorn" },
        { signNum: 5, row: 2, col: 3, name: "Leo" },
        { signNum: 9, row: 3, col: 0, name: "Sagittarius" },
        { signNum: 8, row: 3, col: 1, name: "Scorpio" },
        { signNum: 7, row: 3, col: 2, name: "Libra" },
        { signNum: 6, row: 3, col: 3, name: "Virgo" },
      ];

      const cellSize = 100;
      const chartGroup = svg.append("g").attr("class", "south-chart");

      southSignMap.forEach((cell) => {
        const x = cell.col * cellSize;
        const y = cell.row * cellSize;

        // Find planets in this sign
        const cellPlanets = planets.filter((p) => p.sign === cell.name);
        const houseForSign = houses.find((h) => h.sign === cell.name);

        const isAscendant = cell.name === lagnaSign;

        // Draw Square Cell
        chartGroup.append("rect")
          .attr("x", x)
          .attr("y", y)
          .attr("width", cellSize)
          .attr("height", cellSize)
          .attr("fill", isAscendant ? "rgba(245, 158, 11, 0.12)" : "#0F172A")
          .attr("stroke", "#D97706")
          .attr("stroke-width", 1.2);

        // Sign Name Header
        chartGroup.append("text")
          .attr("x", x + 6)
          .attr("y", y + 14)
          .attr("fill", "#FBBF24")
          .attr("font-size", "9px")
          .attr("font-weight", "bold")
          .text(cell.name + (isAscendant ? " (Asc)" : ""));

        if (houseForSign) {
          chartGroup.append("text")
            .attr("x", x + cellSize - 6)
            .attr("y", y + 14)
            .attr("text-anchor", "end")
            .attr("fill", "#94A3B8")
            .attr("font-size", "8px")
            .text(`H${houseForSign.houseNumber}`);
        }

        // Planets inside Square
        cellPlanets.forEach((p, pIdx) => {
          const px = x + 18 + (pIdx % 3) * 30;
          const py = y + 42 + Math.floor(pIdx / 3) * 24;

          const pNode = chartGroup.append("g")
            .attr("transform", `translate(${px}, ${py})`)
            .style("cursor", "pointer")
            .on("mouseenter", () => setHoveredPlanet(p))
            .on("mouseleave", () => setHoveredPlanet(null));

          pNode.append("circle")
            .attr("r", 9)
            .attr("fill", "#1E293B")
            .attr("stroke", "#D97706")
            .attr("stroke-width", 1);

          pNode.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "3px")
            .attr("fill", "#F8FAFC")
            .attr("font-size", "8px")
            .attr("font-weight", "bold")
            .text(p.name.substring(0, 2));
        });
      });

      // Center Box Brand Label
      const centerBox = chartGroup.append("g").attr("transform", "translate(100, 100)");
      centerBox.append("rect").attr("width", 200).attr("height", 200).attr("fill", "#020617").attr("stroke", "#D97706").attr("stroke-width", 1);
      centerBox.append("text").attr("x", 100).attr("y", 90).attr("text-anchor", "middle").attr("fill", "#FBBF24").attr("font-size", "14px").attr("font-weight", "bold").attr("font-family", "serif").text("DEV-GURU V3");
      centerBox.append("text").attr("x", 100).attr("y", 110).attr("text-anchor", "middle").attr("fill", "#94A3B8").attr("font-size", "10px").text(`${selectedChart} South Kundli`);

    } else if (chartStyle === "wheel") {
      // CIRCULAR ZODIAC WHEEL WITH D3 ARCS
      const radius = 180;
      const center = 200;
      const chartGroup = svg.append("g").attr("transform", `translate(${center}, ${center})`);

      const pie = d3.pie<number>().value(1).sort(null);
      const arcData = pie(Array(12).fill(1));

      const arcGen = d3.arc<d3.PieArcDatum<number>>()
        .innerRadius(100)
        .outerRadius(radius);

      // Render 12 Zodiac Segments
      chartGroup.selectAll("path.segment")
        .data(arcData)
        .enter()
        .append("path")
        .attr("class", "segment")
        .attr("d", arcGen)
        .attr("fill", (d, i) => (i % 2 === 0 ? "#0F172A" : "#1E293B"))
        .attr("stroke", "#D97706")
        .attr("stroke-width", 1);

      // Render House Numbers & Planets on Circular Axes
      arcData.forEach((d, houseIdx) => {
        const houseNum = houseIdx + 1;
        const angle = (d.startAngle + d.endAngle) / 2 - Math.PI / 2;

        const labelR = 115;
        const lx = Math.cos(angle) * labelR;
        const ly = Math.sin(angle) * labelR;

        chartGroup.append("text")
          .attr("x", lx)
          .attr("y", ly)
          .attr("text-anchor", "middle")
          .attr("dy", "3px")
          .attr("fill", "#FBBF24")
          .attr("font-size", "10px")
          .attr("font-weight", "bold")
          .text(`H${houseNum}`);

        // Planets in this House
        const housePlanets = planets.filter((p) => p.house === houseNum);
        housePlanets.forEach((p, pIdx) => {
          const planetR = 150 + pIdx * 14;
          const px = Math.cos(angle) * planetR;
          const py = Math.sin(angle) * planetR;

          const pNode = chartGroup.append("g")
            .attr("transform", `translate(${px}, ${py})`)
            .style("cursor", "pointer")
            .on("mouseenter", () => setHoveredPlanet(p))
            .on("mouseleave", () => setHoveredPlanet(null));

          pNode.append("circle").attr("r", 9).attr("fill", "#020617").attr("stroke", "#F59E0B").attr("stroke-width", 1.2);
          pNode.append("text").attr("text-anchor", "middle").attr("dy", "3px").attr("fill", "#FFF").attr("font-size", "8px").attr("font-weight", "bold").text(p.name.substring(0, 2));
        });
      });

      // Center Hub
      chartGroup.append("circle").attr("r", 70).attr("fill", "#020617").attr("stroke", "#D97706").attr("stroke-width", 1.5);
      chartGroup.append("text").attr("text-anchor", "middle").attr("dy", "-4px").attr("fill", "#FBBF24").attr("font-size", "12px").attr("font-weight", "bold").attr("font-family", "serif").text("Zodiac Wheel");
      chartGroup.append("text").attr("text-anchor", "middle").attr("dy", "12px").attr("fill", "#94A3B8").attr("font-size", "9px").text(`Lagna: ${lagnaSign}`);
    }

    // DRAW PLANETARY ASPECT LINES (If enabled & planet selected)
    if (showAspectLines && selectedPlanetForAspect && chartStyle === "north") {
      const sourceHouse = selectedPlanetForAspect.house;
      const sourceCoord = houseCoordsNorth[sourceHouse];

      // Vedic Aspect Rules:
      // All planets aspect 7th House from position.
      // Mars aspects 4th, 7th, 8th.
      // Jupiter aspects 5th, 7th, 9th.
      // Saturn aspects 3rd, 7th, 10th.
      let aspectHouses: number[] = [(sourceHouse + 6) % 12 || 12]; // 7th house aspect

      if (selectedPlanetForAspect.name === "Mars") {
        aspectHouses.push((sourceHouse + 3) % 12 || 12, (sourceHouse + 7) % 12 || 12);
      } else if (selectedPlanetForAspect.name === "Jupiter") {
        aspectHouses.push((sourceHouse + 4) % 12 || 12, (sourceHouse + 8) % 12 || 12);
      } else if (selectedPlanetForAspect.name === "Saturn") {
        aspectHouses.push((sourceHouse + 2) % 12 || 12, (sourceHouse + 9) % 12 || 12);
      }

      aspectHouses.forEach((targetHouse) => {
        const targetCoord = houseCoordsNorth[targetHouse];
        if (sourceCoord && targetCoord) {
          svg.append("line")
            .attr("x1", sourceCoord.x)
            .attr("y1", sourceCoord.y)
            .attr("x2", targetCoord.x)
            .attr("y2", targetCoord.y)
            .attr("stroke", "#38BDF8")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "4 4")
            .attr("opacity", 0.85);
        }
      });
    }
  } catch (err) {
    console.error("Error in D3VedicChart D3 rendering:", err);
  }
  }, [planets, houses, lagnaSign, chartStyle, hoveredHouse, hoveredPlanet, selectedPlanetForAspect, showAspectLines, selectedChart]);

  return (
    <div ref={containerRef} className="bg-slate-950 text-slate-100 rounded-3xl p-6 border border-amber-500/30 shadow-2xl space-y-6">
      {/* Header & Controls Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400 animate-spin-slow" />
            <h3 className="font-serif text-2xl font-bold text-amber-200">
              Interactive D3 Vedic Chart Visualizer
            </h3>
          </div>
          <p className="text-xs text-amber-200/70 mt-0.5">
            Lagna: <span className="font-bold text-amber-300">{lagnaSign}</span> • Selected Chart: <span className="font-bold text-amber-300">{selectedChart}</span>
          </p>
        </div>

        {/* Style & Chart Switcher Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Format Selector */}
          <div className="flex bg-slate-900 p-1 rounded-xl border border-amber-500/30 text-xs font-semibold">
            <button
              onClick={() => setChartStyle("north")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                chartStyle === "north" ? "bg-amber-500 text-slate-950 font-bold shadow-sm" : "text-amber-200/70 hover:text-amber-100"
              }`}
            >
              North Diamond
            </button>
            <button
              onClick={() => setChartStyle("south")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                chartStyle === "south" ? "bg-amber-500 text-slate-950 font-bold shadow-sm" : "text-amber-200/70 hover:text-amber-100"
              }`}
            >
              South Square
            </button>
            <button
              onClick={() => setChartStyle("wheel")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                chartStyle === "wheel" ? "bg-amber-500 text-slate-950 font-bold shadow-sm" : "text-amber-200/70 hover:text-amber-100"
              }`}
            >
              Zodiac Wheel
            </button>
          </div>
        </div>
      </div>

      {/* 12 Categorized Divisional Chart Cards (D1 - D60) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            Divisional Charts by Life Domain (12 Categories)
          </span>
          <span className="text-[11px] font-semibold text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
            Active: <span className="font-bold text-amber-200">{selectedChart}</span> ({VARGA_CATEGORIES.flatMap(c => c.charts).find(c => c.id === selectedChart)?.name || selectedChart})
          </span>
        </div>

        {/* 12 Distinct Category Cards Grid */}
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
                    ? "bg-amber-500/20 text-amber-100 border-amber-400 shadow-md ring-1 ring-amber-400 scale-[1.02]"
                    : "bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-amber-500/20 hover:border-amber-400/50"
                }`}
              >
                {/* Header: Icon + Category Name */}
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div
                      className={`p-1 rounded-lg shrink-0 ${
                        isSelected
                          ? "bg-amber-400 text-slate-950 font-bold"
                          : "bg-slate-800 text-amber-300 group-hover:bg-amber-500/30"
                      }`}
                    >
                      {getCategoryIcon(cat.iconName, "w-3 h-3")}
                    </div>
                    <div className="min-w-0">
                      <div className={`font-serif font-bold text-xs truncate ${isSelected ? "text-amber-200" : "text-slate-200"}`}>
                        {cat.name}
                      </div>
                      <div className={`text-[9px] truncate ${isSelected ? "text-amber-300/80" : "text-amber-400/60"}`}>
                        {cat.sanskritName}
                      </div>
                    </div>
                  </div>

                  {/* Single Chart Badge */}
                  {!isAdvancedCategory && (
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.5 rounded-md shrink-0 ${
                        isSelected
                          ? "bg-amber-400 text-slate-950"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {primaryChart.code}
                    </span>
                  )}
                </div>

                {/* Sub-pills for Advanced Category (D27, D30, D40, D45, D60) */}
                {isAdvancedCategory ? (
                  <div className="space-y-1 pt-0.5">
                    <div className={`text-[9px] font-semibold ${isSelected ? "text-amber-300" : "text-amber-400/80"}`}>
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
                                ? "bg-amber-950/60 text-amber-200 hover:bg-amber-500/30 border border-amber-500/40"
                                : "bg-slate-800 text-slate-300 hover:bg-amber-500/20 hover:text-amber-200"
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
                  <div className={`text-[9px] line-clamp-1 leading-tight ${isSelected ? "text-amber-100/90" : "text-slate-400"}`}>
                    {primaryChart.desc.split("(")[0].trim()}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main D3 Visualizer Canvas & Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Interactive SVG Canvas */}
        <div className="lg:col-span-7 flex flex-col items-center space-y-3">
          <div className="relative w-full max-w-[400px] aspect-square rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl bg-slate-950">
            <svg
              ref={svgRef}
              viewBox="0 0 400 400"
              className="w-full h-full select-none"
            />
          </div>

          <div className="flex items-center gap-4 text-xs text-amber-200/70">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={showAspectLines}
                onChange={(e) => setShowAspectLines(e.target.checked)}
                className="rounded text-amber-500 focus:ring-0"
              />
              <span>Show Aspect Overlay Lines</span>
            </label>

            {selectedPlanetForAspect && (
              <button
                onClick={() => setSelectedPlanetForAspect(null)}
                className="text-amber-400 font-bold underline hover:text-amber-300"
              >
                Clear Aspect Focus ({selectedPlanetForAspect.name})
              </button>
            )}
          </div>
        </div>

        {/* Right Inspection Panel */}
        <div className="lg:col-span-5 space-y-4 bg-slate-900/80 p-5 rounded-3xl border border-amber-500/20">
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
            <h4 className="font-serif font-bold text-amber-300 text-sm flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              Real-Time Planetary Inspector
            </h4>
            <span className="text-[10px] text-amber-200/50">Click planet to view aspects</span>
          </div>

          {/* Hovered or Selected Planet Detail Card */}
          {(hoveredPlanet || selectedPlanetForAspect) ? (
            <div className="bg-amber-950/40 p-4 rounded-2xl border border-amber-500/40 space-y-2 animate-in fade-in">
              <div className="flex justify-between items-center">
                <span className="font-serif font-bold text-amber-200 text-base">
                  {(hoveredPlanet || selectedPlanetForAspect)?.name}
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {(hoveredPlanet || selectedPlanetForAspect)?.dignity}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-amber-100/90">
                <div><strong>Sign:</strong> {(hoveredPlanet || selectedPlanetForAspect)?.sign}</div>
                <div><strong>House:</strong> House #{(hoveredPlanet || selectedPlanetForAspect)?.house}</div>
                <div><strong>Degree:</strong> {(hoveredPlanet || selectedPlanetForAspect)?.degreeFormatted}</div>
                <div><strong>Nakshatra:</strong> {(hoveredPlanet || selectedPlanetForAspect)?.nakshatra} (P{(hoveredPlanet || selectedPlanetForAspect)?.pada})</div>
              </div>

              <p className="text-[11px] text-amber-200/80 italic border-t border-amber-500/20 pt-2">
                Click any planet on the chart to visualize its full Vedic aspects (Drishti) across houses.
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 text-xs text-amber-200/60 text-center italic">
              Hover over houses or click planet badges on the D3 chart to inspect degrees, nakshatras, and planetary aspects.
            </div>
          )}

          {/* Planets Mini Grid */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-amber-300/80 uppercase tracking-wider">
              Chart Planets ({planets.length})
            </span>

            <div className="grid grid-cols-3 gap-2">
              {planets.map((p) => (
                <button
                  key={p.name}
                  onClick={() => setSelectedPlanetForAspect(selectedPlanetForAspect?.name === p.name ? null : p)}
                  className={`p-2 rounded-xl border text-left transition-all text-xs ${
                    selectedPlanetForAspect?.name === p.name
                      ? "bg-amber-500 text-slate-950 font-bold border-amber-300 shadow-md"
                      : "bg-slate-950 text-amber-100 border-amber-500/20 hover:border-amber-400"
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>{p.name.substring(0, 3)}</span>
                    {p.isRetrograde && <span className="text-[9px] text-rose-400">R</span>}
                  </div>
                  <div className="text-[10px] opacity-70">{p.sign.substring(0, 3)} • H{p.house}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
