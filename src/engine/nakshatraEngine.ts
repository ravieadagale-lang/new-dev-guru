// AstroNext High-Precision Nakshatra Calculation Engine

import { normalizeDeg } from "./astronomyMath";

export interface NakshatraPlacementDetails {
  index: number;              // 0 to 26
  name: string;               // "Ashwini", "Bharani", etc.
  sanskritName: string;
  lord: string;               // "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"
  pada: number;               // 1 to 4
  degreeInPada: number;       // 0 to 3.3333°
  totalDegrees: number;       // Longitude normalized
  deity: string;
  symbol: string;
  animal: string;
  gana: "Deva" | "Manushya" | "Rakshasa";
  yoni: string;
  nadi: "Adi" | "Madhya" | "Antya";
}

export const NAKSHATRAS: Array<{
  index: number;
  name: string;
  sanskrit: string;
  lord: string;
  deity: string;
  symbol: string;
  animal: string;
  gana: "Deva" | "Manushya" | "Rakshasa";
  yoni: string;
  nadi: "Adi" | "Madhya" | "Antya";
}> = [
  { index: 0, name: "Ashwini", sanskrit: "अश्विनी", lord: "Ketu", deity: "Ashwini Kumaras", symbol: "Horse's Head", animal: "Horse", gana: "Deva", yoni: "Male Horse", nadi: "Adi" },
  { index: 1, name: "Bharani", sanskrit: "भरणी", lord: "Venus", deity: "Yama", symbol: "Yoni", animal: "Elephant", gana: "Manushya", yoni: "Female Elephant", nadi: "Madhya" },
  { index: 2, name: "Krittika", sanskrit: "कृत्तिका", lord: "Sun", deity: "Agni", symbol: "Razor / Flame", animal: "Sheep", gana: "Rakshasa", yoni: "Female Sheep", nadi: "Antya" },
  { index: 3, name: "Rohini", sanskrit: "रोहिणी", lord: "Moon", deity: "Brahma", symbol: "Chariot", animal: "Serpent", gana: "Manushya", yoni: "Male Serpent", nadi: "Antya" },
  { index: 4, name: "Mrigashira", sanskrit: "मृगशिरा", lord: "Mars", deity: "Soma", symbol: "Deer's Head", animal: "Serpent", gana: "Deva", yoni: "Female Serpent", nadi: "Madhya" },
  { index: 5, name: "Ardra", sanskrit: "आर्द्रा", lord: "Rahu", deity: "Rudra", symbol: "Teardrop / Diamond", animal: "Dog", gana: "Manushya", yoni: "Female Dog", nadi: "Adi" },
  { index: 6, name: "Punarvasu", sanskrit: "पुनर्वसु", lord: "Jupiter", deity: "Aditi", symbol: "Bow & Quiver", animal: "Cat", gana: "Deva", yoni: "Female Cat", nadi: "Adi" },
  { index: 7, name: "Pushya", sanskrit: "पुष्य", lord: "Saturn", deity: "Brihaspati", symbol: "Cow's Udder / Lotus", animal: "Goat", gana: "Deva", yoni: "Male Goat", nadi: "Madhya" },
  { index: 8, name: "Ashlesha", sanskrit: "अश्लेषा", lord: "Mercury", deity: "Sarpas", symbol: "Coiled Serpent", animal: "Cat", gana: "Rakshasa", yoni: "Male Cat", nadi: "Antya" },
  { index: 9, name: "Magha", sanskrit: "मघा", lord: "Ketu", deity: "Pitris", symbol: "Royal Throne", animal: "Rat", gana: "Rakshasa", yoni: "Male Rat", nadi: "Antya" },
  { index: 10, name: "Purva Phalguni", sanskrit: "पूर्वा फाल्गुनी", lord: "Venus", deity: "Bhaga", symbol: "Hammock / Front Legs of Bed", animal: "Rat", gana: "Manushya", yoni: "Female Rat", nadi: "Madhya" },
  { index: 11, name: "Uttara Phalguni", sanskrit: "उत्तरा फाल्गुनी", lord: "Sun", deity: "Aryaman", symbol: "Back Legs of Bed", animal: "Cow", gana: "Manushya", yoni: "Male Bull", nadi: "Adi" },
  { index: 12, name: "Hasta", sanskrit: "हस्त", lord: "Moon", deity: "Savitr", symbol: "Open Palm", animal: "Buffalo", gana: "Deva", yoni: "Female Buffalo", nadi: "Adi" },
  { index: 13, name: "Chitra", sanskrit: "चित्रा", lord: "Mars", deity: "Vishvakarma", symbol: "Shining Jewel", animal: "Tiger", gana: "Rakshasa", yoni: "Female Tiger", nadi: "Madhya" },
  { index: 14, name: "Swati", sanskrit: "स्वाति", lord: "Rahu", deity: "Vayu", symbol: "Shoot of Plant / Coral", animal: "Buffalo", gana: "Deva", yoni: "Male Buffalo", nadi: "Antya" },
  { index: 15, name: "Vishakha", sanskrit: "विशाखा", lord: "Jupiter", deity: "Indragni", symbol: "Triumphal Arch", animal: "Tiger", gana: "Rakshasa", yoni: "Male Tiger", nadi: "Antya" },
  { index: 16, name: "Anuradha", sanskrit: "अनुराधा", lord: "Saturn", deity: "Mitra", symbol: "Staff / Lotus", animal: "Deer", gana: "Deva", yoni: "Female Deer", nadi: "Madhya" },
  { index: 17, name: "Jyeshtha", sanskrit: "ज्येष्ठा", lord: "Mercury", deity: "Indra", symbol: "Circular Amulet", animal: "Deer", gana: "Rakshasa", yoni: "Male Deer", nadi: "Adi" },
  { index: 18, name: "Mula", sanskrit: "मूल", lord: "Ketu", deity: "Nirriti", symbol: "Tied Bunch of Roots", animal: "Dog", gana: "Rakshasa", yoni: "Male Dog", nadi: "Adi" },
  { index: 19, name: "Purva Ashadha", sanskrit: "पूर्वाषाढ़ा", lord: "Venus", deity: "Apas", symbol: "Elephant Tusk / Fan", animal: "Monkey", gana: "Manushya", yoni: "Male Monkey", nadi: "Madhya" },
  { index: 20, name: "Uttara Ashadha", sanskrit: "उत्तराषाढ़ा", lord: "Sun", deity: "Vishwadevas", symbol: "Elephant Tusk", animal: "Mongoose", gana: "Manushya", yoni: "Female Mongoose", nadi: "Antya" },
  { index: 21, name: "Shravana", sanskrit: "श्रवण", lord: "Moon", deity: "Vishnu", symbol: "Ear / Three Footprints", animal: "Monkey", gana: "Deva", yoni: "Female Monkey", nadi: "Antya" },
  { index: 22, name: "Dhanishta", sanskrit: "धनिष्ठा", lord: "Mars", deity: "Eight Vasus", symbol: "Mridangam Drum", animal: "Lion", gana: "Rakshasa", yoni: "Female Lion", nadi: "Madhya" },
  { index: 23, name: "Shatabhisha", sanskrit: "शतभिषा", lord: "Rahu", deity: "Varuna", symbol: "Empty Circle / 100 Physicians", animal: "Horse", gana: "Rakshasa", yoni: "Female Horse", nadi: "Adi" },
  { index: 24, name: "Purva Bhadrapada", sanskrit: "पूर्वभाद्रपदा", lord: "Jupiter", deity: "Aja Ekapada", symbol: "Sword / Two-Faced Man", animal: "Lion", gana: "Manushya", yoni: "Male Lion", nadi: "Adi" },
  { index: 25, name: "Uttara Bhadrapada", sanskrit: "उत्तरभाद्रपदा", lord: "Saturn", deity: "Ahirbudhnya", symbol: "Twins / Snake in Deep Waters", animal: "Cow", gana: "Manushya", yoni: "Female Cow", nadi: "Madhya" },
  { index: 26, name: "Revati", sanskrit: "रेवती", lord: "Mercury", deity: "Pushan", symbol: "Fish / Pair of Fish", animal: "Elephant", gana: "Deva", yoni: "Female Elephant", nadi: "Antya" }
];

