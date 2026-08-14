import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Phone, ArrowRight } from 'lucide-react';
import type { MathulacProductItem } from '../../types';
import type { CatalogCategory } from '../../data/products';

interface CategoryProductsModalProps {
  category: CatalogCategory;
  products: MathulacProductItem[];
  onClose: () => void;
  onSelectProduct: (p: MathulacProductItem) => void;
  onConsult: () => void;
}

export function CategoryProductsModal({
  category,
  products,
  onClose,
  onSelectProduct,
  onConsult,
}: CategoryProductsModalProps) {
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

  const Icon = category.icon;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${category.name} Products`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#070913]/90 backdrop-blur-xl transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-midnight border border-white/15 rounded-xl shadow-2xl overflow-hidden flex flex-col z-10 animate-menu-drop text-white">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-magenta/20 border border-magenta/40 flex items-center justify-center text-magenta">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-magenta uppercase tracking-widest">
                  Division {String(category.orderNumber).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-white/50">• {products.length} Products</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-white font-bold">{category.name}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Products List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <p className="text-white/70 text-xs sm:text-sm">{category.description}</p>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="group relative p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-magenta/50 transition-all flex gap-4 cursor-pointer"
                  onClick={() => {
                    onSelectProduct(item);
                    onClose();
                  }}
                >
                  {/* Visual */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-gradient-to-b from-[#161a28] to-[#080a12] border border-white/15 flex-shrink-0 flex items-center justify-center p-2 overflow-hidden shadow-inner relative">
                    <div
                      className="absolute inset-0 m-auto w-16 h-16 rounded-full filter blur-xl opacity-30 pointer-events-none"
                      style={{ backgroundColor: item.color || '#00C8FF' }}
                    />
                    <img
                      src={item.image}
                      alt={item.name}
                      className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan transition-colors truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-white/60 line-clamp-2 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                      <span className="text-[10px] font-semibold text-magenta">
                        Available in: {item.availableSizes?.join(', ')}
                      </span>
                      <span className="text-[11px] font-bold text-cyan flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Select <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-xl bg-white/[0.03] border border-white/10 text-center py-12">
              <div className="w-12 h-12 rounded-xl bg-magenta/20 border border-magenta/40 flex items-center justify-center text-magenta mx-auto mb-3">
                <Icon className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">No products uploaded currently</h4>
              <p className="text-xs text-white/60 max-w-md mx-auto">
                No product is uploaded for {category.name} currently. Formulations, technical datasheets, and container imagery are under development.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-white/60">
            Need customized batch specs or dealer inquiries for {category.name}?
          </span>
          <button
            onClick={() => {
              onClose();
              onConsult();
            }}
            className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-gradient-to-r from-magenta via-purple-600 to-cyan text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:opacity-95 transition-opacity cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Request Consultation</span>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default CategoryProductsModal;
