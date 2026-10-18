import React, { useState, useEffect, useRef } from "react";
import {
  PRIMARY_CONSULTANT,
  PRIMARY_CONSULTANT_PROFILE,
  CANONICAL_MAIN_EXPERTISE,
  CANONICAL_AREAS_OF_EXPERTISE,
} from "../../domain/consultation/operatorConfig";
import { resolveImageUrl } from "../../utils/imageResolver";
import {
  Globe,
  Languages,
  Calendar,
  Sparkles,
  User,
  Camera,
  Upload,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

interface ConsultantProfileCardProps {
  onBookSession?: () => void;
  isOperator?: boolean;
}

export const ConsultantProfileCard: React.FC<ConsultantProfileCardProps> = ({
  onBookSession,
  isOperator = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageError, setImageError] = useState(false);
  const [activeAvatar, setActiveAvatar] = useState<string | undefined>(
    PRIMARY_CONSULTANT_PROFILE.avatarUrl
  );
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!isOperator) {
      setActiveAvatar(PRIMARY_CONSULTANT_PROFILE.avatarUrl);
      return;
    }

    const handleAvatarUpdate = () => {
      const stored = localStorage.getItem("astronext_consultant_avatar");
      if (stored) {
        setActiveAvatar(stored);
        setImageError(false);
      } else {
        setActiveAvatar(PRIMARY_CONSULTANT_PROFILE.avatarUrl);
      }
    };

    window.addEventListener("storage", handleAvatarUpdate);
    window.addEventListener("astronext:avatar_updated", handleAvatarUpdate);
    return () => {
      window.removeEventListener("storage", handleAvatarUpdate);
      window.removeEventListener("astronext:avatar_updated", handleAvatarUpdate);
    };
  }, [isOperator]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        localStorage.setItem("astronext_consultant_avatar", result);
        setActiveAvatar(result);
        setImageError(false);
        setUploadNotice("Photograph updated successfully.");
        window.dispatchEvent(new Event("astronext:avatar_updated"));
        setTimeout(() => setUploadNotice(null), 4000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetToDefault = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.removeItem("astronext_consultant_avatar");
    setActiveAvatar(PRIMARY_CONSULTANT_PROFILE.avatarUrl);
    setImageError(false);
    setUploadNotice("Profile photograph reset to default.");
    window.dispatchEvent(new Event("astronext:avatar_updated"));
    setTimeout(() => setUploadNotice(null), 3000);
  };

  return (
    <section className="bg-gradient-to-br from-[#1E1712] via-[#2A1F16] to-[#18110D] text-amber-50 rounded-3xl p-6 sm:p-8 lg:p-10 border border-amber-600/30 shadow-xl relative overflow-hidden space-y-6">
      {/* Subtle gold ambient glow */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* Upload notice (Operator only) */}
      {isOperator && uploadNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-xs font-semibold text-emerald-200 flex items-center justify-between gap-2 shadow-xs relative z-10">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{uploadNotice}</span>
          </div>
        </div>
      )}

      {/* Hidden file input (Operator only) */}
      {isOperator && (
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      )}

      {/* Consolidated Profile Card Layout with Exact Visual Hierarchy */}
      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-10">
        {/* 1. PHOTO: Official Profile Photograph */}
        <div className="flex flex-col items-center gap-3 shrink-0">
          <div
            onClick={isOperator ? () => fileInputRef.current?.click() : undefined}
            title={isOperator ? "Official Profile Photograph of Ravie Adagale (Click to update)" : `Official Portrait of ${PRIMARY_CONSULTANT.name}`}
            className={`group relative w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-xl shrink-0 bg-slate-900 flex items-center justify-center ring-4 ring-amber-500/15 ${
              isOperator ? "cursor-pointer transition-all hover:border-amber-400/80" : ""
            }`}
          >
            {activeAvatar && !imageError ? (
              <img
                src={resolveImageUrl(activeAvatar)}
                alt={`${PRIMARY_CONSULTANT.name} - ${CANONICAL_MAIN_EXPERTISE}`}
                className={`w-full h-full object-cover object-center ${
                  isOperator ? "transition-transform duration-300 group-hover:scale-105" : ""
                }`}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-amber-200/50 p-2 text-center">
                <User className="w-12 h-12 mb-1 text-amber-300/40" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-200/60">
                  {PRIMARY_CONSULTANT.name}
                </span>
              </div>
            )}

            {/* Hover overlay for updating image (Operator only) */}
            {isOperator && (
              <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-3 text-white text-center">
                <Camera className="w-6 h-6 text-amber-300" />
                <span className="text-xs font-semibold">Change Photo</span>
              </div>
            )}

            {/* Active Presence Beacon */}
            <div
              className="absolute bottom-3 right-3 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#1E1712] ring-2 ring-emerald-500/40"
              title="Verified Active Consultant"
            />
          </div>

          {/* Quick upload & reset controls (Operator only) */}
          {isOperator && (
            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 hover:bg-white/15 text-amber-200 text-[11px] font-medium transition-colors cursor-pointer border border-amber-500/20"
              >
                <Upload className="w-3.5 h-3.5 text-amber-300" />
                <span>Change Photo</span>
              </button>
              {localStorage.getItem("astronext_consultant_avatar") && (
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  title="Reset to default asset"
                  className="p-1 rounded-xl hover:bg-white/10 text-amber-300/60 hover:text-amber-200 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* 2. Visual Hierarchy: Ravie Adagale -> Love & Relationship -> Consultant -> Areas of Expertise */}
        <div className="flex-1 space-y-5 text-center md:text-left">
          {/* Ravie Adagale */}
          <div className="space-y-1">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              {PRIMARY_CONSULTANT.name}
            </h1>
          </div>

          {/* Love & Relationship (Main Expertise) & Consultant Role */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Main Expertise: {CANONICAL_MAIN_EXPERTISE}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-amber-100/90 text-xs font-medium uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>{PRIMARY_CONSULTANT.title}</span>
            </div>
          </div>

          {/* Philosophy / Bio Summary */}
          <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed max-w-2xl">
            {PRIMARY_CONSULTANT_PROFILE.bio}
          </p>

          {/* Areas of Expertise: Canonical Items */}
          <div className="space-y-2 pt-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300/80">
              Areas of Expertise
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              {CANONICAL_AREAS_OF_EXPERTISE.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-amber-500/20 text-amber-100 text-xs font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{area}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Timezone, Languages & Primary CTA */}
          <div className="pt-3 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-amber-200/70">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Timezone: {PRIMARY_CONSULTANT_PROFILE.timezone} (IST)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5 text-amber-400" />
                <span>Languages: {PRIMARY_CONSULTANT_PROFILE.languages.join(", ")}</span>
              </span>
            </div>

            {onBookSession && (
              <button
                type="button"
                onClick={onBookSession}
                className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2 shrink-0"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>Book a Consultation</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
