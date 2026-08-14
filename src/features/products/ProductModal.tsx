import { useEffect } from 'react';
import { X, Check, ArrowRight } from 'lucide-react';
import type { Product } from '../../types';
import { Link } from '../../routes/Router';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  scrollTo?: (id: string) => void;
}

export function ProductModal({ product, onClose, scrollTo }: ProductModalProps) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', close);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', close);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleEnquiry = () => {
    onClose();
    if (scrollTo) {
      scrollTo('contact');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} details`}
    >
      <button
        className="absolute inset-0 bg-ink/85 backdrop-blur-xl transition-opacity"
        onClick={onClose}
        aria-label="Close product details"
      />
      <div className="product-modal relative w-full max-w-4xl overflow-hidden rounded-xl border border-white/15 bg-midnight shadow-2xl z-10 animate-menu-drop">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 w-10 h-10 rounded-full bg-black/40 text-white grid place-items-center hover:bg-black/60 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Left: Product Can Artwork */}
          <div
            className="relative min-h-[300px] md:min-h-[560px] overflow-hidden"
            style={{ backgroundColor: product.color }}
          >
            <img
              className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-70"
              src={product.image}
              alt=""
            />
            <div className="product-bucket product-bucket-large" aria-hidden="true">
              <div className="bucket-lid" />
              <div className="bucket-label">
                <span>Mathulac</span>
                <small>{product.category}</small>
              </div>
            </div>
          </div>

          {/* Right: Technical Specs */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: product.color }}>
              {product.category} system
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl leading-tight text-white mt-3">{product.name}</h2>
            <p className="text-white/70 leading-relaxed mt-5">{product.description}</p>

            <div className="mt-7 space-y-3">
              {product.benefits.map((benefit) => (
                <div className="flex items-center gap-3 text-white/90" key={benefit}>
                  <span className="grid place-items-center h-5 w-5 rounded-full" style={{ background: product.color }}>
                    <Check className="w-3 h-3 text-white" />
                  </span>
                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                <small className="text-white/45 uppercase text-[10px] tracking-wider font-bold">Finish</small>
                <strong className="block text-white mt-1">{product.finish}</strong>
              </div>
              <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                <small className="text-white/45 uppercase text-[10px] tracking-wider font-bold">Suitable for</small>
                <strong className="block text-white mt-1">{product.surfaces}</strong>
              </div>
            </div>

            <Link
              to="/contact"
              onClick={handleEnquiry}
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl py-4 font-bold text-white shadow-lg transition-transform hover:scale-105"
              style={{ background: product.color }}
            >
              Request a Spec &amp; Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
