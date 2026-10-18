// src/data/numerologyLifePathMasterKey.ts
// Chapter Nineteen: Life Path Number — The Master Key
// Comprehensive standalone data & calculation engine for Life Path Numbers (1-9, 11, 22, 33).

export interface LifePathDetail {
  lifePathNumber: number;
  title: string;
  roadName: string;
  isMasterNumber: boolean;
  keywords: string[];
  soulDirection: string;
  recurringThemes: string;
  relationshipDynamics: string;
  relationshipLesson?: string;
  careerPurpose: string;
  strengths: string[];
  challenges: string[];
  developmentalInvitation: string;
}

export interface ChapterNineteenTheoryData {
  title: string;
  subtitle: string;
  quote: {
    text: string;
    author: string;
  };
  introParagraphs: string[];
  threePartMethodExplanation: string;
}

export const CHAPTER_NINETEEN_THEORY_DATA: ChapterNineteenTheoryData = {
  title: "Life Path Number — The Master Key",
  subtitle: "The Master Direction of the Incarnated Soul — The Three-Part Calculation Method & Life Path Analysis",
  quote: {
    text: "The two most important days in your life are the day you were born and the day you find out why.",
    author: "Mark Twain"
  },
  introParagraphs: [
    "If the Birth Number is the specific gift brought into this lifetime, the Life Path Number is the road along which that gift travels. It is the single most important number in the entire numerological profile.",
    "Calculated using the strict three-part method, it preserves Master Numbers (11, 22, and 33) occurring in the day, month, or reduced year prior to final summation.",
    "The Life Path describes the fundamental quality of the soul's chosen journey—illuminating recurring life lessons, relationship choices, and ultimate career purpose."
  ],
  threePartMethodExplanation: "The three-part method reduces Day, Month, and Year separately to single digits or Master Numbers (11, 22, 33), then sums the three values. This preserves Master frequency tracks that direct-sum addition collapses."
};

