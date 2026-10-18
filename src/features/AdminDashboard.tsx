import React, { useState } from "react";
import { 
  ShieldCheck, 
  LogOut, 
  Lock, 
  Loader2, 
  Sparkles,
  Layers,
  ArrowRightLeft
} from "lucide-react";
import { AstroAdminControlCenter } from "../components/astronext/AstroAdminControlCenter";
import { AdminWorkspace } from "../components/astronext/AdminWorkspace";
import { ConsultantWorkspace } from "../components/consultation/ConsultantWorkspace";
import { useSuperAdminAuth } from "../services/auth/SuperAdminAuthContext";
import { SuperAdminLoginCard } from "../components/auth/SuperAdminLoginCard";

export const AdminDashboard: React.FC = () => {
  const { user, isSuperAdmin, isAdmin, isServerVerified, isLoading, logout } = useSuperAdminAuth();

  // Dual Workspace state for Super Admin (Ravie Adagale can toggle between Super Admin Control Center and Practitioner Workspace)
  const [superAdminView, setSuperAdminView] = useState<"CONTROL_CENTER" | "PRACTITIONER_WORKSPACE">("CONTROL_CENTER");

  if (isLoading) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-3 p-8 text-slate-300">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
        <p className="text-xs font-medium text-slate-400">Verifying administrative authorization credentials...</p>
      </div>
    );
  }

  // Strictly gate access: Must be both authenticated and verified as either Super Admin or Admin
  if ((!isSuperAdmin && !isAdmin) || !isServerVerified || !user) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="mb-6 text-center max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-semibold mb-3">
            <Lock className="w-3.5 h-3.5 text-rose-400" />
            <span>Restricted Administrative Area</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
            Administrative Authentication
          </h1>
          <p className="text-xs text-slate-600 mt-1.5">
            Only verified Dev-Guru Administrators and Super Administrators are authorized to view administrative workspaces.
          </p>
        </div>

        <SuperAdminLoginCard />
      </div>
    );
  }

  // 1. ADMIN ROLE WORKSPACE (Ravii Adagale)
  // Distinct Admin workspace — Strictly no Super Admin engine modifications
  if (isAdmin && !isSuperAdmin) {
    return (
      <div className="space-y-6">
        {/* Authenticated Admin Top Banner */}
        <div className="w-full bg-slate-900 border border-amber-500/40 rounded-3xl p-4 sm:px-6 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg text-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Dev-Guru Administrator Authorized
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] text-emerald-300 font-semibold">
                  <Sparkles className="w-2.5 h-2.5" />
                  Verified
                </span>
              </div>
              <div className="text-xs text-slate-300 font-mono mt-0.5">
                {user.email} (Role: ADMIN)
              </div>
            </div>
          </div>

          <button
            onClick={() => logout()}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/80 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-500/40 text-xs font-medium transition-colors cursor-pointer shadow-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Admin</span>
          </button>
        </div>

        <AdminWorkspace
          adminEmail={user.email || "ravii.adagale20@gmail.com"}
          adminName={user.displayName || "Ravii Adagale"}
        />
      </div>
    );
  }

  // 2. SUPER ADMIN WORKSPACE (Ravie Adagale)
  // Super Admin Control Center + Dual Practitioner Capability Switcher
  return (
    <div className="space-y-6">
      {/* Authenticated Super Admin Banner with Dual-Workspace Toggle */}
      <div className="w-full bg-slate-900 border border-amber-500/40 rounded-3xl p-4 sm:px-6 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg text-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Super Admin &amp; Primary Practitioner
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] text-emerald-300 font-semibold">
                <Sparkles className="w-2.5 h-2.5" />
                Verified Sovereign
              </span>
            </div>
            <div className="text-xs text-slate-300 font-mono mt-0.5">
              {user.email} (Ravie Adagale)
            </div>
          </div>
        </div>

        {/* Dual Capability Workspace Switcher (Super Admin <-> Practitioner) */}
        <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700">
          <button
            onClick={() => setSuperAdminView("CONTROL_CENTER")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              superAdminView === "CONTROL_CENTER"
                ? "bg-amber-500 text-slate-950 shadow-xs"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Control Center
          </button>
          <button
            onClick={() => setSuperAdminView("PRACTITIONER_WORKSPACE")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              superAdminView === "PRACTITIONER_WORKSPACE"
                ? "bg-amber-800 text-amber-100 shadow-xs"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <ArrowRightLeft className="w-3 h-3 text-amber-400" />
            <span>Practitioner Workspace</span>
          </button>
        </div>

        <button
          onClick={() => logout()}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/80 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-500/40 text-xs font-medium transition-colors cursor-pointer shadow-xs"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Render selected view */}
      {superAdminView === "CONTROL_CENTER" ? (
        <AstroAdminControlCenter />
      ) : (
        <ConsultantWorkspace userEmail={user.email} />
      )}
    </div>
  );
};
