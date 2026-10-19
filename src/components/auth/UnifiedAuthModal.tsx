import React, { useState } from "react";
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  ArrowRight,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { useSuperAdminAuth } from "../../services/auth/SuperAdminAuthContext";

export interface UnifiedAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup" | "forgot";
  targetTab?: string;
  customSubtitle?: string;
  onAuthSuccess?: (
    role: string, 
    targetTab?: string, 
    actionType?: "login" | "signup", 
    userName?: string, 
    email?: string
  ) => void;
  onSelectTab?: (tab: string) => void;
}

export const UnifiedAuthModal: React.FC<UnifiedAuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = "login",
  targetTab,
  customSubtitle,
  onAuthSuccess,
  onSelectTab,
}) => {
  const { login, signUp, sendPasswordReset, isLoading, error, clearError } = useSuperAdminAuth();

  const [mode, setMode] = useState<"login" | "signup" | "forgot">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);

  // Sync mode if modal is re-opened with a different initial mode
  React.useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      clearError();
      setResetMessage(null);
      setResetSent(false);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setResetMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (mode === "login") {
      const result = await login(cleanEmail, password);
      if (result.success) {
        const resolvedRole = result.role || "CUSTOMER";
        const navigationTarget = (resolvedRole === "SUPER_ADMIN" || resolvedRole === "ADMIN") 
          ? "admin" 
          : (targetTab || "home");
        const userDisplayName = result.displayName || cleanEmail.split("@")[0] || "Seeker";
        if (onSelectTab) onSelectTab(navigationTarget);
        if (onAuthSuccess) onAuthSuccess(resolvedRole, navigationTarget, "login", userDisplayName, cleanEmail);
        onClose();
      }
    } else if (mode === "signup") {
      // Pass cleanEmail first, then password, then name as displayName
      const result = await signUp(cleanEmail, password, cleanName);
      if (result.success) {
        const resolvedRole = result.role || "CUSTOMER";
        const navigationTarget = (resolvedRole === "SUPER_ADMIN" || resolvedRole === "ADMIN") 
          ? "admin" 
          : (targetTab || "home");
        const userDisplayName = result.displayName || cleanName || cleanEmail.split("@")[0] || "Seeker";
        if (onSelectTab) onSelectTab(navigationTarget);
        if (onAuthSuccess) onAuthSuccess(resolvedRole, navigationTarget, "signup", userDisplayName, cleanEmail);
        onClose();
      }
    } else if (mode === "forgot") {
      if (!cleanEmail) {
        setResetMessage("Please enter your email address.");
        return;
      }
      const res = await sendPasswordReset(cleanEmail);
      if (res.success) {
        setResetSent(true);
        setResetMessage("Password reset email sent! Please check your inbox and follow the link to choose a new password.");
      } else {
        setResetMessage(res.error || "Unable to send password reset email.");
      }
    }
  };

  return (
    <div 
      id="unified-auth-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div 
        id="unified-auth-modal-card"
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-all text-slate-900 dark:text-slate-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 id="unified-auth-title" className="text-base font-semibold font-serif tracking-tight text-slate-900 dark:text-slate-100">
                {mode === "login" && "Sign In to Dev-Guru"}
                {mode === "signup" && "Create Dev-Guru Account"}
                {mode === "forgot" && "Reset Password"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {customSubtitle ? (
                  customSubtitle
                ) : (
                  <>
                    {mode === "login" && "Access your Vedic profile, saved charts & reports"}
                    {mode === "signup" && "Begin your personal astrological journey"}
                    {mode === "forgot" && "We will send secure recovery instructions"}
                  </>
                )}
              </p>
            </div>
          </div>
          <button
            id="unified-auth-close-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers: LOGIN vs SIGN UP (only when not in forgot password mode) */}
        {mode !== "forgot" && (
          <div className="grid grid-cols-2 p-1.5 mx-6 mt-5 bg-slate-100 dark:bg-slate-800/60 rounded-xl">
            <button
              id="auth-mode-login-tab"
              type="button"
              onClick={() => {
                setMode("login");
                clearError();
                setResetMessage(null);
              }}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === "login"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              LOGIN
            </button>
            <button
              id="auth-mode-signup-tab"
              type="button"
              onClick={() => {
                setMode("signup");
                clearError();
                setResetMessage(null);
              }}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === "signup"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              SIGN UP
            </button>
          </div>
        )}

        {/* Body content */}
        <div className="p-6">
          {mode === "forgot" && resetSent ? (
            <div id="auth-reset-success-card" className="space-y-4 py-2 text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/60 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400 shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                  Password Reset Email Sent!
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  We've dispatched password recovery instructions to:
                </p>
                <div className="mt-2">
                  <span className="text-xs font-semibold text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 py-1 px-3 rounded-lg border border-amber-300/50 dark:border-amber-700/50 break-all inline-block">
                    {email}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                  Please check your inbox (and spam folder) and click the link to choose a new password.
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  id="auth-reset-back-to-login-btn"
                  type="button"
                  onClick={() => {
                    setMode("login");
                    clearError();
                    setResetMessage(null);
                    setResetSent(false);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-sm shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Back to Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  id="auth-reset-resend-btn"
                  type="button"
                  disabled={isLoading}
                  onClick={async () => {
                    clearError();
                    const res = await sendPasswordReset(email);
                    if (res.success) {
                      setResetMessage("A fresh password reset link has been dispatched.");
                    } else {
                      setResetMessage(res.error || "Unable to resend reset email.");
                    }
                  }}
                  className="w-full py-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer disabled:opacity-50"
                >
                  Didn't receive email? Resend
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Error notification */}
              {error && (
                <div 
                  id="auth-error-banner"
                  className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                  <div className="leading-relaxed flex-1">{error}</div>
                </div>
              )}

              {/* Reset Message */}
              {resetMessage && (
                <div
                  id="auth-reset-banner"
                  className="mb-4 p-3 rounded-xl text-xs flex items-start gap-2 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900/50 text-amber-700 dark:text-amber-300"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                  <div className="leading-relaxed flex-1">{resetMessage}</div>
                </div>
              )}

              {mode === "forgot" && (
                <div className="mb-4 p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-900/40 text-amber-900 dark:text-amber-300 text-xs leading-relaxed">
                  Enter your registered account email. Firebase will send you a secure password reset link directly to your inbox.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name (Sign Up only) */}
                {mode === "signup" && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="auth-name-input">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <UserIcon className="w-4 h-4" />
                      </div>
                      <input
                        id="auth-name-input"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Aarav Sharma"
                        className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="auth-email-input">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="auth-email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                    />
                  </div>
                </div>

                {/* Password (Login and Sign Up) */}
                {mode !== "forgot" && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300" htmlFor="auth-password-input">
                        Password
                      </label>
                      {mode === "login" && (
                        <button
                          id="auth-forgot-password-link"
                          type="button"
                          onClick={() => {
                            setMode("forgot");
                            clearError();
                            setResetMessage(null);
                          }}
                          className="text-xs text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        id="auth-password-input"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={mode === "signup" ? "At least 6 characters" : "Enter password"}
                        className="w-full pl-9 pr-10 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                        title={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  id="auth-submit-btn"
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-sm shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : mode === "login" ? (
                    <>
                      <span>LOGIN</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : mode === "signup" ? (
                    <>
                      <span>SIGN UP</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>Send Password Reset Link</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Bottom helper */}
              {mode === "forgot" && (
                <div className="mt-4 text-center">
                  <button
                    id="auth-back-to-login-btn"
                    type="button"
                    onClick={() => {
                      setMode("login");
                      clearError();
                      setResetMessage(null);
                    }}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer"
                  >
                    ← Back to LOGIN
                  </button>
                </div>
              )}
            </>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
              Protected by Firebase Authentication. Privileges are authoritatively determined upon sign-in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
