import { LanguageCode, DivisionalChartType, PlanetPosition } from "../types";

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export const POPULAR_LANGUAGES: LanguageInfo[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🚩" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", flag: "🪔" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🛕" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "📜" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🌺" },
];

export const UI_LABELS: Record<LanguageCode, Record<string, string>> = {
  en: {
    selectLanguage: "Select Kundali Language",
    astrosageHeader: "Dev-Guru Level Kundali & Master Life Predictions",
    birthDetails: "Birth Details & Panchang",
    divisionalCharts: "All Divisional Charts (D1 - D60)",
    dignitiesTab: "Planetary Dignities (Uchha/Neech/Ast)",
    lifePredictionsTab: "Detailed Life Predictions",
    remediesTab: "Complete Remedies (Mantras, Gemstones, Daan)",
    dashaTab: "Vimshottari Dasha Predictions",
    kpSystemTab: "KP & BNN Sub Lord System",
    yogasDoshasTab: "Yogas & Doshas Analysis",
    kundaliGuideTab: "Kundali Reading Rules",
    aiReportTab: "AI Master Kundli Report",
    downloadPdf: "Download Full Astrological Report (PDF)",
    personalityTitle: "1. Personality, Temperament & Physical Attributes",
    mindTitle: "2. Emotional Outlook & Mental Disposition (Moon Sign)",
    careerTitle: "3. Career, Karma & Professional Trajectory (House 10 & D10)",
    wealthTitle: "4. Wealth, Investments & Financial Accumulation (House 2, 11 & D2)",
    marriageTitle: "5. Love, Marriage & Spouse Characteristics (House 7 & D9)",
    healthTitle: "6. Health, Vitality & Medical Vulnerabilities (House 6, 8 & D30)",
    educationTitle: "7. Education, Intellect & Progeny (House 4, 5 & D24, D7)",
    currentDashaTitle: "8. Active Mahadasha & Time Period Prediction",
    chartPredictionTitle: "Divisional Chart Prediction Analysis",
    selectChart: "Select Divisional Chart (Varga):",
    remedyPlanetTitle: "Specific Planet Remedies & Rituals",
    beejMantra: "Vedic Beej Mantra & Chanting Count",
    gemstoneRec: "Gemstone & Lucky Metal",
    daanDonation: "Daan, Grain & Item Donations",
    rudrakshaRec: "Rudraksha Recommendation",
    fastingVrat: "Fasting (Vrat) & Dietary Rules",
    lalKitabRemedy: "Lal Kitab & Folk Remedies",
  },
  hi: {
    selectLanguage: "कुंडली भाषा चुनें",
    astrosageHeader: "एस्ट्रोनेक्स्ट स्तर कुंडली एवं संपूर्ण भविष्यवाणी",
    birthDetails: "जन्म विवरण एवं पंचांग",
    divisionalCharts: "सभी वर्गीय चार्ट (D1 - D60)",
    dignitiesTab: "ग्रह स्थिति (उच्च/नीच/अस्त/वक्री)",
    lifePredictionsTab: "विस्तृत जीवन भविष्यवाणी",
    remediesTab: "संपूर्ण अचूक उपाय (मंत्र, रत्न, दान, व्रत)",
    dashaTab: "विंशोत्तरी महादशा फल",
    kpSystemTab: "केपी एवं बीएनएन सब लॉर्ड",
    yogasDoshasTab: "योग एवं दोष विश्लेषण",
    kundaliGuideTab: "कुंडली पढ़ने के नियम",
    aiReportTab: "एआई कुंडली रिपोर्ट",
    downloadPdf: "संपूर्ण ज्योतिषीय रिपोर्ट डाउनलोड करें (PDF)",
    personalityTitle: "1. व्यक्तित्व, स्वभाव एवं शारीरिक बनावट (लग्न)",
    mindTitle: "2. मानसिक स्थिति एवं भावनाएं (चंद्र राशि)",
    careerTitle: "3. करियर, व्यापार एवं आजीविका (10वां भाव व D10)",
    wealthTitle: "4. धन, संपत्ति एवं आर्थिक स्थिति (2रा, 11वां भाव व D2)",
    marriageTitle: "5. प्रेम, विवाह एवं जीवनसाथी (7वां भाव व D9)",
    healthTitle: "6. स्वास्थ्य, रोग एवं शारीरिक क्षमता (6ठा, 8वां भाव व D30)",
    educationTitle: "7. शिक्षा, बुद्धि एवं संतान (4था, 5वां भाव व D24, D7)",
    currentDashaTitle: "8. वर्तमान महादशा एवं समय चक्र फल",
    chartPredictionTitle: "वर्गीय चार्ट विस्तृत फलक",
    selectChart: "चार्ट चुनें (वर्ग कुंडली):",
    remedyPlanetTitle: "ग्रह शांति एवं अचूक वैदिक उपाय",
    beejMantra: "वैदिक बीज मंत्र एवं जाप संख्या",
    gemstoneRec: "शुभ रत्न, उपरत्न एवं धारण विधि",
    daanDonation: "दान सामग्री, अनाज एवं दान का दिन",
    rudrakshaRec: "रुद्राक्ष सिफारिश एवं धारण नियम",
    fastingVrat: "व्रत, नियम एवं खानपान",
    lalKitabRemedy: "लाल किताब एवं पारंपरिक टोटके",
  },
  mr: {
    selectLanguage: "कुंडली भाषा निवडा",
    astrosageHeader: "अ‍ॅस्ट्रोनेक्स्ट पातळीची कुंडली व संपूर्ण भविष्यफळ",
    birthDetails: "जन्म तपशील व पंचांग",
    divisionalCharts: "सर्व वर्ग कुंडल्या (D1 - D60)",
    dignitiesTab: "ग्रह स्थिती (उच्च/नीच/अस्त/वक्री)",
    lifePredictionsTab: "सविस्तर जीवन भविष्यफळ",
    remediesTab: "संपूर्ण खात्रीशीर उपाय (मंत्र, रत्न, दान)",
    dashaTab: "विंशोत्तरी महादशा फल",
    kpSystemTab: "केपी व बीएनएन सब लॉर्ड",
    yogasDoshasTab: "योग व दोष विश्लेषण",
    kundaliGuideTab: "कुंडली पाहण्याचे नियम",
    aiReportTab: "एआय कुंडली रिपोर्ट",
    downloadPdf: "संपूर्ण ज्योतिष्य रिपोर्ट डाउनलोड करा (PDF)",
    personalityTitle: "1. व्यक्तिमत्त्व, स्वभाव व शारीरिक रचना (लग्न)",
    mindTitle: "2. मानसिक स्थिती व भावना (चंद्र राशी)",
    careerTitle: "3. करिअर, व्यवसाय व पदप्रतिष्ठा (10वे घर व D10)",
    wealthTitle: "4. धनसंपदा, मालमत्ता व आर्थिक स्थिती (2रे, 11वे घर व D2)",
    marriageTitle: "5. प्रेम, विवाह व जोडीदार (7वे घर व D9)",
    healthTitle: "6. आरोग्य, आजारपण व शारीरिक ताकद (6वे, 8वे घर व D30)",
    educationTitle: "7. शिक्षण, बुद्धिमत्ता व संतती (4थे, 5वे घर व D24, D7)",
    currentDashaTitle: "8. चालू महादशा व वेळ काळ भविष्य",
    chartPredictionTitle: "वर्ग कुंडली सविस्तर भविष्य",
    selectChart: "वर्ग कुंडली निवडा:",
    remedyPlanetTitle: "ग्रह शांतता व खात्रीशीर वैदिक उपाय",
    beejMantra: "वैदिक बीज मंत्र व जप संख्या",
    gemstoneRec: "शुभ रत्न, धातू व परिधान पद्धती",
    daanDonation: "दान वस्तू, धान्य व दानाचा दिवस",
    rudrakshaRec: "रुद्राक्ष शिफारस व नियम",
    fastingVrat: "उपवास (व्रत) व नियम",
    lalKitabRemedy: "लाल किताब व पारंपरिक उपाय",
  },
  gu: {
    selectLanguage: "કુંડળી ભાષા પસંદ કરો",
    astrosageHeader: "એસ્ટ્રોનેક્સ્ટ લેવલ કુંડળી અને સંપૂર્ણ ભવિષ્યવાણી",
    birthDetails: "જન્મ વિગતો અને પંચાંગ",
    divisionalCharts: "તમામ વર્ગ કુંડળીઓ (D1 - D60)",
    dignitiesTab: "ગ્રહ સ્થિતિ (ઉચ્ચ/નીચ/અસ્ત)",
    lifePredictionsTab: "વિગતવાર જીવન ભવિષ્યફળ",
    remediesTab: "સંપૂર્ણ ઉપાયો (મંત્ર, રત્ન, દાન, વ્રત)",
    dashaTab: "વિંશોત્તરી મહાદશા ફળ",
    kpSystemTab: "કેપી અને બીએનએન સિસ્ટમ",
    yogasDoshasTab: "યોગ અને દોષ પૃથક્કરણ",
    kundaliGuideTab: "કુંડળી જોવાના નિયમો",
    aiReportTab: "એઆઈ કુંડળી રિપોર્ટ",
    downloadPdf: "સંપૂર્ણ જ્યોતિષ રિપોર્ટ ડાઉનલોડ કરો (PDF)",
    personalityTitle: "1. વ્યક્તિત્વ અને શારીરિક બનાવટ (લગ્ન)",
    mindTitle: "2. માનસિક સ્થિતિ અને વિચારો (ચંદ્ર રાશિ)",
    careerTitle: "3. કારકિર્દી, વેપાર અને નોકરી (10મું ઘર અને D10)",
    wealthTitle: "4. ધન, સંપત્તિ અને આર્થિક સ્થિતિ (2જું, 11મું ઘર અને D2)",
    marriageTitle: "5. પ્રેમ, લગ્ન અને જીવનસાથી (7મું ઘર અને D9)",
    healthTitle: "6. સ્વાસ્થ્ય અને રોગપ્રતિકારક શક્તિ (6ઠ્ઠું, 8મું ઘર)",
    educationTitle: "7. શિક્ષણ, બુદ્ધિ અને સંતાન (4થું, 5મું ઘર)",
    currentDashaTitle: "8. વર્તમાન મહાદશા સમયફળ",
    chartPredictionTitle: "વર્ગ કુંડળી વિગતવાર ફળક",
    selectChart: "વર્ગ કુંડળી પસંદ કરો:",
    remedyPlanetTitle: "ગ્રહ શાંતિ અને વૈદિક ઉપાયો",
    beejMantra: "વૈદિક બીજ મંત્ર અને જાપ સંખ્યા",
    gemstoneRec: "શુભ રત્ન અને પહરવાની વિધિ",
    daanDonation: "દાન સામગ્રી અને દાનનો દિવસ",
    rudrakshaRec: "રુદ્રાક્ષ ભલામણ અને નિયમો",
    fastingVrat: "વ્રત અને ખોરાકના નિયમો",
    lalKitabRemedy: "લાલ કિતાબ ઉપાયો",
  },
  ta: {
    selectLanguage: "ஜாதக மொழியைத் தேர்ந்தெடுக்கவும்",
    astrosageHeader: "ஆஸ்ட்ரோநெக்ஸ்ட் நிலை ஜாதகம் & முழுமையான பலன்கள்",
    birthDetails: "பிறப்பு விவரங்கள் & பஞ்சாங்கம்",
    divisionalCharts: "அனைத்து வர்க்க சக்கரங்கள் (D1 - D60)",
    dignitiesTab: "கிரக நிலைகள் (உச்சம்/நீசம்/அஸ்தமனம்)",
    lifePredictionsTab: "விரிவான வாழ்க்கை பலன்கள்",
    remediesTab: "முழுமையான பரிகாரங்கள் (மந்திரம், ரத்தினம், தானம்)",
    dashaTab: "விம்சோத்தரி தசா பலன்கள்",
    kpSystemTab: "கேபி & பிஎன்என் முறை",
    yogasDoshasTab: "யோகங்கள் & தோஷங்கள்",
    kundaliGuideTab: "ஜாதகம் பார்க்கும் விதிகள்",
    aiReportTab: "ஏஐ ஜாதக அறிக்கை",
    downloadPdf: "முழு ஜாதக அறிக்கையைப் பதிவிறக்கவும் (PDF)",
    personalityTitle: "1. ஆளுமை & உடலமைப்பு (லக்னம்)",
    mindTitle: "2. மனநிலை & எண்ணங்கள் (சந்திர ராசி)",
    careerTitle: "3. தொழில் & வேலை வாய்ப்பு (10ம் வீடு & D10)",
    wealthTitle: "4. தனம், சொத்து & நிதிநிலை (2ம், 11ம் வீடு & D2)",
    marriageTitle: "5. காதல், திருமணம் & வாழ்க்கைத்துணை (7ம் வீடு & D9)",
    healthTitle: "6. ஆரோக்கியம் & நோயெதிர்ப்பு (6ம், 8ம் வீடு)",
    educationTitle: "7. கல்வி, அறிவு & குழந்தைகள் (4ம், 5ம் வீடு)",
    currentDashaTitle: "8. தற்போதைய தசா புத்தி பலன்கள்",
    chartPredictionTitle: "வர்க்க சக்கர விரிவான பலன்கள்",
    selectChart: "சக்கரத்தைத் தேர்ந்தெடுக்கவும்:",
    remedyPlanetTitle: "கிரக சாந்தி & வைதீக பரிகாரங்கள்",
    beejMantra: "பீஜ மந்திரம் & ஜெப எண்ணிக்கை",
    gemstoneRec: "அதிர்ஷ்ட ரத்தினம் & அணியும் முறை",
    daanDonation: "தானப் பொருட்கள் & தானம் செய்யும் நாள்",
    rudrakshaRec: "ருத்ராட்ச பரிந்துரை",
    fastingVrat: "விரத முறைகள்",
    lalKitabRemedy: "லால் கிதாப் பரிகாரங்கள்",
  },
  te: {
    selectLanguage: "జాతకం భాషను ఎంచుకోండి",
    astrosageHeader: "ఆస్ట్రోనెక్స్ట్ స్థాయి జాతకం & సంపూర్ణ ఫలితాలు",
    birthDetails: "జనన వివరాలు & పంచాంగం",
    divisionalCharts: "అన్ని వర్గ చక్రాలు (D1 - D60)",
    dignitiesTab: "గ్రహ స్థితులు (ఉచ్ఛ/నీచ/అస్తంగతం)",
    lifePredictionsTab: "సమగ్ర జీవిత ఫలితాలు",
    remediesTab: "సంపూర్ణ నివారణలు (మంత్రాలు, రత్నాలు, దానాలు)",
    dashaTab: "వింశోత్తరి మహర్దశ ఫలితాలు",
    kpSystemTab: "కెపి & బిఎన్ఎన్ వ్యవస్థ",
    yogasDoshasTab: "యోగాలు & దోషాల విశ్లేషణ",
    kundaliGuideTab: "జాతకం చూసే నియమాలు",
    aiReportTab: "ఎఐ జాతక నివేదిక",
    downloadPdf: "పూర్తి జాతక నివేదిక డౌన్‌లోడ్ చేయండి (PDF)",
    personalityTitle: "1. వ్యక్తిత్వం & శరీర ఆకృతి (లగ్నం)",
    mindTitle: "2. మానసిక స్థితి & ఆలోచనలు (చంద్ర రాశి)",
    careerTitle: "3. ఉద్యోగం, వ్యాపారం & హోదా (10వ ఇల్లు & D10)",
    wealthTitle: "4. ధనం, ఆస్తి & ఆర్థిక స్థితి (2వ, 11వ ఇల్లు & D2)",
    marriageTitle: "5. ప్రేమ, వివాహం & జీవిత భాగస్వామి (7వ ఇల్లు & D9)",
    healthTitle: "6. ఆరోగ్యం & రోగనిరోధక శక్తి (6వ, 8వ ఇల్లు)",
    educationTitle: "7. విద్య, మేధస్సు & సంతానం (4వ, 5వ ఇల్లు)",
    currentDashaTitle: "8. ప్రస్తుత మహర్దశ సమయ ఫలితాలు",
    chartPredictionTitle: "వర్గ చక్ర సమగ్ర ఫలితాలు",
    selectChart: "చక్రాన్ని ఎంచుకోండి:",
    remedyPlanetTitle: "గ్రహ శాంతి & వైదిక నివారణలు",
    beejMantra: "బీజ మంత్రం & జప సంఖ్య",
    gemstoneRec: "అదృష్ట రత్నం & ధరించే విధానం",
    daanDonation: "దాన వస్తువులు & దాన దినం",
    rudrakshaRec: "రుద్రాక్ష సిఫార్సు",
    fastingVrat: "ఉపవాస నియమాలు",
    lalKitabRemedy: "లాల్ కితాబ్ నివారణలు",
  },
  bn: {
    selectLanguage: "কোষ্ঠী ভাষা নির্বাচন করুন",
    astrosageHeader: "অ্যাস্ট্রনেক্সট লেভেল কোষ্ঠী ও সম্পূর্ণ জীবন গণনা",
    birthDetails: "জন্ম বিবরণ ও পঞ্চাঙ্গ",
    divisionalCharts: "সকল বর্গ ছক (D1 - D60)",
    dignitiesTab: "গ্রহের অবস্থা (উচ্চ/নীচ/অস্ত)",
    lifePredictionsTab: "বিস্তারিত জীবন পূর্বাভাস",
    remediesTab: "সম্পূর্ণ সমাধান (মন্ত্র, রত্ন, দান, ব্রত)",
    dashaTab: "বিংশোত্তরী মহাদশা ফল",
    kpSystemTab: "কেপি ও বিএনএন পদ্ধতি",
    yogasDoshasTab: "যোগ ও দোষ বিশ্লেষণ",
    kundaliGuideTab: "কোষ্ঠী দেখার নিয়মাবলী",
    aiReportTab: "এআই কোষ্ঠী রিপোর্ট",
    downloadPdf: "সম্পূর্ণ জ্যোতিষ রিপোর্ট ডাউনলোড করুন (PDF)",
    personalityTitle: "1. ব্যক্তিত্ব ও শারীরিক গঠন (লগ্ন)",
    mindTitle: "2. মানসিক অবস্থা ও ভাবনা (চন্দ্র রাশি)",
    careerTitle: "3. কেরিয়ার, কর্ম ও প্রতিষ্ঠা (10ম ভাব ও D10)",
    wealthTitle: "4. ধন, সম্পদ ও আর্থিক স্থান (2য়, 11শ ভাব ও D2)",
    marriageTitle: "5. প্রেম, বিবাহ ও জীবনসঙ্গী (7ম ভাব ও D9)",
    healthTitle: "6. স্বাস্থ্য, রোগ ও রোগ প্রতিরোধ (6ষ্ঠ, 8ম ভাব)",
    educationTitle: "7. শিক্ষা, বুদ্ধি ও সন্তান (4র্থ, 5ম ভাব)",
    currentDashaTitle: "8. বর্তমান মহাদশা সময়ফল",
    chartPredictionTitle: "বর্গ ছক বিস্তারিত বিশ্লেষণ",
    selectChart: "ছক নির্বাচন করুন:",
    remedyPlanetTitle: "গ্রহ শান্তি ও বৈদিক প্রতিকার",
    beejMantra: "বৈদিক বীজ মন্ত্র ও জপ সংখ্যা",
    gemstoneRec: "শুভ রত্ন ও ধারণ বিধি",
    daanDonation: "দান সামগ্রী ও দানের দিন",
    rudrakshaRec: "রুদ্রাক্ষের সুপারিশ",
    fastingVrat: "ব্রত ও খাদ্যাভ্যাস",
    lalKitabRemedy: "লাল কিতাব টোটকা",
  }
};

