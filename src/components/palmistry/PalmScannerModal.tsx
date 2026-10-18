import React from "react";
import { SamudrikaScannerModal } from "../SamudrikaScannerModal";
import { PalmistryReport } from "../../types/palmistry";

interface PalmScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: string;
  onReportGenerated?: (report: PalmistryReport) => void;
}

export const PalmScannerModal: React.FC<PalmScannerModalProps> = ({
  isOpen,
  onClose,
  language = "en",
  onReportGenerated
}) => {
  return (
    <SamudrikaScannerModal
      isOpen={isOpen}
      onClose={onClose}
      initialType="palm"
      language={language}
      onApplyGeneratedReport={(type, result) => {
        if (type === "palm" && onReportGenerated) {
          onReportGenerated(result as PalmistryReport);
        }
      }}
    />
  );
};
