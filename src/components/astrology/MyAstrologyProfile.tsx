import React, { useState } from "react";
import { UserProfile, LanguageCode } from "../../types";
import { 
  User, 
  Users, 
  Sparkles, 
  MapPin, 
  Clock, 
  Calendar, 
  Compass, 
  Sliders, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  ShieldCheck,
  RotateCcw,
  Globe
} from "lucide-react";
import { playCardHoverSound, playCardFlipSound } from "../../utils/audioEffects";
import { calculateLagna, generatePlanetaryPositions } from "../../data/astrologyData";

export type ProfileRelation = "self" | "partner" | "child" | "parent" | "other";

export interface SavedBirthProfile {
  id: string;
  relation: ProfileRelation;
  name: string;
  gender: "male" | "female" | "other";
  dob: string;
  time: string;
  place: string;
  latitude: number;
  longitude: number;
  timezone: string;
  ayanamsha: string;
  houseSystem: string;
  chartStyle: "north" | "south" | "east";
}

interface MyAstrologyProfileProps {
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  savedProfiles?: SavedBirthProfile[];
  onSelectProfile?: (profile: SavedBirthProfile) => void;
}

const DEFAULT_PROFILES: SavedBirthProfile[] = [
  {
    id: "prof-self",
    relation: "self",
    name: "Aarav Sharma",
    gender: "male",
    dob: "1995-08-15",
    time: "10:30",
    place: "New Delhi, India",
    latitude: 28.6139,
    longitude: 77.2090,
    timezone: "+05:30",
    ayanamsha: "Lahiri",
    houseSystem: "Whole Sign",
    chartStyle: "north"
  },
  {
    id: "prof-partner",
    relation: "partner",
    name: "Priya Sharma",
    gender: "female",
    dob: "1997-04-20",
    time: "14:15",
    place: "Mumbai, India",
    latitude: 19.0760,
    longitude: 72.8777,
    timezone: "+05:30",
    ayanamsha: "Lahiri",
    houseSystem: "Whole Sign",
    chartStyle: "north"
  },
  {
    id: "prof-child",
    relation: "child",
    name: "Vivaan Sharma",
    gender: "male",
    dob: "2022-11-05",
    time: "06:45",
    place: "New Delhi, India",
    latitude: 28.6139,
    longitude: 77.2090,
    timezone: "+05:30",
    ayanamsha: "Lahiri",
    houseSystem: "Whole Sign",
    chartStyle: "north"
  },
  {
    id: "prof-nishant",
    relation: "other",
    name: "Nishant Suryavanshi",
    gender: "male",
    dob: "1992-06-18",
    time: "11:20",
    place: "Pune, Maharashtra, India",
    latitude: 18.5204,
    longitude: 73.8567,
    timezone: "+05:30",
    ayanamsha: "Lahiri",
    houseSystem: "Whole Sign",
    chartStyle: "north"
  },
  {
    id: "prof-nirmal",
    relation: "other",
    name: "Nirmal Shaha",
    gender: "male",
    dob: "1988-12-04",
    time: "16:40",
    place: "Surat, Gujarat, India",
    latitude: 21.1702,
    longitude: 72.8311,
    timezone: "+05:30",
    ayanamsha: "Lahiri",
    houseSystem: "Whole Sign",
    chartStyle: "north"
  }
];

