import React, { useState } from "react";
import { ALL_28_NAKSHATRA_VRATS, NakshatraVratItem } from "../../data/vratGuideData";
import { Sparkles, Search, Compass, Star, CheckCircle2 } from "lucide-react";

interface NakshatraVratSectionProps {
  onSelectVratName?: (name: string) => void;
}

export const NakshatraVratSection: React.FC<NakshatraVratSectionProps> = ({ onSelectVratName }) => {
  const [search, setSearch] = useState("");
  const [selectedNakshatra, setSelectedNakshatra] = useState<NakshatraVratItem | null>(ALL_28_NAKSHATRA_VRATS[0]);

  const filteredNakshatras = ALL_28_NAKSHATRA_VRATS.filter(n => {
    const q = search.toLowerCase();
    return (
      n.nakshatraName.toLowerCase().includes(q) ||
      n.nakshatraNameHindi.includes(q) ||
      n.deity.toLowerCase().includes(q) ||
      n.planetaryLord.toLowerCase().includes(q) ||
      n.astrologicalRemedy.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Introduction Banner */}
      <div className="bg-linear-to-r from-amber-900/90 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 border border-amber-500/30 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 text-amber-300" />
              <span>Shastric Nakshatra Vrat Vidhi (28 Constellations)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
              28 Sacred Nakshatra Vratas (नक्षत्र व्रत विधान)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              According to the Taittiriya Brahmana, Hemadri's Vrataraja, and Brihat Samhita, fasting when the Moon transits your Janma Nakshatra or specific celestial constellations pacifies afflicted birth stars, invokes divine planetary grace, and removes deep karmic blockages.
            </p>
          </div>

          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search nakshatra, deity, planet..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-black/40 border border-amber-400/30 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Left Nakshatra List, Right Detailed Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Scrollable List of 28 Nakshatras */}
        <div className="lg:col-span-5 space-y-2 max-h-[750px] overflow-y-auto pr-1">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Nakshatra Catalog ({filteredNakshatras.length} of 28)
            </span>
            <span className="text-[11px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full font-semibold">
              Ashwini to Revati + Abhijit
            </span>
          </div>

          {filteredNakshatras.map(item => {
            const isSelected = selectedNakshatra?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedNakshatra(item)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? "bg-amber-900 text-white border-amber-700 shadow-md ring-2 ring-amber-400/40"
                    : "bg-white hover:bg-amber-50/70 border-slate-200/80 text-slate-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                      isSelected ? "bg-amber-500 text-slate-950 font-black" : "bg-amber-100 text-amber-900"
                    }`}
                  >
                    {item.number}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold tracking-tight">
                        {item.nakshatraName}
                      </h4>
                      <span
                        className={`text-[11px] font-serif ${
                          isSelected ? "text-amber-200" : "text-amber-800"
                        }`}
                      >
                        ({item.nakshatraNameHindi})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] mt-0.5 opacity-90">
                      <span>Deity: {item.deity}</span>
                      <span>•</span>
                      <span>Lord: {item.planetaryLord}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                      isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.fastingType}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Nakshatra Guidance */}
        {selectedNakshatra && (
          <div className="lg:col-span-7 bg-white rounded-2xl border border-amber-900/15 shadow-sm p-6 space-y-5 sticky top-20">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold">
                  <span>Nakshatra #{selectedNakshatra.number}</span>
                  <span>•</span>
                  <span>{selectedNakshatra.planetaryLord} (Lord)</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-2">
                  {selectedNakshatra.nakshatraName} Vrat ({selectedNakshatra.nakshatraNameHindi})
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Presiding Deity: <strong className="text-amber-950">{selectedNakshatra.deity}</strong>
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold px-3 py-1 rounded-lg bg-amber-950 text-amber-200 border border-amber-700/50">
                  {selectedNakshatra.fastingType}
                </span>
                <p className="text-[10px] text-slate-600 mt-1">Shastric Fasting Vow</p>
              </div>
            </div>

            {/* Astrological Remedy & Benefit */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Astrological Remedy &amp; Spiritual Benefit:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {selectedNakshatra.astrologicalRemedy}
              </p>
            </div>

            {/* Ritual & Puja Vidhi */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-slate-600" />
                <span>Prescribed Shastric Ritual Vidhi:</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedNakshatra.ritualVidhi}
              </p>
            </div>

            {/* Sacred Mantra */}
            <div className="p-4 rounded-xl bg-amber-900/5 border border-amber-900/20 text-center space-y-1.5">
              <div className="text-[10px] font-bold text-amber-800 uppercase tracking-widest">
                Sacred Nakshatra Beej / Invocation Mantra
              </div>
              <div className="text-base sm:text-lg font-serif font-bold text-amber-950">
                {selectedNakshatra.mantra}
              </div>
              <p className="text-[11px] text-slate-500">
                Chant 108 times during the Nakshatra transit or early morning Brahma Muhurta.
              </p>
            </div>

            {/* Quick Astrological Tip */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>When to Undertake: </strong>
                Observe this fast each month on the exact day the Moon enters {selectedNakshatra.nakshatraName} Nakshatra, or initiate it for 12, 24, or 27 consecutive cycles for total star pacification.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
