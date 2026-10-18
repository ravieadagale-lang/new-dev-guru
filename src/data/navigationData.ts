export interface NavSubItem {
  id: string;
  label: string;
  description?: string;
  badge?: string;
}

export interface NavSystemGroup {
  id: string;
  title: string;
  tag?: string;
  items: NavSubItem[];
}

export interface NavMenuItem {
  id: string;
  label: string;
  description?: string;
  hasDropdown?: boolean;
  systemGroups?: NavSystemGroup[];
  directItems?: NavSubItem[];
}

// 1. ASTROLOGY SYSTEM SELECTOR GROUPS
export const ASTROLOGY_SYSTEMS: NavSystemGroup[] = [
  {
    id: "vedic",
    title: "Vedic Astrology",
    tag: "Parashari Core",
    items: [
      { id: "birth_chart", label: "Birth Chart" },
      { id: "d1_rashi", label: "D1 Rashi" },
      { id: "divisional_charts", label: "Divisional Charts (D1–D60)" },
      { id: "planetary_positions", label: "Planetary Positions & Degrees" },
      { id: "houses_bhavas", label: "Houses & Bhavas" },
      { id: "nakshatra", label: "Nakshatra" },
      { id: "yogas", label: "Yogas" },
      { id: "doshas", label: "Doshas" },
      { id: "dashas", label: "Dashas (Vimshottari)" },
      { id: "shadbala", label: "Shadbala & Bhava Bala" },
      { id: "ashtakavarga", label: "Ashtakavarga" },
      { id: "transits", label: "Transits (Gochara)" },
      { id: "remedies", label: "Remedies & Gemstones" },
      { id: "btr", label: "Birth Time Rectification" },
      { id: "reports", label: "Astrology Reports" },
    ]
  },
  {
    id: "prashna",
    title: "Prashna Kundali",
    tag: "Horary Engine",
    items: [
      { id: "new_prashna", label: "New Prashna" },
      { id: "prashna_chart", label: "Prashna Chart" },
      { id: "question_categories", label: "Question Categories" },
      { id: "house_analysis", label: "House Analysis" },
      { id: "planet_analysis", label: "Planet Analysis" },
      { id: "prashna_timing", label: "Timing of Events" },
      { id: "event_outcome", label: "Event Outcome" },
      { id: "prashna_history", label: "Prashna History" },
      { id: "prashna_report", label: "Prashna Report" },
    ]
  },
  {
    id: "kp",
    title: "KP Astrology",
    tag: "Placidus Cusps",
    items: [
      { id: "kp_chart", label: "KP Chart" },
      { id: "kp_cusps", label: "Cusps & Degrees" },
      { id: "sign_star_sub", label: "Sign / Star / Sub Lord" },
      { id: "sub_sub_lord", label: "Sub-Sub Lord" },
      { id: "significators", label: "Significators (A, B, C, D)" },
      { id: "ruling_planets", label: "Ruling Planets (RP)" },
      { id: "event_houses", label: "Event Houses" },
      { id: "promise_denial", label: "Promise / Denial" },
      { id: "kp_timing", label: "KP Timing" },
      { id: "kp_horary", label: "KP Horary" },
      { id: "kp_reports", label: "KP Reports" },
    ]
  },
  {
    id: "jaimini",
    title: "Jaimini Sutras",
    tag: "Sign Aspects",
    items: [
      { id: "chara_karakas", label: "Chara Karakas (7/8)" },
      { id: "atmakaraka", label: "Atmakaraka (Soul)" },
      { id: "amatya_dara", label: "Amatya & Darakaraka" },
      { id: "karakamsha", label: "Karakamsha & Swamsha" },
      { id: "arudha_lagna", label: "Arudha Lagna (AL)" },
      { id: "arudha_padas", label: "Arudha Padas (A1–A12)" },
      { id: "upapada", label: "Upapada Lagna (UL)" },
      { id: "argala", label: "Argala & Virodhargala" },
      { id: "rashi_drishti", label: "Rashi Drishti (Aspects)" },
      { id: "jaimini_dashas", label: "Chara Dasha" },
      { id: "jaimini_yogas", label: "Jaimini Yogas" },
      { id: "jaimini_reports", label: "Jaimini Reports" },
    ]
  },
  {
    id: "tajika",
    title: "Tajika / Varshaphala",
    tag: "Solar Return",
    items: [
      { id: "solar_return", label: "Solar Return (Varsha Kundli)" },
      { id: "muntha", label: "Muntha & Muntha Lord" },
      { id: "varshapathi", label: "Varshapathi (Year Lord)" },
      { id: "tajika_aspects", label: "Tajika Aspects (16 Yogas)" },
      { id: "mudda_dasha", label: "Mudda Dasha" },
      { id: "sahams", label: "20+ Sahams (Punya, etc.)" },
      { id: "panchavargiya_bala", label: "Panchavargiya & Harsha Bala" },
      { id: "masa_pravesha", label: "Masa Pravesha (Monthly)" },
      { id: "tajika_timing", label: "Event Timing & Annual Report" },
    ]
  },
  {
    id: "bnn",
    title: "BNN (Bhrigu Nandi Nadi)",
    tag: "Nadi Karma",
    items: [
      { id: "bnn_chart", label: "BNN Chart" },
      { id: "planetary_relationships", label: "Planetary Relationships" },
      { id: "planet_sequences", label: "Sign/Planet Sequences" },
      { id: "bnn_rules", label: "BNN Directional Rules (1-5-9)" },
      { id: "bnn_event_analysis", label: "Event Analysis" },
      { id: "bnn_timing", label: "Transit Timing (Saturn/Jupiter)" },
      { id: "bnn_reports", label: "BNN Reports & Provenance" },
    ]
  },
  {
    id: "lalkitab",
    title: "Lal Kitab",
    tag: "Remedial System",
    items: [
      { id: "lalkitab_chart", label: "Lal Kitab Chart (Fixed Bhavas)" },
      { id: "lk_house_analysis", label: "House Analysis & Sleeping Houses" },
      { id: "lk_planetary_effects", label: "Planetary Effects (Karka/Ghar)" },
      { id: "rin_debts", label: "Pitra Rin & Ancestral Debts" },
      { id: "lk_combinations", label: "Planetary Combinations" },
      { id: "lk_remedies", label: "Remedies & Farman" },
      { id: "lk_instructions", label: "Remedy Instructions & Precautions" },
      { id: "lk_reports", label: "Lal Kitab Reports" },
    ]
  }
];

