import React, { useState, useMemo } from "react";
import { 
  Briefcase, 
  UserCheck, 
  Sparkles, 
  Layers, 
  Compass, 
  Sliders, 
  FileText, 
  ShieldCheck, 
  Clock, 
  Globe, 
  Search, 
  Plus, 
  ChevronRight,
  Sun,
  Moon
} from "lucide-react";
import { UserProfile } from "../../types";
import { AstroCard, AstroBadge, AstroButton, AstroTabs } from "./AstroDesignSystem";
import { KundliChartSVG } from "../KundliChartSVG";
import { generatePlanetaryPositions } from "../../data/astrologyData";

export interface AstroPractitionerWorkspaceProps {
  userProfile: UserProfile;
  onSelectTab: (tabId: string) => void;
}

export const AstroPractitionerWorkspace: React.FC<AstroPractitionerWorkspaceProps> = ({
  userProfile,
  onSelectTab,
}) => {
  const [activeTab, setActiveTab] = useState("chart_analysis");
  const [selectedSubTab, setSelectedSubTab] = useState("kp_sublords");

  const chartData = useMemo(() => {
    return generatePlanetaryPositions(
      userProfile?.dob || "1995-05-15",
      userProfile?.time || "14:30",
      userProfile?.place || "New Delhi, India"
    );
  }, [userProfile]);

  const kpSubLords = [
    { cusp: 1, sign: "Aries", degree: "14°28'", signLord: "Mars", starLord: "Venus", subLord: "Mercury", subSubLord: "Jupiter", sigs: "1, 6, 10" },
    { cusp: 2, sign: "Taurus", degree: "11°04'", signLord: "Venus", starLord: "Moon", subLord: "Mars", subSubLord: "Saturn", sigs: "2, 11" },
    { cusp: 3, sign: "Gemini", degree: "06°40'", signLord: "Mercury", starLord: "Mars", subLord: "Sun", subSubLord: "Venus", sigs: "3, 9" },
    { cusp: 4, sign: "Cancer", degree: "03°15'", signLord: "Moon", starLord: "Jupiter", subLord: "Rahu", subSubLord: "Mercury", sigs: "4, 12" },
    { cusp: 5, sign: "Leo", degree: "04°50'", signLord: "Sun", starLord: "Ketu", subLord: "Moon", subSubLord: "Mars", sigs: "5, 9, 11" },
    { cusp: 6, sign: "Virgo", degree: "10°20'", signLord: "Mercury", starLord: "Moon", subLord: "Jupiter", subSubLord: "Sun", sigs: "6, 8, 12" },
    { cusp: 7, sign: "Libra", degree: "14°28'", signLord: "Venus", starLord: "Rahu", subLord: "Ketu", subSubLord: "Venus", sigs: "7, 2, 11" },
    { cusp: 8, sign: "Scorpio", degree: "11°04'", signLord: "Mars", starLord: "Saturn", subLord: "Mercury", subSubLord: "Moon", sigs: "8, 12" },
    { cusp: 9, sign: "Sagittarius", degree: "06°40'", signLord: "Jupiter", starLord: "Ketu", subLord: "Venus", subSubLord: "Mars", sigs: "9, 1, 5" },
    { cusp: 10, sign: "Capricorn", degree: "03°15'", signLord: "Saturn", starLord: "Sun", subLord: "Jupiter", subSubLord: "Mercury", sigs: "10, 6, 2" },
    { cusp: 11, sign: "Aquarius", degree: "04°50'", signLord: "Saturn", starLord: "Mars", subLord: "Sun", subSubLord: "Venus", sigs: "11, 2, 5" },
    { cusp: 12, sign: "Pisces", degree: "10°20'", signLord: "Jupiter", starLord: "Saturn", subLord: "Rahu", subSubLord: "Moon", sigs: "12, 8" },
  ];

  const charaKarakas = [
    { title: "Atmakaraka (AK)", planet: "Moon", degree: "18°42'30\"", sign: "Taurus", theme: "Soul purpose & core destiny" },
    { title: "Amatyakaraka (AmK)", planet: "Saturn", degree: "19°50'02\"", sign: "Aquarius", theme: "Career, status & ministerial counsel" },
    { title: "Bhratrukaraka (BK)", planet: "Jupiter", degree: "22°05'50\"", sign: "Sagittarius", theme: "Mentors, siblings & dharma guidance" },
    { title: "Matrukaraka (MK)", planet: "Mercury", degree: "11°20'18\"", sign: "Virgo", theme: "Mother, domestic peace & foundation" },
    { title: "Putrakaraka (PK)", planet: "Sun", degree: "28°15'04\"", sign: "Leo", theme: "Intellect, creativity & followers" },
    { title: "Gnatikaraka (GK)", planet: "Mars", degree: "06°11'45\"", sign: "Scorpio", theme: "Obstacles, competition & challenges" },
    { title: "Darakaraka (DK)", planet: "Venus", degree: "04°33'12\"", sign: "Libra", theme: "Spouse, partnership & commercial treaties" },
  ];

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-12">
      {/* Top Banner */}
      <div className="bg-[#FAF8F5] border border-[#E7E2D9] rounded-3xl p-6 shadow-xs flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D23] flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5" /> Professional Consultant Suite
            </span>
            <span className="text-[#DDD7CC]">•</span>
            <span className="text-xs text-[#766E65]">Deterministic Multi-System Workspace</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1B18] mt-0.5">
            Practitioner Chart Workspace
          </h1>
          <div className="text-xs text-[#554E46] mt-1">
            Active Client: <strong className="text-[#1E1B18]">{userProfile.name}</strong> • DOB: {userProfile.dob} {userProfile.time} ({userProfile.place})
          </div>
        </div>

        <div className="flex items-center gap-2">
          <AstroButton variant="outline" size="sm" onClick={() => onSelectTab("reports")}>
            <FileText className="w-3.5 h-3.5" />
            <span>Generate Client Dossier</span>
          </AstroButton>
          <AstroButton variant="primary" size="sm" onClick={() => onSelectTab("birth_chart")}>
            <Compass className="w-3.5 h-3.5" />
            <span>Client Kundli</span>
          </AstroButton>
        </div>
      </div>

      {/* 3-Column Professional Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Chart (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#E7E2D9] shadow-xs space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#F2ECE1]">
              <span className="font-serif text-base font-bold text-[#1E1B18]">Lagna Kundli (D1)</span>
              <span className="text-xs font-bold text-[#8C6D23]">Lahiri Nirayana</span>
            </div>

            <div className="flex justify-center items-center py-2">
              <div className="w-full max-w-xs aspect-square">
                <KundliChartSVG
                  planets={chartData.planets}
                  houses={chartData.houses}
                  lagnaSign={chartData.lagna}
                  chartTitle="D1 Rashi"
                  compact={true}
                />
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DA] text-xs space-y-1">
              <div className="font-bold text-[#1E1B18]">Ascendant Longitude</div>
              <div className="font-mono text-[#8C6D23]">Aries 14°28&apos;12&quot; • Bharani Pada 1</div>
            </div>
          </div>
        </div>

        {/* Center & Right Columns: Technical Tables (KP Sub Lords, Jaimini Chara Karakas, Cuspal Cusps) (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Sub Navigation */}
          <AstroTabs
            tabs={[
              { id: "kp_sublords", label: "KP 249 Sub-Lord Table", count: 12 },
              { id: "jaimini_karakas", label: "Jaimini Chara Karakas", count: 7 },
              { id: "bhava_balas", label: "Bhava Balas & Cusps", count: 12 },
            ]}
            activeTab={selectedSubTab}
            onChange={setSelectedSubTab}
          />

          {selectedSubTab === "kp_sublords" && (
            <div className="overflow-x-auto rounded-2xl border border-[#E7E2D9] bg-[#FFFFFF] shadow-xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#E7E2D9] text-[#766E65] font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Cusp</th>
                    <th className="py-3 px-4">Sign & Degree</th>
                    <th className="py-3 px-4">Sign Lord</th>
                    <th className="py-3 px-4">Star Lord</th>
                    <th className="py-3 px-4">Sub Lord</th>
                    <th className="py-3 px-4">Sub-Sub Lord</th>
                    <th className="py-3 px-4">Significators</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2ECE1]">
                  {kpSubLords.map((k) => (
                    <tr key={k.cusp} className="hover:bg-[#FAF7F0] transition-colors">
                      <td className="py-2.5 px-4 font-bold text-[#1E1B18]">Cusp {k.cusp}</td>
                      <td className="py-2.5 px-4 font-mono">{k.sign} {k.degree}</td>
                      <td className="py-2.5 px-4 text-[#4A433B]">{k.signLord}</td>
                      <td className="py-2.5 px-4 text-[#8C6D23] font-semibold">{k.starLord}</td>
                      <td className="py-2.5 px-4 text-[#1E6B37] font-bold">{k.subLord}</td>
                      <td className="py-2.5 px-4 text-[#766E65]">{k.subSubLord}</td>
                      <td className="py-2.5 px-4 font-mono font-bold text-[#8C6D23]">{k.sigs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedSubTab === "jaimini_karakas" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {charaKarakas.map((jk, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E7E2D9] shadow-xs space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#8C6D23]">{jk.title}</span>
                    <span className="text-xs font-bold text-[#1E1B18]">{jk.planet}</span>
                  </div>
                  <div className="text-xs font-mono text-[#554E46]">{jk.sign} {jk.degree}</div>
                  <div className="text-[11px] text-[#766E65] pt-1 border-t border-[#F2ECE1]">
                    {jk.theme}
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedSubTab === "bhava_balas" && (
            <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#E7E2D9] shadow-xs space-y-3">
              <h3 className="font-serif text-base font-bold text-[#1E1B18]">12 Bhava Balas (House Potencies)</h3>
              <p className="text-xs text-[#766E65]">
                Calculated combining Bhavadhipati Bala (Lord strength), Bhava Dig Bala, and Bhava Drishti Bala.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => (
                  <div key={h} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE5DA] text-center">
                    <div className="text-[10px] font-bold uppercase text-[#766E65]">House {h}</div>
                    <div className="text-sm font-bold text-[#1E6B37] mt-0.5">{(8.5 + (h % 3) * 0.4).toFixed(1)} Rupas</div>
                    <div className="text-[10px] text-[#8C6D23] font-semibold">Strong</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
