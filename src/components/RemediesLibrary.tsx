import React, { useState, useMemo } from "react";
import { 
  Search, 
  Flame, 
  Sparkles, 
  Filter, 
  CheckCircle2, 
  BookOpen, 
  Calendar, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Bookmark, 
  Share2, 
  Check, 
  ShieldCheck,
  PackageCheck
} from "lucide-react";

export interface RemedyItem {
  id: string;
  title: string;
  category: "manglik" | "nadi" | "bhakoot" | "rahu_ketu" | "sade_sati" | "venus_harmony" | "general";
  categoryLabel: string;
  targetDosha: string;
  deity: string;
  muhurat: string;
  duration: string;
  difficulty: "Easy (Daily)" | "Moderate (Weekly)" | "Special Puja";
  materialsNeeded: string[];
  mantra: {
    sanskrit: string;
    transliteration: string;
    repetition: string;
  };
  stepByStepGuidance: string[];
  benefits: string;
}

export const REMEDIES_DATABASE: RemedyItem[] = [
  {
    id: "mangal_shanti_1",
    title: "Kuja / Mangal Dosha Neutralization Ritual",
    category: "manglik",
    categoryLabel: "Manglik (Kuja) Dosha",
    targetDosha: "Mangal (Mars) Affliction & Temperament Friction",
    deity: "Lord Hanuman & Lord Mars",
    muhurat: "Tuesdays during Sun Rise (Brahma Muhurat)",
    duration: "21 consecutive Tuesdays",
    difficulty: "Moderate (Weekly)",
    materialsNeeded: [
      "Red Flowers (Hibiscus or Rose)",
      "Red Chandan (Sandalwood paste)",
      "Jaggery & Roasted Gram (Chana)",
      "Pure Cow Ghee Lamp",
      "Red Coral (Moonga) or Copper Yantra"
    ],
    mantra: {
      sanskrit: "ॐ क्रां क्रीं क्रौं सः भौमाय नमः ॥",
      transliteration: "Om Kraam Kreem Kroum Sah Bhaumaaya Namah",
      repetition: "108 times using Red Sandalwood Mala"
    },
    stepByStepGuidance: [
      "Clean the puja altar and place a copper idol or picture of Lord Hanuman facing East.",
      "Light a Ghee lamp and offer red flowers along with red chandan paste.",
      "Recite the Hanuman Chalisa 7 times or recite the Bhauma Beej Mantra 108 times.",
      "Offer jaggery and roasted chana as Naivedyam, then distribute as prasadam to family.",
      "Donate red clothing, copper utensils, or lentils (Masoor Dal) to a needy person on Tuesday afternoons."
    ],
    benefits: "Dissolves aggression, prevents marital arguments, and aligns Mars energy between partners."
  },
  {
    id: "nadi_dosha_1",
    title: "Mahamrityunjaya Nadi Shanti & Lineage Protection",
    category: "nadi",
    categoryLabel: "Nadi & Health Dosha",
    targetDosha: "Nadi Koota Discrepancy & Genetic Lineage Protection",
    deity: "Lord Shiva (Mahadeva)",
    muhurat: "Mondays or Pradosham Tithi during Abhijit Muhurat",
    duration: "11 Mondays",
    difficulty: "Special Puja",
    materialsNeeded: [
      "Fresh Cow Milk & Honey",
      "Bilva Leaves (Belpatra)",
      "Gangajal & Pure Water",
      "Bhasma (Sacred Ash)",
      "White Sesame Seeds & Grain"
    ],
    mantra: {
      sanskrit: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात् ॥",
      transliteration: "Om Tryambakam Yajaamahe Sugandhim Pushti-Vardhanam | Urvaarukam-Iva Bandhanaan-Mrityor-Muksheeya Maamritaat ||",
      repetition: "108 times with Rudraksha Mala"
    },
    stepByStepGuidance: [
      "Perform Abhishek on Shivling using fresh cow milk, honey, and Gangajal while chanting Mahamrityunjaya Mantra.",
      "Offer 11 intact Belpatra leaves marked with white chandan paste.",
      "Both partners should pray together holding hands for physical health, progeny, and long life.",
      "Donate a pair of cows, grain (Annadaan), or silver snake pair to a temple on Completion Day."
    ],
    benefits: "Cancels negative health vibrations, safeguards progeny, and preserves marital longevity."
  },
  {
    id: "bhakoot_shanti_1",
    title: "Vishnu-Lakshmi Bhakoot & Financial Abundance Puja",
    category: "bhakoot",
    categoryLabel: "Bhakoot & Prosperity",
    targetDosha: "Bhakoot Discrepancy (2/12 or 6/8 Rashi position)",
    deity: "Lord Vishnu & Goddess Lakshmi",
    muhurat: "Thursdays or Ekadashi during Sunset",
    duration: "9 Thursdays",
    difficulty: "Moderate (Weekly)",
    materialsNeeded: [
      "Yellow Flowers & Marigold Garland",
      "Turmeric (Haldi) paste & Kumkum",
      "Sweet Milk Kheer (Rice Pudding)",
      "Yellow Sweets (Besan Ladoo)",
      "Tulsi Leaves & Yellow Cloth"
    ],
    mantra: {
      sanskrit: "ॐ नमो भगवते वासुदेवाय ॥ ॐ श्रीं महालक्ष्मै नमः ॥",
      transliteration: "Om Namo Bhagavate Vaasudevaaya || Om Shreem Mahaalakshmyai Namah",
      repetition: "108 times daily"
    },
    stepByStepGuidance: [
      "Place a photo of Lakshmi-Narayan on a yellow cloth facing North-East.",
      "Apply turmeric tilak to the deity and offer a marigold garland.",
      "Prepare sweet milk kheer with saffron and offer it as Naivedyam along with Tulsi leaves.",
      "Recite Vishnu Sahasranama or the dual mantra 108 times.",
      "Feed bananas or yellow food to cows or underprivileged children on Thursdays."
    ],
    benefits: "Unlocks financial flow, removes domestic misunderstandings, and ensures joint prosperity."
  },
  {
    id: "shukra_harmony_1",
    title: "Gauri-Shankar Shukra (Venus) Romantic Bonding Ritual",
    category: "venus_harmony",
    categoryLabel: "Venus & Romantic Intimacy",
    targetDosha: "Lack of Intimacy, Yoni Incompatibility & Cooling Affection",
    deity: "Goddess Parvati (Gauri) & Shukra Dev",
    muhurat: "Fridays during Venus Hora (Morning or Evening)",
    duration: "Daily / 16 Fridays",
    difficulty: "Easy (Daily)",
    materialsNeeded: [
      "Gauri-Shankar Rudraksha",
      "White Fragrant Flowers (Jasmine or Rose)",
      "White Chandan & Natural Rose Water",
      "Natural Camphor (Kapur)",
      "Silver Ring or Coin"
    ],
    mantra: {
      sanskrit: "ॐ शुं शुक्राय नमः ॥ ॐ ह्रीं योगिनिये नमः ॥",
      transliteration: "Om Shum Shukraaya Namah || Om Hreem Yoginiye Namah",
      repetition: "108 times on Fridays"
    },
    stepByStepGuidance: [
      "Clean the bedroom space and burn natural camphor at sunset.",
      "Keep a Gauri-Shankar Rudraksha in a small silver bowl with rose water overnight.",
      "Recite the Shukra Beej Mantra for 108 rounds to enhance soft charm, physical warmth, and trust.",
      "Gently wear the blessed Gauri-Shankar Rudraksha around the neck or wrist.",
      "Donate white silk, rice, or ghee to women on Fridays."
    ],
    benefits: "Rekindles passionate affection, softens communication, and fixes physical intimacy barriers."
  },
  {
    id: "rahu_ketu_1",
    title: "Rahu-Ketu Illusion & Kaal Sarp Balancing Ritual",
    category: "rahu_ketu",
    categoryLabel: "Rahu-Ketu & Kaal Sarp",
    targetDosha: "Sudden Disagreements, External Interference & Kaal Sarp Shadow",
    deity: "Lord Bhairava & Goddess Durga",
    muhurat: "Saturdays after Sunset or Amavasya",
    duration: "7 Saturdays",
    difficulty: "Moderate (Weekly)",
    materialsNeeded: [
      "Black Sesame Seeds (Til)",
      "Mustard Oil Lamp (Sarson ka Tel)",
      "Blue or Black Cloth",
      "Coconut with Water",
      "Iron Ring or Coin"
    ],
    mantra: {
      sanskrit: "ॐ रां राहवे नमः ॥ ॐ कें केतवे नमः ॥",
      transliteration: "Om Raam Raahave Namah || Om Kem Ketave Namah",
      repetition: "108 times"
    },
    stepByStepGuidance: [
      "Light a mustard oil lamp under a Peepal tree or outdoors facing South-West on Saturday evening.",
      "Offer black sesame seeds and coconut in flowing river water or temple square.",
      "Chant Durga Chalisa or Rahu-Ketu Beej Mantras to remove misunderstandings and negative eyes (Nazar).",
      "Keep a small silver square piece in your wallet to ground mental restlessness."
    ],
    benefits: "Protects marriage from third-party interference, paranoia, and sudden unexpected turbulence."
  },
  {
    id: "sade_sati_1",
    title: "Shani Sade Sati & Karmic Patience Ritual",
    category: "sade_sati",
    categoryLabel: "Saturn (Shani) & Sade Sati",
    targetDosha: "Saturn Transit Heavy Burden, Delay in Marriage & Fatigue",
    deity: "Lord Shani & Lord Hanuman",
    muhurat: "Saturday Evenings during Sunset",
    duration: "Ongoing / 40 Saturdays",
    difficulty: "Moderate (Weekly)",
    materialsNeeded: [
      "Mustard Oil in Iron Bowl",
      "Black Gram (Urad Dal)",
      "Iron Nails or Horseshoe",
      "Dark Blue Flowers",
      "Sesame Oil Lamp"
    ],
    mantra: {
      sanskrit: "ॐ शं शनैश्चराय नमः ॥",
      transliteration: "Om Sham Shanaischaraya Namah",
      repetition: "108 times"
    },
    stepByStepGuidance: [
      "Look at your shadow reflection in an iron bowl filled with mustard oil (Chhaya Daan), then donate the oil.",
      "Light a sesame oil lamp under a Peepal tree and walk around it 7 times clockwise.",
      "Recite the Shani Stotram or Hanuman Chalisa.",
      "Serve food and black footwear to elderly laborers or disabled individuals on Saturdays."
    ],
    benefits: "Instills immense patience, stabilizes long-term duty, and lightens heavy karmic stress."
  }
];

