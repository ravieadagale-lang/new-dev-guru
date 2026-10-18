/**
 * AstroNext BTR Shastric Knowledge & Event Mapping
 * Maps real-life milestones to Parashari Bhavas, KP Cusps, Natural Karakas,
 * Jaimini Chara Karakas, and Divisional Charts (D9, D10, D7, etc.).
 */

import { BtrEventCategory, BtrEventSignificance } from "./btrTypes";

export interface BtrEventTypeDefinition {
  id: string;
  name: string;
  category: BtrEventCategory;
  defaultSignificance: BtrEventSignificance;
  primaryHouses: number[];
  secondaryHouses: number[];
  naturalKarakas: string[];
  jaiminiKarakaRole?: "AK" | "AmK" | "BK" | "MK" | "PK" | "GK" | "DK";
  relevantVarga?: "D9" | "D10" | "D7" | "D4" | "D3" | "D12";
  description: string;
  ruleCategory?: "SPECIALIZED_CLASSICAL_RULE" | "GENERIC_SUPPORTING_RULE";
  kpRuleId?: string;
  kpSignificatorHouses?: number[];
  parashariRuleId?: string;
  jaiminiRuleId?: string;
  provenance?: string;
}

/**
 * Specialized classical rules metadata dictionary for precise provenance tracking
 */
const SPECIALIZED_RULES_MAP: Record<
  string,
  {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE";
    kpRuleId?: string;
    kpSignificatorHouses?: number[];
    parashariRuleId?: string;
    jaiminiRuleId?: string;
    provenance: string;
  }
