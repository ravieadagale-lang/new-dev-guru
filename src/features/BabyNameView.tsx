// src/features/BabyNameView.tsx
// Master Vedic & Numerological Baby Name Guidance System

import React, { useState, useMemo } from "react";
import { 
  Sparkles, 
  Baby, 
  Compass, 
  Star, 
  Heart, 
  BookOpen, 
  CheckCircle2, 
  Info,
  ChevronRight,
  Hash,
  Filter,
  Bookmark,
  Award,
  Zap,
  Sliders,
  Users,
  Moon,
  ShieldCheck,
  RotateCcw
} from "lucide-react";
import { LanguageCode } from "../types";
import { 
  BabyBirthInput, 
  AstroJanmaksharResult, 
  BabyNumerologyProfile, 
  NameCandidate 
} from "../types/babyNameTypes";
import { BabyNameVibrationEngine } from "../engine/babyNameVibrationEngine";
import { BabyBirthDetailsForm } from "../components/baby/BabyBirthDetailsForm";
import { SmartNameSuggestions } from "../components/baby/SmartNameSuggestions";
import { JanmaksharExplorer } from "../components/baby/JanmaksharExplorer";
import { NameLibraryBrowser } from "../components/baby/NameLibraryBrowser";
import { SpellingOptimizerTool } from "../components/baby/SpellingOptimizerTool";
import { FamilyShortlistManager } from "../components/baby/FamilyShortlistManager";
import { NamakaranaCertificateModal } from "../components/baby/NamakaranaCertificateModal";

interface BabyNameViewProps {
  selectedLanguage?: LanguageCode;
  onNavigateTab?: (tab: string) => void;
  initialSubSection?: string;
}

export const BABY_NAME_SUBMENUS = [
  {
    id: "dashboard",
    title: "Smart Name Suggestions",
    category: "Master Assistant",
    description: "Holistic problem-solver calculating Moon Nakshatra Janmakshar & Chaldean vibrations to suggest 5+ perfect names."
  },
  {
    id: "birth_details",
    title: "Birth Details & Parents Form",
    category: "Input & Lineage",
    description: "Enter baby's date, time, and city of birth alongside parents' details for harmonic calculation."
  },
  {
    id: "nakshatra_pada",
    title: "Nakshatra & 108 Pada Explorer",
    category: "Vedic Phonetics",
    description: "Deep dive into 27 Nakshatras and 108 padas with governing deities, Sanskrit sounds, and symbols."
  },
  {
    id: "name_library",
    title: "Vedic & Modern Name Library",
    category: "Directories",
    description: "Extensive curated repository of Sanskrit, Vedic, and contemporary names with meanings and deity links."
  },
  {
    id: "compare_spelling",
    title: "Spelling & Vibration Sandbox",
    category: "Harmonics & Tuning",
    description: "Test any custom name + surname in real time and discover auspicious Chaldean spelling tweaks."
  },
  {
    id: "saved_shortlist",
    title: "Family Shortlist & Voting",
    category: "Family Center",
    description: "Review, compare, and organize shortlisted candidate names collaboratively with parents."
  },
  {
    id: "baby_name_report",
    title: "Namakarana Certificate",
    category: "Sacred Dossier",
    description: "Ceremonial printable Vedic Namakarana certificate with astrological coordinates and blessings."
  }
];

