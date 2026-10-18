import React, { useState, useMemo } from "react";
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  RotateCw, 
  FileCode2, 
  Sparkles, 
  Activity, 
  Layers, 
  Sun, 
  Compass, 
  Clock 
} from "lucide-react";
import { Phase7AuditSuite, Phase7AuditResult } from "../../engine/crossValidation/phase7AuditSuite";
import { AstroBadge, AstroButton } from "../astronext/AstroDesignSystem";

export const Phase7AuditWorkspaceView: React.FC = () => {
  const [auditResults, setAuditResults] = useState<Record<string, Phase7AuditResult>>(() => {
    return Phase7AuditSuite.runAllAudits();
  });

  const [selectedSuiteKey, setSelectedSuiteKey] = useState<string>("prashnaAudit");

  const runReAudit = () => {
    setAuditResults(Phase7AuditSuite.runAllAudits());
  };

  const totalTests = Object.values(auditResults).reduce((sum, s) => sum + s.totalTests, 0);
  const totalPassed = Object.values(auditResults).reduce((sum, s) => sum + s.passedTests, 0);
  const totalFailed = Object.values(auditResults).reduce((sum, s) => sum + s.failedTests, 0);

  const selectedSuite = auditResults[selectedSuiteKey] || auditResults.prashnaAudit;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Phase 7.1 Verification Suite
              </span>
              <span className="text-xs font-mono text-slate-500">
                Deterministic Shastric Audit &amp; Convergence Tests
              </span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
              Prashna, Tajika, Event Timing &amp; Provenance Audit
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900">
                {totalPassed} / {totalTests} Passed
              </span>
              {totalFailed > 0 && (
                <span className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-900">
                  {totalFailed} Failed
                </span>
              )}
            </div>
            <button
              onClick={runReAudit}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-colors shadow-xs"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Re-Run All Audits</span>
            </button>
          </div>
        </div>

        {/* Suite Selection Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-t border-slate-100 pt-3">
          {[
            { key: "prashnaAudit", label: "Prashna Horary", suite: auditResults.prashnaAudit },
            { key: "tajikaSolarReturnAudit", label: "Solar Return (Varsha)", suite: auditResults.tajikaSolarReturnAudit },
            { key: "tajikaMuddaAudit", label: "Mudda Dasha", suite: auditResults.tajikaMuddaAudit },
            { key: "tajikaAspectAudit", label: "Tajika Aspects", suite: auditResults.tajikaAspectAudit },
            { key: "tajikaSahamShodhanaAudit", label: "Sahams & Shodhana", suite: auditResults.tajikaSahamShodhanaAudit },
            { key: "tajikaCoreAudit", label: "Tajika 16 Yogas", suite: auditResults.tajikaCoreAudit },
            { key: "task6CoreEngineAudit", label: "Task 6: Core Engine", suite: auditResults.task6CoreEngineAudit },
            { key: "task7CanonicalYogaEngineAudit", label: "Task 7: 16 Canonical Yogas", suite: auditResults.task7CanonicalYogaEngineAudit },
            { key: "task8AnnualChartEngineAudit", label: "Task 8: Varshaphala Chart", suite: auditResults.task8AnnualChartEngineAudit },
            { key: "task9MuddaDashaForensicAudit", label: "Task 9: Mudda Dasha Forensic", suite: auditResults.task9MuddaDashaForensicAudit },
            { key: "task10SahamForensicAudit", label: "Task 10: Sahams & Shodhana Forensic", suite: auditResults.task10SahamForensicAudit },
            { key: "task11EventTimingForensicAudit", label: "Task 11: Event Timing & Confluence", suite: auditResults.task11EventTimingForensicAudit },
            { key: "task12SystemIntegrationForensicAudit", label: "Task 12: System-Wide Integration", suite: auditResults.task12SystemIntegrationForensicAudit },
            { key: "task13MasterForensicAudit", label: "Task 13: Master Forensic", suite: auditResults.task13MasterForensicAudit },
            { key: "task14ProductionFreezeAudit", label: "Task 14: Production Freeze", suite: auditResults.task14ProductionFreezeAudit },
            { key: "task15PostFreezeCertificationAudit", label: "Task 15: Post-Freeze Certification", suite: auditResults.task15PostFreezeCertificationAudit },
            { key: "eventTimingAudit", label: "Event Timing (15-Factor)", suite: auditResults.eventTimingAudit },
            { key: "provenanceAudit", label: "Provenance & Registry", suite: auditResults.provenanceAudit },
            { key: "phase74ForensicAudit", label: "Phase 7.4 Forensic", suite: auditResults.phase74ForensicAudit },
            { key: "phase75ForensicAudit", label: "Phase 7.5 Forensic Lock", suite: auditResults.phase75ForensicAudit },
            { key: "phase76ForensicAudit", label: "Phase 7.6 Regression Lock", suite: auditResults.phase76ForensicAudit },
          ].filter(item => Boolean(item.suite)).map((item) => (
            <button
              key={item.key}
              onClick={() => setSelectedSuiteKey(item.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedSuiteKey === item.key
                  ? "bg-slate-900 text-emerald-300 shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
              }`}
            >
              <span>{item.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                item.suite.failedTests === 0
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-rose-500/20 text-rose-300"
              }`}>
                {item.suite.passedTests}/{item.suite.totalTests}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Suite Detailed Test Results */}
      <div className="p-6 rounded-3xl bg-white border border-amber-900/10 shadow-xs space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
          <h3 className="font-serif text-lg font-bold text-slate-900">
            {selectedSuite.suiteName}
          </h3>
          <span className="text-xs font-bold text-slate-600">
            {selectedSuite.passedTests} of {selectedSuite.totalTests} Tests Verified
          </span>
        </div>

        <div className="space-y-3">
          {selectedSuite.details.map((test) => (
            <div
              key={test.testId}
              className={`p-4 rounded-2xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs ${
                test.status === "PASS"
                  ? "bg-emerald-50/40 border-emerald-200 text-slate-800"
                  : "bg-rose-50/50 border-rose-200 text-rose-950"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {test.status === "PASS" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span className="font-bold text-slate-900">{test.description}</span>
                  <span className="font-mono text-[10px] text-slate-500 bg-white/80 px-1.5 py-0.2 rounded border border-slate-200">
                    {test.testId}
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 pl-6">
                  <strong>Expected:</strong> {test.expected}
                </div>
                <div className="text-[11px] text-slate-700 pl-6">
                  <strong>Actual Result:</strong> {test.actual}
                </div>
              </div>

              <div className="pl-6 sm:pl-0">
                <span className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase ${
                  test.status === "PASS"
                    ? "bg-emerald-100 text-emerald-900"
                    : "bg-rose-200 text-rose-950"
                }`}>
                  {test.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