> = {
  marriage: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_MARRIAGE_001",
    kpSignificatorHouses: [2, 7, 11],
    parashariRuleId: "BPHS_VIVAH_001",
    jaiminiRuleId: "JAM_DK_001",
    provenance: "KP Reader IV (Marriage: 7th Cusp Sub-Lord to 2, 7, 11); BPHS Ch. 42 (7th Lord / Venus Dasha); Jaimini 1.1 (Darakaraka DK)"
  },
  engagement: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_ENGAGE_001",
    kpSignificatorHouses: [2, 7, 11],
    provenance: "KP Reader IV (Betrothal / Alliance Promise: 7th Cusp Sub-Lord to 2, 7, 11)"
  },
  first_relationship: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_ROMANCE_001",
    kpSignificatorHouses: [5, 7, 11],
    provenance: "KP Reader IV (Romantic Alliance: 5th & 7th Cusp Sub-Lords to 5, 11)"
  },
  divorce: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_DIVORCE_002",
    kpSignificatorHouses: [6, 12],
    provenance: "KP Reader IV (Divorce / Legal Dissolution: 7th Cusp Sub-Lord signifying 6th and 12th houses)"
  },
  separation: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_SEPARATION_002",
    kpSignificatorHouses: [6, 12],
    provenance: "KP Reader IV (Marital Estrangement: 7th Cusp Sub-Lord to 6, 12)"
  },
  breakup: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_BREAKUP_002",
    kpSignificatorHouses: [4, 12],
    provenance: "KP Reader IV (Severance of Affection: 5th Cusp Sub-Lord signifying 4th and 12th houses)"
  },
  childbirth: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_PROGENY_003",
    kpSignificatorHouses: [2, 5, 11],
    parashariRuleId: "BPHS_SANTANA_001",
    jaiminiRuleId: "JAM_PK_001",
    provenance: "KP Reader IV (Progeny Delivery: 5th Cusp Sub-Lord to 2, 5, 11); BPHS Ch. 42 (Putra Bhava / Jupiter); Jaimini 1.1 (Putrakaraka PK)"
  },
  pregnancy: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_PREGNANCY_003",
    kpSignificatorHouses: [2, 5, 11],
    provenance: "KP Reader IV (Gestation / Conception Fructification: 5th Cusp Sub-Lord to 2, 5, 11)"
  },
  child_adoption: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_ADOPTION_003",
    kpSignificatorHouses: [4, 8, 5],
    provenance: "KP Reader IV (Progeny Adoption: 5th & 8th Cusp Sub-Lord alignment)"
  },
  first_job: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_CAREER_004",
    kpSignificatorHouses: [2, 6, 10, 11],
    parashariRuleId: "BPHS_KARMA_001",
    jaiminiRuleId: "JAM_AMK_001",
    provenance: "KP Reader IV (First Appointment: 10th Cusp Sub-Lord to 2, 6, 10, 11); BPHS Ch. 42 (10th Lord Dasha); Jaimini 1.1 (Amatyakaraka AmK)"
  },
  promotion: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_PROMOTION_004",
    kpSignificatorHouses: [2, 6, 10, 11],
    provenance: "KP Reader IV (Professional Elevation & Increments: 10th & 11th Cusp Sub-Lords to 2, 6, 10, 11)"
  },
  job_change: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_JOB_CHANGE_004",
    kpSignificatorHouses: [3, 5, 9, 10, 11],
    provenance: "KP Reader IV (Change of Position / Relocation: 10th Cusp Sub-Lord to 3, 5, 9)"
  },
  job_loss_demotion: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_CAREER_NEG_005",
    kpSignificatorHouses: [5, 9, 8, 12],
    provenance: "KP Reader IV (Relinquishment / Termination: 10th Cusp Sub-Lord to 5th or 9th house)"
  },
  business_start: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_BUSINESS_004",
    kpSignificatorHouses: [3, 7, 10, 11],
    provenance: "KP Reader IV (Independent Commercial Venture: 7th & 10th Cusp Sub-Lords to 3, 7, 10, 11)"
  },
  first_salary: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_SALARY_004",
    kpSignificatorHouses: [2, 6, 11],
    provenance: "KP Reader IV (First Remuneration Receipt: 2nd Cusp Sub-Lord to 6, 11)"
  },
  graduation_degree: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_GRADUATION_006",
    kpSignificatorHouses: [4, 9, 11],
    provenance: "KP Reader IV (Academic Conferment / Degree: 9th & 11th Cusp Sub-Lords to 4, 9, 11)"
  },
  college_admission: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_COLLEGE_006",
    kpSignificatorHouses: [4, 9, 11],
    provenance: "KP Reader IV (Higher Curriculum Matriculation: 4th & 9th Cusp Sub-Lords to 4, 9, 11)"
  },
  school_admission: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_SCHOOL_006",
    kpSignificatorHouses: [4, 11],
    provenance: "KP Reader IV (Primary Schooling Initiation: 4th Cusp Sub-Lord to 4, 11)"
  },
  competitive_exam: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_COMPETITIVE_EXAM_006",
    kpSignificatorHouses: [5, 6, 11],
    provenance: "KP Reader IV (Pratiyogita / Competitive Examination Victory: 6th Cusp Sub-Lord to 6, 11)"
  },
  foreign_travel: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_TRAVEL_007",
    kpSignificatorHouses: [3, 9, 12],
    provenance: "KP Reader IV (Transoceanic / Foreign Voyage: 12th & 9th Cusp Sub-Lords to 3, 9, 12)"
  },
  foreign_settlement: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_SETTLEMENT_007",
    kpSignificatorHouses: [3, 9, 12],
    provenance: "KP Reader IV (Expatriate Residence & Domicile: 4th, 9th, and 12th Cusp Sub-Lords)"
  },
  property_purchase: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_PROPERTY_008",
    kpSignificatorHouses: [4, 11, 12],
    provenance: "KP Reader IV (Real Estate Acquisition: 4th Cusp Sub-Lord signifying 4, 11, 12)"
  },
  house_construction: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_CONSTRUCTION_008",
    kpSignificatorHouses: [4, 11, 12],
    provenance: "KP Reader IV (Vastu Building Erection: 4th Cusp Sub-Lord to 4, 11, 12)"
  },
  major_illness: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_HEALTH_009",
    kpSignificatorHouses: [1, 6, 8, 12],
    provenance: "KP Reader IV (Roga Manifestation: 6th Cusp Sub-Lord to 1, 6, 8, 12)"
  },
  major_surgery: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_SURGERY_009",
    kpSignificatorHouses: [6, 8, 12],
    provenance: "KP Reader IV (Surgical Procedure / Bloodletting: 8th Cusp Sub-Lord with Mars to 6, 8, 12)"
  },
  hospitalization: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_HOSPITAL_009",
    kpSignificatorHouses: [6, 8, 12],
    provenance: "KP Reader IV (Institutional Medical Incarceration: 12th Cusp Sub-Lord to 6, 8, 12)"
  },
  financial_gain_windfall: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_FINANCE_010",
    kpSignificatorHouses: [2, 6, 11],
    provenance: "KP Reader IV (Sudden Financial Expansion: 2nd & 11th Cusp Sub-Lords to 2, 6, 11)"
  },
  inheritance_property: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_INHERITANCE_010",
    kpSignificatorHouses: [2, 8, 11],
    provenance: "KP Reader IV (Ancestral / Unearned Inheritance: 8th Cusp Sub-Lord to 2, 11)"
  },
  court_case_legal: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_LITIGATION_011",
    kpSignificatorHouses: [6, 8, 12],
    provenance: "KP Reader IV (Legal Dispute Inception: 6th Cusp Sub-Lord to 6, 8, 12)"
  },
  victory_legal_dispute: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_VICTORY_011",
    kpSignificatorHouses: [6, 11],
    provenance: "KP Reader IV (Favourable Adjudication / Victory over Adversaries: 6th Cusp Sub-Lord to 11)"
  },
  spiritual_initiation: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_DIKSHA_012",
    kpSignificatorHouses: [9, 12],
    provenance: "KP Reader IV (Spiritual Diksha: 9th Cusp Sub-Lord with Jupiter/Ketu to 9, 12)"
  },
  sibling_birth: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_SIBLING_013",
    kpSignificatorHouses: [2, 3, 11],
    parashariRuleId: "BPHS_BHRATRI_001",
    jaiminiRuleId: "JAM_BK_001",
    provenance: "KP Reader IV (Co-born Arrival: 3rd Cusp Sub-Lord to 2, 3, 11); BPHS Ch. 42 (3rd Lord / Mars); Jaimini 1.1 (Bhratrikaraka BK)"
  },
  sibling_death: {
    ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
    kpRuleId: "KP_RULE_SIBLING_MARAKA_013",
    kpSignificatorHouses: [4, 9, 10],
    provenance: "KP Reader IV (Maraka for Co-born: 3rd Cusp Sub-Lord to 4, 9, 10)"
  }
};

/**
 * Returns enriched event definition with explicit rule classification and classical provenance
 */
