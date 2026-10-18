import React from "react";
import { SamudrikaScannerModal } from "../SamudrikaScannerModal";
import { FaceReadingReport } from "../../types/facereading";

interface FaceScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: string;
  onReportGenerated?: (report: FaceReadingReport) => void;
}

export const FaceScannerModal: React.FC<FaceScannerModalProps> = ({
  isOpen,
  onClose,
  language = "en",
  onReportGenerated
}) => {
  return (
    <SamudrikaScannerModal
      isOpen={isOpen}
      onClose={onClose}
      initialType="face"
      language={language}
      onApplyGeneratedReport={(type, result) => {
        if (type === "face" && onReportGenerated) {
          onReportGenerated(result as FaceReadingReport);
        }
      }}
    />
  );
};
