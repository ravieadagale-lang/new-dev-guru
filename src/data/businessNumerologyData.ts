// src/data/businessNumerologyData.ts
// Complete Data for Business Numerology (incorporating Brand Numerology, Product Name Numerology, Pricing Numerology, SKUs, Launch Timing, and Business Audit Protocols).

export interface BrandProductReading {
  number: number;
  title: string;
  frequencyName: string;
  vibrationalEnergy: string;
  whatItCreates: string;
  bestFor: string[];
  notIdealFor: string[];
  marketPositioning: string;
  specificChallenges: string;
}

export const BRAND_AND_PRODUCT_NUMBERS: Record<number, BrandProductReading> = {
  1: {
    number: 1,
    title: "Number 1 — The Pioneer Brand & Product",
    frequencyName: "Originality, First-Mover Leadership & Independent Authority",
    vibrationalEnergy: "Independent initiative, pioneering momentum, original authority, and executive first-mover positioning.",
    whatItCreates: "A business or product whose name produces Number 1 projects the specific vibrational quality of original pioneering leadership into the marketplace. It is instinctively experienced by potential clients as the original, the first, the benchmark that went before others. Clients naturally attracted to Number 1 entities are ambitious, achievement-oriented, and seeking genuinely original, independently-authoritative capabilities.",
    bestFor: [
      "Innovative Technology & AI Solutions",
      "Entrepreneurial Coaching & Executive Mentorship",
      "Flagship Product Launches & Category Pioneers",
      "Pioneering Design Studios & Original Research",
      "High-Impact Specialty Services"
    ],
    notIdealFor: [
      "Cooperative non-profit community collectives requiring blended consensus",
      "Low-margin commodity resale operations without unique branding"
    ],
    marketPositioning: "Commands premium market recognition and first-mover authority. Positioned at the top of its niche as the original industry standard.",
    specificChallenges: "The market position is inherently competitive rather than cooperative. Maintaining first-mover authority demands continuous innovation and bold decision-making."
  },
  2: {
    number: 2,
    title: "Number 2 — The Partnership Brand & Product",
    frequencyName: "Cooperative Service, Warm Client Relationships & Deep Trust",
    vibrationalEnergy: "Cooperative warmth, relational attunement, empathetic customer care, and trust-based partnership.",
    whatItCreates: "A business or product whose name produces Number 2 projects the specific vibrational quality of genuine cooperative warmth and authentic partnership into the marketplace. Potential clients experience this entity as genuinely caring—motivated by the quality of relationship built rather than purely transactional exchange. It generates high client retention, warm word-of-mouth referrals, and deep brand trust.",
    bestFor: [
      "Healthcare, Wellness & Holistic Healing Services",
      "Marriage Counseling, Couples Therapy & Mediation",
      "Daily Personal Care Items & Gentle Subscription Supplies",
      "Hospitality, Bed & Breakfasts, and Personalized Care",
      "Cooperative Community Ventures & Social Support Services"
    ],
    notIdealFor: [
      "Aggressive short-term speculative trading operations",
      "Cold, highly competitive corporate takeover firms"
    ],
    marketPositioning: "Positioned as the trusted companion and empathetic partner. Wins long-term client loyalty through exceptional personal attentiveness and care.",
    specificChallenges: "The gentle, cooperative brand impression can sometimes overshadow expert authority in hyper-competitive bidding contexts where aggressive assertion is expected."
  },
  3: {
    number: 3,
    title: "Number 3 — The Creative Expression Brand & Product",
    frequencyName: "Creative Energy, Communicative Magnetism & Joyful Engagement",
    vibrationalEnergy: "Joyful creative expression, vibrant social appeal, communicative magnetism, and optimistic engagement.",
    whatItCreates: "A business or product whose name produces Number 3 projects creative expressiveness and communicative magnetism into the marketplace. It makes commercial interactions feel engaging, pleasurable, and genuinely human. Number 3 entities possess an extraordinary capacity for building public awareness, social media following, and organic affection that translates into committed customer loyalty.",
    bestFor: [
      "Creative Agencies, Design Studios & Media Houses",
      "Entertainment, Events, Performing Arts & Festivals",
      "Lifestyle Brands, Gourmet Food & Beverage Pleasures",
      "Public Relations, Marketing & Content Creation Platforms",
      "Children's Toys, Education & Gamified Learning"
    ],
    notIdealFor: [
      "Heavy industrial freight logistics requiring austere gravity",
      "Solemn judicial or insolvency management firms"
    ],
    marketPositioning: "Positioned as the vibrant, joyful, creative leader that brings delight, inspiration, and fresh aesthetic expression to every customer touchpoint.",
    specificChallenges: "The charming, expressive front must be matched by meticulous backend operational delivery to avoid the perception of being creative without procedural discipline."
  },
  4: {
    number: 4,
    title: "Number 4 — The Reliable Excellence Brand & Product",
    frequencyName: "Methodical Quality, Trustworthy Delivery & Structural Foundation",
    vibrationalEnergy: "Methodical precision, structural stability, unshakeable reliability, and disciplined execution.",
    whatItCreates: "A business or product whose name produces Number 4 projects reliable, methodical, consistently excellent delivery into the marketplace. This is the entity people turn to when something crucial must be executed with uncompromising precision. Number 4 builds the most durable commercial reputations available—unshakable, trustworthy, and deeply respected for technical competence.",
    bestFor: [
      "Engineering Firms, Architectural Practices & Construction",
      "Legal Services, Accounting, Audit & Financial Governance",
      "Cleaning, Hygiene & Industrial Tooling Safety",
      "Academic Institutions, Research Facilities & Certification Bodies",
      "Medical Diagnostic Equipment & Essential Infrastructure"
    ],
    notIdealFor: [
      "Spontaneous trend-chasing viral fashion outlets",
      "High-risk speculative entertainment ventures"
    ],
    marketPositioning: "Positioned as the ultimate benchmark of reliability, technical mastery, and structural safety. Commands unwavering client confidence.",
    specificChallenges: "The methodical precision impression can occasionally feel rigid or slow to adapt in fast-evolving, trend-driven digital markets if innovation is not explicitly communicated."
  },
  5: {
    number: 5,
    title: "Number 5 — The Dynamic Versatility Brand & Product",
    frequencyName: "Adaptable Energy, Multi-Dimensional Service & Dynamic Magnetism",
    vibrationalEnergy: "Dynamic versatility, rapid market expansion, innovative adaptability, and lively engagement.",
    whatItCreates: "A business or product whose name produces Number 5 projects dynamic versatility and engaging adaptability into the marketplace. It feels responsive, innovative, and attuned to market trends. Number 5 entities excel at commercial networking, cross-sector expansion, and generating market curiosity that drives rapid early adoption.",
    bestFor: [
      "Media, Public Relations & Modern Communications Platforms",
      "Sales, Import-Export, Logistics & Global Trading",
      "Technology Startups, E-Commerce & Multi-Function Software",
      "Travel, Experiential Tourism & All-in-One Solutions",
      "Event Management, Digital Marketing & Agency Fleets"
    ],
    notIdealFor: [
      "Fixed-routine institutional care facilities",
      "Traditional static archival repositories"
    ],
    marketPositioning: "Positioned as the agile, versatile, cutting-edge innovator capable of pivoting rapidly and delivering fresh, multi-channel market solutions.",
    specificChallenges: "The dynamic desire for continuous change can tempt the business to launch too many initiatives simultaneously, requiring strict focus to maintain operational depth."
  },
  6: {
    number: 6,
    title: "Number 6 — The Caring Service Brand & Product",
    frequencyName: "Warm Service, Aesthetic Beauty, Responsible Care & Harmony",
    vibrationalEnergy: "Nurturing customer care, aesthetic refinement, ethical responsibility, and domestic/wellness harmony.",
    whatItCreates: "A business or product whose name produces Number 6 projects warm, responsible, beautifully executed care into the marketplace. Clients experience it not merely as a service or item but as an offering genuinely invested in their complete wellbeing and satisfaction. This impression creates enduring customer trust and high brand equity.",
    bestFor: [
      "Healthcare, Wellness, Medical Clinics & Spa Centers",
      "Beauty, Personal Care, Cosmetics & Family Wellness",
      "Interior Architecture, Home Beautification & Furniture",
      "Family-Oriented Consumer Goods & Nourishing Food Products",
      "Hospitality, Boutique Hotels & Celebratory Event Services"
    ],
    notIdealFor: [
      "Cold, aggressive debt collection or repo operations",
      "Hostile corporate liquidation services"
    ],
    marketPositioning: "Positioned as the premium provider of luxury, aesthetic beauty, and compassionate service excellence.",
    specificChallenges: "The warm, nurturing impression must be paired with clear commercial boundaries to prevent clients from demanding endless unpaid extras or custom scope changes."
  },
  7: {
    number: 7,
    title: "Number 7 — The Specialist Authority Brand & Product",
    frequencyName: "Deep Expertise, Analytical Precision & Premium Niche Leadership",
    vibrationalEnergy: "Specialist analytical depth, rare expertise, dignified reserve, and authoritative wisdom.",
    whatItCreates: "A business or product whose name produces Number 7 projects genuine specialist authority and analytical depth into the marketplace. It naturally attracts quality-conscious, discerning clients seeking rare and valuable expertise rather than commodity options. The entity commands high fee premiums due to its unquestioned intellectual depth.",
    bestFor: [
      "Specialist Management Consulting & Niche Advisory",
      "Research Institutes, Data Science & Proprietary Formulations",
      "Specialist Medical Surgeons, Legal Counsel & Patent Attorneys",
      "High-Performance Technical Equipment & Cyber Security",
      "Spiritual, Astrological & Philosophical Research Academies"
    ],
    notIdealFor: [
      "Mass-market discount retail outlets competing solely on price",
      "High-noise casual entertainment party venues"
    ],
    marketPositioning: "Positioned at the apex of specialist knowledge. Recognized as the elite authority called upon for complex, high-consequence challenges.",
    specificChallenges: "The dignified specialist reserve can occasionally make the entity appear distant or intimidating; creating warm, accessible entry-level touchpoints is recommended."
  },
  8: {
    number: 8,
    title: "Number 8 — The Executive Authority Brand & Product",
    frequencyName: "Material Mastery, Commercial Power & High-Stakes Achievement",
    vibrationalEnergy: "Executive authority, commercial scale, financial intelligence, and commanding market gravitas.",
    whatItCreates: "A business or product whose name produces Number 8 projects executive authority and material mastery into the marketplace. It is instinctively experienced as serious, consequential, and capable of handling massive commercial stakes. It consistently attracts major corporate clients, substantial investment capital, and high-value contracts.",
    bestFor: [
      "Investment Banking, Asset Management & Private Equity",
      "Corporate Commercial Law, Mergers & Acquisitions",
      "Real Estate Development, Commercial Property & Infrastructure",
      "Executive Search, Professional Equipment & High-Performance Tools",
      "High-Value Industrial Manufacturing & B2B Logistics"
    ],
    notIdealFor: [
      "Gentle non-profit sanctuary spaces for passive retreat",
      "Unstructured informal hobbyist groups"
    ],
    marketPositioning: "Positioned as the ultimate commercial powerhouse. Symbolizes high financial intelligence, executive strength, and material success.",
    specificChallenges: "The intense corporate authority impression must be balanced with personal human warmth to prevent the brand from appearing purely transactional or aloof."
  },
  9: {
    number: 9,
    title: "Number 9 — The Universal Purpose Brand & Product",
    frequencyName: "Humanitarian Orientation, Broad Wisdom & Meaningful Contribution",
    vibrationalEnergy: "Universal service, broad social vision, ethical leadership, and transformative impact.",
    whatItCreates: "A business or product whose name produces Number 9 projects universal purpose and compassionate wisdom into the marketplace. Clients perceive its commercial activity as aligned with something meaningful—a higher purpose that extends beyond profit into positive social impact and genuine human contribution.",
    bestFor: [
      "Social Enterprises, NGOs & Philanthropic Foundations",
      "Sustainable & Eco-Friendly Environmental Products",
      "Holistic Health Organizations & Global Community Platforms",
      "Educational Foundations & Social Impact Media",
      "Artistic & Cultural Institutions with Humanist Missions"
    ],
    notIdealFor: [
      "Short-term speculative schemes focused on rapid personal gain",
      "Aggressive predatory commercial operations"
    ],
    marketPositioning: "Positioned as a purpose-driven market leader that combines ethical responsibility with universal excellence.",
    specificChallenges: "The broad humanitarian vision must be grounded in sharp commercial discipline and financial stewardship to ensure long-term operational sustainability."
  }
};

