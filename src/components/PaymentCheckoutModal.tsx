import React, { useState, useEffect } from "react";
import { Product, UserProfile } from "../types";
import { 
  X, 
  CreditCard, 
  QrCode, 
  Building, 
  CheckCircle2, 
  Download, 
  Truck, 
  Lock, 
  Sparkles,
  ArrowRight,
  BookOpen,
  FileText,
  Tag,
  Check,
  Percent,
  Receipt
} from "lucide-react";

interface PaymentCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  onPaymentSuccess: () => void;
  appliedDiscountCode?: string | null;
  discountAmount?: number;
  useDirectPoints?: boolean;
  directPointsDiscount?: number;
  pointsSpent?: number;
  userPoints?: number;
  finalTotal?: number;
  rawTotal?: number;
  userProfile?: UserProfile;
  onUpdateProfile?: (updated: UserProfile) => void;
}

export const PaymentCheckoutModal: React.FC<PaymentCheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onPaymentSuccess,
  appliedDiscountCode = null,
  discountAmount = 0,
  useDirectPoints = false,
  directPointsDiscount = 0,
  pointsSpent = 0,
  userPoints = 450,
  finalTotal: initialFinalTotal,
  rawTotal: initialRawTotal,
  userProfile,
  onUpdateProfile,
}) => {
  const [step, setStep] = useState<"details" | "payment" | "success">("details");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [customerName, setCustomerName] = useState("Aarav Sharma");
  const [customerEmail, setCustomerEmail] = useState("aarav.sharma@example.com");
  const [customerPhone, setCustomerPhone] = useState("+91 98765 43210");
  const [shippingAddress, setShippingAddress] = useState("102 Cosmic Heights, MG Road, Bengaluru, Karnataka - 560001");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderResult, setOrderResult] = useState<any>(null);

  // Local discount & points states for interactive manipulation in checkout
  const [activeCoupon, setActiveCoupon] = useState<string | null>(appliedDiscountCode);
  const [activeDiscountAmount, setActiveDiscountAmount] = useState<number>(discountAmount);
  const [activeUsePoints, setActiveUsePoints] = useState<boolean>(useDirectPoints);
  const [activePointsDiscount, setActivePointsDiscount] = useState<number>(directPointsDiscount);
  const [couponInput, setCouponInput] = useState<string>("");
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);

  // Synchronize when incoming props update
  useEffect(() => {
    setActiveCoupon(appliedDiscountCode);
    setActiveDiscountAmount(discountAmount);
  }, [appliedDiscountCode, discountAmount]);

  useEffect(() => {
    setActiveUsePoints(useDirectPoints);
    setActivePointsDiscount(directPointsDiscount);
  }, [useDirectPoints, directPointsDiscount]);

  if (!isOpen) return null;

  const currentPoints = userProfile?.spiritualPoints ?? userPoints;
  const computedRawTotal = cartItems.reduce((sum, item) => sum + item.priceINR, 0);

  // Recalculate dynamic concessions
  const effectivePointsDiscount = activeUsePoints 
    ? Math.min(Math.round(currentPoints * 0.5), computedRawTotal) 
    : 0;
  const effectivePointsSpent = activeUsePoints ? Math.round(effectivePointsDiscount * 2) : 0;
  
  const totalConcession = Math.min(
    computedRawTotal, 
    activeDiscountAmount + effectivePointsDiscount
  );
  
  // Total payable with all concessions deducted
  const finalPayable = Math.max(0, computedRawTotal - totalConcession);

  // Concession proportion per item so each product displays its discounted price
  const discountRatio = computedRawTotal > 0 ? (computedRawTotal - totalConcession) / computedRawTotal : 1;

  const hasPhysicalItems = cartItems.some(
    (item) => item.category === "Gemstones" || item.category === "Rudraksha" || item.category === "Yantra" || item.category === "Puja Items"
  );
  const hasDigitalItems = cartItems.some(
    (item) => item.category === "eBooks" || item.category === "Reports" || item.name.toLowerCase().includes("report")
  );

  const handleApplyCheckoutCoupon = (codeToApply?: string) => {
    setCouponFeedback(null);
    const code = (codeToApply || couponInput).trim().toUpperCase();
    if (!code) return;

    if (code === "DESTINY10") {
      const calc = Math.round(computedRawTotal * 0.1);
      setActiveDiscountAmount(calc);
      setActiveCoupon("DESTINY10 (10% OFF)");
      setCouponFeedback("DESTINY10 applied! 10% discount subtracted.");
      setCouponInput("");
      return;
    }

    if (code.startsWith("SPIRIT")) {
      const matchNum = code.match(/\d+/);
      const val = matchNum ? parseInt(matchNum[0], 10) : 100;
      setActiveDiscountAmount(val);
      setActiveCoupon(`${code} (₹${val} OFF)`);
      setCouponFeedback(`${code} applied! ₹${val} concession deducted.`);
      setCouponInput("");
      return;
    }

    const matchingVoucher = userProfile?.redeemedVouchers?.find(
      (v) => v.code.toUpperCase() === code && !v.isUsed
    );
    if (matchingVoucher) {
      setActiveDiscountAmount(matchingVoucher.discountAmountINR);
      setActiveCoupon(`${matchingVoucher.code} (₹${matchingVoucher.discountAmountINR} OFF)`);
      setCouponFeedback(`Voucher ${matchingVoucher.code} applied! ₹${matchingVoucher.discountAmountINR} deducted.`);
      setCouponInput("");
      return;
    }

    setCouponFeedback("Invalid code. Try DESTINY10, SPIRIT150, or SPIRIT350!");
  };

  const handleRemoveCoupon = () => {
    setActiveCoupon(null);
    setActiveDiscountAmount(0);
    setCouponFeedback("Coupon removed.");
  };

  const handleTogglePoints = () => {
    if (activeUsePoints) {
      setActiveUsePoints(false);
      setActivePointsDiscount(0);
    } else {
      setActiveUsePoints(true);
      const ptsDiscount = Math.min(Math.round(currentPoints * 0.5), computedRawTotal);
      setActivePointsDiscount(ptsDiscount);
    }
  };

  const handleStartPayment = async () => {
    setIsProcessing(true);
    try {
      // 1. Call server endpoint to create order payload with discount & points concessions
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          customer: { name: customerName, email: customerEmail, phone: customerPhone },
          currency: "INR",
          discountAmount: activeDiscountAmount,
          pointsDiscount: effectivePointsDiscount,
          totalConcessions: totalConcession,
          appliedCoupon: activeCoupon,
          pointsSpent: effectivePointsSpent,
          finalAmount: finalPayable,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData?.error || "Failed to initiate payment");
      }

      // 2. Simulate authorization / gateway verification call with discounted totals
      setTimeout(async () => {
        const verifyRes = await fetch("/api/payment/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: orderData.orderId,
            paymentId: `PAY_RZP_${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
            paymentMethod: paymentMethod === "upi" ? "Razorpay UPI / QR Code" : paymentMethod === "card" ? "Debit/Credit Card" : "Netbanking",
            items: cartItems,
            subtotal: computedRawTotal,
            discountAmount: activeDiscountAmount,
            pointsDiscount: effectivePointsDiscount,
            totalConcessions: totalConcession,
            totalAmount: finalPayable,
            appliedCoupon: activeCoupon,
            pointsSpent: effectivePointsSpent,
          }),
        });

        const verifyData = await verifyRes.json();
        setIsProcessing(false);
        setOrderResult({
          ...verifyData,
          subtotal: computedRawTotal,
          discountAmount: activeDiscountAmount,
          pointsDiscount: effectivePointsDiscount,
          totalConcessions: totalConcession,
          totalAmount: finalPayable,
          appliedCoupon: activeCoupon,
          pointsSpent: effectivePointsSpent,
        });

        // Deduct points from profile if applied
        if (activeUsePoints && effectivePointsSpent > 0 && userProfile && onUpdateProfile) {
          const remaining = Math.max(0, currentPoints - effectivePointsSpent);
          onUpdateProfile({
            ...userProfile,
            spiritualPoints: remaining,
          });
        }

        setStep("success");
        onPaymentSuccess();
      }, 1200);
    } catch (err: any) {
      setIsProcessing(false);
      alert(err.message || "Payment authorization failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#1A1613] text-amber-100 w-full max-w-xl rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-[#261E18] to-[#1F1914] border-b border-amber-500/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/20 rounded-xl border border-amber-500/30 text-amber-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-amber-200">
                {step === "success" ? "Order Confirmed & Sacred Receipt" : "Authorized Payment Checkout"}
              </h2>
              <p className="text-[11px] text-amber-200/60">
                100% Encrypted & Bank Grade SSL Security • Discounts & Concessions Applied
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-amber-950/50 hover:bg-amber-900/60 text-amber-200/70 hover:text-amber-100 border border-amber-500/20 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {step === "details" && (
            <div className="space-y-5">
              {/* Items Summary Preview with Discounted Prices & Concessions */}
              <div className="bg-[#241D17] p-4 rounded-2xl border border-amber-500/20 space-y-3">
                <div className="flex justify-between items-center text-xs text-amber-300 font-bold uppercase tracking-wider">
                  <span>Order Items ({cartItems.length})</span>
                  <div className="flex items-center gap-2">
                    {totalConcession > 0 && (
                      <span className="line-through text-amber-200/40 text-[11px] font-normal">
                        ₹{computedRawTotal.toLocaleString()}
                      </span>
                    )}
                    <span className="text-emerald-400 font-bold text-sm">
                      ₹{finalPayable.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 max-h-36 overflow-y-auto no-scrollbar pr-1 divide-y divide-amber-500/10">
                  {cartItems.map((item, idx) => {
                    const discountedItemPrice = Math.round(item.priceINR * discountRatio);
                    const itemSavings = item.priceINR - discountedItemPrice;

                    return (
                      <div key={`${item.id}-${idx}`} className="flex justify-between items-center text-xs pt-2 first:pt-0">
                        <div className="flex items-center gap-2 truncate pr-2">
                          {item.category === "eBooks" ? (
                            <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          ) : item.category === "Reports" ? (
                            <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          ) : (
                            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          )}
                          <div className="truncate">
                            <span className="truncate text-amber-100 font-medium block">{item.name}</span>
                            {totalConcession > 0 && itemSavings > 0 && (
                              <span className="text-[10px] text-emerald-400 font-semibold inline-block">
                                Concession applied (-₹{itemSavings.toLocaleString()})
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Product price with concession */}
                        <div className="text-right shrink-0">
                          {totalConcession > 0 ? (
                            <div className="flex flex-col items-end">
                              <span className="font-bold text-emerald-400 text-xs">
                                ₹{(discountedItemPrice ?? 0).toLocaleString()}
                              </span>
                              <span className="line-through text-amber-200/40 text-[10px]">
                                ₹{(item.priceINR ?? item.price ?? 0).toLocaleString()}
                              </span>
                            </div>
                          ) : (
                            <span className="font-bold text-amber-300">₹{(item.priceINR ?? item.price ?? 0).toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Concession & Discount Manager in Checkout */}
              <div className="bg-[#201A15] p-3.5 rounded-2xl border border-amber-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-amber-200 text-xs font-bold uppercase tracking-wider">
                    <Tag className="w-3.5 h-3.5 text-amber-400" />
                    <span>Concessions & Points Applied</span>
                  </div>
                  {totalConcession > 0 && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold">
                      Saved ₹{totalConcession.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Points Concession Toggle */}
                {currentPoints > 0 && (
                  <div className="flex items-center justify-between bg-[#15110E] p-2.5 rounded-xl border border-amber-500/15">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                      <div className="text-xs">
                        <div className="text-amber-100 font-medium">
                          Spiritual Points ({currentPoints} PTS)
                        </div>
                        <div className="text-[10px] text-amber-200/60">
                          Redeem 200 PTS = ₹100 discount concession
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleTogglePoints}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        activeUsePoints
                          ? "bg-amber-500 text-slate-950 shadow-xs"
                          : "bg-[#251E18] text-amber-200/80 border border-amber-500/25 hover:bg-amber-900/30"
                      }`}
                    >
                      {activeUsePoints ? "Applied ✓" : "Apply Points"}
                    </button>
                  </div>
                )}

                {/* Applied Coupon / Voucher status */}
                {activeCoupon && activeDiscountAmount > 0 ? (
                  <div className="flex items-center justify-between bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/30 text-xs">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <div className="text-emerald-200 font-bold">{activeCoupon}</div>
                        <div className="text-[10px] text-emerald-300/80">
                          ₹{activeDiscountAmount.toLocaleString()} discount concession applied
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-[11px] text-rose-400 hover:text-rose-300 font-semibold px-2 py-1 bg-rose-950/40 rounded-lg border border-rose-500/20 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Coupon code (e.g. DESTINY10)"
                        className="flex-1 bg-[#15110E] border border-amber-500/20 rounded-xl px-3 py-1.5 text-xs text-amber-100 uppercase font-semibold focus:outline-none focus:border-amber-400"
                      />
                      <button
                        type="button"
                        onClick={() => handleApplyCheckoutCoupon()}
                        className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-200 text-xs font-bold rounded-xl cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>

                    {/* Quick coupon chips */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-amber-200/50">Quick codes:</span>
                      {["DESTINY10", "SPIRIT150", "SPIRIT350"].map((code) => (
                        <button
                          key={code}
                          type="button"
                          onClick={() => handleApplyCheckoutCoupon(code)}
                          className="text-[10px] bg-[#17130F] hover:bg-amber-950/60 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded-md cursor-pointer transition-colors"
                        >
                          +{code}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {couponFeedback && (
                  <p className="text-[11px] text-amber-300 font-medium">{couponFeedback}</p>
                )}
              </div>

              {/* Customer Contact Details */}
              <div className="space-y-3 text-xs">
                <h3 className="font-bold text-amber-200 uppercase tracking-wider text-[11px]">
                  Customer Details & Delivery Contact
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-amber-200/70 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#13100D] border border-amber-500/25 rounded-xl p-2.5 text-amber-100 font-medium focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-amber-200/70 mb-1">Email (for Digital eBooks / Reports)</label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-[#13100D] border border-amber-500/25 rounded-xl p-2.5 text-amber-100 font-medium focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-amber-200/70 mb-1">Mobile Number (WhatsApp Updates)</label>
                    <input
                      type="text"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-[#13100D] border border-amber-500/25 rounded-xl p-2.5 text-amber-100 font-medium focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  {hasPhysicalItems && (
                    <div className="sm:col-span-2">
                      <label className="block text-amber-200/70 mb-1">Shipping Address (for Consecrated Dispatch)</label>
                      <textarea
                        rows={2}
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="w-full bg-[#13100D] border border-amber-500/25 rounded-xl p-2.5 text-amber-100 font-medium focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3">
                <h3 className="font-bold text-amber-200 uppercase tracking-wider text-[11px]">
                  Select Payment Method
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      paymentMethod === "upi"
                        ? "bg-amber-500/20 border-amber-400 text-amber-200 font-bold shadow-xs"
                        : "bg-[#221A14] border-amber-500/15 text-amber-200/70 hover:border-amber-500/30"
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div>UPI / QR Code</div>
                      <div className="text-[10px] text-amber-200/50">GPay, PhonePe, Paytm</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      paymentMethod === "card"
                        ? "bg-amber-500/20 border-amber-400 text-amber-200 font-bold shadow-xs"
                        : "bg-[#221A14] border-amber-500/15 text-amber-200/70 hover:border-amber-500/30"
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-amber-400" />
                    <div>
                      <div>Credit / Debit Card</div>
                      <div className="text-[10px] text-amber-200/50">Visa, Mastercard, RuPay</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("netbanking")}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      paymentMethod === "netbanking"
                        ? "bg-amber-500/20 border-amber-400 text-amber-200 font-bold shadow-xs"
                        : "bg-[#221A14] border-amber-500/15 text-amber-200/70 hover:border-amber-500/30"
                    }`}
                  >
                    <Building className="w-4 h-4 text-sky-400" />
                    <div>
                      <div>Netbanking</div>
                      <div className="text-[10px] text-amber-200/50">SBI, HDFC, ICICI, Axis</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Price Total Breakdown with Discount Deductions */}
              <div className="bg-[#241D17] p-4 rounded-2xl border border-amber-500/20 space-y-2.5 text-xs">
                <div className="flex justify-between text-amber-200/70">
                  <span>Gross Items MRP Subtotal</span>
                  <span className="font-semibold text-amber-100">₹{computedRawTotal.toLocaleString()}</span>
                </div>

                {activeCoupon && activeDiscountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      Promo Discount ({activeCoupon})
                    </span>
                    <span>-₹{activeDiscountAmount.toLocaleString()}</span>
                  </div>
                )}

                {activeUsePoints && effectivePointsDiscount > 0 && (
                  <div className="flex justify-between text-amber-300 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Spiritual Points Concession ({effectivePointsSpent} PTS)
                    </span>
                    <span>-₹{effectivePointsDiscount.toLocaleString()}</span>
                  </div>
                )}

                {totalConcession > 0 && (
                  <div className="flex justify-between text-[11px] text-emerald-300 bg-emerald-950/50 px-3 py-1.5 rounded-xl border border-emerald-500/30 font-bold">
                    <span>Total Concession Savings</span>
                    <span>You save ₹{totalConcession.toLocaleString()}!</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-sm font-bold text-amber-200 border-t border-amber-500/20 pt-3">
                  <div>
                    <div className="text-xs">Final Amount Payable</div>
                    <div className="text-[10px] text-amber-200/50 font-normal">
                      All GST and consecration included
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-2xl text-amber-300 font-bold">
                      ₹{finalPayable.toLocaleString()}
                    </span>
                    {totalConcession > 0 && (
                      <div className="text-[10px] text-emerald-400 font-semibold">
                        Discounted from ₹{computedRawTotal.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleStartPayment}
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-bold text-sm shadow-xl hover:brightness-110 flex items-center justify-center gap-2 uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    Authorizing Payment Gateway...
                  </span>
                ) : (
                  <>
                    <span>Pay ₹{finalPayable.toLocaleString()} Now</span>
                    {totalConcession > 0 && (
                      <span className="bg-slate-950/20 px-2 py-0.5 rounded-lg text-[11px] font-extrabold normal-case">
                        (₹{totalConcession.toLocaleString()} Concession)
                      </span>
                    )}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* Success / Invoice Screen */}
          {step === "success" && orderResult && (
            <div className="space-y-6 text-center py-2">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-amber-200">
                  Payment Authorized Successfully!
                </h3>
                <p className="text-xs text-amber-200/70">
                  Transaction Reference: <span className="font-mono text-amber-300 font-bold">{orderResult.paymentId}</span>
                </p>
              </div>

              <div className="bg-[#241D17] p-4 rounded-2xl border border-amber-500/20 text-left space-y-3 text-xs">
                <div className="flex justify-between text-amber-200/70 border-b border-amber-500/10 pb-2">
                  <span>Order ID:</span>
                  <span className="font-mono text-amber-200 font-bold">{orderResult.orderId}</span>
                </div>

                {/* Itemized Discount Invoice Summary */}
                <div className="space-y-1.5 py-1 border-b border-amber-500/10">
                  <div className="flex justify-between text-amber-200/70">
                    <span>Original Price Subtotal:</span>
                    <span>₹{(orderResult.subtotal || computedRawTotal).toLocaleString()}</span>
                  </div>

                  {(orderResult.totalConcessions > 0 || totalConcession > 0) && (
                    <div className="flex justify-between text-emerald-400 font-medium">
                      <span>Concessions & Discounts Applied:</span>
                      <span>-₹{(orderResult.totalConcessions || totalConcession).toLocaleString()}</span>
                    </div>
                  )}

                  {orderResult.pointsSpent > 0 && (
                    <div className="flex justify-between text-amber-300 font-medium">
                      <span>Spiritual Points Redeemed:</span>
                      <span>{orderResult.pointsSpent} PTS</span>
                    </div>
                  )}

                  <div className="flex justify-between text-amber-100 font-bold pt-1 text-sm">
                    <span>Total Amount Charged:</span>
                    <span className="font-serif text-amber-300 text-base">
                      ₹{(orderResult.totalAmount !== undefined ? orderResult.totalAmount : finalPayable).toLocaleString()}
                    </span>
                  </div>
                </div>

                {orderResult.digitalDownloads && orderResult.digitalDownloads.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <div className="font-bold text-emerald-400 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                      <Download className="w-3.5 h-3.5" />
                      Digital eBooks & Kundali Reports Unlocked
                    </div>
                    {orderResult.digitalDownloads.map((dl: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 bg-[#18130F] rounded-xl border border-amber-500/15">
                        <span className="truncate pr-2 text-amber-100 font-medium">{dl.title}</span>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`Downloading PDF for "${dl.title}" (Token: ${dl.downloadToken})`);
                          }}
                          className="px-3 py-1.5 bg-amber-400 text-slate-950 font-bold text-[11px] rounded-lg hover:bg-amber-300 shrink-0 flex items-center gap-1 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          PDF Download
                        </a>
                      </div>
                    ))}
                  </div>
                )}

                {hasPhysicalItems && (
                  <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-500/20 text-amber-200/80 space-y-1">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                      <Truck className="w-3.5 h-3.5 text-amber-400" />
                      Physical Consecrated Dispatch
                    </div>
                    <p className="text-[11px]">
                      Your items will undergo sacred Vedic consecration and be dispatched to <span className="text-amber-100 font-medium">{customerName}</span> within 24-48 hours. Tracking details sent to {customerPhone}.
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 font-bold text-xs rounded-2xl transition-all cursor-pointer"
              >
                Return to Dashboard & Continue Exploring
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
