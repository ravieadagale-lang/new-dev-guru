import React, { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";
import { 
  Sparkles, 
  Calendar, 
  Plus, 
  Clock, 
  Zap, 
  ShieldCheck, 
  HelpCircle, 
  ChevronRight, 
  Trash2, 
  Edit3, 
  Info, 
  Briefcase, 
  Heart, 
  GraduationCap, 
  Home, 
  Compass, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  Layers,
  ZoomIn,
  RefreshCw,
  X
} from "lucide-react";
import { UserProfile } from "../types";
import { calculateVimshottariTimeline, VimshottariPeriod } from "../utils/vedicAstronomicalEngine";

interface D3DashaTimelineVisualizerProps {
  userProfile: UserProfile;
  onSelectTab?: (tab: string) => void;
}

export interface PersonalLifeEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  category: "Career" | "Relationship" | "Health" | "Finance" | "Education" | "Spiritual" | "Travel";
  notes?: string;
}

const PLANET_COLORS: Record<string, { bg: string; border: string; text: string; fill: string }> = {
  Sun: { bg: "#FEF3C7", border: "#F59E0B", text: "#92400E", fill: "#EAB308" },
  Moon: { bg: "#E0F2FE", border: "#38BDF8", text: "#075985", fill: "#38BDF8" },
  Mars: { bg: "#FEE2E2", border: "#EF4444", text: "#991B1B", fill: "#EF4444" },
  Rahu: { bg: "#F3E8FF", border: "#A855F7", text: "#6B21A8", fill: "#8B5CF6" },
  Jupiter: { bg: "#FEF9C3", border: "#EAB308", text: "#854D0E", fill: "#F59E0B" },
  Saturn: { bg: "#DBEAFE", border: "#3B82F6", text: "#1E40AF", fill: "#2563EB" },
  Mercury: { bg: "#D1FAE5", border: "#10B981", text: "#065F46", fill: "#10B981" },
  Ketu: { bg: "#F1F5F9", border: "#64748B", text: "#334155", fill: "#64748B" },
  Venus: { bg: "#FCE7F3", border: "#EC4899", text: "#9D174D", fill: "#EC4899" },
};

const CATEGORY_ICONS: Record<string, string> = {
  Career: "💼",
  Relationship: "❤️",
  Health: "🩺",
  Finance: "💰",
  Education: "🎓",
  Spiritual: "📿",
  Travel: "✈️"
};

