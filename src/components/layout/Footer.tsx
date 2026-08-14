import { Instagram, Facebook, Linkedin, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { navItems, categories, phoneNumbers } from '../../data';
import { Link } from '../../routes/Router';
import mathulacLogo from '../../assets/logo/logo.jpeg';

export function Footer() {
  return (
    <footer className="relative pt-20 pb-10 px-5 md:px-8 bg-ink overflow-hidden border-t border-white/10">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-magenta via-flame to-violet" />

      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-14">
          {/* Brand Col */}
          <div>
            <div className="footer-paint-signoff mb-4" data-paint-heading>
              <img
                src={mathulacLogo}
                alt="Visaka Mathulac Paints & Chemicals India"
                className="h-12 w-auto object-contain rounded-md"
              />
              <span className="footer-paint-signoff__stroke" aria-hidden="true" />
              <i aria-hidden="true" />
              <i aria-hidden="true" />
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Color that inspires. Protection that lasts. Premium architectural, wood, automotive and decorative coatings since 2004.
            </p>
            <div className="flex gap-2.5 mt-6">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Linkedin, label: 'LinkedIn' },
              ].map(({ icon: Social, label }, index) => (
                <a
                  key={index}
                  href="#top"
                  aria-label={`Mathulac ${label}`}
                  className="w-9 h-9 grid place-items-center rounded-full border border-white/15 text-white/70 hover:text-white hover:border-magenta hover:bg-magenta/20 transition-all"
                >
                  <Social className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Pages */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Explore Pages</h4>
            <div className="flex flex-col gap-2.5">
              {navItems.map((n) => (
                <Link
                  key={n.id}
                  to={n.path}
                  className="text-white/65 text-sm hover:text-magenta transition-colors inline-flex items-center gap-1 group"
                >
                  <span>{n.label}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-magenta" />
                </Link>
              ))}
            </div>
          </div>

          {/* Surface Categories */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Product Systems</h4>
            <div className="flex flex-col gap-2.5">
              {categories.slice(0, 6).map((c) => (
                <Link
                  key={c.id}
                  to={`/products?category=${c.id}`}
                  className="text-white/65 text-sm hover:text-cyan transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Get in Touch</h4>
            <div className="flex flex-col gap-3">
              {phoneNumbers.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-white/70 text-sm hover:text-leaf transition-colors"
                >
                  <Phone className="w-4 h-4 text-leaf" /> {p}
                </a>
              ))}
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-magenta" /> Coimbatore, Tamil Nadu, India
              </div>
              <div className="mt-2">
                <Link
                  to="/contact"
                  className="paint-button inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/10 text-white"
                >
                  Request a Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/50 text-xs text-center md:text-left">
            © {new Date().getFullYear()} Visaka Paints & Chemicals India. All rights reserved. Mathulac is a registered trademark.
          </div>
          <div className="flex items-center gap-2 text-[10px] text-white/60 font-bold uppercase tracking-wider">
            <span className="rounded-full border border-cyan/50 px-2.5 py-1 text-cyan bg-cyan/10">Quality Assured</span>
            <span className="rounded-full border border-leaf/50 px-2.5 py-1 text-leaf bg-leaf/10">ISO 9001 Process</span>
            <span className="rounded-full border border-magenta/50 px-2.5 py-1 text-magenta bg-magenta/10">Eco Safe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
