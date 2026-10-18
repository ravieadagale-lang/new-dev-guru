import {
  MahaVastuZone,
  DevataPada,
  RoomCategory,
  PlacedRoomItem,
  AyadiCalculationResult,
  PlotShape,
  SlopeDirection,
  VeedhiShoolaThrust,
  PlotAnalysisResult,
  CommercialPropertyType,
  CommercialAuditItem,
  QuickAuditInput,
  QuickAuditResult,
  GeopathicPoint
} from "../../types/vastuTypes";

// ==========================================
// 1. THE 16 MAHAVASTU ZONES (22.5° EACH)
// ==========================================
export const MAHAVASTU_16_ZONES: MahaVastuZone[] = [
  {
    id: "N",
    name: "North",
    hindiName: "उत्तर (Uttara)",
    angleStart: 348.75,
    angleEnd: 11.25,
    centerAngle: 0,
    element: "Water",
    rulingDeity: "Lord Kubera (Treasurer of Heavens)",
    rulingPlanet: "Mercury (Budha)",
    keyAttributes: "Money, Cash Inflow, New Career Opportunities, Treasury",
    lifeAspect: "Wealth Attraction & New Customers",
    colorHex: "#0284c7", // Sky Blue
    antiElements: ["Fire", "Earth"],
    idealRooms: ["living_room", "cash_locker", "study_room", "water_tank_ug", "entrance"],
    prohibitedRooms: ["toilet", "kitchen", "dustbin_disposal", "septic_tank"],
    cutRemedy: "Affix blue elemental tape on the skirting and install a consecrated brass Kubera Yantra with a green money plant in a blue vase.",
    extendedRemedy: "Hang an indoor green plant or light wooden artifact to absorb excess water energy.",
    metalRemedy: "Aluminium",
    colorTapeRemedy: "Blue"
  },
  {
    id: "NNE",
    name: "North-North-East",
    hindiName: "उत्तर-ईशान (Uttara-Ishana)",
    angleStart: 11.25,
    angleEnd: 33.75,
    centerAngle: 22.5,
    element: "Water",
    rulingDeity: "Lord Dhanvantari (Divine Physician)",
    rulingPlanet: "Jupiter (Guru) & Mercury",
    keyAttributes: "Health, Vital Immunity, Rejuvenation, Physical Healing",
    lifeAspect: "Physical & Mental Immunity",
    colorHex: "#0ea5e9",
    antiElements: ["Fire", "Earth"],
    idealRooms: ["mandir_puja", "guest_bedroom", "water_tank_ug", "study_room"],
    prohibitedRooms: ["toilet", "dustbin_disposal", "kitchen", "store_room"],
    cutRemedy: "Place a brass Dhanvantari idol or idol of Lord Shiva holding Amrita Kalash with a blue bulb lit 24/7.",
    extendedRemedy: "Introduce gentle earthen or off-white ceramics to gently balance excessive cold prana.",
    metalRemedy: "Aluminium",
    colorTapeRemedy: "Blue"
  },
  {
    id: "NE",
    name: "North-East",
    hindiName: "ईशान (Ishanya)",
    angleStart: 33.75,
    angleEnd: 56.25,
    centerAngle: 45,
    element: "Water",
    rulingDeity: "Lord Shiva (Ishana Rudra)",
    rulingPlanet: "Jupiter (Guru) & Ketu",
    keyAttributes: "Clarity of Mind, Spiritual Insight, Divine Wisdom, Vision",
    lifeAspect: "Spiritual Connection & Pure Intellect",
    colorHex: "#38bdf8",
    antiElements: ["Fire", "Earth"],
    idealRooms: ["mandir_puja", "living_room", "water_tank_ug", "balcony"],
    prohibitedRooms: ["toilet", "kitchen", "staircase", "master_bedroom", "septic_tank"],
    cutRemedy: "Install a 108-faceted natural Sphatik (Quartz) Shiva Lingam, water fountain, and consecrated Brass Ishana Yantra with Amethyst crystal cluster.",
    extendedRemedy: "Keep area spotless, open, and free of clutter; ensure natural morning sunlight reaches here.",
    metalRemedy: "Aluminium",
    colorTapeRemedy: "Blue"
  },
  {
    id: "ENE",
    name: "East-North-East",
    hindiName: "पूर्व-ईशान (Purva-Ishana)",
    angleStart: 56.25,
    angleEnd: 78.75,
    centerAngle: 67.5,
    element: "Air",
    rulingDeity: "Jayanta & Parjanya",
    rulingPlanet: "Sun & Jupiter",
    keyAttributes: "Fun, Recreation, Joy, Renewal, Mental Happiness",
    lifeAspect: "Playfulness, Leisure & De-stressing",
    colorHex: "#10b981", // Emerald Green
    antiElements: ["Fire", "Earth"],
    idealRooms: ["living_room", "children_bedroom", "balcony", "study_room"],
    prohibitedRooms: ["toilet", "dustbin_disposal", "septic_tank"],
    cutRemedy: "Place healthy green indoor plants (Bamboo/Ferns) in green pots with a framed picture of lush green pastures.",
    extendedRemedy: "Add light terracotta accents or warm wooden carvings.",
    metalRemedy: "Stainless Steel",
    colorTapeRemedy: "Green"
  },
  {
    id: "E",
    name: "East",
    hindiName: "पूर्व (Purva)",
    angleStart: 78.75,
    angleEnd: 101.25,
    centerAngle: 90,
    element: "Air",
    rulingDeity: "Lord Indra (King of Gods)",
    rulingPlanet: "Sun (Surya Deva)",
    keyAttributes: "Social Connectivity, Networking, Influence, Government Support",
    lifeAspect: "Social Stature & Broad Contacts",
    colorHex: "#059669",
    antiElements: ["Earth", "Fire"],
    idealRooms: ["entrance", "living_room", "study_room", "balcony"],
    prohibitedRooms: ["toilet", "store_room", "heavy_storage", "septic_tank"],
    cutRemedy: "Mount a consecrated 12-inch Copper Surya Yantra on the east wall at eye level and maintain green plants.",
    extendedRemedy: "Introduce subtle beige or off-white drapes.",
    metalRemedy: "Stainless Steel",
    colorTapeRemedy: "Green"
  },
  {
    id: "ESE",
    name: "East-South-East",
    hindiName: "पूर्व-आग्नेय (Purva-Agneya)",
    angleStart: 101.25,
    angleEnd: 123.75,
    centerAngle: 112.5,
    element: "Air",
    rulingDeity: "Savita (Power of Impulse)",
    rulingPlanet: "Rahu & Sun",
    keyAttributes: "Churning, Analytical Processing, Thought Deliberation",
    lifeAspect: "Discrimination & Overthinking Management",
    colorHex: "#34d399",
    antiElements: ["Water", "Fire"],
    idealRooms: ["bathroom", "store_room", "study_room", "washing_machine"],
    prohibitedRooms: ["master_bedroom", "mandir_puja", "entrance"],
    cutRemedy: "Place a small wooden butter churner or a natural green agate stone on a wooden shelf.",
    extendedRemedy: "Affix green tape along the perimeter to restrict excessive anxiety and restless over-analysis.",
    metalRemedy: "Stainless Steel",
    colorTapeRemedy: "Green"
  },
  {
    id: "SE",
    name: "South-East",
    hindiName: "आग्नेय (Agneya)",
    angleStart: 123.75,
    angleEnd: 146.25,
    centerAngle: 135,
    element: "Fire",
    rulingDeity: "Lord Agni (God of Sacred Fire)",
    rulingPlanet: "Venus (Shukra)",
    keyAttributes: "Cash Liquidity, Zeal, Passion, Female Health, Digestion",
    lifeAspect: "Daily Cash Flow & Inner Drive",
    colorHex: "#f43f5e", // Rose/Crimson
    antiElements: ["Water", "Earth"],
    idealRooms: ["kitchen", "electrical_panel", "inverter", "generator"],
    prohibitedRooms: ["water_tank_ug", "toilet", "mandir_puja", "master_bedroom"],
    cutRemedy: "Affix a Copper Agni Yantra on the southern wall and burn pure organic camphor twice daily in a brass burner.",
    extendedRemedy: "Add earthen brown terracotta pots without water standing to channel excess fire.",
    metalRemedy: "Copper",
    colorTapeRemedy: "Red"
  },
  {
    id: "SSE",
    name: "South-South-East",
    hindiName: "दक्षिण-आग्नेय (Dakshina-Agneya)",
    angleStart: 146.25,
    angleEnd: 168.75,
    centerAngle: 157.5,
    element: "Fire",
    rulingDeity: "Pusha (Nourisher of Vitality)",
    rulingPlanet: "Mars & Venus",
    keyAttributes: "Power, Stamina, Physical Confidence, Security",
    lifeAspect: "Inner Strength & Fearlessness",
    colorHex: "#e11d48",
    antiElements: ["Water", "Earth"],
    idealRooms: ["kitchen", "dining_room", "gym_fitness", "security_post"],
    prohibitedRooms: ["toilet", "water_tank_ug", "septic_tank"],
    cutRemedy: "Hang a painting of a running red stallion or install a solid triangular red jasper stone.",
    extendedRemedy: "Ground with warm earthen tiles or neutral sand accents.",
    metalRemedy: "Copper",
    colorTapeRemedy: "Red"
  },
  {
    id: "S",
    name: "South",
    hindiName: "दक्षिण (Dakshin)",
    angleStart: 168.75,
    angleEnd: 191.25,
    centerAngle: 180,
    element: "Fire",
    rulingDeity: "Lord Yama (God of Dharma & Rest)",
    rulingPlanet: "Mars (Mangal)",
    keyAttributes: "Fame, Public Recognition, Peaceful Sleep, Relaxation",
    lifeAspect: "Reputation & Deep Rejuvenation",
    colorHex: "#b91c1c",
    antiElements: ["Water", "Air"],
    idealRooms: ["master_bedroom", "staircase", "store_room", "heavy_storage"],
    prohibitedRooms: ["water_tank_ug", "borewell", "main_entrance_large_glass"],
    cutRemedy: "Paint the south wall in warm terracotta or coral red and place a heavy brass or lead idol.",
    extendedRemedy: "Place heavy stones or heavy dark mahogany furniture against the south wall.",
    metalRemedy: "Copper",
    colorTapeRemedy: "Red"
  },
  {
    id: "SSW",
    name: "South-South-West",
    hindiName: "दक्षिण-नैऋत्य (Dakshina-Nairrutya)",
    angleStart: 191.25,
    angleEnd: 213.75,
    centerAngle: 202.5,
    element: "Earth",
    rulingDeity: "Gandharva & Mriga",
    rulingPlanet: "Rahu & Mars",
    keyAttributes: "Disposal, Elimination of Toxins, Release of Unwanted Waste",
    lifeAspect: "Detoxification & Energy Discharge",
    colorHex: "#d97706", // Amber / Earth
    antiElements: ["Water", "Air"],
    idealRooms: ["toilet", "dustbin_disposal", "septic_tank", "waste_storage"],
    prohibitedRooms: ["mandir_puja", "master_bedroom", "study_room", "cash_locker"],
    cutRemedy: "Keep a yellow vase with mustard yellow flowers or install a natural yellow calcite crystal.",
    extendedRemedy: "This zone should naturally be heavy; seal openings with dense blinds or brass thresholds.",
    metalRemedy: "Brass",
    colorTapeRemedy: "Yellow"
  },
  {
    id: "SW",
    name: "South-West",
    hindiName: "नैऋत्य (Nairrutya)",
    angleStart: 213.75,
    angleEnd: 236.25,
    centerAngle: 225,
    element: "Earth",
    rulingDeity: "Lord Nirruti (Guardian of Ancestral Roots)",
    rulingPlanet: "Rahu (Dragon's Head)",
    keyAttributes: "Relationship Stability, Mastery of Skills, Ancestral Lineage, Pitra Prana",
    lifeAspect: "Marital Harmony & Professional Mastery",
    colorHex: "#b45309",
    antiElements: ["Water", "Fire", "Air"],
    idealRooms: ["master_bedroom", "heavy_storage", "wardrobe_lockers", "staircase"],
    prohibitedRooms: ["toilet", "kitchen", "water_tank_ug", "entrance", "borewell"],
    cutRemedy: "Install 9 Lead Vastu Helixes or solid Brass Nandi Bull on yellow granite and keep yellow earthen pottery.",
    extendedRemedy: "Keep southwest elevated, solid, completely closed, and weighted down with granite or heavy teakwood.",
    metalRemedy: "Brass",
    colorTapeRemedy: "Yellow"
  },
  {
    id: "WSW",
    name: "West-South-West",
    hindiName: "पश्चिम-नैऋत्य (Pashchima-Nairrutya)",
    angleStart: 236.25,
    angleEnd: 258.75,
    centerAngle: 247.5,
    element: "Space",
    rulingDeity: "Sugriva & Pushpadanta",
    rulingPlanet: "Saturn (Shani) & Mercury",
    keyAttributes: "Knowledge, Academic Retention, Savings, Children's Education",
    lifeAspect: "Study Concentration & Long-Term Financial Reserve",
    colorHex: "#64748b", // Slate / Space
    antiElements: ["Fire", "Air"],
    idealRooms: ["study_room", "children_bedroom", "cash_locker", "library"],
    prohibitedRooms: ["toilet", "kitchen", "dustbin_disposal"],
    cutRemedy: "Place a Saraswati Brass Yantra, world globe, or crystal pen stand on a study table facing East.",
    extendedRemedy: "Balance with metallic white or silver accents and framed academic certificates.",
    metalRemedy: "Iron",
    colorTapeRemedy: "White"
  },
  {
    id: "W",
    name: "West",
    hindiName: "पश्चिम (Pashchima)",
    angleStart: 258.75,
    angleEnd: 281.25,
    centerAngle: 270,
    element: "Space",
    rulingDeity: "Lord Varuna (God of Rain & Cosmic Ocean)",
    rulingPlanet: "Saturn (Shani)",
    keyAttributes: "Gains, Profits, Business Growth, Manifestation of Desires",
    lifeAspect: "Financial Profits & Concrete Results",
    colorHex: "#475569",
    antiElements: ["Fire", "Air"],
    idealRooms: ["living_room", "dining_room", "cash_locker", "guest_bedroom"],
    prohibitedRooms: ["toilet", "underground_pit", "rubbish_dump"],
    cutRemedy: "Affix a consecrated round White/Grey metal plate and place a brass statue of a kamadhenu or profit bull.",
    extendedRemedy: "Use circular silver/white carpets and keep heavy safe or metal vault here.",
    metalRemedy: "Iron",
    colorTapeRemedy: "White"
  },
  {
    id: "WNW",
    name: "West-North-West",
    hindiName: "पश्चिम-वायव्य (Pashchima-Vayavya)",
    angleStart: 281.25,
    angleEnd: 303.75,
    centerAngle: 292.5,
    element: "Space",
    rulingDeity: "Asura & Shosha",
    rulingPlanet: "Saturn & Moon",
    keyAttributes: "Depression Release, Emotional Detox, Catharsis, Sighing",
    lifeAspect: "Emotional Release & Healing Past Trauma",
    colorHex: "#94a3b8",
    antiElements: ["Fire", "Air"],
    idealRooms: ["toilet", "bathroom", "store_room", "washing_machine"],
    prohibitedRooms: ["master_bedroom", "mandir_puja", "entrance", "study_room"],
    cutRemedy: "Place a round white marble bowl filled with sea salt and replace it every alternate Saturday.",
    extendedRemedy: "Affix white/silver tape along the threshold to prevent emotional lethargy from spreading.",
    metalRemedy: "Iron",
    colorTapeRemedy: "White"
  },
  {
    id: "NW",
    name: "North-West",
    hindiName: "वायव्य (Vayavya)",
    angleStart: 303.75,
    angleEnd: 326.25,
    centerAngle: 315,
    element: "Space",
    rulingDeity: "Lord Vayu (God of Wind)",
    rulingPlanet: "Moon (Chandra)",
    keyAttributes: "Support, Banking Loans, Mentors, Business Partners, Prompt Assistance",
    lifeAspect: "Allies, Banking Credit & Helpful Network",
    colorHex: "#cbd5e1",
    antiElements: ["Fire", "Earth"],
    idealRooms: ["guest_bedroom", "finished_goods_store", "garage_parking", "balcony"],
    prohibitedRooms: ["master_bedroom", "kitchen", "heavy_safe_permanent"],
    cutRemedy: "Install a 6-pipe hollow metal wind chime and a pair of brass running white horses facing inwards.",
    extendedRemedy: "Ground with smooth white river pebbles or silver metal artwork.",
    metalRemedy: "Iron",
    colorTapeRemedy: "White"
  },
  {
    id: "NNW",
    name: "North-North-West",
    hindiName: "उत्तर-वायव्य (Uttara-Vayavya)",
    angleStart: 326.25,
    angleEnd: 348.75,
    centerAngle: 337.5,
    element: "Water",
    rulingDeity: "Soma & Naga",
    rulingPlanet: "Moon & Venus",
    keyAttributes: "Attraction, Sex, Romance, Marital Bliss, Bodily Beauty",
    lifeAspect: "Mutual Fascination & Bodily Vitality",
    colorHex: "#38bdf8",
    antiElements: ["Fire", "Earth"],
    idealRooms: ["master_bedroom_newlyweds", "dressing_room", "balcony"],
    prohibitedRooms: ["toilet", "dustbin_disposal", "study_room_students"],
    cutRemedy: "Place a pair of lovebirds or Rose Quartz crystal swans with soft ambient sky blue lighting.",
    extendedRemedy: "Ensure no dark red or harsh yellow shades dominate this romantic portal.",
    metalRemedy: "Aluminium",
    colorTapeRemedy: "Blue"
  }
];

