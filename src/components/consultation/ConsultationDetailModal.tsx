import React, { useState } from "react";
import {
  ConsultationBooking,
  ConsultationStatus,
} from "../../domain/consultation/types";
import { formatMoney } from "../../domain/consultation/money";
import { PRIMARY_CONSULTANT } from "../../domain/consultation/operatorConfig";
import { useConsultation } from "../../context/ConsultationContext";
import { LiveConsultationRoomModal } from "./LiveConsultationRoomModal";
import {
  X,
  Calendar,
  Clock,
  Globe,
  Video,
  Phone,
  MessageCircle,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  Ban,
  CreditCard,
  Percent,
  FileCheck,
  Sparkles,
  Radio,
} from "lucide-react";

interface ConsultationDetailModalProps {
  booking: ConsultationBooking;
  onClose: () => void;
  currentUserEmail?: string | null;
  currentUserName?: string | null;
  onCancelRequest?: (bookingId: string, reason: string) => void;
  onRescheduleRequest?: (bookingId: string, newStartTime: string, reason: string) => void;
}

export const ConsultationDetailModal: React.FC<ConsultationDetailModalProps> = ({
  booking,
  onClose,
  currentUserEmail,
  currentUserName,
  onCancelRequest,
  onRescheduleRequest,
}) => {
  const [showLiveRoomModal, setShowLiveRoomModal] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("11:00");
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const { getClientSummary } = useConsultation();
  const clientSummaryRecord = getClientSummary(booking.id);

  const getStatusBadge = (status: ConsultationStatus) => {
    switch (status) {
      case "REQUESTED":
      case "PENDING_CONFIRMATION":
        return (
          <span className="px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
            Pending Confirmation
          </span>
        );
      case "CONFIRMED":
        return (
          <span className="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            Confirmed
          </span>
        );
      case "COMPLETED":
        return (
          <span className="px-3 py-1 rounded-full bg-blue-100 border border-blue-300 text-blue-900 text-xs font-bold uppercase tracking-wider">
            Completed
          </span>
        );
      case "CANCELLED_BY_CLIENT":
      case "CANCELLED_BY_CONSULTANT":
        return (
          <span className="px-3 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-900 text-xs font-bold uppercase tracking-wider">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
            {status.replace(/_/g, " ")}
          </span>
        );
    }
  };

  const formattedDate = new Date(booking.startTime).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = new Date(booking.startTime).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleConfirmCancel = () => {
    if (!cancelReason.trim()) return;
    onCancelRequest?.(booking.id, cancelReason);
    setActionFeedback("Cancellation request submitted to consultant.");
    setShowCancelDialog(false);
  };

  const handleConfirmReschedule = () => {
    if (!newDate || !newTime || !rescheduleReason.trim()) return;
    const newIso = new Date(`${newDate}T${newTime}:00`).toISOString();
    onRescheduleRequest?.(booking.id, newIso, rescheduleReason);
    setActionFeedback("Reschedule request submitted to consultant.");
    setShowRescheduleDialog(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-amber-900/20 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-amber-100 flex items-center justify-between border-b border-amber-800/40 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-amber-300">ID: {booking.id}</span>
              {getStatusBadge(booking.status)}
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white mt-1">
              Consultation Details
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-amber-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {actionFeedback && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{actionFeedback}</span>
            </div>
          )}

          {/* Session Timing & Channel Card */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-950">
                Scheduled Session Window
              </span>
              <span className="text-xs font-semibold text-amber-800 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
                <span>Timezone: {booking.timezone}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800">
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-amber-200/60">
                <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Date</div>
                  <div className="font-bold text-slate-900">{formattedDate}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-amber-200/60">
                <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Time</div>
                  <div className="font-bold text-slate-900">
                    {formattedTime} ({booking.timezone})
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Consultant & Service Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                Lead Consultant
              </div>
              <div className="font-bold text-slate-900 text-sm">{PRIMARY_CONSULTANT.name}</div>
              <div className="text-xs text-slate-600">{PRIMARY_CONSULTANT.title}</div>
              <div className="text-[11px] font-mono text-slate-500">{booking.consultantEmail}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                Communication Method
              </div>
              <div className="font-bold text-slate-900 text-sm">
                {booking.mode.replace(/_/g, " ")}
              </div>
              <div className="text-xs text-slate-600">
                Category: {booking.category.replace(/_/g, " ")}
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Encrypted 1-on-1 Session</span>
              </div>
            </div>
          </div>

          {/* Commercial & Payment Parameters */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-amber-800" />
                <span>Commercial Payment Information</span>
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  booking.paymentStatus === "PAID"
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-amber-200 text-amber-950 border border-amber-300"
                }`}
              >
                Payment: {booking.paymentStatus}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800">
              <div className="bg-white p-3 rounded-xl border border-amber-200/60">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Payment Plan</div>
                <div className="font-bold text-slate-900 mt-0.5 flex items-center gap-1">
                  {booking.paymentOption === "PAY_IN_FULL_NOW" ? (
                    <>
                      <Percent className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Pay in Full (20% Advance Discount)</span>
                    </>
                  ) : (
                    <span>Pay Before Consultation Starts</span>
                  )}
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-amber-200/60">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Total Payable</div>
                <div className="font-bold font-mono text-amber-950 text-sm mt-0.5">
                  {booking.finalPrice ? formatMoney(booking.finalPrice) : "Standard Fee"}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-amber-200/60">
              <div className="text-[11px] text-amber-900/80">
                Operational Gate: Full payment requirement must be satisfied before this session can enter in-progress.
              </div>
            </div>
          </div>

          {/* Direct Communication Join Links */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Session Connection Channel
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
              {booking.mode === "GOOGLE_MEET" || booking.mode === "VIDEO" ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 text-xs text-slate-800">
                    <Video className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Live Video Meeting Room &amp; Astrological Chat Sanctuary</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowLiveRoomModal(true)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
                  >
                    <Radio className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
                    <span>Enter Live Sanctuary Room</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : booking.mode === "PHONE" ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs text-slate-800">
                    <Phone className="w-4 h-4 text-amber-700" />
                    <span>Consultant will dial your registered phone number.</span>
                  </div>
                </div>
              ) : booking.mode === "WHATSAPP_AUDIO" || booking.mode === "WHATSAPP_VIDEO" ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs text-emerald-900">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp encrypted session initiated by consultant.</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs text-slate-800">
                    <MessageSquare className="w-4 h-4 text-amber-700" />
                    <span>In-app consultation chat thread.</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Client's Question Details */}
          {booking.clientQuestion && (
            <div className="space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Submitted Question / Focus Topic
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed">
                {booking.clientQuestion}
              </div>
            </div>
          )}

          {/* Client-Visible Consultation Summary (Strictly separated from private notes) */}
          {clientSummaryRecord && clientSummaryRecord.summary && (
            <div className="space-y-2 p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
              <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs uppercase tracking-wider">
                <FileCheck className="w-4 h-4 text-emerald-700" />
                <span>Astrological Consultation Summary</span>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                {clientSummaryRecord.summary}
              </p>
              {clientSummaryRecord.remedies && clientSummaryRecord.remedies.length > 0 && (
                <div className="pt-2 border-t border-emerald-200/60 mt-3 space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    <span>Prescribed Shastric Remedies</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                    {clientSummaryRecord.remedies.map((rem, idx) => (
                      <li key={idx}>{rem}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Cancellation / Reschedule Actions */}
          {(booking.status === "REQUESTED" ||
            booking.status === "PENDING_CONFIRMATION" ||
            booking.status === "CONFIRMED") && (
            <div className="pt-2 border-t border-slate-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-500">Need to make adjustments?</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setShowRescheduleDialog(true);
                      setShowCancelDialog(false);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reschedule</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowCancelDialog(true);
                      setShowRescheduleDialog(false);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Ban className="w-3.5 h-3.5" />
                    <span>Cancel Request</span>
                  </button>
                </div>
              </div>

              {/* Reschedule Dialog */}
              {showRescheduleDialog && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-300 space-y-3 animate-in fade-in">
                  <div className="font-bold text-xs text-slate-900">Select New Requested Date &amp; Time</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1">New Date</label>
                      <input
                        type="date"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1">New Time</label>
                      <input
                        type="time"
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1">Reason for Rescheduling</label>
                    <input
                      type="text"
                      placeholder="e.g. Work schedule conflict"
                      value={rescheduleReason}
                      onChange={(e) => setRescheduleReason(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs bg-white"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      onClick={() => setShowRescheduleDialog(false)}
                      className="px-3 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-slate-200"
                    >
                      Dismiss
                    </button>
                    <button
                      onClick={handleConfirmReschedule}
                      disabled={!newDate || !newTime || !rescheduleReason.trim()}
                      className="px-4 py-1.5 rounded-lg bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold disabled:opacity-50"
                    >
                      Submit Reschedule Request
                    </button>
                  </div>
                </div>
              )}

              {/* Cancel Dialog */}
              {showCancelDialog && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-3 animate-in fade-in">
                  <div className="font-bold text-xs text-rose-950">Cancel Consultation Request</div>
                  <div>
                    <label className="block text-[11px] text-rose-800 mb-1">Reason for Cancellation *</label>
                    <input
                      type="text"
                      placeholder="Please let us know why you are cancelling..."
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      className="w-full rounded-xl border border-rose-200 px-3 py-2 text-xs bg-white text-rose-900"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      onClick={() => setShowCancelDialog(false)}
                      className="px-3 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-rose-100"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleConfirmCancel}
                      disabled={!cancelReason.trim()}
                      className="px-4 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold disabled:opacity-50"
                    >
                      Confirm Cancellation
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Reschedule History (if any) */}
          {booking.rescheduleHistory && booking.rescheduleHistory.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Reschedule History
              </div>
              <div className="space-y-2">
                {booking.rescheduleHistory.map((rec, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-0.5"
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Requested by: {rec.requestedBy}</span>
                      <span>{new Date(rec.timestamp).toLocaleDateString()}</span>
                    </div>
                    <div className="font-semibold text-slate-800">
                      Changed from {new Date(rec.previousStartTime).toLocaleDateString()} to{" "}
                      {new Date(rec.newStartTime).toLocaleDateString()}
                    </div>
                    <div className="text-[11px] text-slate-600 italic">"{rec.reason}"</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Dev-Guru Consultation System</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>

      {showLiveRoomModal && (
        <LiveConsultationRoomModal
          booking={booking}
          currentUserEmail={currentUserEmail}
          currentUserName={currentUserName}
          onClose={() => setShowLiveRoomModal(false)}
        />
      )}
    </div>
  );
};
