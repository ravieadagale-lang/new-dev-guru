import React, { useState } from "react";
import { 
  ShieldCheck, 
  FileText, 
  X, 
  Lock, 
  CheckCircle2, 
  Globe, 
  Scale, 
  HeartHandshake,
  BookOpen
} from "lucide-react";

interface LegalTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSection?: "terms" | "privacy" | "biometrics";
}

export const LegalTermsModal: React.FC<LegalTermsModalProps> = ({
  isOpen,
  onClose,
  initialSection = "biometrics"
}) => {
  const [activeTab, setActiveTab] = useState<"biometrics" | "terms" | "privacy">(initialSection);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#181512] text-amber-100 border border-amber-500/30 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-amber-500/20 flex items-center justify-between bg-[#201B17]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-amber-100">
                Legal, Privacy & Biometric Policy
              </h2>
              <p className="text-xs text-amber-300/80">
                Digital Personal Data Protection (DPDP) Act 2023 & GDPR Compliance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-amber-400/60 hover:text-amber-200 hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-amber-500/20 bg-[#1C1814]">
          <button
            onClick={() => setActiveTab("biometrics")}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === "biometrics"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-amber-200/60 hover:text-amber-200"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Biometric-Adjacent Data Policy</span>
          </button>

          <button
            onClick={() => setActiveTab("terms")}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === "terms"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-amber-200/60 hover:text-amber-200"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Terms of Service (Sec. 4)</span>
          </button>

          <button
            onClick={() => setActiveTab("privacy")}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === "privacy"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-amber-200/60 hover:text-amber-200"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>General Privacy Policy</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-amber-200/80 leading-relaxed">
          
          {activeTab === "biometrics" && (
            <div className="space-y-5">
              <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/30">
                <h3 className="font-bold text-amber-300 text-sm mb-1 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Section 5: Biometric-Adjacent Data Protection Protocol
                </h3>
                <p className="text-xs text-amber-200/80">
                  Effective Date: October 2024 (Version 1.0-dpdp-gdpr)
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-amber-100 text-xs sm:text-sm">5.1 Scope of Data Collection</h4>
                <p>
                  When you utilize the Palmistry (Hast Rekha) or Face Reading (Mukha Samudrika / Mian Xiang) tools, you provide photographic images of your hands and/or face. The application processes these images strictly to calculate:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-amber-200/70">
                  <li>Hand shape proportions (length-to-width ratios, finger phalange ratios)</li>
                  <li>Major line trajectories, depths, intersections, and curvature</li>
                  <li>Facial Three Zones (San Ting) relative heights and Twelve Palace landmarks</li>
                  <li>Topographical skin markings (moles, scars) purely for classical symbolic interpretation</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-amber-100 text-xs sm:text-sm">5.2 Strict Prohibition on Facial Recognition & Identity Matching</h4>
                <p>
                  Our service does <strong>NOT</strong> generate, extract, or retain biometric templates capable of uniquely identifying an individual for authentication, surveillance, or KYC verification. All computer vision operations are geometric and symbolic in nature.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-amber-100 text-xs sm:text-sm">5.3 Ephemeral Processing & Automatic Retention Time-To-Live (TTL)</h4>
                <p>
                  Raw photographs submitted by users are processed in memory and scheduled for immediate or short-term deletion (TTL not exceeding 24 hours). Derived numerical metadata (such as line types and selected archetype classes) is stored locally on the user's device (`localStorage`) or within the user's private encrypted vault.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-amber-100 text-xs sm:text-sm">5.4 User Control & Right of Erasure</h4>
                <p>
                  In compliance with the DPDP Act 2023 and GDPR Article 17, users hold an absolute right to revoke consent and permanently purge all stored readings, image caches, and landmark metadata at any time using the in-app "Purge Data" button.
                </p>
              </div>
            </div>
          )}

          {activeTab === "terms" && (
            <div className="space-y-5">
              <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/30">
                <h3 className="font-bold text-amber-300 text-sm mb-1 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Section 4: Palmistry & Face Reading Terms of Use
                </h3>
                <p className="text-xs text-amber-200/80">
                  Governing all Cheirognomy, Chiromancy & Physiognomy feature sets.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-amber-100 text-xs sm:text-sm">4.1 Cultural & Self-Reflection Purpose</h4>
                <p>
                  Palmistry and face reading analyses provided by this platform represent artistic and cultural interpretations grounded in classical Vedic (Samudrika Shastra) and Chinese (Mian Xiang) literature. They are designed exclusively for philosophical self-reflection, mindfulness, and educational inquiry.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-amber-100 text-xs sm:text-sm">4.2 Non-Medical & Non-Financial Disclaimer</h4>
                <p>
                  References in reports to physical constitution, stamina, vitality (Life Line / Health Palace), wealth (Wealth Palace / Sun Line), or relational milestones are symbolic. <strong>Under no circumstances should any report output be interpreted as clinical diagnoses, psychological evaluations, legal counsel, or financial advice.</strong>
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-amber-100 text-xs sm:text-sm">4.3 Minor Gating Policy (18+)</h4>
                <p>
                  Use of camera capture and biometric image analysis is strictly restricted to individuals aged 18 and above. Parents or guardians may not submit images of minors for biometric analysis.
                </p>
              </div>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="space-y-5">
              <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/30">
                <h3 className="font-bold text-amber-300 text-sm mb-1 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Platform General Privacy Policy
                </h3>
                <p className="text-xs text-amber-200/80">
                  Global data protection standards across Astrology, Numerology & Samudrika services.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-amber-100 text-xs sm:text-sm">Data Minimization & Encryption</h4>
                <p>
                  We only request information strictly necessary for generating your astrological, numerological, and physiognomic reports. All data in transit is encrypted using modern TLS protocols.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-amber-100 text-xs sm:text-sm">No Third-Party Sale of Personal Data</h4>
                <p>
                  We do not sell, rent, or trade your personal photos, birth charts, or reading histories to third-party data brokers or advertising networks.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-amber-500/20 bg-[#201B17] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
          >
            Close Policy Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
