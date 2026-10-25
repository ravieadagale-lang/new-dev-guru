import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Numerology Remedies Separation", () => {
  const reportViewPath = path.resolve(__dirname, "../src/components/AdvanceNumerologyReportView.tsx");
  const remediesViewPath = path.resolve(__dirname, "../src/components/NumerologyRemediesView.tsx");
  const numerologyViewPath = path.resolve(__dirname, "../src/features/NumerologyView.tsx");

  it("AdvanceNumerologyReportView must NOT contain screenshot cards under report", () => {
    const reportCode = fs.readFileSync(reportViewPath, "utf-8");
    expect(reportCode).not.toContain("Numerological Yantras (Number 1 to Number 9 Magic Squares)");
    expect(reportCode).not.toContain("Divine Deities & Sacred Spiritual Archetypes");
    expect(reportCode).not.toContain("Major Vedic Deities & Divine Mothers");
    expect(reportCode).not.toContain("Navaratna Sacred Gemstones & Planetary Crystals");
    expect(reportCode).not.toContain("Sacred Rudraksha Beads Gallery");
    expect(reportCode).not.toContain("NUMEROLOGICAL_YANTRAS_1_TO_9");
    expect(reportCode).not.toContain("RUDRAKSHA_BEADS_GALLERY");
  });

  it("NumerologyRemediesView exists and houses all screenshot remedy cards", () => {
    expect(fs.existsSync(remediesViewPath)).toBe(true);
    const remediesCode = fs.readFileSync(remediesViewPath, "utf-8");
    expect(remediesCode).toContain("Numerological Yantras (Number 1 to Number 9 Magic Squares)");
    expect(remediesCode).toContain("Divine Deities");
    expect(remediesCode).toContain("Sacred Spiritual Archetypes");
    expect(remediesCode).toContain("Major Vedic Deities");
    expect(remediesCode).toContain("Navaratna Sacred Gemstones");
    expect(remediesCode).toContain("Sacred Rudraksha Beads Gallery (1 to 21 Mukhi");
  });

  it("NumerologyView mounts sacred_remedies as a dedicated section", () => {
    const numerologyCode = fs.readFileSync(numerologyViewPath, "utf-8");
    expect(numerologyCode).toContain('id: "sacred_remedies"');
    expect(numerologyCode).toContain("<NumerologyRemediesView");
  });

  it("NumerologyView removes the language header bar from the screenshot", () => {
    const numerologyCode = fs.readFileSync(numerologyViewPath, "utf-8");
    expect(numerologyCode).not.toContain("Numerology Language / अंकशास्त्र भाषा");
    expect(numerologyCode).not.toContain("Select your preferred language for calculations");
  });

  it("NumerologyView removes all chapter indicators (Ch. XX) from menu labels", () => {
    const numerologyCode = fs.readFileSync(numerologyViewPath, "utf-8");
    expect(numerologyCode).not.toContain("(Ch.");
    expect(numerologyCode).not.toContain("(Ch ");
    expect(numerologyCode).toContain('label: "Compatibility Matrix Engine"');
    expect(numerologyCode).toContain('label: "Compatibility Theory"');
    expect(numerologyCode).toContain('label: "Lo Shu Grid & Planes"');
    expect(numerologyCode).toContain('label: "16 Lo Shu Arrows"');
    expect(numerologyCode).toContain('label: "Missing & Repeated Numbers"');
    expect(numerologyCode).toContain('label: "Mobile Numerology"');
    expect(numerologyCode).toContain('label: "Vehicle Numerology"');
    expect(numerologyCode).toContain('label: "House Numerology"');
    expect(numerologyCode).toContain('label: "Business & Brand Numerology"');
    expect(numerologyCode).toContain('label: "Brand Numerology"');
    expect(numerologyCode).toContain('label: "Muhurta Numerology"');
    expect(numerologyCode).toContain('label: "Lucky Attributes, Gemstones & Remedies"');
    expect(numerologyCode).toContain('label: "Signature Analysis"');
    expect(numerologyCode).toContain('label: "Spiritual Remedies & Mantras"');
    expect(numerologyCode).toContain('label: "Yantras, Crystals & Energy"');
    expect(numerologyCode).toContain('label: "Chakra Balancing Remedies"');
    expect(numerologyCode).toContain('label: "Birth Month Analysis"');
  });
});
