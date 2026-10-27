// src/components/AdvanceNumerologyReportView.tsx

import React, { useState } from "react";
import { resolveImageUrl } from "../utils/imageResolver";
import {
  Sparkles,
  User,
  Calendar,
  Compass,
  FileText,
  ShieldAlert,
  Coins,
  Heart,
  Activity,
  Award,
  Gem,
  CheckCircle2,
  Printer,
  Wand2,
  Eye,
  Clock,
  MapPin,
  Layers,
  Star,
  BookOpen,
  ArrowUpRight,
  Sun,
  Moon,
  Zap,
  Target,
  Briefcase,
  AlertTriangle,
  Lightbulb,
  Compass as CompassIcon,
  Crown,
  Phone,
  Building2,
  Home,
  Users,
  PenTool,
  Feather,
  HeartHandshake,
  ShieldCheck
} from "lucide-react";
import {
  generateAdvanceNumerologyReport,
  AdvancedReportData,
  AdvancedReportInputs
} from "../data/advanceNumerologyReportGenerator";
import { SignatureAndNameCorrectionCard } from "./SignatureAndNameCorrectionCard";

interface AdvanceNumerologyReportViewProps {
  initialName?: string;
  initialDob?: string;
  initialGender?: "male" | "female" | "other";
  userProfile?: any;
  selectedLanguage?: any;
}

