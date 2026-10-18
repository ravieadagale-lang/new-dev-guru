import React, { useState } from "react";
import {
  X,
  BookOpen,
  Search,
  Sparkles,
  Shield,
  Layers,
  Copy,
  Check,
  Compass
} from "lucide-react";
import {
  CRYSTAL_REMEDIES_DATABASE,
  THREE_D_REMEDIES_DATABASE,
  VEDIC_PUJA_PROTOCOLS_DATABASE,
  FENG_SHUI_GRANDMASTER_DATABASE
} from "../../engine/vastu/vastuProblemFinderEngine";

export interface RemedialEncyclopediaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RemedialEncyclopediaModal: React.FC<RemedialEncyclopediaModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeCategory, setActiveCategory] = useState<"crystals" | "three_d" | "vedic" | "feng_shui">("crystals");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getRemediesList = () => {
    switch (activeCategory) {
      case "crystals":
        return CRYSTAL_REMEDIES_DATABASE || [];
      case "three_d":
        return THREE_D_REMEDIES_DATABASE || [];
      case "vedic":
        return VEDIC_PUJA_PROTOCOLS_DATABASE || [];
      case "feng_shui":
        return FENG_SHUI_GRANDMASTER_DATABASE || [];
      default:
        return [];
    }
  };

  const remedies = getRemediesList().filter((item: any) => {
    const q = searchQuery.toLowerCase();
    const title = (item.name || item.title || item.object || item.ritualName || "").toLowerCase();
    const desc = (item.description || item.purpose || item.placement || "").toLowerCase();
    return title.includes(q) || desc.includes(q);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border border-[#E7E2D9] rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-slate-900">
                Non-Destructive Vastu Remedial Encyclopedia
              </h2>
              <p className="text-xs text-slate-500">
                Shastric cures, elemental energy balancing, and consecrated placement protocols.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs & Search */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveCategory("crystals")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                activeCategory === "crystals" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Crystals &amp; Gemstones
            </button>
            <button
              onClick={() => setActiveCategory("three_d")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                activeCategory === "three_d" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              3D Energetic Objects
            </button>
            <button
              onClick={() => setActiveCategory("vedic")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                activeCategory === "vedic" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Vedic Puja Protocols
            </button>
            <button
              onClick={() => setActiveCategory("feng_shui")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                activeCategory === "feng_shui" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Feng Shui Cures
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search remedies..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {remedies.map((item: any, idx: number) => {
              const name = item.name || item.title || item.object || item.ritualName || `Remedy ${idx + 1}`;
              const desc = item.description || item.purpose || "";
              const placement = item.placement || item.direction || item.timing || "";
              const id = `rem-${idx}`;

              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-slate-200 bg-[#FAF8F5] hover:border-amber-400 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-sm text-slate-900">{name}</h4>
                      {item.zone && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                          {item.zone}
                        </span>
                      )}
                    </div>
                    {desc && <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>}
                    {placement && (
                      <div className="text-[11px] text-slate-500 font-mono bg-white p-2 rounded-lg border border-slate-100">
                        <strong className="text-slate-700">Placement:</strong> {placement}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Shastric Validated</span>
                    <button
                      onClick={() => handleCopy(`${name}: ${desc}. Placement: ${placement}`, id)}
                      className="text-amber-800 hover:text-amber-950 font-semibold flex items-center gap-1 transition-colors"
                    >
                      {copiedId === id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy Protocol
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-[#FAF8F5] flex items-center justify-between text-xs text-slate-500">
          <span>Non-destructive remedial guidelines for homes, offices, and plots.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