export const ALL_LIFE_PATH_DATABASE: Record<number, LifePathDetail> = {
  1: {
    lifePathNumber: 1,
    title: "The Pioneer's Road",
    roadName: "Road of Original Independent Leadership",
    isMasterNumber: false,
    keywords: ["Pioneering", "Autonomy", "Originality", "Courage", "Self-Determination"],
    soulDirection: "To cultivate genuine individual authority and self-directed leadership without relying on external validation.",
    recurringThemes: "Confrontation with authority: discovering whose judgment governs life choices and stepping out of others' expectations.",
    relationshipDynamics: "Requires practicing genuine vulnerability; avoiding the trap of demanding total self-sufficiency in love.",
    careerPurpose: "Thrives in entrepreneurship, creative directing, executive pioneering, and roles with full personal autonomy.",
    strengths: [
      "Uncompromising courage to initiate new ventures",
      "Original problem-solving and decisive action",
      "Self-reliance and pioneering drive"
    ],
    challenges: [
      "Stubbornness and over-assertive dominance",
      "Fear of showing weakness or asking for help",
      "Isolation resulting from relentless forward drive"
    ],
    developmentalInvitation: "Leading from authentic inner authority rather than ego-driven self-assertion."
  },

  2: {
    lifePathNumber: 2,
    title: "The Diplomat's Road",
    roadName: "Road of Cooperative Intelligence & Mediation",
    isMasterNumber: false,
    keywords: ["Mediation", "Attunement", "Partnership", "Cooperation", "Peacebuilding"],
    soulDirection: "To master the art of genuine cooperative intelligence, diplomacy, and building bridges across differences.",
    recurringThemes: "Balancing personal identity with relational harmony; avoiding self-erasure while fostering deep connection.",
    relationshipDynamics: "Thrives in equal, highly communicative partnerships where sensitivity is honored as strength.",
    careerPurpose: "Excels in counseling, diplomacy, human resources, mediation, social facilitation, and essential partnership roles.",
    strengths: [
      "Deep empathetic listening and conflict resolution",
      "Fostering psychological safety in groups",
      "Intuitive perception of unspoken human dynamics"
    ],
    challenges: [
      "Hypersensitivity to criticism or interpersonal friction",
      "Passive-aggressive resentment from suppressing personal needs",
      "Indecision born of trying to appease everyone"
    ],
    developmentalInvitation: "Establishing a solid personal identity that supports rather than dissolves into relationships."
  },

  3: {
    lifePathNumber: 3,
    title: "The Creator's Road",
    roadName: "Road of Creative Expression & Inspired Sharing",
    isMasterNumber: false,
    keywords: ["Creative Voice", "Communication", "Artistic Joy", "Inspiration", "Optimism"],
    soulDirection: "To express the authentic inner world through art, story, words, and joyful, uplifting communication.",
    recurringThemes: "Navigating the gap between initial creative inspiration and the disciplined effort required to finish works.",
    relationshipDynamics: "Brings warmth and celebration to love; needs a partner who encourages creative depth alongside joy.",
    careerPurpose: "Shines in writing, journalism, design, public speaking, performing arts, media, and creative education.",
    strengths: [
      "Radiant charisma and articulate storytelling",
      "Uplifting others through creative perspective",
      "Versatile talent across multiple artistic mediums"
    ],
    challenges: [
      "Scattering creative focus across too many unfinished projects",
      "Using humor or charm to mask deep emotional pain",
      "Vulnerability to social distraction and superficiality"
    ],
    developmentalInvitation: "Staying with creative projects through the unglamorous middle phase into deep completion."
  },

  4: {
    lifePathNumber: 4,
    title: "The Builder's Road",
    roadName: "Road of Disciplined Mastery & Enduring Foundations",
    isMasterNumber: false,
    keywords: ["Mastery", "Structural Integrity", "Systemic Building", "Reliability", "Perseverance"],
    soulDirection: "To construct lasting, high-integrity foundations and master long-term, methodical discipline.",
    recurringThemes: "Building enduring quality in a world that favors rapid, superficial shortcuts.",
    relationshipDynamics: "Offers unshakeable loyalty and practical support; needs to cultivate explicit verbal and emotional warmth.",
    careerPurpose: "Commanding in engineering, architecture, financial auditing, project governance, law, and technical crafts.",
    strengths: [
      "Unmatched execution of promises and long-term commitments",
      "Systemic organizational clarity and precision",
      "Steadfast perseverance under pressure"
    ],
    challenges: [
      "Rigidity and resistance to sudden systemic changes",
      "Valuing rigid procedure over human outcomes",
      "Emotional understatement appearing distant to partners"
    ],
    developmentalInvitation: "Learning that true security comes from internal adaptability alongside solid structures."
  },

  5: {
    lifePathNumber: 5,
    title: "The Explorer's Road",
    roadName: "Road of Freedom & Experiential Wisdom",
    isMasterNumber: false,
    keywords: ["Adaptability", "Experiential Learning", "Freedom", "Versatility", "Sensory Engagement"],
    soulDirection: "To embrace the full spectrum of life experience, cultivating broad adaptability and direct wisdom.",
    recurringThemes: "Distinguishing genuine freedom (conscious chosen commitment) from false freedom (restless avoidance of depth).",
    relationshipDynamics: "Requires mutual growth and adventure; deepens when realizing committed love is a profound exploration.",
    careerPurpose: "Thrives in international business, travel, sales, crisis management, journalism, and dynamic markets.",
    strengths: [
      "Rapid adaptability in uncertain environments",
      "Magnetic, engaging rapport with diverse cultures",
      "Broad, practical wisdom forged through direct experience"
    ],
    challenges: [
      "Restlessness and abandoning commitments prematurely",
      "Impulsive sensory overindulgence",
      "Scattering energy across superficial novelties"
    ],
    developmentalInvitation: "Discovering that deep, long-term commitment unlocks the highest form of personal freedom."
  },

  6: {
    lifePathNumber: 6,
    title: "The Nurturer's Road",
    roadName: "Road of Responsibility, Love & Community Service",
    isMasterNumber: false,
    keywords: ["Nurturing", "Harmonious Beauty", "Community Responsibility", "Service", "Healing"],
    soulDirection: "To embody practical, devoted love and create beautiful, harmonious, secure environments for others.",
    recurringThemes: "Transforming martyrdom, boundary-less giving, and quiet control into sustainable, empowered service.",
    relationshipDynamics: "Love is the core context of life; must explicitly include self in the circle of care.",
    careerPurpose: "Excels in healthcare, social work, interior architecture, wellness, education, and community management.",
    strengths: [
      "Creating deeply healing, beautiful, and welcoming spaces",
      "Protective devotion and practical family stewardship",
      "Restorative counsel and instinctive conflict resolution"
    ],
    challenges: [
      "Over-extending care to the point of personal burnout",
      "Interfering in others' lives under the guise of helping",
      "Difficulty accepting care or help from others"
    ],
    developmentalInvitation: "Practicing self-care as the essential prerequisite for sustainable outward service."
  },

  7: {
    lifePathNumber: 7,
    title: "The Seeker's Road",
    roadName: "Road of Analytical Depth & Spiritual Wisdom",
    isMasterNumber: false,
    keywords: ["Analytical Depth", "Spiritual Truth", "Introspection", "Research", "Wisdom"],
    soulDirection: "To search beneath surface appearances, discovering fundamental truths through rigorous analysis and contemplation.",
    recurringThemes: "Bridging the gap between solitary intellectual/spiritual research and active human engagement.",
    relationshipDynamics: "Requires quiet private space; deepens intimacy by sharing thoughts during processing rather than after.",
    careerPurpose: "Preeminent in scientific research, philosophy, data architecture, specialized consulting, tech, and esoteric studies.",
    strengths: [
      "Penetrating analytical clarity that detects subtle patterns",
      "Uncompromising dedication to factual and spiritual truth",
      "Quiet inner dignity and philosophical depth"
    ],
    challenges: [
      "Social withdrawal and emotional detachment",
      "Cynicism or intellectual arrogance",
      "Overthinking leading to decision paralysis"
    ],
    relationshipLesson: "Allowing trusted partners into the process of inner inquiry rather than presenting only finished answers.",
    developmentalInvitation: "Bringing solitary wisdom back into warm, compassionate communion with society."
  },

  8: {
    lifePathNumber: 8,
    title: "The Authority's Road",
    roadName: "Road of Material Mastery & Executive Leadership",
    isMasterNumber: false,
    keywords: ["Executive Authority", "Material Mastery", "Strategic Vision", "Empowerment", "Legacy"],
    soulDirection: "To master financial and organizational power, directing material resources toward ethical, lasting achievements.",
    recurringThemes: "Infusing material power with ethical stewardship to prevent empty commercial materialism.",
    relationshipDynamics: "Brings strong protective security; must cultivate genuine emotional vulnerability behind the executive role.",
    careerPurpose: "Commands corporate executive roles, venture finance, legal practice, commercial real estate, and large enterprises.",
    strengths: [
      "Intuitive strategic grasp of complex commercial systems",
      "Commanding executive leadership and decision-making",
      "Building resilient material legacies and capital structures"
    ],
    challenges: [
      "Equating human self-worth solely with net worth or status",
      "Domineering or overly rigid control styles",
      "Neglecting personal health and intimate relationships"
    ],
    developmentalInvitation: "Exercising power as a humble steward for the collective upliftment of humanity."
  },

  9: {
    lifePathNumber: 9,
    title: "The Humanitarian's Road",
    roadName: "Road of Universal Service & Conscious Release",
    isMasterNumber: false,
    keywords: ["Universal Compassion", "Altruism", "Completion", "Non-Attachment", "Global Service"],
    soulDirection: "To embody non-possessive universal love, offering broad service and mastering the grace of conscious completion.",
    recurringThemes: "Mastering clean, grateful release of outgrown relationships and cycles without clinging or bitterness.",
    relationshipDynamics: "Loves broadly; needs partners who respect their humanitarian scope without feeling second-place.",
    careerPurpose: "Shines in NGO leadership, international policy, global arts, philanthropy, healing, and transformative teaching.",
    strengths: [
      "Broad, inclusive empathy for humanity across all boundaries",
      "Artistic and philosophical breadth of vision",
      "Graceful completion and wisdom in releasing past cycles"
    ],
    challenges: [
      "Emotional exhaustion from absorbing world suffering",
      "Clinging to completed relationships out of misguided loyalty",
      "Vague, impractical idealism without local grounding"
    ],
    developmentalInvitation: "Loving universally while maintaining healthy individual limits and self-replenishment."
  },

  11: {
    lifePathNumber: 11,
    title: "The Illuminator's Road",
    roadName: "Master Road of Spiritual Illumination & Inspired Perception",
    isMasterNumber: true,
    keywords: ["Illuminated Vision", "Intuitive Perception", "Inspiration", "Catalytic Insight", "Spiritual Channel"],
    soulDirection: "To serve as an illuminated channel of higher intuitive awareness, inspiring others through catalytic insight.",
    recurringThemes: "Managing elevated nervous system voltage and bridging high intuitive vision with practical expression.",
    relationshipDynamics: "Requires partners who offer quiet grounding; needs deep spiritual and emotional harmony.",
    careerPurpose: "Preeminent in inspirational teaching, holistic psychology, visionary arts, metaphysical research, and spiritual leadership.",
    strengths: [
      "Profound intuitive perception that penetrates subtle realities",
      "Inspiring others toward higher consciousness and purpose",
      "Catalyzing rapid spiritual transformation in environments"
    ],
    challenges: [
      "Chronic nervous overstimulation and intense anxiety",
      "Severe self-doubt when intuitive insights are misunderstood",
      "Escapism or retreat when physical reality feels harsh"
    ],
    developmentalInvitation: "Grounding high intuitive revelation into accessible, compassionate, usable form for daily life."
  },

  22: {
    lifePathNumber: 22,
    title: "The Master Builder's Road",
    roadName: "Master Road of Large-Scale Systemic Manifestation",
    isMasterNumber: true,
    keywords: ["Master Builder", "Large-Scale Systems", "Pragmatic Visionary", "Global Infrastructure", "Enduring Impact"],
    soulDirection: "To take vast spiritual ideals and construct large-scale, tangible systems and institutions that serve humanity.",
    recurringThemes: "Navigating the gap between the monumental scope of vision and the slow, brick-by-brick reality of building.",
    relationshipDynamics: "Demands patience with loved ones who operate on standard personal scales rather than master systemic scales.",
    careerPurpose: "Commands global infrastructure, renewable energy consortia, systemic education/health networks, and international ventures.",
    strengths: [
      "Uniting monumental visionary scope with rigorous practical execution",
      "Building permanent institutions that benefit global communities",
      "Unparalleled pragmatic organization at scale"
    ],
    challenges: [
      "Overwhelming stress from the immense scale of responsibility",
      "Impatience and severe perfectionism during early building stages",
      "Workaholism leading to severe physical/emotional depletion"
    ],
    developmentalInvitation: "Laying one practical brick at a time while keeping the divine global blueprint alive in heart."
  },

  33: {
    lifePathNumber: 33,
    title: "The Master Teacher's Road",
    roadName: "Master Road of Embodied Compassionate Service",
    isMasterNumber: true,
    keywords: ["Embodied Love", "Master Teacher", "Unconditional Care", "Spiritual Stewardship", "Universal Healing"],
    soulDirection: "To radiate embodied unconditional love through practical daily action, spiritual stewardship, and compassionate presence.",
    recurringThemes: "Sustaining radiant unconditional service through non-negotiable self-care and energetic protection.",
    relationshipDynamics: "Embodying divine warmth; requires firm personal boundaries so emotional capacity is not consumed.",
    careerPurpose: "Exemplary in spiritual leadership, global healing, humanitarian movement stewardship, and transformational education.",
    strengths: [
      "Living demonstration of radiant, unconditional love in action",
      "Transforming environments purely through compassionate presence",
      "Uplifting collective consciousness through selfless stewardship"
    ],
    challenges: [
      "Absorbing collective grief and suffering into personal energy",
      "Exhaustion from relentless demands of those seeking aid",
      "Neglecting physical body needs under spiritual demands"
    ],
    developmentalInvitation: "Recognizing that self-replenishment is the sacred prerequisite for embodied universal service."
  }
};

