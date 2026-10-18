export interface TarotCupsCard {
  id: string;
  cardName: string;
  suit: "Cups";
  title: string;
  sanskritTitle: string;
  subtitle: string;
  element: string;
  description: string;
  imageUrl: string;
}

export const TAROT_CUPS_SUIT: TarotCupsCard[] = [
  {
    id: "cups_ace",
    cardName: "Ace of Cups",
    suit: "Cups",
    title: "Ace of Cups",
    sanskritTitle: "जल बीज (Divine Flow of Love)",
    subtitle: "Emotional Awakening, Love, Intuition & Spiritual Abundance",
    element: "Water Element • Cancer / Scorpio / Pisces",
    description: "An overflowing chalice radiating divine luminous water with five streams pouring into a calm lotus pond, symbolizing unconditional love and spiritual receptivity.",
    imageUrl: "/src/assets/images/tarot_ace_cups_1786532026171.jpg"
  },
  {
    id: "cups_2",
    cardName: "Two of Cups",
    suit: "Cups",
    title: "II - Two of Cups",
    sanskritTitle: "युगल संगम (Sacred Union)",
    subtitle: "Partnership, Mutual Respect, Love & Harmonic Equilibrium",
    element: "Water Element • Venus in Cancer",
    description: "Two souls pledging devotion and exchanging golden chalices beneath the winged caduceus, symbolizing mutual respect and deep spiritual rapport.",
    imageUrl: "/src/assets/images/tarot_two_cups_1786532041522.jpg"
  },
  {
    id: "cups_3",
    cardName: "Three of Cups",
    suit: "Cups",
    title: "III - Three of Cups",
    sanskritTitle: "उल्लास (Joyous Gathering)",
    subtitle: "Celebration, Sisterhood, Community & Collective Victory",
    element: "Water Element • Mercury in Cancer",
    description: "Three maidens lifting overflowing chalices in celebration amidst blooming grapes and golden harvest, honoring friendship and communal rejoicing.",
    imageUrl: "/src/assets/images/tarot_three_cups_1786532060405.jpg"
  },
  {
    id: "cups_4",
    cardName: "Four of Cups",
    suit: "Cups",
    title: "IV - Four of Cups",
    sanskritTitle: "उदासीनता (Introspection & Apathy)",
    subtitle: "Contemplation, Discontent, Meditation & Missed Opportunity",
    element: "Water Element • Moon in Scorpio",
    description: "A seated figure contemplating three cups on the grass while ignoring an ethereal hand offering a fourth mystical cup from the clouds.",
    imageUrl: "/src/assets/images/tarot_four_cups_1786532074792.jpg"
  },
  {
    id: "cups_5",
    cardName: "Five of Cups",
    suit: "Cups",
    title: "V - Five of Cups",
    sanskritTitle: "शोक मुक्ति (Grief & Healing)",
    subtitle: "Regret, Emotional Transition, Resilience & Renewal",
    element: "Water Element • Mars in Scorpio",
    description: "A cloaked figure mourning three spilled cups, yet two upright chalices stand behind, awaiting rediscovery across a bridge of renewal.",
    imageUrl: "/src/assets/images/tarot_four_cups_1786532074792.jpg"
  },
  {
    id: "cups_6",
    cardName: "Six of Cups",
    suit: "Cups",
    title: "VI - Six of Cups",
    sanskritTitle: "स्मृति सौरभ (Innocence & Memory)",
    subtitle: "Nostalgia, Childhood Purity, Sweet Reunions & Goodwill",
    element: "Water Element • Sun in Scorpio",
    description: "A youth offering a chalice filled with white flowers to a young companion beside an ancient stone courtyard, awakening golden memories.",
    imageUrl: "/src/assets/images/tarot_six_cups_1786532125488.jpg"
  },
  {
    id: "cups_7",
    cardName: "Seven of Cups",
    suit: "Cups",
    title: "VII - Seven of Cups",
    sanskritTitle: "माया विकल्प (Illusion & Choices)",
    subtitle: "Fantasy, Multiverse Options, Daydreaming & Discernment",
    element: "Water Element • Venus in Scorpio",
    description: "Seven mystical cups emerging from billowing clouds offering dragons, gems, laurels, and castled visions, demanding discernment.",
    imageUrl: "/src/assets/images/tarot_seven_cups_1786532144043.jpg"
  },
  {
    id: "cups_8",
    cardName: "Eight of Cups",
    suit: "Cups",
    title: "VIII - Eight of Cups",
    sanskritTitle: "वैराग्य यात्रा (Spiritual Pilgrimage)",
    subtitle: "Walking Away, Higher Calling, Seeking Truth & Deep Quest",
    element: "Water Element • Saturn in Pisces",
    description: "A cloaked wanderer leaving behind eight neatly stacked cups to climb towards a solitary mountain pass under a crescent moon.",
    imageUrl: "/src/assets/images/tarot_eight_cups_1786532158472.jpg"
  },
  {
    id: "cups_9",
    cardName: "Nine of Cups",
    suit: "Cups",
    title: "IX - Nine of Cups",
    sanskritTitle: "मनोकामना सिद्धि (Wish Fulfillment)",
    subtitle: "Contentment, Emotional Satisfaction, Prosperity & Gratitude",
    element: "Water Element • Jupiter in Pisces",
    description: "A content master seated comfortably with arms folded in front of nine shining chalices, embodying the wish card of total fulfillment.",
    imageUrl: "/src/assets/images/tarot_nine_cups_1786532176194.jpg"
  },
  {
    id: "cups_10",
    cardName: "Ten of Cups",
    suit: "Cups",
    title: "X - Ten of Cups",
    sanskritTitle: "आनन्द निलय (Harmonious Home)",
    subtitle: "Domestic Bliss, Family Unity, Wholeness & Radiant Peace",
    element: "Water Element • Mars in Pisces",
    description: "A joyful family celebrating beneath a brilliant rainbow arch of ten golden cups over an idyllic home beside a sparkling river.",
    imageUrl: "/src/assets/images/tarot_ten_cups_1786532192817.jpg"
  },
  {
    id: "cups_page",
    cardName: "Page of Cups",
    suit: "Cups",
    title: "Page of Cups",
    sanskritTitle: "भाव साधक (Messenger of Intuition)",
    subtitle: "Creative Intuition, Gentle Messenger, Emotional Curiosity",
    element: "Earth of Water • Sensitive Vision",
    description: "A youthful courtier gazing with gentle wonder into a golden cup from which a mystical fish emerges, bearing creative messages.",
    imageUrl: "/src/assets/images/tarot_page_cups_1786532217491.jpg"
  },
  {
    id: "cups_knight",
    cardName: "Knight of Cups",
    suit: "Cups",
    title: "Knight of Cups",
    sanskritTitle: "प्रेम दूत (The Romantic Seeker)",
    subtitle: "Poetic Vision, Quest for the Grail, Idealism & Grace",
    element: "Air of Water • Pure Aspiration",
    description: "A graceful knight riding a gentle white steed across a quiet river, bearing a golden chalice with solemn grace and romantic devotion.",
    imageUrl: "/src/assets/images/tarot_knight_cups_1786532232942.jpg"
  },
  {
    id: "cups_queen",
    cardName: "Queen of Cups",
    suit: "Cups",
    title: "Queen of Cups",
    sanskritTitle: "करुणा देवी (Matriarch of Empathy)",
    subtitle: "Psychic Depth, Unconditional Compassion, Emotional Mastery",
    element: "Water of Water • Sovereign Empathy",
    description: "A serene queen seated upon a shell throne at the edge of the sea, holding an ornate closed chalice, peering into the ocean of collective unconscious.",
    imageUrl: "/src/assets/images/tarot_queen_cups_1786533269878.jpg"
  },
  {
    id: "cups_king",
    cardName: "King of Cups",
    suit: "Cups",
    title: "King of Cups",
    sanskritTitle: "भाव सम्राट (Lord of the Waters)",
    subtitle: "Emotional Balance, Wisdom, Calm Leadership & Diplomatic Dignity",
    element: "Fire of Water • Mastered Calm",
    description: "A wise sovereign seated upon a floating stone throne in turbulent waters, calmly holding a golden cup and lotus scepter, completely unperturbed.",
    imageUrl: "/src/assets/images/tarot_king_cups_1786533583057.jpg"
  }
];
