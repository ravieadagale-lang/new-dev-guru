import { TarotCardData } from "../types/tarot";
import { MAJOR_ARCANA_DECK } from "./tarotMajorArcanaData";
import { TAROT_WANDS_SUIT } from "./tarotWandsData";
import { TAROT_CUPS_SUIT } from "./tarotCupsData";
import { TAROT_SWORDS_SUIT } from "./tarotSwordsData";
import { TAROT_PENTACLES_SUIT } from "./tarotPentaclesData";
import { TAROT_ORACLE_CARDS_MAP } from "./tarotOracleBankData";

export const TAROT_CARD_BACK_URL = "/src/assets/images/tarot_card_back_1785335508394.jpg";

// Helper function to enrich Major Arcana into full TarotCardData
const enrichedMajorArcana: TarotCardData[] = MAJOR_ARCANA_DECK.map((c, idx) => {
  const cardId = `major_${c.cardNumber}`;
  
  // Custom deep traits per Major Arcana
  const majorMeta: Record<number, {
    element: "Air" | "Fire" | "Water" | "Earth" | "Spirit";
    astrology: string;
    archetype: string;
    yesNo: "Yes" | "No" | "Maybe" | "Conditional Yes" | "Conditional No";
    timing: string;
    advice: string;
    warning: string;
    shadow: string;
    keywords: string[];
    love: string;
    career: string;
    finance: string;
    spiritual: string;
    affirmation: string;
    reflectiveQuestion: string;
  }> = {
    0: {
      element: "Air",
      astrology: "Uranus",
      archetype: "The Innocent Wanderer",
      yesNo: "Yes",
      timing: "Immediate or Unexpected / Spring equinox",
      advice: "Take a leap of faith and trust the universe with an open heart.",
      warning: "Avoid reckless impulsivity without considering immediate physical safety.",
      shadow: "Naivety, fear of commitment, or avoiding accountability through endless wandering.",
      keywords: ["New Beginnings", "Innocence", "Spontaneity", "Free Spirit", "Infinite Potential"],
      love: "Fresh new romantic encounters, uninhibited self-expression, and embarking on a playful love adventure.",
      career: "Stepping into an uncharted industry, founding a startup, or starting an inspiring career chapter.",
      finance: "Unconventional opportunities; be open to new revenue streams but stay mindful of risky speculation.",
      spiritual: "Pure divine connection, absolute surrender to cosmic flow, and beginning a soul awakening.",
      affirmation: "I step fearlessly into the unknown, trusting the universe to support my journey.",
      reflectiveQuestion: "What bold, joyful adventure would I embark upon if fear had zero hold on me?"
    },
    1: {
      element: "Air",
      astrology: "Mercury",
      archetype: "The Divine Manifestor",
      yesNo: "Yes",
      timing: "Very Fast / Days to Weeks (Mercury transit)",
      advice: "Align your mind, words, and actions; you possess all tools necessary to succeed.",
      warning: "Beware of manipulation, trickery, or misrepresenting your abilities.",
      shadow: "Using charisma for deceit, scattered talents, or untapped raw potential.",
      keywords: ["Manifestation", "Resourcefulness", "Power", "Inspired Action", "Conscious Will"],
      love: "Taking proactive initiative, magnetic attraction, and clearly expressing romantic desires.",
      career: "Leading projects with distinction, pitching bold ideas, and executing skills with master craftsmanship.",
      finance: "Direct creation of wealth through personal ingenuity, negotiation, and smart resource allocation.",
      spiritual: "Channeling ethereal cosmic energy directly down into physical reality ('As above, so below').",
      affirmation: "I have the power, skills, and cosmic alignment to manifest my highest intentions.",
      reflectiveQuestion: "Which internal talents and resources am I ready to unleash into tangible form?"
    },
    2: {
      element: "Water",
      astrology: "Moon",
      archetype: "The Keeper of Intuition",
      yesNo: "Maybe",
      timing: "Full Moon / Hidden timing / During quiet reflection",
      advice: "Listen to your inner knowing; the answers you seek lie beneath the surface.",
      warning: "Do not ignore intuitive red flags or retreat into total isolation and secrecy.",
      shadow: "Repressed emotions, hidden agendas, or disconnect from divine feminine instincts.",
      keywords: ["Intuition", "Sacred Knowledge", "Divine Feminine", "Subconscious", "Mystery"],
      love: "Deep soulmate recognition, telepathic emotional connection, and honoring personal boundaries.",
      career: "Research, confidential negotiations, intuitive strategy, and trusting gut instincts over logic alone.",
      finance: "Hidden financial factors or unrevealed terms; review contracts with supreme discretion.",
      spiritual: "Accessing the Akasha, lucid dream insights, and communing with silent inner wisdom.",
      affirmation: "I trust my quiet inner voice; deep spiritual wisdom flows naturally through me.",
      reflectiveQuestion: "What is my intuition whispering to me that my conscious mind has been overlooking?"
    },
    3: {
      element: "Earth",
      astrology: "Venus",
      archetype: "The Divine Mother & Empress",
      yesNo: "Yes",
      timing: "Spring / Harvest season / 9 months gestation cycle",
      advice: "Nurture your creations with love, luxury, sensory indulgence, and maternal care.",
      warning: "Avoid smothering control, overspending, or neglecting self-care for others.",
      shadow: "Creative barrenness, codependency, vanity, or excessive material attachment.",
      keywords: ["Abundance", "Fertility", "Nurturing", "Sensuality", "Creative Flowering"],
      love: "Deeply fulfilling romantic partnerships, unconditional love, pregnancy, and warm domestic harmony.",
      career: "Lush creative blooming, highly profitable ventures, aesthetic industries, and fertile teamwork.",
      finance: "Generous financial growth, comfort, luxurious investments, and material flourishing.",
      spiritual: "Communing with Mother Gaia (Prakriti), celebrating bodily sacredness and creative life force.",
      affirmation: "Abundance surrounds me; I receive and give love with boundless generosity.",
      reflectiveQuestion: "How can I more deeply nurture my current creative and emotional seeds into full bloom?"
    },
    4: {
      element: "Fire",
      astrology: "Aries",
      archetype: "The Sovereign Protector",
      yesNo: "Yes",
      timing: "Aries Season (March 21 - April 19) / Structured milestone",
      advice: "Establish firm boundaries, take command, and create clear operational structures.",
      warning: "Avoid tyrannical stubbornness, emotional coldness, and rigid micromanagement.",
      shadow: "Abuse of authority, fear of vulnerability, or crumbling institutional structures.",
      keywords: ["Authority", "Structure", "Stability", "Father Archetype", "Sovereign Leadership"],
      love: "Committed, protective, long-term stability with clear mutual respect and mature boundaries.",
      career: "Executive leadership, managerial oversight, organizational scaling, and disciplined execution.",
      finance: "Solid financial foundations, prudent budgeting, property ownership, and institutional security.",
      spiritual: "Spiritual sovereignty, mastering personal discipline (Dharma), and aligning with divine cosmic law.",
      affirmation: "I stand firmly in my authentic sovereignty, leading my life with order and purpose.",
      reflectiveQuestion: "Where in my life is greater structure, discipline, and sovereign leadership needed?"
    },
    5: {
      element: "Earth",
      astrology: "Taurus",
      archetype: "The Spiritual Mentor / Guru",
      yesNo: "Yes",
      timing: "Taurus Season / Ceremonial timing / Institutional schedule",
      advice: "Seek counsel from proven traditions, authentic mentors, or spiritual lineages.",
      warning: "Do not blindly conform to dogma that stifles your independent spiritual evolution.",
      shadow: "Religious hypocrisy, rigid orthodoxy, or fear of unconventional truth.",
      keywords: ["Spiritual Wisdom", "Tradition", "Mentorship", "Higher Learning", "Sacred Lineage"],
      love: "Traditional commitment, sacred matrimonial rites, shared spiritual values, and moral harmony.",
      career: "Institutional accreditation, academia, mentorship, and aligning with established ethical codes.",
      finance: "Conservative investment models, traditional banking, and ethical wealth stewardship.",
      spiritual: "Initiation into sacred lineages, Vedic study, guru blessings, and conscious ritual practice.",
      affirmation: "I honor sacred wisdom and connect with teachers who illuminate my authentic path.",
      reflectiveQuestion: "What traditional wisdom or trusted teacher can support my next stage of growth?"
    },
    6: {
      element: "Air",
      astrology: "Gemini",
      archetype: "The Sacred Union & Crossroads",
      yesNo: "Yes",
      timing: "Gemini Season / Sudden alignment when a moral choice is made",
      advice: "Choose in full alignment with your authentic moral values and heartfelt truth.",
      warning: "Avoid self-betrayal, codependency, or making decisions based on fleeting lust alone.",
      shadow: "Internal disharmony, conflicting loyalties, or choosing immediate pleasure over virtue.",
      keywords: ["Love", "Harmony", "Sacred Choice", "Soul Alignment", "Values"],
      love: "Profund soul connection, magnetic chemistry, mutual devotion, and harmonizing polarities.",
      career: "Harmonious business partnerships, choosing between two viable paths based on core ethics.",
      finance: "Joint financial decisions, balanced expenditures, and investments reflecting personal ethics.",
      spiritual: "Integration of the inner divine masculine (Shiva) and feminine (Shakti).",
      affirmation: "I make choices rooted in love, integrity, and profound soul alignment.",
      reflectiveQuestion: "Which decision before me truly honors my highest moral values and deepest heart?"
    },
    7: {
      element: "Water",
      astrology: "Cancer",
      archetype: "The Triumphant Driver",
      yesNo: "Yes",
      timing: "Rapid / Weeks / When determined focus is sustained",
      advice: "Harness your opposing impulses and drive forward with unwavering determination.",
      warning: "Avoid aggressive bulldozing, road rage, or losing control of conflicting emotions.",
      shadow: "Arrogance, burnout, or driving relentlessly toward a destination you no longer desire.",
      keywords: ["Victory", "Willpower", "Determination", "Control", "Conquering Obstacles"],
      love: "Overcoming relationship hurdles through united purpose and clear boundaries.",
      career: "Monumental career breakthrough, winning contracts, promotion, and overtaking competition.",
      finance: "Speedy financial recovery through aggressive discipline and focused budget execution.",
      spiritual: "Mastery of the astral vehicle (ratha) by harnessing the horses of the five senses.",
      affirmation: "With unwavering focus and willpower, I steer my destiny to triumphant success.",
      reflectiveQuestion: "What opposing forces inside me must I unite to conquer my current objective?"
    },
    8: {
      element: "Fire",
      astrology: "Leo",
      archetype: "The Compassionate Lion Tamer",
      yesNo: "Yes",
      timing: "Leo Season / Sustained gentle persistence over time",
      advice: "Exercise gentle patience, compassionate courage, and inner moral fortitude.",
      warning: "Do not attempt to overpower situations with brute force or explosive anger.",
      shadow: "Self-doubt, raw aggression, succumbing to base desires, or emotional cowardice.",
      keywords: ["Inner Strength", "Courage", "Compassion", "Patience", "Gentle Mastery"],
      love: "Taming emotional turbulence with unconditional warmth, forgiveness, and loyal affection.",
      career: "Calmly de-escalating workplace friction, ethical leadership, and enduring complex negotiations.",
      finance: "Long-term financial resilience; holding steady during market volatility with calm confidence.",
      spiritual: "Sublimating animalistic desires into spiritual luminescence (Kundalini awakening).",
      affirmation: "My true power resides in gentle patience, love, and unshakable inner calm.",
      reflectiveQuestion: "How can I respond to current friction with supreme gentleness rather than brute force?"
    },
    9: {
      element: "Earth",
      astrology: "Virgo",
      archetype: "The Sage of the Lantern",
      yesNo: "Maybe",
      timing: "Virgo Season / Winter solstice / During quiet retreat",
      advice: "Withdraw from outer noise, seek solitude, and illuminate your own internal lantern.",
      warning: "Avoid prolonged antisocial isolation or becoming cynical toward the world.",
      shadow: "Loneliness, emotional withdrawal, dogmatic detachment, or hiding from life's duties.",
      keywords: ["Soul Searching", "Solitude", "Inner Guidance", "Wisdom", "Introspection"],
      love: "Taking conscious space to understand your relational needs before engaging deeply.",
      career: "Independent research, solo master projects, auditing operations, and private strategic planning.",
      finance: "Frugality, simplifying material needs, and prudent independent financial auditing.",
      spiritual: "Tapasya (sacred austerities), meditation in solitude, and discovering the inner Satguru.",
      affirmation: "In the quiet sanctum of my soul, divine truth shines brightly to guide my path.",
      reflectiveQuestion: "What wisdom emerges when I silence the external chatter and sit in stillness?"
    },
    10: {
      element: "Fire",
      astrology: "Jupiter",
      archetype: "The Wheel of Cosmic Karma",
      yesNo: "Yes",
      timing: "Turning point / Karmic cycle / 10-day or 10-month window",
      advice: "Adapt to changing tides with equanimity; prepare to seize the upswing of fortune.",
      warning: "Do not resist inevitable cosmic shifts; what goes down will surely rise again.",
      shadow: "Feeling victimized by bad luck, clinging to outdated cycles, or gambling recklessly.",
      keywords: ["Good Fortune", "Karma", "Destiny", "Life Cycles", "Turning Point"],
      love: "Karmic encounters, serendipitous meetings, and positive breakthroughs in love.",
      career: "Sudden positive career breakthrough, serendipitous promotions, and favorable market winds.",
      finance: "Sudden windfalls, favorable investment cycles, and profitable cosmic timing.",
      spiritual: "Understanding Samsara (the wheel of existence) and maintaining center amid outer change.",
      affirmation: "I welcome cosmic destiny and gracefully flow with the turning tides of fortune.",
      reflectiveQuestion: "How can I best align my actions with the new cycle of opportunity opening before me?"
    },
    11: {
      element: "Air",
      astrology: "Libra",
      archetype: "The Goddess of Cosmic Truth",
      yesNo: "Conditional Yes",
      timing: "Libra Season / Upon formal legal/ethical settlement",
      advice: "Act with absolute honesty, examine all facts objectively, and accept fair accountability.",
      warning: "Avoid bias, dishonesty, and attempting to circumvent legal or ethical responsibilities.",
      shadow: "Injustice, vindictiveness, legal battles, corruption, or refusing to take accountability.",
      keywords: ["Justice", "Karma", "Truth", "Fairness", "Cause and Effect"],
      love: "Honest, equal, transparent communication; contracts and marriage agreements.",
      career: "Fair legal rulings, contract signing, ethical corporate governance, and balanced partnerships.",
      finance: "Balanced ledgers, fair settlement of debts, transparency in taxation and accounts.",
      spiritual: "The inviolable law of Karma (Nyaya): every thought and deed generates its exact balance.",
      affirmation: "I speak the truth, act with fairness, and trust in the absolute justice of the cosmos.",
      reflectiveQuestion: "Am I being completely truthful and fair with myself and everyone involved?"
    },
    12: {
      element: "Water",
      astrology: "Neptune",
      archetype: "The Enlightened Surrender",
      yesNo: "Maybe",
      timing: "Suspended time / Days of intentional waiting / Reversal of perspective",
      advice: "Pause forward striving, surrender control, and view the world from an inverted perspective.",
      warning: "Do not play the helpless martyr or delay necessary actions out of sheer indecisiveness.",
      shadow: "Senseless sacrifice, victim complex, stagnation, or refusing to let go of old attachments.",
      keywords: ["Surrender", "New Perspective", "Letting Go", "Pause", "Spiritual Sacrifice"],
      love: "Pausing demands, releasing expectations of partner change, and gaining spiritual empathy.",
      career: "A temporary plateau that provides essential time for visionary restructuring.",
      finance: "Holding assets steady; not a time for aggressive spending but for rethinking wealth priorities.",
      spiritual: "Samadhi through conscious surrender; releasing the ego's illusion of controlling outcomes.",
      affirmation: "I release the need to control, opening my mind to profound new perspectives.",
      reflectiveQuestion: "What must I willingly surrender to gain the higher perspective I need?"
    },
    13: {
      element: "Water",
      astrology: "Scorpio",
      archetype: "The Great Transformer",
      yesNo: "Yes",
      timing: "Scorpio Season / Complete end of an era / Autumn shedding",
      advice: "Release the obsolete gracefully to clear fertile ground for a glorious rebirth.",
      warning: "Do not cling desperately to rotting relationships, jobs, or outdated habits.",
      shadow: "Paralyzing fear of change, stagnant denial, or prolonged mourning of the past.",
      keywords: ["Transformation", "Endings", "Rebirth", "Transition", "Shedding the Old"],
      love: "End of toxic dynamics, shedding outdated romantic expectations, or transformative renewals.",
      career: "Closing a career chapter, resigning from an unfulfilling role, or complete industry pivot.",
      finance: "Liquidating debt, restructuring assets, and ending unprofitable financial behaviors.",
      spiritual: "Moksha & Punarjanma: the cyclical death of the ego that births true spiritual enlightenment.",
      affirmation: "I courageously release the past, knowing every ending births a magnificent beginning.",
      reflectiveQuestion: "What obsolete chapter in my life is ready to be laid to rest with gratitude?"
    },
    14: {
      element: "Fire",
      astrology: "Sagittarius",
      archetype: "The Alchemical Harmonizer",
      yesNo: "Yes",
      timing: "Sagittarius Season / Gradual steady blending over weeks",
      advice: "Practice moderation, blend opposites, and find the golden middle path.",
      warning: "Avoid extreme indulgence, impatience, or volatile emotional reactions.",
      shadow: "Imbalance, excess, clashing energies, or rushing delicate processes.",
      keywords: ["Balance", "Moderation", "Patience", "Alchemy", "Divine Purpose"],
      love: "Harmonious blending of differences, tranquil communication, and deep emotional healing.",
      career: "Seamless cross-functional collaboration, balanced workloads, and diplomatic negotiation.",
      finance: "Moderate spending, balanced diversified portfolios, and sustainable financial equilibrium.",
      spiritual: "Alchemical integration of internal fires and waters; achieving Sattvic serenity.",
      affirmation: "I embody calm equilibrium, harmonizing all aspects of my life in divine balance.",
      reflectiveQuestion: "Where in my daily life can I bring greater moderation and patient balance?"
    },
    15: {
      element: "Earth",
      astrology: "Capricorn",
      archetype: "The Shadow Illusionist",
      yesNo: "No",
      timing: "Capricorn Season / Entanglement until conscious awakening occurs",
      advice: "Acknowledge toxic attachments, break free from self-imposed chains, and reclaim power.",
      warning: "Beware of addiction, codependency, greed, obsession, and manipulative entanglements.",
      shadow: "Willful enslavement to vices, fear-based control, and believing you have no choice.",
      keywords: ["Shadow Self", "Attachment", "Addiction", "Illusion", "Material Bondage"],
      love: "Obsessive infatuation, codependency, jealousy, or staying trapped in unhealthy dynamics.",
      career: "Feeling trapped in a toxic work culture or selling your soul for material prestige.",
      finance: "Debt traps, predatory loans, materialistic obsession, and reckless consumerism.",
      spiritual: "Maya (cosmic illusion) and recognizing the ego's false chains to achieve true liberation.",
      affirmation: "I dissolve all false chains and reclaim my sovereign freedom and divine truth.",
      reflectiveQuestion: "What unconscious attachment or limiting habit is holding me in bondage?"
    },
    16: {
      element: "Fire",
      astrology: "Mars",
      archetype: "The Lightning Bolt of Truth",
      yesNo: "No",
      timing: "Sudden / Instantaneous / Unexpected cosmic shock",
      advice: "Allow false structures to collapse; rebuild on the unshakeable foundation of truth.",
      warning: "Do not attempt to prop up a lie or resist the purifying cosmic lightning.",
      shadow: "Complete catastrophe caused by hubris, denial of warning signs, or lingering chaos.",
      keywords: ["Sudden Change", "Upheaval", "Revelation", "Awakening", "Breaking Illusions"],
      love: "Sudden breakup, shocking revelation of truth, or explosive liberation from false peace.",
      career: "Sudden reorganization, company restructuring, or project collapse that redirects your path.",
      finance: "Unexpected financial shock or emergency expenses; clear fragile speculative positions.",
      spiritual: "The lightning strike of Shiva destroying egoic arrogance to awaken ultimate reality.",
      affirmation: "As false structures fall away, I rise stronger and grounded in eternal truth.",
      reflectiveQuestion: "What crumbling illusion am I finally ready to let fall so truth can stand?"
    },
    17: {
      element: "Air",
      astrology: "Aquarius",
      archetype: "The Celestial Beacon of Hope",
      yesNo: "Yes",
      timing: "Aquarius Season / Starry nights / In the calm after the storm",
      advice: "Have faith in the cosmic design; your future is blessed with hope, healing, and inspiration.",
      warning: "Do not fall into passive daydreaming without taking grounded action steps.",
      shadow: "Despair, feeling abandoned by the universe, loss of faith, or unrealistic idealism.",
      keywords: ["Hope", "Faith", "Inspiration", "Healing", "Divine Guidance"],
      love: "Pure emotional healing, renewed faith in romance, and genuine heartfelt vulnerability.",
      career: "Inspiring creative projects, humanitarian work, public recognition, and visionary success.",
      finance: "Positive financial recovery, peaceful stability, and promising long-term prospects.",
      spiritual: "Pouring the waters of cosmic consciousness directly into the physical and astral worlds.",
      affirmation: "Hope and divine grace guide my steps; my soul shines with radiant light.",
      reflectiveQuestion: "What inspiring vision for my future fills me with pure hope and creative joy?"
    },
    18: {
      element: "Water",
      astrology: "Pisces",
      archetype: "The Realm of Dreams & Shadows",
      yesNo: "Maybe",
      timing: "Full / New Moon / During subconscious processing",
      advice: "Navigate illusions with care; trust your dreams but verify physical facts before acting.",
      warning: "Avoid paranoia, deceit, self-delusion, and projecting unhealed fears onto others.",
      shadow: "Deep fear, phobias, deceptive individuals, or losing touch with grounded reality.",
      keywords: ["Illusion", "Subconscious", "Intuition", "Shadow Work", "Uncertainty"],
      love: "Romantic illusions, unexpressed fears, hidden truths, or intense emotional projections.",
      career: "Unclear corporate direction, hidden office politics, and deceptive offers; verify all details.",
      finance: "Uncertain financial terrain; avoid speculative investments and beware of concealed fees.",
      spiritual: "Entering the astral realm, deciphering dream symbolism, and integrating the shadow self.",
      affirmation: "I walk fearlessly through the mist, illuminating illusions with the light of truth.",
      reflectiveQuestion: "What hidden fear or emotional projection is distorting my clarity?"
    },
    19: {
      element: "Fire",
      astrology: "Sun",
      archetype: "The Radiant Source of Life",
      yesNo: "Yes",
      timing: "Midday / Summer Solstice / Immediate radiance",
      advice: "Radiate joy, celebrate your accomplishments, and share your warmth openly with all.",
      warning: "Do not succumb to blinding arrogance or burn out from excessive extroversion.",
      shadow: "Egoism, superficial optimism, sunburn of pride, or temporary depression.",
      keywords: ["Joy", "Vitality", "Success", "Warmth", "Enlightenment"],
      love: "Blissful romantic fulfillment, transparent honesty, playful affection, and marital joy.",
      career: "Stunning public victory, glowing accolades, creative mastery, and leadership spotlight.",
      finance: "Flourishing abundance, lucrative profitability, and absolute financial clarity.",
      spiritual: "Surya Deva radiance: direct communion with the source of life, truth, and enlightenment.",
      affirmation: "I radiate warmth, joy, and success; my path is illuminated by divine light.",
      reflectiveQuestion: "How can I more boldly share my authentic light and joy with the world today?"
    },
    20: {
      element: "Fire",
      astrology: "Pluto",
      archetype: "The Cosmic Awakening",
      yesNo: "Yes",
      timing: "Decisive hour / Final reckoning / Major life crossroads",
      advice: "Answer your higher calling, release past guilt, and step into spiritual rebirth.",
      warning: "Do not judge yourself or others harshly; avoid ignoring the cosmic trumpet call.",
      shadow: "Self-doubt, clinging to past regrets, fear of reckoning, or spiritual stagnation.",
      keywords: ["Rebirth", "Higher Calling", "Absolution", "Judgment", "Spiritual Awakening"],
      love: "Forgiveness of past wounds, deep reconciliation, and committing to a higher shared purpose.",
      career: "Discovering your true vocational calling, major career elevation, and ethical legacy.",
      finance: "Final resolution of longstanding debts, legal clarity, and conscious wealth allocation.",
      spiritual: "Hearing the divine conch (Shankha) call; absolute liberation from past karmic debt.",
      affirmation: "I heed my highest calling with courage, forgiven and renewed in divine grace.",
      reflectiveQuestion: "What higher calling is stirring within my soul that I am now ready to answer?"
    },
    21: {
      element: "Earth",
      astrology: "Saturn",
      archetype: "The Master of Wholeness",
      yesNo: "Yes",
      timing: "Completion of a cycle / 12-month or lifetime milestone",
      advice: "Celebrate completion of your cycle, integrate lessons, and prepare for the next cosmic octave.",
      warning: "Do not leave essential tasks unfinished as you transition to the next level.",
      shadow: "Incomplete closure, fear of graduation, stagnation right before the finish line.",
      keywords: ["Completion", "Wholeness", "Integration", "Global Reach", "Triumph"],
      love: "Complete emotional fulfillment, global connections, and long-lasting sacred matrimony.",
      career: "International acclaim, successful project conclusion, peak mastery, and limitless expansion.",
      finance: "Financial independence, complete wealth security, and global diversification.",
      spiritual: "Cosmic consciousness (Brahman realization); dancing in ecstatic harmony with all existence.",
      affirmation: "I celebrate my completed journey, whole and aligned with the universal flow.",
      reflectiveQuestion: "What monumental cycle have I completed, and what wisdom am I ready to celebrate?"
    }
  };

  const meta = majorMeta[c.cardNumber] || {
    element: "Spirit",
    astrology: "Cosmic",
    archetype: "Universal Archetype",
    yesNo: "Yes",
    timing: "Divine Timing",
    advice: "Follow inner truth.",
    warning: "Stay balanced.",
    shadow: "Unintegrated aspects.",
    keywords: ["Mystery", "Wisdom", "Archetype"],
    love: "Deep romantic awareness.",
    career: "Meaningful professional strides.",
    finance: "Stable and mindful resource allocation.",
    spiritual: "Soul connection.",
    affirmation: "I align with divine truth.",
    reflectiveQuestion: "How does this archetype reflect in my life?"
  };

  return {
    id: cardId,
    cardNumber: c.cardNumber,
    romanNumeral: c.romanNumeral,
    name: c.title.replace(/^\d+\s*-\s*|^[IVXLCDM]+\s*-\s*/, ""),
    sanskritTitle: c.sanskritTitle,
    arcana: "Major",
    suit: "Major",
    rank: c.romanNumeral,
    element: meta.element,
    astrologyAssociation: meta.astrology,
    numerology: c.cardNumber,
    keywords: meta.keywords,
    archetype: meta.archetype,
    symbolism: c.description,
    visualDescription: c.description,
    uprightMeaning: {
      general: c.subtitle + ". " + c.description,
      love: meta.love,
      career: meta.career,
      finance: meta.finance,
      spiritual: meta.spiritual,
      personalGrowth: meta.advice,
      decision: meta.yesNo === "Yes" ? "Clear positive momentum; proceed with confidence." : "Requires careful reflection."
    },
    reversedMeaning: {
      general: "Blockage of " + c.subtitle.toLowerCase() + ". " + meta.shadow,
      love: "Miscommunication, emotional blockages, or hesitation in vulnerability.",
      career: "Delays, lack of direction, or feeling stifled in creative expression.",
      finance: "Temporary turbulence or holding back due to fear of scarcity.",
      spiritual: "Need for grounded self-care before re-engaging deep mystic practices.",
      personalGrowth: meta.warning,
      decision: "Pause and re-examine motives before taking irreversible steps."
    },
    yesNo: meta.yesNo,
    timing: meta.timing,
    advice: meta.advice,
    warning: meta.warning,
    shadowMeaning: meta.shadow,
    opportunity: "A powerful opportunity to integrate " + meta.keywords.slice(0, 2).join(" and ") + ".",
    challenge: "Overcoming " + meta.shadow.toLowerCase() + ".",
    affirmation: meta.affirmation,
    reflectiveQuestion: meta.reflectiveQuestion,
    imageUrl: c.imageUrl,
    cardBackUrl: TAROT_CARD_BACK_URL,
    oracleLenses: TAROT_ORACLE_CARDS_MAP[cardId]?.lenses,
    oracleAffirmation: TAROT_ORACLE_CARDS_MAP[cardId]?.affirmation
  };
});

