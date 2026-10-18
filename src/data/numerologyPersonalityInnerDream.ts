// src/data/numerologyPersonalityInnerDream.ts
// Chapter Eleven: Personality Number, Inner Dream Number and Consonant Analysis
// Full comprehensive reference for Outer Persona, Secret Self-Image (Inner Dream), and Consonant Physics (1-9, 11, 22, 33) without personal case study examples.

export interface PersonalityAnalysis {
  number: number;
  title: string;
  keywords: string[];
  firstImpression: string;
  firstImpressionParagraphs: string[];
  gapBetweenOuterAndInner: string;
  gapParagraphs: string[];
  practicalGuidance: string[];
}

export interface InnerDreamAnalysis {
  number: number;
  title: string;
  keywords: string[];
  secretSelfImage: string;
  secretSelfParagraphs: string[];
  recognitionFlash: string;
  consultationIntegration: string[];
}

export interface ConsonantDetail {
  letter: string;
  chaldeanValue: number;
  pythagoreanValue: number;
  energeticTheme: string;
  detailedMeaning: string;
}

export interface PersonalityInnerDreamTheoryData {
  title: string;
  subtitle: string;
  quote: {
    text: string;
    author: string;
  };
  introParagraphs: string[];
  consonantPhysics: {
    definition: string;
    vowelsVsConsonants: string;
    calculationRules: string;
  };
  personalityVsInnerDream: {
    personalityRole: string;
    innerDreamRole: string;
    gapDiagnosticValue: string;
  };
}

export const PERSONALITY_INNER_DREAM_THEORY: PersonalityInnerDreamTheoryData = {
  title: "Personality Number, Inner Dream Number & Consonant Analysis",
  subtitle: "The Outer Face, The Secret Self, and the Structural Architecture of Name Consonants",
  quote: {
    text: "We all wear masks, and the time comes when we cannot remove them without removing some of our own skin.",
    author: "André Berthiaume"
  },
  introParagraphs: [
    "Every human being has at least two faces: the face they present to the world before genuine trust has been established, and the face that lives privately inside — the secret self, the unlived identity, the person they dream of being in their most honest moments.",
    "The Personality Number — calculated from the consonants only of the full birth name — describes the outer face: what others experience, what first impressions project, and what the social world receives before deeper knowing begins.",
    "The Inner Dream Number — derived from the exact same consonant calculations — describes the private face: the secret self-image, the unlived aspiration, and the identity the soul holds quietly regardless of what the outer life has actually produced."
  ],
  consonantPhysics: {
    definition: "Consonants carry the structural, edge-giving, architectural sound waves of a name. While vowels (Soul Urge) represent the inner emotional breath, consonants represent the outer consonantal skeleton that broadcasts into the external social environment.",
    vowelsVsConsonants: "Vowels = Soul Urge (Inner Emotional Hunger). Consonants = Personality & Inner Dream (Outer Social Interface & Secret Aspiration). Vowels + Consonants = Expression Number (Life Calling & Vocation).",
    calculationRules: "Identify all consonants (exclude A, E, I, O, U, and Y when acting as a vowel). Assign Chaldean (or Pythagorean) values, sum separately for first name, middle name, surname, and reduce to single digit or Master Number."
  },
  personalityVsInnerDream: {
    personalityRole: "The Personality Number answers: 'How do others experience me before they know me?' It explains recurring patterns in job interviews, social meetings, and initial impressions.",
    innerDreamRole: "The Inner Dream Number answers: 'Who do I secretly dream of being?' It explains the quiet longing beneath surface success and the flash of recognition felt when meeting someone living that ideal.",
    gapDiagnosticValue: "Comparing Personality, Expression, and Inner Dream reveals why people feel misread, why certain opportunities come easily, and how to align outer performance with inner truth."
  }
};