export function getEnrichedEventDefinition(id: string): BtrEventTypeDefinition {
  const base = BTR_EVENT_DEFINITIONS.find((d) => d.id === id) || {
    id,
    name: id,
    category: "OTHER" as BtrEventCategory,
    defaultSignificance: "medium" as BtrEventSignificance,
    primaryHouses: [1],
    secondaryHouses: [],
    naturalKarakas: ["Jupiter"],
    description: "Custom user event"
  };

  const specialized = SPECIALIZED_RULES_MAP[id];
  if (specialized) {
    return {
      ...base,
      ruleCategory: "SPECIALIZED_CLASSICAL_RULE",
      kpRuleId: specialized.kpRuleId,
      kpSignificatorHouses: specialized.kpSignificatorHouses || base.primaryHouses,
      parashariRuleId: specialized.parashariRuleId || "BPHS_BHAVA_KARAKA_GENERIC",
      jaiminiRuleId: specialized.jaiminiRuleId,
      provenance: specialized.provenance
    };
  }

  return {
    ...base,
    ruleCategory: "GENERIC_SUPPORTING_RULE",
    parashariRuleId: "BPHS_BHAVA_KARAKA_GENERIC",
    provenance: "Generic Vedic Bhava Karaka & House lordship mapping (Classical general rule)"
  };
}

