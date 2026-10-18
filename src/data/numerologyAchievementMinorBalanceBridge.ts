// src/data/numerologyAchievementMinorBalanceBridge.ts
// Chapter Fifteen: Achievement Number, Minor Expression, Balance Number, and Bridge Numbers
// Comprehensive reference for Engagement Architecture, Daily Name Overlays, Crisis Equilibrium, and Core Integration Gaps.

export interface AchievementAnalysis {
  number: number;
  title: string;
  keywords: string[];
  domainOfContribution: string;
  legacyStyle: string;
  detailedParagraphs: string[];
}

export interface MinorExpressionAnalysis {
  title: string;
  description: string;
  relationshipToFullName: string;
}

export interface BalanceAnalysis {
  number: number;
  title: string;
  keywords: string[];
  crisisNavigationStyle: string;
  strengthsUnderPressure: string;
  growthEdge: string;
  detailedParagraphs: string[];
}

export interface BridgeAnalysis {
  bridgeValue: number; // 0 to 8
  title: string;
  coreQuality: string;
  bridgePractice: string;
  guidanceForPair: string;
}

export interface ChapterFifteenTheoryData {
  title: string;
  subtitle: string;
  quote: {
    text: string;
    author: string;
  };
  introParagraphs: string[];
  fourAspectsBreakdown: {
    achievementRole: string;
    minorExpressionRole: string;
    balanceRole: string;
    bridgeRole: string;
  };
}

