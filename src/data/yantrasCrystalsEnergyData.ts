// src/data/yantrasCrystalsEnergyData.ts

export interface YantraSpec {
  number: number;
  name: string;
  sanskritName: string;
  planet: string;
  title: string;
  subtitle: string;
  primaryGeometricForm: string;
  petalsCount: number;
  trianglesUp: number;
  trianglesDown: number;
  centerSymbol: string;
  metal: string;
  consecrationDayTime: string;
  facingDirection: string;
  seedMantra: string;
  primaryNavagrahaMantra: string;
  detailedGuidance: string[];
  sacredGeometryElements: string[];
  placementGuidelines: string;
  activationMethod: string;
}

export interface CrystalSpec {
  number: number;
  planet: string;
  primaryCrystal: string;
  substituteCrystals: string[];
  colorRay: string;
  piezoelectricQuality: string;
  chakraResonance: string;
  detailedGuidance: string[];
  bodyPlacement: string;
  environmentalPlacement: string;
  gemElixirProtocol: string;
  affirmation: string;
  cleansingChargingProtocol: string;
}

export interface ChakraSpec {
  chakraNumber: number;
  sanskritName: string;
  englishName: string;
  location: string;
  element: string;
  color: string;
  correspondingNumbers: number[];
  governingPlanets: string[];
  beejaMantra: string;
  primaryCrystals: string[];
  detailedOverview: string;
  balancedState: string;
  blockedState: string;
  healingPractices: string[];
}

export interface YantraCrystalMantraTriad {
  number: number;
  planet: string;
  yantraName: string;
  crystalName: string;
  mantra: string;
  practiceDuration: string;
  instructions: string[];
}

// ============================================================================
// PART 1 & 2: THE NINE PLANETARY YANTRAS DATA
// ============================================================================

