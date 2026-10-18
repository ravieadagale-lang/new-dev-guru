// Core Dev-Guru System Types

export type UserRole = "visitor" | "customer" | "astrologer" | "admin" | "crm";

export type LanguageCode = "en" | "hi" | "mr" | "gu" | "bn" | "te" | "ta" | "kn" | "ml" | "pa";

export type AppTheme = "celestial_gold" | "vedic_crimson" | "ocean_indigo" | "forest_emerald" | "deep_cosmos";

export type DivisionalChartType = 
  | "D1" | "D2" | "D3" | "D4" | "D7" | "D8" | "D9" | "D10" 
  | "D12" | "D16" | "D20" | "D24" | "D27" | "D30" | "D40" | "D45" | "D60";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  gender: "male" | "female" | "other";
  dob: string;
  time: string;
  place: string;
  latitude: number;
  longitude: number;
  timezone: string;
  timezoneOffsetHours?: number;
  rashi: string;
  nakshatra: string;
  nakshatraPada: number;
  lagna: string;
  sunSign: string;
  walletBalance: number;
  spiritualPoints: number;
  referralCode: string;
  totalReferralsCount: number;
  totalPointsEarned: number;
  phone?: string;
  avatarUrl?: string;
  savedKundlis?: any[];
  cart?: any[];
  wishlist?: any[];
  notificationSettings?: TransitNotificationSettings;
  [key: string]: any;
}

export interface PlanetPosition {
  name: string;
  sign: string;
  degree: number | string;
  degreeInSign?: number;
  longitude?: number;
  speed?: number;
  house?: number;
  nakshatra?: string;
  nakshatraLord?: string;
  subLord?: string;
  subSubLord?: string;
  isRetrograde?: boolean;
  isCombust?: boolean;
  dignity?: string;
  totalVirupas?: number;
  totalRupas?: number;
  requiredRupas?: number;
  strengthRatioPercentage?: number;
  rank?: number;
  sthanaBala?: any;
  digBala?: any;
  kalaBala?: any;
  chestaBala?: any;
  naisargikaBala?: any;
  drikBala?: any;
  [key: string]: any;
}

export interface HouseDetail {
  house: number;
  sign: string;
  signIndex?: number;
  degree?: number | string;
  startDegree?: number;
  endDegree?: number;
  midDegree?: number;
  lord?: string;
  subLord?: string;
  planets?: string[];
  karaka?: string;
  significations?: string[];
  [key: string]: any;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price?: number;
  priceINR?: number;
  priceUSD?: number;
  originalPrice?: number;
  rating?: number;
  reviewsCount?: number;
  image?: string;
  imageUrl?: string;
  description?: string;
  shortDesc?: string;
  fullDesc?: string;
  benefits?: string[];
  inStock?: boolean;
  stockCount?: number;
  isBestSeller?: boolean;
  isEnergized?: boolean;
  certification?: string;
  authenticityCertificate?: boolean | string;
  badgeLabel?: string;
  badgeSubtitle?: string;
  certificateType?: string;
  rashiSuitability?: string[];
  chakra?: string;
  deity?: string;
  planet?: string;
  material?: string;
  origin?: string;
  [key: string]: any;
}

export interface AstrologerExpert {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  experienceYears: number;
  languages: string[];
  rating: number;
  consultationsCount: number;
  pricePerMinINR: number;
  pricePerMinUSD: number;
  imageUrl: string;
  isOnline: boolean;
  bio: string;
  education?: string;
  awards?: string[];
  [key: string]: any;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  authorRole?: string;
  readTime: string;
  publishedDate: string;
  summary: string;
  content: string;
  imageUrl?: string;
  relatedToolTab?: string;
  relatedToolName?: string;
  tags?: string[];
  sections?: {
    heading: string;
    paragraphs: string[];
  }[];
  [key: string]: any;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  relatedTopic?: string;
  [key: string]: any;
}