export const CHAPTER_FIFTEEN_THEORY_DATA: ChapterFifteenTheoryData = {
  title: "Achievement Number, Minor Expression, Balance Number & Bridge Numbers",
  subtitle: "The Architecture of Engagement — Contribution, Daily Overlays, Crisis Equilibrium, and Integration Gaps",
  quote: {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  introParagraphs: [
    "The four calculations in this chapter address distinct and highly practical dimensions of a person's numerological profile that reveal how character is actually lived and expressed in daily texture.",
    "The Achievement Number reveals the domain of your most significant and enduring contribution, synthesized from your birth day gifts and full birth name Expression.",
    "The Minor Expression Number describes the daily vibrational overlay of your commonly used name, the Balance Number reveals your instinctive crisis navigation style, and Bridge Numbers pinpoint exact developmental practices to harmonize core numbers."
  ],
  fourAspectsBreakdown: {
    achievementRole: "Synthesizes Birth Day + Pythagorean Expression. Identifies the specific domain where your most enduring mark is made.",
    minorExpressionRole: "Calculated from commonly used daily name (Chaldean & Pythagorean). Shows your immediate first impression and daily social weather.",
    balanceRole: "Calculated from the Pythagorean initial letters of your full birth name. Reveals instinctive cognitive and emotional crisis navigation.",
    bridgeRole: "Calculated as absolute differences between core number pairs. Pinpoints specific practices to resolve internal tension and align destiny."
  }
};

export const ACHIEVEMENT_DATABASE: Record<number, AchievementAnalysis> = {
  1: {
    number: 1,
    title: "Domain of Original & Pioneering Leadership",
    keywords: ["Original Contribution", "Pioneering Initiative", "Independent Mark"],
    domainOfContribution: "Pioneering groundbreaking work, launching innovative enterprises, and establishing individual precedent.",
    legacyStyle: "Unmistakable personal originality that breaks new ground and creates fresh pathways for others.",
    detailedParagraphs: [
      "Achievement Number 1 indicates that your most enduring contribution will be generated in original, pioneering, individually-attributed work.",
      "The legacy that defines this lifetime is distinguished by its independence, innovation, and courage to stand alone.",
      "Your mark is made not by managing existing systems, but by initiating new directions that bear your unique personal signature."
    ]
  },
  2: {
    number: 2,
    title: "Domain of Partnership, Mediation & Harmony",
    keywords: ["Relational Diplomacy", "Bridge Building", "Cooperative Legacy"],
    domainOfContribution: "Creating genuine human understanding, healing divisions, and fostering collaborative partnerships.",
    legacyStyle: "Enduring harmony, diplomatic resolution, and deep interpersonal connections.",
    detailedParagraphs: [
      "Achievement Number 2 indicates that your greatest contributions lie in partnership, mediation, and peaceful bridge-building.",
      "Your legacy is measured in the quality of connections created and the reconciliation of opposing perspectives.",
      "You achieve lasting impact through quiet influence, diplomatic intelligence, and supportive collaboration."
    ]
  },
  3: {
    number: 3,
    title: "Domain of Creative Expression & Communication",
    keywords: ["Inspired Communication", "Creative Artistry", "Uplifting Expression"],
    domainOfContribution: "Writing, teaching, public speaking, the arts, and creative media that illuminate human experience.",
    legacyStyle: "Uplifting artistic or literary works that move, inspire, and transform audiences.",
    detailedParagraphs: [
      "Achievement Number 3 indicates that your enduring mark is created through creative expression and articulate communication.",
      "Your natural gifts and calling converge in the art of translating deep inner truth into inspiring outer form.",
      "Your contribution leaves a legacy of joy, creative inspiration, and communicative clarity."
    ]
  },
  4: {
    number: 4,
    title: "Domain of Methodical Building & Structural Legacy",
    keywords: ["Tangible Construction", "Systemic Discipline", "Enduring Foundations"],
    domainOfContribution: "Constructing reliable physical, organizational, or systemic frameworks built to withstand time.",
    legacyStyle: "Solid, tangible, enduring structures and practical systems that serve generations.",
    detailedParagraphs: [
      "Achievement Number 4 indicates that your greatest achievements are built through disciplined, step-by-step construction.",
      "Your legacy consists of tangible, durable structures—whether architectural, corporate, or methodological.",
      "Your mark is defined by unshakeable reliability, practical excellence, and lasting stability."
    ]
  },
  5: {
    number: 5,
    title: "Domain of Freedom & Expanding Possibility",
    keywords: ["Liberating Exploration", "Dynamic Innovation", "Expanding Horizons"],
    domainOfContribution: "Promoting personal freedom, pioneering social reform, and expanding the boundaries of human experience.",
    legacyStyle: "Opening new doors of freedom and versatility, liberating others from restrictive limitations.",
    detailedParagraphs: [
      "Achievement Number 5 indicates that your most significant contributions involve liberating possibilities for others.",
      "Your legacy is measured by the degree to which you expand horizons, encourage adaptability, and break rigid barriers.",
      "You achieve lasting impact by demonstrating courageous freedom and versatile experiential wisdom."
    ]
  },
  6: {
    number: 6,
    title: "Domain of Committed Love, Family & Community",
    keywords: ["Domestic Nurturing", "Community Stewardship", "Harmonious Care"],
    domainOfContribution: "Fostering loving homes, community welfare, educational care, and protective stewardship.",
    legacyStyle: "Deeply rooted family harmony, community enrichment, and enduring sanctuary for others.",
    detailedParagraphs: [
      "Achievement Number 6 indicates that your greatest achievements center on devoted love, family, and community responsibility.",
      "Your legacy is built through creating environments where people feel genuinely safe, cherished, and supported.",
      "You make your mark by exemplifying steadfast duty, beauty, and practical, caring service."
    ]
  },
  7: {
    number: 7,
    title: "Domain of Analytical Depth, Truth & Wisdom",
    keywords: ["Specialized Knowledge", "Spiritual Insight", "Rigorous Investigation"],
    domainOfContribution: "Scientific research, philosophical inquiry, spiritual teaching, and specialized technical mastery.",
    legacyStyle: "Profound intellectual discoveries, timeless spiritual insights, and specialized literature.",
    detailedParagraphs: [
      "Achievement Number 7 indicates that your greatest mark is made through deep analytical research and spiritual truth-seeking.",
      "Your legacy is defined by rigorous intellectual contribution that pierces surface appearances.",
      "You achieve lasting recognition by sharing specialized wisdom that genuinely transforms human understanding."
    ]
  },
  8: {
    number: 8,
    title: "Domain of Material Mastery & Executive Authority",
    keywords: ["Commercial Leadership", "Resource Mobilization", "Executive Scale"],
    domainOfContribution: "Building large-scale enterprise, financial stewardship, organizational governance, and commercial leadership.",
    legacyStyle: "Substantial economic institutions, financial empowerment, and efficient resource allocation.",
    detailedParagraphs: [
      "Achievement Number 8 indicates that your greatest achievements occur in the domain of material power and executive leadership.",
      "Your legacy involves organizing resources, establishing sustainable business enterprise, and wielding authority with integrity.",
      "You leave a lasting mark through commercial mastery and large-scale organizational achievement."
    ]
  },
  9: {
    number: 9,
    title: "Domain of Universal Service & Global Compassion",
    keywords: ["Altruistic Vision", "Humanitarian Impact", "Conscious Completion"],
    domainOfContribution: "Humanitarian causes, international service, artistic transformation, and philanthropic leadership.",
    legacyStyle: "Global humanitarian impact that leaves the world measurably better and more compassionate.",
    detailedParagraphs: [
      "Achievement Number 9 indicates that your ultimate contribution serves the broader collective good.",
      "Your legacy transcends narrow personal interest, touching countless lives through selfless service and universal vision.",
      "You leave your mark through broad philanthropy, artistic transcendence, and compassionate leadership."
    ]
  },
  11: {
    number: 11,
    title: "Domain of Inspired Illumination & Master Vision",
    keywords: ["Spiritual Channeling", "Intuitive Revelation", "Transformative Light"],
    domainOfContribution: "Channeling spiritual insights, visionary art, transformative teaching, and intuitive leadership.",
    legacyStyle: "Awakening human consciousness and delivering catalytic spiritual illumination.",
    detailedParagraphs: [
      "Master Achievement 11 indicates that your greatest contribution lies in bringing inspired spiritual perception into world form.",
      "Your legacy acts as a beacon of intuitive light, raising awareness and guiding others toward higher truth.",
      "You achieve lasting impact by bridging the spiritual and physical realms through visionary leadership."
    ]
  },
  22: {
    number: 22,
    title: "Domain of the Master Builder & Historic Structures",
    keywords: ["Global Infrastructure", "Historic Enterprise", "Practical Masterwork"],
    domainOfContribution: "Constructing monumental physical, economic, or social infrastructure for global benefit.",
    legacyStyle: "Historic institutions, monumental architecture, and vast systemic solutions.",
    detailedParagraphs: [
      "Master Achievement 22 indicates that your legacy is designed at a monumental scale for humanity's lasting benefit.",
      "You combine lofty spiritual vision with supreme practical building competence.",
      "Your mark is made by erecting enduring institutions and systems that reshape societal infrastructure."
    ]
  },
  33: {
    number: 33,
    title: "Domain of Master Teaching & Universal Compassion",
    keywords: ["Spiritual Stewardship", "Universal Healing", "Master Expression"],
    domainOfContribution: "Universal healing, spiritual stewardship, selfless devotion, and master guidance.",
    legacyStyle: "Profound spiritual upliftment and unconditional compassionate service.",
    detailedParagraphs: [
      "Master Achievement 33 indicates that your ultimate mark is achieved through the highest expression of selfless love.",
      "Your legacy radiates healing energy and master teaching that uplifts collective human heart-consciousness.",
      "You achieve lasting impact by living as a pure embodiment of compassionate devotion."
    ]
  }
};

export const BALANCE_DATABASE: Record<number, BalanceAnalysis> = {
  1: {
    number: 1,
    title: "Independent & Self-Directed Crisis Response",
    keywords: ["Decisive Autonomy", "Self-Reliance", "Direct Action"],
    crisisNavigationStyle: "Navigating difficulty through unilateral individual decision, bold initiative, and personal responsibility.",
    strengthsUnderPressure: "Swift, decisive action without panic; willingness to take complete ownership in an emergency.",
    growthEdge: "Learning to invite collaborative counsel and receive support rather than carrying every burden alone.",
    detailedParagraphs: [
      "Balance Number 1 indicates that under pressure, your natural instinct is to step forward independently and take immediate command.",
      "You seek equilibrium by making clear decisions without waiting for external consensus.",
      "Your crisis strength lies in courage and self-reliance, while your growth edge is allowing trusted partners to share the load."
    ]
  },
  2: {
    number: 2,
    title: "Cooperative & Diplomatic Crisis Response",
    keywords: ["Relational Attunement", "Shared Navigation", "Quiet Mediation"],
    crisisNavigationStyle: "Restoring equilibrium through partnership, active listening, calm consultation, and seeking mutual harmony.",
    strengthsUnderPressure: "Intuitive emotional radar, de-escalating tension, and uniting conflicting parties during crises.",
    growthEdge: "Asking for help early before feeling overwhelmed and avoiding passive conflict avoidance.",
    detailedParagraphs: [
      "Balance Number 2 indicates that under pressure, you seek balance through partnership, dialogue, and quiet sensitivity.",
      "You navigate storms by reaching out to trusted confidants and working collaboratively toward peaceful solutions.",
      "Your strength is diplomatic tact, while your growth edge is voicing personal needs clearly during emergencies."
    ]
  },
  3: {
    number: 3,
    title: "Expressive & Communicative Crisis Response",
    keywords: ["Articulate Processing", "Communicative Clarity", "Creative Reframing"],
    crisisNavigationStyle: "Processing challenge by talking through difficulties, articulating emotions, and reframing obstacles with creative optimism.",
    strengthsUnderPressure: "Vivid communicative expression, breaking tense silence, and illuminating complex situations through words.",
    growthEdge: "Allowing yourself to feel raw emotions fully before immediately attempting to explain or rationalize them.",
    detailedParagraphs: [
      "Balance Number 3 indicates that when life delivers disruption, your natural coping mechanism is open expression and dialogue.",
      "You restore stability by putting feelings into clear words and finding an intelligible story within the challenge.",
      "Your strength lies in communicative optimism, while your growth edge is staying present with uncomfortable quiet feelings."
    ]
  },
  4: {
    number: 4,
    title: "Structural & Methodical Crisis Response",
    keywords: ["Practical Organization", "Step-by-Step Logic", "Grounded Calm"],
    crisisNavigationStyle: "Handling emergencies by breaking chaotic problems into organized, logical, step-by-step action plans.",
    strengthsUnderPressure: "Unshakeable practical calm, analytical structure, and methodical execution amidst emotional storms.",
    growthEdge: "Remaining emotionally accessible to others rather than retreating purely into mechanical planning.",
    detailedParagraphs: [
      "Balance Number 4 indicates that during crisis, you instinctively create practical order out of surrounding chaos.",
      "You regain equilibrium by making lists, establishing clear routines, and tackling obstacles methodically.",
      "Your strength is grounded reliability, while your growth edge is accepting that some crises require emotional adaptability over rigid planning."
    ]
  },
  5: {
    number: 5,
    title: "Adaptive & Flexible Crisis Response",
    keywords: ["Dynamic Versatility", "Resourceful Pivoting", "Open Options"],
    crisisNavigationStyle: "Navigating disruption by pivoting quickly, generating novel alternatives, and maintaining fluid adaptability.",
    strengthsUnderPressure: "Rapid mental agility, resilience against sudden shifts, and finding unexpected doors out of difficult traps.",
    growthEdge: "Staying focused on a single problem long enough to absorb its deeper lesson before rushing to the next topic.",
    detailedParagraphs: [
      "Balance Number 5 indicates that under stress, your instinctive approach is swift adaptability and flexible exploration.",
      "You avoid paralysis by generating alternative paths and embracing change as an opportunity.",
      "Your strength is versatile problem-solving, while your growth edge is cultivating patience through tedious recovery phases."
    ]
  },
  6: {
    number: 6,
    title: "Care-Oriented & Harmonizing Crisis Response",
    keywords: ["Protective Nurturing", "Relational Care", "Restorative Stewardship"],
    crisisNavigationStyle: "Seeking balance by protecting loved ones, creating emotional safety, and tending to the wellbeing of all affected.",
    strengthsUnderPressure: "Deep, soothing presence, selfless caretaking, and holding family or teams together during hardship.",
    growthEdge: "Extending the same loving care and boundary protection to yourself that you give to others.",
    detailedParagraphs: [
      "Balance Number 6 indicates that in times of trouble, your focus centers on emotional nurturing and restoring domestic harmony.",
      "You find stability by ensuring everyone involved is cared for, supported, and emotionally reassured.",
      "Your strength is compassionate stewardship, while your growth edge is avoiding self-martyrdom."
    ]
  },
  7: {
    number: 7,
    title: "Introspective & Analytical Crisis Response",
    keywords: ["Quiet Solitude", "Deep Investigation", "Internal Processing"],
    crisisNavigationStyle: "Navigating challenge by withdrawing into quiet reflection, analyzing root causes, and seeking underlying meaning.",
    strengthsUnderPressure: "Penetrating analytical clarity, spiritual poise, and refusal to be swayed by superficial hysteria.",
    growthEdge: "Communicating your internal processing with loved ones in real-time so they do not feel shut out.",
    detailedParagraphs: [
      "Balance Number 7 indicates that during difficulty, your natural sanctuary is quiet solitude and internal study.",
      "You regain poise by stepping back from immediate noise to analyze the true nature of the challenge.",
      "Your strength is profound intellectual and spiritual depth, while your growth edge is keeping channels of communication open."
    ]
  },
  8: {
    number: 8,
    title: "Strategic & Executive Crisis Response",
    keywords: ["Commanding Strategy", "Resource Mobilization", "Pragmatic Authority"],
    crisisNavigationStyle: "Navigating emergencies by taking strategic control, organizing material resources, and executing authoritative decisions.",
    strengthsUnderPressure: "Commanding leadership under heavy fire, financial pragmatism, and efficient resource allocation.",
    growthEdge: "Addressing the delicate emotional human needs of the crisis alongside practical material logistics.",
    detailedParagraphs: [
      "Balance Number 8 indicates that under pressure, you instinctively step into executive problem-solving and strategic management.",
      "You restore order by assessing practical leverage, securing resources, and directing corrective action.",
      "Your strength is decisive authority, while your growth edge is tempering firmness with empathetic gentleness."
    ]
  },
  9: {
    number: 9,
    title: "Philosophical & Universal Crisis Response",
    keywords: ["Spacious Perspective", "Universal Compassion", "Conscious Release"],
    crisisNavigationStyle: "Navigating hardship by viewing events through a broad philosophical lens, releasing attachment, and honoring universal lessons.",
    strengthsUnderPressure: "Spacious detachment, noble forgiveness, and guiding others toward higher understanding.",
    growthEdge: "Remaining attentive to immediate, mundane practical details alongside overarching spiritual philosophy.",
    detailedParagraphs: [
      "Balance Number 9 indicates that in crisis, you regain equilibrium by placing local events into a vast universal context.",
      "You overcome distress through broad compassion, forgiveness, and the spiritual wisdom of letting go.",
      "Your strength is transcendent perspective, while your growth edge is attending to immediate practical details."
    ]
  },
  11: {
    number: 11,
    title: "Inspired & Intuitive Crisis Response",
    keywords: ["Higher Perception", "Intuitive Flash", "Spiritual Poise"],
    crisisNavigationStyle: "Navigating adversity through sudden intuitive flashes, spiritual faith, and inspiring higher awareness.",
    strengthsUnderPressure: "Illuminating intuitive breakthroughs and maintaining faith in spiritual purpose during dark moments.",
    growthEdge: "Grounding high nervous sensitivity into calm physical routines.",
    detailedParagraphs: [
      "Master Balance 11 indicates that under crisis, you receive sudden intuitive insights that illuminate solutions.",
      "You find equilibrium by connecting current hardship to a higher spiritual evolution.",
      "Your strength is catalytic vision, while your growth edge is managing nervous intensity with physical grounding."
    ]
  },
  22: {
    number: 22,
    title: "Master Building Crisis Response",
    keywords: ["Systemic Redesign", "Monumental Calm", "Practical Masterwork"],
    crisisNavigationStyle: "Responding to breakdown by completely redesigning the underlying system so the crisis never recurs.",
    strengthsUnderPressure: "Transforming catastrophic failures into opportunities for massive systemic upgrade.",
    growthEdge: "Pacing long-term reconstruction so short-term needs are not neglected.",
    detailedParagraphs: [
      "Master Balance 22 indicates that during major emergencies, you do not merely patch problems—you rebuild entire structures.",
      "You turn crisis into a masterwork of systemic improvement and permanent stability.",
      "Your strength is monumental constructive vision, while your growth edge is patience with immediate incremental steps."
    ]
  },
  33: {
    number: 33,
    title: "Universal Stewardship Crisis Response",
    keywords: ["Selfless Healing", "Master Comfort", "Compassionate Stewardship"],
    crisisNavigationStyle: "Restoring peace during tragedy through selfless devotion, spiritual healing, and comforting suffering humanity.",
    strengthsUnderPressure: "Radiating unshakeable compassionate calm that comforts panicked groups.",
    growthEdge: "Protecting personal energy reserves while serving others.",
    detailedParagraphs: [
      "Master Balance 33 indicates that under severe adversity, you act as a comforting harbor of selfless love.",
      "You restore order by uplifting hearts and offering unconditional spiritual stewardship.",
      "Your strength is master healing presence, while your growth edge is maintaining personal health boundaries."
    ]
  }
};

export const BRIDGE_DATABASE: Record<number, BridgeAnalysis> = {
  0: {
    bridgeValue: 0,
    title: "Perfect Harmonic Alignment",
    coreQuality: "Natural Symmetry & Coherence",
    bridgePractice: "Maintain effortless flow; no specific corrective bridge practice required.",
    guidanceForPair: "The two core numbers share identical or root-aligned frequencies, creating natural internal harmony and ease."
  },
  1: {
    bridgeValue: 1,
    title: "Bridge of Independent Initiative & Courage",
    coreQuality: "Self-Reliance & Individual Drive",
    bridgePractice: "Practise decisive personal action, stand in your own authority, and initiate independent choices.",
    guidanceForPair: "To bridge this minor gap, step forward with courageous self-direction without waiting for external permission."
  },
  2: {
    bridgeValue: 2,
    title: "Bridge of Partnership & Diplomatic Sensitivity",
    coreQuality: "Cooperative Intelligence & Active Listening",
    bridgePractice: "Practise genuine partnership, active listening, delicate diplomacy, and receptive collaboration.",
    guidanceForPair: "Bridge the gap by bringing your ideas into cooperative sharing, honoring relationship needs alongside individual goals."
  },
  3: {
    bridgeValue: 3,
    title: "Bridge of Creative Expression & Open Communication",
    coreQuality: "Articulate Joy & Authentic Voice",
    bridgePractice: "Express your inner truth through creative writing, art, verbal communication, and open emotional sharing.",
    guidanceForPair: "Resolve tension by articulating your feelings clearly, utilizing creative mediums to give form to inner vision."
  },
  4: {
    bridgeValue: 4,
    title: "Bridge of Methodical Discipline & Practical Structure",
    coreQuality: "Grounded System & Step-by-Step Patience",
    bridgePractice: "Establish daily routines, organized structures, financial order, and patient step-by-step execution.",
    guidanceForPair: "Close the gap by anchoring abstract ideals into practical, structured, daily habits and tangible commitments."
  },
  5: {
    bridgeValue: 5,
    title: "Bridge of Adaptability & Constructive Freedom",
    coreQuality: "Versatile Openness & Experiential Courage",
    bridgePractice: "Embrace change, cultivate mental flexibility, try new approaches, and release rigid expectations.",
    guidanceForPair: "Harmonize opposing forces by introducing fresh experience, dynamic adaptability, and versatile problem-solving."
  },
  6: {
    bridgeValue: 6,
    title: "Bridge of Loving Responsibility & Nurturing Care",
    coreQuality: "Domestic Stewardship & Balanced Duty",
    bridgePractice: "Accept long-term commitments, nurture relationships, create environmental beauty, and honor family duty.",
    guidanceForPair: "Bridge the divide by infusing your ambitions with loving care, personal responsibility, and domestic harmony."
  },
  7: {
    bridgeValue: 7,
    title: "Bridge of Introspective Analysis & Spiritual Depth",
    coreQuality: "Quiet Research & Inner Truth-Seeking",
    bridgePractice: "Dedicate time to solitary reflection, rigorous analytical study, meditation, and spiritual inquiry.",
    guidanceForPair: "Unite conflicting energies by looking beneath surface appearances and seeking deeper spiritual understanding."
  },
  8: {
    bridgeValue: 8,
    title: "Bridge of Material Mastery & Executive Competence",
    coreQuality: "Commercial Stewardship & Decisive Leadership",
    bridgePractice: "Develop financial literacy, exercise professional authority, organize resources, and build efficient scale.",
    guidanceForPair: "Bridge a wide gap by developing practical commercial competence and executive structure to manifest higher goals."
  }
};

/**
 * Calculation Helper Functions
 */

export function calculateAchievementNumber(birthDay: number, pythagoreanExpression: number): number {
  // Reduce birth day
  let dayVal = birthDay;
  if (dayVal !== 11 && dayVal !== 22) {
    while (dayVal > 9) {
      dayVal = String(dayVal).split("").reduce((acc, d) => acc + Number(d), 0);
      if (dayVal === 11 || dayVal === 22) break;
    }
  }

  const rawSum = dayVal + pythagoreanExpression;
  let finalNum = rawSum;
  if (finalNum !== 11 && finalNum !== 22 && finalNum !== 33) {
    while (finalNum > 9) {
      finalNum = String(finalNum).split("").reduce((acc, d) => acc + Number(d), 0);
      if (finalNum === 11 || finalNum === 22 || finalNum === 33) break;
    }
  }
  return finalNum;
}

export function calculateBalanceNumber(fullName: string): number {
  const pythagoreanMap: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
  };

  const words = fullName.trim().split(/\s+/).filter(Boolean);
  let initialSum = 0;

  for (const word of words) {
    const firstChar = word.charAt(0).toUpperCase();
    if (pythagoreanMap[firstChar]) {
      initialSum += pythagoreanMap[firstChar];
    }
  }

  let finalNum = initialSum;
  if (finalNum !== 11 && finalNum !== 22 && finalNum !== 33) {
    while (finalNum > 9) {
      finalNum = String(finalNum).split("").reduce((acc, d) => acc + Number(d), 0);
      if (finalNum === 11 || finalNum === 22 || finalNum === 33) break;
    }
  }
  return finalNum || 1;
}

