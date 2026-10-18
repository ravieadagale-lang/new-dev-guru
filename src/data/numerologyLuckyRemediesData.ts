// Complete Data & Theoretical Framework for Lucky Numbers, Colors, Directions, Gemstones, Crystals & Remedies for Numbers 1 through 9, 11, 22.
// Aligned with Chapter Thirty-Four: "Lucky Numbers, Lucky Colours, Directions and Gemstone Remedies"

export interface GemstoneInfo {
  primaryGemstone: string;
  sanskritName: string;
  substituteCrystals: string[];
  governingPlanet: string;
  wearingMetal: string;
  recommendedFinger: string;
  auspiciousDay: string;
  auspiciousTime: string;
  wearingMantra: string;
  purificationProcess: string;
  disclaimer: string;
}

export interface DirectionInfo {
  cardinalDirection: string;
  vastuZone: string;
  element: string;
  powerSectorUsage: string[];
  avoidPlacement: string[];
  facingDirectionWork: string;
  facingDirectionSleep: string;
  spatialRemedy: string;
}

export interface ColorInfo {
  primaryLuckyColors: string[];
  powerShades: string[];
  neutralColors: string[];
  avoidColors: string[];
  hexCodes: string[];
  colorPsychology: string;
  wardrobeApplication: string;
}

export interface RemedyInfo {
  bijaMantra: string;
  planetaryMantra: string;
  chantingCount: number;
  bestChantingTime: string;
  malaType: string;
  yantraName: string;
  yantraDirection: string;
  fastingDay: string;
  fastingProtocol: string;
  donationItems: string[];
  donationTarget: string;
  bestDonationDay: string;
  herbalBotanicalRemedy: string;
  lifestyleHabits: string[];
}

export interface NumberLuckyProfile {
  number: number;
  rulingPlanet: string;
  archetype: string;
  deity: string;
  element: string;
  keyVibration: string;
  luckyNumbers: number[];
  primaryLuckyNumbers: number[];
  secondaryLuckyNumbers: number[];
  friendlyNumbers: number[];
  neutralNumbers: number[];
  enemyNumbers: number[];
  colorData: ColorInfo;
  directionData: DirectionInfo;
  gemstoneData: GemstoneInfo;
  remedyData: RemedyInfo;
}

export const MANDATORY_GEMSTONE_DISCLAIMER = "*(Please consult a qualified gemologist, professional numerologist, or astrologer before purchasing, energizing, or wearing any gemstones)*";

