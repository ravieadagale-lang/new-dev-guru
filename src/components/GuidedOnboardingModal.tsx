import React, { useState } from "react";
import { UserProfile } from "../types";
import { Sparkles, Calendar, Clock, MapPin, User, CheckCircle2, ArrowRight, ShieldCheck, Compass } from "lucide-react";

interface GuidedOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  onNavigateToDashboard: () => void;
}

export const GuidedOnboardingModal: React.FC<GuidedOnboardingModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onSaveProfile,
  onNavigateToDashboard,
}) => {
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState(userProfile.name || "");
  const [dob, setDob] = useState(userProfile.dob || "1995-08-15");
  const [time, setTime] = useState(userProfile.time || "10:30");
  const [place, setPlace] = useState(userProfile.place || "New Delhi, India");
  const [gender, setGender] = useState<"male" | "female" | "other">(userProfile.gender || "male");

  if (!isOpen) return null;

  const handleFinishOnboarding = () => {
    const updatedProfile: UserProfile = {
      ...userProfile,
      name,
      dob,
      time,
      place,
      gender,
      rashi: "Taurus",
      nakshatra: "Rohini",
      lagna: "Aries",
    };

    onSaveProfile(updatedProfile);
    onClose();
    onNavigateToDashboard();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-amber-900/20 shadow-2xl relative space-y-6 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            Guided Cosmic Onboarding
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Configure Your Birth Profile
          </h2>
          <p className="text-xs text-slate-600 max-w-xs mx-auto">
            Step {step} of 3 • Setting up your precision Swiss Ephemeris Kundli chart.
          </p>
        </div>

        {/* Why this information is needed Banner */}
        <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/30 text-xs text-amber-900 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-amber-950">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            Why Precision Details Matter:
          </div>
          <p className="text-[11px] leading-relaxed text-amber-900/80">
            Vedic Astrology requires exact birth time and geographic coordinates to pinpoint your <strong>Lagna (Ascendant)</strong>, <strong>Moon Nakshatra</strong>, and house cusps. A 4-minute time shift alters your rising degree by 1 full degree!
          </p>
        </div>

        {/* Form Steps */}
        <div className="space-y-4 pt-2">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-800" />
                  Your Full Legal Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full bg-white border border-amber-900/15 rounded-2xl px-4 py-3 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Gender Identification
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                  {(["male", "female", "other"] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`py-2.5 rounded-xl border text-center capitalize transition-all ${
                        gender === g
                          ? "bg-slate-900 text-amber-300 border-slate-900 font-bold"
                          : "bg-white text-slate-700 border-amber-900/15 hover:bg-amber-50"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!name.trim()}
                className="w-full py-3.5 rounded-2xl bg-slate-900 text-amber-300 font-bold text-xs hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                <span>Continue to Date & Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-800" />
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full bg-white border border-amber-900/15 rounded-2xl px-4 py-3 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-800" />
                    Exact Time of Birth
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-white border border-amber-900/15 rounded-2xl px-4 py-3 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 rounded-2xl bg-amber-100 text-slate-800 font-bold text-xs hover:bg-amber-200"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-2/3 py-3 rounded-2xl bg-slate-900 text-amber-300 font-bold text-xs hover:bg-slate-800 flex items-center justify-center gap-2"
                >
                  <span>Continue to Birth Location</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-800" />
                  Place of Birth (City & Country)
                </label>
                <input
                  type="text"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder="e.g. New Delhi, India"
                  className="w-full bg-white border border-amber-900/15 rounded-2xl px-4 py-3 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Summary Review Card */}
              <div className="bg-white p-4 rounded-2xl border border-amber-900/10 space-y-2 text-xs">
                <div className="font-bold text-slate-900 border-b border-amber-900/10 pb-1.5 flex justify-between items-center">
                  <span>Profile Summary</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-600 text-[11px]">
                  <div><strong>Name:</strong> {name}</div>
                  <div><strong>DOB:</strong> {dob}</div>
                  <div><strong>Time:</strong> {time}</div>
                  <div><strong>Location:</strong> {place}</div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-1/3 py-3.5 rounded-2xl bg-amber-100 text-slate-800 font-bold text-xs hover:bg-amber-200"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleFinishOnboarding}
                  className="w-2/3 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-800 text-white font-bold text-xs hover:brightness-110 shadow-lg flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Complete Setup & Go to Dashboard</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
