import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Phone,
  Layers,
  Sparkles,
  Check,
  Copy,
  Info,
  Droplet,
  Clock,
  Paintbrush,
  ShieldCheck,
  Car,
  TreePine,
  ExternalLink,
  AlertTriangle,
} from 'lucide-react';
import {
  autoPrimersProducts,
  autoUnderCoatSurfaces,
  puttyAutoBodyFillers,
  autoTopCoatSolidColors,
  syntheticEnamelColorShades,
  autoTopCoatMetallicFinishes,
  autoTopCoatClears,
  woodFinishesProducts,
  decorativePaintsProducts,
  problemSolverList,
} from '../../data/officialCatalog';
import type { OfficialProductSpec, SyntheticEnamelShade, ProblemSolverItem } from '../../types';

interface OfficialDivisionModalProps {
  divisionId: 'auto' | 'wood' | 'decorative' | string | null;
  onClose: () => void;
  onConsult?: () => void;
}

export function OfficialDivisionModal({ divisionId, onClose, onConsult }: OfficialDivisionModalProps) {
  const [activeSubcategory, setActiveSubcategory] = useState<string>('');
  const [copiedShade, setCopiedShade] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!divisionId) return null;

  // Configuration for each Division
  const divisionConfigs: Record<
    string,
    {
      title: string;
      tagline: string;
      icon: typeof Car;
      accent: string;
      accentBg: string;
      subcategories: { id: string; label: string; count?: number }[];
    }
  > = {
    auto: {
      title: 'Auto Finishes',
      tagline: 'Bodyshop Primers, Body Fillers, OEM Enamels & 2K Clears',
      icon: Car,
      accent: '#EF4444',
      accentBg: 'bg-red-500/20 text-red-300 border-red-500/30',
      subcategories: [
        { id: 'auto-primers', label: 'Auto Primers', count: autoPrimersProducts.length },
        { id: 'under-coat', label: 'Under Coat Surfaces', count: autoUnderCoatSurfaces.length },
        { id: 'putty-fillers', label: 'Putty / Fillers', count: puttyAutoBodyFillers.length },
        { id: 'top-coat-solid', label: 'Top Coat - Solid Colors', count: autoTopCoatSolidColors.length },
        { id: 'color-shades', label: 'Synthetic Enamel Shades', count: syntheticEnamelColorShades.length },
        { id: 'metallic-finishes', label: 'Metallic Finishes', count: autoTopCoatMetallicFinishes.length },
        { id: 'top-coat-clears', label: 'Top Coat Clears', count: autoTopCoatClears.length },
      ],
    },
    wood: {
      title: 'Wood Finishes',
      tagline: 'Melamine Sealers, PU Polishes, Sanding Sealers & Table Top Clears',
      icon: TreePine,
      accent: '#F59E0B',
      accentBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      subcategories: [
        { id: 'melamine-base', label: 'Melamine Base', count: 1 },
        { id: 'wood-polish', label: 'Wood Polish', count: 1 },
        { id: 'sealers', label: 'Sealers', count: 2 },
        { id: 'clears', label: 'Clears', count: 1 },
      ],
    },
    decorative: {
      title: 'Decorative Paints',
      tagline: 'Interior & Exterior Primers, Putty, Distemper, Emulsions & Problem Solvers',
      icon: Paintbrush,
      accent: '#EC4899',
      accentBg: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      subcategories: [
        { id: 'interior-primers', label: 'Interior Primers', count: 1 },
        { id: 'exterior-primers', label: 'Exterior Primers', count: 1 },
        { id: 'acrylic-putty', label: 'Acrylic Putty', count: 1 },
        { id: 'acrylic-distemper', label: 'Acrylic Distemper', count: 1 },
        { id: 'interior-emulsion', label: 'Interior Emulsion', count: 1 },
        { id: 'exterior-emulsion', label: 'Exterior Emulsion', count: 1 },
        { id: 'weather-proof', label: 'Weather Proof Emulsion', count: 1 },
        { id: 'problem-solver', label: 'Problem Solver', count: problemSolverList.length },
      ],
    },
  };

  const currentConfig = divisionConfigs[divisionId] || divisionConfigs.auto;
  const activeTab = activeSubcategory || currentConfig.subcategories[0]?.id;
  const DivisionIcon = currentConfig.icon;

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedShade(code);
      setTimeout(() => setCopiedShade(null), 2000);
    } catch {
      // ignore
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-5 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${currentConfig.title} Technical Catalog`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#060814]/95 backdrop-blur-2xl transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-[#0E1322] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 animate-menu-drop text-white">
        
        {/* Top Header */}
        <div className="flex items-center justify-between p-5 md:p-6 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3.5 min-w-0">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border flex-shrink-0"
              style={{
                backgroundColor: `${currentConfig.accent}20`,
                borderColor: `${currentConfig.accent}50`,
                color: currentConfig.accent,
              }}
            >
              <DivisionIcon className="w-6 h-6" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: `${currentConfig.accent}15`,
                    borderColor: `${currentConfig.accent}40`,
                    color: currentConfig.accent,
                  }}
                >
                  Official Technical Specifications
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-white font-bold tracking-tight truncate mt-0.5">
                {currentConfig.title}
              </h2>
              <p className="text-white/60 text-xs truncate">{currentConfig.tagline}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer flex-shrink-0 ml-3"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subcategory Tabs Navigation */}
        <div className="px-5 md:px-6 pt-3 pb-2 border-b border-white/10 bg-[#0A0E1A] overflow-x-auto no-scrollbar flex items-center gap-2">
          {currentConfig.subcategories.map((sub) => {
            const isActive = activeTab === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setActiveSubcategory(sub.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer border ${
                  isActive
                    ? 'text-white shadow-lg'
                    : 'bg-white/[0.04] text-white/65 hover:text-white hover:bg-white/10 border-white/10'
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: currentConfig.accent,
                        borderColor: currentConfig.accent,
                      }
                    : undefined
                }
              >
                <span>{sub.label}</span>
                {sub.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {sub.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-8">
          
          {/* ============================================================ */}
          {/* AUTO FINISHES CONTENT */}
          {/* ============================================================ */}
          {divisionId === 'auto' && (
            <>
              {activeTab === 'auto-primers' && (
                <div className="space-y-6">
                  {autoPrimersProducts.map((prod) => (
                    <ProductSpecCard key={prod.id} product={prod} accentColor={currentConfig.accent} />
                  ))}
                </div>
              )}

              {activeTab === 'under-coat' && (
                <div className="space-y-6">
                  {autoUnderCoatSurfaces.map((prod) => (
                    <ProductSpecCard key={prod.id} product={prod} accentColor={currentConfig.accent} />
                  ))}
                </div>
              )}

              {activeTab === 'putty-fillers' && (
                <div className="space-y-6">
                  {puttyAutoBodyFillers.map((prod) => (
                    <ProductSpecCard key={prod.id} product={prod} accentColor={currentConfig.accent} />
                  ))}
                </div>
              )}

              {activeTab === 'top-coat-solid' && (
                <div className="space-y-6">
                  {autoTopCoatSolidColors.map((prod) => (
                    <ProductSpecCard key={prod.id} product={prod} accentColor={currentConfig.accent} />
                  ))}
                </div>
              )}

              {activeTab === 'color-shades' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-base">Synthetic Enamel – 24 Color Shades</h4>
                      <p className="text-white/60 text-xs mt-0.5">
                        Click on any color shade code to copy VP code directly for workshop batch mixing.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                      24 Swatches
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
                    {syntheticEnamelColorShades.map((shade) => (
                      <div
                        key={shade.id}
                        onClick={() => handleCopyCode(shade.code)}
                        className="group relative p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-red-500/50 transition-all cursor-pointer shadow-md flex flex-col justify-between"
                      >
                        {/* Swatch Box */}
                        <div
                          className="w-full aspect-[4/3] rounded-lg shadow-inner mb-2.5 relative overflow-hidden border border-black/20 group-hover:scale-105 transition-transform"
                          style={{ backgroundColor: shade.hex }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                            {copiedShade === shade.code ? (
                              <span className="flex items-center gap-1 bg-black/80 px-2 py-1 rounded-full text-green-400">
                                <Check className="w-3 h-3" /> Copied
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 bg-black/80 px-2 py-1 rounded-full">
                                <Copy className="w-3 h-3" /> Copy
                              </span>
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-bold text-white truncate leading-tight group-hover:text-red-300">
                            {shade.name}
                          </div>
                          <div className="text-[11px] font-mono text-white/50 mt-0.5 truncate">
                            {shade.code}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'metallic-finishes' && (
                <div className="space-y-6">
                  {autoTopCoatMetallicFinishes.map((prod) => (
                    <ProductSpecCard key={prod.id} product={prod} accentColor={currentConfig.accent} />
                  ))}
                </div>
              )}

              {activeTab === 'top-coat-clears' && (
                <div className="space-y-6">
                  {autoTopCoatClears.map((prod) => (
                    <ProductSpecCard key={prod.id} product={prod} accentColor={currentConfig.accent} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* ============================================================ */}
          {/* WOOD FINISHES CONTENT */}
          {/* ============================================================ */}
          {divisionId === 'wood' && (
            <div className="space-y-6">
              {woodFinishesProducts
                .filter((p) => {
                  if (activeTab === 'melamine-base') return p.subcategory === 'Melamine Base';
                  if (activeTab === 'wood-polish') return p.subcategory === 'Wood Polish';
                  if (activeTab === 'sealers') return p.subcategory === 'Sealers';
                  if (activeTab === 'clears') return p.subcategory === 'Clears';
                  return true;
                })
                .map((prod) => (
                  <ProductSpecCard key={prod.id} product={prod} accentColor={currentConfig.accent} />
                ))}
            </div>
          )}

          {/* ============================================================ */}
          {/* DECORATIVE PAINTS CONTENT */}
          {/* ============================================================ */}
          {divisionId === 'decorative' && (
            <>
              {activeTab === 'problem-solver' ? (
                <div className="space-y-6">
                  {problemSolverList.map((item) => (
                    <div
                      key={item.id}
                      className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-pink-500/30 backdrop-blur-xl shadow-xl space-y-6"
                    >
                      <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                        <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center flex-shrink-0">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-pink-400">
                            Problem Solver Diagnostic
                          </span>
                          <h3 className="font-display text-2xl font-bold text-white">{item.problem}</h3>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-white/50 block">
                            Description
                          </span>
                          <p className="text-white/80 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                        </div>

                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400 block">
                            Possible Cause
                          </span>
                          <p className="text-white/80 text-xs sm:text-sm leading-relaxed">{item.possibleCause}</p>
                        </div>

                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400 block">
                            Solution &amp; Removal
                          </span>
                          <p className="text-white/80 text-xs sm:text-sm leading-relaxed">{item.solution}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {decorativePaintsProducts
                    .filter((p) => {
                      if (activeTab === 'interior-primers') return p.subcategory === 'Interior Primers';
                      if (activeTab === 'exterior-primers') return p.subcategory === 'Exterior Primers';
                      if (activeTab === 'acrylic-putty') return p.subcategory === 'Acrylic Putty';
                      if (activeTab === 'acrylic-distemper') return p.subcategory === 'Acrylic Distemper';
                      if (activeTab === 'interior-emulsion') return p.subcategory === 'Interior Emulsion';
                      if (activeTab === 'exterior-emulsion') return p.subcategory === 'Exterior Emulsion';
                      if (activeTab === 'weather-proof') return p.subcategory === 'Weather Proof Exterior Emulsion';
                      return true;
                    })
                    .map((prod) => (
                      <ProductSpecCard key={prod.id} product={prod} accentColor={currentConfig.accent} />
                    ))}
                </div>
              )}
            </>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-white/65 flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan flex-shrink-0" />
            <span>Technical batch specifications certified by Visaka Paints &amp; Chemicals India QA Lab.</span>
          </div>

          <button
            onClick={() => {
              onClose();
              if (onConsult) onConsult();
              else {
                window.location.href = '/contact';
              }
            }}
            className="w-full sm:w-auto py-2.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white flex items-center justify-center gap-2 shadow-xl hover:opacity-95 transition-all cursor-pointer"
            style={{
              background: `linear-gradient(135deg, ${currentConfig.accent}, #7B2CFF)`,
            }}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Request Batch Order / Consultation</span>
          </button>
        </div>

      </div>
    </div>,
    document.body,
  );
}

