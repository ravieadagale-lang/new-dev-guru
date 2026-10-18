import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Droplets,
  Wind,
  Mountain,
  CircleDot,
  Info,
  Shield,
  Layers,
  ArrowRight,
  RefreshCw,
  Award,
  BookOpen
} from "lucide-react";
import {
  BAGUA_PALACES,
  PERIOD_9_FLYING_STARS,
  calculatePersonalKua,
  MOUNTAINS_24
} from "../../engine/vastu/fengShuiEngine";
import { BaguaPalace, FlyingStarData, PersonalKuaResult } from "../../types/vastuTypes";

export const FengShuiStudioView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    "bagua" | "flying_stars" | "personal_kua" | "wu_xing"
  >("flying_stars");

  // Selected Bagua Palace
  const [selectedPalaceId, setSelectedPalaceId] = useState<string>("wealth");

  // Selected Flying Star
  const [selectedStarNumber, setSelectedStarNumber] = useState<number>(9);

  // Kua Form State
  const [birthYear, setBirthYear] = useState<number>(1990);
  const [gender, setGender] = useState<"male" | "female">("male");

  const personalKuaResult: PersonalKuaResult = useMemo(
    () => calculatePersonalKua(birthYear, gender),
    [birthYear, gender]
  );

  const selectedPalace = BAGUA_PALACES.find((p) => p.id === selectedPalaceId) || BAGUA_PALACES[0];
  const selectedStar = PERIOD_9_FLYING_STARS.find((s) => s.starNumber === selectedStarNumber) || PERIOD_9_FLYING_STARS[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Period 9 (2024–2043)
            </span>
            <span className="text-xs text-slate-400">Traditional Compass & Flying Star School</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-rose-400" />
            Classical Feng Shui Analysis & Spatial Harmony
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Master the 9 Bagua Palaces, Period 9 Flying Stars (Xuan Kong Fei Xing), Personal Kua alignments, and Wu Xing 5 Element cures.
          </p>
        </div>

        {/* Sub-Tabs Selector */}
        <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-xl border border-slate-700 self-stretch md:self-auto overflow-x-auto">
          {[
            { id: "flying_stars", label: "Period 9 Flying Stars" },
            { id: "bagua", label: "Bagua 9 Palaces" },
            { id: "personal_kua", label: "Personal Kua & 24 Mts" },
            { id: "wu_xing", label: "Wu Xing 5 Elements" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer whitespace-nowrap transition-all ${
                activeSubTab === tab.id
                  ? "bg-rose-600 text-white shadow-xs"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. PERIOD 9 FLYING STARS VIEW */}
      {activeSubTab === "flying_stars" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-slate-950 text-white p-5 rounded-2xl border border-rose-900/50 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Active Planetary Era
                </span>
                <h3 className="text-lg font-black text-white mt-1">
                  Period 9 Master Reign: Purple Star 9 (Fire / Li Trigram)
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Spanning from February 4, 2024 to February 3, 2043. Star 9 is the reigning emperor star of wealth, innovation, and recognition.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 font-bold text-amber-300">
                  Star 9: Supreme Wealth
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 font-bold text-sky-300">
                  Star 1: Future Wealth
                </span>
              </div>
            </div>
          </div>

          {/* Flying Stars 9-Palace Matrix & Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* 3x3 Flying Star Matrix (7 cols) */}
            <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-rose-600" />
                  Period 9 Flying Stars Luo Shu Matrix
                </h4>
                <span className="text-xs text-slate-500">Click any star to inspect</span>
              </div>

              {/* 3x3 Matrix Grid */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { starNum: 4, pos: "South-East (Xun)", el: "Wood" },
                  { starNum: 9, pos: "South (Li) · PERIOD 9 LEADER", el: "Fire" },
                  { starNum: 2, pos: "South-West (Kun)", el: "Earth" },
                  { starNum: 3, pos: "East (Zhen)", el: "Wood" },
                  { starNum: 5, pos: "Center (Tai Chi) · 5 YELLOW", el: "Earth" },
                  { starNum: 7, pos: "West (Dui)", el: "Metal" },
                  { starNum: 8, pos: "North-East (Gen)", el: "Earth" },
                  { starNum: 1, pos: "North (Kan)", el: "Water" },
                  { starNum: 6, pos: "North-West (Qian)", el: "Metal" }
                ].map((item) => {
                  const starObj = PERIOD_9_FLYING_STARS.find((s) => s.starNumber === item.starNum);
                  const isSelected = selectedStarNumber === item.starNum;
                  const isAuspicious = starObj?.nature.includes("Auspicious") || starObj?.nature.includes("Timely");

                  return (
                    <button
                      key={item.starNum}
                      onClick={() => setSelectedStarNumber(item.starNum)}
                      className={`p-3.5 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]"
                          : isAuspicious
                          ? "bg-emerald-50/70 hover:bg-emerald-100 text-emerald-950 border-emerald-200"
                          : "bg-rose-50/70 hover:bg-rose-100 text-rose-950 border-rose-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-sm ${
                            isSelected
                              ? "bg-rose-600 text-white"
                              : isAuspicious
                              ? "bg-emerald-600 text-white"
                              : "bg-rose-600 text-white"
                          }`}
                        >
                          {item.starNum}
                        </span>
                        <span className="text-[10px] font-bold opacity-80 uppercase tracking-wider">
                          {starObj?.period9Status}
                        </span>
                      </div>

                      <div className="font-black text-xs mt-2 truncate">
                        {starObj?.name.split("(")[0]}
                      </div>
                      <div className="text-[10px] opacity-75 truncate mt-0.5">
                        {item.pos}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Matrix Legend */}
              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Auspicious Stars (9, 1, 6, 8)
                </span>
                <span className="flex items-center gap-1.5 text-rose-700 font-bold">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Affliction Stars (5, 2, 3, 7)
                </span>
              </div>
            </div>

            {/* Selected Star Details & Traditional Cure (5 cols) */}
            <div className="lg:col-span-5 bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-10 h-10 rounded-2xl bg-slate-900 text-white font-black text-base flex items-center justify-center">
                    {selectedStar.starNumber}
                  </span>
                  <div>
                    <h4 className="text-base font-black text-slate-900">{selectedStar.name}</h4>
                    <div className="text-xs text-slate-500">
                      Element: {selectedStar.element} · Status: {selectedStar.period9Status}
                    </div>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-black uppercase ${
                    selectedStar.nature.includes("Auspicious") || selectedStar.nature.includes("Timely")
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-rose-100 text-rose-800"
                  }`}
                >
                  {selectedStar.nature}
                </span>
              </div>

              {/* Star Influence */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed space-y-1">
                <div className="font-bold text-slate-900">Period 9 Astrological Influence:</div>
                <p>{selectedStar.influence}</p>
              </div>

              {/* Annual Transit Sector */}
              <div className="text-xs text-slate-600 space-y-1">
                <div>
                  <span className="font-bold text-slate-800">2026 Transit Palace:</span> {selectedStar.annual2026Sector}
                </div>
                <div>
                  <span className="font-bold text-slate-800">2027 Transit Palace:</span> {selectedStar.annual2027Sector}
                </div>
              </div>

              {/* Traditional Cure Prescription Card */}
              <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-100 space-y-2 text-xs">
                <div className="font-black text-rose-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-rose-600" />
                  Prescribed Classical Feng Shui Activation / Cure
                </div>
                <p className="text-rose-900 leading-relaxed font-semibold">
                  {selectedStar.traditionalCure}
                </p>
                <div className="text-[11px] font-bold text-rose-800 pt-1">
                  Cure Category: <span className="underline">{selectedStar.cureCategory}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. BAGUA 9 PALACES VIEW */}
      {activeSubTab === "bagua" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 3x3 Bagua Grid (7 cols) */}
          <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-600" />
                The 9 Bagua Life Aspiration Palaces
              </h4>
              <span className="text-xs text-slate-500">Traditional Compass School</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                "wealth",
                "fame",
                "relationships",
                "family",
                "health_center",
                "children_creativity",
                "knowledge",
                "career",
                "helpful_people"
              ].map((id) => {
                const palace = BAGUA_PALACES.find((p) => p.id === id);
                if (!palace) return null;
                const isSelected = selectedPalaceId === palace.id;

                return (
                  <button
                    key={palace.id}
                    onClick={() => setSelectedPalaceId(palace.id)}
                    className={`p-3.5 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base">{palace.trigram.slice(0, 1)}</span>
                      <span className="text-[10px] font-bold opacity-75">{palace.element}</span>
                    </div>
                    <div className="font-black text-xs mt-2 truncate">
                      {palace.englishName}
                    </div>
                    <div className="text-[10px] opacity-75 truncate mt-0.5">
                      {palace.direction}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Palace Inspector Card (5 cols) */}
          <div className="lg:col-span-5 bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase">
                  {selectedPalace.direction} · {selectedPalace.element} Element
                </span>
                <h4 className="text-lg font-black text-slate-900 mt-0.5">
                  {selectedPalace.englishName} ({selectedPalace.chineseName})
                </h4>
                <div className="text-xs text-slate-500 font-semibold">{selectedPalace.trigram}</div>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed">
              <span className="font-bold text-slate-900">Life Aspiration: </span>
              {selectedPalace.lifeAspiration}
            </div>

            <div className="space-y-1 text-xs">
              <div>
                <span className="font-bold text-slate-800">Auspicious Colors:</span> {selectedPalace.color}
              </div>
              <div>
                <span className="font-bold text-slate-800">Harmonious Shapes:</span> {selectedPalace.shapes}
              </div>
            </div>

            {/* Enhancers */}
            <div className="space-y-2 pt-1 text-xs">
              <div className="font-black text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Recommended Enhancers
              </div>
              <ul className="space-y-1 pl-1">
                {selectedPalace.enhancers.map((enhancer, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-slate-700 text-[11px]">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{enhancer}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Taboos */}
            <div className="space-y-2 pt-1 text-xs">
              <div className="font-black text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Taboos to Avoid
              </div>
              <ul className="space-y-1 pl-1">
                {selectedPalace.taboos.map((taboo, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-rose-900 text-[11px]">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{taboo}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 3. PERSONAL KUA & 24 MOUNTAINS VIEW */}
      {activeSubTab === "personal_kua" && (
        <div className="space-y-6">
          {/* Calculator Bar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-600" />
                Personal Kua (Gua) Compass Calculator
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Calculate your natal energy archetype to orient your bed headboard, study desk, and front door.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Birth Year:</label>
                <input
                  type="number"
                  min="1920"
                  max="2035"
                  value={birthYear}
                  onChange={(e) => setBirthYear(parseInt(e.target.value) || 1990)}
                  className="w-24 p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Gender:</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 cursor-pointer"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>

          {/* Kua Result Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Kua Profile Card (4 cols) */}
            <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Natal Energy Archetype
              </span>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl font-black text-amber-400">
                    Kua #{personalKuaResult.kuaNumber}
                  </div>
                  <div className="text-sm font-bold text-slate-200 mt-0.5">
                    {personalKuaResult.trigram}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400">Element</div>
                  <div className="text-base font-black text-white">{personalKuaResult.element}</div>
                </div>
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs space-y-1">
                <div className="font-bold text-amber-300">{personalKuaResult.group}</div>
                <p className="text-[11px] text-slate-300">
                  {personalKuaResult.group.includes("East")
                    ? "Your natural magnetic allies are East, South-East, North, and South. Align your primary activities towards these cardinal sectors."
                    : "Your natural magnetic allies are West, North-West, South-West, and North-East. Avoid facing East Group directions for critical work."}
                </p>
              </div>
            </div>

            {/* 4 Lucky & 4 Unlucky Directions (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* 4 Auspicious Directions */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Your 4 Lucky Auspicious Directions
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {personalKuaResult.auspiciousDirections.map((dir, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-100 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between font-black text-emerald-950">
                        <span>{dir.name}</span>
                        <span className="text-[11px] bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                          {dir.chinese}
                        </span>
                      </div>
                      <div className="font-bold text-emerald-800">{dir.direction}</div>
                      <p className="text-[11px] text-emerald-900 leading-relaxed pt-0.5">
                        {dir.benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4 Inauspicious Directions */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-rose-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Your 4 Inauspicious Directions (Avoid Facing)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {personalKuaResult.inauspiciousDirections.map((dir, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-rose-50/80 border border-rose-100 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between font-black text-rose-950">
                        <span>{dir.name}</span>
                        <span className="text-[11px] bg-white px-2 py-0.5 rounded-md border border-rose-200">
                          {dir.chinese}
                        </span>
                      </div>
                      <div className="font-bold text-rose-800">{dir.direction}</div>
                      <p className="text-[11px] text-rose-900 leading-relaxed pt-0.5">
                        {dir.warning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. WU XING 5 ELEMENTS HARMONY VIEW */}
      {activeSubTab === "wu_xing" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              The Productive Sheng Cycle (Nourishing)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              When an area needs an energetic boost, add the nourishing element that precedes it:
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-800">Water feeds Wood</span>
                <span className="text-[11px] text-slate-500">Water features boost green plants</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-800">Wood fuels Fire</span>
                <span className="text-[11px] text-slate-500">Plants strengthen fame and recognition</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-800">Fire creates Earth</span>
                <span className="text-[11px] text-slate-500">Red lamps nurture relationships</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-800">Earth bears Metal</span>
                <span className="text-[11px] text-slate-500">Crystals enhance helpful mentors</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-800">Metal condenses Water</span>
                <span className="text-[11px] text-slate-500">Wind chimes accelerate career wealth</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-rose-600" />
              Sha Chi & Poison Arrow Remedies
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Classic solutions for toxic incoming arrows, beams, and architectural defects:
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100 space-y-1">
                <div className="font-bold text-rose-950">Exposed Overhead Ceiling Beam over Bed/Desk</div>
                <p className="text-[11px] text-rose-900">
                  Remedy: Hang a pair of hollow bamboo flutes with red ribbons angled at 45°, or install false ceiling sheet to conceal the beam.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100 space-y-1">
                <div className="font-bold text-rose-950">Direct Front Door to Back Door Qi Rush</div>
                <p className="text-[11px] text-rose-900">
                  Remedy: Place a decorative wooden folding screen, tall round-leaf plant, or faceted crystal sphere between doors to meander incoming qi.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100 space-y-1">
                <div className="font-bold text-rose-950">Mirror Facing the Sleeping Bed</div>
                <p className="text-[11px] text-rose-900">
                  Remedy: Cover the mirror with a fabric drape at night, or reorient mirror so the sleeping couple is never reflected.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
