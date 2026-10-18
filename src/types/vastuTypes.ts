export type ElementType = "Water" | "Air" | "Fire" | "Earth" | "Space";

export type FengShuiElement = "Wood" | "Fire" | "Earth" | "Metal" | "Water";

export type ZoneBalanceStatus = "balanced" | "cut" | "extended";

export interface MahaVastuZone {
  id: string; // e.g., "N", "NNE", "NE"
  name: string; // e.g., "North"
  hindiName: string; // e.g., "उत्तर (Uttara)"
  angleStart: number; // e.g., 348.75
  angleEnd: number; // e.g., 11.25
  centerAngle: number; // e.g., 0
  element: ElementType;
  rulingDeity: string;
  rulingPlanet: string;
  keyAttributes: string;
  lifeAspect: string;
  colorHex: string;
  antiElements: ElementType[];
  idealRooms: string[];
  prohibitedRooms: string[];
  cutRemedy: string;
  extendedRemedy: string;
  metalRemedy: "Stainless Steel" | "Aluminium" | "Copper" | "Brass" | "Iron";
  colorTapeRemedy: "Blue" | "Green" | "Red" | "Yellow" | "White";
}

export interface DevataPada {
  id: string; // e.g., "N1", "N2", ... "N8"
  zoneId: string; // e.g., "N", "NE"
  name: string; // e.g., "Mukhya", "Bhallat"
  sanskritName: string;
  direction: "North" | "East" | "South" | "West";
  padaNumber: number; // 1 to 8
  angleStart: number;
  angleEnd: number;
  centerAngle: number;
  isAuspicious: boolean;
  auspiciousGrade: "High" | "Moderate" | "Neutral" | "Negative" | "Severe";
  effects: string;
  description: string;
  remedy: string;
}

export type RoomCategory =
  | "entrance"
  | "kitchen"
  | "master_bedroom"
  | "children_bedroom"
  | "guest_bedroom"
  | "living_room"
  | "dining_room"
  | "mandir_puja"
  | "toilet"
  | "bathroom"
  | "septic_tank"
  | "water_tank_ug"
  | "water_tank_oh"
  | "study_room"
  | "cash_locker"
  | "staircase"
  | "balcony"
  | "store_room"
  | "garage_parking"
  | "dustbin_disposal";

export interface PlacedRoomItem {
  id: string;
  category: RoomCategory;
  label: string;
  xPct: number; // 0 - 100 percentage of canvas width
  yPct: number; // 0 - 100 percentage of canvas height
  widthPct?: number; // width span percentage (default 8%)
  lengthPct?: number; // length/height span percentage (e.g. entrance width or room depth, default 6-10%)
  orientation?: "horizontal" | "vertical"; // for doors/entrances
  rotationDeg?: number; // custom angle rotation
  distanceFromCenterPct: number;
  angleDeg: number; // 0 - 359.9° relative to true north
  detectedZoneId: string;
  detectedPadaId?: string;
  complianceRating: "Auspicious" | "Neutral" | "Dosha" | "Severe Dosha";
  shastricVerdict: string;
  recommendedRemedy: string;
  metalStripRemedy?: string;
  colorTapeRemedy?: string;
  pyramidYantraRemedy?: string;
}

export interface SampleFloorPlanPreset {
  id: string;
  title: string;
  subtitle: string;
  dimensions: string;
  areaSqFt: number;
  facing: "North" | "East" | "West" | "South";
  defaultNorthOffset: number;
  defaultRooms: Omit<PlacedRoomItem, "id" | "detectedZoneId" | "complianceRating" | "shastricVerdict" | "recommendedRemedy">[];
  svgBlueprint: string;
}

export interface AyadiCalculationResult {
  lengthFeet: number;
  widthFeet: number;
  areaSqFeet: number;
  areaHasta: number;
  aaya: number; // Income (Remainder when Area * 8 / 12)
  vyaya: number; // Expenditure (Remainder when Area * 9 / 10)
  yoni: number; // Directional Animal (Area * 3 / 8)
  yoniName: string;
  yoniDirection: string;
  vara: number; // Day (Area * 9 / 7)
  varaName: string;
  tithi: number; // Lunar Phase (Area * 8 / 30)
  tithiName: string;
  ayu: number; // Longevity (Area * 27 / 100)
  isProsperous: boolean;
  verdict: string;
  recommendations: string[];
}

