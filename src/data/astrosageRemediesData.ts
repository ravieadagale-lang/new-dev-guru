import { LanguageCode } from "../types";

export interface PlanetRemedy {
  planet: string;
  sanskritName: string;
  rulingDeity: string;
  beejMantra: {
    sanskrit: string;
    transliteration: string;
    count: string;
    bestTime: string;
  };
  gemstone: {
    primary: string;
    substitute: string;
    metal: string;
    finger: string;
    day: string;
    activationMantra: string;
  };
  donation: {
    items: string[];
    grains: string;
    clothColor: string;
    bestDay: string;
    recipient: string;
  };
  rudraksha: {
    mukhi: string;
    deity: string;
    wearingDay: string;
  };
  fastingVrat: {
    day: string;
    foodRules: string;
    deityWorship: string;
  };
  lalKitabRemedies: string[];
}

export const MASTER_PLANET_REMEDIES: Record<string, PlanetRemedy> = {
  Sun: {
    planet: "Sun",
    sanskritName: "Surya Dev (सूर्य देव)",
    rulingDeity: "Lord Rama / Lord Shiva",
    beejMantra: {
      sanskrit: "ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः ॥",
      transliteration: "Om Hram Hreem Hroum Sah Suryaya Namah",
      count: "108 times daily at Sunrise",
      bestTime: "Early Morning during Brahma Muhurta facing East"
    },
    gemstone: {
      primary: "Ruby (Manikya / माणिक)",
      substitute: "Red Garnet / Red Tourmaline",
      metal: "Copper or Gold",
      finger: "Ring Finger of Right Hand",
      day: "Sunday morning during Shukla Paksha",
      activationMantra: "Om Ghrini Suryaya Namah"
    },
    donation: {
      items: ["Wheat grains", "Jaggery (Gud)", "Copper vessel", "Red sandalwood", "Red clothes"],
      grains: "Red Wheat / Gehun",
      clothColor: "Ruby Red / Copper Gold",
      bestDay: "Sunday at noon",
      recipient: "Needy Brahmins, Temple Priest, or Sun Temple"
    },
    rudraksha: {
      mukhi: "1 Mukhi (Eka Mukhi Rudraksha)",
      deity: "Lord Shiva (Parama Shiva)",
      wearingDay: "Sunday in pure silk or gold thread"
    },
    fastingVrat: {
      day: "Sundays (Ravivar Vrat)",
      foodRules: "Eat saltless wheat food or sweet porridge once before sunset.",
      deityWorship: "Offer Arghya (water mixed with red flowers, kumkum & akshat) to Sun God."
    },
    lalKitabRemedies: [
      "Offer water to Rising Sun daily in a copper vessel with red flower petals.",
      "Respect your father and paternal elders unconditionally.",
      "Throw a copper coin in running river water for career growth."
    ]
  },
  Moon: {
    planet: "Moon",
    sanskritName: "Chandra Dev (चंद्र देव)",
    rulingDeity: "Lord Shiva / Goddess Parvati",
    beejMantra: {
      sanskrit: "ॐ श्रां श्रीं श्रौं सः चंद्रमसे नमः ॥",
      transliteration: "Om Shram Shreem Shroum Sah Chandramase Namah",
      count: "108 times daily after Sunset",
      bestTime: "Night time or Monday evening"
    },
    gemstone: {
      primary: "Natural Basra Pearl (Moti / मोती)",
      substitute: "Moonstone (Chandrakant Mani)",
      metal: "Pure Silver",
      finger: "Little Finger of Right Hand",
      day: "Monday evening during Full Moon (Purnima)",
      activationMantra: "Om Som Somaya Namah"
    },
    donation: {
      items: ["White rice", "Milk", "Curd", "White clothes", "Silver coin", "Sugar"],
      grains: "Basmati Rice / Chawal",
      clothColor: "Pure White / Milky Silver",
      bestDay: "Monday evening or Purnima",
      recipient: "Women, mothers, elderly lady or Shiv Temple"
    },
    rudraksha: {
      mukhi: "2 Mukhi (Dwi Mukhi Rudraksha)",
      deity: "Ardhanarishvara (Shiva & Shakti)",
      wearingDay: "Monday morning in silver capping"
    },
    fastingVrat: {
      day: "Mondays (Somvar Vrat)",
      foodRules: "Eat kheer, milk products, or saltless white food in evening.",
      deityWorship: "Perform Shivling Abhishekam with raw cow milk and water."
    },
    lalKitabRemedies: [
      "Touch mother's feet daily to receive lunar blessings.",
      "Keep a silver square piece or silver glass at home.",
      "Do not waste water or liquid dairy products."
    ]
  },
  Mars: {
    planet: "Mars",
    sanskritName: "Mangal Dev (मंगल देव)",
    rulingDeity: "Lord Hanuman / Lord Kartikeya",
    beejMantra: {
      sanskrit: "ॐ क्रां क्रीं क्रौं सः भौमाय नमः ॥",
      transliteration: "Om Kram Kreem Kroum Sah Bhaumaya Namah",
      count: "108 times on Tuesday morning",
      bestTime: "Sunrise or Tuesday Hanuman Chalisa time"
    },
    gemstone: {
      primary: "Red Coral (Moonga / मूंगा)",
      substitute: "Red Jasper / Carnelian",
      metal: "Copper or Gold",
      finger: "Ring Finger or Index Finger",
      day: "Tuesday morning",
      activationMantra: "Om Angarakaya Namah"
    },
    donation: {
      items: ["Red Lentils (Masoor Dal)", "Jaggery", "Red clothes", "Copper utensils", "Sweet boondi"],
      grains: "Red Masoor Dal",
      clothColor: "Deep Red / Crimson",
      bestDay: "Tuesday",
      recipient: "Celibate monks, Hanuman temple devotees, or soldiers"
    },
    rudraksha: {
      mukhi: "3 Mukhi (Tri Mukhi Rudraksha)",
      deity: "Agni Dev (Fire God)",
      wearingDay: "Tuesday morning"
    },
    fastingVrat: {
      day: "Tuesdays (Mangalvar Vrat)",
      foodRules: "Eat sweet wheat halwa or jaggery food once on Tuesday without salt.",
      deityWorship: "Recite Hanuman Chalisa 7 times or Sundarkand on Tuesdays."
    },
    lalKitabRemedies: [
      "Distribute sweet boondi or besan ladoo at Hanuman Temple.",
      "Plant neem trees or red flowering plants near home.",
      "Keep good relations with younger brothers and army personnel."
    ]
  },
  Mercury: {
    planet: "Mercury",
    sanskritName: "Budh Dev (बुध देव)",
    rulingDeity: "Lord Vishnu / Goddess Saraswati",
    beejMantra: {
      sanskrit: "ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः ॥",
      transliteration: "Om Bram Breem Broum Sah Budhaya Namah",
      count: "108 times daily in morning",
      bestTime: "Wednesday morning during Sunrise"
    },
    gemstone: {
      primary: "Colombian Emerald (Panna / पन्ना)",
      substitute: "Peridot / Green Tourmaline",
      metal: "Gold or Bronze",
      finger: "Little Finger of Right Hand",
      day: "Wednesday morning",
      activationMantra: "Om Bum Budhaya Namah"
    },
    donation: {
      items: ["Green Moong Dal", "Green spinach / vegetables", "Green clothes", "Bronze items", "Books"],
      grains: "Whole Green Gram (Moong)",
      clothColor: "Emerald Green",
      bestDay: "Wednesday morning",
      recipient: "Students, cows (Gaushala), or orphanages"
    },
    rudraksha: {
      mukhi: "4 Mukhi (Chatur Mukhi Rudraksha)",
      deity: "Lord Brahma",
      wearingDay: "Wednesday in green thread"
    },
    fastingVrat: {
      day: "Wednesdays (Budhvar Vrat)",
      foodRules: "Eat green moong dish or moong halwa before sunset.",
      deityWorship: "Offer Durva grass (21 shoots) to Lord Ganesha."
    },
    lalKitabRemedies: [
      "Feed green fodder or spinach to cows every Wednesday.",
      "Pierce nose/ear lobe with silver or gift green items to sister/daughter.",
      "Clean your teeth with alum or neem stick."
    ]
  },
  Jupiter: {
    planet: "Jupiter",
    sanskritName: "Brihaspati / Guru Dev (गुरु देव)",
    rulingDeity: "Lord Vishnu / Lord Dakshinamurthy",
    beejMantra: {
      sanskrit: "ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः ॥",
      transliteration: "Om Gram Greem Groum Sah Gurave Namah",
      count: "108 times daily at dawn",
      bestTime: "Thursday morning during Brahma Muhurta"
    },
    gemstone: {
      primary: "Yellow Sapphire (Pukhraj / पुखराज)",
      substitute: "Yellow Topaz / Citrine (Sunela)",
      metal: "Pure Gold or Brass",
      finger: "Index Finger (Tarjani)",
      day: "Thursday morning",
      activationMantra: "Om Brim Brihaspataye Namah"
    },
    donation: {
      items: ["Chana Dal (Bengal gram)", "Turmeric (Haldi)", "Yellow clothes", "Saffron", "Religious scriptures"],
      grains: "Chana Dal / Bengal Gram",
      clothColor: "Bright Yellow / Saffron",
      bestDay: "Thursday morning",
      recipient: "Spiritual gurus, teachers, scholars, or temple priests"
    },
    rudraksha: {
      mukhi: "5 Mukhi (Pancha Mukhi Rudraksha)",
      deity: "Kalagni Rudra",
      wearingDay: "Thursday morning in gold or yellow silk thread"
    },
    fastingVrat: {
      day: "Thursdays (Guruvar Vrat)",
      foodRules: "Eat yellow gram flour food (Besan kheer) without salt. Do not use soap/shampoo.",
      deityWorship: "Worship Banana tree (Kadali Vriksha) and recite Vishnu Sahasranama."
    },
    lalKitabRemedies: [
      "Apply yellow saffron or turmeric tilak on forehead and throat daily.",
      "Respect teachers, gurus, priests, and elders.",
      "Tie a yellow thread on right wrist."
    ]
  },
  Venus: {
    planet: "Venus",
    sanskritName: "Shukra Dev (शुक्र देव)",
    rulingDeity: "Goddess Lakshmi / Goddess Maha Tripura Sundari",
    beejMantra: {
      sanskrit: "ॐ द्रां द्रीं द्रौं सः शुक्राय नमः ॥",
      transliteration: "Om Dram Dreem Droum Sah Shukraya Namah",
      count: "108 times daily in evening",
      bestTime: "Friday evening during Twilight"
    },
    gemstone: {
      primary: "Diamond (Heera / हीरा)",
      substitute: "Opal / White Zircon",
      metal: "Platinum, White Gold, or Silver",
      finger: "Middle Finger or Ring Finger",
      day: "Friday morning",
      activationMantra: "Om Shum Shukraya Namah"
    },
    donation: {
      items: ["White sugar candy (Mishri)", "Camphor (Kapur)", "Perfume (Attar)", "Ghee", "Silk clothes"],
      grains: "White Rice / Sabudana",
      clothColor: "Sparkling White / Cream",
      bestDay: "Friday evening",
      recipient: "Young girls, married women, or temple of Goddess Lakshmi"
    },
    rudraksha: {
      mukhi: "6 Mukhi (Shat Mukhi Rudraksha)",
      deity: "Lord Kartikeya",
      wearingDay: "Friday in silver casing"
    },
    fastingVrat: {
      day: "Fridays (Shukravar Vrat)",
      foodRules: "Eat white kheer or sugar rice once in evening. Avoid sour foods.",
      deityWorship: "Chant Sri Suktam or Kanakadhara Stotram."
    },
    lalKitabRemedies: [
      "Use pleasant natural perfumes and keep clothes clean and fragrant.",
      "Gift white sweets or cosmetics to women.",
      "Donate white cows or support cow shelters."
    ]
  },
  Saturn: {
    planet: "Saturn",
    sanskritName: "Shani Dev (शनि देव)",
    rulingDeity: "Lord Hanuman / Lord Shiva / Bhairava",
    beejMantra: {
      sanskrit: "ॐ शं शनैश्चराय नमः ॥ / ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः ॥",
      transliteration: "Om Pram Preem Proum Sah Shanaishcharaya Namah",
      count: "108 times daily after sunset",
      bestTime: "Saturday evening facing West"
    },
    gemstone: {
      primary: "Blue Sapphire (Neelam / नीलम)",
      substitute: "Amethyst (Jamuniya) / Blue Topaz",
      metal: "Panchadhatu, Iron, or Silver",
      finger: "Middle Finger of Right Hand",
      day: "Saturday evening",
      activationMantra: "Om Sham Shanaishcharaya Namah"
    },
    donation: {
      items: ["Mustard oil", "Black sesame seeds (Til)", "Iron utensils", "Black umbrella", "Blankets", "Footwear"],
      grains: "Black Urad Dal",
      clothColor: "Black / Dark Navy Blue",
      bestDay: "Saturday evening",
      recipient: "Laborers, homeless people, physically challenged, or Shani Temple"
    },
    rudraksha: {
      mukhi: "7 Mukhi (Sapt Mukhi Rudraksha)",
      deity: "Goddess Mahalakshmi",
      wearingDay: "Saturday evening in black thread"
    },
    fastingVrat: {
      day: "Saturdays (Shanivar Vrat)",
      foodRules: "Eat khichdi cooked with black urad dal and mustard oil in evening.",
      deityWorship: "Light a mustard oil lamp under Peepal tree on Saturday evening."
    },
    lalKitabRemedies: [
      "Serve stray dogs with mustard oil coated rotis.",
      "Donate iron footwear or umbrellas to poor workers.",
      "Chant Shani Stotra by King Dasharatha."
    ]
  },
  Rahu: {
    planet: "Rahu",
    sanskritName: "Rahu Dev (राहु देव)",
    rulingDeity: "Goddess Durga / Goddess Chhinnamasta",
    beejMantra: {
      sanskrit: "ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः ॥",
      transliteration: "Om Bhram Bhreem Bhroum Sah Rahave Namah",
      count: "108 times daily at dusk",
      bestTime: "Night time or Saturday dusk"
    },
    gemstone: {
      primary: "Hessonite Garnet (Gomed / गोमेद)",
      substitute: "Orange Zircon",
      metal: "Eight-Metal Alloy (Panchadhatu or Lead)",
      finger: "Middle Finger",
      day: "Saturday or Wednesday evening",
      activationMantra: "Om Ram Rahave Namah"
    },
    donation: {
      items: ["Black sesame", "Coconut", "Blankets", "Lead metal", "Mustard oil", "Radish"],
      grains: "Mix Coarse Grains (Satnaja)",
      clothColor: "Smokey Blue / Grey / Multi-color",
      bestDay: "Saturday late evening",
      recipient: "Leprosy patients, sanitation workers, or sweepers"
    },
    rudraksha: {
      mukhi: "8 Mukhi (Ashta Mukhi Rudraksha)",
      deity: "Lord Ganesha",
      wearingDay: "Wednesday or Saturday"
    },
    fastingVrat: {
      day: "Saturdays / Ashtami Tithi",
      foodRules: "Avoid non-veg, alcohol, and stale food. Keep home clean.",
      deityWorship: "Chant Durga Chalisa or Rahu Stotra."
    },
    lalKitabRemedies: [
      "Immerse dry coconut with husk in flowing river water on Saturday.",
      "Keep electronic gadgets organized and free of dust.",
      "Feed crows or street dogs with barley or sweet rotis."
    ]
  },
  Ketu: {
    planet: "Ketu",
    sanskritName: "Ketu Dev (केतु देव)",
    rulingDeity: "Lord Ganesha / Lord Matsya Avatar",
    beejMantra: {
      sanskrit: "ॐ स्त्रां स्त्रीं स्त्रौं सः केतवे नमः ॥",
      transliteration: "Om Stram Streem Stroum Sah Ketave Namah",
      count: "108 times daily in morning",
      bestTime: "Early Morning facing North-East"
    },
    gemstone: {
      primary: "Chrysoberyl Cat's Eye (Lehsuniya / लहसुनिया)",
      substitute: "Tiger Eye",
      metal: "Panchadhatu or Silver",
      finger: "Ring Finger or Middle Finger",
      day: "Tuesday morning",
      activationMantra: "Om Kem Ketave Namah"
    },
    donation: {
      items: ["Two-color blanket (Black & White)", "Sesame seeds", "Saffron", "Flag for temple", "Sour foods"],
      grains: "Kultthi Dal (Horse Gram)",
      clothColor: "Checkered / Dual Shade / White & Black",
      bestDay: "Tuesday evening",
      recipient: "Monks, ascetics, dogs, or Ganesha temple"
    },
    rudraksha: {
      mukhi: "9 Mukhi (Nava Mukhi Rudraksha)",
      deity: "Goddess Durga",
      wearingDay: "Tuesday morning"
    },
    fastingVrat: {
      day: "Tuesdays / Chaturthi Tithi",
      foodRules: "Eat sesame seeds and fruits once.",
      deityWorship: "Chant Sankat Nashan Ganesha Stotram."
    },
    lalKitabRemedies: [
      "Offer triangular yellow or red flag at a temple spire.",
      "Feed street dogs with black & white fur.",
      "Keep a silver solid ball in your pocket for emotional calm."
    ]
  }
};

