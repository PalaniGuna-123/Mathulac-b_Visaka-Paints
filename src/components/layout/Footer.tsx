import { Instagram, Facebook, Linkedin, Phone, MapPin, Mail, Globe, User, ArrowUpRight, Navigation, MessageCircle } from 'lucide-react';
import { navItems, phoneNumbers, companyContact } from '../../data';
import { categories } from '../../data/products';
import { Link } from '../../routes/Router';
import mathulacLogo from '../../assets/logo/visaka-chemicals-white-logo.png';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = `https://wa.me/${companyContact.whatsappPhone}?text=${encodeURIComponent(
    'Hi Visaka Paints And Chemicals, I would like to inquire about your products and services.'
  )}`;

  return (
    <footer className="relative pt-16 pb-12 px-4 sm:px-6 md:px-8 bg-ink overflow-hidden border-t border-white/10 text-white">
      {/* Decorative gradient top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-magenta via-flame to-violet" />

      <div className="max-w-[1400px] mx-auto">
        {/* ============================================================ */}
        {/* 1. BALANCED 4-COLUMN MAIN GRID                                */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-10">
          
          {/* Col 1: Brand & Credentials (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <div className="footer-paint-signoff mb-3" data-paint-heading>
              <img
                src={mathulacLogo}
                alt={companyContact.companyName}
                className="h-10 sm:h-11 w-auto object-contain brightness-105"
              />
              <span className="footer-paint-signoff__stroke" aria-hidden="true" />
              <i aria-hidden="true" />
              <i aria-hidden="true" />
            </div>

            <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-4 max-w-sm">
              Color that inspires. Protection that lasts. Premium architectural, wood, automotive, and industrial coatings engineered for lasting performance since 2004.
            </p>

            {/* Verification badges */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-[11px] text-yellow-300 font-medium">
                {companyContact.certification}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-[11px] font-mono text-cyan">
                GSTIN: {companyContact.gstin}
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Linkedin, label: 'LinkedIn' },
              ].map(({ icon: Social, label }, index) => (
                <a
                  key={index}
                  href="#top"
                  aria-label={`Mathulac ${label}`}
                  className="w-8 h-8 grid place-items-center rounded-full border border-white/15 text-white/70 hover:text-white hover:border-magenta hover:bg-magenta/20 transition-all focus:outline-none focus:ring-2 focus:ring-magenta"
                >
                  <Social className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Pages (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-wider text-white/90">
              Explore Pages
            </h4>
            <div className="flex flex-col gap-2">
              {navItems.map((n) => (
                <Link
                  key={n.id}
                  to={n.path}
                  className="text-white/65 text-xs sm:text-sm hover:text-magenta transition-colors inline-flex items-center gap-1 group py-0.5"
                >
                  <span>{n.label}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-magenta" />
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: Product Systems (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-wider text-white/90">
              Product Systems
            </h4>
            <div className="flex flex-col gap-2">
              {categories.slice(0, 6).map((c) => (
                <Link
                  key={c.id}
                  to={`/products?category=${c.id}`}
                  className="text-white/65 text-xs sm:text-sm hover:text-cyan transition-colors py-0.5"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4: Direct Contact (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-wider text-white/90">
              Direct Contact
            </h4>

            <div className="space-y-3 text-xs sm:text-sm">
              {/* Contact Person */}
              <div className="flex items-center gap-2 text-white/90">
                <User className="w-4 h-4 text-magenta shrink-0" />
                <div>
                  <span className="text-[10px] text-white/45 uppercase tracking-wider block">Contact Person</span>
                  <strong className="text-white font-bold">{companyContact.contactPerson}</strong>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="space-y-1 pt-1">
                {phoneNumbers.map((p, idx) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/\s/g, '')}`}
                    className="flex items-center gap-2 text-white/75 hover:text-leaf transition-colors py-0.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-leaf shrink-0" />
                    <span className="font-semibold">{p}</span>
                    {idx === 0 && (
                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-leaf/20 text-leaf font-bold">
                        Primary
                      </span>
                    )}
                  </a>
                ))}
              </div>

              {/* Email Addresses */}
              <div className="space-y-1 pt-1">
                {companyContact.emails.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 text-white/70 hover:text-cyan transition-colors py-0.5 break-all text-xs"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan shrink-0" />
                    <span>{email}</span>
                  </a>
                ))}
              </div>

              {/* Website */}
              <div className="pt-1">
                <a
                  href={companyContact.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-yellow-300 transition-colors text-xs"
                >
                  <Globe className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                  <span>{companyContact.website}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. DEDICATED LETTER CORRESPONDENCE & PLANT FACILITY CARD     */}
        {/* ============================================================ */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.025] border border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-8">
          <div className="flex items-start gap-3.5 max-w-2xl">
            <div className="w-10 h-10 rounded-xl bg-magenta/15 border border-magenta/25 flex items-center justify-center text-magenta shrink-0 mt-0.5">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-magenta">
                Letter Correspondence &amp; Plant
              </div>
              <h5 className="text-white font-bold text-sm sm:text-base mt-0.5">
                {companyContact.companyName}
              </h5>
              <p className="text-white/65 text-xs sm:text-sm mt-0.5 leading-relaxed">
                Sf.No.:127/2A2, Kariyampalayam, Ellapalayam ( P.O.), Coimbatore, Tamil Nadu - 641 697.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-stretch sm:self-auto justify-start md:justify-end pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
            <a
              href={companyContact.googleMapsDirectionsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
            >
              <Navigation className="w-3.5 h-3.5 text-cyan" />
              <span>Get Directions</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. BOTTOM BAR (Spaced to avoid overlapping WhatsApp button)   */}
        {/* ============================================================ */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs pr-0 sm:pr-20 md:pr-24">
          <div className="text-white/50 text-center md:text-left leading-relaxed">
            © {currentYear} {companyContact.companyName}. All rights reserved. Mathulac is a registered trademark.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] text-white/60 font-semibold uppercase tracking-wider">
            <span className="rounded-md border border-white/10 px-2.5 py-1 bg-white/[0.03]">
              Quality Assured
            </span>
            <span className="rounded-md border border-white/10 px-2.5 py-1 bg-white/[0.03]">
              ISO 9001:2015 Process
            </span>
            <span className="rounded-md border border-white/10 px-2.5 py-1 bg-white/[0.03]">
              Eco Safe Coatings
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

