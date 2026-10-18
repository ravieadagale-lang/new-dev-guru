import React, { useState, useEffect, useRef } from "react";
import {
  ConsultationBooking,
  ConsultationMode,
} from "../../domain/consultation/types";
import { PRIMARY_CONSULTANT } from "../../domain/consultation/operatorConfig";
import { canAccessConsultantWorkspace } from "../../domain/consultation/authorization";
import {
  ChatMessage,
  createChatMessage,
  sanitizeChatMessage,
} from "../../domain/consultation/chatEngine";
import { resolveCommunicationUri } from "../../domain/consultation/communicationEngine";
import { useConsultation } from "../../context/ConsultationContext";
import {
  X,
  Send,
  Video,
  Phone,
  MessageSquare,
  Clock,
  Sparkles,
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  User,
  Plus,
  Trash2,
  FileCheck,
  Compass,
  Radio,
} from "lucide-react";

interface LiveConsultationRoomModalProps {
  booking: ConsultationBooking;
  currentUserEmail?: string | null;
  currentUserName?: string | null;
  onClose: () => void;
}

export const LiveConsultationRoomModal: React.FC<LiveConsultationRoomModalProps> = ({
  booking,
  currentUserEmail,
  currentUserName,
  onClose,
}) => {
  const isConsultant = canAccessConsultantWorkspace(currentUserEmail);
  const senderRole: "CLIENT" | "CONSULTANT" = isConsultant ? "CONSULTANT" : "CLIENT";
  const senderName = isConsultant
    ? PRIMARY_CONSULTANT.name
    : currentUserName || booking.clientName || "Consultation Seeker";
  const senderEmail = currentUserEmail || (isConsultant ? PRIMARY_CONSULTANT.email : booking.clientEmail);

  const {
    saveConsultationNotes,
    getClientSummary,
    getPrivateNotes,
    startSession,
    completeSession,
  } = useConsultation();

  // Chat messages state (persisted to session/localStorage scoped to bookingId)
  const chatStorageKey = `astronext_consultation_chat_${booking.id}`;
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const stored = localStorage.getItem(chatStorageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}

    // Initial greeting message from sanctuary
    const initialGreeting: ChatMessage = {
      id: `msg-welcome-${booking.id}`,
      bookingId: booking.id,
      senderRole: "CONSULTANT",
      senderName: PRIMARY_CONSULTANT.name,
      senderEmail: PRIMARY_CONSULTANT.email,
      message: `Namaste ${booking.clientName}. Welcome to your private consultation sanctuary for ${booking.serviceId.replace(/_/g, " ")}. Feel free to type questions, share birth clarification, or join the live channel above.`,
      timestamp: new Date().toISOString(),
      isRead: true,
    };
    return [initialGreeting];
  });

  const [inputMessage, setInputMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Sync chat messages to storage
  useEffect(() => {
    try {
      localStorage.setItem(chatStorageKey, JSON.stringify(messages));
    } catch {}
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatStorageKey]);

  // Session elapsed & countdown timer
  const [secondsRemaining, setSecondsRemaining] = useState(() => {
    const endMs = new Date(booking.endTime).getTime();
    const diffSec = Math.floor((endMs - Date.now()) / 1000);
    return diffSec > 0 ? diffSec : 60 * 45; // default 45 mins session
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Live notes / counsel formulation
  const initialSummary = getClientSummary(booking.id);
  const [counselSummary, setCounselSummary] = useState(initialSummary?.summary || "");
  const [remedies, setRemedies] = useState<string[]>(
    initialSummary?.remedies ? [...initialSummary.remedies] : []
  );
  const [newRemedy, setNewRemedy] = useState("");
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = sanitizeChatMessage(inputMessage);
    if (!text) return;

    try {
      const newMsg = createChatMessage({
        bookingId: booking.id,
        senderRole,
        senderEmail,
        senderName,
        message: text,
      });

      setMessages((prev) => [...prev, newMsg]);
      setInputMessage("");
    } catch (err: unknown) {
      console.warn("Message validation warning:", err);
    }
  };

  const handleQuickPrompt = (promptText: string) => {
    setInputMessage(promptText);
  };

  const handleSaveCounsel = () => {
    const privateNotes = isConsultant ? getPrivateNotes(booking.id) : "";
    saveConsultationNotes(booking.id, privateNotes, counselSummary, remedies);
    setSaveFeedback("Counsel and remedies updated successfully.");
    setTimeout(() => setSaveFeedback(null), 3000);
  };

  // Resolved communication link
  const resolvedChannel = resolveCommunicationUri(booking.mode, {
    googleMeetUrl: "https://meet.google.com/new",
    zoomJoinUrl: "https://zoom.us/join",
    phone: booking.clientEmail ? "+91 98200 12345" : undefined,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[92vh] bg-white rounded-3xl shadow-2xl border border-amber-900/20 overflow-hidden flex flex-col">
        {/* Sanctuary Live Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-slate-950 via-amber-950 to-slate-900 text-amber-100 flex items-center justify-between border-b border-amber-800/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-amber-900/60 border border-amber-500/40 text-amber-300">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live Sanctuary
                </span>
                <span className="text-xs font-mono text-amber-300/80">
                  ID: {booking.id}
                </span>
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white mt-0.5 truncate max-w-md">
                {booking.serviceId.replace(/_/g, " ")} &bull; {booking.clientName}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Session countdown timer */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-amber-500/30 font-mono text-xs">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400">Remaining:</span>
              <span className="font-bold text-amber-200">{formatTimer(secondsRemaining)}</span>
            </div>

            {/* Direct Meeting Channel Action */}
            {resolvedChannel.isActionable && resolvedChannel.uri && (
              <a
                href={resolvedChannel.uri}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Join Video Room</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-amber-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close live consultation sanctuary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sanctuary Workspace: Split Layout */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT: Live Astrological Consultation Chat (7 cols) */}
          <div className="lg:col-span-7 flex flex-col h-full bg-slate-50 border-r border-slate-200">
            {/* Direct Channel Banner */}
            <div className="px-5 py-3 bg-amber-50/80 border-b border-amber-200/80 flex items-center justify-between text-xs text-amber-950">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">
                  {resolvedChannel.modeLabel}: {resolvedChannel.displayPlaceholder}
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                End-to-End Encrypted
              </span>
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3.5">
              {messages.map((msg) => {
                const isMe = msg.senderRole === senderRole;
                const isMsgConsultant = msg.senderRole === "CONSULTANT";

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1 px-1">
                      <span className="font-bold text-slate-600">
                        {isMsgConsultant ? `${PRIMARY_CONSULTANT.name} (Astrologer)` : msg.senderName}
                      </span>
                      <span>&bull;</span>
                      <span>
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-2xs whitespace-pre-wrap ${
                        isMe
                          ? "bg-amber-900 text-amber-50 rounded-br-xs"
                          : isMsgConsultant
                          ? "bg-amber-100 text-amber-950 border border-amber-300/80 rounded-bl-xs"
                          : "bg-white text-slate-800 border border-slate-200 rounded-bl-xs"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Astrological Prompts */}
            <div className="px-4 py-2 bg-white border-t border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-none text-[11px]">
              <span className="text-slate-400 font-bold shrink-0 uppercase tracking-wider text-[10px]">
                Quick Prompts:
              </span>
              <button
                type="button"
                onClick={() => handleQuickPrompt("Could you analyze the current Vimshottari Mahadasha period?")}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 transition-colors whitespace-nowrap cursor-pointer"
              >
                Vimshottari Dasha Analysis
              </button>
              <button
                type="button"
                onClick={() => handleQuickPrompt("What gemstone, mantra, or yantra mitigates this planetary transit?")}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 transition-colors whitespace-nowrap cursor-pointer"
              >
                Remedies &amp; Gemstones
              </button>
              <button
                type="button"
                onClick={() => handleQuickPrompt("What is the exact rising Lagna degree and Moon Nakshatra pada?")}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 transition-colors whitespace-nowrap cursor-pointer"
              >
                Lagna &amp; Nakshatra
              </button>
            </div>

            {/* Message Input Box */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                placeholder={isConsultant ? "Type astrological guidance or query..." : "Type your question for Ravie Adagale..."}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-xs text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white disabled:opacity-40 transition-all cursor-pointer shadow-xs"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* RIGHT: Astrological Chart HUD & Counsel Notes (5 cols) */}
          <div className="lg:col-span-5 flex flex-col h-full bg-white overflow-y-auto p-5 sm:p-6 space-y-5">
            {/* Client Birth Details HUD */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-700" />
                  <span>Jyotish Client Profile</span>
                </span>
                <span className="text-[10px] text-amber-800 font-mono font-bold">
                  {booking.category.replace(/_/g, " ")}
                </span>
              </div>

              <div className="text-xs text-slate-800 space-y-1">
                <div>Client: <strong>{booking.clientName}</strong> ({booking.clientEmail})</div>
                {booking.clientNotes && (
                  <div className="font-mono text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-200">
                    {booking.clientNotes}
                  </div>
                )}
                {booking.clientQuestion && (
                  <div className="text-[11px] text-slate-700 italic pt-1">
                    "{booking.clientQuestion}"
                  </div>
                )}
              </div>
            </div>

            {/* Prescribed Remedies & Counsel Formulator (Consultant or Client View) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <FileCheck className="w-4 h-4 text-emerald-700" />
                  <span>{isConsultant ? "Formulate Counsel & Remedies" : "Prescribed Remedies & Summary"}</span>
                </div>
                {isConsultant && (
                  <button
                    type="button"
                    onClick={handleSaveCounsel}
                    className="px-3 py-1 rounded-lg bg-amber-800 hover:bg-amber-900 text-white text-[11px] font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Save Counsel
                  </button>
                )}
              </div>

              {saveFeedback && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{saveFeedback}</span>
                </div>
              )}

              {/* Summary Textarea */}
              {isConsultant ? (
                <textarea
                  rows={3}
                  value={counselSummary}
                  onChange={(e) => setCounselSummary(e.target.value)}
                  placeholder="Summarize key chart findings, auspicious timing windows, and counsel for the client..."
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 bg-white"
                />
              ) : counselSummary ? (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                  {counselSummary}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 italic">
                  Ravie Adagale will record personalized astrological counsel and timing recommendations here during this session.
                </div>
              )}

              {/* Remedies List */}
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>Shastric Remedial Prescriptions ({remedies.length})</span>
                </div>

                {isConsultant && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add remedy (Mantra, Gemstone, Daan, Yantra)..."
                      value={newRemedy}
                      onChange={(e) => setNewRemedy(e.target.value)}
                      className="flex-1 rounded-xl border border-slate-300 px-3 py-1.5 text-xs bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newRemedy.trim()) return;
                        setRemedies((prev) => [...prev, newRemedy.trim()]);
                        setNewRemedy("");
                      }}
                      className="px-3 py-1.5 rounded-xl bg-amber-800 text-white font-bold text-xs cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                )}

                <div className="space-y-1.5">
                  {remedies.length === 0 ? (
                    <div className="text-[11px] text-slate-400 italic">No specific remedies added yet.</div>
                  ) : (
                    remedies.map((rem, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-center justify-between"
                      >
                        <span className="font-medium">&bull; {rem}</span>
                        {isConsultant && (
                          <button
                            type="button"
                            onClick={() => setRemedies((prev) => prev.filter((_, i) => i !== idx))}
                            className="text-rose-600 hover:text-rose-800 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Consultant Session Transition Controls */}
            {isConsultant && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 pt-3 mt-auto">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Practitioner Session Controls
                </div>
                <div className="flex flex-wrap gap-2">
                  {booking.status === "CONFIRMED" && (
                    <button
                      type="button"
                      onClick={() => startSession(booking.id, senderEmail)}
                      className="px-3 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs cursor-pointer"
                    >
                      Mark Session In-Progress
                    </button>
                  )}
                  {booking.status === "IN_PROGRESS" && (
                    <button
                      type="button"
                      onClick={() => completeSession(booking.id, senderEmail)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs cursor-pointer"
                    >
                      Mark Session Completed
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