export const CONSONANT_DETAILS: Record<string, ConsonantDetail> = {
  R: {
    letter: "R",
    chaldeanValue: 2,
    pythagoreanValue: 9,
    energeticTheme: "Leadership Karma & Cooperative Authority",
    detailedMeaning: "In Chaldean numerology, R carries a Chaldean value of 2, imparting a repeated calling to leadership. Individuals with prominent R consonants naturally find themselves placed in positions of responsibility, where they must lead through diplomatic intelligence rather than brute force."
  },
  M: {
    letter: "M",
    chaldeanValue: 4,
    pythagoreanValue: 4,
    energeticTheme: "Maternal Karma & Practical Grounding",
    detailedMeaning: "M carries the value of 4 in both Chaldean and Pythagorean systems. It introduces a grounded, protective, highly reliable, and maternal architectural foundation into the name, projecting trustworthiness and methodical stability."
  },
  H: {
    letter: "H",
    chaldeanValue: 5,
    pythagoreanValue: 8,
    energeticTheme: "Material Consciousness & Versatile Change",
    detailedMeaning: "H carries Chaldean 5 (and Pythagorean 8), introducing adaptability, financial awareness, and material movement into the consonantal skeleton. It creates an outer field attuned to commerce, rapid pivots, and resource management."
  },
  S: {
    letter: "S",
    chaldeanValue: 3,
    pythagoreanValue: 1,
    energeticTheme: "Emotional Intensity & Magnetic Expression",
    detailedMeaning: "S carries Chaldean value 3, projecting expressive warmth, emotional intensity, and social magnetism. Names with prominent S consonants project a lively, feeling-driven presence that immediately animates social settings."
  },
  L: {
    letter: "L",
    chaldeanValue: 3,
    pythagoreanValue: 3,
    energeticTheme: "Communicative Flow & Aesthetic Balance",
    detailedMeaning: "L carries value 3, bringing communicative fluidity, grace, and artistic sensibility to the outer field. It softens rigid impressions and fosters social ease."
  },
  N: {
    letter: "N",
    chaldeanValue: 5,
    pythagoreanValue: 5,
    energeticTheme: "Versatile Curiosity & Dynamic Perception",
    detailedMeaning: "N carries value 5, contributing high mental speed, adaptability, and curiosity. It projects an engaging, quick-witted, and multi-faceted outer persona."
  },
  K: {
    letter: "K",
    chaldeanValue: 2,
    pythagoreanValue: 2,
    energeticTheme: "Intuitive Perception & Master Potential",
    detailedMeaning: "K carries value 2 (and represents 11 in initial letter placements), conferring heightened intuitive sensitivity, sharp perceptual radar, and quiet charisma."
  }
};