export const PLANETARY_YANTRAS_DATA: Record<number, YantraSpec> = {
  1: {
    number: 1,
    name: "Surya Yantra",
    sanskritName: "सूर्य यन्त्र",
    planet: "Sun (Surya)",
    title: "Solar Authority, Vitality & Radiant Command",
    subtitle: "Sacred Geometry of the Central Solar Frequency",
    primaryGeometricForm: "Six-pointed interlocking star (Hexagram of Solar Fire & Lunar Water)",
    petalsCount: 12,
    trianglesUp: 6,
    trianglesDown: 6,
    centerSymbol: "☀ (Bindu of Solar Illumination)",
    metal: "Pure Copper or Gold-plated Copper",
    consecrationDayTime: "Sunday at Sunrise during Sun Hora",
    facingDirection: "East (Facing the Rising Sun)",
    seedMantra: "Om Hram Hrim Hraum Sah Suryaya Namaha",
    primaryNavagrahaMantra: "Om Suryaya Namaha",
    sacredGeometryElements: [
      "Outer Bhupura square with four directional gates regulating physical boundaries.",
      "Circle of 12 lotus petals representing the twelve solar months and Adityas.",
      "Six-pointed star formed by overlapping upward (solar fire) and downward (lunar water) triangles.",
      "Central concentrated Bindu point anchoring pure solar consciousness."
    ],
    detailedGuidance: [
      "The Surya Yantra is the geometric embodiment of the Sun's core vibrational frequency. In Vedic sacred science, the Sun represents the Atman (soul), vitality, leadership, self-realisation, and unshakeable inner authority.",
      "The six-pointed star at the centre of the Surya Yantra represents the perfect equilibrium between the ascending solar pillar (fire) and the descending cosmic receptivity (water). This balance ensures that leadership and authority remain grounded, noble, and benevolent rather than tyrannical.",
      "When installed on an East-facing wall, the Yantra acts as a scalar generator, continuously radiating high-frequency solar vibrations that dissipate lethargy, self-doubt, career stagnation, and lack of clarity. It is the fundamental geometric remedy for Number 1 life paths and individuals with a weak Sun."
    ],
    placementGuidelines: "Install on the East wall of the workspace, prayer sanctuary, or main living area at eye level. Never place on the floor or near rest spaces where soft lunar energy is required.",
    activationMethod: "Perform Prana Pratishtha on a Sunday morning during sunrise. Cleanse with sacred water, apply sandalwood paste, light a ghee lamp, and chant the seed mantra 108 times."
  },
  2: {
    number: 2,
    name: "Chandra Yantra",
    sanskritName: "चन्द्र यन्त्र",
    planet: "Moon (Chandra)",
    title: "Emotional Equilibrium, Intuition & Fluid Receptivity",
    subtitle: "Sacred Geometry of the Lunar Mind & Subconscious Intelligence",
    primaryGeometricForm: "Crescent and upward aspiring triangle within a 16-petaled lotus",
    petalsCount: 16,
    trianglesUp: 1,
    trianglesDown: 0,
    centerSymbol: "☽ (Crescent and Receptive Bindu)",
    metal: "Pure Silver",
    consecrationDayTime: "Monday Evening during Moonrise or Full Moon (Purnima)",
    facingDirection: "North-West (Lunar Vayu Angle)",
    seedMantra: "Om Shram Shrim Shraum Sah Chandraya Namaha",
    primaryNavagrahaMantra: "Om Chandraya Namaha",
    sacredGeometryElements: [
      "Outer square with four gates representing the grounding of fluid emotional energy.",
      "Sixteen lotus petals representing the sixteen digits (Kalasa) and lunar phases.",
      "Inner circular mandala framing an upward-aspiring receptive triangle.",
      "Central Bindu storing pure intuitive peace and soma (nectar of tranquility)."
    ],
    detailedGuidance: [
      "The Chandra Yantra concentrates the soothing, reflective, and intuitive vibrations of the Moon. In sacred geometry, the Moon governs Manas (the emotional mind), memory, subconscious perception, and relational empathy.",
      "The sixteen-petaled lotus represents complete emotional evolution through the sixteen lunar digits. It works directly upon the astral body, calming mental turbulence, anxiety, mood swings, and emotional volatility.",
      "Positioned in the North-West or sleeping sanctuary, the Chandra Yantra creates a serene sanctuary that restores deep restful sleep, heightens psychic intuition, and heals deep-seated relational wounds."
    ],
    placementGuidelines: "Install in the North-West area or near the sleeping area at heart level. Ideal for spaces dedicated to meditation, counseling, or creative reflection.",
    activationMethod: "Consecrate on a Monday evening or Full Moon night. Offer white flowers, milk, and clear water while reciting 108 repetitions of the lunar seed mantra."
  },
  3: {
    number: 3,
    name: "Guru Yantra",
    sanskritName: "गुरु यन्त्र",
    planet: "Jupiter (Brihaspati)",
    title: "Wisdom, Universal Expansion & Spiritual Blessing",
    subtitle: "Sacred Geometry of Supreme Knowledge & Abundance",
    primaryGeometricForm: "Four interlocking triangles creating an eight-pointed star in a 12-petaled lotus",
    petalsCount: 12,
    trianglesUp: 2,
    trianglesDown: 2,
    centerSymbol: "♃ (Bindu of Divine Wisdom)",
    metal: "Gold, Gold-plated Brass, or Yellow Copper",
    consecrationDayTime: "Thursday Morning during Jupiter Hora",
    facingDirection: "North-East (Ishanya - The Divine Gateway)",
    seedMantra: "Om Gram Grim Graum Sah Gurave Namaha",
    primaryNavagrahaMantra: "Om Gurave Namaha",
    sacredGeometryElements: [
      "Outer square with gates anchoring divine wisdom into material reality.",
      "Ring of 12 lotus petals corresponding to Jupiter's 12-year solar orbital arc.",
      "Eight-pointed star formed by four interlocking equilateral triangles.",
      "Golden central Bindu embodying supreme light, dharma, and higher learning."
    ],
    detailedGuidance: [
      "The Guru Yantra is dedicated to Brihaspati (Jupiter), the preceptor of the gods. Jupiter represents divine grace, higher philosophy, spiritual wisdom, ethical wealth, and boundless optimism.",
      "The geometric structure of four interlocking triangles creates eight points representing the Ashtasiddhis (eight divine powers) and the expansion of consciousness across all dimensions of life.",
      "Placing the Guru Yantra in the North-East direction unlocks stuck luck, accelerates spiritual evolution, protects academic and professional pursuits, and attracts righteous prosperity."
    ],
    placementGuidelines: "Place in the North-East corner of the residence, study room, library, or altar. Ensure the area is kept scrupulously clean and elevated.",
    activationMethod: "Consecrate on Thursday morning during Jupiter Hora with yellow flowers, turmeric, and incense. Recite the Brihaspati mantra 108 times."
  },
  4: {
    number: 4,
    name: "Rahu Yantra",
    sanskritName: "राहु यन्त्र",
    planet: "Rahu (North Node)",
    title: "Breakthrough Innovation, Clarity & Systemic Mastery",
    subtitle: "Sacred Geometry for Neutralising Confusion & Dissolving Obstacles",
    primaryGeometricForm: "Overlapping rotated squares creating an 8-pointed star in an 8-petaled lotus",
    petalsCount: 8,
    trianglesUp: 0,
    trianglesDown: 0,
    centerSymbol: "☊ (Central Point of Focused Transformation)",
    metal: "Lead, Iron, or Alloys",
    consecrationDayTime: "Saturday Evening during Rahu Kalam or Sunset",
    facingDirection: "South-West (Nairrutya - Direction of Stability)",
    seedMantra: "Om Bhram Bhrim Bhraum Sah Rahave Namaha",
    primaryNavagrahaMantra: "Om Rahave Namaha",
    sacredGeometryElements: [
      "Outer square boundary enclosing a protective double-square matrix.",
      "Eight-petaled lotus neutralizing chaotic or illusionary astral influences.",
      "Overlapping 8-pointed star breaking through illusion and hidden blockages.",
      "Central Bindu focusing scattered mental energy into laser precision."
    ],
    detailedGuidance: [
      "The Rahu Yantra is designed to transmute the chaotic, disruptive, and obsessive tendencies of Rahu into extraordinary worldly acumen, unconventional brilliance, and rapid breakthrough.",
      "When Rahu is unharmonized, it generates mental fog, sudden setbacks, addiction to illusion, and severe anxiety. The sacred geometry of the Rahu Yantra stabilizes these volatile wave patterns.",
      "Positioned in the South-West, it grounds erratic energies, stabilizes structural foundation, protects against hidden enemies, and converts unconventional ideas into tangible successes."
    ],
    placementGuidelines: "Install in the South-West corner of the building or room to ground volatile energies and strengthen structural stability.",
    activationMethod: "Consecrate on Saturday evening with dark flowers or blue lights, chanting the Rahu Beeja mantra 108 times with deep breath control."
  },
  5: {
    number: 5,
    name: "Budha Yantra",
    sanskritName: "बुध यन्त्र",
    planet: "Mercury (Budha)",
    title: "Intellectual Agility, Communication & Commercial Acumen",
    subtitle: "Sacred Geometry of Analytical Precision & Versatile Mind",
    primaryGeometricForm: "Hexagram six-pointed star within an 8-petaled lotus and central circular matrix",
    petalsCount: 8,
    trianglesUp: 1,
    trianglesDown: 1,
    centerSymbol: "☿ (Bindu of Speed & Discrimination)",
    metal: "Bronze, Brass, or Green Enamel",
    consecrationDayTime: "Wednesday Morning during Mercury Hora",
    facingDirection: "North (Kubera's Direction of Commerce & Wealth)",
    seedMantra: "Om Bram Brim Braum Sah Budhaya Namaha",
    primaryNavagrahaMantra: "Om Budhaya Namaha",
    sacredGeometryElements: [
      "Outer square with gates framing a mathematically precise geometric net.",
      "Eight lotus petals representing the eight primary avenues of communication and trade.",
      "Central hexagram representing the synthesis of intellect, speech, logic, and intuition.",
      "Central Bindu anchoring swift mental calculation and strategic clarity."
    ],
    detailedGuidance: [
      "The Budha Yantra radiates the energetic frequency of Mercury, the celestial prince governing intellect, speech, commercial success, analytical science, and nervous system harmony.",
      "Its geometric structure aligns the brain hemispheres, sharpening memory, refining linguistic expression, and clearing communication breakdowns in relationships and business.",
      "Placed on the North wall, it stimulates commercial growth, financial transactions, mathematical ability, and academic excellence."
    ],
    placementGuidelines: "Place on the North wall of offices, accounting spaces, writing desks, or study rooms to catalyze mental performance and financial opportunities.",
    activationMethod: "Consecrate on Wednesday morning with green leaves, tulsi, and sweet offerings while chanting the Budha Beeja mantra 108 times."
  },
  6: {
    number: 6,
    name: "Shukra Yantra",
    sanskritName: "शुक्र यन्त्र",
    planet: "Venus (Shukra)",
    title: "Harmony, Aesthetic Beauty, Love & Divine Attraction",
    subtitle: "Sacred Geometry of the Golden Ratio & Radiant Luxury",
    primaryGeometricForm: "Central 5-pointed Pentagram within a 16-petaled lotus circle",
    petalsCount: 16,
    trianglesUp: 1,
    trianglesDown: 1,
    centerSymbol: "♀ (Bindu of Golden Proportion & Love)",
    metal: "Silver, White Gold, or Platinum",
    consecrationDayTime: "Friday Morning at Sunrise during Venus Hora",
    facingDirection: "South-East (Agneya - Direction of Vital Passion & Creation)",
    seedMantra: "Om Dram Drim Draum Sah Shukraya Namaha",
    primaryNavagrahaMantra: "Om Shukraya Namaha",
    sacredGeometryElements: [
      "Outer square with four gates containing intricate lotus curvature.",
      "Sixteen lotus petals expressing the sixteen arts (Shodasha Kala) and refined beauty.",
      "Central pentagram reflecting Venus's orbital pentagonal dance with Earth.",
      "Radiant Bindu emitting waves of harmony, magnetism, and creative grace."
    ],
    detailedGuidance: [
      "The Shukra Yantra embodies the divine geometry of Venus — the planet of love, artistic refinement, luxury, relational harmony, and esoteric vitality.",
      "Its central pentagram is a direct mathematical representation of the Golden Ratio (Phi = 1.618), the fundamental proportion governing beauty across nature, architecture, and art.",
      "Installed in the South-East or creative studios, it resolves relational discord, enhances personal magnetism, inspires artistic genius, and invites physical and spiritual refinement."
    ],
    placementGuidelines: "Place in the South-East corner of master bedrooms, art studios, design workspaces, or reception halls.",
    activationMethod: "Consecrate on Friday morning during Venus Hora using white fragrant flowers, sandalwood paste, and rose water while chanting 108 repetitions."
  },
  7: {
    number: 7,
    name: "Ketu Yantra",
    sanskritName: "केतु यन्त्र",
    planet: "Ketu (South Node)",
    title: "Spiritual Penetration, Moksha & Analytical Depth",
    subtitle: "Sacred Geometry for Transcending Dualities & Unlocking Hidden Truth",
    primaryGeometricForm: "Interlocking inward-pointing geometric matrix within a 12-petaled lotus",
    petalsCount: 12,
    trianglesUp: 3,
    trianglesDown: 3,
    centerSymbol: "☋ (Void-Bindu of Transcendence)",
    metal: "Lead, Iron, or Mixed Sacred Alloys",
    consecrationDayTime: "Saturday Evening or Tuesday at Sunset",
    facingDirection: "North-West or South-West Meditation Altar",
    seedMantra: "Om Sram Srim Sraum Sah Ketave Namaha",
    primaryNavagrahaMantra: "Om Ketave Namaha",
    sacredGeometryElements: [
      "Outer square enclosing deeply concentrated inward-pointing angles.",
      "Twelve lotus petals signifying the transcendence of zodiacal attachments.",
      "Interlocking triangles pointing into the central void, dissolving egoic illusions.",
      "Central void-Bindu anchoring profound meditative absorption and liberation."
    ],
    detailedGuidance: [
      "The Ketu Yantra is the geometry of spiritual illumination, mystical insight, deep research, and liberation (Moksha). Ketu represents the spiritual catalyst that dissolves outer illusion to reveal inner truth.",
      "When Ketu is afflicted, it causes isolation, unexplained ailments, loss of focus, and existential angst. The Ketu Yantra neutralizes these negative distortions.",
      "Placed in meditation spaces, it accelerates spiritual awakening, sharpens research capacities, grants intuitive mastery, and protects against subtle energetic disturbances."
    ],
    placementGuidelines: "Install in quiet meditation rooms, private research studies, or spiritual sanctuaries in the North-West or South-West.",
    activationMethod: "Consecrate during quiet sunset hours with incense and deep contemplation, chanting the Ketu seed mantra 108 times."
  },
  8: {
    number: 8,
    name: "Shani Yantra",
    sanskritName: "शनि यन्त्र",
    planet: "Saturn (Shani)",
    title: "Disciplined Mastery, Karmic Rectitude & Endurance",
    subtitle: "Sacred Geometry of Austere Structure & Karmic Justice",
    primaryGeometricForm: "Geometric 8-pointed star framed by unembellished square boundary",
    petalsCount: 0,
    trianglesUp: 2,
    trianglesDown: 2,
    centerSymbol: "♄ (Bindu of Immutable Law)",
    metal: "Pure Iron or Dark Steel",
    consecrationDayTime: "Saturday during Saturn Hora or Sunset",
    facingDirection: "West (Varuna's Direction of Mastery & Discipline)",
    seedMantra: "Om Sham Shim Shaum Sah Shanaischaraya Namaha",
    primaryNavagrahaMantra: "Om Shanaischaraya Namaha",
    sacredGeometryElements: [
      "Austere outer square with four gates, deliberately devoid of decorative petals.",
      "Eight-pointed star formed by two overlapping unadorned squares.",
      "Inner matrix enforcing the eight principles of karmic rectitude.",
      "Central Bindu anchoring absolute endurance, justice, and mastery."
    ],
    detailedGuidance: [
      "The Shani Yantra captures the stern, uncompromising, and deeply protective frequency of Saturn — the planet of karma, discipline, long-term accomplishment, and systemic order.",
      "It contains no ornamental lotus petals, reflecting Saturn's refusal to indulge superficiality. It instills patience, endurance, organizational mastery, and unwavering resilience.",
      "Placed on the West wall of administrative offices, archives, or legal practices, it wards off severe financial collapse, litigation, delay, and chronic irresponsibility."
    ],
    placementGuidelines: "Place on the West wall of administrative offices, study sanctuaries, or legal departments. NEVER place inside sleeping quarters.",
    activationMethod: "Consecrate on Saturday evening during Saturn Hora using sesame oil lamps and dark blue or black cloth, chanting 108 repetitions."
  },
  9: {
    number: 9,
    name: "Mangal Yantra",
    sanskritName: "मंगल यन्त्र",
    planet: "Mars (Mangal)",
    title: "Courage, Decisive Execution & Universal Protection",
    subtitle: "Sacred Geometry of Victorious Initiative & Vital Fire",
    primaryGeometricForm: "Four ascending upward triangles within an 8-petaled lotus",
    petalsCount: 8,
    trianglesUp: 4,
    trianglesDown: 0,
    centerSymbol: "♂ (Apex Bindu of Victorious Will)",
    metal: "Pure Copper or Red Brass",
    consecrationDayTime: "Tuesday Morning during Mars Hora",
    facingDirection: "South (Yama's Direction of Protection & Power)",
    seedMantra: "Om Kram Krim Kraum Sah Bhaumaya Namaha",
    primaryNavagrahaMantra: "Om Mangalaya Namaha",
    sacredGeometryElements: [
      "Robust outer square with four reinforced directional gates.",
      "Eight lotus petals representing the eight directions of victorious defense.",
      "Four ascending upward-pointing triangles representing surging fiery initiative.",
      "Central Apex Bindu focusing fearless courage and completion energy."
    ],
    detailedGuidance: [
      "The Mangal Yantra is the geometric matrix of Mars, the planet of courage, physical strength, decisive action, leadership, and protection against hostility.",
      "Its four ascending triangles represent the upward surge of Kundalini fire and unyielding drive. It dismantles procrastination, cowardice, property disputes, and blood vitality imbalances.",
      "Installed in the South direction or training spaces, it imparts invincible confidence, protects real estate investments, and guarantees victory in righteous endeavors."
    ],
    placementGuidelines: "Install on the South wall of gymnasiums, executive decision rooms, real estate management offices, or main halls.",
    activationMethod: "Consecrate on Tuesday morning with red flowers, kumkum, and copper vessels, chanting the Mangal Beeja mantra 108 times."
  }
};

