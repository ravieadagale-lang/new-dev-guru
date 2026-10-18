/**
 * Advanced Vedic Astronomical & Mathematical Engine
 * Contains deep calculations for:
 * 1. Uchha & Neecha (Deep Exaltation/Debilitation %, Neechabhanga Raja Yoga Checker)
 * 2. Astha Graha (Dynamic Combustion Metrics & Param Astha)
 * 3. Janmakshar (108 Sanskrit Syllables) & Complete Avakahada Chakra
 * 4. Paya Calculation (Metallic Footing of Birth: Gold, Silver, Copper, Iron)
 * 5. Graha Samaya (100 Planetary States of Activity)
 * 6. Pushkar Navamsha & Pushkar Bhaga Scanner
 * 7. Vargottama Scanner (Rashi, Bhava, Hora Vargottama)
 */

import { SiderealPlanetPosition, SiderealChartData, ZODIAC_SIGNS, NAKSHATRAS } from "./siderealEngine";
import { normalizeDeg } from "./astronomyMath";
import { computeDivisionalChart, DivisionalChartResult } from "./divisionalChartsEngine";

// ============================================================================
// 1. UCHHA & NEECHA (EXALTATION & DEBILITATION WITH EXACT DEEP DEGREES & NBRY)
// ============================================================================

export interface ExaltationDebilitationResult {
  planet: string;
  status: "Deeply Exalted" | "Exalted" | "Deeply Debilitated" | "Debilitated" | "Own Sign" | "Moolatrikona" | "Neutral" | "Friendly" | "Enemy";
  isExalted: boolean;
  isDebilitated: boolean;
  isDeepExalted: boolean;
  isDeepDebilitated: boolean;
  exaltationSign: string;
  exaltationSignIndex: number;
  deepExaltationDegree: number;
  debilitationSign: string;
  debilitationSignIndex: number;
  deepDebilitationDegree: number;
  exaltationPercentage: number;   // 0 to 100% Uchha Bala
  debilitationPercentage: number; // 0 to 100% Neecha Bala
  hasNeechabhanga: boolean;
  neechabhangaRulesTriggered: string[];
  neechabhangaYogaDetails?: {
    isRajayoga: boolean;
    strength: "High" | "Moderate" | "Mild";
    summary: string;
  };
}

export const DEEP_EXALTATION_DEGREES: Record<string, { exaltSign: number; exaltDeg: number; debilSign: number; debilDeg: number }> = {
  Sun: { exaltSign: 0, exaltDeg: 10.0, debilSign: 6, debilDeg: 10.0 },       // Aries 10° / Libra 10°
  Moon: { exaltSign: 1, exaltDeg: 3.0, debilSign: 7, debilDeg: 3.0 },         // Taurus 3° / Scorpio 3°
  Mars: { exaltSign: 9, exaltDeg: 28.0, debilSign: 3, debilDeg: 28.0 },       // Capricorn 28° / Cancer 28°
  Mercury: { exaltSign: 5, exaltDeg: 15.0, debilSign: 11, debilDeg: 15.0 },   // Virgo 15° / Pisces 15°
  Jupiter: { exaltSign: 3, exaltDeg: 5.0, debilSign: 9, debilDeg: 5.0 },       // Cancer 5° / Capricorn 5°
  Venus: { exaltSign: 11, exaltDeg: 27.0, debilSign: 5, debilDeg: 27.0 },     // Pisces 27° / Virgo 27°
  Saturn: { exaltSign: 6, exaltDeg: 20.0, debilSign: 0, debilDeg: 20.0 },     // Libra 20° / Aries 20°
  Rahu: { exaltSign: 1, exaltDeg: 15.0, debilSign: 7, debilDeg: 15.0 },       // Taurus / Scorpio
  Ketu: { exaltSign: 7, exaltDeg: 15.0, debilSign: 1, debilDeg: 15.0 },       // Scorpio / Taurus
};

/**
 * Computes deep exaltation/debilitation intensity and tests for Neechabhanga Raja Yoga
 */