export const CHALDEAN_COMMERCIAL_COMPOUNDS: Record<number, { name: string; quality: string; commercialImpact: string; category: "auspicious" | "cautionary" | "neutral" }> = {
  15: {
    name: "Compound 15 — The Magnetic Communicator",
    quality: "The premier commercial compound in Chaldean numerology.",
    commercialImpact: "Creates an extraordinary natural commercial magnetism that attracts high-value clients, lucrative partnerships, positive media attention, and effortless goodwill.",
    category: "auspicious"
  },
  21: {
    name: "Compound 21 — The Crown of the Magi",
    quality: "The compound of supreme public recognition and earned victory.",
    commercialImpact: "Ensures genuine, long-term brand recognition and public acclaim built on solid quality. Excellent for professional services, luxury brands, and industry leaders.",
    category: "auspicious"
  },
  23: {
    name: "Compound 23 — The Royal Star of the Lion",
    quality: "The most fortunate of all Chaldean compounds for command and success.",
    commercialImpact: "Attracts active support from influential dignitaries, government authorities, and major investors. Protects against unfair commercial competition and market downturns.",
    category: "auspicious"
  },
  27: {
    name: "Compound 27 — The Sceptre",
    quality: "The compound of earned authority through wisdom and service.",
    commercialImpact: "Builds an unshakable reputation for deep expertise, integrity, and command. Clients naturally defer to the brand's wisdom, securing high long-term retention.",
    category: "auspicious"
  },
  33: {
    name: "Compound 33 — Master Teacher & Universal Service",
    quality: "High-frequency Master vibration of transformative excellence.",
    commercialImpact: "Creates an offering capable of transforming an entire industry or changing lives. Demands the highest ethical standards and flawless execution.",
    category: "auspicious"
  },
  13: {
    name: "Compound 13 — Karmic Debt of Obstacles at Completion",
    quality: "A challenging compound of unexpected last-minute delays.",
    commercialImpact: "Deals or contracts may encounter sudden friction near final execution. Requires meticulous legal review, transparent communication, and specific remedial adjustments.",
    category: "cautionary"
  },
  14: {
    name: "Compound 14 — Karmic Debt of Impulsive Excess & Risk",
    quality: "A compound of rapid movement coupled with risk of over-expansion.",
    commercialImpact: "Brings fast early growth but carries risks of over-extending capital or rash marketing pivots. Demands strict financial controls and measured growth planning.",
    category: "cautionary"
  },
  16: {
    name: "Compound 16 — The Shattered Citadel (Inauthenticity Risk)",
    quality: "The most cautionary compound for public brand reputation.",
    commercialImpact: "Any gap between marketing promises and actual product reality will be publicly exposed. Demands absolute, radical transparency or a name spelling correction.",
    category: "cautionary"
  },
  18: {
    name: "Compound 18 — Material & Spiritual Tension",
    quality: "Internal conflict between commercial profit and core purpose.",
    commercialImpact: "Can create internal friction among founders or partners regarding corporate values vs financial goals. Requires clear alignment on core mission.",
    category: "cautionary"
  },
  19: {
    name: "Compound 19 — The Prince of Heaven (Isolating Leadership)",
    quality: "High individual triumph with potential isolation.",
    commercialImpact: "Brings strong individual executive success but requires conscious effort to build collaborative industry alliances and partner networks.",
    category: "neutral"
  }
};

