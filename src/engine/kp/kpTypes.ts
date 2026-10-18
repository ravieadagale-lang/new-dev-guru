// AstroNext KP Astrology Engine Types

export interface KPCuspItem {
  cuspNumber: number;
  houseNumber?: number;
  dms?: string;
  longitudeDeg: number;
  longitudeFormatted: string;
  signName: string;
  signLord: string;
  starLord: string;
  subLord: string;
  subSubLord: string;
  subNumber?: number;
  signifiedHouses?: number[];
}

export interface KPPlanetSignificator {
  planet: string;
  levelA: number[];
  levelB: number[];
  levelC: number[];
  levelD: number[];
  levelA_Houses?: number[];
  levelB_Houses?: number[];
  levelC_Houses?: number[];
  levelD_Houses?: number[];
  allSignifiedHouses?: number[];
  fourStepChain?: {
    step1_Planet: { planet: string; houseOccupied: number; housesOwned: number[] };
    step2_StarLord: { starLord: string; houseOccupied: number; housesOwned: number[] };
    step3_SubLord: { subLord: string; houseOccupied: number; housesOwned: number[] };
    step4_SubLordStarLord: { starLord: string; houseOccupied: number; housesOwned: number[] };
  };
  starLord: string;
  subLord: string;
}

export interface KPHouseSignificator {
  house: number;
  gradeA: string[];
  gradeB: string[];
  gradeC: string[];
  gradeD: string[];
}

export type KPSignificators = Record<string, any> & {
  planetSignificators?: KPPlanetSignificator[];
  houseSignificators?: KPHouseSignificator[];
};

export interface KPRulingPlanets {
  dayLord: string;
  ascStarLord: string;
  ascendantStarLord?: string;
  ascSignLord: string;
  ascendantSignLord?: string;
  moonStarLord: string;
  moonSignLord: string;
  combinedRulingPlanets: string[];
  primaryRulingPlanets?: string[];
}

export interface KPEventEvaluation {
  eventId?: string;
  fructificationStrengthPct?: number;
  eventName: string;
  domainName?: string;
  primaryCusp?: number;
  supportingHousesConnected?: number[];
  isEventPromised?: boolean;
  cuspalSubLord?: string;
  cuspalSubLordStarLord?: string;
  cuspalSubLordHousesSignified?: number[];
  favorablePlanets?: string[];
  timingSummary?: string;
  primaryHouses: number[];
  supportingHouses: number[];
  detrimentalHouses: number[];
  subLordAnalysis: string;
  promiseVerdict: "STRONG_FRUITION" | "MODERATE_DELAY" | "UNFAVORABLE" | "HIGHLY_FAVORABLE";
  notes: string;
}

export interface MasterKPReport {
  cusps: KPCuspItem[];
  significators: KPSignificators;
  rulingPlanets: KPRulingPlanets;
  eventEvaluations: KPEventEvaluation[];
}
