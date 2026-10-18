import React, { useState, useEffect } from "react";
import { LanguageCode } from "../types";
import { FaceReadingReport } from "../types/facereading";
import { FaceManualBuilder } from "../components/facereading/FaceManualBuilder";
import { FaceReadingReportView } from "../components/facereading/FaceReadingReportView";
import { FaceScannerModal } from "../components/facereading/FaceScannerModal";
import { FaceInteractiveCanvas } from "../components/facereading/FaceInteractiveCanvas";
import { FaceSystemDetailModal, FaceSystemSection } from "../components/facereading/FaceSystemDetailModal";
import {
  Scan,
  Camera,
  Layers,
  Sparkles,
  History,
  BookOpen,
  ChevronRight,
  Shield,
  Trash2,
  Eye,
  Sliders
} from "lucide-react";

interface FaceReaderProps {
  selectedLanguage?: LanguageCode;
  onNavigateTab?: (tab: string) => void;
}

export const FaceReader: React.FC<FaceReaderProps> = ({
  selectedLanguage = "en",
  onNavigateTab
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "manual" | "history">("overview");
  const [report, setReport] = useState<FaceReadingReport | null>(null);
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const [isSystemModalOpen, setIsSystemModalOpen] = useState<boolean>(false);
  const [systemModalSection, setSystemModalSection] = useState<FaceSystemSection>("santing");
  const [savedReports, setSavedReports] = useState<FaceReadingReport[]>(() => {
    try {
      const saved = localStorage.getItem("astro_saved_face_reports");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleReportGenerated = (newReport: FaceReadingReport) => {
    setReport(newReport);
    const updated = [newReport, ...savedReports.filter((r) => r.id !== newReport.id)].slice(0, 10);
    setSavedReports(updated);
    try {
      localStorage.setItem("astro_saved_face_reports", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteReport = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedReports.filter((r) => r.id !== id);
    setSavedReports(updated);
    try {
      localStorage.setItem("astro_saved_face_reports", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
    if (report?.id === id) {
      setReport(null);
    }
  };

  const openSystemSection = (section: FaceSystemSection) => {
    setSystemModalSection(section);
    setIsSystemModalOpen(true);
  };

  return (
    <div className="space-y-8 py-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* 1. MASTER BANNER */}
      <div className="bg-gradient-to-r from-[#171A21] via-[#242A35] to-[#171A21] rounded-3xl p-8 sm:p-10 border border-blue-500/30 text-blue-100 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>Mukha Samudrika Shastra &amp; Chinese Mian Xiang</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-blue-100 tracking-tight">
              Face Reading (Mukha Samudrika)
            </h1>
            <p className="text-blue-200/80 text-sm sm:text-base leading-relaxed">
              Unlock the secrets of your destiny, personality, and life epochs through classical physiognomy. Evaluates the Three Zones (San Ting - Heaven, Human, Earth), the Five Constitutional Elements (Wu Xing), the Twelve Palaces of Destiny, and facial landmarks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsScannerOpen(true)}
              className="px-6 py-3.5 bg-gradient-to-r from-blue-500 via-sky-400 to-blue-500 text-slate-950 rounded-2xl font-bold text-xs sm:text-sm shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Camera className="w-4 h-4 text-slate-950" />
              <span>Scan Face</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("manual");
                setReport(null);
              }}
              className="px-6 py-3.5 bg-slate-900 border border-blue-500/40 text-blue-200 rounded-2xl font-bold text-xs sm:text-sm hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-blue-300" />
              <span>Manual Builder</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. SUB NAVIGATION TABS */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2 overflow-x-auto gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab("overview");
              setReport(null);
            }}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "overview" && !report
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Scan className="w-4 h-4" />
            <span>Face Reading Overview</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("manual");
              setReport(null);
            }}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "manual" && !report
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Manual Self-Reader</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("history");
              setReport(null);
            }}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "history" && !report
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <History className="w-4 h-4" />
            <span>Saved Face Reports ({savedReports.length})</span>
          </button>
        </div>

        {report && (
          <button
            onClick={() => setReport(null)}
            className="text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200 cursor-pointer"
          >
            &larr; Back to Overview
          </button>
        )}
      </div>

      {/* 3. ACTIVE VIEW CONTENT */}
      {report ? (
        <FaceReadingReportView report={report} onReset={() => setReport(null)} />
      ) : (
        <>
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* 3 System Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. San Ting */}
                <div
                  onClick={() => openSystemSection("santing")}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-blue-900/10 shadow-lg space-y-3 flex flex-col justify-between cursor-pointer hover:border-blue-500/50 hover:shadow-xl hover:-translate-y-1 transition-all group select-none text-left"
                >
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Layers className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors">
                      San Ting (Three Realms)
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Heaven (Age 15-30: Forehead &amp; Ancestral luck), Human (Age 31-50: Nose, Eyes, Cheeks &amp; Middle life), and Earth (Age 51+: Chin, Jaw &amp; Legacy).
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                    <span>Explore 3 Zones</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 2. 12 Palaces */}
                <div
                  onClick={() => openSystemSection("palaces")}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-blue-900/10 shadow-lg space-y-3 flex flex-col justify-between cursor-pointer hover:border-blue-500/50 hover:shadow-xl hover:-translate-y-1 transition-all group select-none text-left"
                >
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-xl text-slate-900 group-hover:text-purple-600 transition-colors">
                      The 12 Palaces of Destiny
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Life Palace (Yin Tang), Wealth (Nose Tip), Career (Guan Lu), Marriage (Jian Men), Health (Shan Gen), and Travel (Yi Ma).
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600">
                    <span>Explore 12 Palaces</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 3. Wu Xing 5 Elements */}
                <div
                  onClick={() => openSystemSection("wuxing")}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-blue-900/10 shadow-lg space-y-3 flex flex-col justify-between cursor-pointer hover:border-blue-500/50 hover:shadow-xl hover:-translate-y-1 transition-all group select-none text-left"
                >
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-xl text-slate-900 group-hover:text-emerald-600 transition-colors">
                      Wu Xing (5 Elements)
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Metal (Square/Resolute), Wood (Rectangular/Philosophical), Water (Round/Intuitive), Fire (Pointed/Dynamic), and Earth (Heavy/Grounded).
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                    <span>Explore 5 Elements</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Interactive Face Canvas Demonstration */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-900/10 shadow-md space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-slate-900">
                      Interactive Facial Landmarks &amp; Map
                    </h2>
                    <p className="text-xs text-slate-500">
                      Hover and click key facial zones to discover classical Mukha Samudrika interpretations.
                    </p>
                  </div>
                </div>

                <FaceInteractiveCanvas />
              </div>
            </div>
          )}

          {activeTab === "manual" && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-blue-900/10 shadow-lg">
              <FaceManualBuilder onReportGenerated={handleReportGenerated} />
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-4">
              {savedReports.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 space-y-3">
                  <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <Scan className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">
                    No Saved Face Reports Yet
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Use &ldquo;Scan Face&rdquo; with your camera or open the &ldquo;Manual Self-Reader&rdquo; to generate your first comprehensive Samudrika analysis.
                  </p>
                  <button
                    onClick={() => setIsScannerOpen(true)}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all"
                  >
                    Start Reading Now
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedReports.map((saved) => (
                    <div
                      key={saved.id}
                      onClick={() => setReport(saved)}
                      className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-500/50 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                            {saved.summaryTitle || "Samudrika Physiognomy Report"}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500">
                          {saved.dominantElement} Element &bull; {saved.sanTingBreakdown.dominantRealm}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {new Date(saved.timestamp).toLocaleDateString(undefined, {
                            dateStyle: "medium"
                          })}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleDeleteReport(saved.id, e)}
                          className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Delete report"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* 4. MODALS */}
      <FaceScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        language={selectedLanguage}
        onReportGenerated={(rep) => {
          setIsScannerOpen(false);
          handleReportGenerated(rep);
        }}
      />

      <FaceSystemDetailModal
        isOpen={isSystemModalOpen}
        onClose={() => setIsSystemModalOpen(false)}
        initialSection={systemModalSection}
        onStartReading={() => {
          setIsSystemModalOpen(false);
          setIsScannerOpen(true);
        }}
      />
    </div>
  );
};
