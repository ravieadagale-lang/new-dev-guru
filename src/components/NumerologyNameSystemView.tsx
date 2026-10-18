// src/components/NumerologyNameSystemView.tsx
// Complete Name Numerology & Destiny System Component
// Built on Chapter Eight (Name Energy Theory) & Chapter Nine (Expression & Indian Destiny Numbers)

import React, { useState, useMemo, useEffect } from "react";
import { 
  Type, 
  Sparkles, 
  BookOpen, 
  ShieldAlert, 
  CheckCircle2, 
  Zap, 
  Compass, 
  Layers, 
  Briefcase, 
  Heart, 
  Coins, 
  Activity, 
  RefreshCw,
  Scale,
  Award,
  ArrowRight,
  Info,
  Flame,
  Building2,
  Baby,
  Users,
  Globe,
  Mail,
  Phone,
  AtSign,
  Smartphone,
  Calendar,
  Clock
} from "lucide-react";
import { NAME_ENERGY_THEORY } from "../data/numerologyNameTheory";
import { EXPRESSION_NUMBERS_DATABASE, getExpressionNumberAnalysis, ExpressionNumberAnalysis } from "../data/numerologyExpressionNumber";
import { DESTINY_NUMBERS_DATABASE, getDestinyNumberAnalysis, calculateDestinyNumber, calculateLifePathNumber, analyzeDestinyVsLifePath, DestinyNumberAnalysis } from "../data/numerologyDestinyNumber";
import { SOUL_URGE_THEORY, SOUL_URGE_DATABASE, getSoulUrgeAnalysis, SoulUrgeAnalysis } from "../data/numerologySoulUrge";
import { 
  PERSONALITY_INNER_DREAM_THEORY, 
  PERSONALITY_DATABASE, 
  INNER_DREAM_DATABASE, 
  CONSONANT_DETAILS, 
  getPersonalityAnalysis, 
  getInnerDreamAnalysis,
  PersonalityAnalysis,
  InnerDreamAnalysis 
} from "../data/numerologyPersonalityInnerDream";
import {
  FINER_DIMENSIONS_THEORY,
  HIDDEN_PASSION_DATABASE,
  CORNERSTONE_DATABASE,
  CAPSTONE_DATABASE,
  FIRST_VOWEL_DATABASE,
  calculateHiddenPassionNumber,
  findFirstVowel,
  getHiddenPassionAnalysis,
  getCornerstoneAnalysis,
  getCapstoneAnalysis,
  getFirstVowelAnalysis,
  HiddenPassionAnalysis,
  CornerstoneAnalysis,
  CapstoneAnalysis,
  FirstVowelAnalysis
} from "../data/numerologyFinerNameDimensions";
import {
  KARMIC_THEORY_DATA,
  KARMIC_LESSONS_DATABASE,
  MISSING_LETTERS_DATABASE,
  REPEATED_LETTERS_GUIDANCE,
  SUBCONSCIOUS_SELF_DATABASE,
  calculateKarmicLessons,
  calculateMissingLetters,
  calculateRepeatedLetters,
  calculateSubconsciousSelfNumber,
  getKarmicLessonAnalysis,
  getMissingLetterDetail,
  getSubconsciousSelfAnalysis,
  KarmicLessonAnalysis,
  MissingLetterDetail,
  RepeatedLetterDetail,
  SubconsciousSelfAnalysis
} from "../data/numerologyKarmicLessonsMissingLetters";
import {
  CHAPTER_FIFTEEN_THEORY_DATA,
  ACHIEVEMENT_DATABASE,
  BALANCE_DATABASE,
  BRIDGE_DATABASE,
  calculateAchievementNumber,
  calculateBalanceNumber,
  calculateBridgeNumber,
  getAchievementAnalysis,
  getBalanceAnalysis,
  getBridgeAnalysis,
  AchievementAnalysis,
  BalanceAnalysis,
  BridgeAnalysis
} from "../data/numerologyAchievementMinorBalanceBridge";
import {
  CHAPTER_SIXTEEN_THEORY_DATA,
  BUSINESS_NAME_DATABASE,
  CAUTIONARY_BUSINESS_COMPOUNDS,
  BABY_NAME_FOUR_PRINCIPLES,
  MARRIAGE_NAME_GUIDELINES,
  DIGITAL_NAME_GUIDELINES,
  analyzeBusinessName,
  analyzeBabyName,
  analyzeMarriageNameChange,
  analyzeDigitalIdentity,
  BusinessAnalysisResult,
  BabyAnalysisResult,
  MarriageAnalysisResult,
  DigitalAnalysisResult
} from "../data/numerologyAppliedNamesDomain";
import {
  CHAPTER_SEVENTEEN_THEORY_DATA,
  FIVE_CORRECTION_INDICATORS,
  CONTRAINDICATIONS,
  FOUR_CORRECTION_METHODS,
  CASE_STUDIES,
  diagnoseNameCorrectionNeeds,
  DiagnosticResult
} from "../data/numerologyNameCorrectionSystem";
import {
  CHAPTER_EIGHTEEN_THEORY_DATA,
  ALL_BIRTH_NUMBERS_DATABASE,
  getBirthNumberDetail,
  BirthNumberDetail,
  DISCLAIMER_FOOTER
} from "../data/numerologyBirthNumbers1to31";
import {
  CHAPTER_NINETEEN_THEORY_DATA,
  ALL_LIFE_PATH_DATABASE,
  calculateLifePathThreePart,
  getLifePathDetail,
  LifePathDetail
} from "../data/numerologyLifePathMasterKey";
import {
  CHAPTER_TWENTY_THEORY_DATA,
  ALL_PINNACLE_DATABASE,
  ALL_CHALLENGE_DATABASE,
  calculatePinnaclesAndChallenges,
  getPinnacleDetail,
  getChallengeDetail
} from "../data/numerologyPinnaclesAndChallenges";
import {
  CHAPTER_TWENTY_ONE_THEORY_DATA,
  ALL_PERSONAL_YEAR_DATABASE,
  ALL_PERSONAL_MONTH_DATABASE,
  calculatePersonalYear,
  calculatePersonalMonth,
  calculateFullYearMonthOverview,
  getPersonalYearDetail,
  getPersonalMonthDetail
} from "../data/numerologyPersonalYearMonth";
import {
  CHAPTER_TWENTY_TWO_THEORY_DATA,
  ALL_ESSENCE_DATABASE,
  CHALDEAN_LETTER_DURATIONS,
  calculateLifetimeTransitTimeline,
  getEssenceDetail,
  getChaldeanLetterInfo
} from "../data/numerologyEssenceTransit";
import {
  CHAPTER_TWENTY_THREE_THEORY_DATA,
  LIFE_PATH_COMPATIBILITY_PROFILES,
  analyzePairCompatibility,
  calculateMultiLayerCompatibility
} from "../data/numerologyCompatibility";
import { analyzeNameNumerologyDetailed } from "../data/numerologyNameMobileEngine";

type NameTab = 
  | "calculator" 
  | "life_path_master_key"
  | "life_path_theory"
  | "pinnacles_challenges_engine"
  | "pinnacles_challenges_theory"
  | "personal_year_month_engine"
  | "personal_year_month_theory"
  | "essence_transit_engine"
  | "essence_transit_theory"
  | "compatibility_engine"
  | "compatibility_theory"
  | "birth_numbers_1to31"
  | "birth_numbers_theory"
  | "name_correction_calculator"
  | "correction_case_studies"
  | "correction_theory"
  | "business_names"
  | "baby_names"
  | "marriage_names"
  | "digital_names"
  | "applied_theory"
  | "achievement_library"
  | "balance_library"
  | "bridge_library"
  | "chapter_fifteen_theory"
  | "karmic_lessons_library"
  | "missing_repeated_library"
  | "subconscious_self_library"
  | "karmic_theory"
  | "hidden_passion_library"
  | "cornerstone_capstone_library"
  | "first_vowel_library"
  | "personality_library" 
  | "inner_dream_library" 
  | "soul_urge_library" 
  | "expression_library" 
  | "destiny_library" 
  | "finer_dimensions_theory"
  | "consonant_theory" 
  | "name_energy_theory";

interface NumerologyNameSystemViewProps {
  initialName?: string;
  initialDob?: string;
  initialTab?: NameTab;
}

