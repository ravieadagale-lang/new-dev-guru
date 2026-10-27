export interface DreamScenario {
  id: string;
  title: string;
  hindiTitle?: string;
  categoryId: string;
  categoryName: string;
  image: string;
  psychologicalMeaning: string;
  swapnaShastra: string;
  shagunShastra: string;
  indication: "Highly Auspicious" | "Auspicious" | "Caution" | "Mixed" | "Reflective" | "Neutral" | "Mild Caution";
  indicationType: "auspicious" | "caution" | "mixed" | "neutral";
  remedy?: string;
  keywords: string[];
}

export interface DreamCategory {
  id: string;
  title: string;
  hindiTitle: string;
  icon: string;
  image: string;
  summary: string;
  keywords: string[];
  scenarios: DreamScenario[];
}

export interface RashiSensitivity {
  sign: string;
  rashiHindi: string;
  element: string;
  rulingPlanet: string;
  dreamPattern: string;
  interpretationFocus: string;
}

export interface DayTimingGuide {
  day: string;
  hindiDay: string;
  planet: string;
  deity: string;
  themes: string;
  recommendation: string;
  remedyNote: string;
}

export interface MantraRemedyItem {
  dreamCategory: string;
  deity: string;
  mantra: string;
  upay: string;
  bestDay: string;
}

export interface GemstonePlanetItem {
  gemstone: string;
  hindiName: string;
  planet: string;
  quality: string;
  counselNote: string;
}

export interface LifeStageGuide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  content: string[];
  practicalTips: string[];
  traditionalFolkNote: string;
}

export interface SpecialTopic {
  id: string;
  title: string;
  tagline: string;
  image: string;
  psychologicalPerspective: string;
  traditionalVedicPerspective: string;
  actionableTechniques: string[];
}