// ==========================================
// 2. THE 32 DEVATA PADAS (ENTRANCE DOORS)
// ==========================================
export const DEVATA_32_PADAS: DevataPada[] = [
  // NORTH (N1 to N8)
  {
    id: "N1",
    zoneId: "NW",
    name: "Roga / Shikhi",
    sanskritName: "रोग / शिखी",
    direction: "North",
    padaNumber: 1,
    angleStart: 348.75,
    angleEnd: 0.0,
    centerAngle: 354.375,
    isAuspicious: false,
    auspiciousGrade: "Negative",
    effects: "Chronic health complaints, unexplainable fears, and domestic enmity.",
    description: "Located at the junction of NW and North. Entry here causes bodily vulnerability.",
    remedy: "Affix 3-inch Brass/Aluminium metallic strip into the door sill and paste an Aluminium Swastika."
  },
  {
    id: "N2",
    zoneId: "N",
    name: "Parjanya",
    sanskritName: "पर्जन्य",
    direction: "North",
    padaNumber: 2,
    angleStart: 0.0,
    angleEnd: 11.25,
    centerAngle: 5.625,
    isAuspicious: false,
    auspiciousGrade: "Neutral",
    effects: "High expenditure on luxuries, female instability, and lack of liquidity.",
    description: "Slightly outside the ideal door zone. Causes expenses to mirror income.",
    remedy: "Embed a blue color tape strip on the floor threshold."
  },
  {
    id: "N3",
    zoneId: "N",
    name: "Mukhya (Kubera)",
    sanskritName: "मुख्य (कुबेर द्वार)",
    direction: "North",
    padaNumber: 3,
    angleStart: 11.25,
    angleEnd: 22.5,
    centerAngle: 16.875,
    isAuspicious: true,
    auspiciousGrade: "High",
    effects: "Magnificent financial abundance, business windfalls, and high customer footfall.",
    description: "One of the 8 greatest royal doorways in Vedic architecture. Supreme for commercial and residential prosperity.",
    remedy: "Highly auspicious! Hang a brass Om-Swastika and keep the foyer clean, bright, and fragrant."
  },
  {
    id: "N4",
    zoneId: "NNE",
    name: "Bhallat",
    sanskritName: "भल्लाट",
    direction: "North",
    padaNumber: 4,
    angleStart: 22.5,
    angleEnd: 33.75,
    centerAngle: 28.125,
    isAuspicious: true,
    auspiciousGrade: "High",
    effects: "Heritage inheritance, stable recurring cash wealth, and family harmony.",
    description: "Bestows divine grace, stable fortune, and noble repute upon descendants.",
    remedy: "Keep illuminated with warm golden light; install a brass threshold."
  },
  {
    id: "N5",
    zoneId: "NNE",
    name: "Soma",
    sanskritName: "सोम (अमृत)",
    direction: "North",
    padaNumber: 5,
    angleStart: 33.75,
    angleEnd: 45.0,
    centerAngle: 39.375,
    isAuspicious: true,
    auspiciousGrade: "Moderate",
    effects: "Spiritual elevation, religious travels, and peace of mind.",
    description: "Good for spiritual seekers, scholars, and yogic practitioners.",
    remedy: "Keep a small bowl with fresh spring water and white flowers."
  },
  {
    id: "N6",
    zoneId: "NE",
    name: "Bhujanga (Sarpa)",
    sanskritName: "भुजंग (सर्प)",
    direction: "North",
    padaNumber: 6,
    angleStart: 45.0,
    angleEnd: 56.25,
    centerAngle: 50.625,
    isAuspicious: false,
    auspiciousGrade: "Negative",
    effects: "Hostility with siblings, litigation from relatives, deceit.",
    description: "Snake energy inducing poison in social and domestic transactions.",
    remedy: "Install an Aluminium strip with a consecrated blue crystal sphere."
  },
  {
    id: "N7",
    zoneId: "NE",
    name: "Aditi",
    sanskritName: "अदिति",
    direction: "North",
    padaNumber: 7,
    angleStart: 56.25,
    angleEnd: 67.5,
    centerAngle: 61.875,
    isAuspicious: false,
    auspiciousGrade: "Neutral",
    effects: "Restlessness in daughters, frequent unwanted travels, mental agitation.",
    description: "Expansive feminine energy needing containment.",
    remedy: "Paste a 2-inch wide green vinyl tape across the entrance threshold."
  },
  {
    id: "N8",
    zoneId: "ENE",
    name: "Diti",
    sanskritName: "दिति",
    direction: "North",
    padaNumber: 8,
    angleStart: 67.5,
    angleEnd: 78.75,
    centerAngle: 73.125,
    isAuspicious: false,
    auspiciousGrade: "Negative",
    effects: "Narrow mindset, lack of vision, petty rivalries.",
    description: "Tends to contract thinking and cause unnecessary ego clashes.",
    remedy: "Affix Stainless Steel strip and hang a Brass Gayatri Yantra."
  },

  // EAST (E1 to E8)
  {
    id: "E1",
    zoneId: "ENE",
    name: "Shikhi",
    sanskritName: "शिखी (अग्नि)",
    direction: "East",
    padaNumber: 1,
    angleStart: 78.75,
    angleEnd: 90.0,
    centerAngle: 84.375,
    isAuspicious: false,
    auspiciousGrade: "Negative",
    effects: "Risk of fire hazards, accidents, and short-temperedness.",
    description: "Fire sparks invading the eastern gate.",
    remedy: "Paste green vinyl tape under the door leaf and place a potted jade plant."
  },
  {
    id: "E2",
    zoneId: "E",
    name: "Parjanya",
    sanskritName: "पर्जन्य",
    direction: "East",
    padaNumber: 2,
    angleStart: 90.0,
    angleEnd: 101.25,
    centerAngle: 95.625,
    isAuspicious: false,
    auspiciousGrade: "Neutral",
    effects: "Excessive financial outflow on home renovations, female dominance.",
    description: "Average entry gate leading to expenditure exceeding income.",
    remedy: "Install Stainless Steel threshold plate."
  },
  {
    id: "E3",
    zoneId: "E",
    name: "Jayanta",
    sanskritName: "जयंत (विजय)",
    direction: "East",
    padaNumber: 3,
    angleStart: 101.25,
    angleEnd: 112.5,
    centerAngle: 106.875,
    isAuspicious: true,
    auspiciousGrade: "High",
    effects: "Unstoppable victory, energetic enthusiasm, fame, and royal patronage.",
    description: "Supreme eastern royal gate! Bestows societal influence, political success, and vitality.",
    remedy: "Grand auspicious entrance. Install polished teakwood threshold with brass bells."
  },
  {
    id: "E4",
    zoneId: "ESE",
    name: "Indra",
    sanskritName: "इंद्र (राज द्वार)",
    direction: "East",
    padaNumber: 4,
    angleStart: 112.5,
    angleEnd: 123.75,
    centerAngle: 118.125,
    isAuspicious: true,
    auspiciousGrade: "High",
    effects: "Direct support from authorities, government clearances, and prestigious networking.",
    description: "The gate of Lord Indra, bringing government contracts, promotions, and societal leadership.",
    remedy: "Affix a Copper Surya Yantra outside the door above the lintel."
  },
  {
    id: "E5",
    zoneId: "ESE",
    name: "Surya",
    sanskritName: "सूर्य",
    direction: "East",
    padaNumber: 5,
    angleStart: 123.75,
    angleEnd: 135.0,
    centerAngle: 129.375,
    isAuspicious: false,
    auspiciousGrade: "Negative",
    effects: "Extreme anger, cardiovascular strain, and legal scrutiny.",
    description: "Excess solar heat creates irritable temperaments in residents.",
    remedy: "Affix green color tape on threshold and place indoor leafy bamboo."
  },
  {
    id: "E6",
    zoneId: "SE",
    name: "Satya",
    sanskritName: "सत्य",
    direction: "East",
    padaNumber: 6,
    angleStart: 135.0,
    angleEnd: 146.25,
    centerAngle: 140.625,
    isAuspicious: false,
    auspiciousGrade: "Negative",
    effects: "Unreliable commitments, broken business promises, untruthfulness.",
    description: "Residents struggle to keep contractual promises.",
    remedy: "Cut door energy with Stainless Steel strip and embed Brass Swastik 3D plaque."
  },
  {
    id: "E7",
    zoneId: "SE",
    name: "Bhrisha",
    sanskritName: "भृश",
    direction: "East",
    padaNumber: 7,
    angleStart: 146.25,
    angleEnd: 157.5,
    centerAngle: 151.875,
    isAuspicious: false,
    auspiciousGrade: "Negative",
    effects: "Infertility hurdles, emotional burnout, excessive sexual impulse.",
    description: "Overheats the female reproductive system.",
    remedy: "Affix Copper strip on the door floor frame."
  },
  {
    id: "E8",
    zoneId: "SSE",
    name: "Antariksha",
    sanskritName: "अंतरिक्ष (आकाश)",
    direction: "East",
    padaNumber: 8,
    angleStart: 157.5,
    angleEnd: 168.75,
    centerAngle: 163.125,
    isAuspicious: false,
    auspiciousGrade: "Severe",
    effects: "Theft, burglary, sudden major financial fraud.",
    description: "Prohibited threshold; invites pilferage and deceit.",
    remedy: "Must be sealed with Copper strip and virtual boundary mirrors."
  },

  // SOUTH (S1 to S8)
  {
    id: "S1",
    zoneId: "SSE",
    name: "Anila",
    sanskritName: "अनिल",
    direction: "South",
    padaNumber: 1,
    angleStart: 168.75,
    angleEnd: 180.0,
    centerAngle: 174.375,
    isAuspicious: false,
    auspiciousGrade: "Negative",
    effects: "Unruly children, discord between parents and sons.",
    description: "Unstable wind-fire blend in the south.",
    remedy: "Affix 3-inch Copper metallic strip along the threshold."
  },
  {
    id: "S2",
    zoneId: "S",
    name: "Pusha",
    sanskritName: "पूषा",
    direction: "South",
    padaNumber: 2,
    angleStart: 180.0,
    angleEnd: 191.25,
    centerAngle: 185.625,
    isAuspicious: false,
    auspiciousGrade: "Neutral",
    effects: "Bondage to routine jobs, feeling trapped in service.",
    description: "Restricts entrepreneurial risk-taking.",
    remedy: "Paste red/terracotta vinyl tape on the floor threshold."
  },
  {
    id: "S3",
    zoneId: "S",
    name: "Vitatha",
    sanskritName: "वितथ (समृद्धि)",
    direction: "South",
    padaNumber: 3,
    angleStart: 191.25,
    angleEnd: 202.5,
    centerAngle: 196.875,
    isAuspicious: true,
    auspiciousGrade: "High",
    effects: "Grand industrial wealth, bold executive confidence, and high social respect.",
    description: "One of the most powerful auspicious southern gates! Exceptional for entrepreneurs, politicians, and real-estate developers.",
    remedy: "Highly auspicious! Paint the door deep mahogany or warm teak; install heavy brass handles."
  },
  {
    id: "S4",
    zoneId: "SSW",
    name: "Gruhakshata",
    sanskritName: "गृहक्षत",
    direction: "South",
    padaNumber: 4,
    angleStart: 202.5,
    angleEnd: 213.75,
    centerAngle: 208.125,
    isAuspicious: true,
    auspiciousGrade: "High",
    effects: "Birth of brave sons, prosperity in real estate, unwavering courage.",
    description: "Auspicious southern gateway granting stability and domestic abundance.",
    remedy: "Maintain clean entrance with copper plates and solid door frame."
  },
  {
    id: "S5",
    zoneId: "SSW",
    name: "Yama",
    sanskritName: "यम (मृत्यु)",
    direction: "South",
    padaNumber: 5,
    angleStart: 213.75,
    angleEnd: 225.0,
    centerAngle: 219.375,
    isAuspicious: false,
    auspiciousGrade: "Severe",
    effects: "Heavy debt traps, fear of untimely demise, chronic illness.",
    description: "The gateway of Yama's judicial retribution.",
    remedy: "Embed Brass metallic strip in the threshold and affix a consecrated Brass Bagua/Vastu plate."
  },
  {
    id: "S6",
    zoneId: "SW",
    name: "Gandharva",
    sanskritName: "गंधर्व",
    direction: "South",
    padaNumber: 6,
    angleStart: 225.0,
    angleEnd: 236.25,
    centerAngle: 230.625,
    isAuspicious: false,
    auspiciousGrade: "Negative",
    effects: "Indulgence in substance abuse, profligacy, waste of family funds.",
    description: "Eats away capital through sensual dissipation.",
    remedy: "Affix Brass strip with 3D Brass Nandi Bull or Brass Helixes."
  },
  {
    id: "S7",
    zoneId: "SW",
    name: "Bhrigaraja",
    sanskritName: "भृङ्गराज",
    direction: "South",
    padaNumber: 7,
    angleStart: 236.25,
    angleEnd: 247.5,
    centerAngle: 241.875,
    isAuspicious: false,
    auspiciousGrade: "Negative",
    effects: "Depression, chronic loneliness, loss of life vigor.",
    description: "Drains mental resilience in the Southwest.",
    remedy: "Paste yellow tape and ground with solid Lead Helix and Black Tourmaline crystal."
  },
  {
    id: "S8",
    zoneId: "WSW",
    name: "Mriga",
    sanskritName: "मृग",
    direction: "South",
    padaNumber: 8,
    angleStart: 247.5,
    angleEnd: 258.75,
    centerAngle: 253.125,
    isAuspicious: false,
    auspiciousGrade: "Negative",
    effects: "Loss of offspring strength, financial dry spells.",
    description: "Causes instability of residence and frequent displacement.",
    remedy: "Install Brass threshold strip."
  },

  // WEST (W1 to W8)
  {
    id: "W1",
    zoneId: "WSW",
    name: "Pitra",
    sanskritName: "पितृ (पूर्वज)",
    direction: "West",
    padaNumber: 1,
    angleStart: 258.75,
    angleEnd: 270.0,
    centerAngle: 264.375,
    isAuspicious: false,
    auspiciousGrade: "Negative",
    effects: "Pitra Dosha, delays in progeny marriage, lack of generational wealth.",
    description: "Ancestral quadrant entrance requiring deep grounding.",
    remedy: "Affix Brass strip and keep ancestor pictures elsewhere in an auspicious zone."
  },
  {
    id: "W2",
    zoneId: "W",
    name: "Dauvarika",
    sanskritName: "दौवारिक (द्वारपाल)",
    direction: "West",
    padaNumber: 2,
    angleStart: 270.0,
    angleEnd: 281.25,
    centerAngle: 275.625,
    isAuspicious: false,
    auspiciousGrade: "Neutral",
    effects: "Instability in relationships, infidelity, uninvited guests.",
    description: "Gatekeeper zone needing strict energetic sealing.",
    remedy: "Install white color tape and iron/steel plate."
  },
  {
    id: "W3",
    zoneId: "W",
    name: "Sugriva (Pushpadanta)",
    sanskritName: "सुग्रीव / पुष्पदंत",
    direction: "West",
    padaNumber: 3,
    angleStart: 281.25,
    angleEnd: 292.5,
    centerAngle: 286.875,
    isAuspicious: true,
    auspiciousGrade: "High",
    effects: "Flourishing commerce, high business turnover, intellectual genius, and wealth.",
    description: "Supreme Western Royal Gate! Produces extraordinary gains in trading, software, and finance.",
    remedy: "Excellent gateway! Install white marble or silver-finish threshold with auspicious bells."
  },
  {
    id: "W4",
    zoneId: "WNW",
    name: "Varuna",
    sanskritName: "वरुण (महा-लाभ)",
    direction: "West",
    padaNumber: 4,
    angleStart: 292.5,
    angleEnd: 303.75,
    centerAngle: 298.125,
    isAuspicious: true,
    auspiciousGrade: "High",
    effects: "Continuous material gains, windfall profits, and expansive international trade.",
    description: "Lord of the Oceans doorway; brings ships laden with trade wealth into the house.",
    remedy: "Keep illuminated; install a round silver/steel decorative plate."
  },
  {
    id: "W5",
    zoneId: "WNW",
    name: "Asura",
    sanskritName: "असुर",
    direction: "West",
    padaNumber: 5,
    angleStart: 303.75,
    angleEnd: 315.0,
    centerAngle: 309.375,
    isAuspicious: false,
    auspiciousGrade: "Negative",
    effects: "Chronic fatigue, feelings of depression, disappointment in business.",
    description: "Asura energy causing lethargy and pessimistic outlook.",
    remedy: "Affix Stainless Steel metallic strip into the door floor frame."
  },
  {
    id: "W6",
    zoneId: "NW",
    name: "Shosha",
    sanskritName: "शोष (सुखाना)",
    direction: "West",
    padaNumber: 6,
    angleStart: 315.0,
    angleEnd: 326.25,
    centerAngle: 320.625,
    isAuspicious: false,
    auspiciousGrade: "Negative",
    effects: "Physical emaciation, dry cough/respiratory ailments, financial depletion.",
    description: "Drying gate that drains savings and bodily vitality.",
    remedy: "Paste white tape on threshold; place a small water bowl with rock salt."
  },
  {
    id: "W7",
    zoneId: "NW",
    name: "Papyakshma",
    sanskritName: "पापयक्ष्मा",
    direction: "West",
    padaNumber: 7,
    angleStart: 326.25,
    angleEnd: 337.5,
    centerAngle: 331.875,
    isAuspicious: false,
    auspiciousGrade: "Severe",
    effects: "Drug abuse, chronic vices, legal arrest, and societal humiliation.",
    description: "Extremely toxic gateway leading to vices.",
    remedy: "Must be completely neutralised using Stainless Steel wire and brass helixes."
  },
  {
    id: "W8",
    zoneId: "NNW",
    name: "Roga",
    sanskritName: "रोग",
    direction: "West",
    padaNumber: 8,
    angleStart: 337.5,
    angleEnd: 348.75,
    centerAngle: 343.125,
    isAuspicious: false,
    auspiciousGrade: "Severe",
    effects: "Deadly chronic ailments, frequent hospitalization, suicide ideation.",
    description: "Disease portal requiring immediate energetic sealing.",
    remedy: "Affix 3-inch Stainless Steel strip with blue tape overlay."
  }
];

