import React, { useState } from "react";
import { 
  Scale, 
  FileText, 
  ShieldAlert, 
  CheckCircle2, 
  BookOpen, 
  AlertTriangle, 
  Clock, 
  Mail,
  Compass,
  Sparkles
} from "lucide-react";

interface TermsConditionsViewProps {
  onNavigateTab: (tab: string) => void;
}

export const TermsConditionsView: React.FC<TermsConditionsViewProps> = ({ onNavigateTab }) => {
  const [activeTab, setActiveTab] = useState<string>("acceptance");
  const lastUpdated = "September 10, 2026";

  const sections = [
    { id: "acceptance", label: "1. Acceptance of Terms" },
    { id: "disclaimer", label: "2. Spiritual Advisory Disclaimer" },
    { id: "accounts", label: "3. User Accounts & SaaS Access" },
    { id: "consultations", label: "4. 1-on-1 Consultations" },
    { id: "marketplace", label: "5. Marketplace & Gemstones" },
    { id: "ip", label: "6. Intellectual Property Rights" },
    { id: "termination", label: "7. Termination & Conduct" },
    { id: "governing-law", label: "8. Governing Law & Jurisdiction" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#1E1B18] text-amber-100 rounded-3xl p-8 sm:p-12 border border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
            <Scale className="w-4 h-4 text-amber-400" />
            <span>Dev-Guru Terms of Service &amp; Conditions</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Terms of Service &amp; Conditions
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed">
            Please read these terms carefully before accessing or using the Dev-Guru Spiritual Intelligence SaaS platform, calculating birth charts, booking expert consultations, or purchasing consecrated items from our marketplace.
          </p>
          <div className="flex items-center gap-4 text-xs text-amber-300/70 pt-2">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Effective Date: {lastUpdated}
            </span>
            <span>&bull;</span>
            <span className="text-amber-300 font-semibold">
              Version 3.4
            </span>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Table of Contents */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-amber-900/10 p-6 shadow-xs sticky top-24 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Navigation Index
          </div>
          <nav className="space-y-1">
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveTab(sec.id);
                  const el = document.getElementById(sec.id);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                  activeTab === sec.id
                    ? "bg-amber-100/80 text-amber-950 font-bold border border-amber-300/60"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span>{sec.label}</span>
                {activeTab === sec.id && <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />}
              </button>
            ))}
          </nav>

          <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
            <div>Questions regarding these legal terms?</div>
            <a href="mailto:legal@dev-guru.com" className="font-bold text-amber-800 hover:underline">
              legal@dev-guru.com
            </a>
          </div>
        </div>

        {/* Content Body */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-amber-900/10 p-8 sm:p-10 shadow-xs space-y-10 text-slate-700 leading-relaxed text-sm">
          {/* 1. Acceptance */}
          <section id="acceptance" className="space-y-3 pt-2">
            <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600" />
              1. Acceptance of Terms &amp; SaaS Agreement
            </h2>
            <p className="text-xs sm:text-sm">
              By accessing, browsing, registering for, or using the Dev-Guru web platform (&quot;Platform&quot;, &quot;Service&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you confirm that you have read, understood, and agreed to be legally bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, you must discontinue using our services immediately.
            </p>
          </section>

          {/* 2. Spiritual Advisory Disclaimer */}
          <section id="disclaimer" className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              2. Important Spiritual Advisory Disclaimer
            </h2>
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300/80 text-xs text-amber-950 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
                <span>Non-Clinical, Spiritual Guidance Notice</span>
              </div>
              <p className="leading-relaxed">
                Astrology (Jyotish), Numerology, Tarot, Face Reading (Mukha Samudrika), and Vastu Shastra are traditional metaphysical sciences intended exclusively for philosophical contemplation, spiritual enrichment, and personal mindfulness.
              </p>
              <p className="leading-relaxed">
                <strong>No Professional Substitute:</strong> The insights, chart analyses, and expert opinions provided through Dev-Guru DO NOT constitute certified medical diagnosis, clinical psychological therapy, legal counsel, or certified financial/investment advisory. Always seek the advice of licensed professionals for health, legal, or investment decisions.
              </p>
            </div>
          </section>

          {/* 3. User Accounts */}
          <section id="accounts" className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-600" />
              3. User Accounts &amp; SaaS Platform Usage
            </h2>
            <p className="text-xs sm:text-sm">
              To utilize features such as saving multiple birth charts, viewing transits, or accessing customer dashboards, you may create a user account:
            </p>
            <ul className="text-xs text-slate-600 space-y-2 list-disc pl-5">
              <li>
                <strong>Data Accuracy:</strong> You agree to provide accurate birth parameters (date, time, and location) as astrological calculations depend directly on astronomical precision.
              </li>
              <li>
                <strong>Account Confidentiality:</strong> You are responsible for safeguarding your login credentials and for all activities that occur under your account.
              </li>
              <li>
                <strong>Subscription Tiers:</strong> Certain advanced features (e.g., D60 past-karma charts, comprehensive dasha timeline PDFs, multi-client CRM tools) require an active Pro or Consultant subscription.
              </li>
            </ul>
          </section>

          {/* 4. 1-on-1 Consultations */}
          <section id="consultations" className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-600" />
              4. 1-on-1 Astrologer &amp; Expert Consultations
            </h2>
            <p className="text-xs sm:text-sm">
              When booking video or audio consultations with our founder or certified panel:
            </p>
            <ul className="text-xs text-slate-600 space-y-2 list-disc pl-5">
              <li>
                <strong>Punctuality &amp; Attendance:</strong> Consultations begin strictly at the scheduled time. If a user is late, the session cannot be extended beyond the allotted slot.
              </li>
              <li>
                <strong>Mutual Respect:</strong> We maintain a zero-tolerance policy for harassment, abusive language, or inappropriate behavior. Astrologers reserve the right to terminate any session without refund in cases of misconduct.
              </li>
              <li>
                <strong>Rescheduling:</strong> Sessions may be rescheduled free of charge up to 4 hours before the booked start time.
              </li>
            </ul>
          </section>

          {/* 5. Marketplace */}
          <section id="marketplace" className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              5. Sacred Marketplace &amp; Certified Gemstones
            </h2>
            <p className="text-xs sm:text-sm">
              All physical spiritual goods sold on Dev-Guru adhere to the highest authentic standards:
            </p>
            <ul className="text-xs text-slate-600 space-y-2 list-disc pl-5">
              <li>
                <strong>Authenticity Guarantee:</strong> Every precious and semi-precious gemstone is 100% natural, untreated, and accompanied by an official government-recognized gemological laboratory certificate.
              </li>
              <li>
                <strong>Pran Pratishtha Consecration:</strong> Items requested with Vedic energization are purified in your name, Gotra, and Nakshatra by certified Vedic priests prior to dispatch.
              </li>
              <li>
                <strong>Delivery &amp; Transit:</strong> Shipments are fully insured against transit damage or loss.
              </li>
            </ul>
          </section>

          {/* 6. Intellectual Property */}
          <section id="ip" className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-600" />
              6. Intellectual Property &amp; Platform Software
            </h2>
            <p className="text-xs sm:text-sm">
              All software, custom mathematical ephemeris calculators, chart visualizers, written interpretations, articles, and brand marks are the exclusive intellectual property of Dev-Guru V3 Inc. You may not scrape, reverse engineer, resell, or distribute our platform code or reports without express written authorization.
            </p>
          </section>

          {/* 7. Termination */}
          <section id="termination" className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              7. Termination &amp; Suspension
            </h2>
            <p className="text-xs sm:text-sm">
              Dev-Guru reserves the right to suspend or terminate accounts that violate our code of conduct, attempt fraudulent payments, abuse platform APIs, or engage in defamatory conduct.
            </p>
          </section>

          {/* 8. Governing Law */}
          <section id="governing-law" className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-600" />
              8. Governing Law &amp; Dispute Resolution
            </h2>
            <p className="text-xs sm:text-sm">
              These terms shall be governed by and construed in accordance with the applicable laws of India. Any legal dispute or proceeding arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts in Bangalore / New Delhi, India.
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              For any legal notices or contractual inquiries, please contact: <a href="mailto:legal@dev-guru.com" className="text-amber-800 font-bold hover:underline">legal@dev-guru.com</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsView;
