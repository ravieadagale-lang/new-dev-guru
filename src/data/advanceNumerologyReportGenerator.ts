// src/data/advanceNumerologyReportGenerator.ts

import {
  calculateDriverNumber,
  calculateConductorNumber,
  calculateKuaNumber,
  NUMBER_ANALYSIS_DATABASE,
  SingleNumberAnalysis
} from "./numerologyCoreEngine";
import { PLANETARY_ASSETS, PlanetAsset, SACRED_YANTRAS_GALLERY } from "./numerologyAssetsData";
import { DETAILED_CHAKRA_BALANCING_DATA } from "./chakraBalancingRemediesData";
import { BIRTH_MONTH_DATA, BirthMonthInfo } from "./birthMonthData";
import { getBirthNumberDetail, BirthNumberDetail } from "./numerologyBirthNumbers1to31";
import { get81Combination, Combination81Result } from "./numerology81Combinations";
import { getSoulUrgeAnalysis, SoulUrgeAnalysis } from "./numerologySoulUrge";
import { getExpressionNumberAnalysis, ExpressionNumberAnalysis } from "./numerologyExpressionNumber";
import {
  getPersonalityAnalysis,
  getInnerDreamAnalysis,
  PersonalityAnalysis,
  InnerDreamAnalysis
} from "./numerologyPersonalityInnerDream";
import { calculatePinnaclesAndChallenges } from "./numerologyPinnaclesAndChallenges";
import {
  getMasterNumberDetail,
  getKarmicDebtDetail,
  MasterNumberDetail,
  KarmicDebtDetail
} from "./numerologyMasterKarmicEngine";
import { ARROWS_OF_STRENGTH_DATA, ARROWS_OF_WEAKNESS_DATA, LoShuArrowDetail } from "./loshuArrowsData";
import { MISSING_NUMBERS_DATA, REPEATED_NUMBERS_DATA } from "./loshuMissingRepeatedData";

export interface LoShuGridCell {
  num: number;
  count: number;
  planet: string;
  element: string;
  status: "Occupied" | "Missing" | "Repeated";
}

// Chaldean letter values mapping
const CHALDEAN_MAP: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 7, P: 8, Q: 1, R: 2,
  S: 3, T: 4, U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7
};

const VOWELS = new Set(["A", "E", "I", "O", "U"]);

function calculateNameNumbers(name: string) {
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, "");
  let totalExpression = 0;
  let totalSoulUrge = 0;
  let totalPersonality = 0;

  for (const char of cleanName) {
    const val = CHALDEAN_MAP[char] || 1;
    totalExpression += val;
    if (VOWELS.has(char)) {
      totalSoulUrge += val;
    } else {
      totalPersonality += val;
    }
  }

  function reduceNum(n: number): number {
    if (n === 11 || n === 22 || n === 33) return n;
    while (n > 9) {
      n = String(n).split("").map(Number).reduce((a, b) => a + b, 0);
    }
    return n || 1;
  }

  const expNum = reduceNum(totalExpression);
  const soulNum = reduceNum(totalSoulUrge);
  const persNum = reduceNum(totalPersonality);

  return { expNum, soulNum, persNum };
}

function reduceSimple(n: number): number {
  while (n > 9) {
    n = String(n).split("").map(Number).reduce((a, b) => a + b, 0);
  }
  return n || 1;
}

export interface AdvancedReportInputs {
  fullName: string;
  dob: string; // YYYY-MM-DD
  gender?: "male" | "female" | "other";
  birthTime?: string;
  birthLocation?: string;
  primaryMobile?: string;
  secondaryMobile?: string;
  currentSignatureName?: string;
  nickname?: string;
  businessName?: string;
  houseNumber?: string;
  partnerName?: string;
  partnerDob?: string;
  motherName?: string;
  fatherName?: string;
}

export interface MobileAnalysisDetail {
  number: string;
  compound: number;
  single: number;
  planet: string;
  status: "Harmonious" | "Neutral" | "Challenging";
  resonance: string;
  suitability: string;
}

