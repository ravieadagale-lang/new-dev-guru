import React from "react";
import { HEALTH_AND_SAFETY_GUIDE } from "../../data/vratGuideData";
import { HeartPulse, CheckCircle2, AlertOctagon, Stethoscope, ShieldAlert } from "lucide-react";

export const HealthSafetySection: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-linear-to-r from-emerald-950 via-slate-900 to-teal-950 text-white rounded-2xl p-6 border border-emerald-500/30 shadow-md">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold">
            <HeartPulse className="w-3.5 h-3.5 text-emerald-300" />
            <span>Ayurvedic &amp; Medical Safety Framework</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-emerald-100">
            Health, Vitality &amp; Fasting Safety Protocols (आरोग्य एवं सुरक्षा नियम)
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Sanatana Dharma explicitly honors the physical body as the supreme vessel of Dharma (<em>शरीरमाद्यं खलु धर्मसाधनम्</em>). Fasting is designed for detoxification, spiritual elevation, and metabolic renewal—never for debilitating starvation.
          </p>
        </div>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {HEALTH_AND_SAFETY_GUIDE.map((guide, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <span className="text-3xl">{guide.icon}</span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                    {guide.title}
                  </h4>
                  <p className="text-[11px] font-serif text-amber-800 font-semibold mt-0.5">
                    {guide.titleHindi}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {guide.summary}
              </p>

              {/* Do's */}
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-1.5">
                <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Essential Do's (करणीय):</span>
                </div>
                <ul className="text-xs text-emerald-800 space-y-1 list-disc list-inside">
                  {guide.dos.map((item, dIdx) => (
                    <li key={dIdx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Don'ts */}
              <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200/80 space-y-1.5">
                <div className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
                  <span>Critical Don'ts (अकरणीय):</span>
                </div>
                <ul className="text-xs text-rose-800 space-y-1 list-disc list-inside">
                  {guide.donts.map((item, dIdx) => (
                    <li key={dIdx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Shastric / Medical Advice */}
            <div className="pt-3 border-t border-slate-100">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                <Stethoscope className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Clinical &amp; Shastric Rule: </strong>
                  {guide.medicalAdvice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Special Medical Disclaimer Card */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed space-y-1">
          <strong>Important Clinical &amp; Shastric Exemption: </strong>
          Individuals with Type-1 diabetes, advanced cardiac disease, pregnant or lactating mothers, children under 12, and seniors above 75 are categorically exempt from severe dry fasting. In the Bhavishya Purana, Lord Krishna tells King Yudhishthira: <em>"When health is endangered, remembering the Lord's name with pure heart grants tenfold the merit of physical starvation."</em>
        </div>
      </div>
    </div>
  );
};