export const PERSONALITY_DATABASE: Record<number, PersonalityAnalysis> = {
  1: {
    number: 1,
    title: "The Confident Pioneer",
    keywords: ["Decisive Self-Assurance", "Independent Authority", "Bold Forward Energy"],
    firstImpression: "Projects immediate confidence, decisive self-direction, and an unmistakable aura of independent leadership.",
    firstImpressionParagraphs: [
      "A person with Personality Number 1 enters every environment projecting a quality of confident self-direction that others feel before a single word has been spoken.",
      "The outer field of Personality 1 carries purposeful forward momentum and a directness of attention that suggests this person knows what they want and will not wait for permission. People instinctively experience them as a natural authority figure.",
      "This outer quality opens doors swiftly in competitive professional settings, job interviews, and high-stakes meetings, where decisive leadership is immediately respected."
    ],
    gapBetweenOuterAndInner: "The confident, impenetrable exterior can conceal private vulnerability, doubt, or a quiet hunger for supportive partnership that others fail to offer because they assume the 1 needs no help.",
    gapParagraphs: [
      "What the confident exterior of Personality 1 consistently conceals is a considerably more complex interior than the outer field suggests.",
      "Many Personality 1 individuals carry real emotional need and a longing for genuine connection, but their projection of self-sufficiency actively deters others from offering care.",
      "When paired with a gentler Soul Urge (such as 2 or 6), this gap creates a persistent inner split: others treat them as an invulnerable leader, while privately their soul craves gentle belonging."
    ],
    practicalGuidance: [
      "Practise deliberate vulnerability with trusted allies to allow others to offer genuine support.",
      "Ask for collaborative input before making solitary decisions in team environments.",
      "Cultivate at least one relationship where you are comfortable not being the authority in charge."
    ]
  },
  2: {
    number: 2,
    title: "The Warm Diplomat",
    keywords: ["Gentle Sensitivity", "Cooperative Warmth", "Safe Trustworthy Presence"],
    firstImpression: "Creates an immediate sense of warmth, receptive listening, safety, and non-judgmental openness.",
    firstImpressionParagraphs: [
      "A person with Personality Number 2 creates an immediate impression of warmth, genuine attentiveness, and the specific quality of safety that allows others to relax.",
      "The outer field is receptive and non-judgmental. Strangers feel instantly comfortable opening up and sharing personal stories, sensing that their words will be held with care rather than evaluated.",
      "In professional settings, Personality 2 shines in mediation, counseling, team harmony, and client relations, where human empathy is the primary asset."
    ],
    gapBetweenOuterAndInner: "The accommodating exterior can cause others to underestimate the person's sharp analytical intelligence, firm convictions, and strategic ambition.",
    gapParagraphs: [
      "What the warm, accommodating exterior of Personality 2 consistently conceals is a considerably more assertive and ambitious interior than the outer field suggests.",
      "People who encounter the gentle outer manner frequently underestimate the strength of their actual convictions and the precision of their intellect.",
      "The main challenge is being overlooked for high-level strategic leadership because others mistake diplomatic kindness for lack of executive drive."
    ],
    practicalGuidance: [
      "Demonstrate firm opinions directly early in conversations before softening them.",
      "Maintain your stance under social pressure when your core principles are challenged.",
      "Step forward into leadership roles confidently without deflecting credit."
    ]
  },
  3: {
    number: 3,
    title: "The Radiant Communicator",
    keywords: ["Social Magnetism", "Expressive Brightness", "Creative Warmth"],
    firstImpression: "Radiates joy, social magnetism, expressive charm, and an uplifting communicative energy that brightens any room.",
    firstImpressionParagraphs: [
      "A person with Personality Number 3 projects a quality of brightness, expressive warmth, and social magnetism that others find immediately engaging.",
      "The outer field carries joyful communicative energy. Rooms lighten when Personality 3 enters; conversations flow more easily, and collective mood shifts toward optimism.",
      "They naturally excel in public representation, sales, creative media, teaching, and networking, where engaging an audience is crucial."
    ],
    gapBetweenOuterAndInner: "The bright, cheerful exterior can mask deep intellectual rigor, emotional complexity, or serious personal contemplation.",
    gapParagraphs: [
      "The most significant gap for Personality 3 is between the social brightness of the outer field and the genuine analytical depth of the interior.",
      "Many Personality 3 people are far more thoughtful, emotionally complex, and rigorous than their light social presentation suggests.",
      "Others may expect only surface entertainment from them, leading to frustration when they attempt to share serious, deeply analytical ideas."
    ],
    practicalGuidance: [
      "Deliberately introduce intellectual depth and serious analysis alongside your natural warmth.",
      "Allow moments of quiet contemplation to be visible rather than always performing brightness.",
      "Channel expressive energy into structured, long-term creative outputs."
    ]
  },
  4: {
    number: 4,
    title: "The Reliable Specialist",
    keywords: ["Serious Precision", "Methodical Trustworthiness", "Structural Competence"],
    firstImpression: "Projects solid dependability, methodical discipline, serious competence, and unwavering practical integrity.",
    firstImpressionParagraphs: [
      "A person with Personality Number 4 creates an immediate impression of serious, reliable competence and practical discipline.",
      "The outer field is measured, precise, and dependable. People instinctively feel this person keeps commitments, honors deadlines, and delivers high-quality work.",
      "In professional life, they are entrusted with critical operations, financial stewardship, engineering, and systems where error is unacceptable."
    ],
    gapBetweenOuterAndInner: "The serious, rigid exterior often hides a rich imaginative vision, playful warmth, and emotional flexibility once trust is established.",
    gapParagraphs: [
      "The gap for Personality 4 lies between the serious, structured outer mask and the creative, warm interior that exists beneath.",
      "Many Personality 4 individuals carry innovative creative vision and deep humor that they rarely reveal during initial encounters.",
      "As a result, colleagues may view them purely as traditional task executors rather than visionaries capable of designing brand new paradigms."
    ],
    practicalGuidance: [
      "Proactively share innovative, creative ideas in team brainstorms alongside structural plans.",
      "Allow your humor and warmth to show earlier in professional relationships.",
      "Practise flexibility when unexpected changes alter established schedules."
    ]
  },
  5: {
    number: 5,
    title: "The Dynamic Adventurer",
    keywords: ["Versatile Magnetism", "Engaging Energy", "Interesting Aliveness"],
    firstImpression: "Exudes magnetic vitality, versatility, sharp adaptability, and a captivating curiosity about life.",
    firstImpressionParagraphs: [
      "A person with Personality Number 5 projects a quality of dynamic, engaging energy that others find immediately interesting and magnetic.",
      "The outer field radiates authentic aliveness and curiosity. People sense that Personality 5 has fascinating stories, diverse experiences, and fresh perspectives.",
      "They thrive in fast-moving environments, public relations, travel, entrepreneurship, and innovation where rapid adaptation is rewarded."
    ],
    gapBetweenOuterAndInner: "The restless, change-seeking exterior can obscure a strong capacity for deep loyalty, long-term commitment, and disciplined focus.",
    gapParagraphs: [
      "The key gap for Personality 5 is between the restless, variety-seeking outer presentation and their inner capacity for sustained loyalty.",
      "The dynamic outer field can create an impression of impermanence, making others hesitate to entrust them with long-term foundational commitments.",
      "This creates frustration when the 5 wants to build something enduring, but others perceive them as fleeting or easily distracted."
    ],
    practicalGuidance: [
      "Demonstrate unwavering follow-through on key promises to prove your long-term reliability.",
      "Anchor your versatile energy around one core, long-term professional mastery.",
      "Verbalize your commitment to long-term partnerships explicitly."
    ]
  },
  6: {
    number: 6,
    title: "The Devoted Nurturer",
    keywords: ["Responsible Warmth", "Caring Attentiveness", "Beautiful Service"],
    firstImpression: "Emits comforting warmth, protective responsibility, artistic harmony, and a deeply caring presence.",
    firstImpressionParagraphs: [
      "A person with Personality Number 6 creates an immediate impression of warmth, genuine care, and responsible attentiveness.",
      "The outer field is oriented toward harmony and well-being. People feel protected and cared for in their presence, instinctively seeking their counsel.",
      "They excel in healthcare, teaching, interior design, hospitality, human resources, and community leadership where nurturing is paramount."
    ],
    gapBetweenOuterAndInner: "The endlessly supportive exterior can lead others to take them for granted, ignoring their personal boundaries and exhaustion.",
    gapParagraphs: [
      "The gap for Personality 6 lies between their projection of infinite availability and their actual human need for rest and reciprocity.",
      "Because the outer field signals constant willingness to help, others may dump burdens onto the 6 without offering care in return.",
      "This leads to silent depletion and resentment unless the 6 learns to establish firm personal boundaries."
    ],
    practicalGuidance: [
      "Establish explicit personal boundaries regarding your time and energy early on.",
      "Allow others to handle their own responsibilities without rushing in to fix them.",
      "Accept acts of care and support from others with open grace."
    ]
  },
  7: {
    number: 7,
    title: "The Thoughtful Analyst",
    keywords: ["Quiet Intellectual Depth", "Reserve", "Precise Careful Intelligence"],
    firstImpression: "Projects quiet intellectual dignity, analytical depth, poised reserve, and specialized expertise.",
    firstImpressionParagraphs: [
      "A person with Personality Number 7 creates an immediate impression of quiet depth, analytical precision, and thoughtful reserve.",
      "The outer field observes carefully before speaking. People perceive a serious mind that values truth over superficial social chatter.",
      "They command deep respect in research, technology, law, academia, psychology, and specialized technical fields."
    ],
    gapBetweenOuterAndInner: "The reserved, cool exterior can be mistaken for emotional coldness or detachment, hiding deep warmth and intense loyalty.",
    gapParagraphs: [
      "The gap for Personality 7 is between their reserved, analytical outer posture and the profound warmth and loyalty inside.",
      "The outer reserve often creates an impression of emotional distance or aloofness, causing others to hold back from intimacy.",
      "In reality, Personality 7 feels deeply and cares intensely, but requires time to feel safe before opening up."
    ],
    practicalGuidance: [
      "Show active warmth and interest in people through warm eye contact and questions.",
      "Communicate your feelings in real-time rather than waiting for complete mental processing.",
      "Explain your need for quiet solitude gently so loved ones do not feel rejected."
    ]
  },
  8: {
    number: 8,
    title: "The Authoritative Executive",
    keywords: ["Material Competence", "Executive Power", "Confident Capability"],
    firstImpression: "Commands immediate authority, executive competence, strategic capability, and material command.",
    firstImpressionParagraphs: [
      "A person with Personality Number 8 projects a quality of authority and material competence that others feel before words are spoken.",
      "The outer field is direct, powerful, and strategic. People instinctively look to Personality 8 for leadership, executive decisions, and commercial direction.",
      "They excel in business management, finance, real estate, law, and large-scale organizational leadership."
    ],
    gapBetweenOuterAndInner: "The formidable, powerful exterior conceals private vulnerability, emotional sensitivity, and a desire for genuine non-transactional care.",
    gapParagraphs: [
      "The gap for Personality 8 lies between the formidable, bulletproof outer mask and the vulnerable human interior.",
      "Because they project absolute capability, others rarely think to ask if the 8 needs help, emotional comfort, or rest.",
      "This creates a lonely burden where the 8 carries immense responsibility while secretly longing for someone to take care of them."
    ],
    practicalGuidance: [
      "Cultivate safe relationships where you can express uncertainty and drop the executive armor.",
      "Allow trusted partners to assist you with practical and emotional burdens.",
      "Ensure business power is balanced with genuine ethical compassion."
    ]
  },
  9: {
    number: 9,
    title: "The Wise Elder",
    keywords: ["Universal Compassion", "Accessible Wisdom", "Non-Judgmental Depth"],
    firstImpression: "Projects broad-minded wisdom, universal warmth, approachable empathy, and non-judgmental acceptance.",
    firstImpressionParagraphs: [
      "A person with Personality Number 9 creates an immediate impression of wisdom, broad compassion, and approachable depth.",
      "The outer field is expansive and welcoming. Strangers feel instantly safe pouring out their life struggles, sensing a soul that has seen much and judges nothing.",
      "They thrive in humanitarian endeavors, arts with social vision, global teaching, counseling, and spiritual guidance."
    ],
    gapBetweenOuterAndInner: "The universally welcoming exterior can obscure their specific personal needs, individual boundaries, and private desires.",
    gapParagraphs: [
      "The gap for Personality 9 is between their universal, open-door outer field and their personal, individual self.",
      "Because they welcome everyone equally, people may view them as an abstract source of wisdom rather than a specific person with personal needs.",
      "This can leave Personality 9 feeling surrounded by many seeking help, yet privately uncherished for who they individually are."
    ],
    practicalGuidance: [
      "Express your personal preferences, likes, and dislikes clearly to close friends.",
      "Protect your physical vitality by limiting how much emotional weight you carry for others.",
      "Ensure you receive specific, personal care in your close relationships."
    ]
  },

  // Master Numbers
  11: {
    number: 11,
    title: "The Electric Catalyst",
    keywords: ["High Intuitive Frequency", "Inspirational Aura", "Electric Sensitivity"],
    firstImpression: "Projects an intense, highly charged intuitive presence that inspires and magnetizes others instantly.",
    firstImpressionParagraphs: [
      "Personality 11 broadcasts an electric, highly intuitive frequency into social environments.",
      "Others sense an otherworldly insight and inspirational aura, often feeling elevated just standing in their field.",
      "They naturally draw people seeking spiritual direction, creative vision, and higher truth."
    ],
    gapBetweenOuterAndInner: "High nervous sensitivity can cause internal sensory overload that the outer charismatic image hides.",
    gapParagraphs: [
      "The gap involves managing extreme nervous system sensitivity while maintaining an inspirational outer presence.",
      "Privately, the 11 may struggle with self-doubt and anxiety while others view them as a luminous beacon."
    ],
    practicalGuidance: [
      "Ground high intuitive energy with calm nature immersion and quiet rest.",
      "Protect your nervous system from noisy, chaotic environments."
    ]
  },
  22: {
    number: 22,
    title: "The Master Architect Persona",
    keywords: ["Monumental Vision", "Systemic Authority", "Practical Genius"],
    firstImpression: "Projects massive structural capability, systemic vision, and world-building executive strength.",
    firstImpressionParagraphs: [
      "Personality 22 commands immense respect as a builder of enduring global platforms and systems.",
      "People perceive an extraordinary synthesis of high idealism and grounded practical power."
    ],
    gapBetweenOuterAndInner: "Internal pressure to manifest grand achievements can create hidden stress beneath calm competence.",
    gapParagraphs: [
      "The gap lies between the monumental outer capability and the heavy internal weight of global responsibility.",
      "The 22 must learn that small, consistent steps are as valuable as grand leaps."
    ],
    practicalGuidance: [
      "Delegate operational details to trusted partners to avoid physical burnout.",
      "Pace your ambitious building projects carefully."
    ]
  },
  33: {
    number: 33,
    title: "The Radiant Healer Persona",
    keywords: ["Universal Warmth", "Master Comfort", "Selfless Protection"],
    firstImpression: "Emits a transcendent, profoundly soothing aura of universal love, protection, and unconditional comfort.",
    firstImpressionParagraphs: [
      "Personality 33 projects an extraordinary vibrational warmth that heals and protects everyone nearby.",
      "People instinctively feel safe, uplifted, and spiritually nourished in their presence."
    ],
    gapBetweenOuterAndInner: "Risk of absorbing collective suffering and neglecting private physical self-care.",
    gapParagraphs: [
      "The gap involves giving immense universal comfort while privately neglecting personal boundaries.",
      "The 33 must remember that self-reverence is required to sustain universal service."
    ],
    practicalGuidance: [
      "Maintain strict personal quiet time for replenishment.",
      "Serve from overflowing joy rather than self-sacrificing martyrdom."
    ]
  }
};

