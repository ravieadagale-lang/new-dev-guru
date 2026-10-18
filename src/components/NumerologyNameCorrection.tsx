import React, { useState, useMemo } from "react";
import { NumerologyDetail, PartnerInput } from "../utils/compatibilityCalculator";
import { 
  Sparkles, 
  Hash, 
  BookOpen, 
  CheckCircle2, 
  RefreshCw, 
  Edit3, 
  TrendingUp, 
  Zap, 
  HelpCircle,
  Award
} from "lucide-react";

interface NumerologyNameCorrectionProps {
  numerology?: NumerologyDetail;
  partnerA?: PartnerInput;
  partnerB?: PartnerInput;
  userProfile?: any;
  selectedLanguage?: any;
}

// Chaldean letter values
const CHALDEAN_MAP: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8
};

// Calculate compound single-digit numerology value
function calculateNameNumber(name: string): { single: number; compound: number } {
  const clean = name.toUpperCase().replace(/[^A-Z]/g, "");
  let sum = 0;
  for (let i = 0; i < clean.length; i++) {
    const char = clean[i];
    sum += CHALDEAN_MAP[char] || 1;
  }

  let reduce = sum;
  while (reduce > 9 && reduce !== 11 && reduce !== 22 && reduce !== 33) {
    reduce = reduce.toString().split("").reduce((acc, curr) => acc + parseInt(curr), 0);
  }

  return { single: reduce, compound: sum };
}

export const NUMEROLOGY_NUMBER_DESCRIPTIONS: Record<number, { title: string; ruler: string; traits: string; marriageSynergy: string }> = {
  1: {
    title: "Number 1 - The Pioneer & Leader",
    ruler: "Sun (Surya)",
    traits: "Independent, ambitious, decisive, highly self-reliant, strong executive drive.",
    marriageSynergy: "Thrives with supportive, patient partners (Numbers 2, 3, 5, 7). Needs mutual freedom without micromanagement."
  },
  2: {
    title: "Number 2 - The Peacemaker & Harmonizer",
    ruler: "Moon (Chandra)",
    traits: "Diplomatic, intuitive, empathetic, peace-loving, deeply gentle and supportive.",
    marriageSynergy: "Harmonizes effortlessly with Numbers 1, 4, 7, 8. Ideal anchor for intense or fiery partners."
  },
  3: {
    title: "Number 3 - The Creative & Communicator",
    ruler: "Jupiter (Guru)",
    traits: "Optimistic, expressive, artistic, joyful, charismatic storyteller.",
    marriageSynergy: "Brings joy and laughter to Numbers 1, 3, 5, 6, 9. Flourishes when praised and given creative space."
  },
  4: {
    title: "Number 4 - The Master Builder & Anchor",
    ruler: "Rahu / Uranus",
    traits: "Methodical, practical, loyal, structured, devoted family foundation.",
    marriageSynergy: "Excellent grounding partner for Numbers 2, 6, 7, 8. Prefers stability over unpredictable risks."
  },
  5: {
    title: "Number 5 - The Adventurer & Free Spirit",
    ruler: "Mercury (Budha)",
    traits: "Versatile, curious, energetic, fast-moving, adaptable change-maker.",
    marriageSynergy: "Best paired with Numbers 1, 3, 5, 9. Thrives on travel, spontaneous dates, and open communication."
  },
  6: {
    title: "Number 6 - The Nurturer & Family Guardian",
    ruler: "Venus (Shukra)",
    traits: "Loving, protective, responsible, romantic, aesthetic decorator of home.",
    marriageSynergy: "The classic ideal spouse energy (Venus). Compatible with Numbers 2, 3, 4, 6, 9. Nurtures family warmth."
  },
  7: {
    title: "Number 7 - The Mystic Seeker & Philosopher",
    ruler: "Ketu / Neptune",
    traits: "Analytical, spiritual, introverted, deep thinker, values quiet wisdom.",
    marriageSynergy: "Needs intellectual depth and privacy. Best paired with Numbers 1, 2, 4, 7, 9."
  },
  8: {
    title: "Number 8 - The Powerhouse & Executive",
    ruler: "Saturn (Shani)",
    traits: "Authoritative, financially astute, resilient, dedicated, high-achievement drive.",
    marriageSynergy: "Brings immense financial security and stability. Compatible with Numbers 2, 4, 6, 8. Demands loyalty."
  },
  9: {
    title: "Number 9 - The Universal Humanitarian",
    ruler: "Mars (Mangal)",
    traits: "Compassionate, courageous, broad-minded, passionate defender of others.",
    marriageSynergy: "High synergy with Numbers 3, 5, 6, 9. Generous and protective of partner."
  },
  11: {
    title: "Master Number 11 - The Intuitive Illuminator",
    ruler: "Spiritual Moon / Uranus",
    traits: "Spiritual visionary, highly sensitive, charismatic, inspired channel.",
    marriageSynergy: "Requires a calm, supportive partner who honors deep intuitive perceptions."
  },
  22: {
    title: "Master Number 22 - The Master Architect",
    ruler: "Spiritual Earth / Rahu",
    traits: "Transforms massive dreams into physical reality. Powerful manifestation.",
    marriageSynergy: "Requires a partner who shares practical vision and stands firm during big endeavors."
  },
  33: {
    title: "Master Number 33 - The Master Teacher",
    ruler: "Spiritual Venus / Jupiter",
    traits: "Selfless devotion, spiritual healing, uplifting humanity.",
    marriageSynergy: "Pure unconditional love vibration. Brings profound harmony into home life."
  }
};

