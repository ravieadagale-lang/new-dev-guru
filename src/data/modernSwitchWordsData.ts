// Modern Switch Words & Universal Energy Codes Database
// Originating from James T. Mangan (1963), expanded by Kat Miller & Modern Radionics

export interface ModernSwitchWordItem {
  id: string;
  word: string;
  type: "Master" | "Single" | "Switch-Pair" | "Universal-Phrase" | "Defusing";
  category: "wealth" | "love" | "health" | "career" | "protection" | "peace";
  categoryLabel: string;
  triggerMeaning: string;
  applicationScenario: string;
  chantingFormula: string;
  switchPairOrPhrase?: string;
  energyCircleColor: string;
  waterBroadcastTechnique: string;
  bodyWritingGuidance: string;
  defusingAction?: string;
  authorOrigin: "James T. Mangan (1963)" | "Kat Miller" | "Modern Energy Healing";
}

export interface ModernRuleProtocol {
  id: string;
  title: string;
  category: string;
  ruleStatement: string;
  howToApply: string;
  tips: string;
}

export const MODERN_SWITCHWORDS_RULES: ModernRuleProtocol[] = [
  {
    id: "master_switch_together",
    title: "The Universal Master Switchword: 'TOGETHER'",
    category: "Foundational Law",
    ruleStatement: "The word 'TOGETHER' is the master key discovered by James T. Mangan. It commands the conscious mind (10% logical gatekeeper) and the subconscious mind (90% creative engine) to align instantly in unified resonance.",
    howToApply: "Always begin multi-word phrases with 'TOGETHER' (e.g., 'TOGETHER-DIVINE-COUNT-NOW-DONE') to bypass logical doubt and self-criticism.",
    tips: "Say 'TOGETHER' silently whenever you feel your thoughts fragmenting, scattered, or conflicted."
  },
  {
    id: "no_strain_repetition",
    title: "Effortless Japa Repetition Rule",
    category: "Chanting Protocol",
    ruleStatement: "Switchwords work through subconscious bypass, NOT through emotional straining, begging, or desperate wanting. Desperation signals 'lack', which manifests more lack.",
    howToApply: "Chant the word or phrase in a light, playful, rhythmic rhythm 28 times or 108 times, 3 times a day. You can chant out loud, in a whisper, or mentally.",
    tips: "Treat it like humming a catchy song. Do not obsess over 'when will it work?'; just release it to the quantum field."
  },
  {
    id: "energy_circle_broadcasting",
    title: "Energy Circles (EC) & Paper Broadcast Rule",
    category: "Radionic Transmission",
    ruleStatement: "An Energy Circle (EC) acts as a visual radionic antenna that broadcasts the frequency of the switchword directly into your energy field 24 hours a day without mental fatigue.",
    howToApply: "1. Draw a clean circle with a colored pen (Green for money, Pink for love, Blue for health/peace) on unruled white paper. 2. Write your full name or goal in the top half. 3. Write the Switchwords in all caps in the center. 4. Place a transparent glass of water on the circle for 15 seconds to charge water.",
    tips: "Never let the circle line break or have gaps. Keep the Energy Circle in a clean personal drawer or on your work desk."
  },
  {
    id: "body_skin_anchoring",
    title: "Non-Dominant Body Writing Protocol",
    category: "Bio-Energy Anchoring",
    ruleStatement: "Writing words on the skin creates constant sensory tactile and visual input that penetrates subconscious neural pathways throughout the day.",
    howToApply: "Write the Switchword with a ballpoint pen or skin-safe marker on the inside of your non-dominant wrist, left arm, or thigh. Left side is receptive for receiving; right side is projective.",
    tips: "Use Blue ink for health/peace, Green ink for money/clients, and Pink/Red for love and romance."
  },
  {
    id: "defusing_words_cleanup",
    title: "Pre-Chanting Defusing Protocol",
    category: "Emotional Clearing",
    ruleStatement: "If your mind is boiling with rage, anxiety, or financial panic, switchwords cannot plant their seeds in such toxic soil. You must first 'defuse' the emotional charge.",
    howToApply: "Use defusing switchwords: 'CANCEL-CLEAR-DELETE' 10 times to wipe away intrusive thoughts, or 'SLOW-PEACE' to stop heart palpitations, BEFORE chanting wealth or love codes.",
    tips: "Whenever a negative fear comes into your head ('I won't be able to pay bills'), immediately say 'CANCEL-CANCEL-CANCEL' and switch to 'COUNT'."
  },
  {
    id: "water_sipping_transfer",
    title: "Hydro-Broadcast Charging Method",
    category: "Water Imprinting",
    ruleStatement: "Dr. Masaru Emoto demonstrated that water molecules form high-coherence crystalline structures when exposed to intentional words and sound vibrations.",
    howToApply: "Hold a glass of water, chant the switchword 28 times directly into the water, and sip it mindfully. You can also tape a label with the switchword onto your water bottle.",
    tips: "Drink one full glass of switchword-charged water first thing every morning and right before bed."
  }
];

