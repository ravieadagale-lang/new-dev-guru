// src/data/chakraBalancingRemediesData.ts

export interface MeditationStep {
  stepNumber: number;
  title: string;
  duration: string;
  instruction: string;
}

export interface RitualRemedy {
  id: number;
  title: string;
  description: string;
  tag?: string;
}

export interface DetailedChakraData {
  chakraNumber: number;
  sanskritName: string;
  englishName: string;
  location: string;
  numbers: string;
  primaryPlanets: string;
  colorName: string;
  themeGradient: string;
  accentBorder: string;
  badgeBg: string;
  textColor: string;
  diagnosis: string;
  affirmations: string[];
  meditation: {
    title: string;
    steps: MeditationStep[];
  };
  ritualRemedies: RitualRemedy[];
}

export interface WeeklyChakraDay {
  day: string;
  planet: string;
  chakra: string;
  numbers: string;
  morning: string;
  practice: string;
  ritual: string;
  evening: string;
}

export interface Phase108Day {
  phase: number;
  title: string;
  days: string;
  description: string;
  dailyPractices: string[];
  additions: string[];
}

export const CHAKRA_CHAPTER_INTRO = {
  chapterTitle: "Chapter Thirty-Eight: Chakra Balancing Through Numbers, Affirmations, Meditations and Ritual Remedies",
  quote: "When the chakras are in balance, the numbers align. When the numbers align, the life flows. When the life flows, the soul sings its deepest and most genuine song.",
  quoteAuthor: "Integrated Healing Tradition",
  introduction: [
    "Every number in the numerological system has a living correspondent in the human energy body — a specific chakra, a specific energy centre, a specific meeting point of the material and the spiritual where the abstract vibrational quality of the number becomes a felt, embodied, immediately-experienceable reality in the person's daily physical and emotional life.",
    "The Life Path 1 person's solar authority is not merely a numerological concept — it is a specific quality of energy most directly experienced in the Solar Plexus chakra, where the Sun's golden fire either burns with genuine confident self-direction or gutters with the specific dampness of an authority that has been consistently undermined. The Life Path 2 person's cooperative warmth is most directly experienced in the Sacral and Heart chakras, where the Moon's receptive, emotionally-attuned, genuinely relational energy either flows with the ease of natural gift or struggles with the specific constriction of an emotional sensitivity that has never learned to trust its own perceptions.",
    "This chapter bridges the two great healing systems presented in this book — numerology and chakra science — through four specific, practically-immediate modalities: affirmations (the specific positive statements most directly aligned with each chakra's highest expression and most urgently needed by each missing or challenged number), meditations (specific, step-by-step, internally-rich practice structures that use number awareness, colour visualisation, and sound to balance each chakra through its numerical correspondence), and ritual remedies (specific physical acts of ceremony that engage the body, the senses, and the surrounding environment in the specific vibrational work of chakra healing and numerical alignment)."
  ]
};

export const CHAKRA_CORRESPONDENCE_MATRIX = [
  {
    chakra: "Chakra 1 — Muladhara (Root)",
    location: "Base of Spine · Red / Earth Tones",
    primaryNumbers: "4 (Rahu/Earth — structure), 8 (Saturn — discipline)",
    secondaryNumbers: "1 (Sun — vital force), 9 (Mars — physical energy)",
    loShuPositions: "4 (Practicality), 8 (Wisdom)",
    karmicDebt: "13 (completion obstacles at material level)"
  },
  {
    chakra: "Chakra 2 — Svadhisthana (Sacral)",
    location: "Below Navel · Orange / Amber",
    primaryNumbers: "2 (Moon — emotion), 6 (Venus — creative pleasure)",
    secondaryNumbers: "3 (Jupiter — joyful expression), 9 (Mars — creative fire)",
    loShuPositions: "2 (Intuition), 6 (Creativity)",
    karmicDebt: "14 (impulsive creative excess)"
  },
  {
    chakra: "Chakra 3 — Manipura (Solar Plexus)",
    location: "Navel · Golden Yellow",
    primaryNumbers: "1 (Sun — personal authority), 5 (Mercury — will)",
    secondaryNumbers: "3 (Jupiter — confidence), 8 (Saturn — discipline)",
    loShuPositions: "1 (Communication), 5 (Will), 9 (Ambition)",
    karmicDebt: "19 (isolated will), 16 (undermined authority)"
  },
  {
    chakra: "Chakra 4 — Anahata (Heart)",
    location: "Centre of Chest · Emerald Green / Rose Pink",
    primaryNumbers: "6 (Venus — love), 2 (Moon — warmth)",
    secondaryNumbers: "9 (Mars — compassion), 3 (Jupiter — joy)",
    loShuPositions: "6 (Creativity/Love), 2 (Intuition), 3 (Action)",
    karmicDebt: "16 (sudden loss of love trust)"
  },
  {
    chakra: "Chakra 5 — Vishuddha (Throat)",
    location: "Throat · Sky Blue / Turquoise",
    primaryNumbers: "5 (Mercury — communication), 1 (Sun — authentic voice)",
    secondaryNumbers: "3 (Jupiter — wise speech), 7 (Ketu — truth)",
    loShuPositions: "1 (Communication), 3 (Action through speech)",
    karmicDebt: "13 (blocked expression at completion)"
  },
  {
    chakra: "Chakra 6 — Ajna (Third Eye)",
    location: "Between Eyebrows · Indigo / Violet",
    primaryNumbers: "7 (Ketu — insight), 2 (Moon — intuition)",
    secondaryNumbers: "4 (Rahu — clarity), 9 (Mars — penetrating vision)",
    loShuPositions: "2 (Intuition), 7 (Analytical Thinking), 9 (Ambition)",
    karmicDebt: "16 (vision of truth suddenly disrupted)"
  },
  {
    chakra: "Chakra 7 — Sahasrara (Crown)",
    location: "Top of Head · Violet / Pure White / Gold",
    primaryNumbers: "3 (Jupiter — grace), 7 (Ketu — liberation), 9 (Mars — completion)",
    secondaryNumbers: "2 (Moon — divine receptivity), 1 (Sun — divine radiance)",
    loShuPositions: "9 (Ambition/Universal Consciousness), 7 (Wisdom), 3 (Expansion)",
    karmicDebt: "16 (disconnection from divine source)"
  }
];

