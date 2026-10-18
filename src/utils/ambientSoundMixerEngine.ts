// Ambient Sound & Solfeggio Hertz Synthesizer Engine using Web Audio API

export interface SoundChannel {
  id: string;
  name: string;
  category: "Hertz Frequency" | "Sacred Acoustic" | "Nature & Elements";
  hz?: number;
  description: string;
  defaultVolume: number; // 0.0 to 1.0
  volume: number;
  muted: boolean;
}

export const SOUND_CHANNELS: SoundChannel[] = [
  {
    id: "om_136_1",
    name: "Sacred OM Drone",
    category: "Hertz Frequency",
    hz: 136.1,
    description: "Cosmic Earth Year / Pranava root tone for deep serenity",
    defaultVolume: 0.6,
    volume: 0.6,
    muted: false,
  },
  {
    id: "bowl_432",
    name: "Singing Bowl Resonance",
    category: "Hertz Frequency",
    hz: 432,
    description: "Verdi / Natural cosmic tuning for heart coherence",
    defaultVolume: 0.45,
    volume: 0.45,
    muted: false,
  },
  {
    id: "solfeggio_528",
    name: "Solfeggio 528 Hz",
    category: "Hertz Frequency",
    hz: 528,
    description: "Transformation, cellular repair & miracle resonance",
    defaultVolume: 0.35,
    volume: 0.35,
    muted: false,
  },
  {
    id: "solfeggio_396",
    name: "Solfeggio 396 Hz",
    category: "Hertz Frequency",
    hz: 396,
    description: "Muladhara seed: liberation from fear, guilt & subconscious grief",
    defaultVolume: 0.0,
    volume: 0.0,
    muted: false,
  },
  {
    id: "solfeggio_639",
    name: "Solfeggio 639 Hz",
    category: "Hertz Frequency",
    hz: 639,
    description: "Anahata harmony: relationship healing & interpersonal love",
    defaultVolume: 0.0,
    volume: 0.0,
    muted: false,
  },
  {
    id: "solfeggio_741",
    name: "Solfeggio 741 Hz",
    category: "Hertz Frequency",
    hz: 741,
    description: "Vishuddha: intuition awakening, truth speech & toxin clearance",
    defaultVolume: 0.0,
    volume: 0.0,
    muted: false,
  },
  {
    id: "solfeggio_852",
    name: "Solfeggio 852 Hz",
    category: "Hertz Frequency",
    hz: 852,
    description: "Ajna third eye: return to spiritual order & lucid inner sight",
    defaultVolume: 0.0,
    volume: 0.0,
    muted: false,
  },
  {
    id: "solfeggio_963",
    name: "Solfeggio 963 Hz",
    category: "Hertz Frequency",
    hz: 963,
    description: "Sahasrara crown: pineal activation & pure non-dual oneness",
    defaultVolume: 0.0,
    volume: 0.0,
    muted: false,
  },
  {
    id: "tanpura_drone",
    name: "Tanpura Meditation Drone",
    category: "Sacred Acoustic",
    hz: 144,
    description: "Classical Sa-Pa four-string hypnotic overtone drone",
    defaultVolume: 0.4,
    volume: 0.4,
    muted: false,
  },
  {
    id: "binaural_theta",
    name: "Binaural Theta Waves (6 Hz)",
    category: "Hertz Frequency",
    hz: 6,
    description: "Entrains brain into deep subconscious Japa trance state",
    defaultVolume: 0.3,
    volume: 0.3,
    muted: false,
  },
  {
    id: "temple_bells",
    name: "Temple Bell Harmonics",
    category: "Sacred Acoustic",
    description: "Gentle rhythmic metallic temple chimes & bell overtones",
    defaultVolume: 0.25,
    volume: 0.25,
    muted: false,
  },
  {
    id: "sacred_river",
    name: "Flowing Sacred Waters",
    category: "Nature & Elements",
    description: "Soothing flow of Ganga / Himalayan stream purifying mind",
    defaultVolume: 0.2,
    volume: 0.2,
    muted: false,
  },
  {
    id: "homa_fire",
    name: "Agni Hotra Fire Crackle",
    category: "Nature & Elements",
    description: "Subtle soothing warmth of sacred Vedic sacrificial fire",
    defaultVolume: 0.0,
    volume: 0.0,
    muted: false,
  },
  {
    id: "pink_silence",
    name: "Pink Noise Stillness",
    category: "Nature & Elements",
    description: "Soft broadband acoustic curtain masking exterior distraction",
    defaultVolume: 0.0,
    volume: 0.0,
    muted: false,
  },
];

