import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from '../../routes/Router';
import { BRAND_COLORS } from '../../styles/colors';
import { PaintSplash } from '../../components/paint';

export function DecorSection() {
  const decorFinishes = [
    { name: 'Texture Finish', color: BRAND_COLORS.hotpink, desc: 'Granular tactile depth' },
    { name: 'Metallic Finish', color: BRAND_COLORS.sun, desc: 'Luminescent gold & bronze sheen' },
    { name: 'Designer Stucco', color: BRAND_COLORS.violet, desc: 'Italian marble effect' },
    { name: 'Crackle Finish', color: BRAND_COLORS.cyan, desc: 'Artistic vintage texture' },
  ];

  return (
    <section
      id="decor"
      className="relative py-16 md:py-20 px-4 md:px-8 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #2a0a3a, #3a0a2a, #1a0a3a)' }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="relative isolate text-center max-w-3xl mx-auto mb-10" data-reveal data-splash-trigger>
          <PaintSplash
            color="#7b2cff"
            size="small"
            variant="impact"
            trigger="scroll"
            className="surface-section-title-splash surface-section-title-splash--center"
          />
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-300 text-[11px] font-extrabold uppercase tracking-widest mb-3 border border-fuchsia-500/30">
            <Sparkles className="w-3.5 h-3.5" /> Decorative &amp; Textures
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight tracking-tight">
            Walls Are Your Canvas
          </h2>
          <p className="text-white/70 text-xs sm:text-sm mt-2.5 max-w-xl mx-auto leading-relaxed">
            Textured, metallic and designer plaster finishes that turn plain drywall and masonry into expressive, high-impact statements.
          </p>
        </div>

        {/* Animated paint stroke SVG */}
        <div className="relative h-24 md:h-36 mb-8" data-reveal>
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
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-xl border border-white/10"
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
            className="paint-button inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold bg-violet hover:bg-purple-600 text-white shadow-xl transition-all"
          >
            Explore Decorative Collection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DecorSection;
