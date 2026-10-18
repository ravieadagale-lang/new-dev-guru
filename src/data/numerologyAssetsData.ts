// src/data/numerologyAssetsData.ts

export interface PlanetAsset {
  number: number;
  planetName: string;
  sanskritName: string;
  deity: string;
  deityTitle: string;
  deityImageUrl: string;
  planetImageUrl: string;
  yantraName: string;
  yantraImageUrl: string;
  yantraGeometryType: string;
  crystalName: string;
  crystalImageUrl: string;
  chakraName: string;
  chakraImageUrl: string;
  colorHex: string;
  mantra: string;
}

export const PLANETARY_ASSETS: Record<number, PlanetAsset> = {
  1: {
    number: 1,
    planetName: "Sun",
    sanskritName: "Surya Dev",
    deity: "Lord Surya Bhagwan",
    deityTitle: "The Cosmic Illuminator & King of Celestial Spheres (7-Horse Golden Chariot)",
    deityImageUrl: "/src/assets/images/surya_dev_chariot_1786273054490.jpg",
    planetImageUrl: "/src/assets/images/surya_dev_chariot_1786273054490.jpg",
    yantraName: "Surya Yantra",
    yantraImageUrl: "/src/assets/images/surya_yantra_gold_1786276129800.jpg",
    yantraGeometryType: "9-Grid Golden Solar Square",
    crystalName: "Natural Ruby Gemstone (Manik)",
    crystalImageUrl: "/src/assets/images/manik_ruby_1785334496391.jpg",
    chakraName: "Manipura (Solar Plexus Chakra)",
    chakraImageUrl: "/src/assets/images/manipura_solar_chakra_1786276016412.jpg",
    colorHex: "#f59e0b",
    mantra: "Om Hram Hrim Hrom Sah Suryaya Namah"
  },
  2: {
    number: 2,
    planetName: "Moon",
    sanskritName: "Chandra Dev",
    deity: "Lord Chandra Bhagwan",
    deityTitle: "Divine Nurturer & Governor of Mind, Intuition and Waters",
    deityImageUrl: "/src/assets/images/chandra_dev_deity_1786273952983.jpg",
    planetImageUrl: "/src/assets/images/chandra_dev_deity_1786273952983.jpg",
    yantraName: "Chandra Yantra",
    yantraImageUrl: "/src/assets/images/chandra_yantra_silver_1786276148736.jpg",
    yantraGeometryType: "Silver Concentric Crescent Circle",
    crystalName: "Natural Pearl (Moti)",
    crystalImageUrl: "/src/assets/images/pearl_moti_gemstone_1786275887389.jpg",
    chakraName: "Svadhisthana (Sacral Chakra)",
    chakraImageUrl: "/src/assets/images/svadhisthana_sacral_chakra_1786276001015.jpg",
    colorHex: "#38bdf8",
    mantra: "Om Shram Shrim Shrom Sah Chandraya Namah"
  },
  3: {
    number: 3,
    planetName: "Jupiter",
    sanskritName: "Guru / Brihaspati",
    deity: "Devguru Brihaspati",
    deityTitle: "Grand Preceptor of Gods & Sustainer of Divine Order",
    deityImageUrl: "/src/assets/images/devguru_brihaspati_deity_1786273974773.jpg",
    planetImageUrl: "/src/assets/images/devguru_brihaspati_deity_1786273974773.jpg",
    yantraName: "Guru Yantra",
    yantraImageUrl: "/src/assets/images/sri_yantra_meru_1785334467946.jpg",
    yantraGeometryType: "Golden Lotus Hexagram Square",
    crystalName: "Yellow Sapphire (Pukhraj)",
    crystalImageUrl: "/src/assets/images/pukhraj_topaz_1785334511930.jpg",
    chakraName: "Ajna (Third Eye) Chakra",
    chakraImageUrl: "/src/assets/images/ajna_thirdeye_chakra_1786276078318.jpg",
    colorHex: "#eab308",
    mantra: "Om Gram Grim Grom Sah Gurave Namah"
  },
  4: {
    number: 4,
    planetName: "Rahu",
    sanskritName: "Rahu Dev",
    deity: "Lord Rahu Bhagwan",
    deityTitle: "Master of Maya, Innovation & Unconventional Breakthroughs",
    deityImageUrl: "/src/assets/images/rahu_dev_deity_1786273988366.jpg",
    planetImageUrl: "/src/assets/images/rahu_dev_deity_1786273988366.jpg",
    yantraName: "Rahu Yantra",
    yantraImageUrl: "/src/assets/images/sri_yantra_meru_1785334467946.jpg",
    yantraGeometryType: "Smoky Quartz Grid Matrix",
    crystalName: "Hessonite (Gomed)",
    crystalImageUrl: "/src/assets/images/gomed_hessonite_gemstone_1786275907382.jpg",
    chakraName: "Sahasrara (Crown Chakra)",
    chakraImageUrl: "/src/assets/images/sahasrara_crown_chakra_1786276095648.jpg",
    colorHex: "#64748b",
    mantra: "Om Bhram Bhrim Bhrom Sah Rahave Namah"
  },
  5: {
    number: 5,
    planetName: "Mercury",
    sanskritName: "Budha Dev",
    deity: "Lord Budha Bhagwan",
    deityTitle: "Remover of Obstacles & Master of Intellect, Wisdom and Commerce",
    deityImageUrl: "/src/assets/images/budh_dev_deity_1786274002474.jpg",
    planetImageUrl: "/src/assets/images/budh_dev_deity_1786274002474.jpg",
    yantraName: "Budh Yantra / Ganesha Yantra",
    yantraImageUrl: "/src/assets/images/sri_yantra_meru_1785334467946.jpg",
    yantraGeometryType: "Green Geometry Octagon",
    crystalName: "Vibrant Green Emerald (Panna)",
    crystalImageUrl: "/src/assets/images/panna_emerald_1785334439682.jpg",
    chakraName: "Vishuddha (Throat Chakra)",
    chakraImageUrl: "/src/assets/images/vishuddha_throat_chakra_1786276050745.jpg",
    colorHex: "#10b981",
    mantra: "Om Bram Brim Brom Sah Budhaya Namah"
  },
  6: {
    number: 6,
    planetName: "Venus",
    sanskritName: "Shukra Dev",
    deity: "Lord Shukra Bhagwan (Shukracharya)",
    deityTitle: "Divine Preceptor of Venus, Master of Luxury, Beauty, Arts & Harmony",
    deityImageUrl: "/src/assets/images/shukra_dev_authentic_1786445812858.jpg",
    planetImageUrl: "/src/assets/images/shukra_dev_authentic_1786445812858.jpg",
    yantraName: "Shukra Yantra / Sri Yantra",
    yantraImageUrl: "/src/assets/images/sri_yantra_meru_1785334467946.jpg",
    yantraGeometryType: "9 Interlocking Triangles Sri Chakra",
    crystalName: "Faceted Diamond & Clear Quartz",
    crystalImageUrl: "/src/assets/images/diamond_quartz_gemstone_1786275927582.jpg",
    chakraName: "Anahata (Heart Chakra)",
    chakraImageUrl: "/src/assets/images/anahata_heart_chakra_1786276034062.jpg",
    colorHex: "#ec4899",
    mantra: "Om Dram Drim Drom Sah Shukraya Namah"
  },
  7: {
    number: 7,
    planetName: "Ketu",
    sanskritName: "Ketu Dev",
    deity: "Lord Ketu Bhagwan",
    deityTitle: "Lord of Spiritual Liberation, Intuition & Psychic Wisdom",
    deityImageUrl: "/src/assets/images/ketu_dev_deity_1786274040673.jpg",
    planetImageUrl: "/src/assets/images/ketu_dev_deity_1786274040673.jpg",
    yantraName: "Ketu Yantra",
    yantraImageUrl: "/src/assets/images/sri_yantra_meru_1785334467946.jpg",
    yantraGeometryType: "Cat's Eye Mystic Triangle",
    crystalName: "Cat's Eye (Lehsuniya) Gemstone",
    crystalImageUrl: "/src/assets/images/catseye_lehsuniya_gemstone_1786275941592.jpg",
    chakraName: "Sahasrara (Crown Chakra)",
    chakraImageUrl: "/src/assets/images/sahasrara_crown_chakra_1786276095648.jpg",
    colorHex: "#a855f7",
    mantra: "Om Stram Strim Strom Sah Ketave Namah"
  },
  8: {
    number: 8,
    planetName: "Saturn",
    sanskritName: "Shani Dev",
    deity: "Lord Shani Dev Bhagwan",
    deityTitle: "Divine Judge of Karma, Perseverance & Eternal Justice",
    deityImageUrl: "/src/assets/images/shani_dev_deity_1786274055009.jpg",
    planetImageUrl: "/src/assets/images/shani_dev_deity_1786274055009.jpg",
    yantraName: "Shani Yantra",
    yantraImageUrl: "/src/assets/images/sri_yantra_meru_1785334467946.jpg",
    yantraGeometryType: "Black Iron 3x3 Magic Square Matrix",
    crystalName: "Royal Blue Sapphire (Neelam)",
    crystalImageUrl: "/src/assets/images/blue_sapphire_pristine_1786446956462.jpg",
    chakraName: "Muladhara (Root Chakra)",
    chakraImageUrl: "/src/assets/images/muladhara_root_chakra_1786275984751.jpg",
    colorHex: "#3b82f6",
    mantra: "Om Sham Shanaishcharaya Namah"
  },
  9: {
    number: 9,
    planetName: "Mars",
    sanskritName: "Mangal Dev",
    deity: "Lord Mangal Bhagwan",
    deityTitle: "Divine Commander of Celestial Forces & Protector",
    deityImageUrl: "/src/assets/images/mangal_dev_deity_1786274069128.jpg",
    planetImageUrl: "/src/assets/images/mangal_dev_deity_1786274069128.jpg",
    yantraName: "Mangal Yantra",
    yantraImageUrl: "/src/assets/images/sri_yantra_meru_1785334467946.jpg",
    yantraGeometryType: "Copper Fire Triangle Grid",
    crystalName: "Natural Red Coral (Moonga)",
    crystalImageUrl: "/src/assets/images/red_coral_moonga_gemstone_1786275956607.jpg",
    chakraName: "Muladhara (Root Chakra)",
    chakraImageUrl: "/src/assets/images/muladhara_root_chakra_1786275984751.jpg",
    colorHex: "#ef4444",
    mantra: "Om Kram Krim Krom Sah Bhaumaya Namah"
  }
};

