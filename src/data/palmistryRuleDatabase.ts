import { 
  HandTypeClass, 
  MountLevel, 
  SpecialMarking, 
  PalmAgeMilestone 
} from "../types/palmistry";

export interface HandTypeRule {
  type: HandTypeClass;
  title: string;
  structuralMarkers: string;
  temperamentReading: string;
  strengths: string[];
  growthAreas: string[];
  ratios: {
    minPalmRatio: number;
    maxPalmRatio: number;
    minFingerRatio: number;
    maxFingerRatio: number;
  };
  elementalTattva: { fire: number; water: number; air: number; earth: number };
}

export const PALMISTRY_DATABASE_V2 = {
  meta: {
    module: "palmistry",
    usage: "Rule engine looks up detected feature values here to retrieve full-paragraph interpretation text blocks. The compositor assembles matched blocks per the ordering rules in the Palmistry Build Guide (section 5). Each entry is written as a complete, standalone paragraph so it can be inserted directly into a report without further editing.",
    version: "2.0"
  },
  handTypes: {
    Elementary: "This is an Elementary hand -- short, thick fingers set on a coarse, solid palm. It points to a deeply practical, instinctive nature that trusts what can be seen, touched, and directly experienced far more than abstract theory. There is a strong physical drive here, a comfort with hands-on work, and a straightforwardness that can come across as blunt but is rarely calculated. Decisions tend to be made from gut instinct rather than prolonged deliberation, and satisfaction is found in tangible results rather than in ideas for their own sake. This hand type often belongs to people who are dependable in a crisis precisely because they don't overthink -- they act.",
    Square: "This is a Square hand -- an evenly proportioned palm with square-tipped fingers. It reflects an orderly, realistic temperament that finds genuine comfort in structure, routine, and clearly defined expectations. People with this hand type tend to be reliable to a fault, methodical in how they approach both work and relationships, and generally more conventional in their choices -- not from a lack of imagination, but because proven paths feel safer and more efficient than untested ones. This is often the hand of the person others turn to for a level head and a fair, consistent judgment call.",
    Spatulate: "This is a Spatulate hand -- fingertips that visibly flare outward, wider at the tip than at the base. It signals restless, forward-driving energy: an inventive mind that is happiest in motion, drawn to novelty, and often uncomfortable sitting still for long. There's a pioneering quality to this hand type -- a willingness to try the unconventional route, to build something that didn't exist before, and to trust action over analysis. The risk is scattering that energy across too many directions at once; the strength is an authentic originality that square or elementary hands rarely display.",
    Philosophic: "This is a Philosophic hand -- long fingers with visibly pronounced, knotty joints. It belongs to a mind that needs to understand the 'why' beneath things, that is more energized by a good question than a quick answer, and that often finds small talk less satisfying than a real conversation. There's an introspective, sometimes solitary quality here -- not from unfriendliness, but because depth of thought takes time and space that a busier, more social pace doesn't easily allow. This hand type often belongs to researchers, writers, and anyone who quietly turns a problem over for far longer than most people would.",
    Conic: "This is a Conic (Artistic) hand -- tapering fingers on a rounded, fleshy palm. It reflects a creative, emotionally responsive nature that feels first and analyzes second. There's a strong aesthetic sensibility here, a pull toward beauty, harmony, and self-expression, and a tendency to act on impulse when something genuinely moves the person -- for better and occasionally for worse. Mood and environment matter more to this hand type than to most; the right surroundings can bring out real brilliance, while the wrong ones can dampen it noticeably. Warmth and spontaneity are the hallmark traits.",
    Psychic: "This is a Psychic hand -- long, slender, and delicate, often the most refined-looking of all seven types. It reflects an idealistic, highly intuitive temperament, unusually sensitive to atmosphere, emotional undercurrents, and unspoken tension in a room. This hand type is often drawn to spiritual, artistic, or healing pursuits, and can struggle when forced into rigid, purely transactional environments that leave no room for feeling or meaning. The gift is a genuine attunement to the intangible; the challenge is staying grounded enough to act on it practically.",
    Mixed: "This is a Mixed hand, blending traits of {secondaryTypes}. Rather than settling into one fixed temperament, this hand type reflects genuine adaptability -- the ability to shift approach depending on what a situation actually calls for, drawing on whichever blended trait is most useful in the moment. This flexibility is a real strength in a world that rarely presents problems in one neat category, though it can occasionally read as inconsistency to people who expect a person to be 'one thing.' In practice, it usually means resourcefulness rather than indecision."
  },
  fingers: {
    jupiter: {
      long: "A long Jupiter (index) finger, extending close to or past the middle of the top phalange of the Saturn finger, points to a natural pull toward leadership, visibility, and a strong, healthy sense of self. This person is generally comfortable stepping forward, taking charge of a room or a project, and being seen -- ambition here isn't a flaw, it's simply part of the operating system. When balanced by a well-developed Saturn mount, this ambition tends to be disciplined rather than reckless.",
      average: "A proportionate Jupiter (index) finger reflects a balanced, healthy relationship with ambition and self-regard -- neither craving the spotlight nor avoiding it. This person can lead when the situation calls for it and step back comfortably when it doesn't, without either choice feeling forced.",
      short: "A short Jupiter (index) finger can point to lower natural confidence in taking charge, or simply a genuine preference for supporting roles over visible leadership. This isn't a deficiency -- many of the most effective people in any organization operate this way by choice -- but it's worth naming honestly if the rest of the hand (mounts, thumb) doesn't compensate for it."
    },
    saturn: {
      long: "A long Saturn (middle) finger reflects a serious, responsibility-driven nature -- someone who takes obligations seriously, sometimes to the point of carrying more weight than is strictly theirs to carry. There's often a solitary streak here too; this person is comfortable working alone and doesn't need constant company or validation to stay motivated.",
      average: "A proportionate Saturn (middle) finger suggests a grounded, healthy sense of responsibility -- duties are honored without becoming a burden, and solitude is enjoyed without becoming isolation.",
      short: "A short Saturn (middle) finger can point to a lighter, more spontaneous approach to obligation, sometimes at the cost of follow-through on longer commitments. This person often thrives more in flexible environments than in rigidly structured ones."
    },
    apollo: {
      long: "A long Apollo (ring) finger points to a strong creative or aesthetic drive and often a genuine appetite for calculated risk -- this person is drawn to putting original work into the world and is willing to gamble on it rather than play it safe. When this finger is notably longer than the Jupiter finger, it often signals someone whose identity is more tied to their creative output than to conventional status.",
      average: "A proportionate Apollo (ring) finger suggests a healthy, unforced relationship with creativity and self-expression -- present and enjoyed, without being the dominant driver of major life decisions.",
      short: "A short Apollo (ring) finger can point to a more reserved relationship with public recognition or creative display -- talent may well be present, but this person is generally more comfortable keeping it private than performing it."
    },
    mercury: {
      long: "A long Mercury (little) finger reflects strong natural communication skill and a genuine instinct for business, negotiation, and reading people -- this person tends to say the right thing at the right moment and negotiates instinctively rather than nervously.",
      average: "A proportionate Mercury (little) finger suggests functional, balanced communication skills -- clear enough to get the point across without needing to dominate a conversation.",
      short: "A short Mercury (little) finger can point to some genuine difficulty with self-expression, particularly under pressure or in unfamiliar social settings -- this person may know exactly what they mean but struggle to get it out cleanly in the moment."
    },
    set: {
      even: "An even finger set, where all four fingers rise from roughly the same base line, reflects a conventional, steady approach to life -- decisions tend to follow expected, well-trodden paths rather than improvised ones.",
      staggered: "A staggered or uneven finger set, where the fingers rise from clearly different base heights, points to a genuine non-conformist streak -- this person naturally questions the expected path rather than following it automatically, and often ends up somewhere unconventional as a result."
    },
    spacing: {
      wide: "Wide spacing between the fingers when the hand is relaxed reflects a real need for independence and personal space -- this person doesn't do well being micromanaged or crowded, in work or in relationships.",
      close: "Close-set relaxed fingers point to caution, carefulness, and a more conventional approach to risk -- this person tends to keep resources, opinions, and plans closer to the chest rather than broadcasting them early."
    },
    jointProminence: {
      smooth: "Smooth finger joints, with little visible knuckle definition, suggest fast, intuitive decision-making -- this person trusts their gut and moves quickly, sometimes without pausing long enough to weigh every angle.",
      knotty: "Prominent, knotty finger joints point to a deliberate, highly analytical decision-making style -- nothing gets decided until it's been turned over, questioned, and checked from multiple angles. This can slow things down, but it also means fewer regrets."
    },
    flexibility: {
      stiff: "Stiff fingers that don't bend back easily reflect a disciplined, firmly held thinking style -- once this person forms an opinion or a standard, it tends to stay fixed, for better and for worse.",
      flexible: "Highly flexible fingers that bend back with little resistance point to genuine adaptability of thought -- this person can usually see multiple sides of an issue, though it can occasionally tip into over-accommodating others at their own expense."
    }
  },
  thumb: {
    length: {
      long: "A long thumb, reaching past the base of the lowest joint of the index finger when held naturally alongside it, reflects strong willpower and real self-determination. This person tends to follow through on decisions once made and isn't easily talked out of a course of action they believe in.",
      short: "A shorter thumb can point to someone more easily swayed by the opinions or emotions of others, or simply someone who leads with feeling rather than sheer force of will. This isn't weakness -- it often makes for a genuinely more collaborative, empathetic decision-making style."
    },
    angle: {
      low: "A low-set thumb held at a wide angle from the palm reflects generosity, openness, and real independence of spirit -- this person tends to give freely and doesn't feel threatened by others' autonomy.",
      high: "A high-set thumb held at a narrow angle close to the hand points to a more cautious, self-protective, reserved nature -- trust and resources are extended carefully, not automatically."
    },
    flexibility: {
      flexible: "A thumb that bends back easily at the top joint reflects real flexibility and open-mindedness -- this person adapts their opinions readily when presented with new information.",
      stiff: "A stiff thumb that resists bending back points to firmness of opinion and a genuinely stubborn streak once a decision has been made -- persuading this person after the fact is rarely easy."
    },
    phalangeRatio: {
      topLonger: "A longer top phalange (the segment from the tip to the first joint) shows willpower leading over pure reasoning -- this is a decisive, action-first nature that moves before every angle has been fully analyzed.",
      secondLonger: "A longer second phalange (the segment from the first joint to the base) shows reasoning leading over raw will -- decisions are more measured, more logic-first, and generally slower to arrive at but well thought through.",
      balanced: "Roughly balanced thumb phalanges reflect an even partnership between willpower and reasoning -- neither force of will nor pure logic dominates decision-making; the two work together."
    }
  },
  texture: {
    fine: "Fine, smooth palm skin reflects a refined, sensitive temperament -- this person tends to notice small details in their environment and in other people's moods that coarser-skinned types might miss entirely.",
    coarse: "Coarse palm skin points to a hardy, no-nonsense, practical nature -- this person is generally comfortable with physical, hands-on work and isn't easily rattled by rough conditions or rough conversations."
  },
  consistency: {
    firm: "A firm palm that resists gentle pressure reflects active, ready energy and a genuine get-things-done nature -- this person tends to translate intention into action quickly.",
    soft: "A soft palm that gives easily under pressure points to a relaxed, easygoing temperament -- comfortable, low-conflict, though it can occasionally tip toward indolence if not balanced by a strong Life line or Mars mounts.",
    flabby: "A flabby, loosely toned palm can point to lower current motivation or vitality -- this is best read alongside the Life line rather than in isolation, since it often reflects a temporary phase rather than a fixed trait."
  },
  color: {
    pink: "Warm, pink palm coloring reflects healthy vitality and a naturally sociable, outgoing disposition -- this person tends to bring energy into a room rather than drain it.",
    pale: "Pale palm coloring points to a more introverted, lower-key energy -- this person recharges through solitude and may find highly social, high-stimulation environments genuinely draining.",
    reddish: "Reddish palm coloring reflects an intense, high-energy, sometimes quick-tempered temperament -- passion and drive run close to the surface here."
  },
  nails: {
    broad: "Broad, short nails point to a quick, critical eye for detail and a temperament that can run short-tempered when standards aren't met -- this person notices flaws fast and says so.",
    long: "Long nails reflect idealism and a genuine artistic sensibility -- beauty and refinement matter to this person, sometimes more than pure practicality.",
    narrow: "Narrow nails point to caution and, at times, a somewhat narrower or more fixed outlook -- new ideas are given a careful, sometimes skeptical hearing before being accepted."
  },
  lines: {
    life: {
      length: {
        long: "A long Life line, tracing a substantial curve from near the base of the Jupiter finger down around the Venus mount toward the wrist, reflects strong, steady vitality that carries reliably across life's different phases. This person tends to have the physical and emotional stamina to weather demanding periods without being fully depleted.",
        short: "A short Life line points to vitality that arrives in concentrated, intense bursts rather than a long steady flow -- this should never be read literally as a shorter lifespan, a common but incorrect popular myth; it speaks to energy pattern, not longevity."
      },
      depth: {
        deep: "A deep, clearly etched Life line reflects strong underlying vitality and genuine resilience -- this person tends to recover from setbacks faster than most.",
        faint: "A faint, lightly traced Life line points to a more sensitive constitution and a real need for deliberate energy management -- pushing through exhaustion tends to cost this person more than it would someone with a deeper line."
      },
      curve: {
        wide: "A wide, sweeping Life line that arcs generously into the palm reflects enthusiasm, robust physical energy, and a genuinely adventurous streak -- this person is drawn to new experiences and rarely content sitting still for long.",
        straight: "A Life line that runs close and straight along the edge of the thumb points to a cautious nature that prefers familiar, secure, well-understood environments over unpredictable ones."
      },
      breaks: "A break in the Life line marks a significant life change or disruption around the corresponding age -- best read as a turning point that reshaped the person's direction, not as a warning of misfortune. Life often continues in a new form after the break rather than ending.",
      islands: "An island (a small oval gap) on the Life line marks a period of lowered energy, illness-adjacent stress, or an obstacle around the corresponding age -- typically temporary, resolving once the line continues clearly past it.",
      double: "A second, fainter line running parallel just inside the main Life line -- often called a 'guardian line' or 'sister line' -- reflects an extra layer of resilience and support carried through life's harder periods, whether from a strong support network, inner resourcefulness, or both.",
      startMount: {
        jupiter: "A Life line originating high on the palm, near the Jupiter mount rather than tucked close to the thumb, points to ambition-driven vitality present from early on -- energy and drive were part of this person's makeup from a young age.",
        headLine: "A Life line beginning tightly joined to the Head line points to a cautious, self-reliant early approach to life -- independence had to be earned through careful, considered steps rather than being freely given."
      }
    },
    head: {
      length: {
        long: "A long, straight Head line stretching well across the palm reflects clear, focused, logical thinking -- this person tends to reason things through methodically and communicate their conclusions clearly.",
        short: "A shorter Head line points to a preference for concrete, practical, results-oriented thinking over abstraction -- this person would rather solve the problem in front of them than theorize about problems in general."
      },
      slope: {
        sloping: "A Head line that slopes downward toward the base of the palm, toward the Luna mount, reflects an imaginative, creative thinking style -- ideas here tend to arrive through association and intuition as much as through linear logic.",
        straight: "A straight, mostly horizontal Head line reflects realistic, practical, business-minded thinking -- decisions are grounded in what's workable rather than what's merely appealing."
      },
      forked: "A forked ending on the Head line -- often called the 'writer's fork' -- reflects a genuinely versatile mind capable of balancing hard logic with creative or imaginative thinking, rather than being locked into only one mode.",
      waviness: "A wavy or uneven Head line points to variable focus and, at times, real difficulty sustaining sharp concentration on one thing for long -- this mind tends to move between several interests rather than settling deeply into one.",
      chains: "A chained section of the Head line marks a period of mental strain, worry, or scattered focus -- often tied to a specific stressful stretch rather than a permanent trait, especially if the chaining clears further along the line.",
      joinedToLife: {
        true: "A Head line joined tightly to the Life line at the start reflects a cautious, careful decision-maker -- this person genuinely thinks before acting, weighing consequences rather than leaping first.",
        false: "A visible gap between the Head and Life lines at the start reflects an independent thinker who trusts their own judgment quickly and confidently -- decisions get made without needing extensive outside validation first."
      },
      breaks: "A break in the Head line marks a sudden, notable shift in thinking, belief, or worldview around the corresponding age -- often coinciding with an experience that genuinely changed how this person sees things."
    },
    heart: {
      length: {
        long: "A long Heart line that curves up toward the base of the fingers reflects real warmth and openly, freely expressed affection -- this person doesn't hide how they feel about the people who matter to them.",
        short: "A shorter Heart line points to a more contained, private emotional style -- feelings run just as deep, but they're shared selectively rather than broadcast."
      },
      curve: {
        high: "A high Heart line curve, sitting close to the base of the fingers, reflects idealism in love and genuinely high expectations of partners -- this person wants a relationship to live up to a vivid internal picture of what love should feel like.",
        low: "A low, flatter Heart line curve points to a practical, grounded approach to relationships -- love is expressed through consistent action and reliability more than through grand romantic gestures."
      },
      straightness: "A Heart line that runs nearly straight across the palm, with little curve, reflects emotional reserve and controlled expression of feeling -- this person feels deeply but doesn't display it openly, and can come across as harder to read than they actually are.",
      startPoint: {
        underJupiter: "A Heart line starting directly beneath the Jupiter (index) finger points to genuine contentment and a satisfied disposition in love -- this person tends to feel secure and appreciative in relationships rather than restless within them.",
        underSaturn: "A Heart line starting beneath the Saturn (middle) finger points to a more cautious, self-focused approach to relationships -- trust is built slowly, and self-protection often takes priority over vulnerability early on."
      },
      chains: "A chained or multi-stranded section of the Heart line reflects heightened emotional sensitivity and points to a possibly more turbulent relationship history -- old hurts here tend to leave a visible mark on how this person approaches new closeness.",
      breaks: "A break in the Heart line marks a significant emotional event or relationship turning point -- a major heartbreak, a major reconciliation, or a defining shift in how this person relates to love afterward.",
      branches: {
        upward: "Upward branches rising from the Heart line reflect a positive emotional outlook and real resilience -- setbacks in love tend to be absorbed and moved through rather than left to fester.",
        downward: "Downward branches trailing from the Heart line can point to a tendency toward emotional disappointment or self-doubt in relationships -- past letdowns may quietly color how new ones are approached."
      }
    },
    fate: {
      present: {
        true: "A present, clearly traced Fate line running vertically up the palm reflects a strong sense of direction and purpose that this person can usually name when asked -- career and life path feel less like accidents and more like a chosen route.",
        false: "An absent Fate line is genuinely common and simply reflects a self-directed life without one fixed external structure -- this is not a shortfall; it often belongs to people whose path is deliberately built rather than inherited or predetermined."
      },
      depth: {
        deep: "A deep, straight Fate line points to a strong, steady sense of direction -- once this person commits to a path, they tend to stay the course even through difficulty.",
        faint: "A faint Fate line points to a looser, more improvised relationship with career or life direction -- plans shift readily in response to circumstance rather than being locked in early."
      },
      breaks: "A break in the Fate line marks a significant career or life-path change around the corresponding age -- a job change, a relocation, or a deliberate reinvention that altered the trajectory."
    },
    sun: {
      present: {
        true: "A present Sun (Apollo) line running toward the ring finger reflects a strong drive toward recognition, achievement, and creative fulfillment -- this person is generally motivated by seeing their work acknowledged.",
        false: "An absent Sun line simply means success and fulfillment are measured privately rather than through public recognition -- satisfaction comes from the work itself, not from applause for it."
      },
      strength: "A strong, deep Sun line points to a real likelihood of public recognition, or at minimum, a strong internal sense of fulfillment in whatever work this person pours themselves into."
    },
    mercury: {
      present: {
        true: "A present Mercury (Health) line reflects active communication drive and business instinct; when the line runs faint, it is best read as a mild stress or energy indicator rather than any kind of health claim.",
        false: "An absent Mercury line is common and should not be read as a negative marker -- many well-balanced hands simply don't display this line at all."
      }
    },
    marriage: "A clear, well-formed marriage/relationship line marks a significant partnership in this person's life; its depth reflects the intensity of the bond rather than serving as a literal count of marriages -- this line is one of the least reliably literal in the whole system and should be framed accordingly.",
    children: "Fine vertical lines crossing the marriage line are traditionally read as children lines in classical texts -- this should be presented gently and explicitly as a traditional, symbolic marker rather than a literal or reliable predictor of number of children.",
    travel: "Lines running along the outer (Luna) edge of the palm mark significant journeys or relocations that meaningfully shaped this person's outlook or direction -- longer, deeper lines generally correspond to more consequential trips.",
    bracelets: "A clear, unbroken first bracelet at the wrist is traditionally read as a general marker of steady vitality; breaks or chains in this line are sometimes read as periods worth extra self-care, though this marker is treated as a soft indicator rather than a firm one."
  },
  mounts: {
    jupiter: {
      flat: "A flat Jupiter mount points to lower natural self-confidence and some tendency to avoid stepping into responsibility or the spotlight, even when capable of handling it.",
      normal: "A normally developed Jupiter mount reflects a healthy, balanced relationship with ambition and leadership -- present when needed, without dominating the personality.",
      prominent: "A prominent, well-cushioned Jupiter mount reflects natural confidence, genuine ambition, and real leadership instinct -- this person tends to be comfortable being looked to for direction.",
      overdeveloped: "An overdeveloped, unusually raised Jupiter mount can point to a strong need for control or dominance in how this person approaches relationships and work -- ambition here can tip into overreach if unchecked."
    },
    saturn: {
      flat: "A flat Saturn mount points to a lighter, less duty-bound approach to life that may sometimes lack sustained focus or follow-through on longer commitments.",
      normal: "A normally developed Saturn mount reflects grounded, healthy discipline -- responsibilities are honored without becoming a source of constant weight.",
      prominent: "A prominent Saturn mount reflects real seriousness, a strong work ethic, and a tendency toward solitude or introspection -- this person takes their obligations seriously, sometimes at the cost of lightness.",
      overdeveloped: "An overdeveloped Saturn mount can point to excessive self-seriousness, isolation, or a tendency toward melancholy -- duty here can crowd out joy if left unbalanced."
    },
    apollo: {
      flat: "A flat Apollo mount points to undervaluing one's own creative ability -- talent may genuinely be present but goes unrecognized or unexpressed by the person themselves.",
      normal: "A normally developed Apollo mount reflects a healthy, balanced relationship with creativity and self-expression -- present and enjoyed without needing constant validation.",
      prominent: "A prominent Apollo mount reflects real artistic sensibility, natural charisma, and a genuine pull toward recognition for creative or expressive work.",
      overdeveloped: "An overdeveloped Apollo mount can point to a strong need for admiration or a flair for the dramatic that sometimes outpaces the substance behind it."
    },
    mercury: {
      flat: "A flat Mercury mount points to some genuine difficulty with self-expression, especially in business, negotiation, or high-pressure conversational settings.",
      normal: "A normally developed Mercury mount reflects functional, healthy communication skills -- clear enough to navigate most personal and professional exchanges comfortably.",
      prominent: "A prominent Mercury mount reflects real persuasiveness, quick wit, and a strong natural instinct for negotiation and reading a room.",
      overdeveloped: "An overdeveloped Mercury mount can point to over-talkativeness or, at its more extreme, a tendency to manipulate through words rather than communicate plainly."
    },
    venus: {
      flat: "A flat Venus mount points to emotional reserve and comparatively lower physical vitality -- warmth is present but takes real effort to access and express.",
      normal: "A normally developed Venus mount reflects healthy warmth, affection, and steady vitality -- love and energy flow without excess or deficiency.",
      prominent: "A prominent, full Venus mount reflects strong affection, robust physical vitality, and a genuine family- and relationship-oriented nature.",
      overdeveloped: "An overdeveloped Venus mount can point toward excess indulgence or an unusually strong pull toward sensual pleasure that may need conscious moderation."
    },
    marsUpper: {
      flat: "A flat Upper Mars area points to some avoidance of confrontation -- this person would generally rather withdraw from conflict than engage it directly.",
      normal: "A normally developed Upper Mars area reflects healthy resilience under pressure -- conflict is handled without either avoiding it or escalating it unnecessarily.",
      prominent: "A prominent Upper Mars area reflects real courage and steadiness in the face of conflict or adversity -- this person doesn't rattle easily.",
      overdeveloped: "An overdeveloped Upper Mars area can point to a combative or overly defensive streak -- conflict is met readily, sometimes more readily than the situation actually calls for."
    },
    marsLower: {
      flat: "A flat Lower Mars area points to lower natural assertiveness in taking initiative -- this person tends to wait for an opening rather than create one.",
      normal: "A normally developed Lower Mars area reflects healthy assertiveness -- initiative is taken when it matters, without unnecessary aggression.",
      prominent: "A prominent Lower Mars area reflects real boldness and a strong will to act -- this person moves first rather than waiting to be prompted.",
      overdeveloped: "An overdeveloped Lower Mars area can point to impulsiveness or a short temper -- action comes quickly, sometimes before it's fully considered."
    },
    luna: {
      flat: "A flat Luna mount points to a more literal, practical mindset with less natural pull toward imagination or abstract intuition.",
      normal: "A normally developed Luna mount reflects a healthy, balanced imagination -- creative and intuitive thinking are available without overwhelming practical judgment.",
      prominent: "A prominent Luna mount reflects strong imagination, intuition, and empathy -- this person tends to sense what others are feeling before it's said out loud.",
      overdeveloped: "An overdeveloped Luna mount can point to a tendency toward overthinking, anxious rumination, or restlessness of mind -- imagination here can work against peace of mind if unchecked."
    }
  },
  markings: {
    break: "A break marks a genuine disruption or turning point tied to this line's core theme, occurring around the corresponding age or life stage. It is best read neutrally, as a marker of change rather than of misfortune -- the line's continuation past the break, and its character afterward, matters more than the break itself.",
    island: "An island (a small oval-shaped gap within the line) marks a period of weakened energy, a specific obstacle, or a stretch of strain tied to this line's or mount's theme. These are typically temporary -- the line clearing and strengthening again past the island generally indicates the difficulty resolves.",
    chain: "A chain pattern (a series of small linked ovals along the line) marks a prolonged period of minor, recurring struggle or inconsistency tied to this line's theme -- less a single crisis than a stretch of ongoing friction.",
    cross: "A cross marks a notable obstacle or event tied to this line's or mount's theme. This should be read with care rather than alarm -- classical texts vary on whether a cross is purely challenging or can also mark a significant turning point that ultimately proves constructive.",
    star: "A star marks a sudden, high-intensity event tied to this line's or mount's theme. Context from the surrounding line matters here -- a star can indicate a genuine breakthrough or achievement, or a sudden disruption, depending on whether the line strengthens or weakens immediately afterward.",
    triangle: "A triangle is a favorable marking, generally indicating a natural talent or aptitude tied to this line's or mount's theme -- something this person is unusually well-suited for, whether or not they've fully developed it yet.",
    square: "A square is a protective marking, traditionally read as indicating recovery, containment, or protection around a nearby break or difficult stretch -- support arrived, or resilience carried the person through.",
    grille: "A grille (a crosshatched pattern of fine lines) marks scattered energy or blocked potential tied to this mount's theme -- the underlying capacity is present, but its expression is diffused or held back.",
    trident: "A trident or clear fork amplifies this line's positive theme, and is often read as marking a notable achievement or a moment where multiple strengths converge productively.",
    circle: "A circle is a rare marking, typically indicating a distinguishing talent or notable event, especially significant when found on the Sun line, where it's traditionally linked to a moment of particular recognition or achievement."
  },
  handComparisonTemplates: {
    inheritedVsDeveloped: "On the {nonDominantHand} hand this shows as {nonDominantReading}, while on the {dominantHand} hand it has developed into {dominantReading}. Read together, this reflects how an inherited tendency -- present from the start -- has actually been shaped and expressed through this person's lived choices and experience, rather than staying static.",
    consistent: "This trait appears consistently across both hands, which suggests it's a stable, deeply rooted part of the character rather than something that shifted much with experience -- what was inherited and what was lived out largely agree."
  },
  contradictionTemplate: "Outwardly this presents as {trait1}, though {trait2} runs underneath it. Rather than treating these as conflicting, it's more accurate to hold both readings together -- most real personalities carry exactly this kind of layered, sometimes contradictory texture."
};

