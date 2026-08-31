import React, { useEffect, useMemo, useState } from 'react';
import {
  paintShades,
  familySwatches,
  colorFamilies,
  type PaintShade,
  type ColorFamily,
} from '../../data';
import {
  Search,
  Heart,
  Sparkles,
  X,
  SlidersHorizontal,
  Sun,
  Eye,
  Check,
  Copy,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { useNavigate } from '../../routes/Router';
import { hexToRgb, type LightingMode, type FinishMode } from '../paint-studio/canvasEngine';

export function ShadeLibrary() {
  const navigate = useNavigate();
  const [selectedFamily, setSelectedFamily] = useState<ColorFamily>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [favourites, setFavourites] = useState<string[]>([]);
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);
  const [activeShadeModal, setActiveShadeModal] = useState<PaintShade | null>(null);
  const [copiedHex, setCopiedHex] = useState(false);

  // Lighting & Finish preview states for modal detail
  const [modalLighting, setModalLighting] = useState<LightingMode>('Natural');
  const [modalFinish, setModalFinish] = useState<FinishMode>('Matte');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('visaka-mathulac-favourite-shades');
      if (saved) setFavourites(JSON.parse(saved));
    } catch {
      setFavourites([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('visaka-mathulac-favourite-shades', JSON.stringify(favourites));
    } catch {
      // ignore
    }
  }, [favourites]);

  const toggleFavourite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavourites((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const filteredShades = useMemo(() => {
    return paintShades.filter((item) => {
      const query = searchQuery.trim().toLowerCase();
      const matchesFamily =
        selectedFamily === 'ALL' || item.family.toUpperCase() === selectedFamily.toUpperCase();
      const matchesQuery =
        !query ||
        [item.name, item.id, item.code, item.family, item.collection || '', item.space || ''].some((val) =>
          val.toLowerCase().includes(query)
        );
      const matchesFavourites = !showFavouritesOnly || favourites.includes(item.id);
      return matchesFamily && matchesQuery && matchesFavourites;
    });
  }, [selectedFamily, searchQuery, showFavouritesOnly, favourites]);

  const copyHexToClipboard = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(true);
    setTimeout(() => setCopiedHex(false), 2000);
  };

  const handleVisualize = (targetShade: PaintShade) => {
    if (targetShade) {
      setActiveShadeModal(null);
    }
    const visualizerEl = document.getElementById('main-visualizer') || document.getElementById('studio');
    if (visualizerEl) {
      visualizerEl.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('visaka:select-shade', { detail: targetShade }));
    } else {
      navigate('/colours');
      setTimeout(() => {
        const el = document.getElementById('main-visualizer') || document.getElementById('studio');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        window.dispatchEvent(new CustomEvent('visaka:select-shade', { detail: targetShade }));
      }, 100);
    }
  };

  const [selectorMode, setSelectorMode] = useState<'wheel' | 'grid'>('wheel');

  const wheelFamilies: ColorFamily[] = [
    'ORANGES',
    'BLUES',
    'YELLOW GREENS',
    'VIOLETS',
    'REDS',
    'BLUE GREENS',
    'BROWNS',
    'GREYS',
    'GREENS',
    'YELLOWS',
    'WHITES',
    'PINKS',
  ];

  return (
    <section id="shade-library" className="w-full bg-ink text-white py-16 md:py-20 px-4 md:px-8 relative min-h-screen">
      {/* Header Banner */}
      <div className="max-w-3xl mx-auto text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-magenta/20 text-magenta text-[11px] font-extrabold uppercase tracking-widest border border-magenta/30 mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Visaka Shade Library
        </div>
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight tracking-tight">
          Discover Your Colour
        </h1>
        <p className="text-white/70 text-xs sm:text-sm mt-2.5 max-w-xl mx-auto leading-relaxed">
          Welcome to an endless world of colours. In Visaka Paint, we offer a comprehensive colour palette of 375+ authentic shades for your reference.
        </p>

        {/* Search & Filter Toolbar */}
        <div className="mt-8 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search by shade name, code (e.g. VP-8021, VP-8701), family, or room..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta transition-all"
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

          <button
            onClick={() => setShowFavouritesOnly(!showFavouritesOnly)}
            className={`w-full sm:w-auto px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all cursor-pointer ${
              showFavouritesOnly
                ? 'bg-magenta text-white border-magenta shadow-lg shadow-magenta/30'
                : 'bg-white/5 hover:bg-white/10 text-white/80 border-white/15'
            }`}
          >
            <Heart className="w-4 h-4" fill={showFavouritesOnly ? 'currentColor' : 'none'} />
            Favourites ({favourites.length})
          </button>
        </div>

        {/* View Mode Toggle: Interactive Color Wheel vs Swatch Bar */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setSelectorMode('wheel')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              selectorMode === 'wheel'
                ? 'bg-white text-ink border-white shadow-lg'
                : 'bg-white/5 hover:bg-white/10 text-white/70 border-white/10'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-magenta to-cyan-400" />
            Interactive Colour Wheel
          </button>
          <button
            onClick={() => setSelectorMode('grid')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              selectorMode === 'grid'
                ? 'bg-white text-ink border-white shadow-lg'
                : 'bg-white/5 hover:bg-white/10 text-white/70 border-white/10'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Colour Bar Grid
          </button>
        </div>
      </div>

      {/* ── Circular Mathulac Color Palette Wheel (Signature Feature) ── */}
      {selectorMode === 'wheel' && (
        <div className="max-w-4xl mx-auto my-8 p-6 bg-gradient-to-b from-white/[0.07] to-transparent rounded-3xl border border-white/10 backdrop-blur-xl relative overflow-hidden text-center">
          <div className="mb-6">
            <h2 className="text-sm uppercase tracking-widest text-magenta font-extrabold flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" /> Mathulac Color Palette Wheel
            </h2>
            <p className="text-white/60 text-xs mt-1">Click any color bubble below to see the full range of authentic shades</p>
          </div>

          <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[480px] md:h-[480px] mx-auto flex items-center justify-center my-4 [--orbit-r:95px] sm:[--orbit-r:140px] md:[--orbit-r:175px]">
            {/* Center Hub */}
            <div 
              onClick={() => setSelectedFamily('ALL')}
              className="w-24 h-24 sm:w-34 sm:h-34 md:w-40 md:h-40 rounded-full bg-ink/90 border-2 border-white/20 shadow-2xl backdrop-blur-md z-10 flex flex-col items-center justify-center p-1.5 sm:p-3 text-center cursor-pointer hover:border-magenta hover:scale-105 transition-all duration-300 group"
            >
              <span className="font-display font-black text-[10px] sm:text-sm bg-gradient-to-r from-magenta via-pink-400 to-cyan-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform leading-tight">
                Color Palette
              </span>
              <span className="text-[8px] sm:text-xs text-white/70 mt-0.5 sm:mt-1 font-bold truncate max-w-[85px] sm:max-w-none">
                {selectedFamily === 'ALL' ? '375+ Shades' : `${selectedFamily}`}
              </span>
              <span className="text-[7px] sm:text-[9px] text-white/40 mt-0.5 uppercase tracking-wider">
                {selectedFamily === 'ALL' ? 'Tap to filter' : `${filteredShades.length} shades`}
              </span>
            </div>

            {/* Circular Orbit Ring */}
            <div className="absolute inset-2 sm:inset-4 md:inset-6 rounded-full border border-dashed border-white/15 pointer-events-none animate-spin-slow opacity-60" />

            {/* 12 Color Bubbles positioned around the circle */}
            {wheelFamilies.map((fam, idx) => {
              const swatch = familySwatches[fam];
              const isSelected = selectedFamily === fam;
              const angleDeg = (idx * 360) / wheelFamilies.length - 90;
              const angleRad = (angleDeg * Math.PI) / 180;
              return (
                <button
                  key={fam}
                  onClick={() => setSelectedFamily(fam)}
                  className={`absolute w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full shadow-2xl transition-all duration-300 flex flex-col items-center justify-center p-0.5 sm:p-1 text-center cursor-pointer group z-20 ${
                    isSelected
                      ? 'scale-115 ring-2 sm:ring-4 ring-white shadow-[0_0_30px_rgba(230,0,126,0.6)] z-30'
                      : 'hover:scale-110 hover:shadow-xl opacity-90 hover:opacity-100'
                  }`}
                  style={{
                    background: swatch.bgGradient,
                    transform: `translate(calc(${Math.cos(angleRad)} * var(--orbit-r, 95px)), calc(${Math.sin(angleRad)} * var(--orbit-r, 95px)))`,
                  }}
                  title={`Select ${fam}`}
                >
                  <span className="text-[7px] sm:text-[9px] md:text-[11px] font-black text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] leading-tight tracking-tight uppercase px-0.5">
                    {fam}
                  </span>
                  <span className="text-[6px] sm:text-[8px] md:text-[9px] font-mono text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-semibold mt-0.5">
                    25+
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => setSelectedFamily('ALL')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedFamily === 'ALL'
                  ? 'bg-magenta text-white shadow-lg shadow-magenta/30'
                  : 'bg-white/10 hover:bg-white/20 text-white/70'
              }`}
            >
              Show All 375+ Shades
            </button>
          </div>
        </div>
      )}

      {/* Colour Family Swatch Bar Navigation */}
      {selectorMode === 'grid' && (
        <div className="max-w-[1400px] mx-auto mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-white/50 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-magenta" /> Select Colour Family
            </span>
            <span className="text-xs text-white/40">{filteredShades.length} shades displayed</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-16 gap-2">
            {colorFamilies.map((fam) => {
              const swatch = familySwatches[fam];
              const isSelected = selectedFamily === fam;
              return (
                <button
                  key={fam}
                  onClick={() => setSelectedFamily(fam)}
                  className={`group relative p-2 rounded-xl border transition-all cursor-pointer flex flex-col items-center gap-1.5 text-center ${
                    isSelected
                      ? 'bg-white/15 border-white shadow-lg shadow-magenta/20 ring-2 ring-magenta/60 scale-[1.03]'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/30'
                  }`}
                >
                  <div
                    className="w-9 h-9 rounded-xl shadow-md group-hover:scale-110 transition-transform"
                    style={{ background: swatch.bgGradient }}
                  />
                  <span className="text-[10px] font-bold text-white/80 group-hover:text-white leading-tight">
                    {swatch.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Responsive Shade Grid */}
      <div className="max-w-[1400px] mx-auto">
        {filteredShades.length === 0 ? (
          <div className="text-center py-16 bg-white/5 rounded-xl border border-white/10">
            <p className="text-white/60 text-base">No shades found matching your filter criteria.</p>
            <button
              onClick={() => {
                setSelectedFamily('ALL');
                setSearchQuery('');
                setShowFavouritesOnly(false);
              }}
              className="mt-4 px-6 py-2.5 rounded-xl bg-magenta text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-4">
            {filteredShades.map((shadeItem) => {
              const isFav = favourites.includes(shadeItem.id);
              return (
                <div
                  key={shadeItem.id}
                  onClick={() => {
                    setActiveShadeModal(shadeItem);
                    setCopiedHex(false);
                  }}
                  className="group relative bg-surface-card border border-white/10 hover:border-magenta/50 rounded-xl p-2.5 sm:p-3.5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-magenta/10 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Organic Swatch */}
                    <div
                      className="w-full aspect-square rounded-xl shadow-inner mb-2 sm:mb-3 relative overflow-hidden transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundColor: shadeItem.hex }}
                    >
                      <span className="absolute bottom-1.5 left-1.5 text-[9px] sm:text-[10px] font-mono font-bold bg-black/40 text-white px-1.5 py-0.5 rounded backdrop-blur-sm">
                        {shadeItem.id}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-1">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-[11px] sm:text-xs md:text-sm text-white group-hover:text-magenta transition-colors truncate">
                          {shadeItem.name}
                        </h3>
                        <span className="text-[9px] sm:text-[10px] md:text-[11px] text-white/50 uppercase tracking-wider block mt-0.5 truncate">
                          {shadeItem.family} • {shadeItem.hex}
                        </span>
                      </div>

                      <button
                        onClick={(e) => toggleFavourite(shadeItem.id, e)}
                        className={`p-1 sm:p-1.5 rounded-full transition-colors cursor-pointer flex-shrink-0 ${
                          isFav ? 'text-magenta bg-magenta/20' : 'text-white/40 hover:text-white hover:bg-white/10'
                        }`}
                        aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
                      >
                        <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill={isFav ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>

                  {/* Hover Visualize Button */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVisualize(shadeItem);
                    }}
                    className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-xs font-bold text-magenta opacity-90 group-hover:opacity-100 hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Visualize <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </span>
                    <Eye className="w-3.5 h-3.5 text-white/40" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Shade Detail Modal */}
      {activeShadeModal && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-ink/80 backdrop-blur-md"
          onClick={() => setActiveShadeModal(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-midnight border border-white/20 rounded-xl overflow-hidden shadow-2xl animate-menu-drop text-white max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Swatch Header Box */}
            <div className="h-44 sm:h-60 relative flex items-end p-4 sm:p-6" style={{ backgroundColor: activeShadeModal.hex }}>
              <button
                onClick={() => setActiveShadeModal(null)}
                className="absolute top-3 right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-white border border-white/15">
                <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-magenta block">
                  {activeShadeModal.family} Collection
                </span>
                <span className="font-mono font-bold text-xs sm:text-sm">{activeShadeModal.id}</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                <div>
                  <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-white">{activeShadeModal.name}</h2>
                  <p className="text-white/70 text-xs sm:text-sm mt-1">{activeShadeModal.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavourite(activeShadeModal.id)}
                    className={`p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer ${
                      favourites.includes(activeShadeModal.id)
                        ? 'bg-magenta/20 text-magenta border-magenta'
                        : 'bg-white/5 text-white/70 border-white/15 hover:bg-white/10'
                    }`}
                    aria-label={
                      favourites.includes(activeShadeModal.id)
                        ? 'Remove from favourites'
                        : 'Add to favourites'
                    }
                  >
                    <Heart
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill={favourites.includes(activeShadeModal.id) ? 'currentColor' : 'none'}
                    />
                  </button>

                  <button
                    onClick={() => copyHexToClipboard(activeShadeModal.hex)}
                    className="p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/15 text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                  >
                    {copiedHex ? <Check className="w-3.5 h-3.5 text-leaf" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedHex ? 'Copied' : 'Copy HEX'}</span>
                  </button>
                </div>
              </div>

              {/* Lighting & Finish Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                    <Sun className="w-3 h-3 text-[#ff7a00]" /> Lighting: {modalLighting}
                  </span>
                  <div className="grid grid-cols-4 gap-1">
                    {(['Daylight', 'Warm Light', 'Evening', 'Natural'] as LightingMode[]).map((m) => (
                      <button
                        key={m}
                        onClick={() => setModalLighting(m)}
                        className={`py-1 px-1 rounded-lg text-[10px] font-bold border cursor-pointer ${
                          modalLighting === m ? 'bg-magenta text-white border-magenta' : 'bg-white/5 text-white/60 border-white/10'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                    <SlidersHorizontal className="w-3 h-3 text-[#00c8ff]" /> Surface Finish: {modalFinish}
                  </span>
                  <div className="grid grid-cols-4 gap-1">
                    {(['Matte', 'Silk', 'Satin', 'Gloss'] as FinishMode[]).map((f) => (
                      <button
                        key={f}
                        onClick={() => setModalFinish(f)}
                        className={`py-1 px-1 rounded-lg text-[10px] font-bold border cursor-pointer ${
                          modalFinish === f ? 'bg-magenta text-white border-magenta' : 'bg-white/5 text-white/60 border-white/10'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">HEX</span>
                  <div className="text-white font-mono font-bold text-sm mt-1">{activeShadeModal.hex}</div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">RGB</span>
                  <div className="text-white font-mono text-xs font-bold mt-1">
                    {(() => {
                      const rgb = hexToRgb(activeShadeModal.hex);
                      return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
                    })()}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">BEST ROOM</span>
                  <div className="text-white font-semibold text-xs mt-1 truncate">
                    {activeShadeModal.space || 'Living Room'}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">COLLECTION</span>
                  <div className="text-white font-semibold text-xs mt-1 truncate">
                    {activeShadeModal.collection || 'Standard'}
                  </div>
                </div>
              </div>

              {/* Action Trigger to Open Visualizer */}
              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => handleVisualize(activeShadeModal)}
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-magenta to-violet text-white font-bold text-sm text-center shadow-lg hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> VISUALIZE THIS SHADE IN VIRTUAL ROOM
                </button>
                <button
                  onClick={() => setActiveShadeModal(null)}
                  className="px-6 py-3.5 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors cursor-pointer text-sm"
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

export default ShadeLibrary;
