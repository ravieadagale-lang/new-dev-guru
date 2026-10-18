// Comprehensive Vedic Festivals, Sacred Occasions & Shastric Remedies Repository
// Fully calibrated with precise calendar dates, eve preparation, authentic samagri,
// step-by-step procedures, and ancient mantras.

export type FestivalCategory = "mahaparva" | "muhurta" | "vrat" | "jayanti";
export type FestivalTimingStatus = "today" | "eve" | "upcoming" | "completed";

export interface FestivalRemedy {
  title: string;
  titleHi: string;
  benefits: string;
  materials: string[];
  procedure: string;
  mantra: string;
  bestTime: string;
  targetDosha: string;
}

export interface EveGuidance {
  title: string;
  titleHi: string;
  summary: string;
  checklist: string[];
  recommendedPreparation: string;
}

export interface MuhurtaHighlight {
  label: string;
  timing: string;
  description: string;
}

export interface FestivalEvent {
  id: string;
  name: string;
  nameHi: string;
  category: FestivalCategory;
  dateDisplay: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  eveDate: string;   // YYYY-MM-DD (Day Before)
  tithi: string;
  tithiHi: string;
  deity: string;
  deityHi: string;
  significance: string;
  significanceHi: string;
  eveGuidance: EveGuidance;
  muhurtaHighlights: MuhurtaHighlight[];
  remedies: FestivalRemedy[];
}