export const CLASSICAL_HAND_TYPES: Record<HandTypeClass, HandTypeRule> = {
  Elementary: {
    type: "Elementary",
    title: "The Earthy Pragmatist (Elementary Hand)",
    structuralMarkers: "Short, thick fingers; coarse, wide, heavy palm; few but deeply incised lines.",
    temperamentReading: PALMISTRY_DATABASE_V2.handTypes.Elementary,
    strengths: ["Unyielding stamina", "Direct honesty", "Unfazed by theoretical drama", "Grounded common sense"],
    growthAreas: ["Can be stubborn", "Resistant to swift changes", "May overlook emotional nuance"],
    ratios: { minPalmRatio: 0.95, maxPalmRatio: 1.15, minFingerRatio: 0.65, maxFingerRatio: 0.76 },
    elementalTattva: { earth: 60, fire: 20, air: 10, water: 10 }
  },
  Square: {
    type: "Square",
    title: "The Architect of Order (Square / Useful Hand)",
    structuralMarkers: "Square palm; square fingertips; even, disciplined finger alignment and sturdy wrist.",
    temperamentReading: PALMISTRY_DATABASE_V2.handTypes.Square,
    strengths: ["Supreme dependability", "Methodical clarity", "Loyal stewardship", "Exceptional execution"],
    growthAreas: ["Risk aversion", "Rigid adherence to routine", "Overly critical of disorder"],
    ratios: { minPalmRatio: 0.96, maxPalmRatio: 1.05, minFingerRatio: 0.78, maxFingerRatio: 0.88 },
    elementalTattva: { earth: 45, air: 35, fire: 10, water: 10 }
  },
  Spatulate: {
    type: "Spatulate",
    title: "The Dynamic Innovator (Spatulate / Active Hand)",
    structuralMarkers: "Fingertips flare outward (wider at tip than base); broad, muscular palm; high kinetic energy.",
    temperamentReading: PALMISTRY_DATABASE_V2.handTypes.Spatulate,
    strengths: ["Boundless creative drive", "Original problem solving", "Courage to disrupt", "Tireless momentum"],
    growthAreas: ["Restlessness", "Impatience with slow learners", "Risk of burnout"],
    ratios: { minPalmRatio: 0.85, maxPalmRatio: 1.0, minFingerRatio: 0.80, maxFingerRatio: 0.90 },
    elementalTattva: { fire: 50, air: 25, earth: 15, water: 10 }
  },
  Philosophic: {
    type: "Philosophic",
    title: "The Introspective Sage (Philosophic / Knotty Hand)",
    structuralMarkers: "Long, angular fingers; visibly knotty/prominent joints; bony structure with modest palm flesh.",
    temperamentReading: PALMISTRY_DATABASE_V2.handTypes.Philosophic,
    strengths: ["Deep analytical wisdom", "Independent thinker", "Philosophical detachment", "Immunity to flattery"],
    growthAreas: ["Social aloofness", "Risk of mental fatigue through over-analysis"],
    ratios: { minPalmRatio: 0.82, maxPalmRatio: 0.95, minFingerRatio: 0.88, maxFingerRatio: 1.02 },
    elementalTattva: { air: 50, earth: 25, water: 15, fire: 10 }
  },
  Conic: {
    type: "Conic",
    title: "The Sensitive Artist (Conic / Artistic Hand)",
    structuralMarkers: "Tapering, smooth fingers; graceful curves; rounded, soft palm with rich mount development.",
    temperamentReading: PALMISTRY_DATABASE_V2.handTypes.Conic,
    strengths: ["Emotional expressiveness", "Intuitive aesthetic perception", "Warm social magnetism", "Spontaneous generosity"],
    growthAreas: ["Impulsive choices", "Susceptible to sudden mood shifts", "Dislike of rigid routine"],
    ratios: { minPalmRatio: 0.88, maxPalmRatio: 0.98, minFingerRatio: 0.82, maxFingerRatio: 0.94 },
    elementalTattva: { water: 50, fire: 25, air: 15, earth: 10 }
  },
  Psychic: {
    type: "Psychic",
    title: "The Mystical Idealist (Psychic / Spiritual Hand)",
    structuralMarkers: "Slender, elongated fingers; delicate, narrow palm; fine skin and numerous delicate lines.",
    temperamentReading: PALMISTRY_DATABASE_V2.handTypes.Psychic,
    strengths: ["Profound spiritual sensitivity", "Pure idealism", "Psychic intuition", "Transcendent vision"],
    growthAreas: ["Impractical in worldly finances", "High nervous vulnerability", "Needs grounding"],
    ratios: { minPalmRatio: 0.75, maxPalmRatio: 0.90, minFingerRatio: 0.92, maxFingerRatio: 1.10 },
    elementalTattva: { water: 60, air: 25, fire: 10, earth: 5 }
  },
  Mixed: {
    type: "Mixed",
    title: "The Versatile Synthesizer (Mixed Hand)",
    structuralMarkers: "Fingers of differing shapes (e.g. one square, one spatulate, one conic) on an adaptable palm.",
    temperamentReading: PALMISTRY_DATABASE_V2.handTypes.Mixed.replace("{secondaryTypes}", "Square and Conic"),
    strengths: ["Chameleon adaptability", "Multidisciplinary skill set", "Quick problem reconfiguration"],
    growthAreas: ["Diffused career focus", "Occasional internal conflict between logic and emotion"],
    ratios: { minPalmRatio: 0.85, maxPalmRatio: 1.05, minFingerRatio: 0.75, maxFingerRatio: 0.95 },
    elementalTattva: { air: 30, fire: 25, water: 25, earth: 20 }
  }
};

