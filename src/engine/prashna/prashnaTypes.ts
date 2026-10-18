// AstroNext Prashna Horary Engine Types

export type PrashnaCategory =
  | "Promotion & Career Advancement"
  | "Marriage & Relationship Union"
  | "Health, Illness & Medical Recovery"
  | "Financial Gain & Wealth Recovery"
  | "Foreign Travel & Relocation"
  | "Lost Object Recovery"
  | "Litigation & Legal Victory"
  | "Property & Real Estate Acquisition"
  | "Higher Education & Academic Success"
  | "Children & Progeny Conception";

export type PrashnaQueryDomain = PrashnaCategory;

export interface PrashnaQueryInput {
  question: string;
  questionCategory: PrashnaCategory;
  questionTimestamp: Date;
  prashnaNumber?: number;
  querentDirection?: string;
  latitude?: number;
  longitude?: number;
  timezone?: number;
  ayanamsha?: string;
  nodeMode?: string;
  houseSystem?: string;
  chartSystem?: string;
}

export interface PrashnaStrictureItem {
  name: string;
  isViolated: boolean;
  description: string;
  ruleCitation?: string;
  severity?: string;
  advice?: string;
}

export interface PrashnaRadicalityReport {
  isRadical: boolean;
  strictures: PrashnaStrictureItem[];
}

export interface PrashnaTimingReport {
  timingHorizon: string;
  timingMethodology: string;
  degreeDifferenceDeg: number;
  ruleCitation: string;
}

export interface PrashnaVerdictReport {
  verdictType: string;
  confidenceGrade: string;
  summary: string;
  supportingFactors: string[];
  inhibitingFactors: string[];
  timing: PrashnaTimingReport;
}

export interface PrashnaSignificators {
  primaryPrashnaLord: string;
  primaryKaryesh: string;
  primaryHouse: number;
}

export interface PrashnaYogaItem {
  name: string;
  type: string;
  participatingPlanets: string[];
  description: string;
  status: string;
}

export interface PrashnaYogasReport {
  activeYogas: PrashnaYogaItem[];
}

export interface PrashnaLagnasReport {
  udayaLagnaSignName: string;
  udayaLagnaLongitude: number;
  udayaLagnaLord: string;
  referenceFramework: {
    arudhaRashi: { signName: string };
    chathraRashi: { signName: string };
    veedhiRashi: { signName: string; description: string };
  };
}

export interface PrashnaRulingPlanetsReport {
  agreementScore: number;
  ascendantSignLord: string;
  ascendantStarLord: string;
  moonStarLord: string;
  dayLord: string;
}

export interface PrashnaFrameworkReport {
  lagnaLord: string;
  lagnaLordHouse: number;
  karyesh: string;
  karyeshHouse: number;
  aspectType: string;
  ithasalaType: string;
  moonApplyingTo?: string;
  moonSeparatingFrom?: string;
  orbSeparationDeg?: number;
}

export interface MasterPrashnaReport {
  calculationStatus?: string;
  methodologyStatus?: string;
  radicalityStatus?: string;
  judgmentStatus?: string;
  radicality: PrashnaRadicalityReport;
  verdict: PrashnaVerdictReport;
  significators: PrashnaSignificators;
  yogas: PrashnaYogasReport;
  lagnas: PrashnaLagnasReport;
  rulingPlanets: PrashnaRulingPlanetsReport;
  timing: PrashnaTimingReport;
  framework: PrashnaFrameworkReport;
}

