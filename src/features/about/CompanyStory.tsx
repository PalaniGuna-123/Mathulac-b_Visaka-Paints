import { companyFacts, timeline } from '../../data';
import { Award, Sparkles } from 'lucide-react';

export function CompanyStory() {
  return (
    <section id="about" className="relative py-14 sm:py-20 px-5 md:px-8 bg-gradient-to-b from-ink to-[#0a1525]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left Story */}
          <div data-reveal-left>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan/20 text-cyan text-[11px] font-bold uppercase tracking-widest mb-2.5 border border-cyan/30">
              <Award className="w-3.5 h-3.5" /> Established 2004
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white mt-1 leading-tight">
              Visaka Paints &amp; Chemicals India
            </h2>
            <p className="text-white/75 mt-3 leading-relaxed text-xs sm:text-sm">
              Established in 2004 in Coimbatore, India, Visaka Paints & Chemicals India manufactures high-performance architectural, decorative, wood, and automotive coating systems under the flagship Mathulac brand.
            </p>
            <p className="text-white/65 mt-3 leading-relaxed text-sm">
              We blend chemical precision with deep aesthetic understanding, delivering paints that exceed customer expectations in color richness, durability, and ease of application.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {companyFacts.map((f) => (
                <div key={f.label} className="p-4 rounded-xl glass border border-white/10">
                  <div className="text-white/50 text-[10px] uppercase font-bold tracking-wider">{f.label}</div>
                  <div className="text-white font-bold text-base mt-1">{f.value}</div>
                </div>
              ))}
            </div>

            <div className="relative mt-8 rounded-2xl overflow-hidden shadow-2xl border border-white/15 group aspect-[16/10]">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=85"
                alt="Visaka Paints & Chemicals India Manufacturing Facility & Research Lab"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Manufacturing Facility &amp; Research Lab
                </span>
                <span className="text-white/70 text-[11px] font-medium">Coimbatore, Tamil Nadu</span>
              </div>
            </div>
          </div>

          {/* Right Timeline */}
          <div data-reveal-right>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-magenta" />
              <h3 className="text-white font-display text-3xl">Two Decades of Excellence</h3>
            </div>
            <div className="relative pl-8 space-y-7 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-magenta via-cyan to-leaf">
              {timeline.map((t) => (
                <div key={t.year} className="relative group">
                  <div className="absolute -left-[1.58rem] top-1.5 w-3.5 h-3.5 rounded-full bg-magenta ring-4 ring-ink transition-transform group-hover:scale-125" />
                  <div className="text-cyan font-bold text-sm uppercase tracking-wider">{t.year}</div>
                  <div className="text-white font-bold text-lg mt-0.5">{t.title}</div>
                  <div className="text-white/65 text-sm mt-1.5 leading-relaxed">{t.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompanyStory;