export interface ExtendedInputsAnalysis {
  mobileAnalysis: {
    primary: MobileAnalysisDetail;
    secondary?: MobileAnalysisDetail;
  };
  nameSignatureAnalysis: {
    currentSignatureName: string;
    chaldeanCompound: number;
    chaldeanSingle: number;
    pythagoreanSingle: number;
    harmonyWithBirthChart: string;
    resonanceScore: number;
    signatureGuidance: string;
    nicknameAnalysis?: {
      nickname: string;
      chaldeanSingle: number;
      pythagoreanSingle: number;
      auraImpact: string;
    };
  };
  spaceAndBusinessAnalysis: {
    business?: {
      businessName: string;
      chaldeanCompound: number;
      chaldeanSingle: number;
      prosperityGrade: string;
      financialProsperityIndex: number;
      commercialVibe: string;
    };
    house?: {
      houseNumber: string;
      compound: number;
      single: number;
      vastuVibe: string;
      domesticHarmonyScore: number;
      recommendedRemedy: string;
    };
  };
  partnerCompatibility?: {
    partnerName: string;
    partnerDob: string;
    partnerDriver: number;
    partnerConductor: number;
    synergyScore: number;
    marriageCompatibility: string;
    businessPartnershipSynergy: string;
    karmicBondAnalysis: string;
  };
  ancestralKarmaLineage?: {
    motherName?: string;
    fatherName?: string;
    maternalLineageVibration?: {
      name: string;
      chaldeanSingle: number;
      planet: string;
      karmicAttribute: string;
      inheritedInstincts: string;
    };
    paternalLineageVibration?: {
      name: string;
      chaldeanSingle: number;
      planet: string;
      karmicAttribute: string;
      inheritedDharmicPath: string;
    };
    ancestralSynthesis: string;
  };
}

export interface AdvancedReportData {
  clientInfo: {
    fullName: string;
    dob: string;
    gender: "male" | "female" | "other";
    birthTime?: string;
    birthLocation?: string;
    reportGeneratedAt: string;
    reportId: string;
    primaryMobile?: string;
    secondaryMobile?: string;
    currentSignatureName?: string;
    nickname?: string;
    businessName?: string;
    houseNumber?: string;
    partnerName?: string;
    partnerDob?: string;
    motherName?: string;
    fatherName?: string;
  };
  extendedInputsAnalysis: ExtendedInputsAnalysis;
  coreCalculations: {
    driverNumber: number;
    conductorNumber: number;
    kuaNumber: number;
    kuaDetails: any;
    driverAnalysis: SingleNumberAnalysis;
    conductorAnalysis: SingleNumberAnalysis;
    masterNumbersFound: number[];
    karmicDebtsFound: number[];
  };
  birthNumberAnalysis: BirthNumberDetail;
  combination81Analysis: Combination81Result;
  soulUrgeAnalysis: SoulUrgeAnalysis;
  expressionAnalysis: ExpressionNumberAnalysis;
  personalityAnalysis: PersonalityAnalysis;
  innerDreamAnalysis: InnerDreamAnalysis;
  planetaryDetails: {
    rulingPlanet: string;
    rulingDeity: string;
    deityTitle: string;
    deityImageUrl: string;
    planetImageUrl: string;
    yantraName: string;
    yantraImageUrl: string;
    crystalName: string;
    crystalImageUrl: string;
    chakraName: string;
    chakraImageUrl: string;
    mantra: string;
  };
  loShuGrid: {
    gridMatrix: (number | null)[][];
    counts: Record<number, number>;
    missingNumbers: number[];
    repeatedNumbers: number[];
    presentNumbers: number[];
    planes: {
      mentalPlane: { present: number[]; status: string; meaning: string };
      emotionalPlane: { present: number[]; status: string; meaning: string };
      practicalPlane: { present: number[]; status: string; meaning: string };
      thoughtPlane: { present: number[]; status: string; meaning: string };
      willPlane: { present: number[]; status: string; meaning: string };
      actionPlane: { present: number[]; status: string; meaning: string };
      goldenYoga: boolean; // 8-5-2
      silverYoga: boolean; // 4-5-6
    };
    detectedArrowsOfStrength: LoShuArrowDetail[];
    detectedArrowsOfWeakness: LoShuArrowDetail[];
  };
  missingNumberRemedies: Array<{
    missingNumber: number;
    governingPlanet: string;
    element: string;
    yantra: string;
    crystal: string;
    color: string;
    deity: string;
    gemstoneImage: string;
    yantraImage: string;
    remedyText: string;
    detailedData?: any;
  }>;
  repeatedNumberInsights: Array<{
    number: number;
    count: number;
    detailedData?: any;
  }>;
  pinnaclesAndChallenges: any;
  masterAndKarmicDetails: {
    masterDetails: MasterNumberDetail[];
    karmicDetails: KarmicDebtDetail[];
  };
  chakraBalancing: {
    primaryChakraToBalance: string;
    chakraDetails: any;
    remedySteps: string[];
  };
  birthMonthAnalysis: {
    monthName: string;
    monthIndex: number;
    data: BirthMonthInfo;
  };
  forecastData: {
    personalYear: number;
    personalMonth: number;
    threeYearOutlook: Array<{ year: number; py: number; summary: string }>;
  };
  recommendedYantras: typeof SACRED_YANTRAS_GALLERY;
}

