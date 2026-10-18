export interface CrystalMasterItem {
  id: string;
  name: string;
  sanskritName: string;
  number: number;
  secondaryNumbers: number[];
  planet: string;
  chakra: string;
  element: string;
  benefits: string[];
  description: string;
  energeticProperties: string;
  chakraAlignmentDetails: string;
  cleansingMethod: string;
  wearingPlacement: string;
  mantra: string;
  imageUrl: string;
}

export const MASTER_CRYSTALS_LIST: CrystalMasterItem[] = [
  {
    id: "sunstone",
    name: "Sunstone",
    sanskritName: "सूर्यकान्त मणि (Suryakanta Mani)",
    number: 1,
    secondaryNumbers: [3, 9],
    planet: "Sun (Surya)",
    chakra: "Manipura (Solar Plexus) & Swadhisthana",
    element: "Fire (Agni)",
    benefits: [
      "Instills magnetic leadership and solar vitality",
      "Eliminates dependency and self-doubt",
      "Accelerates career promotion and fame",
      "Ignites creative passion and personal warmth"
    ],
    description: "Sunstone carries the radiant fire frequency of Surya Dev. Its golden glitter (aventurescence) dispels dark lethargy, bestowing executive authority, independence, and energetic protection to Number 1 personalities.",
    energeticProperties: "High-frequency Solar Fire vibration. Radiates golden magnetic warmth, executive authority, and energetic independence while dissolving cords of codependency.",
    chakraAlignmentDetails: "Primary: Manipura (Solar Plexus Chakra) & Secondary: Swadhisthana (Sacral). Ignites personal willpower, creative passion, and solar life-force energy.",
    cleansingMethod: "Expose to early morning golden sunlight for 30 minutes, or cleanse over burning Sandalwood dhoop.",
    wearingPlacement: "Wear as a bracelet on right wrist, or set in copper/gold ring on ring finger.",
    mantra: "Om Hram Hreem Hrom Sah Suryaya Namah",
    imageUrl: "/src/assets/images/sunstone_crystal_1786447005766.jpg"
  },
  {
    id: "carnelian",
    name: "Carnelian",
    sanskritName: "रक्तमणि / रत्तक (Raktamani)",
    number: 1,
    secondaryNumbers: [9, 3],
    planet: "Mars & Sun (Mangal & Surya)",
    chakra: "Swadhisthana (Sacral Chakra)",
    element: "Fire & Earth",
    benefits: [
      "Boosts motivation, physical stamina, and ambition",
      "Dissolves performance anxiety and stage fear",
      "Stimulates metabolism and vital blood circulation",
      "Anchors courage during competitive challenges"
    ],
    description: "Carnelian is a fiery orange chalcedony stone of motivation and endurance. It activates the lower chakras, stimulating physical energy, vocal confidence, and decisive action for Number 1 and Number 9 leaders.",
    energeticProperties: "Fiery Kundalini-activating resonance. Stimulates vital blood flow, physical stamina, and decisive warrior motivation while clearing energetic sluggishness.",
    chakraAlignmentDetails: "Primary: Swadhisthana (Sacral Chakra) & Secondary: Muladhara (Root). Anchors grounded courage, sacral passion, and creative manifestation.",
    cleansingMethod: "Rinse under running lukewarm water and recharge on a Selenite charging plate.",
    wearingPlacement: "Wear as a pendant near sacral chakra or as a bracelet on the active hand.",
    mantra: "Om Kram Kreem Krom Sah Bhaumaya Namah",
    imageUrl: "/src/assets/images/carnelian_crystal_1786447022519.jpg"
  },
  {
    id: "moonstone",
    name: "Moonstone",
    sanskritName: "चन्द्रकान्त मणि (Chandrakanta Mani)",
    number: 2,
    secondaryNumbers: [7, 6],
    planet: "Moon (Chandra)",
    chakra: "Swadhisthana & Third Eye (Ajna)",
    element: "Water (Jala)",
    benefits: [
      "Balances emotional volatility and mood swings",
      "Enhances feminine intuition and psychic receptivity",
      "Promotes hormonal balance and restful sleep",
      "Deepens empathy and relationship harmony"
    ],
    description: "Moonstone reflects the divine ethereal blue glow of Chandra Dev. It calms erratic mind chatter, nurtures gentle emotional intelligence, and harmonizes family bonds for Number 2 individuals.",
    energeticProperties: "Cool lunar water frequency. Calms erratic subtle-body emotional waves, heightens psychic intuition, and harmonizes hormonal aura rhythms.",
    chakraAlignmentDetails: "Primary: Swadhisthana (Sacral) & Secondary: Ajna (Third Eye Chakra). Nurtures emotional balance, empathetic wisdom, and peaceful dream states.",
    cleansingMethod: "Bathe under full moon light overnight; avoid harsh chemicals and hot water.",
    wearingPlacement: "Wear in silver ring on small finger, or keep under pillow for peaceful dreams.",
    mantra: "Om Shram Shreem Shrom Sah Chandraya Namah",
    imageUrl: "/src/assets/images/moonstone_photo_1786452433928.jpg"
  },
  {
    id: "selenite",
    name: "Selenite",
    sanskritName: "श्वेत शीला (Shweta Shila / Gypsum Crystal)",
    number: 2,
    secondaryNumbers: [7, 9],
    planet: "Moon & Ketu",
    chakra: "Sahasrara (Crown Chakra) & Soul Star",
    element: "Ether & Water",
    benefits: [
      "Instantly purifies aura and neutralizes negative vibes",
      "Cleanses and recharges all surrounding crystals",
      "Opens high-frequency spiritual connection",
      "Disperses mental fog and environmental static"
    ],
    description: "Selenite is a high-vibrational fibrous crystal named after the Moon goddess Selene. It acts as an etheric vacuum cleaner, continuously purifying household energy and elevating meditation spaces.",
    energeticProperties: "Ultra-high etheric vibration. Functions as a spiritual vacuum cleaner, rapidly dissolving auric blockages and amplifying ambient crystal fields.",
    chakraAlignmentDetails: "Primary: Sahasrara (Crown Chakra) & Soul Star Chakra. Connects individual consciousness directly with divine light frequencies.",
    cleansingMethod: "Self-cleansing crystal; DO NOT submerge in water (selenite dissolves). Smudge with sage or incense.",
    wearingPlacement: "Place Selenite wands/towers in 4 corners of home or work desk; place other crystals on Selenite plates.",
    mantra: "Om Namah Shivaya / Om Shrim Hrim",
    imageUrl: "/src/assets/images/selenite_crystal_1786447053958.jpg"
  },
  {
    id: "clear_quartz",
    name: "Clear Quartz (Sphatik)",
    sanskritName: "स्फटिक मणि (Sphatik Mani)",
    number: 2,
    secondaryNumbers: [6, 1, 3],
    planet: "Venus & Moon (Shukra & Chandra)",
    chakra: "Sahasrara (Crown) & All Chakras",
    element: "Ether & Water",
    benefits: [
      "Amplifies energy, intentions, and prayer power 100x",
      "Cools body temperature and reduces feverish stress",
      "Clears brain fog and enhances memory retention",
      "Neutralizes electromagnetic radiation"
    ],
    description: "Sphatik (Clear Quartz) is the master healer crystal in Vedic science. It holds pure icy pranic energy, cooling heat-induced anger, boosting concentration, and amplifying all mantra vibrations.",
    energeticProperties: "Master piezoelectric frequency. Amplifies intentions and prayer power 100x, neutralizes ambient EMF radiation, and cools excess body heat.",
    chakraAlignmentDetails: "Primary: Sahasrara (Crown Chakra) & All 7 Chakras. Unblocks, aligns, and balances the full human chakra column.",
    cleansingMethod: "Wash with pure Gangajal or cold water, then expose to morning sunlight for 15 minutes.",
    wearingPlacement: "Wear as a 108-bead Sphatik Mala, or place a natural Quartz generator at the center of Vastu grid.",
    mantra: "Om Dram Drim Drom Sah Shukraya Namah",
    imageUrl: "/src/assets/images/clear_quartz_sphatik_crystal_1786448230055.jpg"
  },
  {
    id: "citrine",
    name: "Citrine",
    sanskritName: "सुनैला (Sunela / Merchant Stone)",
    number: 3,
    secondaryNumbers: [1, 5, 9],
    planet: "Jupiter (Brihaspati)",
    chakra: "Manipura (Solar Plexus Chakra)",
    element: "Fire & Air",
    benefits: [
      "Attracts cash flow, business success, and wealth abundance",
      "Boosts optimism, wisdom, and intellectual clarity",
      "Eliminates poverty mindset and financial anxieties",
      "Enhances digestion and digestive solar fire"
    ],
    description: "Citrine (Sunela) is celebrated as the 'Merchant's Stone' of Jupiter. It holds golden wealth-building vibrations, helping entrepreneurs, teachers, and financial managers attract financial windfalls.",
    energeticProperties: "Golden solar abundance frequency. Stimulates cash flow, dispels poverty consciousness, and infuses the aura with radiant optimism and mental clarity.",
    chakraAlignmentDetails: "Primary: Manipura (Solar Plexus Chakra). Clears digestive/energy stagnation and fortifies core personal authority.",
    cleansingMethod: "Citrine is self-cleansing; recharge under early morning sun or with Yellow Turmeric (Haldi) water.",
    wearingPlacement: "Place in cash drawer or wallet; wear as a pendant or bracelet on right arm.",
    mantra: "Om Gram Greem Grom Sah Gurave Namah",
    imageUrl: "/src/assets/images/citrine_crystal_golden_1786448241225.jpg"
  },
  {
    id: "tigers_eye",
    name: "Tiger's Eye",
    sanskritName: "व्याघ्रचक्षु मणि (Vyaghra Chakshu)",
    number: 3,
    secondaryNumbers: [4, 8],
    planet: "Jupiter & Rahu",
    chakra: "Manipura & Muladhara (Root Chakra)",
    element: "Earth & Fire",
    benefits: [
      "Provides razor-sharp focus and tactical decision making",
      "Deflects evil eye, jealousy, and psychic attacks",
      "Builds unshakable willpower and grounded courage",
      "Balances dual extremes during high-stakes negotiation"
    ],
    description: "Tiger's Eye features silky golden-brown chatoyancy resembling a tiger's gaze. It merges the wisdom of Jupiter with the grounding alertness of Rahu, protecting traders and leaders from hidden risks.",
    energeticProperties: "Dynamic earth-fire chatoyant frequency. Sharpens laser focus, deflects negative eye/envy, and balances dual energetic extremes during negotiations.",
    chakraAlignmentDetails: "Primary: Manipura (Solar Plexus) & Secondary: Muladhara (Root Chakra). Anchors tactical willpower, physical instincts, and grounded courage.",
    cleansingMethod: "Bury in clean dry earth for 2 hours, or wash under tap water and place near sunlight.",
    wearingPlacement: "Wear on right wrist as a bead bracelet, or carry as a pocket worry stone during meetings.",
    mantra: "Om Hreem Namah / Om Rahave Namah",
    imageUrl: "/src/assets/images/tigers_eye_photo_1786450115811.jpg"
  },
  {
    id: "smoky_quartz",
    name: "Smoky Quartz",
    sanskritName: "धूम्र स्फटिक (Dhumra Sphatik)",
    number: 4,
    secondaryNumbers: [8, 7],
    planet: "Rahu & Saturn (Shani)",
    chakra: "Muladhara (Root Chakra)",
    element: "Earth (Prithvi)",
    benefits: [
      "Transmutes negative toxic energy into positive light",
      "Relieves chronic stress, anxiety, and panic tendencies",
      "Grounds airy overthinking into practical reality",
      "Protects against electromagnetic frequency (EMF) pollution"
    ],
    description: "Smoky Quartz is a translucent brown-gray quartz of deep grounding. It absorbs heavy karmic static, guarding Rahu-afflicted minds against nightmares, paranoia, and erratic decision making.",
    energeticProperties: "Transmutational earth grounding frequency. Absorbs toxic energetic static, neutralizes EMF pollution, and stabilizes panicked or stressed nervous systems.",
    chakraAlignmentDetails: "Primary: Muladhara (Root Chakra) & Earth Star Chakra. Pulls erratic overthinking down into physical reality and Earth stability.",
    cleansingMethod: "Smudge with Frankincense/Guggul dhoop, or rest on raw sea salt overnight.",
    wearingPlacement: "Place on work desk near laptop, or wear as a anklet/bracelet on left arm.",
    mantra: "Om Bhran Bhreen Bhron Sah Rahave Namah",
    imageUrl: "/src/assets/images/smoky_quartz_photo_1786450131748.jpg"
  },
  {
    id: "black_tourmaline",
    name: "Black Tourmaline",
    sanskritName: "कृष्ण तुर्मली (Krishna Turmali)",
    number: 4,
    secondaryNumbers: [8, 9],
    planet: "Rahu & Saturn (Shani)",
    chakra: "Muladhara (Root Chakra)",
    element: "Earth & Ether",
    benefits: [
      "Supreme energetic shield against evil eye & black magic",
      "Neutralizes 5G, Wi-Fi, and computer radiation",
      "Anchors deep emotional grounding during crises",
      "Clears heavy blockages from feet and lower chakras"
    ],
    description: "Black Tourmaline is the ultimate psychic bodyguard stone. It forms an impenetrable energetic shield around the wearer, deflecting negativity and stabilizing volatile Number 4 energy.",
    energeticProperties: "Supreme electromagnetic and psychic shield. Forms an impenetrable protective aura boundary, neutralizing 5G, Wi-Fi, and heavy psychic attacks.",
    chakraAlignmentDetails: "Primary: Muladhara (Root Chakra). Discharges heavy electrical charges and stress directly down into the grounding Earth network.",
    cleansingMethod: "Wash with water and sea salt, then expose to sunlight or sound bowl vibrations.",
    wearingPlacement: "Place near main entrance doorway of home; wear as a bracelet on non-dominant wrist.",
    mantra: "Om Sham Shanaishcharaya Namah",
    imageUrl: "/src/assets/images/black_tourmaline_photo_1786452416161.jpg"
  },
  {
    id: "green_aventurine",
    name: "Green Aventurine",
    sanskritName: "हरितमणि (Haritamani / Stone of Opportunity)",
    number: 5,
    secondaryNumbers: [1, 6],
    planet: "Mercury (Budh)",
    chakra: "Anahata (Heart Chakra)",
    element: "Earth & Air",
    benefits: [
      "Attracts unexpected luck, prize wins, and career openings",
      "Soothes emotional wounds and relationship conflict",
      "Encourages financial innovation and commercial agility",
      "Improves vital lung capacity and heart coherence"
    ],
    description: "Green Aventurine is known worldwide as the 'Stone of Opportunity'. It carries Mercury's youthful green energy, renewing optimism, attracting windfall prosperity, and balancing Heart Chakra vibrations.",
    energeticProperties: "Vibrant heart-centered growth frequency. Attracts unexpected opportunities, dissolves emotional conflict, and revitalizes vital heart coherence.",
    chakraAlignmentDetails: "Primary: Anahata (Heart Chakra). Opens the heart center to prosperity, compassion, and emotional renewal.",
    cleansingMethod: "Rinse in spring water and place among green indoor plants overnight.",
    wearingPlacement: "Wear as a pendant over the chest, or carry in shirt pocket near the heart.",
    mantra: "Om Bram Breem Brom Sah Budhaya Namah",
    imageUrl: "/src/assets/images/green_aventurine_photo_1786452839797.jpg"
  },
  {
    id: "green_jade",
    name: "Green Jade",
    sanskritName: "यशब (Yashab / Yu Stone)",
    number: 5,
    secondaryNumbers: [2, 6],
    planet: "Mercury & Venus",
    chakra: "Anahata (Heart Chakra)",
    element: "Earth (Prithvi)",
    benefits: [
      "Attracts long-term steady wealth and business longevity",
      "Harmonizes mind and body with tranquility",
      "Promotes longevity, cellular renewal, and detoxification",
      "Protects against foolish financial risks"
    ],
    description: "Jade is the ancient stone of royal abundance, health, and wisdom. It instills serene calm in volatile traders, preventing impulsive mistakes and building sustainable financial empires.",
    energeticProperties: "Serene ancient wealth-attraction frequency. Restores cellular equilibrium, protects against impulsive financial risks, and cultivates lasting tranquility.",
    chakraAlignmentDetails: "Primary: Anahata (Heart Chakra) & Secondary: Muladhara (Root). Stabilizes steady financial flow, physical longevity, and inner peace.",
    cleansingMethod: "Cleanse with rainwater or warm soapy water; leave near green leaves in morning sunlight.",
    wearingPlacement: "Wear as a carved ring or bracelet on the left wrist to receive wealth chi.",
    mantra: "Om Budhaya Namah / Om Shreem Hreem",
    imageUrl: "/src/assets/images/green_jade_real_photo_1786463319667.jpg"
  },
  {
    id: "peridot",
    name: "Peridot",
    sanskritName: "पेरिडॉट / ज़बरजद (Zabarjad)",
    number: 5,
    secondaryNumbers: [1, 3],
    planet: "Mercury (Budh)",
    chakra: "Anahata & Manipura Chakra",
    element: "Fire & Earth",
    benefits: [
      "Releases envy, resentment, and past karmic burdens",
      "Stimulates quick witty intellect and public communication",
      "Attracts romantic joy and social popularity",
      "Protects against nighttime anxieties"
    ],
    description: "Peridot is a sparkling olive-green volcanic gem born from Earth's mantle. It combines Mercury's mental sharpness with heart-centered joy, dissolving jealousy and attracting commercial prosperity.",
    energeticProperties: "Sparkling volcanic green frequency. Cleanses heavy emotional burdens, releases past envy and anger, and enhances witty public communication.",
    chakraAlignmentDetails: "Primary: Anahata (Heart) & Secondary: Manipura (Solar Plexus Chakra). Harmonizes heart-centered joy with solar confidence.",
    cleansingMethod: "Rinse under cold running tap water; recharge under warm sunlight for 20 minutes.",
    wearingPlacement: "Set in gold or brass ring on little finger, or wear as a necklace.",
    mantra: "Om Bram Breem Brom Sah Budhaya Namah",
    imageUrl: "/src/assets/images/peridot_photo_1786450155817.jpg"
  },
  {
    id: "rose_quartz",
    name: "Rose Quartz",
    sanskritName: "गुलाबी स्फटिक (Gulabi Sphatik)",
    number: 6,
    secondaryNumbers: [2, 9],
    planet: "Venus (Shukra)",
    chakra: "Anahata (Heart Chakra)",
    element: "Water (Jala)",
    benefits: [
      "Attracts romantic soulmates and deep affection",
      "Restores self-love, forgiveness, and emotional trust",
      "Soothes heartbreak, grief, and emotional trauma",
      "Enhances facial glow, aesthetic grace, and charm"
    ],
    description: "Rose Quartz is the crystal of unconditional love and Venusian beauty. It dissolves heart wall blockages, filling relationships with tender compassion, romantic warmth, and social attraction.",
    energeticProperties: "Pure unconditional love vibration. Gently dissolves heart walls, soothes grief and trauma, and radiates aesthetic charm and romantic magnetism.",
    chakraAlignmentDetails: "Primary: Anahata (Heart Chakra). Fills the subtle body with unconditional self-love, compassion, and relationship harmony.",
    cleansingMethod: "Wash with rose water or cold spring water; recharge under gentle moonlight.",
    wearingPlacement: "Place raw Rose Quartz in South-East (relationship) bedroom corner, or wear over heart.",
    mantra: "Om Dram Drim Drom Sah Shukraya Namah",
    imageUrl: "/src/assets/images/rose_quartz_real_photo_1786463172699.jpg"
  },
  {
    id: "opal",
    name: "Opal",
    sanskritName: "ओपल / दुधिया पत्थर (Dudhiya Pathar)",
    number: 6,
    secondaryNumbers: [5, 1],
    planet: "Venus (Shukra)",
    chakra: "Sahasrara & Swadhisthana",
    element: "Water & Ether",
    benefits: [
      "Unlocks artistic genius, glamour, and showbiz fame",
      "Attracts royal luxury cars, mansions, and high fashion",
      "Enhances passion, sexual harmony, and marital bliss",
      "Amplifies personal magnetism and charisma"
    ],
    description: "Opal flashes with iridescent rainbow spectral colors governed by Shukra Dev. It is the premier gemstone for actors, designers, artists, and luxury seekers needing magnetic popularity.",
    energeticProperties: "High-frequency iridescent rainbow spectral light. Unlocks creative genius, amplifies artistic magnetism, and intensifies glamour and romantic charm.",
    chakraAlignmentDetails: "Primary: Sahasrara (Crown) & Secondary: Swadhisthana (Sacral Chakra). Heightens high creative passion, charisma, and aesthetic beauty.",
    cleansingMethod: "Keep hydrated with occasional pure water dabbing; recharge under moonlight.",
    wearingPlacement: "Set in silver ring on index or ring finger of dominant hand.",
    mantra: "Om Shum Shukraya Namah",
    imageUrl: "/src/assets/images/opal_real_photo_1786463458586.jpg"
  },
  {
    id: "amethyst",
    name: "Amethyst",
    sanskritName: "कटैला (Katela / Jamunia)",
    number: 7,
    secondaryNumbers: [8, 3],
    planet: "Ketu & Saturn (Shani)",
    chakra: "Ajna (Third Eye) & Sahasrara (Crown)",
    element: "Ether & Air",
    benefits: [
      "Overcomes addiction, insomnia, and mental restlessness",
      "Awakens psychic intuition, dream recall, and meditation depth",
      "Protects against spiritual attack and negative astral entities",
      "Calms severe migraine and nervous stress"
    ],
    description: "Amethyst (Katela) is a magnificent violet quartz of spiritual transmutation. It quells addiction and mental turbulence, opening the Crown Chakra to higher cosmic wisdom for Number 7 seekers.",
    energeticProperties: "Spiritual purple transmutation ray. Quells overactive mind chatter, overcomes addictive behaviors, and shields against negative astral energies.",
    chakraAlignmentDetails: "Primary: Ajna (Third Eye) & Secondary: Sahasrara (Crown Chakra). Awakens higher intuitive vision, tranquil meditation, and spiritual insight.",
    cleansingMethod: "Expose to twilight/moonlight, or sound healing singing bowls (avoid harsh direct hot sun).",
    wearingPlacement: "Wear as a pendant over throat/third eye, or place an Amethyst geode in meditation room.",
    mantra: "Om Kem Ketave Namah / Om Sham Shanaishcharaya Namah",
    imageUrl: "/src/assets/images/amethyst_real_photo_1786463704257.jpg"
  },
  {
    id: "lapis_lazuli",
    name: "Lapis Lazuli",
    sanskritName: "लाजवर्द (Lajward / Stone of Truth)",
    number: 7,
    secondaryNumbers: [3, 5],
    planet: "Ketu & Jupiter",
    chakra: "Vishuddha (Throat) & Ajna (Third Eye)",
    element: "Ether & Water",
    benefits: [
      "Unlocks deep spiritual wisdom, self-awareness, and truth",
      "Enhances public speaking, vocal power, and debate skill",
      "Protects against psychic manipulation and deceit",
      "Relieves throat chakra blockages and thyroid imbalance"
    ],
    description: "Lapis Lazuli is a deep royal blue stone flecked with golden pyrite sparks. Revered by ancient Vedic rishis and Egyptian kings, it bestows royal truth, vocal authority, and profound mystical insight.",
    energeticProperties: "Royal truth and wisdom vibration. Activates vocal authority, expands intellectual insight, and wards off psychic deceit and manipulation.",
    chakraAlignmentDetails: "Primary: Vishuddha (Throat) & Secondary: Ajna (Third Eye Chakra). Aligns authentic self-expression with cosmic truth.",
    cleansingMethod: "Rinse quickly with lukewarm water (do not soak); recharge on Selenite or under moonlight.",
    wearingPlacement: "Wear as a choker necklace around throat or ring on middle finger.",
    mantra: "Om Kem Ketave Namah",
    imageUrl: "/src/assets/images/lapis_lazuli_photo_1786463721458.jpg"
  },
  {
    id: "red_jasper",
    name: "Red Jasper",
    sanskritName: "रक्त जस्पर (Rakta Jasper)",
    number: 9,
    secondaryNumbers: [1, 8],
    planet: "Mars (Mangal)",
    chakra: "Muladhara (Root Chakra)",
    element: "Earth & Fire",
    benefits: [
      "Provides steady physical endurance and Kundalini grounding",
      "Neutralizes physical danger, blood issues, and lethargy",
      "Sustains focus during exhausting physical projects",
      "Enhances courage without explosive temper tantrums"
    ],
    description: "Red Jasper is a brick-red opaque chalcedony known as the 'Supreme Nurturer'. It grounds wild Mars energy into controlled, disciplined stamina, vitalizing blood circulation and physical defense.",
    energeticProperties: "Steady Root-sustaining endurance energy. Grounds turbulent Mars energy into controlled physical stamina and protects against physical harm.",
    chakraAlignmentDetails: "Primary: Muladhara (Root Chakra). Vitalizes blood circulation, physical endurance, and foundational grounding.",
    cleansingMethod: "Bury in soil for 24 hours, or rinse under cold water and expose to morning sun.",
    wearingPlacement: "Wear as a pocket stone or bracelet on right arm during workouts/heavy tasks.",
    mantra: "Om Kram Kreem Krom Sah Bhaumaya Namah",
    imageUrl: "/src/assets/images/red_jasper_photo_1786463751841.jpg"
  }
];
