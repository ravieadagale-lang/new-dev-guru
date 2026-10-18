import React, { useState } from "react";
import { LanguageCode } from "../types";
import { PalmistryReport } from "../types/palmistry";
import { PalmManualBuilder } from "../components/palmistry/PalmManualBuilder";
import { PalmistryReportView } from "../components/palmistry/PalmistryReportView";
import { PalmScannerModal } from "../components/palmistry/PalmScannerModal";
import { synthesizePalmistryReport } from "../services/palmistryEngine";
import { Hand, Camera, Sparkles } from "lucide-react";

interface PalmReaderProps {
  selectedLanguage?: LanguageCode;
  onNavigateTab?: (tab: string) => void;
}

export const PalmReader: React.FC<PalmReaderProps> = ({
  selectedLanguage = "en",
  onNavigateTab
}) => {
  const [report, setReport] = useState<PalmistryReport | null>(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  // If no report yet, generate a default sample or let user build
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-amber-900/10 shadow-xs flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
            <Hand className="w-5 h-5 text-amber-600" />
            <span>Hastarekha &amp; Cheirognomy Palmistry Sanctuary</span>
          </h2>
          <p className="text-xs text-slate-500">
            Ancient Vedic &amp; Western palm analysis with millimeter-accurate mounts, lines, and age-timeline prognosis
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsScannerOpen(true)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <Camera className="w-4 h-4" />
            <span>Scan Hand Photo</span>
          </button>
          {report && (
            <button
              onClick={() => setReport(null)}
              className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-all cursor-pointer"
            >
              Reset / New Reading
            </button>
          )}
        </div>
      </div>

      {report ? (
        <PalmistryReportView report={report} onReset={() => setReport(null)} />
      ) : (
        <div className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-xs">
          <PalmManualBuilder onReportGenerated={(rep) => setReport(rep)} />
        </div>
      )}

      {isScannerOpen && (
        <PalmScannerModal
          isOpen={isScannerOpen}
          onClose={() => setIsScannerOpen(false)}
          onReportGenerated={(rep) => {
            setReport(rep);
            setIsScannerOpen(false);
          }}
        />
      )}
    </div>
  );
};
