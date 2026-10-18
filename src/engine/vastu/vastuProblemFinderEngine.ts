import {
  LifeProblemDefectMapping,
  CrystalRemedyItem,
  ThreeDimensionalRemedyItem,
  VedicPujaProtocol,
  FengShuiGrandmasterRemedy
} from "../../types/vastuTypes";

// ==========================================================
// 1. REVERSE LIFE PROBLEM & VASTU DEFECT FINDER ENGINE
// ==========================================================
export const LIFE_PROBLEMS_DATABASE: LifeProblemDefectMapping[] = [
  {
    id: "cash_liquidity_crisis",
    problemTitle: "Cash Liquidity Crunch & Blocked Client Payments",
    category: "wealth_finance",
    commonSymptoms: [
      "Invoices delayed for months without reason",
      "Profits on paper but bank balance always dry",
      "Sudden unexpected emergency expenditures drain savings",
      "Clients making excuses right when payment is due"
    ],
    afflictedZones: ["SE", "SSE", "N"],
    primaryVastuFlaw: "Toilet, Blue/Black wall colors, Water Boring, or Underground Sump in South-East (Agneya - Fire Zone)",
    elementalConflict: "Water Element extinguishing Fire Element (Agni Tatva), destroying financial combustion and cash turnover.",
    afflictedDevataPada: "Agni, Pusha & Vitatha",
    vedicAstrologicalImpact: "Severe affliction of Shukra (Venus) and Mars (Mangal). Lack of warmth in cash transaction cycles.",
    remedies: {
      threeDimensionalCure: "Place a solid Brass Kamadhenu (Cow with suckling calf) or Brass Nandi Bull on the floor in South-East facing East.",
      crystalPlacement: "Keep a natural Pyrite cluster and a raw Citrine geode on the accounts desk in North or South-East to stimulate cash circulation.",
      vedicMantraPuja: {
        mantraName: "Agni Gayatri & Kubera Ashta-Lakshmi Mantra",
        sanskritMantra: "ॐ महालक्ष्म्यै च विद्महे विष्णुपत्नी च धीमहि तन्नो लक्ष्मीः प्रचोदयात् ॥ ॐ यक्षाय कुबेराय वैश्रवणाय धनधान्याधिपतये नमः ॥",
        japaCount: "108 times daily facing East during sunrise",
        deity: "Goddess Mahalakshmi & Lord Kubera",
        ritualAction: "Light a pure cow-ghee lamp in the South-East corner every evening for 21 consecutive days."
      },
      elementalVirtualBlocking: "Affix a 3-inch Red elemental vinyl tape or embed a 3mm pure Copper strip completely encircling the commode base to seal the pranic drainage.",
      fengShuiGrandmasterCure: "Place a 3-Legged Money Toad (Chan Chu) with a Chinese coin facing inward from the entrance, and install a red table runner in the South sector."
    }
  },
  {
    id: "chronic_debts_loans",
    problemTitle: "Mounting Debts, Unpaid EMIs & Financial Suffocation",
    category: "wealth_finance",
    commonSymptoms: [
      "Taking new loans to pay interest on old loans",
      "Inability to clear credit card debt despite good income",
      "Financial stability constantly eroding",
      "Creditors threatening legal action"
    ],
    afflictedZones: ["SW", "SSW", "NW"],
    primaryVastuFlaw: "Main entrance in South-West (Nairitya), Slope downward towards South-West, or Borewell in SW corner.",
    elementalConflict: "Earth Element punctured by Water or void space, destabilizing the foundational anchor of family wealth.",
    afflictedDevataPada: "Nirruti (Goddess of Decay) & Pitra Pada",
    vedicAstrologicalImpact: "Affliction of Rahu and Saturn (Shani). Absence of patriarchal blessings and grounded stability.",
    remedies: {
      threeDimensionalCure: "Install a heavy solid Brass Nandi Bull or Brass Tortoise firmly planted on yellow granite in the South-West corner.",
      crystalPlacement: "Place 4 large raw Black Tourmaline grounding stones in the four corners of the South-West room to trap and neutralize drain vectors.",
      vedicMantraPuja: {
        mantraName: "Runa Vimochana Nrisimha Stotra",
        sanskritMantra: "देवता-कार्य-सिद्धयर्थं सभा-स्तम्भ-समुद्भवम् । श्रीनृसिंहं महावीर्यं नमामि ऋण-मुक्तये ॥",
        japaCount: "11 times on Tuesday mornings after bath",
        deity: "Lord Narasimha Swamy",
        ritualAction: "Perform Pitra Tarpan on Amavasya and donate sesame seeds with jaggery to the needy."
      },
      elementalVirtualBlocking: "Embed a 4mm solid Brass strip across the South-West doorway threshold to energetically erect a cosmic barrier against wealth leakage.",
      fengShuiGrandmasterCure: "Place a pair of heavy solid Brass Fu Dogs or Pi Xiu facing outward at the main perimeter to guard assets."
    }
  },
  {
    id: "career_stagnation_promotions",
    problemTitle: "Career Stagnation, Missed Promotions & Lack of New Clients",
    category: "career_business",
    commonSymptoms: [
      "Passed over for promotion despite superior performance",
      "New job interviews stall at the final offer stage",
      "Business leads drying up completely",
      "Feeling unseen and under-compensated by senior executives"
    ],
    afflictedZones: ["N", "ENE", "E"],
    primaryVastuFlaw: "Toilet, Heavy Junk / Store Room, Red/Pink walls, or Kitchen in North (Kubera & Mercury Sector).",
    elementalConflict: "Fire Element invading Water Element in North, burning away liquid career opportunities before they materialize.",
    afflictedDevataPada: "Mukhya (Chief of Resources) & Bhallat (Abundance)",
    vedicAstrologicalImpact: "Affliction of Budha (Mercury) and Jupiter (Brihaspati). Lack of commercial luck and networking synergy.",
    remedies: {
      threeDimensionalCure: "Place an energizing 3D Brass Kubera Murti or Brass Ashoka Pillar on the North wall facing South.",
      crystalPlacement: "Place a vibrant Green Aventurine sphere and a high-clarity Clear Quartz cluster on the study/work table in the North zone.",
      vedicMantraPuja: {
        mantraName: "Budha Gayatri & Kubera Dhana Akarshana Mantra",
        sanskritMantra: "ॐ सौम्यरूपाय विद्महे वाणेशाय च धीमहि तन्नो सौम्यः प्रचोदयात् ॥ ॐ यक्ष राजाय नमः ॥",
        japaCount: "108 times on Wednesday mornings facing North",
        deity: "Lord Budha & Lord Kubera",
        ritualAction: "Water a Tulsi plant placed in the North or North-East corner with fresh water every morning."
      },
      elementalVirtualBlocking: "Apply a 3-inch Sky Blue elemental vinyl tape or Aluminium metal strip around the commode or clutter base in the North zone.",
      fengShuiGrandmasterCure: "Position a solid Brass Dragon Turtle on your office desk with its head facing toward your primary entrance to draw promotions and mentor support."
    }
  },
  {
    id: "marital_conflict_divorce",
    problemTitle: "Marital Friction, Constant Bickering & Threat of Separation",
    category: "love_relationships",
    commonSymptoms: [
      "Small conversations escalating into bitter shouting matches",
      "Spouse feeling emotionally distant or cold",
      "In-law interference poisoning the marital bond",
      "Sleeping in separate rooms or discussing divorce"
    ],
    afflictedZones: ["SW", "ESE", "SE"],
    primaryVastuFlaw: "Kitchen stove in South-West, Toilet in South-West, or Mirror directly reflecting the marital bed.",
    elementalConflict: "Fire burning Earth in Nairitya, inducing explosive temperaments and scorching emotional tolerance.",
    afflictedDevataPada: "Gandharva, Mriga & Nirruti",
    vedicAstrologicalImpact: "Affliction of Shukra (Venus) and Mars (Mangal) Kuja Dosha dynamics.",
    remedies: {
      threeDimensionalCure: "Place a pair of solid Brass Mandarin Ducks or Brass Elephants with intertwined trunks on the South-West bedside table.",
      crystalPlacement: "Keep a polished Rose Quartz crystal bowl with two raw Amethyst chunks in the South-West corner of the master bedroom.",
      vedicMantraPuja: {
        mantraName: "Swayamvara Parvati & Uma Maheshwara Stotram",
        sanskritMantra: "ॐ ह्रीं योगिनी योगिनी योगेश्वरी योग भयङ्करी सकल स्थावर जङ्गमस्य मुख हृदयं मम वशं आकर्षय आकर्षय स्वाहा ॥",
        japaCount: "108 times on Friday evenings",
        deity: "Goddess Parvati & Lord Shiva",
        ritualAction: "Light a pure camphor tablet with two cloves in a brass vessel and chant for harmony."
      },
      elementalVirtualBlocking: "Paste a 3-inch Yellow vinyl tape around the toilet base in SW or cover all bedroom mirrors with a silk cloth before sleeping.",
      fengShuiGrandmasterCure: "Hang a Mystic Knot with red silk tassels in the South-West sector of the living room to dissolve negative relationship sha chi."
    }
  },
  {
    id: "severe_anxiety_brain_fog",
    problemTitle: "Severe Anxiety, Overthinking, Insomnia & Chronic Brain Fog",
    category: "mental_peace",
    commonSymptoms: [
      "Waking up exhausted with spinning thoughts",
      "Inability to make simple business or personal decisions",
      "Irrational fear of the future, panic attacks",
      "Nightmares and restless leg syndrome during sleep"
    ],
    afflictedZones: ["NE", "ESE", "WNW"],
    primaryVastuFlaw: "Toilet, Kitchen, Dustbin, or Heavy Inverter/Batteries in North-East (Ishanya - Head of Vastu Purusha).",
    elementalConflict: "Severe contamination of Water / Space Tatva by heavy toxic wastes or fire, poisoning mental clarity.",
    afflictedDevataPada: "Shikhi (Divine Flame), Parjanya & Jayanta",
    vedicAstrologicalImpact: "Affliction of Chandra (Moon) and Ketu. Psychological disturbance and spiritual blockage.",
    remedies: {
      threeDimensionalCure: "Place a pure Brass or Marble idol of Lord Shiva (Meditating Nataraja or Dhyana Mudra) or Brass Kalash in North-East.",
      crystalPlacement: "Keep a natural Selenite Tower and an Amethyst Crystal Cluster on the bedside table or altar in the North-East zone.",
      vedicMantraPuja: {
        mantraName: "Maha Mrityunjaya Mantra & Vastu Purusha Gayatri",
        sanskritMantra: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान्मृत्यgroupोर्मुक्षीय मामृतात् ॥ ॐ वास्तुपुरुषाय नमः ॥",
        japaCount: "108 times at dawn facing North-East",
        deity: "Lord Shiva & Vastu Purusha",
        ritualAction: "Keep a glass bowl with pure water and fresh white jasmine or marigold petals in Ishanya, replacing daily."
      },
      elementalVirtualBlocking: "Immediately isolate any toilet in NE with a 3-inch Royal Blue tape and place an open bowl of natural Himalayan rock sea salt (changed weekly).",
      fengShuiGrandmasterCure: "Hang a natural Brass Wu Lou (Calabash) with red cord beside your headboard to absorb toxic biological frequencies."
    }
  },
  {
    id: "delayed_marriage_prospects",
    problemTitle: "Delayed Marriage, Matchmaking Breakdowns & Relationship Blocks",
    category: "love_relationships",
    commonSymptoms: [
      "Eligible son/daughter's proposals break off right before engagement",
      "Prospective partners rejecting without clear reasons",
      "Lack of interest or emotional blockage towards marriage",
      "Astrological matching is fine but real-world meetings fail"
    ],
    afflictedZones: ["NW", "SE", "SW"],
    primaryVastuFlaw: "Unmarried girl sleeping in South-West (causing masculine dominance) or Toilet in North-West (Vayu - movement zone).",
    elementalConflict: "Vayu Element paralyzed by stagnant water or fire, preventing transitional life movement.",
    afflictedDevataPada: "Roga (Disease) & Papayakshma (Consumption)",
    vedicAstrologicalImpact: "Affliction of Guru (Jupiter for females) and Shukra (Venus for males).",
    remedies: {
      threeDimensionalCure: "Place a pair of running Brass White Horses in the North-West sector facing into the house to activate marriage alliances.",
      crystalPlacement: "Gift the marriage seeker a natural Rose Quartz bracelet and place a Moonstone geode in the North-West corner of their room.",
      vedicMantraPuja: {
        mantraName: "Gauri Shankara & Katyaayani Mantra",
        sanskritMantra: "कात्यायनि महामाये महायोगिन्यधीश्वरि । नन्दगोपसुतं देवि पतिं मे कुरु ते नमः ॥",
        japaCount: "108 times daily for 41 days",
        deity: "Goddess Katyayani & Lord Shiva",
        ritualAction: "Move the unmarried person to sleep in the North-West bedroom so the transitional air element initiates matchmaking."
      },
      elementalVirtualBlocking: "Seal any toilet in NW with a 3mm Aluminium metal strip or White vinyl tape around the floor boundary.",
      fengShuiGrandmasterCure: "Display a red-framed Double Happiness papercut symbol and light a pair of pink candles in the South-West living area."
    }
  },
  {
    id: "frequent_illness_low_immunity",
    problemTitle: "Frequent Hospital Visits, Chronic Illness & Low Immunity",
    category: "health_vitality",
    commonSymptoms: [
      "Family members catching seasonal viral fevers non-stop",
      "Medicines not responding; diagnostic tests coming back inconclusive",
      "Old chronic ailments flaring up repeatedly",
      "Children suffering from persistent allergies and asthma"
    ],
    afflictedZones: ["NNE", "NE", "SW"],
    primaryVastuFlaw: "Toilet, Dustbin, Clutter, or Inverter located in North-North-East (Health & Healing Zone).",
    elementalConflict: "Imbalance between Water and Earth, corrupting prana assimilation into the physical cellular structure.",
    afflictedDevataPada: "Aapaha (Waters) & Aapahavatsa (Nectar Child)",
    vedicAstrologicalImpact: "Affliction of Surya (Sun - Karaka of Vitality & Atma) and 6th house health lords.",
    remedies: {
      threeDimensionalCure: "Place a solid Brass Lord Dhanvantari idol (God of Medicine holding Amrit Kalash) in the North-North-East zone.",
      crystalPlacement: "Position a Green Fluorite point and Bloodstone tumble stones in the North-North-East room or medicine box.",
      vedicMantraPuja: {
        mantraName: "Dhanvantari Maha Mantra",
        sanskritMantra: "ॐ नमो भगवते महासुदर्शनाय वासुदेवाय धन्वन्तरये अमृतकलशहस्ताय सर्वभयविनाशाय सर्वरोगनिवारणाय त्रिलोकपतये नमः ॥",
        japaCount: "21 times while holding drinking water before consuming",
        deity: "Bhagwan Dhanvantari",
        ritualAction: "Store all daily medicines in the North-North-East zone so they absorb healing energetic vibrations."
      },
      elementalVirtualBlocking: "Surround any defective commode in NNE with a 3-inch Emerald Green tape and keep fresh sea salt in a porcelain bowl.",
      fengShuiGrandmasterCure: "Hang a Brass Wu Lou engraved with the Eight Immortals beside the patient's bedside to siphon off sick chi."
    }
  },
  {
    id: "court_cases_litigation",
    problemTitle: "Legal Battles, Police Disputes, Tax Audits & False Accusations",
    category: "legal_court",
    commonSymptoms: [
      "Entangled in property lawsuits that drag on for decades",
      "Sudden aggressive government notices or tax inquiries",
      "Business partners filing fraudulent arbitration claims",
      "Feeling trapped under false legal allegations"
    ],
    afflictedZones: ["E", "SE", "SW"],
    primaryVastuFlaw: "South-East main entrance, Toilet in East (Social connection), or Cut in East sector.",
    elementalConflict: "Fire surging wildly without containment, attracting aggressive legal conflicts and official penalties.",
    afflictedDevataPada: "Aryama, Savita & Indra",
    vedicAstrologicalImpact: "Affliction of Surya (King/Authority) and Mars (Court adversary).",
    remedies: {
      threeDimensionalCure: "Mount a 12-inch pure Copper Surya (Sun face medallion) on the East wall at a height of 7 feet above floor level.",
      crystalPlacement: "Place a raw Hematite heavy slab and Pyrite cube directly on top of the legal case file folder in the North-West zone.",
      vedicMantraPuja: {
        mantraName: "Aditya Hridaya Stotram & Bagalamukhi Shanti Mantra",
        sanskritMantra: "ॐ ह्लीं बगलामुखि सर्वदुष्टानां वाचं मुखं पदं स्तम्भय जिह्वां कीलय बुद्धिं विनाशय ह्लीं ॐ स्वाहा ॥",
        japaCount: "Chant on Sunday and Tuesday facing East",
        deity: "Maa Bagalamukhi & Bhagwan Surya",
        ritualAction: "Keep legal files strictly in the North-West (movement/closure) zone; NEVER store case files in South-West (which freezes them forever)."
      },
      elementalVirtualBlocking: "Embed a 3mm pure Copper strip across the threshold if the entrance is in South-East or South.",
      fengShuiGrandmasterCure: "Position a pair of winged Chi Lin (Dragon Horses) facing the main entrance to neutralize malicious lawsuits and gossip."
    }
  },
  {
    id: "children_study_concentration",
    problemTitle: "Children Distracted, Low Exam Scores & Disobedience",
    category: "children_education",
    commonSymptoms: [
      "Child sits with books for hours but retains zero information",
      "Addicted to mobile screens, gaming, and showing stubborn rebelliousness",
      "Panic attacks during examinations resulting in blanking out",
      "Constant arguments between child and parents"
    ],
    afflictedZones: ["WSW", "W", "ESE"],
    primaryVastuFlaw: "Child studying facing South, Study table placed in East-South-East (Zone of Anxiety/Overthinking), or Toilet in WSW.",
    elementalConflict: "Earth & Space corrupted by mental churn, destroying memory retention and intellectual focus.",
    afflictedDevataPada: "Sugriva (Knowledge Mastery) & Pushpadanta",
    vedicAstrologicalImpact: "Affliction of Mercury (Intellect) and Guru (Wisdom).",
    remedies: {
      threeDimensionalCure: "Place a solid Brass Saraswati Idol or Brass Pen Stand with an embossed Eagle in the West-South-West zone.",
      crystalPlacement: "Keep a natural Sodalite crystal sphere and a Tiger's Eye tumble stone on the child's study desk.",
      vedicMantraPuja: {
        mantraName: "Saraswati Gayatri Mantra",
        sanskritMantra: "ॐ सरस्वत्यै विद्महे ब्रह्मपुत्र्यै धीमहि तन्नो देवी प्रचोदयात् ॥ ॐ ऐं सरस्वत्यै नमः ॥",
        japaCount: "11 times before beginning study sessions",
        deity: "Goddess Saraswati",
        ritualAction: "Ensure the child sits facing East or North while studying, with a solid wall behind their back."
      },
      elementalVirtualBlocking: "If toilet is in WSW, apply a 3-inch White or Yellow tape around the base and keep the bathroom door tightly closed.",
      fengShuiGrandmasterCure: "Place a 9-Tier Brass Wen Chang Pagoda Tower in the North-East or on the right corner of the study desk to elevate academic brilliance."
    }
  }
];

