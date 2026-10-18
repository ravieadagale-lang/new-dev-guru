// src/components/NumerologyMasterKarmicView.tsx
import React, { useState } from "react";
import { 
  Zap, 
  ShieldAlert, 
  BookOpen, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Heart, 
  HelpCircle, 
  UserCheck, 
  Scale, 
  Compass, 
  FileText,
  Building2,
  Flame,
  ArrowRight
} from "lucide-react";
import {
  MASTER_KARMIC_CHAPTER_META,
  MASTER_NUMBERS_DATABASE,
  KARMIC_DEBT_DATABASE,
  MasterNumberDetail,
  KarmicDebtDetail
} from "../data/numerologyMasterKarmicEngine";

interface NumerologyMasterKarmicViewProps {
  userLifePath?: number;
  userKarmicDebt?: string[];
  userName?: string;
}

export const NumerologyMasterKarmicView: React.FC<NumerologyMasterKarmicViewProps> = ({
  userLifePath = 11,
  userKarmicDebt = [],
  userName = "Seeker"
}) => {
  type SectionType = "overview" | "master_numbers" | "karmic_debts" | "quick_ref" | "exercises";
  const [activeSection, setActiveSection] = useState<SectionType>("overview");

  const [selectedMaster, setSelectedMaster] = useState<11 | 22 | 33>(
    userLifePath === 22 ? 22 : userLifePath === 33 ? 33 : 11
  );
  const [selectedKarmic, setSelectedKarmic] = useState<string>(
    userKarmicDebt && userKarmicDebt.length > 0 ? userKarmicDebt[0] : "13/4"
  );

  const activeMasterDetail: MasterNumberDetail = MASTER_NUMBERS_DATABASE[selectedMaster];
  const activeKarmicDetail: KarmicDebtDetail = KARMIC_DEBT_DATABASE[selectedKarmic] || KARMIC_DEBT_DATABASE["13/4"];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-purple-100 p-8 rounded-3xl border border-purple-500/20 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-8 -translate-y-8">
          <Zap className="w-96 h-96 text-purple-400" />
        </div>

        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 tracking-widest uppercase">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Master Numerology Suite • Chapter Four</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-200 tracking-tight">
            {MASTER_KARMIC_CHAPTER_META.chapterTitle}
          </h2>
          <p className="text-sm text-purple-200/80 font-serif italic">
            "{MASTER_KARMIC_CHAPTER_META.introductionQuote.text}" — <span className="not-italic text-amber-300">{MASTER_KARMIC_CHAPTER_META.introductionQuote.author}</span>
          </p>

          <p className="text-xs leading-relaxed text-purple-100/90 pt-2 border-t border-purple-500/20">
            {MASTER_KARMIC_CHAPTER_META.introductionText[0]}
          </p>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center overflow-x-auto gap-2 border-b border-amber-900/10 pb-2 no-scrollbar text-xs font-semibold">
        {[
          { id: "overview", label: "Overview & Calculation Rules", icon: BookOpen },
          { id: "master_numbers", label: "Master Numbers (11, 22, 33)", icon: Zap },
          { id: "karmic_debts", label: "Karmic Debts (13, 14, 16, 19)", icon: ShieldAlert },
          { id: "quick_ref", label: "Master Matrix & Comparative Table", icon: Scale },
          { id: "exercises", label: "Exercises & Practical Self-Reflections", icon: UserCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as SectionType)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all border ${
                isSelected
                  ? "bg-slate-900 text-amber-300 border-slate-900 shadow-md"
                  : "bg-white text-slate-700 border-amber-900/10 hover:bg-amber-50/60"
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? "text-amber-400" : "text-slate-500"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: OVERVIEW & CALCULATION RULES */}
      {activeSection === "overview" && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/15 shadow-xs space-y-6">
            <div className="border-b border-amber-900/10 pb-4 space-y-2">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">High-Voltage Vibrations</span>
              <h3 className="font-serif text-2xl font-bold text-slate-900">Understanding Master Numbers & Karmic Debts</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Think of Master Numbers as the high-voltage lines of the numerological spectrum. The energy flowing through them is the same energy that flows through ordinary lines — but at a significantly higher voltage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MASTER_KARMIC_CHAPTER_META.introductionText.slice(1, 3).map((para, idx) => (
                <div key={idx} className="bg-amber-50/50 p-5 rounded-2xl border border-amber-900/10 text-xs text-slate-800 leading-relaxed space-y-2">
                  <span className="font-bold text-amber-900 block">Key Insight #{idx + 1}</span>
                  <p>{para}</p>
                </div>
              ))}
            </div>

            {/* Table 4.1 Preservation Rules */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-800" />
                <h4 className="font-serif text-lg font-bold text-slate-900">When to Preserve vs Reduce Master Numbers</h4>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-amber-900/15 shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-amber-200">
                    <tr>
                      <th className="p-3 font-semibold">Calculation Type</th>
                      <th className="p-3 font-semibold">Preserve Master Number?</th>
                      <th className="p-3 font-semibold">Preservation Guidance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-900/10 bg-white text-slate-800">
                    {MASTER_KARMIC_CHAPTER_META.preservationRulesTable.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-amber-50/20" : "bg-white"}>
                        <td className="p-3 font-bold text-slate-900">{row.calculationType}</td>
                        <td className="p-3 font-semibold">
                          {row.preserve ? (
                            <span className="inline-flex items-center gap-1 text-emerald-800 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Yes — Preserve
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-300">
                              Reduce to Single Digit
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-slate-700 leading-relaxed">{row.guidance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Karmic Debt Position Significance */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-700" />
                <h4 className="font-serif text-lg font-bold text-slate-900">Significance of Karmic Debts by Profile Position</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                {MASTER_KARMIC_CHAPTER_META.karmicPositionSignificance.map((pos, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border border-amber-900/15 shadow-2xs space-y-1.5">
                    <span className="font-bold text-slate-900 block text-sm">{pos.position}</span>
                    <span className="text-[11px] font-bold text-rose-800 block">{pos.significance}</span>
                    <p className="text-slate-600 leading-relaxed">{pos.manifestation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: MASTER NUMBERS STUDY (11, 22, 33) */}
      {activeSection === "master_numbers" && (
        <div className="space-y-6">
          {/* Selector buttons for 11, 22, 33 */}
          <div className="bg-white p-4 rounded-3xl border border-amber-900/15 flex items-center justify-between flex-wrap gap-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600" />
              Select Master Vibration to Explore:
            </span>
            <div className="flex items-center gap-2">
              {[11, 22, 33].map((num) => {
                const isSelected = selectedMaster === num;
                return (
                  <button
                    key={num}
                    onClick={() => setSelectedMaster(num as 11 | 22 | 33)}
                    className={`px-5 py-2.5 rounded-2xl font-serif text-lg font-bold transition-all border ${
                      isSelected
                        ? "bg-slate-900 text-amber-300 border-slate-900 shadow-md scale-105"
                        : "bg-amber-50 text-slate-800 border-amber-900/15 hover:bg-amber-100"
                    }`}
                  >
                    Master {num}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Master Detail Sheet */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/15 shadow-sm space-y-8">
            <div className="border-b border-amber-900/10 pb-6 flex items-center justify-between flex-wrap gap-4">
              <div>
                <span className="text-xs font-bold text-purple-800 uppercase tracking-widest">Master Vibration #{activeMasterDetail.number}</span>
                <h3 className="font-serif text-3xl font-bold text-slate-900">{activeMasterDetail.title}</h3>
                <p className="text-xs font-semibold text-amber-900 mt-1">{activeMasterDetail.archetype}</p>
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-900/15 max-w-sm">
                <p className="text-xs italic text-slate-700">"{activeMasterDetail.quote.text}"</p>
                <p className="text-[11px] font-bold text-amber-900 text-right mt-1">— {activeMasterDetail.quote.author}</p>
              </div>
            </div>

            <p className="text-sm text-slate-800 leading-relaxed bg-amber-50/40 p-5 rounded-2xl border border-amber-900/10">
              {activeMasterDetail.introduction}
            </p>

            {/* Life Stages Manifestation (If available) */}
            {activeMasterDetail.lifeStages && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-indigo-600" />
                  <h4 className="font-serif text-xl font-bold text-slate-900">Manifestation Across Life Stages</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {activeMasterDetail.lifeStages.map((stage, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">{stage.lifeStage}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-900">
                          {stage.ageRange}
                        </span>
                      </div>
                      <p className="text-slate-800 leading-relaxed"><strong className="text-slate-900">Expression:</strong> {stage.manifestation}</p>
                      <p className="text-rose-900 leading-relaxed bg-rose-50/60 p-2 rounded-xl border border-rose-200/60"><strong className="text-rose-950">Challenge:</strong> {stage.challenges}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Compatibility Table for 11 */}
            {activeMasterDetail.compatibilityTable && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-600" />
                  <h4 className="font-serif text-xl font-bold text-slate-900">Master 11 Relationship Compatibility Dynamics</h4>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-rose-900/15">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-rose-950 text-rose-200">
                      <tr>
                        <th className="p-3 font-semibold">Partner Number</th>
                        <th className="p-3 font-semibold">Compatibility</th>
                        <th className="p-3 font-semibold">Relational Dynamic</th>
                        <th className="p-3 font-semibold">Growth Edge</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rose-900/10 bg-white">
                      {activeMasterDetail.compatibilityTable.map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-rose-50/20" : "bg-white"}>
                          <td className="p-3 font-bold text-slate-900">Number {row.partnerNumber}</td>
                          <td className="p-3 font-semibold text-rose-900">{row.compatibilityLevel}</td>
                          <td className="p-3 text-slate-700 leading-relaxed">{row.dynamic}</td>
                          <td className="p-3 text-slate-800 font-medium leading-relaxed">{row.growthEdge}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Career Domains for 22 */}
            {activeMasterDetail.careerDomains && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-amber-700" />
                  <h4 className="font-serif text-xl font-bold text-slate-900">Master 22 Career Domains & Natural Roles</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {activeMasterDetail.careerDomains.map((domain, idx) => (
                    <div key={idx} className="bg-amber-50/60 p-4 rounded-2xl border border-amber-900/15 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">{domain.domain}</span>
                        <span className="font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                          {domain.naturalRole}
                        </span>
                      </div>
                      <p className="text-slate-800"><strong className="text-amber-950">Strength:</strong> {domain.signatureStrength}</p>
                      <p className="text-rose-900"><strong className="text-rose-950">Watch For:</strong> {domain.watchFor}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Unawakened vs Awakened for 33 */}
            {activeMasterDetail.unawakenedVsAwakened && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-600" />
                  <h4 className="font-serif text-xl font-bold text-slate-900">Master 33: Unawakened vs Awakened Expression</h4>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-amber-900/15">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-amber-200">
                      <tr>
                        <th className="p-3 font-semibold">Area of Life</th>
                        <th className="p-3 font-semibold text-rose-300">Unawakened 33 Expression</th>
                        <th className="p-3 font-semibold text-emerald-300">Awakened 33 Expression</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-900/10 bg-white">
                      {activeMasterDetail.unawakenedVsAwakened.map((row, idx) => (
                        <tr key={idx}>
                          <td className="p-3 font-bold text-slate-900">{row.area}</td>
                          <td className="p-3 text-rose-950 bg-rose-50/30 leading-relaxed">{row.unawakened}</td>
                          <td className="p-3 text-emerald-950 bg-emerald-50/30 font-medium leading-relaxed">{row.awakened}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* SECTION 3: KARMIC DEBTS STUDY (13, 14, 16, 19) */}
      {activeSection === "karmic_debts" && (
        <div className="space-y-6">
          {/* Selector for 13/4, 14/5, 16/7, 19/1 */}
          <div className="bg-white p-4 rounded-3xl border border-amber-900/15 flex items-center justify-between flex-wrap gap-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              Select Karmic Debt Pattern to Study:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {["13/4", "14/5", "16/7", "19/1"].map((debt) => {
                const isSelected = selectedKarmic === debt;
                return (
                  <button
                    key={debt}
                    onClick={() => setSelectedKarmic(debt)}
                    className={`px-4 py-2 rounded-2xl font-serif text-sm font-bold transition-all border ${
                      isSelected
                        ? "bg-rose-950 text-rose-200 border-rose-900 shadow-md scale-105"
                        : "bg-rose-50 text-slate-800 border-rose-900/15 hover:bg-rose-100"
                    }`}
                  >
                    Debt {debt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Karmic Detail */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/15 shadow-sm space-y-8">
            <div className="border-b border-amber-900/10 pb-6 flex items-center justify-between flex-wrap gap-4">
              <div>
                <span className="text-xs font-bold text-rose-800 uppercase tracking-widest">Karmic Debt Pattern #{activeKarmicDetail.debtNumber}</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">{activeKarmicDetail.title}</h3>
                <p className="text-xs font-semibold text-rose-900 mt-1">{activeKarmicDetail.lessonTheme}</p>
              </div>

              {activeKarmicDetail.quote && (
                <div className="bg-rose-50 p-4 rounded-2xl border border-rose-900/15 max-w-sm">
                  <p className="text-xs italic text-slate-700">"{activeKarmicDetail.quote.text}"</p>
                  <p className="text-[11px] font-bold text-rose-900 text-right mt-1">— {activeKarmicDetail.quote.author}</p>
                </div>
              )}
            </div>

            <p className="text-sm text-slate-800 leading-relaxed bg-rose-50/40 p-5 rounded-2xl border border-rose-900/10">
              {activeKarmicDetail.introduction}
            </p>

            {/* Pattern vs Remedy Table */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-700" />
                <h4 className="font-serif text-xl font-bold text-slate-900">Pattern Manifestation & Conscious Remedy Table</h4>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-amber-900/15">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-amber-200">
                    <tr>
                      <th className="p-3 font-semibold">Life Area / Dimension</th>
                      <th className="p-3 font-semibold text-rose-300">Unconscious Shadow Pattern</th>
                      <th className="p-3 font-semibold text-emerald-300">Conscious Remedy & Awakened Expression</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-900/10 bg-white">
                    {activeKarmicDetail.tableData.map((row, idx) => (
                      <tr key={idx}>
                        <td className="p-3 font-bold text-slate-900">{row.area}</td>
                        <td className="p-3 text-rose-950 bg-rose-50/40 leading-relaxed">{row.shadowOrPattern}</td>
                        <td className="p-3 text-emerald-950 bg-emerald-50/40 font-medium leading-relaxed">{row.remedyOrAwakened}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SECTION 4: MASTER MATRIX & COMPARATIVE TABLE */}
      {activeSection === "quick_ref" && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/15 shadow-xs space-y-6">
            <div className="border-b border-amber-900/10 pb-4 space-y-2">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Master Comparison Matrix</span>
              <h3 className="font-serif text-2xl font-bold text-slate-900">Comparing Master Numbers 11, 22, and 33</h3>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-amber-900/15">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-amber-200">
                  <tr>
                    <th className="p-3 font-semibold">Dimension</th>
                    <th className="p-3 font-semibold text-purple-300">Master 11</th>
                    <th className="p-3 font-semibold text-amber-300">Master 22</th>
                    <th className="p-3 font-semibold text-emerald-300">Master 33</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-900/10 bg-white text-slate-800">
                  {MASTER_KARMIC_CHAPTER_META.masterComparisonTable.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-amber-50/20" : "bg-white"}>
                      <td className="p-3 font-bold text-slate-900">{row.dimension}</td>
                      <td className="p-3 text-slate-800 leading-relaxed">{row.m11}</td>
                      <td className="p-3 text-slate-800 leading-relaxed">{row.m22}</td>
                      <td className="p-3 text-slate-800 leading-relaxed">{row.m33}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick Reference Table 4.14 for All Master & Karmic Numbers */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-700" />
                <h4 className="font-serif text-xl font-bold text-slate-900">Complete Master & Karmic Quick Reference (Table 4.14)</h4>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-amber-900/15">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-amber-300">
                    <tr>
                      <th className="p-3 font-semibold">Number</th>
                      <th className="p-3 font-semibold">Type</th>
                      <th className="p-3 font-semibold">Core Theme</th>
                      <th className="p-3 font-semibold">Gift When Awakened</th>
                      <th className="p-3 font-semibold">Challenge When Unconscious</th>
                      <th className="p-3 font-semibold">Key Remedy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-900/10 bg-white">
                    {MASTER_KARMIC_CHAPTER_META.quickReferenceTable.map((row, idx) => (
                      <tr key={idx} className={row.type === "Master Number" ? "bg-purple-50/20" : "bg-rose-50/20"}>
                        <td className="p-3 font-serif font-bold text-slate-900 text-sm">{row.number}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            row.type === "Master Number" ? "bg-purple-100 text-purple-900" : "bg-rose-100 text-rose-900"
                          }`}>
                            {row.type}
                          </span>
                        </td>
                        <td className="p-3 text-slate-800 font-medium">{row.coreTheme}</td>
                        <td className="p-3 text-emerald-950 font-medium">{row.giftWhenAwakened}</td>
                        <td className="p-3 text-rose-950">{row.challengeWhenUnconscious}</td>
                        <td className="p-3 text-indigo-950 font-bold">{row.keyRemedy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: EXERCISES & PRACTITIONER TIPS */}
      {activeSection === "exercises" && (
        <div className="space-y-6">
          <div className="bg-slate-900 text-slate-100 p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold tracking-wider uppercase">
              <UserCheck className="w-4 h-4" />
              <span>Chapter Four Exercises & Self-Reflections</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MASTER_KARMIC_CHAPTER_META.exercisesAndReflections.exercises.map((ex) => (
                <div key={ex.id} className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2 text-xs">
                  <span className="font-serif text-sm font-bold text-amber-300 block">{ex.title}</span>
                  <p className="text-slate-300 leading-relaxed">{ex.text}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700 space-y-3 text-xs">
              <span className="font-bold text-amber-300 block">Reflection Questions for Seeker ({userName}):</span>
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                {MASTER_KARMIC_CHAPTER_META.exercisesAndReflections.reflectionQuestions.map((q, idx) => (
                  <li key={idx} className="leading-relaxed">{q}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-amber-100/90 p-6 rounded-3xl border border-amber-300 text-amber-950 text-xs space-y-2 shadow-sm">
            <span className="font-bold text-sm text-amber-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-700" /> Professional Practitioner Consulting Tip:
            </span>
            <p className="leading-relaxed font-medium">
              {MASTER_KARMIC_CHAPTER_META.professionalTip}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
