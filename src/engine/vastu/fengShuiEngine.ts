import {
  BaguaPalace,
  FlyingStarData,
  PersonalKuaResult,
  FengShuiElement
} from "../../types/vastuTypes";

// ==========================================
// 1. THE 9 BAGUA PALACES (LUO SHU SECTORS)
// ==========================================
export const BAGUA_PALACES: BaguaPalace[] = [
  {
    id: "wealth",
    trigram: "☴ Xun (Wind)",
    chineseName: "巽 (Xùn)",
    englishName: "Wealth & Abundance",
    direction: "South-East",
    element: "Wood",
    lifeAspiration: "Material Prosperity, Inflow of Fortunes, Blessing of Wealth",
    color: "Emerald Green, Purple, Deep Violet, Gold",
    shapes: "Tall Columns, Rectangular Pillars, Vertical Stripes",
    enhancers: [
      "Healthy lush money tree or jade plant in green ceramic pot",
      "Gently circulating indoor water fountain (water feeds wood)",
      "Citrine crystal cluster or 3 Chinese coins tied with red ribbon",
      "Amethyst geode for accumulating long-term financial reserves"
    ],
    taboos: [
      "Avoid heavy metal objects or unpainted iron beams (metal chops wood)",
      "Avoid clutter, trash bins, or leaking taps which symbolize money draining"
    ]
  },
  {
    id: "fame",
    trigram: "☲ Li (Fire)",
    chineseName: "離 (Lí)",
    englishName: "Fame & Reputation",
    direction: "South",
    element: "Fire",
    lifeAspiration: "Public Recognition, Respect, Social Influence, Charisma",
    color: "Ruby Red, Coral, Warm Orange, Bright Crimson",
    shapes: "Triangles, Flames, Cones, Starbursts",
    enhancers: [
      "Bright upward-pointing illumination or warm red lamp",
      "Diplomas, industry awards, and press features in wooden frames",
      "Phoenix figurine, red horse galloping in, or peacock feathers",
      "Red or burgundy candleholders lit during social celebrations"
    ],
    taboos: [
      "Avoid excess mirrors or dark blue water features (water extinguishes fire)",
      "Never leave south sector dark or cluttered"
    ]
  },
  {
    id: "relationships",
    trigram: "☷ Kun (Earth)",
    chineseName: "坤 (Kūn)",
    englishName: "Love & Relationships",
    direction: "South-West",
    element: "Earth",
    lifeAspiration: "Marital Bliss, Genuine Romance, Partnership Trust, Maternal Care",
    color: "Soft Pink, Peach, Warm Terracotta, Warm Ochre",
    shapes: "Squares, Low Flat Cubes, Horizontal Lines",
    enhancers: [
      "Pair of Rose Quartz mandarin ducks or crystal hearts (always in pairs)",
      "Photograph of smiling couple in ceramic or gold frame",
      "Double-Happiness symbol carved in wood or embroidered in silk",
      "Warm Himalayan pink salt lamp for grounding emotional intimacy"
    ],
    taboos: [
      "Avoid solitary single figures or portraits of lonely individuals",
      "Avoid thorny plants (cacti) or harsh aggressive metal edges"
    ]
  },
  {
    id: "family",
    trigram: "☳ Zhen (Thunder)",
    chineseName: "震 (Zhèn)",
    englishName: "Family & Ancestors",
    direction: "East",
    element: "Wood",
    lifeAspiration: "Family Health, Harmony with Parents, Roots & Physical Vitality",
    color: "Forest Green, Deep Emerald, Oceanic Blue",
    shapes: "Tall Vertical Rectangles, Tree Trunks",
    enhancers: [
      "Vibrant indoor bamboo stalks (lucky bamboo in clean water)",
      "Cherished family portraits showing laughter and unity",
      "Wooden dragon carving facing towards the room",
      "Lush foliage plants with rounded leaves"
    ],
    taboos: [
      "Avoid dead dry flowers, dying plants, or rusted metal tools",
      "Avoid sharp scissors or swords displayed on walls"
    ]
  },
  {
    id: "health_center",
    trigram: "☯ Tai Chi (Center)",
    chineseName: "太極 (Tài Jí)",
    englishName: "Health, Balance & The Core",
    direction: "Center (Heart of Home)",
    element: "Earth",
    lifeAspiration: "Overall Vitality, Peace of Mind, Equilibrium of All 8 Aspirations",
    color: "Golden Yellow, Cream, Sand, Warm Earth",
    shapes: "Flat Squares, Solid Center Platforms",
    enhancers: [
      "Keep this zone open, illuminated, clean, and uncluttered",
      "Natural yellow jasper, tiger eye, or round crystal chandelier",
      "Ceramic bowl filled with smooth river stones",
      "Calm, soothing artwork with rolling golden hills"
    ],
    taboos: [
      "Never build stairs, toilets, or heavy pillars directly in the geometric center",
      "Avoid heavy fire (kitchen stove) or dark pits in the center"
    ]
  },
  {
    id: "children_creativity",
    trigram: "☱ Dui (Lake)",
    chineseName: "兌 (Duì)",
    englishName: "Children & Creativity",
    direction: "West",
    element: "Metal",
    lifeAspiration: "Progeny Happiness, Creative Inspiration, Completion of Projects",
    color: "Pure White, Silver, Gold, Metallic Grey",
    shapes: "Circles, Ovals, Spheres, Arches",
    enhancers: [
      "Hollow brass 6-rod metal wind chime with melodious tone",
      "Metal art easels, musical instruments, or creative portfolios",
      "Children's joyful artwork framed in silver or brushed gold",
      "White quartz or pyrite sphere on brass stand"
    ],
    taboos: [
      "Avoid red walls or open flames (fire melts metal)",
      "Avoid dark stagnant corners"
    ]
  },
  {
    id: "knowledge",
    trigram: "☶ Gen (Mountain)",
    chineseName: "艮 (Gèn)",
    englishName: "Knowledge & Self-Cultivation",
    direction: "North-East",
    element: "Earth",
    lifeAspiration: "Wisdom, Academic Success, Meditation, Spiritual Discernment",
    color: "Warm Sand, Cream, Light Blue, Turquoise",
    shapes: "Solid Mountains, Flat Cubes",
    enhancers: [
      "Study bookshelf with inspiring literature and spiritual texts",
      "Natural crystal pagoda (Wen Chang Pagoda) for exam excellence",
      "Quiet meditation cushion or ergonomic study desk",
      "Globe or smooth mountain rock kept on the desk"
    ],
    taboos: [
      "Avoid garbage disposals, shoe racks, or chaotic clutter",
      "Avoid noisy appliances that disturb deep concentration"
    ]
  },
  {
    id: "career",
    trigram: "☵ Kan (Water)",
    chineseName: "坎 (Kǎn)",
    englishName: "Career & Life Journey",
    direction: "North",
    element: "Water",
    lifeAspiration: "Career Advancement, Job Opportunities, Life Path Fulfillment",
    color: "Midnight Blue, Deep Navy, Glossy Black, Metallic Silver",
    shapes: "Wavy Lines, Undulating Curves, Freeforms",
    enhancers: [
      "Aquarium or flowing water fountain with clean running water",
      "Artwork depicting clear, calm meandering rivers or calm oceans",
      "Metal decorative accents (metal nourishes water)",
      "Vision board or professional credentials"
    ],
    taboos: [
      "Avoid earthy heavy terracotta or deep yellow walls (earth dams water)",
      "Avoid dried-up fountains or stagnant murky water"
    ]
  },
  {
    id: "helpful_people",
    trigram: "☰ Qian (Heaven)",
    chineseName: "乾 (Qián)",
    englishName: "Helpful People & Travel",
    direction: "North-West",
    element: "Metal",
    lifeAspiration: "Mentorship, Patron Support, International Travel, Divine Assistance",
    color: "Metallic Silver, Gold, Bright White, Pearl",
    shapes: "Circles, Domes, Spheres",
    enhancers: [
      "6-rod solid brass metal wind chime (6 is the number of Qian)",
      "Images of inspiring mentors, international maps, or travel guides",
      "Silver dragon or celestial guardian figurine",
      "Clean metallic desk organizer with silver pens"
    ],
    taboos: [
      "Avoid open fireplaces or kitchen stoves in NW (Fire melts Heaven)",
      "Avoid clutter or broken items in this patriarchal sector"
    ]
  }
];