// ==========================================
// 3. ANGLE & ZONE CALCULATION ENGINE
// ==========================================

/**
 * Calculates clockwise azimuth angle (0° to 359.9°) from Center (Brahmasthan)
 * to target point, normalized to True North given a North orientation offset.
 */
export function calculatePointAzimuth(
  centerX: number,
  centerY: number,
  pointX: number,
  pointY: number,
  northOffsetDeg: number
): number {
  const dx = pointX - centerX;
  const dy = pointY - centerY; // In SVG / canvas, Y increases downwards

  // Standard cartesian angle where 0 is East (+X)
  // Converting to compass azimuth where 0 is North (-Y in screen coordinates):
  // Angle = atan2(dx, -dy) in radians
  let rad = Math.atan2(dx, -dy);
  let deg = (rad * 180) / Math.PI;
  if (deg < 0) deg += 360;

  // Apply North offset (Rotate grid by northOffsetDeg)
  let normalizedAzimuth = (deg - northOffsetDeg) % 360;
  if (normalizedAzimuth < 0) normalizedAzimuth += 360;

  return parseFloat(normalizedAzimuth.toFixed(2));
}

/**
 * Maps an azimuth degree (0°–359.9°) to one of the 16 MahaVastu Zones
 */
export function getMahaVastuZoneByAngle(angleDeg: number): MahaVastuZone {
  const normalized = ((angleDeg % 360) + 360) % 360;

  for (const zone of MAHAVASTU_16_ZONES) {
    if (zone.angleStart > zone.angleEnd) {
      // Wraps around 360 (North: 348.75 to 11.25)
      if (normalized >= zone.angleStart || normalized < zone.angleEnd) {
        return zone;
      }
    } else {
      if (normalized >= zone.angleStart && normalized < zone.angleEnd) {
        return zone;
      }
    }
  }

  return MAHAVASTU_16_ZONES[0]; // Fallback to North
}

