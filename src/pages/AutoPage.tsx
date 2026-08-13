import { AutoSection } from '../features/surfaces';
import { ContactSection } from '../features/contact';
import { Link } from '../routes/Router';

export function AutoPage() {
  const autoSteps = [
    {
      step: '01',
      title: 'Body Putty & Fillers',
      desc: 'Ultra-fine polyester putty offering effortless spreading, zero pinholing, and rapid sanding turnaround.',
    },
    {
      step: '02',
      title: 'High-Build Auto Primers',
      desc: 'Anti-corrosive primer surfacer with exceptional adhesion to bare metal, galvanized steel, and aluminium.',
    },
    {
      step: '03',
      title: 'Precision Auto Enamels',
      desc: 'OEM color matching bases with dense pigmentation and superior weather & UV stability.',
    },
    {
      step: '04',
      title: '2K Mirror Clear Coat',
      desc: 'Showroom mirror gloss clearcoat with crystal clarity, chemical resistance, and high buffability.',
    },
  ];

  return (
    <div className="w-full pt-20">
      {/* Auto Hero Section */}
      <AutoSection />

      {/* Automotive 4-Step Refinishing Flow */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-ink border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-500/20 text-red-300 text-[11px] font-extrabold uppercase tracking-widest border border-red-500/30 mb-3">
              Complete Workshop System
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight tracking-tight">
              The 4-Step Refinishing Standard
            </h2>
            <p className="text-white/70 text-xs sm:text-sm mt-2.5 max-w-xl mx-auto leading-relaxed">
              Engineered for bodyshop pros seeking shorter drying cycles, flawless levelling, and mirror durability.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {autoSteps.map((s) => (
              <div key={s.step} className="p-7 rounded-xl glass border border-red-500/20 shadow-xl relative group">
                <div className="font-display text-5xl text-red-500/20 group-hover:text-red-500/40 transition-colors mb-4">
                  {s.step}
                </div>
                <h3 className="font-display text-xl text-white mb-2">{s.title}</h3>
                <p className="text-white/65 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-ember hover:bg-red-600 text-white shadow-2xl transition-all"
            >
              Order Auto Refinish Batch / Dealer Inquiry
            </Link>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <ContactSection />
    </div>
  );
}

export default AutoPage;
