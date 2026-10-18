// AstroNext Jaimini Astrology Engine Types

export type JaiminiKarakaScheme = "7_karaka" | "8_karaka";

export interface JaiminiKarakaItem {
  role: string;
  roleName: string;
  planet: string;
  longitudeDeg: number;
  degreeInSign?: number;
  longitudeFormatted: string;
  signName: string;
  signIndex: number;
  nakshatra: string;
  nakshatraLord: string;
  karakaSignificance: string;
  isRahuIncluded: boolean;
}

export interface ArudhaPadaItem {
  houseNumber: number;
  code: string;
  name: string;
  rashiName: string;
  rashiIndex: number;
  degreeFormatted: string;
  lord: string;
  significance: string;
}

export interface UpapadaAnalysis {
  upapadaSign: string;
  upapadaSignIndex: number;
  upapadaLord: string;
  darapadaSign: string;
  darapadaLord: string;
  relationshipSynergy: string;
  marriageTimingNotes: string;
  remedy: string;
}

export interface KarakamsaAnalysis {
  atmakarakaPlanet: string;
  navamshaSign: string;
  navamshaSignIndex: number;
  spiritualPath: string;
  careerIndicators: string;
  ishtaDevata: string;
  liberationPotential: string;
}

export interface ArgalaItem {
  targetHouse: number;
  primaryArgalaHouses: number[];
  secondaryArgalaHouses: number[];
  obstructingHouses: number[];
  netStatus: string;
  description: string;
}

export interface CharaDashaMahadasha {
  rashiName: string;
  rashiIndex: number;
  durationYears: number;
  startDateFormatted: string;
  endDateFormatted: string;
  antardashas: Array<{
    rashiName: string;
    startDateFormatted: string;
    endDateFormatted: string;
  }>;
}

export interface CharaDashaReport {
  orderType: string;
  mahadashas: CharaDashaMahadasha[];
}

export interface JaiminiYogaItem {
  name: string;
  type: string;
  participatingPlanets: string[];
  description: string;
  potency: string;
}

export interface RashiDrishtiItem {
  rashiName: string;
  aspectedRashis: string[];
  planetsPresent: string[];
}

export interface MasterJaiminiReport {
  karakas: JaiminiKarakaItem[];
  arudhaPadas: ArudhaPadaItem[];
  upapadaAnalysis: UpapadaAnalysis;
  karakamsaAnalysis: KarakamsaAnalysis;
  argalaAnalysis: ArgalaItem[];
  charaDasha: CharaDashaReport;
  jaiminiYogas: JaiminiYogaItem[];
  rashiDrishti: RashiDrishtiItem[];
  atmakaraka: { planet: string; degreeInSign: number };
  darakaraka: { planet: string; degreeInSign: number };
}
