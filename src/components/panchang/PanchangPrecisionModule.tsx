import React, { useState, useMemo, useEffect } from "react";
import {
  calculatePrecisionPanchang,
  PrecisionPanchangResult
} from "../../engine/panchangPrecisionEngine";
import { GLOBAL_CITIES, CityLocation } from "../../utils/vedicAstronomicalEngine";
import { AyanamsaSystemName } from "../../engine/ayanamsaEngine";
import {
  Compass,
  MapPin,
  Clock,
  Sun,
  Moon,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Info,
  CheckCircle2,
  Navigation,
  Copy,
  Check,
  Layers,
  Activity,
  Calendar
} from "lucide-react";

interface PanchangPrecisionModuleProps {
  initialDate?: string; // YYYY-MM-DD
  initialCity?: CityLocation;
  onSyncLocationToParent?: (city: CityLocation) => void;
}

const AYANAMSA_OPTIONS: { id: AyanamsaSystemName; label: string; desc: string }[] = [
  { id: "lahiri", label: "Chitra Paksha / Lahiri", desc: "Official Indian Astronomical Standard (Surya Siddhanta calibrated)" },
  { id: "krishnamurti", label: "KP (Krishnamurti Padhdhati)", desc: "Tailored for stellar sub-lord astrology" },
  { id: "raman", label: "B.V. Raman", desc: "Traditional South Indian astrological baseline" },
  { id: "sayana", label: "Sayana (Tropical / 0°)", desc: "Vernal equinox aligned reference without precession subtraction" },
  { id: "fagan_bradley", label: "Fagan-Bradley", desc: "Western sidereal standard calibrated to Aldebaran" },
  { id: "yukteshwar", label: "Sri Yukteswar", desc: "Yuga-cycle cosmic epoch calibration" }
];

