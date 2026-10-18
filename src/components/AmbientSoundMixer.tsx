import React, { useState, useEffect, useRef } from "react";
import { 
  SOUND_CHANNELS, 
  MIXER_PRESETS, 
  ambientMixerEngine, 
  SoundChannel, 
  MixerPreset 
} from "../utils/ambientSoundMixerEngine";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Sparkles, 
  Clock, 
  Sliders, 
  Music, 
  Waves, 
  Flame, 
  Bell, 
  Check,
  ChevronDown,
  ChevronUp,
  Activity
} from "lucide-react";

interface AmbientSoundMixerProps {
  mantraTitle?: string;
  className?: string;
  initialIsOpen?: boolean;
}

export const AmbientSoundMixer: React.FC<AmbientSoundMixerProps> = ({
  mantraTitle,
  className = "",
  initialIsOpen = true,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [masterVolume, setMasterVolume] = useState<number>(0.8);
  const [channels, setChannels] = useState<SoundChannel[]>(() => {
    return SOUND_CHANNELS.map((ch) => ({ ...ch, volume: ch.defaultVolume, muted: false }));
  });
  const [activePresetId, setActivePresetId] = useState<string>("deep_japa");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");
  const [isConsoleExpanded, setIsConsoleExpanded] = useState<boolean>(initialIsOpen);

  // Meditation timer state
  const [timerMinutes, setTimerMinutes] = useState<number>(20); // 0 = continuous
  const [remainingSeconds, setRemainingSeconds] = useState<number>(20 * 60);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const timerIntervalRef = useRef<any>(null);

  // Synchronize playback with engine
  const handleTogglePlay = () => {
    if (isPlaying) {
      ambientMixerEngine.stop();
      setIsPlaying(false);
      setTimerActive(false);
    } else {
      const channelConfigs: Record<string, { volume: number; muted: boolean }> = {};
      channels.forEach((ch) => {
        channelConfigs[ch.id] = { volume: ch.volume, muted: ch.muted };
      });
      ambientMixerEngine.start(channelConfigs, masterVolume);
      setIsPlaying(true);
      if (timerMinutes > 0) {
        setTimerActive(true);
      }
    }
  };

  // Timer tick effect
  useEffect(() => {
    if (timerActive && isPlaying && timerMinutes > 0) {
      timerIntervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            ambientMixerEngine.stop();
            setIsPlaying(false);
            setTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [timerActive, isPlaying, timerMinutes]);

  // Handle setting new timer duration
  const handleSelectTimer = (mins: number) => {
    setTimerMinutes(mins);
    setRemainingSeconds(mins * 60);
    if (mins > 0 && isPlaying) {
      setTimerActive(true);
    } else if (mins === 0) {
      setTimerActive(false);
    }
  };

  // Handle master volume change
  const handleMasterVolumeChange = (newVol: number) => {
    setMasterVolume(newVol);
    ambientMixerEngine.setMasterVolume(newVol);
  };

  // Handle individual channel volume change
  const handleChannelVolumeChange = (id: string, newVol: number) => {
    setChannels((prev) =>
      prev.map((ch) => {
        if (ch.id === id) {
          const updated = { ...ch, volume: newVol, muted: newVol === 0 ? true : false };
          if (isPlaying) {
            ambientMixerEngine.setChannelVolume(id, newVol, updated.muted);
          }
          return updated;
        }
        return ch;
      })
    );
    setActivePresetId("custom");
  };

  // Handle channel mute toggle
  const handleToggleMute = (id: string) => {
    setChannels((prev) =>
      prev.map((ch) => {
        if (ch.id === id) {
          const nextMuted = !ch.muted;
          if (isPlaying) {
            ambientMixerEngine.setChannelVolume(id, ch.volume, nextMuted);
          }
          return { ...ch, muted: nextMuted };
        }
        return ch;
      })
    );
    setActivePresetId("custom");
  };

  // Apply preset
  const handleApplyPreset = (preset: MixerPreset) => {
    setActivePresetId(preset.id);
    setChannels((prev) =>
      prev.map((ch) => {
        const targetVol = preset.volumes[ch.id] ?? 0;
        const updated = { ...ch, volume: targetVol, muted: targetVol === 0 };
        if (isPlaying) {
          ambientMixerEngine.setChannelVolume(ch.id, targetVol, updated.muted);
        }
        return updated;
      })
    );
  };

  // Reset all to silence
  const handleMuteAll = () => {
    setChannels((prev) =>
      prev.map((ch) => {
        if (isPlaying) {
          ambientMixerEngine.setChannelVolume(ch.id, 0, true);
        }
        return { ...ch, volume: 0, muted: true };
      })
    );
    setActivePresetId("silent");
  };

  // Format timer display mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Filtered channels by category
  const filteredChannels = channels.filter((ch) => {
    if (activeCategoryFilter === "all") return true;
    return ch.category === activeCategoryFilter;
  });

  return (
    <div className={`bg-slate-950 text-amber-100 rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden ${className}`}>
      {/* Console Header & Master Controls */}
      <div className="p-5 sm:p-6 bg-linear-to-r from-slate-950 via-[#1a140f] to-slate-950 border-b border-amber-500/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold tracking-wider border border-amber-500/30 inline-flex items-center gap-1">
                <Activity className="w-3 h-3 text-amber-400 animate-pulse" />
                Hertz Meditation Mixer &amp; Acoustic Sanctuary
              </span>
              {isPlaying && (
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  Live Soundscape Active
                </span>
              )}
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-amber-100 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-400" />
              <span>Solfeggio Hertz &amp; Ambient Drone Console</span>
            </h3>
            <p className="text-xs text-amber-200/70">
              {mantraTitle ? `Tailored sonic resonance for: ${mantraTitle}` : "Pure multi-track synthesized frequencies for deep Japa focus & cellular tranquility."}
            </p>
          </div>

          {/* Master Transport & Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Master Play / Stop Button */}
            <button
              onClick={handleTogglePlay}
              className={`px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg cursor-pointer ${
                isPlaying
                  ? "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/40"
                  : "bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-900/40 font-extrabold"
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlaying ? "Stop Soundscape" : "Start Ambient Mixer"}</span>
            </button>

            {/* Master Volume Fader */}
            <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-2 rounded-2xl border border-amber-500/20">
              <Volume2 className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Master</span>
                  <span>{Math.round(masterVolume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={masterVolume}
                  onChange={(e) => handleMasterVolumeChange(parseFloat(e.target.value))}
                  className="w-20 sm:w-24 accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>
            </div>

            {/* Expand / Collapse Button */}
            <button
              onClick={() => setIsConsoleExpanded(!isConsoleExpanded)}
              className="p-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/20 text-xs flex items-center gap-1 cursor-pointer transition-colors"
              title={isConsoleExpanded ? "Collapse Faders" : "Expand All Faders"}
            >
              {isConsoleExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Meditation Timer Strip */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-amber-200">Sadhana Timer:</span>
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              {[10, 20, 30, 45, 60, 0].map((mins) => (
                <button
                  key={mins}
                  onClick={() => handleSelectTimer(mins)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                    timerMinutes === mins
                      ? "bg-amber-400 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {mins === 0 ? "Infinite" : `${mins}m`}
                </button>
              ))}
            </div>
          </div>

          {timerMinutes > 0 && (
            <div className="flex items-center gap-2 font-mono font-bold text-amber-300 bg-slate-900/80 px-3 py-1 rounded-xl border border-amber-500/20 text-xs">
              <span className="text-[10px] text-slate-400 uppercase font-sans">Remaining:</span>
              <span>{formatTime(remainingSeconds)}</span>
            </div>
          )}
        </div>

        {/* Quick Ambient Presets Strip */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-amber-400/80 font-bold mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Harmonic Presets:</span>
          </span>
          {MIXER_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleApplyPreset(p)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                activePresetId === p.id
                  ? "bg-amber-400 text-slate-950 shadow-md font-bold"
                  : "bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-700/60"
              }`}
              title={p.description}
            >
              {p.name}
            </button>
          ))}
          <button
            onClick={handleMuteAll}
            className="px-2.5 py-1 rounded-full text-[11px] text-slate-400 hover:text-rose-400 bg-slate-900 border border-slate-800 transition-colors ml-auto cursor-pointer"
          >
            Mute All Tracks
          </button>
        </div>
      </div>

      {/* Expandable Multi-Channel Console */}
      {isConsoleExpanded && (
        <div className="p-5 sm:p-6 space-y-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-medium mr-1">Filter Layers:</span>
              {[
                { id: "all", label: "All Layers (14)" },
                { id: "Hertz Frequency", label: "Solfeggio & Hertz" },
                { id: "Sacred Acoustic", label: "Tanpura & Bells" },
                { id: "Nature & Elements", label: "Elements & Noise" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryFilter(cat.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    activeCategoryFilter === cat.id
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="text-[11px] text-slate-400 italic">
              Adjust individual faders to balance your personal meditation frequency
            </div>
          </div>

          {/* Sound Faders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {filteredChannels.map((channel) => {
              const isChannelActive = isPlaying && !channel.muted && channel.volume > 0;
              return (
                <div
                  key={channel.id}
                  className={`p-3.5 rounded-2xl border transition-all duration-200 space-y-2.5 relative ${
                    isChannelActive
                      ? "bg-slate-900/90 border-amber-500/50 shadow-md shadow-amber-950/20"
                      : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {/* Top: Channel Name, Hz badge, & Mute Toggle */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-xs text-amber-100">{channel.name}</span>
                        {channel.hz && (
                          <span className="px-1.5 py-0.2 rounded-md bg-amber-400/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-500/30">
                            {channel.hz} Hz
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5" title={channel.description}>
                        {channel.description}
                      </p>
                    </div>

                    <button
                      onClick={() => handleToggleMute(channel.id)}
                      className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                        channel.muted || channel.volume === 0
                          ? "bg-slate-800 text-slate-500 hover:text-slate-300"
                          : "bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 border border-amber-500/30"
                      }`}
                      title={channel.muted ? "Unmute Track" : "Mute Track"}
                    >
                      {channel.muted || channel.volume === 0 ? (
                        <VolumeX className="w-3.5 h-3.5" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Volume Slider & Visual Level Meter */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                      <span className="text-[9px] uppercase tracking-wider text-slate-500">{channel.category}</span>
                      <span className={isChannelActive ? "text-amber-300 font-bold" : "text-slate-500"}>
                        {channel.muted ? "Muted" : `${Math.round(channel.volume * 100)}%`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={channel.muted ? 0 : channel.volume}
                        onChange={(e) => handleChannelVolumeChange(channel.id, parseFloat(e.target.value))}
                        className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Activity Indicator Line */}
                  {isChannelActive && (
                    <div className="h-0.5 w-full bg-linear-to-r from-amber-400 via-emerald-400 to-amber-400 rounded-full animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Educational Note about Solfeggio & Vedic Sound Vibrations */}
          <div className="p-4 rounded-2xl bg-[#14110C] border border-amber-500/20 text-xs text-amber-200/80 space-y-1.5">
            <strong className="text-amber-300 font-serif font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>The Science of Shastric Sound Vibrations (नाद ब्रह्म):</span>
            </strong>
            <p className="leading-relaxed text-[11px] text-slate-300">
              According to the *Nada Bindu Upanishad*, pure sound frequencies bypass conceptual thought to alter physical and subtle pranic meridians. 136.1 Hz (OM) grounds the nervous system into the cosmic earth frequency; 432 Hz aligns with biological sacred geometry; and Solfeggio frequencies (396Hz–963Hz) dissolve subconscious psychological blockages corresponding to the seven chakras.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