export const PRICING_POINT_EVALUATIONS: Array<{
  price: string;
  sumFormula: string;
  primaryNumber: number;
  compound: number;
  status: "HIGHLY AUSPICIOUS" | "AUSPICIOUS" | "CAUTION";
  title: string;
  description: string;
  bestFor: string;
}> = [
  {
    price: "₹99",
    sumFormula: "9+9 = 18 → 9",
    primaryNumber: 9,
    compound: 18,
    status: "AUSPICIOUS",
    title: "The Universal Completion Price Point",
    description: "Broadly resonant completion energy that feels fair to an extraordinary breadth of consumers. Excellent conversion across low-ticket personal care and digital items.",
    bestFor: "Personal care, digital downloads, food treats, small household items."
  },
  {
    price: "₹199",
    sumFormula: "1+9+9 = 19 → 1",
    primaryNumber: 1,
    compound: 19,
    status: "CAUTION",
    title: "Pioneer Price with Karmic Caution",
    description: "Root digit 1 carries pioneer authority, but intermediate sum 19 is a Karmic Debt of isolation. Can create subtle post-purchase disconnect. Recommended alternatives: ₹197 (Root 8) or ₹189 (Root 9).",
    bestFor: "If required, pair with strong community support messaging."
  },
  {
    price: "₹299",
    sumFormula: "2+9+9 = 20 → 2",
    primaryNumber: 2,
    compound: 20,
    status: "AUSPICIOUS",
    title: "The Cooperative Partnership Price Point",
    description: "Infuses cooperative warmth and partnership trust into the transaction. Feels like a fair, cooperative exchange between a caring provider and a valued customer.",
    bestFor: "Monthly subscription services, family care, personal wellness supplies."
  },
  {
    price: "₹499",
    sumFormula: "4+9+9 = 22 → 4",
    primaryNumber: 4,
    compound: 22,
    status: "HIGHLY AUSPICIOUS",
    title: "The Master Builder Price Point (Master 22)",
    description: "Carries Master Number 22 as its intermediate compound. Combines the methodical reliability of root digit 4 with the visionary building power of Master 22. Outstanding commercial value impression.",
    bestFor: "Mid-range tech accessories, premium personal care, educational subscriptions."
  },
  {
    price: "₹599",
    sumFormula: "5+9+9 = 23 → 5",
    primaryNumber: 5,
    compound: 23,
    status: "HIGHLY AUSPICIOUS",
    title: "The Royal Star Price Point (Compound 23)",
    description: "Carries Compound 23—The Royal Star of the Lion—the most fortunate of all Chaldean compounds. Consistently outperforms alternatives in conversion tests due to natural support energy.",
    bestFor: "Lifestyle products, technology tools, creative merchandise, dynamic solutions."
  },
  {
    price: "₹699",
    sumFormula: "6+9+9 = 24 → 6",
    primaryNumber: 6,
    compound: 24,
    status: "AUSPICIOUS",
    title: "The Caring Service Price Point (Compound 24)",
    description: "Warm, nurturing, caring service energy. Compound 24 adds creative material blessing energy to root 6's domestic warmth.",
    bestFor: "Healthcare, wellness products, family care, boutique hospitality."
  },
  {
    price: "₹799",
    sumFormula: "7+9+9 = 25 → 7",
    primaryNumber: 7,
    compound: 25,
    status: "AUSPICIOUS",
    title: "The Specialist Authority Price Point (Compound 25)",
    description: "Signals rare specialist depth and scientific precision. Compound 25 (Strength Through Experience) justifies premium positioning.",
    bestFor: "Specialist medical products, professional tools, proprietary cosmetic formulas."
  },
  {
    price: "₹899",
    sumFormula: "8+9+9 = 26 → 8",
    primaryNumber: 8,
    compound: 26,
    status: "AUSPICIOUS",
    title: "The Executive Authority Price Point (Compound 26)",
    description: "Projects executive authority and commercial seriousness. Works best when positioned to empower the customer's own professional success.",
    bestFor: "Executive accessories, professional software, high-performance tools."
  },
  {
    price: "₹999",
    sumFormula: "9+9+9 = 27 → 9",
    primaryNumber: 9,
    compound: 27,
    status: "HIGHLY AUSPICIOUS",
    title: "The Sceptre Price Point (Compound 27)",
    description: "The most universally auspicious retail price point in Indian commerce. Triple 9 produces Compound 27 (The Sceptre) reducing to root 9. Extraordinary vibrational strength and conversion success.",
    bestFor: "Universally recommended for any offer in the ₹900–₹1,100 category."
  },
  {
    price: "₹1,499",
    sumFormula: "1+4+9+9 = 23 → 5",
    primaryNumber: 5,
    compound: 23,
    status: "AUSPICIOUS",
    title: "Dynamic Multi-Level Price Point (Compound 23)",
    description: "Brings Primary Number 5 with the Royal Star 23 compound. Balances structured authority (1 & 4) with universal completion energy.",
    bestFor: "Mid-premium consumer goods, apparel, technology gadgets."
  },
  {
    price: "₹1,999",
    sumFormula: "1+9+9+9 = 28 → 1",
    primaryNumber: 1,
    compound: 28,
    status: "CAUTION",
    title: "Karmic Caution & Finality Zone",
    description: "Three 9s creates high completion energy that can feel overly final or artificial just-below-2000 pricing. Better alternatives: ₹2,100 (Root 3) or ₹1,897 (Root 7).",
    bestFor: "Consider rounding up or using specialist alternative price points."
  },
  {
    price: "₹2,499",
    sumFormula: "2+4+9+9 = 24 → 6",
    primaryNumber: 6,
    compound: 24,
    status: "AUSPICIOUS",
    title: "The Caring Premium Price Point (Compound 24)",
    description: "Infuses warm, caring service energy at the premium mid-tier. Combines domestic warmth (6) with creative material blessing (24).",
    bestFor: "Premium wellness, professional personal care, high-grade home goods."
  },
  {
    price: "₹4,999",
    sumFormula: "4+9+9+9 = 31 → 4",
    primaryNumber: 4,
    compound: 31,
    status: "AUSPICIOUS",
    title: "The Disciplined Authority Price Point",
    description: "Methodical authority backed by triple 9 completion energy. Communicates disciplined, reliable premium quality that is genuinely justified.",
    bestFor: "High-value courses, specialist equipment, professional consulting tiers."
  },
  {
    price: "₹9,999",
    sumFormula: "9+9+9+9 = 36 → 9",
    primaryNumber: 9,
    compound: 36,
    status: "HIGHLY AUSPICIOUS",
    title: "The Universal Premium Price Point (Quadruple 9)",
    description: "The premier high-ticket price point in retail. Quadruple 9 produces Compound 36 reducing to root 9. Maximum universal completion energy.",
    bestFor: "High-ticket coaching, premium corporate services, flagship products."
  }
];

