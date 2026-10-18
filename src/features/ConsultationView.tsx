import React, { useState, useRef } from "react";
import { useSuperAdminAuth } from "../services/auth/SuperAdminAuthContext";
import { ClientWorkspace } from "../components/consultation/ClientWorkspace";
import { ConsultantWorkspace } from "../components/consultation/ConsultantWorkspace";
import { ConsultantProfileCard } from "../components/consultation/ConsultantProfileCard";
import { QuickQuestionWorkspace } from "../components/consultation/QuickQuestionWorkspace";
import { canAccessConsultantWorkspace } from "../domain/consultation/authorization";
import { PRIMARY_CONSULTANT } from "../domain/consultation/operatorConfig";
import { CANONICAL_CONSULTATION_SERVICES } from "../domain/consultation/defaultServices";
import { formatMoney } from "../domain/consultation/money";
import { calculateConsultationPrice } from "../domain/consultation/pricingEngine";
import { ConsultationProvider } from "../context/ConsultationContext";
import { AstrologerDirectoryFilter } from "../components/consultation/AstrologerDirectoryFilter";
import { Astrologer } from "../domain/consultation/astrologersData";
import {
  ShieldCheck,
  Sparkles,
  Calendar,
  Zap,
  Clock,
  ArrowRight,
  CheckCircle2,
  BadgePercent,
  X,
  User,
  LogIn,
} from "lucide-react";

interface ConsultationViewProps {
  userProfile?: any;
  onOpenAuthModal?: () => void;
}

