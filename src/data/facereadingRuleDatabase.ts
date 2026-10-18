import { 
  FaceShapeClass, 
  WuXingElement, 
  ShiErGongPalace,
  ZoneBalance
} from "../types/facereading";

export interface FaceShapeRule {
  shape: FaceShapeClass;
  title: string;
  structuralMarkers: string;
  temperamentReading: string;
  strengths: string[];
  growthAreas: string[];
  elementAssociation: WuXingElement;
}

export const FACE_READING_DATABASE_V2 = {
  meta: {
    module: "faceReading",
    usage: "Rule engine looks up detected feature values here to retrieve full-paragraph interpretation text blocks. The compositor assembles matched blocks per the ordering rules in the Face Reading Build Guide (section 8). Each entry is written as a complete, standalone paragraph so it can be inserted directly into a report without further editing.",
    version: "2.0"
  },
  faceShapes: {
    Round: "This is a Round face -- width close to length, with a soft jawline and full cheeks. It reflects a warm, sociable, adaptable nature that naturally seeks harmony in relationships and surroundings rather than conflict or confrontation. People with round faces are often described as easy to be around -- approachable, good listeners, and generally more inclined to smooth over tension than stir it up. The classical reading also links this shape to comfort and steady, unhurried good fortune, though that should be framed as traditional symbolism rather than guaranteed fact.",
    Square: "This is a Square face -- a strong, angular jawline paired with a wide forehead and balanced width-to-length proportions. It reflects determination, discipline, directness, and a natural, unforced sense of authority. This shape is traditionally associated with people who take on responsibility readily and follow through reliably -- the kind of presence that tends to be trusted with leadership even without seeking it out. The directness that comes with this shape is usually an asset, though it can occasionally read as blunt to those unused to it.",
    Oval: "This is an Oval face -- length exceeding width, with a gently curved jaw and generally balanced proportions across all features. Classical physiognomy treats this as the most harmonious and versatile of the seven shapes -- neither too angular nor too soft, adaptable across a wide range of situations and life stages. People with this face shape are often read as well-rounded in temperament as well as appearance: capable of both warmth and discipline depending on what's needed.",
    Oblong: "This is an Oblong (Long) face -- length notably exceeding width, narrow across the cheeks and jaw. It reflects independence, a mature, self-possessed outlook, and a more reserved temperament that doesn't rush into new relationships or decisions. This shape is often associated with steady, long-view thinking -- someone who plans further ahead than most and isn't easily rattled by short-term setbacks.",
    Heart: "This is a Heart-shaped face -- a wide forehead narrowing down to a pointed chin. It reflects idealism, strong self-expression, and an expressive, sometimes strong-willed early-life theme, in keeping with the Upper Zone's prominence in this shape. People with heart-shaped faces are often natural communicators with a vivid inner life, though the narrower chin (the Lower Zone) suggests later-life stability benefits from deliberate planning rather than being assumed.",
    Diamond: "This is a Diamond face -- a narrower forehead and jaw with notably wide, prominent cheekbones. It reflects ambition, drive, and a genuinely striking, memorable presence. Per the Three Zones framework, this shape tends to favor mid-life flourishing in particular, since the widest point of the face sits in the Middle Zone -- the period most associated with personal achievement through effort.",
    Triangular: "This is a Triangular (Pear) face -- a narrower forehead widening out toward a fuller jaw. It reflects a practical, grounded nature that tends to build strength and stability gradually, gaining real momentum with age and experience rather than peaking early. This shape is traditionally read as favoring later-life security and steadiness."
  },
  zones: {
    upper: {
      prominent: "A full, well-proportioned Upper Zone (from the hairline to the eyebrows) points to a strong early-life foundation -- generally good family support, an active, quick intellect from a young age, and a relatively smoother start to adult life (roughly ages 15 to 30) than someone with a narrower zone here.",
      proportional: "A balanced Upper Zone reflects a steady, unremarkable early-life foundation -- neither a marked advantage nor a marked struggle in the earlier years, simply an even starting point to build from.",
      recessed: "A narrower or recessed Upper Zone points to a harder or more effortful early-life start, with whatever success arrives in that period being built through self-reliance and direct experience rather than through inherited advantage or early support."
    },
    middle: {
      prominent: "A full, well-proportioned Middle Zone (from the eyebrows to the base of the nose) points to strong personal drive and real career or life achievement earned through effort during midlife (roughly ages 31 to 50) -- this is often the person's most productive, self-directed period.",
      proportional: "A balanced Middle Zone reflects steady, consistent midlife development -- progress continues at a reasonable, sustainable pace rather than in dramatic surges.",
      recessed: "A narrower Middle Zone points to a midlife period that genuinely calls for more deliberate effort and adaptability, with real sensitivity to setbacks during these years -- resilience and flexible planning matter more here than in other life stages."
    },
    lower: {
      prominent: "A full, well-proportioned Lower Zone (from the base of the nose to the chin) points to real stability, comfort, and strong family or social bonds in the later years (roughly age 51 onward) -- this is often a person's most settled and supported life stage.",
      proportional: "A balanced Lower Zone reflects steady, consistent later-life development -- a comfortable, unremarkable continuation of whatever pattern was established earlier.",
      recessed: "A narrower Lower Zone suggests that later-life stability benefits noticeably from deliberate, early planning rather than being assumed to arrive naturally -- financial and relational groundwork laid earlier pays off more here than it might for other face shapes."
    },
    balanceNote: "When all three zones read as roughly proportional to one another, the life pattern is best interpreted as evenly distributed across early, middle, and later life, rather than weighted heavily toward any single phase -- steady development throughout, rather than one standout peak period."
  },
  elements: {
    Wood: "A Wood-type face -- long and narrow, with a high forehead and clearly defined, angular features. It reflects a principled, growth-oriented, direct nature -- someone with firm values who pushes steadily toward self-improvement and expansion, sometimes to the point of rigidity when those values are challenged.",
    Fire: "A Fire-type face -- angular or pointed features, high cheekbones, and unusually expressive eyes. It reflects a passionate, dynamic, quick-moving temperament -- charismatic and energizing to be around, though prone to a quick temper or emotional intensity under real stress.",
    Earth: "An Earth-type face -- round, full, with soft features and a wide nose. It reflects a stable, nurturing, dependable nature that values security, routine, and taking care of the people around them above chasing constant novelty.",
    Metal: "A Metal-type face -- square and angular, with a defined jaw and sharp, clean-cut features. It reflects discipline, precision, and a strong personal sense of order -- this person tends to hold themselves and others to clear standards.",
    Water: "A Water-type face -- round and soft, with low-contrast, gentle features and a smooth complexion. It reflects adaptability, intuition, and a diplomatic, go-with-the-flow temperament that reads situations well and adjusts smoothly rather than forcing an outcome."
  },
  features: {
    forehead: {
      width: {
        wide: "A wide forehead reflects an intellectual, quick-thinking mind with a natural instinct for planning ahead -- ideas and strategy tend to come easily here.",
        narrow: "A narrower forehead points to a more instinctive, action-first orientation -- this person tends to respond to what's directly in front of them rather than spending long stretches in abstract reflection."
      },
      height: {
        high: "A high forehead reflects an intellectual, forward-planning nature -- comfortable holding complex or long-range ideas in mind.",
        low: "A lower forehead points to a more grounded, present-focused nature -- attention naturally stays on what's immediate and practical rather than distant or theoretical."
      },
      shape: {
        rounded: "A rounded forehead reflects adaptability and a creative, associative thinking style -- ideas tend to connect in unexpected, imaginative ways.",
        flat: "A flat, more vertical forehead reflects a disciplined, methodical thinking style -- problems are worked through step by step rather than intuitively leapt to."
      }
    },
    eyebrows: {
      thickness: {
        thick: "Thick, well-defined eyebrows reflect strong willpower, decisiveness, and robust vitality -- this person tends to commit fully once a decision is made.",
        thin: "Thin or sparse eyebrows point to a more sensitive, reserved temperament -- feelings run deep but aren't always worn visibly."
      },
      shape: {
        straight: "Straight eyebrows reflect logical, direct communication -- this person tends to say what they mean without excessive softening or ornamentation.",
        arched: "Arched eyebrows reflect natural expressiveness and social ease -- emotion and reaction show clearly on the face, which tends to make this person easy to read and easy to connect with."
      },
      spacing: {
        close: "Close-set eyebrows, positioned near the bridge of the nose, point to a detail-focused mind that notices small things others miss -- sometimes at the cost of a tendency toward worry or overanalysis.",
        wide: "Wide-set eyebrows reflect a broad-minded, easygoing nature -- this person tends to see the bigger picture and takes a relaxed view of minor details."
      },
      length: {
        long: "Eyebrows extending past the outer corner of the eye reflect loyalty and long-term thinking -- commitments, once made, tend to be honored over the long haul.",
        short: "Shorter eyebrows that end before the outer eye corner point to a present-focused, pragmatic nature -- decisions are made for now, not for some distant hypothetical future."
      }
    },
    eyes: {
      size: {
        large: "Large eyes reflect an expressive, emotionally open, imaginative nature -- feelings tend to show clearly, and this person often connects with others quickly and warmly.",
        small: "Smaller eyes point to an observant, detail-oriented nature that is more emotionally guarded -- feelings run deep but are shared more selectively and after more consideration."
      },
      spacing: {
        wide: "Wide-set eyes reflect open-mindedness and genuine tolerance -- this person tends to take a relaxed, generous view of differing opinions and lifestyles.",
        close: "Close-set eyes point to a focused, detail-driven, sometimes intense nature -- attention narrows readily onto whatever currently matters most."
      },
      cornerAngle: {
        upturned: "Upturned outer eye corners reflect optimism and ambition -- this person tends to default to a hopeful, forward-looking read on situations.",
        downturned: "Downturned outer eye corners reflect gentleness and empathy, sometimes carrying a quieter, more melancholic undertone -- this person tends to feel others' pain readily, which can be both a gift and a weight."
      },
      depth: {
        deepSet: "Deep-set eyes reflect a thoughtful, introspective nature -- this person processes experience internally before sharing their reaction, rather than reacting instantly and visibly.",
        protruding: "Prominent or protruding eyes reflect an outgoing, expressive nature with quick, visible emotional reactions -- what this person feels tends to show almost immediately."
      },
      vitality: "A bright, clear, alert gaze is traditionally read in Chinese physiognomy as a marker of strong underlying vitality and spirit (known as 'shen') -- generally seen as a positive sign regardless of the specific eye shape it accompanies."
    },
    nose: {
      bridge: {
        high: "A high nose bridge reflects confidence, strong will, and a natural sense of personal authority -- this person tends to hold their ground and isn't easily talked out of their own judgment.",
        low: "A lower, flatter nose bridge reflects adaptability and a more easygoing, less rigid nature -- this person tends to flow with circumstances rather than resist them.",
        straight: "A straight, well-proportioned nose bridge reflects steady, reliable decision-making and generally sound self-management -- neither impulsive nor overly hesitant."
      },
      nostrilWidth: {
        wide: "Wide nostrils are traditionally linked to generosity and comparative material ease -- this person tends to hold resources loosely rather than anxiously.",
        narrow: "Narrow nostrils point to caution with resources and a careful, deliberate approach to planning and spending."
      },
      tipShape: {
        rounded: "A rounded nose tip -- traditionally called the 'money-bag' nose in Chinese physiognomy -- is traditionally read as a marker of resourcefulness and financial fortune. This should be presented explicitly as traditional folklore framing rather than a guarantee, since no verified link exists between nose shape and actual financial outcomes.",
        pointed: "A pointed nose tip reflects sharp perception and a detail-oriented mind -- this person tends to notice inconsistencies and specifics that others might overlook."
      }
    },
    mouth: {
      lipFullness: {
        full: "Full lips reflect warmth, generosity, and an expressive communication style -- feelings and affection tend to be shared openly and easily.",
        thin: "Thin lips reflect precision, reserve, and discretion in communication -- words are chosen carefully, and this person tends not to overshare."
      },
      width: {
        wide: "A wide mouth reflects sociability, confidence, and a natural, persuasive ease in conversation -- this person is often comfortable holding the floor.",
        small: "A smaller mouth points to careful, considered word choice and a more private, understated nature."
      },
      cornerAngle: {
        upturned: "A naturally upturned resting mouth shape reflects an optimistic baseline disposition -- this person tends to default to a positive, approachable expression even at rest.",
        downturned: "A naturally downturned resting mouth shape points to a more guarded or serious baseline disposition -- worth interpreting gently, since this is a resting facial structure, not necessarily an accurate readout of current mood."
      },
      cupidsBow: "A well-defined cupid's bow reflects an expressive, articulate communication style -- this person tends to be precise and engaging when they speak."
    },
    chin: {
      shape: {
        rounded: "A rounded chin reflects warmth, easygoingness, and adaptability, particularly favoring comfort and flexibility in later life.",
        pointed: "A pointed chin reflects a quick-witted, sensitive nature that benefits from deliberate later-life planning -- stability here is built rather than assumed.",
        square: "A strong, well-defined jaw and chin reflect determination, resilience, and generally strong later-life stability -- this person tends to hold firm under pressure."
      },
      projection: {
        receding: "A receding chin reflects a gentle, accommodating nature that tends to thrive within strong, supportive relationships and networks rather than going it entirely alone.",
        prominent: "A prominent, forward-projecting chin reflects assertiveness, strong will, and real independence -- this person tends to hold their position confidently, even under pushback."
      }
    },
    ears: {
      size: {
        large: "Large ears are traditionally read as a marker of strong vitality and inherited fortune -- a generally favorable sign in classical physiognomy.",
        small: "Smaller ears point to a more understated, quietly private relationship to inherited fortune themes -- less about visible advantage, more about self-built outcomes."
      },
      setHeight: {
        high: "Ears set high on the head, level with or above the eyebrows, reflect quick intellect and earlier achievement -- often associated with an accelerated start relative to peers.",
        low: "Ears set lower on the head reflect more gradual, steady life development -- achievement tends to build over time rather than arriving early."
      },
      position: {
        close: "Ears set close to the head reflect a cautious, private nature -- this person tends to keep their inner world somewhat guarded.",
        protruding: "Protruding ears reflect an outgoing, independent-minded nature -- this person tends to stand out and doesn't mind doing so."
      },
      lobeType: {
        defined: "A well-defined, fleshy earlobe is traditionally linked to generosity and a grounded, stable nature.",
        attached: "A smaller or attached earlobe points to a more understated, low-key relationship to these traditional themes, without any negative implication."
      }
    },
    cheeks: {
      cheekbones: {
        high: "High, defined cheekbones reflect ambition, personal drive, and a natural sense of authority -- often tied to the Middle Zone's themes of self-driven achievement.",
        low: "Softer, less defined cheekbones point to a milder, gentler, less overtly assertive presence."
      },
      fullness: {
        full: "Full, soft cheeks reflect warmth, sociability, and a nurturing disposition -- this person tends to make others feel comfortable and cared for.",
        flat: "Flatter, narrower cheeks point to a more reserved, self-contained nature that doesn't require constant social engagement to feel settled."
      }
    },
    philtrum: {
      length: {
        long: "A long, well-defined philtrum (the groove between the nose and upper lip) is traditionally linked to vitality and longevity themes -- present this softly and in non-medical terms.",
        short: "A shorter philtrum reflects a quick, spontaneous nature -- decisions and reactions tend to come rapidly rather than after long deliberation."
      },
      groove: "A deep, clearly defined philtrum groove is traditionally read as a marker of strong vital energy in classical physiognomy."
    }
  },
  palaces: {
    life: { "domain": "Overall life direction and general fortune", "location": "Between the eyebrows (glabella)" },
    wealth: { "domain": "Financial fortune and resourcefulness", "location": "The nose" },
    siblings: { "domain": "Relationships with siblings and peers", "location": "The eyebrows" },
    marriage: { "domain": "Romantic relationships", "location": "Outer corner of the eyes" },
    children: { "domain": "Relationship with children and legacy", "location": "Under the eyes" },
    health: { "domain": "General vitality (non-medical framing)", "location": "Bridge of the nose" },
    travel: { "domain": "Travel, relocation, and external opportunity", "location": "Temples and hairline edges" },
    property: { "domain": "Stability, assets, and home life", "location": "Upper eyelids" },
    fortune: { "domain": "Inherited luck and family support", "location": "Upper forehead" },
    career: { "domain": "Professional path", "location": "Center forehead" },
    support: { "domain": "Support network, teams, and community", "location": "Jawline" },
    parents: { "domain": "Relationship with parents and authority figures", "location": "Upper forehead sides" },
    stateTemplates: {
      "prominent": "This palace shows as notably prominent and well-formed, pointing to natural strength and ease in the domain of {domain} -- this is an area of life where things tend to come together with comparatively less friction.",
      "proportional": "This palace shows as proportional and balanced, pointing to a steady, unremarkable pattern in the domain of {domain} -- neither a marked strength nor a marked struggle.",
      "recessed": "This palace shows as recessed or narrower than average, suggesting the domain of {domain} benefits from more deliberate attention and conscious effort rather than assuming it will develop on its own."
    },
    note: "Recommend gating the full Twelve Palaces output behind a premium or detailed report tier -- this content is dense and traditionally read by specialists, and is best suited to advanced readings rather than the free or basic result."
  },
  contradictionTemplate: "Outwardly this presents as {trait1}, though {trait2} runs underneath it. Rather than treating these as conflicting, it's more accurate to hold both readings together -- most real faces, like real personalities, carry exactly this kind of layered, sometimes contradictory texture.",
  zoneWeightingTemplate: "The {zoneName} shows as the most prominent of the three zones, suggesting {lifePeriod} reads as this face's natural peak period -- without implying that the other two periods are lacking, simply that this one carries the most visible structural emphasis."
};

