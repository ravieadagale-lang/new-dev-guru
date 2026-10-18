import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  Upload,
  Compass,
  Layers,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  Trash2,
  Plus,
  Shield,
  Sliders,
  Sparkles,
  RefreshCw,
  FileDown,
  Info,
  ChevronRight,
  HelpCircle,
  Move,
  ArrowUpDown,
  ArrowLeftRight
} from "lucide-react";
import {
  PlacedRoomItem,
  RoomCategory,
  SampleFloorPlanPreset,
  MahaVastuZone,
  DevataPada
} from "../../types/vastuTypes";
import {
  MAHAVASTU_16_ZONES,
  DEVATA_32_PADAS,
  calculatePointAzimuth,
  getMahaVastuZoneByAngle,
  getDevataPadaByAngle,
  evaluateRoomPlacement,
  calculateOverallVastuScore
} from "../../engine/vastu/vastuEngine";
import { BAGUA_PALACES, MOUNTAINS_24 } from "../../engine/vastu/fengShuiEngine";

// Sample Blueprints with realistic architectural room layouts
export const SAMPLE_FLOOR_PLANS: SampleFloorPlanPreset[] = [
  {
    id: "2bhk_urban",
    title: "2 BHK Urban Apartment (North Facing)",
    subtitle: "Modern residential layout with balcony and dual bathrooms",
    dimensions: "36 ft × 32 ft",
    areaSqFt: 1152,
    facing: "North",
    defaultNorthOffset: 0,
    defaultRooms: [
      { category: "entrance", label: "Main Door (N3 Mukhya)", xPct: 50, yPct: 12, distanceFromCenterPct: 38, angleDeg: 0 },
      { category: "mandir_puja", label: "Puja Corner", xPct: 78, yPct: 22, distanceFromCenterPct: 38, angleDeg: 45 },
      { category: "kitchen", label: "Modular Kitchen", xPct: 82, yPct: 78, distanceFromCenterPct: 42, angleDeg: 135 },
      { category: "master_bedroom", label: "Master Bedroom", xPct: 22, yPct: 80, distanceFromCenterPct: 40, angleDeg: 225 },
      { category: "toilet", label: "Common Toilet (WNW)", xPct: 18, yPct: 40, distanceFromCenterPct: 34, angleDeg: 292 },
      { category: "living_room", label: "Spacious Living Room", xPct: 52, yPct: 48, distanceFromCenterPct: 5, angleDeg: 90 },
      { category: "cash_locker", label: "Financial Safe (North)", xPct: 45, yPct: 25, distanceFromCenterPct: 26, angleDeg: 350 }
    ],
    svgBlueprint: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- Exterior Wall -->
      <rect x="100" y="50" width="600" height="500" rx="8" fill="#f8fafc" stroke="#334155" stroke-width="8" />
      <!-- Interior Partition Walls -->
      <line x1="450" y1="50" x2="450" y2="350" stroke="#64748b" stroke-width="4" />
      <line x1="100" y1="350" x2="700" y2="350" stroke="#64748b" stroke-width="4" />
      <line x1="400" y1="350" x2="400" y2="550" stroke="#64748b" stroke-width="4" />
      <line x1="280" y1="50" x2="280" y2="220" stroke="#64748b" stroke-width="4" />
      <line x1="100" y1="220" x2="280" y2="220" stroke="#64748b" stroke-width="4" />
      <!-- Doors & Openings -->
      <rect x="360" y="46" width="70" height="12" fill="#38bdf8" />
      <path d="M 360 50 A 60 60 0 0 1 420 110" fill="none" stroke="#0284c7" stroke-dasharray="4" stroke-width="2" />
      <!-- Room Labels -->
      <text x="560" y="200" font-family="sans-serif" font-size="16" font-weight="bold" fill="#64748b" text-anchor="middle">LIVING & DINING</text>
      <text x="180" y="140" font-family="sans-serif" font-size="14" font-weight="bold" fill="#64748b" text-anchor="middle">TOILET 1</text>
      <text x="360" y="180" font-family="sans-serif" font-size="14" font-weight="bold" fill="#64748b" text-anchor="middle">FOYER</text>
      <text x="240" y="460" font-family="sans-serif" font-size="16" font-weight="bold" fill="#64748b" text-anchor="middle">MASTER BEDROOM</text>
      <text x="560" y="460" font-family="sans-serif" font-size="16" font-weight="bold" fill="#64748b" text-anchor="middle">KITCHEN & UTILITY</text>
      <!-- Balcony -->
      <rect x="700" y="120" width="40" height="180" fill="#e2e8f0" stroke="#64748b" stroke-dasharray="4" />
      <text x="720" y="210" font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle" transform="rotate(90 720 210)">BALCONY</text>
    </svg>`
  },
  {
    id: "3bhk_villa",
    title: "3 BHK Luxury Villa / Duplex (East Facing)",
    subtitle: "Spacious independent bungalow with central courtyard & double-car garage",
    dimensions: "50 ft × 48 ft",
    areaSqFt: 2400,
    facing: "East",
    defaultNorthOffset: 90,
    defaultRooms: [
      { category: "entrance", label: "Royal East Gate (E3 Jayanta)", xPct: 88, yPct: 48, distanceFromCenterPct: 40, angleDeg: 90 },
      { category: "mandir_puja", label: "Northeast Marble Temple", xPct: 82, yPct: 18, distanceFromCenterPct: 44, angleDeg: 45 },
      { category: "kitchen", label: "Chef Kitchen (Agneya)", xPct: 80, yPct: 82, distanceFromCenterPct: 44, angleDeg: 135 },
      { category: "master_bedroom", label: "Head of House Bedroom", xPct: 18, yPct: 82, distanceFromCenterPct: 45, angleDeg: 225 },
      { category: "children_bedroom", label: "Kids Study Bedroom (WSW)", xPct: 18, yPct: 52, distanceFromCenterPct: 35, angleDeg: 250 },
      { category: "toilet", label: "SSW Powder Room", xPct: 40, yPct: 82, distanceFromCenterPct: 35, angleDeg: 200 },
      { category: "water_tank_ug", label: "Underground Sump (NE)", xPct: 75, yPct: 15, distanceFromCenterPct: 42, angleDeg: 40 }
    ],
    svgBlueprint: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect x="80" y="40" width="640" height="520" rx="10" fill="#f8fafc" stroke="#1e293b" stroke-width="8" />
      <!-- Central Courtyard / Brahmasthan open to sky -->
      <rect x="340" y="240" width="120" height="120" rx="6" fill="#fef08a" stroke="#ca8a04" stroke-width="3" stroke-dasharray="6" opacity="0.6" />
      <text x="400" y="305" font-family="sans-serif" font-size="13" font-weight="bold" fill="#854d0e" text-anchor="middle">BRAHMASTHAN</text>
      <!-- Partitions -->
      <line x1="80" y1="200" x2="340" y2="200" stroke="#475569" stroke-width="4" />
      <line x1="460" y1="200" x2="720" y2="200" stroke="#475569" stroke-width="4" />
      <line x1="80" y1="400" x2="340" y2="400" stroke="#475569" stroke-width="4" />
      <line x1="460" y1="400" x2="720" y2="400" stroke="#475569" stroke-width="4" />
      <line x1="340" y1="40" x2="340" y2="240" stroke="#475569" stroke-width="4" />
      <line x1="460" y1="40" x2="460" y2="240" stroke="#475569" stroke-width="4" />
      <!-- East Gate -->
      <rect x="714" y="260" width="12" height="80" fill="#10b981" />
      <!-- Labels -->
      <text x="600" y="120" font-family="sans-serif" font-size="15" font-weight="bold" fill="#64748b" text-anchor="middle">PUJA & DRAWING</text>
      <text x="600" y="490" font-family="sans-serif" font-size="15" font-weight="bold" fill="#64748b" text-anchor="middle">KITCHEN & DINING</text>
      <text x="200" y="490" font-family="sans-serif" font-size="15" font-weight="bold" fill="#64748b" text-anchor="middle">MASTER SUITE</text>
      <text x="200" y="120" font-family="sans-serif" font-size="15" font-weight="bold" fill="#64748b" text-anchor="middle">GUEST & CAR GARAGE</text>
      <text x="200" y="310" font-family="sans-serif" font-size="14" font-weight="bold" fill="#64748b" text-anchor="middle">KIDS BEDROOM</text>
    </svg>`
  },
  {
    id: "office_commercial",
    title: "Corporate Tech Office & Executive Suite (West Facing)",
    subtitle: "Commercial floor plan with CEO cabin, finance locker, reception, & workstations",
    dimensions: "60 ft × 45 ft",
    areaSqFt: 2700,
    facing: "West",
    defaultNorthOffset: 270,
    defaultRooms: [
      { category: "entrance", label: "Main Office Entrance (West W3)", xPct: 12, yPct: 48, distanceFromCenterPct: 40, angleDeg: 270 },
      { category: "master_bedroom", label: "Managing Director Cabin (SW)", xPct: 18, yPct: 80, distanceFromCenterPct: 42, angleDeg: 225 },
      { category: "cash_locker", label: "Accounts & Safe (North)", xPct: 50, yPct: 18, distanceFromCenterPct: 35, angleDeg: 0 },
      { category: "living_room", label: "Open Workstation Hub (East)", xPct: 78, yPct: 50, distanceFromCenterPct: 32, angleDeg: 90 },
      { category: "kitchen", label: "Pantry & Coffee Bar (SE)", xPct: 80, yPct: 80, distanceFromCenterPct: 42, angleDeg: 135 },
      { category: "toilet", label: "Restroom Block (WNW)", xPct: 22, yPct: 28, distanceFromCenterPct: 34, angleDeg: 295 }
    ],
    svgBlueprint: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect x="70" y="50" width="660" height="500" rx="6" fill="#f8fafc" stroke="#0f172a" stroke-width="8" />
      <line x1="280" y1="50" x2="280" y2="550" stroke="#64748b" stroke-width="4" />
      <line x1="70" y1="360" x2="280" y2="360" stroke="#64748b" stroke-width="4" />
      <line x1="70" y1="200" x2="280" y2="200" stroke="#64748b" stroke-width="4" />
      <line x1="520" y1="50" x2="520" y2="280" stroke="#64748b" stroke-width="4" />
      <line x1="520" y1="380" x2="730" y2="380" stroke="#64748b" stroke-width="4" />
      <!-- West Entrance -->
      <rect x="64" y="240" width="12" height="80" fill="#475569" />
      <text x="175" y="470" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">MD / CEO CABIN</text>
      <text x="175" y="290" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">RECEPTION</text>
      <text x="175" y="130" font-family="sans-serif" font-size="13" font-weight="bold" fill="#475569" text-anchor="middle">RESTROOMS</text>
      <text x="400" y="320" font-family="sans-serif" font-size="16" font-weight="bold" fill="#475569" text-anchor="middle">DEVELOPER WORKSTATIONS</text>
      <text x="620" y="170" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">CONFERENCE ROOM</text>
      <text x="620" y="470" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">PANTRY & BREAKOUT</text>
    </svg>`
  }
];

const ROOM_CATEGORIES: { id: RoomCategory; name: string; icon: string; defaultColor: string }[] = [
  { id: "entrance", name: "Main Entrance Gate", icon: "🚪", defaultColor: "bg-emerald-600" },
  { id: "kitchen", name: "Kitchen / Cooktop", icon: "🔥", defaultColor: "bg-rose-600" },
  { id: "master_bedroom", name: "Master Bedroom", icon: "🛏️", defaultColor: "bg-amber-700" },
  { id: "mandir_puja", name: "Mandir / Puja Room", icon: "🪔", defaultColor: "bg-sky-600" },
  { id: "toilet", name: "Toilet / Commode", icon: "🚽", defaultColor: "bg-slate-700" },
  { id: "living_room", name: "Living / Drawing Room", icon: "🛋️", defaultColor: "bg-indigo-600" },
  { id: "study_room", name: "Study / Work Desk", icon: "📚", defaultColor: "bg-teal-600" },
  { id: "cash_locker", name: "Cash Locker / Safe", icon: "💰", defaultColor: "bg-emerald-700" },
  { id: "water_tank_ug", name: "Underground Water Tank", icon: "💧", defaultColor: "bg-cyan-600" },
  { id: "water_tank_oh", name: "Overhead Water Tank", icon: "🚰", defaultColor: "bg-blue-800" },
  { id: "staircase", name: "Staircase", icon: "🪜", defaultColor: "bg-stone-600" },
  { id: "children_bedroom", name: "Children / Guest Bed", icon: "🧸", defaultColor: "bg-pink-600" },
  { id: "balcony", name: "Balcony / Open Terrace", icon: "🌿", defaultColor: "bg-lime-600" },
  { id: "septic_tank", name: "Septic Tank / Sewer", icon: "⚠️", defaultColor: "bg-stone-800" }
];

interface FloorPlanUploadStudioProps {
  onOpenReportModal?: () => void;
}

export const FloorPlanUploadStudio: React.FC<FloorPlanUploadStudioProps> = ({ onOpenReportModal }) => {
  // Active plan configuration
  const [selectedPresetId, setSelectedPresetId] = useState<string>("2bhk_urban");
  const [customPlanImage, setCustomPlanImage] = useState<string | null>(null);

  // Calibration parameters
  const [northOffsetDeg, setNorthOffsetDeg] = useState<number>(0);
  const [centerPct, setCenterPct] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [planOpacity, setPlanOpacity] = useState<number>(0.9);
  const [overlayOpacity, setOverlayOpacity] = useState<number>(0.65);

  // Overlay layer active toggles
  const [activeOverlay, setActiveOverlay] = useState<
    "shakti_chakra" | "16_zones_rays" | "vastu_purusha_grid" | "brahmasthan_only" | "fengshui_bagua" | "fengshui_24_mountains"
  >("shakti_chakra");

  // Rooms placed on floor plan
  const [placedRooms, setPlacedRooms] = useState<PlacedRoomItem[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  // Interactive addition state
  const [addingCategory, setAddingCategory] = useState<RoomCategory | null>(null);

  // Dragging room state to smoothly move/place without jitter
  const [draggedRoomId, setDraggedRoomId] = useState<string | null>(null);

  // Update room attributes helper (position, dimensions, orientation)
  const handleUpdateRoom = (id: string, updates: Partial<PlacedRoomItem>) => {
    setPlacedRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.id !== id) return room;
        const newX = updates.xPct !== undefined ? updates.xPct : room.xPct;
        const newY = updates.yPct !== undefined ? updates.yPct : room.yPct;
        const azimuth = calculatePointAzimuth(centerPct.x, centerPct.y, newX, newY, northOffsetDeg);
        const zone = getMahaVastuZoneByAngle(azimuth);
        const pada = room.category === "entrance" ? getDevataPadaByAngle(azimuth) : undefined;
        const evaluation = evaluateRoomPlacement(room.category, zone.id, azimuth, pada?.id);

        const dx = newX - centerPct.x;
        const dy = newY - centerPct.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        return {
          ...room,
          ...updates,
          xPct: parseFloat(newX.toFixed(1)),
          yPct: parseFloat(newY.toFixed(1)),
          distanceFromCenterPct: parseFloat(dist.toFixed(1)),
          angleDeg: azimuth,
          detectedZoneId: zone.id,
          detectedPadaId: pada?.id,
          complianceRating: evaluation.complianceRating,
          shastricVerdict: evaluation.shastricVerdict,
          recommendedRemedy: evaluation.recommendedRemedy,
          metalStripRemedy: evaluation.metalStripRemedy,
          colorTapeRemedy: evaluation.colorTapeRemedy,
          pyramidYantraRemedy: evaluation.pyramidYantraRemedy
        };
      })
    );
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize rooms from sample preset on load or change
  useEffect(() => {
    if (!customPlanImage) {
      const preset = SAMPLE_FLOOR_PLANS.find((p) => p.id === selectedPresetId) || SAMPLE_FLOOR_PLANS[0];
      setNorthOffsetDeg(preset.defaultNorthOffset);
      setCenterPct({ x: 50, y: 50 });

      // Compute initial rooms with zone & compliance
      const initialRooms: PlacedRoomItem[] = preset.defaultRooms.map((r, idx) => {
        const azimuth = calculatePointAzimuth(50, 50, r.xPct, r.yPct, preset.defaultNorthOffset);
        const zone = getMahaVastuZoneByAngle(azimuth);
        const pada = r.category === "entrance" ? getDevataPadaByAngle(azimuth) : undefined;
        const evaluation = evaluateRoomPlacement(r.category, zone.id, azimuth, pada?.id);

        return {
          id: `room-${Date.now()}-${idx}`,
          category: r.category,
          label: r.label,
          xPct: r.xPct,
          yPct: r.yPct,
          distanceFromCenterPct: r.distanceFromCenterPct,
          angleDeg: azimuth,
          detectedZoneId: zone.id,
          detectedPadaId: pada?.id,
          complianceRating: evaluation.complianceRating,
          shastricVerdict: evaluation.shastricVerdict,
          recommendedRemedy: evaluation.recommendedRemedy,
          metalStripRemedy: evaluation.metalStripRemedy,
          colorTapeRemedy: evaluation.colorTapeRemedy,
          pyramidYantraRemedy: evaluation.pyramidYantraRemedy
        };
      });

      setPlacedRooms(initialRooms);
    }
  }, [selectedPresetId, customPlanImage]);

  // Recalculate room angles & zones whenever north offset or center point moves
  useEffect(() => {
    setPlacedRooms((prevRooms) =>
      prevRooms.map((room) => {
        const azimuth = calculatePointAzimuth(centerPct.x, centerPct.y, room.xPct, room.yPct, northOffsetDeg);
        const zone = getMahaVastuZoneByAngle(azimuth);
        const pada = room.category === "entrance" ? getDevataPadaByAngle(azimuth) : undefined;
        const evaluation = evaluateRoomPlacement(room.category, zone.id, azimuth, pada?.id);

        const dx = room.xPct - centerPct.x;
        const dy = room.yPct - centerPct.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        return {
          ...room,
          angleDeg: azimuth,
          distanceFromCenterPct: parseFloat(dist.toFixed(1)),
          detectedZoneId: zone.id,
          detectedPadaId: pada?.id,
          complianceRating: evaluation.complianceRating,
          shastricVerdict: evaluation.shastricVerdict,
          recommendedRemedy: evaluation.recommendedRemedy,
          metalStripRemedy: evaluation.metalStripRemedy,
          colorTapeRemedy: evaluation.colorTapeRemedy,
          pyramidYantraRemedy: evaluation.pyramidYantraRemedy
        };
      })
    );
  }, [northOffsetDeg, centerPct]);

  // Handle Custom Floor Plan Image Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomPlanImage(event.target.result as string);
          setPlacedRooms([]);
          setSelectedRoomId(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Canvas Click to add room or calibrate center
  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    if (addingCategory) {
      const azimuth = calculatePointAzimuth(centerPct.x, centerPct.y, clickX, clickY, northOffsetDeg);
      const zone = getMahaVastuZoneByAngle(azimuth);
      const pada = addingCategory === "entrance" ? getDevataPadaByAngle(azimuth) : undefined;
      const evaluation = evaluateRoomPlacement(addingCategory, zone.id, azimuth, pada?.id);

      const dx = clickX - centerPct.x;
      const dy = clickY - centerPct.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const categoryObj = ROOM_CATEGORIES.find((c) => c.id === addingCategory);
      const defaultWidth = addingCategory === "entrance" ? 10 : 12;
      const defaultLength = addingCategory === "entrance" ? 4 : 10;
      const newRoom: PlacedRoomItem = {
        id: `room-${Date.now()}`,
        category: addingCategory,
        label: `${categoryObj?.name || addingCategory} (${zone.id})`,
        xPct: parseFloat(clickX.toFixed(1)),
        yPct: parseFloat(clickY.toFixed(1)),
        widthPct: defaultWidth,
        lengthPct: defaultLength,
        orientation: addingCategory === "entrance" ? "horizontal" : undefined,
        distanceFromCenterPct: parseFloat(dist.toFixed(1)),
        angleDeg: azimuth,
        detectedZoneId: zone.id,
        detectedPadaId: pada?.id,
        complianceRating: evaluation.complianceRating,
        shastricVerdict: evaluation.shastricVerdict,
        recommendedRemedy: evaluation.recommendedRemedy,
        metalStripRemedy: evaluation.metalStripRemedy,
        colorTapeRemedy: evaluation.colorTapeRemedy,
        pyramidYantraRemedy: evaluation.pyramidYantraRemedy
      };

      setPlacedRooms((prev) => [...prev, newRoom]);
      setSelectedRoomId(newRoom.id);
      setAddingCategory(null);
    }
  };

  // Remove room
  const handleRemoveRoom = (id: string) => {
    setPlacedRooms((prev) => prev.filter((r) => r.id !== id));
    if (selectedRoomId === id) setSelectedRoomId(null);
  };

  // Overall Score computation
  const vastuScore = useMemo(() => calculateOverallVastuScore(placedRooms), [placedRooms]);

  const activePreset = SAMPLE_FLOOR_PLANS.find((p) => p.id === selectedPresetId) || SAMPLE_FLOOR_PLANS[0];
  const selectedRoom = placedRooms.find((r) => r.id === selectedRoomId);

  return (
    <div className="space-y-6">
      {/* Top Workspace Command Bar */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Interactive CAD Studio
            </span>
            <span className="text-xs text-slate-400">
              Shakti Chakra 32 Padas · 16 Zones Balancing · Feng Shui Bagua
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
            <Compass className="w-6 h-6 text-amber-400" />
            Vastu & Feng Shui Floor Plan Analyzer
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Upload blueprints or select architectural presets. Calibrate Brahmasthan and true North degree to diagnose doshas and generate non-destructive remedies.
          </p>
        </div>

        {/* Blueprint Selector & Custom File Uploader */}
        <div className="flex flex-wrap items-center gap-2.5 self-stretch lg:self-auto">
          {!customPlanImage ? (
            <select
              value={selectedPresetId}
              onChange={(e) => setSelectedPresetId(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-white text-xs font-semibold px-3 py-2 rounded-xl focus:ring-2 focus:ring-amber-400 outline-hidden cursor-pointer"
            >
              {SAMPLE_FLOOR_PLANS.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.title}
                </option>
              ))}
            </select>
          ) : (
            <button
              onClick={() => {
                setCustomPlanImage(null);
                setSelectedPresetId("2bhk_urban");
              }}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset to Sample Plans
            </button>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            Upload Floor Plan (JPG/PNG)
          </button>

          {onOpenReportModal && (
            <button
              onClick={onOpenReportModal}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5 text-amber-400" />
              Audit Dossier
            </button>
          )}
        </div>
      </div>

      {/* Main Studio Grid: Left Canvas + Controls | Right Live Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: INTERACTIVE CANVAS (8 COLS) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Overlay Selector & Compass Rotation Bar */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            {/* Overlay Selector Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {[
                { id: "shakti_chakra", label: "Shakti Chakra (32 Padas)" },
                { id: "16_zones_rays", label: "16 MahaVastu Zones" },
                { id: "vastu_purusha_grid", label: "3x3 Mandala" },
                { id: "brahmasthan_only", label: "Brahmasthan Center" },
                { id: "fengshui_bagua", label: "Feng Shui Bagua" },
                { id: "fengshui_24_mountains", label: "24 Mountains" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveOverlay(tab.id as any)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeOverlay === tab.id
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Quick Zoom & Reset */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setZoomLevel((z) => Math.min(2.0, z + 0.15))}
                title="Zoom In"
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.15))}
                title="Zoom Out"
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setZoomLevel(1);
                  setPanOffset({ x: 0, y: 0 });
                }}
                title="Reset View"
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer text-xs font-bold px-2"
              >
                100%
              </button>
            </div>
          </div>

          {/* Compass Degree Calibration Slider */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-rose-600 animate-spin-slow" />
              <span className="font-bold text-slate-800">True North Calibration:</span>
              <span className="font-black text-rose-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                {northOffsetDeg.toFixed(1)}°
              </span>
            </div>

            <div className="flex items-center gap-2 grow max-w-xs">
              <input
                type="range"
                min="0"
                max="359"
                step="0.5"
                value={northOffsetDeg}
                onChange={(e) => setNorthOffsetDeg(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
              />
            </div>

            {/* Quick Cardinal Orientation Presets */}
            <div className="flex items-center gap-1">
              {[
                { label: "N (0°)", deg: 0 },
                { label: "E (90°)", deg: 90 },
                { label: "S (180°)", deg: 180 },
                { label: "W (270°)", deg: 270 }
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => setNorthOffsetDeg(preset.deg)}
                  className={`px-2 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-colors ${
                    Math.round(northOffsetDeg) === preset.deg
                      ? "bg-rose-600 text-white"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {preset.label}
                </button>
              ))}

              <button
                onClick={() => setNorthOffsetDeg((d) => (d + 1) % 360)}
                className="px-1.5 py-1 rounded-md bg-white border border-slate-200 hover:bg-slate-100 text-[11px] font-bold cursor-pointer"
                title="+1° Step"
              >
                +1°
              </button>
              <button
                onClick={() => setNorthOffsetDeg((d) => (d - 1 + 360) % 360)}
                className="px-1.5 py-1 rounded-md bg-white border border-slate-200 hover:bg-slate-100 text-[11px] font-bold cursor-pointer"
                title="-1° Step"
              >
                -1°
              </button>
            </div>
          </div>

          {/* THE SVG CAD CANVAS */}
          <div
            ref={containerRef}
            className="relative w-full aspect-4/3 bg-slate-950 rounded-2xl overflow-hidden border-2 border-slate-800 shadow-2xl select-none"
          >
            {/* North Compass Indicator on Top-Right Corner */}
            <div className="absolute top-4 right-4 z-20 pointer-events-none bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-700 shadow-lg flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full border border-rose-500/50 flex items-center justify-center transition-transform duration-300"
                style={{ transform: `rotate(${-northOffsetDeg}deg)` }}
              >
                <div className="w-1 h-3 bg-rose-500 rounded-t-full -translate-y-1.5"></div>
              </div>
              <div className="text-[11px]">
                <div className="font-black text-rose-400 leading-none">N {northOffsetDeg.toFixed(0)}°</div>
                <div className="text-[9px] text-slate-400">Orientation</div>
              </div>
            </div>

            {/* Instruction banner when adding room */}
            {addingCategory && (
              <div className="absolute top-4 left-4 z-20 bg-amber-500 text-slate-950 px-3 py-1.5 rounded-xl font-bold text-xs shadow-lg flex items-center gap-2 animate-bounce">
                <Move className="w-4 h-4" />
                <span>Click anywhere on the floor plan to place {ROOM_CATEGORIES.find((c) => c.id === addingCategory)?.name}</span>
                <button
                  onClick={() => setAddingCategory(null)}
                  className="ml-2 font-black text-slate-900 hover:text-black cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Interactive SVG Workspace */}
            <svg
              viewBox="0 0 800 600"
              className={`w-full h-full ${addingCategory ? "cursor-crosshair" : draggedRoomId ? "cursor-grabbing" : "cursor-default"}`}
              onClick={handleCanvasClick}
              onMouseMove={(e) => {
                if (draggedRoomId) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const curX = Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100));
                  const curY = Math.max(5, Math.min(95, ((e.clientY - rect.top) / rect.height) * 100));
                  handleUpdateRoom(draggedRoomId, { xPct: curX, yPct: curY });
                }
              }}
              onMouseUp={() => setDraggedRoomId(null)}
              onMouseLeave={() => setDraggedRoomId(null)}
              style={{
                transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
                transformOrigin: "center center",
                transition: draggedRoomId ? "none" : "transform 0.15s ease-out"
              }}
            >
              <defs>
                {/* Radial Gradient for Brahmasthan Energy */}
                <radialGradient id="brahmaGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.45" />
                  <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#d97706" stopOpacity="0.0" />
                </radialGradient>
              </defs>

              {/* 1. LAYER: FLOOR PLAN BACKGROUND (SVG OR CUSTOM IMAGE) */}
              <g opacity={planOpacity}>
                {customPlanImage ? (
                  <image
                    href={customPlanImage}
                    x="50"
                    y="30"
                    width="700"
                    height="540"
                    preserveAspectRatio="xMidYMid meet"
                  />
                ) : (
                  <g dangerouslySetInnerHTML={{ __html: activePreset.svgBlueprint }} />
                )}
              </g>

              {/* 2. LAYER: OVERLAYS (SHAKTI CHAKRA, 16 ZONES, BAGUA, ETC.) */}
              <g opacity={overlayOpacity}>
                {/* Center Coordinates in SVG ViewBox */}
                {(() => {
                  const cx = (centerPct.x / 100) * 800;
                  const cy = (centerPct.y / 100) * 600;
                  const radius = 280;

                  return (
                    <g>
                      {/* BRAHMASTHAN 1/9th ZONE */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={radius * 0.28}
                        fill="url(#brahmaGrad)"
                        stroke="#f59e0b"
                        strokeWidth="2"
                        strokeDasharray="4"
                      />
                      <text
                        x={cx}
                        y={cy - 4}
                        textAnchor="middle"
                        fill="#fef3c7"
                        fontSize="11"
                        fontWeight="bold"
                        letterSpacing="1"
                      >
                        BRAHMASTHAN
                      </text>
                      <text
                        x={cx}
                        y={cy + 10}
                        textAnchor="middle"
                        fill="#fde68a"
                        fontSize="9"
                      >
                        (Sacred Navel Center)
                      </text>

                      {/* OVERLAY: SHAKTI CHAKRA (32 Padas + 16 Zones) */}
                      {activeOverlay === "shakti_chakra" && (
                        <g>
                          {/* 16 Zones Colored Wedges */}
                          {MAHAVASTU_16_ZONES.map((zone) => {
                            // Angular calculations relative to North offset
                            const startDeg = zone.angleStart + northOffsetDeg;
                            const endDeg = zone.angleEnd + northOffsetDeg;

                            const startRad = ((startDeg - 90) * Math.PI) / 180;
                            const endRad = ((endDeg - 90) * Math.PI) / 180;

                            const x1 = cx + radius * Math.cos(startRad);
                            const y1 = cy + radius * Math.sin(startRad);
                            const x2 = cx + radius * Math.cos(endRad);
                            const y2 = cy + radius * Math.sin(endRad);

                            const midRad = (((zone.centerAngle + northOffsetDeg) - 90) * Math.PI) / 180;
                            const tx = cx + (radius * 0.78) * Math.cos(midRad);
                            const ty = cy + (radius * 0.78) * Math.sin(midRad);

                            const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;

                            return (
                              <g key={zone.id}>
                                <path
                                  d={pathData}
                                  fill={zone.colorHex}
                                  fillOpacity="0.18"
                                  stroke={zone.colorHex}
                                  strokeWidth="1.2"
                                  strokeOpacity="0.7"
                                />
                                <text
                                  x={tx}
                                  y={ty}
                                  fill="#ffffff"
                                  fontSize="10"
                                  fontWeight="900"
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                  style={{ textShadow: "0 1px 3px rgba(0,0,0,0.9)" }}
                                >
                                  {zone.id}
                                </text>
                              </g>
                            );
                          })}

                          {/* Outer 32 Padas Perimeter Ring */}
                          {DEVATA_32_PADAS.map((pada) => {
                            const startDeg = pada.angleStart + northOffsetDeg;
                            const endDeg = pada.angleEnd + northOffsetDeg;
                            const startRad = ((startDeg - 90) * Math.PI) / 180;
                            const endRad = ((endDeg - 90) * Math.PI) / 180;

                            const rInner = radius;
                            const rOuter = radius + 28;

                            const x1Inner = cx + rInner * Math.cos(startRad);
                            const y1Inner = cy + rInner * Math.sin(startRad);
                            const x2Inner = cx + rInner * Math.cos(endRad);
                            const y2Inner = cy + rInner * Math.sin(endRad);

                            const x1Outer = cx + rOuter * Math.cos(startRad);
                            const y1Outer = cy + rOuter * Math.sin(startRad);
                            const x2Outer = cx + rOuter * Math.cos(endRad);
                            const y2Outer = cy + rOuter * Math.sin(endRad);

                            const midRad = (((pada.centerAngle + northOffsetDeg) - 90) * Math.PI) / 180;
                            const tx = cx + (rInner + 14) * Math.cos(midRad);
                            const ty = cy + (rInner + 14) * Math.sin(midRad);

                            const ringPath = `M ${x1Inner} ${y1Inner} L ${x1Outer} ${y1Outer} A ${rOuter} ${rOuter} 0 0 1 ${x2Outer} ${y2Outer} L ${x2Inner} ${y2Inner} A ${rInner} ${rInner} 0 0 0 ${x1Inner} ${y1Inner} Z`;

                            const fillColor = pada.isAuspicious ? "#10b981" : "#ef4444";

                            return (
                              <g key={pada.id} className="transition-opacity hover:opacity-100 opacity-85">
                                <path
                                  d={ringPath}
                                  fill={fillColor}
                                  fillOpacity={pada.isAuspicious ? "0.6" : "0.25"}
                                  stroke="#ffffff"
                                  strokeWidth="0.8"
                                  strokeOpacity="0.4"
                                />
                                <text
                                  x={tx}
                                  y={ty}
                                  fill="#ffffff"
                                  fontSize="8"
                                  fontWeight="bold"
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
                                >
                                  {pada.id}
                                </text>
                              </g>
                            );
                          })}
                        </g>
                      )}

                      {/* OVERLAY: 16 MAHAVASTU ZONES RAYS */}
                      {activeOverlay === "16_zones_rays" && (
                        <g>
                          {MAHAVASTU_16_ZONES.map((zone) => {
                            const angle = zone.centerAngle + northOffsetDeg;
                            const rad = ((angle - 90) * Math.PI) / 180;
                            const x = cx + radius * 1.05 * Math.cos(rad);
                            const y = cy + radius * 1.05 * Math.sin(rad);

                            const divAngle = zone.angleStart + northOffsetDeg;
                            const divRad = ((divAngle - 90) * Math.PI) / 180;
                            const divX = cx + radius * 1.1 * Math.cos(divRad);
                            const divY = cy + radius * 1.1 * Math.sin(divRad);

                            return (
                              <g key={zone.id}>
                                <line
                                  x1={cx}
                                  y1={cy}
                                  x2={divX}
                                  y2={divY}
                                  stroke={zone.colorHex}
                                  strokeWidth="1.5"
                                  strokeDasharray="6 3"
                                />
                                <rect
                                  x={x - 18}
                                  y={y - 10}
                                  width="36"
                                  height="20"
                                  rx="4"
                                  fill="#0f172a"
                                  stroke={zone.colorHex}
                                  strokeWidth="1.5"
                                />
                                <text
                                  x={x}
                                  y={y + 3}
                                  fill="#ffffff"
                                  fontSize="9"
                                  fontWeight="bold"
                                  textAnchor="middle"
                                >
                                  {zone.id}
                                </text>
                              </g>
                            );
                          })}
                        </g>
                      )}

                      {/* OVERLAY: FENG SHUI BAGUA 9 PALACES */}
                      {activeOverlay === "fengshui_bagua" && (
                        <g>
                          {/* Outer Circle */}
                          <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#e2e8f0" strokeWidth="2" />
                          {/* 8 Radial Lines at 45° intervals */}
                          {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((ang) => {
                            const rad = (((ang + northOffsetDeg) - 90) * Math.PI) / 180;
                            const x = cx + radius * Math.cos(rad);
                            const y = cy + radius * Math.sin(rad);
                            return (
                              <line
                                key={ang}
                                x1={cx}
                                y1={cy}
                                x2={x}
                                y2={y}
                                stroke="#f59e0b"
                                strokeWidth="2"
                                strokeDasharray="5 3"
                              />
                            );
                          })}
                          {/* Bagua Labels */}
                          {BAGUA_PALACES.map((palace, i) => {
                            const angleMap: Record<string, number> = {
                              career: 0,
                              knowledge: 45,
                              family: 90,
                              wealth: 135,
                              fame: 180,
                              relationships: 225,
                              children_creativity: 270,
                              helpful_people: 315,
                              health_center: -1
                            };
                            const ang = angleMap[palace.id];
                            if (ang === -1) return null;
                            const rad = (((ang + northOffsetDeg) - 90) * Math.PI) / 180;
                            const px = cx + (radius * 0.72) * Math.cos(rad);
                            const py = cy + (radius * 0.72) * Math.sin(rad);

                            return (
                              <g key={palace.id}>
                                <circle cx={px} cy={py} r="22" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                                <text x={px} y={py - 4} fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle">
                                  {palace.trigram.slice(0, 1)}
                                </text>
                                <text x={px} y={py + 7} fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">
                                  {palace.englishName.split(" ")[0]}
                                </text>
                              </g>
                            );
                          })}
                        </g>
                      )}

                      {/* OVERLAY: 24 MOUNTAINS */}
                      {activeOverlay === "fengshui_24_mountains" && (
                        <g>
                          <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                          {MOUNTAINS_24.map((m) => {
                            const startRad = (((m.angleStart + northOffsetDeg) - 90) * Math.PI) / 180;
                            const midRad = ((((m.angleStart + m.angleEnd) / 2 + northOffsetDeg) - 90) * Math.PI) / 180;
                            const x1 = cx + (radius - 35) * Math.cos(startRad);
                            const y1 = cy + (radius - 35) * Math.sin(startRad);
                            const x2 = cx + radius * Math.cos(startRad);
                            const y2 = cy + radius * Math.sin(startRad);

                            const tx = cx + (radius - 16) * Math.cos(midRad);
                            const ty = cy + (radius - 16) * Math.sin(midRad);

                            return (
                              <g key={m.name}>
                                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748b" strokeWidth="1" />
                                <text
                                  x={tx}
                                  y={ty}
                                  fill="#f8fafc"
                                  fontSize="8"
                                  fontWeight="bold"
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                >
                                  {m.chinese}
                                </text>
                              </g>
                            );
                          })}
                        </g>
                      )}

                      {/* Center Crosshair (Brahmasthan Point) */}
                      <circle cx={cx} cy={cy} r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                      <line x1={cx - 15} y1={cy} x2={cx + 15} y2={cy} stroke="#ffffff" strokeWidth="1.5" />
                      <line x1={cx} y1={cy - 15} x2={cx} y2={cy + 15} stroke="#ffffff" strokeWidth="1.5" />
                    </g>
                  );
                })()}
              </g>

              {/* 3. LAYER: PLACED ROOM MARKERS */}
              <g>
                {placedRooms.map((room) => {
                  const rx = (room.xPct / 100) * 800;
                  const ry = (room.yPct / 100) * 600;
                  const isSelected = selectedRoomId === room.id;

                  const statusColor =
                    room.complianceRating === "Auspicious"
                      ? "#10b981"
                      : room.complianceRating === "Neutral"
                      ? "#f59e0b"
                      : "#ef4444";

                  const cat = ROOM_CATEGORIES.find((c) => c.id === room.category);
                  const isEntrance = room.category === "entrance";
                  const wPx = Math.max(24, ((room.widthPct || (isEntrance ? 10 : 12)) / 100) * 800);
                  const lPx = Math.max(16, ((room.lengthPct || (isEntrance ? 4 : 10)) / 100) * 600);
                  const isHorizontal = room.orientation !== "vertical";
                  const rectW = isEntrance ? (isHorizontal ? wPx : lPx) : wPx;
                  const rectH = isEntrance ? (isHorizontal ? lPx : wPx) : lPx;

                  return (
                    <g
                      key={room.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRoomId(room.id);
                      }}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        setSelectedRoomId(room.id);
                        setDraggedRoomId(room.id);
                      }}
                      className="cursor-grab active:cursor-grabbing select-none"
                    >
                      {/* Connection ray to Brahmasthan */}
                      {isSelected && (
                        <line
                          x1={(centerPct.x / 100) * 800}
                          y1={(centerPct.y / 100) * 600}
                          x2={rx}
                          y2={ry}
                          stroke={statusColor}
                          strokeWidth="2"
                          strokeDasharray="4 2"
                        />
                      )}

                      {/* Dimension Footprint Box with adjustability outline */}
                      <rect
                        x={rx - rectW / 2}
                        y={ry - rectH / 2}
                        width={rectW}
                        height={rectH}
                        rx={isEntrance ? "4" : "8"}
                        fill={statusColor}
                        fillOpacity={isSelected ? "0.35" : "0.2"}
                        stroke={statusColor}
                        strokeWidth={isSelected ? "2.5" : "1.5"}
                        strokeDasharray={isEntrance ? "none" : "4 2"}
                      />

                      {/* Halo ring if selected */}
                      {isSelected && (
                        <circle
                          cx={rx}
                          cy={ry}
                          r="22"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="2.5"
                          strokeDasharray="4 2"
                        />
                      )}

                      {/* Marker Center Orb */}
                      <circle
                        cx={rx}
                        cy={ry}
                        r="16"
                        fill={statusColor}
                        stroke="#ffffff"
                        strokeWidth="2"
                        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
                      />

                      {/* Category Icon */}
                      <text
                        x={rx}
                        y={ry + 4}
                        fontSize="12"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {cat?.icon || "📍"}
                      </text>

                      {/* Zone Badge */}
                      <rect
                        x={rx - 18}
                        y={ry + Math.max(20, rectH / 2 + 4)}
                        width="36"
                        height="14"
                        rx="4"
                        fill="#0f172a"
                        stroke={statusColor}
                        strokeWidth="1"
                      />
                      <text
                        x={rx}
                        y={ry + Math.max(20, rectH / 2 + 4) + 10}
                        fontSize="8"
                        fontWeight="bold"
                        fill="#ffffff"
                        textAnchor="middle"
                      >
                        {room.detectedPadaId || room.detectedZoneId}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          {/* ROOM PLACEMENT TOOLBAR */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5 text-amber-600" />
                Add Room or Fixture to Floor Plan
              </span>
              <span className="text-[11px] text-slate-500">
                Click a room below, then click on the floor plan above
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {ROOM_CATEGORIES.map((cat) => {
                const isSelected = addingCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setAddingCategory(isSelected ? null : cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-amber-500 text-slate-950 border-amber-600 shadow-sm scale-105"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE DIAGNOSTICS, VASTU SCORE & REMEDIES (4 COLS) */}
        <div className="lg:col-span-4 space-y-4">
          {/* OVERALL VASTU COMPLIANCE SCORECARD */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                Live Shastric Audit
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {vastuScore.grade}
              </span>
            </div>

            <div className="flex items-end justify-between gap-2">
              <div>
                <div className="text-4xl font-black tracking-tight text-white">
                  {vastuScore.overallScorePct}
                  <span className="text-xl font-normal text-slate-400">/100</span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Vastu Compliance Index
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-32 h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    vastuScore.overallScorePct >= 80
                      ? "bg-emerald-500"
                      : vastuScore.overallScorePct >= 60
                      ? "bg-amber-500"
                      : "bg-rose-500"
                  }`}
                  style={{ width: `${vastuScore.overallScorePct}%` }}
                ></div>
              </div>
            </div>

            {/* Breakdown Mini Grid */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px]">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60">
                <span className="text-slate-400">Entrance:</span>
                <span className="font-bold text-white">{vastuScore.breakdown.entranceScore}/25</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60">
                <span className="text-slate-400">Kitchen:</span>
                <span className="font-bold text-white">{vastuScore.breakdown.kitchenScore}/20</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60">
                <span className="text-slate-400">Toilet/Waste:</span>
                <span className="font-bold text-white">{vastuScore.breakdown.toiletScore}/25</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60">
                <span className="text-slate-400">Master Bed:</span>
                <span className="font-bold text-white">{vastuScore.breakdown.masterBedScore}/15</span>
              </div>
            </div>
          </div>

          {/* SELECTED ROOM DEEP-DIVE INSPECTOR */}
          {selectedRoom ? (
            <div className="bg-white p-5 rounded-2xl border-2 border-amber-400 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {ROOM_CATEGORIES.find((c) => c.id === selectedRoom.category)?.icon || "📍"}
                  </span>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">{selectedRoom.label}</h4>
                    <div className="text-[11px] text-slate-500">
                      Zone: {selectedRoom.detectedZoneId} {selectedRoom.detectedPadaId ? `(${selectedRoom.detectedPadaId})` : ""} · {selectedRoom.angleDeg}° Azimuth
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveRoom(selectedRoom.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Delete Room"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Dimension & Placement Adjustment Controls */}
              <div className="bg-amber-50/70 border border-amber-200/80 p-3 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-amber-950">
                  <span className="flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-amber-700" />
                    <span>Adjust Size &amp; Orientation</span>
                  </span>
                  <span className="text-[10px] text-amber-800 font-mono">Drag on canvas or use sliders</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  {/* Width / Span Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-700 font-semibold">
                      <span className="flex items-center gap-1">
                        <ArrowLeftRight className="w-3 h-3 text-slate-500" /> Width / Span:
                      </span>
                      <span className="font-mono">{selectedRoom.widthPct || (selectedRoom.category === 'entrance' ? 10 : 12)}%</span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="25"
                      value={selectedRoom.widthPct || (selectedRoom.category === 'entrance' ? 10 : 12)}
                      onChange={(e) => handleUpdateRoom(selectedRoom.id, { widthPct: parseInt(e.target.value, 10) })}
                      className="w-full accent-amber-600 h-1.5 bg-amber-200 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Length / Depth Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-700 font-semibold">
                      <span className="flex items-center gap-1">
                        <ArrowUpDown className="w-3 h-3 text-slate-500" /> Length / Depth:
                      </span>
                      <span className="font-mono">{selectedRoom.lengthPct || (selectedRoom.category === 'entrance' ? 4 : 10)}%</span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="25"
                      value={selectedRoom.lengthPct || (selectedRoom.category === 'entrance' ? 4 : 10)}
                      onChange={(e) => handleUpdateRoom(selectedRoom.id, { lengthPct: parseInt(e.target.value, 10) })}
                      className="w-full accent-amber-600 h-1.5 bg-amber-200 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Entrance Door Orientation Toggle */}
                {selectedRoom.category === 'entrance' && (
                  <div className="flex items-center justify-between pt-1 border-t border-amber-200/60 text-xs">
                    <span className="text-[11px] text-amber-900 font-semibold">Door Orientation:</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleUpdateRoom(selectedRoom.id, { orientation: 'horizontal' })}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                          selectedRoom.orientation !== 'vertical'
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'bg-white text-slate-700 hover:bg-amber-100 border border-amber-200'
                        }`}
                      >
                        Horizontal Door
                      </button>
                      <button
                        onClick={() => handleUpdateRoom(selectedRoom.id, { orientation: 'vertical' })}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                          selectedRoom.orientation === 'vertical'
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'bg-white text-slate-700 hover:bg-amber-100 border border-amber-200'
                        }`}
                      >
                        Vertical Door
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Status Badge */}
              <div
                className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-2 ${
                  selectedRoom.complianceRating === "Auspicious"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : selectedRoom.complianceRating === "Neutral"
                    ? "bg-amber-50 text-amber-800 border border-amber-200"
                    : "bg-rose-50 text-rose-800 border border-rose-200"
                }`}
              >
                {selectedRoom.complianceRating === "Auspicious" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>Verdict: {selectedRoom.complianceRating}</span>
              </div>

              {/* Shastric Explanation */}
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {selectedRoom.shastricVerdict}
              </p>

              {/* Non-Destructive Remedy Prescriptions */}
              <div className="space-y-2 pt-1">
                <div className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-indigo-600" />
                  Non-Destructive Remedy
                </div>

                <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl space-y-2 text-xs text-indigo-950">
                  <div className="font-semibold leading-relaxed">
                    {selectedRoom.recommendedRemedy}
                  </div>

                  {selectedRoom.metalStripRemedy && (
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-900">
                      <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                      <span>Metal Strip: {selectedRoom.metalStripRemedy}</span>
                    </div>
                  )}

                  {selectedRoom.colorTapeRemedy && (
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-900">
                      <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                      <span>Color Tape: {selectedRoom.colorTapeRemedy}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center space-y-2">
              <Info className="w-6 h-6 text-slate-400 mx-auto" />
              <div className="text-xs font-bold text-slate-700">No Room Selected</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Click any room marker on the floor plan above to inspect its exact zone, angular alignment, and specific shastric remedies.
              </p>
            </div>
          )}

          {/* DETECTED DOSHAS & ACTION CHECKLIST */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Active Doshas ({vastuScore.keyDoshas.length})
              </span>
              <span className="text-[11px] text-slate-500 font-semibold">
                {placedRooms.length} Total Elements
              </span>
            </div>

            {vastuScore.keyDoshas.length === 0 ? (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero major doshas detected! The floor plan achieves harmonious energy flow.</span>
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {vastuScore.keyDoshas.map((dosha, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-rose-50/80 border border-rose-100 text-xs text-rose-950 flex items-start gap-2"
                  >
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">{dosha}</div>
                      <div className="text-[11px] text-rose-700 mt-0.5">
                        {vastuScore.immediateRemedies[idx]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
