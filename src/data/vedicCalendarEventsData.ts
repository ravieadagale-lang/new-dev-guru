// Comprehensive 12-Month Vedic Calendar, Auspicious Festivals, Occasions & Shastric Guidance
import { ALL_SACRED_FESTIVALS, FestivalEvent } from "./festivalsRemediesData";

export interface VedicMonthEvent {
  id: string;
  name: string;
  nameHi: string;
  monthIndex: number; // 0 = Jan, 1 = Feb, ..., 11 = Dec
  monthName: string;
  vedicMonth: string;
  vedicMonthHi: string;
  gregorianDate: string; // YYYY-MM-DD
  dateDisplay: string;
  tithi: string;
  tithiHi: string;
  category: "mahaparva" | "festival" | "vrat" | "jayanti" | "muhurta" | "amavasya_purnima";
  categoryLabel: string;
  deity: string;
  deityHi: string;
  significance: string;
  eveDate: string;
  eveGuidance: {
    summary: string;
    checklist: string[];
    altarDirection: string;
  };
  exactMuhurtas: {
    label: string;
    timing: string;
    description: string;
  }[];
  ritualsAndVidhi: {
    overview: string;
    samagri: string[];
    steps: string[];
    mantraDevanagari: string;
    mantraTransliteration: string;
    mantraMeaning: string;
  };
  rulesAndDiscipline: {
    fastingType: "Nirjala (No Water)" | "Phalahari (Fruits & Milk)" | "Ekasana (Single Meal)" | "Sattvic Vow";
    permittedFoods: string[];
    strictlyProhibited: string[];
    dosAndDonts: string[];
    paranaTiming: string;
  };
  ancientRemedies: {
    title: string;
    benefits: string;
    procedure: string;
    mantra?: string;
  }[];
}

export interface VedicMonthMeta {
  index: number;
  name: string;
  vedic: string;
  icon: string;
  year: number;
  isCurrent: boolean;
  statusLabel: string;
}

// 12 Months ordered chronologically from current running calendar cycle
const CURRENT_SYS_MONTH = new Date().getMonth();
const CURRENT_SYS_YEAR = new Date().getFullYear();

export const VEDIC_MONTH_NAMES: VedicMonthMeta[] = [
  { index: 8, name: "September", vedic: "Bhadrapada - Ashwina", icon: "🪔", year: 2026, isCurrent: CURRENT_SYS_MONTH === 8 && CURRENT_SYS_YEAR === 2026, statusLabel: CURRENT_SYS_MONTH === 8 ? "Current Month (2026)" : "September 2026" },
  { index: 9, name: "October", vedic: "Ashwina - Kartika", icon: "✨", year: 2026, isCurrent: (CURRENT_SYS_MONTH === 9 && CURRENT_SYS_YEAR === 2026) || CURRENT_SYS_MONTH === 9, statusLabel: CURRENT_SYS_MONTH === 9 ? "Current Month (2026)" : "Upcoming 2026" },
  { index: 10, name: "November", vedic: "Kartika - Margashirsha", icon: "🔥", year: 2026, isCurrent: CURRENT_SYS_MONTH === 10 && CURRENT_SYS_YEAR === 2026, statusLabel: CURRENT_SYS_MONTH === 10 ? "Current Month (2026)" : "Upcoming 2026" },
  { index: 11, name: "December", vedic: "Margashirsha - Pausha", icon: "🌙", year: 2026, isCurrent: CURRENT_SYS_MONTH === 11 && CURRENT_SYS_YEAR === 2026, statusLabel: CURRENT_SYS_MONTH === 11 ? "Current Month (2026)" : "Upcoming 2026" },
  { index: 0, name: "January", vedic: "Pausha - Magha", icon: "❄️", year: 2027, isCurrent: CURRENT_SYS_MONTH === 0 && CURRENT_SYS_YEAR === 2027, statusLabel: "Upcoming 2027" },
  { index: 1, name: "February", vedic: "Magha - Phalguna", icon: "🌸", year: 2027, isCurrent: CURRENT_SYS_MONTH === 1 && CURRENT_SYS_YEAR === 2027, statusLabel: "Upcoming 2027" },
  { index: 2, name: "March", vedic: "Phalguna - Chaitra", icon: "🎨", year: 2027, isCurrent: CURRENT_SYS_MONTH === 2 && CURRENT_SYS_YEAR === 2027, statusLabel: "Upcoming 2027" },
  { index: 3, name: "April", vedic: "Chaitra - Vaishakha", icon: "☀️", year: 2027, isCurrent: CURRENT_SYS_MONTH === 3 && CURRENT_SYS_YEAR === 2027, statusLabel: "Upcoming 2027" },
  { index: 4, name: "May", vedic: "Vaishakha - Jyeshtha", icon: "🌿", year: 2027, isCurrent: CURRENT_SYS_MONTH === 4 && CURRENT_SYS_YEAR === 2027, statusLabel: "Upcoming 2027" },
  { index: 5, name: "June", vedic: "Jyeshtha - Ashadha", icon: "💧", year: 2027, isCurrent: CURRENT_SYS_MONTH === 5 && CURRENT_SYS_YEAR === 2027, statusLabel: "Upcoming 2027" },
  { index: 6, name: "July", vedic: "Ashadha - Shravana", icon: "🌧️", year: 2027, isCurrent: CURRENT_SYS_MONTH === 6 && CURRENT_SYS_YEAR === 2027, statusLabel: "Upcoming 2027" },
  { index: 7, name: "August", vedic: "Shravana - Bhadrapada", icon: "🦚", year: 2027, isCurrent: CURRENT_SYS_MONTH === 7 && CURRENT_SYS_YEAR === 2027, statusLabel: "Upcoming 2027" }
];

