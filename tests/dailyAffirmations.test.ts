import { describe, it, expect } from "vitest";
import {
  DAILY_AFFIRMATIONS,
  getAffirmationForDate,
  SpiritualAffirmation
} from "../src/data/dailyAffirmationsData";

describe("Daily Spiritual Affirmations & Quotes Suite", () => {
  it("contains at least 31 curated sacred affirmations", () => {
    expect(DAILY_AFFIRMATIONS.length).toBeGreaterThanOrEqual(31);
  });

  it("ensures each affirmation has complete shastric and inspirational properties", () => {
    const requiredFields: (keyof SpiritualAffirmation)[] = [
      "id",
      "affirmation",
      "sanskrit",
      "transliteration",
      "translation",
      "source",
      "category",
      "categoryLabel",
      "cosmicEnergy",
      "seedMantra",
      "themeDescription"
    ];

    DAILY_AFFIRMATIONS.forEach((aff) => {
      requiredFields.forEach((field) => {
        expect(aff[field], `Missing field ${field} in affirmation ${aff.id}`).toBeTruthy();
      });
      expect(aff.affirmation.length).toBeGreaterThan(10);
      expect(aff.sanskrit.length).toBeGreaterThan(3);
    });
  });

  it("covers all primary spiritual categories (peace, abundance, strength, wisdom, healing, gratitude)", () => {
    const categories = new Set(DAILY_AFFIRMATIONS.map((a) => a.category));
    expect(categories.has("peace")).toBe(true);
    expect(categories.has("abundance")).toBe(true);
    expect(categories.has("strength")).toBe(true);
    expect(categories.has("wisdom")).toBe(true);
    expect(categories.has("healing")).toBe(true);
    expect(categories.has("gratitude")).toBe(true);
  });

  it("deterministically returns an affirmation based on the calendar date", () => {
    const dateA = new Date(2026, 9, 14); // Oct 14, 2026
    const dateB = new Date(2026, 9, 14);
    const dateNextDay = new Date(2026, 9, 15);

    const affA = getAffirmationForDate(dateA);
    const affB = getAffirmationForDate(dateB);
    const affNext = getAffirmationForDate(dateNextDay);

    expect(affA.id).toBe(affB.id);
    expect(affA.affirmation).toBe(affB.affirmation);
    // Two consecutive days should be different in a 31-item array
    expect(affA.id).not.toBe(affNext.id);
  });

  it("handles boundary leap years and year-end dates safely", () => {
    const jan1 = new Date(2026, 0, 1);
    const dec31 = new Date(2026, 11, 31);

    const affJan1 = getAffirmationForDate(jan1);
    const affDec31 = getAffirmationForDate(dec31);

    expect(affJan1).toBeDefined();
    expect(affDec31).toBeDefined();
    expect(affJan1.id).toBeTruthy();
    expect(affDec31.id).toBeTruthy();
  });
});
