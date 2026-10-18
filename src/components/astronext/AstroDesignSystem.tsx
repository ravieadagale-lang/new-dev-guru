import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  ChevronRight, 
  Info, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Clock,
  Compass
} from "lucide-react";

/**
 * Dev-Guru Design System Tokens & Base Components
 * Premium Luxury Astrology + Modern SaaS + Editorial Clarity
 */

// 1. AstroCard
export interface AstroCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "accent" | "subtle" | "dark";
  padding?: "sm" | "md" | "lg" | "none";
  id?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const AstroCard: React.FC<AstroCardProps> = ({
  children,
  className = "",
  variant = "default",
  padding = "md",
  id,
  onClick,
  hoverable = false,
}) => {
  const variantStyles = {
    default: "bg-[#FFFFFF] border border-[#E7E2D9] shadow-xs text-[#2A241F]",
    elevated: "bg-[#FFFFFF] border border-[#DDD7CC] shadow-md text-[#2A241F]",
    accent: "bg-[#FAF7F0] border border-[#D8C7A3] text-[#2A241F]",
    subtle: "bg-[#F7F5F0] border border-[#EBE7DF] text-[#2A241F]",
    dark: "bg-[#1E1B18] border border-[#3A332B] text-[#FDFBF7] shadow-lg",
  };

  const paddingStyles = {
    none: "",
    sm: "p-3 sm:p-4",
    md: "p-4 sm:p-6",
    lg: "p-6 sm:p-8",
  };

  const hoverStyles = hoverable
    ? "transition-all duration-200 hover:border-[#C5A869] hover:shadow-sm cursor-pointer"
    : "";

  return (
    <div
      id={id}
      onClick={onClick}
      className={`rounded-2xl ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
};

// 2. AstroBadge
export interface AstroBadgeProps {
  label: string;
  variant?: "gold" | "green" | "amber" | "slate" | "neutral" | "red" | "purple";
  size?: "sm" | "md";
  icon?: React.ReactNode;
  className?: string;
}

export const AstroBadge: React.FC<AstroBadgeProps> = ({
  label,
  variant = "neutral",
  size = "sm",
  icon,
  className = "",
}) => {
  const variantStyles = {
    gold: "bg-[#F6EED8] text-[#8C6D23] border border-[#E5D2A0]",
    green: "bg-[#EAF5ED] text-[#1E6B37] border border-[#BCE1C7]",
    amber: "bg-[#FDF3E7] text-[#9E5D14] border border-[#F5D5B0]",
    slate: "bg-[#EEF2F6] text-[#2B4360] border border-[#CDD8E5]",
    neutral: "bg-[#F2EFE9] text-[#554E46] border border-[#DDD7CD]",
    red: "bg-[#FDECEB] text-[#A62B2B] border border-[#F5BEBC]",
    purple: "bg-[#F3EDF9] text-[#63328C] border border-[#DCBFEF]",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs font-semibold tracking-wide",
    md: "px-3 py-1 text-xs font-bold tracking-wider",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full whitespace-nowrap ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon}
      <span>{label}</span>
    </span>
  );
};

// 3. AstroButton
export interface AstroButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  id?: string;
}

export const AstroButton: React.FC<AstroButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  onClick,
  className = "",
  disabled = false,
  type = "button",
  id,
}) => {
  const variantStyles = {
    primary: "bg-[#1E1B18] hover:bg-[#2F2B26] text-[#FDFBF7] shadow-xs active:scale-[0.99]",
    gold: "bg-[#B89047] hover:bg-[#A57F3A] text-[#1E1B18] font-bold shadow-xs active:scale-[0.99]",
    secondary: "bg-[#F3EFE6] hover:bg-[#EAE4D7] text-[#2A241F] border border-[#D9D1C1]",
    outline: "bg-transparent hover:bg-[#F7F4EC] text-[#2A241F] border border-[#CDC4B1]",
    ghost: "bg-transparent hover:bg-[#F2EEE4] text-[#4A433B]",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs font-semibold rounded-xl",
    md: "px-4 py-2 text-sm font-semibold rounded-xl",
    lg: "px-6 py-3 text-base font-semibold rounded-2xl",
  };

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && iconPosition === "left" && icon}
      <span>{children}</span>
      {icon && iconPosition === "right" && icon}
    </button>
  );
};

// 4. AstroTabs
export interface AstroTabItem {
  id: string;
  label: string;
  count?: number | string;
  icon?: React.ReactNode;
}

export interface AstroTabsProps {
  tabs: AstroTabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: "pill" | "line" | "boxed";
  className?: string;
}

export const AstroTabs: React.FC<AstroTabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = "pill",
  className = "",
}) => {
  if (variant === "line") {
    return (
      <div className={`flex items-center gap-4 sm:gap-6 border-b border-[#E7E2D9] overflow-x-auto no-scrollbar ${className}`}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`pb-3 text-sm font-medium whitespace-nowrap transition-colors relative flex items-center gap-2 ${
                isActive ? "text-[#1E1B18] font-bold" : "text-[#766E65] hover:text-[#2A241F]"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-[#1E1B18] text-white" : "bg-[#EAE5DA] text-[#635B52]"}`}>
                  {tab.count}
                </span>
              )}
              {isActive && (
                <motion.div
                  layoutId="astro-tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B89047]"
                />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`inline-flex p-1 bg-[#EFEBE1] rounded-2xl border border-[#DDD7CD] overflow-x-auto max-w-full ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
              isActive
                ? "bg-[#FFFFFF] text-[#1E1B18] shadow-xs font-bold"
                : "text-[#6C645A] hover:text-[#2A241F] hover:bg-[#E5DFCFC0]"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-[#F3EFE6] text-[#635B52] border border-[#DDD7CD]" : "bg-transparent text-[#7F776D]"}`}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

// 5. AstroEvidenceDrawer ("Why this result?")
export interface AstroEvidenceItem {
  category: string; // e.g. "10th House", "Current Dasha", "Transits", "D10 Varga", "Panchanga"
  status: "Highly Supportive" | "Supportive" | "Neutral" | "Cautionary";
  description: string;
  sourceText?: string;
}

export interface AstroEvidenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  verdict: string;
  supportiveCount: number;
  neutralCount: number;
  cautionCount: number;
  evidenceItems: AstroEvidenceItem[];
  methodologyNote?: string;
}

export const AstroEvidenceDrawer: React.FC<AstroEvidenceDrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  verdict,
  supportiveCount,
  neutralCount,
  cautionCount,
  evidenceItems,
  methodologyNote = "Calculated using Dev-Guru Vedic Standard (Lahiri Ayanamsa / Whole Sign houses)",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1E1B18]/40 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full max-w-lg bg-[#FAF8F5] border-l border-[#DDD7CC] shadow-2xl h-full flex flex-col z-10 overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#EAE5DA] bg-[#FFFFFF] flex justify-between items-start">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#B89047] mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Deterministic Rule Evidence
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1E1B18]">{title}</h3>
                {subtitle && <p className="text-xs text-[#6C645A] mt-0.5">{subtitle}</p>}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl hover:bg-[#F2EEE4] text-[#6C645A] hover:text-[#1E1B18] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Verdict Summary Box */}
            <div className="p-6 pb-4 bg-[#F5F1E8] border-b border-[#E7E1D4]">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#766E65]">Overall Assessment</div>
              <div className="text-lg font-bold text-[#1E1B18] mt-0.5">{verdict}</div>

              {/* Factors Breakdown */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#DFD8CA]">
                <div className="bg-[#FFFFFF] p-2.5 rounded-xl border border-[#D5E8D9] text-center">
                  <div className="text-sm font-bold text-[#1E6B37]">{supportiveCount}</div>
                  <div className="text-[11px] font-medium text-[#465E4E]">Favorable</div>
                </div>
                <div className="bg-[#FFFFFF] p-2.5 rounded-xl border border-[#E7E2D9] text-center">
                  <div className="text-sm font-bold text-[#554E46]">{neutralCount}</div>
                  <div className="text-[11px] font-medium text-[#766E65]">Neutral</div>
                </div>
                <div className="bg-[#FFFFFF] p-2.5 rounded-xl border border-[#F5D5B0] text-center">
                  <div className="text-sm font-bold text-[#9E5D14]">{cautionCount}</div>
                  <div className="text-[11px] font-medium text-[#7A5B35]">Cautionary</div>
                </div>
              </div>
            </div>

            {/* Evidence List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#766E65]">Contributing Astrological Factors</div>
              {evidenceItems.map((item, idx) => {
                const statusColor =
                  item.status === "Highly Supportive" || item.status === "Supportive"
                    ? "bg-[#EAF5ED] text-[#1E6B37] border-[#BCE1C7]"
                    : item.status === "Cautionary"
                    ? "bg-[#FDF3E7] text-[#9E5D14] border-[#F5D5B0]"
                    : "bg-[#F2EFE9] text-[#554E46] border-[#DDD7CD]";

                return (
                  <div key={idx} className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E7E2D9] shadow-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#1E1B18]">{item.category}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#4A433B] leading-relaxed">{item.description}</p>
                    {item.sourceText && (
                      <div className="text-[10px] text-[#8C847A] italic border-t border-[#F2ECE1] pt-1.5">
                        Classical Source: {item.sourceText}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Drawer Footer / Policy */}
            <div className="p-4 border-t border-[#EAE5DA] bg-[#FFFFFF] text-[11px] text-[#8C847A] text-center">
              {methodologyNote}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// 6. AstroTimeSlotCard
export interface AstroTimeSlotCardProps {
  periodTitle: string;
  timeWindow: string;
  tier: "BEST" | "GOOD" | "ACCEPTABLE" | "AVOID";
  reasons: string[];
  cautions?: string[];
  onViewDetails?: () => void;
}

export const AstroTimeSlotCard: React.FC<AstroTimeSlotCardProps> = ({
  periodTitle,
  timeWindow,
  tier,
  reasons,
  cautions = [],
  onViewDetails,
}) => {
  const tierConfig = {
    BEST: {
      badge: "bg-[#EAF5ED] text-[#1E6B37] border-[#BCE1C7]",
      border: "border-[#BCE1C7]",
      indicator: "bg-[#1E6B37]",
      label: "BEST WINDOW",
    },
    GOOD: {
      badge: "bg-[#F6EED8] text-[#8C6D23] border-[#E5D2A0]",
      border: "border-[#E5D2A0]",
      indicator: "bg-[#8C6D23]",
      label: "GOOD WINDOW",
    },
    ACCEPTABLE: {
      badge: "bg-[#EEF2F6] text-[#2B4360] border-[#CDD8E5]",
      border: "border-[#CDD8E5]",
      indicator: "bg-[#2B4360]",
      label: "ACCEPTABLE",
    },
    AVOID: {
      badge: "bg-[#FDECEB] text-[#A62B2B] border-[#F5BEBC]",
      border: "border-[#F5BEBC]",
      indicator: "bg-[#A62B2B]",
      label: "AVOID WINDOW",
    },
  };

  const cfg = tierConfig[tier];

  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border ${cfg.border} shadow-xs space-y-3`}>
      <div className="flex flex-wrap justify-between items-start gap-2">
        <div>
          <div className="text-xs font-semibold text-[#766E65]">{periodTitle}</div>
          <div className="text-base sm:text-lg font-bold text-[#1E1B18] flex items-center gap-2 mt-0.5">
            <Clock className="w-4 h-4 text-[#8C6D23]" />
            <span>{timeWindow}</span>
          </div>
        </div>
        <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${cfg.badge}`}>
          {cfg.label}
        </span>
      </div>

      <div className="space-y-1.5 pt-1 border-t border-[#F2ECE1]">
        {reasons.map((r, i) => (
          <div key={i} className="flex items-start gap-2 text-xs text-[#3E372F]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1E6B37] shrink-0 mt-0.5" />
            <span>{r}</span>
          </div>
        ))}
        {cautions.map((c, i) => (
          <div key={i} className="flex items-start gap-2 text-xs text-[#9E5D14]">
            <AlertCircle className="w-3.5 h-3.5 text-[#9E5D14] shrink-0 mt-0.5" />
            <span>{c}</span>
          </div>
        ))}
      </div>

      {onViewDetails && (
        <div className="pt-2 flex justify-end">
          <button
            onClick={onViewDetails}
            className="text-xs font-bold text-[#8C6D23] hover:text-[#1E1B18] flex items-center gap-1 transition-colors"
          >
            <span>View Rule Breakdown</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
