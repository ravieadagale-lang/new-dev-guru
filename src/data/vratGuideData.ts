// Complete Guide to Vrat (Fasting) Data Model & Comprehensive Repository
// Based on the Shastras, Puranas (Bhavishya, Padma, Skanda, Matsya), and Hemadri's Vrataraja

export type FastingMethodType = 
  | "Nirjala" 
  | "Phalahar" 
  | "Ekasana" 
  | "Sanjha" 
  | "Anna Tyag" 
  | "Dugdhahar" 
  | "Jalahar" 
  | "Partial/Modified";

export type VratCategory = 
  | "weekly" 
  | "ekadashi" 
  | "pradosh" 
  | "maha_shivratri" 
  | "major_deity" 
  | "special_occasion" 
  | "sacred_regional" 
  | "puranic_rare" 
  | "nakshatra" 
  | "gupt" 
  | "monthly_recurring";

export interface VratItem {
  id: string;
  name: string;
  nameHindi: string;
  category: VratCategory;
  tithiOrTiming: string;
  hinduMonth?: string;
  paksha?: "Shukla" | "Krishna" | "Both" | "Solar/Transit" | "Weekly" | "Nakshatra";
  deity: string;
  planetAssociated?: string;
  fastingMethod: FastingMethodType;
  purpose: string;
  legendAndSignificance: string;
  permittedFoods: string[];
  forbiddenFoods: string[];
  vidhi: string[];
  paranaRules: string;
  rulesAndAvoid: string[];
  keywords: string[];
  isGupt?: boolean;
  specialNote?: string;
  approxGregorianMonth?: string;
}

export interface NakshatraVratItem {
  number: number;
  name: string;
  nameHindi: string;
  presidingDeity: string;
  purpose: string;
  significance: string;
  specialRitual: string;
}

export interface GoalBasedVratMatch {
  goal: string;
  goalHindi: string;
  recommendedVrats: string[];
  description: string;
}

export interface GlossaryTerm {
  term: string;
  termHindi?: string;
  definition: string;
}

// -------------------------------------------------------------
// PART TWO: WEEKLY VRAT CYCLE (SAPTAHIK VRAT)
// -------------------------------------------------------------
export const WEEKLY_VRATS: VratItem[] = [
  {
    id: "weekly-somvar",
    name: "Monday (Somvar) Vrat",
    nameHindi: "सोमवार व्रत (भगवान शिव)",
    category: "weekly",
    tithiOrTiming: "Every Monday (Especially powerful in Shravan month)",
    deity: "Lord Shiva & Chandra (Moon)",
    planetAssociated: "Chandra (Moon)",
    fastingMethod: "Ekasana",
    purpose: "Marital harmony, resolving marriage delays, family peace, and pacifying an afflicted Moon (Chandra Dosha / emotional unrest).",
    legendAndSignificance: "Associated with Goddess Parvati's penance to attain Lord Shiva and the pacification of Chandra Dev. Observing Somvar balances the mind, emotional fluctuations, and brings auspiciousness to the household.",
    permittedFoods: ["Fruits", "Milk & Curd", "Sabudana", "Dry fruits", "Sattvic single evening meal (Sendha namak or salt-free)"],
    forbiddenFoods: ["Grains in strict version", "Onion & Garlic", "Non-veg", "Alcohol"],
    vidhi: [
      "Morning holy bath and wearing clean white or light-colored attire.",
      "Jal / Dugdh Abhishek of Shiva Linga with water, milk, honey, and Ganga jal.",
      "Offering Bilva patra (Bael leaves), white flowers, Dhatura, and Chandan (white sandalwood).",
      "Chanting Panchakshari Mantra ('Om Namah Shivaya') 108 times.",
      "Evening Shiva Aarti followed by a single sattvic meal."
    ],
    paranaRules: "Break fast in the evening after sunset and completing evening Shiva Aarti.",
    rulesAndAvoid: ["Avoid cutting hair or nails", "Avoid daytime sleeping", "Avoid anger or arguments"],
    keywords: ["somvar vrat vidhi", "monday fast Shiva", "somvar vrat niyam", "solah somvar vrat"],
    specialNote: "Solah Somvar (16 consecutive Mondays) is widely observed for marriage wishes and culminates in an Udyapan ceremony."
  },
  {
    id: "weekly-mangalvar",
    name: "Tuesday (Mangalvar) Vrat",
    nameHindi: "मंगलवार व्रत (श्री हनुमान जी / माँ दुर्गा)",
    category: "weekly",
    tithiOrTiming: "Every Tuesday",
    deity: "Lord Hanuman & Goddess Durga",
    planetAssociated: "Mangal (Mars)",
    fastingMethod: "Ekasana",
    purpose: "Courage, overcoming fear, enemies and debt, pacifying Mangal Dosha (afflicted Mars).",
    legendAndSignificance: "Dedicated to the supreme devotee Lord Hanuman. Mars represents vitality, blood, courage, and land. Observing this fast removes obstacles and protects against negative psychic energies.",
    permittedFoods: ["Single sattvic meal", "Jaggery (Gur)", "Wheat / Gram preparations", "Red fruits", "Boiled food (salt-free preferred in strict vows)"],
    forbiddenFoods: ["Salt (in strict vows)", "Onion & Garlic", "Non-veg", "Alcohol"],
    vidhi: [
      "Bathe in the morning and wear red or saffron garments.",
      "Apply Chameli oil mixed with Sindoor to Lord Hanuman.",
      "Light a mustard oil or jasmine oil diya.",
      "Recite Hanuman Chalisa, Bajrang Baan, and Sundarkand.",
      "Offer Boondi, Laddoo, or Gur-Chana as prasad."
    ],
    paranaRules: "Break fast in the evening after sunset and offering Hanumanji prasad.",
    rulesAndAvoid: ["Do not consume salt if observing strict vow", "Avoid cutting hair/nails", "Strict celibacy and anger control"],
    keywords: ["mangalvar vrat vidhi", "tuesday fast Hanuman", "mangal dosha vrat niyam"],
    specialNote: "Tuesdays falling in Shravan month carry Mangala Gauri Vrat for married women."
  },
  {
    id: "weekly-budhvar",
    name: "Wednesday (Budhvar) Vrat",
    nameHindi: "बुधवार व्रत (श्री गणेश जी / बुध ग्रह)",
    category: "weekly",
    tithiOrTiming: "Every Wednesday",
    deity: "Lord Ganesha & Lord Budh (Mercury)",
    planetAssociated: "Budh (Mercury)",
    fastingMethod: "Ekasana",
    purpose: "Intellect, memory, communication skills, success in trade/business/education, and pacifying weak Mercury.",
    legendAndSignificance: "Lord Ganesha is the Remover of Obstacles (Vighnaharta) and Lord of Intellect (Buddhi). Budha governs analytical thinking and speech.",
    permittedFoods: ["Moong dal dishes", "Green vegetables", "Sattvic single meal", "Fruits and milk"],
    forbiddenFoods: ["Non-veg", "Alcohol", "Onion & Garlic"],
    vidhi: [
      "Wear clean green or yellow attire after morning bath.",
      "Offer 21 Durva grass blades (दूर्वा), Modak, and green flowers to Lord Ganesha.",
      "Recite Ganesha Atharvashirsha and Budha Beej Mantra ('Om Bum Budhaya Namah').",
      "Donate green moong, green clothes, or leafy vegetables to the needy."
    ],
    paranaRules: "Take single sattvic meal in the afternoon or evening after Ganesha Aarti.",
    rulesAndAvoid: ["Avoid wearing or buying leather items", "Avoid harsh speech or deceit", "Maintain honest communication"],
    keywords: ["budhvar vrat vidhi", "wednesday fast Ganesha", "budh graha shanti vrat"],
    specialNote: "Gentlest weekly vrat, highly recommended for students, writers, accountants, and traders."
  },
  {
    id: "weekly-guruvar",
    name: "Thursday (Guruvar / Brihaspativar) Vrat",
    nameHindi: "गुरुवार / बृहस्पतिवार व्रत (श्री हरि विष्णु / देवगुरु बृहस्पति)",
    category: "weekly",
    tithiOrTiming: "Every Thursday",
    deity: "Lord Vishnu & Devguru Brihaspati (Jupiter)",
    planetAssociated: "Guru / Brihaspati (Jupiter)",
    fastingMethod: "Ekasana",
    purpose: "Wisdom, wealth, favorable marriage prospects, spiritual growth, and strengthening Jupiter.",
    legendAndSignificance: "Brihaspati is the preceptor of the Devas. Lord Vishnu preserves cosmic order. Thursday fasts eliminate hurdles in higher education, marriage, and family progeny.",
    permittedFoods: ["Yellow foods: Besan, Chana dal, Bananas, Turmeric rice", "Single meal strictly without salt"],
    forbiddenFoods: ["Salt (strictly prohibited in authentic Guruvar vow)", "Non-veg", "Alcohol", "Onion & Garlic"],
    vidhi: [
      "Wear yellow clothes; do not wash hair or use soap on this day.",
      "Worship a Banana tree (Kadali Vriksha) with water, raw turmeric, chana dal, and jaggery.",
      "Light a pure cow ghee lamp before Lord Vishnu and Brihaspati.",
      "Recite Brihaspativar Vrat Katha and Vishnu Sahasranama.",
      "Do not eat the banana offered from the tree you worship."
    ],
    paranaRules: "Evening single meal after dusk puja, strictly salt-free yellow sattvic food.",
    rulesAndAvoid: ["Do not wash hair, clothes, or shave on Thursdays", "Avoid taking salt", "Avoid sweeping house forcefully"],
    keywords: ["guruvar vrat vidhi", "thursday fast Vishnu", "brihaspativar vrat niyam"],
    specialNote: "Extremely auspicious for marriage seekers and students. Observe for 16 consecutive Thursdays minimum."
  },
  {
    id: "weekly-shukravar",
    name: "Friday (Shukravar) Vrat",
    nameHindi: "शुक्रवार व्रत (माँ महालक्ष्मी / संतोषी माता / शुक्र ग्रह)",
    category: "weekly",
    tithiOrTiming: "Every Friday",
    deity: "Goddess Lakshmi, Santoshi Maa & Shukra (Venus)",
    planetAssociated: "Shukra (Venus)",
    fastingMethod: "Ekasana",
    purpose: "Wealth, luxury, aesthetic refinement, marital bliss, beauty, and strengthening Venus.",
    legendAndSignificance: "Friday is dedicated to the divine feminine energies of abundance and love. Associated with Sri Suktam and the famous Solah Shukravar Santoshi Maa vow.",
    permittedFoods: ["Kheer (sweet rice pudding)", "Milk & dairy", "White sweet dishes", "Gur-chana (for Santoshi Maa)"],
    forbiddenFoods: ["Sour food (Khatta - STRICTLY BANNED in Santoshi Maa vrat: Lemon, Curd, Tamarind, Pickles)", "Non-veg", "Alcohol"],
    vidhi: [
      "Bathe early and wear clean white, pink, or red silk attire.",
      "Light a ghee diya and offer lotus/rose flowers and white sweets to Goddess Lakshmi.",
      "Recite Sri Suktam, Kanakadhara Stotram, or Santoshi Maa Vrat Katha.",
      "Feed small girls (Kanya) or donate white rice/sugar to women in need."
    ],
    paranaRules: "Evening sweet sattvic meal after Lakshmi / Santoshi Maa Aarti.",
    rulesAndAvoid: ["Strictly NO sour foods throughout the 16-week cycle for family/observer", "Avoid lending money on Fridays", "Avoid quarreling"],
    keywords: ["shukravar vrat vidhi", "friday fast Lakshmi", "santoshi maa vrat rules"],
    specialNote: "The 16 Friday Santoshi Maa Vrat requires complete abstinence from sour items by the devotee and all household members."
  },
  {
    id: "weekly-shanivar",
    name: "Saturday (Shanivar) Vrat",
    nameHindi: "शनिवार व्रत (शनि देव / श्री हनुमान जी)",
    category: "weekly",
    tithiOrTiming: "Every Saturday",
    deity: "Shani Dev (Saturn) & Lord Hanuman",
    planetAssociated: "Shani (Saturn)",
    fastingMethod: "Ekasana",
    purpose: "Relief during Sade Sati, Dhaiya, Mahadasha, balancing past karmas, mental resilience.",
    legendAndSignificance: "Lord Shani is the Karmaphala Data (Dispenser of Justice). Fasting on Saturday with sincere charity mitigates the harsh effects of Saturn's disciplinary transit.",
    permittedFoods: ["Single meal with black sesame (Til)", "Urad dal khichdi", "Sattvic vegetarian items (avoid heavy fried food)"],
    forbiddenFoods: ["Non-veg", "Alcohol", "Onion & Garlic", "Excessive oil"],
    vidhi: [
      "Bathe early morning, wear blue or dark attire.",
      "Offer mustard oil (Telabhishek), black sesame, and blue flowers to Shani Dev idol or at a Peepal tree.",
      "Light a mustard oil lamp under a Peepal tree at dusk.",
      "Chant Shani Beej Mantra ('Om Sham Shanaishcharaya Namah') or Hanuman Chalisa.",
      "Donate shoes, black umbrellas, blankets, or food to laborers, the elderly, and disabled people."
    ],
    paranaRules: "Break fast in the evening after sunset and charity with Til/Urad preparation.",
    rulesAndAvoid: ["Do not purchase iron, oil, or leather on Saturday", "Do not cut hair or nails", "Do not mistreat subordinates or workers"],
    keywords: ["shanivar vrat vidhi", "saturday fast Shani", "sade sati vrat niyam"],
    specialNote: "Charity to the underprivileged on Saturday is considered even more spiritually potent than the fast itself."
  },
  {
    id: "weekly-ravivar",
    name: "Sunday (Ravivar) Vrat",
    nameHindi: "रविवार व्रत (भगवान सूर्य देव)",
    category: "weekly",
    tithiOrTiming: "Every Sunday",
    deity: "Surya Dev (Sun God)",
    planetAssociated: "Surya (Sun)",
    fastingMethod: "Ekasana",
    purpose: "Good health, vitality, eye/skin/heart wellness, leadership, father's longevity, and strengthening the Sun.",
    legendAndSignificance: "Surya Dev is the visible divinity (Pratyaksha Devata) and source of all vital Prana energy. Sunday fast rejuvenates the soul and bestows royal favor and charisma.",
    permittedFoods: ["Single meal without salt", "Wheat dishes / Dalia", "Gur (jaggery)", "Red fruits & milk"],
    forbiddenFoods: ["Salt (strictly prohibited in authentic Ravivar vrat)", "Oily / fried food", "Non-veg", "Alcohol"],
    vidhi: [
      "Wake up before sunrise (Brahma Muhurta) and complete ablutions.",
      "Offer Surya Arghya using a pure copper vessel with water, red chandan, Akshat, and red flowers at sunrise.",
      "Chant the Aditya Hridaya Stotra or Gayatri Mantra 108 times.",
      "Consume a single meal before sunset made of wheat, milk, and jaggery, completely free of salt."
    ],
    paranaRules: "Single salt-free meal taken before sunset.",
    rulesAndAvoid: ["Avoid consuming any salt for 24 hours", "Avoid cutting hair/nails", "Avoid oil massage"],
    keywords: ["ravivar vrat vidhi", "sunday fast Surya", "surya vrat niyam"],
    specialNote: "Extremely beneficial for those suffering from chronic fatigue, heart ailments, or eye problems."
  }
];

