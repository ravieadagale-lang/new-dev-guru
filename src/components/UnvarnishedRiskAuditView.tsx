import React from "react";
import { ComprehensiveMatchResult } from "../utils/compatibilityCalculator";
import { ShieldAlert, AlertTriangle, CheckCircle2, Flame, Heart, BookOpen, AlertOctagon } from "lucide-react";

interface UnvarnishedRiskAuditViewProps {
  matchResult: ComprehensiveMatchResult;
  onNavigateToRemedies?: () => void;
}

export const UnvarnishedRiskAuditView: React.FC<UnvarnishedRiskAuditViewProps> = ({ matchResult, onNavigateToRemedies }) => {
  const { riskAudit, doshas, papasamya, partnerA, partnerB } = matchResult;

  const isCritical = riskAudit.riskLevel === "CRITICAL_RISK";
  const isModerate = riskAudit.riskLevel === "MODERATE_RISK";

  return (
    <div className="space-y-6">
      {/* UNVARNISHED REALITY MASTER WARNING BANNER */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-md space-y-4 ${
        isCritical 
          ? "bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 text-white border-rose-500/50" 
          : isModerate 
          ? "bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 text-white border-amber-500/50" 
          : "bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white border-emerald-500/50"
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            {isCritical ? (
              <AlertOctagon className="w-8 h-8 text-rose-400 shrink-0 animate-bounce" />
            ) : isModerate ? (
              <AlertTriangle className="w-8 h-8 text-amber-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
            )}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                Vedic Marriage Compatibility Audit (Unvarnished Truth Engine)
              </span>
              <h3 className="font-serif text-2xl font-bold">{riskAudit.riskBadge}</h3>
            </div>
          </div>

          <span className={`text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider self-start sm:self-auto ${
            isCritical ? "bg-rose-500 text-white" : isModerate ? "bg-amber-500 text-slate-950" : "bg-emerald-500 text-white"
          }`}>
            {riskAudit.riskLevel.replace("_", " ")}
          </span>
        </div>

        {/* UNVARNISHED REALITY TEXT */}
        <div className="bg-black/40 p-5 rounded-2xl border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2 font-sans">
          <strong className="text-amber-300 block font-serif text-base">
            Honest & Direct Astrological Verdict (No Sugarcoating):
          </strong>
          <p>{riskAudit.unvarnishedReality}</p>
        </div>

        {/* KEY FRICTION AREAS & RECOMMENDED PRECAUTIONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* FRICTION AREAS */}
          <div className="bg-white/10 p-4 rounded-xl border border-white/10 space-y-2">
            <span className="font-bold text-amber-300 flex items-center gap-1.5 text-sm">
              <Flame className="w-4 h-4 text-rose-400" />
              Potential Domestic & Lifelong Friction Points
            </span>
            <ul className="space-y-1.5 text-slate-200">
              {riskAudit.keyFrictionAreas.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-400">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* PRECAUTIONS */}
          <div className="bg-white/10 p-4 rounded-xl border border-white/10 space-y-2">
            <span className="font-bold text-emerald-300 flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Essential Mandatory Vedic Precautions & Remedies
            </span>
            <ul className="space-y-1.5 text-slate-200">
              {riskAudit.recommendedPrecautions.map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {onNavigateToRemedies && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={onNavigateToRemedies}
              className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 hover:bg-amber-300 transition-all cursor-pointer shadow-md"
            >
              <BookOpen className="w-4 h-4" />
              View Searchable Remedies Library & Material Checklists →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