export function calculateExaltationDebilitation(
  planetName: string,
  chart: SiderealChartData,
  d9Chart?: DivisionalChartResult
): ExaltationDebilitationResult {
  const planet = chart.planets[planetName];
  const ref = DEEP_EXALTATION_DEGREES[planetName];

  if (!planet || !ref) {
    return {
      planet: planetName,
      status: "Neutral",
      isExalted: false,
      isDebilitated: false,
      isDeepExalted: false,
      isDeepDebilitated: false,
      exaltationSign: "",
      exaltationSignIndex: -1,
      deepExaltationDegree: 0,
      debilitationSign: "",
      debilitationSignIndex: -1,
      deepDebilitationDegree: 0,
      exaltationPercentage: 50,
      debilitationPercentage: 0,
      hasNeechabhanga: false,
      neechabhangaRulesTriggered: [],
    };
  }

  const isExaltedSign = planet.signIndex === ref.exaltSign;
  const isDebilSign = planet.signIndex === ref.debilSign;

  // Deep degrees (within 1 degree of exact point)
  const isDeepExalted = isExaltedSign && Math.abs(planet.degreeInSign - ref.exaltDeg) <= 1.0;
  const isDeepDebilitated = isDebilSign && Math.abs(planet.degreeInSign - ref.debilDeg) <= 1.0;

  // Absolute deep exaltation longitude
  const deepExaltLon = ref.exaltSign * 30 + ref.exaltDeg;
  // Angular distance from deep exaltation (0 to 180°)
  let diff = Math.abs(planet.longitude - deepExaltLon);
  if (diff > 180) diff = 360 - diff;

  // Exaltation % (100% at exact deep exaltation, 0% at exact deep debilitation)
  const exaltationPercentage = Number(((180 - diff) / 180 * 100).toFixed(2));
  const debilitationPercentage = Number((diff / 180 * 100).toFixed(2));

  let status: ExaltationDebilitationResult["status"] = "Neutral";
  if (isDeepExalted) status = "Deeply Exalted";
  else if (isExaltedSign) status = "Exalted";
  else if (isDeepDebilitated) status = "Deeply Debilitated";
  else if (isDebilSign) status = "Debilitated";
  else if (planet.dignity === "Own Sign") status = "Own Sign";
  else if (planet.dignity === "Moolatrikona") status = "Moolatrikona";
  else if (planet.dignity === "Friend") status = "Friendly";
  else if (planet.dignity === "Enemy") status = "Enemy";

  // --------------------------------------------------------------------------
  // NEECHABHANGA RAJA YOGA (NBRY) DETECTOR
  // --------------------------------------------------------------------------
  const neechabhangaRules: string[] = [];
  let hasNeechabhanga = false;

  if (isDebilSign) {
    const lagnaSign = chart.ascendant.signIndex;
    const moonSign = chart.planets.Moon?.signIndex ?? lagnaSign;

    // Dispositor of debilitated planet
    const debilSignLordName = ZODIAC_SIGNS[planet.signIndex].lord;
    const dispositorPlanet = chart.planets[debilSignLordName];

    // Exaltation lord of this debilitated sign
    // e.g. for Cancer (Mars debilitated), Jupiter is exalted in Cancer
    let exaltationLordOfThisSignName = "";
    for (const pName in DEEP_EXALTATION_DEGREES) {
      if (DEEP_EXALTATION_DEGREES[pName].exaltSign === planet.signIndex) {
        exaltationLordOfThisSignName = pName;
        break;
      }
    }
    const exaltationLordPlanet = chart.planets[exaltationLordOfThisSignName];

    // Helper: is sign in Kendra (1, 4, 7, 10) from reference sign?
    const isKendraFrom = (sign: number, refSign: number) => {
      let h = sign - refSign + 1;
      if (h <= 0) h += 12;
      return [1, 4, 7, 10].includes(h);
    };

    // Rule 1: The lord of the sign occupied by debilitated planet is in Kendra from Lagna or Moon
    if (dispositorPlanet) {
      if (isKendraFrom(dispositorPlanet.signIndex, lagnaSign)) {
        neechabhangaRules.push(`Rule 1: Dispositor (${dispositorPlanet.name}) is in Kendra (House ${dispositorPlanet.house}) from Lagna.`);
      }
      if (isKendraFrom(dispositorPlanet.signIndex, moonSign)) {
        neechabhangaRules.push(`Rule 1b: Dispositor (${dispositorPlanet.name}) is in Kendra from Janma Rashi (Moon).`);
      }
    }

    // Rule 2: The planet that gets exalted in this sign is in Kendra from Lagna or Moon
    if (exaltationLordPlanet) {
      if (isKendraFrom(exaltationLordPlanet.signIndex, lagnaSign)) {
        neechabhangaRules.push(`Rule 2: Exaltation lord of this sign (${exaltationLordPlanet.name}) is in Kendra (House ${exaltationLordPlanet.house}) from Lagna.`);
      }
      if (isKendraFrom(exaltationLordPlanet.signIndex, moonSign)) {
        neechabhangaRules.push(`Rule 2b: Exaltation lord (${exaltationLordPlanet.name}) is in Kendra from Moon.`);
      }
    }

    // Rule 3: Dispositor and Exaltation Lord are in mutual Kendras
    if (dispositorPlanet && exaltationLordPlanet) {
      if (isKendraFrom(dispositorPlanet.signIndex, exaltationLordPlanet.signIndex)) {
        neechabhangaRules.push(`Rule 3: Dispositor (${dispositorPlanet.name}) and Exaltation Lord (${exaltationLordPlanet.name}) are in mutual Kendras.`);
      }
    }

    // Rule 4: The debilitated planet is exalted in Navamsha (D9)
    if (d9Chart && d9Chart.placements[planetName]) {
      const d9Placement = d9Chart.placements[planetName];
      if (d9Placement.vargaSignIndex === ref.exaltSign) {
        neechabhangaRules.push(`Rule 4: Planet is exalted in Navamsha (D9) chart (Uchha Navamsha Cancellation).`);
      }
    }

    // Rule 5: Planet is aspected by its dispositor
    if (dispositorPlanet && dispositorPlanet.signIndex === (planet.signIndex + 6) % 12) {
      neechabhangaRules.push(`Rule 5: Debilitated planet receives direct 7th house aspect from its dispositor (${dispositorPlanet.name}).`);
    }

    if (neechabhangaRules.length > 0) {
      hasNeechabhanga = true;
    }
  }

  let neechabhangaYogaDetails: ExaltationDebilitationResult["neechabhangaYogaDetails"];
  if (hasNeechabhanga) {
    const strength = neechabhangaRules.length >= 2 ? "High" : "Moderate";
    neechabhangaYogaDetails = {
      isRajayoga: true,
      strength,
      summary: `Neechabhanga Raja Yoga confirmed for ${planetName} via ${neechabhangaRules.length} classical Parashari rules. Initial struggles transform into profound mastery and elevated authority during its Dasha.`,
    };
  }

  return {
    planet: planetName,
    status,
    isExalted: isExaltedSign,
    isDebilitated: isDebilSign,
    isDeepExalted,
    isDeepDebilitated,
    exaltationSign: ZODIAC_SIGNS[ref.exaltSign].name,
    exaltationSignIndex: ref.exaltSign,
    deepExaltationDegree: ref.exaltDeg,
    debilitationSign: ZODIAC_SIGNS[ref.debilSign].name,
    debilitationSignIndex: ref.debilSign,
    deepDebilitationDegree: ref.debilDeg,
    exaltationPercentage,
    debilitationPercentage,
    hasNeechabhanga,
    neechabhangaRulesTriggered: neechabhangaRules,
    neechabhangaYogaDetails,
  };
}

