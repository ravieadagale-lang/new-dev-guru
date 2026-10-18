import React, { useState } from "react";
import { UserProfile } from "../types";
import { X, FileText, Download, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { jsPDF } from "jspdf";

export interface KundliPdfReportGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile?: UserProfile;
  matchResult?: any;
  partnerDetails?: any;
}

export const KundliPdfReportGeneratorModal: React.FC<KundliPdfReportGeneratorModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  matchResult,
  partnerDetails,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleGeneratePdf = () => {
    setIsGenerating(true);
    try {
      const doc = new jsPDF();
      const seekerName = userProfile?.name || "Seeker";

      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(180, 83, 9); // Amber
      doc.text("DEV-GURU VEDIC HOROSCOPE DOSSIER", 20, 25);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(51, 65, 85);
      doc.text(`Generated for: ${seekerName}`, 20, 40);
      doc.text(`Date of Birth: ${userProfile?.dob || "N/A"}`, 20, 48);
      doc.text(`Time of Birth: ${userProfile?.time || "N/A"}`, 20, 56);
      doc.text(`Place of Birth: ${userProfile?.place || "N/A"}`, 20, 64);
      doc.text(`Moon Sign (Rashi): ${userProfile?.rashi || "N/A"}`, 20, 72);
      doc.text(`Ascendant (Lagna): ${userProfile?.lagna || "N/A"}`, 20, 80);
      doc.text(`Birth Star (Nakshatra): ${userProfile?.nakshatra || "N/A"}`, 20, 88);

      if (partnerDetails) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Partner & Compatibility Information", 20, 105);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Partner Name: ${partnerDetails.name || "Partner"}`, 20, 115);
        doc.text(`Partner DOB: ${partnerDetails.dob || "N/A"}`, 20, 123);
        doc.text(`Partner Moon Sign: ${partnerDetails.rashi || "N/A"}`, 20, 131);
        if (matchResult?.totalScore !== undefined) {
          doc.text(`Ashta Koota Score: ${matchResult.totalScore} / 36`, 20, 139);
        }
      }

      doc.save(`Dev-Guru_${seekerName.replace(/\s+/g, "_")}_Kundli.pdf`);
      setIsDone(true);
    } catch (e) {
      console.error("PDF generation failed:", e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl max-w-lg w-full p-6 text-slate-100 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-amber-100">
              Export Vedic Kundli PDF Report
            </h3>
            <p className="text-xs text-slate-400">
              Deterministic, comprehensive astrological chart dossier
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-sm space-y-2 mb-6">
          <div className="flex justify-between">
            <span className="text-slate-400">Seeker:</span>
            <span className="font-semibold text-slate-200">{userProfile?.name || "Seeker"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Moon Sign (Rashi):</span>
            <span className="font-semibold text-amber-300">{userProfile?.rashi || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Birth Details:</span>
            <span className="font-semibold text-slate-200">
              {userProfile?.dob} • {userProfile?.time}
            </span>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-300 hover:text-slate-100 rounded-xl border border-slate-700 hover:bg-slate-800"
          >
            Close
          </button>
          <button
            onClick={handleGeneratePdf}
            disabled={isGenerating}
            className="px-5 py-2 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl flex items-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : isDone ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