export const INNER_DREAM_DATABASE: Record<number, InnerDreamAnalysis> = {
  1: {
    number: 1,
    title: "The Secret Pioneer",
    keywords: ["Original Creator", "Unshackled Independence", "Singular Legacy"],
    secretSelfImage: "Secretly dreams of being the courageous pioneer who stands alone, breaks new ground, and builds something undeniably original.",
    secretSelfParagraphs: [
      "Inner Dream 1 secretly holds the image of the pioneer — the person who went first, broke the mold, and stood for something original.",
      "However conventional or cooperative their outer life appears, there is a private narrative in which they are the sole author of a groundbreaking achievement.",
      "They long for the quiet satisfaction of knowing their name stands for a singular, irreplaceable contribution to the world."
    ],
    recognitionFlash: "Feels a sharp flash of quiet admiration and longing when witnessing someone boldly launch an independent venture on their own terms.",
    consultationIntegration: [
      "Acknowledge and validate the private desire for total creative independence.",
      "Find an area in current life where complete individual authority can be exercised.",
      "Align Expression calling with original personal ownership."
    ]
  },
  2: {
    number: 2,
    title: "The Secret Soulmate",
    keywords: ["Complete Belonging", "Unconditional Harmony", "Perfect Connection"],
    secretSelfImage: "Secretly dreams of complete, exquisite emotional unity — being fully known, deeply cherished, and peacefully aligned with a true partner.",
    secretSelfParagraphs: [
      "Inner Dream 2 secretly holds the image of the perfect companion — the soul who creates an untouchable sanctuary of love and harmony.",
      "This dream expresses itself as the private fantasy of a relationship where non-verbal understanding is complete and trust is absolute.",
      "Whatever outer achievements exist, the Inner Dream 2 measures true life wealth by the depth and peace of their intimate connection."
    ],
    recognitionFlash: "Feels deeply moved and tearful when witnessing deep, enduring, quiet devotion between lifelong partners.",
    consultationIntegration: [
      "Honor the deep need for relational harmony as a sacred life priority.",
      "Cultivate self-love so partnership is entered from wholeness rather than neediness.",
      "Integrate cooperative empathy into all professional endeavors."
    ]
  },
  3: {
    number: 3,
    title: "The Secret Artist",
    keywords: ["Luminous Voice", "Creative Brilliance", "Joyous Resonance"],
    secretSelfImage: "Secretly dreams of captivating the world with their creative voice, storytelling, humor, and artistic expression.",
    secretSelfParagraphs: [
      "Inner Dream 3 secretly holds the image of the creative voice — the artist, writer, or performer whose expression brings joy to thousands.",
      "They harbor a private conviction that their creative imagination carries profound gifts waiting for the courage to be fully released.",
      "Their soul longs to transform inner beauty and observations into words, art, performance, or music that lands deeply in others."
    ],
    recognitionFlash: "Feels a surge of inspiration and subtle envy when watching an artist or speaker touch an audience's heart effortlessly.",
    consultationIntegration: [
      "Dedicate daily time to private creative writing, painting, music, or speech.",
      "Release the fear of judgment and share authentic creative pieces publicly.",
      "Infuse joy and levity into routine professional duties."
    ]
  },
  4: {
    number: 4,
    title: "The Secret Master Builder",
    keywords: ["Tangible Craftsmanship", "Enduring Foundation", "Flawless Execution"],
    secretSelfImage: "Secretly dreams of constructing a solid, permanent masterwork — an enterprise, structure, or legacy that stands firm across generations.",
    secretSelfParagraphs: [
      "Inner Dream 4 secretly holds the image of the master builder — the craftsperson whose dedication creates something durable and excellent.",
      "They feel a private thrill in the presence of true craftsmanship, immaculate order, and long-term structural integrity.",
      "Their soul craves the quiet pride of standing before a completed, high-quality work and knowing it was built with total integrity."
    ],
    recognitionFlash: "Feels immense reverence when viewing historic architectural masterworks or meticulously engineered systems.",
    consultationIntegration: [
      "Commit to long-term projects requiring disciplined craftsmanship.",
      "Establish reliable, peaceful daily routines that foster inner security.",
      "Channel building desires into tangible physical or organizational structures."
    ]
  },
  5: {
    number: 5,
    title: "The Secret Voyager",
    keywords: ["Unbounded Freedom", "Thrilling Adventure", "Direct Experience"],
    secretSelfImage: "Secretly dreams of breaking free from all routine, traveling the open world, and living a life of vibrant, unconstrained adventure.",
    secretSelfParagraphs: [
      "Inner Dream 5 secretly holds the image of the courageous adventurer — the free spirit who tastes all of life without dogmatic fear.",
      "They harbor a quiet restlessness with repetitive domestic routines, longing to explore far-off cultures and novel ideas.",
      "Their soul desires to look back on life and know they lived every moment fully with authentic choice and zero regrets."
    ],
    recognitionFlash: "Feels a sudden pang of longing when reading travel memoirs or seeing explorers live unscripted, adventurous lives.",
    consultationIntegration: [
      "Inject regular travel, novel hobbies, and spontaneous weekend explorations into life.",
      "Reframe existing commitments as conscious choices rather than prisons.",
      "Incorporate mobility and variety into career pathways."
    ]
  },
  6: {
    number: 6,
    title: "The Secret Guardian & Homemaker",
    keywords: ["Harmonious Sanctuary", "Devoted Family", "Aesthetic Beauty"],
    secretSelfImage: "Secretly dreams of orchestrating a warm, beautiful, thriving family sanctuary where everyone is deeply loved, nourished, and safe.",
    secretSelfParagraphs: [
      "Inner Dream 6 secretly holds the image of the beloved guardian — the heart of a vibrant, loving, beautiful home and community.",
      "They harbor a private vision of exquisite domestic beauty, warm gatherings, and deep, reciprocal family devotion.",
      "Their soul hungers to curate spaces and relationships that feel like an oasis of peace against a harsh world."
    ],
    recognitionFlash: "Feels deeply touched when entering a home radiating warmth, laughter, delicious aromas, and genuine family love.",
    consultationIntegration: [
      "Prioritize curating a peaceful, aesthetically pleasing living environment.",
      "Invest deeply in family bonds while preserving personal boundaries.",
      "Bring nurturing care into professional service projects."
    ]
  },
  7: {
    number: 7,
    title: "The Secret Sage",
    keywords: ["Profound Wisdom", "Hidden Truth", "Spiritual Enlightenment"],
    secretSelfImage: "Secretly dreams of uncovering life's ultimate mysteries, mastering deep esoteric or scientific truth, and possessing quiet spiritual wisdom.",
    secretSelfParagraphs: [
      "Inner Dream 7 secretly holds the image of the revered sage — the seeker who discovers the hidden laws governing existence.",
      "They harbor a private longing for undisturbed quiet reflection, high intellectual mastery, and profound intuitive clarity.",
      "Their soul seeks the quiet dignity of being sought out by key leaders for deep, irreplaceable wisdom."
    ],
    recognitionFlash: "Feels profound resonance in the presence of genuine spiritual masters, quiet scholars, or solitary thinkers.",
    consultationIntegration: [
      "Carve out sacred daily periods of solitude, reading, and meditation.",
      "Trust your private intuitive insights and articulate them when ready.",
      "Align career pursuits with genuine intellectual or spiritual research."
    ]
  },
  8: {
    number: 8,
    title: "The Secret Executive Captain",
    keywords: ["Commanding Influence", "Financial Supremacy", "Grand Scale Legacy"],
    secretSelfImage: "Secretly dreams of wielding massive material influence, leading a thriving empire, and achieving grand financial independence.",
    secretSelfParagraphs: [
      "Inner Dream 8 secretly holds the image of the formidable captain of industry — the leader who commands vast resources for noble ends.",
      "They carry a private measure of success that is far larger than their current outer life, longing for real material leverage.",
      "Their soul craves the experience of absolute executive capability, financial mastery, and philanthropic power."
    ],
    recognitionFlash: "Feels a sharp competitive stir and recognition when encountering visionary CEOs and major empire builders.",
    consultationIntegration: [
      "Step into high-level commercial or leadership responsibilities without fear.",
      "Master financial intelligence and strategic resource management.",
      "Pair material ambition with high ethical purpose."
    ]
  },
  9: {
    number: 9,
    title: "The Secret World Benefactor",
    keywords: ["Universal Service", "Humanitarian Impact", "Transcendent Legacy"],
    secretSelfImage: "Secretly dreams of performing grand humanitarian service, uplifting thousands of lives, and leaving the world vastly better.",
    secretSelfParagraphs: [
      "Inner Dream 9 secretly holds the image of the world benefactor — the compassionate soul whose life touched humanity deeply.",
      "They carry a persistent private question about whether their daily effort truly matters on a universal scale.",
      "Their soul hungers for the profound experience of selfless contribution, universal love, and transcendent legacy."
    ],
    recognitionFlash: "Feels deep emotional tears and elevation when witnessing selfless humanitarian relief work or heroic global philanthropy.",
    consultationIntegration: [
      "Engage in direct, meaningful community or global service projects.",
      "Ensure work aligns with core human values rather than pure transaction.",
      "Practice compassionate non-attachment in personal relationships."
    ]
  },

  // Master Numbers
  11: {
    number: 11,
    title: "The Secret Mystic Illuminator",
    keywords: ["Spiritual Channel", "Inspirational Light", "Divine Truth"],
    secretSelfImage: "Secretly dreams of being a pure channel of spiritual light, awakening human consciousness through divine inspiration.",
    secretSelfParagraphs: [
      "Inner Dream 11 secretly longs to act as a bridge between spiritual dimensions and human awareness.",
      "They dream of illuminating others' lives with effortless intuitive wisdom and high creative inspiration."
    ],
    recognitionFlash: "Feels electric chills when hearing profound spiritual revelations or transcendent music.",
    consultationIntegration: [
      "Trust your intuitive perceptions and share spiritual insights humbly.",
      "Ground high electrical frequency through quiet nature connection."
    ]
  },
  22: {
    number: 22,
    title: "The Secret World Builder",
    keywords: ["Global Systems", "Enduring Architecture", "Master Manifestation"],
    secretSelfImage: "Secretly dreams of building permanent global institutions and physical structures that serve humanity for centuries.",
    secretSelfParagraphs: [
      "Inner Dream 22 harbors a grand vision of organizing global resources into practical, enduring structures of good."
    ],
    recognitionFlash: "Feels awe when viewing global infrastructure projects or humanitarian platforms.",
    consultationIntegration: [
      "Synthesize high intuitive vision with rigorous daily execution.",
      "Build platforms that empower large numbers of people."
    ]
  },
  33: {
    number: 33,
    title: "The Secret Master Healer",
    keywords: ["Universal Love", "Transcendent Comfort", "Divine Protection"],
    secretSelfImage: "Secretly dreams of offering unconditional, master-level healing and protection to suffering souls everywhere.",
    secretSelfParagraphs: [
      "Inner Dream 33 carries a supreme private longing to comfort collective pain through pure, embodied divine love."
    ],
    recognitionFlash: "Feels profound emotional surges when witnessing acts of pure, self-sacrificing compassion.",
    consultationIntegration: [
      "Offer healing presence from personal abundance and self-reverence.",
      "Embrace master mentorship roles in spiritual or healing communities."
    ]
  }
};

export function getPersonalityAnalysis(num: number): PersonalityAnalysis {
  return PERSONALITY_DATABASE[num] || PERSONALITY_DATABASE[1];
}

export function getInnerDreamAnalysis(num: number): InnerDreamAnalysis {
  return INNER_DREAM_DATABASE[num] || INNER_DREAM_DATABASE[1];
}
