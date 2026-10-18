import React, { useState, useMemo } from "react";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Compass,
  RotateCcw,
  ArrowRight,
  Plus,
  Trash2,
  Calendar,
  Layers,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Info,
  Shield,
  Activity,
  Sliders,
  Check,
  AlertTriangle,
  BookOpen
} from "lucide-react";
import { UserProfile } from "../types";
import {
  BtrLifeEvent,
  BtrEventCategory,
  BtrDatePrecision,
  BtrDateConfidence,
  BtrTimeReliability,
  BtrSearchRange,
  BtrUserMode,
  BtrPhysicalClues,
  BtrRectificationReport,
  BtrCandidateEvaluation
} from "../engine/btr/btrTypes";
import {
  BTR_EVENT_DEFINITIONS,
  getPrioritizedCategoriesForAge,
  BtrEventTypeDefinition
} from "../engine/btr/btrRuleKnowledge";
import {
  validateBirthProfileForBtr,
  isInventedDefaultProfile
} from "../engine/btr/btrProfileValidation";
import { BirthTimeRectificationEngine } from "../engine/btr/btrEngine";

interface BirthTimeRectificationProps {
  currentDob?: string;
  currentTime?: string;
  userProfile?: UserProfile;
  onApplyRectifiedTime?: (newTime: string, metadata?: any) => void;
}

const CATEGORY_LABELS: Record<BtrEventCategory, { label: string; icon: string }> = {
  FAMILY_CHILDHOOD: { label: "Family & Childhood", icon: "🏡" },
  EDUCATION: { label: "Education & Academics", icon: "🎓" },
  CAREER: { label: "Career & Profession", icon: "💼" },
  RELATIONSHIPS: { label: "Relationships & Marriage", icon: "💍" },
  CHILDREN: { label: "Children & Progeny", icon: "👶" },
  RESIDENCE_TRAVEL: { label: "Residence & Travel", icon: "✈️" },
  HEALTH: { label: "Health & Vitality", icon: "🩺" },
  FINANCE: { label: "Finance & Wealth", icon: "💰" },
  LEGAL_SOCIAL: { label: "Legal & Public Honor", icon: "⚖️" },
  SPIRITUAL_TRANSFORMATION: { label: "Spiritual & Transformative", icon: "🕉️" },
  OTHER: { label: "Other Custom Event", icon: "📌" }
};

const RELIABILITY_OPTIONS: { id: BtrTimeReliability; label: string; description: string }[] = [
  { id: "hospital_exact", label: "Exact hospital / birth record", description: "Recorded to the exact minute by medical staff" },
  { id: "birth_certificate", label: "Official birth certificate", description: "Documented on birth certificate document" },
  { id: "hospital_family_record", label: "Hospital card or diary entry", description: "Documented in parents' diary or hospital discharge" },
  { id: "told_by_parents", label: "Told verbally by parents", description: "Remembered by parents with high conviction" },
  { id: "family_memory", label: "Family memory / relative recall", description: "Remembered by grandparents or relatives" },
  { id: "approximate", label: "Approximately known", description: "Known within a rough 15-30 minute window" },
  { id: "rounded_5m", label: "Rounded to nearest 5 minutes", description: "e.g. 10:15, 10:20, 10:25" },
  { id: "rounded_10m", label: "Rounded to nearest 10 minutes", description: "e.g. 10:20, 10:30, 10:40" },
  { id: "rounded_15m", label: "Rounded to nearest 15 minutes", description: "e.g. 10:15, 10:30, 10:45" },
  { id: "rounded_30m", label: "Rounded to nearest 30 minutes", description: "e.g. 10:00, 10:30, 11:00" },
  { id: "rounded_1h", label: "Rounded to nearest hour", description: "e.g. 10:00, 11:00" },
  { id: "completely_unknown", label: "Completely unknown / lost", description: "Birth time is completely lost or unknown" }
];

const SEARCH_RANGE_OPTIONS: { id: BtrSearchRange; label: string; rangeSpan: string }[] = [
  { id: "pm_5m", label: "±5 Minutes", rangeSpan: "Fine Sub-Lord calibration" },
  { id: "pm_15m", label: "±15 Minutes", rangeSpan: "Standard hospital rounding" },
  { id: "pm_30m", label: "±30 Minutes", rangeSpan: "General verbal estimation" },
  { id: "pm_1h", label: "±1 Hour", rangeSpan: "Broad window search" },
  { id: "pm_3h", label: "±3 Hours", rangeSpan: "Session / Pahar search" },
  { id: "entire_day", label: "Entire Day", rangeSpan: "Unknown time search (24h)" },
  { id: "custom_range", label: "Custom Range", rangeSpan: "User-defined start & end" }
];