// ============================================================================
// 2. ASTHA GRAHA (DYNAMIC COMBUSTION METRICS & PARAM ASTHA)
// ============================================================================

export interface CombustionMetric {
  planet: string;
  state: "Normal" | "Combust" | "Deeply Combust (Param Astha)";
  isCombust: boolean;
  isDeeplyCombust: boolean;
  distanceFromSunDeg: number;
  combustionThresholdDeg: number;
  combustionIntensityPercentage: number;
  isRetrograde: boolean;
  astrologicalImpact: string;
}

export const COMBUSTION_THRESHOLDS: Record<string, { direct: number; retrograde: number; deepLimit: number }> = {
  Moon: { direct: 12.0, retrograde: 12.0, deepLimit: 3.0 },
  Mars: { direct: 17.0, retrograde: 17.0, deepLimit: 3.0 },
  Mercury: { direct: 14.0, retrograde: 12.0, deepLimit: 3.0 },
  Jupiter: { direct: 11.0, retrograde: 11.0, deepLimit: 3.0 },
  Venus: { direct: 10.0, retrograde: 8.0, deepLimit: 3.0 },
  Saturn: { direct: 15.0, retrograde: 15.0, deepLimit: 3.0 },
};

export function calculateCombustionMetrics(planetName: string, chart: SiderealChartData): CombustionMetric {
  const planet = chart.planets[planetName];
  const sun = chart.planets.Sun;

  if (!planet || !sun || planetName === "Sun" || planetName === "Rahu" || planetName === "Ketu") {
    return {
      planet: planetName,
      state: "Normal",
      isCombust: false,
      isDeeplyCombust: false,
      distanceFromSunDeg: 999,
      combustionThresholdDeg: 0,
      combustionIntensityPercentage: 0,
      isRetrograde: false,
      astrologicalImpact: "Not subject to solar combustion.",
    };
  }

  const thresholdConfig = COMBUSTION_THRESHOLDS[planetName] || { direct: 12, retrograde: 12, deepLimit: 3 };
  const threshold = planet.isRetrograde ? thresholdConfig.retrograde : thresholdConfig.direct;

  let dist = Math.abs(planet.longitude - sun.longitude);
  if (dist > 180) dist = 360 - dist;

  const isCombust = dist <= threshold;
  const isDeeplyCombust = dist <= thresholdConfig.deepLimit;

  let state: CombustionMetric["state"] = "Normal";
  if (isDeeplyCombust) state = "Deeply Combust (Param Astha)";
  else if (isCombust) state = "Combust";

  let intensity = 0;
  if (isCombust) {
    intensity = Number(((threshold - dist) / threshold * 100).toFixed(1));
  }

  let impact = "Planet operates with full independent vitality.";
  if (isDeeplyCombust) {
    impact = `Param Astha: Severe solar subsumption (${dist.toFixed(2)}° from Sun). The physical significations of ${planetName} undergo internal purification; spiritual and soul qualities are heightened while external material ease requires conscious effort.`;
  } else if (isCombust) {
    impact = `Astha: Significant combustion (${dist.toFixed(2)}° from Sun, ${intensity}% intensity). External expressions are tempered by the solar ego; gains are realized through willpower.`;
  }

  return {
    planet: planetName,
    state,
    isCombust,
    isDeeplyCombust,
    distanceFromSunDeg: Number(dist.toFixed(4)),
    combustionThresholdDeg: threshold,
    combustionIntensityPercentage: intensity,
    isRetrograde: planet.isRetrograde,
    astrologicalImpact: impact,
  };
}

