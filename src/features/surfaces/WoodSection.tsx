import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from '../../routes/Router';

export function WoodSection() {
  const woodImages = [
    'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=85',
    'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85',
  ];

  return (
    <section
      id="wood"
      className="relative py-14 sm:py-20 px-5 md:px-8 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #2a1a0a, #4a2f10, #2a1a0a)' }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div data-reveal-left>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold uppercase tracking-widest mb-2.5 border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Wood Finishes
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-amber-50 mt-1 leading-tight">Bring Wood to Life</h2>
            <p className="text-amber-100/70 text-xs sm:text-sm mt-3 leading-relaxed max-w-md">
              Polyurethane and melamine systems engineered to nourish timber, protect from termite damage and moisture, and enhance natural grain patterns across furniture, doors, and architectural woodwork.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { name: 'Matt', desc: 'Organic Velvet' },
                { name: 'Gloss', desc: 'Mirror Lustre' },
                { name: 'Satin', desc: 'Silky Sheen' },
              ].map((f) => (
                <div key={f.name} className="p-4 rounded-xl bg-amber-950/40 border border-amber-700/30 text-center">
                  <div className="text-amber-200 font-bold text-lg">{f.name}</div>
                  <div className="text-amber-100/50 text-xs mt-1">{f.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                to="/specifications?division=wood"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-ink shadow-xl transition-all"
              >
                View Wood Systems <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4" data-reveal-right>
            {woodImages.map((src, i) => (
              <div key={i} className="flex-shrink-0 w-64 aspect-[3/4] rounded-xl overflow-hidden group shadow-2xl border border-amber-700/20">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${src})` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WoodSection;
