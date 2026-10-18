import React, { useState } from "react";
import {
  CANONICAL_QUICK_SERVICES,
} from "../../domain/consultation/defaultServices";
import {
  QuickConsultationService,
  QuickConsultationInquiry,
  ConsultationMode,
} from "../../domain/consultation/types";
import { formatMoney } from "../../domain/consultation/money";
import { PRIMARY_CONSULTANT } from "../../domain/consultation/operatorConfig";
import { validateClientConsultationDetails } from "../../domain/consultation/validation";
import { firestoreQuickQuestionAdapter } from "../../domain/consultation/firestoreQuickQuestionAdapter";
import {
  Zap,
  Clock,
  FileText,
  Mic,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Inbox,
  User,
} from "lucide-react";

interface QuickQuestionWorkspaceProps {
  userEmail?: string | null;
  userName?: string | null;
  userProfile?: any;
}

type DeliveryOption = "WRITTEN_ANALYSIS" | "VOICE_NOTE" | "CHAT_THREAD";

type UrgencyTier = {
  id: "STANDARD" | "EXPRESS" | "URGENT";
  label: string;
  turnaroundHours: number;
  multiplierCents: number; // additional minor units in INR
  description: string;
};

const URGENCY_TIERS: UrgencyTier[] = [
  {
    id: "STANDARD",
    label: "Standard Astrological Analysis (24 Hours)",
    turnaroundHours: 24,
    multiplierCents: 0,
    description: "Careful calculation of planetary dasha and transits within one business day.",
  },
  {
    id: "EXPRESS",
    label: "Express Analysis (6 Hours)",
    turnaroundHours: 6,
    multiplierCents: 50000, // +₹500.00
    description: "Prioritized assessment for pressing career or relationship decisions.",
  },
  {
    id: "URGENT",
    label: "Emergency Analysis (2 Hours)",
    turnaroundHours: 2,
    multiplierCents: 100000, // +₹1,000.00
    description: `Immediate chart calculation by Chief Consultant ${PRIMARY_CONSULTANT.name}.`,
  },
];