export const CAUTIONARY_KARMIC_PRICE_SUMS = [
  {
    sum: 13,
    debtName: "Karmic Debt 13 — Obstacles at Completion",
    examples: "₹49, ₹139, ₹148, ₹238, ₹247, ₹346, ₹1,129, ₹2,236",
    effect: "Transactions encounter unexpected friction or delays at final checkout; elevated last-minute cart abandonments."
  },
  {
    sum: 14,
    debtName: "Karmic Debt 14 — Impulsive Excess & Risk",
    examples: "₹59, ₹149, ₹239, ₹347, ₹1,049, ₹2,039",
    effect: "Creates erratic sales spikes followed by higher return rates, refund requests, and customer complaints."
  },
  {
    sum: 16,
    debtName: "Karmic Debt 16 — The Shattered Citadel (HIGHEST CAUTION)",
    examples: "₹79, ₹169, ₹259, ₹349, ₹358, ₹448, ₹1,159, ₹2,149",
    effect: "Strong initial interest followed by sudden reputational issues, refund spikes, or unexpected product dissatisfaction. THIS IS THE MOST CRITICAL PRICE SUM TO AVOID."
  },
  {
    sum: 19,
    debtName: "Karmic Debt 19 — Isolating Disconnect",
    examples: "₹199, ₹289, ₹379, ₹469, ₹1,099, ₹2,089",
    effect: "Generates initial conversions but creates post-purchase disconnect, leading to lower repeat purchase rates."
  }
];