export interface SacredYantraGalleryItem {
  name: string;
  title: string;
  description: string;
  imageUrl?: string;
  is3dMeru?: boolean;
  deity: string;
  deityImageUrl?: string;
  geometryType: string;
  magicSquareSum?: number;
  magicSquareMatrix?: number[][];
  sanskritMantra: string;
  consecrationDirection: string;
  sacredMetal: string;
}

export const SACRED_YANTRAS_GALLERY: SacredYantraGalleryItem[] = [
  {
    name: "Sri Yantra (3D Meru Prastha)",
    title: "Cosmic Mother of All Sacred Geometry & Divine Abundance",
    description: "Constructed with 3D pyramidical elevation of 9 interlocking triangles creating 43 smaller triangles, 16 lotus petals, and 3 outer fortresses (Bhupura). Calibrates ambient spatial prana and attracts supreme Mahalakshmi energy.",
    imageUrl: "/src/assets/images/sri_yantra_meru_1785334467946.jpg",
    is3dMeru: true,
    deity: "Goddess Tripura Sundari / Mahalakshmi",
    deityImageUrl: "/src/assets/images/goddess_lakshmi_deity_1786274968238.jpg",
    geometryType: "3D Pyramidical Meru Geometry (43 Triangles)",
    sanskritMantra: "Om Shreem Hreem Shreem Kamale Kamalalaye Praseeda Praseeda Shreem Hreem Shreem Om Mahalakshmyai Namah",
    consecrationDirection: "North-East (Ishanya Gateway)",
    sacredMetal: "Panchdhatu Gold-Plated Brass"
  },
  {
    name: "Shri Kuber Yantra",
    title: "Treasury of Abundance & Wealth Stabilization",
    description: "Vedic 3x3 Magic Square Matrix where the sum of every row, column, and diagonal equals exactly 72. Attracts cash flow, removes financial blockages, and preserves accumulated wealth.",
    deity: "Lord Kuber (Dhanapati)",
    deityImageUrl: "/src/assets/images/lord_kuber_deity_1786275074624.jpg",
    geometryType: "Gold Brass 3x3 Magic Square Matrix",
    magicSquareSum: 72,
    magicSquareMatrix: [
      [27, 20, 25],
      [22, 24, 26],
      [23, 28, 21]
    ],
    sanskritMantra: "Om Shreem Hreem Kleem Shreem Kleem Vitteshvaraya Namah",
    consecrationDirection: "North (Kubera Direction)",
    sacredMetal: "Gold-Plated Copper"
  },
  {
    name: "Shri Ganesha Yantra",
    title: "Vighnaharta Obstacle & Delay Neutralizer",
    description: "Authentic Karya Siddhi 3x3 Magic Square Matrix with sum of 21 across rows, columns, and diagonals. Clears delays, protects new enterprises, and grants swift obstacle-free success.",
    deity: "Lord Vighnaharta Ganesha",
    deityImageUrl: "/src/assets/images/lord_ganesha_deity_1786274989440.jpg",
    geometryType: "Copper Gold 3x3 Magic Square Matrix",
    magicSquareSum: 21,
    magicSquareMatrix: [
      [8, 3, 10],
      [9, 7, 5],
      [4, 11, 6]
    ],
    sanskritMantra: "Om Gam Ganapataye Namaha",
    consecrationDirection: "East / Main Entrance",
    sacredMetal: "Pure Copper Plate"
  },
  {
    name: "Mahamrityunjaya Yantra",
    title: "Divine Shield of Health, Immunity & Vitality",
    description: "Sacred 3x3 Healing Magic Square Matrix summing to 45 in all directions. Neutralizes chronic health hazards, wards off premature karmic afflictions, and charges spatial life force.",
    deity: "Lord Rudra Shiva",
    deityImageUrl: "/src/assets/images/lord_shiva_deity_1786275008978.jpg",
    geometryType: "Silver Copper 3x3 Magic Square Matrix",
    magicSquareSum: 45,
    magicSquareMatrix: [
      [14, 19, 12],
      [13, 15, 17],
      [18, 11, 16]
    ],
    sanskritMantra: "Om Tryambakam Yajamahe Sugandhim Pushtivardhanam",
    consecrationDirection: "North-East (Ishanya)",
    sacredMetal: "Pure Silver / Copper"
  },
  {
    name: "Shri Kanakdhara Yantra",
    title: "Golden Torrent of Unexpected Fortune",
    description: "Vedic 3x3 Abundance Magic Square with magic sum 30. Inspired by Adi Shankaracharya's Kanakdhara Stotram to invoke sudden financial relief and gold rainfall blessings.",
    deity: "Goddess Mahalakshmi Kanakdhara",
    deityImageUrl: "/src/assets/images/goddess_lakshmi_deity_1786274968238.jpg",
    geometryType: "Gold Diamond 3x3 Magic Square Matrix",
    magicSquareSum: 30,
    magicSquareMatrix: [
      [11, 6, 13],
      [12, 10, 8],
      [7, 14, 9]
    ],
    sanskritMantra: "Om Vang Shreem Trang Amang Sam Hreem Kleem Kanakdharaye Namah",
    consecrationDirection: "North / Cash Vault",
    sacredMetal: "Gold-Plated Brass"
  },
  {
    name: "Durga Beesa Yantra",
    title: "Protective Armor Against Negativity & Evil Eye",
    description: "Vedic 3x3 Protective 'Beesa' Magic Square Matrix with magic sum 20. Highly revered in Shastra as an infallible shield against negativity, black eye, competitor malice, and accidents.",
    deity: "Goddess Durga / Mahakali",
    deityImageUrl: "/src/assets/images/goddess_durga_kali_deity_1786275036681.jpg",
    geometryType: "Crimson Copper 3x3 Beesa Square",
    magicSquareSum: 20,
    magicSquareMatrix: [
      [6, 1, 13],
      [11, 5, 4],
      [3, 14, 3]
    ],
    sanskritMantra: "Om Aing Hreem Kleem Chamundaye Vichche",
    consecrationDirection: "South / Main Entrance",
    sacredMetal: "Thick Copper Plate"
  },
  {
    name: "Shri Saraswati Yantra",
    title: "Illumination of Higher Intellect & Wisdom",
    description: "Sacred 3x3 Wisdom Magic Square Matrix summing to 36. Enhances academic focus, memory retention, musical and artistic mastery, and divine eloquence.",
    deity: "Goddess Saraswati Devi",
    deityImageUrl: "/src/assets/images/goddess_lakshmi_deity_1786274968238.jpg",
    geometryType: "Silver Brass 3x3 Magic Square Matrix",
    magicSquareSum: 36,
    magicSquareMatrix: [
      [13, 8, 15],
      [14, 12, 10],
      [9, 16, 11]
    ],
    sanskritMantra: "Om Aing Saraswatyai Namaha",
    consecrationDirection: "East / Study Area",
    sacredMetal: "Pure Silver / White Metal"
  },
  {
    name: "Shri Hanuman Yantra",
    title: "Vanguard of Courage, Power & Fearlessness",
    description: "Vedic 3x3 Strength Magic Square Matrix summing to 27. Provides immense physical fortitude, nullifies Shani Sade Sati malefic effects, and dispels night terrors.",
    deity: "Lord Mahavira Hanuman",
    deityImageUrl: "/src/assets/images/lord_hanuman_deity_1786275054668.jpg",
    geometryType: "Vermilion Copper 3x3 Magic Square Matrix",
    magicSquareSum: 27,
    magicSquareMatrix: [
      [10, 5, 12],
      [11, 9, 7],
      [6, 13, 8]
    ],
    sanskritMantra: "Om Hanumate Namaha",
    consecrationDirection: "South / South-East",
    sacredMetal: "Red Copper Plate"
  }
];

