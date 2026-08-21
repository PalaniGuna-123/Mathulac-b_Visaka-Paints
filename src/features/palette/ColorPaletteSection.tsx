import { useState, useMemo } from 'react';
import {
  paintShades,
  familySwatches,
  colorFamilies,
  type PaintShade,
  type ColorFamily,
} from '../../data';
import colourFan from '../../assets/colours.webp';
import { X, Copy, Check, Sparkles, ArrowRight, Search, Eye, Filter } from 'lucide-react';
import { Link, useNavigate } from '../../routes/Router';

export function ColorPaletteSection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<PaintShade | null>(null);
  const [selectedFamily, setSelectedFamily] = useState<ColorFamily>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const filteredShades = useMemo(() => {
    return paintShades.filter((item) => {
      const matchesFamily =
        selectedFamily === 'ALL' || item.family.toUpperCase() === selectedFamily.toUpperCase();
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        [item.name, item.id, item.code, item.family, item.collection || '', item.space || ''].some((v) =>
          v.toLowerCase().includes(q)
        );
      return matchesFamily && matchesQuery;
    });
  }, [selectedFamily, searchQuery]);

  const copyHex = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVisualize = (shadeItem: PaintShade) => {
    setSelected(null);
    navigate(`/colours?shade=${encodeURIComponent(shadeItem.id)}`);
    setTimeout(() => {
      const el = document.getElementById('main-visualizer') || document.getElementById('studio');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('visaka:select-shade', { detail: shadeItem }));
    }, 120);
  };

  return (
    <section id="palette" className="relative py-16 md:py-24 px-4 md:px-8 bg-ink overflow-hidden">
      {/* Subtle Background Watermark Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-screen"
        style={{ backgroundImage: `url(${colourFan})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-10" data-reveal>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-magenta/20 text-magenta text-[11px] font-extrabold uppercase tracking-widest border border-magenta/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Mathulac Precision Palette
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight tracking-tight">
            Color Has No Limits
          </h2>
          <p className="text-white/70 text-xs sm:text-sm md:text-base mt-2.5 max-w-2xl mx-auto leading-relaxed">
            Curated precision pigments across 16 color families, engineered for pure depth in direct sunlight and interior lamp warmth.
          </p>

          {/* Search Bar */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search shades by name, code (e.g. MW-001), or room..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Color Family Selector Pills (All 16 Families) */}
        <div className="mb-8" data-reveal>
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-white/50 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-magenta" /> Filter by Family
            </span>
            <span className="text-[11px] text-white/40">{filteredShades.length} shades found</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {colorFamilies.map((fam) => {
              const swatch = familySwatches[fam];
              const isSelected = selectedFamily === fam;
              return (
                <button
                  key={fam}
                  onClick={() => setSelectedFamily(fam)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                    isSelected
                      ? 'bg-white/20 border-white text-white shadow-lg shadow-magenta/20 ring-1 ring-magenta/80 scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border-white/10'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shadow-sm"
                    style={{ background: swatch.bgGradient }}
                  />
                  <span>{fam === 'ALL' ? 'All Shades' : fam}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Responsive Shade Swatch Grid */}
        <div data-reveal>
          {filteredShades.length === 0 ? (
            <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-white/60 text-sm">No shades found matching "{searchQuery}".</p>
              <button
                onClick={() => {
                  setSelectedFamily('ALL');
                  setSearchQuery('');
                }}
                className="mt-3 px-4 py-2 rounded-xl bg-magenta text-white font-bold text-xs uppercase tracking-wider"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div>
              {/* Active Family Header Bar (like the RED banner from the old site) */}
              {selectedFamily !== 'ALL' && (
                <div 
                  className="mb-6 py-2.5 px-6 rounded-xl text-center font-bold tracking-widest uppercase text-sm sm:text-base text-white shadow-lg flex items-center justify-between border border-white/15"
                  style={{ background: familySwatches[selectedFamily].bgGradient }}
                >
                  <span className="font-extrabold">{selectedFamily} COLLECTION</span>
                  <span className="text-xs font-mono font-normal opacity-90">{filteredShades.length} Shades Available</span>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
                {filteredShades.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelected(c)}
                    className="group bg-white rounded-xl overflow-hidden shadow-lg border border-white/20 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-magenta/20 cursor-pointer flex flex-col"
                    role="button"
                    tabIndex={0}
                    aria-label={`${c.name} - ${c.id}`}
                  >
                    {/* Swatch Color Block */}
                    <div
                      className="w-full aspect-[16/10] sm:aspect-[16/9] transition-transform duration-300 group-hover:scale-105 relative"
                      style={{ backgroundColor: c.hex }}
                    >
                      <span className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-[9px] font-mono px-1.5 py-0.5 rounded backdrop-blur-sm">
                        {c.hex}
                      </span>
                    </div>

                    {/* Clean Label Strip: Name - Code (Matching the exact format from the old website) */}
                    <div className="bg-white p-2.5 text-center border-t border-gray-100 flex items-center justify-center">
                      <span className="text-[11px] sm:text-xs font-bold text-gray-800 group-hover:text-magenta transition-colors truncate">
                        {c.name} - {c.id}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Explore Full Library CTA */}
        <div className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/colours"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold bg-gradient-to-r from-magenta via-pink-500 to-violet text-white shadow-xl hover:shadow-magenta/30 hover:scale-105 transition-all text-xs sm:text-sm uppercase tracking-wider"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" /> Explore Complete 1,000+ Shade Library <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Selected Swatch Interactive Modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-ink/85 backdrop-blur-md" />
          <div
            className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl bg-[#0F1424] border border-white/20 animate-menu-drop text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Color Swatch Header */}
            <div className="h-48 sm:h-56 relative p-6 flex flex-col justify-between" style={{ backgroundColor: selected.hex }}>
              <button
                onClick={() => setSelected(null)}
                className="self-end w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-white border border-white/15 self-start">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-magenta block">
                  {selected.family} COLLECTION
                </span>
                <span className="font-mono font-bold text-sm">{selected.id}</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl text-white font-bold">{selected.name}</h3>
                  <p className="text-white/70 text-xs sm:text-sm mt-0.5">{selected.description}</p>
                </div>
                <button
                  onClick={() => copyHex(selected.hex)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition-all shrink-0 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-leaf" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy HEX'}
                </button>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-white/50 text-[10px] uppercase font-bold tracking-wider">HEX</div>
                  <div className="text-white font-mono font-bold text-xs mt-1">{selected.hex}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-white/50 text-[10px] uppercase font-bold tracking-wider">RGB</div>
                  <div className="text-white font-mono text-[11px] font-bold mt-1">
                    {parseInt(selected.hex.slice(1, 3), 16)}, {parseInt(selected.hex.slice(3, 5), 16)},{' '}
                    {parseInt(selected.hex.slice(5, 7), 16)}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Collection</div>
                  <div className="text-white font-semibold text-xs mt-1 truncate">{selected.collection || 'Standard'}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Best For</div>
                  <div className="text-white font-semibold text-xs mt-1 truncate">{selected.space}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => handleVisualize(selected)}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-magenta via-pink-500 to-violet text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 shadow-lg transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4" /> Visualize in Room Studio
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="px-5 py-3 rounded-xl bg-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ColorPaletteSection;
