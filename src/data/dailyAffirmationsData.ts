// src/data/dailyAffirmationsData.ts
// Curated Sacred Vedic Affirmations, Upanishadic Mahavakyas & Positive Spiritual Daily Quotes

export interface SpiritualAffirmation {
  id: string;
  affirmation: string;
  sanskrit: string;
  transliteration: string;
  translation: string;
  source: string;
  category: "peace" | "abundance" | "strength" | "wisdom" | "healing" | "gratitude";
  categoryLabel: string;
  cosmicEnergy: string;
  seedMantra: string;
  themeDescription: string;
}

export const DAILY_AFFIRMATIONS: SpiritualAffirmation[] = [
  {
    id: "aff-1",
    affirmation: "I am infinite, luminous consciousness. Unmoved by transient storms, I rest in my eternal center.",
    sanskrit: "अहं ब्रह्मास्मि",
    transliteration: "Aham Brahmasmi",
    translation: "I am the Divine Infinite Consciousness.",
    source: "Brihadaranyaka Upanishad (1.4.10)",
    category: "wisdom",
    categoryLabel: "Self-Realization & Truth",
    cosmicEnergy: "Brihaspati (Jupiter) — Supreme Wisdom",
    seedMantra: "ॐ गं गुरुवे नमः (Om Gam Guruve Namah)",
    themeDescription: "Recognizing your limitless nature eliminates self-doubt and anchors your mind in unshakeable dignity."
  },
  {
    id: "aff-2",
    affirmation: "I act with pure devotion and integrity, releasing all anxiety about results into the cosmic order.",
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
    transliteration: "Karmanye vadhi karaste ma phaleshu kadachana",
    translation: "You have a right to perform your prescribed duty, but not to the fruits of action.",
    source: "Bhagavad Gita (2.47)",
    category: "strength",
    categoryLabel: "Karmic Freedom & Action",
    cosmicEnergy: "Surya (Sun) — Willpower & Dharma",
    seedMantra: "ॐ सूर्याय नमः (Om Suryaya Namah)",
    themeDescription: "Freedom from attachment to outcomes unlocks spontaneous mastery and unburdened focus in every task."
  },
  {
    id: "aff-3",
    affirmation: "Peace flows into every cell of my body and every thought of my mind. Divine tranquility surrounds me.",
    sanskrit: "ॐ शान्तिः शान्तिः शान्तिः",
    transliteration: "Om Shantih Shantih Shantih",
    translation: "Peace in the cosmos, peace in nature, peace within the self.",
    source: "Taittiriya Upanishad",
    category: "peace",
    categoryLabel: "Inner Peace & Shanti",
    cosmicEnergy: "Chandra (Moon) — Emotional Serenity",
    seedMantra: "ॐ सोमाय नमः (Om Somaya Namah)",
    themeDescription: "Invoking peace on all three planes dispels mental friction, bodily tension, and external agitation."
  },
  {
    id: "aff-4",
    affirmation: "The universe is inherently full, and I am an unbroken expression of that fullness. Abundance flows through me freely.",
    sanskrit: "पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते।",
    transliteration: "Purnamadah purnamidam purnat purnamudachyate",
    translation: "That is Whole, this is Whole; from Wholeness, Wholeness emerges.",
    source: "Isha Upanishad (Invocation)",
    category: "abundance",
    categoryLabel: "Divine Wholeness & Prosperity",
    cosmicEnergy: "Shukra & Lakshmi — Grace & Affluence",
    seedMantra: "ॐ श्रीं महालक्ष्म्यै नमः (Om Shreem Mahalakshmyai Namah)",
    themeDescription: "When you understand that nothing can diminish your true nature, scarcity dissolves into natural generosity."
  },
  {
    id: "aff-5",
    affirmation: "Lead me from false illusion to ultimate truth; from darkness into celestial light; from mortality to immortality.",
    sanskrit: "असतो मा सद्गमय तमसो मा ज्योतिर्गमय मृत्योर्मा अमृतं गमय।",
    transliteration: "Asato ma sadgamaya, tamaso ma jyotirgamaya, mrityorma amritam gamaya",
    translation: "From untruth lead me to Truth, from darkness lead me to Light, from death lead me to Immortality.",
    source: "Brihadaranyaka Upanishad (1.3.28)",
    category: "wisdom",
    categoryLabel: "Spiritual Illumination",
    cosmicEnergy: "Rishi Agastya — Awakening",
    seedMantra: "ॐ तत्सवितुर्वरेण्यं (Gayatri Mantra)",
    themeDescription: "A sovereign invocation of clarity that burns through mental fog and guides your decisions to highest virtue."
  },
  {
    id: "aff-6",
    affirmation: "May all beings everywhere be happy, free from suffering, and guided toward the light of wellness.",
    sanskrit: "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः।",
    transliteration: "Sarve bhavantu sukhinah sarve santu niramayah",
    translation: "May all beings be at peace and joyous; may all beings be free from illness.",
    source: "Brihadaranyaka Upanishad Tradition",
    category: "healing",
    categoryLabel: "Compassion & Universal Healing",
    cosmicEnergy: "Dhanvantari — Divine Physician",
    seedMantra: "ॐ नमो भगवते धन्वन्तरये नमः (Om Dhanvantaraye Namah)",
    themeDescription: "Directing loving goodwill outward instantly dissolves inner bitterness and harmonizes your aura."
  },
  {
    id: "aff-7",
    affirmation: "Established in equanimity and centered awareness, I perform all actions without hesitation or fear.",
    sanskrit: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।",
    transliteration: "Yogasthah kuru karmani sangam tyaktva dhananjaya",
    translation: "Be steadfast in Yoga, O Arjuna; perform your duty unattached to success or failure.",
    source: "Bhagavad Gita (2.48)",
    category: "strength",
    categoryLabel: "Courage & Equanimity",
    cosmicEnergy: "Mangala (Mars) — Righteous Courage",
    seedMantra: "ॐ भौमाय नमः (Om Bhaumaya Namah)",
    themeDescription: "Equanimity is yoga. Success and setback become equal fuel for the resolute soul."
  },
  {
    id: "aff-8",
    affirmation: "I honor the divine spark within all beings. We are one sacred cosmic family journeying toward the one truth.",
    sanskrit: "वसुधैव कुटुम्बकम्",
    transliteration: "Vasudhaiva Kutumbakam",
    translation: "The entire world is one unified spiritual family.",
    source: "Maha Upanishad (6.71-73)",
    category: "gratitude",
    categoryLabel: "Cosmic Unity & Love",
    cosmicEnergy: "Budha (Mercury) — Harmonious Union",
    seedMantra: "ॐ सौं सौम्याय नमः (Om Saum Saumyaya Namah)",
    themeDescription: "Seeing kinship rather than opposition dissolves conflict, inviting cooperative synchronicity into your life."
  },
  {
    id: "aff-9",
    affirmation: "By stilling the ripples of my mind, I rest in the pristine witness consciousness of pure spirit.",
    sanskrit: "योगश्चित्तवृत्तिनिरोधः",
    transliteration: "Yogas chitta vritti nirodhah",
    translation: "Yoga is the intentional quieting of the fluctuations of consciousness.",
    source: "Patanjali Yoga Sutras (1.2)",
    category: "peace",
    categoryLabel: "Mind Mastery & Clarity",
    cosmicEnergy: "Shiva — The Primal Yogi",
    seedMantra: "ॐ नमः शिवाय (Om Namah Shivaya)",
    themeDescription: "When the lake of the mind becomes motionless, the luminous reflection of your true self shines through."
  },
  {
    id: "aff-10",
    affirmation: "I am protected by the grace of the Supreme. No negativity can breach my boundary of light and truth.",
    sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।",
    transliteration: "Sarva-dharman parityajya mam ekam sharanam vraja",
    translation: "Abandon all varieties of worry, surrender unto Me alone; I will deliver you from all fear.",
    source: "Bhagavad Gita (18.66)",
    category: "strength",
    categoryLabel: "Divine Protection & Surrender",
    cosmicEnergy: "Maha Vishnu — Preserver of the Cosmos",
    seedMantra: "ॐ नमो नारायणाय (Om Namo Narayanaya)",
    themeDescription: "True surrender is not weakness; it is merging your small individual will with the infinite force of existence."
  },
  {
    id: "aff-11",
    affirmation: "Truth alone triumphs, never falsehood. I align my words and deeds with cosmic order (Satya and Rita).",
    sanskrit: "सत्यमेव जयते नानृतम्",
    transliteration: "Satyameva Jayate Nanritam",
    translation: "Truth alone triumphs, never falsehood.",
    source: "Mundaka Upanishad (3.1.6)",
    category: "wisdom",
    categoryLabel: "Unyielding Truth",
    cosmicEnergy: "Dharma & Brihaspati",
    seedMantra: "ॐ तत्सत् (Om Tat Sat)",
    themeDescription: "Living in unwavering alignment with truth gives immense moral strength and draws cosmic support to your endeavors."
  },
  {
    id: "aff-12",
    affirmation: "My body is a holy temple of consciousness. I breathe in healing vitality and breathe out all fatigue.",
    sanskrit: "शरीरमाद्यं खलु धर्मसाधनम्।",
    transliteration: "Shariram adyam khalu dharma sadhanam",
    translation: "The physical body is indeed the prime instrument for fulfilling all righteous duty.",
    source: "Kalidasa, Kumarasambhava",
    category: "healing",
    categoryLabel: "Vitality & Bodily Radiance",
    cosmicEnergy: "Prana & Surya Dev",
    seedMantra: "ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः",
    themeDescription: "Caring for your physical vessel with reverence allows your spiritual light to manifest cleanly in the world."
  },
  {
    id: "aff-13",
    affirmation: "I celebrate the boundless abundance already present in my breath, my opportunities, and my sacred life.",
    sanskrit: "आनन्दो ब्रह्मेति व्यजानात्।",
    transliteration: "Anando brahmeti vyajanat",
    translation: "Know that bliss (Ananda) is the very essence of Brahman.",
    source: "Taittiriya Upanishad (3.6)",
    category: "abundance",
    categoryLabel: "Inherent Joy & Plenty",
    cosmicEnergy: "Kamadhenu & Lakshmi",
    seedMantra: "ॐ क्लीं कृष्णाय नमः (Om Kleem Krishnaya Namah)",
    themeDescription: "Joy is not a reward to be won in the future; it is the fundamental fabric of existence awaiting your acknowledgment."
  },
  {
    id: "aff-14",
    affirmation: "I welcome patience and perseverance. Like the slow, stately movement of Saturn, my noble work will bear lasting fruit.",
    sanskrit: "धैर्यवान् सर्वमाप्नोति।",
    transliteration: "Dhairyavan sarvam apnoti",
    translation: "One who possesses serene patience and fortitude attains everything.",
    source: "Subhashita Ratna Bhandagara",
    category: "strength",
    categoryLabel: "Patience & Mastery",
    cosmicEnergy: "Shani Dev (Saturn) — Discipline & Depth",
    seedMantra: "ॐ शं शनैश्चराय नमः (Om Sham Shanaishcharaya Namah)",
    themeDescription: "Patience turns ordinary effort into timeless legacy. Trust the divine unfolding of your destiny."
  },
  {
    id: "aff-15",
    affirmation: "With a grateful heart, I give thanks for every lesson, every blessing, and every doorway opened today.",
    sanskrit: "कृतज्ञता सर्वसम्पदां मूलम्।",
    transliteration: "Kritajnata sarva sampadam mulam",
    translation: "Gratitude is the root and wellspring of all enduring prosperity.",
    source: "Panchatantra Wisdom",
    category: "gratitude",
    categoryLabel: "Sacred Thankfulness",
    cosmicEnergy: "Devi Annapurna — Perpetual Fulfillment",
    seedMantra: "ॐ श्रीमते नमः (Om Shreemate Namah)",
    themeDescription: "Gratitude instantly shifts your consciousness from what is missing to the miraculous overflow of what is given."
  },
  {
    id: "aff-16",
    affirmation: "I cultivate discernment. Like the swan separating milk from water, I choose that which elevates my spirit.",
    sanskrit: "विवेकः परमं बलम्।",
    transliteration: "Vivekah paramam balam",
    translation: "Spiritual discernment between the transient and the eternal is the supreme strength.",
    source: "Vivekachudamani by Adi Shankara",
    category: "wisdom",
    categoryLabel: "Discernment (Viveka)",
    cosmicEnergy: "Saraswati — Goddess of Discernment",
    seedMantra: "ॐ ऐं सरस्वत्यै नमः (Om Aim Saraswatyai Namah)",
    themeDescription: "Discernment allows you to navigate the world's distractions with effortless clarity and poise."
  },
  {
    id: "aff-17",
    affirmation: "Obstacles before me crumble like morning mist before the rising sun. My pathway is cleared by divine auspiciousness.",
    sanskrit: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
    transliteration: "Vakratunda mahakaya suryakoti samaprabha, nirvighnam kuru me deva sarvakaryeshu sarvada",
    translation: "O Lord Ganesha, possessing the brilliance of ten million suns, clear all obstacles from my path always.",
    source: "Ganesha Purana",
    category: "strength",
    categoryLabel: "Removal of Obstacles",
    cosmicEnergy: "Lord Ganesha — Vighnaharta",
    seedMantra: "ॐ गं गणपतये नमः (Om Gam Ganapataye Namah)",
    themeDescription: "Invoking obstacle-clearing energy resets mental hesitation and invites smooth, unobstructed progress."
  },
  {
    id: "aff-18",
    affirmation: "I forgive the past, release all grievances, and step into the boundless purity of the present moment.",
    sanskrit: "क्षमा दानं क्षमा सत्यं क्षमा यज्ञश्च पुत्रक।",
    transliteration: "Kshama danam kshama satyam kshama yajnashcha",
    translation: "Forgiveness is the highest charity, forgiveness is truth, forgiveness is the supreme sacrifice.",
    source: "Mahabharata, Vana Parva",
    category: "healing",
    categoryLabel: "Forgiveness & Freedom",
    cosmicEnergy: "Chandra & Brihaspati",
    seedMantra: "ॐ शान्तात्मने नमः (Om Shantatmane Namah)",
    themeDescription: "Forgiveness frees your own vitality from the prison of old resentments, allowing fresh life to flourish."
  },
  {
    id: "aff-19",
    affirmation: "I am grounded in Mother Earth's stability while keeping my crown open to celestial intuition.",
    sanskrit: "माता भूमिः पुत्रोऽहं पृथिव्याः।",
    transliteration: "Mata bhumih putroham prithivyah",
    translation: "Earth is my mother, and I am her beloved child.",
    source: "Atharva Veda (Bhumi Sukta 12.1.12)",
    category: "healing",
    categoryLabel: "Grounding & Earth Connection",
    cosmicEnergy: "Prithvi Tattva (Earth Element)",
    seedMantra: "ॐ पृथिव्यै नमः (Om Prithivyai Namah)",
    themeDescription: "Deep roots enable great heights. Reconnecting with earth stability calms overactive thoughts."
  },
  {
    id: "aff-20",
    affirmation: "My mind is a serene sanctuary. I observe thoughts without judgment and choose those that breathe light.",
    sanskrit: "मन एव मनुष्याणां कारणं बन्धमोक्षयोः।",
    transliteration: "Mana eva manushyanam karanam bandha-mokshayoh",
    translation: "The mind alone is the cause of both bondage and liberation for human beings.",
    source: "Amrita Bindu Upanishad (2)",
    category: "peace",
    categoryLabel: "Sovereignty of Mind",
    cosmicEnergy: "Budha (Mercury) & Lord Shiva",
    seedMantra: "ॐ सोऽहम् (Om So-Hum)",
    themeDescription: "Mastering your reaction to thought patterns is the golden bridge to emotional liberation."
  },
  {
    id: "aff-21",
    affirmation: "I speak words that heal, inspire, and illuminate. My speech carries the fragrance of truth and kindness.",
    sanskrit: "अनुद्वेगकरं वाक्यं सत्यं प्रियहितं च यत्।",
    transliteration: "Anudvegakaram vakyam satyam priyahitam cha yat",
    translation: "Words that cause no distress, truthful, pleasing, and beneficial constitutes the austerity of speech.",
    source: "Bhagavad Gita (17.15)",
    category: "wisdom",
    categoryLabel: "Sacred Speech (Vak Siddhi)",
    cosmicEnergy: "Saraswati & Brihaspati",
    seedMantra: "ॐ वाग्देव्यै नमः (Om Vagdevyai Namah)",
    themeDescription: "Conscious speech preserves your spiritual energy and fosters deep trust and reverence with everyone."
  },
  {
    id: "aff-22",
    affirmation: "Every cell in my body vibrates with vitality, health, and immune harmony. Life energy renews me now.",
    sanskrit: "त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥",
    transliteration: "Tryambakam yajamahe sugandhim pushtivardhanam",
    translation: "We worship the Three-Eyed Lord who nourishes and nurtures all beings with divine fragrance and health.",
    source: "Rig Veda (Maha Mrityunjaya 7.59.12)",
    category: "healing",
    categoryLabel: "Longevity & Rejuvenation",
    cosmicEnergy: "Rudra-Shiva — Maha Mrityunjaya",
    seedMantra: "ॐ जूं सः (Maha Mrityunjaya Bija)",
    themeDescription: "The Maha Mrityunjaya vibration revitalizes life force and shields against physical and emotional debility."
  },
  {
    id: "aff-23",
    affirmation: "I am in perfect harmony with the cosmic rhythm. What is meant for my highest good finds me effortlessly.",
    sanskrit: "यतो धर्मस्ततो जयः।",
    transliteration: "Yato dharmas tato jayah",
    translation: "Where there is righteousness and cosmic harmony, there victory is assured.",
    source: "Mahabharata",
    category: "abundance",
    categoryLabel: "Righteous Victory & Flow",
    cosmicEnergy: "Dharma & Sri Krishna",
    seedMantra: "ॐ नमो भगवते वासुदेवाय",
    themeDescription: "Aligning with Dharma guarantees that time, circumstance, and unseen helpers conspire for your success."
  },
  {
    id: "aff-24",
    affirmation: "Courage is my natural birthright. I step forward boldly into new horizons with faith as my shield.",
    sanskrit: "उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः।",
    transliteration: "Udyamena hi sidhyanti karyani na manorathaih",
    translation: "Tasks are accomplished by committed effort, never by mere daydreaming.",
    source: "Hitopadesha Wisdom",
    category: "strength",
    categoryLabel: "Committed Action & Boldness",
    cosmicEnergy: "Hanuman & Mars",
    seedMantra: "ॐ हं हनुमते नमः (Om Ham Hanumate Namah)",
    themeDescription: "Combining steadfast spiritual faith with proactive, daily effort guarantees manifest breakthroughs."
  },
  {
    id: "aff-25",
    affirmation: "I am grateful for this sacred breath, this auspicious moment, and the privilege of living with purpose.",
    sanskrit: "धन्योऽस्म्यहं धन्योऽस्मि।",
    transliteration: "Dhanyo'smyaham dhanyo'smi",
    translation: "Blessed am I! Blessed am I beyond measure!",
    source: "Panchadasi by Vidyaranya Swami",
    category: "gratitude",
    categoryLabel: "Ecstatic Gratitude",
    cosmicEnergy: "Surya & Jupiter",
    seedMantra: "ॐ नमः परमात्मने (Om Namah Paramatmane)",
    themeDescription: "Acknowledging your innate blessedness magnetizes auspicious opportunities and high-vibrational relationships."
  },
  {
    id: "aff-26",
    affirmation: "I see the supreme reality reflected in all eyes. Love is my compass; compassion is my guide.",
    sanskrit: "तत्त्वमसि",
    transliteration: "Tat Tvam Asi",
    translation: "Thou art That (The Divine Self).",
    source: "Chandogya Upanishad (6.8.7)",
    category: "wisdom",
    categoryLabel: "Oneness of Being",
    cosmicEnergy: "Brahman — The Absolute",
    seedMantra: "ॐ सच्चिदानन्दाय नमः",
    themeDescription: "When otherness disappears, fear and jealousy evaporate, leaving unconditional love and mutual respect."
  },
  {
    id: "aff-27",
    affirmation: "I welcome tranquility into my home and workspace. All confusion is replaced by crystalline order.",
    sanskrit: "शान्तं शिवमद्वैतं चतुर्थं मन्यन्ते।",
    transliteration: "Shantam shivam advaitam chaturtham manyante",
    translation: "Peaceful, auspicious, and non-dual is the supreme Fourth state of consciousness (Turiya).",
    source: "Mandukya Upanishad (7)",
    category: "peace",
    categoryLabel: "Turiya Transcendence",
    cosmicEnergy: "Supreme Silence (Dakshinamurthy)",
    seedMantra: "ॐ दक्षिणामूर्तये नमः (Om Dakshinamurtaye Namah)",
    themeDescription: "Resting in the witness state beyond waking, dreaming, and deep sleep reveals unflappable peace."
  },
  {
    id: "aff-28",
    affirmation: "My capacity to create, learn, and grow is limitless. Wisdom blossoms naturally within my heart.",
    sanskrit: "प्रज्ञानं ब्रह्म",
    transliteration: "Prajnanam Brahma",
    translation: "Consciousness and Divine Wisdom is the ultimate reality.",
    source: "Aitareya Upanishad (3.3)",
    category: "wisdom",
    categoryLabel: "Limitless Intellect",
    cosmicEnergy: "Brihaspati (Dev-Guru)",
    seedMantra: "ॐ बृहस्पतये नमः (Om Brihaspataye Namah)",
    themeDescription: "Wisdom is not merely gathered facts, but the deep intuitive recognition of life's sacred wholeness."
  },
  {
    id: "aff-29",
    affirmation: "I walk with the grace of the Divine Mother. Strength, dignity, and soft kindness dwell in my heart.",
    sanskrit: "या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता। नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥",
    transliteration: "Ya devi sarvabhuteshu shaktirupena samsthita",
    translation: "To that Divine Goddess who abides in all beings in the form of primal strength and power, salutations again and again.",
    source: "Devi Mahatmyam (Aparajita Stotram)",
    category: "strength",
    categoryLabel: "Shakti & Inner Power",
    cosmicEnergy: "Maha Durga & Maha Kali",
    seedMantra: "ॐ दुं दुर्गायै नमः (Om Dum Durgayai Namah)",
    themeDescription: "Connecting with the maternal creative force of the cosmos empowers you to protect the good and overcome any trial."
  },
  {
    id: "aff-30",
    affirmation: "Today, I sow seeds of peace, goodwill, and excellence. My future harvest is rich with spiritual fruit.",
    sanskrit: "शुभं भवतु कल्याणं आरोग्यं धनसम्पदाम्।",
    transliteration: "Shubham bhavatu kalyanam arogyam dhana sampadam",
    translation: "May there be auspiciousness, supreme wellbeing, radiant health, and abundant wealth.",
    source: "Deepa Jyoti Stotram",
    category: "abundance",
    categoryLabel: "Auspicious Harvest",
    cosmicEnergy: "Surya & Lakshmi",
    seedMantra: "ॐ शुभदाय नमः (Om Shubhadaya Namah)",
    themeDescription: "Every thought is a seed in the field of consciousness. Sowing noble intentions yields auspicious harvest."
  },
  {
    id: "aff-31",
    affirmation: "My soul is eternal, radiant, and ever-free. I celebrate this new dawn with reverence, joy, and peace.",
    sanskrit: "नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः।",
    transliteration: "Nainam chhindanti shastrani nainam dahati pavakah",
    translation: "Weapons cannot cut the soul, nor fire burn it, nor water wet it, nor wind dry it. Eternal and invulnerable.",
    source: "Bhagavad Gita (2.23)",
    category: "peace",
    categoryLabel: "Invulnerable Soul (Atman)",
    cosmicEnergy: "Paramatman — Cosmic Self",
    seedMantra: "ॐ तत्सत् परब्रह्मणे नमः",
    themeDescription: "Knowing that your core soul can never be wounded frees you to love openly, act bravely, and live fully."
  }
];

/**
 * Returns today's deterministic daily affirmation based on calendar date (YYYY-MM-DD),
 * ensuring every user visiting on the same calendar day gets the consistent blessing of the day.
 */
export function getAffirmationForDate(date: Date = new Date()): SpiritualAffirmation {
  const dayOfYear = Math.floor(
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) /
      (24 * 60 * 60 * 1000)
  );
  const index = Math.abs(dayOfYear) % DAILY_AFFIRMATIONS.length;
  return DAILY_AFFIRMATIONS[index];
}