export interface TransitMovementAlerts {
  saturnReturnSadeSati: boolean;
  moonSignChanges: boolean;
  rahuKetuAxisShifts: boolean;
  retrogradeAlerts: boolean;
  eclipseWarnings: boolean;
  jupiterMajorTransits: boolean;
  combustAlerts: boolean;
  sunSankranti: boolean;
  [key: string]: boolean;
}

export interface TransitNotificationSettings {
  pushEnabled: boolean;
  toastAlertsEnabled: boolean;
  soundAlertsEnabled: boolean;
  emailDigestEnabled: boolean;
  minimumImpactSeverity: string;
  rashiFilter: string;
  planetAlerts: Record<string, boolean>;
  movementTypes: TransitMovementAlerts;
  categories: {
    career: boolean;
    finance: boolean;
    love: boolean;
    health: boolean;
    remedies: boolean;
    [key: string]: boolean;
  };
  quietHoursEnabled: boolean;
  quietStart?: string;
  quietEnd?: string;
  [key: string]: any;
}

export interface HoraDetail {
  number: number;
  lord: string;
  rulingPlanet: string;
  startTime: Date;
  endTime: Date;
  startTimeStr: string;
  endTimeStr: string;
  timeRange: string;
  isDay: boolean;
  isActive: boolean;
  isUpcoming: boolean;
  isPassed: boolean;
  progressPct: number;
  nature: "Auspicious" | "Inauspicious" | "Neutral";
  bestFor: string;
}

export interface ChoghadiyaDetail {
  name: string;
  type: "Shubh" | "Ashubh" | "Normal";
  nature: "Amrit" | "Shubh" | "Labh" | "Char" | "Rog" | "Kal" | "Udveg";
  lord: string;
  startTime: Date;
  endTime: Date;
  startTimeStr: string;
  endTimeStr: string;
  timeRange: string;
  period: string;
  isDay: boolean;
  isActive: boolean;
  isUpcoming: boolean;
  isPassed: boolean;
}

export interface GowriDetail {
  name: string;
  type: "Good" | "Bad";
  nature: "Auspicious" | "Inauspicious";
  ruler: string;
  startTime: Date;
  endTime: Date;
  startTimeStr: string;
  endTimeStr: string;
  period: string;
  isDay: boolean;
  isActive: boolean;
}

export interface PanchangInfo {
  dateStr?: string;
  dayOfWeek?: string;
  tithi?: any;
  tithiEnd?: string;
  paksha?: string;
  nakshatra?: any;
  nakshatraLord?: string;
  nakshatraPada?: number;
  yoga?: any;
  karana?: any;
  vara?: any;
  sunSign?: string;
  moonSign?: string;
  sunrise?: string;
  sunset?: string;
  solarNoon?: string;
  nextSunrise?: string;
  moonrise?: string;
  moonset?: string;
  dinamana?: string;
  ratrimana?: string;
  dinamanaMs?: number;
  ratrimanaMs?: number;
  abhijitMuhurat?: string;
  abhijitStartStr?: string;
  abhijitEndStr?: string;
  brahmaMuhurat?: string;
  brahmaStartStr?: string;
  brahmaEndStr?: string;
  rahuKalam?: string;
  rahuKala?: string;
  yamagandaKalam?: string;
  yamaganda?: string;
  gulikaKalam?: string;
  gulika?: string;
  durmuhurtam?: string;
  durmuhurta?: string;
  varjyam?: string;
  vijayaMuhurat?: string;
  godhuliMuhurat?: string;
  nishitaMuhurat?: string;
  pratahSandhya?: string;
  sayahnaSandhya?: string;
  udayaTithi?: any;
  currentTithi?: any;
  choghadiya?: {
    day: ChoghadiyaDetail[] | any[];
    night: ChoghadiyaDetail[] | any[];
  };
  horas?: HoraDetail[] | any[];
  dayHoras?: HoraDetail[] | any[];
  nightHoras?: HoraDetail[] | any[];
  gowriDay?: GowriDetail[] | any[];
  gowriNight?: GowriDetail[] | any[];
  currentHora?: any;
  transitions?: {
    tithiStart?: string;
    tithiEnd?: string;
    nakshatraStart?: string;
    nakshatraEnd?: string;
    yogaStart?: string;
    yogaEnd?: string;
    karanaStart?: string;
    karanaEnd?: string;
  };
  [key: string]: any;
}

