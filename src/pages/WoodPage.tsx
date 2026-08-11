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
      <section className="py-20 px-5 md:px-8 bg-ink border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <span className="text-amber-400 font-bold uppercase tracking-widest text-xs">Architectural Timber Systems</span>
            <h2 className="font-display text-4xl md:text-5xl text-white mt-2">Engineered For Timber Resilience</h2>
            <p className="text-white/65 max-w-xl mx-auto mt-4 text-sm">
              Formulated specifically for Indian tropical climates to safeguard solid wood, veneers, MDF, and plywood.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {woodProducts.map((p) => (
              <div key={p.name} className="p-7 rounded-2xl glass border border-amber-500/20 shadow-xl flex flex-col justify-between">
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
