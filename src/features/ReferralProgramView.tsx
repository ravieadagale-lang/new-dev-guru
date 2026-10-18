import React, { useState } from "react";
import { UserProfile } from "../types";
import {
  Gift,
  Share2,
  Copy,
  Check,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Coins,
  ChevronRight,
  Heart,
  MessageCircle,
} from "lucide-react";

interface ReferralProgramViewProps {
  userProfile?: UserProfile | null;
  onUpdateProfile?: (profile: UserProfile) => void;
  onNavigateTab?: (tab: string) => void;
}

export const ReferralProgramView: React.FC<ReferralProgramViewProps> = ({
  userProfile,
  onNavigateTab,
}) => {
  const [copied, setCopied] = useState(false);
  const referralCode = userProfile?.referralCode || "ASTRO108";
  const referralCount = userProfile?.totalReferralsCount ?? 0;
  const pointsEarned = referralCount * 250;

  const handleCopyLink = () => {
    const url = `${window.location.origin}?ref=${referralCode}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Discover your authentic Vedic Kundli, Panchang & Auspicious Muhurta with Dev-Guru. Use my sacred referral code *${referralCode}* to get ₹250 off your first consultation:\n${window.location.origin}?ref=${referralCode}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-6 px-4 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C130D] via-[#2A1C12] to-[#120B07] text-amber-50 p-8 sm:p-12 border border-amber-600/30 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-semibold uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5" />
            <span>Mitra Dharma Rewards Program</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Share Vedic Wisdom, <br />
            <span className="text-amber-400">Earn Sacred Rewards</span>
          </h1>

          <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed">
            Invite your spiritual companions, family, and loved ones to discover authentic Vedic Jyotish guidance. They receive an instant 20% savings on their first consultation, and you receive 250 AstroPoints for each blessed connection.
          </p>

          {/* Referral Code Box */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center justify-between gap-3 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-amber-400/30 text-white font-mono text-base font-bold">
              <span className="tracking-widest">{referralCode}</span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="p-1.5 rounded-lg hover:bg-white/10 text-amber-300 hover:text-white transition-colors cursor-pointer"
                title="Copy Referral Link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="px-6 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Share on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Rewards Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Total Friends Joined
            </div>
            <div className="font-serif text-2xl font-bold text-slate-900 mt-0.5">
              {referralCount} Seekers
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              AstroPoints Accrued
            </div>
            <div className="font-serif text-2xl font-bold text-slate-900 mt-0.5">
              {pointsEarned} Pts
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Status Tier
            </div>
            <div className="font-serif text-2xl font-bold text-slate-900 mt-0.5">
              {referralCount >= 5 ? "Dharma Acharya" : "Mitra Guide"}
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
        <div className="text-center max-w-md mx-auto space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
            Three Simple Steps
          </span>
          <h2 className="font-serif text-2xl font-bold text-slate-900">
            How Mitra Rewards Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="font-mono text-sm font-bold text-amber-800">01. Send Your Code</div>
            <h4 className="font-bold text-sm text-slate-900">Share with Friends</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Copy your unique link or share directly through WhatsApp to people who can benefit from Vedic clarity.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="font-mono text-sm font-bold text-amber-800">02. Friend Books Session</div>
            <h4 className="font-bold text-sm text-slate-900">Friend Receives 20% Off</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              When your friend books their consultation or kundli report, they receive 20% immediate savings.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="font-mono text-sm font-bold text-amber-800">03. You Receive 250 Points</div>
            <h4 className="font-bold text-sm text-slate-900">Redeem for Remedies</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Redeem your accrued AstroPoints for gemstones, rudraksha energizations, or subsequent consultations.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      {onNavigateTab && (
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => onNavigateTab("consultation")}
            className="px-8 py-3.5 rounded-2xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-2 shadow-md"
          >
            <span>Book a Consultation Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
