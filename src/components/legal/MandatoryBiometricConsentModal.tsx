import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Lock, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  FileText, 
  ExternalLink,
  X,
  Sparkles,
  Info,
  Clock,
  Hand,
  User,
  Check,
  ToggleLeft,
  ToggleRight
} from "lucide-react";

export interface SamudrikaConsentState {
  hasConsented: boolean;
  consentedAt?: string;
  policyVersion: string;
  isAdultConfirmed: boolean;
  photoProcessingConsented: boolean;
  molesMarksOptIn: boolean;
  targetType?: "palm" | "face" | "both";
}

export const CONSENT_STORAGE_KEY = "astronext_samudrika_consent";

export function getStoredBiometricConsent(): SamudrikaConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY) || localStorage.getItem("astrosage_samudrika_consent");
    if (!raw) return null;
    const parsed: SamudrikaConsentState = JSON.parse(raw);
    if (parsed && parsed.hasConsented && parsed.isAdultConfirmed) {
      return parsed;
    }
  } catch (e) {
    console.warn("Error reading biometric consent:", e);
  }
  return null;
}

export function hasValidBiometricConsent(): boolean {
  const consent = getStoredBiometricConsent();
  return !!(consent && consent.hasConsented && consent.isAdultConfirmed);
}

interface MandatoryBiometricConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType?: "palm" | "face" | "both";
  language?: string;
  onConsentSuccess: (state: SamudrikaConsentState) => void;
  onOpenFullTerms?: () => void;
}

