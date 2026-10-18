import { describe, it, expect } from "vitest";
import { getVedicAspectsForPlanet } from "../src/components/KundliChartSVG";

describe("Kundli Birth Chart — Planetary Aspects & Drishti Engine", () => {
  it("calculates direct 7th house aspect (Saptama Drishti) for all standard planets", () => {
    // Sun in House 1 -> aspects House 7
    const sunAspects = getVedicAspectsForPlanet("Sun", 1);
    expect(sunAspects).toHaveLength(1);
    expect(sunAspects[0].targetHouse).toBe(7);
    expect(sunAspects[0].offset).toBe(7);
    expect(sunAspects[0].strength).toContain("100% Full Aspect");

    // Moon in House 4 -> aspects House 10
    const moonAspects = getVedicAspectsForPlanet("Moon", 4);
    expect(moonAspects).toHaveLength(1);
    expect(moonAspects[0].targetHouse).toBe(10);
    expect(moonAspects[0].offset).toBe(7);

    // Venus in House 12 -> aspects House 6
    const venusAspects = getVedicAspectsForPlanet("Venus", 12);
    expect(venusAspects).toHaveLength(1);
    expect(venusAspects[0].targetHouse).toBe(6);
    expect(venusAspects[0].offset).toBe(7);
  });

  it("calculates special Parashari aspects for Mars (4th, 7th, 8th)", () => {
    // Mars placed in House 1
    const marsH1 = getVedicAspectsForPlanet("Mars", 1);
    expect(marsH1).toHaveLength(3);
    const targetHousesH1 = marsH1.map(a => a.targetHouse);
    expect(targetHousesH1).toContain(7); // 7th direct
    expect(targetHousesH1).toContain(4); // 4th special
    expect(targetHousesH1).toContain(8); // 8th special

    // Mars placed in House 10
    // 10 + 4 - 1 = 13 -> House 1
    // 10 + 7 - 1 = 16 -> House 4
    // 10 + 8 - 1 = 17 -> House 5
    const marsH10 = getVedicAspectsForPlanet("Mars", 10);
    const targetHousesH10 = marsH10.map(a => a.targetHouse);
    expect(targetHousesH10).toEqual([4, 1, 5]);
  });

  it("calculates special Parashari aspects for Jupiter (5th, 7th, 9th)", () => {
    // Jupiter placed in House 9 (Guru in 9th house)
    // 9 + 5 - 1 = 13 -> House 1 (Lagna)
    // 9 + 7 - 1 = 15 -> House 3 (Sahaja)
    // 9 + 9 - 1 = 17 -> House 5 (Putra)
    const jupiterH9 = getVedicAspectsForPlanet("Jupiter", 9);
    expect(jupiterH9).toHaveLength(3);
    const targetHousesH9 = jupiterH9.map(a => a.targetHouse);
    expect(targetHousesH9).toEqual([3, 1, 5]);
    expect(jupiterH9.some(a => a.label.includes("Special Guru Drishti"))).toBe(true);
  });

  it("calculates special Parashari aspects for Saturn (3rd, 7th, 10th)", () => {
    // Saturn placed in House 11
    // 11 + 3 - 1 = 13 -> House 1
    // 11 + 7 - 1 = 17 -> House 5
    // 11 + 10 - 1 = 20 -> House 8
    const saturnH11 = getVedicAspectsForPlanet("Saturn", 11);
    expect(saturnH11).toHaveLength(3);
    const targetHousesH11 = saturnH11.map(a => a.targetHouse);
    expect(targetHousesH11).toEqual([5, 1, 8]);
    expect(saturnH11.some(a => a.label.includes("Special Shani Drishti"))).toBe(true);
  });

  it("calculates trine aspects for Rahu and Ketu (5th, 7th, 9th)", () => {
    // Rahu in House 2 -> aspects 8 (7th), 6 (5th), 10 (9th)
    const rahuH2 = getVedicAspectsForPlanet("Rahu", 2);
    expect(rahuH2).toHaveLength(3);
    const rahuTargets = rahuH2.map(a => a.targetHouse);
    expect(rahuTargets).toContain(8);
    expect(rahuTargets).toContain(6);
    expect(rahuTargets).toContain(10);

    // Ketu in House 8 -> aspects 2 (7th), 12 (5th), 4 (9th)
    const ketuH8 = getVedicAspectsForPlanet("Ketu", 8);
    expect(ketuH8).toHaveLength(3);
    const ketuTargets = ketuH8.map(a => a.targetHouse);
    expect(ketuTargets).toContain(2);
    expect(ketuTargets).toContain(12);
    expect(ketuTargets).toContain(4);
  });

  it("handles case-insensitive and Sanskrit alias planet names correctly", () => {
    const mangal = getVedicAspectsForPlanet("mangal", 1);
    expect(mangal).toHaveLength(3);

    const guru = getVedicAspectsForPlanet("Guru", 1);
    expect(guru).toHaveLength(3);

    const shani = getVedicAspectsForPlanet("shani", 1);
    expect(shani).toHaveLength(3);
  });
});