export const DREAM_CATEGORIES: DreamCategory[] = [
  {
    id: "snakes",
    title: "Snake Dreams",
    hindiTitle: "Saanp Sapna (सर्प स्वप्न)",
    icon: "🐍",
    image: "/src/assets/images/snake_crossing_path_1786868688387.jpg",
    summary: "In Vedic tradition, snakes are linked with Kundalini, ancestral energies (Pitru), Rahu, and Goddess Lakshmi. Psychologically, snakes represent primal instinct, hidden anxieties, and transformative shedding.",
    keywords: ["snake dream meaning", "saanp ka sapna", "snake biting dream", "snake dream Hindu meaning", "snake in dream spiritual meaning"],
    scenarios: [
      {
        id: "snake-biting",
        title: "Snake Biting You",
        hindiTitle: "सांप का काटना",
        categoryId: "snakes",
        categoryName: "Snake Dreams",
        image: "/src/assets/images/snake_biting_hand_1786868656223.jpg",
        psychologicalMeaning: "A snake bite in a dream usually reflects a fear that has finally 'caught up' with the dreamer — a confrontation, a truth, or a consequence that can no longer be avoided. It can also point to feeling betrayed by someone whose intentions were hidden.",
        swapnaShastra: "Classical Swapna Shastra treats a snake bite as a significant sign that is read by exactly where the bite lands: a bite on the right side of the body is often read as a coming gain, while a bite on the left is read as a caution regarding health or money.",
        shagunShastra: "In everyday Shagun Shastra practice, being bitten by a snake without pain or blood is surprisingly read as a sign of unexpected wealth or a solved problem, while a bloody, painful bite is a clear warning of a hidden rival or health issue.",
        indication: "Mixed",
        indicationType: "mixed",
        remedy: "Offer milk at a Shiva temple or to a snake idol (Naag Devta) on the following Monday, and avoid starting new financial commitments for a few days.",
        keywords: ["snake biting", "saanp kaatna", "bite on right arm", "bite on left hand"]
      },
      {
        id: "snake-chasing",
        title: "Snake Chasing You",
        hindiTitle: "सांप का पीछा करना",
        categoryId: "snakes",
        categoryName: "Snake Dreams",
        image: "/src/assets/images/snake_chasing_dream_1786868673514.jpg",
        psychologicalMeaning: "Being chased by a snake typically reflects an issue or emotion the dreamer has been avoiding rather than confronting — often anger, guilt, or a decision repeatedly postponed.",
        swapnaShastra: "This is read as a warning that a problem left unaddressed will only grow larger; the dream is considered a nudge to face the matter directly rather than continue avoiding it.",
        shagunShastra: "Escaping the snake successfully in the dream is considered a sign that the dreamer will overcome the looming issue; being caught is a caution to act immediately rather than delay further.",
        indication: "Caution",
        indicationType: "caution",
        remedy: "Recite the Maha Mrityunjaya mantra or visit a temple before making the decision you've been postponing.",
        keywords: ["snake chasing", "saanp pichhe padna", "running from snake"]
      },
      {
        id: "snake-crossing-path",
        title: "Snake Blocking Your Path / Crossing the Road",
        hindiTitle: "सांप का रास्ता काटना",
        categoryId: "snakes",
        categoryName: "Snake Dreams",
        image: "/src/assets/images/snake_crossing_path_1786868688387.jpg",
        psychologicalMeaning: "A snake blocking the way often symbolizes an obstacle or fear standing between the dreamer and a goal — commonly tied to a real-life delay the dreamer already senses is coming.",
        swapnaShastra: "A snake crossing directly in front of you and then moving away is one of the more neutral-to-positive classical signs — it indicates a temporary obstacle that clears on its own without major damage.",
        shagunShastra: "Folk tradition treats a snake 'blocking and then leaving the path' as a sign that a delay is coming but will resolve favorably, especially if the snake was calm rather than aggressive.",
        indication: "Auspicious",
        indicationType: "auspicious",
        keywords: ["snake crossing road", "rasta rokna", "path obstacle"]
      },
      {
        id: "snake-moving-away",
        title: "Snake Moving Away / Leaving Peacefully",
        hindiTitle: "सांप का शांतिपूर्वक जाना",
        categoryId: "snakes",
        categoryName: "Snake Dreams",
        image: "/src/assets/images/snake_leaving_peacefully_1786868704170.jpg",
        psychologicalMeaning: "A snake that simply moves off without incident often reflects the dreamer's own growing ability to let go of a fear or a resolved internal conflict.",
        swapnaShastra: "This is one of the clearest auspicious readings in the entire snake category — a snake that departs peacefully, especially into a hole or water, indicates that a hidden problem is resolving itself.",
        shagunShastra: "Watching a snake leave calmly is considered a strong sign of relief from worry and is sometimes linked to an ancestor's blessing quietly clearing an obstacle.",
        indication: "Auspicious",
        indicationType: "auspicious",
        keywords: ["snake leaving", "saanp ka dur jana", "peaceful snake"]
      },
      {
        id: "snake-nest-multiple",
        title: "Multiple Snakes / A Nest of Snakes",
        hindiTitle: "अनेक सांप या सांपों का झुंड",
        categoryId: "snakes",
        categoryName: "Snake Dreams",
        image: "/src/assets/images/nest_many_snakes_1786868718811.jpg",
        psychologicalMeaning: "Several snakes together can point to a cluster of worries or the feeling of being surrounded by more than one source of stress at once.",
        swapnaShastra: "A group of snakes, particularly seen in or near the home, is traditionally read as a sign of several small obstacles arriving together, though rarely anything severe individually.",
        shagunShastra: "Seeing many snakes is often connected in folk belief to hidden family wealth (buried gold, old property matters) that has yet to be resolved or claimed.",
        indication: "Caution",
        indicationType: "caution",
        remedy: "A small act of charity toward the needy, done without expecting return, is commonly advised after this dream.",
        keywords: ["many snakes", "saanp ka jhund", "nest of vipers"]
      },
      {
        id: "white-snake",
        title: "White Snake",
        hindiTitle: "सफेद सांप",
        categoryId: "snakes",
        categoryName: "Snake Dreams",
        image: "/src/assets/images/mystical_white_snake_1786868742953.jpg",
        psychologicalMeaning: "A white snake, being an unusual and striking image, often marks a significant, purifying transformation the dreamer is undergoing — shedding an old identity for a cleaner one.",
        swapnaShastra: "A white snake is one of the most auspicious snake variants in classical dream texts, strongly associated with divine blessing, wealth, and the protection of Goddess Lakshmi.",
        shagunShastra: "In popular belief, a white snake appearing calmly — especially in a dream near dawn — is considered among the luckiest dream signs a person can receive.",
        indication: "Highly Auspicious",
        indicationType: "auspicious",
        keywords: ["white snake", "safed saanp", "lakshmi blessing"]
      },
      {
        id: "black-snake",
        title: "Black Snake",
        hindiTitle: "काला सांप",
        categoryId: "snakes",
        categoryName: "Snake Dreams",
        image: "/src/assets/images/mystical_black_snake_1786868757060.jpg",
        psychologicalMeaning: "A black snake often represents a fear that feels more 'unknown' or shadowy — something the dreamer senses but hasn't been able to name or examine directly yet.",
        swapnaShastra: "A black snake is read with more caution than other colors, often linked to a hidden enemy or a concealed problem that has not yet surfaced into the open.",
        shagunShastra: "Folk tradition advises extra alertness in dealings with people after this dream, particularly around trust and written agreements.",
        indication: "Caution",
        indicationType: "caution",
        remedy: "Perform a simple protective ritual such as lighting a mustard-oil lamp on a Saturday.",
        keywords: ["black snake", "kala saanp", "hidden enemy"]
      },
      {
        id: "snake-shedding-skin",
        title: "Snake Shedding Its Skin",
        hindiTitle: "सांप का केंचुल छोड़ना",
        categoryId: "snakes",
        categoryName: "Snake Dreams",
        image: "/src/assets/images/snake_shedding_skin_1786868771701.jpg",
        psychologicalMeaning: "This is an unusually clear and positive symbol in almost any psychological framework — it directly represents growth, renewal, and leaving an old phase of life behind.",
        swapnaShastra: "Classical interpretation treats this as one of the purest transformation signs — the end of a difficult cycle and the true start of a new one.",
        shagunShastra: "This is read as a strong sign of recovery — from illness, debt, or a long-standing problem — much as the snake itself recovers by shedding what no longer serves it.",
        indication: "Highly Auspicious",
        indicationType: "auspicious",
        keywords: ["snake shedding skin", "kenchul utarna", "renewal"]
      },
      {
        id: "snake-wrapped-body",
        title: "Snake Wrapped Around Your Body",
        hindiTitle: "शरीर पर सांप लिपटना",
        categoryId: "snakes",
        categoryName: "Snake Dreams",
        image: "/src/assets/images/snake_wrapped_body_1786868785007.jpg",
        psychologicalMeaning: "This can reflect a feeling of being 'gripped' by an emotion, obligation, or relationship the dreamer can't easily shake off — sometimes tied to anxiety about being controlled.",
        swapnaShastra: "A snake coiling around the body without biting is, perhaps counter-intuitively, read as a sign of protection and coming authority or influence in classical texts.",
        shagunShastra: "This is popularly connected to kundalini or spiritual energy 'awakening,' and is often read as a sign the dreamer is on the edge of a significant inner or outer rise in power.",
        indication: "Auspicious",
        indicationType: "auspicious",
        keywords: ["coiled snake", "kundalini awakening", "body wrapped"]
      },
      {
        id: "catching-snake-calmly",
        title: "Catching a Snake / Holding It Calmly",
        hindiTitle: "सांप को पकड़ना",
        categoryId: "snakes",
        categoryName: "Snake Dreams",
        image: "/src/assets/images/holding_snake_calmly_1786868803277.jpg",
        psychologicalMeaning: "Taking hold of the snake — the very thing that would normally cause fear — reflects the dreamer gaining mastery over a fear or situation they previously felt was beyond their control.",
        swapnaShastra: "Successfully catching and holding a snake is read as a sign of victory over a hidden enemy or long-pending obstacle.",
        shagunShastra: "This is considered a very good sign for anyone currently dealing with a legal, financial, or family dispute — indicating the upper hand is coming.",
        indication: "Auspicious",
        indicationType: "auspicious",
        keywords: ["holding snake", "saanp pakadna", "victory over enemy"]
      },
      {
        id: "killing-snake",
        title: "Killing a Snake",
        hindiTitle: "सांप को मारना",
        categoryId: "snakes",
        categoryName: "Snake Dreams",
        image: "/src/assets/images/killing_snake_defense_1786868816326.jpg",
        psychologicalMeaning: "Killing the snake can represent decisively ending a fear, addiction, or toxic relationship, though it can also, in some cases, reflect guilt over a harsh decision already made.",
        swapnaShastra: "Classical texts are divided here: killing a snake in self-defense is read as removing a threat successfully, while killing one unprovoked is sometimes read as a caution against unnecessary conflict.",
        shagunShastra: "Folk belief treats this dream with some caution, especially if snakes are considered sacred in the dreamer's family tradition — a small act of remorse or charity is often advised regardless of the outcome.",
        indication: "Mixed",
        indicationType: "mixed",
        remedy: "Offering milk or water at a temple is a common remedy after this specific dream.",
        keywords: ["kill snake", "saanp marna", "ending conflict"]
      },
      {
        id: "dead-snake",
        title: "Dead Snake",
        hindiTitle: "मरा हुआ सांप",
        categoryId: "snakes",
        categoryName: "Snake Dreams",
        image: "/src/assets/images/dead_snake_still_1786868830502.jpg",
        psychologicalMeaning: "A snake already dead in the dream usually signals that a fear or threat has already passed, even if the dreamer hasn't consciously registered that relief yet.",
        swapnaShastra: "This is generally read as an auspicious closing sign — the danger or obstacle represented by the snake has ended.",
        shagunShastra: "A dead snake found near or inside the home is sometimes read as the end of a long-standing enemy's influence over the family.",
        indication: "Auspicious",
        indicationType: "auspicious",
        keywords: ["dead snake", "mara saanp", "threat resolved"]
      }
    ]
  },
  {
    id: "dogs",
    title: "Dog Dreams",
    hindiTitle: "Kutta Sapna (श्वान स्वप्न)",
    icon: "🐕",
    image: "/src/assets/images/dog_category_banner_1786869276364.jpg",
    summary: "Dogs represent fidelity, loyalty, protection, and companionship. In Vedic lore, dogs are associated with Lord Bhairava and Ketu. Their mood and demeanor in the dream significantly alter the omen.",
    keywords: ["dog dream meaning", "dog biting in dream", "dog barking dream", "kutta ka sapna", "dog dream Hindu astrology"],
    scenarios: [
      {
        id: "dog-biting",
        title: "Dog Biting You",
        hindiTitle: "कुत्ते का काटना",
        categoryId: "dogs",
        categoryName: "Dog Dreams",
        image: "/src/assets/images/dog_biting_hand_1786869110717.jpg",
        psychologicalMeaning: "This usually points to a fear of betrayal by someone the dreamer considers a friend or ally, or guilt over having let someone down.",
        swapnaShastra: "A dog bite is traditionally read as a warning of conflict with a friend or close associate, with the severity of the bite reflecting the severity of the coming disagreement.",
        shagunShastra: "Folk tradition treats this as a caution to be careful of gossip or backbiting from someone within the dreamer's own social circle.",
        indication: "Caution",
        indicationType: "caution",
        remedy: "Avoid sharing sensitive personal information for a short period after this dream.",
        keywords: ["dog bite", "kutta katna", "betrayal by friend"]
      },
      {
        id: "dog-barking",
        title: "Dog Barking Aggressively",
        hindiTitle: "कुत्ते का भौंकना",
        categoryId: "dogs",
        categoryName: "Dog Dreams",
        image: "/src/assets/images/dog_barking_aggressive_1786869132533.jpg",
        psychologicalMeaning: "Aggressive barking often reflects an unspoken warning the dreamer's own instincts are trying to raise about a person or situation in waking life.",
        swapnaShastra: "A barking, aggressive dog is read as an omen of upcoming arguments or a dispute, often within the family or close circle.",
        shagunShastra: "This is considered a sign to be cautious about starting new arguments and to practice extra patience in the days that follow.",
        indication: "Caution",
        indicationType: "caution",
        keywords: ["dog barking", "kutta bhaukna", "arguments"]
      },
      {
        id: "dog-playing-friendly",
        title: "Dog Playing / Being Friendly and Affectionate",
        hindiTitle: "कुत्ते का प्यार जताना",
        categoryId: "dogs",
        categoryName: "Dog Dreams",
        image: "/src/assets/images/dog_playing_affectionate_1786869154001.jpg",
        psychologicalMeaning: "A playful, affectionate dog usually reflects genuine contentment in the dreamer's close relationships and a feeling of being supported.",
        swapnaShastra: "A friendly dog is one of the clearer positive animal signs in classical texts — indicating loyal friendships and protection from harm.",
        shagunShastra: "This is popularly read as a sign that true, trustworthy friends surround the dreamer, and that support will be available when needed.",
        indication: "Auspicious",
        indicationType: "auspicious",
        keywords: ["friendly dog", "playful puppy", "loyal friend"]
      },
      {
        id: "chased-by-dog",
        title: "Being Chased by a Dog",
        hindiTitle: "कुत्ते का पीछे भागना",
        categoryId: "dogs",
        categoryName: "Dog Dreams",
        image: "/src/assets/images/chased_by_dog_dream_1786869173933.jpg",
        psychologicalMeaning: "This reflects an anxiety about a relationship demand or obligation the dreamer feels is 'pursuing' them faster than they can manage.",
        swapnaShastra: "Being chased and escaping is read as eventually resolving a friend-related tension successfully; being caught suggests the tension needs direct conversation.",
        shagunShastra: "This dream is a nudge to address a strained friendship openly rather than let it linger unspoken.",
        indication: "Caution",
        indicationType: "caution",
        keywords: ["chased by dog", "kutta pichhe", "friendship strain"]
      },
      {
        id: "black-dog",
        title: "Black Dog",
        hindiTitle: "काला कुत्ता",
        categoryId: "dogs",
        categoryName: "Dog Dreams",
        image: "/src/assets/images/mystical_black_dog_1786869191829.jpg",
        psychologicalMeaning: "A black dog can carry a heavier emotional tone in the dream, sometimes linked in psychology to a looming worry or a period of low mood the dreamer is moving through.",
        swapnaShastra: "A black dog is read with more caution than other colors, sometimes associated in classical tradition with warnings related to health or unseen obstacles (associated with Bhairava/Shani).",
        shagunShastra: "Some folk traditions treat a calm black dog as a protective, even auspicious guardian figure — context and the dog's behavior matter far more than color alone.",
        indication: "Neutral",
        indicationType: "neutral",
        remedy: "If the dog was aggressive, lighting a lamp at home in the evening for a few days or feeding street dogs on Saturday is a common calming ritual.",
        keywords: ["black dog", "kala kutta", "bhairav guardian"]
      },
      {
        id: "white-dog",
        title: "White Dog",
        hindiTitle: "सफेद कुत्ता",
        categoryId: "dogs",
        categoryName: "Dog Dreams",
        image: "/src/assets/images/mystical_white_dog_1786869212186.jpg",
        psychologicalMeaning: "A white dog often reinforces a sense of purity or trustworthiness attached to a particular relationship or support system in the dreamer's life.",
        swapnaShastra: "A white dog, especially one that is calm, is considered auspicious, often linked to protective, benevolent energy around the household.",
        shagunShastra: "This is popularly read as a sign of guardianship — a genuine well-wisher watching over the dreamer's interests.",
        indication: "Auspicious",
        indicationType: "auspicious",
        keywords: ["white dog", "safed kutta", "benevolent guardian"]
      },
      {
        id: "puppies",
        title: "Puppies",
        hindiTitle: "कुत्ते के बच्चे (पिल्ले)",
        categoryId: "dogs",
        categoryName: "Dog Dreams",
        image: "/src/assets/images/cute_dream_puppies_1786869233219.jpg",
        psychologicalMeaning: "Puppies frequently symbolize new, tender beginnings — a new relationship, project, or responsibility that still needs nurturing and care.",
        swapnaShastra: "Puppies are read as a sign of new, positive developments arriving, particularly in family or close relationships.",
        shagunShastra: "This is considered a good sign for anyone hoping for growth in family, business partnership, or a new venture.",
        indication: "Auspicious",
        indicationType: "auspicious",
        keywords: ["puppy", "pille", "new beginnings"]
      },
      {
        id: "dog-dying",
        title: "A Dog Dying",
        hindiTitle: "कुत्ते की मृत्यु",
        categoryId: "dogs",
        categoryName: "Dog Dreams",
        image: "/src/assets/images/dog_dying_peaceful_1786869247333.jpg",
        psychologicalMeaning: "This can reflect a fear of losing a real relationship or support system, or grief already being processed about a loyalty that has faded.",
        swapnaShastra: "This is generally read as a caution regarding the health or wellbeing of a close friend, prompting the dreamer to check in on people they care about.",
        shagunShastra: "Folk belief treats this as a signal to reconnect with an old friend who may be going through a difficult time unnoticed.",
        indication: "Caution",
        indicationType: "caution",
        keywords: ["dog dying", "kutta marna", "loss of friendship"]
      }
    ]
  },
  {
    id: "cats",
    title: "Cat Dreams",
    hindiTitle: "Billi Sapna (मार्जार स्वप्न)",
    icon: "🐈",
    image: "/src/assets/images/cat_category_banner_1786869458482.jpg",
    summary: "Cats possess a dual cultural symbolism — from independent agility to subtle warnings of deceit. Classical interpretations evaluate the cat's demeanor and interaction.",
    keywords: ["cat dream meaning", "black cat dream", "billi ka sapna", "cat crossing path dream meaning"],
    scenarios: [
      {
        id: "black-cat-crossing",
        title: "Black Cat Crossing Your Path",
        hindiTitle: "काली बिल्ली का रास्ता काटना",
        categoryId: "cats",
        categoryName: "Cat Dreams",
        image: "/src/assets/images/black_cat_crossing_path_1786869475824.jpg",
        psychologicalMeaning: "This dream often reflects an internalized cultural superstition resurfacing during a moment of decision-making anxiety, more than any independent psychological symbol.",
        swapnaShastra: "Classical tradition treats a black cat with caution, generally reading it as a sign of minor obstacles or delays rather than serious harm.",
        shagunShastra: "In everyday folk belief, this is treated as a gentle nudge to double-check plans and paperwork before proceeding with an important step.",
        indication: "Mild Caution",
        indicationType: "caution",
        remedy: "A short pause before major decisions on the day following this dream is the commonly suggested response.",
        keywords: ["black cat", "kali billi", "rasta katna"]
      },
      {
        id: "cat-scratching",
        title: "Cat Scratching or Attacking You",
        hindiTitle: "बिल्ली का पंजा मारना",
        categoryId: "cats",
        categoryName: "Cat Dreams",
        image: "/src/assets/images/cat_scratching_attack_1786869490460.jpg",
        psychologicalMeaning: "This can reflect feeling undermined or 'clawed at' emotionally by someone perceived as sly or two-faced in waking life.",
        swapnaShastra: "A cat attack in a dream is read as a warning of deceit from someone close, often someone who presents themselves as harmless.",
        shagunShastra: "This dream advises the dreamer to trust their instincts about a person who has been acting inconsistently.",
        indication: "Caution",
        indicationType: "caution",
        keywords: ["cat scratch", "billi hamla", "deceit"]
      },
      {
        id: "kitten",
        title: "A Kitten",
        hindiTitle: "बिल्ली का बच्चा",
        categoryId: "cats",
        categoryName: "Cat Dreams",
        image: "/src/assets/images/cute_dream_kitten_1786869502298.jpg",
        psychologicalMeaning: "A kitten often represents something fragile and new the dreamer is nurturing — an idea, relationship, or emotional need for gentleness.",
        swapnaShastra: "A kitten is read as a sign of small, delicate good fortune arriving — nothing dramatic, but genuinely positive.",
        shagunShastra: "This is considered a good sign for domestic peace and small, welcome surprises at home.",
        indication: "Auspicious",
        indicationType: "auspicious",
        keywords: ["kitten", "billi ka bachha", "small joy"]
      },
      {
        id: "white-cat",
        title: "White Cat",
        hindiTitle: "सफेद बिल्ली",
        categoryId: "cats",
        categoryName: "Cat Dreams",
        image: "/src/assets/images/mystical_white_cat_1786869514296.jpg",
        psychologicalMeaning: "A calm white cat generally softens the traditional caution associated with cats, often reflecting quiet independence rather than deceit.",
        swapnaShastra: "A white cat is read more neutrally to positively, sometimes linked to unexpected help arriving from an unlikely source.",
        shagunShastra: "Folk belief treats a white cat entering a dream peacefully as a sign that a small, helpful surprise is on its way.",
        indication: "Auspicious",
        indicationType: "auspicious",
        keywords: ["white cat", "safed billi", "pleasant surprise"]
      },
      {
        id: "cat-entering-house",
        title: "A Cat Entering Your House",
        hindiTitle: "घर में बिल्ली का आना",
        categoryId: "cats",
        categoryName: "Cat Dreams",
        image: "/src/assets/images/cat_entering_doorway_1786869529947.jpg",
        psychologicalMeaning: "This can reflect a new influence — a person or idea — quietly entering the dreamer's personal space or routine.",
        swapnaShastra: "A cat calmly entering the home is generally read as neutral, though a cat that seems distressed or aggressive while entering warrants more caution.",
        shagunShastra: "This is sometimes tied to an unannounced visitor or a minor, unplanned change to household routine in the coming days.",
        indication: "Neutral",
        indicationType: "neutral",
        keywords: ["cat entering house", "ghar me billi", "unannounced guest"]
      },
      {
        id: "cat-giving-birth",
        title: "A Cat Giving Birth",
        hindiTitle: "बिल्ली का बच्चे देना",
        categoryId: "cats",
        categoryName: "Cat Dreams",
        image: "/src/assets/images/mother_cat_kittens_1786869544697.jpg",
        psychologicalMeaning: "This often mirrors themes of nurturing multiple new responsibilities or ideas at once, sometimes reflecting feeling stretched thin.",
        swapnaShastra: "This is read as a sign of multiplying small gains — several minor positive developments rather than one large one.",
        shagunShastra: "Folk tradition treats this as a good omen for domestic abundance, particularly food and daily comfort.",
        indication: "Auspicious",
        indicationType: "auspicious",
        keywords: ["cat giving birth", "billi ke bachhe", "domestic abundance"]
      }
    ]
  },
  {
    id: "cows",
    title: "Cow Dreams",
    hindiTitle: "Gaay Sapna (गौ स्वप्न)",
    icon: "🐄",
    image: "/src/assets/images/cow_category_banner_1786869720034.jpg",
    summary: "The sacred cow (Kamadhenu) symbolizes motherly nourishment, spiritual grace, Kamdhenu abundance, and peace. It is one of the most consistently auspicious omens.",
    keywords: ["cow dream meaning", "cow in dream Hindu", "gaay ka sapna", "cow giving milk dream"],
    scenarios: [
      {
        id: "cow-giving-milk",
        title: "A Cow Giving Milk",
        hindiTitle: "दूध देती हुई गाय",
        categoryId: "cows",
        categoryName: "Cow Dreams",
        image: "/src/assets/images/cow_giving_milk_dream_1786869955932.jpg",
        psychologicalMeaning: "This often reflects deep feelings around nourishment, care, and abundance — commonly surfacing during times when the dreamer feels supported or provided for.",
        swapnaShastra: "A cow giving milk is one of the most consistently auspicious images across all classical dream texts, strongly tied to prosperity.",
        shagunShastra: "This is popularly read as a direct sign of incoming wealth or a long-awaited resource finally becoming available.",
        indication: "Highly Auspicious",
        indicationType: "auspicious",
        keywords: ["cow milk", "dudh deti gaay", "kamadhenu abundance"]
      },
      {
        id: "cow-with-calf",
        title: "A Cow with Her Calf",
        hindiTitle: "गाय और बछड़ा",
        categoryId: "cows",
        categoryName: "Cow Dreams",
        image: "/src/assets/images/cow_and_calf_dream_1786870850178.jpg",
        psychologicalMeaning: "This tender image often reflects the dreamer's own feelings about motherhood, protection, or a close bond currently being nurtured.",
        swapnaShastra: "A cow and calf together is read as an especially strong sign of family happiness and stability.",
        shagunShastra: "This is considered auspicious for family harmony and is sometimes linked to good news involving children.",
        indication: "Highly Auspicious",
        indicationType: "auspicious",
        keywords: ["cow calf", "bachhda", "family harmony"]
      },
      {
        id: "chased-by-cow-bull",
        title: "Being Chased by a Cow or Bull",
        hindiTitle: "गाय या बैल का पीछे भागना",
        categoryId: "cows",
        categoryName: "Cow Dreams",
        image: "/src/assets/images/chased_by_bull_dream_1786870868844.jpg",
        psychologicalMeaning: "This can reflect feeling overwhelmed by an obligation the dreamer associates with duty, tradition, or family expectation.",
        swapnaShastra: "This is one of the few cow-related dreams read with caution, warning of stress connected to family or social obligations.",
        shagunShastra: "Folk belief advises addressing a pending family responsibility directly rather than continuing to put it off.",
        indication: "Caution",
        indicationType: "caution",
        keywords: ["chased by bull", "bail pichhe", "family obligation"]
      },
      {
        id: "feeding-cow",
        title: "Feeding a Cow",
        hindiTitle: "गाय को चारा खिलाना",
        categoryId: "cows",
        categoryName: "Cow Dreams",
        image: "/src/assets/images/woman_feeding_cow_1787061746115.jpg",
        psychologicalMeaning: "This often reflects the dreamer's own generosity or a desire to give back and nurture others, and tends to leave a peaceful emotional residue.",
        swapnaShastra: "Feeding a cow in a dream is read as a strong auspicious sign, closely tied to the real-world merit of the act of feeding a cow in Hindu practice.",
        shagunShastra: "This is considered one of the most reliably good dream signs, often indicating that generosity will be returned many times over.",
        indication: "Highly Auspicious",
        indicationType: "auspicious",
        keywords: ["feeding cow", "gauras", "punya merit"]
      },
      {
        id: "cow-dying",
        title: "A Cow Dying",
        hindiTitle: "गाय की मृत्यु",
        categoryId: "cows",
        categoryName: "Cow Dreams",
        image: "/src/assets/images/cow_dying_omen_1787061761775.jpg",
        psychologicalMeaning: "This can reflect grief, fear of loss, or anxiety about the stability of the dreamer's home and resources.",
        swapnaShastra: "This is read with genuine caution, as a sign to pay closer attention to household finances and the health of elders in the family.",
        shagunShastra: "Folk tradition recommends performing a small act of charity or feeding an actual cow shortly after this dream as a protective gesture.",
        indication: "Caution",
        indicationType: "caution",
        remedy: "Feeding a real cow, or donating food to those in need, is the classic remedy associated with this dream.",
        keywords: ["cow dying", "gaay marna", "loss alert"]
      },
      {
        id: "white-cow",
        title: "A White Cow",
        hindiTitle: "सफेद कामधेनु गाय",
        categoryId: "cows",
        categoryName: "Cow Dreams",
        image: "/src/assets/images/sacred_white_cow_1787061777689.jpg",
        psychologicalMeaning: "This intensifies the already positive associations of the cow symbol, often surfacing during a period of genuine emotional peace.",
        swapnaShastra: "A white cow is considered exceptionally auspicious, associated with the purest form of blessing in this category of dream.",
        shagunShastra: "This is popularly regarded as one of the luckiest animal dreams a person can have.",
        indication: "Highly Auspicious",
        indicationType: "auspicious",
        keywords: ["white cow", "safed gaay", "kamdhenu"]
      }
    ]
  },
  {
    id: "elephants",
    title: "Elephant Dreams",
    hindiTitle: "Hathi Sapna (गज स्वप्न)",
    icon: "🐘",
    image: "/src/assets/images/riding_royal_elephant_1787062331010.jpg",
    summary: "Associated with Lord Ganesha (Vighnaharta), royal dignity, wisdom, and Airavata. Seeing elephants symbolizes the removal of obstacles and the rise of social honor.",
    keywords: ["elephant dream meaning", "riding elephant in dream", "hathi ka sapna", "elephant dream Ganesha"],
    scenarios: [
      {
        id: "riding-elephant",
        title: "Riding an Elephant",
        hindiTitle: "हाथी की सवारी करना",
        categoryId: "elephants",
        categoryName: "Elephant Dreams",
        image: "/src/assets/images/riding_royal_elephant_1787062331010.jpg",
        psychologicalMeaning: "This often reflects a growing sense of personal authority, status, or feeling 'above' a problem that once felt overwhelming.",
        swapnaShastra: "Riding an elephant is one of the clearest classical signs of rising status, honor, or an upcoming position of authority.",
        shagunShastra: "This is popularly read as a sign of promotion, recognition, or a significant rise in respect within one's community.",
        indication: "Highly Auspicious",
        indicationType: "auspicious",
        keywords: ["riding elephant", "hathi ki sawari", "royal status"]
      },
      {
        id: "elephant-chasing",
        title: "An Elephant Chasing You",
        hindiTitle: "हाथी का पीछे पड़ना",
        categoryId: "elephants",
        categoryName: "Elephant Dreams",
        image: "/src/assets/images/elephant_chasing_dream_1787062349851.jpg",
        psychologicalMeaning: "This unusual pairing can reflect feeling overwhelmed by the sheer size or weight of a responsibility, even one that is fundamentally positive.",
        swapnaShastra: "This is read with some caution, less as danger and more as a sign the dreamer feels unready for a large responsibility about to arrive.",
        shagunShastra: "Folk interpretation advises preparing calmly for a big opportunity rather than feeling intimidated by its scale.",
        indication: "Caution",
        indicationType: "caution",
        keywords: ["elephant chase", "hathi pichhe", "heavy responsibility"]
      },
      {
        id: "elephant-entering-house",
        title: "An Elephant Entering Your House",
        hindiTitle: "घर में हाथी का प्रवेश",
        categoryId: "elephants",
        categoryName: "Elephant Dreams",
        image: "/src/assets/images/elephant_entering_home_1787062366440.jpg",
        psychologicalMeaning: "This often reflects a sense that something significant — an opportunity, a guest, or a change — is about to enter the dreamer's personal life.",
        swapnaShastra: "An elephant entering the home is read as a strongly auspicious sign of coming prosperity and honor for the household.",
        shagunShastra: "This is considered one of the best dream omens for family businesses and household finances.",
        indication: "Highly Auspicious",
        indicationType: "auspicious",
        keywords: ["elephant in house", "ghar me hathi", "ganesha entrance"]
      },
      {
        id: "white-elephant",
        title: "A White Elephant (Airavata)",
        hindiTitle: "ऐरावत सफेद हाथी",
        categoryId: "elephants",
        categoryName: "Elephant Dreams",
        image: "/src/assets/images/divine_white_airavata_1787062402553.jpg",
        psychologicalMeaning: "As a rare and striking image, this often marks an unusually significant, positive turning point the dreamer senses is approaching.",
        swapnaShastra: "A white elephant is exceptionally auspicious in classical tradition, associated with royal fortune and rare blessing.",
        shagunShastra: "This is popularly regarded as one of the rarest and luckiest dreams possible.",
        indication: "Highly Auspicious",
        indicationType: "auspicious",
        keywords: ["white elephant", "airavat", "rarest blessing"]
      },
      {
        id: "elephant-trunk-raised",
        title: "An Elephant with Trunk Raised",
        hindiTitle: "सूंड़ उठाए हाथी",
        categoryId: "elephants",
        categoryName: "Elephant Dreams",
        image: "/src/assets/images/elephant_trunk_raised_1787062424804.jpg",
        psychologicalMeaning: "A raised trunk often reads, even intuitively, as a gesture of triumph or celebration — reflecting the dreamer's own anticipated success.",
        swapnaShastra: "This specific posture is read as an especially strong sign of victory and success in whatever the dreamer is currently pursuing.",
        shagunShastra: "This is a favorite auspicious image in folk tradition, often associated with festivals, wealth, and celebration.",
        indication: "Highly Auspicious",
        indicationType: "auspicious",
        keywords: ["trunk raised", "sund uthaya hathi", "victory salute"]
      },
      {
        id: "baby-elephant",
        title: "A Baby Elephant",
        hindiTitle: "हाथी का बच्चा",
        categoryId: "elephants",
        categoryName: "Elephant Dreams",
        image: "/src/assets/images/playful_baby_elephant_1787062442794.jpg",
        psychologicalMeaning: "This often reflects the early, still-developing stage of something the dreamer senses will eventually grow into something significant.",
        swapnaShastra: "A baby elephant is read as a sign of a smaller but genuine positive development, one that will grow steadily over time.",
        shagunShastra: "This is considered a good sign for the start of a new project or relationship that will mature well.",
        indication: "Auspicious",
        indicationType: "auspicious",
        keywords: ["baby elephant", "hathi ka bachha", "steady growth"]
      }
    ]
  },
  {
    id: "tigers-lions",
    title: "Tiger & Lion Dreams",
    hindiTitle: "Sher / Baagh Sapna (सिंह / व्याघ्र स्वप्न)",
    icon: "🦁",
    image: "/src/assets/images/human_riding_tiger_1787063083933.jpg",
    summary: "Symbols of sovereign courage, raw instinct, and the divine mount (vahana) of Goddess Durga. The interpretation hinges on whether you control or run from this power.",
    keywords: ["tiger dream meaning", "lion dream meaning Hindu", "sher ka sapna", "tiger attacking in dream"],
    scenarios: [
      {
        id: "riding-tiger-lion",
        title: "Riding a Tiger or Lion",
        hindiTitle: "शेर की सवारी",
        categoryId: "tigers-lions",
        categoryName: "Tiger & Lion Dreams",
        image: "/src/assets/images/human_riding_tiger_1787063083933.jpg",
        psychologicalMeaning: "This reflects a strong sense of having mastered one's own fears or aggressive instincts, redirecting them constructively.",
        swapnaShastra: "Riding a tiger or lion is closely associated with Goddess Durga's vehicle and is read as an exceptionally auspicious sign of courage and victory.",
        shagunShastra: "This is popularly considered one of the most powerful positive omens, often linked to overcoming a significant rival or challenge.",
        indication: "Highly Auspicious",
        indicationType: "auspicious",
        keywords: ["riding tiger", "sher ki sawari", "durga vahana"]
      },
      {
        id: "chased-by-tiger-lion",
        title: "Being Chased by a Tiger or Lion",
        hindiTitle: "शेर का हमला या पीछा",
        categoryId: "tigers-lions",
        categoryName: "Tiger & Lion Dreams",
        image: "/src/assets/images/chased_by_tiger_lion_1787062755279.jpg",
        psychologicalMeaning: "This typically reflects an intimidating authority figure or overwhelming pressure the dreamer feels unable to confront directly.",
        swapnaShastra: "Being chased is a caution to be wary of a powerful adversary or a difficult superior in the near future.",
        shagunShastra: "Folk tradition advises approaching a currently intimidating situation with more preparation and confidence rather than avoidance.",
        indication: "Caution",
        indicationType: "caution",
        remedy: "Reciting the Durga Chalisa or a similar protective prayer is a common response to this dream.",
        keywords: ["chased by lion", "sher hamla", "adversary"]
      },
      {
        id: "tiger-entering-house",
        title: "A Tiger Entering Your House",
        hindiTitle: "घर में शेर का आना",
        categoryId: "tigers-lions",
        categoryName: "Tiger & Lion Dreams",
        image: "/src/assets/images/tiger_entering_house_1787062785667.jpg",
        psychologicalMeaning: "This can reflect the arrival of a dominant new influence or personality into the dreamer's close personal or family life.",
        swapnaShastra: "This is read with mixed caution — potentially indicating either a very powerful ally or a very demanding presence entering the household.",
        shagunShastra: "The dream's overall tone (calm versus aggressive) is used to judge which reading applies.",
        indication: "Mixed",
        indicationType: "mixed",
        keywords: ["tiger in house", "sher ghar me", "dominant influence"]
      },
      {
        id: "killing-tiger",
        title: "Killing a Tiger",
        hindiTitle: "शेर का वध करना",
        categoryId: "tigers-lions",
        categoryName: "Tiger & Lion Dreams",
        image: "/src/assets/images/defeated_slain_tiger_1787063104642.jpg",
        psychologicalMeaning: "This often reflects a decisive victory over a major fear or a formidable real-world obstacle the dreamer has been struggling with.",
        swapnaShastra: "This is read as a strong sign of triumph over a significant enemy or difficulty.",
        shagunShastra: "This is considered an excellent omen, especially for anyone currently in a competitive or high-stakes situation.",
        indication: "Highly Auspicious",
        indicationType: "auspicious",
        keywords: ["killing tiger", "sher marna", "major triumph"]
      },
      {
        id: "tiger-roaring",
        title: "A Tiger Roaring (Not Attacking)",
        hindiTitle: "शेर की दहाड़",
        categoryId: "tigers-lions",
        categoryName: "Tiger & Lion Dreams",
        image: "/src/assets/images/tiger_roaring_1787062839675.jpg",
        psychologicalMeaning: "A roar without an attack often reflects a warning being issued rather than a threat being carried out — an internal alarm bell worth heeding.",
        swapnaShastra: "This is read as an alert to stay watchful of a coming challenge, without necessarily predicting harm.",
        shagunShastra: "Folk belief treats this as a signal to stay alert and well-prepared rather than a direct threat.",
        indication: "Caution",
        indicationType: "caution",
        keywords: ["tiger roar", "sher dahad", "alertness"]
      },
      {
        id: "sleeping-tiger",
        title: "A Sleeping Tiger",
        hindiTitle: "सोया हुआ शेर",
        categoryId: "tigers-lions",
        categoryName: "Tiger & Lion Dreams",
        image: "/src/assets/images/sleeping_tiger_1787062867403.jpg",
        psychologicalMeaning: "This often reflects a dormant strength, fear, or issue in the dreamer's life that hasn't been activated yet.",
        swapnaShastra: "A sleeping tiger is read as a sign of latent power or an unresolved matter still in a quiet, manageable phase.",
        shagunShastra: "This is considered a reminder not to disturb or provoke a sensitive, currently calm situation unnecessarily.",
        indication: "Neutral",
        indicationType: "neutral",
        keywords: ["sleeping tiger", "soya sher", "dormant power"]
      }
    ]
  },
  {
    id: "water",
    title: "Water Dreams",
    hindiTitle: "Paani Sapna (जल स्वप्न)",
    icon: "🌊",
    image: "/src/assets/images/water_dreams_banner_1789639183276.jpg",
    summary: "Water is the universal mirror of subconscious emotion, lunar currents, cleansing, and life flow. Its clarity, movement, and temperature decide the omen.",
    keywords: ["water dream meaning", "dream about drowning", "muddy water dream", "paani ka sapna", "water entering house dream"],
    scenarios: [
      {
        id: "drowning",
        title: "Drowning",
        hindiTitle: "डूबना",
        categoryId: "water",
        categoryName: "Water Dreams",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This reflects feeling emotionally overwhelmed, out of one's depth, or unable to cope with current pressures — a very direct symbol of being submerged by stress.",
        swapnaShastra: "This is read as a caution regarding being overwhelmed by a current situation, urging the dreamer to seek support rather than struggle alone.",
        shagunShastra: "Folk belief treats this as a strong nudge to lean on family or friends rather than carrying a burden in isolation.",
        indication: "Caution",
        indicationType: "caution",
        remedy: "Reciting a calming prayer before bed and reducing stress-inducing activity in the evening is commonly advised.",
        keywords: ["drowning", "dubna", "emotional overwhelm"]
      },
      {
        id: "swimming-clear-water",
        title: "Swimming Confidently in Clear Water",
        hindiTitle: "साफ पानी में तैरना",
        categoryId: "water",
        categoryName: "Water Dreams",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This reflects genuine emotional confidence and a felt sense of being able to navigate current feelings and challenges well.",
        swapnaShastra: "This is read as a strongly auspicious sign of smooth progress and emotional wellbeing.",
        shagunShastra: "This is considered a good omen for both emotional peace and practical success.",
        indication: "Highly Auspicious",
        indicationType: "auspicious",
        keywords: ["clear water swim", "saaf paani", "emotional ease"]
      },
      {
        id: "muddy-water",
        title: "Muddy or Dirty Water",
        hindiTitle: "गंदला या मैला पानी",
        categoryId: "water",
        categoryName: "Water Dreams",
        image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This often reflects confusion, unprocessed emotion, or a situation that feels unclear or 'clouded' at present.",
        swapnaShastra: "This is read as a caution advising the dreamer to seek clarity before making an important decision.",
        shagunShastra: "Folk belief treats this as a sign to wait for more information before committing to a course of action.",
        indication: "Caution",
        indicationType: "caution",
        keywords: ["muddy water", "ganda pani", "confusion"]
      },
      {
        id: "boiling-water",
        title: "Boiling Water",
        hindiTitle: "उबलता हुआ पानी",
        categoryId: "water",
        categoryName: "Water Dreams",
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This often reflects suppressed anger or an emotional situation that is close to 'boiling over' if not addressed.",
        swapnaShastra: "This is read as a caution regarding rising tension, particularly within the family, that needs to be cooled before it escalates.",
        shagunShastra: "This dream advises the dreamer to actively de-escalate a tense situation rather than let it continue building.",
        indication: "Caution",
        indicationType: "caution",
        keywords: ["boiling water", "ubalata pani", "anger brewing"]
      },
      {
        id: "water-flooding-house",
        title: "Water Entering or Flooding the House",
        hindiTitle: "घर में पानी भरना या बाढ़",
        categoryId: "water",
        categoryName: "Water Dreams",
        image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This often reflects a feeling that emotions or outside pressures are 'seeping into' the dreamer's most personal, private space.",
        swapnaShastra: "This is read with real caution, traditionally linked to unexpected expenses or disruptions to household stability.",
        shagunShastra: "Folk tradition advises reviewing household finances and being cautious with new spending in the near term.",
        indication: "Caution",
        indicationType: "caution",
        remedy: "A small donation or act of charity is commonly suggested to offset the caution associated with this dream.",
        keywords: ["flood in house", "ghar me badh", "financial strain"]
      },
      {
        id: "drinking-cool-water",
        title: "Drinking Clear, Cool Water",
        hindiTitle: "ठंडा और मीठा पानी पीना",
        categoryId: "water",
        categoryName: "Water Dreams",
        image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This simple, satisfying dream often reflects a genuine sense of having one's basic emotional or practical needs met.",
        swapnaShastra: "This is read as an auspicious sign of contentment and the fulfillment of a current wish.",
        shagunShastra: "This is considered a good, gentle sign of satisfaction and relief from a minor worry.",
        indication: "Auspicious",
        indicationType: "auspicious",
        keywords: ["drinking water", "pani pina", "fulfillment"]
      },
      {
        id: "dry-well-river",
        title: "A Dry Well or River",
        hindiTitle: "सूखा कुआं या सूखी नदी",
        categoryId: "water",
        categoryName: "Water Dreams",
        image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This often reflects a feeling of depletion — emotional, financial, or creative — a resource that feels currently unavailable.",
        swapnaShastra: "This is read as a caution regarding a temporary shortage of resources or support.",
        shagunShastra: "This dream advises conserving current resources carefully until circumstances improve.",
        indication: "Caution",
        indicationType: "caution",
        keywords: ["dry well", "sukha kuan", "resource depletion"]
      }
    ]
  },
  {
    id: "flying-falling",
    title: "Flying & Falling Dreams",
    hindiTitle: "Udna aur Girna (उड़ना व गिरना)",
    icon: "🕊️",
    image: "/src/assets/images/flying_falling_dreams_banner_1789639199740.jpg",
    summary: "Flying expresses ascension, liberation, and overcoming hurdles. Falling reveals somatic reflexes (hypnic jerks) or fears of loss of control and declining status.",
    keywords: ["flying dream meaning", "falling dream meaning", "udne ka sapna", "girne ka sapna"],
    scenarios: [
      {
        id: "flying-effortlessly",
        title: "Flying Effortlessly and Joyfully",
        hindiTitle: "हवा में सुखपूर्वक उड़ना",
        categoryId: "flying-falling",
        categoryName: "Flying & Falling Dreams",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This reflects genuine confidence, freedom, and a felt sense of rising above a problem that once weighed the dreamer down.",
        swapnaShastra: "Effortless flying is read as one of the strongest signs of imminent success and rising status in the classical tradition.",
        shagunShastra: "This is popularly considered an excellent omen for career growth, travel, or a significant personal achievement.",
        indication: "Highly Auspicious",
        indicationType: "auspicious",
        keywords: ["flying high", "hawa me udna", "rising success"]
      },
      {
        id: "struggling-to-fly",
        title: "Trying to Fly but Struggling to Get Off the Ground",
        hindiTitle: "उड़ने की कोशिश पर न उड़ पाना",
        categoryId: "flying-falling",
        categoryName: "Flying & Falling Dreams",
        image: "https://images.unsplash.com/photo-1499209974431-9dac3ada0047?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This common frustration dream reflects a real-life feeling of effort not yet translating into progress.",
        swapnaShastra: "This is read as a caution suggesting that current efforts need more preparation before the desired result can arrive.",
        shagunShastra: "Folk belief advises patience — the goal is achievable, but not quite yet.",
        indication: "Caution",
        indicationType: "caution",
        keywords: ["struggling to fly", "ud na pana", "patience needed"]
      },
      {
        id: "flying-and-falling",
        title: "Flying and Suddenly Falling",
        hindiTitle: "उड़ते हुए अचानक गिरना",
        categoryId: "flying-falling",
        categoryName: "Flying & Falling Dreams",
        image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This often reflects anxiety about losing recently gained confidence, status, or stability.",
        swapnaShastra: "This is read as a caution against overconfidence, warning that a recent gain could be at risk without careful handling.",
        shagunShastra: "This dream advises consolidating recent success carefully rather than taking it for granted.",
        indication: "Caution",
        indicationType: "caution",
        keywords: ["flying and falling", "gir jana", "overconfidence caution"]
      },
      {
        id: "falling-hypnic-jerk",
        title: "Falling from a Great Height and Waking Up Suddenly",
        hindiTitle: "ऊंचाई से गिरना और चौंक कर जागना",
        categoryId: "flying-falling",
        categoryName: "Flying & Falling Dreams",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This is very often simply the hypnic jerk — a natural muscle reflex during the transition into sleep — rather than a symbolic dream at all.",
        swapnaShastra: "When this occurs rarely, classical tradition gives it little weight; frequent recurrence, however, is read as a caution regarding a loss of stability in some area of life.",
        shagunShastra: "Folk belief treats an occasional version of this dream as ordinary, but a repeating pattern as a signal to steady one's finances or decisions.",
        indication: "Neutral",
        indicationType: "neutral",
        keywords: ["falling from height", "unchai se girna", "hypnic jerk"]
      },
      {
        id: "falling-endlessly",
        title: "Falling Endlessly Without Landing",
        hindiTitle: "लगातार गिरते रहना",
        categoryId: "flying-falling",
        categoryName: "Flying & Falling Dreams",
        image: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This unsettling variant often reflects an ongoing, unresolved anxiety with no clear end point currently in sight.",
        swapnaShastra: "This is read as a caution regarding a prolonged period of uncertainty, advising patience rather than rash decisions.",
        shagunShastra: "This dream is treated as a reminder that the current uncertain phase, while long, is not permanent.",
        indication: "Caution",
        indicationType: "caution",
        keywords: ["endless fall", "lagatar girna", "uncertain phase"]
      }
    ]
  },
  {
    id: "teeth",
    title: "Teeth Dreams",
    hindiTitle: "Daant Girna Sapna (दन्त स्वप्न)",
    icon: "🦷",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80",
    summary: "One of the most universal archetypes worldwide. Explored through themes of vitality, control, social evaluation, and elder family wellbeing.",
    keywords: ["teeth falling out dream meaning", "teeth breaking dream", "daant girna sapna", "losing teeth dream Hindu"],
    scenarios: [
      {
        id: "teeth-falling-painless",
        title: "Teeth Falling Out Painlessly",
        hindiTitle: "बिना दर्द दांत गिरना",
        categoryId: "teeth",
        categoryName: "Teeth Dreams",
        image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This very common dream is strongly linked to anxiety about appearance, aging, or a fear of losing control in a situation that matters to the dreamer.",
        swapnaShastra: "This is read as a caution connected to the health or wellbeing of an elder family member, prompting extra care and attention toward them.",
        shagunShastra: "This is one of the most well-known cautionary dreams in folk tradition, commonly advising the dreamer to check in on elderly relatives.",
        indication: "Caution",
        indicationType: "caution",
        remedy: "Visiting or calling an elder relative soon after this dream is a widely recommended, comforting response.",
        keywords: ["teeth falling out", "daant tutna", "elder wellbeing"]
      },
      {
        id: "teeth-falling-blood",
        title: "Teeth Falling Out with Blood or Pain",
        hindiTitle: "खून या दर्द के साथ दांत गिरना",
        categoryId: "teeth",
        categoryName: "Teeth Dreams",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This more intense version often reflects a sharper anxiety — a fear of a real, upcoming loss rather than a vague worry.",
        swapnaShastra: "This is read as a stronger caution, sometimes linked to financial loss in addition to concern for family health.",
        shagunShastra: "This dream advises particular caution with money and important documents in the near term.",
        indication: "Caution",
        indicationType: "caution",
        keywords: ["bloody teeth", "daant me khoon", "financial alert"]
      },
      {
        id: "all-teeth-falling",
        title: "All Teeth Falling Out at Once",
        hindiTitle: "सारे दांत एक साथ गिरना",
        categoryId: "teeth",
        categoryName: "Teeth Dreams",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This intense variant often surfaces during periods of major life transition, reflecting anxiety about a big, all-at-once change.",
        swapnaShastra: "This is read as a sign of a significant life change on the horizon — not necessarily negative, but certainly major.",
        shagunShastra: "This dream is treated as a signal to prepare thoroughly, since a substantial shift appears to be approaching.",
        indication: "Caution",
        indicationType: "caution",
        keywords: ["all teeth lost", "sare daant girna", "major life shift"]
      },
      {
        id: "tooth-chipping",
        title: "One Tooth Breaking or Chipping",
        hindiTitle: "एक दांत का टूटना या दरार",
        categoryId: "teeth",
        categoryName: "Teeth Dreams",
        image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This milder version often reflects a small, specific worry — perhaps about a single upcoming conversation or decision — rather than a broad anxiety.",
        swapnaShastra: "This is read as a minor caution, usually about a small, specific matter rather than anything sweeping.",
        shagunShastra: "Folk belief treats this as a nudge to handle one particular pending task with extra care.",
        indication: "Mild Caution",
        indicationType: "caution",
        keywords: ["chipped tooth", "daant tutna", "minor caution"]
      },
      {
        id: "brushing-teeth",
        title: "Brushing or Cleaning Teeth",
        hindiTitle: "दांत साफ करना या ब्रश करना",
        categoryId: "teeth",
        categoryName: "Teeth Dreams",
        image: "https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "Unlike the anxious variants above, this reflects active self-care and a healthy desire to present oneself well.",
        swapnaShastra: "This is read neutrally to positively, often simply reflecting the dreamer's genuine daily habits rather than carrying a symbolic weight.",
        shagunShastra: "Folk tradition treats this as a non-omen — a 'day residue' dream, not something requiring interpretation.",
        indication: "Neutral",
        indicationType: "neutral",
        keywords: ["brushing teeth", "daant saaf karna", "daily habit"]
      }
    ]
  },
  {
    id: "death",
    title: "Death & Ancestor Dreams",
    hindiTitle: "Maut aur Pitru Sapna (मृत्यु व पितृ स्वप्न)",
    icon: "🕊️",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80",
    summary: "Death in classical lore almost never implies physical mortality. Instead, it marks dramatic transformations, shedding old karma, and ancestral (Pitru) blessings.",
    keywords: ["death dream meaning", "dream about dying", "dead person in dream meaning", "maut ka sapna"],
    scenarios: [
      {
        id: "own-death",
        title: "Your Own Death",
        hindiTitle: "स्वयं की मृत्यु देखना",
        categoryId: "death",
        categoryName: "Death & Ancestor Dreams",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This rarely predicts anything literal — it typically symbolizes the end of a life phase, an identity shift, or a major, necessary transformation.",
        swapnaShastra: "Somewhat surprisingly, dreaming of one's own death is often read as auspicious in classical tradition, symbolizing the end of troubles and a fresh, more prosperous phase beginning.",
        shagunShastra: "Folk belief strongly echoes this — this dream is popularly considered a sign that difficult circumstances are about to improve significantly.",
        indication: "Auspicious",
        indicationType: "auspicious",
        keywords: ["own death", "khud ki maut", "end of hardship"]
      },
      {
        id: "deceased-relative-peaceful",
        title: "A Deceased Relative Appearing Peacefully",
        hindiTitle: "मृत पूर्वज का शांत व प्रसन्न दिखना",
        categoryId: "death",
        categoryName: "Death & Ancestor Dreams",
        image: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This very common dream usually reflects unresolved grief or the dreamer's internal representation of that person's guidance, offering comfort rather than fear.",
        swapnaShastra: "A peaceful, smiling deceased relative is read as a genuine blessing, believed to bring protection and good fortune to the family.",
        shagunShastra: "This is one of the most reassuring dreams in the entire tradition, and no remedy is typically advised — it is received as a gift.",
        indication: "Highly Auspicious",
        indicationType: "auspicious",
        keywords: ["deceased relative", "pitru darshan", "ancestor blessing"]
      },
      {
        id: "attending-funeral",
        title: "Attending a Funeral",
        hindiTitle: "शवयात्रा या अंतिम संस्कार में जाना",
        categoryId: "death",
        categoryName: "Death & Ancestor Dreams",
        image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This often reflects the dreamer processing an ending already underway in waking life — a job, relationship, or chapter genuinely closing.",
        swapnaShastra: "This is read as a sign that an old situation is concluding, generally making way for something new.",
        shagunShastra: "This is considered a neutral-to-positive sign of closure, especially when the funeral in the dream feels peaceful rather than distressing.",
        indication: "Auspicious",
        indicationType: "auspicious",
        keywords: ["funeral", "antim sanskar", "closure"]
      },
      {
        id: "dying-coming-back-to-life",
        title: "Dying and Then Coming Back to Life",
        hindiTitle: "मरकर पुनः जीवित होना",
        categoryId: "death",
        categoryName: "Death & Ancestor Dreams",
        image: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This powerful image often reflects a profound sense of personal renewal — surviving a difficult period and emerging changed.",
        swapnaShastra: "This is read as an extremely auspicious sign of overcoming a serious obstacle and entering a stronger, renewed phase of life.",
        shagunShastra: "This is considered one of the most positive death-related dreams possible in the entire tradition.",
        indication: "Highly Auspicious",
        indicationType: "auspicious",
        keywords: ["resurrection", "punarjivan", "rebirth"]
      }
    ]
  },
  {
    id: "money-gold",
    title: "Money & Gold Dreams",
    hindiTitle: "Paisa aur Sona (धन व स्वर्ण स्वप्न)",
    icon: "💰",
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1000&q=80",
    summary: "Reflects wealth of character, incoming material fortune, Goddess Lakshmi blessings, and self-worth valuation.",
    keywords: ["money dream meaning", "gold dream meaning", "finding money in dream", "paisa milna sapna"],
    scenarios: [
      {
        id: "finding-money",
        title: "Finding Money on the Ground",
        hindiTitle: "जमीन पर पड़ा धन मिलना",
        categoryId: "money-gold",
        categoryName: "Money & Gold Dreams",
        image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This often reflects a sense of unexpected self-worth being recognized, or a resource the dreamer didn't realize was available to them.",
        swapnaShastra: "Finding money is one of the most consistently auspicious signs in the entire tradition, indicating real incoming prosperity.",
        shagunShastra: "This is popularly considered a very strong, literal sign of gain — financial or otherwise — arriving soon.",
        indication: "Highly Auspicious",
        indicationType: "auspicious",
        keywords: ["finding money", "paisa milna", "incoming prosperity"]
      },
      {
        id: "losing-money",
        title: "Losing Money",
        hindiTitle: "पैसे खो जाना",
        categoryId: "money-gold",
        categoryName: "Money & Gold Dreams",
        image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This often reflects anxiety about self-worth, security, or a fear of resources — emotional or material — slipping away.",
        swapnaShastra: "This is read as a caution against upcoming unnecessary expenses, advising more careful budgeting in the near term.",
        shagunShastra: "Folk tradition advises delaying large purchases for a short period following this dream.",
        indication: "Caution",
        indicationType: "caution",
        keywords: ["losing money", "paisa khona", "budget alert"]
      },
      {
        id: "gold-jewelry",
        title: "Gold Jewelry (Wearing or Receiving)",
        hindiTitle: "सोने के आभूषण पहनना या मिलना",
        categoryId: "money-gold",
        categoryName: "Money & Gold Dreams",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This often reflects a desire to be seen and valued, or genuine confidence in one's current status and worth.",
        swapnaShastra: "Gold jewelry is one of the strongest auspicious symbols in the entire tradition, tied to honor, prosperity, and marital or family happiness.",
        shagunShastra: "This is popularly considered an excellent sign, especially for women, often linked to family celebrations or milestones.",
        indication: "Highly Auspicious",
        indicationType: "auspicious",
        keywords: ["gold jewelry", "sona gahna", "honor and prosperity"]
      }
    ]
  },
  {
    id: "marriage",
    title: "Marriage & Wedding Dreams",
    hindiTitle: "Shaadi Sapna (विवाह स्वप्न)",
    icon: "💍",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
    summary: "Wedding dreams symbolize integration of masculine & feminine aspects, new life commitments, and family harmony.",
    keywords: ["marriage dream meaning", "wedding dream Hindu", "apni shaadi ka sapna", "dream about someone else's wedding"],
    scenarios: [
      {
        id: "own-wedding",
        title: "Your Own Wedding",
        hindiTitle: "स्वयं का विवाह",
        categoryId: "marriage",
        categoryName: "Marriage & Wedding Dreams",
        image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This often relates to committing fully to a new path, project, or partnership — merging two parts of one's own life or identity — not necessarily a literal marriage.",
        swapnaShastra: "A dream of one's own wedding is considered auspicious for prosperity and family harmony in most classical readings.",
        shagunShastra: "Folk tradition treats this as a genuinely good omen for stability, though it advises the dreamer not to rush any real decisions purely because of the dream.",
        indication: "Auspicious",
        indicationType: "auspicious",
        keywords: ["own wedding", "apni shaadi", "life commitment"]
      },
      {
        id: "funeral-at-wedding-reversal",
        title: "Dreaming of Death or a Funeral at a Wedding",
        hindiTitle: "विवाह में मृत्यु देखना (शुभ विलोम)",
        categoryId: "marriage",
        categoryName: "Marriage & Wedding Dreams",
        image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This unusual combination often reflects the dreamer processing mixed feelings about a major commitment — both excitement and grief for what is changing.",
        swapnaShastra: "In one of the tradition's well-known reversals, this specific combination is often read as a sign of a long, stable marriage or life ahead, rather than anything negative.",
        shagunShastra: "This is a frequently cited example of a dream whose surface image (death) is the opposite of its actual traditional meaning (long life) — context overrides literal imagery.",
        indication: "Highly Auspicious",
        indicationType: "auspicious",
        keywords: ["funeral at wedding", "shaadi me maut", "long life omen"]
      }
    ]
  },
  {
    id: "fire",
    title: "Fire Dreams",
    hindiTitle: "Aag Sapna (अग्नि स्वप्न)",
    icon: "🔥",
    image: "https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=1000&q=80",
    summary: "Fire is Agni Dev — the great purifier and transformer. Controlled fire indicates spiritual clarity and sacred ritual (havan), while destructive fire cautions against domestic rage.",
    keywords: ["fire dream meaning", "house on fire dream", "aag ka sapna", "fire dream Hindu astrology"],
    scenarios: [
      {
        id: "controlled-flame-havan",
        title: "A Small, Controlled Flame (Lamp, Candle, Havan)",
        hindiTitle: "दीपक, ज्योति या हवन की अग्नि",
        categoryId: "fire",
        categoryName: "Fire Dreams",
        image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This often reflects a sense of inner clarity, focus, or a spiritual practice currently bringing the dreamer genuine peace.",
        swapnaShastra: "A controlled, glowing flame is considered extremely auspicious, symbolizing spiritual energy, clarity, and success.",
        shagunShastra: "This is one of the most positive fire-related dreams, often linked to successful completion of a prayer or wish.",
        indication: "Highly Auspicious",
        indicationType: "auspicious",
        keywords: ["diya", "havan", "deepak flame", "spiritual clarity"]
      },
      {
        id: "house-on-fire",
        title: "A House on Fire",
        hindiTitle: "घर में आग लगना",
        categoryId: "fire",
        categoryName: "Fire Dreams",
        image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This often reflects a fear that something foundational — family stability, a core relationship, or one's sense of security — is under serious threat.",
        swapnaShastra: "This is read with real caution, traditionally linked to family conflict or financial strain that needs urgent, careful handling.",
        shagunShastra: "Folk tradition advises addressing any pending family disputes calmly and promptly after this dream.",
        indication: "Caution",
        indicationType: "caution",
        remedy: "Lighting a small, controlled lamp (diya) at home for a few consecutive evenings is a traditional calming ritual after this dream.",
        keywords: ["house fire", "ghar me aag", "family conflict"]
      }
    ]
  },
  {
    id: "house",
    title: "House Dreams",
    hindiTitle: "Ghar Sapna (गृह स्वप्न)",
    icon: "🏠",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    summary: "The house represents the self and the architecture of the psyche. Rooms symbolize different faculties, while foundational structure mirrors domestic stability.",
    keywords: ["house dream meaning", "dream about your house", "new rooms in house dream", "ghar ka sapna"],
    scenarios: [
      {
        id: "clean-well-lit-house",
        title: "A Clean, Well-Lit House",
        hindiTitle: "साफ और प्रकाशमय घर",
        categoryId: "house",
        categoryName: "House Dreams",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This reflects a felt sense of order, self-care, and stability across the different 'rooms' (aspects) of the dreamer's life.",
        swapnaShastra: "This is read as a strong sign of domestic peace and prosperity.",
        shagunShastra: "This is considered a genuinely good, simple sign — no remedy needed, simply a reflection of current good fortune.",
        indication: "Auspicious",
        indicationType: "auspicious",
        keywords: ["clean house", "sundar ghar", "domestic peace"]
      },
      {
        id: "discovering-new-rooms",
        title: "Discovering New, Unknown Rooms",
        hindiTitle: "घर में नए अज्ञात कमरे मिलना",
        categoryId: "house",
        categoryName: "House Dreams",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This widely reported dream reflects discovering unexplored potential or unacknowledged parts of the dreamer's own personality waiting to be developed.",
        swapnaShastra: "This is read as a very auspicious sign of hidden opportunity or unexpected gain about to reveal itself.",
        shagunShastra: "This is popularly considered one of the luckiest house-related dreams, often linked to property or family wealth.",
        indication: "Highly Auspicious",
        indicationType: "auspicious",
        keywords: ["new rooms", "naye kamre", "hidden potential"]
      },
      {
        id: "house-collapsing",
        title: "The House Collapsing or Cracking",
        hindiTitle: "घर का गिरना या दरारें पड़ना",
        categoryId: "house",
        categoryName: "House Dreams",
        image: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This often reflects a fear that the foundation of the dreamer's life — career, relationship, or sense of self — feels genuinely unstable right now.",
        swapnaShastra: "This is read with real caution, warning of instability in family or financial matters that deserves prompt attention.",
        shagunShastra: "Folk tradition advises reviewing major decisions carefully and avoiding new large commitments until the situation feels more settled.",
        indication: "Caution",
        indicationType: "caution",
        keywords: ["house collapse", "ghar girna", "stability alert"]
      }
    ]
  },
  {
    id: "career-business",
    title: "Career & Business Dreams",
    hindiTitle: "Career / Vyapaar Sapna (कर्म व व्यापार)",
    icon: "💼",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
    summary: "Workplace scenarios highlight professional self-esteem, upcoming leadership promotions, partnership agreements, and Mercury/Jupiter trade fortunes.",
    keywords: ["job loss dream meaning", "promotion dream meaning", "business dream Hindu", "career dream interpretation"],
    scenarios: [
      {
        id: "getting-promotion",
        title: "Getting a Promotion",
        hindiTitle: "पदोन्नति या तरक्की मिलना",
        categoryId: "career-business",
        categoryName: "Career & Business Dreams",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This often reflects genuine confidence and readiness for greater responsibility that the dreamer already senses within themselves.",
        swapnaShastra: "This is read as a strongly auspicious sign of rising status and recognition.",
        shagunShastra: "This is considered an excellent sign for anyone currently working toward career advancement.",
        indication: "Highly Auspicious",
        indicationType: "auspicious",
        keywords: ["promotion", "tarakki", "recognition"]
      },
      {
        id: "losing-job",
        title: "Losing Your Job",
        hindiTitle: "नौकरी छूटना",
        categoryId: "career-business",
        categoryName: "Career & Business Dreams",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This very common anxiety dream often reflects a fear of inadequacy or instability, and can appear even during genuinely secure periods at work.",
        swapnaShastra: "This is read as a caution to stay diligent and avoid unnecessary risk-taking at work in the near term, rather than a literal prediction.",
        shagunShastra: "Folk belief treats this as a nudge to review your professional standing and relationships quietly, without panic.",
        indication: "Caution",
        indicationType: "caution",
        keywords: ["job loss", "naukri jana", "diligence reminder"]
      },
      {
        id: "signing-deal",
        title: "Signing a Business Deal or Contract",
        hindiTitle: "व्यापारिक अनुबंध पर हस्ताक्षर",
        categoryId: "career-business",
        categoryName: "Career & Business Dreams",
        image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "This often reflects the dreamer's own readiness to commit to a decision that has been under consideration for some time.",
        swapnaShastra: "This is read as an auspicious sign of a favorable agreement or partnership forming.",
        shagunShastra: "This is considered a good sign for anyone currently negotiating a deal.",
        indication: "Auspicious",
        indicationType: "auspicious",
        keywords: ["signing contract", "deal sign", "business deal"]
      }
    ]
  },
  {
    id: "places-objects",
    title: "Sacred Places & Objects",
    hindiTitle: "Sthan aur Vastu (तीर्थ स्थल व वस्तुएं)",
    icon: "🛕",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80",
    summary: "Temples, rivers, sacred texts, mirrors, and keys offer profound symbolic doorways to moral clarity, wisdom, and destiny breakthroughs.",
    keywords: ["temple dream meaning", "keys dream meaning", "mirror dream meaning", "school exam dream"],
    scenarios: [
      {
        id: "temple-sacred-place",
        title: "A Temple or Sacred Place",
        hindiTitle: "मंदिर या तीर्थ स्थल",
        categoryId: "places-objects",
        categoryName: "Sacred Places & Objects",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "Reflects a search for meaning, peace, or moral clarity during inner conflict.",
        swapnaShastra: "One of the most auspicious dream settings in both Swapna Shastra and everyday Shagun belief, indicating divine blessing, fulfillment of prayers, and protection from misfortune.",
        shagunShastra: "Indicates that high spiritual protection surrounds you and an auspicious event is approaching.",
        indication: "Highly Auspicious",
        indicationType: "auspicious",
        keywords: ["temple", "mandir darshan", "divine blessing"]
      },
      {
        id: "keys-finding",
        title: "Finding or Receiving Keys",
        hindiTitle: "चाबी मिलना या पाना",
        categoryId: "places-objects",
        categoryName: "Sacred Places & Objects",
        image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "Symbolize access, opportunity, or the solution to a problem the dreamer has been trying to solve.",
        swapnaShastra: "Receiving or finding a key signals that a long-pending matter is about to resolve favorably.",
        shagunShastra: "Signals open doors in career or real estate matters.",
        indication: "Auspicious",
        indicationType: "auspicious",
        keywords: ["keys", "chabi milna", "unlocked opportunity"]
      },
      {
        id: "sacred-books",
        title: "Books, especially Sacred Texts",
        hindiTitle: "धार्मिक ग्रन्थ या पुस्तक",
        categoryId: "places-objects",
        categoryName: "Sacred Places & Objects",
        image: "https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=800&q=80",
        psychologicalMeaning: "Symbolize knowledge, unresolved lessons, or a chapter of life currently being 'read.'",
        swapnaShastra: "Reading or receiving a sacred text signals gaining wisdom and making a wise upcoming decision.",
        shagunShastra: "Considered a direct sign from Saraswati and Brihaspati of intellectual achievement.",
        indication: "Highly Auspicious",
        indicationType: "auspicious",
        keywords: ["sacred books", "vedic text", "gita book", "wisdom"]
      }
    ]
  }
];