export const MandatoryBiometricConsentModal: React.FC<MandatoryBiometricConsentModalProps> = ({
  isOpen,
  onClose,
  targetType = "both",
  language = "en",
  onConsentSuccess,
  onOpenFullTerms
}) => {
  const [isAdultConfirmed, setIsAdultConfirmed] = useState(false);
  const [isPhotoConsentConfirmed, setIsPhotoConsentConfirmed] = useState(false);
  const [molesMarksOptIn, setMolesMarksOptIn] = useState(true);
  const [hasPurged, setHasPurged] = useState(false);

  // Initialize from previous preferences if any
  useEffect(() => {
    if (isOpen) {
      const existing = getStoredBiometricConsent();
      if (existing) {
        setIsAdultConfirmed(existing.isAdultConfirmed ?? false);
        setIsPhotoConsentConfirmed(existing.photoProcessingConsented ?? true);
        setMolesMarksOptIn(existing.molesMarksOptIn ?? true);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isMandatoryAccepted = isAdultConfirmed && isPhotoConsentConfirmed;

  const handleAgree = () => {
    if (!isMandatoryAccepted) return;

    const consentState: SamudrikaConsentState = {
      hasConsented: true,
      consentedAt: new Date().toISOString(),
      policyVersion: "v2.0-dpdp-gdpr-consent",
      isAdultConfirmed: true,
      photoProcessingConsented: true,
      molesMarksOptIn,
      targetType: (targetType === "palm" || targetType === "face" || targetType === "both") ? targetType : "both"
    };

    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentState));
    } catch (e) {
      console.warn("Storage error saving consent:", e);
    }

    onConsentSuccess(consentState);
  };

  const handlePurgeAllData = () => {
    try {
      localStorage.removeItem("astro_saved_palm_reports");
      localStorage.removeItem("astro_saved_face_reports");
      localStorage.removeItem(CONSENT_STORAGE_KEY);
      setHasPurged(true);
      setIsAdultConfirmed(false);
      setIsPhotoConsentConfirmed(false);
      setTimeout(() => setHasPurged(false), 3000);
    } catch (e) {
      console.warn("Purge error:", e);
    }
  };

  const isPalm = targetType === "palm";
  const isFace = targetType === "face";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className={`w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden relative border transition-all ${
          isPalm 
            ? "bg-[#181512] text-amber-100 border-amber-500/40" 
            : isFace 
              ? "bg-[#131722] text-blue-100 border-blue-500/40" 
              : "bg-[#16171D] text-slate-100 border-amber-500/30"
        }`}
      >
        
        {/* Header with Type-specific Branding */}
        <div 
          className={`p-6 border-b flex items-center justify-between ${
            isPalm 
              ? "bg-[#221C17] border-amber-500/20" 
              : isFace 
                ? "bg-[#1B2232] border-blue-500/20" 
                : "bg-[#1F2029] border-slate-700/50"
          }`}
        >
          <div className="flex items-center gap-3">
            <div 
              className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-inner ${
                isPalm 
                  ? "bg-amber-500/20 border-amber-400/40 text-amber-400" 
                  : isFace 
                    ? "bg-blue-500/20 border-blue-400/40 text-blue-400" 
                    : "bg-amber-500/20 border-amber-400/40 text-amber-400"
              }`}
            >
              {isPalm ? <Hand className="w-6 h-6" /> : isFace ? <User className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span 
                  className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md border ${
                    isPalm 
                      ? "bg-amber-500/10 text-amber-300 border-amber-500/30" 
                      : isFace 
                        ? "bg-blue-500/10 text-blue-300 border-blue-500/30" 
                        : "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                  }`}
                >
                  DPDP Act 2023 & GDPR Aligned
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Mandatory Gate</span>
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-bold mt-1">
                {isPalm && "Palmistry Photo Analysis: Mandatory Consent"}
                {isFace && "Face Reading Photo Analysis: Mandatory Consent"}
                {!isPalm && !isFace && "Biometric-Adjacent Photo Analysis: Mandatory Consent"}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm leading-relaxed">
          
          {/* Introductory Notice */}
          <div 
            className={`p-4 rounded-2xl border ${
              isPalm 
                ? "bg-[#251E19] border-amber-500/20 text-amber-200/90" 
                : isFace 
                  ? "bg-[#1C2538] border-blue-500/20 text-blue-200/90" 
                  : "bg-slate-900 border-slate-700/60 text-slate-200"
            }`}
          >
            <p className="text-xs sm:text-sm">
              Before capturing or uploading photographs of your {isPalm ? "palms" : isFace ? "face" : "palms or face"}, please review and accept our strict privacy, biometric-adjacent data protection, and traditional analysis terms.
            </p>
          </div>

          {/* Core Privacy & Protection Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-700/40 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>No Facial / Fingerprint ID</span>
              </div>
              <p className="text-[11px] text-slate-300/80">
                We never generate facial recognition vectors, biometric IDs, or fingerprint templates. Only abstract geometric line angles and zone ratios are processed.
              </p>
            </div>

            <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-700/40 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>Ephemeral Memory</span>
              </div>
              <p className="text-[11px] text-slate-300/80">
                Raw photo data is analyzed in temporary compute memory and automatically purged immediately upon synthesis. Never used for public training.
              </p>
            </div>

            <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-700/40 space-y-1.5">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>Vedic Character Study</span>
              </div>
              <p className="text-[11px] text-slate-300/80">
                Insights are derived from authentic Hast Rekha Shastra & Mian Xiang traditions. Readings are non-medical and for spiritual inquiry only.
              </p>
            </div>
          </div>

          {/* Section 1: Separate Opt-In Toggle for Mole & Marking Analysis */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Supplementary Feature: Moles & Markings Analysis</span>
              </h4>
              <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-semibold">
                Optional Toggle
              </span>
            </div>

            <div 
              onClick={() => setMolesMarksOptIn(!molesMarksOptIn)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                molesMarksOptIn
                  ? isPalm
                    ? "bg-amber-500/10 border-amber-500/40"
                    : isFace
                      ? "bg-blue-500/10 border-blue-500/40"
                      : "bg-purple-500/10 border-purple-500/40"
                  : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="space-y-1 pr-2">
                <div className="text-xs sm:text-sm font-bold flex items-center gap-2 text-slate-100">
                  <span>Include Fixed Markings, Moles & Scars Analysis</span>
                  {molesMarksOptIn ? (
                    <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-600/40">ENABLED</span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-mono font-bold bg-slate-800 px-1.5 py-0.5 rounded">DISABLED</span>
                  )}
                </div>
                <p className="text-[11px] sm:text-xs text-slate-300/80 leading-relaxed">
                  {isPalm && "Allows the AI to scan for skin moles, pigmentation marks, and scars across palm mounts (Jupiter, Saturn, Venus) and lines according to classical Cheiromancy rules."}
                  {isFace && "Allows the AI to scan for facial moles, birthmarks, and scars mapped across the 12 Palaces of Destiny (Life, Wealth, Career, Marriage) and San Ting zones."}
                  {!isPalm && !isFace && "Allows the AI to detect and interpret moles, scars, and fixed pigmentation points across palm mounts or facial destiny palaces."}
                </p>
                <div className="text-[10px] text-slate-400 italic">
                  Tip: If disabled, only pure geometric lines, palm shapes, and facial zone proportions will be analyzed.
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMolesMarksOptIn(!molesMarksOptIn);
                }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  molesMarksOptIn ? (isPalm ? "bg-amber-500" : isFace ? "bg-blue-500" : "bg-purple-500") : "bg-slate-700"
                }`}
                role="switch"
                aria-checked={molesMarksOptIn}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    molesMarksOptIn ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Section 2: Mandatory Consent Requirements (Checkboxes) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mandatory Acceptance (Required Before Photo Upload)</span>
              </h4>
              <span className="text-[10px] text-red-400 font-mono font-bold">*Both Required</span>
            </div>

            {/* Checkbox 1: Age Verification (18+) */}
            <label 
              className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                isAdultConfirmed 
                  ? "bg-emerald-950/20 border-emerald-500/40" 
                  : "bg-red-950/20 border-red-500/30 hover:border-red-500/60"
              }`}
            >
              <input
                type="checkbox"
                checked={isAdultConfirmed}
                onChange={(e) => setIsAdultConfirmed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-600 focus:ring-amber-500 cursor-pointer"
              />
              <div className="space-y-0.5">
                <div className="text-xs sm:text-sm font-bold text-slate-100 flex items-center gap-2">
                  <span>1. Age Requirement: I confirm that I am 18 years of age or older.</span>
                  <span className="text-[10px] text-red-400 font-mono uppercase font-bold">*Required</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Under DPDP Act 2023 and GDPR guidelines for biometric-adjacent data, minors under the age of 18 may not submit personal images.
                </div>
              </div>
            </label>

            {/* Checkbox 2: Image Processing Consent */}
            <label 
              className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                isPhotoConsentConfirmed 
                  ? "bg-emerald-950/20 border-emerald-500/40" 
                  : "bg-red-950/20 border-red-500/30 hover:border-red-500/60"
              }`}
            >
              <input
                type="checkbox"
                checked={isPhotoConsentConfirmed}
                onChange={(e) => setIsPhotoConsentConfirmed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-600 focus:ring-amber-500 cursor-pointer"
              />
              <div className="space-y-0.5">
                <div className="text-xs sm:text-sm font-bold text-slate-100 flex items-center gap-2">
                  <span>2. Ephemeral Processing Consent: I authorize the temporary analysis of my photo.</span>
                  <span className="text-[10px] text-red-400 font-mono uppercase font-bold">*Required</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  I grant consent for the app to analyze visual contours and landmarks for Hast Rekha / Mukha Samudrika character interpretation with automatic immediate purging.
                </div>
              </div>
            </label>
          </div>

          {/* Quick Data Purge Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
            <button
              type="button"
              onClick={handlePurgeAllData}
              className="text-[11px] text-slate-400 hover:text-amber-300 underline flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Purge all previously stored palm/face history & reset consent</span>
            </button>

            {hasPurged && (
              <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> All stored reports and consent purged!
              </span>
            )}
          </div>

        </div>

        {/* Footer Actions */}
        <div 
          className={`p-4 sm:p-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
            isPalm 
              ? "bg-[#201B17] border-amber-500/20" 
              : isFace 
                ? "bg-[#18202F] border-blue-500/20" 
                : "bg-[#1A1C24] border-slate-800"
          }`}
        >
          {onOpenFullTerms && (
            <button
              onClick={onOpenFullTerms}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer underline transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Read Full DPDP & Biometric Terms (Sec. 5)</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-white/5 text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleAgree}
              disabled={!isMandatoryAccepted}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isMandatoryAccepted
                  ? isPalm
                    ? "bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95"
                    : isFace
                      ? "bg-gradient-to-r from-blue-500 to-sky-400 text-slate-950 shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95"
                      : "bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95"
                  : "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {isMandatoryAccepted 
                  ? "Accept & Proceed to Photo Upload" 
                  : "Check Both Mandatory Boxes to Proceed"}
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
