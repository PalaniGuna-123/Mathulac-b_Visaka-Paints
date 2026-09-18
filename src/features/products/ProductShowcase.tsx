import React, { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
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
  Search,
  X,
  ChevronDown,
  Check,
} from 'lucide-react';
import {
  mathulacCategories,
  mathulacProductItems,
  type CatalogCategory,
} from '../../data/products';
import { productAssetMap } from '../../data/productAssets';
import { BRAND_COLORS } from '../../styles/colors';
import type { MathulacProductItem } from '../../types';
import { ProductVisual } from './ProductVisual';
import { trustPillars, timeline } from '../../data/brand';
import { gsap, ScrollTrigger } from '../../lib/animation';
import { Link } from '../../routes/Router';

interface ProductShowcaseProps {
  initialFilter?: string;
  scrollTo?: (id: string) => void;
  showTrustSection?: boolean;
  pinned?: boolean;
}

// Human-readable labels for surface filters
const surfaceLabels: Record<string, string> = {
  all: 'All surfaces',
  wood: 'Wood & Timber',
  metal: 'Metal & Steel',
  auto: 'Auto & Primer',
  walls: 'Walls & Putty',
  exterior: 'Exterior',
};

// Available standard pack sizes for quick multi-selection
const ALL_PACK_SIZES = ['500 ml', '1 Ltr', '4 Ltr', '5 Ltr', '20 Ltr', '1 kg', '7 kg', '35 kg'];

// Helper to accurately match products to surface types
const matchesSurface = (product: MathulacProductItem, surface: string): boolean => {
  if (surface === 'all') return true;
  const text = `${product.name} ${product.description} ${product.categoryName} ${(product.features || []).join(' ')}`.toLowerCase();

  switch (surface) {
    case 'wood':
      return (
        product.categoryKey === 'wood-coatings' ||
        text.includes('wood') ||
        text.includes('timber') ||
        text.includes('melamine') ||
        text.includes('table top') ||
        text.includes('sanding sealer')
      );
    case 'metal':
      return (
        product.categoryKey === 'aluminium-paints' ||
        product.categoryKey === 'hammertone-paints' ||
        product.categoryKey === 'gp-enamels' ||
        product.categoryKey === 'synthetic-enamels' ||
        text.includes('metal') ||
        text.includes('steel') ||
        text.includes('iron') ||
        text.includes('chassis') ||
        text.includes('aluminium') ||
        text.includes('grill') ||
        text.includes('gate')
      );
    case 'auto':
      return (
        product.categoryKey === 'primers-auto-putty' ||
        text.includes('auto') ||
        text.includes('chassis') ||
        text.includes('nc putty') ||
        text.includes('og putty') ||
        text.includes('qd primer') ||
        text.includes('pu thinner')
      );
    case 'walls':
      return (
        product.categoryKey === 'acrylic-cement-putty' ||
        product.categoryKey === 'interior-exterior-primers' ||
        product.categoryKey === 'trendy-interior-products' ||
        text.includes('wall') ||
        text.includes('distemper') ||
        text.includes('emulsion') ||
        text.includes('plaster') ||
        text.includes('cement') ||
        text.includes('interior')
      );
    case 'exterior':
      return (
        product.categoryKey === 'exterior-emulsion' ||
        product.categoryKey === 'tile-coat' ||
        text.includes('exterior') ||
        text.includes('weather') ||
        text.includes('optima') ||
        text.includes('apt')
      );
    default:
      return true;
  }
};

