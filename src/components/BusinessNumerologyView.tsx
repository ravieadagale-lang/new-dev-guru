// src/components/BusinessNumerologyView.tsx
import React, { useState } from "react";
import { 
  Briefcase, 
  Sparkles, 
  Award, 
  Layers, 
  ShieldCheck, 
  BookOpen, 
  UserCheck, 
  AlertTriangle, 
  Calendar, 
  Palette, 
  TrendingUp, 
  Target, 
  Type,
  PenTool,
  Tag,
  DollarSign,
  Package,
  Layers3,
  Clock,
  CheckCircle2,
  FileCheck
} from "lucide-react";
import { 
  parseAndEvaluateBusinessBrand, 
  parseAndEvaluateProductAndPrice,
  BRAND_AND_PRODUCT_NUMBERS, 
  CHALDEAN_COMMERCIAL_COMPOUNDS, 
  PRICING_POINT_EVALUATIONS,
  CAUTIONARY_KARMIC_PRICE_SUMS,
  SERVICE_TIER_RECOMMENDATION,
  DISCOUNT_PERCENTAGE_NUMEROLOGY,
  SKU_AND_PRODUCT_CODE_GUIDANCE,
  PRODUCT_LAUNCH_TIMING_GUIDANCE,
  PACKAGING_QUANTITY_GUIDANCE,
  COMPLETE_BUSINESS_NUMEROLOGY_AUDIT_PROTOCOL,
  CHAPTER_THIRTY_TWO_THEORY
} from "../data/businessNumerologyData";

interface BusinessNumerologyViewProps {
  initialBrandName?: string;
  initialTagline?: string;
  initialDob?: string;
  userProfile?: any;
  selectedLanguage?: any;
}