// ==========================================
// 2. PERIOD 9 FLYING STARS (2024–2043)
// ==========================================
export const PERIOD_9_FLYING_STARS: FlyingStarData[] = [
  {
    starNumber: 9,
    name: "Purple Star 9 (You Bi)",
    element: "Fire",
    nature: "Timely (Prosperous)",
    period9Status: "Supreme Wealth",
    influence: "The Supreme Ruling Star of Period 9 (2024–2043). Bestows extraordinary wealth, viral fame, tech/AI prosperity, joy, and rapid breakthroughs.",
    annual2026Sector: "South-West (Moves each lunar year)",
    annual2027Sector: "East",
    traditionalCure: "Activate with bright warm lighting, 9 red ribbons, living green plants (wood feeds fire), and festive celebration.",
    cureCategory: "Fire / Red Lamp"
  },
  {
    starNumber: 1,
    name: "White Star 1 (Tan Lang)",
    element: "Water",
    nature: "Auspicious",
    period9Status: "Future Prosperity",
    influence: "Future prosperity star. Brings wisdom, academic brilliance, career promotion, and noble mentors.",
    annual2026Sector: "North",
    annual2027Sector: "South-West",
    traditionalCure: "Activate with clean flowing water fountain, metal coin sword, or crystal sphere.",
    cureCategory: "Water Fountain"
  },
  {
    starNumber: 8,
    name: "White Star 8 (Zuo Fu)",
    element: "Earth",
    nature: "Auspicious",
    period9Status: "Stable Earth",
    influence: "Past prosperity star from Period 8, still highly benevolent. Governs real estate stability, steady savings, and moral character.",
    annual2026Sector: "North-East",
    annual2027Sector: "South",
    traditionalCure: "Place natural yellow crystals, amethysts, or ceramic statues.",
    cureCategory: "Earth Crystals"
  },
  {
    starNumber: 6,
    name: "White Star 6 (Wu Qu)",
    element: "Metal",
    nature: "Auspicious",
    period9Status: "Heavenly Blessings",
    influence: "Heavenly authority star. Attracts sudden windfalls, bureaucratic patronage, executive leadership, and helpful benefactors.",
    annual2026Sector: "North-East / East",
    annual2027Sector: "North-East",
    traditionalCure: "Activate with 6 Chinese bronze coins or a brass Wu Lou.",
    cureCategory: "Brass Wu Lou"
  },
  {
    starNumber: 4,
    name: "Green Star 4 (Wen Qu)",
    element: "Wood",
    nature: "Neutral",
    period9Status: "Academic / Romance",
    influence: "Academic and romance star. Enhances study concentration, literary eloquence, art, and courtship.",
    annual2026Sector: "North-West",
    annual2027Sector: "West",
    traditionalCure: "Place 4 stalks of lucky bamboo in clean water or a crystal pagoda.",
    cureCategory: "Earth Crystals"
  },
  {
    starNumber: 5,
    name: "Yellow Star 5 (Lian Zhen - Five Yellow)",
    element: "Earth",
    nature: "Affliction (Inauspicious)",
    period9Status: "Misfortune",
    influence: "The most dangerous affliction in Feng Shui. Can trigger severe unexpected accidents, financial catastrophe, and sudden illnesses.",
    annual2026Sector: "South / Center",
    annual2027Sector: "North-West",
    traditionalCure: "DO NOT DISTURB WITH DRILLING OR RENOVATION. Neutralize with a traditional Salt Water Cure and a 6-rod all-metal wind chime.",
    cureCategory: "Salt Water Cure"
  },
  {
    starNumber: 2,
    name: "Black Star 2 (Ju Men - Illness Star)",
    element: "Earth",
    nature: "Affliction (Inauspicious)",
    period9Status: "Illness",
    influence: "The sickness star. Can induce chronic digestive disorders, abdominal issues, fatigue, and lingering sickness.",
    annual2026Sector: "South-East",
    annual2027Sector: "Center",
    traditionalCure: "Hang a natural hollow Brass Wu Lou (Calabash) with red ribbon to absorb negative illness chi.",
    cureCategory: "Brass Wu Lou"
  },
  {
    starNumber: 3,
    name: "Jade Star 3 (Lu Cun - Conflict Star)",
    element: "Wood",
    nature: "Affliction (Inauspicious)",
    period9Status: "Conflict",
    influence: "The star of arguments, litigation, theft, and gossip. Causes discord between partners and family members.",
    annual2026Sector: "Center / West",
    annual2027Sector: "South-East",
    traditionalCure: "Burn a red lamp or place a bright red rug to exhaust the wood energy through fire.",
    cureCategory: "Fire / Red Lamp"
  },
  {
    starNumber: 7,
    name: "Red Star 7 (Po Jun - Robbery Star)",
    element: "Metal",
    nature: "Affliction (Inauspicious)",
    period9Status: "Robbery / Loss",
    influence: "Violent metal star. Associated with burglary, betrayal by colleagues, metal injuries, and deception.",
    annual2026Sector: "West / North",
    annual2027Sector: "North",
    traditionalCure: "Place a transparent bowl of still water with 3 lucky bamboo stems to rust/weaken the rogue metal.",
    cureCategory: "Water Fountain"
  }
];