export const MyAstrologyProfile: React.FC<MyAstrologyProfileProps> = ({
  userProfile,
  onUpdateProfile
}) => {
  const [profiles, setProfiles] = useState<SavedBirthProfile[]>(() => {
    try {
      const saved = localStorage.getItem("astronext_saved_profiles");
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_PROFILES;
  });

  const [activeProfileId, setActiveProfileId] = useState<string>("prof-self");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);
  const [profileToDelete, setProfileToDelete] = useState<SavedBirthProfile | null>(null);

  // Form state for active editing
  const [formData, setFormData] = useState<SavedBirthProfile>(() => {
    return profiles.find(p => p.id === activeProfileId) || profiles[0] || DEFAULT_PROFILES[0];
  });

  const handleDeleteProfile = (profile: SavedBirthProfile) => {
    playCardFlipSound();
    const updated = profiles.filter(p => p.id !== profile.id);
    
    // If user deletes all profiles, fallback to a clean default profile
    const finalProfiles = updated.length > 0 ? updated : [
      {
        id: `prof-${Date.now()}`,
        relation: "self" as ProfileRelation,
        name: "My Profile",
        gender: "male" as const,
        dob: "1995-01-01",
        time: "12:00",
        place: "New Delhi, India",
        latitude: 28.6139,
        longitude: 77.2090,
        timezone: "+05:30",
        ayanamsha: "Lahiri",
        houseSystem: "Whole Sign",
        chartStyle: "north" as const
      }
    ];

    setProfiles(finalProfiles);
    try {
      localStorage.setItem("astronext_saved_profiles", JSON.stringify(finalProfiles));
    } catch {
      // ignore
    }

    // If the deleted profile was currently active, switch to the first remaining profile
    if (activeProfileId === profile.id) {
      const nextProfile = finalProfiles[0];
      setActiveProfileId(nextProfile.id);
      setFormData(nextProfile);
      setIsEditing(false);

      const newLagna = calculateLagna(nextProfile.dob, nextProfile.time, nextProfile.place);
      const newChart = generatePlanetaryPositions(nextProfile.dob, nextProfile.time, nextProfile.place, newLagna);
      const moon = newChart.planets.find(p => p.name === "Moon");
      const sun = newChart.planets.find(p => p.name === "Sun");

      onUpdateProfile({
        ...userProfile,
        name: nextProfile.name,
        gender: nextProfile.gender,
        dob: nextProfile.dob,
        time: nextProfile.time,
        place: nextProfile.place,
        latitude: nextProfile.latitude,
        longitude: nextProfile.longitude,
        timezone: nextProfile.timezone,
        lagna: newLagna,
        rashi: moon?.sign || userProfile.rashi || "Taurus",
        nakshatra: moon?.nakshatra || userProfile.nakshatra || "Rohini",
        nakshatraPada: moon?.pada || userProfile.nakshatraPada || 2,
        sunSign: sun?.sign || userProfile.sunSign || "Leo"
      });
    }

    setProfileToDelete(null);
    setSaveSuccessNotice(`Profile "${profile.name}" has been deleted.`);
    setTimeout(() => setSaveSuccessNotice(null), 3500);
  };

  const handleSelectProfile = (profile: SavedBirthProfile) => {
    playCardFlipSound();
    setActiveProfileId(profile.id);
    setFormData(profile);
    setIsEditing(false);

    const newLagna = calculateLagna(profile.dob, profile.time, profile.place);
    const newChart = generatePlanetaryPositions(profile.dob, profile.time, profile.place, newLagna);
    const moon = newChart.planets.find(p => p.name === "Moon");
    const sun = newChart.planets.find(p => p.name === "Sun");

    onUpdateProfile({
      ...userProfile,
      name: profile.name,
      gender: profile.gender,
      dob: profile.dob,
      time: profile.time,
      place: profile.place,
      latitude: profile.latitude,
      longitude: profile.longitude,
      timezone: profile.timezone,
      lagna: newLagna,
      rashi: moon?.sign || userProfile.rashi || "Taurus",
      nakshatra: moon?.nakshatra || userProfile.nakshatra || "Rohini",
      nakshatraPada: moon?.pada || userProfile.nakshatraPada || 2,
      sunSign: sun?.sign || userProfile.sunSign || "Leo"
    });

    setSaveSuccessNotice(`Active Profile switched to ${profile.name} (${profile.relation.toUpperCase()})`);
    setTimeout(() => setSaveSuccessNotice(null), 3500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    playCardFlipSound();

    const updated = profiles.map(p => p.id === formData.id ? formData : p);
    setProfiles(updated);
    try {
      localStorage.setItem("astronext_saved_profiles", JSON.stringify(updated));
    } catch {
      // ignore
    }

    const newLagna = calculateLagna(formData.dob, formData.time, formData.place);
    const newChart = generatePlanetaryPositions(formData.dob, formData.time, formData.place, newLagna);
    const moon = newChart.planets.find(p => p.name === "Moon");
    const sun = newChart.planets.find(p => p.name === "Sun");

    onUpdateProfile({
      ...userProfile,
      name: formData.name,
      gender: formData.gender,
      dob: formData.dob,
      time: formData.time,
      place: formData.place,
      latitude: formData.latitude,
      longitude: formData.longitude,
      timezone: formData.timezone,
      lagna: newLagna,
      rashi: moon?.sign || userProfile.rashi || "Taurus",
      nakshatra: moon?.nakshatra || userProfile.nakshatra || "Rohini",
      nakshatraPada: moon?.pada || userProfile.nakshatraPada || 2,
      sunSign: sun?.sign || userProfile.sunSign || "Leo"
    });

    setIsEditing(false);
    setSaveSuccessNotice(`Saved changes for ${formData.name}!`);
    setTimeout(() => setSaveSuccessNotice(null), 3500);
  };

  const handleCreateNewProfile = () => {
    playCardFlipSound();
    const newProf: SavedBirthProfile = {
      id: `prof-${Date.now()}`,
      relation: "other",
      name: "New Profile",
      gender: "male",
      dob: "1998-01-01",
      time: "12:00",
      place: "New Delhi, India",
      latitude: 28.6139,
      longitude: 77.2090,
      timezone: "+05:30",
      ayanamsha: "Lahiri",
      houseSystem: "Whole Sign",
      chartStyle: "north"
    };

    const updated = [...profiles, newProf];
    setProfiles(updated);
    setActiveProfileId(newProf.id);
    setFormData(newProf);
    setIsEditing(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
              Profile Management
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Global Birth Identity &amp; Calculation Configuration
            </span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
            My Astrological Profiles &amp; Settings
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Switch between Self, Partner, Family, or Client charts seamlessly without re-entering birth coordinates.
          </p>
        </div>

        <button
          onClick={handleCreateNewProfile}
          className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-xs transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Profile
        </button>
      </div>

      {saveSuccessNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveSuccessNotice}</span>
        </div>
      )}

      {/* Profile Switcher Tabs (Self, Partner, Child, Parent, Other) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {profiles.map((prof) => {
          const isActive = prof.id === activeProfileId;
          return (
            <div
              key={prof.id}
              onMouseEnter={playCardHoverSound}
              onClick={() => handleSelectProfile(prof)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative group ${
                isActive
                  ? "bg-slate-900 text-white border-amber-500 shadow-md ring-1 ring-amber-400 scale-[1.02]"
                  : "bg-white hover:bg-amber-50/50 text-slate-900 border-amber-900/10"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    isActive ? "bg-amber-400 text-slate-950" : "bg-slate-100 text-slate-600"
                  }`}>
                    {prof.relation}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isActive && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                    <button
                      type="button"
                      title={`Delete profile ${prof.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setProfileToDelete(prof);
                      }}
                      className={`p-1 rounded-md transition-all ${
                        isActive
                          ? "text-slate-400 hover:text-rose-400 hover:bg-rose-950/50 opacity-80 group-hover:opacity-100"
                          : "text-slate-400 hover:text-rose-600 hover:bg-rose-50 opacity-80 group-hover:opacity-100"
                      }`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="font-serif font-bold text-base mt-2 truncate">
                  {prof.name}
                </div>
                <div className={`text-xs mt-0.5 ${isActive ? "text-slate-300" : "text-slate-500"}`}>
                  {prof.dob} • {prof.time}
                </div>
                <div className={`text-[11px] truncate mt-0.5 ${isActive ? "text-slate-400" : "text-slate-400"}`}>
                  {prof.place}
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-200/20 flex items-center justify-between text-[11px]">
                <span className={isActive ? "text-amber-300 font-bold" : "text-slate-500"}>
                  {prof.ayanamsha} • {prof.houseSystem}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Profile Details & Configuration Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-serif text-xl font-bold text-slate-900">
              {isEditing ? "Edit Birth Details & Calculation System" : `Active Profile: ${formData.name}`}
            </h3>
            <p className="text-xs text-slate-500">
              Astronomical ephemeris coordinates, ayanamsha standard, and chart rendering style.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const current = profiles.find(p => p.id === activeProfileId) || formData;
                setProfileToDelete(current);
              }}
              className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5 transition-all border border-rose-200"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
              <span>Delete Profile</span>
            </button>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              {isEditing ? <RotateCcw className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
              <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-5">
          {/* Section 1: Basic Identity */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 disabled:bg-slate-100/70 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Relationship Category</label>
              <select
                disabled={!isEditing}
                value={formData.relation}
                onChange={(e) => setFormData({ ...formData, relation: e.target.value as ProfileRelation })}
                className="w-full bg-slate-50 disabled:bg-slate-100/70 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              >
                <option value="self">Self (Primary User)</option>
                <option value="partner">Partner / Spouse</option>
                <option value="child">Child / Progeny</option>
                <option value="parent">Parent</option>
                <option value="other">Other / Client</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
              <select
                disabled={!isEditing}
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                className="w-full bg-slate-50 disabled:bg-slate-100/70 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Section 2: Exact Birth Time & Geolocation */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-amber-600" />
                Date of Birth
              </label>
              <input
                type="date"
                disabled={!isEditing}
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full bg-slate-50 disabled:bg-slate-100/70 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-600" />
                Exact Time of Birth
              </label>
              <input
                type="time"
                disabled={!isEditing}
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full bg-slate-50 disabled:bg-slate-100/70 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-600" />
                Birth City &amp; Country
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.place}
                onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                className="w-full bg-slate-50 disabled:bg-slate-100/70 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              />
            </div>
          </div>

          {/* Section 3: Astrological Calculation Settings */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-900/10 space-y-3">
            <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs uppercase tracking-wider">
              <Sliders className="w-3.5 h-3.5 text-amber-700" />
              Calculation Methodology Preferences
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Ayanamsha Standard</label>
                <select
                  disabled={!isEditing}
                  value={formData.ayanamsha}
                  onChange={(e) => setFormData({ ...formData, ayanamsha: e.target.value })}
                  className="w-full bg-white border border-amber-900/15 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Lahiri">Lahiri (Chitrapaksha) — Standard</option>
                  <option value="KP">Krishnamurti (KP)</option>
                  <option value="Raman">B.V. Raman</option>
                  <option value="Yukteshwar">Sri Yukteshwar</option>
                  <option value="Tropical">Tropical (Sayana / Western)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">House System</label>
                <select
                  disabled={!isEditing}
                  value={formData.houseSystem}
                  onChange={(e) => setFormData({ ...formData, houseSystem: e.target.value })}
                  className="w-full bg-white border border-amber-900/15 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Whole Sign">Whole Sign (Vedic Rashi Bhava)</option>
                  <option value="Bhava Chalit">Bhava Chalit (Sripati / Midpoints)</option>
                  <option value="Placidus">Placidus (KP Cusps)</option>
                  <option value="Equal">Equal House (30° per Bhava)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Chart Visual Style</label>
                <select
                  disabled={!isEditing}
                  value={formData.chartStyle}
                  onChange={(e) => setFormData({ ...formData, chartStyle: e.target.value as any })}
                  className="w-full bg-white border border-amber-900/15 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="north">North Indian (Diamond Matrix)</option>
                  <option value="south">South Indian (Fixed Rashi Box)</option>
                  <option value="east">East Indian (Sun Temple Style)</option>
                </select>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                Save Profile &amp; Recalculate
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Delete Profile Confirmation Dialog */}
      {profileToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-rose-100 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-rose-100 text-rose-700 shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-slate-900">Delete Profile</h4>
                <p className="text-xs text-slate-500">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to delete the profile for <strong className="text-slate-900 font-semibold">{profileToDelete.name}</strong> ({profileToDelete.relation.toUpperCase()})? All stored birth date, time, and coordinates for this profile will be permanently removed.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setProfileToDelete(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteProfile(profileToDelete)}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
