import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Search,
  X,
  Eye,
  Download,
  Share2,
  Tv,
  Image as ImageIcon,
  Layers,
  CheckCircle2,
  ExternalLink,
  Award,
  Film,
  Maximize2,
  Check,
  Megaphone,
  Radio,
  FileSpreadsheet,
  ArrowRight,
} from 'lucide-react';
import {
  advertisementCategories,
  advertisementItems,
  type AdvertisementItem,
} from '../data/advertisements';
import { ContactSection } from '../features/contact';
import { Link } from '../routes/Router';

export function AdvertisementPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalItem, setActiveModalItem] = useState<AdvertisementItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeVideoTab, setActiveVideoTab] = useState(false);

  const filteredItems = useMemo(() => {
    return advertisementItems.filter((item) => {
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        [item.title, item.tagline, item.headline, item.description, item.categoryLabel].some((t) =>
          t.toLowerCase().includes(query)
        );
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleShare = async (item: AdvertisementItem) => {
    const text = `VISAKA MATHULAC — ${item.title} (${item.tagline})`;
    if (navigator.share) {
      try {
        await navigator.share({ title: item.title, text, url: window.location.href });
        return;
      } catch {
        // ignore
      }
    }
    await navigator.clipboard?.writeText(`${text}\n${window.location.href}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="w-full pt-20 bg-ink min-h-screen text-white">
      {/* ============================================================ */}
      {/* 1. HERO SECTION */}
      {/* ============================================================ */}
      <section className="relative py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#060814] via-[#0e071c] to-[#0A0D18] border-b border-white/10 overflow-hidden">
        {/* Background glow blooms */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-magenta/20 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-cyan/20 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-violet/15 rounded-full filter blur-[140px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-magenta/20 text-magenta text-[11px] font-extrabold uppercase tracking-widest border border-magenta/30 mb-4 shadow-lg shadow-magenta/10">
              <Megaphone className="w-3.5 h-3.5" /> Official Brand Media &amp; Advertising Campaigns
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
              Color That Inspires.{' '}
              <em className="text-transparent bg-clip-text bg-gradient-to-r from-magenta via-pink-400 to-amber-300 not-italic font-italic">
                Exceeds Expectation.
              </em>
            </h1>

            <p className="text-white/70 text-xs sm:text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
              Explore Visaka Mathulac&apos;s advertising heritage, national campaigns, television commercials, outdoor hoardings, and iconic print posters crafted since 2004.
            </p>

            {/* Campaign Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mt-8">
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-display font-bold text-white">20+</div>
                <div className="text-[10px] text-white/50 uppercase font-bold tracking-wider mt-0.5">Years of Campaigns</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-display font-bold text-magenta">2,000+</div>
                <div className="text-[10px] text-white/50 uppercase font-bold tracking-wider mt-0.5">Color Formulations</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-display font-bold text-cyan">4 Divisions</div>
                <div className="text-[10px] text-white/50 uppercase font-bold tracking-wider mt-0.5">Auto, Wood, Decor, Care</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-display font-bold text-emerald-400">100%</div>
                <div className="text-[10px] text-white/50 uppercase font-bold tracking-wider mt-0.5">Eco &amp; ISO Certified</div>
              </div>
            </div>

            {/* Search and Filter Toolbar */}
            <div className="mt-10 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Search campaigns, posters, billboards, commercials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {advertisementCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? advertisementItems.length
                  : advertisementItems.filter((i) => i.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                    isActive
                      ? 'bg-gradient-to-r from-magenta to-violet text-white border-magenta shadow-lg shadow-magenta/25 scale-105'
                      : 'bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/10 border-white/10'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-white/50'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ============================================================ */}
          {/* 2. ADVERTISEMENT CAMPAIGNS GRID */}
          {/* ============================================================ */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10 max-w-xl mx-auto">
              <p className="text-white/60 text-sm">No advertising campaigns found matching your query.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-5 py-2 rounded-xl bg-magenta text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredItems.map((item) => {
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveModalItem(item)}
                    className="group relative bg-gradient-to-b from-[#151025]/90 to-[#0A0D18]/90 rounded-2xl border border-white/10 hover:border-magenta/50 overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-magenta/15 flex flex-col justify-between cursor-pointer"
                  >
                    {/* Top Image Preview Banner */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D18] via-transparent to-black/40" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md border text-white shadow-md"
                          style={{
                            backgroundColor: `${item.accentColor}33`,
                            borderColor: `${item.accentColor}88`,
                          }}
                        >
                          {item.categoryLabel}
                        </span>

                        <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white/80 font-mono text-[10px] border border-white/10">
                          {item.year}
                        </span>
                      </div>

                      {/* Quick Inspect Button on Hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                        <span className="px-4 py-2 rounded-xl bg-white/90 text-black font-bold text-xs flex items-center gap-1.5 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          <Maximize2 className="w-3.5 h-3.5" /> View Campaign
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: item.accentColor }}>
                          {item.tagline}
                        </div>
                        <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-magenta transition-colors line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-white/60 text-xs mt-2 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Highlights Chip Strip */}
                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                        <span className="truncate max-w-[180px] font-medium text-[11px]">
                          {item.dimensions || item.headline}
                        </span>
                        <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/70 group-hover:bg-magenta group-hover:text-white transition-colors">
                          <Eye className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. CLASSIC HERITAGE CAMPAIGN SPOTLIGHT ("EXCEEDS EXPECTATION") */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-[#050711] border-b border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan/20 text-cyan text-[11px] font-extrabold uppercase tracking-widest border border-cyan/30 mb-3">
              <Award className="w-3.5 h-3.5" /> Signature Brand Heritage
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight">
              The Mathulac <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-pink-400 to-magenta">Heritage Showcase</span>
            </h2>
            <p className="text-white/70 text-xs sm:text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
              Honoring the original advertising series that built brand trust across workshops, architectural studios, and homes since 2004.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Poster 1: Green Heritage */}
            <div className="rounded-2xl p-6 bg-gradient-to-b from-emerald-950/40 via-[#0A1610]/60 to-[#0A0D18] border border-emerald-500/30 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full filter blur-2xl pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 block mb-1">
                  Heritage Poster 01
                </span>
                <h3 className="font-display text-2xl font-bold text-white mb-2">Exceeds Expectation</h3>
                <p className="text-white/70 text-xs leading-relaxed">
                  The green background signature poster featuring the Mathulac mascot painter, circular spectrum hues, and certified ISO 9001 quality seal.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-500/20">
                <span className="text-[11px] font-mono text-emerald-300 font-bold block">100% Eco-Safe Series</span>
              </div>
            </div>

            {/* Poster 2: Red Splash */}
            <div className="rounded-2xl p-6 bg-gradient-to-b from-pink-950/40 via-[#180A14]/60 to-[#0A0D18] border border-magenta/30 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-magenta/10 rounded-full filter blur-2xl pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-magenta/20 text-magenta flex items-center justify-center mb-4 border border-magenta/30">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-magenta block mb-1">
                  Heritage Poster 02
                </span>
                <h3 className="font-display text-2xl font-bold text-white mb-2">Liquid Red Dynamic Wave</h3>
                <p className="text-white/70 text-xs leading-relaxed">
                  High-gloss vibrant crimson fluid motion expressing the supreme opacity, seamless levelling, and depth of Mathulac enamel formulations.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-magenta/20">
                <span className="text-[11px] font-mono text-pink-300 font-bold block">High-Gloss Enamels</span>
              </div>
            </div>

            {/* Poster 3: Luxury Wood */}
            <div className="rounded-2xl p-6 bg-gradient-to-b from-amber-950/40 via-[#161008]/60 to-[#0A0D18] border border-amber-500/30 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full filter blur-2xl pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/30">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 block mb-1">
                  Heritage Poster 03
                </span>
                <h3 className="font-display text-2xl font-bold text-white mb-2">Warm Living &amp; Wood Care</h3>
                <p className="text-white/70 text-xs leading-relaxed">
                  Interior lifestyle aesthetic highlighting translucent wood stains, melamine clear finishes, and calming candlelit ambient architectural spaces.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-amber-500/20">
                <span className="text-[11px] font-mono text-amber-300 font-bold block">Melamine &amp; PU Polish</span>
              </div>
            </div>

            {/* Poster 4: Family Emulsions */}
            <div className="rounded-2xl p-6 bg-gradient-to-b from-blue-950/40 via-[#08121C]/60 to-[#0A0D18] border border-blue-500/30 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full filter blur-2xl pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 border border-blue-500/30">
                  <Film className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400 block mb-1">
                  Heritage Poster 04
                </span>
                <h3 className="font-display text-2xl font-bold text-white mb-2">Washable Family Emulsion</h3>
                <p className="text-white/70 text-xs leading-relaxed">
                  The cheerful family campaign with children and painter mascot demonstrating smudge-resistant, ultra-washable wall finishes.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-blue-500/20">
                <span className="text-[11px] font-mono text-blue-300 font-bold block">Optima &amp; Trendy Walls</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. MARKETING COLLATERAL & PRESS KIT DOWNLOADS */}
      {/* ============================================================ */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-gradient-to-b from-[#060814] via-[#0E0B1A] to-[#0A0D18] border-b border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-magenta/20 via-purple-900/30 to-cyan/20 border border-white/15 backdrop-blur-2xl shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="px-3.5 py-1 rounded-full bg-white/10 text-white text-[10px] font-extrabold uppercase tracking-widest border border-white/20 inline-block mb-3">
                Authorized Dealer &amp; Partner Kit
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Download Official Mathulac Media Kit
              </h2>
              <p className="text-white/70 text-xs sm:text-sm mt-3 leading-relaxed">
                Access vector brand logos, high-resolution print advertising layouts, point-of-sale shop banners, product spec sheets, and dealer merchandising guides.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5 w-full lg:w-auto">
              <Link
                to="/contact"
                className="px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-magenta to-violet text-white shadow-xl hover:opacity-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" /> Request High-Res Press Kit
              </Link>
              <Link
                to="/colours"
                className="px-6 py-4 rounded-xl font-bold bg-white/10 hover:bg-white/20 text-white transition-colors text-center flex items-center justify-center gap-2"
              >
                <span>Explore 1,000+ Shades</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. LIGHTBOX MODAL FOR CAMPAIGN DETAILS */}
      {/* ============================================================ */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-ink/85 backdrop-blur-md"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-midnight border border-white/20 rounded-2xl overflow-hidden shadow-2xl animate-menu-drop text-white max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative aspect-[16/9] w-full bg-black/60 overflow-hidden flex-shrink-0">
              <img
                src={activeModalItem.image}
                alt={activeModalItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-black/40" />

              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                <div>
                  <span
                    className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border mb-1.5 inline-block text-white"
                    style={{
                      backgroundColor: `${activeModalItem.accentColor}44`,
                      borderColor: `${activeModalItem.accentColor}99`,
                    }}
                  >
                    {activeModalItem.categoryLabel} • {activeModalItem.year}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl text-white font-bold">
                    {activeModalItem.title}
                  </h2>
                </div>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-magenta">
                  {activeModalItem.tagline}
                </div>
                <h4 className="font-display text-xl text-white mt-1">{activeModalItem.headline}</h4>
                <p className="text-white/70 text-sm mt-2 leading-relaxed">
                  {activeModalItem.description}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-white/50 block mb-2.5">
                  Campaign Key Attributes
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalItem.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-xs text-white/85"
                    >
                      <CheckCircle2 className="w-4 h-4 text-magenta flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specs & Dimensions */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Format</span>
                  <div className="text-white font-semibold text-xs mt-1 uppercase">{activeModalItem.mediaType}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Release</span>
                  <div className="text-white font-semibold text-xs mt-1">{activeModalItem.year} Campaign</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Dimensions</span>
                  <div className="text-white font-semibold text-xs mt-1 truncate">{activeModalItem.dimensions}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleShare(activeModalItem)}
                  className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  {copiedLink ? 'Link Copied!' : 'Share Campaign'}
                </button>
                <Link
                  to="/contact"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-magenta to-violet text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-90 transition-opacity text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" /> Request High-Res Copy
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Direct Contact Form Section */}
      <ContactSection />
    </div>
  );
}

export default AdvertisementPage;
