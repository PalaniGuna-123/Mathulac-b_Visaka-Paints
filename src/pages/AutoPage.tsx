import { useState } from 'react';
import { AutoSection } from '../features/surfaces';
import { ContactSection } from '../features/contact';
import { CheckCircle2, Car, FileSpreadsheet, Sparkles, Palette, Zap, Layers, ArrowLeft } from 'lucide-react';
import { Link } from '../routes/Router';
import {
  autoPrimersProducts,
  autoUnderCoatSurfaces,
  puttyAutoBodyFillers,
  autoTopCoatSolidColors,
  autoTopCoatMetallicFinishes,
  autoTopCoatClears,
  syntheticEnamelColorShades,
} from '../data/officialCatalog';
import type { OfficialProductSpec } from '../types';

export function AutoPage() {
  const [activeTab, setActiveTab] = useState<string>('auto-primers');

  const subcategories = [
    { id: 'auto-primers', label: 'Auto Primers', count: autoPrimersProducts.length },
    { id: 'undercoat-surfaces', label: 'Under Coat Surfaces', count: autoUnderCoatSurfaces.length },
    { id: 'putty-fillers', label: 'Body Putty & Fillers', count: puttyAutoBodyFillers.length },
    { id: 'solid-colors', label: 'Top Coat Solid Colors', count: autoTopCoatSolidColors.length },
    { id: 'metallic-finishes', label: 'Metallic Finishes', count: autoTopCoatMetallicFinishes.length },
    { id: 'topcoat-clears', label: 'Top Coat Clears', count: autoTopCoatClears.length },
    { id: 'enamel-shades', label: '24 Enamel Color Shades', count: syntheticEnamelColorShades.length },
  ];

  const autoPerformancePillars = [
    {
      title: 'Anti-Corrosion Primers',
      tag: 'Zinc Chrome & Red Oxide',
      desc: 'Formulated with active anti-corrosive inhibitors that chemically passivate steel substrates against coastal oxidation.',
      features: ['20-min rapid tack dry', 'Excellent inter-coat adhesion', 'Compatible with NC, PU & Stoving'],
    },
    {
      title: 'Rapid-Sand Body Fillers',
      tag: 'High-Solid Micro Fillers',
      desc: 'High-build NC and alkyd-based putties that seal micro dents, feather out cleanly, and resist pinholing.',
      features: ['Smooth knife glide', 'Easy wet/dry sanding', 'Zero shrinking & cracking'],
    },
    {
      title: 'Showroom Mirror Clears',
      tag: 'Buffable High-Gloss Topcoats',
      desc: 'Deep optical depth clears with UV stabilizers designed for effortless buffability and mirror reflections.',
      features: ['Wax buffing compatible', 'High scratch resistance', 'Long-lasting gloss retention'],
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
            <span className="text-red-400 font-bold">Auto Finishes Official Catalog</span>
          </div>
          <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">
            Division 01 • Automotive
          </span>
        </div>
      </div>

      {/* Automotive Showcase Hero */}
      <AutoSection />

      {/* ============================================================ */}
      {/* OFFICIAL TECHNICAL CATALOG SPECIFICATIONS SECTION */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#060814] via-[#14080D] to-[#0A0D18] border-t border-b border-white/10">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-500/20 text-red-300 text-[11px] font-extrabold uppercase tracking-widest border border-red-500/30 mb-3">
              <FileSpreadsheet className="w-3.5 h-3.5" /> Official Automotive Technical Datasheets
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight">
              Auto Finishes <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-400 to-amber-400">Technical Catalog</span>
            </h2>
            <p className="text-white/70 text-xs sm:text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
              Bodyshop-tested anti-corrosive primers, NC putties, OEM synthetic topcoats, and high-clarity buffable clearcoats.
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
                      ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white border-red-400 shadow-lg shadow-red-500/30 scale-105'
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
            {activeTab === 'auto-primers' &&
              autoPrimersProducts.map((prod) => (
                <AutoProductSpecCard key={prod.id} product={prod} />
              ))}

            {activeTab === 'undercoat-surfaces' &&
              autoUnderCoatSurfaces.map((prod) => (
                <AutoProductSpecCard key={prod.id} product={prod} />
              ))}

            {activeTab === 'putty-fillers' &&
              puttyAutoBodyFillers.map((prod) => (
                <AutoProductSpecCard key={prod.id} product={prod} />
              ))}

            {activeTab === 'solid-colors' &&
              autoTopCoatSolidColors.map((prod) => (
                <AutoProductSpecCard key={prod.id} product={prod} />
              ))}

            {activeTab === 'metallic-finishes' &&
              autoTopCoatMetallicFinishes.map((prod) => (
                <AutoProductSpecCard key={prod.id} product={prod} />
              ))}

            {activeTab === 'topcoat-clears' &&
              autoTopCoatClears.map((prod) => (
                <AutoProductSpecCard key={prod.id} product={prod} />
              ))}

            {/* 24 Synthetic Enamel Shades Gallery */}
            {activeTab === 'enamel-shades' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-midnight/90 border border-white/15 backdrop-blur-xl shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/10 mb-6">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border bg-pink-500/15 border-pink-500/40 text-pink-300">
                      Color Formulation Series
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl text-white font-bold mt-1.5">
                      24 Synthetic Enamel Auto &amp; Industrial Shades
                    </h3>
                    <p className="text-white/60 text-xs sm:text-sm mt-1">
                      Tested for high outdoor gloss retention, opacity, and weather resistance.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-white/50 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    24 Standard Shades
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
                  {syntheticEnamelColorShades.map((shade) => (
                    <div
                      key={shade.id}
                      className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between group"
                    >
                      <div
                        className="w-full aspect-[16/10] rounded-xl mb-3 shadow-inner border border-white/15 group-hover:scale-105 transition-transform duration-300"
                        style={{ backgroundColor: shade.hex }}
                      />
                      <div>
                        <h5 className="text-xs font-bold text-white truncate">{shade.name}</h5>
                        <span className="text-[10px] font-mono text-white/50 block mt-0.5">{shade.code}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bodyshop Performance Engineering */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-ink border-b border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-500/20 text-red-300 text-[11px] font-extrabold uppercase tracking-widest border border-red-500/30 mb-3">
              Bodyshop Engineering Standards
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight tracking-tight">
              Engineered For High-Speed Bodyshops
            </h2>
            <p className="text-white/70 text-xs sm:text-sm mt-2.5 max-w-xl mx-auto leading-relaxed">
              Faster turnaround cycles, zero pinhole mapping, and OEM solid/metallic durability for automobile repairs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {autoPerformancePillars.map((p) => (
              <div
                key={p.title}
                className="p-7 rounded-2xl glass border border-red-500/20 shadow-xl flex flex-col justify-between card-3d-lift"
              >
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-bold uppercase tracking-wider mb-4">
                    {p.tag}
                  </div>
                  <h3 className="font-display text-2xl text-white mb-2">{p.title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed mb-6">{p.desc}</p>

                  <div className="space-y-2.5 pt-4 border-t border-white/10">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-xs text-white/85">
                        <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    to="/contact"
                    className="w-full py-3.5 rounded-xl bg-red-500/20 hover:bg-red-600 text-red-300 hover:text-white font-bold text-center block text-sm transition-all duration-300 shimmer-button"
                  >
                    Request Auto Sample Kit
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
// Subcomponent: Auto Product Specification Detail Card
// --------------------------------------------------------------------------
function AutoProductSpecCard({ product }: { product: OfficialProductSpec }) {
  const specs = product.specs;

  const specRows: { label: string; value?: string }[] = [
    { label: 'Mixing Ratio / Dilution', value: specs.mixingRatio },
    { label: 'Application Method', value: specs.applicationMethod },
    { label: 'No of Coats', value: specs.noOfCoats },
    { label: 'Pot Life', value: specs.potLife },
    { label: 'Drying Time', value: specs.dryingTime },
    { label: 'Flash Off Time', value: specs.flashOff },
    { label: 'Sand Paper Grit', value: specs.sandPaper },
    { label: 'Method of Sanding', value: specs.methodOfSanding },
    { label: 'Background / Surface Prep', value: specs.background || specs.surfacePrep },
    { label: 'Hardener / Induction', value: specs.hardenerInduction },
    { label: 'Buffing Requirement', value: specs.buffing },
    { label: 'Supply Viscosity', value: specs.supplyViscosity },
    { label: 'Spray Viscosity', value: specs.sprayViscosity },
    { label: 'Covering Capacity', value: specs.coverage || specs.coveringCapacity },
    { label: 'Flash Point', value: specs.flashPoint },
  ].filter((r) => r.value !== undefined && r.value !== '' && r.value !== '-');

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-midnight/90 border border-white/15 backdrop-blur-xl shadow-2xl hover:border-red-500/40 transition-all duration-300 card-3d-lift">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border bg-red-500/15 border-red-500/40 text-red-300">
            {product.subcategory}
          </span>
          <h3 className="font-display text-2xl sm:text-3xl text-white font-bold mt-1.5">{product.productName}</h3>
        </div>
        {product.color && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/80">
            {product.colorSwatchHex && (
              <span
                className="w-3 h-3 rounded-full border border-white/30"
                style={{ backgroundColor: product.colorSwatchHex }}
              />
            )}
            <span>{product.color}</span>
          </div>
        )}
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

export default AutoPage;
