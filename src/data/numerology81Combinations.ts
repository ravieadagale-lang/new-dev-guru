// src/data/numerology81Combinations.ts
// Complete 81 Combinations Engine: Driver (1-9) + Conductor (1-9)

export interface Combination81Result {
  driver: number;
  conductor: number;
  code: string; // e.g. "1-1", "1-2"
  title: string;
  personality: string;
  positives: string[];
  negatives: string[];
  marriage: string;
  career: string[];
  finance: string;
  health: string;
  friendNumbers: number[];
  enemyNumbers: number[];
  neutralNumbers: number[];
  luckyDays: string[];
  luckyColours: string[];
  jewelsCrystals: string[];
  rudraksha: string;
  mantra: string;
  yantra: string;
  worshipSuggestions: string;
  compatibilityGrade: "Super Excellent" | "Excellent" | "Good" | "Average" | "Challenging";
}

// Key Master Data for 81 Driver-Conductor matrix
export function get81Combination(driver: number, conductor: number): Combination81Result {
  const d = Math.max(1, Math.min(9, driver));
  const c = Math.max(1, Math.min(9, conductor));
  const code = `${d}-${c}`;

  // Pre-configured specialized insights for key combinations, plus algorithmic synthesis
  const CUSTOM_MAP: Record<string, Partial<Combination81Result>> = {
    "1-1": {
      title: "Double King (Surya + Surya) - Supreme Sovereign",
      personality: "Ultra-ambitious, regal, highly authoritative, fiercely independent, and unstoppable pioneer.",
      compatibilityGrade: "Super Excellent",
      marriage: "Needs an understanding, respectful partner; ego clashes possible if spouse is also overly dominant.",
      finance: "Magnificent capacity for financial accumulation through authority, executive roles, and real estate.",
      health: "High body heat, blood pressure, eye strain, and headaches. Regular hydration and cooling foods required."
    },
    "1-2": {
      title: "King & Queen (Sun + Moon) - Royal Harmony",
      personality: "Perfect balance of willpower and diplomacy; executive authority tempered by emotional charm.",
      compatibilityGrade: "Super Excellent",
      marriage: "Highly fortunate marriage; expressive, loving, and deeply respected in social circles.",
      finance: "Excellent financial prosperity through public relations, leadership, arts, and trade.",
      health: "Digestive sensitivity, fluid balance issues, and stress-related fatigue. Balanced lifestyle needed."
    },
    "1-3": {
      title: "King & Guru (Sun + Jupiter) - Divine Leader & Mentor",
      personality: "Wise, ethical, visionary leader with immense knowledge, optimism, and executive mastery.",
      compatibilityGrade: "Super Excellent",
      marriage: "Very happy and blessed marital life with high social standing and morally upright children.",
      finance: "Abundant wealth through education, government contracts, publishing, and legal/financial advisory.",
      health: "Prone to liver sluggishness, weight gain, or cholesterol. Regular physical exercise recommended."
    },
    "1-4": {
      title: "King & Architect (Sun + Rahu) - Revolutionary Innovator",
      personality: "High technical genius, out-of-box vision, rebellious drive, and capacity to build mega projects.",
      compatibilityGrade: "Good",
      marriage: "Requires clear communication; sudden misunderstandings can arise if expectations are unsaid.",
      finance: "Unexpected financial windfalls, tech success, and international business growth.",
      health: "Neurological tension, sudden acidity, and sleep rhythm issues. Daily grounding is essential."
    },
    "1-5": {
      title: "King & Trader (Sun + Mercury) - Budhaditya Monarch",
      personality: "Extremely sharp business intellect, rapid speech, high commercial charisma, and diplomatic power.",
      compatibilityGrade: "Super Excellent",
      marriage: "Fun-loving, communicative marriage with frequent travel and active social life.",
      finance: "Multiple streams of wealth; exceptional success in trading, marketing, e-commerce, and media.",
      health: "Nervous strain, restlessness, and digestive acidity. Mindful relaxation is recommended."
    },
    "1-6": {
      title: "King & Shukra (Sun + Venus) - Royal Luxury & Fame",
      personality: "Charming, glamorous, highly artistic, magnetic personality with a passion for luxury and honor.",
      compatibilityGrade: "Excellent",
      marriage: "Harmonious and romantic marital bond; enjoys fine living, luxury travel, and social prestige.",
      finance: "High attraction for luxury wealth, fashion, media, interior design, and entertainment industries.",
      health: "Hormonal balance, kidney care, and throat sensitivity. Avoid excessive rich or sugary foods."
    },
    "1-7": {
      title: "King & Mystic (Sun + Ketu) - Philosophical Sovereign",
      personality: "Deeply analytical thinker, independent research mind, intuitive power, and spiritual dignity.",
      compatibilityGrade: "Good",
      marriage: "Values intellectual and spiritual connection; partner must respect their need for quiet study.",
      finance: "Earns through specialized knowledge, inventions, research patents, and occult/astrological expertise.",
      health: "Skin allergies, psychosomatic stress, and eye strain. Daily meditation and nature walks vital."
    },
    "1-8": {
      title: "King & Judge (Sun + Saturn) - Struggles to Sovereign Legacy",
      personality: "High sense of duty, hard-working, disciplined, faces early struggles but builds permanent empire.",
      compatibilityGrade: "Average",
      marriage: "Demands patience; early delays in marriage lead to solid, lasting maturity in later life.",
      finance: "Wealth grows steadily through industrial manufacturing, real estate, law, and long-term capital.",
      health: "Joint stiffness, back issues, and chronic fatigue. Regular warm oil massage and yoga helpful."
    },
    "1-9": {
      title: "King & Commander (Sun + Mars) - Fearless Conqueror",
      personality: "Immense physical energy, high courage, direct speech, patriotic, and unstoppable competitive drive.",
      compatibilityGrade: "Excellent",
      marriage: "Passionate marital bond; needs patience to avoid fiery arguments over small matters.",
      finance: "Gains wealth through land ownership, real estate development, defense contracts, and surgery.",
      health: "High blood pressure, feverish conditions, cuts, and burns. Practice anger management and cooling pranayama."
    },
    "2-2": {
      title: "Double Moon - Pure Intuition & Imaginative Depth",
      personality: "Deeply sensitive, poetic, highly artistic, peacemaker, deeply intuitive, and emotional caregiver.",
      compatibilityGrade: "Good",
      marriage: "Deeply affectionate; needs an emotionally grounding spouse to offer stability during mood swings.",
      finance: "Flourishes in creative, artistic, counseling, liquid trade, and hospitality ventures.",
      health: "Cold, cough, fluid retention, and emotional anxiety. Regular sunshine and warm foods essential."
    },
    "3-3": {
      title: "Double Guru - Master Scholar & Spiritual Beacon",
      personality: "Supreme wisdom, academic excellence, highly spiritual, inspirational speaker, and divine mentor.",
      compatibilityGrade: "Super Excellent",
      marriage: "Blessed family life based on mutual respect, high ethics, and intellectual companionability.",
      finance: "Financial abundance through education, universities, publishing, law, and wealth management.",
      health: "Liver care, cholesterol, and weight management needed. Moderate diet recommended."
    },
    "5-5": {
      title: "Double Mercury - Commercial Genius & High Speed",
      personality: "Superfast intellect, master communicator, adaptable trader, media wizard, and networking dynamo.",
      compatibilityGrade: "Super Excellent",
      marriage: "Vibrant, lively relationship with constant conversation, travel, and joint business ventures.",
      finance: "Magnificent wealth generation in stock trading, digital media, e-commerce, and international trade.",
      health: "Nervous exhaustion, insomnia, and restless energy. Practice daily grounding and meditation."
    },
    "6-6": {
      title: "Double Shukra - Absolute Opulence & Aesthetic Beauty",
      personality: "Supreme charm, artistic perfection, luxury magnet, romantic, and patron of fine arts.",
      compatibilityGrade: "Super Excellent",
      marriage: "Deeply romantic, luxurious home life surrounded by beauty, comfort, and hospitality.",
      finance: "Immense success in fashion, jewelry, hospitality, luxury vehicles, and entertainment.",
      health: "Throat, kidney, and sweet cravings. Maintain balanced diet and active routine."
    },
    "8-8": {
      title: "Double Shani - Iron Will & Permanent Empire",
      personality: "Immense perseverance, unshakeable stamina, master of heavy industry, disciplined, and resilient.",
      compatibilityGrade: "Challenging",
      marriage: "Requires deep commitment and tolerance; thrives when married to an emotionally supportive partner.",
      finance: "Immense long-term wealth accumulation in infrastructure, steel, real estate, and manufacturing.",
      health: "Joint pain, bone density, and chronic fatigue. Regular physical exercise and sunshine needed."
    },
    "9-9": {
      title: "Double Mangal - Supreme Commander & Fire Force",
      personality: "Fearless warrior, ultimate competitive stamina, high physical strength, and direct leader.",
      compatibilityGrade: "Good",
      marriage: "Passionate bond; requires conscious anger management and mutual space to avoid fiery friction.",
      finance: "High gains through land, construction, athletics, surgery, defense, and emergency services.",
      health: "Prone to injuries, high blood pressure, and inflammation. Cool environment and meditation essential."
    }
  };

  const generic = CUSTOM_MAP[code];

  // Algorithmic fallbacks for any of the 81 combinations
  const friendNumbers = [1, 3, 5, 6].filter((n) => n !== d);
  const enemyNumbers = [4, 8].includes(d) ? [4, 8] : [8];
  const neutralNumbers = [2, 7, 9].filter((n) => n !== d && n !== c);

  const RASHI_LORDS: Record<number, string> = {
    1: "Surya Deva", 2: "Chandra Deva", 3: "Guru Brihaspati",
    4: "Rahu Deva", 5: "Budha Deva", 6: "Shukra Deva",
    7: "Ketu Deva", 8: "Shani Deva", 9: "Mangal Deva"
  };

  const MANTRAS: Record<number, string> = {
    1: "Om Hram Hreem Hroum Sah Suryaya Namah (108 Times)",
    2: "Om Shram Shreem Shroum Sah Chandraya Namah (108 Times)",
    3: "Om Gram Greem Groum Sah Gurave Namah (108 Times)",
    4: "Om Bhram Bhreem Bhroum Sah Rahave Namah (108 Times)",
    5: "Om Bram Breem Broum Sah Budhaya Namah (108 Times)",
    6: "Om Dram Dreem Droum Sah Shukraya Namah (108 Times)",
    7: "Om Stram Streem Stroum Sah Ketave Namah (108 Times)",
    8: "Om Pram Preem Proum Sah Shanaye Namah (108 Times)",
    9: "Om Kram Kreem Kroum Sah Bhaumaya Namah (108 Times)"
  };

  const YANTRAS: Record<number, string> = {
    1: "Surya Yantra (Copper Plate facing East)",
    2: "Chandra Yantra (Silver Plate facing North-West)",
    3: "Guru Brihaspati Yantra (Brass/Gold Plate facing North-East)",
    4: "Rahu Yantra (Lead/Steel Plate facing South-West)",
    5: "Budha Yantra (Bronze/Emerald Yantra facing North)",
    6: "Shukra Yantra (Silver/Crystal Yantra facing South-East)",
    7: "Ketu Yantra (Cat's Eye / Steel Plate facing North-East)",
    8: "Shani Yantra (Iron Plate facing West)",
    9: "Mangal Yantra (Copper Plate facing South)"
  };

  const RUDRAKSHA: Record<number, string> = {
    1: "1 Mukhi (Ek Mukhi) or 12 Mukhi Rudraksha",
    2: "2 Mukhi (Do Mukhi) Rudraksha",
    3: "5 Mukhi or 11 Mukhi Rudraksha",
    4: "8 Mukhi Rudraksha",
    5: "4 Mukhi or 10 Mukhi Rudraksha",
    6: "6 Mukhi or 13 Mukhi Rudraksha",
    7: "9 Mukhi Rudraksha",
    8: "7 Mukhi or 14 Mukhi Rudraksha",
    9: "3 Mukhi or 11 Mukhi Rudraksha"
  };

  const CRYSTALS: Record<number, string[]> = {
    1: ["Ruby (Manik)", "Sunstone", "Carnelian"],
    2: ["Pearl (Moti)", "Moonstone", "Clear Quartz"],
    3: ["Yellow Sapphire (Pukhraj)", "Citrine", "Topaz"],
    4: ["Hessonite (Gomed)", "Smoky Quartz", "Lapis Lazuli"],
    5: ["Emerald (Panna)", "Peridot", "Green Aventurine"],
    6: ["Diamond (Heera)", "White Sapphire", "Opal"],
    7: ["Cat's Eye (Lehsuniya)", "Tiger Eye", "Amethyst"],
    8: ["Blue Sapphire (Neelam)", "Amethyst", "Black Tourmaline"],
    9: ["Red Coral (Moonga)", "Carnelian", "Red Jasper"]
  };

  const DAYS: Record<number, string[]> = {
    1: ["Sunday", "Monday"], 2: ["Monday", "Sunday"], 3: ["Thursday", "Tuesday"],
    4: ["Wednesday", "Saturday"], 5: ["Wednesday", "Friday"], 6: ["Friday", "Wednesday"],
    7: ["Thursday", "Sunday"], 8: ["Saturday", "Wednesday"], 9: ["Tuesday", "Sunday"]
  };

  const COLOURS: Record<number, string[]> = {
    1: ["Golden Yellow", "Orange", "Royal Red"],
    2: ["Pearl White", "Cream", "Silver"],
    3: ["Bright Yellow", "Saffron", "Gold"],
    4: ["Electric Blue", "Grey", "Smoky Blue"],
    5: ["Emerald Green", "Light Green", "Teal"],
    6: ["White", "Pink", "Pastel Shades"],
    7: ["Smoky Grey", "Light Blue", "Multi-color"],
    8: ["Navy Blue", "Black", "Dark Violet"],
    9: ["Deep Red", "Scarlet", "Crimson"]
  };

  return {
    driver: d,
    conductor: c,
    code,
    title: generic?.title || `Driver ${d} + Conductor ${c} Combination (${RASHI_LORDS[d]} & ${RASHI_LORDS[c]})`,
    personality: generic?.personality || `A dynamic synergy blending ${RASHI_LORDS[d]} leadership with ${RASHI_LORDS[c]} life purpose. Driven, analytical, and highly capable in chosen pursuits.`,
    positives: generic?.positives || [
      `Strong alignment between personal drive (${d}) and ultimate destiny (${c})`,
      `Ability to adapt to changing commercial and professional circumstances`,
      `High determination and capacity for continuous personal improvement`
    ],
    negatives: generic?.negatives || [
      `Potential friction between inner desire (${d}) and external demands (${c})`,
      `Tendency to overexert during intense project deadlines`,
      `Need for conscious emotional and physical balance`
    ],
    marriage: generic?.marriage || `Favorable when paired with numbers ${friendNumbers.join(", ")}; requires mutual respect and emotional understanding.`,
    career: generic?.career || [
      "Executive Management & Business Leadership",
      "Consulting, Finance & Strategic Advisory",
      "Technology, Media & Public Relations",
      "Entrepreneurship & Trade Operations"
    ],
    finance: generic?.finance || "Steady financial growth with long-term capital accumulation through prudent management and strategic planning.",
    health: generic?.health || "Maintain balanced nutrition, stay well hydrated, and practice daily stress-relief routines.",
    friendNumbers,
    enemyNumbers,
    neutralNumbers,
    luckyDays: DAYS[d] || ["Sunday", "Wednesday"],
    luckyColours: COLOURS[d] || ["Gold", "White"],
    jewelsCrystals: CRYSTALS[d] || ["Citrine", "Clear Quartz"],
    rudraksha: RUDRAKSHA[d] || "5 Mukhi Rudraksha",
    mantra: MANTRAS[d] || MANTRAS[1],
    yantra: YANTRAS[d] || YANTRAS[1],
    worshipSuggestions: `Worship ${RASHI_LORDS[d]} and ${RASHI_LORDS[c]} on auspicious days; offer water at sunrise and chant the prescribed beeja mantra 108 times daily.`,
    compatibilityGrade: generic?.compatibilityGrade || "Good"
  };
}