// ==========================================================
// 2. SACRED CRYSTALS & MINERAL GRIDS DATABASE (ZERO PYRAMIDS)
// ==========================================================
export const CRYSTAL_REMEDIES_DATABASE: CrystalRemedyItem[] = [
  {
    id: "pyrite",
    crystalName: "Pyrite (Fool's Gold)",
    mineralFamily: "Iron Sulfide",
    primaryZone: "North (Kubera)",
    secondaryZone: "South-East (Agni Cash)",
    pranicFrequency: "High Metallic Solar Vibration",
    lifeAspect: "Dhana Akarshana, Wealth Magnetism, Business Abundance",
    placementLocation: "Place a natural cluster inside the cash drawer, financial safe, or on the work desk in North.",
    cleansingRitual: "Cleanse with dry sage smoke or direct sunlight for 20 minutes. Avoid water as it oxidizes iron.",
    avoidZones: ["NE (can cause excess metal rigidity)"],
    vibrationNotes: "Pyrite emits an assertive frequency of financial sovereignty, dispelling money anxiety and attracting high-value clients."
  },
  {
    id: "citrine",
    crystalName: "Natural Golden Citrine",
    mineralFamily: "Quartz",
    primaryZone: "North (Kubera)",
    secondaryZone: "North-East (Wisdom)",
    pranicFrequency: "Solar Golden Prana",
    lifeAspect: "Merchant's Stone, Commercial Expansion, Optimism",
    placementLocation: "Keep a raw natural geode or point on the billing counter or near financial books.",
    cleansingRitual: "Cleanse under gentle morning sunlight for 15 minutes or with Tibetan singing bowl sound baths.",
    avoidZones: ["South-West (can create restlessness in relationship foundation)"],
    vibrationNotes: "Citrine never accumulates negative prana; it constantly transmutes stagnant fiscal blocks into dynamic opportunity."
  },
  {
    id: "black_tourmaline",
    crystalName: "Black Tourmaline (Schorl)",
    mineralFamily: "Silicate Boron",
    primaryZone: "South-West (Stability)",
    secondaryZone: "Main Entrance (Threshold)",
    pranicFrequency: "Heavy Prithvi (Earth) Grounding",
    lifeAspect: "Psychic Shield, Hex Blocker, Neutralizes Negative Chi",
    placementLocation: "Place 4 raw chunky rods in the 4 corners of the house or flanking the main door frame.",
    cleansingRitual: "Submerge in dry sea salt overnight once every full moon, then discard the salt.",
    avoidZones: ["North-East (too heavy and grounding for spiritual Ishanya)"],
    vibrationNotes: "The ultimate electro-magnetic and psychic shield. It grounds erratic earth radiations and deflects envious glances (Nazar dosha)."
  },
  {
    id: "amethyst",
    crystalName: "Deep Purple Amethyst",
    mineralFamily: "Quartz with Iron Irradiance",
    primaryZone: "North-East (Ishanya)",
    secondaryZone: "East-North-East (Clarity)",
    pranicFrequency: "Sahasrara Crown Chakra Prana",
    lifeAspect: "Mental Serenity, Insomnia Relief, Meditation Depth",
    placementLocation: "Place a natural raw cluster on the puja altar or near the bed headboard in North-East.",
    cleansingRitual: "Recharge under the gentle light of the Full Moon. Keep away from harsh midday sun to prevent fading.",
    avoidZones: ["South-East (Fire burns delicate spiritual purple vibration)"],
    vibrationNotes: "Calms an overactive nervous system, soothes mental chattering, and invites divine cosmic guidance."
  },
  {
    id: "selenite",
    crystalName: "Pure White Selenite",
    mineralFamily: "Gypsum Crystal",
    primaryZone: "North-East (Ishanya)",
    secondaryZone: "Center (Brahmasthan)",
    pranicFrequency: "Liquid Light Ether Prana",
    lifeAspect: "Energetic Purification, Aura Cleanser, Divine Link",
    placementLocation: "Place a Selenite wand or lamp in the center of the living room or puja mandir.",
    cleansingRitual: "Never touch with water (it dissolves). Cleanse using sacred Frankincense (Loban) or Palo Santo smoke.",
    avoidZones: ["Bathrooms or damp areas"],
    vibrationNotes: "A high-frequency celestial conduit that continually flushes low-frequency astral residue out of living spaces."
  },
  {
    id: "rose_quartz",
    crystalName: "Madagascar Rose Quartz",
    mineralFamily: "Quartz",
    primaryZone: "South-West (Nairitya)",
    secondaryZone: "East (Harmony)",
    pranicFrequency: "Anahata Heart Compassion Prana",
    lifeAspect: "Unconditional Love, Marital Peace, Forgiveness",
    placementLocation: "Place two polished spheres or a natural raw heart in the South-West corner of the master bedroom.",
    cleansingRitual: "Rinse gently in rose water or expose to moonlight on Shukla Paksha Friday.",
    avoidZones: ["North-West (too turbulent air for gentle heart grounding)"],
    vibrationNotes: "Dissolves emotional wounds, softens abrasive communication between couples, and restores sacred warmth."
  },
  {
    id: "green_aventurine",
    crystalName: "Green Aventurine",
    mineralFamily: "Quartz with Fuchsite Mica",
    primaryZone: "East (Indra/Surya)",
    secondaryZone: "North (Growth)",
    pranicFrequency: "Vayu Spring Expansion Prana",
    lifeAspect: "Good Luck, New Beginnings, Heart Vitality",
    placementLocation: "Place a pyramid-free smooth egg or tumbled stones near indoor plants in the East.",
    cleansingRitual: "Leave on the soil of a healthy green jade or money plant for 24 hours.",
    avoidZones: ["South (Fire can over-stimulate wood energy)"],
    vibrationNotes: "The stone of opportunity. Attracts favorable coincidences, unexpected bonuses, and social network expansion."
  },
  {
    id: "red_jasper",
    crystalName: "Red Jasper",
    mineralFamily: "Microcrystalline Quartz",
    primaryZone: "South (Yama / Fame)",
    secondaryZone: "South-East (Agni)",
    pranicFrequency: "Muladhara Root Earth Stamina",
    lifeAspect: "Physical Endurance, Courage, Defense against Bullies",
    placementLocation: "Keep on the desk of an athlete, military/police officer, or CEO in the South zone.",
    cleansingRitual: "Bury in clean garden earth for 12 hours once a month to recharge terrestrial core power.",
    avoidZones: ["North-East (too hot and earthy for spiritual Ishanya)"],
    vibrationNotes: "Re-ignites passion, eliminates lethargy, and empowers individuals to stand their ground during conflicts."
  }
];