export class NakshatraEngine {
  private static readonly SPAN: number = 360 / 27; // 13.333333333333334°
  private static readonly PADA_SPAN: number = (360 / 27) / 4; // 3.3333333333333335°

  public static getNakshatraPlacement(longitude: number): NakshatraPlacementDetails {
    const norm = normalizeDeg(longitude);
    const nakIdx = Math.floor(norm / this.SPAN);
    const safeIdx = Math.min(nakIdx, 26);
    const nak = NAKSHATRAS[safeIdx];

    const offsetInNak = norm - (safeIdx * this.SPAN);
    const padaZeroIndexed = Math.floor(offsetInNak / this.PADA_SPAN);
    const pada = Math.min(Math.max(padaZeroIndexed + 1, 1), 4);
    const degreeInPada = offsetInNak % this.PADA_SPAN;

    return {
      index: nak.index,
      name: nak.name,
      sanskritName: nak.sanskrit,
      lord: nak.lord,
      pada,
      degreeInPada,
      totalDegrees: norm,
      deity: nak.deity,
      symbol: nak.symbol,
      animal: nak.animal,
      gana: nak.gana,
      yoni: nak.yoni,
      nadi: nak.nadi
    };
  }

  public static getAllNakshatras() {
    return NAKSHATRAS;
  }
}