export const SERVICE_TIER_RECOMMENDATION = {
  title: "All-9 All-Auspicious Service Tier Structure",
  description: "Structuring service tiers around harmonious 9-vibration price points creates an effortless progression for clients as they upgrade.",
  tiers: [
    { tierName: "Basic Tier", price: "₹999", formula: "9+9+9 = 27 → 9 (The Sceptre)", role: "Accessible entry point with high trust and universal value." },
    { tierName: "Standard Tier", price: "₹2,799", formula: "2+7+9+9 = 27 → 9 (The Sceptre)", role: "Mainstream offer carrying double Sceptre authority." },
    { tierName: "Premium Tier", price: "₹9,999", formula: "9+9+9+9 = 36 → 9 (Universal)", role: "Flagship high-ticket offer with maximum completion energy." }
  ]
};

export const DISCOUNT_PERCENTAGE_NUMEROLOGY = [
  { percent: "9%", primary: 9, description: "Universal completion energy; ideal for customer loyalty rewards." },
  { percent: "15%", primary: 6, description: "Compound 15 (Magnetic Communicator); attracts warm customer appreciation." },
  { percent: "18%", primary: 9, description: "Balanced completion energy for seasonal promotions." },
  { percent: "20%", primary: 2, description: "Cooperative partnership discount fostering long-term goodwill." },
  { percent: "21%", primary: 3, description: "Compound 21 (Crown of the Magi); joyful recognition promotion." },
  { percent: "27%", primary: 9, description: "Compound 27 (Sceptre); high-impact authoritative sales event." },
  { percent: "30%", primary: 3, description: "Joyful celebration discount ideal for festive occasions." }
];