// ============================================================================
// PART 3: THE SRI YANTRA
// ============================================================================

export const SRI_YANTRA_DATA = {
  title: "The Sri Yantra (Sri Chakra)",
  subtitle: "The Supreme Sacred Geometry Serving All Nine Numbers Simultaneously",
  overview: [
    "The Sri Yantra — also known as the Sri Chakra — is the supreme queen of all sacred geometric diagrams in the ancient Tantric and Vedic traditions. While individual planetary Yantras target specific planetary frequencies, the Sri Yantra is the complete holographic blueprint of the entire cosmos.",
    "It consists of nine interlocking triangles centered around the sacred Bindu point. Four triangles point upward (representing Shiva, the masculine solar principle of consciousness) and five triangles point downward (representing Shakti, the feminine lunar principle of creative energy).",
    "Their precise mathematical intersection produces forty-three smaller triangles, surrounded by an 8-petaled lotus, a 16-petaled lotus, three concentric circles, and an outer square Bhupura with four directional gates.",
    "Because the Sri Yantra synthesizes all elemental and planetary forces in perfect Golden Ratio proportions, it serves as the universal remedial tool for all nine numbers, all Lo Shu Grid gaps, and all Karmic Debt compounds simultaneously."
  ],
  structuralLayers: [
    { layer: 1, name: "Bhupura (Outer Square)", details: "Earth plane with four directional gates connecting cosmic energy to material existence." },
    { layer: 2, name: "Ashta Dala (Inner 8 Petals)", details: "Governs the eight forms of wealth (Ashtalakshmi) and fundamental creative drives." },
    { layer: 3, name: "Shodasha Dala (Outer 16 Petals)", details: "Governs the sixteen kalas (arts) and sensory perception refinement." },
    { layer: 4, name: "Chakra Matrix (43 Triangles)", details: "The dynamic interlocking field created by 4 Shiva and 5 Shakti triangles." },
    { layer: 5, name: "Kamakala & Bindu (Center Point)", details: "The singular source point of pure unmanifest consciousness and cosmic bliss." }
  ],
  primaryMantra: "Om Shrim Hrim Shrim Kamale Kamalalaye Prasida Prasida Shrim Hrim Shrim Om Mahalakshmiye Namaha",
  shortMantra: "Om Aim Hrim Shrim",
  presidingDeity: "Tripura Sundari / Goddess Mahalakshmi",
  bestPlacement: "North-East or East in the main prayer room or home sanctuary.",
  materialOptions: "Pure Gold (supreme), Sterling Silver (excellent), Heavy Copper plate (standard)."
};

