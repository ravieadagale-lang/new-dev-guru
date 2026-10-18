import React, { useState } from "react";
import { ShieldCheck, Lock, Mail, Eye, EyeOff, AlertCircle, CheckCircle2, ArrowRight, Loader2, KeyRound } from "lucide-react";
import { useSuperAdminAuth } from "../../services/auth/SuperAdminAuthContext";

interface SuperAdminLoginCardProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
}

export const SuperAdminLoginCard: React.FC<SuperAdminLoginCardProps> = ({
  onSuccess,
  onCancel,
  showCancel = false,
}) => {
  const { login, sendPasswordReset, isLoading, error, clearError } = useSuperAdminAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setResetMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    const result = await login(cleanEmail, password);
    if (result.success) {
      if (onSuccess) onSuccess();
    }
  };

  const handleForgotPassword = async () => {
    clearError();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setResetMessage("Please enter your Super Admin email address above first.");
      return;
    }
    const result = await sendPasswordReset(cleanEmail);
    if (result.success) {
      setResetSent(true);
      setResetMessage("If the account is registered, a password reset link has been dispatched to your email.");
    } else {
      setResetMessage(result.error || "Unable to send password reset email.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-100 font-serif tracking-tight flex items-center gap-2">
            Super Admin Portal
          </h2>
          <p className="text-xs text-slate-400">Cryptographically verified administrative access</p>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-5 p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed flex-1">{error}</div>
        </div>
      )}

      {/* Reset Notice */}
      {resetMessage && (
        <div
          className={`mb-5 p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
            resetSent
              ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-200"
              : "bg-amber-950/60 border border-amber-500/40 text-amber-200"
          }`}
        >
          {resetSent ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          )}
          <div className="leading-relaxed flex-1">{resetMessage}</div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5" htmlFor="superadmin-email">
            Admin Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="superadmin-email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) clearError();
              }}
              placeholder="admin@dev-guru.internal"
              disabled={isLoading}
              className="w-full pl-9 pr-3.5 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/70 transition-colors disabled:opacity-50"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-medium text-slate-300" htmlFor="superadmin-password">
              Admin Password
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={isLoading}
              className="text-[11px] text-amber-400/90 hover:text-amber-300 transition-colors cursor-pointer disabled:opacity-50"
            >
              Forgot Password?
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="superadmin-password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) clearError();
              }}
              placeholder="••••••••••••"
              disabled={isLoading}
              className="w-full pl-9 pr-10 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/70 transition-colors disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-2 flex items-center gap-3">
          {showCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 py-2.5 px-4 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <KeyRound className="w-4 h-4 text-slate-950" />
                <span>Sign In as Super Admin</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Security Footer Notice */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
        <p className="text-[11px] text-slate-400 leading-normal">
          Restricted system. Access is monitored and protected by Firebase Identity Token verification.
        </p>
      </div>
    </div>
  );
};