export const CLASSICAL_FACE_SHAPES: Record<FaceShapeClass, FaceShapeRule> = {
  Round: {
    shape: "Round",
    title: "The Harmonic Diplomat (Round Face)",
    structuralMarkers: "Width close to length, with a soft jawline and full cheeks.",
    temperamentReading: FACE_READING_DATABASE_V2.faceShapes.Round,
    strengths: ["High emotional empathy", "Diplomatic bridge-builder", "Adaptability under pressure", "Social warmth"],
    growthAreas: ["Difficulty setting hard boundaries", "Can sacrifice own priorities for peace"],
    elementAssociation: "Water"
  },
  Square: {
    shape: "Square",
    title: "The Resolute Commander (Square Face)",
    structuralMarkers: "Strong, angular jawline paired with a wide forehead and balanced proportions.",
    temperamentReading: FACE_READING_DATABASE_V2.faceShapes.Square,
    strengths: ["Unyielding resolve", "Natural authority & leadership", "Integrity in commitments", "Crisis stamina"],
    growthAreas: ["Inflexibility", "Impatience with vacillation", "Tendency to shoulder too much alone"],
    elementAssociation: "Metal"
  },
  Oval: {
    shape: "Oval",
    title: "The Balanced Harmonizer (Oval Face)",
    structuralMarkers: "Length exceeding width, with a gently curved jaw and balanced proportions.",
    temperamentReading: FACE_READING_DATABASE_V2.faceShapes.Oval,
    strengths: ["Poised adaptability", "Refined aesthetic taste", "Sound strategic judgment", "Graceful communication"],
    growthAreas: ["Can mask true feelings under polite neutrality", "Tendency to over-weigh consensus"],
    elementAssociation: "Earth"
  },
  Oblong: {
    shape: "Oblong",
    title: "The Intellectual Visionary (Oblong Face)",
    structuralMarkers: "Length notably exceeding width, narrow across the cheeks and jaw.",
    temperamentReading: FACE_READING_DATABASE_V2.faceShapes.Oblong,
    strengths: ["Strategic long-term vision", "Intellectual depth", "Self-reliant composure", "High ethical standards"],
    growthAreas: ["Social aloofness", "Risk of mental fatigue through over-analysis"],
    elementAssociation: "Wood"
  },
  Heart: {
    shape: "Heart",
    title: "The Inspired Idealist (Heart-Shaped Face)",
    structuralMarkers: "Wide forehead narrowing down to a delicate, pointed chin.",
    temperamentReading: FACE_READING_DATABASE_V2.faceShapes.Heart,
    strengths: ["Vibrant creativity", "Quick mental agility", "Inspiring communication", "Generous optimism"],
    growthAreas: ["Fluctuating emotional energy", "Impatience with mundane routines", "Needs deliberate later-life planning"],
    elementAssociation: "Fire"
  },
  Diamond: {
    shape: "Diamond",
    title: "The Dynamic Catalyst (Diamond Face)",
    structuralMarkers: "Narrower forehead and jaw with notably wide, prominent cheekbones.",
    temperamentReading: FACE_READING_DATABASE_V2.faceShapes.Diamond,
    strengths: ["Formidable ambition & drive", "Striking personal presence", "Midlife achievement", "Calculated risk-taking"],
    growthAreas: ["Guarded vulnerability", "Intense self-expectations", "Sharp interpersonal boundaries"],
    elementAssociation: "Metal"
  },
  Triangular: {
    shape: "Triangular",
    title: "The Grounded Builder (Triangular / Pear Face)",
    structuralMarkers: "Narrower forehead widening out toward a fuller jaw.",
    temperamentReading: FACE_READING_DATABASE_V2.faceShapes.Triangular,
    strengths: ["Grounded endurance", "Pragmatic asset accumulation", "Patience in execution", "Later-life stability"],
    growthAreas: ["Slow to adapt to sudden changes", "Reluctance to pivot from established routines"],
    elementAssociation: "Earth"
  }
};

