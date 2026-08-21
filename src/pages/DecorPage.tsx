import { useState } from 'react';
import { DecorSection } from '../features/surfaces';
import { ContactSection } from '../features/contact';
import { CheckCircle2, Paintbrush, FileSpreadsheet, Sparkles, HelpCircle, Layers, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from '../routes/Router';
import {
  decorativePaintsProducts,
  problemSolverList,
} from '../data/officialCatalog';
import type { OfficialProductSpec } from '../types';

export function DecorPage() {
  const [activeTab, setActiveTab] = useState<string>('interior-primers');

  const subcategories = [
    { id: 'interior-primers', label: 'Interior Primers', count: 1 },
    { id: 'exterior-primers', label: 'Exterior Primers', count: 1 },
    { id: 'acrylic-putty', label: 'Acrylic Wall Putty', count: 1 },
    { id: 'acrylic-distemper', label: 'Acrylic Distemper', count: 1 },
    { id: 'interior-emulsion', label: 'Trendy Interior Emulsion', count: 1 },
    { id: 'exterior-emulsion', label: 'APT Exterior Emulsion', count: 1 },
    { id: 'weather-proof', label: 'Optima Weather Proof', count: 1 },
    { id: 'problem-solver', label: 'Problem Solver Guide', count: problemSolverList.length },
  ];

  const architecturalPillars = [
    {
      title: 'Gradual Self-Cleaning',
      tag: 'Optima & APT Exterior',
      desc: 'Formulated to chalk micro-thin outer layers gradually with rain, ensuring dirt and atmospheric grime wash away naturally.',
      features: ['Long-lasting brightness', 'Anti-algal & anti-fungal shield', 'UV-resistant acrylic polymer'],
    },
    {
      title: 'Silky Washable Matt',
      tag: 'Trendy Interior Emulsion',
      desc: 'Smooth co-polymer emulsion delivering a glare-free velvet matt finish that easily wipes clean of household stains.',
      features: ['High opacity coverage', 'Pleasing interior light diffusion', 'Low odor & eco-friendly'],
    },
    {
      title: 'High-Build Base Putty',
      tag: 'Acrylic Wall Putty',
      desc: 'Superior alkali and acid resistant masonry leveling compound that seals porous concrete and prevents damp efflorescence.',
      features: ['Smooth blade application', 'High crack bridging', 'Ideal anchor for topcoats'],
    },
  ];

  return (
    <div className="w-full pt-20 bg-ink min-h-screen text-white">
      {/* Back to Products Bar */}
      <div className="bg-[#050711] border-b border-white/10 px-4 md:px-8 py-3">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Link to="/products" className="hover:text-cyan flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to 12 Systems Catalog
            </Link>
            <span>/</span>
            <span className="text-pink-400 font-bold">Decorative Paints Official Catalog</span>
          </div>
          <span className="text-[10px] font-mono font-bold text-pink-400 uppercase tracking-wider bg-pink-500/10 px-2.5 py-1 rounded-full border border-pink-500/20">
            Division 03 • Architectural &amp; Decorative
          </span>
        </div>
      </div>

      {/* Decorative Showcase Hero */}
      <DecorSection />

      {/* ============================================================ */}
      {/* OFFICIAL TECHNICAL CATALOG SPECIFICATIONS SECTION */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#060814] via-[#16081A] to-[#0A0D18] border-t border-b border-white/10">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-500/20 text-pink-300 text-[11px] font-extrabold uppercase tracking-widest border border-pink-500/30 mb-3">
              <FileSpreadsheet className="w-3.5 h-3.5" /> Official Architectural Technical Datasheets
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight">
              Decorative Paints <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan">Technical Catalog</span>
            </h2>
            <p className="text-white/70 text-xs sm:text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
              Laboratory-tested interior emulsions, weather-proof exterior coatings, masonry primers, and acrylic wall putties.
            </p>
          </div>

          {/* Subcategory Navigation Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
            {subcategories.map((sub) => {
              const isActive = activeTab === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setActiveTab(sub.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white border-pink-400 shadow-lg shadow-pink-500/30 scale-105'
                      : 'bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/10 border-white/10'
                  }`}
                >
                  <span>{sub.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-white/50'
                    }`}
                  >
                    {sub.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Content with Smooth Transition */}
          <div key={activeTab} className="space-y-6 animate-tab-fade">
            {activeTab !== 'problem-solver' &&
              decorativePaintsProducts
                .filter((p) => {
                  if (activeTab === 'interior-primers') return p.id === 'interior-primers';
                  if (activeTab === 'exterior-primers') return p.id === 'exterior-primers';
                  if (activeTab === 'acrylic-putty') return p.id === 'acrylic-putty';
                  if (activeTab === 'acrylic-distemper') return p.id === 'acrylic-distemper';
                  if (activeTab === 'interior-emulsion') return p.id === 'trendy-interior-emulsion';
                  if (activeTab === 'exterior-emulsion') return p.id === 'apt-exterior-emulsion';
                  if (activeTab === 'weather-proof') return p.id === 'optima-weather-proof-exterior-emulsion';
                  return false;
                })
                .map((prod) => (
                  <DecorProductSpecCard key={prod.id} product={prod} />
                ))}

            {/* Problem Solver Guide Tab */}
            {activeTab === 'problem-solver' && (
              <div className="space-y-6">
                {problemSolverList.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 md:p-8 rounded-3xl bg-midnight/90 border border-white/15 backdrop-blur-xl shadow-2xl"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <HelpCircle className="w-5 h-5 text-pink-400" />
                      <span className="text-xs font-mono font-bold text-pink-400 uppercase tracking-widest">
                        Architectural Troubleshooting
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl text-white font-bold mb-3">
                      {item.problem}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-6">{item.description}</p>

                    <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
                          Possible Root Causes:
                        </span>
                        <p className="text-white/70 text-xs sm:text-sm leading-relaxed">{item.possibleCause}</p>
                      </div>

                      <div className="p-5 rounded-2xl bg-pink-500/10 border border-pink-500/20">
                        <span className="text-xs font-bold uppercase tracking-wider text-pink-300 block mb-2">
                          Recommended Remedial Action:
                        </span>
                        <p className="text-white/90 text-xs sm:text-sm leading-relaxed">{item.solution}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Architectural Performance Engineering */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-ink border-b border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-500/20 text-pink-300 text-[11px] font-extrabold uppercase tracking-widest border border-pink-500/30 mb-3">
              Architectural Wall Formulations
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight tracking-tight">
              Engineered For Tropical Climate Durability
            </h2>
            <p className="text-white/70 text-xs sm:text-sm mt-2.5 max-w-xl mx-auto leading-relaxed">
              Formulated to withstand South Indian monsoon downpours, coastal salt humidity, and intense UV radiation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {architecturalPillars.map((p) => (
              <div
                key={p.title}
                className="p-7 rounded-2xl glass border border-pink-500/20 shadow-xl flex flex-col justify-between card-3d-lift"
              >
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold uppercase tracking-wider mb-4">
                    {p.tag}
                  </div>
                  <h3 className="font-display text-2xl text-white mb-2">{p.title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed mb-6">{p.desc}</p>

                  <div className="space-y-2.5 pt-4 border-t border-white/10">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-xs text-white/85">
                        <CheckCircle2 className="w-4 h-4 text-pink-400 flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    to="/contact"
                    className="w-full py-3.5 rounded-xl bg-pink-500/20 hover:bg-pink-600 text-pink-300 hover:text-white font-bold text-center block text-sm transition-all duration-300 shimmer-button"
                  >
                    Request Decorative Sample Kit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <ContactSection />
    </div>
  );
}

// --------------------------------------------------------------------------
// Subcomponent: Decorative Product Specification Detail Card
// --------------------------------------------------------------------------
function DecorProductSpecCard({ product }: { product: OfficialProductSpec }) {
  const specs = product.specs;

  const specRows: { label: string; value?: string }[] = [
    { label: 'Mixing Ratio / Dilution', value: specs.mixingRatio },
    { label: 'Application Method', value: specs.applicationMethod },
    { label: 'No of Coats', value: specs.noOfCoats },
    { label: 'Drying Time', value: specs.dryingTime },
    { label: 'Covering Capacity', value: specs.coveringCapacity || specs.coverage },
    { label: 'Stability of Thinned Paint', value: specs.stabilityOfThinned },
    { label: 'Background / Surface Prep', value: specs.background || specs.surfacePrep },
  ].filter((r) => r.value !== undefined && r.value !== '' && r.value !== '-');

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-midnight/90 border border-white/15 backdrop-blur-xl shadow-2xl hover:border-pink-500/40 transition-all duration-300 card-3d-lift">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border bg-pink-500/15 border-pink-500/40 text-pink-300">
            {product.subcategory}
          </span>
          <h3 className="font-display text-2xl sm:text-3xl text-white font-bold mt-1.5">{product.productName}</h3>
        </div>
      </div>

      {/* Usage Features */}
      <div className="py-4">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-white/50 block mb-1">
          Usage Features &amp; Properties
        </span>
        <p className="text-white/85 text-sm leading-relaxed">{product.usageFeatures}</p>
      </div>

      {/* Technical Spec Grid */}
      <div className="mt-2 pt-4 border-t border-white/10">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-white/50 block mb-3">
          Technical Application Datasheet
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {specRows.map((spec, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-ink/60 border border-white/5 spec-cell-interactive flex flex-col justify-between"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">
                {spec.label}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white mt-1 leading-snug">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DecorPage;
