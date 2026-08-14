import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  FlaskConical,
  Paintbrush,
  Layers,
  Box,
  ArrowRight,
  Phone,
  Grid,
  Maximize2,
  Award,
  Clock,
  CheckCircle2,
  Star,
  TrendingUp,
  Users,
  MapPin,
  Droplets,
} from 'lucide-react';
import {
  mathulacCategories,
  mathulacProductItems,
  type CatalogCategory,
} from '../../data/products';
import { BRAND_COLORS } from '../../styles/colors';
import type { MathulacProductItem } from '../../types';
import { ProductVisual } from './ProductVisual';
import { CategoryProductsModal } from './CategoryProductsModal';
import { trustPillars, timeline } from '../../data/brand';
import { gsap, ScrollTrigger } from '../../lib/animation';

interface ProductShowcaseProps {
  initialFilter?: string;
  scrollTo?: (id: string) => void;
}

export function ProductShowcase({ initialFilter = 'thinners', scrollTo }: ProductShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);

  // Active selected category
  const [selectedCategory, setSelectedCategory] = useState<CatalogCategory>(
    mathulacCategories.find((c) => c.id === initialFilter) || mathulacCategories[0]
  );

  // Products in the active category
  const categoryProducts = mathulacProductItems.filter(
    (p) => p.categoryKey === selectedCategory.id
  );

  // Active product index
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  // Active product for technical inspection
  const currentProduct: MathulacProductItem =
    categoryProducts[activeProductIndex] || categoryProducts[0] || mathulacProductItems[0];

  // Modal for full category product list
  const [categoryModal, setCategoryModal] = useState<CatalogCategory | null>(null);

  // Animated stat counters
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = scrollContentRef.current;
    if (!section || !content || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let refreshFrame = 0;
    let settleFrame = 0;
    let disposed = false;

    const getScrollDistance = () => Math.max(1, content.scrollHeight - section.clientHeight);
    const queueRefresh = () => {
      window.cancelAnimationFrame(refreshFrame);
      refreshFrame = window.requestAnimationFrame(() => {
        if (!disposed) ScrollTrigger.refresh();
      });
    };

    const ctx = gsap.context(() => {
      gsap.set(section, { height: '100svh', overflow: 'hidden' });
      gsap.set(content, { willChange: 'transform' });

      gsap.to(content, {
        y: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          id: 'products-scroll-chapter',
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.55,
          invalidateOnRefresh: true,
          refreshPriority: 10,
        },
      });
    }, section);

    const resizeObserver = new ResizeObserver(queueRefresh);
    resizeObserver.observe(content);

    const images = Array.from(content.querySelectorAll('img'));
    void Promise.allSettled(
      images.map((image) => image.decode().catch(() => undefined)),
    ).then(() => {
      if (!disposed) queueRefresh();
    });

    void document.fonts?.ready.then(() => {
      if (!disposed) queueRefresh();
    });

    settleFrame = window.requestAnimationFrame(queueRefresh);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(refreshFrame);
      window.cancelAnimationFrame(settleFrame);
      resizeObserver.disconnect();
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const [counts, setCounts] = useState({ years: 0, shades: 0, categories: 0, cities: 0 });
  useEffect(() => {
    if (!statsVisible) return;
    const targets = { years: 20, shades: 1500, categories: 12, cities: 50 };
    const duration = 1800;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounts({
        years: Math.round(targets.years * ease),
        shades: Math.round(targets.shades * ease),
        categories: Math.round(targets.categories * ease),
        cities: Math.round(targets.cities * ease),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [statsVisible]);

  // Active timeline step
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);

  // Reset product index when category changes
  useEffect(() => {
    setActiveProductIndex(0);
  }, [selectedCategory]);

  const handlePrevProduct = () => {
    setActiveProductIndex((prev) =>
      prev > 0 ? prev - 1 : categoryProducts.length - 1
    );
  };

  const handleNextProduct = () => {
    setActiveProductIndex((prev) =>
      prev < categoryProducts.length - 1 ? prev + 1 : 0
    );
  };

  const handleConsult = () => {
    if (scrollTo) {
      scrollTo('contact');
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} id="products" className="relative bg-[#0B0D17] text-white overflow-hidden">
      <div ref={scrollContentRef} className="relative py-16 md:py-20 px-4 md:px-8">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-magenta/15 rounded-full filter blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan/15 rounded-full filter blur-[140px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10" data-reveal>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan/15 text-cyan text-[11px] font-extrabold uppercase tracking-widest border border-cyan/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan" /> Full Product Range &amp; Formulations
          </div>
          <h2 data-paint-heading className="paint-heading font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight tracking-tight">
            Every Coat in the <em>Mathulac</em> Range
          </h2>
          <p className="text-white/70 text-xs sm:text-sm mt-2.5 max-w-xl mx-auto leading-relaxed">
            Thinners, primers, putty, emulsions, enamels, wood coatings and automotive finishes — engineered for Indian weather.
          </p>
        </div>

        {/* 12-Category Grid Selector (All 12 visible at a single glance without scroll cuts) */}
        <div className="mb-10" data-reveal>
          <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-white/10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-white/60 flex items-center gap-2">
              <Grid className="w-4 h-4 text-magenta" /> Select Product Category (12 Systems)
            </span>
            <button
              onClick={() => setCategoryModal(selectedCategory)}
              className="text-xs font-bold text-cyan hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" /> View {selectedCategory.name} Modal
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {mathulacCategories.map((cat) => {
              const isSelected = selectedCategory.id === cat.id;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={isSelected}
                  className={`paint-category group relative p-3 rounded-xl text-left transition-all duration-300 cursor-pointer border flex flex-col justify-between ${isSelected
                    ? 'is-paint-active '
                    : ''}${isSelected
                    ? 'bg-gradient-to-b from-magenta/25 via-white/[0.08] to-violet/20 border-magenta shadow-lg shadow-magenta/20 scale-[1.02] ring-1 ring-magenta/40'
                    : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/10 hover:border-white/25'
                    }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-magenta' : 'text-white/40'}`}>
                      {String(cat.orderNumber).padStart(2, '0')}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${isSelected ? 'bg-magenta text-white' : 'bg-white/10 text-white/70'
                        }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div>
                    <h4 className={`text-xs font-bold leading-tight line-clamp-2 ${isSelected ? 'text-white font-extrabold' : 'text-white/80 group-hover:text-white'}`}>
                      {cat.name}
                    </h4>
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-wider text-white/50 font-bold">
                      {cat.count} {cat.count === 1 ? 'Item' : 'Items'}
                    </span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-magenta animate-pulse" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* MAIN TECHNICAL DATA SHOWCASE (Exact Reference UI) */}
        {/* ============================================================ */}
        {categoryProducts.length > 0 && currentProduct ? (
          <div
            key={currentProduct.id}
            className="max-w-[1120px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-8"
            data-reveal
          >
            {/* Left Column: Real Product Visual (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center gap-2 relative">
              {/* Real Product Image Stage with Snug Height */}
              <div
                className="product-paint-stage w-full flex items-center justify-center relative"
                style={{ '--paint-accent': currentProduct.color || '#00C8FF' } as React.CSSProperties}
              >
                <ProductVisual
                  product={currentProduct}
                  className="w-full h-[360px] sm:h-[400px]"
                />
              </div>

              {/* Switcher Controls immediately below Image with reduced in-between space */}
              {categoryProducts.length > 1 && (
                <div className="w-full max-w-[280px] flex items-center justify-between gap-3 px-3.5 py-1.5 rounded-xl bg-white/[0.06] border border-white/15 backdrop-blur-md shadow-lg mt-1">
                  <button
                    onClick={handlePrevProduct}
                    className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Previous Product"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {categoryProducts.map((p, idx) => (
                      <button
                        key={p.id}
                        onClick={() => setActiveProductIndex(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${idx === activeProductIndex
                          ? 'bg-cyan scale-125 ring-2 ring-white/60'
                          : 'bg-white/30 hover:bg-white/60'
                          }`}
                        title={p.name}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNextProduct}
                    className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Next Product"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Animated Rainbow Border Card (7 cols) */}
            <div className="lg:col-span-7 animated-border-card flex flex-col">
              <div className="bg-[#0B0F19] p-6 sm:p-7 md:p-8 relative h-full flex flex-col justify-between rounded-xl">
                <div>
                  {/* Header Tag */}
                  <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.25em] text-cyan mb-1.5">
                    TECHNICAL DATA
                  </div>

                  {/* Product Title */}
                  <h3 className="font-sans text-2xl sm:text-[28px] md:text-[32px] font-bold text-white tracking-tight leading-tight mb-2">
                    {currentProduct.name}
                  </h3>

                  {/* Tagline / Subtitle */}
                  <p className="text-white/70 text-[12px] sm:text-[13px] leading-relaxed font-normal mb-5 max-w-xl">
                    {selectedCategory.name} • Division {String(selectedCategory.orderNumber).padStart(2, '0')} formulation engineered for maximum durability and finish.
                  </p>

                  {/* Structured Technical Specification Rows with Clean Icons (No Border Box) */}
                  <div className="space-y-0 divide-y divide-white/10">
                    {/* 1. USAGE & DESCRIPTION */}
                    <div className="py-3 first:pt-0 flex items-start gap-3">
                      <FlaskConical className="w-4 h-4 text-cyan flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold tracking-[0.14em] uppercase text-white/50 block mb-0.5">
                          USAGE FEATURES &amp; DESCRIPTION
                        </span>
                        <p className="text-white/80 text-[12px] sm:text-[13px] font-normal leading-relaxed">
                          {currentProduct.description}
                        </p>
                      </div>
                    </div>

                    {/* 2. KEY FEATURES (if available) */}
                    {currentProduct.features && currentProduct.features.length > 0 && (
                      <div className="py-3 flex items-start gap-3">
                        <ShieldCheck className="w-4 h-4 text-magenta flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-bold tracking-[0.14em] uppercase text-white/50 block mb-1">
                            KEY FEATURES
                          </span>
                          <div className="space-y-1">
                            {currentProduct.features.map((feature, fIdx) => (
                              <div key={fIdx} className="flex items-start gap-2 text-white/80 text-[12px] leading-snug">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan mt-1.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 3. AVAILABLE PACK SIZES */}
                    <div className="py-3 flex items-start gap-3">
                      <Box className="w-4 h-4 text-sun flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold tracking-[0.14em] uppercase text-white/50 block mb-1.5">
                          AVAILABLE PACK SIZES
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {currentProduct.availableSizes.map((size, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-[11px] font-mono font-semibold text-white"
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 4. PRODUCT CLASSIFICATION */}
                    <div className="py-3 flex items-start gap-3">
                      <Layers className="w-4 h-4 text-leaf flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold tracking-[0.14em] uppercase text-white/50 block mb-0.5">
                          PRODUCT CATEGORY
                        </span>
                        <p className="text-white/80 text-[12px] font-normal leading-snug">
                          {String(selectedCategory.orderNumber).padStart(2, '0')} • {selectedCategory.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State for Categories with No Products (e.g. Tile Coat) */
          <div
            className="rounded-xl p-8 sm:p-12 bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 text-center mb-16 max-w-3xl mx-auto shadow-2xl"
            data-reveal
          >
            <div className="w-16 h-16 rounded-2xl bg-magenta/20 border border-magenta/40 flex items-center justify-center text-magenta mx-auto mb-4">
              <Paintbrush className="w-8 h-8" />
            </div>
            <span className="text-xs font-mono font-bold text-magenta uppercase tracking-widest block mb-1">
              Division {String(selectedCategory.orderNumber).padStart(2, '0')} • {selectedCategory.name}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-white font-bold mb-2">
              Formulations Under Active Development
            </h3>
            <p className="text-white/70 text-sm max-w-lg mx-auto leading-relaxed mb-6">
              No product is uploaded for Tile Coat currently. New formulations, technical datasheets, and container imagery are under development.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-xs text-white/80">
              <Sparkles className="w-3.5 h-3.5 text-cyan" /> Inquire for Custom Batch Orders &amp; Tile Coat Requirements
            </div>
          </div>
        )}

          {/* Clean Consultation & Full Category Action Strip below the Card */}
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 mb-16" data-reveal>
          <button
            onClick={handleConsult}
            className="paint-button paint-button--blue w-full sm:w-auto min-w-[240px] py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan via-teal-500 to-blue-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-cyan/30 cursor-pointer"
          >
            <Phone className="w-4 h-4" />
            <span>Request Free Consultation</span>
          </button>

          <button
            onClick={() => setCategoryModal(selectedCategory)}
            className="paint-button w-full sm:w-auto min-w-[240px] py-3.5 px-6 rounded-xl bg-white/[0.08] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer border border-white/20 backdrop-blur-md shadow-lg"
          >
            <Maximize2 className="w-4 h-4 text-cyan" />
            <span>View Full {selectedCategory.name}</span>
          </button>
        </div>

        {/* ============================================================ */}
        {/* WHY MATHULAC — BRAND TRUST & QUALITY SECTION */}
        {/* ============================================================ */}
        <div className="mt-16" data-reveal>

          {/* Section Label */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-magenta/15 text-magenta text-[11px] font-extrabold uppercase tracking-widest border border-magenta/30 mb-3">
              <Award className="w-3.5 h-3.5" /> Trusted Since 2004
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight tracking-tight">
              Why Professionals Choose <em className="text-transparent bg-clip-text bg-gradient-to-r from-magenta to-cyan">Mathulac</em>
            </h2>
            <p className="text-white/70 text-xs sm:text-sm mt-2.5 max-w-xl mx-auto leading-relaxed">
              Two decades of formulation excellence, weather-tested across South India's harshest conditions — from coastal humidity to peak UV summers.
            </p>
          </div>

          {/* Animated Stats Bar */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
          >
            {[
              { value: counts.years, suffix: '+', label: 'Years of Excellence', icon: Clock, color: BRAND_COLORS.magenta },
              { value: counts.shades, suffix: '+', label: 'Colour Shades', icon: Droplets, color: BRAND_COLORS.cyan },
              { value: counts.categories, suffix: '', label: 'Product Categories', icon: Layers, color: BRAND_COLORS.sun },
              { value: counts.cities, suffix: '+', label: 'Cities Covered', icon: MapPin, color: BRAND_COLORS.leaf },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="relative rounded-xl p-5 bg-white/[0.04] border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 text-center overflow-hidden group"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${stat.color}18 0%, transparent 70%)` }}
                  />
                  <div
                    className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}22`, border: `1px solid ${stat.color}44` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {stat.value.toLocaleString()}<span style={{ color: stat.color }}>{stat.suffix}</span>
                  </div>
                  <div className="text-[11px] text-white/55 font-semibold uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Trust Pillars Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {trustPillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="group relative rounded-xl p-6 bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 0% 0%, ${pillar.color}15 0%, transparent 65%)` }}
                  />
                  <div
                    className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${pillar.color}22`, border: `1px solid ${pillar.color}44` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: pillar.color }} />
                  </div>
                  <h4 className="text-white font-bold text-[15px] leading-snug mb-2">{pillar.label}</h4>
                  <p className="text-white/60 text-xs leading-relaxed">{pillar.description}</p>
                  <div
                    className="mt-4 h-0.5 w-10 rounded-full transition-all duration-500 group-hover:w-full"
                    style={{ backgroundColor: pillar.color }}
                  />
                </div>
              );
            })}
          </div>

          {/* Brand Journey Timeline + Quality Badges */}
          <div className="grid lg:grid-cols-12 gap-6">

            {/* Timeline */}
            <div className="lg:col-span-8 rounded-xl bg-white/[0.03] border border-white/10 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-4 h-4 text-cyan" />
                <span className="text-xs font-bold uppercase tracking-widest text-cyan">Brand Journey</span>
              </div>
              <div className="space-y-0">
                {timeline.map((item, i) => {
                  const isActive = activeTimelineStep === i;
                  return (
                    <button
                      key={i}
                      onClick={() => setActiveTimelineStep(i)}
                      className="w-full text-left group flex gap-4 py-3 border-b border-white/[0.06] last:border-0 cursor-pointer"
                    >
                      {/* Year pill + connector */}
                      <div className="flex flex-col items-center gap-1 flex-shrink-0 w-14">
                        <span
                          className={`text-[11px] font-black rounded-lg px-2 py-0.5 transition-all duration-300 ${
                            isActive
                              ? 'bg-magenta text-white shadow-lg shadow-magenta/40'
                              : 'bg-white/10 text-white/60 group-hover:bg-white/15 group-hover:text-white'
                          }`}
                        >
                          {item.year}
                        </span>
                        {i < timeline.length - 1 && (
                          <div className={`w-px flex-1 min-h-[16px] transition-colors duration-300 ${
                            isActive ? 'bg-magenta/60' : 'bg-white/10'
                          }`} />
                        )}
                      </div>
                      {/* Content */}
                      <div className="flex-1 pb-1">
                        <h5 className={`text-sm font-bold leading-snug transition-colors duration-200 ${
                          isActive ? 'text-white' : 'text-white/70 group-hover:text-white/90'
                        }`}>
                          {item.title}
                        </h5>
                        <p className={`text-xs leading-relaxed mt-1 transition-all duration-300 ${
                          isActive ? 'text-white/70 max-h-20' : 'text-white/40 max-h-0 overflow-hidden group-hover:max-h-20 group-hover:text-white/55'
                        }`}>
                          {item.description}
                        </p>
                      </div>
                      {isActive && (
                        <CheckCircle2 className="w-4 h-4 text-magenta flex-shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quality Guarantee Badges Panel */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {/* Main quality card */}
              <div className="flex-1 rounded-xl bg-gradient-to-b from-magenta/20 via-white/[0.04] to-violet/10 border border-magenta/30 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-magenta/20 border border-magenta/40 flex items-center justify-center mb-4">
                    <Star className="w-6 h-6 text-magenta" fill="currentColor" />
                  </div>
                  <h4 className="text-white font-bold text-lg leading-tight mb-2">Quality Assured</h4>
                  <p className="text-white/65 text-xs leading-relaxed">
                    Every Mathulac batch undergoes rigorous pigment consistency checks, adhesion tests, and weather simulation before dispatch.
                  </p>
                </div>
                <div className="mt-5 space-y-2">
                  {[
                    'IS 101 & IS 133 Compliant',
                    'Lead-Free Formulations',
                    'UV Stability Tested',
                    'Eco-Certified Low VOC',
                  ].map((badge, b) => (
                    <div key={b} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-magenta flex-shrink-0" />
                      <span className="text-xs text-white/80 font-medium">{badge}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA nudge card */}
              <div className="rounded-xl bg-gradient-to-r from-cyan/15 to-blue-600/15 border border-cyan/25 p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan/20 border border-cyan/30 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-cyan" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Trusted by 10,000+</div>
                  <div className="text-white/55 text-[11px] leading-snug mt-0.5">Painters, architects & homeowners across South India</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CATEGORY PRODUCTS SHOWCASE GRID */}
        {/* ============================================================ */}
        <div className="mt-16" data-reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-3 border-b border-white/10">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-cyan flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-magenta" /> {selectedCategory.name} Formulation Lineup
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-white font-bold mt-1">
                {selectedCategory.name} Products ({categoryProducts.length} Systems)
              </h3>
              <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-2xl">
                {selectedCategory.description}
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-white/50 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 self-start sm:self-auto">
              Division {String(selectedCategory.orderNumber).padStart(2, '0')}
            </span>
          </div>

          {categoryProducts.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categoryProducts.map((p, idx) => {
                const isSelected = p.id === currentProduct?.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      setActiveProductIndex(idx);
                      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`paint-product-card group relative rounded-xl p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${isSelected
                      ? 'bg-gradient-to-b from-magenta/25 via-white/[0.08] to-violet/20 border-magenta shadow-xl shadow-magenta/20 ring-1 ring-magenta/50 scale-[1.02]'
                      : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/10 hover:border-white/25 hover:-translate-y-1'
                      }`}
                    style={{ '--paint-accent': p.color || '#00C8FF' } as React.CSSProperties}
                  >
                    {/* Top Header */}
                    <div>
                      {/* Image Container with high quality local product asset */}
                      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-gradient-to-b from-[#161a28] via-[#0f1320] to-[#080a12] border border-white/10 mb-4 shadow-inner flex items-center justify-center p-3">
                        {/* Ambient Glow */}
                        <div
                          className="absolute inset-0 m-auto w-32 h-32 rounded-full filter blur-2xl opacity-40 pointer-events-none"
                          style={{ backgroundColor: p.color || '#00C8FF' }}
                        />

                        <img
                          src={p.image}
                          alt={p.name}
                          className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)] filter brightness-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none z-10" />

                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-magenta text-white font-extrabold text-[10px] uppercase tracking-wider shadow z-20">
                            Active Product
                          </div>
                        )}
                      </div>

                      {/* Product Name */}
                      <h4 className="font-display text-lg font-bold text-white group-hover:text-cyan transition-colors leading-snug">
                        {p.name}
                      </h4>

                      {/* Description */}
                      <p className="text-white/65 text-xs mt-2 line-clamp-3 leading-relaxed">
                        {p.description}
                      </p>

                      {/* Available In Sizes */}
                      <div className="mt-3.5 pt-3 border-t border-white/10">
                        <span className="text-[9px] uppercase font-bold text-white/50 block tracking-wider mb-1.5">
                          Available in:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {p.availableSizes.map((size, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-[10px] font-mono text-white/80"
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs font-bold text-magenta group-hover:underline inline-flex items-center gap-1">
                        <span>Inspect Product Details</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 rounded-xl bg-white/[0.02] border border-white/10 text-center py-10">
              <span className="text-sm text-white/70 block font-semibold mb-1">
                No products uploaded for {selectedCategory.name} currently.
              </span>
              <span className="text-xs text-white/40">
                New formulations and catalog updates are under development.
              </span>
            </div>
          )}
        </div>
        </div>
      </div>

      {/* Category Products Modal */}
      {categoryModal && (
        <CategoryProductsModal
          category={categoryModal}
          products={mathulacProductItems.filter((p) => p.categoryKey === categoryModal.id)}
          onClose={() => setCategoryModal(null)}
          onSelectProduct={(p) => {
            const cat = mathulacCategories.find((c) => c.id === p.categoryKey);
            if (cat) setSelectedCategory(cat);
            const idx = mathulacProductItems
              .filter((item) => item.categoryKey === p.categoryKey)
              .findIndex((item) => item.id === p.id);
            if (idx >= 0) setActiveProductIndex(idx);
          }}
          onConsult={handleConsult}
        />
      )}
    </section>
  );
}

export default ProductShowcase;
