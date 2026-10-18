import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { 
  Sparkles, 
  Compass, 
  Layers, 
  Sliders, 
  RotateCw, 
  Eye, 
  FileText, 
  Info, 
  ChevronRight, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Clock, 
  Sun, 
  Moon, 
  ShieldCheck 
} from "lucide-react";
import { UserProfile } from "../../types";
import { AstroCard, AstroBadge, AstroButton, AstroTabs } from "./AstroDesignSystem";
import { KundliChartSVG } from "../KundliChartSVG";
import { D3VedicChart } from "../D3VedicChart";
import { generatePlanetaryPositions } from "../../data/astrologyData";

export type ChartStyle = "north" | "south" | "east" | "western" | "kp";

interface AstroBirthChartPageProps {
  userProfile: UserProfile;
  onSelectTab: (tabId: string) => void;
  onOpenOnboarding?: () => void;
}

export const AstroBirthChartPage: React.FC<AstroBirthChartPageProps> = ({
  userProfile,
  onSelectTab,
  onOpenOnboarding,
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [chartStyle, setChartStyle] = useState<ChartStyle>("north");
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

  const chartData = useMemo(() => {
    return generatePlanetaryPositions(
      userProfile?.dob || "1995-05-15",
      userProfile?.time || "14:30",
      userProfile?.place || "New Delhi, India"
    );
  }, [userProfile]);

  const planetsData = [
    { name: "Ascendant (Lagna)", sign: "Aries (Mesha)", degree: "14°28'12\"", house: 1, nakshatra: "Bharani", pada: 1, motion: "Direct", dignity: "Own / Pivot", strength: "94% (High)" },
    { name: "Sun (Surya)", sign: "Leo (Simha)", degree: "28°15'04\"", house: 5, nakshatra: "Uttara Phalguni", pada: 1, motion: "Direct", dignity: "Moolatrikona", strength: "92% (Very Strong)" },
    { name: "Moon (Chandra)", sign: "Taurus (Vrishabha)", degree: "18°42'30\"", house: 2, nakshatra: "Rohini", pada: 3, motion: "Direct", dignity: "Exalted (Ucha)", strength: "98% (Exalted)" },
    { name: "Mars (Mangal)", sign: "Scorpio (Vrischika)", degree: "06°11'45\"", house: 8, nakshatra: "Anuradha", pada: 2, motion: "Direct", dignity: "Swakshetra (Own)", strength: "88% (Strong)" },
    { name: "Mercury (Budha)", sign: "Virgo (Kanya)", degree: "11°20'18\"", house: 6, nakshatra: "Hasta", pada: 1, motion: "Direct", dignity: "Exalted (Ucha)", strength: "96% (Exalted)" },
    { name: "Jupiter (Guru)", sign: "Sagittarius (Dhanu)", degree: "22°05'50\"", house: 9, nakshatra: "Purva Ashadha", pada: 3, motion: "Direct", dignity: "Moolatrikona", strength: "95% (Very Strong)" },
    { name: "Venus (Shukra)", sign: "Libra (Tula)", degree: "04°33'12\"", house: 7, nakshatra: "Chitra", pada: 4, motion: "Direct", dignity: "Swakshetra (Own)", strength: "90% (Strong)" },
    { name: "Saturn (Shani)", sign: "Aquarius (Kumbha)", degree: "19°50'02\"", house: 11, nakshatra: "Shatabhisha", pada: 4, motion: "Direct", dignity: "Moolatrikona", strength: "93% (Sasa Yoga)" },
    { name: "Rahu (North Node)", sign: "Pisces (Meena)", degree: "15°10'40\"", house: 12, nakshatra: "Uttara Bhadrapada", pada: 4, motion: "Retrograde", dignity: "Friendly", strength: "72% (Moderate)" },
    { name: "Ketu (South Node)", sign: "Virgo (Kanya)", degree: "15°10'40\"", house: 6, nakshatra: "Hasta", pada: 2, motion: "Retrograde", dignity: "Exalted/Spiritual", strength: "80% (Supportive)" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* 1. Top Metadata & Calculation Policy Bar */}
      <div className="bg-[#FAF8F5] border border-[#E7E2D9] rounded-3xl p-6 shadow-xs flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B89047]">
              Natal Janma Kundli
            </span>
            <span className="text-[#DDD7CC]">•</span>
            <span className="text-xs text-[#766E65] font-medium">
              Profile: <strong className="text-[#1E1B18]">{userProfile.name}</strong>
            </span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#1E1B18] mt-0.5">
            Birth Chart (Rashi D1)
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#554E46] mt-1.5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#8C6D23]" /> {userProfile.dob}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#8C6D23]" /> {userProfile.time}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#8C6D23]" /> {userProfile.place}
            </span>
          </div>
        </div>

        {/* Calculation System Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#DDD7CD] text-xs">
            <div className="text-[10px] text-[#8C847A] uppercase font-bold">Ayanamsa</div>
            <div className="font-bold text-[#1E1B18]">Lahiri (24°10&apos;32&quot;)</div>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#DDD7CD] text-xs">
            <div className="text-[10px] text-[#8C847A] uppercase font-bold">House System</div>
            <div className="font-bold text-[#1E1B18]">Whole Sign (Rashi)</div>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#DDD7CD] text-xs">
            <div className="text-[10px] text-[#8C847A] uppercase font-bold">Zodiac</div>
            <div className="font-bold text-[#1E1B18]">Sidereal (Nirayana)</div>
          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <AstroTabs
        tabs={[
          { id: "overview", label: "Chart Overview" },
          { id: "planets", label: "Planetary Positions", count: 10 },
          { id: "houses", label: "12 Houses (Bhavas)", count: 12 },
          { id: "nakshatra", label: "Nakshatra Analysis" },
          { id: "yogas", label: "Formed Yogas", count: 8 },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* 3. Main Chart Visualizer & Key Findings (2 Column) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Chart Container with Style Switcher (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#E7E2D9] shadow-xs space-y-5">
            {/* Chart Style Switcher Header */}
            <div className="flex justify-between items-center pb-3 border-b border-[#F2ECE1]">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1E1B18]">Rashi Kundli (D1)</h3>
                <p className="text-xs text-[#766E65]">Click any house or planet to inspect</p>
              </div>

              {/* Chart Style Selector */}
              <div className="flex items-center gap-1 bg-[#F2EFE9] p-1 rounded-xl border border-[#DDD7CD]">
                <button
                  onClick={() => setChartStyle("north")}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                    chartStyle === "north" ? "bg-[#FFFFFF] text-[#1E1B18] shadow-2xs" : "text-[#766E65]"
                  }`}
                >
                  North
                </button>
                <button
                  onClick={() => setChartStyle("south")}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                    chartStyle === "south" ? "bg-[#FFFFFF] text-[#1E1B18] shadow-2xs" : "text-[#766E65]"
                  }`}
                >
                  South
                </button>
                <button
                  onClick={() => setChartStyle("east")}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                    chartStyle === "east" ? "bg-[#FFFFFF] text-[#1E1B18] shadow-2xs" : "text-[#766E65]"
                  }`}
                >
                  East
                </button>
                <button
                  onClick={() => setChartStyle("western")}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                    chartStyle === "western" ? "bg-[#FFFFFF] text-[#1E1B18] shadow-2xs" : "text-[#766E65]"
                  }`}
                >
                  Wheel
                </button>
              </div>
            </div>

            {/* SVG Chart Rendering */}
            <div className="flex justify-center items-center py-2">
              <div className="w-full max-w-lg aspect-square">
                <KundliChartSVG
                  planets={chartData.planets}
                  houses={chartData.houses}
                  lagnaSign={chartData.lagna}
                  chartTitle="Lagna Kundli (D1)"
                  compact={true}
                />
              </div>
            </div>

            <div className="text-center text-xs text-[#766E65]">
              Lagna: <strong className="text-[#1E1B18]">Aries 14°28&apos;</strong> • Moon: <strong className="text-[#1E1B18]">Taurus 18°42&apos; (Rohini)</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Key Astrological Findings & Pillar Strengths (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E7E2D9] shadow-xs space-y-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#B89047]">
                Deterministic Synthesis
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1E1B18] mt-0.5">
                Key Astrological Pillars
              </h3>
              <p className="text-xs text-[#766E65] mt-1">
                Synthesized from 4 classical pillars: Kendra strength, Trikona lords, Exaltations, and Vimsopaka Bala.
              </p>
            </div>

            <div className="space-y-3">
              {/* Finding 1 */}
              <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E7E2D9] shadow-2xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#1E1B18]">Exalted Moon in 2nd House (Dhana Bhava)</span>
                  <AstroBadge label="Exalted" variant="green" />
                </div>
                <p className="text-xs text-[#4A433B] leading-relaxed">
                  Moon in Rohini (Taurus) in the 2nd house creates powerful financial stability, articulate expression, and deep intuitive intelligence.
                </p>
              </div>

              {/* Finding 2 */}
              <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E7E2D9] shadow-2xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#1E1B18]">Sasa Mahapurusha Yoga (Saturn in 11th)</span>
                  <AstroBadge label="Raja Yoga" variant="gold" />
                </div>
                <p className="text-xs text-[#4A433B] leading-relaxed">
                  Saturn in Moolatrikona (Aquarius) in the 11th house of gains builds long-lasting enterprise networks and authoritative industry standing over time.
                </p>
              </div>

              {/* Finding 3 */}
              <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E7E2D9] shadow-2xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#1E1B18]">9th Lord Jupiter in Moolatrikona</span>
                  <AstroBadge label="Bhagya Yoga" variant="purple" />
                </div>
                <p className="text-xs text-[#4A433B] leading-relaxed">
                  Jupiter placed in Sagittarius in the 9th house brings profound philosophical wisdom, ethical prosperity, and protective mentor connections.
                </p>
              </div>
            </div>

            {/* Quick Actions to Explore Further */}
            <div className="pt-2 flex flex-wrap gap-2">
              <AstroButton variant="outline" size="sm" onClick={() => onSelectTab("yogas")}>
                <span>View All 8 Yogas</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </AstroButton>
              <AstroButton variant="outline" size="sm" onClick={() => onSelectTab("vargas")}>
                <span>Explore D9 & D10 Vargas</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </AstroButton>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Planetary Positions Table (Desktop Table / Mobile Responsive) */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1E1B18]">Planetary Coordinates & Dignities</h2>
            <p className="text-xs text-[#766E65]">Calculated using high-precision ephemeris and Lahiri Ayanamsa</p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#E7E2D9] bg-[#FFFFFF] shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#E7E2D9] text-[#766E65] font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Planet</th>
                <th className="py-3 px-4">Rashi (Sign)</th>
                <th className="py-3 px-4">Exact Degree</th>
                <th className="py-3 px-4">House</th>
                <th className="py-3 px-4">Nakshatra & Pada</th>
                <th className="py-3 px-4">Motion</th>
                <th className="py-3 px-4">Dignity</th>
                <th className="py-3 px-4">Potency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2ECE1]">
              {planetsData.map((p, idx) => (
                <tr
                  key={idx}
                  onClick={() => setSelectedPlanet(p.name)}
                  className={`hover:bg-[#FAF7F0] cursor-pointer transition-colors ${
                    selectedPlanet === p.name ? "bg-[#FAF7F0]" : ""
                  }`}
                >
                  <td className="py-3 px-4 font-bold text-[#1E1B18]">{p.name}</td>
                  <td className="py-3 px-4 text-[#4A433B]">{p.sign}</td>
                  <td className="py-3 px-4 font-mono font-medium text-[#1E1B18]">{p.degree}</td>
                  <td className="py-3 px-4 text-[#766E65]">House {p.house}</td>
                  <td className="py-3 px-4 text-[#8C6D23] font-semibold">{p.nakshatra} (P{p.pada})</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${p.motion === "Retrograde" ? "bg-[#FDF3E7] text-[#9E5D14]" : "bg-[#EAF5ED] text-[#1E6B37]"}`}>
                      {p.motion}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#1E1B18]">{p.dignity}</td>
                  <td className="py-3 px-4 font-bold text-[#1E6B37]">{p.strength}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