// -------------------------------------------------------------
// PART THREE: ALL 24 NAMED EKADASHIS ACROSS THE YEAR
// -------------------------------------------------------------
export const ALL_24_EKADASHIS: VratItem[] = [
  {
    id: "ekadashi-kamada",
    name: "Kamada Ekadashi",
    nameHindi: "कामदा एकादशी",
    category: "ekadashi",
    tithiOrTiming: "Chaitra Shukla Ekadashi",
    hinduMonth: "Chaitra",
    paksha: "Shukla",
    deity: "Lord Vishnu",
    fastingMethod: "Phalahar",
    purpose: "Fulfilling deep wishes (Kama), lifting curses, absolving grievous past transgressions.",
    legendAndSignificance: "Narrated to King Yudhishthira: The Gandharva singer Lalit was turned into a monster due to a curse. His devoted wife Lalita observed Kamada Ekadashi and offered the merit to her husband, restoring his divine form.",
    permittedFoods: ["Fruits", "Milk", "Kuttu/Singhara flour", "Sabudana", "Sendha namak"],
    forbiddenFoods: ["All grains (Rice, Wheat, Barley)", "All Dals/Legumes", "Onion, Garlic"],
    vidhi: ["Vishnu worship with Tulsi leaves, light diya, chant Vishnu Sahasranama, observe fast."],
    paranaRules: "Parana on Dwadashi morning after sunrise and before Hari Vasara concludes.",
    rulesAndAvoid: ["Strict avoidance of all grains and beans", "No day sleep", "Night vigil (Jagran)"],
    keywords: ["kamada ekadashi vidhi", "chaitra shukla ekadashi"],
    approxGregorianMonth: "March - April"
  },
  {
    id: "ekadashi-papmochani",
    name: "Papmochani Ekadashi",
    nameHindi: "पापमोचिनी एकादशी",
    category: "ekadashi",
    tithiOrTiming: "Chaitra Krishna Ekadashi",
    hinduMonth: "Chaitra",
    paksha: "Krishna",
    deity: "Lord Vishnu",
    fastingMethod: "Phalahar",
    purpose: "Literal 'Sin-Releasing' Ekadashi. Cleanses the heaviest karmic baggage and past sins.",
    legendAndSignificance: "Sage Medhavi fell from his ascetic discipline due to Apsara Manjughosha. Upon realizing his lapse, he observed Papmochani Ekadashi on Sage Chyavana's counsel, purifying his sins completely.",
    permittedFoods: ["Fruits", "Milk", "Root vegetables", "Sendha namak"],
    forbiddenFoods: ["All grains", "Beans", "Rice"],
    vidhi: ["Offer yellow flowers, Tulsi leaves, chant 'Om Namo Bhagavate Vasudevaya'."],
    paranaRules: "Break fast next morning on Dwadashi within the stipulated Parana muhurat.",
    rulesAndAvoid: ["Avoid negative talk", "No grain consumption"],
    keywords: ["papmochani ekadashi", "chaitra krishna ekadashi"],
    approxGregorianMonth: "March - April"
  },
  {
    id: "ekadashi-varuthini",
    name: "Varuthini Ekadashi",
    nameHindi: "वरूथिनी एकादशी",
    category: "ekadashi",
    tithiOrTiming: "Vaishakha Krishna Ekadashi",
    hinduMonth: "Vaishakha",
    paksha: "Krishna",
    deity: "Lord Madhusudana (Vishnu / Vamana)",
    fastingMethod: "Phalahar",
    purpose: "Equal to donating a thousand cows, shields from sudden misfortune and grants fortune.",
    legendAndSignificance: "Associated with King Mandhata, who attained supreme spiritual liberation by following Varuthini rules. Protects the devotee from sorrows in this life and the next.",
    permittedFoods: ["Fruits", "Milk", "Water", "Phalahar items"],
    forbiddenFoods: ["All grains", "Paan", "Brinjal", "Honey", "Kansya (bronze plate eating)"],
    vidhi: ["Worship Lord Madhusudana with white and yellow flowers, recite sacred hymns."],
    paranaRules: "Parana on Dwadashi morning with satvik phalahar first.",
    rulesAndAvoid: ["Avoid anger, gambling, sleep during day"],
    keywords: ["varuthini ekadashi", "vaishakha krishna ekadashi"],
    approxGregorianMonth: "April - May"
  },
  {
    id: "ekadashi-mohini",
    name: "Mohini Ekadashi",
    nameHindi: "मोहिनी एकादशी",
    category: "ekadashi",
    tithiOrTiming: "Vaishakha Shukla Ekadashi",
    hinduMonth: "Vaishakha",
    paksha: "Shukla",
    deity: "Lord Vishnu (Mohini Avatar)",
    fastingMethod: "Phalahar",
    purpose: "Dispels delusion (Moha), grants mental clarity in perplexing life dilemmas, cleanses past sins.",
    legendAndSignificance: "Lord Vishnu assumed the enchanting Mohini form during Samudra Manthan to distribute Amrit to the Devas. Sage Vasishtha advised Prince Dhrishtabuddhi to observe this fast to overcome illusion and suffering.",
    permittedFoods: ["Fruits", "Milk", "Sendha namak items"],
    forbiddenFoods: ["Rice", "Grains", "Lentils"],
    vidhi: ["Early bath, offer Panchamrit to Vishnu, chant Vishnu Sahasranama."],
    paranaRules: "Dwadashi Parana within prescribed sunrise window.",
    rulesAndAvoid: ["Avoid egoistic thoughts, gossip, and falsehood"],
    keywords: ["mohini ekadashi", "vaishakha shukla ekadashi"],
    approxGregorianMonth: "April - May"
  },
  {
    id: "ekadashi-apara",
    name: "Apara (Achala) Ekadashi",
    nameHindi: "अपरा (अचला) एकादशी",
    category: "ekadashi",
    tithiOrTiming: "Jyeshtha Krishna Ekadashi",
    hinduMonth: "Jyeshtha",
    paksha: "Krishna",
    deity: "Lord Trivikrama (Vishnu)",
    fastingMethod: "Phalahar",
    purpose: "Removes sins of deceit, false testimony, and slander; grants boundless (Apara) fame and wealth.",
    legendAndSignificance: "Equivalent to taking a holy dip in the sacred Triveni during Kumbh or performing Ashwamedha Yajna. Eradicates dark karmas accrued from speaking untruths.",
    permittedFoods: ["Fruits", "Milk", "Makhana", "Sabudana"],
    forbiddenFoods: ["Grains", "Pulses", "Non-veg"],
    vidhi: ["Worship Lord Trivikrama with Chandan, flowers, and Tulsi leaves."],
    paranaRules: "Parana on Dwadashi.",
    rulesAndAvoid: ["Refrain from falsehood, backbiting, and harsh speech"],
    keywords: ["apara ekadashi", "achala ekadashi", "jyeshtha krishna ekadashi"],
    approxGregorianMonth: "May - June"
  },
  {
    id: "ekadashi-nirjala",
    name: "Nirjala Ekadashi (Bhima Ekadashi)",
    nameHindi: "निर्जला एकादशी (भीम एकादशी)",
    category: "ekadashi",
    tithiOrTiming: "Jyeshtha Shukla Ekadashi",
    hinduMonth: "Jyeshtha",
    paksha: "Shukla",
    deity: "Lord Vishnu",
    fastingMethod: "Nirjala",
    purpose: "The Supreme King of all Ekadashis. Grants the combined spiritual merit of all 24 Ekadashis in the entire year.",
    legendAndSignificance: "Bhima could not endure hunger for 24 Ekadashis. Maharishi Vyasa instructed him that observing this single Jyeshtha Shukla Ekadashi completely without water (Nirjala) from sunrise to next day sunrise yields the full fruit of all 24 Ekadashis.",
    permittedFoods: ["Strictly NO food or water for 24 hours. (Aacharya water sip only allowed during Achamana)"],
    forbiddenFoods: ["All food, water, juices, and solids"],
    vidhi: [
      "Take Sankalp at sunrise facing East.",
      "Perform Vishnu puja with Ganga jal, Tulsi, Panchamrit.",
      "Remain in devotion, listening to Bhagavad Gita or chanting Om Namo Bhagavate Vasudevaya.",
      "Night vigil (Jagran) in prayer and meditation.",
      "Donate water-filled earthen pots (Ghada), hand fans, and fruits to Brahmins/needy on Dwadashi."
    ],
    paranaRules: "Drink water and eat sattvic food on Dwadashi after sunrise and completing water-pot charity.",
    rulesAndAvoid: ["Do not drink a single drop of water for the full 24-hour cycle (unless severe medical condition)"],
    keywords: ["nirjala ekadashi", "bhima ekadashi", "waterless fast", "jyeshtha shukla ekadashi"],
    approxGregorianMonth: "May - June"
  },
  {
    id: "ekadashi-yogini",
    name: "Yogini Ekadashi",
    nameHindi: "योगिनी एकादशी",
    category: "ekadashi",
    tithiOrTiming: "Ashadha Krishna Ekadashi",
    hinduMonth: "Ashadha",
    paksha: "Krishna",
    deity: "Lord Vishnu (Narayana)",
    fastingMethod: "Phalahar",
    purpose: "Cures prolonged physical ailments, leprosy, and frees from past-life curses.",
    legendAndSignificance: "Hem, a gardener for Yaksha King Kubera, was cursed with white leprosy for neglecting Shiva worship duties. Sage Markandeya advised him to observe Yogini Ekadashi, completely curing him.",
    permittedFoods: ["Fruits", "Milk", "Boiled potatoes", "Sendha namak"],
    forbiddenFoods: ["All grains", "Beans", "Rice"],
    vidhi: ["Worship Lord Narayana, feed poor people, chant holy mantras."],
    paranaRules: "Break fast on Dwadashi morning.",
    rulesAndAvoid: ["Avoid anger and worldly complaints"],
    keywords: ["yogini ekadashi", "ashadha krishna ekadashi"],
    approxGregorianMonth: "June - July"
  },
  {
    id: "ekadashi-devshayani",
    name: "Devshayani (Hari Shayani / Padma) Ekadashi",
    nameHindi: "देवशयनी एकादशी (हरिशयनी / पद्मा)",
    category: "ekadashi",
    tithiOrTiming: "Ashadha Shukla Ekadashi",
    hinduMonth: "Ashadha",
    paksha: "Shukla",
    deity: "Lord Vishnu",
    fastingMethod: "Phalahar",
    purpose: "Marks the start of the 4-month cosmic slumber (Chaturmas). Invocates immense divine protection.",
    legendAndSignificance: "Lord Vishnu retires to Yoga Nidra on the serpent Sheshanaga in Ksheerasagara for four months. All major auspicious ceremonies (weddings, Griha Pravesh) pause during this sacred austerity period.",
    permittedFoods: ["Fruits", "Milk", "Phalahari flours"],
    forbiddenFoods: ["All grains", "Rice", "Beans"],
    vidhi: ["Clean altar, place Vishnu on yellow silk bed, offer Aarti, begin Chaturmas vows."],
    paranaRules: "Dwadashi Parana after sunrise.",
    rulesAndAvoid: ["Chaturmas restrictions begin: Avoid green leafy vegetables in Shravan month"],
    keywords: ["devshayani ekadashi", "hari shayani", "chaturmas start", "ashadha shukla ekadashi"],
    approxGregorianMonth: "June - July"
  },
  {
    id: "ekadashi-kamika",
    name: "Kamika Ekadashi",
    nameHindi: "कामिका एकादशी",
    category: "ekadashi",
    tithiOrTiming: "Shravan Krishna Ekadashi",
    hinduMonth: "Shravan",
    paksha: "Krishna",
    deity: "Lord Vishnu",
    fastingMethod: "Phalahar",
    purpose: "Absolves grave sins, equals the merit of bathing in all holy rivers and donating gold.",
    legendAndSignificance: "Falling in the holy month of Shravan, worshipping Vishnu with Tulsi leaves on Kamika Ekadashi grants freedom from ancestral curses and fears of Yamaloka.",
    permittedFoods: ["Fruits", "Milk", "Sabudana"],
    forbiddenFoods: ["Grains", "Rice", "Lentils"],
    vidhi: ["Offer fragrant Tulsi leaves to Vishnu, light ghee lamps in temple."],
    paranaRules: "Break fast on Dwadashi.",
    rulesAndAvoid: ["Avoid non-sattvic thoughts"],
    keywords: ["kamika ekadashi", "shravan krishna ekadashi"],
    approxGregorianMonth: "July - August"
  },
  {
    id: "ekadashi-putrada-shravan",
    name: "Shravana Putrada Ekadashi",
    nameHindi: "श्रावण पुत्रदा एकादशी",
    category: "ekadashi",
    tithiOrTiming: "Shravan Shukla Ekadashi",
    hinduMonth: "Shravan",
    paksha: "Shukla",
    deity: "Lord Vishnu",
    fastingMethod: "Phalahar",
    purpose: "Blessed progeny, resolving obstacles in child conception, wellbeing of children.",
    legendAndSignificance: "King Mahijit had no heir. Sage Lomasha revealed the king had denied a thirsty cow water in a previous birth. By observing Shravan Putrada Ekadashi, the king was blessed with a noble son.",
    permittedFoods: ["Fruits", "Milk", "Kuttu", "Sendha namak"],
    forbiddenFoods: ["Grains", "Rice", "Dals"],
    vidhi: ["Husband and wife observe together, offering white sweets and yellow clothes to Vishnu."],
    paranaRules: "Parana on Dwadashi.",
    rulesAndAvoid: ["Avoid quarrels, maintain strict celibacy for the day"],
    keywords: ["putrada ekadashi shravan", "shravan shukla ekadashi"],
    approxGregorianMonth: "July - August"
  },
  {
    id: "ekadashi-aja",
    name: "Aja (Ajaa) Ekadashi",
    nameHindi: "अजा एकादशी",
    category: "ekadashi",
    tithiOrTiming: "Bhadrapada Krishna Ekadashi",
    hinduMonth: "Bhadrapada",
    paksha: "Krishna",
    deity: "Lord Hrishikesha (Vishnu)",
    fastingMethod: "Phalahar",
    purpose: "Redemption from extreme suffering, poverty, and loss of worldly kingdom/status.",
    legendAndSignificance: "King Harishchandra lost his kingdom, wife, and son due to destiny. Sage Gautama instructed him to observe Aja Ekadashi. Through this vow, his past sins were erased and his glory restored.",
    permittedFoods: ["Fruits", "Milk", "Root vegetables"],
    forbiddenFoods: ["Grains", "Rice", "Beans"],
    vidhi: ["Worship Lord Hrishikesha, night vigil with devotional songs."],
    paranaRules: "Dwadashi Parana.",
    rulesAndAvoid: ["Avoid despair and negative speech"],
    keywords: ["aja ekadashi", "harishchandra", "bhadrapada krishna ekadashi"],
    approxGregorianMonth: "August - September"
  },
  {
    id: "ekadashi-parsva",
    name: "Parsva (Parivartini / Vamana) Ekadashi",
    nameHindi: "पार्श्व (परिवर्तिनी / वामन) एकादशी",
    category: "ekadashi",
    tithiOrTiming: "Bhadrapada Shukla Ekadashi",
    hinduMonth: "Bhadrapada",
    paksha: "Shukla",
    deity: "Lord Vamana (Vishnu)",
    fastingMethod: "Phalahar",
    purpose: "Vishnu turns sides in his cosmic sleep; equals performing Ashwamedha and Vajapeya yajnas.",
    legendAndSignificance: "Commemorates Lord Vishnu's Vamana avatar who redeemed King Bali. Worshipping Vamana on this day cleanses sins accumulated over millions of lifetimes.",
    permittedFoods: ["Fruits", "Milk", "Singhara flour"],
    forbiddenFoods: ["Grains", "Rice"],
    vidhi: ["Offer curd, rice, and silver umbrella to Vamana idol or Brahmin."],
    paranaRules: "Dwadashi Parana.",
    rulesAndAvoid: ["No grain consumption"],
    keywords: ["parsva ekadashi", "parivartini ekadashi", "vamana ekadashi"],
    approxGregorianMonth: "August - September"
  },
  {
    id: "ekadashi-indira",
    name: "Indira Ekadashi",
    nameHindi: "इन्दिरा एकादशी",
    category: "ekadashi",
    tithiOrTiming: "Ashwin Krishna Ekadashi (Pitru Paksha)",
    hinduMonth: "Ashwin",
    paksha: "Krishna",
    deity: "Lord Shaligram / Vishnu",
    fastingMethod: "Phalahar",
    purpose: "Liberates departed ancestors (Pitrus) from lower realms and hellish suffering.",
    legendAndSignificance: "Observed during Pitru Paksha. King Indrasena's father had fallen to Yamaloka due to past deeds. By observing Indira Ekadashi and dedicating the merit to his father, the ancestor ascended to Vaikuntha.",
    permittedFoods: ["Fruits", "Milk", "Sendha namak"],
    forbiddenFoods: ["All grains", "Non-veg", "Alcohol"],
    vidhi: [
      "Morning bath, perform Shraddha/Tarpan for ancestors.",
      "Worship Shaligram, chant Vishnu Sahasranama.",
      "Take vow dedicating fast merit to departed forefathers.",
      "Feed cows, crows, and Brahmins on Dwadashi."
    ],
    paranaRules: "Parana on Dwadashi after feeding ancestors/Brahmin.",
    rulesAndAvoid: ["No celebrations; solemn ancestral reverence"],
    keywords: ["indira ekadashi", "pitru paksha ekadashi", "ancestor liberation"],
    approxGregorianMonth: "September - October"
  },
  {
    id: "ekadashi-papankusha",
    name: "Papankusha Ekadashi",
    nameHindi: "पापांकुशा एकादशी",
    category: "ekadashi",
    tithiOrTiming: "Ashwin Shukla Ekadashi",
    hinduMonth: "Ashwin",
    paksha: "Shukla",
    deity: "Lord Padmanabha (Vishnu)",
    fastingMethod: "Phalahar",
    purpose: "'Ankusha' (goad) to control and destroy sins; grants heavenly abode and long life.",
    legendAndSignificance: "Hunter Krodhana was destined for hell due to violent acts. Sage Angira advised Papankusha Ekadashi, completely purifying him before his passing.",
    permittedFoods: ["Fruits", "Milk", "Phalahari flours"],
    forbiddenFoods: ["Grains", "Rice"],
    vidhi: ["Worship Lord Padmanabha with gold or brass lamps, Tulsi leaves, and fragrant dhoop."],
    paranaRules: "Dwadashi Parana.",
    rulesAndAvoid: ["Avoid violence, harsh speech"],
    keywords: ["papankusha ekadashi", "ashwin shukla ekadashi"],
    approxGregorianMonth: "September - October"
  },
  {
    id: "ekadashi-rama",
    name: "Rama Ekadashi",
    nameHindi: "रमा एकादशी",
    category: "ekadashi",
    tithiOrTiming: "Kartik Krishna Ekadashi",
    hinduMonth: "Kartik",
    paksha: "Krishna",
    deity: "Lord Keshav (Vishnu) & Goddess Lakshmi",
    fastingMethod: "Phalahar",
    purpose: "Precedes Diwali; eradicates deep poverty, brings immense wealth and financial success.",
    legendAndSignificance: "Princess Chandrabhaga and Prince Shobhana observed Rama Ekadashi. Despite frail health, the fast elevated Shobhana to rule a celestial city (Devapur).",
    permittedFoods: ["Fruits", "Milk", "Makhana", "Kuttu"],
    forbiddenFoods: ["Grains", "Rice", "Lentils"],
    vidhi: ["Joint worship of Lord Vishnu and Goddess Lakshmi with Kheer and lotus flowers."],
    paranaRules: "Dwadashi Parana.",
    rulesAndAvoid: ["Avoid financial greed, deceit"],
    keywords: ["rama ekadashi", "kartik krishna ekadashi", "diwali ekadashi"],
    approxGregorianMonth: "October - November"
  },
  {
    id: "ekadashi-devutthana",
    name: "Devutthana (Prabodhini) Ekadashi",
    nameHindi: "देवउठनी (प्रबोधिनी) एकादशी",
    category: "ekadashi",
    tithiOrTiming: "Kartik Shukla Ekadashi",
    hinduMonth: "Kartik",
    paksha: "Shukla",
    deity: "Lord Vishnu & Tulsi Devi",
    fastingMethod: "Phalahar",
    purpose: "Lord Vishnu awakens from Chaturmas sleep; reopening of auspicious wedding season.",
    legendAndSignificance: "Also known as Devutthani. Sugarcane mandap is built at home, footprints of Vishnu are drawn, and Tulsi Vivah (wedding of Tulsi and Shaligram) is celebrated with jubilation.",
    permittedFoods: ["Sugarcane", "Singhara (water chestnuts)", "Sweet potato", "Fruits", "Milk"],
    forbiddenFoods: ["All grains", "Rice", "Garlic, onion"],
    vidhi: [
      "Draw sacred courtyard designs with Geru and lime.",
      "Offer water chestnut, sugarcane sticks, sweet potato, and radishes to Vishnu.",
      "Chant 'Uttishtha Govinda Tyaja Nidram Jagatpate'.",
      "Perform Tulsi Vivah with Shaligram."
    ],
    paranaRules: "Break fast next day on Dwadashi.",
    rulesAndAvoid: ["Chaturmas vows formally concluded"],
    keywords: ["devutthana ekadashi", "prabodhini", "tulsi vivah", "kartik shukla ekadashi"],
    approxGregorianMonth: "October - November"
  },
  {
    id: "ekadashi-utpanna",
    name: "Utpanna Ekadashi",
    nameHindi: "उत्पन्ना एकादशी",
    category: "ekadashi",
    tithiOrTiming: "Margashirsha Krishna Ekadashi",
    hinduMonth: "Margashirsha",
    paksha: "Krishna",
    deity: "Ekadashi Devi & Lord Vishnu",
    fastingMethod: "Phalahar",
    purpose: "Origin of the entire Ekadashi tradition. Cleanses thousands of lifetimes of sins.",
    legendAndSignificance: "Demon Mura was about to strike sleeping Vishnu when a radiant maiden manifested from Vishnu's body and annihilated the demon. Pleased, Vishnu named her Ekadashi and decreed that whoever observes her day will attain liberation.",
    permittedFoods: ["Fruits", "Milk", "Root vegetables"],
    forbiddenFoods: ["All grains", "Rice", "Pulses"],
    vidhi: ["Worship the Ekadashi deity and Vishnu, begin lifelong Ekadashi vow on this day."],
    paranaRules: "Dwadashi Parana.",
    rulesAndAvoid: ["Ideal starting day for beginners wanting to observe Ekadashi throughout their life"],
    keywords: ["utpanna ekadashi", "origin of ekadashi", "margashirsha krishna"],
    approxGregorianMonth: "November - December"
  },
  {
    id: "ekadashi-mokshada",
    name: "Mokshada Ekadashi (Gita Jayanti)",
    nameHindi: "मोक्षदा एकादशी (गीता जयंती)",
    category: "ekadashi",
    tithiOrTiming: "Margashirsha Shukla Ekadashi",
    hinduMonth: "Margashirsha",
    paksha: "Shukla",
    deity: "Lord Krishna (Vishnu)",
    fastingMethod: "Phalahar",
    purpose: "Liberation (Moksha) for ancestors and devotee; coincides with Gita Jayanti.",
    legendAndSignificance: "On this historic tithi in Kurukshetra, Lord Krishna revealed the Bhagavad Gita to Arjuna. King Vaikhanasa saved his father from hellish torture by observing Mokshada Ekadashi.",
    permittedFoods: ["Fruits", "Milk", "Sabudana", "Sendha namak"],
    forbiddenFoods: ["Grains", "Rice"],
    vidhi: ["Recite complete or chapters of Bhagavad Gita, worship Krishna with Tulsi and butter."],
    paranaRules: "Dwadashi Parana.",
    rulesAndAvoid: ["Reflect upon dharma, avoid negative conduct"],
    keywords: ["mokshada ekadashi", "gita jayanti", "margashirsha shukla ekadashi"],
    approxGregorianMonth: "November - December"
  },
  {
    id: "ekadashi-saphala",
    name: "Saphala Ekadashi",
    nameHindi: "सफला एकादशी",
    category: "ekadashi",
    tithiOrTiming: "Pausha Krishna Ekadashi",
    hinduMonth: "Pausha",
    paksha: "Krishna",
    deity: "Lord Narayana",
    fastingMethod: "Phalahar",
    purpose: "Makes every auspicious endeavor fruitful (Saphala); brings success in current ventures.",
    legendAndSignificance: "Lumbhaka, wayward son of King Mahishman, spent nights shivering under a banyan tree unwittingly observing this fast. Lord Narayana accepted his penance, restoring his princely state.",
    permittedFoods: ["Fruits", "Milk", "Singhara"],
    forbiddenFoods: ["Grains", "Rice"],
    vidhi: ["Offer Pomegranate, coconut, betel nuts to Narayana; night vigil with deepa dana."],
    paranaRules: "Dwadashi Parana.",
    rulesAndAvoid: ["Avoid lethargy and doubt"],
    keywords: ["saphala ekadashi", "pausha krishna ekadashi"],
    approxGregorianMonth: "December - January"
  },
  {
    id: "ekadashi-putrada-pausha",
    name: "Pausha Putrada Ekadashi",
    nameHindi: "पौष पुत्रदा एकादशी",
    category: "ekadashi",
    tithiOrTiming: "Pausha Shukla Ekadashi",
    hinduMonth: "Pausha",
    paksha: "Shukla",
    deity: "Lord Vishnu",
    fastingMethod: "Phalahar",
    purpose: "Blessings of a child, protection of progeny, eradication of ancestral sorrow.",
    legendAndSignificance: "King Suketuman and Queen Shaibya grieved without children. By observing Pausha Putrada Ekadashi on sage advice, they were blessed with a righteous successor.",
    permittedFoods: ["Fruits", "Milk", "Kuttu", "Sendha namak"],
    forbiddenFoods: ["All grains", "Rice"],
    vidhi: ["Both partners observe fast, offering yellow clothes and panchamrit to Vishnu."],
    paranaRules: "Dwadashi Parana.",
    rulesAndAvoid: ["Avoid conflict, maintain pure intent"],
    keywords: ["pausha putrada ekadashi", "pausha shukla ekadashi"],
    approxGregorianMonth: "December - January"
  },
  {
    id: "ekadashi-shattila",
    name: "Shattila Ekadashi",
    nameHindi: "षट्तिला एकादशी",
    category: "ekadashi",
    tithiOrTiming: "Magha Krishna Ekadashi",
    hinduMonth: "Magha",
    paksha: "Krishna",
    deity: "Lord Vishnu",
    fastingMethod: "Phalahar",
    purpose: "Removes poverty; involves 6 sacred uses of sesame (Til).",
    legendAndSignificance: "A pious woman gave wealth in charity but never donated food. To overcome spiritual hunger in heaven, Sage Vashistha revealed the secret 6-fold use of sesame on Shattila Ekadashi.",
    permittedFoods: ["Sesame (Til) preparations", "Fruits", "Milk", "Sendha namak"],
    forbiddenFoods: ["Grains", "Rice"],
    vidhi: [
      "1. Til Snan (Sesame bath)",
      "2. Til Ubtan (Sesame body paste)",
      "3. Til Havan (Sesame oblation in fire)",
      "4. Til Tarpan (Sesame water offering)",
      "5. Til Bhojan (Sesame food intake)",
      "6. Til Daan (Sesame charity to the needy)"
    ],
    paranaRules: "Break fast next morning on Dwadashi.",
    rulesAndAvoid: ["Do not omit donating sesame seeds"],
    keywords: ["shattila ekadashi", "magha krishna ekadashi", "sesame fast"],
    approxGregorianMonth: "January - February"
  },
  {
    id: "ekadashi-jaya",
    name: "Jaya (Bhaimi) Ekadashi",
    nameHindi: "जया (भैमी) एकादशी",
    category: "ekadashi",
    tithiOrTiming: "Magha Shukla Ekadashi",
    hinduMonth: "Magha",
    paksha: "Shukla",
    deity: "Lord Vishnu",
    fastingMethod: "Phalahar",
    purpose: "Freedom from fear of ghosts/spirits, victory (Jaya) over obstacles and enemies.",
    legendAndSignificance: "Malyavan and Pushyavati were cursed by Indra to become Pishachas (ghostly beings). By freezing on Jaya Ekadashi and staying without food, their curse shattered, restoring their divine bodies.",
    permittedFoods: ["Fruits", "Milk", "Sabudana"],
    forbiddenFoods: ["Grains", "Rice"],
    vidhi: ["Worship Vishnu with Tulsi and yellow flowers, night vigil."],
    paranaRules: "Dwadashi Parana.",
    rulesAndAvoid: ["Avoid lustful thoughts"],
    keywords: ["jaya ekadashi", "bhaimi ekadashi", "magha shukla ekadashi"],
    approxGregorianMonth: "January - February"
  },
  {
    id: "ekadashi-vijaya",
    name: "Vijaya Ekadashi",
    nameHindi: "विजया एकादशी",
    category: "ekadashi",
    tithiOrTiming: "Phalguna Krishna Ekadashi",
    hinduMonth: "Phalguna",
    paksha: "Krishna",
    deity: "Lord Vishnu",
    fastingMethod: "Phalahar",
    purpose: "Guarantees victory in high-stakes, difficult endeavors, lawsuits, and competitions.",
    legendAndSignificance: "Lord Sri Rama observed Vijaya Ekadashi on Sage Bakadalbhya's counsel before constructing the bridge to Lanka, successfully conquering Ravana.",
    permittedFoods: ["Fruits", "Milk", "Singhara"],
    forbiddenFoods: ["Grains", "Rice"],
    vidhi: ["Install 7-grain Kalasha with copper vessel, worship Vishnu with devotion."],
    paranaRules: "Dwadashi Parana after morning puja.",
    rulesAndAvoid: ["Avoid cowardice, maintain unshakable faith"],
    keywords: ["vijaya ekadashi", "phalguna krishna ekadashi", "ram lanka victory"],
    approxGregorianMonth: "February - March"
  },
  {
    id: "ekadashi-amalaki",
    name: "Amalaki Ekadashi",
    nameHindi: "आमलकी एकादशी",
    category: "ekadashi",
    tithiOrTiming: "Phalguna Shukla Ekadashi",
    hinduMonth: "Phalguna",
    paksha: "Shukla",
    deity: "Lord Vishnu & Amla Tree",
    fastingMethod: "Phalahar",
    purpose: "Health, longevity, absolute destruction of sin through veneration of the holy Amla tree.",
    legendAndSignificance: "Amla tree manifested from Vishnu's teardrop of divine ecstasy during cosmic creation. Worshipping the Amla tree on this day grants liberation equal to donating a thousand cows.",
    permittedFoods: ["Amla (Indian gooseberry)", "Fruits", "Milk", "Sendha namak"],
    forbiddenFoods: ["All grains", "Rice"],
    vidhi: ["Circumambulate and worship an Amla tree with water, chandan, flowers, and deepa."],
    paranaRules: "Dwadashi Parana.",
    rulesAndAvoid: ["Do not damage Amla tree; consume Amla prasad"],
    keywords: ["amalaki ekadashi", "amla tree fast", "phalguna shukla ekadashi"],
    approxGregorianMonth: "February - March"
  },
  {
    id: "ekadashi-padmini",
    name: "Padmini Ekadashi (Adhik Maas Shukla)",
    nameHindi: "पद्मिनी एकादशी (अधिक मास शुक्ल)",
    category: "ekadashi",
    tithiOrTiming: "Adhik Maas Shukla Ekadashi (Once every 2-3 years)",
    hinduMonth: "Adhik Maas",
    paksha: "Shukla",
    deity: "Lord Purushottama (Vishnu)",
    fastingMethod: "Phalahar",
    purpose: "Rare leap-year Ekadashi. Grants spiritual merit multiplying ordinary fasts a hundredfold.",
    legendAndSignificance: "King Kartavirya Arjuna's mother Padmini observed this rare Adhik Maas Ekadashi on Sage Anasuya's guidance, blessing her son with invincible celestial might.",
    permittedFoods: ["Fruits", "Milk", "Phalahari flours"],
    forbiddenFoods: ["Grains", "Rice", "Lentils"],
    vidhi: ["Purushottama worship with continuous Gita chanting."],
    paranaRules: "Dwadashi Parana.",
    rulesAndAvoid: ["Adhik Maas special sanctity"],
    keywords: ["padmini ekadashi", "adhik maas ekadashi", "purushottama ekadashi"],
    approxGregorianMonth: "Periodic Adhik Maas"
  },
  {
    id: "ekadashi-parama",
    name: "Parama Ekadashi (Adhik Maas Krishna)",
    nameHindi: "परमा एकादशी (अधिक मास कृष्ण)",
    category: "ekadashi",
    tithiOrTiming: "Adhik Maas Krishna Ekadashi (Once every 2-3 years)",
    hinduMonth: "Adhik Maas",
    paksha: "Krishna",
    deity: "Lord Vishnu & Kubera",
    fastingMethod: "Phalahar",
    purpose: "Supreme (Parama) financial redemption; eradicates chronic generational poverty.",
    legendAndSignificance: "Brahmin Sumedha and his chaste wife Pavitra were impoverished. On Sage Kaundinya's counsel, they observed Parama Ekadashi, and Kubera blessed them with unending wealth.",
    permittedFoods: ["Fruits", "Milk", "Water"],
    forbiddenFoods: ["Grains", "Rice"],
    vidhi: ["Perform 5-day Pancha Ratri fast or single day Parama fast with gold/cow donation intent."],
    paranaRules: "Dwadashi Parana.",
    rulesAndAvoid: ["Patience and non-violence"],
    keywords: ["parama ekadashi", "adhik maas krishna", "kubera wealth fast"],
    approxGregorianMonth: "Periodic Adhik Maas"
  }
];

