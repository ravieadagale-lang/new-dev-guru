import React, { useState } from "react";
import { 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  CreditCard, 
  Gem, 
  Video, 
  FileText, 
  AlertCircle, 
  Mail,
  ShieldCheck
} from "lucide-react";

interface RefundPolicyViewProps {
  onNavigateTab: (tab: string) => void;
}

export const RefundPolicyView: React.FC<RefundPolicyViewProps> = ({ onNavigateTab }) => {
  const lastUpdated = "September 10, 2026";

  const categories = [
    {
      title: "SaaS Subscriptions & Digital Reports",
      icon: FileText,
      color: "bg-blue-50 border-blue-200 text-blue-900",
      iconColor: "text-blue-600 bg-blue-100",
      badge: "7-Day Pro Guarantee",
      rules: [
        "First-time Pro Seeker subscription plans include a 7-day no-questions-asked refund policy. If the digital features do not meet your expectations, cancel within 7 days for a 100% refund.",
        "Monthly and annual subscriptions can be cancelled at any time from your Customer Dashboard with 1 click to prevent future recurring charges.",
        "One-time instant downloadable PDF reports (Kundli charts, D9/D60 analysis) are delivered instantaneously. They are non-refundable once downloaded, unless an ephemeris calculation error or technical delivery failure is verified by our engineering desk."
      ]
    },
    {
      title: "1-on-1 Astrologer Consultations",
      icon: Video,
      color: "bg-amber-50 border-amber-200 text-amber-900",
      iconColor: "text-amber-600 bg-amber-100",
      badge: "Flexible Rescheduling",
      rules: [
        "Free Rescheduling: You may reschedule your consultation at no additional charge up to 4 hours before the booked start time directly through your dashboard.",
        "100% Full Refund Guarantee: If an astrologer or expert is unable to attend the scheduled session or in the event of platform technical disruptions, you are eligible for an immediate full refund or priority rescheduling.",
        "Completed Sessions: Once a 1-on-1 consultation has taken place, fees are non-refundable as the expert's dedicated preparation time, birth chart analysis, and live consultation time have been rendered."
      ]
    },
    {
      title: "Sacred Marketplace Physical Goods",
      icon: Gem,
      color: "bg-emerald-50 border-emerald-200 text-emerald-900",
      iconColor: "text-emerald-600 bg-emerald-100",
      badge: "7-Day Return Window",
      rules: [
        "7-Day Inspection Guarantee: Untouched, unworn gemstones and consecrated Rudraksha beads can be returned within 7 days of delivery in their original packaging with the government-approved gemological laboratory certificate intact.",
        "Damaged in Transit: If your shipment arrives damaged or tampered with, notify us within 48 hours of delivery with packaging photographs for an immediate free replacement or 100% refund.",
        "Custom Consecrated Jewelry: For gemstones set into customized gold or silver rings/pendants with personalized astrological measurements, return credits apply to the gemstone value minus metal crafting and hallmarking fees."
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#1E1B18] text-amber-100 rounded-3xl p-8 sm:p-12 border border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
            <RotateCcw className="w-4 h-4 text-amber-400" />
            <span>Fair &amp; Transparent Customer Protection</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed">
            At Dev-Guru, we prioritize transparency and customer trust across all our SaaS tiers, live consultations, and consecrated gemstone orders. Here is our clear, customer-friendly policy for refunds, cancellations, and replacements.
          </p>
          <div className="flex items-center gap-4 text-xs text-amber-300/70 pt-2">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Last Revised: {lastUpdated}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Buyer Protection SLA
            </span>
          </div>
        </div>
      </div>

      {/* 3 Categories Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <div 
              key={i} 
              className={`rounded-3xl border p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs ${cat.color}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl ${cat.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/80 border shadow-2xs">
                    {cat.badge}
                  </span>
                </div>

                <h2 className="font-serif text-xl font-bold text-slate-900 leading-tight">
                  {cat.title}
                </h2>

                <ul className="space-y-3 text-xs text-slate-700">
                  {cat.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                Governed by Dev-Guru SLA Terms
              </div>
            </div>
          );
        })}
      </div>

      {/* Step-by-Step Refund Process */}
      <section className="bg-white rounded-3xl border border-amber-900/10 p-8 sm:p-12 space-y-8 shadow-xs">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-800 font-bold">
            Transparent Workflow
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            How to Request a Refund or Replacement
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            We ensure a seamless, hassle-free resolution within our dedicated customer satisfaction workflow:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center">
              1
            </div>
            <h3 className="font-serif font-bold text-sm text-slate-900">Submit Request</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Email <span className="text-amber-800 font-semibold">refunds@dev-guru.com</span> or initiate a ticket via your Customer Dashboard including your Order ID or Consultation Reference.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center">
              2
            </div>
            <h3 className="font-serif font-bold text-sm text-slate-900">Verification</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our support desk verifies the request eligibility (SaaS 7-day window, consultation cancellation timeline, or gemstone transit inspection).
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center">
              3
            </div>
            <h3 className="font-serif font-bold text-sm text-slate-900">Approval &amp; Return</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              For marketplace physical goods, we arrange insured reverse pickup. For digital subscriptions, approval is granted within 24 hours.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center">
              4
            </div>
            <h3 className="font-serif font-bold text-sm text-slate-900">Credit Dispatch</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Funds are credited directly to your original payment source (credit card, bank account, or UPI) within <strong>5 to 7 business days</strong>.
            </p>
          </div>
        </div>

        {/* Support Callout */}
        <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-300/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-bold text-amber-950 text-sm flex items-center justify-center sm:justify-start gap-2">
              <Mail className="w-4 h-4 text-amber-700" />
              Need Immediate Refund Assistance?
            </div>
            <p className="text-xs text-amber-900/80">
              Our concierge team is available Monday to Saturday (9:00 AM – 8:00 PM IST).
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateTab("contact")}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Contact Support Desk
            </button>
            <button
              onClick={() => onNavigateTab("dashboard")}
              className="px-5 py-2.5 rounded-xl bg-white border border-amber-300 text-amber-900 text-xs font-semibold hover:bg-amber-100/50 transition-all cursor-pointer"
            >
              View My Orders
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicyView;
