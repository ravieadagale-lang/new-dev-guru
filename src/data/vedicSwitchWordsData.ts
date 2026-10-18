// Vedic Switch Words (Beej Mantra Codes) Database & Detailed Rules
// Rooted in Tantra Shastra, Vedic Phonetics & Cosmic Sound Vibration

export interface VedicSwitchWordItem {
  id: string;
  syllable: string;
  devanagari: string;
  deity: string;
  associatedChakra: string;
  associatedPlanet?: string;
  category: "wealth" | "health" | "love" | "protection" | "knowledge" | "planetary" | "combinations";
  categoryLabel: string;
  coreVibration: string;
  problemSolved: string;
  specificPurposes: string[];
  chantingCount: string;
  waterChargingMethod: string;
  bodyWritingLocation: string;
  doshaRemedy: string;
  combinationExample?: string;
  guidanceNotes: string;
}

export interface VedicChantingRule {
  id: string;
  title: string;
  sanskritName: string;
  description: string;
  actionableProtocol: string;
  iconType: "sound" | "water" | "pen" | "clock" | "flame" | "shield";
}

export const VEDIC_SWITCH_WORDS_RULES: VedicChantingRule[] = [
  {
    id: "sound_resonance",
    title: "Anusvara Nasal Resonance Rule",
    sanskritName: "नाद-बिन्दु नासिक्य नियम",
    description: "Every Vedic Beej switch ends with Anusvara (ं - 'M' or 'NG'). The consonant must transition smoothly into a prolonged nasal humming vibration that resonates in the palate and brain.",
    actionableProtocol: "Pronounce 'SHREEM' as 'Shreeee-mmm', allowing the final 'M' to vibrate in the sinus cavity for 2 full seconds like a bee hum (Bhramari).",
    iconType: "sound",
  },
  {
    id: "sankalpa_intent",
    title: "Sankalpa Mental Focus Rule",
    sanskritName: "एकग्र संकल्प नियम",
    description: "Vedic switch syllables are laser-focused quantum audio keys. Chanting without clear visualization scatters the prana. A single, pure outcome must be held in the third eye.",
    actionableProtocol: "Before beginning your 108 or 28 counts, speak or visualize your specific intent in 1 present-tense sentence: 'By the grace of Mahalakshmi, divine wealth flows freely to me.'",
    iconType: "flame",
  },
  {
    id: "water_charging",
    title: "Hydro-Vibrational Charging (Abhimantrit Jal)",
    sanskritName: "अभिमंत्रित जल संस्कार",
    description: "Water holds vibrational memory. Holding a copper, silver, or glass tumbler while chanting transfers the acoustic resonance directly into the liquid crystal matrix of water.",
    actionableProtocol: "Hold a glass of pure drinking water in both hands at heart level. Chant your chosen Vedic Switch Word 28 or 108 times, projecting breath over the water. Drink immediately.",
    iconType: "water",
  },
  {
    id: "body_anchoring",
    title: "Likhit Japa & Body Writing Protocol",
    sanskritName: "शरीर अंकन व लिखित जप",
    description: "The human body possesses 72,000 nadis. Writing the seed syllable on the non-dominant arm or palm creates a continuous bio-magnetic biofeedback loop.",
    actionableProtocol: "Using non-toxic red or yellow ink, write the Beej word (e.g., 'श्रीं' or 'SHREEM') on the inner wrist of your left hand (receptive hand). Re-apply once per morning.",
    iconType: "pen",
  },
  {
    id: "auspicious_timings",
    title: "Kala & Muhurat Resonance",
    sanskritName: "शुभ मुहूर्त व दिशा नियम",
    description: "Vedic switches produce 10x amplitude during sandhya junctions (Brahma Muhurta 4:00 AM - 6:00 AM and Dusk Godhuli Bela). Facing East or North amplifies reception.",
    actionableProtocol: "Face East for health and solar radiance; face North for wealth, liquidity, and Kuber-Lakshmi alignment; face North-East for spiritual transcendence.",
    iconType: "clock",
  },
  {
    id: "purity_sadhana",
    title: "Niyama, Diet & Mental Stillness",
    sanskritName: "शौच व सात्त्विक नियम",
    description: "Maintain physical cleanliness (wash hands, feet, and face). Avoid negative speech, gossip, or anger during the hour immediately following the japa.",
    actionableProtocol: "Sit on a natural wool, silk, or kusha mat (Aasana) to insulate the bio-electric charge generated during recitation from grounding into the floor.",
    iconType: "shield",
  },
];