// ==========================================
// 3. PERSONAL KUA NUMBER CALCULATOR
// ==========================================
export function calculatePersonalKua(
  birthYear: number,
  gender: "male" | "female"
): PersonalKuaResult {
  // If born in Jan/early Feb before Solar Chinese New Year (~Feb 4),
  // year should theoretically be year-1, but taking direct year as baseline.
  let y = birthYear;

  // Sum digits of year
  let sum = (y % 10) + Math.floor((y / 10) % 10) + Math.floor((y / 100) % 10) + Math.floor(y / 1000);
  while (sum > 9) {
    sum = (sum % 10) + Math.floor(sum / 10);
  }

  let kua: number;
  if (gender === "male") {
    // For males born in 2000+: 9 - sum; born before 2000: 10 - sum
    const base = y >= 2000 ? 9 : 10;
    kua = base - sum;
    if (kua <= 0) kua += 9;
    if (kua === 5) kua = 2; // Male 5 converts to 2 (Kun)
  } else {
    // For females born in 2000+: 6 + sum; born before 2000: 5 + sum
    const base = y >= 2000 ? 6 : 5;
    kua = (base + sum) % 9;
    if (kua === 0) kua = 9;
    if (kua === 5) kua = 8; // Female 5 converts to 8 (Gen)
  }

  const KUA_CONFIG: Record<
    number,
    {
      trigram: string;
      element: FengShuiElement;
      group: "East Group (Dong Si Ming)" | "West Group (Xi Si Ming)";
      shengChi: string;
      tienYi: string;
      nienYen: string;
      fuWei: string;
      huoHai: string;
      wuGui: string;
      liuSha: string;
      jueMing: string;
    }
  > = {
    1: {
      trigram: "☵ Kan (Water)",
      element: "Water",
      group: "East Group (Dong Si Ming)",
      shengChi: "South-East (Great Wealth & Vitality)",
      tienYi: "East (Health & Divine Doctor)",
      nienYen: "South (Love & Romance)",
      fuWei: "North (Inner Growth & Focus)",
      huoHai: "West (Mishaps & Obstacles)",
      wuGui: "North-East (Five Ghosts & Betrayal)",
      liuSha: "North-West (Six Killings & Legal Trouble)",
      jueMing: "South-West (Total Loss - Avoid)"
    },
    2: {
      trigram: "☷ Kun (Earth)",
      element: "Earth",
      group: "West Group (Xi Si Ming)",
      shengChi: "North-East (Great Wealth & Wisdom)",
      tienYi: "West (Health & Good Vitality)",
      nienYen: "North-West (Love & Social Networking)",
      fuWei: "South-West (Peace of Mind)",
      huoHai: "East (Mishaps & Obstacles)",
      wuGui: "South-East (Five Ghosts & Conflict)",
      liuSha: "South (Six Killings & Scandals)",
      jueMing: "North (Total Loss - Avoid)"
    },
    3: {
      trigram: "☳ Zhen (Wood)",
      element: "Wood",
      group: "East Group (Dong Si Ming)",
      shengChi: "South (Fame & Boundless Energy)",
      tienYi: "North (Immunity & Deep Healing)",
      nienYen: "South-East (Marital Harmony)",
      fuWei: "East (Personal Vitality)",
      huoHai: "South-West (Mishaps & Hurdles)",
      wuGui: "North-West (Five Ghosts & Enmity)",
      liuSha: "North-East (Six Killings & Misfortune)",
      jueMing: "West (Total Loss - Avoid)"
    },
    4: {
      trigram: "☴ Xun (Wood)",
      element: "Wood",
      group: "East Group (Dong Si Ming)",
      shengChi: "North (Career Boom & Wealth)",
      tienYi: "South (Health & Joy)",
      nienYen: "East (Affection & Enduring Bonds)",
      fuWei: "South-East (Wisdom & Abundance)",
      huoHai: "North-West (Mishaps & Distractions)",
      wuGui: "South-West (Five Ghosts & Discord)",
      liuSha: "West (Six Killings & Legal Battles)",
      jueMing: "North-East (Total Loss - Avoid)"
    },
    6: {
      trigram: "☰ Qian (Metal)",
      element: "Metal",
      group: "West Group (Xi Si Ming)",
      shengChi: "West (Abundance & Executive Glory)",
      tienYi: "North-East (Longevity & Health)",
      nienYen: "South-West (Deep Emotional Bonds)",
      fuWei: "North-West (Leadership Authority)",
      huoHai: "South-East (Mishaps & Friction)",
      wuGui: "East (Five Ghosts & Fires)",
      liuSha: "North (Six Killings & Bad Luck)",
      jueMing: "South (Total Loss - Avoid)"
    },
    7: {
      trigram: "☱ Dui (Metal)",
      element: "Metal",
      group: "West Group (Xi Si Ming)",
      shengChi: "North-West (Patrons & Massive Wealth)",
      tienYi: "South-West (Health & Immunity)",
      nienYen: "North-East (Long-Lasting Romance)",
      fuWei: "West (Creative Spark & Serenity)",
      huoHai: "North (Mishaps & Delays)",
      wuGui: "South (Five Ghosts & Anger)",
      liuSha: "South-East (Six Killings & Envy)",
      jueMing: "East (Total Loss - Avoid)"
    },
    8: {
      trigram: "☶ Gen (Earth)",
      element: "Earth",
      group: "West Group (Xi Si Ming)",
      shengChi: "South-West (Wealth & Real-Estate Boom)",
      tienYi: "North-West (Mentors & Vitality)",
      nienYen: "West (Family Joy & Romance)",
      fuWei: "North-East (Academic & Meditative Peace)",
      huoHai: "South (Mishaps & Exhaustion)",
      wuGui: "North (Five Ghosts & Instability)",
      liuSha: "East (Six Killings & Clashes)",
      jueMing: "South-East (Total Loss - Avoid)"
    },
    9: {
      trigram: "☲ Li (Fire)",
      element: "Fire",
      group: "East Group (Dong Si Ming)",
      shengChi: "East (Supreme Fortune & Energy)",
      tienYi: "South-East (Rejuvenation & Health)",
      nienYen: "North (Partnership Fulfillment)",
      fuWei: "South (Public Charisma & Fame)",
      huoHai: "North-East (Mishaps & Misunderstandings)",
      wuGui: "West (Five Ghosts & Quarrels)",
      liuSha: "South-West (Six Killings & Heartaches)",
      jueMing: "North-West (Total Loss - Avoid)"
    }
  };

  const item = KUA_CONFIG[kua] || KUA_CONFIG[1];

  return {
    kuaNumber: kua,
    trigram: item.trigram,
    element: item.element,
    group: item.group,
    auspiciousDirections: [
      {
        name: "Sheng Chi (Generating Chi)",
        chinese: "生氣",
        direction: item.shengChi,
        benefit: "Best for main desk facing direction, front door, and primary career negotiations."
      },
      {
        name: "Tien Yi (Heavenly Doctor)",
        chinese: "天醫",
        direction: item.tienYi,
        benefit: "Best for bed headboard when recovering from illness, restoring deep sleep and vitality."
      },
      {
        name: "Nien Yen (Longevity & Relationships)",
        chinese: "延年",
        direction: item.nienYen,
        benefit: "Best for master bed alignment to nurture lasting marriage and social harmony."
      },
      {
        name: "Fu Wei (Stability & Harmony)",
        chinese: "伏位",
        direction: item.fuWei,
        benefit: "Best for meditation spaces, quiet study desks, and personal reflection."
      }
    ],
    inauspiciousDirections: [
      {
        name: "Huo Hai (Accidents & Mishaps)",
        chinese: "禍害",
        direction: item.huoHai,
        warning: "Causes constant minor arguments, annoying delays, and petty losses.",
        mitigation: "Keep closed; avoid placing headboard or main desk facing this direction."
      },
      {
        name: "Wu Gui (Five Ghosts)",
        chinese: "五鬼",
        direction: item.wuGui,
        warning: "Brings backstabbing, employee deception, theft, and domestic quarrels.",
        mitigation: "Place a metal cure or bathroom/storage room to suppress the ghost chi."
      },
      {
        name: "Liu Sha (Six Killings)",
        chinese: "六煞",
        direction: item.liuSha,
        warning: "Can trigger scandals, legal disputes, bodily illnesses, and ruined relations.",
        mitigation: "Ground with earth crystals or a calm salt water bowl."
      },
      {
        name: "Jue Ming (Total Loss)",
        chinese: "絕命",
        direction: item.jueMing,
        warning: "The worst direction. Can cause severe financial ruin, accidents, and life collapse.",
        mitigation: "Never face this direction when working or sleeping. Suppress with solid wall."
      }
    ]
  };
}