export const DETAILED_CHAKRA_BALANCING_DATA: DetailedChakraData[] = [
  {
    chakraNumber: 1,
    sanskritName: "Muladhara",
    englishName: "Root Chakra",
    location: "Base of Spine / Perineum",
    numbers: "Numbers 4 and 8",
    primaryPlanets: "Rahu and Saturn",
    colorName: "Red · Earth Tones · Deep Brown",
    themeGradient: "from-red-950/60 via-stone-900/50 to-red-900/40",
    accentBorder: "border-red-500/40",
    badgeBg: "bg-red-500/20 text-red-300 border-red-500/30",
    textColor: "text-red-400",
    diagnosis: "The Root Chakra is most directly challenged when the Lo Shu Grid shows missing positions 4 and 8 simultaneously (the Thought Plane is completely empty — no practical planning, no decisive action, no integrated wisdom). This double absence leaves the person without the three most fundamental grounding capacities — the capacity to plan practically (4), to act decisively (3), and to integrate experience into stable wisdom (8) — creating a specific quality of existential rootlessness that manifests physically as chronic anxiety about material security, chronic physical fatigue, and the specific pattern of perpetual motion without genuine forward progress. The Karmic Debt compound 13 particularly affects the Root Chakra through its characteristic pattern of completion obstacles at the material level.",
    affirmations: [
      "I am deeply rooted in the earth. I am safe, stable, and completely supported by the ground beneath me.",
      "I have everything I need. The material world provides abundantly and consistently for all my genuine needs.",
      "My body is strong, healthy, and completely at home in the physical world.",
      "I build with discipline and patience. Every step I take is a firm, lasting foundation for the next.",
      "I am worthy of material security, material abundance, and the genuine comfort of a stable physical home.",
      "I trust the earth. I trust my body. I trust the material world to support my journey completely.",
      "I release all anxiety about material security. I am grounded, I am present, I am completely at peace with what is.",
      "Saturn's discipline is my gift. I build what lasts. I create what endures. I inhabit what I have genuinely earned."
    ],
    meditation: {
      title: "The Red Root Grounding Practice",
      steps: [
        {
          stepNumber: 1,
          title: "Preparation",
          duration: "3 minutes",
          instruction: "Sit or lie on the floor — direct earth contact is ideal. If sitting, sit with both feet flat on the floor or in a cross-legged posture with both knees touching the floor. If lying, lie on your back on a natural surface (grass, earth, or wooden floor). Place your hands on the ground beside you. Close your eyes."
        },
        {
          stepNumber: 2,
          title: "Breath Anchoring",
          duration: "3 minutes",
          instruction: "Take seven slow, deep breaths. With each inhale, breathe deep into the abdomen — expanding the belly rather than the chest. With each exhale, feel yourself settling more deeply into the support of the surface beneath you. On the seventh exhale, consciously release all holding and allow your body's full weight to be completely supported by the earth."
        },
        {
          stepNumber: 3,
          title: "Colour Visualisation",
          duration: "7 minutes",
          instruction: "Bring your awareness to the base of the spine — the Muladhara chakra location. Visualise a sphere of deep, rich, vibrant red light at this location — the colour of healthy red earth, of rich ochre clay, of deep garnet. With each inhale, the sphere grows slightly larger, more vibrant, and more fully luminous. With each exhale, it sends deep red roots downward through the floor, through the building, through the bedrock, into the molten core of the earth itself."
        },
        {
          stepNumber: 4,
          title: "Number Visualisation",
          duration: "5 minutes",
          instruction: "Within the red sphere, see the number 4 written in golden light — the number of structure, of foundation, of the four directions and the four seasons. As you breathe, the 4 becomes the 8 — the number of Saturn's disciplined, long-term, genuinely-earned material authority. As you breathe, the 8 becomes 4 again — the methodical builder returning to its foundation."
        },
        {
          stepNumber: 5,
          title: "Beeja Mantra (LAM)",
          duration: "5 minutes",
          instruction: "Silently or in a low voice, chant the Beeja mantra 'LAM' on each exhale — feeling the vibration of the 'L' beginning in the throat and resolving in the 'M' at the base of the skull, with the 'A' sound resonating specifically in the base of the spine. Seven repetitions per breath cycle, feeling the sound vibration physically massaging the Muladhara."
        },
        {
          stepNumber: 6,
          title: "Integration & Intention",
          duration: "5 minutes",
          instruction: "Let the visualisation dissolve. Sit in simple physical awareness — the weight of your body on the floor, the solid earth beneath the floor, the reliable pull of gravity that has never once released you. Rest in this felt sense of complete, unconditional, material support. Before opening your eyes, set the intention: 'I carry this rootedness into everything I do today.'"
        }
      ]
    },
    ritualRemedies: [
      {
        id: 1,
        title: "The Earth Walking Practice",
        description: "Walk barefoot on natural earth — grass, soil, sand, or any unpaved natural surface — for a minimum of 20 minutes daily. Grounding produces measurable improvements in inflammation markers and autonomic balance. For Number 4 individuals with persistent material anxiety, 20 minutes of barefoot earth contact daily provides immediate grounding.",
        tag: "Daily Physical Practice"
      },
      {
        id: 2,
        title: "The Red Earth Altar",
        description: "Create a small altar space at floor level using a handful of earth or sand in a terracotta bowl, four red candles placed at the four compass points around the bowl, four red garnet tumblestones, and a small idol of Ganesha at the centre. Light candles on Saturday mornings and chant 'Om Gam Ganapataye Namaha' 108 times.",
        tag: "Ceremonial Altar"
      },
      {
        id: 3,
        title: "The Salt Bath Ritual",
        description: "On Saturday evenings (Saturn's day), dissolve two handfuls of black salt (or Himalayan pink salt) and seven drops of vetiver essential oil in warm bathwater. Soak for 20 minutes while visualising red light pouring down from the crown through the body to the base of the spine as a stable pool of earthen light.",
        tag: "Weekly Saturday Ritual"
      },
      {
        id: 4,
        title: "The Four Directions Ritual",
        description: "On the night of each new moon, stand outside or at an open window and face each of the four directions in sequence (East, South, West, North), spending 90 seconds in each with feet planted firmly and hands pressed against earth. Speak aloud: 'I am rooted. I am supported. I am safe in this direction.'",
        tag: "Monthly New Moon Ritual"
      },
      {
        id: 5,
        title: "Nourishment Root Vegetables Ritual",
        description: "Eat one red or orange root vegetable — beet, carrot, sweet potato, or yam — every day for 40 days cooked slowly and simply. Root vegetables grow downward into the earth, collecting vibrational nourishment that supports Muladhara healing at the cellular level.",
        tag: "40-Day Dietary Remedy"
      },
      {
        id: 6,
        title: "4-7-8 Grounding Breathwork",
        description: "Practice the 4-7-8 breath (inhale for 4 counts, hold for 7 counts, exhale for 8 counts) — counts 4, 7, and 8 directly engage the numbers associated with Root chakra grounding (4 structure, 7 analytical grounding, 8 material authority). Practise 7 complete cycles every morning before getting out of bed.",
        tag: "Daily Breathwork"
      }
    ]
  },
  {
    chakraNumber: 2,
    sanskritName: "Svadhisthana",
    englishName: "Sacral Chakra",
    location: "Below Navel / Lower Abdomen",
    numbers: "Numbers 2 and 6",
    primaryPlanets: "Moon and Venus",
    colorName: "Orange · Amber · Warm Gold",
    themeGradient: "from-amber-950/60 via-orange-950/40 to-amber-900/40",
    accentBorder: "border-amber-500/40",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    textColor: "text-amber-400",
    diagnosis: "The Sacral Chakra is most directly challenged when the Lo Shu Grid shows missing positions 2 (Intuition) and 6 (Creativity) — the precise positions that govern emotional perception and creative expression. This double absence creates emotional flatness combined with creative suppression. The Karmic Debt compound 14 (impulsive excess) particularly affects the Sacral Chakra through creative and emotional excess followed by depletion. Life Path 6 individuals with Sacral imbalance often give continuous care to others without allowing themselves to receive equivalent nourishment.",
    affirmations: [
      "I feel deeply and safely. My emotions are my wisdom — they guide me toward what is genuinely true.",
      "I create freely and joyfully. My creative expression is a genuine gift that the world genuinely needs.",
      "I receive as abundantly as I give. I allow the care, the nourishment, and the beauty of life to flow into me.",
      "My body is a sacred vessel of feeling and creative intelligence. I honour it completely.",
      "I trust my emotional perception. What I feel is real, is valid, and deserves to be expressed.",
      "Pleasure and beauty are not luxuries — they are the genuine nourishment of my creative soul.",
      "I release all creative blocks. I flow. I express. I create. I am the river, not the dam.",
      "I honour the sacred creative fire within me. It burns with genuine warmth, genuine beauty, and genuine life."
    ],
    meditation: {
      title: "The Orange Creative Wave Practice",
      steps: [
        {
          stepNumber: 1,
          title: "Preparation",
          duration: "3 minutes",
          instruction: "Lie on your back or sit comfortably. Place both hands on the lower abdomen, just below the navel. Close your eyes. Take five slow breaths, feeling your hands rise and fall with the abdomen's natural movement."
        },
        {
          stepNumber: 2,
          title: "Water Element Awareness",
          duration: "5 minutes",
          instruction: "Bring your awareness to the feeling of fluid movement within the body — the slow movement of breath, the pulse of the heartbeat, the subtle internal sense of flow. The Sacral chakra's element is water, and its healing begins with reconnecting to the body's inherent, natural quality of gentle, continuous flow."
        },
        {
          stepNumber: 3,
          title: "Colour Visualisation",
          duration: "7 minutes",
          instruction: "At the location of your hands below the navel, visualise a warm, luminous, gently pulsing sphere of deep orange light — the colour of a sunset, of a harvest moon, of warm amber in candlelight. With each inhale, the orange sphere expands gently. With each exhale, it sends warm orange light flowing downward through the pelvis, hips, and thighs, melting tension."
        },
        {
          stepNumber: 4,
          title: "Number-Colour Integration",
          duration: "5 minutes",
          instruction: "Within the orange sphere, see the number 2 written in silver moonlight. Feel the 2's quality of gentle, receptive, cooperative warmth. The 2 becomes the 6 — the number of Venus' creative beauty and loving warmth. The 6 becomes 2 again, feeling both qualities simultaneously."
        },
        {
          stepNumber: 5,
          title: "Un-guided Creative Receptivity",
          duration: "7 minutes",
          instruction: "Allow a specific creative image to arise spontaneously within the orange sphere — a colour, shape, sound, texture, or movement. Do not direct the image; simply receive it and allow it to develop freely."
        },
        {
          stepNumber: 6,
          title: "Affirmation & Anchor",
          duration: "3 minutes",
          instruction: "Place one hand on the Sacral and silently speak: 'I flow. I create. I receive. I am alive.' Feel the orange light settle into a gently pulsing, stable sphere — a permanent resource always available within you."
        }
      ]
    },
    ritualRemedies: [
      {
        id: 1,
        title: "The Water Connection Ritual",
        description: "On Mondays (Moon's day) and Fridays (Venus's day), spend 20 conscious minutes in direct contact with water — a bath, swim, or sitting by water. Feel the water's effortless yield and flow around every obstacle without hardening against it.",
        tag: "Bi-Weekly Practice"
      },
      {
        id: 2,
        title: "The Morning Unscreened Creative Act",
        description: "Every morning before any digital screen engagement, spend 15 minutes in any creative act — drawing, writing, singing, dancing, or cooking with aesthetic attention. Morning creative energy is preserved before passive screen consumption diverts it.",
        tag: "Daily Morning Ritual"
      },
      {
        id: 3,
        title: "The Moon Water Infusion",
        description: "On each full moon night, place a glass bowl of clean spring water in direct moonlight overnight. In the morning, use this moon-charged water for face washing or beverages to receive the Moon's intuitive, creative receptivity.",
        tag: "Full Moon Ritual"
      },
      {
        id: 4,
        title: "Colour Bathing in Orange & Amber",
        description: "Wear orange or warm amber attire consciously on days when Sacral energy is low or creative inspiration is required. Consciously wearing specific vibrational colours multiplies their subtle energy impact.",
        tag: "Vibrational Attire"
      },
      {
        id: 5,
        title: "The Spontaneous Dance Ritual",
        description: "On Fridays (Venus's day), engage in 20 minutes of uninhibited solo movement guided entirely by what the body wants to do. This bypasses mental editing and reconnects the Sacral with spontaneous creative intelligence.",
        tag: "Weekly Friday Ritual"
      },
      {
        id: 6,
        title: "Sacral Aromatherapy Diffusion",
        description: "Diffuse ylang ylang, jasmine, sandalwood, or sweet orange essential oils during creative work or bedtime on Fridays. These essences carry directly Sacral-resonant frequencies governing sensory pleasure and creative warmth.",
        tag: "Aromatherapy Practice"
      }
    ]
  },
  {
    chakraNumber: 3,
    sanskritName: "Manipura",
    englishName: "Solar Plexus Chakra",
    location: "Navel Region / Upper Abdomen",
    numbers: "Numbers 1 and 5",
    primaryPlanets: "Sun and Mercury",
    colorName: "Yellow · Bright Gold · Sunflower",
    themeGradient: "from-yellow-950/60 via-amber-950/40 to-yellow-900/40",
    accentBorder: "border-yellow-500/40",
    badgeBg: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    textColor: "text-yellow-400",
    diagnosis: "The Solar Plexus Chakra is most urgently challenged when Lo Shu position 5 (Will — the central position of the grid) is missing. Missing position 5 creates scattered, undermined, or depleted personal power. The Karmic Debt compound 19 affects Manipura through the isolation pattern — the belief that authority requires complete self-sufficiency. Conversely, the Will Plane Arrow (9-5-1 occupied) can create an overactive Solar Plexus prone to dominance and control. Deficient conditions require building authority, while excessive conditions require translating authority into empowering others.",
    affirmations: [
      "I am the authority of my own life. I make my own choices, I follow my own direction, and I stand fully behind both.",
      "My personal power is genuine, legitimate, and genuinely mine. I do not need permission to be who I am.",
      "I act with confidence and clarity. My decisions arise from genuine wisdom, genuine self-knowledge, and genuine courage.",
      "I am capable of sustained, directed, genuinely powerful action. My will is my most reliable resource.",
      "I stand in my own light. I neither shrink from others' power nor steal from others' light. I shine because I am genuinely light.",
      "I release all need for external validation. My worth is intrinsic, my authority is genuine, and my confidence is self-sustaining.",
      "I transform challenges into fuel. Every obstacle becomes a clearer understanding of my own genuine strength.",
      "My solar plexus burns with warm, steady, genuinely sustaining fire. I am completely empowered and I empower all I encounter."
    ],
    meditation: {
      title: "The Golden Fire of Personal Power Practice",
      steps: [
        {
          stepNumber: 1,
          title: "Posture Alignment",
          duration: "2 minutes",
          instruction: "Sit in an upright, alert posture with the spine completely straight. Place both hands on the navel area, fingers pointing inward. Close your eyes. Take three complete breaths, straightening the spine slightly more with each inhale."
        },
        {
          stepNumber: 2,
          title: "Fire Breath Activation (Kapalabhati)",
          duration: "5 minutes",
          instruction: "Begin Kapalabhati (Breath of Fire) — a series of short, sharp, forceful exhales through the nose driven by quick contractions of the abdominal muscles. Perform two rounds of 30 repetitions with passive inhales and natural rests in between."
        },
        {
          stepNumber: 3,
          title: "Golden Sun Visualisation",
          duration: "8 minutes",
          instruction: "At the navel, visualise the Sun itself — a brilliantly radiant solar disc burning with warm, bright golden light. Feel its warmth radiating outward from the navel in all directions throughout the body, nourishing every cell with solar vitality."
        },
        {
          stepNumber: 4,
          title: "Number Empowerment (1 & 5)",
          duration: "5 minutes",
          instruction: "Within the golden sun, see the number 1 — the initiating, self-directing pioneer. Feel the 1 as a genuine quality of authentic selfhood. The 1 transforms into the number 5 — the dynamically free, versatile quality of the empowered will. Alternate between 1 and 5 with each breath."
        },
        {
          stepNumber: 5,
          title: "The 'I AM' Resonant Declaration",
          duration: "3 minutes",
          instruction: "With each exhale, silently or aloud speak the declaration: 'I AM.' Two words only — the most fundamental statement of personal existence and authority. Feel 'I AM' resonating from the solar plexus outward."
        },
        {
          stepNumber: 6,
          title: "Integration & Inner Fire",
          duration: "5 minutes",
          instruction: "Consolidate the golden sun into a warm, stable golden sphere at the navel. Feel it as your personal power centre — always available, warm, and unconditionally yours. Open your eyes maintaining this felt inner golden warmth."
        }
      ]
    },
    ritualRemedies: [
      {
        id: 1,
        title: "The Sunrise Solar Reception",
        description: "Rise before sunrise and go to a place where the sunrise is visible. Stand or sit facing East with palms facing outward toward the rising Sun, consciously receiving its first light on the Solar Plexus to activate vital solar power.",
        tag: "Daily Sunrise Practice"
      },
      {
        id: 2,
        title: "Tratak Candle Gazing Ritual",
        description: "On Sunday evenings, light a yellow or gold candle at eye level. Practice Tratak (concentrated candle gazing) for 10 minutes without blinking. When eyes water, close them and hold the afterimage of the flame at the solar plexus in the inner visual field.",
        tag: "Weekly Sunday Ritual"
      },
      {
        id: 3,
        title: "2-Minute Daily Power Posture",
        description: "Immediately upon rising, stand in a power posture for 2 minutes — feet hip-width apart, hands on hips, chin slightly raised, eyes forward. This posture induces cortisol/testosterone balance and directly engages Manipura's expansive geometry.",
        tag: "Daily Morning Habit"
      },
      {
        id: 4,
        title: "The 40-Day Number 5 Will Challenge",
        description: "For 40 consecutive days, make one decision per day that you would previously have deferred to others, consult no one about, and implement completely without seeking validation. Journal each decision and the authority felt.",
        tag: "40-Day Discipline"
      },
      {
        id: 5,
        title: "Solar Plexus Essential Oil Activation",
        description: "Use lemon, grapefruit, rosemary, or ginger essential oils during Manipura healing work. Citrus oils bring energising solar light; rosemary sharpens clarity and authority; ginger provides warming Mars-resonant fire.",
        tag: "Aromatherapy Practice"
      },
      {
        id: 6,
        title: "The Mirror Warrior's Declaration",
        description: "Stand before a mirror each morning and speak aloud while maintaining direct eye contact: 'I am [name]. I am a Life Path [number]. I am genuinely capable, genuinely worthy, and genuinely powerful. Today I choose to act with courage and self-directed authority.'",
        tag: "Daily Mirror Ritual"
      }
    ]
  },
  {
    chakraNumber: 4,
    sanskritName: "Anahata",
    englishName: "Heart Chakra",
    location: "Centre of Chest / Sternum",
    numbers: "Numbers 6 and 2",
    primaryPlanets: "Venus and Moon",
    colorName: "Emerald Green · Rose Pink",
    themeGradient: "from-emerald-950/60 via-teal-950/40 to-rose-950/40",
    accentBorder: "border-emerald-500/40",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    textColor: "text-emerald-400",
    diagnosis: "Heart Chakra imbalance correlates with missing position 6 (Creativity/Love), Karmic Debt 16 (sudden structural dismantling in love and trust), and the Life Path 6 shadow pattern of over-giving without receiving. Missing position 6 creates warmth that is expressively constricted; compound 16 creates an Anahata wounded by broken trust; LP6 shadow creates a heart giving continuously while remaining empty at its core. Anahata healing centers on genuine self-love as the fundamental foundation.",
    affirmations: [
      "I am worthy of love. I am worthy of receiving love as completely and as freely as I give it.",
      "My heart is open, healed, and genuinely willing to love and be loved in return.",
      "I forgive completely and fully — not for others' sake but for the genuine freedom of my own heart.",
      "I give love from fullness, not from emptiness. My own heart is full before I offer from it.",
      "I create beauty in everything I touch. My love makes the world more beautiful simply through its presence.",
      "I trust love. I trust genuine connection. I trust that being genuinely known is genuinely safe.",
      "I receive care gratefully and graciously. I allow others the joy of caring for me.",
      "Love is my nature. It flows through me as naturally as breath. It costs nothing and creates everything."
    ],
    meditation: {
      title: "The Emerald and Rose Heart Healing Practice",
      steps: [
        {
          stepNumber: 1,
          title: "Preparation & Crystal Placement",
          duration: "3 minutes",
          instruction: "Place a piece of Rose Quartz or Emerald on the sternum (centre of chest). Lie on your back. Close your eyes. Take seven slow, deep breaths, filling the chest completely and releasing completely."
        },
        {
          stepNumber: 2,
          title: "Softening the Heart Shield",
          duration: "5 minutes",
          instruction: "With each exhale, consciously soften the chest — releasing tightness and protective holding accumulated around the heart centre. Softening is the specific courage of genuine vulnerability."
        },
        {
          stepNumber: 3,
          title: "Emerald and Rose Dual Light Vision",
          duration: "8 minutes",
          instruction: "Visualise the heart space filled with two interweaving lights: clear vibrant emerald green (Venus's healing ray) and warm luminous rose pink (unconditional love). The two lights weave in a gentle spiral, amplifying clarity and compassionate warmth."
        },
        {
          stepNumber: 4,
          title: "The Forgiveness Liberation Practice",
          duration: "7 minutes",
          instruction: "In the heart space, allow the image of someone toward whom forgiveness is needed to arise (another person, yourself, or a past situation). Breathe the emerald-rose light into and through the image as a specific act of liberation for your own heart."
        },
        {
          stepNumber: 5,
          title: "Self-Love Touch & Completion",
          duration: "5 minutes",
          instruction: "Place both hands on the heart. Feel the physical warmth of your hands. Breathe into this self-offered warmth and silently speak: 'I love you. I see you. I am here with you always.' Repeat three times, feeling each land deeper."
        },
        {
          stepNumber: 6,
          title: "Closing Intention",
          duration: "2 minutes",
          instruction: "Feel the stone on your chest as an anchor. Set the intention: 'Today I will give one genuine act of care to myself and one to someone else — and I will receive whatever care is offered with genuine gratitude.'"
        }
      ]
    },
    ritualRemedies: [
      {
        id: 1,
        title: "The Friday Heart Fire Ritual",
        description: "On Friday evening (Venus's day), light a pink or green candle. Write a letter of genuine appreciation — to yourself, a loved one, or life itself. Read the letter aloud while maintaining eye contact with the candle flame to activate giving and receiving channels.",
        tag: "Weekly Friday Ritual"
      },
      {
        id: 2,
        title: "Nature Beauty Appreciation Practice",
        description: "Spend 30 minutes each day in conscious appreciation of natural beauty. The Anahata's green ray is deeply nature-resonant; sustained conscious appreciation of natural greenery opens the heart chakra profoundly.",
        tag: "Daily Nature Immersion"
      },
      {
        id: 3,
        title: "Pure Rose Water Heart Splash",
        description: "Each morning, splash the face and heart centre (directly over the sternum) with pure rose water while affirming: 'I open my heart to love — to giving it freely and receiving it graciously.' Rose is the supreme symbol of the open heart.",
        tag: "Daily Morning Practice"
      },
      {
        id: 4,
        title: "Karmic Debt 16 Heart Healing Ritual",
        description: "For individuals working with Karmic Debt 16's trust wounds, set an altar with a white candle, a pink rose, and a piece of Rhodonite crystal. Light the candle, hold Rhodonite, and speak: 'I acknowledge that what was built on inauthentic foundations needed to fall. I release resistance.'",
        tag: "Karmic 16 Healing Ritual"
      },
      {
        id: 5,
        title: "Nightly Gratitude Body Scan",
        description: "Each night before sleep, scan the body systematically from feet to crown, pausing at each area to express genuine internal gratitude for its function. This combines heart appreciation with physical self-acceptance.",
        tag: "Nightly Bedtime Practice"
      },
      {
        id: 6,
        title: "'AH' Vowel Sound Chanting",
        description: "Chant the open vowel sound 'AH' for 3 minutes each morning. 'AH' is the most directly heart-opening sound across ancient traditions, representing pure, unguarded expression of the inner life.",
        tag: "Daily Vocal Resonance"
      }
    ]
  },
  {
    chakraNumber: 5,
    sanskritName: "Vishuddha",
    englishName: "Throat Chakra",
    location: "Throat Centre / Neck Base",
    numbers: "Numbers 1 and 5",
    primaryPlanets: "Mercury and Sun",
    colorName: "Sky Blue · Turquoise · Sapphire Blue",
    themeGradient: "from-sky-950/60 via-blue-950/40 to-cyan-950/40",
    accentBorder: "border-sky-500/40",
    badgeBg: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    textColor: "text-sky-400",
    diagnosis: "The Throat Chakra is challenged by missing position 1 (Communication) and when authentic self-expression has been systematically suppressed. Missing position 1 creates congestion of unexpressed truth. An empty Will Plane (9-5-1 empty) leaves the voice without clear direction or certainty. Karmic Debt 13 affects Vishuddha through completion obstacles in communication — sentences started but interrupted, projects communicated but not received. Vishuddha healing requires conscious completion of every communicative act.",
    affirmations: [
      "I speak my truth with clarity, courage, and genuine compassion. My voice is needed and genuinely welcome in the world.",
      "I communicate authentically. What I say is genuinely what I mean, and what I mean is genuinely what I know.",
      "I listen deeply. My silence is as honest and as meaningful as my speech.",
      "My voice carries genuine wisdom, genuine warmth, and genuine authority. I trust it completely.",
      "I express myself freely in all forms — through speaking, writing, singing, and all other authentic expressions of my inner life.",
      "I am heard. My genuine truth reaches the people who most need it, in the form they most need to receive it.",
      "I release all fear of self-expression. What I genuinely have to say is genuinely worth saying.",
      "My throat is clear, open, and free. Truth flows through me easily, naturally, and genuinely."
    ],
    meditation: {
      title: "The Blue Sky of Pure Expression Practice",
      steps: [
        {
          stepNumber: 1,
          title: "Neck Lengthening Posture",
          duration: "3 minutes",
          instruction: "Sit upright with the spine extended. Drop the chin slightly, then raise it to create a gentle lengthening at the back of the neck — opening Vishuddha's physical space. Rest hands on thighs, palms facing up."
        },
        {
          stepNumber: 2,
          title: "Sound Clearing Release",
          duration: "5 minutes",
          instruction: "Open the mouth wide and release seven completely uninhibited exhales as sound — sighs, tones, hums, or whispers. This removes stored energetic congestion from the throat's unexpressed field."
        },
        {
          stepNumber: 3,
          title: "The Infinite Blue Sky Vision",
          duration: "8 minutes",
          instruction: "Visualise the throat centre as a window opening onto a vast, cloudless sky of deep azure blue. With each breath, the sky deepens. With each exhale, the throat window opens until inner body space and infinite sky merge."
        },
        {
          stepNumber: 4,
          title: "The Inner Truth Query",
          duration: "5 minutes",
          instruction: "Ask the throat: 'What is the single most important truth I have been afraid to speak?' Allow the answer to arise without editing. Hold it gently in the throat space with complete acceptance."
        },
        {
          stepNumber: 5,
          title: "Beeja Mantra (HAM) Resonance",
          duration: "7 minutes",
          instruction: "Silently or aloud, chant 'HAM' — the Beeja mantra of Vishuddha. Feel the 'H' starting in the chest, ascending through the throat on 'A', and resolving in 'M' at the crown."
        },
        {
          stepNumber: 6,
          title: "Clear Voice Intention",
          duration: "2 minutes",
          instruction: "Feel the throat as an unobstructed channel between the heart and the world. Set the daily intention: 'Today I speak my genuine truth once — clearly, kindly, completely.'"
        }
      ]
    },
    ritualRemedies: [
      {
        id: 1,
        title: "The Morning Uninhibited Song",
        description: "Every morning before speaking to anyone, sing for a minimum of 3 minutes — a hymn, folk song, or sustained single note. Establishing free vocal resonance first thing in the morning prevents social censorship from tightening the throat.",
        tag: "Daily Morning Ritual"
      },
      {
        id: 2,
        title: "The Dedicated Truth Journal",
        description: "Keep a dedicated journal specifically for writing what you genuinely think and feel but have not yet said aloud. Write for 10 minutes every evening. This builds expressive confidence that eventually translates into speech.",
        tag: "Nightly Writing Practice"
      },
      {
        id: 3,
        title: "The Blue Light Immersion Bath",
        description: "Once per week, sit in a darkened room with only blue light present (blue lamp or candles) in complete silence for 20 minutes. The blue light frequency directly supports the throat centre's vibrational resonance.",
        tag: "Weekly Light Therapy"
      },
      {
        id: 4,
        title: "The 40-Day Communication Completion Rule",
        description: "For 40 days, follow one rule: every communication you start, complete. Every sentence begun, finish. Every message started, send. Every conversation initiated, bring to a clean conclusion. Directly heals Karmic Debt 13.",
        tag: "40-Day Communication Discipline"
      },
      {
        id: 5,
        title: "Eucalyptus & Peppermint Throat Anointing",
        description: "Dilute eucalyptus or peppermint essential oil and apply a small drop to the throat hollow before public speaking, negotiations, or difficult conversations to clear, cool, and open vocal resonance.",
        tag: "Aromatherapy Anointing"
      },
      {
        id: 6,
        title: "The Weekly Storytelling Completion Arc",
        description: "Once per week, tell a complete story — with clear beginning, middle, and end — to a willing listener. Completing a narrative arc activates Vishuddha's completion-and-integration function.",
        tag: "Weekly Narrative Practice"
      }
    ]
  },
  {
    chakraNumber: 6,
    sanskritName: "Ajna",
    englishName: "Third Eye Chakra",
    location: "Between Eyebrows / Pineal Gland",
    numbers: "Numbers 7 and 2",
    primaryPlanets: "Ketu and Moon",
    colorName: "Indigo · Deep Violet · Midnight Blue",
    themeGradient: "from-indigo-950/60 via-purple-950/40 to-slate-950/40",
    accentBorder: "border-indigo-500/40",
    badgeBg: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    textColor: "text-indigo-400",
    diagnosis: "The Third Eye Chakra is most severely challenged when Lo Shu positions 2 (Intuition) and 7 (Analytical Thinking) are both absent (the Action Plane 2-7-6 is empty). This creates chronic mental fog, inability to trust perception, and difficulty arriving at clear understanding. Life Path 7 individuals with missing 2 or 7 represent a paradox: walking the path of analytical wisdom without natural equipment, requiring deliberate, sustained effort to build intuitive and analytical faculties.",
    affirmations: [
      "I see clearly. My inner vision is accurate, trustworthy, and genuinely illuminating.",
      "I trust my intuition completely. What I know beyond what I can explain is genuinely true.",
      "My analytical mind is sharp, penetrating, and rigorously honest. I see through complexity to genuine understanding.",
      "I perceive the truth beneath the surface of every situation I encounter.",
      "My inner guidance is my most reliable navigational tool. I follow it with genuine trust and genuine courage.",
      "I see with the eyes of wisdom — seeing not what I wish were true but what genuinely is.",
      "My imagination and my analytical intelligence work together in genuine, productive partnership.",
      "I am gifted with genuine insight. I see what others miss. I understand what others approximate."
    ],
    meditation: {
      title: "The Indigo Light of Inner Vision Practice",
      steps: [
        {
          stepNumber: 1,
          title: "Sushumna Tongue Lock Posture",
          duration: "3 minutes",
          instruction: "Sit upright. Touch the tip of the tongue to the roof of the mouth (Kecharu mudra preparation, connecting central channel energy to Ajna). Close your eyes and focus on the space between the eyebrows."
        },
        {
          stepNumber: 2,
          title: "Single-Pointed Concentration (Dharana)",
          duration: "5 minutes",
          instruction: "Maintain unwavering, still attention on the Ajna point between the eyebrows. Do not visualise anything yet; simply hold attention as a single, unmoving point of silent awareness."
        },
        {
          stepNumber: 3,
          title: "The Deep Indigo Field",
          duration: "7 minutes",
          instruction: "Allow a deep indigo-violet light to fill the inner visual field — the colour of midnight sky before dawn or deep ocean depths. Hold this indigo field completely still and free of mental chatter."
        },
        {
          stepNumber: 4,
          title: "The Inner Insight Query",
          duration: "7 minutes",
          instruction: "From within the indigo stillness, ask one specific question where understanding is needed. Hold the question open without forcing an answer; receive whatever image, word, or felt knowing arises."
        },
        {
          stepNumber: 5,
          title: "Symbolic Vision Reception",
          duration: "5 minutes",
          instruction: "Ask the Third Eye to show a symbol — a number, geometric form, or image — representing your most important spiritual insight for this season of life. Receive whatever appears without judgment."
        },
        {
          stepNumber: 6,
          title: "Immediate Journal Recording",
          duration: "3 minutes",
          instruction: "Return to waking awareness and immediately record or sketch what arose in meditation. The first 5 minutes post-Ajna meditation are the most vibrationally potent for receiving intuitive guidance."
        }
      ]
    },
    ritualRemedies: [
      {
        id: 1,
        title: "Dawn Darkness Twilight Reception",
        description: "Rise 30 minutes before sunrise and sit in complete dark facing East. As dawn arrives, receive the first light through the Third Eye. The transition from dark to dawn during Brahma Muhurta activates Ajna profoundly.",
        tag: "Dawn Spiritual Practice"
      },
      {
        id: 2,
        title: "Indigo Candle Flame Tratak",
        description: "On Saturdays (Ketu's day) or Tuesdays, light an indigo or deep violet candle. Gazing steadily at the flame for 10 minutes without blinking, then close eyes and hold the afterimage at the Third Eye point.",
        tag: "Tratak Meditation"
      },
      {
        id: 3,
        title: "Daily Analytical Insight Journaling",
        description: "Each evening, write three observations about the day that go beneath surface appearances — identifying deeper patterns or hidden truths. This directly develops Lo Shu position 7 analytical strength.",
        tag: "Daily Mind Training"
      },
      {
        id: 4,
        title: "Amethyst / Lapis Third Eye Sleep Placement",
        description: "Each night before sleep, place an Amethyst or Lapis Lazuli stone on the Third Eye location. During hypnagogic sleep entry, the Third Eye is naturally open and receptive to crystal frequencies.",
        tag: "Nightly Crystal Remedy"
      },
      {
        id: 5,
        title: "Dedicated Dream Journal Bridge",
        description: "Keep a dream journal beside the bed and write immediately upon waking before moving or checking devices. Maintained over 40 days, this bridges intuitive dream symbolism with waking analytical mind.",
        tag: "40-Day Dream Practice"
      },
      {
        id: 6,
        title: "Sandalwood & Frankincense Anointing",
        description: "Apply a small drop of diluted sandalwood or frankincense essential oil to the Third Eye before meditation. These sacred essences stimulate the limbic system and Third Eye intuitive vision.",
        tag: "Sacred Anointing"
      }
    ]
  },
  {
    chakraNumber: 7,
    sanskritName: "Sahasrara",
    englishName: "Crown Chakra",
    location: "Top of Head / Crown",
    numbers: "Numbers 3, 7 and 9",
    primaryPlanets: "Jupiter, Ketu and Mars",
    colorName: "Violet · Pure White · Gold",
    themeGradient: "from-purple-950/60 via-fuchsia-950/40 to-amber-950/40",
    accentBorder: "border-purple-500/40",
    badgeBg: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    textColor: "text-purple-400",
    diagnosis: "The Crown Chakra operates in the dimension of consciousness itself. It corresponds strongly to Life Path 9 (universal completion), position 9 (spiritual ambition), and Master Numbers (11, 22, 33). The primary Crown challenge in modern life is spiritual disconnection — living strictly in physical and mental realms while the dimension of universal consciousness remains unfelt. Practices focus on opening to cosmic grace and universal connection.",
    affirmations: [
      "I am connected to the infinite intelligence of the universe. Divine wisdom flows through me freely and abundantly.",
      "I am more than my personality, my history, or my circumstances. I am pure consciousness, temporarily wearing a human form.",
      "I surrender to the greater intelligence that guides all life. My highest wisdom knows more than my planning mind.",
      "I am part of the whole. The whole is complete in me. We are never separate.",
      "The universe supports me in ways I can see and in more ways than I can ever imagine.",
      "I release the need to understand everything. Some things are known not through analysis but through being.",
      "I am an expression of divine love, divine wisdom, and divine creative intelligence — and so is every other being.",
      "In this moment, I am completely at home in the universe. I belong here completely. I am exactly where I am meant to be."
    ],
    meditation: {
      title: "The White Light of Universal Consciousness Practice",
      steps: [
        {
          stepNumber: 1,
          title: "Complete Body Stillness",
          duration: "5 minutes",
          instruction: "Sit or lie completely still. Let the breath breathe itself without direction. Let thoughts pass without direction. Rest as the silent observer receiving experience without preference."
        },
        {
          stepNumber: 2,
          title: "Thousand-Petalled White Lotus",
          duration: "7 minutes",
          instruction: "At the crown of the head, visualise an enormous lotus flower with a thousand petals of pure, opalescent white light facing upward. With each inhale, more petals open to the infinite cosmos above."
        },
        {
          stepNumber: 3,
          title: "The White-Golden Light Descent",
          duration: "8 minutes",
          instruction: "Visualise a column of pure white-golden light descending from space, entering through the crown and illuminating all chakras downward: Ajna (indigo), Vishuddha (blue), Anahata (emerald/rose), Manipura (gold), Svadhisthana (orange), and Muladhara (red)."
        },
        {
          stepNumber: 4,
          title: "Dissolution into Pure Awareness",
          duration: "7 minutes",
          instruction: "Release all visualisations, body images, and chakra colors. Rest simply as pure, spacious, open awareness — the silent presence that receives all experience."
        },
        {
          stepNumber: 5,
          title: "Gayatri Mantra Universal Resonance",
          duration: "5 minutes",
          instruction: "Allow the Gayatri Mantra to resonate internally: 'Om Bhur Bhuva Svaha. Tat Savitur Varenyam. Bhargo Devasya Dheemahi. Dhiyo Yo Nah Prachodayat.' Feel divine light illuminating all minds."
        },
        {
          stepNumber: 6,
          title: "Gentle Unhurried Return",
          duration: "3 minutes",
          instruction: "Gradually become aware of physical weight, breath, and environment. Return slowly, carrying the expansive open quality of the Crown gently into daily life."
        }
      ]
    },
    ritualRemedies: [
      {
        id: 1,
        title: "Thursday Guru Puja & White Offerings",
        description: "On Thursdays (Jupiter's day), perform a simple Guru Puja: light a white candle, offer white or yellow flowers (jasmine or marigold), burn sandalwood incense, and sit in 20 minutes of silent contemplation.",
        tag: "Weekly Thursday Practice"
      },
      {
        id: 2,
        title: "2-Hour Weekly Sacred Silence",
        description: "Establish a minimum 2-hour period of complete silence once a week — no spoken words, no digital media. Pure silence directly connects Sahasrara beyond language.",
        tag: "Weekly Silence Discipline"
      },
      {
        id: 3,
        title: "Nightly Crown Touch Gratitude Practice",
        description: "Place both hands gently on the crown of the head each night before sleep. Take seven slow breaths and speak seven genuine, deeply-felt expressions of gratitude for real qualities of your life.",
        tag: "Nightly Gratitude Ritual"
      },
      {
        id: 4,
        title: "Purnima 108 Candle Circle Ritual",
        description: "On Full Moon nights (Purnima), arrange 108 tea lights in a circle around a Sri Yantra or Quartz sphere. Circumambulate 7 times chanting 'Om Namah Shivaya', then sit in meditation until flames extinguish.",
        tag: "Full Moon Sacred Circle"
      },
      {
        id: 5,
        title: "Violet Flame Karma Transmutation",
        description: "Visualise a violet-white flame burning at the crown for 7 minutes each morning upon waking. The violet flame transmutative energy releases past karma (especially potent for Life Path 9s).",
        tag: "Daily Morning Transmutation"
      },
      {
        id: 6,
        title: "'Who Is Aware?' Self-Inquiry Practice",
        description: "Sit quietly for 5 minutes daily and ask: 'Who is aware?' Turn awareness back upon itself without seeking a verbal answer. This Vedantic self-inquiry directly opens Sahasrara consciousness.",
        tag: "Daily Self-Inquiry"
      }
    ]
  }
];

