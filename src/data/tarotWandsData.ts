export interface TarotWandsCard {
  id: string;
  cardName: string;
  suit: "Wands";
  title: string;
  sanskritTitle: string;
  subtitle: string;
  element: string;
  description: string;
  imageUrl: string;
}

export const TAROT_WANDS_SUIT: TarotWandsCard[] = [
  {
    id: "wands_ace",
    cardName: "Ace of Wands",
    suit: "Wands",
    title: "Ace of Wands",
    sanskritTitle: "अग्नि बीज (Spark of Divine Will)",
    subtitle: "Inspiration, Creative Drive, Passion & New Enterprise",
    element: "Fire Element • Aries / Leo / Sagittarius",
    description: "A glowing hand emerging from a fiery cloud holding a sprouting wooden staff bursting with golden leaves and sparks, signaling pure creative inspiration.",
    imageUrl: "/src/assets/images/tarot_ace_wands_1786618576408.jpg"
  },
  {
    id: "wands_2",
    cardName: "Two of Wands",
    suit: "Wands",
    title: "II - Two of Wands",
    sanskritTitle: "विश्व दृष्टि (Global Vision)",
    subtitle: "Future Planning, Bold Horizon, Ambition & Expansion",
    element: "Fire Element • Mars in Aries",
    description: "A leader standing on a castle parapet holding a globe in one hand and a staff in the other, contemplating vast world expansion under a fiery sky.",
    imageUrl: "/src/assets/images/tarot_two_wands_1786618599013.jpg"
  },
  {
    id: "wands_3",
    cardName: "Three of Wands",
    suit: "Wands",
    title: "III - Three of Wands",
    sanskritTitle: "आशा आगमन (Ships Coming In)",
    subtitle: "Enterprise, Momentum, Long-Distance Success & Confidence",
    element: "Fire Element • Sun in Aries",
    description: "A traveler looking out over golden oceans as ships sail into harbor under a warm sunset sky, surrounded by three sprouted staffs.",
    imageUrl: "/src/assets/images/tarot_three_wands_gen_1786534525960.jpg"
  },
  {
    id: "wands_4",
    cardName: "Four of Wands",
    suit: "Wands",
    title: "IV - Four of Wands",
    sanskritTitle: "गृह आनंद (Sacred Sanctuary)",
    subtitle: "Homecoming, Harmony, Celebration & Milestone Victory",
    element: "Fire Element • Venus in Aries",
    description: "A garlanded floral arbor held up by four sprouted wooden wands, with joyful people celebrating a blessed homecoming and milestone.",
    imageUrl: "/src/assets/images/tarot_four_wands_1786618616315.jpg"
  },
  {
    id: "wands_5",
    cardName: "Five of Wands",
    suit: "Wands",
    title: "V - Five of Wands",
    sanskritTitle: "द्वंद्व क्रीड़ा (Dynamic Competition)",
    subtitle: "Conflict, Rivalry, Brainstorming & Testing Strength",
    element: "Fire Element • Saturn in Leo",
    description: "Five fierce competitors with intense and angry expressions clashing five long sprouted wooden wands in dynamic battle, conflict, and rivalry.",
    imageUrl: "/src/assets/images/tarot_five_wands_battle_1786619104697.jpg"
  },
  {
    id: "wands_6",
    cardName: "Six of Wands",
    suit: "Wands",
    title: "VI - Six of Wands",
    sanskritTitle: "विजय जुलूस (Triumphal Procession)",
    subtitle: "Public Victory, Acclaim, Pride & Recognition",
    element: "Fire Element • Jupiter in Leo",
    description: "A victorious rider crowned with a laurel wreath riding a white horse through a cheering crowd, holding a wand adorned with a golden wreath.",
    imageUrl: "/src/assets/images/tarot_six_wands_1786618631386.jpg"
  },
  {
    id: "wands_7",
    cardName: "Seven of Wands",
    suit: "Wands",
    title: "VII - Seven of Wands",
    sanskritTitle: "अभय रक्षण (Defending the High Ground)",
    subtitle: "Perseverance, Courage, Holding Your Ground & Conviction",
    element: "Fire Element • Mars in Leo",
    description: "A brave defender standing on a rocky hill defending their position against six opposing staves, showing unwavering grit and courage.",
    imageUrl: "/src/assets/images/tarot_seven_wands_1786618646251.jpg"
  },
  {
    id: "wands_8",
    cardName: "Eight of Wands",
    suit: "Wands",
    title: "VIII - Eight of Wands",
    sanskritTitle: "शीघ्र गति (Rapid Acceleration)",
    subtitle: "Speed, Swift Action, Air Travel & Sudden Breakthrough",
    element: "Fire Element • Mercury in Sagittarius",
    description: "Eight sprouted wands flying parallel through a clear blue sky over a flowing river, symbolizing rapid progress, news, and momentum.",
    imageUrl: "/src/assets/images/tarot_eight_wands_1786618666702.jpg"
  },
  {
    id: "wands_9",
    cardName: "Nine of Wands",
    suit: "Wands",
    title: "IX - Nine of Wands",
    sanskritTitle: "अंतिम प्रहरी (Resilient Guard)",
    subtitle: "Resilience, Final Push, Last Defense & Unshakeable Grit",
    element: "Fire Element • Moon in Sagittarius",
    description: "A bandaged warrior leaning on a staff, backed by a palisade of eight sprouted wands, ready for the final victorious stand.",
    imageUrl: "/src/assets/images/tarot_nine_wands_1786618684643.jpg"
  },
  {
    id: "wands_10",
    cardName: "Ten of Wands",
    suit: "Wands",
    title: "X - Ten of Wands",
    sanskritTitle: "भार वहन (Heavy Duty)",
    subtitle: "Burden, Overcommitment, Hard Work & Nearing Goal",
    element: "Fire Element • Saturn in Sagittarius",
    description: "A determined figure carrying a heavy bundle of ten sprouted wands toward a glowing hilltop town, close to completing the mission.",
    imageUrl: "/src/assets/images/tarot_ten_wands_1786618699740.jpg"
  },
  {
    id: "wands_page",
    cardName: "Page of Wands",
    suit: "Wands",
    title: "Page of Wands",
    sanskritTitle: "उत्साही दूत (Messenger of Passion)",
    subtitle: "New Ideas, Exploration, Enthusiastic News & Curiosity",
    element: "Earth of Fire • Young Pioneer",
    description: "An energetic youth standing in a warm desert landscape admiring a sprouting wand, eager to share inspiring news and adventures.",
    imageUrl: "/src/assets/images/tarot_page_wands_1786618717120.jpg"
  },
  {
    id: "wands_knight",
    cardName: "Knight of Wands",
    suit: "Wands",
    title: "Knight of Wands",
    sanskritTitle: "वीर साहसी (The Fiery Adventurer)",
    subtitle: "Action, Passion, Fearless Pursuit & Chivalric Drive",
    element: "Air of Fire • Fiery Quest",
    description: "A fiery knight in flame-adorned armor riding a rearing chestnut horse across desert dunes, brandishing a flaming staff.",
    imageUrl: "/src/assets/images/tarot_knight_wands_1786618735100.jpg"
  },
  {
    id: "wands_queen",
    cardName: "Queen of Wands",
    suit: "Wands",
    title: "Queen of Wands",
    sanskritTitle: "प्रदीप्त स्वामिनी (Queen of Radiance)",
    subtitle: "Charisma, Courage, Warmth, Independence & Passion",
    element: "Water of Fire • Radiant Sovereign",
    description: "A vibrant queen seated on a lion-carved throne holding a sunflower and sprouted wand, with a regal black cat at her feet.",
    imageUrl: "/src/assets/images/tarot_queen_wands_1786618749944.jpg"
  },
  {
    id: "wands_king",
    cardName: "King of Wands",
    suit: "Wands",
    title: "King of Wands",
    sanskritTitle: "तेजस्वी राजा (Master of Vision)",
    subtitle: "Visionary Leadership, Mastery, High Honor & Power",
    element: "Fire of Fire • Inspiring Leader",
    description: "A majestic king on a lion-and-salamander throne holding a flowering staff, embodying visionary power and fiery charisma.",
    imageUrl: "/src/assets/images/tarot_king_wands_1786618769423.jpg"
  }
];
