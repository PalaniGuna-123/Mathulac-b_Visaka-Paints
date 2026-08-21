import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  FlaskConical,
  Box,
  Layers,
  Phone,
  Droplets,
  Clock,
  Award,
  CheckCircle2,
  Share2,
  FileDown,
  Paintbrush,
  Grid,
  Copy,
  Check,
  Eye,
  Palette,
} from 'lucide-react';
import { useParams, Link, useNavigate } from '../routes/Router';
import {
  mathulacProductItems,
  mathulacCategories,
  type CatalogCategory,
} from '../data/products';
import { productAssetMap } from '../data/productAssets';
import { paintShades, type PaintShade } from '../data/shades';
import type { MathulacProductItem } from '../types';
import { ContactSection } from '../features/contact';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [copiedHex, setCopiedHex] = useState(false);
  const [selectedShade, setSelectedShade] = useState<PaintShade | null>(null);

  // Clean and match ID or name or slug
  const cleanId = decodeURIComponent(id || '').trim().toLowerCase();

  const matchedProduct = mathulacProductItems.find((p) => {
    const pId = p.id.toLowerCase();
    const pName = p.name.toLowerCase();
    const pSlug = p.id.replace(/-/g, ' ');
    const cleanNoDash = cleanId.replace(/-/g, ' ');
    return (
      pId === cleanId ||
      pName === cleanId ||
      pSlug === cleanNoDash ||
      pName.replace(/[^a-z0-9]/g, '') === cleanId.replace(/[^a-z0-9]/g, '')
    );
  });

  const product: MathulacProductItem = matchedProduct || mathulacProductItems[0];

  // Matching category
  const category: CatalogCategory =
    mathulacCategories.find((c) => c.id === product.categoryKey) || mathulacCategories[0];

  // Products in current category
  const categoryProducts = mathulacProductItems.filter(
    (p) => p.categoryKey === category.id
  );

  // Selected pack size state
  const [selectedSize, setSelectedSize] = useState<string>(
    product.availableSizes[0] || '1 Ltr'
  );

  // Reset selected size, selected shade and scroll to top when product changes
  useEffect(() => {
    if (product.availableSizes && product.availableSizes.length > 0) {
      setSelectedSize(product.availableSizes[0]);
    }
    setSelectedShade(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [product.id, id]);

  const activeColor = selectedShade?.hex || product.color || category.accent || '#00C8FF';
  const activeImageUrl = productAssetMap[product.id] || product.image;

  // Curate matching shades for this product based on division / category
  const matchingShades = useMemo(() => {
    const cat = (product.categoryKey || '').toLowerCase();
    if (cat.includes('auto')) {
      return paintShades.filter((s) => ['REDS', 'BLUES', 'GREYS', 'WHITES'].includes(s.family)).slice(0, 12);
    }
    if (cat.includes('wood')) {
      return paintShades.filter((s) => ['BROWNS', 'BEIGES', 'CREAMS', 'ORANGES'].includes(s.family)).slice(0, 12);
    }
    // Decorative & primers
    return paintShades.filter((s) => ['WHITES', 'OFF WHITES', 'BEIGES', 'CREAMS', 'PINKS', 'GREENS', 'BLUES'].includes(s.family)).slice(0, 14);
  }, [product.categoryKey]);

  const copyHex = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(true);
    setTimeout(() => setCopiedHex(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} - Visaka Mathulac Paints`,
        text: product.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadSpec = () => {
    const content = `VISAKA PAINTS & CHEMICALS - MATHULAC TECHNICAL SPECIFICATION
Product: ${product.name}
Division: ${category.name} (Division ${String(category.orderNumber).padStart(2, '0')})
Description: ${product.description}
Available Sizes: ${product.availableSizes.join(', ')}
${product.features ? `Key Features:\n${product.features.map((f) => `- ${f}`).join('\n')}` : ''}

Inquiries: visakapaints@gmail.com | mathulac.com`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Mathulac_${product.id}_Technical_Data_Sheet.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSelectCategory = (cat: CatalogCategory) => {
    const firstProduct = mathulacProductItems.find((p) => p.categoryKey === cat.id);
    if (firstProduct) {
      navigate(`/product/${firstProduct.id}`);
    } else {
      navigate(`/products?category=${cat.id}`);
    }
  };

  const CategoryIcon = category.icon;

  return (
    <div className="w-full pt-20 pb-16 bg-[#070913] text-white min-h-screen">
      {/* Background Ambient Lighting */}
      <div
        className="fixed top-20 left-1/4 w-[600px] h-[600px] rounded-full filter blur-[160px] pointer-events-none opacity-20 -z-10"
        style={{ backgroundColor: activeColor }}
      />
      <div className="fixed bottom-10 right-1/4 w-[500px] h-[500px] bg-magenta/15 rounded-full filter blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Top Breadcrumbs & Back Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-white transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-cyan font-medium">{category.name}</span>
            <span>/</span>
            <span className="text-white font-semibold truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/80 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10 cursor-pointer"
              title="Share Product"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied Link!' : 'Share'}</span>
            </button>

            <Link
              to="/products"
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/15"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Catalog</span>
            </Link>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 1. TOP 12-CATEGORIES GRID SELECTOR */}
        {/* ============================================================ */}
        <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] via-white/[0.02] to-transparent border border-white/10 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Grid className="w-4 h-4 text-magenta" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-white/80">
                Mathulac 12 Surface Coating Divisions
              </span>
            </div>
            <span className="text-xs text-white/50">
              Select any category to view its formulations &amp; technical specs
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {mathulacCategories.map((cat) => {
              const isSelected = cat.id === category.id;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat)}
                  className={`p-3 rounded-xl border transition-all text-left flex flex-col justify-between cursor-pointer group ${
                    isSelected
                      ? 'bg-gradient-to-b from-magenta/25 via-white/[0.08] to-violet/20 border-magenta ring-1 ring-magenta/40 shadow-lg shadow-magenta/20 scale-[1.02]'
                      : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/10 hover:border-white/25'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-mono font-bold ${
                        isSelected ? 'text-magenta' : 'text-white/40'
                      }`}
                    >
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
                    <h5
                      className={`text-xs font-bold leading-tight line-clamp-2 ${
                        isSelected ? 'text-white font-extrabold' : 'text-white/80 group-hover:text-white'
                      }`}
                    >
                      {cat.name}
                    </h5>
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
        {/* 2. SUB-PRODUCT SWITCHER PILLS (If Category has multiple items) */}
        {/* ============================================================ */}
        {categoryProducts.length > 1 && (
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/10">
            <span className="text-xs font-bold text-white/50 uppercase tracking-wider mr-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan" /> {category.name} Products:
            </span>
            {categoryProducts.map((p) => {
              const isCurrent = p.id === product.id;
              return (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                    isCurrent
                      ? 'bg-gradient-to-r from-magenta via-purple-600 to-cyan text-white border-transparent shadow-lg shadow-magenta/30 scale-105'
                      : 'bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border-white/10'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: p.color || '#00C8FF' }}
                  />
                  <span>{p.name}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* ============================================================ */}
        {/* 3. MAIN PRODUCT SHOWCASE HERO (Image + Technical Details) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* LEFT COLUMN: Majestic Product Visual Stage (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Visual Stage Card */}
            <div className="w-full relative rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-[#141828] via-[#0D101E] to-[#070913] border border-white/15 shadow-2xl overflow-hidden flex flex-col items-center justify-center min-h-[420px] sm:min-h-[480px]">
              {/* Radial Backdrop Glow */}
              <div
                className="absolute inset-0 m-auto w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] rounded-full pointer-events-none filter blur-[85px] opacity-70 transition-all duration-700"
                style={{
                  background: `radial-gradient(circle, ${activeColor}99 0%, ${activeColor}30 45%, rgba(139, 92, 246, 0.2) 70%, transparent 80%)`,
                }}
              />

              {/* Division Badge */}
              <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-2 z-20">
                <CategoryIcon className="w-3.5 h-3.5" style={{ color: activeColor }} />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white">
                  Division {String(category.orderNumber).padStart(2, '0')}
                </span>
              </div>

              {/* Active Pack Size Indicator */}
              <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-magenta/20 border border-magenta/40 text-magenta font-mono text-[10px] font-bold uppercase tracking-wider z-20">
                Pack: {selectedSize}
              </div>

              {/* Product Container Image with High-Def Sizing & Smooth Hover */}
              <div className="relative z-10 w-full flex items-center justify-center py-4 select-none group">
                <img
                  src={activeImageUrl}
                  alt={product.name}
                  className="max-h-[300px] sm:max-h-[360px] md:max-h-[400px] w-auto h-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] filter brightness-105"
                />

                {/* Base Reflection Glow */}
                <div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-52 h-7 rounded-full blur-xl pointer-events-none transition-all duration-500 opacity-50"
                  style={{ backgroundColor: activeColor }}
                />
              </div>

              {/* Watermark brand text */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center pointer-events-none opacity-40">
                <span className="text-[9px] uppercase tracking-[0.3em] font-extrabold text-white font-mono">
                  VISAKA PAINTS • ISO QUALITY ASSURED
                </span>
              </div>
            </div>

            {/* Pack Size Selector Strip */}
            <div className="w-full mt-5 p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Box className="w-4 h-4 text-cyan flex-shrink-0" />
                <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
                  Available Pack Sizes:
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.availableSizes.map((size) => {
                  const isSelected = size === selectedSize;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-cyan text-black border-cyan shadow-lg shadow-cyan/30 scale-105'
                          : 'bg-white/5 hover:bg-white/15 text-white/80 border-white/10'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Full Product Specifications & Actions (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Division Header Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/15 text-cyan text-[11px] font-extrabold uppercase tracking-widest border border-cyan/30 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{category.name}</span>
              </div>

              {/* Product Title */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-tight leading-tight mb-3">
                {product.name}
              </h1>

              {/* Tagline / Subtitle */}
              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Key Features Bullet Points */}
              {product.features && product.features.length > 0 && (
                <div className="mb-6 p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-magenta mb-3">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Key Performance Characteristics</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {product.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-white/80 leading-snug">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Specifications Table */}
              <div className="rounded-2xl p-6 bg-[#0B0F19] border border-white/15 shadow-xl mb-8">
                <div className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-cyan mb-4 flex items-center justify-between">
                  <span>TECHNICAL SPECIFICATIONS SHEET</span>
                  <span className="text-white/40">REF: VP-{String(category.orderNumber).padStart(2, '0')}</span>
                </div>

                <div className="space-y-0 divide-y divide-white/10 text-xs sm:text-[13px]">
                  {/* Category */}
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-white/50 font-medium">Product Category</span>
                    <span className="text-white font-bold">{category.name}</span>
                  </div>

                  {/* Formulation Base */}
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-white/50 font-medium">Formulation Standard</span>
                    <span className="text-white font-bold">IS 101 / IS 133 Compliant</span>
                  </div>

                  {/* Drying Mechanism */}
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-white/50 font-medium">Drying Time</span>
                    <span className="text-cyan font-bold">Surface: 15-20 min • Hard: 2-4 hrs</span>
                  </div>

                  {/* Application Method */}
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-white/50 font-medium">Application Method</span>
                    <span className="text-white font-semibold">Spray, Brush, or Roller</span>
                  </div>

                  {/* Selected Packaging */}
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-white/50 font-medium">Available Pack Sizes</span>
                    <span className="text-white font-mono font-semibold">
                      {product.availableSizes.join(' • ')}
                    </span>
                  </div>

                  {/* Weather Stability */}
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-white/50 font-medium">Climate Testing</span>
                    <span className="text-leaf font-bold">Tropical Humidity &amp; UV Stable</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons Strip */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href="#inquiry-section"
                className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-magenta via-purple-600 to-cyan text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-magenta/25 hover:opacity-95 transition-all hover:scale-[1.02] cursor-pointer text-center"
              >
                <Phone className="w-4 h-4" />
                <span>Request Quotation / Dealer Inquiry</span>
              </a>

              <button
                onClick={handleDownloadSpec}
                className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer border border-white/20 backdrop-blur-md shadow-lg transition-all"
                title="Download TDS"
              >
                <FileDown className="w-4 h-4 text-cyan" />
                <span>Download TDS</span>
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3.5. AVAILABLE SIGNATURE COLOR SHADES & TINT FORMULATIONS */}
        {/* ============================================================ */}
        {matchingShades.length > 0 && (
          <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/15 shadow-2xl backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-magenta/20 text-magenta text-[10px] font-mono font-bold uppercase tracking-widest border border-magenta/30 mb-2">
                  <Palette className="w-3.5 h-3.5" /> Division Tint Library
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-white font-bold">
                  Recommended Color Shades for {product.name}
                </h3>
                <p className="text-white/60 text-xs sm:text-sm mt-1">
                  Click any shade to preview ambient reflection on the container or visualize on walls.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {selectedShade && (
                  <button
                    onClick={() => copyHex(selectedShade.hex)}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all border border-white/15 cursor-pointer"
                  >
                    {copiedHex ? <Check className="w-3.5 h-3.5 text-leaf" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedHex ? 'Copied HEX' : selectedShade.hex}</span>
                  </button>
                )}
                <Link
                  to="/colours"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-magenta via-pink-500 to-violet text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md hover:shadow-magenta/25 transition-all"
                >
                  <Eye className="w-3.5 h-3.5" /> All 1,000+ Shades
                </Link>
              </div>
            </div>

            {/* Color Swatches Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {matchingShades.map((s) => {
                const isCurrentShade = selectedShade?.id === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedShade(s)}
                    className={`group relative rounded-2xl p-3 text-left transition-all duration-300 cursor-pointer border flex flex-col justify-between overflow-hidden ${
                      isCurrentShade
                        ? 'bg-white/20 border-white shadow-xl shadow-magenta/20 ring-2 ring-magenta/70 scale-105'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/30 hover:-translate-y-1'
                    }`}
                  >
                    <div>
                      {/* Swatch Pill */}
                      <div
                        className="w-full aspect-[4/3] rounded-xl shadow-inner mb-2 relative overflow-hidden transition-transform group-hover:scale-105"
                        style={{ backgroundColor: s.hex }}
                      >
                        <span className="absolute bottom-1.5 left-1.5 text-[9px] font-mono font-bold bg-black/50 text-white px-1.5 py-0.5 rounded backdrop-blur-sm">
                          {s.id}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-white group-hover:text-cyan transition-colors truncate">
                        {s.name}
                      </h4>
                      <span className="text-[10px] uppercase font-mono text-white/50 block">
                        {s.family}
                      </span>
                    </div>

                    <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/60">
                      <span className="font-mono">{s.hex}</span>
                      <span className="text-magenta font-bold group-hover:translate-x-0.5 transition-transform">
                        Select →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 4. ALL PRODUCTS IN THIS CATEGORY GALLERY */}
        {/* ============================================================ */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-3 border-b border-white/10">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan">
                Division {String(category.orderNumber).padStart(2, '0')} Series
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-white font-bold mt-1">
                {category.name} Complete Lineup ({categoryProducts.length} Formulations)
              </h3>
              <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-2xl">
                {category.description}
              </p>
            </div>

            <Link
              to="/products"
              className="text-xs font-bold text-magenta hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View 12-System Main Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoryProducts.map((p) => {
              const isSelected = p.id === product.id;
              const img = productAssetMap[p.id] || p.image;
              return (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className={`paint-product-card group relative rounded-2xl p-6 transition-all flex flex-col justify-between overflow-hidden cursor-pointer border ${
                    isSelected
                      ? 'bg-gradient-to-b from-magenta/25 via-white/[0.08] to-violet/20 border-cyan shadow-2xl shadow-cyan/20 ring-1 ring-cyan/50 scale-[1.02]'
                      : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/10 hover:border-cyan/50 hover:-translate-y-1'
                  }`}
                >
                  <div>
                    {/* Image */}
                    <div className="relative w-full aspect-[16/11] rounded-xl overflow-hidden bg-gradient-to-b from-[#161a28] to-[#080a12] border border-white/10 mb-4 flex items-center justify-center p-4">
                      <div
                        className="absolute inset-0 m-auto w-32 h-32 rounded-full filter blur-2xl opacity-35 pointer-events-none"
                        style={{ backgroundColor: p.color || '#00C8FF' }}
                      />
                      <img
                        src={img}
                        alt={p.name}
                        className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] filter brightness-105"
                      />
                      {isSelected && (
                        <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-cyan text-black font-extrabold text-[10px] uppercase tracking-wider shadow z-20">
                          Active Product
                        </div>
                      )}
                    </div>

                    <h4 className="font-display text-lg font-bold text-white group-hover:text-cyan transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-white/65 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>

                    <div className="mt-3 pt-2 border-t border-white/5">
                      <span className="text-[10px] text-white/50 font-mono">
                        Sizes: {p.availableSizes.join(', ')}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-cyan">
                    <span>{isSelected ? 'Currently Viewing' : 'View Product Specs'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 5. APPLICATION BEST PRACTICES & PROCESS GUIDE */}
        {/* ============================================================ */}
        <div className="mb-16 rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-magenta" /> Application Protocol
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-white font-bold mt-1">
              Professional Application Guidelines for {product.name}
            </h3>
            <p className="text-white/60 text-xs sm:text-sm mt-1">
              Ensure maximum film build, uniform leveling, and showroom finish by following our recommended application steps.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'Surface Preparation',
                desc: 'Ensure substrate is free of moisture, grease, rust, and dust. Sand thoroughly with suitable abrasive grit.',
                color: '#00C8FF',
              },
              {
                step: '02',
                title: 'Proper Thinning',
                desc: 'Dilute using recommended Mathulac Special PU or V106 Thinners to the prescribed application viscosity.',
                color: '#E6007E',
              },
              {
                step: '03',
                title: 'Uniform Coating',
                desc: 'Apply 2 to 3 uniform cross-coats with 10-15 minutes flash-off time between coats at room temperature.',
                color: '#FF7A00',
              },
              {
                step: '04',
                title: 'Curing & Inspection',
                desc: 'Allow full cure before subjecting to weathering, buffing, or packaging. Store in cool, shaded conditions.',
                color: '#10B981',
              },
            ].map((st, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xl font-black" style={{ color: st.color }}>
                    {st.step}
                  </span>
                  <h4 className="text-white font-bold text-sm sm:text-base mt-2 mb-1">{st.title}</h4>
                  <p className="text-white/65 text-xs leading-relaxed">{st.desc}</p>
                </div>
                <div
                  className="w-8 h-1 rounded-full mt-4"
                  style={{ backgroundColor: st.color }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 6. INQUIRY SECTION */}
        {/* ============================================================ */}
        <div id="inquiry-section">
          <ContactSection />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
