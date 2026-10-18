import { DivisionalChartType } from "../types";

export interface VargaTechnicalIndicator {
  name: string;
  value: string;
  importance: "Critical" | "High" | "Medium";
}

export interface VargaChartInfo {
  id: DivisionalChartType;
  code: string;
  name: string;
  sanskritName: string;
  title: string;
  category: string;
  desc: string;
  significance: string;
  factor: number;
  classicalPurpose: string;
  vimsopakaWeight: number;       // Points out of 20 in Parashari Shodashavarga
  rulingDeities: string;
  microHarmonicArc: string;      // Span of each division (e.g., 30° / N)
  analysisLevel: "normal" | "advanced" | "both";
  keyPrinciples: string[];
  technicalIndicators: VargaTechnicalIndicator[];
}

export interface VargaCategoryGroup {
  id: string;
  name: string;
  sanskritName: string;
  iconName: string;
  color: string;
  description: string;
  tier: "standard" | "subtle_advanced";
  charts: VargaChartInfo[];
}

export const VARGA_CATEGORIES: VargaCategoryGroup[] = [
  {
    id: "foundation",
    name: "Foundation",
    sanskritName: "मूल / लग्न",
    iconName: "User",
    color: "from-amber-600 to-amber-700",
    tier: "standard",
    description: "Physical body, vitality, core personality, appearance and overall life path canvas.",
    charts: [
      {
        id: "D1",
        code: "D1",
        name: "D1 Rashi",
        sanskritName: "राशि चक्र (लग्न)",
        title: "Main Birth Chart (Lagna Kundli)",
        category: "Foundation",
        desc: "Main Birth Chart (Physical Life & Overall Destiny)",
        significance: "Physical body, vitality, core personality, baseline health, longevity and overall destiny canvas.",
        factor: 1,
        classicalPurpose: "Parashara Brihat Hora: The primary foundation chart through which all divisional vargas draw life energy.",
        vimsopakaWeight: 3.5,
        rulingDeities: "12 Rashis & Solar Zodiac Architecture",
        microHarmonicArc: "30°00'00\" per sign",
        analysisLevel: "both",
        keyPrinciples: [
          "Establishes basic planetary yogas and house ownerships",
          "Shows manifest physical conditions and external environment",
          "Baseline benchmark for all higher varga dignities"
        ],
        technicalIndicators: [
          { name: "Vimsopaka Bala", value: "3.5 / 20.0 Pts", importance: "Critical" },
          { name: "Primary Karaka", value: "Sun (Atma) & Lagnesha", importance: "Critical" },
          { name: "Divisional Resolution", value: "1:1 Macro Scale", importance: "Medium" }
        ]
      }
    ]
  },
  {
    id: "wealth",
    name: "Wealth",
    sanskritName: "धन / सम्पत्ति",
    iconName: "Coins",
    color: "from-emerald-600 to-emerald-700",
    tier: "standard",
    description: "Liquid finances, accumulated assets, financial stamina, earnings and monetary flow.",
    charts: [
      {
        id: "D2",
        code: "D2",
        name: "D2 Hora",
        sanskritName: "होरा चक्र",
        title: "Wealth & Prosperity Chart",
        category: "Wealth",
        desc: "Wealth, Finances, Assets & Income",
        significance: "Liquid capital, financial resilience, wealth accumulation capacity, treasury and prosperity potential.",
        factor: 2,
        classicalPurpose: "Divided into solar (Surya/Leo) and lunar (Chandra/Cancer) halves to assess self-earned vs. passive accumulated fortune.",
        vimsopakaWeight: 1.0,
        rulingDeities: "Pitrus (Ancestors) & Devas (Divine Energies)",
        microHarmonicArc: "15°00'00\" per Hora",
        analysisLevel: "both",
        keyPrinciples: [
          "Sun's Hora signifies self-created wealth, enterprise, and bold investments",
          "Moon's Hora signifies comfortable wealth, inheritance, public business, and liquid resources",
          "Benefics in Moon's Hora and Malefics in Sun's Hora yield immense prosperity"
        ],
        technicalIndicators: [
          { name: "Vimsopaka Bala", value: "1.0 / 20.0 Pts", importance: "High" },
          { name: "Dual Rulers", value: "Surya (Leo) & Chandra (Cancer)", importance: "Critical" },
          { name: "Optimal Planets", value: "Jupiter, Venus, Mercury", importance: "High" }
        ]
      }
    ]
  },
  {
    id: "siblings",
    name: "Siblings",
    sanskritName: "भ्रातृ / पराक्रम",
    iconName: "Users",
    color: "from-blue-600 to-blue-700",
    tier: "standard",
    description: "Brothers, sisters, courage, initiative, valor, vitality and short journeys.",
    charts: [
      {
        id: "D3",
        code: "D3",
        name: "D3 Drekkana",
        sanskritName: "द्रेष्काण चक्र",
        title: "Siblings & Courage Chart",
        category: "Siblings",
        desc: "Siblings, Courage, Vitality & Efforts",
        significance: "Younger and elder siblings, personal courage (Parakrama), drive, inner motivation and longevity nuances.",
        factor: 3,
        classicalPurpose: "Deciphering 3 equal parts of 10° each, revealing Mars energy and brotherly/sisterly harmony.",
        vimsopakaWeight: 1.0,
        rulingDeities: "Narada, Agastya & Durvasa Maharishis",
        microHarmonicArc: "10°00'00\" per Drekkana",
        analysisLevel: "both",
        keyPrinciples: [
          "1st Drekkana (0-10°): Governed by Narada — Sattvic, diplomatic initiatives",
          "2nd Drekkana (10-20°): Governed by Agastya — Rajasic, executive leadership",
          "3rd Drekkana (20-30°): Governed by Durvasa — Tamasic, aggressive breakthroughs"
        ],
        technicalIndicators: [
          { name: "Vimsopaka Bala", value: "1.0 / 20.0 Pts", importance: "High" },
          { name: "Primary Karaka", value: "Mars (Bhratru Karaka)", importance: "Critical" },
          { name: "Longevity Ayur-Khanda", value: "22nd Drekkana (Kharesha)", importance: "High" }
        ]
      }
    ]
  },
  {
    id: "property",
    name: "Property",
    sanskritName: "भूमि / सम्पदा",
    iconName: "Home",
    color: "from-amber-700 to-amber-800",
    tier: "standard",
    description: "Real estate, fixed assets, ancestral land, residences and permanent wealth.",
    charts: [
      {
        id: "D4",
        code: "D4",
        name: "D4 Chaturthamsha",
        sanskritName: "चतुर्थांश चक्र (तुरीयांश)",
        title: "Fixed Assets & Property Chart",
        category: "Property",
        desc: "Fixed Assets, Land, Home & Net Fortune",
        significance: "Ownership of real estate, houses, farmland, permanent ancestral holdings and fundamental domestic stability.",
        factor: 4,
        classicalPurpose: "Examines 4-fold division of 7°30' each for material stability and emotional roots.",
        vimsopakaWeight: 0.5,
        rulingDeities: "Sanaka, Sanandana, Sanatana & Sanatkumara",
        microHarmonicArc: "07°30'00\" per Chaturthamsha",
        analysisLevel: "both",
        keyPrinciples: [
          "Analyzes ownership of commercial and residential lands",
          "Reveals emotional peace (Sukh Bhava) derived from shelter",
          "Mars indicates land/soil; Venus indicates luxury architectural decor"
        ],
        technicalIndicators: [
          { name: "Vimsopaka Bala", value: "0.5 / 20.0 Pts", importance: "Medium" },
          { name: "Key Significators", value: "Mars, Saturn, Venus", importance: "High" },
          { name: "Key Houses", value: "4th & 9th Bhava Placements", importance: "High" }
        ]
      }
    ]
  },
  {
    id: "children",
    name: "Children",
    sanskritName: "संतान / प्रज्ञा",
    iconName: "Baby",
    color: "from-rose-500 to-rose-600",
    tier: "standard",
    description: "Progeny, child welfare, lineage continuation, creativity and intellectual legacy.",
    charts: [
      {
        id: "D7",
        code: "D7",
        name: "D7 Saptamsha",
        sanskritName: "सप्तांश चक्र",
        title: "Children & Progeny Chart",
        category: "Children",
        desc: "Children, Progeny & Creative Lineage",
        significance: "Conception, children's health, relationship with offspring, grandchildren and deep creative fruition.",
        factor: 7,
        classicalPurpose: "7-fold division of 4°17'8.5'' highlighting 5th house karmas of purva punya manifesting as lineage.",
        vimsopakaWeight: 0.5,
        rulingDeities: "Kshar, Ksheera, Dadhi, Ghrita, Ikshu, Rasa, Shuddhadaka",
        microHarmonicArc: "04°17'08.57\" per Saptamsha",
        analysisLevel: "both",
        keyPrinciples: [
          "Odd signs count forward; even signs count from 7th sign",
          "5th house in D7 reveals first child; 7th house indicates second child",
          "Jupiter's position in D7 dictates general progeny bliss (Santana Sukha)"
        ],
        technicalIndicators: [
          { name: "Vimsopaka Bala", value: "0.5 / 20.0 Pts", importance: "Medium" },
          { name: "Primary Karaka", value: "Jupiter (Guru Putra Karaka)", importance: "Critical" },
          { name: "Key Houses", value: "5th, 7th & 9th Bhavas", importance: "High" }
        ]
      }
    ]
  },
  {
    id: "marriage",
    name: "Marriage",
    sanskritName: "विवाह / धर्म",
    iconName: "HeartHandshake",
    color: "from-pink-600 to-pink-700",
    tier: "standard",
    description: "Spouse characteristics, marital harmony, inner soul purpose, dharma and post-marriage fortunes.",
    charts: [
      {
        id: "D9",
        code: "D9",
        name: "D9 Navamsha",
        sanskritName: "नवांश चक्र (धर्म चक्र)",
        title: "Spouse, Dharma & Soul Chart",
        category: "Marriage",
        desc: "Spouse, Marriage & Internal Soul Purpose",
        significance: "Crucial complement to D1: reveals true planetary strength (Bala), spouse temperament, marital endurance, and destiny after age 28-32.",
        factor: 9,
        classicalPurpose: "9-fold division of 3°20' matching Nakshatra Padas; Vargottama planets here gain immense strength.",
        vimsopakaWeight: 3.0,
        rulingDeities: "Deva (Divine), Nara (Human), Rakshasa (Demonic)",
        microHarmonicArc: "03°20'00\" per Navamsha (1 Nakshatra Pada)",
        analysisLevel: "both",
        keyPrinciples: [
          "2nd most powerful chart in Vedic astrology (3.0 Vimsopaka points)",
          "Planets in Pushkar Navamsha gain extraordinary auspiciousness",
          "Vargottama planets in D9 produce unfailing Raj Yoga results",
          "7th lord of D1 placed in D9 dictates marriage timing and partner's traits"
        ],
        technicalIndicators: [
          { name: "Vimsopaka Bala", value: "3.0 / 20.0 Pts", importance: "Critical" },
          { name: "Primary Karaka", value: "Venus (for men) & Jupiter (for women)", importance: "Critical" },
          { name: "Key Zones", value: "Pushkar Navamsha & Vargottama", importance: "Critical" }
        ]
      }
    ]
  },
  {
    id: "career",
    name: "Career",
    sanskritName: "कर्म / व्यवसाय",
    iconName: "Briefcase",
    color: "from-slate-700 to-slate-900",
    tier: "standard",
    description: "Profession, career trajectory, public standing, leadership authority, business and life mission.",
    charts: [
      {
        id: "D10",
        code: "D10",
        name: "D10 Dashamsha",
        sanskritName: "दशांश चक्र (कर्म चक्र)",
        title: "Career & Public Standing Chart",
        category: "Career",
        desc: "Career, Power, Profession & Karma",
        significance: "Career peak, executive status, business milestones, governmental authority, promotions and profession-related reputation.",
        factor: 10,
        classicalPurpose: "10-fold division of 3°00' analyzing 10th house karma and the native's impact upon society.",
        vimsopakaWeight: 1.5,
        rulingDeities: "10 Ashta-Digpalas (Indra, Agni, Yama, Varuna, Vayu, Kubera, etc.)",
        microHarmonicArc: "03°00'00\" per Dashamsha",
        analysisLevel: "both",
        keyPrinciples: [
          "Carries 1.5 Vimsopaka points — decisive for profession and promotions",
          "10th house and 10th lord in D10 reveal true occupational zenith",
          "Sun, Mars & Saturn placements determine leadership vs technical mastery"
        ],
        technicalIndicators: [
          { name: "Vimsopaka Bala", value: "1.5 / 20.0 Pts", importance: "Critical" },
          { name: "Primary Karaka", value: "Sun (Authority), Mercury (Skill), Saturn (Karma)", importance: "Critical" },
          { name: "Key Houses", value: "1st, 10th, 6th & 11th Bhavas", importance: "High" }
        ]
      }
    ]
  },
  {
    id: "parents",
    name: "Parents",
    sanskritName: "माता-पिता / वंश",
    iconName: "Shield",
    color: "from-indigo-600 to-indigo-700",
    tier: "standard",
    description: "Father, mother, ancestral blessings, genetic heritage and family karmic ties.",
    charts: [
      {
        id: "D12",
        code: "D12",
        name: "D12 Dwadashamsha",
        sanskritName: "द्वादशांश चक्र",
        title: "Parents & Lineage Chart",
        category: "Parents",
        desc: "Parents, Ancestral Heritage & Lineage",
        significance: "Health, longevity and relationship with parents, paternal/maternal ancestral blessings, and inherited genetic destiny.",
        factor: 12,
        classicalPurpose: "12-fold division of 2°30' linking the soul to ancestral debt (Pitr Rina) and heritage.",
        vimsopakaWeight: 0.5,
        rulingDeities: "12 Adityas & Ganesha Ancestral Protectors",
        microHarmonicArc: "02°30'00\" per Dwadashamsha",
        analysisLevel: "both",
        keyPrinciples: [
          "4th house in D12 signifies mother; 9th house signifies father",
          "Reveals hereditary health predispositions and genetic strengths",
          "Identifies Pitru Dosha or ancestral boons"
        ],
        technicalIndicators: [
          { name: "Vimsopaka Bala", value: "0.5 / 20.0 Pts", importance: "Medium" },
          { name: "Key Significators", value: "Sun (Father) & Moon (Mother)", importance: "Critical" },
          { name: "Key Houses", value: "4th & 9th Bhavas", importance: "High" }
        ]
      }
    ]
  },
  {
    id: "comfort",
    name: "Comfort",
    sanskritName: "सुख / वाहन",
    iconName: "Car",
    color: "from-teal-600 to-teal-700",
    tier: "standard",
    description: "Vehicles, conveyances, material luxuries, mental contentment and sensory pleasures.",
    charts: [
      {
        id: "D16",
        code: "D16",
        name: "D16 Shodashamsha",
        sanskritName: "षोडशांश चक्र (कलामंश)",
        title: "Vehicles & Comforts Chart",
        category: "Comfort",
        desc: "Vehicles, Material Comforts & Happiness",
        significance: "Automobiles, luxurious conveyances, travel safety, domestic bliss, mental peace and worldly ease.",
        factor: 16,
        classicalPurpose: "16-fold division of 1°52'30'' reflecting 4th house higher octaves of Sukha (contentment).",
        vimsopakaWeight: 0.5,
        rulingDeities: "Brahma, Vishnu, Shiva & Surya (Cyclic Quartet)",
        microHarmonicArc: "01°52'30\" per Shodashamsha",
        analysisLevel: "both",
        keyPrinciples: [
          "Examines luxury vehicles, comfort quotient, and mental peace",
          "Afflictions here point to vehicular accidents or inner restlessness",
          "Benefics in Kendra grant exceptional luxuries and peace of mind"
        ],
        technicalIndicators: [
          { name: "Vimsopaka Bala", value: "0.5 / 20.0 Pts", importance: "Medium" },
          { name: "Primary Karaka", value: "Venus (Luxuries) & Moon (Mental Peace)", importance: "High" },
          { name: "Key Houses", value: "4th Bhava (Conveyances)", importance: "High" }
        ]
      }
    ]
  },
  {
    id: "spirituality",
    name: "Spirituality",
    sanskritName: "आध्यात्म / उपासना",
    iconName: "Sparkles",
    color: "from-purple-600 to-purple-700",
    tier: "standard",
    description: "Spiritual evolution, meditation, mantra siddhi, Ishta Devata worship and bhakti.",
    charts: [
      {
        id: "D20",
        code: "D20",
        name: "D20 Vimshamsha",
        sanskritName: "विंशांश चक्र",
        title: "Spiritual Progress & Worship Chart",
        category: "Spirituality",
        desc: "Spiritual Progress, Worship & Mantras",
        significance: "Spiritual awakening, mantra effectiveness, sacred pilgrimage, guru grace and deep connection with the Divine.",
        factor: 20,
        classicalPurpose: "20-fold division of 1°30' evaluating 9th and 12th house soul evolution.",
        vimsopakaWeight: 0.5,
        rulingDeities: "20 Sacred Yoginis & Shakti Emanations",
        microHarmonicArc: "01°30'00\" per Vimshamsha",
        analysisLevel: "both",
        keyPrinciples: [
          "9th house in D20 reveals Ishta Devata (personal deity)",
          "5th house shows mantra chanting proficiency and past spiritual merits",
          "Jupiter and Ketu placements reveal liberation (Moksha) pathways"
        ],
        technicalIndicators: [
          { name: "Vimsopaka Bala", value: "0.5 / 20.0 Pts", importance: "High" },
          { name: "Primary Karaka", value: "Jupiter (Guru) & Ketu (Moksha Karaka)", importance: "Critical" },
          { name: "Key Houses", value: "5th, 9th & 12th Bhavas", importance: "High" }
        ]
      }
    ]
  },
  {
    id: "education",
    name: "Education",
    sanskritName: "विद्या / ज्ञान",
    iconName: "GraduationCap",
    color: "from-amber-600 to-amber-700",
    tier: "standard",
    description: "Academic success, intellect, higher learning, scholarly pursuits, memorization and wisdom.",
    charts: [
      {
        id: "D24",
        code: "D24",
        name: "D24 Chaturvimshamsha",
        sanskritName: "चतुर्विंशांश चक्र (सिद्धांश)",
        title: "Higher Learning & Intellect Chart",
        category: "Education",
        desc: "Higher Learning, Education & Intellect",
        significance: "Academic excellence, university degrees, competitive examinations, scholarly publications and sharp analytical intellect.",
        factor: 24,
        classicalPurpose: "24-fold division of 1°15' testing Mercury and Jupiter wisdom quotients.",
        vimsopakaWeight: 0.5,
        rulingDeities: "Skanda, Parashudhara, Ananta & Vayu",
        microHarmonicArc: "01°15'00\" per Siddhamsa",
        analysisLevel: "both",
        keyPrinciples: [
          "Evaluates higher degrees, research capability, and scholarly achievements",
          "Mercury placement reveals analytical retention; Jupiter provides conceptual wisdom",
          "4th and 5th house lords in D24 indicate competitive exam success"
        ],
        technicalIndicators: [
          { name: "Vimsopaka Bala", value: "0.5 / 20.0 Pts", importance: "High" },
          { name: "Primary Karaka", value: "Mercury (Buddhi) & Jupiter (Jnana)", importance: "Critical" },
          { name: "Key Houses", value: "4th & 5th Bhavas", importance: "High" }
        ]
      }
    ]
  },
  {
    id: "advanced",
    name: "Advanced",
    sanskritName: "सूक्ष्म वर्ग / प्रारब्ध",
    iconName: "Compass",
    color: "from-slate-900 to-amber-950",
    tier: "subtle_advanced",
    description: "Deep subtle vargas covering physical immunity, health arishta, maternal/paternal karma, and root past-life prarabdha (D27, D30, D40, D45, D60).",
    charts: [
      {
        id: "D27",
        code: "D27",
        name: "D27 Saptavimshamsha",
        sanskritName: "सप्तविंशांश चक्र (भांश)",
        title: "Physical Strengths & Immunity",
        category: "Advanced",
        desc: "Physical Immunity, Strengths & Endurance",
        significance: "Physical vitality, immune resilience, subconscious strengths, mental stamina and vulnerability to fatigue.",
        factor: 27,
        classicalPurpose: "27-fold division corresponding to the 27 Nakshatras.",
        vimsopakaWeight: 0.5,
        rulingDeities: "27 Nakshatra Divine Regents",
        microHarmonicArc: "01°06'40\" per Bhamsa",
        analysisLevel: "advanced",
        keyPrinciples: [
          "Maps planetary connections directly to the 27 stellar mansions",
          "Indicates innate physical endurance, stamina, and subtle vulnerabilities",
          "Mars and Sun placements indicate physical recuperative power"
        ],
        technicalIndicators: [
          { name: "Vimsopaka Bala", value: "0.5 / 20.0 Pts", importance: "Medium" },
          { name: "Key Focus", value: "Subconscious Stamina & Immunity", importance: "High" },
          { name: "Primary Karakas", value: "Sun & Mars", importance: "High" }
        ]
      },
      {
        id: "D30",
        code: "D30",
        name: "D30 Trimsamsha",
        sanskritName: "त्रिंशांश चक्र (अरिष्ट चक्र)",
        title: "Health Obstacles & Arishta",
        category: "Advanced",
        desc: "Health, Obstacles, Misfortunes & Sins",
        significance: "Medical vulnerabilities, acute diseases, hidden enemies, sudden misfortunes, moral tests and karmic purification.",
        factor: 30,
        classicalPurpose: "Unequal planetary segment division ruled by Mars, Saturn, Jupiter, Mercury and Venus.",
        vimsopakaWeight: 1.0,
        rulingDeities: "Agni, Vayu, Indra, Varuna & Yama",
        microHarmonicArc: "Unequal Parashari Segments (5°, 5°, 8°, 7°, 5°)",
        analysisLevel: "advanced",
        keyPrinciples: [
          "Unequal divisions allocated specifically to 5 physical element lords (Pancha Mahabhutas)",
          "Sun and Moon have no lordship here — physical bodies undergo karmic trials",
          "Crucial for identifying incurable ailments and periods of misfortune"
        ],
        technicalIndicators: [
          { name: "Vimsopaka Bala", value: "1.0 / 20.0 Pts", importance: "High" },
          { name: "Key Focus", value: "Karmic Arishta & Disease Tendencies", importance: "Critical" },
          { name: "Pancha Bhutas", value: "Fire, Air, Ether, Water, Earth Lords", importance: "Critical" }
        ]
      },
      {
        id: "D40",
        code: "D40",
        name: "D40 Khavedamsha",
        sanskritName: "खवेदांश चक्र (चत्वारिंशांश)",
        title: "Maternal Lineage & Auspices",
        category: "Advanced",
        desc: "Maternal Lineage & Auspicious Auspices",
        significance: "Auspicious and inauspicious events, maternal ancestral blessings, emotional heritage and pure spiritual virtues.",
        factor: 40,
        classicalPurpose: "40-fold division of 45 arc-minutes evaluating auspicious karma.",
        vimsopakaWeight: 0.5,
        rulingDeities: "Vishnu, Chandra, Marichi & Tvastr (Repeated 10x)",
        microHarmonicArc: "00°45'00\" (45 arc-minutes)",
        analysisLevel: "advanced",
        keyPrinciples: [
          "Deep microscopic reading of maternal grandmother/grandfather lineage blessings",
          "Reveals subconscious auspicious fortunes that materialize effortlessly",
          "Moon and 4th house alignments dictate emotional serenity"
        ],
        technicalIndicators: [
          { name: "Vimsopaka Bala", value: "0.5 / 20.0 Pts", importance: "Medium" },
          { name: "Key Focus", value: "Maternal Karmic Heritage", importance: "High" },
          { name: "Primary Karaka", value: "Moon (Chandra)", importance: "High" }
        ]
      },
      {
        id: "D45",
        code: "D45",
        name: "D45 Akshavedamsha",
        sanskritName: "अक्षवेदांश चक्र",
        title: "Paternal Lineage & Character",
        category: "Advanced",
        desc: "Paternal Lineage & Character Alignment",
        significance: "Moral integrity, ethical character, paternal ancestral debts, truthfulness and dharmic purity.",
        factor: 45,
        classicalPurpose: "45-fold division of 40 arc-minutes evaluating supreme ethical balance.",
        vimsopakaWeight: 0.5,
        rulingDeities: "Brahma, Shiva & Vishnu (Repeated 15x)",
        microHarmonicArc: "00°40'00\" (40 arc-minutes)",
        analysisLevel: "advanced",
        keyPrinciples: [
          "Deep reading of paternal ancestral lineage (Pitru Vamsha)",
          "Evaluates supreme moral character, honesty, and ethical uprightness",
          "Reveals unshakeable core character under extreme worldly adversity"
        ],
        technicalIndicators: [
          { name: "Vimsopaka Bala", value: "0.5 / 20.0 Pts", importance: "Medium" },
          { name: "Key Focus", value: "Ethical Integrity & Paternal Karma", importance: "High" },
          { name: "Primary Karaka", value: "Sun (Surya)", importance: "High" }
        ]
      },
      {
        id: "D60",
        code: "D60",
        name: "D60 Shashtiamsa",
        sanskritName: "षष्ट्यंश चक्र (परम सूक्ष्म)",
        title: "Past-Life Roots & Prarabdha Karma",
        category: "Advanced",
        desc: "Past Life Karmic Roots & Deep Prarabdha",
        significance: "Supreme decisive varga: carries 4x weight in Vimsopaka Bala (4.0 / 20.0 pts). Explains why twins born minutes apart experience vastly different destinies.",
        factor: 60,
        classicalPurpose: "60-fold microscopic division of 30 arc-minutes, revealing root karmic imprints from previous incarnations.",
        vimsopakaWeight: 4.0,
        rulingDeities: "60 Specific Shashtiamsa Deities (Ghora, Rakshasa, Deva, Kula, Amrita, Sudha, Mrityu, Kalagni, etc.)",
        microHarmonicArc: "00°30'00\" (30 arc-minutes)",
        analysisLevel: "advanced",
        keyPrinciples: [
          "Highest weight in Parashari Shodashavarga (4.0 points — higher than D1 and D9!)",
          "Unlocks root causal karma (Sanchita and Prarabdha) brought into this birth",
          "Benefic Shashtiamsa deities give effortless genius; Malefic deities demand heavy purification",
          "Explains why twins born 2 minutes apart lead totally different lives"
        ],
        technicalIndicators: [
          { name: "Vimsopaka Bala", value: "4.0 / 20.0 Pts (Highest)", importance: "Critical" },
          { name: "Micro Resolution", value: "0.5° (30' arc per division)", importance: "Critical" },
          { name: "Classical Citation", value: "BPHS Chapter 6 Shloka 38-42", importance: "Critical" }
        ]
      }
    ]
  }
];