// ============================================================================
// PART 4: THE COMPLETE CRYSTAL SYSTEM
// ============================================================================

export const CRYSTALS_DATA: Record<number, CrystalSpec> = {
  1: {
    number: 1,
    planet: "Sun",
    primaryCrystal: "Ruby (Corundum with Chromium)",
    substituteCrystals: ["Red Garnet", "Sunstone", "Carnelian"],
    colorRay: "Ruby Red / Solar Gold",
    piezoelectricQuality: "High-frequency thermal-electric conversion stimulating metabolic vitality.",
    chakraResonance: "Manipura (Solar Plexus) & Muladhara (Root)",
    detailedGuidance: [
      "Ruby is the supreme mineral vessel for Sun energy. Its deep red hue, produced by chromium atoms embedded within its rigid aluminum oxide lattice, vibrates with intense solar vitality.",
      "When worn or placed in direct contact with the biofield, Ruby amplifies self-confidence, leadership presence, noble intent, and physical stamina.",
      "Red Garnet serves as an outstanding, accessible substitute, offering deep grounding alongside solar activation, while Sunstone radiates joyful, optimistic authority."
    ],
    bodyPlacement: "Wear Ruby or Red Garnet set in copper/gold on the ring finger of the dominant hand, or place on the Solar Plexus during deep relaxation.",
    environmentalPlacement: "Place a natural Sunstone sphere or Red Garnet cluster in the East corner of the workspace to maintain continuous solar vitality.",
    gemElixirProtocol: "Place indirect Red Garnet in a glass vessel of pure spring water in direct sunlight for 4 hours. Drink in the morning for cellular activation.",
    affirmation: "I radiate the clear, unshakeable authority of my true divine self with warmth, clarity, and courage.",
    cleansingChargingProtocol: "Cleanse with pure running water and recharge in direct early morning sunlight for 2 hours."
  },
  2: {
    number: 2,
    planet: "Moon",
    primaryCrystal: "Natural Pearl (Organic Aragonite)",
    substituteCrystals: ["Moonstone", "White Selenite", "Clear Quartz"],
    colorRay: "Iridescent White / Silver Lunar Ray",
    piezoelectricQuality: "Soft acoustic damping and high subtle-energy absorption field.",
    chakraResonance: "Svadhisthana (Sacral) & Anahata (Heart)",
    detailedGuidance: [
      "Pearl and Moonstone represent the receptive, reflective, and emotionally soothing frequencies of the Moon. Pearl's unique organic nacre structure mirrors the layered complexity of the subconscious mind.",
      "Moonstone exhibits adularescence — a floating blue-white glow that moves across its surface — which directly harmonizes erratic emotional waves and enhances intuitive perception.",
      "White Selenite acts as an energetic broom, continuously clearing stagnant emotional residue from the aura without absorbing negativity itself."
    ],
    bodyPlacement: "Wear Pearl set in silver on the little finger, or lay Moonstone upon the Sacral chakra during meditation.",
    environmentalPlacement: "Position Selenite towers in the four corners of the bedroom to maintain an unassailable sanctuary of lunar peace.",
    gemElixirProtocol: "Place Moonstone beside a glass pitcher (indirect method) under full moonlight overnight. Drink throughout the day for emotional calm.",
    affirmation: "I am anchored in serene emotional peace. My intuition guides me with absolute clarity and grace.",
    cleansingChargingProtocol: "Cleanse under cool running water and recharge on a windowsill exposed to moonlight during Purnima."
  },
  3: {
    number: 3,
    planet: "Jupiter",
    primaryCrystal: "Yellow Sapphire (Corundum with Iron)",
    substituteCrystals: ["Natural Citrine", "Yellow Topaz", "Golden Beryl"],
    colorRay: "Canary Yellow / Golden Ray",
    piezoelectricQuality: "Stable high-hardness resonance broadcasting expansive vibrational wave patterns.",
    chakraResonance: "Manipura (Solar Plexus) & Sahasrara (Crown)",
    detailedGuidance: [
      "Yellow Sapphire is the mineral gemstone of Jupiter (Brihaspati). Its crystalline hardness (Mohs 9) mirrors the permanent, unshakeable nature of divine wisdom and cosmic law.",
      "Natural Citrine — quartz infused with natural iron deposits — is the supreme accessible stone for abundance, joyful expansion, higher learning, and generous optimism.",
      "It dissolves scarcity mindsets, opens channels for ethical prosperity, and strengthens the digestive and subtle energy systems simultaneously."
    ],
    bodyPlacement: "Wear Yellow Sapphire or Citrine set in gold on the index finger (Jupiter's finger) or as a pendant at the Solar Plexus.",
    environmentalPlacement: "Create a prosperity grid using a large central Citrine generator surrounded by 8 smaller points in the North-East corner.",
    gemElixirProtocol: "Infuse pure water with indirect Citrine under morning sunlight for 3 hours. Drink before study or financial planning.",
    affirmation: "I am open to the unlimited abundance of universal wisdom, joy, and righteous prosperity.",
    cleansingChargingProtocol: "Smudge with white sage or frankincense and recharge under early morning sun for 1 hour."
  },
  4: {
    number: 4,
    planet: "Rahu",
    primaryCrystal: "Hessonite Garnet (Gomedh - Cinnamon Silicate)",
    substituteCrystals: ["Smoky Quartz", "Black Tourmaline", "Dark Tiger's Eye"],
    colorRay: "Cinnamon Honey / Smoky Amber",
    piezoelectricQuality: "Dense grounding matrix neutralizing chaotic electromagnetic frequency bursts.",
    chakraResonance: "Muladhara (Root) & Ajna (Third Eye)",
    detailedGuidance: [
      "Hessonite Garnet displays a characteristic internal treacle effect — swirling liquid-like optical patterns within its honey-colored interior — which visually mirrors Rahu's capacity to dissolve rigid structures.",
      "Smoky Quartz acts as a master grounding filter, absorbing radiation, environmental fog, and intrusive psychic noise while anchoring focus.",
      "Together, these stones neutralize the anxiety, illusion, and sudden volatility associated with Rahu, transforming confusion into strategic genius."
    ],
    bodyPlacement: "Wear Hessonite Garnet set in silver/lead on the middle finger, or hold Smoky Quartz in both hands during grounding breathwork.",
    environmentalPlacement: "Place Smoky Quartz towers near electronic equipment, computers, and South-West entrances to neutralize ambient radiation.",
    gemElixirProtocol: "Use indirect method only for Smoky Quartz. Place near water container for 4 hours to infuse grounding stability.",
    affirmation: "I break through illusion and confusion. My mind is crystal clear, grounded, and masterfully focused.",
    cleansingChargingProtocol: "Bury in clean earth overnight or cleanse with salt water, followed by smudging."
  },
  5: {
    number: 5,
    planet: "Mercury",
    primaryCrystal: "Emerald (Beryl with Chromium/Vanadium)",
    substituteCrystals: ["Green Tourmaline", "Malachite", "Peridot", "Green Aventurine"],
    colorRay: "Vivid Emerald Green Ray",
    piezoelectricQuality: "Exceptionally refined dual electrical axis harmonizing neural firing patterns.",
    chakraResonance: "Vishuddha (Throat) & Anahata (Heart)",
    detailedGuidance: [
      "Emerald is the primary gem of Mercury (Budha). Its internal 'jardin' inclusions represent the branching, organic nature of Mercury's adaptive intellect.",
      "Green Tourmaline possesses extraordinary pyroelectric and piezoelectric properties, making it an incredible catalyst for rapid nervous system balance and verbal fluency.",
      "Green Aventurine provides gentle, accessible Mercury resonance, soothing anxiety while stimulating commercial opportunities and mental agility."
    ],
    bodyPlacement: "Wear Emerald or Green Tourmaline in gold or silver on the little finger, or place Green Aventurine on the Throat chakra.",
    environmentalPlacement: "Place a polished Malachite or Green Tourmaline sphere on the North desk surface to enhance financial calculations and clear writing.",
    gemElixirProtocol: "Prepare indirect Green Aventurine elixir. Drink before public speaking, examinations, or negotiations.",
    affirmation: "My thoughts are swift, articulate, and precise. I communicate truth with elegance and commercial intelligence.",
    cleansingChargingProtocol: "Rinse under tepid water and recharge among living green plants under soft morning light."
  },
  6: {
    number: 6,
    planet: "Venus",
    primaryCrystal: "Diamond (Pure Carbon Lattice)",
    substituteCrystals: ["Rose Quartz", "White Sapphire", "Pink Tourmaline", "Rhodonite"],
    colorRay: "Prismatic White / Soft Pink Ray",
    piezoelectricQuality: "Extreme atomic density producing unmatched light refraction and vibrational purity.",
    chakraResonance: "Anahata (Heart) & Svadhisthana (Sacral)",
    detailedGuidance: [
      "Diamond and White Sapphire embody Venus's highest octave of cosmic light, beauty, and unbreakable harmony.",
      "Rose Quartz is the universal stone of unconditional love, self-compassion, and emotional restoration. Its soft pink ray opens the heart chakra, releasing past heartbreak and resentment.",
      "Rhodonite integrates pink Venus energy with black manganese lines, providing deep forgiveness and emotional healing during relationship crises."
    ],
    bodyPlacement: "Wear White Sapphire or Diamond on the middle or little finger, or place Rose Quartz over the center of the chest during meditation.",
    environmentalPlacement: "Position a large Rose Quartz generator in the South-East sector of the home or master suite to foster unconditional love.",
    gemElixirProtocol: "Indirect Rose Quartz elixir placed in sunlight for 2 hours. Use as a hydrating spray for radiant facial skin and emotional warmth.",
    affirmation: "I am worthy of profound, unconditional love and beauty. Harmony flows through all my relationships.",
    cleansingChargingProtocol: "Cleanse with rose water or moonlight; recharge beside a cluster of Clear Quartz."
  },
  7: {
    number: 7,
    planet: "Ketu",
    primaryCrystal: "Chrysoberyl Cat's Eye (Cymophane)",
    substituteCrystals: ["Amethyst", "Charoite", "Purple Fluorite", "Labradorite"],
    colorRay: "Violet / Iridescent Golden-Green",
    piezoelectricQuality: "Chatoyant fiber matrix focusing inward spiritual vision and deep reflection.",
    chakraResonance: "Ajna (Third Eye) & Sahasrara (Crown)",
    detailedGuidance: [
      "Cat's Eye (Chrysoberyl) displays chatoyancy — a razor-sharp beam of light moving across its surface — which symbolizes Ketu's penetrating intuitive vision.",
      "Amethyst is the premier stone of spiritual transformation, sobriety, meditative stillness, and Crown chakra activation. It transmutes lower mental chatter into higher spiritual awareness.",
      "Charoite features swirling purple and black patterns, assisting deep research, psychological shadow integration, and spiritual liberation."
    ],
    bodyPlacement: "Wear Cat's Eye on the middle finger, or rest an Amethyst stone between the eyebrows on the Ajna chakra.",
    environmentalPlacement: "Keep a large Amethyst geode in the meditation sanctuary or North-West study room to maintain high spiritual frequency.",
    gemElixirProtocol: "Prepare indirect Amethyst elixir during twilight. Sip before evening meditation for quiet mental stillness.",
    affirmation: "I penetrate all outer appearances to discover the profound spiritual truth within all things.",
    cleansingChargingProtocol: "Cleanse in moonlight or with sound vibration (singing bowl) to preserve deep violet frequency."
  },
  8: {
    number: 8,
    planet: "Saturn",
    primaryCrystal: "Blue Sapphire (Corundum with Iron/Titanium)",
    substituteCrystals: ["Black Tourmaline", "Apache Tear / Obsidian", "Blue Iolite", "Lapis Lazuli"],
    colorRay: "Deep Indigo / Velvet Blue / Black",
    piezoelectricQuality: "Extremely heavy structural shield converting stress into grounded organizational resilience.",
    chakraResonance: "Muladhara (Root) & Vishuddha (Throat)",
    detailedGuidance: [
      "Blue Sapphire is the most potent, swift-acting gemstone in planetary astrology. It requires strict prescription and testing before wearing.",
      "Black Tourmaline is the world's premier protective mineral. Its dense iron-rich trigonal column structure forms an impenetrable shield against negative energy and electromagnetic stress.",
      "Blue Iolite — the Viking compass stone — clarifies direction through life storms, assisting long-term career discipline, financial restraint, and karmic resolution."
    ],
    bodyPlacement: "Wear Blue Sapphire set in iron/steel on the middle finger (Saturn's finger), or carry Black Tourmaline in pockets daily.",
    environmentalPlacement: "Place Black Tourmaline logs at the entrance of the home and near main electrical panels for comprehensive energetic defense.",
    gemElixirProtocol: "Indirect method ONLY with Black Tourmaline or Iolite. Drink for structural bone health and grounded nervous system resilience.",
    affirmation: "I am disciplined, patient, and invincible. I fulfill my karmic responsibilities with dignity and absolute strength.",
    cleansingChargingProtocol: "Cleanse with sea salt water or bury in clean soil for 24 hours to discharge accumulated energy."
  },
  9: {
    number: 9,
    planet: "Mars",
    primaryCrystal: "Red Coral (Organic Calcium Carbonate)",
    substituteCrystals: ["Red Jasper", "Carnelian", "Tiger's Eye"],
    colorRay: "Fiery Crimson / Terracotta Red",
    piezoelectricQuality: "Vitalizing physical resonant field invigorating blood circulation and muscular stamina.",
    chakraResonance: "Muladhara (Root) & Svadhisthana (Sacral)",
    detailedGuidance: [
      "Red Coral, formed by sea organisms in deep ocean currents, combines the fiery courage of Mars with the fluid endurance of the ocean.",
      "Red Jasper is the supreme practical stone for stamina, athletic completion power, and physical courage. It provides steady, non-volatile energy.",
      "Carnelian ignites creative drive and vitality, anchoring physical stamina and courage during strenuous tasks."
    ],
    bodyPlacement: "Wear Red Coral set in copper on the ring finger, or place Red Jasper on the Root chakra during bodywork.",
    environmentalPlacement: "Place Red Jasper or Carnelian spheres in the South sector of the workspace or exercise area to ignite decisive drive.",
    gemElixirProtocol: "Prepare indirect Red Jasper elixir in early morning sunlight. Drink prior to workouts or difficult tasks requiring courage.",
    affirmation: "I channel my vital energy into courageous, righteous, and victorious action for the benefit of all.",
    cleansingChargingProtocol: "Rinse in running spring water and charge in sunlight for 2 hours."
  }
};

