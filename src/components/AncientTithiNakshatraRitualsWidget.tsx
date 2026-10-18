import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UserProfile } from "../types";
import { 
  CityLocation, 
  GLOBAL_CITIES, 
  getAccurateLocationPanchang 
} from "../utils/vedicAstronomicalEngine";
import { 
  playCardHoverSound, 
  playCardFlipSound, 
  playSingingBowlChime 
} from "../utils/audioEffects";
import { 
  Flame, 
  Sparkles, 
  Sun, 
  Moon, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Compass, 
  BookOpen, 
  Volume2, 
  Copy, 
  Check, 
  ShieldCheck, 
  AlertTriangle, 
  Droplet, 
  Flower2, 
  Crown, 
  Award, 
  ChevronRight, 
  ChevronLeft,
  ChevronDown, 
  RotateCcw, 
  Layers, 
  Info,
  Calendar,
  Sparkle,
  ArrowRight,
  ListChecks,
  Play
} from "lucide-react";

interface AncientTithiNakshatraRitualsWidgetProps {
  userProfile?: UserProfile;
  selectedCity?: CityLocation;
  selectedDate?: string; // ISO date string YYYY-MM-DD
  onSelectDate?: (dateStr: string) => void;
  onSelectTab?: (tab: string) => void;
}

export interface RitualGuide {
  id: string;
  planetToAppease: "Sun" | "Moon" | "Mars" | "Mercury" | "Jupiter" | "Venus" | "Saturn" | "Rahu" | "Ketu";
  planetHindi: string;
  planetIconText: string;
  ritualName: string;
  ritualNameHindi: string;
  applicableTithis: string[];
  applicableNakshatras: string[];
  astrologicalPurpose: string;
  astrologicalPurposeHindi: string;
  bestTimeWindow: string;
  facingDirection: "East (पूर्व)" | "North (उत्तर)" | "North-East (ईशान)" | "West (पश्चिम)" | "South-East (आग्नेय)" | "South-West (नैऋत्य)" | "North-West (वायव्य)";
  samagriList: { item: string; itemHindi: string; qty: string }[];
  preparationSteps: string[];
  executionSteps: { stepNo: number; title: string; detail: string }[];
  vedicMantraSanskrit: string;
  vedicMantraTransliteration: string;
  mantraMeaning: string;
  recommendedJapaCount: number;
  dosAndDonts: { dos: string[]; donts: string[] };
}

const RITUAL_PHASES = [
  { id: "overview", number: 1, title: "Overview", labelHindi: "विवरण एवं समय", desc: "Muhurat & Direction", icon: Info },
  { id: "samagri", number: 2, title: "Samagri", labelHindi: "सामग्री चेकलिस्ट", desc: "Materials List", icon: Droplet },
  { id: "steps", number: 3, title: "Execution", labelHindi: "पूजा कर्मकांड", desc: "Step-by-Step Puja", icon: CheckCircle2 },
  { id: "mantra", number: 4, title: "Mantra Japa", labelHindi: "मन्त्र एवं जप", desc: "108 Mala Beads", icon: Volume2 },
  { id: "precautions", number: 5, title: "Completion", labelHindi: "नियम व सावधानियां", desc: "Do's & Don'ts", icon: ShieldCheck }
];

