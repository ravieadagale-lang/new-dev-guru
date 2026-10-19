import React, { useState, useMemo, useEffect } from "react";
import {
  ConsultationCategory,
  ConsultationMode,
  ConsultationService,
  ConsultationBooking,
  ConsultationSlot,
} from "../../domain/consultation/types";
import { CANONICAL_CONSULTATION_SERVICES } from "../../domain/consultation/defaultServices";
import { PRIMARY_CONSULTANT, PRIMARY_CONSULTANT_PROFILE } from "../../domain/consultation/operatorConfig";
import { formatMoney } from "../../domain/consultation/money";
import {
  calculateConsultationPrice,
  ConsultationPaymentOption,
} from "../../domain/consultation/pricingEngine";
import { calculateEndTime } from "../../domain/consultation/businessRules";
import {
  generateCandidateSlots,
  getAvailableDates,
  validateBookingSlot,
} from "../../domain/consultation/availabilityEngine";
import { ConsultationDetailModal } from "./ConsultationDetailModal";
import { LiveConsultationRoomModal } from "./LiveConsultationRoomModal";
import { useConsultation } from "../../context/ConsultationContext";
import { MuhurtaQualityScoreEngine } from "../../engine/muhurtaQualityScoreEngine";
import { GLOBAL_CITIES } from "../../utils/vedicAstronomicalEngine";
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  User,
  Info,
  Globe,
  CreditCard,
  Percent,
  Check,
  ArrowRight,
  HeartHandshake,
  Lock,
  Radio,
  LogIn,
} from "lucide-react";

interface ClientWorkspaceProps {
  userEmail?: string | null;
  userName?: string | null;
  userProfile?: any;
  initialServiceId?: string;
  initialStep?: 1 | 2 | 3 | 4 | 5 | 6;
  initialViewMode?: ClientViewMode;
  onOpenAuthModal?: () => void;
}

type ClientViewMode = "BOOKING_FLOW" | "CATALOG" | "MY_BOOKINGS";