export const NumerologyNameCorrection: React.FC<NumerologyNameCorrectionProps> = ({
  numerology,
  partnerA = { name: "Seeker", dob: "1992-08-15" },
  partnerB = { name: "Partner", dob: "1994-11-20" },
  userProfile
}) => {
  const actualA = userProfile?.name ? { name: userProfile.name, dob: userProfile.dob || "1992-08-15" } : partnerA;
  const actualB = partnerB;
  // Name tuning interactive state
  const [testNameA, setTestNameA] = useState(actualA.name);
  const [testNameB, setTestNameB] = useState(actualB.name);

  // Compute live tuned numbers
  const tunedA = useMemo(() => calculateNameNumber(testNameA), [testNameA]);
  const tunedB = useMemo(() => calculateNameNumber(testNameB), [testNameB]);

  const originalA = useMemo(() => calculateNameNumber(actualA.name), [actualA.name]);
  const originalB = useMemo(() => calculateNameNumber(actualB.name), [actualB.name]);

  // Synergy calculation
  const isTunedCompatible = (tunedA.single + tunedB.single) % 2 === 0 || tunedA.single === tunedB.single;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-sm space-y-8 animate-in fade-in">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-900 text-xs font-semibold uppercase tracking-wider mb-1">
            <Hash className="w-3.5 h-3.5 text-indigo-600" />
            Vedic & Chaldean Numerology Science
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Numerology Explanations & Name Correction Guidance
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Deep vibration analysis for Life Path, Expression, Soul Urge & interactive Chaldean Name Spelling Tuning.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-indigo-50 p-3 rounded-2xl border border-indigo-200 shrink-0">
          <Zap className="w-6 h-6 text-indigo-600" />
          <div>
            <span className="text-[10px] uppercase font-bold text-indigo-900 block">Numerical Harmony</span>
            <strong className="text-lg font-bold text-slate-900">{numerology.synergyScore}% Match Score</strong>
          </div>
        </div>
      </div>

      {/* PARTNERS NUMEROLOGY SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PARTNER A */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h3 className="font-serif font-bold text-base text-slate-900">{partnerA.name}'s Core Numbers</h3>
            <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
              Chaldean Name #{originalA.single} (Compound {originalA.compound})
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white p-2.5 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-bold">Life Path Number</span>
              <strong className="text-slate-900 text-sm font-bold">Number {numerology.lifePathA}</strong>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-bold">Expression Number</span>
              <strong className="text-slate-900 text-sm font-bold">Number {numerology.expressionA}</strong>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-bold">Soul Urge (Heart)</span>
              <strong className="text-slate-900 text-sm font-bold">Number {numerology.soulUrgeA}</strong>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-bold">Personality Number</span>
              <strong className="text-slate-900 text-sm font-bold">Number {numerology.personalityA}</strong>
            </div>
          </div>
        </div>

        {/* PARTNER B */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h3 className="font-serif font-bold text-base text-slate-900">{partnerB.name}'s Core Numbers</h3>
            <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
              Chaldean Name #{originalB.single} (Compound {originalB.compound})
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white p-2.5 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-bold">Life Path Number</span>
              <strong className="text-slate-900 text-sm font-bold">Number {numerology.lifePathB}</strong>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-bold">Expression Number</span>
              <strong className="text-slate-900 text-sm font-bold">Number {numerology.expressionB}</strong>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-bold">Soul Urge (Heart)</span>
              <strong className="text-slate-900 text-sm font-bold">Number {numerology.soulUrgeB}</strong>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block font-bold">Personality Number</span>
              <strong className="text-slate-900 text-sm font-bold">Number {numerology.personalityB}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE NAME CORRECTION GUIDANCE ENGINE */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-6 rounded-3xl text-white space-y-5 border border-indigo-500/30 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-500/20 pb-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider">
              <Edit3 className="w-3 h-3 text-indigo-400" />
              Interactive Name Correction & Vibration Tuning Engine
            </div>
            <h3 className="font-serif text-xl font-bold text-indigo-100">
              Test Name Spelling Modifications for Maximum Harmony
            </h3>
            <p className="text-xs text-indigo-200/70">
              In Chaldean Numerology, adding or adjusting a letter in your name changes the compound name number to resonate harmoniously with your partner.
            </p>
          </div>
        </div>

        {/* TUNING INPUT FIELDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2 bg-white/5 p-4 rounded-2xl border border-indigo-400/20">
            <label className="text-xs font-bold text-indigo-200 block">
              {partnerA.name}'s Trial Name Spelling:
            </label>
            <input
              type="text"
              value={testNameA}
              onChange={(e) => setTestNameA(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white/10 border border-indigo-400/30 text-white font-bold text-sm focus:outline-none focus:border-indigo-400"
            />
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-indigo-300 font-mono">Chaldean Single: <strong>#{tunedA.single}</strong></span>
              <span className="text-indigo-400/80 font-mono text-[11px]">Compound: {tunedA.compound}</span>
            </div>
          </div>

          <div className="space-y-2 bg-white/5 p-4 rounded-2xl border border-indigo-400/20">
            <label className="text-xs font-bold text-indigo-200 block">
              {partnerB.name}'s Trial Name Spelling:
            </label>
            <input
              type="text"
              value={testNameB}
              onChange={(e) => setTestNameB(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white/10 border border-indigo-400/30 text-white font-bold text-sm focus:outline-none focus:border-indigo-400"
            />
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-indigo-300 font-mono">Chaldean Single: <strong>#{tunedB.single}</strong></span>
              <span className="text-indigo-400/80 font-mono text-[11px]">Compound: {tunedB.compound}</span>
            </div>
          </div>
        </div>

        {/* SYNERGY RESULT VERDICT */}
        <div className="bg-white/10 p-4 rounded-2xl border border-indigo-400/30 flex items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="text-[10px] text-indigo-300 font-bold uppercase block">Tuned Name Vibration Compatibility</span>
            <p className="text-white font-serif font-bold text-sm">
              Pairing Name #{tunedA.single} ({testNameA}) with Name #{tunedB.single} ({testNameB})
            </p>
          </div>

          <div className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 ${
            isTunedCompatible ? "bg-emerald-500 text-slate-950" : "bg-amber-500 text-slate-950"
          }`}>
            {isTunedCompatible ? "✨ Highly Compatible Harmony" : "⚠️ Neutral Vibration"}
          </div>
        </div>
      </div>

      {/* EDUCATIONAL DETAILED NUMBER DESCRIPTIONS */}
      <div className="space-y-4">
        <h4 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          Master Encyclopedia: Life Path & Name Vibration Meanings (1 to 33)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {Object.entries(NUMEROLOGY_NUMBER_DESCRIPTIONS).map(([numStr, desc]) => {
            const num = parseInt(numStr);
            const isPartnerA = numerology.lifePathA === num || originalA.single === num;
            const isPartnerB = numerology.lifePathB === num || originalB.single === num;

            return (
              <div
                key={numStr}
                className={`p-4 rounded-2xl border space-y-2 transition-all ${
                  isPartnerA || isPartnerB
                    ? "bg-indigo-50/70 border-indigo-300 shadow-xs"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-1.5">
                  <h5 className="font-serif font-bold text-sm text-slate-900">{desc.title}</h5>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-indigo-300">
                    Ruler: {desc.ruler}
                  </span>
                </div>

                <p className="text-slate-700 leading-relaxed">
                  <strong>Core Traits:</strong> {desc.traits}
                </p>

                <p className="text-indigo-900 font-medium">
                  <strong>Marriage Synergy:</strong> {desc.marriageSynergy}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
