import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Search, X, Check, Globe } from "lucide-react";

export interface AstroLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: string;
  onSelectLocation: (location: string, tz: string, lat: number, lng: number) => void;
}

const PRESET_LOCATIONS = [
  { city: "Pune", country: "India", state: "Maharashtra", tz: "Asia/Kolkata", lat: 18.5204, lng: 73.8567 },
  { city: "New Delhi", country: "India", state: "Delhi", tz: "Asia/Kolkata", lat: 28.6139, lng: 77.2090 },
  { city: "Mumbai", country: "India", state: "Maharashtra", tz: "Asia/Kolkata", lat: 19.0760, lng: 72.8777 },
  { city: "Bengaluru", country: "India", state: "Karnataka", tz: "Asia/Kolkata", lat: 12.9716, lng: 77.5946 },
  { city: "Varanasi", country: "India", state: "Uttar Pradesh", tz: "Asia/Kolkata", lat: 25.3176, lng: 82.9739 },
  { city: "Kolkata", country: "India", state: "West Bengal", tz: "Asia/Kolkata", lat: 22.5726, lng: 88.3639 },
  { city: "Chennai", country: "India", state: "Tamil Nadu", tz: "Asia/Kolkata", lat: 13.0827, lng: 80.2707 },
  { city: "London", country: "United Kingdom", state: "England", tz: "Europe/London", lat: 51.5074, lng: -0.1278 },
  { city: "New York", country: "United States", state: "NY", tz: "America/New_York", lat: 40.7128, lng: -74.0060 },
  { city: "San Francisco", country: "United States", state: "CA", tz: "America/Los_Angeles", lat: 37.7749, lng: -122.4194 },
  { city: "Dubai", country: "United Arab Emirates", state: "Dubai", tz: "Asia/Dubai", lat: 25.2048, lng: 55.2708 },
  { city: "Singapore", country: "Singapore", state: "SG", tz: "Asia/Singapore", lat: 1.3521, lng: 103.8198 },
];

export const AstroLocationModal: React.FC<AstroLocationModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLocations = PRESET_LOCATIONS.filter(
    (loc) =>
      loc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#1E1B18]/60 backdrop-blur-xs"
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-md bg-[#FFFFFF] border border-[#DDD7CD] rounded-3xl shadow-2xl overflow-hidden z-10"
      >
        <div className="p-5 border-b border-[#EAE5DA] flex justify-between items-center bg-[#FAF8F5]">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1E1B18] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#8C6D23]" />
              Select Observation Location
            </h3>
            <p className="text-xs text-[#766E65] mt-0.5">
              Panchanga and Lagna calculations depend on precise geographical coordinates.
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#766E65] hover:text-[#1E1B18]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 border-b border-[#EAE5DA]">
          <div className="flex items-center gap-2 px-3 py-2 bg-[#F7F5F0] rounded-xl border border-[#DDD7CD]">
            <Search className="w-4 h-4 text-[#8C6D23]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city, state or country..."
              className="w-full bg-transparent text-xs font-semibold text-[#1E1B18] placeholder-[#9E958A] focus:outline-none"
            />
          </div>
        </div>

        <div className="p-3 max-h-72 overflow-y-auto space-y-1">
          {filteredLocations.map((loc, idx) => {
            const locName = `${loc.city}, ${loc.country}`;
            const isSelected = currentLocation.toLowerCase().includes(loc.city.toLowerCase());

            return (
              <button
                key={idx}
                onClick={() => {
                  onSelectLocation(locName, loc.tz, loc.lat, loc.lng);
                  onClose();
                }}
                className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-colors ${
                  isSelected
                    ? "bg-[#FAF7F0] border border-[#E5D2A0] text-[#1E1B18]"
                    : "hover:bg-[#F9F7F2] border border-transparent text-[#4A433B]"
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-[#1E1B18]">{loc.city}, {loc.state}</div>
                  <div className="text-[11px] text-[#766E65] flex items-center gap-2 mt-0.5">
                    <span>{loc.country}</span>
                    <span>•</span>
                    <span className="font-mono text-[10px] text-[#8C6D23]">{loc.lat.toFixed(2)}°N, {loc.lng.toFixed(2)}°E</span>
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#8C6D23]" />}
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
