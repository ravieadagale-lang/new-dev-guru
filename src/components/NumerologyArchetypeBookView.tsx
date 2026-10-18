// src/components/NumerologyArchetypeBookView.tsx
import React, { useState } from "react";
import { BookOpen, Star, Heart, Shield, Sparkles, HelpCircle, CheckCircle2, UserCheck, Flame, Anchor, Feather } from "lucide-react";
import {
  DRIVER_ARCHETYPES_DATABASE,
  NUMEROLOGY_BOOK_META,
  getDriverArchetypeDetail,
  DriverArchetypeDetail
} from "../data/numerologyDriverArchetypes";
import { getGenderAwareText } from "../utils/pdfGenerator";

interface NumerologyArchetypeBookViewProps {
  initialDriverNumber?: number;
  gender?: "male" | "female" | "other";
  userName?: string;
}

export const NumerologyArchetypeBookView: React.FC<NumerologyArchetypeBookViewProps> = ({
  initialDriverNumber = 1,
  gender = "male",
  userName = "Seeker"
}) => {
  const [selectedNumber, setSelectedNumber] = useState<number>(initialDriverNumber);
  const archetype: DriverArchetypeDetail = getDriverArchetypeDetail(selectedNumber);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Book Cover / Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-amber-100 p-8 rounded-3xl border border-amber-500/20 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-8 -translate-y-8">
          <BookOpen className="w-96 h-96 text-amber-400" />
        </div>

        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 tracking-widest uppercase">
            <BookOpen className="w-4 h-4" />
            <span>Master Numerology Library • Volume 1</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-200 tracking-tight">
            {NUMEROLOGY_BOOK_META.chapterTitle}
          </h2>
          <p className="text-sm text-amber-100/80 font-serif italic">
            "{NUMEROLOGY_BOOK_META.introductionQuote.text}" — <span className="not-italic text-amber-300">{NUMEROLOGY_BOOK_META.introductionQuote.author}</span>
          </p>

          <div className="pt-2 text-xs leading-relaxed text-amber-100/90 space-y-2 border-t border-amber-500/20">
            {NUMEROLOGY_BOOK_META.introductionText.slice(0, 2).map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Number Selection Carousel / Tabs */}
      <div className="bg-white p-4 rounded-3xl border border-amber-900/10 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-600" />
            Select Number Archetype to Study (1 to 9):
          </span>
          {initialDriverNumber === selectedNumber && (
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
              Active Seeker's Driver Number ({initialDriverNumber})
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
            const item = DRIVER_ARCHETYPES_DATABASE[num];
            const isSelected = num === selectedNumber;
            const isUserDriver = num === initialDriverNumber;

            return (
              <button
                key={num}
                onClick={() => setSelectedNumber(num)}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 relative ${
                  isSelected
                    ? "bg-slate-900 text-amber-300 border-slate-900 shadow-md scale-105"
                    : "bg-amber-50/50 text-slate-800 border-amber-900/15 hover:bg-amber-100/80"
                }`}
              >
                {isUserDriver && (
                  <span className="absolute -top-1.5 -right-1 bg-amber-500 text-slate-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow-xs">
                    YOU
                  </span>
                )}
                <span className="font-serif text-2xl font-bold">{num}</span>
                <span className="text-[10px] font-medium truncate max-w-full leading-tight">
                  {item.title.split(" ")[1] || item.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Archetype Study Canvas */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/15 shadow-sm space-y-8">
        {/* Header Title & Quote */}
        <div className="border-b border-amber-900/10 pb-6 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">Master Archetype #{archetype.number}</span>
              <h3 className="font-serif text-3xl font-bold text-slate-900">{archetype.title}</h3>
              <p className="text-xs font-semibold text-amber-900 mt-0.5">{archetype.archetype}</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-900/15 max-w-sm">
              <p className="text-xs italic text-slate-700">"{archetype.quote.text}"</p>
              <p className="text-[11px] font-bold text-amber-900 text-right mt-1">— {archetype.quote.author}</p>
            </div>
          </div>
        </div>

        {/* Essential Character */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-600" />
            <h4 className="font-serif text-xl font-bold text-slate-900">Essential Character</h4>
          </div>
          <p className="text-sm text-slate-800 leading-relaxed font-normal bg-amber-50/30 p-5 rounded-2xl border border-amber-900/10">
            {archetype.essentialCharacter}
          </p>
        </div>

        {/* Myths Busted (If Available - Number 4 & 8) */}
        {archetype.mythsBusted && archetype.mythsBusted.length > 0 && (
          <div className="space-y-4 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 p-6 rounded-3xl border border-amber-900/15">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-800" />
              <h4 className="font-serif text-xl font-bold text-slate-900">Busting the Myths About Number {archetype.number}</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {archetype.mythsBusted.map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-amber-900/10 shadow-xs space-y-2 text-xs">
                  <span className="font-bold text-rose-900 block">{item.myth}</span>
                  <p className="text-slate-700 leading-relaxed">{item.truth}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Emotional Inner World & Communication */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2">
              <Anchor className="w-5 h-5 text-indigo-600" />
              <h4 className="font-serif text-lg font-bold text-slate-900">Emotional Inner World</h4>
            </div>
            <p className="text-xs text-slate-800 leading-relaxed">
              {archetype.emotionalInnerWorld}
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2">
              <Feather className="w-5 h-5 text-emerald-600" />
              <h4 className="font-serif text-lg font-bold text-slate-900">Communication Style</h4>
            </div>
            <p className="text-xs text-slate-800 leading-relaxed">
              {archetype.communicationStyle}
            </p>
          </div>
        </div>

        {/* Love, Relationships & Parenting */}
        <div className="bg-gradient-to-r from-rose-50 to-amber-50 p-6 sm:p-7 rounded-3xl border border-rose-900/15 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-600" />
              <h4 className="font-serif text-xl font-bold text-slate-900">Love, Marriage & Relationships</h4>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-100 text-rose-900 border border-rose-300">
              Role: {gender === "female" ? "As a Wife ♀" : gender === "male" ? "As a Husband ♂" : "Spouse ⚧"}
            </span>
          </div>

          <p className="text-xs text-slate-800 leading-relaxed">
            {getGenderAwareText(archetype.loveAndRelationshipPatterns, gender || "male")}
          </p>

          {archetype.parentingStyle && (
            <div className="pt-3 border-t border-rose-900/10 space-y-1">
              <span className="font-bold text-xs text-amber-900 block">Parenting Style & Family Dynamics:</span>
              <p className="text-xs text-slate-700 leading-relaxed">{archetype.parentingStyle}</p>
            </div>
          )}
        </div>

        {/* Career & Money Patterns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-amber-50/60 p-6 rounded-3xl border border-amber-900/15 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-700" />
              <h4 className="font-serif text-lg font-bold text-slate-900">Career & Mastery Tendencies</h4>
            </div>
            <p className="text-xs text-slate-800 leading-relaxed">
              {archetype.careerTendencies}
            </p>
          </div>

          <div className="bg-emerald-50/60 p-6 rounded-3xl border border-emerald-900/15 space-y-3">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-emerald-700" />
              <h4 className="font-serif text-lg font-bold text-slate-900">Money & Financial Patterns</h4>
            </div>
            <p className="text-xs text-slate-800 leading-relaxed">
              {archetype.moneyPatterns}
            </p>
          </div>
        </div>

        {/* Health, Spiritual Lessons & Fears */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {archetype.healthTendencies && (
            <div className="bg-white p-5 rounded-3xl border border-amber-900/15 shadow-xs space-y-2">
              <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-600" /> Health & Vitality Care
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">{archetype.healthTendencies}</p>
            </div>
          )}

          <div className="bg-white p-5 rounded-3xl border border-amber-900/15 shadow-xs space-y-2">
            <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" /> Spiritual Lessons & Karma
            </span>
            <p className="text-xs text-slate-700 leading-relaxed">{archetype.spiritualLessonsAndKarmicPatterns}</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-amber-900/15 shadow-xs space-y-2">
            <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-600" /> Deepest Fear & Core Motivation
            </span>
            <p className="text-xs text-slate-700 leading-relaxed">{archetype.deepestFearsAndHiddenMotivations}</p>
          </div>
        </div>

        {/* Practical Growth Remedies */}
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-6 sm:p-7 rounded-3xl space-y-4">
          <div className="flex items-center gap-2 border-b border-emerald-700/40 pb-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h4 className="font-serif text-xl font-bold text-emerald-200">Practical Growth Remedies & Advice for #{archetype.number}</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {archetype.practicalRemediesAndGrowthAdvice.map((remedy, idx) => (
              <div key={idx} className="bg-emerald-950/60 p-3.5 rounded-2xl border border-emerald-500/20 text-xs flex items-start gap-2 text-emerald-100">
                <span className="font-bold text-emerald-400">#{idx + 1}</span>
                <span>{remedy}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chapter Exercises & Reflections */}
      <div className="bg-slate-900 text-slate-100 p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold tracking-wider uppercase">
          <UserCheck className="w-4 h-4" />
          <span>Chapter Exercises & Self-Reflections</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {NUMEROLOGY_BOOK_META.exercisesAndReflections.exercises.map((ex) => (
            <div key={ex.id} className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2 text-xs">
              <span className="font-serif text-sm font-bold text-amber-300 block">{ex.title}</span>
              <p className="text-slate-300 leading-relaxed">{ex.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700 space-y-3 text-xs">
          <span className="font-bold text-amber-300 block">Reflection Questions for Seeker ({userName}):</span>
          <ul className="list-disc list-inside space-y-1.5 text-slate-300">
            {NUMEROLOGY_BOOK_META.exercisesAndReflections.reflectionQuestions.map((q, idx) => (
              <li key={idx}>{q}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Practitioner Tip Box */}
      <div className="bg-amber-100/90 p-6 rounded-3xl border border-amber-300 text-amber-950 text-xs space-y-1.5 shadow-sm">
        <span className="font-bold text-sm text-amber-900 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-700" /> Professional Practitioner Tip:
        </span>
        <p className="leading-relaxed font-medium">
          {NUMEROLOGY_BOOK_META.professionalTip}
        </p>
      </div>
    </div>
  );
};
