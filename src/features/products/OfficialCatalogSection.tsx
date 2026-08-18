import React, { useState, useMemo } from 'react';
import {
  Car,
  TreePine,
  Paintbrush,
  Sparkles,
  Search,
  Check,
  Copy,
  Info,
  ExternalLink,
  AlertTriangle,
  FileSpreadsheet,
  Layers,
  ArrowRight,
  Phone,
  ShieldCheck,
  HelpCircle,
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
import { Link } from '../../routes/Router';

export interface OfficialCatalogSectionProps {
  activeDivision?: 'auto' | 'wood' | 'decorative';
  onDivisionChange?: (division: 'auto' | 'wood' | 'decorative') => void;
}

export function OfficialCatalogSection({
  activeDivision: controlledDivision,
  onDivisionChange,
}: OfficialCatalogSectionProps) {
  const [internalDivision, setInternalDivision] = useState<'auto' | 'wood' | 'decorative'>('auto');
  const activeDivision = controlledDivision || internalDivision;

  const handleSelectDivision = (div: 'auto' | 'wood' | 'decorative') => {
    if (onDivisionChange) {
      onDivisionChange(div);
    } else {
      setInternalDivision(div);
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Configuration for each Division
  const divisionConfigs = {
    auto: {
      id: 'auto' as const,
      title: 'Auto Finishes',
      tagline: 'Bodyshop Primers, Body Fillers, Solid & Metallic Enamels & 2K Clears',
      description:
        'Anti-corrosive zinc chrome primers, rapid-sand NC body putties, OEM synthetic enamels, and showroom mirror clear coats.',
      icon: Car,
      accent: '#EF4444',
      badgeBg: 'bg-red-500/20 text-red-300 border-red-500/30',
      gradient: 'from-red-600 via-pink-600 to-amber-500',
      pageUrl: '/auto',
      subcategories: [
        { id: 'all', label: 'All Auto Formulations' },
        { id: 'auto-primers', label: 'Auto Primers', count: autoPrimersProducts.length },
        { id: 'undercoat-surfaces', label: 'Under Coat Surfaces', count: autoUnderCoatSurfaces.length },
        { id: 'putty-fillers', label: 'Body Putty & Fillers', count: puttyAutoBodyFillers.length },
        { id: 'solid-colors', label: 'Top Coat Solid Colors', count: autoTopCoatSolidColors.length },
        { id: 'enamel-shades', label: '24 Enamel Color Shades', count: syntheticEnamelColorShades.length },
        { id: 'metallic-finishes', label: 'Metallic Finishes', count: autoTopCoatMetallicFinishes.length },
        { id: 'topcoat-clears', label: 'Top Coat Clears', count: autoTopCoatClears.length },
      ],
    },
    wood: {
      id: 'wood' as const,
      title: 'Wood Finishes',
      tagline: 'Melamine Base, Wood Polish, Sanding Sealers & Table Top Clears',
      description:
        'Fast-drying NC sanding sealers, Table Top mirror clears, wood polishes, and melamine systems engineered to nourish natural timber grain.',
      icon: TreePine,
      accent: '#F59E0B',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      gradient: 'from-amber-500 via-yellow-500 to-orange-500',
      pageUrl: '/wood',
      subcategories: [
        { id: 'all', label: 'All Wood Formulations' },
        { id: 'melamine-base', label: 'Melamine Base', count: 1 },
        { id: 'wood-polish', label: 'Wood Polish', count: 1 },
        { id: 'sealers', label: 'Sealers', count: 2 },
        { id: 'clears', label: 'Clears', count: 1 },
      ],
    },
    decorative: {
      id: 'decorative' as const,
      title: 'Decorative Paints',
      tagline: 'Interior & Exterior Primers, Putty, Distemper & Weather-Proof Emulsions',
      description:
        'Optima weather-proof exterior emulsions, Trendy washable interior matt, acrylic wall putty, and architectural wall systems.',
      icon: Paintbrush,
      accent: '#EC4899',
      badgeBg: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      gradient: 'from-pink-500 via-purple-500 to-cyan',
      pageUrl: '/decor',
      subcategories: [
        { id: 'all', label: 'All Decorative Formulations' },
        { id: 'interior-primers', label: 'Interior Primers', count: 1 },
        { id: 'exterior-primers', label: 'Exterior Primers', count: 1 },
        { id: 'acrylic-putty', label: 'Acrylic Wall Putty', count: 1 },
        { id: 'acrylic-distemper', label: 'Acrylic Distemper', count: 1 },
        { id: 'interior-emulsion', label: 'Trendy Interior Emulsion', count: 1 },
        { id: 'exterior-emulsion', label: 'APT Exterior Emulsion', count: 1 },
        { id: 'weather-proof', label: 'Optima Weather Proof', count: 1 },
        { id: 'problem-solver', label: 'Problem Solver Guide', count: problemSolverList.length },
      ],
    },
  };

  const currentConfig = divisionConfigs[activeDivision];

  // Copy hex code helper
  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch {
      // fallback
    }
  };

  // Filtered products for current division
  const currentProducts = useMemo(() => {
    let list: OfficialProductSpec[] = [];

    if (activeDivision === 'auto') {
      if (activeSubcategory === 'all') {
        list = [
          ...autoPrimersProducts,
          ...autoUnderCoatSurfaces,
          ...puttyAutoBodyFillers,
          ...autoTopCoatSolidColors,
          ...autoTopCoatMetallicFinishes,
          ...autoTopCoatClears,
        ];
      } else if (activeSubcategory === 'auto-primers') {
        list = autoPrimersProducts;
      } else if (activeSubcategory === 'undercoat-surfaces') {
        list = autoUnderCoatSurfaces;
      } else if (activeSubcategory === 'putty-fillers') {
        list = puttyAutoBodyFillers;
      } else if (activeSubcategory === 'solid-colors') {
        list = autoTopCoatSolidColors;
      } else if (activeSubcategory === 'metallic-finishes') {
        list = autoTopCoatMetallicFinishes;
      } else if (activeSubcategory === 'topcoat-clears') {
        list = autoTopCoatClears;
      }
    } else if (activeDivision === 'wood') {
      if (activeSubcategory === 'all') {
        list = woodFinishesProducts;
      } else if (activeSubcategory === 'melamine-base') {
        list = woodFinishesProducts.filter((p) => p.subcategory === 'Melamine Base');
      } else if (activeSubcategory === 'wood-polish') {
        list = woodFinishesProducts.filter((p) => p.subcategory === 'Wood Polish');
      } else if (activeSubcategory === 'sealers') {
        list = woodFinishesProducts.filter((p) => p.subcategory === 'Sealers');
      } else if (activeSubcategory === 'clears') {
        list = woodFinishesProducts.filter((p) => p.subcategory === 'Clears');
      }
    } else if (activeDivision === 'decorative') {
      if (activeSubcategory === 'all') {
        list = decorativePaintsProducts;
      } else if (activeSubcategory === 'interior-primers') {
        list = decorativePaintsProducts.filter((p) => p.id === 'interior-primers');
      } else if (activeSubcategory === 'exterior-primers') {
        list = decorativePaintsProducts.filter((p) => p.id === 'exterior-primers');
      } else if (activeSubcategory === 'acrylic-putty') {
        list = decorativePaintsProducts.filter((p) => p.id === 'acrylic-putty');
      } else if (activeSubcategory === 'acrylic-distemper') {
        list = decorativePaintsProducts.filter((p) => p.id === 'acrylic-distemper');
      } else if (activeSubcategory === 'interior-emulsion') {
        list = decorativePaintsProducts.filter((p) => p.id === 'trendy-interior-emulsion');
      } else if (activeSubcategory === 'exterior-emulsion') {
        list = decorativePaintsProducts.filter((p) => p.id === 'apt-exterior-emulsion');
      } else if (activeSubcategory === 'weather-proof') {
        list = decorativePaintsProducts.filter((p) => p.id === 'optima-weather-proof-exterior-emulsion');
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.productName.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.usageFeatures.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeDivision, activeSubcategory, searchQuery]);

  return (
    <section
      id="official-catalog"
      className="relative py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#060814] via-[#0E111F] to-[#0B0D17] text-white border-t border-b border-white/10 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] rounded-full filter blur-[150px] pointer-events-none opacity-20 transition-all duration-700"
        style={{ backgroundColor: currentConfig.accent }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-cyan text-[11px] font-extrabold uppercase tracking-widest border border-white/15 mb-3 shadow-lg">
            <FileSpreadsheet className="w-3.5 h-3.5" /> Official Laboratory Technical Datasheets
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight">
            Official <span className="text-transparent bg-clip-text bg-gradient-to-r from-magenta via-pink-400 to-cyan">Product Specifications</span>
          </h2>
          <p className="text-white/70 text-xs sm:text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            Direct laboratory-tested application datasheets, mixing ratios, sanding grits, and drying times for the 3 core divisions.
          </p>
        </div>

        {/* 3-Division Main Navigation Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-4xl mx-auto mb-10">
          {(['auto', 'wood', 'decorative'] as const).map((divKey) => {
            const conf = divisionConfigs[divKey];
            const isSelected = activeDivision === divKey;
            const Icon = conf.icon;
            return (
              <button
                key={divKey}
                onClick={() => {
                  handleSelectDivision(divKey);
                  setActiveSubcategory('all');
                }}
                className={`p-4 rounded-2xl border transition-all duration-300 flex items-center gap-3.5 text-left cursor-pointer shadow-lg ${
                  isSelected
                    ? 'scale-[1.03] ring-1'
                    : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/10 hover:border-white/20'
                }`}
                style={
                  isSelected
                    ? {
                        backgroundColor: `${conf.accent}18`,
                        borderColor: conf.accent,
                        boxShadow: `0 10px 25px -5px ${conf.accent}30`,
                      }
                    : undefined
                }
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform"
                  style={{
                    backgroundColor: `${conf.accent}25`,
                    borderColor: `${conf.accent}50`,
                    color: conf.accent,
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span
                    className="text-[10px] font-extrabold uppercase tracking-wider block"
                    style={{ color: isSelected ? conf.accent : 'rgba(255,255,255,0.6)' }}
                  >
                    Division {divKey === 'auto' ? '01' : divKey === 'wood' ? '02' : '03'}
                  </span>
                  <h3 className="font-bold text-white text-base truncate">{conf.title}</h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* DYNAMIC DIVISION SHOWCASE BANNER */}
        {/* ============================================================ */}
        {(() => {
          const bannerData = {
            auto: {
              badge: 'Division 01 • Automotive Refinishing',
              title: 'Built to Shine & Endure',
              subtitle:
                'Anti-corrosive zinc chrome primers, rapid-sand NC body putties, OEM synthetic enamels, and showroom mirror clear coats engineered for high-solid coverage and mirror gloss.',
              features: [
                { name: 'Ultra Mirror', desc: 'Showroom Topcoats' },
                { name: 'Zinc Chrome', desc: 'Anti-Corrosion Primers' },
                { name: 'Rapid Tack', desc: '20-Min Sanding Putty' },
              ],
              accent: '#EF4444',
              gradient: 'linear-gradient(135deg, #26090f 0%, #15060d 50%, #0a0d18 100%)',
              badgeBorder: 'border-red-500/30 bg-red-500/15 text-red-300',
              cardBorder: 'border-red-700/30 bg-red-950/40 text-red-200',
              cardDesc: 'text-red-200/60',
              images: [
                'https://images.pexels.com/photos/34042808/pexels-photo-34042808.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/13861/IMG_2582_1.jpg?auto=compress&cs=tinysrgb&w=800',
              ],
            },
            wood: {
              badge: 'Division 02 • Timber Preservation & Polish',
              title: 'Bring Wood to Life',
              subtitle:
                'Polyurethane and melamine systems engineered to nourish timber, protect from termite damage and moisture, and enhance natural grain patterns across furniture, doors, and architectural woodwork.',
              features: [
                { name: 'Matt', desc: 'Organic Velvet' },
                { name: 'Gloss', desc: 'Mirror Lustre' },
                { name: 'Satin', desc: 'Silky Sheen' },
              ],
              accent: '#F59E0B',
              gradient: 'linear-gradient(135deg, #2a1a0a 0%, #1b1107 50%, #0a0d18 100%)',
              badgeBorder: 'border-amber-500/30 bg-amber-500/15 text-amber-300',
              cardBorder: 'border-amber-700/30 bg-amber-950/40 text-amber-200',
              cardDesc: 'text-amber-200/60',
              images: [
                'https://images.pexels.com/photos/4705928/pexels-photo-4705928.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/911820/pexels-photo-911820.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/10900708/pexels-photo-10900708.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/37550783/pexels-photo-37550783.jpeg?auto=compress&cs=tinysrgb&w=800',
              ],
            },
            decorative: {
              badge: 'Division 03 • Architectural Wall Systems',
              title: 'Walls Are Your Canvas',
              subtitle:
                'Optima weather-proof exterior emulsions, Trendy washable interior matt, acrylic wall putty, and architectural wall systems engineered for Indian climate resilience.',
              features: [
                { name: 'Weather-Proof', desc: 'Optima Exterior Shield' },
                { name: 'Washable Matt', desc: 'Trendy Interior Pure' },
                { name: 'Acrylic Putty', desc: 'Micro-Pore Base Coat' },
              ],
              accent: '#EC4899',
              gradient: 'linear-gradient(135deg, #2a0a2e 0%, #17061e 50%, #0a0d18 100%)',
              badgeBorder: 'border-pink-500/30 bg-pink-500/15 text-pink-300',
              cardBorder: 'border-pink-700/30 bg-pink-950/40 text-pink-200',
              cardDesc: 'text-pink-200/60',
              images: [
                'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/6489783/pexels-photo-6489783.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800',
              ],
            },
          };

          const activeBanner = bannerData[activeDivision];
          const ActiveIcon = currentConfig.icon;

          return (
            <div
              key={activeDivision}
              className="relative rounded-3xl p-6 sm:p-8 lg:p-10 mb-8 border border-white/15 overflow-hidden shadow-2xl transition-all duration-500 animate-tab-fade"
              style={{ background: activeBanner.gradient }}
            >
              {/* Decorative background glow */}
              <div
                className="absolute top-0 right-0 w-96 h-96 rounded-full filter blur-[120px] pointer-events-none opacity-30"
                style={{ backgroundColor: activeBanner.accent }}
              />

              <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Left Content Column */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div
                      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border mb-3.5 ${activeBanner.badgeBorder}`}
                    >
                      <ActiveIcon className="w-3.5 h-3.5" />
                      <span>{activeBanner.badge}</span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                      {activeBanner.title}
                    </h3>

                    <p className="text-white/75 text-xs sm:text-sm mt-3 leading-relaxed max-w-xl">
                      {activeBanner.subtitle}
                    </p>

                    {/* 3 Pillar feature cards */}
                    <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 mt-6">
                      {activeBanner.features.map((f) => (
                        <div
                          key={f.name}
                          className={`p-3 sm:p-4 rounded-xl border backdrop-blur-sm transition-all hover:scale-[1.03] ${activeBanner.cardBorder}`}
                        >
                          <div className="font-bold text-xs sm:text-base text-white">{f.name}</div>
                          <div className={`text-[10px] sm:text-xs mt-0.5 ${activeBanner.cardDesc}`}>{f.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Visual Image Showcase Column */}
                <div className="lg:col-span-5 grid grid-cols-3 gap-2.5 sm:gap-3">
                  {activeBanner.images.slice(0, 3).map((src, idx) => (
                    <div
                      key={idx}
                      className="aspect-[3/4] rounded-2xl overflow-hidden group shadow-2xl border border-white/15 relative"
                    >
                      <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${src})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ============================================================ */}
        {/* SUB-CATEGORY SYSTEM & FILTER CONTROL CENTER */}
        {/* ============================================================ */}
        <div className="mb-10 space-y-4">
          {/* Top Bar: Title / Count indicator & Search Input */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ backgroundColor: currentConfig.accent }}
              />
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white">
                {currentConfig.title} Formulations
              </span>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-white/[0.08] text-white/70 border border-white/10">
                {currentConfig.subcategories.length} Categories
              </span>
            </div>

            {/* Premium Search Box */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`Search ${currentConfig.title} formulations...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-cyan transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs font-bold w-4 h-4 rounded-full bg-white/10 flex items-center justify-center transition-colors"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Subcategory Pills: Multi-line flex-wrap grid container */}
          <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl">
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {currentConfig.subcategories.map((sub) => {
                const isActive = activeSubcategory === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSubcategory(sub.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer border select-none ${
                      isActive
                        ? 'text-white shadow-lg scale-[1.03]'
                        : 'bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08] border-white/10 hover:border-white/20'
                    }`}
                    style={
                      isActive
                        ? {
                            background: `linear-gradient(135deg, ${currentConfig.accent}, ${currentConfig.accent}cc)`,
                            borderColor: currentConfig.accent,
                            boxShadow: `0 6px 18px -2px ${currentConfig.accent}50`,
                          }
                        : undefined
                    }
                  >
                    <span>{sub.label}</span>
                    {sub.count !== undefined && (
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold ${
                          isActive
                            ? 'bg-black/35 text-white border border-white/20'
                            : 'bg-white/10 text-white/60'
                        }`}
                      >
                        {sub.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TAB CONTENT: 24 ENAMEL COLOR SHADES (Auto Finishes) */}
        {/* ============================================================ */}
        {activeDivision === 'auto' && activeSubcategory === 'enamel-shades' && (
          <div className="space-y-6 animate-tab-fade">
            <div className="p-6 sm:p-8 rounded-3xl bg-midnight/90 border border-white/15 backdrop-blur-xl shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/10 mb-6">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border bg-red-500/15 border-red-500/40 text-red-300">
                    Auto Color Formulation Series
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-white font-bold mt-1.5">
                    24 Synthetic Enamel Auto &amp; Industrial Color Shades
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm mt-1">
                    Click on any swatch to copy the official VP batch code for workshop mixing.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-red-400 bg-red-500/10 px-3 py-1.5 rounded-full border border-red-500/20 self-start sm:self-auto">
                  24 Standard Swatches
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
                {syntheticEnamelColorShades.map((shade) => (
                  <div
                    key={shade.id}
                    onClick={() => handleCopyCode(shade.code)}
                    className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-red-500/50 transition-all flex flex-col justify-between group cursor-pointer shadow-md"
                  >
                    <div
                      className="w-full aspect-[16/10] rounded-xl mb-3 shadow-inner border border-white/15 group-hover:scale-105 transition-transform duration-300 relative overflow-hidden"
                      style={{ backgroundColor: shade.hex }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                        {copiedCode === shade.code ? (
                          <span className="flex items-center gap-1 bg-black/80 px-2 py-1 rounded-full text-green-400">
                            <Check className="w-3 h-3" /> Copied
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 bg-black/80 px-2 py-1 rounded-full">
                            <Copy className="w-3 h-3" /> Copy VP Code
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white truncate group-hover:text-red-300">
                        {shade.name}
                      </h5>
                      <span className="text-[10px] font-mono text-white/50 block mt-0.5">
                        {shade.code}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB CONTENT: PROBLEM SOLVER (Decorative Paints) */}
        {/* ============================================================ */}
        {activeDivision === 'decorative' && activeSubcategory === 'problem-solver' && (
          <div className="space-y-6 animate-tab-fade">
            {problemSolverList.map((item) => (
              <div
                key={item.id}
                className="p-6 md:p-8 rounded-3xl bg-midnight/90 border border-pink-500/30 backdrop-blur-xl shadow-2xl space-y-6"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="w-11 h-11 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-pink-400">
                      Problem Solver Diagnostic
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                      {item.problem}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-white/50 block">
                      Defect Description
                    </span>
                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 block">
                      Possible Root Causes
                    </span>
                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed">{item.possibleCause}</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 block">
                      Remedial Solution
                    </span>
                    <p className="text-white/90 text-xs sm:text-sm leading-relaxed">{item.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================================ */}
        {/* REGULAR PRODUCT TECHNICAL SPECIFICATION CARDS */}
        {/* ============================================================ */}
        {activeSubcategory !== 'enamel-shades' && activeSubcategory !== 'problem-solver' && (
          <div className="space-y-6 animate-tab-fade">
            {currentProducts.length > 0 ? (
              currentProducts.map((prod) => (
                <DatasheetProductCard
                  key={prod.id}
                  product={prod}
                  accentColor={currentConfig.accent}
                />
              ))
            ) : (
              <div className="p-10 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
                <Info className="w-8 h-8 text-white/40 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">No Formulations Found</h4>
                <p className="text-white/60 text-xs">
                  No products matched the search "{searchQuery}" in {currentConfig.title}.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Bottom Consultation Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white/[0.04] via-white/[0.07] to-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display text-xl sm:text-2xl font-bold text-white">
              Need Custom Technical Formulations or Workshop Batch Orders?
            </h4>
            <p className="text-white/65 text-xs sm:text-sm">
              Our QA laboratory can formulate tailor-made viscosities, dry times, and tinting for your industrial requirements.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0">
            <Link
              to="/contact"
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-magenta via-purple-600 to-cyan text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl hover:scale-105 transition-transform"
            >
              <Phone className="w-4 h-4" />
              <span>Contact Lab Chemist</span>
            </Link>

            <Link
              to={currentConfig.pageUrl}
              className="py-3 px-6 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <span>Explore All {currentConfig.title}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------
// Sub-component: Datasheet Technical Card
// --------------------------------------------------------------------------
function DatasheetProductCard({
  product,
  accentColor,
}: {
  product: OfficialProductSpec;
  accentColor: string;
}) {
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
    { label: 'Hardener / Induction Period', value: specs.hardenerInduction },
    { label: 'Buffing Requirement', value: specs.buffing },
    { label: 'Supply Viscosity', value: specs.supplyViscosity },
    { label: 'Spray Viscosity', value: specs.sprayViscosity },
    { label: 'Covering Capacity / Viscosity', value: specs.coverage || specs.coveringCapacity || specs.coveringViscosity },
    { label: 'Stability of Thinned Paint', value: specs.stabilityOfThinned },
    { label: 'Flash Point', value: specs.flashPoint },
  ].filter((r) => r.value !== undefined && r.value !== '' && r.value !== '-');

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-midnight/90 border border-white/15 backdrop-blur-xl shadow-xl hover:border-white/25 transition-all duration-300 card-3d-lift">
      {/* Product Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
        <div>
          <div className="flex flex-wrap items-center gap-2">
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
              <span className="text-[11px] text-white/70 font-semibold flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
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

          <h3 className="font-display text-2xl sm:text-3xl text-white font-bold mt-2">
            {product.productName}
          </h3>
        </div>

        <Link
          to={`/contact?product=${encodeURIComponent(product.productName)}`}
          className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5 border border-white/15 bg-white/5 hover:bg-white/15 transition-all cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Inquire Batch</span>
        </Link>
      </div>

      {/* Usage Features Description */}
      <div className="py-4">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-white/50 block mb-1.5">
          Usage Features &amp; Performance Properties
        </span>
        <p className="text-white/85 text-xs sm:text-sm leading-relaxed">{product.usageFeatures}</p>
      </div>

      {/* Technical Specifications Grid */}
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

export default OfficialCatalogSection;