export const MOUNTS_INTERPRETATION_DATABASE: Record<string, Record<MountLevel, string>> = PALMISTRY_DATABASE_V2.mounts;

export const PRINCIPAL_LINES_DATABASE = {
  life: {
    long_deep_unbroken: PALMISTRY_DATABASE_V2.lines.life.length.long + " " + PALMISTRY_DATABASE_V2.lines.life.depth.deep,
    wide_sweeping: PALMISTRY_DATABASE_V2.lines.life.curve.wide,
    straight_close_to_thumb: PALMISTRY_DATABASE_V2.lines.life.curve.straight,
    chained_islands: PALMISTRY_DATABASE_V2.lines.life.islands,
    double_life_line: PALMISTRY_DATABASE_V2.lines.life.double,
    origin_jupiter: PALMISTRY_DATABASE_V2.lines.life.startMount.jupiter
  },
  head: {
    long_straight_deep: PALMISTRY_DATABASE_V2.lines.head.length.long + " " + PALMISTRY_DATABASE_V2.lines.head.slope.straight,
    sloping_luna: PALMISTRY_DATABASE_V2.lines.head.slope.sloping,
    writers_fork: PALMISTRY_DATABASE_V2.lines.head.forked,
    joined_to_life: PALMISTRY_DATABASE_V2.lines.head.joinedToLife.true,
    separated_gap: PALMISTRY_DATABASE_V2.lines.head.joinedToLife.false
  },
  heart: {
    long_curving_between_fingers: PALMISTRY_DATABASE_V2.lines.heart.length.long + " " + PALMISTRY_DATABASE_V2.lines.heart.curve.high,
    straight_across: PALMISTRY_DATABASE_V2.lines.heart.straightness,
    high_curve_jupiter: PALMISTRY_DATABASE_V2.lines.heart.startPoint.underJupiter,
    branches_upward: PALMISTRY_DATABASE_V2.lines.heart.branches.upward,
    chained_markings: PALMISTRY_DATABASE_V2.lines.heart.chains
  }
};

