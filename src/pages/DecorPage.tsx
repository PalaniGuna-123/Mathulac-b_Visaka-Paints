import { DecorSection } from '../features/surfaces';
import { ContactSection } from '../features/contact';
import { Sparkles } from 'lucide-react';
import { Link } from '../routes/Router';

export function DecorPage() {
  const finishes = [
    {
      title: 'Artisan Stucco Veneziano',
      subtitle: 'Polished Venetian Plaster',
      desc: 'Layers of mineral acrylic plaster burnished to create the illusion of smooth, polished natural marble with rich depth.',
      color: '#7B2CFF',
    },
    {
      title: 'Metallic Gold & Bronze Glimmer',
      subtitle: 'Lustrous Pearl & Metallic',
      desc: 'Light-reflective mica pigments that shimmer delicately under warm ambient room illumination.',
      color: '#FFD400',
    },
    {
      title: 'Tactile Sand Dune Texture',
      subtitle: 'Natural Granular Wall Relief',
      desc: 'Fine quartz micro-beads suspended in weather-tough resins for dimensional touch and acoustic softening.',
      color: '#FF1493',
    },
  ];

  return (
    <div className="w-full pt-20">
      {/* Decorative Wall Hero */}
      <DecorSection />

      {/* Specialty Architectural Finishes */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-ink border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-violet/20 text-violet text-[11px] font-extrabold uppercase tracking-widest border border-violet/30 mb-3">
              Designer Feature Walls
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight tracking-tight">
              Sculpted Light &amp; Texture
            </h2>
            <p className="text-white/70 text-xs sm:text-sm mt-2.5 max-w-xl mx-auto leading-relaxed">
              Turn hospitality spaces, master suites, and commercial reception areas into unforgettable visual focal points.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-7">
            {finishes.map((f) => (
              <div
                key={f.title}
                className="p-8 rounded-xl glass border border-white/10 shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg"
                    style={{ background: `${f.color}25`, border: `1px solid ${f.color}60` }}
                  >
                    <Sparkles className="w-6 h-6" style={{ color: f.color }} />
                  </div>
                  <div className="text-xs uppercase font-extrabold tracking-wider" style={{ color: f.color }}>
                    {f.subtitle}
                  </div>
                  <h3 className="font-display text-2xl text-white mt-2 mb-3">{f.title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">{f.desc}</p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <Link
                    to="/contact"
                    className="w-full py-3.5 rounded-xl font-bold text-center block text-sm text-white shadow-lg transition-transform hover:scale-105"
                    style={{ background: f.color }}
                  >
                    Request Architect Swatch Kit
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

export default DecorPage;
