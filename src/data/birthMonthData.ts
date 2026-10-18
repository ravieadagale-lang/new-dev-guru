// src/data/birthMonthData.ts

export interface BirthMonthInfo {
  monthIndex: number; // 1 to 12
  monthName: string;
  title: string;
  element?: string;
  themeGradient: string;
  accentBorder: string;
  badgeBg: string;
  textColor: string;
  characterAndPersonality: string;
  health: string;
  wealth: string;
  marriageAndFriends: string;
  luckyDays: string;
  luckyColours: string;
  luckyGemstones: string;
  compatibleNumbers: string;
}

export const BIRTH_MONTH_HEADER_INFO = {
  mainTitle: "The Twelve Gates of Birth: What Your Birth Month Reveals About You",
  subtitle: "A Numerologist's Guide to Character, Health, Wealth, Marriage, and Fortune",
  introParagraphs: [
    "Every soul that enters this world chooses, whether by cosmic design or divine accident, a particular month in which to draw its first breath. In the long tradition of numerology, the month of birth is far more than a date on a calendar — it is a vibrational gateway, a frequency that colours the personality, shapes the health constitution, influences the flow of wealth, and even determines the rhythm of one's closest relationships.",
    "Over many years of practice, I have watched this pattern repeat itself in chart after chart, in client after client, until the twelve gates revealed themselves as clearly as the seasons they mirror. In the pages that follow, I have distilled that experience into a deep, layered portrait of each of the twelve birth months. Read your own month carefully, then read the months of your spouse, your children, your parents, and your closest friends — for understanding another person's inner blueprint is often the surest path to compassion, patience, and lasting harmony."
  ],
  closingNote: "No single month defines the whole of a person, for the full numerological chart — the day, the year, and the life path number — adds layered nuance and depth to every portrait sketched here. Yet the month of birth remains a powerful undercurrent, a base note beneath the fuller symphony of the self, shaping temperament and tendency long before the finer details of a chart are ever calculated. Use these pages not as rigid law, but as a mirror — one that, I hope, helps you see yourself and those you love a little more clearly, and perhaps a little more kindly too."
};

