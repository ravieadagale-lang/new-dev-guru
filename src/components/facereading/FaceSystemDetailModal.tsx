import React, { useState, useEffect } from "react";
import { X, Sparkles, Compass, Shield, Award, Users, Heart, Eye, ChevronRight, Layers, Flame, Trees, Mountain, ShieldAlert } from "lucide-react";

export type FaceSystemSection = "santing" | "wuxing" | "palaces";

interface FaceSystemDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSection?: FaceSystemSection;
  onStartReading?: () => void;
}

export const FaceSystemDetailModal: React.FC<FaceSystemDetailModalProps> = ({
  isOpen,
  onClose,
  initialSection = "santing",
  onStartReading,
}) => {
  const [activeSection, setActiveSection] = useState<FaceSystemSection>(initialSection);

  useEffect(() => {
    if (initialSection) {
      setActiveSection(initialSection);
    }
  }, [initialSection]);

  // ESC key support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-blue-900/20 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white border-b border-blue-800/40 flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-semibold tracking-wide border border-blue-400/30">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span>Classical Mian Xiang Physiognomy Guide</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-blue-100 to-white">
              {activeSection === "santing" && "The Three Zones & Epochs (San Ting)"}
              {activeSection === "wuxing" && "Five Element Face Archetypes (Wu Xing)"}
              {activeSection === "palaces" && "The Twelve Palaces of Destiny (Shi Er Gong)"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveSection("santing")}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeSection === "santing"
                ? "border-blue-600 text-blue-700 bg-white shadow-sm rounded-t-xl"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Part A: San Ting (3 Zones)</span>
          </button>

          <button
            onClick={() => setActiveSection("wuxing")}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeSection === "wuxing"
                ? "border-amber-600 text-amber-700 bg-white shadow-sm rounded-t-xl"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Flame className="w-4 h-4 text-amber-600" />
            <span>Part B: Wu Xing (5 Elements)</span>
          </button>

          <button
            onClick={() => setActiveSection("palaces")}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeSection === "palaces"
                ? "border-purple-600 text-purple-700 bg-white shadow-sm rounded-t-xl"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Compass className="w-4 h-4 text-purple-600" />
            <span>Part C: Shi Er Gong (12 Palaces)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-700">
          {/* 1. SAN TING SECTION */}
          {activeSection === "santing" && (
            <div className="space-y-6">
              <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-200">
                <p className="text-xs sm:text-sm text-blue-900 leading-relaxed font-medium">
                  In classical Mian Xiang, the human face is vertically divided into three equal horizontal zones known as <strong>San Ting (三庭)</strong>. Each zone mirrors one of the three principal life epochs (Youth, Prime, and Maturity) and provides insights into where a person&apos;s natural luck, vitality, and karmic harvest are concentrated.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Upper Zone */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Heaven (Shang Ting)
                    </span>
                    <span className="text-xs font-bold text-slate-500">Ages 15 – 30</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-slate-900">
                    Upper Zone: Forehead &amp; Hairline
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Extends from the natural hairline down to the brow line. Reflects inherited family blessings, academic intelligence, early career breakthroughs, and clarity of thought.
                  </p>
                  <div className="pt-2 border-t border-slate-200/80 space-y-1 text-[11px] text-slate-600">
                    <p><strong>Auspicious Traits:</strong> Smooth, rounded, high, and clear forehead without deep horizontal gouges.</p>
                    <p><strong>Afflictions:</strong> Narrow hairline, dark indentations, or heavy scarring (indicates early struggle and high self-reliance).</p>
                  </div>
                </div>

                {/* Middle Zone */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Human (Zhong Ting)
                    </span>
                    <span className="text-xs font-bold text-slate-500">Ages 31 – 50</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-slate-900">
                    Middle Zone: Eyes, Nose &amp; Cheeks
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Extends from the eyebrows down to the base of the nose tip. Governs life prime, self-will, career pinnacle, marital stability, and major wealth accumulation.
                  </p>
                  <div className="pt-2 border-t border-slate-200/80 space-y-1 text-[11px] text-slate-600">
                    <p><strong>Auspicious Traits:</strong> Balanced nose bridge, fleshy nostrils, radiant eye spirit, and well-supported cheekbones.</p>
                    <p><strong>Afflictions:</strong> Crooked nose bridge, sunken cheekbones, or overly exposed nostrils (signals volatile income or marital friction).</p>
                  </div>
                </div>

                {/* Lower Zone */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                      Earth (Xia Ting)
                    </span>
                    <span className="text-xs font-bold text-slate-500">Ages 51+</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-slate-900">
                    Lower Zone: Mouth, Jaw &amp; Chin
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Extends from the base of the nose to the bottom of the chin. Governs longevity, later-life wealth stability, relationships with children, and the karmic harvest of retirement.
                  </p>
                  <div className="pt-2 border-t border-slate-200/80 space-y-1 text-[11px] text-slate-600">
                    <p><strong>Auspicious Traits:</strong> Full, firm chin, broad jawline support, deep and clear philtrum, well-defined red lips.</p>
                    <p><strong>Afflictions:</strong> Weak, receding chin, thin crooked mouth, or weak jaw structure (suggests need for early retirement planning).</p>
                  </div>
                </div>
              </div>

              {/* San Ting Balance Matrix */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                <h4 className="font-serif font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>The Ideal Ratio &amp; Dominance Profiles</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="font-bold text-slate-900">1:1:1 Golden Equality (Symmetry)</p>
                    <p className="text-slate-600 text-[11px] mt-0.5">Indicates a smooth, consistent life trajectory without abrupt reversals of fortune.</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="font-bold text-slate-900">Dominant Upper Zone (Thinker Archetype)</p>
                    <p className="text-slate-600 text-[11px] mt-0.5">Strong conceptual thinker, academic success, strategy-driven career.</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="font-bold text-slate-900">Dominant Middle Zone (Executive Archetype)</p>
                    <p className="text-slate-600 text-[11px] mt-0.5">High drive, enterprise builder, peak wealth creation in middle age.</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="font-bold text-slate-900">Dominant Lower Zone (Anchor Archetype)</p>
                    <p className="text-slate-600 text-[11px] mt-0.5">Grounded, lasting endurance, prosperity multiplies steadily with age.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. WU XING SECTION */}
          {activeSection === "wuxing" && (
            <div className="space-y-6">
              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                  <strong>Wu Xing (五行)</strong> classifies constitutional bone structure and facial tissue into Five Elemental Archetypes: Wood, Fire, Earth, Metal, and Water. Your dominant element reveals your innate psychological drivers, communication style, and ideal career strengths.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Wood */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                      <Trees className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-slate-900">Wood Element (The Pioneer / 木)</h4>
                      <p className="text-[11px] text-emerald-700 font-semibold">Rectangular/Tall Bone Structure &bull; Long Eyebrows</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Characterized by an elongated face, high forehead, straight nose, and clear eyes. Visionary, growth-driven, competitive, strategic, and values long-term personal mastery.
                  </p>
                  <p className="text-[11px] text-slate-500"><strong>Best Suited:</strong> Architecture, legal strategy, engineering, entrepreneurship, leadership.</p>
                </div>

                {/* Fire */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-red-100 text-red-800">
                      <Flame className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-slate-900">Fire Element (The Catalyst / 火)</h4>
                      <p className="text-[11px] text-red-700 font-semibold">Pointed Chin &bull; Radiant Eyes &bull; High Cheekbones</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Triangular or diamond facial contour, vibrant expressive eyes, and dynamic movement. Highly charismatic, passionate, inspirational, quick to act, and thrives in high-visibility roles.
                  </p>
                  <p className="text-[11px] text-slate-500"><strong>Best Suited:</strong> Public speaking, performing arts, marketing, sales leadership, media.</p>
                </div>

                {/* Earth */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
                      <Mountain className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-slate-900">Earth Element (The Anchor / 土)</h4>
                      <p className="text-[11px] text-amber-700 font-semibold">Square/Solid Jaw &bull; Full Fleshy Nose &bull; Thick Neck</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Broad bone structure, warm complexion, heavy lower face, and steady gaze. Grounded, patient, deeply loyal, dependable, and possesses high endurance for physical or financial accumulation.
                  </p>
                  <p className="text-[11px] text-slate-500"><strong>Best Suited:</strong> Real estate, banking, manufacturing, operations, asset management.</p>
                </div>

                {/* Metal */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-slate-200 text-slate-800">
                      <Shield className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-slate-900">Metal Element (The Master / 金)</h4>
                      <p className="text-[11px] text-slate-700 font-semibold">Chiseled Oval &bull; Defined Cheekbones &bull; Fair Complexion</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Well-defined structural angles, clear fair skin, piercing gaze, and clean lines. Highly principled, disciplined, precise, values justice, efficiency, and uncompromising quality.
                  </p>
                  <p className="text-[11px] text-slate-500"><strong>Best Suited:</strong> Judiciary, science, quality control, surgical medicine, finance auditing.</p>
                </div>

                {/* Water */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 md:col-span-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-blue-100 text-blue-800">
                      <Sparkles className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-slate-900">Water Element (The Intuitive / 水)</h4>
                      <p className="text-[11px] text-blue-700 font-semibold">Round Soft Contours &bull; Deep Luminous Eyes &bull; Full Soft Lips</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Soft, rounded facial curves, thick lustrous hair, deep emotional presence. Highly adaptable, deeply intuitive, wise, diplomatic, possesses powerful emotional intelligence and psychological insight.
                  </p>
                  <p className="text-[11px] text-slate-500"><strong>Best Suited:</strong> Psychology, diplomacy, counseling, spiritual counseling, creative writing.</p>
                </div>
              </div>
            </div>
          )}

          {/* 3. TWELVE PALACES SECTION */}
          {activeSection === "palaces" && (
            <div className="space-y-6">
              <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-200">
                <p className="text-xs sm:text-sm text-purple-900 leading-relaxed font-medium">
                  The <strong>Twelve Palaces (Shi Er Gong / 十二宫)</strong> map key acupuncture and energetic zones of the face to specific life arenas: career, wealth, marriage, property, health, and family lineage.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                {/* 1. Life Palace */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-900">1. Life Palace (Ming Gong)</span>
                    <span className="text-[10px] text-slate-500">Yin Tang</span>
                  </div>
                  <p className="text-[11px] text-slate-600"><strong>Location:</strong> Space between eyebrows.</p>
                  <p className="text-[11px] text-slate-600">Governs general luck, clarity of mind, and life destiny.</p>
                </div>

                {/* 2. Career Palace */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-900">2. Career Palace (Guan Lu)</span>
                    <span className="text-[10px] text-slate-500">Mid-Forehead</span>
                  </div>
                  <p className="text-[11px] text-slate-600"><strong>Location:</strong> Center of forehead.</p>
                  <p className="text-[11px] text-slate-600">Governs professional status, promotions, and recognition.</p>
                </div>

                {/* 3. Wealth Palace */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-900">3. Wealth Palace (Cai Bo)</span>
                    <span className="text-[10px] text-slate-500">Nose Tip &amp; Wings</span>
                  </div>
                  <p className="text-[11px] text-slate-600"><strong>Location:</strong> Tip of the nose and nostrils.</p>
                  <p className="text-[11px] text-slate-600">Governs financial accumulation, cash flow, and savings.</p>
                </div>

                {/* 4. Marriage Palace */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-900">4. Marriage Palace (Qi Qie)</span>
                    <span className="text-[10px] text-slate-500">Temples</span>
                  </div>
                  <p className="text-[11px] text-slate-600"><strong>Location:</strong> Outer eye corners to temples.</p>
                  <p className="text-[11px] text-slate-600">Governs marital harmony, romantic bond, and partner luck.</p>
                </div>

                {/* 5. Health Palace */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-900">5. Health Palace (Ji E)</span>
                    <span className="text-[10px] text-slate-500">Nose Bridge</span>
                  </div>
                  <p className="text-[11px] text-slate-600"><strong>Location:</strong> Bridge of nose (Shan Gen).</p>
                  <p className="text-[11px] text-slate-600">Governs physical vitality, immune resilience, and recovery.</p>
                </div>

                {/* 6. Children Palace */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-900">6. Children Palace (Zi Xi)</span>
                    <span className="text-[10px] text-slate-500">Under-Eye</span>
                  </div>
                  <p className="text-[11px] text-slate-600"><strong>Location:</strong> Flesh directly under lower eyelids.</p>
                  <p className="text-[11px] text-slate-600">Governs fertility, offspring, and bonding with children.</p>
                </div>

                {/* 7. Property Palace */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-900">7. Property Palace (Tian Zhai)</span>
                    <span className="text-[10px] text-slate-500">Upper Eyelids</span>
                  </div>
                  <p className="text-[11px] text-slate-600"><strong>Location:</strong> Area between eyebrow and eyelid.</p>
                  <p className="text-[11px] text-slate-600">Governs real estate ownership, family assets, and home stability.</p>
                </div>

                {/* 8. Travel Palace */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-900">8. Travel Palace (Qian Yi)</span>
                    <span className="text-[10px] text-slate-500">Upper Forehead Corners</span>
                  </div>
                  <p className="text-[11px] text-slate-600"><strong>Location:</strong> Near the upper side hairline.</p>
                  <p className="text-[11px] text-slate-600">Governs relocation, overseas fortunes, and travel ventures.</p>
                </div>

                {/* 9. Friends & Peers Palace */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-900">9. Friends Palace (Nu Pu)</span>
                    <span className="text-[10px] text-slate-500">Jawline &amp; Lower Cheeks</span>
                  </div>
                  <p className="text-[11px] text-slate-600"><strong>Location:</strong> Base of jaw and cheeks.</p>
                  <p className="text-[11px] text-slate-600">Governs support from colleagues, team loyalty, and mentors.</p>
                </div>

                {/* 10. Fortune & Virtue Palace */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-900">10. Virtue Palace (Fu De)</span>
                    <span className="text-[10px] text-slate-500">Above Outer Brow</span>
                  </div>
                  <p className="text-[11px] text-slate-600"><strong>Location:</strong> Region above the tail of the eyebrow.</p>
                  <p className="text-[11px] text-slate-600">Governs inherited blessings, spiritual peace, and contentment.</p>
                </div>

                {/* 11. Siblings Palace */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-900">11. Siblings Palace (Xiong Di)</span>
                    <span className="text-[10px] text-slate-500">Eyebrows</span>
                  </div>
                  <p className="text-[11px] text-slate-600"><strong>Location:</strong> Left and right eyebrows.</p>
                  <p className="text-[11px] text-slate-600">Governs sibling bonds, social network, and emotional ties.</p>
                </div>

                {/* 12. Parents Palace */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-900">12. Parents Palace (Fu Mu)</span>
                    <span className="text-[10px] text-slate-500">Sun &amp; Moon Horns</span>
                  </div>
                  <p className="text-[11px] text-slate-600"><strong>Location:</strong> Upper forehead bone peaks.</p>
                  <p className="text-[11px] text-slate-600">Governs parental support, ancestral heritage, and early care.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            Ready to apply these classical principles to your own facial photo?
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Close
            </button>
            {onStartReading && (
              <button
                onClick={() => {
                  onClose();
                  onStartReading();
                }}
                className="flex-1 sm:flex-none px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Launch Face Reader</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
