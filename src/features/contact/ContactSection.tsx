import { useState } from 'react';
import { Phone, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { phoneNumbers } from '../../data';

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    surface: 'Interior Walls',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="relative py-16 md:py-20 px-4 md:px-8 overflow-hidden">
      {/* Dynamic Background */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #E6007E, #7B2CFF, #146BFF)' }}
      />
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 20% 30%, #FFD400, transparent 40%), radial-gradient(circle at 80% 70%, #67D600, transparent 40%)',
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10" data-reveal>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 text-white text-[11px] font-extrabold uppercase tracking-widest mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Start Your Project
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight tracking-tight">
            Ready to Add Color to Your World?
          </h2>
          <p className="text-white/80 text-xs sm:text-sm mt-2.5 max-w-xl mx-auto leading-relaxed">
            Direct hotline &amp; technical inquiry desk for painters, architects, contractors, and homeowners.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {phoneNumbers.map((p) => (
              <a
                key={p}
                href={`tel:${p.replace(/\s/g, '')}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-white text-xs sm:text-sm font-bold hover:bg-white/20 shadow-md transition-transform hover:scale-105"
              >
                <Phone className="w-4 h-4 text-yellow-300" /> {p}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="max-w-lg mx-auto p-5 sm:p-7 rounded-xl glass shadow-2xl border border-white/25" data-reveal>
          {sent ? (
            <div className="text-center py-12 animate-menu-drop">
              <div className="w-16 h-16 rounded-full bg-white/20 mx-auto flex items-center justify-center mb-4 text-white">
                <CheckCircle2 className="w-9 h-9 text-green-300" />
              </div>
              <h3 className="font-display text-3xl text-white">Thank You!</h3>
              <p className="text-white/85 mt-2 text-sm leading-relaxed">
                Your inquiry has been received. Our technical team in Coimbatore will get in touch with you shortly.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setFormData({ name: '', phone: '', email: '', surface: 'Interior Walls', message: '' });
                }}
                className="mt-6 px-6 py-2.5 rounded-xl bg-white/20 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/30"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-xs font-bold uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/25 text-white placeholder-white/50 focus:outline-none focus:border-white focus:bg-white/20 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-xs font-bold uppercase tracking-wider mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/25 text-white placeholder-white/50 focus:outline-none focus:border-white focus:bg-white/20 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-xs font-bold uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/25 text-white placeholder-white/50 focus:outline-none focus:border-white focus:bg-white/20 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-white/80 text-xs font-bold uppercase tracking-wider mb-1.5">
                  Surface / Coating System
                </label>
                <select
                  value={formData.surface}
                  onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-ink/70 border border-white/25 text-white focus:outline-none focus:border-white transition-all text-sm"
                >
                  <option value="Interior Walls" className="bg-ink text-white">Interior Living &amp; Ceiling</option>
                  <option value="Exterior Walls" className="bg-ink text-white">Exterior Monsoon Weather Coat</option>
                  <option value="Wood Finishes" className="bg-ink text-white">Wood &amp; Furniture Finishes</option>
                  <option value="Automotive Refinishing" className="bg-ink text-white">Automotive Refinishing</option>
                  <option value="Metal & Industrial" className="bg-ink text-white">Metal &amp; Structural Steel</option>
                  <option value="Decorative Finishes" className="bg-ink text-white">Designer Textures &amp; Stucco</option>
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-xs font-bold uppercase tracking-wider mb-1.5">
                  Project Details *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about the area, requirement, or shades you are interested in..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/25 text-white placeholder-white/50 focus:outline-none focus:border-white focus:bg-white/20 transition-all resize-none text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-white text-ink font-bold flex items-center justify-center gap-2 hover:bg-cream shadow-xl transition-all hover:scale-[1.02]"
              >
                <span>Send Inquiry &amp; Request Callback</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