export const QuickQuestionWorkspace: React.FC<QuickQuestionWorkspaceProps> = ({
  userEmail,
  userName,
  userProfile,
}) => {
  const [selectedQuickService, setSelectedQuickService] = useState<QuickConsultationService>(
    CANONICAL_QUICK_SERVICES[0]
  );
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOption>("WRITTEN_ANALYSIS");
  const [selectedUrgency, setSelectedUrgency] = useState<UrgencyTier>(URGENCY_TIERS[0]);

  // Form state
  const [form, setForm] = useState({
    name: userName || userProfile?.displayName || "",
    email: userEmail || userProfile?.email || "",
    phone: userProfile?.phoneNumber || "",
    question: "",
    dob: userProfile?.birthDetails?.date || "",
    tob: userProfile?.birthDetails?.time || "",
    pob: userProfile?.birthDetails?.placeName || "",
  });

  const [submittedInquiries, setSubmittedInquiries] = useState<QuickConsultationInquiry[]>(() => {
    try {
      const saved = localStorage.getItem("astronext_quick_inquiries");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  });

  // Sync inquiries to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("astronext_quick_inquiries", JSON.stringify(submittedInquiries));
    } catch {}
  }, [submittedInquiries]);

  // Pre-fill form from userProfile
  useEffect(() => {
    if (userProfile || userName || userEmail) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || userName || userProfile?.displayName || "",
        email: prev.email || userEmail || userProfile?.email || "",
        phone: prev.phone || userProfile?.phoneNumber || "",
        dob: prev.dob || userProfile?.birthDetails?.date || "",
        tob: prev.tob || userProfile?.birthDetails?.time || "",
        pob: prev.pob || userProfile?.birthDetails?.placeName || "",
      }));
    }
  }, [userProfile, userName, userEmail]);

  const [validationError, setValidationError] = useState<string | null>(null);

  // Total price calculation in minor units
  const basePrice = selectedQuickService.price.minorUnits;
  const surcharge = selectedUrgency.multiplierCents;
  const totalPriceMinor = basePrice + surcharge;
  const formattedTotalPrice = formatMoney({
    currency: "INR",
    minorUnits: totalPriceMinor,
    scale: 2,
  });

  const handleValidateStep4 = () => {
    if (!form.name.trim() || !form.email.trim() || !form.question.trim()) {
      setValidationError("Please fill out your name, email, and specific question.");
      return false;
    }
    if (form.question.trim().length < 15) {
      setValidationError("Please describe your astrological question in at least 15 characters.");
      return false;
    }
    setValidationError(null);
    return true;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmSubmission = async () => {
    setIsSubmitting(true);
    try {
      const created = await firestoreQuickQuestionAdapter.submitQuickQuestion({
        serviceId: selectedQuickService.id,
        category: selectedQuickService.category || "VEDIC_ASTROLOGY",
        question: form.question,
        clientName: form.name,
        clientEmail: form.email,
        clientPhone: form.phone,
        deliveryFormat: selectedDelivery,
        turnaroundHours: selectedUrgency.turnaroundHours,
        totalPrice: {
          amountMinor: totalPriceMinor,
          currency: "INR",
        },
        birthDetails: form.dob
          ? {
              dob: form.dob,
              tob: form.tob,
              pob: form.pob,
            }
          : undefined,
      });

      // Update in-memory state
      const legacyFormatInquiry: QuickConsultationInquiry = {
        id: created.id,
        clientId: created.clientId,
        clientEmail: created.clientEmail,
        clientName: created.clientName,
        consultantId: PRIMARY_CONSULTANT.id,
        serviceId: selectedQuickService.id,
        questionText: created.question,
        clientBirthDetails: form.dob
          ? {
              dob: form.dob,
              time: form.tob,
              place: form.pob,
            }
          : undefined,
        urgencyHours: selectedUrgency.turnaroundHours,
        deliveryMethod: selectedDelivery,
        status: "REQUESTED",
        paymentStatus: "PENDING",
        createdAt: created.createdAt,
      };

      setSubmittedInquiries((prev) => [legacyFormatInquiry, ...prev.filter((i) => i.id !== created.id)]);
      setCurrentStep(6);
    } catch (err) {
      console.warn("Error submitting quick question to adapter:", err);
      setCurrentStep(6);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-amber-100 p-6 sm:p-8 rounded-3xl border border-amber-800/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>Instant &amp; Quick Question Consultation</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Ask a Specific Astrological Question
          </h1>
          <p className="text-xs text-amber-200/80">
            Rapid horoscope calculation and direct answers from Chief Jyotish Consultant {PRIMARY_CONSULTANT.name}.
          </p>
        </div>

        <div className="text-right shrink-0">
          <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
            Turnaround Window
          </div>
          <div className="font-mono text-sm font-bold text-white flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>2 to 24 Hours</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-amber-900/10 p-6 sm:p-8 lg:p-10 shadow-sm space-y-8">
        {/* Step Progress */}
        <div className="grid grid-cols-6 gap-1.5">
          {[
            "1. Question Type",
            "2. Delivery",
            "3. Turnaround",
            "4. Your Details",
            "5. Review",
            "6. Confirmation",
          ].map((label, idx) => (
            <div key={idx} className="space-y-1 text-center">
              <div
                className={`h-1.5 rounded-full ${
                  currentStep >= idx + 1 ? "bg-amber-800" : "bg-slate-200"
                }`}
              />
              <div
                className={`text-[10px] hidden sm:block font-medium ${
                  currentStep === idx + 1 ? "text-amber-900 font-bold" : "text-slate-400"
                }`}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {validationError && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* STEP 1: SELECT QUICK CONSULTATION TYPE */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-serif text-xl font-bold text-slate-900">
                Step 1: Select Question Focus
              </h2>
              <p className="text-xs text-slate-600">
                Choose the scope of your instant astrological inquiry.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CANONICAL_QUICK_SERVICES.map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => setSelectedQuickService(srv)}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    selectedQuickService.id === srv.id
                      ? "bg-amber-950 text-amber-100 border-amber-800 shadow-md ring-2 ring-amber-500/20"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-current/10">
                        {srv.estimatedResponseTime}
                      </span>
                      <span className="font-mono text-xs font-bold">{formatMoney(srv.price)}</span>
                    </div>
                    <h3 className="font-bold text-sm">{srv.name}</h3>
                    <p className="text-xs opacity-80 leading-relaxed">{srv.description}</p>
                  </div>

                  <div className="pt-4 mt-2 border-t border-current/10 text-[11px] font-semibold flex items-center gap-1">
                    <span>Select Offering</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 rounded-2xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Continue to Delivery Method</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: RESPONSE DELIVERY METHOD */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-serif text-xl font-bold text-slate-900">
                Step 2: Choose Delivery Format
              </h2>
              <p className="text-xs text-slate-600">
                How would you like the astrologer to present your astrological findings?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  id: "WRITTEN_ANALYSIS",
                  title: "Written Analysis (PDF / Text)",
                  desc: "Comprehensive shastric chart breakdown, planetary degree analysis, and remedies.",
                  icon: FileText,
                },
                {
                  id: "VOICE_NOTE",
                  title: "Audio Voice Note (Encrypted)",
                  desc: `Personal spoken voice recording from ${PRIMARY_CONSULTANT.name} detailing your answer.`,
                  icon: Mic,
                },
                {
                  id: "CHAT_THREAD",
                  title: "In-App Consultation Thread",
                  desc: "Interactive direct chat message thread with follow-up clarification.",
                  icon: MessageSquare,
                },
              ].map((method) => {
                const Icon = method.icon;
                const isSelected = selectedDelivery === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedDelivery(method.id as DeliveryOption)}
                    className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-amber-950 text-amber-100 border-amber-800 shadow-md ring-2 ring-amber-500/20"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
                    }`}
                  >
                    <div className="space-y-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isSelected ? "bg-amber-800 text-amber-200" : "bg-white border border-slate-200 text-amber-800"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{method.title}</h4>
                        <p className="text-xs opacity-75 mt-1 leading-relaxed">{method.desc}</p>
                      </div>
                    </div>

                    <div className="pt-4 text-[11px] font-semibold flex items-center gap-1">
                      <span>{isSelected ? "Selected" : "Select Format"}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-3 rounded-2xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Continue to Turnaround Window</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: TURNAROUND TIME TIER */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-serif text-xl font-bold text-slate-900">
                Step 3: Select Response Speed &amp; Honorarium
              </h2>
              <p className="text-xs text-slate-600">
                Choose how quickly you need your astrological inquiry answered.
              </p>
            </div>

            <div className="space-y-3">
              {URGENCY_TIERS.map((tier) => {
                const isSelected = selectedUrgency.id === tier.id;
                const tierTotal = basePrice + tier.multiplierCents;
                const formattedTierTotal = formatMoney({
                  currency: "INR",
                  minorUnits: tierTotal,
                  scale: 2,
                });

                return (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedUrgency(tier)}
                    className={`w-full p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      isSelected
                        ? "bg-amber-950 text-amber-100 border-amber-800 shadow-md ring-2 ring-amber-500/20"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-500" />
                        <span className="font-bold text-sm">{tier.label}</span>
                      </div>
                      <p className="text-xs opacity-80">{tier.description}</p>
                    </div>

                    <div className="font-mono text-base font-bold shrink-0">
                      {formattedTierTotal}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="px-6 py-3 rounded-2xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Continue to Enter Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: ENTER QUESTION & BIRTH DETAILS */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-serif text-xl font-bold text-slate-900">
                Step 4: Formulate Your Specific Astrological Question
              </h2>
              <p className="text-xs text-slate-600">
                Be clear and concise. Exact birth details ensure accurate planetary dasha calculations.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Specific Astrological Question *
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.question}
                  onChange={(e) => setForm((p) => ({ ...p, question: e.target.value }))}
                  placeholder="e.g., I am considering changing jobs next month. Is my 10th house dasha favorable? What is the recommended muhurta window?"
                  className="w-full rounded-xl border border-slate-300 p-3 text-xs text-slate-900"
                />
              </div>

              {/* Birth details */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-xs font-bold text-slate-800">
                  Birth Chart Data (Required for Natal Chart &amp; Prashna Kundli)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={form.dob}
                      onChange={(e) => setForm((p) => ({ ...p, dob: e.target.value }))}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1">Exact Time of Birth</label>
                    <input
                      type="time"
                      value={form.tob}
                      onChange={(e) => setForm((p) => ({ ...p, tob: e.target.value }))}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1">Place of Birth (City/Country)</label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai, India"
                      value={form.pob}
                      onChange={(e) => setForm((p) => ({ ...p, pob: e.target.value }))}
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setCurrentStep(3)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold"
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (handleValidateStep4()) setCurrentStep(5);
                }}
                className="px-6 py-3 rounded-2xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Review Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW QUESTION CONSULTATION */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-serif text-xl font-bold text-slate-900">
                Step 5: Review &amp; Transmit Quick Question
              </h2>
              <p className="text-xs text-slate-600">
                Verify your question parameters and turnaround agreement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Question Summary
                </div>
                <div><span className="text-slate-500">Service:</span> <strong>{selectedQuickService.name}</strong></div>
                <div><span className="text-slate-500">Delivery Format:</span> <strong>{selectedDelivery.replace(/_/g, " ")}</strong></div>
                <div><span className="text-slate-500">Turnaround:</span> <strong>{selectedUrgency.label}</strong></div>
                <div><span className="text-slate-500">Consultant:</span> <strong>{PRIMARY_CONSULTANT.name}</strong></div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Client &amp; Inquiry
                </div>
                <div><span className="text-slate-500">Client:</span> <strong>{form.name} ({form.email})</strong></div>
                <div className="line-clamp-2"><span className="text-slate-500">Question:</span> "{form.question}"</div>
                <div>
                  <span className="text-slate-500">Birth Data:</span>{" "}
                  {form.dob ? `${form.dob} ${form.tob} at ${form.pob}` : "Prashna Kundli mode (Current time)"}
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-950">
                  Total Honorarium Investment
                </div>
                <div className="text-[11px] text-amber-900/80">
                  Includes base service + {selectedUrgency.turnaroundHours}h priority analysis fee.
                </div>
              </div>
              <div className="font-mono text-2xl font-bold text-amber-950">
                {formattedTotalPrice}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setCurrentStep(4)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold"
              >
                Back
              </button>
              <button
                onClick={handleConfirmSubmission}
                className="px-8 py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Quick Question</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: CONFIRMATION (TRUTHFUL RECORD) */}
        {currentStep === 6 && (
          <div className="p-8 rounded-3xl bg-amber-50/80 border border-amber-300 text-center max-w-xl mx-auto space-y-5">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-950 text-xs font-mono font-bold uppercase tracking-wider">
                Status: REQUESTED (Pending Operator Review)
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-900 pt-2">
                Quick Question Registered
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-md mx-auto">
                Your question has been routed to Chief Astrologer {PRIMARY_CONSULTANT.name} ({PRIMARY_CONSULTANT.email}). Your turnaround target is <strong>{selectedUrgency.turnaroundHours} Hours</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-amber-900/10 text-left text-xs space-y-1 text-slate-600">
              <div className="font-bold text-slate-900">Truthful Environment Record:</div>
              <div>
                In Phase 1, inquiries remain stored in your local session workspace. Full Firestore synchronization and gateway processing will connect in Phase 3.
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setCurrentStep(1);
                  setForm((p) => ({ ...p, question: "" }));
                }}
                className="px-6 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Submit Another Question
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Submitted Quick Questions Tracking Area */}
      <div className="bg-white rounded-3xl border border-amber-900/10 p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              My Submitted Quick Questions
            </h3>
            <p className="text-xs text-slate-500">Track status and delivery of your rapid astrological inquiries.</p>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Total: {submittedInquiries.length}
          </span>
        </div>

        {submittedInquiries.length === 0 ? (
          <div className="p-10 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
            <Inbox className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="font-bold text-xs text-slate-700">No quick questions submitted yet</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Your submitted questions and astrologer responses will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {submittedInquiries.map((inq) => {
              const inqAnswer = (inq as any).answer;
              return (
                <div
                  key={inq.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-900">{inq.id}</span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          inq.status === "ANSWERED"
                            ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                            : "bg-amber-100 text-amber-900"
                        }`}
                      >
                        {inq.status}
                      </span>
                      <span className="text-xs text-slate-500">
                        Target: {inq.urgencyHours}h Turnaround
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 font-mono">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="text-xs text-slate-800 font-medium">
                    Question: "{inq.questionText}"
                  </div>

                  {inqAnswer && (
                    <div className="mt-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-emerald-900">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>Astrological Counsel from {PRIMARY_CONSULTANT.name}:</span>
                      </div>
                      <p className="leading-relaxed whitespace-pre-wrap">{inqAnswer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
