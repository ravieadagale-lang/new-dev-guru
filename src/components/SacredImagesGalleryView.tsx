// src/components/SacredImagesGalleryView.tsx
import React, { useState, useMemo } from "react";
import {
  Image as ImageIcon,
  Search,
  Sparkles,
  Maximize2,
  X,
  Copy,
  Check,
  Compass,
  Gem,
  Heart,
  Zap,
  Tag,
  BookOpen,
  Droplets,
  Flame,
  Shield,
  Coins,
  Filter
} from "lucide-react";
import { resolveImageUrl } from "../utils/imageResolver";
import {
  NAVAGRAHA_DEITIES_FULL_GALLERY,
  MAJOR_DEITIES_GALLERY,
  CRYSTALS_GEMSTONES_GALLERY,
  RUDRAKSHA_BEADS_GALLERY,
  CHAKRAS_GALLERY,
  NavagrahaDeityFullAsset,
  MajorDeityAsset,
  CrystalGemstoneAsset,
  RudrakshaBeadAsset,
  ChakraAsset
} from "../data/numerologyAssetsData";
import { MASTER_CRYSTALS_LIST, CrystalMasterItem } from "../data/crystalsMasterData";
import { MAJOR_ARCANA_DECK, MajorArcanaCard } from "../data/tarotMajorArcanaData";
import { TAROT_CUPS_SUIT, TarotCupsCard } from "../data/tarotCupsData";
import { TAROT_WANDS_SUIT, TarotWandsCard } from "../data/tarotWandsData";
import { TAROT_SWORDS_SUIT, TarotSwordsCard } from "../data/tarotSwordsData";
import { TAROT_PENTACLES_SUIT, TarotPentaclesCard } from "../data/tarotPentaclesData";

export interface SacredImageItem {
  id: string;
  category: "navagraha" | "deities" | "crystals" | "rudraksha" | "chakras" | "tarot" | "tarot_cups" | "tarot_wands" | "tarot_swords" | "tarot_pentacles";
  categoryLabel: string;
  title: string;
  sanskritTitle?: string;
  subtitle?: string;
  planetOrNumber?: string;
  description: string;
  mantra?: string;
  benefits?: string[];
  imageUrl: string;
  wearingOrPlacement?: string;
  cleansingMethod?: string;
}