// 2. CHINESE ASTROLOGY SUBMENUS
export const CHINESE_ASTROLOGY_ITEMS: NavSubItem[] = [
  { id: "dashboard", label: "Chinese Astrology Dashboard" },
  { id: "bazi", label: "BaZi / Four Pillars (Year, Month, Day, Hour)" },
  { id: "stems_branches", label: "Heavenly Stems & Earthly Branches" },
  { id: "yin_yang_elements", label: "Yin & Yang / Five Elements (Wu Xing)" },
  { id: "day_master", label: "Day Master & Hidden Stems" },
  { id: "ten_gods", label: "Ten Gods (Shi Shen) & Seasonal Strength" },
  { id: "combinations_clashes", label: "Combinations, Clashes, Harms & Punishments" },
  { id: "special_patterns", label: "Special Patterns & Useful God (Yong Shen)" },
  { id: "luck_pillars", label: "Luck Pillars (Da Yun) & Annual Timing" },
  { id: "chinese_compatibility", label: "Chinese Compatibility & Trines" },
  { id: "bazi_report", label: "Comprehensive BaZi Report" }
];

// 3. NUMEROLOGY SUBMENUS
export const NUMEROLOGY_ITEMS: NavSubItem[] = [
  { id: "dashboard", label: "Numerology Dashboard" },
  { id: "birth_date_analysis", label: "Birth Date Analysis & Life Path" },
  { id: "driver_conductor", label: "Driver Number (Mulank) & Conductor (Bhagyank)" },
  { id: "destiny_name_number", label: "Destiny Number & Name Number" },
  { id: "chaldean_pythagorean", label: "Chaldean & Pythagorean Numerology" },
  { id: "loshu_grid", label: "Lo Shu Grid & Planes" },
  { id: "compound_master_numbers", label: "Compound Numbers & Master Numbers (11, 22, 33)" },
  { id: "personal_cycles", label: "Personal Year, Personal Month & Day" },
  { id: "name_analysis", label: "Name Analysis & Spelling Optimization" },
  { id: "numerology_compatibility", label: "Numerology Compatibility" },
  { id: "applied_numbers", label: "Business Name, Mobile, Vehicle & Address Number" },
  { id: "numerology_reports", label: "Numerology Reports & Exports" }
];