export interface NumerologicalYantraAsset {
  number: number;
  planetName: string;
  sanskritName: string;
  yantraName: string;
  title: string;
  magicSquareSum: number;
  magicSquareMatrix: number[][];
  geometryType: string;
  sanskritMantra: string;
  description: string;
  imageUrl: string;
  deityName: string;
  deityImageUrl: string;
}

export const NUMEROLOGICAL_YANTRAS_1_TO_9: NumerologicalYantraAsset[] = [
  {
    number: 1,
    planetName: "Sun",
    sanskritName: "Surya Dev",
    yantraName: "Surya Yantra (Number 1 Solar Matrix)",
    title: "Golden Solar 15-Grid Matrix of Leadership & Authority",
    magicSquareSum: 15,
    magicSquareMatrix: [
      [6, 1, 8],
      [7, 5, 3],
      [2, 9, 4]
    ],
    geometryType: "Golden Copper 3x3 Magic Square Matrix",
    sanskritMantra: "Om Hram Hrim Hrom Sah Suryaya Namah",
    description: "Channelizes vital solar Prana energy. Traditional Vedic 3x3 magic square with magic sum 15 across every row, column, and diagonal bestows royal leadership, vital health, and professional honor.",
    imageUrl: "/src/assets/images/surya_yantra_gold_1786276129800.jpg",
    deityName: "Lord Surya Bhagwan",
    deityImageUrl: "/src/assets/images/surya_dev_chariot_1786273054490.jpg"
  },
  {
    number: 2,
    planetName: "Moon",
    sanskritName: "Chandra Dev",
    yantraName: "Chandra Yantra (Number 2 Lunar Matrix)",
    title: "Silver Lunar 18-Grid Matrix of Peace & Intuition",
    magicSquareSum: 18,
    magicSquareMatrix: [
      [7, 2, 9],
      [8, 6, 4],
      [3, 10, 5]
    ],
    geometryType: "Pure Silver 3x3 Magic Square Matrix",
    sanskritMantra: "Om Shram Shrim Shrom Sah Chandraya Namah",
    description: "Harmonizes emotional fluctuations, boosts creative imagination, and balances bodily fluids. Traditional Vedic 3x3 magic square with magic sum 18 calms mental anxiety.",
    imageUrl: "/src/assets/images/chandra_yantra_silver_1786276148736.jpg",
    deityName: "Lord Chandra Bhagwan",
    deityImageUrl: "/src/assets/images/chandra_dev_deity_1786273952983.jpg"
  },
  {
    number: 3,
    planetName: "Jupiter",
    sanskritName: "Guru / Brihaspati",
    yantraName: "Guru Yantra (Number 3 Jupiter Matrix)",
    title: "Golden Jupiter 27-Grid Matrix of Wisdom & Prosperity",
    magicSquareSum: 27,
    magicSquareMatrix: [
      [10, 5, 12],
      [11, 9, 7],
      [6, 13, 8]
    ],
    geometryType: "Golden Brass 3x3 Magic Square Matrix",
    sanskritMantra: "Om Gram Grim Grom Sah Gurave Namah",
    description: "Attracts spiritual wisdom, academic distinction, financial wealth, and marital harmony. Traditional Vedic 3x3 magic square with magic sum 27 activates divine guidance.",
    imageUrl: "/src/assets/images/surya_yantra_gold_1786276129800.jpg",
    deityName: "Devguru Brihaspati",
    deityImageUrl: "/src/assets/images/devguru_brihaspati_deity_1786273974773.jpg"
  },
  {
    number: 4,
    planetName: "Rahu",
    sanskritName: "Rahu Dev",
    yantraName: "Rahu Yantra (Number 4 Astral Matrix)",
    title: "Smoky Copper 36-Grid Matrix of Illusion Clearance & Innovation",
    magicSquareSum: 36,
    magicSquareMatrix: [
      [13, 8, 15],
      [14, 12, 10],
      [9, 16, 11]
    ],
    geometryType: "Dark Copper 3x3 Magic Square Matrix",
    sanskritMantra: "Om Bhram Bhrim Bhrom Sah Rahave Namah",
    description: "Shields against sudden setbacks, foreign travel obstacles, and mental confusion. Traditional Vedic 3x3 magic square with magic sum 36 unlocks unconventional breakthroughs.",
    imageUrl: "/src/assets/images/sri_yantra_meru_1785334467946.jpg",
    deityName: "Lord Rahu Bhagwan",
    deityImageUrl: "/src/assets/images/rahu_dev_deity_1786273988366.jpg"
  },
  {
    number: 5,
    planetName: "Mercury",
    sanskritName: "Budha Dev",
    yantraName: "Budh Yantra (Number 5 Mercury Matrix)",
    title: "Emerald Green 24-Grid Matrix of Business & Communication",
    magicSquareSum: 24,
    magicSquareMatrix: [
      [9, 4, 11],
      [10, 8, 6],
      [5, 12, 7]
    ],
    geometryType: "Emerald Green 3x3 Magic Square Matrix",
    sanskritMantra: "Om Bram Brim Brom Sah Budhaya Namah",
    description: "Activates commercial success, public speaking confidence, logical intellect, and financial calculation. Traditional Vedic 3x3 magic square with magic sum 24 balances daily trade energy.",
    imageUrl: "/src/assets/images/surya_yantra_gold_1786276129800.jpg",
    deityName: "Lord Budha Bhagwan",
    deityImageUrl: "/src/assets/images/budh_dev_deity_1786274002474.jpg"
  },
  {
    number: 6,
    planetName: "Venus",
    sanskritName: "Shukra Dev",
    yantraName: "Shukra Yantra (Number 6 Venus Matrix)",
    title: "Silver Diamond 30-Grid Matrix of Luxury, Beauty & Harmony",
    magicSquareSum: 30,
    magicSquareMatrix: [
      [11, 6, 13],
      [12, 10, 8],
      [7, 14, 9]
    ],
    geometryType: "Silver Diamond 3x3 Magic Square Matrix",
    sanskritMantra: "Om Dram Drim Drom Sah Shukraya Namah",
    description: "Attracts material elegance, artistic magnetism, romantic affection, and royal comforts. Traditional Vedic 3x3 magic square with magic sum 30 governs abundance cycles.",
    imageUrl: "/src/assets/images/sri_yantra_meru_1785334467946.jpg",
    deityName: "Lord Shukra Bhagwan (Shukracharya)",
    deityImageUrl: "/src/assets/images/shukra_dev_authentic_1786445812858.jpg"
  },
  {
    number: 7,
    planetName: "Ketu",
    sanskritName: "Ketu Dev",
    yantraName: "Ketu Yantra (Number 7 Intuitive Matrix)",
    title: "Smoky Bronze 39-Grid Matrix of Intuition & Spiritual Liberation",
    magicSquareSum: 39,
    magicSquareMatrix: [
      [14, 9, 16],
      [15, 13, 11],
      [10, 17, 12]
    ],
    geometryType: "Smoky Bronze 3x3 Magic Square Matrix",
    sanskritMantra: "Om Stram Strim Strom Sah Ketave Namah",
    description: "Deepens spiritual perception, occult research, detachment from toxic bonds, and psychic shielding. Traditional Vedic 3x3 magic square with magic sum 39 represents cosmic balance.",
    imageUrl: "/src/assets/images/sri_yantra_meru_1785334467946.jpg",
    deityName: "Lord Ketu Bhagwan",
    deityImageUrl: "/src/assets/images/ketu_dev_deity_1786274040673.jpg"
  },
  {
    number: 8,
    planetName: "Saturn",
    sanskritName: "Shani Dev",
    yantraName: "Shani Yantra (Number 8 Karma Matrix)",
    title: "Black Iron 33-Grid Matrix of Karmic Justice & Perseverance",
    magicSquareSum: 33,
    magicSquareMatrix: [
      [12, 7, 14],
      [13, 11, 9],
      [8, 15, 10]
    ],
    geometryType: "Black Iron 3x3 Magic Square Matrix",
    sanskritMantra: "Om Sham Shanaishcharaya Namah",
    description: "Neutralizes Shani Sade Sati challenges, instills steadfast discipline, long-term stability, and patience. Traditional Vedic 3x3 magic square with magic sum 33 balances universal karma.",
    imageUrl: "/src/assets/images/surya_yantra_gold_1786276129800.jpg",
    deityName: "Lord Shani Dev Bhagwan",
    deityImageUrl: "/src/assets/images/shani_dev_deity_1786274055009.jpg"
  },
  {
    number: 9,
    planetName: "Mars",
    sanskritName: "Mangal Dev",
    yantraName: "Mangal Yantra (Number 9 Mars Matrix)",
    title: "Crimson Copper 21-Grid Matrix of Courage & Physical Power",
    magicSquareSum: 21,
    magicSquareMatrix: [
      [8, 3, 10],
      [9, 7, 5],
      [4, 11, 6]
    ],
    geometryType: "Crimson Copper 3x3 Magic Square Matrix",
    sanskritMantra: "Om Kram Krim Krom Sah Bhaumaya Namah",
    description: "Overcomes Manglik afflictions, boosts physical vitality, courage, property investments, and victory over foes. Traditional Vedic 3x3 magic square with magic sum 21 seals physical power.",
    imageUrl: "/src/assets/images/surya_yantra_gold_1786276129800.jpg",
    deityName: "Lord Mangal Bhagwan",
    deityImageUrl: "/src/assets/images/mangal_dev_deity_1786274069128.jpg"
  }
];