export const ALL_VARGA_CHARTS_LIST: VargaChartInfo[] = VARGA_CATEGORIES.flatMap(c => c.charts);

export const ALL_VARGA_CHARTS_MAP: Record<DivisionalChartType, VargaChartInfo> = ALL_VARGA_CHARTS_LIST.reduce((acc, chart) => {
  acc[chart.id] = chart;
  return acc;
}, {} as Record<DivisionalChartType, VargaChartInfo>);

export function getVargaCategoryByChartId(chartId: DivisionalChartType): VargaCategoryGroup | undefined {
  return VARGA_CATEGORIES.find(cat => cat.charts.some(c => c.id === chartId));
}

// Classical Vimsopaka Weightage Distribution Table
export const VIMSOPAKA_SCHEME_TABLE = [
  { code: "D1", name: "Rashi", weight: 3.5, domain: "Physical Body & Life Canvas" },
  { code: "D2", name: "Hora", weight: 1.0, domain: "Wealth & Treasury" },
  { code: "D3", name: "Drekkana", weight: 1.0, domain: "Siblings & Courage" },
  { code: "D4", name: "Chaturthamsha", weight: 0.5, domain: "Property & Fortune" },
  { code: "D7", name: "Saptamsha", weight: 0.5, domain: "Children & Progeny" },
  { code: "D9", name: "Navamsha", weight: 3.0, domain: "Spouse, Dharma & Soul" },
  { code: "D10", name: "Dashamsha", weight: 1.5, domain: "Career & Status" },
  { code: "D12", name: "Dwadashamsha", weight: 0.5, domain: "Parents & Lineage" },
  { code: "D16", name: "Shodashamsha", weight: 0.5, domain: "Vehicles & Comforts" },
  { code: "D20", name: "Vimshamsha", weight: 0.5, domain: "Spiritual Evolution" },
  { code: "D24", name: "Chaturvimshamsha", weight: 0.5, domain: "Higher Learning" },
  { code: "D27", name: "Saptavimshamsha", weight: 0.5, domain: "Physical Immunity" },
  { code: "D30", name: "Trimsamsha", weight: 1.0, domain: "Health Arishta & Evils" },
  { code: "D40", name: "Khavedamsha", weight: 0.5, domain: "Maternal Lineage" },
  { code: "D45", name: "Akshavedamsha", weight: 0.5, domain: "Paternal Lineage" },
  { code: "D60", name: "Shashtiamsa", weight: 4.0, domain: "Root Past Life Karma" }
];
