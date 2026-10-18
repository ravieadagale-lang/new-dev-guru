export interface CategoryInsight {
  text: string;
  textHi: string;
  score: number; // 0 to 100
}

export interface DailyHoroscopeData {
  rashi: string;
  rashiHi: string;
  symbol: string;
  rulingPlanet: string;
  rulingPlanetHi: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  elementHi: string;
  overallScore: number; // 0 to 100
  mood: string;
  moodHi: string;
  summary: string;
  summaryHi: string;
  career: CategoryInsight;
  finance: CategoryInsight;
  love: CategoryInsight;
  health: CategoryInsight;
  luckyColor: string;
  luckyColorHi: string;
  luckyNumber: number;
  luckyDirection: string;
  luckyTime: string;
  remedy: string;
  remedyHi: string;
}

export const RASHI_DETAILS = [
  { name: "Aries", nameHi: "मेष", symbol: "♈ Ram", planet: "Mars", planetHi: "मंगल", element: "Fire" as const, elementHi: "अग्नि" },
  { name: "Taurus", nameHi: "वृषभ", symbol: "♉ Bull", planet: "Venus", planetHi: "शुक्र", element: "Earth" as const, elementHi: "पृथ्वी" },
  { name: "Gemini", nameHi: "मिथुन", symbol: "♊ Twins", planet: "Mercury", planetHi: "बुध", element: "Air" as const, elementHi: "वायु" },
  { name: "Cancer", nameHi: "कर्क", symbol: "♋ Crab", planet: "Moon", planetHi: "चंद्र", element: "Water" as const, elementHi: "जल" },
  { name: "Leo", nameHi: "सिंह", symbol: "♌ Lion", planet: "Sun", planetHi: "सूर्य", element: "Fire" as const, elementHi: "अग्नि" },
  { name: "Virgo", nameHi: "कन्या", symbol: "♍ Maiden", planet: "Mercury", planetHi: "बुध", element: "Earth" as const, elementHi: "पृथ्वी" },
  { name: "Libra", nameHi: "तुला", symbol: "♎ Scales", planet: "Venus", planetHi: "शुक्र", element: "Air" as const, elementHi: "वायु" },
  { name: "Scorpio", nameHi: "वृश्चिक", symbol: "♏ Scorpion", planet: "Mars", planetHi: "मंगल", element: "Water" as const, elementHi: "जल" },
  { name: "Sagittarius", nameHi: "धनु", symbol: "♐ Archer", planet: "Jupiter", planetHi: "गुरु", element: "Fire" as const, elementHi: "अग्नि" },
  { name: "Capricorn", nameHi: "मकर", symbol: "♑ Sea-Goat", planet: "Saturn", planetHi: "शनि", element: "Earth" as const, elementHi: "पृथ्वी" },
  { name: "Aquarius", nameHi: "कुंभ", symbol: "♒ Water-Bearer", planet: "Saturn", planetHi: "शनि", element: "Air" as const, elementHi: "वायु" },
  { name: "Pisces", nameHi: "मीन", symbol: "♓ Fish", planet: "Jupiter", planetHi: "गुरु", element: "Water" as const, elementHi: "जल" }
];

// Simple deterministic pseudo-random generator based on seed
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

const CAREER_TEMPLATES = [
  {
    en: "New professional opportunities arise today. Mars and Jupiter align favorably for leadership decisions.",
    hi: "आज कार्यक्षेत्र में नए अवसर प्राप्त होंगे। नेतृत्व निर्णयों के लिए मंगल और गुरु का अनुकूल योग बन रहा है।",
    baseScore: 88
  },
  {
    en: "Stay focused on deadline-driven projects. Your analytical skills will be appreciated by seniors.",
    hi: "कार्यों को समय पर पूरा करने पर ध्यान केंद्रित करें। आपकी विश्लेषणात्मक क्षमता की वरिष्ठों द्वारा प्रशंसा होगी।",
    baseScore: 82
  },
  {
    en: "Creative breakthroughs and strategic collaboration bring high productivity during the afternoon hours.",
    hi: "अपरान्ह समय में रचनात्मक सफलता और रणनीतिक सहयोग से कार्यकुशलता में अभूतपूर्व वृद्धि होगी।",
    baseScore: 91
  },
  {
    en: "Patience is key at work today. Avoid hasty business arguments and verify all contract details.",
    hi: "कार्यस्थल पर धैर्य बनाए रखें। जल्दबाजी में बहस से बचें और अनुबंधों के सभी दस्तावेजों की जांच करें।",
    baseScore: 75
  }
];

