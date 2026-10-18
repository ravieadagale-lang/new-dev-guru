import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  X, 
  ShieldCheck, 
  AlertTriangle,
  ArrowRight,
  ChevronLeft
} from "lucide-react";
import { UserProfile } from "../../types";
import { AstroButton, AstroBadge } from "./AstroDesignSystem";

export type BirthTimeAccuracy = "exact" | "approximate" | "estimated" | "unknown";

export interface AstroGuidedOnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onComplete: (profile: UserProfile) => void;
}

export const AstroGuidedOnboarding: React.FC<AstroGuidedOnboardingProps> = ({
  isOpen,
  onClose,
  userProfile,
  onComplete,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: userProfile.name || "Aarav Sharma",
    dob: userProfile.dob || "1995-08-15",
    time: userProfile.time || "10:30",
    place: userProfile.place || "Pune, India",
    gender: userProfile.gender || "male",
    accuracy: "exact" as BirthTimeAccuracy,
    methodology: "Dev-Guru Vedic Standard",
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else {
      onComplete({
        ...userProfile,
        name: formData.name,
        dob: formData.dob,
        time: formData.time,
        place: formData.place,
        gender: formData.gender,
      });
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#1E1B18]/70 backdrop-blur-xs"
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        className="relative w-full max-w-xl bg-[#FFFFFF] border border-[#DDD7CD] rounded-3xl shadow-2xl overflow-hidden z-10"
      >
        {/* Header with Step Indicator */}
        <div className="p-6 border-b border-[#EAE5DA] bg-[#FAF8F5] flex justify-between items-center">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#B89047]">
              Step {step} of 5 • Guided Profile Setup
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1E1B18] mt-0.5">
              {step === 1 && "What is your full name?"}
              {step === 2 && "When were you born?"}
              {step === 3 && "Exact Time & Birth Accuracy"}
              {step === 4 && "Where were you born?"}
              {step === 5 && "Astrological Calculation System"}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#766E65] hover:text-[#1E1B18]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-[#EAE5DA] w-full">
          <div
            className="h-1 bg-[#B89047] transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Step Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#4A433B] uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="flex items-center gap-2 p-3 bg-[#F9F7F2] border border-[#DDD7CD] rounded-2xl">
                  <User className="w-4 h-4 text-[#8C6D23]" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-transparent text-sm font-bold text-[#1E1B18] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A433B] uppercase tracking-wider mb-2">
                  Gender
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["male", "female", "other"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: g as any })}
                      className={`p-3 rounded-2xl text-xs font-bold capitalize border transition-all ${
                        formData.gender === g
                          ? "bg-[#1E1B18] text-white border-[#1E1B18] shadow-xs"
                          : "bg-[#F9F7F2] text-[#554E46] border-[#DDD7CD] hover:bg-[#EFEBE1]"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <label className="block text-xs font-bold text-[#4A433B] uppercase tracking-wider mb-2">
                Date of Birth
              </label>
              <div className="flex items-center gap-2 p-3 bg-[#F9F7F2] border border-[#DDD7CD] rounded-2xl">
                <Calendar className="w-4 h-4 text-[#8C6D23]" />
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full bg-transparent text-sm font-bold text-[#1E1B18] focus:outline-none cursor-pointer"
                />
              </div>
              <p className="text-xs text-[#766E65]">
                Planetary ephemeris tables calculate precise astronomical longitudes for midnight UTC and interpolate across your birth time.
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#4A433B] uppercase tracking-wider mb-2">
                  Birth Time (24-Hour Format)
                </label>
                <div className="flex items-center gap-2 p-3 bg-[#F9F7F2] border border-[#DDD7CD] rounded-2xl">
                  <Clock className="w-4 h-4 text-[#8C6D23]" />
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-transparent text-sm font-bold text-[#1E1B18] focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A433B] uppercase tracking-wider mb-2">
                  How accurate is your birth time?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "exact", label: "Exact (from Birth Certificate)", desc: "Full D1–D60 & KP Sub Lords enabled" },
                    { id: "approximate", label: "Approximately Known (±15 min)", desc: "D1/D9 reliable; subtle Vargas cautionary" },
                    { id: "estimated", label: "Estimated (Morning/Night)", desc: "Moon sign & generic planets only" },
                    { id: "unknown", label: "Unknown / Unrecorded", desc: "Moon & Solar charts only; Lagna disabled" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, accuracy: opt.id as BirthTimeAccuracy })}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        formData.accuracy === opt.id
                          ? "bg-[#FAF7F0] border-[#B89047] shadow-xs"
                          : "bg-[#F9F7F2] border-[#DDD7CD] hover:bg-[#EFEBE1]"
                      }`}
                    >
                      <div className="text-xs font-bold text-[#1E1B18]">{opt.label}</div>
                      <div className="text-[10px] text-[#766E65] mt-1">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {formData.accuracy === "unknown" && (
                <div className="p-3 bg-[#FDF3E7] border border-[#F5D5B0] rounded-2xl text-xs text-[#9E5D14] flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#9E5D14] shrink-0 mt-0.5" />
                  <span>
                    When birth time is unknown, Dev-Guru will compute a Chandra Kundli (Moon Chart) and disable time-sensitive calculations (KP Sub Lords, D60, and fast Lagna cusps).
                  </span>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <label className="block text-xs font-bold text-[#4A433B] uppercase tracking-wider mb-2">
                City / Place of Birth
              </label>
              <div className="flex items-center gap-2 p-3 bg-[#F9F7F2] border border-[#DDD7CD] rounded-2xl">
                <MapPin className="w-4 h-4 text-[#8C6D23]" />
                <input
                  type="text"
                  value={formData.place}
                  onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                  placeholder="e.g. Pune, India"
                  className="w-full bg-transparent text-sm font-bold text-[#1E1B18] focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Pune, India", "New Delhi, India", "Mumbai, India", "Bengaluru, India", "London, UK", "New York, USA"].map(
                  (city, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, place: city })}
                      className="px-2.5 py-1 bg-[#F2EFE9] text-[#554E46] text-xs font-semibold rounded-xl border border-[#DDD7CD] hover:bg-[#EAE4D7]"
                    >
                      {city}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <label className="block text-xs font-bold text-[#4A433B] uppercase tracking-wider mb-2">
                Calculation Methodology
              </label>
              <div className="space-y-2.5">
                {[
                  {
                    id: "Dev-Guru Vedic Standard",
                    title: "Dev-Guru Vedic Standard (Recommended)",
                    desc: "Lahiri Chitrapaksha Ayanamsa • Whole Sign Houses • Parashari & Jaimini integration",
                  },
                  {
                    id: "Krishnamurti Paddhati (KP)",
                    title: "Krishnamurti Paddhati (KP System)",
                    desc: "KP Old/New Ayanamsa • Placidus Cusps • 249 Sub-Lord Rule Matrix",
                  },
                  {
                    id: "Jaimini Sutram",
                    title: "Jaimini Sutram Classical",
                    desc: "Chara Karakas (7/8 Karaka scheme) • Rashi Drishti • Chara Dasha",
                  },
                  {
                    id: "Western Tropical",
                    title: "Western Tropical / Placidus",
                    desc: "Tropical Zodiac (0° Aries equinox) • Placidus houses • Modern planets",
                  },
                ].map((sys) => (
                  <button
                    key={sys.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, methodology: sys.id })}
                    className={`w-full p-3.5 rounded-2xl text-left border transition-all ${
                      formData.methodology === sys.id
                        ? "bg-[#FAF7F0] border-[#B89047] shadow-xs"
                        : "bg-[#F9F7F2] border-[#DDD7CD] hover:bg-[#EFEBE1]"
                    }`}
                  >
                    <div className="text-xs font-bold text-[#1E1B18]">{sys.title}</div>
                    <div className="text-[11px] text-[#766E65] mt-0.5">{sys.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-6 border-t border-[#EAE5DA] bg-[#FAF8F5] flex justify-between items-center">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1 text-xs font-bold text-[#554E46] hover:text-[#1E1B18]"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          <AstroButton variant="primary" size="md" onClick={handleNext}>
            <span>{step === 5 ? "Calculate & Generate Profile" : "Continue"}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </AstroButton>
        </div>
      </motion.div>
    </div>
  );
};