export const SKU_AND_PRODUCT_CODE_GUIDANCE = {
  title: "SKU & Product Code Optimization",
  description: "Stock Keeping Units (SKUs) are processed repeatedly in inventories, invoices, and shipping. Removing Karmic Debt sums (13, 14, 16) from flagship product SKUs prevents operational friction.",
  flagshipSKUTargets: [
    "Root 1 — Category leadership & pioneering product codes",
    "Root 6 — Caring service & high-customer-satisfaction items",
    "Root 7 — Specialist authority & proprietary technology codes",
    "Root 8 — Executive premium & high-margin product codes",
    "Root 9 — Universal best-seller SKUs"
  ]
};

export const PRODUCT_LAUNCH_TIMING_GUIDANCE = {
  title: "Product Launch Date Numerology",
  description: "The Universal Day Number of a product launch date creates an enduring vibrational imprint throughout its commercial life.",
  auspiciousLaunchDays: [
    { dayNumber: 1, idealFor: "Pioneering category-defining product launches" },
    { dayNumber: 3, idealFor: "Creative, lifestyle, and celebratory product launches" },
    { dayNumber: 6, idealFor: "Family, wellness, medical, and personal care launches" },
    { dayNumber: 8, idealFor: "Executive corporate B2B services and premium financial products" },
    { dayNumber: 9, idealFor: "Universal best-sellers and broad social impact launches" }
  ]
};

export const PACKAGING_QUANTITY_GUIDANCE = {
  title: "Packaging Quantity & Weight Numerology",
  quantities: [
    { count: "3 items / 12 items (Root 3)", energy: "Joyful creative energy and social sharing appeal." },
    { count: "4 items / 24 items (Root 4/6)", energy: "Methodical stability and structured family value." },
    { count: "6 items (Root 6)", energy: "Warm caring service and domestic nurturing." },
    { count: "7 items (Root 7)", energy: "Specialist authority and elite curated sets." },
    { count: "9 items (Root 9)", energy: "Universal completion and maximum broad value." }
  ],
  weights: [
    { size: "250g / 250ml (Root 7)", energy: "Specialist precision sizing." },
    { size: "450g / 450ml (Root 9)", energy: "Universal family size." },
    { size: "500ml (Root 5)", energy: "Dynamic versatile everyday size." },
    { size: "750g / 750ml (Root 3)", energy: "Joyful creative celebration size." },
    { size: "900g / 1000ml (Root 9 / 1)", energy: "Universal completion & pioneering full size." }
  ]
};

export const COMPLETE_BUSINESS_NUMEROLOGY_AUDIT_PROTOCOL = [
  "1. Brand & Business Name Audit — Evaluate Chaldean & Pythagorean numbers, compounds, cornerstone/capstone, and founder alignment.",
  "2. Product Name Portfolio Audit — Calculate individual product name numbers and check for category alignment and Karmic Debt compounds.",
  "3. Price Point & Menu Audit — Calculate digit sums for all prices; replace Karmic Debt prices (13, 14, 16, 19) with auspicious alternatives (₹599, ₹999, ₹2,799, ₹9,999).",
  "4. Service Tier Structure Optimization — Align Basic, Standard, and Premium tiers on harmonious root 9 or root 6 progressions.",
  "5. High-Volume SKU Code Audit — Remove cautionary Karmic sums from top 20% flagship product SKU codes.",
  "6. Logo & Visual Identity Check — Ensure logo colors and geometric shapes complement the brand number.",
  "7. Launch Date Selection — Schedule future product debuts on Universal Day Numbers 1, 3, 6, 8, or 9."
];

export interface BusinessBrandParsedResult {
  rawBrandName: string;
  cleanBrandName: string;
  taglineStr?: string;
  chaldeanLetterValues: { letter: string; value: number }[];
  chaldeanSum: number;
  chaldeanPrimary: number;
  chaldeanCompound: number;
  isAuspiciousCompound: boolean;
  isCautionaryCompound: boolean;
  compoundInfo?: { name: string; quality: string; commercialImpact: string; category: "auspicious" | "cautionary" | "neutral" };
  pythagoreanSum: number;
  pythagoreanPrimary: number;
  cornerstoneLetter: string;
  cornerstoneValue: number;
  capstoneLetter: string;
  capstoneValue: number;
  reading: BrandProductReading;
  founderCompatibility?: {
    lifePath: number;
    isBest: boolean;
    isAvoid: boolean;
    explanation: string;
  };
}

export interface BusinessProductParsedResult {
  rawProductName: string;
  cleanProductName: string;
  chaldeanSum: number;
  primaryNumber: number;
  compoundNumber: number;
  priceAmountStr?: string;
  priceNumVal?: number;
  pricePrimaryNum?: number;
  priceCompoundNum?: number;
  isPriceCautionary?: boolean;
  priceCautionReason?: string;
  skuCodeStr?: string;
  skuSum?: number;
  skuPrimaryNum?: number;
  isSkuCautionary?: boolean;
  launchDateStr?: string;
  launchUniversalDayNum?: number;
  productReading: BrandProductReading;
}

