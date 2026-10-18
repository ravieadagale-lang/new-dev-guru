import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UserProfile } from "../types";
import {
  ALL_SACRED_FESTIVALS,
  FestivalEvent,
  FestivalRemedy,
  getFestivalTimingStatus,
  getSmartFestivalFocus
} from "../data/festivalsRemediesData";
import { 
  Sparkles, 
  Flame, 
  Sun, 
  Moon, 
  Calendar, 
  CheckCircle2, 
  ShieldAlert, 
  Crown, 
  BookOpen, 
  Volume2, 
  Copy, 
  Check, 
  ChevronRight, 
  Zap, 
  Award, 
  Clock, 
  Heart, 
  Star,
  Info,
  Layers,
  ArrowRight,
  BellRing,
  ShoppingBag,
  Compass,
  CheckSquare
} from "lucide-react";

interface PanchangFestivalRemediesWidgetProps {
  userProfile?: UserProfile;
  selectedDate?: string; // YYYY-MM-DD from Panchang date selector
  onSelectRemedy?: (remedyName: string) => void;
}

export const PanchangFestivalRemediesWidget: React.FC<PanchangFestivalRemediesWidgetProps> = ({
  userProfile,
  selectedDate: propSelectedDate,
  onSelectRemedy
}) => {
  // Current date fallback to today if not provided via props
  const todayISO = useMemo(() => {
    return new Date().toISOString().split("T")[0];
  }, []);

  const [internalDate, setInternalDate] = useState<string>(propSelectedDate || todayISO);

  // Sync when propSelectedDate changes from parent PanchangWidget
  useEffect(() => {
    if (propSelectedDate) {
      setInternalDate(propSelectedDate);
    }
  }, [propSelectedDate]);

  // Compute smart festival focus (Active Today > Eve Tomorrow > Next Upcoming)
  const smartFocus = useMemo(() => {
    return getSmartFestivalFocus(internalDate);
  }, [internalDate]);

  // Active festival selection state
  const [selectedFestivalId, setSelectedFestivalId] = useState<string>(smartFocus.primaryFestival.id);
  const [activeRemedyIdx, setActiveRemedyIdx] = useState<number>(0);
  const [copiedMantra, setCopiedMantra] = useState<boolean>(false);
  const [japaCount, setJapaCount] = useState<number>(0);
  const [showEveChecklist, setShowEveChecklist] = useState<boolean>(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("active_first");

  // Keep selected festival synchronized when the date changes
  useEffect(() => {
    // If the currently selected festival is completed on the new date, switch to the smart focus
    const currentFest = ALL_SACRED_FESTIVALS.find(f => f.id === selectedFestivalId);
    if (!currentFest) {
      setSelectedFestivalId(smartFocus.primaryFestival.id);
      setActiveRemedyIdx(0);
      return;
    }

    const { status } = getFestivalTimingStatus(currentFest, internalDate);
    if (status === "completed") {
      // Don't linger on an expired/completed festival; automatically advance to the active or next one!
      setSelectedFestivalId(smartFocus.primaryFestival.id);
      setActiveRemedyIdx(0);
    }
  }, [internalDate, smartFocus.primaryFestival.id, selectedFestivalId]);

  const activeFestival = useMemo(() => {
    return ALL_SACRED_FESTIVALS.find(f => f.id === selectedFestivalId) || smartFocus.primaryFestival;
  }, [selectedFestivalId, smartFocus.primaryFestival]);

  const timingInfo = useMemo(() => {
    return getFestivalTimingStatus(activeFestival, internalDate);
  }, [activeFestival, internalDate]);

  const activeRemedy: FestivalRemedy = useMemo(() => {
    return activeFestival.remedies[activeRemedyIdx] || activeFestival.remedies[0];
  }, [activeFestival, activeRemedyIdx]);

  const handleCopyMantra = (mantraText: string) => {
    navigator.clipboard.writeText(mantraText);
    setCopiedMantra(true);
    setTimeout(() => setCopiedMantra(false), 2000);
  };

  const incrementJapa = () => {
    if (japaCount < 108) {
      setJapaCount(prev => prev + 1);
    } else {
      setJapaCount(0); // reset
    }
  };

  // Filter festivals for the top navigation selector
  const visibleFestivals = useMemo(() => {
    if (categoryFilter === "active_first") {
      // Prioritize active today, eve, and next upcoming first
      const todayOrEve = ALL_SACRED_FESTIVALS.filter(f => {
        const s = getFestivalTimingStatus(f, internalDate).status;
        return s === "today" || s === "eve";
      });
      const others = ALL_SACRED_FESTIVALS.filter(f => {
        const s = getFestivalTimingStatus(f, internalDate).status;
        return s !== "today" && s !== "eve";
      });
      return [...todayOrEve, ...others];
    }
    if (categoryFilter === "muhurta") {
      return ALL_SACRED_FESTIVALS.filter(f => f.category === "muhurta");
    }
    return ALL_SACRED_FESTIVALS;
  }, [categoryFilter, internalDate]);

  return (
    <div className="bg-gradient-to-br from-[#1F1914] via-[#2A211B] to-[#14100D] rounded-3xl p-6 sm:p-8 border border-amber-500/40 text-amber-100 shadow-2xl relative overflow-hidden space-y-6">
      {/* Background Sacred Glow */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER SECTION WITH DYNAMIC TIMING LOGIC */}
      <div className="space-y-4 border-b border-amber-500/30 pb-5 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-bold uppercase tracking-widest">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              Sacred Festivals, Muhurtas & Ancient Remedies
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
                {activeFestival.nameHi}
              </h2>

              {/* TIMING STATUS PILL */}
              {timingInfo.status === "today" && (
                <span className="text-xs bg-rose-500/25 text-rose-300 border border-rose-500/50 px-3 py-1 rounded-full font-bold flex items-center gap-1.5 animate-pulse shadow-md">
                  <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                  Active Today! (आज का महापर्व)
                </span>
              )}

              {timingInfo.status === "eve" && (
                <span className="text-xs bg-amber-500/25 text-amber-300 border border-amber-500/50 px-3 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-md">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Tomorrow / Eve Preparation (कल का पावन पर्व - पूर्व संध्या)
                </span>
              )}

              {timingInfo.status === "upcoming" && (
                <span className="text-xs bg-sky-500/20 text-sky-300 border border-sky-500/40 px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  Upcoming in {timingInfo.daysUntil} Days ({activeFestival.dateDisplay})
                </span>
              )}

              {timingInfo.status === "completed" && (
                <span className="text-xs bg-slate-800/80 text-slate-400 border border-slate-700 px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
                  Concluded for Current Cycle (सम्पन्न)
                </span>
              )}
            </div>

            <p className="text-xs text-amber-200/80 font-serif max-w-3xl leading-relaxed">
              {activeFestival.significanceHi}
            </p>
          </div>

          {/* QUICK FESTIVAL OCCASION CHIPS */}
          <div className="flex flex-col items-start lg:items-end gap-2 shrink-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400/80 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Select Sacred Occasion:</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 max-w-md">
              {visibleFestivals.map((fest) => {
                const festTiming = getFestivalTimingStatus(fest, internalDate);
                const isSelected = selectedFestivalId === fest.id;

                let badgeColor = "bg-slate-950/80 text-amber-200 border-slate-800";
                if (isSelected) {
                  badgeColor = "bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-lg scale-105";
                } else if (festTiming.status === "today") {
                  badgeColor = "bg-rose-950/60 text-rose-200 border-rose-500/50 hover:border-rose-400";
                } else if (festTiming.status === "eve") {
                  badgeColor = "bg-amber-950/60 text-amber-200 border-amber-500/50 hover:border-amber-400";
                }

                return (
                  <button
                    key={fest.id}
                    onClick={() => {
                      setSelectedFestivalId(fest.id);
                      setActiveRemedyIdx(0);
                    }}
                    className={`px-2.5 py-1.5 rounded-xl text-xs transition-all cursor-pointer border flex items-center gap-1 ${badgeColor}`}
                    title={`${fest.name} (${fest.dateDisplay})`}
                  >
                    <span>{fest.name.split(" ")[0]}</span>
                    {festTiming.status === "today" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                    )}
                    {festTiming.status === "eve" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* DATE TESTING & VERIFICATION BAR */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[11px] bg-black/40 px-3.5 py-2 rounded-xl border border-amber-500/20">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              Calendar Reference Date:
            </span>
            <input
              type="date"
              value={internalDate}
              onChange={(e) => setInternalDate(e.target.value)}
              className="bg-amber-950/80 border border-amber-500/40 rounded-lg px-2 py-0.5 text-amber-200 text-xs focus:outline-hidden"
            />
            {internalDate !== todayISO && (
              <button
                onClick={() => setInternalDate(todayISO)}
                className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold text-[10px] hover:bg-amber-400 cursor-pointer"
              >
                Reset to Today
              </button>
            )}
          </div>

          {/* QUICK DEMO JUMP TO VERIFY SPECIFIC FESTIVALS & EVES */}
          <div className="flex flex-wrap items-center gap-1 text-[10px] text-amber-300/80">
            <span className="opacity-70">Quick Jump:</span>
            <button
              onClick={() => setInternalDate("2026-09-13")}
              className={`px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                internalDate === "2026-09-13" ? "bg-amber-500 text-slate-950 border-amber-400 font-bold" : "bg-slate-900 border-slate-700 hover:border-amber-400"
              }`}
            >
              13 Sept (Eve: Ganesh Chaturthi)
            </button>
            <button
              onClick={() => setInternalDate("2026-09-14")}
              className={`px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                internalDate === "2026-09-14" ? "bg-rose-500 text-white border-rose-400 font-bold" : "bg-slate-900 border-slate-700 hover:border-amber-400"
              }`}
            >
              14 Sept (Ganesh Chaturthi)
            </button>
            <button
              onClick={() => setInternalDate("2026-10-18")}
              className={`px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                internalDate === "2026-10-18" ? "bg-amber-500 text-slate-950 border-amber-400 font-bold" : "bg-slate-900 border-slate-700 hover:border-amber-400"
              }`}
            >
              18 Oct (Ravi Pushya)
            </button>
            <button
              onClick={() => setInternalDate("2026-10-20")}
              className={`px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                internalDate === "2026-10-20" ? "bg-amber-500 text-slate-950 border-amber-400 font-bold" : "bg-slate-900 border-slate-700 hover:border-amber-400"
              }`}
            >
              20 Oct (Dussehra)
            </button>
            <button
              onClick={() => setInternalDate("2026-11-08")}
              className={`px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                internalDate === "2026-11-08" ? "bg-amber-500 text-slate-950 border-amber-400 font-bold" : "bg-slate-900 border-slate-700 hover:border-amber-400"
              }`}
            >
              8 Nov (Diwali)
            </button>
            <button
              onClick={() => setInternalDate("2027-05-09")}
              className={`px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                internalDate === "2027-05-09" ? "bg-amber-500 text-slate-950 border-amber-400 font-bold" : "bg-slate-900 border-slate-700 hover:border-amber-400"
              }`}
            >
              9 May 2027 (Akshaya Tritiya)
            </button>
          </div>
        </div>
      </div>

      {/* SPECIAL CALLOUT BANNER: DAY BEFORE (EVE) OR ACTIVE TODAY */}
      {(timingInfo.status === "eve" || timingInfo.status === "today") && (
        <div className={`p-4 rounded-2xl border ${
          timingInfo.status === "today"
            ? "bg-rose-950/40 border-rose-500/40 text-rose-100"
            : "bg-amber-950/40 border-amber-500/40 text-amber-100"
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="font-bold flex items-center gap-2 text-sm">
                {timingInfo.status === "today" ? (
                  <>
                    <Flame className="w-4 h-4 text-rose-400 animate-pulse" />
                    <span>महापर्व आज सक्रिय है • Auspicious Day for Remedial Abhishekam &amp; Fasting</span>
                  </>
                ) : (
                  <>
                    <BellRing className="w-4 h-4 text-amber-400 animate-bounce" />
                    <span>पर्व पूर्व संध्या (Day Before Eve) • Complete All Samagri &amp; Altar Readiness Today!</span>
                  </>
                )}
              </div>
              <p className="text-xs opacity-90 font-serif">
                {timingInfo.status === "today"
                  ? `Today is ${activeFestival.name} (${activeFestival.tithiHi}). Perform the remedies below during indicated auspicious muhurtas.`
                  : `Tomorrow is ${activeFestival.name} (${activeFestival.tithiHi}). Review the preparation checklist below so you are fully prepared before Brahma Muhurat.`}
              </p>
            </div>

            {timingInfo.status === "eve" && (
              <button
                onClick={() => setShowEveChecklist(prev => !prev)}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold shrink-0 hover:bg-amber-400 transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-center"
              >
                <CheckSquare className="w-3.5 h-3.5" />
                <span>{showEveChecklist ? "Hide Eve Checklist" : "Show Eve Checklist"}</span>
              </button>
            )}
          </div>

          {/* EXPANDABLE EVE PREPARATION CHECKLIST */}
          <AnimatePresence>
            {timingInfo.status === "eve" && showEveChecklist && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-3 border-t border-amber-500/30 space-y-3"
              >
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                  <span>{activeFestival.eveGuidance.titleHi}</span>
                </div>
                <p className="text-xs text-amber-200/90 font-serif">
                  {activeFestival.eveGuidance.summary}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeFestival.eveGuidance.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-black/40 p-2.5 rounded-xl border border-amber-900/40 text-amber-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] text-amber-300/80 bg-amber-950/60 p-2.5 rounded-xl border border-amber-500/30 font-serif">
                  <strong>💡 Scriptural Directive for Tonight:</strong> {activeFestival.eveGuidance.recommendedPreparation}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* AUSPICIOUS MUHURTA WINDOWS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(activeFestival?.muhurtaHighlights || []).map((muhurta, idx) => (
          <div key={idx} className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-1">
            <div className="text-amber-400 font-bold text-xs flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{muhurta.label}</span>
            </div>
            <div className="font-mono font-bold text-sm text-amber-100">{muhurta.timing}</div>
            <div className="text-[11px] text-amber-200/70">{muhurta.description}</div>
          </div>
        ))}
      </div>

      {/* MAIN REMEDIES DISPLAY CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* LEFT COLUMN: REMEDY SELECTOR TABS */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Select Ancient Remedy ({activeFestival?.remedies?.length ?? 0}):</span>
          </div>

          <div className="space-y-2">
            {(activeFestival?.remedies || []).map((remedy, idx) => {
              const isSelected = activeRemedyIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveRemedyIdx(idx);
                    if (onSelectRemedy) onSelectRemedy(remedy.title);
                  }}
                  className={`w-full p-4 rounded-2xl text-left transition-all border cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? "bg-gradient-to-r from-amber-950/90 via-amber-900/60 to-[#1F1914] border-amber-500 text-amber-100 shadow-xl"
                      : "bg-[#14100D]/90 border-amber-900/30 text-amber-200/80 hover:bg-[#1A1511]"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-400" />
                  )}
                  <div className="text-xs font-bold text-amber-300 mb-0.5">
                    Remedy #{idx + 1}
                  </div>
                  <div className="font-serif font-bold text-sm text-amber-100">
                    {remedy.titleHi}
                  </div>
                  <div className="text-[11px] text-amber-200/60 mt-1 line-clamp-1">
                    🎯 {remedy.targetDosha}
                  </div>
                </button>
              );
            })}
          </div>

          {/* RASHI IMPRINT BADGE */}
          {userProfile?.rashi && (
            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/20 text-xs text-amber-200/90 space-y-1">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Special Guidance for {userProfile.rashi} Rashi</span>
              </div>
              <p className="text-[11px] text-amber-200/70 leading-relaxed font-serif">
                Performing this sacred ritual during the {activeFestival.name} window neutralizes planetary heat in your Rashi lord transit and fortifies your Moon center.
              </p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: DETAILED REMEDY PROCEDURE & MANTRA JAPA COUNTER */}
        <div className="lg:col-span-8 bg-[#120F0D] p-6 sm:p-8 rounded-3xl border border-amber-500/30 space-y-6 shadow-2xl">
          {/* REMEDY TITLE & BENEFITS */}
          <div className="border-b border-amber-900/40 pb-4 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold">
                🎯 Target: {activeRemedy.targetDosha}
              </span>
              <span className="text-xs text-amber-300 font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {activeRemedy.bestTime}
              </span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-100">
              {activeRemedy.titleHi} ({activeRemedy.title})
            </h3>

            <p className="text-xs sm:text-sm text-emerald-200/90 bg-emerald-950/30 p-3 rounded-xl border border-emerald-500/30 font-serif">
              <strong>✨ Ancient Scriptural Benefits:</strong> {activeRemedy.benefits}
            </p>
          </div>

          {/* REQUIRED SACRED MATERIALS (SAMAGRI) */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Required Sacred Materials (पूजा सामग्री):</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(activeRemedy?.materials || []).map((mat, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-200 text-xs font-medium"
                >
                  • {mat}
                </span>
              ))}
            </div>
          </div>

          {/* STEP-BY-STEP PROCEDURE (विधि) */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Step-by-Step Ancient Procedure (अचूक शास्त्रीय विधि):</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-serif bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
              {activeRemedy.procedure}
            </p>
          </div>

          {/* SACRED BEEJ MANTRA & INTERACTIVE 108 JAPA COUNTER */}
          <div className="bg-gradient-to-r from-amber-950/60 via-slate-950 to-amber-950/60 p-5 rounded-2xl border border-amber-500/40 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span>Sacred Chanting Mantra (सिद्ध मंत्र):</span>
              </div>

              <button
                onClick={() => handleCopyMantra(activeRemedy.mantra)}
                className="px-2.5 py-1 rounded-lg bg-amber-900/60 hover:bg-amber-800 border border-amber-500/40 text-amber-200 text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                {copiedMantra ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-300" />
                    <span>Copy Mantra</span>
                  </>
                )}
              </button>
            </div>

            <div className="font-serif text-sm sm:text-base text-amber-200 text-center font-bold tracking-wide leading-relaxed bg-slate-950 p-4 rounded-xl border border-amber-500/30">
              "{activeRemedy.mantra}"
            </div>

            {/* 108 JAPA ROSARY COUNTER */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-amber-900/40">
              <div className="flex items-center gap-3">
                <div className="text-xs text-amber-300 font-semibold">108 Mala Japa Tracker:</div>
                <div className="px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono font-bold text-sm">
                  {japaCount} / 108
                </div>
              </div>

              <button
                onClick={incrementJapa}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:from-amber-400 hover:to-amber-300 transition-all cursor-pointer"
              >
                <Flame className="w-4 h-4 text-slate-950" />
                <span>{japaCount === 108 ? "Mala Completed! (Click to Reset)" : "Tap to Count 1 Bead (जाप करें)"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