/**
 * THREE-PART METHOD CALCULATION ENGINE
 * Formally reduces Day, Month, and Year separately, preserving Master Numbers (11, 22, 33).
 */
export interface LifePathCalculationResult {
  dob: string;
  dayOriginal: number;
  dayReduced: number;
  monthOriginal: number;
  monthReduced: number;
  yearOriginal: number;
  yearReduced: number;
  sumTotal: number;
  finalLifePath: number;
  isMasterNumber: boolean;
  breakdownString: string;
}

function reduceToSingleOrMaster(n: number): number {
  if (n === 11 || n === 22 || n === 33) return n;
  let curr = n;
  while (curr > 9) {
    const sum = String(curr).split("").reduce((a, b) => a + Number(b), 0);
    if (sum === 11 || sum === 22 || sum === 33) return sum;
    curr = sum;
  }
  return curr;
}

export function calculateLifePathThreePart(dob: string): LifePathCalculationResult {
  const parts = dob.split("-").map(Number);
  const yearRaw = parts[0] || 1980;
  const monthRaw = parts[1] || 1;
  const dayRaw = parts[2] || 1;

  // Step 1: Day reduction
  const dayReduced = reduceToSingleOrMaster(dayRaw);

  // Step 2: Month reduction
  const monthReduced = reduceToSingleOrMaster(monthRaw);

  // Step 3: Year reduction
  const yearSumDigits = String(yearRaw).split("").reduce((a, b) => a + Number(b), 0);
  const yearReduced = reduceToSingleOrMaster(yearSumDigits);

  // Step 4: Final Addition
  const totalSum = dayReduced + monthReduced + yearReduced;
  const finalLifePath = reduceToSingleOrMaster(totalSum);

  const isMaster = finalLifePath === 11 || finalLifePath === 22 || finalLifePath === 33;

  const breakdownString = `Day ${dayRaw} (→${dayReduced}) + Month ${monthRaw} (→${monthReduced}) + Year ${yearRaw} (→${yearReduced}) = ${totalSum} → Life Path ${finalLifePath}`;

  return {
    dob,
    dayOriginal: dayRaw,
    dayReduced,
    monthOriginal: monthRaw,
    monthReduced,
    yearOriginal: yearRaw,
    yearReduced,
    sumTotal: totalSum,
    finalLifePath,
    isMasterNumber: isMaster,
    breakdownString
  };
}

export function getLifePathDetail(lpInput: number): LifePathDetail {
  return ALL_LIFE_PATH_DATABASE[lpInput] || ALL_LIFE_PATH_DATABASE[1];
}
