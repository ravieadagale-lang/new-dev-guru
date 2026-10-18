import React, { useState } from "react";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Search,
  Scale,
  Award,
  Layers,
  HelpCircle,
  Briefcase,
  Coins,
  Heart,
  Flame,
  Activity
} from "lucide-react";
import { CrossValidationEngine } from "../../engine/crossValidation/crossValidationEngine";
import { MasterJaiminiEngine } from "../../engine/jaimini/masterJaiminiEngine";
import { MasterKPEngine } from "../../engine/kp/masterKpEngine";
import { MasterRuleRegistry } from "../../engine/provenance/masterRuleRegistry";

interface CrossValidationWorkspaceViewProps {
  planets: Record<string, { longitude: number; isRetrograde?: boolean; name?: string; dignity?: string }>;
  ascendantLongitude: number;
  moonLongitude: number;
  cuspLongitudes?: Record<number, number>;
  birthDate?: Date;
}

export const CrossValidationWorkspaceView: React.FC<CrossValidationWorkspaceViewProps> = ({
  planets,
  ascendantLongitude,
  moonLongitude,
  cuspLongitudes,
  birthDate = new Date("1990-05-15T10:00:00Z"),
}) => {
  const [selectedSubTab, setSelectedSubTab] = useState<"synthesis" | "rule_registry">("synthesis");
  const [ruleSearchQuery, setRuleSearchQuery] = useState<string>("");

  // Deterministic computations
  const jaiminiReport = MasterJaiminiEngine.calculateMasterJaimini({
    ascendantLongitude,
    moonLongitude,
    birthDate,
    planets,
  });

  const kpReport = MasterKPEngine.calculateMasterKP({
    ascendantLongitude,
    moonLongitude,
    birthDate,
    planets,
    cuspLongitudes,
  });

  const crossValReport = CrossValidationEngine.evaluateCrossValidation({
    jaiminiReport,
    kpReport,
  });

  const allRules = MasterRuleRegistry.getAllRules();
  const filteredRules = allRules.filter(
    (r) =>
      r.name.toLowerCase().includes(ruleSearchQuery.toLowerCase()) ||
      r.source.toLowerCase().includes(ruleSearchQuery.toLowerCase()) ||
      r.system.toLowerCase().includes(ruleSearchQuery.toLowerCase()) ||
      r.ruleId.toLowerCase().includes(ruleSearchQuery.toLowerCase())
  );

  const themeIcons: Record<string, any> = {
    CAREER_AND_STATUS: Briefcase,
    WEALTH_AND_PROSPERITY: Coins,
    MARRIAGE_AND_RELATIONSHIPS: Heart,
    SPIRITUAL_PURPOSE_AND_MOKSHA: Flame,
    HEALTH_AND_VITALITY: Activity,
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
                Phase 6 Multi-System Cross-Validation
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                Parashari • Jaimini • Krishnamurti (KP)
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1.5">
              Multi-System Astrological Consensus &amp; Rule Provenance
            </h3>
            <p className="text-xs text-slate-600 mt-0.5 max-w-3xl">
              Deterministic synthesis verifying predictions independently across Parashari Yogas/Dignities, Jaimini Karakas/Arudhas, and KP Cuspal Sub-Lords. Preserves pure methodological separation while auditing holistic convergence.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-950 text-emerald-200 px-4 py-2 rounded-2xl text-xs font-bold shadow-xs">
            <Scale className="w-4 h-4 text-emerald-400" />
            <span>Coherence: {crossValReport.calculationMetadata.overallSystemCoherencePct}%</span>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-t border-slate-100 pt-3">
          <button
            onClick={() => setSelectedSubTab("synthesis")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedSubTab === "synthesis"
                ? "bg-emerald-900 text-white shadow-xs"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>5-Theme Multi-System Synthesis</span>
          </button>
          <button
            onClick={() => setSelectedSubTab("rule_registry")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedSubTab === "rule_registry"
                ? "bg-emerald-900 text-white shadow-xs"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Classical Rule Registry ({allRules.length})</span>
          </button>
        </div>
      </div>

      {/* 1. SYNTHESIS VIEW */}
      {selectedSubTab === "synthesis" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(crossValReport?.themeComparisons || []).map((theme) => {
              const Icon = themeIcons[theme.theme] || Sparkles;
              const isStrong = theme.consensusLevel === "Strong Consensus";
              const isModerate = theme.consensusLevel === "Moderate Consensus";
              return (
                <div
                  key={theme.theme}
                  className="bg-white rounded-3xl p-5 border border-amber-900/10 shadow-xs space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-emerald-50 text-emerald-900">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-serif text-lg font-bold text-slate-900">
                        {theme.themeTitle}
                      </h4>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isStrong
                          ? "bg-emerald-100 text-emerald-900"
                          : isModerate
                          ? "bg-blue-100 text-blue-900"
                          : "bg-amber-100 text-amber-900"
                      }`}
                    >
                      {theme.consensusLevel}
                    </span>
                  </div>

                  <div className="text-xs space-y-2 pt-2 border-t border-slate-100">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[10px] font-bold text-purple-900 uppercase">
                        Parashari System
                      </div>
                      <div className="font-semibold text-slate-900">
                        {theme.parashari.assessment} ({theme.parashari.scorePct}%)
                      </div>
                      <div className="text-[11px] text-slate-600">
                        {theme.parashari?.keyIndicators?.join("; ") || "—"}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-purple-50/60 border border-purple-200">
                      <div className="text-[10px] font-bold text-purple-950 uppercase">
                        Jaimini System
                      </div>
                      <div className="font-semibold text-purple-950">
                        {theme.jaimini.assessment} ({theme.jaimini.scorePct}%)
                      </div>
                      <div className="text-[11px] text-purple-900">
                        {theme.jaimini?.keyIndicators?.join("; ") || "—"}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-200">
                      <div className="text-[10px] font-bold text-blue-950 uppercase">
                        KP System
                      </div>
                      <div className="font-semibold text-blue-950">
                        {theme.kp.assessment} ({theme.kp.scorePct}%)
                      </div>
                      <div className="text-[11px] text-blue-900">
                        {theme.kp?.keyIndicators?.join("; ") || "—"}
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 bg-emerald-50/40 border border-emerald-100 p-2.5 rounded-xl leading-relaxed">
                    <span className="font-bold text-emerald-950">Unified Synthesis: </span>
                    {theme.synthesisSummary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. RULE REGISTRY VIEW */}
      {selectedSubTab === "rule_registry" && (
        <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div>
              <h4 className="font-serif text-xl font-bold text-slate-900">
                Dev-Guru Unified Classical Rule Registry
              </h4>
              <p className="text-xs text-slate-600">
                Immutable, auditable registry of astrological formulas, conditions, and classical Sanskrit treatise citations.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search rules, sources, formulas..."
                value={ruleSearchQuery}
                onChange={(e) => setRuleSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {filteredRules.map((rule) => (
              <div
                key={rule.ruleId}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2"
              >
                <div className="flex justify-between items-start">
                  <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-800 font-mono font-bold text-[10px]">
                    {rule.ruleId}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                    {rule.system}
                  </span>
                </div>

                <div className="font-serif text-base font-bold text-slate-900">
                  {rule.name}
                </div>

                <div className="text-slate-600 text-[11px] leading-snug">
                  Conditions: {rule.conditions?.join("; ") || "—"}
                </div>

                <div className="p-2 rounded-xl bg-white border border-slate-200 font-mono text-[10px] text-slate-800">
                  <span className="font-bold text-slate-500">Formula: </span>
                  {rule.formula}
                </div>

                <div className="text-[10px] text-emerald-900 font-medium italic">
                  Citation: {rule.source} ({rule.sourceReference})
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