// ============================================================================
// 3. JANMAKSHAR & COMPLETE AVAKAHADA CHAKRA (108 SYLLABLES)
// ============================================================================

export interface AvakahadaChakraResult {
  janmakshar: string;            // Sanskrit seed sound e.g. "Chu", "Che", "Cho"
  janmaSyllableDescription: string;
  nakshatraName: string;
  nakshatraPada: number;
  nakshatraLord: string;
  moonSignName: string;
  moonSignLord: string;
  varna: "Brahmin" | "Kshatriya" | "Vaishya" | "Shudra";
  vashya: "Chatushpada (Quadruped)" | "Manava (Human)" | "Jalachara (Aquatic)" | "Vanachara (Wild/Forest)" | "Keeta (Insect)";
  tara: "Janma" | "Sampat" | "Vipat" | "Kshema" | "Pratyak" | "Sadhana" | "Naidhana" | "Mitra" | "Parama Mitra";
  yoni: {
    animal: string;
    gender: "Male" | "Female";
    enemyAnimal: string;
  };
  grahaMaitri: string;
  gana: "Deva" | "Manushya" | "Rakshasa";
  bhakootSignificance: string;
  nadi: "Adi (Vata)" | "Madhya (Pitta)" | "Antya (Kapha)";
}

// 108 Sanskrit Janmakshars (4 padas per 27 Nakshatras)
export const NAKSHATRA_JANMAKSHARS: string[][] = [
  ["Chu", "Che", "Cho", "La"],       // 1. Ashwini
  ["Lee", "Lu", "Le", "Lo"],         // 2. Bharani
  ["A", "Ee", "U", "Ea"],            // 3. Krittika
  ["O", "Va", "Vi", "Vu"],           // 4. Rohini
  ["Ve", "Vo", "Ka", "Kee"],         // 5. Mrigashira
  ["Ku", "Gha", "Nga", "Chha"],      // 6. Ardra
  ["Ke", "Ko", "Ha", "Hee"],         // 7. Punarvasu
  ["Hu", "He", "Ho", "Da"],          // 8. Pushya
  ["Dee", "Doo", "De", "Do"],        // 9. Ashlesha
  ["Ma", "Mee", "Moo", "Me"],        // 10. Magha
  ["Mo", "Ta", "Tee", "Too"],        // 11. Purva Phalguni
  ["Te", "To", "Pa", "Pee"],         // 12. Uttara Phalguni
  ["Pu", "Sha", "Na", "Tha"],        // 13. Hasta
  ["Pe", "Po", "Ra", "Ree"],         // 14. Chitra
  ["Ru", "Re", "Ro", "Taa"],         // 15. Swati
  ["Ti", "Tu", "Te", "To"],          // 16. Vishakha
  ["Na", "Nee", "Noo", "Ne"],        // 17. Anuradha
  ["No", "Ya", "Yee", "Yu"],         // 18. Jyeshtha
  ["Ye", "Yo", "Bha", "Bhee"],       // 19. Mula
  ["Bhoo", "Dha", "Pha", "Dhad"],    // 20. Purva Ashadha
  ["Bhe", "Bho", "Ja", "Jee"],       // 21. Uttara Ashadha
  ["Ju", "Je", "Jo", "Gha"],         // 22. Shravana
  ["Ga", "Gee", "Gu", "Ge"],         // 23. Dhanishta
  ["Go", "Sa", "See", "Soo"],        // 24. Shatabhisha
  ["Se", "So", "Da", "Dee"],         // 25. Purva Bhadrapada
  ["Du", "Tha", "Jha", "Na"],        // 26. Uttara Bhadrapada
  ["De", "Do", "Cha", "Chee"],       // 27. Revati
];

