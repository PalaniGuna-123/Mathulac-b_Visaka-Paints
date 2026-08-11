import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from '../../routes/Router';

export function DecorSection() {
  const decorFinishes = [
    { name: 'Texture Finish', color: '#FF1493', desc: 'Granular tactile depth' },
    { name: 'Metallic Finish', color: '#FFD400', desc: 'Luminescent gold & bronze sheen' },
    { name: 'Designer Stucco', color: '#7B2CFF', desc: 'Italian marble effect' },
    { name: 'Crackle Finish', color: '#00C8FF', desc: 'Artistic vintage texture' },
  ];

  return (
    <section
      id="decor"
      className="relative py-24 md:py-32 px-5 md:px-8 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #2a0a3a, #3a0a2a, #1a0a3a)' }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12" data-reveal>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-300 text-xs font-bold uppercase tracking-widest mb-3 border border-fuchsia-500/30">
            <Sparkles className="w-3.5 h-3.5" /> Decorative &amp; Textures
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-white mt-2">Walls Are Your Canvas</h2>
          <p className="text-white/70 mt-4 max-w-xl mx-auto">
            Textured, metallic and designer plaster finishes that turn plain drywall and masonry into expressive, high-impact statements.
          </p>
        </div>

        {/* Animated paint stroke SVG */}
        <div className="relative h-40 md:h-56 mb-12" data-reveal>
          <svg viewBox="0 0 1200 200" className="w-full h-full">
            <path
              id="paint-stroke-path"
              d="M 20 100 Q 200 20, 400 100 T 800 100 T 1180 100"
              fill="none"
              stroke="url(#stroke-grad)"
              strokeWidth="24"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="stroke-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FF1493" />
                <stop offset="25%" stopColor="#FF7A00" />
                <stop offset="50%" stopColor="#FFD400" />
                <stop offset="75%" stopColor="#67D600" />
                <stop offset="100%" stopColor="#7B2CFF" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {decorFinishes.map((d) => (
            <div
              key={d.name}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-xl border border-white/10"
              data-cursor="explore"
              data-reveal
            >
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                style={{ background: `radial-gradient(circle at 30% 30%, ${d.color}, ${d.color}40)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="font-display text-2xl font-bold">{d.name}</div>
                <div className="text-white/60 text-xs mt-1">{d.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/decor"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold bg-violet hover:bg-purple-600 text-white shadow-xl transition-all"
          >
            Explore Decorative Collection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DecorSection;