export interface NakshatraDetail {
  index: number;
  name: string;
  lord: string;
  deity: string;
  pada: number;
  degreeSpan: string;
  symbol: string;
  gana: string;
  yoni: string;
  nadi: string;
  tattva: string;
  characteristics: string[];
  remedies: string[];
  [key: string]: any;
}

export interface YogaCombination {
  name: string;
  category: string;
  planetsInvolved: string[];
  description: string;
  effects: string;
  strength: "High" | "Medium" | "Low";
  isAuspicious: boolean;
  classicalReference?: string;
  [key: string]: any;
}

export interface DoshaAnalysis {
  name: string;
  severity: "High" | "Moderate" | "Mild" | "None";
  hasDosha: boolean;
  isCancelled: boolean;
  cancellationReasons: string[];
  impactAreas: string[];
  remedies: string[];
  description: string;
  [key: string]: any;
}

export interface VimshottariDasha {
  planet: string;
  startDate: string;
  endDate: string;
  durationYears: number;
  antardashas?: VimshottariDasha[];
  pratyantardashas?: VimshottariDasha[];
  currentDashaText?: string;
  isCurrent?: boolean;
  [key: string]: any;
}

export interface KPPlanetaryCusp {
  cuspNumber: number;
  degree: number | string;
  sign: string;
  signLord: string;
  starLord: string;
  subLord: string;
  subSubLord?: string;
  [key: string]: any;
}

// Numerology Types
export interface LoShuGridCell {
  num: number;
  element: string;
  direction: string;
  lifeArea: string;
  count: number;
  status: "Missing" | "Balanced" | "Repeated";
  interpretation: string;
}

export interface LoShuPlane {
  name: string;
  numbers: number[];
  type: "Mental" | "Emotional" | "Practical" | "Thought" | "Will" | "Action" | "Success (Golden)" | "Spiritual (Silver)";
  isComplete: boolean;
  presentCount: number;
  percentage: number;
  description: string;
}

export interface NameCorrectionSuggestion {
  originalName: string;
  suggestedName: string;
  originalCompound: number;
  suggestedCompound: number;
  originalRoot: number;
  suggestedRoot: number;
  luckyPlanet: string;
  explanation: string;
  improvementScore: number;
}

export interface MobileNumerologyResult {
  mobileNumber: string;
  totalSum: number;
  singleDigit: number;
  rulingPlanet: string;
  isLucky: boolean;
  suitability: string[];
  unfavorableCombinations: string[];
  analysis: string;
  recommendations: string[];
}

export interface VehicleNumerologyResult {
  vehicleNumber: string;
  totalSum: number;
  singleDigit: number;
  rulingPlanet: string;
  isCompatible: boolean;
  safetyScore: number;
  luckyColors: string[];
  analysis: string;
}

export interface HouseNumerologyResult {
  houseNumber: string;
  totalSum: number;
  singleDigit: number;
  element: string;
  energyVibe: string;
  compatibleProfessions: string[];
  fengShuiTips: string[];
  analysis: string;
}

export interface PartnerNumerologyResult {
  userNumber: number;
  partnerNumber: number;
  compatibilityScore: number;
  verdict: string;
  strengths: string[];
  challenges: string[];
  advice: string;
}

export interface PersonalYearMonthForecast {
  personalYear: number;
  currentMonthNumber: number;
  yearTheme: string;
  monthTheme: string;
  favorableActivities: string[];
  cautionaryAlerts: string[];
  monthlyKeyDays: number[];
  forecasts: {
    year: number;
    personalYear: number;
    theme: string;
    focus: string;
  }[];
}

export interface NumerologyReport {
  driverNumber: number;
  conductorNumber: number;
  kuaNumber: number;
  nameNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  driverLord: string;
  conductorLord: string;
  luckyColors: string[];
  luckyGems: string[];
  luckyDays: string[];
  luckyNumbers: number[];
  unluckyNumbers: number[];
  loShuGrid: Record<number, number>;
  activePlanes: string[];
  missingNumbers: number[];
  repeatedNumbers: number[];
  summary: string;
  [key: string]: any;
}

