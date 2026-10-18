import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Clock, 
  Layers, 
  Sparkles, 
  BarChart3, 
  Moon, 
  Sun, 
  Heart, 
  Calendar as CalendarIcon, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Download, 
  Printer, 
  Share2,
  ShieldCheck,
  Zap,
  Globe,
  Sliders,
  TrendingUp
} from "lucide-react";
import { UserProfile } from "../../types";
import { AstroCard, AstroBadge, AstroButton, AstroTabs } from "./AstroDesignSystem";

interface AstroAdvancedViewsProps {
  currentTab: string;
  userProfile: UserProfile;
  onSelectTab: (tabId: string) => void;
}

export const AstroAdvancedViews: React.FC<AstroAdvancedViewsProps> = ({
  currentTab,
  userProfile,
  onSelectTab,
}) => {
  // 1. DASHAS VIEW
  if (currentTab === "dashas") {
    return (
      <div className="space-y-8 max-w-7xl mx-auto pb-12">
        <div className="bg-[#FAF8F5] border border-[#E7E2D9] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-wrap justify-between items-start gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#B89047]">
              Planetary Period Engine
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1B18] mt-0.5">
              Vimshottari Dasha Timeline (120 Years)
            </h1>
            <p className="text-xs sm:text-sm text-[#6C645A] mt-1">
              Hierarchical 5-tier chronological unfolding: Mahadasha → Antardasha → Pratyantardasha → Sookshma → Prana.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <AstroBadge label="Active: Jupiter-Sun" variant="gold" size="md" />
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#E7E2D9] shadow-xs space-y-4">
          <div className="flex justify-between items-center text-xs font-bold text-[#1E1B18]">
            <span>Current Mahadasha: Jupiter (Guru) • 16 Years</span>
            <span className="text-[#8C6D23]">2020 – 2036</span>
          </div>

          <div className="h-3 rounded-full bg-[#EAE5DA] overflow-hidden flex">
            <div style={{ width: "37.5%" }} className="bg-[#B89047] h-full" title="Elapsed (6 Years)" />
            <div style={{ width: "62.5%" }} className="bg-[#EAE5DA] h-full" title="Remaining (10 Years)" />
          </div>

          {/* Sub-Periods Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#E5D2A0] space-y-1">
              <div className="text-[10px] font-bold uppercase text-[#8C6D23]">Current Antardasha</div>
              <div className="text-sm font-bold text-[#1E1B18]">Sun (Surya)</div>
              <div className="text-xs text-[#766E65]">Oct 2025 – Aug 2026</div>
              <div className="text-[11px] text-[#1E6B37] font-semibold pt-1 border-t border-[#F2ECE1]">
                Digbala 10th House • Leadership
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E7E2D9] space-y-1">
              <div className="text-[10px] font-bold uppercase text-[#766E65]">Upcoming Antardasha</div>
              <div className="text-sm font-bold text-[#1E1B18]">Moon (Chandra)</div>
              <div className="text-xs text-[#766E65]">Aug 2026 – Dec 2027</div>
              <div className="text-[11px] text-[#8C6D23] font-semibold pt-1 border-t border-[#F2ECE1]">
                Exalted in 2nd House • Wealth
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E7E2D9] space-y-1">
              <div className="text-[10px] font-bold uppercase text-[#766E65]">Future Antardasha</div>
              <div className="text-sm font-bold text-[#1E1B18]">Mars (Mangal)</div>
              <div className="text-xs text-[#766E65]">Dec 2027 – Nov 2028</div>
              <div className="text-[11px] text-[#554E46] font-semibold pt-1 border-t border-[#F2ECE1]">
                8th House Own Sign • Transformations
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. VARGAS VIEW
  if (currentTab === "vargas") {
    const vargas = [
      { id: "D1", name: "Rashi (D1)", theme: "Physical existence, vitality, and general destiny" },
      { id: "D9", name: "Navamsha (D9)", theme: "Dharma, marriage, inner potential, and second half of life" },
      { id: "D10", name: "Dasamsha (D10)", theme: "Profession, public standing, authority, and corporate karma" },
      { id: "D2", name: "Hora (D2)", theme: "Financial assets, wealth accumulation, and resource management" },
      { id: "D7", name: "Saptamsha (D7)", theme: "Progeny, creativity, and investments" },
      { id: "D12", name: "Dwadasamsha (D12)", theme: "Parental lineage, heritage, and ancestral karma" },
      { id: "D60", name: "Shashtiamsha (D60)", theme: "Past-life karma, subtle soul purpose, and minute rectification" },
    ];

    return (
      <div className="space-y-8 max-w-7xl mx-auto pb-12">
        <div className="bg-[#FAF8F5] border border-[#E7E2D9] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-wrap justify-between items-start gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#B89047]">
              Harmonic Division Matrices
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1B18] mt-0.5">
              Varga Explorer (D1 to D60)
            </h1>
            <p className="text-xs sm:text-sm text-[#6C645A] mt-1">
              Cross-divisional evidence synthesized with Vimsopaka Bala (20-point strength scheme).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vargas.map((v) => (
            <div
              key={v.id}
              className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#E7E2D9] shadow-xs space-y-3 hover:border-[#B89047] transition-all cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-[#FAF7F0] text-[#8C6D23] border border-[#E5D2A0]">
                  {v.id}
                </span>
                <span className="text-xs text-[#1E6B37] font-semibold">Vimsopaka 18.5/20</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1E1B18]">{v.name}</h3>
              <p className="text-xs text-[#6C645A]">{v.theme}</p>
              <div className="pt-2 flex justify-end">
                <span className="text-xs font-bold text-[#8C6D23] flex items-center gap-1">
                  <span>Open {v.id} Chart</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. YOGAS VIEW
  if (currentTab === "yogas") {
    const yogas = [
      { name: "Gaja Kesari Yoga", status: "ACTIVE", type: "Raja Yoga", desc: "Jupiter in 9th Kendra from Moon in 2nd confers public esteem, scholarly articulation, and lasting prosperity." },
      { name: "Sasa Mahapurusha Yoga", status: "ACTIVE", type: "Pancha Mahapurusha", desc: "Saturn in Moolatrikona (Aquarius 11th house) creates authoritative executive governance." },
      { name: "Budhaditya Yoga", status: "PRESENT", type: "Solar-Mercurial", desc: "Sun and Mercury combined in analytical alignment foster exceptional intellectual discernment." },
      { name: "Vipareeta Harsha Yoga", status: "ACTIVE", type: "Vipareeta Raja", desc: "6th lord in 6th house converts initial opposition into ultimate victory." },
      { name: "Dharma-Karmadhipati Yoga", status: "ACTIVE", type: "Supreme Raja Yoga", desc: "Mutual reception of 9th lord Jupiter and 10th lord Saturn builds unassailable career trajectory." },
      { name: "Kemadruma Yoga", status: "CANCELLED", type: "Chandra Dosha", desc: "Cancelled due to planets occupying Kendras from Lagna and Moon." },
    ];

    return (
      <div className="space-y-8 max-w-7xl mx-auto pb-12">
        <div className="bg-[#FAF8F5] border border-[#E7E2D9] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-wrap justify-between items-start gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#B89047]">
              Classical Formation Suite
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1B18] mt-0.5">
              Formed Astrological Yogas
            </h1>
            <p className="text-xs sm:text-sm text-[#6C645A] mt-1">
              Evaluated using 1,001+ deterministic Parashari and Jaimini rules with cancellation verifications.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {yogas.map((y, idx) => {
            const badgeVariant =
              y.status === "ACTIVE" ? "green" : y.status === "PRESENT" ? "gold" : "slate";

            return (
              <div key={idx} className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#E7E2D9] shadow-xs space-y-3">
                <div className="flex justify-between items-center">
                  <div className="text-xs font-bold text-[#766E65] uppercase">{y.type}</div>
                  <AstroBadge label={y.status} variant={badgeVariant} />
                </div>
                <h3 className="font-serif text-base font-bold text-[#1E1B18]">{y.name}</h3>
                <p className="text-xs text-[#4A433B] leading-relaxed">{y.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 4. SHADBALA VIEW
  if (currentTab === "shadbala") {
    const planets = [
      { name: "Sun (Surya)", virupas: 465, required: 390, ratio: "1.19x", status: "Strong", pct: 85 },
      { name: "Moon (Chandra)", virupas: 512, required: 360, ratio: "1.42x", status: "Very Strong", pct: 95 },
      { name: "Mars (Mangal)", virupas: 398, required: 300, ratio: "1.32x", status: "Strong", pct: 88 },
      { name: "Mercury (Budha)", virupas: 440, required: 420, ratio: "1.05x", status: "Adequate", pct: 75 },
      { name: "Jupiter (Guru)", virupas: 530, required: 390, ratio: "1.36x", status: "Very Strong", pct: 92 },
      { name: "Venus (Shukra)", virupas: 415, required: 330, ratio: "1.25x", status: "Strong", pct: 84 },
      { name: "Saturn (Shani)", virupas: 480, required: 300, ratio: "1.60x", status: "Dominant", pct: 98 },
    ];

    return (
      <div className="space-y-8 max-w-7xl mx-auto pb-12">
        <div className="bg-[#FAF8F5] border border-[#E7E2D9] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-wrap justify-between items-start gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#B89047]">
              Six-Fold Strength Quantification
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1B18] mt-0.5">
              Shadbala & Bhava Bala
            </h1>
            <p className="text-xs sm:text-sm text-[#6C645A] mt-1">
              Positional (Sthana), Directional (Dig), Temporal (Kala), Motional (Cheshta), Natural (Naisargika), Aspect (Drik).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {planets.map((p, idx) => (
            <div key={idx} className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#E7E2D9] shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-serif text-base font-bold text-[#1E1B18]">{p.name}</span>
                <span className="text-xs font-bold text-[#1E6B37]">{p.ratio} of minimum</span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-[#766E65]">
                  <span>{p.virupas} Virupas (Req: {p.required})</span>
                  <span className="font-bold text-[#1E1B18]">{p.status}</span>
                </div>
                <div className="h-2 rounded-full bg-[#EAE5DA] overflow-hidden">
                  <div style={{ width: `${p.pct}%` }} className="bg-[#1E6B37] h-full rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 5. COMPATIBILITY VIEW
  if (currentTab === "compatibility") {
    return (
      <div className="space-y-8 max-w-7xl mx-auto pb-12">
        <div className="bg-[#FAF8F5] border border-[#E7E2D9] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-wrap justify-between items-start gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#B89047]">
              Multi-Dimensional Synastry
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1B18] mt-0.5">
              Relationship & Synastry Analysis
            </h1>
            <p className="text-xs sm:text-sm text-[#6C645A] mt-1">
              Ashtakoota 36 points • Manglik Dosha Samya • Navamsha D9 Conjunctions • Chara Darakaraka.
            </p>
          </div>
        </div>

        {/* Score Breakdown Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#E7E2D9] text-center space-y-1">
            <div className="text-xs font-bold text-[#766E65] uppercase">Ashtakoota Score</div>
            <div className="text-3xl font-serif font-bold text-[#1E1B18]">29 / 36</div>
            <div className="text-xs text-[#1E6B37] font-semibold">High Harmony (Uttama)</div>
          </div>

          <div className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#E7E2D9] text-center space-y-1">
            <div className="text-xs font-bold text-[#766E65] uppercase">Manglik Equilibrium</div>
            <div className="text-xl font-bold text-[#1E6B37] mt-1">Balanced (Samya)</div>
            <div className="text-xs text-[#766E65]">No severe Kuja friction</div>
          </div>

          <div className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#E7E2D9] text-center space-y-1">
            <div className="text-xs font-bold text-[#766E65] uppercase">D9 Soul Connection</div>
            <div className="text-xl font-bold text-[#8C6D23] mt-1">Jupiter Aspect</div>
            <div className="text-xs text-[#766E65]">Dharma-aligned marriage</div>
          </div>
        </div>
      </div>
    );
  }

  // 6. ASTROLOGY CALENDAR VIEW
  if (currentTab === "calendar") {
    return (
      <div className="space-y-8 max-w-7xl mx-auto pb-12">
        <div className="bg-[#FAF8F5] border border-[#E7E2D9] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-wrap justify-between items-start gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#B89047]">
              Ephemeris & Transit Sync
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1B18] mt-0.5">
              Personal Astrology Calendar
            </h1>
            <p className="text-xs sm:text-sm text-[#6C645A] mt-1">
              Monthly overlay of Panchanga tithis, lunar shifts, dasha sub-period boundaries, and planetary stations.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#E7E2D9] shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-lg font-bold text-[#1E1B18]">August 2026</h3>
            <div className="flex gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 bg-[#FAF7F0] text-[#8C6D23] rounded-lg border border-[#E5D2A0]">
                Transit Ingresses: 3
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 bg-[#EFF8F1] text-[#1E6B37] rounded-lg border border-[#BCE1C7]">
                Best Muhurtas: 8
              </span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-[#766E65] pb-2 border-b border-[#F2ECE1]">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 text-xs">
            {Array.from({ length: 31 }).map((_, i) => {
              const day = i + 1;
              const isToday = day === 17;

              return (
                <div
                  key={day}
                  className={`p-3 min-h-[72px] rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    isToday
                      ? "bg-[#FAF7F0] border-[#B89047] shadow-xs"
                      : "bg-[#FAF8F5] border-[#EAE5DA] hover:bg-white"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`font-bold ${isToday ? "text-[#8C6D23]" : "text-[#1E1B18]"}`}>
                      {day}
                    </span>
                    {isToday && <span className="text-[9px] font-bold text-[#8C6D23]">TODAY</span>}
                  </div>
                  {day === 17 && (
                    <span className="text-[10px] text-[#1E6B37] font-semibold truncate">
                      Rohini • Shukla 4
                    </span>
                  )}
                  {day === 22 && (
                    <span className="text-[10px] text-[#8C6D23] font-semibold truncate">
                      Ekadashi Fast
                    </span>
                  )}
                  {day === 28 && (
                    <span className="text-[10px] text-[#63328C] font-semibold truncate">
                      Full Moon (Purnima)
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 7. REPORTS VIEW
  if (currentTab === "reports") {
    const reportList = [
      { id: "comprehensive_kundli", title: "Comprehensive Janma Kundli Dossier", pages: 42, format: "PDF" },
      { id: "career_d10", title: "Career & Financial Elevation Roadmap (D10)", pages: 18, format: "PDF" },
      { id: "varshaphala_2026", title: "Annual Solar Return 2026 Dossier", pages: 24, format: "PDF" },
      { id: "synastry_marriage", title: "Marriage & Relationship Synastry Audit", pages: 16, format: "PDF" },
    ];

    return (
      <div className="space-y-8 max-w-7xl mx-auto pb-12">
        <div className="bg-[#FAF8F5] border border-[#E7E2D9] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-wrap justify-between items-start gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#B89047]">
              Publication Quality Dossiers
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1B18] mt-0.5">
              Dev-Guru Dossier Reports
            </h1>
            <p className="text-xs sm:text-sm text-[#6C645A] mt-1">
              Editorial-grade analytical dossiers generated directly from the deterministic Dev-Guru calculation engine.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportList.map((rep) => (
            <div
              key={rep.id}
              className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#E7E2D9] shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#FAF7F0] text-[#8C6D23] border border-[#E5D2A0]">
                    {rep.format} • {rep.pages} Pages
                  </span>
                  <span className="text-xs text-[#1E6B37] font-semibold">Engine Verified</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1E1B18]">{rep.title}</h3>
                <p className="text-xs text-[#766E65]">
                  Includes full natal coordinates, D1–D60 vargas, vimshottari dasha hierarchy, and personalized timing windows.
                </p>
              </div>

              <div className="pt-3 border-t border-[#F2ECE1] flex justify-between items-center">
                <span className="text-xs font-medium text-[#766E65]">Ready to export</span>
                <AstroButton variant="primary" size="sm">
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Dossier</span>
                </AstroButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Fallback default
  return (
    <div className="p-12 text-center text-sm text-[#766E65]">
      Select a module from the left sidebar to explore.
    </div>
  );
};