export function parseAndEvaluateBusinessBrand(
  rawBrandName: string,
  taglineInput?: string,
  founderDobInput?: string
): BusinessBrandParsedResult | null {
  if (!rawBrandName || rawBrandName.trim().length === 0) return null;

  const cleanBrandName = rawBrandName.trim().toUpperCase();
  const lettersOnly = cleanBrandName.replace(/[^A-Z]/g, "");
  if (lettersOnly.length === 0) return null;

  const chaldeanValues: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1, J: 1, K: 2, L: 3, M: 4,
    N: 5, O: 7, P: 8, Q: 1, R: 2, S: 3, T: 4, U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7
  };

  const pythagoreanValues: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9, J: 1, K: 2, L: 3, M: 4,
    N: 5, O: 6, P: 7, Q: 8, R: 9, S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
  };

  const chaldeanLetterValues: { letter: string; value: number }[] = [];
  let chaldeanSum = 0;
  let pythagoreanSum = 0;

  lettersOnly.split("").forEach(char => {
    const cVal = chaldeanValues[char] || 0;
    const pVal = pythagoreanValues[char] || 0;
    chaldeanLetterValues.push({ letter: char, value: cVal });
    chaldeanSum += cVal;
    pythagoreanSum += pVal;
  });

  const chaldeanCompound = chaldeanSum;
  let chaldeanPrimary = chaldeanCompound;

  while (chaldeanPrimary > 9 && chaldeanPrimary !== 11 && chaldeanPrimary !== 22 && chaldeanPrimary !== 33) {
    chaldeanPrimary = String(chaldeanPrimary)
      .split("")
      .map(Number)
      .reduce((a, b) => a + b, 0);
  }

  let pythagoreanPrimary = pythagoreanSum;
  while (pythagoreanPrimary > 9 && pythagoreanPrimary !== 11 && pythagoreanPrimary !== 22 && pythagoreanPrimary !== 33) {
    pythagoreanPrimary = String(pythagoreanPrimary)
      .split("")
      .map(Number)
      .reduce((a, b) => a + b, 0);
  }

  let rootDigit = chaldeanPrimary;
  if (rootDigit > 9) {
    let temp = rootDigit;
    while (temp > 9) {
      temp = String(temp).split("").map(Number).reduce((a, b) => a + b, 0);
    }
    rootDigit = temp;
  }

  const compoundInfo = CHALDEAN_COMMERCIAL_COMPOUNDS[chaldeanCompound] || undefined;
  const isAuspiciousCompound = compoundInfo?.category === "auspicious";
  const isCautionaryCompound = compoundInfo?.category === "cautionary";

  const cornerstoneLetter = lettersOnly[0];
  const cornerstoneValue = chaldeanValues[cornerstoneLetter] || 0;
  const capstoneLetter = lettersOnly[lettersOnly.length - 1];
  const capstoneValue = chaldeanValues[capstoneLetter] || 0;

  // Founder Life Path
  let founderLifePath: number | undefined = undefined;
  if (founderDobInput && founderDobInput.trim().length > 0) {
    const digits = founderDobInput.replace(/[^0-9]/g, "").split("").map(Number);
    if (digits.length > 0) {
      let sum = digits.reduce((a, b) => a + b, 0);
      while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
        sum = String(sum).split("").map(Number).reduce((a, b) => a + b, 0);
      }
      founderLifePath = sum;
    }
  }

  let founderCompatibility: BusinessBrandParsedResult["founderCompatibility"] = undefined;
  if (founderLifePath) {
    const bestBrandNums = [1, 3, 5, 6, 7, 8, 9];
    const isBest = bestBrandNums.includes(rootDigit);
    founderCompatibility = {
      lifePath: founderLifePath,
      isBest,
      isAvoid: !isBest && [2, 4].includes(rootDigit),
      explanation: `Founder Life Path ${founderLifePath} evaluated with Brand Primary Number ${rootDigit}.`
    };
  }

  const reading = BRAND_AND_PRODUCT_NUMBERS[rootDigit] || BRAND_AND_PRODUCT_NUMBERS[1];

  return {
    rawBrandName,
    cleanBrandName,
    taglineStr: taglineInput,
    chaldeanLetterValues,
    chaldeanSum,
    chaldeanPrimary: rootDigit,
    chaldeanCompound,
    isAuspiciousCompound,
    isCautionaryCompound,
    compoundInfo,
    pythagoreanSum,
    pythagoreanPrimary: (pythagoreanPrimary > 9 ? (String(pythagoreanPrimary).split("").map(Number).reduce((a,b)=>a+b,0)) : pythagoreanPrimary),
    cornerstoneLetter,
    cornerstoneValue,
    capstoneLetter,
    capstoneValue,
    reading,
    founderCompatibility
  };
}

