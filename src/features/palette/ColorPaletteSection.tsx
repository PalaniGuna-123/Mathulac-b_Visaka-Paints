import { useState, useMemo } from 'react';
import {
  paintShades,
  familySwatches,
  colorFamilies,
  type PaintShade,
  type ColorFamily,
} from '../../data';
import colourFan from '../../assets/colours.webp';
import {
  X, Copy, Check, Sparkles, ArrowRight, Search,
  Eye, Filter, ChevronDown, ChevronUp, Layers,
} from 'lucide-react';
import { Link, useNavigate } from '../../routes/Router';

export function ColorPaletteSection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<PaintShade | null>(null);
  const [selectedFamily, setSelectedFamily] = useState<ColorFamily>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  // Track which family accordion panels are expanded
  const [expandedFamilies, setExpandedFamilies] = useState<Set<string>>(new Set());

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

  const toggleFamily = (fam: string) => {
    setExpandedFamilies((prev) => {
      const next = new Set(prev);
      if (next.has(fam)) next.delete(fam);
      else next.add(fam);
      return next;
    });
  };

  const expandAll = () =>
    setExpandedFamilies(new Set(colorFamilies.filter((f) => f !== 'ALL')));
  const collapseAll = () => setExpandedFamilies(new Set());

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

  const isSearchActive = searchQuery.trim().length > 0;

  return (
    <section id="palette" className="relative py-16 md:py-24 px-4 md:px-8 bg-ink overflow-hidden">
      {/* Background Watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-screen"
        style={{ backgroundImage: `url(${colourFan})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      <div className="max-w-[1440px] mx-auto relative z-10">

        {/* Header */}
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

        {/* Filter Pills + Controls */}
        <div className="mb-6" data-reveal>
          <div className="flex items-center justify-between mb-3 px-1 flex-wrap gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-white/50 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-magenta" /> Filter by Family
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-white/40">{filteredShades.length} shades found</span>
              {selectedFamily === 'ALL' && !isSearchActive && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={expandAll}
                    className="text-[10px] font-bold text-white/50 hover:text-magenta border border-white/10 hover:border-magenta/40 px-2 py-0.5 rounded-lg transition-all cursor-pointer flex items-center gap-1"
                  >
                    <ChevronDown className="w-3 h-3" /> Expand All
                  </button>
                  <button
                    onClick={collapseAll}
                    className="text-[10px] font-bold text-white/50 hover:text-white border border-white/10 px-2 py-0.5 rounded-lg transition-all cursor-pointer flex items-center gap-1"
                  >
                    <ChevronUp className="w-3 h-3" /> Collapse
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {colorFamilies.map((fam) => {
              const swatch = familySwatches[fam];
              const isActive = selectedFamily === fam;
              return (
                <button
                  key={fam}
                  onClick={() => setSelectedFamily(fam)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                    isActive
                      ? 'bg-white/20 border-white text-white shadow-lg shadow-magenta/20 ring-1 ring-magenta/80 scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border-white/10'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ background: swatch.bgGradient }} />
                  <span>{fam === 'ALL' ? 'All Shades' : fam}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Color Display */}
        <div data-reveal>
          {filteredShades.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
              <Search className="w-8 h-8 text-white/20 mx-auto mb-3" />
              <p className="text-white/60 text-sm">No shades found matching "{searchQuery}".</p>
              <button
                onClick={() => { setSelectedFamily('ALL'); setSearchQuery(''); }}
                className="mt-4 px-5 py-2 rounded-xl bg-magenta text-white font-bold text-xs uppercase tracking-wider"
              >
                Reset Search
              </button>
            </div>

          ) : isSearchActive ? (
            /* Search Results flat grid */
            <div>
              <div className="mb-4 flex items-center gap-2 text-white/50 text-xs">
                <Search className="w-3.5 h-3.5 text-magenta" />
                <span>
                  Showing <span className="text-white font-bold">{filteredShades.length}</span> results for
                  "<span className="text-magenta">{searchQuery}</span>"
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12 gap-2">
                {filteredShades.map((c) => (
                  <ColorTile key={c.id} c={c} onClick={() => setSelected(c)} />
                ))}
              </div>
            </div>

          ) : selectedFamily !== 'ALL' ? (
            /* Single Family Dense Grid */
            <div>
              <div
                className="mb-5 py-3 px-6 rounded-2xl font-bold tracking-widest uppercase text-sm text-white shadow-xl flex items-center justify-between border border-white/15"
                style={{ background: familySwatches[selectedFamily].bgGradient }}
              >
                <div className="flex items-center gap-3">
                  <Layers className="w-4 h-4 opacity-80" />
                  <span className="font-extrabold">{selectedFamily} COLLECTION</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-normal opacity-90">{filteredShades.length} Shades</span>
                  <button
                    onClick={() => setSelectedFamily('ALL')}
                    className="text-[10px] bg-black/25 hover:bg-black/40 px-2.5 py-1 rounded-lg transition-colors font-bold uppercase tracking-wider cursor-pointer"
                  >
                    &larr; All
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12 gap-2">
                {filteredShades.map((c) => (
                  <ColorTile key={c.id} c={c} onClick={() => setSelected(c)} />
                ))}
              </div>
            </div>

          ) : (
            /* ALL Families Accordion Panels */
            <div className="space-y-1.5">
              {colorFamilies.filter((f) => f !== 'ALL').map((fam) => {
                const familyColors = paintShades.filter(
                  (s) => s.family.toUpperCase() === fam.toUpperCase()
                );
                if (familyColors.length === 0) return null;
                const swatch = familySwatches[fam];
                const isOpen = expandedFamilies.has(fam);

                return (
                  <div
                    key={fam}
                    className="rounded-xl overflow-hidden border transition-all duration-300"
                    style={{
                      borderColor: isOpen ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.07)',
                      background: isOpen ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                    }}
                  >
                    {/* Accordion Header */}
                    <button
                      onClick={() => toggleFamily(fam)}
                      className="w-full flex items-stretch cursor-pointer group"
                    >
                      {/* Left gradient accent bar — thicker, always visible */}
                      <div
                        className="w-[5px] flex-shrink-0 transition-all duration-300"
                        style={{
                          background: swatch.bgGradient,
                          opacity: isOpen ? 1 : 0.6,
                        }}
                      />

                      <div className="flex-1 flex items-center gap-3 sm:gap-5 px-4 py-3 group-hover:bg-white/[0.04] transition-colors">
                        {/* Family color swatch square */}
                        <div
                          className="w-9 h-9 rounded-xl flex-shrink-0 shadow-lg border border-white/20"
                          style={{ background: swatch.bgGradient }}
                        />

                        {/* Family name + count — fixed width column */}
                        <div className="flex-shrink-0 text-left" style={{ width: '100px' }}>
                          <div className="text-xs sm:text-[13px] font-extrabold text-white uppercase tracking-widest leading-none">
                            {fam}
                          </div>
                          <div className="text-[9px] text-white/40 font-mono mt-1">
                            {familyColors.length} shades
                          </div>
                        </div>

                        {/* Full-width proportional color strip with fade-out */}
                        <div className="flex-1 relative h-9 min-w-0 rounded-lg overflow-hidden">
                          {/* Color segments — each fills its proportional share */}
                          <div className="absolute inset-0 flex">
                            {familyColors.map((c) => (
                              <div
                                key={c.id}
                                className="flex-1 h-full transition-transform duration-200 group-hover:scale-y-105"
                                style={{ backgroundColor: c.hex, minWidth: 0 }}
                                title={c.name}
                              />
                            ))}
                          </div>
                          {/* Right fade-out overlay */}
                          <div
                            className="absolute inset-y-0 right-0 w-16 pointer-events-none"
                            style={{
                              background: 'linear-gradient(to right, transparent, rgba(10,12,30,0.85))',
                            }}
                          />
                          {/* Count badge */}
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-bold text-white/60 font-mono">
                            {familyColors.length}
                          </div>
                        </div>

                        {/* Expand/Collapse icon */}
                        <div className={`flex-shrink-0 ml-1 w-6 h-6 rounded-full border border-white/15 flex items-center justify-center transition-all duration-300 group-hover:border-white/30 ${
                          isOpen ? 'bg-white/15 rotate-180' : 'bg-white/5'
                        }`}>
                          <ChevronDown className="w-3.5 h-3.5 text-white/60" />
                        </div>
                      </div>
                    </button>

                    {/* Accordion Body */}
                    {isOpen && (
                      <div
                        className="border-t p-3"
                        style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
                      >
                        {/* Family collection header inside body */}
                        <div className="flex items-center justify-between mb-2.5 px-1">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/40">
                            {fam} — {familyColors.length} shades
                          </span>
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedFamily(fam as ColorFamily); }}
                            className="text-[9px] font-bold text-magenta/70 hover:text-magenta border border-magenta/20 hover:border-magenta/50 px-2 py-0.5 rounded-lg transition-all cursor-pointer"
                          >
                            View All
                          </button>
                        </div>
                        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-11 lg:grid-cols-14 xl:grid-cols-16 gap-1.5">
                          {familyColors.map((c) => (
                            <ColorTile key={c.id} c={c} onClick={() => setSelected(c)} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/colours"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold bg-gradient-to-r from-magenta via-pink-500 to-violet text-white shadow-xl hover:shadow-magenta/30 hover:scale-105 transition-all text-xs sm:text-sm uppercase tracking-wider"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" /> Explore Complete 1,000+ Shade Library <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Swatch Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-ink/85 backdrop-blur-md" />
          <div
            className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl bg-[#0F1424] border border-white/20 animate-menu-drop text-white"
            onClick={(e) => e.stopPropagation()}
          >
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

/* Compact square color tile */
function ColorTile({ c, onClick }: { c: PaintShade; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${c.name} - ${c.id}`}
      className="group bg-white rounded-lg overflow-hidden shadow border border-white/10 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-magenta/20 cursor-pointer flex flex-col w-full"
    >
      <div className="w-full aspect-square relative" style={{ backgroundColor: c.hex }}>
        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 flex items-center justify-center">
          <span className="text-white text-[6px] sm:text-[7px] font-mono font-bold px-1 text-center">{c.hex}</span>
        </span>
      </div>
      <div className="bg-white px-0.5 py-1 border-t border-gray-100 text-center">
        <span className="text-[6px] sm:text-[7px] font-bold text-gray-800 group-hover:text-magenta transition-colors leading-tight block truncate px-0.5">
          {c.name}
        </span>
        <span className="text-[5px] sm:text-[6px] text-gray-400 font-mono block truncate">{c.id}</span>
      </div>
    </div>
  );
}

export default ColorPaletteSection;