// FENG SHUI MODELS
export interface BaguaPalace {
  id: string;
  trigram: string;
  chineseName: string;
  englishName: string;
  direction: string;
  element: FengShuiElement;
  lifeAspiration: string;
  color: string;
  shapes: string;
  enhancers: string[];
  taboos: string[];
}

export interface FlyingStarData {
  starNumber: number;
  name: string;
  element: FengShuiElement;
  nature: "Auspicious" | "Timely (Prosperous)" | "Affliction (Inauspicious)" | "Neutral";
  period9Status: "Supreme Wealth" | "Future Prosperity" | "Academic / Romance" | "Heavenly Blessings" | "Misfortune" | "Illness" | "Conflict" | "Robbery / Loss" | "Stable Earth";
  influence: string;
  annual2026Sector: string;
  annual2027Sector: string;
  traditionalCure: string;
  cureCategory: "Metal Wind Chime" | "Salt Water Cure" | "Brass Wu Lou" | "Fire / Red Lamp" | "Water Fountain" | "Earth Crystals";
}

export interface PersonalKuaResult {
  kuaNumber: number;
  trigram: string;
  element: FengShuiElement;
  group: "East Group (Dong Si Ming)" | "West Group (Xi Si Ming)";
  auspiciousDirections: {
    name: string;
    chinese: string;
    direction: string;
    benefit: string;
  }[];
  inauspiciousDirections: {
    name: string;
    chinese: string;
    direction: string;
    warning: string;
    mitigation: string;
  }[];
}

// GEOPATHIC STRESS & EARTH ENERGY
export type GeopathicRadiationType =
  | "Hartmann Grid"
  | "Curry Net"
  | "Underground Water Vein"
  | "Geological Fault Line"
  | "Earth Magnetic Disturbance";

export interface GeopathicPoint {
  id: string;
  type: GeopathicRadiationType;
  xPct: number;
  yPct: number;
  intensityBovis: number; // e.g., 2500 Bovis (very low/harmful)
  healthRisks: string[];
  remedyAction: string;
}

// COMMERCIAL & INDUSTRIAL VASTU
export type CommercialPropertyType =
  | "corporate_office"
  | "retail_showroom"
  | "manufacturing_factory"
  | "restaurant_cafe"
  | "clinic_hospital";

export interface CommercialAuditItem {
  id: string;
  sectorName: string;
  recommendedZone: string;
  actualZone: string;
  compliance: "Optimal" | "Permissible" | "Critical Clash";
  impactOnBusiness: string;
  remedy: string;
}

// PLOT & LAND SELECTION (BHOOMI PARIKSHA)
export type PlotShape =
  | "square"
  | "rectangular"
  | "gaumukhi" // Cow face (narrow front, wide back - good for home)
  | "shermukhi" // Lion face (wide front, narrow back - good for commercial)
  | "triangular"
  | "circular"
  | "irregular";

export type SlopeDirection =
  | "north_east_down" // Most auspicious
  | "east_down"
  | "north_down"
  | "south_west_down" // Very inauspicious
  | "south_down"
  | "west_down"
  | "flat";

export type VeedhiShoolaThrust =
  | "none"
  | "north_east_hit"
  | "east_hit"
  | "south_east_hit"
  | "south_hit"
  | "south_west_hit"
  | "west_hit"
  | "north_west_hit"
  | "north_hit";

export interface PlotAnalysisResult {
  shape: PlotShape;
  slope: SlopeDirection;
  roadThrust: VeedhiShoolaThrust;
  soilQuality: "Brahmin_White_Sweet" | "Kshatriya_Red_Astringent" | "Vaishya_Yellow_Sour" | "Shudra_Black_Bitter";
  overallScore: number;
  suitability: "Highly Auspicious" | "Moderately Auspicious" | "Conditional with Remedies" | "Avoid / Rejected";
  pros: string[];
  cons: string[];
  remedies: string[];
}