// 4. TAROT SUBMENUS
export const TAROT_ITEMS: NavSubItem[] = [
  { id: "dashboard", label: "Tarot Dashboard & Deck Consecration" },
  { id: "daily_tarot", label: "Daily Tarot Card" },
  { id: "ask_question", label: "Ask a Question (1-Card, 3-Card, Yes/No)" },
  { id: "love_relationship", label: "Love & Relationship Reading" },
  { id: "career_finance", label: "Career, Finance & Decision Reading" },
  { id: "future_spreads", label: "Future Reading & Celtic Cross" },
  { id: "year_ahead", label: "12-Month Reading & Year Ahead Spread" },
  { id: "card_library", label: "Full 78-Card Esoteric Library (Major & Minor Arcana)" },
  { id: "spreads_directory", label: "Tarot Spreads Directory" },
  { id: "tarot_journal", label: "Tarot Journal & Saved Readings" },
  { id: "tarot_reports", label: "Tarot Reports" }
];

// 5. BABY NAME SUGGESTION SUBMENUS
export const BABY_NAME_ITEMS: NavSubItem[] = [
  { id: "dashboard", label: "Baby Name Dashboard" },
  { id: "birth_details", label: "Birth Details & Janmakshar" },
  { id: "nakshatra_pada", label: "Nakshatra & Pada Vibrations" },
  { id: "name_library", label: "Name Library (Boy, Girl, Unisex Names)" },
  { id: "meaning_origin", label: "Meaning, Origin & Cultural Etymology" },
  { id: "chaldean_number", label: "Chaldean Name Number" },
  { id: "driver_conductor_match", label: "Driver / Conductor Compatibility" },
  { id: "name_vibration", label: "Name Vibration & Harmonic Ranking" },
  { id: "compare_names", label: "Compare Names & Spelling Analysis" },
  { id: "saved_shortlist", label: "Saved Names & Family Shortlist" },
  { id: "baby_name_report", label: "Baby Name Astrological Report" }
];

// 6. VASTU SHASTRA SUBMENUS
export const VASTU_ITEMS: NavSubItem[] = [
  { id: "dashboard", label: "Vastu Dashboard" },
  { id: "home_vastu", label: "Home Vastu" },
  { id: "office_vastu", label: "Office & Commercial Vastu" },
  { id: "plot_vastu", label: "Plot Vastu & Land Energy" },
  { id: "room_direction", label: "Room & Direction Analysis (16 Zones)" },
  { id: "entrance_kitchen", label: "Entrance, Kitchen & Bedroom Vastu" },
  { id: "pooja_study", label: "Living Room, Pooja Room & Study Room" },
  { id: "vastu_doshas", label: "Vastu Doshas Identification" },
  { id: "vastu_remedies", label: "Vastu Remedies & Neutralization" },
  { id: "vastu_report", label: "Vastu Audit Report" },
  // Feng Shui subsection preserved
  { id: "fengshui_dashboard", label: "Feng Shui: Dashboard & Bagua Map", badge: "Feng Shui" },
  { id: "fengshui_elements", label: "Feng Shui: Five Elements & Remedies", badge: "Feng Shui" }
];

// 7. FACE READING SUBMENUS
export const FACE_READING_ITEMS: NavSubItem[] = [
  { id: "dashboard", label: "Face Reading Dashboard" },
  { id: "mukha_samudrika", label: "Mukha Samudrika Shastra" },
  { id: "face_structure", label: "Face Structure & Shapes" },
  { id: "facial_features", label: "Forehead, Eyes, Eyebrows & Nose" },
  { id: "mouth_chin_ears", label: "Mouth, Lips, Chin & Ears" },
  { id: "facial_marks", label: "Moles, Scars & Facial Marks" },
  { id: "san_ting", label: "San Ting (Heaven, Human, Earth Three Zones)" },
  { id: "twelve_palaces", label: "The 12 Palaces of Destiny (Shi Er Gong)" },
  { id: "five_elements_face", label: "Five Elements / Wu Xing Constitutional Types" },
  { id: "chinese_mianxiang", label: "Chinese Mian Xiang Physiognomy" },
  { id: "manual_builder", label: "Manual Face Reader & Camera Analysis" },
  { id: "face_reports", label: "Saved Reports & Face Reading Dossier" }
];