/**
 * Dosha remedies mapping for Manglik, Kaal Sarp, Pitru, Shani Sade Sati
 */
export const DOSHA_REMEDIES = [
  {
    name: "Manglik Dosha (मंगल दोष)",
    description: "Formed when Mars is in 1st, 4th, 7th, 8th, or 12th house from Lagna/Moon.",
    remedies: [
      "Perform Kumbh Vivah / Vishnu Pratima Vivah before marriage ritual.",
      "Chant Hanuman Chalisa daily and offer Sindoor & Jasmine oil at Hanuman temple on Tuesdays.",
      "Fast on Tuesdays and donate Red Masoor Dal & Jaggery to needy people.",
      "Keep a red handkerchief in pocket and wear 3-Mukhi Rudraksha."
    ]
  },
  {
    name: "Kaal Sarp Dosha (कालसर्प दोष)",
    description: "Formed when all 7 major planets are trapped between Rahu and Ketu axis.",
    remedies: [
      "Perform Kaal Sarp Shanti Puja at Trimbakeshwar (Nashik), Ujjain, or Mahakaleshwar.",
      "Chant Maha Mrityunjaya Mantra 108 times daily (Om Tryambakam Yajamahe...).",
      "Offer pair of Silver Serpents (Nag-Nagin) into running river water on Nag Panchami.",
      "Perform Rudrabhishekam with Cow Milk & Bael leaves on Mondays."
    ]
  },
  {
    name: "Pitru Dosha (पितृ दोष)",
    description: "Formed due to unfulfilled karmic debts of ancestors affecting Sun/Moon or 9th House.",
    remedies: [
      "Perform Pind Daan / Shradh Tarpan during Pitru Paksha or Amavasya at Gaya/Varanasi.",
      "Feed cows, crows, dogs, and poor people on Amavasya (New Moon day).",
      "Offer water to Peepal tree daily (except Sunday) and light mustard oil diya in evening.",
      "Chant Harivamsa Purana or Bhagavad Gita Chapter 11 for ancestral peace."
    ]
  },
  {
    name: "Shani Sade Sati & Dhaiya (शनि साढ़ेसाती)",
    description: "7.5 year transit of Saturn through 12th, 1st, and 2nd house from natal Moon.",
    remedies: [
      "Chant Shani Chalisa & Dasharatha Shani Stotra every Saturday evening.",
      "Donate mustard oil in an iron bowl after looking at your reflection (Chhaya Daan).",
      "Recite Hanuman Chalisa 7 times every Saturday.",
      "Wear Iron Ring made from horse shoe nail or boat nail on middle finger."
    ]
  }
];