export const RemediesLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedRemedyId, setExpandedRemedyId] = useState<string | null>("mangal_shanti_1");
  const [savedRemedies, setSavedRemedies] = useState<string[]>([]);
  const [copiedMantraId, setCopiedMantraId] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Remedies" },
    { id: "manglik", label: "🔥 Manglik (Kuja)" },
    { id: "nadi", label: "🧬 Nadi & Health" },
    { id: "bhakoot", label: "💰 Bhakoot & Wealth" },
    { id: "venus_harmony", label: "💖 Venus Intimacy" },
    { id: "rahu_ketu", label: "🌑 Rahu-Ketu Protection" },
    { id: "sade_sati", label: "🪐 Saturn / Sade Sati" }
  ];

  const filteredRemedies = useMemo(() => {
    return REMEDIES_DATABASE.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.targetDosha.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.deity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.benefits.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleSaveRemedy = (id: string) => {
    setSavedRemedies((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleCopyMantra = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMantraId(id);
    setTimeout(() => setCopiedMantraId(null), 2000);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-sm space-y-6 animate-in fade-in">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Vedic & Planetary Shanti Encyclopedia
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Searchable Vedic Remedies & Rituals Library
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Filter authentic Vedic Pujas, mantras, samagri material lists, and step-by-step procedures for every marriage dosha.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            {filteredRemedies.length} Rituals Available
          </span>
        </div>
      </div>

      {/* SEARCH BAR & CATEGORY FILTER CHIPS */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search remedies by dosha, planet (e.g. Manglik, Nadi, Rahu, Venus), deity, or benefit..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-300 bg-slate-50/50 text-xs font-medium text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-all shadow-xs"
          />
        </div>

        {/* CATEGORIES CHIPS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          {categories.map((cat) => {
            const isSel = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isSel
                    ? "bg-slate-900 text-amber-300 shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* REMEDIES CARDS LIST */}
      <div className="space-y-4">
        {filteredRemedies.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-2">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-xs font-bold text-slate-700">No matching remedies found.</p>
            <p className="text-[11px] text-slate-500">Try adjusting your search terms or filter category.</p>
          </div>
        ) : (
          filteredRemedies.map((remedy) => {
            const isExpanded = expandedRemedyId === remedy.id;
            const isSaved = savedRemedies.includes(remedy.id);

            return (
              <div
                key={remedy.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-amber-300 transition-all"
              >
                {/* CARD HEADER SUMMARY */}
                <div
                  onClick={() => setExpandedRemedyId(isExpanded ? null : remedy.id)}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer bg-gradient-to-r from-slate-50/50 to-white hover:bg-slate-50"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                        {remedy.categoryLabel}
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {remedy.difficulty}
                      </span>
                    </div>

                    <h4 className="font-serif text-base font-bold text-slate-900 flex items-center gap-2">
                      {remedy.title}
                    </h4>

                    <p className="text-xs text-slate-500 leading-snug">
                      <strong>Target:</strong> {remedy.targetDosha}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveRemedy(remedy.id);
                      }}
                      className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isSaved ? "bg-amber-500 text-slate-950" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                      title={isSaved ? "Saved" : "Save Ritual"}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>

                    <button className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* EXPANDED DETAILED GUIDANCE BODY */}
                {isExpanded && (
                  <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-5 text-xs animate-in fade-in">
                    {/* METADATA BAR */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold block">Auspicious Muhurat</span>
                        <strong className="text-slate-800 text-xs">{remedy.muhurat}</strong>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold block">Deity / Presiding Energy</span>
                        <strong className="text-slate-800 text-xs">{remedy.deity}</strong>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold block">Recommended Duration</span>
                        <strong className="text-slate-800 text-xs">{remedy.duration}</strong>
                      </div>
                    </div>

                    {/* SAMAGRI / MATERIALS NEEDED */}
                    <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/60 space-y-2">
                      <span className="font-bold text-amber-950 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                        <PackageCheck className="w-4 h-4 text-amber-700" />
                        Samagri & Required Ritual Materials
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-800">
                        {remedy.materialsNeeded.map((mat, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>{mat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* MANTRA BOX */}
                    <div className="bg-slate-900 text-amber-200 p-4 rounded-xl border border-amber-500/30 space-y-2 relative">
                      <div className="flex items-center justify-between border-b border-amber-500/20 pb-1.5">
                        <span className="text-[10px] uppercase font-bold text-amber-400 font-mono">
                          Sacred Vedic Mantra ({remedy.mantra.repetition})
                        </span>

                        <button
                          onClick={() => handleCopyMantra(remedy.id, `${remedy.mantra.sanskrit}\n${remedy.mantra.transliteration}`)}
                          className="text-amber-300 hover:text-white text-[11px] flex items-center gap-1 font-bold cursor-pointer"
                        >
                          {copiedMantraId === remedy.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Bookmark className="w-3.5 h-3.5" />}
                          {copiedMantraId === remedy.id ? "Copied" : "Copy Mantra"}
                        </button>
                      </div>

                      <p className="font-serif text-sm font-bold text-amber-100 tracking-wide">
                        {remedy.mantra.sanskrit}
                      </p>
                      <p className="font-mono text-[11px] text-slate-300 italic">
                        "{remedy.mantra.transliteration}"
                      </p>
                    </div>

                    {/* STEP BY STEP GUIDANCE */}
                    <div className="space-y-2">
                      <span className="font-bold text-slate-900 block uppercase text-[10px] tracking-wider text-slate-500">
                        Step-by-Step Execution Protocol
                      </span>

                      <div className="space-y-2">
                        {remedy.stepByStepGuidance.map((step, idx) => (
                          <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-slate-900 text-amber-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <p className="text-slate-700 leading-relaxed text-xs">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* BENEFITS SUMMARY */}
                    <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 text-emerald-950 flex items-center gap-2.5">
                      <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                      <p className="text-xs font-medium">
                        <strong>Expected Outcome:</strong> {remedy.benefits}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