// Build consolidated master gallery list with resolved image URLs
const MASTER_IMAGE_COLLECTION: SacredImageItem[] = [
  // 1. NAVAGRAHA PLANETARY GODS
  ...NAVAGRAHA_DEITIES_FULL_GALLERY.map((item: NavagrahaDeityFullAsset) => ({
    id: `navagraha_${item.number}`,
    category: "navagraha" as const,
    categoryLabel: "Navagraha Deity",
    title: item.planetName,
    sanskritTitle: item.sanskritName,
    subtitle: item.deityTitle,
    planetOrNumber: `Number ${item.number} • ${item.direction}`,
    description: item.guidance,
    mantra: item.mantra,
    benefits: item.attributes,
    imageUrl: resolveImageUrl(item.imageUrl)
  })),

  // 2. SACRED DEITIES & DIVINE MANIFESTATIONS
  ...MAJOR_DEITIES_GALLERY.map((item: MajorDeityAsset, idx: number) => ({
    id: `deity_${idx}`,
    category: "deities" as const,
    categoryLabel: "Sacred Deity",
    title: item.name,
    subtitle: item.title,
    planetOrNumber: item.associatedPlanetsOrNumbers,
    description: item.description,
    mantra: item.sanskritMantra,
    imageUrl: resolveImageUrl(item.imageUrl)
  })),

  // 3. MASTER HEALING CRYSTALS
  ...MASTER_CRYSTALS_LIST.map((item: CrystalMasterItem) => ({
    id: `crystal_master_${item.id}`,
    category: "crystals" as const,
    categoryLabel: "Master Healing Crystal",
    title: item.name,
    sanskritTitle: item.sanskritName,
    subtitle: `${item.planet} • ${item.chakra}`,
    planetOrNumber: `Number ${item.number}`,
    description: item.description,
    mantra: item.mantra,
    benefits: item.benefits,
    wearingOrPlacement: item.wearingPlacement,
    cleansingMethod: item.cleansingMethod,
    imageUrl: resolveImageUrl(item.imageUrl)
  })),

  // 4. VEDIC GEMSTONES
  ...CRYSTALS_GEMSTONES_GALLERY.map((item: CrystalGemstoneAsset, idx: number) => ({
    id: `gemstone_${idx}`,
    category: "crystals" as const,
    categoryLabel: "Vedic Gemstone",
    title: item.name,
    sanskritTitle: item.hindiName,
    subtitle: `Planet ${item.planet}`,
    planetOrNumber: `Number ${item.number}`,
    description: item.benefits,
    imageUrl: resolveImageUrl(item.imageUrl)
  })),

  // 5. SACRED RUDRAKSHA BEADS (1 TO 21 MUKHI)
  ...RUDRAKSHA_BEADS_GALLERY.map((item: RudrakshaBeadAsset, idx: number) => ({
    id: `rudraksha_${idx}`,
    category: "rudraksha" as const,
    categoryLabel: "Sacred Rudraksha",
    title: item.mukhi,
    sanskritTitle: item.sanskritName,
    subtitle: `Deity: ${item.deity}`,
    planetOrNumber: `${item.associatedNumber} • ${item.planet}`,
    description: item.benefits,
    mantra: item.mantra,
    imageUrl: resolveImageUrl(item.imageUrl)
  })),

  // 7. SEVEN CHAKRAS & SUBTLE ENERGY
  ...CHAKRAS_GALLERY.map((item: ChakraAsset, idx: number) => ({
    id: `chakra_${idx}`,
    category: "chakras" as const,
    categoryLabel: "Sacred Chakra",
    title: item.name,
    sanskritTitle: `${item.sanskritName} (${item.petals})`,
    subtitle: `Element: ${item.element}`,
    planetOrNumber: item.associatedNumber,
    description: item.description,
    mantra: `Bija Mantra: ${item.bijaMantra}`,
    imageUrl: resolveImageUrl(item.imageUrl)
  })),

  // 8. SACRED TAROT MAJOR ARCANA (0 TO 21 + DECK SEAL)
  ...MAJOR_ARCANA_DECK.map((item: MajorArcanaCard) => ({
    id: `tarot_${item.cardNumber}`,
    category: "tarot" as const,
    categoryLabel: "Major Arcana",
    title: item.title,
    sanskritTitle: item.sanskritTitle,
    subtitle: item.subtitle,
    planetOrNumber: item.planetOrElement,
    description: item.description,
    imageUrl: resolveImageUrl(item.imageUrl)
  })),

  // 9. SACRED TAROT SUIT OF CUPS (ACE TO KING)
  ...TAROT_CUPS_SUIT.map((item: TarotCupsCard) => ({
    id: item.id,
    category: "tarot_cups" as const,
    categoryLabel: "Suit of Cups",
    title: item.title,
    sanskritTitle: item.sanskritTitle,
    subtitle: item.subtitle,
    planetOrNumber: item.element,
    description: item.description,
    imageUrl: resolveImageUrl(item.imageUrl)
  })),

  // 10. SACRED TAROT SUIT OF WANDS (ACE TO KING)
  ...TAROT_WANDS_SUIT.map((item: TarotWandsCard) => ({
    id: item.id,
    category: "tarot_wands" as const,
    categoryLabel: "Suit of Wands",
    title: item.title,
    sanskritTitle: item.sanskritTitle,
    subtitle: item.subtitle,
    planetOrNumber: item.element,
    description: item.description,
    imageUrl: resolveImageUrl(item.imageUrl)
  })),

  // 11. SACRED TAROT SUIT OF SWORDS (ACE TO KING)
  ...TAROT_SWORDS_SUIT.map((item: TarotSwordsCard) => ({
    id: item.id,
    category: "tarot_swords" as const,
    categoryLabel: "Suit of Swords",
    title: item.title,
    sanskritTitle: item.sanskritTitle,
    subtitle: item.subtitle,
    planetOrNumber: item.element,
    description: item.description,
    imageUrl: resolveImageUrl(item.imageUrl)
  })),

  // 12. SACRED TAROT SUIT OF PENTACLES (ACE TO KING)
  ...TAROT_PENTACLES_SUIT.map((item: TarotPentaclesCard) => ({
    id: item.id,
    category: "tarot_pentacles" as const,
    categoryLabel: "Suit of Pentacles",
    title: item.title,
    sanskritTitle: item.sanskritTitle,
    subtitle: item.subtitle,
    planetOrNumber: item.element,
    description: item.description,
    imageUrl: resolveImageUrl(item.imageUrl)
  }))
];