const FINANCE_TEMPLATES = [
  {
    en: "Strong monetary gains expected through past investments or unexpected bonuses.",
    hi: "पुराने निवेश या अप्रत्याशित लाभ से आर्थिक स्थिति मजबूत होगी।",
    baseScore: 90
  },
  {
    en: "Balanced financial day. A good time to plan long-term budget savings and reduce discretionary spend.",
    hi: "संतुलित वित्तीय दिन। दीर्घकालिक बचत योजना बनाने और अनावश्यक खर्चों पर नियंत्रण का समय है।",
    baseScore: 80
  },
  {
    en: "Favorable conditions for business expansion, gold purchases, or real-estate research.",
    hi: "व्यापार विस्तार, स्वर्ण क्रय या भूमि-भवन संबंधी शोध के लिए अनुकूल योग।",
    baseScore: 86
  },
  {
    en: "Exercise caution in speculative markets today. Stick to steady assets and secure liquidity.",
    hi: "शेयर बाजार व सट्टेबाजी में सावधानी बरतें। सुरक्षित संपत्तियों और बचत पर ध्यान दें।",
    baseScore: 72
  }
];

const LOVE_TEMPLATES = [
  {
    en: "Harmony and warmth radiate in personal relationships. A romantic evening rejuvenates emotional bonds.",
    hi: "व्यक्तिगत संबंधों में मधुरता रहेगी। शाम का समय जीवनसाथी के साथ संवाद और प्रेम को मजबूत करेगा।",
    baseScore: 94
  },
  {
    en: "Open communication clears minor misunderstandings. Practice active listening with loved ones.",
    hi: "पारदर्शी बातचीत से पुरानी गलतफहमियां दूर होंगी। अपनों की भावनाओं का सम्मान करें।",
    baseScore: 84
  },
  {
    en: "Singles may meet someone intriguing through social circles or family gatherings.",
    hi: "अविवाहित जातकों को सामाजिक या पारिवारिक समारोह में कोई विशेष व्यक्ति मिल सकता है।",
    baseScore: 88
  },
  {
    en: "Give space to your partner and focus on emotional stability and mutual trust.",
    hi: "साथी को पर्याप्त समय और व्यक्तिगत स्थान दें। भावनात्मक संतुलन और आपसी विश्वास पर बल दें।",
    baseScore: 78
  }
];

const HEALTH_TEMPLATES = [
  {
    en: "Vitality and physical stamina are high. Ideal day for outdoor activities, yoga, and meditation.",
    hi: "शारीरिक ऊर्जा और रोग प्रतिरोधक क्षमता उत्तम है। योग, प्राणायाम और ध्यान के लिए उत्कृष्ट दिन।",
    baseScore: 92
  },
  {
    en: "Maintain hydration and balanced nutrition. Avoid heavy night meals to ensure restful sleep.",
    hi: "पर्याप्त जल का सेवन करें और संतुलित आहार लें। रात्रि में हल्का भोजन करें।",
    baseScore: 81
  },
  {
    en: "Mental peace improves through spiritual reflection. Take short breaks during intense work sessions.",
    hi: "आध्यात्मिक चिंतन से मानसिक शांति प्राप्त होगी। कार्य के बीच में छोटे विश्राम लें।",
    baseScore: 85
  },
  {
    en: "Minor eye strain or joint stiffness possible. Morning stretching and warm tea will benefit.",
    hi: "हल्की सुस्ती या थकान महसूस हो सकती है। सुबह स्ट्रेचिंग और हर्बल चाय लाभकारी रहेगी।",
    baseScore: 76
  }
];

const LUCKY_COLORS = [
  { en: "Saffron Gold", hi: "केसरिया स्वर्ण" },
  { en: "Royal Blue", hi: "रॉयल ब्लू" },
  { en: "Emerald Green", hi: "पन्ना हरा" },
  { en: "Ruby Red", hi: "माणिक्य लाल" },
  { en: "Pearl White", hi: "मोती सफेद" },
  { en: "Coral Orange", hi: "मूंगा नारंगी" }
];

const LUCKY_DIRECTIONS = [
  "North-East (ईशान)", "East (पूर्व)", "North (उत्तर)", "South-East (आग्नेय)", "West (पश्चिम)"
];

const REMEDIES = [
  {
    en: "Offer clean water with red flowers to Sun God in the morning and chant 'Om Suryaya Namah'.",
    hi: "प्रातःकाल सूर्य देव को जल में रोली व लाल पुष्प डालकर अर्घ्य दें एवं 'ॐ सूर्याय नमः' का जाप करें।"
  },
  {
    en: "Light a ghee lamp before Lord Vishnu or Goddess Lakshmi and recite Kanakdhara Stotram.",
    hi: "श्रीहरि विष्णु या महालक्ष्मी के समक्ष शुद्ध घी का दीपक जलाएं और कनकधारा स्तोत्र का पाठ करें।"
  },
  {
    en: "Feed green spinach or jaggery to a cow and offer Durva grass to Lord Ganesha.",
    hi: "गौ माता को हरा चारा या गुड़-रोटी खिलाएं और श्री गणेश जी को दुर्वा अर्पित करें।"
  },
  {
    en: "Chant 'Om Namah Shivaya' 108 times and apply sandalwood tilak on the forehead.",
    hi: "शिवलिंग पर जलाभिषेक करें, 'ॐ नमः शिवाय' का १०८ बार जाप करें और मस्तक पर चंदन तिलक लगाएं।"
  }
];