export interface ChakraAsset {
  name: string;
  sanskritName: string;
  petals: string;
  element: string;
  bijaMantra: string;
  description: string;
  imageUrl: string;
  associatedNumber: string;
}

export const CHAKRAS_GALLERY: ChakraAsset[] = [
  {
    name: "Root Chakra",
    sanskritName: "Muladhara",
    petals: "4 Petals",
    element: "Earth (Prithvi)",
    bijaMantra: "LAM",
    description: "Grounding, stability, financial security, and survival instincts. Governs Saturn (8) & Mars (9).",
    imageUrl: "/src/assets/images/muladhara_root_chakra_1786275984751.jpg",
    associatedNumber: "Numbers 8 & 9"
  },
  {
    name: "Sacral Chakra",
    sanskritName: "Svadhisthana",
    petals: "6 Petals",
    element: "Water (Jala)",
    bijaMantra: "VAM",
    description: "Emotional fluidity, creative passion, sensuality, and relationship harmony. Governs Moon (2).",
    imageUrl: "/src/assets/images/svadhisthana_sacral_chakra_1786276001015.jpg",
    associatedNumber: "Number 2"
  },
  {
    name: "Solar Plexus Chakra",
    sanskritName: "Manipura",
    petals: "10 Petals",
    element: "Fire (Agni)",
    bijaMantra: "RAM",
    description: "Willpower, confidence, digestive power, leadership, and personal sovereignty. Governs Sun (1).",
    imageUrl: "/src/assets/images/manipura_solar_chakra_1786276016412.jpg",
    associatedNumber: "Number 1"
  },
  {
    name: "Heart Chakra",
    sanskritName: "Anahata",
    petals: "12 Petals",
    element: "Air (Vayu)",
    bijaMantra: "YAM",
    description: "Unconditional love, compassion, beauty, forgiveness, and cardiac resonance. Governs Venus (6).",
    imageUrl: "/src/assets/images/anahata_heart_chakra_1786276034062.jpg",
    associatedNumber: "Number 6"
  },
  {
    name: "Throat Chakra",
    sanskritName: "Vishuddha",
    petals: "16 Petals",
    element: "Ether (Akasha)",
    bijaMantra: "HAM",
    description: "Truthful expression, diplomatic speech, vocal power, and strategic negotiation. Governs Mercury (5).",
    imageUrl: "/src/assets/images/vishuddha_throat_chakra_1786276050745.jpg",
    associatedNumber: "Number 5"
  },
  {
    name: "Third Eye Chakra",
    sanskritName: "Ajna",
    petals: "2 Petals",
    element: "Light (Mahat)",
    bijaMantra: "OM",
    description: "Higher intuition, strategic clarity, clairvoyance, and foresight. Governs Jupiter (3).",
    imageUrl: "/src/assets/images/ajna_thirdeye_chakra_1786276078318.jpg",
    associatedNumber: "Number 3"
  },
  {
    name: "Crown Chakra",
    sanskritName: "Sahasrara",
    petals: "1000 Petals",
    element: "Pure Consciousness",
    bijaMantra: "AUM / SILENCE",
    description: "Cosmic consciousness, spiritual enlightenment, and connection with divine source. Governs Rahu (4) & Ketu (7).",
    imageUrl: "/src/assets/images/sahasrara_crown_chakra_1786276095648.jpg",
    associatedNumber: "Numbers 4 & 7"
  }
];