export const WEEKLY_CHAKRA_PROGRAMME: WeeklyChakraDay[] = [
  {
    day: "Monday",
    planet: "Moon (Chandra)",
    chakra: "Svadhisthana (Sacral)",
    numbers: "Numbers 2 and 6",
    morning: "3 Sacral affirmations spoken aloud at the mirror",
    practice: "5-minute Orange Wave meditation (abbreviated)",
    ritual: "Prepare and drink moon water. Wear orange or amber.",
    evening: "108x Om Chandraya Namaha"
  },
  {
    day: "Tuesday",
    planet: "Mars (Mangal)",
    chakra: "Muladhara (Root)",
    numbers: "Numbers 4, 8 and 9",
    morning: "3 Root affirmations. 4-7-8 breathwork (7 cycles).",
    practice: "Earth contact — 20 minutes barefoot on ground",
    ritual: "Wear red or earth tones. Hold Red Jasper.",
    evening: "108x Om Mangalaya Namaha"
  },
  {
    day: "Wednesday",
    planet: "Mercury (Budha)",
    chakra: "Vishuddha (Throat)",
    numbers: "Numbers 1 and 5",
    morning: "Morning Song — 3 minutes of free, uninhibited singing",
    practice: "Blue Sky Meditation (abbreviated — 10 min)",
    ritual: "Wear sky blue or turquoise. Eucalyptus aromatherapy.",
    evening: "108x Om Budhaya Namaha. Write in Truth Journal."
  },
  {
    day: "Thursday",
    planet: "Jupiter (Brihaspati)",
    chakra: "Sahasrara (Crown)",
    numbers: "Numbers 3, 7 and 9",
    morning: "5-minute White Light Descent visualisation",
    practice: "20 minutes genuine silence",
    ritual: "Simple Guru Puja — candle, flowers, incense, 20-min sit",
    evening: "108x Om Gurave Namaha. Gratitude practice at crown."
  },
  {
    day: "Friday",
    planet: "Venus (Shukra)",
    chakra: "Anahata (Heart)",
    numbers: "Numbers 6 and 2",
    morning: "3 Heart affirmations. AH vowel sound chanting (3 min).",
    practice: "Emerald and Rose Heart Meditation (abbreviated — 15 min)",
    ritual: "Pink or green attire. Rose water splash. Time in natural beauty.",
    evening: "108x Om Shukraya Namaha. Heart Fire ritual."
  },
  {
    day: "Saturday",
    planet: "Saturn (Shani)",
    chakra: "Muladhara & Ajna",
    numbers: "Numbers 4, 8, 7",
    morning: "Hanuman Chalisa OR 108x Om Shanaischaraya Namaha",
    practice: "Indigo Candle Tratak (10 min) — Third Eye activation",
    ritual: "Black Tourmaline at Root. Amethyst at Third Eye.",
    evening: "Record dreams from previous week in Dream Journal."
  },
  {
    day: "Sunday",
    planet: "Sun (Surya)",
    chakra: "Manipura (Solar Plexus)",
    numbers: "Numbers 1 and 5",
    morning: "Sunrise reception — face East at sunrise with open palms",
    practice: "Golden Fire Solar Plexus Meditation (full 30 min)",
    ritual: "Warrior's Declaration at mirror. Wear yellow or gold.",
    evening: "108x Om Suryaya Namaha. Power posture (2 min)."
  }
];