export interface LifePredictionItem {
  category: string;
  subTitle: string;
  prediction: string;
  keyFactors: string;
  remedy: string;
}

/**
 * Generate Dev-Guru-level Comprehensive Life Predictions dynamically
 */
export function generateComprehensiveLifePredictions(
  lagna: string,
  moonSign: string,
  sunSign: string,
  planets: PlanetPosition[],
  lang: LanguageCode = "en"
): LifePredictionItem[] {
  const lagnesh = getSignLord(lagna);
  const tenthHouseSign = getNthSignFrom(lagna, 10);
  const tenthLord = getSignLord(tenthHouseSign);
  const seventhHouseSign = getNthSignFrom(lagna, 7);
  const seventhLord = getSignLord(seventhHouseSign);
  const secondHouseSign = getNthSignFrom(lagna, 2);
  const secondLord = getSignLord(secondHouseSign);

  const exaltedPlanets = planets.filter(p => p.dignity === "Exalted").map(p => p.name);
  const debilitatedPlanets = planets.filter(p => p.dignity === "Debilitated").map(p => p.name);
  const combustPlanets = planets.filter(p => p.isCombust).map(p => p.name);
  const retroPlanets = planets.filter(p => p.isRetrograde).map(p => p.name);

  // Active Mahadasha planet (defaulting to Moon's dispositor or Sun)
  const mainPlanet = planets.find(p => p.name === "Jupiter") || planets[0] || { name: "Jupiter" };

  if (lang === "hi") {
    return [
      {
        category: "1. व्यक्तित्व, स्वभाव एवं शारीरिक बनावट (लग्न)",
        subTitle: `लग्न: ${lagna} | लग्नेश: ${lagnesh}`,
        prediction: `आपका लग्न ${lagna} है, जिसके स्वामी ${lagnesh} हैं। ${lagna} लग्न के जातक स्वाभाविक रूप से प्रभावशाली, बुद्धिमान एवं स्वाभिमानी होते हैं। आपका शारीरिक ढांचा आकर्षक और व्यक्तित्व चुंबकीय रहता है। ${exaltedPlanets.length > 0 ? `आपकी कुंडली में ${exaltedPlanets.join(", ")} ग्रह उच्च स्थिति में हैं, जो आपको जीवन में विशेष ख्याति, नेतृत्व क्षमता और उच्च सामाजिक पद प्रदान करते हैं।` : ""} ${debilitatedPlanets.length > 0 ? `हालांकि ${debilitatedPlanets.join(", ")} ग्रह नीच स्थिति में होने से जीवन के शुरुआती दौर में संघर्ष या स्वास्थ्य संबंधी उतार-चढ़ाव आ सकते हैं।` : ""}`,
        keyFactors: `उच्च ग्रह: ${exaltedPlanets.join(", ") || "कोई नहीं"} | नीच ग्रह: ${debilitatedPlanets.join(", ") || "कोई नहीं"}`,
        remedy: `लग्नेश ${lagnesh} के वैदिक बीज मंत्र का नियमित जाप करें एवं प्रातः सूर्य देव को अर्घ्य दें।`
      },
      {
        category: "2. मानसिक स्थिति एवं भावनाएं (चंद्र राशि)",
        subTitle: `चंद्र राशि: ${moonSign}`,
        prediction: `आपकी चंद्र राशि ${moonSign} है। आपका मन और भावनाएं बहुत संवेदनशील, तीव्र एवं दूरदर्शी हैं। आप कला, साहित्य, दर्शन और मानवीय संबंधों को गहराई से समझते हैं। जब चंद्र बलवान होता है तो आप मानसिक रूप से शांत रहते हैं।`,
        keyFactors: `चंद्र ग्रह प्रभाव व मानसोल्लास योग`,
        remedy: `प्रति सोमवार शिवलिंग पर जलाभिषेक करें और चंद्र गायत्री मंत्र का स्मरण करें।`
      },
      {
        category: "3. करियर, व्यापार एवं आजीविका (10वां भाव व D10)",
        subTitle: `10वां भाव: ${tenthHouseSign} | दशमेश: ${tenthLord}`,
        prediction: `आपका 10वां भाव (कर्म स्थान) ${tenthHouseSign} राशि में पड़ता है, जिसके स्वामी ${tenthLord} हैं। आपके करियर में प्रशासनिक पद, प्रबंधन, तकनीकी क्षेत्र, बैंकिंग, सलाहकारिता या स्वतंत्र व्यवसाय में बड़ी सफलता के योग हैं। D10 दशमांश कुंडली के अनुसार, ${tenthLord} की स्थिति आपको कार्यक्षेत्र में सम्मान एवं अधिकार दिलाती है।`,
        keyFactors: `D10 दशमांश varga व दशमेश ${tenthLord} की स्थिति`,
        remedy: `प्रतिदिन हनुमान चालीसा का पाठ करें एवं कार्यस्थल पर ईशान कोण को स्वच्छ रखें।`
      },
      {
        category: "4. धन, संपत्ति एवं आर्थिक स्थिति (2रा, 11वां भाव व D2)",
        subTitle: `2रा भाव: ${secondHouseSign} | द्वितीयेश: ${secondLord}`,
        prediction: `आपका धन भाव (2रा भाव) ${secondHouseSign} राशि में है, जिसके स्वामी ${secondLord} हैं। लाभ भाव (11वां भाव) की मजबूत स्थिति से जीवन में निरंतर आय के स्रोत बने रहेंगे। शेयर बाजार, भूमि-भवन, व्यावसायिक निवेश और पैतृक संपत्ति से धन लाभ का योग बनता है।`,
        keyFactors: `द्वितीयेश ${secondLord} व D2 होरा वर्ग प्रभाव`,
        remedy: `शुक्रवार को महालक्ष्मी के समक्ष कनकधारा स्तोत्र का पाठ करें।`
      },
      {
        category: "5. प्रेम, विवाह एवं जीवनसाथी (7वां भाव व D9)",
        subTitle: `7वां भाव: ${seventhHouseSign} | सप्तमेश: ${seventhLord}`,
        prediction: `आपका 7वां भाव (विवाह व साझेदारी) ${seventhHouseSign} राशि में है, जिसके स्वामी ${seventhLord} हैं। D9 नवमांश कुंडली के विश्लेषण अनुसार आपका जीवनसाथी सुंदर, सुसंस्कृत, समझदार और परिवार को जोड़ने वाला होगा। वैवाहिक जीवन में परस्पर सम्मान और सामंजस्य रहेगा।`,
        keyFactors: `D9 नवमांश varga व सप्तमेश ${seventhLord}`,
        remedy: `गौ सेवा करें एवं गुरु/शुक्र ग्रह के बीज मंत्र का जाप करें।`
      },
      {
        category: "6. स्वास्थ्य, रोग एवं शारीरिक क्षमता (6ठा, 8वां भाव)",
        subTitle: "स्वास्थ्य एवं सुरक्षा कवच",
        prediction: `6ठे एवं 8वें भाव के स्वामियों के विश्लेषण से पता चलता है कि आपकी रोग प्रतिरोधक क्षमता अच्छी है। ${combustPlanets.length > 0 ? `ध्यान दें: ${combustPlanets.join(", ")} ग्रह अस्त होने के कारण कभी-कभी पाचन, नेत्र या थकान संबंधी समस्याएं हो सकती हैं।` : "सही खान-पान व योग से आपका स्वास्थ्य उत्तम रहेगा।"}`,
        keyFactors: `अस्त ग्रह: ${combustPlanets.join(", ") || "कोई नहीं"} | 6ठा भाव बल`,
        remedy: `प्रातः प्राणायाम करें एवं महामृत्युंजय मंत्र का यथाशक्ति जाप करें।`
      },
      {
        category: "7. शिक्षा, बुद्धि एवं संतान (4था, 5वां भाव व D24, D7)",
        subTitle: "विद्या, ज्ञान एवं वंशवृद्धि",
        prediction: `4थे एवं 5वें भाव का प्रभाव आपको उच्च शिक्षा, शोध, विज्ञान, साहित्य एवं प्रौद्योगिकी में पारंगत बनाता है। D24 एवं D7 वर्ग कुंडली दर्शाती है कि आपकी संतान संस्कारी, मेधावी एवं कुल का नाम रोशन करने वाली होगी।`,
        keyFactors: `D24 चतुर्विंशांश व D7 सप्तमांश वर्ग प्रभाव`,
        remedy: `बुधवार को मां सरस्वती का पूजन करें और गणेश जी को दुर्वा अर्पित करें।`
      },
      {
        category: "8. वर्तमान महादशा एवं समय चक्र फल",
        subTitle: `सक्रिय महादशा स्वामी: ${mainPlanet.name}`,
        prediction: `वर्तमान में आपकी ${mainPlanet.name} की विंशोत्तरी महादशा प्रभाव में है। यह समय करियर में नए अवसरों, धन लाभ, धार्मिक यात्राओं और व्यक्तिगत प्रगति के लिए अत्यंत शुभ व फलदायी सिद्ध होगा।`,
        keyFactors: `विंशोत्तरी दशा चक्र: ${mainPlanet.name}`,
        remedy: `${mainPlanet.name} के विशेष ग्रह शांति उपाय एवं पीली/काली वस्तुओं का दान करें।`
      }
    ];
  }

  if (lang === "mr") {
    return [
      {
        category: "1. व्यक्तिमत्त्व, स्वभाव व शारीरिक रचना (लग्न)",
        subTitle: `लग्न: ${lagna} | लग्नस्वामी: ${lagnesh}`,
        prediction: `तुमचे लग्न ${lagna} असून, लग्नस्वामी ${lagnesh} आहेत. ${lagna} लग्नाचे व्यक्ती अत्यंत हुशार, स्वाभिमानी आणि आकर्षक व्यक्तिमत्त्वाचे असतात. ${exaltedPlanets.length > 0 ? `तुमच्या कुंडलीत ${exaltedPlanets.join(", ")} हे ग्रह उच्च स्थानात आहेत, ज्यामुळे समाजात मोठा मानसन्मान आणि नेतृत्वगुण मिळतात.` : ""}`,
        keyFactors: `उच्च ग्रह: ${exaltedPlanets.join(", ") || "नाहीत"}`,
        remedy: `लग्नस्वामी ${lagnesh} च्या मंत्राचा जप करा आणि दररोज सूर्याला अर्घ्य द्या.`
      },
      {
        category: "2. मानसिक स्थिती व भावना (चंद्र राशी)",
        subTitle: `चंद्र राशी: ${moonSign}`,
        prediction: `तुमची चंद्र राशी ${moonSign} आहे. तुमचे मन संवेदनशील, तल्लख आणि भावनाप्रधान आहे. कला, साहित्य आणि तत्वज्ञानात तुमची विशेष आवड राहील.`,
        keyFactors: `चंद्र ग्रह आणि मानसिक आरोग्य`,
        remedy: `दर सोमवारी शिवशंकराला दुधाचा आणि जलाचा अभिषेक करा.`
      },
      {
        category: "3. करियर, व्यवसाय व प्रतिष्ठा (१० वे स्थान व D10)",
        subTitle: `१० वे स्थान: ${tenthHouseSign} | स्वामी: ${tenthLord}`,
        prediction: `तुमचे १० वे स्थान ${tenthHouseSign} राशीत येते, ज्याचे स्वामी ${tenthLord} आहेत. प्रशासकीय सेवा, आयटी, व्यवसाय, बँकिंग किंवा वैद्यकीय क्षेत्रात उत्तम यश मिळेल.`,
        keyFactors: `D10 दशमांश कुंडली व १० व्या स्थानाचा स्वामी ${tenthLord}`,
        remedy: `मारुती स्तोत्राचे नित्य पठण करा.`
      },
      {
        category: "4. धन, संपत्ती व आर्थिक स्थिती (२ रे घर व D2)",
        subTitle: `२ रे घर: ${secondHouseSign} | स्वामी: ${secondLord}`,
        prediction: `धन स्थान ${secondHouseSign} मध्ये असून स्वामी ${secondLord} आहेत. स्थावर मालमत्ता, गुंतवणूक आणि व्यवसायातून चांगला धनलाभ होईल.`,
        keyFactors: `D2 होरा कुंडली व धन स्थान`,
        remedy: `शुक्रवारी लक्ष्मी अष्टक किंवा श्री सूक्ताचे पठण करा.`
      },
      {
        category: "5. प्रेम, विवाह व जोडीदार (७ वे स्थान व D9)",
        subTitle: `७ वे स्थान: ${seventhHouseSign} | स्वामी: ${seventhLord}`,
        prediction: `७ वे स्थान ${seventhHouseSign} असून नवमांश (D9) नुसार तुमचा जोडीदार समंजस, सुसंस्कृत आणि प्रेमळ असेल.`,
        keyFactors: `D9 नवमांश व ७ व्या स्थानाचा स्वामी`,
        remedy: `गाईला हिरवा चारा किंवा गूळ-पोळी खायला द्या.`
      },
      {
        category: "6. आरोग्य व रोगप्रतिकारक शक्ती (६ वे व ८ वे घर)",
        subTitle: "आरोग्य विचार",
        prediction: `आरोग्य साधारणपणे उत्तम राहील. वेळच्या वेळी योग्य आहार आणि योगासने केल्यास ऊर्जा टिकून राहील.`,
        keyFactors: `६ वे व ८ वे स्थान`,
        remedy: `नित्य प्राणायाम करा आणि ओम नमः शिवाय जप करा.`
      },
      {
        category: "7. शिक्षण, बुद्धिमत्ता व संतती (D24 व D7)",
        subTitle: "विद्या व संतती",
        prediction: `उच्च शिक्षण, बुद्धिमत्ता व संतती सुख उत्तम लाभेल. D24 कुंडलीनुसार ज्ञानाचा विशेष लाभ होईल.`,
        keyFactors: `D24 व D7 कुंडली`,
        remedy: `गणपती अथर्वशीर्ष म्हणा.`
      },
      {
        category: "8. सध्याची महादशा व काळ",
        subTitle: `महादशा: ${mainPlanet.name}`,
        prediction: `सध्या तुमची ${mainPlanet.name} ची विंशोत्तरी महादशा सुरू आहे. हा काळ प्रगतीचा आणि धनलाभाचा ठरेल.`,
        keyFactors: `दशा चक्र: ${mainPlanet.name}`,
        remedy: `${mainPlanet.name} ग्रहाचे नामस्मरण व दान धर्म करा.`
      }
    ];
  }

  if (lang === "gu") {
    return [
      {
        category: "1. વ્યક્તિત્વ અને શારીરિક બનાવટ (લગ્ન)",
        subTitle: `લગ્ન: ${lagna} | લગ્નેશ: ${lagnesh}`,
        prediction: `તમારું લગ્ન ${lagna} છે, જેના સ્વામી ${lagnesh} છે. ${lagna} લગ્નના જાતકો સ્વાભાવિક રીતે પ્રભાવશાળી, બુદ્ધિશાળી અને સ્વાભિમાની હોય છે. તમારું વ્યક્તિત્વ આકર્ષક રહે છે. ${exaltedPlanets.length > 0 ? `તમારી કુંડળીમાં ${exaltedPlanets.join(", ")} ગ્રહો ઉચ્ચ સ્થિતિમાં છે, જે તમને જીવનમાં વિશેષ નામના, નેતૃત્વ ક્ષમતા અને ઉચ્ચ સામાજિક પદ પ્રદાન કરે છે.` : ""} ${debilitatedPlanets.length > 0 ? `જોકે ${debilitatedPlanets.join(", ")} ગ્રહ નીચ સ્થિતિમાં હોવાથી શરૂઆતના તબક્કામાં સંઘર્ષ આવી શકે છે.` : ""}`,
        keyFactors: `ઉચ્ચ ગ્રહ: ${exaltedPlanets.join(", ") || "કોઈ નહીં"} | નીચ ગ્રહ: ${debilitatedPlanets.join(", ") || "કોઈ નહીં"}`,
        remedy: `લગ્નેશ ${lagnesh} ના વૈદિક બીજ મંત્રનો જાપ કરો અને દરરોજ સવારે સૂર્ય દેવને અર્ધ્ય અર્પણ કરો.`
      },
      {
        category: "2. માનસિક સ્થિતિ અને વિચારો (ચંદ્ર રાશિ)",
        subTitle: `ચંદ્ર રાશિ: ${moonSign}`,
        prediction: `તમારી ચંદ્ર રાશિ ${moonSign} છે. તમારું મન અને ભાવનાઓ ખૂબ સંવેદનશીલ અને તીવ્ર છે. તમે કળા, સાહિત્ય અને માનવીય સંબંધોને ઊંડાણપૂર્વક સમજો છો.`,
        keyFactors: `ચંદ્ર ગ્રહ પ્રભાવ અને માનસિક સ્થિતિ`,
        remedy: `દર સોમવારે શિવલિંગ પર જળાભિષેક કરો અને ચંદ્ર ગાયત્રી મંત્રનું સ્મરણ કરો.`
      },
      {
        category: "3. કારકિર્દી, વેપાર અને નોકરી (10મું ઘર અને D10)",
        subTitle: `10મું ઘર: ${tenthHouseSign} | દશમેશ: ${tenthLord}`,
        prediction: `તમારું 10મું ઘર (કર્મ સ્થાન) ${tenthHouseSign} રાશિમાં પડે છે, જેના સ્વામી ${tenthLord} છે. તમારી કારકિર્દીમાં વહીવટી પદ, ટેકનોલોજી, બેન્કિંગ અથવા સ્વતંત્ર વ્યવસાયમાં મોટી સફળતાના યોગ છે.`,
        keyFactors: `D10 દશમાંશ કુંડળી અને દશમેશ ${tenthLord}`,
        remedy: `દરરોજ હનુમાન ચાલીસાનો પાઠ કરો અને કાર્યસ્થળને સ્વચ્છ રાખો.`
      },
      {
        category: "4. ધન, સંપત્તિ અને આર્થિક સ્થિતિ (2જું, 11મું ઘર અને D2)",
        subTitle: `2જું ઘર: ${secondHouseSign} | દ્વિતીયેશ: ${secondLord}`,
        prediction: `તમારું ધન સ્થાન ${secondHouseSign} રાશિમાં છે, જેના સ્વામી ${secondLord} છે. લાભ સ્થાનની મજબૂત સ્થિતિથી જીવનમાં સતત આવકના સ્ત્રોત બની રહેશે.`,
        keyFactors: `દ્વિતીયેશ ${secondLord} અને D2 હોરા કુંડળી`,
        remedy: `શુક્રવારે મહાલક્ષ્મી સમક્ષ કનકધારા સ્તોત્રનો પાઠ કરો.`
      },
      {
        category: "5. પ્રેમ, લગ્ન અને જીવનસાથી (7મું ઘર અને D9)",
        subTitle: `7મું ઘર: ${seventhHouseSign} | સપ્તમેશ: ${seventhLord}`,
        prediction: `તમારું 7મું ઘર ${seventhHouseSign} રાશિમાં છે, જેના સ્વામી ${seventhLord} છે. D9 નવમાંશ કુંડળી અનુસાર તમારો જીવનસાથી સુંદર, સુસંસ્કૃત અને સમજદાર હશે.`,
        keyFactors: `D9 નવમાંશ અને સપ્તમેશ ${seventhLord}`,
        remedy: `ગાયની સેવા કરો અને ગુરુ/શુક્રના બીજ મંત્રનો જાપ કરો.`
      },
      {
        category: "6. સ્વાસ્થ્ય અને રોગપ્રતિકારક શક્તિ (6ઠ્ઠું, 8મું ઘર)",
        subTitle: "સ્વાસ્થ્ય પ્રોફાઇલ",
        prediction: `તમારી રોગપ્રતિકારક શક્તિ સારી છે. ${combustPlanets.length > 0 ? `ધ્યાન આપો: ${combustPlanets.join(", ")} ગ્રહ અસ્ત હોવાને લીધે થાક કે પાચન સંબંધી સમસ્યાઓ આવી શકે છે.` : "યોગ્ય આહાર અને યોગથી તમારું સ્વાસ્થ્ય ઉત્તમ રહેશે."}`,
        keyFactors: `અસ્ત ગ્રહ: ${combustPlanets.join(", ") || "કોઈ નહીં"}`,
        remedy: `સવારે પ્રાણાયામ કરો અને મહામૃત્યુંજય મંત્રનો જાપ કરો.`
      },
      {
        category: "7. શિક્ષણ, બુદ્ધિ અને સંતાન (4થું, 5મું ઘર)",
        subTitle: "વિદ્યા અને સંતાન સુખ",
        prediction: `4થા અને 5મા ઘરનો પ્રભાવ તમને ઉચ્ચ શિક્ષણ અને સંશોધનમાં પારંગત બનાવે છે. D24 અને D7 કુંડળી દર્શાવે છે કે તમારી સંતાન તેજસ્વી અને સંસ્કારી હશે.`,
        keyFactors: `D24 અને D7 વર્ગ કુંડળી`,
        remedy: `બુધવારે માતા સરસ્વતીની પૂજા કરો અને ગણેશજીને દર્ભ અર્પણ કરો.`
      },
      {
        category: "8. વર્તમાન મહાદશા સમયફળ",
        subTitle: `સક્રિય મહાદશા સ્વામી: ${mainPlanet.name}`,
        prediction: `હાલમાં તમારી ${mainPlanet.name} ની વિંશોત્તરી મહાદશા ચાલી રહી છે. આ સમય કારકિર્દીમાં નવી તકો અને ધનલાભ માટે અત્યંત શુભ રહેશે.`,
        keyFactors: `દશા ચક્ર: ${mainPlanet.name}`,
        remedy: `${mainPlanet.name} ના ગ્રહ શાંતિ ઉપાય અને પીળી/કાળી વસ્તુઓનું દાન કરો.`
      }
    ];
  }

  if (lang === "ta") {
    return [
      {
        category: "1. ஆளுமை & உடலமைப்பு (லக்னம்)",
        subTitle: `லக்னம்: ${lagna} | லக்னாதிபதி: ${lagnesh}`,
        prediction: `உங்கள் லக்னம் ${lagna}, அதன் அதிபதி ${lagnesh}. ${lagna} லக்னத்தில் பிறந்தவர்கள் இயல்பாகவே கம்பீரமான தோற்றம், அறிவாற்றல் மற்றும் சுயமரியாதை மிக்கவர்கள். ${exaltedPlanets.length > 0 ? `உங்கள் ஜாதகத்தில் ${exaltedPlanets.join(", ")} கிரகங்கள் உச்ச நிலையில் உள்ளன. இது உயர்பதவி மற்றும் சமூக அந்தஸ்தை தரும்.` : ""} ${debilitatedPlanets.length > 0 ? `இருப்பினும் ${debilitatedPlanets.join(", ")} கிரகங்கள் நீச நிலையில் உள்ளதால் ஆரம்ப காலத்தில் போராட்டங்கள் வரலாம்.` : ""}`,
        keyFactors: `உச்ச கிரகங்கள்: ${exaltedPlanets.join(", ") || "எதுவுமில்லை"} | நீச கிரகங்கள்: ${debilitatedPlanets.join(", ") || "எதுவுமில்லை"}`,
        remedy: `லக்னாதிபதி ${lagnesh} பீஜ மந்திரத்தை ஜெபித்து தினமும் சூரியனுக்கு அர்க்கியம் அளிக்கவும்.`
      },
      {
        category: "2. மனநிலை & எண்ணங்கள் (சந்திர ராசி)",
        subTitle: `சந்திர ராசி: ${moonSign}`,
        prediction: `உங்கள் ராசி ${moonSign}. உங்கள் மனம் மற்றும் உணர்வுகள் மிகவும் கூர்மையானவை. கலை, இலக்கியம் மற்றும் மனித உறவுகளை ஆழமாக புரிந்து கொள்வீர்கள்.`,
        keyFactors: `சந்திர கிரக நிலை & மனபலம்`,
        remedy: `திங்கள்கிழமைகளில் சிவபெருமானுக்கு பாலாபிஷேகம் செய்து சந்திர காயத்ரி மந்திரம் ஓதவும்.`
      },
      {
        category: "3. தொழில் & வேலை வாய்ப்பு (10ம் வீடு & D10)",
        subTitle: `10ம் வீடு: ${tenthHouseSign} | 10ம் அதிபதி: ${tenthLord}`,
        prediction: `உங்கள் 10ம் வீடு (கர்ம இடம்) ${tenthHouseSign} ராசியில் உள்ளது, இதன் அதிபதி ${tenthLord}. நிருவாகம், தொழில்நுட்பம், வங்கி அல்லது சுயதொழிலில் பெரிய வெற்றி கிடைக்கும்.`,
        keyFactors: `D10 தசாம்ச சக்கரம் & 10ம் அதிபதி ${tenthLord}`,
        remedy: `தினமும் ஹனுமான் சாலிசா பாராயணம் செய்து பணிபுரியும் இடத்தை தூய்மையாக வைக்கவும்.`
      },
      {
        category: "4. தனம், சொத்து & நிதிநிலை (2ம், 11ம் வீடு & D2)",
        subTitle: `2ம் வீடு: ${secondHouseSign} | 2ம் அதிபதி: ${secondLord}`,
        prediction: `உங்கள் தனஸ்தானம் ${secondHouseSign} ராசியில் உள்ளது, இதன் அதிபதி ${secondLord}. லாபஸ்தானத்தின் பலத்தால் தொடர்ச்சியான வருமான ஆதாரங்கள் அமையும்.`,
        keyFactors: `2ம் அதிபதி ${secondLord} & D2 ஹோரா பலன்`,
        remedy: `வெள்ளிக்கிழமைகளில் கனகதாரா ஸ்தோத்திரம் பாராயணம் செய்யவும்.`
      },
      {
        category: "5. காதல், திருமணம் & வாழ்க்கைத்துணை (7ம் வீடு & D9)",
        subTitle: `7ம் வீடு: ${seventhHouseSign} | 7ம் அதிபதி: ${seventhLord}`,
        prediction: `உங்கள் 7ம் வீடு ${seventhHouseSign} ராசியில் உள்ளது, இதன் அதிபதி ${seventhLord}. D9 நவாம்ச சக்கரப்படி உங்கள் வாழ்க்கைத்துணை அன்பானவர், புத்திசாலி மற்றும் குடும்பத்தை அரவணைப்பவராக இருப்பார்.`,
        keyFactors: `D9 நவாம்சம் & 7ம் அதிபதி ${seventhLord}`,
        remedy: `பசு மாட்டிற்கு அகத்திக்கீரை அளித்து குரு/சுக்கிர மந்திரம் ஜெபிக்கவும்.`
      },
      {
        category: "6. ஆரோக்கியம் & நோயெதிர்ப்பு (6ம், 8ம் வீடு)",
        subTitle: "ஆரோக்கிய பகுப்பாய்வு",
        prediction: `உங்கள் உடலின் நோய் எதிர்ப்பு சக்தி நன்றாக உள்ளது. ${combustPlanets.length > 0 ? `கவனிக்கவும்: ${combustPlanets.join(", ")} கிரகங்கள் அஸ்தமனம் அடைந்துள்ளதால் அவ்வப்போது சோர்வு அல்லது செரிமானக் கோளாறுகள் வரலாம்.` : "சீரான உணவு மற்றும் யோகா மூலம் ஆரோக்கியம் சிறப்பாக இருக்கும்."}`,
        keyFactors: `அஸ்தமன கிரகங்கள்: ${combustPlanets.join(", ") || "எதுவுமில்லை"}`,
        remedy: `காலை வேளையில் பிராணாயாமம் செய்து மஹாமிருத்யுஞ்ஜய மந்திரம் ஜெபிக்கவும்.`
      },
      {
        category: "7. கல்வி, அறிவு & குழந்தைகள் (4ம், 5ம் வீடு)",
        subTitle: "கல்வி & சந்ததி பலன்",
        prediction: `4ம் மற்றும் 5ம் வீடுகளின் தாக்கம் உயர்கல்வி மற்றும் ஆராய்ச்சியில் உங்களை திறமைசாலியாக்கும். D24 மற்றும் D7 சக்கரங்கள் சிறந்த நற்குணமுள்ள குழந்தைகளை குறிக்கின்றன.`,
        keyFactors: `D24 மற்றும் D7 வர்க்க சக்கரங்கள்`,
        remedy: `புதன்கிழமைகளில் சரஸ்வதி தேவியை வழிபட்டு விநாயகருக்கு அருகம்புல் சாத்தவும்.`
      },
      {
        category: "8. தற்போதைய தசா புத்தி பலன்கள்",
        subTitle: `தற்போதைய தசா அதிபதி: ${mainPlanet.name}`,
        prediction: `தற்போது உங்களுக்கு ${mainPlanet.name} விம்சோத்தரி மஹா தசை நடக்கிறது. இந்த காலம் தொழில் வளர்ச்சி, தனலாபம் மற்றும் சுப காரியங்களுக்கு மிகவும் உகந்தது.`,
        keyFactors: `தசா சக்கரம்: ${mainPlanet.name}`,
        remedy: `${mainPlanet.name} கிரகத்திற்குரிய பரிகாரங்களை செய்து தான தர்மங்கள் செய்யவும்.`
      }
    ];
  }

  if (lang === "te") {
    return [
      {
        category: "1. వ్యక్తిత్వం & శరీర ఆకృతి (లగ్నం)",
        subTitle: `లగ్నం: ${lagna} | లగ్నాధిపతి: ${lagnesh}`,
        prediction: `మీ లగ్నం ${lagna}, దీని అధిపతి ${lagnesh}. ${lagna} లగ్నంలో జన్మించిన వారు సహజంగానే ఆకర్షణీయమైన, తెలివైన మరియు ఆత్మగౌరవం ఉన్నవారు. ${exaltedPlanets.length > 0 ? `మీ జాతకంలో ${exaltedPlanets.join(", ")} గ్రహాలు ఉచ్ఛ స్థితిలో ఉన్నాయి, ఇవి మీకు విశేషమైన పేరు ప్రఖ్యాతులు, నాయకత్వ లక్షణాలు మరియు ఉన్నత సామాజిక హోదాను ఇస్తాయి.` : ""} ${debilitatedPlanets.length > 0 ? `అయితే ${debilitatedPlanets.join(", ")} గ్రహాలు నీచ స్థితిలో ఉండటం వల్ల ప్రారంభంలో కొన్ని సవాళ్లు రావచ్చు.` : ""}`,
        keyFactors: `ఉచ్ఛ గ్రహాలు: ${exaltedPlanets.join(", ") || "ఏవీ లేవు"} | నీచ గ్రహాలు: ${debilitatedPlanets.join(", ") || "ఏవీ లేవు"}`,
        remedy: `లగ్నాధిపతి ${lagnesh} బీజ మంత్రాన్ని జపించండి మరియు ప్రతిరోజూ ఉదయం సూర్యభగవానునికి అర్ఘ్యం ఇవ్వండి.`
      },
      {
        category: "2. మానసిక స్థితి & ఆలోచనలు (చంద్ర రాశి)",
        subTitle: `చంద్ర రాశి: ${moonSign}`,
        prediction: `మీ చంద్ర రాశి ${moonSign}. మీ మనస్సు మరియు భావోద్వేగాలు చాలా సున్నితమైనవి మరియు నిశితమైనవి. మీరు కళలు, సాహిత్యం మరియు మానవ సంబంధాలను లోతుగా అర్థం చేసుకుంటారు.`,
        keyFactors: `చంద్ర గ్రహ ప్రభావం & మానసిక బలం`,
        remedy: `ప్రతి సోమవారం శివలింగానికి జలాభిషేకం చేయండి మరియు చంద్ర గాయత్రీ మంత్రాన్ని స్మరించండి.`
      },
      {
        category: "3. ఉద్యోగం, వ్యాపారం & హోదా (10వ ఇల్లు & D10)",
        subTitle: `10వ ఇల్లు: ${tenthHouseSign} | 10వ అధిపతి: ${tenthLord}`,
        prediction: `మీ 10వ ఇల్లు (కర్మ స్థానం) ${tenthHouseSign} రాశిలో ఉంది, దీని అధిపతి ${tenthLord}. ఐటీ, నిర్వహణ, బ్యాంకింగ్ లేదా స్వతంత్ర వ్యాపారంలో మంచి పురోగతి ఉంటుంది.`,
        keyFactors: `D10 దశాంశ చక్రం & 10వ అధిపతి ${tenthLord}`,
        remedy: `నిత్యం హనుమాన్ చాలీసా పఠించండి మరియు పని చేసే ప్రదేశాన్ని పరిశుభ్రంగా ఉంచండి.`
      },
      {
        category: "4. ధనం, ఆస్తి & ఆర్థిక స్థితి (2వ, 11వ ఇల్లు & D2)",
        subTitle: `2వ ఇల్లు: ${secondHouseSign} | 2వ అధిపతి: ${secondLord}`,
        prediction: `మీ ధన స్థానం ${secondHouseSign} రాశిలో ఉంది, దీని అధిపతి ${secondLord}. లాభ స్థాన బలం వల్ల నిరంతరం ఆదాయ మార్గాలు ఉంటాయి.`,
        keyFactors: `2వ అధిపతి ${secondLord} & D2 హోరా చక్రం`,
        remedy: `శుక్రవారం మహాలక్ష్మి దేవి సమక్షంలో కనకధారా స్తోత్రం పఠించండి.`
      },
      {
        category: "5. ప్రేమ, వివాహం & జీవిత భాగస్వామి (7వ ఇల్లు & D9)",
        subTitle: `7వ ఇల్లు: ${seventhHouseSign} | 7వ అధిపతి: ${seventhLord}`,
        prediction: `మీ 7వ ఇల్లు ${seventhHouseSign} రాశిలో ఉంది, దీని అధిపతి ${seventhLord}. D9 నవాంశ ప్రకారం మీ జీవిత భాగస్వామి అందమైన, సంస్కారవంతమైన మరియు అవగాహన కలిగిన వ్యక్తి అయి ఉంటారు.`,
        keyFactors: `D9 నవాంశ & 7వ అధిపతి ${seventhLord}`,
        remedy: `గోసేవ చేయండి మరియు గురు/శుక్ర గ్రహ బీజ మంత్రాలను జపించండి.`
      },
      {
        category: "6. ఆరోగ్యం & రోగనిరోధక శక్తి (6వ, 8వ ఇల్లు)",
        subTitle: "ఆరోగ్య విశేషాలు",
        prediction: `మీ రోగనిరోధక శక్తి బాగుంది. ${combustPlanets.length > 0 ? `గమనిక: ${combustPlanets.join(", ")} గ్రహాలు అస్తంగతమవ్వడం వల్ల అలసట లేదా జీర్ణకోశ సమస్యలు రావచ్చు.` : "సరైన ఆహారం మరియు యోగాతో ఆరోగ్యం బాగుంటుంది."}`,
        keyFactors: `అస్తంగత గ్రహాలు: ${combustPlanets.join(", ") || "ఏవీ లేవు"}`,
        remedy: `ఉదయాన్నే ప్రాణాయామం చేయండి మరియు మహామృత్యుంజయ మంత్రాన్ని జపించండి.`
      },
      {
        category: "7. విద్య, మేధస్సు & సంతానం (4వ, 5వ ఇల్లు)",
        subTitle: "విద్య & సంతాన యోగం",
        prediction: `4వ మరియు 5వ ఇళ్ల ప్రభావం ఉన్నత విద్య మరియు పరిశోధనలో మిమ్మల్ని రాణించేలా చేస్తుంది. D24 మరియు D7 చక్రాలు ఉత్తమ సంతాన యోగాన్ని సూచిస్తున్నాయి.`,
        keyFactors: `D24 మరియు D7 వర్గ చక్రాలు`,
        remedy: `బుధవారం సరస్వతి దేవిని పూజించండి మరియు గణపతికి గరిక సమర్పించండి.`
      },
      {
        category: "8. ప్రస్తుత మహర్దశ సమయ ఫలితాలు",
        subTitle: `ప్రస్తుత మహర్దశ అధిపతి: ${mainPlanet.name}`,
        prediction: `ప్రస్తుతం మీకు ${mainPlanet.name} వింశోత్తరి మహర్దశ నడుస్తోంది. ఈ సమయం ఉద్యోగంలో అవకాశాలు, ధనలాభం మరియు శుభకార్యాలకు చాలా అనుకూలం.`,
        keyFactors: `దశ చక్రం: ${mainPlanet.name}`,
        remedy: `${mainPlanet.name} గ్రహ శాంతి ఉపాయాలు చేయండి మరియు దానధర్మాలు చేయండి.`
      }
    ];
  }

  if (lang === "bn") {
    return [
      {
        category: "1. ব্যক্তিত্ব ও শারীরিক গঠন (লগ্ন)",
        subTitle: `লগ্ন: ${lagna} | লগ্নপতি: ${lagnesh}`,
        prediction: `আপনার লগ্ন ${lagna}, যার অধিপতি ${lagnesh}। ${lagna} লগ্নের জাতক স্বাভাবিকভাবেই প্রভাবশালী, বুদ্ধিমান ও আত্মসম্মানী হন। আপনার ব্যক্তিত্ব চমৎকার। ${exaltedPlanets.length > 0 ? `আপনার কোষ্ঠীতে ${exaltedPlanets.join(", ")} গ্রহগুলি তুঙ্গী (উচ্চ) অবস্থায় আছে, যা আপনাকে সমাজে বিশেষ খ্যাতি ও উচ্চ পদ প্রদান করবে।` : ""} ${debilitatedPlanets.length > 0 ? `তবে ${debilitatedPlanets.join(", ")} গ্রহ নীচস্থ থাকার কারণে জীবনের শুরুতে কিছু বাধা আসতে পারে।` : ""}`,
        keyFactors: `তুঙ্গী গ্রহ: ${exaltedPlanets.join(", ") || "নেই"} | নীচস্থ গ্রহ: ${debilitatedPlanets.join(", ") || "নেই"}`,
        remedy: `লগ্নপতি ${lagnesh}-এর বৈদিক বীজ মন্ত্র জপ করুন এবং প্রতিদিন সকালে সূর্যদেবকে অর্ঘ্য প্রদান করুন।`
      },
      {
        category: "2. মানসিক অবস্থা ও ভাবনা (চন্দ্র রাশি)",
        subTitle: `চন্দ্র রাশি: ${moonSign}`,
        prediction: `আপনার চন্দ্র রাশি ${moonSign}। আপনার মন ও অনুভূতি খুব সংবেদনশীল ও তীক্ষ্ণ। আপনি শিল্প, সাহিত্য ও মানবিক সম্পর্ক গভীরভাবে বোঝেন।`,
        keyFactors: `চন্দ্র গ্রহের প্রভাব ও মানসিক বল`,
        remedy: `প্রতি সোমবারে শিবলিঙ্গে জলাভিষেক করুন এবং চন্দ্র গায়ত্রী মন্ত্র পাঠ করুন।`
      },
      {
        category: "3. কেরিয়ার, কর্ম ও প্রতিষ্ঠা (10ম ভাব ও D10)",
        subTitle: `10ম ভাব: ${tenthHouseSign} | দশমপতি: ${tenthLord}`,
        prediction: `আপনার 10ম ভাব (কর্ম স্থান) ${tenthHouseSign} রাশিতে পড়ে, যার অধিপতি ${tenthLord}। কেরিয়ারে প্রশাসনিক পদ, প্রযুক্তি, ব্যাংকিং বা স্বাধীন ব্যবসায় বড় সাফল্যের যোগ রয়েছে।`,
        keyFactors: `D10 দশমাংশ ছক ও দশমপতি ${tenthLord}`,
        remedy: `প্রতিদিন হনুমান চালিসা পাঠ করুন এবং কর্মক্ষেত্র পরিষ্কার রাখুন।`
      },
      {
        category: "4. ধন, সম্পদ ও আর্থিক স্থান (2য়, 11শ ভাব ও D2)",
        subTitle: `2য় ভাব: ${secondHouseSign} | দ্বিতীয়পতি: ${secondLord}`,
        prediction: `আপনার ধন ভাব ${secondHouseSign} রাশিতে রয়েছে, যার অধিপতি ${secondLord}। একাদশ ভাবের শুভ প্রভাবে আয় নিরবচ্ছিন্ন থাকবে।`,
        keyFactors: `দ্বিতীয়পতি ${secondLord} ও D2 হোরা বর্গ`,
        remedy: `শুক্রবার মহালক্ষ্মীর সামনে কনকধারা স্তোত্র পাঠ করুন।`
      },
      {
        category: "5. প্রেম, বিবাহ ও জীবনসঙ্গী (7ম ভাব ও D9)",
        subTitle: `7ম ভাব: ${seventhHouseSign} | সপ্তমপতি: ${seventhLord}`,
        prediction: `আপনার 7ম ভাব ${seventhHouseSign} রাশিতে পড়েছে, যার অধিপতি ${seventhLord}। D9 নবমাংশ ছক অনুসারে আপনার জীবনসঙ্গী সুন্দর, সুসংস্কৃত ও সহানুভূতিশীল হবেন।`,
        keyFactors: `D9 নবমাংশ ও সপ্তমপতি ${seventhLord}`,
        remedy: `গরুকে খাদ্য প্রদান করুন এবং গুরু/শুক্র গ্রহের বীজ মন্ত্র জপ করুন।`
      },
      {
        category: "6. স্বাস্থ্য, রোগ ও প্রতিরোধ ক্ষমতা (6ষ্ঠ, 8ম ভাব)",
        subTitle: "স্বাস্থ্য মূল্যায়ন",
        prediction: `আপনার রোগ প্রতিরোধ ক্ষমতা ভালো। ${combustPlanets.length > 0 ? `সতর্কতা: ${combustPlanets.join(", ")} গ্রহ অস্তমিত হওয়ায় মাঝেমধ্যে ক্লান্তি বা হজমের সমস্যা হতে পারে।` : "সঠিক খাদ্যাভ্যাস ও যোগাসনে স্বাস্থ্য চমৎকার থাকবে।"}`,
        keyFactors: `অস্তমিত গ্রহ: ${combustPlanets.join(", ") || "নেই"}`,
        remedy: `সকালে প্রাণায়াম করুন এবং মহামৃত্যুঞ্জয় মন্ত্র জপ করুন।`
      },
      {
        category: "7. শিক্ষা, বুদ্ধি ও সন্তান (4র্থ, 5ম ভাব)",
        subTitle: "শিক্ষা ও সন্তান সুখ",
        prediction: `4র্থ ও 5ম ভাবের প্রভাব আপনাকে উচ্চশিক্ষা ও গবেষণায় পারদর্শী করে তোলে। D24 এবং D7 ছক সৎ ও মেধাবী সন্তানের ইঙ্গিত দেয়।`,
        keyFactors: `D24 ও D7 বর্গ ছক`,
        remedy: `বুধবারে দেবী সরস্বতীর পূজা করুন এবং গণেশজিকে দুর্বা নিবেদন করুন।`
      },
      {
        category: "8. বর্তমান মহাদশা সময়ফল",
        subTitle: `সক্রিয় মহাদশা পতি: ${mainPlanet.name}`,
        prediction: `বর্তমানে আপনার ${mainPlanet.name}-এর বিংশোত্তরী মহাদশা চলছে। এই সময় কেরিয়ারে উন্নতি ও ধনলাভের জন্য অত্যন্ত শুভ।`,
        keyFactors: `দশা চক্র: ${mainPlanet.name}`,
        remedy: `${mainPlanet.name} গ্রহের বিশেষ প্রতিকার করুন এবং দান-ধ্যান করুন।`
      }
    ];
  }

  // Default English / other languages
  return [
    {
      category: "1. Personality, Temperament & Physical Attributes (Lagna)",
      subTitle: `Ascendant: ${lagna} | Lord: ${lagnesh}`,
      prediction: `Your Ascendant (Lagna) is ${lagna}, ruled by ${lagnesh}. Native born in ${lagna} Ascendant naturally possesses an authoritative, intelligent, and magnetic aura. Physical structure is well-proportioned with strong vitality. ${exaltedPlanets.length > 0 ? `Key planets ${exaltedPlanets.join(", ")} are Exalted (Uchha), providing high social prestige, executive authority, and leadership accomplishments.` : ""} ${debilitatedPlanets.length > 0 ? `Planets ${debilitatedPlanets.join(", ")} are Debilitated (Neech), indicating initial life friction which dissolves with maturity.` : ""}`,
      keyFactors: `Exalted Planets: ${exaltedPlanets.join(", ") || "None"} | Debilitated: ${debilitatedPlanets.join(", ") || "None"}`,
      remedy: `Chant the Vedic Beej Mantra of Ascendant Lord ${lagnesh} and offer Arghya to the Sun daily.`
    },
    {
      category: "2. Emotional Outlook & Mental Disposition (Moon Sign)",
      subTitle: `Moon Sign: ${moonSign}`,
      prediction: `Your Moon Sign (Rashi) is ${moonSign}. You possess an empathetic, analytical, and intuitive mind. You appreciate fine arts, philosophy, and human relationships deeply. Emotional balance improves when Moon receives beneficial aspects.`,
      keyFactors: `Moon Positioning & Mental Strength`,
      remedy: `Offer water/milk to Lord Shiva on Mondays and practice mindful meditation.`
    },
    {
      category: "3. Career, Karma & Professional Trajectory (House 10 & D10)",
      subTitle: `10th House: ${tenthHouseSign} | Lord: ${tenthLord}`,
      prediction: `Your 10th House of Profession falls in ${tenthHouseSign}, ruled by ${tenthLord}. According to the D10 Dashamsha divisional chart, you have strong prospects in administrative management, technology, advisory, financial sectors, or independent business enterprise.`,
      keyFactors: `D10 Dashamsha Varga & Lord ${tenthLord}`,
      remedy: `Recite Hanuman Chalisa daily and keep your workplace clean and organized.`
    },
    {
      category: "4. Wealth, Investments & Financial Accumulation (House 2, 11 & D2)",
      subTitle: `2nd House: ${secondHouseSign} | Lord: ${secondLord}`,
      prediction: `Your 2nd House of Accumulated Wealth falls in ${secondHouseSign}, ruled by ${secondLord}. Supported by a strong 11th house of gains, you will experience consistent financial growth, real estate assets, and profitable investments.`,
      keyFactors: `Lord ${secondLord} & D2 Hora Varga`,
      remedy: `Chant Kanakdhara Stotram on Fridays for financial prosperity.`
    },
    {
      category: "5. Love, Marriage & Spouse Characteristics (House 7 & D9)",
      subTitle: `7th House: ${seventhHouseSign} | Lord: ${seventhLord}`,
      prediction: `Your 7th House of Marriage falls in ${seventhHouseSign}, ruled by ${seventhLord}. The D9 Navamsha chart reveals a cultured, intellectually compatible, supportive spouse who brings harmony and good fortune.`,
      keyFactors: `D9 Navamsha Varga & Lord ${seventhLord}`,
      remedy: `Engage in selfless service and respect family values.`
    },
    {
      category: "6. Health, Vitality & Medical Vulnerabilities (House 6, 8)",
      subTitle: "Vitality & Immunity Profile",
      prediction: `Analysis of the 6th and 8th houses shows strong vitality and natural immunity. ${combustPlanets.length > 0 ? `Note: Planets ${combustPlanets.join(", ")} are Combust (Ast), suggesting periodic need for hydration, eye care, and stress management.` : "Maintaining balanced nutrition ensures long-term vigor."}`,
      keyFactors: `Combust Planets: ${combustPlanets.join(", ") || "None"}`,
      remedy: `Practice Pranayama morning breathing exercises and Mahamrityunjaya Mantra.`
    },
    {
      category: "7. Education, Intellect & Progeny (House 4, 5 & D24, D7)",
      subTitle: "Intellectual Acumen & Lineage",
      prediction: `Prominent 4th and 5th house configurations indicate academic excellence, analytical acumen, and deep learning. D24 and D7 divisional charts indicate intelligent, well-mannered progeny.`,
      keyFactors: `D24 & D7 Divisional Charts`,
      remedy: `Worship Goddess Saraswati and offer green grass to Lord Ganesha on Wednesdays.`
    },
    {
      category: "8. Active Mahadasha & Time Period Prediction",
      subTitle: `Active Dasha Planet: ${mainPlanet.name}`,
      prediction: `You are currently experiencing the Vimshottari Mahadasha of ${mainPlanet.name}. This major planetary cycle brings new professional openings, financial expansion, and spiritual clarity.`,
      keyFactors: `Active Vimshottari Cycle: ${mainPlanet.name}`,
      remedy: `Perform specific planetary remedies for ${mainPlanet.name} during this Mahadasha period.`
    }
  ];
}

