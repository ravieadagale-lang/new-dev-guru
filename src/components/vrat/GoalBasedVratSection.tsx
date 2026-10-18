import React, { useState } from "react";
import { GOAL_BASED_VRAT_MATCHES, GoalBasedVratMatch } from "../../data/vratGuideData";
import { Target, Sparkles, ChevronRight, CheckCircle2, HeartHandshake, ArrowRight } from "lucide-react";

interface GoalBasedVratSectionProps {
  onSelectVratId?: (vratId: string) => void;
}

export const GoalBasedVratSection: React.FC<GoalBasedVratSectionProps> = ({ onSelectVratId }) => {
  const [selectedGoal, setSelectedGoal] = useState<GoalBasedVratMatch>(GOAL_BASED_VRAT_MATCHES[0]);

  const normalizeVratId = (vratName: string): string => {
    return vratName
      .toLowerCase()
      .replace(/[\(\)\/\,]/g, "")
      .trim()
      .replace(/\s+/g, "_");
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-slate-900 via-amber-950 to-orange-950 text-white rounded-2xl p-6 border border-amber-500/30 shadow-md">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-semibold">
            <Target className="w-3.5 h-3.5 text-amber-300" />
            <span>Sankalpa &amp; Purpose-Driven Observances</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
            Goal-Based Fasting Guide (उद्देश्य अनुसार व्रत चयन)
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Align your spiritual discipline and sacred tapas with your immediate life aspiration. Each traditional observance carries a specific deity vibration, planetary resonance, and purifying outcome.
          </p>
        </div>
      </div>

      {/* Goal Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {GOAL_BASED_VRAT_MATCHES.map((item, idx) => {
          const isSelected = selectedGoal.goal === item.goal;
          return (
            <button
              key={idx}
              onClick={() => setSelectedGoal(item)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                isSelected
                  ? "bg-amber-950/80 text-white border-amber-500/80 shadow-md ring-2 ring-amber-400/40"
                  : "bg-white hover:bg-amber-50/60 border-slate-200 text-slate-800"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold ${isSelected ? "text-amber-300" : "text-amber-800"}`}>
                    Goal {idx + 1}
                  </span>
                  {isSelected && <Sparkles className="w-4 h-4 text-amber-400" />}
                </div>
                <h4 className="font-semibold text-sm leading-snug">{item.goal}</h4>
                <p className={`text-xs font-serif mt-0.5 ${isSelected ? "text-amber-200" : "text-amber-700"}`}>
                  {item.goalHindi}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100/50">
                <span className={`text-[11px] ${isSelected ? "text-amber-200" : "text-slate-500"}`}>
                  {item.recommendedVrats.length} Vrats
                </span>
                <ChevronRight className={`w-4 h-4 ${isSelected ? "text-amber-300" : "text-slate-400"}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail Pane for Selected Goal */}
      {selectedGoal && (
        <div className="bg-white rounded-2xl border border-amber-200/80 p-6 shadow-sm space-y-5">
          <div className="border-b border-amber-100 pb-4">
            <div className="flex items-center gap-2 text-amber-800 text-xs font-semibold mb-1">
              <HeartHandshake className="w-4 h-4 text-amber-600" />
              <span>Recommended Shastric Observances</span>
            </div>
            <h4 className="text-xl font-serif font-bold text-slate-900">
              {selectedGoal.goal} ({selectedGoal.goalHindi})
            </h4>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {selectedGoal.description}
            </p>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Recommended Classical Vrats ({selectedGoal.recommendedVrats.length})
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {selectedGoal.recommendedVrats.map((vratName, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-amber-100 bg-amber-50/40 hover:bg-amber-100/50 transition-all flex flex-col justify-between gap-2"
                >
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-slate-900 leading-tight">
                        {vratName}
                      </div>
                    </div>
                  </div>

                  {onSelectVratId && (
                    <button
                      onClick={() => onSelectVratId(normalizeVratId(vratName))}
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-amber-800 hover:text-amber-900 transition-colors cursor-pointer self-start"
                    >
                      <span>Explore Vrat Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