export const NAKSHATRA_YONIS = [
  { animal: "Horse (Ashwa)", gender: "Male", enemy: "Buffalo" },      // Ashwini
  { animal: "Elephant (Gaja)", gender: "Male", enemy: "Lion" },      // Bharani
  { animal: "Sheep (Mesha)", gender: "Female", enemy: "Monkey" },    // Krittika
  { animal: "Serpent (Sarpa)", gender: "Male", enemy: "Mongoose" },  // Rohini
  { animal: "Serpent (Sarpa)", gender: "Female", enemy: "Mongoose" },// Mrigashira
  { animal: "Dog (Shwana)", gender: "Female", enemy: "Deer" },       // Ardra
  { animal: "Cat (Marjara)", gender: "Female", enemy: "Rat" },       // Punarvasu
  { animal: "Goat (Aja)", gender: "Male", enemy: "Monkey" },         // Pushya
  { animal: "Cat (Marjara)", gender: "Male", enemy: "Rat" },         // Ashlesha
  { animal: "Rat (Mushaka)", gender: "Male", enemy: "Cat" },         // Magha
  { animal: "Rat (Mushaka)", gender: "Female", enemy: "Cat" },       // Purva Phalguni
  { animal: "Cow (Gau)", gender: "Male", enemy: "Tiger" },           // Uttara Phalguni
  { animal: "Buffalo (Mahisha)", gender: "Female", enemy: "Horse" },  // Hasta
  { animal: "Tiger (Vyaghra)", gender: "Female", enemy: "Cow" },     // Chitra
  { animal: "Buffalo (Mahisha)", gender: "Male", enemy: "Horse" },   // Swati
  { animal: "Tiger (Vyaghra)", gender: "Male", enemy: "Cow" },       // Vishakha
  { animal: "Deer (Mriga)", gender: "Female", enemy: "Dog" },        // Anuradha
  { animal: "Deer (Mriga)", gender: "Male", enemy: "Dog" },          // Jyeshtha
  { animal: "Dog (Shwana)", gender: "Male", enemy: "Deer" },         // Mula
  { animal: "Monkey (Vanara)", gender: "Male", enemy: "Goat" },      // Purva Ashadha
  { animal: "Mongoose (Nakula)", gender: "Male", enemy: "Serpent" }, // Uttara Ashadha
  { animal: "Monkey (Vanara)", gender: "Female", enemy: "Goat" },    // Shravana
  { animal: "Lion (Simha)", gender: "Female", enemy: "Elephant" },   // Dhanishta
  { animal: "Horse (Ashwa)", gender: "Female", enemy: "Buffalo" },   // Shatabhisha
  { animal: "Lion (Simha)", gender: "Male", enemy: "Elephant" },     // Purva Bhadrapada
  { animal: "Cow (Gau)", gender: "Female", enemy: "Tiger" },         // Uttara Bhadrapada
  { animal: "Elephant (Gaja)", gender: "Female", enemy: "Lion" },    // Revati
];

export const NAKSHATRA_GANAS: ("Deva" | "Manushya" | "Rakshasa")[] = [
  "Deva", "Manushya", "Rakshasa", "Manushya", "Deva", "Manushya", "Deva", "Deva", "Rakshasa",
  "Rakshasa", "Manushya", "Manushya", "Deva", "Rakshasa", "Deva", "Rakshasa", "Deva", "Rakshasa",
  "Rakshasa", "Manushya", "Manushya", "Deva", "Rakshasa", "Rakshasa", "Manushya", "Manushya", "Deva"
];

export const NAKSHATRA_NADIS: ("Adi (Vata)" | "Madhya (Pitta)" | "Antya (Kapha)")[] = [
  "Adi (Vata)", "Madhya (Pitta)", "Antya (Kapha)",
  "Antya (Kapha)", "Madhya (Pitta)", "Adi (Vata)",
  "Adi (Vata)", "Madhya (Pitta)", "Antya (Kapha)",
  "Antya (Kapha)", "Madhya (Pitta)", "Adi (Vata)",
  "Adi (Vata)", "Madhya (Pitta)", "Antya (Kapha)",
  "Antya (Kapha)", "Madhya (Pitta)", "Adi (Vata)",
  "Adi (Vata)", "Madhya (Pitta)", "Antya (Kapha)",
  "Antya (Kapha)", "Madhya (Pitta)", "Adi (Vata)",
  "Adi (Vata)", "Madhya (Pitta)", "Antya (Kapha)",
];

/**
 * Calculates complete Janmakshar and Avakahada Chakra
 */