export const BTR_EVENT_DEFINITIONS: BtrEventTypeDefinition[] = [
  // ===================== FAMILY / CHILDHOOD =====================
  {
    id: "sibling_birth",
    name: "Birth of sibling",
    category: "FAMILY_CHILDHOOD",
    defaultSignificance: "high",
    primaryHouses: [3, 11],
    secondaryHouses: [2],
    naturalKarakas: ["Mars", "Jupiter"],
    jaiminiKarakaRole: "BK",
    relevantVarga: "D3",
    description: "3rd house governs younger siblings; 11th house elder siblings. Mars is natural Bhratrikaraka."
  },
  {
    id: "sibling_death",
    name: "Death of sibling",
    category: "FAMILY_CHILDHOOD",
    defaultSignificance: "high",
    primaryHouses: [3, 8, 12],
    secondaryHouses: [7],
    naturalKarakas: ["Mars", "Saturn"],
    jaiminiKarakaRole: "BK",
    relevantVarga: "D3",
    description: "Maraka houses for 3rd house (7th from 3rd = 9th, 2nd from 3rd = 4th, 8th from 3rd = 10th)."
  },
  {
    id: "parent_major_illness",
    name: "Parent's major illness",
    category: "FAMILY_CHILDHOOD",
    defaultSignificance: "high",
    primaryHouses: [9, 4, 6],
    secondaryHouses: [8, 12],
    naturalKarakas: ["Sun", "Moon", "Saturn"],
    jaiminiKarakaRole: "MK",
    relevantVarga: "D12",
    description: "Father (9th) or Mother (4th) undergoing severe roga/affliction via 6th/8th houses."
  },
  {
    id: "parent_career_change",
    name: "Parent's major career change",
    category: "FAMILY_CHILDHOOD",
    defaultSignificance: "medium",
    primaryHouses: [9, 6, 10],
    secondaryHouses: [4],
    naturalKarakas: ["Sun", "Jupiter"],
    description: "10th from 9th (6th house) indicates paternal profession shifts."
  },
  {
    id: "parent_financial_change",
    name: "Parent's major financial change",
    category: "FAMILY_CHILDHOOD",
    defaultSignificance: "medium",
    primaryHouses: [9, 10, 2],
    secondaryHouses: [4, 5],
    naturalKarakas: ["Jupiter", "Mercury"],
    description: "Wealth of parents reflected through 2nd from 9th (10th house) and 2nd from 4th (5th house)."
  },
  {
    id: "parents_separation",
    name: "Parents' separation / divorce",
    category: "FAMILY_CHILDHOOD",
    defaultSignificance: "high",
    primaryHouses: [9, 4, 12],
    secondaryHouses: [3, 8],
    naturalKarakas: ["Sun", "Moon", "Rahu", "Saturn"],
    jaiminiKarakaRole: "MK",
    relevantVarga: "D12",
    description: "Rift between 9th (father) and 4th (mother), often triggered by Rahu/Ketu or Saturn transits."
  },
  {
    id: "family_relocation",
    name: "Family relocation",
    category: "FAMILY_CHILDHOOD",
    defaultSignificance: "high",
    primaryHouses: [4, 3, 9],
    secondaryHouses: [12],
    naturalKarakas: ["Moon", "Mars"],
    relevantVarga: "D4",
    description: "Disturbance to 4th house (residence) accompanied by 3rd (short displacement) or 9th/12th (far)."
  },
  {
    id: "death_of_parent",
    name: "Death of parent",
    category: "FAMILY_CHILDHOOD",
    defaultSignificance: "high",
    primaryHouses: [9, 4, 8],
    secondaryHouses: [3, 10, 12],
    naturalKarakas: ["Sun", "Moon", "Saturn"],
    jaiminiKarakaRole: "MK",
    relevantVarga: "D12",
    description: "High-value milestone: Maraka and Dusthana activation for parental Bhavas (4th for mother, 9th for father)."
  },
  {
    id: "death_of_grandparent",
    name: "Death of grandparent",
    category: "FAMILY_CHILDHOOD",
    defaultSignificance: "medium",
    primaryHouses: [9, 5, 7],
    secondaryHouses: [8],
    naturalKarakas: ["Jupiter", "Saturn"],
    relevantVarga: "D12",
    description: "Paternal grandfather (9th from 9th = 5th house); maternal grandfather (9th from 4th = 12th house)."
  },
  {
    id: "childhood_adoption",
    name: "Adoption",
    category: "FAMILY_CHILDHOOD",
    defaultSignificance: "high",
    primaryHouses: [4, 9, 8],
    secondaryHouses: [5, 12],
    naturalKarakas: ["Jupiter", "Mercury"],
    description: "Karmic parentage transfer involving 4th, 9th, and 8th/12th houses."
  },
  {
    id: "other_family_event",
    name: "Other family event",
    category: "FAMILY_CHILDHOOD",
    defaultSignificance: "medium",
    primaryHouses: [2, 4],
    secondaryHouses: [9, 11],
    naturalKarakas: ["Jupiter", "Moon"],
    description: "General domestic and lineage milestone."
  },

  // ===================== EDUCATION =====================
  {
    id: "school_admission",
    name: "School admission",
    category: "EDUCATION",
    defaultSignificance: "medium",
    primaryHouses: [4, 5],
    secondaryHouses: [2],
    naturalKarakas: ["Mercury"],
    jaiminiKarakaRole: "MK",
    description: "Primary foundational learning governed by 4th and 2nd houses."
  },
  {
    id: "school_change",
    name: "School change",
    category: "EDUCATION",
    defaultSignificance: "medium",
    primaryHouses: [4, 3, 5],
    secondaryHouses: [9],
    naturalKarakas: ["Mercury", "Moon"],
    description: "Displacement of school environment (3rd house with 4th)."
  },
  {
    id: "major_academic_achievement",
    name: "Major academic achievement",
    category: "EDUCATION",
    defaultSignificance: "medium",
    primaryHouses: [5, 4, 11],
    secondaryHouses: [9, 1],
    naturalKarakas: ["Mercury", "Jupiter"],
    jaiminiKarakaRole: "PK",
    description: "5th house represents buddhi/intellect; 11th denotes labha/distinction."
  },
  {
    id: "major_academic_failure",
    name: "Major academic failure / setback",
    category: "EDUCATION",
    defaultSignificance: "medium",
    primaryHouses: [5, 6, 8],
    secondaryHouses: [12],
    naturalKarakas: ["Rahu", "Saturn"],
    jaiminiKarakaRole: "GK",
    description: "Setbacks to intellectual progress caused by 6th/8th afflictions to 5th house."
  },
  {
    id: "graduation_degree",
    name: "Graduation / Degree completion",
    category: "EDUCATION",
    defaultSignificance: "high",
    primaryHouses: [4, 9, 11],
    secondaryHouses: [5, 10],
    naturalKarakas: ["Jupiter", "Mercury", "Sun"],
    jaiminiKarakaRole: "MK",
    description: "Higher university qualification (9th house) culminating in official award (11th)."
  },
  {
    id: "college_admission",
    name: "College admission",
    category: "EDUCATION",
    defaultSignificance: "medium",
    primaryHouses: [4, 9],
    secondaryHouses: [5, 3],
    naturalKarakas: ["Jupiter", "Mercury"],
    description: "Commencement of higher formal curriculum."
  },
  {
    id: "competitive_exam",
    name: "Competitive examination",
    category: "EDUCATION",
    defaultSignificance: "high",
    primaryHouses: [5, 6, 11],
    secondaryHouses: [10],
    naturalKarakas: ["Mars", "Sun", "Mercury"],
    description: "6th house represents competition/pratiyogita; 11th gives victory."
  },
  {
    id: "education_interruption",
    name: "Major educational interruption",
    category: "EDUCATION",
    defaultSignificance: "medium",
    primaryHouses: [4, 8, 12],
    secondaryHouses: [6],
    naturalKarakas: ["Rahu", "Saturn"],
    description: "8th/12th house break in formal schooling."
  },
  {
    id: "scholarship_award",
    name: "Scholarship / Academic award",
    category: "EDUCATION",
    defaultSignificance: "medium",
    primaryHouses: [5, 11, 2],
    secondaryHouses: [9],
    naturalKarakas: ["Jupiter", "Mercury"],
    description: "Financial grant for scholastic excellence."
  },

  // ===================== CAREER =====================
  {
    id: "internship",
    name: "Internship",
    category: "CAREER",
    defaultSignificance: "medium",
    primaryHouses: [10, 6],
    secondaryHouses: [5, 11],
    naturalKarakas: ["Mercury", "Saturn"],
    relevantVarga: "D10",
    description: "Apprenticeship and preliminary vocational experience."
  },
  {
    id: "first_job",
    name: "First job / Career start",
    category: "CAREER",
    defaultSignificance: "high",
    primaryHouses: [10, 6, 2],
    secondaryHouses: [11, 1],
    naturalKarakas: ["Sun", "Saturn", "Mercury"],
    jaiminiKarakaRole: "AmK",
    relevantVarga: "D10",
    description: "Crucial anchor milestone: 10th (status), 6th (service), 2nd (wealth) activation."
  },
  {
    id: "first_salary",
    name: "First salary / Independent income",
    category: "CAREER",
    defaultSignificance: "medium",
    primaryHouses: [2, 11],
    secondaryHouses: [10, 6],
    naturalKarakas: ["Venus", "Mercury"],
    description: "Initial realization of earned monetary inflow."
  },
  {
    id: "job_change",
    name: "Job change",
    category: "CAREER",
    defaultSignificance: "medium",
    primaryHouses: [10, 6, 3],
    secondaryHouses: [5, 9, 11],
    naturalKarakas: ["Mercury", "Saturn"],
    jaiminiKarakaRole: "AmK",
    relevantVarga: "D10",
    description: "Transition in employment: 5th (resignation from 6th) followed by 6th/10th."
  },
  {
    id: "promotion",
    name: "Promotion / Title upgrade",
    category: "CAREER",
    defaultSignificance: "medium",
    primaryHouses: [10, 11, 1],
    secondaryHouses: [2, 6],
    naturalKarakas: ["Sun", "Jupiter"],
    jaiminiKarakaRole: "AmK",
    relevantVarga: "D10",
    description: "Ascent in hierarchy and remuneration."
  },
  {
    id: "demotion_job_loss",
    name: "Demotion / Job loss",
    category: "CAREER",
    defaultSignificance: "high",
    primaryHouses: [10, 8, 12],
    secondaryHouses: [5],
    naturalKarakas: ["Saturn", "Rahu"],
    jaiminiKarakaRole: "GK",
    relevantVarga: "D10",
    description: "5th (negation of 6th) and 8th/12th causing abrupt vocational interruption."
  },
  {
    id: "business_start",
    name: "Business start / Enterprise launch",
    category: "CAREER",
    defaultSignificance: "high",
    primaryHouses: [7, 10, 3],
    secondaryHouses: [11, 2],
    naturalKarakas: ["Mercury", "Mars", "Sun"],
    jaiminiKarakaRole: "AmK",
    relevantVarga: "D10",
    description: "7th house governs independent commerce and partnership; 3rd denotes initiative."
  },
  {
    id: "business_failure",
    name: "Business failure / Closure",
    category: "CAREER",
    defaultSignificance: "high",
    primaryHouses: [7, 12, 8],
    secondaryHouses: [6],
    naturalKarakas: ["Saturn", "Rahu"],
    relevantVarga: "D10",
    description: "12th (loss) and 8th (bankruptcy) afflicting commercial 7th house."
  },
  {
    id: "major_professional_achievement",
    name: "Major professional achievement",
    category: "CAREER",
    defaultSignificance: "high",
    primaryHouses: [10, 11, 1],
    secondaryHouses: [9],
    naturalKarakas: ["Sun", "Jupiter"],
    jaiminiKarakaRole: "AmK",
    relevantVarga: "D10",
    description: "Apex prestige and recognition in one's field."
  },
  {
    id: "retirement",
    name: "Retirement",
    category: "CAREER",
    defaultSignificance: "high",
    primaryHouses: [10, 12, 5],
    secondaryHouses: [9],
    naturalKarakas: ["Saturn", "Ketu"],
    description: "Cessation of formal employment, entering 12th/9th contemplative phase."
  },

  // ===================== RELATIONSHIPS =====================
  {
    id: "first_relationship",
    name: "First serious relationship",
    category: "RELATIONSHIPS",
    defaultSignificance: "medium",
    primaryHouses: [5, 7],
    secondaryHouses: [11],
    naturalKarakas: ["Venus", "Mars"],
    jaiminiKarakaRole: "DK",
    relevantVarga: "D9",
    description: "5th (romance) and 7th (partnership) resonance."
  },
  {
    id: "engagement",
    name: "Engagement / Formal commitment",
    category: "RELATIONSHIPS",
    defaultSignificance: "high",
    primaryHouses: [7, 2, 11],
    secondaryHouses: [5],
    naturalKarakas: ["Venus", "Jupiter"],
    jaiminiKarakaRole: "DK",
    relevantVarga: "D9",
    description: "Pledge of alliance involving 2nd (kutumba), 7th (spouse), 11th (wishes)."
  },
  {
    id: "marriage",
    name: "Marriage",
    category: "RELATIONSHIPS",
    defaultSignificance: "high",
    primaryHouses: [7, 2, 11],
    secondaryHouses: [1, 9],
    naturalKarakas: ["Venus", "Jupiter"],
    jaiminiKarakaRole: "DK",
    relevantVarga: "D9",
    description: "High-weight anchor: 7th (spouse), 2nd (family expansion), 11th (union), D9 Navamsha Lagna alignment."
  },
  {
    id: "marital_separation",
    name: "Separation",
    category: "RELATIONSHIPS",
    defaultSignificance: "high",
    primaryHouses: [7, 6, 12],
    secondaryHouses: [8],
    naturalKarakas: ["Rahu", "Saturn", "Mars"],
    jaiminiKarakaRole: "GK",
    relevantVarga: "D9",
    description: "6th (12th from 7th = negation of marriage) and 12th house activation."
  },
  {
    id: "divorce",
    name: "Divorce",
    category: "RELATIONSHIPS",
    defaultSignificance: "high",
    primaryHouses: [7, 6, 8],
    secondaryHouses: [12],
    naturalKarakas: ["Saturn", "Rahu", "Mars"],
    jaiminiKarakaRole: "GK",
    relevantVarga: "D9",
    description: "Formal legal dissolution of union."
  },
  {
    id: "major_breakup",
    name: "Major breakup",
    category: "RELATIONSHIPS",
    defaultSignificance: "medium",
    primaryHouses: [5, 12, 8],
    secondaryHouses: [6],
    naturalKarakas: ["Mars", "Ketu"],
    description: "Emotional severance of love connection."
  },
  {
    id: "second_marriage",
    name: "Second marriage",
    category: "RELATIONSHIPS",
    defaultSignificance: "high",
    primaryHouses: [9, 2, 11],
    secondaryHouses: [7],
    naturalKarakas: ["Venus", "Jupiter"],
    jaiminiKarakaRole: "DK",
    relevantVarga: "D9",
    description: "9th house governs 2nd spouse (3rd from 7th = younger sibling of first wife/partner)."
  },

  // ===================== CHILDREN =====================
  {
    id: "pregnancy",
    name: "Pregnancy / Expecting child",
    category: "CHILDREN",
    defaultSignificance: "medium",
    primaryHouses: [5, 2, 11],
    secondaryHouses: [9],
    naturalKarakas: ["Jupiter", "Moon"],
    jaiminiKarakaRole: "PK",
    relevantVarga: "D7",
    description: "Fertility and conception window."
  },
  {
    id: "childbirth",
    name: "Childbirth",
    category: "CHILDREN",
    defaultSignificance: "high",
    primaryHouses: [5, 2, 11],
    secondaryHouses: [1],
    naturalKarakas: ["Jupiter", "Moon"],
    jaiminiKarakaRole: "PK",
    relevantVarga: "D7",
    description: "High-value milestone: 5th (progeny), 2nd (family addition), 11th (fulfillment of desire)."
  },
  {
    id: "child_adoption",
    name: "Adoption of child",
    category: "CHILDREN",
    defaultSignificance: "high",
    primaryHouses: [5, 9, 8],
    secondaryHouses: [12],
    naturalKarakas: ["Jupiter", "Mercury", "Saturn"],
    jaiminiKarakaRole: "PK",
    relevantVarga: "D7",
    description: "5th and 8th/9th non-biological santana reception."
  },
  {
    id: "miscarriage_loss",
    name: "Miscarriage / Child loss",
    category: "CHILDREN",
    defaultSignificance: "high",
    primaryHouses: [5, 8, 12],
    secondaryHouses: [4],
    naturalKarakas: ["Mars", "Rahu", "Ketu"],
    jaiminiKarakaRole: "GK",
    relevantVarga: "D7",
    description: "Affliction to 5th house and Saptamsha."
  },
  {
    id: "major_child_event",
    name: "Major child-related event",
    category: "CHILDREN",
    defaultSignificance: "medium",
    primaryHouses: [5, 11],
    secondaryHouses: [9],
    naturalKarakas: ["Jupiter"],
    description: "Significant development or victory regarding children."
  },

  // ===================== RESIDENCE / TRAVEL =====================
  {
    id: "major_relocation",
    name: "Major relocation",
    category: "RESIDENCE_TRAVEL",
    defaultSignificance: "high",
    primaryHouses: [4, 3, 9],
    secondaryHouses: [12],
    naturalKarakas: ["Moon", "Mars"],
    relevantVarga: "D4",
    description: "Change of habitat: 3rd (leaving old house) and 4th (new residence)."
  },
  {
    id: "city_change",
    name: "City change",
    category: "RESIDENCE_TRAVEL",
    defaultSignificance: "medium",
    primaryHouses: [3, 4],
    secondaryHouses: [9],
    naturalKarakas: ["Moon"],
    relevantVarga: "D4",
    description: "Domestic inter-city movement."
  },
  {
    id: "country_change",
    name: "Country change",
    category: "RESIDENCE_TRAVEL",
    defaultSignificance: "high",
    primaryHouses: [9, 12, 4],
    secondaryHouses: [3],
    naturalKarakas: ["Rahu", "Moon", "Saturn"],
    description: "Crossing national borders: 9th (distant journey), 12th (foreign shores)."
  },
  {
    id: "foreign_travel",
    name: "Foreign travel",
    category: "RESIDENCE_TRAVEL",
    defaultSignificance: "medium",
    primaryHouses: [9, 12, 3],
    secondaryHouses: [7],
    naturalKarakas: ["Moon", "Rahu"],
    description: "Temporary overseas sojourn."
  },
  {
    id: "foreign_settlement",
    name: "Foreign settlement / Permanent migration",
    category: "RESIDENCE_TRAVEL",
    defaultSignificance: "high",
    primaryHouses: [12, 9, 4],
    secondaryHouses: [7, 3],
    naturalKarakas: ["Rahu", "Saturn", "Moon"],
    description: "Permanent establishment in foreign land: 4th (homeland) afflicted/connected to 12th."
  },
  {
    id: "property_purchase",
    name: "Property purchase / Land acquisition",
    category: "RESIDENCE_TRAVEL",
    defaultSignificance: "high",
    primaryHouses: [4, 11, 2],
    secondaryHouses: [12],
    naturalKarakas: ["Mars", "Venus", "Moon"],
    relevantVarga: "D4",
    description: "High-value milestone: 4th (real estate), 11th (acquisition), Mars (bhoomi karaka)."
  },
  {
    id: "property_sale",
    name: "Property sale",
    category: "RESIDENCE_TRAVEL",
    defaultSignificance: "medium",
    primaryHouses: [4, 3, 2],
    secondaryHouses: [11],
    naturalKarakas: ["Mercury", "Mars"],
    description: "Liquidation of immovable asset (3rd is 12th from 4th)."
  },
  {
    id: "house_construction",
    name: "House construction",
    category: "RESIDENCE_TRAVEL",
    defaultSignificance: "high",
    primaryHouses: [4, 6, 11],
    secondaryHouses: [2],
    naturalKarakas: ["Mars", "Saturn"],
    relevantVarga: "D4",
    description: "Building physical structure: Mars and Saturn governing masonry and foundations."
  },

  // ===================== HEALTH =====================
  {
    id: "major_illness",
    name: "Major illness",
    category: "HEALTH",
    defaultSignificance: "high",
    primaryHouses: [6, 8, 1],
    secondaryHouses: [12],
    naturalKarakas: ["Saturn", "Mars", "Rahu"],
    jaiminiKarakaRole: "GK",
    description: "6th (disease), 8th (chronic affliction), 1st (vitality / tanu bhava)."
  },
  {
    id: "hospitalization",
    name: "Hospitalization",
    category: "HEALTH",
    defaultSignificance: "high",
    primaryHouses: [12, 6, 8],
    secondaryHouses: [1],
    naturalKarakas: ["Rahu", "Saturn", "Mars"],
    jaiminiKarakaRole: "GK",
    description: "12th house specifically governs hospitals, confinement, and medical isolation."
  },
  {
    id: "surgery",
    name: "Surgery",
    category: "HEALTH",
    defaultSignificance: "high",
    primaryHouses: [8, 6, 12],
    secondaryHouses: [1],
    naturalKarakas: ["Mars", "Ketu"],
    jaiminiKarakaRole: "GK",
    description: "Mars and Ketu represent surgical blades and invasive incisions into 8th/6th organs."
  },
  {
    id: "accident",
    name: "Accident / Trauma",
    category: "HEALTH",
    defaultSignificance: "high",
    primaryHouses: [8, 1, 6],
    secondaryHouses: [3],
    naturalKarakas: ["Mars", "Rahu"],
    jaiminiKarakaRole: "GK",
    description: "Sudden unexpected impact involving 8th house and Mars/Rahu."
  },
  {
    id: "fracture",
    name: "Fracture / Bone injury",
    category: "HEALTH",
    defaultSignificance: "high",
    primaryHouses: [8, 6],
    secondaryHouses: [1],
    naturalKarakas: ["Sun", "Mars", "Saturn"],
    description: "Sun rules skeletal framework; Mars causes breakage."
  },
  {
    id: "major_diagnosis",
    name: "Major diagnosis",
    category: "HEALTH",
    defaultSignificance: "medium",
    primaryHouses: [6, 8],
    secondaryHouses: [1],
    naturalKarakas: ["Mercury", "Rahu"],
    description: "Identification of chronic condition."
  },
  {
    id: "major_recovery",
    name: "Major recovery / Remission",
    category: "HEALTH",
    defaultSignificance: "medium",
    primaryHouses: [1, 5, 11],
    secondaryHouses: [9],
    naturalKarakas: ["Sun", "Jupiter"],
    description: "Rejuvenation of vitality (1st, 5th is 12th from 6th, 11th recovery)."
  },

  // ===================== FINANCE =====================
  {
    id: "major_financial_gain",
    name: "Major financial gain",
    category: "FINANCE",
    defaultSignificance: "high",
    primaryHouses: [11, 2, 5],
    secondaryHouses: [9],
    naturalKarakas: ["Jupiter", "Venus", "Mercury"],
    description: "Dhana and Labha yoga activation (2nd and 11th houses)."
  },
  {
    id: "major_financial_loss",
    name: "Major financial loss",
    category: "FINANCE",
    defaultSignificance: "high",
    primaryHouses: [12, 8, 2],
    secondaryHouses: [6],
    naturalKarakas: ["Rahu", "Saturn"],
    description: "12th (drainage) and 8th (crisis) afflicting wealth."
  },
  {
    id: "large_investment",
    name: "Large investment",
    category: "FINANCE",
    defaultSignificance: "medium",
    primaryHouses: [5, 9, 11],
    secondaryHouses: [2],
    naturalKarakas: ["Jupiter", "Mercury"],
    description: "Speculative venture or capital deployment."
  },
  {
    id: "major_debt",
    name: "Major debt / Borrowing",
    category: "FINANCE",
    defaultSignificance: "medium",
    primaryHouses: [6, 8, 12],
    secondaryHouses: [2],
    naturalKarakas: ["Saturn", "Mars"],
    description: "6th house governs rina (debt) and obligations."
  },
  {
    id: "bankruptcy",
    name: "Bankruptcy",
    category: "FINANCE",
    defaultSignificance: "high",
    primaryHouses: [8, 12, 6],
    secondaryHouses: [2],
    naturalKarakas: ["Saturn", "Rahu"],
    description: "Severe financial insolvency."
  },
  {
    id: "major_inheritance",
    name: "Major inheritance",
    category: "FINANCE",
    defaultSignificance: "high",
    primaryHouses: [8, 2, 9],
    secondaryHouses: [11],
    naturalKarakas: ["Saturn", "Jupiter"],
    description: "8th house governs unearned wealth, legacy, and ancestral estates."
  },
  {
    id: "major_business_transaction",
    name: "Major business transaction",
    category: "FINANCE",
    defaultSignificance: "medium",
    primaryHouses: [7, 10, 11],
    secondaryHouses: [2],
    naturalKarakas: ["Mercury", "Jupiter"],
    description: "Significant enterprise contract or commercial milestone."
  },

  // ===================== LEGAL / SOCIAL =====================
  {
    id: "court_case",
    name: "Court case / Legal dispute",
    category: "LEGAL_SOCIAL",
    defaultSignificance: "high",
    primaryHouses: [6, 8, 7],
    secondaryHouses: [12],
    naturalKarakas: ["Mars", "Saturn", "Rahu"],
    jaiminiKarakaRole: "GK",
    description: "6th (litigation), 7th (opponent), 8th (vulnerability)."
  },
  {
    id: "legal_victory",
    name: "Legal victory / Settlement",
    category: "LEGAL_SOCIAL",
    defaultSignificance: "high",
    primaryHouses: [6, 11, 1],
    secondaryHouses: [9],
    naturalKarakas: ["Jupiter", "Mars"],
    description: "Shatru-vijaya via 6th and 11th fulfillment."
  },
  {
    id: "major_public_recognition",
    name: "Major public recognition / Award",
    category: "LEGAL_SOCIAL",
    defaultSignificance: "high",
    primaryHouses: [10, 11, 1],
    secondaryHouses: [9],
    naturalKarakas: ["Sun", "Jupiter"],
    description: "State or communal acclaim and honors."
  },
  {
    id: "major_controversy",
    name: "Major controversy / Public scandal",
    category: "LEGAL_SOCIAL",
    defaultSignificance: "high",
    primaryHouses: [8, 10, 12],
    secondaryHouses: [6],
    naturalKarakas: ["Rahu", "Saturn"],
    jaiminiKarakaRole: "GK",
    description: "Damage to prestige (10th) from 8th/12th scandals."
  },

  // ===================== SPIRITUAL / TRANSFORMATION =====================
  {
    id: "spiritual_experience",
    name: "Major spiritual experience",
    category: "SPIRITUAL_TRANSFORMATION",
    defaultSignificance: "medium",
    primaryHouses: [9, 12, 5],
    secondaryHouses: [8],
    naturalKarakas: ["Jupiter", "Ketu"],
    jaiminiKarakaRole: "AK",
    description: "Transcendental breakthrough or darshana."
  },
  {
    id: "spiritual_initiation",
    name: "Initiation / Diksha",
    category: "SPIRITUAL_TRANSFORMATION",
    defaultSignificance: "high",
    primaryHouses: [9, 5, 8],
    secondaryHouses: [12],
    naturalKarakas: ["Jupiter", "Ketu", "Sun"],
    jaiminiKarakaRole: "AK",
    description: "Guru acceptance and sacred mantra transmission (9th and 5th houses)."
  },
  {
    id: "major_pilgrimage",
    name: "Major pilgrimage / Tirtha yatra",
    category: "SPIRITUAL_TRANSFORMATION",
    defaultSignificance: "medium",
    primaryHouses: [9, 12],
    secondaryHouses: [3],
    naturalKarakas: ["Jupiter", "Moon"],
    description: "Travel to sacred rivers and shrines."
  },
  {
    id: "life_transformation",
    name: "Major life transformation",
    category: "SPIRITUAL_TRANSFORMATION",
    defaultSignificance: "high",
    primaryHouses: [8, 1, 9],
    secondaryHouses: [12],
    naturalKarakas: ["Ketu", "Saturn"],
    jaiminiKarakaRole: "AK",
    description: "Fundamental rebirth of values and lifestyle."
  },

  // ===================== OTHER =====================
  {
    id: "custom_event",
    name: "Custom significant event",
    category: "OTHER",
    defaultSignificance: "medium",
    primaryHouses: [1, 10],
    secondaryHouses: [11],
    naturalKarakas: ["Jupiter"],
    description: "User-specified custom milestone."
  }
];

