import React, { useState } from "react";
import { Product, UserProfile } from "../types";
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  userProfile?: UserProfile;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems = [],
  onRemoveItem,
  onClearCart,
  userProfile,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      setTimeout(() => {
        onClearCart();
        setCheckoutComplete(false);
        onClose();
      }, 2000);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-slate-900 border-l border-amber-500/20 text-slate-100 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-amber-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-serif font-bold text-amber-100">
                      Sacred Cart ({cartItems.length})
                    </h2>
                    <p className="text-xs text-slate-400">Energized Gemstones, Yantras & Remedies</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {checkoutComplete ? (
                  <div className="text-center py-16 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-emerald-300">
                      Order Successfully Placed!
                    </h3>
                    <p className="text-sm text-slate-400">
                      Vedic energization ritual commenced for {userProfile?.name || "Seeker"}.
                    </p>
                  </div>
                ) : cartItems.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
                    <h3 className="text-base font-semibold text-slate-300">Your cart is empty</h3>
                    <p className="text-xs text-slate-500">
                      Explore our consecrated Vedic marketplace to add remedies.
                    </p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg bg-slate-950 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-slate-200 truncate">
                          {item.name}
                        </h4>
                        <div className="text-xs text-amber-400 font-medium">₹{item.price?.toLocaleString("en-IN")}</div>
                        {item.authenticityCertificate && (
                          <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                            <ShieldCheck className="w-3 h-3" />
                            <span>{typeof item.authenticityCertificate === "string" ? item.authenticityCertificate : (item.badgeLabel || "Certified Authentic")}</span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-700/60 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && !checkoutComplete && (
                <div className="p-6 border-t border-amber-500/20 bg-slate-900/80 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Total Investment:</span>
                    <span className="text-xl font-bold text-amber-300">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={onClearCart}
                      className="px-3 py-2.5 text-xs text-slate-400 hover:text-rose-400 rounded-xl border border-slate-700 hover:bg-slate-800"
                    >
                      Clear
                    </button>
                    <button
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                      className="flex-1 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 text-sm disabled:opacity-50"
                    >
                      {isCheckingOut ? (
                        <span>Processing Sacred Order...</span>
                      ) : (
                        <>
                          <span>Proceed to Checkout</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
