import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  MessageSquare, 
  Coins, 
  HeartHandshake, 
  ShieldAlert, 
  CheckCircle2, 
  Bot, 
  RefreshCw, 
  Lightbulb, 
  Flame, 
  Star,
  Copy,
  Check
} from "lucide-react";
import { ComprehensiveMatchResult } from "../utils/compatibilityCalculator";
import { LanguageCode } from "../types";

interface AIRelationshipAdviceSectionProps {
  matchResult: ComprehensiveMatchResult;
  partnerAName: string;
  partnerBName: string;
  selectedLanguage?: LanguageCode;
}

export const AIRelationshipAdviceSection: React.FC<AIRelationshipAdviceSectionProps> = ({
  matchResult,
  partnerAName,
  partnerBName,
  selectedLanguage = "en"
}) => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [customAdvice, setCustomAdvice] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<"communication" | "finance" | "intimacy" | "remedies">("communication");

  // Derive dynamic insights based on specific match result properties
  const manglikText = matchResult.doshas.isManglikCanceled
    ? "Both charts achieve Kuja Dosha Samya (Mars energy is balanced mutually)."
    : matchResult.doshas.manglikA || matchResult.doshas.manglikB
    ? `Active Mars influence detected in ${matchResult.doshas.manglikA ? partnerAName : partnerBName}'s chart.`
    : "No adverse Mangal (Mars) afflictions detected.";

  const nadiText = matchResult.doshas.nadiDosha
    ? matchResult.doshas.isNadiCanceled
      ? "Nadi Dosha is neutralized due to Moon sign/rashi alignment."
      : "Nadi disparity present — Mahamrityunjaya Japa & health protection advised."
    : "Excellent genetic and health harmony (Nadi 8/8).";

  const bhakootText = matchResult.doshas.bhakootDosha
    ? "Bhakoot discrepancy noted — Jupiter/Vishnu Puja recommended for joint prosperity."
    : "Auspicious Bhakoot flow supporting family wealth and happiness.";

  // Generate dynamic custom AI advice
  const generateAdvice = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/ai/kundli-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: {
            name: `${partnerAName} & ${partnerBName}`,
          },
          chartType: "Personalized Relationship Advice & Dosha Guidance",
          chartData: {
            overallScore: matchResult.overallScore,
            verdict: matchResult.verdictLabel,
            ashtaKootaScore: `${matchResult.ashtaKootaScore}/36`,
            manglikStatus: manglikText,
            nadiStatus: nadiText,
            bhakootStatus: bhakootText,
            moonLords: `${matchResult.partnerA.moonSignLord} & ${matchResult.partnerB.moonSignLord}`,
            numerologyMatch: `${matchResult.numerology.synergyScore}%`,
            chineseZodiacMatch: `${matchResult.chineseZodiac.animalA} (${matchResult.chineseZodiac.elementA}) & ${matchResult.chineseZodiac.animalB} (${matchResult.chineseZodiac.elementB})`
          },
          language: selectedLanguage
        })
      });

      const data = await response.json();
      if (data.analysis || data.report) {
        setCustomAdvice(data.analysis || data.report);
        setIsGenerating(false);
        return;
      }
    } catch (err) {
      console.warn("Using fallback AI relationship advice synthesis", err);
    }

    // Default synthesized advice if offline or error
    setTimeout(() => {
      setCustomAdvice(null); // Will render default structured advice cards
      setIsGenerating(false);
    }, 600);
  };

  const handleCopyAdvice = () => {
    const textToCopy = customAdvice || `
AI Relationship Guidance for ${partnerAName} & ${partnerBName} (Overall Match: ${matchResult.overallScore}%):

1. Communication: ${matchResult.partnerA.gana} & ${matchResult.partnerB.gana} temperaments require open dialog during Mars transitions.
2. Financial Alignment: ${bhakootText}
3. Intimacy & Warmth: Yoni score ${matchResult.ashtaKootaBreakdown.find(k => k.name.includes("Yoni"))?.scored || 3}/4 indicates natural physical resonance.
4. Prescribed Rituals: ${matchResult.doshas.doshaRemedies.join(" | ")}
`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-rose-950 to-slate-950 p-6 sm:p-8 rounded-3xl border border-rose-500/20 text-white shadow-xl space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-rose-500/20 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-wider">
            <Bot className="w-3.5 h-3.5 text-rose-400" />
            AI-Powered Relationship Advice Engine
          </div>
          <h3 className="font-serif text-2xl font-bold text-rose-100 flex items-center gap-2">
            Personalized Guidance & Remedies for {partnerAName} & {partnerBName}
          </h3>
          <p className="text-xs text-rose-200/70">
            Synthesized dynamically based on active Doshas, Moon Sign Lords ({matchResult.partnerA.moonSignLord} / {matchResult.partnerB.moonSignLord}), Life Paths ({matchResult.numerology.lifePathA} & {matchResult.numerology.lifePathB}), and Chinese Five Elements.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={generateAdvice}
            disabled={isGenerating}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 hover:brightness-110 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${isGenerating ? "animate-spin text-amber-300" : "text-amber-200"}`} />
            {isGenerating ? "Synthesizing AI Insights..." : "Refresh AI Advice"}
          </button>

          <button
            onClick={handleCopyAdvice}
            className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-rose-200 text-xs font-bold transition-all cursor-pointer"
            title="Copy Advice"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ACTIVE PLANETARY & DOSHA HIGHLIGHT BADGES */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white/5 p-3.5 rounded-2xl border border-rose-400/20 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-rose-200 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              Mars (Manglik) Alignment
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              matchResult.doshas.isManglikCanceled ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"
            }`}>
              {matchResult.doshas.isManglikCanceled ? "Balanced" : "Active"}
            </span>
          </div>
          <p className="text-[11px] text-rose-100/70 leading-tight">{manglikText}</p>
        </div>

        <div className="bg-white/5 p-3.5 rounded-2xl border border-rose-400/20 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-rose-200 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-400" />
              Nadi & Genetic Health
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              !matchResult.doshas.nadiDosha ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"
            }`}>
              {!matchResult.doshas.nadiDosha ? "Harmonious" : "Dosha Present"}
            </span>
          </div>
          <p className="text-[11px] text-rose-100/70 leading-tight">{nadiText}</p>
        </div>

        <div className="bg-white/5 p-3.5 rounded-2xl border border-rose-400/20 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-rose-200 flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              Bhakoot Prosperity
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              !matchResult.doshas.bhakootDosha ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"
            }`}>
              {!matchResult.doshas.bhakootDosha ? "Prosperous" : "Shanti Needed"}
            </span>
          </div>
          <p className="text-[11px] text-rose-100/70 leading-tight">{bhakootText}</p>
        </div>
      </div>

      {/* CUSTOM AI TEXT OR STRUCTURED CATEGORY PILLARS */}
      {customAdvice ? (
        <div className="bg-white/5 p-5 rounded-2xl border border-amber-400/30 text-xs sm:text-sm text-rose-100 leading-relaxed whitespace-pre-line font-sans">
          {customAdvice}
        </div>
      ) : (
        <div className="space-y-4">
          {/* CATEGORY TABS */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-bold border-b border-rose-500/20 pb-2">
            {[
              { id: "communication", label: "💬 Communication & Ego Balance", icon: MessageSquare },
              { id: "finance", label: "💰 Financial & Domestic Growth", icon: Coins },
              { id: "intimacy", label: "❤️ Intimacy & Emotional Bonding", icon: HeartHandshake },
              { id: "remedies", label: "🛡️ Astrological Remedies", icon: ShieldAlert }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? "bg-amber-400 text-slate-950 font-extrabold shadow-md"
                    : "bg-white/5 text-rose-200 hover:bg-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* TAB 1: COMMUNICATION & EGO */}
          {activeCategory === "communication" && (
            <div className="bg-white/5 p-5 rounded-2xl border border-rose-500/20 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
                <span className="font-serif font-bold text-amber-300 text-sm">
                  Temperament Strategy: {matchResult.partnerA.gana} & {matchResult.partnerB.gana}
                </span>
                <span className="text-[10px] bg-rose-500/20 text-rose-200 px-2 py-0.5 rounded-full font-bold">
                  Graha Maitri: {matchResult.ashtaKootaBreakdown.find(k => k.name.includes("Maitri"))?.scored || 3.5}/5 Pts
                </span>
              </div>

              <ul className="space-y-2 text-xs text-rose-100/90 leading-relaxed font-sans">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Lord Alignment:</strong> {partnerAName} is guided by <strong>{matchResult.partnerA.moonSignLord}</strong>, while {partnerBName} is guided by <strong>{matchResult.partnerB.moonSignLord}</strong>. Establish clear ground rules when debating major life decisions to honor both analytical and intuitive perspectives.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Conflict Resolution:</strong> During Mars or Rahu transits, avoid sudden decisions. Allow a 24-hour cooling-off period to prevent ego friction between {matchResult.partnerA.gana} and {matchResult.partnerB.gana} energy dynamics.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Life Path Synergy:</strong> Life Path {matchResult.numerology.lifePathA} ({partnerAName}) and Life Path {matchResult.numerology.lifePathB} ({partnerBName}) thrive when expressing gratitude weekly through shared creative hobbies.
                  </span>
                </li>
              </ul>
            </div>
          )}

          {/* TAB 2: FINANCE & DOMESTIC GROWTH */}
          {activeCategory === "finance" && (
            <div className="bg-white/5 p-5 rounded-2xl border border-rose-500/20 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
                <span className="font-serif font-bold text-amber-300 text-sm">
                  Wealth & Home Feng Shui (Kua {matchResult.chineseZodiac.kuaA} & Kua {matchResult.chineseZodiac.kuaB})
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-200 px-2 py-0.5 rounded-full font-bold">
                  Bhakoot Score: {matchResult.ashtaKootaBreakdown.find(k => k.name.includes("Bhakoot"))?.scored || 7}/7 Pts
                </span>
              </div>

              <ul className="space-y-2 text-xs text-rose-100/90 leading-relaxed font-sans">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Home Direction & Feng Shui:</strong> Align master bedroom headboards facing South-East or North-East to balance {partnerAName}'s ({matchResult.chineseZodiac.groupA}) and {partnerBName}'s ({matchResult.chineseZodiac.groupB}) directional frequencies.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Financial Synergies:</strong> Combine joint long-term investments under auspicious Venus-Jupiter muhurats. Maintain individual discretionary accounts to nurture numerical expression independence ({matchResult.numerology.expressionA} & {matchResult.numerology.expressionB}).
                  </span>
                </li>
              </ul>
            </div>
          )}

          {/* TAB 3: INTIMACY & WARMTH */}
          {activeCategory === "intimacy" && (
            <div className="bg-white/5 p-5 rounded-2xl border border-rose-500/20 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
                <span className="font-serif font-bold text-amber-300 text-sm">
                  Yoni & Instinctive Warmth: {matchResult.partnerA.yoni} & {matchResult.partnerB.yoni}
                </span>
                <span className="text-[10px] bg-rose-500/20 text-rose-200 px-2 py-0.5 rounded-full font-bold">
                  Physical Harmony: {matchResult.ashtaKootaBreakdown.find(k => k.name.includes("Yoni"))?.scored || 3}/4 Pts
                </span>
              </div>

              <ul className="space-y-2 text-xs text-rose-100/90 leading-relaxed font-sans">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Instinctive Bonding:</strong> The match between {matchResult.partnerA.yoni} ({partnerAName}) and {matchResult.partnerB.yoni} ({partnerBName}) grants steady, affectionate loyalty. Prioritize quality one-on-one retreats away from work stress.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Chinese Animal Synergy:</strong> {matchResult.chineseZodiac.animalA} ({matchResult.chineseZodiac.elementA}) and {matchResult.chineseZodiac.animalB} ({matchResult.chineseZodiac.elementB}) resonate as {matchResult.chineseZodiac.compatibilityType}.
                  </span>
                </li>
              </ul>
            </div>
          )}

          {/* TAB 4: REMEDIES */}
          {activeCategory === "remedies" && (
            <div className="bg-white/5 p-5 rounded-2xl border border-rose-500/20 space-y-3 animate-in fade-in">
              <span className="font-serif font-bold text-amber-300 text-sm block border-b border-rose-500/20 pb-2">
                Prescribed Vedic & Gemstone Protection Rituals
              </span>

              <div className="space-y-2 text-xs text-rose-100 font-mono">
                {matchResult.doshas.doshaRemedies.map((rem, idx) => (
                  <p key={idx} className="bg-white/5 p-2.5 rounded-xl border border-rose-400/20">
                    {rem}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* THREE DAILY ACTIONABLE COUPLE HABITS */}
      <div className="bg-amber-400/10 p-4 rounded-2xl border border-amber-400/30 text-xs space-y-2">
        <span className="font-bold text-amber-300 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
          <Lightbulb className="w-4 h-4 text-amber-300" />
          Recommended Daily Micro-Habits for {partnerAName} & {partnerBName}
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-rose-100">
          <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
            <strong className="text-amber-300 text-[11px] block">1. Morning Sun Salutation</strong>
            <p className="text-[10px] text-rose-200/80">Offer water to the rising Sun together every Sunday morning for vitality & mutual respect.</p>
          </div>
          <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
            <strong className="text-amber-300 text-[11px] block">2. Camphor Evening Cleansing</strong>
            <p className="text-[10px] text-rose-200/80">Burn a small piece of natural camphor in the bedroom at sunset to eliminate residual stress energy.</p>
          </div>
          <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
            <strong className="text-amber-300 text-[11px] block">3. Thursday Charity</strong>
            <p className="text-[10px] text-rose-200/80">Donate yellow sweets or grains on Thursdays to invoke Lord Jupiter's grace for marital stability.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
