// src/components/baby/BabyBirthDetailsForm.tsx
// Comprehensive Form for Baby's Birth Details & Parents' Details

import React, { useState } from "react";
import { 
  Baby, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Sparkles, 
  Compass, 
  Sliders,
  CheckCircle2
} from "lucide-react";
import { BabyBirthInput, BabyGender, BabyNameStyle, BabyReligion } from "../../types/babyNameTypes";

interface BabyBirthDetailsFormProps {
  initialValues: BabyBirthInput;
  onSubmit: (values: BabyBirthInput) => void;
  isCalculating?: boolean;
}

const RELIGIONS: { id: BabyReligion; label: string; icon: string; desc: string }[] = [
  { id: "all", label: "All Religions", icon: "🌐", desc: "Universal & All Traditions" },
  { id: "hindu", label: "Hindu / Vedic", icon: "🕉️", desc: "Vedic, Sanskrit & Deities" },
  { id: "muslim", label: "Muslim / Islamic", icon: "🕌", desc: "Quranic, Arabic & Jannah" },
  { id: "sikh", label: "Sikh / Gurmukhi", icon: "☬", desc: "Gurbani, Khalsa & Waheguru" },
  { id: "christian", label: "Christian", icon: "✝️", desc: "Biblical & Modern Grace" },
  { id: "jain", label: "Jain", icon: "☸️", desc: "Tirthankara & Ahimsa" },
  { id: "buddhist", label: "Buddhist", icon: "🌸", desc: "Dhamma, Bodhi & Karuna" },
];

const POPULAR_CITIES = [
  { name: "Mumbai, India", lat: 19.076, lon: 72.8777, tz: 5.5 },
  { name: "New Delhi, India", lat: 28.6139, lon: 77.209, tz: 5.5 },
  { name: "Bengaluru, India", lat: 12.9716, lon: 77.5946, tz: 5.5 },
  { name: "Pune, India", lat: 18.5204, lon: 73.8567, tz: 5.5 },
  { name: "Hyderabad, India", lat: 17.385, lon: 78.4867, tz: 5.5 },
  { name: "Chennai, India", lat: 13.0827, lon: 80.2707, tz: 5.5 },
  { name: "Kolkata, India", lat: 22.5726, lon: 88.3639, tz: 5.5 },
  { name: "Ahmedabad, India", lat: 23.0225, lon: 72.5714, tz: 5.5 },
  { name: "Dubai, UAE", lat: 25.2048, lon: 55.2708, tz: 4.0 },
  { name: "London, UK", lat: 51.5074, lon: -0.1278, tz: 0.0 },
  { name: "New York, USA", lat: 40.7128, lon: -74.006, tz: -5.0 },
  { name: "San Francisco, USA", lat: 37.7749, lon: -122.4194, tz: -8.0 },
  { name: "Singapore", lat: 1.3521, lon: 103.8198, tz: 8.0 }
];