export const RASHI_DREAM_SENSITIVITIES: RashiSensitivity[] = [
  {
    sign: "Aries",
    rashiHindi: "Mesh (मेष)",
    element: "Fire",
    rulingPlanet: "Mars (Mangal)",
    dreamPattern: "Urgent, action-oriented energy — quick, vivid, and sometimes forgotten fast. Fire and conflict imagery appear often.",
    interpretationFocus: "Channel restless energy constructively; focus on resolving impatience."
  },
  {
    sign: "Taurus",
    rashiHindi: "Vrishabh (वृषभ)",
    element: "Earth",
    rulingPlanet: "Venus (Shukra)",
    dreamPattern: "Sensory and grounded — food, land, and material comfort feature often.",
    interpretationFocus: "Unusually reliable indicators of real financial and property matters."
  },
  {
    sign: "Gemini",
    rashiHindi: "Mithun (मिथुन)",
    element: "Air",
    rulingPlanet: "Mercury (Budh)",
    dreamPattern: "Busy, conversational, or involve travel, siblings, and communication themes.",
    interpretationFocus: "Recurring dreams in this sign carry messages worth acting on quickly."
  },
  {
    sign: "Cancer",
    rashiHindi: "Kark (कर्क)",
    element: "Water",
    rulingPlanet: "Moon (Chandra)",
    dreamPattern: "Water, maternal figures, and family imagery are especially frequent and emotionally rich.",
    interpretationFocus: "Closely tied to genuine emotional truth and intuition."
  },
  {
    sign: "Leo",
    rashiHindi: "Simha (सिंह)",
    element: "Fire",
    rulingPlanet: "Sun (Surya)",
    dreamPattern: "Recognition, performance, or animals associated with royalty and power (lions, elephants).",
    interpretationFocus: "Unusually direct reflections of the dreamer's true ambitions and status."
  },
  {
    sign: "Virgo",
    rashiHindi: "Kanya (कन्या)",
    element: "Earth",
    rulingPlanet: "Mercury (Budh)",
    dreamPattern: "Detailed and orderly; anxiety dreams about mistakes or unfinished tasks are common.",
    interpretationFocus: "Mind processing genuine perfectionism and health routines."
  },
  {
    sign: "Libra",
    rashiHindi: "Tula (तुला)",
    element: "Air",
    rulingPlanet: "Venus (Shukra)",
    dreamPattern: "Relationship, balance, and aesthetic themes are frequent.",
    interpretationFocus: "Pay close attention to dreams involving marriage or partnership."
  },
  {
    sign: "Scorpio",
    rashiHindi: "Vrishchik (वृश्चिक)",
    element: "Water",
    rulingPlanet: "Mars / Ketu",
    dreamPattern: "Intense, transformative imagery (death, snakes, deep water) is common.",
    interpretationFocus: "Read very favorably as a natural catalyst for rebirth and mastery."
  },
  {
    sign: "Sagittarius",
    rashiHindi: "Dhanu (धनु)",
    element: "Fire",
    rulingPlanet: "Jupiter (Guru)",
    dreamPattern: "Travel, teachers, temples, and long-distance themes appear often.",
    interpretationFocus: "Genuine guidance about coming journeys, courses of study, or higher purpose."
  },
  {
    sign: "Capricorn",
    rashiHindi: "Makar (मकर)",
    element: "Earth",
    rulingPlanet: "Saturn (Shani)",
    dreamPattern: "Career, structure, and achievement themes dominate; setbacks in dreams surface frequently.",
    interpretationFocus: "Nudge to reassess long-term ambitions, endurance, and pacing."
  },
  {
    sign: "Aquarius",
    rashiHindi: "Kumbh (कुंभ)",
    element: "Air",
    rulingPlanet: "Saturn / Rahu",
    dreamPattern: "Unusual, inventive, collective, or crowd-related dream imagery is common.",
    interpretationFocus: "Reflects original thinking and innovative solutions breaking through."
  },
  {
    sign: "Pisces",
    rashiHindi: "Meen (मीन)",
    element: "Water",
    rulingPlanet: "Jupiter (Guru)",
    dreamPattern: "Highly symbolic, spiritual, ocean-bound, and prophetic dreams are frequent.",
    interpretationFocus: "Naturally attuned to meaningful dreaming; holds highest intuitive weight."
  }
];

