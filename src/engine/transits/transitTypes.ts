// src/engine/transits/transitTypes.ts

export interface TransitPositionData {
  name: string;
  eclipticLongitude: number;
  signName: string;
  signIndex: number;
  degreeInSign: number;
  minuteInSign: number;
  secondInSign: number;
  formattedDMS: string;
  nakshatraName: string;
  nakshatraIndex: number;
  nakshatraLord: string;
  pada: number;
  speedDegPerDay: number;
  isRetrograde: boolean;
  isStationary: boolean;
  eclipticLatitudeDeg: number;
  declinationDeg: number;
  distanceAU: number;
  dignity: string;
  combustion: {
    isCombust: boolean;
    angularDistanceToSun: number;
  };
}

export interface TransitGocharaItem {
  planet: string;
  house: number;
  signName: string;
  degreeInSign: number;
  isBeneficGochara: boolean;
  isObstructedByVedha: boolean;
  vedhaObstructionPlanet?: string;
  effectiveBeneficStatus: boolean;
  shastricVerdict: string;
  remedyRecommendation?: string;
}

export interface TransitAspectItem {
  aspectingPlanet: string;
  aspectedPlanetOrPoint: string;
  aspectType: string;
  aspectOrbDeg: number;
  virupas: number;
  isApplying: boolean;
  drishtiStrength: string;
}

export interface SadeSatiReport {
  isUnderSadeSati: boolean;
  phase: "Rising (1st)" | "Peak (2nd)" | "Setting (3rd)" | "None" | string;
  saturnSign: string;
  moonSign: string;
  description: string;
  intensityVirupas: number;
  recommendedRemedies: string[];
}

export interface DhaiyaReport {
  isUnderDhaiya: boolean;
  type: "Kantaka (4th)" | "Ashtama (8th)" | "None" | string;
  saturnSign: string;
  description: string;
  intensityVirupas: number;
}

export interface JupiterTransitReport {
  houseFromMoon: number;
  houseFromLagna: number;
  isAuspicious: boolean;
  isObstructedByVedha: boolean;
  blessingArea: string;
  verdict: string;
}

export interface RahuKetuTransitReport {
  rahuHouseFromMoon: number;
  ketuHouseFromMoon: number;
  rahuSign: string;
  ketuSign: string;
  karmicTheme: string;
  lifeDomainEmphasis: string;
}

export interface DashaTransitConfluenceItem {
  planet: string;
  dashaRole: string;
  transitHouseFromMoon: number;
  transitHouseFromLagna: number;
  confluenceLevel: string;
  timingSynthesis: string;
}

export interface KakshyaReport {
  planet: string;
  kakshyaLord: string;
  kakshyaDegreeRange: string;
  hasBindu: boolean;
  kakshyaStatus: string;
}

export interface TransitIngressEvent {
  planet: string;
  eventType: string;
  date: string;
  signName: string;
  signIndex: number;
  degree: number;
  description: string;
}

export interface MasterTransitReport {
  julianDayUT: number;
  ayanamsaDeg: number;
  ayanamsaType: string;
  targetDate: string;
  currentPositions: Record<string, TransitPositionData>;
  currentPositionsList: TransitPositionData[];
  natalVsTransitHouses: any[];
  gocharaFromMoon: TransitGocharaItem[];
  gocharaFromLagna: TransitGocharaItem[];
  transitAspects: TransitAspectItem[];
  sadeSati: SadeSatiReport;
  dhaiya: DhaiyaReport;
  jupiterTransit: JupiterTransitReport;
  rahuKetuTransit: RahuKetuTransitReport;
  ashtakavargaTransit: any;
  kakshyaReports: KakshyaReport[];
  dashaTransitConfluence: DashaTransitConfluenceItem[];
  upcomingIngressEvents: TransitIngressEvent[];
  calculationEvidence: {
    shlokaReference: string;
    ephemerisPrecision: string;
    notes: string[];
  };
}
