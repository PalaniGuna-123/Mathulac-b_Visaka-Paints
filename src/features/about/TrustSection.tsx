import { trustPillars } from '../../data';

export function TrustSection() {
  return (
    <section className="relative py-20 md:py-28 px-5 md:px-8 bg-[#0a1525] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-14" data-reveal>
          <span className="text-leaf font-bold uppercase tracking-widest text-xs">Quality Commitment</span>
          <h2 className="font-display text-3xl md:text-5xl text-white mt-2">Why India Chooses Mathulac</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.label}
                data-reveal
                className="group p-7 rounded-2xl glass text-center border border-white/10 shadow-xl hover:bg-white/10 transition-all"
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
