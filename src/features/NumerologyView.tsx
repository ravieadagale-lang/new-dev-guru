import React, { useState, useMemo } from "react";
import { UserProfile, LanguageCode } from "../types";
import { calculateNumerologyReport } from "../data/numerologyData";
import { AdvanceNumerologyReportView } from "../components/AdvanceNumerologyReportView";
import { NumerologyKnowledgeBaseView } from "../components/NumerologyKnowledgeBaseView";
import { NumerologyNameSystemView } from "../components/NumerologyNameSystemView";
import { NumerologyArchetypeBookView } from "../components/NumerologyArchetypeBookView";
import { NumerologyMasterKarmicView } from "../components/NumerologyMasterKarmicView";
import { LoShuGridSystemView } from "../components/LoShuGridSystemView";
import { LoShuArrowsView } from "../components/LoShuArrowsView";
import { LoShuMissingRepeatedView } from "../components/LoShuMissingRepeatedView";
import { MobileNumerologyView } from "../components/MobileNumerologyView";
import { VehicleNumerologyView } from "../components/VehicleNumerologyView";
import { HouseNumerologyView } from "../components/HouseNumerologyView";
import { BusinessNumerologyView } from "../components/BusinessNumerologyView";
import { BrandNumerologyView } from "../components/BrandNumerologyView";
import { MuhurtaNumerologyView } from "../components/MuhurtaNumerologyView";
import { NumerologyLuckyRemediesView } from "../components/NumerologyLuckyRemediesView";
import { SignatureAnalysisView } from "../components/SignatureAnalysisView";
import { SpiritualRemediesMantrasView } from "../components/SpiritualRemediesMantrasView";
import { YantrasCrystalsEnergyView } from "../components/YantrasCrystalsEnergyView";
import { ChakraBalancingRemediesView } from "../components/ChakraBalancingRemediesView";
import { BirthMonthView } from "../components/BirthMonthView";
import { NumerologyRemediesView } from "../components/NumerologyRemediesView";
import { 
  Sparkles, 
  BookOpen, 
  Hash, 
  Type, 
  HeartHandshake, 
  Award, 
  ShieldAlert, 
  Grid3X3, 
  Compass, 
  Zap, 
  Phone, 
  Car, 
  Home, 
  Briefcase, 
  Building2, 
  Calendar, 
  Gem, 
  PenTool, 
  Flame, 
  Layers, 
  Heart,
  Shield
} from "lucide-react";

interface NumerologyViewProps {
  userProfile: UserProfile;
  onUpdateProfile?: (profile: UserProfile) => void;
  selectedLanguage?: LanguageCode;
  onLanguageChange?: (lang: LanguageCode) => void;
}

