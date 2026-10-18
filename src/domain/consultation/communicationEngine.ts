import { ConsultationMode } from "./types";

export interface CommunicationContactConfig {
  phone?: string;
  whatsAppPhone?: string;
  googleMeetUrl?: string;
  zoomJoinUrl?: string;
  meetLink?: string;
  zoomLink?: string;
  inPersonAddress?: string;
}

export interface ResolvedCommunicationUri {
  uri?: string;
  isActionable: boolean;
  displayPlaceholder: string;
  modeLabel: string;
}

/**
 * Strips phone numbers to E.164 without spaces/dashes.
 */
function cleanPhoneNumber(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

/**
 * Strips phone numbers to digits only (for WhatsApp wa.me URLs).
 */
function cleanDigitsOnly(phone: string): string {
  return phone.replace(/\D/g, "");
}

/**
 * Resolves a consultation mode into an actionable URI or explicit unconfigured placeholder.
 */
export function resolveCommunicationUri(
  mode: ConsultationMode | string,
  config: CommunicationContactConfig = {}
): ResolvedCommunicationUri {
  switch (mode) {
    case "PHONE":
    case "AUDIO": {
      const phone = config.phone;
      if (phone?.trim()) {
        const cleaned = cleanPhoneNumber(phone);
        return {
          uri: `tel:${cleaned}`,
          isActionable: true,
          displayPlaceholder: cleaned,
          modeLabel: "Voice Telephone",
        };
      }
      return {
        isActionable: false,
        displayPlaceholder: "Configured per session (Phone unassigned)",
        modeLabel: "Voice Telephone",
      };
    }

    case "WHATSAPP_AUDIO":
    case "WHATSAPP_VIDEO": {
      const waNumber = config.whatsAppPhone || config.phone;
      if (waNumber?.trim()) {
        const digits = cleanDigitsOnly(waNumber);
        return {
          uri: `https://wa.me/${digits}`,
          isActionable: true,
          displayPlaceholder: `+${digits}`,
          modeLabel: mode === "WHATSAPP_VIDEO" ? "WhatsApp Video" : "WhatsApp Voice",
        };
      }
      return {
        isActionable: false,
        displayPlaceholder: "Configured per session (WhatsApp number unassigned)",
        modeLabel: mode === "WHATSAPP_VIDEO" ? "WhatsApp Video" : "WhatsApp Voice",
      };
    }

    case "GOOGLE_MEET":
    case "VIDEO":
    case "VIDEO_GOOGLE_MEET": {
      const meet = config.googleMeetUrl || config.meetLink;
      if (meet?.trim() && meet.startsWith("http")) {
        return {
          uri: meet.trim(),
          isActionable: true,
          displayPlaceholder: meet.trim(),
          modeLabel: "Google Meet HD Video",
        };
      }
      return {
        isActionable: false,
        displayPlaceholder: "Configured per session (Google Meet coordinates will be generated upon confirmation)",
        modeLabel: "Google Meet HD Video",
      };
    }

    case "ZOOM":
    case "VIDEO_ZOOM": {
      const zoom = config.zoomJoinUrl || config.zoomLink;
      if (zoom?.trim() && zoom.startsWith("http")) {
        return {
          uri: zoom.trim(),
          isActionable: true,
          displayPlaceholder: zoom.trim(),
          modeLabel: "Zoom Video Meeting",
        };
      }
      return {
        isActionable: false,
        displayPlaceholder: "Configured per session (Zoom meeting credentials will be assigned)",
        modeLabel: "Zoom Video Meeting",
      };
    }

    case "IN_PERSON": {
      const addr = config.inPersonAddress;
      if (addr?.trim()) {
        return {
          uri: `https://maps.google.com/?q=${encodeURIComponent(addr.trim())}`,
          isActionable: true,
          displayPlaceholder: addr.trim(),
          modeLabel: "In-Person Sanctuary",
        };
      }
      return {
        isActionable: false,
        displayPlaceholder: "Configured per session (Studio sanctum address will be provided)",
        modeLabel: "In-Person Sanctuary",
      };
    }

    default:
      return {
        isActionable: false,
        displayPlaceholder: "Configured per session coordinates",
        modeLabel: "Encrypted Consultation Channel",
      };
  }
}

export function getCommunicationModeDescriptor(mode: ConsultationMode | string): {
  label: string;
  requiresPreConfiguredLink: boolean;
} {
  switch (mode) {
    case "PHONE":
    case "AUDIO":
      return { label: "Direct Phone Call", requiresPreConfiguredLink: false };
    case "WHATSAPP_AUDIO":
      return { label: "WhatsApp Audio", requiresPreConfiguredLink: false };
    case "WHATSAPP_VIDEO":
      return { label: "WhatsApp Video", requiresPreConfiguredLink: false };
    case "GOOGLE_MEET":
    case "VIDEO":
      return { label: "Google Meet", requiresPreConfiguredLink: true };
    case "ZOOM":
      return { label: "Zoom Video", requiresPreConfiguredLink: true };
    case "IN_PERSON":
      return { label: "In-Person Consultation", requiresPreConfiguredLink: false };
    default:
      return { label: "Online Consultation", requiresPreConfiguredLink: false };
  }
}
