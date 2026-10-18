/**
 * AstroNext - Phase 7.1: Domain-Specific Varga & Significator Registry
 * Authoritative classical mapping for all EventLifeDomains to their corresponding
 * primary houses, divisional charts (Vargas), natural Karakas, and shastric citations.
 * Strictly conforms to BPHS (Shodashavarga Chapter) and Jaimini Sutras.
 */

import { EventLifeDomain } from "./eventTimingTypes";

export interface DomainVargaMapping {
  domain: EventLifeDomain;
  primaryHouses: number[];
  secondaryHouses: number[];
  contradictingHouses: number[];
  primaryVargas: Array<{ vargaCode: string; vargaName: string; divisionNumber: number; weight: number }>;
  naturalKarakas: string[];
  jaiminiKarakas: string[];
  sahamsRelevant: string[];
  shastricAuthority: string;
}

export const DOMAIN_VARGA_REGISTRY: Record<EventLifeDomain, DomainVargaMapping> = {
  "Career & Professional Elevation": {
    domain: "Career & Professional Elevation",
    primaryHouses: [10, 1, 6, 11],
    secondaryHouses: [2, 9, 5],
    contradictingHouses: [8, 12],
    primaryVargas: [
      { vargaCode: "D1", vargaName: "Rashi (Root Framework)", divisionNumber: 1, weight: 1.0 },
      { vargaCode: "D9", vargaName: "Navamsha (Dharma & General Fruition)", divisionNumber: 9, weight: 0.8 },
      { vargaCode: "D10", vargaName: "Dashamsha (Professional Accomplishment)", divisionNumber: 10, weight: 1.0 },
    ],
    naturalKarakas: ["Sun", "Saturn", "Mercury", "Jupiter"],
    jaiminiKarakas: ["Amk (Amatyakaraka)", "Ak (Atmakaraka)"],
    sahamsRelevant: ["KARMA", "YASHAS", "GAURAWA"],
    shastricAuthority: "BPHS Chapter 6 (Dashamsha Phala) & Jaimini Sutras 1.2",
  },
  "Marriage & Relationship Union": {
    domain: "Marriage & Relationship Union",
    primaryHouses: [7, 2, 11],
    secondaryHouses: [1, 5, 9],
    contradictingHouses: [6, 8, 12, 1],
    primaryVargas: [
      { vargaCode: "D1", vargaName: "Rashi (Root)", divisionNumber: 1, weight: 1.0 },
      { vargaCode: "D9", vargaName: "Navamsha (Spouse & Union Architecture)", divisionNumber: 9, weight: 1.0 },
    ],
    naturalKarakas: ["Venus", "Jupiter"],
    jaiminiKarakas: ["Dk (Darakaraka)", "Ul (Upapada Lagna)"],
    sahamsRelevant: ["VIVAHA", "PREETI", "KAMA"],
    shastricAuthority: "BPHS Chapter 7 (Navamsha Viveka) & Jaimini Sutras 2.1",
  },
  "Wealth Accumulation & Financial Realization": {
    domain: "Wealth Accumulation & Financial Realization",
    primaryHouses: [2, 11, 9, 5, 1],
    secondaryHouses: [4, 10],
    contradictingHouses: [6, 8, 12],
    primaryVargas: [
      { vargaCode: "D1", vargaName: "Rashi", divisionNumber: 1, weight: 1.0 },
      { vargaCode: "D2", vargaName: "Hora (Wealth & Sustenance)", divisionNumber: 2, weight: 0.9 },
      { vargaCode: "D9", vargaName: "Navamsha", divisionNumber: 9, weight: 0.7 },
      { vargaCode: "D11", vargaName: "Rudramsha / Labhamsha (Special Gains)", divisionNumber: 11, weight: 0.8 },
    ],
    naturalKarakas: ["Jupiter", "Mercury", "Venus"],
    jaiminiKarakas: ["Amatyakaraka", "Putrakaraka"],
    sahamsRelevant: ["ARTHA", "LABHA", "PUNYA"],
    shastricAuthority: "BPHS Chapter 6 (Hora Phala) & Varshaphala Deepika",
  },
  "Health Vitality & Medical Healing": {
    domain: "Health Vitality & Medical Healing",
    primaryHouses: [1, 5, 9, 11],
    secondaryHouses: [3, 10],
    contradictingHouses: [6, 8, 12],
    primaryVargas: [
      { vargaCode: "D1", vargaName: "Rashi", divisionNumber: 1, weight: 1.0 },
      { vargaCode: "D6", vargaName: "Shashtamsha (Disease & Resistance)", divisionNumber: 6, weight: 0.8 },
      { vargaCode: "D8", vargaName: "Ashtamamsha (Longevity & Vulnerability)", divisionNumber: 8, weight: 0.8 },
      { vargaCode: "D30", vargaName: "Trimsamsha (Arishta & Misfortunes)", divisionNumber: 30, weight: 0.9 },
    ],
    naturalKarakas: ["Sun", "Saturn", "Mars"],
    jaiminiKarakas: ["Gnatikaraka", "Atmakaraka"],
    sahamsRelevant: ["ROGA", "KALI", "MRITYU"],
    shastricAuthority: "BPHS Chapter 6 (Trimsamsha Phala) & Prashna Marga Chapter 12",
  },
  "Property & Real Estate Acquisition": {
    domain: "Property & Real Estate Acquisition",
    primaryHouses: [4, 11, 2, 1],
    secondaryHouses: [9, 5],
    contradictingHouses: [3, 6, 8, 12],
    primaryVargas: [
      { vargaCode: "D1", vargaName: "Rashi", divisionNumber: 1, weight: 1.0 },
      { vargaCode: "D4", vargaName: "Chaturthamsha (Fixed Assets & Lands)", divisionNumber: 4, weight: 1.0 },
    ],
    naturalKarakas: ["Mars", "Venus", "Saturn"],
    jaiminiKarakas: ["Matrikaraka", "Bhratrikaraka"],
    sahamsRelevant: ["BANDHU", "BHAGYA"],
    shastricAuthority: "BPHS Chapter 6 (Chaturthamsha) & Prasna Tantra",
  },
  "Higher Education & Academic Honors": {
    domain: "Higher Education & Academic Honors",
    primaryHouses: [5, 9, 4, 1],
    secondaryHouses: [2, 11],
    contradictingHouses: [6, 8],
    primaryVargas: [
      { vargaCode: "D1", vargaName: "Rashi", divisionNumber: 1, weight: 1.0 },
      { vargaCode: "D9", vargaName: "Navamsha", divisionNumber: 9, weight: 0.7 },
      { vargaCode: "D24", vargaName: "Chaturvimshamsha / Siddhamsa (Higher Learning)", divisionNumber: 24, weight: 1.0 },
    ],
    naturalKarakas: ["Jupiter", "Mercury"],
    jaiminiKarakas: ["Putrakaraka", "Amatyakaraka"],
    sahamsRelevant: ["VIDYA", "GURU"],
    shastricAuthority: "BPHS Chapter 6 (Siddhamsa) & Saravali",
  },
  "Foreign Travel & Relocation": {
    domain: "Foreign Travel & Relocation",
    primaryHouses: [9, 12, 3, 7],
    secondaryHouses: [1, 11],
    contradictingHouses: [4, 2],
    primaryVargas: [
      { vargaCode: "D1", vargaName: "Rashi", divisionNumber: 1, weight: 1.0 },
      { vargaCode: "D9", vargaName: "Navamsha", divisionNumber: 9, weight: 0.7 },
      { vargaCode: "D12", vargaName: "Dwadasamsha (Heritage & Distant Lands)", divisionNumber: 12, weight: 0.8 },
    ],
    naturalKarakas: ["Rahu", "Moon", "Saturn"],
    jaiminiKarakas: ["Darakaraka", "Amatyakaraka"],
    sahamsRelevant: ["DESHANTARA", "YATRA"],
    shastricAuthority: "BPHS & Tajika Neelakanthi (Deshantara Saham)",
  },
  "Children & Progeny Blessings": {
    domain: "Children & Progeny Blessings",
    primaryHouses: [5, 2, 11, 1],
    secondaryHouses: [9],
    contradictingHouses: [6, 8, 12, 4],
    primaryVargas: [
      { vargaCode: "D1", vargaName: "Rashi", divisionNumber: 1, weight: 1.0 },
      { vargaCode: "D7", vargaName: "Saptamsha (Progeny & Dynastic Continuum)", divisionNumber: 7, weight: 1.0 },
      { vargaCode: "D9", vargaName: "Navamsha", divisionNumber: 9, weight: 0.7 },
    ],
    naturalKarakas: ["Jupiter"],
    jaiminiKarakas: ["Putrakaraka"],
    sahamsRelevant: ["SANTANA", "PUNYA"],
    shastricAuthority: "BPHS Chapter 6 (Saptamsha Phala)",
  },
  "Litigation & Legal Victory": {
    domain: "Litigation & Legal Victory",
    primaryHouses: [6, 1, 10, 11],
    secondaryHouses: [3],
    contradictingHouses: [8, 12],
    primaryVargas: [
      { vargaCode: "D1", vargaName: "Rashi", divisionNumber: 1, weight: 1.0 },
      { vargaCode: "D6", vargaName: "Shashtamsha", divisionNumber: 6, weight: 0.9 },
      { vargaCode: "D10", vargaName: "Dashamsha", divisionNumber: 10, weight: 0.7 },
    ],
    naturalKarakas: ["Mars", "Saturn", "Jupiter"],
    jaiminiKarakas: ["Gnatikaraka", "Bhratrikaraka"],
    sahamsRelevant: ["SHATRU", "KALI"],
    shastricAuthority: "Prashna Marga Chapter 14 (Shatru-Vijaya)",
  },
};
