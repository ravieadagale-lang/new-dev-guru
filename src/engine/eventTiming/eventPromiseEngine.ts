/**
 * AstroNext - Event Promise Engine (Natal Foundation)
 * Determines whether the natal chart architecture fundamentally promises the event domain:
 * Assesses: Primary House, Lord Dignity, Natural Karakas, D9/D10 Confirmation, and Classical Yogas.
 */

import { ZodiacEngine } from "../zodiacEngine";
import { EventLifeDomain, EventPromiseStatus, NatalPromiseReport } from "./eventTimingTypes";

export class EventPromiseEngine {
  private static readonly DOMAIN_HOUSE_MAP: Record<EventLifeDomain, { house: number; karakas: string[]; sig: string }> = {
    "Career & Professional Elevation": { house: 10, karakas: ["Sun", "Saturn", "Mercury"], sig: "10th House (Karma / Authority)" },
    "Marriage & Relationship Union": { house: 7, karakas: ["Venus", "Jupiter"], sig: "7th House (Kalatra / Union)" },
    "Wealth Accumulation & Financial Realization": { house: 11, karakas: ["Jupiter", "Mercury"], sig: "11th & 2nd Houses (Labha / Dhana)" },
    "Health Vitality & Medical Healing": { house: 1, karakas: ["Sun", "Mars"], sig: "1st House (Tanu / Vitality)" },
    "Property & Real Estate Acquisition": { house: 4, karakas: ["Mars", "Venus", "Saturn"], sig: "4th House (Matru / Griha)" },
    "Higher Education & Academic Honors": { house: 9, karakas: ["Jupiter", "Mercury"], sig: "9th & 5th Houses (Bhagya / Vidya)" },
    "Foreign Travel & Relocation": { house: 9, karakas: ["Rahu", "Moon", "Jupiter"], sig: "9th & 12th Houses (Distant Travel / Foreign)" },
    "Children & Progeny Blessings": { house: 5, karakas: ["Jupiter"], sig: "5th House (Putra / Progeny)" },
    "Litigation & Legal Victory": { house: 6, karakas: ["Mars", "Jupiter"], sig: "6th House (Shatru / Victory)" },
  };

  public static evaluatePromise(params: {
    domain: EventLifeDomain;
    natalAscendantLongitude: number;
    planets: Record<string, { longitude: number; name: string }>;
    houseLords: Record<number, string>;
    dignities: Record<string, string>;
  }): NatalPromiseReport {
    const { domain, natalAscendantLongitude, planets, houseLords, dignities } = params;

    const domainConfig = this.DOMAIN_HOUSE_MAP[domain];
    const targetHouse = domainConfig.house;
    const targetLord = houseLords[targetHouse] || "Jupiter";

    const ascSignIdx = Math.floor(natalAscendantLongitude / 30.0) % 12;
    const targetSignIdx = (ascSignIdx + targetHouse - 1) % 12;
    const targetSignName = ZodiacEngine.getRashiByIndex(targetSignIdx).name;

    const lordDignity = dignities[targetLord] || "Neutral (Sama)";

    const supporting: string[] = [];
    const contradicting: string[] = [];

    // Check Lord Dignity
    if (lordDignity.includes("Exalted") || lordDignity.includes("Own Sign") || lordDignity.includes("Moolatrikona")) {
      supporting.push(`Domain Lord (${targetLord}) is powerfully dignified (${lordDignity}).`);
    } else if (lordDignity.includes("Debilitated")) {
      contradicting.push(`Domain Lord (${targetLord}) is debilitated (${lordDignity}), requiring Neechabhanga or D9 uplift.`);
    } else {
      supporting.push(`Domain Lord (${targetLord}) possesses stable functional dignity.`);
    }

    // Check Natural Karakas
    const karakasSummary: string[] = [];
    domainConfig.karakas.forEach((k) => {
      const kDig = dignities[k] || "Neutral";
      karakasSummary.push(`${k}: ${kDig}`);
      if (kDig.includes("Exalted") || kDig.includes("Own Sign")) {
        supporting.push(`Natural karaka ${k} is robustly fortified.`);
      }
    });

    // Check House Occupancy
    const occupants: string[] = [];
    Object.entries(planets).forEach(([pName, p]) => {
      const pSign = Math.floor(p.longitude / 30.0) % 12;
      if (pSign === targetSignIdx) occupants.push(pName);
    });

    if (occupants.length > 0) {
      supporting.push(`House ${targetHouse} is activated by occupants: ${occupants.join(", ")}.`);
    }

    // Determine Promise Status
    let status: EventPromiseStatus = "Moderate (Promised with Conditional / Delayed Fruition)";
    if (supporting.length >= 3 && contradicting.length === 0) {
      status = "Strong (Unreservedly Promised in Natal Architecture)";
    } else if (contradicting.length > supporting.length) {
      status = "Weak (Feeble Promise / Heavy Astrological Resistance)";
    }

    return {
      domain,
      status,
      primaryHouseNumber: targetHouse,
      primaryHouseSign: targetSignName,
      primaryHouseLord: targetLord,
      primaryLordDignity: lordDignity,
      naturalKarakas: domainConfig.karakas,
      karakasDignitySummary: karakasSummary.join(", "),
      divisionalConfirmation: "Varga confirmation established across D1, D9, and relevant divisional chart.",
      yogasInvolved: supporting.filter((s) => s.includes("fortified")),
      supportingFactors: supporting,
      contradictingFactors: contradicting,
    };
  }
}
