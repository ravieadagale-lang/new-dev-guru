import React, { useState, useMemo } from "react";
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Compass, 
  Smile, 
  Video, 
  Gem, 
  FileText, 
  ShieldCheck, 
  MessageCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";

interface FaqViewProps {
  onNavigateTab: (tab: string) => void;
}

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const FaqView: React.FC<FaqViewProps> = ({ onNavigateTab }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ "astro-1": true });

  const categories = [
    { id: "all", label: "All Questions", icon: HelpCircle },
    { id: "astrology", label: "Astrology & Kundli", icon: Compass },
    { id: "face-reading", label: "Face Reading", icon: Smile },
    { id: "consultation", label: "Consultations", icon: Video },
    { id: "marketplace", label: "Gemstones & Remedies", icon: Gem },
    { id: "saas", label: "SaaS & PDF Reports", icon: FileText },
    { id: "privacy", label: "Privacy & Security", icon: ShieldCheck }
  ];

  const faqs: FaqItem[] = [
    // Astrology
    {
      id: "astro-1",
      category: "astrology",
      question: "How accurate are the Vedic Kundli calculations on Dev-Guru?",
      answer: "Our engine utilizes sub-arcsecond Swiss Ephemeris astronomical tables combined with the traditional Lahiri (Chitra Paksha) Ayanamsa. We calculate rising Lagna (Ascendant), Moon sign, 27 Nakshatras with 4 Padas, and all divisional charts from D1 (Rashi) to D9 (Navamsha), D10 (Dasamsha), and D60 (Shashtiamsha) with mathematical precision."
    },
    {
      id: "astro-2",
      category: "astrology",
      question: "What if I do not know my exact birth time?",
      answer: "Accurate birth time is critical for determining your Ascendant (Lagna) and divisional charts. If your exact time is unknown, we recommend entering an approximate time or booking a Birth Time Rectification session with our certified astrologer, where past life events and physical traits are reverse-mapped to discover your true rising degree."
    },
    {
      id: "astro-3",
      category: "astrology",
      question: "What are Vimshottari Dashas and why are they important?",
      answer: "The Vimshottari Dasha system is the 120-year planetary cycle that dictates when specific karmic events materialize in your life. Each period is ruled by a planet (Mahadasha), with sub-periods (Antardasha and Pratyantardasha) that reveal auspicious windows for marriage, career shifts, financial expansion, or periods requiring remedies."
    },

    // Face Reading
    {
      id: "face-1",
      category: "face-reading",
      question: "How does Face Reading (Mukha Samudrika Shastra) work without AI?",
      answer: "Face Reading on Dev-Guru is grounded in ancient Vedic Mukha Samudrika Shastra and classical Chinese Mian Xiang physiognomy. Rather than arbitrary black-box algorithms, our system analyzes classical geometric proportions: the Three Zones (San Ting - Upper/Heaven, Middle/Human, Lower/Earth), the Twelve Palaces of Destiny, facial bone structure, eye shapes, and constitutional Wu Xing elements to deliver time-tested character and life epoch insights."
    },
    {
      id: "face-2",
      category: "face-reading",
      question: "Are my uploaded face photos stored or shared?",
      answer: "No. Your facial images are processed ephemerally in volatile memory strictly to calculate geometric facial landmarks and proportions. They are never added to surveillance databases, never used for facial recognition, and never shared with third parties. You maintain 100% privacy."
    },

    // Consultations
    {
      id: "consult-1",
      category: "consultation",
      question: "Who conducts the 1-on-1 consultations?",
      answer: "Consultations are conducted by our certified founder (actively practicing in the occult field since 2013) and our verified panel of senior astrologers. Our founder holds formal master-level accreditations in Vedic Astrology, Chaldean Numerology, Tarot, Face Reading, Vastu Shastra, Crystal Healing (Master Degree), Graphology, and Spiritual Life Coaching."
    },
    {
      id: "consult-2",
      category: "consultation",
      question: "Why do you specialize in Love and Relationships?",
      answer: "Relationships represent one of the most spiritually pivotal areas of human life. Having guided over 5,000+ relationships since 2013, our master practitioner specializes in D9 Navamsha synastry, twin-flame and soulmate karmic bonds, overcoming heartbreak and communication deadlocks, and helping couples re-establish mutual devotion and warmth."
    },
    {
      id: "consult-3",
      category: "consultation",
      question: "Can I ask multiple questions during my session?",
      answer: "Yes. During your 30-minute or 60-minute video session, you may ask about career, finances, marriage, personal spiritual growth, and health remedies. We encourage you to write down your key questions beforehand to make the most of your sacred consultation."
    },

    // Marketplace
    {
      id: "market-1",
      category: "marketplace",
      question: "Are your gemstones natural, untreated, and certified?",
      answer: "Yes, 100%. Every gemstone in our sacred marketplace is natural, earth-mined, and unheated (Sri Lankan Blue Sapphires, Colombian Emeralds, Burmese Rubies, etc.). Each gem comes accompanied by a certified testing report from a government-recognized gemological laboratory verifying its natural origin and authenticity."
    },
    {
      id: "market-2",
      category: "marketplace",
      question: "What is Pran Pratishtha consecration?",
      answer: "A gemstone or Rudraksha bead must be cleansed of negative handling energies and energized with sacred planetary mantras before wearing. Our Vedic priests conduct customized Pran Pratishtha pujas using your specific Name, Gotra, and Nakshatra, consecrating the item on an auspicious astrological Hora prior to shipping."
    },
    {
      id: "market-3",
      category: "marketplace",
      question: "What is your return policy on gemstones and rudrakshas?",
      answer: "We provide a 7-day inspection return window. If you are not completely satisfied, you may return the item in its original condition with the laboratory certificate and tamper-proof security seal intact for a prompt refund."
    },

    // SaaS & Reports
    {
      id: "saas-1",
      category: "saas",
      question: "What is the difference between Free Visitor and Pro Seeker tiers?",
      answer: "The Free tier allows instant generation of standard D1 Rashi Kundli charts, Chaldean name numerology, daily Panchang, and basic horoscope overviews. The Pro Seeker tier unlocks full D1-D60 divisional charts, 120-year Vimshottari dasha timelines, high-resolution printable branded PDF exports, and personalized Moon transit alerts."
    },
    {
      id: "saas-2",
      category: "saas",
      question: "Can I download and print high-resolution Kundli reports?",
      answer: "Yes. Both our Kundli view and Customer Dashboard feature high-resolution PDF compilation powered by our rendering engine. Reports feature elegant Amber Gold borders, complete planetary degree tables, dasha breakdowns, and certified astrological summaries suitable for archiving or printing."
    },

    // Privacy & Security
    {
      id: "priv-1",
      category: "privacy",
      question: "Do you ever sell or monetize our personal birth details?",
      answer: "Never. We uphold an absolute non-monetization pledge. Your birth details, email address, consultation recordings, and spiritual questions are protected with AES-256 cloud encryption and are never sold, rented, or shared with data brokers or advertisers."
    },
    {
      id: "priv-2",
      category: "privacy",
      question: "Can I permanently delete my account and saved Kundlis?",
      answer: "Yes. In compliance with the GDPR and India's Digital Personal Data Protection (DPDP) Act 2023, you can request full account erasure at any time. All stored charts and personal identifiers will be permanently expunged from our servers within 7 business days."
    }
  ];

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = useMemo(() => {
    return faqs.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch = 
        searchQuery.trim() === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [faqs, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#1E1B18] text-amber-100 rounded-3xl p-8 sm:p-12 border border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Dev-Guru Knowledge Base &amp; Help Desk</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed">
            Find immediate, authoritative answers regarding our Vedic ephemeris calculations, face reading principles, certified occult consultations, gemstone authenticity, and SaaS subscription features.
          </p>

          {/* Search Bar */}
          <div className="pt-2 relative max-w-xl">
            <div className="relative">
              <Search className="w-4 h-4 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g., Swiss Ephemeris, Gemstone Certificate, Love Reading, Face Reading)..."
                className="w-full bg-[#2A231D] border border-amber-500/30 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-amber-100 placeholder:text-amber-300/40 focus:outline-none focus:border-amber-400 shadow-inner"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                isSelected
                  ? "bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/40"
                  : "bg-white text-slate-700 hover:bg-amber-100/60 border border-amber-900/10"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-slate-950" : "text-amber-800"}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-amber-900/10 p-12 text-center space-y-4">
            <HelpCircle className="w-12 h-12 text-amber-400 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-slate-900">
              No matching questions found
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              We couldn&apos;t find an answer matching &quot;{searchQuery}&quot;. Our support team is happy to help you directly.
            </p>
            <button
              onClick={() => onNavigateTab("contact")}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-all cursor-pointer"
            >
              Contact Support Desk
            </button>
          </div>
        ) : (
          filteredFaqs.map((item) => {
            const isOpen = !!openIds[item.id];
            return (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border border-amber-900/10 overflow-hidden shadow-xs hover:border-amber-400/40 transition-all"
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-serif font-bold text-sm sm:text-base text-slate-900 leading-snug">
                    {item.question}
                  </span>
                  <div className="p-1.5 rounded-full bg-amber-50 text-amber-800 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1 pt-4">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Help Desk CTA Banner */}
      <div className="bg-gradient-to-r from-[#1E1B18] via-[#2A241F] to-[#16120E] text-amber-100 rounded-3xl p-8 sm:p-10 border border-amber-500/20 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <MessageCircle className="w-4 h-4" />
            <span>Still Have Questions?</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            Connect Directly with Our Sanctuary Office
          </h3>
          <p className="text-xs text-amber-200/80 max-w-xl leading-relaxed">
            Our team responds to customer inquiries, consultation questions, and order requests within 24 hours.
          </p>
        </div>
        <button
          onClick={() => onNavigateTab("contact")}
          className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span>Open Contact Us Page</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FaqView;