export const VEDIC_SWITCH_WORDS_CATALOG: VedicSwitchWordItem[] = [
  // 1. WEALTH & ABUNDANCE
  {
    id: "vsw-shreem",
    syllable: "SHREEM",
    devanagari: "श्रीं",
    deity: "Goddess Mahalakshmi",
    associatedChakra: "Ajna (Third Eye) & Crown (Sahasrara)",
    associatedPlanet: "Venus (Shukra) & Jupiter (Guru)",
    category: "wealth",
    categoryLabel: "Wealth & Prosperity",
    coreVibration: "Supreme seed of divine beauty, magnetic radiance, liquid gold wealth, and cosmic abundance.",
    problemSolved: "Financial debt, chronic scarcity mindset, sales droughts, lack of royal luxury.",
    specificPurposes: [
      "Attracting unexpected cash windfalls and investment growth",
      "Magnifying personal aura and luxury lifestyle opportunities",
      "Clearing business stagnation and client shortages",
      "Dissolving family poverty karma (Daridra Yoga)"
    ],
    chantingCount: "108 times daily; 1,008 times on Fridays or full moon days (Purnima)",
    waterChargingMethod: "Hold a glass of water in a copper or silver tumbler, chant 'SHREEM' 108 times, drink in 3 sips.",
    bodyWritingLocation: "Write 'SHREEM' with red or green ink on the left inner wrist or palm.",
    doshaRemedy: "Pacifies debilitated Venus, 12th house losses, and Kemadruma Yoga.",
    combinationExample: "OM SHREEM MAHALAKSHMIYEI NAMAHA / SHREEM BRZEE",
    guidanceNotes: "Vibrate the 'M' like a deep hum in the crown of your head. Practice with open heart gratitude."
  },
  {
    id: "vsw-glaum",
    syllable: "GLAUM",
    devanagari: "ग्लौं",
    deity: "Lord Maha Ganapati (Vighnaharta)",
    associatedChakra: "Muladhara (Root Chakra)",
    associatedPlanet: "Ketu & Jupiter",
    category: "wealth",
    categoryLabel: "Wealth & Prosperity",
    coreVibration: "Shatters deep-seated karmic blockages trapped in the earth plane and unlocks hidden wealth.",
    problemSolved: "Frozen business assets, legal delays in inheritance, stubborn career obstacles.",
    specificPurposes: [
      "Dissolving unsolvable bureaucratic delays in business",
      "Removing stubborn obstacles in purchasing or selling land/property",
      "Clearing deep ancestral karmic debt blocking family prosperity",
      "Bringing stable foundational security to sudden ventures"
    ],
    chantingCount: "108 times daily facing North or East",
    waterChargingMethod: "Chant over water with a pinch of turmeric, sprinkle around home entrance.",
    bodyWritingLocation: "Write on the base of the left thumb (Mount of Venus/Mars) with yellow ink.",
    doshaRemedy: "Mitigates Ketu affliction in 2nd or 11th houses.",
    combinationExample: "OM GLAUM GUM GANAPATAYE NAMAHA",
    guidanceNotes: "Ideal when starting any new commercial enterprise or signing property deeds."
  },
  {
    id: "vsw-vam",
    syllable: "VAM",
    devanagari: "वं",
    deity: "Lord Varuna (God of Cosmic Waters) & Kamadhenu",
    associatedChakra: "Swadhisthana (Sacral Chakra)",
    associatedPlanet: "Moon (Chandra) & Venus",
    category: "wealth",
    categoryLabel: "Wealth & Prosperity",
    coreVibration: "Fluid abundance, unstoppable cash flow, and emotional release of financial fear.",
    problemSolved: "Dry financial spells, cash-flow bottlenecks in business, uncollected receivables.",
    specificPurposes: [
      "Stimulating continuous daily liquidity and cash circulation",
      "Curing the emotional panic associated with bank balances",
      "Attracting reliable paying customers and invoice clearances",
      "Balancing bodily fluid metabolism and creative vitality"
    ],
    chantingCount: "54 or 108 times at twilight or before bed",
    waterChargingMethod: "Chant over drinking water; visualize silver liquid moonlight infusing the cup.",
    bodyWritingLocation: "Write on the left abdomen or left wrist with blue or silver ink.",
    doshaRemedy: "Pacifies Moon-Saturn Vish Yoga and dry financial karma.",
    combinationExample: "VAM SHREEM VAM",
    guidanceNotes: "Focus on the sensation of gentle water flowing endlessly without obstruction."
  },
  {
    id: "vsw-hreem",
    syllable: "HREEM",
    devanagari: "ह्रीं",
    deity: "Goddess Bhuvaneshwari (Cosmic Empress)",
    associatedChakra: "Anahata (Heart) & Ajna (Third Eye)",
    associatedPlanet: "Sun (Surya) & Venus",
    category: "wealth",
    categoryLabel: "Wealth & Prosperity",
    coreVibration: "The supreme Maya Beeja representing leadership, sovereignty, royal command, and universal attraction.",
    problemSolved: "Disrespect from peers, subordinate insubordination, lack of commanding presence.",
    specificPurposes: [
      "Attaining high administrative authority and promotions",
      "Winning political, corporate, or judicial leadership battles",
      "Establishing deep charisma and respect across all social circles",
      "Manifesting grand visions into concrete material form"
    ],
    chantingCount: "108 times at sunrise facing East",
    waterChargingMethod: "Place a fresh red flower in water, chant 'HREEM' 108 times, drink the energised water.",
    bodyWritingLocation: "Write with saffron or red sandalwood paste over the solar plexus.",
    doshaRemedy: "Combats 10th house combust Sun and loss of public reputation.",
    combinationExample: "OM HREEM SHREEM KLEEM",
    guidanceNotes: "Combines the warmth of Surya with the beauty of the Divine Mother."
  },

  // 2. HEALTH & HEALING
  {
    id: "vsw-haum",
    syllable: "HAUM",
    devanagari: "हौं",
    deity: "Lord Mahamrityunjaya Shiva",
    associatedChakra: "Ajna (Third Eye)",
    associatedPlanet: "Saturn (Shani) & Rahu",
    category: "health",
    categoryLabel: "Health & Vitality",
    coreVibration: "Primal roar of Shiva conquering mortality, fatal disease, sudden accident, and biological decay.",
    problemSolved: "Severe sickness, hospital ICU crises, chronic autoimmune fatigue, fear of death.",
    specificPurposes: [
      "Halting sudden acute health crises and post-surgical complications",
      "Building a diamond shield against infectious and chronic diseases",
      "Eradicating deep hypochondria, morbid panic, and death anxiety",
      "Infusing cellular biology with invincible life force (Ojas)"
    ],
    chantingCount: "108 times morning and night; 1,008 times during critical illness",
    waterChargingMethod: "Hold water in a glass; chant 'HAUM' 108 times, drink and apply a drop to the forehead.",
    bodyWritingLocation: "Write 'HAUM' with white or sandalwood paste on the center of the forehead or throat.",
    doshaRemedy: "Supreme antidote to Maraka Dashas, Sade Sati, and Rahu-Ketu nodal afflictions.",
    combinationExample: "HAUM JUHM SAH (The Tri-Beeja Mahamrityunjaya)",
    guidanceNotes: "Chant with firm resolve and deep spine alignment. Do not chant casually."
  },
  {
    id: "vsw-juhm",
    syllable: "JUHM",
    devanagari: "जूं",
    deity: "Amrita Bindu (Immortal Nectar of Shiva)",
    associatedChakra: "Sahasrara (Crown)",
    associatedPlanet: "Moon & Jupiter",
    category: "health",
    categoryLabel: "Health & Vitality",
    coreVibration: "The Amrita Beeja generating soothing cellular rejuvenation, nerve regeneration, and youthful glow.",
    problemSolved: "Nervous breakdown, insomnia, severe dehydration, premature biological aging.",
    specificPurposes: [
      "Accelerating deep tissue and bone marrow rejuvenation",
      "Calming hyperactive sympathetic nervous system and panic attacks",
      "Restoring deep, dreamless restorative sleep",
      "Clearing inflammatory heat, ulcers, and acid reflux in the gut"
    ],
    chantingCount: "108 times before sleep with hands resting on the chest",
    waterChargingMethod: "Charge drinking water overnight under moonlight or chant 108 times before sipping.",
    bodyWritingLocation: "Write with sandalwood or pure water on the crown chakra.",
    doshaRemedy: "Balances afflicted Chandra and cures Pitta dosha aggravation.",
    combinationExample: "OM JUHM SAH",
    guidanceNotes: "Visualise cooling silvery nectar dripping from the crown into every cell."
  },
  {
    id: "vsw-dham",
    syllable: "DHAM",
    devanagari: "धं",
    deity: "Lord Dhanvantari (Divine Physician)",
    associatedChakra: "Anahata (Heart Chakra)",
    associatedPlanet: "Sun & Jupiter",
    category: "health",
    categoryLabel: "Health & Vitality",
    coreVibration: "Divine diagnosis clarity, pharmaceutical efficacy, and medicinal herbs empowerment.",
    problemSolved: "Undiagnosed chronic illness, ineffective medical treatments, lingering weakness.",
    specificPurposes: [
      "Guiding you to the exact correct physician and therapy protocol",
      "Eliminating the toxic side effects of heavy medications",
      "Strengthening the natural immune defense system",
      "Purifying the blood stream and lymphatic drainage"
    ],
    chantingCount: "108 times while holding medicine or herbs in hand",
    waterChargingMethod: "Hold daily medicines in right hand, chant 'DHAM' 21 times before consuming.",
    bodyWritingLocation: "Write on the upper left arm with green ink.",
    doshaRemedy: "Mitigates 6th house disease lord affliction.",
    combinationExample: "OM DHAM DHANVANTARAYE NAMAHA",
    guidanceNotes: "Invokes the celestial nectar urn carried by Lord Dhanvantari."
  },
  {
    id: "vsw-raam",
    syllable: "RAAM",
    devanagari: "रां",
    deity: "Lord Shri Rama & Agni Deva (Fire Principle)",
    associatedChakra: "Manipura (Solar Plexus)",
    associatedPlanet: "Sun & Mars (Mangal)",
    category: "health",
    categoryLabel: "Health & Vitality",
    coreVibration: "Cosmic solar fire incinerating intestinal toxins, sloth, depression, and low metabolism.",
    problemSolved: "Sluggish digestion, chronic constipation, low self-esteem, lethargy.",
    specificPurposes: [
      "Igniting strong digestive fire (Jatharagni) and fast metabolism",
      "Burning away negative subconscious patterns and emotional sluggishness",
      "Bestowing lion-like courage, physical stamina, and willpower",
      "Clearing respiratory congestion and lethargy"
    ],
    chantingCount: "108 times facing East during morning sunrise",
    waterChargingMethod: "Chant over lukewarm water with lemon in the morning, drink on empty stomach.",
    bodyWritingLocation: "Write on the navel center or right wrist with red ink.",
    doshaRemedy: "Strengthens debilitated Mars and cures Kapha imbalance.",
    combinationExample: "RAAM RAMAYA NAMAHA",
    guidanceNotes: "Feel the warmth building at the navel wheel radiating through your bloodstream."
  },

  // 3. PROTECTION & DEFENSE
  {
    id: "vsw-dum",
    syllable: "DUM",
    devanagari: "दुं",
    deity: "Maa Durga (Invincible Fortress)",
    associatedChakra: "Anahata (Heart) & Ajna",
    associatedPlanet: "Rahu & Mars",
    category: "protection",
    categoryLabel: "Protection & Defense",
    coreVibration: "An impenetrable diamond shield that absorbs attacks, burns malice, and crushes toxic envy.",
    problemSolved: "Evil eye (Nazar), workplace sabotage, jealousy, stalkers, haunting dreams.",
    specificPurposes: [
      "Creating an unbreakable protective aura around children and travel",
      "Deflecting curses, black magic, and malicious peer envy",
      "Dissolving sudden paralytic fear and vulnerability",
      "Granting total victory in unavoidable conflicts and court disputes"
    ],
    chantingCount: "108 times at dawn or dusk with red candle or ghee lamp lit",
    waterChargingMethod: "Chant over water with a pinch of red kumkum; sprinkle around property perimeter.",
    bodyWritingLocation: "Write 'DUM' on the back of the neck or inner left forearm with red pen.",
    doshaRemedy: "Supreme remedy for Rahu transits, Sarpa Dosha, and 8th house afflictions.",
    combinationExample: "OM DUM DURGAYE NAMAHA",
    guidanceNotes: "Feel the eight-armed Mother surrounding you with blazing golden weapons."
  },
  {
    id: "vsw-kshraum",
    syllable: "KSHRAUM",
    devanagari: "क्ष्रौं",
    deity: "Lord Narasimha (Half-Man Half-Lion)",
    associatedChakra: "Manipura & Vishuddha",
    associatedPlanet: "Mars & Ketu",
    category: "protection",
    categoryLabel: "Protection & Defense",
    coreVibration: "The fiery roar of cosmic justice that shreds illusions, evil entities, and oppressive tyrants.",
    problemSolved: "Violent harassment, legal extortion, malicious blackmail, demonic nightmares.",
    specificPurposes: [
      "Immediate termination of predatory harassment and exploitation",
      "Freeing property or assets seized by fraudulent individuals",
      "Overcoming extreme stage fright or intimidation by powerful opponents",
      "Clearing dark psychic residue from haunted living spaces"
    ],
    chantingCount: "28 or 108 times at twilight facing South or West",
    waterChargingMethod: "Chant over water while standing straight; drink with fierce inner dignity.",
    bodyWritingLocation: "Write on the soles of feet or left palm with red ink.",
    doshaRemedy: "Pacifies severe Manglik Dosha and 6th/8th house enemy yogas.",
    combinationExample: "OM KSHRAUM NARASIMHAYA SVAHA",
    guidanceNotes: "Utter with sharp clarity. Do not harbor unjust malice; it demands moral righteousness."
  },
  {
    id: "vsw-phat",
    syllable: "PHAT",
    devanagari: "फट्",
    deity: "Astra Devata (Cosmic Weapon Severance)",
    associatedChakra: "Muladhara & Vishuddha",
    associatedPlanet: "Mars & Rahu",
    category: "protection",
    categoryLabel: "Protection & Defense",
    coreVibration: "The instantaneous acoustic blade that severs toxic psychic cords, obsession, and mental loops.",
    problemSolved: "Obsessive thoughts about an ex, paralysis by overthinking, toxic attachment.",
    specificPurposes: [
      "Instant cord cutting from draining people or psychic vampires",
      "Snapping out of acute anxiety loops and compulsive panic",
      "Shattering negative habit loops (cravings, smoking, doom-scrolling)",
      "Sealing a sacred mantra circle so no negative entity can interfere"
    ],
    chantingCount: "Chant sharply 21 times followed by a hand clap at chest level",
    waterChargingMethod: "Chant over bath water with sea salt before taking a cleansing shower.",
    bodyWritingLocation: "Do not write on body; use as verbal acoustic cutting blade.",
    doshaRemedy: "Cures 8th house Rahu sudden mental hysteria.",
    combinationExample: "HUM PHAT / SVAHA PHAT",
    guidanceNotes: "Pronounce with a crisp, decisive snap at the end. Visualise cords turning to ash."
  },

  // 4. LOVE, ATTRACTION & HARMONY
  {
    id: "vsw-kleem",
    syllable: "KLEEM",
    devanagari: "क्लीं",
    deity: "Lord Krishna & Kamadeva (Cupid of the Cosmos)",
    associatedChakra: "Anahata (Heart Chakra) & Swadhisthana",
    associatedPlanet: "Venus & Moon",
    category: "love",
    categoryLabel: "Love & Magnetism",
    coreVibration: "The universal seed of magnetic attraction, sensual charm, interpersonal love, and divine sweetness.",
    problemSolved: "Marital coldness, romantic rejection, loneliness, inability to attract a soulmate.",
    specificPurposes: [
      "Attracting your rightful spiritual soulmate and loving partner",
      "Dissolving bitter misunderstandings and ego wars between spouses",
      "Enhancing irresistible vocal charm, physical allure, and warmth",
      "Transforming business prospects into affectionate lifelong clients"
    ],
    chantingCount: "108 times daily facing North or East; 540 times on Fridays",
    waterChargingMethod: "Place a fresh rose petal in water, chant 'KLEEM' 108 times, drink slowly with romantic intent.",
    bodyWritingLocation: "Write 'KLEEM' with red or pink ink on the left collarbone or left inner wrist.",
    doshaRemedy: "Cures Venus-Sun combustion and 7th house marital discord.",
    combinationExample: "OM KLEEM KRISHNAYA NAMAHA",
    guidanceNotes: "Chant with a gentle smile on your lips. Feel genuine love for yourself first."
  },
  {
    id: "vsw-sham",
    syllable: "SHAM",
    devanagari: "शं",
    deity: "Lord Shambhu Shiva & Lord Shani (Sanctified Calm)",
    associatedChakra: "Ajna (Third Eye)",
    associatedPlanet: "Saturn (Shani)",
    category: "love",
    categoryLabel: "Peace & Harmony",
    coreVibration: "Universal tranquilizer that douses explosive wrath, domestic arguments, and mental turbulence.",
    problemSolved: "Constant family fights, screaming matches, chronic bitterness, short temper.",
    specificPurposes: [
      "Instantly defusing violent arguments and toxic confrontations",
      "Bringing cool, compassionate sanity into heated household tensions",
      "Calming hyperactive, aggressive, or rebellious children",
      "Granting profound mental equanimity amidst legal or domestic crises"
    ],
    chantingCount: "108 times with blue or black sesame offerings, or mentally during tension",
    waterChargingMethod: "Chant over drinking water; serve to angry family members to soothe temper.",
    bodyWritingLocation: "Write on the back of the left hand with blue ink.",
    doshaRemedy: "Pacifies afflicted Saturn, Mars-Saturn conjunctions, and domestic anger.",
    combinationExample: "OM SHAM SHANAISCHARAYA NAMAHA",
    guidanceNotes: "Visualise a cool blue mountain lake covered in mist."
  },

  // 5. KNOWLEDGE, SPEECH & MEMORY
  {
    id: "vsw-aim",
    syllable: "AIM",
    devanagari: "ऐं",
    deity: "Goddess Saraswati (Goddess of Speech & Wisdom)",
    associatedChakra: "Vishuddha (Throat) & Ajna",
    associatedPlanet: "Mercury (Budha) & Jupiter",
    category: "knowledge",
    categoryLabel: "Intelligence & Speech",
    coreVibration: "The seed of pure intellect, photographic recall, poetic eloquence, and creative genius.",
    problemSolved: "Exam anxiety, stammering, poor memory retention, creative writer's block.",
    specificPurposes: [
      "Acing competitive examinations and difficult certifications",
      "Retaining complex books, formulas, and legal codes effortlessly",
      "Commanding spellbinding speech during public speeches or podcasts",
      "Unlocking artistic, musical, coding, and writing breakthroughs"
    ],
    chantingCount: "108 times in the morning before study or creative work",
    waterChargingMethod: "Chant over water with a drop of honey, drink before studying or speaking.",
    bodyWritingLocation: "Write 'AIM' with yellow ink on the tip of the tongue (symbolically) or on the throat.",
    doshaRemedy: "Cures debilitated Mercury, 5th house affliction, and speech impediments.",
    combinationExample: "OM AIM SARASWATYEI NAMAHA",
    guidanceNotes: "Pronounce as 'Aye-mmm'. Feel the throat and crown tingle with light."
  },
  {
    id: "vsw-gum",
    syllable: "GUM",
    devanagari: "गुं",
    deity: "Lord Brihaspati (Guru of the Gods)",
    associatedChakra: "Ajna (Third Eye)",
    associatedPlanet: "Jupiter (Guru)",
    category: "knowledge",
    categoryLabel: "Wisdom & Counsel",
    coreVibration: "High moral discernment, prophetic intuition, mentor attraction, and spiritual mastery.",
    problemSolved: "Bad judgment, gullibility, choosing wrong mentors, loss of faith.",
    specificPurposes: [
      "Attracting generous high-level mentors, sponsors, and benefactors",
      "Making million-dollar strategic decisions without foolish blunders",
      "Developing prophetic astrological, intuitive, and philosophical vision",
      "Earning deep respect as an educator, counselor, or executive"
    ],
    chantingCount: "108 times on Thursdays facing North-East",
    waterChargingMethod: "Chant over water with a saffron strand; drink during Brahma Muhurta.",
    bodyWritingLocation: "Write on the index finger (Jupiter finger) with yellow turmeric paste.",
    doshaRemedy: "Cures Guru Chandal Dosha and debilitated Jupiter in 6th/8th/12th.",
    combinationExample: "OM GUM GURAVE NAMAHA",
    guidanceNotes: "Cultivate reverent humility towards all teachers when working with GUM."
  },

  // 6. PLANETARY BEEJ SWITCHES (NAVAGRAHA BALANCING)
  {
    id: "vsw-hraam",
    syllable: "HRAAM",
    devanagari: "ह्रां",
    deity: "Surya Deva (Sun God)",
    associatedChakra: "Manipura & Sahasrara",
    associatedPlanet: "Sun (Surya)",
    category: "planetary",
    categoryLabel: "Planetary Balancing",
    coreVibration: "Solar majesty, vital bone density, willpower, paternal blessing, and royal status.",
    problemSolved: "Chronic fatigue, father-child conflict, government penalties, lack of confidence.",
    specificPurposes: [
      "Boosting low blood pressure, bone health, and eye radiance",
      "Winning civil service, administrative, and government tenders",
      "Healing deep-seated feelings of inadequacy and cowardice"
    ],
    chantingCount: "108 times at Sunday sunrise facing East",
    waterChargingMethod: "Offer water to the rising sun, chant 'HRAAM', and drink a sip.",
    bodyWritingLocation: "Write on the ring finger mount (Sun mount) with red sandalwood.",
    doshaRemedy: "Sun in Libra (Debilitated), Grahan Dosha, Pitru Dosha.",
    combinationExample: "HRAAM HREEM HROUM SAH SURYAYA NAMAHA",
    guidanceNotes: "Bask in actual sunrise rays while chanting for biological activation."
  },
  {
    id: "vsw-shraam",
    syllable: "SHRAAM",
    devanagari: "श्रां",
    deity: "Chandra Deva (Moon God)",
    associatedChakra: "Ajna & Anahata",
    associatedPlanet: "Moon (Chandra)",
    category: "planetary",
    categoryLabel: "Planetary Balancing",
    coreVibration: "Subconscious equilibrium, maternal peace, emotional intuition, and psychic sensitivity.",
    problemSolved: "Bipolar mood swings, mother's ill health, chronic anxiety, water phobia.",
    specificPurposes: [
      "Calming erratic mood swings and pre-menstrual tension",
      "Deepening psychic dreams and astrological forecasting accuracy",
      "Healing maternal relationships and ancestral female trauma"
    ],
    chantingCount: "108 times on Monday night facing the Moon",
    waterChargingMethod: "Keep water under full moon light for 2 hours; chant 'SHRAAM' 108 times.",
    bodyWritingLocation: "Write on the Mount of Moon (lower outer palm) with silver or blue ink.",
    doshaRemedy: "Moon in Scorpio (Debilitated), Kemadruma Yoga, Moon-Rahu Grahan.",
    combinationExample: "SHRAAM SHREEM SHROUM SAH CHANDRAYA NAMAHA",
    guidanceNotes: "Chant with quiet, slow, rhythmic breathing like ocean tides."
  },
  {
    id: "vsw-kraam",
    syllable: "KRAAM",
    devanagari: "क्रां",
    deity: "Mangal Deva (Mars)",
    associatedChakra: "Muladhara & Manipura",
    associatedPlanet: "Mars (Mangal)",
    category: "planetary",
    categoryLabel: "Planetary Balancing",
    coreVibration: "Physical courage, land ownership, muscular endurance, and victory over adversaries.",
    problemSolved: "Land disputes, cowardice, blood disorders, Manglik marriage delays.",
    specificPurposes: [
      "Accelerating purchase or profitable sale of real estate and farmland",
      "Building peak athletic stamina, martial prowess, and discipline",
      "Resolving blood circulation issues, anemia, and low red blood cells"
    ],
    chantingCount: "108 times on Tuesdays facing South",
    waterChargingMethod: "Chant over water in a copper vessel, drink after morning workout.",
    bodyWritingLocation: "Write on the lower palm or left thigh with red ink.",
    doshaRemedy: "Mangal in Cancer (Debilitated), Manglik Dosha, Angarak Dosha.",
    combinationExample: "KRAAM KREEM KROUM SAH BHAUMAYA NAMAHA",
    guidanceNotes: "Channel this energy into athletic training or focused work, never aggression."
  },
  {
    id: "vsw-braam",
    syllable: "BRAAM",
    devanagari: "ब्रां",
    deity: "Budha Deva (Mercury)",
    associatedChakra: "Vishuddha (Throat)",
    associatedPlanet: "Mercury (Budha)",
    category: "planetary",
    categoryLabel: "Planetary Balancing",
    coreVibration: "Commerce, mathematical calculation, software coding, witty humor, and sharp negotiation.",
    problemSolved: "Calculative accounting blunders, social awkwardness, stuttering, trading losses.",
    specificPurposes: [
      "Multiplying profits in stock trading, e-commerce, and brokerage",
      "Writing flawless software code, mathematical proofs, and books",
      "Closing high-ticket sales contracts with witty communication"
    ],
    chantingCount: "108 times on Wednesdays facing North",
    waterChargingMethod: "Chant over green coconut water, drink with business partners.",
    bodyWritingLocation: "Write on the little finger (Mercury finger) with green pen.",
    doshaRemedy: "Mercury in Pisces (Debilitated), Budha-Surya combustion.",
    combinationExample: "BRAAM BREEM BROUM SAH BUDHAYA NAMAHA",
    guidanceNotes: "Keep a vibrant green jade or emerald nearby while practicing."
  },
  {
    id: "vsw-praam",
    syllable: "PRAAM",
    devanagari: "प्रां",
    deity: "Shani Deva (Saturn)",
    associatedChakra: "Muladhara (Root)",
    associatedPlanet: "Saturn (Shani)",
    category: "planetary",
    categoryLabel: "Planetary Balancing",
    coreVibration: "Iron discipline, karmic justice, patience, long-term empire building, and stoic mastery.",
    problemSolved: "Sade Sati crises, chronic depression, bone/joint arthritis, career stagnation.",
    specificPurposes: [
      "Navigating Saturn's 7.5-year Sade Sati with blessings instead of ruin",
      "Developing superhuman patience, stoic endurance, and discipline",
      "Building massive long-term wealth that lasts generations"
    ],
    chantingCount: "108 times on Saturdays after sunset facing West",
    waterChargingMethod: "Chant over water near a mustard oil lamp; pour at the roots of a Peepal tree.",
    bodyWritingLocation: "Write on the middle finger mount (Saturn mount) with dark blue ink.",
    doshaRemedy: "Saturn in Aries (Debilitated), Sade Sati 1st/2nd/3rd phases, Shani Dhaiya.",
    combinationExample: "PRAAM PREEM PROUM SAH SHANAISCHARAYA NAMAHA",
    guidanceNotes: "Saturn demands absolute truthfulness and selfless service to the underprivileged."
  },

  // 7. SACRED COMBINATION CODES
  {
    id: "vsw-comb-shreem-brzee",
    syllable: "SHREEM BRZEE",
    devanagari: "श्रीं ब्रीं",
    deity: "Mahalakshmi & Vishvamitra Sound Wave",
    associatedChakra: "Crown (Sahasrara)",
    associatedPlanet: "Jupiter-Venus Grand Trine",
    category: "combinations",
    categoryLabel: "Sacred Combinations",
    coreVibration: "The ultimate modern-vedic fusion code revealed to erase all residual poverty karma from DNA.",
    problemSolved: "Generational poverty, bad money karma, self-sabotaging scarcity mindset.",
    specificPurposes: [
      "Rewiring the brain's neuro-circuitry from scarcity to absolute wealth",
      "Attracting unexpected financial windfalls, royalties, and passive income",
      "Manifesting grand luxury assets without guilt or spiritual friction"
    ],
    chantingCount: "108, 540 or 1,008 times continuously",
    waterChargingMethod: "Keep a glass of water on a Sri Yantra plate, chant 108 times, drink throughout the day.",
    bodyWritingLocation: "Write on the inner left forearm with red or gold glitter pen.",
    doshaRemedy: "Balances 2nd and 11th house money yogas across all divisional charts.",
    combinationExample: "OM SHREEM BRZEE NAMAHA",
    guidanceNotes: "Created by sage Vishvamitra; modernised for rapid 21st-century materialization."
  },
  {
    id: "vsw-comb-tri-beej",
    syllable: "HAUM JUHM SAH",
    devanagari: "हौं जूं सः",
    deity: "Shiva, Amrita & Jiva (Prana Consciousness)",
    associatedChakra: "Ajna, Sahasrara & Muladhara",
    associatedPlanet: "All 9 Navagrahas Unified",
    category: "combinations",
    categoryLabel: "Sacred Combinations",
    coreVibration: "The immortal core of the Mahamrityunjaya Mantra; defeats sudden death, cancer, and terminal crisis.",
    problemSolved: "Terminal health prognosis, coma state, acute psychic breakdown, near-death accidents.",
    specificPurposes: [
      "Providing immediate bio-protective armor during dangerous travel or surgery",
      "Restoring brain coherence and cellular vitality after debilitating illness",
      "Liberating the soul from fear of transition and karmic debts"
    ],
    chantingCount: "108 times or 1,008 times with Rudraksha Mala",
    waterChargingMethod: "Chant into fresh holy water or Ganga jal; touch to eyes, crown, and chest.",
    bodyWritingLocation: "Write symbolically on the chest with bhasma (sacred ash).",
    doshaRemedy: "Destroys all Maraka (killer) planet dasha effects and untimely death threats.",
    combinationExample: "OM HAUM JUHM SAH OM BHUR BHUVAH SVAHA",
    guidanceNotes: "The most revered three-syllable healing sequence in classical Vedic Tantra."
  },
  {
    id: "vsw-comb-chamunda",
    syllable: "AIM HREEM KLEEM",
    devanagari: "ऐं ह्रीं क्लीं",
    deity: "Tridevi: Mahasaraswati, Mahalakshmi & Mahakali",
    associatedChakra: "Throat, Heart & Sacral (Unified Trinity)",
    associatedPlanet: "Mercury, Sun & Venus Unified",
    category: "combinations",
    categoryLabel: "Sacred Combinations",
    coreVibration: "The Trimurti seed formula: Knowledge (Aim), Sovereign Power (Hreem), and Magnetic Attraction (Kleem).",
    problemSolved: "Total life stuckness: no money, no love, and no creative direction.",
    specificPurposes: [
      "Igniting an all-around spiritual and material Renaissance in your life",
      "Clearing heavy multi-generational karmic curses and black energy",
      "Equipping you with wisdom, resources, and love simultaneously"
    ],
    chantingCount: "108 times daily at sunrise or midnight",
    waterChargingMethod: "Chant over water in a bell metal or brass bowl; drink in the morning.",
    bodyWritingLocation: "Write 'AIM HREEM KLEEM' in a triangle shape on a piece of paper and keep in wallet.",
    doshaRemedy: "Comprehensive planetary cure for Kaal Sarp and Pitru Doshas.",
    combinationExample: "AIM HREEM KLEEM CHAMUNDAYE VICHE",
    guidanceNotes: "The quintessential Navarna Mantra core; revered in the Devi Mahatmyam."
  }
];