export function ProductShowcase({
  initialFilter = 'all',
  scrollTo,
  showTrustSection = false,
  pinned = false,
}: ProductShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);

  // Multi-Category selection (empty or ['all'] means all categories)
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(() => {
    if (!initialFilter || initialFilter === 'all') return [];
    return [initialFilter];
  });

  // Search and multi-filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSurface, setSelectedSurface] = useState('all');
  const [selectedPackSizes, setSelectedPackSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'default' | 'name-asc' | 'name-desc'>('default');

  // Modal temporary state (staged until "Apply" is clicked)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [tempCategoryIds, setTempCategoryIds] = useState<string[]>([]);
  const [tempSurface, setTempSurface] = useState('all');
  const [tempPackSizes, setTempPackSizes] = useState<string[]>([]);
  const [tempSort, setTempSort] = useState<'default' | 'name-asc' | 'name-desc'>('default');

  // Active filter count for badge indicator
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategoryIds.length > 0 && !selectedCategoryIds.includes('all')) {
      count += selectedCategoryIds.length;
    }
    if (selectedSurface !== 'all') {
      count += 1;
    }
    if (selectedPackSizes.length > 0 && !selectedPackSizes.includes('all')) {
      count += selectedPackSizes.length;
    }
    if (searchQuery.trim()) {
      count += 1;
    }
    return count;
  }, [selectedCategoryIds, selectedSurface, selectedPackSizes, searchQuery]);

  // Backward-compatibility alias for category object
  const activeCategory =
    selectedCategoryIds.length === 1 && selectedCategoryIds[0] !== 'all'
      ? mathulacCategories.find((c) => c.id === selectedCategoryIds[0]) || null
      : null;

  // Filtered products combining multi-category, surface, multi-pack-size & search
  const displayedProducts = useMemo(() => {
    return mathulacProductItems
      .filter((product) => {
        // 1. Multi-Category filter
        if (
          selectedCategoryIds.length > 0 &&
          !selectedCategoryIds.includes('all') &&
          !selectedCategoryIds.includes(product.categoryKey)
        ) {
          return false;
        }

        // 2. Surface / application filter
        if (selectedSurface !== 'all' && !matchesSurface(product, selectedSurface)) {
          return false;
        }

        // 3. Multi-Pack size filter
        if (selectedPackSizes.length > 0 && !selectedPackSizes.includes('all')) {
          const matchesAnySize = selectedPackSizes.some((filterSize) =>
            product.availableSizes.some((s) =>
              s.toLowerCase().includes(filterSize.toLowerCase())
            )
          );
          if (!matchesAnySize) return false;
        }

        // 4. Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const nameMatch = product.name.toLowerCase().includes(q);
          const catMatch = product.categoryName.toLowerCase().includes(q);
          const descMatch = product.description.toLowerCase().includes(q);
          const sizeMatch = product.availableSizes.some((s) => s.toLowerCase().includes(q));
          const featureMatch = (product.features || []).some((f) => f.toLowerCase().includes(q));
          if (!nameMatch && !catMatch && !descMatch && !sizeMatch && !featureMatch) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
        return 0;
      });
  }, [selectedCategoryIds, selectedSurface, selectedPackSizes, searchQuery, sortBy]);

  // Real-time staged preview count inside modal
  const stagedPreviewCount = useMemo(() => {
    return mathulacProductItems.filter((product) => {
      if (
        tempCategoryIds.length > 0 &&
        !tempCategoryIds.includes('all') &&
        !tempCategoryIds.includes(product.categoryKey)
      ) {
        return false;
      }
      if (tempSurface !== 'all' && !matchesSurface(product, tempSurface)) {
        return false;
      }
      if (tempPackSizes.length > 0 && !tempPackSizes.includes('all')) {
        const matchesAnySize = tempPackSizes.some((filterSize) =>
          product.availableSizes.some((s) =>
            s.toLowerCase().includes(filterSize.toLowerCase())
          )
        );
        if (!matchesAnySize) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch = product.name.toLowerCase().includes(q);
        const catMatch = product.categoryName.toLowerCase().includes(q);
        const descMatch = product.description.toLowerCase().includes(q);
        if (!nameMatch && !catMatch && !descMatch) return false;
      }
      return true;
    }).length;
  }, [tempCategoryIds, tempSurface, tempPackSizes, searchQuery]);

  // Backward-compatibility alias
  const selectedCategory = activeCategory || mathulacCategories[0];
  const categoryProducts = displayedProducts;

  // Active product index
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  // Active product for technical inspection
  const currentProduct: MathulacProductItem =
    displayedProducts[activeProductIndex] || displayedProducts[0] || mathulacProductItems[0];

  // Modal for full category product list is removed in favor of direct full-page showcase
  // Animated stat counters
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useLayoutEffect(() => {
    if (!pinned) return;
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
  }, [pinned]);

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

  // Sync selectedCategoryIds when the initialFilter prop changes
  useEffect(() => {
    if (initialFilter && initialFilter !== 'all') {
      setSelectedCategoryIds([initialFilter]);
    } else if (initialFilter === 'all') {
      setSelectedCategoryIds([]);
    }
  }, [initialFilter]);

  // Reset product index when category or filters change
  useEffect(() => {
    setActiveProductIndex(0);
  }, [selectedCategoryIds, selectedSurface, selectedPackSizes, searchQuery]);

  const handlePrevProduct = () => {
    setActiveProductIndex((prev) =>
      prev > 0 ? prev - 1 : Math.max(0, displayedProducts.length - 1)
    );
  };

  const handleNextProduct = () => {
    setActiveProductIndex((prev) =>
      prev < displayedProducts.length - 1 ? prev + 1 : 0
    );
  };

  const toggleTempCategory = (catId: string) => {
    if (catId === 'all') {
      setTempCategoryIds([]);
      return;
    }
    setTempCategoryIds((prev) =>
      prev.includes(catId)
        ? prev.filter((id) => id !== catId)
        : [...prev.filter((id) => id !== 'all'), catId]
    );
  };

  const toggleTempPackSize = (size: string) => {
    if (size === 'all') {
      setTempPackSizes([]);
      return;
    }
    setTempPackSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev.filter((s) => s !== 'all'), size]
    );
  };

  const openFilterModal = () => {
    setTempCategoryIds([...selectedCategoryIds]);
    setTempSurface(selectedSurface);
    setTempPackSizes([...selectedPackSizes]);
    setTempSort(sortBy);
    setIsFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleClearFilters = () => {
    setTempCategoryIds([]);
    setTempSurface('all');
    setTempPackSizes([]);
    setTempSort('default');
  };

  const handleApplyFilters = () => {
    setSelectedCategoryIds(tempCategoryIds);
    setSelectedSurface(tempSurface);
    setSelectedPackSizes(tempPackSizes);
    setSortBy(tempSort);
    setIsFilterModalOpen(false);
    setActiveProductIndex(0);
    const el = document.getElementById('product-viewer');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const resetAllFilters = () => {
    setSelectedCategoryIds([]);
    setSelectedSurface('all');
    setSelectedPackSizes([]);
    setSearchQuery('');
    setSortBy('default');
    setActiveProductIndex(0);
  };

  const removeCategory = (id: string) => {
    setSelectedCategoryIds((prev) => prev.filter((c) => c !== id));
  };

  const removePackSize = (size: string) => {
    setSelectedPackSizes((prev) => prev.filter((s) => s !== size));
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

          {/* ============================================================ */}
          {/* MOBILE SEARCH & FILTER BAR (Strictly for Mobile Responsive: md:hidden) */}
          {/* Search bar on the LEFT, Filter icon with count badge on the RIGHT */}
          {/* ============================================================ */}
          <div className="block md:hidden mb-6" data-reveal>
            <div className="flex items-center gap-2.5">
              {/* Search bar on the LEFT */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white/[0.06] border border-white/20 text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white cursor-pointer"
                    aria-label="Clear search query"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Filter Icon Button on the RIGHT with Numerical Badge */}
              <button
                onClick={openFilterModal}
                className={`relative p-2.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer shadow-md flex-shrink-0 ${
                  activeFilterCount > 0
                    ? 'bg-red-600/25 border-red-500 text-white ring-1 ring-red-500/50'
                    : 'bg-white/[0.06] hover:bg-white/[0.12] border-white/20 text-white hover:text-white'
                }`}
                aria-label="Open filter options"
                title="Filter products"
              >
                {/* 3 tapering horizontal bars icon matching Image 2 */}
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                >
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="7" y1="12" x2="17" y2="12" />
                  <line x1="10" y1="18" x2="14" y2="18" />
                </svg>
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[19px] h-[19px] px-1 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center ring-2 ring-[#0B0D17] shadow-lg">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Filter Status summary & quick clear */}
            <div className="flex items-center justify-between mt-2.5 px-0.5 text-xs text-white/60">
              <span className="font-medium text-[11px]">
                Showing {displayedProducts.length} {displayedProducts.length === 1 ? 'product' : 'products'}
                {selectedCategoryIds.length === 1 && (
                  <span className="text-cyan ml-1 font-bold">
                    • {mathulacCategories.find((c) => c.id === selectedCategoryIds[0])?.name || selectedCategoryIds[0]}
                  </span>
                )}
                {selectedCategoryIds.length > 1 && (
                  <span className="text-cyan ml-1 font-bold">
                    • {selectedCategoryIds.length} categories
                  </span>
                )}
              </span>
              {activeFilterCount > 0 && (
                <button
                  onClick={resetAllFilters}
                  className="text-red-400 hover:text-red-300 font-semibold underline text-[11px] cursor-pointer"
                >
                  Reset filters
                </button>
              )}
            </div>

            {/* Mobile Multi-Filter Active Chips Row (Wrapped cleanly so all chips are fully visible on screen without swiping/scrollbar) */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                {/* Category Chips */}
                {selectedCategoryIds.map((catId) => {
                  const cat = mathulacCategories.find((c) => c.id === catId);
                  return (
                    <span
                      key={catId}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-magenta/20 border border-magenta/40 text-white text-[11px] font-medium shadow-sm transition-all"
                    >
                      <span>{cat?.name || catId}</span>
                      <button
                        onClick={() => removeCategory(catId)}
                        className="text-white/60 hover:text-white p-0.5 rounded hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
                        aria-label={`Remove ${cat?.name || catId} filter`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })}

                {/* Surface Chip */}
                {selectedSurface !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan/20 border border-cyan/40 text-cyan text-[11px] font-medium shadow-sm transition-all">
                    <span>Surface: {surfaceLabels[selectedSurface] || selectedSurface}</span>
                    <button
                      onClick={() => setSelectedSurface('all')}
                      className="text-cyan/60 hover:text-white p-0.5 rounded hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
                      aria-label="Remove surface filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {/* Pack Size Chips */}
                {selectedPackSizes.map((size) => (
                  <span
                    key={size}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/20 border border-purple-400/40 text-purple-200 text-[11px] font-medium shadow-sm transition-all"
                  >
                    <span>{size}</span>
                    <button
                      onClick={() => removePackSize(size)}
                      className="text-purple-200/60 hover:text-white p-0.5 rounded hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
                      aria-label={`Remove ${size} filter`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {/* Search Chip */}
                {searchQuery.trim() && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 text-white/90 text-[11px] font-medium shadow-sm transition-all">
                    <span>"{searchQuery.trim()}"</span>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-white/60 hover:text-white p-0.5 rounded hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
                      aria-label="Clear search query"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  onClick={resetAllFilters}
                  className="text-[11px] font-bold text-red-400 hover:text-red-300 underline px-1 py-0.5 cursor-pointer transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* ============================================================ */}
          {/* FILTER POPUP MODAL (Multi-Filter Enhanced, Image 2 Styling) */}
          {/* ============================================================ */}
          {isFilterModalOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={(e) => {
                if (e.target === e.currentTarget) closeFilterModal();
              }}
            >
              <div
                role="dialog"
                aria-modal="true"
                className="w-full max-w-[460px] max-h-[88vh] bg-[#121624] border border-white/20 rounded-2xl shadow-2xl shadow-black/90 relative text-white flex flex-col overflow-hidden"
              >
                {/* Header: Filter Icon + "Filter Products" on Left, "Close" on Right */}
                <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 flex-shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-500">
                      {/* Filter icon from Image 2 */}
                      <svg
                        className="w-4 h-4 text-red-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      >
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="7" y1="12" x2="17" y2="12" />
                        <line x1="10" y1="18" x2="14" y2="18" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white tracking-tight leading-none">
                        Filter Products
                      </h3>
                      <p className="text-[11px] text-white/50 mt-1">
                        Select multiple categories, surfaces &amp; sizes
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={closeFilterModal}
                    className="text-sm font-semibold text-white/60 hover:text-white transition-colors cursor-pointer px-2.5 py-1 rounded-lg hover:bg-white/10"
                  >
                    Close
                  </button>
                </div>

                {/* Modal Scrollable Body */}
                <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
                  {/* Category Multi-Selection */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-white/80">
                        Categories
                      </label>
                      <span className="text-[11px] text-cyan font-semibold">
                        {tempCategoryIds.length === 0 ? 'All Categories' : `${tempCategoryIds.length} Selected`}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => setTempCategoryIds([])}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                          tempCategoryIds.length === 0
                            ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-500 shadow-md shadow-red-600/30 font-bold'
                            : 'bg-white/[0.05] text-white/70 hover:text-white border-white/10 hover:bg-white/10'
                        }`}
                      >
                        All Categories
                      </button>
                      {mathulacCategories.map((cat) => {
                        const isCatActive = tempCategoryIds.includes(cat.id);
                        const catCount = mathulacProductItems.filter((p) => p.categoryKey === cat.id).length;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => toggleTempCategory(cat.id)}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border flex items-center gap-1.5 ${
                              isCatActive
                                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-500 shadow-md shadow-red-600/30 font-bold'
                                : 'bg-white/[0.05] text-white/70 hover:text-white border-white/10 hover:bg-white/10'
                            }`}
                          >
                            {isCatActive && <Check className="w-3 h-3 text-white flex-shrink-0" />}
                            <span>{cat.name}</span>
                            <span className={`text-[10px] ${isCatActive ? 'text-white/90' : 'text-white/40'}`}>
                              ({catCount})
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2-Column Grid: Surface & Sort Order */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    {/* Surface Dropdown */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                        Surface
                      </label>
                      <div className="relative">
                        <select
                          value={tempSurface}
                          onChange={(e) => setTempSurface(e.target.value)}
                          className="w-full appearance-none bg-white/[0.06] border border-white/20 rounded-xl px-3 py-2 pr-7 text-xs text-white focus:outline-none focus:border-cyan transition-all cursor-pointer truncate"
                        >
                          <option value="all" className="bg-[#121624] text-white">All surfaces</option>
                          <option value="wood" className="bg-[#121624] text-white">Wood &amp; Timber</option>
                          <option value="metal" className="bg-[#121624] text-white">Metal &amp; Steel</option>
                          <option value="auto" className="bg-[#121624] text-white">Auto &amp; Primer</option>
                          <option value="walls" className="bg-[#121624] text-white">Walls &amp; Putty</option>
                          <option value="exterior" className="bg-[#121624] text-white">Exterior</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-white/50 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Sort Order Dropdown */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                        Sort By
                      </label>
                      <div className="relative">
                        <select
                          value={tempSort}
                          onChange={(e) => setTempSort(e.target.value as any)}
                          className="w-full appearance-none bg-white/[0.06] border border-white/20 rounded-xl px-3 py-2 pr-7 text-xs text-white focus:outline-none focus:border-cyan transition-all cursor-pointer truncate"
                        >
                          <option value="default" className="bg-[#121624] text-white">Default</option>
                          <option value="name-asc" className="bg-[#121624] text-white">Name: A to Z</option>
                          <option value="name-desc" className="bg-[#121624] text-white">Name: Z to A</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-white/50 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Pack Sizes Multi-Selection */}
                  <div className="pt-1">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-white/80">
                        Available Pack Sizes
                      </label>
                      <span className="text-[11px] text-purple-300 font-semibold">
                        {tempPackSizes.length === 0 ? 'All Sizes' : `${tempPackSizes.length} Selected`}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => setTempPackSizes([])}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                          tempPackSizes.length === 0
                            ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-600/30 font-bold'
                            : 'bg-white/[0.05] text-white/70 hover:text-white border-white/10 hover:bg-white/10'
                        }`}
                      >
                        All Sizes
                      </button>
                      {ALL_PACK_SIZES.map((size) => {
                        const isSizeActive = tempPackSizes.includes(size);
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => toggleTempPackSize(size)}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer border flex items-center gap-1 ${
                              isSizeActive
                                ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-600/30 font-bold'
                                : 'bg-white/[0.05] text-white/70 hover:text-white border-white/10 hover:bg-white/10'
                            }`}
                          >
                            {isSizeActive && <Check className="w-3 h-3 text-white flex-shrink-0" />}
                            <span>{size}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Sticky Footer: Clear on Left, Live-count Apply on Right */}
                <div className="p-4 sm:p-5 border-t border-white/10 bg-[#0E121E] flex items-center justify-between gap-3 flex-shrink-0">
                  <button
                    onClick={handleClearFilters}
                    className="px-5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white/80 hover:text-white text-xs sm:text-sm font-semibold border border-white/15 transition-all cursor-pointer"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={handleApplyFilters}
                    className="px-7 py-2.5 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs sm:text-sm font-bold shadow-lg shadow-red-600/30 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>Apply ({stagedPreviewCount} {stagedPreviewCount === 1 ? 'Product' : 'Products'})</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 12-Category Grid Selector (Desktop only: hidden md:block) */}
          <div className="mb-10 hidden md:block" data-reveal>
            <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-white/60 flex items-center gap-2">
                  <Grid className="w-4 h-4 text-magenta" /> Select Product Category (12 Systems)
                </span>
                <button
                  onClick={() => setSelectedCategoryIds([])}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                    selectedCategoryIds.length === 0
                      ? 'bg-gradient-to-r from-magenta to-cyan text-white border-transparent shadow-md shadow-magenta/20 scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border-white/15'
                  }`}
                >
                  All Products ({mathulacProductItems.length})
                </button>
              </div>

              <div className="flex items-center gap-3">
                {/* Desktop Search Bar */}
                <div className="relative w-52">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-cyan transition-all"
                  />
                  <Search className="w-3.5 h-3.5 text-white/40 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => {
                    const el = document.getElementById('category-lineup');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-cyan hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Layers className="w-3.5 h-3.5 text-magenta" /> View Gallery ({displayedProducts.length})
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
              {mathulacCategories.map((cat) => {
                const isSelected = selectedCategoryIds.includes(cat.id);
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategoryIds((prev) =>
                        prev.includes(cat.id)
                          ? prev.filter((id) => id !== cat.id)
                          : [...prev.filter((id) => id !== 'all'), cat.id]
                      );
                    }}
                    aria-pressed={isSelected}
                    className={`paint-category group relative p-3 rounded-xl text-left transition-all duration-300 cursor-pointer border flex flex-col justify-between ${
                      isSelected
                        ? 'is-paint-active bg-gradient-to-b from-magenta/25 via-white/[0.08] to-violet/20 border-magenta shadow-lg shadow-magenta/20 scale-[1.02] ring-1 ring-magenta/40'
                        : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/10 hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-magenta' : 'text-white/40'}`}>
                        {String(cat.orderNumber).padStart(2, '0')}
                      </span>
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${
                          isSelected ? 'bg-magenta text-white' : 'bg-white/10 text-white/70'
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

            {/* Desktop Active Filters Bar */}
            {activeFilterCount > 0 && (
              <div className="flex items-center flex-wrap gap-2 mt-3 pt-3 border-t border-white/10 text-xs">
                <span className="text-white/50 font-semibold text-[11px]">Active Filters ({activeFilterCount}):</span>
                {selectedCategoryIds.map((catId) => {
                  const cat = mathulacCategories.find((c) => c.id === catId);
                  return (
                    <span
                      key={catId}
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-magenta/20 border border-magenta/40 text-white text-[11px] font-semibold"
                    >
                      <span>{cat?.name || catId}</span>
                      <button
                        onClick={() => removeCategory(catId)}
                        className="hover:text-red-400 p-0.5 cursor-pointer"
                        title={`Remove ${cat?.name || catId}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })}
                {selectedSurface !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan/20 border border-cyan/40 text-cyan text-[11px] font-semibold">
                    <span>Surface: {surfaceLabels[selectedSurface] || selectedSurface}</span>
                    <button
                      onClick={() => setSelectedSurface('all')}
                      className="hover:text-red-400 p-0.5 cursor-pointer"
                      title="Remove surface filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedPackSizes.map((size) => (
                  <span
                    key={size}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-200 text-[11px] font-semibold"
                  >
                    <span>Size: {size}</span>
                    <button
                      onClick={() => removePackSize(size)}
                      className="hover:text-red-400 p-0.5 cursor-pointer"
                      title={`Remove size ${size}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {searchQuery.trim() && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-[11px] font-semibold">
                    <span>Search: "{searchQuery.trim()}"</span>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="hover:text-red-400 p-0.5 cursor-pointer"
                      title="Clear search"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={resetAllFilters}
                  className="text-red-400 hover:text-red-300 font-bold underline text-[11px] ml-2 cursor-pointer"
                >
                  Reset all
                </button>
              </div>
            )}
          </div>

          {/* ============================================================ */}
          {/* MAIN TECHNICAL DATA SHOWCASE (Exact Full Page Viewer) */}
          {/* ============================================================ */}
          {displayedProducts.length > 0 && currentProduct ? (
            <div
              id="product-viewer"
              key={currentProduct.id}
              className="max-w-[1120px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-8 scroll-mt-24"
              data-reveal
            >
              {/* Left Column: Real Product Visual (5 cols) */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center gap-2 relative">
                {/* Product Quick-Switch Tabs for Multi-Product Catalog (Desktop Only) */}
                {displayedProducts.length > 1 && (
                  <div className="w-full hidden md:flex flex-wrap items-center justify-center gap-1.5 mb-2">
                    {displayedProducts.slice(0, 6).map((p, idx) => {
                      const isCurrent = idx === activeProductIndex;
                      return (
                        <button
                          key={p.id}
                          onClick={() => setActiveProductIndex(idx)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer border ${
                            isCurrent
                              ? 'bg-gradient-to-r from-magenta/30 via-white/15 to-cyan/25 border-cyan text-white shadow-md shadow-cyan/20 scale-[1.02]'
                              : 'bg-white/[0.04] hover:bg-white/[0.09] text-white/70 hover:text-white border-white/10'
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

                {/* Real Product Image Stage with Side-Based Next & Previous Navigation */}
                <div
                  className="product-paint-stage w-full flex items-center justify-center relative rounded-3xl overflow-hidden group"
                  style={{ '--paint-accent': currentProduct.color || '#00C8FF' } as React.CSSProperties}
                >
                  {/* Side-Based Previous Button (Left Side) */}
                  {displayedProducts.length > 1 && (
                    <button
                      onClick={handlePrevProduct}
                      aria-label="Previous product"
                      title="Previous Product"
                      className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/85 text-white/80 hover:text-white border border-white/20 hover:border-cyan/60 flex items-center justify-center backdrop-blur-md shadow-xl hover:shadow-cyan/25 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  )}

                  <ProductVisual
                    product={currentProduct}
                    className="w-full h-[280px] sm:h-[340px] md:h-[380px]"
                  />

                  {/* Side-Based Next Button (Right Side) */}
                  {displayedProducts.length > 1 && (
                    <button
                      onClick={handleNextProduct}
                      aria-label="Next product"
                      title="Next Product"
                      className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/85 text-white/80 hover:text-white border border-white/20 hover:border-cyan/60 flex items-center justify-center backdrop-blur-md shadow-xl hover:shadow-cyan/25 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  )}

                  {/* Indicator Dots overlay inside image stage */}
                  {displayedProducts.length > 1 && (
                    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                      {displayedProducts.slice(0, 8).map((p, idx) => (
                        <button
                          key={p.id}
                          onClick={() => setActiveProductIndex(idx)}
                          className={`transition-all cursor-pointer rounded-full ${
                            idx === activeProductIndex
                              ? 'w-5 h-2 bg-gradient-to-r from-magenta to-cyan'
                              : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                          }`}
                          title={p.name}
                          aria-label={`Go to ${p.name}`}
                        />
                      ))}
                      {displayedProducts.length > 8 && (
                        <span className="text-[10px] font-mono text-white/50 ml-1">
                          {activeProductIndex + 1}/{displayedProducts.length}
                        </span>
                      )}
                    </div>
                  )}
                </div>
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
                      {activeCategory ? activeCategory.name : currentProduct.categoryName} • Division {activeCategory ? String(activeCategory.orderNumber).padStart(2, '0') : 'Master'} formulation engineered for maximum durability and finish.
                    </p>

                    {/* Structured Technical Specification Rows */}
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
                                className="px-2.5 py-0.5 rounded-md bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 hover:border-cyan/40 hover:shadow-sm hover:shadow-cyan/20 text-[11px] font-mono font-semibold text-white/90 hover:text-white hover:scale-105 transition-all duration-200 cursor-default select-none"
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
                            {activeCategory ? `${String(activeCategory.orderNumber).padStart(2, '0')} • ` : ''}{currentProduct.categoryName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Empty State when no products match filters */
            <div
              className="rounded-xl p-8 sm:p-12 bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 text-center mb-16 max-w-3xl mx-auto shadow-2xl"
              data-reveal
            >
              <div className="w-16 h-16 rounded-2xl bg-magenta/20 border border-magenta/40 flex items-center justify-center text-magenta mx-auto mb-4">
                <Paintbrush className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono font-bold text-magenta uppercase tracking-widest block mb-1">
                {activeCategory ? `Division ${String(activeCategory.orderNumber).padStart(2, '0')} • ${activeCategory.name}` : 'Catalog Filter'}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-white font-bold mb-2">
                {activeCategory ? 'Formulations Under Active Development' : 'No Products Match Selected Filters'}
              </h3>
              <p className="text-white/70 text-sm max-w-lg mx-auto leading-relaxed mb-6">
                {activeCategory
                  ? `No product is uploaded for ${activeCategory.name} currently. New formulations, technical datasheets, and container imagery are under development.`
                  : 'Try clearing your search query or selecting a different category/surface filter.'}
              </p>
              <button
                onClick={resetAllFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan" /> Show All Mathulac Products
              </button>
            </div>
          )}

          {/* Clean In-Page Action Strip below the Card */}
          {currentProduct && (
            <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-3 mb-16" data-reveal>
              <Link
                to={`/product/${currentProduct.id}`}
                className="paint-button py-3.5 px-6 rounded-xl bg-gradient-to-r from-magenta via-purple-600 to-cyan text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-magenta/30 hover:scale-105 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Open {currentProduct.name} Full Page</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={handleConsult}
                className="paint-button paint-button--blue py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan via-teal-500 to-blue-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-cyan/30 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Request Consultation</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('category-lineup');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="paint-button py-3.5 px-6 rounded-xl bg-white/[0.08] hover:bg-white/[0.16] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer border border-white/20 backdrop-blur-md shadow-lg transition-all hover:scale-105"
              >
                <Layers className="w-4 h-4 text-cyan" />
                <span>All {activeCategory ? activeCategory.name : 'Products'} ({displayedProducts.length})</span>
              </button>
            </div>
          )}

          {/* ============================================================ */}
          {/* CATEGORY PRODUCTS SHOWCASE FULL-PAGE GALLERY */}
          {/* ============================================================ */}
          <div id="category-lineup" className="mt-16 scroll-mt-24" data-reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-3 border-b border-white/10">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-cyan flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-magenta" />{' '}
                  {activeCategory
                    ? `${activeCategory.name} Formulation Lineup`
                    : selectedCategoryIds.length > 1
                    ? `${selectedCategoryIds.length} Selected Categories Lineup`
                    : 'Mathulac Complete Lineup'}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-white font-bold mt-1">
                  {activeCategory
                    ? `${activeCategory.name} Products`
                    : selectedCategoryIds.length > 1
                    ? 'Selected Formulations'
                    : 'All Mathulac Formulations'}{' '}
                  ({displayedProducts.length} Systems)
                </h3>
                <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-2xl">
                  {activeCategory
                    ? activeCategory.description
                    : selectedCategoryIds.length > 1
                    ? `Showing formulations from ${selectedCategoryIds.length} selected product categories.`
                    : 'Thinners, primers, putty, emulsions, enamels, and wood coatings engineered for Indian weather.'}
                </p>
              </div>
              {activeCategory ? (
                <span className="text-xs font-mono font-bold text-white/50 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 self-start sm:self-auto">
                  Division {String(activeCategory.orderNumber).padStart(2, '0')}
                </span>
              ) : selectedCategoryIds.length > 1 ? (
                <span className="text-xs font-mono font-bold text-magenta bg-magenta/10 px-3 py-1.5 rounded-full border border-magenta/20 self-start sm:self-auto">
                  {selectedCategoryIds.length} Categories ({displayedProducts.length})
                </span>
              ) : (
                <span className="text-xs font-mono font-bold text-cyan bg-cyan/10 px-3 py-1.5 rounded-full border border-cyan/20 self-start sm:self-auto">
                  Complete Catalog ({displayedProducts.length})
                </span>
              )}
            </div>

            {displayedProducts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {displayedProducts.map((p, idx) => {
                  const isSelected = p.id === currentProduct?.id;
                  const activeImg = productAssetMap[p.id] || p.image;
                  return (
                    <div
                      key={p.id}
                      className={`paint-product-card group relative rounded-2xl p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between overflow-hidden ${isSelected
                        ? 'bg-gradient-to-b from-magenta/25 via-white/[0.08] to-violet/20 border-cyan shadow-2xl shadow-cyan/20 ring-1 ring-cyan/50 scale-[1.02]'
                        : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/10 hover:border-white/30 hover:-translate-y-1'
                        }`}
                      style={{ '--paint-accent': p.color || '#00C8FF' } as React.CSSProperties}
                    >
                      {/* Top Header */}
                      <div>
                        {/* Category Badge */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/[0.08] border border-white/15 text-cyan">
                            {p.categoryName}
                          </span>
                          {isSelected && (
                            <span className="text-[9px] font-bold uppercase tracking-wider text-magenta bg-magenta/10 border border-magenta/25 px-2 py-0.5 rounded-md">
                              Active
                            </span>
                          )}
                        </div>

                        {/* Image Container with high quality product asset */}
                        <div
                          onClick={() => {
                            setActiveProductIndex(idx);
                            const el = document.getElementById('product-viewer');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="relative w-full aspect-[16/11] rounded-xl overflow-hidden bg-gradient-to-b from-[#161a28] via-[#0f1320] to-[#080a12] border border-white/10 mb-4 shadow-inner flex items-center justify-center p-4 cursor-pointer"
                        >
                          {/* Ambient Glow */}
                          <div
                            className="absolute inset-0 m-auto w-36 h-36 rounded-full filter blur-2xl opacity-40 pointer-events-none"
                            style={{ backgroundColor: p.color || '#00C8FF' }}
                          />

                          <img
                            src={activeImg}
                            alt={p.name}
                            className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_18px_30px_rgba(0,0,0,0.85)] filter brightness-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-10" />

                          {isSelected && (
                            <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-cyan text-black font-extrabold text-[10px] uppercase tracking-wider shadow z-20">
                              Active in Viewer
                            </div>
                          )}
                        </div>

                        {/* Product Name */}
                        <h4 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-cyan transition-colors leading-snug">
                          <Link to={`/product/${p.id}`} className="hover:underline">
                            {p.name}
                          </Link>
                        </h4>

                        {/* Description */}
                        <p className="text-white/65 text-xs sm:text-[13px] mt-2 line-clamp-3 leading-relaxed">
                          {p.description}
                        </p>

                        {/* Available In Sizes */}
                        <div className="mt-4 pt-3 border-t border-white/10">
                          <span className="text-[9px] uppercase font-bold text-white/50 block tracking-wider mb-1.5">
                            Available Pack Sizes:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {p.availableSizes.map((size, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-2.5 py-0.5 rounded-md bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 hover:border-cyan/40 hover:shadow-sm hover:shadow-cyan/20 text-[10px] font-mono font-semibold text-white/85 hover:text-white hover:scale-105 transition-all duration-200 cursor-default select-none"
                              >
                                {size}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action Footer: Dual Action (Inspect or Full Page) */}
                      <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                        <button
                          onClick={() => {
                            setActiveProductIndex(idx);
                            const el = document.getElementById('product-viewer');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="text-xs font-bold text-white/70 hover:text-white inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Inspect</span>
                        </button>

                        <Link
                          to={`/product/${p.id}`}
                          className="px-3 py-1.5 rounded-lg bg-cyan/15 hover:bg-cyan/25 border border-cyan/30 text-cyan hover:text-white text-xs font-bold inline-flex items-center gap-1.5 transition-all hover:scale-105"
                        >
                          <span>Full Page</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 rounded-xl bg-white/[0.02] border border-white/10 text-center py-12">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3 text-white/40">
                  <Search className="w-6 h-6" />
                </div>
                <span className="text-sm text-white/70 block font-semibold mb-1">
                  No products found matching your search or filters.
                </span>
                <span className="text-xs text-white/40 block mb-4">
                  Try adjusting your filter criteria or search query.
                </span>
                <button
                  onClick={resetAllFilters}
                  className="px-4 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 text-xs font-bold transition-all cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

          {/* ============================================================ */}
          {/* WHY MATHULAC — BRAND TRUST & QUALITY SECTION */}
          {/* ============================================================ */}
          {showTrustSection && (
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
                              className={`text-[11px] font-black rounded-lg px-2 py-0.5 transition-all duration-300 ${isActive
                                ? 'bg-magenta text-white shadow-lg shadow-magenta/40'
                                : 'bg-white/10 text-white/60 group-hover:bg-white/15 group-hover:text-white'
                                }`}
                            >
                              {item.year}
                            </span>
                            {i < timeline.length - 1 && (
                              <div className={`w-px flex-1 min-h-[16px] transition-colors duration-300 ${isActive ? 'bg-magenta/60' : 'bg-white/10'
                                }`} />
                            )}
                          </div>
                          {/* Content */}
                          <div className="flex-1 pb-1">
                            <h5 className={`text-sm font-bold leading-snug transition-colors duration-200 ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white/90'
                              }`}>
                              {item.title}
                            </h5>
                            <p className={`text-xs leading-relaxed mt-1 transition-all duration-300 ${isActive ? 'text-white/70 max-h-20' : 'text-white/40 max-h-0 overflow-hidden group-hover:max-h-20 group-hover:text-white/55'
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
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductShowcase;