export const DAY_TIMING_GUIDE: DayTimingGuide[] = [
  {
    day: "Sunday",
    hindiDay: "Ravivar (रविवार)",
    planet: "Sun (Surya)",
    deity: "Lord Surya",
    themes: "Authority figures, government matters, fathers, gold, vitality.",
    recommendation: "Carries unusual clarity — take the message fairly literally.",
    remedyNote: "Offer Arghya (water) to the Sun in the morning."
  },
  {
    day: "Monday",
    hindiDay: "Somvar (सोमवार)",
    planet: "Moon (Chandra)",
    deity: "Lord Shiva",
    themes: "Emotions, mother, water, family harmony, subconscious mind.",
    recommendation: "Considered an especially good day for calming remedies if the dream was unsettling.",
    remedyNote: "Offer milk or water at a Shiva temple."
  },
  {
    day: "Tuesday",
    hindiDay: "Mangalvar (मंगलवार)",
    planet: "Mars (Mangal)",
    deity: "Lord Hanuman",
    themes: "Conflict, courage, land, property, physical energy, siblings.",
    recommendation: "Best day for protective measures against disturbing dreams.",
    remedyNote: "Recite Hanuman Chalisa or visit a Hanuman temple."
  },
  {
    day: "Wednesday",
    hindiDay: "Budhvar (बुधवार)",
    planet: "Mercury (Budh)",
    deity: "Lord Ganesha",
    themes: "Communication, business, commerce, education, intelligence.",
    recommendation: "Good day to begin addressing practical matters flagged by a dream.",
    remedyNote: "Chant 'Om Gan Ganapataye Namah' or feed green grass to a cow."
  },
  {
    day: "Thursday",
    hindiDay: "Guruvar (गुरुवार)",
    planet: "Jupiter (Guru / Brihaspati)",
    deity: "Lord Vishnu / Guru",
    themes: "Wisdom, marriage, spiritual teacher, wealth, expansion.",
    recommendation: "The most auspicious day for dreams overall; remedies performed are especially fruitful.",
    remedyNote: "Offer yellow flowers or chana dal to Lord Vishnu."
  },
  {
    day: "Friday",
    hindiDay: "Shukravar (शुक्रवार)",
    planet: "Venus (Shukra)",
    deity: "Goddess Lakshmi",
    themes: "Love, luxury, romance, vehicle, artistic creation, harmony.",
    recommendation: "Favored day for remedies related to prosperity and relationship happiness.",
    remedyNote: "Light a ghee lamp in the evening and chant Lakshmi Suktam."
  },
  {
    day: "Saturday",
    hindiDay: "Shanivar (शनिवार)",
    planet: "Saturn (Shani)",
    deity: "Lord Shani / Bhairava",
    themes: "Obstacles, karmic lessons, delay, elders, discipline.",
    recommendation: "Obstacle dreams are taken seriously; ideal day for performing Upays.",
    remedyNote: "Light a mustard-oil lamp under a Peepal tree or donate black sesame."
  }
];