// -------------------------------------------------------------
// PART FOUR: ALL 7 PRADOSH VRATS BY WEEKDAY
// -------------------------------------------------------------
export const ALL_7_PRADOSHS: VratItem[] = [
  {
    id: "pradosh-soma",
    name: "Soma Pradosh (Monday)",
    nameHindi: "सोम प्रदोष व्रत (सोमवार)",
    category: "pradosh",
    tithiOrTiming: "Trayodashi falling on Monday (Twilight / Pradosh Kaal)",
    deity: "Lord Shiva & Mata Parvati",
    fastingMethod: "Ekasana",
    purpose: "Fulfilling deep heart desires, mental peace, resolving marriage hurdles, domestic joy.",
    legendAndSignificance: "Monday is Shiva's own day. When combined with Trayodashi pradosh kaal (45 min before to 45 min after sunset), Shiva performs the Ananda Tandava dance of supreme bliss.",
    permittedFoods: ["Fruits", "Milk", "Single sattvic meal after evening puja"],
    forbiddenFoods: ["Grains before dusk", "Onion, garlic", "Non-veg", "Alcohol"],
    vidhi: [
      "Day-long fast with pure devotion.",
      "Pradosh Kaal Puja (sunset): Shiva Abhishek with milk, honey, Ganga jal.",
      "Offer Bilva leaves and chant 'Om Namah Shivaya'.",
      "Listen to Soma Pradosh Katha and perform Aarti."
    ],
    paranaRules: "Break fast in the evening after Pradosh Kaal Shiva Puja.",
    rulesAndAvoid: ["Do not eat solid meals before sunset"],
    keywords: ["soma pradosh", "monday pradosh", "shiva pradosh kaal"]
  },
  {
    id: "pradosh-bhauma",
    name: "Bhauma / Mangala Pradosh (Tuesday)",
    nameHindi: "भौम / मंगल प्रदोष व्रत (मंगलवार)",
    category: "pradosh",
    tithiOrTiming: "Trayodashi falling on Tuesday",
    deity: "Lord Shiva & Lord Hanuman",
    fastingMethod: "Ekasana",
    purpose: "Rin Mukti (freedom from heavy debt) and Rog Mukti (freedom from chronic disease).",
    legendAndSignificance: "Bhauma (Mars) coupled with Shiva's grace dispels financial strangulation and cures physical illnesses. Highly effective for business revival.",
    permittedFoods: ["Fruits, milk, evening sattvic meal without sour items"],
    forbiddenFoods: ["Non-veg, alcohol, heavy grains before dusk"],
    vidhi: ["Sunset Shiva Abhishek, recitation of Rin Mukti Mangal Stotra and Shiva Tandava Stotram."],
    paranaRules: "Break fast after dusk puja.",
    rulesAndAvoid: ["Avoid taking new loans on this day"],
    keywords: ["bhauma pradosh", "mangala pradosh", "debt relief fast"]
  },
  {
    id: "pradosh-budh",
    name: "Budh Pradosh (Wednesday)",
    nameHindi: "बुध प्रदोष व्रत (बुधवार)",
    category: "pradosh",
    tithiOrTiming: "Trayodashi falling on Wednesday",
    deity: "Lord Shiva & Lord Ganesha",
    fastingMethod: "Ekasana",
    purpose: "Wish-fulfillment, success in trade/education/communication, sharp intellect.",
    legendAndSignificance: "Budha aligns speech and wisdom. Shiva worship on Wednesday Pradosh dissolves communication barriers and legal disputes.",
    permittedFoods: ["Fruits, milk, green vegetables in single evening meal"],
    forbiddenFoods: ["Onion, garlic, non-veg"],
    vidhi: ["Offer green moong and Bilva leaves to Shiva Linga during sunset pradosh kaal."],
    paranaRules: "Evening meal after Aarti.",
    rulesAndAvoid: ["Honest speech, avoid deceit"],
    keywords: ["budh pradosh", "wednesday pradosh"]
  },
  {
    id: "pradosh-guru",
    name: "Guru Pradosh (Thursday)",
    nameHindi: "गुरु प्रदोष व्रत (गुरुवार)",
    category: "pradosh",
    tithiOrTiming: "Trayodashi falling on Thursday",
    deity: "Lord Shiva & Lord Brihaspati",
    fastingMethod: "Ekasana",
    purpose: "Destruction of hidden enemies, relief from court cases, boundless prosperity and wisdom.",
    legendAndSignificance: "Combines the divine knowledge of Jupiter with the transcendental power of Mahadeva. Highly revered by scholars and officials.",
    permittedFoods: ["Yellow fruits, milk, salt-free yellow meal after dusk"],
    forbiddenFoods: ["Salt before puja, non-veg, onion"],
    vidhi: ["Offer yellow flowers, chandan, and honey to Shiva Linga during pradosh kaal."],
    paranaRules: "Break fast after sunset puja.",
    rulesAndAvoid: ["Avoid salt if possible"],
    keywords: ["guru pradosh", "thursday pradosh", "court case victory fast"]
  },
  {
    id: "pradosh-shukra",
    name: "Shukra Pradosh (Friday)",
    nameHindi: "शुक्र प्रदोष व्रत (शुक्रवार)",
    category: "pradosh",
    tithiOrTiming: "Trayodashi falling on Friday",
    deity: "Lord Shiva & Mata Gauri (Lakshmi)",
    fastingMethod: "Ekasana",
    purpose: "Marital happiness, romance, prosperity, beauty, and peaceful relationship fulfillment.",
    legendAndSignificance: "Friday Pradosh invokes the combined blessings of Shiva-Shakti for harmony, removing bitterness between spouses.",
    permittedFoods: ["Sweet dishes, kheer, fruits, milk"],
    forbiddenFoods: ["Sour items, onion, garlic"],
    vidhi: ["Worship Shiva-Parvati with white flowers and sweet milk abhishek at dusk."],
    paranaRules: "Evening sweet meal.",
    rulesAndAvoid: ["Avoid harsh words with partner"],
    keywords: ["shukra pradosh", "friday pradosh", "marriage harmony fast"]
  },
  {
    id: "pradosh-shani",
    name: "Shani Pradosh (Saturday)",
    nameHindi: "शनि प्रदोष व्रत (शनिवार)",
    category: "pradosh",
    tithiOrTiming: "Trayodashi falling on Saturday",
    deity: "Lord Shiva & Shani Dev",
    fastingMethod: "Ekasana",
    purpose: "The most powerful of all Pradoshs. Instant relief from Sade Sati, Shani Dosha, childless couples blessed.",
    legendAndSignificance: "According to Shiva Purana, Shani Dev attained his celestial planetary status by worshipping Shiva on Trayodashi. Shani Pradosh is considered infallible for removing catastrophic bad luck.",
    permittedFoods: ["Fruits, milk, evening meal with black sesame (Til)"],
    forbiddenFoods: ["Non-veg, alcohol, oily street food"],
    vidhi: [
      "Full day fast.",
      "Pradosh Kaal (sunset): Rudrabhishek with mustard oil/milk and black sesame on Shiva Linga.",
      "Recite Maha Mrityunjaya Mantra 108 times and Shiva Chalisa.",
      "Donate black umbrella or food to laborers."
    ],
    paranaRules: "Break fast after Pradosh Kaal Shiva and Shani puja.",
    rulesAndAvoid: ["Respect elders, avoid cruelty"],
    keywords: ["shani pradosh", "saturday pradosh", "sade sati remedy", "most powerful pradosh"]
  },
  {
    id: "pradosh-ravi",
    name: "Ravi Pradosh (Sunday)",
    nameHindi: "रवि प्रदोष व्रत (रविवार)",
    category: "pradosh",
    tithiOrTiming: "Trayodashi falling on Sunday",
    deity: "Lord Shiva & Surya Dev",
    fastingMethod: "Ekasana",
    purpose: "Long life, vigorous health, vitality, freedom from disease, prestige and father's wellbeing.",
    legendAndSignificance: "Sunday Pradosh balances solar and lunar currents in the human nadi system, bestowing radiant vitality and physical cure.",
    permittedFoods: ["Fruits, milk, salt-free evening meal"],
    forbiddenFoods: ["Salt (preferred), non-veg, onion"],
    vidhi: ["Sunset Shiva Abhishek with honey and water; chant Aditya Hridaya and Om Namah Shivaya."],
    paranaRules: "Break fast after evening puja.",
    rulesAndAvoid: ["Avoid salt if maintaining strict vow"],
    keywords: ["ravi pradosh", "sunday pradosh", "health longevity fast"]
  }
];