/**
 * Returns prioritized categories based on user's current age.
 */
export function getPrioritizedCategoriesForAge(ageYears: number): {
  prioritizedCategories: BtrEventCategory[];
  guidanceText: string;
  isMinor: boolean;
  isYoungAdult: boolean;
} {
  if (ageYears < 18) {
    return {
      prioritizedCategories: [
        "FAMILY_CHILDHOOD",
        "EDUCATION",
        "HEALTH",
        "RESIDENCE_TRAVEL",
        "OTHER"
      ],
      guidanceText:
        "For children and teenagers, BTR focuses on schooling milestones, sibling births, family relocations, parental events, and health memories. Marriage, career, or children are not needed.",
      isMinor: true,
      isYoungAdult: false
    };
  }

  if (ageYears <= 25) {
    return {
      prioritizedCategories: [
        "EDUCATION",
        "CAREER",
        "FAMILY_CHILDHOOD",
        "RELATIONSHIPS",
        "RESIDENCE_TRAVEL",
        "HEALTH",
        "OTHER"
      ],
      guidanceText:
        "For young adults, BTR prioritizes college admissions, graduations, first jobs/internships, family relocations, and early relationships.",
      isMinor: false,
      isYoungAdult: true
    };
  }

  return {
    prioritizedCategories: [
      "CAREER",
      "RELATIONSHIPS",
      "CHILDREN",
      "RESIDENCE_TRAVEL",
      "HEALTH",
      "FINANCE",
      "FAMILY_CHILDHOOD",
      "EDUCATION",
      "LEGAL_SOCIAL",
      "SPIRITUAL_TRANSFORMATION",
      "OTHER"
    ],
    guidanceText:
      "Full life event library available. Select your most accurately dated career milestones, marriage/relationships, children, property, or health events.",
    isMinor: false,
    isYoungAdult: false
  };
}
