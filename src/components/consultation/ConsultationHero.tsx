import React, { useState } from "react";
import { Sparkles, Calendar, HelpCircle, ShieldCheck, Award, Compass, CheckCircle2, Heart } from "lucide-react";
import { resolveImageUrl } from "../../utils/imageResolver";
import {
  PRIMARY_CONSULTANT,
  PRIMARY_CONSULTANT_PROFILE,
} from "../../domain/consultation/operatorConfig";

interface ConsultationHeroProps {
  onBookConsultation: () => void;
  onAskQuickQuestion: () => void;
}

export const ConsultationHero: React.FC<ConsultationHeroProps> = ({
  onBookConsultation,
  onAskQuickQuestion,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // High quality local asset depicting a Vedic Jyotish sanctuary
  const heroImageUrl = resolveImageUrl("/src/assets/images/vedic_sage_horoscope_1789639030606.jpg");

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#1C1612] via-[#241C16] to-[#16120E] border border-amber-500/20 text-amber-50 shadow-xl mb-8">
      {/* Background celestial pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="relative max-w-7xl mx-auto px-6 py-10 sm:py-14 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Authentic 1-on-1 Consultations</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-100 tracking-tight leading-[1.15]">
            Sacred Shastric Counsel &amp; High-Precision Astrological Guidance
          </h1>

          <p className="text-sm sm:text-base text-amber-100/80 leading-relaxed max-w-2xl">
            Direct personal sessions with Chief Astrological Consultant <strong className="text-amber-200 font-semibold">{PRIMARY_CONSULTANT.name}</strong>. 
            Synthesizing classical Parashari Kundli wisdom, KP stellar timing, and mathematical planetary rectifications for relationship compatibility, career pivots, and sacred muhurtas.
          </p>

          {/* Quick Credential Badges */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-amber-200/90 pt-1">
            <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-amber-500/20">
              <Heart className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Main Expertise: {PRIMARY_CONSULTANT_PROFILE.mainExpertise}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-amber-500/20">
              <Compass className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Multi-Disciplinary Guidance</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-amber-500/20">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Confidential Counsel</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              id="hero-book-consultation-btn"
              onClick={onBookConsultation}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-amber-900/30 transition-all cursor-pointer border border-amber-400/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Consultation</span>
            </button>

            <button
              id="hero-ask-quick-question-btn"
              onClick={onAskQuickQuestion}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-amber-200 hover:text-white font-semibold text-sm transition-all cursor-pointer border border-amber-400/20 backdrop-blur-sm"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Ask a Quick Question</span>
            </button>
          </div>

          {/* Transparency Disclaimer */}
          <p className="text-[11px] text-amber-200/60 flex items-center gap-1.5 pt-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Human astrological discernment only. Never algorithmic or AI-generated answers.</span>
          </p>
        </div>

        {/* Right Column: High Quality Sage Image with Astrological Framing */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl bg-black/40 group">
            {/* Ambient gold glow */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-amber-600/20 to-amber-300/10 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />

            {/* Fallback placeholder while image is loading or if missing */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-[#2A2018] animate-pulse flex flex-col items-center justify-center text-amber-400/40 p-6 text-center">
                <Compass className="w-12 h-12 mb-3 animate-spin duration-3000" />
                <span className="text-xs font-serif text-amber-300/60">Loading Shastric Consultation Archive...</span>
              </div>
            )}

            {imageError ? (
              <div className="absolute inset-0 bg-gradient-to-br from-[#2D2117] to-[#18120C] flex flex-col items-center justify-center p-6 text-center text-amber-300">
                <Compass className="w-16 h-16 mb-4 text-amber-400" />
                <h3 className="font-serif text-lg font-bold text-amber-200">Dev-Guru Jyotish Sanctuary</h3>
                <p className="text-xs text-amber-200/70 mt-2 max-w-xs">
                  Chart Assessment &amp; Stellar Timing with {PRIMARY_CONSULTANT.name}.
                </p>
              </div>
            ) : (
              <img
                src={heroImageUrl}
                alt="Astrological sanctuary and horary consultation chamber"
                className={`w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                loading="eager"
              />
            )}

            {/* Subtle bottom gradient overlay for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

            {/* Floating Info Tag on image */}
            <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-black/70 backdrop-blur-md border border-amber-500/30 text-amber-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-amber-300 font-serif">Dev-Guru Sanctuary</div>
                  <div className="text-[11px] text-amber-200/70">{PRIMARY_CONSULTANT.name} &bull; Lead Consultant</div>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                  Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
