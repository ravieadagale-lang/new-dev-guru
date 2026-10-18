/**
 * Vimshottari & Parashari Dasha Rules Registry
 * Classical rule definitions with IDs, formulas, conditions, and canonical Shloka references.
 * Classical Sources: Brihat Parashara Hora Shastra (BPHS), Phaladeepika, Jataka Parijata, Saravali.
 */

export interface DashaRuleDefinition {
  ruleId: string;
  name: string;
  category: "Balance" | "Sequence" | "Sub-Period" | "Lordship" | "Activation" | "Confluence";
  formula: string;
  inputs: string[];
  conditions: string;
  output: string;
  classicalReference: string;
  notes: string;
  version: string;
}

export const DASHA_RULES_REGISTRY: Record<string, DashaRuleDefinition> = {
  "VD-BAL-001": {
    ruleId: "VD-BAL-001",
    name: "Vimshottari Birth Dasha Balance",
    category: "Balance",
    formula: "Remaining Dasha = Planet Dasha Years × (Remaining Nakshatra Arc / 13°20')",
    inputs: ["Moon Longitude", "Birth Nakshatra", "Nakshatra Lord Total Years"],
    conditions: "Evaluates exact fractional degrees traversed in birth nakshatra (13°20' span).",
    output: "Exact years, months, and days of initial Mahadasha at birth.",
    classicalReference: "BPHS Ch. 46, Shlokas 2–5 (Vimshottari Dasha Adhyaya)",
    notes: "No rounding of intermediate astronomical arcs to preserve exact millisecond date alignment.",
    version: "2.1.0"
  },
  "VD-SEQ-001": {
    ruleId: "VD-SEQ-001",
    name: "Vimshottari 120-Year Cyclic Sequence",
    category: "Sequence",
    formula: "Ketu (7) → Venus (20) → Sun (6) → Moon (10) → Mars (7) → Rahu (18) → Jupiter (16) → Saturn (19) → Mercury (17)",
    inputs: ["Birth Nakshatra Lord"],
    conditions: "Full cycle total must strictly equal 120.0 Solar Sidereal Years.",
    output: "Ordered sequence of 9 Mahadashas beginning with birth lord.",
    classicalReference: "BPHS Ch. 46, Shloka 12; Phaladeepika Ch. 19",
    notes: "Sequence is cyclic; after Mercury (17y), it recurses to Ketu (7y).",
    version: "2.1.0"
  },
  "VD-ANT-001": {
    ruleId: "VD-ANT-001",
    name: "Proportional Antardasha Division",
    category: "Sub-Period",
    formula: "Antardasha Duration = (MD Duration Years × AD Planet Vimshottari Years) / 120",
    inputs: ["Mahadasha Duration", "Antardasha Planet Years"],
    conditions: "Sum of all 9 Antardashas must equal exact Mahadasha duration with zero residual gap.",
    output: "Antardasha start, end, and duration in days.",
    classicalReference: "BPHS Ch. 46, Shlokas 15–18",
    notes: "Antardasha sequence begins from the Mahadasha lord itself and proceeds sequentially.",
    version: "2.1.0"
  },
  "VD-PRT-001": {
    ruleId: "VD-PRT-001",
    name: "Proportional Pratyantardasha Division",
    category: "Sub-Period",
    formula: "Pratyantar Duration = (AD Duration Days × PD Planet Vimshottari Years) / 120",
    inputs: ["Antardasha Duration", "Pratyantardasha Planet Years"],
    conditions: "Parent-child interval strict containment; starts with Antardasha lord.",
    output: "3rd-tier period timestamps.",
    classicalReference: "BPHS Ch. 46, Shlokas 22–25",
    notes: "Third level of temporal manifestation.",
    version: "2.1.0"
  },
  "VD-SOO-001": {
    ruleId: "VD-SOO-001",
    name: "Proportional Sookshmadasha Division",
    category: "Sub-Period",
    formula: "Sookshma Duration = (PD Duration Days × SD Planet Vimshottari Years) / 120",
    inputs: ["Pratyantardasha Duration", "Sookshma Planet Years"],
    conditions: "Fourth-tier precision timing interval.",
    output: "4th-tier period timestamps.",
    classicalReference: "Phaladeepika Ch. 20, Shlokas 1–4",
    notes: "Used for acute event timing down to daily granularity.",
    version: "2.1.0"
  },
  "VD-PRA-001": {
    ruleId: "VD-PRA-001",
    name: "Proportional Pranadasha Division",
    category: "Sub-Period",
    formula: "Prana Duration = (SD Duration Days × Prana Planet Vimshottari Years) / 120",
    inputs: ["Sookshmadasha Duration", "Pranadasha Planet Years"],
    conditions: "Fifth-tier precision timing interval (hours/minutes level).",
    output: "5th-tier period timestamps.",
    classicalReference: "Jataka Parijata Ch. 18, Shloka 10",
    notes: "Fine breath / hourly resonance pulse.",
    version: "2.1.0"
  },
  "VD-LND-001": {
    ruleId: "VD-LND-001",
    name: "Dasha Lord Functional Nature & Lordship",
    category: "Lordship",
    formula: "Evaluate Trikona (1,5,9) / Kendra (1,4,7,10) ownership vs Dusthana (6,8,12) & Trishadaya (3,6,11)",
    inputs: ["Ascendant Sign", "Planet House Lordships"],
    conditions: "Trikona lords are inherently auspicious; Dusthana lords produce structural challenges or transformation.",
    output: "Functional Benefic, Functional Malefic, Yogakaraka, or Neutral.",
    classicalReference: "BPHS Ch. 34 (Karakas and Lordship Effects)",
    notes: "Functional nature modifies natural planetary significations.",
    version: "2.1.0"
  },
  "VD-ACT-001": {
    ruleId: "VD-ACT-001",
    name: "Multi-House Activation Chain",
    category: "Activation",
    formula: "Activated Houses = {Owned Houses} ∪ {Occupied House} ∪ {Aspected Houses} ∪ {Dispositor Houses}",
    inputs: ["Dasha Lord Placement", "Dasha Lord Lordships", "Drishti Cast"],
    conditions: "All life themes governed by activated houses become active during the Dasha window.",
    output: "Array of activated Bhavas (1–12) with activation strength.",
    classicalReference: "Phaladeepika Ch. 20, Shlokas 12–15",
    notes: "Explains how single planet manifests across multiple life sectors simultaneously.",
    version: "2.1.0"
  },
  "VD-CNF-001": {
    ruleId: "VD-CNF-001",
    name: "Dasha-Antardasha Confluence Synthesis",
    category: "Confluence",
    formula: "Confluence = Agreement of MD + AD + PD lords in activating common Bhava or Karakatwa",
    inputs: ["MD Lord", "AD Lord", "PD Lord", "Common Activated Houses"],
    conditions: "When 2 or more levels activate same house/theme with positive dignity, manifest event certainty rises.",
    output: "Strong Support, Moderate Support, Mixed, Weak Support, or Challenged.",
    classicalReference: "Saravali Ch. 41, Shlokas 1–8",
    notes: "Deterministic synthesis replacing subjective speculation.",
    version: "2.1.0"
  }
};
