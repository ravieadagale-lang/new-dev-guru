export interface TarotOracleCardEntry {
  lenses?: {
    practical?: string;
    psychological?: string;
    karmic?: string;
    transcendental?: string;
    love?: string;
    career?: string;
    finance?: string;
    spiritual?: string;
    [key: string]: string | undefined;
  };
  affirmation?: string;
}

export const TAROT_ORACLE_CARDS_MAP: Record<string, TarotOracleCardEntry> = {};

export const QUESTION_BANK_CATEGORY_GUIDES: Record<string, { title: string; description: string }> = {
  love: {
    title: "Love, Romance & Soul Alliances",
    description: "Inquire into mutual feelings, soulmate connections, relationship healing, and commitment timing."
  },
  career: {
    title: "Vocation, Ambition & Professional Path",
    description: "Explore career crossroads, executive decisions, business partnerships, and leadership growth."
  },
  finance: {
    title: "Wealth, Prosperity & Material Security",
    description: "Align financial energy, assess investment avenues, and cultivate sustainable abundance."
  },
  spiritual: {
    title: "Higher Purpose & Spiritual Awakening",
    description: "Deepen communion with divine intuition, understand karmic lessons, and discover life purpose."
  },
  decision: {
    title: "Crossroads & Critical Choices",
    description: "Gain clarity between diverging paths and understand the hidden consequences of decisions."
  },
  daily: {
    title: "Daily Guidance & Energy Forecast",
    description: "Receive focused guidance and energetic alignment for today's journey."
  }
};

const CATEGORY_QUESTIONS: Record<string, string[]> = {
  love: [
    "What energy surrounds my current romantic connection?",
    "How can I open my heart to attract a genuine, aligned soul partner?",
    "What is the underlying karmic lesson in our recent dynamic?",
    "How can we communicate through this emotional impasse with grace?"
  ],
  career: [
    "What opportunities are opening for my professional growth?",
    "Is now an auspicious time to pivot toward a new career direction?",
    "How can I overcome current workplace friction or feeling blocked?",
    "What hidden strengths can I leverage to reach my vocational goals?"
  ],
  finance: [
    "What beliefs or habits are blocking financial flow into my life?",
    "How can I build sustainable long-term prosperity and material stability?",
    "Is this an auspicious window for investment or starting a venture?",
    "What unexpected financial lesson is emerging for my awareness?"
  ],
  family: [
    "How can harmony and mutual understanding be restored in my family?",
    "What ancestral or generational pattern requires conscious healing?",
    "How can I best support my loved ones while preserving my own boundaries?"
  ],
  growth: [
    "What blind spot is currently holding me back from personal evolution?",
    "How can I step fully into my personal sovereignty and authenticity?",
    "What old narrative or emotional weight is ready to be released today?"
  ],
  spiritual: [
    "What is the deeper soul purpose of my current life phase?",
    "How can I strengthen my connection to my intuition and divine guidance?",
    "What sacred practice or sadhana will best support my spiritual awakening?"
  ],
  decision: [
    "What will be the outcome if I choose Path A versus Path B?",
    "What hidden factors should I take into consideration before deciding?",
    "How can I align this critical decision with my highest good?"
  ],
  future: [
    "What major energetic themes will define the upcoming 3 to 6 months?",
    "What seeds planted in the past are now ready to bear fruit?",
    "How can I prepare myself to navigate upcoming life changes with grace?"
  ],
  yes_no: [
    "Is moving forward with this initiative favored at this time?",
    "Will this endeavor bring long-term fulfillment and peace of mind?",
    "Should I wait for additional information before taking definitive action?"
  ],
  daily: [
    "What is the primary spiritual lesson and focal energy for today?",
    "How can I navigate today's interactions with mindfulness and clarity?",
    "What blessing or opportunity is available for me to receive today?"
  ]
};

export function getQuestionsByCategory(category: string): string[] {
  return CATEGORY_QUESTIONS[category.toLowerCase()] || [];
}

export function getOracleLensForCategory(
  cardId: string, 
  category: string
): { lensName: string; text: string } | null {
  const entry = TAROT_ORACLE_CARDS_MAP[cardId];
  if (!entry || !entry.lenses) {
    const lensName = category.charAt(0).toUpperCase() + category.slice(1) + " Lens";
    return {
      lensName,
      text: "Reflect on how this archetype illuminates your " + category + " inquiry."
    };
  }

  const catLower = category.toLowerCase();
  const text = entry.lenses[catLower] || entry.lenses.practical || entry.lenses.psychological;
  if (!text) return null;

  return {
    lensName: category.charAt(0).toUpperCase() + category.slice(1) + " Insight",
    text
  };
}