export const BirthTimeRectification: React.FC<BirthTimeRectificationProps> = ({
  currentDob,
  currentTime,
  userProfile,
  onApplyRectifiedTime
}) => {
  // 1. User Mode
  const [mode, setMode] = useState<BtrUserMode>("quick");

  // 2. Active Birth Details
  // Strictly prevent auto-populating invented default profiles (like Aarav Sharma)
  const isDefaultPersona = isInventedDefaultProfile(userProfile);
  const initialDob = !isDefaultPersona ? (userProfile?.dob || currentDob || "") : "";
  const initialTime = !isDefaultPersona ? (userProfile?.time || currentTime || "") : "";
  const initialPlace = !isDefaultPersona ? (userProfile?.place || "") : "";
  const initialLat = !isDefaultPersona && typeof userProfile?.latitude === "number" && !isNaN(userProfile.latitude) ? userProfile.latitude : NaN;
  const initialLon = !isDefaultPersona && typeof userProfile?.longitude === "number" && !isNaN(userProfile.longitude) ? userProfile.longitude : NaN;
  const initialTz = !isDefaultPersona && typeof userProfile?.timezoneOffsetHours === "number" && !isNaN(userProfile.timezoneOffsetHours) ? userProfile.timezoneOffsetHours : 5.5;

  const [activeDob, setActiveDob] = useState<string>(initialDob);
  const [activeTime, setActiveTime] = useState<string>(initialTime);
  const [isTimeUnknown, setIsTimeUnknown] = useState<boolean>(!initialTime);
  const [activePlace, setActivePlace] = useState<string>(initialPlace);
  const [activeLat, setActiveLat] = useState<number>(initialLat);
  const [activeLon, setActiveLon] = useState<number>(initialLon);
  const [activeTz, setActiveTz] = useState<number>(initialTz);
  const [isEditingBirthData, setIsEditingBirthData] = useState<boolean>(!initialDob || !initialPlace || isNaN(initialLat));

  const [reliability, setReliability] = useState<BtrTimeReliability>(!initialTime ? "completely_unknown" : "rounded_15m");
  const [searchRange, setSearchRange] = useState<BtrSearchRange>(!initialTime ? "entire_day" : "pm_15m");
  const [customRangeStart, setCustomRangeStart] = useState<string>("09:00");
  const [customRangeEnd, setCustomRangeEnd] = useState<string>("12:00");

  // Profile Validation hook: Distinguishes between unknown time vs missing DOB / location
  const validation = useMemo(() => {
    const isProfileDefault = isInventedDefaultProfile({
      name: userProfile?.name,
      dob: activeDob,
      time: activeTime,
      place: activePlace
    });

    return validateBirthProfileForBtr({
      dob: activeDob,
      time: isTimeUnknown ? undefined : activeTime,
      place: activePlace,
      latitude: activeLat,
      longitude: activeLon,
      timezoneOffsetHours: activeTz,
      name: userProfile?.name,
      reliability: isTimeUnknown ? "completely_unknown" : reliability,
      isDefaultProfile: isProfileDefault
    });
  }, [activeDob, activeTime, isTimeUnknown, activePlace, activeLat, activeLon, activeTz, userProfile?.name, reliability]);

  // Age calculation for dynamic questionnaire
  const userAge = useMemo(() => {
    if (!activeDob || !activeDob.includes("-")) return 30;
    const bYear = parseInt(activeDob.split("-")[0], 10) || 1995;
    const nowYear = new Date().getFullYear();
    return Math.max(1, nowYear - bYear);
  }, [activeDob]);

  const ageGuidance = useMemo(() => getPrioritizedCategoriesForAge(userAge), [userAge]);

  // 3. Dynamic Life Event Timeline
  const [events, setEvents] = useState<BtrLifeEvent[]>([]);

  // Add Event Form State
  const [selectedCategory, setSelectedCategory] = useState<BtrEventCategory>(
    ageGuidance.prioritizedCategories[0] || "FAMILY_CHILDHOOD"
  );
  const [selectedEventTypeId, setSelectedEventTypeId] = useState<string>("");
  const [eventDatePrecision, setEventDatePrecision] = useState<BtrDatePrecision>("exact_date");
  const [eventDateConfidence, setEventDateConfidence] = useState<BtrDateConfidence>("documented");
  const [eventExactDate, setEventExactDate] = useState<string>("");
  const [eventMonthYear, setEventMonthYear] = useState<string>("");
  const [eventYear, setEventYear] = useState<string>("");
  const [eventRangeStart, setEventRangeStart] = useState<string>("");
  const [eventRangeEnd, setEventRangeEnd] = useState<string>("");
  const [eventNotes, setEventNotes] = useState<string>("");

  // Physical clues (optional)
  const [showPhysicalClues, setShowPhysicalClues] = useState<boolean>(false);
  const [physicalClues, setPhysicalClues] = useState<BtrPhysicalClues>({
    heightBuild: "unspecified",
    constitution: "unspecified",
    temperament: "unspecified",
    intellectualStyle: "unspecified",
    socialInclination: "unspecified"
  });

  // Calculation state & results
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [report, setReport] = useState<BtrRectificationReport | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
  const [selectedCandidateForDetail, setSelectedCandidateForDetail] = useState<BtrCandidateEvaluation | null>(null);

  // Available event types for selected category
  const availableEventTypes = useMemo(() => {
    return BTR_EVENT_DEFINITIONS.filter((d) => d.category === selectedCategory);
  }, [selectedCategory]);

  // Auto-select first event type when category changes
  const activeEventTypeId = selectedEventTypeId || availableEventTypes[0]?.id || "";

  const handleAddEvent = () => {
    const def = BTR_EVENT_DEFINITIONS.find((d) => d.id === activeEventTypeId) || availableEventTypes[0];
    if (!def) return;

    // Validate date input based on precision
    if (eventDatePrecision === "exact_date" && !eventExactDate) {
      alert("Please select the exact date for this event.");
      return;
    }
    if (eventDatePrecision === "month_year" && !eventMonthYear) {
      alert("Please select the Month & Year for this event.");
      return;
    }
    if (eventDatePrecision === "year_only" && !eventYear) {
      alert("Please enter the year for this event.");
      return;
    }

    const newEvent: BtrLifeEvent = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      category: selectedCategory,
      eventType: def.id,
      description: eventNotes.trim() || undefined,
      datePrecision: eventDatePrecision,
      dateConfidence: eventDateConfidence,
      exactDate: eventDatePrecision === "exact_date" ? eventExactDate : undefined,
      monthYear: eventDatePrecision === "month_year" ? eventMonthYear : undefined,
      year: eventDatePrecision === "year_only" ? parseInt(eventYear, 10) : undefined,
      rangeStart:
        eventDatePrecision === "approx_range" || eventDatePrecision === "custom_range"
          ? eventRangeStart
          : undefined,
      rangeEnd:
        eventDatePrecision === "approx_range" || eventDatePrecision === "custom_range"
          ? eventRangeEnd
          : undefined,
      significance: def.defaultSignificance,
      primaryHouseExpected: def.primaryHouses
    };

    setEvents((prev) => [...prev, newEvent]);

    // Reset inputs
    setEventExactDate("");
    setEventMonthYear("");
    setEventYear("");
    setEventRangeStart("");
    setEventRangeEnd("");
    setEventNotes("");
  };

  const handleRemoveEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const handleCalculateBTR = () => {
    if (!validation.isAllowedToRun) {
      setCalculationError(validation.guidanceMessage);
      setIsEditingBirthData(true);
      return;
    }

    setIsCalculating(true);
    setCalculationError(null);

    setTimeout(() => {
      try {
        const res = BirthTimeRectificationEngine.rectifyBirthTime({
          dob: activeDob,
          recordedTime: isTimeUnknown ? undefined : activeTime,
          latitude: activeLat,
          longitude: activeLon,
          timezoneOffsetHours: activeTz,
          reliability: isTimeUnknown ? "completely_unknown" : reliability,
          searchRange: isTimeUnknown && searchRange !== "custom_range" ? "entire_day" : searchRange,
          customRangeStart: searchRange === "custom_range" ? customRangeStart : undefined,
          customRangeEnd: searchRange === "custom_range" ? customRangeEnd : undefined,
          events,
          physicalClues: showPhysicalClues ? physicalClues : undefined,
          place: activePlace,
          personName: userProfile?.name
        });

        setReport(res);
        setSelectedCandidateForDetail(res.strongestCandidate);
      } catch (err: any) {
        console.error("BTR Engine calculation error:", err);
        setCalculationError(err?.message || "An error occurred during astronomical BTR calculation.");
      } finally {
        setIsCalculating(false);
      }
    }, 450);
  };

  const handleApplyTime = () => {
    if (!report || !onApplyRectifiedTime) return;
    if (report.status === "INSUFFICIENT_EVIDENCE") {
      alert("Cannot apply birth time: Astrological evidence was insufficient to isolate a rising degree.");
      return;
    }
    const rectified = report.strongestCandidate.timeStr;
    onApplyRectifiedTime(rectified, {
      originalRecordedTime: activeTime,
      supportedWindowStart: report.supportedWindowStart,
      supportedWindowEnd: report.supportedWindowEnd,
      evidenceStatus: report.evidenceStatus,
      rectifiedAt: new Date().toISOString()
    });
    setShowConfirmationModal(false);
  };

  return (
    <div className="space-y-6">
      {/* 1. COMPACT TOP HEADER & NAVIGATION */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border border-amber-900/10 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              Deterministic Shastric Calibration
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Birth Time Rectification
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Calibrate your exact birth time using verifiable life events cross-examined against
              Parashari Vimshottari Dasha periods, authentic KP Placidus cusp sub-lords, and Jaimini
              Chara Karakas.
            </p>
          </div>

          {/* Mode Selector */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start md:self-center">
            {(["quick", "advanced", "expert", "research"] as BtrUserMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                  mode === m
                    ? "bg-slate-900 text-amber-300 shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                }`}
              >
                {m === "quick" ? "Quick Guided" : m === "research" ? "Practitioner" : m}
              </button>
            ))}
          </div>
        </div>

        {/* PROFILE VALIDATION GATE BANNER */}
        {!validation.isAllowedToRun && (
          <div className="bg-amber-50 border-2 border-amber-300 p-5 rounded-3xl space-y-2">
            <div className="flex items-center gap-2 text-amber-950 font-bold">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <h4 className="font-serif text-base font-bold text-amber-950">
                {validation.state === "BLOCKED_DEFAULT_PROFILE"
                  ? "Enter your birth details to begin Birth Time Rectification."
                  : validation.guidanceMessage}
              </h4>
            </div>
            <p className="text-xs text-amber-900/90 leading-relaxed">
              {validation.state === "BLOCKED_DEFAULT_PROFILE"
                ? "Birth Time Rectification calculates candidate Placidus cusps and Dasha timelines directly against your life events. Enter your verified date of birth and birth place below to begin."
                : validation.guidanceMessage}
            </p>
            {!isEditingBirthData && (
              <button
                onClick={() => setIsEditingBirthData(true)}
                className="mt-1 px-4 py-2 bg-amber-700 hover:bg-amber-800 text-amber-50 text-xs font-bold rounded-xl cursor-pointer"
              >
                Enter Birth Details
              </button>
            )}
          </div>
        )}

        {/* 2. BASELINE BIRTH DATA & RELIABILITY CONFIGURATION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Recorded Details Card */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Recorded Birth Baseline
              </span>
              <button
                onClick={() => setIsEditingBirthData(!isEditingBirthData)}
                className="text-[10px] text-amber-800 font-bold hover:underline cursor-pointer"
              >
                {isEditingBirthData ? "Done" : "Edit"}
              </button>
            </div>

            {isEditingBirthData ? (
              <div className="space-y-2.5 pt-1">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 block">Date of Birth (YYYY-MM-DD):</label>
                  <input
                    type="date"
                    value={activeDob}
                    onChange={(e) => setActiveDob(e.target.value)}
                    className="w-full bg-white px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[10px] font-bold text-slate-600 block">Recorded Time (HH:MM):</label>
                    <label className="flex items-center gap-1 text-[10px] text-slate-600 font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isTimeUnknown}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setIsTimeUnknown(checked);
                          if (checked) {
                            setActiveTime("");
                            setReliability("completely_unknown");
                            setSearchRange("entire_day");
                          } else {
                            setActiveTime("12:00");
                            setReliability("rounded_15m");
                            setSearchRange("pm_15m");
                          }
                        }}
                        className="rounded text-amber-600 focus:ring-amber-500"
                      />
                      <span>Time unknown</span>
                    </label>
                  </div>
                  {!isTimeUnknown ? (
                    <input
                      type="time"
                      value={activeTime}
                      onChange={(e) => setActiveTime(e.target.value)}
                      className="w-full bg-white px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                    />
                  ) : (
                    <div className="px-2.5 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-800 font-medium">
                      Birth time marked unknown. A 24-hour full-day search will be investigated.
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 block">Birth City / Place:</label>
                  <input
                    type="text"
                    value={activePlace}
                    placeholder="e.g. New Delhi, India"
                    onChange={(e) => {
                      const val = e.target.value;
                      setActivePlace(val);
                      // Provide auto-fill defaults for common places if lat/lon are NaN
                      if (isNaN(activeLat) || isNaN(activeLon)) {
                        const lower = val.toLowerCase();
                        if (lower.includes("delhi")) {
                          setActiveLat(28.6139);
                          setActiveLon(77.2090);
                          setActiveTz(5.5);
                        } else if (lower.includes("mumbai") || lower.includes("bombay")) {
                          setActiveLat(19.0760);
                          setActiveLon(72.8777);
                          setActiveTz(5.5);
                        } else if (lower.includes("bangalore") || lower.includes("bengaluru")) {
                          setActiveLat(12.9716);
                          setActiveLon(77.5946);
                          setActiveTz(5.5);
                        } else if (lower.includes("london")) {
                          setActiveLat(51.5074);
                          setActiveLon(-0.1278);
                          setActiveTz(0.0);
                        } else if (lower.includes("york")) {
                          setActiveLat(40.7128);
                          setActiveLon(-74.0060);
                          setActiveTz(-5.0);
                        }
                      }
                    }}
                    className="w-full bg-white px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                  />
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <div>
                    <label className="text-[9px] font-bold text-slate-500 block">Latitude:</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={isNaN(activeLat) ? "" : activeLat}
                      placeholder="28.61"
                      onChange={(e) => setActiveLat(parseFloat(e.target.value))}
                      className="w-full bg-white px-2 py-1 rounded border border-slate-300 text-[11px] font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-slate-500 block">Longitude:</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={isNaN(activeLon) ? "" : activeLon}
                      placeholder="77.20"
                      onChange={(e) => setActiveLon(parseFloat(e.target.value))}
                      className="w-full bg-white px-2 py-1 rounded border border-slate-300 text-[11px] font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-slate-500 block">TZ Offset (h):</label>
                    <input
                      type="number"
                      step="0.5"
                      value={isNaN(activeTz) ? "" : activeTz}
                      placeholder="+5.5"
                      onChange={(e) => setActiveTz(parseFloat(e.target.value))}
                      className="w-full bg-white px-2 py-1 rounded border border-slate-300 text-[11px] font-mono"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-2xl font-black text-slate-900">
                    {isTimeUnknown ? "Unknown Time" : (activeTime || "Not Set")}
                  </span>
                  {!isTimeUnknown && <span className="text-xs font-bold text-slate-500">Local</span>}
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  {activeDob || "Date Not Set"} • {activePlace || "Location Not Set"}
                </p>
                <p className="text-[10px] text-slate-600 font-mono">
                  Coordinates: {isNaN(activeLat) ? "Not set" : `${activeLat.toFixed(3)}°N`},{" "}
                  {isNaN(activeLon) ? "Not set" : `${activeLon.toFixed(3)}°E`} (TZ:{" "}
                  {isNaN(activeTz) ? "Not set" : `${activeTz >= 0 ? "+" : ""}${activeTz}h`})
                </p>
              </>
            )}
          </div>

          {/* Reliability Selector */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                Recorded Time Reliability
              </label>
              <Info className="w-3.5 h-3.5 text-slate-600" />
            </div>
            <select
              value={reliability}
              onChange={(e) => setReliability(e.target.value as BtrTimeReliability)}
              className="w-full bg-white px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-amber-600 cursor-pointer"
            >
              {RELIABILITY_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 leading-tight">
              {RELIABILITY_OPTIONS.find((o) => o.id === reliability)?.description}
            </p>
          </div>

          {/* Search Range Selector */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                Search Window Span
              </label>
              <Sliders className="w-3.5 h-3.5 text-slate-600" />
            </div>
            <select
              value={searchRange}
              onChange={(e) => setSearchRange(e.target.value as BtrSearchRange)}
              className="w-full bg-white px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-amber-600 cursor-pointer"
            >
              {SEARCH_RANGE_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label} ({opt.rangeSpan})
                </option>
              ))}
            </select>

            {searchRange === "custom_range" && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-[10px] font-bold text-slate-500">From:</span>
                  <input
                    type="time"
                    value={customRangeStart}
                    onChange={(e) => setCustomRangeStart(e.target.value)}
                    className="w-full bg-white px-2 py-1 rounded-lg border border-slate-300 text-xs font-mono"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500">To:</span>
                  <input
                    type="time"
                    value={customRangeEnd}
                    onChange={(e) => setCustomRangeEnd(e.target.value)}
                    className="w-full bg-white px-2 py-1 rounded-lg border border-slate-300 text-xs font-mono"
                  />
                </div>
              </div>
            )}

            <p className="text-[11px] text-slate-500">
              Evaluates ascending degree movement across this span in minute increments.
            </p>
          </div>
        </div>
      </div>

      {/* 3. DYNAMIC LIFE EVENT QUESTIONNAIRE & BUILDER */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border border-amber-900/10 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Life Events Verification Timeline
              </h3>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Enter key milestone events. Each event is cross-referenced with Vimshottari Mahadasha,
              Placidus Cusp Sub-Lords, and Jaimini Karakas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Events Recorded:</span>
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-black ${
                events.length >= 3
                  ? "bg-emerald-100 text-emerald-800"
                  : events.length >= 1
                  ? "bg-amber-100 text-amber-800"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {events.length} {events.length === 1 ? "Event" : "Events"}
            </span>
          </div>
        </div>

        {/* Dynamic Category Recommendations based on Age */}
        <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80 space-y-2">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="font-bold text-amber-900 text-xs">
              Recommended Milestone Categories for Age {userAge}:
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {ageGuidance.prioritizedCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-amber-900 text-amber-100 shadow-xs"
                    : "bg-white text-amber-900 hover:bg-amber-100/60 border border-amber-200/60"
                }`}
              >
                <span>{CATEGORY_LABELS[cat]?.icon}</span>
                <span>{CATEGORY_LABELS[cat]?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Add Event Form Box */}
        <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
          <span className="font-bold text-xs uppercase tracking-wider text-slate-700 block">
            Add A Milestone Event
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {/* Category Select */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Life Domain:</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value as BtrEventCategory);
                  setSelectedEventTypeId("");
                }}
                className="w-full bg-white px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-800 focus:outline-none focus:border-amber-600 cursor-pointer"
              >
                {Object.entries(CATEGORY_LABELS).map(([catKey, catVal]) => (
                  <option key={catKey} value={catKey}>
                    {catVal.icon} {catVal.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Event Type Select */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Milestone Type:</label>
              <select
                value={activeEventTypeId}
                onChange={(e) => setSelectedEventTypeId(e.target.value)}
                className="w-full bg-white px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-800 focus:outline-none focus:border-amber-600 cursor-pointer"
              >
                {availableEventTypes.map((def) => (
                  <option key={def.id} value={def.id}>
                    {def.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Precision */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Date Precision:</label>
              <select
                value={eventDatePrecision}
                onChange={(e) => setEventDatePrecision(e.target.value as BtrDatePrecision)}
                className="w-full bg-white px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-800 focus:outline-none focus:border-amber-600 cursor-pointer"
              >
                <option value="exact_date">Exact Date (Day, Month, Year)</option>
                <option value="month_year">Month &amp; Year (e.g. March 2019)</option>
                <option value="year_only">Year Only (e.g. 2018)</option>
                <option value="approx_range">Approximate Range (Span)</option>
              </select>
            </div>
          </div>

          {/* Date Input Fields according to selected precision */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {eventDatePrecision === "exact_date" && (
              <div>
                <label className="font-bold text-slate-700 block mb-1">Exact Event Date:</label>
                <input
                  type="date"
                  value={eventExactDate}
                  onChange={(e) => setEventExactDate(e.target.value)}
                  className="w-full bg-white px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-800 focus:outline-none focus:border-amber-600"
                />
              </div>
            )}

            {eventDatePrecision === "month_year" && (
              <div>
                <label className="font-bold text-slate-700 block mb-1">Event Month &amp; Year:</label>
                <input
                  type="month"
                  value={eventMonthYear}
                  onChange={(e) => setEventMonthYear(e.target.value)}
                  className="w-full bg-white px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-800 focus:outline-none focus:border-amber-600"
                />
              </div>
            )}

            {eventDatePrecision === "year_only" && (
              <div>
                <label className="font-bold text-slate-700 block mb-1">Event Year (YYYY):</label>
                <input
                  type="number"
                  placeholder="e.g. 2018"
                  min="1920"
                  max="2035"
                  value={eventYear}
                  onChange={(e) => setEventYear(e.target.value)}
                  className="w-full bg-white px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-800 focus:outline-none focus:border-amber-600"
                />
              </div>
            )}

            {(eventDatePrecision === "approx_range" || eventDatePrecision === "custom_range") && (
              <>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Start Date:</label>
                  <input
                    type="date"
                    value={eventRangeStart}
                    onChange={(e) => setEventRangeStart(e.target.value)}
                    className="w-full bg-white px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-800 focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">End Date:</label>
                  <input
                    type="date"
                    value={eventRangeEnd}
                    onChange={(e) => setEventRangeEnd(e.target.value)}
                    className="w-full bg-white px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-800 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </>
            )}

            <div>
              <label className="font-bold text-slate-700 block mb-1">Optional Notes / Details:</label>
              <input
                type="text"
                placeholder="e.g. Relocated to London, Joined Google..."
                value={eventNotes}
                onChange={(e) => setEventNotes(e.target.value)}
                className="w-full bg-white px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-800 focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              onClick={handleAddEvent}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-amber-300 hover:bg-slate-800 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Life Event to Timeline
            </button>
          </div>
        </div>

        {/* Added Events List */}
        {events.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border-2 border-dashed border-slate-200 text-slate-500 space-y-2">
            <Calendar className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="font-bold text-sm text-slate-700">No life events recorded yet</p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Please add at least 2 to 3 milestone events from your life above (e.g. graduation,
              first job, wedding, child birth, major relocation, surgery, or property purchase).
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
              Configured Verification Milestones ({events.length})
            </span>
            <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 overflow-hidden">
              {events.map((evt, idx) => {
                const def = BTR_EVENT_DEFINITIONS.find((d) => d.id === evt.eventType);
                const eventName = def?.name || evt.eventType;
                const catInfo = CATEGORY_LABELS[evt.category];

                const dateDisplay =
                  evt.exactDate ||
                  evt.monthYear ||
                  (evt.year ? `${evt.year}` : "") ||
                  (evt.rangeStart ? `${evt.rangeStart} to ${evt.rangeEnd}` : "Unspecified date");

                return (
                  <div
                    key={evt.id}
                    className="p-3.5 bg-white hover:bg-slate-50/80 flex items-center justify-between gap-3 transition-colors text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-slate-400 w-5 text-center">
                        {idx + 1}.
                      </span>
                      <span className="text-base">{catInfo?.icon || "📌"}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{eventName}</span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                            {catInfo?.label}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 flex flex-wrap items-center gap-2">
                          <span>
                            Date: <strong className="text-slate-700">{dateDisplay}</strong>
                          </span>
                          <span>•</span>
                          <span className="capitalize">
                            Precision: <strong>{evt.datePrecision.replace("_", " ")}</strong>
                          </span>
                          <span>•</span>
                          <span className="capitalize">
                            Confidence: <strong>{evt.dateConfidence.replace("_", " ")}</strong>
                          </span>
                          {evt.description && (
                            <>
                              <span>•</span>
                              <span className="italic text-slate-600">&ldquo;{evt.description}&rdquo;</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveEvent(evt.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Remove event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 4. OPTIONAL PHYSICAL & PERSONALITY CLUES (SUPPORTING EVIDENCE ONLY) */}
      <div className="bg-white rounded-3xl border border-amber-900/10 shadow-xs overflow-hidden">
        <button
          onClick={() => setShowPhysicalClues(!showPhysicalClues)}
          className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors cursor-pointer"
        >
          <div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-600" />
              <h3 className="font-serif text-base font-bold text-slate-900">
                Physical &amp; Personality Clues — Supporting Diagnostic Evidence (Optional)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Constitutional and temperament tendencies provide minor sub-lord calibration (max 5 pts) but
              will never override dated life events.
            </p>
          </div>
          <div className="text-slate-400">
            {showPhysicalClues ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {showPhysicalClues && (
          <div className="p-5 pt-0 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs animate-in fade-in">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Body Constitution (Dosha):</label>
              <select
                value={physicalClues.constitution}
                onChange={(e) =>
                  setPhysicalClues({ ...physicalClues, constitution: e.target.value as any })
                }
                className="w-full bg-slate-50 px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-800"
              >
                <option value="unspecified">Unspecified / Neutral</option>
                <option value="vata_lean">Vata (Lean, quick, dry skin, light frame)</option>
                <option value="pitta_muscular">Pitta (Muscular, medium build, warm, sharp)</option>
                <option value="kapha_broad">Kapha (Broad, heavy, calm, sturdy frame)</option>
                <option value="mixed">Mixed Dual Constitution</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Dominant Temperament:</label>
              <select
                value={physicalClues.temperament}
                onChange={(e) =>
                  setPhysicalClues({ ...physicalClues, temperament: e.target.value as any })
                }
                className="w-full bg-slate-50 px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-800"
              >
                <option value="unspecified">Unspecified / Neutral</option>
                <option value="dynamic_fire">Dynamic Fire (Impulsive, ambitious, action-oriented)</option>
                <option value="calm_water">Calm Water (Empathetic, introspective, emotional)</option>
                <option value="analytical_air">Analytical Air (Communicative, intellectual, versatile)</option>
                <option value="practical_earth">Practical Earth (Methodical, steadfast, grounded)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Intellectual Style:</label>
              <select
                value={physicalClues.intellectualStyle}
                onChange={(e) =>
                  setPhysicalClues({ ...physicalClues, intellectualStyle: e.target.value as any })
                }
                className="w-full bg-slate-50 px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-800"
              >
                <option value="unspecified">Unspecified / Neutral</option>
                <option value="scientific_technical">Scientific / Technical / Quantitative</option>
                <option value="artistic_creative">Artistic / Aesthetic / Creative</option>
                <option value="commerce_executive">Executive / Commercial / Strategic</option>
                <option value="spiritual_philosophical">Spiritual / Philosophical / Humane</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* 5. RECTIFICATION CALCULATION ACTION */}
      <div className="bg-white p-5 rounded-3xl border border-amber-900/10 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Shield className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            Astronomical validation: Parashari Vimshottari Dasha, Placidus KP Cusp Sub-Lords, and Jaimini
            Chara Karakas. No AI hallucination or heuristic shortcuts.
          </span>
        </div>

        <button
          onClick={handleCalculateBTR}
          disabled={isCalculating || !validation.isAllowedToRun}
          className={`w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all shrink-0 ${
            !validation.isAllowedToRun
              ? "bg-slate-300 text-slate-500 cursor-not-allowed opacity-75"
              : "bg-slate-950 hover:bg-slate-800 text-amber-300 cursor-pointer"
          }`}
        >
          <Clock className="w-4 h-4 text-amber-400" />
          {isCalculating ? "Calculating Astronomical Cusp & Dasha Evidence..." : "Calibrate & Rectify Birth Time"}
        </button>
      </div>

      {calculationError && (
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl text-rose-900 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{calculationError}</span>
        </div>
      )}

      {/* 6. RECTIFICATION REPORT & RESULTS */}
      {report && (
        <div className="space-y-6 animate-in fade-in">
          {/* Status Alert for Insufficient Evidence */}
          {report.status === "INSUFFICIENT_EVIDENCE" && (
            <div className="bg-amber-50 border-2 border-amber-400 p-5 sm:p-6 rounded-3xl space-y-2">
              <div className="flex items-center gap-2 text-amber-900">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <h4 className="font-serif text-lg font-bold">
                  Insufficient Evidence to Narrow Birth Time
                </h4>
              </div>
              <p className="text-xs text-amber-950 leading-relaxed">
                {report.insufficientEvidenceReason ||
                  "The provided life events do not yield sufficient discriminative power to differentiate candidate rising degrees."}
              </p>
              <div className="pt-2 text-xs text-amber-900/90 bg-amber-100/60 p-3 rounded-xl">
                <strong>Next Step:</strong> Please add at least 2 to 3 documented life milestones above
                (such as exact wedding date, university graduation date, or first employment date) and
                re-run the calculation.
              </div>
            </div>
          )}

          {/* Status Alert for Multiple Candidate Windows */}
          {report.status === "MULTIPLE_CANDIDATES" && (
            <div className="bg-indigo-50 border-2 border-indigo-300 p-5 sm:p-6 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 text-indigo-950">
                <Layers className="w-5 h-5 text-indigo-600 shrink-0" />
                <h4 className="font-serif text-lg font-bold">
                  Multiple Candidate Time Windows Remain
                </h4>
              </div>
              <p className="text-xs text-indigo-900 leading-relaxed">
                Astrological evidence shows near-equivalent Shastric confluence across separated candidate
                clusters. To preserve truth, the engine does not arbitrarily force a single minute.
              </p>
              {report.candidateClusters && report.candidateClusters.length > 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                  {report.candidateClusters.map((cluster) => (
                    <div
                      key={cluster.clusterIndex}
                      className="bg-white p-3.5 rounded-2xl border border-indigo-200 space-y-1"
                    >
                      <span className="font-bold text-indigo-900 block">
                        Cluster #{cluster.clusterIndex}: {cluster.startTime} – {cluster.endTime} IST
                      </span>
                      <span className="text-[11px] text-slate-600 block">
                        Peak Candidate: <strong>{cluster.bestCandidateTime}</strong> (Score:{" "}
                        {cluster.peakScore.toFixed(1)})
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        {cluster.candidateCount} adjacent minutes meeting qualification threshold
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Primary Result Banner */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-amber-500/40 shadow-lg space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-5">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                  Deterministic Calibration Result
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-200 mt-1">
                  Supported Window: {report.supportedWindowStart} – {report.supportedWindowEnd} IST
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Strongest single candidate minute:{" "}
                  <strong className="text-amber-300 font-mono text-base font-bold">
                    {report.strongestCandidate.timeStr} IST
                  </strong>{" "}
                  ({report.strongestCandidate.totalMinutesOffset >= 0 ? "+" : ""}
                  {report.strongestCandidate.totalMinutesOffset}m from recorded {report.recordedTime})
                </p>
              </div>

              {/* Status Badge */}
              <div
                className={`px-4 py-2 rounded-2xl border text-xs font-extrabold flex items-center gap-2 self-start md:self-center ${
                  report.evidenceStatus === "High"
                    ? "bg-emerald-500/20 border-emerald-400/50 text-emerald-300"
                    : report.evidenceStatus === "Moderate"
                    ? "bg-amber-500/20 border-amber-400/50 text-amber-300"
                    : "bg-slate-800 border-slate-700 text-slate-300"
                }`}
              >
                {report.evidenceStatus === "High" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                )}
                <span>{report.evidenceStatus} Evidence Status</span>
              </div>
            </div>

            {/* Key Astronomical Markers for Candidate */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white/5 p-3.5 rounded-2xl border border-amber-500/10">
                <span className="text-[10px] text-amber-300/80 uppercase block font-bold">Ascendant (Lagna)</span>
                <span className="text-sm font-bold text-white mt-0.5 block">
                  {report.strongestCandidate.ascendantSign}
                </span>
                <span className="text-[10px] text-slate-400">
                  {report.strongestCandidate.ascendantDegreeDms}
                </span>
              </div>

              <div className="bg-white/5 p-3.5 rounded-2xl border border-amber-500/10">
                <span className="text-[10px] text-amber-300/80 uppercase block font-bold">KP Sub-Lord</span>
                <span className="text-sm font-bold text-white mt-0.5 block">
                  {report.strongestCandidate.ascendantSubLord}
                </span>
                <span className="text-[10px] text-slate-400">
                  Star: {report.strongestCandidate.ascendantStarLord}
                </span>
              </div>

              <div className="bg-white/5 p-3.5 rounded-2xl border border-amber-500/10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-amber-300/80 uppercase font-bold">Navamsha (D9)</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-semibold">Diagnostic</span>
                </div>
                <span className="text-sm font-bold text-white mt-0.5 block">
                  {report.strongestCandidate.d9LagnaSign} Lagna
                </span>
                <span className="text-[10px] text-slate-400">Calculated (Unscored)</span>
              </div>

              <div className="bg-white/5 p-3.5 rounded-2xl border border-amber-500/10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-amber-300/80 uppercase font-bold">Dashamsha (D10)</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-semibold">Diagnostic</span>
                </div>
                <span className="text-sm font-bold text-white mt-0.5 block">
                  {report.strongestCandidate.d10LagnaSign} Lagna
                </span>
                <span className="text-[10px] text-slate-400">Calculated (Unscored)</span>
              </div>
            </div>

            {/* Why This Candidate Ranked Highest */}
            <div className="bg-white/5 p-4 rounded-2xl border border-amber-500/10 space-y-2 text-xs">
              <span className="font-bold text-amber-300 uppercase tracking-wider text-[10px] block">
                Evidence Confluence Summary:
              </span>
              <ul className="space-y-1.5 text-slate-200">
                {report.whyRankedHighest.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Remaining Uncertainty Note */}
            <div className="bg-amber-950/40 p-4 rounded-2xl border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300">Remaining Astrological Uncertainty: </span>
                <span className="text-amber-100/80">{report.remainingUncertainty}</span>
              </div>
            </div>

            {/* Apply Rectified Time Action */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="text-xs text-slate-400">
                Applying will update your birth chart profile and enable recalculation across all 8 systems.
              </div>

              <button
                onClick={() => setShowConfirmationModal(true)}
                disabled={report.status === "INSUFFICIENT_EVIDENCE"}
                className={`px-6 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-md transition-all ${
                  report.status === "INSUFFICIENT_EVIDENCE"
                    ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                    : "bg-amber-400 hover:bg-amber-300 text-slate-950 cursor-pointer"
                }`}
              >
                <Compass className="w-4 h-4" />
                Use This Rectified Time ({report.strongestCandidate.timeStr})
              </button>
            </div>
          </div>

          {/* 7. CANDIDATE COMPARISON TABLE (LAYER A VS LAYER B) */}
          <div className="bg-white p-5 sm:p-7 rounded-3xl border border-amber-900/10 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h4 className="font-serif text-lg font-bold text-slate-900">
                  Candidate Comparison Matrix
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Separating Shastric rule evidence (Layer A) from engineering aggregation &amp; proximity prior (Layer B).
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Evaluated {report.totalCandidatesEvaluated} candidates ({report.stepIntervalMinutes}m step)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500 bg-slate-50">
                    <th className="p-3">Time</th>
                    <th className="p-3">Offset</th>
                    <th className="p-3">Ascendant</th>
                    <th className="p-3">Nakshatra</th>
                    <th className="p-3">KP Sub-Lord</th>
                    <th className="p-3">D9/D10 (Diag)</th>
                    <th className="p-3 text-right">Parashari</th>
                    <th className="p-3 text-right">KP</th>
                    <th className="p-3 text-right">Jaimini</th>
                    <th className="p-3 text-right font-black text-amber-900">Shastric (Layer A)</th>
                    <th className="p-3 text-right font-bold text-slate-700">Prior (B)</th>
                    <th className="p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {report.candidateComparison.map((cand) => {
                    const isStrongest = cand.timeStr === report.strongestCandidate.timeStr;
                    return (
                      <tr
                        key={cand.timeStr}
                        onClick={() => setSelectedCandidateForDetail(cand)}
                        className={`hover:bg-amber-50/50 transition-colors cursor-pointer ${
                          isStrongest ? "bg-amber-50/80 font-semibold" : ""
                        }`}
                      >
                        <td className="p-3 font-mono font-bold text-slate-900 flex items-center gap-1.5">
                          {isStrongest && <span className="w-2 h-2 rounded-full bg-amber-500"></span>}
                          <span>{cand.timeStr}</span>
                        </td>
                        <td className="p-3 font-mono text-slate-600">
                          {cand.totalMinutesOffset >= 0 ? `+${cand.totalMinutesOffset}` : cand.totalMinutesOffset}m
                        </td>
                        <td className="p-3 text-slate-800">
                          {cand.ascendantSign} ({(cand.ascendantDegree % 30).toFixed(1)}°)
                        </td>
                        <td className="p-3 text-slate-700">{cand.ascendantNakshatra}</td>
                        <td className="p-3 font-bold text-amber-900">{cand.ascendantSubLord}</td>
                        <td className="p-3 text-slate-500">
                          {cand.d9LagnaSign.substring(0, 3)} / {cand.d10LagnaSign.substring(0, 3)}
                        </td>
                        <td className="p-3 text-right text-slate-700">{cand.parashariScore.toFixed(1)}</td>
                        <td className="p-3 text-right text-slate-700">{cand.kpScore.toFixed(1)}</td>
                        <td className="p-3 text-right text-slate-700">{cand.jaiminiScore.toFixed(1)}</td>
                        <td className="p-3 text-right font-black text-amber-900 bg-amber-100/30">
                          {cand.shastricEvidenceScore.toFixed(1)}
                        </td>
                        <td className="p-3 text-right text-slate-600">
                          {(cand.physicalClueScore + cand.proximityScore).toFixed(1)}
                        </td>
                        <td className="p-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              cand.evidenceStatus === "High"
                                ? "bg-emerald-100 text-emerald-800"
                                : cand.evidenceStatus === "Moderate"
                                ? "bg-amber-100 text-amber-900"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {cand.evidenceStatus}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 leading-relaxed">
              <strong>Architectural Separation:</strong> <em>Shastric Evidence Score (Layer A)</em> reflects
              pure classical rule matches across Parashari Vimshottari, KP Placidus Cusps, and Jaimini Karakas.
              Recorded-time proximity prior and physical temperament act strictly as secondary tie-breakers
              (Layer B) and can never override superior Shastric evidence.
            </div>
          </div>

          {/* 8. EVENT-BY-EVENT EVIDENCE BREAKDOWN FOR SELECTED CANDIDATE */}
          {selectedCandidateForDetail && (
            <div className="bg-white p-5 sm:p-7 rounded-3xl border border-amber-900/10 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h4 className="font-serif text-lg font-bold text-slate-900">
                    Event-by-Event Evidence Breakdown ({selectedCandidateForDetail.timeStr} IST)
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    How each recorded milestone correlates with this candidate's chart under classical rules.
                  </p>
                </div>
                <span className="text-xs font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                  {selectedCandidateForDetail.matchedEventsCount} of {events.length} Milestones Validated
                </span>
              </div>

              {selectedCandidateForDetail.eventMatches.length === 0 ? (
                <p className="text-xs text-slate-500 italic p-4 text-center">
                  No life events were entered to cross-examine.
                </p>
              ) : (
                <div className="space-y-4">
                  {selectedCandidateForDetail.eventMatches.map((m) => (
                    <div
                      key={m.eventId}
                      className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3 text-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{m.eventType}</span>
                          <span className="text-[10px] text-slate-500 font-mono">({m.eventDateDisplay})</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              m.ruleCategory === "SPECIALIZED_CLASSICAL_RULE"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {m.ruleCategory === "SPECIALIZED_CLASSICAL_RULE"
                              ? "Specialized Classical Rule"
                              : "Generic Supporting Rule"}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-600 uppercase">
                          Weight: {m.weightedScore} pts
                        </span>
                      </div>

                      {/* Structured Evidence Items */}
                      {m.evidenceItems && m.evidenceItems.length > 0 ? (
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                            Methodology Rule Evaluations:
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                            {m.evidenceItems.map((item, iIdx) => (
                              <div
                                key={iIdx}
                                className={`p-3 rounded-xl border ${
                                  item.matched
                                    ? "bg-emerald-50/70 border-emerald-300 text-emerald-950"
                                    : "bg-slate-100/70 border-slate-200 text-slate-700"
                                } space-y-1`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-[11px]">{item.methodology} Rule</span>
                                  <span
                                    className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                                      item.matched
                                        ? "bg-emerald-200 text-emerald-900"
                                        : "bg-slate-200 text-slate-600"
                                    }`}
                                  >
                                    {item.matched ? "Matched" : "Unfulfilled"}
                                  </span>
                                </div>
                                <p className="text-[10px] leading-relaxed font-medium">{item.notes}</p>
                                <div className="pt-1 flex items-center gap-1 text-[9px] text-slate-500">
                                  <BookOpen className="w-3 h-3 text-slate-400 shrink-0" />
                                  <span className="truncate">{item.provenance}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1 text-[11px]">
                          <div
                            className={`p-2.5 rounded-xl border ${
                              m.parashariSupport
                                ? "bg-emerald-50/60 border-emerald-200 text-emerald-950"
                                : "bg-slate-100/60 border-slate-200 text-slate-700"
                            }`}
                          >
                            <span className="font-bold block mb-0.5">
                              Vedic / Parashari: {m.parashariSupport ? "✓ Aligned" : "— Neutral"}
                            </span>
                            <p className="text-[10px] leading-relaxed">{m.parashariNotes}</p>
                          </div>

                          <div
                            className={`p-2.5 rounded-xl border ${
                              m.kpSupport
                                ? "bg-emerald-50/60 border-emerald-200 text-emerald-950"
                                : "bg-slate-100/60 border-slate-200 text-slate-700"
                            }`}
                          >
                            <span className="font-bold block mb-0.5">
                              KP Sub-Lord: {m.kpSupport ? "✓ Signified" : "— Neutral"}
                            </span>
                            <p className="text-[10px] leading-relaxed">{m.kpNotes}</p>
                          </div>

                          <div
                            className={`p-2.5 rounded-xl border ${
                              m.jaiminiSupport
                                ? "bg-emerald-50/60 border-emerald-200 text-emerald-950"
                                : "bg-slate-100/60 border-slate-200 text-slate-700"
                            }`}
                          >
                            <span className="font-bold block mb-0.5">
                              Jaimini Karaka: {m.jaiminiSupport ? "✓ Harmonious" : "— Neutral"}
                            </span>
                            <p className="text-[10px] leading-relaxed">{m.jaiminiNotes}</p>
                          </div>
                        </div>
                      )}

                      {m.contradictionDetected && (
                        <div className="bg-rose-50 border border-rose-200 p-2.5 rounded-xl text-rose-900 text-[11px] font-semibold">
                          {m.contradictionReason}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 9. CONFIRMATION / PREVIEW MODAL BEFORE APPLYING PROFILE TIME */}
      {showConfirmationModal && report && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6">
            <div className="space-y-2 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-2">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900">
                Confirm Rectified Birth Time
              </h3>
              <p className="text-xs text-slate-600">
                You are about to update your birth chart profile to the evidence-supported candidate time.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Previously Recorded Time:</span>
                <span className="font-mono font-bold text-slate-800">{report.recordedTime} IST</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Supported Window:</span>
                <span className="font-mono font-bold text-amber-900">
                  {report.supportedWindowStart} – {report.supportedWindowEnd} IST
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-900 font-bold">New Rectified Birth Time:</span>
                <span className="font-mono text-base font-black text-amber-800">
                  {report.strongestCandidate.timeStr} IST
                </span>
              </div>
            </div>

            <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
              <strong>Next Step After Applying:</strong> Your birth profile time will update to{" "}
              <strong>{report.strongestCandidate.timeStr} IST</strong>. Then, click the{" "}
              <strong>&ldquo;GENERATE / RECALCULATE&rdquo;</strong> button in the birth bar to recalculate all 8
              astrology systems with your new verified rising degree.
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="w-1/2 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyTime}
                className="w-1/2 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-300 font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                Apply to Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
