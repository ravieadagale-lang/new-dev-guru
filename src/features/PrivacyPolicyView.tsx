import React, { useState } from "react";
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Server, 
  Mail, 
  Clock, 
  Globe, 
  ArrowLeft,
  Download
} from "lucide-react";

interface PrivacyPolicyViewProps {
  onNavigateTab: (tab: string) => void;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ onNavigateTab }) => {
  const [activeSection, setActiveSection] = useState<string>("overview");

  const lastUpdated = "September 10, 2026";

  const sections = [
    { id: "overview", label: "1. Overview & Commitment" },
    { id: "collection", label: "2. Information We Collect" },
    { id: "face-reading", label: "3. Face Reading & Images" },
    { id: "usage", label: "4. How We Use Your Data" },
    { id: "sharing", label: "5. Non-Sale & Data Sharing" },
    { id: "security", label: "6. Security & Storage" },
    { id: "rights", label: "7. Your Rights (GDPR & DPDP)" },
    { id: "contact", label: "8. Data Protection Officer" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#1E1B18] text-amber-100 rounded-3xl p-8 sm:p-12 border border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Dev-Guru Enterprise SaaS Trust Center</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Privacy &amp; Data Protection Policy
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed">
            At Dev-Guru, we treat your birth chart, spiritual inquiries, and consultation records with absolute sanctity. This policy details how our Spiritual Intelligence SaaS platform collects, processes, and safeguards your sacred data under international privacy standards (GDPR, California CCPA, and India DPDP Act 2023).
          </p>
          <div className="flex items-center gap-4 text-xs text-amber-300/70 pt-2">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Last Revised: {lastUpdated}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Lock className="w-3.5 h-3.5" />
              AES-256 Cloud Encryption
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sticky Table of Contents */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-amber-900/10 p-6 shadow-xs sticky top-24 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Policy Navigation
          </div>
          <nav className="space-y-1">
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveSection(sec.id);
                  const el = document.getElementById(sec.id);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                  activeSection === sec.id
                    ? "bg-amber-100/80 text-amber-950 font-bold border border-amber-300/60"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span>{sec.label}</span>
                {activeSection === sec.id && <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />}
              </button>
            ))}
          </nav>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="text-[11px] text-slate-500">
              Need assistance regarding your data? Contact our Data Protection Officer directly:
            </div>
            <a
              href="mailto:privacy@dev-guru.com"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 hover:text-amber-950"
            >
              <Mail className="w-4 h-4 text-amber-600" />
              privacy@dev-guru.com
            </a>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-amber-900/10 p-8 sm:p-10 shadow-xs space-y-10 text-slate-700 leading-relaxed text-sm">
          {/* Section 1 */}
          <section id="overview" className="space-y-3 pt-2">
            <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              1. Overview &amp; Sacred Data Commitment
            </h2>
            <p className="text-xs sm:text-sm">
              Dev-Guru operates as a dedicated spiritual intelligence platform designed to decode astrological charts, numerological vibrations, and provide holistic life coaching. Because astrological and metaphysical consultations involve deeply personal biographical information, we hold ourselves to the highest global data protection benchmarks.
            </p>
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 space-y-1.5 font-medium">
              <div className="font-bold flex items-center gap-1.5 text-amber-950">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Our Absolute Privacy Guarantee:
              </div>
              <div>&bull; We never sell, monetize, or broker your birth chart or personal details to advertisers.</div>
              <div>&bull; We never share your consultation audio or confidential transcripts with third parties.</div>
              <div>&bull; You maintain complete control to export or permanently delete your profile at any time.</div>
            </div>
          </section>

          {/* Section 2 */}
          <section id="collection" className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Server className="w-5 h-5 text-amber-600" />
              2. Information We Collect
            </h2>
            <p className="text-xs sm:text-sm">
              To deliver accurate mathematical astrological calculations and custom spiritual reports, we collect only necessary data:
            </p>
            <ul className="space-y-2 text-xs text-slate-600 list-disc pl-5">
              <li>
                <strong>Birth Parameters:</strong> Full legal name, date of birth (YYYY-MM-DD), exact birth time (HH:MM), and geographic birth city/coordinates (latitude &amp; longitude) required for the Swiss Ephemeris astronomical calculations and Lagna ascendant positioning.
              </li>
              <li>
                <strong>Account &amp; Contact Information:</strong> Email address, optional telephone number, and authentication tokens for registered customers.
              </li>
              <li>
                <strong>Marketplace &amp; Order Data:</strong> Shipping address, delivery recipient name, and order items (gemstones, rudrakshas, yantras) for physical dispatch. Payment card data is processed exclusively through PCI-DSS Level 1 certified gateways (e.g., Razorpay/Stripe); Dev-Guru servers never store raw credit card numbers.
              </li>
              <li>
                <strong>Consultation Records:</strong> Preferred meeting time slots, focus areas (career, finance, love, marriage, health), and consultation notes voluntarily provided by you.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section id="face-reading" className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" />
              3. Face Reading (Mukha Samudrika) Image Protection
            </h2>
            <p className="text-xs sm:text-sm">
              Our <strong>Face Reading (Mukha Samudrika Shastra)</strong> service allows seekers to evaluate classical facial physiognomy, facial zones, and destiny landmarks:
            </p>
            <div className="bg-blue-50/70 p-5 rounded-2xl border border-blue-200/60 text-xs text-blue-900 space-y-2">
              <div className="font-bold flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-blue-700" />
                Transient In-Memory Feature Extraction:
              </div>
              <p>
                When you use Face Reading, images are uploaded securely via encrypted TLS 1.3 tunnels strictly to compute facial landmark proportions (Three Zones, Eye Canthi, Forehead width, and Chin angles).
              </p>
              <p>
                <strong>Zero Facial Recognition or Surveillance:</strong> We do NOT create biometric templates for identity verification, law enforcement tracking, surveillance, or facial recognition databases. Images are processed exclusively for philosophical and self-reflection readings.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="usage" className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-600" />
              4. How We Use Your Data
            </h2>
            <p className="text-xs sm:text-sm">
              We process your data exclusively for legitimate spiritual advisory purposes:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">Kundli &amp; Dasha Generation</div>
                <div className="text-slate-600">Calculating planetary positions, D1-D60 divisional charts, Ashtakvarga scores, and Vimshottari dasha cycles.</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">Personalized Transit Alerts</div>
                <div className="text-slate-600">Delivering opt-in notifications for Moon sign transits, Sade Sati phases, Ekadashi vratas, and Rahu Kaal.</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">1-on-1 Consultations</div>
                <div className="text-slate-600">Preparing customized charts and synastry reports prior to your scheduled session with our master astrologer.</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">Marketplace Order Fulfillment</div>
                <div className="text-slate-600">Consecrating gemstones with personal birth details and dispatching insured packages to your doorstep.</div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section id="sharing" className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-600" />
              5. Non-Sale &amp; Third-Party Sharing Policy
            </h2>
            <p className="text-xs sm:text-sm">
              <strong>We do NOT sell, rent, or trade your personal or astrological information to third parties.</strong>
            </p>
            <p className="text-xs sm:text-sm text-slate-600">
              We only share limited operational information with verified infrastructure service providers bound by strict confidentiality and data protection agreements:
            </p>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5">
              <li><strong>Payment Processors:</strong> Razorpay &amp; Stripe for processing payment authorizations.</li>
              <li><strong>Logistics Partners:</strong> Courier and postal services for delivering consecrated gemstone orders.</li>
              <li><strong>Cloud Infrastructure:</strong> Secure enterprise hosting with Google Cloud Platform and Cloud Run.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section id="security" className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              6. Security &amp; Data Storage
            </h2>
            <p className="text-xs sm:text-sm">
              We employ military-grade AES-256 bit encryption at rest and TLS 1.3 protocol encryption for all data in transit. Administrative access to customer charts and databases is restricted by role-based access control (RBAC), multi-factor authentication, and audited continuously.
            </p>
          </section>

          {/* Section 7 */}
          <section id="rights" className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-600" />
              7. Your Rights (GDPR &amp; DPDP Act 2023)
            </h2>
            <p className="text-xs sm:text-sm">
              Regardless of your geographical location, Dev-Guru grants you complete digital sovereignty:
            </p>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Right to Access &amp; Portability:</strong> View and export your complete birth chart profile, order history, and consultation logs in PDF format.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Right to Rectification:</strong> Update or correct birth time, date, or contact coordinates at any time via your Customer Dashboard.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> Request permanent deletion of your account, saved charts, and consultation transcripts. We will purge your records within 7 business days.</span>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section id="contact" className="space-y-4 border-t border-slate-100 pt-8">
            <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-5 h-5 text-amber-600" />
              8. Contact Our Data Protection Officer
            </h2>
            <p className="text-xs sm:text-sm">
              If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact our dedicated Data Protection Officer:
            </p>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <div className="font-bold text-slate-900">Dev-Guru Privacy &amp; Legal Cell</div>
              <div>Attn: Data Protection Officer (DPO)</div>
              <div>Email: <a href="mailto:privacy@dev-guru.com" className="text-amber-700 font-bold hover:underline">privacy@dev-guru.com</a></div>
              <div>Response Time Commitment: Within 24-48 business hours</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyView;