// ==========================================
// 4. 24 MOUNTAINS REFERENCE DATA
// ==========================================
export interface Mountain24 {
  name: string;
  chinese: string;
  pinyin: string;
  direction: string;
  angleStart: number;
  angleEnd: number;
  element: FengShuiElement;
  yinYang: "+" | "-";
}

export const MOUNTAINS_24: Mountain24[] = [
  // North (337.5° - 22.5°)
  { name: "Ren", chinese: "壬", pinyin: "Rén", direction: "North 1", angleStart: 337.5, angleEnd: 352.5, element: "Water", yinYang: "+" },
  { name: "Zi", chinese: "子", pinyin: "Zǐ (Rat)", direction: "North 2", angleStart: 352.5, angleEnd: 7.5, element: "Water", yinYang: "-" },
  { name: "Gui", chinese: "癸", pinyin: "Guǐ", direction: "North 3", angleStart: 7.5, angleEnd: 22.5, element: "Water", yinYang: "-" },

  // North-East (22.5° - 67.5°)
  { name: "Chou", chinese: "丑", pinyin: "Chǒu (Ox)", direction: "NE 1", angleStart: 22.5, angleEnd: 37.5, element: "Earth", yinYang: "-" },
  { name: "Gen", chinese: "艮", pinyin: "Gèn", direction: "NE 2", angleStart: 37.5, angleEnd: 52.5, element: "Earth", yinYang: "+" },
  { name: "Yin", chinese: "寅", pinyin: "Yín (Tiger)", direction: "NE 3", angleStart: 52.5, angleEnd: 67.5, element: "Wood", yinYang: "+" },

  // East (67.5° - 112.5°)
  { name: "Jia", chinese: "甲", pinyin: "Jiǎ", direction: "East 1", angleStart: 67.5, angleEnd: 82.5, element: "Wood", yinYang: "+" },
  { name: "Mao", chinese: "卯", pinyin: "Mǎo (Rabbit)", direction: "East 2", angleStart: 82.5, angleEnd: 97.5, element: "Wood", yinYang: "-" },
  { name: "Yi", chinese: "乙", pinyin: "Yǐ", direction: "East 3", angleStart: 97.5, angleEnd: 112.5, element: "Wood", yinYang: "-" },

  // South-East (112.5° - 157.5°)
  { name: "Chen", chinese: "辰", pinyin: "Chén (Dragon)", direction: "SE 1", angleStart: 112.5, angleEnd: 127.5, element: "Earth", yinYang: "-" },
  { name: "Xun", chinese: "巽", pinyin: "Xùn", direction: "SE 2", angleStart: 127.5, angleEnd: 142.5, element: "Wood", yinYang: "+" },
  { name: "Si", chinese: "巳", pinyin: "Sì (Snake)", direction: "SE 3", angleStart: 142.5, angleEnd: 157.5, element: "Fire", yinYang: "+" },

  // South (157.5° - 202.5°)
  { name: "Bing", chinese: "丙", pinyin: "Bǐng", direction: "South 1", angleStart: 157.5, angleEnd: 172.5, element: "Fire", yinYang: "+" },
  { name: "Wu", chinese: "午", pinyin: "Wǔ (Horse)", direction: "South 2", angleStart: 172.5, angleEnd: 187.5, element: "Fire", yinYang: "-" },
  { name: "Ding", chinese: "丁", pinyin: "Dīng", direction: "South 3", angleStart: 187.5, angleEnd: 202.5, element: "Fire", yinYang: "-" },

  // South-West (202.5° - 247.5°)
  { name: "Wei", chinese: "未", pinyin: "Wèi (Goat)", direction: "SW 1", angleStart: 202.5, angleEnd: 217.5, element: "Earth", yinYang: "-" },
  { name: "Kun", chinese: "坤", pinyin: "Kūn", direction: "SW 2", angleStart: 217.5, angleEnd: 232.5, element: "Earth", yinYang: "+" },
  { name: "Shen", chinese: "申", pinyin: "Shēn (Monkey)", direction: "SW 3", angleStart: 232.5, angleEnd: 247.5, element: "Metal", yinYang: "+" },

  // West (247.5° - 292.5°)
  { name: "Geng", chinese: "庚", pinyin: "Gēng", direction: "West 1", angleStart: 247.5, angleEnd: 262.5, element: "Metal", yinYang: "+" },
  { name: "You", chinese: "酉", pinyin: "Yǒu (Rooster)", direction: "West 2", angleStart: 262.5, angleEnd: 277.5, element: "Metal", yinYang: "-" },
  { name: "Xin", chinese: "辛", pinyin: "Xīn", direction: "West 3", angleStart: 277.5, angleEnd: 292.5, element: "Metal", yinYang: "-" },

  // North-West (292.5° - 337.5°)
  { name: "Xu", chinese: "戌", pinyin: "Xū (Dog)", direction: "NW 1", angleStart: 292.5, angleEnd: 307.5, element: "Earth", yinYang: "-" },
  { name: "Qian", chinese: "乾", pinyin: "Qián", direction: "NW 2", angleStart: 307.5, angleEnd: 322.5, element: "Metal", yinYang: "+" },
  { name: "Hai", chinese: "亥", pinyin: "Hài (Pig)", direction: "NW 3", angleStart: 322.5, angleEnd: 337.5, element: "Water", yinYang: "+" }
];
