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
      <section className="py-24 px-5 md:px-8 bg-ink border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-violet font-bold uppercase tracking-widest text-xs">Designer Feature Walls</span>
            <h2 className="font-display text-4xl md:text-6xl text-white mt-2">Sculpted Light &amp; Texture</h2>
            <p className="text-white/70 max-w-xl mx-auto mt-4 text-sm md:text-base">
              Turn hospitality spaces, master suites, and commercial reception areas into unforgettable visual focal points.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-7">
            {finishes.map((f) => (
              <div
                key={f.title}
                className="p-8 rounded-3xl glass border border-white/10 shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                    style={{ background: `${f.color}25`, border: `1px solid ${f.color}60` }}
                  >
                    <Sparkles className="w-6 h-6" style={{ color: f.color }} />
                  </div>
                  <div className="text-xs uppercase font-extrabold tracking-wider" style={{ color: f.color }}>
                    {f.subtitle}
                  </div>
                  <h3 className="font-display text-3xl text-white mt-2 mb-3">{f.title}</h3>
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