export const NumerologyNameSystemView: React.FC<NumerologyNameSystemViewProps> = ({
  initialName = "Aarav Sharma",
  initialDob = "1995-08-15",
  initialTab
}) => {
  const [inputName, setInputName] = useState<string>(initialName);
  const [inputDob, setInputDob] = useState<string>(initialDob);

  // Active Tab
  const [activeTab, setActiveTab] = useState<NameTab>(initialTab || "calculator");

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Chapter 19 Life Path State
  const [selectedLifePathNum, setSelectedLifePathNum] = useState<number>(1);

  // Chapter 20 Pinnacles & Challenges State
  const [selectedPinnacleNum, setSelectedPinnacleNum] = useState<number>(1);
  const [selectedChallengeNum, setSelectedChallengeNum] = useState<number>(1);

  // Chapter 21 Personal Year & Personal Month State
  const [selectedTargetYear, setSelectedTargetYear] = useState<number>(new Date().getFullYear());
  const [selectedPYLibNum, setSelectedPYLibNum] = useState<number>(1);
  const [selectedPMLibNum, setSelectedPMLibNum] = useState<number>(1);

  // Chapter 22 Essence & Transit State
  const [selectedEssenceLibNum, setSelectedEssenceLibNum] = useState<number>(1);
  const [selectedTransitLetter, setSelectedTransitLetter] = useState<string>("A");

  // Chapter 23 Compatibility State
  const [compPersonANum, setCompPersonANum] = useState<number>(1);
  const [compPersonBNum, setCompPersonBNum] = useState<number>(5);
  const [compSelectedProfileNum, setCompSelectedProfileNum] = useState<number>(1);

  // Chapter 18 Birth Numbers State
  const [selectedBirthDay, setSelectedBirthDay] = useState<number>(15);

  // Chapter 17 Name Correction State
  const [candidateCorrectionName, setCandidateCorrectionName] = useState<string>("Neerraj Bhattacharya");
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState<string>("neeraj");

  // Chapter 16 Applied Numerology State
  const [businessCandidate, setBusinessCandidate] = useState<string>("Apex Global Systems");
  const [businessFounderLP, setBusinessFounderLP] = useState<number>(8);
  const [selectedBusinessLibNum, setSelectedBusinessLibNum] = useState<number>(1);

  const [babyFirstNameCandidate, setBabyFirstNameCandidate] = useState<string>("Ananya");
  const [babySurnameCandidate, setBabySurnameCandidate] = useState<string>("Sharma");
  const [babyDobCandidate, setBabyDobCandidate] = useState<string>("2024-08-15");

  const [marriageFirstName, setMarriageFirstName] = useState<string>("Priya");
  const [marriageBirthSurname, setMarriageBirthSurname] = useState<string>("Sharma");
  const [marriageNewSurname, setMarriageNewSurname] = useState<string>("Mehta");

  const [digitalCategory, setDigitalCategory] = useState<"email" | "domain" | "handle" | "phone">("email");
  const [digitalInputText, setDigitalInputText] = useState<string>("ravieadagale");

  // Selection state for libraries
  const [selectedAchievementNum, setSelectedAchievementNum] = useState<number>(1);
  const [selectedBalanceNum, setSelectedBalanceNum] = useState<number>(1);
  const [selectedBridgeValue, setSelectedBridgeValue] = useState<number>(0);
  const [selectedKarmicLessonNum, setSelectedKarmicLessonNum] = useState<number>(1);
  const [selectedMissingLetter, setSelectedMissingLetter] = useState<string>("A");
  const [selectedSubconsciousScore, setSelectedSubconsciousScore] = useState<number>(6);
  const [selectedHiddenPassionNum, setSelectedHiddenPassionNum] = useState<number>(1);
  const [selectedCornerstoneLetter, setSelectedCornerstoneLetter] = useState<string>("A");
  const [selectedCapstoneLetter, setSelectedCapstoneLetter] = useState<string>("A");
  const [selectedFirstVowelLetter, setSelectedFirstVowelLetter] = useState<string>("A");
  const [selectedPersonalityNum, setSelectedPersonalityNum] = useState<number>(1);
  const [selectedInnerDreamNum, setSelectedInnerDreamNum] = useState<number>(1);
  const [selectedSoulUrgeNum, setSelectedSoulUrgeNum] = useState<number>(1);
  const [selectedExpressionNum, setSelectedExpressionNum] = useState<number>(1);
  const [selectedDestinyNum, setSelectedDestinyNum] = useState<number>(1);

  // Live Analysis Calculations
  const nameAnalysis = useMemo(() => {
    return analyzeNameNumerologyDetailed(inputName, inputDob);
  }, [inputName, inputDob]);

  const destinyVsLifePath = useMemo(() => {
    return analyzeDestinyVsLifePath(inputDob);
  }, [inputDob]);

  // Chapter 17 Calculations
  const liveCorrectionDiagnosis = useMemo(() => {
    return diagnoseNameCorrectionNeeds(inputName, inputDob);
  }, [inputName, inputDob]);

  const liveCandidateDiagnosis = useMemo(() => {
    return diagnoseNameCorrectionNeeds(candidateCorrectionName, inputDob);
  }, [candidateCorrectionName, inputDob]);

  // Chapter 16 Calculations
  const liveBusinessResult = useMemo(() => {
    return analyzeBusinessName(businessCandidate, businessFounderLP);
  }, [businessCandidate, businessFounderLP]);

  const liveBabyResult = useMemo(() => {
    const lpObj = calculateLifePathNumber(babyDobCandidate);
    return analyzeBabyName(babyFirstNameCandidate, babySurnameCandidate, lpObj.lifePathNumber);
  }, [babyFirstNameCandidate, babySurnameCandidate, babyDobCandidate]);

  const liveMarriageResult = useMemo(() => {
    return analyzeMarriageNameChange(marriageFirstName, marriageBirthSurname, marriageNewSurname);
  }, [marriageFirstName, marriageBirthSurname, marriageNewSurname]);

  const liveDigitalResult = useMemo(() => {
    return analyzeDigitalIdentity(digitalInputText, digitalCategory);
  }, [digitalInputText, digitalCategory]);

  // Chapter 15 Calculations
  const liveBirthDayDigit = useMemo(() => {
    const day = Number(inputDob.split("-")[2]) || 15;
    return day;
  }, [inputDob]);

  const liveAchievementNum = useMemo(() => {
    return calculateAchievementNumber(liveBirthDayDigit, nameAnalysis.expressionNumber);
  }, [liveBirthDayDigit, nameAnalysis.expressionNumber]);

  const liveBalanceNum = useMemo(() => {
    return calculateBalanceNumber(inputName);
  }, [inputName]);

  const liveBridgeExprSoul = useMemo(() => {
    return calculateBridgeNumber(nameAnalysis.expressionNumber, nameAnalysis.heartDesireSoulNumber);
  }, [nameAnalysis.expressionNumber, nameAnalysis.heartDesireSoulNumber]);

  const liveBridgeExprLP = useMemo(() => {
    return calculateBridgeNumber(nameAnalysis.expressionNumber, destinyVsLifePath.lifePathNumber);
  }, [nameAnalysis.expressionNumber, destinyVsLifePath.lifePathNumber]);

  const liveBridgeSoulPers = useMemo(() => {
    return calculateBridgeNumber(nameAnalysis.heartDesireSoulNumber, nameAnalysis.personalityNumberInnerDream);
  }, [nameAnalysis.heartDesireSoulNumber, nameAnalysis.personalityNumberInnerDream]);

  // Chapter 12 & 13 Calculations
  const liveHiddenPassionNum = useMemo(() => {
    return calculateHiddenPassionNumber(inputName);
  }, [inputName]);

  const liveFirstVowel = useMemo(() => {
    return findFirstVowel(inputName);
  }, [inputName]);

  const liveKarmicLessons = useMemo(() => {
    return calculateKarmicLessons(inputName);
  }, [inputName]);

  const liveMissingLetters = useMemo(() => {
    return calculateMissingLetters(inputName);
  }, [inputName]);

  const liveRepeatedLetters = useMemo(() => {
    return calculateRepeatedLetters(inputName);
  }, [inputName]);

  const liveSubconsciousScore = useMemo(() => {
    return calculateSubconsciousSelfNumber(inputName);
  }, [inputName]);

  const currentSubconsciousAnalysis = getSubconsciousSelfAnalysis(liveSubconsciousScore);

  // Expression, Soul Urge, Personality, Inner Dream, Destiny & Finer analysis for active name
  const currentExpressionAnalysis: ExpressionNumberAnalysis = getExpressionNumberAnalysis(nameAnalysis.expressionNumber);
  const currentSoulUrgeAnalysis: SoulUrgeAnalysis = getSoulUrgeAnalysis(nameAnalysis.heartDesireSoulNumber);
  const currentPersonalityAnalysis: PersonalityAnalysis = getPersonalityAnalysis(nameAnalysis.personalityNumberInnerDream);
  const currentInnerDreamAnalysis: InnerDreamAnalysis = getInnerDreamAnalysis(nameAnalysis.personalityNumberInnerDream);
  const currentDestinyAnalysis: DestinyNumberAnalysis = getDestinyNumberAnalysis(destinyVsLifePath.destinyNumber);

  const currentHiddenPassionAnalysis: HiddenPassionAnalysis = getHiddenPassionAnalysis(liveHiddenPassionNum);
  const currentCornerstoneAnalysis: CornerstoneAnalysis = getCornerstoneAnalysis(nameAnalysis.cornerstone);
  const currentCapstoneAnalysis: CapstoneAnalysis = getCapstoneAnalysis(nameAnalysis.capstone);
  const currentFirstVowelAnalysis: FirstVowelAnalysis = getFirstVowelAnalysis(liveFirstVowel);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-purple-100 p-8 rounded-3xl border border-purple-500/20 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-8 -translate-y-8">
          <Type className="w-96 h-96 text-purple-400" />
        </div>

        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 tracking-widest uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Complete Name Numerology System • Chapters 8 through 13</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-purple-100 tracking-tight">
            Name Energy, Destiny, Karmic Lessons & Crisis Response Engine
          </h2>
          <p className="text-sm text-purple-200/80 font-serif italic">
            "{KARMIC_THEORY_DATA.quote.text}" — <span className="not-italic text-amber-300">{KARMIC_THEORY_DATA.quote.author}</span>
          </p>

          <p className="text-xs text-purple-100/90 leading-relaxed">
            Your birth name encodes your vibrational architecture. Discover your <strong>Karmic Lessons (Missing Numbers)</strong>, <strong>Missing & Repeated Letters</strong>, <strong>Subconscious Self Number (Crisis Response)</strong>, <strong>Personality & Inner Dream</strong>, <strong>Expression & Destiny Numbers</strong>.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-start gap-2 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none">
        {[
          { id: "calculator", label: "Live Calculator & System Bridge", icon: Compass },
          { id: "life_path_master_key", label: "Life Path Master Key", icon: Compass },
          { id: "life_path_theory", label: "Life Path Theory", icon: BookOpen },
          { id: "pinnacles_challenges_engine", label: "Pinnacles & Challenges Engine", icon: Layers },
          { id: "pinnacles_challenges_theory", label: "Pinnacles & Challenges Theory", icon: BookOpen },
          { id: "personal_year_month_engine", label: "Personal Year & Month Engine", icon: Clock },
          { id: "personal_year_month_theory", label: "Personal Year & Month Theory", icon: BookOpen },
          { id: "essence_transit_engine", label: "Essence & Transit Engine", icon: Activity },
          { id: "essence_transit_theory", label: "Essence & Transit Theory", icon: BookOpen },
          { id: "compatibility_engine", label: "Compatibility Matrix Engine", icon: Users },
          { id: "compatibility_theory", label: "Compatibility Theory", icon: BookOpen },
          { id: "birth_numbers_1to31", label: "Birth Numbers (1-31 Depth)", icon: Calendar },
          { id: "birth_numbers_theory", label: "Birth Numbers Theory", icon: BookOpen },
          { id: "name_correction_calculator", label: "Name Correction Evaluator", icon: RefreshCw },
          { id: "correction_case_studies", label: "Case Studies (Verified)", icon: ShieldAlert },
          { id: "correction_theory", label: "Name Correction Theory", icon: BookOpen },
          { id: "business_names", label: "Business Name Numerology", icon: Building2 },
          { id: "baby_names", label: "Baby Name Numerology", icon: Baby },
          { id: "marriage_names", label: "Marriage Name Numerology", icon: Users },
          { id: "digital_names", label: "Digital Identity (Email, Domain, Phone)", icon: Globe },
          { id: "applied_theory", label: "Applied Names Theory", icon: BookOpen },
          { id: "achievement_library", label: "Achievement Number", icon: Award },
          { id: "balance_library", label: "Balance Number (Crisis Style)", icon: Activity },
          { id: "bridge_library", label: "Bridge Numbers (Gaps)", icon: Compass },
          { id: "chapter_fifteen_theory", label: "Engagement Theory", icon: BookOpen },
          { id: "karmic_lessons_library", label: "Karmic Lessons (Gaps)", icon: ShieldAlert },
          { id: "missing_repeated_library", label: "Missing & Repeated Letters", icon: Layers },
          { id: "subconscious_self_library", label: "Subconscious Self (Crisis)", icon: Activity },
          { id: "karmic_theory", label: "Karmic & Missing Theory", icon: BookOpen },
          { id: "hidden_passion_library", label: "Hidden Passion (Intensity)", icon: Zap },
          { id: "cornerstone_capstone_library", label: "Cornerstone & Capstone", icon: Layers },
          { id: "first_vowel_library", label: "First Vowel (Gut Reaction)", icon: Flame },
          { id: "personality_library", label: "Personality Numbers", icon: ShieldAlert },
          { id: "inner_dream_library", label: "Inner Dream", icon: Sparkles },
          { id: "soul_urge_library", label: "Soul Urge", icon: Heart },
          { id: "expression_library", label: "Expression", icon: Type },
          { id: "destiny_library", label: "Indian Destiny", icon: Award },
          { id: "finer_dimensions_theory", label: "Finer Dimensions Theory", icon: BookOpen },
          { id: "consonant_theory", label: "Consonant Physics Theory", icon: Activity },
          { id: "name_energy_theory", label: "Name Energy Theory", icon: Info }
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as NameTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-medium text-xs whitespace-nowrap transition-all ${
                isSelected
                  ? "bg-slate-900 text-amber-300 shadow-md font-bold"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: LIVE NAME & SOUL URGE CALCULATOR */}
      {activeTab === "calculator" && (
        <div className="space-y-8">
          {/* Input Panel */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Type className="w-5 h-5 text-purple-600" />
              Analyze Birth Name & Vowel Energy Signature
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Full Original Birth Name
                </label>
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                />
                <span className="text-[11px] text-slate-500">
                  Use exact full birth name as officially recorded.
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Date of Birth (DD-MM-YYYY)
                </label>
                <input
                  type="date"
                  value={inputDob}
                  onChange={(e) => setInputDob(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                />
                <span className="text-[11px] text-slate-500">
                  Used for Indian Destiny Number (Direct Sum) & Life Path.
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Soul Urge Card (Chapter 10) */}
            <div className="bg-gradient-to-br from-rose-950 via-rose-900 to-slate-900 text-white p-5 rounded-3xl space-y-2 shadow-md border border-rose-800/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">Soul Urge (Vowels)</span>
                <span className="text-2xl font-serif font-bold text-amber-300">{nameAnalysis.heartDesireSoulNumber}</span>
              </div>
              <h4 className="font-bold text-sm text-rose-100">{currentSoulUrgeAnalysis.title}</h4>
              <p className="text-xs text-rose-200/80 line-clamp-2">{currentSoulUrgeAnalysis.soulHunger}</p>
            </div>

            {/* Expression Number Card (Chapter 9) */}
            <div className="bg-gradient-to-br from-purple-900 to-slate-900 text-white p-5 rounded-3xl space-y-2 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">Chaldean Expression</span>
                <span className="text-2xl font-serif font-bold text-amber-300">{nameAnalysis.chaldeanCompound}/{nameAnalysis.expressionNumber}</span>
              </div>
              <h4 className="font-bold text-sm text-purple-100">{currentExpressionAnalysis.title}</h4>
              <p className="text-xs text-purple-200/80 line-clamp-2">{currentExpressionAnalysis.callingDefinition}</p>
            </div>

            {/* Personality Card (Consonants) */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-5 rounded-3xl space-y-2 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Personality (Consonants)</span>
                <span className="text-2xl font-serif font-bold text-indigo-300">{nameAnalysis.personalityNumberInnerDream}</span>
              </div>
              <h4 className="font-bold text-sm text-indigo-100">Outer Social Mask</h4>
              <p className="text-xs text-indigo-200/80 line-clamp-2">Calculated from consonants (structure of language) revealing public first impression.</p>
            </div>

            {/* Indian Destiny Card */}
            <div className="bg-gradient-to-br from-amber-900 to-slate-900 text-white p-5 rounded-3xl space-y-2 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Indian Destiny (Terrain)</span>
                <span className="text-2xl font-serif font-bold text-amber-300">{destinyVsLifePath.destinyCompound}/{destinyVsLifePath.destinyNumber}</span>
              </div>
              <h4 className="font-bold text-sm text-amber-100">{currentDestinyAnalysis.title}</h4>
              <p className="text-xs text-amber-200/80 line-clamp-2">{currentDestinyAnalysis.outerCircumstances}</p>
            </div>
          </div>

          {/* THE BRIDGE: SOUL URGE VS EXPRESSION NUMBER INTEGRATION */}
          <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-rose-950 text-white p-6 sm:p-8 rounded-3xl space-y-6 shadow-lg border border-purple-500/30">
            <div className="flex items-center gap-3 border-b border-purple-800/60 pb-4">
              <Flame className="w-6 h-6 text-rose-400" />
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Chapter Ten Integration</span>
                <h3 className="font-serif text-2xl font-bold text-purple-100">
                  The Bridge Between Soul Urge ({nameAnalysis.heartDesireSoulNumber}) & Expression Number ({nameAnalysis.expressionNumber})
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
              <div className="bg-purple-900/40 p-5 rounded-2xl border border-purple-700/50 space-y-2">
                <span className="font-bold text-amber-300 block uppercase tracking-wider">
                  Expression {nameAnalysis.expressionNumber}: What You Are Built To Do (Vocation & Destiny)
                </span>
                <p className="text-purple-100">{currentExpressionAnalysis.callingDefinition}</p>
              </div>

              <div className="bg-rose-900/40 p-5 rounded-2xl border border-rose-700/50 space-y-2">
                <span className="font-bold text-rose-300 block uppercase tracking-wider">
                  Soul Urge {nameAnalysis.heartDesireSoulNumber}: What You Most Deeply Need (Heart's Hunger)
                </span>
                <p className="text-rose-100">{currentSoulUrgeAnalysis.soulHunger}</p>
              </div>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-700/80 space-y-2 text-xs">
              <span className="text-amber-400 font-bold block uppercase tracking-wider">Integration Key:</span>
              <p className="text-slate-200 italic">
                "{SOUL_URGE_THEORY.expressionVsSoulUrge.integrationGoal}"
              </p>
              <p className="text-slate-300 pt-1">
                {nameAnalysis.heartDesireSoulNumber === nameAnalysis.expressionNumber
                  ? `Your Soul Urge and Expression Number are both ${nameAnalysis.heartDesireSoulNumber}. This produces an extraordinary state of Natural Inner Coherence: what you are built to do (calling) and what your heart hungers for (inner need) are completely aligned.`
                  : `Your Soul Urge (${nameAnalysis.heartDesireSoulNumber}) and Expression Number (${nameAnalysis.expressionNumber}) are different. To experience true fulfillment, shape your work (${currentExpressionAnalysis.title}) so that it satisfies your heart's private hunger (${currentSoulUrgeAnalysis.title}).`}
              </p>
            </div>
          </div>

          {/* Detailed Soul Urge Breakdown (Chapter 10) */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-widest block font-sans">Heart's Desire Deep Analysis</span>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Soul Urge {currentSoulUrgeAnalysis.number} — {currentSoulUrgeAnalysis.title}
                </h3>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {currentSoulUrgeAnalysis.keywords.map((kw, i) => (
                  <span key={i} className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Definition & Soul Hunger */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-rose-600" />
                  What the Soul Hungers For
                </h4>
                <div className="text-xs text-slate-700 leading-relaxed bg-rose-50/50 p-4 rounded-2xl border border-rose-100 font-medium space-y-2">
                  <p>{currentSoulUrgeAnalysis.soulHunger}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-600" />
                  Core Definition & Meaning
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {currentSoulUrgeAnalysis.definition}
                </p>
              </div>
            </div>

            {/* Fulfilled vs Unfulfilled States */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200 space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  When This Soul Desire Is Fulfilled
                </h4>
                <div className="text-xs text-emerald-950 leading-relaxed space-y-2">
                  <p>{currentSoulUrgeAnalysis.whenFulfilled}</p>
                </div>
              </div>

              <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-200 space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  When This Soul Desire Is Unfulfilled
                </h4>
                <div className="text-xs text-rose-950 leading-relaxed space-y-2">
                  <p>{currentSoulUrgeAnalysis.whenUnfulfilled}</p>
                </div>
              </div>
            </div>

            {/* Relationships, Work, Spiritual Lesson */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>Relationships & Love</span>
                </div>
                <p className="text-[11px] text-slate-700">{currentSoulUrgeAnalysis.relationshipsAndLove.traits}</p>
                <div className="pt-2 border-t border-slate-200 text-[10px] text-rose-950 font-medium">
                  <strong>Growth Edge:</strong> {currentSoulUrgeAnalysis.relationshipsAndLove.growthEdge}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                  <Briefcase className="w-4 h-4 text-indigo-500" />
                  <span>Work & Environment</span>
                </div>
                <p className="text-[11px] text-slate-700">{currentSoulUrgeAnalysis.careerAndWork.requiredEnvironment}</p>
                <div className="pt-2 border-t border-slate-200 text-[10px] text-indigo-950 font-medium">
                  <strong>Key Question:</strong> "{currentSoulUrgeAnalysis.careerAndWork.motivatingQuestion}"
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span>Spiritual Lesson</span>
                </div>
                <p className="text-[11px] text-slate-700 italic">"{currentSoulUrgeAnalysis.spiritualLesson}"</p>
              </div>
            </div>

            {/* Practical Guidance */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Practical Development Guidance for Soul Urge {currentSoulUrgeAnalysis.number}</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentSoulUrgeAnalysis.practicalGuidance.map((guide, idx) => (
                  <div key={idx} className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-xs text-slate-200">
                    {guide}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CHAPTER 11: PERSONALITY NUMBER & INNER DREAM ANALYSIS */}
          <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white p-6 sm:p-8 rounded-3xl space-y-8 shadow-xl border border-indigo-500/30">
            <div className="flex items-center justify-between border-b border-indigo-800/60 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block font-sans">Chapter Eleven • Consonant Physics</span>
                <h3 className="font-serif text-2xl font-bold text-indigo-100">
                  Outer Persona ({currentPersonalityAnalysis.number}) & Inner Dream ({currentInnerDreamAnalysis.number}) Analysis
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-indigo-200 block font-mono">Consonants Value: {nameAnalysis.personalityNumberInnerDream}</span>
                <span className="text-[11px] text-amber-300 font-bold">Consonants = Architectural Mask & Secret Self</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personality Section */}
              <div className="bg-slate-900/80 p-6 rounded-2xl border border-indigo-700/50 space-y-4">
                <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
                  <div>
                    <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block">The Outer Social Mask</span>
                    <h4 className="font-serif text-xl font-bold text-indigo-100">
                      Personality {currentPersonalityAnalysis.number} — {currentPersonalityAnalysis.title}
                    </h4>
                  </div>
                  <span className="text-2xl font-serif font-bold text-indigo-300">{currentPersonalityAnalysis.number}</span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">First Impression & Outer Field:</span>
                  <div className="text-xs text-indigo-100/90 leading-relaxed space-y-2 bg-indigo-950/50 p-4 rounded-xl border border-indigo-800/40">
                    {currentPersonalityAnalysis.firstImpressionParagraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-rose-300 uppercase tracking-wider block">The Gap Between Outer and Inner:</span>
                  <div className="text-xs text-rose-100/90 leading-relaxed space-y-2 bg-rose-950/30 p-4 rounded-xl border border-rose-800/40">
                    {currentPersonalityAnalysis.gapParagraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-indigo-800/60">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Practical Guidance:</span>
                  <ul className="space-y-1.5 text-xs text-indigo-200">
                    {currentPersonalityAnalysis.practicalGuidance.map((g, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Inner Dream Section */}
              <div className="bg-slate-900/80 p-6 rounded-2xl border border-purple-700/50 space-y-4">
                <div className="flex items-center justify-between border-b border-purple-800/60 pb-3">
                  <div>
                    <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider block">The Private Secret Self</span>
                    <h4 className="font-serif text-xl font-bold text-purple-100">
                      Inner Dream {currentInnerDreamAnalysis.number} — {currentInnerDreamAnalysis.title}
                    </h4>
                  </div>
                  <span className="text-2xl font-serif font-bold text-amber-300">{currentInnerDreamAnalysis.number}</span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">The Secret Self-Image & Fantasy:</span>
                  <div className="text-xs text-purple-100/90 leading-relaxed space-y-2 bg-purple-950/50 p-4 rounded-xl border border-purple-800/40">
                    {currentInnerDreamAnalysis.secretSelfParagraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block">Flash of Recognition:</span>
                  <p className="text-xs text-purple-200 leading-relaxed bg-purple-900/30 p-4 rounded-xl border border-purple-800/40 italic">
                    "{currentInnerDreamAnalysis.recognitionFlash}"
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-purple-800/60">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Unlived Potential Integration:</span>
                  <ul className="space-y-1.5 text-xs text-purple-200">
                    {currentInnerDreamAnalysis.consultationIntegration.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CHAPTER 12: FINER DIMENSIONS (HIDDEN PASSION, CORNERSTONE, CAPSTONE & FIRST VOWEL) */}
          <div className="bg-gradient-to-br from-amber-950 via-slate-900 to-amber-950 text-amber-50 p-6 sm:p-8 rounded-3xl space-y-8 shadow-xl border border-amber-500/30">
            <div className="flex items-center justify-between border-b border-amber-800/60 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block font-sans">Chapter Twelve • Finer Dimensions</span>
                <h3 className="font-serif text-2xl font-bold text-amber-100">
                  Hidden Passion ({currentHiddenPassionAnalysis.number}), Cornerstone ({currentCornerstoneAnalysis.letter}), Capstone ({currentCapstoneAnalysis.letter}) & First Vowel ({currentFirstVowelAnalysis.letter})
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-amber-200 block font-mono">Focused Energy & Arc of Action</span>
                <span className="text-[11px] text-amber-300 font-bold">Concentration, Openings, Closures & Defaults</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Hidden Passion Card */}
              <div className="bg-slate-900/80 p-5 rounded-2xl border border-amber-700/50 space-y-3">
                <div className="flex items-center justify-between border-b border-amber-800/50 pb-2">
                  <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">Hidden Passion</span>
                  <span className="text-xl font-serif font-bold text-amber-400">{currentHiddenPassionAnalysis.number}</span>
                </div>
                <h4 className="font-serif text-base font-bold text-amber-100">{currentHiddenPassionAnalysis.title}</h4>
                <p className="text-xs text-amber-100/90 leading-relaxed bg-amber-950/40 p-3 rounded-xl border border-amber-800/30">
                  {currentHiddenPassionAnalysis.definition}
                </p>
                <div className="text-[11px] text-amber-200 space-y-1">
                  <strong>Soul Intensity:</strong>
                  <p>{currentHiddenPassionAnalysis.soulIntensity}</p>
                </div>
              </div>

              {/* Cornerstone Card */}
              <div className="bg-slate-900/80 p-5 rounded-2xl border border-indigo-700/50 space-y-3">
                <div className="flex items-center justify-between border-b border-indigo-800/50 pb-2">
                  <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block">Cornerstone (Start)</span>
                  <span className="text-xl font-serif font-bold text-indigo-300">{currentCornerstoneAnalysis.letter}</span>
                </div>
                <h4 className="font-serif text-base font-bold text-indigo-100">{currentCornerstoneAnalysis.title}</h4>
                <p className="text-xs text-indigo-100/90 leading-relaxed bg-indigo-950/40 p-3 rounded-xl border border-indigo-800/30">
                  {currentCornerstoneAnalysis.approachToBeginning}
                </p>
                <div className="text-[11px] text-indigo-200 font-mono">
                  Chaldean: {currentCornerstoneAnalysis.chaldeanValue} | Pythag: {currentCornerstoneAnalysis.pythagoreanValue} ({currentCornerstoneAnalysis.elementalType})
                </div>
              </div>

              {/* Capstone Card */}
              <div className="bg-slate-900/80 p-5 rounded-2xl border border-purple-700/50 space-y-3">
                <div className="flex items-center justify-between border-b border-purple-800/50 pb-2">
                  <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider block">Capstone (Completion)</span>
                  <span className="text-xl font-serif font-bold text-purple-300">{currentCapstoneAnalysis.letter}</span>
                </div>
                <h4 className="font-serif text-base font-bold text-purple-100">{currentCapstoneAnalysis.title}</h4>
                <p className="text-xs text-purple-100/90 leading-relaxed bg-purple-950/40 p-3 rounded-xl border border-purple-800/30">
                  {currentCapstoneAnalysis.completionStyle}
                </p>
                <div className="text-[11px] text-purple-200 font-mono">
                  Chaldean: {currentCapstoneAnalysis.chaldeanValue} | Pythag: {currentCapstoneAnalysis.pythagoreanValue}
                </div>
              </div>

              {/* First Vowel Card */}
              <div className="bg-slate-900/80 p-5 rounded-2xl border border-rose-700/50 space-y-3">
                <div className="flex items-center justify-between border-b border-rose-800/50 pb-2">
                  <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider block">First Vowel (Gut Reaction)</span>
                  <span className="text-xl font-serif font-bold text-rose-300">{currentFirstVowelAnalysis.letter}</span>
                </div>
                <h4 className="font-serif text-base font-bold text-rose-100">{currentFirstVowelAnalysis.title}</h4>
                <p className="text-xs text-rose-100/90 leading-relaxed bg-rose-950/40 p-3 rounded-xl border border-rose-800/30">
                  {currentFirstVowelAnalysis.emotionalDefault}
                </p>
                <div className="text-[11px] text-rose-200 space-y-1">
                  <strong>Strength:</strong>
                  <p>{currentFirstVowelAnalysis.strength}</p>
                </div>
              </div>
            </div>
          </div>

          {/* CHAPTER 13: KARMIC LESSONS, MISSING LETTERS, REPEATED LETTERS & SUBCONSCIOUS SELF */}
          <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 text-purple-50 p-6 sm:p-8 rounded-3xl space-y-8 shadow-xl border border-purple-500/30">
            <div className="flex items-center justify-between border-b border-purple-800/60 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block font-sans">Chapter Thirteen • Karmic Lessons & Crisis Resources</span>
                <h3 className="font-serif text-2xl font-bold text-purple-100">
                  Karmic Lessons, Missing/Repeated Letters & Subconscious Self ({liveSubconsciousScore}/9)
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-purple-200 block font-mono">Gaps, Concentrations & Crisis Physics</span>
                <span className="text-[11px] text-amber-300 font-bold">Soul Education & Automatic Response</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Karmic Lessons Card */}
              <div className="bg-slate-900/80 p-5 rounded-2xl border border-rose-700/50 space-y-3">
                <div className="flex items-center justify-between border-b border-rose-800/50 pb-2">
                  <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider block">Karmic Lessons (Gaps)</span>
                  <span className="text-xs font-mono font-bold text-rose-400">
                    {liveKarmicLessons.length ? liveKarmicLessons.join(", ") : "None (All Present)"}
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-rose-100">
                  {liveKarmicLessons.length ? `${liveKarmicLessons.length} Karmic Lesson(s) Identified` : "Fully Balanced Name Field"}
                </h4>
                <div className="text-xs text-rose-100/90 leading-relaxed bg-rose-950/40 p-3 rounded-xl border border-rose-800/30 space-y-2">
                  {liveKarmicLessons.length ? (
                    liveKarmicLessons.map((num) => {
                      const kl = getKarmicLessonAnalysis(num);
                      return (
                        <div key={num} className="border-b border-rose-800/30 pb-2 last:border-b-0 last:pb-0">
                          <strong className="text-amber-300">Lesson {num}:</strong> {kl.title}
                          <p className="text-[11px] text-rose-200/80 italic">{kl.coreCurriculum}</p>
                        </div>
                      );
                    })
                  ) : (
                    <p>All Pythagorean digits 1-9 are represented at least once in your birth name. No primary numerical gaps exist.</p>
                  )}
                </div>
              </div>

              {/* Missing Letters Card */}
              <div className="bg-slate-900/80 p-5 rounded-2xl border border-amber-700/50 space-y-3">
                <div className="flex items-center justify-between border-b border-amber-800/50 pb-2">
                  <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">Missing Letters</span>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {liveMissingLetters.length} Letters Absent
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-amber-100">Absent Vibrational Qualities</h4>
                <div className="text-xs text-amber-100/90 leading-relaxed bg-amber-950/40 p-3 rounded-xl border border-amber-800/30 max-h-36 overflow-y-auto scrollbar-thin space-y-1">
                  <p className="font-mono text-amber-300 font-bold">{liveMissingLetters?.join(", ") || "None"}</p>
                  <p className="text-[11px] text-amber-200/80">
                    These specific letters are absent from your full birth name, requiring conscious development of their underlying traits.
                  </p>
                </div>
              </div>

              {/* Repeated Letters Card */}
              <div className="bg-slate-900/80 p-5 rounded-2xl border border-indigo-700/50 space-y-3">
                <div className="flex items-center justify-between border-b border-indigo-800/50 pb-2">
                  <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block">Repeated Letters</span>
                  <span className="text-xs font-mono font-bold text-indigo-300">
                    {Object.keys(liveRepeatedLetters).length} Concentrated
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-indigo-100">Concentrated Energy Frequencies</h4>
                <div className="text-xs text-indigo-100/90 leading-relaxed bg-indigo-950/40 p-3 rounded-xl border border-indigo-800/30 max-h-36 overflow-y-auto scrollbar-thin space-y-2">
                  {Object.entries(liveRepeatedLetters).length ? (
                    Object.entries(liveRepeatedLetters).map(([ltr, count]) => (
                      <div key={ltr} className="flex items-center justify-between border-b border-indigo-800/30 pb-1 last:border-b-0">
                        <span>Letter <strong>{ltr}</strong>:</span>
                        <span className="font-mono text-amber-300 font-bold">{count}x times</span>
                      </div>
                    ))
                  ) : (
                    <p>No individual letter appears 2 or more times in your birth name.</p>
                  )}
                </div>
              </div>

              {/* Subconscious Self Number Card */}
              <div className="bg-slate-900/80 p-5 rounded-2xl border border-purple-700/50 space-y-3">
                <div className="flex items-center justify-between border-b border-purple-800/50 pb-2">
                  <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider block">Subconscious Self</span>
                  <span className="text-xl font-serif font-bold text-amber-300">{liveSubconsciousScore} / 9</span>
                </div>
                <h4 className="font-serif text-base font-bold text-purple-100">{currentSubconsciousAnalysis.title}</h4>
                <p className="text-xs text-purple-100/90 leading-relaxed bg-purple-950/40 p-3 rounded-xl border border-purple-800/30">
                  {currentSubconsciousAnalysis.operationalPsychology}
                </p>
              </div>
            </div>
          </div>

          {/* CHAPTER 15: ACHIEVEMENT NUMBER, BALANCE NUMBER & BRIDGE NUMBERS */}
          <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-indigo-50 p-6 sm:p-8 rounded-3xl space-y-8 shadow-xl border border-indigo-500/30">
            <div className="flex items-center justify-between border-b border-indigo-800/60 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block font-sans">Chapter Fifteen • Engagement Architecture</span>
                <h3 className="font-serif text-2xl font-bold text-indigo-100">
                  Achievement, Balance & Bridge Integration Engine
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-indigo-200 block font-mono">Enduring Contribution & Crisis Equilibrium</span>
                <span className="text-[11px] text-amber-300 font-bold">Integration Gaps & Legacy Physics</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Achievement Number Card */}
              {(() => {
                const ach = getAchievementAnalysis(liveAchievementNum);
                return (
                  <div className="bg-slate-900/80 p-5 rounded-2xl border border-amber-500/40 space-y-3">
                    <div className="flex items-center justify-between border-b border-amber-800/50 pb-2">
                      <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">Achievement Number</span>
                      <span className="text-xl font-serif font-bold text-amber-300">{liveAchievementNum}</span>
                    </div>
                    <h4 className="font-serif text-base font-bold text-amber-100">{ach.title}</h4>
                    <div className="text-xs text-amber-100/90 leading-relaxed bg-amber-950/40 p-3 rounded-xl border border-amber-800/30 space-y-2">
                      <p><strong>Domain:</strong> {ach.domainOfContribution}</p>
                      <p className="text-[11px] text-amber-200/80"><strong>Legacy Style:</strong> {ach.legacyStyle}</p>
                    </div>
                  </div>
                );
              })()}

              {/* Balance Number Card */}
              {(() => {
                const bal = getBalanceAnalysis(liveBalanceNum);
                return (
                  <div className="bg-slate-900/80 p-5 rounded-2xl border border-indigo-500/40 space-y-3">
                    <div className="flex items-center justify-between border-b border-indigo-800/50 pb-2">
                      <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block">Balance Number</span>
                      <span className="text-xl font-serif font-bold text-indigo-300">{liveBalanceNum}</span>
                    </div>
                    <h4 className="font-serif text-base font-bold text-indigo-100">{bal.title}</h4>
                    <div className="text-xs text-indigo-100/90 leading-relaxed bg-indigo-950/40 p-3 rounded-xl border border-indigo-800/30 space-y-2">
                      <p><strong>Crisis Style:</strong> {bal.crisisNavigationStyle}</p>
                      <p className="text-[11px] text-indigo-200/80"><strong>Strengths:</strong> {bal.strengthsUnderPressure}</p>
                    </div>
                  </div>
                );
              })()}

              {/* Bridge Numbers Card */}
              <div className="bg-slate-900/80 p-5 rounded-2xl border border-purple-500/40 space-y-3">
                <div className="flex items-center justify-between border-b border-purple-800/50 pb-2">
                  <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider block">Core Bridge Gaps</span>
                  <span className="text-xs font-mono font-bold text-amber-300">Expr | Soul | LP</span>
                </div>
                <h4 className="font-serif text-base font-bold text-purple-100">Core Number Bridges</h4>
                <div className="text-xs text-purple-100/90 leading-relaxed bg-purple-950/40 p-3 rounded-xl border border-purple-800/30 space-y-2">
                  <div className="border-b border-purple-800/30 pb-1">
                    <span className="text-amber-300 font-bold">Expr → Soul Urge:</span> Bridge {liveBridgeExprSoul} ({getBridgeAnalysis(liveBridgeExprSoul).title})
                  </div>
                  <div className="border-b border-purple-800/30 pb-1">
                    <span className="text-amber-300 font-bold">Expr → Life Path:</span> Bridge {liveBridgeExprLP} ({getBridgeAnalysis(liveBridgeExprLP).title})
                  </div>
                  <div>
                    <span className="text-amber-300 font-bold">Soul → Personality:</span> Bridge {liveBridgeSoulPers} ({getBridgeAnalysis(liveBridgeSoulPers).title})
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: ACHIEVEMENT NUMBER LIBRARY */}
      {activeTab === "achievement_library" && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-3xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Select Achievement Number to Study Domain of Legacy & Contribution:
            </span>
            <div className="grid grid-cols-4 sm:grid-cols-12 gap-1.5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].map((num) => {
                const item = getAchievementAnalysis(num);
                const isSelected = num === selectedAchievementNum;
                return (
                  <button
                    key={num}
                    onClick={() => setSelectedAchievementNum(num)}
                    className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                      isSelected
                        ? "bg-amber-950 text-amber-300 border-amber-950 shadow-md scale-105 font-bold"
                        : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-amber-50"
                    }`}
                  >
                    <span className="font-serif text-lg">{num}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Achievement Analysis */}
          {(() => {
            const ach = getAchievementAnalysis(selectedAchievementNum);
            return (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">Chapter Fifteen • Achievement Number Library</span>
                    <h3 className="font-serif text-2xl font-bold text-slate-900">
                      Achievement Number {ach.number} — {ach.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {ach.keywords.map((kw, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-100 space-y-2">
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-600" />
                      Domain of Greatest Contribution
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {ach.domainOfContribution}
                    </p>
                  </div>

                  <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100 space-y-2">
                    <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      Legacy Style & Impact
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {ach.legacyStyle}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-serif">
                    Detailed Legacy & Achievement Analysis
                  </h4>
                  <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                    {ach.detailedParagraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB: BALANCE NUMBER LIBRARY */}
      {activeTab === "balance_library" && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-3xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Select Balance Number to Study Crisis Navigation Style:
            </span>
            <div className="grid grid-cols-4 sm:grid-cols-12 gap-1.5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].map((num) => {
                const item = getBalanceAnalysis(num);
                const isSelected = num === selectedBalanceNum;
                return (
                  <button
                    key={num}
                    onClick={() => setSelectedBalanceNum(num)}
                    className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                      isSelected
                        ? "bg-indigo-950 text-indigo-200 border-indigo-950 shadow-md scale-105 font-bold"
                        : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-indigo-50"
                    }`}
                  >
                    <span className="font-serif text-lg">{num}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Balance Analysis */}
          {(() => {
            const bal = getBalanceAnalysis(selectedBalanceNum);
            return (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block">Chapter Fifteen • Balance Number Library</span>
                    <h3 className="font-serif text-2xl font-bold text-slate-900">
                      Balance Number {bal.number} — {bal.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {bal.keywords.map((kw, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-900 border border-indigo-200 text-[10px] font-bold">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100 space-y-2">
                    <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-indigo-600" />
                      Crisis Navigation Style
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {bal.crisisNavigationStyle}
                    </p>
                  </div>

                  <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 space-y-2">
                    <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Strengths Under Pressure
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {bal.strengthsUnderPressure}
                    </p>
                  </div>

                  <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-100 space-y-2">
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      Growth Edge in Emergencies
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {bal.growthEdge}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-serif">
                    Detailed Crisis Equilibrium Analysis
                  </h4>
                  <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                    {bal.detailedParagraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB: BRIDGE NUMBERS LIBRARY */}
      {activeTab === "bridge_library" && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-3xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Select Core Bridge Difference Value (0-8) to Study Harmonizing Practices:
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((val) => {
                const item = getBridgeAnalysis(val);
                const isSelected = val === selectedBridgeValue;
                return (
                  <button
                    key={val}
                    onClick={() => setSelectedBridgeValue(val)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                      isSelected
                        ? "bg-purple-950 text-amber-300 border-purple-950 shadow-md scale-105 font-bold"
                        : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-purple-50"
                    }`}
                  >
                    <span className="font-serif text-xl">Gap {val}</span>
                    <span className="text-[10px] truncate max-w-full">{item.title.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Bridge Analysis */}
          {(() => {
            const br = getBridgeAnalysis(selectedBridgeValue);
            return (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-purple-600 uppercase tracking-widest block">Chapter Fifteen • Bridge Numbers Library</span>
                    <h3 className="font-serif text-2xl font-bold text-slate-900">
                      Bridge Gap {br.bridgeValue} — {br.title}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-bold text-xs">
                    Difference |A - B| = {br.bridgeValue}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-purple-50/50 p-5 rounded-2xl border border-purple-100 space-y-2">
                    <h4 className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      Core Integration Quality
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {br.coreQuality}
                    </p>
                  </div>

                  <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100 space-y-2">
                    <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-indigo-600" />
                      Practical Bridge Practice
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {br.bridgePractice}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-serif">
                    Guidance for Harmonizing Core Number Pairs
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {br.guidanceForPair}
                  </p>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB: CHAPTER FIFTEEN THEORY */}
      {activeTab === "chapter_fifteen_theory" && (
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block font-sans">Chapter Fifteen • Theoretical Foundations</span>
              <h3 className="font-serif text-3xl font-bold text-slate-900">
                {CHAPTER_FIFTEEN_THEORY_DATA.title}
              </h3>
              <p className="text-sm text-slate-600 mt-1 font-serif italic">
                "{CHAPTER_FIFTEEN_THEORY_DATA.quote.text}" — <span className="not-italic font-bold text-indigo-700">{CHAPTER_FIFTEEN_THEORY_DATA.quote.author}</span>
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              {CHAPTER_FIFTEEN_THEORY_DATA.introParagraphs.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed">{p}</p>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 space-y-2">
                <h4 className="font-serif text-base font-bold text-amber-950">1. Achievement Number</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {CHAPTER_FIFTEEN_THEORY_DATA.fourAspectsBreakdown.achievementRole}
                </p>
              </div>

              <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 space-y-2">
                <h4 className="font-serif text-base font-bold text-indigo-950">2. Minor Expression Number</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {CHAPTER_FIFTEEN_THEORY_DATA.fourAspectsBreakdown.minorExpressionRole}
                </p>
              </div>

              <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100 space-y-2">
                <h4 className="font-serif text-base font-bold text-purple-950">3. Balance Number</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {CHAPTER_FIFTEEN_THEORY_DATA.fourAspectsBreakdown.balanceRole}
                </p>
              </div>

              <div className="bg-slate-100/70 p-6 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-serif text-base font-bold text-slate-950">4. Bridge Numbers</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {CHAPTER_FIFTEEN_THEORY_DATA.fourAspectsBreakdown.bridgeRole}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: LIFE PATH MASTER KEY */}
      {activeTab === "life_path_master_key" && (
        <div className="space-y-6">
          {/* Live Calculation Section for Input DOB */}
          {(() => {
            const calc = calculateLifePathThreePart(inputDob);
            return (
              <div className="bg-gradient-to-br from-amber-950 via-slate-900 to-amber-950 text-amber-50 p-6 sm:p-8 rounded-3xl border border-amber-500/40 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-800/60 pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                      Live 3-Part Calculation Engine • DOB: {inputDob}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-200">
                      Your Calculated Life Path: Number {calc.finalLifePath}
                    </h3>
                  </div>
                  <div className="bg-amber-900/80 px-4 py-2 rounded-2xl border border-amber-500/50 text-center">
                    <span className="text-[10px] text-amber-300 uppercase tracking-widest block font-bold">
                      Master Key Vibration
                    </span>
                    <span className="font-serif text-3xl font-bold text-amber-100">
                      LP {calc.finalLifePath}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-2xl border border-amber-800/40 space-y-2">
                  <div className="flex items-center justify-between text-xs text-amber-200 font-mono">
                    <span>{calc.breakdownString}</span>
                  </div>
                  <p className="text-xs text-amber-200/80 leading-relaxed font-serif">
                    The 3-part method calculates Day ({calc.dayOriginal} → {calc.dayReduced}), Month ({calc.monthOriginal} → {calc.monthReduced}), and Year ({calc.yearOriginal} → {calc.yearReduced}) separately before final addition, preserving Master Number tracks (11, 22, 33) that direct-sum methods reduce.
                  </p>
                </div>
              </div>
            );
          })()}

          {/* Main Life Path Selector & Detail Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block font-sans">
                  Chapter Nineteen • Life Path Profile Database
                </span>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Life Path Numbers (1–9, 11, 22, 33)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Select Life Path:</span>
                <select
                  value={selectedLifePathNum}
                  onChange={(e) => setSelectedLifePathNum(Number(e.target.value))}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].map((lp) => (
                    <option key={lp} value={lp}>
                      Life Path {lp} {lp === 11 || lp === 22 || lp === 33 ? "(Master)" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Selector Buttons */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Quick Select Any Life Path Road:
              </span>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].map((lp) => {
                  const detail = getLifePathDetail(lp);
                  const isSelected = selectedLifePathNum === lp;
                  return (
                    <button
                      key={lp}
                      onClick={() => setSelectedLifePathNum(lp)}
                      className={`p-2.5 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center justify-center border ${
                        isSelected
                          ? "bg-amber-950 text-amber-300 border-amber-500 shadow-md scale-105"
                          : detail.isMasterNumber
                          ? "bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span className="text-sm font-serif">{lp}</span>
                      <span className="text-[9px] font-normal opacity-80 truncate max-w-full">
                        {lp === 11 || lp === 22 || lp === 33 ? "Master" : `LP ${lp}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detailed Selected Life Path Profile */}
            {(() => {
              const lp = getLifePathDetail(selectedLifePathNum);
              return (
                <div className="space-y-6 pt-4 border-t border-slate-100">
                  {/* Hero Banner */}
                  <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-amber-50 p-6 sm:p-8 rounded-3xl border border-amber-500/30 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-800/60 pb-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                            Life Path {lp.lifePathNumber}
                          </span>
                          {lp.isMasterNumber && (
                            <span className="px-2 py-0.5 rounded bg-purple-900 text-purple-200 text-[10px] font-bold border border-purple-700">
                              Master Number Life Path
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif text-3xl font-bold text-amber-200">
                          Life Path {lp.lifePathNumber}: {lp.title}
                        </h4>
                        <p className="text-xs text-amber-300/90 font-medium mt-1">
                          {lp.roadName}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-amber-300 font-bold block">Vibrational Rank</span>
                        <span className="font-serif text-3xl font-bold text-amber-200">LP {lp.lifePathNumber}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap pt-1">
                      {lp.keywords.map((kw, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-full bg-amber-900/60 text-amber-200 text-xs font-medium border border-amber-700/50">
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Soul Direction & Recurring Themes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
                      <h5 className="font-serif text-base font-bold text-slate-900 flex items-center gap-2">
                        <Compass className="w-5 h-5 text-amber-600" />
                        The Soul's Chosen Direction
                      </h5>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {lp.soulDirection}
                      </p>
                    </div>

                    <div className="bg-amber-50/70 p-6 rounded-2xl border border-amber-200 space-y-2">
                      <h5 className="font-serif text-base font-bold text-amber-950 flex items-center gap-2">
                        <RefreshCw className="w-5 h-5 text-amber-700" />
                        Recurring Life Themes & Lessons
                      </h5>
                      <p className="text-xs text-amber-900 leading-relaxed font-medium">
                        {lp.recurringThemes}
                      </p>
                    </div>
                  </div>

                  {/* Strengths & Challenges */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Strengths */}
                    <div className="bg-emerald-50/70 p-6 rounded-2xl border border-emerald-200 space-y-3">
                      <h5 className="font-serif text-base font-bold text-emerald-950 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        Natural Strengths & Road Gifts
                      </h5>
                      <ul className="space-y-2 text-xs text-emerald-900">
                        {lp.strengths.map((s, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Challenges */}
                    <div className="bg-rose-50/70 p-6 rounded-2xl border border-rose-200 space-y-3">
                      <h5 className="font-serif text-base font-bold text-rose-950 flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-rose-600" />
                        Characteristic Challenges & Shadows
                      </h5>
                      <ul className="space-y-2 text-xs text-rose-900">
                        {lp.challenges.map((c, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0 mt-1.5" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Relationships & Career */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-pink-50/60 p-5 rounded-2xl border border-pink-200 space-y-2 text-xs text-pink-950">
                      <strong className="font-serif text-sm font-bold block text-pink-900 flex items-center gap-1.5">
                        <Heart className="w-4 h-4 text-pink-600" />
                        Relationships & Intimate Dynamics
                      </strong>
                      <p className="leading-relaxed">{lp.relationshipDynamics}</p>
                    </div>

                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-900">
                      <strong className="font-serif text-sm font-bold block text-slate-900 flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-slate-700" />
                        Career & Professional Purpose
                      </strong>
                      <p className="leading-relaxed text-slate-700">{lp.careerPurpose}</p>
                    </div>
                  </div>

                  {/* Developmental Invitation */}
                  <div className="bg-purple-950 text-purple-100 p-6 rounded-2xl border border-purple-800 space-y-2">
                    <strong className="font-serif text-base font-bold block text-purple-200 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-300" />
                      Developmental Invitation & Soul Task
                    </strong>
                    <p className="text-xs leading-relaxed text-purple-100">{lp.developmentalInvitation}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* TAB: LIFE PATH THEORY */}
      {activeTab === "life_path_theory" && (
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block font-sans">
                Chapter Nineteen • Systemic Life Path Theory
              </span>
              <h3 className="font-serif text-3xl font-bold text-slate-900">
                {CHAPTER_NINETEEN_THEORY_DATA.title}
              </h3>
              <p className="text-sm text-slate-600 mt-1 font-serif italic">
                "{CHAPTER_NINETEEN_THEORY_DATA.quote.text}" — <span className="not-italic font-bold text-amber-700">{CHAPTER_NINETEEN_THEORY_DATA.quote.author}</span>
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              {CHAPTER_NINETEEN_THEORY_DATA.introParagraphs.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed">{p}</p>
              ))}
            </div>

            {/* Three-Part Method Calculation Guide */}
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 space-y-4">
              <strong className="font-serif text-base font-bold text-amber-950 block">
                The Three-Part Calculation Method — 4-Step Standard
              </strong>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-amber-950">
                <div className="p-4 rounded-xl bg-white/80 border border-amber-200 space-y-1">
                  <span className="font-bold text-amber-800">Step 1: Birth Day Reduction</span>
                  <p>Reduce birth day to a single digit or Master Number (11, 22). Preserve 11, 22, and 29→11.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/80 border border-amber-200 space-y-1">
                  <span className="font-bold text-amber-800">Step 2: Birth Month Reduction</span>
                  <p>Reduce month number. November = 11 (Master — preserve). All other months reduce normally.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/80 border border-amber-200 space-y-1">
                  <span className="font-bold text-amber-800">Step 3: Birth Year Reduction</span>
                  <p>Add all four digits of the birth year and reduce to a single digit or Master Number (11, 22, 33).</p>
                </div>
                <div className="p-4 rounded-xl bg-white/80 border border-amber-200 space-y-1">
                  <span className="font-bold text-amber-800">Step 4: Final Addition</span>
                  <p>Sum the three reduced values (Day + Month + Year). If the sum is 11, 22, or 33, preserve it as a Master Life Path.</p>
                </div>
              </div>
            </div>

            {/* Master Life Paths Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-6 rounded-2xl bg-purple-950 text-purple-100 border border-purple-800/60 space-y-3">
                <h4 className="font-serif text-lg font-bold text-purple-200">
                  Master Life Path 11
                </h4>
                <p className="text-xs text-purple-200/90 leading-relaxed">
                  The Illuminator's road—operating at elevated nervous voltage. High intuitive channel that translates inspired perception into usable guidance for others.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-indigo-950 text-indigo-100 border border-indigo-800/60 space-y-3">
                <h4 className="font-serif text-lg font-bold text-indigo-200">
                  Master Life Path 22
                </h4>
                <p className="text-xs text-indigo-200/90 leading-relaxed">
                  The Master Builder's road—bridging visionary ideals with large-scale practical execution. Builds enduring structures and institutions for humanity.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-rose-950 text-rose-100 border border-rose-800/60 space-y-3">
                <h4 className="font-serif text-lg font-bold text-rose-200">
                  Master Life Path 33
                </h4>
                <p className="text-xs text-rose-200/90 leading-relaxed">
                  The Master Teacher's road—embodied compassionate service. Extraordinarily rare path requiring deep self-replenishment to sustainably offer unconditional care.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: PINNACLES & CHALLENGES ENGINE */}
      {activeTab === "pinnacles_challenges_engine" && (
        <div className="space-y-6">
          {/* Live Calculation Banner for Input DOB */}
          {(() => {
            const pc = calculatePinnaclesAndChallenges(inputDob);
            return (
              <div className="space-y-6">
                {/* Header Banner */}
                <div className="bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 text-amber-50 p-6 sm:p-8 rounded-3xl border border-amber-500/40 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-800/60 pb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                        Chapter Twenty • Lifetime Timeline Engine (DOB: {inputDob})
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-200">
                        Pinnacle Cycles & Challenge Numbers Profile
                      </h3>
                      <p className="text-xs text-amber-300/80 mt-1 font-serif">
                        Life Path {pc.lifePathNumber} • First Pinnacle Ends at Age {pc.firstPinnacleEndAge}
                      </p>
                    </div>

                    <div className="bg-amber-900/80 px-4 py-2.5 rounded-2xl border border-amber-500/50 text-center">
                      <span className="text-[10px] text-amber-300 uppercase tracking-widest block font-bold">
                        Lifetime Main Challenge
                      </span>
                      <span className="font-serif text-2xl font-bold text-amber-100">
                        Challenge {pc.mainChallengeNumber}
                      </span>
                    </div>
                  </div>

                  {/* Lifetime Main Challenge Brief */}
                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-amber-800/50 space-y-2">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold text-amber-200">
                        Main Challenge (Operates Across All 4 Phases): {pc.mainChallengeDetail.title}
                      </span>
                    </div>
                    <p className="text-xs text-amber-100/90 leading-relaxed font-serif">
                      "{pc.mainChallengeDetail.developmentalDemand}"
                    </p>
                  </div>

                  {/* 4 Phases Timeline Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {pc.phases.map((ph) => (
                      <div key={ph.phaseIndex} className="bg-slate-950/80 p-5 rounded-2xl border border-amber-800/40 space-y-3">
                        <div className="flex items-center justify-between border-b border-amber-900/60 pb-2">
                          <div>
                            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                              Phase {ph.phaseIndex} • {ph.ageRange}
                            </span>
                            <span className="text-xs font-serif font-bold text-amber-100">
                              {ph.phaseLabel}
                            </span>
                          </div>
                        </div>

                        {/* Pinnacle & Challenge Side-by-Side */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-3 rounded-xl bg-amber-900/40 border border-amber-700/50 space-y-1">
                            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
                              Pinnacle {ph.pinnacleNumber}
                            </span>
                            <span className="font-serif font-bold text-amber-100 text-xs block truncate">
                              {ph.pinnacleDetail.title}
                            </span>
                          </div>

                          <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-800/50 space-y-1">
                            <span className="text-[10px] font-bold text-rose-300 uppercase tracking-widest block">
                              Challenge {ph.challengeNumber}
                            </span>
                            <span className="font-serif font-bold text-rose-100 text-xs block truncate">
                              {ph.challengeDetail.title}
                            </span>
                          </div>
                        </div>

                        <p className="text-[11px] text-amber-200/80 leading-relaxed italic">
                          Opportunity: {ph.pinnacleDetail.theme}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Interactive Library Pickers for Pinnacles and Challenges */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            {/* Pinnacle Library Section */}
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block font-sans">
                    Pinnacle Cycles Database
                  </span>
                  <h4 className="font-serif text-xl font-bold text-slate-900">
                    Explore All Pinnacle Cycles (1–9, 11, 22, 33)
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Pick Pinnacle:</span>
                  <select
                    value={selectedPinnacleNum}
                    onChange={(e) => setSelectedPinnacleNum(Number(e.target.value))}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].map((num) => (
                      <option key={num} value={num}>
                        Pinnacle {num} {num === 11 || num === 22 || num === 33 ? "(Master)" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pinnacle Quick Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].map((num) => {
                  const detail = getPinnacleDetail(num);
                  const isSelected = selectedPinnacleNum === num;
                  return (
                    <button
                      key={num}
                      onClick={() => setSelectedPinnacleNum(num)}
                      className={`p-2 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center justify-center border ${
                        isSelected
                          ? "bg-amber-950 text-amber-300 border-amber-500 shadow-md scale-105"
                          : detail.isMasterNumber
                          ? "bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span className="text-sm font-serif">{num}</span>
                      <span className="text-[8px] opacity-80">{num > 9 ? "Master" : "Pinnacle"}</span>
                    </button>
                  );
                })}
              </div>

              {/* Pinnacle Selected Detail Card */}
              {(() => {
                const pin = getPinnacleDetail(selectedPinnacleNum);
                return (
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div>
                        <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block">
                          Pinnacle Cycle Number {pin.number}
                        </span>
                        <h5 className="font-serif text-xl font-bold text-slate-900">
                          {pin.title}
                        </h5>
                      </div>
                      {pin.isMasterNumber && (
                        <span className="px-2.5 py-1 rounded-full bg-purple-900 text-purple-200 text-xs font-bold border border-purple-700">
                          Master Pinnacle
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-serif italic">
                      Theme: "{pin.theme}"
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Opportunities */}
                      <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 space-y-2">
                        <strong className="text-xs font-bold text-emerald-950 flex items-center gap-1.5 font-serif">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Primary Growth Opportunities
                        </strong>
                        <ul className="space-y-1.5 text-xs text-emerald-900">
                          {pin.opportunities.map((op, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                              <span>{op}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Primary Demands */}
                      <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 space-y-2">
                        <strong className="text-xs font-bold text-amber-950 flex items-center gap-1.5 font-serif">
                          <Compass className="w-4 h-4 text-amber-600" />
                          Developmental Demands
                        </strong>
                        <ul className="space-y-1.5 text-xs text-amber-900">
                          {pin.primaryDemands.map((dem, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                              <span>{dem}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-800 space-y-1">
                      <strong className="font-serif font-bold text-slate-900 block">Practical Guidance for This Phase:</strong>
                      <p className="leading-relaxed">{pin.guidance}</p>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Challenge Library Section */}
            <div className="space-y-4 pt-6 border-t border-slate-200">
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-widest block font-sans">
                    Challenge Numbers Database
                  </span>
                  <h4 className="font-serif text-xl font-bold text-slate-900">
                    Explore All Challenge Numbers (0–8)
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Pick Challenge:</span>
                  <select
                    value={selectedChallengeNum}
                    onChange={(e) => setSelectedChallengeNum(Number(e.target.value))}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        Challenge {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Challenge Quick Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
                  const isSelected = selectedChallengeNum === num;
                  return (
                    <button
                      key={num}
                      onClick={() => setSelectedChallengeNum(num)}
                      className={`p-2.5 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center justify-center border ${
                        isSelected
                          ? "bg-rose-950 text-rose-200 border-rose-500 shadow-md scale-105"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span className="text-sm font-serif">Challenge {num}</span>
                    </button>
                  );
                })}
              </div>

              {/* Challenge Selected Detail Card */}
              {(() => {
                const ch = getChallengeDetail(selectedChallengeNum);
                return (
                  <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-200 space-y-4">
                    <div className="border-b border-rose-200 pb-3">
                      <span className="text-[10px] font-bold text-rose-700 uppercase tracking-widest block">
                        Challenge Number {ch.number}
                      </span>
                      <h5 className="font-serif text-xl font-bold text-rose-950">
                        {ch.title}
                      </h5>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-rose-200 space-y-1">
                      <strong className="text-xs font-bold text-rose-900 block font-serif">Developmental Demand:</strong>
                      <p className="text-xs text-rose-950 leading-relaxed">{ch.developmentalDemand}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Recurring Obstacles */}
                      <div className="bg-white p-4 rounded-xl border border-rose-200 space-y-2">
                        <strong className="text-xs font-bold text-rose-950 flex items-center gap-1.5 font-serif">
                          <ShieldAlert className="w-4 h-4 text-rose-600" />
                          Recurring Obstacles & Friction
                        </strong>
                        <ul className="space-y-1.5 text-xs text-rose-900">
                          {ch.recurringObstacles.map((obs, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0 mt-1.5" />
                              <span>{obs}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Lessons to Master */}
                      <div className="bg-white p-4 rounded-xl border border-emerald-200 space-y-2">
                        <strong className="text-xs font-bold text-emerald-950 flex items-center gap-1.5 font-serif">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Core Lessons to Master
                        </strong>
                        <ul className="space-y-1.5 text-xs text-emerald-900">
                          {ch.lessonsToMaster.map((les, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                              <span>{les}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-rose-900 text-rose-100 p-4 rounded-xl border border-rose-800 text-xs space-y-1">
                      <strong className="font-serif font-bold text-rose-200 block">Guidance for Overcoming Challenge {ch.number}:</strong>
                      <p className="leading-relaxed text-rose-100">{ch.guidance}</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* TAB: PINNACLES & CHALLENGES THEORY */}
      {activeTab === "pinnacles_challenges_theory" && (
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block font-sans">
                Chapter Twenty • Systemic Timeline Theory
              </span>
              <h3 className="font-serif text-3xl font-bold text-slate-900">
                {CHAPTER_TWENTY_THEORY_DATA.title}
              </h3>
              <p className="text-sm text-slate-600 mt-1 font-serif italic">
                "{CHAPTER_TWENTY_THEORY_DATA.quote.text}" — <span className="not-italic font-bold text-amber-700">{CHAPTER_TWENTY_THEORY_DATA.quote.author}</span>
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              {CHAPTER_TWENTY_THEORY_DATA.introParagraphs.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed">{p}</p>
              ))}
            </div>

            {/* Rules Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <strong className="font-serif text-sm font-bold block text-amber-900">
                  Pinnacle Addition Rule
                </strong>
                <p className="text-xs text-amber-950 leading-relaxed">
                  {CHAPTER_TWENTY_THEORY_DATA.pinnacleCalculationRule}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                <strong className="font-serif text-sm font-bold block text-rose-900">
                  Challenge Subtraction Rule
                </strong>
                <p className="text-xs text-rose-950 leading-relaxed">
                  {CHAPTER_TWENTY_THEORY_DATA.challengeCalculationRule}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-2">
                <strong className="font-serif text-sm font-bold block text-amber-300">
                  4-Phase Timeline Rule
                </strong>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {CHAPTER_TWENTY_THEORY_DATA.timingRule}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: PERSONAL YEAR & MONTH ENGINE */}
      {activeTab === "personal_year_month_engine" && (
        <div className="space-y-6">
          {/* Live Personal Year & Monthly Breakdown for DOB & Selected Target Year */}
          {(() => {
            const fullOverview = calculateFullYearMonthOverview(inputDob, selectedTargetYear);
            const pyInfo = fullOverview.personalYearInfo;
            const pyDetail = pyInfo.personalYearDetail;

            return (
              <div className="space-y-6">
                {/* Year Header Banner */}
                <div className="bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 text-amber-50 p-6 sm:p-8 rounded-3xl border border-amber-500/40 shadow-xl space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-800/60 pb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block font-sans">
                        Chapter Twenty-One • Personal Year Calculation (DOB: {inputDob})
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-200 mt-1">
                        Personal Year {pyInfo.personalYearNumber} — {pyDetail.title.split("—")[1] || pyDetail.title}
                      </h3>
                      <p className="text-xs text-amber-300/90 mt-1 font-serif italic">
                        "{pyDetail.theme}"
                      </p>
                    </div>

                    {/* Target Year Picker */}
                    <div className="bg-amber-950/80 p-3 rounded-2xl border border-amber-700/60 flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block font-sans">
                          Target Year
                        </span>
                        <span className="font-serif text-lg font-bold text-amber-100">
                          {selectedTargetYear}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[selectedTargetYear - 1, selectedTargetYear, selectedTargetYear + 1, selectedTargetYear + 2].map((yr) => (
                          <button
                            key={yr}
                            onClick={() => setSelectedTargetYear(yr)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                              selectedTargetYear === yr
                                ? "bg-amber-500 text-slate-950 font-black shadow"
                                : "bg-amber-900/60 text-amber-200 hover:bg-amber-800/80"
                            }`}
                          >
                            {yr}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Formula Reduction Breakdown */}
                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-amber-800/40 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-2.5 rounded-xl bg-amber-900/30 border border-amber-800/30">
                      <span className="text-[10px] text-amber-400 font-bold uppercase block font-sans">Birth Day Reduced</span>
                      <span className="font-serif text-base font-bold text-amber-100">{pyInfo.dayReduced}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-900/30 border border-amber-800/30">
                      <span className="text-[10px] text-amber-400 font-bold uppercase block font-sans">Birth Month Reduced</span>
                      <span className="font-serif text-base font-bold text-amber-100">{pyInfo.monthReduced}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-900/30 border border-amber-800/30">
                      <span className="text-[10px] text-amber-400 font-bold uppercase block font-sans">Year {selectedTargetYear} Digits</span>
                      <span className="font-serif text-base font-bold text-amber-100">{pyInfo.targetYearReduced}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40">
                      <span className="text-[10px] text-amber-300 font-bold uppercase block font-sans">Sum & Reduction</span>
                      <span className="font-serif text-base font-bold text-amber-200">
                        {pyInfo.dayReduced} + {pyInfo.monthReduced} + {pyInfo.targetYearReduced} = {pyInfo.dayReduced + pyInfo.monthReduced + pyInfo.targetYearReduced} → {pyInfo.personalYearNumber}
                      </span>
                    </div>
                  </div>

                  {/* Detailed Paragraph Description */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest font-sans">
                      Dominant Vibrational Energy Description
                    </h4>
                    <p className="text-xs text-amber-100/90 leading-relaxed font-serif">
                      {pyDetail.energyDescription}
                    </p>
                  </div>

                  {/* Focus & Avoid Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-emerald-950/40 p-4 rounded-2xl border border-emerald-800/40 space-y-2">
                      <strong className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 font-serif">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Key Focus Areas for Personal Year {pyInfo.personalYearNumber}
                      </strong>
                      <ul className="space-y-1.5 text-xs text-emerald-100/90">
                        {pyDetail.keyFocusAreas.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-rose-950/40 p-4 rounded-2xl border border-rose-800/40 space-y-2">
                      <strong className="text-xs font-bold text-rose-300 flex items-center gap-1.5 font-serif">
                        <ShieldAlert className="w-4 h-4 text-rose-400" />
                        What to Avoid in Personal Year {pyInfo.personalYearNumber}
                      </strong>
                      <ul className="space-y-1.5 text-xs text-rose-100/90">
                        {pyDetail.whatToAvoid.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Remedies & Guidance Box */}
                  <div className="bg-amber-900/30 p-5 rounded-2xl border border-amber-700/50 space-y-3 text-xs text-amber-100">
                    <strong className="font-serif text-sm font-bold text-amber-200 block">
                      Remedies, Gemstones & Harmonizing Practices
                    </strong>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="p-3 bg-slate-900/80 rounded-xl border border-amber-800/40 space-y-1">
                        <span className="text-[10px] text-amber-400 uppercase tracking-wider block font-bold font-sans">Lucky Colours</span>
                        <p className="text-xs font-serif text-amber-200">{pyDetail.remediesAndGuidance?.luckyColours?.join(", ") || "—"}</p>
                      </div>
                      <div className="p-3 bg-slate-900/80 rounded-xl border border-amber-800/40 space-y-1">
                        <span className="text-[10px] text-amber-400 uppercase tracking-wider block font-bold font-sans">Gemstone Recommendation</span>
                        <p className="text-xs font-serif text-amber-200">{pyDetail.remediesAndGuidance?.gemstones || "—"}</p>
                      </div>
                      <div className="p-3 bg-slate-900/80 rounded-xl border border-amber-800/40 space-y-1">
                        <span className="text-[10px] text-amber-400 uppercase tracking-wider block font-bold font-sans">Mantra</span>
                        <p className="text-xs font-serif text-amber-200">{pyDetail.remediesAndGuidance?.mantra || "—"}</p>
                      </div>
                      <div className="p-3 bg-slate-900/80 rounded-xl border border-amber-800/40 space-y-1">
                        <span className="text-[10px] text-amber-400 uppercase tracking-wider block font-bold font-sans">Auspicious Days</span>
                        <p className="text-xs font-serif text-amber-200">{pyDetail.remediesAndGuidance?.auspiciousDays?.join(", ") || "—"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 12-Month Personal Month Sequence Grid */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                  <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block font-sans">
                        Monthly Refinement Matrix ({selectedTargetYear})
                      </span>
                      <h4 className="font-serif text-xl font-bold text-slate-900">
                        12-Month Personal Month Timeline
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200">
                        Double Vibration = Peak Window
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {fullOverview.monthlyBreakdown.map((pm) => (
                      <div
                        key={pm.calendarMonthIndex}
                        className={`p-5 rounded-2xl border transition-all space-y-3 ${
                          pm.isPeakMonth
                            ? "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-400 shadow-md ring-2 ring-amber-300/50"
                            : "bg-slate-50/80 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                          <div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-sans">
                              {pm.monthName} • Month {pm.calendarMonthIndex}
                            </span>
                            <span className="font-serif text-base font-bold text-slate-900">
                              Personal Month {pm.personalMonthNumber}
                            </span>
                          </div>
                          {pm.isPeakMonth && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider font-sans">
                              Peak Alignment
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-700 font-serif leading-relaxed italic">
                          "{pm.personalMonthDetail.theme}"
                        </p>

                        <div className="bg-white/80 p-3 rounded-xl border border-slate-200/60 text-xs text-slate-800 space-y-1">
                          <strong className="text-[11px] font-bold text-slate-900 block font-sans">Refinement Focus:</strong>
                          <p className="text-[11px] text-slate-700 leading-normal">{pm.personalMonthDetail.monthlyRefinement}</p>
                        </div>

                        <div className="space-y-1">
                          <strong className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block font-sans">
                            Best Activities:
                          </strong>
                          <ul className="space-y-1 text-[11px] text-slate-700">
                            {pm.personalMonthDetail.bestActivities.slice(0, 2).map((act, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                                <span>{act}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Standalone Personal Years & Personal Months Database Explorer */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            {/* Personal Year Library Picker */}
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block font-sans">
                    Personal Year Complete Library
                  </span>
                  <h4 className="font-serif text-xl font-bold text-slate-900">
                    Explore All Personal Years (1 to 9)
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 font-sans">Pick Year:</span>
                  <select
                    value={selectedPYLibNum}
                    onChange={(e) => setSelectedPYLibNum(Number(e.target.value))}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <option key={num} value={num}>
                        Personal Year {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* PY Quick Select Buttons */}
              <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                  const isSelected = selectedPYLibNum === num;
                  return (
                    <button
                      key={num}
                      onClick={() => setSelectedPYLibNum(num)}
                      className={`p-2.5 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center justify-center border ${
                        isSelected
                          ? "bg-slate-900 text-amber-300 border-amber-500 shadow-md scale-105"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span className="text-sm font-serif">Year {num}</span>
                    </button>
                  );
                })}
              </div>

              {/* Selected PY Detail Card */}
              {(() => {
                const py = getPersonalYearDetail(selectedPYLibNum);
                return (
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 text-xs">
                    <div className="border-b border-slate-200 pb-3">
                      <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block font-sans">
                        Detailed Personal Year Profile
                      </span>
                      <h5 className="font-serif text-xl font-bold text-slate-900">
                        {py.title}
                      </h5>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-serif italic">
                      Theme: "{py.theme}"
                    </p>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                      <strong className="text-xs font-bold text-slate-900 font-serif block">
                        Detailed Energy Description:
                      </strong>
                      <p className="text-xs text-slate-700 leading-relaxed font-serif">
                        {py.energyDescription}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 space-y-2">
                        <strong className="text-xs font-bold text-emerald-950 font-serif flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Primary Opportunities & Focus
                        </strong>
                        <ul className="space-y-1.5 text-xs text-emerald-900">
                          {py.keyFocusAreas.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-rose-50/70 p-4 rounded-xl border border-rose-200 space-y-2">
                        <strong className="text-xs font-bold text-rose-950 font-serif flex items-center gap-1.5">
                          <ShieldAlert className="w-4 h-4 text-rose-600" />
                          What to Avoid
                        </strong>
                        <ul className="space-y-1.5 text-xs text-rose-900">
                          {py.whatToAvoid.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0 mt-1.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 space-y-2">
                      <strong className="text-amber-300 font-serif text-xs font-bold block">
                        Harmonizing Practices & Practical Guidance:
                      </strong>
                      <p className="text-xs text-slate-200 leading-relaxed">{py.remediesAndGuidance.practicalGuidance}</p>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Personal Month Library Picker */}
            <div className="space-y-4 pt-6 border-t border-slate-200">
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block font-sans">
                    Personal Month Complete Library
                  </span>
                  <h4 className="font-serif text-xl font-bold text-slate-900">
                    Explore All Personal Month Vibrations (1 to 9)
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 font-sans">Pick Month:</span>
                  <select
                    value={selectedPMLibNum}
                    onChange={(e) => setSelectedPMLibNum(Number(e.target.value))}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <option key={num} value={num}>
                        Personal Month {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* PM Quick Select Buttons */}
              <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                  const isSelected = selectedPMLibNum === num;
                  return (
                    <button
                      key={num}
                      onClick={() => setSelectedPMLibNum(num)}
                      className={`p-2.5 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center justify-center border ${
                        isSelected
                          ? "bg-amber-900 text-amber-100 border-amber-600 shadow-md scale-105"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span className="text-sm font-serif">Month {num}</span>
                    </button>
                  );
                })}
              </div>

              {/* Selected PM Detail Card */}
              {(() => {
                const pm = getPersonalMonthDetail(selectedPMLibNum);
                return (
                  <div className="bg-amber-50/40 p-6 rounded-2xl border border-amber-200 space-y-4 text-xs">
                    <div className="border-b border-amber-200 pb-3">
                      <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest block font-sans">
                        Detailed Personal Month Profile
                      </span>
                      <h5 className="font-serif text-xl font-bold text-amber-950">
                        {pm.title}
                      </h5>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-amber-200 space-y-1">
                      <strong className="text-xs font-bold text-amber-950 block font-serif">Monthly Refinement Theme:</strong>
                      <p className="text-xs text-amber-900 leading-relaxed">{pm.monthlyRefinement}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-xl border border-emerald-200 space-y-2">
                        <strong className="text-xs font-bold text-emerald-950 flex items-center gap-1.5 font-serif">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Best Activities for Personal Month {pm.monthNumber}
                        </strong>
                        <ul className="space-y-1.5 text-xs text-emerald-900">
                          {pm.bestActivities.map((act, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-rose-200 space-y-2">
                        <strong className="text-xs font-bold text-rose-950 flex items-center gap-1.5 font-serif">
                          <ShieldAlert className="w-4 h-4 text-rose-600" />
                          Potential Challenges
                        </strong>
                        <ul className="space-y-1.5 text-xs text-rose-900">
                          {pm.keyChallenges.map((ch, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0 mt-1.5" />
                              <span>{ch}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-amber-900 text-amber-100 p-4 rounded-xl border border-amber-800 text-xs space-y-1">
                      <strong className="font-serif font-bold text-amber-200 block">Strategic Advice for Personal Month {pm.monthNumber}:</strong>
                      <p className="leading-relaxed text-amber-100">{pm.strategicAdvice}</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* TAB: PERSONAL YEAR & MONTH THEORY */}
      {activeTab === "personal_year_month_theory" && (
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block font-sans">
                Chapter Twenty-One • Systemic Temporal Theory
              </span>
              <h3 className="font-serif text-3xl font-bold text-slate-900">
                {CHAPTER_TWENTY_ONE_THEORY_DATA.title}
              </h3>
              <p className="text-sm text-slate-600 mt-1 font-serif italic">
                "{CHAPTER_TWENTY_ONE_THEORY_DATA.quote.text}" — <span className="not-italic font-bold text-amber-700">{CHAPTER_TWENTY_ONE_THEORY_DATA.quote.author}</span>
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              {CHAPTER_TWENTY_ONE_THEORY_DATA.introParagraphs.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed">{p}</p>
              ))}
            </div>

            {/* Theory Calculation Rules Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <strong className="font-serif text-sm font-bold block text-amber-900">
                  Personal Year Rule
                </strong>
                <p className="text-xs text-amber-950 leading-relaxed">
                  {CHAPTER_TWENTY_ONE_THEORY_DATA.calculationRules.personalYearRule}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-2">
                <strong className="font-serif text-sm font-bold block text-amber-300">
                  Personal Month Rule
                </strong>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {CHAPTER_TWENTY_ONE_THEORY_DATA.calculationRules.personalMonthRule}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-orange-50 border border-orange-200 space-y-2">
                <strong className="font-serif text-sm font-bold block text-orange-950">
                  Transitional Overlap Rule
                </strong>
                <p className="text-xs text-orange-950 leading-relaxed">
                  {CHAPTER_TWENTY_ONE_THEORY_DATA.calculationRules.transitionGuidance}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: ESSENCE & TRANSIT ENGINE */}
      {activeTab === "essence_transit_engine" && (
        <div className="space-y-6">
          {/* Engine Header & Name Inputs */}
          <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-800/60 pb-6">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block font-sans">
                  Chapter Twenty-Two • Transit & Essence Lifetime Calculator
                </span>
                <h2 className="font-serif text-3xl font-bold text-white mt-1">
                  Essence Cycles & Transit Engine
                </h2>
                <p className="text-sm text-purple-200/90 mt-1 max-w-2xl">
                  Calculate the letter-by-letter Chaldean transit timeline of your birth name and uncover your unique annual Essence Numbers across your lifetime.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-purple-950/60 p-3 rounded-2xl border border-purple-700/50">
                <Activity className="w-6 h-6 text-amber-400 animate-pulse" />
                <span className="text-xs text-purple-200 font-medium">Personal Name Transits</span>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-bold text-purple-200 uppercase tracking-wider block">
                  Full Birth Name (First [Middle] Surname)
                </label>
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="e.g. Arjun Sharma or Kavitha Nair"
                  className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-purple-400/30 text-white placeholder-purple-300/50 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-purple-200 uppercase tracking-wider block">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={inputDob}
                  onChange={(e) => setInputDob(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-purple-400/30 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Timeline Table Calculation */}
          {(() => {
            const nameParts = inputName.trim().split(/\s+/);
            const firstName = nameParts[0] || "Aarav";
            const middleName = nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "";
            const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
            const [bYearStr, bMonthStr, bDayStr] = inputDob.split("-");
            const birthYear = Number(bYearStr) || 1995;
            const birthMonth = Number(bMonthStr) || 8;
            const birthDay = Number(bDayStr) || 15;

            const timeline = calculateLifetimeTransitTimeline(
              firstName,
              middleName,
              lastName,
              birthYear,
              birthMonth,
              birthDay,
              50
            );

            return (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-slate-900">
                      Lifetime Transit Timeline & Essence Sequence
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Name analyzed: <strong className="text-slate-800">{firstName} {middleName} {lastName}</strong> • DOB: <strong className="text-slate-800">{inputDob}</strong>
                    </p>
                  </div>

                  <div className="text-xs px-3 py-1.5 rounded-xl bg-purple-50 text-purple-900 border border-purple-200 font-bold">
                    Chaldean Duration Timeline
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Age / Year</th>
                        <th className="py-3 px-4">First Transit ({firstName || "First"})</th>
                        {middleName && <th className="py-3 px-4">Middle Transit ({middleName})</th>}
                        <th className="py-3 px-4">Surname Transit ({lastName || "Surname"})</th>
                        <th className="py-3 px-4">Sum</th>
                        <th className="py-3 px-4">Essence No.</th>
                        <th className="py-3 px-4">Relationship Pattern</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {timeline.map((row) => {
                        const isCurrentAge = row.calendarYear === new Date().getFullYear();
                        return (
                          <tr
                            key={row.age}
                            className={`hover:bg-slate-50/80 transition-colors ${
                              isCurrentAge ? "bg-amber-50/80 font-bold text-amber-950" : ""
                            }`}
                          >
                            <td className="py-2.5 px-4">
                              <span className="font-bold text-slate-900">Age {row.age}</span>
                              <span className="text-slate-400 block text-[10px] font-sans">({row.calendarYear})</span>
                            </td>
                            <td className="py-2.5 px-4 font-mono font-bold text-purple-700">
                              {row.firstNameLetter} <span className="text-slate-400 text-[10px]">({row.firstNameValue}y)</span>
                            </td>
                            {middleName && (
                              <td className="py-2.5 px-4 font-mono font-bold text-indigo-700">
                                {row.middleNameLetter} <span className="text-slate-400 text-[10px]">({row.middleNameValue}y)</span>
                              </td>
                            )}
                            <td className="py-2.5 px-4 font-mono font-bold text-emerald-700">
                              {row.surnameLetter} <span className="text-slate-400 text-[10px]">({row.surnameValue}y)</span>
                            </td>
                            <td className="py-2.5 px-4 text-slate-500 font-mono">
                              {row.rawEssenceSum}
                            </td>
                            <td className="py-2.5 px-4">
                              <span
                                className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-bold text-xs ${
                                  row.isMasterEssence
                                    ? "bg-purple-900 text-amber-300 ring-2 ring-amber-400"
                                    : "bg-slate-900 text-white"
                                }`}
                              >
                                {row.essenceNumber}
                              </span>
                            </td>
                            <td className="py-2.5 px-4">
                              <span
                                className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                  row.relationshipPattern === "Alignment"
                                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                    : row.relationshipPattern === "Genuine Challenge"
                                    ? "bg-rose-100 text-rose-800 border border-rose-300"
                                    : "bg-blue-100 text-blue-800 border border-blue-300"
                                }`}
                              >
                                {row.relationshipPattern}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })()}

          {/* Interactive Essence Library Explorer */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block font-sans">
                The Essence Numbers (1-9 & Masters)
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-900">
                Essence Number Deep Profile Explorer
              </h3>
            </div>

            {/* Select Buttons */}
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].map((num) => {
                const isSelected = selectedEssenceLibNum === num;
                const isMaster = num === 11 || num === 22 || num === 33;
                return (
                  <button
                    key={num}
                    onClick={() => setSelectedEssenceLibNum(num)}
                    className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
                      isSelected
                        ? isMaster
                          ? "bg-purple-950 text-amber-300 shadow-md ring-2 ring-amber-400"
                          : "bg-slate-900 text-white shadow-md"
                        : isMaster
                        ? "bg-purple-50 text-purple-900 border border-purple-200 hover:bg-purple-100"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Essence {num}
                  </button>
                );
              })}
            </div>

            {/* Selected Essence Detail View */}
            {(() => {
              const detail = getEssenceDetail(selectedEssenceLibNum);
              return (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
                    <div>
                      <span className="text-xs font-bold text-purple-700 uppercase tracking-widest">
                        {detail.theme}
                      </span>
                      <h4 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                        {detail.title}
                      </h4>
                    </div>

                    {detail.isMasterNumber && (
                      <span className="px-3 py-1 rounded-full bg-purple-950 text-amber-300 text-xs font-bold border border-amber-400/50">
                        Master Essence
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-sans">
                    {detail.energyDescription}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                      <strong className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                        Key Focus Areas
                      </strong>
                      <ul className="text-xs text-emerald-950 space-y-1 list-disc list-inside">
                        {detail.keyFocusAreas.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-2">
                      <strong className="text-xs font-bold text-rose-900 uppercase tracking-wider block">
                        What to Avoid
                      </strong>
                      <ul className="text-xs text-rose-950 space-y-1 list-disc list-inside">
                        {detail.whatToAvoid.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                    <strong className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                      Strategic Consultation Advice
                    </strong>
                    <p className="text-xs text-amber-950 mt-1 leading-relaxed">
                      {detail.strategicAdvice}
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Chaldean Letter Duration Reference */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block font-sans">
                Chaldean Transit Letter Reference (A to Z)
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-900">
                Letter Duration & Vibrational Character Library
              </h3>
            </div>

            {/* A-Z Letter Grid */}
            <div className="flex flex-wrap gap-1.5">
              {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((ltr) => {
                const isSelected = selectedTransitLetter === ltr;
                return (
                  <button
                    key={ltr}
                    onClick={() => setSelectedTransitLetter(ltr)}
                    className={`w-9 h-9 rounded-xl font-mono text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-slate-900 text-white shadow-md ring-2 ring-slate-400"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {ltr}
                  </button>
                );
              })}
            </div>

            {/* Selected Letter Detail */}
            {(() => {
              const letterInfo = getChaldeanLetterInfo(selectedTransitLetter);
              return (
                <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-200 space-y-4">
                  <div className="flex items-center justify-between border-b border-indigo-200/80 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-12 h-12 rounded-2xl bg-slate-900 text-amber-300 font-mono text-2xl font-bold flex items-center justify-center">
                        {letterInfo.letter}
                      </span>
                      <div>
                        <h4 className="font-serif text-lg font-bold text-slate-900">
                          Letter {letterInfo.letter} Transit Profile
                        </h4>
                        <span className="text-xs text-indigo-800 font-semibold">
                          Duration: <strong className="text-slate-900">{letterInfo.durationYears} {letterInfo.durationYears === 1 ? "Year" : "Years"}</strong> ({letterInfo.durationType})
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-200">
                      Chaldean Duration = {letterInfo.durationYears}
                    </span>
                  </div>

                  <p className="text-xs text-slate-800 leading-relaxed font-sans">
                    <strong>Vibrational Character:</strong> {letterInfo.vibrationalQuality}
                  </p>

                  <p className="text-xs text-slate-700 leading-relaxed font-sans">
                    {letterInfo.detailedDescription}
                  </p>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* TAB: ESSENCE & TRANSIT THEORY */}
      {activeTab === "essence_transit_theory" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="border-b border-purple-800/60 pb-6">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block font-sans">
                Chapter Twenty-Two Theoretical Foundation
              </span>
              <h2 className="font-serif text-3xl font-bold text-white mt-1">
                {CHAPTER_TWENTY_TWO_THEORY_DATA.title}
              </h2>
              <p className="text-sm text-purple-200/90 mt-1">
                {CHAPTER_TWENTY_TWO_THEORY_DATA.subtitle}
              </p>
            </div>

            <p className="text-sm text-purple-200/90 font-serif italic border-l-2 border-amber-400 pl-4 py-1">
              "{CHAPTER_TWENTY_TWO_THEORY_DATA.quote.text}" — <span className="not-italic text-amber-300 font-sans text-xs">{CHAPTER_TWENTY_TWO_THEORY_DATA.quote.author}</span>
            </p>

            <div className="space-y-3 text-xs text-purple-100/90 leading-relaxed font-sans">
              {CHAPTER_TWENTY_TWO_THEORY_DATA.introParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="font-serif text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              Chaldean Mechanics & Calculation Rules
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 space-y-2">
                <strong className="font-serif text-sm font-bold block text-purple-950">
                  1. Letter Durations
                </strong>
                <p className="text-xs text-purple-950 leading-relaxed font-sans">
                  {CHAPTER_TWENTY_TWO_THEORY_DATA.mechanicsRules.chaldeanValuesRule}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-2">
                <strong className="font-serif text-sm font-bold block text-indigo-950">
                  2. Sequential Timeline
                </strong>
                <p className="text-xs text-indigo-950 leading-relaxed font-sans">
                  {CHAPTER_TWENTY_TWO_THEORY_DATA.mechanicsRules.timelineRule}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <strong className="font-serif text-sm font-bold block text-amber-950">
                  3. Essence Number
                </strong>
                <p className="text-xs text-amber-950 leading-relaxed font-sans">
                  {CHAPTER_TWENTY_TWO_THEORY_DATA.mechanicsRules.essenceIntegrationRule}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-4">
              <h4 className="font-serif text-lg font-bold text-slate-900">
                The Three Essence vs Personal Year Relationships
              </h4>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <strong className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                    Alignment (Harmonious Amplification)
                  </strong>
                  <p className="text-xs text-emerald-900 mt-1 leading-relaxed">
                    {CHAPTER_TWENTY_TWO_THEORY_DATA.relationshipTypes.alignment}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <strong className="text-xs font-bold text-blue-950 uppercase tracking-wider block">
                    Productive Tension (Multi-Dimensional Growth)
                  </strong>
                  <p className="text-xs text-blue-900 mt-1 leading-relaxed">
                    {CHAPTER_TWENTY_TWO_THEORY_DATA.relationshipTypes.productiveTension}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
                  <strong className="text-xs font-bold text-rose-950 uppercase tracking-wider block">
                    Genuine Challenge (Spiritual Integration)
                  </strong>
                  <p className="text-xs text-rose-900 mt-1 leading-relaxed">
                    {CHAPTER_TWENTY_TWO_THEORY_DATA.relationshipTypes.genuineChallenge}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: COMPATIBILITY MATRIX ENGINE */}
      {activeTab === "compatibility_engine" && (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-800/60 pb-6">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block font-sans">
                  Chapter Twenty-Three • Friend, Neutral & Enemy Systems
                </span>
                <h2 className="font-serif text-3xl font-bold text-white mt-1">
                  Complete Compatibility Matrix Engine
                </h2>
                <p className="text-sm text-indigo-200/90 mt-1 max-w-2xl">
                  Analyze pairwise compatibility across Personal, Professional, and Romantic domains with full multi-layer evaluation (Life Path, Expression, Soul Urge, Birth Number).
                </p>
              </div>

              <div className="flex items-center gap-2 bg-indigo-950/80 p-3 rounded-2xl border border-indigo-700/50">
                <Users className="w-6 h-6 text-amber-400 animate-pulse" />
                <span className="text-xs text-indigo-200 font-medium">3-Domain Synergy Engine</span>
              </div>
            </div>

            {/* Selector Pair inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-3">
                <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  Select Person A Number (1-9, 11, 22, 33)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].map((num) => (
                    <button
                      key={num}
                      onClick={() => setCompPersonANum(num)}
                      className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                        compPersonANum === num
                          ? "bg-amber-400 text-slate-950 shadow-md ring-2 ring-white"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-3">
                <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  Select Person B Number (1-9, 11, 22, 33)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].map((num) => (
                    <button
                      key={num}
                      onClick={() => setCompPersonBNum(num)}
                      className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                        compPersonBNum === num
                          ? "bg-amber-400 text-slate-950 shadow-md ring-2 ring-white"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pairwise Analysis Result Card */}
          {(() => {
            const pairResult = analyzePairCompatibility(compPersonANum, compPersonBNum);
            return (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-600 uppercase tracking-widest font-sans">
                        Pairwise Evaluation
                      </span>
                      <span
                        className={`px-3 py-0.5 rounded-full text-xs font-bold ${
                          pairResult.overallType === "Friend"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : pairResult.overallType === "Enemy"
                            ? "bg-rose-100 text-rose-800 border border-rose-300"
                            : "bg-blue-100 text-blue-800 border border-blue-300"
                        }`}
                      >
                        {pairResult.overallType} Category
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                      Life Path {compPersonANum} & Life Path {compPersonBNum} Compatibility
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 font-mono text-sm font-bold text-slate-800">
                    <span>LP {compPersonANum}</span>
                    <span className="text-slate-400">↔</span>
                    <span>LP {compPersonBNum}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-sans">
                  {pairResult.summary}
                </p>

                {/* Three Domains Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Personal Domain */}
                  <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200 space-y-4">
                    <div className="flex items-center justify-between border-b border-indigo-200/80 pb-2">
                      <span className="font-serif font-bold text-sm text-slate-900">
                        1. Personal Domain
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          pairResult.personalDomain.type === "Friend"
                            ? "bg-emerald-100 text-emerald-800"
                            : pairResult.personalDomain.type === "Enemy"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {pairResult.personalDomain.type}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-sans">
                      {pairResult.personalDomain.dynamics}
                    </p>

                    <div className="space-y-1">
                      <strong className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block">
                        Strengths:
                      </strong>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside font-sans">
                        {pairResult.personalDomain.strengths.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <strong className="text-[11px] font-bold text-rose-900 uppercase tracking-wider block">
                        Challenges:
                      </strong>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside font-sans">
                        {pairResult.personalDomain.challenges.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-indigo-200/60 text-xs text-indigo-950 font-sans">
                      <strong>Advice:</strong> {pairResult.personalDomain.strategicAdvice}
                    </div>
                  </div>

                  {/* Professional Domain */}
                  <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-4">
                    <div className="flex items-center justify-between border-b border-amber-200/80 pb-2">
                      <span className="font-serif font-bold text-sm text-slate-900">
                        2. Professional Domain
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          pairResult.professionalDomain.type === "Friend"
                            ? "bg-emerald-100 text-emerald-800"
                            : pairResult.professionalDomain.type === "Enemy"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {pairResult.professionalDomain.type}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-sans">
                      {pairResult.professionalDomain.dynamics}
                    </p>

                    <div className="space-y-1">
                      <strong className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block">
                        Strengths:
                      </strong>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside font-sans">
                        {pairResult.professionalDomain.strengths.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <strong className="text-[11px] font-bold text-rose-900 uppercase tracking-wider block">
                        Challenges:
                      </strong>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside font-sans">
                        {pairResult.professionalDomain.challenges.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-amber-200/60 text-xs text-amber-950 font-sans">
                      <strong>Advice:</strong> {pairResult.professionalDomain.strategicAdvice}
                    </div>
                  </div>

                  {/* Romantic Domain */}
                  <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-4">
                    <div className="flex items-center justify-between border-b border-rose-200/80 pb-2">
                      <span className="font-serif font-bold text-sm text-slate-900">
                        3. Romantic Domain
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          pairResult.romanticDomain.type === "Friend"
                            ? "bg-emerald-100 text-emerald-800"
                            : pairResult.romanticDomain.type === "Enemy"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {pairResult.romanticDomain.type}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-sans">
                      {pairResult.romanticDomain.dynamics}
                    </p>

                    <div className="space-y-1">
                      <strong className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block">
                        Strengths:
                      </strong>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside font-sans">
                        {pairResult.romanticDomain.strengths.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <strong className="text-[11px] font-bold text-rose-900 uppercase tracking-wider block">
                        Challenges:
                      </strong>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside font-sans">
                        {pairResult.romanticDomain.challenges.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-rose-200/60 text-xs text-rose-950 font-sans">
                      <strong>Advice:</strong> {pairResult.romanticDomain.strategicAdvice}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Interactive Profile Explorer for All Numbers */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block font-sans">
                Number Compatibility Master Profiles (1-9 & Masters)
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-900">
                Number Profile Explorer & Category Tables
              </h3>
            </div>

            {/* Selector buttons */}
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].map((num) => {
                const isSelected = compSelectedProfileNum === num;
                const isMaster = num === 11 || num === 22 || num === 33;
                return (
                  <button
                    key={num}
                    onClick={() => setCompSelectedProfileNum(num)}
                    className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
                      isSelected
                        ? isMaster
                          ? "bg-purple-950 text-amber-300 shadow-md ring-2 ring-amber-400"
                          : "bg-slate-900 text-white shadow-md"
                        : isMaster
                        ? "bg-purple-50 text-purple-900 border border-purple-200 hover:bg-purple-100"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Profile {num}
                  </button>
                );
              })}
            </div>

            {/* Selected Profile View */}
            {(() => {
              const prof = LIFE_PATH_COMPATIBILITY_PROFILES[compSelectedProfileNum] || LIFE_PATH_COMPATIBILITY_PROFILES[1];
              return (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                    <div>
                      <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest">
                        {prof.archetype}
                      </span>
                      <h4 className="font-serif text-2xl font-bold text-slate-900 mt-0.5">
                        {prof.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                        Friends: {prof.friendNumbers?.join(", ") || "—"}
                      </span>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-100 text-rose-800">
                        Enemies: {prof.enemyNumbers?.join(", ") || "—"}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-sans">
                    <strong>Vibrational Character:</strong> {prof.vibrationalCharacter}
                  </p>

                  {/* Table summary of all 3 domains */}
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-slate-100 font-bold text-slate-800 border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-4">Domain</th>
                          <th className="py-2.5 px-4 text-emerald-800">Friend Numbers (Highly Compatible)</th>
                          <th className="py-2.5 px-4 text-blue-800">Neutral Numbers (Workable)</th>
                          <th className="py-2.5 px-4 text-rose-800">Enemy Numbers (Challenging)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        <tr>
                          <td className="py-2.5 px-4 font-bold text-slate-900">Personal / Friendship</td>
                          <td className="py-2.5 px-4 text-emerald-700 font-mono font-bold">{prof.tableSummary?.personal?.friends?.join(", ") || "—"}</td>
                          <td className="py-2.5 px-4 text-blue-700 font-mono font-bold">{prof.tableSummary?.personal?.neutral?.join(", ") || "—"}</td>
                          <td className="py-2.5 px-4 text-rose-700 font-mono font-bold">{prof.tableSummary?.personal?.enemies?.join(", ") || "—"}</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 font-bold text-slate-900">Professional / Business</td>
                          <td className="py-2.5 px-4 text-emerald-700 font-mono font-bold">{prof.tableSummary?.professional?.friends?.join(", ") || "—"}</td>
                          <td className="py-2.5 px-4 text-blue-700 font-mono font-bold">{prof.tableSummary?.professional?.neutral?.join(", ") || "—"}</td>
                          <td className="py-2.5 px-4 text-rose-700 font-mono font-bold">{prof.tableSummary?.professional?.enemies?.join(", ") || "—"}</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 font-bold text-slate-900">Romantic / Marriage</td>
                          <td className="py-2.5 px-4 text-emerald-700 font-mono font-bold">{prof.tableSummary?.romantic?.friends?.join(", ") || "—"}</td>
                          <td className="py-2.5 px-4 text-blue-700 font-mono font-bold">{prof.tableSummary?.romantic?.neutral?.join(", ") || "—"}</td>
                          <td className="py-2.5 px-4 text-rose-700 font-mono font-bold">{prof.tableSummary?.romantic?.enemies?.join(", ") || "—"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* TAB: COMPATIBILITY THEORY */}
      {activeTab === "compatibility_theory" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="border-b border-indigo-800/60 pb-6">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block font-sans">
                Chapter Twenty-Three Theoretical Framework
              </span>
              <h2 className="font-serif text-3xl font-bold text-white mt-1">
                {CHAPTER_TWENTY_THREE_THEORY_DATA.title}
              </h2>
              <p className="text-sm text-indigo-200/90 mt-1">
                {CHAPTER_TWENTY_THREE_THEORY_DATA.subtitle}
              </p>
            </div>

            <p className="text-sm text-indigo-200/90 font-serif italic border-l-2 border-amber-400 pl-4 py-1">
              "{CHAPTER_TWENTY_THREE_THEORY_DATA.quote.text}" — <span className="not-italic text-amber-300 font-sans text-xs">{CHAPTER_TWENTY_THREE_THEORY_DATA.quote.author}</span>
            </p>

            <div className="space-y-3 text-xs text-indigo-100/90 leading-relaxed font-sans">
              {CHAPTER_TWENTY_THREE_THEORY_DATA.introParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="font-serif text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              The Four Layers of Complete Numerological Compatibility
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
                <strong className="text-xs font-bold text-purple-950 uppercase tracking-wider block">
                  Layer 1 — Life Path Compatibility
                </strong>
                <p className="text-xs text-purple-900 leading-relaxed font-sans">
                  {CHAPTER_TWENTY_THREE_THEORY_DATA.fourLayerSystem.layer1LifePath}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 space-y-1">
                <strong className="text-xs font-bold text-indigo-950 uppercase tracking-wider block">
                  Layer 2 — Expression Compatibility
                </strong>
                <p className="text-xs text-indigo-900 leading-relaxed font-sans">
                  {CHAPTER_TWENTY_THREE_THEORY_DATA.fourLayerSystem.layer2Expression}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
                <strong className="text-xs font-bold text-rose-950 uppercase tracking-wider block">
                  Layer 3 — Soul Urge Compatibility
                </strong>
                <p className="text-xs text-rose-900 leading-relaxed font-sans">
                  {CHAPTER_TWENTY_THREE_THEORY_DATA.fourLayerSystem.layer3SoulUrge}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <strong className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                  Layer 4 — Birth Number Compatibility
                </strong>
                <p className="text-xs text-emerald-900 leading-relaxed font-sans">
                  {CHAPTER_TWENTY_THREE_THEORY_DATA.fourLayerSystem.layer4BirthNumber}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-4">
              <h4 className="font-serif text-lg font-bold text-slate-900">
                Special Domain Applications
              </h4>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <strong className="text-xs font-bold text-amber-950 uppercase tracking-wider block">
                    Parent-Child Compatibility
                  </strong>
                  <p className="text-xs text-amber-900 mt-1 leading-relaxed font-sans">
                    {CHAPTER_TWENTY_THREE_THEORY_DATA.specialDomains.parentChild}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-xs font-bold text-slate-950 uppercase tracking-wider block">
                    Business Partnership Synergy
                  </strong>
                  <p className="text-xs text-slate-800 mt-1 leading-relaxed font-sans">
                    {CHAPTER_TWENTY_THREE_THEORY_DATA.specialDomains.businessPartnership}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200">
                  <strong className="text-xs font-bold text-indigo-950 uppercase tracking-wider block">
                    Team Dynamics & Organizational Balance
                  </strong>
                  <p className="text-xs text-indigo-900 mt-1 leading-relaxed font-sans">
                    {CHAPTER_TWENTY_THREE_THEORY_DATA.specialDomains.teamDynamics}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: BIRTH NUMBERS (1 TO 31 DEPTH) */}
      {activeTab === "birth_numbers_1to31" && (
        <div className="space-y-6">
          {/* Main Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block font-sans">
                  Chapter Eighteen • Complete Birth Date Profile Database
                </span>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Birth Numbers — All Dates 1 to 31
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Pick Day:</span>
                <input
                  type="number"
                  min={1}
                  max={31}
                  value={selectedBirthDay}
                  onChange={(e) => setSelectedBirthDay(Math.min(31, Math.max(1, Number(e.target.value) || 1)))}
                  className="w-20 px-3 py-1.5 rounded-xl border border-slate-200 text-sm font-bold text-center focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Quick Day Selector Grid (1 to 31) */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Select Any Birth Day (1 to 31):
              </span>
              <div className="grid grid-cols-6 sm:grid-cols-11 md:grid-cols-16 gap-1.5">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const detail = getBirthNumberDetail(day);
                  const isSelected = selectedBirthDay === day;
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedBirthDay(day)}
                      className={`p-2 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center justify-center border ${
                        isSelected
                          ? "bg-amber-950 text-amber-300 border-amber-500 shadow-md scale-105"
                          : detail.isMasterNumber
                          ? "bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100"
                          : detail.isKarmicDebt
                          ? "bg-rose-50 text-rose-900 border-rose-200 hover:bg-rose-100"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span>Day {day}</span>
                      <span className="text-[9px] font-normal opacity-80">{detail.compoundNotation}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Birth Number Detail Card */}
            {(() => {
              const b = getBirthNumberDetail(selectedBirthDay);
              if (!b) return null;
              return (
                <div className="space-y-6 pt-4 border-t border-slate-100">
                  {/* Banner */}
                  <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-amber-50 p-6 sm:p-8 rounded-3xl border border-amber-500/30 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-800/60 pb-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                            Birth Date {b.day} ({b.compoundNotation})
                          </span>
                          {b.isMasterNumber && (
                            <span className="px-2 py-0.5 rounded bg-purple-900 text-purple-200 text-[10px] font-bold border border-purple-700">
                              Master Number
                            </span>
                          )}
                          {b.isKarmicDebt && (
                            <span className="px-2 py-0.5 rounded bg-rose-900 text-rose-200 text-[10px] font-bold border border-rose-700">
                              Karmic Debt Compound
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif text-3xl font-bold text-amber-200">
                          Birth Number {b.day}: {b.title}
                        </h4>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-amber-300 font-bold block">Compound Notation</span>
                        <span className="font-serif text-3xl font-bold text-amber-200">{b.compoundNotation}</span>
                      </div>
                    </div>

                    <div className="bg-amber-900/40 p-3 rounded-xl border border-amber-700/40 text-xs text-amber-200 font-medium">
                      {b.rulingInfo || `Ruling Planet: ${b.rulingPlanet} | Element: ${b.element} | Energy: ${b.energy}`}
                    </div>

                    <p className="text-xs text-amber-100/90 font-serif italic text-base leading-relaxed">
                      "{b.archetype}"
                    </p>

                    <div className="flex gap-2 flex-wrap pt-1">
                      {b.keywords.map((kw, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-full bg-amber-900/60 text-amber-200 text-xs font-medium border border-amber-700/50">
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Personality Section */}
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                    <h5 className="font-serif text-lg font-bold text-slate-900">Personality & Core Essence</h5>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">{b.personality || b.essentialCharacter}</p>
                  </div>

                  {/* As Wife & As Husband Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-rose-50/60 p-6 rounded-2xl border border-rose-200 space-y-2 text-xs text-rose-950">
                      <h5 className="font-serif text-base font-bold text-rose-900 flex items-center gap-2">
                        <Heart className="w-5 h-5 text-rose-600" />
                        As a Wife
                      </h5>
                      <p className="leading-relaxed">{b.asWife || b.relationshipLesson}</p>
                    </div>

                    <div className="bg-indigo-50/60 p-6 rounded-2xl border border-indigo-200 space-y-2 text-xs text-indigo-950">
                      <h5 className="font-serif text-base font-bold text-indigo-900 flex items-center gap-2">
                        <Users className="w-5 h-5 text-indigo-600" />
                        As a Husband
                      </h5>
                      <p className="leading-relaxed">{b.asHusband || b.relationshipLesson}</p>
                    </div>
                  </div>

                  {/* Strengths & Challenges Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Strengths */}
                    <div className="bg-emerald-50/70 p-6 rounded-2xl border border-emerald-200 space-y-3">
                      <h5 className="font-serif text-base font-bold text-emerald-950 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        Strengths
                      </h5>
                      <ul className="space-y-2 text-xs text-emerald-900">
                        {b.strengths.map((s, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Challenges */}
                    <div className="bg-rose-50/70 p-6 rounded-2xl border border-rose-200 space-y-3">
                      <h5 className="font-serif text-base font-bold text-rose-950 flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-rose-600" />
                        Challenges & Blindspots
                      </h5>
                      <ul className="space-y-2 text-xs text-rose-900">
                        {b.challenges.map((c, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0 mt-1.5" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Relationships & Health */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-pink-50/60 p-5 rounded-2xl border border-pink-200 space-y-2 text-xs text-pink-950">
                      <strong className="font-serif text-sm font-bold block text-pink-900 flex items-center gap-1.5">
                        <Heart className="w-4 h-4 text-pink-600" />
                        Relationships & Dynamics
                      </strong>
                      <p className="leading-relaxed">{b.relationships || b.relationshipLesson}</p>
                    </div>

                    <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-200 space-y-2 text-xs text-blue-950">
                      <strong className="font-serif text-sm font-bold block text-blue-900 flex items-center gap-1.5">
                        <Activity className="w-4 h-4 text-blue-600" />
                        Health & Vitality
                      </strong>
                      <p className="leading-relaxed">{b.health || b.healthTendencies}</p>
                    </div>
                  </div>

                  {/* Career & Finance */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-800">
                      <strong className="font-serif text-sm font-bold block text-slate-900 flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-slate-700" />
                        Professions / Career
                      </strong>
                      <p className="leading-relaxed">{b.professionsCareer}</p>
                      {b.professionalInclinations && b.professionalInclinations.length > 0 && (
                        <div className="flex gap-1.5 flex-wrap pt-2">
                          {b.professionalInclinations.map((p, i) => (
                            <span key={i} className="px-2.5 py-0.5 rounded-lg bg-slate-200 text-slate-800 text-[11px] font-semibold">
                              {p}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 space-y-2 text-xs text-amber-950">
                      <strong className="font-serif text-sm font-bold block text-amber-900 flex items-center gap-1.5">
                        <Coins className="w-4 h-4 text-amber-600" />
                        Finance & Wealth
                      </strong>
                      <p className="leading-relaxed">{b.finance || b.financialMaterialTendency}</p>
                    </div>
                  </div>

                  {/* Spiritual Guidance */}
                  <div className="bg-purple-950 text-purple-100 p-6 rounded-2xl border border-purple-800 space-y-2">
                    <strong className="font-serif text-base font-bold block text-purple-200 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-300" />
                      Spiritual Guidance & Evolution
                    </strong>
                    <p className="text-xs leading-relaxed text-purple-100 font-serif text-sm">
                      {b.spiritualGuidance || b.spiritualInvitation}
                    </p>
                  </div>

                  {/* Additional Insights Box */}
                  {b.additionalInsights && (
                    <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-800 space-y-4">
                      <h5 className="font-serif text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                        <Compass className="w-4 h-4 text-amber-400" />
                        Additional Insights & Correspondences
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                          <span className="text-[10px] text-slate-400 font-bold block uppercase">Lucky Days</span>
                          <span className="text-amber-200 font-medium">{b.additionalInsights.luckyDays}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                          <span className="text-[10px] text-slate-400 font-bold block uppercase">Lucky Colors</span>
                          <span className="text-emerald-200 font-medium">{b.additionalInsights.luckyColors}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                          <span className="text-[10px] text-slate-400 font-bold block uppercase">Compatible Numbers</span>
                          <span className="text-sky-200 font-medium">{b.additionalInsights.compatibleBirthNumbers}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                          <span className="text-[10px] text-slate-400 font-bold block uppercase">Challenging Numbers</span>
                          <span className="text-rose-200 font-medium">{b.additionalInsights.challengingNumbers}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                          <span className="text-[10px] text-slate-400 font-bold block uppercase">Gemstone</span>
                          <span className="text-purple-200 font-medium">{b.additionalInsights.gemstone}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 sm:col-span-2 md:col-span-1">
                          <span className="text-[10px] text-slate-400 font-bold block uppercase">Life Lesson</span>
                          <span className="text-amber-100 font-serif italic">{b.additionalInsights.lifeLesson}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Disclaimer Footer */}
                  <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-center text-[11px] text-slate-500 italic">
                    {b.disclaimer || DISCLAIMER_FOOTER}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* TAB: BIRTH NUMBERS THEORY */}
      {activeTab === "birth_numbers_theory" && (
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block font-sans">
                Chapter Eighteen • Systemic Birth Number Theory
              </span>
              <h3 className="font-serif text-3xl font-bold text-slate-900">
                {CHAPTER_EIGHTEEN_THEORY_DATA.title}
              </h3>
              <p className="text-sm text-slate-600 mt-1 font-serif italic">
                "{CHAPTER_EIGHTEEN_THEORY_DATA.quote.text}" — <span className="not-italic font-bold text-amber-700">{CHAPTER_EIGHTEEN_THEORY_DATA.quote.author}</span>
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              {CHAPTER_EIGHTEEN_THEORY_DATA.introParagraphs.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed">{p}</p>
              ))}
            </div>

            {/* Role in Consultation */}
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 space-y-2 text-xs text-amber-950">
              <strong className="font-bold uppercase tracking-wider block text-amber-900">
                Consultation Role & Notation Standard:
              </strong>
              <p className="leading-relaxed text-sm font-serif">{CHAPTER_EIGHTEEN_THEORY_DATA.consultationRoleSummary}</p>
            </div>

            {/* Special Categories Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Master Birth Numbers */}
              <div className="p-6 rounded-2xl bg-purple-950 text-purple-100 border border-purple-800/60 space-y-3">
                <h4 className="font-serif text-lg font-bold text-purple-200">
                  Master Birth Numbers (11, 22, 29)
                </h4>
                <p className="text-xs text-purple-200/90 leading-relaxed">
                  Birth dates carrying Master Numbers (11th, 22nd, 29th) carry heightened visionary, intuitive, and systemic infrastructure capabilities alongside delicate nervous sensitivity that requires practical grounding.
                </p>
              </div>

              {/* Karmic Debt Birth Numbers */}
              <div className="p-6 rounded-2xl bg-rose-950 text-rose-100 border border-rose-800/60 space-y-3">
                <h4 className="font-serif text-lg font-bold text-rose-200">
                  Karmic Debt Birth Numbers (13, 14, 16, 19)
                </h4>
                <p className="text-xs text-rose-200/90 leading-relaxed">
                  Birth dates carrying Karmic Debt compounds (13th, 14th, 16th, 19th) present specific, concentrated curricula of transformation: work discipline (13), moderation (14), authenticity (16), or humble interdependence (19).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: NAME CORRECTION EVALUATOR */}
      {activeTab === "name_correction_calculator" && (
        <div className="space-y-6">
          {/* Diagnostic Engine Header */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block font-sans">Chapter Seventeen • Diagnostic Engine & Candidate Tester</span>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Name Correction Evaluator
                </h3>
              </div>
              <span className={`px-3 py-1 rounded-full font-bold text-xs border ${
                liveCorrectionDiagnosis.recommendation.includes("Strongly")
                  ? "bg-rose-50 text-rose-900 border-rose-200"
                  : liveCorrectionDiagnosis.recommendation.includes("Optional")
                  ? "bg-amber-50 text-amber-900 border-amber-200"
                  : "bg-emerald-50 text-emerald-900 border-emerald-200"
              }`}>
                {liveCorrectionDiagnosis.recommendation}
              </span>
            </div>

            {/* Live Profile Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Current Full Birth Name:</label>
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  placeholder="e.g., Neeraj Bhattacharya"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Date of Birth:</label>
                <input
                  type="date"
                  value={inputDob}
                  onChange={(e) => setInputDob(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Test Candidate Correction Spelling:</label>
                <input
                  type="text"
                  value={candidateCorrectionName}
                  onChange={(e) => setCandidateCorrectionName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  placeholder="e.g., Neerraj Bhattacharya"
                />
              </div>
            </div>

            {/* Diagnostic Indicators Assessment Box */}
            <div className="bg-slate-900 text-slate-100 p-6 rounded-3xl space-y-4 border border-slate-800">
              <h4 className="font-serif text-lg font-bold text-amber-300 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                Current Name Diagnostic Indicators Audit
              </h4>

              {liveCorrectionDiagnosis.triggeredIndicators.length === 0 ? (
                <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-800/50 text-xs text-emerald-200">
                  <strong>✓ No Critical Misalignment Indicators Triggered:</strong> The current name '{inputName}' exhibits harmonic synergy with Life Path {liveCorrectionDiagnosis.lifePath}.
                </div>
              ) : (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-amber-200 uppercase tracking-wider block">
                    Triggered Misalignment Indicators ({liveCorrectionDiagnosis.triggeredIndicators.length}):
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {liveCorrectionDiagnosis.triggeredIndicators.map((ind, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-rose-950/70 border border-rose-800/50 text-xs text-rose-200 flex items-start gap-2">
                        <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>{ind}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Side-by-Side Candidate Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Original Name Card */}
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
                <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Original Spelling</span>
                    <h4 className="font-serif text-xl font-bold text-slate-900">{inputName}</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold">
                    Life Path {liveCorrectionDiagnosis.lifePath}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-200">
                    <span>Chaldean Expression:</span>
                    <strong className="font-serif text-base text-slate-900">{liveCorrectionDiagnosis.chaldeanRoot} (Sum {liveCorrectionDiagnosis.chaldeanSum})</strong>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-200">
                    <span>Pythagorean Expression:</span>
                    <strong className="font-serif text-base text-slate-900">{liveCorrectionDiagnosis.pythagoreanRoot}</strong>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-200">
                    <span>Soul Urge / Personality:</span>
                    <strong className="font-serif text-base text-slate-900">{liveCorrectionDiagnosis.soulUrgeRoot} / {liveCorrectionDiagnosis.personalityRoot}</strong>
                  </div>
                </div>
              </div>

              {/* Candidate Correction Card */}
              <div className="bg-amber-950 text-amber-50 p-6 rounded-3xl border border-amber-800/60 space-y-4">
                <div className="border-b border-amber-800/60 pb-3 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">Candidate Correction</span>
                    <h4 className="font-serif text-xl font-bold text-amber-200">{candidateCorrectionName}</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-900 text-amber-200 text-xs font-bold border border-amber-700">
                    Tested Candidate
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center bg-amber-900/60 p-2.5 rounded-xl border border-amber-700/50">
                    <span>Chaldean Expression:</span>
                    <strong className="font-serif text-base text-amber-200">{liveCandidateDiagnosis.chaldeanRoot} (Sum {liveCandidateDiagnosis.chaldeanSum})</strong>
                  </div>
                  <div className="flex justify-between items-center bg-amber-900/60 p-2.5 rounded-xl border border-amber-700/50">
                    <span>Pythagorean Expression:</span>
                    <strong className="font-serif text-base text-amber-200">{liveCandidateDiagnosis.pythagoreanRoot}</strong>
                  </div>
                  <div className="flex justify-between items-center bg-amber-900/60 p-2.5 rounded-xl border border-amber-700/50">
                    <span>Soul Urge / Personality:</span>
                    <strong className="font-serif text-base text-amber-200">{liveCandidateDiagnosis.soulUrgeRoot} / {liveCandidateDiagnosis.personalityRoot}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: CORRECTION CASE STUDIES */}
      {activeTab === "correction_case_studies" && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block font-sans">Chapter Seventeen • Verified Case Studies</span>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Practical Name Correction Case Studies
                </h3>
              </div>
              <div className="flex gap-2">
                {CASE_STUDIES.map((cs) => (
                  <button
                    key={cs.id}
                    onClick={() => setSelectedCaseStudyId(cs.id)}
                    className={`px-3 py-1.5 rounded-2xl text-xs font-bold transition-all ${
                      selectedCaseStudyId === cs.id
                        ? "bg-amber-950 text-amber-300 shadow-md"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {cs.clientName.split(" ")[0]} Case
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Case Study Breakdown */}
            {(() => {
              const cs = CASE_STUDIES.find(c => c.id === selectedCaseStudyId) || CASE_STUDIES[0];
              return (
                <div className="space-y-6">
                  {/* Case Title Banner */}
                  <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-amber-50 p-6 rounded-3xl border border-amber-500/30 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-800/50 pb-3">
                      <div>
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">Verified Client Case Study</span>
                        <h4 className="font-serif text-2xl font-bold text-amber-200">{cs.clientName}</h4>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-amber-900/80 text-amber-200 font-bold text-xs border border-amber-700">
                        Date of Birth: {cs.dob} (Life Path {cs.birthDateAnalysis.lifePath})
                      </span>
                    </div>

                    <div className="text-xs text-amber-100 space-y-1">
                      <strong className="text-amber-400 uppercase tracking-wider block">Presenting Life Pattern / Challenge:</strong>
                      <p className="leading-relaxed font-medium">{cs.presentingProblem}</p>
                    </div>
                  </div>

                  {/* Diagnosis & Method */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Original vs Correction Analysis */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                      <h5 className="font-serif text-base font-bold text-slate-900">Original Name Profile: {cs.originalNameAnalysis.fullName}</h5>
                      <div className="text-xs space-y-1.5 text-slate-700">
                        <p><strong>Chaldean Expression:</strong> {cs.originalNameAnalysis.chaldeanExpression} (Compound {cs.originalNameAnalysis.chaldeanCompound})</p>
                        <p><strong>Pythagorean Expression:</strong> {cs.originalNameAnalysis.pythagoreanExpression}</p>
                        <p><strong>Soul Urge / Personality:</strong> {cs.originalNameAnalysis.soulUrge} / {cs.originalNameAnalysis.personality}</p>
                        <div className="pt-1">
                          <strong className="text-rose-700 block">Triggered Diagnostic Indicators:</strong>
                          <ul className="list-disc list-inside space-y-1 pt-1 text-rose-900 font-medium">
                            {cs.indicatorDiagnosis.map((ind, i) => (
                              <li key={i}>{ind}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Corrected Profile */}
                    <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 space-y-3">
                      <h5 className="font-serif text-base font-bold text-emerald-950">Corrected Name: {cs.correctedNameAnalysis.correctedFullName}</h5>
                      <span className="inline-block px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 text-[10px] font-bold">
                        {cs.correctedNameAnalysis.methodUsed}
                      </span>
                      <div className="text-xs space-y-1.5 text-emerald-900">
                        <p><strong>Chaldean Expression:</strong> {cs.correctedNameAnalysis.chaldeanExpression} (Compound {cs.correctedNameAnalysis.chaldeanCompound})</p>
                        <p><strong>Pythagorean Expression:</strong> {cs.correctedNameAnalysis.pythagoreanExpression}</p>
                        <p><strong>Personality Number:</strong> {cs.correctedNameAnalysis.personality}</p>
                        <div className="pt-1">
                          <strong className="text-emerald-950 block">Verified Vibrational Benefits:</strong>
                          <ul className="space-y-1 pt-1">
                            {cs.correctedNameAnalysis.keyBenefits.map((ben, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{ben}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* TAB: CHAPTER SEVENTEEN THEORY */}
      {activeTab === "correction_theory" && (
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block font-sans">Chapter Seventeen • Systemic Name Correction Theory</span>
              <h3 className="font-serif text-3xl font-bold text-slate-900">
                {CHAPTER_SEVENTEEN_THEORY_DATA.title}
              </h3>
              <p className="text-sm text-slate-600 mt-1 font-serif italic">
                "{CHAPTER_SEVENTEEN_THEORY_DATA.quote.text}" — <span className="not-italic font-bold text-amber-700">{CHAPTER_SEVENTEEN_THEORY_DATA.quote.author}</span>
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              {CHAPTER_SEVENTEEN_THEORY_DATA.introParagraphs.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed">{p}</p>
              ))}
            </div>

            {/* Diagnostic Standard */}
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 space-y-2 text-xs text-amber-950">
              <strong className="font-bold uppercase tracking-wider block text-amber-900">The Diagnostic Standard:</strong>
              <p className="leading-relaxed">{CHAPTER_SEVENTEEN_THEORY_DATA.diagnosticStandardSummary}</p>
            </div>

            {/* 5 Indicators Breakdown */}
            <div className="space-y-4 pt-2">
              <h4 className="font-serif text-xl font-bold text-slate-900">The Five Indicators when Correction IS Needed</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FIVE_CORRECTION_INDICATORS.map((ind) => (
                  <div key={ind.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <h5 className="font-bold text-sm text-slate-900 font-serif">{ind.title}</h5>
                    <p className="text-xs text-slate-700 leading-relaxed">{ind.description}</p>
                    <p className="text-xs text-amber-900 font-medium leading-relaxed"><strong>Diagnostic Criteria:</strong> {ind.diagnosticCriteria}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contraindications */}
            <div className="space-y-4 pt-2">
              <h4 className="font-serif text-xl font-bold text-slate-900">Contraindications — When NOT to Correct a Name</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CONTRAINDICATIONS.map((ci) => (
                  <div key={ci.id} className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2 text-rose-950">
                    <h5 className="font-bold text-sm font-serif">{ci.title}</h5>
                    <p className="text-xs leading-relaxed">{ci.reason}</p>
                    <p className="text-xs font-bold text-rose-900">Guidance: {ci.recommendation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Methods */}
            <div className="space-y-4 pt-2">
              <h4 className="font-serif text-xl font-bold text-slate-900">The Four Methods of Name Correction</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FOUR_CORRECTION_METHODS.map((m) => (
                  <div key={m.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center">
                      <h5 className="font-bold text-sm text-slate-900 font-serif">{m.title}</h5>
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                        {m.impactLevel} Impact
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">{m.description}</p>
                    <p className="text-xs text-slate-900 font-medium"><strong>Best Suited For:</strong> {m.bestSuitedFor}</p>
                    <div className="text-xs text-slate-600 flex gap-2 flex-wrap pt-1">
                      {m.practicalExamples.map((ex, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 text-[10px]">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Implementation Protocol */}
            <div className="space-y-4 pt-2">
              <h4 className="font-serif text-xl font-bold text-slate-900">The Four-Phase Implementation Protocol</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {CHAPTER_SEVENTEEN_THEORY_DATA.implementationSteps.map((step, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-900 text-slate-100 space-y-2 border border-slate-800">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">{step.phase}</span>
                    <h5 className="font-bold text-sm font-serif text-amber-200">{step.title}</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">{step.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: BUSINESS NAME NUMEROLOGY */}
      {activeTab === "business_names" && (
        <div className="space-y-6">
          {/* Interactive Business Name Evaluator */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block font-sans">Chapter Sixteen • Business Name Evaluator</span>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Business & Enterprise Vibrational Engine
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-900 font-bold text-xs border border-amber-200">
                Commercial Archetype Analysis
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Candidate Business Name:</label>
                <input
                  type="text"
                  value={businessCandidate}
                  onChange={(e) => setBusinessCandidate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  placeholder="e.g., Apex Global Systems"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Founder Life Path Number:</label>
                <select
                  value={businessFounderLP}
                  onChange={(e) => setBusinessFounderLP(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].map((lp) => (
                    <option key={lp} value={lp}>
                      Life Path {lp}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Live Business Evaluation Output */}
            <div className="bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 text-amber-50 p-6 rounded-3xl space-y-6 border border-amber-500/30">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 rounded-2xl bg-slate-800/80 border border-amber-500/30">
                  <span className="text-[10px] uppercase font-bold text-amber-300 block">Chaldean Expression</span>
                  <span className="text-2xl font-serif font-bold text-amber-200">{liveBusinessResult.chaldeanExpression}</span>
                  <span className="text-[10px] text-amber-300/80 block">(Compound {liveBusinessResult.chaldeanCompound})</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-800/80 border border-amber-500/30">
                  <span className="text-[10px] uppercase font-bold text-amber-300 block">Pythagorean Expression</span>
                  <span className="text-2xl font-serif font-bold text-amber-200">{liveBusinessResult.pythagoreanExpression}</span>
                  <span className="text-[10px] text-amber-300/80 block">Standard System</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-800/80 border border-amber-500/30">
                  <span className="text-[10px] uppercase font-bold text-amber-300 block">Cornerstone Initial</span>
                  <span className="text-2xl font-serif font-bold text-amber-200">{liveBusinessResult.cornerstone || "—"}</span>
                  <span className="text-[10px] text-amber-300/80 block">First Impulse</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-800/80 border border-amber-500/30">
                  <span className="text-[10px] uppercase font-bold text-amber-300 block">Capstone Final</span>
                  <span className="text-2xl font-serif font-bold text-amber-200">{liveBusinessResult.capstone || "—"}</span>
                  <span className="text-[10px] text-amber-300/80 block">Lasting Mark</span>
                </div>
              </div>

              {/* Founder Synergy */}
              <div className="bg-amber-950/50 p-4 rounded-2xl border border-amber-800/40 text-xs space-y-1">
                <span className="font-bold text-amber-300 uppercase tracking-wider block">Founder Alignment Assessment:</span>
                <p className="text-amber-100">{liveBusinessResult.founderAlignmentScore}</p>
              </div>

              {/* Caution Info if present */}
              {liveBusinessResult.cautionInfo && (
                <div className="bg-rose-950/80 p-4 rounded-2xl border border-rose-500/50 text-xs space-y-1">
                  <span className="font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    Cautionary Compound Alert: Compound {liveBusinessResult.cautionInfo.compound} ({liveBusinessResult.cautionInfo.name})
                  </span>
                  <p className="text-rose-100">{liveBusinessResult.cautionInfo.description}</p>
                </div>
              )}

              {/* Domain Archetype Detail */}
              <div className="bg-slate-900 p-5 rounded-2xl border border-amber-500/20 space-y-3">
                <h4 className="font-serif text-lg font-bold text-amber-300">
                  Expression {liveBusinessResult.guideline.number}: {liveBusinessResult.guideline.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  <strong>Vibrational Archetype:</strong> {liveBusinessResult.guideline.vibrationalArchetype}
                </p>
                <div className="text-xs text-slate-300 space-y-1">
                  <strong className="text-amber-400 block">Ideal Commercial Applications:</strong>
                  <div className="flex flex-wrap gap-1.5">
                    {liveBusinessResult.guideline.idealApplications.map((app, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-lg bg-amber-950/80 text-amber-200 border border-amber-800/50 text-[10px]">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Business Guidelines Library Selector */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Browse Commercial Archetype Guidelines by Expression Number (1-9, 11, 22, 33):
              </span>
              <div className="grid grid-cols-4 sm:grid-cols-12 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].map((num) => {
                  const isSelected = num === selectedBusinessLibNum;
                  return (
                    <button
                      key={num}
                      onClick={() => setSelectedBusinessLibNum(num)}
                      className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                        isSelected
                          ? "bg-amber-950 text-amber-300 border-amber-950 shadow-md scale-105 font-bold"
                          : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-amber-50"
                      }`}
                    >
                      <span className="font-serif text-lg">{num}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Business Library Card */}
            {(() => {
              const bg = BUSINESS_NAME_DATABASE[selectedBusinessLibNum] || BUSINESS_NAME_DATABASE[1];
              return (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h4 className="font-serif text-xl font-bold text-slate-900">
                      Expression {bg.number} — {bg.title}
                    </h4>
                    <div className="flex gap-1">
                      {bg.keywords.map((kw, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    <strong>Vibrational Profile:</strong> {bg.vibrationalArchetype}
                  </p>

                  <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
                    {bg.detailedParagraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* TAB: BABY NAME NUMEROLOGY */}
      {activeTab === "baby_names" && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block font-sans">Chapter Sixteen • Baby Name Alignment</span>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Child Vibrational Harmony Engine
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-900 font-bold text-xs border border-indigo-200">
                Birth Date & Life Path Synergy
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Child's First Name:</label>
                <input
                  type="text"
                  value={babyFirstNameCandidate}
                  onChange={(e) => setBabyFirstNameCandidate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="e.g., Ananya"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Family Surname:</label>
                <input
                  type="text"
                  value={babySurnameCandidate}
                  onChange={(e) => setBabySurnameCandidate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="e.g., Sharma"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Date of Birth:</label>
                <input
                  type="date"
                  value={babyDobCandidate}
                  onChange={(e) => setBabyDobCandidate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Live Baby Evaluation Result */}
            <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-indigo-50 p-6 rounded-3xl space-y-6 border border-indigo-500/30">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 rounded-2xl bg-indigo-900/60 border border-indigo-500/30">
                  <span className="text-[10px] uppercase font-bold text-indigo-300 block">First Name Expression</span>
                  <span className="text-2xl font-serif font-bold text-indigo-200">{liveBabyResult.firstExpression}</span>
                  <span className="text-[10px] text-indigo-300/80 block">Personal Identity</span>
                </div>

                <div className="p-3 rounded-2xl bg-indigo-900/60 border border-indigo-500/30">
                  <span className="text-[10px] uppercase font-bold text-indigo-300 block">Full Name Chaldean</span>
                  <span className="text-2xl font-serif font-bold text-indigo-200">{liveBabyResult.fullChaldeanExpression}</span>
                  <span className="text-[10px] text-indigo-300/80 block">(Compound {liveBabyResult.fullChaldeanCompound})</span>
                </div>

                <div className="p-3 rounded-2xl bg-indigo-900/60 border border-indigo-500/30">
                  <span className="text-[10px] uppercase font-bold text-indigo-300 block">Full Name Pythagorean</span>
                  <span className="text-2xl font-serif font-bold text-indigo-200">{liveBabyResult.fullPythagoreanExpression}</span>
                  <span className="text-[10px] text-indigo-300/80 block">Destiny Number</span>
                </div>

                <div className="p-3 rounded-2xl bg-indigo-900/60 border border-indigo-500/30">
                  <span className="text-[10px] uppercase font-bold text-indigo-300 block">Cornerstone Letter</span>
                  <span className="text-2xl font-serif font-bold text-indigo-200">{liveBabyResult.cornerstone || "—"}</span>
                  <span className="text-[10px] text-indigo-300/80 block">Life Impulse</span>
                </div>
              </div>

              <div className="bg-indigo-900/50 p-4 rounded-2xl border border-indigo-700/50 text-xs space-y-1">
                <span className="font-bold text-amber-300 uppercase tracking-wider block">Life Path Compatibility Analysis:</span>
                <p className="text-indigo-100">{liveBabyResult.lifePathMatch}</p>
              </div>
            </div>

            {/* 4 Core Principles of Baby Naming */}
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-bold text-slate-900">Four Core Principles of Baby Name Selection</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BABY_NAME_FOUR_PRINCIPLES.map((principle, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <h5 className="font-bold text-sm text-slate-900 font-serif">{principle.title}</h5>
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">{principle.subtitle}</span>
                    <p className="text-xs text-slate-700 leading-relaxed">{principle.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: MARRIAGE NAME NUMEROLOGY */}
      {activeTab === "marriage_names" && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-purple-600 uppercase tracking-widest block font-sans">Chapter Sixteen • Marriage Name Dynamics</span>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Marriage Surname Shift Evaluator
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-900 font-bold text-xs border border-purple-200">
                Vibrational Transformation Analysis
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">First Name:</label>
                <input
                  type="text"
                  value={marriageFirstName}
                  onChange={(e) => setMarriageFirstName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="e.g., Priya"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Birth Surname:</label>
                <input
                  type="text"
                  value={marriageBirthSurname}
                  onChange={(e) => setMarriageBirthSurname(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="e.g., Sharma"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Proposed New Surname:</label>
                <input
                  type="text"
                  value={marriageNewSurname}
                  onChange={(e) => setMarriageNewSurname(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="e.g., Mehta"
                />
              </div>
            </div>

            {/* Live Side-by-Side Comparison Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Birth Name Card */}
              <div className="bg-slate-900 text-purple-100 p-6 rounded-3xl space-y-4 border border-purple-800/40">
                <div className="border-b border-purple-800 pb-2">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">Original Identity</span>
                  <h4 className="font-serif text-xl font-bold text-purple-100">{liveMarriageResult.birthFullName}</h4>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center bg-purple-950/60 p-2.5 rounded-xl border border-purple-800/30">
                    <span>Chaldean Expression:</span>
                    <strong className="text-amber-300 font-serif text-base">{liveMarriageResult.birthChaldeanExpression} (Compound {liveMarriageResult.birthChaldeanCompound})</strong>
                  </div>

                  <div className="flex justify-between items-center bg-purple-950/60 p-2.5 rounded-xl border border-purple-800/30">
                    <span>Pythagorean Expression:</span>
                    <strong className="text-amber-300 font-serif text-base">{liveMarriageResult.birthPythExpression}</strong>
                  </div>
                </div>
              </div>

              {/* Proposed Marriage Name Card */}
              <div className="bg-purple-950 text-purple-100 p-6 rounded-3xl space-y-4 border border-purple-700/50">
                <div className="border-b border-purple-800 pb-2">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">Proposed Marriage Identity</span>
                  <h4 className="font-serif text-xl font-bold text-purple-100">{liveMarriageResult.newFullName}</h4>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center bg-purple-900/60 p-2.5 rounded-xl border border-purple-700/40">
                    <span>Chaldean Expression:</span>
                    <strong className="text-amber-300 font-serif text-base">{liveMarriageResult.newChaldeanExpression} (Compound {liveMarriageResult.newChaldeanCompound})</strong>
                  </div>

                  <div className="flex justify-between items-center bg-purple-900/60 p-2.5 rounded-xl border border-purple-700/40">
                    <span>Pythagorean Expression:</span>
                    <strong className="text-amber-300 font-serif text-base">{liveMarriageResult.newPythExpression}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Shift Summary Box */}
            <div className="bg-purple-50 p-5 rounded-2xl border border-purple-200 text-xs text-purple-950 space-y-1">
              <strong className="font-bold uppercase tracking-wider block">Vibrational Shift Summary:</strong>
              <p className="leading-relaxed">{liveMarriageResult.shiftSummary}</p>
            </div>

            {/* Marriage Name Change Options Guidelines */}
            <div className="space-y-4 pt-2">
              <h4 className="font-serif text-lg font-bold text-slate-900">Structural Options for Marriage Name Selection</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MARRIAGE_NAME_GUIDELINES.map((mg, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <h5 className="font-bold text-sm text-slate-900 font-serif">{mg.aspect}</h5>
                    <p className="text-xs text-slate-700 leading-relaxed"><strong>Vibrational Impact:</strong> {mg.vibrationalImpact}</p>
                    <p className="text-xs text-purple-900 font-medium leading-relaxed"><strong>Guidance:</strong> {mg.analyticalAdvice}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: DIGITAL NAME NUMEROLOGY */}
      {activeTab === "digital_names" && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block font-sans">Chapter Sixteen • Digital Identity Numerology</span>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Email, Domain, Handle & Phone Vibrational Engine
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 font-bold text-xs border border-emerald-200">
                Online Brand Optimization
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Digital Asset Category:</label>
                <select
                  value={digitalCategory}
                  onChange={(e) => setDigitalCategory(e.target.value as "email" | "domain" | "handle" | "phone")}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="email">Email Address Prefix</option>
                  <option value="domain">Website Domain Name</option>
                  <option value="handle">Social Media Handle</option>
                  <option value="phone">Mobile / WhatsApp Number</option>
                </select>
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  {digitalCategory === "email" && "Email Prefix (text before @):"}
                  {digitalCategory === "domain" && "Domain Name (text before .com/.in):"}
                  {digitalCategory === "handle" && "Social Handle (letters only):"}
                  {digitalCategory === "phone" && "Mobile Phone Number (digits only):"}
                </label>
                <input
                  type="text"
                  value={digitalInputText}
                  onChange={(e) => setDigitalInputText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder={
                    digitalCategory === "email"
                      ? "e.g., ravieadagale"
                      : digitalCategory === "domain"
                      ? "e.g., innernumbers"
                      : digitalCategory === "handle"
                      ? "e.g., happyfaces"
                      : "e.g., 9820012345"
                  }
                />
              </div>
            </div>

            {/* Live Digital Output Card */}
            <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-emerald-50 p-6 rounded-3xl space-y-6 border border-emerald-500/30">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-2xl bg-slate-800/80 border border-emerald-500/30">
                  <span className="text-[10px] uppercase font-bold text-emerald-300 block">Processed Input</span>
                  <span className="text-lg font-serif font-bold text-emerald-200 truncate block">{liveDigitalResult.cleanedTextOrDigits || "—"}</span>
                  <span className="text-[10px] text-emerald-300/80 block">Cleaned Text</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-800/80 border border-emerald-500/30">
                  <span className="text-[10px] uppercase font-bold text-emerald-300 block">Chaldean Expression</span>
                  <span className="text-2xl font-serif font-bold text-emerald-200">{liveDigitalResult.chaldeanExpression}</span>
                  <span className="text-[10px] text-emerald-300/80 block">(Compound {liveDigitalResult.chaldeanCompound})</span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-800/80 border border-emerald-500/30">
                  <span className="text-[10px] uppercase font-bold text-emerald-300 block">Pythagorean Expression</span>
                  <span className="text-2xl font-serif font-bold text-emerald-200">{liveDigitalResult.pythagoreanExpression}</span>
                  <span className="text-[10px] text-emerald-300/80 block">Standard System</span>
                </div>
              </div>

              <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-800/40 text-xs space-y-1">
                <span className="font-bold text-amber-300 uppercase tracking-wider block">Digital Asset Resonance:</span>
                <p className="text-emerald-100">{liveDigitalResult.digitalResonance}</p>
              </div>
            </div>

            {/* Category Best Practices */}
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-bold text-slate-900">Digital Asset Best Practices</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DIGITAL_NAME_GUIDELINES.map((dg) => (
                  <div key={dg.category} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <h5 className="font-bold text-sm text-slate-900 font-serif">{dg.title}</h5>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Focus: {dg.focusArea}</span>
                    <p className="text-xs text-slate-700 leading-relaxed">{dg.calculationMethod}</p>
                    <ul className="space-y-1 text-xs text-slate-800 pt-1">
                      {dg.bestPractices.map((bp, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: CHAPTER SIXTEEN APPLIED THEORY */}
      {activeTab === "applied_theory" && (
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block font-sans">Chapter Sixteen • Applied Theoretical Foundations</span>
              <h3 className="font-serif text-3xl font-bold text-slate-900">
                {CHAPTER_SIXTEEN_THEORY_DATA.title}
              </h3>
              <p className="text-sm text-slate-600 mt-1 font-serif italic">
                "{CHAPTER_SIXTEEN_THEORY_DATA.quote.text}" — <span className="not-italic font-bold text-amber-700">{CHAPTER_SIXTEEN_THEORY_DATA.quote.author}</span>
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              {CHAPTER_SIXTEEN_THEORY_DATA.introParagraphs.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed">{p}</p>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 space-y-2">
                <h4 className="font-serif text-base font-bold text-amber-950">1. Business Name Numerology</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {CHAPTER_SIXTEEN_THEORY_DATA.fourDomainsBreakdown.businessNamesRole}
                </p>
              </div>

              <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 space-y-2">
                <h4 className="font-serif text-base font-bold text-indigo-950">2. Baby Name Numerology</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {CHAPTER_SIXTEEN_THEORY_DATA.fourDomainsBreakdown.babyNamesRole}
                </p>
              </div>

              <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100 space-y-2">
                <h4 className="font-serif text-base font-bold text-purple-950">3. Marriage Name Numerology</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {CHAPTER_SIXTEEN_THEORY_DATA.fourDomainsBreakdown.marriageNamesRole}
                </p>
              </div>

              <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 space-y-2">
                <h4 className="font-serif text-base font-bold text-emerald-950">4. Digital Name Numerology</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {CHAPTER_SIXTEEN_THEORY_DATA.fourDomainsBreakdown.digitalNamesRole}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}


      {activeTab === "karmic_lessons_library" && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-3xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Select Karmic Lesson Number to Study Missing Soul Curriculum (1-9):
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                const item = getKarmicLessonAnalysis(num);
                const isSelected = num === selectedKarmicLessonNum;
                return (
                  <button
                    key={num}
                    onClick={() => setSelectedKarmicLessonNum(num)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                      isSelected
                        ? "bg-rose-950 text-amber-300 border-rose-950 shadow-md scale-105 font-bold"
                        : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-rose-50"
                    }`}
                  >
                    <span className="font-serif text-xl">{num}</span>
                    <span className="text-[10px] truncate max-w-full">{item.title.split(" ")[1] || item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Karmic Lesson Detail */}
          {(() => {
            const kl = getKarmicLessonAnalysis(selectedKarmicLessonNum);
            return (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-rose-600 uppercase tracking-widest block">Chapter Thirteen • Karmic Lesson Library</span>
                    <h3 className="font-serif text-2xl font-bold text-slate-900">
                      Karmic Lesson {kl.number} — {kl.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {kl.keywords.map((kw, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 text-[10px] font-bold">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-rose-50/50 p-5 rounded-2xl border border-rose-100 space-y-2">
                    <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-rose-600" />
                      Core Soul Curriculum
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {kl.coreCurriculum}
                    </p>
                  </div>

                  <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-100 space-y-2">
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-amber-600" />
                      Practical Manifestation
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {kl.practicalManifestation}
                    </p>
                  </div>

                  <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100 space-y-2">
                    <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-indigo-600" />
                      Shadow Pattern
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {kl.shadowPattern}
                    </p>
                  </div>
                </div>

                {/* Practical Guidance */}
                <div className="bg-slate-900 text-purple-100 p-6 rounded-2xl space-y-3">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    Practical Guidance for Cultivating Lesson {kl.number}
                  </h4>
                  <ul className="space-y-2 text-xs text-purple-100/90">
                    {kl.practicalGuidance.map((g, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-bold text-amber-400">•</span>
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Detailed Analysis */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-serif">
                    Detailed Soul Curriculum Analysis
                  </h4>
                  <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                    {kl.detailedParagraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB: MISSING & REPEATED LETTERS LIBRARY */}
      {activeTab === "missing_repeated_library" && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-3xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Select Missing Letter (A-Z) to Study Absent Qualities:
            </span>
            <div className="grid grid-cols-6 sm:grid-cols-13 gap-1.5">
              {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((ltr) => {
                const isSelected = ltr === selectedMissingLetter;
                return (
                  <button
                    key={ltr}
                    onClick={() => setSelectedMissingLetter(ltr)}
                    className={`py-2 px-1 rounded-xl border text-center transition-all ${
                      isSelected
                        ? "bg-amber-950 text-amber-300 border-amber-950 font-bold shadow-md scale-105"
                        : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-amber-50"
                    }`}
                  >
                    <span className="font-serif text-base">{ltr}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Missing Letter Analysis */}
          {(() => {
            const ml = getMissingLetterDetail(selectedMissingLetter);
            const rg = REPEATED_LETTERS_GUIDANCE[selectedMissingLetter];
            return (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">Chapter Thirteen • Missing Letter Analysis</span>
                    <h3 className="font-serif text-2xl font-bold text-slate-900">
                      Letter '{ml.letter}' — Removed Quality: {ml.removedQuality}
                    </h3>
                  </div>
                  <div className="text-right font-mono text-xs text-slate-600">
                    Pythagorean: {ml.pythagoreanValue} | Chaldean: {ml.chaldeanValue}
                  </div>
                </div>

                <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 space-y-2">
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">Analysis of Absence</h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {ml.detailedAnalysis}
                  </p>
                </div>

                {/* If letter also has Repeated Letters Guidance */}
                {rg && (
                  <div className="bg-purple-950 text-purple-100 p-6 rounded-2xl space-y-4 border border-purple-800/40">
                    <div className="border-b border-purple-800 pb-2">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">Concentration Dynamics</span>
                      <h4 className="font-serif text-lg font-bold text-purple-100">
                        When Letter '{rg.letter}' Is Repeated (High Concentration)
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div className="bg-purple-900/40 p-4 rounded-xl border border-purple-800/40 space-y-1">
                        <strong className="text-emerald-300 block">Healthy Expression:</strong>
                        <p className="text-purple-100/90">{rg.healthyExpression}</p>
                      </div>

                      <div className="bg-purple-900/40 p-4 rounded-xl border border-purple-800/40 space-y-1">
                        <strong className="text-rose-300 block">Excess Risk:</strong>
                        <p className="text-purple-100/90">{rg.excessRisk}</p>
                      </div>

                      <div className="bg-purple-900/40 p-4 rounded-xl border border-purple-800/40 space-y-1">
                        <strong className="text-amber-300 block">Balancing Practice:</strong>
                        <p className="text-purple-100/90">{rg.balancingPractice}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB: SUBCONSCIOUS SELF LIBRARY */}
      {activeTab === "subconscious_self_library" && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-3xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Select Subconscious Self Score to Study Crisis Response Breadth (3-9):
            </span>
            <div className="grid grid-cols-7 gap-2">
              {[9, 8, 7, 6, 5, 4, 3].map((score) => {
                const item = getSubconsciousSelfAnalysis(score);
                const isSelected = score === selectedSubconsciousScore;
                return (
                  <button
                    key={score}
                    onClick={() => setSelectedSubconsciousScore(score)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                      isSelected
                        ? "bg-purple-950 text-amber-300 border-purple-950 shadow-md scale-105 font-bold"
                        : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-purple-50"
                    }`}
                  >
                    <span className="font-serif text-xl">{score}/9</span>
                    <span className="text-[10px] truncate max-w-full">{item.title.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Subconscious Self Analysis */}
          {(() => {
            const sc = getSubconsciousSelfAnalysis(selectedSubconsciousScore);
            return (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-purple-600 uppercase tracking-widest block">Chapter Thirteen • Subconscious Self Number Library</span>
                    <h3 className="font-serif text-2xl font-bold text-slate-900">
                      Score {sc.score} / 9 — {sc.title}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-bold text-xs">
                    {sc.score} Frequencies Present
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-purple-50/50 p-5 rounded-2xl border border-purple-100 space-y-2">
                    <h4 className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-purple-600" />
                      Crisis Response Breadth
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {sc.crisisResponseBreadth}
                    </p>
                  </div>

                  <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100 space-y-2">
                    <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      Operational Psychology
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {sc.operationalPsychology}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-serif">
                    Detailed Crisis Response Analysis
                  </h4>
                  <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                    {sc.detailedParagraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB: KARMIC THEORY */}
      {activeTab === "karmic_theory" && (
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-widest block font-sans">Chapter Thirteen • Theoretical Foundations</span>
              <h3 className="font-serif text-3xl font-bold text-slate-900">
                {KARMIC_THEORY_DATA.title}
              </h3>
              <p className="text-sm text-slate-600 mt-1 font-serif italic">
                "{KARMIC_THEORY_DATA.quote.text}" — <span className="not-italic font-bold text-rose-700">{KARMIC_THEORY_DATA.quote.author}</span>
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              {KARMIC_THEORY_DATA.introParagraphs.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed">{p}</p>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100 space-y-2">
                <h4 className="font-serif text-base font-bold text-rose-950">1. Karmic Lessons (Absence)</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {KARMIC_THEORY_DATA.fourAspectsBreakdown.karmicLessonsRole}
                </p>
              </div>

              <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 space-y-2">
                <h4 className="font-serif text-base font-bold text-amber-950">2. Missing Letters (Refinement)</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {KARMIC_THEORY_DATA.fourAspectsBreakdown.missingLettersRole}
                </p>
              </div>

              <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 space-y-2">
                <h4 className="font-serif text-base font-bold text-indigo-950">3. Repeated Letters (Concentration)</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {KARMIC_THEORY_DATA.fourAspectsBreakdown.repeatedLettersRole}
                </p>
              </div>

              <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100 space-y-2">
                <h4 className="font-serif text-base font-bold text-purple-950">4. Subconscious Self (Crisis Breadth)</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {KARMIC_THEORY_DATA.fourAspectsBreakdown.subconsciousSelfRole}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: HIDDEN PASSION LIBRARY */}
      {activeTab === "hidden_passion_library" && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-3xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Select Hidden Passion Number to Study Focused Intensity (1-9):
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                const item = getHiddenPassionAnalysis(num);
                const isSelected = num === selectedHiddenPassionNum;
                return (
                  <button
                    key={num}
                    onClick={() => setSelectedHiddenPassionNum(num)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                      isSelected
                        ? "bg-amber-950 text-amber-300 border-amber-950 shadow-md scale-105"
                        : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-amber-50"
                    }`}
                  >
                    <span className="font-serif text-xl font-bold">{num}</span>
                    <span className="text-[10px] truncate max-w-full font-medium">{item.title.split(" ")[1] || item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Hidden Passion Detail */}
          {(() => {
            const hp = getHiddenPassionAnalysis(selectedHiddenPassionNum);
            return (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">Chapter Twelve Hidden Passion Library</span>
                    <h3 className="font-serif text-2xl font-bold text-slate-900">
                      Hidden Passion {hp.number} — {hp.title}
                    </h3>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {hp.keywords.map((kw, i) => (
                      <span key={i} className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-600" />
                      Definition & Irresistible Soul Intensity
                    </h4>
                    <div className="text-xs text-slate-700 leading-relaxed bg-amber-50/50 p-4 rounded-2xl border border-amber-100 space-y-2">
                      <p className="font-semibold text-amber-950">{hp.definition}</p>
                      <p className="text-slate-800">{hp.soulIntensity}</p>
                      {hp.detailedParagraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4 text-rose-600" />
                        Shadow & Concentration Challenges
                      </h4>
                      <p className="text-xs text-slate-700 leading-relaxed bg-rose-50/50 p-4 rounded-2xl border border-rose-100">
                        {hp.shadow}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Developmental Practice
                      </h4>
                      <p className="text-xs text-slate-700 leading-relaxed bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                        {hp.developmentalPractice}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB: CORNERSTONE & CAPSTONE LIBRARY */}
      {activeTab === "cornerstone_capstone_library" && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-3xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Select Letter (A-Z) to Study Cornerstone (Opening) & Capstone (Closure):
            </span>
            <div className="grid grid-cols-6 sm:grid-cols-13 gap-1.5">
              {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((lettr) => {
                const isSelected = lettr === selectedCornerstoneLetter;
                return (
                  <button
                    key={lettr}
                    onClick={() => {
                      setSelectedCornerstoneLetter(lettr);
                      setSelectedCapstoneLetter(lettr);
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${
                      isSelected
                        ? "bg-indigo-950 text-amber-300 border-indigo-950 shadow-md scale-105 font-bold"
                        : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-indigo-50"
                    }`}
                  >
                    <span className="font-serif text-lg">{lettr}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Letter Detail for Cornerstone & Capstone */}
          {(() => {
            const cs = getCornerstoneAnalysis(selectedCornerstoneLetter);
            const cp = getCapstoneAnalysis(selectedCapstoneLetter);
            return (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block">Chapter Twelve Cornerstone & Capstone</span>
                    <h3 className="font-serif text-2xl font-bold text-slate-900">
                      Letter '{cs.letter}' — Openings & Closures
                    </h3>
                  </div>
                  <div className="text-xs font-mono bg-slate-100 px-3 py-1.5 rounded-xl text-slate-700">
                    Chaldean: {cs.chaldeanValue} | Pythagorean: {cs.pythagoreanValue} ({cs.elementalType})
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Cornerstone Box */}
                  <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-3">
                    <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider block">
                      Cornerstone Analysis — How You Begin
                    </span>
                    <h4 className="font-serif text-lg font-bold text-indigo-950">{cs.title}</h4>
                    <p className="text-xs text-indigo-900 font-medium">{cs.approachToBeginning}</p>
                    <div className="space-y-2 pt-2 border-t border-indigo-200 text-xs text-indigo-800">
                      {cs.detailedParagraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>

                  {/* Capstone Box */}
                  <div className="p-6 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-3">
                    <span className="text-xs font-bold text-purple-900 uppercase tracking-wider block">
                      Capstone Analysis — How You Complete
                    </span>
                    <h4 className="font-serif text-lg font-bold text-purple-950">{cp.title}</h4>
                    <p className="text-xs text-purple-900 font-medium">{cp.completionStyle}</p>
                    <div className="space-y-2 pt-2 border-t border-purple-200 text-xs text-purple-800">
                      {cp.detailedParagraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB: FIRST VOWEL LIBRARY */}
      {activeTab === "first_vowel_library" && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-3xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Select First Vowel (A, E, I, O, U) to Study Emotional Gut Default:
            </span>
            <div className="grid grid-cols-5 gap-3">
              {["A", "E", "I", "O", "U"].map((vwl) => {
                const item = getFirstVowelAnalysis(vwl);
                const isSelected = vwl === selectedFirstVowelLetter;
                return (
                  <button
                    key={vwl}
                    onClick={() => setSelectedFirstVowelLetter(vwl)}
                    className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                      isSelected
                        ? "bg-rose-950 text-rose-200 border-rose-950 shadow-md scale-105"
                        : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-rose-50"
                    }`}
                  >
                    <span className="font-serif text-2xl font-bold">{vwl}</span>
                    <span className="text-[10px] truncate max-w-full font-medium">{item.title.split(" ")[1] || item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active First Vowel Detail */}
          {(() => {
            const fv = getFirstVowelAnalysis(selectedFirstVowelLetter);
            return (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-rose-600 uppercase tracking-widest block">Chapter Twelve First Vowel Analysis</span>
                    <h3 className="font-serif text-2xl font-bold text-slate-900">
                      Vowel '{fv.letter}' — {fv.title}
                    </h3>
                  </div>
                  <div className="text-xs font-mono bg-rose-50 text-rose-900 px-3 py-1.5 rounded-xl border border-rose-200 font-bold">
                    Chaldean: {fv.chaldeanValue} | Pythagorean: {fv.pythagoreanValue}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-2">
                  <span className="text-xs font-bold text-rose-900 uppercase tracking-wider block">Immediate Emotional Default</span>
                  <p className="text-sm font-serif font-bold text-rose-950">"{fv.emotionalDefault}"</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <span className="font-bold text-slate-900 uppercase tracking-wider block">Core Strength</span>
                    <p className="text-slate-700">{fv.strength}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <span className="font-bold text-slate-900 uppercase tracking-wider block">Shadow Pattern</span>
                    <p className="text-slate-700">{fv.shadow}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <span className="font-bold text-slate-900 uppercase tracking-wider block">Developmental Practice</span>
                    <p className="text-slate-700">{fv.developmentalPractice}</p>
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-3">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Detailed Vowel Analysis</span>
                  <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                    {fv.detailedParagraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB: FINER DIMENSIONS THEORY */}
      {activeTab === "finer_dimensions_theory" && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          <div className="border-b border-slate-100 pb-4 space-y-2">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">Chapter Twelve Theory</span>
            <h3 className="font-serif text-2xl font-bold text-slate-900">{FINER_DIMENSIONS_THEORY.title}</h3>
            <p className="text-xs text-slate-600 font-serif italic">"{FINER_DIMENSIONS_THEORY.quote.text}" — {FINER_DIMENSIONS_THEORY.quote.author}</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">The Four Finer Dimensions of Name Vibrations</h4>
            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              {FINER_DIMENSIONS_THEORY.introParagraphs.map((p, idx) => (
                <p key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">{p}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-xs">
              <span className="font-bold text-amber-950 block uppercase tracking-wider">Hidden Passion</span>
              <p className="text-amber-900">{FINER_DIMENSIONS_THEORY.fourDimensionsBreakdown.hiddenPassionRole}</p>
            </div>
            <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-2 text-xs">
              <span className="font-bold text-indigo-950 block uppercase tracking-wider">Cornerstone</span>
              <p className="text-indigo-900">{FINER_DIMENSIONS_THEORY.fourDimensionsBreakdown.cornerstoneRole}</p>
            </div>
            <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 space-y-2 text-xs">
              <span className="font-bold text-purple-950 block uppercase tracking-wider">Capstone</span>
              <p className="text-purple-900">{FINER_DIMENSIONS_THEORY.fourDimensionsBreakdown.capstoneRole}</p>
            </div>
            <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2 text-xs">
              <span className="font-bold text-rose-950 block uppercase tracking-wider">First Vowel</span>
              <p className="text-rose-900">{FINER_DIMENSIONS_THEORY.fourDimensionsBreakdown.firstVowelRole}</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB: PERSONALITY LIBRARY (CHAPTER 11) */}
      {activeTab === "personality_library" && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-3xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Select Personality Number to Study Outer Mask (1-9, 11, 22, 33):
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-12 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].map((num) => {
                const item = getPersonalityAnalysis(num);
                const isSelected = num === selectedPersonalityNum;
                return (
                  <button
                    key={num}
                    onClick={() => setSelectedPersonalityNum(num)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                      isSelected
                        ? "bg-indigo-950 text-amber-300 border-indigo-950 shadow-md scale-105"
                        : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-indigo-50"
                    }`}
                  >
                    <span className="font-serif text-xl font-bold">{num}</span>
                    <span className="text-[10px] truncate max-w-full font-medium">{item.title.split(" ")[1] || item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Personality Detail */}
          {(() => {
            const pAnalysis = getPersonalityAnalysis(selectedPersonalityNum);
            return (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block">Chapter Eleven Personality Library</span>
                    <h3 className="font-serif text-2xl font-bold text-slate-900">
                      Personality {pAnalysis.number} — {pAnalysis.title}
                    </h3>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {pAnalysis.keywords.map((kw, i) => (
                      <span key={i} className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-indigo-600" />
                      First Impression & Outer Social Field
                    </h4>
                    <div className="text-xs text-slate-700 leading-relaxed bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 font-medium space-y-2">
                      {pAnalysis.firstImpressionParagraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-rose-600" />
                      The Gap Between Outer and Inner Self
                    </h4>
                    <div className="text-xs text-slate-700 leading-relaxed bg-rose-50/50 p-4 rounded-2xl border border-rose-100 space-y-2">
                      {pAnalysis.gapParagraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-3">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                    Practical Leadership & Integration Guidance for Personality {pAnalysis.number}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {pAnalysis.practicalGuidance.map((guide, idx) => (
                      <div key={idx} className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-xs text-slate-200">
                        {guide}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB: INNER DREAM LIBRARY (CHAPTER 11) */}
      {activeTab === "inner_dream_library" && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-3xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Select Inner Dream Number to Study Secret Self (1-9, 11, 22, 33):
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-12 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].map((num) => {
                const item = getInnerDreamAnalysis(num);
                const isSelected = num === selectedInnerDreamNum;
                return (
                  <button
                    key={num}
                    onClick={() => setSelectedInnerDreamNum(num)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                      isSelected
                        ? "bg-purple-950 text-amber-300 border-purple-950 shadow-md scale-105"
                        : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-purple-50"
                    }`}
                  >
                    <span className="font-serif text-xl font-bold">{num}</span>
                    <span className="text-[10px] truncate max-w-full font-medium">{item.title.split(" ")[1] || item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Inner Dream Detail */}
          {(() => {
            const idAnalysis = getInnerDreamAnalysis(selectedInnerDreamNum);
            return (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-purple-600 uppercase tracking-widest block">Chapter Eleven Inner Dream Library</span>
                    <h3 className="font-serif text-2xl font-bold text-slate-900">
                      Inner Dream {idAnalysis.number} — {idAnalysis.title}
                    </h3>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {idAnalysis.keywords.map((kw, i) => (
                      <span key={i} className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      The Secret Self-Image & Private Fantasy
                    </h4>
                    <div className="text-xs text-slate-700 leading-relaxed bg-purple-50/50 p-4 rounded-2xl border border-purple-100 font-medium space-y-2">
                      {idAnalysis.secretSelfParagraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <Heart className="w-4 h-4 text-rose-600" />
                      The Characteristic Flash of Recognition
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed bg-rose-50/50 p-4 rounded-2xl border border-rose-100 italic">
                      "{idAnalysis.recognitionFlash}"
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-3">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                    Unlived Potential Integration for Inner Dream {idAnalysis.number}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {idAnalysis.consultationIntegration.map((guide, idx) => (
                      <div key={idx} className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-xs text-slate-200">
                        {guide}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB: CONSONANT PHYSICS & THEORY (CHAPTER 11) */}
      {activeTab === "consonant_theory" && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          <div className="border-b border-slate-100 pb-4 space-y-2">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block">Chapter Eleven Theory</span>
            <h3 className="font-serif text-2xl font-bold text-slate-900">{PERSONALITY_INNER_DREAM_THEORY.title}</h3>
            <p className="text-xs text-slate-600 font-serif italic">"{PERSONALITY_INNER_DREAM_THEORY.quote.text}" — {PERSONALITY_INNER_DREAM_THEORY.quote.author}</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">Consonant Physics & Architectural Sound</h4>
            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              {PERSONALITY_INNER_DREAM_THEORY.introParagraphs.map((p, idx) => (
                <p key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">{p}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-2 text-xs">
              <span className="font-bold text-indigo-950 block uppercase tracking-wider">Vowels vs Consonants</span>
              <p className="text-indigo-900">{PERSONALITY_INNER_DREAM_THEORY.consonantPhysics.vowelsVsConsonants}</p>
            </div>
            <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 space-y-2 text-xs">
              <span className="font-bold text-purple-950 block uppercase tracking-wider">Calculation Rules</span>
              <p className="text-purple-900">{PERSONALITY_INNER_DREAM_THEORY.consonantPhysics.calculationRules}</p>
            </div>
            <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2 text-xs">
              <span className="font-bold text-rose-950 block uppercase tracking-wider">Diagnostic Value</span>
              <p className="text-rose-900">{PERSONALITY_INNER_DREAM_THEORY.personalityVsInnerDream.gapDiagnosticValue}</p>
            </div>
          </div>

          {/* Consonant Details Breakdown */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-slate-900">Key Consonants & Their Energetic Signatures</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.values(CONSONANT_DETAILS).map((cd) => (
                <div key={cd.letter} className="p-5 rounded-2xl bg-slate-900 text-white space-y-2 border border-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-serif text-2xl font-bold text-amber-400">{cd.letter}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300">
                      Chaldean: {cd.chaldeanValue} | Pythag: {cd.pythagoreanValue}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-amber-200 block">{cd.energeticTheme}</span>
                  <p className="text-xs text-slate-300 leading-relaxed">{cd.detailedMeaning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SOUL URGE LIBRARY (CHAPTER 10) */}
      {activeTab === "soul_urge_library" && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-3xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Select Soul Urge Number to Study (1-9, 11, 22, 33):
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-12 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].map((num) => {
                const item = getSoulUrgeAnalysis(num);
                const isSelected = num === selectedSoulUrgeNum;
                return (
                  <button
                    key={num}
                    onClick={() => setSelectedSoulUrgeNum(num)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                      isSelected
                        ? "bg-rose-950 text-amber-300 border-rose-950 shadow-md scale-105"
                        : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-rose-50"
                    }`}
                  >
                    <span className="font-serif text-xl font-bold">{num}</span>
                    <span className="text-[10px] truncate max-w-full font-medium">{item.title.split(" ")[1] || item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Soul Urge Detail */}
          {(() => {
            const su = getSoulUrgeAnalysis(selectedSoulUrgeNum);
            return (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-rose-600 uppercase tracking-widest block">Chapter Ten Soul Urge Library</span>
                    <h3 className="font-serif text-2xl font-bold text-slate-900">
                      Soul Urge {su.number} — {su.title}
                    </h3>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {su.keywords.map((kw, i) => (
                      <span key={i} className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-rose-600" />
                      What This Soul Hungers For
                    </h4>
                    <div className="text-xs text-slate-700 leading-relaxed bg-rose-50/50 p-4 rounded-2xl border border-rose-100 font-medium space-y-2">
                      <p>{su.soulHunger}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <Heart className="w-4 h-4 text-rose-600" />
                      Core Definition & Meaning
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">{su.definition}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200 space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      When Fulfilled
                    </h4>
                    <div className="text-xs text-emerald-950 leading-relaxed space-y-2">
                      <p>{su.whenFulfilled}</p>
                    </div>
                  </div>

                  <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-200 space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-rose-600" />
                      When Unfulfilled
                    </h4>
                    <div className="text-xs text-rose-950 leading-relaxed space-y-2">
                      <p>{su.whenUnfulfilled}</p>
                    </div>
                  </div>
                </div>

                {/* Relationships, Work, Spiritual Lesson */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>Relationships & Love</span>
                    </div>
                    <p className="text-[11px] text-slate-700">{su.relationshipsAndLove.traits}</p>
                    <div className="pt-2 border-t border-slate-200 text-[10px] text-rose-950 font-medium">
                      <strong>Growth Edge:</strong> {su.relationshipsAndLove.growthEdge}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                      <Briefcase className="w-4 h-4 text-indigo-500" />
                      <span>Work & Environment</span>
                    </div>
                    <p className="text-[11px] text-slate-700">{su.careerAndWork.requiredEnvironment}</p>
                    <div className="pt-2 border-t border-slate-200 text-[10px] text-indigo-950 font-medium">
                      <strong>Key Question:</strong> "{su.careerAndWork.motivatingQuestion}"
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      <span>Spiritual Lesson</span>
                    </div>
                    <p className="text-[11px] text-slate-700 italic">"{su.spiritualLesson}"</p>
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-3">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Practical Soul Guidance</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {su.practicalGuidance.map((guide, idx) => (
                      <div key={idx} className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-xs text-slate-200">
                        {guide}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB 3: EXPRESSION NUMBERS LIBRARY */}
      {activeTab === "expression_library" && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-3xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Select Expression Number to Study (1-9, 11, 22, 33):
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-12 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].map((num) => {
                const item = EXPRESSION_NUMBERS_DATABASE[num];
                const isSelected = num === selectedExpressionNum;
                return (
                  <button
                    key={num}
                    onClick={() => setSelectedExpressionNum(num)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                      isSelected
                        ? "bg-purple-950 text-amber-300 border-purple-950 shadow-md scale-105"
                        : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-purple-50"
                    }`}
                  >
                    <span className="font-serif text-xl font-bold">{num}</span>
                    <span className="text-[10px] truncate max-w-full font-medium">{item.title.split(" ")[1] || item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Expression Detail */}
          {(() => {
            const exp = getExpressionNumberAnalysis(selectedExpressionNum);
            return (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-purple-600 uppercase tracking-widest block">Expression Calling Library</span>
                    <h3 className="font-serif text-2xl font-bold text-slate-900">
                      Expression {exp.number} — {exp.title}
                    </h3>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {exp.keywords.map((kw, i) => (
                      <span key={i} className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
                  {exp.callingDefinition}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">Meaning & Core Vibration</h4>
                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">{exp.meaning}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">Personality & Character Expression</h4>
                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">{exp.personalityAndCharacter}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200 space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-900">Strengths</h4>
                    <ul className="space-y-1 text-xs text-emerald-950">
                      {exp.strengths.map((str, idx) => (
                        <li key={idx}>• {str}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-200 space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-rose-900">Shadow & Drawbacks</h4>
                    <ul className="space-y-1 text-xs text-rose-950">
                      {exp.shadowAndDrawbacks.map((sh, idx) => (
                        <li key={idx}>• {sh}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB 4: INDIAN DESTINY NUMBERS LIBRARY */}
      {activeTab === "destiny_library" && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-3xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Select Indian Destiny Number to Study (Direct Continuous Sum Method):
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-12 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].map((num) => {
                const item = DESTINY_NUMBERS_DATABASE[num];
                const isSelected = num === selectedDestinyNum;
                return (
                  <button
                    key={num}
                    onClick={() => setSelectedDestinyNum(num)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                      isSelected
                        ? "bg-amber-950 text-amber-300 border-amber-950 shadow-md scale-105"
                        : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-amber-50"
                    }`}
                  >
                    <span className="font-serif text-xl font-bold">{num}</span>
                    <span className="text-[10px] truncate max-w-full font-medium">{item.title.split(" ")[1] || item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Destiny Detail */}
          {(() => {
            const dest = getDestinyNumberAnalysis(selectedDestinyNum);
            return (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">Indian Destiny Terrain Reference</span>
                  <h3 className="font-serif text-2xl font-bold text-slate-900">
                    Destiny {dest.number} — {dest.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 font-medium">Terrain Type: {dest.terrainType}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">Outer Circumstances & Environment</h4>
                    <p className="text-xs text-slate-700 leading-relaxed bg-amber-50/50 p-4 rounded-2xl border border-amber-200/60">{dest.outerCircumstances}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">Life Path Alignment Interaction</h4>
                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">{dest.lifePathAlignmentNote}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-xs font-bold text-indigo-900 block">Career Terrain:</span>
                    <p className="text-xs text-slate-700">{dest.careerTerrain}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-xs font-bold text-rose-900 block">Relationship Terrain:</span>
                    <p className="text-xs text-slate-700">{dest.relationshipTerrain}</p>
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-3">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Practical Terrain Guidance</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {dest.practicalGuidance.map((guide, idx) => (
                      <div key={idx} className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-xs text-slate-200">
                        {guide}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB 5: NAME ENERGY THEORY */}
      {activeTab === "name_energy_theory" && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-widest block">Chapter Eight Reference</span>
            <h3 className="font-serif text-2xl font-bold text-slate-900">{NAME_ENERGY_THEORY.title}</h3>
            <p className="text-xs text-slate-600">{NAME_ENERGY_THEORY.subtitle}</p>
          </div>

          <div className="space-y-6">
            {NAME_ENERGY_THEORY.sections.map((sec) => (
              <div key={sec.id} className="space-y-3 bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80">
                <h4 className="font-serif text-lg font-bold text-purple-950">{sec.heading}</h4>
                <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
                  {sec.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {sec.keyTakeaways && (
                  <div className="pt-3 border-t border-slate-200 space-y-1">
                    <span className="text-[11px] font-bold text-purple-900 uppercase tracking-wider block">Key Principles:</span>
                    <ul className="space-y-1 text-xs text-slate-800">
                      {sec.keyTakeaways.map((kt, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{kt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Letter Value Systems Comparison */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-slate-900">Comparison of Letter Value Systems</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {NAME_ENERGY_THEORY.letterValueSystems.map((sys, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-purple-950">{sys.system} System</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-200 text-purple-900">{sys.basis}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{sys.description}</p>
                  {sys.noNineRuleReasoning && (
                    <p className="text-[11px] text-purple-900 italic pt-1 border-t border-purple-200/80">
                      <strong>No 9 Rule:</strong> {sys.noNineRuleReasoning}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 6-Step Method */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-slate-900">Standard 6-Step Calculation Method</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {NAME_ENERGY_THEORY.calculationSteps.map((s) => (
                <div key={s.step} className="p-4 rounded-xl bg-slate-900 text-white space-y-1">
                  <span className="text-xs font-bold text-amber-400 block">Step {s.step}: {s.title}</span>
                  <p className="text-xs text-slate-300 leading-normal">{s.instruction}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};