/**
 * Maps an azimuth degree (0°–359.9°) to one of the 32 Devata Padas
 */
export function getDevataPadaByAngle(angleDeg: number): DevataPada {
  const normalized = ((angleDeg % 360) + 360) % 360;

  for (const pada of DEVATA_32_PADAS) {
    if (pada.angleStart > pada.angleEnd) {
      // Wraps around 360 (e.g., N1: 348.75 to 0.0)
      if (normalized >= pada.angleStart || normalized < pada.angleEnd) {
        return pada;
      }
    } else {
      if (normalized >= pada.angleStart && normalized < pada.angleEnd) {
        return pada;
      }
    }
  }

  return DEVATA_32_PADAS[2]; // Fallback to N3 Mukhya
}

// ==========================================
// 4. ROOM COMPLIANCE & NON-DESTRUCTIVE REMEDY ENGINE
// ==========================================
export function evaluateRoomPlacement(
  category: RoomCategory,
  zoneId: string,
  angleDeg: number,
  padaId?: string
): {
  complianceRating: "Auspicious" | "Neutral" | "Dosha" | "Severe Dosha";
  shastricVerdict: string;
  recommendedRemedy: string;
  metalStripRemedy?: string;
  colorTapeRemedy?: string;
  pyramidYantraRemedy?: string;
} {
  const zone = MAHAVASTU_16_ZONES.find((z) => z.id === zoneId) || MAHAVASTU_16_ZONES[0];

  switch (category) {
    case "entrance": {
      const pada = padaId
        ? DEVATA_32_PADAS.find((p) => p.id === padaId)
        : getDevataPadaByAngle(angleDeg);

      if (pada?.isAuspicious) {
        return {
          complianceRating: "Auspicious",
          shastricVerdict: `Door in ${pada.name} (${pada.id}): Auspicious entrance. ${pada.effects}`,
          recommendedRemedy: "No negative remedy needed. Maintain bright warm lighting and auspicious Toran.",
          metalStripRemedy: "None (Auspicious)",
          colorTapeRemedy: "None"
        };
      } else {
        return {
          complianceRating: pada?.auspiciousGrade === "Severe" ? "Severe Dosha" : "Dosha",
          shastricVerdict: `Door in ${pada?.name || zone.name} (${pada?.id || zoneId}): Inauspicious entrance. ${pada?.effects || "Disturbs incoming prana."}`,
          recommendedRemedy: pada?.remedy || `Install ${zone.metalRemedy} metal strip and paste ${zone.colorTapeRemedy} tape along the threshold.`,
          metalStripRemedy: `${zone.metalRemedy} 3-inch Strip embedded in threshold`,
          colorTapeRemedy: `${zone.colorTapeRemedy} Vinyl Tape along door perimeter`,
          pyramidYantraRemedy: "Install Consecrated Vastu Door Guardian Yantra & Brass Swastik"
        };
      }
    }

    case "kitchen": {
      if (zoneId === "SE" || zoneId === "SSE") {
        return {
          complianceRating: "Auspicious",
          shastricVerdict: "Kitchen in Agneya (Fire Zone): Perfect classical alignment for Agni Dev. Promotes digestive health, radiant cash flow, and family enthusiasm.",
          recommendedRemedy: "Cook facing East. Keep cooktop platform in green or brown granite."
        };
      } else if (zoneId === "NW") {
        return {
          complianceRating: "Neutral",
          shastricVerdict: "Kitchen in Vayavya (Air/Support Zone): Vayu helps Agni burn, making this an acceptable secondary alternative.",
          recommendedRemedy: "Keep cooktop facing East. Ensure exhaust chimney maintains steady outward airflow."
        };
      } else if (zoneId === "NE" || zoneId === "NNE" || zoneId === "N") {
        return {
          complianceRating: "Severe Dosha",
          shastricVerdict: "Fire in Water Zone (Major Agni-Jal Clash): Causes severe financial volatility, mental distress, neurological strain, and heavy medical expenses.",
          recommendedRemedy: "DO NOT DEMOLISH. Place a 20mm thick natural Green Baroda or Yellow Jaisalmer Marble slab under the cooktop and paste a 2-inch Green tape along the kitchen counter perimeter.",
          metalStripRemedy: "Aluminium Strip under the kitchen platform",
          colorTapeRemedy: "Green Color Tape on 3 sides of stove counter",
          pyramidYantraRemedy: "Install Zinc Helix and Copper Agni Yantra"
        };
      } else if (zoneId === "SW") {
        return {
          complianceRating: "Severe Dosha",
          shastricVerdict: "Kitchen in Nairrutya (South-West): Fire burns down Earth stability, causing marital strife, skill deterioration, and loss of ancestral roots.",
          recommendedRemedy: "Place a Yellow Jaisalmer slab under the gas stove and affix a 3-inch Brass strip along the kitchen threshold.",
          metalStripRemedy: "Brass Strip",
          colorTapeRemedy: "Yellow Color Tape"
        };
      } else {
        return {
          complianceRating: "Dosha",
          shastricVerdict: `Kitchen in ${zone.name}: Sub-optimal elemental placement causing energy friction with ${zone.element} element.`,
          recommendedRemedy: `Neutralize cooktop using an elemental stone slab suited to ${zone.element} and tape skirting.`,
          colorTapeRemedy: `${zone.colorTapeRemedy} Color Tape around cooktop base`
        };
      }
    }

    case "toilet":
    case "septic_tank": {
      if (zoneId === "SSW" || zoneId === "WNW" || zoneId === "ESE") {
        return {
          complianceRating: "Auspicious",
          shastricVerdict: `Toilet/Septic Tank in ${zone.name} (${zone.hindiName}): Ideal Vedic placement for waste elimination and emotional detoxification. Disposes of physical and psychological toxins smoothly.`,
          recommendedRemedy: "Keep seat lid closed when not in use. Maintain fresh rock salt bowl in corner."
        };
      } else if (zoneId === "NE" || zoneId === "NNE") {
        return {
          complianceRating: "Severe Dosha",
          shastricVerdict: "Toilet in Ishanya (Sacred North-East): Cardinal Vastu Crime. Severely impairs intellect, causes chronic neurological/brain ailments, paralyzes cash opportunities, and blocks divine grace.",
          recommendedRemedy: "URGENT NON-DESTRUCTIVE REMEDY: Encircle the commode on 3 sides with a 3-inch Aluminium metallic strip cut into the floor joints. Paste blue elemental tape and place a glass bowl of natural sea salt replaced weekly. Never use this commode if an alternative exists.",
          metalStripRemedy: "Aluminium Strip 3-side cut around commode base",
          colorTapeRemedy: "Blue Vinyl Tape around WC base",
          pyramidYantraRemedy: "Install Sphatik (Quartz) Shiva Lingam & Amethyst cluster outside bathroom door"
        };
      } else if (zoneId === "SW") {
        return {
          complianceRating: "Severe Dosha",
          shastricVerdict: "Toilet in Nairrutya (South-West): Disposes of marriage, skill mastery, family stability, and patriarch's health into the sewer.",
          recommendedRemedy: "Encircle the WC commode base with a 3-inch Brass metallic strip and paste yellow tape. Keep bathroom door shut 24/7.",
          metalStripRemedy: "Brass Strip 3-side around commode base",
          colorTapeRemedy: "Yellow Tape around commode"
        };
      } else {
        return {
          complianceRating: "Dosha",
          shastricVerdict: `Toilet in ${zone.name}: Drains away the positive attributes of ${zone.name} (${zone.keyAttributes}).`,
          recommendedRemedy: `Encircle the commode on 3 sides with a ${zone.metalRemedy} metal strip and paste ${zone.colorTapeRemedy} tape to block energetic leakage.`,
          metalStripRemedy: `${zone.metalRemedy} Strip around commode base`,
          colorTapeRemedy: `${zone.colorTapeRemedy} Tape on floor joints`
        };
      }
    }

    case "master_bedroom": {
      if (zoneId === "SW" || zoneId === "S") {
        return {
          complianceRating: "Auspicious",
          shastricVerdict: "Master Bedroom in South-West / South: Supreme Vedic placement for family head. Imparts grounding, authority, deep delta sleep, and unwavering marital stability.",
          recommendedRemedy: "Sleep with head towards South or East. Use solid teakwood bed without metal storage underneath."
        };
      } else if (zoneId === "W" || zoneId === "NNW") {
        return {
          complianceRating: "Auspicious",
          shastricVerdict: `Master Bedroom in ${zone.name}: Very good alignment for gains, business focus, and romance.`,
          recommendedRemedy: "Sleep with head towards South. Ensure mirror does not reflect sleeping body."
        };
      } else if (zoneId === "SE" || zoneId === "SSW" || zoneId === "WNW") {
        return {
          complianceRating: "Dosha",
          shastricVerdict: `Bedroom in ${zone.name}: Induces constant restlessness, sleep deprivation, marital arguments, or lethargy.`,
          recommendedRemedy: `Sleep with head towards East. Affix a ${zone.metalRemedy} strip on the bedroom threshold to shield negative drain.`,
          metalStripRemedy: `${zone.metalRemedy} strip at room entrance`
        };
      } else {
        return {
          complianceRating: "Neutral",
          shastricVerdict: `Bedroom in ${zone.name}: Moderate placement. Requires balanced head orientation and pastel color palettes.`,
          recommendedRemedy: "Keep headboard facing South or East. Avoid overhead exposed ceiling beams."
        };
      }
    }

    case "mandir_puja": {
      if (zoneId === "NE" || zoneId === "NNE" || zoneId === "E" || zoneId === "N") {
        return {
          complianceRating: "Auspicious",
          shastricVerdict: `Mandir in ${zone.name}: Supreme sacred placement. Attracts divine sattvic frequencies, peace of mind, and continuous prosperity.`,
          recommendedRemedy: "Keep altar elevated on white marble or teakwood. Devotee should face East or North during prayer."
        };
      } else if (zoneId === "S" || zoneId === "SW" || zoneId === "SSW") {
        return {
          complianceRating: "Severe Dosha",
          shastricVerdict: `Mandir in ${zone.name}: Heavily conflicted placement. Negative or heavy disposal prana clashes with divine worship, causing domestic instability.`,
          recommendedRemedy: "Virtually elevate the mandir on a pure white marble platform, place a brass Om sign, and install an energized brass Sri Yantra with Sphatik cluster.",
          colorTapeRemedy: "Yellow tape around base",
          pyramidYantraRemedy: "Consecrated Brass Sri Yantra"
        };
      } else {
        return {
          complianceRating: "Neutral",
          shastricVerdict: `Mandir in ${zone.name}: Acceptable secondary placement. Keep light, fragrant, and illuminated.`,
          recommendedRemedy: "Ensure altar is not placed adjacent to a toilet wall or directly beneath a staircase."
        };
      }
    }

    case "cash_locker": {
      if (zoneId === "N" || zoneId === "W" || zoneId === "SW") {
        return {
          complianceRating: "Auspicious",
          shastricVerdict: `Cash Locker in ${zone.name}: Opens towards North (Kubera) or East (Indra). Promotes exponential wealth accumulation and asset security.`,
          recommendedRemedy: "Ensure safe door opens towards North. Keep a silver coin with Lakshmi-Ganesha inside."
        };
      } else if (zoneId === "SE" || zoneId === "SSW") {
        return {
          complianceRating: "Dosha",
          shastricVerdict: `Cash Locker in ${zone.name}: Liquid cash gets rapidly burnt or disposed of without saving.`,
          recommendedRemedy: "Place a small brass Kubera statue on the safe and stick a green tape around the base."
        };
      } else {
        return {
          complianceRating: "Neutral",
          shastricVerdict: `Cash Locker in ${zone.name}: Moderate safety. Place against solid South or West wall opening North/East.`,
          recommendedRemedy: "Avoid placing safe directly under beams or opposite toilet doors."
        };
      }
    }

    case "water_tank_ug": {
      if (zoneId === "N" || zoneId === "NE" || zoneId === "NNE" || zoneId === "E") {
        return {
          complianceRating: "Auspicious",
          shastricVerdict: `Underground Water Tank in ${zone.name}: Elemental harmony with Water (Jal Tattva). Promotes wealth inflow, physical vitality, and public stature.`,
          recommendedRemedy: "Keep tank clean and covered. Ensures constant positive bio-resonance."
        };
      } else if (zoneId === "SE" || zoneId === "S" || zoneId === "SW") {
        return {
          complianceRating: "Severe Dosha",
          shastricVerdict: `Underground Water in ${zone.name}: Severe subterranean depression in Fire/Earth quadrant. Destroys cash flow, female health, and foundational stability.`,
          recommendedRemedy: "Seal the depression energetically by embedding heavy copper rods or lead coils around the tank perimeter.",
          metalStripRemedy: "Heavy Copper / Lead boundary ring",
          pyramidYantraRemedy: "Install 9 Solid Brass Helixes & Yellow Jasper"
        };
      } else {
        return {
          complianceRating: "Dosha",
          shastricVerdict: `Underground Water in ${zone.name}: Sub-optimal depression causing instability.`,
          recommendedRemedy: "Install perimeter metal strip matching the quadrant."
        };
      }
    }

    default: {
      return {
        complianceRating: "Neutral",
        shastricVerdict: `${category.replace(/_/g, " ")} placed in ${zone.name}: General functional utility.`,
        recommendedRemedy: "Maintain clutter-free space with good ventilation and appropriate lighting."
      };
    }
  }
}