// Helper for Minor Arcana items
const enrichMinorCard = (
  raw: { id: string; cardName: string; suit: string; title: string; sanskritTitle: string; subtitle: string; element: string; description: string; imageUrl: string },
  suit: "Wands" | "Cups" | "Swords" | "Pentacles",
  elem: "Fire" | "Water" | "Air" | "Earth",
  rankStr: string,
  numVal: number
): TarotCardData => {
  const isCourt = ["Page", "Knight", "Queen", "King"].includes(rankStr);
  const yesNoMap: Record<string, "Yes" | "No" | "Maybe"> = {
    Ace: "Yes",
    "Two": "Yes",
    "Three": "Yes",
    "Four": suit === "Swords" || suit === "Cups" ? "Maybe" : "Yes",
    "Five": "No",
    "Six": "Yes",
    "Seven": suit === "Swords" || suit === "Cups" ? "No" : "Maybe",
    "Eight": "Yes",
    "Nine": suit === "Swords" ? "No" : "Yes",
    "Ten": suit === "Swords" ? "No" : "Yes",
    Page: "Yes",
    Knight: "Yes",
    Queen: "Yes",
    King: "Yes"
  };

  const yesNo = yesNoMap[rankStr] || "Yes";
  const oracleEntry = TAROT_ORACLE_CARDS_MAP[raw.id];

  return {
    id: raw.id,
    cardNumber: numVal,
    name: raw.cardName,
    sanskritTitle: raw.sanskritTitle,
    arcana: "Minor",
    suit: suit,
    rank: rankStr,
    element: elem,
    astrologyAssociation: raw.element,
    numerology: numVal,
    keywords: raw.subtitle.split(",").map((k) => k.trim()),
    archetype: `${rankStr} of ${suit}`,
    symbolism: raw.description,
    visualDescription: raw.description,
    uprightMeaning: {
      general: `${raw.subtitle}. ${raw.description}`,
      love: `In love, ${raw.cardName} indicates ${raw.subtitle.toLowerCase()} and emotional evolution.`,
      career: `Professionally, this card highlights ${raw.subtitle.toLowerCase()} and strategic execution.`,
      finance: `Financially, aligns with ${raw.subtitle.toLowerCase()} and disciplined resource mastery.`,
      spiritual: `Spiritually reflects ${raw.sanskritTitle} and elemental harmony.`
    },
    reversedMeaning: {
      general: `Reversed, suggests resistance, imbalance, or delay regarding ${raw.subtitle.toLowerCase()}.`,
      love: `Temporary relational strain, misaligned priorities, or withholding vulnerability.`,
      career: `Impatience, burnout, or lack of structured execution at work.`,
      finance: `Need for conservative budgeting and avoiding impulsive speculation.`,
      spiritual: `Call to ground your energy and reconnect with inner stillness.`
    },
    yesNo: yesNo,
    timing: `${suit === "Wands" ? "Fast (Days/Weeks)" : suit === "Cups" ? "Flowing (Weeks/Lunar Cycles)" : suit === "Swords" ? "Rapid (Days)" : "Steady (Months/Seasons)"}`,
    advice: `Channel the pure essence of ${raw.cardName}: ${raw.subtitle}.`,
    warning: `Do not let ${raw.subtitle.toLowerCase()} spiral into rigidity or impulsiveness.`,
    shadowMeaning: `Shadow of ${raw.cardName}: blocked expression of ${elem} energy.`,
    opportunity: `Seize the momentum of ${raw.subtitle.split(",")[0] || raw.cardName}.`,
    challenge: `Mastering the balance of ${elem} energy within your daily actions.`,
    affirmation: oracleEntry?.affirmation || `I embody the wisdom, balance, and power of the ${raw.cardName}.`,
    reflectiveQuestion: `How can I channel the highest potential of ${raw.cardName} in my current situation?`,
    imageUrl: raw.imageUrl,
    cardBackUrl: TAROT_CARD_BACK_URL,
    oracleLenses: oracleEntry?.lenses,
    oracleAffirmation: oracleEntry?.affirmation
  };
};