// -------------------------------------------------------------
// PART FIVE: MAHA SHIVRATRI COMPREHENSIVE
// -------------------------------------------------------------
export const MAHA_SHIVRATRI_DATA: VratItem = {
  id: "maha-shivratri",
  name: "Maha Shivratri (Grand Night of Shiva)",
  nameHindi: "महाशिवरात्रि (भगवान शिव का महापर्व)",
  category: "maha_shivratri",
  tithiOrTiming: "Phalguna Krishna Chaturdashi (Night-centered, Nishita Kaal)",
  hinduMonth: "Phalguna",
  paksha: "Krishna",
  deity: "Lord Shiva (Neelkanth / Mahadeva) & Mata Parvati",
  fastingMethod: "Nirjala",
  purpose: "Dissolution of all accumulated sins, spiritual liberation (Moksha), marital bliss (ideal spouse), supreme consciousness.",
  legendAndSignificance: "The great cosmic night celebrating Shiva's cosmic dance of creation and dissolution (Tandava), the divine wedding of Shiva and Parvati, and Shiva drinking the deadly Halahala poison to save the universe during Samudra Manthan.",
  permittedFoods: ["Nirjala (preferred by devoted) or Phalahar (Fruits, Milk, Thandai, Makhana, Sabudana, Sendha namak)"],
  forbiddenFoods: ["All grains", "Lentils", "Onion, garlic", "Non-veg", "Alcohol"],
  vidhi: [
    "1st Prahar (6 PM - 9 PM): Milk Abhishek (दूध अभिषेक), offering white flowers and Bilva leaves.",
    "2nd Prahar (9 PM - 12 AM): Curd Abhishek (दही अभिषेक), chanting Rudri path.",
    "3rd Prahar / Nishita Kaal (12 AM - 3 AM): Ghee Abhishek (घी अभिषेक), Maha Mrityunjaya Mantra chanting.",
    "4th Prahar (3 AM - 6 AM): Honey Abhishek (शहद अभिषेक) & Sugarcane juice, complete Panchamrit Snan.",
    "Offer Bilva patra (Bael leaves), Dhatura, Bhasma (sacred ash), and Chandan.",
    "Perform Akhand Jagran (all-night vigil) with devotional kirtan and meditation."
  ],
  paranaRules: "Parana is performed the following morning on Amavasya shortly after sunrise, after concluding 4th prahar puja.",
  rulesAndAvoid: ["Do not offer Tulsi or Ketaki flowers to Shiva Linga", "No sleeping throughout the night for full merit"],
  keywords: ["maha shivratri", "char prahar puja", "nishita kaal shivratri", "shiva ratri fasting"],
  approxGregorianMonth: "February - March"
};

