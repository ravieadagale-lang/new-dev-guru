// src/data/babyJanmaksharData.ts
// Authentic 108 Vedic Nakshatra Pada Syllables (Janmakshars) and Swara Shastra classifications

export interface NakshatraPadaInfo {
  pada: number;
  akshara: string;
  aksharaEnglish: string;
  rashiIndex: number; // 0 = Aries ... 11 = Pisces
  rashiName: string;
  navamshaSign: string;
}

export interface VedicNakshatraData {
  index: number;
  name: string;
  sanskrit: string;
  lord: string;
  deity: string;
  symbol: string;
  animal: string;
  gana: "Deva" | "Manushya" | "Rakshasa";
  yoni: string;
  nadi: "Adi" | "Madhya" | "Antya";
  element: "Fire" | "Earth" | "Air" | "Water" | "Ether";
  padas: NakshatraPadaInfo[];
}

export const VEDIC_NAKSHATRAS_PADA_DATA: VedicNakshatraData[] = [
  {
    index: 0,
    name: "Ashwini",
    sanskrit: "अश्विनी",
    lord: "Ketu",
    deity: "Ashwini Kumaras (Celestial Physicians)",
    symbol: "Horse's Head",
    animal: "Horse",
    gana: "Deva",
    yoni: "Male Horse",
    nadi: "Adi",
    element: "Earth",
    padas: [
      { pada: 1, akshara: "चु", aksharaEnglish: "Chu", rashiIndex: 0, rashiName: "Mesha (Aries)", navamshaSign: "Aries" },
      { pada: 2, akshara: "चे", aksharaEnglish: "Che", rashiIndex: 0, rashiName: "Mesha (Aries)", navamshaSign: "Taurus" },
      { pada: 3, akshara: "चो", aksharaEnglish: "Cho", rashiIndex: 0, rashiName: "Mesha (Aries)", navamshaSign: "Gemini" },
      { pada: 4, akshara: "ला", aksharaEnglish: "La", rashiIndex: 0, rashiName: "Mesha (Aries)", navamshaSign: "Cancer" },
    ]
  },
  {
    index: 1,
    name: "Bharani",
    sanskrit: "भरणी",
    lord: "Venus",
    deity: "Yama (Lord of Dharma & Transformation)",
    symbol: "Yoni / Triangle",
    animal: "Elephant",
    gana: "Manushya",
    yoni: "Female Elephant",
    nadi: "Madhya",
    element: "Earth",
    padas: [
      { pada: 1, akshara: "ली", aksharaEnglish: "Lee", rashiIndex: 0, rashiName: "Mesha (Aries)", navamshaSign: "Leo" },
      { pada: 2, akshara: "लू", aksharaEnglish: "Lu", rashiIndex: 0, rashiName: "Mesha (Aries)", navamshaSign: "Virgo" },
      { pada: 3, akshara: "ले", aksharaEnglish: "Le", rashiIndex: 0, rashiName: "Mesha (Aries)", navamshaSign: "Libra" },
      { pada: 4, akshara: "लो", aksharaEnglish: "Lo", rashiIndex: 0, rashiName: "Mesha (Aries)", navamshaSign: "Scorpio" },
    ]
  },
  {
    index: 2,
    name: "Krittika",
    sanskrit: "कृत्तिका",
    lord: "Sun",
    deity: "Agni (God of Sacred Fire)",
    symbol: "Razor / Flame",
    animal: "Sheep",
    gana: "Rakshasa",
    yoni: "Female Sheep",
    nadi: "Antya",
    element: "Fire",
    padas: [
      { pada: 1, akshara: "अ", aksharaEnglish: "A", rashiIndex: 0, rashiName: "Mesha (Aries)", navamshaSign: "Sagittarius" },
      { pada: 2, akshara: "ई", aksharaEnglish: "Ee", rashiIndex: 1, rashiName: "Vrishabha (Taurus)", navamshaSign: "Capricorn" },
      { pada: 3, akshara: "उ", aksharaEnglish: "U", rashiIndex: 1, rashiName: "Vrishabha (Taurus)", navamshaSign: "Aquarius" },
      { pada: 4, akshara: "ए", aksharaEnglish: "Ea", rashiIndex: 1, rashiName: "Vrishabha (Taurus)", navamshaSign: "Pisces" },
    ]
  },
  {
    index: 3,
    name: "Rohini",
    sanskrit: "रोहिणी",
    lord: "Moon",
    deity: "Brahma / Prajapati (Creator)",
    symbol: "Chariot / Temple",
    animal: "Serpent",
    gana: "Manushya",
    yoni: "Male Serpent",
    nadi: "Antya",
    element: "Earth",
    padas: [
      { pada: 1, akshara: "ओ", aksharaEnglish: "O", rashiIndex: 1, rashiName: "Vrishabha (Taurus)", navamshaSign: "Aries" },
      { pada: 2, akshara: "वा", aksharaEnglish: "Va", rashiIndex: 1, rashiName: "Vrishabha (Taurus)", navamshaSign: "Taurus" },
      { pada: 3, akshara: "वी", aksharaEnglish: "Vee", rashiIndex: 1, rashiName: "Vrishabha (Taurus)", navamshaSign: "Gemini" },
      { pada: 4, akshara: "वू", aksharaEnglish: "Vu", rashiIndex: 1, rashiName: "Vrishabha (Taurus)", navamshaSign: "Cancer" },
    ]
  },
  {
    index: 4,
    name: "Mrigashira",
    sanskrit: "मृगशिरा",
    lord: "Mars",
    deity: "Soma (Moon God / Nectar)",
    symbol: "Deer's Head",
    animal: "Serpent",
    gana: "Deva",
    yoni: "Female Serpent",
    nadi: "Madhya",
    element: "Earth",
    padas: [
      { pada: 1, akshara: "वे", aksharaEnglish: "Ve", rashiIndex: 1, rashiName: "Vrishabha (Taurus)", navamshaSign: "Leo" },
      { pada: 2, akshara: "वो", aksharaEnglish: "Vo", rashiIndex: 1, rashiName: "Vrishabha (Taurus)", navamshaSign: "Virgo" },
      { pada: 3, akshara: "का", aksharaEnglish: "Ka", rashiIndex: 2, rashiName: "Mithuna (Gemini)", navamshaSign: "Libra" },
      { pada: 4, akshara: "की", aksharaEnglish: "Kee", rashiIndex: 2, rashiName: "Mithuna (Gemini)", navamshaSign: "Scorpio" },
    ]
  },
  {
    index: 5,
    name: "Ardra",
    sanskrit: "आर्द्रा",
    lord: "Rahu",
    deity: "Rudra (Lord of Storms & Transformation)",
    symbol: "Teardrop / Diamond",
    animal: "Dog",
    gana: "Manushya",
    yoni: "Female Dog",
    nadi: "Adi",
    element: "Water",
    padas: [
      { pada: 1, akshara: "कु", aksharaEnglish: "Ku", rashiIndex: 2, rashiName: "Mithuna (Gemini)", navamshaSign: "Sagittarius" },
      { pada: 2, akshara: "घ", aksharaEnglish: "Gha", rashiIndex: 2, rashiName: "Mithuna (Gemini)", navamshaSign: "Capricorn" },
      { pada: 3, akshara: "ङ", aksharaEnglish: "Ng", rashiIndex: 2, rashiName: "Mithuna (Gemini)", navamshaSign: "Aquarius" },
      { pada: 4, akshara: "छ", aksharaEnglish: "Chha", rashiIndex: 2, rashiName: "Mithuna (Gemini)", navamshaSign: "Pisces" },
    ]
  },
  {
    index: 6,
    name: "Punarvasu",
    sanskrit: "पुनर्वसु",
    lord: "Jupiter",
    deity: "Aditi (Universal Mother of Gods)",
    symbol: "Bow & Quiver",
    animal: "Cat",
    gana: "Deva",
    yoni: "Female Cat",
    nadi: "Adi",
    element: "Water",
    padas: [
      { pada: 1, akshara: "के", aksharaEnglish: "Ke", rashiIndex: 2, rashiName: "Mithuna (Gemini)", navamshaSign: "Aries" },
      { pada: 2, akshara: "को", aksharaEnglish: "Ko", rashiIndex: 2, rashiName: "Mithuna (Gemini)", navamshaSign: "Taurus" },
      { pada: 3, akshara: "हा", aksharaEnglish: "Ha", rashiIndex: 2, rashiName: "Mithuna (Gemini)", navamshaSign: "Gemini" },
      { pada: 4, akshara: "ही", aksharaEnglish: "Hee", rashiIndex: 3, rashiName: "Karka (Cancer)", navamshaSign: "Cancer" },
    ]
  },
  {
    index: 7,
    name: "Pushya",
    sanskrit: "पुष्य",
    lord: "Saturn",
    deity: "Brihaspati (Guru of Gods)",
    symbol: "Cow's Udder / Lotus / Arrow",
    animal: "Goat",
    gana: "Deva",
    yoni: "Male Goat",
    nadi: "Madhya",
    element: "Water",
    padas: [
      { pada: 1, akshara: "हु", aksharaEnglish: "Hu", rashiIndex: 3, rashiName: "Karka (Cancer)", navamshaSign: "Leo" },
      { pada: 2, akshara: "हे", aksharaEnglish: "He", rashiIndex: 3, rashiName: "Karka (Cancer)", navamshaSign: "Virgo" },
      { pada: 3, akshara: "हो", aksharaEnglish: "Ho", rashiIndex: 3, rashiName: "Karka (Cancer)", navamshaSign: "Libra" },
      { pada: 4, akshara: "डा", aksharaEnglish: "Da", rashiIndex: 3, rashiName: "Karka (Cancer)", navamshaSign: "Scorpio" },
    ]
  },
  {
    index: 8,
    name: "Ashlesha",
    sanskrit: "अश्लेषा",
    lord: "Mercury",
    deity: "Sarpas (Nagas / Divine Serpents)",
    symbol: "Coiled Serpent",
    animal: "Cat",
    gana: "Rakshasa",
    yoni: "Male Cat",
    nadi: "Antya",
    element: "Water",
    padas: [
      { pada: 1, akshara: "डी", aksharaEnglish: "Dee", rashiIndex: 3, rashiName: "Karka (Cancer)", navamshaSign: "Sagittarius" },
      { pada: 2, akshara: "डू", aksharaEnglish: "Du", rashiIndex: 3, rashiName: "Karka (Cancer)", navamshaSign: "Capricorn" },
      { pada: 3, akshara: "डे", aksharaEnglish: "De", rashiIndex: 3, rashiName: "Karka (Cancer)", navamshaSign: "Aquarius" },
      { pada: 4, akshara: "डो", aksharaEnglish: "Do", rashiIndex: 3, rashiName: "Karka (Cancer)", navamshaSign: "Pisces" },
    ]
  },
  {
    index: 9,
    name: "Magha",
    sanskrit: "मघा",
    lord: "Ketu",
    deity: "Pitris (Ancestors / Divine Lineage)",
    symbol: "Royal Throne Chamber",
    animal: "Rat",
    gana: "Rakshasa",
    yoni: "Male Rat",
    nadi: "Antya",
    element: "Water",
    padas: [
      { pada: 1, akshara: "मा", aksharaEnglish: "Ma", rashiIndex: 4, rashiName: "Simha (Leo)", navamshaSign: "Aries" },
      { pada: 2, akshara: "मी", aksharaEnglish: "Mee", rashiIndex: 4, rashiName: "Simha (Leo)", navamshaSign: "Taurus" },
      { pada: 3, akshara: "मू", aksharaEnglish: "Moo", rashiIndex: 4, rashiName: "Simha (Leo)", navamshaSign: "Gemini" },
      { pada: 4, akshara: "मे", aksharaEnglish: "Me", rashiIndex: 4, rashiName: "Simha (Leo)", navamshaSign: "Cancer" },
    ]
  },
  {
    index: 10,
    name: "Purva Phalguni",
    sanskrit: "पूर्वा फाल्गुनी",
    lord: "Venus",
    deity: "Bhaga (God of Fortune & Prosperity)",
    symbol: "Front Legs of Couch / Hammock",
    animal: "Rat",
    gana: "Manushya",
    yoni: "Female Rat",
    nadi: "Madhya",
    element: "Fire",
    padas: [
      { pada: 1, akshara: "मो", aksharaEnglish: "Mo", rashiIndex: 4, rashiName: "Simha (Leo)", navamshaSign: "Leo" },
      { pada: 2, akshara: "टा", aksharaEnglish: "Ta", rashiIndex: 4, rashiName: "Simha (Leo)", navamshaSign: "Virgo" },
      { pada: 3, akshara: "टी", aksharaEnglish: "Tee", rashiIndex: 4, rashiName: "Simha (Leo)", navamshaSign: "Libra" },
      { pada: 4, akshara: "टू", aksharaEnglish: "Too", rashiIndex: 4, rashiName: "Simha (Leo)", navamshaSign: "Scorpio" },
    ]
  },
  {
    index: 11,
    name: "Uttara Phalguni",
    sanskrit: "उत्तरा फाल्गुनी",
    lord: "Sun",
    deity: "Aryaman (God of Nobility & Friendship)",
    symbol: "Back Legs of Couch",
    animal: "Cow",
    gana: "Manushya",
    yoni: "Male Bull",
    nadi: "Adi",
    element: "Fire",
    padas: [
      { pada: 1, akshara: "टे", aksharaEnglish: "Te", rashiIndex: 4, rashiName: "Simha (Leo)", navamshaSign: "Sagittarius" },
      { pada: 2, akshara: "टो", aksharaEnglish: "To", rashiIndex: 5, rashiName: "Kanya (Virgo)", navamshaSign: "Capricorn" },
      { pada: 3, akshara: "पा", aksharaEnglish: "Pa", rashiIndex: 5, rashiName: "Kanya (Virgo)", navamshaSign: "Aquarius" },
      { pada: 4, akshara: "पी", aksharaEnglish: "Pee", rashiIndex: 5, rashiName: "Kanya (Virgo)", navamshaSign: "Pisces" },
    ]
  },
  {
    index: 12,
    name: "Hasta",
    sanskrit: "हस्त",
    lord: "Moon",
    deity: "Savitr (Sun as Awakener / Golden Hand)",
    symbol: "Open Palm / Fist",
    animal: "Buffalo",
    gana: "Deva",
    yoni: "Female Buffalo",
    nadi: "Adi",
    element: "Fire",
    padas: [
      { pada: 1, akshara: "पू", aksharaEnglish: "Pu", rashiIndex: 5, rashiName: "Kanya (Virgo)", navamshaSign: "Aries" },
      { pada: 2, akshara: "ष", aksharaEnglish: "Sha", rashiIndex: 5, rashiName: "Kanya (Virgo)", navamshaSign: "Taurus" },
      { pada: 3, akshara: "ण", aksharaEnglish: "Na", rashiIndex: 5, rashiName: "Kanya (Virgo)", navamshaSign: "Gemini" },
      { pada: 4, akshara: "ठ", aksharaEnglish: "Tha", rashiIndex: 5, rashiName: "Kanya (Virgo)", navamshaSign: "Cancer" },
    ]
  },
  {
    index: 13,
    name: "Chitra",
    sanskrit: "चित्रा",
    lord: "Mars",
    deity: "Twashtar / Vishvakarma (Celestial Architect)",
    symbol: "Shining Brilliant Jewel",
    animal: "Tiger",
    gana: "Rakshasa",
    yoni: "Female Tiger",
    nadi: "Madhya",
    element: "Fire",
    padas: [
      { pada: 1, akshara: "पे", aksharaEnglish: "Pe", rashiIndex: 5, rashiName: "Kanya (Virgo)", navamshaSign: "Leo" },
      { pada: 2, akshara: "पो", aksharaEnglish: "Po", rashiIndex: 5, rashiName: "Kanya (Virgo)", navamshaSign: "Virgo" },
      { pada: 3, akshara: "रा", aksharaEnglish: "Ra", rashiIndex: 6, rashiName: "Tula (Libra)", navamshaSign: "Libra" },
      { pada: 4, akshara: "री", aksharaEnglish: "Ree", rashiIndex: 6, rashiName: "Tula (Libra)", navamshaSign: "Scorpio" },
    ]
  },
  {
    index: 14,
    name: "Swati",
    sanskrit: "स्वाति",
    lord: "Rahu",
    deity: "Vayu (God of Wind & Prana)",
    symbol: "Shoot of Plant / Sword in Breeze",
    animal: "Buffalo",
    gana: "Deva",
    yoni: "Male Buffalo",
    nadi: "Antya",
    element: "Fire",
    padas: [
      { pada: 1, akshara: "रू", aksharaEnglish: "Ru", rashiIndex: 6, rashiName: "Tula (Libra)", navamshaSign: "Sagittarius" },
      { pada: 2, akshara: "रे", aksharaEnglish: "Re", rashiIndex: 6, rashiName: "Tula (Libra)", navamshaSign: "Capricorn" },
      { pada: 3, akshara: "रो", aksharaEnglish: "Ro", rashiIndex: 6, rashiName: "Tula (Libra)", navamshaSign: "Aquarius" },
      { pada: 4, akshara: "ता", aksharaEnglish: "Taa", rashiIndex: 6, rashiName: "Tula (Libra)", navamshaSign: "Pisces" },
    ]
  },
  {
    index: 15,
    name: "Vishakha",
    sanskrit: "विशाखा",
    lord: "Jupiter",
    deity: "Indragni (Alliance of Indra & Agni)",
    symbol: "Triumphal Arch / Potter's Wheel",
    animal: "Tiger",
    gana: "Rakshasa",
    yoni: "Male Tiger",
    nadi: "Antya",
    element: "Air",
    padas: [
      { pada: 1, akshara: "ती", aksharaEnglish: "Tee", rashiIndex: 6, rashiName: "Tula (Libra)", navamshaSign: "Aries" },
      { pada: 2, akshara: "तू", aksharaEnglish: "Too", rashiIndex: 6, rashiName: "Tula (Libra)", navamshaSign: "Taurus" },
      { pada: 3, akshara: "ते", aksharaEnglish: "Te", rashiIndex: 6, rashiName: "Tula (Libra)", navamshaSign: "Gemini" },
      { pada: 4, akshara: "तो", aksharaEnglish: "To", rashiIndex: 7, rashiName: "Vrishchika (Scorpio)", navamshaSign: "Cancer" },
    ]
  },
  {
    index: 16,
    name: "Anuradha",
    sanskrit: "अनुराधा",
    lord: "Saturn",
    deity: "Mitra (God of Divine Friendship & Alliances)",
    symbol: "Lotus Flower / Staff",
    animal: "Deer",
    gana: "Deva",
    yoni: "Female Deer",
    nadi: "Madhya",
    element: "Air",
    padas: [
      { pada: 1, akshara: "ना", aksharaEnglish: "Na", rashiIndex: 7, rashiName: "Vrishchika (Scorpio)", navamshaSign: "Leo" },
      { pada: 2, akshara: "नी", aksharaEnglish: "Nee", rashiIndex: 7, rashiName: "Vrishchika (Scorpio)", navamshaSign: "Virgo" },
      { pada: 3, akshara: "नू", aksharaEnglish: "Noo", rashiIndex: 7, rashiName: "Vrishchika (Scorpio)", navamshaSign: "Libra" },
      { pada: 4, akshara: "ने", aksharaEnglish: "Ne", rashiIndex: 7, rashiName: "Vrishchika (Scorpio)", navamshaSign: "Scorpio" },
    ]
  },
  {
    index: 17,
    name: "Jyeshtha",
    sanskrit: "ज्येष्ठा",
    lord: "Mercury",
    deity: "Indra (King of the Gods)",
    symbol: "Circular Amulet / Umbrella",
    animal: "Deer",
    gana: "Rakshasa",
    yoni: "Male Deer",
    nadi: "Adi",
    element: "Air",
    padas: [
      { pada: 1, akshara: "नो", aksharaEnglish: "No", rashiIndex: 7, rashiName: "Vrishchika (Scorpio)", navamshaSign: "Sagittarius" },
      { pada: 2, akshara: "या", aksharaEnglish: "Ya", rashiIndex: 7, rashiName: "Vrishchika (Scorpio)", navamshaSign: "Capricorn" },
      { pada: 3, akshara: "यी", aksharaEnglish: "Yee", rashiIndex: 7, rashiName: "Vrishchika (Scorpio)", navamshaSign: "Aquarius" },
      { pada: 4, akshara: "यू", aksharaEnglish: "Yu", rashiIndex: 7, rashiName: "Vrishchika (Scorpio)", navamshaSign: "Pisces" },
    ]
  },
  {
    index: 18,
    name: "Mula",
    sanskrit: "मूल",
    lord: "Ketu",
    deity: "Nirriti (Goddess of Dissolution & Cosmic Truth)",
    symbol: "Tied Bunch of Roots / Lion's Tail",
    animal: "Dog",
    gana: "Rakshasa",
    yoni: "Male Dog",
    nadi: "Adi",
    element: "Air",
    padas: [
      { pada: 1, akshara: "ये", aksharaEnglish: "Ye", rashiIndex: 8, rashiName: "Dhanu (Sagittarius)", navamshaSign: "Aries" },
      { pada: 2, akshara: "यो", aksharaEnglish: "Yo", rashiIndex: 8, rashiName: "Dhanu (Sagittarius)", navamshaSign: "Taurus" },
      { pada: 3, akshara: "भा", aksharaEnglish: "Bha", rashiIndex: 8, rashiName: "Dhanu (Sagittarius)", navamshaSign: "Gemini" },
      { pada: 4, akshara: "भी", aksharaEnglish: "Bhee", rashiIndex: 8, rashiName: "Dhanu (Sagittarius)", navamshaSign: "Cancer" },
    ]
  },
  {
    index: 19,
    name: "Purva Ashadha",
    sanskrit: "पूर्वाषाढ़ा",
    lord: "Venus",
    deity: "Apas (Cosmic Waters of Invincibility)",
    symbol: "Fan / Winnowing Basket / Elephant Tusk",
    animal: "Monkey",
    gana: "Manushya",
    yoni: "Male Monkey",
    nadi: "Madhya",
    element: "Air",
    padas: [
      { pada: 1, akshara: "भू", aksharaEnglish: "Bhu", rashiIndex: 8, rashiName: "Dhanu (Sagittarius)", navamshaSign: "Leo" },
      { pada: 2, akshara: "धा", aksharaEnglish: "Dha", rashiIndex: 8, rashiName: "Dhanu (Sagittarius)", navamshaSign: "Virgo" },
      { pada: 3, akshara: "फा", aksharaEnglish: "Pha", rashiIndex: 8, rashiName: "Dhanu (Sagittarius)", navamshaSign: "Libra" },
      { pada: 4, akshara: "ढा", aksharaEnglish: "Dha", rashiIndex: 8, rashiName: "Dhanu (Sagittarius)", navamshaSign: "Scorpio" },
    ]
  },
  {
    index: 20,
    name: "Uttara Ashadha",
    sanskrit: "उत्तराषाढ़ा",
    lord: "Sun",
    deity: "Vishwadevas (Universal Divine Virtues)",
    symbol: "Elephant Tusk / Small Cot",
    animal: "Mongoose",
    gana: "Manushya",
    yoni: "Female Mongoose",
    nadi: "Antya",
    element: "Air",
    padas: [
      { pada: 1, akshara: "भे", aksharaEnglish: "Bhe", rashiIndex: 8, rashiName: "Dhanu (Sagittarius)", navamshaSign: "Sagittarius" },
      { pada: 2, akshara: "भो", aksharaEnglish: "Bho", rashiIndex: 9, rashiName: "Makara (Capricorn)", navamshaSign: "Capricorn" },
      { pada: 3, akshara: "जा", aksharaEnglish: "Ja", rashiIndex: 9, rashiName: "Makara (Capricorn)", navamshaSign: "Aquarius" },
      { pada: 4, akshara: "जी", aksharaEnglish: "Jee", rashiIndex: 9, rashiName: "Makara (Capricorn)", navamshaSign: "Pisces" },
    ]
  },
  {
    index: 21,
    name: "Shravana",
    sanskrit: "श्रवण",
    lord: "Moon",
    deity: "Vishnu (Preserver of the Cosmos)",
    symbol: "Ear / Three Footprints",
    animal: "Monkey",
    gana: "Deva",
    yoni: "Female Monkey",
    nadi: "Antya",
    element: "Air",
    padas: [
      { pada: 1, akshara: "खी", aksharaEnglish: "Khi", rashiIndex: 9, rashiName: "Makara (Capricorn)", navamshaSign: "Aries" },
      { pada: 2, akshara: "खू", aksharaEnglish: "Khu", rashiIndex: 9, rashiName: "Makara (Capricorn)", navamshaSign: "Taurus" },
      { pada: 3, akshara: "खे", aksharaEnglish: "Khe", rashiIndex: 9, rashiName: "Makara (Capricorn)", navamshaSign: "Gemini" },
      { pada: 4, akshara: "खो", aksharaEnglish: "Kho", rashiIndex: 9, rashiName: "Makara (Capricorn)", navamshaSign: "Cancer" },
    ]
  },
  {
    index: 22,
    name: "Dhanishta",
    sanskrit: "धनिष्ठा",
    lord: "Mars",
    deity: "Eight Vasus (Deities of Abundance & Light)",
    symbol: "Mridangam Drum / Flute",
    animal: "Lion",
    gana: "Rakshasa",
    yoni: "Female Lion",
    nadi: "Madhya",
    element: "Ether",
    padas: [
      { pada: 1, akshara: "गा", aksharaEnglish: "Ga", rashiIndex: 9, rashiName: "Makara (Capricorn)", navamshaSign: "Leo" },
      { pada: 2, akshara: "गी", aksharaEnglish: "Gee", rashiIndex: 9, rashiName: "Makara (Capricorn)", navamshaSign: "Virgo" },
      { pada: 3, akshara: "गु", aksharaEnglish: "Gu", rashiIndex: 10, rashiName: "Kumbha (Aquarius)", navamshaSign: "Libra" },
      { pada: 4, akshara: "गे", aksharaEnglish: "Ge", rashiIndex: 10, rashiName: "Kumbha (Aquarius)", navamshaSign: "Scorpio" },
    ]
  },
  {
    index: 23,
    name: "Shatabhisha",
    sanskrit: "शतभिषा",
    lord: "Rahu",
    deity: "Varuna (Cosmic Ocean & Law of Karma)",
    symbol: "Empty Circle / 100 Healers",
    animal: "Horse",
    gana: "Rakshasa",
    yoni: "Female Horse",
    nadi: "Adi",
    element: "Ether",
    padas: [
      { pada: 1, akshara: "गो", aksharaEnglish: "Go", rashiIndex: 10, rashiName: "Kumbha (Aquarius)", navamshaSign: "Sagittarius" },
      { pada: 2, akshara: "सा", aksharaEnglish: "Sa", rashiIndex: 10, rashiName: "Kumbha (Aquarius)", navamshaSign: "Capricorn" },
      { pada: 3, akshara: "सी", aksharaEnglish: "See", rashiIndex: 10, rashiName: "Kumbha (Aquarius)", navamshaSign: "Aquarius" },
      { pada: 4, akshara: "सू", aksharaEnglish: "Su", rashiIndex: 10, rashiName: "Kumbha (Aquarius)", navamshaSign: "Pisces" },
    ]
  },
  {
    index: 24,
    name: "Purva Bhadrapada",
    sanskrit: "पूर्वभाद्रपदा",
    lord: "Jupiter",
    deity: "Aja Ekapada (Fire Dragon / Cosmic Ascetic)",
    symbol: "Sword / Two Front Legs of Funeral Cot",
    animal: "Lion",
    gana: "Manushya",
    yoni: "Male Lion",
    nadi: "Adi",
    element: "Ether",
    padas: [
      { pada: 1, akshara: "से", aksharaEnglish: "Se", rashiIndex: 10, rashiName: "Kumbha (Aquarius)", navamshaSign: "Aries" },
      { pada: 2, akshara: "सो", aksharaEnglish: "So", rashiIndex: 10, rashiName: "Kumbha (Aquarius)", navamshaSign: "Taurus" },
      { pada: 3, akshara: "दा", aksharaEnglish: "Da", rashiIndex: 10, rashiName: "Kumbha (Aquarius)", navamshaSign: "Gemini" },
      { pada: 4, akshara: "दी", aksharaEnglish: "Dee", rashiIndex: 11, rashiName: "Meena (Pisces)", navamshaSign: "Cancer" },
    ]
  },
  {
    index: 25,
    name: "Uttara Bhadrapada",
    sanskrit: "उत्तरभाद्रपदा",
    lord: "Saturn",
    deity: "Ahirbudhnya (Serpent of the Ocean Depths)",
    symbol: "Twins / Back Legs of Cot / Deep Well",
    animal: "Cow",
    gana: "Manushya",
    yoni: "Female Cow",
    nadi: "Madhya",
    element: "Ether",
    padas: [
      { pada: 1, akshara: "दू", aksharaEnglish: "Du", rashiIndex: 11, rashiName: "Meena (Pisces)", navamshaSign: "Leo" },
      { pada: 2, akshara: "थ", aksharaEnglish: "Tha", rashiIndex: 11, rashiName: "Meena (Pisces)", navamshaSign: "Virgo" },
      { pada: 3, akshara: "झ", aksharaEnglish: "Jha", rashiIndex: 11, rashiName: "Meena (Pisces)", navamshaSign: "Libra" },
      { pada: 4, akshara: "ञ", aksharaEnglish: "Na", rashiIndex: 11, rashiName: "Meena (Pisces)", navamshaSign: "Scorpio" },
    ]
  },
  {
    index: 26,
    name: "Revati",
    sanskrit: "रेवती",
    lord: "Mercury",
    deity: "Pushan (Shepherd of Souls & Safe Journeys)",
    symbol: "Pair of Swimming Fish / Drum",
    animal: "Elephant",
    gana: "Deva",
    yoni: "Female Elephant",
    nadi: "Antya",
    element: "Ether",
    padas: [
      { pada: 1, akshara: "दे", aksharaEnglish: "De", rashiIndex: 11, rashiName: "Meena (Pisces)", navamshaSign: "Sagittarius" },
      { pada: 2, akshara: "दो", aksharaEnglish: "Do", rashiIndex: 11, rashiName: "Meena (Pisces)", navamshaSign: "Capricorn" },
      { pada: 3, akshara: "चा", aksharaEnglish: "Cha", rashiIndex: 11, rashiName: "Meena (Pisces)", navamshaSign: "Aquarius" },
      { pada: 4, akshara: "ची", aksharaEnglish: "Chee", rashiIndex: 11, rashiName: "Meena (Pisces)", navamshaSign: "Pisces" },
    ]
  }
];

