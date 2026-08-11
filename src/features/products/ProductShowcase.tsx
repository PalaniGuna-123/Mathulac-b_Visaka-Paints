import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { categories, featuredProducts, type Product } from '../../data';
import { ProductModal } from './ProductModal';
import { Link } from '../../routes/Router';

interface ProductShowcaseProps {
  initialFilter?: string;
  scrollTo?: (id: string) => void;
}

export function ProductShowcase({ initialFilter = 'All', scrollTo }: ProductShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [productFilter, setProductFilter] = useState(initialFilter);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const productGridRef = useRef<HTMLDivElement>(null);

  const cat = categories[activeCategory];
  const Icon = cat.icon;

  useEffect(() => {
    if (!productGridRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(
      productGridRef.current.children,
      { opacity: 0, y: 18, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.52, stagger: 0.07, ease: 'power3.out', overwrite: true }
    );
  }, [productFilter]);

  const handleScroll = (id: string) => {
    if (scrollTo) {
      scrollTo(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="products" className="relative py-24 md:py-32 px-5 md:px-8 bg-gradient-to-b from-ink via-[#1a0b2e] to-ink">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12" data-reveal>
          <span className="font-bold uppercase tracking-widest text-sm" style={{ color: cat.accent }}>
            Product Systems
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-white mt-3">The Right Paint for Every Surface</h2>
          <p className="text-white/70 max-w-2xl mx-auto mt-4">
            Explore formulated architectural emulsions, heavy-duty exterior weather coats, grain-protecting wood stains, and showroom-ready automotive finishes.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" data-reveal>
          {categories.map((c, i) => {
            const TabIcon = c.icon;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCategory(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  i === activeCategory ? 'text-white shadow-lg' : 'glass text-white/70 hover:text-white'
                }`}
                style={i === activeCategory ? { background: c.accent } : {}}
              >
                <TabIcon className="w-4 h-4" /> {c.name}
              </button>
            );
          })}
        </div>

        {/* Active Category Display Banner */}
        <div key={cat.id} className="grid lg:grid-cols-2 gap-10 items-center mb-24">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl" data-reveal-left>
            <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient}`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon className="w-32 h-32 text-white/80" strokeWidth={1} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className="text-xs uppercase tracking-widest opacity-70">{cat.surface}</div>
              <div className="font-display text-3xl">{cat.name}</div>
            </div>
          </div>

          <div data-reveal-right>
            <div className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: cat.accent }}>
              {cat.tagline}
            </div>
            <h3 className="font-display text-3xl md:text-4xl text-white mb-4">{cat.name}</h3>
            <p className="text-white/70 leading-relaxed mb-6">{cat.description}</p>
            <div className="space-y-2 mb-8">
              {cat.products.map((p) => (
                <div key={p} className="flex items-center gap-3 text-white/90">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: cat.accent }} />
                  <span className="font-semibold">{p}</span>
                </div>
              ))}
            </div>
            <Link
              to="/contact"
              onClick={() => handleScroll('contact')}
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white shadow-lg transition-transform hover:scale-105"
              style={{ background: cat.accent }}
            >
              Consult On This System <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Featured Collection Grid */}
        <div className="mt-16" data-reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
            <div>
              <span className="text-cyan font-bold uppercase tracking-widest text-sm">Signature Formulations</span>
              <h3 className="font-display text-3xl md:text-5xl text-white mt-2">Finish with Confidence.</h3>
            </div>
            <p className="max-w-sm text-sm text-white/60">
              Select a system for your project — open any product to inspect specifications and application tips.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-7">
            {['All', 'Interior', 'Exterior', 'Wood', 'Metal', 'Decorative', 'Automotive'].map((filter) => (
              <button
                key={filter}
                onClick={() => setProductFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  productFilter === filter
                    ? 'bg-white text-ink shadow-md'
                    : 'bg-white/5 border border-white/15 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Product Cards */}
          <div ref={productGridRef} className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {featuredProducts
              .filter((product) => productFilter === 'All' || product.category === productFilter)
              .map((product) => (
                <article
                  key={product.id}
                  className="product-card group"
                  style={{ '--product-color': product.color } as React.CSSProperties}
                >
                  <div className="product-card-image">
                    <img src={product.image} alt={product.name} loading="lazy" />
                    <div className="product-bucket" aria-hidden="true">
                      <div className="bucket-lid" />
                      <div className="bucket-label">
                        <span>Mathulac</span>
                        <small>{product.category}</small>
                      </div>
                    </div>
                    <span className="product-category">{product.category}</span>
                  </div>

                  <div className="p-6 relative">
                    <h4 className="font-display text-3xl text-white leading-none">{product.name}</h4>
                    <p className="mt-3 text-sm leading-relaxed text-white/65">{product.description}</p>
                    <div className="product-reveal mt-5 flex items-center justify-between gap-4 pt-3 border-t border-white/10">
                      <div className="text-xs text-white/55">
                        <span className="text-white font-bold">{product.finish}</span>
                        <br />
                        {product.surfaces}
                      </div>
                      <button
                        onClick={() => setActiveProduct(product)}
                        className="product-open"
                        data-cursor="view"
                        aria-label={`View ${product.name}`}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </div>

      {/* Modal Detail Popover */}
      {activeProduct && (
        <ProductModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
          scrollTo={scrollTo}
        />
      )}
    </section>
  );
}

export default ProductShowcase;
