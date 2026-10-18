// src/data/numerologyDestinyNumber.ts
// Chapter Nine: Indian Destiny Number (Direct Sum Method) vs Life Path (Three-Part Method)
// Dedicated reference and calculation engine for Destiny Number without case study examples.

export interface DestinyNumberAnalysis {
  number: number;
  title: string;
  terrainType: string;
  outerCircumstances: string;
  careerTerrain: string;
  relationshipTerrain: string;
  keyChallenge: string;
  lifePathAlignmentNote: string;
  practicalGuidance: string[];
}

export interface DestinyLifePathComparison {
  dob: string;
  destinyNumber: number;
  destinyCompound: number;
  lifePathNumber: number;
  lifePathCompound: number;
  alignmentType: "Harmonious Alignment" | "Dynamic Productive Tension";
  interpretation: string;
}

export const DESTINY_NUMBERS_DATABASE: Record<number, DestinyNumberAnalysis> = {
  1: {
    number: 1,
    title: "The Pioneer's Terrain",
    terrainType: "Independent, Competitive & Pioneering Circumstances",
    outerCircumstances: "Outer life consistently creates situations where you must rely on your own initiative, stand alone, and make independent decisions without external backup.",
    careerTerrain: "Circumstances push you into leadership roles, pioneering new projects, or starting independent ventures where self-reliance is mandatory.",
    relationshipTerrain: "Attracts environments where you are called to set boundaries, maintain personal autonomy, and avoid over-dependence on partners.",
    keyChallenge: "Overcoming fear of standing alone and resisting the temptation to blame external authority.",
    lifePathAlignmentNote: "If Life Path is also 1, your inner soul drive and outer circumstances align perfectly in pioneering independent leadership. If Life Path differs, your soul must learn to navigate competitive independent terrain.",
    practicalGuidance: [
      "Take immediate personal initiative when outer obstacles appear.",
      "Develop confidence in making solitary decisions.",
      "Avoid waiting for external permission or group consensus."
    ]
  },
  2: {
    number: 2,
    title: "The Diplomat's Terrain",
    terrainType: "Cooperative, Relational & Mediating Circumstances",
    outerCircumstances: "Outer life consistently places you in situations requiring diplomacy, conflict resolution, partnership building, and emotional sensitivity.",
    careerTerrain: "Work environments frequently require team mediation, customer care, human diplomacy, or working closely as a trusted co-leader.",
    relationshipTerrain: "Circumstances consistently bring key partnerships, emotional sensitivity tests, and opportunities to master peaceful cooperation.",
    keyChallenge: "Avoiding codependency and protecting personal boundaries in high-friction emotional environments.",
    lifePathAlignmentNote: "If Life Path is 2, inner soul sensitivity matches outer relational circumstances. If Life Path is fiery (e.g. 1 or 8), outer circumstances force patience and diplomatic finesse.",
    practicalGuidance: [
      "Master the art of gentle negotiation and listening.",
      "Maintain clear emotional boundaries in group settings.",
      "Value cooperation over aggressive solo confrontation."
    ]
  },
  3: {
    number: 3,
    title: "The Expressive Terrain",
    terrainType: "Creative, Social & Communicative Circumstances",
    outerCircumstances: "Outer life continuously presents opportunities for public speaking, writing, artistic creation, social networking, and uplifting others.",
    careerTerrain: "Circumstances open doors in media, journalism, education, creative arts, sales, and public relations.",
    relationshipTerrain: "Brings lively, communicative, and socially active relationship environments where emotional expression is central.",
    keyChallenge: "Avoiding scattered focus, superficial charm, or leaving projects half-finished.",
    lifePathAlignmentNote: "Aligns soul desire with joyful social expression. When Life Path is structured (e.g. 4), creative expression must be channeled through disciplined work.",
    practicalGuidance: [
      "Channel creative ideas into finished tangible projects.",
      "Use your voice and writing to inspire and educate.",
      "Maintain focus rather than scattering energy across too many ideas."
    ]
  },
  4: {
    number: 4,
    title: "The Builder's Terrain",
    terrainType: "Methodical, Disciplined & Structured Circumstances",
    outerCircumstances: "Outer life consistently demands step-by-step effort, practical discipline, attention to detail, and building stable long-term foundations.",
    careerTerrain: "Circumstances require structured organization, technical mastery, adherence to legal/financial standards, and patient work.",
    relationshipTerrain: "Brings circumstances where loyalty, practical caretaking, family duty, and long-term security are tested and built.",
    keyChallenge: "Resisting rigidity, impatience with slow progress, or frustration with heavy practical demands.",
    lifePathAlignmentNote: "Provides the necessary grounding discipline for any Life Path. For visionary Life Paths (e.g. 11, 22), Destiny 4 supplies the outer structure required to manifest dreams.",
    practicalGuidance: [
      "Embrace methodical routine as the gateway to lasting success.",
      "Maintain absolute integrity in financial and legal matters.",
      "Patience turns rigorous daily work into solid long-term security."
    ]
  },
  5: {
    number: 5,
    title: "The Adventurer's Terrain",
    terrainType: "Dynamic, Changing & Versatile Circumstances",
    outerCircumstances: "Outer life is characterized by rapid change, unexpected shifts, frequent travel, diverse opportunities, and tests of adaptability.",
    careerTerrain: "Circumstances thrive in fast-paced trade, marketing, technology platforms, media, foreign markets, and entrepreneurial ventures.",
    relationshipTerrain: "Brings dynamic, unconventional relationship circumstances requiring flexibility, open communication, and mutual freedom.",
    keyChallenge: "Avoiding impulsive restlessness, risk-seeking escapism, or abandoning commitments prematurely.",
    lifePathAlignmentNote: "If Life Path is also 5, life is a thrilling journey of freedom. If Life Path is stable (e.g. 4 or 6), outer changes test the inner capacity to stay grounded.",
    practicalGuidance: [
      "Develop rapid adaptability to unexpected circumstance shifts.",
      "Use change as an opportunity for learning and growth.",
      "Anchor freedom in chosen, meaningful commitments."
    ]
  },
  6: {
    number: 6,
    title: "The Guardian's Terrain",
    terrainType: "Nurturing, Family & Responsible Circumstances",
    outerCircumstances: "Outer life places heavy emphasis on home, family responsibilities, community caretaking, health, and creating aesthetic harmony.",
    careerTerrain: "Circumstances favor professions in healthcare, education, design, social service, hospitality, and family business management.",
    relationshipTerrain: "Consistently brings deep domestic commitments, caretaking roles, and opportunities to build a warm, supportive home.",
    keyChallenge: "Avoiding martyrdom, over-controlling loved ones, or neglecting personal wellbeing.",
    lifePathAlignmentNote: "If Life Path matches 6, soul purpose and family duty harmoniously coincide. If Life Path is independent (e.g. 1 or 7), domestic duties ground the soul.",
    practicalGuidance: [
      "Offer loving support while maintaining healthy energetic boundaries.",
      "Create beautiful, harmonious environments at work and home.",
      "Prioritize personal health alongside family duties."
    ]
  },
  7: {
    number: 7,
    title: "The Scholar's Terrain",
    terrainType: "Analytical, Contemplative & Solitary Circumstances",
    outerCircumstances: "Outer life frequently presents situations requiring deep reflection, technical research, spiritual investigation, and quiet study.",
    careerTerrain: "Circumstances lead toward specialized scientific research, IT, writing, academia, psychology, or spiritual teaching.",
    relationshipTerrain: "Requires relationship environments that respect privacy, intellectual depth, and periods of quiet solitude.",
    keyChallenge: "Avoiding cynical isolation, social withdrawal, or over-intellectualizing emotional experiences.",
    lifePathAlignmentNote: "Supplies analytical depth and spiritual perspective to any Life Path. Outer conditions encourage seeking truth beneath surface appearances.",
    practicalGuidance: [
      "Dedicate time to quiet study, research, and meditation.",
      "Trust intuitive insights alongside analytical facts.",
      "Share acquired wisdom generously with others."
    ]
  },
  8: {
    number: 8,
    title: "The Executive's Terrain",
    terrainType: "Material, Executive & Systemic Circumstances",
    outerCircumstances: "Outer life consistently involves financial management, business negotiations, organizational power dynamics, and material expansion.",
    careerTerrain: "Circumstances push you into corporate management, banking, law, real estate, or large enterprise operations.",
    relationshipTerrain: "Brings circumstances where financial security, mutual respect, and shared ambition are central themes.",
    keyChallenge: "Avoiding workaholism, misuse of authority, or measuring life solely by monetary status.",
    lifePathAlignmentNote: "If Life Path is 8, inner ambition and outer executive power align powerfully. If Life Path is gentle (e.g. 2 or 6), outer financial terrain demands strength.",
    practicalGuidance: [
      "Manage resources with absolute ethical integrity.",
      "Build efficient systems and delegate authority effectively.",
      "Use material power to create security and uplift others."
    ]
  },
  9: {
    number: 9,
    title: "The Humanitarian's Terrain",
    terrainType: "Universal, Humanitarian & Completion Circumstances",
    outerCircumstances: "Outer life brings broad social contacts, global perspectives, opportunities for humanitarian service, and frequent cycles of completion.",
    careerTerrain: "Circumstances open pathways in international development, NGOs, teaching, creative arts, healing, and public advocacy.",
    relationshipTerrain: "Brings relationships that test non-possessive love, forgiveness, and the capacity to release completed chapters with grace.",
    keyChallenge: "Overcoming difficulty with endings, emotional burnout, or disillusionment with human flaws.",
    lifePathAlignmentNote: "Broadens the horizon of any Life Path to universal human service. Teaches non-attachment and compassionate wisdom.",
    practicalGuidance: [
      "Serve humanitarian causes with selfless dedication.",
      "Release completed life chapters cleanly without bitterness.",
      "Practice universal compassion and open-minded acceptance."
    ]
  },
  11: {
    number: 11,
    title: "The Master Visionary's Terrain",
    terrainType: "Inspirational, Intuitive & High-Frequency Circumstances",
    outerCircumstances: "Outer life creates intense high-frequency situations that demand intuitive illumination, public inspiration, and spiritual leadership.",
    careerTerrain: "Circumstances thrust you into roles as an inspirational speaker, visionary mentor, creative author, or intuitive leader.",
    relationshipTerrain: "Attracts deep soul-level relationship encounters requiring emotional honesty and spiritual resonance.",
    keyChallenge: "Managing intense nervous tension, sensory overload, and self-doubt under high public expectations.",
    lifePathAlignmentNote: "Amplifies outer circumstances into a platform for spiritual illumination and visionary inspiration.",
    practicalGuidance: [
      "Ground high intuitive perceptions into practical daily steps.",
      "Nourish your nervous system with quiet nature reflection.",
      "Inspire others through authentic, humble leadership."
    ]
  },
  22: {
    number: 22,
    title: "The Master Builder's Terrain",
    terrainType: "Large-Scale Institutional & Infrastructure Circumstances",
    outerCircumstances: "Outer life presents massive structural responsibilities, systemic challenges, and opportunities to build global institutions.",
    careerTerrain: "Circumstances involve mega-infrastructure projects, technology platforms, global financial systems, or international foundations.",
    relationshipTerrain: "Demands rock-solid partnership reliability and shared dedication to large-scale legacy building.",
    keyChallenge: "Handling immense performance pressure without succumbing to crushing anxiety or overwork.",
    lifePathAlignmentNote: "Converts visionary ideals into permanent physical institutions and legacy achievements.",
    practicalGuidance: [
      "Combine far-reaching vision with rigorous step-by-step discipline.",
      "Build organizational teams to share project weight.",
      "Focus on structures that serve humanity for generations."
    ]
  },
  33: {
    number: 33,
    title: "The Master Healer's Terrain",
    terrainType: "Universal Healing, Mentorship & Selfless Service Circumstances",
    outerCircumstances: "Outer life places you in key positions of universal mentorship, spiritual education, community healing, and selfless service.",
    careerTerrain: "Circumstances favor leadership in global healing, spiritual academies, master artistic creation, and philanthropic movements.",
    relationshipTerrain: "Brings relationships where unconditional love, emotional refuge, and deep spiritual protection are tested.",
    keyChallenge: "Avoiding complete emotional depletion or martyrdom by establishing firm self-care boundaries.",
    lifePathAlignmentNote: "Elevates outer circumstances into a sacred sanctuary of universal compassion and master teaching.",
    practicalGuidance: [
      "Serve humanity from personal spiritual abundance, not depletion.",
      "Protect your emotional boundaries while offering comfort.",
      "Model joyful, healthy self-reverence alongside selfless service."
    ]
  }
};

