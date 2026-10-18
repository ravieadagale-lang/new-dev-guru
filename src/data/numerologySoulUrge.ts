// src/data/numerologySoulUrge.ts
// Chapter Ten: Soul Urge Number — The Heart's Deepest Desire
// Full comprehensive reference for Soul Urge (Heart's Desire) Numbers (1-9, 11, 22, 33) without personal case study examples.

export interface SoulUrgeAnalysis {
  number: number;
  title: string;
  keywords: string[];
  soulHunger: string;
  definition: string;
  whenFulfilled: string;
  whenUnfulfilled: string;
  relationshipsAndLove: {
    traits: string;
    challenge: string;
    growthEdge: string;
  };
  careerAndWork: {
    requiredEnvironment: string;
    idealFields: string[];
    motivatingQuestion: string;
  };
  spiritualLesson: string;
  practicalGuidance: string[];
}

export interface SoulUrgeTheoryData {
  title: string;
  subtitle: string;
  quote: {
    text: string;
    author: string;
  };
  expressionVsSoulUrge: {
    expressionRole: string;
    soulUrgeRole: string;
    harmoniousState: string;
    conflictedState: string;
    integrationGoal: string;
  };
  vowelCalculationRules: {
    vowelsIncluded: string[];
    letterYRule: string;
    chaldeanVsPythagoreanNote: string;
  };
}

export const SOUL_URGE_THEORY: SoulUrgeTheoryData = {
  title: "Soul Urge Number — The Heart's Deepest Desire",
  subtitle: "The Inner Voice of the Soul, Private Longings & Emotional Fulfillment",
  quote: {
    text: "The longest journey you will ever take is the eighteen inches from your head to your heart.",
    author: "Andrew Bennett"
  },
  expressionVsSoulUrge: {
    expressionRole: "The Expression Number describes what a person is built to do — their natural vocation, outer talents, and life destiny.",
    soulUrgeRole: "The Soul Urge (Heart's Desire) describes what a person most deeply needs in order to feel their life is genuinely worth living.",
    harmoniousState: "When Expression and Soul Urge harmonise, work feels authentic, effort feels purposeful, and success produces deep inner satisfaction.",
    conflictedState: "When Expression and Soul Urge conflict, the person experiences a persistent inner split — succeeding at what they are built for while feeling quietly unfulfilled inside.",
    integrationGoal: "The goal is never to suppress either number, but to find the specific form of the Expression's work that genuinely honors the Soul Urge's deep hunger."
  },
  vowelCalculationRules: {
    vowelsIncluded: ["A", "E", "I", "O", "U"],
    letterYRule: "Y is treated as a vowel ONLY when it carries the primary vowel sound in a syllable (e.g., GLYN, MARY, STACY) or is the sole vowel in the name.",
    chaldeanVsPythagoreanNote: "Chaldean calculates vowel frequencies empirically (Values 1-8). Pythagorean uses linear values (A=1, E=5, I=9, O=6, U=3). When both systems agree, the soul quality is doubly confirmed."
  }
};

