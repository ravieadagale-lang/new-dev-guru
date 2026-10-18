// Dev-Guru Tarot Oracle Engine

import { TarotCardData, TarotSpread, DrawnCard, ReadingCategory, ReadingAnalysis, TarotReadingSession } from "../types/tarot";
import { TAROT_SPREADS } from "../data/tarotSpreadsData";

export interface QuestionAnalysisResult {
  category: ReadingCategory;
  recommendedSpread: TarotSpread;
  tone: string;
  keywords: string[];
}

export function analyzeUserQuestion(question: string): QuestionAnalysisResult {
  const q = question.toLowerCase();

  let category: ReadingCategory = "general";
  if (q.includes("love") || q.includes("marriage") || q.includes("partner") || q.includes("relationship") || q.includes("crush") || q.includes("ex") || q.includes("soulmate")) {
    category = "love";
  } else if (q.includes("job") || q.includes("career") || q.includes("business") || q.includes("work") || q.includes("promotion") || q.includes("interview")) {
    category = "career";
  } else if (q.includes("money") || q.includes("wealth") || q.includes("finance") || q.includes("investment") || q.includes("debt")) {
    category = "finance";
  } else if (q.includes("spiritual") || q.includes("karma") || q.includes("soul") || q.includes("meditation") || q.includes("destiny")) {
    category = "spiritual";
  } else if (q.includes("will i") || q.includes("should i") || q.includes("is it") || q.includes("can i")) {
    category = "decision";
  }

  // Find optimal matching spread
  let spread = TAROT_SPREADS.find(s => s.category === category);
  if (!spread) {
    spread = TAROT_SPREADS.find(s => s.id === "past_present_future") || TAROT_SPREADS[0];
  }

  return {
    category,
    recommendedSpread: spread,
    tone: "Introspective and Auspicious",
    keywords: ["Clarity", "Transformation", "Intuition"]
  };
}

export function shuffleDeck(
  masterDeck: TarotCardData[],
  reversalProbability: number = 0.2
): { card: TarotCardData; isReversed: boolean }[] {
  const shuffled = [...masterDeck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.map(card => ({
    card,
    isReversed: Math.random() < reversalProbability
  }));
}

export function analyzeReadingCards(
  drawnCards: DrawnCard[],
  question: string,
  category: ReadingCategory
): ReadingAnalysis {
  let fire = 0, water = 0, air = 0, earth = 0;

  const cardInterpretations = drawnCards.map((d, index) => {
    const card = d.card;
    if (card.element === "Fire") fire++;
    else if (card.element === "Water") water++;
    else if (card.element === "Air") air++;
    else if (card.element === "Earth") earth++;

    const posName = d.position?.name || d.positionLabel || `Position ${index + 1}`;
    const meaning = d.isReversed
      ? card.reversedMeaning || "Internal reflection, potential blockage or subtle transformation needing patience."
      : card.uprightMeaning || "Clear manifestation, active energy, and direct guidance.";

    return {
      positionName: posName,
      cardName: card.name,
      isReversed: d.isReversed,
      meaning
    };
  });

  const total = drawnCards.length || 1;
  const elementalBalance = {
    fire: Math.round((fire / total) * 100),
    water: Math.round((water / total) * 100),
    air: Math.round((air / total) * 100),
    earth: Math.round((earth / total) * 100)
  };

  const primaryCard = drawnCards[0]?.card;

  return {
    summary: `Your reading reflects a powerful energetic current centered on ${primaryCard?.name || "the cosmos"}. The cards indicate a pivotal transitional phase with supportive intuitive guidance.`,
    theme: `${category.toUpperCase()} EVOLUTION & INNER MASTERY`,
    synthesis: `The alignment between ${drawnCards.map(d => d.card.name).join(", ")} reveals that conscious patience and assertive clarity will open favorable pathways. Align your inner intentions with steady outer action.`,
    keyInsight: `Trust your deep discernment; subtle obstacles are currently dissolving under celestial light.`,
    cardInterpretations,
    elementalBalance,
    advice: [
      "Maintain grounded daily habits to stabilize sudden intuitive insights.",
      "Honor both emotional vulnerability and strategic boundaries.",
      "Take one tangible step forward without succumbing to unnecessary doubt."
    ],
    affirmation: "I am open to the wisdom of the universe, and I step forward with calm confidence.",
    overallTone: "Favorable & Illuminating",
    actionableGuidance: [
      "Reflect on the primary card symbolism during meditation.",
      "Avoid impulsive reactions over the next 48 hours."
    ]
  };
}

const TAROT_STORAGE_KEY = "astronext_saved_tarot_readings_v1";

export function saveTarotReading(session: TarotReadingSession): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(TAROT_STORAGE_KEY);
    const list: TarotReadingSession[] = raw ? JSON.parse(raw) : [];
    const updated = [session, ...list.filter(s => s.id !== session.id)];
    localStorage.setItem(TAROT_STORAGE_KEY, JSON.stringify(updated.slice(0, 30)));
  } catch (e) {
    // Ignore
  }
}

export function getSavedTarotReadings(): TarotReadingSession[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(TAROT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}