export interface CrystalGemstoneAsset {
  name: string;
  hindiName: string;
  planet: string;
  number: number;
  benefits: string;
  imageUrl: string;
}

export const CRYSTALS_GEMSTONES_GALLERY: CrystalGemstoneAsset[] = [
  {
    name: "Natural Ruby",
    hindiName: "Manik",
    planet: "Sun",
    number: 1,
    benefits: "Boosts vitality, leadership aura, confidence, and royal success.",
    imageUrl: "/src/assets/images/manik_ruby_1785334496391.jpg"
  },
  {
    name: "Natural Pearl",
    hindiName: "Moti",
    planet: "Moon",
    number: 2,
    benefits: "Calms emotional mind, balances anxiety, brings peaceful intuition.",
    imageUrl: "/src/assets/images/pearl_moti_gemstone_1786275887389.jpg"
  },
  {
    name: "Yellow Sapphire",
    hindiName: "Pukhraj",
    planet: "Jupiter",
    number: 3,
    benefits: "Attracts wisdom, marital bliss, higher learning, and spiritual growth.",
    imageUrl: "/src/assets/images/pukhraj_topaz_1785334511930.jpg"
  },
  {
    name: "Hessonite Garnet",
    hindiName: "Gomed",
    planet: "Rahu",
    number: 4,
    benefits: "Protects against sudden setbacks, clears mental confusion and illusion.",
    imageUrl: "/src/assets/images/gomed_hessonite_gemstone_1786275907382.jpg"
  },
  {
    name: "Vibrant Emerald",
    hindiName: "Panna",
    planet: "Mercury",
    number: 5,
    benefits: "Enhances intellect, memory, public speaking, and commercial acumen.",
    imageUrl: "/src/assets/images/panna_emerald_1785334439682.jpg"
  },
  {
    name: "Natural Diamond",
    hindiName: "Heera",
    planet: "Venus",
    number: 6,
    benefits: "Grants luxury, artistic magnetism, romantic affection, refined charm, and wealth.",
    imageUrl: "/src/assets/images/solitaire_diamond_gemstone_1786280229206.jpg"
  },
  {
    name: "Cat's Eye",
    hindiName: "Lehsuniya",
    planet: "Ketu",
    number: 7,
    benefits: "Sharpens intuitive perception, wards off negative energies and evil eye.",
    imageUrl: "/src/assets/images/catseye_lehsuniya_gemstone_1786275941592.jpg"
  },
  {
    name: "Blue Sapphire",
    hindiName: "Neelam",
    planet: "Saturn",
    number: 8,
    benefits: "Brings rapid discipline, perseverance, protection, and career elevation.",
    imageUrl: "/src/assets/images/blue_sapphire_pristine_1786446956462.jpg"
  },
  {
    name: "Red Coral",
    hindiName: "Moonga",
    planet: "Mars",
    number: 9,
    benefits: "Inspires physical stamina, courage, victory over obstacles, and vigor.",
    imageUrl: "/src/assets/images/red_coral_moonga_gemstone_1786275956607.jpg"
  }
];

export interface MajorDeityAsset {
  name: string;
  title: string;
  sanskritMantra: string;
  description: string;
  imageUrl: string;
  associatedPlanetsOrNumbers: string;
}

export const MAJOR_DEITIES_GALLERY: MajorDeityAsset[] = [
  {
    name: "Goddess Mahalakshmi",
    title: "Goddess of Supreme Wealth, Prosperity & Royal Grace",
    sanskritMantra: "Om Shreem Hreem Shreem Kamale Kamalalaye Praseed Praseed",
    description: "Divine granter of Ashtalakshmi blessings, fortune, and material & spiritual abundance. Governs Number 6 & Planet Venus.",
    imageUrl: "/src/assets/images/goddess_lakshmi_deity_1786274968238.jpg",
    associatedPlanetsOrNumbers: "Venus (6), Jupiter (3)"
  },
  {
    name: "Lord Ganesha (Vighnaharta)",
    title: "Supreme Lord of Intellect & Remover of Obstacles",
    sanskritMantra: "Om Gan Ganapataye Namah",
    description: "Patron deity of wisdom, beginnings, and obstacles removal. Governs Number 5 & Planet Mercury.",
    imageUrl: "/src/assets/images/lord_ganesha_deity_1786274989440.jpg",
    associatedPlanetsOrNumbers: "Mercury (5), Ketu (7)"
  },
  {
    name: "Lord Shiva (Mahadev)",
    title: "Cosmic Consciousness & Supreme Transformer",
    sanskritMantra: "Om Namah Shivaya / Om Tryambakam Yajamahe",
    description: "Supreme source of peace, healing, and liberation from karmic debts. Associated with Saturn (8) & Moon (2).",
    imageUrl: "/src/assets/images/lord_shiva_deity_1786275008978.jpg",
    associatedPlanetsOrNumbers: "Saturn (8), Moon (2)"
  },
  {
    name: "Goddess Durga",
    title: "Divine Mother of Supreme Protection & Invincible Strength",
    sanskritMantra: "Om Dum Durgayei Namah",
    description: "Shields against negative forces, evil eye, fear, and grants victory over internal and external obstacles.",
    imageUrl: "/src/assets/images/goddess_durga_kali_deity_1786275036681.jpg",
    associatedPlanetsOrNumbers: "Rahu (4), Mars (9)"
  },
  {
    name: "Goddess Kali Maa",
    title: "Cosmic Mother of Transformation, Time & Karmic Shield",
    sanskritMantra: "Om Klim Kalikayei Namah / Om Adya Kalikayei Namah",
    description: "Destroys ego, dark forces, spiritual blockages, and grants rapid karmic purification and fearlessness.",
    imageUrl: "/src/assets/images/goddess_kali_deity_1786279400669.jpg",
    associatedPlanetsOrNumbers: "Rahu (4), Ketu (7), Saturn (8)"
  },
  {
    name: "Lord Hanuman (Mahavira)",
    title: "Embodiment of Courage, Strength & Devotion",
    sanskritMantra: "Om Hanumate Namah",
    description: "Shields against Shani Sade Sati, fear, and malefic planetary afflictions.",
    imageUrl: "/src/assets/images/lord_hanuman_deity_1786275054668.jpg",
    associatedPlanetsOrNumbers: "Saturn (8), Mars (9)"
  },
  {
    name: "Lord Kuber (Dhanapati)",
    title: "Divine Treasurer & Keeper of Universal Abundance",
    sanskritMantra: "Om Yakshaya Kuberaya Vaishravanaya Dhanadhanyadhipataye Namah",
    description: "Protector of physical wealth, cash flow, treasure, and business growth.",
    imageUrl: "/src/assets/images/lord_kuber_deity_1786275074624.jpg",
    associatedPlanetsOrNumbers: "Kuber Direction (North), Mercury (5)"
  },
  {
    name: "Lord Vishnu (Narayana)",
    title: "Supreme Preserver & Sovereign Lord of Dharma",
    sanskritMantra: "Om Namo Bhagavate Vasudevaya",
    description: "Sustainer of the universe, granter of spiritual enlightenment and universal harmony.",
    imageUrl: "/src/assets/images/lord_vishnu_deity_1786275095406.jpg",
    associatedPlanetsOrNumbers: "Jupiter (3), Sun (1)"
  }
];

