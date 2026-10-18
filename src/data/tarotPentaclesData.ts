export interface TarotPentaclesCard {
  id: string;
  cardName: string;
  suit: "Pentacles";
  title: string;
  sanskritTitle: string;
  subtitle: string;
  element: string;
  description: string;
  imageUrl: string;
}

export const TAROT_PENTACLES_SUIT: TarotPentaclesCard[] = [
  {
    id: "pentacles_ace",
    cardName: "Ace of Pentacles",
    suit: "Pentacles",
    title: "Ace of Pentacles",
    sanskritTitle: "पृथ्वी रत्न (Divine Seed of Abundance)",
    subtitle: "Manifestation, Wealth, Prosperity, Security & Growth",
    element: "Earth Element • Taurus / Virgo / Capricorn",
    description: "A divine glowing hand emerging from clouds offering a golden coin engraved with a star pentagram over a blooming lily garden and archway.",
    imageUrl: "/src/assets/images/tarot_ace_pentacles_oil_1786620434493.jpg"
  },
  {
    id: "pentacles_2",
    cardName: "Two of Pentacles",
    suit: "Pentacles",
    title: "II - Two of Pentacles",
    sanskritTitle: "संतुलन चक्र (Dynamic Equilibrium)",
    subtitle: "Balance, Adaptability, Time Management & Financial Flow",
    element: "Earth Element • Jupiter in Capricorn",
    description: "A youth juggling two golden pentacle coins within an infinite lemniscate loop against rolling ocean waves, keeping balance amidst change.",
    imageUrl: "/src/assets/images/tarot_two_pentacles_oil_1786620449024.jpg"
  },
  {
    id: "pentacles_3",
    cardName: "Three of Pentacles",
    suit: "Pentacles",
    title: "III - Three of Pentacles",
    sanskritTitle: "शिल्प योग (Master Craftsmanship)",
    subtitle: "Teamwork, Mastery, Collaboration & Building Excellence",
    element: "Earth Element • Mars in Capricorn",
    description: "A skilled stone sculptor consulting plans with a priest and architect inside a cathedral archway decorated with three golden pentacles.",
    imageUrl: "/src/assets/images/tarot_three_pentacles_real_1786620985866.jpg"
  },
  {
    id: "pentacles_4",
    cardName: "Four of Pentacles",
    suit: "Pentacles",
    title: "IV - Four of Pentacles",
    sanskritTitle: "कोष रक्षण (Conservation of Wealth)",
    subtitle: "Financial Security, Savings, Boundaries & Stability",
    element: "Earth Element • Sun in Capricorn",
    description: "A prosperous figure crowned and holding four golden pentacle coins securely at heart, feet, and head, establishing firm financial stability.",
    imageUrl: "/src/assets/images/tarot_four_pentacles_1786626459005.jpg"
  },
  {
    id: "pentacles_5",
    cardName: "Five of Pentacles",
    suit: "Pentacles",
    title: "V - Five of Pentacles",
    sanskritTitle: "आश्रय अन्वेषण (Seeking Sanctuary)",
    subtitle: "Temporary Hardship, Spiritual Shelter & Recovery",
    element: "Earth Element • Mercury in Taurus",
    description: "Two travelers walking through snow past a glowing stained-glass chapel window displaying five golden pentacles, reminding that shelter is nearby.",
    imageUrl: "/src/assets/images/tarot_five_pentacles_real_1786619855776.jpg"
  },
  {
    id: "pentacles_6",
    cardName: "Six of Pentacles",
    suit: "Pentacles",
    title: "VI - Six of Pentacles",
    sanskritTitle: "दान धर्म (Sacred Charity & Flow)",
    subtitle: "Generosity, Sharing Wealth, Karma & Financial Blessing",
    element: "Earth Element • Moon in Taurus",
    description: "A generous merchant holding scales of justice while sharing golden coins with grateful seekers, upholding sacred karmic balance and charity.",
    imageUrl: "/src/assets/images/tarot_six_pentacles_real_1786619871976.jpg"
  },
  {
    id: "pentacles_7",
    cardName: "Seven of Pentacles",
    suit: "Pentacles",
    title: "VII - Seven of Pentacles",
    sanskritTitle: "फल प्रतीक्षा (Patient Harvest)",
    subtitle: "Investment, Patience, Long-Term Reward & Assessment",
    element: "Earth Element • Saturn in Taurus",
    description: "A hard-working gardener resting on a hoe, contemplating a lush vine blooming with seven golden pentacle coins awaiting harvest.",
    imageUrl: "/src/assets/images/tarot_seven_pentacles_real_1786619885420.jpg"
  },
  {
    id: "pentacles_8",
    cardName: "Eight of Pentacles",
    suit: "Pentacles",
    title: "VIII - Eight of Pentacles",
    sanskritTitle: "कर्म कौशल (Dedicated Craft)",
    subtitle: "Skill Development, Apprenticeship, Detail & Diligence",
    element: "Earth Element • Sun in Virgo",
    description: "A dedicated artisan carefully carving a star pentagram onto golden coins, displaying eight completed masterworks on a wooden post.",
    imageUrl: "/src/assets/images/tarot_eight_pentacles_real_1786619900398.jpg"
  },
  {
    id: "pentacles_9",
    cardName: "Nine of Pentacles",
    suit: "Pentacles",
    title: "IX - Nine of Pentacles",
    sanskritTitle: "समृद्धि स्वामिनी (Abundant Independence)",
    subtitle: "Self-Reliance, Luxury, Refinement & Garden of Success",
    element: "Earth Element • Venus in Virgo",
    description: "An elegant lady strolling through a vineyard filled with nine golden pentacle coins, holding a hooded falcon in peaceful self-reliance.",
    imageUrl: "/src/assets/images/tarot_nine_pentacles_real_1786619911474.jpg"
  },
  {
    id: "pentacles_10",
    cardName: "Ten of Pentacles",
    suit: "Pentacles",
    title: "X - Ten of Pentacles",
    sanskritTitle: "कुल समृद्धि (Generational Prosperity)",
    subtitle: "Legacy, Wealth, Family Heritage, Tradition & Abundance",
    element: "Earth Element • Mercury in Virgo",
    description: "A wealthy multi-generational family and loyal dogs gathered in an estate courtyard under ten golden pentacles arranged in the Tree of Life.",
    imageUrl: "/src/assets/images/tarot_ten_pentacles_1786626507009.jpg"
  },
  {
    id: "pentacles_page",
    cardName: "Page of Pentacles",
    suit: "Pentacles",
    title: "Page of Pentacles",
    sanskritTitle: "विद्या साधक (Dedicated Student)",
    subtitle: "Study, New Opportunity, Practical Skills & Ambition",
    element: "Earth of Earth • Diligent Apprentice",
    description: "A focused youth standing in a blooming green meadow holding up a golden pentacle coin with reverent study and high aspirations.",
    imageUrl: "/src/assets/images/tarot_page_pentacles_1786626757786.jpg"
  },
  {
    id: "pentacles_knight",
    cardName: "Knight of Pentacles",
    suit: "Pentacles",
    title: "Knight of Pentacles",
    sanskritTitle: "धैर्य रक्षक (Steadfast Provider)",
    subtitle: "Reliability, Methodical Hard Work, Duty & Security",
    element: "Air of Earth • Unwavering Protector",
    description: "A steadfast knight on a heavy dark plow horse overlooking freshly tilled fields, holding a golden pentacle with calm, enduring duty.",
    imageUrl: "/src/assets/images/tarot_knight_pentacles_1786626774563.jpg"
  },
  {
    id: "pentacles_queen",
    cardName: "Queen of Pentacles",
    suit: "Pentacles",
    title: "Queen of Pentacles",
    sanskritTitle: "अन्नपूर्णा स्वामिनी (Queen of Earthly Abundance)",
    subtitle: "Nurturing, Generosity, Financial Security & Nature",
    element: "Earth Mother",
    description: "A gracious queen seated on a carved stone throne surrounded by flora and fauna, holding a golden pentacle with loving maternal warmth.",
    imageUrl: "/src/assets/images/tarot_queen_pentacles_1786626931655.jpg"
  },
  {
    id: "pentacles_king",
    cardName: "King of Pentacles",
    suit: "Pentacles",
    title: "King of Pentacles",
    sanskritTitle: "कुबेर स्वामी (Master of Wealth & Legacy)",
    subtitle: "Financial Mastery, Enterprise, Security & Leadership",
    element: "Fire of Earth • Wealthy Provider",
    description: "A majestic king seated on a bull-carved throne in a castle garden, holding a golden scepter and pentacle coin in ultimate mastery.",
    imageUrl: "/src/assets/images/king_of_pentacles_1786698229584.jpg"
  }
];
