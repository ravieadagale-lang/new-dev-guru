import React, { useState } from "react";
import { Product } from "../types";
import { 
  X, 
  Trash2, 
  Heart, 
  ShoppingCart, 
  Star, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Flame, 
  AlertCircle,
  Check,
  Compass,
  Gem,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { resolveImageUrl } from "../utils/imageResolver";
import { getProductBadgeInfo } from "../utils/productBadgeUtils";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onRemoveItem: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onClearWishlist: () => void;
  onNavigateToMarketplace?: () => void;
}

interface FlyingItem {
  id: string;
  startX: number;
  startY: number;
  imageUrl: string;
  name: string;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveItem,
  onAddToCart,
  onClearWishlist,
  onNavigateToMarketplace,
}) => {
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);
  const [movedItemIds, setMovedItemIds] = useState<string[]>([]);
  const [isMovingAll, setIsMovingAll] = useState(false);

  if (!isOpen) return null;

  const handleMoveSingleToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: Product
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const flyingId = `${item.id}-${Date.now()}`;

    // Add flying animation instance
    setFlyingItems((prev) => [
      ...prev,
      {
        id: flyingId,
        startX: rect.left + rect.width / 2,
        startY: rect.top + rect.height / 2,
        imageUrl: item.imageUrl,
        name: item.name,
      },
    ]);

    // Track moved state on button for micro-interaction feedback
    setMovedItemIds((prev) => [...prev, item.id]);
    setTimeout(() => {
      setMovedItemIds((prev) => prev.filter((id) => id !== item.id));
    }, 1200);

    // Call actual add to cart handler
    onAddToCart(item);

    // Clean up flying item after animation completes
    setTimeout(() => {
      setFlyingItems((prev) => prev.filter((f) => f.id !== flyingId));
    }, 900);
  };

  const handleMoveAllToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (wishlistItems.length === 0) return;
    setIsMovingAll(true);

    const rect = e.currentTarget.getBoundingClientRect();

    // Trigger stagger flying tokens for each item
    wishlistItems.forEach((item, index) => {
      setTimeout(() => {
        const flyingId = `all-${item.id}-${Date.now()}-${index}`;
        setFlyingItems((prev) => [
          ...prev,
          {
            id: flyingId,
            startX: rect.left + (index * 25) % 150,
            startY: rect.top - index * 10,
            imageUrl: item.imageUrl,
            name: item.name,
          },
        ]);
        onAddToCart(item);

        setTimeout(() => {
          setFlyingItems((prev) => prev.filter((f) => f.id !== flyingId));
        }, 900);
      }, index * 120);
    });

    setTimeout(() => {
      setIsMovingAll(false);
      onClose();
    }, wishlistItems.length * 120 + 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex justify-end">
      {/* Flying Item Ghost Animation Overlay */}
      <AnimatePresence>
        {flyingItems.map((flying) => (
          <motion.div
            key={flying.id}
            initial={{
              position: "fixed",
              left: flying.startX,
              top: flying.startY,
              x: "-50%",
              y: "-50%",
              scale: 1,
              opacity: 1,
              zIndex: 9999,
              rotate: 0,
            }}
            animate={{
              left: window.innerWidth - 65,
              top: 32,
              scale: [1, 1.25, 0.4],
              opacity: [1, 0.95, 0],
              rotate: [0, -15, 25],
            }}
            transition={{
              duration: 0.8,
              type: "tween",
              ease: [0.25, 1, 0.5, 1], // natural cubic-bezier curve towards cart
            }}
            className="pointer-events-none fixed flex items-center justify-center"
          >
            <div className="relative p-1 rounded-2xl bg-amber-500 shadow-2xl shadow-amber-500/60 ring-2 ring-amber-300">
              <div className="w-11 h-11 rounded-xl overflow-hidden bg-slate-900 border border-white/40">
                <img
                  src={resolveImageUrl(flying.imageUrl)}
                  alt={flying.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-2 -right-2 bg-slate-950 text-amber-400 p-1 rounded-full border border-amber-400 shadow-md">
                <ShoppingCart className="w-3 h-3" />
              </div>
              <div className="absolute -bottom-1 -left-1 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full shadow-xs">
                +1
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="bg-[#FAF8F5] w-full max-w-md h-full p-6 flex flex-col justify-between shadow-2xl border-l border-amber-900/20 animate-in slide-in-from-right duration-300">
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-amber-900/10 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-2xl bg-red-100 text-red-600 border border-red-200 shadow-xs">
                <Heart className="w-5 h-5 fill-red-600" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                  My Wishlist
                  {wishlistItems.length > 0 && (
                    <span className="bg-red-600 text-white text-xs font-sans font-bold px-2 py-0.5 rounded-full shadow-xs">
                      {wishlistItems.length}
                    </span>
                  )}
                </h2>
                <p className="text-[11px] text-slate-500">Saved items for future spiritual purchases</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {wishlistItems.length > 0 && (
                <button
                  id="btn-clear-wishlist-header"
                  onClick={onClearWishlist}
                  className="text-xs text-slate-500 hover:text-red-600 underline font-medium cursor-pointer"
                >
                  Clear
                </button>
              )}
              <button
                id="btn-close-wishlist-drawer"
                onClick={onClose}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 hover:bg-amber-100/50 transition-colors cursor-pointer"
                aria-label="Close Wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body List */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1 no-scrollbar">
            {wishlistItems.length === 0 ? (
              <div id="wishlist-empty-state" className="flex flex-col items-center justify-center text-center py-8 px-4 h-full">
                {/* Visual Artwork & Sacred Geometry Accent */}
                <div className="relative mb-6 flex items-center justify-center">
                  {/* Outer Pulsing Aura */}
                  <div className="absolute w-32 h-32 rounded-full bg-gradient-to-tr from-amber-400/20 via-red-500/15 to-purple-500/20 blur-xl animate-pulse" />
                  
                  {/* Decorative Sacred Ring */}
                  <div className="w-24 h-24 rounded-full border border-dashed border-amber-900/20 flex items-center justify-center p-2 bg-gradient-to-b from-amber-50/80 to-red-50/50 shadow-inner">
                    <div className="w-18 h-18 rounded-full bg-white border border-amber-200/80 shadow-md flex items-center justify-center relative">
                      <Heart className="w-9 h-9 text-red-500 fill-red-500/20" strokeWidth={1.75} />
                      <div className="absolute -top-1 -right-1 p-1 bg-amber-500 text-slate-950 rounded-full shadow-xs">
                        <Sparkles className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Typography Header & Subtitle */}
                <div className="space-y-2 max-w-xs mb-6">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-800 bg-amber-100/70 border border-amber-300/60 px-2.5 py-0.5 rounded-full">
                    Sacred Collection
                  </span>
                  <h3 className="font-serif font-bold text-xl text-slate-900 leading-tight">
                    Your Wishlist is Waiting
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Save lab-certified gemstones, energized yantras, authentic rudrakshas, and custom Vedic reports to curate your personal spiritual sanctuary.
                  </p>
                </div>

                {/* Primary Discover Products CTA Button */}
                <button
                  id="btn-wishlist-discover-products"
                  onClick={() => {
                    onClose();
                    onNavigateToMarketplace?.();
                  }}
                  className="w-full max-w-xs py-3.5 px-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-amber-300 font-bold text-xs hover:from-slate-800 hover:to-slate-700 hover:text-amber-200 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5 border border-amber-500/30 group cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
                  <span className="tracking-wide">Discover Products</span>
                  <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Recommended Quick Categories */}
                <div className="mt-7 w-full max-w-xs pt-5 border-t border-amber-900/10">
                  <p className="text-[11px] font-semibold text-slate-500 mb-3 uppercase tracking-wider">
                    Popular Spiritual Remedies
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      id="btn-quick-cat-gemstones"
                      onClick={() => {
                        onClose();
                        onNavigateToMarketplace?.();
                      }}
                      className="p-2 rounded-xl bg-white hover:bg-amber-50/80 border border-amber-900/10 hover:border-amber-400 text-left transition-all flex items-center gap-2 group cursor-pointer shadow-xs"
                    >
                      <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800 shrink-0">
                        <Gem className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold text-slate-800 truncate">Gemstones</div>
                        <div className="text-[9px] text-slate-500">100% Certified</div>
                      </div>
                    </button>

                    <button
                      id="btn-quick-cat-rudraksha"
                      onClick={() => {
                        onClose();
                        onNavigateToMarketplace?.();
                      }}
                      className="p-2 rounded-xl bg-white hover:bg-amber-50/80 border border-amber-900/10 hover:border-amber-400 text-left transition-all flex items-center gap-2 group cursor-pointer shadow-xs"
                    >
                      <div className="p-1.5 rounded-lg bg-orange-100 text-orange-800 shrink-0">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold text-slate-800 truncate">Rudraksha</div>
                        <div className="text-[9px] text-slate-500">Consecrated</div>
                      </div>
                    </button>

                    <button
                      id="btn-quick-cat-yantras"
                      onClick={() => {
                        onClose();
                        onNavigateToMarketplace?.();
                      }}
                      className="p-2 rounded-xl bg-white hover:bg-amber-50/80 border border-amber-900/10 hover:border-amber-400 text-left transition-all flex items-center gap-2 group cursor-pointer shadow-xs"
                    >
                      <div className="p-1.5 rounded-lg bg-yellow-100 text-yellow-800 shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold text-slate-800 truncate">Yantras</div>
                        <div className="text-[9px] text-slate-500">Energized</div>
                      </div>
                    </button>

                    <button
                      id="btn-quick-cat-reports"
                      onClick={() => {
                        onClose();
                        onNavigateToMarketplace?.();
                      }}
                      className="p-2 rounded-xl bg-white hover:bg-amber-50/80 border border-amber-900/10 hover:border-amber-400 text-left transition-all flex items-center gap-2 group cursor-pointer shadow-xs"
                    >
                      <div className="p-1.5 rounded-lg bg-purple-100 text-purple-800 shrink-0">
                        <BookOpen className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold text-slate-800 truncate">Reports</div>
                        <div className="text-[9px] text-slate-500">100+ Pages</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Vedic Guarantee Badge */}
                <div className="mt-5 flex items-center gap-1.5 text-[10px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Lab Tested • Vedic Consecration • Free Shipping</span>
                </div>
              </div>
            ) : (
              wishlistItems.map((item) => {
                const isMoved = movedItemIds.includes(item.id);
                const hasLowStock = item.stockCount !== undefined && item.stockCount <= 5;

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-3.5 border border-amber-900/10 shadow-xs flex flex-col gap-2.5 group hover:border-amber-500/30 transition-all"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0 relative">
                          <img
                            src={resolveImageUrl(item.imageUrl)}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {item.authenticityCertificate && (() => {
                            const badgeInfo = getProductBadgeInfo(item);
                            const BadgeIcon = badgeInfo.icon;
                            return (
                              <span
                                className={`absolute bottom-1 right-1 p-0.5 rounded-md shadow-xs ${badgeInfo.wishlistClasses}`}
                                title={badgeInfo.label}
                              >
                                <BadgeIcon className="w-3 h-3" />
                              </span>
                            );
                          })()}
                        </div>

                        <div className="min-w-0 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                              {item.category}
                            </span>
                            {(() => {
                              const badgeInfo = getProductBadgeInfo(item);
                              return (
                                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 font-medium truncate max-w-[120px]">
                                  {badgeInfo.label}
                                </span>
                              );
                            })()}
                          </div>

                          <h4 className="font-serif font-bold text-xs text-slate-900 truncate">
                            {item.name}
                          </h4>

                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-serif font-bold text-slate-900">
                              ₹{(item.priceINR ?? item.price ?? 0).toLocaleString()}
                            </span>
                            <span className="text-[11px] text-amber-600 flex items-center gap-0.5">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              {item.rating}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          id={`btn-move-to-cart-${item.id}`}
                          onClick={(e) => handleMoveSingleToCart(e, item)}
                          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs transition-all cursor-pointer relative overflow-hidden ${
                            isMoved
                              ? "bg-emerald-600 text-white ring-2 ring-emerald-400 scale-95"
                              : "bg-slate-900 text-amber-300 hover:bg-slate-800 hover:scale-105 active:scale-95"
                          }`}
                          title="Move to Cart with Flying Animation"
                        >
                          {isMoved ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-white" />
                              <span>Added!</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-3.5 h-3.5" />
                              <span>Move to Cart</span>
                            </>
                          )}
                        </button>

                        <button
                          id={`btn-remove-wishlist-${item.id}`}
                          onClick={() => onRemoveItem(item.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                          title="Remove from Wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Low Stock Alert Badge */}
                    {hasLowStock && (
                      <div className="flex items-center justify-between bg-amber-50/80 border border-amber-200/80 rounded-xl px-2.5 py-1 text-[11px] text-amber-900">
                        <div className="flex items-center gap-1.5 font-medium">
                          {item.stockCount! === 1 ? (
                            <Flame className="w-3.5 h-3.5 text-red-600 fill-red-500 shrink-0 animate-pulse" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          )}
                          <span>
                            {item.stockCount! === 1 ? (
                              <strong className="text-red-700 font-bold">Rare Single Specimen: Only 1 left!</strong>
                            ) : (
                              <>
                                <strong className="text-amber-800 font-bold">Low Stock:</strong> Only {item.stockCount} items left in vault
                              </>
                            )}
                          </span>
                        </div>
                        <span className="text-[10px] text-amber-700 font-semibold bg-amber-200/60 px-1.5 py-0.5 rounded-md">
                          High Demand
                        </span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Actions */}
          {wishlistItems.length > 0 && (
            <div className="pt-4 border-t border-amber-900/10 space-y-2 shrink-0">
              <button
                id="btn-move-all-to-cart"
                disabled={isMovingAll}
                onClick={handleMoveAllToCart}
                className={`w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-2xl text-xs hover:from-amber-400 hover:to-amber-500 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                  isMovingAll ? "opacity-75 scale-98" : ""
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{isMovingAll ? "Transitioning to Cart..." : "Move All Items to Cart"}</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-900" />
              </button>

              <p className="text-[10px] text-center text-slate-500">
                ⭐ All items come with 100% authenticity guarantee & lab certificates.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