export const MANTRA_REMEDY_TOOLKIT: MantraRemedyItem[] = [
  {
    dreamCategory: "Snake Dreams / Rahu Influence",
    deity: "Lord Shiva",
    mantra: "Om Tryambakam Yajamahe Sugandhim Pushtivardhanam...",
    upay: "Offer raw milk & bilva patra on a Shivling on Monday.",
    bestDay: "Monday"
  },
  {
    dreamCategory: "Money Loss / Financial Anxiety",
    deity: "Goddess Lakshmi",
    mantra: "Om Shreem Mahalakshmiyei Namaha",
    upay: "Light a pure ghee diya in the northeast corner on Friday evening.",
    bestDay: "Friday"
  },
  {
    dreamCategory: "Family Conflict / Emotional Storms",
    deity: "Goddess Durga",
    mantra: "Sarva Mangala Mangalye Shive Sarvartha Sadhike...",
    upay: "Offer red flowers to Maa Durga on Tuesday or Friday.",
    bestDay: "Tuesday / Friday"
  },
  {
    dreamCategory: "Nightmares, Chased, Paralyzing Fear",
    deity: "Lord Hanuman",
    mantra: "Bhoot Pishach Nikat Nahi Aave, Mahabir Jab Naam Sunave",
    upay: "Recite the Hanuman Chalisa before sleeping; apply sindoor tilak.",
    bestDay: "Tuesday / Saturday"
  },
  {
    dreamCategory: "Deceased Relatives / Amavasya Dreams",
    deity: "Pitru Devata",
    mantra: "Om Pitrubhyo Namaha",
    upay: "Feed crows, cows, and the needy with warm food and water.",
    bestDay: "Amavasya / Saturday"
  },
  {
    dreamCategory: "Health Caution / Blood & Injury",
    deity: "Lord Dhanvantari",
    mantra: "Om Namo Bhagavate Vasudevaya Dhanvantaraye...",
    upay: "Combine prayer with an actual medical check-up — never substitute medical care.",
    bestDay: "Sunday / Thursday"
  },
  {
    dreamCategory: "Obstacles, Delays & New Beginnings",
    deity: "Lord Ganesha",
    mantra: "Vakratunda Mahakaya Suryakoti Samaprabha...",
    upay: "Offer 21 blades of Durva grass and a modak to Lord Ganesha.",
    bestDay: "Wednesday"
  },
  {
    dreamCategory: "Court Cases & Legal Disputes",
    deity: "Lord Shani",
    mantra: "Om Sham Shanaishcharaye Namah",
    upay: "Donate mustard oil or black sesame seeds to the underprivileged.",
    bestDay: "Saturday"
  }
];

