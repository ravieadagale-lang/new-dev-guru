import React, { useState, useEffect } from "react";
import { UserProfile } from "../../types";
import { 
  User, 
  Calendar, 
  Clock, 
  MapPin, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  RotateCcw, 
  Compass, 
  Sliders, 
  Users, 
  Plus, 
  Save,
  Globe
} from "lucide-react";
import { playCardHoverSound, playCardFlipSound } from "../../utils/audioEffects";
import { calculateLagna, generatePlanetaryPositions, RASHIS } from "../../data/astrologyData";

export interface CityPreset {
  name: string;
  country: string;
  lat: number;
  lng: number;
  tzOffsetStr: string; // e.g. "+05:30"
  timezoneName: string;
}

export const TOP_CITIES_PRESETS: CityPreset[] = [
  { name: "New Delhi", country: "India", lat: 28.6139, lng: 77.2090, tzOffsetStr: "+05:30", timezoneName: "Asia/Kolkata" },
  { name: "Mumbai", country: "India", lat: 19.0760, lng: 72.8777, tzOffsetStr: "+05:30", timezoneName: "Asia/Kolkata" },
  { name: "Bengaluru", country: "India", lat: 12.9716, lng: 77.5946, tzOffsetStr: "+05:30", timezoneName: "Asia/Kolkata" },
  { name: "Kolkata", country: "India", lat: 22.5726, lng: 88.3639, tzOffsetStr: "+05:30", timezoneName: "Asia/Kolkata" },
  { name: "Chennai", country: "India", lat: 13.0827, lng: 80.2707, tzOffsetStr: "+05:30", timezoneName: "Asia/Kolkata" },
  { name: "Hyderabad", country: "India", lat: 17.3850, lng: 78.4867, tzOffsetStr: "+05:30", timezoneName: "Asia/Kolkata" },
  { name: "Pune", country: "India", lat: 18.5204, lng: 73.8567, tzOffsetStr: "+05:30", timezoneName: "Asia/Kolkata" },
  { name: "Ahmedabad", country: "India", lat: 23.0225, lng: 72.5714, tzOffsetStr: "+05:30", timezoneName: "Asia/Kolkata" },
  { name: "Jaipur", country: "India", lat: 26.9124, lng: 75.7873, tzOffsetStr: "+05:30", timezoneName: "Asia/Kolkata" },
  { name: "Varanasi", country: "India", lat: 25.3176, lng: 82.9739, tzOffsetStr: "+05:30", timezoneName: "Asia/Kolkata" },
  { name: "Lucknow", country: "India", lat: 26.8467, lng: 80.9462, tzOffsetStr: "+05:30", timezoneName: "Asia/Kolkata" },
  { name: "Chandigarh", country: "India", lat: 30.7333, lng: 76.7794, tzOffsetStr: "+05:30", timezoneName: "Asia/Kolkata" },
  { name: "Patna", country: "India", lat: 25.5941, lng: 85.1376, tzOffsetStr: "+05:30", timezoneName: "Asia/Kolkata" },
  { name: "Indore", country: "India", lat: 22.7196, lng: 75.8577, tzOffsetStr: "+05:30", timezoneName: "Asia/Kolkata" },
  { name: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708, tzOffsetStr: "+04:00", timezoneName: "Asia/Dubai" },
  { name: "London", country: "UK", lat: 51.5074, lng: -0.1278, tzOffsetStr: "+01:00", timezoneName: "Europe/London" },
  { name: "New York", country: "USA", lat: 40.7128, lng: -74.0060, tzOffsetStr: "-04:00", timezoneName: "America/New_York" },
  { name: "San Francisco", country: "USA", lat: 37.7749, lng: -122.4194, tzOffsetStr: "-07:00", timezoneName: "America/Los_Angeles" },
  { name: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832, tzOffsetStr: "-04:00", timezoneName: "America/Toronto" },
  { name: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198, tzOffsetStr: "+08:00", timezoneName: "Asia/Singapore" },
  { name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093, tzOffsetStr: "+10:00", timezoneName: "Australia/Sydney" },
];