export const BabyBirthDetailsForm: React.FC<BabyBirthDetailsFormProps> = ({
  initialValues,
  onSubmit,
  isCalculating = false
}) => {
  const [formData, setFormData] = useState<BabyBirthInput>(initialValues);
  const [showAdvancedLocation, setShowAdvancedLocation] = useState(false);

  const handleCitySelect = (cityName: string) => {
    const city = POPULAR_CITIES.find((c) => c.name === cityName);
    if (city) {
      setFormData((prev) => ({
        ...prev,
        pob: city.name,
        latitude: city.lat,
        longitude: city.lon,
        timezoneOffset: city.tz
      }));
    } else {
      setFormData((prev) => ({ ...prev, pob: cityName }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-md rounded-3xl border border-amber-900/10 shadow-sm p-6 sm:p-8 space-y-8">
      {/* Section 1: Baby's Core Details */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-amber-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100/80 text-amber-900">
              <Baby className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900">Baby's Birth Details</h3>
              <p className="text-xs text-slate-500">Calculates precise Moon Nakshatra pada, Janmakshar &amp; birth day vibration</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Astrology Core
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Gender Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Baby's Gender
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
              {(["boy", "girl", "unisex"] as BabyGender[]).map((g) => (
                <button
                  type="button"
                  key={g}
                  onClick={() => setFormData((prev) => ({ ...prev, gender: g }))}
                  className={`py-2 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                    formData.gender === g
                      ? "bg-amber-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {g === "boy" ? "Boy" : g === "girl" ? "Girl" : "Unisex"}
                </button>
              ))}
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-700" /> Date of Birth
              </span>
            </label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData((prev) => ({ ...prev, dob: e.target.value }))}
              required
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          {/* Time of Birth */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-700" /> Time of Birth
              </span>
            </label>
            <input
              type="time"
              value={formData.tob}
              onChange={(e) => setFormData((prev) => ({ ...prev, tob: e.target.value }))}
              required
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>
        </div>

        {/* Place of Birth */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-700" /> Place of Birth (City)
              </span>
            </label>
            <select
              value={formData.pob}
              onChange={(e) => handleCitySelect(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            >
              {POPULAR_CITIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name} (UTC {c.tz >= 0 ? `+${c.tz}` : c.tz})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Preferred Name Style
            </label>
            <select
              value={formData.preferredStyle}
              onChange={(e) => setFormData((prev) => ({ ...prev, preferredStyle: e.target.value as BabyNameStyle }))}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            >
              <option value="all">All Auspicious Styles</option>
              <option value="vedic_sanskrit">Classical Vedic &amp; Sanskrit Roots</option>
              <option value="modern_indian">Modern &amp; Contemporary Indian</option>
              <option value="short_sweet">Short &amp; Sweet (1-2 Syllables)</option>
              <option value="international">Global &amp; International Friendly</option>
            </select>
          </div>
        </div>

        {/* Toggle Custom Lat/Long */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowAdvancedLocation(!showAdvancedLocation)}
            className="text-xs text-amber-700 hover:text-amber-900 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            {showAdvancedLocation ? "Hide precise coordinates" : "Enter custom latitude/longitude & timezone"}
          </button>

          {showAdvancedLocation && (
            <div className="mt-3 p-4 bg-amber-50/50 rounded-2xl border border-amber-200/60 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Latitude (°)</label>
                <input
                  type="number"
                  step="0.0001"
                  value={formData.latitude}
                  onChange={(e) => setFormData((prev) => ({ ...prev, latitude: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Longitude (°)</label>
                <input
                  type="number"
                  step="0.0001"
                  value={formData.longitude}
                  onChange={(e) => setFormData((prev) => ({ ...prev, longitude: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Timezone Offset (Hrs)</label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.timezoneOffset}
                  onChange={(e) => setFormData((prev) => ({ ...prev, timezoneOffset: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section 2: Religion & Faith Category */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between border-b border-amber-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-900 font-bold">
              <Sparkles className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900">Religion &amp; Spiritual Tradition</h3>
              <p className="text-xs text-slate-500">Filter auspicious baby names according to your faith while maintaining full harmonic calculations</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
            Multi-Faith Inclusive
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {RELIGIONS.map((rel) => {
            const isSelected = (formData.religion || "all") === rel.id;
            return (
              <button
                type="button"
                key={rel.id}
                onClick={() => setFormData((prev) => ({ ...prev, religion: rel.id }))}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                  isSelected
                    ? "bg-amber-600 text-white border-amber-700 shadow-sm ring-2 ring-amber-500/30"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">{rel.icon}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-200" />}
                </div>
                <div>
                  <div className={`text-xs font-bold ${isSelected ? "text-white" : "text-slate-900"}`}>
                    {rel.label}
                  </div>
                  <div className={`text-[10px] leading-tight line-clamp-1 ${isSelected ? "text-amber-100" : "text-slate-500"}`}>
                    {rel.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 3: Parents & Lineage Details */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between border-b border-amber-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-100 text-purple-900">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900">Parents &amp; Family Surname</h3>
              <p className="text-xs text-slate-500">Calculates full name compound harmony and parent-child vibrational bonding</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
            Harmonics &amp; Lineage
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Father's Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Rajesh Kumar"
              value={formData.fatherName}
              onChange={(e) => setFormData((prev) => ({ ...prev, fatherName: e.target.value }))}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            />
            <p className="text-[10px] text-slate-600 mt-1">Evaluates father-child psychological resonance</p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Mother's Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Priya Sharma"
              value={formData.motherName}
              onChange={(e) => setFormData((prev) => ({ ...prev, motherName: e.target.value }))}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            />
            <p className="text-[10px] text-slate-600 mt-1">Evaluates maternal emotional comfort &amp; bonding</p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Family Surname / Last Name
            </label>
            <input
              type="text"
              placeholder="e.g. Sharma / Patel"
              value={formData.surname}
              onChange={(e) => setFormData((prev) => ({ ...prev, surname: e.target.value }))}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            />
            <p className="text-[10px] text-slate-600 mt-1">Vital for Full Name Chaldean compound calculation</p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-600 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Calculates Moon Pada (108 Aksharas) + Chaldean &amp; Pythagorean grids instantly</span>
        </div>

        <button
          type="submit"
          disabled={isCalculating}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          {isCalculating ? "Calculating Vedic Harmonics..." : "Find Perfect Auspicious Names"}
        </button>
      </div>
    </form>
  );
};