// ==========================================================
// 3. THREE-DIMENSIONAL VASTU IDOLS & SACRED OBJECTS (ZERO PYRAMIDS)
// ==========================================================
export const THREE_D_REMEDIES_DATABASE: ThreeDimensionalRemedyItem[] = [
  {
    id: "brass_nandi_bull",
    objectName: "Solid Brass Nandi Bull",
    metalOrMaterial: "Solid Brass",
    bestZone: "South-West (SW)",
    directionFacing: "Facing North-East or East",
    classicalPurpose: "Supreme stability, financial anchoring, protection against trust breaches and business partnerships.",
    shastricReference: "Mayamatam Chapter 22 (Vrishabha Lakshanam)",
    installationRitual: "Bathe with milk and holy water on Monday morning. Offer sandalwood paste and place firmly on yellow granite.",
    prohibitedPlacements: "Never place in North-East (too heavy) or inside bathrooms."
  },
  {
    id: "copper_surya_wall_plate",
    objectName: "3D Embossed Pure Copper Surya Medallion",
    metalOrMaterial: "Pure Copper",
    bestZone: "East (Purva - Surya)",
    directionFacing: "Mounted on East wall facing West into the room",
    classicalPurpose: "Activates royal authority, fame, government goodwill, high social status, and cures lack of recognition.",
    shastricReference: "Brihat Samhita (Surya Pratima Vidhanam)",
    installationRitual: "Install on Sunday morning during Shukla Paksha at 7:00 AM. Chant Aditya Hridaya Stotram 3 times.",
    prohibitedPlacements: "Do not install inside bedrooms or on a wall shared with a toilet."
  },
  {
    id: "brass_kamadhenu_cow",
    objectName: "Brass Kamadhenu Cow with Suckling Calf",
    metalOrMaterial: "Solid Brass",
    bestZone: "East-North-East (ENE) or East (E)",
    directionFacing: "Facing into the living room",
    classicalPurpose: "Fulfills wishes, brings abundant maternal nourishment, peace of mind, and harmonious parent-child bonding.",
    shastricReference: "Skanda Purana (Kamadhenu Mahatmyam)",
    installationRitual: "Install on Thursday or Friday morning with a tilak of pure kumkum and offer fresh grass or yellow flowers.",
    prohibitedPlacements: "Do not place in South-South-West or inside dark store rooms."
  },
  {
    id: "brass_kuber_idol",
    objectName: "3D Brass Lord Kubera with Mongoose & Pouch",
    metalOrMaterial: "Solid Brass",
    bestZone: "North (Uttara - Kubera)",
    directionFacing: "Facing South or East",
    classicalPurpose: "Direct invocation of the Treasurer of the Gods for liquid cash flow, capital retention, and treasury protection.",
    shastricReference: "Vishnudharmottara Purana (Kubera Rupam)",
    installationRitual: "Perform panchamrit abhishekam on Dhanteras or Diwali night, and place on a clean green silk cloth.",
    prohibitedPlacements: "Do not place directly on the floor; must be elevated on a shelf at minimum waist height."
  },
  {
    id: "metal_tortoise_water_bowl",
    objectName: "Solid Metal Tortoise submerged in Crystal Water Bowl",
    metalOrMaterial: "Asthadhatu",
    bestZone: "North (N) or East (E)",
    directionFacing: "Head pointing inward towards the interior of the house",
    classicalPurpose: "Slow, steady, indestructible wealth accumulation, patriarch longevity, and energetic stabilization.",
    shastricReference: "Kurma Purana & Vastu Ratnavali",
    installationRitual: "Fill clean lead-free glass bowl with pure water and place the metal tortoise inside. Change water every morning.",
    prohibitedPlacements: "Never position with head pointing out the main door (drains wealth away)."
  },
  {
    id: "brass_elephant_pair",
    objectName: "Pair of Solid Brass Royal Elephants with Raised Trunks",
    metalOrMaterial: "Solid Brass",
    bestZone: "Main Entrance or North (N)",
    directionFacing: "Facing inward to welcome guests, or guarding both sides of the main door",
    classicalPurpose: "Dignity, majesty, supreme luck, shielding against malefic planetary forces and warding off competitors.",
    shastricReference: "Gaja Shastra & Manasara",
    installationRitual: "Install on Thursday morning, apply sandal tilak to trunks, and keep them pristine.",
    prohibitedPlacements: "Do not point elephants outward away from the premises."
  }
];

