import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Navigation,
  ExternalLink,
  Sparkles,
  Send,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { companyContact } from '../data/brand';
import mathulacLogo from '../assets/logo/logo.jpeg';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    surface: 'Interior Living & Ceiling',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full pt-28 pb-24 bg-ink min-h-screen text-white">
      {/* Top Banner Header */}
      <div className="relative py-10 md:py-14 px-4 md:px-8 overflow-hidden border-b border-white/10 mb-10 md:mb-14">
        {/* Ambient Gradient Glows */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 20%, #7B2CFF 0%, #1A0B2E 50%, #0B1020 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 20% 50%, #E6007E 0%, transparent 40%), radial-gradient(circle at 80% 30%, #00C8FF 0%, transparent 40%)',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-extrabold uppercase tracking-widest mb-3 border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>VISAKA PAINTS &amp; CHEMICALS INDIA • AN ISO 9001 CERTIFIED COMPANY</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            <span className="text-magenta">Contact</span> Us &amp;{' '}
            <span className="text-cyan">Location</span> Map
          </h1>

          <p className="text-white/80 text-sm sm:text-base mt-2.5 max-w-2xl mx-auto leading-relaxed">
            Reach out directly to our manufacturing headquarters, technical coatings laboratory, and color consultancy desk in Coimbatore.
          </p>
        </div>
      </div>

      {/* Main Top Row: Left (Contact Us) | Right (Location Map) */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* ============================================================ */}
          {/* LEFT SIDE: Contact Us Information (Vertically Centered & Balanced) */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            {/* Title Header */}
            <div className="pb-3 mb-6 border-b border-white/10">
              <h2 className="font-display text-3xl sm:text-4xl text-white tracking-tight">
                <span className="text-magenta">Contact</span> Us
              </h2>
            </div>

            {/* Vertically Centered Contact Content Block */}
            <div className="flex-1 flex flex-col justify-center py-4 space-y-7">
              {/* Brand Logo & Name */}
              <div className="flex items-center gap-4">
                <img
                  src={mathulacLogo}
                  alt={companyContact.companyName}
                  className="h-16 w-auto object-contain rounded-lg bg-white p-1.5 shadow-md flex-shrink-0"
                />
                <div>
                  <h3 className="font-bold text-white text-lg sm:text-xl tracking-wide uppercase leading-tight">
                    {companyContact.companyName}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-yellow-300 mt-1">
                    <Award className="w-3.5 h-3.5 text-yellow-400" />
                    <span>{companyContact.certification}</span>
                  </div>
                </div>
              </div>

              {/* Content Details */}
              <div className="space-y-6 text-sm sm:text-base leading-relaxed text-white/90">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-magenta/20 flex items-center justify-center text-magenta flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5 font-medium leading-snug">
                    <div>S.F.No.127/2A2, Kariampalayam,</div>
                    <div>Ellapalayam ( P.O.) Pogalur (Via),</div>
                    <div>Coimbatore - 641 697. TamilNadu, INDIA</div>
                  </div>
                </div>

                {/* Mobile */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-leaf/20 flex items-center justify-center text-leaf flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="leading-snug">
                    <span className="font-bold text-white">Mobile: </span>
                    <a
                      href="tel:+919363114313"
                      className="text-white hover:text-leaf font-semibold transition-colors"
                    >
                      +91 93631 14313
                    </a>
                    <span className="text-white/40 mx-1.5">,</span>
                    <a
                      href="tel:+919600909056"
                      className="text-white hover:text-leaf font-semibold transition-colors"
                    >
                      96009 09056
                    </a>
                    <span className="text-white/40 mx-1.5">,</span>
                    <a
                      href="tel:+919600909077"
                      className="text-white hover:text-leaf font-semibold transition-colors"
                    >
                      96009 09077
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan/20 flex items-center justify-center text-cyan flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="leading-snug">
                    <span className="font-bold text-white">Email: </span>
                    <a
                      href="mailto:visaka_cbe@yahoo.co.in"
                      className="text-cyan hover:underline font-semibold transition-colors"
                    >
                      visaka_cbe@yahoo.co.in
                    </a>
                    <span className="text-white/40 mx-1.5">,</span>
                    <a
                      href="mailto:mathulac.cbe@gmail.com"
                      className="text-cyan hover:underline font-semibold transition-colors"
                    >
                      mathulac.cbe@gmail.com
                    </a>
                  </div>
                </div>

                {/* Web */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-yellow-400/20 flex items-center justify-center text-yellow-400 flex-shrink-0 mt-0.5">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="leading-snug">
                    <span className="font-bold text-white">Web: </span>
                    <a
                      href="https://www.mathulac.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-yellow-300 hover:underline font-semibold transition-colors"
                    >
                      www.mathulac.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Spacer to match right column buttons */}
            <div className="hidden lg:block h-[48px]" />
          </div>

          {/* ============================================================ */}
          {/* RIGHT SIDE: Location Map */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            {/* Title Header */}
            <div className="pb-3 mb-6 border-b border-white/10">
              <h2 className="font-display text-3xl sm:text-4xl text-white tracking-tight">
                <span className="text-magenta">Location</span> Map
              </h2>
            </div>

            {/* Clean, Full Interactive Google Map Container */}
            <div className="w-full h-[380px] sm:h-[400px] rounded-2xl overflow-hidden border border-white/20 bg-midnight shadow-2xl relative">
              <iframe
                title="MATHULAC PAINT Kariampalayam Coimbatore Google Map"
                src={companyContact.googleMapsEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Direct Map Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <a
                href={companyContact.googleMapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-magenta to-violet text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg hover:opacity-95 transition-all hover:scale-[1.01]"
              >
                <Navigation className="w-4 h-4 text-yellow-300" />
                <span>Get Directions on Google Maps</span>
              </a>

              <a
                href={companyContact.googleMapsSearchUrl}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <ExternalLink className="w-4 h-4 text-cyan" />
                <span>Open Full Location in Maps</span>
              </a>
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* CENTERED BELOW: Send Us a Message (Inquiry Form) */}
        {/* ============================================================ */}
        <div id="inquiry" className="max-w-3xl mx-auto mt-16 md:mt-20 scroll-mt-28">
          <div id="contact-form" className="p-7 md:p-10 rounded-2xl bg-midnight/90 border border-white/15 backdrop-blur-xl shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 text-magenta text-xs font-extrabold uppercase tracking-widest mb-2">
                <Sparkles className="w-4 h-4" /> Direct Project Inquiry
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-white">Send Us a Message</h3>
              <p className="text-white/70 text-xs sm:text-sm mt-1.5 leading-relaxed">
                Tell us about your painting requirement or shade consultation needs. Our technical experts in Coimbatore will get back to you promptly.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-xl bg-ink/70 border border-green-400/40 text-center animate-menu-drop">
                <div className="w-14 h-14 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-display text-2xl text-white">Inquiry Received!</h4>
                <p className="text-white/85 text-sm mt-2 leading-relaxed max-w-md mx-auto">
                  Thank you, <strong className="text-white">{formData.name || 'valued customer'}</strong>. Our coatings expert from Coimbatore will contact you at <span className="text-cyan font-bold">{formData.phone}</span>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', surface: 'Interior Living & Ceiling', message: '' });
                  }}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 text-xs font-bold uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-ink/80 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-xs font-bold uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 93631 14313"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-ink/80 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 text-xs font-bold uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-ink/80 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-xs font-bold uppercase tracking-wider mb-1.5">
                      Coating System
                    </label>
                    <select
                      value={formData.surface}
                      onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-ink border border-white/25 text-white text-sm focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta transition-all"
                    >
                      <option value="Interior Living & Ceiling" className="bg-ink text-white">Interior Living &amp; Ceiling</option>
                      <option value="Exterior Monsoon Weather Coat" className="bg-ink text-white">Exterior Monsoon Weather Coat</option>
                      <option value="Wood & Furniture Finishes" className="bg-ink text-white">Wood &amp; Furniture Finishes</option>
                      <option value="Automotive Refinishing" className="bg-ink text-white">Automotive Refinishing</option>
                      <option value="Metal & Industrial" className="bg-ink text-white">Metal &amp; Industrial Coatings</option>
                      <option value="Decorative Stucco & Textures" className="bg-ink text-white">Decorative Stucco &amp; Textures</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 text-xs font-bold uppercase tracking-wider mb-1.5">
                    Project Requirement *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about the area in sq.ft, surface type, shades required, or contractor orders..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-ink/80 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-magenta via-pink-600 to-violet text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-magenta/25 hover:opacity-95 transition-all hover:scale-[1.01] cursor-pointer"
                >
                  <span>Submit Inquiry &amp; Request Callback</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ContactPage;