export const SOUL_URGE_DATABASE: Record<number, SoulUrgeAnalysis> = {
  1: {
    number: 1,
    title: "The Need to Lead and Be Recognised",
    keywords: ["Independence", "Self-Direction", "Personal Authority", "Originality"],
    soulHunger: "A soul-level hunger for genuine independence — to direct one's own life, make solitary decisions, and take one's own path without requiring permission or validation from external authority.",
    definition: "Soul Urge 1 carries an imperative to be an original creator and pioneer. It craves being recognized as the source of a distinct, valuable contribution rather than part of an anonymous crowd.",
    whenFulfilled: "Alive, highly energetic, and immensely productive. Works with sustained enthusiasm and exhibits remarkable generosity because the scarcity driving shadow behavior vanishes.",
    whenUnfulfilled: "Irritable, micromanaging, and overly controlling in small matters. Frustrated by hierarchies where original contribution is absorbed without credit.",
    relationshipsAndLove: {
      traits: "Thrives with a strong, independent partner who possesses a clear identity and respects the 1's need for autonomy.",
      challenge: "Solo emotional processing — attempting to solve feelings privately rather than bringing vulnerability into the relationship.",
      growthEdge: "Developing genuine sharing: allowing a partner to be present when things are uncertain or unraveled."
    },
    careerAndWork: {
      requiredEnvironment: "Autonomous leadership, entrepreneurship, or independent specialist roles where individual vision drives outcomes.",
      idealFields: ["Entrepreneurship", "Executive Leadership", "Independent Creative Arts", "Pioneering Research"],
      motivatingQuestion: "Is this vision and accomplishment genuinely mine?"
    },
    spiritualLesson: "Genuine individuality is not threatened by authentic connection. The self that can afford to love freely and need openly is stronger than one keeping others at a distance.",
    practicalGuidance: [
      "Secure at least one domain of life where you possess complete creative authority.",
      "Practise sharing unformed thoughts and vulnerabilities with a trusted partner.",
      "Acknowledge others' contributions without feeling it diminishes your own leadership."
    ]
  },
  2: {
    number: 2,
    title: "The Need to Belong and Be Loved",
    keywords: ["Partnership", "Harmony", "Genuine Connection", "Being Truly Known"],
    soulHunger: "A profound hunger for authentic belonging — the irreplaceable experience of being truly known in one's full complexity and genuinely chosen by another.",
    definition: "Soul Urge 2 finds its deepest meaning in the quality of relationships. Discord and conflict are physically painful to this receptive, attuned soul.",
    whenFulfilled: "Luminous, extraordinarily attentive, and empathetic. Makes others feel completely safe, truly seen, and deeply valued.",
    whenUnfulfilled: "Suffers a quiet, accumulating withdrawal of aliveness and vitality when isolated or paired with an emotionally unavailable partner.",
    relationshipsAndLove: {
      traits: "Deeply devoted, sensitive, and focused on building an intimate emotional sanctuary.",
      challenge: "Losing individual identity inside the relationship; adopting partner's emotional state entirely.",
      growthEdge: "Developing a secure individual identity that exists independently alongside the partnership."
    },
    careerAndWork: {
      requiredEnvironment: "Collaborative, human-centered roles where relational intelligence, mediation, and empathy are primary.",
      idealFields: ["Counseling & Therapy", "Healthcare & Nursing", "Diplomacy & Human Resources", "Social Work"],
      motivatingQuestion: "Does this work foster genuine human connection and harmony?"
    },
    spiritualLesson: "Discovering the self that exists independently of relationships paradoxically makes authentic relationship more possible and enduring.",
    practicalGuidance: [
      "Establish personal boundaries to prevent absorbing others' negative emotional weather.",
      "Cultivate personal hobbies that belong exclusively to you.",
      "Communicate needs directly rather than hoping others intuitively guess them."
    ]
  },
  3: {
    number: 3,
    title: "The Need to Express and Be Heard",
    keywords: ["Creativity", "Joy", "Communication", "Self-Expression", "Connection"],
    soulHunger: "A deep soul hunger to give creative form to inner feelings, imagination, and observation, and to have that expression genuinely received and heard by others.",
    definition: "Soul Urge 3 craves joy, warmth, humor, and aesthetic playfulness. It suffocates in relentlessly solemn or overly rigid environments.",
    whenFulfilled: "Radiates contagious enthusiasm, joy, and inspiration. Uplifts everyone in their presence and shares creative energy abundantly.",
    whenUnfulfilled: "Becomes quietly depressed or scatters energy into superficial charm, gossip, or dramatic emotional deflections.",
    relationshipsAndLove: {
      traits: "Spontaneous, romantic, and skilled at keeping shared life joyful and creative.",
      challenge: "Deflecting serious or uncomfortable emotional conversations with humor or changing the subject.",
      growthEdge: "Staying present during difficult emotional moments, recognizing intimacy grows through hard conversations."
    },
    careerAndWork: {
      requiredEnvironment: "Creative, expressive space with room for artistic voice, public communication, and varied projects.",
      idealFields: ["Writing & Journalism", "Performing Arts & Design", "Public Speaking", "Teaching & Media"],
      motivatingQuestion: "Does this allow me to share my authentic creative voice?"
    },
    spiritualLesson: "Discipline deepens creative genius. Working patiently through difficult project phases yields far richer fulfillment than fleeting inspiration.",
    practicalGuidance: [
      "Finish major creative projects before jumping to new ideas.",
      "Practise emotional honesty without deflecting through levity.",
      "Dedicate daily time to creative writing, art, or vocal expression."
    ]
  },
  4: {
    number: 4,
    title: "The Need for Security and Lasting Foundation",
    keywords: ["Stability", "Order", "Reliable Structure", "Tangible Achievement"],
    soulHunger: "A soul-level requirement for genuine security, reliable structures, order, and seeing sustained effort produce something solid and lasting.",
    definition: "Soul Urge 4 needs to know the ground beneath their feet is firm. It finds deep satisfaction in tangible craftsmanship, order, and dependable commitments.",
    whenFulfilled: "Remarkably steady, productive, and reliable. Performs high-quality, enduring work with quiet, unshakeable consistency.",
    whenUnfulfilled: "Anxious, overly rigid, and obsessively clingy to minor rules when external environments are unstable or unpredictable.",
    relationshipsAndLove: {
      traits: "Rock-solid, devoted, and expresses love through practical protection and long-term reliability.",
      challenge: "Processing feelings internally and slowly, which partners can mistake for emotional distance.",
      growthEdge: "Learning to express inner warmth and affection explicitly in words and emotional presence."
    },
    careerAndWork: {
      requiredEnvironment: "Structured, stable environments valuing high technical standards, methodology, and tangible outputs.",
      idealFields: ["Engineering & Construction", "Architecture", "Accounting & Law", "Operations & Systems Management"],
      motivatingQuestion: "Is this building a solid, lasting foundation for the future?"
    },
    spiritualLesson: "Discovering inner security that does not depend on external stability brings true peace under any circumstances.",
    practicalGuidance: [
      "Practise flexibility when unexpected changes alter your plans.",
      "Verbalize your love and appreciation to family members frequently.",
      "Build work habits that allow for rest alongside disciplined output."
    ]
  },
  5: {
    number: 5,
    title: "The Need for Freedom and Experience",
    keywords: ["Freedom", "Variety", "Adventure", "Aliveness", "Genuine Choice"],
    soulHunger: "A visceral soul requirement for direct, varied experience, moment-to-moment freedom of choice, and non-confinement.",
    definition: "Soul Urge 5 craves tasting life directly — exploring diverse places, ideas, and human encounters without rigid dogmatic constraints.",
    whenFulfilled: "Vibrant, captivatingly alive, and inspiring. Adapts swiftly to unexpected changes and infuses energy into every room.",
    whenUnfulfilled: "Restless, irritable, and vulnerable to unhealthy addictive habits or impulsive escapism when trapped in routine.",
    relationshipsAndLove: {
      traits: "Exciting, fun-loving, and deeply attentive to keeping romance dynamic and fresh.",
      challenge: "Resisting long-term commitment out of fear that closeness equals entrapment.",
      growthEdge: "Realizing that committed love, consciously chosen, is not a cage but life's greatest adventure."
    },
    careerAndWork: {
      requiredEnvironment: "Dynamic, versatile roles offering travel, flexible hours, and diverse human engagement.",
      idealFields: ["Entrepreneurship & Sales", "Journalism & Travel", "Consulting & Events", "Media & Innovation"],
      motivatingQuestion: "Does this path offer genuine space for growth, variety, and choice?"
    },
    spiritualLesson: "True freedom is not the absence of roots, but the presence of conscious choice. Fully inhabiting chosen commitments expands true power.",
    practicalGuidance: [
      "Channel physical restlessness into travel or outdoor adventure.",
      "Anchor freedom by choosing one core long-term life goal to master.",
      "Distinguish between healthy exploration and avoidant running away."
    ]
  },
  6: {
    number: 6,
    title: "The Need to Love and Be Needed",
    keywords: ["Nurturing Love", "Family", "Beauty", "Devotion", "Responsible Care"],
    soulHunger: "A deep soul hunger to love, protect, and be genuinely needed by specific loved ones, creating warmth and aesthetic harmony.",
    definition: "Soul Urge 6 comes alive when tending to others — making homes, relationships, and communities safer, warmer, and more beautiful.",
    whenFulfilled: "Extraordinary caretaker, nurturer, and creator of emotional safety. Builds enduring family and community bonds.",
    whenUnfulfilled: "Exhausted, martyr-like, and resentful when care is taken for granted or when over-interfering in others' choices.",
    relationshipsAndLove: {
      traits: "Profoundly devoted, warm, and attentive to anticipating partner and family needs.",
      challenge: "Difficulty receiving care from others; connecting self-worth exclusively to the giving role.",
      growthEdge: "Learning to receive care with grace, and allowing loved ones to handle their own challenges."
    },
    careerAndWork: {
      requiredEnvironment: "Service-oriented, aesthetic, or supportive environments dedicated to improving quality of human life.",
      idealFields: ["Healthcare & Nursing", "Teaching & Counseling", "Interior Design & Hospitality", "Social Services"],
      motivatingQuestion: "Does this work nurture and beautify the lives of those I serve?"
    },
    spiritualLesson: "Love must flow from internal abundance, not obligation. Caring for oneself is required to sustain genuine care for others.",
    practicalGuidance: [
      "Allow others to fix their own mistakes without stepping in.",
      "Accept acts of kindness and help from others with gratitude.",
      "Designate personal quiet hours solely for your own rejuvenation."
    ]
  },
  7: {
    number: 7,
    title: "The Need to Understand and Know Deeply",
    keywords: ["Wisdom", "Truth", "Solitude", "Inner Life", "Genuine Understanding"],
    soulHunger: "A quiet, persistent hunger to comprehend the deep structure of life — seeking truth, spiritual insight, and genuine self-knowledge.",
    definition: "Soul Urge 7 requires solitude and quiet investigation. It cannot settle for surface answers or superficial social chatter.",
    whenFulfilled: "Possesses profound wisdom, analytical depth, and intuitive clarity that guides others toward genuine understanding.",
    whenUnfulfilled: "Withdrawn, emotionally distant, skeptical, and mentally drained when denied quiet reflective space.",
    relationshipsAndLove: {
      traits: "Intensely loyal, perceptive, and deeply devoted once trust is earned.",
      challenge: "Retreating into solitary analysis under stress without explaining feelings to partners.",
      growthEdge: "Practising real-time communication of feelings rather than waiting until internal processing is complete."
    },
    careerAndWork: {
      requiredEnvironment: "Quiet, independent research or technical space where deep specialized inquiry is valued over speed.",
      idealFields: ["Scientific & Data Research", "Philosophy & Theology", "Psychology & Psychiatry", "Technology & Writing"],
      motivatingQuestion: "Does this endeavor allow me to discover and master fundamental truth?"
    },
    spiritualLesson: "Faith is the willingness to act in the presence of uncertainty. Deepest wisdom requires embodied experience alongside mental analysis.",
    practicalGuidance: [
      "Schedule daily periods of quiet solitude and nature reflection.",
      "Share your thoughts with loved ones before your analysis is fully finished.",
      "Balance intellectual pursuits with grounded physical activity."
    ]
  },
  8: {
    number: 8,
    title: "The Need for Power and Material Achievement",
    keywords: ["Authority", "Mastery", "Influence", "Tangible Success", "Recognition"],
    soulHunger: "A soul-level hunger for genuine authority, executive capability, and building measurable, tangible success in the material world.",
    definition: "Soul Urge 8 craves shaping circumstances and commanding resources. It needs to feel capable of affecting the world at scale.",
    whenFulfilled: "Formidable, strategically brilliant, and highly generous. Constructs large-scale enterprises that create lasting security.",
    whenUnfulfilled: "Domineering, micromanaging, and anxious, using rigid control over small matters to compensate for lack of real authority.",
    relationshipsAndLove: {
      traits: "Fierce protector and provider; expresses devotion through practical security and unwavering support.",
      challenge: "Showing vulnerability or admitting personal fatigue to a partner.",
      growthEdge: "Allowing a partner to see uncertainty and need, realizing vulnerability is true strength."
    },
    careerAndWork: {
      requiredEnvironment: "High-level executive, commercial, or entrepreneurial roles with clear scope for material accomplishment.",
      idealFields: ["Executive Management & Business", "Finance & Investment", "Real Estate & Infrastructure", "Commercial Law"],
      motivatingQuestion: "Does this venture build tangible power, resources, and lasting impact?"
    },
    spiritualLesson: "Power without integrity is force; wealth without wisdom is accumulation. True legacy comes from using authority to serve others.",
    practicalGuidance: [
      "Practise delegating authority and trusting team members.",
      "Share your inner fears or fatigue with your partner.",
      "Align business ambition with ethical human upliftment."
    ]
  },
  9: {
    number: 9,
    title: "The Need to Serve and Contribute Meaningfully",
    keywords: ["Universal Love", "Compassion", "Legacy", "Meaning", "Service"],
    soulHunger: "A profound soul hunger to contribute meaningfully to humanity — leaving the world better and participating in something larger than personal gain.",
    definition: "Soul Urge 9 requires life to feel purposeful. It cannot sustain engagement with purely transactional or meaningless tasks.",
    whenFulfilled: "Selflessly dedicated, luminous, and broad-minded. Offers boundless compassion, wisdom, and universal mentorship.",
    whenUnfulfilled: "Existentially desolated, emotionally burnt out, or holding onto completed relationships long past their natural end.",
    relationshipsAndLove: {
      traits: "Offers non-possessive, deeply understanding love, accepting partners in their complete complexity.",
      challenge: "Difficulty with endings; clinging to unviable connections out of reluctance to let go of love.",
      growthEdge: "Learning conscious, loving release — ending chapters with genuine gratitude when their purpose is fulfilled."
    },
    careerAndWork: {
      requiredEnvironment: "Humanitarian, educational, or artistic space where work serves a higher, collective purpose.",
      idealFields: ["Humanitarian NGOs", "Teaching & Mentorship", "Arts with Social Purpose", "Healing & Spiritual Guidance"],
      motivatingQuestion: "Does this work meaningfully serve humanity and touch real lives?"
    },
    spiritualLesson: "Mastery of non-attachment: loving fully, giving completely, while holding life lightly enough to release completed cycles with grace.",
    practicalGuidance: [
      "Release outdated projects or relationships with blessing and gratitude.",
      "Protect your physical energy reserves before taking on others' burdens.",
      "Focus your service where direct, tangible good can be accomplished."
    ]
  },

  // Master Numbers
  11: {
    number: 11,
    title: "The Need for Spiritual Illumination",
    keywords: ["Spiritual Channel", "Intuitive Vision", "Illumination", "Higher Calling"],
    soulHunger: "An intense soul hunger to act as a spiritual channel, illuminating higher truths and inspiring human consciousness.",
    definition: "Soul Urge 11 functions as an intuitive bridge between physical reality and spiritual vision. It craves authentic inspiration and uplifting service.",
    whenFulfilled: "Inspirational, deeply intuitive, and charismatic, lighting up others' spiritual potential.",
    whenUnfulfilled: "Plagued by severe nervous anxiety, sensory overload, and self-doubt when operating at base 2 level.",
    relationshipsAndLove: {
      traits: "Seeks profound soul resonance, emotional transparency, and shared spiritual purpose.",
      challenge: "Managing extreme emotional sensitivity in daily domestic routines.",
      growthEdge: "Grounding high spiritual perception into practical daily kindness."
    },
    careerAndWork: {
      requiredEnvironment: "Inspirational, visionary space with freedom to teach, write, or counsel intuitively.",
      idealFields: ["Spiritual Mentorship & Counseling", "Inspirational Writing & Speaking", "Intuitive Arts"],
      motivatingQuestion: "Does this illuminate truth and inspire human consciousness?"
    },
    spiritualLesson: "Channel higher inspiration into humble daily human service without self-importance.",
    practicalGuidance: [
      "Nourish your nervous system through quiet nature immersion.",
      "Ground intuitive visions with structured practical steps."
    ]
  },
  22: {
    number: 22,
    title: "The Need for Master Building & Legacy",
    keywords: ["Master Builder", "Systemic Vision", "Global Impact", "Practical Genius"],
    soulHunger: "A soul hunger to manifest grand spiritual or humanitarian blueprints into permanent physical institutions.",
    definition: "Soul Urge 22 combines high visionary intuition with practical building discipline to construct lasting global systems.",
    whenFulfilled: "Constructs world-changing platforms, infrastructure, and enduring institutions.",
    whenUnfulfilled: "Overwhelmed by crushing internal performance pressure and fear of failing a grand calling.",
    relationshipsAndLove: {
      traits: "Provides rock-solid security and unwavering devotion to partners and family.",
      challenge: "Work commitments consuming all personal time and emotional energy.",
      growthEdge: "Balancing grand building commitments with intimate personal presence."
    },
    careerAndWork: {
      requiredEnvironment: "Large-scale institutional or platform environments with massive structural responsibility.",
      idealFields: ["Global Infrastructure", "Technology Platforms", "International Philanthropy"],
      motivatingQuestion: "Is this building an enduring legacy that serves generations?"
    },
    spiritualLesson: "Construct physical structures that uplift human lives rather than serve personal ego.",
    practicalGuidance: [
      "Pace your ambitious building goals to prevent physical collapse.",
      "Delegate operational details to trusted team members."
    ]
  },
  33: {
    number: 33,
    title: "The Need for Master Healing & Compassion",
    keywords: ["Universal Healing", "Master Mentorship", "Unconditional Love", "Protection"],
    soulHunger: "A supreme soul hunger to offer selfless, universal healing, spiritual protection, and compassionate mentorship.",
    definition: "Soul Urge 33 represents embodied universal love — caring for collective suffering from personal abundance.",
    whenFulfilled: "Radiates comfort, master spiritual guidance, and transcendent healing presence.",
    whenUnfulfilled: "Falls into martyrdom, taking on the world's pain until complete physical and emotional breakdown occurs.",
    relationshipsAndLove: {
      traits: "Profoundly loving, protective, and nurturing to partners and community.",
      challenge: "Giving to others to the point of complete self-neglect.",
      growthEdge: "Establishing firm emotional boundaries and serving from fullness."
    },
    careerAndWork: {
      requiredEnvironment: "Global healing, spiritual education, or master philanthropic environments.",
      idealFields: ["Global Healing Arts", "Spiritual Academies", "Universal Philanthropy"],
      motivatingQuestion: "Does this offer unconditional healing and protection to humanity?"
    },
    spiritualLesson: "True master healing begins with self-reverence. Serve from fullness, not martyrdom.",
    practicalGuidance: [
      "Enforce strict daily rest and boundary rules.",
      "Remember that tending your own spirit empowers your universal work."
    ]
  }
};

export function getSoulUrgeAnalysis(num: number): SoulUrgeAnalysis {
  return SOUL_URGE_DATABASE[num] || SOUL_URGE_DATABASE[1];
}