export const NUMBER_LUCKY_PROFILES: Record<number, NumberLuckyProfile> = {
  1: {
    number: 1,
    rulingPlanet: "Sun (Surya)",
    archetype: "The Royal Pioneer & Leader",
    deity: "Lord Surya / Gayatri Devi",
    element: "Fire (Agni)",
    keyVibration: "Vitality, authority, independent initiative, creative leadership, and original vision.",
    luckyNumbers: [1, 5, 7],
    primaryLuckyNumbers: [1, 5, 7],
    secondaryLuckyNumbers: [2, 9],
    friendlyNumbers: [1, 5, 7, 2, 9],
    neutralNumbers: [4, 6],
    enemyNumbers: [3, 8],
    colorData: {
      primaryLuckyColors: ["Gold", "Orange", "Deep Yellow", "Bright Red"],
      powerShades: ["Gold", "Saffron", "Bright Red"],
      neutralColors: ["Cream", "White", "Light Orange"],
      avoidColors: ["Black", "Dark Grey"],
      hexCodes: ["#FFD700", "#FF8C00", "#FF4500", "#FFA500"],
      colorPsychology: "Wavelengths of gold and orange stimulate solar authority, boosting confidence, aura radiance, and pioneering drive.",
      wardrobeApplication: "Wear gold, orange, or deep yellow on Sundays, for important leadership meetings, and for new beginnings."
    },
    directionData: {
      cardinalDirection: "East (Purva)",
      vastuZone: "East & North-East",
      element: "Fire Element (Agni)",
      powerSectorUsage: [
        "Position primary executive office desk in the East or North-East sector.",
        "Keep the East direction well-lit, uncluttered, and open to morning solar energy.",
        "Display awards, leadership symbols, or Sun emblems on the East wall."
      ],
      avoidPlacement: [
        "Avoid sleeping with head pointing West (sets solar energy).",
        "Do not place heavy clutter or dark storage in the East zone."
      ],
      facingDirectionWork: "Face East for maximum solar mental clarity and pioneering focus.",
      facingDirectionSleep: "Sleep with head pointing East (Sun rises in East).",
      spatialRemedy: "Hang a copper Sun Yantra or brass Sun emblem on the East wall at eye level."
    },
    gemstoneData: {
      primaryGemstone: "Ruby (Manik)",
      sanskritName: "Manik",
      substituteCrystals: ["Red Garnet (Red Spinel)", "Sunstone"],
      governingPlanet: "Sun",
      wearingMetal: "22K Gold",
      recommendedFinger: "Ring finger of the right hand",
      auspiciousDay: "Sunday morning during Sun hora",
      auspiciousTime: "Sun Hora at sunrise",
      wearingMantra: "Om Suryaya Namaha (Recite 108 times before wearing)",
      purificationProcess: "Wash in raw cow's milk or Gangajal, place on a yellow cloth, chant 'Om Suryaya Namaha' 108 times before placing on ring finger.",
      disclaimer: MANDATORY_GEMSTONE_DISCLAIMER
    },
    remedyData: {
      bijaMantra: "Om Hram Hrim Hroom Sah Suryaya Namah",
      planetaryMantra: "Om Suryaya Namaha / Aditya Hrudayam Stotram",
      chantingCount: 108,
      bestChantingTime: "At Sunrise facing East",
      malaType: "108-bead Rudraksha or Red Sandalwood Mala",
      yantraName: "Surya Yantra (Copper)",
      yantraDirection: "East Wall",
      fastingDay: "Sundays (Surya Vrat)",
      fastingProtocol: "Consume no salt after sunset; take wheat, jaggery, or saffron rice during the day.",
      donationItems: ["Wheat grain", "Red lentils (Masoor dal)", "Jaggery (Gud)", "Copper utensils", "Red clothes"],
      donationTarget: "Needy students, temple priests, or father figures",
      bestDonationDay: "Sunday noon",
      herbalBotanicalRemedy: "Drink water stored overnight in a pure copper vessel.",
      lifestyleHabits: [
        "Offer Arghya (water from copper pot containing red flowers & rice) to the rising Sun daily.",
        "Maintain deep respect towards father, mentors, and elders.",
        "Align daily routines with solar dawn."
      ]
    }
  },

  2: {
    number: 2,
    rulingPlanet: "Moon (Chandra)",
    archetype: "The Intuitive Nurturer & Diplomat",
    deity: "Lord Shiva / Parvati Devi",
    element: "Water (Jala)",
    keyVibration: "Emotional intelligence, intuitive clarity, cooperative warmth, peace, and relational harmony.",
    luckyNumbers: [2, 6, 4],
    primaryLuckyNumbers: [2, 6, 4],
    secondaryLuckyNumbers: [8, 9],
    friendlyNumbers: [2, 6, 4, 8, 9],
    neutralNumbers: [3, 7],
    enemyNumbers: [1, 5],
    colorData: {
      primaryLuckyColors: ["White", "Silver", "Pearl", "Pale Blue"],
      powerShades: ["White", "Silver", "Pearl"],
      neutralColors: ["Light Green", "Cream", "Very Light Pink"],
      avoidColors: ["Black", "Very Dark Navy", "Harsh Red"],
      hexCodes: ["#FFFFFF", "#C0C0C0", "#F5F5DC", "#E0EEEE"],
      colorPsychology: "White and silver wavelengths soothe emotional sensitivity, deepen intuitive perception, and harmonize relationships.",
      wardrobeApplication: "Wear white, silver, or pale blue on Mondays, during family events, and for emotional or diplomatic discussions."
    },
    directionData: {
      cardinalDirection: "North-West (Vayu Kona)",
      vastuZone: "North-West & North",
      element: "Water Element",
      powerSectorUsage: [
        "Set up creative spaces, guest rooms, or meditation spots in the North-West sector.",
        "Keep North-West uncluttered with fresh water and gentle lighting.",
        "Face North for magnetic receptivity and mental peace."
      ],
      avoidPlacement: [
        "Avoid sleeping with head pointing South (Moon weakened).",
        "Do not place harsh dark clutter or fire element in North-West."
      ],
      facingDirectionWork: "Face North for magnetic receptivity and intuitive clarity.",
      facingDirectionSleep: "Sleep with head pointing North-West (Moon's direction).",
      spatialRemedy: "Place a silver bowl filled with fresh water in the North-West corner."
    },
    gemstoneData: {
      primaryGemstone: "Natural Pearl (Moti)",
      sanskritName: "Moti",
      substituteCrystals: ["Moonstone"],
      governingPlanet: "Moon",
      wearingMetal: "Pure Sterling Silver",
      recommendedFinger: "Little finger of the right hand",
      auspiciousDay: "Monday evening during Moon hora",
      auspiciousTime: "Moon Hora at dusk",
      wearingMantra: "Om Chandraya Namaha (Recite 108 times before wearing)",
      purificationProcess: "Wash in raw cow's milk, place on a white cloth, chant 'Om Chandraya Namaha' 108 times before wearing.",
      disclaimer: MANDATORY_GEMSTONE_DISCLAIMER
    },
    remedyData: {
      bijaMantra: "Om Shram Shrim Shrom Sah Chandramase Namah",
      planetaryMantra: "Om Chandraya Namaha / Chandra Kavacham",
      chantingCount: 108,
      bestChantingTime: "At dusk or evening facing North/East",
      malaType: "Sphatik (Crystal) Mala or White Pearl Mala",
      yantraName: "Chandra Yantra (Silver)",
      yantraDirection: "North-West Wall",
      fastingDay: "Mondays (Chandra Vrat)",
      fastingProtocol: "Consume white foods (milk, rice pudding, curd); avoid salty spicy food after sunset.",
      donationItems: ["White rice", "Milk", "White sugar", "Silver coins", "White clothes"],
      donationTarget: "Mothers, needy women, or orphanage care centers",
      bestDonationDay: "Monday evening",
      herbalBotanicalRemedy: "Drink water from a silver cup to balance emotional sensitivity.",
      lifestyleHabits: [
        "Offer water or milk to Shivling every Monday.",
        "Honor and care for mother and maternal figures.",
        "Practice daily emotional reflection and peaceful mindfulness."
      ]
    }
  },

  3: {
    number: 3,
    rulingPlanet: "Jupiter (Brihaspati / Guru)",
    archetype: "The Wise Counselor & Creative Optimist",
    deity: "Lord Vishnu / Lord Dakshinamurthy",
    element: "Ether / Space (Akasha)",
    keyVibration: "Divine wisdom, expansive joy, creative expressiveness, prosperity, and optimistic growth.",
    luckyNumbers: [3, 6, 9],
    primaryLuckyNumbers: [3, 6, 9],
    secondaryLuckyNumbers: [1, 5],
    friendlyNumbers: [3, 6, 9, 1, 5],
    neutralNumbers: [2, 7],
    enemyNumbers: [4, 8],
    colorData: {
      primaryLuckyColors: ["Yellow", "Light Purple", "Sky Blue", "Lime Green"],
      powerShades: ["Yellow", "Golden Yellow", "Saffron"],
      neutralColors: ["Orange", "Gold", "Turquoise"],
      avoidColors: ["Dark Brown", "Harsh Black", "Muddy Grey"],
      hexCodes: ["#FFEB3B", "#FFC107", "#87CEEB", "#32CD32"],
      colorPsychology: "Yellow and light purple frequencies stimulate Jupiterian expansion, optimism, learning, and higher wisdom.",
      wardrobeApplication: "Wear yellow, light purple, or sky blue on Thursdays, during creative work, and social/educational occasions."
    },
    directionData: {
      cardinalDirection: "North-East (Ishanya Kona)",
      vastuZone: "North-East (Zone of Divine Wisdom & Light)",
      element: "Space / Ether Element",
      powerSectorUsage: [
        "Create home altar, study room, or meditation space in the North-East sector.",
        "Keep North-East ultra-clean, lightweight, and clutter-free.",
        "Face North-East for Jupiter's expansive wisdom and divine blessing."
      ],
      avoidPlacement: [
        "Never locate toilets or heavy trash in North-East.",
        "Avoid placing heavy dark machinery in North-East."
      ],
      facingDirectionWork: "Face North-East for Jupiter's expansive wisdom and study clarity.",
      facingDirectionSleep: "Sleep with head pointing North-East (Ishanya - most sacred).",
      spatialRemedy: "Place a brass vessel with water and turmeric or yellow marigold flowers in the North-East corner."
    },
    gemstoneData: {
      primaryGemstone: "Yellow Sapphire (Pukhraj)",
      sanskritName: "Pukhraj",
      substituteCrystals: ["Yellow Topaz", "Citrine (Sunela)"],
      governingPlanet: "Jupiter",
      wearingMetal: "22K Gold",
      recommendedFinger: "Index finger of the right hand",
      auspiciousDay: "Thursday morning during Jupiter hora, Shukla Paksha",
      auspiciousTime: "Jupiter Hora at sunrise",
      wearingMantra: "Om Gurave Namaha / Om Brihaspataye Namaha (Recite 108 times)",
      purificationProcess: "Wash in raw cow's milk, place on yellow cloth, chant 'Om Gurave Namaha' 108 times before wearing on index finger.",
      disclaimer: MANDATORY_GEMSTONE_DISCLAIMER
    },
    remedyData: {
      bijaMantra: "Om Gram Grim Grom Sah Gurave Namah",
      planetaryMantra: "Om Gurave Namaha / Om Brihaspataye Namaha",
      chantingCount: 108,
      bestChantingTime: "At morning dawn facing East or North-East",
      malaType: "Yellow Turmeric (Haldi) Mala or Rudraksha Mala",
      yantraName: "Guru Yantra (Brass/Gold Plated)",
      yantraDirection: "North-East Altar",
      fastingDay: "Thursdays (Brihaspati Vrat)",
      fastingProtocol: "Consume yellow foods (chana dal, turmeric rice, banana); avoid salt and papaya on fasting day.",
      donationItems: ["Chana dal", "Turmeric roots", "Yellow laddoo", "Educational books", "Yellow clothes"],
      donationTarget: "Teachers, scholars, temple priests, or needy students",
      bestDonationDay: "Thursday noon",
      herbalBotanicalRemedy: "Apply a small tilak of pure Chandan and Turmeric on forehead daily.",
      lifestyleHabits: [
        "Express gratitude and respect towards teachers, gurus, and elders.",
        "Donate books and educational material to students.",
        "Water a Peepal or Banana tree every Thursday morning."
      ]
    }
  },

  4: {
    number: 4,
    rulingPlanet: "Rahu / Saturn",
    archetype: "The Methodical Architect & Disrupter",
    deity: "Lord Ganesha / Goddess Durga",
    element: "Earth Element (Prithvi)",
    keyVibration: "Methodical precision, reliable practical intelligence, structural building, and disciplined focus.",
    luckyNumbers: [4, 8, 1],
    primaryLuckyNumbers: [4, 8, 1],
    secondaryLuckyNumbers: [2, 7],
    friendlyNumbers: [4, 8, 1, 2, 7],
    neutralNumbers: [6, 9],
    enemyNumbers: [3, 5],
    colorData: {
      primaryLuckyColors: ["Blue", "Grey", "Dark Brown", "Electric Blue"],
      powerShades: ["Electric Blue", "Navy Blue", "Steel Grey"],
      neutralColors: ["Navy", "Charcoal", "Dark Green"],
      avoidColors: ["Bright Red", "Flamboyant Orange"],
      hexCodes: ["#4682B4", "#708090", "#2F4F4F", "#00008B"],
      colorPsychology: "Blue and steel grey frequencies provide grounded focus, structural discipline, and protection against chaos.",
      wardrobeApplication: "Wear blue, slate grey, or dark brown on Saturdays, for important practical work, and for serious studying."
    },
    directionData: {
      cardinalDirection: "South & West (Nairrutya Kona)",
      vastuZone: "South-West & West",
      element: "Earth & Stability Element",
      powerSectorUsage: [
        "Locate master office desk or heavy stability items in South-West sector.",
        "Keep South-West heavy, solid, and structurally grounded.",
        "Face South or West for methodical focus."
      ],
      avoidPlacement: [
        "Avoid hollow cutouts or toilets in South-West.",
        "Do not leave South-West clutter-ridden."
      ],
      facingDirectionWork: "Face South or West for methodical focus and systematic building.",
      facingDirectionSleep: "Sleep with head pointing South (Earth's magnetic stability).",
      spatialRemedy: "Place a heavy brass elephant or Rahu/Shani Yantra in South-West sector."
    },
    gemstoneData: {
      primaryGemstone: "Hessonite Garnet (Gomed) / Blue Sapphire (Neelam)",
      sanskritName: "Gomed / Neelam",
      substituteCrystals: ["Brown Zircon", "Blue Tanzanite", "Iolite (Neeli)"],
      governingPlanet: "Rahu / Saturn",
      wearingMetal: "Silver or Panchaloha (5-metal alloy)",
      recommendedFinger: "Middle finger of the right hand",
      auspiciousDay: "Saturday morning during Rahu/Saturn hora",
      auspiciousTime: "Saturday morning hora",
      wearingMantra: "Om Rahave Namah / Om Shanaischaraya Namah (Recite 108 times)",
      purificationProcess: "MANDATORY 3-day proximity trial before skin contact. Wash in raw cow's milk, place on brown/blue cloth, chant 108 times.",
      disclaimer: MANDATORY_GEMSTONE_DISCLAIMER
    },
    remedyData: {
      bijaMantra: "Om Bhram Bhrim Bhrom Sah Rahave Namah",
      planetaryMantra: "Om Rahave Namah / Durga Chalisa",
      chantingCount: 108,
      bestChantingTime: "At dusk facing West or South-West",
      malaType: "Rudraksha Mala or Onyx Mala",
      yantraName: "Rahu Yantra / Shani Yantra",
      yantraDirection: "South-West Corner",
      fastingDay: "Saturdays",
      fastingProtocol: "Avoid alcohol and non-veg; consume sesame seeds, black tea, or simple grains.",
      donationItems: ["Black sesame seeds", "Mustard oil", "Blankets", "Lead or iron items"],
      donationTarget: "Sanitation workers, disabled individuals, or old age homes",
      bestDonationDay: "Saturday evening",
      herbalBotanicalRemedy: "Add Durva grass and camphor drops to bathwater.",
      lifestyleHabits: [
        "Worship Lord Ganesha regularly to eliminate sudden structural obstacles.",
        "Maintain absolute honesty in financial and legal documentation.",
        "Keep household electrical wiring in perfect repair."
      ]
    }
  },

  5: {
    number: 5,
    rulingPlanet: "Mercury (Budha)",
    archetype: "The Dynamic Communicator & Trader",
    deity: "Lord Vishnu / Goddess Saraswati",
    element: "Earth / Air (Prithvi-Vayu)",
    keyVibration: "Dynamic versatility, commercial acumen, verbal eloquence, rapid adaptability, and networking agility.",
    luckyNumbers: [5, 1, 3],
    primaryLuckyNumbers: [5, 1, 3],
    secondaryLuckyNumbers: [7, 9],
    friendlyNumbers: [5, 1, 3, 7, 9],
    neutralNumbers: [6],
    enemyNumbers: [2, 4, 8],
    colorData: {
      primaryLuckyColors: ["Green", "Turquoise", "Light Blue", "Lime"],
      powerShades: ["Emerald Green", "Parrot Green", "Mint Green"],
      neutralColors: ["Mixed patterns", "Multiple colours", "Multi-print"],
      avoidColors: ["Single muddy dark colours"],
      hexCodes: ["#50C878", "#2ECC71", "#40E0D0", "#00FF7F"],
      colorPsychology: "Green frequencies stimulate mental versatility, commercial intelligence, nervous system balance, and eloquent communication.",
      wardrobeApplication: "Wear green, turquoise, or multi-print patterns on Wednesdays, for business meetings, networking, and sales negotiations."
    },
    directionData: {
      cardinalDirection: "North (Kubera Stan)",
      vastuZone: "North (Zone of Business Opportunities & Wealth)",
      element: "Mercury Air/Water Flow",
      powerSectorUsage: [
        "Locate accounting, sales, trading computers, and communication hubs in North sector.",
        "Place indoor green plants (Money plant, Bamboo) in North sector.",
        "Keep North open, well-ventilated, and decorated with green accents."
      ],
      avoidPlacement: [
        "Avoid placing heavy storage or red fire altars in North.",
        "Do not leave North sector dark or cluttered."
      ],
      facingDirectionWork: "Face North for Mercury's communicative flow, commercial acumen, and trading clarity.",
      facingDirectionSleep: "Sleep with head pointing North (Mercury's communication lines).",
      spatialRemedy: "Place a green aventurine tree or Budha Yantra in the North sector."
    },
    gemstoneData: {
      primaryGemstone: "Emerald (Panna)",
      sanskritName: "Panna",
      substituteCrystals: ["Green Tourmaline", "Peridot"],
      governingPlanet: "Mercury",
      wearingMetal: "14K/18K Gold or Silver",
      recommendedFinger: "Little finger of the right hand",
      auspiciousDay: "Wednesday morning during Mercury hora",
      auspiciousTime: "Mercury Hora at sunrise",
      wearingMantra: "Om Budhaya Namaha (Recite 108 times before wearing)",
      purificationProcess: "Wash in raw cow's milk, place on green cloth, chant 'Om Budhaya Namaha' 108 times before wearing.",
      disclaimer: MANDATORY_GEMSTONE_DISCLAIMER
    },
    remedyData: {
      bijaMantra: "Om Bram Brim Brom Sah Budhaya Namah",
      planetaryMantra: "Om Budhaya Namaha / Vishnu Sahasranama",
      chantingCount: 108,
      bestChantingTime: "In the morning facing North",
      malaType: "108-bead Rudraksha or Green Jade Mala",
      yantraName: "Budha Yantra (Copper/Brass)",
      yantraDirection: "North Wall",
      fastingDay: "Wednesdays (Budha Vrat)",
      fastingProtocol: "Consume green vegetables, mung dal, and avoid heavy spices.",
      donationItems: ["Whole green mung dal", "Green spinach / fodder for cows", "Green clothes", "Stationery / books"],
      donationTarget: "Students, orphanages, or cow shelters (gaushalas)",
      bestDonationDay: "Wednesday morning",
      herbalBotanicalRemedy: "Consume 3 fresh Tulsi leaves daily.",
      lifestyleHabits: [
        "Feed green grass or spinach to cows every Wednesday.",
        "Maintain meticulous record-keeping and clear verbal contracts.",
        "Chant Vishnu Sahasranama or Saraswati Vandana for intellectual sharpness."
      ]
    }
  },

  6: {
    number: 6,
    rulingPlanet: "Venus (Shukra)",
    archetype: "The Harmonious Artist & Provider",
    deity: "Goddess Lakshmi / Goddess Shukra Devi",
    element: "Water / Earth (Jala-Prithvi)",
    keyVibration: "Warm responsible beauty, loving care, aesthetic refinement, artistic harmony, and luxury abundance.",
    luckyNumbers: [6, 2, 9],
    primaryLuckyNumbers: [6, 2, 9],
    secondaryLuckyNumbers: [3, 4],
    friendlyNumbers: [6, 2, 9, 3, 4],
    neutralNumbers: [1, 8],
    enemyNumbers: [5, 7],
    colorData: {
      primaryLuckyColors: ["Pink", "Rose Gold", "Indigo", "Cream", "Pale Blue"],
      powerShades: ["Pink", "Rose Gold", "Cream"],
      neutralColors: ["Light Purple", "Soft Green", "White"],
      avoidColors: ["Harsh Red", "Black", "Dark Muddy Colours"],
      hexCodes: ["#FFB6C1", "#B76E79", "#4B0082", "#FFFDD0"],
      colorPsychology: "Pink and cream wavelengths radiate magnetic charm, soothe emotional tension, and cultivate artistic harmony.",
      wardrobeApplication: "Wear pink, rose gold, cream, or pale blue on Fridays, during romantic, family, or creative events."
    },
    directionData: {
      cardinalDirection: "South-East (Agneya Kona)",
      vastuZone: "South-East (Zone of Cash Flow & Venus Energy)",
      element: "Water / Earth Element",
      powerSectorUsage: [
        "Place kitchen, creative studios, or beauty/design areas in South-East.",
        "Keep South-East warm, aesthetically pleasing, and well-lit.",
        "Face East or South-East for Venus creativity."
      ],
      avoidPlacement: [
        "Avoid placing heavy dark storage or dirty clutter in South-East.",
        "Do not leave South-East damp or unlit."
      ],
      facingDirectionWork: "Face East or South-East for Venus creative inspiration and aesthetic harmony.",
      facingDirectionSleep: "Sleep with head pointing East or South-East.",
      spatialRemedy: "Keep a rose quartz cluster or Shukra Yantra in South-East corner."
    },
    gemstoneData: {
      primaryGemstone: "Diamond / White Sapphire",
      sanskritName: "Heera / White Sapphire",
      substituteCrystals: ["White Topaz", "White Zircon", "Clear Quartz"],
      governingPlanet: "Venus",
      wearingMetal: "Platinum, White Gold, or Silver",
      recommendedFinger: "Middle finger or ring finger of the right hand",
      auspiciousDay: "Friday morning during Venus hora",
      auspiciousTime: "Venus Hora at sunrise",
      wearingMantra: "Om Shukraya Namaha (Recite 108 times before wearing)",
      purificationProcess: "Wash in raw cow's milk, place on white or pink cloth, chant 'Om Shukraya Namaha' 108 times before wearing.",
      disclaimer: MANDATORY_GEMSTONE_DISCLAIMER
    },
    remedyData: {
      bijaMantra: "Om Dram Drim Drom Sah Shukraya Namah",
      planetaryMantra: "Om Shukraya Namaha / Mahalakshmi Ashtakam",
      chantingCount: 108,
      bestChantingTime: "In the morning or dusk facing South-East/East",
      malaType: "Sphatik (Crystal) Mala or White Lotus Seed Mala",
      yantraName: "Shukra Yantra (Silver/Copper)",
      yantraDirection: "South-East Wall",
      fastingDay: "Fridays (Shukra Vrat)",
      fastingProtocol: "Consume white sweet dishes (kheer, curd, milk items); refrain from harsh speech.",
      donationItems: ["White camphor", "Fragrant white rice", "Curd", "Silk clothes", "Perfumes"],
      donationTarget: "Needy women, artists, or young girls",
      bestDonationDay: "Friday evening",
      herbalBotanicalRemedy: "Bathe with sandalwood water or rose essential oil.",
      lifestyleHabits: [
        "Chant Sri Suktam or Mahalakshmi Stotram on Friday mornings.",
        "Maintain pristine cleanliness in living spaces, car, and wardrobe.",
        "Treat spouse, women, and partners with profound affection and honor."
      ]
    }
  },

  7: {
    number: 7,
    rulingPlanet: "Ketu (South Lunar Node)",
    archetype: "The Spiritual Researcher & Mystic",
    deity: "Lord Ganesha / Lord Narasimha",
    element: "Fire / Space Element",
    keyVibration: "Analytical depth, specialist wisdom, intuitive penetration, spiritual research, and profound inner knowing.",
    luckyNumbers: [7, 1, 5],
    primaryLuckyNumbers: [7, 1, 5],
    secondaryLuckyNumbers: [2, 4, 9],
    friendlyNumbers: [7, 1, 5, 2, 4, 9],
    neutralNumbers: [6],
    enemyNumbers: [3, 8],
    colorData: {
      primaryLuckyColors: ["Violet", "Deep Purple", "Dark Blue", "Grey"],
      powerShades: ["Violet", "Deep Purple", "Slate Grey"],
      neutralColors: ["Black", "Indigo", "Silver"],
      avoidColors: ["Bright Red", "Gaudy Orange", "Loud Yellow"],
      hexCodes: ["#8A2BE2", "#4B0082", "#00008B", "#808080"],
      colorPsychology: "Violet and grey frequencies quiet mental chatter, deepen analytical introspection, and stimulate crown chakra intuition.",
      wardrobeApplication: "Wear violet, deep purple, or grey on Saturdays/Tuesdays, during study, meditation, and research."
    },
    directionData: {
      cardinalDirection: "South-West & North-East",
      vastuZone: "South-West (Depth) & North-East (Spiritual)",
      element: "Ketu Fire/Space Element",
      powerSectorUsage: [
        "Set up study desk, research libraries, or meditation corners in South-West or North-East.",
        "Keep meditation space quiet, tranquil, and elevated.",
        "Face South-West for Ketu's depth or East at sunrise."
      ],
      avoidPlacement: [
        "Avoid loud entertainment setups in research zones.",
        "Do not store broken old footwear in Ketu zones."
      ],
      facingDirectionWork: "Face South-West for Ketu's analytical depth and research focus.",
      facingDirectionSleep: "Sleep with head pointing South or East.",
      spatialRemedy: "Place a cat's eye crystal sphere or Ketu Yantra in the spiritual sanctuary."
    },
    gemstoneData: {
      primaryGemstone: "Cat's Eye (Lehsunia)",
      sanskritName: "Lehsunia / Vaidurya",
      substituteCrystals: ["Tiger's Eye"],
      governingPlanet: "Ketu",
      wearingMetal: "Silver or Panchaloha",
      recommendedFinger: "Middle finger or ring finger of the right hand",
      auspiciousDay: "Tuesday or Thursday morning",
      auspiciousTime: "Ketu / Mars Hora",
      wearingMantra: "Om Ketave Namaha (Recite 108 times before wearing)",
      purificationProcess: "3-day proximity trial recommended. Wash in raw cow's milk, place on grey/dark cloth, chant 'Om Ketave Namaha' 108 times.",
      disclaimer: MANDATORY_GEMSTONE_DISCLAIMER
    },
    remedyData: {
      bijaMantra: "Om Stram Strim Strom Sah Ketave Namah",
      planetaryMantra: "Om Ketave Namaha / Ganesha Atharvashirsha",
      chantingCount: 108,
      bestChantingTime: "At dawn or night facing North-East",
      malaType: "108-bead Rudraksha Mala or Cat's Eye Bead Mala",
      yantraName: "Ketu Yantra (Lead/Brass)",
      yantraDirection: "North-East Altar",
      fastingDay: "Tuesdays or Thursdays",
      fastingProtocol: "Simple vegetarian food; abstain from salt during the day.",
      donationItems: ["Multi-colored blankets", "Sesame seeds", "Flag (Dhwaja) to a temple", "Food for street dogs"],
      donationTarget: "Street dogs, spiritual monks, or destitute hermits",
      bestDonationDay: "Tuesday or Thursday evening",
      herbalBotanicalRemedy: "Use essential oil of Cedarwood or Frankincense during meditation.",
      lifestyleHabits: [
        "Feed stray dogs regularly.",
        "Recite Ganesha Atharvashirsha for mental tranquility.",
        "Maintain a daily 20-minute silent meditation practice."
      ]
    }
  },

  8: {
    number: 8,
    rulingPlanet: "Saturn (Shani)",
    archetype: "The Master Executive & Karma Yogi",
    deity: "Lord Shani / Lord Hanuman",
    element: "Air Element (Vayu)",
    keyVibration: "Executive authority, material intelligence, structural discipline, karmic justice, and strategic perseverance.",
    luckyNumbers: [8, 4, 1],
    primaryLuckyNumbers: [8, 4, 1],
    secondaryLuckyNumbers: [3, 6],
    friendlyNumbers: [8, 4, 1, 3, 6],
    neutralNumbers: [9],
    enemyNumbers: [2, 5, 7],
    colorData: {
      primaryLuckyColors: ["Dark Blue", "Black", "Dark Maroon", "Deep Brown"],
      powerShades: ["Dark Blue", "Navy Blue", "Black"],
      neutralColors: ["Dark Grey", "Navy", "Dark Purple"],
      avoidColors: ["Bright Loud Colours generally"],
      hexCodes: ["#00008B", "#000000", "#800000", "#654321"],
      colorPsychology: "Dark blue and black wavelengths ground executive authority, strengthen structural focus, and shield against karmic turbulence.",
      wardrobeApplication: "Wear dark blue, navy, or black on Saturdays, for executive meetings, board reviews, and serious negotiations."
    },
    directionData: {
      cardinalDirection: "West (Paschim / Varuna)",
      vastuZone: "West (Zone of Gains & Saturn Discipline)",
      element: "Air & Structure Element",
      powerSectorUsage: [
        "Locate executive office, dining space, or heavy structural archives in West sector.",
        "Keep West sturdy, heavy, and structurally sound.",
        "Face West for Saturn's setting-sun discipline and executive authority."
      ],
      avoidPlacement: [
        "Avoid clutter or unwashed dishes in West sector.",
        "Do not leave West sector structurally weak."
      ],
      facingDirectionWork: "Face West for Saturn's setting-sun discipline and executive authority.",
      facingDirectionSleep: "Sleep with head pointing South (Saturn's grounding weight).",
      spatialRemedy: "Place an iron sphere or Shani Yantra in West sector."
    },
    gemstoneData: {
      primaryGemstone: "Blue Sapphire (Neelam)",
      sanskritName: "Neelam",
      substituteCrystals: ["Blue Tanzanite", "Iolite (Neeli)", "Blue Tourmaline"],
      governingPlanet: "Saturn",
      wearingMetal: "Silver or Panchaloha (5-metal alloy)",
      recommendedFinger: "Middle finger of the right hand",
      auspiciousDay: "Saturday morning during Saturn hora, Shukla Paksha",
      auspiciousTime: "Saturn Hora at sunrise",
      wearingMantra: "Om Shanaischaraya Namaha (Recite 108 times before wearing)",
      purificationProcess: "MANDATORY 3-day proximity trial. Wash in raw cow's milk mixed with Gangajal, place on dark blue/black cloth, chant 108 times.",
      disclaimer: MANDATORY_GEMSTONE_DISCLAIMER
    },
    remedyData: {
      bijaMantra: "Om Pram Prim Prom Sah Shanaishcharaya Namah",
      planetaryMantra: "Om Shanaischaraya Namaha / Hanuman Chalisa",
      chantingCount: 108,
      bestChantingTime: "In the evening at sunset facing West",
      malaType: "108-bead Rudraksha Mala or Black Agate Mala",
      yantraName: "Shani Yantra (Iron/Panchdhatu)",
      yantraDirection: "West Wall",
      fastingDay: "Saturdays (Shani Vrat)",
      fastingProtocol: "Consume sesame seeds, black gram (urad dal); avoid salt and milk after sunset.",
      donationItems: ["Black mustard oil", "Black urad dal", "Iron utensils", "Black shoes / umbrellas", "Dark blue clothes"],
      donationTarget: "Manual laborers, street cleaners, elderly individuals",
      bestDonationDay: "Saturday evening",
      herbalBotanicalRemedy: "Light a mustard oil lamp under a Peepal tree every Saturday evening.",
      lifestyleHabits: [
        "Recite Hanuman Chalisa daily, especially on Saturdays.",
        "Treat blue-collar workers and subordinates with extreme fairness and dignity.",
        "Avoid shortcuts, illegal deals, or breaking promises."
      ]
    }
  },

  9: {
    number: 9,
    rulingPlanet: "Mars (Mangal / Kuja)",
    archetype: "The Courageous Commander & Humanitarian",
    deity: "Lord Hanuman / Lord Murugan",
    element: "Fire Element (Agni)",
    keyVibration: "Universal compassion, courageous initiative, physical vitality, decisive completion power, and humanitarian service.",
    luckyNumbers: [9, 3, 6],
    primaryLuckyNumbers: [9, 3, 6],
    secondaryLuckyNumbers: [1, 2],
    friendlyNumbers: [9, 3, 6, 1, 2],
    neutralNumbers: [4, 7, 8],
    enemyNumbers: [5],
    colorData: {
      primaryLuckyColors: ["Red", "Crimson", "Scarlet", "Coral", "Gold"],
      powerShades: ["Red", "Crimson", "Scarlet"],
      neutralColors: ["Orange", "Dark Rose", "Burgundy"],
      avoidColors: ["Pale Washed-Out Colours that reduce Mars' vitality"],
      hexCodes: ["#FF0000", "#DC143C", "#FF6F61", "#FFD700"],
      colorPsychology: "Red and crimson frequencies ignite courage, bolster physical vitality, and drive decisive completion power.",
      wardrobeApplication: "Wear red, crimson, or coral on Tuesdays, for situations requiring courage, and for leadership initiatives."
    },
    directionData: {
      cardinalDirection: "South (Dakshin / Yama)",
      vastuZone: "South (Zone of Fame, Courage & Victory)",
      element: "Fire Element (Agni)",
      powerSectorUsage: [
        "Locate administrative office, security, or primary bedroom in South sector.",
        "Keep South solid, elevated, and well-lit with warm illumination.",
        "Face South for Mars' decisive forward action or East at sunrise."
      ],
      avoidPlacement: [
        "Avoid placing underground water tanks in South.",
        "Do not leave South walls thin or broken."
      ],
      facingDirectionWork: "Face South for Mars' decisive forward action and courage.",
      facingDirectionSleep: "Sleep with head pointing South or East.",
      spatialRemedy: "Place a red coral or copper Mangal Yantra in South sector."
    },
    gemstoneData: {
      primaryGemstone: "Red Coral (Moonga)",
      sanskritName: "Moonga",
      substituteCrystals: ["Red Carnelian"],
      governingPlanet: "Mars",
      wearingMetal: "22K Gold or Copper",
      recommendedFinger: "Ring finger of the right hand",
      auspiciousDay: "Tuesday morning during Mars hora",
      auspiciousTime: "Mars Hora at sunrise",
      wearingMantra: "Om Mangalaya Namaha (Recite 108 times before wearing)",
      purificationProcess: "Wash in raw cow's milk or Gangajal, place on red cloth, chant 'Om Mangalaya Namaha' 108 times before wearing.",
      disclaimer: MANDATORY_GEMSTONE_DISCLAIMER
    },
    remedyData: {
      bijaMantra: "Om Kram Krim Krom Sah Bhaumaya Namah",
      planetaryMantra: "Om Mangalaya Namaha / Hanuman Chalisa",
      chantingCount: 108,
      bestChantingTime: "In the morning facing East or South",
      malaType: "108-bead Red Coral Mala or Red Sandalwood Mala",
      yantraName: "Mangal Yantra (Copper)",
      yantraDirection: "South Wall",
      fastingDay: "Tuesdays (Mangal Vrat)",
      fastingProtocol: "Consume jaggery, wheat, red lentils; refrain from salt and non-veg food.",
      donationItems: ["Red lentils (Masoor dal)", "Jaggery (Gud)", "Copper utensils", "Red sweets"],
      donationTarget: "Soldiers, blood donors, athletes, or temple Brahmins",
      bestDonationDay: "Tuesday noon",
      herbalBotanicalRemedy: "Donate blood voluntarily or apply red sandalwood paste tilak.",
      lifestyleHabits: [
        "Recite Hanuman Chalisa or Sundarkand every Tuesday.",
        "Engage in vigorous physical exercise or martial fitness.",
        "Channel competitive urges into community service and protective causes."
      ]
    }
  },

  11: {
    number: 11,
    rulingPlanet: "Moon / Sun (Master Number 11)",
    archetype: "The Illuminated Intuitive Visionary",
    deity: "Lord Shiva / Parvati Devi / Surya",
    element: "Ether / Water / Fire",
    keyVibration: "Heightened spiritual illumination, psychic intuition, Master 11 frequency operating through base 2.",
    luckyNumbers: [2, 7, 11],
    primaryLuckyNumbers: [2, 7, 11],
    secondaryLuckyNumbers: [6, 9],
    friendlyNumbers: [2, 7, 11, 6, 9],
    neutralNumbers: [3],
    enemyNumbers: [1, 4, 5, 8],
    colorData: {
      primaryLuckyColors: ["Pearl White", "Silver", "Violet", "Pale Blue"],
      powerShades: ["Moonlight Blue", "Iridescent White"],
      neutralColors: ["Light Green", "Cream", "Light Lavender"],
      avoidColors: ["Black", "Harsh Dark Red", "Muddy Grey"],
      hexCodes: ["#FFFFFF", "#C0C0C0", "#EE82EE", "#B0E0E6"],
      colorPsychology: "Pearl white and silver calm heightened nervous sensitivity while channeling spiritual intuition.",
      wardrobeApplication: "Wear white, silver, or light violet on Mondays, for spiritual teaching, and during intuitive consultations."
    },
    directionData: {
      cardinalDirection: "North-East & North-West",
      vastuZone: "North-East (Spiritual) & North-West (Intuition)",
      element: "Ether & Water Flow",
      powerSectorUsage: [
        "Establish meditation sanctuaries or spiritual study spaces in North-East/North-West.",
        "Keep spaces uncluttered with pure fresh water and soft lighting.",
        "Face North-East or North for intuitive clarity."
      ],
      avoidPlacement: [
        "Avoid heavy clutter or dark storage in North-East."
      ],
      facingDirectionWork: "Face North-East or East for intuitive clarity and illuminated vision.",
      facingDirectionSleep: "Sleep with head pointing North-West or East.",
      spatialRemedy: "Place a silver bowl with water or a crystal sphere in North-East."
    },
    gemstoneData: {
      primaryGemstone: "Natural Pearl (Moti) / Moonstone",
      sanskritName: "Moti / Mukta",
      substituteCrystals: ["Moonstone", "Selenite", "White Sapphire"],
      governingPlanet: "Moon / Master 11",
      wearingMetal: "Pure Sterling Silver",
      recommendedFinger: "Little finger or index finger of the right hand",
      auspiciousDay: "Monday evening during Moon hora",
      auspiciousTime: "Moon Hora at dusk",
      wearingMantra: "Om Chandraya Namaha (Recite 108 times before wearing)",
      purificationProcess: "Wash in raw cow's milk, place on white cloth, chant 'Om Chandraya Namaha' 108 times before wearing.",
      disclaimer: MANDATORY_GEMSTONE_DISCLAIMER
    },
    remedyData: {
      bijaMantra: "Om Shram Shrim Shrom Sah Chandramase Namah",
      planetaryMantra: "Om Chandraya Namaha / Om Namah Shivaya",
      chantingCount: 108,
      bestChantingTime: "At dusk facing North or East",
      malaType: "Sphatik (Crystal) Mala or White Pearl Mala",
      yantraName: "Chandra / Shiva Yantra",
      yantraDirection: "North-East Wall",
      fastingDay: "Mondays",
      fastingProtocol: "Consume white foods; refrain from salty spicy foods after sunset.",
      donationItems: ["White rice", "Milk", "Silver coins", "White clothes"],
      donationTarget: "Mothers, orphanages, or spiritual aspirants",
      bestDonationDay: "Monday evening",
      herbalBotanicalRemedy: "Rose water bath; Sandalwood oil.",
      lifestyleHabits: [
        "Practice daily silent meditation.",
        "Honor maternal figures.",
        "Drink water from a silver vessel."
      ]
    }
  },

  22: {
    number: 22,
    rulingPlanet: "Saturn / Uranus (Master Number 22)",
    archetype: "The Master Architect & Global Builder",
    deity: "Lord Vishwakarma / Lord Brahma",
    element: "Earth / Ether Element",
    keyVibration: "Large-scale practical building, visionary ambition, master structural manifestation operating through base 4.",
    luckyNumbers: [4, 8, 22],
    primaryLuckyNumbers: [4, 8, 22],
    secondaryLuckyNumbers: [6, 11],
    friendlyNumbers: [4, 8, 22, 6, 11],
    neutralNumbers: [1, 2, 7, 9],
    enemyNumbers: [3, 5],
    colorData: {
      primaryLuckyColors: ["Electric Blue", "Navy Blue", "Steel Grey", "Dark Slate"],
      powerShades: ["Electric Blue", "Navy Blue", "Gunmetal Grey"],
      neutralColors: ["Navy", "Charcoal", "Dark Green"],
      avoidColors: ["Flamboyant Bright Red", "Harsh Yellow"],
      hexCodes: ["#4682B4", "#00008B", "#708090", "#2F4F4F"],
      colorPsychology: "Electric blue and navy structure visionary thoughts and ground large-scale execution.",
      wardrobeApplication: "Wear navy suits, slate grey shirts, or royal blue accents on Saturdays, for major architectural or project launches."
    },
    directionData: {
      cardinalDirection: "South-West & West",
      vastuZone: "South-West (Stability) & West (Structure)",
      element: "Earth & Air Element",
      powerSectorUsage: [
        "Locate executive offices, master blueprints, and structural safes in South-West/West.",
        "Keep South-West/West heavy, solid, and structurally grounded.",
        "Face South-West or West for master structural building."
      ],
      avoidPlacement: [
        "Avoid hollow open cutouts or weak structures in South-West."
      ],
      facingDirectionWork: "Face South-West or West for master structural building.",
      facingDirectionSleep: "Sleep with head pointing South.",
      spatialRemedy: "Place heavy granite or brass elephant in South-West."
    },
    gemstoneData: {
      primaryGemstone: "Hessonite Garnet (Gomed) / Blue Sapphire (Neelam)",
      sanskritName: "Gomed / Neelam",
      substituteCrystals: ["Blue Tanzanite", "Iolite", "Smoky Quartz"],
      governingPlanet: "Rahu / Saturn (Master 22)",
      wearingMetal: "Silver or Panchaloha",
      recommendedFinger: "Middle finger of the right hand",
      auspiciousDay: "Saturday morning",
      auspiciousTime: "Saturn/Rahu Hora",
      wearingMantra: "Om Rahave Namah / Om Shanaischaraya Namah (Recite 108 times)",
      purificationProcess: "3-day proximity trial mandatory. Wash in raw cow's milk, place on brown/blue cloth, chant 108 times.",
      disclaimer: MANDATORY_GEMSTONE_DISCLAIMER
    },
    remedyData: {
      bijaMantra: "Om Bhram Bhrim Bhrom Sah Rahave Namah",
      planetaryMantra: "Om Rahave Namah / Hanuman Chalisa",
      chantingCount: 108,
      bestChantingTime: "At dusk or evening facing West",
      malaType: "Rudraksha Mala",
      yantraName: "Rahu / Shani Yantra",
      yantraDirection: "South-West / West Wall",
      fastingDay: "Saturdays",
      fastingProtocol: "Consume sesame seeds and simple grains; refrain from alcohol.",
      donationItems: ["Mustard oil", "Black sesame", "Blankets", "Iron tools"],
      donationTarget: "Sanitation workers, manual laborers, old age homes",
      bestDonationDay: "Saturday evening",
      herbalBotanicalRemedy: "Durva grass and camphor bath.",
      lifestyleHabits: [
        "Absolute honesty in structural and legal documentation.",
        "Honor blue-collar workers and manual laborers.",
        "Recite Hanuman Chalisa regularly."
      ]
    }
  }
};
