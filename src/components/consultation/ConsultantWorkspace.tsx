import React, { useState, useMemo, useEffect } from "react";
import {
  PRIMARY_CONSULTANT,
  PRIMARY_CONSULTANT_PROFILE,
  CURRENT_CONSULTANT_EMAIL,
} from "../../domain/consultation/operatorConfig";
import {
  CANONICAL_CONSULTATION_SERVICES,
  CANONICAL_QUICK_SERVICES,
} from "../../domain/consultation/defaultServices";
import { formatMoney } from "../../domain/consultation/money";
import { canAccessConsultantWorkspace } from "../../domain/consultation/authorization";
import { ProfilePhotoUploader } from "./ProfilePhotoUploader";
import { LiveConsultationRoomModal } from "./LiveConsultationRoomModal";
import { firestoreQuickQuestionAdapter } from "../../domain/consultation/firestoreQuickQuestionAdapter";
import { ConsultationBooking, QuickConsultationInquiry } from "../../domain/consultation/types";
import { useConsultation } from "../../context/ConsultationContext";
import { DAYS_OF_WEEK } from "../../domain/consultation/canonicalAvailability";
import { generateCandidateSlots } from "../../domain/consultation/availabilityEngine";
import {
  Calendar as CalendarIcon,
  Clock,
  ShieldCheck,
  Lock,
  Layers,
  FileText,
  AlertCircle,
  Sparkles,
  Info,
  CheckCircle2,
  Settings,
  User,
  Users,
  Inbox,
  CheckSquare,
  HelpCircle,
  Video,
  Phone,
  MessageSquare,
  Globe,
  Plus,
  Trash2,
  RotateCcw,
  Eye,
  EyeOff,
  BookmarkCheck,
  ChevronRight,
  ExternalLink,
  Ban,
  CalendarCheck,
  CalendarX,
  Coffee,
  Radio,
  Zap,
  Send,
} from "lucide-react";

interface ConsultantWorkspaceProps {
  userEmail?: string | null;
  onOpenAuthModal?: () => void;
}

type ConsultantTab =
  | "OVERVIEW"
  | "PROFILE"
  | "SERVICES"
  | "AVAILABILITY"
  | "CALENDAR"
  | "REQUESTS"
  | "UPCOMING"
  | "COMPLETED"
  | "CLIENTS"
  | "NOTES"
  | "FOLLOW_UPS"
  | "QUICK_QUESTIONS";

