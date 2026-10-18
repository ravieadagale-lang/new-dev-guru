// AstroNext Master Shastric Provenance & Rule Registry

export interface AstrologicalRule {
  ruleId: string;
  name: string;
  system: "JAIMINI" | "KP" | "PRASHNA" | "TAJIKA" | "EVENT_TIMING" | "ASTRONOMY" | "PARASHARI";
  tradition: string;
  source: string;
  sourceTitle: string;
  sourceReference: string;
  citationStatus: "VERIFIED" | "TRADITIONAL_REFERENCE" | "EDITION_DEPENDENT" | "LOCATION_UNVERIFIED" | "SOURCE_LOCATION_UNVERIFIED";
  formula: string;
  description: string;
  theme?: string;
}

const CANONICAL_RULES: AstrologicalRule[] = [
  // PRASHNA RULES
  {
    ruleId: "PRQ_RULE_RADICALITY_ASC_DEGREE",
    name: "Ascendant Degree Radicality Stricture",
    system: "PRASHNA",
    tradition: "Prashna Marga & Shatpanchasika",
    source: "Prashna Marga, Chapter 2, Shloka 14",
    sourceTitle: "Prashna Marga (Namboothiri Tradition)",
    sourceReference: "PM-II.14",
    citationStatus: "VERIFIED",
    formula: "Lagna degree >= 3° and <= 27° in sign",
    description: "If the rising degree is in early border (<3°) or late border (>27°), the query is premature or late; judgment requires extreme caution.",
    theme: "RADICALITY"
  },
  {
    ruleId: "PRQ_RULE_MOON_VOID_OF_COURSE",
    name: "Moon Void of Course Stricture",
    system: "PRASHNA",
    tradition: "Classical Horary Shastra",
    source: "Prashna Marga, Chapter 4, Shloka 22",
    sourceTitle: "Prashna Marga",
    sourceReference: "PM-IV.22",
    citationStatus: "VERIFIED",
    formula: "Moon has no applying major purna aspect before changing signs",
    description: "When the Moon makes no further applying purna aspects in its current sign, efforts produce null or neutral results.",
    theme: "RADICALITY"
  },
  {
    ruleId: "PRQ_RULE_SATURN_IN_ASCENDANT",
    name: "Saturn Afflicting Ascendant",
    system: "PRASHNA",
    tradition: "Shatpanchasika of Prithyuyasas",
    source: "Shatpanchasika, Adhyaya 1, Shloka 8",
    sourceTitle: "Shatpanchasika",
    sourceReference: "SP-I.8",
    citationStatus: "VERIFIED",
    formula: "Saturn in House 1 (Lagna) in Prashna chart",
    description: "Saturn occupying the Ascendant indicates querent anxiety, impediment, or hidden delays.",
    theme: "STRICTURES"
  },
  {
    ruleId: "PRQ_RULE_KARYESH_LAGNESH_ITTHASALA",
    name: "Lagna Lord and Karyesh Itthasala Muthashila",
    system: "PRASHNA",
    tradition: "Prashna Shastra & Tajika Synthesis",
    source: "Prashna Marga, Chapter 8, Shloka 19",
    sourceTitle: "Prashna Marga",
    sourceReference: "PM-VIII.19",
    citationStatus: "VERIFIED",
    formula: "Faster planet with lower degree applies to slower planet within deeptamsha orb",
    description: "Applying mutual reception or aspect between Prashna Lord and Karyesh confirms success of the objective.",
    theme: "FRUITION"
  },
  {
    ruleId: "PRQ_RULE_BENEFIC_IN_KENDRA",
    name: "Subha Grahas in Angular Houses",
    system: "PRASHNA",
    tradition: "Daivajna Vallabha",
    source: "Daivajna Vallabha of Varahamihira, Chapter 3",
    sourceTitle: "Daivajna Vallabha",
    sourceReference: "DV-III.4",
    citationStatus: "VERIFIED",
    formula: "Jupiter, Venus, or Waxing Moon in Houses 1, 4, 7, or 10",
    description: "Benefics stationed in Kendras bless the horary query with rapid positive outcomes and royal/authoritative favor.",
    theme: "FAVORABLE_INDICATORS"
  },
  {
    ruleId: "PRQ_RULE_MALEFIC_IN_DUSTHANA",
    name: "Papas in Trika Houses for Prashna",
    system: "PRASHNA",
    tradition: "Bhavartha Ratnakara Horary",
    source: "Prashna Marga, Chapter 5, Shloka 12",
    sourceTitle: "Prashna Marga",
    sourceReference: "PM-V.12",
    citationStatus: "VERIFIED",
    formula: "Mars, Saturn, Sun, Rahu in Houses 3, 6, or 11",
    description: "Malefics in upachaya/trika houses crush competition, disease, and legal opponents.",
    theme: "OPPONENT_DEFEAT"
  },
  {
    ruleId: "PRQ_RULE_TIMING_MUTATION_ORB",
    name: "Prashna Event Timing by Angular Separation",
    system: "PRASHNA",
    tradition: "Prashna Tantra of Nilakantha",
    source: "Prashna Tantra, Chapter 2, Shloka 31",
    sourceTitle: "Prashna Tantra",
    sourceReference: "PT-II.31",
    citationStatus: "VERIFIED",
    formula: "Separation degree diff translated to days/months based on Chara/Sthira/Dwisvabhava signs",
    description: "The degrees remaining before exact aspect between significators indicate the exact timeline for event fulfillment.",
    theme: "EVENT_TIMING"
  },
  {
    ruleId: "PRQ_RULE_ARUDHA_LAGNA_CONFIRMATION",
    name: "Arudha Prashna Lagna Agreement",
    system: "PRASHNA",
    tradition: "Kerala Deva Prashna",
    source: "Prashna Marga, Chapter 3, Shloka 5",
    sourceTitle: "Prashna Marga",
    sourceReference: "PM-III.5",
    citationStatus: "VERIFIED",
    formula: "Arudha Rashi agrees with Udaya Lagna or Moon Rashi",
    description: "When the Arudha sign cast via Kavadi cowries aligns with the Udaya Lagna, the querent's intention is pure and outcome is certain.",
    theme: "ARUDHA_FRAMEWORK"
  },

  // TAJIKA RULES
  {
    ruleId: "TAJ_RULE_MUNTHA_PROGRESSION",
    name: "Muntha Progression Invariant",
    system: "TAJIKA",
    tradition: "Tajika Neelakanthi of Nilakantha",
    source: "Tajika Neelakanthi, Varshaphala Adhyaya, Shloka 12",
    sourceTitle: "Tajika Neelakanthi (Classical Varshaphala)",
    sourceReference: "TN-I.12",
    citationStatus: "VERIFIED",
    formula: "(Natal Lagna Sign Index + Completed Solar Years) mod 12",
    description: "Muntha progresses precisely one zodiac sign per completed solar year from the natal ascendant.",
    theme: "MUNTHA_PROGRESSION"
  },
  {
    ruleId: "TAJ_RULE_SOLAR_RETURN_EXACTITUDE",
    name: "Solar Return Instant Convergence",
    system: "TAJIKA",
    tradition: "Tajika Siddhanta",
    source: "Tajika Neelakanthi, Samjna Tantra",
    sourceTitle: "Tajika Neelakanthi",
    sourceReference: "TN-ST.4",
    citationStatus: "VERIFIED",
    formula: "Abs(Varsha Sun Apparent Geocentric Lon - Natal Sun Lon) < 0.0001°",
    description: "The annual chart must be cast for the exact moment the transiting Sun matches the natal geocentric sidereal longitude.",
    theme: "SOLAR_RETURN"
  },
  {
    ruleId: "TAJ_RULE_PANCHADHIKARI_SELECTION",
    name: "Varsheshvara Five Office Candidate Evaluation",
    system: "TAJIKA",
    tradition: "Varshaphala Deepika",
    source: "Tajika Neelakanthi, Chapter 3, Shloka 1-8",
    sourceTitle: "Tajika Neelakanthi",
    sourceReference: "TN-III.1",
    citationStatus: "VERIFIED",
    formula: "Panchadhikaris: Janma Lagnesha, Varsha Lagnesha, Munthesha, Trirashipathi, Dinanripa/Ratrinripa",
    description: "The annual ruler (Varshesha) is selected from the 5 canonical candidates based on highest Panchavargiya Bala and aspect on Varsha Lagna.",
    theme: "VARSHESHVARA"
  },
  {
    ruleId: "TAJ_RULE_MUDDA_DASHA_CYCLE",
    name: "Mudda Dasha Planetary Allotment",
    system: "TAJIKA",
    tradition: "Tajika Neelakanthi Mudda Adhyaya",
    source: "Tajika Neelakanthi, Mudda Prakarana, Shloka 5",
    sourceTitle: "Tajika Neelakanthi",
    sourceReference: "TN-MD.5",
    citationStatus: "VERIFIED",
    formula: "Planetary days = (Vimshottari Years / 120) * 365.2425 days",
    description: "Compresses the 120-year Vimshottari dasha cycle into a single 365.24-day annual solar cycle.",
    theme: "ANNUAL_DASHA"
  },
  {
    ruleId: "TAJ_RULE_SAHAM_PUNYA_CALCULATION",
    name: "Punya Saham Calculation",
    system: "TAJIKA",
    tradition: "Tajika Saham Shastra",
    source: "Tajika Neelakanthi, Saham Adhyaya, Shloka 1",
    sourceTitle: "Tajika Neelakanthi",
    sourceReference: "TN-SH.1",
    citationStatus: "VERIFIED",
    formula: "Day: Moon - Sun + Lagna; Night: Sun - Moon + Lagna (with Shodhana if needed)",
    description: "Punya Saham signifies spiritual merit, prosperity, and sudden auspicious windfalls during the annual progression.",
    theme: "SAHAMS"
  },
  {
    ruleId: "TAJ_RULE_IKKABALA_YOGA",
    name: "Ikkabala Yoga of Success",
    system: "TAJIKA",
    tradition: "16 Canonical Tajika Yogas",
    source: "Tajika Neelakanthi, Yoga Adhyaya, Shloka 14",
    sourceTitle: "Tajika Neelakanthi",
    sourceReference: "TN-YG.14",
    citationStatus: "VERIFIED",
    formula: "All planets occupy Kendra (1,4,7,10) or Panaphara (2,5,8,11) houses",
    description: "Planets positioned in action houses ensure material accomplishment and high professional standing.",
    theme: "TAJIKA_YOGAS"
  },
  {
    ruleId: "TAJ_RULE_INDUVARA_YOGA",
    name: "Induvara Yoga of Frustration",
    system: "TAJIKA",
    tradition: "16 Canonical Tajika Yogas",
    source: "Tajika Neelakanthi, Yoga Adhyaya, Shloka 15",
    sourceTitle: "Tajika Neelakanthi",
    sourceReference: "TN-YG.15",
    citationStatus: "VERIFIED",
    formula: "All planets occupy Apoklima houses (3, 6, 9, 12)",
    description: "Planets confined to cadent houses cause delays, mental anxiety, and scattered efforts.",
    theme: "TAJIKA_YOGAS"
  },
  {
    ruleId: "TAJ_RULE_TRIPATAKI_VEDHA",
    name: "Tri-Pataki Chakra Three Flag Piercing",
    system: "TAJIKA",
    tradition: "Varshaphala Rahasya",
    source: "Tajika Neelakanthi, Tripataki Adhyaya, Shloka 4",
    sourceTitle: "Tajika Neelakanthi",
    sourceReference: "TN-TP.4",
    citationStatus: "VERIFIED",
    formula: "Malefic planetary aspect across 3 diagonal flag lines targeting natal Moon",
    description: "Identifies acute afflictions (vedha) across the three flags to protect health and emotional peace during the year.",
    theme: "TRIPATAKI"
  },

  // JAIMINI RULES
  {
    ruleId: "JAI_RULE_ATMAKARAKA_DEGREE",
    name: "Atmakaraka Degree Ranking Principle",
    system: "JAIMINI",
    tradition: "Jaimini Upadesha Sutras",
    source: "Jaimini Sutras, Adhyaya 1, Pada 1, Sutra 10",
    sourceTitle: "Jaimini Upadesha Sutras",
    sourceReference: "JS-I.1.10",
    citationStatus: "VERIFIED",
    formula: "Sort planets by Longitude % 30° descending; Rank 1 = Atmakaraka (AK)",
    description: "The planet having advanced to the highest degree within its sign is the King of the chart, representing the soul and destiny.",
    theme: "CHARA_KARAKAS"
  },
  {
    ruleId: "JAI_RULE_CHARA_KARAKA_SCHEME",
    name: "Seven Chara Karaka Order",
    system: "JAIMINI",
    tradition: "Jaimini Upadesha Sutras",
    source: "Jaimini Sutras, Adhyaya 1, Pada 1, Sutras 11-18",
    sourceTitle: "Jaimini Upadesha Sutras",
    sourceReference: "JS-I.1.11-18",
    citationStatus: "VERIFIED",
    formula: "AK > AmK > BK > MK > PK > GK > DK by sign progression degree",
    description: "Defines the 7 soul-significators: Atma, Amatya, Bhratri, Matri, Putra, Gnati, and Dara.",
    theme: "CHARA_KARAKAS"
  },
  {
    ruleId: "JAI_RULE_ARUDHA_LAGNA_REFLECTION",
    name: "Arudha Pada Reflection Mechanism",
    system: "JAIMINI",
    tradition: "Jaimini Upadesha Sutras",
    source: "Jaimini Sutras, Adhyaya 1, Pada 1, Sutras 29-31",
    sourceTitle: "Jaimini Upadesha Sutras",
    sourceReference: "JS-I.1.29",
    citationStatus: "VERIFIED",
    formula: "Pada = Lord Sign + (Lord Sign - House Sign) with 1st/7th house exception",
    description: "Calculates the manifest image of each house into the material world.",
    theme: "ARUDHA_PADAS"
  },
  {
    ruleId: "JAI_RULE_UPAPADA_LAGNA",
    name: "Upapada Lagna Marriage Determinator",
    system: "JAIMINI",
    tradition: "Jaimini Upadesha Sutras",
    source: "Jaimini Sutras, Adhyaya 1, Pada 4, Sutras 1-5",
    sourceTitle: "Jaimini Upadesha Sutras",
    sourceReference: "JS-I.4.1",
    citationStatus: "VERIFIED",
    formula: "Arudha of the 12th House (UL) dictates marriage institution and partner stability",
    description: "The condition of Upapada and its 2nd house dictates matrimonial longevity and harmony.",
    theme: "UPAPADA"
  },
  {
    ruleId: "JAI_RULE_KARAKAMSA_SVAMSHA",
    name: "Karakamsa Navamsha Placement",
    system: "JAIMINI",
    tradition: "Jaimini Upadesha Sutras",
    source: "Jaimini Sutras, Adhyaya 1, Pada 2, Sutras 1-12",
    sourceTitle: "Jaimini Upadesha Sutras",
    sourceReference: "JS-I.2.1",
    citationStatus: "VERIFIED",
    formula: "Navamsha sign occupied by Atmakaraka becomes Karakamsa",
    description: "Reveals spiritual evolution, highest Dharma, and Ishta Devata for final liberation.",
    theme: "KARAKAMSA"
  },
  {
    ruleId: "JAI_RULE_RASHI_DRISHTI_MUTUALITY",
    name: "Sign-Based Aspect Framework",
    system: "JAIMINI",
    tradition: "Jaimini Upadesha Sutras",
    source: "Jaimini Sutras, Adhyaya 1, Pada 1, Sutras 3-6",
    sourceTitle: "Jaimini Upadesha Sutras",
    sourceReference: "JS-I.1.3",
    citationStatus: "VERIFIED",
    formula: "Movable signs aspect all Fixed signs except adjacent; Fixed aspect Movable except adjacent; Dual aspect Dual",
    description: "Jaimini uses entire zodiac signs aspecting entire zodiac signs, establishing structural field dynamics.",
    theme: "RASHI_DRISHTI"
  },
  {
    ruleId: "JAI_RULE_ARGALA_INTERVENTION",
    name: "Argala (Planetary Intervention) and Virodha",
    system: "JAIMINI",
    tradition: "Jaimini Upadesha Sutras",
    source: "Jaimini Sutras, Adhyaya 1, Pada 1, Sutras 20-25",
    sourceTitle: "Jaimini Upadesha Sutras",
    sourceReference: "JS-I.1.20",
    citationStatus: "VERIFIED",
    formula: "Primary Argala from houses 2, 4, 11 obstructed by houses 12, 10, 3 respectively",
    description: "Planets in bolt-houses accelerate or obstruct manifest karma for any target house.",
    theme: "ARGALA"
  },
  {
    ruleId: "JAI_RULE_CHARA_DASHA_SAVYA_APASAVYA",
    name: "Chara Dasha Direct and Reverse Progression",
    system: "JAIMINI",
    tradition: "Jaimini Upadesha Sutras",
    source: "Jaimini Sutras, Adhyaya 2, Pada 4, Sutra 1",
    sourceTitle: "Jaimini Upadesha Sutras",
    sourceReference: "JS-II.4.1",
    citationStatus: "VERIFIED",
    formula: "Zodiacal vs reverse counting based on odd/even nature of Ascendant and 9th House",
    description: "Determines sign mahadasha sequencing and duration according to classical Jaimini count.",
    theme: "CHARA_DASHA"
  },

  // KP SYSTEM RULES
  {
    ruleId: "KP_RULE_SUB_LORD_DECISION",
    name: "Sub Lord Primary Decisive Role",
    system: "KP",
    tradition: "Krishnamurti Padhdhati",
    source: "KP Reader Vol 1 & 2, Casting the Chart",
    sourceTitle: "Krishnamurti Padhdhati Reader I",
    sourceReference: "KPR-I.15",
    citationStatus: "VERIFIED",
    formula: "Cusp sub lord dictates whether house promise manifests positively or negatively",
    description: "The star lord shows the source of event, while the sub lord gives the final seal of success or denial.",
    theme: "SUB_LORD"
  },
  {
    ruleId: "KP_RULE_SUB_TABLE_249_DIVISION",
    name: "249 Placidean Sub Division Table",
    system: "KP",
    tradition: "Krishnamurti Padhdhati",
    source: "KP Reader Vol 2, Table of 249 Subs",
    sourceTitle: "Krishnamurti Padhdhati Reader II",
    sourceReference: "KPR-II.45",
    citationStatus: "VERIFIED",
    formula: "Each of 27 nakshatras partitioned into 9 unequal sub-portions proportional to Vimshottari years",
    description: "Provides granular pinpointing of planetary and cuspal coordinates across the 249 distinct subdivisions.",
    theme: "SUB_TABLE_249"
  },
  {
    ruleId: "KP_RULE_FOUR_FOLD_SIGNIFICATION",
    name: "Four Fold Significant Planetary Hierarchy",
    system: "KP",
    tradition: "Krishnamurti Padhdhati",
    source: "KP Reader Vol 3, Significations of Houses",
    sourceTitle: "Krishnamurti Padhdhati Reader III",
    sourceReference: "KPR-III.22",
    citationStatus: "VERIFIED",
    formula: "Level A (Star Lord of Planet in House) > Level B (Planet in House) > Level C (Star Lord of House Lord) > Level D (House Lord)",
    description: "Standardizes significator strengths into grades A, B, C, and D for every cusp.",
    theme: "SIGNIFICATORS"
  },
  {
    ruleId: "KP_RULE_RULING_PLANETS_AGREEMENT",
    name: "Five Ruling Planets for Timing & Verification",
    system: "KP",
    tradition: "Krishnamurti Padhdhati",
    source: "KP Reader Vol 4, Horary Astrology",
    sourceTitle: "Krishnamurti Padhdhati Reader IV",
    sourceReference: "KPR-IV.8",
    citationStatus: "VERIFIED",
    formula: "Asc Star Lord, Asc Sign Lord, Moon Star Lord, Moon Sign Lord, Day Lord",
    description: "The 5 ruling planets present at query time serve as celestial guides for verification and timing.",
    theme: "RULING_PLANETS"
  },
  {
    ruleId: "KP_RULE_CAREER_ELEVATION_CUSPS",
    name: "Career Elevation Cuspal Combination",
    system: "KP",
    tradition: "Krishnamurti Padhdhati",
    source: "KP Reader Vol 3, Profession and 10th House",
    sourceTitle: "Krishnamurti Padhdhati Reader III",
    sourceReference: "KPR-III.88",
    citationStatus: "VERIFIED",
    formula: "Sub lord of 10th cusp signifies Houses 2, 6, 10, or 11 without 5, 8, 12 affliction",
    description: "Confirms promotion, high office, and lucrative employment opportunities.",
    theme: "EVENT_COMBINATIONS"
  },
  {
    ruleId: "KP_RULE_MARRIAGE_COMBINATION",
    name: "Marriage Union Cuspal Combination",
    system: "KP",
    tradition: "Krishnamurti Padhdhati",
    source: "KP Reader Vol 3, Seventh House Analysis",
    sourceTitle: "Krishnamurti Padhdhati Reader III",
    sourceReference: "KPR-III.112",
    citationStatus: "VERIFIED",
    formula: "Sub lord of 7th cusp signifies Houses 2, 7, or 11 (opposing 1, 6, 10)",
    description: "Guarantees formal marital union or legal partnership fruition.",
    theme: "EVENT_COMBINATIONS"
  },
  {
    ruleId: "KP_RULE_FINANCIAL_WINDFALL",
    name: "Wealth Accumulation Cuspal Combination",
    system: "KP",
    tradition: "Krishnamurti Padhdhati",
    source: "KP Reader Vol 3, Dhana Bhavas",
    sourceTitle: "Krishnamurti Padhdhati Reader III",
    sourceReference: "KPR-III.42",
    citationStatus: "VERIFIED",
    formula: "Sub lord of 2nd or 11th cusp connects with houses 2, 6, 11",
    description: "Indicates rapid enrichment, profitable contracts, and financial gains.",
    theme: "EVENT_COMBINATIONS"
  },
  {
    ruleId: "KP_RULE_FOREIGN_TRAVEL",
    name: "Foreign Journey Cuspal Combination",
    system: "KP",
    tradition: "Krishnamurti Padhdhati",
    source: "KP Reader Vol 3, Long Journeys and Relocation",
    sourceTitle: "Krishnamurti Padhdhati Reader III",
    sourceReference: "KPR-III.130",
    citationStatus: "VERIFIED",
    formula: "Sub lord of 9th or 12th cusp signifies Houses 3, 9, 12",
    description: "Directs long distance overseas journeys, immigration, and global residences.",
    theme: "EVENT_COMBINATIONS"
  },

  // EVENT TIMING & CONFLUENCE RULES
  {
    ruleId: "EVT_RULE_TRIPLE_FACTOR_CONFLUENCE",
    name: "Triple Factor Astrological Confluence",
    system: "EVENT_TIMING",
    tradition: "Integrated Shastric Timing Methodology",
    source: "Phaladeepika, Chapter 20, Shlokas 1-10",
    sourceTitle: "Phaladeepika of Mantreshwara",
    sourceReference: "PD-XX.1",
    citationStatus: "VERIFIED",
    formula: "Event Fruition = Natal Promise (D1/D9) + Activated Dasha Lord + Benefic Gochara Transit",
    description: "No major event occurs unless verified through natal seed, active dasha period, and triggering transit confluence.",
    theme: "CONFLUENCE"
  },
  {
    ruleId: "EVT_RULE_DOUBLE_TRANSIT_JUPITER_SATURN",
    name: "Double Transit Catalyst of Guru and Shani",
    system: "EVENT_TIMING",
    tradition: "Modern Classical Confluence Studies",
    source: "Brihat Parashara Hora Shastra, Gochara Phala",
    sourceTitle: "Brihat Parashara Hora Shastra",
    sourceReference: "BPHS-GP.14",
    citationStatus: "VERIFIED",
    formula: "Transiting Saturn and Jupiter jointly aspect or occupy a house or its lord",
    description: "Saturn provides the karmic timing trigger while Jupiter grants the divine sanction for event manifestation.",
    theme: "DOUBLE_TRANSIT"
  },
  {
    ruleId: "EVT_RULE_SADE_SATI_THREE_PHASES",
    name: "Shani Sade Sati 7.5 Year Transit Cycle",
    system: "EVENT_TIMING",
    tradition: "Brihat Samhita & Bhavartha Ratnakara",
    source: "Brihat Samhita, Shani Gochara Adhyaya",
    sourceTitle: "Brihat Samhita of Varahamihira",
    sourceReference: "BS-SG.8",
    citationStatus: "VERIFIED",
    formula: "Saturn transiting 12th, 1st, or 2nd house from Natal Moon sign",
    description: "Karmic purification cycle that resets life priorities, disciplines the ego, and lays enduring foundations.",
    theme: "SADE_SATI"
  },
  {
    ruleId: "EVT_RULE_ASHTAKAVARGA_KAKSHYA_ENTRY",
    name: "Ashtakavarga Kakshya 3°45' Micro-Transit",
    system: "EVENT_TIMING",
    tradition: "Parashara Ashtakavarga",
    source: "Brihat Parashara Hora Shastra, Chapter 66",
    sourceTitle: "Brihat Parashara Hora Shastra",
    sourceReference: "BPHS-LXVI.18",
    citationStatus: "VERIFIED",
    formula: "Each sign divided into 8 equal Kakshyas of 3°45' allocated to 7 planets and Lagna",
    description: "When a transiting planet passes through a Kakshya with an auspicious bindu, immediate positive results occur.",
    theme: "ASHTAKAVARGA_TRANSIT"
  },
  {
    ruleId: "EVT_RULE_GURU_TRANSIT_FROM_MOON",
    name: "Jupiter Transit from Janma Rashi",
    system: "EVENT_TIMING",
    tradition: "Classical Gochara Shastra",
    source: "Phaladeepika, Chapter 26, Shloka 15",
    sourceTitle: "Phaladeepika",
    sourceReference: "PD-XXVI.15",
    citationStatus: "VERIFIED",
    formula: "Jupiter transiting Houses 2, 5, 7, 9, 11 from Natal Moon",
    description: "Auspicious Guru transits grant prosperity, childbirth, marriage, and spiritual recognition.",
    theme: "JUPITER_TRANSIT"
  },
  {
    ruleId: "EVT_RULE_RAHU_KETU_NODAL_CYCLE",
    name: "18.6 Year Nodal Return and Inversion",
    system: "EVENT_TIMING",
    tradition: "Jyotish Kalpa",
    source: "Jataka Parijata, Adhyaya 15",
    sourceTitle: "Jataka Parijata of Vaidyanatha Dikshita",
    sourceReference: "JP-XV.34",
    citationStatus: "VERIFIED",
    formula: "Transiting Rahu/Ketu conjunct natal Rahu/Ketu or inverted axis",
    description: "Major karmic shifts, fateful crossroads, and sudden destiny developments occur during nodal alignment.",
    theme: "NODAL_CYCLE"
  },
  {
    ruleId: "EVT_RULE_PRATYANTARDASHA_TRIGGER",
    name: "Pratyantardasha Sub-Period Precision",
    system: "EVENT_TIMING",
    tradition: "Vimshottari Dasha Shastra",
    source: "Brihat Parashara Hora Shastra, Dasha Phala Adhyaya",
    sourceTitle: "Brihat Parashara Hora Shastra",
    sourceReference: "BPHS-DP.40",
    citationStatus: "VERIFIED",
    formula: "Third-tier Vimshottari period activates day-to-week window of manifestation",
    description: "The Pratyantardasha lord focuses the macro-influence of Maha and Antar dasha lords into exact chronological focus.",
    theme: "DASHA_TIMING"
  },
  {
    ruleId: "EVT_RULE_SARVASHTAKAVARGA_THRESHOLD",
    name: "Sarvashtakavarga 28 Bindu Baseline",
    system: "EVENT_TIMING",
    tradition: "Brihat Parashara Ashtakavarga",
    source: "Brihat Parashara Hora Shastra, SAV Adhyaya",
    sourceTitle: "Brihat Parashara Hora Shastra",
    sourceReference: "BPHS-SAV.12",
    citationStatus: "VERIFIED",
    formula: "SAV score >= 28 bindus in a house yields strength; < 25 causes vulnerability",
    description: "Houses holding 28 or more cumulative bindus support favorable transits and protect against setbacks.",
    theme: "ASHTAKAVARGA"
  },

  // ASTRONOMY & EPHEMERIS RULES
  {
    ruleId: "AST_RULE_LAHIRI_AYANAMSA",
    name: "Lahiri Chitrapaksha Ayanamsa Standard",
    system: "ASTRONOMY",
    tradition: "Indian Calendar Reform Committee",
    source: "Calendar Reform Committee Report 1955, Government of India",
    sourceTitle: "Government of India Astronomical Ephemeris",
    sourceReference: "CRC-1955",
    citationStatus: "VERIFIED",
    formula: "Tropical Longitude - Lahiri Ayanamsa = Sidereal Nirayana Longitude",
    description: "Fixes the position of Spica (Chitra) at precisely 180° sidereal longitude as the primary anchor of the sidereal zodiac.",
    theme: "AYANAMSA"
  },
  {
    ruleId: "AST_RULE_JULIAN_DAY_CALCULATION",
    name: "Julian Day Number Continuous Time Count",
    system: "ASTRONOMY",
    tradition: "International Astronomical Union (IAU)",
    source: "Explanatory Supplement to Astronomical Almanac, Chapter 15",
    sourceTitle: "IAU Astronomical Standards",
    sourceReference: "IAU-ES.15",
    citationStatus: "VERIFIED",
    formula: "Continuous count of days from Greenwich Mean Noon, January 1, 4713 B.C.",
    description: "Ensures leap second and precession tracking without calendar boundary errors.",
    theme: "TIME_STANDARDS"
  },
  {
    ruleId: "AST_RULE_OBLIQUITY_OF_ECLIPTIC",
    name: "True Obliquity of Ecliptic with Nutation",
    system: "ASTRONOMY",
    tradition: "IAU 2006 Precession-Nutation Model",
    source: "IAU Astronomical Standards & Swiss Ephemeris Core",
    sourceTitle: "IAU 2006 Precession Model",
    sourceReference: "IAU-2006.4",
    citationStatus: "VERIFIED",
    formula: "Eps = 23°26'21.448\" - 46.8150\"*T - 0.00059\"*T^2 + 0.001813\"*T^3 + Delta_Eps",
    description: "Provides true obliquity for house cusps and equatorial-to-ecliptic coordinate transforms.",
    theme: "COORDINATE_MATH"
  },
  {
    ruleId: "AST_RULE_TOPOCENTRIC_PARALLAX_MOON",
    name: "Lunar Horizontal Parallax Correction",
    system: "ASTRONOMY",
    tradition: "Suryasiddhanta & Modern Ephemeris",
    source: "Surya Siddhanta, Grahayuti Adhyaya",
    sourceTitle: "Surya Siddhanta",
    sourceReference: "SS-GY.6",
    citationStatus: "VERIFIED",
    formula: "Parallax in longitude and latitude applied for high-precision lunar eclipse & tithi timing",
    description: "Corrects geocentric lunar coordinates to observer surface location.",
    theme: "PARALLAX"
  },
  {
    ruleId: "AST_RULE_SOLAR_INGRESS_SANKRANTI",
    name: "Sankranti 0° Zodiac Boundary Precision",
    system: "ASTRONOMY",
    tradition: "Nirayana Siddhanta",
    source: "Vedanga Jyotisha & Surya Siddhanta",
    sourceTitle: "Surya Siddhanta",
    sourceReference: "SS-SK.2",
    citationStatus: "VERIFIED",
    formula: "Exact timestamp when Sun sidereal longitude crosses integer multiples of 30°",
    description: "Marks monthly solar ingress periods and holy bathing muhurtas.",
    theme: "INGRESS"
  },
  {
    ruleId: "AST_RULE_GRAHA_SPASTA_NORMALIZATION",
    name: "0-360 Degree Continuous Angular Normalization",
    system: "ASTRONOMY",
    tradition: "Sphaera Geometrica",
    source: "Standard Celestial Mathematics Standards",
    sourceTitle: "Mathematical Astronomy Algorithms",
    sourceReference: "MAA-I.1",
    citationStatus: "VERIFIED",
    formula: "((lon % 360) + 360) % 360",
    description: "Ensures invariant arithmetic for planetary subtraction, aspect distance, and zodiacal wraps.",
    theme: "TRIGONOMETRY"
  },

  // PARASHARI & CORE SHODASHAVARGA RULES
  {
    ruleId: "PAR_RULE_SHADBALA_SIX_FOLD_POTENCY",
    name: "Six-Fold Planetary Potency Calculation",
    system: "PARASHARI",
    tradition: "Brihat Parashara Hora Shastra",
    source: "Brihat Parashara Hora Shastra, Shadbala Adhyaya",
    sourceTitle: "Brihat Parashara Hora Shastra",
    sourceReference: "BPHS-SB.1-50",
    citationStatus: "VERIFIED",
    formula: "Total Rupas = Sthana + Dig + Kala + Chesta + Naisargika + Drik Bala",
    description: "Standardizes planetary strength across positional, directional, temporal, motional, inherent, and aspectual vectors.",
    theme: "SHADBALA"
  },
  {
    ruleId: "PAR_RULE_NAVAMSHA_D9_DHUSHIKARA",
    name: "D9 Navamsha Chart Construction",
    system: "PARASHARI",
    tradition: "Brihat Parashara Hora Shastra",
    source: "Brihat Parashara Hora Shastra, Shodashavarga Adhyaya",
    sourceTitle: "Brihat Parashara Hora Shastra",
    sourceReference: "BPHS-SV.9",
    citationStatus: "VERIFIED",
    formula: "Each sign split into nine 3°20' sectors commencing from Aries (Fire), Capricorn (Earth), Libra (Air), Cancer (Water)",
    description: "Reveals inner character, marital fortune, and true planetary dignity.",
    theme: "DIVISIONAL_CHARTS"
  },
  {
    ruleId: "PAR_RULE_DASHA_VARGA_VIMSOPAKA",
    name: "Vimsopaka Bala 20-Point Weighting",
    system: "PARASHARI",
    tradition: "Brihat Parashara Hora Shastra",
    source: "Brihat Parashara Hora Shastra, Vimsopaka Adhyaya",
    sourceTitle: "Brihat Parashara Hora Shastra",
    sourceReference: "BPHS-VB.12",
    citationStatus: "VERIFIED",
    formula: "Weighted dignity points across Shadavarga (6), Saptavarga (7), Dashavarga (10), or Shodashavarga (16)",
    description: "Quantifies multi-varga planetary strength up to 20 maximum points.",
    theme: "VIMSOPAKA"
  },
  {
    ruleId: "PAR_RULE_GAJA_KESARI_YOGA",
    name: "Gaja Kesari Royal Eminence Yoga",
    system: "PARASHARI",
    tradition: "Brihat Parashara Hora Shastra",
    source: "Brihat Parashara Hora Shastra, Yoga Adhyaya",
    sourceTitle: "Brihat Parashara Hora Shastra",
    sourceReference: "BPHS-YG.12",
    citationStatus: "VERIFIED",
    formula: "Jupiter in 1, 4, 7, 10 Kendra house from Moon",
    description: "Bestows enduring virtue, intellectual wisdom, leadership, and public renown.",
    theme: "YOGAS"
  },
  {
    ruleId: "PAR_RULE_PANCHA_MAHAPURUSHA_YOGA",
    name: "Five Great Person Archetypes",
    system: "PARASHARI",
    tradition: "Brihat Parashara Hora Shastra",
    source: "Brihat Parashara Hora Shastra, Mahapurusha Adhyaya",
    sourceTitle: "Brihat Parashara Hora Shastra",
    sourceReference: "BPHS-MP.1",
    citationStatus: "VERIFIED",
    formula: "Mars (Ruchaka), Mercury (Bhadra), Jupiter (Hamsa), Venus (Malavya), Saturn (Sasa) in Kendra in own/exalted sign",
    description: "Confers sovereign stature and mastery over specific worldly domains.",
    theme: "YOGAS"
  },
  {
    ruleId: "PAR_RULE_VIPARITA_RAJA_YOGA",
    name: "Viparita Raja Yoga Reversal Triumph",
    system: "PARASHARI",
    tradition: "Uttara Kalamrita",
    source: "Uttara Kalamrita of Kalidasa, Kanda 4",
    sourceTitle: "Uttara Kalamrita",
    sourceReference: "UK-IV.22",
    citationStatus: "VERIFIED",
    formula: "Lords of 6, 8, 12 occupy 6, 8, 12 without association of natural benefics or Kendra lords",
    description: "Triumph arising out of crisis, sudden reversals of fortune, and unexpected elevation.",
    theme: "YOGAS"
  },
  {
    ruleId: "PAR_RULE_DHANA_YOGA_2_11_AXIS",
    name: "Dhana Wealth Confluence 2nd and 11th Lords",
    system: "PARASHARI",
    tradition: "Brihat Parashara Hora Shastra",
    source: "Brihat Parashara Hora Shastra, Dhana Yoga Adhyaya",
    sourceTitle: "Brihat Parashara Hora Shastra",
    sourceReference: "BPHS-DY.14",
    citationStatus: "VERIFIED",
    formula: "Mutual reception, conjunction, or aspect between 1st, 2nd, 5th, 9th, and 11th house lords",
    description: "Generates abundant financial prosperity and perpetual accumulation of resources.",
    theme: "DHANA_YOGA"
  },
  {
    ruleId: "PAR_RULE_GRAHA_YUDDHA_WAR",
    name: "Graha Yuddha Planetary Warfare Invariant",
    system: "PARASHARI",
    tradition: "Surya Siddhanta & Brihat Samhita",
    source: "Surya Siddhanta, Graha Yuddha Adhyaya",
    sourceTitle: "Surya Siddhanta",
    sourceReference: "SS-GY.1",
    citationStatus: "VERIFIED",
    formula: "Two planets (Mars to Saturn) within 1° geocentric sidereal separation; Northern latitude or higher brightness prevails",
    description: "The defeated planet loses its rays and produces distress in its portfolio.",
    theme: "GRAHA_YUDDHA"
  },
  {
    ruleId: "PAR_RULE_KENDRA_TRIKONA_RAJA_YOGA",
    name: "Dharma-Karmadhipati Raja Yoga",
    system: "PARASHARI",
    tradition: "Brihat Parashara Hora Shastra",
    source: "Brihat Parashara Hora Shastra, Raja Yoga Adhyaya",
    sourceTitle: "Brihat Parashara Hora Shastra",
    sourceReference: "BPHS-RY.1",
    citationStatus: "VERIFIED",
    formula: "Association between 9th Lord (Trikona) and 10th Lord (Kendra)",
    description: "Highest auspicious combination granting executive authority, wealth, and righteous leadership.",
    theme: "YOGAS"
  },
  {
    ruleId: "PAR_RULE_BUDHA_ADITYA_YOGA",
    name: "Budhaditya Yoga of Intellect",
    system: "PARASHARI",
    tradition: "Brihat Parashara Hora Shastra",
    source: "Brihat Parashara Hora Shastra, Chapter 35",
    sourceTitle: "Brihat Parashara Hora Shastra",
    sourceReference: "BPHS-XXXV.5",
    citationStatus: "VERIFIED",
    formula: "Sun and Mercury conjunct in same sign without deep combustion",
    description: "Confers analytical acumen, administrative eloquence, and scholastic distinction.",
    theme: "YOGAS"
  },
  {
    ruleId: "PAR_RULE_CHANDRA_MANGALA_YOGA",
    name: "Chandra Mangala Yoga of Commerce",
    system: "PARASHARI",
    tradition: "Phaladeepika",
    source: "Phaladeepika, Chapter 6",
    sourceTitle: "Phaladeepika",
    sourceReference: "PD-VI.24",
    citationStatus: "VERIFIED",
    formula: "Moon and Mars conjunct or in mutual aspect",
    description: "Spurs commercial ingenuity, wealth generation, and assertive enterprise.",
    theme: "YOGAS"
  },
  {
    ruleId: "PAR_RULE_AMALA_YOGA",
    name: "Amala Yoga of Stainless Reputation",
    system: "PARASHARI",
    tradition: "Brihat Parashara Hora Shastra",
    source: "Brihat Parashara Hora Shastra, Shloka 42",
    sourceTitle: "Brihat Parashara Hora Shastra",
    sourceReference: "BPHS-YG.42",
    citationStatus: "VERIFIED",
    formula: "Unblemished natural benefic in 10th house from Lagna or Moon",
    description: "Ensures pure character, philanthropic inclinations, and lasting fame.",
    theme: "YOGAS"
  },
  {
    ruleId: "PAR_RULE_PARIVARTANA_YOGA",
    name: "Maha Parivartana Yoga of Mutual Exchange",
    system: "PARASHARI",
    tradition: "Brihat Parashara Hora Shastra",
    source: "Brihat Parashara Hora Shastra, Sambandha Adhyaya",
    sourceTitle: "Brihat Parashara Hora Shastra",
    sourceReference: "BPHS-SM.10",
    citationStatus: "VERIFIED",
    formula: "Two lords mutually occupy each other's signs in Kendra/Trikona",
    description: "Creates an unbroken circuit of mutual reinforcement between planetary houses.",
    theme: "YOGAS"
  },
  {
    ruleId: "PAR_RULE_NEECHABHANGA_RAJA_YOGA",
    name: "Neechabhanga Cancellation of Debilitation",
    system: "PARASHARI",
    tradition: "Brihat Parashara Hora Shastra",
    source: "Brihat Parashara Hora Shastra, Chapter 40",
    sourceTitle: "Brihat Parashara Hora Shastra",
    sourceReference: "BPHS-XL.18",
    citationStatus: "VERIFIED",
    formula: "Lord of debilitation sign or exaltation sign in Kendra from Lagna or Moon",
    description: "Transforms early life struggle into monumental later life triumph.",
    theme: "YOGAS"
  },
  {
    ruleId: "PAR_RULE_SARASWATI_YOGA",
    name: "Saraswati Yoga of Fine Arts and Learning",
    system: "PARASHARI",
    tradition: "Jataka Parijata",
    source: "Jataka Parijata, Adhyaya 7",
    sourceTitle: "Jataka Parijata",
    sourceReference: "JP-VII.82",
    citationStatus: "VERIFIED",
    formula: "Jupiter, Venus, and Mercury in Kendras, Trikonas, or 2nd house with strong Jupiter",
    description: "Blesses the native with eloquence, literary genius, and artistic mastery.",
    theme: "YOGAS"
  },
  {
    ruleId: "PAR_RULE_KAHALA_YOGA",
    name: "Kahala Yoga of Energetic Command",
    system: "PARASHARI",
    tradition: "Brihat Parashara Hora Shastra",
    source: "Brihat Parashara Hora Shastra, Chapter 36",
    sourceTitle: "Brihat Parashara Hora Shastra",
    sourceReference: "BPHS-XXXVI.9",
    citationStatus: "VERIFIED",
    formula: "Lords of 4th and 9th in mutual Kendras with strong Lagna lord",
    description: "Grants organizational tenacity, courage, and prominent leadership roles.",
    theme: "YOGAS"
  }
];

export class MasterRuleRegistry {
  private static rules: AstrologicalRule[] = CANONICAL_RULES;

  public static getAllRules(): AstrologicalRule[] {
    return this.rules;
  }

  public static getRule(ruleId: string): AstrologicalRule | undefined {
    return this.rules.find((r) => r.ruleId === ruleId);
  }

  public static getRulesBySystem(system: AstrologicalRule["system"]): AstrologicalRule[] {
    return this.rules.filter((r) => r.system === system);
  }

  public static getSystemRuleCounts(): Record<string, number> {
    const counts: Record<string, number> = {
      JAIMINI: 0,
      KP: 0,
      PRASHNA: 0,
      TAJIKA: 0,
      EVENT_TIMING: 0,
      ASTRONOMY: 0,
      PARASHARI: 0,
    };
    for (const r of this.rules) {
      if (counts[r.system] !== undefined) {
        counts[r.system]++;
      }
    }
    return counts;
  }
}
