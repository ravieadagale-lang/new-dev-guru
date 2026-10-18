import React from "react";
import { ShieldCheck, Award, Sparkles } from "lucide-react";
import { Product } from "../types";

export interface ProductBadgeInfo {
  label: string;
  subLabel: string;
  quickViewLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeClasses: string;
  modalClasses: string;
  wishlistClasses: string;
}

export function getProductBadgeInfo(product?: Product | null): ProductBadgeInfo {
  if (!product) {
    return {
      label: "Authentic & Energized",
      subLabel: "Govt Lab Certified",
      quickViewLabel: "100% Consecrated",
      icon: ShieldCheck,
      badgeClasses: "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40",
      modalClasses: "bg-emerald-950/90 text-emerald-300 border border-emerald-500/50",
      wishlistClasses: "bg-emerald-950 text-emerald-300 border border-emerald-500/40",
    };
  }

  // Safe string extraction regardless of whether authenticityCertificate is boolean, string, or undefined
  const certText =
    typeof product.certificateType === "string"
      ? product.certificateType
      : typeof product.certification === "string"
      ? product.certification
      : typeof product.authenticityCertificate === "string"
      ? product.authenticityCertificate
      : "";

  const badgeText = typeof product.badgeLabel === "string" ? product.badgeLabel : "";
  const subtitleText = typeof product.badgeSubtitle === "string" ? product.badgeSubtitle : "";
  const category = (product.category || "").toLowerCase();

  const combined = `${certText} ${badgeText} ${subtitleText} ${category}`.toLowerCase();

  const label = badgeText || (product.authenticityCertificate ? "Lab Certified" : "100% Authentic");
  const subLabel = subtitleText || (product.authenticityCertificate ? "Govt Lab Consecrated" : "Authentic Vedic");
  const quickViewLabel = certText || badgeText || "Temple Blessed & Certified";

  if (
    combined.includes("lab") ||
    combined.includes("gem") ||
    combined.includes("sapphire") ||
    combined.includes("ruby") ||
    combined.includes("emerald")
  ) {
    return {
      label,
      subLabel,
      quickViewLabel,
      icon: ShieldCheck,
      badgeClasses: "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40",
      modalClasses: "bg-emerald-950/90 text-emerald-300 border border-emerald-500/50",
      wishlistClasses: "bg-emerald-950 text-emerald-300 border border-emerald-500/40",
    };
  }

  if (
    combined.includes("rudraksha") ||
    combined.includes("yantra") ||
    combined.includes("consecrated") ||
    combined.includes("blessed") ||
    combined.includes("vedic")
  ) {
    return {
      label,
      subLabel,
      quickViewLabel,
      icon: Sparkles,
      badgeClasses: "bg-amber-950/80 text-amber-300 border border-amber-500/40",
      modalClasses: "bg-amber-950/90 text-amber-300 border border-amber-500/50",
      wishlistClasses: "bg-amber-950 text-amber-300 border border-amber-500/40",
    };
  }

  return {
    label,
    subLabel,
    quickViewLabel,
    icon: Award,
    badgeClasses: "bg-purple-950/80 text-purple-300 border border-purple-500/40",
    modalClasses: "bg-purple-950/90 text-purple-300 border border-purple-500/50",
    wishlistClasses: "bg-purple-950 text-purple-300 border border-purple-500/40",
  };
}