export const GEMSTONE_PLANET_REFERENCE: GemstonePlanetItem[] = [
  { gemstone: "Ruby", hindiName: "Manikya (माणिक्य)", planet: "Sun (Surya)", quality: "Confidence, authority, leadership, and vitality.", counselNote: "Consult an astrologer before wearing." },
  { gemstone: "Natural Pearl", hindiName: "Moti (मोती)", planet: "Moon (Chandra)", quality: "Emotional calm, mental peace, and family harmony.", counselNote: "Calms agitated lunar dreams." },
  { gemstone: "Red Coral", hindiName: "Moonga (मूंगा)", planet: "Mars (Mangal)", quality: "Courage, physical stamina, and protection from rivalry.", counselNote: "Strengthens willpower." },
  { gemstone: "Emerald", hindiName: "Panna (पन्ना)", planet: "Mercury (Budh)", quality: "Sharp intellect, clear communication, and trade success.", counselNote: "Enhances logical grounding." },
  { gemstone: "Yellow Sapphire", hindiName: "Pukhraj (पुखराज)", planet: "Jupiter (Guru)", quality: "Spiritual wisdom, wealth, and marriage prosperity.", counselNote: "Brings auspicious growth." },
  { gemstone: "Diamond / White Sapphire", hindiName: "Heera (हीरा)", planet: "Venus (Shukra)", quality: "Love, aesthetic harmony, luxury, and artistic grace.", counselNote: "Fosters relationship peace." },
  { gemstone: "Blue Sapphire", hindiName: "Neelam (नीलम)", planet: "Saturn (Shani)", quality: "Karmic discipline and focus (powerful & swift).", counselNote: "Approached with strict astrological testing." },
  { gemstone: "Hessonite", hindiName: "Gomed (गोमेद)", planet: "Rahu", quality: "Clarity amid illusion, protection against illusions.", counselNote: "Soothes chaotic snake nightmares." },
  { gemstone: "Cat's Eye", hindiName: "Lehsunia (लहसुनिया)", planet: "Ketu", quality: "Spiritual detachment, moksha, and mystic protection.", counselNote: "Deepens meditative insights." }
];