// ==========================================
// 5. AYADI SHADVARGA FORMULA CALCULATOR
// ==========================================
export function calculateAyadiShadvarga(
  lengthFeet: number,
  widthFeet: number
): AyadiCalculationResult {
  const safeL = Math.max(1, lengthFeet);
  const safeW = Math.max(1, widthFeet);
  const areaSqFeet = safeL * safeW;

  // 1 Hasta ≈ 1.5 Feet => Area in Hasta = Area / (1.5 * 1.5) = Area / 2.25
  const areaHasta = Math.round(areaSqFeet / 2.25);
  const A = Math.max(1, areaHasta);

  // 1. Aaya (Income) = (Area * 8) % 12
  let aaya = (A * 8) % 12;
  if (aaya === 0) aaya = 12;

  // 2. Vyaya (Expenditure) = (Area * 9) % 10
  let vyaya = (A * 9) % 10;
  if (vyaya === 0) vyaya = 10;

  // 3. Yoni (Directional Animal) = (Area * 3) % 8
  let yoni = (A * 3) % 8;
  if (yoni === 0) yoni = 8;

  const YONI_NAMES: Record<number, { name: string; direction: string }> = {
    1: { name: "Dhvaja (Flag / Lion)", direction: "East (Supreme Auspiciousness & Victory)" },
    2: { name: "Dhumra (Smoke)", direction: "South-East (Inauspicious / Anxieties)" },
    3: { name: "Simha (Lion)", direction: "South (Bold Victory & Royal Prestige)" },
    4: { name: "Shwana (Dog)", direction: "South-West (Inauspicious / Domestic Enmity)" },
    5: { name: "Vrisha (Bull)", direction: "West (Financial Stability & Agriculture)" },
    6: { name: "Khara (Donkey)", direction: "North-West (Loss of Effort / Monotony)" },
    7: { name: "Gaja (Elephant)", direction: "North (Supreme Wealth & Royal Majesty)" },
    8: { name: "Vayasa (Crow)", direction: "North-East (Poverty / Discord)" }
  };

  // 4. Vara (Solar Day) = (Area * 9) % 7
  let vara = (A * 9) % 7;
  if (vara === 0) vara = 7;
  const VARA_NAMES: Record<number, string> = {
    1: "Ravivara (Sun - Good)",
    2: "Somavara (Moon - Very Auspicious)",
    3: "Mangalavara (Mars - Violent)",
    4: "Budhavara (Mercury - Auspicious)",
    5: "Guruvara (Jupiter - Supreme)",
    6: "Shukravara (Venus - Wealth)",
    7: "Shanivara (Saturn - Delays)"
  };

  // 5. Tithi (Lunar Phase) = (Area * 8) % 30
  let tithi = (A * 8) % 30;
  if (tithi === 0) tithi = 30;
  const tithiName = tithi <= 15 ? `Shukla Paksha ${tithi}` : `Krishna Paksha ${tithi - 15}`;

  // 6. Ayu (Longevity Span in Years) = (Area * 27) % 100
  let ayu = (A * 27) % 100;
  if (ayu === 0) ayu = 100;

  const isIncomeGreaterThanExpense = aaya > vyaya;
  const isOddYoni = [1, 3, 5, 7].includes(yoni);
  const isProsperous = isIncomeGreaterThanExpense && isOddYoni && ayu >= 50;

  const recommendations: string[] = [];
  if (aaya <= vyaya) {
    recommendations.push("Aaya (Income: " + aaya + ") is less than or equal to Vyaya (Expense: " + vyaya + "). Tweak length or width slightly by a few inches so Aaya exceeds Vyaya.");
  } else {
    recommendations.push("Aaya exceeds Vyaya: Excellent income-to-expenditure ratio for continuous capital buildup.");
  }

  if (!isOddYoni) {
    recommendations.push("Even Yoni (" + YONI_NAMES[yoni]?.name + ") is traditionally discouraged. Aim for Dhvaja (1), Simha (3), Vrisha (5), or Gaja (7).");
  } else {
    recommendations.push("Auspicious Odd Yoni (" + YONI_NAMES[yoni]?.name + ") verified. Strong directional prana.");
  }

  if (ayu < 50) {
    recommendations.push("Building longevity index is below 50 years (" + ayu + " yrs). Adjust dimensions for longevity score > 60.");
  } else {
    recommendations.push("Building longevity index (" + ayu + " yrs) is robust and long-lasting.");
  }

  return {
    lengthFeet: safeL,
    widthFeet: safeW,
    areaSqFeet,
    areaHasta: A,
    aaya,
    vyaya,
    yoni,
    yoniName: YONI_NAMES[yoni]?.name || "Unknown",
    yoniDirection: YONI_NAMES[yoni]?.direction || "Unknown",
    vara,
    varaName: VARA_NAMES[vara] || "Unknown",
    tithi,
    tithiName,
    ayu,
    isProsperous,
    verdict: isProsperous
      ? "Auspicious Ayadi Shadvarga Dimensions: Generates perpetual financial gain, prestige, and building longevity."
      : "Flawed Ayadi Configuration: Dimensions produce negative expenditure ratio or inauspicious Yoni vibration.",
    recommendations
  };
}

