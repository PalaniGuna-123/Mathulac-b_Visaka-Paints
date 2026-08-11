import { services } from '../../data';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from '../../routes/Router';

export function ServicesSection() {
  return (
    <section id="services" className="relative py-24 md:py-32 px-5 md:px-8 bg-gradient-to-b from-[#1a0a3a] to-ink">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12" data-reveal>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan/20 text-cyan text-xs font-bold uppercase tracking-widest mb-3 border border-cyan/30">
            <Sparkles className="w-3.5 h-3.5" /> End-to-End Solutions
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-white mt-2">More Than Paint</h2>
          <p className="text-white/70 mt-4 max-w-xl mx-auto">
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
                className="group relative p-7 rounded-2xl glass hover:bg-white/10 transition-all shadow-xl border border-white/10"
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
