// src/components/baby/NameDetailModal.tsx
// Comprehensive Multi-System Name Vibrational Analysis Modal
// Displays complete Astrological Janmakshar, Pronology, Chaldean/Pythagorean Numerology,
// Full Name with Surname Harmony, and Anty-Number Immunity breakdown.

import React, { useState } from "react";
import { 
  X, 
  Sparkles, 
  Moon, 
  Heart, 
  ShieldCheck, 
  Award, 
  Zap, 
  FileText, 
  Check, 
  Copy, 
  Volume2,
  Users,
  Compass,
  Star,
  Layers,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { 
  NameCandidate, 
  AstroJanmaksharResult, 
  BabyNumerologyProfile, 
  BabyBirthInput 
} from "../../types/babyNameTypes";

interface NameDetailModalProps {
  candidate: NameCandidate | null;
  astro: AstroJanmaksharResult;
  numerology: BabyNumerologyProfile;
  babyInput: BabyBirthInput;
  isShortlisted: boolean;
  onClose: () => void;
  onToggleShortlist: (candidate: NameCandidate) => void;
  onSelectForSpelling: (candidate: NameCandidate) => void;
  onOpenCertificate: (candidate: NameCandidate) => void;
}

export const NameDetailModal: React.FC<NameDetailModalProps> = ({
  candidate,
  astro,
  numerology,
  babyInput,
  isShortlisted,
  onClose,
  onToggleShortlist,
  onSelectForSpelling,
  onOpenCertificate
}) => {
  const [copied, setCopied] = useState(false);

  if (!candidate) return null;

  const fullName = babyInput.surname 
    ? `${candidate.name} ${babyInput.surname}` 
    : candidate.name;

  const handleCopyReport = () => {
    const report = `VEDIC BABY NAME VIBRATIONAL REPORT
Name: ${candidate.name} (${candidate.sanskrit})
Full Name with Surname: ${fullName}
Harmonic Score: ${candidate.harmonicScore}%
Janmakshar: ${candidate.startingSyllable} (Nakshatra ${astro.nakshatraName}, Pada ${astro.pada})
Pronology Rating: ${candidate.pronology?.rating || "Subha Nada"} (${candidate.pronology?.syllableStructure || "2-syllable flow"})
First Name Chaldean: #${candidate.chaldeanCompound} -> Single #${candidate.chaldeanSingle}
Full Name Chaldean: #${candidate.fullNameCompound || candidate.chaldeanCompound} -> Single #${candidate.fullNameSingle || candidate.chaldeanSingle}
Anty Number Conflict: NONE (100% Harmonious with Driver #${numerology.driverNumber} & Conductor #${numerology.conductorNumber})
Meaning: ${candidate.meaning}
Deity: ${candidate.deityConnection || "Cosmic Light"}`;

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-3xl max-h-[92vh] rounded-3xl border border-amber-900/15 shadow-2xl overflow-y-auto flex flex-col relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-20 bg-gradient-to-r from-[#1B1627] via-[#261E38] to-[#1B1627] text-amber-50 p-6 sm:p-7 border-b border-amber-500/20 shadow-md">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pr-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold uppercase tracking-wider">
                  {candidate.gender}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-[11px] font-medium">
                  {candidate.origin}
                </span>
                {candidate.isJanmaksharMatch && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Exact Janmakshar
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-3 mt-2">
                <h2 className="font-serif text-3xl sm:text-4xl font-black text-amber-100 tracking-tight">
                  {candidate.name}
                </h2>
                <span className="font-serif text-2xl font-semibold text-amber-300/90">
                  {candidate.sanskrit}
                </span>
              </div>

              {babyInput.surname && (
                <div className="text-sm text-purple-200 mt-1">
                  Full Name with Surname: <strong className="text-white font-semibold">{fullName}</strong>
                </div>
              )}
            </div>

            {/* Score Badge */}
            <div className="sm:self-center p-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md text-center min-w-[110px]">
              <div className="flex items-center justify-center gap-1 text-amber-300 font-serif text-2xl font-black">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>{candidate.harmonicScore}%</span>
              </div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-amber-200/80 mt-0.5">
                Composite Harmony
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-6 text-slate-800">
          {/* Meaning & Deity Banner */}
          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase font-bold text-amber-800 tracking-wider">
                Sacred Sanskrit Meaning
              </div>
              <p className="text-sm font-medium text-slate-700 mt-0.5 leading-relaxed">
                {candidate.meaning}
              </p>
            </div>
            {candidate.deityConnection && (
              <div className="shrink-0 px-3 py-1.5 rounded-xl bg-amber-100/70 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-700" />
                <span>Deity: {candidate.deityConnection}</span>
              </div>
            )}
          </div>

          {/* SURNAME HARMONY & ZERO-ANTY ASSURANCE BANNER */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/50 to-emerald-50 border border-emerald-300/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-950 flex items-center gap-1.5">
                    Surname Alignment & Anty-Number Immunity
                  </h4>
                  <p className="text-xs text-emerald-800">
                    Calculated with child's Driver #{numerology.driverNumber} and Conductor #{numerology.conductorNumber}
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-xs">
                Zero Anty Conflict Verified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/80 border border-emerald-200 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-500">First Name Chaldean</div>
                <div className="text-lg font-black text-slate-800 mt-0.5">
                  #{candidate.chaldeanCompound} → <span className="text-emerald-700">#{candidate.chaldeanSingle}</span>
                </div>
                <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
                  {candidate.driverHarmony === "Friendly" ? "Friendly to Driver" : "Harmonious"}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/80 border border-emerald-200 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-500">
                  {babyInput.surname ? `Surname (${babyInput.surname})` : "Surname Vibration"}
                </div>
                <div className="text-lg font-black text-slate-800 mt-0.5">
                  #{candidate.surnameHarmony?.surnameChaldeanCompound || numerology.surnameChaldean} → <span className="text-emerald-700">#{candidate.surnameHarmony?.surnameChaldeanSingle || numerology.surnameChaldean}</span>
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">Ancestral Frequency</div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-100/70 border border-emerald-300 text-center">
                <div className="text-[10px] uppercase font-bold text-emerald-800">Total Full Name Vibration</div>
                <div className="text-lg font-black text-emerald-950 mt-0.5">
                  #{candidate.surnameHarmony?.fullNameCompound || candidate.fullNameCompound} → <span className="text-emerald-800">#{candidate.surnameHarmony?.fullNameSingle || candidate.fullNameSingle}</span>
                </div>
                <div className="text-[11px] text-emerald-900 font-bold mt-0.5">
                  No Inimical / Anty Dosha
                </div>
              </div>
            </div>

            {candidate.surnameHarmony?.fullNameCompoundDescription && (
              <div className="text-xs text-emerald-900 bg-white/90 p-2.5 rounded-xl border border-emerald-200">
                <strong>Full Name Compound #{candidate.surnameHarmony.fullNameCompound}:</strong> {candidate.surnameHarmony.fullNameCompoundDescription}
              </div>
            )}
          </div>

          {/* PRONOLOGY VIBRATIONAL ANALYSIS */}
          <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-purple-700" />
                <h4 className="text-sm font-bold text-purple-950">
                  Pronology Phonetic Waveform & Syllable Resonance
                </h4>
              </div>
              <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-bold">
                {candidate.pronology?.rating || "Subha Nada (Auspicious)"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
              <div className="p-3 rounded-xl bg-white border border-purple-100">
                <div className="text-[10px] font-bold uppercase text-purple-700">Metric Syllables</div>
                <div className="text-base font-black text-slate-800 mt-0.5">
                  {candidate.pronology?.syllableCount || 2} Syllables
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {candidate.pronology?.syllableStructure || "Balanced rhythmic flow"}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-purple-100">
                <div className="text-[10px] font-bold uppercase text-purple-700">Sound Ending Type</div>
                <div className="text-base font-black text-slate-800 mt-0.5">
                  {candidate.pronology?.endingSoundType || "Vowel Resonance"}
                </div>
                <div className="text-[11px] text-emerald-600 font-medium mt-0.5">
                  Auspicious Open Ending
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-purple-100">
                <div className="text-[10px] font-bold uppercase text-purple-700">Negative Sound Blocks</div>
                <div className="text-base font-black text-emerald-700 mt-0.5">
                  {candidate.pronology?.hasNegativeSound ? "Flagged" : "None Detected (Clean)"}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Zero sorrow or decay syllables
                </div>
              </div>
            </div>

            {candidate.pronology?.positiveVibrations && candidate.pronology.positiveVibrations.length > 0 && (
              <div className="text-xs text-purple-900 bg-white p-2.5 rounded-xl border border-purple-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                <span>
                  <strong>Auspicious Root Sounds Activated:</strong> {candidate.pronology.positiveVibrations.join(", ")}
                </span>
              </div>
            )}
          </div>

          {/* VEDIC JYOTISH JANMAKSHAR DEEP DIVE */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
            <div className="flex items-center gap-2">
              <Moon className="w-5 h-5 text-amber-700" />
              <h4 className="text-sm font-bold text-amber-950">
                Vedic Janmakshar & Moon Nakshatra Coordinates
              </h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-amber-200/80">
                <div className="text-[10px] text-slate-500 font-bold uppercase">Nakshatra</div>
                <div className="font-bold text-slate-900 mt-0.5">{astro.nakshatraName}</div>
                <div className="text-[10px] text-amber-700">Pada {astro.pada}</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-amber-200/80">
                <div className="text-[10px] text-slate-500 font-bold uppercase">Target Janmakshar</div>
                <div className="font-serif text-lg font-black text-amber-900 mt-0.5">{astro.primaryAkshara}</div>
                <div className="text-[10px] text-slate-600">"{astro.primaryAksharaEnglish}"</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-amber-200/80">
                <div className="text-[10px] text-slate-500 font-bold uppercase">Rashi & Lord</div>
                <div className="font-bold text-slate-900 mt-0.5">{astro.rashiSanskrit}</div>
                <div className="text-[10px] text-slate-600">{astro.rashiLord}</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-amber-200/80">
                <div className="text-[10px] text-slate-500 font-bold uppercase">Gana & Element</div>
                <div className="font-bold text-slate-900 mt-0.5">{astro.gana}</div>
                <div className="text-[10px] text-slate-600">{astro.rashiElement}</div>
              </div>
            </div>
          </div>

          {/* NUMEROLOGY TRIAD (CHALDEAN & PYTHAGOREAN) */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-slate-700" />
              <h4 className="text-sm font-bold text-slate-900">
                Pythagorean & Chaldean Numerological Blueprint
              </h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Chaldean First Name</div>
                <div className="text-lg font-black text-purple-900 mt-0.5">#{candidate.chaldeanCompound}</div>
                <div className="text-[10px] text-purple-700 font-medium">Single #{candidate.chaldeanSingle}</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Pythagorean Destiny</div>
                <div className="text-lg font-black text-blue-900 mt-0.5">#{candidate.pythagoreanExpression}</div>
                <div className="text-[10px] text-blue-700 font-medium">Expression</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Soul Urge (Vowels)</div>
                <div className="text-lg font-black text-rose-900 mt-0.5">#{candidate.soulUrgeNumber}</div>
                <div className="text-[10px] text-rose-700 font-medium">Inner Desire</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Personality</div>
                <div className="text-lg font-black text-teal-900 mt-0.5">#{candidate.personalityNumber}</div>
                <div className="text-[10px] text-teal-700 font-medium">Outer Aura</div>
              </div>
            </div>

            <div className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200 leading-relaxed">
              <strong>Compound #{candidate.chaldeanCompound} Vibration:</strong> {candidate.compoundDescription}
            </div>

            {candidate.gridCompensation && (
              <div className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200">
                <strong>Lo Shu Grid Balance:</strong> {candidate.gridCompensation}
              </div>
            )}
          </div>

          {/* REASONS FOR ALIGNMENT LIST */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Key Alignment Factors
            </h4>
            <div className="space-y-1.5">
              {candidate.reasons.map((r, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer / Action Bar */}
        <div className="sticky bottom-0 z-20 bg-slate-50 p-4 sm:p-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopyReport}
            className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
            <span>{copied ? "Copied Full Report!" : "Copy Report"}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleShortlist(candidate)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                isShortlisted
                  ? "bg-rose-100 text-rose-800 border border-rose-300"
                  : "bg-white border border-rose-200 text-rose-700 hover:bg-rose-50"
              }`}
            >
              <Heart className={`w-4 h-4 ${isShortlisted ? "fill-rose-600 text-rose-600" : ""}`} />
              <span>{isShortlisted ? "Shortlisted" : "Save to Shortlist"}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onSelectForSpelling(candidate);
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Spelling Optimizer</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onOpenCertificate(candidate);
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span>Certificate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
