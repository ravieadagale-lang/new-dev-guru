import React, { useState } from "react";
import { FASTING_TYPES_GUIDE, FastingTypeDetail } from "../../data/vratGuideData";
import { ShieldCheck, Flame, Check, X, Utensils } from "lucide-react";

const FASTING_ICONS: Record<string, string> = {
  Nirjala: "💧",
  Phalahar: "🍎",
  Ekasana: "🍲",
  Dugdhahar: "🥛",
  Jalahar: "🌊"
};

const SHASTRIC_REFERENCES: Record<string, string> = {
  Nirjala:
    "Padma Purana & Brahma Vaivarta Purana: 'Nirjalam yaḥ karotīha hyekādaśyāṃ narottamaḥ... sarva-tīrtha-phalaṃ tasya jāyate nātra saṃśayaḥ.' (One who observes complete waterless fasting on Ekadashi attains the sacred spiritual merit of all holy tirthas.)",
  Phalahar:
    "Manu Smriti & Agni Purana: 'Phalam mūlaṃ payo vāpi vrateṣveva praśasyate.' (Pure fruits, sacred roots, and holy cow milk are lauded by sages as the pure sattvic diet for spiritual vows.)",
  Ekasana:
    "Smriti Chandrika & Bhavishya Purana: 'Ekabhaktena naktena tathaivāyācitena ca... vratinaḥ siddhi-dāyakam.' (Partaking of only a single sattvic meal during daytime or evening stills sensory desires and fosters spiritual siddhi.)",
  Dugdhahar:
    "Srimad Bhagavatam (Canto 8, Payovrata Adhyaya): 'Payovratam idaṃ puṇyaṃ sarva-pāpa-praṇāśanam.' (The sacred milk fast observed by Mother Aditi purifies karmic blemishes and invokes the highest divine grace.)",
  Jalahar:
    "Shandilya Upanishad: 'Jalāhāreṇa citta-śuddhiḥ kriyā-siddhiśca jāyate.' (Consecrated water-only fasting purifies inner prana and eliminates physical toxins for profound meditation.)"
};

const SENDHA_NAMAK_RULES = {
  title: "Sendha Namak (Rock Salt) Sacred Rules",
  titleHindi: "सेंधा नमक (सेंधव लवण) के शास्त्रीय नियम",
  explanation:
    "Sendha Namak (Himalayan Rock Salt / Saindhava Lavana) is the only mineral salt sanctified in Vedic texts (Charaka Samhita, Manu Smriti, Padma Purana) for consumption during Vrats and Upvas. Ordinary sea salt (Samudra Namak) undergoes industrial processing and originates from tidal waters where marine organisms perish, rendering it Tamasic during fasting periods.",
  keyDistinction:
    "Sea salt (Samudra Namak) is prohibited in Vrats. Only pristine rock salt mined from ancient salt ranges (Sendha Namak) is certified pure and Sattvic by Vedic Shastras."
};

const KITCHEN_PURITY_RULES = {
  title: "Vedic Kitchen Purity & Utensil Shuddhi",
  titleHindi: "व्रत कालीन पाकशाला शुद्धि एवं नियम",
  guidelines: [
    "Dedicate separate or thoroughly scrubbed brass, bell metal (Kansa), or stainless steel utensils completely free from grain, onion, or garlic residues.",
    "Do not use cooking spoons or ladles previously used in regular grain food without ritual cleansing and water sprinkling (Prokshana).",
    "Prepare fasting food (Falahar) strictly after morning Snana (purifying bath) and Surya Arghya before touching any cooking vessels.",
    "Cook exclusively in pure Desi Cow Ghee, cold-pressed sesame (Til) oil, or groundnut oil. Refined commercial vegetable oils and hydrogenated fats are strictly avoided.",
    "Keep raw spices (Cumin, Black Pepper, Sendha Namak) in pristine dry jars dedicated only for fasting days to prevent cross-contamination from grain flours."
  ]
};