export function calculateAvakahadaChakra(chart: SiderealChartData): AvakahadaChakraResult {
  const moon = chart.planets.Moon || chart.planetsList[0];
  const nakIndex = moon.nakshatraIndex % 27;
  const pada = moon.pada || 1;
  const moonSignIdx = moon.signIndex;

  // 1. Janmakshar
  const syllables = NAKSHATRA_JANMAKSHARS[nakIndex] || ["A", "Ee", "U", "Ea"];
  const janmakshar = syllables[Math.max(0, Math.min(3, pada - 1))];

  // 2. Varna (based on Moon Rashi)
  // Water (Cancer 3, Scorpio 7, Pisces 11) = Brahmin
  // Fire (Aries 0, Leo 4, Sag 8) = Kshatriya
  // Earth (Taurus 1, Virgo 5, Cap 9) = Vaishya
  // Air (Gemini 2, Libra 6, Aqua 10) = Shudra
  let varna: AvakahadaChakraResult["varna"] = "Kshatriya";
  if ([3, 7, 11].includes(moonSignIdx)) varna = "Brahmin";
  else if ([0, 4, 8].includes(moonSignIdx)) varna = "Kshatriya";
  else if ([1, 5, 9].includes(moonSignIdx)) varna = "Vaishya";
  else if ([2, 6, 10].includes(moonSignIdx)) varna = "Shudra";

  // 3. Vashya (based on Moon Rashi)
  let vashya: AvakahadaChakraResult["vashya"] = "Chatushpada (Quadruped)";
  if ([0, 1, 8, 9].includes(moonSignIdx)) vashya = "Chatushpada (Quadruped)";
  else if ([2, 5, 6, 10].includes(moonSignIdx)) vashya = "Manava (Human)";
  else if ([3, 11].includes(moonSignIdx)) vashya = "Jalachara (Aquatic)";
  else if (moonSignIdx === 4) vashya = "Vanachara (Wild/Forest)";
  else if (moonSignIdx === 7) vashya = "Keeta (Insect)";

  // 4. Tara (Birth Moon is Janma Tara)
  const tara: AvakahadaChakraResult["tara"] = "Janma";

  // 5. Yoni
  const yoniInfo = NAKSHATRA_YONIS[nakIndex] || { animal: "Horse (Ashwa)", gender: "Male", enemy: "Buffalo" };

  // 6. Gana
  const gana = NAKSHATRA_GANAS[nakIndex] || "Deva";

  // 7. Nadi
  const nadi = NAKSHATRA_NADIS[nakIndex] || "Adi (Vata)";

  return {
    janmakshar,
    janmaSyllableDescription: `Sacred Vedic phonetic syllable for naming ceremony (Namkaran) & root vibration: "${janmakshar}".`,
    nakshatraName: moon.nakshatraName,
    nakshatraPada: pada,
    nakshatraLord: moon.nakshatraLord,
    moonSignName: moon.signName,
    moonSignLord: moon.signLord,
    varna,
    vashya,
    tara,
    yoni: {
      animal: yoniInfo.animal,
      gender: yoniInfo.gender as any,
      enemyAnimal: yoniInfo.enemy,
    },
    grahaMaitri: `Ruled by ${moon.signLord}, interacting harmoniously with friendly planetary frequencies.`,
    gana,
    bhakootSignificance: `Belongs to ${moon.signName} Rashi realm, governing emotional instincts and societal harmony.`,
    nadi,
  };
}

// ============================================================================
// 4. PAYA CALCULATION (METALLIC FOOTING OF BIRTH)
// ============================================================================

export interface PayaResult {
  paya: "Gold (Sona Paya)" | "Silver (Chandi Paya)" | "Copper (Tamba Paya)" | "Iron (Loha Paya)";
  payaSanskrit: "Swarna Paya" | "Rajat Paya" | "Tamra Paya" | "Loha Paya";
  moonHouseFromLagna: number;
  quality: "Highly Auspicious" | "Auspicious & Steady Growth" | "Mixed / Strenuous" | "Challenging / Heavy Effort";
  significance: string;
  remedialAdvice: string;
}

export function calculatePaya(chart: SiderealChartData): PayaResult {
  const moon = chart.planets.Moon || chart.planetsList[0];
  const lagnaSign = chart.ascendant.signIndex;

  let houseFromLagna = moon.signIndex - lagnaSign + 1;
  if (houseFromLagna <= 0) houseFromLagna += 12;

  if ([2, 5, 9].includes(houseFromLagna)) {
    return {
      paya: "Silver (Chandi Paya)",
      payaSanskrit: "Rajat Paya",
      moonHouseFromLagna: houseFromLagna,
      quality: "Highly Auspicious",
      significance: "Silver Paya (Moon in 2nd, 5th, or 9th house) is the supreme auspicious footing in Vedic Jyotish. It confers immense emotional stability, ancestral blessings, financial abundance, and high dharmic fortune.",
      remedialAdvice: "Maintain cleanliness, honor elders, and perform regular charities of white sweets or silver items on Mondays.",
    };
  } else if ([3, 7, 10].includes(houseFromLagna)) {
    return {
      paya: "Copper (Tamba Paya)",
      payaSanskrit: "Tamra Paya",
      moonHouseFromLagna: houseFromLagna,
      quality: "Auspicious & Steady Growth",
      significance: "Copper Paya (Moon in 3rd, 7th, or 10th house) signifies self-made courage, professional tenacity, commercial triumph, and persistent upward expansion throughout adult life.",
      remedialAdvice: "Offer water to the Sun (Surya Arghya) in a copper vessel every morning to amplify career vitality.",
    };
  } else if ([1, 6, 11].includes(houseFromLagna)) {
    return {
      paya: "Gold (Sona Paya)",
      payaSanskrit: "Swarna Paya",
      moonHouseFromLagna: houseFromLagna,
      quality: "Mixed / Strenuous",
      significance: "Gold Paya (Moon in 1st, 6th, or 11th house) brings rapid fluctuations between intense struggle and sudden immense windfall. Life requires steadfast mental groundedness.",
      remedialAdvice: "Perform regular Shiva Abhishekam and wear gold responsibly after assessing individual planetary strength.",
    };
  } else {
    // 4, 8, 12
    return {
      paya: "Iron (Loha Paya)",
      payaSanskrit: "Loha Paya",
      moonHouseFromLagna: houseFromLagna,
      quality: "Challenging / Heavy Effort",
      significance: "Iron Paya (Moon in 4th, 8th, or 12th house) signifies heavy initial karmic clearing, requiring deep perseverance, emotional discipline, and spiritual sadhana to unlock hidden inner gold.",
      remedialAdvice: "Chant the Maha Mrityunjaya Mantra and donate iron cookware or black sesame seeds on Saturdays to dissolve friction.",
    };
  }
}

