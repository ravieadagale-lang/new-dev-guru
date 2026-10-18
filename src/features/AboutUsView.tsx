import React from "react";
import { 
  Sparkles, 
  Award, 
  Heart, 
  Compass, 
  ShieldCheck, 
  BookOpen, 
  Calendar, 
  Users, 
  TrendingUp, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Gem, 
  Smile, 
  Home, 
  FileText, 
  Eye,
  MessageCircle,
  Clock,
  MapPin,
  Mail
} from "lucide-react";

interface AboutUsViewProps {
  onNavigateTab: (tab: string) => void;
}

export const AboutUsView: React.FC<AboutUsViewProps> = ({ onNavigateTab }) => {
  const certifications = [
    {
      title: "Vedic & Western Astrology",
      sanskrit: "Jyotish Shastra",
      icon: Compass,
      color: "from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-300",
      description: "Advanced mastery in D1-D60 Divisional Charts, Vimshottari & Chara Dasha frameworks, Prashna Horary analysis, and precision planetary dosha remediation."
    },
    {
      title: "Chaldean & Pythagorean Numerology",
      sanskrit: "Anka Shastra",
      icon: Sparkles,
      color: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-300",
      description: "In-depth birth number (Mulank), destiny number (Bhagyank), Lo Shu Grid matrix, and phonological name vibration alignment for business and personal harmony."
    },
    {
      title: "Master Tarot Reading",
      sanskrit: "Intuitive 78-Card Deck",
      icon: BookOpen,
      color: "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-300",
      description: "Certified interpreter of the original 78-Card Rider-Waite-Smith system, specializing in Celtic Cross, multi-card synthesis, and relationship archetypes."
    },
    {
      title: "Face Reading (Physiognomy)",
      sanskrit: "Mukha Samudrika & Mian Xiang",
      icon: Smile,
      color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-300",
      description: "Classical facial feature mapping, Three Zones (Heaven, Human, Earth), Twelve Destiny Palaces, and emotional temperament reading."
    },
    {
      title: "Vastu Shastra & Spatial Harmonics",
      sanskrit: "Sthapatya Veda",
      icon: Home,
      color: "from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-300",
      description: "Architectural alignment of residential and commercial spaces according to Pancha Mahabhuta (Five Elements), cardinal energies, and non-demolition remedies."
    },
    {
      title: "Crystal Healing Master Degree",
      sanskrit: "Ratna & Sphatik Chikitsa",
      icon: Gem,
      color: "from-pink-500/20 to-pink-600/10 border-pink-500/30 text-pink-300",
      description: "Master degree in crystal vibrational therapy, auric cleansing, seven-chakra realignment, and sacred mineral grid consecration."
    },
    {
      title: "Graphology (Handwriting & Signature)",
      sanskrit: "Subconscious Mind Mapping",
      icon: FileText,
      color: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 text-indigo-300",
      description: "Scientific analysis of handwriting strokes, pressure, and signature angles to reveal subconscious personality patterns, emotional blocks, and wealth magnetism."
    },
    {
      title: "Certified Life Coach & Spiritual Guidance",
      sanskrit: "Atma Chetana Coaching",
      icon: Eye,
      color: "from-teal-500/20 to-teal-600/10 border-teal-500/30 text-teal-300",
      description: "Holistic life transformation coaching combining ancient karmic resolution, mindfulness, and practical habit engineering for modern seekers."
    }
  ];

  const domains = [
    {
      title: "Career & Professional Growth",
      desc: "Identifying true professional callings, promotion timing, business launches, and workplace conflict resolution through planetary periods.",
      stat: "4,200+ Consultations"
    },
    {
      title: "Finance & Wealth Abundance",
      desc: "Detecting Dhana and Lakshmi Yogas, clearing financial blockages, auspicious investment windows, and entrepreneurial partnerships.",
      stat: "3,800+ Portfolios Analyzed"
    },
    {
      title: "Health & Vitality Balance",
      desc: "Vedic health assessments, identifying doshic imbalances, gemstone and crystal recommendations to restore energetic harmony.",
      stat: "2,900+ Personalized Upays"
    },
    {
      title: "Marriages & Matrimonial Alliances",
      desc: "Comprehensive Ashtakoota and D9 Navamsha synastry, auspicious Vivah Muhurat selection, and mitigating Manglik hurdles.",
      stat: "3,500+ Couples Guided"
    },
    {
      title: "Specialized in Love & Relationships",
      highlight: true,
      desc: "Our deepest area of specialization: resolving emotional misunderstandings, healing heartbreak, twin-flame dynamics, karmic connection clarity, and reigniting mutual commitment and sacred romance.",
      stat: "5,000+ Relationships Restored"
    }
  ];

  return (
    <div className="space-y-16 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Hero Section: Founder & Master Practitioner Profile */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E1B18] via-[#2A241F] to-[#120F0D] text-amber-100 p-8 sm:p-12 lg:p-16 border border-amber-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Certified Occult Master • Practicing Since 2013</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-amber-100 leading-tight">
              A Decade of Sacred Wisdom, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-500">
                Empowering Over 10,000 Lives.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-amber-100/80 leading-relaxed max-w-3xl">
              Welcome to <strong>Dev-Guru</strong>. I have been actively working in the sacred occult and spiritual sciences field <strong>since 2013</strong> as a professionally certified practitioner. Over these 13+ years, I have pursued extensive master-level coursework, certifications, and rigorous study across the world&apos;s most revered metaphysical disciplines.
            </p>

            <p className="text-sm sm:text-base text-amber-100/80 leading-relaxed max-w-3xl">
              From calculating sub-arcsecond Vedic birth charts and decoding name vibration frequencies to reading facial landmarks, balancing spatial Vastu energies, and harnessing master crystal frequencies — my life&apos;s purpose is helping individuals find absolute clarity, inner peace, and divine direction.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-amber-500/20">
              <div className="bg-white/5 p-4 rounded-2xl border border-amber-500/20">
                <div className="font-serif text-2xl font-bold text-amber-300">2013</div>
                <div className="text-[11px] text-amber-200/70 font-medium">Serving Since</div>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-amber-500/20">
                <div className="font-serif text-2xl font-bold text-amber-300">10,000+</div>
                <div className="text-[11px] text-amber-200/70 font-medium">Seekers Guided</div>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-amber-500/20">
                <div className="font-serif text-2xl font-bold text-amber-300">8+</div>
                <div className="text-[11px] text-amber-200/70 font-medium">Master Disciplines</div>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-amber-500/20">
                <div className="font-serif text-2xl font-bold text-rose-400">#1</div>
                <div className="text-[11px] text-amber-200/70 font-medium">Love &amp; Relationship Focus</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigateTab("consultation")}
                className="px-6 py-3.5 rounded-2xl bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-amber-400 flex items-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-slate-950" />
                Book 1-on-1 Consultation
              </button>
              <button
                onClick={() => onNavigateTab("astrology")}
                className="px-6 py-3.5 rounded-2xl bg-amber-900/60 border border-amber-500/40 text-amber-200 font-semibold text-xs uppercase tracking-wider hover:bg-amber-900 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                Generate Free Kundli
              </button>
            </div>
          </div>

          {/* Right Card: Dedicated Occult Master Badge */}
          <div className="lg:col-span-4 bg-[#25201C] p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-xl space-y-6 text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-1 shadow-inner">
              <div className="w-full h-full rounded-full bg-[#1A1613] flex items-center justify-center text-amber-300">
                <Award className="w-12 h-12" />
              </div>
            </div>

            <div>
              <div className="font-serif text-xl font-bold text-amber-100">
                Master Occult Practitioner
              </div>
              <p className="text-xs text-amber-300/80 font-medium mt-1">
                Certified Astrologer, Numerologist &amp; Spiritual Coach
              </p>
              <div className="flex justify-center gap-1 mt-2 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
            </div>

            <div className="bg-[#181411] p-4 rounded-2xl border border-amber-500/20 text-xs text-left space-y-2 text-amber-200/80">
              <div className="flex items-center gap-2 text-amber-300 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verified &amp; Certified Since 2013
              </div>
              <p className="text-[11px] leading-relaxed">
                Extensive formal coursework and master degree accreditations across classical Eastern cosmology, Samudrika Shastra, Tarot symbolism, and vibrational crystal sciences.
              </p>
            </div>

            <div className="pt-2 text-xs text-amber-300/60 font-medium">
              Dev-Guru Spiritual Sanctuary &bull; Worldwide Consultations
            </div>
          </div>
        </div>
      </section>

      {/* 2. Specialization Spotlight: Love & Relationships */}
      <section className="bg-gradient-to-r from-rose-950/80 via-purple-950/60 to-slate-950 p-8 sm:p-12 rounded-3xl border border-rose-500/30 shadow-xl space-y-6">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
            <span>Core Area of Mastery &amp; Passion</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Specialized in Love, Marriage &amp; Relationship Harmony
          </h2>

          <p className="text-sm sm:text-base text-rose-100/90 leading-relaxed">
            Relationships are the highest mirror of our spiritual evolution. Having guided thousands of individuals and couples through heartbreak, karmic crossroads, and matrimonial decisions, I specialize in identifying the subtle energetic and astrological causes behind emotional distress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-black/30 p-6 rounded-2xl border border-rose-500/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold">
              01
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Twin-Flame &amp; Soulmate Synastry</h3>
            <p className="text-xs text-rose-100/70 leading-relaxed">
              Analyzing D9 Navamsha charts, Venus-Mars placements, and 7th house lords to reveal soul-level karmic contracts and mutual growth potential.
            </p>
          </div>

          <div className="bg-black/30 p-6 rounded-2xl border border-rose-500/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold">
              02
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Healing Breakups &amp; Misunderstanding</h3>
            <p className="text-xs text-rose-100/70 leading-relaxed">
              Providing compassionate guidance through separation, communication blockages, third-party influences, and actionable remedies to restore emotional warmth.
            </p>
          </div>

          <div className="bg-black/30 p-6 rounded-2xl border border-rose-500/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold">
              03
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Marital Compatibility &amp; Longevity</h3>
            <p className="text-xs text-rose-100/70 leading-relaxed">
              Going far beyond simple Guna Milan by examining Nadi, Bhakoot, Manglik Dosha remedies, and personalized gemstone and mantra recommendations.
            </p>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between flex-wrap gap-4 border-t border-rose-500/20">
          <p className="text-xs text-rose-200/80">
            Seeking clarity in your romantic or marital life? Consultations are 100% confidential and judgment-free.
          </p>
          <button
            onClick={() => onNavigateTab("consultation")}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>Request Relationship Reading</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 3. Comprehensive Certified Disciplines */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
            Formal Qualifications &amp; Accreditations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Certified Master Across 8 Occult Disciplines
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            True spiritual insight requires comprehensive multidimensional knowledge. Rather than relying on a single method, I integrate these ancient sciences to deliver holistically accurate guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-3xl border border-amber-900/10 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center border shadow-xs group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-slate-900 leading-tight">
                      {item.title}
                    </h3>
                    <div className="text-[11px] font-semibold text-amber-800 mt-0.5">
                      {item.sanskrit}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Professionally Certified</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Life Domains & Results */}
      <section className="bg-amber-50/60 rounded-3xl border border-amber-900/10 p-8 sm:p-12 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-800 font-bold">
            Real Impact &amp; Life Transformation
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            How We Guide You Through Every Chapter
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Over the past decade, we have helped professionals, entrepreneurs, students, homemakers, and families unlock their divine potential across five core life domains:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((dom, i) => (
            <div 
              key={i}
              className={`p-6 rounded-2xl border transition-all ${
                dom.highlight 
                  ? "bg-gradient-to-br from-rose-900/10 via-amber-900/5 to-white border-rose-300 md:col-span-2 lg:col-span-2 shadow-xs" 
                  : "bg-white border-amber-900/10 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className={`font-serif font-bold text-base ${dom.highlight ? "text-rose-950 text-lg" : "text-slate-900"}`}>
                  {dom.title}
                </h3>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                  dom.highlight ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-900"
                }`}>
                  {dom.stat}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {dom.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. The Dev-Guru SaaS Vision */}
      <section className="bg-[#1E1B18] text-amber-100 p-8 sm:p-12 rounded-3xl border border-amber-500/20 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Why We Built Dev-Guru SaaS</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
              Preserving Sacred Heritage with Modern Software Precision
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed">
              Throughout my years of consulting, I saw seekers struggle with confusing apps, low-accuracy astrological software, and superstitious fear-mongering. Dev-Guru was created to change that forever.
            </p>
            <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed">
              We combined classical mathematical ephemeris algorithms (Swiss Ephemeris, Lahiri Ayanamsa, D1-D60 charts) with modern SaaS architecture so you receive authentic, transparent, and uplifting spiritual guidance at your fingertips.
            </p>
          </div>

          <div className="space-y-4 bg-[#26201B] p-6 rounded-2xl border border-amber-500/20 text-xs">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-amber-200">Zero Fear-Based Astrology</div>
                <p className="text-amber-100/70 mt-0.5">We focus on uplifting self-awareness, personal agency, and practical solutions rather than fatalism.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-amber-200">Authentic Certified Remedies</div>
                <p className="text-amber-100/70 mt-0.5">100% natural, lab-certified gemstones and consecrated Rudrakshas energized per Vedic Vidhi.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-amber-200">End-to-End Privacy</div>
                <p className="text-amber-100/70 mt-0.5">Your birth data and personal questions are strictly confidential and protected with enterprise encryption.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Call to Action */}
      <section className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Ready to Discover Your Destiny?
          </h2>
          <p className="text-amber-100 text-xs sm:text-sm leading-relaxed">
            Whether you are navigating a career transition, seeking love compatibility, or looking for certified gemstone recommendations, our sanctuary is here to guide you.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onNavigateTab("consultation")}
            className="px-8 py-3.5 rounded-2xl bg-white text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-100 shadow-lg transition-all cursor-pointer"
          >
            Book Personal Consultation
          </button>
          <button
            onClick={() => onNavigateTab("contact")}
            className="px-8 py-3.5 rounded-2xl bg-slate-950/40 border border-white/30 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-950/60 transition-all cursor-pointer"
          >
            Contact Sanctuary Office
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUsView;