export const BabyNameView: React.FC<BabyNameViewProps> = ({
  selectedLanguage = "en",
  onNavigateTab,
  initialSubSection = "dashboard"
}) => {
  const [selectedSection, setSelectedSection] = useState<string>(initialSubSection);

  // Default birth input with realistic values
  const [babyInput, setBabyInput] = useState<BabyBirthInput>({
    gender: "boy",
    dob: "2026-09-14",
    tob: "10:30",
    pob: "Mumbai, India",
    latitude: 19.076,
    longitude: 72.8777,
    timezoneOffset: 5.5,
    fatherName: "Rajesh Kumar",
    motherName: "Priya Sharma",
    surname: "Sharma",
    preferredStyle: "all",
    religion: "all"
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [activeSyllableFilter, setActiveSyllableFilter] = useState<string>("");
  const [sandboxActiveName, setSandboxActiveName] = useState<string>("Aarav");
  const [certificateCandidate, setCertificateCandidate] = useState<NameCandidate | null>(null);

  // Shortlisted Candidates
  const [shortlistedMap, setShortlistedMap] = useState<Map<string, NameCandidate>>(new Map());

  // 1. Astrological Janmakshar Calculation
  const astroResult: AstroJanmaksharResult = useMemo(() => {
    try {
      return BabyNameVibrationEngine.calculateJanmakshar(babyInput);
    } catch (err) {
      console.error("Error calculating baby Janmakshar:", err);
      return {
        moonLongitude: 45,
        rashiIndex: 1,
        rashiName: "Vrishabha (Taurus)",
        rashiSanskrit: "वृषभ",
        rashiLord: "Venus",
        rashiElement: "Earth",
        nakshatraIndex: 3,
        nakshatraName: "Rohini",
        nakshatraSanskrit: "रोहिणी",
        nakshatraLord: "Moon",
        pada: 1,
        degreeInPada: 1.2,
        deity: "Brahma",
        symbol: "Chariot",
        animal: "Serpent",
        gana: "Manushya",
        yoni: "Male Serpent",
        nadi: "Antya",
        primaryAkshara: "ओ",
        primaryAksharaEnglish: "O",
        allPadaAksharas: [
          { pada: 1, akshara: "ओ", aksharaEnglish: "O" },
          { pada: 2, akshara: "वा", aksharaEnglish: "Va" },
          { pada: 3, akshara: "वी", aksharaEnglish: "Vee" },
          { pada: 4, akshara: "वू", aksharaEnglish: "Vu" }
        ],
        alternativeFriendlyAksharas: ["Va", "Vee", "Vu"]
      };
    }
  }, [babyInput]);

  // 2. Numerology Profile
  const numerologyProfile: BabyNumerologyProfile = useMemo(() => {
    try {
      return BabyNameVibrationEngine.calculateNumerologyProfile(babyInput);
    } catch (err) {
      console.error("Error calculating baby numerology profile:", err);
      return {
        driverNumber: 5,
        conductorNumber: 6,
        driverRulingPlanet: "Mercury (Budha)",
        conductorRulingPlanet: "Venus (Shukra)",
        fatherDriver: 1,
        motherDriver: 2,
        surnameChaldean: 1,
        missingGridNumbers: [3, 7, 8],
        favorableNameNumbers: [1, 5, 6],
        neutralNameNumbers: [2, 4],
        unfavorableNameNumbers: [3, 8]
      };
    }
  }, [babyInput]);

  // 3. Top Name Suggestions (Guaranteed minimum 5, up to 25+)
  const suggestions: NameCandidate[] = useMemo(() => {
    try {
      return BabyNameVibrationEngine.generateTopSuggestions(babyInput, astroResult, numerologyProfile);
    } catch (err) {
      console.error("Error generating baby name suggestions:", err);
      return [];
    }
  }, [babyInput, astroResult, numerologyProfile]);

  const handleFormSubmit = (newValues: BabyBirthInput) => {
    setIsCalculating(true);
    setBabyInput(newValues);
    setTimeout(() => {
      setIsCalculating(false);
      setSelectedSection("dashboard");
    }, 400);
  };

  const handleToggleShortlist = (candidate: NameCandidate) => {
    setShortlistedMap((prev) => {
      const next = new Map(prev);
      if (next.has(candidate.id)) {
        next.delete(candidate.id);
      } else {
        next.set(candidate.id, candidate);
      }
      return next;
    });
  };

  const handleSelectForSpelling = (candidate: NameCandidate) => {
    setSandboxActiveName(candidate.name);
    setSelectedSection("compare_spelling");
  };

  const handleOpenCertificate = (candidate: NameCandidate) => {
    setCertificateCandidate(candidate);
  };

  const shortlistedList = Array.from(shortlistedMap.values());
  const shortlistedIds = new Set(shortlistedMap.keys());

  return (
    <div className="space-y-8 pb-20">
      {/* Impressive Attention-Holding Hero Banner with Celestial Background */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-amber-500/20 bg-slate-950">
        {/* Background Artwork */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/baby_celestial_sanctuary_1789378372402.jpg"
            alt="Celestial Baby Sanctuary"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-screen scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-950/90" />
        </div>

        {/* Content over background */}
        <div className="relative z-10 p-6 sm:p-10 text-amber-50 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5" /> Auspicious Vedic Namakarana &amp; Janmakshar
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-400/30">
                Chaldean Harmonics
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Auspicious Baby Name Finder &amp; Harmonic Solver
            </h1>

            <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-light">
              Finding the perfect name requires synchronizing <strong>Vedic Moon Nakshatra Janmakshar syllables</strong> with sacred <strong>Chaldean &amp; Pythagorean numerical vibrations</strong> and family resonance. Enter your details below for instant, auspicious name matches.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-amber-200/80">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>108 Nakshatra Pada Syllables</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Chaldean &amp; Pythagorean Matrix</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Family Lineage &amp; Surname Harmony</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Badge */}
          <div className="w-full lg:w-auto p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center flex flex-col gap-3 min-w-[240px]">
            <div className="flex items-center justify-between gap-4 text-xs text-amber-200">
              <span>Current Janmakshar:</span>
              <strong className="text-xl font-serif text-amber-300">
                {astroResult.primaryAkshara} ("{astroResult.primaryAksharaEnglish}")
              </strong>
            </div>

            <div className="h-px bg-white/10" />

            <div className="flex items-center justify-between gap-4 text-xs text-amber-200">
              <span>Moon Nakshatra:</span>
              <strong className="text-white font-medium">
                {astroResult.nakshatraName} (P{astroResult.pada})
              </strong>
            </div>

            <div className="flex items-center justify-between gap-4 text-xs text-amber-200">
              <span>Driver / Conductor:</span>
              <strong className="text-amber-300 font-mono">
                #{numerologyProfile.driverNumber} / #{numerologyProfile.conductorNumber}
              </strong>
            </div>

            <button
              type="button"
              onClick={() => setSelectedSection("birth_details")}
              className="mt-1 w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Modify Birth Details</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Multi-Tab Navigation Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Submenu Navigation Bar */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white p-3 rounded-2xl border border-amber-900/10 shadow-xs space-y-1">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
              Baby Name Modules
            </h2>
            {BABY_NAME_SUBMENUS.map((item) => {
              const isSelected = selectedSection === item.id;
              const isShortlistTab = item.id === "saved_shortlist";

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedSection(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between gap-2 cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 text-amber-300 font-semibold shadow-xs"
                      : "text-slate-700 hover:bg-amber-50/70 hover:text-slate-900"
                  }`}
                >
                  <div className="truncate">
                    <div>{item.title}</div>
                    <div className={`text-[10px] ${isSelected ? "text-amber-400/80" : "text-slate-400"}`}>
                      {item.category}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {isShortlistTab && shortlistedList.length > 0 && (
                      <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                        {shortlistedList.length}
                      </span>
                    )}
                    <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? "text-amber-400" : "text-slate-400"}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Helper Card with Secondary Background */}
          <div className="relative rounded-2xl overflow-hidden p-5 border border-purple-200 shadow-xs text-white">
            <div className="absolute inset-0 z-0">
              <img
                src="/assets/images/baby_auspicious_stars_1789378396555.jpg"
                alt="Auspicious Stars"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-35 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#2A233C] to-[#1E192B]" />
            </div>

            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Golden Naming Rule</span>
              </div>
              <p className="text-[11px] text-purple-100/90 leading-relaxed font-light">
                Ancient sages recommend choosing a name starting with the Janma Nakshatra Pada syllable. Doing so aligns the infant's subtle energetic body (Pranamaya Kosha) with cosmic starlight.
              </p>
            </div>
          </div>
        </div>

        {/* Right Active Viewport */}
        <div className="lg:col-span-9 space-y-6">
          {/* View 1: Master Dashboard & Smart Suggestions */}
          {selectedSection === "dashboard" && (
            <div className="space-y-6">
              {/* Form Trigger Preview if user wants to change details quickly */}
              <div className="p-4 bg-amber-50/80 border border-amber-200/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Baby className="w-4 h-4 text-amber-700 shrink-0" />
                  <span className="text-slate-700">
                    Showing names for: <strong className="text-slate-900 capitalize">{babyInput.gender}</strong>
                    {babyInput.religion && babyInput.religion !== "all" && (
                      <span className="ml-1.5 px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold capitalize text-[10px]">
                        {babyInput.religion}
                      </span>
                    )}
                    {" "}• Born on <strong className="text-slate-900">{babyInput.dob} {babyInput.tob}</strong> in <strong className="text-slate-900">{babyInput.pob}</strong> {babyInput.surname ? `(Surname: ${babyInput.surname})` : ""}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSection("birth_details")}
                  className="text-amber-800 hover:text-amber-950 font-bold underline cursor-pointer shrink-0"
                >
                  Edit Details
                </button>
              </div>

              {/* Suggestions Component */}
              <SmartNameSuggestions
                suggestions={suggestions}
                astro={astroResult}
                numerology={numerologyProfile}
                babyInput={babyInput}
                shortlistedIds={shortlistedIds}
                onToggleShortlist={handleToggleShortlist}
                onSelectForSpelling={handleSelectForSpelling}
                onOpenCertificate={handleOpenCertificate}
              />
            </div>
          )}

          {/* View 2: Birth Details & Parents Form */}
          {selectedSection === "birth_details" && (
            <div className="space-y-6">
              <BabyBirthDetailsForm
                initialValues={babyInput}
                onSubmit={handleFormSubmit}
                isCalculating={isCalculating}
              />
            </div>
          )}

          {/* View 3: Nakshatra & 108 Pada Explorer */}
          {selectedSection === "nakshatra_pada" && (
            <JanmaksharExplorer
              currentNakshatraIndex={astroResult.nakshatraIndex}
              currentPada={astroResult.pada}
              onSelectSyllable={(syl) => {
                setActiveSyllableFilter(syl);
                setSelectedSection("name_library");
              }}
            />
          )}

          {/* View 4: Name Library & Directory */}
          {selectedSection === "name_library" && (
            <NameLibraryBrowser
              astro={astroResult}
              numerology={numerologyProfile}
              babyInput={babyInput}
              initialSyllable={activeSyllableFilter}
              shortlistedIds={shortlistedIds}
              onToggleShortlist={handleToggleShortlist}
              onSelectForSpelling={handleSelectForSpelling}
              onOpenCertificate={handleOpenCertificate}
            />
          )}

          {/* View 5: Spelling & Vibration Sandbox */}
          {selectedSection === "compare_spelling" && (
            <SpellingOptimizerTool
              initialName={sandboxActiveName}
              babyInput={babyInput}
              astro={astroResult}
              numerology={numerologyProfile}
              onApplyName={(name) => setSandboxActiveName(name)}
              onToggleShortlist={handleToggleShortlist}
            />
          )}

          {/* View 6: Family Shortlist & Voting */}
          {selectedSection === "saved_shortlist" && (
            <FamilyShortlistManager
              shortlist={shortlistedList}
              babyInput={babyInput}
              onRemove={(id) => {
                setShortlistedMap((prev) => {
                  const next = new Map(prev);
                  next.delete(id);
                  return next;
                });
              }}
              onClearAll={() => setShortlistedMap(new Map())}
              onOpenCertificate={handleOpenCertificate}
            />
          )}

          {/* View 7: Namakarana Certificate / Dossier */}
          {selectedSection === "baby_name_report" && (
            <div className="bg-white rounded-3xl border border-amber-900/10 shadow-xs p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                  Sacred Certificate Dossier
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  Vedic Namakarana Certificate
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Select any candidate from your suggestions or shortlisted names to generate, preview, and print an authentic Namakarana Samskara certificate.
                </p>
              </div>

              {suggestions.length > 0 && (
                <div className="space-y-4">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select a Name for Certificate:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {suggestions.slice(0, 6).map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleOpenCertificate(c)}
                        className="p-4 rounded-2xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-left transition-all cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-bold text-slate-900 group-hover:text-amber-800">
                            {c.name}
                          </span>
                          <span className="text-xs font-bold text-amber-700">{c.harmonicScore}%</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 truncate font-serif">
                          {c.sanskrit} • Syllable "{c.startingSyllable}"
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Namakarana Certificate Modal */}
      {certificateCandidate && (
        <NamakaranaCertificateModal
          candidate={certificateCandidate}
          babyInput={babyInput}
          astro={astroResult}
          numerology={numerologyProfile}
          onClose={() => setCertificateCandidate(null)}
        />
      )}
    </div>
  );
};