export const PanchangPrecisionModule: React.FC<PanchangPrecisionModuleProps> = ({
  initialDate,
  initialCity,
  onSyncLocationToParent
}) => {
  // Input States
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return initialDate || new Date().toISOString().split("T")[0];
  });

  const [useInstantTime, setUseInstantTime] = useState<boolean>(true);
  const [customTime, setCustomTime] = useState<string>(() => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  });

  const [latitude, setLatitude] = useState<number>(() => initialCity?.latitude ?? 28.6139);
  const [longitude, setLongitude] = useState<number>(() => initialCity?.longitude ?? 77.2090);
  const [tzOffset, setTzOffset] = useState<number>(() => initialCity?.timezoneOffsetHours ?? 5.5);
  const [locationName, setLocationName] = useState<string>(() => initialCity?.name ?? "New Delhi, India");
  const [selectedAyanamsa, setSelectedAyanamsa] = useState<AyanamsaSystemName>("lahiri");

  const [gpsLoading, setGpsLoading] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [copiedTelemetry, setCopiedTelemetry] = useState<boolean>(false);
  const [showTelemetryModal, setShowTelemetryModal] = useState<boolean>(false);

  // Sync when initialCity changes from parent
  useEffect(() => {
    if (initialCity) {
      setLatitude(initialCity.latitude);
      setLongitude(initialCity.longitude);
      setTzOffset(initialCity.timezoneOffsetHours);
      setLocationName(`${initialCity.name}, ${initialCity.country}`);
    }
  }, [initialCity]);

  // Sync date when initialDate changes from parent
  useEffect(() => {
    if (initialDate) {
      setSelectedDate(initialDate);
    }
  }, [initialDate]);

  // GPS Geolocation Handler
  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      setGpsError("Geolocation is not supported by your browser environment.");
      return;
    }

    setGpsLoading(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = Number(pos.coords.latitude.toFixed(4));
        const lng = Number(pos.coords.longitude.toFixed(4));
        const estimatedTzOffset = Number((-new Date().getTimezoneOffset() / 60).toFixed(2));
        setLatitude(lat);
        setLongitude(lng);
        setTzOffset(estimatedTzOffset);
        setLocationName(`Current GPS (${lat}°, ${lng}°)`);
        setGpsLoading(false);

        if (onSyncLocationToParent) {
          onSyncLocationToParent({
            name: `GPS (${lat}°, ${lng}°)`,
            country: "Local",
            latitude: lat,
            longitude: lng,
            timezone: "Local",
            timezoneOffsetHours: estimatedTzOffset
          });
        }
      },
      (err) => {
        setGpsLoading(false);
        setGpsError(err.message || "Unable to retrieve device coordinates.");
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Preset City Selector Handler
  const handleSelectCityPreset = (cityName: string) => {
    const found = GLOBAL_CITIES.find((c) => c.name === cityName);
    if (found) {
      setLatitude(found.latitude);
      setLongitude(found.longitude);
      setTzOffset(found.timezoneOffsetHours);
      setLocationName(`${found.name}, ${found.country}`);
      if (onSyncLocationToParent) {
        onSyncLocationToParent(found);
      }
    }
  };

  // High-Precision Engine Calculation (Memoized)
  const precisionData: PrecisionPanchangResult = useMemo(() => {
    const timeParam = useInstantTime
      ? `${String(new Date().getHours()).padStart(2, "0")}:${String(new Date().getMinutes()).padStart(2, "0")}:${String(new Date().getSeconds()).padStart(2, "0")}`
      : `${customTime}:00`;

    return calculatePrecisionPanchang({
      date: selectedDate,
      time: timeParam,
      latitude,
      longitude,
      timezoneOffsetHours: tzOffset,
      ayanamsaSystem: selectedAyanamsa,
      cityName: locationName
    });
  }, [selectedDate, useInstantTime, customTime, latitude, longitude, tzOffset, selectedAyanamsa, locationName]);

  // Copy Telemetry payload
  const handleCopyTelemetry = () => {
    const telemetry = `=== DEV-GURU PANCHANG PRECISION TELEMETRY ===
Evaluation Timestamp: ${precisionData.evalTimestamp.toISOString()}
Coordinates: ${latitude}° N, ${longitude}° E (Timezone: UTC ${tzOffset >= 0 ? `+${tzOffset}` : tzOffset})
Ayanamsa: ${precisionData.ayanamsa.system.toUpperCase()} (${precisionData.ayanamsa.dms})
Julian Day (JD): ${precisionData.evalJd.toFixed(6)}

--- SOLAR & LUNAR EPHEMERIS ---
Sun Sidereal: ${precisionData.solarEphemeris.siderealDms} (${precisionData.solarEphemeris.rashi})
Moon Sidereal: ${precisionData.lunarEphemeris.siderealDms} (${precisionData.lunarEphemeris.rashi})
Elongation (Δλ = Moon - Sun): ${precisionData.tithi.instantaneous.elongationDms}
Nitya Yoga Sum Angle (Sun + Moon): ${precisionData.yoga.yogaAngleDms}

--- FIVE PILLARS ---
1. TITHI: ${precisionData.tithi.instantaneous.fullName}
   Category: ${precisionData.tithi.instantaneous.category} | Deity: ${precisionData.tithi.instantaneous.deity} | Tatwa: ${precisionData.tithi.instantaneous.tatwa}
   Elapsed: ${precisionData.tithi.instantaneous.elapsedDms} / 12° 00' 00" (${precisionData.tithi.instantaneous.progressPct}%)
   Duration: ${precisionData.tithi.instantaneous.startTimeFormatted} to ${precisionData.tithi.instantaneous.endTimeFormatted} (${precisionData.tithi.instantaneous.durationHours}h)
   Sunrise Udaya Tithi: ${precisionData.tithi.udaya.fullName}
   Status: ${precisionData.tithi.tithiAnomaly} (${precisionData.tithi.anomalyDescription})

2. KARANA: #${precisionData.karana.index} ${precisionData.karana.name} (${precisionData.karana.type})
   Lord: ${precisionData.karana.ruler} | Deity: ${precisionData.karana.deity}
   Elapsed: ${precisionData.karana.elapsedDms} / 6° 00' 00" (${precisionData.karana.progressPct}%)
   Duration: ${precisionData.karana.startTimeFormatted} to ${precisionData.karana.endTimeFormatted} (${precisionData.karana.durationHours}h)
   ${precisionData.karana.bhadraDetails ? `Bhadra Alert: Active in ${precisionData.karana.bhadraDetails.vasLocation}\nMukha (Poisonous): ${precisionData.karana.bhadraDetails.mukhaTimeFormatted}\nPuchha (Benefic): ${precisionData.karana.bhadraDetails.puchhaTimeFormatted}` : "Bhadra: Not Active"}

3. YOGA: #${precisionData.yoga.index} ${precisionData.yoga.name} (${precisionData.yoga.isAuspicious ? "Shubha / Auspicious" : "Ashubha / Inauspicious"})
   Meaning: ${precisionData.yoga.meaning} | Deity: ${precisionData.yoga.deity} | Ruler: ${precisionData.yoga.ruler}
   Elapsed: ${precisionData.yoga.elapsedDms} / 13° 20' 00" (${precisionData.yoga.progressPct}%)
   Duration: ${precisionData.yoga.startTimeFormatted} to ${precisionData.yoga.endTimeFormatted} (${precisionData.yoga.durationHours}h)
   Dosha Span: ${precisionData.yoga.doshaSpanDescription || "None"}

4. NAKSHATRA: ${precisionData.nakshatra.name} (Pada ${precisionData.nakshatra.pada}, Lord: ${precisionData.nakshatra.lord})
   Duration: ${precisionData.nakshatra.startTimeFormatted} to ${precisionData.nakshatra.endTimeFormatted}

5. VARA: ${precisionData.vara.name} (${precisionData.vara.sanskrit}, Lord: ${precisionData.vara.lord})
Sunrise: ${precisionData.solarEvents.sunriseFormatted} | Sunset: ${precisionData.solarEvents.sunsetFormatted} | Dinamana: ${precisionData.solarEvents.dinamanaFormatted}
=================================================`;

    navigator.clipboard.writeText(telemetry).then(() => {
      setCopiedTelemetry(true);
      setTimeout(() => setCopiedTelemetry(false), 3000);
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. HERO CONSOLE BANNER */}
      <div className="bg-gradient-to-br from-[#11141B] via-[#1E232E] to-[#0F131A] rounded-3xl p-6 sm:p-8 border border-amber-500/30 text-amber-100 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>VSOP87 &amp; ELP2000-82 Ephemeris Precision Module</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Panchang Precision Architecture
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed font-sans">
              Continuous topocentric root-finding algorithms computing exact transition boundaries, arc seconds, and Shastric classifications for Tithi, Karana, and Yoga customized to your coordinates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleCopyTelemetry}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer hover:scale-102"
              title="Copy complete astronomical telemetry to clipboard"
            >
              {copiedTelemetry ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedTelemetry ? "Telemetry Copied!" : "Copy Telemetry"}</span>
            </button>

            <button
              onClick={() => setShowTelemetryModal(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg transition-all flex items-center gap-1.5 cursor-pointer hover:scale-102"
            >
              <Activity className="w-4 h-4" />
              <span>Diagnostics Console</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. GEODETIC COORDINATES & CONFIGURATION TOOLBAR */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-amber-900/10 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-amber-600" />
            <div>
              <h3 className="font-serif text-base font-bold text-slate-900">
                Astronomical Observer Coordinates
              </h3>
              <p className="text-xs text-slate-500">
                Calculations dynamically adjust to your exact geographic latitude, longitude, and elevation
              </p>
            </div>
          </div>

          <button
            onClick={handleDetectGPS}
            disabled={gpsLoading}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer disabled:opacity-50"
          >
            <Compass className={`w-4 h-4 ${gpsLoading ? "animate-spin" : ""}`} />
            <span>{gpsLoading ? "Detecting Coordinates..." : "Use Device GPS"}</span>
          </button>
        </div>

        {gpsError && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{gpsError}</span>
          </div>
        )}

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
          {/* Preset City Dropdown */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
              Global Preset City
            </label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus-within:border-amber-500 focus-within:bg-white">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <select
                value={GLOBAL_CITIES.find((c) => Math.abs(c.latitude - latitude) < 0.05 && Math.abs(c.longitude - longitude) < 0.05)?.name || ""}
                onChange={(e) => handleSelectCityPreset(e.target.value)}
                className="bg-transparent text-slate-800 font-semibold w-full focus:outline-none cursor-pointer"
              >
                <option value="">Custom Coordinates</option>
                {GLOBAL_CITIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name} ({c.country})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Latitude */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
              Latitude (° North / South)
            </label>
            <input
              type="number"
              step="0.0001"
              value={latitude}
              onChange={(e) => setLatitude(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-500 font-mono font-bold text-slate-800 focus:outline-none"
              placeholder="e.g. 28.6139"
            />
          </div>

          {/* Longitude */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
              Longitude (° East / West)
            </label>
            <input
              type="number"
              step="0.0001"
              value={longitude}
              onChange={(e) => setLongitude(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-500 font-mono font-bold text-slate-800 focus:outline-none"
              placeholder="e.g. 77.2090"
            />
          </div>

          {/* Timezone Offset */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
              Timezone Offset (UTC Hours)
            </label>
            <input
              type="number"
              step="0.25"
              min="-12"
              max="14"
              value={tzOffset}
              onChange={(e) => setTzOffset(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-500 font-mono font-bold text-slate-800 focus:outline-none"
              placeholder="e.g. 5.5"
            />
          </div>

          {/* Ayanamsa System */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
              Ayanamsa Standard
            </label>
            <select
              value={selectedAyanamsa}
              onChange={(e) => setSelectedAyanamsa(e.target.value as AyanamsaSystemName)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-500 font-semibold text-slate-800 focus:outline-none cursor-pointer"
            >
              {AYANAMSA_OPTIONS.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date & Time Evaluation Bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800 focus:outline-none cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useInstantTime}
                  onChange={(e) => setUseInstantTime(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
                />
                <span className="text-slate-700 font-semibold">Live Current Minute</span>
              </label>

              {!useInstantTime && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <input
                    type="time"
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}
                    className="px-2.5 py-1 rounded-xl border border-slate-200 bg-slate-50 font-mono font-bold text-slate-800 focus:outline-none"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px]">
            <span>Ayanamsa: <strong className="text-slate-900">{precisionData.ayanamsa.dms}</strong></span>
            <span>&bull;</span>
            <span>Sunrise: <strong className="text-amber-800">{precisionData.solarEvents.sunriseFormatted}</strong></span>
            <span>&bull;</span>
            <span>Sunset: <strong className="text-amber-800">{precisionData.solarEvents.sunsetFormatted}</strong></span>
          </div>
        </div>
      </div>

      {/* 3. THREE CORE PILLARS: TITHI, KARANA, YOGA HIGH-PRECISION CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ========================================================= */}
        {/* PILLAR 1: TITHI PRECISION */}
        {/* ========================================================= */}
        <div className="bg-white rounded-3xl border border-amber-900/10 shadow-xs p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                Pillar 1 &bull; Lunar Day (Tithi)
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                {precisionData.tithi.instantaneous.category} Tithi
              </span>
            </div>

            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                {precisionData.tithi.instantaneous.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {precisionData.tithi.instantaneous.paksha} Paksha &bull; Deity: {precisionData.tithi.instantaneous.deity} &bull; Element: {precisionData.tithi.instantaneous.tatwa}
              </p>
            </div>

            {/* Arc Progress Meter */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-semibold">12° Lunar Elongation Arc</span>
                <span className="font-mono font-bold text-amber-900">{precisionData.tithi.instantaneous.progressPct}%</span>
              </div>
              <div className="w-full bg-amber-200/50 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-amber-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${precisionData.tithi.instantaneous.progressPct}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                <span>Elapsed: {precisionData.tithi.instantaneous.elapsedDms}</span>
                <span>Left: {precisionData.tithi.instantaneous.remainingDms}</span>
              </div>
            </div>

            {/* Timings */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Exact Start Time:</span>
                <strong className="text-slate-900 font-mono">{precisionData.tithi.instantaneous.startTimeFormatted}</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Exact End Time:</span>
                <strong className="text-slate-900 font-mono">{precisionData.tithi.instantaneous.endTimeFormatted}</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Calculated Duration:</span>
                <strong className="text-slate-900 font-mono">{precisionData.tithi.instantaneous.durationHours} hours</strong>
              </div>
            </div>

            {/* Udaya vs Tatkaal Tithi Indicator */}
            <div className="p-3 rounded-2xl bg-slate-900 text-amber-100 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-amber-400">Civil Sunrise Rule</span>
                <span className="text-[10px] font-semibold text-slate-400">Udaya Tithi</span>
              </div>
              <p className="font-serif font-bold text-sm text-white">
                {precisionData.tithi.udaya.fullName}
              </p>
              <p className="text-[11px] text-slate-300 leading-snug">
                {precisionData.tithi.tithiAnomaly === "Normal"
                  ? "Instantaneous Tithi synchronizes with the sunrise horizon."
                  : precisionData.tithi.anomalyDescription}
              </p>
            </div>
          </div>

          {/* Shastric Advice */}
          <div className="pt-3 border-t border-slate-100 text-xs space-y-1">
            <span className="font-bold text-slate-800 block">Recommended Undertakings:</span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              {precisionData.tithi.instantaneous.recommendedActivities}
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PILLAR 2: KARANA PRECISION & BHADRA ANALYZER */}
        {/* ========================================================= */}
        <div className="bg-white rounded-3xl border border-amber-900/10 shadow-xs p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-800">
                Pillar 2 &bull; Half-Tithi (Karana)
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                precisionData.karana.bhadraDetails
                  ? "bg-rose-100 text-rose-900"
                  : precisionData.karana.type === "Chara"
                  ? "bg-blue-100 text-blue-900"
                  : "bg-purple-100 text-purple-900"
              }`}>
                {precisionData.karana.type} (#{precisionData.karana.index}/60)
              </span>
            </div>

            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span>{precisionData.karana.name}</span>
                {precisionData.karana.bhadraDetails && (
                  <span className="text-xs px-2 py-0.5 rounded bg-rose-600 text-white font-sans font-bold">
                    Vishti / Bhadra
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Ruler: {precisionData.karana.ruler} &bull; Presiding Deity: {precisionData.karana.deity}
              </p>
            </div>

            {/* Arc Progress Meter */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-semibold">6° Half-Tithi Arc</span>
                <span className="font-mono font-bold text-indigo-900">{precisionData.karana.progressPct}%</span>
              </div>
              <div className="w-full bg-indigo-200/50 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${precisionData.karana.progressPct}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                <span>Elapsed: {precisionData.karana.elapsedDms}</span>
                <span>Left: {precisionData.karana.remainingDms}</span>
              </div>
            </div>

            {/* Timings */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Exact Start Time:</span>
                <strong className="text-slate-900 font-mono">{precisionData.karana.startTimeFormatted}</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Exact End Time:</span>
                <strong className="text-slate-900 font-mono">{precisionData.karana.endTimeFormatted}</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Calculated Duration:</span>
                <strong className="text-slate-900 font-mono">{precisionData.karana.durationHours} hours</strong>
              </div>
            </div>

            {/* In-depth Bhadra Diagnostic Console */}
            {precisionData.karana.bhadraDetails ? (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-rose-900 font-bold">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Bhadra Active &bull; {precisionData.karana.bhadraDetails.vasLocation}</span>
                </div>
                <p className="text-[11px] text-rose-800 leading-snug">
                  {precisionData.karana.bhadraDetails.vasEffect}
                </p>
                <div className="space-y-1 pt-1 border-t border-rose-200/60 font-mono text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-rose-900 font-semibold">Poisonous Face (Mukha):</span>
                    <span className="text-rose-700 font-bold">{precisionData.karana.bhadraDetails.mukhaTimeFormatted}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-900 font-semibold">Victorious Tail (Puchha):</span>
                    <span className="text-emerald-700 font-bold">{precisionData.karana.bhadraDetails.puchhaTimeFormatted}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs flex items-center gap-2 text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Bhadra Clear:</strong> Vishti Karana is inactive during this interval; favorable for commercial ventures.
                </span>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs space-y-1">
            <span className="font-bold text-slate-800 block">Karana Classification:</span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              {precisionData.karana.type === "Chara"
                ? "Movable (Chara) Karana rotates sequentially across the lunar month, favoring active dynamic endeavors."
                : "Fixed (Sthira) Karana anchors specific sacred days (Krishna Chaturdashi to Shukla Pratipada), favoring meditative and foundation works."}
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PILLAR 3: YOGA PRECISION */}
        {/* ========================================================= */}
        <div className="bg-white rounded-3xl border border-amber-900/10 shadow-xs p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                Pillar 3 &bull; Solar-Lunar Union (Yoga)
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                precisionData.yoga.isAuspicious
                  ? "bg-emerald-100 text-emerald-900"
                  : "bg-rose-100 text-rose-900"
              }`}>
                {precisionData.yoga.isAuspicious ? "Shubha / Auspicious" : "Ashubha / Caution"}
              </span>
            </div>

            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                {precisionData.yoga.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Yoga #{precisionData.yoga.index}/27 &bull; Ruler: {precisionData.yoga.ruler} &bull; Deity: {precisionData.yoga.deity}
              </p>
            </div>

            {/* Arc Progress Meter */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-semibold">13° 20' Combined Angle Arc</span>
                <span className="font-mono font-bold text-emerald-900">{precisionData.yoga.progressPct}%</span>
              </div>
              <div className="w-full bg-emerald-200/50 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${precisionData.yoga.progressPct}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                <span>Elapsed: {precisionData.yoga.elapsedDms}</span>
                <span>Left: {precisionData.yoga.remainingDms}</span>
              </div>
            </div>

            {/* Timings */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Exact Start Time:</span>
                <strong className="text-slate-900 font-mono">{precisionData.yoga.startTimeFormatted}</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Exact End Time:</span>
                <strong className="text-slate-900 font-mono">{precisionData.yoga.endTimeFormatted}</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Calculated Duration:</span>
                <strong className="text-slate-900 font-mono">{precisionData.yoga.durationHours} hours</strong>
              </div>
            </div>

            {/* Dosha Span or Auspiciousness Note */}
            {precisionData.yoga.doshaSpanDescription ? (
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-amber-900 font-bold">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Dosha Span Restriction</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-snug">
                  {precisionData.yoga.doshaSpanDescription}
                </p>
              </div>
            ) : (
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs flex items-center gap-2 text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Full Span Blessed:</strong> Free of initial ghatika restrictions; safe for noble undertakings.
                </span>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs space-y-1">
            <span className="font-bold text-slate-800 block">Shastric Guidance:</span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              {precisionData.yoga.specialAdvice}
            </p>
          </div>
        </div>
      </div>

      {/* 4. ASTRONOMICAL EPHEMERIS SUMMARY & COMPREHENSIVE GROUND TRUTH */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-slate-900">
              Astronomical Ephemeris Telemetry &amp; Celestial Positions
            </h3>
            <p className="text-xs text-slate-500">
              Exact celestial coordinates derived from apparent planetary ephemerides with {precisionData.ayanamsa.system.toUpperCase()} ayanamsa
            </p>
          </div>
          <button
            onClick={handleCopyTelemetry}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-800 transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            {copiedTelemetry ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedTelemetry ? "Copied" : "Export Ephemeris"}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-1">
            <span className="text-[10px] font-bold text-amber-800 uppercase block">Sun Sidereal Longitude</span>
            <strong className="text-slate-900 font-mono text-sm block">{precisionData.solarEphemeris.siderealDms}</strong>
            <span className="text-[10px] text-slate-500 block truncate">{precisionData.solarEphemeris.rashi}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-200/60 space-y-1">
            <span className="text-[10px] font-bold text-indigo-800 uppercase block">Moon Sidereal Longitude</span>
            <strong className="text-slate-900 font-mono text-sm block">{precisionData.lunarEphemeris.siderealDms}</strong>
            <span className="text-[10px] text-slate-500 block truncate">{precisionData.lunarEphemeris.rashi}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-600 uppercase block">Elongation (Δλ)</span>
            <strong className="text-slate-900 font-mono text-sm block">{precisionData.tithi.instantaneous.elongationDms}</strong>
            <span className="text-[10px] text-slate-500 block">Moon - Sun separation</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-600 uppercase block">Yoga Sum Angle</span>
            <strong className="text-slate-900 font-mono text-sm block">{precisionData.yoga.yogaAngleDms}</strong>
            <span className="text-[10px] text-slate-500 block">(Sun + Moon) mod 360°</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-600 uppercase block">Nakshatra &amp; Pada</span>
            <strong className="text-slate-900 font-serif text-sm block truncate">{precisionData.nakshatra.name}</strong>
            <span className="text-[10px] text-slate-500 block">Pada {precisionData.nakshatra.pada} &bull; {precisionData.nakshatra.lord}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-600 uppercase block">Vedic Solar Weekday</span>
            <strong className="text-slate-900 font-serif text-sm block truncate">{precisionData.vara.name}</strong>
            <span className="text-[10px] text-slate-500 block">{precisionData.vara.sanskrit} ({precisionData.vara.lord})</span>
          </div>
        </div>
      </div>

      {/* 5. DIAGNOSTICS & TELEMETRY MODAL */}
      {showTelemetryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-amber-600" />
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Precision Astronomical Diagnostics Console
                </h3>
              </div>
              <button
                onClick={() => setShowTelemetryModal(false)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-900 text-amber-100 font-mono space-y-2">
                <span className="text-[10px] uppercase text-amber-400 font-bold block">Internal Ephemeris State</span>
                <p>Evaluation Julian Date: {precisionData.evalJd.toFixed(8)}</p>
                <p>Latitude: {latitude.toFixed(6)}° N | Longitude: {longitude.toFixed(6)}° E</p>
                <p>Ayanamsa Value: {precisionData.ayanamsa.dms} ({precisionData.ayanamsa.system})</p>
                <p>Sun Geocentric Longitude: {precisionData.solarEphemeris.dms}</p>
                <p>Moon Geocentric Longitude: {precisionData.lunarEphemeris.dms}</p>
                <p>Lunar Distance: {Math.round(precisionData.lunarEphemeris.distanceKm).toLocaleString()} km</p>
                <p>Solar Distance: {precisionData.solarEphemeris.distanceAu.toFixed(6)} AU</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-sm font-bold text-slate-900">Mathematical Formulations</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="block text-slate-900 font-bold mb-1">Tithi Formulation</strong>
                    <code className="text-[10px] text-amber-800 block">Δλ = (λMoon - λSun) mod 360°</code>
                    <code className="text-[10px] text-slate-600 block">Index = ⌊Δλ / 12°⌋ + 1</code>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="block text-slate-900 font-bold mb-1">Karana Formulation</strong>
                    <code className="text-[10px] text-indigo-800 block">Index = ⌊Δλ / 6°⌋ + 1</code>
                    <code className="text-[10px] text-slate-600 block">7 Chara (x8) + 4 Sthira</code>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="block text-slate-900 font-bold mb-1">Yoga Formulation</strong>
                    <code className="text-[10px] text-emerald-800 block">Y = (λ*Sun + λ*Moon) mod 360°</code>
                    <code className="text-[10px] text-slate-600 block">Index = ⌊Y / 13° 20'⌋ + 1</code>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={handleCopyTelemetry}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Full Audit</span>
                </button>
                <button
                  onClick={() => setShowTelemetryModal(false)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
