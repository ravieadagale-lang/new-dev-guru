import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import {
  calculateChaldeanNumber,
  checkCandidateCompatibility,
  generateCompleteCorrectionPlan,
  ALLOWED_NAME_NUMBERS,
  FORBIDDEN_NAME_NUMBERS
} from "../src/utils/numerologyNameCorrectionEngine";

describe("81 Combination Matrix Name, Signature & Nickname Suggestions Engine", () => {
  it("strictly enforces allowed name numbers (1, 3, 5, 6) and rejects (2, 4, 7, 8, 9)", () => {
    expect(ALLOWED_NAME_NUMBERS).toEqual([1, 3, 5, 6]);
    expect(FORBIDDEN_NAME_NUMBERS).toEqual([2, 4, 7, 8, 9]);

    for (const num of [2, 4, 7, 8, 9]) {
      const check = checkCandidateCompatibility(num, 1, 1);
      expect(check.isCompatible).toBe(false);
      expect(check.reasons[0]).toContain("forbidden list");
    }
  });

  it("identifies 8 and 1 as anty numbers", () => {
    // If Driver is 8, candidate 1 must be flagged as anty number
    const check8 = checkCandidateCompatibility(1, 8, 5);
    expect(check8.isCompatible).toBe(false);
    expect(check8.reasons.some((r) => r.includes("8 and 1") || r.includes("anty/enemy"))).toBe(true);

    // If Driver is 1, candidate 8 must be rejected
    const check1 = checkCandidateCompatibility(8, 1, 5);
    expect(check1.isCompatible).toBe(false);
  });

  it("identifies 4 and 8 struggles and 3 and 6 clashes", () => {
    // Driver 4 and candidate 8 or 4
    const check48 = checkCandidateCompatibility(8, 4, 2);
    expect(check48.isCompatible).toBe(false);

    // Driver 3 and candidate 6
    const check36 = checkCandidateCompatibility(6, 3, 1);
    expect(check36.isCompatible).toBe(false);
    expect(check36.reasons.some((r) => r.includes("3 and 6") || r.includes("preceptor"))).toBe(true);

    // Driver 6 and candidate 3
    const check63 = checkCandidateCompatibility(3, 6, 5);
    expect(check63.isCompatible).toBe(false);
    expect(check63.reasons.some((r) => r.includes("6 and 3") || r.includes("preceptor"))).toBe(true);
  });

  it("generates calculated name suggestions avoiding forbidden and anty numbers", () => {
    // Test with Driver 8 (Saturn), Conductor 4 (Rahu)
    // 8 and 4 have struggles. Candidate 1 is enemy to 8. Candidates 2,4,7,8,9 are forbidden.
    // So 5 and 6 are prime harmonizers!
    const plan = generateCompleteCorrectionPlan("Rohan Verma", "Rohan Verma", "Romi", 8, 4);
    expect(plan.driver).toBe(8);
    expect(plan.conductor).toBe(4);
    expect(plan.nameSuggestions.length).toBeGreaterThan(0);

    for (const sug of plan.nameSuggestions) {
      expect([1, 3, 5, 6]).toContain(sug.root);
      expect([2, 4, 7, 8, 9]).not.toContain(sug.root);
      // Because Driver is 8, root 1 must NOT be suggested
      expect(sug.root).not.toBe(1);
    }
  });

  it("provides comprehensive signature and nickname suggestions with activation guidance", () => {
    const plan = generateCompleteCorrectionPlan("Aarav Sharma", "Aarav K. Sharma", "Avi", 1, 7);

    // Signature guidance checks
    expect(plan.signatureSuggestion.baselineAngle).toContain("upward");
    expect(plan.signatureSuggestion.dosAndDonts.dos.length).toBeGreaterThan(0);
    expect(plan.signatureSuggestion.dosAndDonts.donts.length).toBeGreaterThan(0);

    // Nickname suggestions
    expect(plan.nicknameSuggestions.length).toBeGreaterThan(0);
    for (const nick of plan.nicknameSuggestions) {
      expect([1, 3, 5, 6]).toContain(nick.root);
      expect([2, 4, 7, 8, 9]).not.toContain(nick.root);
    }

    // 41-day activation protocol
    expect(plan.activationGuidance.sadhanaDays).toBe(41);
    expect(plan.activationGuidance.activationSteps.length).toBe(4);
  });

  it("AdvanceNumerologyReportView mounts SignatureAndNameCorrectionCard and has no chapter numbers in headings", () => {
    const filePath = path.resolve(__dirname, "../src/components/AdvanceNumerologyReportView.tsx");
    const content = fs.readFileSync(filePath, "utf-8");

    expect(content).toContain("<SignatureAndNameCorrectionCard");
    expect(content).toContain("Birth Day Analysis (Day");
    expect(content).toContain("81 Combination Matrix Analysis");
    expect(content).toContain("Soul Urge Number");
    expect(content).toContain("Expression Calling");
    expect(content).toContain("Signature & Nickname Harmonic Calibration");

    // Must NOT contain "Chapter 1 •", "Chapter 2 •", "Chapter 38 •", etc.
    expect(content).not.toMatch(/Chapter\s+\d+\s*•/i);
  });

  it("SignatureAndNameCorrectionCard contains Copy Suggestion button and toast notification", () => {
    const cardPath = path.resolve(__dirname, "../src/components/SignatureAndNameCorrectionCard.tsx");
    const cardContent = fs.readFileSync(cardPath, "utf-8");

    expect(cardContent).toContain("Copy Suggestion");
    expect(cardContent).toContain("handleCopySuggestion");
    expect(cardContent).toContain("toastMessage");
    expect(cardContent).toContain("Copied to Clipboard!");
    expect(cardContent).toContain("FLOATING SUCCESS TOAST NOTIFICATION");
  });
});