export function getDailyHoroscopeForRashi(rashiName: string, dateInput?: Date | string): DailyHoroscopeData {
  const targetDate = dateInput ? (typeof dateInput === "string" ? new Date(dateInput) : dateInput) : new Date();
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDate();

  const rashiObj = RASHI_DETAILS.find(
    (r) => r.name.toLowerCase() === rashiName.toLowerCase() || r.nameHi === rashiName
  ) || RASHI_DETAILS[0];

  const rashiIndex = RASHI_DETAILS.indexOf(rashiObj);
  const dateSeed = year * 10000 + month * 100 + day + rashiIndex * 17;

  const r1 = seededRandom(dateSeed);
  const r2 = seededRandom(dateSeed + 1);
  const r3 = seededRandom(dateSeed + 2);
  const r4 = seededRandom(dateSeed + 3);
  const r5 = seededRandom(dateSeed + 4);

  const careerIdx = Math.floor(r1 * CAREER_TEMPLATES.length);
  const financeIdx = Math.floor(r2 * FINANCE_TEMPLATES.length);
  const loveIdx = Math.floor(r3 * LOVE_TEMPLATES.length);
  const healthIdx = Math.floor(r4 * HEALTH_TEMPLATES.length);

  const careerTpl = CAREER_TEMPLATES[careerIdx];
  const financeTpl = FINANCE_TEMPLATES[financeIdx];
  const loveTpl = LOVE_TEMPLATES[loveIdx];
  const healthTpl = HEALTH_TEMPLATES[healthIdx];

  const cScore = Math.min(99, Math.max(65, careerTpl.baseScore + Math.floor((r1 - 0.5) * 10)));
  const fScore = Math.min(99, Math.max(65, financeTpl.baseScore + Math.floor((r2 - 0.5) * 10)));
  const lScore = Math.min(99, Math.max(65, loveTpl.baseScore + Math.floor((r3 - 0.5) * 10)));
  const hScore = Math.min(99, Math.max(65, healthTpl.baseScore + Math.floor((r4 - 0.5) * 10)));

  const overallScore = Math.round((cScore + fScore + lScore + hScore) / 4);

  const colorObj = LUCKY_COLORS[Math.floor(r5 * LUCKY_COLORS.length)];
  const luckyNumber = Math.floor(seededRandom(dateSeed + 5) * 9) + 1;
  const direction = LUCKY_DIRECTIONS[Math.floor(seededRandom(dateSeed + 6) * LUCKY_DIRECTIONS.length)];
  const remedyObj = REMEDIES[Math.floor(seededRandom(dateSeed + 7) * REMEDIES.length)];

  const moods = [
    { en: "High Momentum & Optimism", hi: "उच्च उत्साह और सकारात्मकता" },
    { en: "Focused & Strategic", hi: "एकाग्र और रणनीतिक" },
    { en: "Calm & Reflective", hi: "शांत और आध्यात्मिक" },
    { en: "Creative & Expressive", hi: "रचनात्मक और गतिशील" }
  ];
  const moodObj = moods[Math.floor(seededRandom(dateSeed + 8) * moods.length)];

  // Formulate rich daily summary
  const summaryEn = `Today brings a powerful cosmic rhythm for ${rashiObj.name} natives. With ruling planet ${rashiObj.planet} offering vital support, your overall day index is ${overallScore}%. ${careerTpl.en} ${financeTpl.en}`;
  const summaryHi = `आज ${rashiObj.nameHi} (${rashiObj.name}) राशि के जातकों के लिए एक ऊर्जावान और शुभ दिन है। आपके स्वामी ग्रह ${rashiObj.planetHi} का अनुकूल प्रभाव आपकी सफलता दर ${overallScore}% तक बढ़ाता है। ${careerTpl.hi} ${financeTpl.hi}`;

  const startHour = 8 + Math.floor(seededRandom(dateSeed + 9) * 4);
  const luckyTime = `${startHour}:00 AM - ${startHour + 2}:30 PM`;

  return {
    rashi: rashiObj.name,
    rashiHi: rashiObj.nameHi,
    symbol: rashiObj.symbol,
    rulingPlanet: rashiObj.planet,
    rulingPlanetHi: rashiObj.planetHi,
    element: rashiObj.element,
    elementHi: rashiObj.elementHi,
    overallScore,
    mood: moodObj.en,
    moodHi: moodObj.hi,
    summary: summaryEn,
    summaryHi: summaryHi,
    career: {
      text: careerTpl.en,
      textHi: careerTpl.hi,
      score: cScore
    },
    finance: {
      text: financeTpl.en,
      textHi: financeTpl.hi,
      score: fScore
    },
    love: {
      text: loveTpl.en,
      textHi: loveTpl.hi,
      score: lScore
    },
    health: {
      text: healthTpl.en,
      textHi: healthTpl.hi,
      score: hScore
    },
    luckyColor: colorObj.en,
    luckyColorHi: colorObj.hi,
    luckyNumber,
    luckyDirection: direction,
    luckyTime,
    remedy: remedyObj.en,
    remedyHi: remedyObj.hi
  };
}
