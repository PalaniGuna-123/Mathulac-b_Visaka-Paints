import { services } from '../../data';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from '../../routes/Router';

export function ServicesSection() {
  return (
    <section id="services" className="relative py-16 md:py-20 px-4 md:px-8 bg-gradient-to-b from-surface-dark to-ink">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10" data-reveal>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan/20 text-cyan text-[11px] font-extrabold uppercase tracking-widest mb-3 border border-cyan/30">
            <Sparkles className="w-3.5 h-3.5" /> End-to-End Solutions
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight tracking-tight">
            More Than Paint
          </h2>
          <p className="text-white/70 text-xs sm:text-sm mt-2.5 max-w-xl mx-auto leading-relaxed">
            From initial surface moisture testing and shade curation to verified master application — one dedicated partner across the entire journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                data-reveal
                className="group relative p-7 rounded-xl glass hover:bg-white/10 transition-all shadow-xl border border-white/10"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 group-hover:rotate-6 shadow-md"
                  style={{ background: `${s.color}22`, border: `1px solid ${s.color}55` }}
                >
                  <Icon className="w-7 h-7" style={{ color: s.color }} />
                </div>
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: s.color }}>
                  Service {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-white font-bold text-xl mb-2">{s.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{s.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold bg-cyan hover:bg-sky-400 text-ink shadow-xl transition-all"
          >
            Book a Professional Service <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
