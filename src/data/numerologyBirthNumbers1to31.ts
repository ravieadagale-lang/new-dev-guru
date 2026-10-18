// src/data/numerologyBirthNumbers1to31.ts
import { BirthNumberDetail, DISCLAIMER_FOOTER, AdditionalInsights } from "./birthNumbers/types";
import { BIRTH_NUMBERS_1_TO_10 } from "./birthNumbers/birthNumbers1to10";
import { BIRTH_NUMBERS_11_TO_20 } from "./birthNumbers/birthNumbers11to20";
import { BIRTH_NUMBERS_21_TO_31 } from "./birthNumbers/birthNumbers21to31";

export type { BirthNumberDetail, AdditionalInsights };
export { DISCLAIMER_FOOTER };

export const CHAPTER_EIGHTEEN_THEORY_DATA = {
  title: "Birth Day Energy (1 to 31) — The Sub-Harmonic Blueprint",
  quote: {
    text: "The day of birth is the sub-harmonic key that tunes the grand Life Path symphony to its precise octave of expression.",
    author: "Shree Dev-Guru Canonical Numerology"
  },
  introParagraphs: [
    "While the Life Path Number indicates the primary road, the Birth Number (the calendar day of birth, 1 to 31) reveals the instinctive tools, natural disposition, subconscious approach, and energetic signature a soul brings into physical embodiment.",
    "Compound birth dates (10 through 31) carry a dual vibration: the energetic interplay of individual digits and the single-digit root frequency, providing nuanced archetypes, specific relationship dynamics (as wife and husband), career inclinations, and spiritual lessons."
  ],
  consultationRoleSummary: "Used as the baseline instinctive signature in consultations. Always preserve compound notation (e.g. 14/5, 29/11) to honor the foundational digits and karmic or master lessons alongside root expression."
};

export const ALL_BIRTH_NUMBERS_DATABASE: Record<number, BirthNumberDetail> = {
  ...BIRTH_NUMBERS_1_TO_10,
  ...BIRTH_NUMBERS_11_TO_20,
  ...BIRTH_NUMBERS_21_TO_31
};

/**
 * Safe accessor for birth day detail (1-31)
 */
export function getBirthNumberDetail(day: number): BirthNumberDetail | undefined {
  if (day < 1 || day > 31) return undefined;
  return ALL_BIRTH_NUMBERS_DATABASE[day];
}
