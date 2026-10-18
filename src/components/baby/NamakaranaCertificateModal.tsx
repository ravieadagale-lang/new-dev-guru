// src/components/baby/NamakaranaCertificateModal.tsx
// Auspicious Vedic Namakarana Samskara Certificate Modal

import React from "react";
import { 
  X, 
  Printer, 
  Download, 
  Sparkles, 
  Award, 
  Moon, 
  Sun, 
  Star, 
  ShieldCheck 
} from "lucide-react";
import { 
  NameCandidate, 
  BabyBirthInput, 
  AstroJanmaksharResult, 
  BabyNumerologyProfile 
} from "../../types/babyNameTypes";

interface NamakaranaCertificateModalProps {
  candidate: NameCandidate;
  babyInput: BabyBirthInput;
  astro: AstroJanmaksharResult;
  numerology: BabyNumerologyProfile;
  onClose: () => void;
}

export const NamakaranaCertificateModal: React.FC<NamakaranaCertificateModalProps> = ({
  candidate,
  babyInput,
  astro,
  numerology,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  const fullName = babyInput.surname ? `${candidate.name} ${babyInput.surname}` : candidate.name;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-amber-500/30 my-8">
        {/* Top Control Bar */}
        <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-200">
              Vedic Namakarana Samskara Certificate
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Area */}
        <div className="p-8 sm:p-10 bg-gradient-to-br from-amber-50/70 via-white to-amber-50/70 text-slate-900 relative border-8 border-amber-900/15 m-4 rounded-2xl">
          {/* Subtle watermark / corner emblems */}
          <div className="text-center space-y-3 pb-6 border-b border-amber-200">
            <div className="font-serif text-sm uppercase tracking-[0.3em] text-amber-800 font-bold">
              ॥ श्री गणेशाय नमः ॥
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-amber-900 tracking-wide">
              Vedic Namakarana Samskara
            </h2>
            <p className="text-xs font-serif italic text-amber-800/80">
              Certificate of Auspicious Astrological &amp; Numerological Naming
            </p>
          </div>

          {/* Core Name Presentation */}
          <div className="text-center my-8 space-y-2">
            <div className="text-xs font-serif uppercase tracking-widest text-slate-500">
              By divine planetary alignment, this blessed soul shall be named:
            </div>
            <div className="font-serif text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {fullName}
            </div>
            <div className="font-serif text-2xl font-bold text-amber-800">
              {candidate.sanskrit} {babyInput.surname ? `(${babyInput.surname})` : ""}
            </div>
            <div className="text-xs text-slate-600 max-w-md mx-auto italic pt-1">
              "{candidate.meaning}"
            </div>
          </div>

          {/* Astrological & Numerological Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-white/80 border border-amber-200/80 text-center text-xs">
            <div className="p-2 rounded-lg bg-amber-50/50">
              <div className="text-[10px] uppercase font-bold text-amber-800">Moon Rashi</div>
              <div className="font-serif font-bold text-slate-900 text-sm mt-0.5">{astro.rashiName.split(" ")[0]}</div>
              <div className="text-[10px] text-slate-500">Lord: {astro.rashiLord}</div>
            </div>

            <div className="p-2 rounded-lg bg-amber-50/50">
              <div className="text-[10px] uppercase font-bold text-amber-800">Janma Nakshatra</div>
              <div className="font-serif font-bold text-slate-900 text-sm mt-0.5">{astro.nakshatraName}</div>
              <div className="text-[10px] text-slate-500">Pada {astro.pada}</div>
            </div>

            <div className="p-2 rounded-lg bg-amber-50/50">
              <div className="text-[10px] uppercase font-bold text-amber-800">Janmakshar Sound</div>
              <div className="font-serif font-bold text-amber-900 text-base mt-0.5">{astro.primaryAkshara} ({astro.primaryAksharaEnglish})</div>
              <div className="text-[10px] text-slate-500">Vedic Sound</div>
            </div>

            <div className="p-2 rounded-lg bg-amber-50/50">
              <div className="text-[10px] uppercase font-bold text-amber-800">Chaldean Power</div>
              <div className="font-serif font-bold text-slate-900 text-sm mt-0.5">#{candidate.chaldeanCompound} → #{candidate.chaldeanSingle}</div>
              <div className="text-[10px] text-slate-500">Harmonic: {candidate.harmonicScore}%</div>
            </div>
          </div>

          {/* Lineage & Birth Coordinates */}
          <div className="mt-6 pt-4 border-t border-amber-200/70 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div>
              <span className="font-semibold text-slate-800">Date &amp; Time of Birth:</span>{" "}
              {babyInput.dob} at {babyInput.tob}
            </div>
            <div>
              <span className="font-semibold text-slate-800">Place of Birth:</span>{" "}
              {babyInput.pob}
            </div>
            {babyInput.fatherName && (
              <div>
                <span className="font-semibold text-slate-800">Father's Name:</span>{" "}
                {babyInput.fatherName}
              </div>
            )}
            {babyInput.motherName && (
              <div>
                <span className="font-semibold text-slate-800">Mother's Name:</span>{" "}
                {babyInput.motherName}
              </div>
            )}
          </div>

          {/* Blessings */}
          <div className="mt-8 text-center text-xs font-serif text-amber-900/80 italic">
            "आयुष्मान् भव, सौम्य भव, सर्वकल्याणयुक्तो भव।"
            <div className="text-[11px] text-slate-500 not-italic mt-0.5">
              May this child be blessed with long life, luminous wisdom, unwavering courage, and boundless prosperity.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