export const LO_SHU_GRID_IMAGE = "/src/assets/images/sri_yantra_meru_1785334467946.jpg";

export interface RudrakshaBeadAsset {
  mukhi: string;
  sanskritName: string;
  deity: string;
  planet: string;
  associatedNumber: string;
  benefits: string;
  mantra: string;
  imageUrl: string;
}

export const RUDRAKSHA_BEADS_GALLERY: RudrakshaBeadAsset[] = [
  {
    mukhi: "1 Mukhi (Eka Mukhi)",
    sanskritName: "एक मुखी रुद्राक्ष",
    deity: "Lord Shiva (Supreme Consciousness)",
    planet: "Sun (Surya)",
    associatedNumber: "Number 1",
    benefits: "Attains supreme consciousness, leadership, willpower, and liberation from karmic blockages.",
    mantra: "Om Hreem Namah",
    imageUrl: "/src/assets/images/one_mukhi_real_1786446164106.jpg"
  },
  {
    mukhi: "2 Mukhi (Dwi Mukhi)",
    sanskritName: "द्वि मुखी रुद्राक्ष",
    deity: "Ardhanarishvara (Shiva-Shakti Balance)",
    planet: "Moon (Chandra)",
    associatedNumber: "Number 2",
    benefits: "Fosters marital harmony, emotional equilibrium, unity in relationships, and calms the mind.",
    mantra: "Om Namah",
    imageUrl: "/src/assets/images/two_mukhi_real_1786446175796.jpg"
  },
  {
    mukhi: "3 Mukhi (Tri Mukhi)",
    sanskritName: "त्रि मुखी रुद्राक्ष",
    deity: "Agni Dev (Fire Deity of Purification)",
    planet: "Mars (Mangal)",
    associatedNumber: "Number 3 & 9",
    benefits: "Purifies past karma, boosts self-confidence, eliminates self-doubt and lethargy.",
    mantra: "Om Kleem Namah",
    imageUrl: "/src/assets/images/three_mukhi_real_1786446185209.jpg"
  },
  {
    mukhi: "4 Mukhi (Chatur Mukhi)",
    sanskritName: "चतुर्भुज रुद्राक्ष",
    deity: "Lord Brahma (Creator of Universe)",
    planet: "Mercury (Budha)",
    associatedNumber: "Number 4 & 5",
    benefits: "Enhances intellect, memory retention, vocal eloquence, scientific acumen, and wisdom.",
    mantra: "Om Hreem Namah",
    imageUrl: "/src/assets/images/four_mukhi_real_1786446197787.jpg"
  },
  {
    mukhi: "5 Mukhi (Panch Mukhi)",
    sanskritName: "पंच मुखी रुद्राक्ष",
    deity: "Kalagni Rudra (Universal Peace & Health)",
    planet: "Jupiter (Brihaspati)",
    associatedNumber: "Number 3 & 5",
    benefits: "Brings mental tranquility, blood pressure balance, spiritual awareness, and overall health.",
    mantra: "Om Hreem Namah",
    imageUrl: "/src/assets/images/five_mukhi_real_1786446207167.jpg"
  },
  {
    mukhi: "6 Mukhi (Shashta Mukhi)",
    sanskritName: "षष्ठ मुखी रुद्राक्ष",
    deity: "Lord Kartikeya (Skanda / Commander)",
    planet: "Venus (Shukra)",
    associatedNumber: "Number 6",
    benefits: "Inspires charismatic attraction, artistic magnetism, focus, courage, and luxury.",
    mantra: "Om Hreem Hoom Namah",
    imageUrl: "/src/assets/images/six_mukhi_real_1786446219688.jpg"
  },
  {
    mukhi: "7 Mukhi (Sapta Mukhi)",
    sanskritName: "सप्त मुखी रुद्राक्ष",
    deity: "Goddess Mahalakshmi (Goddess of Wealth)",
    planet: "Saturn (Shani)",
    associatedNumber: "Number 7 & 8",
    benefits: "Overcomes financial stagnation, attracts luck, removes Shani Sade Sati afflictions.",
    mantra: "Om Hoom Namah",
    imageUrl: "/src/assets/images/seven_mukhi_real_1786446230891.jpg"
  },
  {
    mukhi: "8 Mukhi (Ashta Mukhi)",
    sanskritName: "अष्ट मुखी रुद्राक्ष",
    deity: "Lord Vighnaharta Ganesha",
    planet: "Rahu",
    associatedNumber: "Number 4 & 8",
    benefits: "Removes all obstacles, neutralizes Rahu malefic influences, grants analytical brilliance.",
    mantra: "Om Hoom Namah",
    imageUrl: "/src/assets/images/eight_mukhi_real_1786446243102.jpg"
  },
  {
    mukhi: "9 Mukhi (Nava Mukhi)",
    sanskritName: "नव मुखी रुद्राक्ष",
    deity: "Goddess Durga (Nine Divine Forms)",
    planet: "Ketu",
    associatedNumber: "Number 9 & 7",
    benefits: "Grants fearless protection, energy, spiritual stamina, and destroys fear of enemies.",
    mantra: "Om Hreem Hoom Namah",
    imageUrl: "/src/assets/images/nine_mukhi_real_1786446255786.jpg"
  },
  {
    mukhi: "10 Mukhi (Dasha Mukhi)",
    sanskritName: "दश मुखी रुद्राक्ष",
    deity: "Lord Vishnu (Universal Protector)",
    planet: "All 9 Planets (Graha Shanti)",
    associatedNumber: "Number 1 & 8",
    benefits: "Protects against negative energies, court litigation, evil eye, and balances all 9 planets.",
    mantra: "Om Hreem Namah Namah",
    imageUrl: "/src/assets/images/ten_mukhi_real_1786446268860.jpg"
  },
  {
    mukhi: "11 Mukhi (Ekadasha Mukhi)",
    sanskritName: "एकादश मुखी रुद्राक्ष",
    deity: "11 Rudras / Lord Hanuman",
    planet: "Mars & Saturn",
    associatedNumber: "Number 2 & 9",
    benefits: "Bestows supreme physical strength, fearless confidence, adventurous courage, and protection.",
    mantra: "Om Hreem Hoom Namah",
    imageUrl: "/src/assets/images/eleven_mukhi_real_1786446282161.jpg"
  },
  {
    mukhi: "12 Mukhi (Dwadasha Mukhi)",
    sanskritName: "द्वादश मुखी रुद्राक्ष",
    deity: "Surya Dev (12 Adityas - Solar Glory)",
    planet: "Sun (Surya)",
    associatedNumber: "Number 1 & 3",
    benefits: "Bestows executive authority, magnetic leadership charisma, vitality, and solar brilliance.",
    mantra: "Om Kraum Sraum Raum Namah",
    imageUrl: "/src/assets/images/twelve_mukhi_real_1786446292728.jpg"
  },
  {
    mukhi: "13 Mukhi (Trayodasha Mukhi)",
    sanskritName: "त्रयोदश मुखी रुद्राक्ष",
    deity: "Lord Kamadeva & Lord Indra",
    planet: "Venus & Mercury",
    associatedNumber: "Number 4 & 6",
    benefits: "Unlocks hypnotic charm, persuasive speech, artistic magnetism, wealth, and royal favor.",
    mantra: "Om Hreem Namah",
    imageUrl: "/src/assets/images/thirteen_mukhi_real_1786446305413.jpg"
  },
  {
    mukhi: "14 Mukhi (Chaturdasha Mukhi - Dev Mani)",
    sanskritName: "चतुर्दश मुखी रुद्राक्ष (देव मणि)",
    deity: "Lord Shiva & Lord Hanuman (Third Eye)",
    planet: "Saturn & Rahu",
    associatedNumber: "Number 5 & 8",
    benefits: "Awakens the Ajna Chakra (Third Eye intuition), grants prophetic foresight and karmic supreme protection.",
    mantra: "Om Namah",
    imageUrl: "/src/assets/images/fourteen_mukhi_real_1786446318414.jpg"
  },
  {
    mukhi: "15 Mukhi (Panchadasa Mukhi)",
    sanskritName: "पञ्चदश मुखी रुद्राक्ष",
    deity: "Lord Pashupatinath (Protector of Souls)",
    planet: "Mercury & Rahu",
    associatedNumber: "Number 6 & 1",
    benefits: "Purifies heart chakra, releases subconscious trauma, bestows spiritual liberation and immense prosperity.",
    mantra: "Om Hreem Namah",
    imageUrl: "/src/assets/images/fifteen_mukhi_real_1786446611951.jpg"
  },
  {
    mukhi: "16 Mukhi (Shodasha Mukhi - Jai Rudraksha)",
    sanskritName: "षोडश मुखी रुद्राक्ष (जय रुद्राक्ष)",
    deity: "Lord Rama & Mahamrityunjaya Shiva",
    planet: "Moon & Ketu",
    associatedNumber: "Number 7 & 2",
    benefits: "Ensures victory over deadly diseases, court disputes, accidents, and bestows divine fearlessness.",
    mantra: "Om Hreem Hoom Namah",
    imageUrl: "/src/assets/images/sixteen_mukhi_real_1786446632476.jpg"
  },
  {
    mukhi: "17 Mukhi (Saptadasa Mukhi)",
    sanskritName: "सप्तदश मुखी रुद्राक्ष",
    deity: "Lord Vishvakarma & Goddess Katyayani",
    planet: "Saturn & Jupiter",
    associatedNumber: "Number 8 & 3",
    benefits: "Attracts unexpected windfalls, real estate wealth, creative mastery, and royal luxury.",
    mantra: "Om Hreem Hoom Hoom Namah",
    imageUrl: "/src/assets/images/seventeen_mukhi_real_1786446647791.jpg"
  },
  {
    mukhi: "18 Mukhi (Ashtadasa Mukhi)",
    sanskritName: "अष्टादश मुखी रुद्राक्ष",
    deity: "Bhumi Devi (Mother Earth Goddess)",
    planet: "Earth Element & Rahu",
    associatedNumber: "Number 9 & 4",
    benefits: "Blesses with land ownership, massive agricultural abundance, real estate gains, and bodily stamina.",
    mantra: "Om Hreem Shreem Namah",
    imageUrl: "/src/assets/images/eighteen_mukhi_real_1786446665647.jpg"
  },
  {
    mukhi: "19 Mukhi (Ekanavimsati Mukhi)",
    sanskritName: "एकोनविंशति मुखी रुद्राक्ष",
    deity: "Lord Narayana (Supreme Sustainer)",
    planet: "Sun & Mercury",
    associatedNumber: "Number 1 & 5",
    benefits: "Fulfills all material desires, grants business monopolies, flawless luck, and stress-free abundance.",
    mantra: "Om Vam Vishnave Namah",
    imageUrl: "/src/assets/images/nineteen_mukhi_real_1786446680700.jpg"
  },
  {
    mukhi: "20 Mukhi (Vimsati Mukhi)",
    sanskritName: "विंशति मुखी रुद्राक्ष",
    deity: "Lord Brahma & 8 Digpalas (Directional Guardians)",
    planet: "All 9 Planets & 28 Nakshatras",
    associatedNumber: "Number 2 & 8",
    benefits: "Awakens cosmic knowledge, architectural mastery, scientific innovation, and protects all 10 directions.",
    mantra: "Om Hreem Hoom Namah",
    imageUrl: "/src/assets/images/twenty_mukhi_real_1786446698342.jpg"
  },
  {
    mukhi: "21 Mukhi (Eka-Vimsati Mukhi - Kuber Rudraksha)",
    sanskritName: "एकविंशति मुखी रुद्राक्ष (कुबेर मणि)",
    deity: "Lord Kuber (Divine Treasurer of Gods)",
    planet: "Kuber / Venus & Jupiter",
    associatedNumber: "Number 3 & 6 (Master Wealth)",
    benefits: "Rare divine gem of Lord Kuber. Bestows infinite wealth, supreme financial empire, luxury, and protects treasures.",
    mantra: "Om Yakshaya Kuberaya Vaishravanaya Dhanadhanyadhipataye Namah",
    imageUrl: "/src/assets/images/twentyone_mukhi_kuber_1786446718019.jpg"
  }
];

