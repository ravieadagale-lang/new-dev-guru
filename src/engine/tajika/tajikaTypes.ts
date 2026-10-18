// AstroNext Tajika Varshaphala Engine Types

export type MuddaYearMode = "365.2425DayConvention" | "360DaySavana" | "365DayCivil";

export interface SolarReturnConvergence {
  convergenceError: number;
  solarReturnInstantUTC: string;
  iterations: number;
  solarReturnTargetLongitude: number;
  convergenceStatus: string;
  natalSunLongitude: number;
  targetLongitude: number;
  ephemerisProvider: string;
}

export interface TajikaYogaItem {
  shastricRuleId: string;
  yogaName: string;
  category: "Auspicious Fruition" | "Friction / Obstruction" | "Neutral / Variable";
  involvedPlanets: string[];
  orbDegrees: number;
  aspectType: string;
  effectDescription: string;
}

export interface TajikaSahamItem {
  name: string;
  sanskritName: string;
  finalLongitude: number;
  signName: string;
  housePlacement: number;
  dispositor: string;
  dayNightVariant: string;
  adjustmentApplied: boolean;
  adjustmentRule: string;
  significance: string;
}

export interface TriPatakiVedhaItem {
  aspectingPlanet: string;
  aspectingNature: string;
  targetSensitivePoint: string;
  vedhaType: string;
  targetSign: string;
  severity: string;
  effectDescription: string;
}

export interface TriPatakiChakraReport {
  netAfflictionScore: number;
  synthesisJudgment: string;
  vedhasDetected: TriPatakiVedhaItem[];
}

export interface VarsheshaResult {
  selectedVarshesha: string;
  strengthRating: string;
  varsheshaOffice: string;
  panchaVargiyaScore: number;
  harshaBalaScore: number;
  annualForecast: string;
}

export interface MunthaReport {
  munthaHouseFromVarshaLagna: number;
  progressedMunthaSignName: string;
  muntheshaPlanet: string;
  ageInCompletedYears: number;
  annualImplications: string;
  muntheshaHouseFromVarshaLagna: number;
  muntheshaDignity: string;
}

export interface VarshaAscendant {
  longitude: number;
  signName: string;
  signLord: string;
  signIndex: number;
}

export interface PanchadhikariCandidate {
  office: string;
  planet: string;
  houseFromVarshaLagna: number;
  aspectsVarshaLagna: boolean;
  aspectTypeToVarshaLagna: string;
  panchaVargiyaBalaPoints: number;
  harshaBalaPoints: number;
  isEligible: boolean;
  disqualificationReason?: string;
}

export interface PanchadhikariResult {
  candidates: PanchadhikariCandidate[];
}

export interface MuddaPeriod {
  lord: string;
  durationDays: number;
  startDateIso: string;
  endDateIso: string;
  predictedThemes: string;
}

export interface MuddaDashaReport {
  periods: MuddaPeriod[];
}

export interface MasaMonthReport {
  monthIndex: number;
  monthName: string;
  masaAscendantSign: string;
  exactReturnInstantUtcIso: string;
  masaVarshesha: string;
  keyTheme: string;
}

export interface MasaPraveshaReport {
  months: MasaMonthReport[];
}

export interface MethodologyProfile {
  system: string;
  ayanamsha: string;
  houseSystem: string;
  annualChartMethod: string;
  yearLengthConvention: string;
  varsheshaSelectionProfile: string;
  sahamShodhanaProfile: string;
}

export interface MasterTajikaReport {
  solarReturnConvergence: SolarReturnConvergence;
  activeTajikaYogas: TajikaYogaItem[];
  sahamsList: TajikaSahamItem[];
  triPatakiChakra: TriPatakiChakraReport;
  varsheshaResult: VarsheshaResult;
  muntha: MunthaReport;
  varshaAscendant: VarshaAscendant;
  metadata: { ayanamsha: string };
  panchadhikariResult: PanchadhikariResult;
  muddaDasha: MuddaDashaReport;
  masaPravesha: MasaPraveshaReport;
  methodologyProfile: MethodologyProfile;
}