export interface PartnerAstroProfile {
  name: string;
  dob: string;
  time?: string;
  place?: string;
  latitude?: number;
  longitude?: number;
  gender?: "male" | "female" | "other";
  rashi?: string;
  nakshatra?: string;
  nakshatraPada?: number;
  [key: string]: any;
}

export interface ComprehensiveMatchResult {
  score: number;
  maxScore: number;
  percentage: number;
  verdict: "Excellent Match" | "Good Match" | "Average Match" | "Challenging Match";
  ashtaKoota: {
    varna: { obtained: number; max: number; description: string };
    vashya: { obtained: number; max: number; description: string };
    tara: { obtained: number; max: number; description: string };
    yoni: { obtained: number; max: number; description: string };
    grahaMaitri: { obtained: number; max: number; description: string };
    gana: { obtained: number; max: number; description: string };
    bhakoot: { obtained: number; max: number; description: string };
    nadi: { obtained: number; max: number; description: string };
  };
  hasNadiDosha: boolean;
  nadiDoshaCancelled: boolean;
  hasBhakootDosha: boolean;
  bhakootDoshaCancelled: boolean;
  hasManglikDosha: boolean;
  manglikStatus: string;
  strengths: string[];
  concerns: string[];
  remedies: string[];
  synastryHighlights?: string[];
  [key: string]: any;
}

export type NotificationCategory = "transit" | "purchase" | "vratas" | "panchang" | "sadhana";

export interface AppNotification {
  id: string;
  category: NotificationCategory;
  title: string;
  message: string;
  timestamp: string;
  date?: string;
  isRead: boolean;
  priority?: "high" | "normal" | "urgent";
  badgeLabel?: string;
  actionLabel?: string;
  actionTab?: string;
  targetId?: string;
  metadata?: Record<string, any>;
  planet?: string;
  movementType?: string;
  vratType?: string;
  panchangType?: string;
  purchaseType?: string;
  sadhanaType?: string;
  severity?: "High Impact" | "Favorable Transit" | "Cautionary Axis" | "Normal";
  remedy?: string;
  vratId?: string;
  vratTimingRule?: "day_before" | "day_of_morning" | "day_of_evening" | "general";
  validUntil?: string;
}

export interface AdvancedNotificationPreferences {
  soundEnabled: boolean;
  transit: {
    enabled: boolean;
    jupiterMajorTransits: boolean;
    saturnReturnSadeSati: boolean;
    retrogradeAlerts: boolean;
    eclipseWarnings: boolean;
    moonSignChanges: boolean;
    beneficDrishti: boolean;
    planets: {
      Sun: boolean;
      Moon: boolean;
      Mars: boolean;
      Mercury: boolean;
      Jupiter: boolean;
      Venus: boolean;
      Saturn: boolean;
      RahuKetu: boolean;
    };
    minimumImpactSeverity: "All Transits" | "Favorable Transits Only" | "High Impact Only";
  };
  vratas: {
    enabled: boolean;
    prepAlert1DayBefore: boolean;
    dawnSankalpAlert: boolean;
    ekadashiVrats: boolean;
    pradoshVrats: boolean;
    purnimaAmavasya: boolean;
    weeklyVrats: boolean;
    festivals: boolean;
    selectedVratIds: string[];
    customObservanceDates?: Record<string, string>;
  };
  panchang: {
    enabled: boolean;
    abhijitMuhurat: boolean;
    rahuKalam: boolean;
    choghadiyaTimings: boolean;
    tithiTransitions: boolean;
    brahmaMuhurat?: boolean;
  };
  purchase: {
    enabled: boolean;
    orderUpdates: boolean;
    pdfDossierDelivery: boolean;
    walletCredits: boolean;
    consultationReminders: boolean;
  };
  sadhana: {
    enabled: boolean;
    dailyJapaReminder: boolean;
    suryaArghya: boolean;
    streakProtection: boolean;
  };
}