export const WU_XING_ELEMENTS_DATABASE: Record<WuXingElement, { title: string; narrative: string; archetype: string }> = {
  Wood: {
    title: "Wood Element (The Pioneer & Strategist)",
    narrative: FACE_READING_DATABASE_V2.elements.Wood,
    archetype: "Visionary Leader, Growth-Oriented, Principled"
  },
  Fire: {
    title: "Fire Element (The Catalyst & Inspirer)",
    narrative: FACE_READING_DATABASE_V2.elements.Fire,
    archetype: "Charismatic Communicator, Passionate, Dynamic"
  },
  Earth: {
    title: "Earth Element (The Anchor & Nurturer)",
    narrative: FACE_READING_DATABASE_V2.elements.Earth,
    archetype: "Stable Provider, Dependable, Grounded"
  },
  Metal: {
    title: "Metal Element (The Master & Commander)",
    narrative: FACE_READING_DATABASE_V2.elements.Metal,
    archetype: "Disciplined Strategist, Precise, Sovereign"
  },
  Water: {
    title: "Water Element (The Sage & Intuitive)",
    narrative: FACE_READING_DATABASE_V2.elements.Water,
    archetype: "Intuitive Diplomat, Adaptable, Deep Thinker"
  }
};

export const SHI_ER_GONG_TWELVE_PALACES: ShiErGongPalace[] = [
  {
    id: "ming_gong",
    palaceName: "Life Palace (Ming Gong)",
    chineseName: "Ming Gong (命宫)",
    location: FACE_READING_DATABASE_V2.palaces.life.location,
    governingDomain: FACE_READING_DATABASE_V2.palaces.life.domain,
    vitalityLevel: "exceptional",
    reading: FACE_READING_DATABASE_V2.palaces.stateTemplates.prominent.replace("{domain}", FACE_READING_DATABASE_V2.palaces.life.domain.toLowerCase())
  },
  {
    id: "wealth_palace",
    palaceName: "Wealth Palace (Cai Bo Gong)",
    chineseName: "Cai Bo Gong (财帛宫)",
    location: FACE_READING_DATABASE_V2.palaces.wealth.location,
    governingDomain: FACE_READING_DATABASE_V2.palaces.wealth.domain,
    vitalityLevel: "exceptional",
    reading: FACE_READING_DATABASE_V2.palaces.stateTemplates.prominent.replace("{domain}", FACE_READING_DATABASE_V2.palaces.wealth.domain.toLowerCase())
  },
  {
    id: "siblings_palace",
    palaceName: "Siblings Palace (Xiong Di Gong)",
    chineseName: "Xiong Di Gong (兄弟宫)",
    location: FACE_READING_DATABASE_V2.palaces.siblings.location,
    governingDomain: FACE_READING_DATABASE_V2.palaces.siblings.domain,
    vitalityLevel: "favorable",
    reading: FACE_READING_DATABASE_V2.palaces.stateTemplates.proportional.replace("{domain}", FACE_READING_DATABASE_V2.palaces.siblings.domain.toLowerCase())
  },
  {
    id: "marriage_palace",
    palaceName: "Marriage Palace (Qi Qie Gong)",
    chineseName: "Qi Qie Gong (夫妻宫)",
    location: FACE_READING_DATABASE_V2.palaces.marriage.location,
    governingDomain: FACE_READING_DATABASE_V2.palaces.marriage.domain,
    vitalityLevel: "favorable",
    reading: FACE_READING_DATABASE_V2.palaces.stateTemplates.proportional.replace("{domain}", FACE_READING_DATABASE_V2.palaces.marriage.domain.toLowerCase())
  },
  {
    id: "children_palace",
    palaceName: "Children Palace (Zi Nu Gong)",
    chineseName: "Zi Nu Gong (子女宫)",
    location: FACE_READING_DATABASE_V2.palaces.children.location,
    governingDomain: FACE_READING_DATABASE_V2.palaces.children.domain,
    vitalityLevel: "favorable",
    reading: FACE_READING_DATABASE_V2.palaces.stateTemplates.proportional.replace("{domain}", FACE_READING_DATABASE_V2.palaces.children.domain.toLowerCase())
  },
  {
    id: "health_palace",
    palaceName: "Health Palace (Ji E Gong)",
    chineseName: "Ji E Gong (疾厄宫)",
    location: FACE_READING_DATABASE_V2.palaces.health.location,
    governingDomain: FACE_READING_DATABASE_V2.palaces.health.domain,
    vitalityLevel: "favorable",
    reading: FACE_READING_DATABASE_V2.palaces.stateTemplates.proportional.replace("{domain}", FACE_READING_DATABASE_V2.palaces.health.domain.toLowerCase())
  },
  {
    id: "travel_palace",
    palaceName: "Travel Palace (Qian Yi Gong)",
    chineseName: "Qian Yi Gong (迁移宫)",
    location: FACE_READING_DATABASE_V2.palaces.travel.location,
    governingDomain: FACE_READING_DATABASE_V2.palaces.travel.domain,
    vitalityLevel: "favorable",
    reading: FACE_READING_DATABASE_V2.palaces.stateTemplates.proportional.replace("{domain}", FACE_READING_DATABASE_V2.palaces.travel.domain.toLowerCase())
  },
  {
    id: "property_palace",
    palaceName: "Property Palace (Tian Zhai Gong)",
    chineseName: "Tian Zhai Gong (田宅宫)",
    location: FACE_READING_DATABASE_V2.palaces.property.location,
    governingDomain: FACE_READING_DATABASE_V2.palaces.property.domain,
    vitalityLevel: "favorable",
    reading: FACE_READING_DATABASE_V2.palaces.stateTemplates.proportional.replace("{domain}", FACE_READING_DATABASE_V2.palaces.property.domain.toLowerCase())
  },
  {
    id: "fortune_palace",
    palaceName: "Fortune Palace (Fu De Gong)",
    chineseName: "Fu De Gong (福德宫)",
    location: FACE_READING_DATABASE_V2.palaces.fortune.location,
    governingDomain: FACE_READING_DATABASE_V2.palaces.fortune.domain,
    vitalityLevel: "favorable",
    reading: FACE_READING_DATABASE_V2.palaces.stateTemplates.proportional.replace("{domain}", FACE_READING_DATABASE_V2.palaces.fortune.domain.toLowerCase())
  },
  {
    id: "career_palace",
    palaceName: "Career Palace (Guan Lu Gong)",
    chineseName: "Guan Lu Gong (官禄宫)",
    location: FACE_READING_DATABASE_V2.palaces.career.location,
    governingDomain: FACE_READING_DATABASE_V2.palaces.career.domain,
    vitalityLevel: "exceptional",
    reading: FACE_READING_DATABASE_V2.palaces.stateTemplates.prominent.replace("{domain}", FACE_READING_DATABASE_V2.palaces.career.domain.toLowerCase())
  },
  {
    id: "servants_palace",
    palaceName: "Support & Community Palace (Nu Pu Gong)",
    chineseName: "Nu Pu Gong (奴仆宫)",
    location: FACE_READING_DATABASE_V2.palaces.support.location,
    governingDomain: FACE_READING_DATABASE_V2.palaces.support.domain,
    vitalityLevel: "favorable",
    reading: FACE_READING_DATABASE_V2.palaces.stateTemplates.proportional.replace("{domain}", FACE_READING_DATABASE_V2.palaces.support.domain.toLowerCase())
  },
  {
    id: "parents_palace",
    palaceName: "Parents Palace (Fu Mu Gong)",
    chineseName: "Fu Mu Gong (父母宫)",
    location: FACE_READING_DATABASE_V2.palaces.parents.location,
    governingDomain: FACE_READING_DATABASE_V2.palaces.parents.domain,
    vitalityLevel: "favorable",
    reading: FACE_READING_DATABASE_V2.palaces.stateTemplates.proportional.replace("{domain}", FACE_READING_DATABASE_V2.palaces.parents.domain.toLowerCase())
  }
];
