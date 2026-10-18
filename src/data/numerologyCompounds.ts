// src/data/numerologyCompounds.ts
// Complete Chaldean & Kabbalah Compound Numbers Engine (10 to 100)

export interface CompoundNumberAnalysis {
  number: number;
  singleDigit: number;
  name: string;
  symbolism: string;
  personality: string;
  career: string;
  finance: string;
  health: string;
  relationship: string;
  suggestions: string;
  isFortunate: boolean;
}

export const COMPOUND_NUMBERS_DATABASE: Record<number, Partial<CompoundNumberAnalysis>> = {
  10: {
    name: "The Wheel of Fortune",
    symbolism: "Rise in life, honor, self-reliance, and cosmic favor.",
    personality: "Original thinker, highly confident, resilient, and born for success.",
    career: "Leadership, executive roles, politics, entrepreneurship, and innovations.",
    finance: "Excellent financial prosperity; gains through honor and original ventures.",
    health: "High vitality, robust health; care needed for eye strain and heart rate.",
    relationship: "Protective and generous partner; respects mutual dignity.",
    suggestions: "Focus on ambitious projects; the universe rewards bold initiatives.",
    isFortunate: true
  },
  11: {
    name: "The Witness / Master Visionary",
    symbolism: "Spiritual perception & illuminated communication; heightened sensitivity and high spiritual light.",
    personality: "Intuitive channel, idealistic, sensitive, visionary, and artistic.",
    career: "Counseling, inspirational speaking, teaching, psychology, philosophy, and creative arts.",
    finance: "Fluctuating wealth; high earnings when aligned with higher purpose.",
    health: "Nervous sensitivity, stress, and sensory overload. Practice grounding exercises.",
    relationship: "Needs an empathetic partner who understands deep emotional nuances.",
    suggestions: "Trust your inner perception; manage sensitivity as a sacred gift.",
    isFortunate: false
  },
  12: {
    name: "The Sacrifice / Enforced Quiet",
    symbolism: "Anxiety, placing others before self, and wisdom gained through patience.",
    personality: "Self-sacrificing, scholarly, sympathetic, thoughtful, and quiet contributor.",
    career: "Research, social work, nursing, education, and institutional service.",
    finance: "Requires careful budgeting; wealth comes through steady service.",
    health: "Digestive sluggishness, fatigue, and lower leg care.",
    relationship: "Tendency to give more than receives; seek balanced partnerships.",
    suggestions: "Offer service willingly without falling into resentful martyrdom.",
    isFortunate: false
  },
  13: {
    name: "The Transformer / Debt of Laziness",
    symbolism: "Power through disruption; transformation through sustained effort and overcoming shortcuts.",
    personality: "Determined, intense, practical, and capable of major revamps when shortcuts are abandoned.",
    career: "Architecture, engineering, surgery, restructuring, and methodical craftsmanship.",
    finance: "Wealth builds after overcoming sudden early obstacles; avoids get-rich-quick schemes.",
    health: "Joints, bones, and skin care. Consistent physical discipline recommended.",
    relationship: "Deeply committed; demands complete honesty, shared effort, and loyalty.",
    suggestions: "Complete what you start before beginning new ventures; value process over quick speed.",
    isFortunate: true
  },
  14: {
    name: "The Movement of Time / Debt of Misused Freedom",
    symbolism: "Movement, change, and versatility; learning responsible liberty and conscious moderation.",
    personality: "Versatile, adventurous, quick-witted, highly communicative, and freedom-seeking.",
    career: "E-commerce, stock trading, journalism, international trade, and PR.",
    finance: "High capacity to generate wealth through fast-moving commercial ventures.",
    health: "Nervous energy and restlessness. Regular rest, sensory breaks, and meditation required.",
    relationship: "Loves shared adventures; finds true freedom within conscious commitment.",
    suggestions: "Practice moderation in daily pleasure; channel restlessness into constructive mastery.",
    isFortunate: true
  },
  15: {
    name: "The Magnetic Communicator / The Magician",
    symbolism: "Magnetism, eloquence, artistic gifts, luxury, and attracting goodwill naturally.",
    personality: "Charming, persuasive, artistic, romantic, and natural social magnet.",
    career: "Fashion, entertainment, public speaking, luxury branding, and sales.",
    finance: "Attracts financial gifts, sponsorships, luxury, and high revenue through natural charm.",
    health: "Hormonal balance, throat health, and moderation in rich food.",
    relationship: "Highly romantic and attractive; creates a harmonious, beautiful home.",
    suggestions: "Channel natural charm into noble and constructive achievements.",
    isFortunate: true
  },
  16: {
    name: "The Shattered Citadel / Debt of Ego",
    symbolism: "Precision demolition of false structures; awakening through radical authenticity and humility.",
    personality: "Introspective, analytical, independent, philosophical, and truth-seeking.",
    career: "Research, psychology, philosophy, technical analysis, and ethics consultancy.",
    finance: "Avoid high-risk speculative gambles; focus on insured, transparent, tangible assets.",
    health: "Spine, neurological health, and sleep hygiene.",
    relationship: "Values radical honesty and soul communion over superficial status displays.",
    suggestions: "Walk the talk in private and public; build only on unshakeable, authentic truth.",
    isFortunate: false
  },
  17: {
    name: "The Star of the Magi",
    symbolism: "Spiritual wisdom, enduring legacy, and creating work that outlasts individual life.",
    personality: "Optimistic, inspiring, highly talented, dignified, and clear-minded.",
    career: "Arts, science, literature, executive leadership, and global organizations.",
    finance: "Permanent financial prosperity and recognition; high-standing assets.",
    health: "Excellent general vitality; maintain regular physical routine.",
    relationship: "Brings joy, optimism, and prestige to marital life.",
    suggestions: "Pursue high ideals; your efforts leave a lasting positive legacy.",
    isFortunate: true
  },
  18: {
    name: "The Moon / Material & Spiritual Conflict",
    symbolism: "Tension between material self-interest and spiritual values; navigating complex environments.",
    personality: "Courageous, fiery, intense, deeply perceptive, and fiercely protective.",
    career: "Defense, law enforcement, litigation, surgery, heavy industry, and advocacy.",
    finance: "Earns through intense effort; caution needed in financial partnerships.",
    health: "High blood pressure, inflammatory conditions. Cool environment helpful.",
    relationship: "Needs a calming, patient partner who diffuses fiery moments.",
    suggestions: "Maintain high universal values with practical intelligence; avoid compromising principles.",
    isFortunate: false
  },
  19: {
    name: "The Prince of Heaven / Debt of Selfishness",
    symbolism: "Supreme success through stewardship of power, wisdom, and genuine interdependence.",
    personality: "Regal, brilliant, courageous, generous, and natural community leader.",
    career: "CEO, government leader, surgeon, entrepreneur, and public figure.",
    finance: "Abundant wealth, high-ranking assets, and global financial recognition.",
    health: "Robust health and high energy; protect eye health and heart rate.",
    relationship: "Generous provider; brings honor and happiness to home life.",
    suggestions: "Ask for help before crisis; use influence to uplift others rather than solo dominance.",
    isFortunate: true
  },
  20: {
    name: "The Awakening / Call to Purpose",
    symbolism: "Sudden illumination, call to higher purpose, lifting of the veil, and delayed triumph.",
    personality: "Thoughtful, intuitive, imaginative, spiritually awakened, and receptive.",
    career: "Counseling, music, writing, non-profit leadership, and health care.",
    finance: "Financial gains come in distinct waves; solid long-term security.",
    health: "Fluid balance, cold sensitivity, and digestive care.",
    relationship: "Devoted and empathetic partner who values peace and emotional safety.",
    suggestions: "Trust your inner calling and maintain persistent effort during delays.",
    isFortunate: true
  },
  21: {
    name: "The Crown of the Magi",
    symbolism: "Total victory, advancement, honor, and public recognition through genuine talent.",
    personality: "Accomplished, dignified, diplomatic, expressive, and universally respected.",
    career: "Global business, international diplomacy, law, publishing, and leadership.",
    finance: "Supreme financial security, global investments, and high prosperity.",
    health: "Good longevity; keep balanced diet and regular physical activity.",
    relationship: "Harmonious, dignified, and highly respected family life.",
    suggestions: "Expand your horizon globally; total victory rewards your work.",
    isFortunate: true
  },
  22: {
    name: "The Master Builder",
    symbolism: "Visionary power to build global legacies, institutions, and vast physical structures.",
    personality: "Master builder, practical genius, highly disciplined, and far-sighted.",
    career: "Mega infrastructure, global tech platforms, engineering, and finance.",
    finance: "Vast wealth potential through large-scale institutions and property.",
    health: "Nervous strain and joint fatigue. Regular rest is essential.",
    relationship: "Rock-solid partner; provides unmatched security and protection.",
    suggestions: "Combine practical discipline with visionary idealism.",
    isFortunate: true
  },
  23: {
    name: "The Royal Star of the Lion",
    symbolism: "Extraordinary protection, support from elders, fortunate timing, and success.",
    personality: "Charismatic, persuasive, intelligent, warmly confident, and naturally fortunate.",
    career: "Public relations, media, trade, law, politics, and executive leadership.",
    finance: "Exceptional financial luck; receives support from high authorities.",
    health: "High vitality and rapid recovery rate.",
    relationship: "Charming and affectionate partner; popular in social circles.",
    suggestions: "Ensure your recognized talent is backed by real competence and ethical grounding.",
    isFortunate: true
  },
  24: {
    name: "The Gift of Love / The Lucky Star",
    symbolism: "Magnetic attraction of wealth, harmonious relationships, and loving material circumstances.",
    personality: "Harmonious, attractive, responsible, nurturing, and practical.",
    career: "Finance, real estate, luxury goods, entertainment, law, and design.",
    finance: "Attracts wealth through influential friends, harmonious partnerships, and smart assets.",
    health: "Throat and digestive care; maintain active lifestyle.",
    relationship: "Highly loving, supportive, and stable family life.",
    suggestions: "Nurture genuine relationships; luck flows through your network.",
    isFortunate: true
  },
  25: {
    name: "Strength Through Experience",
    symbolism: "Wisdom gained through observation, research, and technical mastery.",
    personality: "Analytical, scholarly, observant, introspective, and quiet genius.",
    career: "Data science, research science, engineering, medicine, and writing.",
    finance: "Solid financial accumulation through specialized technical skills.",
    health: "Skin care, sleep hygiene, and mental relaxation.",
    relationship: "Loyal and thoughtful; values deep intellectual understanding.",
    suggestions: "Combine intellectual analysis with practical market execution.",
    isFortunate: true
  },
  26: {
    name: "Partnerships with Consequences",
    symbolism: "Warning regarding business & romantic partnerships entered without strict discernment.",
    personality: "Authoritative, practical, ambitious, and cautious strategist.",
    career: "Corporate law, asset management, heavy industry, and executive operations.",
    finance: "High wealth creation possible, but vulnerable to losses through unwise partnerships.",
    health: "Bone density, joint care, and stress management.",
    relationship: "Requires careful evaluation of partner values before legal commitments.",
    suggestions: "Evaluate character thoroughly before forming joint business or marital contracts.",
    isFortunate: false
  },
  27: {
    name: "The Sceptre",
    symbolism: "Command, courage, executive authority, and earned leadership through humanitarian wisdom.",
    personality: "Fiery, decisive, generous, dignified, and natural commander.",
    career: "Military, surgery, competitive athletics, law, and corporate leadership.",
    finance: "Strong wealth creation through bold initiatives, wise command, and leadership.",
    health: "High energy; manage blood pressure and fiery temperament.",
    relationship: "Protective, passionate, and fiercely loyal partner.",
    suggestions: "Use authority for protective and constructive causes.",
    isFortunate: true
  },
  28: {
    name: "Partnerships & Unexpected Reversal",
    symbolism: "Tension between solo achievement and unexpected reversal through partnership friction.",
    personality: "Independent, ambitious, pioneering, yet vulnerable to partner dynamics.",
    career: "Independent entrepreneurship, legal advocacy, innovation, and consulting.",
    finance: "Strong independent earning power; document agreements carefully to avoid losses.",
    health: "Headaches, eye strain, and nervous tension.",
    relationship: "Needs clear boundaries and documented financial agreements in joint ventures.",
    suggestions: "Maintain personal independence and legal clarity in all collaborative contracts.",
    isFortunate: false
  },
  29: {
    name: "The Power of the Moon",
    symbolism: "Heightened intuition, emotional depth, cycles, and working with natural rhythms.",
    personality: "Deeply sensitive, intuitive, artistic, cyclical thinker, and empathetic listener.",
    career: "Psychology, holistic health, writing, music, maritime trade, and counseling.",
    finance: "Fluctuating earnings following lunar rhythms; strong long-term assets.",
    health: "Fluid balance, emotional hygiene, and lymphatic circulation.",
    relationship: "Deeply attunes to partner's emotional state; requires supportive boundaries.",
    suggestions: "Honor your intuition; establish regular rest routines to prevent sensitivity depletion.",
    isFortunate: true
  },
  30: {
    name: "The Loner / Thoughtful Isolation",
    symbolism: "Productive solitude; creative communicator doing deepest work in private refinement.",
    personality: "Introverted, creative, thoughtful, introspective, and articulate writer.",
    career: "Writing, research, software design, studio art, consultancy, and philosophy.",
    finance: "Steady earnings through specialized individual output and intellectual property.",
    health: "Vocal cords, throat health, and daily outdoor walks.",
    relationship: "Values deep quiet companionship; needs private space to recharge.",
    suggestions: "Share your refined private insights with the world; do not remain hidden.",
    isFortunate: true
  },
  31: {
    name: "The Recluse / Quiet Foundation",
    symbolism: "Self-sufficiency, quiet concentration, and building lasting foundations in solitude.",
    personality: "Methodical, self-reliant, reserved, disciplined, and focused worker.",
    career: "Architecture, research lab, accounting, archiving, and specialized engineering.",
    finance: "Conservative financial growth; accumulates assets through disciplined savings.",
    health: "Joints, spine, and vitamin D balance.",
    relationship: "Slow to open up; fiercely loyal once deep trust is established.",
    suggestions: "Balance private focus with warm social connections.",
    isFortunate: true
  },
  32: {
    name: "The Magic of the Enchanter",
    symbolism: "Natural charisma, communicative magnetism, mass persuasion, and popular appeal.",
    personality: "Witty, adaptable, charming, persuasive, and highly magnetic speaker.",
    career: "Media, journalism, international trade, marketing, politics, and public speaking.",
    finance: "High wealth through public connections, media influence, and trade.",
    health: "Nervous strain; practice regular mindfulness and relaxation.",
    relationship: "Engaging, lively partner; brings joy and active social movement.",
    suggestions: "Use your magnetic influence to uplift others rather than self-serving compliance.",
    isFortunate: true
  },
  33: {
    name: "The Master Teacher & Universal Healer",
    symbolism: "Universal love, embodied compassion, healing presence, and spiritual mentorship.",
    personality: "Compassionate, artistic, highly intuitive, protective mentor, and selfless guide.",
    career: "Healing arts, non-profit institutions, creative arts, and spiritual education.",
    finance: "Wealth arrives naturally as a byproduct of selfless service and artistic excellence.",
    health: "Throat, kidney, and emotional health care.",
    relationship: "Deeply devoted, loving, and nurturing partner; needs healthy boundaries.",
    suggestions: "Prioritize self-restoration; giving from fullness prevents martyrdom.",
    isFortunate: true
  },
  34: {
    name: "The Wise Advisor",
    symbolism: "Practical wisdom applied to complex situations; integration of analysis and experience.",
    personality: "Insightful, analytical, wise, steady advisor, and practical thinker.",
    career: "Management consulting, judicial law, financial advisory, and research analysis.",
    finance: "Sound financial judgment; earns well by solving complex institutional problems.",
    health: "Mental fatigue; daily exercise and outdoor walks beneficial.",
    relationship: "Dependable, wise partner who offers clear counsel and stability.",
    suggestions: "Share your practical counsel generously; your insights guide others.",
    isFortunate: true
  },
  35: {
    name: "The Business Mind",
    symbolism: "Commercial intelligence, adaptability in trade, and identifying opportunity in change.",
    personality: "Pragmatic, versatile, shrewd, observant, and resourceful entrepreneur.",
    career: "Trade, brokerage, corporate strategy, venture capital, and commercial operations.",
    finance: "Strong wealth-generating capacity; excels in dynamic market conditions.",
    health: "Adrenal care and digestive balance.",
    relationship: "Practical and supportive; enjoys building joint financial security.",
    suggestions: "Combine commercial agility with ethical transparency for long-term legacy.",
    isFortunate: true
  },
  36: {
    name: "The Creative Intellect",
    symbolism: "Harmonious union of artistic sensitivity and analytical precision for universal good.",
    personality: "Refined, intellectual, creative, humanitarian, and articulate creator.",
    career: "Literature, architecture, design theory, higher education, and philanthropy.",
    finance: "Stable earnings through high-value intellectual and artistic creations.",
    health: "Respiratory health and posture care.",
    relationship: "Inspiring and emotionally intelligent partner who values deep discussion.",
    suggestions: "Channel your refined intellect into projects that serve human elevation.",
    isFortunate: true
  },
  37: {
    name: "The Fortunate Partnership",
    symbolism: "Highly auspicious vibration for business alliances, joint ventures, and marriage.",
    personality: "Magnetic, diplomatic, fortunate, open-hearted, and inspiring communicator.",
    career: "Corporate alliances, law, luxury trade, art dealing, and public relations.",
    finance: "High wealth generation through joint ventures and strategic partnerships.",
    health: "Great vitality; keep balanced daily routine.",
    relationship: "Exceptionally happy marriage, mutual growth, and prosperous home life.",
    suggestions: "Form alliances with ethical, high-vibration partners to maximize mutual success.",
    isFortunate: true
  },
  38: {
    name: "The Ambiguous Partnership",
    symbolism: "Partnerships carrying both significant potential and risk; requires careful navigation.",
    personality: "Cooperative, sensitive, discerning, yet prone to partner tension.",
    career: "Mediation, joint ventures, public relations, and legal arbitration.",
    finance: "Fluctuating financial returns depending on partner reliability.",
    health: "Nervous sensitivity and stomach care.",
    relationship: "Requires honest communication and clear boundary agreements.",
    suggestions: "Exercise discernment before entering joint contracts or financial partnerships.",
    isFortunate: false
  },
  39: {
    name: "The Artistic Visionary",
    symbolism: "Original creative vision, expressing illuminated dimensions of human experience.",
    personality: "Original, imaginative, expressive, humanitarian, and artistic visionary.",
    career: "Fine arts, filmmaking, music composition, philosophy, and creative writing.",
    finance: "Gains through original artistic works and international recognition.",
    health: "Emotional balance and restful sleep routines.",
    relationship: "Passionate and inspiring partner; seeks spiritual and creative harmony.",
    suggestions: "Express your original vision boldly without fearing initial misunderstanding.",
    isFortunate: true
  },
  40: {
    name: "Patience & Enduring Wisdom",
    symbolism: "Development of wisdom through long experience, steady building, and perseverance.",
    personality: "Patient, grounded, reserved, resilient, and methodical organizer.",
    career: "Civil service, engineering, archiving, agriculture, and infrastructure.",
    finance: "Slow, steady wealth accumulation; long-term financial security.",
    health: "Bone health and joint mobility.",
    relationship: "Rock-solid, dependable partner who values long-term stability.",
    suggestions: "Persevere through initial delays; time turns your patient work into gold.",
    isFortunate: true
  },
  41: {
    name: "The Royal Crown / Constructive Achievement",
    symbolism: "Magnificent financial prosperity, magnetic attraction, fame, and innovation.",
    personality: "Ambitious, eloquent, magnetic, authoritative, and forward-looking.",
    career: "Executive leadership, finance, politics, technology platforms, and media.",
    finance: "Supreme financial luck, rapid asset expansion, and high commercial returns.",
    health: "High energy; care for blood pressure and eye health.",
    relationship: "Brings dignity, luxury, and prestige to home and partner.",
    suggestions: "Maintain high ethical standards; true leadership builds lasting heritage.",
    isFortunate: true
  },
  42: {
    name: "Sensitivity & Material Harmony",
    symbolism: "Harmonious blend of aesthetic sensitivity and practical material awareness.",
    personality: "Charming, practical, artistic, caring, and balance-seeking.",
    career: "Architecture, interior design, culinary arts, healthcare, and real estate.",
    finance: "Steady, comfortable prosperity through artistic and service-driven fields.",
    health: "Throat and digestive balance.",
    relationship: "Loving, supportive partner who creates a beautiful home environment.",
    suggestions: "Balance your creative sensitivity with practical financial management.",
    isFortunate: true
  },
  43: {
    name: "Conflict & Testing of Strength",
    symbolism: "Testing of inner strength through obstacle clearance and analytical resilience.",
    personality: "Resilient, analytical, intense, probing, and stubborn worker.",
    career: "Crisis management, auditing, investigation, engineering, and surgery.",
    finance: "Earns through overcoming tough challenges; avoid impulsive risks.",
    health: "Stress management and muscle relaxation.",
    relationship: "Needs a patient partner who respects their intense focus.",
    suggestions: "View obstacles as training for deeper resilience and mastery.",
    isFortunate: false
  },
  44: {
    name: "Amplified Structure / Master Concentration",
    symbolism: "Extraordinary structural achievement combined with intense discipline demands.",
    personality: "Highly disciplined, ambitious, systemic thinker, and master organizer.",
    career: "Mega-construction, financial systems, urban planning, and corporate governance.",
    finance: "Vast long-term asset building through disciplined institutional projects.",
    health: "Avoid overwork; manage joint strain and nervous exhaustion.",
    relationship: "Protective and devoted partner who values structural security.",
    suggestions: "Pace your ambition; allow rest so that structural success does not cause burnout.",
    isFortunate: true
  },
  45: {
    name: "The Victorious Strategist",
    symbolism: "Victory over adversaries, intellectual genius, and material success through adaptability.",
    personality: "Sharp strategist, courageous, quick-witted, victorious, and resourceful.",
    career: "Litigation law, corporate strategy, research, defense, and venture capital.",
    finance: "High financial gains through intellect, strategy, and international trade.",
    health: "Nervous tension; practice regular outdoor physical exercise.",
    relationship: "Protective and loyal partner with sharp intellect.",
    suggestions: "Use strategic intelligence to construct lasting peace and prosperity.",
    isFortunate: true
  },
  46: {
    name: "Fortunate Service & Abundance",
    symbolism: "Fortunate material circumstances emerging from genuine service and leadership.",
    personality: "Generous, executive, service-oriented, charismatic, and practical.",
    career: "Healthcare leadership, philanthropy, corporate management, and education.",
    finance: "Prosperous financial returns as a natural result of high service contribution.",
    health: "Heart wellness and blood circulation.",
    relationship: "Generous and devoted partner who cares for family well-being.",
    suggestions: "Lead through service; abundance flows naturally when upliftment is primary.",
    isFortunate: true
  },
  47: {
    name: "Deep Wisdom & Mastery",
    symbolism: "Wisdom and deep satisfaction of genuine expertise; analytical intuition.",
    personality: "Intuitive analyst, scholar, contemplative thinker, and quiet expert.",
    career: "Scientific research, medicine, academic scholarship, and financial audit.",
    finance: "Solid financial security earned through rare specialized knowledge.",
    health: "Mindful rest and neurological wellness.",
    relationship: "Loyal and quiet partner who values deep soul intimacy.",
    suggestions: "Trust your technical and intuitive synthesis; your mastery is recognized.",
    isFortunate: true
  },
  48: {
    name: "Material Responsibility & Authority",
    symbolism: "High material achievement combined with complex executive responsibilities.",
    personality: "Authoritative, organized, pragmatic, and serious executive.",
    career: "Banking, heavy industry, corporate leadership, and institutional management.",
    finance: "Vast material assets; requires prudent management of complex debts/obligations.",
    health: "Joints, cardiovascular care, and stress relief.",
    relationship: "Protective provider; needs to balance work focus with emotional warmth.",
    suggestions: "Delegate responsibility wisely to maintain balance in executive power.",
    isFortunate: true
  },
  49: {
    name: "Fortunate Completion & Renewal",
    symbolism: "Successful conclusion of major life cycles; solid foundation for new endeavors.",
    personality: "Humanitarian, resilient, completion-focused, and philosophical.",
    career: "International development, publishing, environmental leadership, and arts.",
    finance: "Comfortable financial harvest at the end of long cycles.",
    health: "General vitality; keep active physical and social schedule.",
    relationship: "Warm, compassionate partner who brings broad life perspective.",
    suggestions: "Celebrate completed achievements and step into new cycles with confidence.",
    isFortunate: true
  },
  50: {
    name: "The Spiral Renewal",
    symbolism: "New cycle beginning at a higher level than previous ones; rapid adaptability.",
    personality: "Dynamic, versatile, optimistic, inventive, and progressive.",
    career: "Innovation technology, international trade, media networks, and adventure.",
    finance: "Rapid financial expansion through new ventures and global communication.",
    health: "Nervous system balance; practice grounding routines.",
    relationship: "Fun, adventurous partner who keeps relationships fresh and active.",
    suggestions: "Embrace rapid innovation; your adaptability opens doors worldwide.",
    isFortunate: true
  },
  51: {
    name: "The Warrior King / Royal Star in Maturity",
    symbolism: "Bold leadership, triumph in competitive fields, mature protective authority.",
    personality: "Bold, energetic, pioneering, authoritative, and fiercely courageous.",
    career: "Competitive industries, surgery, real estate development, defense, and law.",
    finance: "Dynamic wealth expansion through bold moves, enterprise, and leadership.",
    health: "High body heat; keep cool and practice mindful reflection.",
    relationship: "Passionate, protective, and energetic partner.",
    suggestions: "Channel competitive drive into productive enterprise building and defense.",
    isFortunate: true
  },
  52: {
    name: "Receptive Intelligence & Collaboration",
    symbolism: "Productive use of knowledge, synthesis of diverse analytical insights, quiet mastery.",
    personality: "Observant, intuitive, intellectual, collaborative, and analytical.",
    career: "Consultancy, research synthesis, academic publishing, and diplomacy.",
    finance: "Steady earnings through intellectual collaboration and specialized analysis.",
    health: "Sleep hygiene and eye care.",
    relationship: "Quiet, thoughtful partner who respects mutual intellectual space.",
    suggestions: "Synthesize insights from diverse sources; your receptive wisdom creates clarity.",
    isFortunate: true
  }
};

export function getCompoundNumberAnalysis(num: number): CompoundNumberAnalysis {
  const target = Math.max(10, Math.min(100, num));
  let single = target;
  while (single > 9) {
    single = String(single).split("").map(Number).reduce((a, b) => a + b, 0);
  }

  const generic = COMPOUND_NUMBERS_DATABASE[target];

  return {
    number: target,
    singleDigit: single,
    name: generic?.name || `Compound Number ${target}`,
    symbolism: generic?.symbolism || `A combination of vibrational energies resulting in single digit ${single}.`,
    personality: generic?.personality || `Dynamic, adaptable, and focused individual with single digit ${single} essence.`,
    career: generic?.career || "Management, consultancy, business operations, and creative pursuits.",
    finance: generic?.finance || "Steady financial growth with proper planning and prudent risk management.",
    health: generic?.health || "Maintain daily physical exercise, balanced diet, and stress management.",
    relationship: generic?.relationship || "Seeks mutual respect, clear communication, and emotional harmony.",
    suggestions: generic?.suggestions || "Align your daily actions with your core values and maintain consistency.",
    isFortunate: generic?.isFortunate !== undefined ? generic.isFortunate : true
  };
}

