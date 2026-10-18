import React, { useEffect, useState } from "react";
import { 
  CheckCircle2, 
  Sparkles, 
  X, 
  User, 
  Compass, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export interface AuthNotificationPopupProps {
  isOpen: boolean;
  type: "signup" | "login";
  userName: string;
  email: string;
  onClose: () => void;
  onExplore?: () => void;
}

export const AuthNotificationPopup: React.FC<AuthNotificationPopupProps> = ({
  isOpen,
  type,
  userName,
  email,
  onClose,
  onExplore,
}) => {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);

  const durationMs = 6500;
  const intervalMs = 50;

  useEffect(() => {
    if (!isOpen) {
      setProgress(100);
      return;
    }

    const step = (intervalMs / durationMs) * 100;
    const timer = setInterval(() => {
      if (!isPaused) {
        setProgress((prev) => {
          if (prev <= step) {
            clearInterval(timer);
            onClose();
            return 0;
          }
          return prev - step;
        });
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isOpen, isPaused, onClose, durationMs]);

  if (!isOpen) return null;

  const isSignup = type === "signup";
  const displayGreetingName = userName?.trim() || email.split("@")[0] || "Seeker";

  return (
    <div
      id="auth-notification-popup-container"
      className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-full max-w-lg px-4 pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="alert"
      aria-live="assertive"
    >
      <div 
        id="auth-notification-popup-card"
        className="relative overflow-hidden rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-amber-400/40 dark:border-amber-500/30 shadow-2xl shadow-amber-950/20 text-slate-900 dark:text-slate-100"
      >
        {/* Top gold accent line */}
        <div className="h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-300 w-full" />

        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            {/* Spiritual Emblem Icon */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400 shadow-inner">
              {isSignup ? (
                <Sparkles className="w-6 h-6 animate-pulse" />
              ) : (
                <CheckCircle2 className="w-6 h-6" />
              )}
            </div>

            {/* Content Header & Body */}
            <div className="flex-1 min-w-0 pr-6">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase ${
                  isSignup 
                    ? "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40"
                    : "bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border border-amber-300/40"
                }`}>
                  {isSignup ? (
                    <>
                      <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      <span>New Seeker Welcome</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                      <span>Authenticated</span>
                    </>
                  )}
                </span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 truncate max-w-[200px]">
                  {email}
                </span>
              </div>

              <h3 
                id="auth-popup-title"
                className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 tracking-tight"
              >
                {isSignup 
                  ? `Welcome to Dev-Guru, ${displayGreetingName}!` 
                  : `Welcome back, ${displayGreetingName}!`}
              </h3>

              <p 
                id="auth-popup-message"
                className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed"
              >
                {isSignup
                  ? "Your sacred Dev-Guru account has been successfully created. Begin your Vedic journey with precision Kundli calculations, daily Panchang insights, and authentic remedial consultations."
                  : "You have signed in successfully. Your Vedic birth profiles, saved astral charts, and karma rewards are ready."}
              </p>

              {/* Action Buttons */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  id="auth-popup-explore-btn"
                  onClick={() => {
                    if (onExplore) onExplore();
                    onClose();
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-xs hover:shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-slate-950" />
                  <span>Explore Dev-Guru</span>
                  <ArrowRight className="w-3 h-3 text-slate-950" />
                </button>
                <button
                  id="auth-popup-dismiss-btn"
                  onClick={onClose}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button top-right */}
        <button
          id="auth-popup-close-x-btn"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title="Close notification"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Dynamic Progress indicator bar */}
        <div className="h-1 bg-slate-100 dark:bg-slate-800 w-full overflow-hidden">
          <div 
            className="h-full bg-amber-500 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