export const LIFE_STAGE_GUIDES: LifeStageGuide[] = [
  {
    id: "expecting-mothers",
    title: "For Expecting Mothers",
    subtitle: "Garbh Sanskar & Emotional Harmony During Pregnancy",
    image: "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80",
    content: [
      "Pregnancy is one of the periods when dreaming becomes noticeably more vivid and frequent, partly due to hormonal fluctuations and sleep shifts, and partly because deep emotional processing is underway.",
      "Anxiety dreams about the baby's arrival, labor, or changing lifestyle are common and reflect the natural weight of transition, not a premonition.",
      "In the Garbh Sanskar tradition, mothers are encouraged to maintain serene environments and peaceful visual memories."
    ],
    practicalTips: [
      "Keep a soothing bedtime routine with calming music or evening walk.",
      "Share recurring feelings with your partner, doctor, or doula.",
      "Do not decode folk gender omens as medical certainty."
    ],
    traditionalFolkNote: "Traditional folk lore mentions dreaming of the moon or fish for feminine energy, or the sun/elephant for masculine energy. These are purely cultural stories and have zero medical reliability."
  },
  {
    id: "students-exams",
    title: "For Students During Exam Season",
    subtitle: "Decoding Test Anxiety & Mental Rehearsal",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    content: [
      "The unprepared-exam dream is one of the most universal anxiety dreams in the world, appearing even decades into adulthood whenever one faces evaluations.",
      "During exams, these dreams are your brain's natural simulation mode rehearsing scenarios to foster resilience.",
      "Swapna Shastra views this not as a bad omen, but as a psychological call to steady your daily preparation."
    ],
    practicalTips: [
      "Prioritize 7-8 hours of sleep in the final days before exams instead of late-night cramming.",
      "A 2-minute breathwork routine or Saraswati Vandana in the morning settles autonomic nerves.",
      "Treat test dreams as proof of your dedication, not impending failure."
    ],
    traditionalFolkNote: "Folk tradition prescribes no heavy remedies for exam dreams; consistent study and a peaceful morning routine are the true Upay."
  },
  {
    id: "business-owners",
    title: "For Business Owners & Entrepreneurs",
    subtitle: "Navigating High-Stakes Risks & Financial Omens",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    content: [
      "Entrepreneurs carry constant uncertainty, making money, contracts, and competitors frequent dream themes.",
      "A dream flagging risk is a practical prompt to double-check balance sheets, contracts, and audit trails with a cool head.",
      "Thursday (Jupiter) and Friday (Venus) dreams often carry extra resonance for commercial enterprises."
    ],
    practicalTips: [
      "Track whether stress dreams cluster around quarterly deadlines or contract renewals.",
      "Never make impulsive financial changes based purely on a morning dream.",
      "Seek counsel from trusted advisors when a dream highlights a blind spot."
    ],
    traditionalFolkNote: "In traditional commerce, lighting a camphor lamp on Friday evening and donating a fraction of earnings is believed to maintain auspicious commercial flow."
  },
  {
    id: "child-nightmares",
    title: "A Parent's Guide to Child Nightmares",
    subtitle: "Soothing Young Imaginations with Calm Reassurance",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
    content: [
      "Nightmares peak between ages 3 and 6 as cognitive imagination develops faster than reality discrimination.",
      "The golden rule is gentle emotional safety rather than intellectual decoding. Young children need to feel protected immediately.",
      "Simple bedtime rituals, warm nightlights, and calm morning check-ins provide immense relief."
    ],
    practicalTips: [
      "Avoid discussing dream omens with young children so as not to cause unnecessary worry.",
      "A soft nightlight and consistent bedtime story anchor emotional security.",
      "Consult a pediatrician if night terrors persist for multiple weeks."
    ],
    traditionalFolkNote: "Traditional households use a small gentle night lamp and a soft prayer like the Gayatri Mantra or Hanuman Chalisa whispered gently over the child's head."
  }
];

