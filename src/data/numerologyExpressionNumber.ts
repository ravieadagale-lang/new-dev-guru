// src/data/numerologyExpressionNumber.ts
// Chapter Nine: Expression Number — Your Life's Fundamental Calling
// Full comprehensive reference for Expression Numbers (1-9, 11, 22, 33) without personal case study examples.

export interface ExpressionNumberAnalysis {
  number: number;
  title: string;
  keywords: string[];
  callingDefinition: string;
  meaning: string;
  personalityAndCharacter: string;
  strengths: string[];
  shadowAndDrawbacks: string[];
  relationshipsAndLove: {
    traits: string;
    shadow: string;
    coreLesson: string;
  };
  careerAndProfessional: {
    environments: string[];
    naturalRoles: string;
    workStyle: string;
  };
  moneyAndFinance: {
    pattern: string;
    advice: string;
  };
  healthTendencies: {
    vulnerabilities: string[];
    careAdvice: string;
  };
  spiritualLesson: string;
  practicalGuidance: string[];
}

export const EXPRESSION_NUMBERS_DATABASE: Record<number, ExpressionNumberAnalysis> = {
  1: {
    number: 1,
    title: "The Pioneer",
    keywords: ["Independence", "Leadership", "Initiation", "Courage", "Originality"],
    callingDefinition: "The Expression Number 1 reveals a calling toward independence, original leadership, and the courage to initiate what others have not yet begun. It is the vibration of self-assertion and pioneering action.",
    meaning: "The vibration of 1 is the most individuated in the entire numerical system. It is the energy of the self asserting its distinct existence, original perspective, and right to move forward under its own authority without waiting for external permission or validation.",
    personalityAndCharacter: "Characterized by directness and rapid decision-making. Expression 1 individuals know what they think and move naturally toward conclusion and action. Behind an outer confidence lies a deep desire to be genuinely seen for who they are beneath their armor.",
    strengths: [
      "Courage under uncertainty and pressure",
      "Originality and pioneering vision",
      "Decisive independent action",
      "Capacity to break new ground and raise standards",
      "Natural self-reliance and initiative"
    ],
    shadowAndDrawbacks: [
      "Misuse of independence as isolation",
      "Leadership devolving into domination or stubbornness",
      "Difficulty acknowledging mistakes or accepting challenge",
      "Projecting invulnerability, leading to unnecessary loneliness",
      "Impatience with deliberation and collaboration"
    ],
    relationshipsAndLove: {
      traits: "Passionate, protective, and deeply loyal. Attracted to confident, capable partners who do not compete for primary authority.",
      shadow: "Can inadvertently create imbalance by over-managing or becoming controlling when challenged.",
      coreLesson: "Genuine love requires the courage of vulnerability — saying 'I need you' without losing self-possession."
    },
    careerAndProfessional: {
      environments: ["Entrepreneurship", "Executive Leadership", "Pioneering Research", "Independent Creative Arts", "Military & Law Command"],
      naturalRoles: "Founder, CEO, Inventor, Independent Specialist, Visionary Director.",
      workStyle: "Thrives with autonomy and clear outcome responsibility. Unsuited for slow, bureaucratic consensus environments."
    },
    moneyAndFinance: {
      pattern: "Motivated by financial independence and power of choice. Prone to bold investments and confident bets on personal capability.",
      advice: "Slow down financial decisions; consult trusted, cautious advisors to prevent overextension."
    },
    healthTendencies: {
      vulnerabilities: ["Stress-related hypertension", "Adrenal fatigue", "Tension headaches", "Ignored body warning signs"],
      careAdvice: "Practise deliberate stillness and scheduled rest rather than constant high-activation functioning."
    },
    spiritualLesson: "True strength is expressed through service rather than domination. Independence is not invulnerability, and leading requires the grace to need others.",
    practicalGuidance: [
      "Develop genuine receptivity by accepting help without feeling diminished.",
      "Practise asking for assistance once a day for a small task.",
      "Cultivate relationships where you willingly act as a student or partner rather than the leader."
    ]
  },
  2: {
    number: 2,
    title: "The Diplomat",
    keywords: ["Partnership", "Sensitivity", "Cooperation", "Intuition", "Peace"],
    callingDefinition: "The Expression Number 2 reveals a calling toward partnership, cooperation, and genuine sensitivity to human connection. It finds strength in unity, mediation, and emotional attunement.",
    meaning: "The 2 is the number of relationship in its deepest sense — the meeting of consciousnesses in mutual recognition, respect, and care. It builds bridge-making intelligence that holds groups and relationships together.",
    personalityAndCharacter: "Exquisitely sensitive to emotional atmospheres, reading unspoken feelings instantly. Empathetic, gentle, and reflective, with an innate perceptual gift for making others feel safe and truly heard.",
    strengths: [
      "Exceptional emotional attunement and empathy",
      "Natural mediation and peacemaking skills",
      "Diplomatic precision in resolving conflict",
      "Deep intuitive perception",
      "Nurturing collaborative intelligence"
    ],
    shadowAndDrawbacks: [
      "Codependency and loss of personal boundaries",
      "Self-erasure and hiding personal preferences to maintain peace",
      "Passive-aggressive expression of unstated needs",
      "Absorbing environmental anxiety and emotional overload",
      "Chronic resentment arising from unacknowledged self-sacrifice"
    ],
    relationshipsAndLove: {
      traits: "Devoted, attentive, and skilled at creating emotional safety and intimacy.",
      shadow: "Risk of losing selfhood by prioritizing partner's needs until personal identity fades.",
      coreLesson: "Genuine healing love requires two separately grounded individuals. Giving from depletion generates resentment."
    },
    careerAndProfessional: {
      environments: ["Counseling & Psychology", "Healthcare & Nursing", "Human Resources", "Diplomacy & Mediation", "Healing Arts & Social Work"],
      naturalRoles: "Mediator, Counselor, Essential Co-Leader, HR Strategist, Diplomat.",
      workStyle: "Flourishes in collaborative, human-centered environments where emotional intelligence is valued."
    },
    moneyAndFinance: {
      pattern: "Prioritizes financial security over aggressive accumulation. Vulnerable to financial depletion through excessive generosity.",
      advice: "Establish firm personal financial reserves before offering assistance to others."
    },
    healthTendencies: {
      vulnerabilities: ["Nervous system sensitivity", "Digestive sluggishness", "Emotional exhaustion", "Lymphatic fluid retention"],
      careAdvice: "Regular grounding practices, solitude, and asking 'Is this emotion mine?' to clear absorbed stress."
    },
    spiritualLesson: "Genuine service must come from a foundation of self-knowledge and self-respect. Caring for oneself is the prerequisite for sustainable care of others.",
    practicalGuidance: [
      "State one clear personal need or preference daily without diluting it.",
      "Maintain at least one activity or space that belongs exclusively to you.",
      "Learn to receive care with grace equal to how freely you give it."
    ]
  },
  3: {
    number: 3,
    title: "The Creative Communicator",
    keywords: ["Expression", "Creativity", "Joy", "Communication", "Inspiration"],
    callingDefinition: "The Expression Number 3 reveals a calling toward creative expression, joyful communication, and the transformative power of story, art, and speech.",
    meaning: "The 3 represents generative creation — giving form to inner feelings, translating imagination into language, art, music, or performance that inspires and delights others.",
    personalityAndCharacter: "Charismatic, articulate, and inherently optimistic. Spreads enthusiasm, finds story in daily life, and connects ideas and people with ease and warmth.",
    strengths: [
      "Inspiring verbal and written eloquence",
      "Abundant creative imagination",
      "Natural magnetic charisma and optimism",
      "Aesthetic sensitivity and humor",
      "Capacity to uplift emotional atmospheres"
    ],
    shadowAndDrawbacks: [
      "Scattered energy and unfinished projects",
      "Emotional superficiality and masking pain with wit",
      "Substituting charm for sustained effort and depth",
      "Exaggeration and dramatic avoidance of difficult truths",
      "Extravagant waste of creative potential"
    ],
    relationshipsAndLove: {
      traits: "Romantic, spontaneous, and skilled at keeping relationships joyful and alive.",
      shadow: "Avoidance of difficult emotional conversations by deflecting with humor or levity.",
      coreLesson: "Genuine intimacy is built in uncomfortable conversations as much as in joyful ones."
    },
    careerAndProfessional: {
      environments: ["Journalism & Writing", "Public Speaking & Media", "Performing Arts & Design", "Marketing & PR", "Education & Training"],
      naturalRoles: "Author, Speaker, Creative Director, Educator, Media Communicator.",
      workStyle: "Thrives when granted creative freedom, expressive space, and varied projects."
    },
    moneyAndFinance: {
      pattern: "Impulsive financial habits; spends freely when optimism is high.",
      advice: "Build structured savings habits during high-income periods to cushion creative lulls."
    },
    healthTendencies: {
      vulnerabilities: ["Throat and vocal strain", "Nervous exhaustion from over-stimulation", "Adrenal spikes"],
      careAdvice: "Practise quiet voice rest, balanced sleep schedules, and grounding physical exercise."
    },
    spiritualLesson: "Discipline deepens creative genius. Sustained engagement through difficult project phases yields far richer work than fleeting inspiration alone.",
    practicalGuidance: [
      "Commit to completing one major creative project before launching new ones.",
      "Stay present during serious emotional discussions without deflecting.",
      "Channel expressive gifts toward meaningful, lasting contributions."
    ]
  },
  4: {
    number: 4,
    title: "The Master Builder",
    keywords: ["Discipline", "Structure", "Reliability", "Precision", "Endurance"],
    callingDefinition: "The Expression Number 4 reveals a calling toward patient, precise, methodical construction of lasting structures, systems, and institutions.",
    meaning: "The 4 represents foundational stability — the earth vibration that bears weight, values technical precision, and turns visionary ideas into concrete, enduring reality.",
    personalityAndCharacter: "Solid, dependable, realistic, and deeply practical. Values integrity, order, and honest craftsmanship over superficial display or rapid shortcuts.",
    strengths: [
      "Unmatched reliability and systematic discipline",
      "High technical competence and precision",
      "Endurance through long-term challenges",
      "Ability to build solid organizational systems",
      "Unshakable personal integrity"
    ],
    shadowAndDrawbacks: [
      "Inflexibility and resistance to sudden change",
      "Over-caution leading to missed opportunities",
      "Skepticism toward innovative or unconventional ideas",
      "Workaholic tendencies and emotional suppression",
      "Perceived dryness or harsh judgment of unorganized people"
    ],
    relationshipsAndLove: {
      traits: "Demonstrates devotion through action, loyalty, and practical protection.",
      shadow: "Processes emotions internally and slowly, which partners may mistake for distance.",
      coreLesson: "Expressing feelings verbally and emotionally is as vital as practical caretaking."
    },
    careerAndProfessional: {
      environments: ["Engineering & Construction", "Architecture & Urban Planning", "Accounting & Finance", "Legal & Judicial Practice", "Project Management"],
      naturalRoles: "Systems Engineer, Architect, Operations Officer, Financial Auditor, Master Builder.",
      workStyle: "Excels when clear guidelines, structured benchmarks, and high craftsmanship are required."
    },
    moneyAndFinance: {
      pattern: "Prudent, conservative, and focused on long-term tangible assets.",
      advice: "Balance extreme frugality with enjoyable life experiences and calculated growth investments."
    },
    healthTendencies: {
      vulnerabilities: ["Joint and bone strain", "Muscle stiffness", "Digestive sluggishness from routine stress"],
      careAdvice: "Maintain flexible physical movement, stretching routines, and work-rest boundaries."
    },
    spiritualLesson: "Outer structures reflect inner alignment. The most enduring achievements are built on internal peace, flexibility, and genuine integrity.",
    practicalGuidance: [
      "Practice adapting to unexpected plan changes without frustration.",
      "Share emotional thoughts directly with loved ones.",
      "Allow room for creative experimentation alongside structured planning."
    ]
  },
  5: {
    number: 5,
    title: "The Freedom Seeker",
    keywords: ["Freedom", "Versatility", "Adventure", "Adaptability", "Change"],
    callingDefinition: "The Expression Number 5 reveals a calling toward freedom, versatility, and learning through direct, varied, sensory life experience.",
    meaning: "The 5 represents dynamic movement and exploration — testing boundaries, adapting rapidly to changing environments, and discovering authentic freedom through conscious choice.",
    personalityAndCharacter: "Vibrant, curious, magnetic, and highly adaptable. Fascinated by human diversity, travel, new ideas, and multi-faceted experiences.",
    strengths: [
      "Rapid adaptability in fast-changing situations",
      "Versatile talents across multiple fields",
      "Magnetic social charm and persuasive communication",
      "Courage to embrace innovation and change",
      "Resourcefulness under unexpected conditions"
    ],
    shadowAndDrawbacks: [
      "Restlessness and abandoning tasks before mastery",
      "Sensory indulgence and addictive tendencies",
      "Fear of commitment disguised as love of freedom",
      "Scattering energy across too many directions",
      "Inconsistency and unreliability under routine"
    ],
    relationshipsAndLove: {
      traits: "Exciting, fun-loving, and generous; brings adventure and growth to relationships.",
      shadow: "Tendency to pull away when intimacy demands deep routine or quiet vulnerability.",
      coreLesson: "True freedom is found within chosen commitments, not in perpetual escape."
    },
    careerAndProfessional: {
      environments: ["Sales & Marketing", "International Trade & Travel", "Journalism & Media", "Event Operations & PR", "Entrepreneurial Tech"],
      naturalRoles: "Growth Strategist, Foreign Correspondent, Travel Specialist, Serial Entrepreneur, Media Producer.",
      workStyle: "Flourishes in dynamic, non-routine roles with travel, public contact, and varied tasks."
    },
    moneyAndFinance: {
      pattern: "Fluctuating financial patterns; generates wealth rapidly through commerce but spends impulsively.",
      advice: "Automate investments into locked, long-term assets to protect wealth from impulsive liquid spending."
    },
    healthTendencies: {
      vulnerabilities: ["Nervous system over-stimulation", "Adrenal burnout", "Restless insomnia"],
      careAdvice: "Implement digital detoxes, structured sensory breaks, and calming meditation practices."
    },
    spiritualLesson: "Freedom is not the absence of roots but the presence of conscious choice. Committing deeply to worthwhile goals expands true personal power.",
    practicalGuidance: [
      "Complete current commitments before seeking new stimulation.",
      "Channel restlessness into constructive physical or creative channels.",
      "Distinguish between healthy adventure and avoidant escapism."
    ]
  },
  6: {
    number: 6,
    title: "The Devoted Nurturer",
    keywords: ["Love", "Service", "Responsibility", "Beauty", "Community"],
    callingDefinition: "The Expression Number 6 reveals a calling toward responsible love, nurturing service, artistic harmony, and family or community guardianship.",
    meaning: "The 6 represents love made practical — establishing warm, harmonious, beautifully ordered environments where people feel supported, safe, and valued.",
    personalityAndCharacter: "Warm, protective, artistic, and deeply responsible. Possesses an innate eye for aesthetics, harmony, and creating emotional safety for others.",
    strengths: [
      "Deeply compassionate and reliable caretaking",
      "Creating aesthetic harmony and comfort",
      "Strong sense of family and community responsibility",
      "Natural counseling and healing orientation",
      "Generous support of those in need"
    ],
    shadowAndDrawbacks: [
      "Martyrdom and giving beyond personal reserves",
      "Interfering or over-controlling under the guise of care",
      "Enabling dependent behaviors in others",
      "Perfectionism and harsh criticism when harmony is disrupted",
      "Neglecting self-care to maintain external appearances"
    ],
    relationshipsAndLove: {
      traits: "Profoundly devoted, supportive, and focused on building a beautiful home life.",
      shadow: "Risk of over-managing partner's life or feeling resentful if care is not reciprocated.",
      coreLesson: "Offer care willingly without controlling outcomes, and allow others room for their own lessons."
    },
    careerAndProfessional: {
      environments: ["Healthcare & Medicine", "Education & Childcare", "Interior Design & Architecture", "Hospitality & Culinary Arts", "Social Welfare"],
      naturalRoles: "Healthcare Administrator, Educator, Interior Designer, Counselor, Community Director.",
      workStyle: "Thrives in human-centered roles where service, quality of life, and harmony are paramount."
    },
    moneyAndFinance: {
      pattern: "Generously invests in family, home quality, and community comfort.",
      advice: "Ensure personal retirement and emergency funds are secured before funding others."
    },
    healthTendencies: {
      vulnerabilities: ["Throat and vocal cord stress", "Kidney and fluid balance", "Emotional exhaustion"],
      careAdvice: "Establish explicit daily rest boundaries and engage in artistic expression solely for personal joy."
    },
    spiritualLesson: "Service must flow from internal fullness. Tending to one's own wellbeing is essential to sustaining genuine service to others.",
    practicalGuidance: [
      "Allow loved ones to handle their own challenges without jumping in to fix everything.",
      "Practise saying 'no' to requests that exceed your energy capacity.",
      "Prioritize your own health and rest as an act of love."
    ]
  },
  7: {
    number: 7,
    title: "The Truth Seeker",
    keywords: ["Wisdom", "Analysis", "Depth", "Spirituality", "Understanding"],
    callingDefinition: "The Expression Number 7 reveals a calling toward analytical penetration, quiet research, spiritual contemplation, and mastering truth beneath surface appearances.",
    meaning: "The 7 represents analytical and spiritual depth — investigating fundamental truths, mastering specialized knowledge, and integrating intellect with intuition.",
    personalityAndCharacter: "Introspective, observant, analytical, and refined. Values privacy, intellectual integrity, and quiet study over superficial social activities.",
    strengths: [
      "Penetrating analytical mind and critical reasoning",
      "Capacity for deep technical or spiritual expertise",
      "High intuitive perception and truth detection",
      "Independence of thought and freedom from dogma",
      "Refined philosophical discernment"
    ],
    shadowAndDrawbacks: [
      "Intellectual isolation and social withdrawal",
      "Skepticism turning into cold cynicism",
      "Difficulty trusting others or sharing emotional vulnerability",
      "Over-analyzing situations into paralysis",
      "Arrogance regarding personal intellectual superiority"
    ],
    relationshipsAndLove: {
      traits: "Intensely loyal, thoughtful, and deeply devoted once trust is established.",
      shadow: "Withdraws into solitude under stress, leaving partners feeling emotionally shut out.",
      coreLesson: "Share emotional processing in real time rather than retreating into solitary analysis."
    },
    careerAndProfessional: {
      environments: ["Scientific Research & Data Science", "Academic Philosophy & Theology", "Psychology & Psychiatry", "Specialized Technology & IT", "Investigative Writing"],
      naturalRoles: "Research Scientist, Analyst, Psychologist, Scholar, Technical Specialist.",
      workStyle: "Excels in quiet, independent roles focused on complex analytical or specialized research tasks."
    },
    moneyAndFinance: {
      pattern: "Values financial sufficiency as a means for intellectual independence rather than status.",
      advice: "Ensure practical financial details are reviewed regularly rather than neglected due to abstract focus."
    },
    healthTendencies: {
      vulnerabilities: ["Insomnia from overactive mind", "Neurological tension", "Melancholy"],
      careAdvice: "Engage in daily nature walks, quiet meditation, and regular physical grounding."
    },
    spiritualLesson: "True wisdom combines rigorous analysis with heart-centered faith and human connection. Solitary knowledge fulfills its purpose through shared service.",
    practicalGuidance: [
      "Engage in warm social conversations without intellectualizing.",
      "Practice expressing feelings as they occur rather than analyzing them later.",
      "Balance solitary study with active community contribution."
    ]
  },
  8: {
    number: 8,
    title: "The Material Master",
    keywords: ["Power", "Achievement", "Authority", "Mastery", "Legacy"],
    callingDefinition: "The Expression Number 8 reveals a calling toward material mastery, executive authority, large-scale organization, and the ethical management of power and resources.",
    meaning: "The 8 represents systemic mastery — understanding how financial, organizational, and material power operate, and building legacies that provide tangible security.",
    personalityAndCharacter: "Authoritative, resilient, strategic, and commanding. Possesses natural executive presence, high ambition, and the strength to handle heavy responsibility.",
    strengths: [
      "Executive leadership and systemic organization",
      "Financial acumen and strategic resource management",
      "Resilience through major material challenges",
      "Capacity to construct large-scale enterprises",
      "Direct, decisive problem-solving"
    ],
    shadowAndDrawbacks: [
      "Equating personal worth strictly with financial status",
      "Workaholism and sacrificing health or family for power",
      "Dominating behavior and intolerance for weakness",
      "Fear of losing control leading to micromanagement",
      "Rigidity in material expectations"
    ],
    relationshipsAndLove: {
      traits: "Deeply protective provider; expresses love through practical security and unwavering support.",
      shadow: "Difficulty showing emotional vulnerability or admitting personal fatigue.",
      coreLesson: "Vulnerability is true strength. True intimacy requires dropping executive armor."
    },
    careerAndProfessional: {
      environments: ["Corporate Management & Executive Leadership", "Finance, Banking & Asset Management", "Real Estate & Infrastructure", "Commercial Law & Litigation", "Large-Scale Enterprise"],
      naturalRoles: "CEO, Managing Director, Investment Strategist, Corporate Lawyer, Enterprise Founder.",
      workStyle: "Thrives in positions of significant responsibility, authority, and measurable output."
    },
    moneyAndFinance: {
      pattern: "Exceptional capacity for wealth creation, asset management, and commercial expansion.",
      advice: "Maintain strict ethical standards and guard against over-leveraging during rapid growth."
    },
    healthTendencies: {
      vulnerabilities: ["Cardiovascular strain", "Hypertension", "Joint and spine stress from chronic pressure"],
      careAdvice: "Implement non-negotiable physical exercise, cardiovascular wellness checks, and real leisure time."
    },
    spiritualLesson: "Power without integrity is force; wealth without wisdom is accumulation. True legacy comes from using material authority to uplift human lives.",
    practicalGuidance: [
      "Delegate responsibilities and trust team members' capabilities.",
      "Schedule non-work time for family and personal emotional renewal.",
      "Measure success by ethical impact alongside financial returns."
    ]
  },
  9: {
    number: 9,
    title: "The Universal Sage",
    keywords: ["Compassion", "Wisdom", "Service", "Completion", "Universal Love"],
    callingDefinition: "The Expression Number 9 reveals a calling toward universal compassion, human service, completion of cycles, and selfless wisdom.",
    meaning: "The 9 represents the culmination of all single-digit vibrations — integrating hard-won wisdom, universal empathy, non-possessive love, and guiding humanity toward higher understanding.",
    personalityAndCharacter: "Broad-minded, compassionate, artistic, and deeply idealistic. Possesses global perspective, accepting people from all walks of life without prejudice.",
    strengths: [
      "Universal empathy and broad human understanding",
      "Selfless dedication to humanitarian causes",
      "Artistic intuition and inspiring expression",
      "Wisdom in completing major life cycles",
      "Natural mentorship and healing presence"
    ],
    shadowAndDrawbacks: [
      "Difficulty letting go of completed relationships or projects",
      "Disillusionment when human reality falls short of high ideals",
      "Self-neglect and emotional martyrdom",
      "Scattering resources on impractical causes",
      "Aloofness or dramatic grief over lost ideals"
    ],
    relationshipsAndLove: {
      traits: "Offers deep, non-judgmental acceptance and loving understanding.",
      shadow: "May hold onto unviable relationships long past their natural completion out of obligation.",
      coreLesson: "Master non-attachment: love completely while releasing completed chapters with gratitude."
    },
    careerAndProfessional: {
      environments: ["Humanitarian Organizations & NGOs", "Higher Education & Global Teaching", "Fine Arts, Music & Literature", "Holistic Medicine & Therapy", "Environmental Leadership"],
      naturalRoles: "Humanitarian Director, Spiritual Educator, Author, International Consultant, Healer.",
      workStyle: "Flourishes when work serves a higher, broader purpose beyond personal financial gain."
    },
    moneyAndFinance: {
      pattern: "Money flows in naturally when aligned with universal service, but prone to impulsive giving.",
      advice: "Maintain practical financial reserves so humanitarian giving remains sustainable."
    },
    healthTendencies: {
      vulnerabilities: ["Emotional exhaustion from absorbing collective pain", "Immune depletion"],
      careAdvice: "Practise energetic boundary shielding, regular emotional cleansing, and adequate rest."
    },
    spiritualLesson: "Mastery of non-attachment: loving without possessiveness, giving without expectation, and honoring endings as gateways to renewal.",
    practicalGuidance: [
      "Release outdated situations or relationships with blessing and gratitude.",
      "Protect your physical energy reserves before helping others.",
      "Focus humanitarian efforts where tangible, lasting good can be accomplished."
    ]
  },

  // Master Numbers
  11: {
    number: 11,
    title: "The Master Visionary / Illumination",
    keywords: ["Intuition", "Illumination", "Spiritual Channel", "Vision", "Inspiration"],
    callingDefinition: "Expression 11 carries the Master vibration of spiritual illumination, heightened intuition, and inspiring visionary leadership.",
    meaning: "Expression 11 operates at a higher octave of 2. It acts as a bridge between spiritual perception and human awareness, calling the individual to inspire and enlighten others.",
    personalityAndCharacter: "Highly intuitive, sensitive, visionary, and charismatic. Often senses subtle energies and future trends long before others.",
    strengths: [
      "Profound intuitive illumination",
      "Inspirational leadership and charisma",
      "Artistic and philosophical original insights",
      "Elevating group consciousness"
    ],
    shadowAndDrawbacks: [
      "Nervous tension, anxiety, and sensory overload",
      "Extreme mood swings between master inspiration and base 2 self-doubt",
      "Impractical idealism without physical grounding"
    ],
    relationshipsAndLove: {
      traits: "Seeks deep soul connection, mutual spiritual resonance, and emotional understanding.",
      shadow: "Vulnerable to emotional exhaustion if partner lacks spiritual awareness.",
      coreLesson: "Ground spiritual sensitivity into daily emotional reality."
    },
    careerAndProfessional: {
      environments: ["Inspirational Speaking & Teaching", "Psychology & Spiritual Counseling", "Creative Arts & Philosophy"],
      naturalRoles: "Visionary Leader, Spiritual Author, Innovative Researcher, Inspirational Mentor.",
      workStyle: "Needs room for intuitive insight and authentic expression without rigid constraint."
    },
    moneyAndFinance: {
      pattern: "Wealth fluctuates based on alignment with higher purpose.",
      advice: "Ground visionary ideas into practical business structures."
    },
    healthTendencies: {
      vulnerabilities: ["Nervous system sensitivity", "Anxiety", "Sensory depletion"],
      careAdvice: "Daily physical grounding, quiet nature immersion, and nervous system nourishment."
    },
    spiritualLesson: "Channel higher inspiration into humble, daily human service without self-aggrandizement.",
    practicalGuidance: [
      "Ground intuitive visions with step-by-step practical action.",
      "Protect nervous system health through quiet routines."
    ]
  },
  22: {
    number: 22,
    title: "The Master Architect",
    keywords: ["Master Builder", "Global Vision", "Systemic Scale", "Practical Genius", "Legacy"],
    callingDefinition: "Expression 22 carries the Master vibration of building large-scale, world-changing structures, systems, and global legacies.",
    meaning: "Expression 22 combines the visionary insight of 11 with the practical discipline of 4, granting the capacity to turn grand spiritual or human ideals into permanent physical institutions.",
    personalityAndCharacter: "Commanding, practical, visionary, and far-sighted. Thinks in terms of global systems, infrastructure, and enduring institutions.",
    strengths: [
      "Unmatched master building capacity",
      "Translating abstract vision into physical infrastructure",
      "Systemic organization at massive scale",
      "High practical genius and discipline"
    ],
    shadowAndDrawbacks: [
      "Immense internal pressure and fear of failure",
      "Crushing perfectionism and overwork",
      "Falling back into base 4 rigidity when overwhelmed"
    ],
    relationshipsAndLove: {
      traits: "Rock-solid, fiercely protective, providing unmatched security and legacy for loved ones.",
      shadow: "Work obligations can consume all attention.",
      coreLesson: "Balance grand building commitments with intimate personal presence."
    },
    careerAndProfessional: {
      environments: ["Global Infrastructure & Technology Platforms", "Large-Scale Humanitarian Foundations", "Systemic Financial Architecture"],
      naturalRoles: "Master Architect, Platform Founder, Institutional Builder, Global Operations Leader.",
      workStyle: "Demands scale, significant resource responsibility, and freedom to execute grand blueprints."
    },
    moneyAndFinance: {
      pattern: "Vast wealth potential tied to large-scale institutional projects.",
      advice: "Ensure ethical stewardship of large financial resources."
    },
    healthTendencies: {
      vulnerabilities: ["Joint fatigue", "Nervous exhaustion from heavy responsibility"],
      careAdvice: "Delegate tasks and enforce mandatory rest cycles."
    },
    spiritualLesson: "Construct physical structures that serve human upliftment rather than personal ego.",
    practicalGuidance: [
      "Break massive global goals into achievable disciplined milestones.",
      "Pace ambition to prevent physical burnout."
    ]
  },
  33: {
    number: 33,
    title: "The Master Teacher & Universal Healer",
    keywords: ["Universal Healing", "Embodied Compassion", "Spiritual Mentorship", "Artistic Brilliance", "Protection"],
    callingDefinition: "Expression 33 carries the highest Master vibration of universal love, spiritual mentorship, self-transcendent healing, and artistic devotion.",
    meaning: "Expression 33 combines the creative expression of 3 with the practical nurturing of 6 and the spiritual master intensity of 33, acting as a selfless guide for humanity.",
    personalityAndCharacter: "Deeply compassionate, protective, artistically gifted, and spiritually elevated. Radiates an aura of unconditional love and comfort.",
    strengths: [
      "Selfless universal healing presence",
      "Spiritual mentorship and uplifting education",
      "Masterful creative and artistic expression",
      "Unshakable compassion for human suffering"
    ],
    shadowAndDrawbacks: [
      "Martyrdom complex and taking on the world's pain",
      "Severe burnout from lack of boundaries",
      "Neglecting personal needs to save others"
    ],
    relationshipsAndLove: {
      traits: "Profoundly loving, protective, and nurturing.",
      shadow: "Giving to others to the point of complete personal exhaustion.",
      coreLesson: "Practise healthy boundary setting; giving from fullness honors the self and partner."
    },
    careerAndProfessional: {
      environments: ["Global Healing Arts & Medicine", "Spiritual Education & Philanthropy", "Master Creative Arts"],
      naturalRoles: "Master Spiritual Teacher, Global Philanthropist, Universal Healer, Transformational Artist.",
      workStyle: "Flourishes when dedicated to uplifting, healing, and educating humanity."
    },
    moneyAndFinance: {
      pattern: "Wealth flows as a byproduct of selfless master service.",
      advice: "Build sustainable personal financial foundations to support ongoing service."
    },
    healthTendencies: {
      vulnerabilities: ["Kidney and throat sensitivity", "Emotional depletion"],
      careAdvice: "Prioritize self-restoration and energetic boundary protection."
    },
    spiritualLesson: "True master healing begins with self-reverence. Serve from abundance, not martyrdom.",
    practicalGuidance: [
      "Establish strict rest and boundary rules.",
      "Remember that tending to your own spirit empowers your universal work."
    ]
  }
};

export function getExpressionNumberAnalysis(num: number): ExpressionNumberAnalysis {
  return EXPRESSION_NUMBERS_DATABASE[num] || EXPRESSION_NUMBERS_DATABASE[1];
}