export const D3DashaTimelineVisualizer: React.FC<D3DashaTimelineVisualizerProps> = ({
  userProfile,
  onSelectTab,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const dob = userProfile.dob || "1995-08-15";
  const nakshatra = userProfile.nakshatra || "Rohini";
  const birthYear = useMemo(() => new Date(dob).getFullYear(), [dob]);

  // Initial Default Life Events based on DOB
  const initialEvents: PersonalLifeEvent[] = useMemo(() => [
    {
      id: "ev-1",
      title: "Higher Education / Graduation",
      date: `${birthYear + 22}-06-15`,
      category: "Education",
      notes: "Completed university degree with distinction."
    },
    {
      id: "ev-2",
      title: "First Major Career Role",
      date: `${birthYear + 23}-09-01`,
      category: "Career",
      notes: "Landed senior professional role with strong leadership trajectory."
    },
    {
      id: "ev-3",
      title: "Marriage / Life Partnership",
      date: `${birthYear + 27}-11-20`,
      category: "Relationship",
      notes: "Auspicious spousal union & domestic establishment."
    },
    {
      id: "ev-4",
      title: "Real Estate Property Purchase",
      date: `${birthYear + 29}-03-10`,
      category: "Finance",
      notes: "Acquired first residential property asset."
    }
  ], [birthYear]);

  const [lifeEvents, setLifeEvents] = useState<PersonalLifeEvent[]>(initialEvents);
  const [viewWindow, setViewWindow] = useState<"120yr" | "mahadasha" | "5yr">("120yr");
  const [selectedPeriod, setSelectedPeriod] = useState<VimshottariPeriod | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<PersonalLifeEvent | null>(null);

  // Add Event Modal State
  const [isAddEventOpen, setIsAddEventOpen] = useState<boolean>(false);
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [newEventDate, setNewEventDate] = useState<string>(`${new Date().getFullYear()}-01-01`);
  const [newEventCategory, setNewEventCategory] = useState<PersonalLifeEvent["category"]>("Career");
  const [newEventNotes, setNewEventNotes] = useState<string>("");

  // Calculate Vimshottari Timeline
  const dashaTimeline = useMemo(() => {
    return calculateVimshottariTimeline(dob, nakshatra);
  }, [dob, nakshatra]);

  // Current Running Period
  const currentRunningPeriod = useMemo(() => {
    return dashaTimeline.find((p) => p.isCurrent) || dashaTimeline[0];
  }, [dashaTimeline]);

  // Active Selected Period (defaults to current running period if none explicitly selected)
  const activePeriod = selectedPeriod || currentRunningPeriod;

  // Group periods into Mahadashas
  const mahadashaGroups = useMemo(() => {
    const groups: Record<string, VimshottariPeriod[]> = {};
    dashaTimeline.forEach((p) => {
      if (!groups[p.mahadashaLord]) {
        groups[p.mahadashaLord] = [];
      }
      groups[p.mahadashaLord].push(p);
    });
    return groups;
  }, [dashaTimeline]);

  // Generate Mahadasha Summary Ranges
  const mahadashaRanges = useMemo(() => {
    return (Object.entries(mahadashaGroups) as [string, VimshottariPeriod[]][]).map(([lord, periods]) => {
      const startYr = parseInt(periods[0].startDate.split("-")[0]);
      const endYr = parseInt(periods[periods.length - 1].endDate.split("-")[0]);
      const isCurrentM = periods.some(p => p.isCurrent);
      return {
        lord,
        startYr,
        endYr,
        periods,
        isCurrentM
      };
    });
  }, [mahadashaGroups]);

  // Current Year & Date
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  // Handle Add Life Event
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    const newEv: PersonalLifeEvent = {
      id: `ev-${Date.now()}`,
      title: newEventTitle.trim(),
      date: newEventDate,
      category: newEventCategory,
      notes: newEventNotes.trim()
    };

    setLifeEvents(prev => [...prev, newEv]);
    setNewEventTitle("");
    setNewEventNotes("");
    setIsAddEventOpen(false);
  };

  const handleDeleteEvent = (id: string) => {
    setLifeEvents(prev => prev.filter(e => e.id !== id));
    if (selectedEvent?.id === id) setSelectedEvent(null);
  };

  // Find Dasha running on a given event date
  const getDashaForDate = (dateStr: string) => {
    const evYear = new Date(dateStr).getFullYear();
    const period = dashaTimeline.find(p => {
      const sY = parseInt(p.startDate.split("-")[0]);
      const eY = parseInt(p.endDate.split("-")[0]);
      return evYear >= sY && evYear <= eY;
    });
    return period || dashaTimeline[0];
  };

  // Compute Pratyantardashas (sub-sub periods) for active period
  const pratyantardashas = useMemo(() => {
    if (!activePeriod) return [];
    const lords = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"];
    const startIdx = lords.indexOf(activePeriod.antardashaLord);

    const sDate = new Date(activePeriod.startDate);
    const eDate = new Date(activePeriod.endDate);
    const totalDays = Math.max(1, (eDate.getTime() - sDate.getTime()) / (1000 * 3600 * 24));

    let currentStart = new Date(sDate);
    const result = [];

    for (let i = 0; i < 9; i++) {
      const pLord = lords[(startIdx + i) % 9];
      const fractionDays = (totalDays / 9);
      const subEnd = new Date(currentStart.getTime() + fractionDays * 86400000);

      const isSubCurrent = currentDate >= currentStart && currentDate <= subEnd;

      result.push({
        pratyantardashaLord: pLord,
        startDateStr: currentStart.toISOString().split("T")[0],
        endDateStr: subEnd.toISOString().split("T")[0],
        isCurrent: isSubCurrent
      });

      currentStart = subEnd;
    }

    return result;
  }, [activePeriod, currentDate]);

  // Calculate % progress of active period
  const activePeriodProgress = useMemo(() => {
    if (!activePeriod) return 0;
    const sDate = new Date(activePeriod.startDate).getTime();
    const eDate = new Date(activePeriod.endDate).getTime();
    const now = currentDate.getTime();
    if (now < sDate) return 0;
    if (now > eDate) return 100;
    return Math.round(((now - sDate) / (eDate - sDate)) * 100);
  }, [activePeriod, currentDate]);

  // Render D3 Interactive SVG Chart
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const height = 340;
    const margin = { top: 40, right: 30, bottom: 50, left: 30 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`);

    // Time domain depending on viewWindow
    let minYear = birthYear;
    let maxYear = birthYear + 120;

    if (viewWindow === "mahadasha" && activePeriod) {
      const mRange = mahadashaRanges.find(m => m.lord === activePeriod.mahadashaLord);
      if (mRange) {
        minYear = Math.max(birthYear, mRange.startYr - 1);
        maxYear = mRange.endYr + 1;
      }
    } else if (viewWindow === "5yr") {
      minYear = Math.max(birthYear, currentYear - 2);
      maxYear = currentYear + 3;
    }

    const xScale = d3.scaleLinear()
      .domain([minYear, maxYear])
      .range([margin.left, width - margin.right]);

    const g = svg.append("g");

    // Grid lines for years
    const yearStep = viewWindow === "5yr" ? 1 : viewWindow === "mahadasha" ? 2 : 10;
    const yearTicks = d3.range(minYear, maxYear + 1, yearStep);

    g.append("g")
      .attr("class", "grid")
      .selectAll("line")
      .data(yearTicks)
      .enter()
      .append("line")
      .attr("x1", d => xScale(d))
      .attr("x2", d => xScale(d))
      .attr("y1", margin.top)
      .attr("y2", height - margin.bottom)
      .attr("stroke", "#E2E8F0")
      .attr("stroke-dasharray", "3,3")
      .attr("stroke-width", 1);

    // X-Axis Labels
    const xAxisGroup = g.append("g")
      .attr("transform", `translate(0, ${height - margin.bottom + 10})`);

    xAxisGroup.selectAll("text")
      .data(yearTicks)
      .enter()
      .append("text")
      .attr("x", d => xScale(d))
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("font-weight", "600")
      .attr("fill", "#64748B")
      .text(d => d.toString());

    // TRACK 1: MAHADASHA LANE (Y: 50 - 90)
    const mBarY = 50;
    const mBarH = 40;

    const mGroup = g.append("g").attr("class", "mahadashas");

    mahadashaRanges.forEach(m => {
      const x1 = xScale(m.startYr);
      const x2 = xScale(m.endYr);
      const barW = Math.max(4, x2 - x1);

      if (x2 < margin.left || x1 > width - margin.right) return;

      const colors = PLANET_COLORS[m.lord] || PLANET_COLORS["Jupiter"];
      const isSelected = activePeriod?.mahadashaLord === m.lord;

      const rect = mGroup.append("rect")
        .attr("x", x1 + 1)
        .attr("y", mBarY)
        .attr("width", barW - 2)
        .attr("height", mBarH)
        .attr("rx", 8)
        .attr("fill", colors.fill)
        .attr("fill-opacity", isSelected ? 0.95 : 0.65)
        .attr("stroke", isSelected ? "#0F172A" : colors.border)
        .attr("stroke-width", isSelected ? 2.5 : 1)
        .attr("cursor", "pointer")
        .style("transition", "all 0.2s");

      rect.on("click", () => {
        const firstP = m.periods.find(p => p.isCurrent) || m.periods[0];
        setSelectedPeriod(firstP);
      });

      // Label if wide enough
      if (barW > 35) {
        mGroup.append("text")
          .attr("x", x1 + barW / 2)
          .attr("y", mBarY + 22)
          .attr("text-anchor", "middle")
          .attr("font-size", barW > 60 ? "11px" : "9px")
          .attr("font-weight", "bold")
          .attr("fill", "#FFFFFF")
          .attr("pointer-events", "none")
          .text(barW > 60 ? `${m.lord} M.` : m.lord.substring(0, 3));
      }
    });

    // TRACK 2: ANTARDASHA LANE (Y: 110 - 150)
    const aBarY = 110;
    const aBarH = 35;

    const aGroup = g.append("g").attr("class", "antardashas");

    dashaTimeline.forEach(p => {
      const sY = parseInt(p.startDate.split("-")[0]);
      const eY = parseInt(p.endDate.split("-")[0]);

      const x1 = xScale(sY);
      const x2 = xScale(eY);
      const barW = Math.max(2, x2 - x1);

      if (x2 < margin.left || x1 > width - margin.right) return;

      const colors = PLANET_COLORS[p.antardashaLord] || PLANET_COLORS["Mercury"];
      const isSelected = activePeriod?.mahadashaLord === p.mahadashaLord && activePeriod?.antardashaLord === p.antardashaLord;

      const rect = aGroup.append("rect")
        .attr("x", x1 + 0.5)
        .attr("y", aBarY)
        .attr("width", barW - 1)
        .attr("height", aBarH)
        .attr("rx", 5)
        .attr("fill", colors.fill)
        .attr("fill-opacity", isSelected ? 1 : p.isCurrent ? 0.85 : 0.45)
        .attr("stroke", isSelected ? "#0F172A" : p.isCurrent ? "#D97706" : colors.border)
        .attr("stroke-width", isSelected ? 2.5 : p.isCurrent ? 2 : 0.5)
        .attr("cursor", "pointer");

      rect.on("click", () => {
        setSelectedPeriod(p);
      });

      if (barW > 24) {
        aGroup.append("text")
          .attr("x", x1 + barW / 2)
          .attr("y", aBarY + 20)
          .attr("text-anchor", "middle")
          .attr("font-size", barW > 45 ? "10px" : "8px")
          .attr("font-weight", "600")
          .attr("fill", "#FFFFFF")
          .attr("pointer-events", "none")
          .text(p.antardashaLord.substring(0, 3));
      }
    });

    // TRACK 3: PERSONAL LIFE EVENTS TRACK (Y: 175 - 240)
    const eTrackY = 175;
    const eGroup = g.append("g").attr("class", "life-events");

    // Event track baseline
    eGroup.append("line")
      .attr("x1", margin.left)
      .attr("x2", width - margin.right)
      .attr("y1", eTrackY + 20)
      .attr("y2", eTrackY + 20)
      .attr("stroke", "#CBD5E1")
      .attr("stroke-width", 1.5);

    lifeEvents.forEach(ev => {
      const evDate = new Date(ev.date);
      const evYr = evDate.getFullYear() + (evDate.getMonth() / 12);
      const xPos = xScale(evYr);

      if (xPos < margin.left || xPos > width - margin.right) return;

      const isSelected = selectedEvent?.id === ev.id;
      const icon = CATEGORY_ICONS[ev.category] || "📌";

      // Vertical connector pin
      eGroup.append("line")
        .attr("x1", xPos)
        .attr("x2", xPos)
        .attr("y1", eBarY => aBarY + aBarH)
        .attr("y2", eTrackY + 20)
        .attr("stroke", isSelected ? "#D97706" : "#94A3B8")
        .attr("stroke-dasharray", "2,2")
        .attr("stroke-width", isSelected ? 2 : 1);

      // Event Pin Circle
      const pinG = eGroup.append("g")
        .attr("transform", `translate(${xPos}, ${eTrackY + 20})`)
        .attr("cursor", "pointer");

      pinG.append("circle")
        .attr("r", isSelected ? 16 : 13)
        .attr("fill", isSelected ? "#FEF3C7" : "#FFFFFF")
        .attr("stroke", isSelected ? "#D97706" : "#475569")
        .attr("stroke-width", isSelected ? 2.5 : 1.5)
        .attr("filter", "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))");

      pinG.append("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-size", isSelected ? "12px" : "10px")
        .text(icon);

      pinG.on("click", () => {
        setSelectedEvent(ev);
        const matchP = getDashaForDate(ev.date);
        setSelectedPeriod(matchP);
      });
    });

    // NOW / TODAY INDICATOR LINE
    const todayYr = currentYear + (currentDate.getMonth() / 12);
    const todayX = xScale(todayYr);

    if (todayX >= margin.left && todayX <= width - margin.right) {
      const todayGroup = g.append("g").attr("class", "today-marker");

      todayGroup.append("line")
        .attr("x1", todayX)
        .attr("x2", todayX)
        .attr("y1", 20)
        .attr("y2", height - margin.bottom)
        .attr("stroke", "#EF4444")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "4,2");

      // Badge top
      const badgeG = todayGroup.append("g")
        .attr("transform", `translate(${todayX}, 20)`);

      badgeG.append("rect")
        .attr("x", -24)
        .attr("y", -14)
        .attr("width", 48)
        .attr("height", 18)
        .attr("rx", 9)
        .attr("fill", "#EF4444");

      badgeG.append("text")
        .attr("x", 0)
        .attr("y", -2)
        .attr("text-anchor", "middle")
        .attr("font-size", "9px")
        .attr("font-weight", "bold")
        .attr("fill", "#FFFFFF")
        .text("NOW");
    }

  }, [viewWindow, mahadashaRanges, dashaTimeline, lifeEvents, activePeriod, selectedEvent, birthYear, currentYear]);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-sm space-y-8 animate-in fade-in">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Parashari Astronomical Vimshottari Engine
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Interactive Mahadasha & Life Events Timeline
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            D3.js precision mapping of your 120-year planetary cycles (Mahadasha & Antardasha) aligned against your actual personal life milestones for clinical karmic analysis.
          </p>
        </div>

        {/* CONTROLS & ADD EVENT BUTTON */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold flex gap-1">
            <button
              onClick={() => setViewWindow("120yr")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewWindow === "120yr" ? "bg-slate-950 text-amber-300 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              120-Yr Overview
            </button>
            <button
              onClick={() => setViewWindow("mahadasha")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewWindow === "mahadasha" ? "bg-slate-950 text-amber-300 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Current Mahadasha
            </button>
            <button
              onClick={() => setViewWindow("5yr")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewWindow === "5yr" ? "bg-slate-950 text-amber-300 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              5-Yr Window
            </button>
          </div>

          <button
            onClick={() => setIsAddEventOpen(true)}
            className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Map Personal Life Event</span>
          </button>
        </div>
      </div>

      {/* D3 TIMELINE CANVAS CONTAINER */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-amber-500 inline-block" />
              <span>Mahadasha Track (Major Cycle)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-sky-500 inline-block" />
              <span>Antardasha Track (Sub Cycle)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-800 border border-amber-400 inline-block" />
              <span>Life Event Pins</span>
            </span>
          </div>

          <div className="text-[11px] text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            Click any bar segment or event pin to inspect karmic period
          </div>
        </div>

        <div 
          ref={containerRef} 
          className="w-full bg-slate-950/5 p-4 rounded-3xl border border-slate-200/80 overflow-hidden relative shadow-inner"
        >
          <svg ref={svgRef} className="w-full h-auto overflow-visible" />
        </div>
      </div>

      {/* MODAL: ADD LIFE EVENT */}
      {isAddEventOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-amber-900/10 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 font-serif text-lg font-bold text-slate-900">
                <Calendar className="w-5 h-5 text-amber-600" />
                <span>Map Personal Life Event</span>
              </div>
              <button 
                onClick={() => setIsAddEventOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Event Name / Milestone</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Executive Promotion, Wedding, Move to UK"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Date / Year</label>
                  <input
                    type="date"
                    required
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Category</label>
                  <select
                    value={newEventCategory}
                    onChange={(e) => setNewEventCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 font-medium"
                  >
                    <option value="Career">💼 Career & Business</option>
                    <option value="Relationship">❤️ Relationship / Marriage</option>
                    <option value="Health">🩺 Health & Vitality</option>
                    <option value="Finance">💰 Financial Investment</option>
                    <option value="Education">🎓 Education & Degree</option>
                    <option value="Spiritual">📿 Spiritual Initiation</option>
                    <option value="Travel">✈️ Travel / Relocation</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Personal Notes / Context</label>
                <textarea
                  rows={3}
                  placeholder="Details about what occurred during this life event..."
                  value={newEventNotes}
                  onChange={(e) => setNewEventNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 font-medium resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddEventOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400"
                >
                  Save Event Pin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CLINICAL KARMIC PERIOD INSIGHTS PANEL */}
      {activePeriod && (
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-amber-100 p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Selected Karmic Cycle Analysis
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-200">
                {activePeriod.mahadashaLord} Mahadasha — {activePeriod.antardashaLord} Antardasha
              </h3>
              <p className="text-xs text-amber-200/70 mt-1">
                Cycle Period: <span className="text-amber-300 font-bold">{activePeriod.startDate}</span> to <span className="text-amber-300 font-bold">{activePeriod.endDate}</span>
                {activePeriod.isCurrent && (
                  <span className="ml-3 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] uppercase">
                    Active Current Period ({activePeriodProgress}% Elapsed)
                  </span>
                )}
              </p>
            </div>

            {/* Quick Action Button */}
            {onSelectTab && (
              <button
                onClick={() => onSelectTab("remedies")}
                className="px-4 py-2.5 bg-amber-500/20 border border-amber-400/40 text-amber-200 font-bold text-xs rounded-2xl hover:bg-amber-500/30 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>View Remedial Mantras</span>
              </button>
            )}
          </div>

          {/* PROGRESS BAR FOR ACTIVE PERIOD */}
          {activePeriod.isCurrent && (
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-amber-300 font-semibold">
                <span>Cycle Start: {activePeriod.startDate}</span>
                <span>{activePeriodProgress}% Completed</span>
                <span>Cycle Completion: {activePeriod.endDate}</span>
              </div>
              <div className="w-full bg-amber-950/80 h-2.5 rounded-full overflow-hidden border border-amber-500/30">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${activePeriodProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* 3-COLUMN CLINICAL BREAKDOWN */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* COLUMN 1: PLANETARY ALCHEMY & PSYCHOLOGY */}
            <div className="bg-amber-900/20 p-5 rounded-2xl border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-2 font-serif font-bold text-amber-300 text-sm">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Psychological & Karmic Force</span>
              </div>
              <p className="text-amber-100/90 leading-relaxed font-sans">
                {activePeriod.prediction}
              </p>
              <div className="pt-2 border-t border-amber-500/20 text-[11px] text-amber-200/70">
                <span className="font-bold text-amber-300">Ruling Archetype:</span> {activePeriod.mahadashaLord} governs long-term destiny, while {activePeriod.antardashaLord} executes tactical events.
              </div>
            </div>

            {/* COLUMN 2: FIVE KEY FOCUS AREAS */}
            <div className="bg-amber-900/20 p-5 rounded-2xl border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-2 font-serif font-bold text-amber-300 text-sm">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Karmic Focus Vector</span>
              </div>
              <div className="space-y-1.5 pt-1">
                {[
                  { label: "Career & Authority", score: activePeriod.mahadashaLord === "Sun" || activePeriod.mahadashaLord === "Jupiter" ? "Exalted Gains" : "Steady Growth" },
                  { label: "Financial Liquidity", score: activePeriod.antardashaLord === "Venus" || activePeriod.antardashaLord === "Mercury" ? "High Inflow" : "Balanced" },
                  { label: "Emotional Stability", score: activePeriod.mahadashaLord === "Moon" ? "High Intuition" : "Requires Discipline" },
                  { label: "Health & Stamina", score: activePeriod.mahadashaLord === "Saturn" ? "Vigilance Needed" : "Robust Energy" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[11px] pb-1 border-b border-amber-500/10">
                    <span className="text-amber-200/80">{item.label}</span>
                    <span className="font-bold text-amber-300">{item.score}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* COLUMN 3: CLINICAL REMEDY & ACTION */}
            <div className="bg-amber-900/20 p-5 rounded-2xl border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-2 font-serif font-bold text-amber-300 text-sm">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Prescribed Behavioral Alignment</span>
              </div>
              <p className="text-amber-100/90 leading-relaxed font-sans">
                {activePeriod.remedy}
              </p>
              <div className="pt-2 border-t border-amber-500/20 text-[11px] text-amber-200/70">
                <span className="font-bold text-amber-300">Strategy:</span> Align decision-making with {activePeriod.antardashaLord}'s natural qualities to minimize friction.
              </div>
            </div>
          </div>

          {/* SUB-SUB PERIOD (PRATYANTARDASHA) BREAKDOWN TABLE */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-serif font-bold text-amber-200 text-sm">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Pratyantardasha (Sub-Sub Cycle Breakdown) for {activePeriod.antardashaLord} Period</span>
              </div>
              <span className="text-[10px] text-amber-300/70">Fine 9-Sub-Period Timing</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
              {pratyantardashas.map((sub, idx) => {
                const subColors = PLANET_COLORS[sub.pratyantardashaLord] || PLANET_COLORS["Sun"];
                return (
                  <div 
                    key={idx}
                    className={`p-2.5 rounded-2xl border text-center transition-all ${
                      sub.isCurrent 
                        ? "bg-amber-500/30 border-amber-400 text-amber-100 shadow-md ring-1 ring-amber-400/50" 
                        : "bg-slate-900/80 border-amber-500/20 text-amber-200/70"
                    }`}
                  >
                    <div className="font-serif font-bold text-xs text-amber-300 flex items-center justify-center gap-1">
                      <span>{sub.pratyantardashaLord}</span>
                      {sub.isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />}
                    </div>
                    <div className="text-[9px] text-amber-200/60 mt-1">
                      {sub.startDateStr.substring(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MAPPED PERSONAL EVENTS ALIGNMENT AUDIT */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-t border-amber-500/20 pt-4">
              <div className="flex items-center gap-2 font-serif font-bold text-amber-200 text-sm">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Personal Life Events Synchronization Audit</span>
              </div>
              <span className="text-[10px] text-amber-300/70">{lifeEvents.length} Life Milestones Mapped</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lifeEvents.map((ev) => {
                const matchDasha = getDashaForDate(ev.date);
                const icon = CATEGORY_ICONS[ev.category] || "📌";
                const isSelected = selectedEvent?.id === ev.id;

                return (
                  <div
                    key={ev.id}
                    onClick={() => {
                      setSelectedEvent(ev);
                      setSelectedPeriod(matchDasha);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex justify-between items-start gap-3 ${
                      isSelected
                        ? "bg-amber-900/40 border-amber-400 shadow-md"
                        : "bg-amber-950/20 border-amber-500/20 hover:border-amber-500/40"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{icon}</span>
                        <span className="font-serif font-bold text-xs text-amber-200">{ev.title}</span>
                      </div>
                      <p className="text-[11px] text-amber-100/80 leading-snug">
                        {ev.notes || "No notes provided."}
                      </p>
                      <div className="text-[10px] text-amber-300/80 font-medium pt-1">
                        Occurred during: <span className="font-bold text-amber-200">{matchDasha.mahadashaLord} / {matchDasha.antardashaLord} Dasha</span> ({ev.date})
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteEvent(ev.id);
                      }}
                      className="p-1 rounded-lg text-amber-400/40 hover:text-rose-400 transition-colors"
                      title="Delete event pin"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