const ranks = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Page", "Knight", "Queen", "King"];

const enrichedWands: TarotCardData[] = TAROT_WANDS_SUIT.map((c, i) =>
  enrichMinorCard(c, "Wands", "Fire", ranks[i] || "Card", i + 1)
);

const enrichedCups: TarotCardData[] = TAROT_CUPS_SUIT.map((c, i) =>
  enrichMinorCard(c, "Cups", "Water", ranks[i] || "Card", i + 1)
);

const enrichedSwords: TarotCardData[] = TAROT_SWORDS_SUIT.map((c, i) =>
  enrichMinorCard(c, "Swords", "Air", ranks[i] || "Card", i + 1)
);

const enrichedPentacles: TarotCardData[] = TAROT_PENTACLES_SUIT.map((c, i) =>
  enrichMinorCard(c, "Pentacles", "Earth", ranks[i] || "Card", i + 1)
);

// Unified 78-Card Master Deck
export const MASTER_TAROT_DECK_78: TarotCardData[] = [
  ...enrichedMajorArcana,
  ...enrichedWands,
  ...enrichedCups,
  ...enrichedSwords,
  ...enrichedPentacles
];

export const getCardById = (id: string): TarotCardData | undefined => {
  return MASTER_TAROT_DECK_78.find((c) => c.id === id);
};

export const getCardsBySuit = (suit: string): TarotCardData[] => {
  if (suit === "Major") return MASTER_TAROT_DECK_78.filter((c) => c.arcana === "Major");
  return MASTER_TAROT_DECK_78.filter((c) => c.suit === suit);
};