export const FastingRulesSection: React.FC = () => {
  const [selectedType, setSelectedType] = useState<FastingTypeDetail>(() => {
    return FASTING_TYPES_GUIDE && FASTING_TYPES_GUIDE.length > 0
      ? FASTING_TYPES_GUIDE[0]
      : ({} as FastingTypeDetail);
  });

  if (!FASTING_TYPES_GUIDE || FASTING_TYPES_GUIDE.length === 0) {
    return null;
  }

  const activeType = selectedType?.id ? selectedType : FASTING_TYPES_GUIDE[0];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-linear-to-r from-slate-900 via-amber-950 to-orange-950 text-white rounded-2xl p-6 border border-amber-500/30 shadow-md">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-semibold">
            <Utensils className="w-3.5 h-3.5 text-amber-300" />
            <span>Shastric Dietary Shuddhi &amp; Fasting Frameworks</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
            Fasting Types &amp; Shastric Dietary Disciplines (उपवास भेद एवं नियम)
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            According to the Padma Purana, Agni Purana, and Smriti Shastras, a Vrata is an inner sacrifice of sensory gratification. The scriptures define five major levels of physical fasting alongside rigorous kitchen purity and salt regulations.
          </p>
        </div>
      </div>

      {/* Fasting Types Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {FASTING_TYPES_GUIDE.map((t) => {
          const isSelected = activeType.id === t.id;
          const icon = FASTING_ICONS[t.id] || "🥣";
          return (
            <button
              key={t.id}
              onClick={() => setSelectedType(t)}
              className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                isSelected
                  ? "bg-amber-900 text-white border-amber-700 shadow-md ring-2 ring-amber-400/40"
                  : "bg-white hover:bg-amber-50/70 border-slate-200 text-slate-800"
              }`}
            >
              <span className="text-2xl">{icon}</span>
              <div className="text-xs font-bold leading-tight">{t.name}</div>
              <div
                className={`text-[11px] font-serif ${
                  isSelected ? "text-amber-200" : "text-amber-800"
                }`}
              >
                {t.nameHindi}
              </div>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-md mt-1 ${
                  isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                Strictness: {t.level}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Type Details */}
      <div className="bg-white rounded-2xl border border-amber-900/15 shadow-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{FASTING_ICONS[activeType.id] || "🥣"}</span>
            <div>
              <h4 className="text-xl font-serif font-bold text-slate-900">
                {activeType.name} ({activeType.nameHindi})
              </h4>
              <p className="text-xs text-amber-800 font-semibold mt-0.5">
                Ideal Vrats: {activeType.bestSuitedFor?.join(", ") || "All sacred vows"}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 self-start sm:self-auto">
            Strictness Rating: {activeType.level}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          {activeType.description}
        </p>

        {/* Permitted vs Prohibited Foods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
            <div className="text-xs font-bold text-emerald-900 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Permitted Foods &amp; Ingredients (ग्राह्य आहार):</span>
            </div>
            <ul className="text-xs text-emerald-800 space-y-1.5 list-disc list-inside">
              {activeType.permittedList?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200/80 space-y-2">
            <div className="text-xs font-bold text-rose-900 flex items-center gap-2">
              <X className="w-4 h-4 text-rose-600" />
              <span>Strictly Prohibited Items (वर्ज्य पदार्थ):</span>
            </div>
            <ul className="text-xs text-rose-800 space-y-1.5 list-disc list-inside">
              {activeType.strictlyProhibited?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Rules and Shastric References */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-2">
            <div className="text-xs font-bold text-amber-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Core Behavioral Rules (यम एवं नियम):</span>
            </div>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
              {activeType.keyRules?.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-600" />
              <span>Ancient Shastric Reference:</span>
            </div>
            <p className="text-xs text-slate-700 italic leading-relaxed">
              "{SHASTRIC_REFERENCES[activeType.id] || "Sacred Shastras prescribe sensory restraint and pure prayer during this fast."}"
            </p>
          </div>
        </div>
      </div>

      {/* Sendha Namak & Kitchen Discipline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sendha Namak Guide */}
        <div className="bg-white rounded-2xl border border-amber-900/15 shadow-sm p-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🧂</span>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">
                {SENDHA_NAMAK_RULES.title}
              </h4>
              <p className="text-[11px] font-serif text-amber-800 font-semibold">
                {SENDHA_NAMAK_RULES.titleHindi}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {SENDHA_NAMAK_RULES.explanation}
          </p>
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-medium">
            <strong>Key Distinction: </strong>
            {SENDHA_NAMAK_RULES.keyDistinction}
          </div>
        </div>

        {/* Kitchen Purity */}
        <div className="bg-white rounded-2xl border border-amber-900/15 shadow-sm p-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🥣</span>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">
                {KITCHEN_PURITY_RULES.title}
              </h4>
              <p className="text-[11px] font-serif text-amber-800 font-semibold">
                {KITCHEN_PURITY_RULES.titleHindi}
              </p>
            </div>
          </div>
          <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
            {KITCHEN_PURITY_RULES.guidelines.map((g, idx) => (
              <li key={idx}>{g}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