export const MODERN_SWITCH_WORDS_CATALOG: ModernSwitchWordItem[] = [
  // 1. WEALTH & ABUNDANCE
  {
    id: "msw-count",
    word: "COUNT",
    type: "Master",
    category: "wealth",
    categoryLabel: "Wealth & Finance",
    triggerMeaning: "Flips the subconscious dial to tally money, multiply earnings, and attract unexpected financial checks.",
    applicationScenario: "Use when facing unpaid bills, low bank balances, slow sales, or wanting extra income.",
    chantingFormula: "Chant 'COUNT' 28 times morning and evening, or whenever looking at your wallet or bank app.",
    switchPairOrPhrase: "TOGETHER-DIVINE-COUNT-NOW-DONE",
    energyCircleColor: "Bright Emerald Green border on clean white paper",
    waterBroadcastTechnique: "Tape 'COUNT' onto a glass bottle; drink throughout the business workday.",
    bodyWritingGuidance: "Write 'COUNT' in green ink on the left inner wrist.",
    authorOrigin: "James T. Mangan (1963)"
  },
  {
    id: "msw-find",
    word: "FIND",
    type: "Master",
    category: "wealth",
    categoryLabel: "Wealth & Finance",
    triggerMeaning: "Uncovers hidden treasures, lucrative untapped business niches, lucky breaks, and golden opportunities.",
    applicationScenario: "When searching for high-paying job opportunities, lucrative investments, or lost physical valuables.",
    chantingFormula: "Chant 'FIND' 28 times while visualizing doors opening and solutions appearing.",
    switchPairOrPhrase: "FIND-DIVINE-COUNT-GOLD",
    energyCircleColor: "Golden Yellow or Emerald Green circle",
    waterBroadcastTechnique: "Place water glass on an Energy Circle with 'FIND' for 30 seconds before drinking.",
    bodyWritingGuidance: "Write 'FIND' on the left palm before attending client pitches or job interviews.",
    authorOrigin: "James T. Mangan (1963)"
  },
  {
    id: "msw-give",
    word: "GIVE",
    type: "Single",
    category: "wealth",
    categoryLabel: "Wealth & Finance",
    triggerMeaning: "Stimulates spontaneous buying behavior in others, making them eager to purchase your products or services.",
    applicationScenario: "When running a sales campaign, launching an e-commerce product, or negotiating contracts.",
    chantingFormula: "Chant 'GIVE' 28 times before sending invoices, publishing offers, or making cold calls.",
    switchPairOrPhrase: "GIVE-COUNT-BRING-NOW",
    energyCircleColor: "Green border with client list or company name inside",
    waterBroadcastTechnique: "Sprinkle 'GIVE' charged water lightly over your office desk and sales computer.",
    bodyWritingGuidance: "Write 'GIVE' on the right (giving/projective) hand before client negotiations.",
    authorOrigin: "James T. Mangan (1963)"
  },
  {
    id: "msw-scheme",
    word: "SCHEME",
    type: "Single",
    category: "wealth",
    categoryLabel: "Wealth & Finance",
    triggerMeaning: "Sparks brilliant business designs, advertising blueprints, system architectures, and monetization strategies.",
    applicationScenario: "When brainstorming a new startup, revamping marketing funnels, or structuring partnerships.",
    chantingFormula: "Chant 'SCHEME' 28 times while holding a notebook and pen ready to capture ideas.",
    switchPairOrPhrase: "SCHEME-POINT-BRING-DONE",
    energyCircleColor: "Deep Royal Blue or Violet border",
    waterBroadcastTechnique: "Sip 'SCHEME' charged water during strategic executive meetings.",
    bodyWritingGuidance: "Write on the non-dominant forearm in blue ink during creative work sessions.",
    authorOrigin: "James T. Mangan (1963)"
  },

  // 2. LOVE, RELATIONSHIPS & HARMONY
  {
    id: "msw-love",
    word: "LOVE",
    type: "Master",
    category: "love",
    categoryLabel: "Love & Magnetism",
    triggerMeaning: "Generates an irresistible radiant aura of emotional warmth, soulmate magnetism, and deep affection.",
    applicationScenario: "When seeking your romantic soulmate, softening a cold partner, or resolving bitter feuds.",
    chantingFormula: "Chant 'LOVE' 28 times with hands over your heart center while smiling gently.",
    switchPairOrPhrase: "TOGETHER-DIVINE-LOVE-BE",
    energyCircleColor: "Gentle Rose Pink or Warm Magenta border",
    waterBroadcastTechnique: "Place a glass of water on a pink EC containing both partners' names and 'LOVE'.",
    bodyWritingGuidance: "Write 'LOVE' in pink or red ink near the heart or left inner arm.",
    authorOrigin: "James T. Mangan (1963)"
  },
  {
    id: "msw-sweet",
    word: "SWEET",
    type: "Single",
    category: "love",
    categoryLabel: "Love & Magnetism",
    triggerMeaning: "Instantly dissolves bitterness, spite, harsh criticism, and defensive passive-aggressiveness.",
    applicationScenario: "When dealing with a grumpy boss, quarrelsome in-laws, or an irritable spouse.",
    chantingFormula: "Silently chant 'SWEET' 28 times while looking at the agitated person or before talking to them.",
    switchPairOrPhrase: "SWEET-CHARM-RESTORE-NOW",
    energyCircleColor: "Pastel Pink or Soft Peach border",
    waterBroadcastTechnique: "Serve water charged with 'SWEET' to guests or family members prone to anger.",
    bodyWritingGuidance: "Write 'SWEET' on the base of the left throat.",
    authorOrigin: "James T. Mangan (1963)"
  },
  {
    id: "msw-restore",
    word: "RESTORE",
    type: "Single",
    category: "love",
    categoryLabel: "Love & Magnetism",
    triggerMeaning: "Rebuilds shattered trust, heals emotional estrangement, and brings people back to their pristine bond.",
    applicationScenario: "After a painful breakup, betrayal, or long-standing silence between family members.",
    chantingFormula: "Chant 'RESTORE' 54 times while visualizing the relationship bathed in warm golden light.",
    switchPairOrPhrase: "RESTORE-SWEET-LOVE-TOGETHER",
    energyCircleColor: "Emerald Green (healing) or Rose Pink border",
    waterBroadcastTechnique: "Drink 'RESTORE' water every evening to release resentment from past heartbreaks.",
    bodyWritingGuidance: "Write 'RESTORE' on the center of the chest with a skin-safe pen.",
    authorOrigin: "James T. Mangan (1963)"
  },
  {
    id: "msw-charm",
    word: "CHARM",
    type: "Single",
    category: "love",
    categoryLabel: "Love & Magnetism",
    triggerMeaning: "Projects hypnotic social allure, captivating grace, fascinating eyes, and enchanting presence.",
    applicationScenario: "Before going on a date, attending high-profile parties, or speaking on camera.",
    chantingFormula: "Look in the mirror, smile, and chant 'CHARM' 28 times before stepping out.",
    switchPairOrPhrase: "CHARM-PRAISE-BE",
    energyCircleColor: "Vibrant Violet or Magenta border",
    waterBroadcastTechnique: "Wash your face with 'CHARM' charged water before social gatherings.",
    bodyWritingGuidance: "Write 'CHARM' on the left collarbone.",
    authorOrigin: "James T. Mangan (1963)"
  },

  // 3. HEALTH, HEALING & SLEEP
  {
    id: "msw-be",
    word: "BE",
    type: "Master",
    category: "health",
    categoryLabel: "Health & Vitality",
    triggerMeaning: "Anchors supreme physical resilience, immune robustness, disease resistance, and peace with reality.",
    applicationScenario: "To prevent catching seasonal flu, protect health during travel, and maintain radiant stamina.",
    chantingFormula: "Chant 'BE' 28 or 108 times while feeling grounded into the earth.",
    switchPairOrPhrase: "TOGETHER-BE-DIVINE-PERFECT",
    energyCircleColor: "Deep Sky Blue or Forest Green border",
    waterBroadcastTechnique: "Tape 'BE' to your daily water flask; drink 2 liters throughout the day.",
    bodyWritingGuidance: "Write 'BE' on the left inner forearm in blue ink.",
    authorOrigin: "James T. Mangan (1963)"
  },
  {
    id: "msw-change",
    word: "CHANGE",
    type: "Master",
    category: "health",
    categoryLabel: "Health & Vitality",
    triggerMeaning: "Signals the subconscious to alter a physical symptom, relieve localized pain, or soothe headaches.",
    applicationScenario: "Acute headaches, muscle spasms, menstrual cramps, or toothaches while awaiting care.",
    chantingFormula: "Place hand over the painful area and chant 'CHANGE-CHANGE-CHANGE' rhythmically for 3 minutes.",
    switchPairOrPhrase: "CHANGE-ADJUST-ICE-BE",
    energyCircleColor: "Sky Blue border with the affected organ written in the center",
    waterBroadcastTechnique: "Sip water charged with 'CHANGE' slowly while resting.",
    bodyWritingGuidance: "Write 'CHANGE' directly adjacent to the painful joint or area in blue pen.",
    authorOrigin: "James T. Mangan (1963)"
  },
  {
    id: "msw-off",
    word: "OFF",
    type: "Single",
    category: "health",
    categoryLabel: "Sleep & Insomnia",
    triggerMeaning: "Flips the mental circuit breaker to shut down racing thoughts, overthinking, and insomnia.",
    applicationScenario: "When lying in bed wide awake at 2:00 AM unable to sleep due to work worries.",
    chantingFormula: "Lie down in dark room, take slow breaths, and whisper 'OFF... OFF... OFF...' until you drift to sleep.",
    switchPairOrPhrase: "OFF-SLOW-PEACE-NOW",
    energyCircleColor: "Midnight Indigo or Dark Navy border",
    waterBroadcastTechnique: "Drink a warm cup of water charged with 'OFF' 15 minutes before bedtime.",
    bodyWritingGuidance: "Write 'OFF' on the bottom of the left foot before sleeping.",
    authorOrigin: "James T. Mangan (1963)"
  },
  {
    id: "msw-ice",
    word: "ICE",
    type: "Single",
    category: "health",
    categoryLabel: "Health & Vitality",
    triggerMeaning: "Cools acute inflammatory heat, reduces fever, soothes skin burns, and quells fiery temper.",
    applicationScenario: "High body temperature, sun burn, acid reflux, or burning skin irritation.",
    chantingFormula: "Chant 'ICE' 28 times while visualizing soothing, cool mountain snow settling over the heat.",
    switchPairOrPhrase: "ICE-CHANGE-BE",
    energyCircleColor: "Ice Cyan or Light Blue border",
    waterBroadcastTechnique: "Charge cold drinking water with 'ICE'; sip slowly.",
    bodyWritingGuidance: "Write on the left wrist in light blue marker.",
    authorOrigin: "Kat Miller"
  },

  // 4. CAREER, PRODUCTIVITY & EXAMS
  {
    id: "msw-care",
    word: "CARE",
    type: "Single",
    category: "career",
    categoryLabel: "Career & Study",
    triggerMeaning: "Locks information into long-term photographic memory and stimulates deep intellectual retention.",
    applicationScenario: "When studying for difficult exams, learning a foreign language, or memorizing scripts.",
    chantingFormula: "Chant 'CARE' 28 times before cracking open textbooks or revision notes.",
    switchPairOrPhrase: "CARE-ATTENTION-REACH-NOW",
    energyCircleColor: "Bright Yellow border (Solar Plexus intellect)",
    waterBroadcastTechnique: "Keep a water bottle on an EC with 'CARE' beside your study desk.",
    bodyWritingGuidance: "Write 'CARE' on the index finger or inner left wrist with yellow or green ink.",
    authorOrigin: "James T. Mangan (1963)"
  },
  {
    id: "msw-done",
    word: "DONE",
    type: "Master",
    category: "career",
    categoryLabel: "Productivity & Focus",
    triggerMeaning: "Obliterates procrastination, finishes lingering half-completed tasks, and executes to completion.",
    applicationScenario: "When feeling stuck, procrastinating on tax returns, gym sessions, or completing thesis work.",
    chantingFormula: "Chant 'DONE' 28 times with firm authority, then stand up and take the first physical step.",
    switchPairOrPhrase: "TOGETHER-ON-DONE-NOW",
    energyCircleColor: "Red or Orange border (Action energy)",
    waterBroadcastTechnique: "Drink a full glass charged with 'DONE' before beginning a 2-hour deep work sprint.",
    bodyWritingGuidance: "Write 'DONE' on the inside of the left wrist with black or red ink.",
    authorOrigin: "James T. Mangan (1963)"
  },
  {
    id: "msw-reach",
    word: "REACH",
    type: "Master",
    category: "career",
    categoryLabel: "Career & Innovation",
    triggerMeaning: "Connects your conscious mind to the cosmic Akashic web to retrieve forgotten names, items, or solutions.",
    applicationScenario: "When searching for lost keys/passwords, solving complex bugs, or recalling a buried memory.",
    chantingFormula: "Close your eyes, breathe, and chant 'REACH... REACH... REACH...' until the sudden flash of insight arrives.",
    switchPairOrPhrase: "REACH-FIND-POINT-NOW",
    energyCircleColor: "Purple or Indigo border",
    waterBroadcastTechnique: "Sip 'REACH' water during intense troubleshooting or debugging sessions.",
    bodyWritingGuidance: "Write 'REACH' between the eyebrows or on the forehead (symbolically) or on the left thumb.",
    authorOrigin: "James T. Mangan (1963)"
  },

  // 5. PROTECTION & EMOTIONAL DEFUSING
  {
    id: "msw-guard",
    word: "GUARD",
    type: "Single",
    category: "protection",
    categoryLabel: "Protection & Boundaries",
    triggerMeaning: "Erects an impenetrable psychic boundary against toxic people, energy vampires, and malicious gossip.",
    applicationScenario: "When walking into a toxic office, meeting manipulative individuals, or traveling in sketchy areas.",
    chantingFormula: "Chant 'GUARD' 28 times while visualizing a circular titanium armor shielding your aura.",
    switchPairOrPhrase: "GUARD-LIMIT-DIVINE-SHIELD",
    energyCircleColor: "Black, Charcoal, or Deep Violet border",
    waterBroadcastTechnique: "Sprinkle 'GUARD' charged water around your front door entrance and luggage.",
    bodyWritingGuidance: "Write 'GUARD' on the nape of your neck or non-dominant wrist in black ink.",
    authorOrigin: "James T. Mangan (1963)"
  },
  {
    id: "msw-cancel",
    word: "CANCEL",
    type: "Defusing",
    category: "protection",
    categoryLabel: "Emotional Defusing",
    triggerMeaning: "Erases unwanted negative thoughts, anxiety spirals, superstitious dread, and pessimistic predictions.",
    applicationScenario: "Whenever a dark doom thought enters your head ('What if I go bankrupt? What if I get fired?').",
    chantingFormula: "Immediately say 'CANCEL-CANCEL-CANCEL' out loud or mentally with zero tolerance for the thought.",
    switchPairOrPhrase: "CANCEL-CLEAR-DELETE",
    energyCircleColor: "White paper with an X over negative statements",
    waterBroadcastTechnique: "Pour away old stagnant water, refill freshly, and whisper 'CANCEL-CLEAR'.",
    bodyWritingGuidance: "Do not write on body; use as immediate cognitive defusing hammer.",
    defusingAction: "Instantly wipes subconscious acceptance of fear.",
    authorOrigin: "James T. Mangan (1963)"
  },
  {
    id: "msw-slow",
    word: "SLOW",
    type: "Single",
    category: "peace",
    categoryLabel: "Peace & Calming",
    triggerMeaning: "Instantly downregulates panic, slows rapid heart rate, dispels impatience, and dissolves road rage.",
    applicationScenario: "When caught in maddening traffic, experiencing trembling stage fright, or panicking over deadlines.",
    chantingFormula: "Breathe deeply, prolonging your exhales, and whisper 'SLOW... SLOW... SLOW...' 28 times.",
    switchPairOrPhrase: "SLOW-PEACE-ADJUST-BE",
    energyCircleColor: "Soft Turquoise or Pale Green border",
    waterBroadcastTechnique: "Drink cool water charged with 'SLOW' in very small, measured, quiet sips.",
    bodyWritingGuidance: "Write 'SLOW' over the pulse point on the left wrist in blue ink.",
    authorOrigin: "James T. Mangan (1963)"
  },

  // 6. POPULAR MULTI-WORD PHRASES
  {
    id: "msw-phrase-wealth-done",
    word: "TOGETHER-DIVINE-COUNT-NOW-DONE",
    type: "Universal-Phrase",
    category: "wealth",
    categoryLabel: "Master Manifestation",
    triggerMeaning: "The world-famous master wealth phrase uniting subconscious power with immediate manifestation.",
    applicationScenario: "Everyday money manifestation, sales closures, attracting debt clearance resources.",
    chantingFormula: "Chant the full hyphenated phrase 28 times, 3 times a day (total 84 times).",
    switchPairOrPhrase: "TOGETHER-DIVINE-COUNT-NOW-DONE",
    energyCircleColor: "Emerald Green double-line circle",
    waterBroadcastTechnique: "Keep water on this EC permanently; drink every 3 hours.",
    bodyWritingGuidance: "Write with green marker on inner left forearm.",
    authorOrigin: "Kat Miller"
  },
  {
    id: "msw-phrase-soulmate",
    word: "TOGETHER-DIVINE-LOVE-BE",
    type: "Universal-Phrase",
    category: "love",
    categoryLabel: "Master Manifestation",
    triggerMeaning: "Attracts, harmonizes, and seals unconditional love between soulmates.",
    applicationScenario: "Singles looking for marriage, couples healing after turbulence.",
    chantingFormula: "Chant 54 times in the evening holding your hands in prayer position.",
    switchPairOrPhrase: "TOGETHER-DIVINE-LOVE-BE",
    energyCircleColor: "Magenta or Rose Pink circle with a small heart in the center",
    waterBroadcastTechnique: "Charge pure rosewater and mist gently over your bedroom.",
    bodyWritingGuidance: "Write in red ink on the inner left wrist.",
    authorOrigin: "Kat Miller"
  },
  {
    id: "msw-phrase-defuse-all",
    word: "CLEAR-CANCEL-DELETE-NOW",
    type: "Defusing",
    category: "protection",
    categoryLabel: "Emotional Defusing",
    triggerMeaning: "Complete psychic purge of toxic subconscious trash, self-doubt, panic attacks, and fear.",
    applicationScenario: "During severe emotional triggers, panic attacks, grief waves, or toxic arguments.",
    chantingFormula: "Chant 21 times while shaking out your hands and feet as if flinging off mud.",
    switchPairOrPhrase: "CLEAR-CANCEL-DELETE-NOW",
    energyCircleColor: "Deep Violet or White circle",
    waterBroadcastTechnique: "Take a sea salt bath after chanting this phrase.",
    bodyWritingGuidance: "Used vocally for immediate psychic purging.",
    defusingAction: "Neutralizes toxic emotional charges in under 60 seconds.",
    authorOrigin: "Modern Energy Healing"
  }
];