/**
 * Calculates Indian Destiny Number using the Direct Continuous Sum method
 * Adds all individual digits of the birth date continuously (DDMMYYYY).
 * Example: 17 June 1979 -> 1+7 + 0+6 + 1+9+7+9 = 40 -> 4
 */
export function calculateDestinyNumber(dobString: string): {
  destinyNumber: number;
  compound: number;
  isMaster: boolean;
} {
  // Extract all digits from date string
  const digits = dobString.replace(/\D/g, "").split("").map(Number);
  const rawSum = digits.reduce((acc, curr) => acc + curr, 0);

  let reduce = rawSum;
  while (reduce > 9 && reduce !== 11 && reduce !== 22 && reduce !== 33) {
    reduce = reduce.toString().split("").map(Number).reduce((a, b) => a + b, 0);
  }

  return {
    destinyNumber: reduce,
    compound: rawSum,
    isMaster: reduce === 11 || reduce === 22 || reduce === 33
  };
}

/**
 * Calculates Western Life Path Number using the Three-Part Method
 * Reduces Day, Month, Year separately, then sums them.
 */
export function calculateLifePathNumber(dobString: string): {
  lifePathNumber: number;
  compound: number;
  isMaster: boolean;
} {
  const parts = dobString.split("-"); // Expected YYYY-MM-DD or DD-MM-YYYY
  let year = 1990, month = 1, day = 1;

  if (parts.length === 3) {
    if (parts[0].length === 4) {
      year = parseInt(parts[0]);
      month = parseInt(parts[1]);
      day = parseInt(parts[2]);
    } else {
      day = parseInt(parts[0]);
      month = parseInt(parts[1]);
      year = parseInt(parts[2]);
    }
  }

  const reducePart = (num: number): number => {
    let sum = num.toString().split("").map(Number).reduce((a, b) => a + b, 0);
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split("").map(Number).reduce((a, b) => a + b, 0);
    }
    return sum;
  };

  const redDay = reducePart(day);
  const redMonth = reducePart(month);
  const redYear = reducePart(year);

  const grandSum = redDay + redMonth + redYear;
  let finalLP = grandSum;
  while (finalLP > 9 && finalLP !== 11 && finalLP !== 22 && finalLP !== 33) {
    finalLP = finalLP.toString().split("").map(Number).reduce((a, b) => a + b, 0);
  }

  return {
    lifePathNumber: finalLP,
    compound: grandSum,
    isMaster: finalLP === 11 || finalLP === 22 || finalLP === 33
  };
}

