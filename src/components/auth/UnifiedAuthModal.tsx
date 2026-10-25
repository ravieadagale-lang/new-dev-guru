import React, { useState, useEffect } from "react";
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
  KeyRound,
  Sparkles
} from "lucide-react";
import { useSuperAdminAuth } from "../../services/auth/SuperAdminAuthContext";

export interface UnifiedAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup" | "forgot" | "resetPassword";
  targetTab?: string;
  customSubtitle?: string;
  resetActionCode?: string | null;
  onResetComplete?: () => void;
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
  resetActionCode,
  onResetComplete,
  onAuthSuccess,
  onSelectTab,
}) => {
  const { 
    login, 
    signUp, 
    sendPasswordReset, 
    verifyResetCode, 
    confirmResetPassword, 
    isLoading, 
    error, 
    clearError 
  } = useSuperAdminAuth();

  const [mode, setMode] = useState<"login" | "signup" | "forgot" | "resetPassword">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Forgot password & reset password state
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);

  // Reset completion state
  const [actionCode, setActionCode] = useState<string>("");
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);
  const [codeVerificationStatus, setCodeVerificationStatus] = useState<"idle" | "verifying" | "valid" | "invalid">("idle");
  const [codeErrorMessage, setCodeErrorMessage] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [resetCompleted, setResetCompleted] = useState(false);

  // Sync mode and code when modal opens or initialMode changes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      clearError();
      setValidationError(null);
      setResetMessage(null);
      setResetSent(false);
      setResetCompleted(false);

      if (resetActionCode) {
        setActionCode(resetActionCode);
        handleVerifyCode(resetActionCode);
      }
    }
  }, [isOpen, initialMode, resetActionCode]);

  const handleVerifyCode = async (codeToVerify: string) => {
    if (!codeToVerify.trim()) return;
    setCodeVerificationStatus("verifying");
    setCodeErrorMessage(null);
    clearError();

    const res = await verifyResetCode(codeToVerify.trim());
    if (res.success && res.email) {
      setVerifiedEmail(res.email);
      setCodeVerificationStatus("valid");
    } else {
      setCodeVerificationStatus("invalid");
      setCodeErrorMessage(res.error || "This password reset link is invalid or has expired. Please request a new link.");
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setValidationError(null);
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
      // Validate confirm password
      if (password !== confirmPassword) {
        setValidationError("Passwords do not match. Please verify both password entries.");
        return;
      }
      if (password.length < 6) {
        setValidationError("Password must be at least 6 characters long.");
        return;
      }
      if (!cleanName) {
        setValidationError("Please enter your full name.");
        return;
      }

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
        setResetMessage("Password reset email sent! If an account exists with this email, instructions have been dispatched.");
      } else {
        setResetMessage(res.error || "Unable to send password reset email.");
      }
    } else if (mode === "resetPassword") {
      if (!actionCode.trim()) {
        setValidationError("Please provide a valid password reset code.");
        return;
      }
      if (newPassword.length < 6) {
        setValidationError("New password must be at least 6 characters long.");
        return;
      }
      if (newPassword !== confirmNewPassword) {
        setValidationError("New passwords do not match. Please re-enter.");
        return;
      }

      const res = await confirmResetPassword(actionCode.trim(), newPassword);
      if (res.success) {
        setResetCompleted(true);
        // Clean sensitive parameters from browser history URL
        if (typeof window !== "undefined" && window.history?.replaceState) {
          try {
            const url = new URL(window.location.href);
            url.searchParams.delete("mode");
            url.searchParams.delete("oobCode");
            url.searchParams.delete("apiKey");
            window.history.replaceState({}, document.title, url.pathname + (url.search ? url.search : ""));
          } catch {}
        }
        if (onResetComplete) {
          onResetComplete();
        }
      } else {
        setValidationError(res.error || "Failed to update password. Please verify the link or code.");
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
              {mode === "resetPassword" ? <KeyRound className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            </div>
            <div>
              <h2 id="unified-auth-title" className="text-base font-semibold font-serif tracking-tight text-slate-900 dark:text-slate-100">
                {mode === "login" && "Sign In to Dev-Guru"}
                {mode === "signup" && "Create Dev-Guru Account"}
                {mode === "forgot" && "Reset Password"}
                {mode === "resetPassword" && "Set New Password"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {customSubtitle ? (
                  customSubtitle
                ) : (
                  <>
                    {mode === "login" && "Access your Vedic profile, saved charts & reports"}
                    {mode === "signup" && "Begin your personal astrological journey"}
                    {mode === "forgot" && "We will send secure recovery instructions"}
                    {mode === "resetPassword" && "Choose a strong password for your account"}
                  </>
                )}
              </p>
            </div>
          </div>
          <button
            id="unified-auth-close-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers: LOGIN vs SIGN UP (only when in standard auth modes) */}
        {(mode === "login" || mode === "signup") && (
          <div className="grid grid-cols-2 p-1.5 mx-6 mt-5 bg-slate-100 dark:bg-slate-800/60 rounded-xl">
            <button
              id="auth-mode-login-tab"
              type="button"
              onClick={() => {
                setMode("login");
                clearError();
                setValidationError(null);
                setResetMessage(null);
              }}
              className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
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
                setValidationError(null);
                setResetMessage(null);
              }}
              className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
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
          {/* Mode 1: Forgot Password Success Card */}
          {mode === "forgot" && resetSent ? (
            <div id="auth-reset-success-card" className="space-y-4 py-2 text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/60 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400 shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                  Recovery Instructions Dispatched
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  If an account exists with this email, Firebase has sent a recovery link to:
                </p>
                <div className="mt-2">
                  <span className="text-xs font-semibold text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 py-1 px-3 rounded-lg border border-amber-300/50 dark:border-amber-700/50 break-all inline-block">
                    {email}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                  Please check your inbox and click the link to choose a new password.
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  id="auth-reset-back-to-login-btn"
                  type="button"
                  onClick={() => {
                    setMode("login");
                    clearError();
                    setValidationError(null);
                    setResetMessage(null);
                    setResetSent(false);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-sm shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Back to Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  id="auth-reset-enter-code-btn"
                  type="button"
                  onClick={() => {
                    setMode("resetPassword");
                    clearError();
                    setValidationError(null);
                  }}
                  className="w-full py-2 text-xs font-medium text-amber-700 dark:text-amber-400 hover:underline transition-colors cursor-pointer"
                >
                  Already have a reset link or action code? Click here
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
          ) : mode === "resetPassword" && resetCompleted ? (
            /* Mode 2: Reset Password Success Card */
            <div id="auth-reset-completed-card" className="space-y-4 py-2 text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/60 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400 shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-slate-900 dark:text-white">
                  Password Updated Successfully!
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  Your new credentials have been confirmed with Firebase. You can now log in with your updated password.
                </p>
                {verifiedEmail && (
                  <div className="mt-2">
                    <span className="text-xs font-semibold text-emerald-900 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 py-1 px-3 rounded-lg border border-emerald-300/50 dark:border-emerald-700/50 break-all inline-block">
                      {verifiedEmail}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-3">
                <button
                  id="auth-reset-proceed-login-btn"
                  type="button"
                  onClick={() => {
                    if (verifiedEmail) {
                      setEmail(verifiedEmail);
                    }
                    setPassword("");
                    setMode("login");
                    clearError();
                    setValidationError(null);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-sm shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Standard Forms: Login, Sign Up, Forgot Password, Reset Password */
            <>
              {/* Context or Firebase Error Alert */}
              {(error || validationError) && (
                <div 
                  id="auth-error-banner"
                  className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2 animate-in fade-in"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                  <div className="leading-relaxed flex-1">{validationError || error}</div>
                </div>
              )}

              {/* Reset Message */}
              {resetMessage && (
                <div
                  id="auth-reset-banner"
                  className="mb-4 p-3 rounded-xl text-xs flex items-start gap-2 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900/50 text-amber-700 dark:text-amber-300 animate-in fade-in"
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

              {/* Mode: resetPassword code verification banner */}
              {mode === "resetPassword" && codeVerificationStatus === "verifying" && (
                <div className="mb-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 text-xs flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-600 shrink-0" />
                  <span>Verifying your secure password reset code with Firebase...</span>
                </div>
              )}

              {mode === "resetPassword" && codeVerificationStatus === "invalid" && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                  <div className="flex-1">
                    <p className="font-semibold">{codeErrorMessage || "Invalid or expired reset link."}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setMode("forgot");
                        clearError();
                        setValidationError(null);
                      }}
                      className="mt-2 text-xs font-bold underline cursor-pointer text-rose-800 dark:text-rose-200"
                    >
                      Request a new password reset link
                    </button>
                  </div>
                </div>
              )}

              {mode === "resetPassword" && verifiedEmail && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Resetting password for: <strong>{verifiedEmail}</strong></span>
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
                        disabled={isLoading}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Aarav Sharma"
                        className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all disabled:opacity-60"
                      />
                    </div>
                  </div>
                )}

                {/* Email (Login, Sign Up, and Forgot Password) */}
                {mode !== "resetPassword" && (
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
                        disabled={isLoading}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all disabled:opacity-60"
                      />
                    </div>
                  </div>
                )}

                {/* Mode: resetPassword without actionCode pre-populated */}
                {mode === "resetPassword" && !resetActionCode && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="auth-action-code-input">
                      Reset Action Code
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <KeyRound className="w-4 h-4" />
                      </div>
                      <input
                        id="auth-action-code-input"
                        type="text"
                        required
                        disabled={isLoading}
                        value={actionCode}
                        onChange={(e) => {
                          setActionCode(e.target.value);
                          if (e.target.value.trim().length > 10) {
                            handleVerifyCode(e.target.value.trim());
                          }
                        }}
                        placeholder="Paste code from email link"
                        className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all disabled:opacity-60"
                      />
                    </div>
                  </div>
                )}

                {/* Password (Login and Sign Up) */}
                {(mode === "login" || mode === "signup") && (
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
                            setValidationError(null);
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
                        disabled={isLoading}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={mode === "signup" ? "At least 6 characters" : "Enter password"}
                        className="w-full pl-9 pr-10 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all disabled:opacity-60"
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

                {/* Confirm Password (Sign Up only) */}
                {mode === "signup" && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="auth-confirm-password-input">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        id="auth-confirm-password-input"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        disabled={isLoading}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        className="w-full pl-9 pr-10 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all disabled:opacity-60"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                        title={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* New Password & Confirm (Reset Password mode) */}
                {mode === "resetPassword" && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="auth-new-password-input">
                        New Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Lock className="w-4 h-4" />
                        </div>
                        <input
                          id="auth-new-password-input"
                          type={showNewPassword ? "text" : "password"}
                          required
                          disabled={isLoading || codeVerificationStatus === "invalid"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="At least 6 characters"
                          className="w-full pl-9 pr-10 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all disabled:opacity-60"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                          title={showNewPassword ? "Hide password" : "Show password"}
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="auth-confirm-new-password-input">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Lock className="w-4 h-4" />
                        </div>
                        <input
                          id="auth-confirm-new-password-input"
                          type={showConfirmNewPassword ? "text" : "password"}
                          required
                          disabled={isLoading || codeVerificationStatus === "invalid"}
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          placeholder="Re-enter new password"
                          className="w-full pl-9 pr-10 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all disabled:opacity-60"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                          title={showConfirmNewPassword ? "Hide password" : "Show password"}
                        >
                          {showConfirmNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* Submit Button */}
                <button
                  id="auth-submit-btn"
                  type="submit"
                  disabled={isLoading || (mode === "resetPassword" && codeVerificationStatus === "invalid")}
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
                  ) : mode === "forgot" ? (
                    <>
                      <span>Send Password Reset Link</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>Set New Password</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Bottom helper */}
              {mode === "forgot" && (
                <div className="mt-4 flex flex-col items-center gap-2 text-center">
                  <button
                    id="auth-forgot-enter-code-link"
                    type="button"
                    onClick={() => {
                      setMode("resetPassword");
                      clearError();
                      setValidationError(null);
                    }}
                    className="text-xs text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                  >
                    Already have a reset action code? Enter it directly
                  </button>
                  <button
                    id="auth-back-to-login-btn"
                    type="button"
                    onClick={() => {
                      setMode("login");
                      clearError();
                      setValidationError(null);
                      setResetMessage(null);
                    }}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer"
                  >
                    ← Back to LOGIN
                  </button>
                </div>
              )}

              {mode === "resetPassword" && (
                <div className="mt-4 text-center">
                  <button
                    id="auth-reset-cancel-btn"
                    type="button"
                    onClick={() => {
                      setMode("login");
                      clearError();
                      setValidationError(null);
                    }}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer"
                  >
                    ← Back to Sign In
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