const ALL_RITUALS_DATA: RitualGuide[] = [
  {
    id: "surya_arghya_aditya",
    planetToAppease: "Sun",
    planetHindi: "सूर्य ग्रह (Surya)",
    planetIconText: "☀️",
    ritualName: "Aditya Arghya & Surya Namaskar Kalasha Vidhi",
    ritualNameHindi: "ताम्र कलश आदित्य अर्घ्य एवं मन्त्र जाप अनुष्ठान",
    applicableTithis: ["Saptami", "Dwitiya", "Ekadashi", "Purnima", "Pratipada"],
    applicableNakshatras: ["Krittika", "Uttara Phalguni", "Uttara Ashadha", "Rohini", "Pushya"],
    astrologicalPurpose: "Dissolves Pitru Dosha, grants immense confidence, government authority, eye health, and cures low vitality.",
    astrologicalPurposeHindi: "आत्मबल वृद्धि, पितृदोष निवारण, शासकीय कार्यों में सफलता एवं तेज-ओज प्राप्ति हेतु अचूक वैदिक विधान।",
    bestTimeWindow: "Sunrise window (within 45 minutes after Sunrise / Brahma Muhurat)",
    facingDirection: "East (पूर्व)",
    samagriList: [
      { item: "Pure Copper Vessel (Kalasha)", itemHindi: "शुद्ध तांबे का लोटा", qty: "1 Unit" },
      { item: "Red Sandalwood Powder (Rakta Chandan)", itemHindi: "लाल चंदन चूर्ण", qty: "1 Pinch" },
      { item: "Red Kaner or Hibiscus Flowers", itemHindi: "लाल कनेर या गुड़हल के पुष्प", qty: "3 Flowers" },
      { item: "Akshata (Unbroken Rice grains with Kumkum)", itemHindi: "अक्षत (रोली में रंगे साबुत चावल)", qty: "1 Teaspoon" },
      { item: "Clean Drinking Water + Gangajal", itemHindi: "शुद्ध जल एवं गंगाजल", qty: "Full Vessel" },
      { item: "Kusha Grass or Wooden Asana", itemHindi: "कुशा का आसन या काष्ठ चौकी", qty: "1 Asana" }
    ],
    preparationSteps: [
      "Wake up during Brahma Muhurat (around 4:30 AM - 5:30 AM) and complete morning bath with a few drops of Gangajal.",
      "Wear clean, unstitched or loose cotton clothes of Red, Orange, or Saffron color.",
      "Fill the Copper Kalasha with pure water, add Gangajal, 1 pinch Red Chandan, Akshata, and 3 red flowers.",
      "Place a wooden platform or Kusha mat on the balcony/terrace facing directly towards the rising Sun."
    ],
    executionSteps: [
      {
        stepNo: 1,
        title: "Achamana & Sankalpa (आचमन एवं संकल्प)",
        detail: "Take water in right palm 3 times, swallow while chanting 'Om Keshavaya Namah, Om Narayanaya Namah, Om Madhavaya Namah'. Declare your Name, Gotra, and wish for solar blessings."
      },
      {
        stepNo: 2,
        title: "Arghya Arpan (ताम्र पात्र से अर्घ्य समर्पण)",
        detail: "Raise the copper Kalasha above forehead level with both hands. Slowly pour water in a continuous thin stream so the sunlight refracts through the falling water stream. Look at Sun rays through the water stream without blinking."
      },
      {
        stepNo: 3,
        title: "Navagraha Pradakshina (परिक्रमा एवं भूमि स्पर्श)",
        detail: "Offer water at the base of a Tulsi plant or clean container (never under feet). Rotate clockwise 3 times on the spot chanting 'Om Ghrini Suryaya Namah'."
      },
      {
        stepNo: 4,
        title: "Aditya Hrudaya Stotra Chanting (आदित्य हृदय स्तोत्र पाठ)",
        detail: "Sit on Kusha mat and recite Aditya Hrudaya Stotra or 108 chants of Surya Beej Mantra with Sphatika or Rudraksha Mala."
      }
    ],
    vedicMantraSanskrit: "ॐ घृणिः सूर्य आदित्यो मन्त्रः॥ ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः॥",
    vedicMantraTransliteration: "Om Ghrinih Surya Adityah Mantra | Om Hraam Hreem Hroum Sah Suryaya Namah ||",
    mantraMeaning: "Salutations to the Supreme Radiant Sun Lord who illuminates the Cosmos and bestows health, vitality, and royal success.",
    recommendedJapaCount: 108,
    dosAndDonts: {
      dos: [
        "Ensure water stream falls into a vessel or green plant, never directly under feet.",
        "Perform between 6:00 AM and 7:30 AM for maximum prana absorption.",
        "Maintain eye contact with the light refracting through water."
      ],
      donts: [
        "Do not consume salt or non-vegetarian food before performing Arghya.",
        "Never use plastic or iron vessels for offering Arghya."
      ]
    }
  },
  {
    id: "chandra_soma_kalasha",
    planetToAppease: "Moon",
    planetHindi: "चंद्र ग्रह (Moon)",
    planetIconText: "🌙",
    ritualName: "Soma Kalasha & Silver Moon Arghya Vidhi",
    ritualNameHindi: "सोम कलाश अर्घ्य एवं चन्द्रमौलेश्वर मानसिक शांति पूजन",
    applicableTithis: ["Purnima", "Dwitiya", "Tritiya", "Ekadashi", "Dashami"],
    applicableNakshatras: ["Rohini", "Hasta", "Shravana", "Pushya", "Mrigashira"],
    astrologicalPurpose: "Calms severe anxiety, depression, Chandra-Rahu Dosh (Grahan Dosh), restores emotional stability and maternal blessings.",
    astrologicalPurposeHindi: "मानसिक तनाव, अनिद्रा, चंद्र-राहू ग्रहण दोष शांति एवं मन में असीम शांति व एकाग्रता स्थापना हेतु विधान।",
    bestTimeWindow: "Moonrise / Night time after 8:30 PM under open moonlight",
    facingDirection: "North-East (ईशान)",
    samagriList: [
      { item: "Silver or Brass Vessel", itemHindi: "चांदी या पीतल का लोटा", qty: "1 Vessel" },
      { item: "Unboiled Cow Milk", itemHindi: "कच्चा गाय का दूध", qty: "100 ml" },
      { item: "White Chandan Paste", itemHindi: "सफेद चंदन", qty: "1 Spoon" },
      { item: "White Sweet Flowers (Jasmine / White Rose)", itemHindi: "सफेद मोगरा या गुलाब पुष्प", qty: "5 Flowers" },
      { item: "Mishri (Rock Sugar) & Panchamrit", itemHindi: "मिश्री एवं पञ्चामृत", qty: "50 grams" },
      { item: "Pearl or Sphatika Mala", itemHindi: "मोती या स्फटिक की माला", qty: "1 Mala" }
    ],
    preparationSteps: [
      "Take evening bath after sunset and wear fresh White or Cream-colored clothes.",
      "Mix 100ml raw milk with pure Gangajal, white Chandan, and 5 white Jasmine flowers in a silver vessel.",
      "Go to open terrace, balcony, or courtyard where moonlight falls directly."
    ],
    executionSteps: [
      {
        stepNo: 1,
        title: "Chandra Darshana & Arghya (चन्द्र दर्शन एवं दुग्धाभिषेक)",
        detail: "Gaze at the radiant Moon for 2 minutes without strain. Slowly offer the milk-water Arghya to Moon God while chanting 'Om Som Somaya Namah'."
      },
      {
        stepNo: 2,
        title: "Chandramani / Pearl Charging (मोती/स्फटिक जल शोधन)",
        detail: "Place a silver coin or Pearl gemstone in a cup of milk under direct moonlight for 1 hour to absorb Soma rays."
      },
      {
        stepNo: 3,
        title: "Someshvara Shiva Japa (सोमेश्वर शिव ध्यान)",
        detail: "Sit facing North-East and recite Chandra Beej Mantra 108 times with Sphatika Mala. Consume a piece of Mishri as Prasadam."
      }
    ],
    vedicMantraSanskrit: "ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः॥ ॐ नमः शिवाय॥",
    vedicMantraTransliteration: "Om Shraam Shreem Shroum Sah Chandramase Namah || Om Namah Shivaya ||",
    mantraMeaning: "Om, salutations to the Gentle Cooling Nectar of the Moon Lord who governs the mind, tides, and emotional bliss.",
    recommendedJapaCount: 108,
    dosAndDonts: {
      dos: [
        "Perform under clear night sky facing North-East.",
        "Drink a silver cup of water stored overnight under moonlight next morning."
      ],
      donts: [
        "Avoid heavy dark clothes or arguments during night time.",
        "Do not offer water in iron or plastic containers."
      ]
    }
  },
  {
    id: "mangala_bhasma_vermilion",
    planetToAppease: "Mars",
    planetHindi: "मंगल ग्रह (Mars)",
    planetIconText: "♂️",
    ritualName: "Angaraka Bhasma & Red Sindoor Hanuman Archana",
    ritualNameHindi: "अंगारक भूमिपुत्र मंगल शान्ति एवं श्री हनुमान सिन्दूर पूजा",
    applicableTithis: ["Chaturthi", "Navami", "Chaturdashi", "Pratipada"],
    applicableNakshatras: ["Chitra", "Dhanishta", "Mrigashira", "Krittika"],
    astrologicalPurpose: "Cures Manglik Dosha, property disputes, blood disorders, anger outbursts, and debt traps (Rina Vimochana).",
    astrologicalPurposeHindi: "मांगलिक दोष शमन, ऋण मुक्ति, भूमि-भवन लाभ एवं क्रोधाग्नि व रक्तविकार शांति हेतु अमोघ तंत्र।",
    bestTimeWindow: "Tuesday Morning or Sunset Sandhya Kaal",
    facingDirection: "South-East (आग्नेय)",
    samagriList: [
      { item: "Orange Chameli Oil (Jasmine oil)", itemHindi: "चमेली का तेल", qty: "50 ml" },
      { item: "Orange Sindoor (Vermilion)", itemHindi: "ऑरेंज/सिंदूर", qty: "2 Tablespoons" },
      { item: "Red Masoor Dal (Lentils)", itemHindi: "लाल मसूर दाल", qty: "250 grams" },
      { item: "Jaggery (Gud) & Roasted Chana", itemHindi: "गुड़ एवं भुना चना", qty: "100 grams" },
      { item: "Red Kaner or Rose Flowers", itemHindi: "लाल पुष्प", qty: "11 Flowers" }
    ],
    preparationSteps: [
      "Perform morning bath and wear clean Red or Yellow clothes.",
      "Mix Orange Sindoor with Chameli Oil to make a smooth paste.",
      "Clean a wooden altar facing South-East and place an image of Lord Hanuman or Mangal Yantra."
    ],
    executionSteps: [
      {
        stepNo: 1,
        title: "Chola Arpan to Bajrangbali (हनुमान जी को सिंदूर चोला अर्पण)",
        detail: "Offer Sindoor paste to Lord Hanuman's feet or image while chanting 'Om Rina Vimochanaka Mangalaya Namah'."
      },
      {
        stepNo: 2,
        title: "Red Masoor Dal Sankalpa (लाल मसूर दाल का संकल्प)",
        detail: "Touch 250g Red Masoor Dal with right hand, state gotra, and vow to donate it to a temple or needy laborer for debt elimination."
      },
      {
        stepNo: 3,
        title: "Hanuman Chalisa & Mangal Stotra (हनुमान चालीसा एवं अंगारक स्तोत्र)",
        detail: "Chant Hanuman Chalisa 7 times continuously followed by 108 chants of Mangal Beej Mantra."
      }
    ],
    vedicMantraSanskrit: "ॐ क्रां क्रीं क्रौं सः भौमाय नमः॥ ॐ ऋणमोचक मङ्गलाय नमः॥",
    vedicMantraTransliteration: "Om Kraam Kreem Kroum Sah Bhoumaya Namah || Om Rina Mochaka Mangalaya Namah ||",
    mantraMeaning: "Salutations to the Valorous Son of Earth (Mars) who liberates devotees from debts, fears, and internal conflicts.",
    recommendedJapaCount: 108,
    dosAndDonts: {
      dos: [
        "Offer Gud (jaggery) and Chana to monkeys or cows after completion.",
        "Recite Hanuman Chalisa with full devotion."
      ],
      donts: [
        "Avoid cutting nails, hair, or consuming non-veg/alcohol on Tuesday.",
        "Do not lend or borrow money on Tuesdays."
      ]
    }
  },
  {
    id: "budha_tulsi_emerald_archana",
    planetToAppease: "Mercury",
    planetHindi: "बुध ग्रह (Mercury)",
    planetIconText: "☿",
    ritualName: "Budha Tulsi Archana & Moong Dal Samarpana",
    ritualNameHindi: "बुधग्रह शांति, तुलसी दल अर्पण एवं हरा मूंग दान विधान",
    applicableTithis: ["Tritiya", "Ashtami", "Ekadashi", "Dwadashi"],
    applicableNakshatras: ["Ashlesha", "Jyeshtha", "Revati", "Rohini", "Hasta"],
    astrologicalPurpose: "Improves speech impediment, intellect, business accounting, skin allergies, and neutralizes Budha-Aditya or Budha-Rahu afflictions.",
    astrologicalPurposeHindi: "बुद्धि विकास, व्यापार वृद्धि, वाक् सिद्धि, त्वचा विकार मुक्ति एवं गणित-लेखा सफलता हेतु सिद्ध विधान।",
    bestTimeWindow: "Wednesday Morning (7:30 AM - 9:00 AM)",
    facingDirection: "North (उत्तर)",
    samagriList: [
      { item: "Whole Green Moong Dal", itemHindi: "साबुत हरा मूंग", qty: "250 grams" },
      { item: "Fresh Tulsi Leaves & Durva Grass", itemHindi: "तुलसी पत्र एवं दूर्वा घास", qty: "21 Leaves / Grass" },
      { item: "Green Cloth / Hanky", itemHindi: "हरा सूती वस्त्र", qty: "1 Piece" },
      { item: "Pure Cow Ghee Lamp", itemHindi: "गाय के घी का दीपक", qty: "1 Lamp" },
      { item: "Cardamom (Elaichi)", itemHindi: "हरी इलायची", qty: "5 Pods" }
    ],
    preparationSteps: [
      "Soak 250g Whole Green Moong Dal in water overnight on Tuesday.",
      "Wear clean Green or Pistachio colored clothes on Wednesday morning.",
      "Light a Ghee lamp in front of Lord Vishnu or Sri Ganesha image facing North."
    ],
    executionSteps: [
      {
        stepNo: 1,
        title: "Durva & Elaichi Offering (श्री गणेशाय दूर्वा व इलायची अर्पण)",
        detail: "Offer 21 Durva grass shoots and 5 green cardamoms to Lord Ganesha while chanting 'Om Gam Ganapataye Namah'."
      },
      {
        stepNo: 2,
        title: "Tulsi Archana for Budha (विष्णुजी/बुध देव को तुलसी समर्पण)",
        detail: "Offer Tulsi leaves dipped in Chandan paste at Vishnu's feet chanting Budha Beej Mantra 108 times."
      },
      {
        stepNo: 3,
        title: "Moong Dal Cow Service (हरे मूंग का गौ-सेवा समर्पण)",
        detail: "Feed the soaked green moong dal along with green fodder to a Desi Cow."
      }
    ],
    vedicMantraSanskrit: "ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः॥ ॐ सौम्याय नमः॥",
    vedicMantraTransliteration: "Om Braam Breem Broum Sah Budhaya Namah || Om Saumyaya Namah ||",
    mantraMeaning: "Salutations to Mercury, the gentle, intelligent messenger planet who grants cosmic wisdom, articulate speech, and commercial success.",
    recommendedJapaCount: 108,
    dosAndDonts: {
      dos: [
        "Keep a small green plant or Tulsi in North direction of home.",
        "Respect sisters, daughters, and aunts."
      ],
      donts: [
        "Do not speak harshly or tell lies on Wednesday.",
        "Avoid tearing or disrespecting books and account ledgers."
      ]
    }
  },
  {
    id: "guru_brihaspati_chana_archana",
    planetToAppease: "Jupiter",
    planetHindi: "गुरु ग्रह (Jupiter)",
    planetIconText: "♃",
    ritualName: "Brihaspati Chana Dal & Kesar Haldi Abhishekam",
    ritualNameHindi: "बृहस्पति देव पीत पूजा, केसर चंदन एवं चना दाल अर्पण तंत्र",
    applicableTithis: ["Panchami", "Ekadashi", "Purnima", "Trayodashi"],
    applicableNakshatras: ["Punarvasu", "Vishakha", "Purva Bhadrapada", "Pushya"],
    astrologicalPurpose: "Resolves marriage delays, lack of spiritual guide/guru, liver issues, academic failure, and financial stagnation.",
    astrologicalPurposeHindi: "विवाह बाधा मुक्ति, उच्च शिक्षा सफलता, देवकृपा एवं धन वृद्धि हेतु अमोघ गुरु ग्रह शांति विधान।",
    bestTimeWindow: "Thursday Morning during Brahma Muhurat or Abhijit Muhurat",
    facingDirection: "North-East (ईशान)",
    samagriList: [
      { item: "Yellow Chana Dal (Bengal Gram)", itemHindi: "चने की दाल", qty: "250 grams" },
      { item: "Turmeric Powder (Haldi)", itemHindi: "हल्दी गांठ या चूर्ण", qty: "2 Tablespoons" },
      { item: "Kesar (Saffron) Paste", itemHindi: "केसर-चंदन तिलक", qty: "1 Pinch" },
      { item: "Yellow Champa or Marigold Flowers", itemHindi: "पीले गेंदे के फूल", qty: "11 Flowers" },
      { item: "Yellow Sweets (Besan Ladoo / Peda)", itemHindi: "बेसन के लड्डू", qty: "4 Pieces" }
    ],
    preparationSteps: [
      "Wake up early, complete morning bath adding a pinch of Turmeric powder to bathing water.",
      "Wear bright Yellow clothes.",
      "Prepare a Tilak paste mixing Saffron (Kesar), Turmeric, and Ganga water."
    ],
    executionSteps: [
      {
        stepNo: 1,
        title: "Kesar Tilak to Peepal / Vishnu (केसर तिलक एवं जल अर्पण)",
        detail: "Apply Kesar Tilak to Lord Vishnu idol or Peepal tree trunk. Offer water mixed with turmeric at the roots."
      },
      {
        stepNo: 2,
        title: "Chana Dal & Gud Offering (चना दाल व गुड़ समर्पण)",
        detail: "Place 250g Chana Dal, Jaggery, and 4 Besan Ladoos near Peepal tree or Vishnu altar."
      },
      {
        stepNo: 3,
        title: "Brihaspati Stotra & Beej Japa (बृहस्पति स्तोत्र एवं मन्त्र जाप)",
        detail: "Sit on yellow cloth mat facing North-East. Chant Guru Beej Mantra 108 times with Haldi or Rudraksha Mala."
      }
    ],
    vedicMantraSanskrit: "ॐ ग्रां ग्रीं ग्रौं सः गुरुवे नमः॥ ॐ बृं बृहस्पतये नमः॥",
    vedicMantraTransliteration: "Om Graam Greem Groum Sah Gurave Namah || Om Brim Brihaspataye Namah ||",
    mantraMeaning: "Salutations to Brihaspati, the revered Preceptor of Gods, bestower of higher divine knowledge, prosperity, and righteous living.",
    recommendedJapaCount: 108,
    dosAndDonts: {
      dos: [
        "Apply Kesar or Turmeric Tilak on forehead and throat daily.",
        "Donate yellow books or stationary to young students."
      ],
      donts: [
        "Do not wash hair, use soap, or cut nails on Thursdays.",
        "Never disrespect teachers, elders, or priests."
      ]
    }
  },
  {
    id: "shukra_kanakadhara_kumkuma",
    planetToAppease: "Venus",
    planetHindi: "शुक्र ग्रह (Venus)",
    planetIconText: "♀",
    ritualName: "Kanakadhara Stotra & Kumkuma Mahalakshmi Archana",
    ritualNameHindi: "श्री कनकधारा स्तोत्र एवं कुंकुम अर्चना (शुक्र व ऐश्वर्य जागृति)",
    applicableTithis: ["Shashthi", "Trayodashi", "Purnima", "Dwitiya"],
    applicableNakshatras: ["Bharani", "Purva Phalguni", "Purva Ashadha", "Rohini"],
    astrologicalPurpose: "Awakens extreme luxury, artistic talent, marital harmony, vehicular comfort, and cures Venus-Ketu/Venus-Sun afflictions.",
    astrologicalPurposeHindi: "लक्ष्मी कृपा, दाम्पत्य मधुरता, वाहन-भवन सुख एवं आकर्षण व सौंदर्य वृद्धि हेतु सिद्ध अनुष्ठान।",
    bestTimeWindow: "Friday Evening (Godhuli Vela / Twilight)",
    facingDirection: "North (उत्तर)",
    samagriList: [
      { item: "Red Kumkum Powder", itemHindi: "शुद्ध कुंकुम/रोली", qty: "100 grams" },
      { item: "White Lotus Flowers or White Roses", itemHindi: "सफेद कमल या गुलाब", qty: "5 Flowers" },
      { item: "Ghee Lamp with Cotton Wick", itemHindi: "गाय के घी का चौमुखी दीपक", qty: "1 Lamp" },
      { item: "Kamal Gatta (Lotus seeds)", itemHindi: "कमलगट्टे के बीज", qty: "11 Seeds" },
      { item: "Kheer (Rice Milk Pudding)", itemHindi: "चावल-दूध की खीर", qty: "1 Bowl" }
    ],
    preparationSteps: [
      "Take evening bath, wear pristine White, Cream, or Pink attire.",
      "Clean Mahalakshmi or Shukra Yantra idol with Gangajal and Panchamrit.",
      "Light a Ghee lamp in North direction."
    ],
    executionSteps: [
      {
        stepNo: 1,
        title: "Kumkuma Archana (श्री महालक्ष्मी कुंकुम अर्चना)",
        detail: "Take a pinch of Kumkum for each chant of 'Om Shreem Hreem Shreem Kamale Kamalalaye Praseeda' and offer at Mahalakshmi's feet (108 pinches)."
      },
      {
        stepNo: 2,
        title: "Kanakadhara Stotra Path (कनकधारा स्तोत्र पाठ)",
        detail: "Recite Sri Kanakadhara Stotra authored by Adi Shankaracharya with full devotion."
      },
      {
        stepNo: 3,
        title: "Kheer Bhog & Kanya Pujan (खीर भोग एवं कन्या अर्पण)",
        detail: "Offer fresh Kheer as Prasadam to Goddess Mahalakshmi and serve small portion to young girls (Kanya) or family members."
      }
    ],
    vedicMantraSanskrit: "ॐ ड्रां ड्रीं ड्रौं सः शुक्राय नमः॥ ॐ श्रीं ह्रीं क्लीं महालक्ष्म्यै नमः॥",
    vedicMantraTransliteration: "Om Draam Dreem Droum Sah Shukraya Namah || Om Shreem Hreem Kleem Mahalakshmyai Namah ||",
    mantraMeaning: "Salutations to Venus and Goddess Mahalakshmi, bestower of opulence, fine arts, eternal grace, and refined relationships.",
    recommendedJapaCount: 108,
    dosAndDonts: {
      dos: [
        "Keep your home living room fragrant using natural sandalwood/camphor incense.",
        "Respect women and foster harmony."
      ],
      donts: [
        "Do not wear torn, unwashed, or shabby clothes.",
        "Avoid hoarding broken mirrors or glass items."
      ]
    }
  },
  {
    id: "shani_shami_til_deepa",
    planetToAppease: "Saturn",
    planetHindi: "शनि ग्रह (Saturn)",
    planetIconText: "🪐",
    ritualName: "Shani Shami Patra & Mustard Oil Lamp Shanti",
    ritualNameHindi: "शनिदेव शमी पत्र, सरसों तेल दीपक एवं तिल-लोहा शान्ति विधान",
    applicableTithis: ["Amavasya", "Shashthi", "Trayodashi", "Chaturdashi"],
    applicableNakshatras: ["Pushya", "Anuradha", "Uttara Bhadrapada", "Swati", "Shatabhisha"],
    astrologicalPurpose: "Instantly relieves severity of Saturn Sade Sati, Dhaiya, Kantaka Shani, chronic delays, bone pain, and career stagnation.",
    astrologicalPurposeHindi: "शनि साढ़ेसाती, ढैया, कार्य-बाधा, अकाल-भय एवं कर्मजन्य कष्टों की त्वरित शांति हेतु अमोघ सिद्ध प्रयोग।",
    bestTimeWindow: "Saturday Evening after Sunset (Sandhya Kaal)",
    facingDirection: "West (पश्चिम)",
    samagriList: [
      { item: "Mustard Oil (Sarson ka Tel)", itemHindi: "शुद्ध सरसों का तेल", qty: "200 ml" },
      { item: "Black Sesame Seeds (Kala Til)", itemHindi: "काले तिल", qty: "50 grams" },
      { item: "Shami Tree Leaves", itemHindi: "शमी पत्र", qty: "11 Leaves" },
      { item: "Iron Nail or Ring", itemHindi: "लोहे की कील या छल्ला", qty: "1 Unit" },
      { item: "Black Umbrella or Shoes for Donation", itemHindi: "काला छाता/चप्पल (दान हेतु)", qty: "1 Pair" }
    ],
    preparationSteps: [
      "Take bath after sunset on Saturday evening and wear Dark Blue, Grey, or Black clean clothes.",
      "Pour mustard oil into an iron bowl or earthen diya and add 1 teaspoon Black Sesame seeds and an iron nail.",
      "Gaze at your reflection in the mustard oil (Chhaya Daan)."
    ],
    executionSteps: [
      {
        stepNo: 1,
        title: "Chhaya Daan (छाया दान तंत्र)",
        detail: "Look closely at your face reflection in the mustard oil for 1 minute, praying for release from karmic sins."
      },
      {
        stepNo: 2,
        title: "Peepal / Shami Tree Lamp Lighting (पीपल/शमी वृक्ष तल दीपक प्रज्वलन)",
        detail: "Take the oil diya to a nearby Peepal or Shami tree. Light it facing West under the tree. Place 11 Shami leaves near the base."
      },
      {
        stepNo: 3,
        title: "Shani Chalisa & Beej Mantra (शनि चालीसा व बीज जाप)",
        detail: "Recite Shani Chalisa standing under the Peepal tree, then chant 'Om Sham Shanaishcharaya Namah' 108 times."
      }
    ],
    vedicMantraSanskrit: "ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः॥ ॐ शं शनैश्चराय नमः॥",
    vedicMantraTransliteration: "Om Praam Preem Proum Sah Shanaishcharaya Namah || Om Sham Shanaishcharaya Namah ||",
    mantraMeaning: "Salutations to Lord Shani (Saturn), the divine cosmic dispenser of justice who grants humility, perseverance, and liberation from past karmas.",
    recommendedJapaCount: 108,
    dosAndDonts: {
      dos: [
        "Donate the mustard oil bowl or footwear to poor labor workers after sunset.",
        "Serve black dogs and street animals regularly."
      ],
      donts: [
        "Do not look directly into Shani Dev idol eyes in temples (look at feet).",
        "Never buy mustard oil, iron, or leather on Saturdays."
      ]
    }
  },
  {
    id: "rahu_kushmanda_kalsarp_shanti",
    planetToAppease: "Rahu",
    planetHindi: "राहु ग्रह (Rahu)",
    planetIconText: "🐍",
    ritualName: "Rahu Milk Abhishekam & Kushmanda Daan",
    ritualNameHindi: "राहु दोष शान्ति, शिव दुग्धाभिषेक एवं पेठा (कुष्मांड) दान",
    applicableTithis: ["Ashtami", "Chaturthi", "Amavasya", "Navami"],
    applicableNakshatras: ["Ardra", "Swati", "Shatabhisha", "Ashlesha"],
    astrologicalPurpose: "Removes illusion, addiction, sudden financial losses, Kalsarp Yoga, fear of ghosts, and Rahu Mahadasha turmoil.",
    astrologicalPurposeHindi: "कालसर्प दोष, भ्रम, अचानक आर्थिक हानि, दुःस्वप्न एवं राहू महादशा शांति हेतु अति प्रभावशाली अनुष्ठान।",
    bestTimeWindow: "Saturday or Wednesday Night (After 8:00 PM)",
    facingDirection: "South-West (नैऋत्य)",
    samagriList: [
      { item: "Raw Milk mixed with Black Sesame", itemHindi: "काले तिल मिला कच्चा दूध", qty: "500 ml" },
      { item: "Ash Gourd (Petha / Kushmanda)", itemHindi: "हरा/सफेद पेठा फल", qty: "1 Whole Fruit" },
      { item: "Blue or Black Cloth", itemHindi: "नीला या काला वस्त्र", qty: "1 Meter" },
      { item: "Lead / Silver Serpent Pair", itemHindi: "नाग युग्म", qty: "1 Pair" },
      { item: "Durva Grass", itemHindi: "दूर्वा घास", qty: "11 Shoots" }
    ],
    preparationSteps: [
      "Perform evening bath and wear Blue or Charcoal colored clothes.",
      "Mix raw milk with 1 spoon black sesame seeds and Ganga water.",
      "Keep 1 whole Ash Gourd (Kushmanda) wrapped in blue cloth."
    ],
    executionSteps: [
      {
        stepNo: 1,
        title: "Shiva Rudra Jaladhara (शिवलिंग पर तिल-दूध जलाभिषेक)",
        detail: "Pour the milk-sesame mixture in a continuous stream over Shivalinga while chanting 'Om Bhram Bhreem Bhroum Sah Rahave Namah'."
      },
      {
        stepNo: 2,
        title: "Kushmanda Daan Sankalpa (कुष्मांड/पेठा दान संकल्प)",
        detail: "Touch the Ash Gourd fruit, declare your Gotra and vow to donate it to a Bhairava or Shiva temple priest."
      },
      {
        stepNo: 3,
        title: "Rahu Stotra & Durga Kavach (दुर्गा कवच पाठ)",
        detail: "Recite Rahu Kavacham or Sri Durga Saptashati 4th chapter to create a protective aura."
      }
    ],
    vedicMantraSanskrit: "ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः॥ ॐ रां राहवे नमः॥",
    vedicMantraTransliteration: "Om Bhraam Bhreem Bhroum Sah Rahave Namah || Om Raam Rahave Namah ||",
    mantraMeaning: "Salutations to Rahu, the mystical north node of the Moon, requesting transmuted wisdom, worldly protection, and spiritual awakening.",
    recommendedJapaCount: 108,
    dosAndDonts: {
      dos: [
        "Keep your home drainage pipes and toilet areas immaculately clean.",
        "Chant 'Om Namah Shivaya' regularly."
      ],
      donts: [
        "Do not keep clutter, electronic waste, or non-working clocks at home.",
        "Avoid gambling, dark streets, and intoxicating substances."
      ]
    }
  },
  {
    id: "ketu_ganesha_durva_homam",
    planetToAppease: "Ketu",
    planetHindi: "केतु ग्रह (Ketu)",
    planetIconText: "🚩",
    ritualName: "Ketu Ganesha Durva Archana & Flag Hoisting",
    ritualNameHindi: "केतु ग्रह शान्ति, श्री गणेश दूर्वा होम एवं ध्वजारोहण विधान",
    applicableTithis: ["Chaturdashi", "Ganesh Chaturthi", "Dwitiya", "Ashtami"],
    applicableNakshatras: ["Ashwini", "Magha", "Mula", "Revati"],
    astrologicalPurpose: "Neutralizes mysterious illnesses, skin eruptions, spiritual detachment, Ketu Mahadasha suffering, and grants Moksha & intuition.",
    astrologicalPurposeHindi: "अज्ञात बीमारी, तंत्र बाधा, केतु महादशा कष्ट निवारण एवं मोक्ष व तीव्र अंतर्ज्ञान प्राप्ति हेतु सिद्ध विधान।",
    bestTimeWindow: "Tuesday or Sunday Morning during Sunrise",
    facingDirection: "North-East (ईशान)",
    samagriList: [
      { item: "Durva Grass (21 Clusters)", itemHindi: "दूर्वा घास (21 की गांठे)", qty: "21 Clusters" },
      { item: "Tri-Color Triangular Flag (Dhvaja)", itemHindi: "त्रिकोणीय पंचरंगी/त्रिरंगी ध्वज", qty: "1 Flag" },
      { item: "Two-Color Sesame Seeds (Til)", itemHindi: "द्विरंगी/चितकबरे तिल", qty: "100 grams" },
      { item: "Blanket (Kambal) for Donation", itemHindi: "चितकबरा या काला-सफेद कम्बल", qty: "1 Piece" },
      { item: "Jaggery (Gud) Sweets", itemHindi: "गुड़ का मोदक/मिष्ठान", qty: "5 Pieces" }
    ],
    preparationSteps: [
      "Take morning bath, wear light Saffron or Two-toned clean clothes.",
      "Prepare 21 clusters of fresh green Durva grass tying with yellow thread.",
      "Clean Lord Ganesha idol and place it on a brass plate."
    ],
    executionSteps: [
      {
        stepNo: 1,
        title: "21 Durva Archana to Ganesha (21 दूर्वा युग्म अर्पण)",
        detail: "Offer 21 Durva clusters one by one to Lord Ganesha's head while reciting 21 names of Sri Ganesha."
      },
      {
        stepNo: 2,
        title: "Temple Flag Hoisting (मंदिर शिखरों पर ध्वजारोहण)",
        detail: "Offer a triangular flag at a nearby Ganesha or Hanuman temple rooftop or spire for high status and spiritual victory."
      },
      {
        stepNo: 3,
        title: "Ketu Beej Mantra & Blanket Daan (केतु मन्त्र जाप व कम्बल दान)",
        detail: "Chant Ketu Beej Mantra 108 times with Rudraksha Mala. Donate a black & white check blanket to an ascetic or elderly person."
      }
    ],
    vedicMantraSanskrit: "ॐ स्रां स्रीं स्रौं सः केतवे नमः॥ ॐ गं गणपतये नमः॥",
    vedicMantraTransliteration: "Om Sraam Sreem Sroum Sah Ketave Namah || Om Gam Ganapataye Namah ||",
    mantraMeaning: "Salutations to Ketu, the shadow south node of liberation, bestowing keen spiritual perception, detachment from ego, and divine grace.",
    recommendedJapaCount: 108,
    dosAndDonts: {
      dos: [
        "Serve stray dogs with roti and milk.",
        "Keep a Ganesha idol or picture at the main entrance of your home."
      ],
      donts: [
        "Never harm or kick dogs or homeless animals.",
        "Do not disrespect spiritual gurus, monks, or sadhus."
      ]
    }
  }
];