// -------------------------------------------------------------
// PART SIX & SEVEN: MAJOR DEITY, FESTIVAL & SPECIAL OCCASION VRATS
// -------------------------------------------------------------
export const MAJOR_AND_SPECIAL_VRATS: VratItem[] = [
  {
    id: "vrat-chaitra-navratri",
    name: "Chaitra Navratri",
    nameHindi: "चैत्र नवरात्रि (९ दिवसीय शक्ति साधना)",
    category: "major_deity",
    tithiOrTiming: "Chaitra Shukla Pratipada to Navami",
    hinduMonth: "Chaitra",
    paksha: "Shukla",
    deity: "Navadurga (9 forms of Goddess Durga)",
    fastingMethod: "Phalahar",
    purpose: "Spiritual renewal, beginning of Hindu Lunar New Year, vitality, culmination in Ram Navami.",
    legendAndSignificance: "Marks the creation of the cosmos by Maa Adishakti and celebration of the nine divine manifestations: Shailaputri, Brahmacharini, Chandraghanta, Kushmanda, Skandamata, Katyayani, Kalaratri, Mahagauri, Siddhidatri.",
    permittedFoods: ["Kuttu, Singhara, Sabudana, Samak rice, Fruits, Milk, Sendha namak"],
    forbiddenFoods: ["Grains, Wheat, Rice, Onion, Garlic, Non-veg"],
    vidhi: ["Ghatasthapana on Pratipada, daily Akhand Jyoti, Durga Saptashati recitation, Kanya Pujan on Ashtami/Navami."],
    paranaRules: "Parana on Dashami morning after completing Kanya Pujan.",
    rulesAndAvoid: ["Strict cleanliness, no haircut/shaving for 9 days"],
    keywords: ["chaitra navratri", "nine days durga fast", "ghatasthapana"]
  },
  {
    id: "vrat-sharad-navratri",
    name: "Sharad Navratri",
    nameHindi: "शारदीय नवरात्रि (महा दुर्गा पूजा)",
    category: "major_deity",
    tithiOrTiming: "Ashwin Shukla Pratipada to Navami",
    hinduMonth: "Ashwin",
    paksha: "Shukla",
    deity: "Maa Durga (Mahishasura Mardini)",
    fastingMethod: "Phalahar",
    purpose: "Triumph of divine good over demonic forces, strength, protection, culmination in Dussehra.",
    legendAndSignificance: "Commemorates Goddess Durga battling and annihilating the demon Mahishasura over 9 days, and Lord Rama worshipping Chandi before slaying Ravana.",
    permittedFoods: ["Kuttu, Singhara, Sabudana, Samak rice, Fruits, Sendha namak"],
    forbiddenFoods: ["All grains, Wheat, Regular rice, Onion, Garlic, Alcohol"],
    vidhi: ["Kalash Sthapana, Akhand Deepa, daily recitation of 700 verses of Devi Mahatmyam, Kanya Pujan."],
    paranaRules: "Parana on Vijayadashami (Dussehra).",
    rulesAndAvoid: ["Avoid tamasic entertainment, anger, and ego"],
    keywords: ["sharad navratri", "durga puja fast", "devi mahatmyam"]
  },
  {
    id: "vrat-karva-chauth",
    name: "Karva Chauth",
    nameHindi: "करवा चौथ (अखंड सौभाग्य व्रत)",
    category: "major_deity",
    tithiOrTiming: "Kartik Krishna Chaturthi",
    hinduMonth: "Kartik",
    paksha: "Krishna",
    deity: "Goddess Karva, Mata Gauri & Lord Shiva",
    fastingMethod: "Nirjala",
    purpose: "Husband's longevity, marital protection, lifelong unbreakable bond.",
    legendAndSignificance: "Observed with great devotion by married women. Traces to Queen Veeravati and Savitri. Pre-dawn Sargi is eaten before sunrise; no water is consumed until the moon is sighted.",
    permittedFoods: ["Pre-dawn Sargi before sunrise; Nirjala throughout day until moonrise"],
    forbiddenFoods: ["No food or water between sunrise and moonrise"],
    vidhi: [
      "Consume Sargi provided by mother-in-law before sunrise.",
      "Observe waterless Nirjala vow throughout the day.",
      "Evening Karva Chauth katha with women singing traditional songs and rotating the Karva.",
      "At moonrise, view the moon through a sieve (Chhalni), offer Arghya to the moon.",
      "View husband's face through the sieve; husband offers first sip of water and bite of sweet."
    ],
    paranaRules: "Break fast immediately after moon sighting and husband offering water.",
    rulesAndAvoid: ["Do not weave or use scissors/needles on this day", "Do not wear dark black/white clothes"],
    keywords: ["karva chauth vidhi", "karva chauth fasting", "sargi moonrise"]
  },
  {
    id: "vrat-hartalika-teej",
    name: "Hartalika Teej",
    nameHindi: "हरतालिका तीज (गौरी-शंकर अखंड तपस्या)",
    category: "major_deity",
    tithiOrTiming: "Bhadrapada Shukla Tritiya",
    hinduMonth: "Bhadrapada",
    paksha: "Shukla",
    deity: "Goddess Parvati & Lord Shiva",
    fastingMethod: "Nirjala",
    purpose: "Ideal spouse for unmarried women; lifelong marital bliss and husband's longevity for married women.",
    legendAndSignificance: "'Harat' (abducted) and 'Aalika' (female friend). Parvati's friend helped her hide in dense forests to perform supreme penance, securing Shiva as her husband.",
    permittedFoods: ["Strictly Nirjala (waterless for 24+ hours). Modification allowed only for pregnant/ill."],
    forbiddenFoods: ["No food or water"],
    vidhi: ["Create clay idols of Shiva-Parvati, perform night-long puja and kirtan without sleeping."],
    paranaRules: "Break fast the following morning after giving away clay idols and completing Parana puja.",
    rulesAndAvoid: ["No water intake, no daytime or night sleep (Ratri Jagran)"],
    keywords: ["hartalika teej", "teej nirjala fast", "parvati penance"]
  },
  {
    id: "vrat-vat-savitri",
    name: "Vat Savitri Vrat",
    nameHindi: "वट सावित्री व्रत (सती सावित्री एवं बरगद पूजा)",
    category: "major_deity",
    tithiOrTiming: "Jyeshtha Amavasya / Purnima",
    hinduMonth: "Jyeshtha",
    paksha: "Krishna",
    deity: "Savitri, Satyavan & Banyan Tree (Vat Vriksha)",
    fastingMethod: "Nirjala",
    purpose: "Husband's longevity; saves husband from untimely death and severe health danger.",
    legendAndSignificance: "Devoted Savitri followed Yama (God of Death) and through her profound intellect and chastity, forced Yama to return the soul of her deceased husband Satyavan beneath a banyan tree.",
    permittedFoods: ["Soaked raw chickpeas (Chana), fruits, wet grains after puja"],
    forbiddenFoods: ["Grains before puja, non-veg"],
    vidhi: [
      "Tie raw red/yellow cotton thread around the sacred Banyan tree trunk 108 times.",
      "Offer soaked black gram, fruits, and sindoor to the tree.",
      "Listen to Savitri-Satyavan Katha."
    ],
    paranaRules: "Swallow 7 sprouted chickpeas with water after banyan tree pradakshina.",
    rulesAndAvoid: ["Do not disrespect elders; maintain steadfast faith"],
    keywords: ["vat savitri vrat", "banyan tree worship", "savitri satyavan"]
  },
  {
    id: "vrat-ahoi-ashtami",
    name: "Ahoi Ashtami",
    nameHindi: "अहोई अष्टमी (संतान दीर्घायु व्रत)",
    category: "major_deity",
    tithiOrTiming: "Kartik Krishna Ashtami",
    hinduMonth: "Kartik",
    paksha: "Krishna",
    deity: "Goddess Ahoi Mata (Maa Parvati)",
    fastingMethod: "Nirjala",
    purpose: "Longevity, health, prosperity, and spiritual shield for sons and children.",
    legendAndSignificance: "A woman accidentally struck a porcupine cub with a spade while digging soil, suffering the loss of her children. By observing Ahoi Ashtami fast with sincere repentance, her children were blessed with life and health.",
    permittedFoods: ["Water and sattvic meal only after star-sighting in the evening"],
    forbiddenFoods: ["No food or water during the day"],
    vidhi: [
      "Paint image of Ahoi Mata with 8 corners, cubs (Syahu), and Sun/Moon on the wall.",
      "Fast through the day without water.",
      "In the evening, offer Arghya to the stars (or Moon) using a silver Karva.",
      "Wear silver Ahoi necklace (Syahu beads) with silk thread."
    ],
    paranaRules: "Break fast after seeing evening stars and offering water Arghya.",
    rulesAndAvoid: ["Do not cut soil or use sharp knives on this day", "Quiet private worship variation for grieving mothers"],
    keywords: ["ahoi ashtami", "mother fasting for children", "syahu silver beads"]
  },
  {
    id: "vrat-chhath-puja",
    name: "Chhath Puja (Maha Parva)",
    nameHindi: "छठ पूजा (सूर्य षष्ठी महापर्व - ३६ घंटे निर्जला)",
    category: "major_deity",
    tithiOrTiming: "Kartik Shukla Chaturthi to Saptami (4 Days)",
    hinduMonth: "Kartik",
    paksha: "Shukla",
    deity: "Surya Dev (Sun God) & Chhathi Maiya (Usha & Pratyusha)",
    fastingMethod: "Nirjala",
    purpose: "Family health, eradication of leprosy/skin disease, children's prosperity, supreme spiritual purity.",
    legendAndSignificance: "The most arduous 4-day Vedic austerity. Direct veneration of the visible Sun God and his cosmic life-giving rays. Traces back to Draupadi, Karna, and Sita.",
    permittedFoods: ["Day 1: Nahay Khay (Gourd & Rice)", "Day 2: Kharna (Kheer & Roti in evening)", "Day 3 & 4: 36-hour unbroken Nirjala fast"],
    forbiddenFoods: ["Strictly NO food or water during the 36-hour Nirjala window"],
    vidhi: [
      "Day 1 (Nahay-Khay): Holy bath in river, single meal of bottle gourd and rice cooked on mango wood.",
      "Day 2 (Kharna): Fast all day, eat Gur Kheer in the evening, 36-hour Nirjala begins.",
      "Day 3 (Sandhya Arghya): Stand waist-deep in water holding Soop of Thekua, sugarcane, and fruits; offer Arghya to setting sun.",
      "Day 4 (Usha Arghya): Offer morning Arghya to rising sun in water; distribute Thekua prasad and break fast."
    ],
    paranaRules: "Parana on Day 4 after morning sunrise Arghya with raw ginger, jaggery, and water.",
    rulesAndAvoid: ["Absolute ritual purity; no touching prasad without bath; clean copper/brass utensils only"],
    keywords: ["chhath puja", "surya arghya", "thekua", "chhathi maiya", "36 hour fast"]
  },
  {
    id: "vrat-sankashti-chaturthi",
    name: "Sankashti Chaturthi (Monthly)",
    nameHindi: "संकष्टी चतुर्थी व्रत (संकट हरण)",
    category: "monthly_recurring",
    tithiOrTiming: "Krishna Paksha Chaturthi (Monthly)",
    deity: "Lord Ganesha (Vighnaharta)",
    fastingMethod: "Phalahar",
    purpose: "Immediate removal of severe crises (Sankat), obstacles in career and personal life.",
    legendAndSignificance: "Recur every month on waning 4th tithi. When falling on Tuesday, it becomes Angarki Chaturthi, considered 100 times more potent.",
    permittedFoods: ["Fruits, milk, sabudana, single sattvic meal after moonrise"],
    forbiddenFoods: ["Grains before moonrise, onion, garlic"],
    vidhi: ["Fast all day, recite Ganesha Sankat Nashan Stotra, offer 21 Durva, view moon at night and offer Arghya."],
    paranaRules: "Break fast after viewing moon and offering Arghya with raw milk and water.",
    rulesAndAvoid: ["Do not consume food before sighting the moon"],
    keywords: ["sankashti chaturthi", "angarki chaturthi", "ganesha moonrise fast"]
  },
  {
    id: "vrat-janmashtami",
    name: "Krishna Janmashtami",
    nameHindi: "श्री कृष्ण जन्माष्टमी (मध्यरात्रि जन्मोत्सव)",
    category: "major_deity",
    tithiOrTiming: "Bhadrapada Krishna Ashtami (Midnight)",
    hinduMonth: "Bhadrapada",
    paksha: "Krishna",
    deity: "Lord Sri Krishna (Bal Gopal / Yogeshwara)",
    fastingMethod: "Nirjala",
    purpose: "Blessing of devotion (Bhakti), spiritual joy, progeny, freedom from birth-death cycle.",
    legendAndSignificance: "Celebrates Lord Krishna manifesting at midnight in the prison cell of Mathura to destroy tyranny and establish Dharma.",
    permittedFoods: ["Phalahar or Nirjala until midnight. Break with Makhan-Mishri and Dhaniya Panjiri prasad."],
    forbiddenFoods: ["All grains, non-veg, onion, garlic"],
    vidhi: [
      "Fast through the day.",
      "Decorate Bal Gopal in swing (Jhula), prepare 56 Bhog (Chhappan Bhog).",
      "Perform midnight Abhishek with Panchamrit at 12:00 AM.",
      "Offer Makhan-Mishri, chant Hare Krishna Mahamantra."
    ],
    paranaRules: "Break fast after midnight puja and Aarti with Makhan-Mishri prasad.",
    rulesAndAvoid: ["No grain intake until following day morning for strict Vaishnavas"],
    keywords: ["janmashtami", "krishna birth fast", "makhan mishri", "panjiri"]
  },
  {
    id: "vrat-ram-navami",
    name: "Ram Navami",
    nameHindi: "श्री राम नवमी (मध्याह्न जन्मोत्सव)",
    category: "major_deity",
    tithiOrTiming: "Chaitra Shukla Navami (Midday - 12:00 PM)",
    hinduMonth: "Chaitra",
    paksha: "Shukla",
    deity: "Maryada Purushottam Lord Sri Rama",
    fastingMethod: "Phalahar",
    purpose: "Righteousness, peace, moral strength, fulfillment of noble desires.",
    legendAndSignificance: "Appearance of Lord Rama at noon in Ayodhya on the final day of Chaitra Navratri. Sun shines directly overhead with supreme auspiciousness.",
    permittedFoods: ["Fruits, milk, Kuttu/Singhara prasad"],
    forbiddenFoods: ["Grains, non-veg"],
    vidhi: ["Perform Ram Janmotsav at 12:00 PM noon with Panjiri prasad and Ramcharitmanas recitation."],
    paranaRules: "Break fast in afternoon after midday Aarti.",
    rulesAndAvoid: ["Conclude Chaitra Navratri with reverence"],
    keywords: ["ram navami", "lord rama birth", "chaitra navami"]
  },
  {
    id: "vrat-vasant-panchami",
    name: "Vasant Panchami (Saraswati Puja)",
    nameHindi: "बसंत पंचमी (माँ सरस्वती पूजन)",
    category: "special_occasion",
    tithiOrTiming: "Magha Shukla Panchami",
    hinduMonth: "Magha",
    paksha: "Shukla",
    deity: "Goddess Saraswati (Vidya Dayini)",
    fastingMethod: "Ekasana",
    purpose: "Intellect, artistic mastery, speech eloquence, academic excellence.",
    legendAndSignificance: "Appearance of Goddess Saraswati on earth bringing sound, music, and divine knowledge to creation.",
    permittedFoods: ["Yellow sweet rice (Kesari Bhaat), Boondi, fruits, milk"],
    forbiddenFoods: ["Non-veg, alcohol, tamasic items"],
    vidhi: ["Wear yellow attire, place books, musical instruments, pens at Devi's feet, chant Saraswati Vandana."],
    paranaRules: "Break fast in afternoon with yellow prasad.",
    rulesAndAvoid: ["Do not step on books or writing tools"],
    keywords: ["vasant panchami", "saraswati puja", "yellow rice"]
  },
  {
    id: "vrat-varalakshmi",
    name: "Varalakshmi Vrat",
    nameHindi: "वरलक्ष्मी व्रत (अष्टलक्ष्मी वरदान)",
    category: "special_occasion",
    tithiOrTiming: "Friday preceding Shravan Purnima",
    hinduMonth: "Shravan",
    paksha: "Shukla",
    deity: "Goddess Varalakshmi (Boon-Granting Lakshmi)",
    fastingMethod: "Ekasana",
    purpose: "Grants blessings of all 8 Lakshmis (Ashtalakshmi) in a single observance.",
    legendAndSignificance: "Extremely sacred in South India. Goddess Parvati taught this vow to Charumati, who was blessed with immense prosperity and family harmony.",
    permittedFoods: ["Sattvic sweets, coconut, fruits, single evening meal"],
    forbiddenFoods: ["Non-veg, onion, garlic"],
    vidhi: ["Install decorated Kalasha with coconut and gold/silver face of Lakshmi, tie sacred Raksha thread."],
    paranaRules: "Evening meal after Varalakshmi Aarti.",
    rulesAndAvoid: ["Women perform with golden/silk ornaments"],
    keywords: ["varalakshmi vrat", "south indian lakshmi fast", "ashtalakshmi"]
  },
  {
    id: "vrat-solah-shukravar",
    name: "Solah Shukravar Vrat (Santoshi Maa)",
    nameHindi: "सोलह शुक्रवार व्रत (माँ संतोषी मनोकामना सिद्धि)",
    category: "major_deity",
    tithiOrTiming: "16 Consecutive Fridays",
    deity: "Maa Santoshi (Daughter of Lord Ganesha)",
    fastingMethod: "Ekasana",
    purpose: "Fulfilling specific life wishes, removing domestic unrest, marriage blessing.",
    legendAndSignificance: "Popularized nationwide for wish-fulfillment. Non-negotiable rule: absolutely NO sour food (Khatta) can be eaten or touched for the entire 16-week span by devotee or family.",
    permittedFoods: ["Gur-Chana (Jaggery & Roasted Gram), sweet single meal, fruits, milk"],
    forbiddenFoods: ["STRICTLY NO SOUR ITEMS: Lemon, Curd, Tamarind, Pickles, Tomatoes, Amla"],
    vidhi: [
      "Light ghee diya before Santoshi Maa photo.",
      "Place a vessel of water and plate with Gur-Chana.",
      "Read Santoshi Maa Vrat Katha aloud.",
      "Distribute Gur-Chana prasad.",
      "Udyapan on 16th Friday with feeding 8 boys sweet kheer-puri (strictly no sour items offered)."
    ],
    paranaRules: "Evening sweet meal without any sour element.",
    rulesAndAvoid: ["Missing a single Friday requires restarting from Week 1"],
    keywords: ["solah shukravar", "santoshi maa 16 friday", "no sour food"]
  },
  {
    id: "vrat-nag-panchami",
    name: "Nag Panchami",
    nameHindi: "नाग पंचमी (सर्प दोष निवारण)",
    category: "special_occasion",
    tithiOrTiming: "Shravan Shukla Panchami",
    hinduMonth: "Shravan",
    paksha: "Shukla",
    deity: "Nag Devtas (Ananta, Vasuki, Shesha, Padmanabha, Takshaka)",
    fastingMethod: "Ekasana",
    purpose: "Kaal Sarp Dosha remedy, protection against snake bites, ancestral peace.",
    legendAndSignificance: "Lord Krishna subdued the venomous serpent Kaliya on Yamuna, and Takshaka was spared at the conclusion of Janamejaya's Sarpa Satra.",
    permittedFoods: ["Boiled foods, milk, kheer, fruits"],
    forbiddenFoods: ["Fried foods (Tawa and Kadhai frying forbidden in many traditions)", "Non-veg"],
    vidhi: ["Draw snake figures on doors with cow dung or turmeric, offer milk, flowers, and puffed rice (Kheel)."],
    paranaRules: "Evening single meal.",
    rulesAndAvoid: ["Do not plough fields or cut trees on Nag Panchami"],
    keywords: ["nag panchami", "kaal sarp dosha", "snake worship"]
  },
  {
    id: "vrat-skanda-sashti",
    name: "Skanda Sashti",
    nameHindi: "स्कन्द षष्ठी (भगवान कार्तिकेय / मुरुगन विजय)",
    category: "special_occasion",
    tithiOrTiming: "Shukla Sashti (Monthly & Grand annual in Aippasi/Kartik)",
    hinduMonth: "Kartik",
    paksha: "Shukla",
    deity: "Lord Kartikeya (Murugan / Skanda)",
    fastingMethod: "Phalahar",
    purpose: "Victory over enemies, courage, removal of Mars affliction, child protection.",
    legendAndSignificance: "Commemorates Lord Murugan vanquishing the demon Soorapadman with his divine spear (Vel). Observed for 6 consecutive days by devoted Tamils.",
    permittedFoods: ["Fruits, milk, single meal on 6th day"],
    forbiddenFoods: ["Non-veg, alcohol, grains during strict 6-day vow"],
    vidhi: ["Chant Kanda Sashti Kavasam, offer red oleander flowers to Lord Murugan."],
    paranaRules: "Parana on Sashti evening.",
    rulesAndAvoid: ["Maintain fearless mindset"],
    keywords: ["skanda sashti", "lord murugan fast", "kanda sashti kavasam"]
  },
  {
    id: "vrat-anant-chaturdashi",
    name: "Anant Chaturdashi",
    nameHindi: "अनंत चतुर्दशी (१४ ग्रंथि अनंत सूत्र)",
    category: "major_deity",
    tithiOrTiming: "Bhadrapada Shukla Chaturdashi",
    hinduMonth: "Bhadrapada",
    paksha: "Shukla",
    deity: "Lord Ananta Padmanabha (Vishnu)",
    fastingMethod: "Ekasana",
    purpose: "Unbreakable protection of Vishnu across 14 cosmic realms (Lokas), recovery of lost wealth.",
    legendAndSignificance: "Pandavas observed Anant Chaturdashi in exile to regain their lost empire. A sacred thread with 14 knots (Ananta Sutra) dyed in turmeric is tied on the right wrist of men and left wrist of women.",
    permittedFoods: ["Single sattvic meal, sweet fried pooris (Kheer-Poori)"],
    forbiddenFoods: ["Salt before puja, non-veg, onion"],
    vidhi: ["Worship Sheshanaga and Vishnu, tie the 14-knot thread while chanting Ananta mantra."],
    paranaRules: "Break fast after afternoon puja.",
    rulesAndAvoid: ["Wear Ananta thread for minimum 14 days or full year"],
    keywords: ["anant chaturdashi", "14 knots thread", "ananta sutra"]
  },
  {
    id: "vrat-purnima-general",
    name: "Monthly Purnima (Satyanarayan Vrat)",
    nameHindi: "मासिक पूर्णिमा (सत्यनारायण व्रत)",
    category: "monthly_recurring",
    tithiOrTiming: "Every Full Moon (Purnima)",
    deity: "Lord Satyanarayan (Vishnu)",
    fastingMethod: "Phalahar",
    purpose: "Overall prosperity, peace, truthfulness, good fortune, mental clarity.",
    legendAndSignificance: "Full moon illuminates cosmic consciousness. Performing Satyanarayan Katha and fasting on Purnima ensures divine protection for the entire household.",
    permittedFoods: ["Sooji Halwa (Panjiri), Charnamrit, fruits, milk, single evening meal"],
    forbiddenFoods: ["Grains before evening puja, non-veg, alcohol"],
    vidhi: ["Perform Satyanarayan Puja in evening, listen to 5 chapters of Katha, distribute Panchamrit."],
    paranaRules: "Break fast after evening Satyanarayan Aarti and prasad.",
    rulesAndAvoid: ["Speak truth, avoid deceit"],
    keywords: ["purnima vrat", "satyanarayan puja", "full moon fast"]
  },
  {
    id: "vrat-amavasya-general",
    name: "Monthly Amavasya & Somvati Amavasya",
    nameHindi: "मासिक अमावस्या एवं सोमवती अमावस्या",
    category: "monthly_recurring",
    tithiOrTiming: "Every New Moon (Amavasya) / Special when falling on Monday",
    deity: "Pitru Devatas (Forefathers) & Lord Shiva",
    fastingMethod: "Ekasana",
    purpose: "Pitru Dosha shanti, ancestral blessings, longevity of spouse (Somvati Amavasya).",
    legendAndSignificance: "Amavasya is the dedicated day for ancestral gratitude through Tarpan. Somvati Amavasya occurs when Amavasya lands on a Monday — circumambulating a Peepal tree 108 times grants miraculous marital protection.",
    permittedFoods: ["Single sattvic meal after Tarpan, fruits, milk"],
    forbiddenFoods: ["Non-veg, alcohol, onion, garlic"],
    vidhi: ["Holy bath, water offering to Peepal tree and ancestors (Tarpan), feed crows, cows, dogs."],
    paranaRules: "Break fast after afternoon Tarpan.",
    rulesAndAvoid: ["No new ventures or weddings on Amavasya"],
    keywords: ["amavasya vrat", "somvati amavasya", "pitru tarpan", "peepal 108 pradakshina"]
  }
];

