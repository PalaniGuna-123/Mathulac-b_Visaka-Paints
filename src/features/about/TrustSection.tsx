import { trustPillars } from '../../data';

export function TrustSection() {
  return (
    <section className="relative py-16 md:py-20 px-4 md:px-8 bg-surface-deep border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10" data-reveal>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-leaf/20 text-leaf text-[11px] font-extrabold uppercase tracking-widest mb-3 border border-leaf/30">
            Quality Commitment
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight tracking-tight">
            Why India Chooses Mathulac
          </h2>
          <p className="text-white/70 text-xs sm:text-sm mt-2.5 max-w-xl mx-auto leading-relaxed">
            Engineered with high solid content and UV-resistant binders to outlast harsh weather.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustPillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.label}
                data-reveal
                className="group p-5 sm:p-6 rounded-xl glass text-center border border-white/10 shadow-xl hover:bg-white/10 transition-all"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-5 transition-transform group-hover:scale-110 shadow-lg"
                  style={{ background: `${p.color}22`, border: `1px solid ${p.color}55` }}
                >
                  <Icon className="w-8 h-8" style={{ color: p.color }} />
                </div>
                <h3 className="text-white font-bold text-lg">{p.label}</h3>
                <p className="text-white/65 text-sm mt-2.5 leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TrustSection;
