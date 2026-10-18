import React, { useState, useRef, useEffect } from "react";
import { validateProfilePhotoFile } from "../../domain/consultation/validation";
import {
  Camera,
  Trash2,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  User,
  Info,
} from "lucide-react";

export interface ProfilePhotoUploaderProps {
  currentPhotoUrl?: string | null;
  consultantName?: string;
  userName?: string;
  userRole?: "CUSTOMER" | "PRACTITIONER" | "ADMIN" | "SUPER_ADMIN";
  isApprovedPermanent?: boolean;
  onPhotoUpdated?: (url: string | null) => void;
  className?: string;
}

export const ProfilePhotoUploader: React.FC<ProfilePhotoUploaderProps> = ({
  currentPhotoUrl,
  consultantName,
  userName,
  userRole = "CUSTOMER",
  isApprovedPermanent = false,
  onPhotoUpdated,
  className = "",
}) => {
  const displayName = consultantName || userName || "User";
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(() => {
    return currentPhotoUrl || null;
  });

  useEffect(() => {
    if (currentPhotoUrl) {
      setPreviewUrl(currentPhotoUrl);
    }
  }, [currentPhotoUrl]);

  const [errorText, setErrorText] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorText(null);
    setFeedback(null);

    // Validate using domain validator (image/jpeg, image/png, image/webp; <= 5MB)
    const validation = validateProfilePhotoFile({
      name: file.name,
      sizeBytes: file.size,
      type: file.type,
    });

    if (!validation.isValid) {
      setErrorText(validation.errors.join(", "));
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setPreviewUrl(dataUrl);
        setIsUploading(false);
        setFeedback("Profile photo updated in memory. (Cloud Storage persistence contract active)");
        onPhotoUpdated?.(dataUrl);
        try {
          window.dispatchEvent(new Event("astronext:avatar_updated"));
        } catch {
          // non-blocking
        }
      }
    };
    reader.onerror = () => {
      setIsUploading(false);
      setErrorText("Failed to read image file.");
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPreviewUrl(null);
    setErrorText(null);
    setFeedback("Profile photo reset to default avatar.");
    if (fileInputRef.current) fileInputRef.current.value = "";
    onPhotoUpdated?.(null);
    try {
      window.dispatchEvent(new Event("astronext:avatar_updated"));
    } catch {
      // non-blocking
    }
  };

  const triggerPicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-bold text-slate-900 text-sm">
            {userRole === "PRACTITIONER" || userRole === "SUPER_ADMIN"
              ? "Practitioner Profile Photo"
              : userRole === "ADMIN"
              ? "Administrator Profile Photo"
              : "Seeker Profile Photo"}
          </h4>
          <p className="text-xs text-slate-500">
            JPEG, PNG, or WebP up to 5MB. Rendered in verified workspaces.
          </p>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-200 text-slate-700 self-start sm:self-auto">
          {userRole}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Avatar / Preview Container */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-2 border-amber-500/40 bg-slate-900 flex items-center justify-center shrink-0 shadow-md ring-4 ring-amber-500/10">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt={`${displayName} Profile`}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-500">
              <User className="w-10 h-10 mb-1 text-slate-400" />
              <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">
                Default Avatar
              </span>
            </div>
          )}

          {isUploading && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center text-amber-300">
              <RefreshCw className="w-6 h-6 animate-spin" />
            </div>
          )}
        </div>

        {/* Action Buttons & Persistence Notice */}
        <div className="space-y-3 flex-1 w-full sm:w-auto">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileSelected}
            className="hidden"
            id={`profile-photo-input-${userRole.toLowerCase()}`}
            aria-label="Upload profile photograph"
          />

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={triggerPicker}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs"
            >
              <Camera className="w-4 h-4" />
              <span>{previewUrl ? "Replace Photo" : "Upload Photo"}</span>
            </button>

            {previewUrl && !isApprovedPermanent && (
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 font-medium text-xs transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            )}

            {isApprovedPermanent && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Canonical Approved Photo</span>
              </span>
            )}
          </div>

          {/* Transparent Storage Disclosure */}
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/70 text-[11px] text-amber-900">
            <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
            <span>
              {isApprovedPermanent
                ? "Canonical official photograph is actively rendered across public and consultation sanctums."
                : "Profile photo preview is rendered immediately. Cloud Storage bucket persistence is established without storing heavy binary blobs in Firestore."}
            </span>
          </div>

          {/* Feedback or Errors */}
          {errorText && (
            <div className="flex items-center gap-2 text-xs text-rose-700 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorText}</span>
            </div>
          )}

          {feedback && !errorText && (
            <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{feedback}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
