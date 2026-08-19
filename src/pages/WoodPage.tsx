import { useState } from 'react';
import { WoodSection } from '../features/surfaces';
import { ContactSection } from '../features/contact';
import { CheckCircle2, TreePine, FileSpreadsheet, Sparkles } from 'lucide-react';
import { Link } from '../routes/Router';
import { woodFinishesProducts } from '../data/officialCatalog';
import type { OfficialProductSpec } from '../types';

export function WoodPage() {
  const [activeTab, setActiveTab] = useState<string>('melamine-base');

  const subcategories = [
    { id: 'melamine-base', label: 'Melamine Base', count: 1 },
    { id: 'wood-polish', label: 'Wood Polish', count: 1 },
    { id: 'sealers', label: 'Sealers', count: 2 },
    { id: 'clears', label: 'Clears', count: 1 },
  ];

  const woodProducts = [
    {
      name: 'Mathulac Grain Lustre PU',
      tag: 'Polyurethane Topcoat',
      desc: 'High-build clear polyurethane coating offering maximum scratch resistance and grain clarity.',
      features: ['Moisture barrier', 'Non-yellowing UV shield', 'Satin & High Gloss variants'],
    },
    {
      name: 'Melamine Wood Seal',
      tag: 'Interior Furniture',
      desc: 'Fast-drying melamine clear coat designed for everyday wooden furniture and cabinets.',
      features: ['Quick 30-min tack dry', 'Heat & stain resistant', 'Smooth velvety feel'],
    },
    {
      name: 'Deep-Penetrating Wood Stain',
      tag: 'Natural Staining',
      desc: 'Translucent color stains that soak into hardwood fibres to highlight natural knots and swirls.',
      features: ['Teak, Walnut, Rosewood shades', 'Uniform penetration', 'Zero blotching'],
    },
  ];

  return (
    <div className="w-full pt-20 bg-ink min-h-screen text-white">
      {/* Wood Showcase Hero */}
      <WoodSection />

      {/* ============================================================ */}
      {/* OFFICIAL TECHNICAL CATALOG SPECIFICATIONS SECTION */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#060814] via-[#120F08] to-[#0A0D18] border-t border-b border-white/10">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-extrabold uppercase tracking-widest border border-amber-500/30 mb-3">
              <FileSpreadsheet className="w-3.5 h-3.5" /> Official Wood Finishes Datasheets
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight">
              Wood Finishes <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Technical Catalog</span>
            </h2>
            <p className="text-white/70 text-xs sm:text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
              Laboratory-tested clear coats, melamine bases, sanding sealers, and wood polishes formulated to enrich and protect timber grain.
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
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-ink border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                      : 'bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/10 border-white/10'
                  }`}
                >
                  <span>{sub.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-black/20 text-ink' : 'bg-white/10 text-white/50'
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
            {woodFinishesProducts
              .filter((p) => {
                if (activeTab === 'melamine-base') return p.subcategory === 'Melamine Base';
                if (activeTab === 'wood-polish') return p.subcategory === 'Wood Polish';
                if (activeTab === 'sealers') return p.subcategory === 'Sealers';
                if (activeTab === 'clears') return p.subcategory === 'Clears';
                return true;
              })
              .map((prod) => (
                <WoodProductSpecCard key={prod.id} product={prod} />
              ))}
          </div>
        </div>
      </section>

      {/* Deep Dive System Specs */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-ink border-b border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-extrabold uppercase tracking-widest border border-amber-500/30 mb-3">
              Architectural Timber Systems
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight tracking-tight">
              Engineered For Timber Resilience
            </h2>
            <p className="text-white/70 text-xs sm:text-sm mt-2.5 max-w-xl mx-auto leading-relaxed">
              Formulated specifically for Indian tropical climates to safeguard solid wood, veneers, MDF, and plywood.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {woodProducts.map((p) => (
              <div key={p.name} className="p-7 rounded-xl glass border border-amber-500/20 shadow-xl flex flex-col justify-between card-3d-lift">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
                    {p.tag}
                  </div>
                  <h3 className="font-display text-2xl text-white mb-2">{p.name}</h3>
                  <p className="text-white/65 text-sm leading-relaxed mb-6">{p.desc}</p>

                  <div className="space-y-2.5 pt-4 border-t border-white/10">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-xs text-white/85">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    to="/contact"
                    className="w-full py-3.5 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-ink font-bold text-center block text-sm transition-all duration-300 shimmer-button"
                  >
                    Request Wood Finish Sample
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
// Subcomponent: Wood Product Specification Detail Card
// --------------------------------------------------------------------------
function WoodProductSpecCard({ product }: { product: OfficialProductSpec }) {
  const specs = product.specs;

  const specRows: { label: string; value?: string }[] = [
    { label: 'Mixing Ratio', value: specs.mixingRatio },
    { label: 'Application Method', value: specs.applicationMethod },
    { label: 'No of Coats', value: specs.noOfCoats },
    { label: 'Pot Life', value: specs.potLife },
    { label: 'Drying Time', value: specs.dryingTime },
    { label: 'Flash Off', value: specs.flashOff },
    { label: 'Sand Paper', value: specs.sandPaper },
    { label: 'Method of Sanding', value: specs.methodOfSanding },
    { label: 'Background / Surface Prep', value: specs.background || specs.surfacePrep },
    { label: 'Hardener / Induction Period', value: specs.hardenerInduction },
    { label: 'Buffing', value: specs.buffing },
    { label: 'Spray Viscosity', value: specs.sprayViscosity },
    { label: 'Covering Viscosity', value: specs.coveringViscosity || specs.coverage },
  ].filter((r) => r.value !== undefined && r.value !== '');

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-midnight/90 border border-white/15 backdrop-blur-xl shadow-2xl hover:border-amber-500/40 transition-all duration-300 card-3d-lift">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border bg-amber-500/15 border-amber-500/40 text-amber-300">
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

export default WoodPage;
