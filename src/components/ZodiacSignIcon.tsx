import React from "react";

export interface ZodiacSignIconProps {
  sign: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "badge" | "badge-dark" | "default" | "gold" | "outline";
  className?: string;
}

const ZODIAC_SYMBOLS: Record<string, { symbol: string; sanskrit: string; element: string }> = {
  aries: { symbol: "♈", sanskrit: "मेष", element: "fire" },
  taurus: { symbol: "♉", sanskrit: "वृषभ", element: "earth" },
  gemini: { symbol: "♊", sanskrit: "मिथुन", element: "air" },
  cancer: { symbol: "♋", sanskrit: "कर्क", element: "water" },
  leo: { symbol: "♌", sanskrit: "सिंह", element: "fire" },
  virgo: { symbol: "♍", sanskrit: "कन्या", element: "earth" },
  libra: { symbol: "♎", sanskrit: "तुला", element: "air" },
  scorpio: { symbol: "♏", sanskrit: "वृश्चिक", element: "water" },
  sagittarius: { symbol: "♐", sanskrit: "धनु", element: "fire" },
  capricorn: { symbol: "♑", sanskrit: "मकर", element: "earth" },
  aquarius: { symbol: "♒", sanskrit: "कुंभ", element: "air" },
  pisces: { symbol: "♓", sanskrit: "मीन", element: "water" },
  mesh: { symbol: "♈", sanskrit: "मेष", element: "fire" },
  vrishabh: { symbol: "♉", sanskrit: "वृषभ", element: "earth" },
  mithun: { symbol: "♊", sanskrit: "मिथुन", element: "air" },
  kark: { symbol: "♋", sanskrit: "कर्क", element: "water" },
  singh: { symbol: "♌", sanskrit: "सिंह", element: "fire" },
  kanya: { symbol: "♍", sanskrit: "कन्या", element: "earth" },
  tula: { symbol: "♎", sanskrit: "तुला", element: "air" },
  vrishchik: { symbol: "♏", sanskrit: "वृश्चिक", element: "water" },
  dhanu: { symbol: "♐", sanskrit: "धनु", element: "fire" },
  makar: { symbol: "♑", sanskrit: "मकर", element: "earth" },
  kumbh: { symbol: "♒", sanskrit: "कुंभ", element: "air" },
  meen: { symbol: "♓", sanskrit: "मीन", element: "water" }
};

export const ZodiacSignIcon: React.FC<ZodiacSignIconProps> = ({
  sign,
  size = "sm",
  variant = "default",
  className = ""
}) => {
  const normalizedKey = (sign || "").toLowerCase().trim();
  const info = ZODIAC_SYMBOLS[normalizedKey] || { symbol: "✨", sanskrit: "", element: "neutral" };

  const sizeClasses = {
    xs: "w-5 h-5 text-xs",
    sm: "w-7 h-7 text-sm",
    md: "w-9 h-9 text-base",
    lg: "w-11 h-11 text-lg",
    xl: "w-14 h-14 text-xl"
  }[size] || "w-7 h-7 text-sm";

  const variantClasses = {
    badge: "bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-sm",
    "badge-dark": "bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-300",
    gold: "bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-bold shadow-md",
    outline: "border border-amber-500/40 text-amber-300",
    default: "text-amber-400"
  }[variant] || "text-amber-400";

  return (
    <span
      className={`inline-flex items-center justify-center rounded-lg select-none font-serif ${sizeClasses} ${variantClasses} ${className}`}
      title={`${sign} ${info.sanskrit ? `(${info.sanskrit})` : ""}`}
    >
      <span className="leading-none">{info.symbol}</span>
    </span>
  );
};
