import React from "react";
import { Product } from "../types";
import { 
  ShieldCheck, 
  BookOpen, 
  Sparkles, 
  Flame, 
  Award, 
  FileText 
} from "lucide-react";

export interface ProductBadgeInfo {
  label: string;
  subLabel: string;
  quickViewLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeClasses: string;
  wishlistClasses: string;
  modalClasses: string;
}

export function getProductBadgeInfo(product: Partial<Product>): ProductBadgeInfo {
  const category = (product.category || "").toLowerCase().trim();
  const id = (product.id || "").toLowerCase().trim();
  const name = (product.name || "").toLowerCase().trim();

  // 1. eBooks & Digital Manuals
  if (
    category === "ebooks" || 
    category === "ebook" || 
    category === "books" || 
    category === "book" || 
    category === "digital" ||
    id.startsWith("ebook") || 
    name.includes("ebook") || 
    name.includes("pdf") ||
    name.includes("handbook") || 
    name.includes("blueprint") || 
    name.includes("manual") || 
    name.includes("workbook")
  ) {
    return {
      label: "Instant PDF Download",
      subLabel: "Official Digital Edition",
      quickViewLabel: "Official Digital Edition • Instant PDF Download (No Physical Shipping)",
      icon: BookOpen,
      badgeClasses: "bg-indigo-600/95 text-white border border-indigo-400/40 shadow-sm",
      wishlistClasses: "bg-indigo-950/90 text-indigo-300 border border-indigo-500/30",
      modalClasses: "bg-indigo-700/90 text-white border border-indigo-400/40 shadow-md"
    };
  }

  // 2. Astrological Custom Reports
  if (category === "reports" || category === "report" || id.includes("report") || name.includes("report") || name.includes("kundli report")) {
    return {
      label: "Acharya Verified Report",
      subLabel: "Personalized 25-Year Roadmap",
      quickViewLabel: "Verified by Senior Jyotish Acharyas • Comprehensive Kundli Analysis",
      icon: Award,
      badgeClasses: "bg-purple-700/95 text-white border border-purple-400/40 shadow-sm",
      wishlistClasses: "bg-purple-950/90 text-purple-300 border border-purple-500/30",
      modalClasses: "bg-purple-700/90 text-white border border-purple-400/40 shadow-md"
    };
  }

  // 3. Sacred Yantras
  if (category === "yantra" || name.includes("yantra") || name.includes("meru")) {
    return {
      label: product.badgeLabel || "Prana Pratishtha Consecrated",
      subLabel: product.badgeSubtitle || "Vedic Agama Consecrated",
      quickViewLabel: product.certificateType || "Prana Pratishtha Energized in Brahmamuhurta",
      icon: Flame,
      badgeClasses: "bg-amber-600/95 text-white border border-amber-400/40 shadow-sm",
      wishlistClasses: "bg-amber-950/90 text-amber-300 border border-amber-500/30",
      modalClasses: "bg-amber-600/95 text-white border border-amber-400/40 shadow-md"
    };
  }

  // 4. Rudraksha Malas & Beads
  if (category === "rudraksha" || name.includes("rudraksha") || name.includes("mala")) {
    return {
      label: product.badgeLabel || "Nepal Origin • X-Ray Tested",
      subLabel: product.badgeSubtitle || "Kashi Vishwanath Blessed",
      quickViewLabel: product.certificateType || "Temple Blessed & X-Ray Tested for Mukhis",
      icon: Sparkles,
      badgeClasses: "bg-amber-800/95 text-amber-100 border border-amber-500/40 shadow-sm",
      wishlistClasses: "bg-amber-950/90 text-amber-300 border border-amber-500/30",
      modalClasses: "bg-amber-800/95 text-amber-100 border border-amber-500/40 shadow-md"
    };
  }

  // 5. Gemstones
  if (category === "gemstones" || category === "gemstone" || name.includes("sapphire") || name.includes("emerald") || name.includes("ruby") || name.includes("topaz")) {
    return {
      label: product.badgeLabel || "Govt Lab Certified",
      subLabel: product.badgeSubtitle || "100% Natural & Consecrated",
      quickViewLabel: product.certificateType || "Govt / IGI Gemological Lab Certified",
      icon: ShieldCheck,
      badgeClasses: "bg-emerald-700/95 text-white border border-emerald-400/40 shadow-sm",
      wishlistClasses: "bg-emerald-950/90 text-emerald-300 border border-emerald-500/30",
      modalClasses: "bg-emerald-700/90 text-white border border-emerald-400/40 shadow-md"
    };
  }

  // Default fallback for any other sacred item
  return {
    label: product.badgeLabel || "Authentic Certified",
    subLabel: product.badgeSubtitle || "Blessed & Consecrated",
    quickViewLabel: product.certificateType || "Authentic Certified Sacred Product",
    icon: ShieldCheck,
    badgeClasses: "bg-emerald-700/95 text-white border border-emerald-400/40 shadow-sm",
    wishlistClasses: "bg-emerald-950/90 text-emerald-300 border border-emerald-500/30",
    modalClasses: "bg-emerald-700/90 text-white border border-emerald-400/40 shadow-md"
  };
}