// ==========================================
// 6. OVERALL VASTU COMPLIANCE SCORE ENGINE
// ==========================================
export function calculateOverallVastuScore(placedRooms: PlacedRoomItem[]): {
  overallScorePct: number;
  grade: "A+ (Param Shrestha)" | "A (Auspicious)" | "B (Moderate)" | "C (Dosha Afflicted)" | "D (Severe Rectification Required)";
  breakdown: {
    entranceScore: number; // / 25
    kitchenScore: number; // / 20
    toiletScore: number; // / 25
    masterBedScore: number; // / 15
    mandirScore: number; // / 15
  };
  keyDoshas: string[];
  immediateRemedies: string[];
} {
  let entranceScore = 25;
  let kitchenScore = 20;
  let toiletScore = 25;
  let masterBedScore = 15;
  let mandirScore = 15;

  const keyDoshas: string[] = [];
  const immediateRemedies: string[] = [];

  for (const item of placedRooms) {
    if (item.category === "entrance") {
      if (item.complianceRating === "Severe Dosha") {
        entranceScore = Math.max(0, entranceScore - 20);
        keyDoshas.push(`Major Inauspicious Entrance in ${item.detectedZoneId} (${item.detectedPadaId || ""})`);
        immediateRemedies.push(item.recommendedRemedy);
      } else if (item.complianceRating === "Dosha") {
        entranceScore = Math.max(5, entranceScore - 12);
        keyDoshas.push(`Sub-optimal Entrance in ${item.detectedZoneId}`);
        immediateRemedies.push(item.recommendedRemedy);
      }
    } else if (item.category === "kitchen") {
      if (item.complianceRating === "Severe Dosha") {
        kitchenScore = 0;
        keyDoshas.push(`Kitchen in ${item.detectedZoneId} (Fire-Water clash or Earth burn)`);
        immediateRemedies.push(item.recommendedRemedy);
      } else if (item.complianceRating === "Dosha") {
        kitchenScore = 8;
        keyDoshas.push(`Kitchen in ${item.detectedZoneId}`);
        immediateRemedies.push(item.recommendedRemedy);
      }
    } else if (item.category === "toilet" || item.category === "septic_tank") {
      if (item.complianceRating === "Severe Dosha") {
        toiletScore = Math.max(0, toiletScore - 22);
        keyDoshas.push(`Toilet in ${item.detectedZoneId} (Severe Prana drain in sacred zone)`);
        immediateRemedies.push(item.recommendedRemedy);
      } else if (item.complianceRating === "Dosha") {
        toiletScore = Math.max(5, toiletScore - 12);
        keyDoshas.push(`Toilet in ${item.detectedZoneId}`);
        immediateRemedies.push(item.recommendedRemedy);
      }
    } else if (item.category === "master_bedroom") {
      if (item.complianceRating === "Dosha") {
        masterBedScore = 5;
        keyDoshas.push(`Master Bedroom in ${item.detectedZoneId}`);
        immediateRemedies.push(item.recommendedRemedy);
      }
    } else if (item.category === "mandir_puja") {
      if (item.complianceRating === "Severe Dosha") {
        mandirScore = 0;
        keyDoshas.push(`Mandir in ${item.detectedZoneId} (Clashing with heavy/waste zone)`);
        immediateRemedies.push(item.recommendedRemedy);
      } else if (item.complianceRating === "Neutral") {
        mandirScore = 10;
      }
    }
  }

  const total = entranceScore + kitchenScore + toiletScore + masterBedScore + mandirScore;

  let grade: "A+ (Param Shrestha)" | "A (Auspicious)" | "B (Moderate)" | "C (Dosha Afflicted)" | "D (Severe Rectification Required)";
  if (total >= 90) grade = "A+ (Param Shrestha)";
  else if (total >= 75) grade = "A (Auspicious)";
  else if (total >= 60) grade = "B (Moderate)";
  else if (total >= 40) grade = "C (Dosha Afflicted)";
  else grade = "D (Severe Rectification Required)";

  return {
    overallScorePct: total,
    grade,
    breakdown: {
      entranceScore,
      kitchenScore,
      toiletScore,
      masterBedScore,
      mandirScore
    },
    keyDoshas,
    immediateRemedies
  };
}

// ==========================================
// 6. PLOT & LAND SELECTION (BHOOMI PARIKSHA)
// ==========================================
export function evaluatePlotSelection(
  shape: PlotShape,
  slope: SlopeDirection,
  roadThrust: VeedhiShoolaThrust,
  soilQuality: "Brahmin_White_Sweet" | "Kshatriya_Red_Astringent" | "Vaishya_Yellow_Sour" | "Shudra_Black_Bitter"
): PlotAnalysisResult {
  let score = 100;
  const pros: string[] = [];
  const cons: string[] = [];
  const remedies: string[] = [];

  // 1. Shape Evaluation
  if (shape === "square") {
    pros.push("Square Plot (Chatushkona): Perfect balance of cosmic prana, 100% stable magnetic field.");
  } else if (shape === "rectangular") {
    pros.push("Rectangular Plot (Ayatakara): Classical harmonious proportions; ideal if length:width <= 1:2.");
  } else if (shape === "gaumukhi") {
    pros.push("Gaumukhi (Cow Face - narrow front, broad back): Highly auspicious for residential living, ensures capital retention.");
  } else if (shape === "shermukhi") {
    pros.push("Shermukhi (Lion Face - broad front, narrow back): Dynamic fire energy, highly auspicious for commercial businesses and retail.");
    cons.push("Shermukhi can cause restlessness if used for residential dwelling.");
    remedies.push("If residential, install Lead Helix wire in the rear boundary to anchor Pranic flow.");
    score -= 10;
  } else if (shape === "triangular") {
    cons.push("Triangular Plot (Trikona): Acute angle induces Agni Dosha, litigation, and internal strife.");
    remedies.push("Cut off the acute triangular apex with a 5-foot brick wall and dedicate the wedge as a garden with Brass Swastika and Tulsi.");
    score -= 35;
  } else if (shape === "circular") {
    cons.push("Circular Plot: Disperses pranic energy unevenly; suitable only for amphitheaters or planetary domes.");
    score -= 25;
  } else if (shape === "irregular") {
    cons.push("Irregular Plot (Vishama): Distorts all 16 directional axes and causes chronic imbalance.");
    remedies.push("Compound the land into a perfect rectangle using metallic copper grounding wire and plant Ashoka trees.");
    score -= 30;
  }

  // 2. Slope Evaluation
  if (slope === "north_east_down") {
    pros.push("North-East Slope: Jaivik prana water flows towards Ishanya, ensuring perpetual spiritual & financial abundance.");
  } else if (slope === "east_down") {
    pros.push("East Slope: Solar ultraviolet rays penetrate deeply into the site, ensuring health and vitality.");
  } else if (slope === "north_down") {
    pros.push("North Slope: Kubera magnetic alignment encourages liquid wealth and career opportunities.");
  } else if (slope === "south_west_down") {
    cons.push("South-West Slope (Nairitya down): Severe wealth drainage, health decline of family head.");
    remedies.push("Elevate the South-West boundary wall by 3-4 feet higher than North-East and embed 9 Brass Helixes with Lead grounding rods.");
    score -= 30;
  } else if (slope === "south_down") {
    cons.push("South Slope: Leads to unnecessary expenditures and disputes.");
    remedies.push("Construct a heavy retaining wall in South and plant heavy ficus trees.");
    score -= 20;
  } else if (slope === "west_down") {
    cons.push("West Slope: Flushes away business profit margins.");
    score -= 15;
  }

  // 3. Road Thrust (Veedhi Shoola)
  if (roadThrust === "north_east_hit") {
    pros.push("North-East Veedhi Shoola: Highly auspicious T-junction hit; attracts divine grace, expansion, and wisdom.");
  } else if (roadThrust === "north_hit" || roadThrust === "east_hit") {
    pros.push("North/East Road Thrust: Permissible and generally favorable for trade and social recognition.");
  } else if (roadThrust === "south_west_hit") {
    cons.push("South-West Veedhi Shoola: Catastrophic directional spear; attracts accidents, bankruptcy, and acute litigation.");
    remedies.push("Fix an exterior convex Pakua Mirror or Brass Surya Yantra facing the oncoming street, and construct a high masonry deflector wall.");
    score -= 40;
  } else if (roadThrust === "south_east_hit") {
    cons.push("South-East Road Thrust: Fire spear; induces domestic conflict, burglary risk, and female health issues.");
    remedies.push("Affix a consecrated Copper Agni Yantra and plant a dense hedge of bougainvillea or red croton bushes.");
    score -= 25;
  } else if (roadThrust === "north_west_hit") {
    cons.push("North-West Road Thrust: Vayu spear; induces restless roaming, instability in partnerships.");
    score -= 15;
  }

  // 4. Soil Quality
  if (soilQuality === "Brahmin_White_Sweet") {
    pros.push("White Sweet Soil (Brahmin Soil): Excellent high-frequency prana, highly auspicious for meditation, study, and residential bliss.");
  } else if (soilQuality === "Kshatriya_Red_Astringent") {
    pros.push("Red Astringent Soil: High iron mineral vitality; bestows leadership, executive authority, and courage.");
  } else if (soilQuality === "Vaishya_Yellow_Sour") {
    pros.push("Yellow Sour Soil: Fertile commercial vibration; optimal for business premises, trade hubs, and markets.");
  } else {
    cons.push("Black Bitter Soil: High clay moisture, prone to waterlogging and sluggish stagnation.");
    remedies.push("Excavate top 3 feet of soil, discard, and refill with clean river sand and consecrated Pancha Ratna.");
    score -= 10;
  }

  score = Math.max(10, Math.min(100, score));

  let suitability: "Highly Auspicious" | "Moderately Auspicious" | "Conditional with Remedies" | "Avoid / Rejected";
  if (score >= 85) suitability = "Highly Auspicious";
  else if (score >= 70) suitability = "Moderately Auspicious";
  else if (score >= 50) suitability = "Conditional with Remedies";
  else suitability = "Avoid / Rejected";

  return {
    shape,
    slope,
    roadThrust,
    soilQuality,
    overallScore: score,
    suitability,
    pros,
    cons,
    remedies
  };
}