// 8. COMPATIBILITY SUBMENUS
export const COMPATIBILITY_ITEMS: NavSubItem[] = [
  { id: "dashboard", label: "Compatibility Dashboard" },
  { id: "marriage_compatibility", label: "Marriage & Relationship Compatibility" },
  { id: "ashta_koota", label: "Ashta Koota 36 Guna Milan" },
  { id: "nadi_bhakoot", label: "Nadi, Bhakoot & Gana Analysis" },
  { id: "manglik_dosha", label: "Manglik Dosha & Complete Cancellations" },
  { id: "d1_d9_synastry", label: "D1 Rashi & D9 Navamsha Synastry" },
  { id: "jaimini_kp_compatibility", label: "Jaimini Upapada & KP Cuspal Compatibility" },
  { id: "bnn_tajika_timing", label: "BNN Planetary Relationships & Tajika Timing" },
  { id: "chinese_bazi_compatibility", label: "Chinese Trine & BaZi Compatibility" },
  { id: "numerology_compatibility", label: "Numerology & Name Harmonics Match" },
  { id: "cross_system_evidence", label: "Cross-System Confluence & 5 Dimensions" },
  { id: "compatibility_report", label: "Comprehensive Compatibility Report" }
];

// 9. CONSULTATION SUBMENUS
export const CONSULTATION_ITEMS: NavSubItem[] = [
  { id: "home", label: "Consultation Home" },
  { id: "find_expert", label: "Find an Expert Acharya" },
  { id: "astrology_consultation", label: "Vedic Astrology Consultation" },
  { id: "tarot_consultation", label: "Tarot Master Reading" },
  { id: "vastu_consultation", label: "Vastu & Energy Consultation" },
  { id: "book_session", label: "Book Instant / Scheduled Session" },
  { id: "upcoming_sessions", label: "Upcoming Sessions" },
  { id: "past_sessions", label: "Past Sessions & Call History" },
  { id: "consultation_notes", label: "Consultation Notes & Transcripts" },
  { id: "expert_reports", label: "Prescribed Reports & Remedies" },
  { id: "messages_support", label: "Messages & Support" }
];

// 10. MARKETPLACE SUBMENUS
export const MARKETPLACE_ITEMS: NavSubItem[] = [
  { id: "home", label: "Marketplace Home" },
  { id: "ebooks", label: "Vedic eBooks & Scriptures" },
  { id: "gemstones", label: "Lab-Certified Gemstones (Ratna)" },
  { id: "rudraksha", label: "Authentic Mukhi Rudraksha" },
  { id: "yantras", label: "Energized Copper & Gold Yantras" },
  { id: "reports", label: "Custom Astrology & Kundli Reports" },
  { id: "spiritual_products", label: "Spiritual Artifacts & Mala" },
  { id: "featured_products", label: "Featured & Best Sellers" },
  { id: "wishlist", label: "Saved Wishlist" },
  { id: "cart_orders", label: "Cart & Order History" },
  { id: "digital_library", label: "My Digital Purchases" }
];

// 11. SECONDARY (SACRED SANCTUARY) SUBMENUS
export const PANCHANG_SUBITEMS: NavSubItem[] = [
  { id: "panchang_core", label: "Panchang Almanac (Tithi, Vara, Nakshatra, Yoga, Karana)" },
  { id: "sun_moon_timings", label: "Sunrise, Sunset, Moonrise & Moonset" },
  { id: "choghadiya", label: "Day & Night Choghadiya Cycles" },
  { id: "hora_gowri", label: "Planetary Hora & Gowri Panchangam" },
  { id: "inauspicious_windows", label: "Rahu Kalam, Yamaganda, Gulika & Durmuhurta" },
  { id: "shubh_muhurat", label: "Abhijit Muhurat & Auspicious Windows" },
  { id: "tarabalam_chandrabalam", label: "Tarabalam & Chandrabalam Strength" },
  { id: "activity_muhurat", label: "Activity Muhurats (Marriage, Griha Pravesh, Purchase)" }
];

export const MANTRAS_SUBITEMS: NavSubItem[] = [
  { id: "mantra_library", label: "Sacred Mantra Library" },
  { id: "deity_mantras", label: "Deity Mantras (Shiva, Vishnu, Devi, Ganesha)" },
  { id: "beej_mantras", label: "Planetary Beej Mantras (Navagraha)" },
  { id: "vedic_chants", label: "Vedic Suktams & Chants" },
  { id: "japa_counter", label: "Interactive 108 Japa Meditation Counter" },
  { id: "audio_visualizer", label: "Sacred Audio Visualizer & Chants" },
  { id: "ritual_guidance", label: "Puja Vidhi & Ritual Guidance" }
];
