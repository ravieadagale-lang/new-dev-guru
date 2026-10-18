import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UserProfile } from "../types";
import {
  generateMasterVedicAstrologyReport,
  MasterAstrologyReportPayload,
  MasterVedicCalculationInput,
} from "../engine";
import {
  Sparkles,
  Download,
  Copy,
  Check,
  Flame,
  Moon,
  Sun,
  Shield,
  Award,
  Layers,
  Compass,
  Zap,
  Activity,
  AlertCircle,
  FileJson,
  Eye,
  BookOpen,
  Anchor,
  CircleDot,
  CheckCircle2,
  Calendar,
  Gem,
  Clock,
} from "lucide-react";

interface MasterVedicDossierViewerProps {
  userProfile: UserProfile;
}

export const MasterVedicDossierViewer: React.FC<MasterVedicDossierViewerProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "uchha_combust" | "avakahada_paya" | "vargottama_pushkar" | "atmakaraka" | "ashtakavarga" | "dasha_gochar" | "json"
  >("overview");

  const [copied, setCopied] = useState(false);
  const [selectedPlanetKey, setSelectedPlanetKey] = useState<string>("Sun");

  // Parse birth details from userProfile
  const reportPayload: MasterAstrologyReportPayload = useMemo(() => {
    let year = 1995, month = 5, day = 15, hour = 14, minute = 30;
    const dobString = (userProfile as any).birthDate || userProfile.dob;
    if (dobString) {
      const parts = dobString.split("-");
      if (parts.length === 3) {
        year = parseInt(parts[0], 10) || 1995;
        month = parseInt(parts[1], 10) || 5;
        day = parseInt(parts[2], 10) || 15;
      }
    }
    const timeString = (userProfile as any).birthTime || userProfile.time;
    if (timeString) {
      const tParts = timeString.split(":");
      if (tParts.length >= 2) {
        hour = parseInt(tParts[0], 10) || 12;
        minute = parseInt(tParts[1], 10) || 0;
      }
    }

    const input: MasterVedicCalculationInput = {
      name: userProfile.name || "Sadhaka",
      year,
      month,
      day,
      hour,
      minute,
      latitude: userProfile.latitude || 28.6139,
      longitude: userProfile.longitude || 77.2090,
      timezoneOffsetHours: (userProfile as any).timezoneOffset ?? 5.5,
      cityName: (userProfile as any).birthPlace || userProfile.place || "New Delhi, India",
      ayanamsa: (userProfile as any).ayanamsa || "lahiri",
    };

    return generateMasterVedicAstrologyReport(input);
  }, [userProfile]);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(reportPayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportPayload, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${userProfile.name || "Vedic"}_Master_Astrology_Dossier.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const calc = reportPayload.calculations;
  const interp = reportPayload.interpreted_report;

  return (
    <div id="master-vedic-dossier-root" className="bg-slate-900 border border-amber-500/30 rounded-2xl p-4 sm:p-6 md:p-8 text-slate-100 shadow-2xl space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> High-Precision Astronomical Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-100">
            Master Vedic Astrological & Synthetic Dossier
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            Complete self-hosted mathematical computations: Uchha/Neecha NBRY, Astha Graha, 108 Janmakshars, Paya, Graha Samayas, D1–D60, Pushkar Bhaga, and Triple-Layer Transit Synthesis.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            id="copy-master-json-btn"
            onClick={handleCopyJson}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-sm"
            title="Copy Complete Report JSON payload to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? "JSON Copied!" : "Copy Full JSON"}
          </button>
          <button
            id="download-master-json-btn"
            onClick={handleDownloadJson}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-semibold rounded-xl text-xs sm:text-sm transition-all shadow-md"
            title="Download Full JSON Payload File"
          >
            <Download className="w-4 h-4" /> Download JSON Payload
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-thin">
        {[
          { id: "overview", label: "Executive Synthesis", icon: Compass },
          { id: "uchha_combust", label: "Uchha, Neecha & Astha", icon: Flame },
          { id: "avakahada_paya", label: "Janmakshar & Paya", icon: Moon },
          { id: "vargottama_pushkar", label: "Pushkar & Vargottama", icon: Award },
          { id: "atmakaraka", label: "Karmic Debt & AK", icon: Shield },
          { id: "ashtakavarga", label: "SAV Exploitation", icon: Layers },
          { id: "dasha_gochar", label: "Dasha × Transit Gochar", icon: Activity },
          { id: "json", label: "Raw JSON Inspector", icon: FileJson },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-btn-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-inner"
                  : "bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {/* TAB 1: EXECUTIVE SYNTHESIS */}
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            {/* High Level Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-4 space-y-2">
                <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-4 h-4" /> Lagna (Ascendant)
                </div>
                <div className="text-lg font-bold text-white">
                  {calc.baseChartD1.ascendant.signName} ({calc.baseChartD1.ascendant.dms})
                </div>
                <p className="text-xs text-slate-300">
                  Ruled by <span className="text-amber-300 font-medium">{calc.baseChartD1.ascendant.signLord}</span> in House {calc.baseChartD1.planets[calc.baseChartD1.ascendant.signLord]?.house || 1}.
                </p>
                <p className="text-xs text-slate-400">{interp.executive_summary.ascendantTheme}</p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-4 space-y-2">
                <div className="text-xs text-blue-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Moon className="w-4 h-4" /> Janma Rashi & Nakshatra
                </div>
                <div className="text-lg font-bold text-white">
                  {calc.baseChartD1.planets.Moon?.signName} • {calc.baseChartD1.planets.Moon?.nakshatraName}
                </div>
                <p className="text-xs text-slate-300">
                  Pada {calc.baseChartD1.planets.Moon?.pada} | Seed: <span className="text-amber-300 font-bold">"{calc.avakahadaChakra.janmakshar}"</span>
                </p>
                <p className="text-xs text-slate-400">{interp.executive_summary.moonTheme}</p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-4 space-y-2">
                <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Overall Destiny Rating
                </div>
                <div className="text-lg font-bold text-emerald-300">
                  {interp.executive_summary.overallDestinyRating}
                </div>
                <p className="text-xs text-slate-300">
                  Paya Footing: <span className="text-amber-300 font-medium">{calc.payaCalculation.paya}</span>
                </p>
                <p className="text-xs text-slate-400">{calc.payaCalculation.quality}</p>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-800/50 border border-slate-700/40 rounded-lg p-3 text-center">
                <div className="text-xs text-slate-400">Julian Day (JD)</div>
                <div className="text-sm font-mono font-bold text-amber-300">{reportPayload.metadata.julianDay}</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/40 rounded-lg p-3 text-center">
                <div className="text-xs text-slate-400">Ayanamsa ({reportPayload.metadata.ayanamsaSystem})</div>
                <div className="text-sm font-mono font-bold text-amber-300">{reportPayload.metadata.ayanamsaValueFormatted}</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/40 rounded-lg p-3 text-center">
                <div className="text-xs text-slate-400">Total SAV Points</div>
                <div className="text-sm font-mono font-bold text-emerald-400">{calc.ashtakavarga.totalPoints} / 337</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/40 rounded-lg p-3 text-center">
                <div className="text-xs text-slate-400">Vargottama / Pushkar</div>
                <div className="text-sm font-mono font-bold text-purple-300">
                  {interp.vargottama_and_pushkar_deep_dive.totalVargottamaPlanets} V / {interp.vargottama_and_pushkar_deep_dive.totalPushkarPlacements} P
                </div>
              </div>
            </div>

            {/* Life Blueprint & Remedies Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 space-y-3">
                <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" /> Panchang Divine Blueprint
                </h4>
                <div className="text-xs text-slate-300 space-y-1.5">
                  <div><strong className="text-white">Tithi:</strong> {interp.panchang_life_blueprint.tithiSignificance}</div>
                  <div><strong className="text-white">Vara:</strong> {interp.panchang_life_blueprint.varaSignificance}</div>
                  <div><strong className="text-white">Nakshatra:</strong> {interp.panchang_life_blueprint.nakshatraDeityWisdom}</div>
                  <div><strong className="text-white">Yoga & Karana:</strong> {interp.panchang_life_blueprint.yogaLifePattern}</div>
                </div>
              </div>

              <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 space-y-3">
                <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                  <Gem className="w-4 h-4 text-emerald-400" /> Prescribed Vedic Gemstone & Mantras
                </h4>
                <div className="text-xs text-slate-300 space-y-1.5">
                  <div>
                    <strong className="text-white">Gemstone:</strong> {interp.remedial_architecture.primaryGemstone.gemstone} ({interp.remedial_architecture.primaryGemstone.sanskrit})
                  </div>
                  <div>
                    <strong className="text-white">Mounting:</strong> {interp.remedial_architecture.primaryGemstone.metal} on {interp.remedial_architecture.primaryGemstone.finger}, worn on {interp.remedial_architecture.primaryGemstone.wearingDay}.
                  </div>
                  <div>
                    <strong className="text-white">Daily Seed Mantra:</strong> <span className="font-mono text-amber-200">{interp.remedial_architecture.sacredMantras[0]?.mantraText}</span>
                  </div>
                  <div className="text-slate-400 italic">{interp.remedial_architecture.primaryGemstone.caution}</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: UCHHA, NEECHA & ASTHA (COMBUSTION) */}
        {activeTab === "uchha_combust" && (
          <motion.div
            key="uchha_combust"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Uchha & Neecha with NBRY Table */}
              <div className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" /> Uchha / Neecha & Neechabhanga Matrix
                  </h3>
                  <span className="text-[11px] text-slate-400">Deep degrees & NBRY rules</span>
                </div>

                <div className="space-y-3 overflow-y-auto max-h-[460px] pr-1">
                  {Object.entries(calc.exaltationDebilitationMetrics).map(([pName, m]) => (
                    <div key={pName} className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>{pName}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            m.isExalted ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" :
                            m.isDebilitated ? (m.hasNeechabhanga ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "bg-red-500/20 text-red-300 border border-red-500/40") :
                            "bg-slate-800 text-slate-300"
                          }`}>
                            {m.status} {m.hasNeechabhanga && "(NBRY Active)"}
                          </span>
                        </div>
                        <div className="text-slate-400 font-mono">
                          Uchha: <span className="text-emerald-400">{m.exaltationPercentage}%</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-400 flex items-center justify-between">
                        <span>Exalt Sign: {m.exaltationSign} ({m.deepExaltationDegree}°)</span>
                        <span>Debil Sign: {m.debilitationSign} ({m.deepDebilitationDegree}°)</span>
                      </div>

                      {/* NBRY details if triggered */}
                      {m.hasNeechabhanga && m.neechabhangaYogaDetails && (
                        <div className="mt-2 p-2 bg-amber-950/40 border border-amber-500/30 rounded text-[11px] text-amber-200 space-y-1">
                          <div className="font-bold flex items-center gap-1 text-amber-400">
                            <Sparkles className="w-3.5 h-3.5" /> Neechabhanga Raja Yoga ({m.neechabhangaYogaDetails.strength} Strength)
                          </div>
                          <p>{m.neechabhangaYogaDetails.summary}</p>
                          <ul className="list-disc pl-4 space-y-0.5 text-slate-300 text-[10px]">
                            {(m?.neechabhangaRulesTriggered || []).map((rule, idx) => (
                              <li key={idx}>{rule}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Astha Graha (Combustion Metrics) */}
              <div className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-400" /> Astha Graha (Combustion & Param Astha)
                  </h3>
                  <span className="text-[11px] text-slate-400">Distance from Sun</span>
                </div>

                <div className="space-y-3 overflow-y-auto max-h-[460px] pr-1">
                  {Object.entries(calc.combustionMetrics).map(([pName, c]) => (
                    <div key={pName} className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>{pName}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            c.isDeeplyCombust ? "bg-red-500/20 text-red-300 border border-red-500/40" :
                            c.isCombust ? "bg-orange-500/20 text-orange-300 border border-orange-500/40" :
                            "bg-emerald-500/10 text-emerald-300"
                          }`}>
                            {c.state}
                          </span>
                        </div>
                        <div className="text-slate-400 font-mono">
                          Dist: <span className="text-amber-300">{c.distanceFromSunDeg}°</span> (Limit: {c.combustionThresholdDeg}°)
                        </div>
                      </div>

                      {c.isCombust && (
                        <div className="w-full bg-slate-800 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${c.isDeeplyCombust ? "bg-red-500" : "bg-orange-400"}`}
                            style={{ width: `${c.combustionIntensityPercentage}%` }}
                          />
                        </div>
                      )}

                      <p className="text-[11px] text-slate-300">{c.astrologicalImpact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: AVAKAHADA CHAKRA & PAYA */}
        {activeTab === "avakahada_paya" && (
          <motion.div
            key="avakahada_paya"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Complete Avakahada Chakra */}
              <div className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-4 space-y-4">
                <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <Moon className="w-4 h-4 text-cyan-400" /> Complete Avakahada Chakra (108 Sanskrit Janmakshars)
                </h3>

                <div className="p-4 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="text-xs text-amber-400 font-semibold uppercase">Birth Seed Sound (Janmakshar)</div>
                    <div className="text-3xl font-extrabold text-amber-200 mt-1">"{calc.avakahadaChakra.janmakshar}"</div>
                    <div className="text-xs text-slate-300 mt-1">{calc.avakahadaChakra.janmaSyllableDescription}</div>
                  </div>
                  <div className="text-right text-xs text-slate-300 space-y-1">
                    <div>Nakshatra: <strong className="text-white">{calc.avakahadaChakra.nakshatraName}</strong></div>
                    <div>Pada: <strong className="text-amber-300">{calc.avakahadaChakra.nakshatraPada}</strong></div>
                    <div>Lord: <strong className="text-white">{calc.avakahadaChakra.nakshatraLord}</strong></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800">
                    <span className="text-slate-400">Varna:</span> <strong className="text-white block">{calc.avakahadaChakra.varna}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800">
                    <span className="text-slate-400">Vashya:</span> <strong className="text-white block">{calc.avakahadaChakra.vashya}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800">
                    <span className="text-slate-400">Yoni (Animal):</span> <strong className="text-white block">{calc.avakahadaChakra.yoni.animal} ({calc.avakahadaChakra.yoni.gender})</strong>
                    <span className="text-[10px] text-red-400">Enemy: {calc.avakahadaChakra.yoni.enemyAnimal}</span>
                  </div>
                  <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800">
                    <span className="text-slate-400">Gana:</span> <strong className="text-white block">{calc.avakahadaChakra.gana}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800">
                    <span className="text-slate-400">Nadi:</span> <strong className="text-white block">{calc.avakahadaChakra.nadi}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800">
                    <span className="text-slate-400">Tara:</span> <strong className="text-white block">{calc.avakahadaChakra.tara} Tara</strong>
                  </div>
                </div>
              </div>

              {/* Paya (Metallic Footing) & Graha Samayas */}
              <div className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-4 space-y-4">
                <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <Anchor className="w-4 h-4 text-emerald-400" /> Paya Calculation & Graha Samayas (100 States)
                </h3>

                {/* Paya Result Box */}
                <div className="p-4 bg-slate-900/80 border border-slate-700 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-400">Birth Metallic Footing (Paya)</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                      {calc.payaCalculation.quality}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-white">
                    {calc.payaCalculation.paya} ({calc.payaCalculation.payaSanskrit})
                  </div>
                  <p className="text-xs text-slate-300">{calc.payaCalculation.significance}</p>
                  <div className="text-[11px] text-amber-300 pt-1 border-t border-slate-800">
                    <strong>Remedial Advice:</strong> {calc.payaCalculation.remedialAdvice}
                  </div>
                </div>

                {/* Graha Samayas List */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-300">Graha Samaya Activity States:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
                    {Object.values(calc.grahaSamayas).map((samaya) => (
                      <div key={samaya.planet} className="p-2 bg-slate-900/60 border border-slate-800 rounded text-[11px] space-y-0.5">
                        <div className="flex items-center justify-between font-bold text-white">
                          <span>{samaya.planet}</span>
                          <span className="text-amber-400 font-mono text-[10px]">#{samaya.samayaNumber}</span>
                        </div>
                        <div className="text-emerald-300 font-medium">{samaya.stateName}</div>
                        <div className="text-slate-400 text-[10px]">{samaya.sanskritName} ({samaya.category})</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: PUSHKAR & VARGOTTAMA */}
        {activeTab === "vargottama_pushkar" && (
          <motion.div
            key="vargottama_pushkar"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-400" /> Pushkar Navamsha, Pushkar Bhaga & Vargottama Deep-Dive
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Sacred degrees of auspicious regeneration and soul-level vitality
                  </p>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold">
                    {interp.vargottama_and_pushkar_deep_dive.totalVargottamaPlanets} Vargottama
                  </span>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">
                    {interp.vargottama_and_pushkar_deep_dive.totalPushkarPlacements} Pushkar
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-900/80 border border-slate-700 rounded-lg text-xs text-slate-300">
                {interp.vargottama_and_pushkar_deep_dive.synthesis}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.values(calc.pushkarAndVargottamaScanner).map((item) => (
                  <div key={item.planet} className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{item.planet}</span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {item.isRashiVargottama && (
                          <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] font-semibold">
                            Rashi Vargottama
                          </span>
                        )}
                        {item.isPushkarNavamsha && (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-semibold">
                            Pushkar Navamsha
                          </span>
                        )}
                        {item.isPushkarBhaga && (
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-semibold">
                            Pushkar Bhaga
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-slate-300 text-[11px] leading-relaxed">{item.spiritualSignificance}</p>

                    <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800">
                      <span>Pushkar Bhaga Reference: {item.pushkarBhagaExactDegree}°</span>
                      <span>Distance: {item.pushkarDegreeDistance}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 5: ATMAKARAKA & KARMIC DEBT */}
        {activeTab === "atmakaraka" && (
          <motion.div
            key="atmakaraka"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Atmakaraka & Karakamsa Summary */}
              <div className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-4 space-y-4">
                <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-400" /> Atmakaraka (King of the Chart) & Karakamsa
                </h3>

                <div className="p-4 bg-slate-900 border border-amber-500/30 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-semibold">Atmakaraka Planet (AK)</div>
                      <div className="text-2xl font-extrabold text-amber-300 mt-0.5">
                        {interp.karmic_debt_and_atmakaraka_scanner.atmakarakaPlanet}
                      </div>
                    </div>
                    <div className="text-right text-xs text-slate-300">
                      <div>D1 House: <strong className="text-white">{interp.karmic_debt_and_atmakaraka_scanner.atmakarakaD1House}</strong> ({interp.karmic_debt_and_atmakaraka_scanner.atmakarakaD1Sign})</div>
                      <div>Karakamsa (D9): <strong className="text-amber-300">{interp.karmic_debt_and_atmakaraka_scanner.karakamsaSignD9}</strong></div>
                      <div>D60 Deity: <strong className="text-emerald-400">{interp.karmic_debt_and_atmakaraka_scanner.d60ShastiamshaDeity} ({interp.karmic_debt_and_atmakaraka_scanner.d60DeityNature})</strong></div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 space-y-2 text-xs">
                    <div>
                      <strong className="text-amber-400 block mb-0.5">Primary Soul Lesson:</strong>
                      <p className="text-slate-300">{interp.karmic_debt_and_atmakaraka_scanner.primarySoulLesson}</p>
                    </div>
                    <div>
                      <strong className="text-blue-400 block mb-0.5">Past-Life Karmic Imprint:</strong>
                      <p className="text-slate-300">{interp.karmic_debt_and_atmakaraka_scanner.pastLifeKarmicImprint}</p>
                    </div>
                    <div>
                      <strong className="text-emerald-400 block mb-0.5">Evolutionary Remedy:</strong>
                      <p className="text-slate-300">{interp.karmic_debt_and_atmakaraka_scanner.evolutionaryRemedy}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Jaimini 7 Chara Karakas Table */}
              <div className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-4 space-y-4">
                <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-cyan-400" /> Jaimini 7 Chara Karaka Hierarchy
                </h3>

                <div className="space-y-2">
                  {(calc?.jaiminiKarakas || []).map((k) => (
                    <div key={k.karaka} className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white">{k.karaka}</div>
                        <div className="text-[11px] text-slate-400">{k.signification}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-amber-300 font-bold">{k.planet}</div>
                        <div className="text-[10px] font-mono text-slate-400">{k.degreeInSign.toFixed(2)}° in {k.signName}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 6: ASHTAKAVARGA MATRIX EXPLOITATION */}
        {activeTab === "ashtakavarga" && (
          <motion.div
            key="ashtakavarga"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* High and Low Scoring Trigger Points */}
              <div className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-400" /> SAV Strategic Trigger Points
                  </h3>
                  <span className="text-xs font-mono text-slate-400">Total: {calc.ashtakavarga.totalPoints} pts</span>
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-semibold text-emerald-400 uppercase">
                    High Scoring Houses (≥30 pts) — Zones of Natural Compounding:
                  </div>
                  {(interp?.ashtakavarga_matrix_exploitation?.highScoringHouses || []).map((h) => (
                    <div key={h.houseNumber} className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-lg text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-white">
                        <span>House {h.houseNumber} ({h.houseSign}) — {h.lifeDomain}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-300 font-mono">{h.points} pts</span>
                      </div>
                      <p className="text-slate-300 text-[11px]">{h.strategicAdvice}</p>
                    </div>
                  ))}

                  <div className="text-xs font-semibold text-amber-400 uppercase pt-2">
                    Lower Scoring Houses (≤24 pts) — Zones Requiring Strategic Mitigation:
                  </div>
                  {(interp?.ashtakavarga_matrix_exploitation?.lowScoringHouses || []).map((h) => (
                    <div key={h.houseNumber} className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-lg text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-white">
                        <span>House {h.houseNumber} ({h.houseSign}) — {h.lifeDomain}</span>
                        <span className="px-2 py-0.5 rounded bg-amber-500/30 text-amber-300 font-mono">{h.points} pts</span>
                      </div>
                      <p className="text-slate-300 text-[11px]">{h.strategicMitigation}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Domain Specific Advice Cards */}
              <div className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-4 space-y-4">
                <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" /> Life Domain SAV Balance
                </h3>

                <div className="space-y-3 text-xs">
                  {Object.entries(interp.ashtakavarga_matrix_exploitation.domainAnalysis).map(([key, domain]) => (
                    <div key={key} className="p-3 bg-slate-900/70 border border-slate-800 rounded-lg space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                        <span className="text-amber-300 font-bold">{domain.verdict}</span>
                      </div>
                      <p className="text-slate-300 text-[11px]">{domain.guidance}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 7: DASHA & TRANSIT GOCHAR */}
        {activeTab === "dasha_gochar" && (
          <motion.div
            key="dasha_gochar"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Dasha & Saturn Transit Analysis */}
              <div className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-4 space-y-4">
                <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" /> Active Vimshottari Dasha Hierarchy
                </h3>

                <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl space-y-2 text-xs">
                  <div className="text-amber-400 font-semibold uppercase text-[11px]">Triple-Layer Active Dasha</div>
                  <div className="text-lg font-bold text-white flex items-center gap-2">
                    <span>{interp.triple_layer_dasha_and_gochar_intersection.activeDashaTimeframe.mahaDashaLord} (MD)</span>
                    <span className="text-slate-500">→</span>
                    <span className="text-amber-300">{interp.triple_layer_dasha_and_gochar_intersection.activeDashaTimeframe.antarDashaLord} (AD)</span>
                    <span className="text-slate-500">→</span>
                    <span className="text-emerald-400">{interp.triple_layer_dasha_and_gochar_intersection.activeDashaTimeframe.pratyantarDashaLord} (PD)</span>
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Valid through: {interp.triple_layer_dasha_and_gochar_intersection.activeDashaTimeframe.endDate}
                  </div>
                  <p className="text-slate-300 pt-1 border-t border-slate-800">
                    {interp.triple_layer_dasha_and_gochar_intersection.activeDashaTimeframe.rulingThemes}
                  </p>
                </div>

                {/* Saturn Sade Sati & Dhaiya Status */}
                <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 font-semibold uppercase text-[11px]">Saturn Gochar & Sade Sati</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      interp.triple_layer_dasha_and_gochar_intersection.saturnTransitAnalysis.sadeSatiStatus.startsWith("Active")
                        ? "bg-red-500/20 text-red-300 border border-red-500/40"
                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    }`}>
                      {interp.triple_layer_dasha_and_gochar_intersection.saturnTransitAnalysis.sadeSatiStatus}
                    </span>
                  </div>
                  <p className="text-slate-300">{interp.triple_layer_dasha_and_gochar_intersection.saturnTransitAnalysis.impactAssessment}</p>
                  <p className="text-slate-400 text-[11px] italic">{interp.triple_layer_dasha_and_gochar_intersection.saturnTransitAnalysis.durationAdvice}</p>
                </div>
              </div>

              {/* Jupiter & Nodal Axis Transits */}
              <div className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-4 space-y-4">
                <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" /> Jupiter & Nodal Axis (Rahu-Ketu)
                </h3>

                <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-400 font-semibold uppercase text-[11px]">Jupiter (Guru) Expansion</span>
                    <span className="text-slate-400 font-mono">Sign: {interp.triple_layer_dasha_and_gochar_intersection.jupiterTransitAnalysis.currentJupiterSign}</span>
                  </div>
                  <ul className="space-y-1 text-slate-300 text-[11px]">
                    {(interp?.triple_layer_dasha_and_gochar_intersection?.jupiterTransitAnalysis?.blessedHousesAndThemes || []).map((b, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl space-y-2 text-xs">
                  <div className="text-purple-400 font-semibold uppercase text-[11px]">Rahu-Ketu Axis Dynamics</div>
                  <p className="text-slate-300 text-[11px]">{interp.triple_layer_dasha_and_gochar_intersection.nodalAxisTransit.karmicVortices}</p>
                </div>

                <div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-lg text-xs space-y-1">
                  <div className="font-bold text-amber-300">Macro vs Micro Time-Horizon Guidance:</div>
                  <p className="text-slate-300 text-[11px]">{interp.triple_layer_dasha_and_gochar_intersection.timeHorizonForecast.macroHorizon}</p>
                  <p className="text-emerald-300 text-[11px]">{interp.triple_layer_dasha_and_gochar_intersection.timeHorizonForecast.breakthroughWindow}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 8: RAW JSON INSPECTOR */}
        {activeTab === "json" && (
          <motion.div
            key="json"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-400">
                Complete structured API payload with <span className="text-amber-300 font-mono">metadata</span>, <span className="text-emerald-300 font-mono">calculations</span>, and <span className="text-cyan-300 font-mono">interpreted_report</span> nodes.
              </div>
              <div className="flex items-center gap-2">
                <button
                  id="copy-json-inline-btn"
                  onClick={handleCopyJson}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
                <button
                  id="download-json-inline-btn"
                  onClick={handleDownloadJson}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto max-h-[600px] scrollbar-thin">
              <pre className="text-[11px] font-mono text-emerald-400/90 leading-relaxed">
                {JSON.stringify(reportPayload, null, 2)}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