// ==========================================
// 7. COMMERCIAL & INDUSTRIAL VASTU ENGINE
// ==========================================
export function evaluateCommercialVastu(
  propertyType: CommercialPropertyType,
  assignments: Record<string, string> // e.g. { "md_cabin": "SW", "accounts": "SE", ... }
): CommercialAuditItem[] {
  const auditItems: CommercialAuditItem[] = [];

  if (propertyType === "corporate_office") {
    const rules = [
      {
        id: "md_cabin",
        sectorName: "Managing Director / CEO Cabin",
        recommendedZone: "South-West (SW)",
        idealZones: ["SW", "S"],
        impactOptimal: "Authoritative leadership, firm command, decisive strategy, and investor trust.",
        impactClash: "If in NE or NW, leads to constant indecision, loss of organizational control, and frequent leadership turnover.",
        remedy: "Anchor MD desk with a heavy wooden table, sit facing East or North with a solid wall behind, and place a 3D Brass Nandi Bull or Brass Kuber idol."
      },
      {
        id: "accounts_finance",
        sectorName: "Accounts & Financial Controllers",
        recommendedZone: "North (N) or South-East (SE)",
        idealZones: ["N", "SE"],
        impactOptimal: "North attracts steady cash inflow; South-East ensures prompt invoice recoveries and liquidity.",
        impactClash: "If accounts is in SSW or WNW, leads to heavy write-offs, financial leakage, and recurring cash crunches.",
        remedy: "Keep the cash/cheque drawer in North, and place an energizing Brass Kubera Yantra inside."
      },
      {
        id: "sales_marketing",
        sectorName: "Sales & Client Relationship Team",
        recommendedZone: "North-West (NW) or East (E)",
        idealZones: ["NW", "E", "ENE"],
        impactOptimal: "North-West activates supportive clients and quick deal closures; East enhances brand reputation.",
        impactClash: "If in SW, sales velocity becomes sluggish and team members become resistant to travel.",
        remedy: "Place a high-speed metal globe or flying horse statuette on the sales lead's desk."
      },
      {
        id: "conference_room",
        sectorName: "Boardroom & Strategy Brainstorming",
        recommendedZone: "East-North-East (ENE) or North-West (NW)",
        idealZones: ["ENE", "NW", "E"],
        impactOptimal: "Stimulates innovative breakthroughs, consensus among partners, and clear vision.",
        impactClash: "If in South-South-West, meetings turn into unproductive drain of time and demoralizing debates.",
        remedy: "Install diffused warm lighting and place a crystal lotus centerpiece."
      },
      {
        id: "server_room",
        sectorName: "IT Server Room & Network Rack",
        recommendedZone: "South-East (SE)",
        idealZones: ["SE", "SSE"],
        impactOptimal: "Agni element manages continuous thermal output and electrical power without network downtime.",
        impactClash: "If in North-East (Water), server suffers recurring hardware crashes, data corruption, and short-circuits.",
        remedy: "If trapped in NE, place a Jaisalmer yellow marble slab under the server rack and isolate cabling."
      },
      {
        id: "reception_lobby",
        sectorName: "Main Reception & Visitor Waiting",
        recommendedZone: "East (E) or North-East (NE)",
        idealZones: ["E", "NE", "N"],
        impactOptimal: "Welcoming aura, pristine brand impression, positive investor vibes.",
        impactClash: "If in SW, visitors feel dominant or intrusive, and disputes arise during initial discussions.",
        remedy: "Keep a fresh water bowl with floral petals and pleasant lemongrass fragrance."
      }
    ];

    rules.forEach((r) => {
      const actual = assignments[r.id] || "N/A";
      let compliance: "Optimal" | "Permissible" | "Critical Clash" = "Permissible";
      if (r.idealZones.includes(actual)) compliance = "Optimal";
      else if (["SSW", "WNW", "NE"].includes(actual) && r.id === "md_cabin") compliance = "Critical Clash";
      else if (actual === "SSW" && r.id === "accounts_finance") compliance = "Critical Clash";

      auditItems.push({
        id: r.id,
        sectorName: r.sectorName,
        recommendedZone: r.recommendedZone,
        actualZone: actual,
        compliance,
        impactOnBusiness: compliance === "Optimal" ? r.impactOptimal : r.impactClash,
        remedy: r.remedy
      });
    });
  } else if (propertyType === "retail_showroom") {
    const retailRules = [
      {
        id: "cash_counter",
        sectorName: "Cash Counter & POS Billing",
        recommendedZone: "North (N) or North-East (NE)",
        idealZones: ["N", "NE"],
        impactOptimal: "Cash counter facing North maximizes sales volume, customer retention, and billing speed.",
        impactClash: "If cash counter is in South-South-West, margins evaporate in discounts and refunds.",
        remedy: "Affix a green aventurine crystal cluster and keep cashier seated facing East or North."
      },
      {
        id: "entrance_display",
        sectorName: "Prime Showcase & New Arrivals Display",
        recommendedZone: "North-West (NW) or East (E)",
        idealZones: ["NW", "E", "ENE"],
        impactOptimal: "Attracts instant eye-catchers and accelerates stock turnover.",
        impactClash: "If display is dark in South-West, products remain stagnant for months.",
        remedy: "Install high-lux 4000K daylight LED spotlights and rotate displays weekly."
      },
      {
        id: "heavy_inventory",
        sectorName: "Heavy Stockroom & Bulk Storage",
        recommendedZone: "South-West (SW) or South (S)",
        idealZones: ["SW", "S", "W"],
        impactOptimal: "Anchors stability, prevents stock theft, and keeps merchandise in prime condition.",
        impactClash: "If in North-East, blocks positive cosmic wealth currents into the store.",
        remedy: "Ensure heavy metal racks stand firmly along the southern and western walls."
      },
      {
        id: "owner_seat",
        sectorName: "Owner / Proprietor Desk",
        recommendedZone: "South-West (SW)",
        idealZones: ["SW"],
        impactOptimal: "Gives 360° visual control over the store, maintains staff discipline, and commands respect.",
        impactClash: "If owner sits in NW, they become restless and frequently absent from the shop.",
        remedy: "Place a solid backrest chair with a brown or earthy upholstery."
      }
    ];

    retailRules.forEach((r) => {
      const actual = assignments[r.id] || "N/A";
      const compliance = r.idealZones.includes(actual) ? "Optimal" : "Permissible";
      auditItems.push({
        id: r.id,
        sectorName: r.sectorName,
        recommendedZone: r.recommendedZone,
        actualZone: actual,
        compliance,
        impactOnBusiness: compliance === "Optimal" ? r.impactOptimal : r.impactClash,
        remedy: r.remedy
      });
    });
  } else if (propertyType === "manufacturing_factory") {
    const factoryRules = [
      {
        id: "heavy_machinery",
        sectorName: "Heavy Fabrication Machines & Presses",
        recommendedZone: "South (S) or South-West (SW)",
        idealZones: ["S", "SW"],
        impactOptimal: "Vibration dampening, minimal mechanical breakdowns, worker safety.",
        impactClash: "If placed in North-East, causes catastrophic plant accidents, structural cracks, and fatal stoppages.",
        remedy: "Anchor heavy machines on thick RCC vibration-damping pads with lead dampening strips."
      },
      {
        id: "furnace_boiler",
        sectorName: "Boilers, Furnaces & Heat Exchangers",
        recommendedZone: "South-East (SE - Agneya)",
        idealZones: ["SE"],
        impactOptimal: "Optimal thermodynamic efficiency, zero fire hazards, uninterrupted steam/heat flow.",
        impactClash: "If in North-East (Water), boiler suffers frequent tube bursts and thermal quenching.",
        remedy: "If forced in NW or North, encircle the furnace base with a 4mm Copper strip to contain Agni."
      },
      {
        id: "raw_materials",
        sectorName: "Raw Materials Yard / Warehouse",
        recommendedZone: "South-West (SW) or West (W)",
        idealZones: ["SW", "W"],
        impactOptimal: "Protects raw stocks from damage, stabilizes supply chain procurement costs.",
        impactClash: "If in NE, raw materials lie unutilized, locking up working capital.",
        remedy: "Stack raw materials on wooden pallets without touching wet floor."
      },
      {
        id: "finished_goods",
        sectorName: "Finished Goods Dispatch & Loading Bay",
        recommendedZone: "North-West (NW - Vayavya)",
        idealZones: ["NW"],
        impactOptimal: "Air element ensures rapid sales dispatch, swift payment turnaround, zero dead inventory.",
        impactClash: "If in SW, finished goods stagnate, clients cancel orders, and warehouse piles up.",
        remedy: "Paint the loading bay in white/silver accents and maintain high air ventilation."
      },
      {
        id: "effluent_treatment",
        sectorName: "ETP & Water Drainage Discharge",
        recommendedZone: "North-East (NE) or North (N)",
        idealZones: ["NE", "N"],
        impactOptimal: "Water naturally flows along cosmic gradients without backing up.",
        impactClash: "If drainage flows towards South-West, causes heavy environmental penalties and legal cases.",
        remedy: "Direct effluent pipes into a settling tank slope flowing towards the eastern perimeter."
      }
    ];

    factoryRules.forEach((r) => {
      const actual = assignments[r.id] || "N/A";
      const compliance = r.idealZones.includes(actual) ? "Optimal" : "Permissible";
      auditItems.push({
        id: r.id,
        sectorName: r.sectorName,
        recommendedZone: r.recommendedZone,
        actualZone: actual,
        compliance,
        impactOnBusiness: compliance === "Optimal" ? r.impactOptimal : r.impactClash,
        remedy: r.remedy
      });
    });
  }

  return auditItems;
}