// QUICK 60-SECOND VASTU AUDIT (FOR NON-EXPERTS)
export interface QuickAuditInput {
  propertyType: "apartment" | "independent_house" | "office" | "shop";
  entranceZone: string;
  kitchenZone: string;
  masterBedZone: string;
  toiletZone: string;
  mandirZone: string;
  waterStorageZone: string;
  cutsOrExtensions: "none" | "ne_cut" | "sw_cut" | "se_cut" | "nw_cut" | "ne_extended" | "sw_extended";
}

export interface QuickAuditResult {
  overallScore: number;
  lifePillars: {
    name: string;
    scorePct: number;
    status: "Strong" | "Moderate" | "Vulnerable";
    keyFactor: string;
  }[];
  criticalDoshas: {
    title: string;
    severity: "High" | "Medium" | "Low";
    problem: string;
    simpleRemedy: string;
  }[];
  topPositiveAlignments: string[];
  downloadableSummary: string;
}

// LIFE PROBLEM & DEFECT FINDER (REVERSE DIAGNOSIS)
export type LifeProblemCategory =
  | "wealth_finance"
  | "health_vitality"
  | "love_relationships"
  | "mental_peace"
  | "career_business"
  | "legal_court"
  | "children_education";

export interface LifeProblemDefectMapping {
  id: string;
  problemTitle: string;
  category: LifeProblemCategory;
  commonSymptoms: string[];
  afflictedZones: string[]; // e.g., ["SE", "N"]
  primaryVastuFlaw: string; // e.g. "Toilet or Blue Color in South-East (Fire Zone)"
  elementalConflict: string; // e.g. "Water quenching Fire"
  afflictedDevataPada: string; // e.g. "Vitatha / Yama"
  vedicAstrologicalImpact: string; // e.g. "Affliction of Venus (Shukra) and Agni Tatva"
  remedies: {
    threeDimensionalCure: string; // e.g., "3D Brass Nandi bull or Brass Kamadhenu"
    crystalPlacement: string; // e.g., "Pyrite cluster & Citrine geode placed in North"
    vedicMantraPuja: {
      mantraName: string;
      sanskritMantra: string;
      japaCount: string;
      deity: string;
      ritualAction: string;
    };
    elementalVirtualBlocking: string; // e.g., "Embed a 3mm Copper strip or Red elemental tape"
    fengShuiGrandmasterCure: string; // e.g., "Place a pair of Pi Xiu or 3-Legged Money Frog"
  };
}

// SACRED CRYSTAL PLACEMENT SPECIFICATION
export interface CrystalRemedyItem {
  id: string;
  crystalName: string;
  mineralFamily: string;
  primaryZone: string;
  secondaryZone?: string;
  pranicFrequency: string;
  lifeAspect: string;
  placementLocation: string;
  cleansingRitual: string; // e.g. "Full Moon moonlight or Rock Salt water soak"
  avoidZones: string[];
  vibrationNotes: string;
}

// 3D VASTU IDOL & SACRED OBJECT
export interface ThreeDimensionalRemedyItem {
  id: string;
  objectName: string;
  metalOrMaterial: "Solid Brass" | "Pure Copper" | "Asthadhatu" | "Panchaloha" | "Natural Stone" | "Terracotta";
  bestZone: string;
  directionFacing: string;
  classicalPurpose: string;
  shastricReference: string;
  installationRitual: string;
  prohibitedPlacements: string;
}

// VEDIC MANTRAS & VASTU SHANTI PUJA
export interface VedicPujaProtocol {
  id: string;
  title: string;
  targetDosha: string;
  deity: string;
  coreMantra: string;
  mantraMeaning: string;
  idealTithiNakshatra: string;
  samagriList: string[];
  ritualProcedure: string[];
  fruitBenefit: string;
}

// FENG SHUI GRANDMASTER REMEDIES
export interface FengShuiGrandmasterRemedy {
  id: string;
  cureName: string;
  chineseName: string;
  baguaTrigram: string;
  material: string;
  directionSector: string;
  functionPurpose: string;
  criticalRules: string[];
  activationRitual: string;
}