export const SECONDARY_LINES_DATABASE = {
  fate: {
    present_deep: PALMISTRY_DATABASE_V2.lines.fate.present.true + " " + PALMISTRY_DATABASE_V2.lines.fate.depth.deep,
    broken_shifting: PALMISTRY_DATABASE_V2.lines.fate.breaks,
    absent: PALMISTRY_DATABASE_V2.lines.fate.present.false
  },
  sun: {
    present_bright: PALMISTRY_DATABASE_V2.lines.sun.present.true + " " + PALMISTRY_DATABASE_V2.lines.sun.strength,
    absent: PALMISTRY_DATABASE_V2.lines.sun.present.false
  },
  mercury: {
    present_clear: PALMISTRY_DATABASE_V2.lines.mercury.present.true,
    faint: PALMISTRY_DATABASE_V2.lines.mercury.present.false
  },
  marriage: {
    singular_deep: PALMISTRY_DATABASE_V2.lines.marriage,
    multiple_fine: PALMISTRY_DATABASE_V2.lines.marriage
  },
  bracelets: {
    strong_clear: PALMISTRY_DATABASE_V2.lines.bracelets
  }
};

export const SPECIAL_MARKINGS_CATALOG: Record<string, { title: string; favorable: boolean; interpretation: string }> = {
  trident: {
    title: "Trident (Trishul)",
    favorable: true,
    interpretation: PALMISTRY_DATABASE_V2.markings.trident
  },
  star: {
    title: "Star (Nakshatra)",
    favorable: true,
    interpretation: PALMISTRY_DATABASE_V2.markings.star
  },
  triangle: {
    title: "Sacred Triangle (Trikona)",
    favorable: true,
    interpretation: PALMISTRY_DATABASE_V2.markings.triangle
  },
  square: {
    title: "Square of Protection (Kavacha)",
    favorable: true,
    interpretation: PALMISTRY_DATABASE_V2.markings.square
  },
  fish: {
    title: "Fish Symbol (Matsya)",
    favorable: true,
    interpretation: "A classical Vedic indicator of unexpected wealth, philanthropic generosity, deep spiritual inclinations, and enduring prestige in later life."
  },
  cross: {
    title: "Cross (Crest)",
    favorable: false,
    interpretation: PALMISTRY_DATABASE_V2.markings.cross
  },
  island: {
    title: "Island (Dvipa)",
    favorable: false,
    interpretation: PALMISTRY_DATABASE_V2.markings.island
  },
  grille: {
    title: "Grille (Jala)",
    favorable: false,
    interpretation: PALMISTRY_DATABASE_V2.markings.grille
  },
  circle: {
    title: "Circle Symbol",
    favorable: true,
    interpretation: PALMISTRY_DATABASE_V2.markings.circle
  },
  chain: {
    title: "Chain Structure",
    favorable: false,
    interpretation: PALMISTRY_DATABASE_V2.markings.chain
  },
  break: {
    title: "Break Marker",
    favorable: false,
    interpretation: PALMISTRY_DATABASE_V2.markings.break
  }
};

