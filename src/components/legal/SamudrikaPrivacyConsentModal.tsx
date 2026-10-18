import React from "react";
import { 
  MandatoryBiometricConsentModal, 
  SamudrikaConsentState, 
  getStoredBiometricConsent, 
  hasValidBiometricConsent,
  CONSENT_STORAGE_KEY
} from "./MandatoryBiometricConsentModal";

export { 
  MandatoryBiometricConsentModal, 
  getStoredBiometricConsent, 
  hasValidBiometricConsent,
  CONSENT_STORAGE_KEY 
};
export type { SamudrikaConsentState };

interface SamudrikaPrivacyConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConsentSuccess: (state: SamudrikaConsentState) => void;
  onOpenFullTerms?: () => void;
  targetType?: "palm" | "face" | "both";
}

export const SamudrikaPrivacyConsentModal: React.FC<SamudrikaPrivacyConsentModalProps> = ({
  isOpen,
  onClose,
  onConsentSuccess,
  onOpenFullTerms,
  targetType = "both"
}) => {
  return (
    <MandatoryBiometricConsentModal
      isOpen={isOpen}
      onClose={onClose}
      targetType={targetType}
      onConsentSuccess={onConsentSuccess}
      onOpenFullTerms={onOpenFullTerms}
    />
  );
};