export const ALL_SACRED_FESTIVALS: FestivalEvent[] = [
  // 1. GANESH CHATURTHI (Sept 14, 2026 • Eve: Sept 13, 2026)
  {
    id: "ganesh_chaturthi",
    name: "Ganesh Chaturthi & Ganeshotsav",
    nameHi: "श्री गणेश चतुर्थी व गणेशोत्सव 2026",
    category: "mahaparva",
    dateDisplay: "14 September 2026",
    startDate: "2026-09-14",
    endDate: "2026-09-14",
    eveDate: "2026-09-13",
    tithi: "Bhadrapada Shukla Chaturthi",
    tithiHi: "भाद्रपद शुक्ल चतुर्थी",
    deity: "Lord Ganesha (Vighnaharta & Siddhidata)",
    deityHi: "भगवान श्री गणेश (विघ्नहर्ता एवं रिद्धि-सिद्धि प्रदाता)",
    significance: "Appearance day of Lord Ganesha, ruler of intellect, destroyer of planetary afflictions (especially Ketu and Mercury), and master of auspicious beginnings.",
    significanceHi: "विघ्नविनाशक, रिद्धि-सिद्धि के दाता भगवान गणेश का प्राकट्य महापर्व। इस दिन की गई साधना से समस्त ग्रहीय दोष (विशेषकर केतु व बुध), व्यापारिक विघ्न व पारिवारिक कलह समूल नष्ट होते हैं।",
    eveGuidance: {
      title: "Eve Preparation: Ganesh Sthapana & Samagri Readiness",
      titleHi: "पर्व पूर्व संध्या: गणेश स्थापना व सामग्री पूर्व तैयारी",
      summary: "Clean the Ishan Kon (North-East direction) of your home. Procure eco-friendly clay idol, red flowers, and 21 durva blades in advance.",
      checklist: [
        "Procure Shwetarka or natural clay (Mitti) Ganesha idol",
        "Gather 21 fresh green Durva grass knots washed in Gangajal",
        "Prepare 21 Modaks or Besan/Motichoor Ladoos for Bhog",
        "Keep Red Sandalwood (Raktachandan), Red Cloth, and Supari ready",
        "Set alarm for Midday Abhijit Muhurta (11:05 AM - 1:35 PM) for Sthapana"
      ],
      recommendedPreparation: "Sanctify the puja altar with Gangajal and draw an Ashta-Dala Lotus using red kumkum and rice grains before sunrise on festival morning."
    },
    muhurtaHighlights: [
      {
        label: "Madhyahna Ganesha Puja Muhurta",
        timing: "11:08 AM to 01:34 PM (Duration: 2 Hours 26 Mins)",
        description: "Supreme window for idol consecration (Pran Pratishtha) and Shodashopachara worship."
      },
      {
        label: "Chandra Darshan Prohibition (Varjyam)",
        timing: "09:15 AM to 08:45 PM",
        description: "Avoid sighting the Moon to prevent Mithya Kalanka (false allegations) as per Shastras."
      }
    ],
    remedies: [
      {
        title: "21 Durva Knots & Red Sindoor Tilak for Ketu Shanti",
        titleHi: "21 दूर्वा दल व सिन्दूर लेपन (केतु दोष व विघ्न निवारण)",
        benefits: "Instantly neutralizes malefic Ketu mahadasha, clears chronic court battles, and dissolves mental blockages.",
        materials: ["21 Fresh Durva grass pairs", "Pure Orange Sindoor", "Desi Ghee", "Red Hibiscus flowers"],
        procedure: "Tie 21 pairs of Durva with white thread. Dip in raw milk and Gangajal. Offer one pair with each chant of Ganesha's 21 sacred names, placing on Ganesha's crown.",
        mantra: "ॐ गं गणपतये नमः। ॐ वक्रतुण्डाय हुम्॥",
        bestTime: "Ganesh Chaturthi Madhyahna (11:15 AM - 1:15 PM)",
        targetDosha: "Ketu Mahadasha, Sudden Adversities & Career Blocks"
      },
      {
        title: "21 Modak Maha Bhog & Riddhi-Siddhi Stotram for Wealth",
        titleHi: "21 मोदक महाभोग एवं रिद्धि-सिद्धि स्तोत्र (व्यापार व धन वृद्धि)",
        benefits: "Attracts steady business cash flow, clears debts, and blesses business owners with sharp intellect.",
        materials: ["21 Fresh Steamed/Fried Modaks", "Chandan", "Cardamom", "Pure Ghee Lamp"],
        procedure: "Arrange 21 modaks in a brass plate with 5 coins. Light four-faced ghee lamp. Chant Sankata Nashana Ganesha Stotra and distribute bhog to family.",
        mantra: "ॐ श्रीं ह्रीं क्लीं ग्लौं गं गणपतये वर वरद सर्वजनं मे वशमानय स्वाहा॥",
        bestTime: "Evening Twilight / Pradosh Kaal (6:30 PM - 7:45 PM)",
        targetDosha: "Budha (Mercury) Dosh & Commercial Stagnation"
      },
      {
        title: "Sankat Nashana Ganesha Stotra Path with Shami Leaves",
        titleHi: "संकटनाशन गणेश स्तोत्र पाठ व शमी पत्र अर्पण",
        benefits: "Puranic shield that removes insurmountable obstacles, clears student study fears, and brings total peace.",
        materials: ["11 Shami Leaves", "Gangajal", "Yellow Flowers"],
        procedure: "Offer Gangajal to Lord Ganesha, touch 11 Shami leaves to forehead and place at Ganesha's feet while reciting the 12 names of Narada Purana.",
        mantra: "प्रणम्य शिरसा देवं गौरीपुत्रं विनायकम्। भक्तावासं स्मरेन्नित्यमायुःकामार्थसिद्धये॥",
        bestTime: "Brahma Muhurat (5:00 AM - 6:30 AM) or Midday",
        targetDosha: "Sarva Vighna (All Obstacles) & Exam/Interview Fear"
      }
    ]
  },

  // 2. ANANT CHATURDASHI (Sept 24, 2026 • Eve: Sept 23, 2026)
  {
    id: "anant_chaturdashi",
    name: "Anant Chaturdashi (Ganesh Visarjan)",
    nameHi: "अनंत चतुर्दशी व श्री गणेश विसर्जन",
    category: "mahaparva",
    dateDisplay: "24 September 2026",
    startDate: "2026-09-24",
    endDate: "2026-09-24",
    eveDate: "2026-09-23",
    tithi: "Bhadrapada Shukla Chaturdashi",
    tithiHi: "भाद्रपद शुक्ल चतुर्दशी",
    deity: "Lord Ananta Padmanabha (Vishnu) & Lord Ganesha",
    deityHi: "भगवान अनंत पद्मनाभ (श्री हरि) एवं गणपति बाप्पा",
    significance: "Tying of the 14-knot sacred Ananta thread, liberating human soul from 14 planetary knots of worldly suffering, and bidding loving farewell to Ganesha.",
    significanceHi: "14 गांठों वाले पवित्र अनंत सूत्र का धारण व भगवान श्री हरि की शेषनाग पर पूजा। यह दिन जीवन के 14 दुखों और ग्रह बंधनों को समाप्त कर अक्षय सुख-समृद्धि प्रदान करता है।",
    eveGuidance: {
      title: "Eve Preparation: Visarjan Samagri & Anant Sutra",
      titleHi: "पूर्व संध्या: विसर्जन सामग्री व 14 गांठ अनंत सूत्र",
      summary: "Prepare fresh Panchamrit, acquire 14-knot sacred Ananta thread dyed in turmeric, and prepare farewell Aarti.",
      checklist: [
        "Procure silk or cotton 14-knot thread (Ananta Sutra)",
        "Prepare pure Kumkum, Haldi, Flowers, and sweets for Uttarpuja",
        "Keep pure water tub or identify natural flowing stream for eco-visarjan",
        "Set alarm for auspicious morning Choghadiya (Shubh / Amrit / Labh)"
      ],
      recommendedPreparation: "Perform emotional Uttarpuja on eve night, seeking forgiveness for any ritual shortcomings during 10 days of Ganeshotsav."
    },
    muhurtaHighlights: [
      {
        label: "Anant Puja & Visarjan Shubh Muhurta",
        timing: "06:12 AM to 10:45 AM (Morning Shubh-Amrit)",
        description: "Best morning hours for tying Ananta Sutra and concluding Ganesha festival."
      },
      {
        label: "Afternoon Visarjan Muhurta",
        timing: "01:45 PM to 03:15 PM (Labh Muhurta)",
        description: "Auspicious royal procession and respectful immersion."
      }
    ],
    remedies: [
      {
        title: "14-Knot Ananta Sutra Dharanam & Vishnu Puja",
        titleHi: "14 गांठों वाले अनंत सूत्र का विधिवत धारण",
        benefits: "Protects against all 14 types of sudden falls, bankruptcy, and fatal planetary strikes.",
        materials: ["14-knot raw cotton/silk thread dyed in Turmeric", "Kheer Bhog", "Lotus Flower"],
        procedure: "Place Ananta Sutra on Betel leaf before Lord Vishnu. Chant Vishnu Sahasranama or Om Anantaya Namah. Men tie on right wrist, women on left wrist.",
        mantra: "अनन्त संसार महासमुद्रे मग्नान् समभ्युद्धर वासुदेव। अनन्तरूपे विनियोजितात्मा ह्यनन्तरूपाय नमो नमस्ते॥",
        bestTime: "Morning between 7:00 AM and 10:30 AM",
        targetDosha: "Rahu-Ketu Karmic Knots, Business Insolvency"
      },
      {
        title: "Eco-Visarjan with Coconut & Coin Dakshina",
        titleHi: "श्री गणेश विसर्जन व श्रीफल अर्पण तंत्र",
        benefits: "Ensures that wealth and auspiciousness remain in the home even after the divine guest departs.",
        materials: ["Water Coconut with husk", "11 Betel nuts (Supari)", "Gangajal water reservoir"],
        procedure: "Perform Grand Maha Aarti. Wave coconut around family members 3 times. Impart heartfelt prayers for return next year ('Pudhchya Varshi Lavkar Ya').",
        mantra: "यान्तु देवगणाः सर्वे पूजामादाय मामकीम्। इष्टकामप्रसिद्ध्यर्थं पुनरागमनाय च॥",
        bestTime: "Auspicious Afternoon or Sunset Choghadiya",
        targetDosha: "Household Discord & Negative Vibrations"
      }
    ]
  },

  // 3. SARVA PITRU AMAVASYA (Oct 10, 2026 • Eve: Oct 9, 2026)
  {
    id: "sarva_pitru_amavasya",
    name: "Sarva Pitru Amavasya (Mahalaya)",
    nameHi: "सर्वपितृ मोक्ष अमावस्या (महालय श्राद्ध)",
    category: "vrat",
    dateDisplay: "10 October 2026",
    startDate: "2026-10-10",
    endDate: "2026-10-10",
    eveDate: "2026-10-09",
    tithi: "Ashwin Krishna Amavasya",
    tithiHi: "आश्विन कृष्ण अमावस्या",
    deity: "Pitru Devatas, Lord Yama & Lord Vishnu",
    deityHi: "पितृ देव, धर्मराज यम एवं भगवान गदाधर (विष्णु)",
    significance: "The supreme final day of Pitru Paksha. Any ancestor whose death tithi is unknown or forgotten is completely satisfied on this day through Tarpan and Pinda Daan.",
    significanceHi: "सोलह श्राद्ध का सबसे महत्वपूर्ण दिन। ज्ञात-अज्ञात सभी पूर्वजों की तृप्ति हेतु तर्पण, पिण्डदान व पंचबलि भोग। इससे 100% पितृदोष शांत होता है और कुल की वृद्धि होती है।",
    eveGuidance: {
      title: "Eve Preparation: Tarpan Samagri & Panchabali Sourcing",
      titleHi: "पूर्व संध्या: तर्पण सामग्री व पंचबलि भोग व्यवस्था",
      summary: "Procure black sesame (Kala Til), Kusha grass ring, white flowers, and barley. Plan morning food for Cow, Dog, Crow, Ants, and Guest.",
      checklist: [
        "Procure Kusha grass Motaka / Pavitri ring",
        "Keep pure Black Sesame (Kala Til), Raw Cow Milk, and Ganga water",
        "Prepare Sattvic Kheer, Poori, and Pumpkin (Kashiphal) subzi without onion/garlic",
        "Identify nearby Peepal tree and cow shelter (Gaushala) for donations"
      ],
      recommendedPreparation: "Maintain complete celibacy, quietude, and peace on the eve. Pray mentally to ancestors inviting them to receive tomorrow's offering."
    },
    muhurtaHighlights: [
      {
        label: "Kutup Muhurta (Most Sacred for Shradha)",
        timing: "11:42 AM to 12:30 PM",
        description: "The 8th Muhurta of the day, supreme for offering Tarpan and Pinda Daan."
      },
      {
        label: "Rohina Muhurta",
        timing: "12:30 PM to 01:18 PM",
        description: "Auspicious window for feeding Brahmins, cows, and crows."
      }
    ],
    remedies: [
      {
        title: "Kusha-Til Tarpan & Pitru Gayatri 108 Japa",
        titleHi: "कुशा-तिल तर्पण एवं पितृ गायत्री महामंत्र जप",
        benefits: "Dissolves intense Pitru Dosha, removes blockages in child conception, and unblocks stuck ancestral wealth.",
        materials: ["Brass or Copper vessel", "Water + Ganga Jal + Raw Milk", "Black Sesame seeds", "Kusha ring"],
        procedure: "Face South direction wearing Kusha ring on right ring finger. Pour water mixed with black sesame through thumb side of hand offering 3 times to each ancestor.",
        mantra: "ॐ देवताभ्यः पितृभ्यश्च महायोगिभ्य एव च। नमः स्वाहायै स्वधायै नित्यमेव नमो नमः॥",
        bestTime: "Kutup & Rohina Muhurta (11:45 AM - 1:15 PM)",
        targetDosha: "Severe Pitru Dosh, Progeny Obstacles & Repeated Miscarriages"
      },
      {
        title: "Panchabali Bhog Arpan (Gau, Shwan, Kaak, Kiti, Deva)",
        titleHi: "पंचबलि कर्म (गाय, कुत्ता, कौआ, चींटी व भिक्षुक भोग)",
        benefits: "Feeds the five elemental channels connected to pitrus, bringing instantaneous peace to family lineage.",
        materials: ["5 separate banana leaf portions with Kheer, Poori, and Jaggery"],
        procedure: "Place 5 portions of food outside on clean ground. Offer with pure water while invoking Yama, ancestors, and universal souls.",
        mantra: "ॐ पितृभ्यो नमः। तृप्यध्वम्, तृप्यध्वम्, तृप्यध्वम्॥",
        bestTime: "Immediately after afternoon cooking before eating",
        targetDosha: "Ancestral Curses, Family Financial Loss & Melancholy"
      }
    ]
  },

  // 4. SHARAD NAVRATRI (Oct 11-19, 2026 • Eve: Oct 10, 2026)
  {
    id: "sharad_navratri",
    name: "Sharad Navratri (Ghatasthapana & Durga Puja)",
    nameHi: "शारदीय नवरात्रि (कलश स्थापना व दुर्गा आराधना)",
    category: "mahaparva",
    dateDisplay: "11 - 19 October 2026",
    startDate: "2026-10-11",
    endDate: "2026-10-19",
    eveDate: "2026-10-10",
    tithi: "Ashwin Shukla Pratipada to Navami",
    tithiHi: "आश्विन शुक्ल प्रतिपदा से नवमी",
    deity: "Maa Durga & 9 Divine Navadurga Avatars",
    deityHi: "माँ भगवती दुर्गा एवं नवदुर्गा के नौ पावन स्वरूप",
    significance: "The supreme cosmic feminine battle festival where Goddess Durga defeated Mahishasura. 9 nights of fasting, Akhand Deepam, and Chandi Paath bestow supreme siddhi.",
    significanceHi: "आदिशक्ति माँ भगवती के नौ स्वरूपों की दिव्य आराधना। कलश स्थापना, अखण्ड ज्योति व दुर्गा सप्तशती पाठ से साधक को अतुल्य बल, ऐश्वर्य, आरोग्यता व शत्रु पराजय प्राप्त होती है।",
    eveGuidance: {
      title: "Eve Preparation: Kalash Sthapana & Jau (Barley) Seeds",
      titleHi: "पूर्व संध्या: कलश, नारियल, जौ व चौकी व्यवस्था",
      summary: "Cleanse the sanctum, acquire earthen pot (Kalash), raw rice, pure mustard/sesame oil or ghee for Akhand Jyoti, and clean sand for sowing barley.",
      checklist: [
        "Procure copper/brass or earthen Kalash with Coconut (Shriphal)",
        "Acquire Barley seeds (Jau) and fresh fertile soil/potting clay",
        "Keep Red Chunari, Mango leaves (5 or 7), and Supari ready",
        "Set alarm for Pratipada morning Ghatasthapana Shubh Muhurta",
        "Set up Akhand Diya with heavy brass base to burn uninterrupted for 9 days"
      ],
      recommendedPreparation: "Perform home purification with holy water at twilight on eve. Take mental pledge (Sankalpa) of fasting level (Nirjala / Phalahar / Ekasana)."
    },
    muhurtaHighlights: [
      {
        label: "Ghatasthapana Shubh Muhurta",
        timing: "06:24 AM to 10:14 AM (Morning Choghadiya)",
        description: "Premier window for sowing barley and installing the sacred cosmic Kalash."
      },
      {
        label: "Abhijit Muhurta Ghatasthapana",
        timing: "11:45 AM to 12:32 PM",
        description: "Most powerful midday window that nullifies any planetary defect in timing."
      }
    ],
    remedies: [
      {
        title: "Akhand Deepam & Durga Saptashati Samputit Paath",
        titleHi: "अखण्ड ज्योति प्रज्वलन एवं दुर्गा सप्तशती सम्पुटित पाठ",
        benefits: "Cuts down darkest negative entities, black magic spells, chronic court oppression, and destroys depression.",
        materials: ["Pure Cow Ghee / Sesame Oil", "Cotton Wicks", "Durga Saptashati Book", "Fresh Red Rose"],
        procedure: "Light Akhand Jyoti in South-East (Agni Kon) before Kalash. Recite Argala, Kilak, Kavach and 13 chapters over the 9-day period.",
        mantra: "ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे॥ सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके। शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥",
        bestTime: "Morning at Sunrise and Twilight Sandhya",
        targetDosha: "Rahu/Ketu Affliction, Evil Eye, Tantric Fear & Loss of Power"
      },
      {
        title: "Kanya Pujan & Shringaar Arpan (Ashtami / Navami)",
        titleHi: "कन्या पूजन व सुहाग सामग्री अर्पण (महाअष्टमी/नवमी)",
        benefits: "Directly invokes the living grace of Durga, removing all household financial blockages and blessing daughters.",
        materials: ["Halwa, Poori, Chana Bhog", "Red Dupattas", "Bangles, Bindi, Coins", "Foot-washing basin"],
        procedure: "Wash feet of 9 young girls (aged 2-10 years) and 1 boy (Batuk Bhairav). Apply kumkum, tie raksha sutra, feed bhog, and touch their feet for blessings.",
        mantra: "विद्याः समस्तास्तव देवि भेदाः स्त्रियः समस्ताः सकला जगत्सु। त्वयैकया पूरितमम्बयैतत् का ते स्तुतिः स्तव्यपरा परोक्तिः॥",
        bestTime: "Maha Ashtami or Navami Morning",
        targetDosha: "Venus (Shukra) Dosh, Financial Hardship & Domestic Strife"
      }
    ]
  },

  // 5. RAVI PUSHYA YOGA (Oct 18, 2026 • Eve: Oct 17, 2026)
  {
    id: "ravi_pushya_oct",
    name: "Ravi Pushya Amrit Yoga",
    nameHi: "रवि पुष्य अमृत सिद्धि योग 2026",
    category: "muhurta",
    dateDisplay: "18 October 2026",
    startDate: "2026-10-18",
    endDate: "2026-10-18",
    eveDate: "2026-10-17",
    tithi: "Sunday coinciding with Pushya Nakshatra",
    tithiHi: "रविवार युक्त पुष्य नक्षत्र (अमृत योग)",
    deity: "Surya Dev, Brihaspati & Goddess Mahalakshmi",
    deityHi: "भगवान सूर्यदेव, देवगुरु बृहस्पति एवं माँ महालक्ष्मी",
    significance: "Pushya is the emperor of all 27 nakshatras. When it aligns with Sunday (the day of Sun), it creates the rare Ravi Pushya Yoga. Any deed, gold purchase, or mantra siddhi initiated on this day bears eternal fruits.",
    significanceHi: "27 नक्षत्रों का राजा 'पुष्य' जब सूर्य के वार (रविवार) से मिलता है, तब दुर्लभ रवि पुष्य योग बनता है। इसमें किया गया स्वर्ण क्रय, व्यापार आरम्भ, बहीखाता पूजन व श्रीयंत्र प्रतिष्ठा कभी निष्फल नहीं होती।",
    eveGuidance: {
      title: "Eve Preparation: Financial Planning & Shree Yantra Purification",
      titleHi: "पूर्व संध्या: स्वर्ण क्रय व श्रीयंत्र शुद्धि पूर्व तैयारी",
      summary: "Plan major purchases (gold, silver, property, vehicle, stocks). Wash altar with raw milk and rose water.",
      checklist: [
        "Plan your gold/silver or high-value purchase timings",
        "Procure pure Panchamrit, Kamal Gatta mala, and Yellow Chandan",
        "Keep business ledgers or important contracts ready for stamping",
        "Set alarm for Brahma Muhurat Surya Arghya"
      ],
      recommendedPreparation: "Keep a copper pot of Ganga water with red flowers ready overnight to offer to Lord Surya on Sunday morning."
    },
    muhurtaHighlights: [
      {
        label: "Ravi Pushya All-Day Auspicious Window",
        timing: "Sunrise (06:28 AM) to Next Day Sunrise",
        description: "Entire day blessed by Pushya Nakshatra and Sunday solar vitality."
      },
      {
        label: "Shree Yantra Abhishekam & Gold Buying Muhurta",
        timing: "08:15 AM to 12:30 PM (Shubh & Chara Choghadiya)",
        description: "Supreme peak muhurta for gold investment and activating Lakshmi yantras."
      }
    ],
    remedies: [
      {
        title: "Gold/Silver Buying & Shree Yantra Pran Pratishtha",
        titleHi: "स्वर्ण/रजत क्रय एवं पारद/स्फटिक श्रीयंत्र प्राण प्रतिष्ठा",
        benefits: "Guarantees that wealth never leaves the lineage; multiplies asset values and attracts high-net-worth opportunities.",
        materials: ["Gold/Silver Coin or Jewelry", "Parad / Sphtik Shree Yantra", "Kesar Chandan", "Lotus Seed (Kamalgatta) Mala"],
        procedure: "Bathe Shree Yantra in raw milk, honey, and Ganga jal. Anoint with saffron paste. Place on red velvet inside home safe or cash box while chanting Kanakadhara Stotram.",
        mantra: "ॐ ह्रीं श्रीं क्रीं श्रीं क्रीं क्लीं श्रीं महालक्ष्मी मम गृहे धनं पूरय पूरय चिंतायै दूरय दूरय स्वाहा॥",
        bestTime: "Morning between 8:30 AM and 11:45 AM",
        targetDosha: "Daridra Dosha, Property Stagnation & Chronic Debt"
      },
      {
        title: "Surya Arghya with Copper Pot, Kumkum & Akshat",
        titleHi: "ताम्र पात्र से अष्टगंध सूर्य अर्घ्य एवं आदित्य हृदय स्तोत्र",
        benefits: "Elevates social status, clears obstacles in government contracts/promotions, and blesses with radiant health.",
        materials: ["Pure Copper Kalash", "Fresh Water", "Red Kumkum", "Akshat (Unbroken Rice)", "Red Flower"],
        procedure: "Stand facing rising Sun with arms raised above head. Offer water in a continuous stream looking at Sun through water droplets while chanting Gayatri / Aditya Hridayam.",
        mantra: "ॐ सूर्याय नमः। ॐ ह्रीं ह्रीं सूर्याय सहस्रकिरणाय मनोवांछित फलं देहि देहि स्वाहा॥",
        bestTime: "Sunrise between 6:30 AM and 7:30 AM",
        targetDosha: "Sun (Surya) Affliction, Low Confidence & Government Obstacles"
      }
    ]
  },

  // 6. DUSSEHRA (VIJAYADASHAMI) (Oct 20, 2026 • Eve: Oct 19, 2026)
  {
    id: "dussehra",
    name: "Dussehra (Vijayadashami)",
    nameHi: "विजयादशमी / दशहरा महापर्व 2026",
    category: "mahaparva",
    dateDisplay: "20 October 2026",
    startDate: "2026-10-20",
    endDate: "2026-10-20",
    eveDate: "2026-10-19",
    tithi: "Ashwin Shukla Dashami",
    tithiHi: "आश्विन शुक्ल दशमी",
    deity: "Lord Rama, Goddess Aparajita & Shami Tree",
    deityHi: "प्रभु श्री राम, भगवती अपराजिता एवं शमी वृक्ष",
    significance: "Supreme day of cosmic victory of righteousness over evil. Lord Rama slayed Ravana, and Goddess Durga vanquished Mahishasura. An infallible day for starting new ventures, professional victory, and court settlements.",
    significanceHi: "अधर्म पर धर्म की विजय का सर्वसिद्धिदायक महापर्व। इस दिन शमी वृक्ष का पूजन, अपराजिता स्तोत्र पाठ, वाहन व शस्त्र पूजन से समस्त शत्रुओं का पराभव और जीवन के हर क्षेत्र में विजय निश्चित होती है।",
    eveGuidance: {
      title: "Eve Preparation: Shami Leaves & Vehicle/Tools Sanctification",
      titleHi: "पूर्व संध्या: शमी पूजन व वाहन-औजार सफाई तैयारी",
      summary: "Clean your vehicles, professional laptops/instruments, and identify a sacred Shami tree in your locality.",
      checklist: [
        "Thoroughly clean cars, motorbikes, professional machinery, and books",
        "Procure yellow mustard seeds, camphor, and fresh marigold garlands",
        "Keep brass plate ready for Aparajita puja",
        "Set alarm for Vijaya Muhurta in afternoon (02:05 PM - 02:52 PM)"
      ],
      recommendedPreparation: "Recite Ramcharitmanas Sundarkand on eve night to welcome the dawn of triumphant victory."
    },
    muhurtaHighlights: [
      {
        label: "Vijaya Muhurta (Most Powerful of the Year)",
        timing: "02:08 PM to 02:55 PM (Duration: 47 Mins)",
        description: "Infallible time window when every endeavor initiated guarantees success."
      },
      {
        label: "Aparajita Puja Twilight Muhurta",
        timing: "01:20 PM to 03:40 PM",
        description: "Best for worshipping Goddess Aparajita for court victory and enemy pacification."
      }
    ],
    remedies: [
      {
        title: "Shami Vriksha Pujan & Aparajita Stotram for Court/Enemy Victory",
        titleHi: "शमी वृक्ष विधिवत पूजन व अपराजिता स्तोत्र पाठ",
        benefits: "Instantly crushes malevolent adversaries, dismisses false litigation, and restores lost honor.",
        materials: ["Shami Tree (or plant in pot)", "Mustard oil diya", "Yellow cloth", "Akshat and Supari"],
        procedure: "Light mustard oil lamp at the root of Shami tree. Offer water, flowers, and Akshat facing North-East. Pluck a small twig with fallen leaves to preserve in safe.",
        mantra: "शमी शमयते पापं शमी लोहितकण्टका। धारिण्यर्जुनबाणानां रामस्य प्रियवादिनी॥",
        bestTime: "Vijaya Muhurta (02:05 PM - 02:55 PM) or Sunset",
        targetDosha: "Enemy Threats, Court Litigation & Saturn Sade Sati"
      },
      {
        title: "Vehicle, Machineries & Astra-Shastra Pujan",
        titleHi: "वाहन, यन्त्र व व्यापारिक औजारों का कुमकुम-पुष्प पूजन",
        benefits: "Eliminates accidents, breakdown curses, and mechanization failures for the entire coming year.",
        materials: ["Sindoor + Ghee", "Yellow marigold garlands", "Lemons & Green Chilies", "Coconut"],
        procedure: "Draw Swastika with Sindoor on vehicle front and machinery. Tie marigold garlands and break coconut before tires.",
        mantra: "ॐ अपराजितायै नमः। ॐ सर्वसिद्धिप्रदायकायै नमः॥",
        bestTime: "Auspicious Afternoon Shubh Choghadiya",
        targetDosha: "Accident Yoga, Rahu-Mars Inauspicious Drishti"
      }
    ]
  },

  // 7. KARWA CHAUTH (Oct 29, 2026 • Eve: Oct 28, 2026)
  {
    id: "karwa_chauth",
    name: "Karwa Chauth (Karak Chaturthi)",
    nameHi: "करवा चौथ (करक चतुर्थी व्रत)",
    category: "vrat",
    dateDisplay: "29 October 2026",
    startDate: "2026-10-29",
    endDate: "2026-10-29",
    eveDate: "2026-10-28",
    tithi: "Kartik Krishna Chaturthi",
    tithiHi: "कार्तिक कृष्ण चतुर्थी",
    deity: "Goddess Karwa, Shiva-Parvati, Lord Ganesha & Chandra Dev",
    deityHi: "माँ करवा, भगवान शिव-गौरी, गणपति एवं चन्द्र देव",
    significance: "Strict Nirjala (waterless) fast observed by married women for the longevity, health, and prosperity of their husbands, and unmarried girls for ideal life partners.",
    significanceHi: "अखण्ड सौभाग्य का परम पावन निर्जला व्रत। सुहागिन स्त्रियां पति की दीर्घायु, उत्तम स्वास्थ्य व अटूट प्रेम हेतु दिनभर निर्जला उपवास रखती हैं और रात्रि में छलनी से चन्द्र दर्शन कर अर्घ्य देती हैं।",
    eveGuidance: {
      title: "Eve Preparation: Sargi Gathering & Shringaar Sourcing",
      titleHi: "पूर्व संध्या: सरगी सामग्री, सोलह शृंगार व छलनी व्यवस्था",
      summary: "Prepare pre-dawn Sargi (fruits, dry fruits, fenian), henna (Mehndi), new red saree, and decorative Karwa pot.",
      checklist: [
        "Arrange pre-dawn Sargi meal prepared by mother-in-law",
        "Apply auspicious Mehndi on hands and feet on eve night",
        "Acquire 2 earthen or brass Karwas, Wheat grains, and Sugar Karwa",
        "Check Moonrise timing (approx 08:15 PM) in your city",
        "Set alarm for Pre-Dawn Brahma Muhurat Sargi meal (04:00 AM - 05:00 AM)"
      ],
      recommendedPreparation: "Eat nutritious slow-digesting sattvic foods, almonds, and coconut water before sunrise during Sargi to stay energized all day."
    },
    muhurtaHighlights: [
      {
        label: "Karwa Chauth Puja Muhurta",
        timing: "05:42 PM to 06:58 PM (Duration: 1 Hour 16 Mins)",
        description: "Twilight time for Karwa Mata Katha, exchanging Karwas, and praying for spouse's longevity."
      },
      {
        label: "Chandra Darshan & Arghya Window",
        timing: "08:12 PM Onwards (Check local city time)",
        description: "Offering milk-water Arghya to Chandra Dev through sieve to break fast."
      }
    ],
    remedies: [
      {
        title: "Chandra Arghya with Sieve & Shiva-Gauri Vow",
        titleHi: "छलनी से चन्द्र दर्शन, अर्घ्य व शिव-पार्वती अखंड सौभाग्य प्रार्थना",
        benefits: "Cements deep emotional bond between husband and wife, dissolves Mangal Dosha and Chandra-Rahu grief.",
        materials: ["Decorative Chalni (Sieve)", "Brass Lota with Milk + Ganga Jal", "Ghee Diya", "Sindoor"],
        procedure: "Light diya on sieve. View Moon through sieve, then husband's face. Pour Arghya to Moon. Husband offers first sip of water to wife.",
        mantra: "ॐ सोमाय नमः। नमः शिवायै शर्वाण्यै सौभाग्यं सन्ततिं शुभाम्। प्रयच्छ भक्तियुक्तायै नारीणां हरवल्लभे॥",
        bestTime: "Moonrise (approx 08:15 PM)",
        targetDosha: "Marital Strife, Manglik Dosha & Separation Fear"
      },
      {
        title: "16 Shringaar Bhent to Elderly Suhasinis / Mother-in-law",
        titleHi: "सास अथवा वरिष्ठ सुहागिन को सुहाग पिटारी (बया) भेंट",
        benefits: "Invokes ancestral matriarchal blessings, ensuring lasting prosperity and harmonious in-laws relationship.",
        materials: ["16 Shringaar items (Sindoor, Bindi, Alta, Bangles, etc.)", "Dry sweets", "Cash Dakshina"],
        procedure: "Touch mother-in-law's feet after puja and gift the Baya basket with sweets, receiving unconditional blessings.",
        mantra: "ॐ श्रीं ह्रीं क्लीं महालक्ष्म्यै नमः॥",
        bestTime: "Post-Puja evening between 6:30 PM and 7:30 PM",
        targetDosha: "In-law Conflicts & 7th House Afflictions"
      }
    ]
  },

  // 8. DHANTERAS (Nov 6, 2026 • Eve: Nov 5, 2026)
  {
    id: "dhanteras",
    name: "Dhanteras (Dhanatrayodashi & Yama Deepam)",
    nameHi: "धनतेरस / धनत्रयोदशी व यम दीपदान 2026",
    category: "mahaparva",
    dateDisplay: "6 November 2026",
    startDate: "2026-11-06",
    endDate: "2026-11-06",
    eveDate: "2026-11-05",
    tithi: "Kartik Krishna Trayodashi",
    tithiHi: "कार्तिक कृष्ण त्रयोदशी",
    deity: "Lord Dhanvantari (God of Ayurveda), Goddess Lakshmi, Lord Kuber & Yamaraj",
    deityHi: "भगवान धन्वंतरि, माँ लक्ष्मी, कुबेर देव एवं यमराज",
    significance: "Appearance of Lord Dhanvantari holding the pot of Amrita (immortality). Celebrated by purchasing gold, silver, brass utensils, and lighting 13 lamps for Yama to ward off untimely death.",
    significanceHi: "अमृत कलश लेकर समुद्र मन्थन से प्रकट हुए भगवान धन्वंतरि की जयंती। इस दिन बर्तन, स्वर्ण, रजत व धनिया क्रय करने से आरोग्य व 13 गुना धन वृद्धि होती है, तथा यम दीपदान से अकाल मृत्यु टलती है।",
    eveGuidance: {
      title: "Eve Preparation: Purchase Planning & 13 Diya Sourcing",
      titleHi: "पूर्व संध्या: धातु क्रय योजना, 13 दीपक व धनिया बीज व्यवस्था",
      summary: "Plan utensils or metal buying. Clean south corner for Yama Deepam. Acquire whole dry coriander seeds (Khada Dhaniya).",
      checklist: [
        "Procure brass or silver utensils, broom (Jhadu), and raw Coriander seeds",
        "Prepare 13 earthen oil lamps with mustard oil and 4-faced large flour diya for Yama",
        "Keep yellow Kauri shells and Gomti Chakras ready for puja",
        "Set alarm for Pradosh Kaal auspicious shopping window"
      ],
      recommendedPreparation: "Sweep and dust every corner of the house thoroughly on eve; buy a new broom tomorrow morning to sweep out poverty."
    },
    muhurtaHighlights: [
      {
        label: "Dhanteras Puja & Shopping Pradosh Muhurta",
        timing: "05:35 PM to 07:32 PM (Duration: 1 Hour 57 Mins)",
        description: "Supreme Pradosh Kaal + Vrishabha Lagna window for buying metals and worshipping Kuber."
      },
      {
        label: "Yama Deepam Timing",
        timing: "05:45 PM to 07:10 PM",
        description: "Auspicious twilight time to light the four-faced flour lamp outside home facing South."
      }
    ],
    remedies: [
      {
        title: "Yama Deepdan with 4-Faced Flour Diya Facing South",
        titleHi: "दक्षिण दिशा में 4 मुखी यम दीपदान (अकाल मृत्यु निवारण)",
        benefits: "Puranic remedy that shields the entire household from untimely accidents, strokes, and terminal illnesses.",
        materials: ["Kneaded wheat flour 4-faced lamp", "Mustard oil", "1 Rupee coin & Cowrie shell inside lamp"],
        procedure: "The eldest member lights the lamp inside, then places it outside the main entrance facing South, walking back without looking behind.",
        mantra: "मृत्युना पाशदण्डाभ्यां कालेन श्यामया सह। त्रयोदश्यां दीपदानात् सूर्यजः प्रीयतां मम॥",
        bestTime: "Dhanteras Evening Pradosh (5:45 PM - 7:00 PM)",
        targetDosha: "Apamrityu (Untimely Demise), Chronic Diseases & 8th House Curse"
      },
      {
        title: "Coriander Seeds (Dhaniya) & Kuber Yantra Wealth Attraction",
        titleHi: "साबुत धनिया, पीली कौड़ी व कुबेर मंत्र धनवर्धक प्रयोग",
        benefits: "Multiplies annual business profits, unblocks stuck loan repayments, and establishes steady wealth.",
        materials: ["100g Whole Coriander seeds (Dhaniya)", "5 Yellow Cowries (Kaudis)", "5 Gomti Chakras", "Silver/Brass utensil"],
        procedure: "Place coriander seeds and cowries before Dhanvantari & Lakshmi. Light ghee diya. After Diwali, sow a portion of coriander in pot and keep rest in cash locker.",
        mantra: "ॐ यक्षाय कुबेराय वैश्रवणाय धनधान्याधिपतये धनधान्यसमृद्धिं मे देहि दापय स्वाहा॥",
        bestTime: "Evening Pradosh Kaal (6:00 PM - 7:30 PM)",
        targetDosha: "Daridra Yoga, Money Drainage & Stagnant Income"
      }
    ]
  },

  // 9. DIWALI (Nov 8, 2026 • Eve: Nov 7, 2026)
  {
    id: "diwali",
    name: "Diwali (Maha Lakshmi Pujan & Deepavali)",
    nameHi: "दीपावली / महालक्ष्मी पूजन 2026",
    category: "mahaparva",
    dateDisplay: "8 November 2026",
    startDate: "2026-11-08",
    endDate: "2026-11-08",
    eveDate: "2026-11-07",
    tithi: "Kartik Krishna Amavasya",
    tithiHi: "कार्तिक कृष्ण अमावस्या",
    deity: "Goddess Mahalakshmi, Lord Ganesha, Goddess Saraswati & Lord Kuber",
    deityHi: "भगवती महालक्ष्मी, श्री गणेश, माँ सरस्वती एवं कुबेर देव",
    significance: "The supreme night of illumination and absolute wealth. On this darkest night of Amavasya, Goddess Mahalakshmi roams the earth to enter clean, illuminated, and prayerful homes.",
    significanceHi: "अंधकार पर प्रकाश की विजय का महापर्व। इस रात्रि स्थिर वृषभ लग्न व महानिशीथ काल में माँ महालक्ष्मी की षोडशोपचार पूजा से दरिद्रता का समूल नाश होता है और अष्टलक्ष्मी का वास होता है।",
    eveGuidance: {
      title: "Eve Preparation: Rangoli, Diyas & Lakshmi Chauki Setup",
      titleHi: "पूर्व संध्या: रंगोली, मिट्टी के दीपक व लक्ष्मी चौकी तैयारी",
      summary: "Prepare 21-51 earthen lamps soaked in water, red silk cloth on wooden chauki, lotus flowers, and Kesar Chandan.",
      checklist: [
        "Soak 31-108 earthen diyas in water overnight so they don't drink excessive oil",
        "Acquire fresh Lotus flowers, Kamal Gatta mala, and Bilva leaves",
        "Draw auspicious footprints of Goddess Lakshmi entering into the home from doorway",
        "Keep pure Cow Ghee and Mustard oil ready for lamps",
        "Set alarm for Pradosh Kaal Sthir Lagna (Vrishabha Lagna) Puja timing"
      ],
      recommendedPreparation: "Perform Choti Diwali (Narak Chaturdashi) pre-dawn Ubtan bath on eve morning to banish all lethargy and sins."
    },
    muhurtaHighlights: [
      {
        label: "Lakshmi Puja Pradosh Kaal (Sthir Vrishabha Lagna)",
        timing: "05:40 PM to 07:38 PM (Duration: 1 Hour 58 Mins)",
        description: "The most auspicious fixed sign (Sthir) window ensuring wealth stays permanently in the home."
      },
      {
        label: "Mahanishitha Kaal Tantrik Lakshmi Sadhana",
        timing: "11:39 PM to 12:31 AM (Midnight Window)",
        description: "Supreme time for business owners, sadhakas, and Kanakadhara / Sri Suktam siddhi."
      }
    ],
    remedies: [
      {
        title: "Sthir Lagna Lakshmi-Ganesh Shodashopachara & Lotus Offering",
        titleHi: "स्थिर वृषभ लग्न में 108 कमलगट्टा व श्री सूक्त पाठ",
        benefits: "Permanently anchors Mahalakshmi's graceful presence in home and enterprise, banishing bankruptcy.",
        materials: ["Fresh Pink Lotus flower", "Kamal Gatta rosary", "Pure Cow Ghee Lamp", "Kheer Bhog", "Silver coin"],
        procedure: "Sit facing North or East during Vrishabha Lagna. Chant 16 richas of Rigvedic Sri Suktam offering one lotus petal or kamalgatta seed on each richa to Mahalakshmi.",
        mantra: "ॐ श्रीं ह्रीं क्लीं श्रीं क्लीं वित्तेश्वराय नमः। ॐ श्रीं ह्रीं क्लीं त्रिभुवन महालक्ष्म्यै अस्मांक दारिद्र्य नाशय प्रचुर धन देहि देहि क्लीं ह्रीं श्रीं ॐ॥",
        bestTime: "Pradosh Kaal (05:40 PM - 07:38 PM)",
        targetDosha: "Daridra Yoga, Severe Cash Crunch & Debt Burden"
      },
      {
        title: "Mahanishitha Kaal 7-Cowrie Red Cloth Potli for Safe",
        titleHi: "महानिशीथ काल: 7 पीली कौड़ी, 5 गोमती चक्र व सिन्दूर पोटली",
        benefits: "Acts as a divine wealth magnet for cash registers, vault safes, and bank deposit lockers.",
        materials: ["7 Yellow Cowries", "5 Gomti Chakras", "1 Silver Coin", "Red Silk Cloth", "Pure Camphor"],
        procedure: "Consecrate items during midnight Mahanishitha Kaal with incense. Tie into a pouch and place inside business cash box or home safe on Diwali night.",
        mantra: "ॐ ह्रीं श्रीं लक्ष्मीभयो नमः॥",
        bestTime: "Mahanishitha Kaal (11:40 PM - 12:30 AM)",
        targetDosha: "Business Insecurity, Blocked Invoices & Financial Leakage"
      }
    ]
  },

  // 10. GOVARDHAN PUJA & ANNAKUT (Nov 9, 2026 • Eve: Nov 8, 2026)
  {
    id: "govardhan_puja",
    name: "Govardhan Puja & Annakut",
    nameHi: "गोवर्धन पूजा व 56 भोग अन्नकूट 2026",
    category: "mahaparva",
    dateDisplay: "9 November 2026",
    startDate: "2026-11-09",
    endDate: "2026-11-09",
    eveDate: "2026-11-08",
    tithi: "Kartik Shukla Pratipada",
    tithiHi: "कार्तिक शुक्ल प्रतिपदा",
    deity: "Lord Krishna (Giridhari) & Gau Mata",
    deityHi: "भगवान श्रीकृष्ण (गिरिराज जी) एवं गौ माता",
    significance: "Celebration of Lord Krishna lifting Govardhan Hill on his little finger to shatter Indra's ego and shelter all living beings. Gratitude to nature, cattle, and bounty of crops.",
    significanceHi: "इंद्र का मानमर्दन कर भगवान श्रीकृष्ण द्वारा गोवर्धन पर्वत धारण करने का महोत्सव। इस दिन गोबर से गोवर्धन पर्वत बनाकर परिक्रमा करने तथा 56 प्रकार के अन्नकूट भोग लगाने से परिवार में कभी अन्न-धन की कमी नहीं होती।",
    eveGuidance: {
      title: "Eve Preparation: Cow Dung Sourcing & 56 Bhog Planning",
      titleHi: "पूर्व संध्या: गाय का गोबर, खील-बताशे व अन्नकूट सामग्री",
      summary: "Procure fresh clean cow dung (Gau Maya) for shaping Giriraj, seasonal vegetables for mixed Annakut subzi, and sweets.",
      checklist: [
        "Procure fresh cow dung from gaushala or local source",
        "Gather diverse seasonal vegetables for the traditional Annakut mix",
        "Keep sweets, butter (Makhan-Mishri), and flowers ready",
        "Set alarm for morning Govardhan Parikrama and Puja Muhurta"
      ],
      recommendedPreparation: "Prepare Annakut bhog with joy and devotional songs, thanking Mother Earth for sustaining mankind."
    },
    muhurtaHighlights: [
      {
        label: "Govardhan Puja Pratahkaal Muhurta",
        timing: "06:38 AM to 08:52 AM (Morning Shubh Window)",
        description: "Best morning time for crafting Giriraj with cow dung and offering Parikrama."
      },
      {
        label: "Evening Annakut Bhog Muhurta",
        timing: "03:22 PM to 05:35 PM",
        description: "Auspicious window for offering 56 bhog and performing Gau Mata puja."
      }
    ],
    remedies: [
      {
        title: "Cow Dung Giriraj Sthapana & 7 Parikrama",
        titleHi: "गोबर के गोवर्धन जी निर्माण व 7 परिक्रमा तंत्र",
        benefits: "Cures family discord, invites cattle/agricultural prosperity, and shields home from natural catastrophes.",
        materials: ["Fresh Cow dung", "Curd, Milk, Gangajal", "Khichdi & Makhan-Mishri"],
        procedure: "Shape Govardhan shape in courtyard. Decorate with flowers. Circle 7 times clockwise offering water and roasted barley.",
        mantra: "गोवर्धन धराधार गोकुल त्राणकारक। विष्णुबाहु कृतोच्छ्राय गवां कोटिप्रदो भव॥",
        bestTime: "Morning between 7:00 AM and 9:00 AM",
        targetDosha: "Household Arguments, Agricultural Loss & Natural Disaster Fear"
      },
      {
        title: "Gau Mata Seva with Jaggery, Green Fodder & Roti",
        titleHi: "गौ माता पूजन, गुड़-रोटी व हरा चारा सेवा",
        benefits: "Directly pacifies all 33 crore deities residing inside Gau Mata, pacifying severe Rahu/Ketu and Pitru dosha.",
        materials: ["Fresh Green Fodder / Grass", "Jaggery (Gud)", "Wheat Roti with Ghee", "Chandan Tilak"],
        procedure: "Feed cow with own hands, apply chandan on cow's forehead, circle her clockwise 3 times and touch feet.",
        mantra: "नमो गोभ्यः श्रीमतीभ्यः सौरभेयीभ्य एव च। नमो ब्रह्मसुताभ्यश्च पवित्राभ्यो नमो नमः॥",
        bestTime: "Morning or Afternoon",
        targetDosha: "Rahu/Ketu Transit Afflictions & Unresolved Karma"
      }
    ]
  },

  // 11. CHHATH PUJA (Nov 14-17, 2026 • Eve: Nov 13, 2026)
  {
    id: "chhath_puja",
    name: "Mahaparva Chhath Puja (Surya Shashthi)",
    nameHi: "महापर्व छठ पूजा (सूर्य षष्ठी व्रत)",
    category: "mahaparva",
    dateDisplay: "14 - 17 November 2026",
    startDate: "2026-11-14",
    endDate: "2026-11-17",
    eveDate: "2026-11-13",
    tithi: "Kartik Shukla Chaturthi to Saptami",
    tithiHi: "कार्तिक शुक्ल चतुर्थी से सप्तमी",
    deity: "Lord Surya (Sun God) & Chhathi Maiya (Usha & Pratyusha)",
    deityHi: "भगवान सूर्यदेव एवं छठी मइया (ऊषा व प्रत्युषा)",
    significance: "The most austere 36-hour waterless Vedic penance dedicated to Lord Surya. It heals chronic skin/eye diseases, blesses childless couples, and ensures high prestige.",
    significanceHi: "सनातन धर्म का सबसे कठिन व पवित्र 36 घंटे का निर्जला महापर्व। नहाय-खाय, खरना, अस्ताचलगामी सूर्य को सायंकालीन अर्घ्य तथा उदयीमान सूर्य को प्रातःकालीन अर्घ्य से सूर्य देव व छठी मइया आरोग्य, सन्तान व अतुल्य तेज प्रदान करते हैं।",
    eveGuidance: {
      title: "Eve Preparation: Nahay-Khay & Bamboo Soop Sourcing",
      titleHi: "पूर्व संध्या: नहाय-खाय पूर्व तैयारी व बांस के सूप",
      summary: "Procure virgin bamboo soop, sugarcane stalks, clay stove (Chulha), Thekua wheat flour, and mango firewood.",
      checklist: [
        "Procure bamboo soop, daura (large baskets), and seasonal fruits (grapefruit, sugarcane)",
        "Acquire organic jaggery, pure ghee, and whole wheat for Thekua prasad",
        "Clean the cooking area spotlessly with holy water",
        "Identify ghat or water reservoir for standing waist-deep during Arghya"
      ],
      recommendedPreparation: "Maintain absolute purity of thought, speech, and cleanliness. No leather, shoes, or non-vegetarian cooking anywhere on premises."
    },
    muhurtaHighlights: [
      {
        label: "Sandhya Arghya (Setting Sun)",
        timing: "15 November 2026: 05:28 PM Sunset",
        description: "Offering milk and water arghya to Pratyusha (setting sun rays)."
      },
      {
        label: "Usha Arghya (Rising Sun & Paran)",
        timing: "16 November 2026: 06:44 AM Sunrise",
        description: "Offering arghya to rising sun and concluding 36-hour fasting."
      }
    ],
    remedies: [
      {
        title: "Kosi Bharai & Thekua Mahaprasad Offering in Soop",
        titleHi: "बांस के सूप में ठेकुआ महाप्रसाद व कोसी भराई अनुष्ठान",
        benefits: "Fulfills the deepest cherished desires of lineage continuation, curing incurable physical ailments.",
        materials: ["Bamboo Soop", "Freshly baked Jaggery Thekua", "Sugarcane with leaves", "Earthen diyas"],
        procedure: "Fill soop with fruits, thekua, and lighted lamp. Enter flowing water waist-deep and lift soop towards Sun while family pours cow milk.",
        mantra: "ॐ एहि सूर्य सहस्त्रांशो तेजोराशे जगत्पते। अनुकम्पय मां भक्त्या गृहाणार्घ्यं दिवाकर॥",
        bestTime: "Sunset (Sandhya Arghya) & Sunrise (Usha Arghya)",
        targetDosha: "Infertility, Severe Sun Debilitation & Incurable Diseases"
      },
      {
        title: "Standing Water Surya Dhyan for Eye & Bone Vitality",
        titleHi: "जलांजलि सूर्य ध्यान एवं सूर्य गायत्री जप",
        benefits: "Fills the physical aura with solar prana, revitalizing heart, spinal column, and eyesight.",
        materials: ["Copper vessel", "Red sandalwood water", "Gangajal"],
        procedure: "Stand barefoot facing the solar sphere. Gaze softly at rising sun without blinking for brief moments while chanting.",
        mantra: "ॐ आदित्याय विद्महे प्रभाकराय धीमहि तन्नः सूर्यः प्रचोदयात्॥",
        bestTime: "Sunrise directly at 06:45 AM",
        targetDosha: "Heart/Eye Weakness & Lack of Social Honor"
      }
    ]
  },

  // 12. AKSHAYA TRITIYA (May 9, 2027 • Eve: May 8, 2027)
  {
    id: "akshaya_tritiya",
    name: "Akshaya Tritiya (Akha Teej)",
    nameHi: "अक्षय तृतीया (अखा तीज) महापर्व",
    category: "mahaparva",
    dateDisplay: "9 May 2027",
    startDate: "2027-05-09",
    endDate: "2027-05-09",
    eveDate: "2027-05-08",
    tithi: "Vaishakha Shukla Tritiya",
    tithiHi: "वैशाख शुक्ल तृतीया",
    deity: "Lord Vishnu, Goddess Mahalakshmi & Lord Parashurama",
    deityHi: "भगवान विष्णु, माँ महालक्ष्मी एवं भगवान परशुराम",
    significance: "An infallible self-proven (Swayamsiddha) muhurta where the Sun and Moon are simultaneously exalted. Any charity, gold purchase, japa, or investment made on this day never decays (Akshaya).",
    significanceHi: "अबूझ मुहूर्त। इस दिन सूर्य व चन्द्रमा दोनों अपनी उच्च राशि में होते हैं। इस तिथि पर किया गया जप, दान, स्नान व स्वर्ण क्रय अक्षय (अनंत काल तक न नष्ट होने वाला) फल प्रदान करता है।",
    eveGuidance: {
      title: "Eve Preparation: Water Pot (Ghat) Charity & Gold Planning",
      titleHi: "पूर्व संध्या: जलपात्र दान, सत्तू, पंखा व स्वर्ण क्रय योजना",
      summary: "Procure earthen water pot (Matka/Ghat), barley (Jau), hand fan, umbrella, and sattu for summer charity.",
      checklist: [
        "Procure an earthen water pot (Kumbha) with a copper lid",
        "Keep Barley (Jau), raw sugar (Khand), and Sattu ready for charity to needy/Brahmins",
        "Reserve gold/silver purchase slot or investment funds",
        "Set alarm for early morning Ganga snan and Vishnu-Lakshmi Archana"
      ],
      recommendedPreparation: "Cleanse home safe and accounts with Gangajal on eve to prepare for eternal wealth influx."
    },
    muhurtaHighlights: [
      {
        label: "Akshaya Tritiya Gold Buying Muhurta",
        timing: "05:35 AM to 12:18 PM (Auspicious Morning Amrit/Shubh)",
        description: "Supreme window for buying gold, silver, real estate, and financial investments."
      },
      {
        label: "Punya Kaal Snan & Daan Timing",
        timing: "05:35 AM to 11:15 AM",
        description: "Best hours for donating water pots, food, and clothes."
      }
    ],
    remedies: [
      {
        title: "Udakumbha Daan (Water Pot with Jaggery & Barley Donation)",
        titleHi: "उदकुम्भ दान (शीतल जल घट, सत्तू, खरबूजा व जौ दान)",
        benefits: "Equivalent to performing Ashwamedha Yajna; dissolves generational poverty and satisfies all ancestors.",
        materials: ["Earthen Water Pot filled with clean water", "Muskmelon (Kharbooja)", "Sattu", "Hand Fan", "Dakshina"],
        procedure: "Offer prayers to Lord Vishnu over the pot. Donate to a temple priest, thirsty traveler, or poor person with pure heart.",
        mantra: "एष धर्मघटो दत्तो ब्रह्मविष्णुशिवात्मकः। अस्य प्रदानात्तृप्यन्तु पितरोऽपि पितामहाः॥",
        bestTime: "Morning between 7:30 AM and 11:00 AM",
        targetDosha: "Pitru Rin, Severe Sun Heat Stroke & Ancestral Blockages"
      },
      {
        title: "Gold Purchase & Sookshma Lakshmi Beej 108 Japa",
        titleHi: "स्वर्ण क्रय एवं अक्षय लक्ष्मी बीज महामंत्र जप",
        benefits: "Guarantees that gold and assets will continuously multiply and never have to be mortgaged or sold in distress.",
        materials: ["Gold/Silver Coin", "Yellow cloth", "Saffron paste", "Kamalgatta seeds"],
        procedure: "Purchase gold during auspicious muhurta. Wash with Panchamrit, wrap in yellow silk, and place at feet of Lakshmi-Narayana while chanting.",
        mantra: "ॐ ह्रीं श्रीं क्लीं महालक्ष्मी नमः। ॐ नमो नारायणाय॥",
        bestTime: "Gold buying muhurta (06:00 AM - 12:00 PM)",
        targetDosha: "Financial Degradation & Asset Depletion"
      }
    ]
  },

  // 13. MAHA SHIVRATRI (March 6, 2027 • Eve: March 5, 2027)
  {
    id: "maha_shivratri",
    name: "Maha Shivratri (Great Night of Shiva)",
    nameHi: "महाशिवरात्रि महापर्व",
    category: "mahaparva",
    dateDisplay: "6 March 2027",
    startDate: "2027-03-06",
    endDate: "2027-03-06",
    eveDate: "2027-03-05",
    tithi: "Phalguna Krishna Chaturdashi",
    tithiHi: "फाल्गुन कृष्ण चतुर्दशी",
    deity: "Lord Shiva (Sadashiva) & Goddess Parvati",
    deityHi: "देवाधिदेव महादेव एवं माँ जगदम्बा पार्वती",
    significance: "The supreme cosmic night of Shiva-Shakti union and the manifestation of the infinite Jyotirlinga. Fasting and 4-pahar night worship burns down karmas of 100 lifetimes.",
    significanceHi: "शिव व शक्ति के महामिलन की दिव्य रात्रि। इस पावन निशा में चार प्रहर रुद्राभिषेक, बिल्वपत्र अर्पण व जागरण करने से प्राणी जन्म-मरण के बंधन से मुक्त होकर मोक्ष व समस्त सांसारिक सुख प्राप्त करता है।",
    eveGuidance: {
      title: "Eve Preparation: Bilva Patra & Abhishekam Samagri Gathering",
      titleHi: "पूर्व संध्या: 108 अखण्ड बिल्वपत्र, धतूरा, भस्म व दूध व्यवस्था",
      summary: "Procure intact Bilva leaves, Dhatura fruits, raw milk, pure honey, sugarcane juice, and Bhasma.",
      checklist: [
        "Procure 108 unbroken Bilva leaves washed in Ganga water",
        "Acquire Dhatura, Bhasma (sacred ash), and Vijaya/Bhang leaves",
        "Keep raw cow milk, curd, honey, ghee, and sugar for 4-pahar abhishekam",
        "Plan night-long vigil (Jagaran) schedule for the 4 spiritual watches"
      ],
      recommendedPreparation: "Observe light sattvic diet on eve night; clean personal Shivalinga and altar with Gangajal before sunset."
    },
    muhurtaHighlights: [
      {
        label: "Nishita Kaal Shiva Puja (Peak Midnight Window)",
        timing: "11:58 PM to 12:48 AM (Duration: 50 Mins)",
        description: "The supreme astrological moment of Jyotirlinga manifestation."
      },
      {
        label: "Four Pahar Night Long Puja",
        timing: "6:20 PM to Next Day 6:35 AM",
        description: "Four distinct watches of Rudra Abhishekam across the sacred night."
      }
    ],
    remedies: [
      {
        title: "4-Pahar Rudra Abhishekam with Panchamrit & Bilva Patra",
        titleHi: "चार प्रहर रुद्राभिषेक व 108 बिल्वपत्र अर्पण",
        benefits: "Obliterates chronic terminal diseases, eliminates Saturn Sade Sati / Rahu Kaalsarp curse, and bestows moksha.",
        materials: ["Raw Cow Milk (1st Pahar)", "Curd (2nd Pahar)", "Ghee (3rd Pahar)", "Honey (4th Pahar)", "108 Bilva leaves"],
        procedure: "Perform Abhishekam in each watch of the night while chanting Maha Mrityunjaya Mantra or Rudrashtakam.",
        mantra: "ॐ हौं जूं सः ॐ भूर्भुवः स्वः ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥",
        bestTime: "Nishita Kaal Midnight & 4 Pahar night watches",
        targetDosha: "Saturn Sade Sati, Kalsarp Dosh, Terminal Illness & Fear of Death"
      }
    ]
  },

  // 14. SHRAVAN MAAS (Historical 2026: July 30 - Aug 28, 2026 [COMPLETED] • 2027: July 19 - Aug 17, 2027)
  {
    id: "shravan_maas",
    name: "Shravan Maas (Holy Sawan Month)",
    nameHi: "पवित्र श्रावण (सावन) मास",
    category: "mahaparva",
    dateDisplay: "July - August Cycle",
    startDate: "2026-07-30",
    endDate: "2026-08-28", // Expired for 2026!
    eveDate: "2026-07-29",
    tithi: "Full Month of Shravana",
    tithiHi: "श्रावण मास पूर्ण माह",
    deity: "Lord Shiva & Goddess Parvati",
    deityHi: "भगवान शिव एवं माँ पार्वती",
    significance: "The most sacred month in the Vedic calendar for Lord Shiva. Raindrops symbolize divine grace, removing all past karma and planetary doshas.",
    significanceHi: "वैदिक पंचांग का सर्वाधिक फलदायी महीना। भगवान शिव को सर्वाधिक प्रिय सावन माह में जलाभिषेक व रुद्राभिषेक से समस्त पाप, दरिद्रता व ग्रहीय दोष नष्ट होते हैं।",
    eveGuidance: {
      title: "Eve Preparation: Shravan Somwar Sankalpa & Jaladhara",
      titleHi: "पूर्व संध्या: श्रावण सोमवार संकल्प व जलाभिषेक पात्र",
      summary: "Procure continuous stream copper pot (Jaladhara), Bilva leaves, and Panchamrit materials.",
      checklist: [
        "Procure copper Jaladhara pot with hanging stand for Shivalinga",
        "Acquire fresh Bilva leaves, Raw Cow Milk, and Ganga water",
        "Set alarm for pre-dawn Brahma Muhurat Jalabhishekam on Somwar"
      ],
      recommendedPreparation: "Take a vow of pure vegetarian sattvic diet throughout the sacred month of Shravana."
    },
    muhurtaHighlights: [
      {
        label: "Shravan Somwar Brahma Muhurta",
        timing: "04:30 AM to 06:00 AM",
        description: "Best morning hours for offering raw cow milk and bilva leaves."
      }
    ],
    remedies: [
      {
        title: "Panchamrit & 108 Bilva Patra Abhishekam",
        titleHi: "पञ्चामृत व 108 बिल्वपत्र रुद्राभिषेक",
        benefits: "Removes chronic illnesses, calms Rahu/Ketu afflictions, grants long life & mental peace.",
        materials: ["Raw Cow Milk", "Curd", "Ghee", "Honey", "Jaggery/Sugar", "108 Fresh unbroken Bilva Leaves"],
        procedure: "Pour Panchamrit gently on Shivalinga while chanting 'Om Namah Shivaya'. Offer 108 Bilva leaves one by one, with the smooth side touching the Shivalinga while writing 'Ram' or 'Om' with Chandan on central leaf.",
        mantra: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥",
        bestTime: "Shravan Mondays (Somwar) during Brahma Muhurat (4:30 AM - 6:00 AM)",
        targetDosha: "Rahu/Ketu Affliction, Chandra Dosh & Mental Anxiety"
      },
      {
        title: "Sugarcane Juice (Ikshu Rasa) Abhisheka for Wealth",
        titleHi: "गन्ने के रस से जलाभिषेक (लक्ष्मी व धन प्राप्ति तंत्र)",
        benefits: "Eliminates ancestral debt traps, invokes Goddess Mahalakshmi's steady presence, accelerates business income.",
        materials: ["Fresh Sugarcane Juice", "Lotus Flowers (Kamal Gatta)", "White Chandan"],
        procedure: "Pour fresh sugarcane juice continuously over Shivalinga in a steady thin stream (Jaladhara). Pray for debt liberation and financial stability.",
        mantra: "ॐ नमः शिवाय श्रीं ह्रीं क्लीं श्री सिद्धेश्वर महादेवाय नमः॥",
        bestTime: "Shravan Mondays or Pradosh Tithi evening twilight",
        targetDosha: "Daridra Dosha, Financial Blockages & Business Losses"
      }
    ]
  }
];