export const RASHI_NAMES_METADATA = [
  { index: 0, name: "Mesha", english: "Aries", lord: "Mars", element: "Fire", symbol: "Ram" },
  { index: 1, name: "Vrishabha", english: "Taurus", lord: "Venus", element: "Earth", symbol: "Bull" },
  { index: 2, name: "Mithuna", english: "Gemini", lord: "Mercury", element: "Air", symbol: "Twins" },
  { index: 3, name: "Karka", english: "Cancer", lord: "Moon", element: "Water", symbol: "Crab" },
  { index: 4, name: "Simha", english: "Leo", lord: "Sun", element: "Fire", symbol: "Lion" },
  { index: 5, name: "Kanya", english: "Virgo", lord: "Mercury", element: "Earth", symbol: "Maiden" },
  { index: 6, name: "Tula", english: "Libra", lord: "Venus", element: "Air", symbol: "Scales" },
  { index: 7, name: "Vrishchika", english: "Scorpio", lord: "Mars", element: "Water", symbol: "Scorpion" },
  { index: 8, name: "Dhanu", english: "Sagittarius", lord: "Jupiter", element: "Fire", symbol: "Archer" },
  { index: 9, name: "Makara", english: "Capricorn", lord: "Saturn", element: "Earth", symbol: "Sea-Goat" },
  { index: 10, name: "Kumbha", english: "Aquarius", lord: "Saturn", element: "Air", symbol: "Water Bearer" },
  { index: 11, name: "Meena", english: "Pisces", lord: "Jupiter", element: "Water", symbol: "Fishes" },
];