// ============================================================================
// PART 5 & 6: CHAKRAS & ENERGY HEALING
// ============================================================================

export const CHAKRAS_DATA: ChakraSpec[] = [
  {
    chakraNumber: 1,
    sanskritName: "Muladhara",
    englishName: "Root Chakra",
    location: "Base of spine / Perineum",
    element: "Earth (Prithvi)",
    color: "Deep Crimson Red",
    correspondingNumbers: [4, 8],
    governingPlanets: ["Saturn", "Rahu"],
    beejaMantra: "LAM",
    primaryCrystals: ["Red Jasper", "Black Tourmaline", "Smoky Quartz", "Garnet"],
    detailedOverview: "Muladhara forms the fundamental foundation of the entire energy system. It governs physical survival, instinctual security, bone structure, legs, and the grounding of cosmic energy into practical physical manifestation.",
    balancedState: "Grounded security, physical vitality, financial stability, patience, self-discipline, and unshakeable resilience under pressure.",
    blockedState: "Chronic anxiety regarding money or safety, fatigue, flightiness, boundary dissolution, disorganization, and physical weakness.",
    healingPractices: [
      "Grounding barefoot walk on wet grass or soil for 15 minutes daily.",
      "Chanting 'LAM' 108 times while focusing on base of spine with Red Jasper.",
      "Positioning Black Tourmaline at the entrance door and work desk."
    ]
  },
  {
    chakraNumber: 2,
    sanskritName: "Svadhisthana",
    englishName: "Sacral Chakra",
    location: "Lower abdomen / Below navel",
    element: "Water (Apas)",
    color: "Vibrant Orange",
    correspondingNumbers: [2, 6],
    governingPlanets: ["Moon", "Venus"],
    beejaMantra: "VAM",
    primaryCrystals: ["Carnelian", "Moonstone", "Orange Calcite", "Peach Selenite"],
    detailedOverview: "Svadhisthana is the center of creative fluidity, sensual pleasure, emotional intelligence, reproductive vitality, and relational flow.",
    balancedState: "Joyful creative expression, healthy emotional processing, relational warmth, flexibility, and fluid adaptability.",
    blockedState: "Emotional numbness, creative repression, codependency, guilt, volatility, or reproductive sluggishness.",
    healingPractices: [
      "Conscious fluid intake and moonlit meditation on water surfaces.",
      "Chanting 'VAM' while placing Carnelian or Moonstone 2 inches below the navel.",
      "Creative artistic expression without self-judgment."
    ]
  },
  {
    chakraNumber: 3,
    sanskritName: "Manipura",
    englishName: "Solar Plexus Chakra",
    location: "Navel / Upper Abdomen",
    element: "Fire (Agni)",
    color: "Golden Solar Yellow",
    correspondingNumbers: [1, 5],
    governingPlanets: ["Sun", "Mars", "Jupiter"],
    beejaMantra: "RAM",
    primaryCrystals: ["Citrine", "Yellow Sapphire", "Pyrite", "Tiger's Eye"],
    detailedOverview: "Manipura is the personal power furnace of the subtle body. It governs willpower, gut instinct, digestive fire (Agni), personal boundary authority, and self-confidence.",
    balancedState: "Strong self-esteem, decisive leadership, radiant energy, digestive clarity, and clear personal boundaries.",
    blockedState: "Imposter syndrome, helplessness, passive aggression, digestive disorders, or need for external control.",
    healingPractices: [
      "Sunbathing early in the morning while practicing Kapalabhati breathwork.",
      "Placing Citrine over the navel while chanting 'RAM' 108 times.",
      "Writing clear personal boundary declarations."
    ]
  },
  {
    chakraNumber: 4,
    sanskritName: "Anahata",
    englishName: "Heart Chakra",
    location: "Center of chest",
    element: "Air (Vayu)",
    color: "Emerald Green & Rose Pink",
    correspondingNumbers: [2, 6],
    governingPlanets: ["Venus", "Moon"],
    beejaMantra: "YAM",
    primaryCrystals: ["Rose Quartz", "Emerald", "Green Aventurine", "Rhodonite"],
    detailedOverview: "Anahata is the sacred bridge between lower physical chakras and higher spiritual centers. It governs unconditional love, forgiveness, empathy, cardiac health, and spiritual grace.",
    balancedState: "Profound capacity for unconditional love, forgiveness, inner serenity, healthy empathy, and open trust.",
    blockedState: "Heartbreak trauma, grief, fear of vulnerability, critical cynicism, or martyr complex.",
    healingPractices: [
      "Chest-opening yoga postures combined with deep diaphragmatic breathing.",
      "Resting Rose Quartz or Emerald over the sternum while chanting 'YAM'.",
      "Daily practice of radical self-compassion and forgiveness letter writing."
    ]
  },
  {
    chakraNumber: 5,
    sanskritName: "Vishuddha",
    englishName: "Throat Chakra",
    location: "Throat / Voice Box",
    element: "Ether (Akasha)",
    color: "Sky Blue / Aquamarine",
    correspondingNumbers: [1, 5],
    governingPlanets: ["Mercury", "Jupiter"],
    beejaMantra: "HAM",
    primaryCrystals: ["Blue Lace Agate", "Sodalite", "Lapis Lazuli", "Aquamarine"],
    detailedOverview: "Vishuddha governs authentic self-expression, truth-telling, vocal resonance, active listening, and the transmutation of life experiences into wisdom.",
    balancedState: "Articulate truthful speech, inspiring vocal tone, active listening, creative writing ease, and physical throat health.",
    blockedState: "Fear of speaking truth, social anxiety, chronic throat irritation, talking over others, or suppressed self-expression.",
    healingPractices: [
      "Chanting mantras out loud or singing in natural acoustical spaces.",
      "Placing Blue Lace Agate at the throat hollow while chanting 'HAM'.",
      "Journaling unuttered thoughts to release stored vocal tension."
    ]
  },
  {
    chakraNumber: 6,
    sanskritName: "Ajna",
    englishName: "Third Eye Chakra",
    location: "Space between eyebrows",
    element: "Light (Manas)",
    color: "Deep Indigo / Royal Blue",
    correspondingNumbers: [2, 7],
    governingPlanets: ["Ketu", "Moon"],
    beejaMantra: "OM",
    primaryCrystals: ["Amethyst", "Lapis Lazuli", "Labradorite", "Purple Fluorite"],
    detailedOverview: "Ajna governs higher intuition, mental clarity, visualization, pineal gland function, and direct perception beyond physical sight.",
    balancedState: "Keen intuitive foresight, vivid creative imagination, mental clarity, lucid dreaming, and spiritual insight.",
    blockedState: "Over-intellectualization, confusion, nightmares, headaches, or inability to trust inner guidance.",
    healingPractices: [
      "Trataka (candle flame gazing) meditation for 5 minutes before sleep.",
      "Resting Amethyst between the eyebrows while holding the silent 'OM' frequency.",
      "Keeping an intuitive dream journal beside the bed."
    ]
  },
  {
    chakraNumber: 7,
    sanskritName: "Sahasrara",
    englishName: "Crown Chakra",
    location: "Top of head / Crown",
    element: "Pure Consciousness (Mahat)",
    color: "Violet / Diamond White",
    correspondingNumbers: [3, 7, 9],
    governingPlanets: ["Jupiter", "Ketu", "Sun"],
    beejaMantra: "AH / SILENCE / OM",
    primaryCrystals: ["Clear Quartz", "White Selenite", "Diamond", "Amethyst Geode"],
    detailedOverview: "Sahasrara is the thousand-petaled lotus connecting individual consciousness with universal cosmic oneness. It transcends physical form.",
    balancedState: "Experience of divine oneness, spiritual purpose, transcendent peace, enlightenment, and universal connection.",
    blockedState: "Spiritual cynicism, existential isolation, attachment to dogma, or feeling disconnected from purpose.",
    healingPractices: [
      "Silent meditation sitting under morning open sky.",
      "Placing a Clear Quartz point above the crown while contemplating infinite space.",
      "Reciting the universal Gayatri Mantra with reverence."
    ]
  }
];