/**
 * Calculates whether a festival is Today, Eve (Tomorrow), Upcoming, or Completed
 * relative to the given reference date (defaults to current system date).
 */
export function getFestivalTimingStatus(festival: FestivalEvent, referenceDateStr?: string): {
  status: FestivalTimingStatus;
  daysUntil: number;
  isEveOrToday: boolean;
  message: string;
  badgeColor: string;
} {
  const refDate = referenceDateStr ? new Date(referenceDateStr.includes("T") ? referenceDateStr : `${referenceDateStr}T00:00:00`) : new Date();
  const refTime = new Date(refDate.getFullYear(), refDate.getMonth(), refDate.getDate()).getTime();

  const startDate = new Date(`${festival.startDate}T00:00:00`);
  const startTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime();

  const endDate = new Date(`${festival.endDate}T00:00:00`);
  const endTime = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()).getTime();

  const eveDate = new Date(`${festival.eveDate}T00:00:00`);
  const eveTime = new Date(eveDate.getFullYear(), eveDate.getMonth(), eveDate.getDate()).getTime();

  const oneDayMs = 1000 * 60 * 60 * 24;
  const daysUntil = Math.round((startTime - refTime) / oneDayMs);

  // 1. Check if ACTIVE TODAY (within start and end date inclusive)
  if (refTime >= startTime && refTime <= endTime) {
    return {
      status: "today",
      daysUntil: 0,
      isEveOrToday: true,
      message: "Active Today! (आज का पावन महापर्व)",
      badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/40"
    };
  }

  // 2. Check if EVE (The day before start date)
  if (refTime === eveTime || daysUntil === 1) {
    return {
      status: "eve",
      daysUntil: 1,
      isEveOrToday: true,
      message: "Tomorrow / Eve Preparation (पर्व पूर्व संध्या - कल का पावन पर्व)",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40"
    };
  }

  // 3. Check if COMPLETED (after end date)
  if (refTime > endTime) {
    return {
      status: "completed",
      daysUntil,
      isEveOrToday: false,
      message: "Festival Concluded for this Cycle (सम्पन्न)",
      badgeColor: "bg-slate-700/40 text-slate-400 border-slate-600/40"
    };
  }

  // 4. Otherwise UPCOMING (days in future)
  return {
    status: "upcoming",
    daysUntil,
    isEveOrToday: false,
    message: `Upcoming in ${daysUntil} days (अगला पावन पर्व - ${daysUntil} दिन शेष)`,
    badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/40"
  };
}

