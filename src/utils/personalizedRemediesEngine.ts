// Personalized Vedic Planetary Remedies Engine

export interface PersonalizedPlanetRemedy {
  id: string;
  planet: string;
  sanskritName: string;
  personName: string;
  housePlacement: string;
  severity: "HIGH_MALEFIC" | "MODERATE_AFFLICTION" | "BENEFIC_STRENGTHENING";
  afflictionType: string;
  reason: string;
  impactOnLifeAndRelations: string;
  rulingDeity: string;
  beejMantra: {
    sanskrit: string;
    transliteration: string;
    count: string;
    bestTime: string;
  };
  gemstoneAndYantra: {
    gemstone: string;
    substitute: string;
    metal: string;
    finger: string;
    yantraName: string;
    yantraMaterial: string;
    activationMantra: string;
  };
  donation: {
    bestDay: string;
    items: string[];
    clothColor: string;
    recipient: string;
  };
  lalKitabRemedies: string[];
  vratDetails?: {
    fastingDay: string;
    dietRule: string;
    rituals: string;
  };
}

export function generatePersonalizedRemediesForProfile(
  personName: string = "Seeker",
  profile?: any
): PersonalizedPlanetRemedy[] {
  return [
    {
      id: `rem-saturn-${personName}`,
      planet: "Saturn (Shani)",
      sanskritName: "Shani Shanti Vidhi",
      personName,
      housePlacement: "Saturn in 12th House (Aquarius)",
      severity: "MODERATE_AFFLICTION",
      afflictionType: "Karmic Obstacle Neutralizer",
      reason: "Saturn oversees the 12th Bhava representing subconscious expenditures, foreign affairs, and karmic debts.",
      impactOnLifeAndRelations: "May occasionally induce feelings of isolation or delayed results in financial savings and career rewards.",
      rulingDeity: "Lord Shiva & Lord Hanuman",
      beejMantra: {
        sanskrit: "ॐ शं शनैश्चराय नमः",
        transliteration: "Om Sham Shanaishcharaya Namah",
        count: "108 times (1 Mala)",
        bestTime: "Saturday evening at sunset"
      },
      gemstoneAndYantra: {
        gemstone: "Blue Sapphire (Neelam)",
        substitute: "Amethyst or Blue Topaz",
        metal: "Panchadhatu or Silver",
        finger: "Middle Finger of Right Hand",
        yantraName: "Shri Shani Yantra",
        yantraMaterial: "Engraved Iron or Silver Plate",
        activationMantra: "Om Hlim Sham Shanaishcharaya Namah"
      },
      donation: {
        bestDay: "Saturday",
        items: ["Black Sesame (Til)", "Mustard Oil", "Black Urad Dal", "Iron Pan"],
        clothColor: "Dark Blue or Black",
        recipient: "Underprivileged workers, elderly ascetics, or temples"
      },
      lalKitabRemedies: [
        "Light a pure mustard oil lamp under a sacred Peepal tree on Saturday evenings.",
        "Serve and feed stray dogs with fresh mustard-oil smeared rotis.",
        "Maintain disciplined personal conduct and avoid alcohol or gambling."
      ],
      vratDetails: {
        fastingDay: "Saturday",
        dietRule: "Single meal of khichdi cooked with black urad dal after sunset",
        rituals: "Read Dasharatha Shani Stotram 3 times"
      }
    },
    {
      id: `rem-mars-${personName}`,
      planet: "Mars (Mangal)",
      sanskritName: "Mangal Dosha Nivarana",
      personName,
      housePlacement: "Mars in 4th House (Domestic Sanctuary)",
      severity: "HIGH_MALEFIC",
      afflictionType: "Kuja Affliction Pacification",
      reason: "Mars placed in the 4th house exerts 4th house aspect on 7th house of partnerships, potentially spiking emotional heat.",
      impactOnLifeAndRelations: "High energetic intensity; differences of opinion may cause rapid emotional sparks if not grounded patiently.",
      rulingDeity: "Lord Kartikeya (Murugan) & Shri Hanuman",
      beejMantra: {
        sanskrit: "ॐ क्रां क्रीं क्रौं सः भौमाय नमः",
        transliteration: "Om Kraam Kreem Kroum Sah Bhaumaya Namah",
        count: "108 times",
        bestTime: "Tuesday morning during Surya Hora"
      },
      gemstoneAndYantra: {
        gemstone: "Red Coral (Moonga)",
        substitute: "Carnelian or Red Agate",
        metal: "Copper or Gold",
        finger: "Ring Finger",
        yantraName: "Mangal Yantra",
        yantraMaterial: "Pure Copper Plate",
        activationMantra: "Om Bhaumaya Namah"
      },
      donation: {
        bestDay: "Tuesday",
        items: ["Red Lentils (Masoor Dal)", "Jaggery (Gud)", "Copper Utensil", "Sweet Batasha"],
        clothColor: "Bright Red or Saffron",
        recipient: "Temple priests, soldiers, or young students"
      },
      lalKitabRemedies: [
        "Recite Hanuman Chalisa or Sundarkand every Tuesday morning.",
        "Keep a small square piece of pure silver in your pocket or wallet.",
        "Plant a neem or pomegranate tree in a community garden."
      ],
      vratDetails: {
        fastingDay: "Tuesday",
        dietRule: "Salt-free fruit or jaggery halwa diet",
        rituals: "Offer vermilion (sindoor) to Lord Hanuman"
      }
    },
    {
      id: `rem-jupiter-${personName}`,
      planet: "Jupiter (Brihaspati)",
      sanskritName: "Guru Kripa Vardhana",
      personName,
      housePlacement: "Jupiter in 1st House (Lagna Kendra)",
      severity: "BENEFIC_STRENGTHENING",
      afflictionType: "Spiritual & Wisdom Elevation",
      reason: "Benefic Guru blesses the Lagna, bestowing intellect, good fortune, ethical character, and protective aura.",
      impactOnLifeAndRelations: "Strengthens mutual respect, wisdom, progeny prosperity, and spiritual growth in relationships.",
      rulingDeity: "Lord Dakshinamurthy & Lord Vishnu",
      beejMantra: {
        sanskrit: "ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः",
        transliteration: "Om Graam Greem Groum Sah Gurave Namah",
        count: "108 times",
        bestTime: "Thursday morning during Brahma Muhurat"
      },
      gemstoneAndYantra: {
        gemstone: "Yellow Sapphire (Pukhraj)",
        substitute: "Yellow Topaz or Citrine",
        metal: "Gold or Brass",
        finger: "Index Finger",
        yantraName: "Brihaspati Yantra",
        yantraMaterial: "Engraved Brass or Gold Plated",
        activationMantra: "Om Gurave Namah"
      },
      donation: {
        bestDay: "Thursday",
        items: ["Chana Dal (Bengal Gram)", "Turmeric Whole", "Yellow Sweets / Bananas", "Spiritual Books"],
        clothColor: "Yellow / Saffron",
        recipient: "Spiritual teachers, brahmins, or academic institutions"
      },
      lalKitabRemedies: [
        "Apply saffron or yellow sandalwood tilak on the forehead and navel every morning.",
        "Respect teachers, elders, and spiritual mentors diligently.",
        "Water a banana plant on Thursdays without touching it with salt."
      ]
    }
  ];
}
