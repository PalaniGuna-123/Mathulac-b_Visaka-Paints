import { WoodSection } from '../features/surfaces';
import { ContactSection } from '../features/contact';
import { CheckCircle2 } from 'lucide-react';
import { Link } from '../routes/Router';

export function WoodPage() {
  const woodProducts = [
    {
      name: 'Mathulac Grain Lustre PU',
      tag: 'Polyurethane Topcoat',
      desc: 'High-build clear polyurethane coating offering maximum scratch resistance and grain clarity.',
      features: ['Moisture barrier', 'Non-yellowing UV shield', 'Satin & High Gloss variants'],
    },
    {
      name: 'Melamine Wood Seal',
      tag: 'Interior Furniture',
      desc: 'Fast-drying melamine clear coat designed for everyday wooden furniture and cabinets.',
      features: ['Quick 30-min tack dry', 'Heat & stain resistant', 'Smooth velvety feel'],
    },
    {
      name: 'Deep-Penetrating Wood Stain',
      tag: 'Natural Staining',
      desc: 'Translucent color stains that soak into hardwood fibres to highlight natural knots and swirls.',
      features: ['Teak, Walnut, Rosewood shades', 'Uniform penetration', 'Zero blotching'],
    },
  ];

  return (
    <div className="w-full pt-20">
      {/* Wood Showcase Hero */}
      <WoodSection />

      {/* Deep Dive System Specs */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-ink border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-extrabold uppercase tracking-widest border border-amber-500/30 mb-3">
              Architectural Timber Systems
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight tracking-tight">
              Engineered For Timber Resilience
            </h2>
            <p className="text-white/70 text-xs sm:text-sm mt-2.5 max-w-xl mx-auto leading-relaxed">
              Formulated specifically for Indian tropical climates to safeguard solid wood, veneers, MDF, and plywood.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {woodProducts.map((p) => (
              <div key={p.name} className="p-7 rounded-xl glass border border-amber-500/20 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
                    {p.tag}
                  </div>
                  <h3 className="font-display text-2xl text-white mb-2">{p.name}</h3>
                  <p className="text-white/65 text-sm leading-relaxed mb-6">{p.desc}</p>

                  <div className="space-y-2.5 pt-4 border-t border-white/10">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-xs text-white/85">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    to="/contact"
                    className="w-full py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-ink font-bold text-center block text-sm transition-all"
                  >
                    Request Wood Finish Sample
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <ContactSection />
    </div>
  );
}

export default WoodPage;