/**
 * Intelligent selector that finds:
 * - Any festival active TODAY
 * - OR any festival active TOMORROW (EVE)
 * - OR the next upcoming festival
 * - Filters out expired ones from automatic primary view!
 */
export function getSmartFestivalFocus(referenceDateStr?: string): {
  primaryFestival: FestivalEvent;
  status: FestivalTimingStatus;
  daysUntil: number;
  activeTodayFestivals: FestivalEvent[];
  eveFestivals: FestivalEvent[];
  upcomingFestivals: FestivalEvent[];
} {
  const refDate = referenceDateStr || new Date().toISOString().split("T")[0];

  const activeToday: FestivalEvent[] = [];
  const eveList: FestivalEvent[] = [];
  const upcomingList: FestivalEvent[] = [];

  for (const fest of ALL_SACRED_FESTIVALS) {
    const { status } = getFestivalTimingStatus(fest, refDate);
    if (status === "today") {
      activeToday.push(fest);
    } else if (status === "eve") {
      eveList.push(fest);
    } else if (status === "upcoming") {
      upcomingList.push(fest);
    }
  }

  // Sort upcoming by closest date
  upcomingList.sort((a, b) => {
    const diffA = new Date(`${a.startDate}T00:00:00`).getTime();
    const diffB = new Date(`${b.startDate}T00:00:00`).getTime();
    return diffA - diffB;
  });

  // Hierarchy: Today > Eve > Next Upcoming
  if (activeToday.length > 0) {
    const { daysUntil } = getFestivalTimingStatus(activeToday[0], refDate);
    return {
      primaryFestival: activeToday[0],
      status: "today",
      daysUntil,
      activeTodayFestivals: activeToday,
      eveFestivals: eveList,
      upcomingFestivals: upcomingList
    };
  }

  if (eveList.length > 0) {
    const { daysUntil } = getFestivalTimingStatus(eveList[0], refDate);
    return {
      primaryFestival: eveList[0],
      status: "eve",
      daysUntil,
      activeTodayFestivals: activeToday,
      eveFestivals: eveList,
      upcomingFestivals: upcomingList
    };
  }

  if (upcomingList.length > 0) {
    const { daysUntil } = getFestivalTimingStatus(upcomingList[0], refDate);
    return {
      primaryFestival: upcomingList[0],
      status: "upcoming",
      daysUntil,
      activeTodayFestivals: activeToday,
      eveFestivals: eveList,
      upcomingFestivals: upcomingList
    };
  }

  // Fallback to first festival in list
  const fallback = ALL_SACRED_FESTIVALS[0];
  const { status, daysUntil } = getFestivalTimingStatus(fallback, refDate);
  return {
    primaryFestival: fallback,
    status,
    daysUntil,
    activeTodayFestivals: [],
    eveFestivals: [],
    upcomingFestivals: []
  };
}
