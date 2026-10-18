import React, { useState } from "react";
import { UserProfile, Product } from "../types";
import { MARKETPLACE_PRODUCTS } from "../data/marketplaceData";
import { getProductBadgeInfo } from "../utils/productBadgeUtils";
import {
  ShoppingBag,
  Search,
  Star,
  ShieldCheck,
  Sparkles,
  Check,
  Heart,
  Eye,
  X,
  Award,
  Zap,
  Coins,
  BookOpen,
  Flame,
  FileText
} from "lucide-react";

interface MarketplaceViewProps {
  onAddToCart: (product: Product) => void;
  userProfile: UserProfile;
  onNavigateTab: (tab: string) => void;
  wishlistItems: Product[];
  onToggleWishlist: (product: Product) => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  onAddToCart,
  userProfile,
  onNavigateTab,
  wishlistItems = [],
  onToggleWishlist
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const spiritualPoints = userProfile?.spiritualPoints ?? 450;
  const categories = ["All", "eBooks", "Gemstones", "Rudraksha", "Yantra", "Reports"];

  const filteredProducts = MARKETPLACE_PRODUCTS.filter((product) => {
    const matchesCat =
      selectedCategory === "All" ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    setAddedIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== product.id));
    }, 1500);
  };

  const isWishlisted = (productId: string) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  return (
    <div className="space-y-8 py-4 animate-in fade-in duration-300">
      {/* 1. MASTER BANNER */}
      <div className="bg-gradient-to-r from-amber-900 via-slate-900 to-amber-950 text-amber-100 p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Free Access for All Users</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-amber-200">
            All AI Vedic Services &amp; Kundli Reports are Free!
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed font-sans">
            Every Kundli reading, match compatibility, tarot spread, and AI astrologer consultation is 100% complimentary on Dev-Guru. Browse certified sacred spiritual artifacts, energized gems, and authentic Lab-Certified Rudrakshas below.
          </p>
        </div>

        {/* Spiritual Points Balance Card */}
        <div className="bg-black/40 border border-amber-500/30 p-4 rounded-2xl flex items-center gap-4 shrink-0 shadow-inner">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-amber-300/80 tracking-wider">
              Your Spiritual Karma Points
            </div>
            <div className="font-serif text-2xl font-bold text-amber-200">
              {spiritualPoints} Points
            </div>
            <div className="text-[11px] text-amber-400/90 font-medium">
              = ₹{spiritualPoints} Instant Discount
            </div>
          </div>
        </div>
      </div>

      {/* 2. SEARCH & FILTER CONTROLS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-amber-900/10 shadow-xs">
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search gemstones, malas, yantras..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-amber-300 font-bold shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const isAdded = addedIds.includes(product.id);
          const wishlisted = isWishlisted(product.id);
          const badgeInfo = getProductBadgeInfo(product);
          const BadgeIcon = badgeInfo.icon;

          return (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-amber-900/10 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-52 bg-slate-900 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />

                  {product.authenticityCertificate && (
                    <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1.5 shadow-sm ${badgeInfo.badgeClasses}`}>
                      <BadgeIcon className="w-3 h-3 shrink-0" />
                      <span>{badgeInfo.label}</span>
                    </span>
                  )}

                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-all cursor-pointer ${
                      wishlisted
                        ? "bg-rose-500 text-white shadow-md"
                        : "bg-black/40 text-white/80 hover:text-white"
                    }`}
                    title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
                  </button>

                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 hover:bg-black/80 text-white text-xs font-medium backdrop-blur-xs flex items-center gap-1 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                  >
                    <Eye className="w-3.5 h-3.5" /> Quick View
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-amber-800 font-bold uppercase tracking-wider text-[10px]">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold text-slate-900">{product.rating}</span>
                      <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-amber-900 transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {product.shortDesc}
                  </p>
                </div>
              </div>

              {/* Price & Action */}
              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                    {badgeInfo.subLabel}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <strong className="text-base font-bold text-slate-900">
                      ₹{(product.priceINR ?? product.price ?? 0).toLocaleString()}
                    </strong>
                    <span className="text-xs text-slate-400">(${product.priceUSD ?? 0})</span>
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                    isAdded
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-900 hover:bg-slate-800 text-amber-300"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* QUICK VIEW MODAL */}
      {selectedProduct && (() => {
        const modalBadge = getProductBadgeInfo(selectedProduct);
        const ModalBadgeIcon = modalBadge.icon;

        return (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative animate-in zoom-in-95">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 cursor-pointer shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64 md:h-full bg-slate-900 relative">
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {selectedProduct.authenticityCertificate && (
                    <span className={`absolute bottom-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md ${modalBadge.modalClasses}`}>
                      <ModalBadgeIcon className="w-3.5 h-3.5 shrink-0" />
                      <span>{modalBadge.quickViewLabel}</span>
                    </span>
                  )}
                </div>

              <div className="p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-amber-800 font-bold uppercase tracking-wider text-[10px]">
                      {selectedProduct.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold text-slate-900">{selectedProduct.rating}</span>
                      <span className="text-slate-400 text-[10px]">({selectedProduct.reviewsCount} reviews)</span>
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-slate-900">
                    {selectedProduct.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedProduct.fullDesc || selectedProduct.shortDesc}
                  </p>

                  {selectedProduct.benefits && (
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                        Key Astrological Benefits:
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {selectedProduct.benefits.map((b, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Price</span>
                    <strong className="text-xl font-bold text-slate-900">
                      ₹{(selectedProduct.priceINR ?? selectedProduct.price ?? 0).toLocaleString()}
                    </strong>
                  </div>

                  <button
                    onClick={() => {
                      handleAddToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })()}
    </div>
  );
};