export const SacredImagesGalleryView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalItem, setActiveModalItem] = useState<SacredImageItem | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Category Tabs Configuration
  const categories = [
    { id: "all", label: "All Sacred Icons", icon: ImageIcon, count: MASTER_IMAGE_COLLECTION.length },
    { id: "navagraha", label: "Navagraha Gods (9)", icon: Compass, count: NAVAGRAHA_DEITIES_FULL_GALLERY.length },
    { id: "deities", label: "Sacred Deities", icon: Sparkles, count: MAJOR_DEITIES_GALLERY.length },
    { id: "crystals", label: "Crystals & Gems", icon: Gem, count: MASTER_CRYSTALS_LIST.length + CRYSTALS_GEMSTONES_GALLERY.length },
    { id: "rudraksha", label: "Rudrakshas (1-21)", icon: Zap, count: RUDRAKSHA_BEADS_GALLERY.length },
    { id: "chakras", label: "7 Chakras", icon: Heart, count: CHAKRAS_GALLERY.length },
    { id: "tarot", label: "Major Arcana (23)", icon: BookOpen, count: MAJOR_ARCANA_DECK.length },
    { id: "tarot_cups", label: "Suit of Cups (14)", icon: Droplets, count: TAROT_CUPS_SUIT.length },
    { id: "tarot_wands", label: "Suit of Wands (14)", icon: Flame, count: TAROT_WANDS_SUIT.length },
    { id: "tarot_swords", label: "Suit of Swords (14)", icon: Shield, count: TAROT_SWORDS_SUIT.length },
    { id: "tarot_pentacles", label: "Suit of Pentacles (14)", icon: Coins, count: TAROT_PENTACLES_SUIT.length }
  ];

  // Filtered Items
  const filteredItems = useMemo(() => {
    return MASTER_IMAGE_COLLECTION.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesQuery =
        item.title.toLowerCase().includes(query) ||
        (item.sanskritTitle && item.sanskritTitle.toLowerCase().includes(query)) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(query)) ||
        (item.planetOrNumber && item.planetOrNumber.toLowerCase().includes(query)) ||
        (item.description && item.description.toLowerCase().includes(query)) ||
        (item.mantra && item.mantra.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 md:p-8 text-white border border-amber-500/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>✦ Sacred Visual Vault & Divine Archetypes</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-300">
            Sacred Gallery & Divine Iconography
          </h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Explore and inspect the complete high-definition visual vault of Vedic deities, Navagraha planetary rulers, 18 master healing crystals, gemstones, 1–21 Mukhi Kuber Rudrakshas, 7 chakras, and the full 78 Tarot Arcana.
          </p>

          {/* QUICK SEARCH BAR */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/70" />
              <input
                type="text"
                placeholder="Search by deity, crystal, planet, mantra, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-amber-500/30 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-900/60 rounded-xl border border-amber-900/40 text-xs text-amber-300 font-mono shrink-0">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <span>Showing <strong>{filteredItems.length}</strong> / {MASTER_IMAGE_COLLECTION.length} assets</span>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORY TABS */}
      <div className="flex items-center overflow-x-auto gap-2 pb-2 no-scrollbar border-b border-amber-900/10 text-xs font-medium">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                isSelected
                  ? "bg-slate-900 text-amber-300 font-bold shadow-md scale-105 border border-amber-500/30"
                  : "bg-white text-slate-700 hover:text-slate-900 border border-amber-900/10 hover:bg-amber-50/50"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-amber-400" : "text-slate-500"}`} />
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                isSelected ? "bg-amber-500/20 text-amber-300" : "bg-slate-100 text-slate-600"
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* GALLERY GRID */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-2xl bg-white border border-amber-900/10 text-slate-500 space-y-2">
          <ImageIcon className="w-10 h-10 mx-auto text-amber-500/40" />
          <p className="text-sm font-semibold text-slate-700">No images matched your search criteria.</p>
          <p className="text-xs text-slate-500">Try clearing your search query or selecting a different category.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-2 px-4 py-1.5 bg-amber-500 text-slate-950 font-bold rounded-lg text-xs hover:bg-amber-400 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group relative bg-slate-950 rounded-2xl border border-amber-900/20 overflow-hidden shadow-lg hover:shadow-2xl hover:border-amber-500/50 transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* IMAGE CONTAINER */}
              <div className={`relative overflow-hidden bg-slate-900 ${
                item.category.startsWith("tarot") ? "aspect-[3/4]" : "aspect-square"
              }`}>
                <img
                  src={resolveImageUrl(item.imageUrl)}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Overlay Badge */}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-500/30 text-[10px] font-semibold tracking-wide">
                  {item.categoryLabel}
                </div>

                {/* Expand Overlay Icon */}
                <div className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-950/70 text-slate-300 group-hover:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* CARD DETAILS */}
              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2 bg-gradient-to-b from-slate-950 to-slate-900 text-white">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xs font-bold text-amber-200 line-clamp-1 group-hover:text-amber-300 transition">
                      {item.title}
                    </h3>
                  </div>

                  {item.sanskritTitle && (
                    <p className="text-[11px] text-amber-400/90 font-serif line-clamp-1 mt-0.5">
                      {item.sanskritTitle}
                    </p>
                  )}

                  {item.subtitle && (
                    <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                      {item.subtitle}
                    </p>
                  )}
                </div>

                {item.planetOrNumber && (
                  <div className="pt-1 flex items-center justify-between border-t border-slate-800/80 text-[10px]">
                    <span className="text-amber-300/80 font-mono font-medium">
                      {item.planetOrNumber}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1 group-hover:text-amber-300">
                      View Asset <Maximize2 className="w-2.5 h-2.5" />
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FULLSCREEN IMAGE MODAL */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>

            {/* MODAL IMAGE */}
            <div className="w-full md:w-1/2 bg-slate-950 flex items-center justify-center p-4 relative min-h-[260px] md:min-h-[380px]">
              <img
                src={resolveImageUrl(activeModalItem.imageUrl)}
                alt={activeModalItem.title}
                referrerPolicy="no-referrer"
                className="max-h-[360px] md:max-h-[440px] w-auto h-auto object-contain rounded-xl shadow-lg"
              />
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/90 text-amber-300 border border-amber-500/30 text-[11px] font-mono">
                {activeModalItem.categoryLabel}
              </div>
            </div>

            {/* MODAL DETAILS */}
            <div className="w-full md:w-1/2 p-5 md:p-6 text-white overflow-y-auto space-y-4 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">
                  {activeModalItem.categoryLabel} Asset
                </div>
                <h2 className="text-xl font-bold font-serif text-amber-200 mt-1">
                  {activeModalItem.title}
                </h2>
                {activeModalItem.sanskritTitle && (
                  <p className="text-sm font-serif text-amber-400/90 mt-0.5">
                    {activeModalItem.sanskritTitle}
                  </p>
                )}
                {activeModalItem.subtitle && (
                  <p className="text-xs text-slate-300 mt-1">
                    {activeModalItem.subtitle}
                  </p>
                )}
              </div>

              {activeModalItem.planetOrNumber && (
                <div className="inline-block px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
                  {activeModalItem.planetOrNumber}
                </div>
              )}

              {/* DESCRIPTION */}
              <div className="space-y-1">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                  Description & Guidance
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {activeModalItem.description}
                </p>
              </div>

              {/* BENEFITS LIST IF AVAILABLE */}
              {activeModalItem.benefits && activeModalItem.benefits.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wide">
                    Key Spiritual & Energetic Benefits
                  </div>
                  <ul className="space-y-1">
                    {activeModalItem.benefits.map((b, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <Sparkles className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* MANTRA */}
              {activeModalItem.mantra && (
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/50 space-y-1">
                  <div className="text-[10px] font-bold uppercase text-amber-300 tracking-wider">
                    Sacred Mantra / Vibration
                  </div>
                  <p className="text-xs font-serif text-amber-200 italic">
                    "{activeModalItem.mantra}"
                  </p>
                </div>
              )}

              {/* WEARING / CLEANSING IF CRYSTAL */}
              {activeModalItem.wearingOrPlacement && (
                <div className="text-xs space-y-1 text-slate-300 border-t border-slate-800 pt-2">
                  <p><strong className="text-amber-400">Wearing/Placement: </strong>{activeModalItem.wearingOrPlacement}</p>
                  {activeModalItem.cleansingMethod && (
                    <p><strong className="text-amber-400">Cleansing: </strong>{activeModalItem.cleansingMethod}</p>
                  )}
                </div>
              )}

              {/* DIRECT IMAGE URL PATH COPY */}
              <div className="pt-2 border-t border-slate-800 space-y-1">
                <div className="text-[10px] font-semibold text-slate-400">
                  Application Asset File Path:
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300">
                  <span className="truncate flex-1">{activeModalItem.imageUrl}</span>
                  <button
                    onClick={() => handleCopyUrl(activeModalItem.imageUrl)}
                    className="p-1 rounded hover:bg-slate-800 text-amber-400 transition"
                    title="Copy path"
                  >
                    {copiedUrl === activeModalItem.imageUrl ? (
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};