export interface MixerPreset {
  id: string;
  name: string;
  description: string;
  volumes: Record<string, number>;
}

export const MIXER_PRESETS: MixerPreset[] = [
  {
    id: "deep_japa",
    name: "Deep Japa Meditation",
    description: "Sacred 136.1Hz OM + 432Hz Singing Bowl + Tanpura Drone",
    volumes: {
      om_136_1: 0.65,
      bowl_432: 0.45,
      tanpura_drone: 0.4,
      binaural_theta: 0.25,
      solfeggio_528: 0.0,
      solfeggio_396: 0.0,
      solfeggio_639: 0.0,
      solfeggio_741: 0.0,
      solfeggio_852: 0.0,
      solfeggio_963: 0.0,
      temple_bells: 0.2,
      sacred_river: 0.0,
      homa_fire: 0.0,
      pink_silence: 0.0,
    },
  },
  {
    id: "miracle_528",
    name: "528 Hz Cellular Healing",
    description: "Solfeggio 528Hz + Sacred River Stream + Gentle Bell Harmonics",
    volumes: {
      om_136_1: 0.25,
      bowl_432: 0.2,
      solfeggio_528: 0.7,
      sacred_river: 0.35,
      temple_bells: 0.3,
      tanpura_drone: 0.15,
      binaural_theta: 0.0,
      solfeggio_396: 0.0,
      solfeggio_639: 0.0,
      solfeggio_741: 0.0,
      solfeggio_852: 0.0,
      solfeggio_963: 0.0,
      homa_fire: 0.0,
      pink_silence: 0.1,
    },
  },
  {
    id: "pineal_awakening",
    name: "Crown & Pineal Activation",
    description: "Solfeggio 963Hz + 852Hz Third Eye + Binaural Theta",
    volumes: {
      om_136_1: 0.3,
      bowl_432: 0.0,
      solfeggio_963: 0.6,
      solfeggio_852: 0.5,
      binaural_theta: 0.4,
      tanpura_drone: 0.2,
      solfeggio_528: 0.0,
      solfeggio_396: 0.0,
      solfeggio_639: 0.0,
      solfeggio_741: 0.0,
      temple_bells: 0.15,
      sacred_river: 0.0,
      homa_fire: 0.0,
      pink_silence: 0.0,
    },
  },
  {
    id: "agni_homa",
    name: "Agni Hotra Yajna",
    description: "Sacred Fire Crackle + 136.1Hz OM + Temple Bell Rings",
    volumes: {
      om_136_1: 0.5,
      homa_fire: 0.55,
      temple_bells: 0.4,
      tanpura_drone: 0.3,
      bowl_432: 0.2,
      solfeggio_528: 0.0,
      solfeggio_396: 0.0,
      solfeggio_639: 0.0,
      solfeggio_741: 0.0,
      solfeggio_852: 0.0,
      solfeggio_963: 0.0,
      binaural_theta: 0.0,
      sacred_river: 0.0,
      pink_silence: 0.0,
    },
  },
  {
    id: "fear_liberation",
    name: "396 Hz Fear & Guilt Liberation",
    description: "Root Chakra 396Hz + Tanpura + Earth 136.1Hz Om",
    volumes: {
      solfeggio_396: 0.65,
      om_136_1: 0.45,
      tanpura_drone: 0.35,
      bowl_432: 0.2,
      solfeggio_528: 0.0,
      solfeggio_639: 0.0,
      solfeggio_741: 0.0,
      solfeggio_852: 0.0,
      solfeggio_963: 0.0,
      binaural_theta: 0.2,
      temple_bells: 0.0,
      sacred_river: 0.15,
      homa_fire: 0.0,
      pink_silence: 0.0,
    },
  },
];

class AmbientSoundMixerEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private masterGain: GainNode | null = null;
  private masterVolume: number = 0.8;
  private channelGains: Map<string, GainNode> = new Map();
  private channelNodes: Map<string, any> = new Map();
  private bellInterval: any = null;

  constructor() {
    // Lazy initialized on user gesture
  }

  private initAudioContext(): boolean {
    if (typeof window === "undefined") return false;
    try {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return false;
        this.ctx = new AudioContextClass();
      }
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      if (!this.masterGain && this.ctx) {
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
      return true;
    } catch {
      return false;
    }
  }

  public start(channelVolumes: Record<string, { volume: number; muted: boolean }>, masterVol?: number): void {
    if (this.isRunning) return;
    if (!this.initAudioContext() || !this.ctx || !this.masterGain) return;

    if (masterVol !== undefined) {
      this.masterVolume = masterVol;
      this.masterGain.gain.setValueAtTime(masterVol, this.ctx.currentTime);
    }

    this.isRunning = true;
    const now = this.ctx.currentTime;

    // Build all synth tracks
    SOUND_CHANNELS.forEach((ch) => {
      const config = channelVolumes[ch.id] || { volume: ch.defaultVolume, muted: false };
      const effectiveVol = config.muted ? 0 : config.volume;

      const gain = this.ctx!.createGain();
      gain.gain.setValueAtTime(effectiveVol * 0.2, now);
      gain.connect(this.masterGain!);
      this.channelGains.set(ch.id, gain);

      this.startChannelNode(ch.id, gain);
    });

    // Start intermittent gentle temple bell chimer
    this.startTempleBellsLoop();
  }

  private startChannelNode(id: string, gain: GainNode): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    switch (id) {
      case "om_136_1": {
        // Fundamental 136.1 Hz + warm harmonic
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(136.1, now);
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(272.2, now);
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450, now);
        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        osc1.start();
        osc2.start();
        this.channelNodes.set(id, { osc1, osc2 });
        break;
      }
      case "bowl_432": {
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(432, now);
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(864, now);
        osc1.connect(gain);
        osc2.connect(gain);
        osc1.start();
        osc2.start();
        this.channelNodes.set(id, { osc1, osc2 });
        break;
      }
      case "solfeggio_528":
      case "solfeggio_396":
      case "solfeggio_639":
      case "solfeggio_741":
      case "solfeggio_852":
      case "solfeggio_963": {
        const ch = SOUND_CHANNELS.find((c) => c.id === id);
        if (ch && ch.hz) {
          const osc = this.ctx.createOscillator();
          osc.type = "sine";
          osc.frequency.setValueAtTime(ch.hz, now);
          osc.connect(gain);
          osc.start();
          this.channelNodes.set(id, { osc });
        }
        break;
      }
      case "tanpura_drone": {
        // Sa-Pa (144 Hz Sa, 216 Hz Pa) with harmonic overtones
        const oscSa = this.ctx.createOscillator();
        const oscPa = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        oscSa.type = "sawtooth";
        oscSa.frequency.setValueAtTime(144, now);
        oscPa.type = "sawtooth";
        oscPa.frequency.setValueAtTime(216, now);
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(320, now);
        oscSa.connect(filter);
        oscPa.connect(filter);
        filter.connect(gain);
        oscSa.start();
        oscPa.start();
        this.channelNodes.set(id, { oscSa, oscPa });
        break;
      }
      case "binaural_theta": {
        // 216 Hz left ear, 222 Hz right ear = 6 Hz theta beat
        const merger = this.ctx.createChannelMerger(2);
        const oscL = this.ctx.createOscillator();
        const oscR = this.ctx.createOscillator();
        oscL.type = "sine";
        oscL.frequency.setValueAtTime(216, now);
        oscR.type = "sine";
        oscR.frequency.setValueAtTime(222, now);
        oscL.connect(merger, 0, 0);
        oscR.connect(merger, 0, 1);
        merger.connect(gain);
        oscL.start();
        oscR.start();
        this.channelNodes.set(id, { oscL, oscR, merger });
        break;
      }
      case "sacred_river": {
        // Filtered white noise modulated to sound like flowing water
        const bufferSize = this.ctx.sampleRate * 2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.15;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;
        const filter = this.ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(600, now);
        filter.Q.setValueAtTime(1.5, now);
        noise.connect(filter);
        filter.connect(gain);
        noise.start();
        this.channelNodes.set(id, { noise });
        break;
      }
      case "homa_fire": {
        // Low crackle noise
        const bufferSize = this.ctx.sampleRate * 2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          const r = Math.random();
          data[i] = r > 0.985 ? (Math.random() * 2 - 1) * 0.4 : (Math.random() * 2 - 1) * 0.03;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;
        const filter = this.ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(800, now);
        noise.connect(filter);
        filter.connect(gain);
        noise.start();
        this.channelNodes.set(id, { noise });
        break;
      }
      case "pink_silence": {
        const bufferSize = this.ctx.sampleRate * 2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
          b6 = white * 0.115926;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;
        noise.connect(gain);
        noise.start();
        this.channelNodes.set(id, { noise });
        break;
      }
    }
  }

  private startTempleBellsLoop(): void {
    if (this.bellInterval) clearInterval(this.bellInterval);
    this.bellInterval = setInterval(() => {
      if (!this.isRunning || !this.ctx) return;
      const bellGain = this.channelGains.get("temple_bells");
      if (!bellGain || bellGain.gain.value <= 0.001) return;

      try {
        const now = this.ctx.currentTime;
        const freqs = [540, 810, 1080];
        freqs.forEach((f, idx) => {
          const osc = this.ctx!.createOscillator();
          const g = this.ctx!.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(f, now);
          g.gain.setValueAtTime(idx === 0 ? 0.08 : 0.03, now);
          g.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);
          osc.connect(g);
          g.connect(bellGain);
          osc.start(now);
          osc.stop(now + 3.0);
        });
      } catch {}
    }, 9000);
  }

  public setChannelVolume(id: string, volume: number, muted: boolean): void {
    const gain = this.channelGains.get(id);
    if (!gain || !this.ctx) return;
    const target = muted ? 0 : volume * 0.2;
    gain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
  }

  public setMasterVolume(vol: number): void {
    this.masterVolume = vol;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(vol, this.ctx.currentTime, 0.05);
    }
  }

  public stop(): void {
    if (!this.isRunning) return;
    if (this.bellInterval) {
      clearInterval(this.bellInterval);
      this.bellInterval = null;
    }

    if (this.channelNodes) {
      this.channelNodes.forEach((node) => {
        try {
          if (node.osc) node.osc.stop();
          if (node.osc1) node.osc1.stop();
          if (node.osc2) node.osc2.stop();
          if (node.oscSa) node.oscSa.stop();
          if (node.oscPa) node.oscPa.stop();
          if (node.oscL) node.oscL.stop();
          if (node.oscR) node.oscR.stop();
          if (node.noise) node.noise.stop();
        } catch {}
      });
      this.channelNodes.clear();
    }
    this.channelGains.clear();
    this.isRunning = false;
  }

  public getIsRunning(): boolean {
    return this.isRunning;
  }
}

export const ambientMixerEngine = new AmbientSoundMixerEngine();
