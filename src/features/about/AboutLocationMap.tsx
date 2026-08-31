import { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  MessageSquare,
  CheckCircle2,
  Calendar,
  Send,
  Building2,
  ShieldCheck,
  Layers,
  ArrowRight,
  Star,
  ChevronDown,
} from 'lucide-react';

export function AboutLocationMap() {
  const [copied, setCopied] = useState(false);
  const [consultationSent, setConsultationSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    surface: 'Interior Walls',
    preferredDate: '',
    message: '',
  });

  const addressText = 'MATHULAC PAINT, S.F.NO:127/2A2, ELLAPALAYAM POST, POGALUR VIA, Kariampalayam, Coimbatore, Tamil Nadu 641697, India';
  const googleMapsSearchUrl = 'https://www.google.com/maps/search/?api=1&query=MATHULAC+PAINT+kariampalayam+Coimbatore+641697';
  const googleMapsDirectionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=MATHULAC+PAINT+kariampalayam+Coimbatore+641697';
  const googleMapsEmbedUrl = 'https://maps.google.com/maps?q=MATHULAC%20PAINT%20kariampalayam%20Coimbatore&t=&z=15&ie=UTF8&iwloc=&output=embed';

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(addressText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultationSent(true);
  };

  return (
    <section id="location-contact" className="relative py-16 md:py-20 px-4 md:px-8 bg-gradient-to-b from-surface-deep via-ink to-surface-deep overflow-hidden text-white">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-magenta/15 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan/15 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10" data-reveal>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-magenta/15 text-magenta text-[11px] font-extrabold uppercase tracking-widest border border-magenta/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-magenta" /> Verified Manufacturing Plant &amp; Experience Hub
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight tracking-tight">
            Get in <em>Touch</em> with Visaka
          </h2>
          <p className="text-white/70 text-xs sm:text-sm mt-2.5 max-w-xl mx-auto leading-relaxed">
            Visit our flagship manufacturing facility in Kariampalayam, Pogalur, Coimbatore, Tamil Nadu, or connect directly with our technical coatings specialists.
          </p>
        </div>

        {/* 2 Facility Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-12" data-reveal>
          {/* Location */}
          <div className="p-4 sm:p-5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-xl hover:border-yellow-400/40 transition-all group flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-yellow-400/20 flex items-center justify-center text-yellow-400 flex-shrink-0 group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-white/50 block">Manufacturing Plant &amp; HQ</span>
              <strong className="text-white font-bold text-sm sm:text-base mt-0.5 block leading-snug">
                Kariampalayam, Pogalur Via
              </strong>
              <p className="text-white/60 text-xs mt-0.5">Coimbatore, Tamil Nadu 641697</p>
            </div>
          </div>

          {/* Working Hours */}
          <div className="p-4 sm:p-5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-xl hover:border-leaf/40 transition-all group flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-leaf/20 flex items-center justify-center text-leaf flex-shrink-0 group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-white/50 block">Plant Timings</span>
              <strong className="text-white font-bold text-sm sm:text-base mt-0.5 block leading-snug">
                Monday – Saturday: 9:00 AM – 6:00 PM
              </strong>
              <p className="text-white/60 text-xs mt-0.5">Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Main Grid: Interactive Google Map + Request a Free Consultation Form */}
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
          {/* Left Column: Google Map Interactive Showcase (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-xl bg-white/[0.03] border border-white/10 p-3.5 sm:p-5 md:p-6 backdrop-blur-2xl shadow-2xl" data-reveal-left>
            <div>
              {/* Map Title Bar with Google Rating */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-white/10">
                <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-leaf animate-pulse mt-1 sm:mt-0 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <h3 className="text-white font-bold text-sm sm:text-base leading-tight">MATHULAC PAINT Kariampalayam</h3>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-300 text-[10px] font-extrabold flex-shrink-0">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> 4.1 (26)
                      </span>
                    </div>
                    <p className="text-white/60 text-[11px] sm:text-xs mt-0.5 break-words leading-relaxed">
                      S.F.No. 127/2A2, Ellapalayam Post, Pogalur Via, Kariampalayam, Coimbatore 641697
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={handleCopyAddress}
                    className="flex-1 sm:flex-initial px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    title="Copy full verified address"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>

                  <a
                    href={googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-magenta to-violet text-white text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 shadow-md hover:opacity-90 transition-opacity whitespace-nowrap"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Directions</span>
                  </a>
                </div>
              </div>

              {/* Embedded Google Map IFrame */}
              <div className="relative w-full aspect-[16/10] min-h-[260px] sm:min-h-[340px] rounded-xl overflow-hidden border border-white/15 bg-black/40 shadow-inner">
                <iframe
                  title="MATHULAC PAINT Kariampalayam Coimbatore Google Map"
                  src={googleMapsEmbedUrl}
                  className="w-full h-full border-0 filter contrast-[1.08] saturate-[1.1]"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Bottom Map Feature Highlights */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3.5 sm:pt-5 mt-3.5 sm:mt-5 border-t border-white/10">
              <div className="text-center p-2 sm:p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-cyan mx-auto mb-1" />
                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-white/50 block tracking-wider">ISO 9001:2015</span>
                <strong className="text-[10px] sm:text-xs text-white block mt-0.5">Quality Assured</strong>
              </div>

              <div className="text-center p-2 sm:p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mx-auto mb-1" />
                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-white/50 block tracking-wider">Est. 2004</span>
                <strong className="text-[10px] sm:text-xs text-white block mt-0.5">20+ Yrs in CBE</strong>
              </div>

              <div className="text-center p-2 sm:p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-magenta mx-auto mb-1" />
                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-white/50 block tracking-wider">Google Maps</span>
                <a
                  href={googleMapsSearchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] sm:text-xs text-magenta font-bold hover:underline inline-block mt-0.5"
                >
                  Open Maps
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Request a Free Consultation Form (5 cols) */}
          <div className="lg:col-span-5 rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.03] border border-white/15 p-4 sm:p-6 md:p-8 backdrop-blur-2xl shadow-2xl flex flex-col justify-between" data-reveal-right>
            <div>
              <div className="flex items-center gap-2 text-magenta text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-1.5 sm:mb-2">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-magenta" /> Direct Technical Desk
              </div>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-white">
                Request a Free Consultation
              </h3>
              <p className="text-white/70 text-xs sm:text-sm mt-1.5 sm:mt-2 leading-relaxed">
                Need color recommendation, moisture-proofing advice, or project estimation? Fill in your details and our Coimbatore team will get in touch with you.
              </p>

              {consultationSent ? (
                <div className="mt-8 p-8 rounded-xl bg-white/[0.05] border border-green-500/30 text-center animate-menu-drop">
                  <div className="w-14 h-14 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-display text-2xl text-white">Request Received!</h4>
                  <p className="text-white/80 text-xs sm:text-sm mt-2 leading-relaxed">
                    Thank you, <strong className="text-white">{formData.name || 'Friend'}</strong>. Our coatings specialist from Coimbatore will call you at <span className="text-cyan font-bold">{formData.phone}</span> shortly.
                  </p>

                  <button
                    onClick={() => {
                      setConsultationSent(false);
                      setFormData({ name: '', phone: '', email: '', surface: 'Interior Walls', preferredDate: '', message: '' });
                    }}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConsultationSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-white/85 text-xs font-bold uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-ink/90 border border-white/20 text-white placeholder-white/45 text-sm focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta transition-all shadow-inner"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-white/85 text-xs font-bold uppercase tracking-wider mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 93631 14313"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-ink/90 border border-white/20 text-white placeholder-white/45 text-sm focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta transition-all shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="block text-white/85 text-xs font-bold uppercase tracking-wider mb-1.5">
                        Surface / Application
                      </label>
                      <div className="relative">
                        <select
                          value={formData.surface}
                          onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-ink/90 border border-white/20 text-white text-sm focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta appearance-none pr-10 cursor-pointer transition-all shadow-inner"
                        >
                          <option value="Interior Walls" className="bg-[#0B1020] text-white">Interior Living &amp; Ceiling</option>
                          <option value="Exterior Walls" className="bg-[#0B1020] text-white">Exterior Weather Coat</option>
                          <option value="Wood Finishes" className="bg-[#0B1020] text-white">Wood &amp; PU Polish</option>
                          <option value="Automotive Refinishing" className="bg-[#0B1020] text-white">Automotive Coating</option>
                          <option value="Metal & Industrial" className="bg-[#0B1020] text-white">Metal &amp; Industrial</option>
                          <option value="Designer Textures" className="bg-[#0B1020] text-white">Designer Stucco &amp; Decor</option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/85 text-xs font-bold uppercase tracking-wider mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-ink/90 border border-white/20 text-white placeholder-white/45 text-sm focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta transition-all shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-white/85 text-xs font-bold uppercase tracking-wider mb-1.5">
                      Requirement / Space Details
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe your residential, commercial, or industrial coating requirement in Coimbatore or across India..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-ink/90 border border-white/20 text-white placeholder-white/45 text-sm focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta transition-all resize-none shadow-inner"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-magenta via-pink-600 to-violet text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-magenta/30 hover:opacity-95 transition-all hover:scale-[1.01] cursor-pointer"
                  >
                    <span>Request a Free Consultation</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Direct Hotline Footer strip */}
            <div className="pt-3.5 sm:pt-4 mt-4 sm:mt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-white/60">
              <span>Quick response guaranteed</span>
              <a href="tel:+919363114343" className="text-magenta font-bold hover:underline inline-flex items-center gap-1">
                Call +91 93631 14313 <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutLocationMap;