export const ConsultationView: React.FC<ConsultationViewProps> = ({
  userProfile,
  onOpenAuthModal,
}) => {
  const { user } = useSuperAdminAuth();
  const [activeSide, setActiveSide] = useState<"CLIENT" | "CONSULTANT">("CLIENT");

  // Selected service for the one-to-one booking pathway
  const [selectedServiceId, setSelectedServiceId] = useState<string>("service_kundli_milan");
  const [showQuickQuestionModal, setShowQuickQuestionModal] = useState(false);
  const [targetAstrologer, setTargetAstrologer] = useState<Astrologer | null>(null);

  const isAuthorizedConsultant = canAccessConsultantWorkspace(user?.email);
  const bookingWorkspaceRef = useRef<HTMLDivElement>(null);

  const scrollToBooking = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    bookingWorkspaceRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectAstrologer = (astrologer: Astrologer) => {
    setTargetAstrologer(astrologer);
    if (astrologer.defaultServiceId) {
      setSelectedServiceId(astrologer.defaultServiceId);
    }
    bookingWorkspaceRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAskQuickQuestion = (astrologer?: Astrologer) => {
    if (astrologer) {
      setTargetAstrologer(astrologer);
    }
    setShowQuickQuestionModal(true);
  };

  return (
    <ConsultationProvider>
      <div className="space-y-10 py-2 pb-16 animate-in fade-in duration-300">
      {/* Discreet Header & Operator Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-2 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span className="font-semibold text-slate-800">Dev-Guru Consultations</span>
          <span className="text-slate-300 select-none">·</span>
          <span>Verified Vedic Sanctuary</span>
          {user?.email && (
            <>
              <span className="text-slate-300 select-none">·</span>
              <span className="text-slate-600 font-medium">Logged in as {user.displayName || user.email}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!user && onOpenAuthModal && (
            <button
              type="button"
              onClick={onOpenAuthModal}
              className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-amber-700" />
              <span>Sign In / Register</span>
            </button>
          )}

          {/* Dual Side Toggle: Only prominently visible if authorized consultant */}
          {isAuthorizedConsultant && (
            <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex items-center gap-1">
              <button
                onClick={() => setActiveSide("CLIENT")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeSide === "CLIENT"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Client Sanctuary
              </button>
              <button
                onClick={() => setActiveSide("CONSULTANT")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeSide === "CONSULTANT"
                    ? "bg-amber-800 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Consultant Workspace</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {activeSide === "CLIENT" ? (
        <div className="space-y-10">
          {/* CONSOLIDATED RAVIE ADAGALE PROFILE CARD */}
          <ConsultantProfileCard onBookSession={() => scrollToBooking()} />

          {/* 20% DISCOUNT PROMOTION */}
          <section className="bg-gradient-to-r from-amber-50 via-amber-100/60 to-amber-50 rounded-3xl border border-amber-300/80 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-start sm:items-center gap-4">
              {/* Elegant Gold Metallic Seal */}
              <div className="relative shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 text-amber-100 p-0.5 shadow-md flex items-center justify-center ring-2 ring-amber-400/50">
                <div className="w-full h-full rounded-2xl border border-amber-300/30 flex flex-col items-center justify-center p-1 text-center bg-black/20">
                  <span className="font-serif text-base font-extrabold leading-none text-amber-200">
                    20%
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-amber-300 leading-tight">
                    OFF
                  </span>
                </div>
              </div>

              {/* Promotional Terms */}
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-2">
                  <BadgePercent className="w-4 h-4 text-amber-700" />
                  <span>Pay in Full at Booking</span>
                </div>
                <h3 className="text-sm sm:text-base font-serif font-bold text-slate-900">
                  Save 20% when you pay in full at booking.
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                  Immediate 20% advance discount is applied when selecting full advance payment. Standard price applies if choosing to pay before the consultation session starts.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => scrollToBooking()}
              className="sm:shrink-0 px-5 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-100 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-xs self-start sm:self-center"
            >
              Claim 20% Advance Discount
            </button>
          </section>

          {/* ASTROLOGER DIRECTORY & FILTER SYSTEM */}
          <AstrologerDirectoryFilter
            onSelectAstrologer={handleSelectAstrologer}
            onAskQuickQuestion={handleAskQuickQuestion}
          />

          {/* SECTION 13 — HOW IT WORKS */}
          <section className="bg-slate-50/80 rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6">
            <div className="text-center max-w-md mx-auto space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                Simple Booking Experience
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                How It Works
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-2">
                <div className="text-xs font-mono font-bold text-amber-700">01</div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                  Choose your consultation
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Select the Jyotish domain or topic that matches your life question.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-2">
                <div className="text-xs font-mono font-bold text-amber-700">02</div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                  Select date and time
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Pick your preferred consultation slot based on verified practitioner availability.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-2">
                <div className="text-xs font-mono font-bold text-amber-700">03</div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                  Review and confirm
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Verify details, choose full payment for 20% savings, and submit your request.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-2">
                <div className="text-xs font-mono font-bold text-amber-700">04</div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                  Connect with Ravie Adagale
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Receive room coordinates and meet privately via your preferred communication channel.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 4 — "WHAT WOULD YOU LIKE HELP WITH?" */}
          <section className="space-y-6 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200/80 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                  Consultation Topics
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                  What would you like help with?
                </h2>
              </div>
              <p className="text-xs text-slate-500 max-w-sm">
                Each consultation provides private, focused guidance with Ravie Adagale.
              </p>
            </div>

            {/* Curated Service Topic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CANONICAL_CONSULTATION_SERVICES.map((srv) => {
                const isPrimaryTopic = srv.id === "service_kundli_milan";
                const priceFull = calculateConsultationPrice(srv.price, "PAY_IN_FULL_NOW");

                return (
                  <div
                    key={srv.id}
                    className={`rounded-3xl border p-6 flex flex-col justify-between transition-all hover:shadow-md ${
                      isPrimaryTopic
                        ? "bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/20"
                        : "bg-white border-slate-200"
                    }`}
                  >
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between">
                        {isPrimaryTopic ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-200/90 text-amber-950 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-700" />
                            <span>Primary Specialization</span>
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            {srv.category.replace(/_/g, " ")}
                          </span>
                        )}

                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-amber-700" />
                          <span>{srv.durationMinutes} mins</span>
                        </div>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-slate-900">
                        {srv.name}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {srv.description}
                      </p>
                    </div>

                    <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          From (20% off)
                        </div>
                        <div className="font-mono text-base font-bold text-emerald-800">
                          {formatMoney(priceFull.finalAmount)}
                        </div>
                        <div className="text-[10px] text-slate-400 line-through">
                          {formatMoney(priceFull.basePrice)}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => scrollToBooking(srv.id)}
                        className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                          isPrimaryTopic
                            ? "bg-amber-800 hover:bg-amber-900 text-white shadow-xs"
                            : "bg-slate-900 hover:bg-slate-800 text-white"
                        }`}
                      >
                        <span>Select Topic</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECTION 5 — ONE-TO-ONE CONSULTATION PRIMARY CARD */}
          <section className="bg-white rounded-3xl border border-amber-900/15 p-6 sm:p-8 lg:p-10 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="space-y-1.5 max-w-xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                  Primary Booking Pathway
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                  One-to-One Consultation
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Private, comprehensive consultation with <strong>{PRIMARY_CONSULTANT.name}</strong>. Choose your life topic, select an auspicious date and time, and connect over encrypted video, phone, or audio.
                </p>
              </div>

              <button
                type="button"
                onClick={() => scrollToBooking()}
                className="px-7 py-3.5 rounded-2xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 shrink-0"
              >
                <Calendar className="w-4 h-4" />
                <span>Book One-to-One Session</span>
              </button>
            </div>

            {/* Pathway highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center gap-2.5 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">100% Private Session</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">Choose Date &amp; Time</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">Video, Phone, or Audio</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">20% Full-Payment Discount</span>
              </div>
            </div>
          </section>

          {/* ONE-TO-ONE CLIENT BOOKING WORKSPACE */}
          <div ref={bookingWorkspaceRef} className="pt-2">
            <ClientWorkspace
              userEmail={user?.email}
              userName={user?.displayName || "Dev-Guru Client"}
              userProfile={userProfile}
              onOpenAuthModal={onOpenAuthModal}
              initialServiceId={selectedServiceId}
            />
          </div>

          {/* SECTION 12 — NEED A QUICK ANSWER? (QUICK QUESTIONS) */}
          <section className="bg-slate-900 text-slate-100 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Single Focused Inquiries</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Need a Quick Answer?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                For a single, time-sensitive question regarding relationship timing, career decision, or gemstone suitability, choose a focused Quick Question consultation.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowQuickQuestionModal(true)}
              className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-slate-950" />
              <span>Ask a Quick Question</span>
            </button>
          </section>

          {/* Quick Question Modal / Drawer */}
          {showQuickQuestionModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-slate-900">
                       Quick Question Consultation
                    </h3>
                    <p className="text-xs text-slate-500">
                      Focused astrological inquiry with {targetAstrologer ? targetAstrologer.name : PRIMARY_CONSULTANT.name}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowQuickQuestionModal(false)}
                    className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <QuickQuestionWorkspace
                  userEmail={user?.email}
                  userName={user?.displayName || "Dev-Guru Client"}
                  userProfile={userProfile}
                  onOpenAuthModal={onOpenAuthModal}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Render Consultant Workspace Component for Operator */
        <ConsultantWorkspace
          userEmail={user?.email}
          onOpenAuthModal={onOpenAuthModal}
        />
      )}
    </div>
    </ConsultationProvider>
  );
};