export const BIRTH_MONTH_DATA: BirthMonthInfo[] = [
  {
    monthIndex: 1,
    monthName: "January",
    title: "The Pioneer's Month",
    themeGradient: "from-slate-950 via-stone-900 to-slate-900",
    accentBorder: "border-amber-500/40",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    textColor: "text-amber-400",
    characterAndPersonality:
      "Those born in January carry the restless, forward-driving energy of a new beginning, much like the year itself in its first stirring days. They are natural pioneers — ambitious, disciplined, and quietly stubborn in the pursuit of their goals, often setting a target in youth and pursuing it with a tenacity that outlasts every obstacle placed in their path. There is a seriousness to the January-born that can be mistaken for coldness by those who do not know them well, but beneath that composed, almost guarded exterior lies a deeply loyal and protective heart that reveals itself slowly, and only to those who have earned it. They dislike wasted effort and wasted words, preferring measured action to empty promises, and they judge others — and themselves — by what is actually accomplished rather than what is merely intended. Leadership comes naturally to them, for they possess an innate sense of structure and order that others instinctively trust, yet they must guard carefully against a tendency toward rigidity, a refusal to bend once their mind is made up, and an inner harshness they too often turn upon themselves in moments of failure. As children, January natives are often described as \"old souls,\" serious and responsible beyond their years; as adults, this seriousness matures into quiet authority.",
    health:
      "January natives often carry tension in the bones, joints, teeth, and skin — arthritis, dryness, brittle nails, and skeletal complaints are common concerns as they age, particularly in the knees and lower back, which seem to absorb the weight of their disciplined, sometimes self-punishing drive. Their melancholic tendencies, when left unaddressed, can also settle into the digestive system, producing a kind of low, grinding stress that rarely announces itself loudly but wears at the body over years. Fortunately, their disciplined nature serves them well in matters of health: they respond beautifully to structured routines, regular exercise, warm and nourishing foods, and consistent sleep patterns. Cold and damp conditions aggravate them more than most, so warmth therapies, saunas, and mineral-rich diets rich in calcium and magnesium are especially beneficial. They must learn, above all, to rest without guilt, for their instinct to keep working even while unwell is often their greatest health hazard.",
    wealth:
      "Money comes to the January-born through sustained effort rather than sudden windfall; theirs is a slow-building, compound-interest kind of prosperity rather than a lottery-ticket kind. They are natural savers, cautious with speculation, and tend to build wealth methodically through real estate, structured long-term investments, pensions, or their own disciplined enterprise built brick by careful brick. They rarely trust get-rich-quick schemes, and this scepticism, though it may make them seem overly conservative in youth, protects them from the ruinous losses that claim more impulsive natures. Their fortune tends to multiply significantly after the age of thirty-five, once decades of patience have finally had time to compound, and by mid-life many January natives find themselves in a position of quiet, unshowy financial security that younger, flashier earners often envy.",
    marriageAndFriends:
      "As a husband, the January man is steady, protective, and quietly devoted — he may not speak love aloud often, and his partner may sometimes wish for more verbal affirmation, but he shows his devotion consistently through provision, reliability, and an unwavering presence during hardship that few other men can match. He takes his role as provider and protector with immense seriousness, sometimes to the point of shouldering burdens silently rather than sharing them, and his wife must gently draw him into vulnerability rather than waiting for it to appear unprompted. As a wife, the January woman is the pillar of the household, organised, dependable, and fiercely loyal, running her domestic and financial life with the same discipline she applies everywhere else, though she must consciously soften at times to let her partner feel needed and useful rather than simply managed. In friendship, January natives are few but forever — they do not make friends easily or quickly, testing trust cautiously before investing, but once someone is admitted into their small inner circle, that bond typically lasts a lifetime, weathering distance, disagreement, and time itself.",
    luckyDays: "Saturdays and Tuesdays",
    luckyColours: "Deep brown, navy blue, charcoal grey, and black",
    luckyGemstones: "Garnet, Blue Sapphire, and Hematite",
    compatibleNumbers: "1, 4, and 8"
  },
  {
    monthIndex: 2,
    monthName: "February",
    title: "The Dreamer's Month",
    themeGradient: "from-indigo-950 via-purple-950 to-slate-900",
    accentBorder: "border-indigo-500/40",
    badgeBg: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    textColor: "text-indigo-400",
    characterAndPersonality:
      "February bestows a soul of quiet depth, imagination, and unusual sensitivity, and those born under this month often feel, from a very young age, that they see the world slightly differently from everyone around them. They are old souls — intuitive, artistic, and frequently drawn to the mystical, the philosophical, or the unconventional path that others might avoid out of fear. They think differently from the crowd and rarely feel a genuine need to conform, though social pressure can weigh on them more heavily than they let on. Their emotional intelligence is remarkably high; they read a room, a face, or an unspoken tension before words are even exchanged, which makes them extraordinary confidants but also leaves them vulnerable to absorbing others' pain as their own. They can retreat into solitude when overwhelmed, and their moods can shift like weather — bright and expansive one hour, distant and withdrawn the next — not from instability, but from the sheer intensity of their inner processing. Encourage a February native's originality, give them space to dream and to be strange in their own particular way, and they will surprise the world with genuine innovation; suppress them into conventional moulds, and they wither visibly, losing the very spark that made them remarkable.",
    health:
      "The nervous system is the February native's most delicate instrument — anxiety, insomnia, restlessness, and circulatory sluggishness are their most common trials, often appearing first as cold hands and feet, poor circulation, or a general sense of being \"wired but tired.\" Their sensitivity to stimulation means that noisy, chaotic, or emotionally charged environments drain them far faster than they drain others, and without adequate recovery time, this drain can tip into genuine anxiety disorders or depressive episodes. They thrive with meditation, warm baths, magnesium and omega-rich foods, gentle yoga, and above all, enough true solitude to recharge their unusually porous inner world. A February native who is denied quiet time will, sooner or later, fall ill — the body enforcing the rest the mind refuses to schedule.",
    wealth:
      "Their relationship with money is unconventional and often non-linear — they may earn through creative, humanitarian, spiritual, or technological pursuits rather than traditional, structured careers, and their income can arrive in unpredictable bursts, feast-and-famine style, rather than a steady, dependable stream. This unpredictability is not a character flaw but simply the nature of the innovative, less-travelled paths they tend to choose. They benefit enormously from a disciplined partner, accountant, or advisor who can help them save systematically during abundant seasons so the leaner months do not become a source of crisis. Left entirely to their own devices, February natives can be startlingly generous, sometimes to their own financial detriment, giving away resources to causes and people that move them emotionally.",
    marriageAndFriends:
      "As a husband, the February man is gentle, imaginative, and deeply loyal once trust is fully established, offering a rare emotional depth and creativity to the partnership, though he needs a spouse who respects his periodic need for private, quiet space without interpreting it as rejection. As a wife, the February woman is intuitive and nurturing in unusual, deeply creative ways, often sensing her partner's unspoken needs before they are ever voiced aloud, and bringing an almost psychic attentiveness to the emotional climate of the home. In friendship, February natives are the confidants everyone instinctively turns to in crisis, trusted with secrets others would never share elsewhere, though they themselves rarely ask for help, preferring to process their own struggles privately — a habit their true friends must learn to gently interrupt.",
    luckyDays: "Saturdays and Sundays",
    luckyColours: "Violet, turquoise, electric blue, and silver",
    luckyGemstones: "Amethyst, Aquamarine, and Moonstone",
    compatibleNumbers: "4, 7, and 11"
  },
  {
    monthIndex: 3,
    monthName: "March",
    title: "The Empath's Month",
    themeGradient: "from-teal-950 via-cyan-950 to-slate-900",
    accentBorder: "border-cyan-500/40",
    badgeBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    textColor: "text-cyan-400",
    characterAndPersonality:
      "March-born individuals possess an emotional richness that colours everything they touch, and their inner life is often so vivid that ordinary reality can feel, to them, faintly pale by comparison. Compassionate, imaginative, and deeply intuitive, they often absorb the moods of those around them without any conscious effort, which makes them extraordinary friends, healers, and artists, but occasionally leaves them overwhelmed, foggy, or emotionally waterlogged by feelings that were never truly their own to begin with. They are natural storytellers and dreamers, blessed with a vivid inner world that often expresses itself through music, art, poetry, or simply an unusually rich and metaphorical way of speaking about ordinary life. Their challenge, more than any other month, lies in boundaries — they give so generously of themselves, emotionally and materially, that they must consciously learn to protect their own reserves, or risk being quietly depleted by relationships and situations that take far more than they give back.",
    health:
      "Water retention, foot and lymphatic issues, and a general pattern of emotional exhaustion manifesting physically are common health patterns for the March-born. Their sensitivity, when it goes unexpressed verbally, often migrates into the digestive system or the immune system, producing recurring, low-grade ailments that seem to have no clear physical cause — because, quite often, the true cause is emotional rather than physical. Swimming, time spent near water, adequate rest, and creative emotional outlets such as journaling, painting, or music are deeply restorative for them, functioning almost as medicine. They must be especially cautious of escapism — into substances, fantasy, or avoidance — as a coping mechanism for feelings that would be far better processed directly.",
    wealth:
      "March natives attract wealth through creativity, caregiving professions, healing arts, or intuitive business decisions rather than cold, purely analytical calculation, and their financial instincts, though rarely conventional, are often surprisingly accurate when they trust their gut over external advice. They must, however, be cautious of over-generosity, as their extraordinarily soft heart can be exploited financially by those less scrupulous who sense an easy target. A trusted advisor, an automatic savings habit, or a disciplined partner who helps manage the practical side of money protects their long-term prosperity far more effectively than willpower alone.",
    marriageAndFriends:
      "As a husband, the March man is tender, romantic, and deeply devoted, offering his partner a rare emotional safety and depth of feeling that few other men can match, though his moods require patient understanding rather than quick judgment. As a wife, the March woman nurtures her household with quiet devotion and remarkable intuition, sensing tension or joy in the home before it is ever spoken, though she needs a partner who reassures her often and consistently, as she can be prone to insecurity and self-doubt beneath her caring exterior. In friendship, March natives are the ones who remember your birthday, your bad day three years ago, and the dream you mentioned once in passing — true emotional anchors whose loyalty runs remarkably deep.",
    luckyDays: "Mondays and Thursdays",
    luckyColours: "Sea green, silver, pale blue, and lavender",
    luckyGemstones: "Moonstone, Pearl, and Aquamarine",
    compatibleNumbers: "2, 6, and 9"
  },
  {
    monthIndex: 4,
    monthName: "April",
    title: "The Warrior's Month",
    themeGradient: "from-rose-950 via-red-950 to-slate-900",
    accentBorder: "border-rose-500/40",
    badgeBg: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    textColor: "text-rose-400",
    characterAndPersonality:
      "April bestows fire, courage, and an unmistakable magnetism that draws others in even before a single word is spoken. Those born in this month are natural initiators — bold, energetic, and impatient with delay, always the first to volunteer, the first to act, and often the first to grow restless once a project settles into routine maintenance. They speak their mind plainly, without much padding or diplomacy, and lead from the front, inspiring others through sheer conviction and visible courage rather than careful persuasion. Their temper can flare quickly and dramatically, but it cools just as fast, typically leaving no lasting bitterness behind — a trait that can confuse slower-tempered partners who are still nursing yesterday's argument long after the April native has moved on entirely. They crave challenge and genuinely grow bored, even irritable, with routine, making them natural entrepreneurs, athletes, reformers, and anyone drawn to work that offers a clear fight worth fighting.",
    health:
      "The head, eyes, and blood pressure are areas of particular vulnerability for April natives — migraines, headaches, and inflammatory conditions are common when stress accumulates without adequate physical release. Their competitive, always-pushing drive can push them toward genuine burnout if unchecked, arriving suddenly and severely after long periods of ignored warning signs. Regular, vigorous physical release through sport, martial arts, or intense exercise is essential for them — not optional, but a genuine health requirement — along with cooling foods, adequate rest, and conscious anger management to balance their fiery constitution before it boils over into the body itself.",
    wealth:
      "Money flows to the April-born through bold initiative, entrepreneurship, and calculated risk-taking that more cautious natures would shy away from entirely. They are unafraid to start over from nothing, which often serves them extraordinarily well financially over a lifetime, since each failure becomes fuel rather than a final verdict. However, impulsive spending, hasty investment decisions made in the heat of enthusiasm, and a general impatience with slow, steady financial planning can just as easily undo their gains. A disciplined budget and a patient financial partner, paired with their natural courage and drive, together create genuinely lasting prosperity rather than the boom-and-bust cycle they might otherwise experience alone.",
    marriageAndFriends:
      "As a husband, the April man is passionate, protective, and exciting to build a life with, bringing energy and adventure into the marriage, though he must consciously learn patience and emotional steadiness to truly nurture a long, lasting partnership rather than treating it like another conquest to win and then move past. As a wife, the April woman is spirited, independent, and full of vitality, bringing real fire and momentum into the marriage, though she needs a partner secure and confident enough in himself not to be intimidated or threatened by her considerable strength and drive. In friendship, April natives are fiercely loyal defenders, always the first to stand up publicly for those they love, quick to anger on a friend's behalf, and equally quick to forgive and move forward once the storm has passed.",
    luckyDays: "Tuesdays and Sundays",
    luckyColours: "Red, scarlet, coral, and burnt orange",
    luckyGemstones: "Red Coral, Ruby, and Carnelian",
    compatibleNumbers: "1, 3, and 9"
  },
  {
    monthIndex: 5,
    monthName: "May",
    title: "The Builder's Month",
    themeGradient: "from-emerald-950 via-green-950 to-slate-900",
    accentBorder: "border-emerald-500/40",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    textColor: "text-emerald-400",
    characterAndPersonality:
      "May-born souls combine practicality with a genuine, unhurried appreciation for beauty and comfort, moving through life at their own steady pace rather than being rushed by others' urgency. They are dependable, patient, and possess remarkable determination once truly committed to a path, though that commitment itself can take considerable time to secure, as they weigh decisions carefully before locking them in. Sensual and deeply grounded, they find genuine joy in nature, good food, physical comfort, and stable routines that others might dismiss as unexciting but that May natives experience as quietly luxurious. Their stubbornness can become a real obstacle when they refuse to adapt to changing circumstances, digging in even when flexibility would clearly serve them better, but this same immovable quality makes them extraordinarily reliable partners, employees, and friends who rarely abandon a commitment once it is made, regardless of how difficult circumstances become.",
    health:
      "The throat, thyroid, and neck region require special attention for May natives, and hormonal or metabolic issues connected to the thyroid are worth monitoring as they age. There is also a tendency toward weight fluctuation and slower metabolism, connected to their genuine love of comfort, rich food, and indulgent rest. Regular movement, mindful rather than emotional eating, and vocal or breathing exercises to keep the throat chakra clear all help maintain their vitality. They benefit greatly from time spent outdoors, gardening, or any grounding, earth-connected activity that satisfies their deep need for physical, sensory contact with the natural world.",
    wealth:
      "May natives are gifted accumulators — patient, practical, and remarkably skilled at building lasting material security over the course of a lifetime rather than chasing quick gains. They favour tangible investments like property, land, and physical assets they can see and touch, and generally prefer steady, unglamorous growth over speculation or gambling with their resources. Their financial instincts are sound and conservative in the best sense, and wealth tends to grow reliably and cumulatively across their lifetime, particularly when they consciously resist the pull toward excessive luxury spending that their love of comfort can otherwise encourage.",
    marriageAndFriends:
      "As a husband, the May man is stable, generous, and deeply committed, providing a genuine sense of permanence and physical security his partner can lean on completely, though he must guard against becoming too set in his ways to accommodate his wife's evolving needs over the years. As a wife, the May woman creates a warm, beautiful, comfortable home and is fiercely devoted to her family, though she can become possessive or resistant to change if she feels insecure, requiring gentle reassurance rather than confrontation to ease that grip. In friendship, they are the reliable ones — dependable, warm, and always ready to host, feed, and physically care for the people they love, making their homes a genuine gathering place for others.",
    luckyDays: "Fridays and Mondays",
    luckyColours: "Emerald green, soft pink, and earthy terracotta",
    luckyGemstones: "Emerald, Rose Quartz, and Jade",
    compatibleNumbers: "2, 5, and 6"
  },
  {
    monthIndex: 6,
    monthName: "June",
    title: "The Communicator's Month",
    themeGradient: "from-yellow-950 via-amber-950 to-slate-900",
    accentBorder: "border-yellow-500/40",
    badgeBg: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    textColor: "text-yellow-400",
    characterAndPersonality:
      "June brings a quick, versatile, and endlessly curious mind that rarely sits still for long. Those born this month are charming conversationalists, witty, adaptable, and gifted with words — whether spoken, written, or simply expressed through an unusually lively and engaging manner. They can juggle many interests, projects, and social circles at once, moving fluidly between them with apparent ease, though this same versatility can lead to scattered focus and a string of half-finished projects if not consciously managed. Socially magnetic, they read people quickly and adjust their approach effortlessly to match, making them natural networkers, writers, teachers, and salespeople who genuinely enjoy the exchange of ideas for its own sake. Their central challenge is depth — learning to commit fully to one path, one relationship, or one body of knowledge rather than continually sampling many, which is where their most significant growth as adults tends to occur.",
    health:
      "The lungs, nervous system, and hands are areas of particular concern for June natives, along with a pronounced tendency toward overthinking that manifests as anxiety, restlessness, or a racing mind that struggles to switch off at night. June natives benefit enormously from breathing exercises, fresh air, and activities that occupy their hands and mind simultaneously — music, crafts, cooking, or any pursuit that channels their mental energy into something tangible. Mental stimulation is not a luxury for them but a genuine health requirement; understimulated, they grow anxious and irritable in ways that can surprise even themselves.",
    wealth:
      "June-born individuals earn well through communication-based fields — writing, sales, media, teaching, marketing, or trade — where their natural wit and adaptability translate directly into income. Multiple income streams suit their versatile nature far better than a single fixed source, and many thrive with a side project or two running alongside their main career. Their challenge is consistency, as their enthusiasm for new ventures can scatter their financial focus across too many directions at once; a disciplined plan, ideally created with outside help, channels their many talents into genuinely lasting wealth rather than a series of promising but abandoned starts.",
    marriageAndFriends:
      "As a husband, the June man is entertaining, affectionate, and mentally stimulating to be married to, though his partner must accept his ongoing need for variety, conversation, and social connection rather than expecting him to be satisfied by quiet routine alone. As a wife, the June woman brings wit, warmth, and lively conversation into the marriage, keeping the relationship from ever growing dull or predictable, and often serving as the social glue that keeps the couple's friendships and family ties active and thriving. In friendship, they are the connectors — the ones who introduce everyone to everyone else, hosting gatherings that never feel forced and maintaining an unusually wide circle of genuinely warm acquaintances.",
    luckyDays: "Wednesdays and Fridays",
    luckyColours: "Light green, yellow, and cream",
    luckyGemstones: "Peridot, Citrine, and Agate",
    compatibleNumbers: "3, 5, and 6"
  },
  {
    monthIndex: 7,
    monthName: "July",
    title: "The Guardian's Month",
    themeGradient: "from-blue-950 via-slate-900 to-slate-950",
    accentBorder: "border-blue-500/40",
    badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    textColor: "text-blue-400",
    characterAndPersonality:
      "July-born individuals carry deep emotional currents beneath a protective, often reserved exterior that can take considerable time to soften around new people. They are intuitive, family-oriented, and fiercely nurturing toward those within their inner circle, though slow and cautious to let outsiders in, having learned early that trust, once broken, is not easily rebuilt. Memory and sentiment run remarkably strong in them — they rarely forget a kindness shown or a wound inflicted, and both tend to shape their behaviour toward a person for years afterward, sometimes long after the other party has forgotten the incident entirely. Their moods can ebb and flow like tides, rising and receding in patterns that can feel mysterious even to themselves, and they may retreat into their shell when hurt rather than confronting the source of the pain directly, but their loyalty, once genuinely earned, is unshakeable and quietly ferocious.",
    health:
      "The stomach, digestive system, and chest area are the July native's primary areas of vulnerability, frequently reflecting unexpressed or unprocessed emotion that the body ends up carrying on the mind's behalf. Comfort eating, digestive sensitivity, and stress-related stomach complaints are common patterns, particularly during periods of emotional upheaval or family conflict. They benefit enormously from genuine emotional expression — whether through trusted conversation, therapy, or private creative outlets — along with warm, easily digestible foods and a calm, secure, predictable home environment that soothes their sensitive nervous system.",
    wealth:
      "July natives build wealth cautiously and protectively, with family security as their primary motivation rather than personal ambition or status. They favour savings, insurance, and inherited or family-linked assets over risky ventures, preferring the security of a full reserve to the excitement of a big gamble. Real estate and home-based enterprises suit them particularly well, as they are happiest and most successful when building wealth from a nurturing, secure home base rather than a distant, impersonal office.",
    marriageAndFriends:
      "As a husband, the July man is protective, sentimental, and deeply devoted to home and family, often becoming the quiet emotional anchor of the household even when he appears outwardly reserved. As a wife, the July woman is nurturing and intuitive, creating a home filled with warmth and unspoken care, though she needs consistent reassurance and emotional security to fully open up rather than retreating behind her protective shell at the first sign of conflict. In friendship, they are the ones who remember every detail of your life and show up with exactly what you need, without being asked twice — a rare and treasured quality in an increasingly distracted world.",
    luckyDays: "Mondays and Thursdays",
    luckyColours: "White, silver, and soft grey",
    luckyGemstones: "Moonstone, White Pearl, and Chalcedony",
    compatibleNumbers: "2, 4, and 7"
  },
  {
    monthIndex: 8,
    monthName: "August",
    title: "The Sovereign's Month",
    themeGradient: "from-amber-950 via-orange-950 to-slate-900",
    accentBorder: "border-amber-500/40",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    textColor: "text-amber-400",
    characterAndPersonality:
      "August bestows warmth, confidence, and natural leadership that tends to reveal itself early and clearly, even in childhood. Those born this month possess a radiant, magnetic presence — generous, proud, and often the natural centre of attention wherever they go, not through calculation but simply through the genuine warmth and vitality they radiate. They lead with heart and expect loyalty in return, and while their ego can occasionally overshadow their genuine generosity, particularly when they feel unappreciated or overlooked, their intentions are almost always noble and their generosity, once it flows, is genuinely lavish. They inspire others through visible example rather than quiet suggestion, and possess a natural flair for the dramatic and the creative that makes them memorable performers, hosts, and public figures.",
    health:
      "The heart, spine, and upper back require particular attention for August natives as they age, along with a tendency toward high blood pressure when stress, unresolved pride conflicts, or feelings of being disrespected go unmanaged over time. Regular cardiovascular exercise, deliberate stress management, and the ongoing cultivation of humility alongside their natural confidence keep them genuinely vital well into later years. Left unaddressed, their tendency to internalise perceived slights can create a slow-burning cardiac strain that surfaces later in life as a genuine warning worth heeding early.",
    wealth:
      "Money and status often intertwine for the August-born, who are naturally drawn to leadership roles, entrepreneurship, and public-facing careers where their charisma can be fully expressed and rewarded. They earn generously but spend generously too, particularly on quality, appearance, and the visible symbols of success that matter deeply to their sense of self. Long-term wealth for August natives requires channelling their natural authority and drive into disciplined, structured investment rather than pure display and immediate gratification, a lesson many learn only after an early costly lesson in overspending.",
    marriageAndFriends:
      "As a husband, the August man is generous, protective, and genuinely proud to provide for his family, wanting his partner to shine and be admired every bit as much as he himself wishes to shine. As a wife, the August woman is warm, dignified, and devoted, bringing genuine glamour and celebration into the marriage, though she needs sincere admiration and respect from her partner to feel truly secure, wilting noticeably when taken for granted. In friendship, they are generous hosts and fierce loyalists, naturally becoming the organisers and leaders of any social circle they belong to, always ready to celebrate others' achievements as enthusiastically as their own.",
    luckyDays: "Sundays and Tuesdays",
    luckyColours: "Gold, orange, and deep red",
    luckyGemstones: "Ruby, Yellow Sapphire, and Sunstone",
    compatibleNumbers: "1, 3, and 9"
  },
  {
    monthIndex: 9,
    monthName: "September",
    title: "The Perfectionist's Month",
    themeGradient: "from-blue-950 via-slate-900 to-indigo-950",
    accentBorder: "border-blue-500/40",
    badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    textColor: "text-blue-400",
    characterAndPersonality:
      "September-born individuals possess sharp analytical minds paired with a deep, almost restless desire for order and continuous improvement in everything they touch. Practical, detail-oriented, and quietly perfectionistic, they hold themselves to remarkably high standards and often, sometimes unfairly, extend those same exacting expectations to the people around them. Beneath their composed, occasionally critical exterior lies a genuinely caring heart that expresses love not through grand declarations but through consistent, practical acts of service — the fixed appointment remembered, the small errand quietly run, the problem solved before anyone else even noticed it existed. Their central challenge, and often their life's great lesson, is learning to accept imperfection — in themselves, in the people they love, and in the unpredictable, messy texture of life itself.",
    health:
      "The digestive system and nervous system bear the brunt of September's perfectionistic tendencies, with anxiety and stress-related stomach issues — ulcers, irritable bowel patterns, and chronic tension — being especially common when their exacting standards go unmet. A structured, orderly daily routine benefits them greatly, giving their anxious mind a sense of predictable control, as does deliberately learning to release control through mindfulness, gentle exercise, and a clean diet free of excess processed food, which their sensitive digestive systems struggle to tolerate well.",
    wealth:
      "September natives are meticulous with money — careful, disciplined budgeters who rarely overspend and who thrive in analytical, administrative, financial, or health-related professions where precision is genuinely rewarded. Their attention to detail makes them excellent not only at managing their own finances but often at managing those of others too, frequently finding themselves the unofficial financial advisor within their family or friend group. Wealth builds steadily and reliably through diligence and careful planning rather than risk, and by mid-life most September natives possess a financial cushion built almost entirely through quiet, consistent discipline.",
    marriageAndFriends:
      "As a husband, the September man is reliable, thoughtful, and quietly devoted, expressing love through practical support, careful planning, and consistent follow-through rather than grand romantic gestures that can feel, to him, somewhat hollow. As a wife, the September woman manages the household with remarkable efficiency and genuine care, anticipating needs before they arise, though her partner must make a point of reassuring her that her considerable efforts are truly seen and appreciated, since she rarely asks for that acknowledgment directly. In friendship, they are the ones who remember the small details others forget and offer genuinely useful, practical advice rather than empty sympathy — a quality their friends come to rely on deeply over time.",
    luckyDays: "Wednesdays and Saturdays",
    luckyColours: "Navy blue, grey, and beige",
    luckyGemstones: "Sapphire, Jade, and Peridot",
    compatibleNumbers: "4, 6, and 8"
  },
  {
    monthIndex: 10,
    monthName: "October",
    title: "The Diplomat's Month",
    themeGradient: "from-pink-950 via-purple-950 to-slate-900",
    accentBorder: "border-pink-500/40",
    badgeBg: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    textColor: "text-pink-400",
    characterAndPersonality:
      "October bestows grace, charm, and a deep-seated love of harmony that shapes nearly every decision the October-born makes, consciously or not. Those born this month are natural peacemakers — diplomatic, fair-minded, and often gifted with a genuine eye for beauty, balance, and proportion in everything from art to relationships. They dislike conflict intensely and will go to considerable, sometimes exhausting lengths to smooth tension between others, occasionally at the real cost of voicing their own needs and preferences clearly. Socially adept and genuinely likeable, they build wide, warm networks with apparent ease, moving comfortably between different social groups, though they must learn, often later in life, that true and lasting harmony sometimes requires honest confrontation rather than constant, well-meaning avoidance.",
    health:
      "The kidneys, lower back, and skin are areas of particular concern for October natives, often physically reflecting their tendency to suppress personal needs and unspoken frustrations in the name of keeping the peace around them. Hormonal balance and skin sensitivity — breakouts, rashes, and allergic reactions during stressful periods — are common recurring themes. They benefit from adequate hydration, regular beauty and self-care rituals that restore their sense of balance, and the ongoing, deliberate practice of expressing disagreement openly rather than internalising it until it eventually surfaces as physical symptoms or sudden emotional outbursts.",
    wealth:
      "October-born individuals often find genuine financial success in partnerships, law, design, diplomacy, the arts, or any field where their natural sense of balance, fairness, and aesthetics is a professional asset rather than a liability. They may struggle with indecision in financial matters, weighing every option carefully and sometimes missing opportunities in the process, benefiting enormously from a trusted business partner or advisor who can help them finalise decisions confidently and on time rather than endlessly deliberating.",
    marriageAndFriends:
      "As a husband, the October man is charming, fair, and genuinely partnership-oriented, valuing his wife's opinion as much as his own and rarely making significant decisions without her input. As a wife, the October woman is graceful and devoted to marital harmony, bringing genuine beauty, balance, and aesthetic pleasure into the home, though she needs a partner willing to make decisions alongside her rather than leaving her to decide alone, a burden she finds genuinely difficult to carry by herself. In friendship, they are the natural mediators, beloved for their fairness, charm, and rare ability to see and honestly represent every side of a disagreement.",
    luckyDays: "Fridays and Sundays",
    luckyColours: "Soft pink, pastel blue, and lavender",
    luckyGemstones: "Opal, Rose Quartz, and Lapis Lazuli",
    compatibleNumbers: "2, 6, and 9"
  },
  {
    monthIndex: 11,
    monthName: "November",
    title: "The Mystic's Month",
    themeGradient: "from-purple-950 via-slate-950 to-red-950",
    accentBorder: "border-purple-500/40",
    badgeBg: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    textColor: "text-purple-400",
    characterAndPersonality:
      "November-born individuals possess intensity, depth, and an almost magnetic mystery about them that others sense immediately, even before getting to know them well. They feel everything powerfully, think deeply about matters others skim past, and are rarely satisfied with a surface-level understanding of anything — people, ideas, motives, or themselves. Fiercely loyal to those they trust and equally fierce, even unforgiving, when that trust is betrayed, they do not forget easily, and their memory for a genuine wrong can last a lifetime even when outwardly they appear to have moved on. Their passion, when channelled well and given a worthy outlet, makes them formidable achievers in research, psychology, transformation-oriented work, investigation, or any field requiring deep, sustained focus and considerable resilience under pressure.",
    health:
      "The reproductive system and areas governed by transformation and elimination require particular attention for November natives, along with a strong tendency to internalise stress and unresolved emotion until it eventually manifests physically, often quite suddenly after a long period of apparent calm. They benefit from intense physical outlets — strength training, martial arts, or any activity demanding total focus — deep emotional processing through therapy or a small number of deeply trusted confidants, and consciously avoiding the extremes toward which they are naturally prone: extremes of work, of secrecy, and of self-denial that can quietly erode their health if left unchecked for too long.",
    wealth:
      "November natives possess sharp, penetrating financial instincts and are genuinely unafraid of calculated risk, often thriving in investment, research-driven fields, strategy, or any work involving real depth and long-term thinking. They tend to keep their financial matters quite private, preferring total control over their own resources and disliking outside interference or unsolicited advice, and can build substantial, sometimes surprising wealth through focused, patient, long-term strategy that others rarely see coming until it has already succeeded.",
    marriageAndFriends:
      "As a husband, the November man is intensely loyal and protective, offering a depth of passion and devotion few other men can match, though he must consciously learn to release jealousy and the impulse to control in order to let genuine trust flourish rather than curdle into possessiveness. As a wife, the November woman loves with complete, all-consuming devotion and expects nothing less in return, bringing profound emotional depth and genuine intensity to every aspect of the marriage. In friendship, they keep a small, extremely carefully chosen circle rather than a wide one, but for those genuinely admitted within it, their loyalty is absolute, unwavering, and quietly fierce for a lifetime.",
    luckyDays: "Tuesdays and Thursdays",
    luckyColours: "Deep red, maroon, and black",
    luckyGemstones: "Garnet, Red Coral, and Obsidian",
    compatibleNumbers: "2, 7, and 9"
  },
  {
    monthIndex: 12,
    monthName: "December",
    title: "The Philosopher's Month",
    themeGradient: "from-blue-950 via-indigo-950 to-purple-950",
    accentBorder: "border-blue-500/40",
    badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    textColor: "text-blue-400",
    characterAndPersonality:
      "December bestows optimism, adventurousness, and a genuine philosophical hunger for meaning that colours nearly every choice the December-born makes throughout life. Those born this month are natural explorers — of ideas, cultures, and horizons both literal and intellectual, rarely content to stay confined within a single worldview or a single place for too long. Freedom-loving and honest to a fault, they speak their truth plainly and directly, sometimes too plainly for the comfort of more diplomatically-minded company, valuing candour far more highly than tact. Their enthusiasm is genuinely infectious, and their generosity of spirit makes them beloved wherever they go, though they must guard consciously against restlessness and a reluctance to settle into deep commitment too quickly, preferring instead to keep at least one door open at all times.",
    health:
      "The hips, thighs, and liver are areas of particular concern for December natives as they age, along with a real tendency toward overindulgence, since their expansive love of life can extend quite naturally to excess in food, drink, celebration, or activity of nearly any kind. Regular movement, particularly outdoor and genuinely adventurous physical pursuits that match their restless spirit, keeps their body and mind well aligned, along with conscious moderation in indulgence and ongoing attention to liver health, which tends to bear the cumulative cost of their enthusiastic approach to life's pleasures.",
    wealth:
      "December-born individuals often find genuine prosperity through travel, education, publishing, international business, or any field that broadens horizons — their own and others' — rather than confining them to a single narrow track. Their natural optimism serves them remarkably well financially, allowing them to recover from setbacks that would discourage more pessimistic natures, though they must guard against overconfidence and impulsive risk-taking born of that same sunny outlook. Diversified, genuinely adventurous investments — across geographies, industries, and asset types — often suit them considerably better than narrow, conservative ones that fail to hold their interest or attention.",
    marriageAndFriends:
      "As a husband, the December man is fun-loving, honest, and generous, bringing genuine adventure and spontaneity into married life, though his partner must give him real room to roam, explore, and pursue his interests without feeling threatened or abandoned by his need for independence. As a wife, the December woman is vibrant, independent, and philosophically minded, needing a partner who genuinely shares, or at least respects, her hunger for growth, travel, and new experience rather than one who wishes to keep her permanently close to home. In friendship, they are the ones who inspire spontaneous adventures and genuinely broaden everyone's horizons with their infectious optimism and refreshing honesty, making even ordinary gatherings feel like the start of something new.",
    luckyDays: "Thursdays and Sundays",
    luckyColours: "Purple, royal blue, and turquoise",
    luckyGemstones: "Turquoise, Yellow Sapphire, and Amethyst",
    compatibleNumbers: "3, 5, and 9"
  }
];
