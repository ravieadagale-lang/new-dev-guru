/**
 * AstroNext - Event Timing Rule Registry & Shastric Provenance
 * Cites Brihat Parashara Hora Shastra, Jaimini Upadesha Sutras, KP Reader VI, and Phaladeepika.
 */

export interface EventRuleDefinition {
  ruleId: string;
  category: string;
  name: string;
  sanskritName?: string;
  formula: string;
  conditions: string[];
  exceptions: string[];
  source: string;
  sourceReference: string;
  methodologyVersion: string;
  calculationVersion: string;
}

export const EVENT_RULE_REGISTRY: Record<string, EventRuleDefinition> = {
  EVT_RULE_DOUBLE_TRANSIT_JUP_SAT: {
    ruleId: "EVT_RULE_DOUBLE_TRANSIT_JUP_SAT",
    category: "Transit Activation",
    name: "Classical Double Transit of Jupiter and Saturn (K.N. Rao Rule)",
    sanskritName: "गुरु-शनि द्विविध गोचर नियम",
    formula: "A major life event fructifies when both Saturn and Jupiter simultaneously influence the concerned house or its lord by transit or aspect.",
    conditions: [
      "Saturn aspects or transits the natal house / house lord (granting sanction of destiny).",
      "Jupiter aspects or transits the natal house / house lord (granting divine grace and fruition).",
    ],
    exceptions: ["Severe Vedha obstruction in Ashtakavarga."],
    source: "K.N. Rao & Classical Phaladeepika",
    sourceReference: "Phaladeepika Gochara Adhyaya; Planets and Children - K.N. Rao",
    methodologyVersion: "event-timing-v1",
    calculationVersion: "v7.0-pro",
  },

  EVT_RULE_DASHA_TRANSIT_CONVERGENCE: {
    ruleId: "EVT_RULE_DASHA_TRANSIT_CONVERGENCE",
    category: "Predictive Synthesis",
    name: "Dasha - Transit Temporal Convergence",
    sanskritName: "दशा-गोचर संयोग सिद्धान्त",
    formula: "Dasha delivers the promise while Gochara (Transit) pinpoints the exact hour of materialization.",
    conditions: [
      "Running Antardasha lord must rule or occupy the relevant domain house.",
      "Transit Jupiter or Saturn must activate the Antardasha lord or its dispositor.",
    ],
    exceptions: ["Dasha lord posited in 6/8/12 from Mahadasha lord causing Chhidra friction."],
    source: "Brihat Parashara Hora Shastra",
    sourceReference: "BPHS Dasha-Phala Prakarana Adhyaya 48",
    methodologyVersion: "event-timing-v1",
    calculationVersion: "v7.0-pro",
  },

  EVT_RULE_KP_CUSPAL_TIMING: {
    ruleId: "EVT_RULE_KP_CUSPAL_TIMING",
    category: "KP Event Timing",
    name: "KP 4-Tier Cuspal Sub-Lord Timing Chain",
    sanskritName: "के.पी. कार्यसिद्धि कालनिर्णय",
    formula: "Event fructifies during the Dasha-Bhukti-Antara of Joint Significators (ABCD tiers) when transiting Sun/Moon cross their sensitive zones.",
    conditions: [
      "Sub Lord of primary house signifies 2, 7, 11 (Marriage) or 2, 6, 10, 11 (Career).",
      "Joint significators in D1 are active in the current Dasha period.",
    ],
    exceptions: ["Significators posited in the constellation of retrograde planets."],
    source: "KP Reader III & IV",
    sourceReference: "KP Reader III - Dasha System and Transits",
    methodologyVersion: "kp-horary-v1",
    calculationVersion: "v7.0-pro",
  },

  EVT_RULE_JAIMINI_CHARA_DASHA_ACTIVATION: {
    ruleId: "EVT_RULE_JAIMINI_CHARA_DASHA_ACTIVATION",
    category: "Jaimini Timing",
    name: "Jaimini Chara Dasha Sign Activation of Arudha / Karaka",
    sanskritName: "जैमिनी चर दशा पद फल",
    formula: "When Chara Dasha transits the sign containing or aspecting the Arudha Pada (e.g. AL, A10, UL, DK), that life domain materializes.",
    conditions: [
      "Active Dasha sign has direct Rashi Drishti on the concerned Arudha or Chara Karaka.",
      "No dominant Virodhargala unbalancing the Argala.",
    ],
    exceptions: ["Debilitated Amatyakaraka or Darakaraka without cancellation."],
    source: "Jaimini Upadesha Sutras",
    sourceReference: "Jaimini Sutras Adhyaya 2, Pada 4",
    methodologyVersion: "jaimini-v1",
    calculationVersion: "v7.0-pro",
  },

  EVT_RULE_ANNUAL_VARSHA_MUNTHA_CONFLUENCE: {
    ruleId: "EVT_RULE_ANNUAL_VARSHA_MUNTHA_CONFLUENCE",
    category: "Annual Timing",
    name: "Annual Varshaphala & Muntha Milestone Activation",
    sanskritName: "वार्षिक मुन्था फल सिद्धि",
    formula: "Event manifests when Muntha transits Kendra/Trikona in Varshaphala and relevant Saham receives Muthashila.",
    conditions: [
      "Muntha in houses 1, 4, 7, 10, 5, 9, 11 from Varsha Lagna.",
      "Year Lord (Varshesha) is strong with Harsha Bala >= 10 points.",
    ],
    exceptions: ["Muntha afflicted in 6th, 8th, or 12th house."],
    source: "Tajika Neelakanthi",
    sourceReference: "Tajika Neelakanthi Adhyaya 3",
    methodologyVersion: "tajika-v1",
    calculationVersion: "v7.0-pro",
  },
};