export const SPECIAL_TOPICS: SpecialTopic[] = [
  {
    id: "recurring-dreams",
    title: "Recurring Dreams (पुनरावृत्त स्वप्न)",
    tagline: "The Subconscious Knocking Until Acknowledged",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    psychologicalPerspective: "A repeating dream points to an unintegrated emotional complex or unresolved dilemma. The mind repeats the motif with escalating vividness until conscious awareness resolves the underlying conflict.",
    traditionalVedicPerspective: "Swapna Shastra reads persistent dreams as an outstanding karmic duty, ancestral message (Pitru), or unfulfilled vow (Sankalpa) seeking closure.",
    actionableTechniques: [
      "Maintain a dream diary noting waking feelings immediately upon waking.",
      "Identify the exact turning point in the dream where tension peaks.",
      "Take small concrete real-life actions (e.g. apologies, closure conversations, charity)."
    ]
  },
  {
    id: "brahma-muhurta",
    title: "Dreams in the Brahma Muhurta (Early Dawn Hours)",
    tagline: "The Sacred 90 Minutes Before Sunrise",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    psychologicalPerspective: "Sleep science confirms that REM cycles are longest and most narrative during the early morning hours, creating rich, vivid, and memorable dreams.",
    traditionalVedicPerspective: "Classical texts state that dreams seen during Brahma Muhurta (roughly 3:30 AM to 5:00 AM) are free from daytime food and stress toxins, offering the purest spiritual clarity.",
    actionableTechniques: [
      "Do not narrate vivid dawn dreams before sunrise.",
      "Sip warm water and record key symbols immediately.",
      "Reflect on the peaceful or warning nature of the message with equanimity."
    ]
  },
  {
    id: "lucid-dreaming",
    title: "Lucid Dreaming & Conscious Awareness",
    tagline: "Awakening Within the Dreamscape",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80",
    psychologicalPerspective: "Lucid dreaming occurs when meta-cognition reactivates within REM sleep. It is utilized in modern therapy to transform recurring nightmares into empowering resolutions.",
    traditionalVedicPerspective: "Vedic contemplative traditions link conscious dreaming to Svapna Yoga and Yoga Nidra — cultivating witness consciousness (Sakshi Bhava) across waking, dreaming, and deep sleep.",
    actionableTechniques: [
      "Perform daytime reality checks (e.g. looking at hands or clocks twice).",
      "Set an intention before sleeping: 'Tonight I will realize I am dreaming.'",
      "Maintain emotional calmness upon gaining lucidity to prevent premature waking."
    ]
  }
];

export const GENERAL_DREAM_REMEDIES: string[] = [
  "Do not narrate a disturbing dream to anyone before sunrise; traditional belief holds that speaking it too early can 'activate' it, while waiting until after sunrise lets it settle.",
  "Drink a small sip of water immediately upon waking from an unsettling dream to symbolically wash away its energetic residue.",
  "Offer a small act of charity — food, grain, or clothing to those in need — as a universal remedy for cautionary dreams.",
  "Recite a short calming mantra (such as the Maha Mrityunjaya Mantra or Hanuman Chalisa) before returning to sleep.",
  "Avoid making major impulsive financial or relationship commitments on the same day as an unsettling dream; allow one full day of ordinary routine first.",
  "Keep a dream journal by your bedside. Modern neuroscience and traditional wisdom both confirm that recording dreams reduces nightmare distress."
];