/**
 * Compares Destiny Number (Outer Terrain) with Life Path Number (Inner Calling)
 */
export function analyzeDestinyVsLifePath(dobString: string): DestinyLifePathComparison {
  const destRes = calculateDestinyNumber(dobString);
  const lpRes = calculateLifePathNumber(dobString);

  const isAligned = destRes.destinyNumber === lpRes.lifePathNumber;

  let interpretation = "";
  if (isAligned) {
    interpretation = `Your Indian Destiny Number (${destRes.destinyNumber}) and Life Path Number (${lpRes.lifePathNumber}) are identical. This creates a state of Harmonious Structural Alignment: your inner soul calling and your outer life circumstances operate on the exact same frequency. Opportunities and terrain naturally match your inner purpose.`;
  } else {
    interpretation = `Your Indian Destiny Number (${destRes.destinyNumber}) and Life Path Number (${lpRes.lifePathNumber}) differ. This creates a Dynamic Productive Tension: your Life Path (${lpRes.lifePathNumber}) describes your inner soul direction ('what road you travel'), while your Destiny Number (${destRes.destinyNumber}) describes the outer terrain and circumstances ('what environment you navigate'). This tension expands your versatility and life wisdom.`;
  }

  return {
    dob: dobString,
    destinyNumber: destRes.destinyNumber,
    destinyCompound: destRes.compound,
    lifePathNumber: lpRes.lifePathNumber,
    lifePathCompound: lpRes.compound,
    alignmentType: isAligned ? "Harmonious Alignment" : "Dynamic Productive Tension",
    interpretation
  };
}

export function getDestinyNumberAnalysis(num: number): DestinyNumberAnalysis {
  return DESTINY_NUMBERS_DATABASE[num] || DESTINY_NUMBERS_DATABASE[1];
}