// -------------------------------------------------------------
// PART TEN: ALL 27 (+1 ABHIJIT) NAKSHATRA VRATAS
// -------------------------------------------------------------
export const ALL_28_NAKSHATRA_VRATS: NakshatraVratItem[] = [
  {
    number: 1,
    name: "Ashwini Nakshatra Vrata",
    nameHindi: "अश्विनी नक्षत्र व्रत",
    presidingDeity: "The Ashwini Kumaras (Divine Physicians of the Gods)",
    purpose: "Excellent health, cure from chronic disease, vigor and swift energy.",
    significance: "Ruled by Ketu / Ashwini Kumaras. Fasting when the Moon enters Ashwini restores miraculous healing powers to the body and mind.",
    specialRitual: "Offer ghee lamps and medicinal herbs/fruits to Ashwini Kumaras; donate medicines to the sick."
  },
  {
    number: 2,
    name: "Bharani Nakshatra Vrata",
    nameHindi: "भरणी नक्षत्र व्रत",
    presidingDeity: "Lord Yama (God of Justice & Time)",
    purpose: "Removes fear of untimely death, cleanses pitru afflictions, grants discipline.",
    significance: "Ruled by Venus / Yama. Transmutes fiery karmic burdens into spiritual gold.",
    specialRitual: "Offer black sesame and water to Yama; feed crows and poor laborers."
  },
  {
    number: 3,
    name: "Krittika Nakshatra Vrata",
    nameHindi: "कृत्तिका नक्षत्र व्रत",
    presidingDeity: "Agni Dev (Fire God) & Lord Kartikeya",
    purpose: "Personal radiance, administrative authority, leadership, destroying malice.",
    significance: "Ruled by Sun / Agni. The cutting flame that purifies gold and incinerates negativity.",
    specialRitual: "Perform small ghee Havan, offer red flowers and sweet porridge."
  },
  {
    number: 4,
    name: "Rohini Nakshatra Vrata",
    nameHindi: "रोहिणी नक्षत्र व्रत",
    presidingDeity: "Prajapati Lord Brahma",
    purpose: "Marital harmony, beauty, agricultural/financial abundance, mental tranquility.",
    significance: "Ruled by Moon / Brahma. Lord Krishna's birth star; highly revered in both Hindu and Jain traditions.",
    specialRitual: "Offer white sandalwood, milk, and white flowers to the Moon at night."
  },
  {
    number: 5,
    name: "Mrigashira Nakshatra Vrata",
    nameHindi: "मृगशिरा नक्षत्र व्रत",
    presidingDeity: "Chandra Dev (Soma)",
    purpose: "Calms an overactive or anxious mind, artistic/musical excellence, land prosperity.",
    significance: "Ruled by Mars / Soma. The gentle deer star associated with exploration and sweet nectar.",
    specialRitual: "Offer fragrant flowers and milk to Lord Shiva and Chandra."
  },
  {
    number: 6,
    name: "Ardra Nakshatra Vrata",
    nameHindi: "आर्द्रा नक्षत्र व्रत",
    presidingDeity: "Rudra (Fierce Protective Aspect of Shiva)",
    purpose: "Shield against sudden catastrophe, destroys harsh Rahu afflictions, inner transformation.",
    significance: "Ruled by Rahu / Rudra. A secret vrat that clears massive emotional and psychic storms.",
    specialRitual: "Offer bilva leaves and sugarcane juice to Rudra; cook Kheer-Poori for charity."
  },
  {
    number: 7,
    name: "Punarvasu Nakshatra Vrata",
    nameHindi: "पुनर्वसु नक्षत्र व्रत",
    presidingDeity: "Mata Aditi (Mother of the Gods)",
    purpose: "Return of lost wealth, prestige, or home; birth star of Lord Sri Rama.",
    significance: "Ruled by Jupiter / Aditi. The star of renewal and homecoming.",
    specialRitual: "Worship Sri Rama and Mata Aditi with yellow flowers and sweet rice."
  },
  {
    number: 8,
    name: "Pushya Nakshatra Vrata",
    nameHindi: "पुष्य नक्षत्र व्रत",
    presidingDeity: "Devguru Brihaspati (Jupiter)",
    purpose: "The Emperor among Nakshatras. Supreme auspiciousness, spiritual wisdom, everlasting prosperity.",
    significance: "Ruled by Saturn / Brihaspati. Any sadhana or enterprise begun under Pushya attains immortality.",
    specialRitual: "Offer pure cow ghee diya, turmeric, and chana dal to Lord Vishnu; gold charity."
  },
  {
    number: 9,
    name: "Ashlesha Nakshatra Vrata",
    nameHindi: "आश्लेषा नक्षत्र व्रत",
    presidingDeity: "The Naga Devatas (Serpent Deities)",
    purpose: "Remedy for Kaal Sarp Dosha, sharpened business intuition, victory over rivals.",
    significance: "Ruled by Mercury / Sarpa. Deep mystical wisdom and Kundalini awakening.",
    specialRitual: "Offer raw milk and chandan to serpent deities; avoid hurting snakes."
  },
  {
    number: 10,
    name: "Magha Nakshatra Vrata",
    nameHindi: "मघा नक्षत्र व्रत",
    presidingDeity: "The Pitru Devas (Ancestral Lords)",
    purpose: "Royal authority, ancestral peace, preservation of family lineage and ancestral land.",
    significance: "Ruled by Ketu / Pitrus. Direct gateway to ancestral heritage and throne power.",
    specialRitual: "Perform Tarpan with water and black sesame, feed cows and Brahmins."
  },
  {
    number: 11,
    name: "Purva Phalguni Nakshatra Vrata",
    nameHindi: "पूर्वा फाल्गुनी नक्षत्र व्रत",
    presidingDeity: "Bhaga (God of Fortune & Prosperity)",
    purpose: "Marital love, luxury, creative success, charm and romance.",
    significance: "Ruled by Venus / Bhaga. The star of divine fortune and artistic pleasure.",
    specialRitual: "Offer sweet fragrance and honey to Goddess Lakshmi."
  },
  {
    number: 12,
    name: "Uttara Phalguni Nakshatra Vrata",
    nameHindi: "उत्तरा फाल्गुनी नक्षत्र व्रत",
    presidingDeity: "Aryaman (God of Truth, Friendship & Contracts)",
    purpose: "Social prestige, lasting honorable friendships, governmental favors.",
    significance: "Ruled by Sun / Aryaman. Upholder of sacred alliances and noble character.",
    specialRitual: "Surya Arghya with red sandalwood and feeding guests with hospitality."
  },
  {
    number: 13,
    name: "Hasta Nakshatra Vrata",
    nameHindi: "हस्त नक्षत्र व्रत",
    presidingDeity: "Surya Dev (in his Savitar Divine Catalyst Form)",
    purpose: "Mastery over hand crafts, writing, surgical/healing skills, rapid business growth.",
    significance: "Ruled by Moon / Savitar. The Golden Hand that manifests divine blessings into physical reality.",
    specialRitual: "Chant Gayatri Mantra 108 times at sunrise holding water in hands."
  },
  {
    number: 14,
    name: "Chitra Nakshatra Vrata",
    nameHindi: "चित्रा नक्षत्र व्रत",
    presidingDeity: "Vishwakarma (Divine Architect of the Cosmos)",
    purpose: "Personal charisma, architectural/home-building success, design ingenuity.",
    significance: "Ruled by Mars / Vishwakarma. The dazzling jewel star of brilliant creation.",
    specialRitual: "Worship tools, instruments, and Vishwakarma with multicolored flowers."
  },
  {
    number: 15,
    name: "Swati Nakshatra Vrata",
    nameHindi: "स्वाति नक्षत्र व्रत",
    presidingDeity: "Vayu Dev (Wind God)",
    purpose: "Independence, higher education abroad, flexibility, clarity in life direction.",
    significance: "Ruled by Rahu / Vayu. The lone pearl in the sky; transforms raindrops into gems.",
    specialRitual: "Perform Pranayama at dawn; chant Vayu Gayatri and feed wandering travelers."
  },
  {
    number: 16,
    name: "Vishakha Nakshatra Vrata",
    nameHindi: "विशाखा नक्षत्र व्रत",
    presidingDeity: "Indra & Agni (Jointly)",
    purpose: "Triumph in massive ambitions, competitive triumphs, unyielding determination.",
    significance: "Ruled by Jupiter / Indragni. The triumphal arch of focused power.",
    specialRitual: "Light two ghee lamps simultaneously; offer yellow and red sweets."
  },
  {
    number: 17,
    name: "Anuradha Nakshatra Vrata",
    nameHindi: "अनुराधा नक्षत्र व्रत",
    presidingDeity: "Mitra Dev (God of Harmony & Friendship)",
    purpose: "Deep spiritual devotion (Radha Bhakti), noble friendships, protection from Saturn.",
    significance: "Ruled by Saturn / Mitra. The lotus that blooms in the mud of worldly struggles.",
    specialRitual: "Offer blue lotus or red flowers to Lord Krishna and Radha."
  },
  {
    number: 18,
    name: "Jyeshtha Nakshatra Vrata",
    nameHindi: "ज्येष्ठा नक्षत्र व्रत",
    presidingDeity: "Devraj Indra (King of the Gods)",
    purpose: "Attaining and preserving the highest senior position in family/corporation.",
    significance: "Ruled by Mercury / Indra. Protective talisman of supreme leadership.",
    specialRitual: "Worship Indra and Vishnu with royal panchamrit and chandan."
  },
  {
    number: 19,
    name: "Mula Nakshatra Vrata",
    nameHindi: "मूल नक्षत्र व्रत",
    presidingDeity: "Nirriti (Goddess of Dissolution)",
    purpose: "Eradicates chronic entrenched ancestral curses, deep spiritual liberation.",
    significance: "Ruled by Ketu / Nirriti. The cosmic root center pointing to galactic center.",
    specialRitual: "Perform root vegetable charity; donate black sesame to the needy."
  },
  {
    number: 20,
    name: "Purva Ashadha Nakshatra Vrata",
    nameHindi: "पूर्वाषाढ़ा नक्षत्र व्रत",
    presidingDeity: "Apah (The Cosmic Water Deities)",
    purpose: "Mental purification, invincible stamina through adverse crises, victory.",
    significance: "Ruled by Venus / Apah. The unvanquished ocean of divine energy.",
    specialRitual: "Offer holy water to rivers; donate clean drinking water containers."
  },
  {
    number: 21,
    name: "Uttara Ashadha Nakshatra Vrata",
    nameHindi: "उत्तराषाढ़ा नक्षत्र व्रत",
    presidingDeity: "The Vishwadevas (Universal Gods)",
    purpose: "Enduring, permanent success, ethical nobility, universal respect.",
    significance: "Ruled by Sun / Vishwadevas. The final victory that never fades.",
    specialRitual: "Perform Surya Arghya and universal peace prayers (Shanti Mantra)."
  },
  {
    number: 22,
    name: "Abhijit Nakshatra Vrata (28th Star)",
    nameHindi: "अभिजित नक्षत्र व्रत (२८वाँ सूक्ष्म नक्षत्र)",
    presidingDeity: "Lord Vishnu / Prajapati Brahma",
    purpose: "Sarvartha Siddhi (Complete victory in any enterprise whatsoever), cleanses all doshas.",
    significance: "Located between Uttara Ashadha and Shravana. The victorious intercalary star chosen by Lord Krishna.",
    specialRitual: "Midday Abhijit Muhurta puja with Vishnu Sahasranama chanting."
  },
  {
    number: 23,
    name: "Shravana Nakshatra Vrata",
    nameHindi: "श्रवण नक्षत्र व्रत",
    presidingDeity: "Lord Vishnu (in His Trivikrama Form)",
    purpose: "Absorbing sacred knowledge, honoring parents, establishing order in life.",
    significance: "Ruled by Moon / Vishnu. The cosmic ear of supreme Vedic listening.",
    specialRitual: "Listen to Srimad Bhagavatam or recite Vishnu Stotras attentively."
  },
  {
    number: 24,
    name: "Dhanishta Nakshatra Vrata",
    nameHindi: "धनिष्ठा नक्षत्र व्रत",
    presidingDeity: "The Ashta Vasus (Eight Gods of Abundance)",
    purpose: "Immense wealth, musical/rhythmic brilliance, public welfare leadership.",
    significance: "Ruled by Mars / Ashta Vasus. The divine flute of Lord Krishna and drum of Shiva.",
    specialRitual: "Offer sound/music/bell offerings during temple aarti; donate gold/brass."
  },
  {
    number: 25,
    name: "Shatabhisha Nakshatra Vrata",
    nameHindi: "शतभिषा नक्षत्र व्रत",
    presidingDeity: "Varuna Dev (God of Ocean & Cosmic Law)",
    purpose: "The Star of 100 Healers. Cure for incurable illnesses, occult protection.",
    significance: "Ruled by Rahu / Varuna. 100 cosmic physicians operating secretly.",
    specialRitual: "Dip in holy river; offer blue flowers and water rituals in quiet secrecy."
  },
  {
    number: 26,
    name: "Purva Bhadrapada Nakshatra Vrata",
    nameHindi: "पूर्वभाद्रपद नक्षत्र व्रत",
    presidingDeity: "Ajaikapada (One-Footed Cosmic Form of Rudra)",
    purpose: "Cuts through black magic/tantric afflictions, builds detachment and ascetic power.",
    significance: "Ruled by Jupiter / Ajaikapada. The sacred sword of supreme detachment.",
    specialRitual: "Perform Rudrabhishek at night; observe verbal silence (Maun)."
  },
  {
    number: 27,
    name: "Uttara Bhadrapada Nakshatra Vrata",
    nameHindi: "उत्तरभाद्रपद नक्षत्र व्रत",
    presidingDeity: "Ahirbudhnya (Serpent of the Cosmic Depths)",
    purpose: "Self-mastery, deep meditation, Kundalini stability, path to Moksha.",
    significance: "Ruled by Saturn / Ahirbudhnya. Still waters running deep into universal enlightenment.",
    specialRitual: "Deep silent meditation at midnight; offer milk to Shiva Linga."
  },
  {
    number: 28,
    name: "Revati Nakshatra Vrata",
    nameHindi: "रेवती नक्षत्र व्रत",
    presidingDeity: "Pushan Dev (Solar Protector of Travelers & Wealth)",
    purpose: "Safe travel, return of overseas wealth, protection of pets/animals, peaceful passing.",
    significance: "Ruled by Mercury / Pushan. The final star of the zodiac guiding the soul safely across.",
    specialRitual: "Feed cows and birds sweet grains; pray for safe travels and protection."
  }
];