export const BusinessNumerologyView: React.FC<BusinessNumerologyViewProps> = ({
  initialBrandName = "HAPPY FACES",
  initialTagline = "WE MAKE YOU SMILE",
  initialDob = "15/08/1947",
  userProfile
}) => {
  // Brand Inputs
  const [brandNameInput, setBrandNameInput] = useState(initialBrandName);
  const [taglineInput, setTaglineInput] = useState(initialTagline);
  const [founderDob, setFounderDob] = useState(userProfile?.dob || initialDob);

  // Product & Price Inputs
  const [productNameInput, setProductNameInput] = useState("PREMIUM SERUM");
  const [priceInput, setPriceInput] = useState("999");
  const [skuInput, setSkuInput] = useState("SKU-9001");
  const [launchDateInput, setLaunchDateInput] = useState("15/03/2026");

  // Tab State
  const [activeTab, setActiveTab] = useState<
    "brand_name" | "product_name" | "pricing_matrix" | "service_tiers" | "discounts_skus_launch" | "packaging_audit"
  >("brand_name");

  const [selectedNum, setSelectedNum] = useState<number | null>(null);

  // Parsed Brand Data
  const parsedBrand = parseAndEvaluateBusinessBrand(brandNameInput, taglineInput, founderDob);

  // Parsed Product Data
  const parsedProduct = parseAndEvaluateProductAndPrice(productNameInput, priceInput, skuInput, launchDateInput);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* CHAPTER HEADER BANNER */}
      <div className="bg-gradient-to-br from-slate-950 via-amber-950 to-slate-900 text-amber-50 p-6 md:p-8 rounded-3xl shadow-xl border border-amber-500/20 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
              {CHAPTER_THIRTY_TWO_THEORY.chapterNumber}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-amber-100 text-xs font-medium">
              Commercial & Product Numerology System
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-amber-100 tracking-tight">
            {CHAPTER_THIRTY_TWO_THEORY.title}
          </h1>

          <blockquote className="border-l-2 border-amber-400/60 pl-4 py-1 italic text-amber-200/90 text-sm md:text-base font-serif">
            "{CHAPTER_THIRTY_TWO_THEORY.quote.text}"
            <footer className="text-xs text-amber-400 mt-1 not-italic font-sans font-medium">
              — {CHAPTER_THIRTY_TWO_THEORY.quote.author}
            </footer>
          </blockquote>

          <p className="text-xs md:text-sm text-amber-100/80 leading-relaxed max-w-4xl">
            Every business name, product identity, price tag, SKU code, and launch date carries a specific numerical vibration. Brand names establish overall market positioning; product names govern secondary line expectations; prices express worth and value; SKU codes organize inventory flow; and launch dates imprint long-term commercial momentum.
          </p>
        </div>
      </div>

      {/* TOP TAB NAVIGATION */}
      <div className="flex flex-wrap gap-2 border-b border-amber-900/10 pb-3">
        <button
          onClick={() => setActiveTab("brand_name")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "brand_name"
              ? "bg-slate-900 text-amber-300 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-900/10"
          }`}
        >
          <Briefcase className="w-4 h-4 text-amber-400" />
          <span>1. Brand & Business Name</span>
        </button>

        <button
          onClick={() => setActiveTab("product_name")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "product_name"
              ? "bg-amber-900 text-amber-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-900/10"
          }`}
        >
          <Tag className="w-4 h-4 text-amber-400" />
          <span>2. Product Name Numerology</span>
        </button>

        <button
          onClick={() => setActiveTab("pricing_matrix")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "pricing_matrix"
              ? "bg-emerald-900 text-emerald-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-900/10"
          }`}
        >
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <span>3. Pricing Numerology & Price Points</span>
        </button>

        <button
          onClick={() => setActiveTab("service_tiers")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "service_tiers"
              ? "bg-indigo-900 text-indigo-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-900/10"
          }`}
        >
          <Layers3 className="w-4 h-4 text-indigo-400" />
          <span>4. Service Tiers & Subscriptions</span>
        </button>

        <button
          onClick={() => setActiveTab("discounts_skus_launch")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "discounts_skus_launch"
              ? "bg-purple-900 text-purple-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-900/10"
          }`}
        >
          <Clock className="w-4 h-4 text-purple-400" />
          <span>5. Discounts, SKUs & Launches</span>
        </button>

        <button
          onClick={() => setActiveTab("packaging_audit")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
            activeTab === "packaging_audit"
              ? "bg-rose-900 text-rose-100 shadow-md scale-102"
              : "bg-white text-slate-700 hover:bg-amber-50 border border-amber-900/10"
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-rose-400" />
          <span>6. Packaging & Audit Protocol</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: BRAND & BUSINESS NAME NUMEROLOGY */}
      {/* ======================================================== */}
      {activeTab === "brand_name" && (
        <div className="space-y-8">
          {/* CONTROLLER */}
          <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-amber-900/10 pb-3">
              <div className="p-2.5 bg-amber-100 text-amber-900 rounded-2xl">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-slate-900 text-base">Brand & Business Name Evaluation</h3>
                <p className="text-xs text-slate-500">Calculate Chaldean and Pythagorean numbers, compound frequencies, cornerstone, capstone, and founder compatibility.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-amber-600" />
                  Business / Brand Name
                </label>
                <input
                  type="text"
                  value={brandNameInput}
                  onChange={(e) => setBrandNameInput(e.target.value)}
                  placeholder="Enter business name"
                  className="w-full px-4 py-2.5 bg-amber-50/50 border border-amber-900/20 rounded-xl text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <PenTool className="w-3.5 h-3.5 text-slate-500" />
                  Tagline / Slogan (Optional)
                </label>
                <input
                  type="text"
                  value={taglineInput}
                  onChange={(e) => setTaglineInput(e.target.value)}
                  placeholder="Enter tagline"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  Founder Birth Date (DD/MM/YYYY)
                </label>
                <input
                  type="text"
                  value={founderDob}
                  onChange={(e) => setFounderDob(e.target.value)}
                  placeholder="DD/MM/YYYY"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* RESULTS PANEL */}
          {parsedBrand ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-amber-900/10 shadow-xs space-y-6">
                <div className="flex flex-wrap justify-between items-start gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-900">
                      Evaluated Brand Entity
                    </span>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mt-2 tracking-wider">
                      {parsedBrand.cleanBrandName}
                    </h2>
                  </div>

                  <div className="flex gap-4 text-right">
                    <div>
                      <span className="text-xs text-slate-500 uppercase font-mono block">Chaldean Primary</span>
                      <span className="text-3xl font-serif font-bold text-amber-900 bg-amber-50 w-12 h-12 rounded-2xl border border-amber-200 flex items-center justify-center shadow-xs ml-auto">
                        {parsedBrand.chaldeanPrimary}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs text-slate-500 uppercase font-mono block">Pythagorean</span>
                      <span className="text-2xl font-serif font-bold text-slate-700 bg-slate-50 w-12 h-12 rounded-2xl border border-slate-200 flex items-center justify-center shadow-xs ml-auto">
                        {parsedBrand.pythagoreanPrimary}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-1">
                  <span className="font-serif font-bold text-amber-950 text-base block">
                    {parsedBrand.reading.title}
                  </span>
                  <p className="text-xs md:text-sm text-amber-900 leading-relaxed font-medium">
                    {parsedBrand.reading.frequencyName}
                  </p>
                </div>

                {parsedBrand.compoundInfo && (
                  <div className={`p-4 rounded-2xl border text-xs md:text-sm space-y-1 ${
                    parsedBrand.isAuspiciousCompound
                      ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                      : parsedBrand.isCautionaryCompound
                      ? "bg-rose-50 border-rose-300 text-rose-950"
                      : "bg-slate-50 border-slate-300 text-slate-900"
                  }`}>
                    <span className="font-bold flex items-center gap-1.5 text-sm">
                      {parsedBrand.isAuspiciousCompound ? (
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                      ) : parsedBrand.isCautionaryCompound ? (
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                      ) : (
                        <Briefcase className="w-4 h-4 text-slate-600" />
                      )}
                      Chaldean Compound {parsedBrand.chaldeanCompound}: {parsedBrand.compoundInfo.name}
                    </span>
                    <p className="leading-relaxed font-medium">{parsedBrand.compoundInfo.quality}</p>
                    <p className="leading-relaxed opacity-90">{parsedBrand.compoundInfo.commercialImpact}</p>
                  </div>
                )}

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                  <span className="font-bold text-slate-900 block uppercase font-mono text-[11px] text-amber-800">
                    Acoustic Letter Calculation Breakdown:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {parsedBrand.chaldeanLetterValues.map((item, idx) => (
                      <div key={idx} className="bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 text-center shadow-2xs">
                        <span className="block font-serif font-bold text-slate-900 text-sm">{item.letter}</span>
                        <span className="block font-mono text-[10px] text-amber-800 font-bold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-700 leading-relaxed pt-1">
                    Chaldean Total: <strong className="font-mono text-slate-900">{parsedBrand.chaldeanSum}</strong> (Compound {parsedBrand.chaldeanCompound}) → Root Digit: <strong className="font-mono text-amber-900">{parsedBrand.chaldeanPrimary}</strong>.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-200 space-y-1">
                    <span className="font-bold text-amber-900 uppercase font-mono text-[10px] block">Cornerstone (First Letter)</span>
                    <p className="font-serif font-bold text-slate-900 text-lg">Letter '{parsedBrand.cornerstoneLetter}' (Value {parsedBrand.cornerstoneValue})</p>
                    <p className="text-slate-600 text-[11px] leading-relaxed">Determines initial market impression formed upon hearing or seeing the brand.</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-700 uppercase font-mono text-[10px] block">Capstone (Last Letter)</span>
                    <p className="font-serif font-bold text-slate-900 text-lg">Letter '{parsedBrand.capstoneLetter}' (Value {parsedBrand.capstoneValue})</p>
                    <p className="text-slate-600 text-[11px] leading-relaxed">Governs the lasting takeaway impression clients retain after completed transactions.</p>
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-4 text-xs md:text-sm text-slate-700 leading-relaxed">
                  <h4 className="font-serif font-bold text-slate-900 text-sm">Market Perception & Commercial Impact:</h4>
                  <p>{parsedBrand.reading.whatItCreates}</p>
                </div>
              </div>

              <div className="space-y-6">
                {parsedBrand.founderCompatibility && (
                  <div className={`p-6 rounded-3xl border shadow-xs space-y-3 ${
                    parsedBrand.founderCompatibility.isBest
                      ? "bg-emerald-50/80 border-emerald-300 text-emerald-950"
                      : parsedBrand.founderCompatibility.isAvoid
                      ? "bg-rose-50/80 border-rose-300 text-rose-950"
                      : "bg-white border-slate-200 text-slate-800"
                  }`}>
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-xs uppercase tracking-wider font-mono">Founder Alignment</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-mono ${
                        parsedBrand.founderCompatibility.isBest
                          ? "bg-emerald-200 text-emerald-900 font-bold"
                          : "bg-slate-200 text-slate-800"
                      }`}>
                        {parsedBrand.founderCompatibility.isBest ? "HARMONIOUS" : "NEUTRAL"}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed">{parsedBrand.founderCompatibility.explanation}</p>
                  </div>
                )}

                <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-xs space-y-4 text-xs">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <Target className="w-4 h-4 text-amber-600" />
                    <h4 className="font-serif font-bold text-slate-900 text-sm">Optimal Industry Verticals</h4>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-800 block text-[11px] uppercase tracking-wider mb-1">Most Suitable For:</span>
                    <ul className="space-y-1 text-slate-700">
                      {parsedBrand.reading.bestFor.map((item, idx) => (
                        <li key={idx}>✓ {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-white rounded-3xl border border-slate-200 text-slate-500 text-center text-sm">
              Please enter a valid brand name above to evaluate.
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: PRODUCT NAME NUMEROLOGY */}
      {/* ======================================================== */}
      {activeTab === "product_name" && (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-amber-900/10 pb-3">
              <div className="p-2.5 bg-amber-100 text-amber-900 rounded-2xl">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-slate-900 text-base">Product Name Calculator & Evaluator</h3>
                <p className="text-xs text-slate-500">Calculate individual product name vibrational numbers and check category resonance.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Product Name</label>
                <input
                  type="text"
                  value={productNameInput}
                  onChange={(e) => setProductNameInput(e.target.value)}
                  placeholder="e.g. PREMIUM SERUM"
                  className="w-full px-4 py-2.5 bg-amber-50/50 border border-amber-900/20 rounded-xl text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Product Price (₹)</label>
                <input
                  type="text"
                  value={priceInput}
                  onChange={(e) => setPriceInput(e.target.value)}
                  placeholder="e.g. 999"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">SKU Code</label>
                <input
                  type="text"
                  value={skuInput}
                  onChange={(e) => setSkuInput(e.target.value)}
                  placeholder="e.g. SKU-9001"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Launch Date</label>
                <input
                  type="text"
                  value={launchDateInput}
                  onChange={(e) => setLaunchDateInput(e.target.value)}
                  placeholder="DD/MM/YYYY"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {parsedProduct && (
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-amber-900/10 shadow-xs space-y-6">
              <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-900">
                    Evaluated Product Item
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-slate-900 mt-2">
                    {parsedProduct.cleanProductName}
                  </h2>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-500 uppercase font-mono block">Product Number</span>
                  <span className="text-3xl font-serif font-bold text-amber-900 bg-amber-50 w-12 h-12 rounded-2xl border border-amber-200 flex items-center justify-center shadow-xs ml-auto">
                    {parsedProduct.primaryNumber}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-serif font-bold text-slate-900 text-lg">{parsedProduct.productReading.title}</span>
                <p className="text-xs text-slate-600">{parsedProduct.productReading.frequencyName}</p>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed pt-2">{parsedProduct.productReading.whatItCreates}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-slate-900 block">Category Suitability:</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {parsedProduct.productReading.bestFor.map((item, idx) => (
                    <span key={idx} className="bg-white border border-slate-200 text-slate-800 px-2.5 py-1 rounded-lg">
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ALL 9 PRODUCT NUMBERS REFERENCE */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h3 className="font-serif font-bold text-xl text-slate-900">Reference: The Nine Product Name Numbers</h3>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => setSelectedNum(selectedNum === num ? null : num)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedNum === num
                      ? "bg-amber-900 text-white"
                      : "bg-white text-slate-700 border border-slate-200"
                  }`}
                >
                  Product {num}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.values(BRAND_AND_PRODUCT_NUMBERS)
                .filter(r => selectedNum === null || r.number === selectedNum)
                .map((item) => (
                  <div key={item.number} className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-xs space-y-3">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-serif font-bold text-base text-slate-900">{item.title}</span>
                      <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 font-bold flex items-center justify-center font-mono">
                        {item.number}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{item.frequencyName}</p>
                    <p className="text-xs text-slate-700 leading-relaxed">{item.whatItCreates}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: PRICING NUMEROLOGY */}
      {/* ======================================================== */}
      {activeTab === "pricing_matrix" && (
        <div className="space-y-8">
          <div className="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-300 text-xs md:text-sm text-emerald-950 leading-relaxed">
            <span className="font-bold block text-emerald-900 text-sm mb-1">Pricing Numerology & Vibrational Price Energy</span>
            A price tag is seen repeatedly at checkout, receipts, and marketing. Setting prices with auspicious digit sums (e.g. ₹599, ₹999, ₹2,499, ₹9,999) ensures alignment and customer trust, while avoiding Karmic Debt price sums (13, 14, 16, 19).
          </div>

          {/* CAUTIONARY KARMIC DEBT PRICES */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-xl text-rose-950 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              Price Digit Sums to Avoid (Karmic Debt Prices)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CAUTIONARY_KARMIC_PRICE_SUMS.map((item, idx) => (
                <div key={idx} className="bg-rose-50/70 p-5 rounded-3xl border border-rose-300 space-y-2 text-xs">
                  <span className="font-bold text-rose-950 text-sm block">{item.debtName}</span>
                  <p className="text-slate-700 font-mono text-[11px]"><strong>Examples:</strong> {item.examples}</p>
                  <p className="text-rose-900 leading-relaxed">{item.effect}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AUSPICIOUS PRICE REFERENCE TABLE */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-xl text-slate-900">Auspicious Price Point Evaluations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PRICING_POINT_EVALUATIONS.map((p, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-3xl border shadow-xs space-y-3 ${
                    p.status === "HIGHLY AUSPICIOUS"
                      ? "bg-emerald-50/90 border-emerald-300"
                      : p.status === "AUSPICIOUS"
                      ? "bg-white border-slate-200"
                      : "bg-rose-50/80 border-rose-300"
                  }`}
                >
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-serif font-bold text-xl text-slate-900">{p.price}</span>
                    <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full font-mono ${
                      p.status === "HIGHLY AUSPICIOUS"
                        ? "bg-emerald-200 text-emerald-950"
                        : p.status === "AUSPICIOUS"
                        ? "bg-slate-200 text-slate-800"
                        : "bg-rose-200 text-rose-950"
                    }`}>
                      {p.status}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold text-slate-600 block">{p.sumFormula} (Root {p.primaryNumber})</span>
                  <h4 className="font-serif font-bold text-sm text-slate-900">{p.title}</h4>
                  <p className="text-xs text-slate-700 leading-relaxed">{p.description}</p>
                  <p className="text-[11px] text-emerald-900 font-medium pt-1"><strong>Best For:</strong> {p.bestFor}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: SERVICE TIERS & SUBSCRIPTIONS */}
      {/* ======================================================== */}
      {activeTab === "service_tiers" && (
        <div className="space-y-8">
          <div className="bg-indigo-50/80 p-6 rounded-3xl border border-indigo-300 space-y-4">
            <div>
              <span className="text-xs font-bold text-indigo-900 bg-indigo-100 px-3 py-1 rounded-full uppercase tracking-wider">
                TIERED PRICING ARCHITECTURE
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mt-2">{SERVICE_TIER_RECOMMENDATION.title}</h3>
              <p className="text-xs md:text-sm text-indigo-950 leading-relaxed mt-1">{SERVICE_TIER_RECOMMENDATION.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {SERVICE_TIER_RECOMMENDATION.tiers.map((t, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-indigo-200 space-y-3 text-xs shadow-2xs">
                  <span className="font-bold text-indigo-900 uppercase font-mono text-[11px] block">{t.tierName}</span>
                  <span className="font-serif font-bold text-2xl text-slate-900 block">{t.price}</span>
                  <span className="font-mono text-[11px] text-indigo-800 font-bold block">{t.formula}</span>
                  <p className="text-slate-700 leading-relaxed">{t.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl border border-amber-900/10 shadow-xs space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed">
            <h3 className="font-serif font-bold text-xl text-slate-900">Subscription & Course Pricing Principles</h3>
            <p>
              Subscription fees recur monthly or annually. Aligning subscription prices with Auspicious Price Primary Numbers ensures steady customer retention and reduces churn. Recommended monthly subscription points: <strong>₹99/mo</strong> (Universal 9), <strong>₹299/mo</strong> (Partnership 2), <strong>₹599/mo</strong> (Royal Star 5), and <strong>₹999/mo</strong> (Sceptre 9).
            </p>
            <p>
              For educational training courses and certification programs, price points such as <strong>₹2,799</strong> (Sceptre Compound 27 → 9) or <strong>₹9,999</strong> (Master Quadruple 9) establish high educational authority and commitment.
            </p>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: DISCOUNTS, SKUS & LAUNCH TIMING */}
      {/* ======================================================== */}
      {activeTab === "discounts_skus_launch" && (
        <div className="space-y-8">
          {/* DISCOUNT PERCENTAGES */}
          <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-xl text-slate-900">Discount Percentage Numerology</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {DISCOUNT_PERCENTAGE_NUMEROLOGY.map((d, idx) => (
                <div key={idx} className="p-4 bg-purple-50/50 rounded-2xl border border-purple-200 text-xs space-y-1">
                  <div className="flex justify-between items-center font-bold">
                    <span className="font-serif text-lg text-purple-950">{d.percent}</span>
                    <span className="font-mono text-[10px] bg-purple-200 text-purple-900 px-2 py-0.5 rounded-md">Root {d.primary}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{d.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SKU CODE GUIDANCE */}
          <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-xs space-y-4 text-xs">
            <h3 className="font-serif font-bold text-xl text-slate-900">{SKU_AND_PRODUCT_CODE_GUIDANCE.title}</h3>
            <p className="text-slate-700 leading-relaxed">{SKU_AND_PRODUCT_CODE_GUIDANCE.description}</p>
            <div className="space-y-1 pt-1">
              <span className="font-bold text-slate-900 block">Recommended Flagship SKU Root Target Numbers:</span>
              <ul className="space-y-1 text-slate-700">
                {SKU_AND_PRODUCT_CODE_GUIDANCE.flagshipSKUTargets.map((item, idx) => (
                  <li key={idx}>✓ {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* LAUNCH TIMING */}
          <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-xs space-y-4 text-xs">
            <h3 className="font-serif font-bold text-xl text-slate-900">{PRODUCT_LAUNCH_TIMING_GUIDANCE.title}</h3>
            <p className="text-slate-700 leading-relaxed">{PRODUCT_LAUNCH_TIMING_GUIDANCE.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
              {PRODUCT_LAUNCH_TIMING_GUIDANCE.auspiciousLaunchDays.map((ld, idx) => (
                <div key={idx} className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-1">
                  <span className="font-serif font-bold text-amber-950 text-sm block">Universal Day {ld.dayNumber}</span>
                  <p className="text-slate-700 leading-relaxed">{ld.idealFor}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 6: PACKAGING & AUDIT PROTOCOL */}
      {/* ======================================================== */}
      {activeTab === "packaging_audit" && (
        <div className="space-y-8">
          {/* PACKAGING & WEIGHT */}
          <div className="bg-white p-6 rounded-3xl border border-amber-900/10 shadow-xs space-y-6">
            <h3 className="font-serif font-bold text-xl text-slate-900">{PACKAGING_QUANTITY_GUIDANCE.title}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-3">
                <span className="font-bold text-amber-900 uppercase font-mono block border-b pb-1">Package Quantity Vibrations</span>
                {PACKAGING_QUANTITY_GUIDANCE.quantities.map((q, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-0.5">
                    <span className="font-bold text-slate-900 block">{q.count}</span>
                    <p className="text-slate-600">{q.energy}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <span className="font-bold text-amber-900 uppercase font-mono block border-b pb-1">Package Sizing & Weight Vibrations</span>
                {PACKAGING_QUANTITY_GUIDANCE.weights.map((w, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-0.5">
                    <span className="font-bold text-slate-900 block">{w.size}</span>
                    <p className="text-slate-600">{w.energy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COMPLETE AUDIT PROTOCOL */}
          <div className="bg-slate-950 text-amber-50 p-6 md:p-8 rounded-3xl border border-amber-500/30 space-y-6">
            <div>
              <span className="text-xs font-bold text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full uppercase tracking-wider border border-amber-500/30">
                PROFESSIONAL AUDIT PROTOCOL
              </span>
              <h3 className="font-serif text-2xl font-bold text-amber-100 mt-2">
                Seven-Step Commercial Business Audit Protocol
              </h3>
            </div>

            <div className="space-y-3 text-xs md:text-sm text-amber-100/90 leading-relaxed">
              {COMPLETE_BUSINESS_NUMEROLOGY_AUDIT_PROTOCOL.map((step, idx) => (
                <div key={idx} className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
