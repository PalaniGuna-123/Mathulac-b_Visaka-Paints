import { ArrowRight, Zap } from 'lucide-react';
import { Link } from '../../routes/Router';

export function AutoSection() {
  return (
    <section id="auto" className="relative h-screen min-h-[620px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://images.pexels.com/photos/34042808/pexels-photo-34042808.jpeg?auto=compress&cs=tinysrgb&w=1920)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/65 to-transparent" />
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-5 md:px-8 flex items-center">
        <div className="max-w-xl" data-reveal-left>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-[11px] font-bold uppercase tracking-widest mb-2.5 border border-red-500/30">
            <Zap className="w-3.5 h-3.5 text-red-400" /> Automotive Refinishing
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white mt-1 leading-tight">Built to Shine</h2>
          <p className="text-white/80 text-xs sm:text-sm mt-3 leading-relaxed">
            Automotive refinishing systems engineered for deep gloss, supreme durability, and a showroom mirror finish — featuring specialized fast-curing primers, smooth body putties, rich enamels, and high-solid clearcoats.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 max-w-md">
            {[
              { label: 'Gloss Rating', value: 'Ultra Mirror' },
              { label: 'Durability', value: 'High Scratch Resistance' },
              { label: 'Turnaround', value: 'Fast Curing' },
              { label: 'Protection', value: 'UV & Chemical Guard' },
            ].map((t) => (
              <div key={t.label} className="p-4 rounded-xl glass border border-white/10">
                <div className="text-white/50 text-[10px] uppercase font-bold tracking-wider">{t.label}</div>
                <div className="text-white font-bold mt-1">{t.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              to="/auto"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-ember hover:bg-red-600 text-white shadow-xl transition-all"
            >
              Explore Auto Systems <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AutoSection;
