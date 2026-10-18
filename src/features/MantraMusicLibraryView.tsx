import React, { useState, useMemo } from "react";
import { UserProfile } from "../types";
import { SACRED_MANTRAS_LIBRARY, MantraItem } from "../data/mantrasData";
import { MantraDetailSadhanaPage } from "../components/MantraDetailSadhanaPage";
import { D3MantraAudioVisualizer } from "../components/D3MantraAudioVisualizer";
import { AmbientSoundMixer } from "../components/AmbientSoundMixer";
import { SpiritualRemediesMantrasView } from "../components/SpiritualRemediesMantrasView";
import { 
  Sparkles, 
  Search, 
  Music, 
  Flame, 
  Volume2, 
  Sun, 
  Layers, 
  SlidersHorizontal,
  ChevronRight,
  BookOpen,
  Shield,
  Activity,
  Compass,
  Play
} from "lucide-react";

interface MantraMusicLibraryViewProps {
  userProfile?: UserProfile | null;
}

export const MantraMusicLibraryView: React.FC<MantraMusicLibraryViewProps> = ({
  userProfile
}) => {
  const [activeTab, setActiveTab] = useState<"library" | "visualizer" | "remedies" | "ambient">("library");
  const [selectedMantra, setSelectedMantra] = useState<MantraItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedMantraType, setSelectedMantraType] = useState<string>("all");
  const [visualizerPlaying, setVisualizerPlaying] = useState<boolean>(true);

  // Extract all unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    SACRED_MANTRAS_LIBRARY.forEach((m) => {
      if (m.category) set.add(m.category);
    });
    return Array.from(set);
  }, []);

  // Filtered mantras
  const filteredMantras = useMemo(() => {
    return SACRED_MANTRAS_LIBRARY.filter((item) => {
      const matchSearch =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sanskritTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.deity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.associatedPlanet && item.associatedPlanet.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.problemSolved.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      const matchType =
        selectedMantraType === "all" || item.mantraType === selectedMantraType;

      return matchSearch && matchCategory && matchType;
    });
  }, [searchQuery, selectedCategory, selectedMantraType]);

  // If a mantra is selected for deep Sadhana page
  if (selectedMantra) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 py-6 px-4 md:px-8">
        <MantraDetailSadhanaPage
          mantra={selectedMantra}
          allMantras={SACRED_MANTRAS_LIBRARY}
          onBack={() => setSelectedMantra(null)}
          onSelectMantra={(m) => setSelectedMantra(m)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Hero Header */}
      <div className="relative border-b border-amber-900/30 bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 px-4 py-10 md:py-14 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sacred Sound Science & Vedic Frequencies</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-amber-100 tracking-tight">
                Mantra & Sacred Music Sanctuary
              </h1>
              <p className="mt-2 text-slate-400 max-w-2xl text-sm md:text-base">
                Immerse in ancient primordial resonance. Explore over {SACRED_MANTRAS_LIBRARY.length} verified Vedic stotras,
                navagraha seed chants, cosmic audio visualizer waveforms, and targeted remedial sadhanas.
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-inner">
              <button
                onClick={() => setActiveTab("library")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "library"
                    ? "bg-amber-500 text-slate-950 shadow-md font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Sacred Library</span>
              </button>
              <button
                onClick={() => setActiveTab("visualizer")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "visualizer"
                    ? "bg-amber-500 text-slate-950 shadow-md font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Audio Visualizer</span>
              </button>
              <button
                onClick={() => setActiveTab("remedies")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "remedies"
                    ? "bg-amber-500 text-slate-950 shadow-md font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Flame className="w-4 h-4" />
                <span>Planetary Remedies</span>
              </button>
              <button
                onClick={() => setActiveTab("ambient")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "ambient"
                    ? "bg-amber-500 text-slate-950 shadow-md font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>Ambient Mixer</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
        {/* Tab 1: Library View */}
        {activeTab === "library" && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 md:p-6 backdrop-blur shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by deity, planet, ailment, or Sanskrit text..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                {/* Category Dropdown */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
                  >
                    <option value="all">All Categories ({SACRED_MANTRAS_LIBRARY.length})</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Type Filter */}
                <div className="relative">
                  <select
                    value={selectedMantraType}
                    onChange={(e) => setSelectedMantraType(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
                  >
                    <option value="all">All Mantra Forms (Beej, Stotra, Vedic, Kavach...)</option>
                    <option value="Beej">Beej (Root Frequencies)</option>
                    <option value="Vedic">Vedic Suktams</option>
                    <option value="Puranic">Puranic Navagraha</option>
                    <option value="Gayatri">Gayatri Chants</option>
                    <option value="Kavach">Raksha Kavach</option>
                    <option value="Tantrik">Tantrik & Mahavidya</option>
                    <option value="Shabar">Shabar & Siddha</option>
                  </select>
                </div>
              </div>

              {/* Status info */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
                <span>Showing <strong className="text-amber-300 font-semibold">{filteredMantras.length}</strong> sacred mantras</span>
                {(searchQuery || selectedCategory !== "all" || selectedMantraType !== "all") && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                      setSelectedMantraType("all");
                    }}
                    className="text-amber-400 hover:text-amber-300 underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </div>

            {/* Grid of Mantras */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredMantras.map((mantra) => (
                <div
                  key={mantra.id}
                  onClick={() => setSelectedMantra(mantra)}
                  className="group relative bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/50 rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between"
                >
                  <div>
                    {/* Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        {mantra.mantraType || "Vedic"}
                      </span>
                      {mantra.associatedPlanet && (
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Sun className="w-3 h-3 text-amber-400" />
                          <span>{mantra.associatedPlanet}</span>
                        </span>
                      )}
                    </div>

                    {/* Titles */}
                    <h3 className="font-serif text-lg font-bold text-amber-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                      {mantra.title}
                    </h3>
                    <p className="text-sm font-serif text-amber-400/90 italic mt-0.5 line-clamp-1">
                      {mantra.sanskritTitle}
                    </p>

                    {/* Sanskrit Script snippet */}
                    <div className="my-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/60 text-xs font-serif text-amber-200/80 line-clamp-2 leading-relaxed">
                      {mantra.sanskritScript}
                    </div>

                    {/* Problem Solved */}
                    <div className="text-xs text-slate-400 line-clamp-2 mb-2">
                      <span className="text-slate-300 font-medium">Benefits: </span>
                      {mantra.problemSolved}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-amber-400 font-medium group-hover:text-amber-300">
                    <span>Begin Japa & Sadhana</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            {filteredMantras.length === 0 && (
              <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
                <Music className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-lg font-serif text-slate-300">No sacred chants matched your criteria</h3>
                <p className="text-sm text-slate-500 mt-1">Try adjusting the search query or resetting filters.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Visualizer View */}
        {activeTab === "visualizer" && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-serif font-bold text-amber-100 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-amber-400" />
                    <span>Real-Time Vedic Sound Visualizer & Wave Synthesizer</span>
                  </h2>
                  <p className="text-xs md:text-sm text-slate-400 mt-1">
                    Visualizes geometric cymatics, chakra nodal harmonics, and sacred Sri Yantra vibrational waves.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setVisualizerPlaying(!visualizerPlaying)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{visualizerPlaying ? "Active Resonance" : "Pause Resonance"}</span>
                  </button>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 p-4">
                <D3MantraAudioVisualizer
                  isPlaying={visualizerPlaying}
                  mantraTitle="Maha Mrityunjaya & Gayatri Harmonic Synthesis"
                  rashi="Aries / Mesha"
                  height={340}
                  showControls={true}
                />
              </div>
            </div>

            {/* Quick Presets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SACRED_MANTRAS_LIBRARY.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedMantra(item)}
                  className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-colors"
                >
                  <div className="text-xs text-amber-400 font-semibold uppercase">{item.deity}</div>
                  <div className="text-sm font-bold text-slate-100 mt-1">{item.title}</div>
                  <div className="text-xs text-slate-400 mt-2 line-clamp-1">{item.problemSolved}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Planetary & Astrological Remedies */}
        {activeTab === "remedies" && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <SpiritualRemediesMantrasView
                lifePathNumber={userProfile?.numerology?.destinyNumber || 1}
                driverNumber={userProfile?.numerology?.driverNumber || 1}
                missingNumbers={[]}
                karmicDebts={[]}
              />
            </div>
          </div>
        )}

        {/* Tab 4: Ambient Sound Mixer */}
        {activeTab === "ambient" && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="mb-6">
                <h2 className="text-xl font-serif font-bold text-amber-100 flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-amber-400" />
                  <span>Vedic Sacred Meditation Soundboard</span>
                </h2>
                <p className="text-xs md:text-sm text-slate-400 mt-1">
                  Blend Himalayan singing bowls, temple gongs, holy fire havans, rain, and tanpura drone layers.
                </p>
              </div>
              <AmbientSoundMixer mantraTitle="Universal Cosmic Meditation" initialIsOpen={true} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
