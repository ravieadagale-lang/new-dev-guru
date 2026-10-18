import React, { useEffect } from "react";
import { Product } from "../types";
import { Heart, X, ArrowRight, RotateCcw } from "lucide-react";
import { resolveImageUrl } from "../utils/imageResolver";

export interface WishlistToastData {
  id: string;
  product: Product;
  action: "added" | "removed";
}

interface WishlistToastProps {
  toasts: WishlistToastData[];
  onDismiss: (id: string) => void;
  onOpenWishlist: () => void;
  onUndoRemove?: (product: Product) => void;
}

export const WishlistToast: React.FC<WishlistToastProps> = ({
  toasts,
  onDismiss,
  onOpenWishlist,
  onUndoRemove,
}) => {
  if (toasts.length === 0) return null;

  return (
    <div
      id="wishlist-toast-container"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={() => onDismiss(toast.id)}
          onOpenWishlist={onOpenWishlist}
          onUndoRemove={onUndoRemove}
        />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: WishlistToastData;
  onDismiss: () => void;
  onOpenWishlist: () => void;
  onUndoRemove?: (product: Product) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({
  toast,
  onDismiss,
  onOpenWishlist,
  onUndoRemove,
}) => {
  const isAdded = toast.action === "added";

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      id={`wishlist-toast-${toast.id}`}
      className={`pointer-events-auto w-full bg-[#181622] text-slate-100 rounded-2xl p-3.5 shadow-2xl border ${
        isAdded ? "border-red-500/40" : "border-slate-700/50"
      } backdrop-blur-md flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 transition-all`}
    >
      {/* Product Image & Status */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 shrink-0 relative border border-white/10">
          <img
            src={resolveImageUrl(toast.product.imageUrl)}
            alt={toast.product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute bottom-0 right-0 p-1 rounded-tl-md ${
              isAdded ? "bg-red-600 text-white" : "bg-slate-700 text-slate-300"
            }`}
          >
            <Heart
              className={`w-2.5 h-2.5 ${isAdded ? "fill-white" : ""}`}
            />
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm ${
                isAdded
                  ? "bg-red-950/80 text-red-300 border border-red-500/30"
                  : "bg-slate-800 text-slate-400 border border-slate-700"
              }`}
            >
              {isAdded ? "Added to Wishlist" : "Removed from Wishlist"}
            </span>
          </div>

          <h4 className="font-serif font-bold text-xs text-white truncate max-w-[170px] sm:max-w-[190px] mt-0.5">
            {toast.product.name}
          </h4>

          <div className="text-[11px] text-amber-400 font-serif">
            ₹{(toast.product.priceINR ?? toast.product.price ?? 0).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        {isAdded ? (
          <button
            id={`btn-view-wishlist-${toast.id}`}
            onClick={() => {
              onDismiss();
              onOpenWishlist();
            }}
            className="px-2.5 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        ) : (
          onUndoRemove && (
            <button
              id={`btn-undo-wishlist-${toast.id}`}
              onClick={() => {
                onUndoRemove(toast.product);
                onDismiss();
              }}
              className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Undo</span>
            </button>
          )
        )}

        <button
          id={`btn-close-toast-${toast.id}`}
          onClick={onDismiss}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
