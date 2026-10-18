import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Home,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Droplets,
  Heart,
  TrendingUp,
  ShieldAlert,
  HelpCircle,
  Copy,
  Check,
  RotateCcw
} from "lucide-react";
import { QuickAuditInput } from "../../types/vastuTypes";
import { calculateQuickVastuAudit } from "../../engine/vastu/vastuEngine";

export const QuickVastuAuditWizard: React.FC = () => {
  const [input, setInput] = useState<QuickAuditInput>({
    propertyType: "apartment",
    entranceZone: "North",
    kitchenZone: "South-East",
    masterBedZone: "South-West",
    toiletZone: "West-North-West",
    mandirZone: "North-East",
    waterStorageZone: "North",
    cutsOrExtensions: "none"
  });

  const [copied, setCopied] = useState(false);

  const auditResult = useMemo(() => {
    return calculateQuickVastuAudit(input);
  }, [input]);

  const handleCopy = () => {
    navigator.clipboard.writeText(auditResult.downloadableSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetDefaults = () => {
    setInput({
      propertyType: "apartment",
      entranceZone: "North",
      kitchenZone: "South-East",
      masterBedZone: "South-West",
      toiletZone: "West-North-West",
      mandirZone: "North-East",
      waterStorageZone: "North",
      cutsOrExtensions: "none"
    });
  };

  const scoreColor =
    auditResult.overallScore >= 80
      ? "text-emerald-500 border-emerald-500/30 bg-emerald-500/10"
      : auditResult.overallScore >= 60
      ? "text-amber-500 border-amber-500/30 bg-amber-500/10"
      : "text-rose-500 border-rose-500/30 bg-rose-500/10";

  return (
    <div className="space-y-6">
      {/* Wizard Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>60-Second Guided Home Health Audit</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-slate-900">
            Instant Vastu Scorecard (No CAD Skills Required)
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Answer 7 straightforward questions regarding the main locations in your home. The system instantly runs classical MahaVastu algorithms to compute your Vastu health rating and high-priority remedies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetDefaults}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Copy Report"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 7 Interactive Questions */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
            Step 1 of 1: Spatial Placement Questionnaire
          </h3>

          {/* Question 1: Property Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-amber-600" />
              <span>1. What type of property is this?</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "apartment", label: "Apartment / Flat" },
                { id: "independent_house", label: "Villa / Bungalow" },
                { id: "office", label: "Commercial Office" },
                { id: "shop", label: "Retail Shop" }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setInput({ ...input, propertyType: t.id as any })}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer text-center ${
                    input.propertyType === t.id
                      ? "bg-amber-500 text-slate-950 font-bold border-amber-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Main Entrance */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800">
              2. Where is your Main Entrance (Front Door) located?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"].map((z) => (
                <button
                  key={z}
                  onClick={() => setInput({ ...input, entranceZone: z })}
                  className={`py-2 px-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                    input.entranceZone === z
                      ? "bg-slate-900 text-amber-300 font-bold border-slate-950 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {z}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Kitchen Stove */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-rose-500" />
              <span>3. Where is your Kitchen &amp; Gas Stove situated?</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["South-East", "North-West", "East", "North", "North-East", "South-West", "West", "South"].map((z) => (
                <button
                  key={z}
                  onClick={() => setInput({ ...input, kitchenZone: z })}
                  className={`py-2 px-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                    input.kitchenZone === z
                      ? "bg-rose-500 text-white font-bold border-rose-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {z}
                </button>
              ))}
            </div>
          </div>

          {/* Question 4: Master Bedroom */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800">
              4. Where is the Master Bedroom located?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["South-West", "South", "West", "North-West", "North", "North-East", "East", "South-East"].map((z) => (
                <button
                  key={z}
                  onClick={() => setInput({ ...input, masterBedZone: z })}
                  className={`py-2 px-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                    input.masterBedZone === z
                      ? "bg-amber-600 text-white font-bold border-amber-700 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {z}
                </button>
              ))}
            </div>
          </div>

          {/* Question 5: Toilet / Commode */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800">
              5. Where is the primary Toilet / Commode located?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                "West-North-West",
                "South-South-West",
                "East-South-East",
                "North-West",
                "North-East",
                "South-West",
                "North",
                "Center"
              ].map((z) => (
                <button
                  key={z}
                  onClick={() => setInput({ ...input, toiletZone: z })}
                  className={`py-2 px-2 rounded-xl text-[11px] font-medium border transition-all cursor-pointer ${
                    input.toiletZone === z
                      ? "bg-slate-900 text-white font-bold border-slate-950 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {z}
                </button>
              ))}
            </div>
          </div>

          {/* Question 6: Mandir / Altar */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-sky-500" />
              <span>6. Where is your Mandir / Prayer Altar?</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["North-East", "East", "North", "West", "North-West", "South-East", "South", "South-West"].map((z) => (
                <button
                  key={z}
                  onClick={() => setInput({ ...input, mandirZone: z })}
                  className={`py-2 px-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                    input.mandirZone === z
                      ? "bg-sky-600 text-white font-bold border-sky-700 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {z}
                </button>
              ))}
            </div>
          </div>

          {/* Question 7: Cuts or Extensions */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800">
              7. Does the property have any notable corner cuts or extensions?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: "none", label: "None (Regular Shape)" },
                { id: "ne_cut", label: "North-East Cut (Missing)" },
                { id: "sw_cut", label: "South-West Cut (Missing)" },
                { id: "se_cut", label: "South-East Cut" },
                { id: "nw_cut", label: "North-West Cut" },
                { id: "ne_extended", label: "North-East Extended" }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setInput({ ...input, cutsOrExtensions: c.id as any })}
                  className={`py-2 px-2.5 rounded-xl text-[11px] font-medium border transition-all cursor-pointer text-left ${
                    input.cutsOrExtensions === c.id
                      ? "bg-amber-100 text-amber-950 font-bold border-amber-300 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Vastu Health Scorecard & 5 Pillars */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Scorecard Banner */}
          <div className="bg-slate-950 text-white p-6 rounded-3xl border border-amber-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Calculated Vastu Health Index
              </span>
              <span className="text-xs font-mono text-slate-400">Pancha Tattva Sync</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-serif text-5xl font-black text-amber-300">
                {auditResult.overallScore}
              </span>
              <span className="text-xl text-slate-400 font-bold">/ 100</span>
              <span
                className={`ml-auto px-3 py-1 rounded-full text-xs font-bold border ${scoreColor}`}
              >
                {auditResult.overallScore >= 80
                  ? "Highly Auspicious"
                  : auditResult.overallScore >= 60
                  ? "Moderate (Minor Doshas)"
                  : "Critical Doshas Detected"}
              </span>
            </div>

            {/* 5 Life Pillars Meter */}
            <div className="space-y-2.5 pt-2">
              <span className="text-xs font-bold text-amber-200/80 block">
                Impact Across 5 Core Life Pillars:
              </span>
              {auditResult.lifePillars.map((p, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">{p.name}</span>
                    <span
                      className={`font-bold font-mono ${
                        p.scorePct >= 75
                          ? "text-emerald-400"
                          : p.scorePct >= 55
                          ? "text-amber-400"
                          : "text-rose-400"
                      }`}
                    >
                      {p.scorePct}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        p.scorePct >= 75
                          ? "bg-emerald-500"
                          : p.scorePct >= 55
                          ? "bg-amber-500"
                          : "bg-rose-500"
                      }`}
                      style={{ width: `${p.scorePct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Doshas & Zero-Demolition Solutions */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              <span>Prioritized Remedies ({auditResult.criticalDoshas.length} Found)</span>
            </h4>

            {auditResult.criticalDoshas.length === 0 ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <strong className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  No Critical Doshas Found!
                </strong>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  Your spatial layout adheres remarkably well to fundamental Vedic Vastu principles. Maintain clean clutter-free zones to preserve high prana flow.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {auditResult.criticalDoshas.map((d, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{d.title}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          d.severity === "High"
                            ? "bg-rose-100 text-rose-900"
                            : "bg-amber-100 text-amber-900"
                        }`}
                      >
                        {d.severity} Priority
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{d.problem}</p>
                    <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-[11px] text-amber-950 font-medium">
                      <strong>Remedy:</strong> {d.simpleRemedy}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Positive Highlights */}
            {auditResult.topPositiveAlignments.length > 0 && (
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold text-slate-700 block">
                  Auspicious Strengths:
                </span>
                <ul className="space-y-1">
                  {auditResult.topPositiveAlignments.map((a, i) => (
                    <li key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