export interface NavagrahaDeityFullAsset {
  number: number;
  planetName: string;
  sanskritName: string;
  deityTitle: string;
  mountVehicle: string;
  guidance: string;
  mantra: string;
  worshipDay: string;
  direction: string;
  imageUrl: string;
  attributes: string[];
}

export const NAVAGRAHA_DEITIES_FULL_GALLERY: NavagrahaDeityFullAsset[] = [
  {
    number: 1,
    planetName: "Sun (Surya)",
    sanskritName: "Surya Dev (भगवान सूर्य देव)",
    deityTitle: "The Cosmic Illuminator & King of Celestial Spheres",
    mountVehicle: "Golden Chariot Driven by 7 Divine Horses (Saptashva)",
    guidance: "Governs leadership, vital life force (Prana), soul purpose, authority, and public dignity. Offer Arghya (water) at sunrise on Sundays facing East.",
    mantra: "Om Hram Hrim Hrom Sah Suryaya Namah",
    worshipDay: "Sunday (Ravivar)",
    direction: "East (Purva)",
    imageUrl: "/src/assets/images/surya_dev_chariot_1786273054490.jpg",
    attributes: ["Soul Purpose", "Vital Energy", "Leadership", "Executive Power"]
  },
  {
    number: 2,
    planetName: "Moon (Chandra)",
    sanskritName: "Chandra Dev (भगवान चंद्र देव)",
    deityTitle: "Divine Nurturer & Governor of Mind, Intuition & Water Energies",
    mountVehicle: "Radiant Lunar Crescent Throne Amidst Celestial Clouds",
    guidance: "Calms emotional volatility, sharpens intuitive perception, nurtures mental serenity, and harmonizes interpersonal bonds. Worship on Mondays.",
    mantra: "Om Shram Shrim Shrom Sah Chandraya Namah",
    worshipDay: "Monday (Somvar)",
    direction: "North-West (Vayavya)",
    imageUrl: "/src/assets/images/chandra_dev_deity_1786273952983.jpg",
    attributes: ["Emotional Equilibrium", "Psychic Intuition", "Mental Peace", "Creative Flow"]
  },
  {
    number: 3,
    planetName: "Jupiter (Brihaspati)",
    sanskritName: "Devguru Brihaspati (देवगुरु बृहस्पति)",
    deityTitle: "Grand Preceptor of Gods, Sustainer of Wisdom & Cosmic Law",
    mountVehicle: "Royal Golden Throne Backed by Airavata Divine White Elephant",
    guidance: "Expands higher wisdom, ethical wealth, spiritual consciousness, and academic excellence. Fast or wear yellow on Thursdays.",
    mantra: "Om Gram Grim Grom Sah Gurave Namah",
    worshipDay: "Thursday (Guruvar)",
    direction: "North-East (Ishanya)",
    imageUrl: "/src/assets/images/devguru_brihaspati_deity_1786273974773.jpg",
    attributes: ["Higher Wisdom", "Financial Abundance", "Spiritual Expansion", "Dharma"]
  },
  {
    number: 4,
    planetName: "Rahu",
    sanskritName: "Rahu Dev (भगवान राहु देव)",
    deityTitle: "Master of Maya, Unconventional Breakthroughs & Global Innovation",
    mountVehicle: "Dark Cosmic Serpent Throne with Sword and Shield",
    guidance: "Dissolves illusions, unlocks cutting-edge technology, foreign expansion, and sudden material leaps when anchored in moral discipline.",
    mantra: "Om Bhram Bhrim Bhrom Sah Rahave Namah",
    worshipDay: "Saturday Evening",
    direction: "South-West (Nairutya)",
    imageUrl: "/src/assets/images/rahu_dev_deity_1786273988366.jpg",
    attributes: ["Global Innovation", "Sudden Breakthroughs", "Ambition", "Technological Mastery"]
  },
  {
    number: 5,
    planetName: "Mercury (Budha)",
    sanskritName: "Budha Dev (भगवान बुध देव)",
    deityTitle: "Lord of Intellect, Commercial Acumen & Eloquent Speech",
    mountVehicle: "Emerald Peacock Throne Holding Celestial Globe & Caduceus",
    guidance: "Accelerates intellectual agility, strategic communication, trade, mathematical logic, and youthfulness. Worship on Wednesdays.",
    mantra: "Om Bram Brim Brom Sah Budhaya Namah",
    worshipDay: "Wednesday (Budhavar)",
    direction: "North (Uttara)",
    imageUrl: "/src/assets/images/budh_dev_deity_1786274002474.jpg",
    attributes: ["Strategic Mind", "Business Commerce", "Vocal Eloquence", "Rapid Adaptability"]
  },
  {
    number: 6,
    planetName: "Venus (Shukra)",
    sanskritName: "Shukra Dev (भगवान शुक्र देव)",
    deityTitle: "Preceptor of Venus, Master of Luxury, Arts, Beauty & Divine Harmony",
    mountVehicle: "Radiant White Throne with Kamadhenu Sacred Cow & Peacock Halo",
    guidance: "Attracts marital happiness, aesthetic refinement, artistic magnetism, sensual comfort, and wealth. Worship on Fridays.",
    mantra: "Om Dram Drim Drom Sah Shukraya Namah",
    worshipDay: "Friday (Shukravar)",
    direction: "South-East (Agneya)",
    imageUrl: "/src/assets/images/shukra_dev_authentic_1786445812858.jpg",
    attributes: ["Luxury & Charm", "Artistic Genius", "Romantic Affection", "Harmonious Energy"]
  },
  {
    number: 7,
    planetName: "Ketu",
    sanskritName: "Ketu Dev (भगवान केतु देव)",
    deityTitle: "Lord of Spiritual Liberation, Moksha & Occult Insight",
    mountVehicle: "Mystical Serpent Canopy Throne with Sacred Dhwaja Flag",
    guidance: "Awakens deep self-realization, intuitive psychic perception, detachment from material traps, and karmic healing.",
    mantra: "Om Stram Strim Strom Sah Ketave Namah",
    worshipDay: "Tuesday / Saturday",
    direction: "North-West (Vayavya)",
    imageUrl: "/src/assets/images/ketu_dev_deity_1786274040673.jpg",
    attributes: ["Karmic Liberation", "Occult Wisdom", "Deep Intuition", "Spiritual Detachment"]
  },
  {
    number: 8,
    planetName: "Saturn (Shani)",
    sanskritName: "Shani Dev (भगवान शनि देव)",
    deityTitle: "Supreme Cosmic Judge of Karma, Endurance, Justice & Discipline",
    mountVehicle: "Obsidian Throne Flanked by Sacred Crows & Saturn Rings Aura",
    guidance: "Teaches perseverance, removes karmic debts, instills unyielding discipline, and bestows long-term solid achievements. Worship on Saturdays.",
    mantra: "Om Sham Shanaishcharaya Namah",
    worshipDay: "Saturday (Shanivar)",
    direction: "West (Paschim)",
    imageUrl: "/src/assets/images/shani_dev_deity_1786274055009.jpg",
    attributes: ["Karmic Justice", "Indomitable Endurance", "Long-term Stability", "Patience & Mastery"]
  },
  {
    number: 9,
    planetName: "Mars (Mangal)",
    sanskritName: "Mangal Dev (भगवान मंगल देव)",
    deityTitle: "Divine Commander of Celestial Armies, Energy & Protection",
    mountVehicle: "Crimson Flame Throne with Royal Ram (Aries Mount) & Trident",
    guidance: "Ignites martial courage, physical stamina, decisive action, protection against adversaries, and victory. Worship on Tuesdays.",
    mantra: "Om Kram Krim Krom Sah Bhaumaya Namah",
    worshipDay: "Tuesday (Mangalvar)",
    direction: "South (Dakshin)",
    imageUrl: "/src/assets/images/mangal_dev_deity_1786274069128.jpg",
    attributes: ["Fearless Courage", "Physical Vitality", "Commanding Force", "Protective Shield"]
  }
];