export const PROGRAMME_108_DAYS: Phase108Day[] = [
  {
    phase: 1,
    title: "Phase One: Foundation (Days 1–36)",
    days: "Days 1 to 36",
    description: "Establishing fundamental daily habits, identifying primary chakra-number imbalances, and initiating targeted healing routines.",
    dailyPractices: [
      "Primary Life Path affirmations (3x morning, 3x evening)",
      "Primary Life Path planetary mantra (108 repetitions daily)",
      "15-minute daily self-healing practice targeted at most urgent chakra"
    ],
    additions: [
      "Identify the three most urgent chakra-number imbalances",
      "Begin targeted remedial work for the primary deficient chakra",
      "Follow rotating 7-day weekly schedule"
    ]
  },
  {
    phase: 2,
    title: "Phase Two: Deepening (Days 37–72)",
    days: "Days 37 to 72",
    description: "Expanding the energy matrix through crystal grid support, lunar ceremonial rhythms, and secondary chakra activation.",
    dailyPractices: [
      "All Phase One practices continuing unbroken",
      "Establish crystal grid corresponding to Lo Shu missing positions",
      "Secondary chakra targeted remedial work (second priority)"
    ],
    additions: [
      "Monthly New Moon ritual (aura clearing + crystal recharge)",
      "Monthly Full Moon ritual (extended 1008x mantra practice)",
      "Mid-point evaluation of emotional and energetic shifts"
    ]
  },
  {
    phase: 3,
    title: "Phase Three: Integration (Days 73–108)",
    days: "Days 73 to 108",
    description: "Full system coordination across all seven chakras, completing 108 days of unbroken transformation.",
    dailyPractices: [
      "All Phase One & Two practices continuing seamlessly",
      "Third chakra targeted work (third priority)",
      "Weekly 45-minute full chakra crystal alignment session"
    ],
    additions: [
      "Monthly complete aura scanning and self-assessment",
      "Full review of all seven chakras against initial baseline diagnosis",
      "Design next 108-day cycle based on verified shifts and accomplishments"
    ]
  }
];

export const ASSESSMENT_METRICS_108_DAYS = [
  {
    category: "Physical Level",
    metric: "Measurable reduction or resolution of chronic physical symptoms correlated with specific chakra imbalances identified at programme start."
  },
  {
    category: "Emotional Level",
    metric: "Greater emotional baseline stability, dissolution of primary reactive triggers associated with missing numbers, and heightened self-compassion."
  },
  {
    category: "Professional Level",
    metric: "Noticeable momentum in career domains linked with primary missing Lo Shu positions (e.g., improved execution with 4/8, communication with 1/5)."
  },
  {
    category: "Relational Level",
    metric: "Deeper authentic connection, clearer boundaries, and harmonious resolution of LP compatibility friction."
  },
  {
    category: "Spiritual Level",
    metric: "Unshakeable daily practice habit, expanded intuitive clarity, and felt connection to universal divine grace."
  }
];