// -------------------------------------------------------------
// PART ELEVEN & NINE: GUPT & RARE PURANIC VRATS
// -------------------------------------------------------------
export const GUPT_AND_RARE_VRATS: VratItem[] = [
  {
    id: "gupt-ashadha-navratri",
    name: "Ashadha Gupt Navratri",
    nameHindi: "आषाढ़ गुप्त नवरात्रि (भौतिक विघ्न विनाशक)",
    category: "gupt",
    tithiOrTiming: "Ashadha Shukla Pratipada to Navami",
    hinduMonth: "Ashadha",
    paksha: "Shukla",
    deity: "Dus Mahavidyas (Maa Tara, Maa Chhinnamasta, etc.)",
    fastingMethod: "Phalahar",
    isGupt: true,
    purpose: "Overcoming severe hidden worldly obstacles, business crises, confidential sadhana.",
    legendAndSignificance: "One of the two secret Navratris. Kept strictly private without public pandals. Devotees worship the 10 Mahavidyas quietly at home to dissolve seemingly impossible barriers.",
    permittedFoods: ["Phalahar items, fruits, milk, sendha namak"],
    forbiddenFoods: ["Grains, onion, garlic, non-veg"],
    vidhi: [
      "Rule 1: Strict verbal silence about the vow ('Do not tell anyone you are fasting').",
      "Rule 2: Sattvic food and sattvic thought combined (no anger/jealousy).",
      "Rule 3: Nishita Kaal worship (11:30 PM - 2:30 AM) in a solitary room.",
      "Chant Mahavidya mantras or Devi Saptashati quietly."
    ],
    paranaRules: "Parana quietly on Dashami morning.",
    rulesAndAvoid: ["Do not disclose the fast to outsiders", "Maintain complete secrecy of sadhana"],
    keywords: ["ashadha gupt navratri", "secret navratri", "dus mahavidya"]
  },
  {
    id: "gupt-magha-navratri",
    name: "Magha Gupt Navratri",
    nameHindi: "माघ गुप्त नवरात्रि (आत्मज्ञान एवं तपोबल)",
    category: "gupt",
    tithiOrTiming: "Magha Shukla Pratipada to Navami",
    hinduMonth: "Magha",
    paksha: "Shukla",
    deity: "Dus Mahavidyas (Maa Kali, Maa Bagalamukhi, etc.)",
    fastingMethod: "Phalahar",
    isGupt: true,
    purpose: "Inner spiritual mastery, Kundalini ascent, speech protection (Bagalamukhi).",
    legendAndSignificance: "Occurs around Mauni Amavasya and Vasant Panchami. Practitioners quietly meditate on the ten transcendent forms of the Divine Mother.",
    permittedFoods: ["Phalahar, fruits, milk"],
    forbiddenFoods: ["All grains, onion, garlic"],
    vidhi: ["Night-time quiet japa, self-inquiry, study of secret Tantric Agamas."],
    paranaRules: "Parana on Dashami.",
    rulesAndAvoid: ["Complete verbal silence regarding the practice"],
    keywords: ["magha gupt navratri", "bagalamukhi secret fast", "kali sadhana"]
  },
  {
    id: "rare-bhishma-panchak",
    name: "Bhishma Panchak Vrat",
    nameHindi: "भीष्म पंचक व्रत (कार्तिक अंतिम ५ दिन)",
    category: "puranic_rare",
    tithiOrTiming: "Kartik Shukla Ekadashi (Devutthana) to Purnima (5 Days)",
    hinduMonth: "Kartik",
    paksha: "Shukla",
    deity: "Pitamah Bhishma & Lord Sri Krishna",
    fastingMethod: "Nirjala",
    purpose: "Supreme purification of five elements, expiation of all lifetime sins, liberation.",
    legendAndSignificance: "Taught by Pitamah Bhishma from his bed of arrows to Arjuna. Observing these final 5 days of Kartik month with extreme tapasya equals the merit of all Kartik snans combined.",
    permittedFoods: ["Fruits/milk or Nirjala depending on capacity"],
    forbiddenFoods: ["Grains, beans, tamasic food"],
    vidhi: ["Daily holy bath, offering water Arghya to Bhishma with mantra, continuous Vishnu worship."],
    paranaRules: "Parana on Kartik Purnima after sunset.",
    rulesAndAvoid: ["Arduous 5-day vow, requires prior fasting experience"],
    keywords: ["bhishma panchak", "kartik final 5 days", "deathbed vow"]
  },
  {
    id: "rare-govatsa-dwadashi",
    name: "Govatsa Dwadashi (Bachh Baras)",
    nameHindi: "गोवत्स द्वादशी (बछ बारस)",
    category: "sacred_regional",
    tithiOrTiming: "Kartik Krishna Dwadashi",
    hinduMonth: "Kartik",
    paksha: "Krishna",
    deity: "Kamadhenu Cow & Calf (Gau Mata & Bachhda)",
    fastingMethod: "Partial/Modified",
    purpose: "Wellbeing and protection of children, maternal blessings.",
    legendAndSignificance: "Distinctive Vedic rules: NO knife or blade can be used to cut food on this day, and cow's milk/curd/ghee is strictly avoided to leave the milk for the calf.",
    permittedFoods: ["Sprouted whole grains (Moth, Moong), Bajra (millet) preparations cooked without cutting with knives"],
    forbiddenFoods: ["STRICTLY NO FOOD CUT WITH A KNIFE/BLADE", "STRICTLY NO COW MILK OR COW MILK PRODUCTS"],
    vidhi: ["Worship a cow and her calf with turmeric, akshat, and green fodder; feed sprouted grains."],
    paranaRules: "Break fast in evening with bajra roti and sprouted moong.",
    rulesAndAvoid: ["Do not use knives or blades in the kitchen on this day"],
    keywords: ["govatsa dwadashi", "bachh baras", "no knife cutting fast", "cow calf worship"]
  },
  {
    id: "rare-vaikuntha-chaturdashi",
    name: "Vaikuntha Chaturdashi (Hari-Har Milan)",
    nameHindi: "वैकुंठ चतुर्दशी (हरि-हर मिलन महापर्व)",
    category: "puranic_rare",
    tithiOrTiming: "Kartik Shukla Chaturdashi",
    hinduMonth: "Kartik",
    paksha: "Shukla",
    deity: "Lord Vishnu & Lord Shiva (Hari-Har)",
    fastingMethod: "Phalahar",
    purpose: "Symbolic union of Shaiva and Vaishnava paths; opens gates of Vaikuntha and Kailash.",
    legendAndSignificance: "The only day of the year where ritual offerings are deliberately crossed: Vishnu is worshipped at night with Bilva leaves (Shiva's favorite), and Shiva is worshipped with Tulsi leaves (Vishnu's favorite).",
    permittedFoods: ["Fruits, milk, evening phalahar"],
    forbiddenFoods: ["Grains, non-veg"],
    vidhi: ["Midnight worship exchanging Bilva and Tulsi leaves between Shiva and Vishnu idols."],
    paranaRules: "Parana on Kartik Purnima morning.",
    rulesAndAvoid: ["Harmonious devotion across both paths"],
    keywords: ["vaikuntha chaturdashi", "hari har milan", "bilva to vishnu", "tulsi to shiva"]
  },
  {
    id: "rare-chandrayana",
    name: "Chandrayana Vrat (Lunar Penance)",
    nameHindi: "चांद्रायण व्रत (चंद्र कला आधारित महातपस्या)",
    category: "puranic_rare",
    tithiOrTiming: "1 Full Lunar Month (Purnima to Amavasya / Pratipada)",
    deity: "Chandra Dev & Lord Vishnu",
    fastingMethod: "Partial/Modified",
    purpose: "Classical Vedic prayaschitta (atonement); complete biological and spiritual reset.",
    legendAndSignificance: "The devotee scales daily food intake strictly with the moon's phase: 1 morsel (Grasa) on Pratipada, increasing by 1 morsel daily to 15 morsels on Purnima, then decreasing by 1 morsel daily to 0 morsels (complete Nirjala fast) on Amavasya.",
    permittedFoods: ["Measured sattvic morsels of pure Havishya food cooked in cow ghee"],
    forbiddenFoods: ["Any food eaten outside the exact counted morsel quota"],
    vidhi: ["Strict measure of morsel size (size of a hen's egg or gooseberry), daily Gayatri japa."],
    paranaRules: "Conclude at the end of the 30-day lunar cycle with formal havan.",
    rulesAndAvoid: ["Requires prior endurance training; not for beginners"],
    keywords: ["chandrayana vrat", "lunar morsel fast", "prayaschitta penance"]
  },
  {
    id: "rare-maun-vrat",
    name: "Maun Vrat (Vow of Verbal Silence)",
    nameHindi: "मौन व्रत (वाक् संयम एवं चेतना जागरण)",
    category: "puranic_rare",
    tithiOrTiming: "Any day (Especially Mauni Amavasya)",
    deity: "Paramatman / Lord Shiva / Sage Vyasa",
    fastingMethod: "Partial/Modified",
    purpose: "Conservation of speech energy, mental clarity, eradication of speech sins (Vak Dosha).",
    legendAndSignificance: "Conserving the Prana dissipated in speech directs awareness inward, awakening intuition and tranquil stillness.",
    permittedFoods: ["Standard sattvic food taken quietly"],
    forbiddenFoods: ["Non-sattvic food"],
    vidhi: ["Take vow of complete verbal silence for 12, 24 hours, or 9 days during Navratri."],
    paranaRules: "Conclude by speaking OM or chanting Gayatri mantra.",
    rulesAndAvoid: ["Avoid using gestures or written messages excessively; focus on inner silence"],
    keywords: ["maun vrat", "vow of silence", "mauni amavasya"]
  }
];

// -------------------------------------------------------------
// PART FIFTEEN: GOAL-BASED VRAT MATCHING
// -------------------------------------------------------------
export const GOAL_BASED_VRAT_MATCHES: GoalBasedVratMatch[] = [
  {
    goal: "Marriage Delays or Marital Harmony",
    goalHindi: "विवाह बाधा निवारण एवं सुखद दांपत्य",
    recommendedVrats: ["Monday (Somvar) Vrat", "Solah Somvar Vrat", "Hartalika Teej", "Vat Savitri Vrat", "Mangala Gauri Vrat", "Shukra Pradosh"],
    description: "Invokes the combined grace of Lord Shiva, Goddess Parvati, and Venus to remove planetary delays and foster lifelong affection."
  },
  {
    goal: "Career, Business & Financial Growth",
    goalHindi: "व्यापार वृद्धि, धन लाभ एवं करियर में उन्नति",
    recommendedVrats: ["Friday (Lakshmi) Vrat", "Rama Ekadashi", "Dhanteras", "Akshaya Tritiya", "Wednesday (Budh/Ganesha) Vrat", "Parama Ekadashi"],
    description: "Invokes Goddess Maha Lakshmi, Lord Ganesha, and Budha Graha to dissolve debts, expand business intellect, and bring stable wealth."
  },
  {
    goal: "Removing Obstacles & New Beginnings",
    goalHindi: "विघ्न विनाश एवं नए कार्यों की सफलता",
    recommendedVrats: ["Sankashti Chaturthi", "Ganesh Chaturthi", "Budhvar Vrat", "Gudi Padwa / Ugadi", "Abhijit Nakshatra Vrata"],
    description: "Pleases Lord Ganesha, the master of intellect and remover of impediments across all ventures."
  },
  {
    goal: "Health, Vitality & Cure from Disease",
    goalHindi: "आरोग्य, दीर्घायु एवं रोगों से मुक्ति",
    recommendedVrats: ["Sunday (Surya) Vrat", "Ravi Pradosh", "Chhath Puja", "Ashwini Nakshatra Vrata", "Amalaki Ekadashi", "Shatabhisha Nakshatra Vrata"],
    description: "Channels the life-giving vitality of Surya Dev and Ashwini Kumaras to cure chronic ailments and rejuvenate energy."
  },
  {
    goal: "Relief from Shani Dosha (Sade Sati / Dhaiya)",
    goalHindi: "शनि साढ़ेसाती, ढैय्या एवं कष्ट निवारण",
    recommendedVrats: ["Saturday (Shanivar) Vrat", "Shani Pradosh (Most Powerful)", "Anuradha Nakshatra Vrata", "Uttara Bhadrapada Nakshatra Vrata"],
    description: "Mitigates the disciplinary lessons of Lord Saturn through devotion to Shiva, Hanuman, and charitable acts for the needy."
  },
  {
    goal: "Courage, Protection & Overcoming Enemies",
    goalHindi: "शत्रु विजय, भय मुक्ति एवं असीम साहस",
    recommendedVrats: ["Tuesday (Hanuman) Vrat", "Skanda Sashti", "Kaal Bhairav Ashtami", "Guru Pradosh", "Krittika Nakshatra Vrata"],
    description: "Invokes Lord Hanuman, Kartikeya, and Bhairava for an impenetrable protective armor against fear and rivalry."
  },
  {
    goal: "Wellbeing & Longevity of Children",
    goalHindi: "संतान सुख, दीर्घायु एवं कल्याण",
    recommendedVrats: ["Ahoi Ashtami", "Chhath Puja", "Govatsa Dwadashi (Bachh Baras)", "Gopashtami"],
    description: "Maternal vows dedicated to Ahoi Mata, Surya, and Gau Mata ensuring child health and future fortune."
  },
  {
    goal: "Seeking Conception of a Child (Putra/Santan)",
    goalHindi: "संतान प्राप्ति हेतु व्रत",
    recommendedVrats: ["Shravana Putrada Ekadashi", "Pausha Putrada Ekadashi", "Santan Saptami"],
    description: "Specific Vedic Ekadashis prescribed by ancient rishis for couples seeking righteous, healthy progeny."
  },
  {
    goal: "Ancestral Peace (Pitru Shanti & Mukti)",
    goalHindi: "पितृ शांति, तर्पण एवं मोक्ष",
    recommendedVrats: ["Pitru Paksha (16 Days)", "Indira Ekadashi", "Monthly Amavasya", "Somvati Amavasya", "Magha Nakshatra Vrata"],
    description: "Dedicated ancestral water and food offerings that liberate departed forefathers from suffering and earn their generational blessings."
  },
  {
    goal: "Absolution from Serious Past Sins & Karmic Liberation",
    goalHindi: "घोर पाप मुक्ति, प्रायश्चित्त एवं मोक्ष",
    recommendedVrats: ["Nirjala Ekadashi", "Maha Shivratri", "Papmochani Ekadashi", "Mokshada Ekadashi", "Bhishma Panchak", "Chandrayana Vrat"],
    description: "Highest tier Puranic penances that completely cleanse lifetimes of accumulated negative karma and grant spiritual liberation."
  }
];