export function parseAndEvaluateProductAndPrice(
  rawProductName: string,
  priceAmountStr?: string,
  skuCodeStr?: string,
  launchDateStr?: string
): BusinessProductParsedResult | null {
  if (!rawProductName || rawProductName.trim().length === 0) return null;

  const cleanProductName = rawProductName.trim().toUpperCase();
  const lettersOnly = cleanProductName.replace(/[^A-Z]/g, "");
  if (lettersOnly.length === 0) return null;

  const chaldeanValues: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1, J: 1, K: 2, L: 3, M: 4,
    N: 5, O: 7, P: 8, Q: 1, R: 2, S: 3, T: 4, U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7
  };

  let chaldeanSum = 0;
  lettersOnly.split("").forEach(char => {
    chaldeanSum += chaldeanValues[char] || 0;
  });

  const compoundNumber = chaldeanSum;
  let primaryNumber = compoundNumber;
  while (primaryNumber > 9 && primaryNumber !== 11 && primaryNumber !== 22 && primaryNumber !== 33) {
    primaryNumber = String(primaryNumber)
      .split("")
      .map(Number)
      .reduce((a, b) => a + b, 0);
  }

  let rootDigit = primaryNumber;
  if (rootDigit > 9) {
    let temp = rootDigit;
    while (temp > 9) {
      temp = String(temp).split("").map(Number).reduce((a, b) => a + b, 0);
    }
    rootDigit = temp;
  }

  // Price calculation
  let priceNumVal: number | undefined = undefined;
  let pricePrimaryNum: number | undefined = undefined;
  let priceCompoundNum: number | undefined = undefined;
  let isPriceCautionary = false;
  let priceCautionReason = "";

  if (priceAmountStr && priceAmountStr.trim().length > 0) {
    const priceDigits = priceAmountStr.replace(/[^0-9]/g, "").split("").map(Number);
    if (priceDigits.length > 0) {
      const priceSum = priceDigits.reduce((a, b) => a + b, 0);
      priceCompoundNum = priceSum;

      let pPrim = priceSum;
      while (pPrim > 9) {
        pPrim = String(pPrim).split("").map(Number).reduce((a, b) => a + b, 0);
      }
      pricePrimaryNum = pPrim;
      priceNumVal = parseInt(priceAmountStr.replace(/[^0-9]/g, ""), 10);

      // Check Karmic Debt sums (13, 14, 16, 19)
      if ([13, 14, 16, 19].includes(priceSum)) {
        isPriceCautionary = true;
        if (priceSum === 13) priceCautionReason = "Digit sum equals 13 (Karmic Debt of completion delays).";
        else if (priceSum === 14) priceCautionReason = "Digit sum equals 14 (Karmic Debt of impulsive excess & returns).";
        else if (priceSum === 16) priceCautionReason = "Digit sum equals 16 (HIGHEST CAUTION — Karmic Debt of sudden reversal).";
        else if (priceSum === 19) priceCautionReason = "Digit sum equals 19 (Karmic Debt of disconnect & low repeat sales).";
      }
    }
  }

  // SKU calculation
  let skuSum: number | undefined = undefined;
  let skuPrimaryNum: number | undefined = undefined;
  let isSkuCautionary = false;

  if (skuCodeStr && skuCodeStr.trim().length > 0) {
    const skuClean = skuCodeStr.toUpperCase().replace(/[^A-Z0-9]/g, "");
    let sSum = 0;
    skuClean.split("").forEach(ch => {
      if (/[0-9]/.test(ch)) sSum += parseInt(ch, 10);
      else if (chaldeanValues[ch]) sSum += chaldeanValues[ch];
    });
    skuSum = sSum;
    let sPrim = sSum;
    while (sPrim > 9) {
      sPrim = String(sPrim).split("").map(Number).reduce((a, b) => a + b, 0);
    }
    skuPrimaryNum = sPrim;
    if ([13, 14, 16, 19].includes(sSum)) {
      isSkuCautionary = true;
    }
  }

  // Launch date calculation
  let launchUniversalDayNum: number | undefined = undefined;
  if (launchDateStr && launchDateStr.trim().length > 0) {
    const dDigits = launchDateStr.replace(/[^0-9]/g, "").split("").map(Number);
    if (dDigits.length > 0) {
      let lSum = dDigits.reduce((a, b) => a + b, 0);
      while (lSum > 9) {
        lSum = String(lSum).split("").map(Number).reduce((a, b) => a + b, 0);
      }
      launchUniversalDayNum = lSum;
    }
  }

  const productReading = BRAND_AND_PRODUCT_NUMBERS[rootDigit] || BRAND_AND_PRODUCT_NUMBERS[1];

  return {
    rawProductName,
    cleanProductName,
    chaldeanSum,
    primaryNumber: rootDigit,
    compoundNumber,
    priceAmountStr,
    priceNumVal,
    pricePrimaryNum,
    priceCompoundNum,
    isPriceCautionary,
    priceCautionReason,
    skuCodeStr,
    skuSum,
    skuPrimaryNum,
    isSkuCautionary,
    launchDateStr,
    launchUniversalDayNum,
    productReading
  };
}

export const CHAPTER_THIRTY_TWO_THEORY = {
  chapterNumber: "Chapter Thirty-Two",
  title: "Numerology for Business: Products, Brands and Pricing",
  quote: {
    text: "Every price you set is a vibrational statement about the worth of your contribution. Every product name is a promise encoded in number. Choose both with the same care you would give any sacred act.",
    author: "Applied Commercial Numerology"
  }
};
