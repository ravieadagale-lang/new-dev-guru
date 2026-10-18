import { TarotSpread } from "../types/tarot";

export const TAROT_SPREADS: TarotSpread[] = [
  // --- 1-CARD SPREADS ---
  {
    id: "daily_guidance",
    name: "Daily Cosmic Guidance",
    category: "daily",
    cardCount: 1,
    tagline: "Single divine mirror for today's energy and spiritual focus",
    description: "Draw a single card to receive focused cosmic insight, personal theme, and actionable advice for the day ahead.",
    recommendedFor: ["Morning reflection", "Daily spiritual focus", "Quick inspiration", "Evening contemplation"],
    difficulty: "Beginner",
    estimatedMinutes: 2,
    iconName: "Sun",
    positions: [
      { id: 1, name: "Core Daily Energy", meaning: "Today's governing cosmic vibration and conscious focus", description: "The overarching theme of your day and key guidance." }
    ]
  },
  {
    id: "yes_no_oracle",
    name: "Yes / No Divine Oracle",
    category: "yes_no",
    cardCount: 1,
    tagline: "Direct answer with underlying cosmic influence and conditions",
    description: "Formulate a clear question and receive a direct Yes, No, or Conditional answer with the underlying elemental dynamics.",
    recommendedFor: ["Direct questions", "Immediate decisions", "Clarification on choices", "Quick insight"],
    difficulty: "Beginner",
    estimatedMinutes: 3,
    iconName: "HelpCircle",
    positions: [
      { id: 1, name: "The Oracle Answer", meaning: "Direct answer & key cosmic factor", description: "Reveals the primary energetic tendency regarding your question." }
    ]
  },
  {
    id: "quick_insight",
    name: "Quick Illuminator",
    category: "general",
    cardCount: 1,
    tagline: "Instant clarity on any immediate circumstance or dilemma",
    description: "Pulls a singular beam of intuitive light directly onto your core question.",
    recommendedFor: ["Any sudden question", "Spontaneous curiosity", "Immediate clarity"],
    difficulty: "Beginner",
    estimatedMinutes: 2,
    iconName: "Zap",
    positions: [
      { id: 1, name: "The Core Revelation", meaning: "What you most need to understand right now", description: "The pivotal truth beneath the surface." }
    ]
  },

  // --- 2-CARD SPREADS ---
  {
    id: "situation_advice",
    name: "Situation & Divine Advice",
    category: "general",
    cardCount: 2,
    tagline: "Objective snapshot of what is happening and the highest action to take",
    description: "Provides an objective assessment of your current reality followed immediately by actionable guidance from the cards.",
    recommendedFor: ["Feeling stuck", "Navigating challenges", "Need next step clarity"],
    difficulty: "Beginner",
    estimatedMinutes: 4,
    iconName: "Compass",
    positions: [
      { id: 1, name: "The Situation", meaning: "Current reality and hidden factors", description: "Where you currently stand and what energies are at play." },
      { id: 2, name: "The Divine Advice", meaning: "The most empowering action or mindset", description: "How you can navigate this circumstance with grace and strength." }
    ]
  },
  {
    id: "option_a_vs_b",
    name: "Option A vs Option B (Crossroads)",
    category: "decision",
    cardCount: 2,
    tagline: "Comparative energetic forecast between two distinct choices",
    description: "Weighs the energy, potential outcome, and emotional aftermath of pursuing Path A versus Path B.",
    recommendedFor: ["Job offers", "Relationship choices", "Relocation decisions", "Strategic pivots"],
    difficulty: "Beginner",
    estimatedMinutes: 5,
    iconName: "GitFork",
    positions: [
      { id: 1, name: "Path A (First Choice)", meaning: "Outcome & energy if choosing Option A", description: "What aligns with and results from choosing Option A." },
      { id: 2, name: "Path B (Second Choice)", meaning: "Outcome & energy if choosing Option B", description: "What aligns with and results from choosing Option B." }
    ]
  },

  // --- 3-CARD SPREADS ---
  {
    id: "past_present_future",
    name: "Past • Present • Future",
    category: "future",
    cardCount: 3,
    tagline: "The classic timeline of karmic roots, current reality, and unfolding destiny",
    description: "The timeless classical spread examining what led up to this moment, the prevailing energy now, and where momentum is leading.",
    recommendedFor: ["Life review", "General overview", "Understanding karmic momentum", "Future outlook"],
    difficulty: "Intermediate",
    estimatedMinutes: 6,
    iconName: "Clock",
    positions: [
      { id: 1, name: "Past Foundations", meaning: "Karmic root causes and past influences", description: "What energies or events set the stage for your current state." },
      { id: 2, name: "Present Reality", meaning: "The focal point of here and now", description: "What is actively occurring in your field right now." },
      { id: 3, name: "Future Trajectory", meaning: "Likely outcome based on current momentum", description: "Where the flow will lead if current trajectory continues." }
    ]
  },
  {
    id: "situation_challenge_advice",
    name: "Situation • Challenge • Advice",
    category: "growth",
    cardCount: 3,
    tagline: "Problem-solving triumvirate diagnosing the root obstacle and solution",
    description: "Pinpoints exactly what is standing in your way and prescribes the exact spiritual remedy or practical shift needed.",
    recommendedFor: ["Overcoming blocks", "Personal friction", "Conflict resolution"],
    difficulty: "Intermediate",
    estimatedMinutes: 6,
    iconName: "ShieldAlert",
    positions: [
      { id: 1, name: "Current Situation", meaning: "The reality of the matter", description: "The landscape of your question." },
      { id: 2, name: "The Core Challenge", meaning: "The hidden obstacle or internal resistance", description: "What you must acknowledge and overcome." },
      { id: 3, name: "The Remedy / Advice", meaning: "Your highest path to breakthrough", description: "The strategic and spiritual action recommended." }
    ]
  },
  {
    id: "mind_body_spirit",
    name: "Mind • Body • Spirit Harmony",
    category: "spiritual",
    cardCount: 3,
    tagline: "Holistic alignment assessment across your three energetic sanctums",
    description: "Gauges mental state, physical/material vitality, and spiritual alignment to bring you into holistic harmony.",
    recommendedFor: ["Wellness check-in", "Meditation preparation", "Chakra balance", "Self-care days"],
    difficulty: "Intermediate",
    estimatedMinutes: 6,
    iconName: "Sparkles",
    positions: [
      { id: 1, name: "Mind (Manas)", meaning: "Mental clarity, beliefs, and conscious thoughts", description: "Your current mental atmosphere." },
      { id: 2, name: "Body (Sharira)", meaning: "Physical vitality, grounding, and material reality", description: "Your tangible health and physical grounding." },
      { id: 3, name: "Spirit (Atman)", meaning: "Higher guidance, intuition, and soul alignment", description: "Your connection with cosmic wisdom and dharma." }
    ]
  },
  {
    id: "love_trinity",
    name: "You • Them • The Sacred Union",
    category: "love",
    cardCount: 3,
    tagline: "Relationship mirror revealing both partners' energies and the bond between them",
    description: "Deep dive into your emotional state, your partner's emotional state, and the combined third energy of the relationship itself.",
    recommendedFor: ["Couples", "Dating clarity", "Understanding partner's perspective", "Deepening intimacy"],
    difficulty: "Intermediate",
    estimatedMinutes: 6,
    iconName: "Heart",
    positions: [
      { id: 1, name: "Your Energy", meaning: "Your conscious and subconscious feelings", description: "How you are approaching and feeling in the relationship." },
      { id: 2, name: "Their Energy", meaning: "Their current emotional stance & perspective", description: "Their perspective, feelings, and current intentions." },
      { id: 3, name: "The Relationship Energy", meaning: "The shared bond, dynamic, and trajectory", description: "The alchemy created when both of your energies merge." }
    ]
  },

  // --- 5-CARD SPREADS ---
  {
    id: "career_compass_5",
    name: "Career & Ambition Compass",
    category: "career",
    cardCount: 5,
    tagline: "Strategic roadmap for professional growth, hidden opportunities, and victory",
    description: "A comprehensive 5-card diagnostic designed for career transitions, promotions, business startups, and professional leadership.",
    recommendedFor: ["Job changes", "Starting a business", "Promotion strategy", "Overcoming career plateau"],
    difficulty: "Advanced",
    estimatedMinutes: 10,
    iconName: "Briefcase",
    positions: [
      { id: 1, name: "Current Career Standing", meaning: "Your current professional baseline", description: "Where your career stands today." },
      { id: 2, name: "Your Greatest Strength", meaning: "Key talent, asset, or competitive advantage", description: "What unique power you can leverage." },
      { id: 3, name: "Hidden Obstacle / Blindspot", meaning: "Underestimated friction or workplace dynamic", description: "What you must guard against." },
      { id: 4, name: "Golden Opportunity", meaning: "Emerging door or strategic opening", description: "Where favorable growth winds are blowing." },
      { id: 5, name: "Next Tactical Step", meaning: "Direct action for long-term career triumph", description: "The definitive move to make next." }
    ]
  },
  {
    id: "love_sanctuary_5",
    name: "Love Sanctuary & Soul Connection",
    category: "love",
    cardCount: 5,
    tagline: "Profound 5-card illumination into romance, emotional blocks, and future union",
    description: "Deep exploration of romantic dynamics covering past karma, conscious hopes, emotional fears, partner intentions, and love outcome.",
    recommendedFor: ["Soulmate search", "Committed relationships", "Navigating romantic confusion", "Reconciliation potential"],
    difficulty: "Advanced",
    estimatedMinutes: 10,
    iconName: "Flame",
    positions: [
      { id: 1, name: "Heart's True Desire", meaning: "What your soul genuinely craves in love", description: "Your core emotional necessity." },
      { id: 2, name: "Partner's Current Heart Space", meaning: "Their authentic feelings and readiness", description: "Where they truly stand in emotional readiness." },
      { id: 3, name: "Unseen Relational Friction", meaning: "Karmic lessons or communication blockages", description: "What needs honest healing between you." },
      { id: 4, name: "Highest Path to Intimacy", meaning: "The bridge of understanding and mutual trust", description: "How you can foster genuine sacred harmony." },
      { id: 5, name: "Love Horizon", meaning: "Likely relational evolution over upcoming cycles", description: "Where this romantic bond is naturally blossoming." }
    ]
  },
  {
    id: "financial_wealth_5",
    name: "Financial Energy & Abundance Flow",
    category: "finance",
    cardCount: 5,
    tagline: "Financial mindset, wealth blockers, lucrative avenues, and material stability",
    description: "Reflective diagnostic on financial habits, investments, wealth mindset (Lakshmi energy), and long-term material flourishing.",
    recommendedFor: ["Financial planning", "Overcoming scarcity mindset", "Investment reflection", "Business ventures"],
    difficulty: "Advanced",
    estimatedMinutes: 10,
    iconName: "Coins",
    positions: [
      { id: 1, name: "Current Money Mindset", meaning: "Subconscious relationship with wealth and security", description: "Your energetic relationship with material prosperity." },
      { id: 2, name: "Financial Obstacle / Leak", meaning: "Habits, fears, or drains on your wealth", description: "What is draining or restricting your monetary flow." },
      { id: 3, name: "Untapped Abundance Channel", meaning: "Hidden skill or new income opportunity", description: "Where unexpected wealth or value can enter." },
      { id: 4, name: "Prudent Risk & Protection", meaning: "What to safeguard and where to exercise caution", description: "How to protect your assets and avoid speculation." },
      { id: 5, name: "Long-term Wealth Horizon", meaning: "Prosperity outcome when advice is integrated", description: "Your long-term financial security trajectory." }
    ]
  },

  // --- 7-CARD SPREADS ---
  {
    id: "relationship_deep_dive_7",
    name: "Relationship Deep Dive & Reconciliation",
    category: "love",
    cardCount: 7,
    tagline: "In-depth 7-card architecture mapping communication, karma, and reunion truth",
    description: "Detailed analysis for complex relationships, breakups, long-term partners, or questions of soul reconciliation.",
    recommendedFor: ["Reconciliation questions", "Long-term marriage reflection", "Complex emotional crossroads"],
    difficulty: "Master",
    estimatedMinutes: 15,
    iconName: "HeartHandshake",
    positions: [
      { id: 1, name: "Your True Stance", meaning: "Your deepest emotional reality", description: "Where your heart truly resides." },
      { id: 2, name: "Their True Stance", meaning: "Their authentic unexpressed feelings", description: "What they feel but may not say." },
      { id: 3, name: "Past Karmic Roots", meaning: "What brought you together and previous lessons", description: "The karmic origins of your connection." },
      { id: 4, name: "The Core Obstacle", meaning: "The primary wall or misunderstanding", description: "What is actively preventing harmony." },
      { id: 5, name: "Their Secret Intention", meaning: "What they hope will happen", description: "Their underlying aspirations." },
      { id: 6, name: "Your Best Approach", meaning: "How you should show up and communicate", description: "The most empowering action you can take." },
      { id: 7, name: "The Definitive Outcome", meaning: "The likely future of this union", description: "The long-term realization of this connection." }
    ]
  },

  // --- 10-CARD CELTIC CROSS ---
  {
    id: "sacred_celtic_cross_10",
    name: "The Sacred Celtic Cross (10 Cards)",
    category: "spiritual",
    cardCount: 10,
    tagline: "The monumental master spread unlocking deep multidimensional truth",
    description: "The most revered and comprehensive spread in esoteric Tarot. Examines the heart of the situation, conscious and subconscious undercurrents, past roots, near future, self-identity, environment, hopes/fears, and ultimate cosmic outcome.",
    recommendedFor: ["Major life crossroads", "Yearly reading", "Complex multifaceted situations", "Master spiritual inquiry"],
    difficulty: "Master",
    estimatedMinutes: 20,
    iconName: "Cross",
    positions: [
      { id: 1, name: "1. The Present Essence", meaning: "The heart of your question right now", description: "The core atmosphere and central theme of your life.", x: 35, y: 50 },
      { id: 2, name: "2. The Crossing Challenge", meaning: "Immediate obstacle or opposing force", description: "What crosses, tests, or strengthens your resolve.", x: 35, y: 50 },
      { id: 3, name: "3. The Conscious Crown", meaning: "Higher goals, aspirations, and conscious thoughts", description: "What you consciously aspire to achieve.", x: 35, y: 20 },
      { id: 4, name: "4. The Subconscious Root", meaning: "Deep subconscious desires, fears, and memories", description: "The hidden root driving your emotional reactions.", x: 35, y: 80 },
      { id: 5, name: "5. The Past Influence", meaning: "Recent events or fading energies", description: "What is moving out of your energetic field.", x: 15, y: 50 },
      { id: 6, name: "6. The Near Future", meaning: "Approaching energies over coming weeks", description: "What is preparing to enter your experience soon.", x: 55, y: 50 },
      { id: 7, name: "7. Self & Attitude", meaning: "Your perception, attitude, and power in the matter", description: "How you perceive yourself in this situation.", x: 80, y: 80 },
      { id: 8, name: "8. External Environment", meaning: "Influence of other people, workplace, or home", description: "How surrounding people and settings impact you.", x: 80, y: 60 },
      { id: 9, name: "9. Hopes and Fears", meaning: "Your deepest aspirations and secret anxieties", description: "The delicate interplay of your highest hope and greatest fear.", x: 80, y: 40 },
      { id: 10, name: "10. The Ultimate Outcome", meaning: "The culmination and long-term resolution", description: "The final resolution when all lessons are integrated.", x: 80, y: 20 }
    ]
  },

  // --- 7-CHAKRA SPREAD ---
  {
    id: "seven_chakra_alignment_7",
    name: "Seven Chakra Spiritual Alignment (7 Cards)",
    category: "spiritual",
    cardCount: 7,
    tagline: "Pranic energetic diagnostic from Root to Crown Chakra",
    description: "Evaluates the flow of subtle vital force (Kundalini/Prana) through each of the seven major energy vortexes, revealing physical grounding, emotional flow, personal will, heart compassion, authentic truth, intuition, and divine connection.",
    recommendedFor: ["Chakra balancing", "Kundalini & Pranic assessment", "Spiritual blockage diagnosis", "Holistic energy healing"],
    difficulty: "Advanced",
    estimatedMinutes: 15,
    iconName: "Sparkles",
    positions: [
      { id: 1, name: "1. Muladhara (Root Chakra)", meaning: "Physical survival, stability, safety & material grounding", description: "Grounding, security, family foundation and physical vitality." },
      { id: 2, name: "2. Svadhisthana (Sacral Chakra)", meaning: "Sensuality, creative passion, emotional flow & joy", description: "Emotional balance, creative zest, intimacy and fluidity." },
      { id: 3, name: "3. Manipura (Solar Plexus Chakra)", meaning: "Personal sovereignty, willpower, courage & ambition", description: "Self-worth, discipline, digestion of life experiences and inner fire." },
      { id: 4, name: "4. Anahata (Heart Chakra)", meaning: "Unconditional love, compassion, forgiveness & balance", description: "Emotional healing, empathy, relational harmony and sacred openness." },
      { id: 5, name: "5. Vishuddha (Throat Chakra)", meaning: "Authentic truth, communication & creative expression", description: "Speaking your truth, active listening and creative articulation." },
      { id: 6, name: "6. Ajna (Third Eye Chakra)", meaning: "Intuitive perception, foresight, psychic clarity & insight", description: "Inner vision, discernment, spiritual insight and dreams." },
      { id: 7, name: "7. Sahasrara (Crown Chakra)", meaning: "Divine cosmic connection, soul purpose & enlightenment", description: "Spiritual oneness, higher guidance, dharma and cosmic surrender." }
    ]
  },

  // --- 12-MONTH YEARLY PREDICTION SPREAD ---
  {
    id: "yearly_12_months_12",
    name: "12-Month Yearly Forecast (Month-by-Month)",
    category: "future",
    cardCount: 12,
    tagline: "Comprehensive month-wise predictive timeline for the upcoming 12 months",
    description: "A monumental 12-card astrological cycle spread charting the dominant cosmic theme, lessons, blessings, and breakthrough timing for each of the next 12 consecutive months.",
    recommendedFor: ["New Year / Birthday reading", "Yearly roadmap", "Month-by-month planning", "Long-range forecasting"],
    difficulty: "Master",
    estimatedMinutes: 25,
    iconName: "Calendar",
    positions: [
      { id: 1, name: "Month 1 (Immediate Horizon)", meaning: "Primary theme, energy and focus of Month 1", description: "The energetic kickoff and foundational catalyst of the cycle." },
      { id: 2, name: "Month 2 (Emerging Currents)", meaning: "Developments, emotions and financial movements in Month 2", description: "Early momentum, resource cultivation and emotional flow." },
      { id: 3, name: "Month 3 (Spring Breakthrough)", meaning: "Communications, ventures and shifts in Month 3", description: "Active decisions, connections and spring expansion." },
      { id: 4, name: "Month 4 (Foundations & Home)", meaning: "Inner stability, domestic matters and roots in Month 4", description: "Grounding, home environment and internal consolidation." },
      { id: 5, name: "Month 5 (Creative Passion)", meaning: "Romance, self-expression and creative zest in Month 5", description: "Joyful breakthroughs, heart matters and vibrant momentum." },
      { id: 6, name: "Month 6 (Health & Discipline)", meaning: "Workplace routines, wellness and refinements in Month 6", description: "Organizing daily affairs, health focus and tactical precision." },
      { id: 7, name: "Month 7 (Partnerships & Karma)", meaning: "Contracts, soul connections and balance in Month 7", description: "Relational crossroads, agreements and significant alliances." },
      { id: 8, name: "Month 8 (Transformation & Depths)", meaning: "Karmic shedding, shared assets and rebirth in Month 8", description: "Deep subconscious shifts, clearing old cycles and renewal." },
      { id: 9, name: "Month 9 (Wisdom & Expansion)", meaning: "Travel, philosophical expansion and luck in Month 9", description: "Higher horizons, educational growth and auspicious openings." },
      { id: 10, name: "Month 10 (Career Pinnacle)", meaning: "Public recognition, ambition and milestones in Month 10", description: "Career visibility, status elevations and tangible achievements." },
      { id: 11, name: "Month 11 (Allies & Visions)", meaning: "Community support, future dreams and ideals in Month 11", description: "Networking breakthroughs, collective projects and hopes." },
      { id: 12, name: "Month 12 (Culmination & Harvest)", meaning: "Annual harvest, spiritual closure and rebirth in Month 12", description: "Completion of the 12-month solar cycle and preparation for the new dawn." }
    ]
  }
];

export const getSpreadById = (id: string): TarotSpread | undefined => {
  return TAROT_SPREADS.find((s) => s.id === id);
};

export const getSpreadsByCategory = (cat: string): TarotSpread[] => {
  if (cat === "all") return TAROT_SPREADS;
  return TAROT_SPREADS.filter((s) => s.category === cat || s.category === "general");
};