export const ConsultantWorkspace: React.FC<ConsultantWorkspaceProps> = ({
  userEmail,
  onOpenAuthModal,
}) => {
  const [activeTab, setActiveTab] = useState<ConsultantTab>("OVERVIEW");

  const {
    availability,
    updateWeeklyHours,
    addTimeRange,
    removeTimeRange,
    addBreak,
    removeBreak,
    setBufferMinutes,
    addException,
    removeException,
    resetAvailabilityToDefault,
    bookings,
    confirmBooking,
    declineBooking,
    startSession,
    completeSession,
    saveConsultationNotes,
    getPrivateNotes,
    getClientSummary,
    persistenceInfo,
  } = useConsultation();

  // Availability state
  const [newRangeDay, setNewRangeDay] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6>(1);
  const [newRangeStart, setNewRangeStart] = useState("09:30");
  const [newRangeEnd, setNewRangeEnd] = useState("13:30");
  const [newBreakStart, setNewBreakStart] = useState("13:30");
  const [newBreakEnd, setNewBreakEnd] = useState("14:30");
  const [blockedDateInput, setBlockedDateInput] = useState("");
  const [blockedReasonInput, setBlockedReasonInput] = useState("");
  const [availabilityFeedback, setAvailabilityFeedback] = useState<string | null>(null);

  // Calendar Day inspector state
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });

  // Notes tab state
  const [selectedBookingForNotes, setSelectedBookingForNotes] = useState<string>("");
  const [privateNotesText, setPrivateNotesText] = useState("");
  const [clientSummaryText, setClientSummaryText] = useState("");
  const [remediesList, setRemediesList] = useState<string[]>([]);
  const [notesFeedback, setNotesFeedback] = useState<string | null>(null);

  // Live Consultation Room state
  const [selectedRoomBooking, setSelectedRoomBooking] = useState<ConsultationBooking | null>(null);

  // Quick Questions state
  const [quickInquiries, setQuickInquiries] = useState<QuickConsultationInquiry[]>([]);
  const [draftAnswers, setDraftAnswers] = useState<Record<string, string>>({});
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState<Record<string, boolean>>({});
  const [answerFeedback, setAnswerFeedback] = useState<Record<string, string>>({});

  useEffect(() => {
    firestoreQuickQuestionAdapter.listAllInquiries(userEmail).then((res) => {
      setQuickInquiries(res);
    });
  }, [userEmail, activeTab]);

  const handleAnswerInquiry = async (inquiryId: string) => {
    const text = draftAnswers[inquiryId]?.trim();
    if (!text) return;
    setIsSubmittingAnswer((prev) => ({ ...prev, [inquiryId]: true }));
    try {
      await firestoreQuickQuestionAdapter.answerInquiry(inquiryId, text);
      setQuickInquiries((prev) =>
        prev.map((item) =>
          item.id === inquiryId
            ? { ...item, answer: text, answeredAt: new Date().toISOString(), status: "ANSWERED" }
            : item
        )
      );
      setAnswerFeedback((prev) => ({ ...prev, [inquiryId]: "Astrological counsel submitted successfully!" }));
      setTimeout(() => {
        setAnswerFeedback((prev) => {
          const c = { ...prev };
          delete c[inquiryId];
          return c;
        });
      }, 3500);
    } catch (err) {
      console.warn("Error answering inquiry:", err);
    } finally {
      setIsSubmittingAnswer((prev) => ({ ...prev, [inquiryId]: false }));
    }
  };

  // Filtered booking groups
  const pendingRequests = useMemo(
    () => bookings.filter((b) => b.status === "REQUESTED" || b.status === "PENDING_CONFIRMATION"),
    [bookings]
  );
  const upcomingSessions = useMemo(
    () => bookings.filter((b) => b.status === "CONFIRMED" || b.status === "IN_PROGRESS"),
    [bookings]
  );
  const completedSessions = useMemo(
    () => bookings.filter((b) => b.status === "COMPLETED"),
    [bookings]
  );

  // Client Directory
  const clientsDirectory = useMemo(() => {
    const map = new Map<string, { name: string; email: string; phone?: string; count: number; topics: string[] }>();
    for (const b of bookings) {
      const existing = map.get(b.clientEmail) || {
        name: b.clientName,
        email: b.clientEmail,
        phone: undefined,
        count: 0,
        topics: [],
      };
      existing.count += 1;
      if (b.clientQuestion && !existing.topics.includes(b.clientQuestion)) {
        existing.topics.push(b.clientQuestion);
      }
      map.set(b.clientEmail, existing);
    }
    return Array.from(map.values());
  }, [bookings]);

  // Calendar slots generated for the selected calendar date
  const calendarDaySlots = useMemo(() => {
    return generateCandidateSlots({
      availability,
      serviceDurationMinutes: 60,
      bufferMinutes: availability.rules[0]?.bufferMinutes || 15,
      bookingDate: selectedCalendarDate,
      clientTimezone: availability.timezone,
      existingBookings: bookings,
      referenceNow: "2026-01-01T00:00:00Z", // Allow past viewing in calendar
    });
  }, [availability, selectedCalendarDate, bookings]);

  // Check role authorization
  const isAuthorized = canAccessConsultantWorkspace(userEmail);

  if (!isAuthorized) {
    return (
      <div className="bg-white rounded-3xl border border-amber-900/10 p-8 sm:p-12 shadow-sm text-center max-w-2xl mx-auto space-y-6">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-100 flex items-center justify-center text-amber-800 border border-amber-300">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-2xl font-bold text-slate-900">
            Consultant &amp; Operator Access Restricted
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
            The Consultant Workspace is reserved exclusively for the Dev-Guru chief consultation operator (
            <code className="font-mono text-amber-800">{CURRENT_CONSULTANT_EMAIL}</code>) and authorized administrators.
          </p>
          {userEmail && (
            <div className="text-[11px] text-slate-500 pt-1">
              Currently signed in as: <span className="font-semibold text-slate-800">{userEmail}</span>
            </div>
          )}
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-900/10 text-left text-xs text-slate-700 space-y-1">
          <div className="font-bold text-amber-950 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Strict Role &amp; Access Control Architecture</span>
          </div>
          <p className="text-[11px] text-slate-600">
            Dev-Guru enforces strict operator verification. Client users cannot access scheduling controls, private notes, or internal booking management.
          </p>
        </div>

        {onOpenAuthModal && (
          <button
            onClick={onOpenAuthModal}
            className="px-6 py-3 rounded-2xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
          >
            Sign In with Authorized Operator Account
          </button>
        )}
      </div>
    );
  }

  // Active weekly hours rule
  const weeklyRule = availability.rules[0];

  const handleAddTimeRange = (dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6) => {
    addTimeRange(dayOfWeek, { start: newRangeStart, end: newRangeEnd });
    setAvailabilityFeedback(`Added working window (${newRangeStart}–${newRangeEnd}) for ${DAYS_OF_WEEK[dayOfWeek]}.`);
    setTimeout(() => setAvailabilityFeedback(null), 3500);
  };

  const handleAddBreak = (dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6) => {
    addBreak(dayOfWeek, { start: newBreakStart, end: newBreakEnd });
    setAvailabilityFeedback(`Added break (${newBreakStart}–${newBreakEnd}) for ${DAYS_OF_WEEK[dayOfWeek]}.`);
    setTimeout(() => setAvailabilityFeedback(null), 3500);
  };

  const handleAddBlockedDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockedDateInput) return;
    addException({
      date: blockedDateInput,
      type: "BLOCKED_DAY",
      reason: blockedReasonInput || "Unavailable / Blocked Time",
    });
    setAvailabilityFeedback(`Blocked date ${blockedDateInput} added.`);
    setBlockedDateInput("");
    setBlockedReasonInput("");
    setTimeout(() => setAvailabilityFeedback(null), 3500);
  };

  const handleSelectBookingForNotes = (bookingId: string) => {
    setSelectedBookingForNotes(bookingId);
    setPrivateNotesText(getPrivateNotes(bookingId));
    const summaryData = getClientSummary(bookingId);
    setClientSummaryText(summaryData?.summary || "");
    setRemediesList(summaryData ? [...summaryData.remedies] : []);
  };

  const handleSaveNotes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingForNotes) return;
    saveConsultationNotes(
      selectedBookingForNotes,
      privateNotesText,
      clientSummaryText,
      remediesList
    );
    setNotesFeedback("Consultation notes formulated and securely saved.");
    setTimeout(() => setNotesFeedback(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Operational Bar */}
      <div className="bg-slate-900 text-amber-50 rounded-3xl p-5 sm:p-6 border border-amber-700/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] uppercase tracking-wider border border-emerald-500/30">
              Verified Operator
            </span>
            <span className="text-xs text-amber-300/80 font-mono">
              {availability.timezone}
            </span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-white tracking-tight">
            Consultant Operational Workspace
          </h1>
          <p className="text-xs text-amber-100/70">
            Scheduling, availability controls, and session management for {PRIMARY_CONSULTANT.name}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-white">{PRIMARY_CONSULTANT.name}</div>
            <div className="text-[11px] text-amber-300/70">{CURRENT_CONSULTANT_EMAIL}</div>
          </div>
          <img
            src="/assets/images/ravie_adagale_profile.png"
            alt={PRIMARY_CONSULTANT.name}
            className="w-11 h-11 rounded-2xl object-cover border border-amber-500/40 ring-2 ring-amber-500/20"
          />
        </div>
      </div>

      {/* Primary Operator Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs scrollbar-none text-xs">
        {[
          { id: "OVERVIEW", label: "Overview", icon: Layers },
          { id: "AVAILABILITY", label: "Availability", icon: Clock },
          { id: "CALENDAR", label: "Calendar", icon: CalendarIcon },
          { id: "REQUESTS", label: `Requests (${pendingRequests.length})`, icon: Inbox },
          { id: "UPCOMING", label: `Upcoming (${upcomingSessions.length})`, icon: Sparkles },
          { id: "QUICK_QUESTIONS", label: `Quick Inquiries (${quickInquiries.filter(q => q.status !== "ANSWERED").length})`, icon: Zap },
          { id: "COMPLETED", label: "Completed", icon: CheckSquare },
          { id: "SERVICES", label: "Services", icon: Settings },
          { id: "PROFILE", label: "Profile", icon: User },
          { id: "CLIENTS", label: "Clients", icon: Users },
          { id: "NOTES", label: "Private Notes", icon: FileText },
          { id: "FOLLOW_UPS", label: "Follow-ups", icon: BookmarkCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ConsultantTab)}
              className={`px-3.5 py-2 rounded-xl font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? "bg-amber-900 text-amber-100 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeTab === "OVERVIEW" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Pending Requests
              </div>
              <div className="font-mono text-2xl font-bold text-amber-950">
                {pendingRequests.length}
              </div>
              <div className="text-[11px] text-slate-500">Awaiting your confirmation</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Upcoming Sessions
              </div>
              <div className="font-mono text-2xl font-bold text-emerald-900">
                {upcomingSessions.length}
              </div>
              <div className="text-[11px] text-slate-500">Confirmed &amp; scheduled</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Completed Sessions
              </div>
              <div className="font-mono text-2xl font-bold text-slate-800">
                {completedSessions.length}
              </div>
              <div className="text-[11px] text-slate-500">Consultations archived</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Consultant Status
              </div>
              <div className="font-bold text-sm text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified &bull; ACTIVE</span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                {availability.timezone}
              </div>
            </div>
          </div>

          {/* Quick Notice Banner on Persistence Architecture */}
          <div className="p-5 rounded-3xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-2">
            <div className="font-bold text-sm flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-800" />
              <span>Consultation Availability &amp; State Architecture</span>
            </div>
            <p className="text-xs text-amber-900/90 leading-relaxed max-w-3xl">
              {persistenceInfo.notice}
            </p>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              onClick={() => setActiveTab("AVAILABILITY")}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 transition-all cursor-pointer space-y-2 group shadow-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-900">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-sm text-slate-900 group-hover:text-amber-900">
                Define Working Hours
              </h3>
              <p className="text-xs text-slate-500">
                Configure weekly availability windows, daily breaks, buffers, and blocked dates.
              </p>
            </div>

            <div
              onClick={() => setActiveTab("REQUESTS")}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 transition-all cursor-pointer space-y-2 group shadow-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-900">
                <Inbox className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-sm text-slate-900 group-hover:text-amber-900">
                Review Incoming Requests
              </h3>
              <p className="text-xs text-slate-500">
                Accept, decline, or propose reschedules using the booking state machine.
              </p>
            </div>

            <div
              onClick={() => setActiveTab("CALENDAR")}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 transition-all cursor-pointer space-y-2 group shadow-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-900">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-sm text-slate-900 group-hover:text-amber-900">
                Session Calendar
              </h3>
              <p className="text-xs text-slate-500">
                View day-by-day availability, booked slots, and pending consultations.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. AVAILABILITY TAB — CONSULTANT DEFINES AVAILABILITY */}
      {activeTab === "AVAILABILITY" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Consultant Availability Management
              </h2>
              <p className="text-xs text-slate-500">
                Define your weekly consultation hours, multi-window shifts, scheduled breaks, and blocked closure dates.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                resetAvailabilityToDefault();
                setAvailabilityFeedback("Availability reset to canonical operator defaults.");
                setTimeout(() => setAvailabilityFeedback(null), 3000);
              }}
              className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer self-start sm:self-center"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset to Defaults</span>
            </button>
          </div>

          {availabilityFeedback && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{availabilityFeedback}</span>
            </div>
          )}

          {/* Buffer Minutes Configuration */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-amber-950 uppercase tracking-wider text-[11px]">
                Post-Consultation Buffer Window
              </span>
              <p className="text-slate-600 text-[11px]">
                Configured buffer enforced between appointments to prevent back-to-back overlaps.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={weeklyRule?.bufferMinutes ?? 15}
                onChange={(e) => {
                  setBufferMinutes(Number(e.target.value));
                  setAvailabilityFeedback(`Buffer set to ${e.target.value} minutes.`);
                  setTimeout(() => setAvailabilityFeedback(null), 3000);
                }}
                className="rounded-xl border border-slate-300 px-3 py-1.5 bg-white text-xs font-bold text-slate-900"
              >
                <option value={10}>10 minutes buffer</option>
                <option value={15}>15 minutes buffer (Canonical)</option>
                <option value={20}>20 minutes buffer</option>
                <option value={30}>30 minutes buffer</option>
              </select>
            </div>
          </div>

          {/* Weekly Days Schedule */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Weekly Operating Schedule
            </h3>

            <div className="space-y-4">
              {DAYS_OF_WEEK.map((dayName, dayIndex) => {
                const daySchedule = weeklyRule?.weeklyHours.find((h) => h.dayOfWeek === dayIndex) || {
                  dayOfWeek: dayIndex as 0 | 1 | 2 | 3 | 4 | 5 | 6,
                  isEnabled: false,
                  timeRanges: [],
                  breaks: [],
                };

                return (
                  <div
                    key={dayName}
                    className={`p-5 rounded-2xl border transition-all ${
                      daySchedule.isEnabled
                        ? "bg-slate-50/60 border-slate-200"
                        : "bg-slate-100/40 border-slate-200/60 opacity-80"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 pb-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-3 h-3 rounded-full shrink-0 ${
                            daySchedule.isEnabled ? "bg-emerald-500" : "bg-slate-300"
                          }`}
                        />
                        <span className="font-bold text-sm text-slate-900 w-28">{dayName}</span>
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            daySchedule.isEnabled
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {daySchedule.isEnabled ? "Available" : "Unavailable / Closed"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (daySchedule.isEnabled) {
                              updateWeeklyHours(daySchedule.dayOfWeek, false, [], []);
                            } else {
                              updateWeeklyHours(
                                daySchedule.dayOfWeek,
                                true,
                                [{ start: "09:30", end: "13:30" }, { start: "15:00", end: "19:00" }],
                                [{ start: "13:30", end: "15:00" }]
                              );
                            }
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            daySchedule.isEnabled
                              ? "bg-rose-100 hover:bg-rose-200 text-rose-800"
                              : "bg-emerald-700 hover:bg-emerald-800 text-white"
                          }`}
                        >
                          {daySchedule.isEnabled ? "Set as Closed" : "Open for Bookings"}
                        </button>
                      </div>
                    </div>

                    {/* Windows & Breaks inside this Day */}
                    {daySchedule.isEnabled && (
                      <div className="pt-3 space-y-3">
                        {/* Windows */}
                        <div className="space-y-1.5">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                            Consultation Windows (Multiple allowed)
                          </div>
                          {daySchedule.timeRanges.length === 0 ? (
                            <div className="text-xs text-amber-800 italic">
                              No working window defined for this day.
                            </div>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {daySchedule.timeRanges.map((range, rIdx) => (
                                <div
                                  key={rIdx}
                                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-mono font-bold text-slate-800 shadow-2xs"
                                >
                                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                                  <span>{range.start} &ndash; {range.end}</span>
                                  <button
                                    type="button"
                                    onClick={() => removeTimeRange(daySchedule.dayOfWeek, rIdx)}
                                    title="Remove this window"
                                    className="text-slate-400 hover:text-rose-600 cursor-pointer ml-1"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Breaks */}
                        <div className="space-y-1.5 pt-1">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                            <Coffee className="w-3.5 h-3.5 text-amber-700" />
                            <span>Scheduled Breaks (No client slots generated during breaks)</span>
                          </div>
                          {(daySchedule.breaks || []).length === 0 ? (
                            <div className="text-xs text-slate-400 italic">No scheduled breaks.</div>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {(daySchedule.breaks || []).map((brk, bIdx) => (
                                <div
                                  key={bIdx}
                                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-mono font-bold text-amber-950 shadow-2xs"
                                >
                                  <span>Break: {brk.start} &ndash; {brk.end}</span>
                                  <button
                                    type="button"
                                    onClick={() => removeBreak(daySchedule.dayOfWeek, bIdx)}
                                    title="Remove this break"
                                    className="text-amber-600 hover:text-rose-600 cursor-pointer ml-1"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Quick Window / Break Adders */}
                        <div className="pt-2 flex flex-wrap items-center gap-3 border-t border-slate-200/40 text-xs">
                          <button
                            type="button"
                            onClick={() => {
                              handleAddTimeRange(daySchedule.dayOfWeek);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-amber-400 text-slate-700 font-medium cursor-pointer flex items-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5 text-amber-700" />
                            <span>Add Window ({newRangeStart}–{newRangeEnd})</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              handleAddBreak(daySchedule.dayOfWeek);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-amber-400 text-slate-700 font-medium cursor-pointer flex items-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5 text-amber-700" />
                            <span>Add Break ({newBreakStart}–{newBreakEnd})</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Blocked Dates / Exceptions Section */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                <Ban className="w-5 h-5 text-rose-600" />
                <span>Blocked Dates &amp; Special Closures</span>
              </h3>
              <p className="text-xs text-slate-500">
                Mark specific dates (e.g. sacred festival, holiday, personal absence) as completely unavailable for client bookings.
              </p>
            </div>

            <form onSubmit={handleAddBlockedDate} className="flex flex-wrap items-end gap-3 pt-2">
              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                  Select Date *
                </label>
                <input
                  type="date"
                  required
                  value={blockedDateInput}
                  onChange={(e) => setBlockedDateInput(e.target.value)}
                  className="rounded-xl border border-slate-300 px-3 py-2 text-xs bg-white text-slate-900"
                />
              </div>

              <div className="space-y-1 flex-1 min-w-[200px]">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                  Reason / Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sacred Puja, Lunar Eclipse Observance, Personal Retreat"
                  value={blockedReasonInput}
                  onChange={(e) => setBlockedReasonInput(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs bg-white text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Block Date
              </button>
            </form>

            {/* List of active blocked dates */}
            <div className="space-y-2 pt-2">
              {availability.exceptions.length === 0 ? (
                <div className="text-xs text-slate-500 italic">No blocked dates currently recorded.</div>
              ) : (
                availability.exceptions.map((exc) => (
                  <div
                    key={exc.id}
                    className="p-3 rounded-xl bg-white border border-rose-200 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-rose-900">{exc.date}</span>
                      <span className="text-slate-600">{exc.reason || "Blocked Day"}</span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                        {exc.type}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeException(exc.id)}
                      className="text-slate-400 hover:text-rose-600 cursor-pointer p-1"
                      title="Remove blocked date"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. CALENDAR TAB — OPERATIONAL CALENDAR */}
      {activeTab === "CALENDAR" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Operational Session Calendar
              </h2>
              <p className="text-xs text-slate-500">
                Inspect generated slots, confirmed bookings, pending requests, and blocked periods.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-700">Date:</label>
              <input
                type="date"
                value={selectedCalendarDate}
                onChange={(e) => setSelectedCalendarDate(e.target.value)}
                className="rounded-xl border border-slate-300 px-3 py-1.5 text-xs text-slate-900 bg-white"
              />
            </div>
          </div>

          {/* Calendar Status Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="font-semibold text-slate-700">AVAILABLE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="font-semibold text-slate-700">BOOKED / CONFIRMED</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="font-semibold text-slate-700">PENDING REQUEST</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="font-semibold text-slate-700">BLOCKED / UNAVAILABLE</span>
            </div>
          </div>

          {/* Slot Breakdown for selected day */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Generated Timeline for {selectedCalendarDate} ({availability.timezone})
            </div>

            {calendarDaySlots.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <CalendarX className="w-8 h-8 text-slate-400 mx-auto" />
                <h4 className="font-bold text-sm text-slate-700">
                  No Operating Slots for {selectedCalendarDate}
                </h4>
                <p className="text-xs text-slate-500">
                  This date is marked unavailable or closed in your weekly availability schedule.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {calendarDaySlots.map((slot) => {
                  const startTimeStr = new Date(slot.startTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: availability.timezone,
                  });
                  const endTimeStr = new Date(slot.endTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: availability.timezone,
                  });

                  // Check if booked by any booking
                  const matchingBooking = bookings.find((b) => {
                    const bStart = new Date(b.startTime).getTime();
                    const sStart = new Date(slot.startTime).getTime();
                    return Math.abs(bStart - sStart) < 60000;
                  });

                  return (
                    <div
                      key={slot.slotId}
                      className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                        matchingBooking?.status === "CONFIRMED"
                          ? "bg-blue-50 border-blue-200"
                          : matchingBooking?.status === "REQUESTED"
                          ? "bg-amber-50 border-amber-200"
                          : slot.isAvailable
                          ? "bg-white border-emerald-200"
                          : "bg-slate-50 border-slate-200 opacity-60"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-slate-900">
                          {startTimeStr} &ndash; {endTimeStr}
                        </span>
                        <span
                          className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            matchingBooking?.status === "CONFIRMED"
                              ? "bg-blue-200 text-blue-900"
                              : matchingBooking?.status === "REQUESTED"
                              ? "bg-amber-200 text-amber-900"
                              : slot.isAvailable
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {matchingBooking?.status === "CONFIRMED"
                            ? "BOOKED"
                            : matchingBooking?.status === "REQUESTED"
                            ? "PENDING"
                            : slot.isAvailable
                            ? "AVAILABLE"
                            : "UNAVAILABLE"}
                        </span>
                      </div>

                      {matchingBooking && (
                        <div className="text-slate-700 text-[11px] pt-1 border-t border-slate-200/40">
                          Client: <strong>{matchingBooking.clientName}</strong> ({matchingBooking.mode})
                        </div>
                      )}

                      {!matchingBooking && !slot.isAvailable && slot.unavailableReason && (
                        <div className="text-[10px] text-slate-500 italic">
                          {slot.unavailableReason}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. REQUESTS TAB — CONSULTANT REVIEWS & ACCEPTS/DECLINES */}
      {activeTab === "REQUESTS" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Incoming Consultation Requests ({pendingRequests.length})
            </h2>
            <p className="text-xs text-slate-500">
              Review and act upon requested client bookings according to the existing state machine.
            </p>
          </div>

          {pendingRequests.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <Inbox className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="font-bold text-sm text-slate-700">No Pending Requests</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Client booking requests will appear here immediately upon submission for review and confirmation.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-5 rounded-2xl border border-amber-200 bg-amber-50/40 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/50 pb-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900">
                        {req.serviceId.replace(/_/g, " ")}
                      </span>
                      <h3 className="font-bold text-sm text-slate-900">
                        {req.clientName} &bull; <span className="font-normal text-slate-600">{req.clientEmail}</span>
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-amber-200 text-amber-900">
                        {req.status}
                      </span>
                      <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-slate-200 text-slate-700">
                        Payment: {req.paymentStatus}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-700">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Session Time</span>
                      <span className="font-mono font-bold">
                        {new Date(req.startTime).toLocaleString([], { timeZone: req.timezone })}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Channel</span>
                      <span className="font-bold">{req.mode}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Payment Option</span>
                      <span>{req.paymentOption === "PAY_IN_FULL_NOW" ? "20% Paid in Full" : "Pay before session"}</span>
                    </div>
                  </div>

                  {req.clientQuestion && (
                    <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Focus Topic</span>
                      {req.clientQuestion}
                    </div>
                  )}

                  {req.clientNotes && (
                    <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Birth Parameters</span>
                      {req.clientNotes}
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const reason = window.prompt("Reason for declining this request:");
                        if (reason !== null) {
                          declineBooking(req.id, PRIMARY_CONSULTANT.email, reason || "Unavailable at requested window");
                        }
                      }}
                      className="px-4 py-2 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 font-bold text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Decline Request
                    </button>

                    <button
                      type="button"
                      onClick={() => confirmBooking(req.id, PRIMARY_CONSULTANT.email)}
                      className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm &amp; Accept</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 5. UPCOMING TAB */}
      {activeTab === "UPCOMING" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Upcoming Confirmed Sessions ({upcomingSessions.length})
            </h2>
            <p className="text-xs text-slate-500">
              Accepted client consultations ready to be conducted.
            </p>
          </div>

          {upcomingSessions.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <Sparkles className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="font-bold text-sm text-slate-700">No Confirmed Sessions Scheduled</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Accepted client consultations ready to be conducted will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                        {session.serviceId.replace(/_/g, " ")}
                      </span>
                      <h3 className="font-serif font-bold text-base text-slate-900">
                        {session.clientName}
                      </h3>
                      <div className="text-xs text-slate-500">{session.clientEmail}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                          session.status === "IN_PROGRESS"
                            ? "bg-amber-100 text-amber-900 animate-pulse"
                            : "bg-emerald-100 text-emerald-900"
                        }`}
                      >
                        {session.status}
                      </span>
                      <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        {session.mode}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Scheduled Time</span>
                      <span className="font-mono font-bold">
                        {new Date(session.startTime).toLocaleString([], { timeZone: session.timezone })}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Payment Status</span>
                      <span className="font-bold">{session.paymentStatus}</span>
                    </div>
                  </div>

                  {session.clientQuestion && (
                    <div className="text-xs bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-700">
                      <span className="font-bold text-[10px] uppercase text-slate-400 block">Question</span>
                      {session.clientQuestion}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedRoomBooking(session)}
                      className="px-4 py-2 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-bold text-xs uppercase tracking-wider cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      <span>Enter Live Room</span>
                    </button>

                    {session.status !== "IN_PROGRESS" && (
                      <button
                        type="button"
                        onClick={() => startSession(session.id, PRIMARY_CONSULTANT.email)}
                        className="px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
                      >
                        Start Consultation
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        handleSelectBookingForNotes(session.id);
                        setActiveTab("NOTES");
                      }}
                      className="px-4 py-2 rounded-xl border border-amber-900/20 text-amber-900 hover:bg-amber-50 font-bold text-xs uppercase tracking-wider cursor-pointer flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Formulate Notes</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => completeSession(session.id, PRIMARY_CONSULTANT.email)}
                      className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider cursor-pointer flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Completed</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 6. COMPLETED TAB */}
      {activeTab === "COMPLETED" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Completed Consultations Archive ({completedSessions.length})
            </h2>
            <p className="text-xs text-slate-500">
              Archive of conducted astrological sessions with client summary and recorded remedies.
            </p>
          </div>

          {completedSessions.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <CheckSquare className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="font-bold text-sm text-slate-700">Archive Currently Empty</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Completed consultations will be cataloged here with shastric counsel and remedies.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {completedSessions.map((session) => {
                const summaryData = getClientSummary(session.id);
                return (
                  <div key={session.id} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                          Completed Session
                        </span>
                        <h3 className="font-bold text-sm text-slate-900">
                          {session.clientName} &bull; {session.clientEmail}
                        </h3>
                      </div>
                      <span className="font-mono text-xs text-slate-500">
                        {new Date(session.startTime).toLocaleDateString()}
                      </span>
                    </div>

                    {summaryData?.summary && (
                      <div className="text-xs bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-700 space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Client Summary
                        </div>
                        <div>{summaryData.summary}</div>
                      </div>
                    )}

                    {summaryData && summaryData.remedies.length > 0 && (
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Prescribed Remedies
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {summaryData.remedies.map((rem, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900"
                            >
                              &bull; {rem}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 7. SERVICES TAB */}
      {activeTab === "SERVICES" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Consultation Services Configuration
            </h2>
            <p className="text-xs text-slate-500">
              Canonical scheduled consultations and quick question offerings configured for {PRIMARY_CONSULTANT.name}.
            </p>
          </div>

          <div className="space-y-3">
            {CANONICAL_CONSULTATION_SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{srv.name}</span>
                    <span className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold">
                      {srv.category.replace(/_/g, " ")}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Duration: {srv.durationMinutes}m &bull; Buffer: {srv.bufferMinutes}m &bull; Channels: {srv.supportedModes.join(", ")}
                  </div>
                </div>
                <div className="font-mono text-sm font-bold text-amber-950">
                  {formatMoney(srv.price)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. PROFILE TAB */}
      {activeTab === "PROFILE" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-8">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Consultant Profile &amp; Photo Management
            </h2>
            <p className="text-xs text-slate-500">
              Official identity and canonical disciplines for {PRIMARY_CONSULTANT.name}.
            </p>
          </div>

          {/* Profile Photo Uploader Component */}
          <ProfilePhotoUploader
            consultantName={PRIMARY_CONSULTANT.name}
            currentPhotoUrl={PRIMARY_CONSULTANT_PROFILE.avatarUrl}
          />

          <div className="space-y-4 pt-4 border-t border-slate-100 text-xs text-slate-700">
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Official Consultant Name
              </span>
              <div className="font-bold text-sm text-slate-900">{PRIMARY_CONSULTANT.name}</div>
            </div>

            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Primary Expertise Focus
              </span>
              <div className="font-bold text-amber-900">{PRIMARY_CONSULTANT_PROFILE.mainExpertise}</div>
            </div>

            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Areas of Expertise ({PRIMARY_CONSULTANT_PROFILE.areasOfExpertise.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRIMARY_CONSULTANT_PROFILE.areasOfExpertise.map((area) => (
                  <span
                    key={area}
                    className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-950 font-medium"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Official Bio & Philosophy
              </span>
              <p className="text-slate-800 font-medium leading-relaxed mt-0.5">
                {PRIMARY_CONSULTANT_PROFILE.bio}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 9. CLIENTS DIRECTORY */}
      {activeTab === "CLIENTS" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Clients Directory ({clientsDirectory.length})
            </h2>
            <p className="text-xs text-slate-500">
              Directory of clients who have submitted consultation bookings.
            </p>
          </div>

          {clientsDirectory.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <Users className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="font-bold text-sm text-slate-700">No Clients Registered</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Clients who request consultations will be indexed here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {clientsDirectory.map((c) => (
                <div key={c.email} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{c.name}</span>
                    <span className="font-mono text-slate-500">{c.count} session(s)</span>
                  </div>
                  <div className="text-slate-600">{c.email}</div>
                  {c.topics.length > 0 && (
                    <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 line-clamp-2">
                      Topic: {c.topics[0]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 10. PRIVATE NOTES TAB (STRICT ISOLATION OF PRIVATE NOTES) */}
      {activeTab === "NOTES" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Private Consultant Notes &amp; Outcome Formulator
            </h2>
            <p className="text-xs text-slate-500">
              Strict Shastric governance: Private notes are confidential and NEVER exposed to clients. Outcome summaries and remedies are client-visible.
            </p>
          </div>

          {/* Booking Selector */}
          <div className="space-y-1 max-w-md">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Select Booking to Formulate Counsel *
            </label>
            <select
              value={selectedBookingForNotes}
              onChange={(e) => handleSelectBookingForNotes(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 bg-white"
            >
              <option value="">-- Choose a consultation session --</option>
              {bookings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.clientName} &bull; {b.serviceId} &bull; {new Date(b.startTime).toLocaleDateString()} ({b.status})
                </option>
              ))}
            </select>
          </div>

          {selectedBookingForNotes ? (
            <form onSubmit={handleSaveNotes} className="space-y-6 pt-2">
              {notesFeedback && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{notesFeedback}</span>
                </div>
              )}

              {/* Section A: Private Consultant Notes (Confidential) */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-300/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-950 uppercase tracking-wider">
                  <EyeOff className="w-4 h-4 text-amber-800" />
                  <span>Private Consultant Notes (Confidential &bull; Astrologer Only)</span>
                </div>
                <p className="text-[11px] text-amber-900/80">
                  These notes remain strictly internal. They will NEVER be rendered in client workspaces or email receipts.
                </p>
                <textarea
                  rows={4}
                  value={privateNotesText}
                  onChange={(e) => setPrivateNotesText(e.target.value)}
                  placeholder="Enter internal planetary observations, D30 trimshamsha afflictions, delicate transit indicators, or private client context..."
                  className="w-full rounded-xl border border-amber-300 p-3 text-xs text-slate-900 bg-white"
                />
              </div>

              {/* Section B: Client-Visible Outcome Summary */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                  <Eye className="w-4 h-4 text-emerald-700" />
                  <span>Client-Visible Outcome Summary &amp; Recommendations</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  This summary will be visible to the client in their "My Consultations" area.
                </p>
                <textarea
                  rows={3}
                  value={clientSummaryText}
                  onChange={(e) => setClientSummaryText(e.target.value)}
                  placeholder="Key takeaways, favorable upcoming timing windows, and general astrological counsel for the client..."
                  className="w-full rounded-xl border border-slate-300 p-3 text-xs text-slate-900 bg-white"
                />
              </div>

              {/* Section C: Remedial Prescriptions */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Recommended Remedies (Mantras, Gemstones, Daan, Yantras)
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Chant Gayatri Mantra 108 times at sunrise, wear Yellow Sapphire (Pukhraj)"
                    value={newRemedyInput}
                    onChange={(e) => setNewRemedyInput(e.target.value)}
                    className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-xs bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newRemedyInput.trim()) return;
                      setRemediesList((prev) => [...prev, newRemedyInput.trim()]);
                      setNewRemedyInput("");
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-800 text-white font-bold text-xs cursor-pointer"
                  >
                    Add Remedy
                  </button>
                </div>

                {remediesList.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    {remediesList.map((rem, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-lg bg-white border border-slate-200 text-xs flex items-center justify-between"
                      >
                        <span>&bull; {rem}</span>
                        <button
                          type="button"
                          onClick={() => setRemediesList((prev) => prev.filter((_, i) => i !== idx))}
                          className="text-rose-600 hover:text-rose-800 text-xs cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                >
                  Save Notes &amp; Formulate Outcome
                </button>
              </div>
            </form>
          ) : (
            <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
              Please select a consultation session above to write private notes or client counsel.
            </div>
          )}
        </div>
      )}

      {/* 11. FOLLOW-UPS TAB */}
      {activeTab === "FOLLOW_UPS" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Consultation Follow-ups &amp; Remedy Milestones
            </h2>
            <p className="text-xs text-slate-500">
              Follow-up milestones and remedial reviews for clients who have completed sessions.
            </p>
          </div>

          <div className="p-12 text-center rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <BookmarkCheck className="w-10 h-10 text-slate-400 mx-auto" />
            <h4 className="font-bold text-sm text-slate-700">No Active Follow-up Milestones</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Follow-up milestones scheduled after astrological remedies will populate here.
            </p>
          </div>
        </div>
      )}

      {/* 12. QUICK QUESTIONS TAB (OPERATOR INQUIRY DESK) */}
      {activeTab === "QUICK_QUESTIONS" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Quick Astrological Inquiries ({quickInquiries.length})
              </h2>
              <p className="text-xs text-slate-500">
                Direct client questions requiring focused chart assessment and timely answers.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                Pending: {quickInquiries.filter((q) => q.status !== "ANSWERED").length}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
                Answered: {quickInquiries.filter((q) => q.status === "ANSWERED").length}
              </span>
            </div>
          </div>

          {quickInquiries.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <Inbox className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="font-bold text-sm text-slate-700">No Quick Inquiries Found</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Client quick questions submitted through the sanctuary will appear here immediately for counsel.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {quickInquiries.map((inq) => {
                const isAnswered = inq.status === "ANSWERED" || Boolean(inq.answer);
                return (
                  <div
                    key={inq.id}
                    className={`p-5 rounded-2xl border transition-all space-y-4 ${
                      isAnswered
                        ? "bg-slate-50/70 border-slate-200"
                        : "bg-amber-50/50 border-amber-300 ring-1 ring-amber-400/20"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-amber-900">{inq.id}</span>
                          <span
                            className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                              isAnswered
                                ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                                : "bg-amber-200 text-amber-950 font-bold"
                            }`}
                          >
                            {inq.status}
                          </span>
                          <span className="text-xs text-slate-500">
                            Turnaround: {inq.turnaroundHours}h &bull; Format: {inq.deliveryFormat?.replace(/_/g, " ")}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm text-slate-900 mt-1">
                          {inq.clientName} &bull; <span className="font-normal text-slate-600">{inq.clientEmail}</span>
                          {inq.clientPhone && <span className="font-normal text-slate-500"> ({inq.clientPhone})</span>}
                        </h3>
                      </div>

                      <div className="text-right text-xs text-slate-500">
                        <div>Submitted: {new Date(inq.createdAt).toLocaleString()}</div>
                      </div>
                    </div>

                    {/* Birth Details */}
                    {inq.birthDetails && (inq.birthDetails.dob || inq.birthDetails.tob) && (
                      <div className="text-xs bg-white p-3 rounded-xl border border-slate-200 text-slate-700">
                        <span className="font-bold text-[10px] uppercase text-slate-400 block mb-0.5">
                          Jyotish Birth Parameters
                        </span>
                        <span>
                          {[
                            inq.birthDetails.dob ? `DOB: ${inq.birthDetails.dob}` : null,
                            inq.birthDetails.tob ? `TOB: ${inq.birthDetails.tob}` : null,
                            inq.birthDetails.pob ? `POB: ${inq.birthDetails.pob}` : null,
                          ].filter(Boolean).join(" | ")}
                        </span>
                      </div>
                    )}

                    {/* Question text */}
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 space-y-1">
                      <span className="font-bold text-[10px] uppercase text-slate-400 block">
                        Client's Astrological Question
                      </span>
                      <p className="font-medium text-slate-900 leading-relaxed italic">
                        "{inq.question}"
                      </p>
                    </div>

                    {/* Answer area */}
                    {isAnswered && inq.answer ? (
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1.5">
                        <div className="font-bold flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-emerald-900">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Submitted Astrological Answer (Recorded {inq.answeredAt ? new Date(inq.answeredAt).toLocaleString() : ""})</span>
                        </div>
                        <p className="leading-relaxed whitespace-pre-wrap">{inq.answer}</p>
                      </div>
                    ) : (
                      <div className="space-y-2 pt-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Formulate &amp; Transmit Answer to Client *
                        </label>
                        <textarea
                          rows={4}
                          value={draftAnswers[inq.id] || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setDraftAnswers((prev) => ({ ...prev, [inq.id]: val }));
                          }}
                          placeholder={`Type detailed astrological counsel for ${inq.clientName}. Include planetary dasha analysis, timing indications, and remedies...`}
                          className="w-full rounded-xl border border-slate-300 p-3 text-xs bg-white text-slate-900"
                        />

                        {answerFeedback[inq.id] && (
                          <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                            <span>{answerFeedback[inq.id]}</span>
                          </div>
                        )}

                        <div className="flex justify-end pt-1">
                          <button
                            type="button"
                            disabled={!draftAnswers[inq.id]?.trim() || isSubmittingAnswer[inq.id]}
                            onClick={() => handleAnswerInquiry(inq.id)}
                            className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider disabled:opacity-40 transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>{isSubmittingAnswer[inq.id] ? "Transmitting..." : "Send Astrological Counsel"}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Live Consultation Sanctuary Room Modal */}
      {selectedRoomBooking && (
        <LiveConsultationRoomModal
          booking={selectedRoomBooking}
          currentUserEmail={userEmail}
          currentUserName={PRIMARY_CONSULTANT.name}
          onClose={() => setSelectedRoomBooking(null)}
        />
      )}
    </div>
  );
};