export const NumerologyView: React.FC<NumerologyViewProps> = ({
  userProfile,
  selectedLanguage = "en",
  onLanguageChange
}) => {
  const currentLang = selectedLanguage || "en";
  const [name, setName] = useState(userProfile.name || "Aarav Sharma");
  const [dob, setDob] = useState(userProfile.dob || "1995-08-15");
  const [gender, setGender] = useState<"male" | "female" | "other">(userProfile.gender || "male");
  const [activeTab, setActiveTab] = useState("report_generator");

  const [mobile] = useState("9876543210");
  const [vehicle] = useState("MH01AX9999");
  const [house] = useState("Flat 502, Crystal Heights");
  const [business] = useState("Dev-Guru Innovations");

  const numbers = useMemo(() => calculateNumerologyReport(name, dob), [name, dob]);

  const navTabs = [
    { id: "report_generator", label: "⚡ Advance Report Generator", icon: Sparkles },
    { id: "sacred_remedies", label: "🌿 Sacred Remedies (Yantras, Deities, Gems, Rudraksha)", icon: Shield },
    { id: "knowledge_base", label: "📚 Knowledge Base & Theory", icon: BookOpen },
    { id: "core", label: "Core Numbers Matrix", icon: Hash },
    { id: "name_system", label: "Name & Destiny System", icon: Type },
    { id: "compatibility_engine", label: "Compatibility Matrix Engine", icon: HeartHandshake },
    { id: "compatibility_theory", label: "Compatibility Theory", icon: BookOpen },
    { id: "archetype_book", label: "Master Archetype Book", icon: Award },
    { id: "master_karmic_book", label: "Master & Karmic Debt Engine", icon: ShieldAlert },
    { id: "loshu", label: "Lo Shu Grid & Planes", icon: Grid3X3 },
    { id: "loshu_arrows", label: "16 Lo Shu Arrows", icon: Compass },
    { id: "loshu_missing_repeated", label: "Missing & Repeated Numbers", icon: Zap },
    { id: "mobile_numerology", label: "Mobile Numerology", icon: Phone },
    { id: "vehicle_numerology", label: "Vehicle Numerology", icon: Car },
    { id: "house_numerology", label: "House Numerology", icon: Home },
    { id: "business_numerology", label: "Business & Brand Numerology", icon: Briefcase },
    { id: "brand_numerology", label: "Brand Numerology", icon: Building2 },
    { id: "muhurta_numerology", label: "Muhurta Numerology", icon: Calendar },
    { id: "lucky_remedies", label: "Lucky Attributes, Gemstones & Remedies", icon: Gem },
    { id: "signature_analysis", label: "Signature Analysis", icon: PenTool },
    { id: "spiritual_remedies", label: "Spiritual Remedies & Mantras", icon: Flame },
    { id: "yantras_crystals_energy", label: "Yantras, Crystals & Energy", icon: Layers },
    { id: "chakra_balancing_ch38", label: "Chakra Balancing Remedies", icon: Heart },
    { id: "birth_month_ch39", label: "Birth Month Analysis", icon: Calendar },
  ];

  return (
    <div className="space-y-8 py-4">
      {/* Subtabs Horizontal Scrolling Ribbon */}
      <div className="flex items-center overflow-x-auto gap-2 border-b border-amber-900/10 pb-2 no-scrollbar text-xs font-semibold">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`whitespace-nowrap px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                isActive
                  ? "bg-slate-900 text-amber-300 font-bold shadow-xs scale-105"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-amber-900/10"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Subtab Views */}
      {activeTab === "report_generator" && (
        <AdvanceNumerologyReportView
          initialName={name}
          initialDob={dob}
          initialGender={gender}
          userProfile={userProfile}
          selectedLanguage={currentLang}
        />
      )}

      {activeTab === "sacred_remedies" && (
        <NumerologyRemediesView initialNumber={numbers.birthNumber} />
      )}

      {activeTab === "knowledge_base" && (
        <NumerologyKnowledgeBaseView onNavigateTab={(tab) => setActiveTab(tab)} />
      )}

      {(activeTab === "name_system" || activeTab === "compatibility_engine" || activeTab === "compatibility_theory") && (
        <NumerologyNameSystemView
          initialName={name}
          initialDob={dob}
          initialTab={activeTab === "name_system" ? undefined : (activeTab as any)}
        />
      )}

      {activeTab === "archetype_book" && (
        <NumerologyArchetypeBookView
          initialDriverNumber={numbers.birthNumber}
          gender={gender}
          userName={name}
        />
      )}

      {activeTab === "master_karmic_book" && (
        <NumerologyMasterKarmicView
          userLifePath={numbers?.birthNumber ?? 1}
          userKarmicDebt={(numbers?.karmicDebts || []).map((x) => x.name)}
          userName={name}
        />
      )}

      {activeTab === "core" && (
        <div className="space-y-6">
          {/* Top 4 Numbers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-xs space-y-2 relative overflow-hidden flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                  Birth Number (Mulank)
                </span>
                <div className="font-serif text-4xl font-bold text-slate-900">{numbers.birthNumber}</div>
                <div className="text-xs font-semibold text-amber-900">
                  Ruled by {numbers.vibrations.rulingPlanet}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Determines your innate psychological nature, initial behavioral traits, and core instincts.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("archetype_book")}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100/70 hover:bg-amber-200/80 px-3 py-1.5 rounded-xl border border-amber-300 transition-all self-start cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                <span>Read Full Book Chapter #{numbers.birthNumber}</span>
              </button>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-xs space-y-2">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                Destiny Number (Bhagyank)
              </span>
              <div className="font-serif text-4xl font-bold text-slate-900">{numbers.destinyNumber}</div>
              <div className="text-xs font-semibold text-amber-900">Life Purpose Vector</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Represents your total life journey, career path, worldly accomplishments, and karmic destiny.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-xs space-y-2">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                Pythagorean Life Path
              </span>
              <div className="font-serif text-4xl font-bold text-slate-900">{numbers.lifePathNumber}</div>
              <div className="text-xs font-semibold text-emerald-700">Structural Baseline</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculated from reduced day + reduced month + reduced year sum. Key structural path.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-xs space-y-2">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                Chaldean Name Compound
              </span>
              <div className="font-serif text-4xl font-bold text-slate-900">
                {numbers.compoundNumber}{" "}
                <span className="text-xl font-sans text-amber-800">({numbers.chaldeanNameNumber})</span>
              </div>
              <div className="text-xs font-semibold text-amber-900">External Name Vibration</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                The public sound frequency projected into society through your spoken and written name.
              </p>
            </div>
          </div>

          {/* 8-Fold Constitution */}
          <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-xs space-y-4">
            <h3 className="font-serif text-xl font-bold text-slate-900 border-b border-amber-900/10 pb-2">
              Complete 8-Fold Numerological Constitution
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-900/10 space-y-1">
                <span className="font-bold text-amber-900">Expression Number: {numbers.expressionNumber}</span>
                <p className="text-slate-600 text-[11px]">
                  Pythagorean full name sum. Reflects physical talents and creative gifts.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-900/10 space-y-1">
                <span className="font-bold text-amber-900">Soul Urge (Vowels): {numbers.soulUrgeNumber}</span>
                <p className="text-slate-600 text-[11px]">
                  Heart's deepest desire, inner spiritual urge, and secret motivations.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-900/10 space-y-1">
                <span className="font-bold text-amber-900">Personality (Consonants): {numbers.personalityNumber}</span>
                <p className="text-slate-600 text-[11px]">
                  Outer image projected to social acquaintances and initial impressions.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-900/10 space-y-1">
                <span className="font-bold text-amber-900">Attitude / Sun Number: {numbers.attitudeNumber}</span>
                <p className="text-slate-600 text-[11px]">
                  Reduced (Day + Month). Shows your initial reaction to unexpected events.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-900/10 space-y-1">
                <span className="font-bold text-amber-900">Maturity Number: {numbers.maturityNumber}</span>
                <p className="text-slate-600 text-[11px]">
                  Life Path + Expression. Unlocks after age 35 to shape long-term wisdom.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-900/10 space-y-1">
                <span className="font-bold text-amber-900">Birthday Day Vibration: {numbers.birthdayNumber}</span>
                <p className="text-slate-600 text-[11px]">
                  Specific day of birth vibration influencing special skills and talents.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-900/10 space-y-1">
                <span className="font-bold text-amber-900">Ruling Planet: {numbers.vibrations.rulingPlanet}</span>
                <p className="text-slate-600 text-[11px]">
                  Primary celestial governor imparting core elemental strength.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-900/10 space-y-1">
                <span className="font-bold text-amber-900">Lucky Gemstone: {numbers.vibrations.luckyGemstone}</span>
                <p className="text-slate-600 text-[11px]">
                  Primary mineral crystal for harmonizing subtle auric vibrations.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "loshu" && (
        <LoShuGridSystemView
          initialDob={dob}
          userProfile={userProfile}
          selectedLanguage={currentLang}
        />
      )}

      {activeTab === "loshu_arrows" && (
        <LoShuArrowsView
          initialDob={dob}
          driverNum={numbers.birthNumber}
          conductorNum={numbers.destinyNumber}
        />
      )}

      {activeTab === "loshu_missing_repeated" && (
        <LoShuMissingRepeatedView
          initialDob={dob}
          driverNum={numbers.birthNumber}
          conductorNum={numbers.destinyNumber}
        />
      )}

      {activeTab === "mobile_numerology" && (
        <MobileNumerologyView
          initialPrimaryMobile={mobile}
          initialDob={dob}
          userProfile={userProfile}
          selectedLanguage={currentLang}
        />
      )}

      {activeTab === "vehicle_numerology" && (
        <VehicleNumerologyView
          initialVehicleNumber={vehicle}
          initialDob={dob}
          userProfile={userProfile}
          selectedLanguage={currentLang}
        />
      )}

      {activeTab === "house_numerology" && (
        <HouseNumerologyView
          initialHouseNumber={house}
          initialDob={dob}
          userProfile={userProfile}
          selectedLanguage={currentLang}
        />
      )}

      {activeTab === "business_numerology" && (
        <BusinessNumerologyView initialBrandName={business} />
      )}

      {activeTab === "brand_numerology" && (
        <BrandNumerologyView initialBrandName={business} />
      )}

      {activeTab === "muhurta_numerology" && (
        <MuhurtaNumerologyView initialDob={dob} />
      )}

      {activeTab === "lucky_remedies" && (
        <NumerologyLuckyRemediesView
          initialNumber={numbers.birthNumber}
          initialDob={dob}
        />
      )}

      {activeTab === "signature_analysis" && (
        <SignatureAnalysisView
          initialName={name}
          driverNumber={numbers.birthNumber}
          lifePathNumber={numbers.lifePathNumber}
        />
      )}

      {activeTab === "spiritual_remedies" && (
        <SpiritualRemediesMantrasView
          driverNumber={numbers.birthNumber}
          lifePathNumber={numbers.lifePathNumber}
        />
      )}

      {activeTab === "yantras_crystals_energy" && (
        <YantrasCrystalsEnergyView
          driverNumber={numbers.birthNumber}
          lifePathNumber={numbers.lifePathNumber}
        />
      )}

      {activeTab === "chakra_balancing_ch38" && (
        <ChakraBalancingRemediesView
          driverNumber={numbers.birthNumber}
          lifePathNumber={numbers.lifePathNumber}
        />
      )}

      {activeTab === "birth_month_ch39" && (
        <BirthMonthView userBirthDate={dob} />
      )}
    </div>
  );
};

export default NumerologyView;