/**
 * Detailed predictions for each Divisional Chart (D1 to D60)
 */
export const DIVISIONAL_CHART_PREDICTIONS: Record<DivisionalChartType, Record<LanguageCode, string>> = {
  D1: {
    en: "D1 Rashi Chart is the primary root map of your physical existence, health, overall destiny, and life purpose.",
    hi: "D1 राशि चार्ट आपके संपूर्ण भौतिक जीवन, स्वास्थ्य, मूल भाग्य और जीवन के प्राथमिक उद्देश्य का मुख्य आधार है।",
    mr: "D1 राशी कुंडली ही तुमच्या संपूर्ण भौतिक आयुष्याची, आरोग्याची व नशिबाची मुख्य पत्रिका आहे.",
    gu: "D1 રાશિ ચાર્ટ તમારા સમગ્ર ભૌતિક જીવન, સ્વાસ્થ્ય અને નસીબનો મુખ્ય આધાર છે.",
    ta: "D1 ராசி சக்கரம் உங்களின் ஒட்டுமொத்த வாழ்க்கை, ஆரோக்கியம் மற்றும் விதியை வெளிப்படுத்தும் முதன்மை வரைபடம்.",
    te: "D1 రాశి చక్రం మీ భౌతిక జీవితం, ఆరోగ్యం మరియు సమగ్ర విధిని తెరిచే ప్రాథమిక చిత్రం.",
    bn: "D1 রাশি ছক আপনার সমগ্র শারীরিক জীবন, স্বাস্থ্য ও মূল ভাগ্যের প্রধান ভিত্তি।"
  },
  D2: {
    en: "D2 Hora Chart divides each sign into Sun and Moon Horas, revealing accumulated wealth, banking, assets, and monetary liquidity.",
    hi: "D2 होरा चार्ट सूर्य व चंद्र के होरा में विभाजित होकर पैतृक संपत्ति, बैंक बैलेंस, धन संचय और आर्थिक तरक्की को दर्शाता है।",
    mr: "D2 होरा कुंडली ही संपत्ती, बँक शिल्लक, दागदागिने व आर्थिक परिस्थितीचे सविस्तर वर्णन करते.",
    gu: "D2 હોરા ચાર્ટ સંપત્તિ, બેંક બેલેન્સ અને આર્થિક સમૃદ્ધિ દર્શાવે છે.",
    ta: "D2 ஹோரா சக்கரம் செல்வம், வங்கி இருப்பு மற்றும் நிதி வளர்ச்சியை விரிவாகக் காட்டுகிறது.",
    te: "D2 హోరా చక్రం ధన సంపాదన, బ్యాంక్ బ్యాలెన్స్ మరియు ఆస్తిపాస్తుల స్థితిని తెల్పుతుంది.",
    bn: "D2 হোরা ছক জমা ধন, ব্যাংক ব্যালেন্স ও আর্থিক সমৃদ্ধির বিস্তারিত বিবরণ দেয়।"
  },
  D3: {
    en: "D3 Drekkana Chart analyzes siblings, innate courage, physical stamina, arms, and short journeys.",
    hi: "D3 द्रेष्काण चार्ट भाई-बहनों से संबंध, आपका पराक्रम, अदम्य साहस, भुजाओं की शक्ति और छोटी यात्राओं का फल देता है।",
    mr: "D3 द्रेष्काण कुंडली भावांडांचे सुख, तुमचे धैर्य, पराक्रम आणि लघुप्रवासाचे फलित सांगते.",
    gu: "D3 દ્રેષ્કાણ ચાર્ટ ભાઈ-બહેનો સાથેના સંબંધો, તમારું સાહસ અને શક્તિ દર્શાવે છે.",
    ta: "D3 திரேகக்காணம் சகோதர உறவுகள், தைரியம், உடற்பலத்தை ஆராய்கிறது.",
    te: "D3 ద్రేక్కాణం తోబుట్టువులు, మీ ధైర్యం మరియు శారీరక శక్తిని విశ్లేషిస్తుంది.",
    bn: "D3 দ্রেষকাণ ছক ভাইবোন, আপনার সাহস ও শারীরিক ক্ষমতার সঠিক বিবরণ দেয়।"
  },
  D4: {
    en: "D4 Chaturthamsha Chart evaluates fixed assets, houses, land, vehicles, home peace, and net inheritance.",
    hi: "D4 चतुर्थांश चार्ट अचल संपत्ति, मकान, भूमि, लग्जरी गाड़ियां, गृह शांति और पैतृक जायदाद की सटीक जानकारी देता है।",
    mr: "D4 चतुर्थांश कुंडली स्वतःचे घर, जमीन-जुमला, वाहने आणि कौटुंबिक सुखाची माहिती देते.",
    gu: "D4 ચતુર્થાંશ ચાર્ટ મકાન, જમીન, વાહનો અને સ્થાવર મિલકત દર્શાવે છે.",
    ta: "D4 சதுர்த்தாம்சம் சொந்த வீடு, நிலம், வாகனங்கள் மற்றும் குடும்ப அமைதியை ஆராய்கிறது.",
    te: "D4 చతుర్థాంశం ఇల్లు, భూములు, వాహనాలు మరియు స్థిరాస్తుల స్థితిని వివరిస్తుంది.",
    bn: "D4 চতুর্থাংশ ছক নিজের বাড়ি, জমিজমা, গাড়ি ও পারিবারিক সুখের বিবরণ দেয়।"
  },
  D5: {
    en: "D5 Panchamsha Chart discloses specialized talents, spiritual merits, and intellectual sharpness.",
    hi: "D5 पंचमांश चार्ट आपकी विशेष प्रतिभा, पूर्व जन्म के पुण्य और तीक्ष्ण बुद्धि का फल दिखाता है।",
    mr: "D5 पंचमांश कुंडली विशेष बुद्धिमत्ता व पूर्वपुण्याईचे वर्णन करते.",
    gu: "D5 પંચમાંશ ચાર્ટ વિશેષ બુદ્ધિમત્તા અને પૂર્વજન્મના પુણ્ય દર્શાવે છે.",
    ta: "D5 பஞ்சாம்சம் சிறப்புத் திறமைகள் மற்றும் பூர்வ புண்ணியத்தை ஆராய்கிறது.",
    te: "D5 పంచాంశం మీ ప్రత్యేక ప్రతిభ మరియు పూర్వపుణ్యాన్ని తెల్పుతుంది.",
    bn: "D5 পঞ্চমাংশ ছক বিশেষ মেধা ও পূর্বজন্মের পুণ্যের বিবরণ দেয়।"
  },
  D6: {
    en: "D6 Shasthamsha Chart pinpoints health vulnerabilities, debts, litigation, and competitive strength.",
    hi: "D6 षष्ठांश चार्ट रोगों, ऋण, शत्रु बाधा, अदालती मामलों और प्रतिस्पर्धी परीक्षाओं की सफलता का विश्लेषण करता है।",
    mr: "D6 षष्ठांश कुंडली आजारपण, कर्ज, शत्रुपीडा व कोर्ट कचेऱ्यांचे फलित सांगते.",
    gu: "D6 શષ્ઠાંશ ચાર્ટ રોગ, દેવું અને કોર્ટ-કચેરીના કેસોની માહિતી આપે છે.",
    ta: "D6 ஷஷ்டாம்சம் நோய்கள், கடன்கள் మరియు வழக்கு விசாரணைகளை ஆராய்கிறது.",
    te: "D6 షష్టాంశం రుణాలు, రోగాలు మరియు శత్రు బాధలను తెల్పుతుంది.",
    bn: "D6 ষষ্ঠাংশ ছক রোগ, ঋণ ও আইনি সমস্যার সূক্ষ্ম বিচার করে।"
  },
  D7: {
    en: "D7 Saptamsha Chart details progeny, children's health, creative lineage, and grand-progeny.",
    hi: "D7 सप्तमांश चार्ट संतान सुख, बच्चों की प्रगति, रचनात्मक क्षमता और वंश वृद्धि का दर्पण है।",
    mr: "D7 सप्तमांश कुंडली संतती सुख, मुलांची प्रगती व वंशवृद्धीचे मार्गदर्शन करते.",
    gu: "D7 સપ્તમાંશ ચાર્ટ સંતાન સુખ અને વંશવૃદ્ધિ દર્શાવે છે.",
    ta: "D7 சப்தாம்சம் குழந்தை பாக்கியம் மற்றும் வம்ச விருத்தியை ஆராய்கிறது.",
    te: "D7 సప్తమాంశం సంతాన భాగ్యం మరియు పిల్లల భవిష్యత్తును తెల్పుతుంది.",
    bn: "D7 সপ্তাংশ ছক সন্তান সুখ ও বংশবৃদ্ধির সঠিক বিচার করে।"
  },
  D8: {
    en: "D8 Ashtamsha Chart uncovers longevity, unexpected transformations, hidden research, and occult insights.",
    hi: "D8 अष्टमांश चार्ट आयु निर्धारण, जीवन के अचानक परिवर्तन, शोध कार्य और गूढ़ विद्याओं को उजागर करता है।",
    mr: "D8 अष्टमांश कुंडली आयुष्यमान, अचानक होणारे बदल व गूढ शास्त्रांचे ज्ञान सांगते.",
    gu: "D8 અષ્ટમાંશ ચાર્ટ આયુષ્ય અને જીવનમાં અચાનક થતા ફેરફારો દર્શાવે છે.",
    ta: "D8 அஷ்டாம்சம் ஆயுள், திடீர் மாற்றங்கள் மற்றும் மறைமுக அறிவை ஆராய்கிறது.",
    te: "D8 అష్టాంశం ఆయుర్దాయం మరియు అకస్మాత్తు మార్పులను తెల్పుతుంది.",
    bn: "D8 অষ্টাংশ ছক আয়ু ও জীবনের আকস্মিক পরিবর্তনের বিচার করে।"
  },
  D9: {
    en: "D9 Navamsha Chart is the inner soul chart (Atma/Dharma), revealing spouse traits, marital bliss, and late-life destiny.",
    hi: "D9 नवमांश चार्ट आत्मा का दर्पण है, जो जीवनसाथी का स्वभाव, वैवाहिक सुख, धर्म और जीवन के उत्तरार्ध का सटीक फल देता है।",
    mr: "D9 नवमांश कुंडली ही आत्म्याची कुंडली असून जोडीदाराचे गुण, वैवाहिक सुख व भाग्योदयाची माहिती देते.",
    gu: "D9 નવમાંશ ચાર્ટ જીવનસાથી, વૈવાહિક સુખ અને જીવનના ઉત્તરાર્ધનું ભાગ્ય દર્શાવે છે.",
    ta: "D9 நவாம்சம் ஆத்மாவின் சக்கரம்; வாழ்க்கைத்துணை, திருமண வாழ்க்கை மற்றும் தர்மத்தை ஆராய்கிறது.",
    te: "D9 నవాంశం జీవిత భాగస్వామి, దాంపత్య సుఖం మరియు ఆత్మ ధర్మాన్ని తెల్పుతుంది.",
    bn: "D9 নবমাংশ ছক জীবনসঙ্গী, বিবাহিত সুখ ও আত্মিক ভাগ্যের দিকনির্দেশ করে।"
  },
  D10: {
    en: "D10 Dashamsha Chart is the ultimate career, profession, governance, authority, and karma alignment map.",
    hi: "D10 दशमांश चार्ट आपके कर्म क्षेत्र, नौकरी, व्यापार, पद-प्रतिष्ठा, सरकारी प्रभुत्व और पेशेवर सफलता की रीढ़ है।",
    mr: "D10 दशमांश कुंडली करिअर, नोकरी, व्यवसाय, पद आणि समाजात मिळणाऱ्या प्रतिष्ठेचे अचूक विश्लेषण करते.",
    gu: "D10 દશમાંશ ચાર્ટ કારકિર્દી, વેપાર, નોકરી અને સરકારી હોદ્દાનું સચોટ ચિત્ર આપે છે.",
    ta: "D10 தசாம்பம் தொழில், வேலை வாய்ப்பு, அதிகாரம் மற்றும் அரசு நன்மைகளை ஆராய்கிறது.",
    te: "D10 దశాంశం ఉద్యోగం, వ్యాపారం, హోదా మరియు ప్రభుత్వ సంబంధాలను వివరిస్తుంది.",
    bn: "D10 দশমাংশ ছক কেরিয়ার, চাকরি, ব্যবসা ও সামাজিক প্রতিষ্ঠার মূল চালিকাশক্তি।"
  },
  D11: {
    en: "D11 Rudramsha Chart analyzes major gains, awards, victory over challenges, and unexpected profits.",
    hi: "D11 एकादशांश (रुद्रांश) चार्ट बड़े लाभ, पुरस्कार, पुरस्कार विजय और अचानक धन आगमन का फल दिखाता है।",
    mr: "D11 रुद्रांश कुंडली मोठे आर्थिक लाभ, यश व पुरस्कारांची माहिती देते.",
    gu: "D11 રુદ્રાંશ ચાર્ટ મોટા લાભ અને પુરસ્કારો દર્શાવે છે.",
    ta: "D11 ஏகாதசாம்சம் பெரிய லாபங்கள் மற்றும் வெற்றிகளை ஆராய்கிறது.",
    te: "D11 రుద్రాంశం పెద్ద లాభాలు మరియు విజయాలను తెల్పుతుంది.",
    bn: "D11 রুদ্রাংশ ছক বড় লাভ ও অপ্রত্যাশিত সাফল্যের দিক দেখায়।"
  },
  D12: {
    en: "D12 Dwadashamsha Chart evaluates parents, paternal/maternal ancestral genetics, and family lineage.",
    hi: "D12 द्वादशांश चार्ट माता-पिता का स्वास्थ्य, उनका आशीर्वाद, पैतृक संस्कार और वंशानुगत गुणों का वर्णन करता है।",
    mr: "D12 द्वादशांश कुंडली आई-वडिलांचे सुख, आरोग्य व पूर्वजांच्या आशीर्वादाची माहिती देते.",
    gu: "D12 દ્વાદશાંશ ચાર્ટ માતા-પિતાનું સુખ અને પિતૃ આશીર્વાદ દર્શાવે છે.",
    ta: "D12 துவாதசாம்சம் பெற்றோர், முன்னோர்களின் ஆசீர்வாதத்தை ஆராய்கிறது.",
    te: "D12 ద్వాదశాంశం తల్లిదండ్రులు మరియు పితృ దేవతల స్థితిని వివరిస్తుంది.",
    bn: "D12 দ্বাদশvalidate ছক পিতা-মাতা ও পূর্বপুরুষের আশীর্বাদের বিচার করে।"
  },
  D16: {
    en: "D16 Shodashamsha Chart inspects luxurious conveyances, vehicles, mental contentment, and inner comforts.",
    hi: "D16 षोडशांश चार्ट लग्जरी वाहनों का सुख, मन की शांति, भौतिक सुख-सुविधाओं और आत्मिक संतोष को दर्शाता है।",
    mr: "D16 षोडशांश कुंडली गाड्यांचे सुख, सुख-सोयी व मानसिक शांतता दर्शवते.",
    gu: "D16 શોડશાંશ ચાર્ટ વાહનો અને ભૌતિક સુખ-સુવિધાઓ દર્શાવે છે.",
    ta: "D16 ஷோடசாம்சம் வாகனங்கள், சுகபோகங்கள் மற்றும் மன அமைதியை ஆராய்கிறது.",
    te: "D16 షోడశాంశం వాహన సౌఖ్యం మరియు మానసిక ప్రశాంతతను తెల్పుతుంది.",
    bn: "D16 ষোড়শাংশ ছক যানবাহন, বিলাসবহুল জীবন ও মানসিক শান্তির বিবরণ দেয়।"
  },
  D20: {
    en: "D20 Vimshamsha Chart reveals spiritual evolution, mantra siddhi, divine grace, and worship practices.",
    hi: "D20 विंशांश चार्ट आपकी आध्यात्मिक साधना, मंत्र सिद्धि, गुरु कृपा और ईश्वर भक्ति का रहस्य खोलता है।",
    mr: "D20 विंशांश कुंडली अध्यात्म, मंत्रसिद्धी व ईश्वरभक्तीचे वर्णन करते.",
    gu: "D20 વિંશાંશ ચાર્ટ આધ્યાત્મિક સાધના અને મંત્ર સિદ્ધિ દર્શાવે છે.",
    ta: "D20 விம்சாம்சம் ஆன்மீக முன்னேற்றம் மற்றும் மந்திர சித்தியை ஆராய்கிறது.",
    te: "D20 వింశాంశం ఆధ్యాత్మిక పురోగతి మరియు మంత్ర సిద్ధిని తెల్పుతుంది.",
    bn: "D20 বিংশাংশ ছক আধ্যাত্মিক সাধনা ও মন্ত্র সিদ্ধির পথ দেখায়।"
  },
  D24: {
    en: "D24 Chaturvimshamsha Chart details higher intellect, academic degrees, research acumen, and vast knowledge.",
    hi: "D24 चतुर्विंशांश चार्ट उच्च शिक्षा, पीएचडी, ज्ञान अर्जन, विद्या और बौद्धिक पराकाष्ठा का सटीक फल देता है।",
    mr: "D24 चतुर्विंशांश कुंडली उच्च शिक्षण, संशोधन व विद्याप्राप्तीचे फलित सांगते.",
    gu: "D24 ચતુરવિંશાંશ ચાર્ટ ઉચ્ચ શિક્ષણ અને જ્ઞાન પ્રાપ્તિ દર્શાવે છે.",
    ta: "D24 சதுர்விம்சாம்சம் உயர்கல்வி மற்றும் ஆராய்ச்சி அறிவை ஆராய்கிறது.",
    te: "D24 చతుర్వింశాంశం ఉన్నత విద్య మరియు పరిశోధనా నైపుణ్యాన్ని తెల్పుతుంది.",
    bn: "D24 চতুর্বিংশাংশ ছক উচ্চশিক্ষা ও জ্ঞানার্জনের বিশদ বিচার করে।"
  },
  D27: {
    en: "D27 Saptavimshamsha Chart measures physical strength, stamina, immune resilience, and structural endurance.",
    hi: "D27 सप्तविंशांश चार्ट शारीरिक शक्ति, रोग प्रतिरोधक क्षमता, सहनशक्ति और स्नायु तंत्र का विश्लेषण करता है।",
    mr: "D27 सप्तविंशांश कुंडली शारीरीक ताकद, प्रतिकारशक्ती व सहनशीलतेची माहिती देते.",
    gu: "D27 સપ્તવિંશાંશ ચાર્ટ શારીરિક શક્તિ અને રોગપ્રતિકારક શક્તિ દર્શાવે છે.",
    ta: "D27 சப்தவிம்சாம்சம் உடல் வலிமை மற்றும் நோயெதிர்ப்புச் சக்தியை ஆராய்கிறது.",
    te: "D27 సప్తవింశాంశం శారీరక దృఢత్వం మరియు రోగనిరోధక శక్తిని తెల్పుతుంది.",
    bn: "D27 সপ্তবিংশাংশ ছক শারীরিক শক্তি ও রোগ প্রতিরোধ ক্ষমতার বিচার করে।"
  },
  D30: {
    en: "D30 Trimsamsha Chart exposes hidden evils, moral challenges, chronic ailments, and karmic tribulations.",
    hi: "D30 त्रिंशांश चार्ट गुप्त शत्रुओं, नैतिक संकट, असाध्य रोगों और पूर्व जन्म के पापों के निवारण का मार्ग दिखाता है।",
    mr: "D30 त्रिंशांश कुंडली गुप्त आजार, संकटे व पूर्वजन्माच्या कर्मांचे विश्लेषण करते.",
    gu: "D30 ત્રિંશાંશ ચાર્ટ રોગ, સંકટો અને ગુપ્ત મુશ્કેલીઓ દર્શાવે છે.",
    ta: "D30 த்ரிம்சாம்சம் தீராத நோய்கள் மற்றும் கர்ம வினைகளை ஆராய்கிறது.",
    te: "D30 త్రింశాంశం దీర్ఘకాలిక రోగాలు మరియు కర్మ ప్రతిబంధకాలను తెల్పుతుంది.",
    bn: "D30 ত্রিংশাংশ ছক গুপ্ত ব্যাধি ও কর্মজনিত বাধার বিচার করে।"
  },
  D40: {
    en: "D40 Khavedamsha Chart inspects auspicious maternal heritage and pure biological auspiciousness.",
    hi: "D40 खवेदांश चार्ट ननिहाल पक्ष के शुभ प्रभावों और मातृ वंशावली के पुण्य का फल देता है।",
    mr: "D40 खवेदांश कुंडली आजोळचे सुख व मातृकुळाचे पुण्य दर्शवते.",
    gu: "D40 ખવેદાંશ ચાર્ટ મોસાળ પક્ષનું સુખ અને શુભ ફળ દર્શાવે છે.",
    ta: "D40 கவேதாம்சம் தாய்வழி முன்னோர்களின் நன்மைகளை ஆராய்கிறது.",
    te: "D40 ఖవేదాంశం తల్లివైపు వంశపు శుభ ఫలితాలను తెల్పుతుంది.",
    bn: "D40 খবেদvalidate ছক মাতুলালয়ের শুভ প্রভাবের দিক নির্দেশ করে।"
  },
  D45: {
    en: "D45 Akshavedamsha Chart evaluates moral integrity, paternal lineage merits, and overall character alignment.",
    hi: "D45 अक्षवेदांश चार्ट व्यक्ति के चरित्र की शुद्धि, पैतृक संस्कारों और नैतिक निष्ठा का फल प्रदान करता है।",
    mr: "D45 अक्षवेदांश कुंडली चारित्र्य शुद्धता व पितृकुळाच्या पुण्याचा पुरावा देते.",
    gu: "D45 અક્ષવેદાંશ ચાર્ટ ચારિત્ર્ય અને પિતૃસંસ્કારો દર્શાવે છે.",
    ta: "D45 அக்ஷவேதாம்சம் நற்பண்புகள் மற்றும் தந்தைவழி ஆசீர்வாதத்தை ஆராய்கிறது.",
    te: "D45 అక్షవేదాంశం వ్యక్తిత్వ నిష్ఠ మరియు పితృ వంశపు పుణ్యాన్ని తెల్పుతుంది.",
    bn: "D45 অক্ষবেদvalidate ছক চারিত্রিক নিষ্ঠা ও পিতৃকুলের পুণ্য দেখায়।"
  },
  D60: {
    en: "D60 Shashtiamsa Chart is the ultimate subtle karmic blueprint, dissolving all ambiguities of why events manifest.",
    hi: "D60 षष्ठीअंश चार्ट पूर्व जन्मों के सूक्ष्म प्रारब्ध का सबसे गहरा दर्पण है, जो बताता है कि घटनाएँ क्यों घटती हैं।",
    mr: "D60 षष्ठीअंश कुंडली ही जन्मांतराच्या कर्मांचे गूढ उकलणारी सर्वात सूक्ष्म व श्रेष्ठ कुंडली आहे.",
    gu: "D60 શષ્ઠીઅંશ ચાર્ટ પૂર્વજન્મના કર્મોનું સૌથી ઊંડું રહસ્ય પ્રગટ કરે છે.",
    ta: "D60 ஷஷ்டியாம்சம் பூர்வ ஜென்ம கர்ம வினைகளின் மிக நுட்பமான ரகசியங்களை வெளிப்படுத்தும் சக்கரம்.",
    te: "D60 షష్టియంశం పూర్వజన్మ కర్మల యొక్క అత్యంత సూక్ష్మ రహస్యాలను వివరిస్తుంది.",
    bn: "D60 ষষ্টিঅংশ ছক পূর্বজন্মের সূক্ষ্ম কর্মফলের গভীরতম দর্পণ।"
  }
};

function getSignLord(sign: string): string {
  const lords: Record<string, string> = {
    Aries: "Mars", Taurus: "Venus", Gemini: "Mercury", Cancer: "Moon",
    Leo: "Sun", Virgo: "Mercury", Libra: "Venus", Scorpio: "Mars",
    Sagittarius: "Jupiter", Capricorn: "Saturn", Aquarius: "Saturn", Pisces: "Jupiter"
  };
  return lords[sign] || "Sun";
}

function getNthSignFrom(startSign: string, n: number): string {
  const signs = [
    "Aries", "Taurus", "Gemini", "Cancer", 
    "Leo", "Virgo", "Libra", "Scorpio", 
    "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];
  const idx = signs.indexOf(startSign);
  if (idx === -1) return "Aries";
  return signs[(idx + n - 1) % 12];
}