export const VEDIC_ALL_MONTH_EVENTS: VedicMonthEvent[] = [
  // ==========================
  // JANUARY (Pausha - Magha)
  // ==========================
  {
    id: "makar_sankranti",
    name: "Makar Sankranti / Pongal / Uttarayan",
    nameHi: "मकर संक्रांति व उत्तरायण महापर्व",
    monthIndex: 0,
    monthName: "January",
    vedicMonth: "Pausha Shukla",
    vedicMonthHi: "पौष शुक्ल पक्ष",
    gregorianDate: "2027-01-14",
    dateDisplay: "14 January 2027",
    tithi: "Surya Transition to Makara (Capricorn)",
    tithiHi: "सूर्य मकर राशि प्रवेश काल",
    category: "mahaparva",
    categoryLabel: "Maha Parva",
    deity: "Lord Surya Dev & Gayatri",
    deityHi: "भगवान सूर्य नारायण",
    significance: "Solar shift marking the divine dawn of the Devas (Uttarayan). Auspicious for life longevity, spiritual illumination, and charity of sesame, jaggery, and blankets.",
    eveDate: "2027-01-13",
    eveGuidance: {
      summary: "Procure black and white sesame (Til), organic jaggery (Gud), new copper vessel for Arghya, and woolen blankets for charity.",
      checklist: [
        "Procure black sesame seeds (Krishna Til) and organic Gud",
        "Prepare Khichdi ingredients (Moong dal, new rice, turmeric, desi ghee)",
        "Arrange woolens or warm blankets to donate to needy Brahmins or elders",
        "Cleanse copper kalash for sunrise Surya Arghya"
      ],
      altarDirection: "East (Purva Disha) facing rising Sun"
    },
    exactMuhurtas: [
      { label: "Makar Sankranti Punya Kaal", timing: "07:15 AM to 05:46 PM", description: "All sacred holy baths, charity, and mantras performed in this window yield Akshaya Punya." },
      { label: "Maha Punya Kaal Window", timing: "07:15 AM to 09:05 AM", description: "Supreme 2-hour window for Surya Arghya and black sesame daan." }
    ],
    ritualsAndVidhi: {
      overview: "Holy river bath (or Gangajal snana at home), Surya Arghya in copper lota with red kumkum and red flowers, and Til-Gud charity.",
      samagri: ["Black & white sesame", "Jaggery (Gud)", "Copper Lota", "Red Chandan", "Red Hibiscus", "Moong Dal & Rice for Khichdi", "Pure Cow Ghee"],
      steps: [
        "Take bath at Brahma Muhurta adding Gangajal and black sesame seeds to the bathwater.",
        "Face the East, fill copper vessel with clean water, akshat, red chandan, and jaggery.",
        "Offer Arghya to Lord Surya chanting the 12 sacred Aditya names or Surya Gayatri.",
        "Perform Gayatri Mantra Japa 108 times using a Rakta Chandan or Rudraksha mala.",
        "Distribute Til-Laddus to elders and donate Khichdi and warm blankets to the less privileged."
      ],
      mantraDevanagari: "ॐ सूर्याय नमः। ॐ ह्रीं ह्रीं सूर्याय सहस्रकिरणाय मनोवांछित फलं देहि देहि स्वाहा॥",
      mantraTransliteration: "Om Suryaya Namah | Om Hreem Hreem Suryaya Sahasrakiranaya Manovanchhita Phalam Dehi Dehi Swaha ||",
      mantraMeaning: "Salutations to the divine thousand-rayed Sun God who fulfills all righteous desires and dissolves darkness."
    },
    rulesAndDiscipline: {
      fastingType: "Sattvic Vow",
      permittedFoods: ["Til-Gud laddus", "Sattvic Moong Dal Khichdi with pure Ghee", "Seasonal vegetables", "Milk and curd"],
      strictlyProhibited: ["Tamasic foods (onion, garlic, alcohol)", "Harsh speech", "Consuming food before offering morning Surya Arghya"],
      dosAndDonts: ["Do take bath before sunrise", "Do donate black sesame to ward off Saturn afflictions", "Don't sweep floor during Punya Kaal"],
      paranaTiming: "After noon snan-daan or twilight"
    },
    ancientRemedies: [
      {
        title: "Surya-Shani Samanvaya Til Daan",
        benefits: "Removes bone ailments, eye issues, chronic debt, and father-son disputes.",
        procedure: "Mix black and white sesame in an earthen or copper bowl with jaggery. Rotate 7 times clockwise over head and donate to Shani temple or elderly person.",
        mantra: "ॐ शं शनैश्चराय नमः। ॐ घृणि सूर्याय नमः॥"
      }
    ]
  },
  {
    id: "pausha_putrada_ekadashi",
    name: "Pausha Putrada Ekadashi",
    nameHi: "पौष पुत्रदा एकादशी",
    monthIndex: 0,
    monthName: "January",
    vedicMonth: "Pausha Shukla",
    vedicMonthHi: "पौष शुक्ल एकादशी",
    gregorianDate: "2027-01-19",
    dateDisplay: "19 January 2027",
    tithi: "Ekadashi Tithi (11th Lunar Day)",
    tithiHi: "शुक्ल पक्ष एकादशी",
    category: "vrat",
    categoryLabel: "Sacred Ekadashi",
    deity: "Lord Narayana (Shri Hari Vishnu)",
    deityHi: "भगवान लक्ष्मीनारायण",
    significance: "According to Bhavishya Purana, this sacred fast bestows blessed progeny, protects children, and dissolves ancestral sins obstructing family lineage.",
    eveDate: "2027-01-18",
    eveGuidance: {
      summary: "Dashami evening preparation: consume only one simple sattvic meal before sunset without rice, clean the puja altar, and resolve for Ekadashi fast.",
      checklist: ["Procure Tulsi leaves before sunset on Dashami (do not pluck on Ekadashi)", "Yellow flowers and yellow cloth", "Makhana and dry fruits for Phalahar", "Pure ghee lamp"],
      altarDirection: "North-East (Ishan Kon)"
    },
    exactMuhurtas: [
      { label: "Ekadashi Puja Muhurta", timing: "06:45 AM to 10:30 AM", description: "Supreme window for Vishnu Sahasranama chanting and Tulsi Archana." },
      { label: "Dwadashi Parana Window", timing: "07:15 AM to 09:20 AM (Next Day)", description: "Mandatory time to break fast with water, Tulsi leaf, and sattvic Prasad." }
    ],
    ritualsAndVidhi: {
      overview: "Complete abstinence from rice and grains. Worship Lord Vishnu with Panchamrit abhishekam and offer yellow sweets.",
      samagri: ["Tulsi Dal (pre-plucked)", "Panchamrit (Milk, Curd, Ghee, Honey, Sugar)", "Yellow Chandan", "Yellow flowers", "Banana fruit", "Camphor"],
      steps: [
        "Take morning bath, wear clean yellow garments.",
        "Take Sankalpa in front of Lord Vishnu: 'I observe Putrada Ekadashi for lineage prosperity and spiritual purification.'",
        "Perform Vishnu Puja with yellow flowers, lighting ghee lamp and incense.",
        "Recite Vishnu Sahasranama or chant 'Om Namo Bhagavate Vasudevaya' 108x.",
        "Maintain silence or chant sacred names throughout the night (Jagran)."
      ],
      mantraDevanagari: "ॐ नमो भगवते वासुदेवाय। ॐ श्रीं विष्णवे नमः॥",
      mantraTransliteration: "Om Namo Bhagavate Vasudevaya | Om Shreem Vishnave Namah ||",
      mantraMeaning: "I bow to Lord Vasudeva, the all-pervading Supreme Lord who protects and nourishes all beings."
    },
    rulesAndDiscipline: {
      fastingType: "Phalahari (Fruits & Milk)",
      permittedFoods: ["Milk", "Curd", "Apples, Bananas, Papaya", "Sabudana with Sendha Namak", "Kuttu/Singhara flour", "Almonds and nuts"],
      strictlyProhibited: ["All rice and grains (rice is strictly prohibited on Ekadashi as per Padma Purana)", "Lentils/Dals", "Beans", "Table salt", "Onion and garlic"],
      dosAndDonts: ["Do not pluck Tulsi leaves on Ekadashi", "Avoid daytime sleeping", "Do not cut hair or nails"],
      paranaTiming: "Break fast on Dwadashi morning within Harivasara expiration window"
    },
    ancientRemedies: [
      {
        title: "Santana Gopala Mantra & Yellow Fruit Donation",
        benefits: "Clears lineage doshas (Putra Dosha), blesses childless couples, and protects infants.",
        procedure: "Offer 5 yellow bananas with a pinch of saffron to Lord Krishna while reciting Santana Gopala Mantra 108 times, then give to pregnant women or feed to a holy cow.",
        mantra: "ॐ देवकीसुत गोविन्द वासुदेव जगत्पते। देहि मे तनयं कृष्ण त्वामहं शरणं गतः॥"
      }
    ]
  },

  // ==========================
  // FEBRUARY (Magha - Phalguna)
  // ==========================
  {
    id: "vasant_panchami",
    name: "Vasant Panchami & Saraswati Puja",
    nameHi: "वसन्त पंचमी एवं माँ सरस्वती प्राकट्य पर्व",
    monthIndex: 1,
    monthName: "February",
    vedicMonth: "Magha Shukla",
    vedicMonthHi: "माघ शुक्ल पंचमी",
    gregorianDate: "2027-02-12",
    dateDisplay: "12 February 2027",
    tithi: "Shukla Panchami (5th Lunar Day)",
    tithiHi: "माघ शुक्ल पंचमी",
    category: "mahaparva",
    categoryLabel: "Maha Parva",
    deity: "Goddess Saraswati (Goddess of Wisdom & Arts)",
    deityHi: "माँ सरस्वती एवं कामदेव",
    significance: "Appearance day of Goddess Saraswati and arrival of spring (Rituraj Vasant). Unmatched day for Vidyarambha (initiating children into education), books puja, and musical instruments.",
    eveDate: "2027-02-11",
    eveGuidance: {
      summary: "Eve preparation: Gather textbooks, pens, musical instruments, and yellow robes. Keep yellow flowers (mustard blossoms or marigolds) ready.",
      checklist: ["Yellow garments for all family members", "Fresh yellow marigold flowers and mustard blossoms", "Books, notebooks, and pens to place at Mother's feet", "Kesariya Kheer (Saffron rice pudding) ingredients"],
      altarDirection: "North or North-East"
    },
    exactMuhurtas: [
      { label: "Saraswati Puja Muhurta", timing: "07:05 AM to 12:40 PM (Duration: 5h 35m)", description: "Auspicious window for worship, pencil writing initiation, and arts dedication." },
      { label: "Abhijit Muhurta Window", timing: "12:12 PM to 12:58 PM", description: "Peak cosmic alignment for intellect activation and Saraswati Kavacham recitation." }
    ],
    ritualsAndVidhi: {
      overview: "Wear yellow garments, place books and creative tools before Mother Saraswati, offer yellow flowers, yellow sweets, and Kesariya Halwa.",
      samagri: ["Yellow Marigold / Mustard flowers", "Saffron (Kesar)", "Yellow cloth", "White Chandan", "Veena or book symbol", "Pen with new ink", "Yellow boondi or Kesariya Kheer"],
      steps: [
        "Take morning bath wearing yellow clothing.",
        "Set up altar with idol or picture of Goddess Saraswati on a yellow cloth.",
        "Place children's books, instruments, and notebooks at her sacred feet.",
        "Apply white sandalwood and saffron tilak to the Goddess and all instruments.",
        "Offer yellow flowers and chant Saraswati Vandana ('Ya Kundendu Tushara Hara Dhavala').",
        "Perform Aarti and write 'ॐ ऐं सरस्वत्यै नमः' on a slate or paper for students."
      ],
      mantraDevanagari: "ॐ ऐं सरस्वत्यै ऐं नमः। ॐ ह्रीं श्रीं सरस्वत्यै नमः॥",
      mantraTransliteration: "Om Aim Saraswatyai Aim Namah | Om Hreem Shreem Saraswatyai Namah ||",
      mantraMeaning: "Salutations to Mother Saraswati, the cosmic storehouse of intelligence, eloquence, fine arts, and spiritual awakening."
    },
    rulesAndDiscipline: {
      fastingType: "Sattvic Vow",
      permittedFoods: ["Yellow saffron rice / Kesariya kheer", "Fruits", "Yellow lentil khichdi", "Milk and honey"],
      strictlyProhibited: ["Disrespecting books or pens", "Tamasic meals", "Harsh language"],
      dosAndDonts: ["Do start any new study, language, or music course today without needing a separate muhurta", "Do touch feet of teachers and gurus"],
      paranaTiming: "Post midday Saraswati Puja"
    },
    ancientRemedies: [
      {
        title: "Brahmi Swarna Saraswati Medha Diksha",
        benefits: "Permanently resolves speech stutter, lack of concentration in exams, and weak Mercury/Jupiter.",
        procedure: "Write the seed syllable 'ऐं' (AIM) on the tongue of children with a tulsi stem dipped in honey and saffron water during Abhijit Muhurta.",
        mantra: "ॐ ऐं ह्रीं क्लीं महासरस्वती देव्यै नमः॥"
      }
    ]
  },
  {
    id: "maha_shivratri_parva",
    name: "Maha Shivratri (The Great Night of Shiva)",
    nameHi: "महाशिवरात्रि महापर्व",
    monthIndex: 1,
    monthName: "February",
    vedicMonth: "Phalguna Krishna",
    vedicMonthHi: "फाल्गुन कृष्ण चतुर्दशी",
    gregorianDate: "2027-02-16",
    dateDisplay: "16 February 2027",
    tithi: "Krishna Chaturdashi",
    tithiHi: "कृष्ण पक्ष चतुर्दशी",
    category: "mahaparva",
    categoryLabel: "Maha Parva",
    deity: "Lord Shiva (Sadashiva) & Goddess Parvati",
    deityHi: "भगवान देवाधिदेव महादेव एवं माँ पार्वती",
    significance: "Supreme night when Lord Shiva manifested as the cosmic Jyotirlinga of infinite light and entered divine union with Goddess Parvati. Worship across all 4 Prahar nights eradicates grave sins and grants Moksha.",
    eveDate: "2027-02-15",
    eveGuidance: {
      summary: "Trayodashi Eve: Procure fresh unblemished 3-leaf Bilva Patras, raw milk, holy ashes (Bhasma), Dhatura, and fragrant flowers. Sanctify the Shivalinga altar.",
      checklist: ["108 unblemished 3-leaf Bilva Patras (Bel leaves)", "Raw cow milk, honey, sugarcane juice, and Gangajal for 4-Prahar Abhishekam", "Dhatura fruits, Bhasma, and White Chandan", "Akhand Jyot (earthen lamp with pure cow ghee)"],
      altarDirection: "North (Uttara Disha facing Shivalinga water outlet)"
    },
    exactMuhurtas: [
      { label: "Nishita Kaal Shiva Puja (Supreme)", timing: "11:58 PM to 12:48 AM (Duration: 50 Mins)", description: "The most sacred cosmic window when Shiva's Jyotirlinga energy descends on Earth." },
      { label: "First Prahar Puja", timing: "06:15 PM to 09:25 PM", description: "Worship with raw milk and water." },
      { label: "Second Prahar Puja", timing: "09:25 PM to 12:35 AM", description: "Worship with curd (Dahi) and honey." },
      { label: "Third Prahar Puja (Nishita)", timing: "12:35 AM to 03:45 AM", description: "Worship with pure cow ghee and Bilva patra." },
      { label: "Fourth Prahar Puja", timing: "03:45 AM to 06:55 AM", description: "Worship with sugarcane juice, honey, and bhasma." }
    ],
    ritualsAndVidhi: {
      overview: "Continuous Maha Rudrabhishekam, night vigil (Jagran), and offering of Bilva patra, Dhatura, and Bhasma on Shivalinga.",
      samagri: ["Shivalinga (Narmadeshwar or Parad)", "Raw Cow Milk", "Gangajal", "Honey (Madhu)", "Desi Ghee", "Sugarcane juice", "108 Bilva Patras", "Dhatura & Bhaang", "Bhasma (Vibhuti)", "White Chandan"],
      steps: [
        "Take morning bath with water containing a drop of Gangajal and black sesame.",
        "Take solemn Sankalpa for Nirjala or Phalahar fast throughout day and night.",
        "Perform Shivalinga Abhishekam sequentially: Jal -> Milk -> Curd -> Ghee -> Honey -> Sugarcane juice -> Gangajal.",
        "Apply three horizontal lines of Bhasma (Tripundra) and white sandalwood paste.",
        "Offer 108 Bilva patras with smooth side downwards, chanting 'Om Namah Shivaya' with each leaf.",
        "Perform night-long chanting of Maha Mrityunjaya Mantra and Shiva Tandava Stotram."
      ],
      mantraDevanagari: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥",
      mantraTransliteration: "Om Tryambakam Yajamahe Sugandhim Pushtivardhanam | Urvarukamiva Bandhanan Mrityormukshiya Maamritat ||",
      mantraMeaning: "We worship the three-eyed Lord Shiva, fragrant and nourisher of all. As a ripe cucumber is severed from its stalk, may He liberate us from death and bondages into immortality."
    },
    rulesAndDiscipline: {
      fastingType: "Nirjala (No Water)",
      permittedFoods: ["Water/Milk (if health requires Sajala)", "Singhara / Kuttu flour", "Fruits and Sendha Namak for aged/sick"],
      strictlyProhibited: ["Grains, pulses, and common salt", "Sleeping during the night of Shivratri", "Using Ketaki flower, Tulsi, or turmeric (Haldi) on Shivalinga"],
      dosAndDonts: ["Never offer Ketaki flower or Haldi to Shivalinga", "Do keep an Akhand Deep burning all night", "Do avoid negative thoughts or anger"],
      paranaTiming: "Next day after sunrise post morning bath and temple Shiva darshan (07:05 AM - 10:15 AM)"
    },
    ancientRemedies: [
      {
        title: "108 Bilva Patra Chandan Abhishek for Chronic Ailments & Rahu-Ketu",
        benefits: "Cures prolonged illnesses, reverses Kala Sarpa dosha, and removes fear of untimely death.",
        procedure: "Write 'राम' (RAMA) in sandalwood paste on the middle leaf of 108 Bilva patras. Offer one by one on Shivalinga while chanting Maha Mrityunjaya Mantra.",
        mantra: "ॐ तत्पुरुषाय विद्महे महादेवाय धीमहि तन्नो रुद्रः प्रचोदयात्॥"
      }
    ]
  },

  // ==========================
  // MARCH (Phalguna - Chaitra)
  // ==========================
  {
    id: "holi_holika_dahan",
    name: "Holika Dahan & Holi (Dhulandi)",
    nameHi: "होलिका दहन एवं धुलेंडी रंगोत्सव",
    monthIndex: 2,
    monthName: "March",
    vedicMonth: "Phalguna Purnima",
    vedicMonthHi: "फाल्गुन पूर्णिमा",
    gregorianDate: "2027-03-03",
    dateDisplay: "3 March 2027",
    tithi: "Phalguna Purnima (Full Moon Day)",
    tithiHi: "फाल्गुन पूर्णिमा",
    category: "mahaparva",
    categoryLabel: "Maha Parva",
    deity: "Lord Narasimha & Bhakta Prahlada",
    deityHi: "भगवान नृसिंह एवं भक्त प्रह्लाद",
    significance: "Victory of supreme divine devotion over demonic tyranny (Holika burnt while Prahlada remained untouched). Holika ash (Bhasma) acts as an armor against negative energies, evil eye, and chronic planetary hexes.",
    eveDate: "2027-03-02",
    eveGuidance: {
      summary: "Procure dry cow dung cakes (Badkulla), whole wheat stalks (Bali), coconut, raw thread, and mustard seeds for evil-eye warding.",
      checklist: ["Dry wood and cow dung garlands (Gulari/Badkulla)", "Green wheat and barley stalks for roasting", "Whole dry coconut with husk", "White sweet offerings and Gulal"],
      altarDirection: "North-West or Village Commons"
    },
    exactMuhurtas: [
      { label: "Holika Dahan Muhurta (Bhadra Free)", timing: "06:28 PM to 08:52 PM (Duration: 2h 24m)", description: "Strictly auspicious window after Bhadra punchha/mukha has passed." },
      { label: "Rangwali Holi (Dhulandi)", timing: "Sunrise to Sunset (Next Day)", description: "Joyful celebration of natural herbal colors, love, and divine forgiveness." }
    ],
    ritualsAndVidhi: {
      overview: "Worship Holika pyre with water, turmeric, akshat, and flowers before lighting. Circumambulate 7 times with raw thread and roast new grain stalks.",
      samagri: ["Cow dung cakes", "Green wheat stalks", "Turmeric and Kumkum", "Raw cotton thread (Moli)", "Whole coconut", "Batashe (Sugar drops)"],
      steps: [
        "Bathe in the evening and assemble at the Holika pyre before the muhurta.",
        "Sprinkle Gangajal around the pyre and place the cow dung garland.",
        "Offer turmeric, flowers, and sweets, praying for protection from all adversities.",
        "Tie raw thread around the Holika pyre, rotating clockwise 3, 5, or 7 times.",
        "After pyre is lit, roast green wheat stalks in the holy fire and distribute as sacred prasad.",
        "Collect a pinch of cold Holika ash next morning and apply to forehead for universal protection."
      ],
      mantraDevanagari: "ॐ नमो भगवते नृसिंहाय। असृक्पाशं च खड्गं च धारयन्ते महाबलाय स्वाहा॥",
      mantraTransliteration: "Om Namo Bhagavate Narasimhaya | Asrikpasham Cha Khadgam Cha Dharayante Mahabalaya Swaha ||",
      mantraMeaning: "Salutations to Lord Narasimha, the supreme fierce protector who destroys all evil, fears, and demonic obstacles."
    },
    rulesAndDiscipline: {
      fastingType: "Sattvic Vow",
      permittedFoods: ["Gunjiyas made of mawa", "Thandai with nuts", "Sattvic meals", "Sweet roasted barley"],
      strictlyProhibited: ["Starting Holika Dahan during Bhadra Kaal", "Synthetic chemical toxic colors", "Consuming intoxicating drugs"],
      dosAndDonts: ["Never light Holika during Bhadra", "Do bring roasted stalks home and store in grain box for abundance"],
      paranaTiming: "After witnessing Holika Dahan"
    },
    ancientRemedies: [
      {
        title: "Holika Ash & Mustard Nazar Suraksha Shield",
        benefits: "Cuts black magic, negative eye (Buri Nazar), severe chronic anxiety, and home Vastu dosha.",
        procedure: "Collect cold sacred ash from Holika pyre at dawn. Mix with a pinch of rock salt and yellow mustard seeds, pack in a silver amulet or red cloth, and keep near main door.",
        mantra: "ॐ नृसिंहाय विद्महे वज्रनखाय धीमहि तन्नो सिंहः प्रचोदयात्॥"
      }
    ]
  },
  {
    id: "chaitra_navratri_gudi_padwa",
    name: "Chaitra Navratri Ghatasthapana & Hindu New Year (Vikram Samvat)",
    nameHi: "चैत्र नवरात्रि घटस्थापना एवं हिन्दू नववर्ष (विक्रम संवत)",
    monthIndex: 2,
    monthName: "March",
    vedicMonth: "Chaitra Shukla",
    vedicMonthHi: "चैत्र शुक्ल प्रतिपदा",
    gregorianDate: "2027-03-19",
    dateDisplay: "19 March 2027",
    tithi: "Chaitra Shukla Pratipada",
    tithiHi: "चैत्र शुक्ल प्रतिपदा",
    category: "mahaparva",
    categoryLabel: "Maha Parva",
    deity: "Goddess Durga (Maa Shailaputri) & Lord Brahma",
    deityHi: "माँ शैलपुत्री, माँ दुर्गा एवं ब्रह्मा जी",
    significance: "Creation day of the universe by Lord Brahma and commencement of the new Vedic Vikram Samvat. Nine nights of cosmic feminine shakti awakening, ending on Rama Navami.",
    eveDate: "2027-03-18",
    eveGuidance: {
      summary: "Clean home altar thoroughly. Procure earthen pot (Kalash), pure red cloth, mango leaves (Amra Pallav), coconut, sacred clay, and barley seeds (Jau).",
      checklist: ["Earthen or copper Kalash", "Clean soil and Jau (barley seeds) for sowing", "7 Mango tree leaves and green coconut wrapped in red chunri", "Akhand Jyot brass lamp and cow ghee", "Durga Saptashati book"],
      altarDirection: "North-East (Ishan Kon)"
    },
    exactMuhurtas: [
      { label: "Ghatasthapana Muhurta", timing: "06:18 AM to 10:14 AM (Duration: 3h 56m)", description: "Supreme window for Kalash sthapana, sowing barley, and lighting Akhand Jyot." },
      { label: "Abhijit Muhurta Window", timing: "12:05 PM to 12:53 PM", description: "Universal auspicious window if morning muhurta was missed." }
    ],
    ritualsAndVidhi: {
      overview: "Installation of the sacred Kalash with Ganga water, mango leaves, and coconut. Sowing of sacred barley, invoking 9 forms of Durga, and daily Durga Saptashati recitation.",
      samagri: ["Clean earthen tray with soil", "Barley seeds (Jau)", "Copper/Earthen Kalash", "Gangajal", "Mango leaves", "Raw coconut", "Red Chunri", "Panchamrit", "Desi Ghee lamp", "Dhoop"],
      steps: [
        "Take holy bath at dawn and set up a wooden chowki in the North-East corner covered with red cloth.",
        "Spread clean river soil in the earthen pot, sow barley seeds, and sprinkle fresh water.",
        "Place Kalash filled with Gangajal, supari, coin, and durva over the soil tray.",
        "Arrange 7 mango leaves around the rim and place a coconut wrapped in red moli and cloth on top.",
        "Light Akhand Jyot with prayer to Maa Durga for 9 days of guidance and protection.",
        "Perform Dhyana of Maa Shailaputri and begin Chapter 1 of Durga Saptashati."
      ],
      mantraDevanagari: "ॐ जयंती मंगला काली भद्रकाली कपालिनी। दुर्गा क्षमा शिवा धात्री स्वाहा स्वधा नमोऽस्तु ते॥",
      mantraTransliteration: "Om Jayanti Mangala Kali Bhadrakali Kapalini | Durga Kshama Shiva Dhatri Swaha Swadha Namostute ||",
      mantraMeaning: "Salutations to the triumphant, auspicious Mother Kali, Bhadrakali, Kapalini, Durga, forgiveness, consciousness, and the universal nurturer."
    },
    rulesAndDiscipline: {
      fastingType: "Phalahari (Fruits & Milk)",
      permittedFoods: ["Singhara/Kuttu flour", "Sabudana", "Potatoes with rock salt (Sendha Namak)", "Fresh seasonal fruits", "Milk and curd"],
      strictlyProhibited: ["Grains, wheat, rice, and lentils", "Cutting hair, shaving, or trimming nails during the 9 days", "Leaving the house empty with Akhand Jyot burning"],
      dosAndDonts: ["Maintain celibacy (Brahmacharya) during the 9 nights", "Water the barley sprout bed every morning with Gangajal"],
      paranaTiming: "On Dashami after Kanya Pujan and Visarjan"
    },
    ancientRemedies: [
      {
        title: "Navarna Mantra 9-Day Shakti Kavacham",
        benefits: "Dissolves all court cases, removes planetary malefic effects (Navagraha Shanti), and bestows invincible self-confidence.",
        procedure: "Chant 11 rounds (1188 mantras) of Navarna Mantra daily using a Red Sandalwood or Spatik rosary.",
        mantra: "ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे॥"
      }
    ]
  },

  // ==========================
  // APRIL (Chaitra - Vaishakha)
  // ==========================
  {
    id: "rama_navami",
    name: "Shri Rama Navami",
    nameHi: "श्री राम नवमी महापर्व",
    monthIndex: 3,
    monthName: "April",
    vedicMonth: "Chaitra Shukla",
    vedicMonthHi: "चैत्र शुक्ल नवमी",
    gregorianDate: "2027-03-27",
    dateDisplay: "27 March 2027",
    tithi: "Chaitra Shukla Navami",
    tithiHi: "चैत्र शुक्ल नवमी",
    category: "mahaparva",
    categoryLabel: "Maha Parva",
    deity: "Maryada Purushottam Lord Shri Rama",
    deityHi: "मर्यादा पुरुषोत्तम भगवान श्री राम",
    significance: "Appearance of Lord Shri Rama at noon in Ayodhya in Abhijit Muhurta. Culmination of Chaitra Navratri with Kanya Pujan and Ramayana recitation.",
    eveDate: "2027-03-26",
    eveGuidance: {
      summary: "Arrange yellow sweets, panjiri, fruits, tulsi leaves, and prepare gifts and prasad for 9 little girls (Kanya Pujan).",
      checklist: ["Red ribbons, bangles, and chunris for 9 young girls (Kanjaks)", "Halwa, Puri, and Chana Prasad", "Panchamrit for Rama Lalla idol abhishekam", "Tulsi leaves and yellow flowers"],
      altarDirection: "East"
    },
    exactMuhurtas: [
      { label: "Shri Rama Janmotsav Muhurta", timing: "11:15 AM to 01:42 PM (Duration: 2h 27m)", description: "Peak midday window when Lord Rama took avatar in Ayodhya." },
      { label: "Kanya Pujan Auspicious Window", timing: "08:30 AM to 11:30 AM", description: "Worship of 9 little girls as living embodiments of Nava Durga." }
    ],
    ritualsAndVidhi: {
      overview: "Midday Rama Janma celebrations with conch blowing, bells, rocking baby Rama in cradle, chanting Ram Raksha Stotra, and feeding 9 girls.",
      samagri: ["Baby Rama (Rama Lalla) idol or picture", "Panchamrit", "Yellow cloth and yellow flowers", "Tulsi leaves", "Dhaniya Panjiri Prasad", "Halwa, Puri, Chana"],
      steps: [
        "Decorate home temple and cradle with flowers and yellow satin.",
        "Perform Kanya Pujan in morning: wash feet of 9 girls, apply tilak, and serve Halwa-Puri-Chana.",
        "At 12:00 PM noon, blow conch (Shankha) and sing 'Bhaye Pragat Kripala Dinadayala Kaushalya Hitkari'.",
        "Offer Dhaniya Panjiri and Tulsi leaves to Lord Rama.",
        "Recite Ram Raksha Stotra or Sundarakanda with family."
      ],
      mantraDevanagari: "श्री राम जय राम जय जय राम। ॐ रां रामाय नमः॥",
      mantraTransliteration: "Shri Rama Jaya Rama Jaya Jaya Rama | Om Raam Ramaya Namah ||",
      mantraMeaning: "Glory to Lord Rama, the ocean of righteousness, peace, and eternal refuge for all souls."
    },
    rulesAndDiscipline: {
      fastingType: "Phalahari (Fruits & Milk)",
      permittedFoods: ["Dhaniya Panjiri", "Fruits", "Sattvic sabudana", "Milk and curd"],
      strictlyProhibited: ["Grains before completing midday Janmotsav and Kanya Pujan", "Ego and angry behavior"],
      dosAndDonts: ["Must invite at least 1 young boy (Batuk Bhairava) along with the 9 girls", "Do recite Ram Raksha Stotra"],
      paranaTiming: "After midday Rama Janmotsav and Aarti"
    },
    ancientRemedies: [
      {
        title: "Ram Raksha Stotra Siddha Kavach",
        benefits: "Cures severe fear of enemies, removes negative energies, and gives protective aura over children.",
        procedure: "Recite Ram Raksha Stotra 11 times sitting on an Asana in front of Rama Darbar and drink water sanctified by the recitation.",
        mantra: "रामेति रामभद्रति रामचन्द्रेति वा स्मरन्। नरो न लिप्यते पापैर्भुक्तिं मुक्तिं च विन्दति॥"
      }
    ]
  },
  {
    id: "hanuman_jayanti",
    name: "Shri Hanuman Jayanti (Chaitra Purnima)",
    nameHi: "श्री हनुमान जन्मोत्सव (चैत्र पूर्णिमा)",
    monthIndex: 3,
    monthName: "April",
    vedicMonth: "Chaitra Purnima",
    vedicMonthHi: "चैत्र शुक्ल पूर्णिमा",
    gregorianDate: "2027-04-02",
    dateDisplay: "2 April 2027",
    tithi: "Chaitra Purnima",
    tithiHi: "चैत्र पूर्णिमा",
    category: "jayanti",
    categoryLabel: "Divine Jayanti",
    deity: "Lord Hanuman (Sankat Mochan)",
    deityHi: "पवनपुत्र हनुमान जी",
    significance: "Appearance of Mahabali Hanuman, the 11th Rudra avatar. Dispeller of all ghosts, evils, chronic Saturn Sade Sati, Manglik dosha, and mental anxiety.",
    eveDate: "2027-04-01",
    eveGuidance: {
      summary: "Procure pure orange Sindoor, Jasmine oil (Chameli tel), betel leaf (Paan ka Beeda), red boondi, and red flag.",
      checklist: ["Pure orange Sindoor & Chameli oil for Chola", "Fresh Banarasi Paan with gulkand, fennel, and clove (no tobacco)", "108 Betel leaves for garland", "Besan / Boondi Ladoos"],
      altarDirection: "South or East"
    },
    exactMuhurtas: [
      { label: "Brahma Muhurta Puja", timing: "04:45 AM to 06:12 AM", description: "Auspicious dawn period matching Hanuman Ji's exact birth moment." },
      { label: "Abhijit Puja Muhurta", timing: "11:58 AM to 12:48 PM", description: "Supreme window for offering Sindoor Chola and Sundarakanda recitation." }
    ],
    ritualsAndVidhi: {
      overview: "Offer orange Sindoor Chola with Chameli oil, recite Hanuman Chalisa 11 or 100 times, offer red flag on rooftop, and distribute boondi.",
      samagri: ["Orange Sindoor", "Chameli oil", "Red flowers", "Red Langot/Vastra", "Paan ka beeda", "Boondi or Motichoor laddus", "Mustard oil lamp"],
      steps: [
        "Take early morning bath wearing clean red or orange garments.",
        "Visit Hanuman temple or clean home altar.",
        "Offer Sindoor mixed with Chameli oil gently to the deity.",
        "Offer a garland of 108 fresh betel leaves washed with Gangajal.",
        "Light a four-faced lamp with mustard or sesame oil.",
        "Recite Hanuman Chalisa 7, 11, or 21 times, followed by Bajrang Baan and Sankat Mochan Ashtak.",
        "Offer sweet Paan and distribute boondi to devotees."
      ],
      mantraDevanagari: "ॐ हं हनुमते रुद्रात्मकाय हुं फट्। ॐ नमो भगवते आंजनेयाय महाबलाय स्वाहा॥",
      mantraTransliteration: "Om Ham Hanumate Rudratmakaya Hum Phat | Om Namo Bhagavate Anjaneyaya Mahabalaya Swaha ||",
      mantraMeaning: "Salutations to Lord Hanuman, the embodiment of Rudra, endowed with infinite courage and strength to destroy all obstacles."
    },
  },

  // ==========================
  // MAY (Vaishakha - Jyeshtha)
  // ==========================
  {
    id: "akshaya_tritiya_parva",
    name: "Akshaya Tritiya (Akha Teej)",
    nameHi: "अक्षय तृतीया (अखा तीज) एवं परशुराम जयंती",
    monthIndex: 4,
    monthName: "May",
    vedicMonth: "Vaishakha Shukla",
    vedicMonthHi: "वैशाख शुक्ल तृतीया",
    gregorianDate: "2027-04-20",
    dateDisplay: "20 April 2027",
    tithi: "Vaishakha Shukla Tritiya",
    tithiHi: "वैशाख शुक्ल तृतीया",
    category: "mahaparva",
    categoryLabel: "Maha Parva",
    deity: "Goddess Mahalakshmi, Lord Vishnu & Kuber",
    deityHi: "माँ महालक्ष्मी, भगवान विष्णु एवं कुबेर देव",
    significance: "Day of imperishable fortune (Akshaya = never diminishing). Treta Yuga began on this day. Any gold purchase, Japa, Yajna, or charity (Daan) performed yields infinite eternal blessings.",
    eveDate: "2027-04-19",
    eveGuidance: {
      summary: "Clean home temple with Gangajal. Procure an earthen pot (Matka) for water donation, barley (Jau), raw honey, and gold/silver.",
      checklist: ["Earthen water pot (Udakumbha) with lid", "Jaggery (Gud) and Sattu for Daan", "Hand fan (Pankha) and umbrella to donate against summer heat", "Pure cow ghee for Lakshmi lamp"],
      altarDirection: "North (Kuber Disha) or Ishan Kon"
    },
    exactMuhurtas: [
      { label: "Akshaya Tritiya Punya Kaal", timing: "06:12 AM to 12:45 PM", description: "Prime window for snan, daan, and japa." },
      { label: "Gold & Property Buying Muhurta", timing: "06:12 AM to 05:40 AM (Next Day)", description: "Uninterrupted auspicious window for buying gold, metals, vehicles, and house warming." }
    ],
    ritualsAndVidhi: {
      overview: "Holy river snana, Lakshmi-Narayana puja with yellow flowers and white sweets, Udakumbha daan, and Kanakadhara Stotra path.",
      samagri: ["Earthen pot filled with pure water", "Barley (Jau)", "Sattu & Jaggery", "Yellow cowries (Peeli Kodi)", "Lotus flowers or yellow marigold", "Kheer for Bhog"],
      steps: [
        "Take holy bath in morning adding Gangajal and chandan.",
        "Set up Lakshmi-Narayana idol on red/yellow cloth.",
        "Offer 11 yellow cowries, lotus seeds (Kamalgatta), and fresh flowers.",
        "Perform Kanakadhara Stotra or Shri Sukta path 11 times.",
        "Donate the earthen water pot filled with water and jaggery to a Brahmin or thirst relief center.",
        "Purchase gold, silver, or rock salt as a token of unbroken prosperity."
      ],
      mantraDevanagari: "ॐ श्रीं ह्रीं क्लीं श्रीं सिद्धलक्ष्म्यै नमः। ॐ नमो नारायणाय॥",
      mantraTransliteration: "Om Shreem Hreem Kleem Shreem Siddhalakshmyai Namah | Om Namo Narayanaya ||",
      mantraMeaning: "Salutations to Supreme Goddess Siddhalakshmi and Lord Narayana, source of unbroken abundance and liberation."
    },
    rulesAndDiscipline: {
      fastingType: "Sattvic Vow",
      permittedFoods: ["Sattu sharbat with jaggery", "Kheer", "Fruits", "Sattvic vegetarian food"],
      strictlyProhibited: ["Refusing water to anyone", "Lending money to enemies", "Tamasic meals"],
      dosAndDonts: ["Must donate water (Udakumbha) to relieve thirst", "Do keep purchased gold at Mother Lakshmi's feet"],
      paranaTiming: "After midday Puja and Daan"
    },
    ancientRemedies: [
      {
        title: "Udakumbha Daan for Pitru & Sun Affliction",
        benefits: "Cuts severe ancestral curses (Pitru Dosha) and confers relief from chronic high blood pressure and career blocks.",
        procedure: "Fill a new earthen pot with cold drinking water, place a muskmelon and dakshina on the lid, and donate to an elder or temple while facing South.",
        mantra: "एष धर्मघटो दत्तो ब्रह्मविष्णुशिवात्मकः। अस्य प्रदानात् तृप्यन्तु पितरोऽपि पितामहाः॥"
      }
    ]
  },

  // ==========================
  // JUNE (Jyeshtha - Ashadha)
  // ==========================
  {
    id: "nirjala_ekadashi",
    name: "Nirjala Ekadashi (Bhimseni Ekadashi)",
    nameHi: "निर्जला एकादशी (भीमसेनी एकादशी)",
    monthIndex: 5,
    monthName: "June",
    vedicMonth: "Jyeshtha Shukla",
    vedicMonthHi: "ज्येष्ठ शुक्ल एकादशी",
    gregorianDate: "2027-06-15",
    dateDisplay: "15 June 2027",
    tithi: "Jyeshtha Shukla Ekadashi",
    tithiHi: "ज्येष्ठ शुक्ल एकादशी",
    category: "vrat",
    categoryLabel: "Sacred Ekadashi",
    deity: "Lord Vishnu (Shri Hari)",
    deityHi: "भगवान श्री हरि विष्णु",
    significance: "The most stringent and spiritually powerful of all 24 annual Ekadashis. Observed strictly without a single drop of water. Equal to the merit of observing all 24 Ekadashis combined, as revealed by Sage Vyasa to Bhima.",
    eveDate: "2027-06-14",
    eveGuidance: {
      summary: "Dashami evening: Take single sattvic meal before sunset, sip water for Achamana, take solemn Sankalpa for total waterless fast, and prepare melons and water pots for Daan.",
      checklist: ["New earthen pitcher for water donation", "Seasonal fruits (Muskmelon, Mangoes)", "Hand fans and umbrellas for summer Daan", "Tulsi leaves pre-plucked on Dashami"],
      altarDirection: "North-East"
    },
    exactMuhurtas: [
      { label: "Sankalpa & Vishnu Puja Muhurta", timing: "05:30 AM to 08:45 AM", description: "Brahma Muhurta initiation of Nirjala fast." },
      { label: "Dwadashi Parana Window (Next Morning)", timing: "05:25 AM to 08:30 AM", description: "Sacred window to break fast by drinking water sanctified with Tulsi." }
    ],
    ritualsAndVidhi: {
      overview: "Complete abstinence from water and food for 24 hours (sunrise to next sunrise). Night vigil with Vishnu Sahasranama and large-scale water pot distribution.",
      samagri: ["Earthen pot filled with Gangajal", "Yellow cloth", "Muskmelons", "Fans", "Tulsi Dal", "Pure cow ghee lamp"],
      steps: [
        "Take morning bath, wear yellow clothes, and perform Achamana with only water that fits in a mustard spoon.",
        "Take solemn vow: 'O Lord Vishnu, I undertake this Nirjala vow to purify all karmas.'",
        "Worship Shaligram or Vishnu with Panchamrit and Tulsi leaves.",
        "Chant 'Om Namo Bhagavate Vasudevaya' 108x or recite Vishnu Sahasranama.",
        "Spend the evening singing bhajans and donate water pots to the thirsty.",
        "Next day after sunrise, offer water to Lord Vishnu, feed Brahmins, and break fast with holy water."
      ],
      mantraDevanagari: "ॐ नमो नारायणाय। ॐ विष्णवे नमः। ॐ क्लीं कृष्णाय गोविंदाय गोपीजनवल्लभाय स्वाहा॥",
      mantraTransliteration: "Om Namo Narayanaya | Om Vishnave Namah | Om Kleem Krishnaya Govindaya Gopijanavallabhaya Swaha ||",
      mantraMeaning: "Salutations to Supreme Narayana who preserves creation and confers liberation to surrendered souls."
    },
    rulesAndDiscipline: {
      fastingType: "Nirjala (No Water)",
      permittedFoods: ["None during the 24 hours of Ekadashi (water prohibited for healthy adults)"],
      strictlyProhibited: ["Drinking water (except drop for Achamana)", "Rice, grains, fruits, milk", "Sleeping during the day"],
      dosAndDonts: ["If pregnant or unwell, can take water/milk", "Do donate water pots with melons"],
      paranaTiming: "Next day on Dwadashi morning after offering water to Lord Vishnu"
    },
    ancientRemedies: [
      {
        title: "Pani Ka Ghada & Kharbooza Daan",
        benefits: "Eradicates all inadvertent sins of previous years, bestows long life, and clears financial stagnation.",
        procedure: "Fill a fresh earthen pot with sweet water, place a muskmelon on top with Dakshina, wrap in yellow cloth, and donate to a thirsty person or temple priest.",
        mantra: "देवदेव हृषीकेश भक्तानामभयप्रद। अनेन जलदानेन ममोद्धर भवार्णवात्॥"
      }
    ]
  },

  // ==========================
  // JULY (Ashadha - Shravana)
  // ==========================
  {
    id: "guru_purnima_parva",
    name: "Guru Purnima (Vyasa Purnima)",
    nameHi: "गुरु पूर्णिमा (महर्षि वेदव्यास जयंती)",
    monthIndex: 6,
    monthName: "July",
    vedicMonth: "Ashadha Purnima",
    vedicMonthHi: "आषाढ़ पूर्णिमा",
    gregorianDate: "2027-07-29",
    dateDisplay: "29 July 2027",
    tithi: "Ashadha Purnima",
    tithiHi: "आषाढ़ पूर्णिमा",
    category: "mahaparva",
    categoryLabel: "Maha Parva",
    deity: "Maharshi Veda Vyasa, Adi Shankaracharya & Spiritual Guru",
    deityHi: "महर्षि वेदव्यास एवं सद्गुरु देव",
    significance: "Birth anniversary of Maharshi Veda Vyasa who compiled the four Vedas, 18 Puranas, and Mahabharata. Day to pay highest gratitude to the Guru who dispels the darkness of ignorance (Gu=Darkness, Ru=Remover).",
    eveDate: "2027-07-28",
    eveGuidance: {
      summary: "Procure yellow/white flowers, Guru Padukas or framed photo of Guru, yellow shawls/vastra, dry fruits, and Gurudakshina.",
      checklist: ["Yellow silk cloth and sandalwood paste", "Saffron and Akshat", "Guru Padukas or portrait", "Dakshina envelope and sweet prasad"],
      altarDirection: "North-East"
    },
    exactMuhurtas: [
      { label: "Guru Paduka Puja Muhurta", timing: "06:15 AM to 11:45 AM", description: "Auspicious window for Guru Charan Puja and Diksha renewal." },
      { label: "Purnima Snan & Satyanarayan Puja", timing: "07:20 AM to 01:10 PM", description: "Sacred window for Satyanarayan Katha and charity." }
    ],
    ritualsAndVidhi: {
      overview: "Paduka worship of the Guru with white chandan and yellow flowers, recitation of Guru Gita, offering Gurudakshina, and feeding saints.",
      samagri: ["Guru Padukas/Photo", "White Sandalwood paste", "Yellow marigold flowers", "Yellow cloth", "Ghee lamp", "Panchamrit", "Dry fruits"],
      steps: [
        "Take morning bath, meditate upon the spiritual master's form in the Ajna Chakra.",
        "Perform Abhishekam of Guru Padukas with Gangajal and Panchamrit.",
        "Apply white chandan and offer yellow fragrant flowers at the sacred feet.",
        "Recite Shri Guru Gita or Guru Stotram with devotion.",
        "Offer Gurudakshina mentally or in person, seeking blessings for spiritual realization."
      ],
      mantraDevanagari: "गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः। गुरुः साक्षात् परं ब्रह्म तस्मै श्रीगुरवे नमः॥",
      mantraTransliteration: "Gurur Brahma Gurur Vishnuh Gurur Devo Maheshwarah | Guruh Sakshat Param Brahma Tasmai Shri Gurave Namah ||",
      mantraMeaning: "The Guru is Brahma the creator, Vishnu the preserver, and Shiva the dissolver. The Guru is verily the Supreme Absolute Reality; salutations to that holy Master."
    },
    rulesAndDiscipline: {
      fastingType: "Phalahari (Fruits & Milk)",
      permittedFoods: ["Fruits", "Milk", "Kheer", "Sattvic Ekasana meal post twilight"],
      strictlyProhibited: ["Disrespecting any teacher, elder, or parent", "Lying or criticizing spiritual paths"],
      dosAndDonts: ["Touch feet of parents and teachers first thing in the morning", "Do read Bhagavad Gita"],
      paranaTiming: "Evening after Guru Aarti and Moonrise"
    },
    ancientRemedies: [
      {
        title: "Brihaspati (Jupiter) Dosha Shanti Peet Vastra Daan",
        benefits: "Activates dormant luck (Bhagyodaya), dissolves Jupiter affliction, and removes higher education hurdles.",
        procedure: "Offer 1.25 meters of yellow cloth, 5 turmeric roots (Sabut Haldi), and roasted chana dal to an enlightened teacher or temple priest.",
        mantra: "ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः॥"
      }
    ]
  },

  // ==========================
  // AUGUST (Shravana - Bhadrapada)
  // ==========================
  {
    id: "krishna_janmashtami_parva",
    name: "Shri Krishna Janmashtami (Gokulashtami)",
    nameHi: "श्री कृष्ण जन्माष्टमी (गोकुलाष्टमी)",
    monthIndex: 7,
    monthName: "August",
    vedicMonth: "Bhadrapada Krishna",
    vedicMonthHi: "भाद्रपद कृष्ण अष्टमी",
    gregorianDate: "2026-09-04",
    dateDisplay: "4 September 2026",
    tithi: "Bhadrapada Krishna Ashtami (Rohini Nakshatra)",
    tithiHi: "भाद्रपद कृष्ण अष्टमी एवं रोहिणी नक्षत्र",
    category: "mahaparva",
    categoryLabel: "Maha Parva",
    deity: "Lord Shri Krishna (Yogeshwar & Bal Gopal)",
    deityHi: "भगवान योगेश्वर श्री कृष्ण",
    significance: "Appearance day of Lord Shri Krishna at midnight inside Mathura prison to slay ignorance and restore Dharma. Midnight Abhishekam with Makhan-Mishri cleanses billions of lifetime sins.",
    eveDate: "2026-09-03",
    eveGuidance: {
      summary: "Cleanse Laddu Gopal cradle (Jhula). Procure fresh butter (Makhan), rock sugar (Mishri), Panchamrit, Tulsi leaves, and yellow Pitambari garments.",
      checklist: ["Decorative cradle (Jhula) for Bal Gopal", "Fresh white Makhan and Mishri for Maha Bhog", "Coriander Panjiri (Dhaniya Panjiri) ingredients", "Peacock feather (Mor Pankh) and small flute (Bansuri)"],
      altarDirection: "East or North-East"
    },
    exactMuhurtas: [
      { label: "Midnight Janmotsav Nishita Kaal (Supreme)", timing: "11:58 PM to 12:44 AM (Duration: 46 Mins)", description: "The exact midnight window when Lord Krishna was born." },
      { label: "Laddu Gopal Jhula Muhurta", timing: "Post Midnight until 01:30 AM", description: "Rocking the divine baby in the flower-adorned cradle." },
      { label: "Dahi Handi Mahotsav", timing: "Next Day Daytime", description: "Celebration of Krishna's playful childhood in Gokul." }
    ],
    ritualsAndVidhi: {
      overview: "Day-long fast until midnight, continuous chanting of 'Hare Krishna' Maha Mantra, 108-conch Panchamrit Abhishekam of Bal Gopal at midnight, offering Makhan-Mishri and Dhaniya Panjiri.",
      samagri: ["Bal Gopal / Laddu Gopal idol", "Cradle with velvet and flowers", "Shankha (Conch shell for abhishekam)", "Panchamrit", "Fresh Makhan & Mishri", "Dhaniya Panjiri", "Cucumber with stalk (Kheera for birth ritual)"],
      steps: [
        "Take morning bath, place Bal Gopal in the flower-decorated cradle.",
        "Observe waterless or fruit fast throughout the day with devotional kirtan.",
        "At 11:45 PM, prepare Panchamrit inside the holy conch.",
        "At 12:00 midnight, cut the cucumber stalk symbolising divine birth, blow conch, and ring temple bells.",
        "Bathe Bal Gopal with milk, curd, ghee, honey, and Gangajal.",
        "Dress Him in new yellow silk, place the flute in hand and peacock feather on crown.",
        "Offer Makhan-Mishri and Dhaniya Panjiri, and gently swing the cradle singing 'Lalla Ki Sunke Mai Aayi'."
      ],
      mantraDevanagari: "ॐ क्लीं कृष्णाय नमः। हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे। हरे राम हरे राम राम राम हरे हरे॥",
      mantraTransliteration: "Om Kleem Krishnaya Namah | Hare Krishna Hare Krishna Krishna Krishna Hare Hare | Hare Rama Hare Rama Rama Rama Hare Hare ||",
      mantraMeaning: "Salutations to the enchanting Lord Krishna whose divine names purify the heart of all mundane dirt and awaken unconditional love."
    },
    rulesAndDiscipline: {
      fastingType: "Phalahari (Fruits & Milk)",
      permittedFoods: ["Dhaniya Panjiri", "Makhan-Mishri prasad post midnight", "Fruits, milk, sabudana"],
      strictlyProhibited: ["Grains, pulses, and onion-garlic", "Breaking fast before the midnight Janmotsav and Aarti"],
      dosAndDonts: ["Must include Tulsi leaf in every offering to Krishna", "Do keep the cradle rocking gently"],
      paranaTiming: "Midnight after Janmotsav Aarti or next morning after sunrise"
    },
    ancientRemedies: [
      {
        title: "Santana Gopal & Makhan Mishri Bal Gopal Bhog",
        benefits: "Blesses childless couples, protects pregnant women, and clears child speech/health issues.",
        procedure: "Offer fresh white butter with pure sugar candy (Makhan-Mishri) and a fresh tulsi leaf to Laddu Gopal in the midnight window, praying for righteous offspring.",
        mantra: "ॐ श्रीं ह्रीं क्लीं ग्लौं देवकीसुत गोविन्द वासुदेव जगत्पते देहि मे तनयं कृष्ण त्वामहं शरणं गतः॥"
      }
    ]
  },

  // ==========================
  // SEPTEMBER (Bhadrapada - Ashwina)
  // ==========================
  {
    id: "hartalika_teej",
    name: "Hartalika Teej Vrat",
    nameHi: "हरितालिका तीज व्रत",
    monthIndex: 8,
    monthName: "September",
    vedicMonth: "Bhadrapada Shukla",
    vedicMonthHi: "भाद्रपद शुक्ल तृतीया",
    gregorianDate: "2026-09-13",
    dateDisplay: "13 September 2026",
    tithi: "Bhadrapada Shukla Tritiya",
    tithiHi: "भाद्रपद शुक्ल तृतीया",
    category: "vrat",
    categoryLabel: "Akhand Saubhagya Vrat",
    deity: "Lord Shiva & Goddess Parvati (Gauri-Shankar)",
    deityHi: "भगवान शिव एवं माँ पार्वती",
    significance: "Day when Goddess Parvati attained Lord Shiva as her divine consort after intense penance in the forest. Women observe 24-hour Nirjala fast for marital harmony, spouse longevity, and ideal life partner.",
    eveDate: "2026-09-12",
    eveGuidance: {
      summary: "Procure natural river clay or sand to sculpt Shiva-Parvati idols, 16 bridal adornment items (Suhag Samagri), fresh Bilva and Shami leaves.",
      checklist: ["Pure river clay (Kali mitti) or sand for making idols", "16 Suhag items (Sindoor, Bindi, Bangles, Mehendi, Alta, Chunri)", "Fresh leaves of 16 sacred trees", "Desi ghee and camphor for 4-prahar puja"],
      altarDirection: "North"
    },
    exactMuhurtas: [
      { label: "Pratahkaal Hartalika Puja Muhurta", timing: "06:05 AM to 08:35 AM", description: "Auspicious morning window for idol installation and initial worship." },
      { label: "Pradosh Kaal Puja Window", timing: "06:20 PM to 08:42 PM", description: "Supreme twilight window for complete Shodashopachara worship." }
    ],
    ritualsAndVidhi: {
      overview: "Sculpt clay idols of Shiva-Parvati and Ganesha. Worship with 16 Suhag items, listen to Hartalika Vrat Katha, and maintain night-long jagran.",
      samagri: ["Clay Shiva-Parvati idols", "16 Suhag items", "Bilva patra", "Dhatura", "Raw coconut", "Panchamrit", "Sweets"],
      steps: [
        "Take morning bath, apply Mehendi, and wear auspicious bridal red or green attire.",
        "Sculpt Ganesha, Shivalinga, and Parvati with fine clay and place on banana leaf canopy.",
        "Perform Ganesha puja followed by Shivalinga and Parvati Abhishekam.",
        "Offer 16 Suhag items to Goddess Parvati with prayers for husband's long life and health.",
        "Listen to the sacred Hartalika Vrat Katha with family.",
        "Perform Aarti and stay awake at night singing Shiva-Gauri stotras."
      ],
      mantraDevanagari: "ॐ उमामहेश्वराभ्यां नमः। ॐ साम्ब सदाशिवाय नमः॥",
      mantraTransliteration: "Om Umamaheshwarabhyam Namah | Om Saamba Sadashivaya Namah ||",
      mantraMeaning: "Salutations to Mother Uma and Lord Maheshwara, the eternal divine couple who bless families with unbroken auspiciousness."
    },
    rulesAndDiscipline: {
      fastingType: "Nirjala (No Water)",
      permittedFoods: ["Water/fruits only after completing next morning parana"],
      strictlyProhibited: ["Drinking water or food for 24 hours", "Daytime sleeping", "Arguments or marital discord"],
      dosAndDonts: ["Must observe night jagran", "Do gift Suhag items to mother-in-law or elderly women"],
      paranaTiming: "Next day on Ganesh Chaturthi morning after Visarjan of clay idols"
    },
    ancientRemedies: [
      {
        title: "Parvati Suhag Pitari Daan for Marital Harmony",
        benefits: "Cures severe marital discord, cancels Mangal dosha friction, and grants spouse longevity.",
        procedure: "Fill a red basket with 16 Suhag items, touched by both spouses, offer to Goddess Parvati, and gift to an elderly married woman with Dakshina.",
        mantra: "हे गौरि शंकरार्धाङ्गि यथा त्वं शंकरप्रिया। तथा मां कुरु कल्याणि कान्तकान्तां सुदुर्लभाम्॥"
      }
    ]
  },

  // ==========================
  // OCTOBER (Ashwina - Kartika)
  // ==========================
  {
    id: "sharad_purnima_kojagari",
    name: "Sharad Purnima (Kojagari Lakshmi Puja & Amrit Moon)",
    nameHi: "शरद पूर्णिमा (कोजागरी लक्ष्मी पूजा व अमृत वर्षा)",
    monthIndex: 9,
    monthName: "October",
    vedicMonth: "Ashwina Purnima",
    vedicMonthHi: "आश्विन पूर्णिमा",
    gregorianDate: "2026-10-25",
    dateDisplay: "25 October 2026",
    tithi: "Ashwina Purnima (16 Kalas Moon)",
    tithiHi: "आश्विन पूर्णिमा",
    category: "mahaparva",
    categoryLabel: "Maha Parva",
    deity: "Goddess Mahalakshmi & Chandra Dev",
    deityHi: "माँ महालक्ष्मी एवं चन्द्र देव",
    significance: "The only night of the year when the Moon shines with all 16 divine Kalas, raining celestial nectar (Amrit). Goddess Lakshmi descends asking 'Ko Jagarti?' (Who is awake?), entering homes of vigilant devotees to bless them with permanent wealth.",
    eveDate: "2026-10-24",
    eveGuidance: {
      summary: "Procure cow milk, basmati rice, saffron, dry fruits, and a wide silver or clay bowl to prepare Amrit Kheer for overnight moonlight infusion.",
      checklist: ["Pure cow milk and fragrant rice for Kheer", "Fine muslin cloth or net to cover Kheer under open moon", "Silver coin to immerse in Kheer", "Lotus flowers and pure ghee deepak for Lakshmi"],
      altarDirection: "Open Rooftop / Balcony facing Moon"
    },
    exactMuhurtas: [
      { label: "Chandra Arghya & Moonrise", timing: "05:42 PM (Moonrise)", description: "Offering milk and water Arghya to the 16-Kala Moon." },
      { label: "Kojagari Lakshmi Nishita Puja", timing: "11:40 PM to 12:35 AM", description: "Midnight Lakshmi invocation window for financial abundance." },
      { label: "Amrit Kheer Moon Bathing Window", timing: "10:30 PM to 04:30 AM", description: "Keeping Kheer under moonlight for absorption of healing lunar rays." }
    ],
    ritualsAndVidhi: {
      overview: "Cook cow milk rice kheer, place it under open moonlight covered with white mesh, perform Kojagari Lakshmi worship, and consume Kheer next morning as nectar.",
      samagri: ["Cow milk rice kheer", "Silver bowl or clean earthen bowl", "Clean white mesh cloth", "Lotus flower", "Kanakadhara Stotra", "Ghee lamp"],
      steps: [
        "Cook rich Kheer using pure cow milk, saffron, and dry fruits in the evening.",
        "At moonrise, offer Arghya to the Moon with water, milk, and white flowers in a silver/copper lota.",
        "Place the Kheer bowl under direct moonlight on the terrace, covering with thin muslin cloth.",
        "At midnight (Nishita Kaal), light 5 ghee lamps before Goddess Lakshmi and chant Shri Suktam.",
        "Stay awake meditating or listening to Raas Leela katha.",
        "Next morning on an empty stomach, consume the Moon-infused Kheer as divine Amrit prasad."
      ],
      mantraDevanagari: "ॐ श्रीं ह्रीं क्लीं ऐं सौं ॐ ह्रीं क ए ई ल ह्रीं ह स क ह ल ह्रीं स क ल ह्रीं सौं ऐं क्लीं ह्रीं श्रीं ॐ॥ ॐ सोमाय नमः॥",
      mantraTransliteration: "Om Shreem Hreem Kleem Aim Saum | Om Somaya Namah ||",
      mantraMeaning: "Salutations to Goddess Mahalakshmi and the glorious Moon God whose radiant beams bestow health, eye sight, and infinite wealth."
    },
    rulesAndDiscipline: {
      fastingType: "Phalahari (Fruits & Milk)",
      permittedFoods: ["Milk", "Fruits", "Moon-blessed Kheer next morning", "Sabudana"],
      strictlyProhibited: ["Sleeping before midnight (Kojagari requires staying awake)", "Tamasic foods", "Eating sour or stale food"],
      dosAndDonts: ["Must gaze at the Moon for at least 15 minutes to sharpen eyesight", "Do keep the Kheer directly exposed to moonlight"],
      paranaTiming: "Next morning after consuming moonlight Kheer"
    },
    ancientRemedies: [
      {
        title: "Sharad Amrit Kheer Netra & Swasa Dosha Upay",
        benefits: "Cures chronic asthma, respiratory weaknesses, eye troubles, and balances afflicted Moon in chart.",
        procedure: "Thread a needle under the direct rays of the Sharad Purnima moon without glasses to strengthen optic nerves, then drink milk cooled under the moon.",
        mantra: "ॐ क्षीरपुत्राय विद्महे अमृततत्त्वाय धीमहि तन्नो चन्द्रः प्रचोदयात्॥"
      }
    ]
  },

  // ==========================
  // NOVEMBER (Kartika - Margashirsha)
  // ==========================
  {
    id: "dev_uthani_tulsi_vivah",
    name: "Dev Uthani Ekadashi & Tulsi Vivah",
    nameHi: "देवउठनी एकादशी (प्रबोधिनी) एवं तुलसी विवाह",
    monthIndex: 10,
    monthName: "November",
    vedicMonth: "Kartika Shukla",
    vedicMonthHi: "कार्तिक शुक्ल एकादशी",
    gregorianDate: "2026-11-20",
    dateDisplay: "20 November 2026",
    tithi: "Kartika Shukla Ekadashi",
    tithiHi: "कार्तिक शुक्ल एकादशी",
    category: "mahaparva",
    categoryLabel: "Maha Parva",
    deity: "Lord Shaligram (Vishnu) & Goddess Vrinda (Tulsi)",
    deityHi: "भगवान शालिग्राम एवं माता तुलसी",
    significance: "Lord Vishnu awakens from His 4-month cosmic slumber (Yoga Nidra) in Ksheersagar. Marks the end of Chaturmas and resumption of all auspicious wedding, housewarming, and sacred ceremonies across India.",
    eveDate: "2026-11-19",
    eveGuidance: {
      summary: "Procure freshly harvested sugarcane (Ganna) stalks to construct wedding pavilion (Mandap), red chunri for Tulsi, Shaligram stone, and water chestnuts (Singhara).",
      checklist: ["4 full sugarcane stalks with leaves", "Holy Tulsi plant with pot", "Red wedding Chunri, Bangles, and Sindoor for Tulsi", "Raw turmeric root, Singhara, Sweet potatoes (Shakarkand), and Ber"],
      altarDirection: "Home Courtyard or North-East"
    },
    exactMuhurtas: [
      { label: "Vishnu Awakening & Puja Muhurta", timing: "06:48 AM to 10:15 AM", description: "Invoking Lord Vishnu to awaken from Yoga Nidra." },
      { label: "Tulsi Vivah Pradosh Lagna", timing: "05:30 PM to 07:45 PM", description: "Supreme evening window for Tulsi-Shaligram divine wedding ceremony." }
    ],
    ritualsAndVidhi: {
      overview: "Erect sugarcane pavilion over Tulsi plant, drape Tulsi in red bridal silk, place Shaligram with yellow pitambari, and perform complete Hindu wedding rituals.",
      samagri: ["Tulsi plant", "Shaligram stone", "Sugarcane pavilion (4 stalks)", "Red Chunri & Suhag pitari", "Yellow cloth for Shaligram", "Moli (Sacred thread for Gathbandhan)", "Singhara, Ber, Shakarkand"],
      steps: [
        "Construct a four-pillared canopy around Tulsi pot using the tall sugarcane stalks.",
        "Draw sacred Rangoli and Lotus symbols around the Tulsi altar.",
        "Bathe Tulsi with Gangajal, apply haldi and kumkum, and wrap with red bridal chunri.",
        "Place Shaligram idol on a brass throne to the left of Tulsi, draped in yellow pitambari.",
        "Perform Gathbandhan (divine wedding knot) connecting Tulsi's chunri and Shaligram's stole with sacred thread and coin.",
        "Perform 7 Mangal Pheras of Shaligram around Tulsi while singing wedding songs and blowing conch.",
        "Offer seasonal fruits (Singhara, Sweet potato, Ber, Amla) as wedding feast prasad."
      ],
      mantraDevanagari: "उत्तिष्ठोत्तिष्ठ गोविंद त्यज निद्रां जगत्पते। त्वयि सुप्ते जगन्नाथ जगत् सुप्तं भवेदिदम्॥ उत्थिते चेष्टते सर्वमुत्तिष्ठोत्तिष्ठ माधव॥",
      mantraTransliteration: "Uttishthottishtha Govinda Tyaja Nidram Jagatpate | Tvayi Supte Jagannatha Jagat Suptam Bhavedidam || Uttithite Cheshtate Sarvamuttishthottishtha Madhava ||",
      mantraMeaning: "Awaken, O Govinda, Lord of the Universe, rise from sleep! When You sleep, all universes sleep; when You awaken, all life is revitalized. Rise, O Madhava!"
    },
    rulesAndDiscipline: {
      fastingType: "Phalahari (Fruits & Milk)",
      permittedFoods: ["Singhara", "Shakarkand (Sweet potato)", "Amla", "Milk and fruits"],
      strictlyProhibited: ["All rice and grains (strictly forbidden on Ekadashi)", "Plucking Tulsi leaves today"],
      dosAndDonts: ["Never pluck Tulsi leaves on Dev Uthani Ekadashi", "Light 11 or 21 ghee deepaks around Tulsi altar"],
      paranaTiming: "Next day on Dwadashi morning after Tulsi Arghya"
    },
    ancientRemedies: [
      {
        title: "Kanyadaan Punya Tulsi Vivah Upay for Delayed Marriage",
        benefits: "Removes insurmountable marriage delays, cleanses 7 generations of family sins, and resolves seventh house afflictions.",
        procedure: "Sponsor or conduct the Kanyadaan of Mata Tulsi to Lord Shaligram with sincere Sankalpa to remove marriage obstacles.",
        mantra: "तुलसी श्रीर्महालक्ष्मीर्विद्याविद्या यशस्विनी। धर्म्या धर्मानना देवी देवीदेवमनःप्रिया॥"
      }
    ]
  },

  // ==========================
  // DECEMBER (Margashirsha - Pausha)
  // ==========================
  {
    id: "gita_jayanti_mokshada",
    name: "Gita Jayanti & Mokshada Ekadashi",
    nameHi: "श्रीमद्भगवद्गीता जयंती एवं मोक्षदा एकादशी",
    monthIndex: 11,
    monthName: "December",
    vedicMonth: "Margashirsha Shukla",
    vedicMonthHi: "मार्गशीर्ष शुक्ल एकादशी",
    gregorianDate: "2026-12-19",
    dateDisplay: "19 December 2026",
    tithi: "Margashirsha Shukla Ekadashi",
    tithiHi: "मार्गशीर्ष शुक्ल एकादशी",
    category: "mahaparva",
    categoryLabel: "Maha Parva",
    deity: "Lord Shri Krishna (Parthasarathi) & Shrimad Bhagavad Gita",
    deityHi: "भगवान पार्थसारथी श्री कृष्ण एवं श्रीमद्भगवद्गीता",
    significance: "The supreme day on the battlefield of Kurukshetra when Lord Krishna delivered the immortal 700 verses of the Bhagavad Gita to Arjuna. Fasting on Mokshada Ekadashi delivers departed ancestors directly from lower realms to Vaikuntha.",
    eveDate: "2026-12-18",
    eveGuidance: {
      summary: "Procure original Sanskrit Bhagavad Gita Scripture, yellow silk cloth, Tulsi leaves, and yellow sandalwood.",
      checklist: ["Srimad Bhagavad Gita holy book", "Yellow silk altar cloth", "Ghee lamp and fragrant dhoop", "Gita copies to donate to students and seekers"],
      altarDirection: "East"
    },
    exactMuhurtas: [
      { label: "Gita Pujan & Chanting Muhurta", timing: "07:10 AM to 11:30 AM", description: "Worship of the scripture with sandalwood, flowers, and Chapter 11/12 recitation." },
      { label: "Mokshada Ekadashi Sandhya Aarti", timing: "05:45 PM to 07:15 PM", description: "Evening lamp offering and Gita distribution." }
    ],
    ritualsAndVidhi: {
      overview: "Worship of the Bhagavad Gita scripture, reciting all 18 chapters or select chapters (Ch. 12 & 15), and donating Gita books.",
      samagri: ["Bhagavad Gita Book", "Yellow silk cloth", "Tulsi leaves", "Panchamrit", "Dry fruits", "Incense"],
      steps: [
        "Take morning bath, place Bhagavad Gita on a clean wooden asana covered with yellow silk.",
        "Apply sandalwood paste to the scripture and offer fresh Tulsi leaves and yellow flowers.",
        "Perform Aarti of the Gita singing 'Jai Bhagavad Geete'.",
        "Recite Chapter 12 (Bhakti Yoga) and Chapter 15 (Purushottama Yoga) with family.",
        "Gift at least 1 or 5 copies of the Bhagavad Gita to sincere seekers.",
        "Dedicate the merit of Mokshada fast for the eternal peace of departed ancestors."
      ],
      mantraDevanagari: "सर्वोपनिषदो गावो दोग्धा गोपालनन्दनः। पार्थो वत्सः सुधीर्भोक्ता दुग्धं गीतामृतं महत्॥ ॐ नमो भगवते वासुदेवाय॥",
      mantraTransliteration: "Sarvopanishado Gavo Dogdha Gopalanandanah | Partho Vatsah Sudhirbhokta Dugdham Gitamritam Mahat || Om Namo Bhagavate Vasudevaya ||",
      mantraMeaning: "All Upanishads are the cows, the milker is Lord Krishna, Arjuna is the calf, wise souls are the drinkers, and the supreme divine milk is the nectar of the Gita."
    },
    rulesAndDiscipline: {
      fastingType: "Phalahari (Fruits & Milk)",
      permittedFoods: ["Fruits", "Milk", "Dry fruits", "Water"],
      strictlyProhibited: ["Rice and grains (rice strictly forbidden on Ekadashi)", "Lethargy and gossip"],
      dosAndDonts: ["Must read at least one chapter of the Gita today", "Do donate Gita books to seekers"],
      paranaTiming: "Next day on Dwadashi morning after sunrise"
    },
    ancientRemedies: [
      {
        title: "Pitru Moksha 15th Chapter Recitation",
        benefits: "Liberates departed ancestors from tormenting realms and removes Pitru Dosh from family horoscope.",
        procedure: "Recite Chapter 15 (Purushottama Yoga) of Bhagavad Gita 3 times holding Gangajal in hand, then offer the water to the roots of a Peepal tree.",
        mantra: "ॐ श्री कृष्णार्पणमस्तु॥"
      }
    ]
  }
,
{
  "id": "anant_chaturdashi_ganesh_visarjan",
  "name": "Anant Chaturdashi & Ganesh Visarjan",
  "nameHi": "अनंत चतुर्दशी एवं गणेश विसर्जन महापर्व",
  "monthIndex": 8,
  "monthName": "September",
  "vedicMonth": "Bhadrapada Shukla",
  "vedicMonthHi": "भाद्रपद शुक्ल चतुर्दशी",
  "gregorianDate": "2026-09-25",
  "dateDisplay": "25 September 2026",
  "tithi": "Bhadrapada Shukla Chaturdashi",
  "tithiHi": "भाद्रपद शुक्ल चतुर्दशी",
  "category": "festival",
  "categoryLabel": "Festivals & Parvas",
  "deity": "Lord Ananta Padmanabha & Bhagavan Ganesha",
  "deityHi": "भगवान अनंत (श्री हरि) एवं गणपति बाप्पा",
  "significance": "Culmination of 10-day Ganeshotsav with solemn immersion (Visarjan) of Lord Ganesha idols. Concurrently, devotees tie the 14-knot sacred Ananta thread, invoking Lord Vishnu's infinite protection for 14 continuous years.",
  "eveDate": "2026-09-24",
  "eveGuidance": {
    "summary": "Procure 14-knot red/yellow silk thread (Ananta Sutra), holy Ganga jal, wet clay or natural flower garlands for Ganesha visarjan procession.",
    "checklist": [
      "Procure 14-knot silk Ananta Sutra",
      "Prepare Modaks and Laddus for final Ganesh Visarjan Aarti",
      "Arrange clean water reservoir or eco-friendly immersion pot",
      "Keep turmeric, kumkum, and Panchamrit ready for Ananta Padmanabha worship"
    ],
    "altarDirection": "North-East (Ishanya) for Ananta Puja; Procession facing North"
  },
  "exactMuhurtas": [
    {
      "label": "Ananta Padmanabha Puja Muhurta",
      "timing": "06:12 AM to 11:45 AM",
      "description": "Auspicious morning window for tying the 14-knot sacred protection thread."
    },
    {
      "label": "Ganesh Visarjan Shubh Choghadiya",
      "timing": "12:15 PM to 01:45 PM (Abhijit & Shubh)",
      "description": "Supreme midday muhurta for Ganesha farewell Aarti."
    },
    {
      "label": "Pradosh Visarjan Kaal",
      "timing": "05:55 PM to 08:20 PM (Labha & Amrit)",
      "description": "Evening twilight immersion window."
    }
  ],
  "ritualsAndVidhi": {
    "overview": "Consecrate the 14-knot thread before Lord Vishnu, chant the Ananta Stotra, tie thread on right arm (men) or left arm (women), and offer grand final Uttarapuja to Ganesha before immersion.",
    "samagri": [
      "14-knot Ananta thread",
      "Durva grass (14 blades)",
      "14 Pua (sweet wheat cakes)",
      "Panchamrit",
      "Sandalwood paste",
      "Ganga jal"
    ],
    "steps": [
      "Draw seven hoods of Sheshnag on the altar using sandalwood or wet flour paste.",
      "Place the 14-knot thread on betel leaves and bathe it with milk and sacred water.",
      "Perform shodashopachara puja of Lord Ananta offering 14 sweet puas and 14 blades of durva.",
      "Tie the Ananta thread chanting the protection mantra.",
      "Perform final Uttarapuja and farewell Aarti for Lord Ganesha, praying: 'Ganpati Bappa Morya, Pudhchya Varshi Laukariya!'"
    ],
    "mantraDevanagari": "ॐ अनन्ताय नमस्तुभ्यं सहस्रशिरसे नमः। नमोऽस्तु पद्मनाभाय नागानां पतये नमः॥",
    "mantraTransliteration": "Om Anantaya Namastubhyam Sahasrashirase Namah | Namo'stu Padmanabhaya Naganam Pataye Namah ||",
    "mantraMeaning": "Salutations to the infinite Lord with a thousand heads, salutations to Padmanabha, the supreme master of the cosmic serpent Shesha."
  },
  "rulesAndDiscipline": {
    "fastingType": "Ekasana (Single Meal)",
    "permittedFoods": [
      "Sweet pua without salt",
      "Milk and fruits",
      "Sattvic single meal after Ananta thread tying"
    ],
    "strictlyProhibited": [
      "Consuming common salt before puja",
      "Tamasic foods",
      "Removing the Ananta thread on the same day"
    ],
    "dosAndDonts": [
      "Must preserve the 14-knot thread clean for 14 days or 1 year",
      "Do eco-friendly immersion"
    ],
    "paranaTiming": "After concluding Ananta puja and tying thread"
  },
  "ancientRemedies": [
    {
      "title": "14-Year Ananta Raksha Bandhan",
      "benefits": "Cures chronic poverty, reverses severe bankruptcies, and removes prolonged generational curses.",
      "procedure": "Tie the energized 14-knot Ananta thread onto the right wrist while mentally offering all 14 planetary spheres to Lord Vishnu.",
      "mantra": "अनन्त संसार महासमुद्रे मग्नं समभ्युद्धर वासुदेव। अनन्तरूपे विनियोजयस्व ह्यनन्तरूपाय नमो नमस्ते॥"
    }
  ]
},
{
  "id": "indira_ekadashi",
  "name": "Indira Ekadashi (Pitru Moksha Ekadashi)",
  "nameHi": "इन्दिरा एकादशी (पितृ मोक्ष प्रदायिनी)",
  "monthIndex": 8,
  "monthName": "September",
  "vedicMonth": "Ashwina Krishna",
  "vedicMonthHi": "आश्विन कृष्ण एकादशी",
  "gregorianDate": "2026-09-18",
  "dateDisplay": "18 September 2026",
  "tithi": "Ashwina Krishna Ekadashi",
  "tithiHi": "आश्विन कृष्ण एकादशी",
  "category": "vrat",
  "categoryLabel": "Vrat & Upvas",
  "deity": "Lord Shaligram (Vishnu) & Departed Pitrus",
  "deityHi": "भगवान शालिग्राम एवं पितृगण",
  "significance": "Falling strictly during Pitru Paksha, this sacred Ekadashi has the supernatural power to liberate deceased ancestors from Yamaloka or lower hellish realms directly to Vaikuntha Dham.",
  "eveDate": "2026-09-17",
  "eveGuidance": {
    "summary": "Prepare for Dashami ekasana, avoid grains and lentils in the evening, and prepare black sesame (Krishna Til) and Kusha grass for Pitru Tarpana.",
    "checklist": [
      "Procure black sesame seeds (Til) and sacred Kusha grass",
      "Shaligram stone or Vishnu picture",
      "Barley (Jau) and Ganga jal",
      "Pure cow milk for Vishnu abhishek"
    ],
    "altarDirection": "South-facing for ancestor Tarpana, East-facing for Vishnu puja"
  },
  "exactMuhurtas": [
    {
      "label": "Ekadashi Vrat Sankalp & Vishnu Puja",
      "timing": "06:10 AM to 08:35 AM",
      "description": "Morning holy bath and formal vrata declaration."
    },
    {
      "label": "Aparahna Pitru Tarpana Muhurta",
      "timing": "01:15 PM to 03:30 PM",
      "description": "Prescribed afternoon window for offering water and sesame to ancestors."
    },
    {
      "label": "Parana Timing (Next Day)",
      "timing": "06:12 AM to 08:45 AM (Dwadashi)",
      "description": "Window for breaking fast on Dwadashi morning."
    }
  ],
  "ritualsAndVidhi": {
    "overview": "Observe full Ekadashi fast, bathe Shaligram with milk and tulsi, perform afternoon Pitru Tarpana with sesame, and dedicate the entire merit (Punya) to departed souls.",
    "samagri": [
      "Black sesame",
      "Kusha grass",
      "Gangajal",
      "Tulsi leaves",
      "Shaligram",
      "Yellow flowers",
      "Barley"
    ],
    "steps": [
      "Take early morning bath chanting Ganga mantras.",
      "Bathe Shaligram with Panchamrit and offer fresh Tulsi leaves.",
      "During Aparahna kaal (afternoon), sit facing South with Kusha grass in hand.",
      "Offer water mixed with black sesame seeds reciting Pitru Gayatri.",
      "Pray: 'May all my ancestors who suffer in any difficult realm be instantly liberated by the merit of this Indira Ekadashi fast.'"
    ],
    "mantraDevanagari": "ॐ नमो भगवते वासुदेवाय। ॐ पितृभ्यः स्वधायिभ्यः स्वधा नमः॥",
    "mantraTransliteration": "Om Namo Bhagavate Vasudevaya | Om Pitribhyah Swadhayibhyah Swadha Namah ||",
    "mantraMeaning": "Salutations to Lord Vasudeva, and solemn offerings of Swadha to all venerable ancestors."
  },
  "rulesAndDiscipline": {
    "fastingType": "Phalahari (Fruits & Milk)",
    "permittedFoods": [
      "Cow milk",
      "Fresh fruits",
      "Water",
      "Makhana roasted in ghee"
    ],
    "strictlyProhibited": [
      "All true grains (Rice, wheat, millets)",
      "Lentils",
      "Sleeping during the day",
      "Eating food cooked by others"
    ],
    "dosAndDonts": [
      "Must recite Chapter 15 of Shrimad Bhagavad Gita",
      "Do feed cows and crows with sattvic offerings"
    ],
    "paranaTiming": "On Dwadashi morning after offering food to a Brahmin"
  },
  "ancientRemedies": [
    {
      "title": "Pitru Tarpana Moksha Sankalpa",
      "benefits": "Instantly quenches ancestral hunger and thirst, removing severe Pitru Dosha and infertility blockages.",
      "procedure": "Offer water mixed with raw milk, black sesame, and Kusha grass facing South, dedicating the fruit of Indira Ekadashi to ancestors.",
      "mantra": "ये बान्धवाऽबान्धवा वा येऽन्यजन्मनि बान्धवाः। ते तृप्तिम् अखिला यान्तु यश्चास्मत्तोऽभिवाञ्छति॥"
    }
  ]
},
{
  "id": "sarvartha_siddhi_yoga_bhadrapada",
  "name": "Sarvartha Siddhi & Amrit Siddhi Yoga",
  "nameHi": "सर्वार्थ सिद्धि एवं अमृत सिद्धि योग",
  "monthIndex": 8,
  "monthName": "September",
  "vedicMonth": "Bhadrapada Shukla",
  "vedicMonthHi": "भाद्रपद शुक्ल पक्ष",
  "gregorianDate": "2026-09-22",
  "dateDisplay": "22 September 2026",
  "tithi": "Shukla Ekadashi / Dwadashi conjunction",
  "tithiHi": "शुक्ल एकादशी - पुष्य/श्रवण नक्षत्र",
  "category": "muhurta",
  "categoryLabel": "Auspicious Yogas",
  "deity": "Lord Vishnu & Devaguru Brihaspati",
  "deityHi": "भगवान श्री हरि एवं देवाधिदेव बृहस्पति",
  "significance": "A celestial synchronization where the weekday and specific auspicious Nakshatra unite, creating an unstoppable cosmic current that turns all initiated ventures, commercial deeds, and spiritual mantras into total success (Sarva Artha Siddhi).",
  "eveDate": "2026-09-21",
  "eveGuidance": {
    "summary": "Identify projects, new business contracts, gold purchases, or mantra diksha to initiate during the exact yoga window.",
    "checklist": [
      "Prepare saffron (Kesar) and pure cow ghee lamp",
      "Keep account books, property documents, or new tools ready for blessing",
      "Yellow flowers and sweets for Brihaspati"
    ],
    "altarDirection": "East-facing"
  },
  "exactMuhurtas": [
    {
      "label": "Sarvartha Siddhi Yoga Duration",
      "timing": "06:14 AM to 04:30 PM",
      "description": "All auspicious deeds commenced yield unhampered success."
    },
    {
      "label": "Amrit Siddhi Yoga Peak Window",
      "timing": "08:15 AM to 11:20 AM",
      "description": "Supreme peak for financial investments, contracts, and mantra sadhana."
    }
  ],
  "ritualsAndVidhi": {
    "overview": "Light a four-wick pure ghee lamp, offer yellow flowers to Lord Vishnu, and initiate your chosen venture with the Sri Sukta or Ganapati Atharvashirsha.",
    "samagri": [
      "Four-wick ghee lamp",
      "Yellow flowers",
      "Saffron paste",
      "Sweet yellow rice (Zarda)",
      "Panchamrit"
    ],
    "steps": [
      "Take morning bath wearing clean yellow or white clothing.",
      "Install Lord Vishnu and Ganesha on a wooden chowki covered with yellow silk.",
      "Apply saffron tilak and offer yellow sweet rice.",
      "Commence your business transaction, sign agreements, or initiate the new spiritual discipline.",
      "Perform 108 chants of the Siddhi Mantra."
    ],
    "mantraDevanagari": "ॐ सर्वार्थ साधिके शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥",
    "mantraTransliteration": "Om Sarvartha Sadhike Sharanye Tryambake Gauri Narayani Namo'stu Te ||",
    "mantraMeaning": "Salutations to the Divine Energy who accomplishes all purposes and grants unconditional refuge and triumph."
  },
  "rulesAndDiscipline": {
    "fastingType": "Sattvic Vow",
    "permittedFoods": [
      "Yellow fruits",
      "Cow milk",
      "Sattvic meals with turmeric"
    ],
    "strictlyProhibited": [
      "Lending money to untrusted persons",
      "Dishonesty",
      "Negative speech"
    ],
    "dosAndDonts": [
      "Must initiate positive creative actions",
      "Do charity of books or yellow cloth to students"
    ],
    "paranaTiming": "Normal evening sattvic meal"
  },
  "ancientRemedies": [
    {
      "title": "Karya Siddhi Yantra Prana Pratishtha",
      "benefits": "Accelerates delayed court cases, clears governmental permissions, and unblocks career stagnation.",
      "procedure": "Write your noble objective with red sandalwood paste on a Bhojpatra leaf and place it under a copper Karya Siddhi Yantra during the peak muhurta.",
      "mantra": "ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे॥"
    }
  ]
},
{
  "id": "karwa_chauth_vrat",
  "name": "Karwa Chauth (Karak Chaturthi Vrat)",
  "nameHi": "करवा चौथ (करक चतुर्थी अखंड सौभाग्य व्रत)",
  "monthIndex": 9,
  "monthName": "October",
  "vedicMonth": "Kartika Krishna",
  "vedicMonthHi": "कार्तिक कृष्ण चतुर्थी",
  "gregorianDate": "2026-10-29",
  "dateDisplay": "29 October 2026",
  "tithi": "Kartika Krishna Chaturthi",
  "tithiHi": "कार्तिक कृष्ण चतुर्थी",
  "category": "festival",
  "categoryLabel": "Festivals & Parvas",
  "deity": "Goddess Karwa, Lord Shiva, Parvati & Chandra Dev",
  "deityHi": "माता करवा, भगवान शिव-पार्वती एवं चन्द्रमा",
  "significance": "The supreme Nirjala (no water) vow observed by married women for the longevity, health, and prosperity of their husbands. Concludes only after sighting the Moon through a sieve and offering holy Arghya.",
  "eveDate": "2026-10-28",
  "eveGuidance": {
    "summary": "Prepare pre-dawn Sargi before sunrise (04:30 AM) including dry fruits, fenian, fruits, and sweets provided by mother-in-law, and procure two earthen Karwas.",
    "checklist": [
      "Two decorated earthen pots (Karwa)",
      "Fine sieve (Chhalni) and brass diya",
      "Sargi ingredients for 4 AM consumption",
      "16 Suhag items (Sindoor, Bindi, Bangles, Henna, Chunri)"
    ],
    "altarDirection": "North-East during afternoon katha; Open terrace facing East-South-East for Moon Arghya"
  },
  "exactMuhurtas": [
    {
      "label": "Pre-Dawn Sargi Time",
      "timing": "04:15 AM to 05:15 AM",
      "description": "Consuming wholesome food and water before sunrise."
    },
    {
      "label": "Karwa Chauth Evening Puja Muhurta",
      "timing": "05:38 PM to 06:56 PM",
      "description": "Listening to Karwa Chauth Vrat Katha and offering Baya to mother-in-law."
    },
    {
      "label": "Moonrise & Arghya Time",
      "timing": "08:15 PM (Local Moonrise)",
      "description": "Sighting the Moon through sieve and offering Arghya to break the Nirjala fast."
    }
  ],
  "ritualsAndVidhi": {
    "overview": "Eat pre-dawn Sargi, observe strict Nirjala fast all day, assemble for community Katha in the evening dressed in bridal red, and break fast at moonrise through the sieve.",
    "samagri": [
      "Clay Karwa with spout filled with water",
      "Sieve",
      "Ghee lamp with 4 wicks",
      "Mithai",
      "Red Chunri",
      "Baya gift basket for elders"
    ],
    "steps": [
      "Wake before sunrise at Brahma Muhurta and partake of the sacred Sargi.",
      "Take holy bath and take the formal Nirjala Sankalp.",
      "In late afternoon, dress in festive bridal attire and gather to listen to Karwa Chauth Vrat Katha.",
      "Rotate the decorated Karwa thalis 7 times while singing the traditional Karwa verses.",
      "At moonrise, light the lamp, gaze at the Moon through the sieve, then gaze at husband through the same sieve.",
      "Offer water Arghya to the Moon, touch husband's feet, and take the first sip of water from his hands."
    ],
    "mantraDevanagari": "ॐ शिवायै नमः। ॐ नमः शिवाय। ॐ सोमाय नमः। करकं क्षीरसम्पूर्णं तोयपूर्णमथापि वा। ददामि रत्नसंयुक्तं चिरञ्जीवतु मे पतिः॥",
    "mantraTransliteration": "Om Shivayai Namah | Om Namah Shivaya | Om Somaya Namah | Karakamp Ksheerasampoornam... Chiranjeevatu Me Patih ||",
    "mantraMeaning": "Salutations to Shiva and Shakti. I offer this pot filled with sacred water and milk so that my husband may live a long, healthy life."
  },
  "rulesAndDiscipline": {
    "fastingType": "Nirjala (No Water)",
    "permittedFoods": [
      "Nothing during daylight hours (Strict Nirjala)",
      "Sattvic feast after moonrise Arghya"
    ],
    "strictlyProhibited": [
      "Drinking water or tea before moonrise",
      "Using scissors, needles, or cutting tools during the day",
      "Harsh words or marital arguments"
    ],
    "dosAndDonts": [
      "Must touch feet of mother-in-law and seek her blessings",
      "Do wear auspicious red, yellow, or pink hues"
    ],
    "paranaTiming": "At night immediately following the Moonrise Arghya"
  },
  "ancientRemedies": [
    {
      "title": "Chandra-Gauri Preeti Daan for Marital Longevity",
      "benefits": "Dissolves high divorce risks, removes 7th house planetary afflictions, and anchors lifelong spousal devotion.",
      "procedure": "Fill a brass Karwa with unboiled cow milk, drop a silver coin inside, offer Arghya to the Moon, and donate the silver vessel to a virtuous married woman.",
      "mantra": "देहि सौभाग्यमारोग्यं देहि मे परमं सुखम्। पुत्रान् देहि धनं देहि सर्वकामांश्च देहि मे॥"
    }
  ]
},
{
  "id": "vijayadashami_dussehra",
  "name": "Vijayadashami / Dussehra",
  "nameHi": "विजयादशमी / दशहरा महापर्व",
  "monthIndex": 9,
  "monthName": "October",
  "vedicMonth": "Ashwina Shukla",
  "vedicMonthHi": "आश्विन शुक्ल दशमी",
  "gregorianDate": "2026-10-21",
  "dateDisplay": "21 October 2026",
  "tithi": "Ashwina Shukla Dashami (Shravana Nakshatra)",
  "tithiHi": "आश्विन शुक्ल दशमी",
  "category": "festival",
  "categoryLabel": "Festivals & Parvas",
  "deity": "Lord Shri Rama & Goddess Aparajita (Durga)",
  "deityHi": "मर्यादा पुरुषोत्तम भगवान श्री राम एवं माँ अपराजिता",
  "significance": "Victory of Dharma over Adharma. Lord Rama defeated the ten-headed demon king Ravana, and Goddess Durga vanquished Mahishasura. Recognized as one of the Sade-Teen Muhurtas where every initiation leads to unstoppable triumph.",
  "eveDate": "2026-10-20",
  "eveGuidance": {
    "summary": "Gather Shami leaves (Shami Patra), clean vehicles, tools of trade, books, and weapons for Shastra and Vahana Puja.",
    "checklist": [
      "Shami leaves (Prosopis cineraria)",
      "Marigold flower garlands for vehicles and main doors",
      "Sandalwood paste and vermilion (Sindoor)",
      "Sweets for distribution"
    ],
    "altarDirection": "North-East (Ishanya) for Aparajita; Main door for Shami exchange"
  },
  "exactMuhurtas": [
    {
      "label": "Vijaya Muhurta (Supreme Triumph Window)",
      "timing": "02:05 PM to 02:52 PM",
      "description": "Unbeatable 47-minute window for starting ventures, court matters, and signing deals."
    },
    {
      "label": "Aparajita Puja Kaal",
      "timing": "01:18 PM to 03:38 PM",
      "description": "Auspicious window for worshipping Goddess Aparajita and Shami tree."
    }
  ],
  "ritualsAndVidhi": {
    "overview": "Perform Aparajita Puja in the afternoon, worship the sacred Shami tree reciting the epic Shami mantra, bless vehicles and instruments of livelihood, and exchange Shami leaves as 'Gold' (Sonu) among friends and family.",
    "samagri": [
      "Shami leaves",
      "Aparajita flowers",
      "Yellow mustard seeds",
      "Marigold garlands",
      "Desi ghee diya"
    ],
    "steps": [
      "In the afternoon, establish eight-petaled lotus diagram using rice flour in North-East.",
      "Invoke Goddess Aparajita in the center with prayers for absolute invincibility.",
      "Perform Shami Tree Puja: circumambulate the tree thrice, reciting the Shami verse.",
      "Cleanse and worship work laptops, vehicles, machinery, and scriptures.",
      "Distribute Shami leaves to elders and peers uttering blessings of golden abundance."
    ],
    "mantraDevanagari": "शमी शमयते पापम् शमी शत्रुविनाशिनी। अर्जुनस्य धनुर्धारी रामस्य प्रियदर्शिनी॥",
    "mantraTransliteration": "Shami Shamayate Papam Shami Shatruvinashini | Arjunasya Dhanurdhari Ramasya Priyadarshini ||",
    "mantraMeaning": "The sacred Shami tree cleanses sins and dissolves all enemies. It held the mighty bow of Arjuna and was deeply dear to Lord Rama."
  },
  "rulesAndDiscipline": {
    "fastingType": "Sattvic Vow",
    "permittedFoods": [
      "Sattvic feast",
      "Jalebi and Fafda (traditional celebration)",
      "Kheer prasad"
    ],
    "strictlyProhibited": [
      "Pride and arrogance",
      "Quarreling with family members",
      "Tamasic foods"
    ],
    "dosAndDonts": [
      "Must exchange Shami leaves with elders and seek blessings",
      "Do inaugurate pending projects"
    ],
    "paranaTiming": "After concluding Vijaya Muhurta rituals"
  },
  "ancientRemedies": [
    {
      "title": "Aparajita Stotram for Career Triumph",
      "benefits": "Overcomes toxic office politics, wins stuck litigation, and ensures victory over competitors.",
      "procedure": "Tie 5 fresh Shami leaves and an Aparajita blue flower in a yellow silk pouch and place it inside your workspace desk or cash locker.",
      "mantra": "ॐ अपराजितायै नमः।"
    }
  ]
},
{
  "id": "diwali_maha_lakshmi_puja",
  "name": "Diwali (Deepawali) & Maha Lakshmi Pujan",
  "nameHi": "दीपावली महापर्व एवं महालक्ष्मी-कुबेर पूजन",
  "monthIndex": 10,
  "monthName": "November",
  "vedicMonth": "Kartika Amavasya",
  "vedicMonthHi": "कार्तिक कृष्ण अमावस्या",
  "gregorianDate": "2026-11-08",
  "dateDisplay": "08 November 2026",
  "tithi": "Kartika Krishna Amavasya",
  "tithiHi": "कार्तिक कृष्ण अमावस्या",
  "category": "mahaparva",
  "categoryLabel": "Maha Parva",
  "deity": "Maha Lakshmi, Lord Ganesha, Maha Saraswati & Kuber",
  "deityHi": "माँ महालक्ष्मी, भगवान गणेश एवं कुबेर देव",
  "significance": "The supreme festival of lights, celebrating the return of Lord Rama to Ayodhya and the cosmic emergence of Goddess Mahalakshmi from the Samudra Manthan. Illuminated with millions of earthen lamps (Diyas) to banish all spiritual and material poverty.",
  "eveDate": "2026-11-07",
  "eveGuidance": {
    "summary": "Cleanse every corner of the house, draw rice-flour Rangolis at entrances, procure pure terracotta diyas, mustard oil, cow ghee, lotus flowers, and silver/gold coins.",
    "checklist": [
      "21 to 51 Terracotta Diyas (Clay lamps)",
      "Pure cow ghee for main 4-wick Lakshmi diya",
      "Fresh pink lotus flowers and marigold garlands",
      "Kheel (Puffed rice) and Batashe (Sugar drops)",
      "New accounts ledger (Bahi-Khata)"
    ],
    "altarDirection": "North or North-East (Kuber & Lakshmi sthana)"
  },
  "exactMuhurtas": [
    {
      "label": "Pradosh Kaal Lakshmi Puja",
      "timing": "05:32 PM to 07:28 PM",
      "description": "Best for households, bringing sustained family peace, health, and auspicious prosperity."
    },
    {
      "label": "Vrishabha Sthir Lagna Window",
      "timing": "06:12 PM to 08:08 PM",
      "description": "Supreme Fixed Ascendant window ensuring wealth remains permanently anchored in the home."
    },
    {
      "label": "Mahanishita Kaal (Tantric & Business)",
      "timing": "11:39 PM to 12:31 AM",
      "description": "Midnight window for traders, industrialists, and high sadhanas of Kanakadhara & Sri Suktam."
    }
  ],
  "ritualsAndVidhi": {
    "overview": "Cleanse altar, install Lakshmi-Ganesha on red velvet cloth, light the central four-wick mustard/ghee lamp, perform Shodashopachara puja, offer Kheel-Batashe, and chant Kanakadhara Stotra.",
    "samagri": [
      "Lotus flowers",
      "Silver coin with Lakshmi-Ganesh motif",
      "Cowrie shells (Kaudis)",
      "Gomti Chakra",
      "Kheel and Batashe",
      "Mustard oil and pure cow ghee"
    ],
    "steps": [
      "Spread red cloth on altar and arrange grains of rice as nine planetary seats.",
      "Install Lord Ganesha to the right and Goddess Lakshmi to the left.",
      "Establish Kalash with holy water, mango leaves, and a coconut wrapped in red thread.",
      "Light the master 4-wick Akhand diya in center, invoking Lakshmi to reside permanently.",
      "Bathe coins with panchamrit, offer lotus flowers, sweets, and Kheel-Batashe.",
      "Chant Sri Suktam and Lakshmi Chalisa, conclude with Aarti, and place diyas at doorstep and terrace."
    ],
    "mantraDevanagari": "ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद श्रीं ह्रीं श्रीं ॐ महालक्ष्म्यै नमः॥",
    "mantraTransliteration": "Om Shreem Hreem Shreem Kamale Kamalalaye Praseeda Praseeda Shreem Hreem Shreem Om Mahalakshmyai Namah ||",
    "mantraMeaning": "O Goddess residing in the lotus, bestower of all prosperity, look upon me with grace and bestow boundless auspiciousness."
  },
  "rulesAndDiscipline": {
    "fastingType": "Phalahari (Fruits & Milk)",
    "permittedFoods": [
      "Fruits, nuts, milk sweets during the day",
      "Complete festive prasad feast after evening Aarti"
    ],
    "strictlyProhibited": [
      "Gambling and intoxicating drinks",
      "Keeping any room pitch dark",
      "Harsh anger and family disputes"
    ],
    "dosAndDonts": [
      "Must keep main door well-lit throughout the night",
      "Do keep cash locker open during Puja"
    ],
    "paranaTiming": "After concluding Pradosh Kaal Lakshmi Aarti and lighting diyas"
  },
  "ancientRemedies": [
    {
      "title": "11 Peeli Kaudi & Gomti Chakra Dhan Vriddhi Potli",
      "benefits": "Attracts permanent cash flow, cures business debts, and eliminates Daridrata (poverty).",
      "procedure": "Energize 11 yellow cowries, 5 Gomti Chakras, and 1 silver coin during Nishita Kaal with Lakshmi mantra, wrap in yellow silk, and place in cash safe.",
      "mantra": "ॐ धनाय नमो नमः।"
    }
  ]
},
{
  "id": "chhath_puja_maha_parva",
  "name": "Chhath Puja Maha Parva (Surya Shasthi)",
  "nameHi": "छठ महापर्व (सूर्य षष्ठी ३६ घंटे का निर्जला व्रत)",
  "monthIndex": 10,
  "monthName": "November",
  "vedicMonth": "Kartika Shukla",
  "vedicMonthHi": "कार्तिक शुक्ल षष्ठी",
  "gregorianDate": "2026-11-15",
  "dateDisplay": "15 November 2026",
  "tithi": "Kartika Shukla Shasthi",
  "tithiHi": "कार्तिक शुक्ल षष्ठी",
  "category": "mahaparva",
  "categoryLabel": "Maha Parva",
  "deity": "Chhathi Maiya & Lord Surya Narayan",
  "deityHi": "षष्ठी मैया (देवी कात्यायनी) एवं भगवान सूर्य",
  "significance": "The most austere and rigorous 4-day festival of Sanatana Dharma. Features a 36-hour unbroken Nirjala (dry) fast, ritual bath in running rivers, and offerings of Arghya to both setting and rising Sun God.",
  "eveDate": "2026-11-14",
  "eveGuidance": {
    "summary": "Nahay Khay (Nov 13), Kharna (Nov 14 evening - kheer cooked on earthen stove with mango wood), followed by unbroken 36-hour Nirjala vow.",
    "checklist": [
      "Bamboo baskets (Daura and Soop)",
      "Thekua ingredients (Wheat flour, organic jaggery, pure ghee)",
      "Full sugarcane with leaves (Ganna)",
      "Ginger and turmeric plants with roots",
      "Clay lamps"
    ],
    "altarDirection": "West-facing for Sandhya Arghya, East-facing for Morning Usha Arghya at river bank"
  },
  "exactMuhurtas": [
    {
      "label": "Kharna Prasad Muhurta",
      "timing": "05:30 PM to 07:15 PM (Nov 14)",
      "description": "Last meal of jaggery kheer and roti cooked on earthen stove before 36-hr fast."
    },
    {
      "label": "Sandhya Arghya (Setting Sun)",
      "timing": "05:27 PM (Sunset Nov 15)",
      "description": "Standing in waist-deep water offering first Arghya to setting Sun."
    },
    {
      "label": "Usha Arghya (Rising Sun & Parana)",
      "timing": "06:44 AM (Sunrise Nov 16)",
      "description": "Offering second Arghya to rising Sun, concluding the mahavrat."
    }
  ],
  "ritualsAndVidhi": {
    "overview": "4 days: Nahay Khay (purification), Kharna (jaggery kheer offering), Sandhya Arghya (standing in river at sunset), and Morning Arghya at sunrise.",
    "samagri": [
      "Bamboo Soop",
      "Thekua prasad",
      "Sugarcane",
      "Grapefruit, bananas, coconut",
      "Earthen diyas",
      "Ganga jal"
    ],
    "steps": [
      "Day 1 (Nahay Khay): Consume bottle gourd and rice cooked in pure ghee after sacred bath.",
      "Day 2 (Kharna): Fast all day, eat jaggery kheer at sunset, and initiate 36-hour Nirjala fast.",
      "Day 3 (Sandhya Arghya): Walk barefoot to riverbank carrying Daura on head; stand chest-deep in water and offer Arghya to setting Sun.",
      "Night of Day 3: Sing Chhathi Maiya folk geet around sugarcane canopy (Kosiya).",
      "Day 4 (Usha Arghya): Return before dawn, stand in cold river, offer Arghya to rising Sun, and break fast with ginger and water."
    ],
    "mantraDevanagari": "ॐ एहि सूर्य सहस्त्रांशो तेजोराशे जगत्पते। अनुकम्पय मां भक्त्या गृहाणार्घ्यं दिवाकर॥",
    "mantraTransliteration": "Om Ehi Surya Sahastransho Tejorashe Jagatpate | Anukampaya Mam Bhaktya Grihanarghyam Divakara ||",
    "mantraMeaning": "O thousand-rayed Sun God, repository of supreme radiance and master of the universe, have mercy on me and accept this offering."
  },
  "rulesAndDiscipline": {
    "fastingType": "Nirjala (No Water)",
    "permittedFoods": [
      "Strict 36-hour Nirjala with zero water or food",
      "Thekua, seasonal fruits, ginger after Usha Arghya"
    ],
    "strictlyProhibited": [
      "Touching prasad with unwashed hands",
      "Using table salt anywhere in the house",
      "Smoking or negative emotions"
    ],
    "dosAndDonts": [
      "Must observe complete silence and purity while making Thekua",
      "Do sleep on clean floor mat"
    ],
    "paranaTiming": "On morning of Day 4 after sunrise Usha Arghya"
  },
  "ancientRemedies": [
    {
      "title": "Surya Shasthi Santan & Arogya Sankalp",
      "benefits": "Cures incurable skin and eye diseases, grants miraculous boon of children, and removes generational poverty.",
      "procedure": "Stand barefoot facing rising Sun in river or brass tub holding bamboo soop laden with Thekua and seasonal fruits, offering cow milk Arghya.",
      "mantra": "ॐ घृणि सूर्याय नमः।"
    }
  ]
},
{
  "id": "guru_pushya_yoga_kartika",
  "name": "Guru Pushya Yoga (Supreme Gold & Asset Muhurta)",
  "nameHi": "गुरु पुष्य योग (सर्वश्रेष्ठ स्वर्ण एवं संपत्ति क्रय मुहूर्त)",
  "monthIndex": 10,
  "monthName": "November",
  "vedicMonth": "Kartika Shukla",
  "vedicMonthHi": "कार्तिक शुक्ल पक्ष",
  "gregorianDate": "2026-11-19",
  "dateDisplay": "19 November 2026",
  "tithi": "Kartika Shukla Dashami / Ekadashi conjunction",
  "tithiHi": "कार्तिक शुक्ल पक्ष - पुष्य नक्षत्र",
  "category": "muhurta",
  "categoryLabel": "Auspicious Yogas",
  "deity": "Brihaspati (Jupiter) & Maha Lakshmi",
  "deityHi": "देवाधिदेव बृहस्पति एवं माँ महालक्ष्मी",
  "significance": "When Thursday coincides with the king of Nakshatras (Pushya), it creates Guru Pushya Yoga. In Hindu astrology, anything acquired, purchased, or invested in on this day flourishes inexhaustibly for generations.",
  "eveDate": "2026-11-18",
  "eveGuidance": {
    "summary": "Plan high-value investments: gold, silver, property registration, vehicle acquisition, or establishing business firms.",
    "checklist": [
      "Select gold/silver jewelry or coins to purchase",
      "Turmeric, saffron, and yellow sweets for altar",
      "Clean silver plate for coins"
    ],
    "altarDirection": "North-East (Ishanya)"
  },
  "exactMuhurtas": [
    {
      "label": "Guru Pushya Yoga Entire Span",
      "timing": "06:47 AM to 03:22 PM",
      "description": "All asset acquisitions and spiritual activations yield immortality of wealth."
    },
    {
      "label": "Abhijit Shubh Muhurta Window",
      "timing": "11:45 AM to 12:28 PM",
      "description": "Supreme midday peak for signing contracts and gold transactions."
    }
  ],
  "ritualsAndVidhi": {
    "overview": "Purchase gold, silver, or land documents during the muhurta; place them before Lord Vishnu and Lakshmi on yellow cloth, offering saffron tilak.",
    "samagri": [
      "Yellow cloth",
      "Saffron paste",
      "Turmeric root",
      "Gold/Silver items",
      "Pure cow ghee"
    ],
    "steps": [
      "Take morning bath wearing yellow clothes.",
      "Perform puja of Lord Brihaspati and Goddess Lakshmi.",
      "Purchase gold or auspicious items within the specified hours.",
      "Bring purchases home, bathe them in Ganga jal and milk, and place at deity's feet.",
      "Chant Kanakadhara Stotra or Brihaspati Beej Mantra 108 times."
    ],
    "mantraDevanagari": "ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः। ॐ श्रीं ह्रीं क्लीं श्रीं नमः॥",
    "mantraTransliteration": "Om Graam Greem Graum Sah Gurave Namah | Om Shreem Hreem Kleem Shreem Namah ||",
    "mantraMeaning": "Salutations to Brihaspati, the divine preceptor, and Goddess Lakshmi who grant eternal wisdom and prosperity."
  },
  "rulesAndDiscipline": {
    "fastingType": "Sattvic Vow",
    "permittedFoods": [
      "Yellow fruits",
      "Gram flour (Besan) sweets",
      "Milk and rice kheer"
    ],
    "strictlyProhibited": [
      "Purchasing leather goods or second-hand items",
      "Consuming non-vegetarian food",
      "Quarrels"
    ],
    "dosAndDonts": [
      "Must invest in durable assets",
      "Do give yellow clothes to a pious teacher"
    ],
    "paranaTiming": "Normal evening meal"
  },
  "ancientRemedies": [
    {
      "title": "Kanakadhara Pushya Stotra Patha",
      "benefits": "Eliminates chronic liquidity crises, unblocks inheritance disputes, and attracts steady capital.",
      "procedure": "Place a golden or brass coin on an eight-petaled lotus drawn with turmeric, chant the Kanakadhara Stotra 3 times, and keep the coin inside your business vault.",
      "mantra": "अङ्कं हरेः पुलकभूषणमाश्रयन्ती भृङ्गाङ्गनेव मुकुलाभरणं तमालम्।"
    }
  ]
},
{
  "id": "kaal_bhairav_jayanti",
  "name": "Kaal Bhairav Jayanti (Bhairav Ashtami)",
  "nameHi": "काल भैरव जयंती (महाभैरवाष्टमी पर्व)",
  "monthIndex": 11,
  "monthName": "December",
  "vedicMonth": "Margashirsha Krishna",
  "vedicMonthHi": "मार्गशीर्ष कृष्ण अष्टमी",
  "gregorianDate": "2026-12-02",
  "dateDisplay": "02 December 2026",
  "tithi": "Margashirsha Krishna Ashtami",
  "tithiHi": "मार्गशीर्ष कृष्ण अष्टमी",
  "category": "jayanti",
  "categoryLabel": "Divine Jayantis",
  "deity": "Bhagavan Kaal Bhairav (Rudra Avatara)",
  "deityHi": "भगवान काल भैरव (रुद्रावतार)",
  "significance": "Appearance day of Lord Kaal Bhairav, the fearsome protector incarnation of Lord Shiva who holds the skull of Brahma. Worshipped for complete annihilation of fear, severe enemies, legal entanglements, and negative occult influences.",
  "eveDate": "2026-12-01",
  "eveGuidance": {
    "summary": "Procure mustard oil (Sarson tel), black sesame (Krishna til), Urad dal fritters (Pakodas), and sweet milk rotis to feed sacred dogs (Bhairav's vahana).",
    "checklist": [
      "Pure mustard oil for 4-wick deepak",
      "Black sesame and black cloth",
      "Fresh jalebis or urad pakodas for dogs",
      "Blue or red flowers"
    ],
    "altarDirection": "South or West direction"
  },
  "exactMuhurtas": [
    {
      "label": "Bhairav Ashtami Evening Puja",
      "timing": "05:25 PM to 08:30 PM",
      "description": "Lighting mustard oil lamps at crossroads, Shiva temples, or home altar."
    },
    {
      "label": "Nishita Kaal Mahapuja",
      "timing": "11:42 PM to 12:35 AM",
      "description": "Midnight window for Kaal Bhairav Ashtakam and protection mantras."
    }
  ],
  "ritualsAndVidhi": {
    "overview": "Bathe Shiva Linga or Bhairav idol with water and milk, light mustard oil lamp, recite Kaal Bhairav Ashtakam, and feed black dogs outside temples.",
    "samagri": [
      "Mustard oil",
      "Earthen lamp",
      "Urad dal pakodas",
      "Sindoor",
      "Black sesame seeds"
    ],
    "steps": [
      "Take evening bath and wear clean clothing.",
      "Light a heavy 4-wick lamp with pure mustard oil before Lord Bhairav or Lord Shiva.",
      "Offer black sesame, sindoor, and blue flowers.",
      "Chant the 8 sacred verses of the Kaal Bhairav Ashtakam composed by Adi Shankaracharya.",
      "Feed black dogs sweet milk bread or urad pakodas with reverence."
    ],
    "mantraDevanagari": "ॐ ह्रीं बटुकाय आपदुद्धारणाय कुरु कुरु बटुकाय ह्रीं ॐ नमः शिवाय॥ ॐ कालभैरवाय नमः॥",
    "mantraTransliteration": "Om Hreem Batukaya Aapaduddharanaya Kuru Kuru Batukaya Hreem Om Namah Shivaya || Om Kaalabhairavaya Namah ||",
    "mantraMeaning": "Salutations to Lord Kaal Bhairav, the fierce deliverer from all catastrophes, fears, and debts."
  },
  "rulesAndDiscipline": {
    "fastingType": "Ekasana (Single Meal)",
    "permittedFoods": [
      "Sattvic food taken once in the evening",
      "Milk and fruits during the day"
    ],
    "strictlyProhibited": [
      "Cruelty to animals (especially dogs)",
      "Alcohol and anger",
      "Eating salt before evening puja"
    ],
    "dosAndDonts": [
      "Must feed street dogs on this night",
      "Do visit a Bhairav temple after sunset"
    ],
    "paranaTiming": "After concluding evening Bhairav worship and dog seva"
  },
  "ancientRemedies": [
    {
      "title": "Bhairav Deepa Daan for Enemy Dissolution",
      "benefits": "Dispels deep-seated phobias, reverses destructive psychic attacks, and grants judicial victory.",
      "procedure": "Fill a large earthen lamp with mustard oil and 8 black pepper corns. Light it at a Shiva temple or under a Peepal tree after 8 PM, chanting the Bhairav Ashtakam.",
      "mantra": "देवराजसेव्यमानपावनाङ्घ्रिपङ्कजं व्यालयज्ञसूत्रमिन्दुशेखरं कृपाकरम्।"
    }
  ]
},
{
  "id": "dattatreya_jayanti",
  "name": "Margashirsha Purnima & Shri Dattatreya Jayanti",
  "nameHi": "मार्गशीर्ष पूर्णिमा एवं श्री दत्तात्रेय जयंती",
  "monthIndex": 11,
  "monthName": "December",
  "vedicMonth": "Margashirsha Purnima",
  "vedicMonthHi": "मार्गशीर्ष पूर्णिमा",
  "gregorianDate": "2026-12-23",
  "dateDisplay": "23 December 2026",
  "tithi": "Margashirsha Purnima",
  "tithiHi": "मार्गशीर्ष पूर्णिमा",
  "category": "jayanti",
  "categoryLabel": "Divine Jayantis",
  "deity": "Lord Dattatreya (Trimurti Incarnation)",
  "deityHi": "भगवान दत्तात्रेय (ब्रह्मा-विष्णु-महेश एकाकार)",
  "significance": "Incarnation of Lord Dattatreya, the combined avatara of Brahma, Vishnu, and Shiva, born to Sage Atri and Anasuya. Accompanied by four sacred dogs (symbolizing the four Vedas) and Kamadhenu. Supreme master of Yoga and spiritual wisdom.",
  "eveDate": "2026-12-22",
  "eveGuidance": {
    "summary": "Procure sandalwood paste, cow milk, holy basil, yellow flowers, and prepare for night vigil or recitation of the Guru Charitra.",
    "checklist": [
      "Image of Lord Dattatreya with 3 faces and 6 hands",
      "Four types of fruits",
      "Cow milk for abhishek",
      "Incense (Dhoop) and pure cow ghee lamp"
    ],
    "altarDirection": "North-East (Guru sthana)"
  },
  "exactMuhurtas": [
    {
      "label": "Purnima Snan & Dattatreya Puja",
      "timing": "07:11 AM to 11:30 AM",
      "description": "Morning holy bath and installation of Dattatreya yantra."
    },
    {
      "label": "Pradosh Kaal Jayanti Aarti",
      "timing": "05:28 PM to 07:15 PM",
      "description": "Evening twilight window when Lord Dattatreya manifested."
    }
  ],
  "ritualsAndVidhi": {
    "overview": "Take sacred bath, perform abhishek of Lord Dattatreya with Panchamrit, offer fragrant sandalwood, read Guru Charitra chapters, and feed cows and dogs.",
    "samagri": [
      "Panchamrit",
      "Sandalwood paste",
      "Yellow flowers",
      "Tulsi and Bilva leaves",
      "Peda or sweet milk prasad"
    ],
    "steps": [
      "Take early morning bath chanting holy river names.",
      "Install Lord Dattatreya picture or idol on a wooden chowki.",
      "Bathe with Panchamrit and Ganga jal; offer yellow clothes and sandalwood.",
      "Recite Dattatreya Stotram or Guru Charitra.",
      "Perform Aarti and distribute milk sweets as prasad."
    ],
    "mantraDevanagari": "ॐ द्रां दत्तात्रेयाय नमः। ॐ दिगंबराय विद्महे योगारूढाय धीमहि तन्नो दत्तः प्रचोदयात्॥",
    "mantraTransliteration": "Om Draam Dattatreyaya Namah | Om Digambaraya Vidmahe Yogarudhaya Dheemahi Tanno Dattah Prachodayat ||",
    "mantraMeaning": "Salutations to Lord Dattatreya, the cosmic yogi clothed in space, who illumines our intellect."
  },
  "rulesAndDiscipline": {
    "fastingType": "Phalahari (Fruits & Milk)",
    "permittedFoods": [
      "Cow milk",
      "Fruits",
      "Sattvic food after moonrise"
    ],
    "strictlyProhibited": [
      "Disrespect to teachers or gurus",
      "Tamasic foods",
      "Egoistic disputes"
    ],
    "dosAndDonts": [
      "Must feed street dogs and cows",
      "Do spend time in meditation or Japa"
    ],
    "paranaTiming": "After moonrise and evening Dattatreya Aarti"
  },
  "ancientRemedies": [
    {
      "title": "Dattatreya Vajra Kavacham for Guru Kripa",
      "benefits": "Cures spiritual confusion, removes severe Pitru and Guru doshas, and awakens intuitive yogic powers.",
      "procedure": "Sit on a kusha or wool mat facing North-East, chant the Dattatreya Gayatri 108 times, and offer bananas to cows.",
      "mantra": "ॐ ऐं ह्रीं क्लीं क्लीं द्रां द्रां दत्तात्रेयाय नमः।"
    }
  ]
}
];

// Combine comprehensive month events with existing specialized deep festival data
export const ALL_COMPREHENSIVE_FESTIVALS = [
  ...VEDIC_ALL_MONTH_EVENTS,
  ...ALL_SACRED_FESTIVALS.filter(f => !VEDIC_ALL_MONTH_EVENTS.some(m => m.id === f.id))
];