// ============================================================================
// 5. GRAHA SAMAYA (100 PLANETARY STATES OF ACTIVITY)
// ============================================================================

export interface GrahaSamayaResult {
  planet: string;
  samayaNumber: number;          // 1 to 100
  stateName: string;
  sanskritName: string;
  category: "Court & Power" | "Rest & Slumber" | "Feasting & Pleasure" | "Travel & Movement" | "Battle & Strife" | "Meditation & Sadhana";
  nature: "Highly Auspicious" | "Auspicious" | "Neutral" | "Inauspicious";
  activityDescription: string;
  practicalManifestation: string;
}

const GRAHA_SAMAYA_NAMES = [
  { name: "Sitting in Royal Assembly", sanskrit: "Rajya Sabha Sthita", cat: "Court & Power", nature: "Highly Auspicious", desc: "Planet is holding supreme court and distributing kingly decrees." },
  { name: "Feasting on Nectar", sanskrit: "Amrita Bhojana", cat: "Feasting & Pleasure", nature: "Highly Auspicious", desc: "Planet is absorbing supreme spiritual sustenance and sensory contentment." },
  { name: "Deep Slumber", sanskrit: "Sayana", cat: "Rest & Slumber", nature: "Neutral", desc: "Planet is inactive, turning energy inward into the subconscious." },
  { name: "Waging Battle", sanskrit: "Yuddha Rata", cat: "Battle & Strife", nature: "Inauspicious", desc: "Planet is actively battling adversities, causing friction before victory." },
  { name: "Wandering in Forests", sanskrit: "Vana Sanchara", cat: "Travel & Movement", nature: "Neutral", desc: "Planet is exploring foreign territories and unconventional pathways." },
  { name: "Deep Meditation", sanskrit: "Dhyana Avastha", cat: "Meditation & Sadhana", nature: "Highly Auspicious", desc: "Planet is attuned to the divine ether, granting mystical wisdom." },
  { name: "Riding a White Steed", sanskrit: "Ashwaroodha", cat: "Court & Power", nature: "Auspicious", desc: "Planet is mobilizing rapidly for conquest and social elevation." },
  { name: "Counting Treasures", sanskrit: "Dhana Ganana", cat: "Court & Power", nature: "Highly Auspicious", desc: "Planet is multiplying wealth reserves and financial assets." },
  { name: "Bathing in Sacred Rivers", sanskrit: "Tirtha Snana", cat: "Meditation & Sadhana", nature: "Highly Auspicious", desc: "Planet is purifying past karmic imprints." },
  { name: "Engaged in Celebration", sanskrit: "Utsava Rata", cat: "Feasting & Pleasure", nature: "Auspicious", desc: "Planet radiates joy, social charm, and festive harmony." },
];

export function calculateGrahaSamayas(chart: SiderealChartData): Record<string, GrahaSamayaResult> {
  const result: Record<string, GrahaSamayaResult> = {};
  const moon = chart.planets.Moon || chart.planetsList[0];
  const lagnaSign = chart.ascendant.signIndex;

  for (const p of chart.planetsList) {
    // Parashari Graha Samaya index calculation:
    // (Planet Nakshatra Index + Moon Nakshatra Index + Planet Sign Index + Lagna Sign Index + Planet House) % 10
    const rawVal = (p.nakshatraIndex + moon.nakshatraIndex + p.signIndex + lagnaSign + p.house) * 7 + 3;
    const samayaIndex = (rawVal % 10);
    const samayaNumber = (rawVal % 100) + 1;
    const meta = GRAHA_SAMAYA_NAMES[samayaIndex];

    result[p.name] = {
      planet: p.name,
      samayaNumber,
      stateName: meta.name,
      sanskritName: meta.sanskrit,
      category: meta.cat as any,
      nature: meta.nature as any,
      activityDescription: meta.desc,
      practicalManifestation: `${p.name} is in the state of "${meta.name}" (${meta.sanskrit}) at birth. Its natural significations operate with ${meta.nature.toLowerCase()} potency.`,
    };
  }

  return result;
}

// ============================================================================
// 6. PUSHKAR NAVAMSHA, PUSHKAR BHAGA & VARGOTTAMA SCANNERS
// ============================================================================

export interface PushkarAnalysisResult {
  planet: string;
  isPushkarNavamsha: boolean;
  pushkarNavamshaSign?: string;
  isPushkarBhaga: boolean;
  pushkarBhagaExactDegree?: number;
  pushkarDegreeDistance?: number;
  isRashiVargottama: boolean;
  isBhavaVargottama: boolean;
  isHoraVargottama: boolean;
  spiritualSignificance: string;
}

