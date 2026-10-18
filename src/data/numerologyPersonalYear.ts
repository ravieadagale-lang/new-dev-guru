import { reduceToSingleDigit } from "./numerologyData";

export interface PersonalYearPrediction {
  year: number;
  personalYearNumber: number;
  rulingPlanet: string;
  archetype: string;
  headline: string;
  overview: string;

  // Guidance categories
  careerGuidance: {
    status: string;
    advice: string;
    keyOpportunities: string[];
  };
  financeGuidance: {
    status: string;
    advice: string;
    financialTips: string[];
  };
  healthGuidance: {
    status: string;
    advice: string;
    preventativeMeasures: string[];
  };
  relationshipGuidance: {
    status: string;
    advice: string;
    keyHarmonies: string[];
  };

  // Remedies & Affirmations
  remedies: {
    gemstone: string;
    colorToWear: string;
    mantraOrRitual: string;
    practicalAction: string;
  };

  favorableMonths: string[];
  challengingMonths: string[];
  affirmation: string;

  // Monthly Breakdown
  monthlyBreakdown: {
    monthIndex: number;
    monthName: string;
    personalMonthNumber: number;
    theme: string;
    guidance: string;
  }[];
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const PERSONAL_YEAR_DATABASE: Record<number, Omit<PersonalYearPrediction, "year" | "personalYearNumber" | "monthlyBreakdown">> = {
  1: {
    rulingPlanet: "Sun (Surya)",
    archetype: "The Pioneer & Trailblazer",
    headline: "Year of New Beginnings, Bold Initiatives & Independence",
    overview: "Personal Year 1 marks the start of a brand-new 9-year cosmic cycle. It is a period of high energy, self-reliance, and fresh starts. What you seed this year sets the foundation for the next decade.",
    careerGuidance: {
      status: "Prime Growth & Leadership Phase",
      advice: "Take charge of your career path. Launch new projects, seek leadership positions, or step into entrepreneurship.",
      keyOpportunities: ["Starting new business ventures", "Pitching innovative proposals", "Seeking executive promotions"]
    },
    financeGuidance: {
      status: "Seed Capital & Self-Investment",
      advice: "Invest in your own skills, business assets, and long-term equity. Avoid relying solely on others for financial direction.",
      financialTips: ["Allocate funds to personal skill development", "Set up new revenue streams", "Keep financial independence primary"]
    },
    healthGuidance: {
      status: "High Vitality & Dynamic Energy",
      advice: "Your physical energy is elevated. Engage in active workouts, morning sunlight exposure, and cardiovascular conditioning.",
      preventativeMeasures: ["Practice 15 mins morning Sun gazing", "Maintain blood pressure checks", "Avoid over-exhaustion from workaholism"]
    },
    relationshipGuidance: {
      status: "Self-Identity & New Connections",
      advice: "Define your personal boundaries. Singleness may bring exciting new attractions; existing bonds require mutual respect for autonomy.",
      keyHarmonies: ["Attracting independent partners", "Setting healthy personal boundaries", "Re-energizing romance with shared trips"]
    },
    remedies: {
      gemstone: "Ruby (Manikya) or Red Garnet set in Copper/Gold",
      colorToWear: "Bright Gold, Warm Orange, Crimson Red",
      mantraOrRitual: "Recite 'Om Suryaya Namah' 108 times on Sunday mornings",
      practicalAction: "Offer fresh water in a copper vessel to the rising Sun every morning."
    },
    favorableMonths: ["January", "May", "October"],
    challengingMonths: ["August", "November"],
    affirmation: "I courageously embrace new beginnings and step into my sovereign power."
  },
  2: {
    rulingPlanet: "Moon (Chandra)",
    archetype: "The Diplomat & Intuitive Peacemaker",
    headline: "Year of Cooperation, Patience & Emotional Synergy",
    overview: "Personal Year 2 is a gentle, receptive phase. After the intense push of Year 1, seeds require nurturing. Focus on relationships, partnerships, diplomatic negotiations, and intuitive alignment.",
    careerGuidance: {
      status: "Collaborative & Strategic Alliances",
      advice: "Focus on teamwork and joint ventures rather than solo aggressive pushes. Diplomacy yields greater success than force.",
      keyOpportunities: ["Building strategic business partnerships", "Mentoring team members", "Negotiating win-win contracts"]
    },
    financeGuidance: {
      status: "Steady Accumulation & Joint Ventures",
      advice: "Manage joint finances with care. Focus on steady, low-risk savings and shared investments.",
      financialTips: ["Review joint bank accounts and agreements", "Avoid speculative gambling", "Build liquidity buffers"]
    },
    healthGuidance: {
      status: "Emotional Balance & Fluid Care",
      advice: "Pay attention to your emotional digestion, nervous system, and fluid balance. Stay hydrated and avoid overthinking.",
      preventativeMeasures: ["Drink plenty of fresh water", "Practice soothing moonlight meditation", "Keep consistent sleeping hours"]
    },
    relationshipGuidance: {
      status: "Deepening Bonds & Romantic Harmony",
      advice: "This is one of the best years for marriage, reconciliation, and deep emotional bonding.",
      keyHarmonies: ["Deepening emotional intimacy", "High potential for marriage or engagement", "Resolving past interpersonal misunderstandings"]
    },
    remedies: {
      gemstone: "Natural Basra Pearl (Moti) or Moonstone in Silver",
      colorToWear: "Pearl White, Off-White, Cream, Sea Green",
      mantraOrRitual: "Recite 'Om Somaya Namah' on Monday evenings",
      practicalAction: "Keep a silver vessel of fresh water in your northern room sector."
    },
    favorableMonths: ["February", "June", "November"],
    challengingMonths: ["September", "December"],
    affirmation: "I honor the power of patience, partnership, and inner peace."
  },
  3: {
    rulingPlanet: "Jupiter (Guru)",
    archetype: "The Master Communicator & Visionary",
    headline: "Year of Expansion, Creative Joy, Social Growth & Wisdom",
    overview: "Personal Year 3 brings joyful self-expression, artistic expansion, and intellectual growth under Jupiter's radiant grace. Opportunities blossom through networking, writing, media, and travel.",
    careerGuidance: {
      status: "High Visibility & Expressive Success",
      advice: "Showcase your talents publicly. Write, speak, market your services, and expand your professional brand identity.",
      keyOpportunities: ["Launching media/marketing campaigns", "Publishing books or research", "Public speaking and workshops"]
    },
    financeGuidance: {
      status: "Multiple Income Streams & Creative Wealth",
      advice: "Income increases through creative skills and advisory roles. Be mindful of lavish overspending on entertainment.",
      financialTips: ["Monetize creative hobbies", "Diversify income portfolios", "Avoid emotional spending"]
    },
    healthGuidance: {
      status: "Optimistic Energy & Liver Wellness",
      advice: "Vitality is strong, but watch out for dietary indulgence. Keep your liver and digestion balanced with wholesome food.",
      preventativeMeasures: ["Include turmeric and honey in warm water", "Limit heavy sweets and rich foods", "Maintain active physical recreation"]
    },
    relationshipGuidance: {
      status: "Social Joy & Intellectual Compatibility",
      advice: "Your charm and magnetism are high. Enjoy social gatherings, travel with loved ones, and express your feelings openly.",
      keyHarmonies: ["Socializing and meeting inspiring friends", "Expressing love with joyful gestures", "Travel adventures with your partner"]
    },
    remedies: {
      gemstone: "Yellow Sapphire (Pukhraj) or Topaz in Gold",
      colorToWear: "Saffron Yellow, Golden Amber, Bright Pink",
      mantraOrRitual: "Recite 'Om Gram Greem Grom Sah Gurave Namah' on Thursdays",
      practicalAction: "Apply a subtle tilak of saffron/turmeric paste on your forehead on Thursday mornings."
    },
    favorableMonths: ["March", "July", "December"],
    challengingMonths: ["October", "January"],
    affirmation: "My creative expression expands joyfully and attracts abundant prosperity."
  },
  4: {
    rulingPlanet: "Rahu / Saturn Alignment",
    archetype: "The Master Architect & Foundation Builder",
    headline: "Year of Hard Work, Discipline, System Building & Real Security",
    overview: "Personal Year 4 is the year of solid foundations. It requires methodical effort, practical organization, home building, and strict discipline. Short cuts fail; systematic work creates lasting empires.",
    careerGuidance: {
      status: "Rigorous Execution & Operational Mastery",
      advice: "Streamline workflows, organize files, master technical skills, and build robust business infrastructure.",
      keyOpportunities: ["Building scalable business processes", "Securing permanent career positions", "Auditing and optimizing operations"]
    },
    financeGuidance: {
      status: "Conservative Wealth & Real Estate Focus",
      advice: "Focus on tangible assets like real estate, land, bonds, and long-term funds. Avoid get-rich-quick schemes.",
      financialTips: ["Invest in real estate or land", "Create strict budget spreadsheets", "Eliminate unnecessary subscription expenses"]
    },
    healthGuidance: {
      status: "Stamina & Musculoskeletal Care",
      advice: "Physical stamina is required. Protect your posture, spine, and joints. Avoid erratic sleep and burnout.",
      preventativeMeasures: ["Practice daily barefoot walking on green grass", "Ensure adequate calcium and Vitamin D", "Maintain structured sleep schedules"]
    },
    relationshipGuidance: {
      status: "Duty, Commitment & Structural Support",
      advice: "Express love through practical support, home improvements, and dependability rather than grand drama.",
      keyHarmonies: ["Building a home together", "Establishing long-term family stability", "Supporting partner in practical responsibilities"]
    },
    remedies: {
      gemstone: "Hessonite Garnet (Gomed) or Blue Sapphire in Panchdhatu",
      colorToWear: "Electric Blue, Khaki, Charcoal Grey, Navy",
      mantraOrRitual: "Recite 'Om Rahave Namah' on Saturday evenings",
      practicalAction: "Keep your workspace clutter-free and place a small brass Swastika on your desk."
    },
    favorableMonths: ["April", "August", "January"],
    challengingMonths: ["November", "February"],
    affirmation: "I build strong, enduring foundations with discipline, patience, and purpose."
  },
  5: {
    rulingPlanet: "Mercury (Budha)",
    archetype: "The Eloquent Catalyst & Global Traveler",
    headline: "Year of Pivot Points, Freedom, Adaptability & Media Outreach",
    overview: "Personal Year 5 brings dynamic change, unexpected opportunities, freedom, travel, and rapid communication. It breaks rigid routines and opens global horizons.",
    careerGuidance: {
      status: "Pivot, Expansion & Digital Growth",
      advice: "Be adaptable. Welcome job changes, new tech tools, remote work, digital marketing, and international networking.",
      keyOpportunities: ["Expanding digital presence & e-commerce", "Overseas business trips or relocation", "Pivoting to high-growth sectors"]
    },
    financeGuidance: {
      status: "Dynamic Cashflow & Liquid Investments",
      advice: "Cash flow can be fast and fluid. Maintain liquid reserves and avoid impulsive financial speculation.",
      financialTips: ["Maintain high liquidity", "Diversify into trading or tech stocks", "Set emergency cash reserves for travel"]
    },
    healthGuidance: {
      status: "Nervous Energy & Adaptability",
      advice: "Keep your nervous system calm. High mental activity requires relaxing hobbies, green tea, and breathing exercises.",
      preventativeMeasures: ["Drink green tea and herbal infusions", "Practice Pranayama (Nadi Shodhana)", "Take periodic digital detox breaks"]
    },
    relationshipGuidance: {
      status: "Excitement, Social Connections & Freedom",
      advice: "Relationships thrive on novelty and adventure. Give each other space to grow and explore new ideas.",
      keyHarmonies: ["Spontaneous travel with your partner", "Expanding mutual social circles", "Refreshing relationship communication"]
    },
    remedies: {
      gemstone: "Natural Emerald (Panna) or Peridot in Gold/Silver",
      colorToWear: "Emerald Green, Light Turquoise, Mint",
      mantraOrRitual: "Recite 'Om Budhaya Namah' on Wednesday mornings",
      practicalAction: "Feed green fodder or spinach to cows or birds on Wednesdays."
    },
    favorableMonths: ["May", "September", "February"],
    challengingMonths: ["December", "March"],
    affirmation: "I welcome positive change and navigate life's shifts with agility and grace."
  },
  6: {
    rulingPlanet: "Venus (Shukra)",
    archetype: "The Universal Healer & Harmonizer",
    headline: "Year of Domestic Harmony, Responsibility, Home & Luxury",
    overview: "Personal Year 6 centers around family obligations, home beautification, love, responsibility, and artistic refinement. Venus brings grace, romance, and artistic prosperity.",
    careerGuidance: {
      status: "Service, Aesthetic Excellence & Leadership",
      advice: "Enhance customer service, interior design, branding aesthetics, luxury goods, and team welfare.",
      keyOpportunities: ["Upgrading corporate branding aesthetics", "Leading community/family enterprises", "Expanding luxury or design offerings"]
    },
    financeGuidance: {
      status: "Property Renovations & Comfort Investments",
      advice: "Investments in home comfort, interior decoration, family security, and luxury assets yield deep emotional satisfaction.",
      financialTips: ["Budget for home renovations", "Invest in high-value durable assets", "Ensure family health insurance coverage"]
    },
    healthGuidance: {
      status: "Throat, Kidney & Beauty Care",
      advice: "Balance self-care with care for others. Watch out for overindulgence in rich foods or sweets.",
      preventativeMeasures: ["Engage in soothing skincare and spa routines", "Limit heavy cream and refined sugar", "Maintain vocal/throat health"]
    },
    relationshipGuidance: {
      status: "Marriage, Family Unity & Deep Commitment",
      advice: "This is a stellar year for marriage, starting a family, beautifying your home, and strengthening kinship.",
      keyHarmonies: ["Wedding bells & romantic milestones", "Beautifying living space together", "Nurturing family harmony"]
    },
    remedies: {
      gemstone: "Diamond (Heera) or White Zircon in Platinum/Silver",
      colorToWear: "Royal Blue, Pastel Pink, Off-White, Cream",
      mantraOrRitual: "Recite 'Om Shukraya Namah' on Friday mornings",
      practicalAction: "Light a sandalwood incense stick and keep fresh white flowers in your living area."
    },
    favorableMonths: ["June", "October", "March"],
    challengingMonths: ["January", "April"],
    affirmation: "I create a sanctuary of love, harmony, and abundance for myself and my loved ones."
  },
  7: {
    rulingPlanet: "Ketu / Neptune Alignment",
    archetype: "The Mystical Scholar & Deep Researcher",
    headline: "Year of Reflection, Research, Spiritual Awakening & Inner Mastery",
    overview: "Personal Year 7 is a sacred sabbatical year. The universe invites you to step inward, pursue higher studies, specialize in your field, practice spirituality, and gain wisdom.",
    careerGuidance: {
      status: "Specialization & Intellectual Craftsmanship",
      advice: "Focus on deep work, R&D, writing, technical analysis, and spiritual or scientific mastery rather than noisy expansion.",
      keyOpportunities: ["Authoring research papers or patents", "Mastering specialized technical skills", "Spiritual/coaching retreats"]
    },
    financeGuidance: {
      status: "Financial Auditing & Prudent Conservation",
      advice: "Consolidate your assets. Avoid impulsive financial risks or unverified partnerships. Focus on inner wealth.",
      financialTips: ["Audit existing financial portfolios", "Eliminate waste and debt", "Invest in educational courses"]
    },
    healthGuidance: {
      status: "Mental Rest & Detoxification",
      advice: "Prioritize mental wellness, solitary nature walks, meditation, and quiet sleep environments.",
      preventativeMeasures: ["Practice daily 20-min silent meditation", "Spend time near water bodies or forests", "Avoid noisy environments"]
    },
    relationshipGuidance: {
      status: "Spiritual Connection & Quality over Quantity",
      advice: "Seek soul-level depth in relationships. Quality conversation and mutual spiritual understanding are key.",
      keyHarmonies: ["Deep philosophical conversations", "Spiritual retreats taken as a couple", "Respecting individual quiet time"]
    },
    remedies: {
      gemstone: "Cat's Eye (Lehsuniya) or Smoky Quartz in Silver",
      colorToWear: "Light Blue, Smoky Grey, Silver, Sea Foam",
      mantraOrRitual: "Recite 'Om Ketave Namah' on Sunday evenings",
      practicalAction: "Donate warm blankets or food to a local shelter or spiritual monk."
    },
    favorableMonths: ["July", "November", "April"],
    challengingMonths: ["February", "May"],
    affirmation: "In quiet reflection, I discover profound truth, wisdom, and inner strength."
  },
  8: {
    rulingPlanet: "Saturn (Shani)",
    archetype: "The Financial Powerhouse & Karmic Executive",
    headline: "Year of Power, Executive Advancement, Wealth Harvest & Manifestation",
    overview: "Personal Year 8 is the year of material harvest. Karma pays out based on the effort invested over the previous 7 years. Executive power, financial rewards, legal clarity, and authority peak.",
    careerGuidance: {
      status: "Executive Authority & Major Milestones",
      advice: "Step up as an authority figure. Manage large budgets, direct teams, handle legal affairs, and claim your rewards.",
      keyOpportunities: ["Promotion to senior executive/C-suite", "Major commercial real estate deals", "Resolving legal & financial disputes"]
    },
    financeGuidance: {
      status: "Peak Harvest & Capital Growth",
      advice: "Substantial financial gains are possible. Manage money with high ethics, integrity, and long-term vision.",
      financialTips: ["Reinvest profits into growth assets", "Maintain pristine tax and accounting records", "Establish long-term trust funds"]
    },
    healthGuidance: {
      status: "Physical Resilience & Skeletal Care",
      advice: "Ensure high physical stamina. Maintain bone density, joint flexibility, and healthy blood circulation.",
      preventativeMeasures: ["Do strength training and joint mobility work", "Maintain healthy hydration levels", "Avoid chronic work stress"]
    },
    relationshipGuidance: {
      status: "Power Dynamics & Mutual Respect",
      advice: "Ensure business ambitions do not overshadow home warmth. Treat your partner as an equal executive co-pilot.",
      keyHarmonies: ["Shared long-term financial goals", "Mutual respect for career achievements", "Building family wealth together"]
    },
    remedies: {
      gemstone: "Blue Sapphire (Neelam) or Amethyst in Silver/Panchdhatu",
      colorToWear: "Dark Navy Blue, Charcoal, Deep Indigo",
      mantraOrRitual: "Recite 'Om Sham Shanayscharaya Namah' on Saturday evenings",
      practicalAction: "Light a mustard oil lamp under a Peepal tree or donate black sesame to the needy on Saturdays."
    },
    favorableMonths: ["August", "December", "May"],
    challengingMonths: ["March", "June"],
    affirmation: "I step into my executive authority and manage wealth with integrity and purpose."
  },
  9: {
    rulingPlanet: "Mars (Mangal)",
    archetype: "The Humanitarian & Rebirth Strategist",
    headline: "Year of Completion, Release, Transformation & Preparing for Rebirth",
    overview: "Personal Year 9 completes the 9-year cycle. It is a period of culmination, releasing outdated habits or non-rewarding endeavors, global outreach, forgiveness, and clearing space for Year 1.",
    careerGuidance: {
      status: "Culmination, Philanthropy & Global Reach",
      advice: "Complete pending projects. Release non-viable ventures. Focus on humanitarian impact and finishing strong.",
      keyOpportunities: ["Finalizing major project deliverables", "Global or cross-border outreach", "Mentoring the next generation"]
    },
    financeGuidance: {
      status: "Debt Elimination & Asset Consolidation",
      advice: "Clear outstanding debts and loans. Sell unproductive assets and streamline portfolios before starting a new cycle.",
      financialTips: ["Pay off pending loans or debts", "Clear clutter and sell unneeded equipment", "Donate a portion of profits to charity"]
    },
    healthGuidance: {
      status: "Vitality Release & Emotional Detox",
      advice: "Release pent-up emotional frustration or anger. Engage in athletic sports, martial arts, or deep physical detox.",
      preventativeMeasures: ["Channel physical energy into sports/gym", "Practice emotional forgiveness & journal", "Avoid impulsive anger"]
    },
    relationshipGuidance: {
      status: "Forgiveness, Resolution & Deep Compassion",
      advice: "Forgive old grievances. Let go of relationships that no longer serve mutual growth and cherish true soul ties.",
      keyHarmonies: ["Forgiving past relationship misunderstandings", "Engaging in joint charity work", "Deepening compassion and love"]
    },
    remedies: {
      gemstone: "Red Coral (Moonga) or Carnelian in Copper/Gold",
      colorToWear: "Crimson Red, Scarlet, Coral, Warm Copper",
      mantraOrRitual: "Recite 'Om Angarakaya Namah' on Tuesday mornings",
      practicalAction: "Donate red lentils (Masoor Dal) or jaggery to a community kitchen on Tuesdays."
    },
    favorableMonths: ["September", "January", "June"],
    challengingMonths: ["April", "July"],
    affirmation: "I gracefully release what has served its purpose and welcome my next heroic chapter."
  }
};

/**
 * Calculates 5-Year Personal Year predictions (Current year + Next 4 years)
 */
export function calculateFiveYearPersonalYearForecast(
  dob: string,
  startYear: number = new Date().getFullYear()
): PersonalYearPrediction[] {
  const parts = (dob || "1995-08-15").split("-").map((p) => parseInt(p, 10));
  const month = parts[1] || 8;
  const day = parts[2] || 15;

  const result: PersonalYearPrediction[] = [];

  for (let offset = 0; offset < 5; offset++) {
    const targetYear = startYear + offset;
    const personalYearNumber = reduceToSingleDigit(day + month + targetYear);

    const baseData = PERSONAL_YEAR_DATABASE[personalYearNumber] || PERSONAL_YEAR_DATABASE[1];

    // Build 12-Month breakdown for this specific personal year
    const monthlyBreakdown = MONTH_NAMES.map((mName, mIdx) => {
      const monthNum = mIdx + 1;
      const personalMonthNumber = reduceToSingleDigit(personalYearNumber + monthNum);

      const MONTH_THEMES: Record<number, { theme: string; guidance: string }> = {
        1: { theme: "New Focus & Initiative", guidance: "Plant seeds for new monthly goals." },
        2: { theme: "Cooperation & Patience", guidance: "Build alliances and refine details." },
        3: { theme: "Creative Expression & Joy", guidance: "Communicate, write, and network." },
        4: { theme: "Hard Work & System Building", guidance: "Focus on execution and discipline." },
        5: { theme: "Adaptability & Travel", guidance: "Embrace pivots and new tech." },
        6: { theme: "Family & Home Harmony", guidance: "Focus on domestic and artistic harmony." },
        7: { theme: "Introspection & Study", guidance: "Reflect, research, and meditate." },
        8: { theme: "Power & Wealth Execution", guidance: "Focus on business outcomes and legal clarity." },
        9: { theme: "Completion & Clearing", guidance: "Finish pending tasks and declutter." }
      };

      const mInfo = MONTH_THEMES[personalMonthNumber] || MONTH_THEMES[1];

      return {
        monthIndex: monthNum,
        monthName: mName,
        personalMonthNumber,
        theme: mInfo.theme,
        guidance: mInfo.guidance
      };
    });

    result.push({
      year: targetYear,
      personalYearNumber,
      ...baseData,
      monthlyBreakdown
    });
  }

  return result;
}