// ==========================================
// 8. QUICK 60-SECOND VASTU AUDIT (EASY MODE)
// ==========================================
export function calculateQuickVastuAudit(input: QuickAuditInput): QuickAuditResult {
  let score = 100;
  const criticalDoshas: QuickAuditResult["criticalDoshas"] = [];
  const topPositiveAlignments: string[] = [];

  // 1. Entrance Analysis
  const goodEntrances = ["North", "North-East", "East", "West"];
  if (goodEntrances.includes(input.entranceZone)) {
    topPositiveAlignments.push(`Main Entrance in ${input.entranceZone}: Welcoming cosmic prana and prosperity.`);
  } else if (["South-West", "SSW"].includes(input.entranceZone)) {
    score -= 25;
    criticalDoshas.push({
      title: "South-West (Nairitya) Entrance Defect",
      severity: "High",
      problem: "South-West entrance invites financial depletion, relationship turbulence, and patriarchal illness.",
      simpleRemedy: "Embed a 3-4mm solid Brass strip across the doorway threshold and fix a consecrated Brass Trishul or Swastika outside."
    });
  } else if (["South-East", "SSE"].includes(input.entranceZone)) {
    score -= 15;
    criticalDoshas.push({
      title: "South-East (Agni) Entrance Defect",
      severity: "Medium",
      problem: "Entrance in fire quadrant leads to short tempers, aggressive disputes, and cash instability.",
      simpleRemedy: "Fix a 3-inch red vinyl tape or Copper strip along the threshold and hang an Agni Yantra."
    });
  }

  // 2. Kitchen Analysis
  if (["South-East", "SE", "North-West", "NW"].includes(input.kitchenZone)) {
    topPositiveAlignments.push(`Kitchen in ${input.kitchenZone}: Perfect alignment with Agni and Vayu principles.`);
  } else if (["North-East", "NE"].includes(input.kitchenZone)) {
    score -= 25;
    criticalDoshas.push({
      title: "Kitchen in North-East (Agni in Water Zone)",
      severity: "High",
      problem: "Major Vastu defect: severe medical expenses, mental anxiety, and blockages in offspring prosperity.",
      simpleRemedy: "Place a natural yellow Jaisalmer marble slab under the gas cooktop and hang a Copper Surya Yantra on the east wall."
    });
  } else if (["South-West", "SW"].includes(input.kitchenZone)) {
    score -= 20;
    criticalDoshas.push({
      title: "Kitchen in South-West (Earth Burn)",
      severity: "High",
      problem: "Burnout of head of family, marital arguments, and lack of emotional stability.",
      simpleRemedy: "Shift cooktop to South-East if possible; otherwise place a yellow stone under burner and keep a solid Brass Kamadhenu nearby."
    });
  }

  // 3. Toilet Analysis
  if (["West-North-West", "WNW", "South-South-West", "SSW", "East-South-East"].includes(input.toiletZone)) {
    topPositiveAlignments.push(`Toilet in ${input.toiletZone}: Ideal disposal of negative wastes according to MahaVastu.`);
  } else if (["North-East", "NE"].includes(input.toiletZone)) {
    score -= 30;
    criticalDoshas.push({
      title: "Toilet in North-East (Ishanya Contamination)",
      severity: "High",
      problem: "Critical Vastu flaw: severe brain fog, paralysis of growth, neurological issues, and financial bankruptcy.",
      simpleRemedy: "Never use this toilet if possible. If unavoidable, affix 3-inch Blue elemental tape around the commode base and keep a bowl of rock sea salt."
    });
  } else if (["South-West", "SW"].includes(input.toiletZone)) {
    score -= 20;
    criticalDoshas.push({
      title: "Toilet in South-West (Drainage of Stability)",
      severity: "High",
      problem: "Flushes away marital harmony, career mastery, and ancestral blessings.",
      simpleRemedy: "Fix a 3-inch Yellow tape or Brass strip around the toilet base, keep a lead helix with raw Black Tourmaline, and change sea salt every Saturday."
    });
  }

  // 4. Master Bedroom
  if (["South-West", "SW", "South", "S"].includes(input.masterBedZone)) {
    topPositiveAlignments.push(`Master Bedroom in ${input.masterBedZone}: Stable leadership, sound sleep, and marital tranquility.`);
  } else if (["North-East", "NE"].includes(input.masterBedZone)) {
    score -= 10;
    criticalDoshas.push({
      title: "Master Bedroom in North-East",
      severity: "Medium",
      problem: "Creates excessive spiritual asceticism, restlessness, and reduction in marital intimacy.",
      simpleRemedy: "Sleep with head strictly pointing South. Use warm earthen bedsheets and avoid blue/water colors in bedroom."
    });
  }

  // 5. Mandir Altar
  if (["North-East", "NE", "North", "East"].includes(input.mandirZone)) {
    topPositiveAlignments.push(`Mandir in ${input.mandirZone}: Pure divine cosmic prana channel.`);
  } else if (["South-West", "South"].includes(input.mandirZone)) {
    score -= 10;
    criticalDoshas.push({
      title: "Mandir in South/South-West",
      severity: "Medium",
      problem: "Clash between demonic tamas sector and sattvic deity vibrations.",
      simpleRemedy: "Elevate mandir altar on white Makrana marble and place a consecrated Sphatik Sri Yantra."
    });
  }

  // 6. Cuts or Extensions
  if (input.cutsOrExtensions === "ne_cut") {
    score -= 20;
    criticalDoshas.push({
      title: "North-East Corner Cut (Ishanya Chheda)",
      severity: "High",
      problem: "Cuts off the cosmic antenna of the house, causing persistent health issues and lack of fortune.",
      simpleRemedy: "Install 9 Copper Helixes and 2 convex mirrors on the adjoining walls to energetically extend the space."
    });
  } else if (input.cutsOrExtensions === "sw_cut") {
    score -= 20;
    criticalDoshas.push({
      title: "South-West Corner Cut",
      severity: "High",
      problem: "Causes severe instability, financial volatility, and absence of strong family anchoring.",
      simpleRemedy: "Install 9 Lead Vastu Helixes on the floor and place a heavy brass earthen pot in the corner."
    });
  } else if (input.cutsOrExtensions === "ne_extended") {
    score += 5;
    topPositiveAlignments.push("North-East Extension (Ishanya Vriddhi): Classical architectural blessing bestowing wisdom and prosperity.");
  }

  score = Math.max(15, Math.min(100, score));

  // Life Pillars Breakdown
  const financialScore = Math.max(20, Math.min(100, score + (["North", "SE"].includes(input.kitchenZone) ? 10 : -10)));
  const healthScore = Math.max(20, Math.min(100, score + (["NE"].includes(input.toiletZone) ? -35 : 5)));
  const relationshipScore = Math.max(20, Math.min(100, score + (["SW"].includes(input.masterBedZone) ? 15 : -15)));
  const peaceScore = Math.max(20, Math.min(100, score + (["NE"].includes(input.mandirZone) ? 10 : -10)));
  const careerScore = Math.max(20, Math.min(100, score + (["North", "East"].includes(input.entranceZone) ? 10 : -5)));

  const lifePillars = [
    {
      name: "Financial Growth & Cashflow",
      scorePct: financialScore,
      status: (financialScore >= 75 ? "Strong" : financialScore >= 55 ? "Moderate" : "Vulnerable") as "Strong" | "Moderate" | "Vulnerable",
      keyFactor: "Governed by North (Kubera) & South-East (Agni liquidity)"
    },
    {
      name: "Health & Vitality",
      scorePct: healthScore,
      status: (healthScore >= 75 ? "Strong" : healthScore >= 55 ? "Moderate" : "Vulnerable") as "Strong" | "Moderate" | "Vulnerable",
      keyFactor: "Governed by North-East (Mind) & South-South-East (Physical stamina)"
    },
    {
      name: "Relationships & Harmony",
      scorePct: relationshipScore,
      status: (relationshipScore >= 75 ? "Strong" : relationshipScore >= 55 ? "Moderate" : "Vulnerable") as "Strong" | "Moderate" | "Vulnerable",
      keyFactor: "Governed by South-West (Nairitya) and bed placement"
    },
    {
      name: "Mental Peace & Clarity",
      scorePct: peaceScore,
      status: (peaceScore >= 75 ? "Strong" : peaceScore >= 55 ? "Moderate" : "Vulnerable") as "Strong" | "Moderate" | "Vulnerable",
      keyFactor: "Governed by Ishanya (NE) clarity and Brahmasthan openness"
    },
    {
      name: "Career & Social Recognition",
      scorePct: careerScore,
      status: (careerScore >= 75 ? "Strong" : careerScore >= 55 ? "Moderate" : "Vulnerable") as "Strong" | "Moderate" | "Vulnerable",
      keyFactor: "Governed by East (Surya) & South (Fame & Yama)"
    }
  ];

  const downloadableSummary = `Vastu Shastra Instant Audit Report\nOverall Score: ${score}/100\nKey Alignments: ${topPositiveAlignments.join(
    "; "
  )}\nIdentified Doshas: ${criticalDoshas.map((d) => d.title).join("; ")}`;

  return {
    overallScore: score,
    lifePillars,
    criticalDoshas,
    topPositiveAlignments,
    downloadableSummary
  };
}

// Sample Geopathic Stress Points for simulation on floor plans
export const SAMPLE_GEOPATHIC_POINTS: GeopathicPoint[] = [
  {
    id: "geo_1",
    type: "Hartmann Grid",
    xPct: 35,
    yPct: 42,
    intensityBovis: 3200,
    healthRisks: ["Chronic morning fatigue", "Disturbed REM sleep", "Immune depletion"],
    remedyAction: "Place a Copper Spiral Geopathic Neutralizer and move bed 1.5 feet away."
  },
  {
    id: "geo_2",
    type: "Underground Water Vein",
    xPct: 68,
    yPct: 58,
    intensityBovis: 2100,
    healthRisks: ["Rheumatic joint pains", "Neurological restlessness", "Lowered vitality"],
    remedyAction: "Install Lead Geopathic Neutralizer wire in the floor skirting."
  },
  {
    id: "geo_3",
    type: "Curry Net",
    xPct: 52,
    yPct: 78,
    intensityBovis: 4100,
    healthRisks: ["Nervous tension", "Frequent headaches"],
    remedyAction: "Place a Copper Spiral Geopathic Neutralizer and natural Shungite crystal sphere."
  }
];
