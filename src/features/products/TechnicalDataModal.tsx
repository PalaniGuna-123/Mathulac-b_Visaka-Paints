import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Phone, FileText, CheckCircle2, Droplet, Layers, ShieldCheck, Box, Sparkles } from 'lucide-react';
import type { MathulacProductItem } from '../../types';

interface TechnicalDataModalProps {
  product: MathulacProductItem;
  allCategoryProducts?: MathulacProductItem[];
  onSelectProduct?: (p: MathulacProductItem) => void;
  onClose: () => void;
  onConsult: () => void;
}

export function TechnicalDataModal({
  product,
  allCategoryProducts = [],
  onSelectProduct,
  onClose,
  onConsult,
}: TechnicalDataModalProps) {
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

  const specs = product.technicalSpecs || {};

  const specRows = [
    {
      label: 'Products',
      value: product.name,
      icon: Layers,
    },
    {
      label: 'Color / Swatch',
      value: product.color || 'Standard Product Shade',
      isColor: true,
      colorHex: product.color || '#00C8FF',
      icon: Droplet,
    },
    {
      label: 'Usage Features & Description',
      value: product.description,
      isLongText: true,
      icon: FileText,
    },
    {
      label: 'Mixing Ratio',
      value: specs.mixingRatio || 'Dilute with recommended Mathulac Thinner or Clean Water as per TDS specification.',
    },
    {
      label: 'Application Method',
      value: specs.applicationMethod || 'By Spray / Brush / Roller',
    },
    {
      label: 'No of Coats',
      value: specs.noOfCoats || '1 - 2 coats (2 - 3 coats recommended for extreme weather / high wear areas)',
    },
    {
      label: 'Pot Life',
      value: specs.potLife || 'Not Applicable (Single Pack System)',
    },
    {
      label: 'Drying Time',
      value: specs.dryingTime || 'Surface dry: 15 - 30 mins / Hard dry: 4 - 8 hours at 30°C',
    },
    {
      label: 'Flash Off',
      value: specs.flashOff || '10 - 15 mins between coats',
    },
    {
      label: 'Sand Paper',
      value: specs.sandPaper || 'P-180 / P-240 / P-320 as appropriate for substrate',
    },
    {
      label: 'Method of Sanding',
      value: specs.methodOfSanding || 'Dry Sanding / Light de-nibbing between coats',
    },
    {
      label: 'Background & Surface Preparation',
      value:
        specs.surfacePrep ||
        'Substrate thoroughly cleaned from rust, grease, oil, dust and loose particles. Prime with appropriate Mathulac Primer.',
      isLongText: true,
    },
    {
      label: 'Buffing & Polishability',
      value: specs.buffing || 'Buffable after 24 hours if applicable to topcoat',
    },
    {
      label: 'Supply Viscosity',
      value: specs.supplyViscosity || '90 - 120 ± 5 sec / Ford Cup 4 at 30°C',
    },
    {
      label: 'Spray Viscosity',
      value: specs.sprayViscosity || '16 - 22 sec / Ford Cup 4',
    },
    {
      label: 'Theoretical Coverage',
      value: specs.coverage || '110 - 140 sq.ft / Litre / coat (varies by substrate porosity and application technique)',
    },
    {
      label: 'Available Pack Sizes',
      value: product.availableSizes?.join(', ') || '1 Ltr, 4 Ltr, 20 Ltr',
      icon: Box,
    },
  ];

  return createPortal(
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-5 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tds-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#060812]/92 backdrop-blur-2xl transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0A0D1A] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 animate-menu-drop text-white">
        {/* Top Product Tabs (like mathulac.com TDS viewer) */}
        {allCategoryProducts.length > 1 && (
          <div className="flex items-center gap-1 p-2.5 bg-white/[0.03] border-b border-white/10 overflow-x-auto no-scrollbar">
            {allCategoryProducts.map((p) => {
              const isActive = p.id === product.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectProduct && onSelectProduct(p)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${isActive
                      ? 'bg-gradient-to-r from-magenta to-purple-600 text-white shadow-md'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: p.color || '#00C8FF' }}
                  />
                  <span>{p.name}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gradient-to-r from-white/[0.04] via-transparent to-white/[0.02]">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-magenta/20 border border-magenta/40 flex items-center justify-center text-magenta shadow-inner">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-magenta uppercase tracking-widest">
                  Technical Data Sheet (TDS)
                </span>
                <span className="text-[10px] text-white/50">• {product.categoryName}</span>
              </div>
              <h2 id="tds-title" className="font-display text-xl sm:text-2xl text-white font-bold tracking-tight">
                {product.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close TDS Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Technical Data Table (Exact Reference UI matching Screenshot 4) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="rounded-xl border border-white/10 overflow-hidden bg-white/[0.02] shadow-inner">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04]">
                  <th className="py-3 px-4 font-mono font-bold uppercase tracking-wider text-cyan w-1/3 sm:w-1/4">
                    Specification Parameter
                  </th>
                  <th className="py-3 px-4 font-mono font-bold uppercase tracking-wider text-white/90">
                    Formulation Technical Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {specRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors hover:bg-white/[0.04] ${idx % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.015]'
                      }`}
                  >
                    <td className="py-3 px-4 font-semibold text-white/70 align-top flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-magenta/60 mt-1.5 flex-shrink-0" />
                      <span>{row.label}</span>
                    </td>
                    <td className="py-3 px-4 text-white/90 leading-relaxed font-normal">
                      {row.isColor ? (
                        <div className="flex items-center gap-3">
                          <span
                            className="w-12 h-6 rounded-md border border-white/20 shadow-md inline-block"
                            style={{ backgroundColor: row.colorHex }}
                          />
                          <span className="font-mono text-white/80">{row.value}</span>
                        </div>
                      ) : (
                        <span>{row.value}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Key Features Bullet Row (if available) */}
          {product.features && product.features.length > 0 && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-magenta/10 to-cyan/10 border border-magenta/20">
              <span className="text-[10px] font-bold uppercase tracking-wider text-magenta flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5" /> High-Performance Highlights
              </span>
              <div className="grid sm:grid-cols-2 gap-2">
                {product.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2 text-xs text-white/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Rainbow Accent Footer Strip & Action Buttons */}
        <div className="relative p-4 sm:p-5 border-t border-white/10 bg-[#080B14] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-white/70">
            <ShieldCheck className="w-4 h-4 text-leaf" />
            <span>ISO 9001:2015 &amp; IS 101 Standard Certified Formulation</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onConsult();
              }}
              className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-gradient-to-r from-cyan via-teal-500 to-blue-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan/20 hover:opacity-95 transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Inquire / Request Batch Quote</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default TechnicalDataModal;
