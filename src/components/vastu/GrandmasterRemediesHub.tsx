import React, { useState } from "react";
import {
  CRYSTAL_REMEDIES_DATABASE,
  THREE_D_REMEDIES_DATABASE,
  VEDIC_PUJA_PROTOCOLS_DATABASE,
  FENG_SHUI_GRANDMASTER_DATABASE
} from "../../engine/vastu/vastuProblemFinderEngine";
import {
  Sparkles,
  Shield,
  Award,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Compass,
  Layers,
  Flame,
  Moon,
  Sun
} from "lucide-react";

type HubCategory = "crystals" | "three_d_objects" | "vedic_pujas" | "feng_shui_cures";

export const GrandmasterRemediesHub: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<HubCategory>("crystals");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-800">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white shadow-xl border border-amber-500/20">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            Acharya &amp; Grandmaster Compendium
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Grandmaster Vastu &amp; Feng Shui Remedies Hub
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            The world's most comprehensive non-destructive remedial compendium: Sacred mineral crystal grids, 3D consecrated metal idols, authentic Vedic Shanti mantras and homas, and classical celestial Feng Shui cures. Formulated strictly with zero pyramid usage.
          </p>
        </div>

        <div className="absolute -bottom-10 -right-10 text-amber-500/10 pointer-events-none select-none">
          <Sparkles className="w-64 h-64" />
        </div>
      </div>

      {/* Sub-Category Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-3 no-scrollbar text-xs font-bold">
        {[
          { id: "crystals", label: "🔮 Sacred Crystal Placements & Grids", count: CRYSTAL_REMEDIES_DATABASE.length },
          { id: "three_d_objects", label: "🗿 3D Sacred Metal Idols & Cures", count: THREE_D_REMEDIES_DATABASE.length },
          { id: "vedic_pujas", label: "📿 Vedic Mantras & Vastu Shanti Pujas", count: VEDIC_PUJA_PROTOCOLS_DATABASE.length },
          { id: "feng_shui_cures", label: "🐉 Feng Shui Grandmaster Protections", count: FENG_SHUI_GRANDMASTER_DATABASE.length }
        ].map((tab) => {
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as HubCategory)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-xl transition-all cursor-pointer select-none flex items-center gap-2 ${
                isActive
                  ? "bg-slate-900 text-amber-300 font-bold shadow-md"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full ${
                  isActive ? "bg-amber-400 text-slate-950 font-black" : "bg-slate-100 text-slate-500"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* 1. CRYSTAL REMEDIES & MINERAL GRIDS                      */}
      {/* ======================================================== */}
      {activeCategory === "crystals" && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <span>🔮</span> Sacred Crystal Energetic Placements
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Crystalline lattices emit piezoelectric frequencies that harmonize electromagnetic zones without structural demolition.
              </p>
            </div>
            <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Zero Pyramids · 100% Natural Geodes &amp; Clusters
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CRYSTAL_REMEDIES_DATABASE.map((crystal) => (
              <div
                key={crystal.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3.5 flex flex-col justify-between hover:border-indigo-300 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-800">
                          {crystal.mineralFamily}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800">
                          Zone: {crystal.primaryZone}
                        </span>
                      </div>
                      <h4 className="text-base font-black text-slate-900 mt-1">
                        {crystal.crystalName}
                      </h4>
                    </div>

                    <button
                      onClick={() =>
                        handleCopy(
                          `${crystal.crystalName} (${crystal.primaryZone}): ${crystal.placementLocation}\nCleansing: ${crystal.cleansingRitual}`,
                          crystal.id
                        )
                      }
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Copy details"
                    >
                      {copiedId === crystal.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-indigo-900 font-bold bg-indigo-50/70 p-2.5 rounded-xl border border-indigo-100">
                    Aspect: {crystal.lifeAspect}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-700">
                    <p className="leading-relaxed">
                      <span className="font-bold text-slate-900">Placement: </span>
                      {crystal.placementLocation}
                    </p>
                    <p className="leading-relaxed text-slate-600">
                      <span className="font-bold text-slate-900 flex items-center gap-1 inline-flex">
                        <Moon className="w-3 h-3 text-indigo-500" /> Cleansing Ritual:
                      </span>{" "}
                      {crystal.cleansingRitual}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="text-rose-700 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-rose-500" />
                    Avoid: {crystal.avoidZones.join(", ")}
                  </span>
                  <span className="italic">{crystal.pranicFrequency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. 3D SACRED METAL IDOLS & VASTU OBJECTS                 */}
      {/* ======================================================== */}
      {activeCategory === "three_d_objects" && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <span>🗿</span> Classical 3D Sacred Metal Idols &amp; Sculptural Cures
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Three-dimensional metallic mass curves spatial ether and anchors directional vitality according to classical Mayamatam &amp; Manasara scriptures.
              </p>
            </div>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Panchdhatu · Solid Brass · Pure Copper
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {THREE_D_REMEDIES_DATABASE.map((obj) => (
              <div
                key={obj.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3.5 flex flex-col justify-between hover:border-amber-300 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800">
                          {obj.metalOrMaterial}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700">
                          Best Zone: {obj.bestZone}
                        </span>
                      </div>
                      <h4 className="text-base font-black text-slate-900 mt-1">
                        {obj.objectName}
                      </h4>
                    </div>

                    <button
                      onClick={() =>
                        handleCopy(
                          `${obj.objectName} (${obj.bestZone}): ${obj.classicalPurpose}\nFacing: ${obj.directionFacing}\nRitual: ${obj.installationRitual}`,
                          obj.id
                        )
                      }
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Copy details"
                    >
                      {copiedId === obj.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-slate-800 leading-relaxed font-medium bg-amber-50/50 p-2.5 rounded-xl border border-amber-200/50">
                    {obj.classicalPurpose}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-700">
                    <p className="leading-relaxed">
                      <span className="font-bold text-slate-900">Facing Orientation: </span>
                      {obj.directionFacing}
                    </p>
                    <p className="leading-relaxed text-slate-600">
                      <span className="font-bold text-slate-900">Installation Ritual: </span>
                      {obj.installationRitual}
                    </p>
                    <p className="leading-relaxed text-rose-700 font-semibold">
                      <span className="font-bold text-rose-900">Prohibited: </span>
                      {obj.prohibitedPlacements}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-bold text-amber-800">{obj.shastricReference}</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Consecrated Standard
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. VEDIC MANTRAS & VASTU SHANTI PUJA PROTOCOLS           */}
      {/* ======================================================== */}
      {activeCategory === "vedic_pujas" && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <span>📿</span> Authentic Vedic Mantras, Stotras &amp; Vastu Shanti Homas
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Vedic sound vibrations (Shabda Brahma) transmute the ether of the land, dissolving past karmic flaws and structural doshas.
              </p>
            </div>
            <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              Rigvedic &amp; Yajurvedic Ritual Protocols
            </span>
          </div>

          <div className="space-y-4">
            {VEDIC_PUJA_PROTOCOLS_DATABASE.map((puja) => (
              <div
                key={puja.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4 hover:border-rose-300 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800">
                        Target: {puja.targetDosha}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800">
                        Deity: {puja.deity}
                      </span>
                    </div>
                    <h4 className="text-lg font-black text-slate-900 mt-1">
                      {puja.title}
                    </h4>
                  </div>

                  <button
                    onClick={() =>
                      handleCopy(
                        `${puja.title}\nMantra: ${puja.coreMantra}\nMeaning: ${puja.mantraMeaning}\nFruit: ${puja.fruitBenefit}`,
                        puja.id
                      )
                    }
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedId === puja.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Ritual</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Core Sanskrit Mantra Box */}
                <div className="bg-rose-50/60 p-4 rounded-xl border border-rose-200/70 space-y-2">
                  <div className="text-[11px] font-black uppercase tracking-wider text-rose-800 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-rose-600" />
                    Core Consecrated Sanskrit Mantra
                  </div>
                  <p className="text-sm font-serif font-bold text-slate-950 tracking-wide leading-relaxed bg-white p-3 rounded-lg border border-rose-100">
                    {puja.coreMantra}
                  </p>
                  <p className="text-xs text-slate-700 italic">
                    <span className="font-bold not-italic text-slate-900">Translation: </span>
                    {puja.mantraMeaning}
                  </p>
                </div>

                {/* Step-by-Step Procedure & Samagri */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <div className="font-black text-slate-900 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-indigo-600" />
                      Step-by-Step Vidhi Procedure
                    </div>
                    <ul className="space-y-1.5 text-slate-700">
                      {puja.ritualProcedure.map((step, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <div className="font-black text-slate-900 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      Auspicious Timing &amp; Required Samagri
                    </div>
                    <p className="text-slate-700">
                      <span className="font-bold text-slate-900">Auspicious Muhurat: </span>
                      {puja.idealTithiNakshatra}
                    </p>
                    <div className="pt-1">
                      <span className="font-bold text-slate-900">Homa Samagri: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {puja.samagriList.map((item, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] text-slate-700"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fruit / Benefit */}
                <div className="text-xs text-emerald-900 font-bold bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Phala (Divine Fruit): {puja.fruitBenefit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. FENG SHUI GRANDMASTER PROTECTIONS                     */}
      {/* ======================================================== */}
      {activeCategory === "feng_shui_cures" && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <span>🐉</span> Feng Shui Grandmaster Protections &amp; Celestial Animals
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Classical Bagua alignments, dragon turtles, Pi Xiu guardians, and Wu Lou gourds to harmonize flying star energy.
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Period 9 (Fire Era 2024-2043)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FENG_SHUI_GRANDMASTER_DATABASE.map((cure) => (
              <div
                key={cure.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3.5 flex flex-col justify-between hover:border-emerald-300 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800">
                          {cure.chineseName}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700">
                          {cure.baguaTrigram}
                        </span>
                      </div>
                      <h4 className="text-base font-black text-slate-900 mt-1">
                        {cure.cureName}
                      </h4>
                    </div>

                    <button
                      onClick={() =>
                        handleCopy(
                          `${cure.cureName} (${cure.chineseName}): ${cure.functionPurpose}\nSector: ${cure.directionSector}\nActivation: ${cure.activationRitual}`,
                          cure.id
                        )
                      }
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Copy details"
                    >
                      {copiedId === cure.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-slate-800 leading-relaxed font-medium bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-200/50">
                    {cure.functionPurpose}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-700">
                    <p className="leading-relaxed">
                      <span className="font-bold text-slate-900">Placement Sector: </span>
                      {cure.directionSector}
                    </p>
                    <p className="leading-relaxed">
                      <span className="font-bold text-slate-900">Material Composition: </span>
                      {cure.material}
                    </p>
                    <p className="leading-relaxed text-slate-600">
                      <span className="font-bold text-slate-900">Activation Ritual: </span>
                      {cure.activationRitual}
                    </p>
                  </div>

                  <div className="pt-2 space-y-1">
                    <span className="text-[11px] font-black uppercase tracking-wider text-rose-800">
                      Strict Grandmaster Rules:
                    </span>
                    <ul className="text-xs space-y-1 text-slate-600">
                      {cure.criticalRules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-rose-500 font-bold">•</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-bold text-emerald-800">Authentic Lineage Method</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Certified Cure
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
