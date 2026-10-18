import React, { useState } from "react";
import { 
  ShieldCheck, 
  Calendar, 
  Users, 
  Clock, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Video,
  Phone,
  Eye,
  Search,
  Activity,
  Layers,
  Sparkles
} from "lucide-react";
import { useConsultation } from "../../context/ConsultationContext";
import { CANONICAL_CONSULTATION_SERVICES } from "../../domain/consultation/defaultServices";
import { formatMoney } from "../../domain/consultation/money";
import { ProfilePhotoUploader } from "../consultation/ProfilePhotoUploader";
import { PRIMARY_CONSULTANT } from "../../domain/consultation/operatorConfig";

export interface AdminWorkspaceProps {
  adminEmail: string;
  adminName?: string;
  onPhotoUpdated?: (url: string | null) => void;
}

export const AdminWorkspace: React.FC<AdminWorkspaceProps> = ({
  adminEmail,
  adminName = "Ravii Adagale",
  onPhotoUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "BOOKINGS" | "PRACTITIONERS" | "SERVICES" | "PROFILE">("OVERVIEW");
  const [searchQuery, setSearchQuery] = useState("");
  const { bookings, confirmBooking, declineBooking } = useConsultation();

  const pendingBookings = bookings.filter((b) => b.status === "REQUESTED");
  const confirmedBookings = bookings.filter((b) => b.status === "CONFIRMED");
  const completedBookings = bookings.filter((b) => b.status === "COMPLETED");

  const filteredBookings = bookings.filter((b) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.clientName.toLowerCase().includes(q) ||
      b.clientEmail.toLowerCase().includes(q) ||
      b.serviceId.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Admin Workspace Header Banner */}
      <div className="bg-white border border-amber-900/10 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Dev-Guru Administrative Workspace</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-mono">Role: ADMIN</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Operations &amp; Consultation Oversight
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Authorized administrator console for operational consultation tracking, booking workflow coordination, and service monitoring.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            <span>Consultation Operations Active</span>
          </div>
        </div>
      </div>

      {/* Workspace Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("OVERVIEW")}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "OVERVIEW"
              ? "bg-amber-900 text-amber-100 shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Operational Overview
        </button>
        <button
          onClick={() => setActiveTab("BOOKINGS")}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "BOOKINGS"
              ? "bg-amber-900 text-amber-100 shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <span>Consultations</span>
          {pendingBookings.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold">
              {pendingBookings.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("PRACTITIONERS")}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "PRACTITIONERS"
              ? "bg-amber-900 text-amber-100 shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Practitioner Directory
        </button>
        <button
          onClick={() => setActiveTab("SERVICES")}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "SERVICES"
              ? "bg-amber-900 text-amber-100 shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Services Catalog
        </button>
        <button
          onClick={() => setActiveTab("PROFILE")}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "PROFILE"
              ? "bg-amber-900 text-amber-100 shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Admin Profile
        </button>
      </div>

      {/* Tab 1: OVERVIEW */}
      {activeTab === "OVERVIEW" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-1 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Total Bookings Recorded
              </span>
              <div className="text-2xl font-serif font-bold text-slate-900">{bookings.length}</div>
              <span className="text-[11px] text-slate-500">Real consultation records</span>
            </div>

            <div className="p-5 rounded-3xl bg-amber-50/80 border border-amber-200 space-y-1 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                Pending Requests
              </span>
              <div className="text-2xl font-serif font-bold text-amber-950">{pendingBookings.length}</div>
              <span className="text-[11px] text-amber-700">Awaiting practitioner confirmation</span>
            </div>

            <div className="p-5 rounded-3xl bg-emerald-50/80 border border-emerald-200 space-y-1 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                Confirmed Consultations
              </span>
              <div className="text-2xl font-serif font-bold text-emerald-950">{confirmedBookings.length}</div>
              <span className="text-[11px] text-emerald-700">Scheduled and active</span>
            </div>

            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-1 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Completed Sessions
              </span>
              <div className="text-2xl font-serif font-bold text-slate-900">{completedBookings.length}</div>
              <span className="text-[11px] text-slate-500">With client summaries</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-base text-slate-900">
                Primary Practitioner Overview
              </h3>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Active &amp; Authorized
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <div className="font-bold text-sm text-slate-900">{PRIMARY_CONSULTANT.name}</div>
                <div className="text-slate-500 font-mono mt-0.5">{PRIMARY_CONSULTANT.email}</div>
                <div className="text-amber-800 font-semibold mt-1">Role: SUPER_ADMIN + Primary Consultant</div>
              </div>
              <div className="text-slate-600 space-y-0.5">
                <div>Primary Specialization: Love &amp; Relationship</div>
                <div>Timezone: Asia/Kolkata</div>
                <div>Status: Available for 1-on-1 Consultations</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: BOOKINGS */}
      {activeTab === "BOOKINGS" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-serif font-bold text-xl text-slate-900">
                Consultation Records ({filteredBookings.length})
              </h3>
              <p className="text-xs text-slate-500">
                Authoritative view of all customer booking requests and sessions.
              </p>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by client or service..."
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 w-64"
              />
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <FileText className="w-8 h-8 text-slate-400 mx-auto" />
              <div className="font-bold text-xs text-slate-700">No consultation records match query.</div>
              <p className="text-[11px] text-slate-500">
                New customer consultation requests will appear here as they are submitted.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-amber-400 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{b.serviceName || b.serviceId}</span>
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
                        {b.status}
                      </span>
                    </div>
                    <div className="text-slate-500 flex items-center gap-3">
                      <span>Client: {b.clientName} ({b.clientEmail})</span>
                      <span>•</span>
                      <span>Scheduled: {new Date(b.startTime).toLocaleString([], { timeZone: b.timezone })}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {b.status === "REQUESTED" && (
                      <>
                        <button
                          onClick={() => confirmBooking(b.id, adminEmail)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 cursor-pointer"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => declineBooking(b.id, adminEmail, "Declined by admin operational review")}
                          className="px-3 py-1.5 rounded-lg bg-rose-100 text-rose-800 font-bold text-xs hover:bg-rose-200 cursor-pointer"
                        >
                          Decline
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: PRACTITIONERS */}
      {activeTab === "PRACTITIONERS" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-serif font-bold text-xl text-slate-900">
              Verified Practitioners Directory
            </h3>
            <p className="text-xs text-slate-500">
              Only authorized and approved practitioners are permitted to accept client bookings.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-amber-300 bg-amber-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-900 shrink-0">
                <img
                  src="/assets/images/ravie_adagale_profile.png"
                  alt="Ravie Adagale"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-base text-slate-900">{PRIMARY_CONSULTANT.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Primary Verified Consultant
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono">{PRIMARY_CONSULTANT.email}</p>
                <div className="text-xs text-amber-800 font-semibold mt-0.5">
                  Super Admin with Active Practitioner Capability
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-600">
              <span className="block font-semibold">Specialties:</span>
              <span>Vedic Astrology, Numerology, Tarot, Relationship Compatibility</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: SERVICES */}
      {activeTab === "SERVICES" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-serif font-bold text-xl text-slate-900">
              Approved Consultation Services
            </h3>
            <p className="text-xs text-slate-500">
              Canonical services available for customer booking across Dev-Guru.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CANONICAL_CONSULTATION_SERVICES.map((srv) => (
              <div key={srv.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">{srv.name}</span>
                  <span className="font-mono font-bold text-xs text-emerald-800">{formatMoney(srv.price)}</span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2">{srv.description}</p>
                <div className="text-[11px] text-slate-500 flex items-center gap-3 pt-1">
                  <span>Duration: {srv.durationMinutes}m</span>
                  <span>•</span>
                  <span>Category: {srv.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: PROFILE */}
      {activeTab === "PROFILE" && (
        <div className="space-y-6">
          <ProfilePhotoUploader
            userName={adminName}
            userRole="ADMIN"
            onPhotoUpdated={onPhotoUpdated}
          />

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs">
            <h3 className="font-serif font-bold text-base text-slate-900">
              Administrator Profile Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-500 mb-1 font-semibold uppercase text-[10px]">
                  Administrator Name
                </label>
                <input
                  type="text"
                  value={adminName}
                  disabled
                  className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1 font-semibold uppercase text-[10px]">
                  Authorized Email
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  disabled
                  className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 cursor-not-allowed font-mono"
                />
              </div>
            </div>
            <div className="text-[11px] text-slate-500 bg-amber-50 p-3 rounded-xl border border-amber-200/80">
              Role: <strong>ADMIN</strong>. Authorized for consultation operational oversight and customer review.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
