import React, { useState, useMemo } from "react";
import {
  Astrologer,
  AstrologerExpertiseCategory,
  AstrologerFilterCriteria,
  ASTROLOGER_EXPERTISE_CATEGORIES,
  VERIFIED_ASTROLOGERS,
  filterAstrologers,
} from "../../domain/consultation/astrologersData";
import { resolveImageUrl } from "../../utils/imageResolver";
import {
  Search,
  Filter,
  CheckCircle2,
  Star,
  Clock,
  Sparkles,
  User,
  ArrowRight,
  ShieldCheck,
  Languages,
  RotateCcw,
  SlidersHorizontal,
  X,
  Zap,
  Info,
  Calendar,
  IndianRupee,
  ChevronDown,
  Check,
} from "lucide-react";

interface AstrologerDirectoryFilterProps {
  onSelectAstrologer: (astrologer: Astrologer) => void;
  onAskQuickQuestion?: (astrologer?: Astrologer) => void;
}

type FeePreset = "ALL" | "UNDER_1500" | "1500_TO_2500" | "OVER_2500" | "CUSTOM";

export const AstrologerDirectoryFilter: React.FC<AstrologerDirectoryFilterProps> = ({
  onSelectAstrologer,
  onAskQuickQuestion,
}) => {
  // Filter state
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ONLINE" | "OFFLINE">("ALL");
  const [categoryFilter, setCategoryFilter] = useState<AstrologerExpertiseCategory | "ALL">("ALL");
  const [minFeeInput, setMinFeeInput] = useState<string>("");
  const [maxFeeInput, setMaxFeeInput] = useState<string>("");
  const [feePreset, setFeePreset] = useState<FeePreset>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"RECOMMENDED" | "RATING_DESC" | "EXPERIENCE_DESC" | "FEE_ASC" | "FEE_DESC">("RECOMMENDED");

  // Profile modal state
  const [selectedProfileAstrologer, setSelectedProfileAstrologer] = useState<Astrologer | null>(null);

  // Quick statistics
  const totalCount = VERIFIED_ASTROLOGERS.length;
  const onlineCount = useMemo(
    () => VERIFIED_ASTROLOGERS.filter((a) => a.isOnline).length,
    []
  );
  const offlineCount = totalCount - onlineCount;

  // Handle Fee Presets
  const applyFeePreset = (preset: FeePreset) => {
    setFeePreset(preset);
    switch (preset) {
      case "ALL":
        setMinFeeInput("");
        setMaxFeeInput("");
        break;
      case "UNDER_1500":
        setMinFeeInput("");
        setMaxFeeInput("1500");
        break;
      case "1500_TO_2500":
        setMinFeeInput("1500");
        setMaxFeeInput("2500");
        break;
      case "OVER_2500":
        setMinFeeInput("2500");
        setMaxFeeInput("");
        break;
      case "CUSTOM":
        break;
    }
  };

  const handleCustomMinFeeChange = (val: string) => {
    setMinFeeInput(val);
    setFeePreset("CUSTOM");
  };

  const handleCustomMaxFeeChange = (val: string) => {
    setMaxFeeInput(val);
    setFeePreset("CUSTOM");
  };

  const handleResetFilters = () => {
    setStatusFilter("ALL");
    setCategoryFilter("ALL");
    setMinFeeInput("");
    setMaxFeeInput("");
    setFeePreset("ALL");
    setSearchQuery("");
    setSortBy("RECOMMENDED");
  };

  const parsedMinFee = minFeeInput.trim() !== "" ? Number(minFeeInput) : null;
  const parsedMaxFee = maxFeeInput.trim() !== "" ? Number(maxFeeInput) : null;

  const hasActiveFilters =
    statusFilter !== "ALL" ||
    categoryFilter !== "ALL" ||
    parsedMinFee !== null ||
    parsedMaxFee !== null ||
    searchQuery.trim() !== "" ||
    sortBy !== "RECOMMENDED";

  // Filtered Astrologers list
  const filteredAstrologers = useMemo(() => {
    const criteria: AstrologerFilterCriteria = {
      status: statusFilter,
      category: categoryFilter,
      minFee: parsedMinFee !== null && !isNaN(parsedMinFee) ? parsedMinFee : null,
      maxFee: parsedMaxFee !== null && !isNaN(parsedMaxFee) ? parsedMaxFee : null,
      searchQuery,
      sortBy,
    };
    return filterAstrologers(VERIFIED_ASTROLOGERS, criteria);
  }, [statusFilter, categoryFilter, parsedMinFee, parsedMaxFee, searchQuery, sortBy]);

  const activeCategoryLabel = useMemo(() => {
    const match = ASTROLOGER_EXPERTISE_CATEGORIES.find((c) => c.id === categoryFilter);
    return match ? match.label : "All Categories";
  }, [categoryFilter]);

  return (
    <section
      id="astrologer-directory-section"
      className="space-y-6 pt-2 animate-in fade-in duration-300"
    >
      {/* Header and section title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200/80 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-900 border border-amber-300 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Verified Astrological Panel</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Consult Verified Astrologers
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Filter our accredited panel by real-time online presence, Jyotish expertise category, and consultation fees. Every session is strictly confidential and guaranteed by Dev-Guru.
          </p>
        </div>

        {/* Live Status Summary Pill */}
        <div className="flex items-center gap-2 self-start sm:self-end">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300/80 text-emerald-800 text-xs font-semibold shadow-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span>{onlineCount} Astrologers Online Now</span>
          </span>
        </div>
      </div>

      {/* FILTER CONTROL PANEL */}
      <div className="bg-slate-50/90 rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-5">
        {/* ROW 1: Online Status Tabs + Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Status Segmented Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-amber-700" />
              <span>Status:</span>
            </span>

            {/* ALL */}
            <button
              type="button"
              id="filter-status-all"
              onClick={() => setStatusFilter("ALL")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                statusFilter === "ALL"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>All Astrologers</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  statusFilter === "ALL" ? "bg-slate-800 text-slate-200" : "bg-slate-100 text-slate-600"
                }`}
              >
                {totalCount}
              </span>
            </button>

            {/* ONLINE NOW */}
            <button
              type="button"
              id="filter-status-online"
              onClick={() => setStatusFilter("ONLINE")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                statusFilter === "ONLINE"
                  ? "bg-emerald-700 text-white shadow-xs ring-2 ring-emerald-500/30"
                  : "bg-white text-emerald-800 hover:bg-emerald-50/70 border border-emerald-300"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Online Now</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  statusFilter === "ONLINE" ? "bg-emerald-800 text-emerald-100" : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {onlineCount}
              </span>
            </button>

            {/* OFFLINE */}
            <button
              type="button"
              id="filter-status-offline"
              onClick={() => setStatusFilter("OFFLINE")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                statusFilter === "OFFLINE"
                  ? "bg-slate-800 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              <span>Offline / Schedule</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  statusFilter === "OFFLINE" ? "bg-slate-700 text-slate-300" : "bg-slate-100 text-slate-600"
                }`}
              >
                {offlineCount}
              </span>
            </button>
          </div>

          {/* Search bar */}
          <div className="relative min-w-[240px] max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              id="filter-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, expertise, or language..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ROW 2: Expertise Category Chips & Dropdown */}
        <div className="space-y-2 pt-1 border-t border-slate-200/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Expertise Category</span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              Filter by Shastric discipline
            </span>
          </div>

          {/* Responsive Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {ASTROLOGER_EXPERTISE_CATEGORIES.map((cat) => {
              const isSelected = categoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  id={`filter-cat-${cat.id.toLowerCase()}`}
                  onClick={() => setCategoryFilter(cat.id)}
                  title={cat.description}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-amber-800 text-white shadow-xs ring-2 ring-amber-400/30"
                      : "bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-amber-200" />}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ROW 3: Consultation Fees (Min / Max Inputs & Presets) */}
        <div className="space-y-2 pt-1 border-t border-slate-200/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
              <IndianRupee className="w-3.5 h-3.5 text-amber-700" />
              <span>Consultation Fee Range (₹)</span>
            </div>

            {/* Fee Presets */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-slate-400 font-medium mr-1">Presets:</span>
              <button
                type="button"
                id="fee-preset-all"
                onClick={() => applyFeePreset("ALL")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                  feePreset === "ALL" && !minFeeInput && !maxFeeInput
                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                Any Fee
              </button>
              <button
                type="button"
                id="fee-preset-under-1500"
                onClick={() => applyFeePreset("UNDER_1500")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                  feePreset === "UNDER_1500"
                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                Under ₹1,500
              </button>
              <button
                type="button"
                id="fee-preset-1500-2500"
                onClick={() => applyFeePreset("1500_TO_2500")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                  feePreset === "1500_TO_2500"
                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                ₹1,500 – ₹2,500
              </button>
              <button
                type="button"
                id="fee-preset-over-2500"
                onClick={() => applyFeePreset("OVER_2500")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                  feePreset === "OVER_2500"
                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                ₹2,500+
              </button>
            </div>
          </div>

          {/* Min and Max Fee Numeric Inputs */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label htmlFor="min-fee-input" className="text-xs text-slate-600 font-medium">
                Min Fee:
              </label>
              <div className="relative w-28">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">
                  ₹
                </span>
                <input
                  type="number"
                  id="min-fee-input"
                  min="0"
                  step="100"
                  placeholder="Min (e.g. 1000)"
                  value={minFeeInput}
                  onChange={(e) => handleCustomMinFeeChange(e.target.value)}
                  className="w-full pl-6 pr-2 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="max-fee-input" className="text-xs text-slate-600 font-medium">
                Max Fee:
              </label>
              <div className="relative w-28">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">
                  ₹
                </span>
                <input
                  type="number"
                  id="max-fee-input"
                  min="0"
                  step="100"
                  placeholder="Max (e.g. 3000)"
                  value={maxFeeInput}
                  onChange={(e) => handleCustomMaxFeeChange(e.target.value)}
                  className="w-full pl-6 pr-2 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                />
              </div>
            </div>

            {(minFeeInput || maxFeeInput) && (
              <button
                type="button"
                onClick={() => {
                  setMinFeeInput("");
                  setMaxFeeInput("");
                  setFeePreset("ALL");
                }}
                className="text-xs text-amber-800 hover:text-amber-950 underline font-medium cursor-pointer"
              >
                Clear Fee Limits
              </button>
            )}

            <div className="ml-auto flex items-center gap-2 text-xs">
              <label htmlFor="sort-by-select" className="text-slate-500 font-medium">
                Sort By:
              </label>
              <select
                id="sort-by-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-1.5 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
              >
                <option value="RECOMMENDED">Recommended (Chief Astrologer First)</option>
                <option value="RATING_DESC">Highest Rating (★ 5.0 - 1.0)</option>
                <option value="EXPERIENCE_DESC">Most Experience (Years)</option>
                <option value="FEE_ASC">Consultation Fee: Low to High</option>
                <option value="FEE_DESC">Consultation Fee: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* ACTIVE FILTERS BAR & RESULT COUNTER */}
        <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-700">
              Showing {filteredAstrologers.length} of {totalCount} Astrologers
            </span>

            {/* Active status pill */}
            {statusFilter !== "ALL" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 text-[11px] font-semibold">
                <span>Status: {statusFilter === "ONLINE" ? "Online Now" : "Offline"}</span>
                <button
                  type="button"
                  onClick={() => setStatusFilter("ALL")}
                  className="hover:text-red-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Active category pill */}
            {categoryFilter !== "ALL" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-semibold">
                <span>Category: {activeCategoryLabel}</span>
                <button
                  type="button"
                  onClick={() => setCategoryFilter("ALL")}
                  className="hover:text-red-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Active fee bounds pill */}
            {(parsedMinFee !== null || parsedMaxFee !== null) && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[11px] font-semibold">
                <span>
                  Fee:{" "}
                  {parsedMinFee !== null ? `≥ ₹${parsedMinFee}` : ""}
                  {parsedMinFee !== null && parsedMaxFee !== null ? " and " : ""}
                  {parsedMaxFee !== null ? `≤ ₹${parsedMaxFee}` : ""}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setMinFeeInput("");
                    setMaxFeeInput("");
                    setFeePreset("ALL");
                  }}
                  className="hover:text-red-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Active search pill */}
            {searchQuery.trim() !== "" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[11px] font-semibold">
                <span>Query: "{searchQuery}"</span>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="hover:text-red-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          {/* Reset Filters CTA */}
          {hasActiveFilters && (
            <button
              type="button"
              id="btn-reset-filters"
              onClick={handleResetFilters}
              className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* ASTROLOGER CARDS GRID */}
      {filteredAstrologers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAstrologers.map((astrologer) => {
            const isChief = astrologer.isChiefConsultant;

            return (
              <div
                key={astrologer.id}
                id={`astrologer-card-${astrologer.id}`}
                className={`rounded-3xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
                  isChief
                    ? "bg-gradient-to-b from-amber-50/60 via-white to-amber-50/30 border-amber-300 ring-2 ring-amber-400/25"
                    : "bg-white border-slate-200/90"
                }`}
              >
                {/* Top Section */}
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Status & Badge Header */}
                  <div className="flex items-center justify-between gap-2">
                    {/* Live Online / Offline Presence Badge */}
                    {astrologer.isOnline ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-bold">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span>Online Now</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[11px] font-medium">
                        <span className="w-2 h-2 rounded-full bg-slate-400" />
                        <span>Offline</span>
                      </span>
                    )}

                    {/* Chief / Verified Badge */}
                    {isChief ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                        <Sparkles className="w-3 h-3 text-amber-200" />
                        <span>Chief Astrologer</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Verified Panel</span>
                      </span>
                    )}
                  </div>

                  {/* Profile Header: Avatar + Name + Title */}
                  <div className="flex items-start gap-3.5">
                    <div className="relative shrink-0">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-900 border-2 border-amber-400/40 shadow-xs flex items-center justify-center">
                        {astrologer.avatarUrl ? (
                          <img
                            src={resolveImageUrl(astrologer.avatarUrl)}
                            alt={astrologer.name}
                            className="w-full h-full object-cover object-center"
                            onError={(e) => {
                              (e.currentTarget as HTMLElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <User className="w-8 h-8 text-amber-300/60" />
                        )}
                      </div>
                      {astrologer.isOnline && (
                        <div
                          className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-2xs"
                          title="Online Now"
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-serif text-lg font-bold text-slate-900 truncate">
                          {astrologer.name}
                        </h3>
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      </div>
                      <p className="text-xs text-slate-500 font-medium line-clamp-1">
                        {astrologer.title}
                      </p>
                      <div className="flex items-center gap-3 text-xs pt-0.5">
                        <span className="flex items-center gap-1 text-amber-700 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span>{astrologer.rating.toFixed(2)}</span>
                        </span>
                        <span className="text-slate-300 select-none">·</span>
                        <span className="text-slate-600 text-[11px] font-medium">
                          {astrologer.experienceYears}+ yrs exp
                        </span>
                        <span className="text-slate-300 select-none">·</span>
                        <span className="text-slate-500 text-[11px]">
                          {astrologer.totalConsultations}+ sessions
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bio statement */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {astrologer.bio}
                  </p>

                  {/* Main Expertise & Skills */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-lg bg-amber-100 text-amber-900 border border-amber-300/80 text-[11px] font-bold">
                        {astrologer.mainExpertise}
                      </span>
                      {astrologer.skills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {astrologer.skills.length > 3 && (
                        <span className="text-[10px] text-slate-400 font-semibold">
                          +{astrologer.skills.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Languages Spoken & Next Availability */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <div className="flex items-center gap-1">
                        <Languages className="w-3.5 h-3.5 text-slate-400" />
                        <span>{astrologer.languages.join(", ")}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-800 font-medium">
                        <Clock className="w-3.5 h-3.5 text-amber-700" />
                        <span>{astrologer.durationMinutes} mins</span>
                      </div>
                    </div>

                    <div className="text-[11px] font-medium text-slate-500 bg-slate-50 p-2 rounded-xl border border-slate-100 flex items-center justify-between">
                      <span className="text-slate-600">Availability:</span>
                      <span className={astrologer.isOnline ? "text-emerald-700 font-bold" : "text-slate-700 font-semibold"}>
                        {astrologer.nextAvailableText}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Section: Fee & Booking Action */}
                <div className="p-5 sm:p-6 pt-3 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Consultation Fee
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-lg font-extrabold text-emerald-800">
                          ₹{astrologer.discountedFee.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          ₹{astrologer.baseFee.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="text-[10px] font-semibold text-amber-800">
                        20% off with advance booking
                      </div>
                    </div>

                    <button
                      type="button"
                      id={`view-profile-btn-${astrologer.id}`}
                      onClick={() => setSelectedProfileAstrologer(astrologer)}
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline cursor-pointer p-1"
                    >
                      View Profile
                    </button>
                  </div>

                  {/* Primary CTA Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      id={`book-session-btn-${astrologer.id}`}
                      onClick={() => onSelectAstrologer(astrologer)}
                      className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs ${
                        isChief
                          ? "bg-amber-800 hover:bg-amber-900 text-white shadow-amber-900/20"
                          : "bg-slate-900 hover:bg-slate-800 text-white"
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Session</span>
                    </button>

                    <button
                      type="button"
                      id={`ask-quick-btn-${astrologer.id}`}
                      onClick={() => onAskQuickQuestion && onAskQuickQuestion(astrologer)}
                      className="w-full py-2.5 px-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1 bg-white hover:bg-amber-50 text-amber-900 border border-amber-300"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-700" />
                      <span>Quick Q</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-3xl bg-slate-50 border border-dashed border-slate-300 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-800 shadow-xs">
            <SlidersHorizontal className="w-8 h-8 text-amber-700" />
          </div>
          <div className="space-y-1.5 max-w-md mx-auto">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              No astrologers match your current filters
            </h3>
            <p className="text-xs text-slate-600">
              Try adjusting your fee limits, choosing "All Specialties", or clearing search keywords to view available Vedic practitioners.
            </p>
          </div>
          <button
            type="button"
            id="empty-reset-filters-btn"
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-2 shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* FULL ASTROLOGER CREDENTIAL MODAL */}
      {selectedProfileAstrologer && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-900 border-2 border-amber-400/40 shadow-xs flex items-center justify-center shrink-0">
                  {selectedProfileAstrologer.avatarUrl ? (
                    <img
                      src={resolveImageUrl(selectedProfileAstrologer.avatarUrl)}
                      alt={selectedProfileAstrologer.name}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <User className="w-8 h-8 text-amber-300/60" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-serif text-xl font-bold text-slate-900">
                      {selectedProfileAstrologer.name}
                    </h3>
                    <CheckCircle2 className="w-5 h-5 text-amber-600" />
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    {selectedProfileAstrologer.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs pt-1">
                    <span className="flex items-center gap-1 text-amber-700 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{selectedProfileAstrologer.rating.toFixed(2)}</span>
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-600">
                      {selectedProfileAstrologer.experienceYears}+ years experience
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProfileAstrologer(null)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Bio */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Professional Bio &amp; Lineage
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {selectedProfileAstrologer.bio}
              </p>
            </div>

            {/* Core Competencies & Skills */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Accreditations &amp; Specializations
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProfileAstrologer.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-300/80 text-amber-900 text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Consultation Details & Pricing */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                  Standard 1-on-1 Session ({selectedProfileAstrologer.durationMinutes} mins)
                </span>
                <div className="flex items-baseline gap-2 pt-0.5">
                  <span className="font-mono text-xl font-extrabold text-emerald-800">
                    ₹{selectedProfileAstrologer.discountedFee.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    ₹{selectedProfileAstrologer.baseFee.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full">
                    20% Advance Discount
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const target = selectedProfileAstrologer;
                  setSelectedProfileAstrologer(null);
                  onSelectAstrologer(target);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <Calendar className="w-4 h-4" />
                <span>Book With {selectedProfileAstrologer.name.split(" ")[0]}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