export const AdvanceNumerologyReportView: React.FC<AdvanceNumerologyReportViewProps> = ({
  initialName = "",
  initialDob = "1992-08-15",
  initialGender = "male",
  userProfile,
}) => {
  // Primary Personal Inputs
  const [fullName, setFullName] = useState<string>(userProfile?.name || initialName || "Aarav Sharma");
  const [dob, setDob] = useState<string>(userProfile?.dob || initialDob || "1992-08-15");
  const [gender, setGender] = useState<"male" | "female" | "other">(userProfile?.gender || initialGender);
  const [birthTime, setBirthTime] = useState<string>(userProfile?.time || "07:30");
  const [birthLocation, setBirthLocation] = useState<string>(userProfile?.place || "New Delhi, India");

  React.useEffect(() => {
    if (userProfile) {
      if (userProfile.name) setFullName(userProfile.name);
      if (userProfile.dob) setDob(userProfile.dob);
      if (userProfile.gender) setGender(userProfile.gender);
      if (userProfile.time) setBirthTime(userProfile.time);
      if (userProfile.place) setBirthLocation(userProfile.place);
    }
  }, [userProfile?.name, userProfile?.dob, userProfile?.gender, userProfile?.time, userProfile?.place]);

  // Extended Advanced Inputs
  const [primaryMobile, setPrimaryMobile] = useState<string>("9876543210");
  const [secondaryMobile, setSecondaryMobile] = useState<string>("9123456789");
  const [currentSignatureName, setCurrentSignatureName] = useState<string>("Aarav K. Sharma");
  const [nickname, setNickname] = useState<string>("Avi");
  const [businessName, setBusinessName] = useState<string>("Dev-Guru Tech Enterprises");
  const [houseNumber, setHouseNumber] = useState<string>("Flat 502, Tower B");
  const [partnerName, setPartnerName] = useState<string>("Ananya Patel");
  const [partnerDob, setPartnerDob] = useState<string>("1994-11-22");
  const [motherName, setMotherName] = useState<string>("Sunita Sharma");
  const [fatherName, setFatherName] = useState<string>("Rajesh Sharma");

  // Mode: "generated" vs "sample"
  const [viewMode, setViewMode] = useState<"generated" | "sample_preview">("generated");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Active generated report data
  const [reportData, setReportData] = useState<AdvancedReportData>(() =>
    generateAdvanceNumerologyReport({
      fullName,
      dob,
      gender,
      birthTime,
      birthLocation,
      primaryMobile,
      secondaryMobile,
      currentSignatureName,
      nickname,
      businessName,
      houseNumber,
      partnerName,
      partnerDob,
      motherName,
      fatherName
    })
  );

  // Sample report data for client preview
  const sampleReportData = React.useMemo(() => {
    return generateAdvanceNumerologyReport({
      fullName: "Rohan Mehra",
      dob: "1988-11-28",
      gender: "male",
      birthTime: "10:15",
      birthLocation: "Mumbai, India",
      primaryMobile: "9820123456",
      secondaryMobile: "9819876543",
      currentSignatureName: "Rohan K. Mehra",
      nickname: "Ronny",
      businessName: "Mehra Global Ventures",
      houseNumber: "Flat 1204, Tower C",
      partnerName: "Pooja Sharma",
      partnerDob: "1991-05-18",
      motherName: "Kamla Mehra",
      fatherName: "Suresh Mehra"
    });
  }, []);

  // Handle Form Submit
  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      const generated = generateAdvanceNumerologyReport({
        fullName,
        dob,
        gender,
        birthTime,
        birthLocation,
        primaryMobile,
        secondaryMobile,
        currentSignatureName,
        nickname,
        businessName,
        houseNumber,
        partnerName,
        partnerDob,
        motherName,
        fatherName
      });
      setReportData(generated);
      setViewMode("generated");
      setIsGenerating(false);
    }, 400);
  };

  const activeReport = viewMode === "sample_preview" ? sampleReportData : reportData;

  return (
    <div className="space-y-8 animate-fadeIn text-slate-100 pb-16 font-sans">
      {/* HERO SECTION & FORM CONTAINER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Grand Master Numerology Report Generator</span>
            </div>

            {/* TOGGLE REPORT VS SAMPLE STRUCTURE PREVIEW */}
            <div className="flex items-center gap-2 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setViewMode("generated")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  viewMode === "generated"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>My Generated Report</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("sample_preview")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  viewMode === "sample_preview"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Sample Report Format</span>
              </button>
            </div>
          </div>

          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-indigo-200">
              Grand Premium Advance Numerology Report
            </h1>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              Synthesizing all classical &amp; esoteric numerological systems into a comprehensive report covering core identity, mobile vibration, signature tuning, business resonance, partner synergy, and ancestral lineage decoding.
            </p>
          </div>

          {/* INPUT FORM WITH COMPREHENSIVE ADVANCED FIELDS */}
          <form
            onSubmit={handleGenerateReport}
            className="bg-slate-950/80 p-5 md:p-7 rounded-2xl border border-slate-800/90 space-y-6 shadow-2xl"
          >
            {/* SECTION 1: PRIMARY PERSONAL IDENTIFICATION */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
                <User className="w-4 h-4 text-amber-400" />
                <span>1. Primary Personal Identification</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <span>Full Legal Name</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Date of Birth</span>
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-400"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <span>Gender</span>
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="male">Male (Solar Kua)</option>
                    <option value="female">Female (Lunar Kua)</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-rose-400" />
                    <span>Time of Birth (Optional)</span>
                  </label>
                  <input
                    type="time"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-rose-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Place of Birth (Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={birthLocation}
                    onChange={(e) => setBirthLocation(e.target.value)}
                    placeholder="City, Country"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: TELECOMMUNICATION & SPACE NUMEROLOGY */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-2">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>2. Telecommunication & Space Numerology</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Primary Mobile Number</span>
                  </label>
                  <input
                    type="text"
                    value={primaryMobile}
                    onChange={(e) => setPrimaryMobile(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>Secondary Mobile Number</span>
                  </label>
                  <input
                    type="text"
                    value={secondaryMobile}
                    onChange={(e) => setSecondaryMobile(e.target.value)}
                    placeholder="e.g. 9123456789 (optional)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-amber-400" />
                    <span>House / Flat Number</span>
                  </label>
                  <input
                    type="text"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                    placeholder="e.g. Flat 502, Tower B"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Business / Company Name</span>
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Dev-Guru Tech Enterprises"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3: SIGNATURE & IDENTITY CALIBRATION */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 border-b border-slate-800 pb-2">
                <PenTool className="w-4 h-4 text-purple-400" />
                <span>3. Signature & Calling Identity Calibration</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <PenTool className="w-3.5 h-3.5 text-amber-400" />
                    <span>Current / Signature Name</span>
                  </label>
                  <input
                    type="text"
                    value={currentSignatureName}
                    onChange={(e) => setCurrentSignatureName(e.target.value)}
                    placeholder="e.g. Aarav K. Sharma"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-400"
                  />
                  <p className="text-[11px] text-slate-400">Used to evaluate signing flow, stroke angle, and public career resonance.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Feather className="w-3.5 h-3.5 text-pink-400" />
                    <span>Nickname / Pet Name</span>
                  </label>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="e.g. Avi"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-400"
                  />
                  <p className="text-[11px] text-slate-400">Used to evaluate informal subconscious aura and casual intimacy vibes.</p>
                </div>
              </div>
            </div>

            {/* SECTION 4: PARTNER & COMPATIBILITY CALIBRATION */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-400">
                  <HeartHandshake className="w-4 h-4 text-pink-400" />
                  <span>4. Partner's Details & Synergy Matrix</span>
                </div>
                <span className="text-[11px] text-pink-300/80 italic hidden sm:inline-block">
                  Enables Compatibility Reports for marriage or business partnerships
                </span>
              </div>
              <p className="text-xs text-slate-400 sm:hidden">
                Enables the software to generate Compatibility Reports for marriage or business partnerships.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    <span>Partner's Full Name</span>
                  </label>
                  <input
                    type="text"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    placeholder="e.g. Ananya Patel"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-pink-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-pink-400" />
                    <span>Partner's Birth Date</span>
                  </label>
                  <input
                    type="date"
                    value={partnerDob}
                    onChange={(e) => setPartnerDob(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-pink-400"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 5: ANCESTRAL KARMA & LINEAGE INPUTS */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>5. Ancestral Karma & Lineage Decoding</span>
                </div>
                <span className="text-[11px] text-emerald-300/80 italic hidden sm:inline-block">
                  Used in specific esoteric systems to decode ancestral karma and inherited traits
                </span>
              </div>
              <p className="text-xs text-slate-400 sm:hidden">
                Used in specific esoteric systems to decode ancestral karma and inherited traits.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Mother's Full Name</span>
                  </label>
                  <input
                    type="text"
                    value={motherName}
                    onChange={(e) => setMotherName(e.target.value)}
                    placeholder="e.g. Sunita Sharma"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>Father's Full Name</span>
                  </label>
                  <input
                    type="text"
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-amber-500 via-amber-400 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Wand2 className="w-4 h-4" />
              <span>{isGenerating ? "Synthesizing Grand Advance Numerology Report..." : "Generate Complete Advance Numerology Report"}</span>
            </button>
          </form>
        </div>
      </div>

      {/* BANNER FOR SAMPLE MODE PREVIEW */}
      {viewMode === "sample_preview" && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 text-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Eye className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="font-bold">Viewing Sample Client Report Structure:</span> This is a real example of what your clients will receive when they generate their complete advance report.
            </div>
          </div>
          <button
            onClick={() => setViewMode("generated")}
            className="px-3 py-1 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-400 shrink-0"
          >
            Switch to My Report
          </button>
        </div>
      )}

      {/* REPORT METADATA STRIP & ACTIONS */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-4 text-xs font-sans">
          <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block">Report ID:</span>
            <span className="text-amber-300 font-mono font-bold">{activeReport.clientInfo.reportId}</span>
          </div>

          <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block">Client Name:</span>
            <span className="text-white font-semibold">{activeReport.clientInfo.fullName}</span>
          </div>

          <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block">Date of Birth:</span>
            <span className="text-indigo-300 font-mono">{activeReport.clientInfo.dob}</span>
          </div>

          <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block">Generated On:</span>
            <span className="text-emerald-300 font-mono">{activeReport.clientInfo.reportGeneratedAt}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: CORE NUMBERS SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* DRIVER NUMBER */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/60 via-slate-900 to-slate-950 border border-amber-500/30 space-y-1 relative overflow-hidden">
          <div className="text-[10px] font-mono uppercase text-amber-400 font-semibold">Driver (Mulank)</div>
          <div className="text-3xl font-serif font-bold text-amber-200">
            {activeReport.coreCalculations.driverNumber}
          </div>
          <p className="text-[11px] text-slate-300 truncate">
            {activeReport.coreCalculations.driverAnalysis.rulingPlanet}
          </p>
        </div>

        {/* CONDUCTOR NUMBER */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/30 space-y-1 relative overflow-hidden">
          <div className="text-[10px] font-mono uppercase text-indigo-400 font-semibold">Conductor (Bhagyank)</div>
          <div className="text-3xl font-serif font-bold text-indigo-200">
            {activeReport.coreCalculations.conductorNumber}
          </div>
          <p className="text-[11px] text-slate-300 truncate">
            {activeReport.coreCalculations.conductorAnalysis.lord}
          </p>
        </div>

        {/* KUA NUMBER */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-500/30 space-y-1 relative overflow-hidden">
          <div className="text-[10px] font-mono uppercase text-emerald-400 font-semibold">Kua Number</div>
          <div className="text-3xl font-serif font-bold text-emerald-200">
            {activeReport.coreCalculations.kuaNumber}
          </div>
          <p className="text-[11px] text-slate-300 truncate">
            {activeReport.coreCalculations.kuaDetails.trigram} ({activeReport.coreCalculations.kuaDetails.element})
          </p>
        </div>

        {/* EXPRESSION NUMBER */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-950/60 via-slate-900 to-slate-950 border border-rose-500/30 space-y-1 relative overflow-hidden">
          <div className="text-[10px] font-mono uppercase text-rose-400 font-semibold">Expression</div>
          <div className="text-3xl font-serif font-bold text-rose-200">
            {activeReport.expressionAnalysis.number}
          </div>
          <p className="text-[11px] text-slate-300 truncate">
            {activeReport.expressionAnalysis.title}
          </p>
        </div>

        {/* SOUL URGE NUMBER */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/60 via-slate-900 to-slate-950 border border-purple-500/30 space-y-1 relative overflow-hidden">
          <div className="text-[10px] font-mono uppercase text-purple-400 font-semibold">Soul Urge</div>
          <div className="text-3xl font-serif font-bold text-purple-200">
            {activeReport.soulUrgeAnalysis.number}
          </div>
          <p className="text-[11px] text-slate-300 truncate">
            {activeReport.soulUrgeAnalysis.title}
          </p>
        </div>

        {/* PERSONALITY NUMBER */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/60 via-slate-900 to-slate-950 border border-cyan-500/30 space-y-1 relative overflow-hidden">
          <div className="text-[10px] font-mono uppercase text-cyan-400 font-semibold">Personality</div>
          <div className="text-3xl font-serif font-bold text-cyan-200">
            {activeReport.personalityAnalysis.number}
          </div>
          <p className="text-[11px] text-slate-300 truncate">
            {activeReport.personalityAnalysis.title}
          </p>
        </div>
      </div>

      {/* BIRTH NUMBER 1-31 DETAILED INTERPRETATION */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Sun className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-amber-200">
              Birth Day Analysis (Day {activeReport.birthNumberAnalysis.day} of the Month)
            </h2>
            <p className="text-xs text-slate-400">
              Archetype: {activeReport.birthNumberAnalysis.title} ({activeReport.birthNumberAnalysis.compoundNotation})
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-amber-400 uppercase font-semibold">Essential Character & Soul Signature</div>
            <p className="text-slate-200 leading-relaxed">
              {activeReport.birthNumberAnalysis.essentialCharacter}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-emerald-400 uppercase font-semibold">Core Strengths</div>
              <ul className="space-y-1">
                {activeReport.birthNumberAnalysis.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-rose-400 uppercase font-semibold">Key Growth Edges & Shadow Risks</div>
              <ul className="space-y-1">
                {activeReport.birthNumberAnalysis.challenges.map((ch, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* As Wife & As Husband */}
          {(activeReport.birthNumberAnalysis.asWife || activeReport.birthNumberAnalysis.asHusband) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeReport.birthNumberAnalysis.asWife && (
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[11px] font-mono text-pink-400 block font-semibold">As a Wife:</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeReport.birthNumberAnalysis.asWife}
                  </p>
                </div>
              )}
              {activeReport.birthNumberAnalysis.asHusband && (
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[11px] font-mono text-indigo-400 block font-semibold">As a Husband:</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeReport.birthNumberAnalysis.asHusband}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] font-mono text-indigo-400 block font-semibold">Relationship Dynamics:</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeReport.birthNumberAnalysis.relationships || activeReport.birthNumberAnalysis.relationshipLesson}
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] font-mono text-amber-400 block font-semibold">Financial & Material Tendency:</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeReport.birthNumberAnalysis.finance || activeReport.birthNumberAnalysis.financialMaterialTendency}
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] font-mono text-cyan-400 block font-semibold">Spiritual Guidance:</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeReport.birthNumberAnalysis.spiritualGuidance || activeReport.birthNumberAnalysis.spiritualInvitation}
              </p>
            </div>
          </div>

          {/* Additional Insights */}
          {activeReport.birthNumberAnalysis.additionalInsights && (
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs font-mono text-amber-400 uppercase font-semibold">Additional Correspondences & Life Lesson</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-[11px]">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[9px] uppercase font-mono">Lucky Days</span>
                  <span className="text-amber-300 font-medium">{activeReport.birthNumberAnalysis.additionalInsights.luckyDays}</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[9px] uppercase font-mono">Lucky Colors</span>
                  <span className="text-emerald-300 font-medium">{activeReport.birthNumberAnalysis.additionalInsights.luckyColors}</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[9px] uppercase font-mono">Compatible</span>
                  <span className="text-sky-300 font-medium">{activeReport.birthNumberAnalysis.additionalInsights.compatibleBirthNumbers}</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[9px] uppercase font-mono">Challenging</span>
                  <span className="text-rose-300 font-medium">{activeReport.birthNumberAnalysis.additionalInsights.challengingNumbers}</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[9px] uppercase font-mono">Gemstone</span>
                  <span className="text-purple-300 font-medium">{activeReport.birthNumberAnalysis.additionalInsights.gemstone}</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[9px] uppercase font-mono">Life Lesson</span>
                  <span className="text-slate-300 font-serif italic">{activeReport.birthNumberAnalysis.additionalInsights.lifeLesson}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 81 DRIVER-CONDUCTOR COMBINATION DETAILED ARCHETYPE */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-amber-200">
              81 Combination Matrix Analysis ({activeReport.combination81Analysis.code})
            </h2>
            <p className="text-xs text-slate-400">
              {activeReport.combination81Analysis.title} • Compatibility Grade: <span className="text-amber-300 font-bold">{activeReport.combination81Analysis.compatibilityGrade}</span>
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-indigo-400 uppercase font-semibold">Combination Personality Profile</div>
            <p className="text-slate-200 leading-relaxed">
              {activeReport.combination81Analysis.personality}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-amber-400 uppercase font-semibold">Marriage & Relationships</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeReport.combination81Analysis.marriage}
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-emerald-400 uppercase font-semibold">Financial Strategy & Wealth</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeReport.combination81Analysis.finance}
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-rose-400 uppercase font-semibold">Health & Vitality Guidelines</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeReport.combination81Analysis.health}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-amber-400 uppercase font-semibold">Recommended Career Domains</div>
              <div className="flex flex-wrap gap-2">
                {activeReport.combination81Analysis.career.map((car, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-200 rounded-lg text-xs">
                    {car}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-purple-400 uppercase font-semibold">Friendly & Neutral Numbers</div>
              <div className="text-xs text-slate-300 space-y-1">
                <div>Friends: <span className="text-amber-300 font-mono font-bold">{activeReport.combination81Analysis?.friendNumbers?.join(", ") || "—"}</span></div>
                <div>Enemies: <span className="text-rose-400 font-mono font-bold">{activeReport.combination81Analysis?.enemyNumbers?.join(", ") || "None"}</span></div>
                <div>Neutrals: <span className="text-slate-400 font-mono">{activeReport.combination81Analysis?.neutralNumbers?.join(", ") || "—"}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SOUL URGE & EXPRESSION CALLING */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* SOUL URGE */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <Heart className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="font-serif font-bold text-lg text-purple-200">
                Soul Urge Number {activeReport.soulUrgeAnalysis.number}
              </h3>
              <p className="text-xs text-slate-400">{activeReport.soulUrgeAnalysis.title}</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-purple-400 font-mono font-bold block">The Heart's Soul Hunger:</span>
              <p className="leading-relaxed">{activeReport.soulUrgeAnalysis.soulHunger}</p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-mono font-bold block">When Fulfilled:</span>
              <p className="leading-relaxed">{activeReport.soulUrgeAnalysis.whenFulfilled}</p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-amber-400 font-mono font-bold block">Spiritual Lesson:</span>
              <p className="leading-relaxed">{activeReport.soulUrgeAnalysis.spiritualLesson}</p>
            </div>
          </div>
        </div>

        {/* EXPRESSION NUMBER */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <Target className="w-5 h-5 text-rose-400" />
            <div>
              <h3 className="font-serif font-bold text-lg text-rose-200">
                Expression Calling {activeReport.expressionAnalysis.number}
              </h3>
              <p className="text-xs text-slate-400">{activeReport.expressionAnalysis.title}</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-rose-400 font-mono font-bold block">Fundamental Calling Definition:</span>
              <p className="leading-relaxed">{activeReport.expressionAnalysis.callingDefinition}</p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-indigo-400 font-mono font-bold block">Personality & Character:</span>
              <p className="leading-relaxed">{activeReport.expressionAnalysis.personalityAndCharacter}</p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-amber-400 font-mono font-bold block">Financial Pattern & Career:</span>
              <p className="leading-relaxed">{activeReport.expressionAnalysis.moneyAndFinance.pattern}</p>
            </div>
          </div>
        </div>
      </div>

      {/* OUTER PERSONALITY & SECRET INNER DREAM */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-amber-200">
              Outer Persona & Secret Inner Dream Analysis
            </h2>
            <p className="text-xs text-slate-400">
              Bridging Outer Social Impact (Personality {activeReport.personalityAnalysis.number}) with Secret Private Self-Image (Inner Dream {activeReport.innerDreamAnalysis.number})
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="text-cyan-400 font-mono font-bold uppercase">Outer Impression & Social Aura</div>
            <p className="text-slate-300 leading-relaxed">
              {activeReport.personalityAnalysis.firstImpression}
            </p>

            <div className="pt-2">
              <span className="text-slate-400 block font-semibold">Gap Between Outer & Inner:</span>
              <p className="text-slate-300 leading-relaxed mt-1">
                {activeReport.personalityAnalysis.gapBetweenOuterAndInner}
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="text-amber-400 font-mono font-bold uppercase">Secret Self-Image & Inner Dream</div>
            <p className="text-slate-300 leading-relaxed">
              {activeReport.innerDreamAnalysis.secretSelfImage}
            </p>

            <div className="pt-2">
              <span className="text-slate-400 block font-semibold">Recognition Flash:</span>
              <p className="text-slate-300 leading-relaxed mt-1">
                {activeReport.innerDreamAnalysis.recognitionFlash}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 PINNACLES & 4 CHALLENGES LIFE CYCLES */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <CompassIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-amber-200">
              4 Pinnacles & 4 Challenges Life Cycle Map
            </h2>
            <p className="text-xs text-slate-400">
              Chronological evolution across 4 distinct age phases in your life path
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeReport.pinnaclesAndChallenges.phases.map((phase: any, idx: number) => (
            <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-amber-300 font-mono">{phase.phaseLabel}</span>
                <span className="text-[10px] text-slate-400 font-mono">{phase.ageRange}</span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-emerald-400 font-mono font-bold block">
                    Pinnacle {phase.pinnacleNumber}: {phase.pinnacleDetail.title}
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed mt-0.5">
                    {phase.pinnacleDetail.theme}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-900">
                  <span className="text-rose-400 font-mono font-bold block">
                    Challenge {phase.challengeNumber}: {phase.challengeDetail.title}
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed mt-0.5">
                    {phase.challengeDetail.theme}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MASTER NUMBERS & KARMIC DEBTS (IF APPLICABLE) */}
      {(activeReport.masterAndKarmicDetails.masterDetails.length > 0 ||
        activeReport.masterAndKarmicDetails.karmicDetails.length > 0) && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-amber-200">
                Master Numbers & Karmic Debts Insights
              </h2>
              <p className="text-xs text-slate-400">
                Special high-frequency spiritual masters or ancestral karmic debt lessons present in your birth chart
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            {activeReport.masterAndKarmicDetails.masterDetails.map((master, idx) => (
              <div key={idx} className="p-4 bg-purple-950/20 border border-purple-500/40 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-base text-purple-200">Master Number {master.number} — {master.title}</span>
                  <span className="px-2 py-0.5 bg-purple-900/50 text-purple-300 rounded font-mono text-[10px]">Archetype: {master.archetype}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{master.introduction}</p>
                <div className="p-3 bg-slate-950 rounded-lg border border-purple-900/50 italic text-purple-200">
                  "{master.quote.text}" — {master.quote.author}
                </div>
              </div>
            ))}

            {activeReport.masterAndKarmicDetails.karmicDetails.map((karmic, idx) => (
              <div key={idx} className="p-4 bg-rose-950/20 border border-rose-500/40 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-base text-rose-200">{karmic.title}</span>
                  <span className="px-2 py-0.5 bg-rose-900/50 text-rose-300 rounded font-mono text-[10px]">Debt: {karmic.debtNumber}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{karmic.introduction}</p>
                <div className="p-3 bg-slate-950 rounded-lg border border-rose-900/50 text-slate-300">
                  <span className="text-rose-400 font-bold block mb-1">Karmic Lesson & Remedy:</span>
                  <p>{karmic.lessonTheme}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RULING DEITY & PLANETARY HIGH-DEFINITION VISUALS */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-amber-200">
              Ruling Deity, Celestial Planet & Sacred Gemstones
            </h2>
            <p className="text-xs text-slate-400">
              Sacred imagery and divine archetypes aligned with Driver Number {activeReport.coreCalculations.driverNumber}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* DEITY IMAGE CARD */}
          <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 space-y-2">
            <div className="h-48 overflow-hidden relative">
              <img
                src={resolveImageUrl(activeReport.planetaryDetails.deityImageUrl)}
                alt={activeReport.planetaryDetails.rulingDeity}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 bg-slate-900/80 px-2 py-0.5 rounded text-[10px] text-amber-300 font-mono">
                Divine Deity
              </div>
            </div>
            <div className="p-3">
              <div className="font-serif font-bold text-sm text-amber-200">
                {activeReport.planetaryDetails.rulingDeity}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {activeReport.planetaryDetails.deityTitle}
              </div>
            </div>
          </div>

          {/* PLANET IMAGE CARD */}
          <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 space-y-2">
            <div className="h-48 overflow-hidden relative">
              <img
                src={resolveImageUrl(activeReport.planetaryDetails.planetImageUrl)}
                alt={activeReport.planetaryDetails.rulingPlanet}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 bg-slate-900/80 px-2 py-0.5 rounded text-[10px] text-indigo-300 font-mono">
                Governing Planet
              </div>
            </div>
            <div className="p-3">
              <div className="font-serif font-bold text-sm text-indigo-200">
                {activeReport.planetaryDetails.rulingPlanet}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Lord of Sun Sign & Vital Consciousness
              </div>
            </div>
          </div>

          {/* CRYSTAL IMAGE CARD */}
          <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 space-y-2">
            <div className="h-48 overflow-hidden relative">
              <img
                src={resolveImageUrl(activeReport.planetaryDetails.crystalImageUrl)}
                alt={activeReport.planetaryDetails.crystalName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 bg-slate-900/80 px-2 py-0.5 rounded text-[10px] text-rose-300 font-mono">
                Primary Crystal
              </div>
            </div>
            <div className="p-3">
              <div className="font-serif font-bold text-sm text-rose-200">
                {activeReport.planetaryDetails.crystalName}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Auric Mineral Frequency Transceiver
              </div>
            </div>
          </div>
        </div>

        {/* MANANTRA STRIP */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs text-amber-400 uppercase tracking-widest font-mono">
              Primary Vedic Seed Mantra
            </div>
            <div className="font-serif text-lg text-amber-100 italic">
              "{activeReport.planetaryDetails.mantra}"
            </div>
          </div>
          <div className="text-xs text-slate-400 bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
            Chant 108 times daily at Sunrise facing East
          </div>
        </div>
      </div>

      {/* LO SHU MAGIC SQUARE GRID, PLANES & DETECTED ARROWS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LO SHU GRID VISUAL 3x3 */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Layers className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif font-bold text-lg text-amber-200">
              Lo Shu Magic Square Grid
            </h3>
          </div>

          {/* GRID MATRIX */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800 aspect-square">
            {[
              { pos: 4, label: "4 (SE - Wood)", num: activeReport.loShuGrid.counts[4] },
              { pos: 9, label: "9 (S - Fire)", num: activeReport.loShuGrid.counts[9] },
              { pos: 2, label: "2 (SW - Earth)", num: activeReport.loShuGrid.counts[2] },
              { pos: 3, label: "3 (E - Wood)", num: activeReport.loShuGrid.counts[3] },
              { pos: 5, label: "5 (Center - Earth)", num: activeReport.loShuGrid.counts[5] },
              { pos: 7, label: "7 (W - Metal)", num: activeReport.loShuGrid.counts[7] },
              { pos: 8, label: "8 (NE - Earth)", num: activeReport.loShuGrid.counts[8] },
              { pos: 1, label: "1 (N - Water)", num: activeReport.loShuGrid.counts[1] },
              { pos: 6, label: "6 (NW - Metal)", num: activeReport.loShuGrid.counts[6] }
            ].map((cell, idx) => {
              const count = cell.num || 0;
              const isPresent = count > 0;
              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                    isPresent
                      ? "bg-indigo-950/70 border-indigo-500/50 text-white shadow-md shadow-indigo-950/40"
                      : "bg-slate-900/40 border-slate-800/80 text-slate-600"
                  }`}
                >
                  <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">
                    {cell.pos}
                  </div>

                  <div className={`text-2xl font-bold font-mono ${isPresent ? "text-amber-300" : "text-slate-600"}`}>
                    {isPresent ? String(cell.pos).repeat(Math.min(count, 3)) : "—"}
                  </div>

                  <div className="text-[9px] text-slate-400 mt-1 line-clamp-1">
                    {isPresent ? `${count}x Present` : "Missing"}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-900/40 text-emerald-300">
              Present: <span className="font-bold">{activeReport.loShuGrid?.presentNumbers?.join(", ") || "—"}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-900/40 text-rose-300">
              Missing: <span className="font-bold">{activeReport.loShuGrid?.missingNumbers?.join(", ") || "None"}</span>
            </div>
          </div>
        </div>

        {/* LO SHU PLANES BREAKDOWN */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Compass className="w-5 h-5 text-indigo-400" />
            <h3 className="font-serif font-bold text-lg text-indigo-200">
              The 6 Planes & Yoga Arrows Analysis
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between font-bold text-amber-300">
                <span>Mental Plane (4 – 9 – 2)</span>
                <span>{activeReport.loShuGrid.planes.mentalPlane.status}</span>
              </div>
              <p className="text-slate-300">{activeReport.loShuGrid.planes.mentalPlane.meaning}</p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between font-bold text-indigo-300">
                <span>Emotional Plane (3 – 5 – 7)</span>
                <span>{activeReport.loShuGrid.planes.emotionalPlane.status}</span>
              </div>
              <p className="text-slate-300">{activeReport.loShuGrid.planes.emotionalPlane.meaning}</p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between font-bold text-emerald-300">
                <span>Practical Plane (8 – 1 – 6)</span>
                <span>{activeReport.loShuGrid.planes.practicalPlane.status}</span>
              </div>
              <p className="text-slate-300">{activeReport.loShuGrid.planes.practicalPlane.meaning}</p>
            </div>

            {/* GOLDEN & SILVER YOGA STATUS */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className={`p-3 rounded-xl border ${activeReport.loShuGrid.planes.goldenYoga ? "bg-amber-950/40 border-amber-500/50 text-amber-200" : "bg-slate-950 border-slate-800 text-slate-500"}`}>
                <div className="font-bold">Golden Raj Yoga (8-5-2)</div>
                <div className="text-[11px] mt-0.5">
                  {activeReport.loShuGrid.planes.goldenYoga ? "ACTIVE • High Fortune, Land & Property Wealth" : "Incomplete • Requires Earth Element Remedy"}
                </div>
              </div>

              <div className={`p-3 rounded-xl border ${activeReport.loShuGrid.planes.silverYoga ? "bg-cyan-950/40 border-cyan-500/50 text-cyan-200" : "bg-slate-950 border-slate-800 text-slate-500"}`}>
                <div className="font-bold">Silver Raj Yoga (4-5-6)</div>
                <div className="text-[11px] mt-0.5">
                  {activeReport.loShuGrid.planes.silverYoga ? "ACTIVE • Fame, Global Business & Support" : "Incomplete • Requires Metal Element Remedy"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MISSING NUMBER REMEDIES WITH YANTRAS & CRYSTALS */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Gem className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-amber-200">
              Missing Number Energy Neutralization & Remedies
            </h2>
            <p className="text-xs text-slate-400">
              Targeted Yantra geometries, Crystal minerals, and Color therapies for missing frequencies
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeReport.missingNumberRemedies.map((remedy) => (
            <div
              key={remedy.missingNumber}
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-rose-950 border border-rose-500/40 flex items-center justify-center font-mono font-bold text-rose-300">
                    {remedy.missingNumber}
                  </span>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-amber-200">
                      Missing Number {remedy.missingNumber}
                    </h3>
                    <div className="text-xs text-slate-400">
                      Governing Planet: {remedy.governingPlanet}
                    </div>
                  </div>
                </div>

                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800 font-mono">
                  {remedy.element}
                </span>
              </div>

              {/* IMAGES FOR YANTRA AND CRYSTAL */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="h-28 rounded-lg overflow-hidden border border-slate-800 relative">
                    <img
                      src={resolveImageUrl(remedy.yantraImage)}
                      alt={remedy.yantra}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 left-1 bg-slate-950/80 px-1.5 py-0.5 rounded text-[9px] text-amber-300">
                      Yantra
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-slate-200">{remedy.yantra}</div>
                </div>

                <div className="space-y-1">
                  <div className="h-28 rounded-lg overflow-hidden border border-slate-800 relative">
                    <img
                      src={resolveImageUrl(remedy.gemstoneImage)}
                      alt={remedy.crystal}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 left-1 bg-slate-950/80 px-1.5 py-0.5 rounded text-[9px] text-rose-300">
                      Crystal
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-slate-200">{remedy.crystal}</div>
                </div>
              </div>

              <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 leading-relaxed">
                {remedy.remedyText}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CHAKRA BALANCING & BIRTH MONTH GATE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CHAKRA BALANCING */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <Activity className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-serif font-bold text-lg text-emerald-200">
                Primary Chakra Balancing
              </h3>
              <p className="text-xs text-slate-400">
                Energy Body Realignment for {activeReport.chakraBalancing.primaryChakraToBalance}
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Primary Target Chakra:</span>
              <span className="text-xs font-bold text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
                {activeReport.chakraBalancing.primaryChakraToBalance}
              </span>
            </div>

            <div className="space-y-2 pt-1">
              {activeReport.chakraBalancing.remedySteps.map((step: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BIRTH MONTH GATE */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <Calendar className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="font-serif font-bold text-lg text-indigo-200">
                Birth Month Gate Analysis
              </h3>
              <p className="text-xs text-slate-400">
                {activeReport.birthMonthAnalysis.monthName} — {activeReport.birthMonthAnalysis.data.title}
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs text-slate-300">
            <p className="line-clamp-4 leading-relaxed italic border-l-2 border-indigo-500/50 pl-3">
              "{activeReport.birthMonthAnalysis.data.characterAndPersonality}"
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
              <div className="bg-slate-900 p-2 rounded border border-slate-800">
                <span className="text-slate-400 block">Lucky Days:</span>
                <span className="text-amber-300 font-semibold">{activeReport.birthMonthAnalysis.data.luckyDays}</span>
              </div>
              <div className="bg-slate-900 p-2 rounded border border-slate-800">
                <span className="text-slate-400 block">Lucky Colours:</span>
                <span className="text-emerald-300 font-semibold">{activeReport.birthMonthAnalysis.data.luckyColours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3-YEAR FORECAST & PERSONAL YEAR GRAPH DATA */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-amber-200">
              3-Year Personal Year Cycle Forecast
            </h2>
            <p className="text-xs text-slate-400">
              Current Personal Year: {activeReport.forecastData.personalYear} | Current Personal Month: {activeReport.forecastData.personalMonth}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeReport.forecastData.threeYearOutlook.map((item) => (
            <div
              key={item.year}
              className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-mono text-lg font-bold text-white">{item.year}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs font-mono font-bold">
                  Personal Year {item.py}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* TELECOMMUNICATION & SPACE RESONANCE */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-amber-200">
              Telecommunication & Space Resonance
            </h2>
            <p className="text-xs text-slate-400">
              Mobile phone frequencies, Commercial enterprise vibratory grades, and Living space Vastu numbers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* PRIMARY MOBILE */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-bold text-slate-200">Primary Mobile Number</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                activeReport.extendedInputsAnalysis?.mobileAnalysis.primary.status === "Harmonious"
                  ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                  : activeReport.extendedInputsAnalysis?.mobileAnalysis.primary.status === "Challenging"
                  ? "bg-rose-950 text-rose-300 border border-rose-800"
                  : "bg-indigo-950 text-indigo-300 border border-indigo-800"
              }`}>
                {activeReport.extendedInputsAnalysis?.mobileAnalysis.primary.status} Resonance
              </span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-mono">Mobile Number:</span>
                <span className="text-base font-mono font-bold text-amber-300 tracking-wider">
                  {activeReport.extendedInputsAnalysis?.mobileAnalysis.primary.number}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-mono">Total / Root:</span>
                <span className="text-sm font-mono font-bold text-emerald-400">
                  {activeReport.extendedInputsAnalysis?.mobileAnalysis.primary.compound} ➔ Root {activeReport.extendedInputsAnalysis?.mobileAnalysis.primary.single} ({activeReport.extendedInputsAnalysis?.mobileAnalysis.primary.planet})
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeReport.extendedInputsAnalysis?.mobileAnalysis.primary.resonance}
            </p>

            <div className="text-xs text-amber-300/90 bg-amber-950/20 p-2.5 rounded-lg border border-amber-500/20">
              <strong className="text-amber-200">Best Career Use: </strong>
              {activeReport.extendedInputsAnalysis?.mobileAnalysis.primary.suitability}
            </div>
          </div>

          {/* SECONDARY MOBILE (IF AVAILABLE) OR HOUSE SPACE NUMEROLOGY */}
          {activeReport.extendedInputsAnalysis?.mobileAnalysis.secondary ? (
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-bold text-slate-200">Secondary Mobile Number</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
                  {activeReport.extendedInputsAnalysis.mobileAnalysis.secondary.status} Resonance
                </span>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-mono">Mobile Number:</span>
                  <span className="text-base font-mono font-bold text-cyan-300 tracking-wider">
                    {activeReport.extendedInputsAnalysis.mobileAnalysis.secondary.number}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-mono">Total / Root:</span>
                  <span className="text-sm font-mono font-bold text-cyan-400">
                    {activeReport.extendedInputsAnalysis.mobileAnalysis.secondary.compound} ➔ Root {activeReport.extendedInputsAnalysis.mobileAnalysis.secondary.single} ({activeReport.extendedInputsAnalysis.mobileAnalysis.secondary.planet})
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {activeReport.extendedInputsAnalysis.mobileAnalysis.secondary.resonance}
              </p>

              <div className="text-xs text-cyan-300/90 bg-cyan-950/20 p-2.5 rounded-lg border border-cyan-500/20">
                <strong className="text-cyan-200">Best Career Use: </strong>
                {activeReport.extendedInputsAnalysis.mobileAnalysis.secondary.suitability}
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-bold text-slate-200">House / Flat Space Numerology</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-950 text-amber-300 border border-amber-800">
                  Vastu Resonance
                </span>
              </div>
              {activeReport.extendedInputsAnalysis?.spaceAndBusinessAnalysis.house ? (
                <>
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between">
                    <span className="text-sm font-mono font-bold text-white">
                      {activeReport.extendedInputsAnalysis.spaceAndBusinessAnalysis.house.houseNumber}
                    </span>
                    <span className="text-xs font-mono text-amber-300 font-bold">
                      Root {activeReport.extendedInputsAnalysis.spaceAndBusinessAnalysis.house.single} Vibration
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeReport.extendedInputsAnalysis.spaceAndBusinessAnalysis.house.vastuVibe}
                  </p>
                  <p className="text-xs text-emerald-300/90 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-500/20">
                    <strong className="text-emerald-200">Vastu Remedy: </strong>
                    {activeReport.extendedInputsAnalysis.spaceAndBusinessAnalysis.house.recommendedRemedy}
                  </p>
                </>
              ) : (
                <p className="text-xs text-slate-400 italic">No house / flat details provided.</p>
              )}
            </div>
          )}
        </div>

        {/* BUSINESS & HOUSE SECONDARY ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* BUSINESS / COMPANY NAME */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-bold text-slate-200">Business / Enterprise Name</span>
              </div>
              {activeReport.extendedInputsAnalysis?.spaceAndBusinessAnalysis.business && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
                  {activeReport.extendedInputsAnalysis.spaceAndBusinessAnalysis.business.prosperityGrade}
                </span>
              )}
            </div>
            {activeReport.extendedInputsAnalysis?.spaceAndBusinessAnalysis.business ? (
              <>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between">
                  <span className="text-sm font-serif font-bold text-indigo-200">
                    {activeReport.extendedInputsAnalysis.spaceAndBusinessAnalysis.business.businessName}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-300">
                    Chaldean Root {activeReport.extendedInputsAnalysis.spaceAndBusinessAnalysis.business.chaldeanSingle}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeReport.extendedInputsAnalysis.spaceAndBusinessAnalysis.business.commercialVibe}
                </p>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800 text-slate-400">
                  <span>Financial Prosperity Index:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {activeReport.extendedInputsAnalysis.spaceAndBusinessAnalysis.business.financialProsperityIndex}% High Synergy
                  </span>
                </div>
              </>
            ) : (
              <p className="text-xs text-slate-400 italic">No business / company name provided for evaluation.</p>
            )}
          </div>

          {/* HOUSE / FLAT IF SECONDARY MOBILE WAS ALSO DISPLAYED ABOVE */}
          {activeReport.extendedInputsAnalysis?.mobileAnalysis.secondary && activeReport.extendedInputsAnalysis?.spaceAndBusinessAnalysis.house && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-bold text-slate-200">House / Flat Space Numerology</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-950 text-amber-300 border border-amber-800">
                  Vastu Resonance
                </span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <span className="text-sm font-mono font-bold text-white">
                  {activeReport.extendedInputsAnalysis.spaceAndBusinessAnalysis.house.houseNumber}
                </span>
                <span className="text-xs font-mono text-amber-300 font-bold">
                  Root {activeReport.extendedInputsAnalysis.spaceAndBusinessAnalysis.house.single} Vibration
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeReport.extendedInputsAnalysis.spaceAndBusinessAnalysis.house.vastuVibe}
              </p>
              <p className="text-xs text-emerald-300/90 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-500/20">
                <strong className="text-emerald-200">Vastu Remedy: </strong>
                {activeReport.extendedInputsAnalysis.spaceAndBusinessAnalysis.house.recommendedRemedy}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CURRENT / SIGNATURE NAME & NICKNAME CALIBRATION */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <PenTool className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-amber-200">
              Signature & Nickname Harmonic Calibration
            </h2>
            <p className="text-xs text-slate-400">
              Chaldean-Pythagorean signature penmanship calibration and informal calling aura vibrations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PenTool className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold text-slate-200">Current / Active Signature Name</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-950 text-purple-300 border border-purple-800">
                Resonance: {activeReport.extendedInputsAnalysis?.nameSignatureAnalysis.resonanceScore}%
              </span>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-400 block">Signed Name:</span>
                <span className="text-lg font-serif font-bold text-amber-200">
                  {activeReport.extendedInputsAnalysis?.nameSignatureAnalysis.currentSignatureName}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-center">
                  <span className="text-[10px] font-mono text-slate-400 block">Chaldean Root</span>
                  <span className="text-sm font-mono font-bold text-amber-300">
                    {activeReport.extendedInputsAnalysis?.nameSignatureAnalysis.chaldeanSingle}
                  </span>
                </div>
                <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-center">
                  <span className="text-[10px] font-mono text-slate-400 block">Pythagorean</span>
                  <span className="text-sm font-mono font-bold text-indigo-300">
                    {activeReport.extendedInputsAnalysis?.nameSignatureAnalysis.pythagoreanSingle}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-emerald-400">
                Alignment Status: {activeReport.extendedInputsAnalysis?.nameSignatureAnalysis.harmonyWithBirthChart}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded-lg border border-slate-800">
                <strong className="text-amber-300">Master Penmanship Direction: </strong>
                {activeReport.extendedInputsAnalysis?.nameSignatureAnalysis.signatureGuidance}
              </p>
            </div>
          </div>

          {/* NICKNAME / CALLING NAME */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Feather className="w-4 h-4 text-pink-400" />
                <span className="text-sm font-bold text-slate-200">Nickname / Pet Name Vibration</span>
              </div>
              {activeReport.extendedInputsAnalysis?.nameSignatureAnalysis.nicknameAnalysis ? (
                <>
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between">
                    <span className="text-base font-serif font-bold text-pink-200">
                      "{activeReport.extendedInputsAnalysis.nameSignatureAnalysis.nicknameAnalysis.nickname}"
                    </span>
                    <span className="text-xs font-mono font-bold text-pink-400">
                      Root {activeReport.extendedInputsAnalysis.nameSignatureAnalysis.nicknameAnalysis.chaldeanSingle}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeReport.extendedInputsAnalysis.nameSignatureAnalysis.nicknameAnalysis.auraImpact}
                  </p>
                </>
              ) : (
                <p className="text-xs text-slate-400 italic">No nickname / calling name registered.</p>
              )}
            </div>
            <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 mt-2">
              Calling names imprint immediate subconscious ether whenever friends and family speak them out loud.
            </div>
          </div>
        </div>

        {/* 81 COMBINATION MATRIX NAME, SIGNATURE & NICKNAME SUGGESTIONS CARD */}
        <SignatureAndNameCorrectionCard
          fullName={fullName || activeReport.clientInfo?.fullName || "Aarav Sharma"}
          signatureName={currentSignatureName || activeReport.extendedInputsAnalysis?.nameSignatureAnalysis?.currentSignatureName || fullName}
          nickname={nickname || activeReport.extendedInputsAnalysis?.nameSignatureAnalysis?.nicknameAnalysis?.nickname || ""}
          driver={activeReport.coreCalculations?.driverNumber ?? 1}
          conductor={activeReport.coreCalculations?.conductorNumber ?? 1}
        />
      </div>

      {/* PARTNER & PARTNERSHIP SYNERGY MATRIX */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-amber-200">
              Partner Compatibility & Synergy Matrix
            </h2>
            <p className="text-xs text-slate-400">
              Dual-chart Driver-Conductor matrix evaluation for matrimonial harmony and corporate partnerships
            </p>
          </div>
        </div>

        {activeReport.extendedInputsAnalysis?.partnerCompatibility ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs font-mono text-slate-400 block">Partner Name & DOB</span>
                <div className="text-sm font-bold text-pink-200 font-serif">
                  {activeReport.extendedInputsAnalysis.partnerCompatibility.partnerName}
                </div>
                <div className="text-xs font-mono text-slate-400">
                  {activeReport.extendedInputsAnalysis.partnerCompatibility.partnerDob}
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs font-mono text-slate-400 block">Partner Archetype</span>
                <div className="text-sm font-bold text-amber-300 font-mono">
                  Driver {activeReport.extendedInputsAnalysis.partnerCompatibility.partnerDriver} • Conductor {activeReport.extendedInputsAnalysis.partnerCompatibility.partnerConductor}
                </div>
                <div className="text-xs text-slate-400">Dual Core Planetary Resonance</div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs font-mono text-slate-400 block">Synergy Quotient</span>
                <div className="text-xl font-bold text-emerald-400 font-mono">
                  {activeReport.extendedInputsAnalysis.partnerCompatibility.synergyScore}% Celestial Harmony
                </div>
                <div className="text-xs text-slate-400">High Cosmological Accord</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <Heart className="w-4 h-4" />
                  <span>Marriage & Romance Alignment</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                  {activeReport.extendedInputsAnalysis.partnerCompatibility.marriageCompatibility}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-800">
                  {activeReport.extendedInputsAnalysis.partnerCompatibility.karmicBondAnalysis}
                </p>
              </div>

              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                  <Briefcase className="w-4 h-4" />
                  <span>Business & Partnership Alignment</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                  {activeReport.extendedInputsAnalysis.partnerCompatibility.businessPartnershipSynergy}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-800">
                  Both individuals bring mutually reinforcing numerical strengths, establishing a balanced executive dynamic where intuition and structural execution support sustainable joint expansion.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-2">
            <Users className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-sm text-slate-300">No partner details entered.</p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Add a partner's name and birth date in the input form above to unlock full marriage and business compatibility reports.
            </p>
          </div>
        )}
      </div>

      {/* ANCESTRAL KARMA & LINEAGE DECODING */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-amber-200">
              Ancestral Karma & Lineage Vibrations
            </h2>
            <p className="text-xs text-slate-400">
              Esoteric genetic decoding of inherited traits, subconscious maternal matrix, and paternal dharmic code
            </p>
          </div>
        </div>

        {activeReport.extendedInputsAnalysis?.ancestralKarmaLineage ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* MATERNAL LINEAGE */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-400" />
                    <span className="text-sm font-bold text-slate-200">Maternal Lineage (Mother)</span>
                  </div>
                  {activeReport.extendedInputsAnalysis.ancestralKarmaLineage.maternalLineageVibration && (
                    <span className="text-xs font-mono font-bold text-indigo-300 bg-indigo-950 px-2.5 py-0.5 rounded-full border border-indigo-800">
                      Root {activeReport.extendedInputsAnalysis.ancestralKarmaLineage.maternalLineageVibration.chaldeanSingle} • {activeReport.extendedInputsAnalysis.ancestralKarmaLineage.maternalLineageVibration.planet}
                    </span>
                  )}
                </div>
                {activeReport.extendedInputsAnalysis.ancestralKarmaLineage.maternalLineageVibration ? (
                  <>
                    <div className="text-sm font-serif font-bold text-indigo-200">
                      {activeReport.extendedInputsAnalysis.ancestralKarmaLineage.maternalLineageVibration.name}
                    </div>
                    <div className="text-xs font-semibold text-amber-300/90">
                      {activeReport.extendedInputsAnalysis.ancestralKarmaLineage.maternalLineageVibration.karmicAttribute}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeReport.extendedInputsAnalysis.ancestralKarmaLineage.maternalLineageVibration.inheritedInstincts}
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-slate-400 italic">Mother's name not provided.</p>
                )}
              </div>

              {/* PATERNAL LINEAGE */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-bold text-slate-200">Paternal Lineage (Father)</span>
                  </div>
                  {activeReport.extendedInputsAnalysis.ancestralKarmaLineage.paternalLineageVibration && (
                    <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-800">
                      Root {activeReport.extendedInputsAnalysis.ancestralKarmaLineage.paternalLineageVibration.chaldeanSingle} • {activeReport.extendedInputsAnalysis.ancestralKarmaLineage.paternalLineageVibration.planet}
                    </span>
                  )}
                </div>
                {activeReport.extendedInputsAnalysis.ancestralKarmaLineage.paternalLineageVibration ? (
                  <>
                    <div className="text-sm font-serif font-bold text-amber-200">
                      {activeReport.extendedInputsAnalysis.ancestralKarmaLineage.paternalLineageVibration.name}
                    </div>
                    <div className="text-xs font-semibold text-emerald-300/90">
                      {activeReport.extendedInputsAnalysis.ancestralKarmaLineage.paternalLineageVibration.karmicAttribute}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeReport.extendedInputsAnalysis.ancestralKarmaLineage.paternalLineageVibration.inheritedDharmicPath}
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-slate-400 italic">Father's name not provided.</p>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs text-slate-300">
              <span className="font-bold text-emerald-400 block font-mono uppercase">Ancestral Synthesis & Karmic Balance:</span>
              <p className="leading-relaxed">
                {activeReport.extendedInputsAnalysis.ancestralKarmaLineage.ancestralSynthesis}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-2">
            <ShieldCheck className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-sm text-slate-300">No parental details entered.</p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Add mother's and father's names to unlock esoteric ancestral lineage traits and karmic inheritance analysis.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

