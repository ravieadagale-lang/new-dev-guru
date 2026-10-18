import React, { useState } from "react";
import { 
  BookOpen, 
  Sparkles, 
  Sun, 
  Moon, 
  Compass, 
  Layers, 
  Award, 
  Search,
  ChevronRight
} from "lucide-react";
import { playCardHoverSound, playCardFlipSound } from "../../utils/audioEffects";

export type KnowledgeSubTab = 
  | "fundamentals"
  | "12_rashis"
  | "9_grahas"
  | "27_nakshatras"
  | "12_bhavas"
  | "scriptures_shlokas";

export const AstrologyKnowledgeWorkspace: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<KnowledgeSubTab>("fundamentals");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const subTabs: { id: KnowledgeSubTab; label: string }[] = [
    { id: "fundamentals", label: "Vedic Fundamentals" },
    { id: "12_rashis", label: "12 Rashis (Zodiac)" },
    { id: "9_grahas", label: "9 Nava Grahas" },
    { id: "27_nakshatras", label: "27 Nakshatras" },
    { id: "12_bhavas", label: "12 Houses (Bhavas)" },
    { id: "scriptures_shlokas", label: "Classical Shastras" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-5 border border-amber-900/10 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
              Encyclopedic Vedic Library
            </span>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
              Jyotish Shastra Knowledge Base
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Comprehensive authoritative encyclopedia of Vedic Astrology concepts, astronomical fundamentals, classical shlokas, and traditional principles.
            </p>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-t border-slate-100 pt-3">
          {subTabs.map((tab) => {
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playCardFlipSound();
                  setActiveSubTab(tab.id);
                }}
                onMouseEnter={playCardHoverSound}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-slate-900 text-amber-300 shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. FUNDAMENTALS */}
      {activeSubTab === "fundamentals" && (
        <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
          <h3 className="font-serif text-xl font-bold text-slate-900">
            The Science of Light (Jyotir-Veda)
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            Jyotish (from Sanskrit <i>jyótis</i>, meaning "light" or "heavenly body") is one of the six Vedangas (limbs of the Vedas) dedicated to calculating sacred time, planetary movements, and understanding karmic patterns reflected in human life.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
              <div className="font-bold text-amber-900 text-sm">1. Siddhanta (Astronomy)</div>
              <div className="text-xs text-slate-600">Mathematical planetary models, ephemeris calculations, eclipses, and equinoxes.</div>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
              <div className="font-bold text-amber-900 text-sm">2. Samhita (Mundane)</div>
              <div className="text-xs text-slate-600">Global weather, national events, collective karma, and earth cycles.</div>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
              <div className="font-bold text-amber-900 text-sm">3. Hora (Natal &amp; Electional)</div>
              <div className="text-xs text-slate-600">Individual birth charts (Jataka), Muhurta (electional), and Prashna (horary).</div>
            </div>
          </div>
        </div>
      )}

      {/* 2. 12 RASHIS */}
      {activeSubTab === "12_rashis" && (
        <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
          <h3 className="font-serif text-xl font-bold text-slate-900">
            The 12 Rashis (Sidereal Zodiac Signs)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
            {[
              { name: "Mesha (Aries)", element: "Fire (Agni)", ruler: "Mars" },
              { name: "Vrishabha (Taurus)", element: "Earth (Prithvi)", ruler: "Venus" },
              { name: "Mithuna (Gemini)", element: "Air (Vayu)", ruler: "Mercury" },
              { name: "Karka (Cancer)", element: "Water (Jala)", ruler: "Moon" },
              { name: "Simha (Leo)", element: "Fire (Agni)", ruler: "Sun" },
              { name: "Kanya (Virgo)", element: "Earth (Prithvi)", ruler: "Mercury" },
              { name: "Tula (Libra)", element: "Air (Vayu)", ruler: "Venus" },
              { name: "Vrischika (Scorpio)", element: "Water (Jala)", ruler: "Mars" },
              { name: "Dhanu (Sagittarius)", element: "Fire (Agni)", ruler: "Jupiter" },
              { name: "Makara (Capricorn)", element: "Earth (Prithvi)", ruler: "Saturn" },
              { name: "Kumbha (Aquarius)", element: "Air (Vayu)", ruler: "Saturn" },
              { name: "Meena (Pisces)", element: "Water (Jala)", ruler: "Jupiter" },
            ].map((rashi, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
                <div className="font-bold text-slate-900">{rashi.name}</div>
                <div className="text-slate-600">{rashi.element}</div>
                <div className="text-amber-800 font-semibold text-[11px]">Ruler: {rashi.ruler}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. 9 GRAHAS */}
      {activeSubTab === "9_grahas" && (
        <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
          <h3 className="font-serif text-xl font-bold text-slate-900">
            The 9 Nava Grahas (Cosmic Seizers &amp; Influences)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {[
              { name: "Surya (Sun)", role: "Atma (Soul), Vitality, King", nature: "Mild Malefic (Krupa Krura)" },
              { name: "Chandra (Moon)", role: "Manas (Mind), Emotions, Queen", nature: "Benefic when waxing" },
              { name: "Mangala (Mars)", role: "Bala (Courage), Energy, Commander", nature: "Natural Malefic" },
              { name: "Budha (Mercury)", role: "Buddhi (Intellect), Speech, Prince", nature: "Benefic by association" },
              { name: "Guru (Jupiter)", role: "Jnana (Wisdom), Dharma, Minister", nature: "Supreme Benefic" },
              { name: "Shukra (Venus)", role: "Kama (Art, Love, Wealth), Minister", nature: "Supreme Benefic" },
              { name: "Shani (Saturn)", role: "Aayush (Longevity, Karma, Servant)", nature: "Strict Disciplinarian" },
              { name: "Rahu (North Node)", role: "Maya (Ambition, Worldly Drive)", nature: "Shadow Planet" },
              { name: "Ketu (South Node)", role: "Moksha (Liberation, Detachment)", nature: "Shadow Planet" },
            ].map((graha, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 text-sm">{graha.name}</div>
                <div className="text-slate-700">{graha.role}</div>
                <div className="text-[11px] font-semibold text-amber-800">{graha.nature}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. 27 NAKSHATRAS */}
      {activeSubTab === "27_nakshatras" && (
        <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
          <h3 className="font-serif text-xl font-bold text-slate-900">
            The 27 Lunar Constellations (Nakshatras)
          </h3>
          <p className="text-xs text-slate-600">
            Each spanning exactly 13°20' of the zodiac, divided into 4 padas of 3°20' each (totaling 108 padas).
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-xs">
            {[
              "1. Ashwini", "2. Bharani", "3. Krittika", "4. Rohini", "5. Mrigashirsha",
              "6. Ardra", "7. Punarvasu", "8. Pushya", "9. Ashlesha", "10. Magha",
              "11. Purva Phalguni", "12. Uttara Phalguni", "13. Hasta", "14. Chitra", "15. Swati",
              "16. Vishakha", "17. Anuradha", "18. Jyeshtha", "19. Mula", "20. Purva Ashadha",
              "21. Uttara Ashadha", "22. Shravana", "23. Dhanishta", "24. Shatabhisha", "25. Purva Bhadrapada",
              "26. Uttara Bhadrapada", "27. Revati"
            ].map((nak, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-800">
                {nak}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. 12 HOUSES (BHAVAS) */}
      {activeSubTab === "12_bhavas" && (
        <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
          <h3 className="font-serif text-xl font-bold text-slate-900">
            The 12 Bhavas (Houses of Existence)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {[
              { num: "1st House (Tanu)", theme: "Self, physical body, constitution, vitality" },
              { num: "2nd House (Dhana)", theme: "Wealth, speech, food, family values, face" },
              { num: "3rd House (Sahaja)", theme: "Siblings, courage, initiatives, short travel" },
              { num: "4th House (Sukha)", theme: "Mother, home, heart, vehicles, happiness" },
              { num: "5th House (Putra)", theme: "Children, intellect, purva punya, creativity" },
              { num: "6th House (Ari/Roga)", theme: "Debts, illness, enemies, daily service" },
              { num: "7th House (Jaya)", theme: "Spouse, marriage, partnerships, public trade" },
              { num: "8th House (Ayur/Randhra)", theme: "Longevity, secrets, transformations, occult" },
              { num: "9th House (Bhagya)", theme: "Guru, dharma, higher wisdom, father, fortune" },
              { num: "10th House (Karma)", theme: "Profession, authority, social standing, deeds" },
              { num: "11th House (Labha)", theme: "Gains, elder siblings, networks, desires" },
              { num: "12th House (Vyaya/Moksha)", theme: "Expenditures, foreign stay, isolation, liberation" },
            ].map((bhava, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
                <div className="font-bold text-slate-900">{bhava.num}</div>
                <div className="text-slate-600">{bhava.theme}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. CLASSICAL SCRIPTURES */}
      {activeSubTab === "scriptures_shlokas" && (
        <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
          <h3 className="font-serif text-xl font-bold text-slate-900">
            Classical Sanskrit Treatises (Mula Shastras)
          </h3>
          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-1">
              <div className="font-bold text-slate-900 text-sm">Brihat Parashara Hora Shastra (BPHS) — Maharshi Parashara</div>
              <p className="text-slate-600">The supreme foundation of Vedic Astrology comprising principles of Rashis, Bhavas, Grahas, Vargas, Dashas, Yogas, and Shanti remedies.</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-1">
              <div className="font-bold text-slate-900 text-sm">Brihat Jataka &amp; Pancha Siddhantika — Acharya Varahamihira</div>
              <p className="text-slate-600">Masterwork on astronomical algorithms and subtle planetary psychological traits.</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-1">
              <div className="font-bold text-slate-900 text-sm">Phaladeepika — Mantreswara</div>
              <p className="text-slate-600">Practical predictive guide covering Bhava results, Yogas, Transits (Gochara), and Ashtakavarga.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