// -------------------------------------------------------------
// PART EIGHTEEN: COMPREHENSIVE GLOSSARY OF TERMS
// -------------------------------------------------------------
export const VRAT_GLOSSARY: GlossaryTerm[] = [
  { term: "Vrat (व्रत)", definition: "A voluntary vow involving fasting, worship, and behavioral restrictions undertaken for a defined spiritual, astrological, or personal purpose." },
  { term: "Sankalp (संकल्प)", definition: "The formal, spoken declaration of intent made at the beginning of a fast, stating one's name, lineage, Hindu date (tithi), deity, and purpose." },
  { term: "Parana (पारणा)", definition: "The formal, ritual breaking of a fast at the prescribed time window (such as after sunrise on Dwadashi or moonrise)." },
  { term: "Udyapan (उद्यापन)", definition: "The formal concluding and celebration ritual performed at the end of a multi-week or multi-year vow cycle to complete the spiritual circuit." },
  { term: "Nirjala (निर्जला)", definition: "A complete fast observed without consuming a single drop of water or morsel of food for the entire duration." },
  { term: "Phalahar (फलाहार)", definition: "A style of fasting permitting fruits, milk, root vegetables, nuts, and grain-free flours (kuttu, singhara, sabudana) using rock salt." },
  { term: "Ekasana / Ekbhukt (एकभुक्त)", definition: "Eating only a single, complete sattvic meal during the 24-hour cycle, with no other food consumed." },
  { term: "Sattvic (सात्विक)", definition: "Pure, light, and consciousness-enhancing food and conduct that fosters calm, mental clarity, and devotion." },
  { term: "Sendha Namak (सेंधा नमक)", definition: "Pure unprocessed rock salt from Himalayan mines, traditionally used instead of regular table salt during fasts." },
  { term: "Tithi (तिथि)", definition: "A lunar day in the traditional Hindu calendar, determined by the Moon moving 12 degrees away from the Sun." },
  { term: "Udaya Tithi (उदया तिथि)", definition: "The rule stating that the lunar tithi prevailing at local sunrise is the one in effect for the entire day's religious observance." },
  { term: "Nishita Kaal (निशीथ काल)", definition: "The midnight window (roughly 11:30 PM to 12:30 AM), used to calculate night-centered vratas such as Maha Shivratri and Janmashtami." },
  { term: "Prahar (प्रहर)", definition: "A 3-hour division of time; the night of Maha Shivratri is divided into 4 prahars of distinct abhishek worship." },
  { term: "Rudrabhishek (रुद्राभिषेक)", definition: "The ceremonial bathing of the Shiva Linga with sacred liquids (milk, curd, ghee, honey, sugarcane, water) while chanting Vedic mantras." },
  { term: "Chaturmas (चातुर्मास)", definition: "The 4-month holy monsoon period (from Devshayani to Devutthana Ekadashi) when Lord Vishnu rests and devotees observe heightened vows." },
  { term: "Gupt Vrat (गुप्त व्रत)", definition: "A confidential vow observed without public announcement or disclosure to preserve and amplify its spiritual potency." },
  { term: "Dus Mahavidya (दस महाविद्या)", definition: "Ten transcendent esoteric forms of the Divine Mother (Kali, Tara, Bagalamukhi, etc.) worshipped during the two Gupt Navratris." },
  { term: "Janma Nakshatra (जन्म नक्षत्र)", definition: "The specific lunar mansion occupied by the Moon at the exact moment of one's birth, used to track monthly Nakshatra fasts." }
];

// -------------------------------------------------------------
// PART NINETEEN: FASTING TYPES & SHARIRIK DISCIPLINE GUIDE
// -------------------------------------------------------------
export interface FastingTypeDetail {
  id: FastingMethodType;
  name: string;
  nameHindi: string;
  level: "Strict / Supreme" | "Moderate" | "Gentle" | "Flexible";
  description: string;
  permittedList: string[];
  strictlyProhibited: string[];
  keyRules: string[];
  bestSuitedFor: string[];
}

export const FASTING_TYPES_GUIDE: FastingTypeDetail[] = [
  {
    id: "Nirjala",
    name: "Nirjala Vrat (Complete Dry Fast)",
    nameHindi: "निर्जला व्रत (सर्वश्रेष्ठ तपोमय उपवास)",
    level: "Strict / Supreme",
    description: "The highest discipline of Vedic fasting where neither water nor a single grain of food is consumed from sunrise of the fast day until sunrise and Parana on the following day (usually 24 to 36 hours).",
    permittedList: [
      "Only Acamana water (a drop of water taken thrice during morning sandhya rituals for mantra purification, not for thirst)",
      "Sacred Ganga jal for touching to lips during Sankalp"
    ],
    strictlyProhibited: [
      "Drinking water, juices, coconut water, or any liquids",
      "Consuming any fruits, milk, solids, or medications unless emergency",
      "Brushing teeth with modern chemical toothpaste (use neem twig or water rinse without swallowing)"
    ],
    keyRules: [
      "Observe complete brahmacharya (celibacy) and mental stillness",
      "Avoid direct exposure to harsh midday sun and rigorous manual labor",
      "Spend the day in mantra japa, reading Shrimad Bhagavad Gita or Vishnu Sahasranama",
      "Break fast strictly during the prescribed Parana muhurta with tulsi leaf, lemon-water, or charnamrit"
    ],
    bestSuitedFor: ["Nirjala Ekadashi", "Maha Shivratri", "Karwa Chauth (till moonrise)", "Hartalika Teej", "Chhath Puja (Kharna to Usha Arghya)"]
  },
  {
    id: "Phalahar",
    name: "Phalahari Vrat (Fruit, Root & Milk Fast)",
    nameHindi: "फलाहार व्रत (पवित्र एवं पौष्टिक सात्विक उपवास)",
    level: "Moderate",
    description: "A balanced sattvic fast allowing pure fresh fruits, cow milk, nuts, root tubers (sweet potato, colocasia), and grain-free pseudo-cereals (kuttu, singhara, sabudana, rajgira) prepared with Sendha Namak (rock salt).",
    permittedList: [
      "Fresh seasonal fruits (Apple, banana, pomegranate, papaya, berries, citrus)",
      "Fresh cow milk, curd (dahi), homemade paneer, pure cow desi ghee",
      "Sendha Namak (pure Himalayan pink/rock salt)",
      "Buckwheat flour (Kuttu ka atta), Water chestnut flour (Singhara ka atta), Amaranth (Rajgira)",
      "Sago (Sabudana), Sweet potatoes (Shakarkandi), Colocasia (Arbi), Yam (Jimikand)",
      "Almonds, walnuts, raisins, cashews, makhana (fox nuts), tender coconut water"
    ],
    strictlyProhibited: [
      "All true cereals: Wheat (atta/maida), Rice (chawal), Barley (jau), Oats, Corn, Millets",
      "All pulses, lentils, legumes (Dal, chana, rajma, chhole)",
      "Ordinary iodized table sea salt (Samudri namak)",
      "Onion, garlic, mushrooms, asafoetida (hing), mustard seeds (rai), fenugreek (methi)",
      "Processed foods, packaged snacks with artificial preservatives, refined vegetable oils"
    ],
    keyRules: [
      "Cook food only in pure cow ghee or cold-pressed peanut/sesame oil",
      "Season exclusively with cumin seeds (jeera), black pepper (kali mirch), green chili, and sendha namak",
      "Maintain a dedicated clean cooking pan and utensils free from grain contamination",
      "Consume meals mindfully in limited portions to keep the mind meditative and clear"
    ],
    bestSuitedFor: ["Navratri (9 Days)", "Janmashtami", "Weekly Monday/Thursday/Friday Vrats", "Regular Ekadashis", "Pradosh Vrats"]
  },
  {
    id: "Ekasana",
    name: "Ekasana / Ekbhukt (Single Sattvic Meal Fast)",
    nameHindi: "एकभुक्त / एकाशन व्रत (दिवस में केवल एक बार भोजन)",
    level: "Gentle",
    description: "Eating only a single, wholesome sattvic meal during the entire 24-hour cycle. The rest of the day and night are observed with water or light liquids only.",
    permittedList: [
      "A complete sattvic meal eaten once (either at noon or after sunset depending on the vrata rules)",
      "Grains and lentils may be permitted in certain non-Ekadashi weekly vratas (e.g. Somvar, Ravivar)",
      "Water, herbal teas, or milk throughout the non-meal hours"
    ],
    strictlyProhibited: [
      "Taking a second meal, nibbling snacks, or repeated eating through the day",
      "Tamasic ingredients (onion, garlic, stale or leftover food, meat, alcohol)",
      "Overeating at the single meal time"
    ],
    keyRules: [
      "Eat without rising from the seating mat until the meal is concluded",
      "Maintain silence (maun) or peaceful chanting while eating",
      "Offer the first morsel to Agni or Pancha Bali (cow, dog, crow, ants, deities)"
    ],
    bestSuitedFor: ["Solah Somvar Vrat", "Ravivar Surya Vrat", "Brihaspativar Vrat", "Chaturmas monthly vows"]
  },
  {
    id: "Dugdhahar",
    name: "Dugdhahar / Payovrata (Milk Only Vow)",
    nameHindi: "दुग्धाहार / पयोव्रत (क्षीर आधारित दिव्य व्रत)",
    level: "Strict / Supreme",
    description: "An austere Puranic vow where the observer partakes only of fresh cow's milk for 12 days or during sacred cycles, accompanied by intense prayers.",
    permittedList: [
      "Fresh boiled pure cow's milk (desi cow A2 milk preferred)",
      "Pure spring water or warm water between milk offerings"
    ],
    strictlyProhibited: [
      "All solid foods, fruits, grains, sugars, salts, and spices",
      "Milk sourced with cruelty or adulteration"
    ],
    keyRules: [
      "Offer the milk first to Lord Vishnu or Shiva as naivedya before partaking",
      "Observed famously by Aditi to give birth to Lord Vamana (Payovrata in Srimad Bhagavatam Ch. 8)"
    ],
    bestSuitedFor: ["Payovrata for conceiving divine progeny", "Shukla Paksha 12-day penance", "Sadhana intervals"]
  },
  {
    id: "Jalahar",
    name: "Jalahar (Water Only Liquid Fast)",
    nameHindi: "जलाहार व्रत (जल आधारित शुद्धि उपवास)",
    level: "Moderate",
    description: "Consuming only pure water, warm boiled water, or mineral-rich herbal infusions without solid food, aiding deep cellular detox and spiritual grounding.",
    permittedList: [
      "Boiled and cooled pure water",
      "Warm water with a pinch of sendha namak or fresh basil (tulsi) leaves",
      "Tender coconut water (if permitted by family tradition)"
    ],
    strictlyProhibited: [
      "Any chewable or solid food",
      "Dairy products, thick milk, and oily concoctions",
      "Sugary or carbonated beverages"
    ],
    keyRules: [
      "Drink warm water sip-by-sip to avoid gastric distress",
      "Ideal for physical detoxification and mental focus"
    ],
    bestSuitedFor: ["Pradosh twilight fasts", "Monthly Amavasya", "Solar/Lunar eclipse days"]
  }
];

// -------------------------------------------------------------
// PART TWENTY: HEALTH & SAFETY GUIDANCE FOR FASTING
// -------------------------------------------------------------
export interface HealthSafetySection {
  title: string;
  titleHindi: string;
  icon: string;
  summary: string;
  dos: string[];
  donts: string[];
  medicalAdvice: string;
}

export const HEALTH_AND_SAFETY_GUIDE: HealthSafetySection[] = [
  {
    title: "Hydration & Electrolyte Management",
    titleHindi: "जल संतुलन एवं इलेक्ट्रोलाइट प्रबंधन",
    icon: "💧",
    summary: "Maintaining safe fluid and mineral equilibrium during Phalahar and Ekasana fasts prevents fatigue, muscle cramps, and blood pressure drops.",
    dos: [
      "Drink at least 2.5 to 3 liters of fluids during non-dry fasts (coconut water, lemon water with sendha namak, buttermilk).",
      "Include natural potassium and magnesium sources like roasted makhana, sweet potatoes, and bananas in your phalahar.",
      "Sip water warm or at room temperature; avoid ice-chilled water which dampens the digestive fire (Jatharagni)."
    ],
    donts: [
      "Do not binge-drink 1 liter of water at once, which causes bloating and electrolyte dilution.",
      "Do not consume excess fried kuttu pakoras or sabudana vadas, which cause intense dehydration and acidity."
    ],
    medicalAdvice: "If you feel severe lightheadedness, shivering, or unquenchable thirst, break the fast immediately with warm electrolyte water."
  },
  {
    title: "Medical Vulnerabilities & Shastric Exemptions",
    titleHindi: "चिकित्सकीय सावधानियां एवं शास्त्रीय छूट",
    icon: "🩺",
    summary: "Ancient scriptures (Mahabharata, Bhavishya Purana) explicitly exempt individuals with acute medical conditions from severe fasting.",
    dos: [
      "Individuals with Type-1 or Type-2 Diabetes on insulin must choose modified Phalahar with doctor-approved low-glycemic fruits.",
      "Pregnant women, lactating mothers, elderly persons, and children are spiritually encouraged to observe 'Bhav Vrat' (devotion through mantra and prayer) rather than physical starvation.",
      "Those recovering from surgery, chronic kidney disease, or severe gastritis should consult their physician before any fast."
    ],
    donts: [
      "Never abruptly stop life-saving daily prescription medications to observe a fast.",
      "Do not undertake Nirjala (no-water) vows without prior clinical clearance if you have heart or kidney ailments."
    ],
    medicalAdvice: "The Shastras state: 'Shariram Adyam Khalu Dharma Sadhanam' — the human body is the primary instrument of righteousness. Torturing the body to collapse is un-Vedic."
  },
  {
    title: "Safe Parana (Refeeding) Protocol",
    titleHindi: "सुरक्षित पारणा (उपवास समापन) विधान",
    icon: "🌅",
    summary: "Breaking a fast requires gentle digestive reactivation. Consuming heavy, oily, or spicy foods immediately shocks the stomach and intestines.",
    dos: [
      "First break the fast with a sip of Tulsi water, charnamrit, or light warm lemon water with a pinch of rock salt.",
      "Wait 20-30 minutes, then consume light, easily digestible nourishment such as moong dal khichdi cooked with cumin and ghee, or soft boiled rice.",
      "Chew every morsel thoroughly to allow saliva enzymes to ease stomach work."
    ],
    donts: [
      "Never break a fast with fried puris, heavy sweets, chilly curries, or caffeinated coffee/tea on an empty stomach.",
      "Do not overeat during Parana; stop eating when your stomach feels half-full."
    ],
    medicalAdvice: "Smooth re-feeding prevents sudden spikes in blood sugar and protects against post-fasting nausea, acid reflux, and abdominal spasms."
  }
];

// Helper to get all combined vrats
export const ALL_VRATS_CATALOG: VratItem[] = [
  ...WEEKLY_VRATS,
  ...ALL_24_EKADASHIS,
  ...ALL_7_PRADOSHS,
  MAHA_SHIVRATRI_DATA,
  ...MAJOR_AND_SPECIAL_VRATS,
  ...GUPT_AND_RARE_VRATS
];

