import React, { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Compass, 
  Gem, 
  ArrowRight,
  HelpCircle,
  Video
} from "lucide-react";

interface ContactUsViewProps {
  onNavigateTab: (tab: string) => void;
}

export const ContactUsView: React.FC<ContactUsViewProps> = ({ onNavigateTab }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "love_relationships",
    priority: "normal",
    message: ""
  });
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const ticketId = `ASTRO-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket(ticketId);
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "love_relationships",
        priority: "normal",
        message: ""
      });
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header Banner */}
      <div className="bg-[#1E1B18] text-amber-100 rounded-3xl p-8 sm:p-12 border border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
            <Mail className="w-4 h-4 text-amber-400" />
            <span>Spiritual Sanctuary &amp; Customer Care</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Contact Dev-Guru Sanctuary
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed">
            Have questions about a personal consultation, need assistance with your birth chart calculations, or seeking guidance regarding consecrated gemstones? Our dedicated team is here to support your journey with sacred devotion.
          </p>
          <div className="flex items-center gap-4 text-xs text-amber-300/70 pt-2">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              SLA Commitment: Response within 24 Hours
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Strict Confidentiality
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Form (Left) & Contact Channels (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-amber-900/10 p-8 sm:p-10 shadow-xs space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-800 font-bold">
              Send a Direct Message
            </span>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
              Connect with Our Guidance Desk
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Please share your details below. For urgent relationship or consultation inquiries, select the appropriate category.
            </p>
          </div>

          {submittedTicket ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-emerald-950">
                  Message Received with Sacred Care!
                </h3>
                <p className="text-xs text-emerald-800 mt-1">
                  Your reference ticket number is <span className="font-mono font-bold text-emerald-950">{submittedTicket}</span>. Our senior spiritual consultant or support representative will respond to your registered email within 24 hours.
                </p>
              </div>
              <button
                onClick={() => setSubmittedTicket(null)}
                className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-all cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Aarav Sharma"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    WhatsApp / Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Inquiry Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
                  >
                    <option value="love_relationships">Specialized: Love &amp; Relationships</option>
                    <option value="consultation_booking">Book 1-on-1 Consultation</option>
                    <option value="career_finance">Career &amp; Wealth Guidance</option>
                    <option value="marketplace_orders">Gemstone / Marketplace Order</option>
                    <option value="vastu_audit">Vastu Shastra Space Audit</option>
                    <option value="saas_technical">SaaS Subscriptions &amp; Tech Support</option>
                    <option value="other">General Inquiries</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Urgency Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "normal", label: "Normal (24h)" },
                    { id: "high", label: "High (12h)" },
                    { id: "urgent", label: "Urgent (4h)" }
                  ].map((p) => (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => setFormData({ ...formData, priority: p.id })}
                      className={`py-2 px-3 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                        formData.priority === p.id
                          ? "bg-amber-100 text-amber-950 border-amber-400 font-bold"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Your Message or Question <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your question, birth details, or order inquiry here..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 focus:outline-none focus:border-amber-500 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message to Sanctuary Desk</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Channels Card */}
          <div className="bg-[#1E1B18] text-amber-100 rounded-3xl border border-amber-500/20 p-8 space-y-6 shadow-md">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                Direct Communication
              </span>
              <h3 className="font-serif text-xl font-bold text-white">
                Sanctuary Contact Channels
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-amber-200">Email Inquiries</div>
                  <div className="text-amber-100/70 mt-0.5">
                    General: <a href="mailto:support@dev-guru.com" className="hover:underline text-amber-300">support@dev-guru.com</a>
                  </div>
                  <div className="text-amber-100/70">
                    Consultations: <a href="mailto:consultations@dev-guru.com" className="hover:underline text-amber-300">consultations@dev-guru.com</a>
                  </div>
                  <div className="text-amber-100/70">
                    Love &amp; Marriage: <a href="mailto:love-guidance@dev-guru.com" className="hover:underline text-amber-300">love-guidance@dev-guru.com</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-amber-200">Operating Hours (IST)</div>
                  <div className="text-amber-100/70 mt-0.5">Monday &ndash; Saturday: 9:00 AM &ndash; 8:00 PM IST</div>
                  <div className="text-amber-100/70">Sunday: Closed for Divine Pujas &amp; Consecrations</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-amber-200">Sanctuary Headquarters</div>
                  <div className="text-amber-100/70 mt-0.5">
                    Dev-Guru Spiritual Sanctuary, Vedic Heritage Tower,
                    Indiranagar, Bangalore, Karnataka &amp; New Delhi, India
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-white rounded-3xl border border-amber-900/10 p-6 space-y-3 shadow-xs">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Quick Shortcuts
            </div>

            <button
              onClick={() => onNavigateTab("consultation")}
              className="w-full p-3 rounded-2xl bg-amber-50 hover:bg-amber-100/70 text-amber-950 font-semibold text-xs transition-all flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-amber-700" />
                <span>Book 1-on-1 Video Session</span>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-800" />
            </button>

            <button
              onClick={() => onNavigateTab("faq")}
              className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs transition-all flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-slate-600" />
                <span>Browse Frequently Asked Questions</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600" />
            </button>

            <button
              onClick={() => onNavigateTab("about")}
              className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs transition-all flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Read About Our 13-Year Journey</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsView;
