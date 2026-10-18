export interface TarotSwordsCard {
  id: string;
  cardName: string;
  suit: "Swords";
  title: string;
  sanskritTitle: string;
  subtitle: string;
  element: string;
  description: string;
  imageUrl: string;
}

export const TAROT_SWORDS_SUIT: TarotSwordsCard[] = [
  {
    id: "swords_ace",
    cardName: "Ace of Swords",
    suit: "Swords",
    title: "Ace of Swords",
    sanskritTitle: "सत्य खड्ग (Blade of Absolute Truth)",
    subtitle: "Clarity of Mind, Mental Breakthrough, Truth & Wisdom",
    element: "Air Element • Gemini / Libra / Aquarius",
    description: "A luminous divine sword held upright by a celestial hand, crowned with a laurel and palm branch over a starry mountain range, cutting through all illusion.",
    imageUrl: "/src/assets/images/tarot_ace_swords_real_1786619357424.jpg"
  },
  {
    id: "swords_2",
    cardName: "Two of Swords",
    suit: "Swords",
    title: "II - Two of Swords",
    sanskritTitle: "समता निर्णय (Balanced Stalemate)",
    subtitle: "Decision, Blindfolded Truce, Inner Peace & Crossroads",
    element: "Air Element • Moon in Libra",
    description: "A blindfolded figure seated by a calm sea under a crescent moon, holding two crossed silver swords over their chest in silent equilibrium.",
    imageUrl: "/src/assets/images/tarot_two_swords_real_1786619368626.jpg"
  },
  {
    id: "swords_3",
    cardName: "Three of Swords",
    suit: "Swords",
    title: "III - Three of Swords",
    sanskritTitle: "हृदय वेध (Emotional Catharsis)",
    subtitle: "Heartbreak, Grief, Truth Revealing & Necessary Release",
    element: "Air Element • Saturn in Libra",
    description: "A radiant heart pierced by three swords under a stormy sky, signifying deep emotional catharsis, truth cut free from deception, and healing.",
    imageUrl: "/src/assets/images/tarot_three_swords_real_1786619380601.jpg"
  },
  {
    id: "swords_4",
    cardName: "Four of Swords",
    suit: "Swords",
    title: "IV - Four of Swords",
    sanskritTitle: "ध्यान विश्राम (Restorative Sanctuary)",
    subtitle: "Rest, Meditation, Recovery & Mental Peace",
    element: "Air Element • Jupiter in Libra",
    description: "A knight lying peacefully in prayer atop a tomb effigy inside a stained-glass chapel sanctuary, gathering strength for future victories.",
    imageUrl: "/src/assets/images/tarot_four_swords_real_1786619394211.jpg"
  },
  {
    id: "swords_5",
    cardName: "Five of Swords",
    suit: "Swords",
    title: "V - Five of Swords",
    sanskritTitle: "अहंकार जय (Pyrrhic Victory)",
    subtitle: "Conflict, Pride, Strategic Retreat & Choosing Battles",
    element: "Air Element • Venus in Aquarius",
    description: "A smiling figure collecting five swords on a windy seashore as defeated opponents walk away, warning against hollow victories.",
    imageUrl: "/src/assets/images/tarot_five_swords_real_1786619404765.jpg"
  },
  {
    id: "swords_6",
    cardName: "Six of Swords",
    suit: "Swords",
    title: "VI - Six of Swords",
    sanskritTitle: "शांत प्रयाण (Passage to Calm Seas)",
    subtitle: "Transition, Moving On, Calm Waters & Mental Healing",
    element: "Air Element • Mercury in Aquarius",
    description: "A ferryman rowing a boat carrying cloaked figures and six upright swords across choppy waters toward serene, sunny shores.",
    imageUrl: "/src/assets/images/tarot_six_swords_real_1786619419449.jpg"
  },
  {
    id: "swords_7",
    cardName: "Seven of Swords",
    suit: "Swords",
    title: "VII - Seven of Swords",
    sanskritTitle: "गुप्त रणनीति (Stealth & Strategy)",
    subtitle: "Strategy, Resourcefulness, Stealth & Independence",
    element: "Air Element • Moon in Aquarius",
    description: "A clever strategist carrying away five swords from an enemy camp while leaving two behind, relying on wit and agility over brute force.",
    imageUrl: "/src/assets/images/tarot_seven_swords_real_1786619430973.jpg"
  },
  {
    id: "swords_8",
    cardName: "Eight of Swords",
    suit: "Swords",
    title: "VIII - Eight of Swords",
    sanskritTitle: "मानसिक बंधन (Self-Imposed Limits)",
    subtitle: "Self-Limitation, Freedom Within Reach & Breaking Free",
    element: "Air Element • Jupiter in Gemini",
    description: "A bound figure loosely surrounded by eight swords planted in the marsh, showing that the path to freedom is open if mind barriers drop.",
    imageUrl: "/src/assets/images/tarot_eight_swords_real_1786619444066.jpg"
  },
  {
    id: "swords_9",
    cardName: "Nine of Swords",
    suit: "Swords",
    title: "IX - Nine of Swords",
    sanskritTitle: "चिंता नाश (Overcoming Anxiety)",
    subtitle: "Nightmares, Worry, Dawn Approaching & Mental Relief",
    element: "Air Element • Mars in Gemini",
    description: "A figure sitting up in bed with head in hands under nine hanging swords, reminding that morning light dissolves midnight anxieties.",
    imageUrl: "/src/assets/images/tarot_nine_swords_real_1786619456599.jpg"
  },
  {
    id: "swords_10",
    cardName: "Ten of Swords",
    suit: "Swords",
    title: "X - Ten of Swords",
    sanskritTitle: "अंतिम अंत (Dawn of the New Era)",
    subtitle: "Final End, Rebirth, Rock Bottom & Golden Sunrise",
    element: "Air Element • Sun in Gemini",
    description: "A figure resting on the shoreline as ten golden-hilted swords mark the absolute end of pain, while a brilliant golden sunrise breaks over the sea.",
    imageUrl: "/src/assets/images/tarot_ten_swords_real_1786619468544.jpg"
  },
  {
    id: "swords_page",
    cardName: "Page of Swords",
    suit: "Swords",
    title: "Page of Swords",
    sanskritTitle: "जिज्ञासु प्रहरी (Vigilant Scholar)",
    subtitle: "Curiosity, Mental Agility, Truth-Seeking & News",
    element: "Earth of Air • Keen Observer",
    description: "An alert youth standing on a breezy hilltop holding a silver sword aloft, gazing keenly into the horizon for truth and knowledge.",
    imageUrl: "/src/assets/images/tarot_page_swords_real_1786619485126.jpg"
  },
  {
    id: "swords_knight",
    cardName: "Knight of Swords",
    suit: "Swords",
    title: "Knight of Swords",
    sanskritTitle: "सत्य योद्धा (Champion of Truth)",
    subtitle: "Determined Action, Speed, Fierce Intellect & Drive",
    element: "Air of Air • Intellectual Crusader",
    description: "A valiant knight charging forward on a galloping grey horse with sword drawn, riding boldly into the wind to champion justice.",
    imageUrl: "/src/assets/images/tarot_knight_swords_real_1786619497970.jpg"
  },
  {
    id: "swords_queen",
    cardName: "Queen of Swords",
    suit: "Swords",
    title: "Queen of Swords",
    sanskritTitle: "विद्वत स्वामिनी (Queen of Mental Clarity)",
    subtitle: "Sharp Intellect, Unbiased Judgment, Wit & Independence",
    element: "Water of Air • Clear Discerning Sovereign",
    description: "A dignified queen seated on a cloud-adorned throne, holding a sword upright in one hand while welcoming truth with an open hand.",
    imageUrl: "/src/assets/images/tarot_queen_swords_real_1786619507884.jpg"
  },
  {
    id: "swords_king",
    cardName: "King of Swords",
    suit: "Swords",
    title: "King of Swords",
    sanskritTitle: "न्याय स्वामी (Master of Justice & Intellect)",
    subtitle: "Truth, Legal Wisdom, Intellectual Authority & Reason",
    element: "Fire of Air • Supreme Judge",
    description: "A wise king seated on a carved throne under a clear sky, holding the sword of justice erect in supreme mental authority and fairness.",
    imageUrl: "/src/assets/images/tarot_king_swords_real_1786619519719.jpg"
  }
];
