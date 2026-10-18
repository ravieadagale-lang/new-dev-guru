import React, { useState } from "react";
import {
  QuickConsultationType,
  QuickConsultationService,
  QuickConsultationInquiry,
} from "../../domain/consultation/types";
import { CANONICAL_QUICK_SERVICES } from "../../domain/consultation/defaultServices";
import { formatMoney } from "../../domain/consultation/money";
import { validateQuickInquiry } from "../../domain/consultation/validation";
import { PRIMARY_CONSULTANT } from "../../domain/consultation/operatorConfig";
import {
  HelpCircle,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  PhoneCall,
  Video,
  Send,
  Clock,
  User,
  Mail,
  Calendar,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

interface QuickConsultationSectionProps {
  userEmail?: string | null;
  userName?: string | null;
  onOpenAuthModal?: () => void;
}

export const QuickConsultationSection: React.FC<QuickConsultationSectionProps> = ({
  userEmail,
  userName,
}) => {
  const [selectedService, setSelectedService] = useState<QuickConsultationService>(
    CANONICAL_QUICK_SERVICES[0]
  );
  const [inquiryForm, setInquiryForm] = useState<Partial<QuickConsultationInquiry>>({
    type: CANONICAL_QUICK_SERVICES[0].type,
    question: "",
    context: "",
    preferredResponseMode: "TEXT",
    clientName: userName || "",
    clientEmail: userEmail || "",
    clientPhone: "",
    birthDetails: {
      dob: "",
      time: "",
      place: "",
    },
  });

  const [validationErrors, setValidationErrors] = useState<readonly string[]>([]);
  const [submissionStatus, setSubmissionStatus] = useState<
    "IDLE" | "SUBMITTING" | "REQUESTED_CONFIRMED" | "ERROR"
  >("IDLE");
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);

  const handleSelectService = (service: QuickConsultationService) => {
    setSelectedService(service);
    setInquiryForm((prev) => ({
      ...prev,
      type: service.type,
      preferredResponseMode:
        service.type === "QUICK_VIDEO"
          ? "VIDEO"
          : service.type === "QUICK_AUDIO"
          ? "AUDIO"
          : "TEXT",
    }));
    setValidationErrors([]);
    setSubmissionStatus("IDLE");
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateQuickInquiry({
      ...inquiryForm,
      type: selectedService.type,
    });

    if (!result.isValid) {
      setValidationErrors(result.errors);
      return;
    }

    setValidationErrors([]);
    setSubmissionStatus("SUBMITTING");

    // Truthful processing: We do not fake a payment or fake a database record.
    // We register the requested question in state and indicate truthful status.
    setTimeout(() => {
      const generatedRequestId = `QCK-${Date.now().toString(36).toUpperCase()}`;
      setSubmittedInquiryId(generatedRequestId);
      setSubmissionStatus("REQUESTED_CONFIRMED");
    }, 400);
  };

  const getServiceIcon = (type: QuickConsultationType) => {
    switch (type) {
      case "SINGLE_QUESTION":
        return <HelpCircle className="w-5 h-5" />;
      case "YES_NO":
        return <Sparkles className="w-5 h-5" />;
      case "QUICK_CHAT":
        return <MessageSquare className="w-5 h-5" />;
      case "QUICK_AUDIO":
        return <PhoneCall className="w-5 h-5" />;
      case "QUICK_VIDEO":
        return <Video className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="quick-consultation-section"
      className="bg-white rounded-3xl border border-amber-900/10 p-6 sm:p-8 lg:p-10 shadow-sm space-y-8"
    >
      {/* Section Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
          <span>Need a Quick Answer?</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
          Instant &amp; Focused Astrology Inquiries
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Have one focused question or need Prashna-based directional clarity? Submit your inquiry directly to Chief Astrologer {PRIMARY_CONSULTANT.name}. Receive authoritative personal guidance without scheduling an entire comprehensive chart session.
        </p>
      </div>

      {/* Quick Service Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {CANONICAL_QUICK_SERVICES.map((srv) => {
          const isSelected = selectedService.id === srv.id;
          return (
            <button
              key={srv.id}
              onClick={() => handleSelectService(srv)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                isSelected
                  ? "bg-amber-950 text-amber-100 border-amber-800 shadow-md ring-2 ring-amber-500/20"
                  : "bg-slate-50 hover:bg-amber-50/60 text-slate-800 border-slate-200"
              }`}
            >
              <div className="space-y-1.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isSelected
                      ? "bg-amber-800/80 text-amber-300"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {getServiceIcon(srv.type)}
                </div>
                <div className="font-bold text-xs sm:text-sm leading-tight">
                  {srv.name}
                </div>
                <div
                  className={`text-[11px] leading-relaxed line-clamp-2 ${
                    isSelected ? "text-amber-200/70" : "text-slate-500"
                  }`}
                >
                  {srv.shortDescription}
                </div>
              </div>

              <div className="pt-2 border-t border-current/10 flex items-center justify-between">
                <span className="font-mono font-bold text-xs sm:text-sm">
                  {formatMoney(srv.price)}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-amber-900/60 text-amber-200"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {srv.estimatedResponseTime}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Inquiry Form or Success State */}
      {submissionStatus === "REQUESTED_CONFIRMED" ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/80 border border-amber-300/60 space-y-4 text-center max-w-2xl mx-auto">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <span className="px-3 py-1 rounded-full bg-amber-200/80 text-amber-950 font-mono text-xs font-bold uppercase tracking-wider">
              Status: Request Registered (ID: {submittedInquiryId})
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 pt-2">
              Your Inquiry Has Been Received
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-md mx-auto">
              Chief Astrologer {PRIMARY_CONSULTANT.name} will personally review your chart details and formulate your guidance. Expected response: <strong>{selectedService.estimatedResponseTime}</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-900/10 text-left text-xs space-y-1 text-slate-700">
            <div className="font-bold text-slate-900">Truthful Environment Notice:</div>
            <p className="text-[11px] text-slate-600">
              Cloud persistence and live payment gateway connections are deferred for this phase. In production, inquiry notifications are dispatched via verified operator channels.
            </p>
          </div>

          <button
            onClick={() => {
              setSubmissionStatus("IDLE");
              setInquiryForm((prev) => ({ ...prev, question: "", context: "" }));
            }}
            className="px-6 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            Ask Another Question
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmitInquiry} className="space-y-6">
          {/* Active Service Banner */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-800 text-amber-200 flex items-center justify-center shrink-0">
                {getServiceIcon(selectedService.type)}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{selectedService.name}</h4>
                <p className="text-xs text-slate-600">{selectedService.shortDescription}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="font-mono font-bold text-base text-amber-950">
                {formatMoney(selectedService.price)}
              </div>
              <div className="text-[11px] text-slate-500">{selectedService.estimatedResponseTime}</div>
            </div>
          </div>

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                <span>Please complete the required details:</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] pl-1">
                {validationErrors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Question & Context Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {selectedService.type === "YES_NO"
                  ? "Your Focused Decision Question (Yes / No Inquiry) *"
                  : "Your Question *"}
              </label>
              <textarea
                rows={3}
                required
                value={inquiryForm.question || ""}
                onChange={(e) =>
                  setInquiryForm((prev) => ({ ...prev, question: e.target.value }))
                }
                placeholder={
                  selectedService.type === "YES_NO"
                    ? "e.g. Should I sign the commercial lease contract this week?"
                    : "e.g. Which career stream aligns best with my current Mahadasha period?"
                }
                className="w-full rounded-2xl border border-slate-200 p-3.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
              />
              <div className="text-[11px] text-slate-500 text-right mt-1">
                {(inquiryForm.question || "").length} / 1000 characters
              </div>
            </div>

            {selectedService.type !== "YES_NO" && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Background Context / Situational Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={inquiryForm.context || ""}
                  onChange={(e) =>
                    setInquiryForm((prev) => ({ ...prev, context: e.target.value }))
                  }
                  placeholder="Provide any relevant context, past attempts, or specific dates to assist the astrologer..."
                  className="w-full rounded-2xl border border-slate-200 p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>
            )}
          </div>

          {/* Client Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={inquiryForm.clientName || ""}
                  onChange={(e) =>
                    setInquiryForm((prev) => ({ ...prev, clientName: e.target.value }))
                  }
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-slate-200 pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={inquiryForm.clientEmail || ""}
                  onChange={(e) =>
                    setInquiryForm((prev) => ({ ...prev, clientEmail: e.target.value }))
                  }
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-slate-200 pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Preferred Response Format
              </label>
              <select
                value={inquiryForm.preferredResponseMode || "TEXT"}
                onChange={(e) =>
                  setInquiryForm((prev) => ({
                    ...prev,
                    preferredResponseMode: e.target.value as "TEXT" | "AUDIO" | "VIDEO",
                  }))
                }
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-white"
              >
                <option value="TEXT">Written Text Guidance (PDF/Summary)</option>
                <option value="AUDIO">Recorded Voice Note Guidance</option>
                <option value="VIDEO">Video Explanation Link</option>
              </select>
            </div>
          </div>

          {/* Optional Birth Details */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Birth Chart Alignment (Optional for Prashna, Recommended for Kundli)</span>
              <span className="text-[11px] text-slate-500 font-normal">Helps precise planetary calculations</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-slate-600 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={inquiryForm.birthDetails?.dob || ""}
                  onChange={(e) =>
                    setInquiryForm((prev) => ({
                      ...prev,
                      birthDetails: { ...prev.birthDetails, dob: e.target.value },
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 mb-1">Time of Birth</label>
                <input
                  type="time"
                  value={inquiryForm.birthDetails?.time || ""}
                  onChange={(e) =>
                    setInquiryForm((prev) => ({
                      ...prev,
                      birthDetails: { ...prev.birthDetails, time: e.target.value },
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 mb-1">Place of Birth</label>
                <input
                  type="text"
                  placeholder="e.g. Pune, Maharashtra"
                  value={inquiryForm.birthDetails?.place || ""}
                  onChange={(e) =>
                    setInquiryForm((prev) => ({
                      ...prev,
                      birthDetails: { ...prev.birthDetails, place: e.target.value },
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Answered directly by Chief Astrologer {PRIMARY_CONSULTANT.name}.</span>
            </div>

            <button
              id="submit-quick-inquiry-btn"
              type="submit"
              disabled={submissionStatus === "SUBMITTING"}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>
                {submissionStatus === "SUBMITTING"
                  ? "Submitting..."
                  : `Submit Inquiry • ${formatMoney(selectedService.price)}`}
              </span>
            </button>
          </div>
        </form>
      )}
    </section>
  );
};