export const AGE_MAPPING_PROPORTIONS: PalmAgeMilestone[] = [
  { decade: "Ages 18–25", line: "Life Line", energyTrend: "Pioneering Vitality", opportunityOrLesson: "Establishing independent identity, setting foundational life habits, and breaking through initial doubts." },
  { decade: "Ages 26–33", line: "Fate Line", energyTrend: "Vocational Momentum", opportunityOrLesson: "Major career solidification, significant partnerships, and consolidation of professional skills." },
  { decade: "Ages 34–42", line: "Head Line", energyTrend: "Intellectual Mastery", opportunityOrLesson: "Apex of strategic clarity, commercial decision-making, and transition from learner to authority." },
  { decade: "Ages 43–52", line: "Fate Line", energyTrend: "Sovereign Leadership", opportunityOrLesson: "Expansion of influence, mentorship of others, and harvesting the fruits of long-term investments." },
  { decade: "Ages 53–65+", line: "Life Line", energyTrend: "Harvest & Wisdom", opportunityOrLesson: "Spiritual consolidation, generational legacy building, philanthropic leadership, and profound inner peace." }
];

export const CONTRADICTION_PATTERNS = [
  {
    condition: (handType: HandTypeClass, heartCurve?: string) => handType === "Conic" && heartCurve === "straight",
    phrasing: PALMISTRY_DATABASE_V2.contradictionTemplate.replace("{trait1}", "a warm, expressive, and artistic outer persona").replace("{trait2}", "a disciplined, emotionally reserved inner core that selects close confidants cautiously")
  },
  {
    condition: (handType: HandTypeClass, headJoined?: boolean) => handType === "Spatulate" && headJoined === true,
    phrasing: PALMISTRY_DATABASE_V2.contradictionTemplate.replace("{trait1}", "a restless drive for forward-moving innovation").replace("{trait2}", "a cautious, prudent instinct that double-checks consequences before irreversible execution")
  },
  {
    condition: (handType: HandTypeClass, thumbFlex?: string) => handType === "Philosophic" && thumbFlex === "flexible",
    phrasing: PALMISTRY_DATABASE_V2.contradictionTemplate.replace("{trait1}", "rigorous, uncompromising intellectual standards").replace("{trait2}", "a gracious adaptability and openness in everyday human connections")
  }
];