export function generateAdvanceNumerologyReport(
  fullNameOrInputs: string | AdvancedReportInputs,
  dobArg?: string, // YYYY-MM-DD
  genderArg: "male" | "female" | "other" = "male",
  birthTimeArg?: string,
  birthLocationArg?: string,
  extendedArgs?: Partial<AdvancedReportInputs>
): AdvancedReportData {
  let fullName: string;
  let dob: string;
  let gender: "male" | "female" | "other";
  let birthTime: string | undefined;
  let birthLocation: string | undefined;
  let primaryMobile: string | undefined;
  let secondaryMobile: string | undefined;
  let currentSignatureName: string | undefined;
  let nickname: string | undefined;
  let businessName: string | undefined;
  let houseNumber: string | undefined;
  let partnerName: string | undefined;
  let partnerDob: string | undefined;
  let motherName: string | undefined;
  let fatherName: string | undefined;

  if (typeof fullNameOrInputs === "object" && fullNameOrInputs !== null) {
    fullName = fullNameOrInputs.fullName || "Aarav Sharma";
    dob = fullNameOrInputs.dob || "1992-08-15";
    gender = fullNameOrInputs.gender || "male";
    birthTime = fullNameOrInputs.birthTime;
    birthLocation = fullNameOrInputs.birthLocation;
    primaryMobile = fullNameOrInputs.primaryMobile;
    secondaryMobile = fullNameOrInputs.secondaryMobile;
    currentSignatureName = fullNameOrInputs.currentSignatureName;
    nickname = fullNameOrInputs.nickname;
    businessName = fullNameOrInputs.businessName;
    houseNumber = fullNameOrInputs.houseNumber;
    partnerName = fullNameOrInputs.partnerName;
    partnerDob = fullNameOrInputs.partnerDob;
    motherName = fullNameOrInputs.motherName;
    fatherName = fullNameOrInputs.fatherName;
  } else {
    fullName = (typeof fullNameOrInputs === "string" ? fullNameOrInputs : "") || "Aarav Sharma";
    dob = dobArg || "1992-08-15";
    gender = genderArg || "male";
    birthTime = birthTimeArg;
    birthLocation = birthLocationArg;
    primaryMobile = extendedArgs?.primaryMobile;
    secondaryMobile = extendedArgs?.secondaryMobile;
    currentSignatureName = extendedArgs?.currentSignatureName;
    nickname = extendedArgs?.nickname;
    businessName = extendedArgs?.businessName;
    houseNumber = extendedArgs?.houseNumber;
    partnerName = extendedArgs?.partnerName;
    partnerDob = extendedArgs?.partnerDob;
    motherName = extendedArgs?.motherName;
    fatherName = extendedArgs?.fatherName;
  }

  const driverRes = calculateDriverNumber(dob);
  const conductorRes = calculateConductorNumber(dob);

  const parts = dob.split("-");
  const year = parseInt(parts[0] || "1990", 10);
  const month = parseInt(parts[1] || "1", 10);
  const day = parseInt(parts[2] || "1", 10);

  const kuaRes = calculateKuaNumber(year, gender === "female" ? "female" : "male");

  const driverNum = driverRes.driver;
  const conductorNum = conductorRes.conductor;

  const driverAnalysis = NUMBER_ANALYSIS_DATABASE[driverNum] || NUMBER_ANALYSIS_DATABASE[1];
  const conductorAnalysis = NUMBER_ANALYSIS_DATABASE[conductorNum] || NUMBER_ANALYSIS_DATABASE[1];

  // Birth Number 1-31 analysis
  const birthNumberAnalysis = getBirthNumberDetail(day);

  // 81 Combination Driver-Conductor Analysis
  const combination81Analysis = get81Combination(driverNum, conductorNum);

  // Name numbers: Expression, Soul Urge, Personality
  const { expNum, soulNum, persNum } = calculateNameNumbers(fullName || "Valued Client");
  const expressionAnalysis = getExpressionNumberAnalysis(expNum);
  const soulUrgeAnalysis = getSoulUrgeAnalysis(soulNum);
  const personalityAnalysis = getPersonalityAnalysis(persNum);
  const innerDreamAnalysis = getInnerDreamAnalysis(persNum);

  // Pinnacles and Challenges
  const pinnaclesAndChallenges = calculatePinnaclesAndChallenges(dob);

  // Planetary assets based on Driver Number
  const planetAsset: PlanetAsset = PLANETARY_ASSETS[driverNum] || PLANETARY_ASSETS[1];

  // Lo Shu Grid digit extraction
  const cleanDigits = dob.replace(/[^0-9]/g, "");
  const digitCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

  for (const char of cleanDigits) {
    const digit = parseInt(char, 10);
    if (digit >= 1 && digit <= 9) {
      digitCounts[digit] = (digitCounts[digit] || 0) + 1;
    }
  }

  // Include driver and conductor in Lo Shu
  digitCounts[driverNum] = (digitCounts[driverNum] || 0) + 1;
  digitCounts[conductorNum] = (digitCounts[conductorNum] || 0) + 1;

  const presentNumbers: number[] = [];
  const missingNumbers: number[] = [];
  const repeatedNumbers: number[] = [];

  for (let i = 1; i <= 9; i++) {
    if (digitCounts[i] > 0) {
      presentNumbers.push(i);
      if (digitCounts[i] > 1) repeatedNumbers.push(i);
    } else {
      missingNumbers.push(i);
    }
  }

  // Matrix order:
  // [4, 9, 2]
  // [3, 5, 7]
  // [8, 1, 6]
  const gridMatrix = [
    [digitCounts[4] > 0 ? 4 : null, digitCounts[9] > 0 ? 9 : null, digitCounts[2] > 0 ? 2 : null],
    [digitCounts[3] > 0 ? 3 : null, digitCounts[5] > 0 ? 5 : null, digitCounts[7] > 0 ? 7 : null],
    [digitCounts[8] > 0 ? 8 : null, digitCounts[1] > 0 ? 1 : null, digitCounts[6] > 0 ? 6 : null]
  ];

  // Planes
  const mentalPlanePresent = [4, 9, 2].filter((n) => digitCounts[n] > 0);
  const emotionalPlanePresent = [3, 5, 7].filter((n) => digitCounts[n] > 0);
  const practicalPlanePresent = [8, 1, 6].filter((n) => digitCounts[n] > 0);

  const thoughtPlanePresent = [4, 3, 8].filter((n) => digitCounts[n] > 0);
  const willPlanePresent = [9, 5, 1].filter((n) => digitCounts[n] > 0);
  const actionPlanePresent = [2, 7, 6].filter((n) => digitCounts[n] > 0);

  const goldenYoga = digitCounts[8] > 0 && digitCounts[5] > 0 && digitCounts[2] > 0;
  const silverYoga = digitCounts[4] > 0 && digitCounts[5] > 0 && digitCounts[6] > 0;

  // Detect Arrows of Strength & Weakness
  const detectedArrowsOfStrength = ARROWS_OF_STRENGTH_DATA.filter((arrow) =>
    arrow.positions.every((pos) => digitCounts[pos] > 0)
  );

  const detectedArrowsOfWeakness = ARROWS_OF_WEAKNESS_DATA.filter((arrow) =>
    arrow.positions.every((pos) => digitCounts[pos] === 0)
  );

  // Missing remedies
  const missingNumberRemedies = missingNumbers.map((mNum) => {
    const asset = PLANETARY_ASSETS[mNum] || PLANETARY_ASSETS[1];
    const detailedData = MISSING_NUMBERS_DATA[mNum];
    return {
      missingNumber: mNum,
      governingPlanet: asset.planetName,
      element: asset.sanskritName,
      yantra: asset.yantraName,
      crystal: asset.crystalName,
      color: asset.colorHex,
      deity: asset.deity,
      gemstoneImage: asset.crystalImageUrl,
      yantraImage: asset.yantraImageUrl,
      remedyText: `To fill the missing energy of Number ${mNum} (${asset.planetName}), wear or place ${asset.crystalName}, meditate with ${asset.yantraName}, and chant "${asset.mantra}" on auspicious mornings.`,
      detailedData
    };
  });

  // Repeated number insights
  const repeatedNumberInsights = repeatedNumbers.map((rNum) => {
    return {
      number: rNum,
      count: digitCounts[rNum],
      detailedData: REPEATED_NUMBERS_DATA[rNum]
    };
  });

  // Chakra
  const targetChakraData = DETAILED_CHAKRA_BALANCING_DATA.find((c) => c.chakraNumber === (missingNumbers[0] || driverNum)) || DETAILED_CHAKRA_BALANCING_DATA[0];

  // Birth Month
  const monthData = BIRTH_MONTH_DATA.find((bm) => bm.monthIndex === month) || BIRTH_MONTH_DATA[0];

  // Personal Year Calculation
  const currentYear = new Date().getFullYear();
  let pySum = day + month + (currentYear % 100) + Math.floor(currentYear / 100);
  let py = pySum;
  while (py > 9) {
    py = String(py).split("").map(Number).reduce((a, b) => a + b, 0);
  }

  const currentMonth = new Date().getMonth() + 1;
  let pm = py + currentMonth;
  while (pm > 9) {
    pm = String(pm).split("").map(Number).reduce((a, b) => a + b, 0);
  }

  const threeYearOutlook = [0, 1, 2].map((offset) => {
    const y = currentYear + offset;
    let p = day + month + (y % 100) + Math.floor(y / 100);
    while (p > 9) p = String(p).split("").map(Number).reduce((a, b) => a + b, 0);
    return {
      year: y,
      py: p,
      summary: `Personal Year ${p} indicates a cycle of ${
        p === 1 ? "New Beginnings & Leadership" : p === 2 ? "Relationships & Diplomacy" : p === 3 ? "Creative Expansion & Joy" : p === 4 ? "Solid Foundation & Hard Work" : p === 5 ? "Transformation & Freedom" : p === 6 ? "Family Harmony & Responsibility" : p === 7 ? "Inner Reflection & Wisdom" : p === 8 ? "Financial Power & Karma" : "Completion & Universal Service"
      }.`
    };
  });

  // Master & Karmic Debts check
  const masterNumbersFound: number[] = [];
  if (day === 11 || day === 22 || day === 33) masterNumbersFound.push(day);
  if (driverNum === 11 || driverNum === 22 || driverNum === 33) masterNumbersFound.push(driverNum);

  const karmicDebtsFound: number[] = [];
  if ([13, 14, 16, 19].includes(day)) karmicDebtsFound.push(day);

  const masterDetails: MasterNumberDetail[] = masterNumbersFound
    .map((mn) => getMasterNumberDetail(mn))
    .filter((d): d is MasterNumberDetail => d !== undefined);

  const karmicDetails: KarmicDebtDetail[] = karmicDebtsFound
    .map((kd) => getKarmicDebtDetail(`${kd}/${kd === 13 ? 4 : kd === 14 ? 5 : kd === 16 ? 7 : 1}`))
    .filter((d): d is KarmicDebtDetail => d !== undefined);

  // ========================================================
  // EXTENDED INPUT CALCULATIONS
  // ========================================================

  const RULING_PLANET_MAP: Record<number, string> = {
    1: "Sun (Surya)", 2: "Moon (Chandra)", 3: "Jupiter (Brihaspati)", 4: "Rahu (North Node)",
    5: "Mercury (Budha)", 6: "Venus (Shukra)", 7: "Ketu (South Node)", 8: "Saturn (Shani)", 9: "Mars (Mangal)"
  };

  function analyzeMobileNumber(rawNum: string, fallbackDefault: string): MobileAnalysisDetail {
    const digits = (rawNum || fallbackDefault).replace(/[^0-9]/g, "");
    let sum = 0;
    for (const d of digits) sum += parseInt(d, 10);
    const single = reduceSimple(sum) || 5;
    const planet = RULING_PLANET_MAP[single] || "Mercury (Budha)";

    let status: "Harmonious" | "Neutral" | "Challenging" = "Harmonious";
    if (single === driverNum || single === conductorNum || [1, 3, 5, 6].includes(single)) {
      status = "Harmonious";
    } else if ([4, 8].includes(single) && (driverNum === 1 || driverNum === 2 || driverNum === 9)) {
      status = "Challenging";
    } else {
      status = "Neutral";
    }

    const suitabilityMap: Record<number, string> = {
      1: "Ideal for CEOs, Founders, Political Leaders & Government Executives. Radiates commanding authority.",
      2: "Ideal for Counselors, Diplomats, Healers, Public Relations & Creative Mediators.",
      3: "Superb for Teachers, Mentors, Corporate Trainers, Legal Consultants & Authors.",
      4: "Suited for Engineers, System Architects, Technical Researchers & Disruptive Inventors.",
      5: "Prime Business & Trade Number! Magnetizes high client calls, sales velocity, travel & networking.",
      6: "Supreme Luxury & Brand Number. Attracts high-ticket clients, glamour, hospitality & arts.",
      7: "Ideal for Researchers, Occultists, Spiritual Mentors, Data Analysts & Philosophers.",
      8: "Powerful for Real Estate Tycoons, Industrialists, Heavy Finance & Judicial Authorities.",
      9: "Suited for Defense Leaders, Surgeons, Sports Champions & Philanthropic Executives."
    };

    const resonance = `Compound sum ${sum} reduces to Root ${single} ruled by ${planet}. ${status === "Harmonious" ? "Highly aligned with native's cosmic vibration." : status === "Challenging" ? "Vibrational friction detected; recommend keeping calls structured and deliberate." : "Balanced neutral frequency."}`;

    return {
      number: rawNum || fallbackDefault,
      compound: sum,
      single,
      planet,
      status,
      resonance,
      suitability: suitabilityMap[single] || suitabilityMap[5]
    };
  }

  const primaryMobileAnalysis = analyzeMobileNumber(primaryMobile || "9876543210", "9876543210");
  const secondaryMobileAnalysis = secondaryMobile ? analyzeMobileNumber(secondaryMobile, "") : undefined;

  // Name & Signature Calibration
  const sigName = currentSignatureName || fullName;
  const { expNum: sigExp } = calculateNameNumbers(sigName);
  
  // Pythagorean sum for signature
  let pythSum = 0;
  for (const char of sigName.toUpperCase().replace(/[^A-Z]/g, "")) {
    const code = char.charCodeAt(0) - 64;
    pythSum += ((code - 1) % 9) + 1;
  }
  const pythSingle = reduceSimple(pythSum);

  let sigResonanceScore = 75;
  if (sigExp === driverNum || sigExp === conductorNum) sigResonanceScore += 18;
  if ([1, 3, 5, 6].includes(sigExp)) sigResonanceScore += 7;
  sigResonanceScore = Math.min(99, sigResonanceScore);

  let nicknameObj = undefined;
  if (nickname) {
    const { expNum: nickExp } = calculateNameNumbers(nickname);
    let nickPyth = 0;
    for (const char of nickname.toUpperCase().replace(/[^A-Z]/g, "")) {
      const code = char.charCodeAt(0) - 64;
      nickPyth += ((code - 1) % 9) + 1;
    }
    nicknameObj = {
      nickname,
      chaldeanSingle: nickExp,
      pythagoreanSingle: reduceSimple(nickPyth),
      auraImpact: `Calls upon Root ${nickExp} (${RULING_PLANET_MAP[nickExp] || "Mercury"}). Radiates spontaneous warmth and relaxed social intimacy in casual circles.`
    };
  }

  const nameSignatureAnalysis = {
    currentSignatureName: sigName,
    chaldeanCompound: sigExp,
    chaldeanSingle: sigExp,
    pythagoreanSingle: pythSingle,
    harmonyWithBirthChart: sigResonanceScore >= 85 ? "Supremely Harmonious & Empowering" : sigResonanceScore >= 75 ? "Auspicious & Supportive" : "Moderate — Subtle Tuning Recommended",
    resonanceScore: sigResonanceScore,
    signatureGuidance: "Execute your signature with an ascending angle of 35° to 45° moving upwards towards the top-right. Never strike through or underline through letters. Place a solid, unbroken underline underneath ending with two upward confidence dots.",
    nicknameAnalysis: nicknameObj
  };

  // Business & House Space Numerology
  let businessObj = undefined;
  if (businessName) {
    const { expNum: bizExp } = calculateNameNumbers(businessName);
    const bizProsperityIndex = [1, 5, 6, 3].includes(bizExp) ? 94 : [9, 2, 7].includes(bizExp) ? 86 : 80;
    businessObj = {
      businessName,
      chaldeanCompound: bizExp,
      chaldeanSingle: bizExp,
      prosperityGrade: bizProsperityIndex >= 90 ? "Grade AAA (Lucrative Commercial Resonance)" : "Grade AA+ (Solid Foundation)",
      financialProsperityIndex: bizProsperityIndex,
      commercialVibe: `Vibrates with Root ${bizExp} (${RULING_PLANET_MAP[bizExp]}). Magnifies brand prestige, ethical goodwill, and sustainable cash-flow momentum.`
    };
  }

  let houseObj = undefined;
  if (houseNumber) {
    const houseDigits = houseNumber.replace(/[^0-9]/g, "");
    let hSum = 0;
    if (houseDigits.length > 0) {
      for (const d of houseDigits) hSum += parseInt(d, 10);
    } else {
      const { expNum: hExp } = calculateNameNumbers(houseNumber);
      hSum = hExp;
    }
    const hSingle = reduceSimple(hSum) || 1;
    houseObj = {
      houseNumber,
      compound: hSum,
      single: hSingle,
      vastuVibe: `Vibrates at Root ${hSingle} (${RULING_PLANET_MAP[hSingle]}). Creates an energetically vibrant sanctuary fostering mental peace, family cohesion, and protective grounding.`,
      domesticHarmonyScore: 88,
      recommendedRemedy: hSingle === 4 || hSingle === 8 ? "Place a sacred brass Swastika or Shri Yantra at the foyer to amplify positive prana." : "Keep the primary foyer brightly illuminated with warm lights and live jade/money plants."
    };
  }

  // Partner Compatibility Analysis
  let partnerCompObj = undefined;
  if (partnerName && partnerDob) {
    const pDriver = calculateDriverNumber(partnerDob).driver;
    const pConductor = calculateConductorNumber(partnerDob).conductor;
    
    // Calculate synergy score
    let synScore = 72;
    if (driverNum === pDriver) synScore += 10;
    else if ((driverNum === 1 && [3, 5, 9].includes(pDriver)) ||
             (driverNum === 2 && [1, 3].includes(pDriver)) ||
             (driverNum === 3 && [1, 2, 9].includes(pDriver)) ||
             (driverNum === 5 && [1, 6].includes(pDriver)) ||
             (driverNum === 6 && [5, 7].includes(pDriver))) {
      synScore += 14;
    }
    if (conductorNum === pConductor || [1, 3, 5, 6].includes(pConductor)) synScore += 10;
    synScore = Math.min(98, synScore);

    partnerCompObj = {
      partnerName,
      partnerDob,
      partnerDriver: pDriver,
      partnerConductor: pConductor,
      synergyScore: synScore,
      marriageCompatibility: synScore >= 85 ? "High Celestial Synergy (Natural Emotional & Spiritual Accord)" : "Complementary Dynamic (Growth Through Mutual Respect)",
      businessPartnershipSynergy: synScore >= 80 ? "Highly Auspicious for Joint Enterprise, Contracts & Asset Growth" : "Stable Partnership (Ensure Explicit Legal Roles)",
      karmicBondAnalysis: `Native (Driver ${driverNum} / Conductor ${conductorNum}) and Partner (Driver ${pDriver} / Conductor ${pConductor}) share a ${synScore}% harmonic quotient. The planetary rulers (${RULING_PLANET_MAP[driverNum]} & ${RULING_PLANET_MAP[pDriver]}) blend constructive action with mutual evolutionary lessons.`
    };
  }

  // Ancestral Karma Lineage Analysis
  let ancestralObj = undefined;
  if (motherName || fatherName) {
    let maternalVibe = undefined;
    if (motherName) {
      const { expNum: mExp } = calculateNameNumbers(motherName);
      maternalVibe = {
        name: motherName,
        chaldeanSingle: mExp,
        planet: RULING_PLANET_MAP[mExp] || "Moon (Chandra)",
        karmicAttribute: "Maternal Subconscious Matrix & Emotional Intuition",
        inheritedInstincts: `Inherited vibrational blueprint carries Root ${mExp} frequencies of emotional resilience, nurturing wisdom, and psychic sensitivity.`
      };
    }

    let paternalVibe = undefined;
    if (fatherName) {
      const { expNum: fExp } = calculateNameNumbers(fatherName);
      paternalVibe = {
        name: fatherName,
        chaldeanSingle: fExp,
        planet: RULING_PLANET_MAP[fExp] || "Sun (Surya)",
        karmicAttribute: "Paternal Dharmic Code & Ancestral Fortitude",
        inheritedDharmicPath: `Inherited vibrational blueprint carries Root ${fExp} frequencies of willpower, structural ambition, and ancestral prosperity ethics.`
      };
    }

    ancestralObj = {
      motherName,
      fatherName,
      maternalLineageVibration: maternalVibe,
      paternalLineageVibration: paternalVibe,
      ancestralSynthesis: `The sacred union of ancestral streams provides the native with both intuitive guidance and executive discipline, resolving past-life genetic debts into active dharmic leadership.`
    };
  }

  return {
    clientInfo: {
      fullName: fullName || "Valued Client",
      dob: dob || "1990-01-01",
      gender,
      birthTime,
      birthLocation,
      reportGeneratedAt: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }),
      reportId: `ANR-${Math.floor(100000 + Math.random() * 900000)}`,
      primaryMobile,
      secondaryMobile,
      currentSignatureName,
      nickname,
      businessName,
      houseNumber,
      partnerName,
      partnerDob,
      motherName,
      fatherName
    },
    extendedInputsAnalysis: {
      mobileAnalysis: {
        primary: primaryMobileAnalysis,
        secondary: secondaryMobileAnalysis
      },
      nameSignatureAnalysis,
      spaceAndBusinessAnalysis: {
        business: businessObj,
        house: houseObj
      },
      partnerCompatibility: partnerCompObj,
      ancestralKarmaLineage: ancestralObj
    },
    coreCalculations: {
      driverNumber: driverNum,
      conductorNumber: conductorNum,
      kuaNumber: kuaRes.kuaNumber,
      kuaDetails: kuaRes,
      driverAnalysis,
      conductorAnalysis,
      masterNumbersFound,
      karmicDebtsFound
    },
    birthNumberAnalysis,
    combination81Analysis,
    soulUrgeAnalysis,
    expressionAnalysis,
    personalityAnalysis,
    innerDreamAnalysis,
    pinnaclesAndChallenges,
    masterAndKarmicDetails: {
      masterDetails,
      karmicDetails
    },
    planetaryDetails: {
      rulingPlanet: planetAsset.planetName,
      rulingDeity: planetAsset.deity,
      deityTitle: planetAsset.deityTitle,
      deityImageUrl: planetAsset.deityImageUrl,
      planetImageUrl: planetAsset.planetImageUrl,
      yantraName: planetAsset.yantraName,
      yantraImageUrl: planetAsset.yantraImageUrl,
      crystalName: planetAsset.crystalName,
      crystalImageUrl: planetAsset.crystalImageUrl,
      chakraName: planetAsset.chakraName,
      chakraImageUrl: planetAsset.chakraImageUrl,
      mantra: planetAsset.mantra
    },
    loShuGrid: {
      gridMatrix,
      counts: digitCounts,
      missingNumbers,
      repeatedNumbers,
      presentNumbers,
      planes: {
        mentalPlane: {
          present: mentalPlanePresent,
          status: mentalPlanePresent.length === 3 ? "Full Plane Active (Exceptional Memory & Intellectual Depth)" : `${mentalPlanePresent.length}/3 Active`,
          meaning: "Governs cognitive focus, analytical problem solving, and long-term memory strength."
        },
        emotionalPlane: {
          present: emotionalPlanePresent,
          status: emotionalPlanePresent.length === 3 ? "Full Plane Active (High Empathy & Spiritual Perception)" : `${emotionalPlanePresent.length}/3 Active`,
          meaning: "Governs emotional intelligence, heart-centered intuition, and artistic expression."
        },
        practicalPlane: {
          present: practicalPlanePresent,
          status: practicalPlanePresent.length === 3 ? "Full Plane Active (Ground-level Execution & Business Mastery)" : `${practicalPlanePresent.length}/3 Active`,
          meaning: "Governs physical execution, real estate affinity, and money management."
        },
        thoughtPlane: {
          present: thoughtPlanePresent,
          status: thoughtPlanePresent.length === 3 ? "Full Plane Active (Visionary Strategic Planner)" : `${thoughtPlanePresent.length}/3 Active`,
          meaning: "Ability to conceive original visions before taking physical action."
        },
        willPlane: {
          present: willPlanePresent,
          status: willPlanePresent.length === 3 ? "Full Plane Active (Unstoppable Willpower & Determination)" : `${willPlanePresent.length}/3 Active`,
          meaning: "Steadfast determination that pushes past all temporary obstacles."
        },
        actionPlane: {
          present: actionPlanePresent,
          status: actionPlanePresent.length === 3 ? "Full Plane Active (Instant Execution & High Energy)" : `${actionPlanePresent.length}/3 Active`,
          meaning: "Translates thoughts immediately into physical real-world outcomes."
        },
        goldenYoga,
        silverYoga
      },
      detectedArrowsOfStrength,
      detectedArrowsOfWeakness
    },
    missingNumberRemedies,
    repeatedNumberInsights,
    chakraBalancing: {
      primaryChakraToBalance: `${targetChakraData.sanskritName} (${targetChakraData.englishName})`,
      chakraDetails: targetChakraData,
      remedySteps: [
        `Align energy with ${targetChakraData.sanskritName} (${targetChakraData.englishName}) located at ${targetChakraData.location}.`,
        `Primary Planetary Rulers: ${targetChakraData.primaryPlanets} (${targetChakraData.numbers}).`,
        `Focus color therapy with ${targetChakraData.colorName}.`,
        `Practice daily affirmations and remedies for primary chakra balancing.`
      ]
    },
    birthMonthAnalysis: {
      monthName: monthData.monthName,
      monthIndex: monthData.monthIndex,
      data: monthData
    },
    forecastData: {
      personalYear: py,
      personalMonth: pm,
      threeYearOutlook
    },
    recommendedYantras: SACRED_YANTRAS_GALLERY
  };
}