// ==========================================================
// 4. VEDIC MANTRAS & VASTU SHANTI PUJA PROTOCOLS
// ==========================================================
export const VEDIC_PUJA_PROTOCOLS_DATABASE: VedicPujaProtocol[] = [
  {
    id: "vastu_purusha_shanti_homa",
    title: "Vastu Purusha Maha Shanti Homa",
    targetDosha: "General Spatial Cleansing & Nullification of Structural Architectural Flaws",
    deity: "Vastu Purusha (Cosmic Space Entity)",
    coreMantra: "ॐ वास्तोष्पते प्रति जानीह्यस्मान् त्स्वावेशो अनमीवो भवा नः । यत् त्वेमहे प्रति तन्नो जुषस्व शं नो भव द्विपदे शं चतुष्पदे ॥",
    mantraMeaning: "O Lord of the Dwellings! Welcome us kindly. Ensure our abode is free of disease and afflictions. Grant us our aspirations, and shower peace on our two-legged and four-legged dependents.",
    idealTithiNakshatra: "Rohini, Mrigashira, Uttara Phalguni, Chitra, Anuradha, Uttara Ashadha, or Uttara Bhadrapada during Shukla Paksha.",
    samagriList: [
      "Pure Cow Ghee (500g)",
      "Navadhanya (9 sacred grains)",
      "Pancha Ratna (5 sacred gemstones)",
      "Panchagavya (5 sacred cow derivatives)",
      "Havan Samagri herbs (Guggul, Loban, Camphor, Jatamansi)",
      "Mango wood (Amra Samidha)",
      "White sesame seeds (Shweta Tila)"
    ],
    ritualProcedure: [
      "1. Sankalpam: The head of household sits facing East and takes sacred water vow with betel nut.",
      "2. Ganapati Puja: Invocatory prayers to eliminate all impediments.",
      "3. Punyahavachanam: Purification of the premises with consecrated mango leaf sprinkling.",
      "4. Vastu Purusha Mandala Aradhana: 81-pada cosmic diagram worship with flowers and unbroken rice.",
      "5. Dikpala Homa: Oblations to the 10 cardinal regents of space.",
      "6. Purnahuti: Final coconut and silk cloth offering into the sacred consecrated fire."
    ],
    fruitBenefit: "Complete neutralization of directional cuts, missing corners, and historical land karmic doshas."
  },
  {
    id: "rudrabhishek_ishanya",
    title: "Maha Rudrabhishek for North-East (Ishanya) Afflictions",
    targetDosha: "Kitchen, Toilet, or Cut in North-East (Ishanya Dosha)",
    deity: "Lord Shiva (Ishana Rudra)",
    coreMantra: "नमस्ते अस्तु भगवन् विश्वेश्वराय महादेवाय त्र्यम्बकाय त्रिपुरान्तकाय त्रिकालाग्निकालाय कालाग्निरुद्राय नीलकण्ठाय मृत्युञ्जयाय सर्वेश्वराय सदाशिवाय श्रीमन्महादेवाय नमः ॥",
    mantraMeaning: "Salutations to the Supreme Lord of the Cosmos, the Three-Eyed Victor over Death and Master of Time.",
    idealTithiNakshatra: "Maha Shivaratri, Pradosham, or any Monday during Shukla Paksha.",
    samagriList: [
      "Pure Ganga Jal / Spring Water",
      "Fresh Unboiled Cow Milk",
      "Honey, Curd, Ghee, and Sugar Cane Juice",
      "Bilva Leaves (108 tri-foliates)",
      "White Sandalwood Paste",
      "Vibhuti (Sacred Bhasma)"
    ],
    ritualProcedure: [
      "1. Set up Sphatik or Parad Shivling in the North-East zone of the house.",
      "2. Continuous chanting of Sri Rudram (Namakam & Chamakam) while pouring 11 sacred dravyas.",
      "3. Offering of 108 Bilva leaves while chanting 'Om Namah Shivaya'.",
      "4. Maha Mangala Arati with camphor and sounding of brass conch (Shankha)."
    ],
    fruitBenefit: "Extinguishes the catastrophic fire or sewage defect in Ishanya; shields progeny from chronic neurological and physical disorders."
  },
  {
    id: "ashta_dikpala_kavacha",
    title: "10 Cardinal Dikpala Mantra Kavacha",
    targetDosha: "Multi-Zone Deficiencies & Weak Boundary Enclosures",
    deity: "The 10 Regents of Space (Indra, Agni, Yama, Nirruti, Varuna, Vayu, Kubera, Ishana, Brahma, Ananta)",
    coreMantra: "ॐ इन्द्राय नमः (East) · ॐ अग्नये नमः (SE) · ॐ यमाय नमः (South) · ॐ निरृतये नमः (SW) · ॐ वरुणाय नमः (West) · ॐ वायवे नमः (NW) · ॐ कुबेराय नमः (North) · ॐ ईशानाय नमः (NE) · ॐ ब्रह्मणे नमः (Zenith) · ॐ अनन्ताय नमः (Nadir)",
    mantraMeaning: "Homage to the eternal guardians who uphold the cosmic perimeter of the residence.",
    idealTithiNakshatra: "Amavasya night or Sankranti solar transition.",
    samagriList: [
      "Brass bell",
      "Pure cow ghee lamp",
      "Yellow mustard seeds (Sarson)",
      "Rock sea salt"
    ],
    ritualProcedure: [
      "1. Start at North-East and walk clockwise around the entire interior perimeter.",
      "2. Ring the brass bell at each of the 8 corners while chanting the specific Dikpala mantra.",
      "3. Scatter consecrated yellow mustard seeds at the perimeter skirting to seal the pranic envelope."
    ],
    fruitBenefit: "Erects an impenetrable boundary against external geopathic and astral intrusions."
  }
];