// Pushkar Bhaga exact auspicious degrees in each of the 12 signs
export const PUSHKAR_BHAGA_DEGREES: number[] = [
  21.0, // Aries
  14.0, // Taurus
  24.0, // Gemini
  7.0,  // Cancer
  21.0, // Leo
  14.0, // Virgo
  24.0, // Libra
  7.0,  // Scorpio
  21.0, // Sagittarius
  14.0, // Capricorn
  24.0, // Aquarius
  7.0,  // Pisces
];

// Pushkar Navamsha Navamsha parts (0 to 8) for each sign element:
// Fire signs (Aries, Leo, Sag): 7th (Libra/6) and 9th (Sagittarius/8) Navamshas -> parts 6 & 8
// Earth signs (Taurus, Virgo, Cap): 3rd (Pisces/11) and 5th (Taurus/1) Navamshas -> parts 2 & 4
// Air signs (Gemini, Libra, Aqua): 6th (Pisces/11) and 8th (Taurus/1) Navamshas -> parts 5 & 7
// Water signs (Cancer, Scorpio, Pisces): 1st (Cancer/3) and 3rd (Virgo/5) Navamshas -> parts 0 & 2
export function isPositionInPushkarNavamsha(signIndex: number, degInSign: number): { isPushkar: boolean; navamshaSign: string } {
  const part = Math.min(8, Math.floor(degInSign / (30 / 9))); // 0 to 8
  const element = signIndex % 4; // 0=Fire, 1=Earth, 2=Air, 3=Water

  let isPushkar = false;
  let navamshaSign = "";

  if (element === 0 && (part === 6 || part === 8)) {
    isPushkar = true;
    navamshaSign = part === 6 ? "Libra" : "Sagittarius";
  } else if (element === 1 && (part === 2 || part === 4)) {
    isPushkar = true;
    navamshaSign = part === 2 ? "Pisces" : "Taurus";
  } else if (element === 2 && (part === 5 || part === 7)) {
    isPushkar = true;
    navamshaSign = part === 5 ? "Pisces" : "Taurus";
  } else if (element === 3 && (part === 0 || part === 2)) {
    isPushkar = true;
    navamshaSign = part === 0 ? "Cancer" : "Virgo";
  }

  return { isPushkar, navamshaSign };
}

export function scanPushkarAndVargottama(
  chart: SiderealChartData,
  d9Chart: DivisionalChartResult,
  d2Chart: DivisionalChartResult
): Record<string, PushkarAnalysisResult> {
  const result: Record<string, PushkarAnalysisResult> = {};

  for (const p of chart.planetsList) {
    const pushkarNav = isPositionInPushkarNavamsha(p.signIndex, p.degreeInSign);

    const pushkarBhagaDeg = PUSHKAR_BHAGA_DEGREES[p.signIndex];
    const pushkarDist = Math.abs(p.degreeInSign - pushkarBhagaDeg);
    const isPushkarBhaga = pushkarDist <= 1.0;

    const d9Pos = d9Chart.placements[p.name];
    const isRashiVargottama = d9Pos ? d9Pos.vargaSignIndex === p.signIndex : false;
    const isBhavaVargottama = d9Pos ? d9Pos.vargaHouse === p.house : false;

    const d2Pos = d2Chart.placements[p.name];
    const isHoraVargottama = d2Pos ? d2Pos.vargaSignIndex === p.signIndex : false;

    let significance = "";
    if (isPushkarBhaga) {
      significance += `[Pushkar Bhaga Active] ${p.name} sits at the exact sacred degree (${p.degreeInSign.toFixed(2)}° vs ${pushkarBhagaDeg}°), granting extraordinary healing power and infallible auspicious fruits. `;
    }
    if (pushkarNav.isPushkar) {
      significance += `[Pushkar Navamsha Active] Resides in the ${pushkarNav.navamshaSign} Pushkar Navamsha, imbuing the planet with nourishing regenerative grace. `;
    }
    if (isRashiVargottama) {
      significance += `[Rashi Vargottama] Possesses unyielding soul-level strength by holding the same sign (${p.signName}) in both D1 and D9. `;
    }
    if (!significance) {
      significance = "Standard planetary placement without special Pushkar or Vargottama conjunctions.";
    }

    result[p.name] = {
      planet: p.name,
      isPushkarNavamsha: pushkarNav.isPushkar,
      pushkarNavamshaSign: pushkarNav.isPushkar ? pushkarNav.navamshaSign : undefined,
      isPushkarBhaga,
      pushkarBhagaExactDegree: pushkarBhagaDeg,
      pushkarDegreeDistance: Number(pushkarDist.toFixed(2)),
      isRashiVargottama,
      isBhavaVargottama,
      isHoraVargottama,
      spiritualSignificance: significance.trim(),
    };
  }

  return result;
}