export const ClientWorkspace: React.FC<ClientWorkspaceProps> = ({
  userEmail,
  userName,
  userProfile,
  initialServiceId,
  initialStep,
  initialViewMode,
  onOpenAuthModal,
}) => {
  const {
    availability,
    bookings,
    createBooking,
    cancelBooking,
    rescheduleBooking,
    completePayment,
    persistenceInfo,
  } = useConsultation();

  const [viewMode, setViewMode] = useState<ClientViewMode>(initialViewMode || "BOOKING_FLOW");
  const [selectedCategory, setSelectedCategory] = useState<ConsultationCategory | "ALL">("ALL");

  // Selected Service
  const [selectedService, setSelectedService] = useState<ConsultationService>(() => {
    if (initialServiceId) {
      const match = CANONICAL_CONSULTATION_SERVICES.find((s) => s.id === initialServiceId);
      if (match) return match;
    }
    return CANONICAL_CONSULTATION_SERVICES[0];
  });

  useEffect(() => {
    if (initialServiceId) {
      const match = CANONICAL_CONSULTATION_SERVICES.find((s) => s.id === initialServiceId);
      if (match && match.id !== selectedService?.id) {
        setSelectedService(match);
      }
    }
  }, [initialServiceId, selectedService?.id]);

  // Guided Booking Flow (1: Service, 2: Channel, 3: Date & Slot, 4: Details, 5: Review & Payment, 6: Success)
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(initialStep || 1);
  const [selectedMode, setSelectedMode] = useState<ConsultationMode>("VIDEO");

  // Client Timezone
  const [selectedTimezone, setSelectedTimezone] = useState<string>("Asia/Kolkata");

  // Candidate Available Dates derived from Consultant's configured availability
  const candidateDates = useMemo(() => {
    const activeService = selectedService || CANONICAL_CONSULTATION_SERVICES[0];
    return getAvailableDates({
      availability,
      serviceDurationMinutes: activeService.durationMinutes,
      bufferMinutes: activeService.bufferMinutes || availability.rules[0]?.bufferMinutes || 15,
      clientTimezone: selectedTimezone,
      daysAhead: activeService.maxAdvanceBookingDays || 21,
      existingBookings: bookings,
      requestedMode: selectedMode,
    });
  }, [availability, selectedService, selectedTimezone, bookings, selectedMode]);

  // Selected Date (defaults to first available date)
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    if (candidateDates.length > 0 && (!selectedDate || !candidateDates.includes(selectedDate))) {
      setSelectedDate(candidateDates[0]);
    }
  }, [candidateDates, selectedDate]);

  // Candidate Slots for the Selected Date (STRICTLY derived from Consultant Availability)
  const candidateSlots = useMemo(() => {
    if (!selectedDate) return [];
    const activeService = selectedService || CANONICAL_CONSULTATION_SERVICES[0];
    return generateCandidateSlots({
      availability,
      serviceDurationMinutes: activeService.durationMinutes,
      bufferMinutes: activeService.bufferMinutes || availability.rules[0]?.bufferMinutes || 15,
      bookingDate: selectedDate,
      clientTimezone: selectedTimezone,
      existingBookings: bookings,
      requestedMode: selectedMode,
      minimumNoticeMinutes: activeService.minimumNoticeMinutes,
      maximumAdvanceDays: activeService.maxAdvanceBookingDays,
    });
  }, [availability, selectedService, selectedDate, selectedTimezone, bookings, selectedMode]);

  // Only valid available slots
  const availableSlots = useMemo(() => {
    return candidateSlots.filter((slot) => slot.isAvailable);
  }, [candidateSlots]);

  // Selected Slot (strictly an available slot object from the engine)
  const [selectedSlot, setSelectedSlot] = useState<ConsultationSlot | null>(null);

  // Automatically select first available slot when date changes
  useEffect(() => {
    if (availableSlots.length > 0) {
      // Keep current if still valid
      const exists = availableSlots.find((s) => s.slotId === selectedSlot?.slotId);
      if (!exists) {
        setSelectedSlot(availableSlots[0]);
      }
    } else {
      setSelectedSlot(null);
    }
  }, [availableSlots]);

  // Payment Option (Default to 20% discount advance payment)
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState<ConsultationPaymentOption>("PAY_IN_FULL_NOW");

  // Time-of-Day Filter for available slots
  const [slotTimeFilter, setSlotTimeFilter] = useState<"ALL" | "MORNING" | "AFTERNOON" | "EVENING">("ALL");

  // Client Details Form
  const [clientForm, setClientForm] = useState({
    name: userName || userProfile?.displayName || "",
    email: userEmail || userProfile?.email || "",
    phone: userProfile?.phoneNumber || "",
    focusTopic: "",
    specificQuestions: "",
    dob: userProfile?.birthDetails?.date || "",
    tob: userProfile?.birthDetails?.time || "",
    pob: userProfile?.birthDetails?.placeName || "",
  });

  // Pre-fill form when userProfile arrives or updates
  useEffect(() => {
    if (userProfile || userName || userEmail) {
      setClientForm((prev) => ({
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

  // Muhurta Auspiciousness evaluation for available slots
  const defaultCity = useMemo(() => {
    return GLOBAL_CITIES.find((c) => c.id === "new_delhi") || GLOBAL_CITIES[0];
  }, []);

  const slotAuspiciousnessMap = useMemo(() => {
    const map = new Map<string, { score: number; tierLabel: string; isShubh: boolean; warning?: string }>();
    for (const slot of availableSlots) {
      try {
        const slotDate = new Date(slot.startTime);
        const evalRes = MuhurtaQualityScoreEngine.evaluateQualityScore(slotDate, "general_auspicious", defaultCity);
        map.set(slot.slotId, {
          score: evalRes.score,
          tierLabel: evalRes.tierLabel,
          isShubh: evalRes.score >= 55,
          warning: evalRes.activeInauspiciousWindows.length > 0 ? evalRes.activeInauspiciousWindows[0] : undefined,
        });
      } catch {
        map.set(slot.slotId, { score: 72, tierLabel: "Auspicious", isShubh: true });
      }
    }
    return map;
  }, [availableSlots, defaultCity]);

  // Filtered available slots according to Time-of-Day
  const filteredAvailableSlots = useMemo(() => {
    if (slotTimeFilter === "ALL") return availableSlots;
    return availableSlots.filter((slot) => {
      const date = new Date(slot.startTime);
      const hourStr = date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        hour12: false,
        timeZone: selectedTimezone,
      });
      const hour = parseInt(hourStr, 10);
      if (slotTimeFilter === "MORNING") return hour < 12;
      if (slotTimeFilter === "AFTERNOON") return hour >= 12 && hour < 17;
      if (slotTimeFilter === "EVENING") return hour >= 17;
      return true;
    });
  }, [availableSlots, slotTimeFilter, selectedTimezone]);

  // Interactive Payment Checkout Sheet simulation
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [simulatedPaymentMethod, setSimulatedPaymentMethod] = useState<"UPI" | "CARD" | "NET_BANKING">("UPI");

  const [lastCreatedBooking, setLastCreatedBooking] = useState<ConsultationBooking | null>(null);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [activeDetailBooking, setActiveDetailBooking] = useState<ConsultationBooking | null>(null);
  const [selectedLiveRoomBooking, setSelectedLiveRoomBooking] = useState<ConsultationBooking | null>(null);
  type BookingFilterType =
    | "ALL"
    | "UPCOMING"
    | "PENDING"
    | "CONFIRMED"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "CANCELLED"
    | "RESCHEDULED"
    | "DECLINED"
    | "EXPIRED"
    | "NO_SHOW";
  const [bookingFilter, setBookingFilter] = useState<BookingFilterType>("ALL");
  const [bookingError, setBookingError] = useState<string | null>(null);

  // Price breakdown
  const priceBreakdown = useMemo(() => {
    const activeService = selectedService || CANONICAL_CONSULTATION_SERVICES[0];
    return calculateConsultationPrice(activeService.price, selectedPaymentOption);
  }, [selectedService, selectedPaymentOption]);

  // Filter client's own bookings: strictly empty if unauthenticated
  const clientBookings = useMemo(() => {
    if (!userEmail) return [];
    return bookings.filter((b) => b.clientEmail.toLowerCase() === userEmail.toLowerCase());
  }, [bookings, userEmail]);

  const filteredBookings = useMemo(() => {
    if (bookingFilter === "ALL") return clientBookings;
    if (bookingFilter === "PENDING")
      return clientBookings.filter((b) => b.status === "REQUESTED" || b.status === "PENDING_CONFIRMATION");
    if (bookingFilter === "UPCOMING")
      return clientBookings.filter((b) => b.status === "CONFIRMED" && new Date(b.startTime) > new Date());
    if (bookingFilter === "CONFIRMED")
      return clientBookings.filter((b) => b.status === "CONFIRMED");
    if (bookingFilter === "IN_PROGRESS")
      return clientBookings.filter((b) => b.status === "IN_PROGRESS");
    if (bookingFilter === "COMPLETED")
      return clientBookings.filter((b) => b.status === "COMPLETED");
    if (bookingFilter === "CANCELLED")
      return clientBookings.filter(
        (b) => b.status === "CANCELLED_BY_CLIENT" || b.status === "CANCELLED_BY_CONSULTANT"
      );
    if (bookingFilter === "RESCHEDULED")
      return clientBookings.filter((b) => b.status === "RESCHEDULE_REQUESTED");
    if (bookingFilter === "DECLINED")
      return clientBookings.filter((b) => b.status === "DECLINED");
    if (bookingFilter === "EXPIRED")
      return clientBookings.filter((b) => b.status === "EXPIRED");
    if (bookingFilter === "NO_SHOW")
      return clientBookings.filter((b) => b.status === "NO_SHOW");
    return clientBookings;
  }, [clientBookings, bookingFilter]);

  const handleStartBooking = (service: ConsultationService) => {
    if (!userEmail) {
      if (onOpenAuthModal) {
        onOpenAuthModal();
        return;
      }
    }
    setSelectedService(service);
    setSelectedMode(service.supportedModes[0] || "VIDEO");
    setBookingStep(2);
    setViewMode("BOOKING_FLOW");
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || isSubmittingBooking) return;
    setBookingError(null);

    if (!userEmail) {
      if (onOpenAuthModal) {
        onOpenAuthModal();
        return;
      }
      setBookingError("Please sign in or register to submit an authoritative consultation booking.");
      return;
    }

    setIsSubmittingBooking(true);

    try {
      const newBooking = await createBooking({
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        category: selectedService.category,
        mode: selectedMode,
        startTime: selectedSlot.startTime,
        durationMinutes: selectedService.durationMinutes,
        timezone: selectedTimezone,
        clientName: clientForm.name.trim() || "Consultation Seeker",
        clientEmail: clientForm.email.trim(),
        clientPhone: clientForm.phone.trim() || undefined,
        clientQuestion: clientForm.specificQuestions.trim() || undefined,
        focusTopic: clientForm.focusTopic.trim() || selectedService.name,
        paymentOption: selectedPaymentOption,
        originalPrice: priceBreakdown.originalPrice || priceBreakdown.basePrice || priceBreakdown.baseAmount,
        finalPrice: priceBreakdown.finalPrice || priceBreakdown.finalAmount,
        birthDetails:
          clientForm.dob && clientForm.tob && clientForm.pob
            ? { dob: clientForm.dob, time: clientForm.tob, place: clientForm.pob }
            : undefined,
      });

      setLastCreatedBooking(newBooking);
      setBookingStep(6);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to submit booking for requested slot.";
      setBookingError(msg);
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  const getModeLabel = (mode: ConsultationMode) => {
    switch (mode) {
      case "VIDEO":
        return "Video Consultation";
      case "GOOGLE_MEET":
        return "Google Meet Room";
      case "ZOOM":
        return "Zoom Meeting";
      case "PHONE":
        return "Direct Cellular Phone Call";
      case "WHATSAPP_AUDIO":
        return "WhatsApp Voice Call";
      case "WHATSAPP_VIDEO":
        return "WhatsApp Video Call";
      case "CHAT":
        return "Real-time Astrological Chat";
      case "IN_PERSON":
        return "In-Person Sanctuary Consultation";
      default:
        return mode.replace(/_/g, " ");
    }
  };

  const getModeIcon = (mode: ConsultationMode) => {
    switch (mode) {
      case "VIDEO":
      case "GOOGLE_MEET":
      case "ZOOM":
      case "WHATSAPP_VIDEO":
        return <Video className="w-4 h-4" />;
      case "PHONE":
      case "WHATSAPP_AUDIO":
        return <Phone className="w-4 h-4" />;
      case "CHAT":
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Client Sub-Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-amber-900/10 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("BOOKING_FLOW")}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              viewMode === "BOOKING_FLOW"
                ? "bg-amber-900 text-amber-100 shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            Book Consultation
          </button>

          <button
            onClick={() => setViewMode("CATALOG")}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              viewMode === "CATALOG"
                ? "bg-amber-900 text-amber-100 shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            Consultation Catalog
          </button>

          <button
            onClick={() => setViewMode("MY_BOOKINGS")}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === "MY_BOOKINGS"
                ? "bg-amber-900 text-amber-100 shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <span>My Consultations</span>
            {clientBookings.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-mono text-[10px] flex items-center justify-center font-bold">
                {clientBookings.length}
              </span>
            )}
          </button>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Consultant: <strong>{PRIMARY_CONSULTANT.name}</strong></span>
        </div>
      </div>

      {/* VIEW 1: GUIDED BOOKING JOURNEY */}
      {viewMode === "BOOKING_FLOW" && (
        <div className="bg-white rounded-3xl border border-amber-900/10 p-6 sm:p-10 shadow-xs space-y-8">
          {/* Progress Indicator Steps */}
          {bookingStep < 6 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <button
                  type="button"
                  onClick={() => bookingStep > 1 && setBookingStep(1)}
                  disabled={bookingStep <= 1}
                  className={`transition-colors text-left ${
                    bookingStep === 1
                      ? "text-amber-900 font-bold"
                      : bookingStep > 1
                      ? "text-slate-700 hover:text-amber-900 cursor-pointer"
                      : "text-slate-400 cursor-default"
                  }`}
                >
                  1. Consultation
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                <button
                  type="button"
                  onClick={() => bookingStep > 2 && setBookingStep(2)}
                  disabled={bookingStep <= 2}
                  className={`transition-colors text-left ${
                    bookingStep === 2
                      ? "text-amber-900 font-bold"
                      : bookingStep > 2
                      ? "text-slate-700 hover:text-amber-900 cursor-pointer"
                      : "text-slate-400 cursor-default"
                  }`}
                >
                  2. Channel
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                <button
                  type="button"
                  onClick={() => bookingStep > 3 && setBookingStep(3)}
                  disabled={bookingStep <= 3}
                  className={`transition-colors text-left ${
                    bookingStep === 3
                      ? "text-amber-900 font-bold"
                      : bookingStep > 3
                      ? "text-slate-700 hover:text-amber-900 cursor-pointer"
                      : "text-slate-400 cursor-default"
                  }`}
                >
                  3. Date &amp; Slot
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                <button
                  type="button"
                  onClick={() => bookingStep > 4 && setBookingStep(4)}
                  disabled={bookingStep <= 4}
                  className={`transition-colors text-left ${
                    bookingStep === 4
                      ? "text-amber-900 font-bold"
                      : bookingStep > 4
                      ? "text-slate-700 hover:text-amber-900 cursor-pointer"
                      : "text-slate-400 cursor-default"
                  }`}
                >
                  4. Details
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                <button
                  type="button"
                  onClick={() => bookingStep > 5 && setBookingStep(5)}
                  disabled={bookingStep <= 5}
                  className={`transition-colors text-left ${
                    bookingStep === 5
                      ? "text-amber-900 font-bold"
                      : bookingStep > 5
                      ? "text-slate-700 hover:text-amber-900 cursor-pointer"
                      : "text-slate-400 cursor-default"
                  }`}
                >
                  5. Review &amp; Pay
                </button>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-800 transition-all duration-300"
                  style={{ width: `${(bookingStep / 5) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* STEP 1: CHOOSE WHAT YOU NEED HELP WITH */}
          {bookingStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Step 1: Choose Your Consultation Focus
                </h3>
                <p className="text-xs text-slate-600">
                  Select the Jyotish domain and session focus for your private consultation with {PRIMARY_CONSULTANT.name}.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {CANONICAL_CONSULTATION_SERVICES.map((srv) => (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => {
                      setSelectedService(srv);
                      setSelectedMode(srv.supportedModes[0] || "VIDEO");
                    }}
                    className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      selectedService.id === srv.id
                        ? "bg-amber-950 text-amber-100 border-amber-800 shadow-md ring-2 ring-amber-500/20"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-current/10">
                          {srv.category.replace(/_/g, " ")}
                        </span>
                        <span className="font-mono font-bold text-xs">{formatMoney(srv.price)}</span>
                      </div>
                      <div className="font-serif font-bold text-base">{srv.name}</div>
                      <p className="text-xs opacity-80 leading-relaxed line-clamp-2">{srv.description}</p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-current/10 flex items-center justify-between text-[11px] opacity-75">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{srv.durationMinutes} minutes</span>
                      </span>
                      <span>{srv.supportedModes.length} channels available</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setBookingStep(2)}
                  className="px-6 py-3 rounded-2xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-xs"
                >
                  <span>Continue to Communication Channel</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CHOOSE HOW TO CONNECT */}
          {bookingStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Step 2: Choose Communication Channel
                </h3>
                <p className="text-xs text-slate-600">
                  How would you prefer to connect with {PRIMARY_CONSULTANT.name} for your session?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedService.supportedModes.map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setSelectedMode(mode)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3.5 ${
                      selectedMode === mode
                        ? "bg-amber-950 text-amber-100 border-amber-800 shadow-sm ring-2 ring-amber-500/20"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        selectedMode === mode
                          ? "bg-amber-800 text-amber-200"
                          : "bg-white border border-slate-200 text-amber-800"
                      }`}
                    >
                      {getModeIcon(mode)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs sm:text-sm truncate">
                        {getModeLabel(mode)}
                      </div>
                      <div className="text-[11px] opacity-75 truncate">
                        Encrypted 1-on-1 consultation channel
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setBookingStep(1)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setBookingStep(3)}
                  className="px-6 py-3 rounded-2xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-xs"
                >
                  <span>Continue to Available Slots</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CHOOSE FROM AVAILABLE DATES & TIMES (STRICTLY FROM AVAILABILITY ENGINE) */}
          {bookingStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Step 3: Select Available Date &amp; Time
                </h3>
                <p className="text-xs text-slate-600">
                  Choose exclusively from verified dates and times defined by {PRIMARY_CONSULTANT.name}. Arbitrary or unconfigured times cannot be selected.
                </p>
              </div>

              {/* Timezone Selector */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <Globe className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Your Timezone:</span>
                </div>
                <select
                  value={selectedTimezone}
                  onChange={(e) => setSelectedTimezone(e.target.value)}
                  className="rounded-xl border border-slate-300 px-3 py-1.5 text-xs text-slate-900 bg-white"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST • UTC+05:30) - Consultant Primary Studio</option>
                  <option value="America/New_York">America/New_York (EST • UTC-05:00)</option>
                  <option value="America/Los_Angeles">America/Los_Angeles (PST • UTC-08:00)</option>
                  <option value="Europe/London">Europe/London (GMT • UTC+00:00)</option>
                  <option value="Asia/Dubai">Asia/Dubai (GST • UTC+04:00)</option>
                  <option value="Asia/Singapore">Asia/Singapore (SGT • UTC+08:00)</option>
                  <option value="Australia/Sydney">Australia/Sydney (AEST • UTC+10:00)</option>
                </select>
              </div>

              {/* 1. CHOOSE AVAILABLE DATE */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Available Consultation Dates *
                </label>

                {candidateDates.length === 0 ? (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                    No open consultation dates currently available within the booking window.
                  </div>
                ) : (
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {candidateDates.map((dateStr) => {
                      const dateObj = new Date(`${dateStr}T12:00:00Z`);
                      const isSelected = selectedDate === dateStr;
                      const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });
                      const monthName = dateObj.toLocaleDateString("en-US", { month: "short" });
                      const dayNum = dateObj.getUTCDate();

                      return (
                        <button
                          key={dateStr}
                          type="button"
                          onClick={() => setSelectedDate(dateStr)}
                          className={`p-3 rounded-2xl border text-center transition-all cursor-pointer min-w-[76px] ${
                            isSelected
                              ? "bg-amber-950 text-amber-100 border-amber-800 shadow-md ring-2 ring-amber-500/20"
                              : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
                          }`}
                        >
                          <div className="text-[10px] font-bold uppercase opacity-75">{dayName}</div>
                          <div className="font-serif text-lg font-bold my-0.5">{dayNum}</div>
                          <div className="text-[10px] font-medium opacity-75">{monthName}</div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 2. CHOOSE AVAILABLE TIME SLOT */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Select Available Slot for {selectedDate} ({selectedTimezone}) *
                  </label>
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-[11px] text-slate-500 mr-1">
                      {filteredAvailableSlots.length} slot(s) open
                    </span>
                    {(["ALL", "MORNING", "AFTERNOON", "EVENING"] as const).map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setSlotTimeFilter(filter)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          slotTimeFilter === filter
                            ? "bg-amber-900 text-amber-100 shadow-xs"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {filter === "ALL" ? "All" : filter.charAt(0) + filter.slice(1).toLowerCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredAvailableSlots.length === 0 ? (
                  <div className="p-6 text-center rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 space-y-1">
                    <AlertCircle className="w-5 h-5 text-amber-700 mx-auto" />
                    <p className="font-bold text-slate-700">No Slots Open in Selected Filter Window</p>
                    <p className="text-[11px]">
                      No available practitioner windows for "{slotTimeFilter}". Switch filter to "All" or pick another date above.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {filteredAvailableSlots.map((slot) => {
                      const startTimeStr = new Date(slot.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: selectedTimezone,
                      });
                      const endTimeStr = new Date(
                        calculateEndTime(slot.startTime, selectedService.durationMinutes)
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: selectedTimezone,
                      });
                      const isSelected = selectedSlot?.slotId === slot.slotId;
                      const ausp = slotAuspiciousnessMap.get(slot.slotId);

                      return (
                        <button
                          key={slot.slotId}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between gap-2 border ${
                            isSelected
                              ? "bg-amber-950 text-amber-100 border-amber-800 shadow-sm ring-2 ring-amber-500/20"
                              : "bg-white hover:bg-amber-50/50 text-slate-800 border-slate-200"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="font-mono font-bold text-xs">{startTimeStr}</span>
                              <span className="text-[10px] opacity-75 font-sans">to {endTimeStr}</span>
                            </div>
                            {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0 ml-1" />}
                          </div>

                          {/* Muhurta Quality Score Pill */}
                          {ausp && (
                            <div className="flex items-center justify-between pt-1 border-t border-slate-100/30">
                              <span
                                className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded flex items-center gap-1 ${
                                  isSelected
                                    ? "bg-amber-900 text-amber-200"
                                    : ausp.isShubh
                                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                    : "bg-slate-100 text-slate-700 border border-slate-200"
                                }`}
                              >
                                <span>{ausp.isShubh ? "⚡ Shubha" : "✨ Neutral"}</span>
                                <span className="font-mono">{ausp.score}</span>
                              </span>
                              {ausp.warning && (
                                <span className="text-[9px] text-amber-600 font-semibold truncate max-w-[80px]" title={ausp.warning}>
                                  ⚠️ {ausp.warning}
                                </span>
                              )}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Selected Slot Confirmation Bar */}
              {selectedSlot && (
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-950">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-amber-800 shrink-0" />
                    <div>
                      <span>Selected Date: <strong>{new Date(`${selectedDate}T12:00:00Z`).toLocaleDateString([], { weekday: "short", month: "short", day: "numeric", year: "numeric" })}</strong></span>
                      <span className="mx-1.5 text-amber-300">·</span>
                      <span className="font-mono font-bold">
                        {new Date(selectedSlot.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", timeZone: selectedTimezone })} – {new Date(calculateEndTime(selectedSlot.startTime, selectedService.durationMinutes)).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", timeZone: selectedTimezone })}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-amber-800 bg-amber-100/70 px-3 py-1 rounded-lg self-start sm:self-auto">
                    {slotAuspiciousnessMap.get(selectedSlot.slotId) && (
                      <span className="flex items-center gap-1 text-emerald-900 font-bold">
                        <span>⚡ Muhurta:</span>
                        <span>{slotAuspiciousnessMap.get(selectedSlot.slotId)?.tierLabel}</span>
                        <span className="font-mono">({slotAuspiciousnessMap.get(selectedSlot.slotId)?.score}/100)</span>
                        <span>·</span>
                      </span>
                    )}
                    <span>{selectedService.durationMinutes} min session</span>
                    <span>·</span>
                    <span>{selectedTimezone}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setBookingStep(2)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={!selectedSlot}
                  onClick={() => setBookingStep(4)}
                  className={`px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-xs ${
                    selectedSlot
                      ? "bg-amber-800 hover:bg-amber-900 text-white"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <span>Continue to Your Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: ENTER REQUIRED DETAILS */}
          {bookingStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Step 4: Your Details &amp; Questions
                </h3>
                <p className="text-xs text-slate-600">
                  Provide your contact details and optional birth parameters for accurate Jyotish chart calculations.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Full Name <span className="text-rose-600">* (Required)</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Sharma"
                      value={clientForm.name}
                      onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                      className="w-full rounded-2xl border border-slate-300 p-3 text-xs bg-white text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Email Address <span className="text-rose-600">* (Required)</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ananya@example.com"
                      value={clientForm.email}
                      onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                      className="w-full rounded-2xl border border-slate-300 p-3 text-xs bg-white text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={clientForm.phone}
                      onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
                      className="w-full rounded-2xl border border-slate-300 p-3 text-xs bg-white text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Date of Birth <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="date"
                      value={clientForm.dob}
                      onChange={(e) => setClientForm({ ...clientForm, dob: e.target.value })}
                      className="w-full rounded-2xl border border-slate-300 p-3 text-xs bg-white text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Time of Birth <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="time"
                      value={clientForm.tob}
                      onChange={(e) => setClientForm({ ...clientForm, tob: e.target.value })}
                      className="w-full rounded-2xl border border-slate-300 p-3 text-xs bg-white text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Place of Birth <span className="text-slate-400 font-normal">(Optional - City, State, Country)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pune, Maharashtra, India"
                    value={clientForm.pob}
                    onChange={(e) => setClientForm({ ...clientForm, pob: e.target.value })}
                    className="w-full rounded-2xl border border-slate-300 p-3 text-xs bg-white text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Specific Questions or Focus Topic <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="What specific questions or life decisions would you like Ravie Adagale to examine in your chart?"
                    value={clientForm.specificQuestions}
                    onChange={(e) => setClientForm({ ...clientForm, specificQuestions: e.target.value })}
                    className="w-full rounded-2xl border border-slate-300 p-3 text-xs bg-white text-slate-900"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setBookingStep(3)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={!clientForm.name.trim() || !clientForm.email.trim()}
                  onClick={() => setBookingStep(5)}
                  className={`px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-xs ${
                    clientForm.name.trim() && clientForm.email.trim()
                      ? "bg-amber-800 hover:bg-amber-900 text-white"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <span>Review &amp; Select Payment</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW CONSULTATION + SELECT PAYMENT OPTION */}
          {bookingStep === 5 && !selectedSlot && (
            <div className="p-8 text-center space-y-4 rounded-3xl bg-slate-50 border border-slate-200">
              <AlertCircle className="w-8 h-8 text-amber-700 mx-auto" />
              <p className="text-sm font-semibold text-slate-800">
                No consultation slot selected. Please choose an available time slot before reviewing.
              </p>
              <button
                type="button"
                onClick={() => setBookingStep(3)}
                className="px-6 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Select Appointment Slot
              </button>
            </div>
          )}

          {bookingStep === 5 && selectedSlot && (
            <form onSubmit={handleSubmitBooking} className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Step 5: Review &amp; Select Payment Option
                </h3>
                <p className="text-xs text-slate-600">
                  Review your consultation details and choose between 20% instant advance discount or payment before session start.
                </p>
              </div>

              {!userEmail && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <LogIn className="w-4 h-4 text-amber-800 shrink-0" />
                    <div>
                      <span className="font-bold block">Sign In Recommended to Confirm Slot</span>
                      <span className="text-[11px] text-slate-600">
                        Please sign in or create your account to receive consultation coordinates and video room access.
                      </span>
                    </div>
                  </div>
                  {onOpenAuthModal && (
                    <button
                      type="button"
                      onClick={onOpenAuthModal}
                      className="px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider shrink-0 cursor-pointer shadow-xs"
                    >
                      Sign In / Register
                    </button>
                  )}
                </div>
              )}

              {bookingError && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{bookingError}</span>
                </div>
              )}

              {/* Consultation Summary Card */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                      {selectedService.category.replace(/_/g, " ")}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-slate-900">
                      {selectedService.name}
                    </h4>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Consultant
                    </div>
                    <div className="font-bold text-xs text-slate-900">{PRIMARY_CONSULTANT.name}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-slate-700">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Scheduled Date &amp; Time
                    </span>
                    <span className="font-mono font-bold block text-slate-900">
                      {new Date(selectedSlot.startTime).toLocaleString([], { timeZone: selectedTimezone, weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <span className="font-mono text-[11px] text-slate-500">
                      to {new Date(calculateEndTime(selectedSlot.startTime, selectedService.durationMinutes)).toLocaleTimeString([], { timeZone: selectedTimezone, hour: "2-digit", minute: "2-digit" })} ({selectedTimezone})
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Duration &amp; Channel
                    </span>
                    <span className="font-bold text-slate-900 block">{getModeLabel(selectedMode)}</span>
                    <span className="text-[11px] text-slate-500">{selectedService.durationMinutes} minutes duration</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Client Contact
                    </span>
                    <span className="font-bold text-slate-900 block">{clientForm.name}</span>
                    <span className="block text-[11px] text-slate-500">{clientForm.email}</span>
                    {clientForm.phone && <span className="block text-[11px] text-slate-500">{clientForm.phone}</span>}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Consultant
                    </span>
                    <span className="font-bold text-slate-900 block">{PRIMARY_CONSULTANT.name}</span>
                    <span className="text-[11px] text-slate-500">Official Sanctum</span>
                  </div>
                </div>

                {/* Optional Birth Details */}
                {(clientForm.dob || clientForm.tob || clientForm.pob) && (
                  <div className="pt-2 border-t border-slate-200/60 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Jyotish Birth Parameters
                    </span>
                    <span className="font-medium text-slate-800">
                      {[
                        clientForm.dob ? `DOB: ${clientForm.dob}` : null,
                        clientForm.tob ? `TOB: ${clientForm.tob}` : null,
                        clientForm.pob ? `POB: ${clientForm.pob}` : null,
                      ].filter(Boolean).join(" | ")}
                    </span>
                  </div>
                )}

                {/* Optional Focus / Questions */}
                {(clientForm.focusTopic || clientForm.specificQuestions) && (
                  <div className="pt-2 border-t border-slate-200/60 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Consultation Focus / Inquiries
                    </span>
                    <p className="font-medium text-slate-800 italic">
                      {clientForm.focusTopic ? `${clientForm.focusTopic} - ` : ""}{clientForm.specificQuestions || clientForm.focusTopic}
                    </p>
                  </div>
                )}
              </div>

              {/* Payment Option Selection (20% Advance Discount!) */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Select Payment Option *
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option A: Pay in Full Now (20% Discount) */}
                  <div
                    onClick={() => setSelectedPaymentOption("PAY_IN_FULL_NOW")}
                    className={`p-5 rounded-2xl border text-left transition-all cursor-pointer space-y-2 relative ${
                      selectedPaymentOption === "PAY_IN_FULL_NOW"
                        ? "bg-amber-950 text-amber-100 border-amber-800 shadow-md ring-2 ring-amber-500/20"
                        : "bg-white text-slate-800 border-slate-200 hover:border-amber-400"
                    }`}
                  >
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider">
                      Save 20%
                    </span>
                    <div className="flex items-center gap-2">
                      <Percent className="w-4 h-4 text-emerald-400" />
                      <span className="font-bold text-xs uppercase tracking-wider">
                        Pay in Full at Booking
                      </span>
                    </div>
                    <div className="font-mono text-xl font-bold">
                      {formatMoney(calculateConsultationPrice(selectedService.price, "PAY_IN_FULL_NOW").finalAmount)}
                    </div>
                    <p className="text-[11px] opacity-80">
                      Standard fee {formatMoney(selectedService.price)} with 20% advance discount applied immediately.
                    </p>
                  </div>

                  {/* Option B: Pay Before Consultation Start */}
                  <div
                    onClick={() => setSelectedPaymentOption("PAY_BEFORE_SESSION")}
                    className={`p-5 rounded-2xl border text-left transition-all cursor-pointer space-y-2 ${
                      selectedPaymentOption === "PAY_BEFORE_SESSION"
                        ? "bg-amber-950 text-amber-100 border-amber-800 shadow-md ring-2 ring-amber-500/20"
                        : "bg-white text-slate-800 border-slate-200 hover:border-amber-400"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-amber-500" />
                      <span className="font-bold text-xs uppercase tracking-wider">
                        Pay Before Session Starts
                      </span>
                    </div>
                    <div className="font-mono text-xl font-bold">
                      {formatMoney(calculateConsultationPrice(selectedService.price, "PAY_BEFORE_SESSION").finalAmount)}
                    </div>
                    <p className="text-[11px] opacity-80">
                      Lock your slot now. Full honorarium due before the session commencement.
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Pricing Breakdown Summary */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-700">
                  <span>Base Consultation Honorarium:</span>
                  <span className="font-mono font-semibold">{formatMoney(priceBreakdown.basePrice)}</span>
                </div>
                {selectedPaymentOption === "PAY_IN_FULL_NOW" && (
                  <div className="flex items-center justify-between text-emerald-700 font-medium">
                    <span className="flex items-center gap-1">
                      <Percent className="w-3.5 h-3.5" />
                      <span>20% Advance Booking Discount:</span>
                    </span>
                    <span className="font-mono font-bold">- {formatMoney(priceBreakdown.discountAmount)}</span>
                  </div>
                )}
                <div className="border-t border-amber-200/80 pt-2 flex items-center justify-between font-bold text-slate-900 text-sm">
                  <span>Total Payable Amount:</span>
                  <span className="font-mono text-base text-amber-950">{formatMoney(priceBreakdown.finalAmount)}</span>
                </div>
                <p className="text-[11px] text-slate-500 pt-1">
                  Status upon submission: <span className="font-semibold text-amber-800">REQUESTED (Pending Review)</span>. 
                  Ravie Adagale personally reviews all booking inquiries before confirming the session.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setBookingStep(4)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingBooking}
                  className={`px-8 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md ${
                    isSubmittingBooking
                      ? "bg-slate-400 text-white cursor-not-allowed"
                      : "bg-amber-800 hover:bg-amber-900 text-white cursor-pointer"
                  }`}
                >
                  <span>{isSubmittingBooking ? "Reserving Slot..." : "Submit Consultation Request"}</span>
                  {isSubmittingBooking ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 6: BOOKING SUBMITTED CONFIRMATION */}
          {bookingStep === 6 && lastCreatedBooking && (
            <div className="text-center py-8 space-y-6 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border border-emerald-300">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
                  Status: REQUESTED (Pending Consultant Review)
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Consultation Request Submitted
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your appointment request has been registered and submitted to {PRIMARY_CONSULTANT.name}. You will be notified once the session is confirmed.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 text-slate-700">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Service &amp; Duration</span>
                  <span className="font-bold text-slate-900">{selectedService.name} ({selectedService.durationMinutes} mins)</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Requested Time</span>
                  <span className="font-mono font-bold">
                    {new Date(lastCreatedBooking.startTime).toLocaleString([], { timeZone: selectedTimezone })}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Communication Channel</span>
                  <span className="font-bold text-slate-900">{getModeLabel(selectedMode)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Payment Plan</span>
                  <span>{lastCreatedBooking.paymentOption === "PAY_IN_FULL_NOW" ? "Pay in Full at Booking (20% Advance Discount Applied)" : "Pay Before Session Starts"}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setViewMode("MY_BOOKINGS")}
                  className="px-6 py-3 rounded-2xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider cursor-pointer shadow-xs"
                >
                  View in My Consultations
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBookingStep(1);
                    setSelectedSlot(null);
                  }}
                  className="px-5 py-3 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Book Another Session
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: CONSULTATION CATALOG */}
      {viewMode === "CATALOG" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CANONICAL_CONSULTATION_SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-3xl border border-amber-900/10 p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-950 text-[10px] font-bold uppercase tracking-wider">
                      {service.category.replace(/_/g, " ")}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      <span>{service.durationMinutes} mins</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-amber-900 transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Honorarium
                    </div>
                    <div className="font-mono text-lg font-bold text-amber-950">
                      {formatMoney(service.price)}
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartBooking(service)}
                    className="px-4 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: MY CONSULTATIONS */}
      {viewMode === "MY_BOOKINGS" && (
        <div className="bg-white rounded-3xl border border-amber-900/10 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                My Consultations ({clientBookings.length})
              </h2>
              <p className="text-xs text-slate-500">
                Track your active appointments, confirmed video links, and astrological summaries.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 scrollbar-none">
              {(
                [
                  "ALL",
                  "UPCOMING",
                  "PENDING",
                  "CONFIRMED",
                  "IN_PROGRESS",
                  "COMPLETED",
                  "CANCELLED",
                  "RESCHEDULED",
                  "DECLINED",
                  "EXPIRED",
                  "NO_SHOW",
                ] as const
              ).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setBookingFilter(filter)}
                  className={`px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    bookingFilter === filter
                      ? "bg-amber-900 text-amber-100 shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {filter.replace(/_/g, " ")}
                </button>
              ))}
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <Sparkles className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="font-bold text-sm text-slate-700">No Consultations Found</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                You do not have any consultations under this status.
              </p>
              <button
                onClick={() => setViewMode("BOOKING_FLOW")}
                className="px-5 py-2.5 rounded-xl bg-amber-800 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Book a Consultation
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredBookings.map((b) => {
                const srvTitle = CANONICAL_CONSULTATION_SERVICES.find((s) => s.id === b.serviceId)?.name || b.serviceId.replace(/_/g, " ");
                return (
                  <div
                    key={b.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-amber-400 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{srvTitle}</span>
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            b.status === "CONFIRMED"
                              ? "bg-emerald-100 text-emerald-800"
                              : b.status === "REQUESTED"
                              ? "bg-amber-100 text-amber-800"
                              : b.status === "COMPLETED"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {b.status === "REQUESTED" ? "Requested (Pending Review)" : b.status}
                        </span>
                      </div>

                      <div className="text-xs text-slate-500 flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-amber-700" />
                          <span>{new Date(b.startTime).toLocaleString([], { timeZone: b.timezone })}</span>
                        </span>
                        <span>Channel: {getModeLabel(b.mode)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {(b.status === "CONFIRMED" || b.status === "IN_PROGRESS") && (
                        <button
                          type="button"
                          onClick={() => setSelectedLiveRoomBooking(b)}
                          className="px-3.5 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Radio className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
                          <span>Live Sanctuary</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setActiveDetailBooking(b)}
                        className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider cursor-pointer"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Detail Modal */}
      {activeDetailBooking && (
        <ConsultationDetailModal
          booking={activeDetailBooking}
          currentUserEmail={userEmail}
          currentUserName={userName}
          onClose={() => setActiveDetailBooking(null)}
          onCancelRequest={(bookingId, reason) => {
            cancelBooking(bookingId, "CLIENT", reason);
            setActiveDetailBooking(null);
          }}
          onRescheduleRequest={(bookingId, newStartTime, reason) => {
            rescheduleBooking(bookingId, newStartTime, reason);
            setActiveDetailBooking(null);
          }}
        />
      )}

      {/* Interactive Live Sanctuary Room Modal */}
      {selectedLiveRoomBooking && (
        <LiveConsultationRoomModal
          booking={selectedLiveRoomBooking}
          currentUserEmail={userEmail}
          currentUserName={userName}
          onClose={() => setSelectedLiveRoomBooking(null)}
        />
      )}
    </div>
  );
};