export function calculateBridgeNumber(numA: number, numB: number): number {
  // Convert master numbers to root for bridge calculation
  let rootA = numA;
  if (rootA === 11) rootA = 2;
  if (rootA === 22) rootA = 4;
  if (rootA === 33) rootA = 6;
  while (rootA > 9) {
    rootA = String(rootA).split("").reduce((acc, d) => acc + Number(d), 0);
  }

  let rootB = numB;
  if (rootB === 11) rootB = 2;
  if (rootB === 22) rootB = 4;
  if (rootB === 33) rootB = 6;
  while (rootB > 9) {
    rootB = String(rootB).split("").reduce((acc, d) => acc + Number(d), 0);
  }

  return Math.abs(rootA - rootB);
}

export function getAchievementAnalysis(num: number): AchievementAnalysis {
  return ACHIEVEMENT_DATABASE[num] || ACHIEVEMENT_DATABASE[1];
}

export function getBalanceAnalysis(num: number): BalanceAnalysis {
  return BALANCE_DATABASE[num] || BALANCE_DATABASE[1];
}

export function getBridgeAnalysis(bridgeValue: number): BridgeAnalysis {
  const safeVal = Math.min(Math.max(bridgeValue, 0), 8);
  return BRIDGE_DATABASE[safeVal] || BRIDGE_DATABASE[0];
}