// ==========================================================
// 5. FENG SHUI GRANDMASTER CURES & APPLIED REMEDIES
// ==========================================================
export const FENG_SHUI_GRANDMASTER_DATABASE: FengShuiGrandmasterRemedy[] = [
  {
    id: "pi_xiu_pair",
    cureName: "Pi Xiu / Pi Yao (Celestial Fortune Beasts)",
    chineseName: "貔貅 (Píxiū)",
    baguaTrigram: "Qian (Heaven) & Dui (Lake)",
    material: "Solid Heavy Brass or Jade Stone",
    directionSector: "Facing the main front door or window diagonally",
    functionPurpose: "Fierce guardian of wealth; consumes wealth and gold without releasing it. Pacifies Grand Duke Jupiter (Tai Sui).",
    criticalRules: [
      "Must face toward the entrance or window, NEVER directly towards the master bedroom or toilet.",
      "Never touch the eyes or mouth of the Pi Xiu once activated (they need sharp eyes to spot wealth and open mouth to seize it).",
      "Do not place higher than eye level; must be respected as an active companion."
    ],
    activationRitual: "Bathe in half rainwater and half well/spring water (Yin-Yang water), dry with clean red silk, and whisper your name into its ear."
  },
  {
    id: "brass_wu_lou_calabash",
    cureName: "Natural Brass Wu Lou (Gourd of Immortality)",
    chineseName: "葫芦 (Húlu)",
    baguaTrigram: "Kun (Earth) & Gen (Mountain)",
    material: "Solid Heavy Brass or Natural Dried Bottle Gourd",
    directionSector: "Beside bed headboard or Sector afflicted by Flying Star #2 (Sickness)",
    functionPurpose: "Absorbs toxic illness chi, promotes deep physical recovery, dissolves medical drain, and shields pregnant mothers.",
    criticalRules: [
      "Must have a hollow cavity with an open top to swallow negative sick frequencies.",
      "Tie a red silk ribbon or Chinese knot around its waist to activate Fire-Earth harmony.",
      "Do not place directly on dirty kitchen counters."
    ],
    activationRitual: "Leave under the midday sun for 1 hour, sound a brass bell 7 times over its opening, and place beside the patient."
  },
  {
    id: "three_legged_money_frog",
    cureName: "3-Legged Money Toad (Chan Chu)",
    chineseName: "蟾蜍 (Chánchú)",
    baguaTrigram: "Kan (Water) & Xun (Wind)",
    material: "Heavy Brass or Golden Bronze with Red Jewels",
    directionSector: "Southeast (Wealth corner) or near Front Door inside",
    functionPurpose: "Spits out wealth into the home; continually draws prosperity, windfall opportunities, and sudden commercial breaks.",
    criticalRules: [
      "Must face INWARD toward the living room during the day so it spits wealth into the home.",
      "Never place it facing out the door (it will spit wealth onto the street).",
      "Never put on the floor of a bathroom, kitchen, or bedroom."
    ],
    activationRitual: "Ensure the Chinese coin in its mouth has the 4 Chinese characters facing UP, and rub its back with red silk."
  },
  {
    id: "bagua_concave_convex_mirrors",
    cureName: "Bagua Mirror (Concave vs. Convex Rulebook)",
    chineseName: "八卦镜 (Bāguà Jìng)",
    baguaTrigram: "Early Heaven Bagua (Xiantian Bagua)",
    material: "Peachwood Base with Metal Mirror Core",
    directionSector: "Exterior ONLY: Above front door facing outdoor threat",
    functionPurpose: "Neutralizes Sha Chi (poison arrows) such as T-junction roads, sharp roof corners, lampposts, and hospitals.",
    criticalRules: [
      "STRICT MANDATE: NEVER HANG A BAGUA MIRROR INSIDE A HOME OR OFFICE! It harms residents.",
      "CONCAVE MIRROR (Curved IN): Sucks in and absorbs mild negative energy or upside-down inverted toxic buildings.",
      "CONVEX MIRROR (Curved OUT): Deflects and bounces back aggressive deadly spears like incoming highways or high-voltage transformers."
    ],
    activationRitual: "Consecrate during noon on an auspicious sunny day with vermilion cinnabar dot at the center mirror rim."
  },
  {
    id: "six_rod_hollow_metal_chime",
    cureName: "6-Rod Hollow Metal Wind Chime",
    chineseName: "六管空心铜风铃 (Liù Guǎn Fēnglíng)",
    baguaTrigram: "Qian (Heaven - Number 6)",
    material: "Pure Hollow Brass or Copper Tubes",
    directionSector: "North-West (Metal/Patriarch) or West, or where Star #5 Yellow resides",
    functionPurpose: "The hollow tubes allow cosmic prana to enter, transform, and emerge as pure harmonious acoustic frequencies, suppressing the dreaded #5 Misfortune Star.",
    criticalRules: [
      "Must have EXACTLY 6 hollow metal rods (6 is the celestial number of Big Metal / Heaven).",
      "Do not hang directly above a bed or sofa where people sit for extended durations.",
      "Rods must be hollow, not solid."
    ],
    activationRitual: "Ring the chime with the wooden clapper in a clockwise circle 3 times while visualizing brilliant golden white light."
  },
  {
    id: "dragon_turtle_beast",
    cureName: "Dragon Turtle (Long Gui)",
    chineseName: "龙龟 (Lóngguī)",
    baguaTrigram: "Kan (Water) & Qian (Heaven)",
    material: "Solid Heavy Brass with Baby Turtle on Back",
    directionSector: "North (Career) or on the executive desk",
    functionPurpose: "Blends the fierce dragon's ambition and courage with the tortoise's steadfast endurance. Neutralizes backstabbing at work.",
    criticalRules: [
      "Place with its head facing your entrance or window to breathe in courage.",
      "Having a baby turtle on its back ensures multi-generational success and family lineage blessings.",
      "Keep on a polished wooden stand."
    ],
    activationRitual: "Place a small red ribbon under its base with your primary career goal written in gold ink."
  }
];