// ============================================================================
// PART 7: YANTRA-CRYSTAL-MANTRA TRIADS FOR ALL 9 NUMBERS
// ============================================================================

export const TRIADS_DATA: YantraCrystalMantraTriad[] = [
  {
    number: 1,
    planet: "Sun",
    yantraName: "Surya Yantra",
    crystalName: "Red Garnet / Ruby",
    mantra: "Om Hram Hrim Hraum Sah Suryaya Namaha",
    practiceDuration: "21 to 40 Days (Sunday Start)",
    instructions: [
      "Sit facing East during sunrise before the consecrated Surya Yantra.",
      "Hold Red Garnet in the dominant hand over the Solar Plexus.",
      "Chant the Sun seed mantra 108 times while gazing softly at the central Bindu.",
      "Feel solar gold light filling the ribcage and empowering self-confidence."
    ]
  },
  {
    number: 2,
    planet: "Moon",
    yantraName: "Chandra Yantra",
    crystalName: "Moonstone / Pearl",
    mantra: "Om Shram Shrim Shraum Sah Chandraya Namaha",
    practiceDuration: "21 to 40 Days (Monday Start)",
    instructions: [
      "Sit facing North-West during twilight or moonrise before Chandra Yantra.",
      "Hold Moonstone in the left receptive hand over the Sacral area.",
      "Chant the lunar seed mantra 108 times, visualizing cool silver light.",
      "Allow mental noise to settle into calm emotional peace."
    ]
  },
  {
    number: 3,
    planet: "Jupiter",
    yantraName: "Guru Yantra",
    crystalName: "Natural Citrine / Yellow Sapphire",
    mantra: "Om Gram Grim Graum Sah Gurave Namaha",
    practiceDuration: "40 Days Unbroken (Thursday Start)",
    instructions: [
      "Sit facing North-East during Jupiter Hora on Thursday morning.",
      "Hold Citrine crystal over the heart and Solar Plexus.",
      "Chant 108 repetitions of the Jupiter Beeja mantra with joyful devotion.",
      "Visualize golden yellow rays of wisdom expanding your wealth and mind."
    ]
  },
  {
    number: 4,
    planet: "Rahu",
    yantraName: "Rahu Yantra",
    crystalName: "Smoky Quartz / Hessonite",
    mantra: "Om Bhram Bhrim Bhraum Sah Rahave Namaha",
    practiceDuration: "40 Days Unbroken (Saturday Start)",
    instructions: [
      "Sit facing South-West during evening hours before the Rahu Yantra.",
      "Hold Smoky Quartz in both hands, resting on the lap.",
      "Recite 108 counts of the Rahu Beeja mantra with deep abdominal breaths.",
      "Visualize all mental fog dissolving into grounded structural clarity."
    ]
  },
  {
    number: 5,
    planet: "Mercury",
    yantraName: "Budha Yantra",
    crystalName: "Emerald / Green Aventurine",
    mantra: "Om Bram Brim Braum Sah Budhaya Namaha",
    practiceDuration: "21 Days (Wednesday Start)",
    instructions: [
      "Sit facing North during Wednesday morning hours before Budha Yantra.",
      "Hold Green Aventurine or Emerald near the Throat chakra.",
      "Chant the Mercury Beeja mantra 108 times with clear phonetic articulation.",
      "Visualize vivid green light enhancing memory, logic, and speech agility."
    ]
  },
  {
    number: 6,
    planet: "Venus",
    yantraName: "Shukra Yantra",
    crystalName: "Rose Quartz / White Sapphire",
    mantra: "Om Dram Drim Draum Sah Shukraya Namaha",
    practiceDuration: "40 Days (Friday Start)",
    instructions: [
      "Sit facing South-East on Friday morning before Shukra Yantra.",
      "Place Rose Quartz directly over the center of the chest.",
      "Chant the Venus Beeja mantra 108 times while feeling heart warmth.",
      "Visualize pink rose light blessing all personal and professional bonds."
    ]
  },
  {
    number: 7,
    planet: "Ketu",
    yantraName: "Ketu Yantra",
    crystalName: "Amethyst / Cat's Eye",
    mantra: "Om Sram Srim Sraum Sah Ketave Namaha",
    practiceDuration: "40 Days (Saturday Start)",
    instructions: [
      "Sit facing North-West during sunset or quiet evening hours.",
      "Hold Amethyst between the hands at the Third Eye level.",
      "Chant 108 repetitions of Ketu mantra in a quiet, resonant whisper.",
      "Visualize deep violet light opening higher intuitive understanding."
    ]
  },
  {
    number: 8,
    planet: "Saturn",
    yantraName: "Shani Yantra",
    crystalName: "Black Tourmaline / Blue Iolite",
    mantra: "Om Sham Shim Shaum Sah Shanaischaraya Namaha",
    practiceDuration: "40 Days Unbroken (Saturday Start)",
    instructions: [
      "Sit facing West on Saturday evening before the Shani Yantra.",
      "Hold Black Tourmaline anchored firmly against the Root area.",
      "Recite 108 counts of Shani mantra with slow, patient rhythm.",
      "Feel unshakeable strength, discipline, and karmic protection taking root."
    ]
  },
  {
    number: 9,
    planet: "Mars",
    yantraName: "Mangal Yantra",
    crystalName: "Red Jasper / Red Coral",
    mantra: "Om Kram Krim Kraum Sah Bhaumaya Namaha",
    practiceDuration: "21 to 40 Days (Tuesday Start)",
    instructions: [
      "Sit facing South on Tuesday morning before Mangal Yantra.",
      "Hold Red Jasper firmly in the right hand.",
      "Chant 108 repetitions of Mars Beeja mantra with courageous intent.",
      "Visualize crimson light invigorating stamina, courage, and action."
    ]
  }
];