// --------------------------------------------------------------------------
// Sub-component: Product Technical Datasheet Card
// --------------------------------------------------------------------------

function ProductSpecCard({ product, accentColor }: { product: OfficialProductSpec; accentColor: string }) {
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
    { label: 'Supply Viscosity', value: specs.supplyViscosity },
    { label: 'Spray Viscosity', value: specs.sprayViscosity },
    { label: 'Theoretical Coverage / Capacity', value: specs.coverage || specs.coveringCapacity || specs.coveringViscosity },
    { label: 'Stability of Thinned Paints', value: specs.stabilityOfThinned },
    { label: 'Flash Point', value: specs.flashPoint },
  ].filter((r) => r.value !== undefined && r.value !== '');

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-xl hover:border-white/20 transition-all">
      {/* Product Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border"
              style={{
                backgroundColor: `${accentColor}15`,
                borderColor: `${accentColor}40`,
                color: accentColor,
              }}
            >
              {product.subcategory}
            </span>
            {product.color && (
              <span className="text-[10px] text-white/60 font-semibold flex items-center gap-1.5">
                {product.colorSwatchHex && (
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-white/40 inline-block"
                    style={{ backgroundColor: product.colorSwatchHex }}
                  />
                )}
                {product.color}
              </span>
            )}
          </div>

          <h3 className="font-display text-2xl sm:text-3xl text-white font-bold mt-1.5">
            {product.productName}
          </h3>
        </div>
      </div>

      {/* Usage Features Description */}
      <div className="py-4">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-white/50 block mb-1">
          Usage Features &amp; Properties
        </span>
        <p className="text-white/85 text-xs sm:text-sm leading-relaxed">{product.usageFeatures}</p>
      </div>

      {/* Technical Specifications Table Grid */}
      <div className="mt-3 pt-4 border-t border-white/10">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-white/50 block mb-3">
          Technical Application Datasheet
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {specRows.map((spec, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors flex flex-col justify-between"
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

export default OfficialDivisionModal;