export const AncientTithiNakshatraRitualsWidget: React.FC<AncientTithiNakshatraRitualsWidgetProps> = ({
  userProfile,
  selectedCity = GLOBAL_CITIES[0],
  selectedDate
}) => {
  const currentDateStr = selectedDate || new Date().toISOString().split("T")[0];
  
  // Calculate Panchang for selected date and location
  const currentPanchang = useMemo(() => {
    return getAccurateLocationPanchang(selectedCity?.name || "New Delhi", new Date(currentDateStr));
  }, [currentDateStr, selectedCity]);

  const [selectedPlanetFilter, setSelectedPlanetFilter] = useState<string>("ALL");
  const [activeRitualId, setActiveRitualId] = useState<string>("surya_arghya_aditya");
  const [checkedSamagri, setCheckedSamagri] = useState<Record<string, boolean>>({});
  const [japaCount, setJapaCount] = useState<number>(0);
  const [copiedMantra, setCopiedMantra] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"overview" | "samagri" | "steps" | "mantra" | "precautions">("overview");

  // Determine current active Tithi & Nakshatra recommended ritual
  const recommendedRitualForToday = useMemo(() => {
    const activeTithi = currentPanchang.tithi;
    const activeNakshatra = currentPanchang.nakshatra;

    // Search matching ritual
    const match = ALL_RITUALS_DATA.find(r => 
      r.applicableTithis.some(t => activeTithi.toLowerCase().includes(t.toLowerCase())) ||
      r.applicableNakshatras.some(n => activeNakshatra.toLowerCase().includes(n.toLowerCase()))
    );

    return match || ALL_RITUALS_DATA[0];
  }, [currentPanchang]);

  // Filtered rituals list
  const filteredRituals = useMemo(() => {
    if (selectedPlanetFilter === "ALL") return ALL_RITUALS_DATA;
    return ALL_RITUALS_DATA.filter(r => r.planetToAppease.toLowerCase() === selectedPlanetFilter.toLowerCase());
  }, [selectedPlanetFilter]);

  const activeRitual = ALL_RITUALS_DATA.find(r => r.id === activeRitualId) || recommendedRitualForToday;

  const toggleSamagriCheck = (itemKey: string) => {
    setCheckedSamagri(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

  const resetSamagriChecklist = () => {
    setCheckedSamagri({});
  };

  const handleCopyMantra = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMantra(true);
    setTimeout(() => setCopiedMantra(false), 2000);
  };

  const incrementJapa = () => {
    if (japaCount < activeRitual.recommendedJapaCount) {
      setJapaCount(prev => prev + 1);
    } else {
      setJapaCount(0); // Reset
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1B1612] via-[#241D17] to-[#14100D] text-amber-100 rounded-3xl p-6 sm:p-8 border border-amber-500/40 shadow-2xl space-y-6 relative overflow-hidden">
      {/* Background Sacred Glow */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-amber-500/30 pb-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-bold uppercase tracking-widest mb-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            Ancient Sastra Tithi & Nakshatra Planetary Rituals
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 flex items-center gap-2.5">
            <span>ग्रह शान्ति एवं तिथि-नक्षत्र वैदिक अनुष्ठान मार्गदर्शिका</span>
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/80 mt-1 font-serif max-w-3xl leading-relaxed">
            Step-by-step ancient preparation guides, samagri checklists, and sacred mantras tailored to appease specific planets based on today's active Tithi (<strong>{currentPanchang.tithi}</strong>) and Nakshatra (<strong>{currentPanchang.nakshatra}</strong>).
          </p>
        </div>

        {/* ACTIVE PANCHANG SUMMARY BADGE */}
        <div className="bg-slate-950/90 border border-amber-500/40 p-4 rounded-2xl shadow-xl space-y-1.5 text-xs font-serif shrink-0">
          <div className="text-[10px] text-amber-400 uppercase font-bold tracking-wider flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Today's Panchang Alignment ({selectedCity.name}):
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-amber-100">
            <div>Tithi: <strong className="text-amber-300">{currentPanchang.tithi}</strong></div>
            <div>Nakshatra: <strong className="text-amber-300">{currentPanchang.nakshatra}</strong></div>
            <div>Moon Sign: <strong className="text-amber-300">{currentPanchang.moonSign}</strong></div>
            <div>Sun Sign: <strong className="text-amber-300">{currentPanchang.sunSign}</strong></div>
          </div>
        </div>
      </div>

      {/* TODAY'S ASTROLOGICAL HIGHLIGHT RECOMMENDATION BANNER */}
      <div className="bg-gradient-to-r from-amber-950/80 via-orange-950/60 to-amber-950/80 p-5 rounded-2xl border border-amber-500/50 shadow-xl relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Recommended Ritual for Today's Tithi ({currentPanchang.tithi}):</span>
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-amber-100 flex items-center gap-2">
            <span>{recommendedRitualForToday.planetIconText} {recommendedRitualForToday.ritualNameHindi}</span>
          </h3>
          <p className="text-xs text-amber-200/90 font-serif leading-snug">
            {recommendedRitualForToday.astrologicalPurposeHindi}
          </p>
        </div>

        <button
          onClick={() => setActiveRitualId(recommendedRitualForToday.id)}
          className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all cursor-pointer shadow-lg shrink-0 flex items-center gap-1.5"
        >
          <span>Open Full Guide & Samagri</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* PLANET FILTER BUTTONS */}
      <div className="space-y-2 relative z-10">
        <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
          Filter Rituals by Planet to Appease:
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "ALL", label: "✨ All Planets", icon: "✨" },
            { id: "Sun", label: "☀️ Surya (Sun)", icon: "☀️" },
            { id: "Moon", label: "🌙 Chandra (Moon)", icon: "🌙" },
            { id: "Mars", label: "♂️ Mangal (Mars)", icon: "♂️" },
            { id: "Mercury", label: "☿ Budha (Merc)", icon: "☿" },
            { id: "Jupiter", label: "♃ Guru (Jupiter)", icon: "♃" },
            { id: "Venus", label: "♀ Shukra (Venus)", icon: "♀" },
            { id: "Saturn", label: "🪐 Shani (Saturn)", icon: "🪐" },
            { id: "Rahu", label: "🐍 Rahu", icon: "🐍" },
            { id: "Ketu", label: "🚩 Ketu", icon: "🚩" }
          ].map((p) => {
            const isActive = selectedPlanetFilter === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPlanetFilter(p.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  isActive
                    ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md font-extrabold scale-105"
                    : "bg-slate-950/80 text-amber-200 border-slate-800 hover:border-amber-500/40"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN RITUAL CONTENT LAYOUT (LEFT LIST, RIGHT DETAILS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* LEFT COLUMN: RITUAL GUIDES LIST */}
        <div className="lg:col-span-4 space-y-2.5 max-h-[600px] overflow-y-auto no-scrollbar pr-1">
          {filteredRituals.map((r) => {
            const isSelected = activeRitual.id === r.id;
            return (
              <button
                key={r.id}
                onClick={() => {
                  setActiveRitualId(r.id);
                  setActiveTab("overview");
                }}
                className={`w-full p-4 rounded-2xl text-left transition-all border cursor-pointer relative overflow-hidden space-y-2 ${
                  isSelected
                    ? "bg-gradient-to-r from-amber-950/90 via-amber-900/60 to-[#1F1914] border-amber-500 text-amber-100 shadow-xl"
                    : "bg-[#14100D]/90 border-amber-900/30 text-amber-200/80 hover:bg-[#1A1511]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <span className="text-sm">{r.planetIconText}</span>
                    <span>{r.planetHindi}</span>
                  </span>
                  <span className="text-[10px] bg-slate-900 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded-full font-mono">
                    {r.facingDirection.split(" ")[0]}
                  </span>
                </div>

                <div className="font-serif font-bold text-sm text-amber-100 leading-snug">
                  {r.ritualNameHindi}
                </div>

                <div className="text-[11px] text-amber-200/70 line-clamp-2 font-serif">
                  {r.astrologicalPurpose}
                </div>

                <div className="text-[10px] text-amber-400/80 pt-1 border-t border-amber-900/40 flex items-center justify-between">
                  <span>Best: {r.bestTimeWindow.split(" ")[0]}</span>
                  <span className="font-bold flex items-center gap-0.5">
                    View Guide <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* RIGHT COLUMN: DETAILED STEP-BY-STEP PREPARATION & RITUAL WORKFLOW */}
        <div className="lg:col-span-8 bg-[#120F0D] p-6 sm:p-8 rounded-3xl border border-amber-500/40 space-y-6 shadow-2xl">
          {/* HEADER SUMMARY OF SELECTED RITUAL */}
          <div className="border-b border-amber-500/30 pb-5 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="text-base">{activeRitual.planetIconText}</span>
                <span>{activeRitual.planetHindi} Appeasement Ritual</span>
              </span>

              <div className="flex items-center gap-2 text-xs text-amber-300 font-mono">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>Direction: <strong className="text-amber-200">{activeRitual.facingDirection}</strong></span>
              </div>
            </div>

            <h3 className="font-serif text-2xl font-bold text-amber-100">
              {activeRitual.ritualNameHindi}
            </h3>
            <p className="text-xs sm:text-sm text-amber-200/90 font-serif leading-relaxed">
              {activeRitual.astrologicalPurposeHindi} ({activeRitual.astrologicalPurpose})
            </p>
          </div>

          {/* INNER NAVIGATION TABS (Overview, Samagri, Preparation & Steps, Mantra, Precautions) */}
          <div className="flex flex-wrap items-center gap-2 border-b border-amber-900/40 pb-3">
            {[
              { id: "overview", label: "📋 Overview", icon: Info },
              { id: "samagri", label: "🛒 Samagri Checklist", icon: Droplet },
              { id: "steps", label: "👣 Step-by-Step Guide", icon: CheckCircle2 },
              { id: "mantra", label: "📿 Mantra & Mala Japa", icon: Volume2 },
              { id: "precautions", label: "⚠️ Do's & Don'ts", icon: ShieldCheck }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                    isActive
                      ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md font-extrabold scale-105"
                      : "bg-slate-950/80 text-amber-200 border-slate-800 hover:border-amber-500/40"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: OVERVIEW & ASTROLOGICAL ALIGNMENT */}
          {activeTab === "overview" && (
            <div className="space-y-5 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-serif">
                <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Best Auspicious Time Window:
                  </span>
                  <p className="text-amber-100 font-medium">{activeRitual.bestTimeWindow}</p>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5" /> Facing Direction & Asana:
                  </span>
                  <p className="text-amber-100 font-medium">{activeRitual.facingDirection}</p>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Applicable Tithis:
                  </span>
                  <p className="text-amber-100">{activeRitual.applicableTithis?.join(", ") || "All Tithis"}</p>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Applicable Nakshatras:
                  </span>
                  <p className="text-amber-100">{activeRitual.applicableNakshatras?.join(", ") || "All Nakshatras"}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-2">
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Scriptural Benefit & Target Dosha Resolution:</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-100 font-serif leading-relaxed">
                  {activeRitual.astrologicalPurposeHindi}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setActiveTab("samagri")}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all cursor-pointer shadow-lg flex items-center gap-1.5"
                >
                  <span>Next: Check Required Samagri</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE SAMAGRI CHECKLIST */}
          {activeTab === "samagri" && (
            <div className="space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-300 uppercase tracking-wider">
                  Required Materials (पूजा सामग्री सूची):
                </span>
                <button
                  onClick={resetSamagriChecklist}
                  className="text-amber-400 hover:underline text-[11px] font-mono cursor-pointer"
                >
                  Reset Checklist
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(activeRitual?.samagriList || []).map((s, idx) => {
                  const key = `${activeRitual.id}_${idx}`;
                  const isChecked = !!checkedSamagri[key];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleSamagriCheck(key)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isChecked
                          ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-200"
                          : "bg-slate-950/80 border-slate-800 text-amber-100 hover:border-amber-500/30"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {isChecked ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                        )}
                        <div>
                          <div className={`font-serif font-bold text-xs ${isChecked ? "line-through text-emerald-300/70" : ""}`}>
                            {s.itemHindi} ({s.item})
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-amber-300 shrink-0">
                        {s.qty}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className="text-xs text-amber-300 font-bold hover:underline"
                >
                  ← Back to Overview
                </button>

                <button
                  onClick={() => setActiveTab("steps")}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all cursor-pointer shadow-lg flex items-center gap-1.5"
                >
                  <span>Next: View Step-by-Step Workflow</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: STEP-BY-STEP PREPARATION & EXECUTION WORKFLOW */}
          {activeTab === "steps" && (
            <div className="space-y-6 animate-in fade-in">
              {/* PREPARATION STEPS */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-sm text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Flower2 className="w-4 h-4 text-amber-400" />
                  <span>Pre-Ritual Preparation & Purification (पूर्व तैयारी):</span>
                </h4>
                <div className="space-y-2">
                  {(activeRitual?.preparationSteps || []).map((pStep, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-serif leading-relaxed text-amber-100/90 flex gap-2.5">
                      <span className="font-bold text-amber-400 shrink-0">Phase {idx + 1}:</span>
                      <span>{pStep}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* EXECUTION WORKFLOW STEPS */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-sm text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Step-by-Step Ritual Execution (मुख्य पूजा कर्मकांड विधान):</span>
                </h4>

                <div className="space-y-3">
                  {(activeRitual?.executionSteps || []).map((eStep) => (
                    <div
                      key={eStep.stepNo}
                      className="p-4 rounded-2xl bg-slate-950/90 border border-amber-500/30 space-y-1.5 shadow-md"
                    >
                      <div className="font-serif font-bold text-sm text-amber-200 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                          {eStep.stepNo}
                        </span>
                        <span>{eStep.title}</span>
                      </div>
                      <p className="text-xs text-amber-100/90 font-serif leading-relaxed pl-8">
                        {eStep.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setActiveTab("samagri")}
                  className="text-xs text-amber-300 font-bold hover:underline"
                >
                  ← Back to Samagri
                </button>

                <button
                  onClick={() => setActiveTab("mantra")}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all cursor-pointer shadow-lg flex items-center gap-1.5"
                >
                  <span>Next: Sacred Mantra & Mala Counter</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: SACRED MANTRA & INTERACTIVE JAPA MALA COUNTER */}
          {activeTab === "mantra" && (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-5 rounded-2xl bg-amber-950/50 border border-amber-500/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-amber-400" />
                    <span>Sacred Vedic Beej Mantra:</span>
                  </div>

                  <button
                    onClick={() => handleCopyMantra(activeRitual.vedicMantraSanskrit)}
                    className="p-1.5 bg-slate-900 border border-amber-500/30 rounded-lg text-amber-300 text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer flex items-center gap-1"
                  >
                    {copiedMantra ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedMantra ? "Copied!" : "Copy Mantra"}</span>
                  </button>
                </div>

                <div className="text-center p-4 rounded-xl bg-slate-950/90 border border-amber-500/30 space-y-2">
                  <div className="font-serif text-lg sm:text-2xl font-bold text-amber-200 leading-relaxed tracking-wide">
                    {activeRitual.vedicMantraSanskrit}
                  </div>
                  <div className="text-xs text-amber-300/80 italic font-mono">
                    {activeRitual.vedicMantraTransliteration}
                  </div>
                </div>

                <div className="text-xs text-amber-100/90 font-serif leading-relaxed italic bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <strong>Divine Meaning:</strong> {activeRitual.mantraMeaning}
                </div>
              </div>

              {/* INTERACTIVE 108 BEADS JAPA COUNTER */}
              <div className="p-5 rounded-2xl bg-slate-950/90 border border-amber-500/30 space-y-4 text-center">
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center justify-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>Interactive 108 Japa Bead Counter</span>
                </div>

                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="text-3xl font-mono font-extrabold text-amber-300">
                    {japaCount} / {activeRitual.recommendedJapaCount}
                  </div>
                  <div className="w-full max-w-md bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="bg-amber-500 h-full transition-all duration-200"
                      style={{ width: `${(japaCount / activeRitual.recommendedJapaCount) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={incrementJapa}
                    className="px-6 py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-all cursor-pointer shadow-lg active:scale-95 flex items-center gap-2"
                  >
                    <Flame className="w-4 h-4 text-slate-950" />
                    <span>Tap to Count 1 Japa Bead (+1)</span>
                  </button>

                  <button
                    onClick={() => setJapaCount(0)}
                    className="p-3 rounded-2xl bg-slate-900 text-amber-400 border border-slate-800 text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer"
                    title="Reset Counter"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setActiveTab("steps")}
                  className="text-xs text-amber-300 font-bold hover:underline"
                >
                  ← Back to Steps
                </button>

                <button
                  onClick={() => setActiveTab("precautions")}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all cursor-pointer shadow-lg flex items-center gap-1.5"
                >
                  <span>Next: View Precautions & Do's/Don'ts</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: PRECAUTIONS & DO'S AND DON'TS */}
          {activeTab === "precautions" && (
            <div className="space-y-6 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* DO'S */}
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
                  <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Essential Ritual Do's (पालन नियम):</span>
                  </div>
                  <ul className="space-y-2 text-xs text-emerald-100/90 font-serif">
                    {(activeRitual?.dosAndDonts?.dos || []).map((d, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* DON'TS */}
                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-3">
                  <div className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>Strict Ritual Don'ts (वर्जित नियम):</span>
                  </div>
                  <ul className="space-y-2 text-xs text-rose-100/90 font-serif">
                    {(activeRitual?.dosAndDonts?.donts || []).map((d, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-xs font-serif text-amber-200 leading-relaxed text-center">
                ✨ <strong>Vedic Wisdom:</strong> Performing rituals with pure Sankalpa, focused devotion, and truthfulness amplifies planetary appeasement manifold.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