interface AstrologyBirthInputBarProps {
  userProfile?: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  calculatedLagna: string;
}

export const AstrologyBirthInputBar: React.FC<AstrologyBirthInputBarProps> = ({
  userProfile,
  onUpdateProfile,
  calculatedLagna
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showAdvancedCoords, setShowAdvancedCoords] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form states with defensive null-safety
  const [name, setName] = useState<string>(userProfile?.name || "Aarav Sharma");
  const [gender, setGender] = useState<"male" | "female" | "other">(userProfile?.gender || "male");
  const [dob, setDob] = useState<string>(userProfile?.dob || userProfile?.birthDetails?.dateOfBirth || "1995-08-15");
  const [time, setTime] = useState<string>(userProfile?.time || userProfile?.birthDetails?.timeOfBirth || "10:30");
  const [place, setPlace] = useState<string>(userProfile?.place || userProfile?.birthDetails?.placeOfBirth || "New Delhi, India");
  const [latitude, setLatitude] = useState<number>(userProfile?.latitude ?? userProfile?.birthDetails?.latitude ?? 28.6139);
  const [longitude, setLongitude] = useState<number>(userProfile?.longitude ?? userProfile?.birthDetails?.longitude ?? 77.2090);
  const [timezone, setTimezone] = useState<string>(userProfile?.timezone || userProfile?.birthDetails?.timezone || "Asia/Kolkata");

  // Keep form in sync when prop changes
  useEffect(() => {
    setName(userProfile?.name || "Aarav Sharma");
    setGender(userProfile?.gender || "male");
    setDob(userProfile?.dob || userProfile?.birthDetails?.dateOfBirth || "1995-08-15");
    setTime(userProfile?.time || userProfile?.birthDetails?.timeOfBirth || "10:30");
    setPlace(userProfile?.place || userProfile?.birthDetails?.placeOfBirth || "New Delhi, India");
    setLatitude(userProfile?.latitude ?? userProfile?.birthDetails?.latitude ?? 28.6139);
    setLongitude(userProfile?.longitude ?? userProfile?.birthDetails?.longitude ?? 77.2090);
    setTimezone(userProfile?.timezone || userProfile?.birthDetails?.timezone || "Asia/Kolkata");
  }, [userProfile]);

  const handleCitySelect = (city: CityPreset) => {
    playCardHoverSound();
    setPlace(`${city.name}, ${city.country}`);
    setLatitude(city.lat);
    setLongitude(city.lng);
    setTimezone(city.timezoneName);
  };

  const handleCalculateKundli = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    playCardFlipSound();

    const cleanName = name.trim() || "Seeker";
    const cleanDob = dob || "1995-08-15";
    const cleanTime = time || "10:30";
    const cleanPlace = place.trim() || "New Delhi, India";

    // Recalculate Lagna & Planets dynamically
    const newLagna = calculateLagna(cleanDob, cleanTime, cleanPlace);
    const newChart = generatePlanetaryPositions(cleanDob, cleanTime, cleanPlace, newLagna);
    
    const moon = newChart.planets.find(p => p.name === "Moon");
    const sun = newChart.planets.find(p => p.name === "Sun");

    const newRashi = moon?.sign || userProfile?.rashi || "Taurus";
    const newNakshatra = moon?.nakshatra || userProfile?.nakshatra || "Rohini";
    const newPada = moon?.pada || userProfile?.nakshatraPada || 2;
    const newSunSign = sun?.sign || userProfile?.sunSign || "Leo";

    const updatedProfile: UserProfile = {
      ...(userProfile || {}),
      id: userProfile?.id || "usr-001",
      name: cleanName,
      gender,
      dob: cleanDob,
      time: cleanTime,
      place: cleanPlace,
      latitude,
      longitude,
      timezone,
      lagna: newLagna,
      rashi: newRashi,
      nakshatra: newNakshatra,
      nakshatraPada: newPada,
      sunSign: newSunSign,
    };

    // Save to parent & localStorage
    onUpdateProfile(updatedProfile);

    // Save into saved profiles collection
    try {
      const existingSaved = localStorage.getItem("astronext_saved_profiles");
      let list = existingSaved ? JSON.parse(existingSaved) : [];
      if (!Array.isArray(list)) list = [];
      
      const newEntry = {
        id: `prof-${Date.now()}`,
        relation: "self",
        name: cleanName,
        gender,
        dob: cleanDob,
        time: cleanTime,
        place: cleanPlace,
        latitude,
        longitude,
        timezone,
        ayanamsha: "Lahiri",
        houseSystem: "Whole Sign",
        chartStyle: "north"
      };

      const existingIndex = list.findIndex((p: any) => p.name.toLowerCase() === cleanName.toLowerCase());
      if (existingIndex >= 0) {
        list[existingIndex] = { ...list[existingIndex], ...newEntry, id: list[existingIndex].id };
      } else {
        list.unshift(newEntry);
      }
      localStorage.setItem("astronext_saved_profiles", JSON.stringify(list.slice(0, 10)));
    } catch {
      // ignore
    }

    setSuccessMessage(`✨ Kundli generated for ${cleanName}! Lagna: ${newLagna} • Moon Rashi: ${newRashi} • Nakshatra: ${newNakshatra}`);
    setIsExpanded(false);

    setTimeout(() => {
      setSuccessMessage(null);
    }, 6000);
  };

  return (
    <div className="bg-gradient-to-r from-[#1C1815] via-[#241F1A] to-[#161311] rounded-3xl border border-amber-500/30 shadow-xl overflow-hidden text-amber-100 transition-all duration-300">
      {/* 1. TOP HEADER SUMMARY & EXPAND TOGGLE */}
      <div className="p-4 sm:p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3.5 flex-1 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-300 shadow-inner">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Active Birth Chart
              </span>
              <span className="text-xs text-amber-200/70 font-medium">
                {userProfile?.dob || "1995-08-15"} at {userProfile?.time || "10:30"} • {userProfile?.place || "New Delhi, India"}
              </span>
            </div>

            <div className="flex items-center gap-2.5 mt-1 flex-wrap">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight truncate">
                {userProfile?.name || "Aarav Sharma"}
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-slate-900/90 text-amber-300 border border-amber-500/30">
                Lagna: {calculatedLagna || userProfile?.lagna || "Aries"}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-slate-900/90 text-amber-300 border border-amber-500/30">
                Rashi: {userProfile?.rashi || "Taurus"}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-slate-900/90 text-amber-300 border border-amber-500/30">
                Nakshatra: {userProfile?.nakshatra || "Rohini"}
              </span>
            </div>
          </div>
        </div>

        {/* Change Details / Expand Button */}
        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
          <button
            onClick={() => {
              playCardFlipSound();
              setIsExpanded(!isExpanded);
            }}
            className={`w-full md:w-auto px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
              isExpanded 
                ? "bg-amber-400 text-slate-950 hover:bg-amber-300 ring-2 ring-amber-300"
                : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isExpanded ? "Close Birth Form" : "✏️ Enter / Edit Birth Details"}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* SUCCESS NOTIFICATION BANNER */}
      {successMessage && (
        <div className="bg-emerald-950/80 border-y border-emerald-500/40 px-5 py-2.5 text-xs text-emerald-200 flex items-center justify-between gap-2 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold">{successMessage}</span>
          </div>
          <button
            onClick={() => setSuccessMessage(null)}
            className="text-emerald-400 hover:text-emerald-200 text-xs font-mono font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* 2. EXPANDABLE BIRTH DETAILS INPUT FORM */}
      {isExpanded && (
        <form 
          onSubmit={handleCalculateKundli}
          className="border-t border-amber-500/20 bg-slate-950/90 p-5 sm:p-7 space-y-6 animate-in slide-in-from-top-2 duration-300"
        >
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-amber-200 flex items-center gap-2">
                <User className="w-4 h-4 text-amber-400" />
                <span>Calculate Kundli for Any Person</span>
              </h3>
              <p className="text-xs text-amber-100/70 mt-0.5">
                Enter name, date, time, and birthplace for instant Swiss-Ephemeris precision planetary calculations.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setName("");
                setDob("1998-01-01");
                setTime("12:00");
                setPlace("New Delhi, India");
                setLatitude(28.6139);
                setLongitude(77.2090);
                setTimezone("Asia/Kolkata");
              }}
              className="text-xs text-amber-300/80 hover:text-amber-200 flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Form</span>
            </button>
          </div>

          {/* Primary Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Verma / Priya Singh"
                className="w-full bg-slate-900 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-500"
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5">
                Gender Identification
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(["male", "female", "other"] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`py-2 px-1 text-xs rounded-xl border font-bold capitalize transition-all ${
                      gender === g
                        ? "bg-amber-400 text-slate-950 border-amber-300 shadow-sm"
                        : "bg-slate-900 text-amber-100/80 border-slate-800 hover:bg-slate-800"
                    }`}
                  >
                    {g === "male" ? "Male ♂" : g === "female" ? "Female ♀" : "Other ⚧"}
                  </button>
                ))}
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Date of Birth
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-slate-900 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>

            {/* Time of Birth */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Exact Time of Birth (24h)
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-slate-900 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>
          </div>

          {/* Place of Birth & Quick City Presets */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Place of Birth (City, State / Country)
              </label>
              <input
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="e.g. New Delhi, Mumbai, London, New York..."
                className="w-full bg-slate-900 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-500"
                required
              />
            </div>

            {/* Quick Popular Cities Selector Chips */}
            <div>
              <div className="flex items-center justify-between text-xs text-amber-200/70 mb-1.5">
                <span>⚡ Quick Select Popular Birth Cities:</span>
                <span className="text-[11px] text-amber-400 font-mono">Auto-populates Lat/Long/Timezone</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {TOP_CITIES_PRESETS.map((city) => {
                  const isSelected = place.toLowerCase().includes(city.name.toLowerCase());
                  return (
                    <button
                      key={city.name}
                      type="button"
                      onClick={() => handleCitySelect(city)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                        isSelected 
                          ? "bg-amber-400 text-slate-950 font-bold shadow-xs scale-105"
                          : "bg-slate-900 hover:bg-slate-800 text-amber-200/90 border border-amber-500/20"
                      }`}
                    >
                      <span>{city.country === "India" ? "🇮🇳" : city.country === "UAE" ? "🇦🇪" : city.country === "UK" ? "🇬🇧" : city.country === "USA" ? "🇺🇸" : city.country === "Canada" ? "🇨🇦" : city.country === "Singapore" ? "🇸🇬" : "🇦🇺"}</span>
                      <span>{city.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Advanced Coordinates & Timezone Accordion Toggle */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowAdvancedCoords(!showAdvancedCoords)}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{showAdvancedCoords ? "Hide Advanced Geographic Coordinates" : "Advanced: Edit Exact Latitude, Longitude & Timezone"}</span>
              {showAdvancedCoords ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showAdvancedCoords && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 mt-2 bg-slate-900/80 rounded-2xl border border-amber-500/20 text-xs animate-in fade-in">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Latitude (° Decimal)</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={latitude}
                    onChange={(e) => setLatitude(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Longitude (° Decimal)</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={longitude}
                    onChange={(e) => setLongitude(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Timezone IANA Name</label>
                  <input
                    type="text"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    placeholder="e.g. Asia/Kolkata"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-3 border-t border-amber-500/20">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs transition-colors border border-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm transition-all shadow-lg hover:shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>✨ Generate My Kundli & Predictions</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
